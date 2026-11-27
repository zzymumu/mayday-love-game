import { useEffect, useRef, useState } from 'react'
import { ChevronRight } from 'lucide-react'

export type SeptemberCharacter = 'wen' | 'ashin' | 'masa' | 'stone' | 'yanming'
export type SeptemberSelection = {
  trainCharacter: SeptemberCharacter
  trainChoices: number[]
  pokerChoices: number[]
  homestayCharacter: SeptemberCharacter
  homestayChoices: number[]
  scooterCharacter: SeptemberCharacter
  scooterChoices: number[]
  photoChoice: number
  sunsetGroupChoices: number[]
  sunsetCharacter: SeptemberCharacter
  sunsetChoices: number[]
}
type Block = { kind: 'narration' | 'dialogue'; text: string; speaker?: string }
type Choice = { text: string; response: Block[]; affection: number }
type Round = { title: string; blocks: Block[]; choices: [Choice, Choice, Choice] }
type GroupChoice = { text: string; target: SeptemberCharacter; affection: number; response: Block[] }
type GroupRound = { title: string; blocks: Block[]; choices: [GroupChoice, GroupChoice, GroupChoice] }
type Interaction = { character: SeptemberCharacter | null; roundIndex: number; pendingChoice: number | null; choices: number[] }
type GroupProgress = { roundIndex: number; pendingChoice: number | null; choices: number[] }
type Phase =
  | 'trip-intro' | 'train-picker' | 'train-interaction' | 'arrival' | 'homestay-arrival'
  | 'poker' | 'homestay-picker' | 'homestay-interaction' | 'day-two-morning'
  | 'scooter-picker' | 'scooter-interaction' | 'coast-photo' | 'sunset-group'
  | 'sunset-picker' | 'sunset-interaction' | 'return' | 'ending'
type Progress = {
  version: 1
  phase: Phase
  train: Interaction
  poker: GroupProgress
  homestay: Interaction
  scooter: Interaction
  photoChoice: number | null
  sunsetGroup: GroupProgress
  sunset: Interaction
}
type Section = 'train' | 'homestay' | 'scooter' | 'sunset'
type CharacterRecord = Record<SeptemberCharacter, [Round, Round, Round]>

const STORAGE_KEY = 'mayday-september-story-progress-v1'
const ORDER: SeptemberCharacter[] = ['wen', 'ashin', 'masa', 'stone', 'yanming']
const NAMES: Record<SeptemberCharacter, string> = {
  wen: '溫尚翊', ashin: '陳信宏', masa: '瑪莎', stone: '石錦航', yanming: '劉諺明',
}
const n = (text: string): Block => ({ kind: 'narration', text })
const d = (speaker: string, text: string): Block => ({ kind: 'dialogue', speaker, text })
const option = (text: string, speaker: string, reply: string, affection = 1): Choice => ({
  text, response: [d(speaker, reply)], affection,
})
const routeRound = (
  title: string,
  blocks: Block[],
  speaker: string,
  texts: [string, string, string],
  replies: [string, string, string],
  amounts: [number, number, number] = [1, 1, 2],
): Round => ({
  title, blocks,
  choices: [
    option(texts[0], speaker, replies[0], amounts[0]),
    option(texts[1], speaker, replies[1], amounts[1]),
    option(texts[2], speaker, replies[2], amounts[2]),
  ],
})
const gc = (text: string, target: SeptemberCharacter, speaker: string, reply: string, affection = 1): GroupChoice => ({
  text, target, affection, response: [d(speaker, reply)],
})
const groupRound = (title: string, blocks: Block[], choices: [GroupChoice, GroupChoice, GroupChoice]): GroupRound => ({ title, blocks, choices })

const trainRoutes: CharacterRecord = {
  wen: [
    routeRound('靠窗的位置', [
      n('火車剛離開台北，車廂裡還有些吵。溫尚翊把琴袋放到行李架上，回頭看你正努力把背包塞進座位底下。他伸手接過去，替你把背帶轉了個方向，這才在靠窗的位置坐下。'),
      d('溫尚翊', '妳坐裡面啦，靠走道等一下每個人都要撞到妳。'),
      n('你才剛坐好，車身便輕輕晃了一下。他一手扶住椅背，另一手把你放在膝上的車票抽走，看了一眼又還給你。'),
    ], '溫尚翊',
      ['你是不是早就想坐窗邊？', '那你幫我看行李，我要睡一下。', '坐裡面可以啊，那你不要一直擋住風景。'],
      ['不然咧？我又不是要跟妳搶。妳要看就往前一點，玻璃又不會跑掉。', '妳才剛上車就要睡喔？好啦，睡妳的，東西掉了我再叫妳。', '蛤？我哪有擋，妳自己坐好就看得到啦。']),
    routeRound('晃了一下', [
      n('列車經過彎道，桌上的車票滑到地上。你彎腰去撿，剛好又遇上一陣晃動，額頭差點碰到前面的椅背。溫尚翊伸手擋了一下，手掌停在你額前，等車身穩了才收回去。'),
      d('溫尚翊', '小心啦，妳是跟地板有仇喔？'),
      n('他把車票撿起來，沒有立刻還你，反而用指節敲了敲票面，確認沒有被踩皺。'),
    ], '溫尚翊',
      ['你剛剛是不是怕我撞到？', '謝啦，反應很快嘛。', '那你手不要收那麼快啊。'],
      ['我是不想等一下還要陪妳去找冰敷啦。', '不然咧，坐火車也要有點警覺吧。', '妳少來。票拿好，等一下又掉了我不幫妳撿。']),
    routeRound('分一半的零食', [
      n('快到台東時，瑪莎從後面傳來一包洋芋片，溫尚翊接過來看了一眼，先放在兩個座位中間。你伸手拿了一片，他又把袋口往你那邊挪了一點。'),
      n('窗外的田地一段一段往後退，車廂裡的聲音也慢慢低下來。你發現他沒有再看手機，只是偶爾轉頭確認你有沒有吃到。'),
    ], '溫尚翊',
      ['你自己也吃啊，不要只顧著推給我。', '這包是不是你買的？', '我吃最後一片，你不准搶。'],
      ['我有啦。妳吃妳的，不用一直管我。', '不是，瑪莎拿來的。妳不要吃完又說太鹹。', '誰要跟妳搶？妳拿啦，動作快一點。']),
  ],
  ashin: [
    routeRound('窗外的雲', [
      n('阿信把木吉他小心放到行李架旁，確認不會被別人的行李壓到，才在你旁邊坐下。他挑了靠窗的位置，卻沒有急著看風景，反而先把窗簾拉開一點，讓光線不要直直照到你眼睛。'),
      d('陳信宏', '這邊看得到海的話，我再叫妳喔。現在先經過田而已。'),
      n('你笑他怎麼連看風景都要報告，他也笑，手指在膝蓋上輕輕敲著不成調的節拍。'),
    ], '陳信宏',
      ['那你看到海一定要叫我，不可以自己先看。', '你是不是很常坐火車？', '我覺得窗外那朵雲很像一隻兔子。'],
      ['好啊，我看到就叫妳。妳不要睡到聽不到就好啦。', '還好欸，不過每次坐車都會覺得時間變得很慢。', '真的耶，耳朵那邊還有一小撮，牠好像在發呆馁。']),
    routeRound('耳機的一邊', [
      n('阿信從包包裡摸出一副耳機，線在掌心繞了兩圈。他把隨身聽放到你們中間，先問你想不想聽，等你點頭才把其中一邊遞過來。耳機線不長，你們只好稍微往中間靠。'),
      d('陳信宏', '這首我最近一直在聽，想說妳可能也會喜歡。'),
      n('前奏響起時，列車正好穿過一段樹影。你們誰也沒有急著說話，偶爾對上眼，就一起笑一下。'),
    ], '陳信宏',
      ['你怎麼知道我會喜歡？', '那你等一下要跟我說這首歌叫什麼。', '耳機線好短喔，我們是不是要坐近一點？'],
      ['不知道欸，就覺得妳應該會喜歡。聽完再告訴妳我為什麼。', '好啊，我記得。等一下下車前再跟妳講。', '哈哈，真的有一點短。妳不要勉強，這樣聽得到就好馁。']),
    routeRound('快到台東了', [
      n('廣播提醒列車即將抵達台東。阿信把耳機收回盒子裡，卻沒有馬上起身。他看見你一直望著窗外，便把自己的小本子遞過來，裡面畫著剛才那朵兔子雲，旁邊還多了一個很小的笑臉。'),
      d('陳信宏', '剛剛畫的啦，妳不要笑我畫得很奇怪。'),
      n('你把本子還給他時，他的手指在封面上停了一下，像是想把那頁撕下來，又覺得沒必要。'),
    ], '陳信宏',
      ['畫得很可愛啊，可以送我嗎？', '你把我畫得比較好看一點就好了。', '不准撕掉喔，我下次還要看。'],
      ['真的喔？那妳先幫我保管好了，回去再畫一張給妳。', '欸，妳也太會要求了吧。好啦，下次畫得認真一點。', '好，不撕。那頁就留在本子裡，等妳下次來檢查。']),
  ],
  masa: [
    routeRound('誰坐窗邊', [
      n('你才剛把背包放好，瑪莎就把手裡的車票舉到你面前，說他明明先到，卻被溫尚翊搶走靠窗的位置。溫尚翊在前排聽見，連頭都沒回，只抬手比了一個叫他閉嘴的手勢。'),
      d('瑪莎', '妳看，這就是團隊霸凌。'),
      n('他說得一臉委屈，屁股卻已經很自然地挪到你旁邊，還把零食袋放在你們中間。'),
    ], '瑪莎',
      ['你要不要去跟怪獸理論？', '坐這裡也不錯啊，至少有人可以吵。', '你是不是故意坐我旁邊的？'],
      ['我才不要，等一下他又說我很吵。妳去講比較有用啦。', '妳終於承認我很重要了喔？', '蛤？我只是剛好有空位。妳不要自己加戲。']),
    routeRound('零食保衛戰', [
      n('火車開了一段路，瑪莎拆開一包餅乾，才吃兩片就把袋子放到你腿上，說要你幫忙拿。你才剛低頭，他又伸手過來拿第三片，手指差點碰到你的。'),
      d('瑪莎', '欸，妳不要吃太快，這包是大家的。'),
      n('他自己倒是吃得很順手，還把碎屑拍到掌心裡，沒有掉到你裙子上。'),
    ], '瑪莎',
      ['你剛剛明明吃最多。', '那我偏要拿最大的那片。', '你手伸過來的時候差點碰到我欸。'],
      ['我那叫試吃，妳那叫搶劫。', '拿啊，妳看妳等一下會不會掉滿身。', '不然咧？餅乾又不會自己飛過去。妳很在意喔？']),
    routeRound('快到站了', [
      n('廣播響起時，你開始把小包包裡的東西一樣樣收好。瑪莎看見你把車票夾進書裡，伸手幫你把滑出來的票根壓平，嘴上還嫌你什麼都能弄丟。'),
      d('瑪莎', '等一下下車不要又走錯方向，台東不是妳家巷口。'),
      n('他說完便把自己的背包背好，卻還站在座位旁邊等你拉好拉鍊。'),
    ], '瑪莎',
      ['那你等一下要走在我前面。', '我才不會走丟，你不要小看我。', '你是在擔心我喔？'],
      ['可以啊，反正我也要去找諺明哥。妳跟緊一點。', '最好是啦。妳等一下不要又跑去看紀念品。', '妳想太多了，我是不想回頭找人。快點啦。']),
  ],
  stone: [
    routeRound('把琴袋放好', [
      n('石頭先把自己的吉他放上行李架，接著替你看了看背包和小提袋，確認不會壓到琴袋。他沒有急著坐下，反而等你把東西都放妥，才在你旁邊坐好。'),
      d('石錦航', '這樣就好了，等一下下車比較好拿。'),
      n('火車慢慢啟動，他把窗邊的位置讓給你，自己坐在外側，膝上的相機袋也放得整整齊齊。'),
    ], '石錦航',
      ['你怎麼連行李都安排得這麼好？', '那你坐外面不會看不到風景嗎？', '謝謝你，剛剛我差點放錯地方。'],
      ['習慣而已，東西先放好，等一下就不用急。', '沒關係，我從這邊也看得到。妳想看就坐窗邊。', '不會啦，還好有看到。妳不用每次都跟我道謝。']),
    routeRound('拍下沿途', [
      n('經過一段開闊的田地時，石頭拿起相機，先把窗邊反光的角度避開。他拍了一張窗外的稻田，又把相機稍微轉向你，停了一下才問你介不介意入鏡。'),
      d('石錦航', '光線滿好的，想說可以留一張。妳不想拍也沒關係。'),
      n('你還沒回答，他已經把相機放低，耐心等你決定。'),
    ], '石錦航',
      ['可以啊，但你要拍得好看一點。', '先拍風景啦，我等一下再入鏡。', '那我們一起拍一張好了。'],
      ['好，我會注意角度。等洗出來再給妳看。', '好啊，這邊的光很漂亮，等一下還有機會。', '可以。等一下我找個不會晃的位置，拍完妳再挑。']),
    routeRound('抵達前的小提醒', [
      n('列車開始減速，石頭把相機收進袋子，順手把你放在桌上的車票遞過來。他看見你一直往窗外張望，便指了指遠處一閃而過的海線。'),
      d('石錦航', '等一下到台東還要轉船，行李不要拿太急。'),
      n('他說話時聲音不大，卻剛好蓋過車廂裡的廣播。'),
    ], '石錦航',
      ['那你等等陪我一起找行李。', '我有點期待坐船了。', '你會不會也想快點看到海？'],
      ['好啊，我等妳拿好再走。', '我也是。第一次把樂器帶去海邊，感覺滿特別的。', '會啊。不過慢慢來，到了就看得到。']),
  ],
  yanming: [
    routeRound('車票和行李', [
      n('諺明哥坐在靠走道的位置，把六張車票和船班資料重新核對了一遍。你走過去時，他抬頭看了看你手上的小包，先替你把琴袋旁邊的位置空出來。'),
      d('劉諺明', '妳坐這邊好了，行李放在前面比較好拿。等一下轉船也不用急。'),
      n('他把車票分好，還特地把你的那張放在最上面。'),
    ], '劉諺明',
      ['你怎麼連我的票都幫我收好了？', '那我就坐你旁邊，路上有問題問你。', '你是不是每次出門都像在帶團？'],
      ['怕有人下車才開始找票。先拿好，等一下就輕鬆了。', '可以啊，妳有問題就問，不用客氣。', '差不多吧，習慣先把事情安排好，才不會大家都在月台上發呆。']),
    routeRound('車廂裡的早餐', [
      n('你打開紙袋，早餐的蛋餅香氣一下子飄出來。諺明哥看你一邊拿筷子一邊努力不讓紙袋倒下，便伸手替你扶住底部，另一手把桌板上的水杯往旁邊移開。'),
      d('劉諺明', '慢慢吃，不用趕。還有一段時間才到。'),
      n('他自己只拿了一個飯糰，吃得很快，卻沒有催你。'),
    ], '劉諺明',
      ['你也吃一點我的蛋餅啊。', '你是不是都習慣照顧別人？', '那我吃完可以靠一下嗎？'],
      ['好啊，那我拿一小塊。謝謝妳。', '出門一群人，總要有人記得這些小事。妳也可以幫我提醒。', '可以，妳累了就休息。到站我叫妳。']),
    routeRound('轉船前', [
      n('火車快到台東時，諺明哥把船票和車票分開收好，又確認大家的琴袋都有人拿。他看見你把頭靠在窗邊，便把自己的薄外套摺起來，放到你手肘旁邊。'),
      d('劉諺明', '窗邊有點硬，墊一下會舒服一點。'),
      n('你低頭看著那件外套，他已經把目光轉回手上的行程表，像是這只是很自然的一件事。'),
    ], '劉諺明',
      ['那你等一下冷了怎麼辦？', '謝謝諺明哥，真的舒服很多。', '你怎麼連這種事都注意到了？'],
      ['我還有一件，妳先用。等一下下船就不需要了。', '不客氣，妳睡一下，到了我再叫妳。', '坐得近嘛，看得到。沒什麼啦。']),
  ],
}

const homestayRoutes: CharacterRecord = {
  wen: [
    routeRound('陽台上的汽水', [
      n('牌局散了以後，大家還在客廳爭論最後一把到底算不算重來。你走到陽台透氣，才發現溫尚翊已經靠在欄杆旁，手裡拿著兩瓶冰汽水。看見你，他把其中一瓶遞過來。'),
      d('溫尚翊', '喏，妳的。剛剛看妳一直拿水喝，換這個啦。'),
    ], '溫尚翊',
      ['你怎麼知道我想喝這個？', '你是不是輸牌輸到睡不著？', '那你幫我開，我手有點冰。'],
      ['就看到了啊。妳上次不是也拿這個？', '誰睡不著？我只是在等風小一點。', '蛤，妳自己不會開喔？……拿來啦。']),
    routeRound('風把頭髮吹亂', [
      n('海風從院子那邊繞進來，你的頭髮被吹到嘴邊。你正要伸手撥開，溫尚翊先抬起手，卻在碰到之前停了一下，最後只用指節示意你把那撮頭髮勾到耳後。'),
      n('他把視線移到遠處，假裝自己只是在看院子裡的燈。'),
    ], '溫尚翊',
      ['你剛剛是不是想幫我弄頭髮？', '謝啦，差點吃到頭髮。', '你看就好，不用躲啦。'],
      ['我只是看妳一直弄不到，妳不要想太多。', '那妳下次綁好一點，風很大欸。', '誰躲了？我在看外面啦。']),
    routeRound('不想先回房', [
      n('你們在陽台站了一會兒，客廳裡的笑聲漸漸小下去。溫尚翊把空瓶放到窗台，問你明天想不想早點出門。你說想看海，他便點點頭，像是已經把這件事記下來。'),
      d('溫尚翊', '那明天不要賴床。日出看不到，至少早點去海邊。'),
    ], '溫尚翊',
      ['你叫我起床，我就起得來。', '那你要負責叫醒我喔。', '如果我睡過頭，你會不會自己先走？'],
      ['妳少把責任推給我。好啦，我會敲門。', '蛤？妳是鬧鐘壞掉喔？……知道了啦。', '不會啦，大家一起來的，等妳一下又不會怎樣。']),
  ],
  ashin: [
    routeRound('木吉他的聲音', [
      n('你走到民宿門口時，聽見阿信在屋簷下輕輕撥弦。他沒有唱歌，只是在試幾個和弦。你站了一會兒，他才抬頭發現你，手指還停在弦上。'),
      d('陳信宏', '吵到妳了嗎？我只是試一下音而已。'),
    ], '陳信宏',
      ['沒有啊，我覺得很好聽。', '你剛剛那段可以再彈一次嗎？', '我以為你會跟大家一起打牌。'],
      ['真的喔？那我再彈一次給妳聽。', '好啊，等一下我慢慢彈，妳聽看看。', '他們太認真了啦，我先逃出來一下。']),
    routeRound('坐近一點聽', [
      n('阿信把吉他往旁邊挪，替你留出一小塊乾淨的位置。你坐下時，木頭的溫度還留在他剛才抱著的位置。他低頭重新調了一下弦，偶爾抬眼確認你有沒有聽清楚。'),
      d('陳信宏', '這個地方我還沒想好怎麼接，妳覺得要慢一點還是快一點？'),
    ], '陳信宏',
      ['慢一點好了，這樣比較舒服。', '快一點啊，感覺比較有精神。', '我覺得你剛剛彈的就很好，不用改。'],
      ['我也覺得慢一點比較好，像晚上走路那樣。', '哈哈，那我試試看。妳等一下幫我聽喔。', '真的嗎？那我先留著，回去再慢慢想。']),
    routeRound('把旋律留到明天', [
      n('屋裡有人喊阿信回去吃水果，他應了一聲，卻沒有立刻起身。他把剛才那段旋律記在小本子上，撕下一小角紙，寫了幾個和弦給你看。'),
      d('陳信宏', '妳先幫我看著，不要弄丟喔。明天如果還記得，我再彈給妳聽。'),
    ], '陳信宏',
      ['那我明天要驗收。', '你這樣是把作業交給我嗎？', '我會收好的，放心啦。'],
      ['好啊，妳不要放水喔。', '哈哈，有一點啦。那妳要認真檢查。', '嗯，謝謝妳。明天見馁。']),
  ],
  masa: [
    routeRound('誰輸了誰買宵夜', [
      n('你才剛走出客廳，瑪莎就跟了上來，手裡還拿著剛才輸牌欠下的零錢。他把硬幣在掌心晃了晃，說要去附近買宵夜，問你要不要一起。'),
      d('瑪莎', '走啦，輸的人請客。妳剛剛不是笑最大聲？'),
    ], '瑪莎',
      ['我陪你去啊，免得你亂買。', '你輸了還這麼理直氣壯？', '那我要吃你最喜歡的那個。'],
      ['妳是怕我偷吃吧？走啦，讓妳監督。', '不然咧？願賭服輸，我又沒賴帳。', '妳很會挑欸。好啦，買給妳。']),
    routeRound('最後一包餅乾', [
      n('便利店的燈很亮，瑪莎站在貨架前挑了半天，最後拿起一包你小時候常吃的餅乾。他看見你盯著包裝，故意把它舉高了一點。'),
      d('瑪莎', '這個妳還吃喔？口味都沒變欸。'),
    ], '瑪莎',
      ['你不是也記得很清楚？', '買啦，我們分著吃。', '你再拿高一點，我真的搶不到喔。'],
      ['我只是記性好，不代表我特地記得。', '好啊，回去不要跟怪獸說，不然他又要搶。', '妳跳啊，我看看妳搶不搶得到。']),
    routeRound('走回民宿', [
      n('回程路上，你們一人拿著一袋宵夜。瑪莎走在靠馬路那側，嘴上還在算剛才牌局到底誰作弊。你伸手去拿他袋子裡的餅乾，他故意把袋子往外挪，卻沒有真的躲開。'),
      d('瑪莎', '欸，妳自己的那包不吃，專挑我的？'),
    ], '瑪莎',
      ['因為你的比較好吃啊。', '我只是幫你減輕重量。', '那你分我一半，我就不搶了。'],
      ['這句我記下來了，下次買兩包都給妳挑。', '妳這理由也太爛了吧。拿啦，反正又不重。', '好啦，分妳。不要等一下又說不夠。']),
  ],
  stone: [
    routeRound('相機裡的照片', [
      n('石頭坐在公共區域的木桌旁，正把白天拍的底片相機收好。你走近時，他把相機旁邊幾張沖印店給的樣張推過來，裡面有一張是你在火車上看窗外的側影。'),
      d('石錦航', '這張光線剛好，我就先留著了。妳覺得呢？'),
    ], '石錦航',
      ['我都不知道你有拍到我。', '拍得很好看，可以給我一張嗎？', '你怎麼每次都拍到我沒注意的時候？'],
      ['妳那時候在看窗外，很專心，我沒有叫妳。', '可以啊，等洗好我再多印一張給妳。', '因為妳不看鏡頭的時候，表情比較自然。']),
    routeRound('一起挑照片', [
      n('他把幾張照片排在桌面上，你們的手指同時停在同一張海岸線上。石頭先把手收回去，讓你挑；你說這張好看，他便把它放到最上面，還用鉛筆在背面寫下日期。'),
      d('石錦航', '這張留著吧，明天如果天氣好，還可以拍更漂亮的。'),
    ], '石錦航',
      ['那明天你要幫我拍一張跟海的合照。', '你把這張送我好了。', '那我可以幫你挑一張嗎？'],
      ['好啊，明天找個光線好的地方。', '可以，這張我本來就想留給妳。', '當然可以。妳挑的我也想看看。']),
    routeRound('院子裡的晚風', [
      n('院子裡的燈亮了，其他人還在客廳吵著要不要再玩一局。石頭把照片收進信封，抬頭問你明天想不想早點去看海。他說清晨的海面顏色不太一樣，光線也比較柔。'),
      d('石錦航', '如果妳起得來，我可以陪妳先走一小段。'),
    ], '石錦航',
      ['那你要記得叫我。', '我想看，明天一定起床。', '如果我起不來，你就拍給我看。'],
      ['好，我會敲門，不會讓妳睡過頭。', '那就說好了。明天早上見。', '可以啊，我拍清楚一點，回來給妳看。']),
  ],
  yanming: [
    routeRound('明天的路線表', [
      n('諺明哥把明天的環島路線寫在紙上，放在公共區域的桌角。你走過去時，他把筆遞給你，讓你看看有沒有特別想停的地方。'),
      d('劉諺明', '明天不用趕，想停就停。只是出發前記得先吃早餐。'),
    ], '劉諺明',
      ['我想去看有很多海的地方。', '你是不是連休息時間都排好了？', '那我可以負責挑午餐嗎？'],
      ['好，我把海邊那幾個點先圈起來。', '沒有啦，只是怕大家玩到忘記吃飯。', '可以啊，妳挑，大家應該都不會反對。']),
    routeRound('院子裡的茶', [
      n('你拿著杯子坐到院子裡，諺明哥剛好把熱茶放到桌上。他沒有問你是不是累了，只是把椅子往外拉一點，讓你坐下時不會撞到桌腳。'),
      d('劉諺明', '今天走了一天，晚上就慢慢來。'),
    ], '劉諺明',
      ['你也坐一下嘛。', '你怎麼好像什麼都準備好了？', '我覺得跟你出門很安心。'],
      ['好啊，等我把這張路線表收好。', '習慣先準備一點，真的遇到狀況才不會慌。', '那就好。大家都玩得開心，這趟就值得了。']),
    routeRound('明天一起看海', [
      n('你們把路線表收起來時，屋裡傳來瑪莎又輸一把的抗議聲。諺明哥看了看時間，提醒大家別玩得太晚。他把明天要用的車票和租車資料放進透明資料袋，卻特地把你想去的海邊標記留在最上面。'),
      d('劉諺明', '明天妳想去的地方，我有記下來。'),
    ], '劉諺明',
      ['那明天你要帶我去。', '你真的很會記這些小事。', '我會準時起床，不讓你等。'],
      ['好啊，明天路上再看天氣。', '寫下來就不容易忘了。', '我相信妳。晚點休息，明天還有得玩。']),
  ],
}

const scooterRoutes: CharacterRecord = {
  wen: [
    routeRound('安全帽的扣子', [
      n('租車行門口排著幾頂安全帽。溫尚翊拿起一頂先比了比你的頭，挑到尺寸合適的才遞給你。你扣了兩次都沒扣上，他看不下去，伸手替你把扣環穿過去。指尖擦過下巴時，他的動作停了半秒，接著像沒事一樣把扣帶拉緊。'),
      d('溫尚翊', '扣好了。妳不要等一下又說太緊。'),
    ], '溫尚翊',
      ['你靠這麼近，我當然會緊張啊。', '謝啦，原來你還滿會幫人戴安全帽。', '你再檢查一次嘛，我怕沒扣好。'],
      ['蛤？我是在幫妳扣扣子，妳緊張什麼啦。', '不然咧？這個總比妳自己弄半天快。', '好了啦，真的扣好了。妳摸摸看。']),
    routeRound('抓住外套', [
      n('小綿羊駛上沿海公路，海風一下子把你的頭髮往後吹。溫尚翊從後照鏡看了你一眼，速度放慢了一點。前面路面有一道接縫，車身輕輕顛了一下，你原本扶著後座的手下意識抓住了他外套側邊。'),
      d('溫尚翊', '抓好啦，前面路不太平。抓我外套就好，不用硬撐。'),
      n('你指尖捏著那一小截布料，感覺得到他把車騎得比剛才穩。'),
    ], '溫尚翊',
      ['那我真的抓緊囉。', '你騎慢一點，我又不趕時間。', '你外套皺掉了，不會生氣吧？'],
      ['抓啊，誰叫妳剛剛不抓好。', '知道啦，妳坐穩就好。海又不會跑掉。', '皺了再整理就好，妳不要放手就好。']),
    routeRound('停在海邊', [
      n('停車時，溫尚翊先把車停穩，才回頭看你。你下車後安全帽的頭髮翹得亂七八糟，他看了一眼，嘴角忍不住往上，伸手卻只是把你肩上被風吹歪的背帶拉正。'),
      d('溫尚翊', '妳頭髮真的很誇張欸。'),
    ], '溫尚翊',
      ['那你幫我整理一下啊。', '你還笑，都是你騎太快。', '你剛剛是不是一直看後照鏡？'],
      ['妳自己弄啦……好啦，這邊翹起來了。', '我哪有快？是妳頭髮自己飛走的。', '我是在看後面有沒有車，順便看妳有沒有坐好啦。']),
  ],
  ashin: [
    routeRound('把頭髮收好', [
      n('阿信拿著安全帽走到你面前，先把帽沿裡卡住的一小撮頭髮撥出來，才示意你低頭。他替你把扣帶扣好，沒有拉得太緊，還用指腹試了一下空隙。'),
      d('陳信宏', '這樣應該剛好，不會勒到妳。'),
    ], '陳信宏',
      ['你怎麼這麼仔細啊？', '我自己戴就好了啦。', '那你等一下要騎慢一點喔。'],
      ['怕妳不舒服啊。出來玩就不要弄得很狼狽馁。', '哈哈，剛好看到那邊卡住了。沒關係啦。', '好啊，妳如果覺得風太大就跟我說。']),
    routeRound('海風和衣角', [
      n('車子沿著海岸慢慢往前，風把你的髮尾吹得一直碰到臉。阿信從後照鏡看見，便把速度放緩。路面顛了一下，你抓住他外套後腰的一小截布料，他沒有回頭，只把車騎得更平穩。'),
      d('陳信宏', '抓著就好，不用不好意思。這段路有一點顛。'),
    ], '陳信宏',
      ['我怕你會覺得很奇怪。', '你有沒有覺得海風很舒服？', '那我可以再靠近一點嗎？'],
      ['不會啊，妳坐穩比較重要。真的不用想太多馁。', '有欸，剛剛那一段風剛好，感覺整個人都醒了。', '可以啊，妳不要勉強自己就好。']),
    routeRound('停車時的手', [
      n('到了海岸邊，阿信先把車停好，等引擎熄掉才回頭。你摘下安全帽時，扣帶卡在耳邊，他伸手替你解開，手指很輕，像怕扯痛你。'),
      d('陳信宏', '好了。剛剛那段有沒有太晃？'),
    ], '陳信宏',
      ['沒有啊，坐你車很舒服。', '有一點點，不過我有抓好。', '你剛剛是不是怕我摔下去？'],
      ['那就好。下次如果不舒服一定要跟我說喔。', '辛苦妳了，等一下我們走平一點的路。', '會擔心啊，妳在後面欸。這不是很正常嗎？']),
  ],
  masa: [
    routeRound('安全帽歪了', [
      n('瑪莎把安全帽扣到你頭上，退開兩步看了看，忽然伸手把帽子往正中間轉。你還沒反應過來，他已經替你把扣帶扣好，自己卻把帽子戴得歪歪的。'),
      d('瑪莎', '好了，現在看起來比較像要去環島的人了。'),
    ], '瑪莎',
      ['你自己的才歪了吧？', '你剛剛是不是在偷笑？', '那你幫我拍一下，我要檢查。'],
      ['我這叫有個性，妳不懂。', '妳戴安全帽的樣子真的很好笑欸。', '拍什麼啦，等一下再拍，先上車。']),
    routeRound('一路嘴硬', [
      n('瑪莎起步時還回頭問你坐好了沒有。你才剛抓住他外套後側，車子就經過一段不太平的路，震得你往前靠了一下。他肩膀明顯僵了一瞬，下一秒卻故意用很平常的語氣開口。'),
      d('瑪莎', '欸，妳抓這麼緊，我又不會突然消失。'),
      n('他把速度放慢，經過彎道時還特地提醒你往裡面坐一點。'),
    ], '瑪莎',
      ['那你不要騎那麼晃啊。', '你剛剛是不是也嚇到了？', '我就抓一下，不行喔？'],
      ['路本來就這樣，妳不要把責任推給我。', '我是在注意路啦，妳少亂猜。', '行行行，妳最大。抓好就好。']),
    routeRound('被風吹亂的瀏海', [
      n('停車後，瑪莎把車鑰匙拔下來，回頭看你半天，最後忍不住笑出聲。你的瀏海整個往上翹，安全帽拿下來後還留著一道壓痕。他伸手比了比，卻沒有真的碰，只把自己的小梳子遞過來。'),
      d('瑪莎', '拿去啦，我怕妳等一下又怪我把妳吹成這樣。'),
    ], '瑪莎',
      ['你怎麼會隨身帶梳子？', '你幫我梳啦，我手上拿東西。', '謝謝啦，這次算你有良心。'],
      ['我哪有？民宿拿的啦。妳不要問那麼多。', '蛤？妳真的很會使喚人欸……拿來啦。', '記得喔，我今天已經幫妳很多次了。']),
  ],
  stone: [
    routeRound('先確認安全帽', [
      n('石頭把安全帽拿到你面前，先確認扣帶沒有扭在一起，再幫你把長髮從扣環旁邊撥開。他沒有直接碰你的頭髮，只用手背輕輕示意你把髮尾收進去。'),
      d('石錦航', '這樣比較不會夾到。妳試試看，會不會太緊？'),
    ], '石錦航',
      ['剛剛好，謝謝你。', '你怎麼連這個都注意到了？', '你幫我扣好了，我怕自己弄錯。'],
      ['那就好。等一下風大，記得把帽子扣好。', '長頭髮很容易卡住，先弄好比較舒服。', '好，我幫妳。妳低一點頭就好。']),
    routeRound('彎道放慢', [
      n('沿海公路有一段彎道，石頭提前收了油門，車身平穩地轉過去。你原本抓著後座扶手，看到路邊突然開闊的海面，忍不住往旁邊探了一點。他從後照鏡看見，輕聲提醒你坐回來。'),
      d('石錦航', '看得到喔，不用探出去。等一下停車再慢慢看。'),
    ], '石錦航',
      ['你是不是怕我掉下去？', '好啦，我等一下再看。', '那你等一下要陪我多停一會兒。'],
      ['會啊，妳坐在後面，我當然要注意。', '嗯，前面有個地方可以停，視野很好。', '可以啊，今天本來就不用趕時間。']),
    routeRound('停好車再牽手', [
      n('車停穩後，石頭先把鑰匙拔下來，才轉身看你。你踩地時鞋底沾了點細沙，重心晃了一下，他伸手扶住你的手肘，等你站穩才慢慢放開。'),
      d('石錦航', '慢慢來，地上有沙。'),
    ], '石錦航',
      ['你剛剛扶得很及時欸。', '我沒事啦，你不用擔心。', '那你牽我走過去好了。'],
      ['還好有扶到。下次先看一下地面再下車。', '我知道，妳站穩就好。', '好啊，這邊石頭有點滑，慢慢走。']),
  ],
  yanming: [
    routeRound('出發前再檢查一次', [
      n('諺明哥把安全帽遞給你，先確認扣帶和鏡片都正常，才替你把帽沿調正。他沒有催你上車，反而等你自己扣好，才蹲下來看了一眼腳踏板旁邊有沒有卡住行李帶。'),
      d('劉諺明', '好了。等一下如果風太大，跟我說一聲，我會放慢。'),
    ], '劉諺明',
      ['你準備得也太周到了吧。', '那我就放心坐你的車了。', '你不要一直忙，自己也要注意安全。'],
      ['習慣而已，安全的事情先確認好比較放心。', '好，妳坐好就行。', '我會注意，妳也記得抓穩。']),
    routeRound('海岸線的風', [
      n('車子沿著海岸前進，風把你的外套吹得鼓起來。諺明哥從後照鏡看見你一直拉衣角，便把速度放慢，經過一段顛簸路面前先提醒你。你伸手抓住他外套腰側的布料，指尖碰到布料下微微繃緊的腰背。'),
      d('劉諺明', '抓著就好，不用客氣。這段路我會慢慢騎。'),
    ], '劉諺明',
      ['我怕你會不習慣。', '你騎得很穩，坐著很安心。', '那我就不放手囉。'],
      ['不會，妳坐穩最重要。', '那就好。等一下有想停的地方，我們再停。', '好啊，抓牢一點，前面有個彎。']),
    routeRound('海邊下車', [
      n('到了停靠點，諺明哥先把車停妥，才伸手替你扶住安全帽後側，讓你解扣時不會整頂往前掉。他看見你額前的頭髮被壓出一道痕，從口袋拿出一張乾淨的面紙遞給你。'),
      d('劉諺明', '先擦一下汗。海風雖然涼，騎久了還是會熱。'),
    ], '劉諺明',
      ['謝謝諺明哥，你真的很細心。', '那你也擦一下，不要只顧我。', '等一下我們可以再多停一個地方嗎？'],
      ['不客氣。出門玩就是要讓大家都舒服。', '好，謝謝妳提醒。', '可以啊，時間還夠，慢慢繞。']),
  ],
}

const sunsetRoutes: CharacterRecord = {
  wen: [
    routeRound('琴弦上的夕陽', [
      n('大家把樂器搬到避風的地方，溫尚翊坐在一塊平坦的石頭上調弦。夕陽把他的手背照得暖暖的，你在旁邊坐下，他把撥片在指間轉了一圈，沒有像平常那樣急著跟你鬥嘴。'),
      d('溫尚翊', '剛剛那段妳有聽到喔？'),
    ], '溫尚翊',
      ['有啊，我一直在看你彈。', '你彈得比在練團室還好聽。', '你再彈一次給我聽嘛。'],
      ['看我幹嘛，看琴啦。……妳有聽到就好。', '妳不要亂講，這裡風比較大，聲音聽起來不一樣而已。', '好啦，等我把這個音調好。妳不要跑掉。']),
    routeRound('離得有點近', [
      n('他把吉他往你這邊轉了一點，示意你看琴弦。你俯身時，肩膀輕輕碰到他的手臂，他沒有躲開，只是把撥片放到你掌心，讓你試著撥一下。'),
      d('溫尚翊', '不是這樣啦，手指放這邊。慢慢來。'),
    ], '溫尚翊',
      ['你手不要放開，我還沒學會。', '你教得這麼認真喔？', '我是不是碰到你手了？'],
      ['我又沒說要放開。妳先把位置記住。', '不然咧？妳等一下又說我只會嘴巴講。', '有啦，怎樣？琴又不會咬人，妳緊張什麼。']),
    routeRound('把今天留久一點', [
      n('遠處的大家還在收拾線材，溫尚翊把撥片放回口袋，抬頭看了一眼快沉下去的太陽。他說明天就要回台北了，講得像是在提醒時間，手卻沒有急著把琴收起來。'),
      d('溫尚翊', '今天還滿好玩的啦。'),
    ], '溫尚翊',
      ['那下次再一起來啊。', '你是不是也不想回去？', '我會記得今天的。'],
      ['可以啊，妳先不要忘記今天自己講過什麼。', '誰說的？我只是還沒彈完。……好啦，有一點。', '嗯，記得就好。不要只記得我輸牌那段。']),
  ],
  ashin: [
    routeRound('木吉他的最後一段', [
      n('阿信抱著木吉他坐在你旁邊，先把剛才大家一起彈的旋律慢慢彈了一遍。夕陽落在琴身上，木頭的顏色變得很柔和。他唱到一半停下來，轉頭問你剛剛有沒有跟上。'),
      d('陳信宏', '妳剛剛是不是有偷偷跟著唱？我有聽到喔。'),
    ], '陳信宏',
      ['被你發現了喔？', '我怕唱錯，所以只敢小聲唱。', '那你再彈一次，我這次大聲一點。'],
      ['有啊，妳唱得很認真欸。', '沒關係啦，大家又不是在比賽。', '好啊，這次妳想唱就唱，不用怕馁。']),
    routeRound('把和弦教給你', [
      n('他把吉他稍微往你這邊靠，讓你看清楚左手按弦的位置。你試著按了一次，指尖卻總是差一點。他沒有直接替你擺好，而是用自己的手指在琴頸旁邊比給你看。'),
      d('陳信宏', '這裡再往下一格，對，就是這樣。妳看，聲音是不是比較乾淨？'),
    ], '陳信宏',
      ['你再教我一次，我想記住。', '我的手指好像不太聽話。', '你坐近一點，我看不清楚啦。'],
      ['好啊，我慢慢來，妳不用急。', '第一次都這樣啦，按久一點就會習慣。', '哈哈，好，這樣有比較看得到嗎？']),
    routeRound('海風裡的約定', [
      n('阿信把吉他收進袋子前，拿出剛才在火車上畫的那張小紙條，背面又補了幾個和弦。他說回台北後想把旋律整理完整，等有空再彈給你聽。'),
      d('陳信宏', '妳到時候要記得喔，不可以說忘記了。'),
    ], '陳信宏',
      ['我才不會忘記。', '那我等你完成。', '你要先答應我，完成後第一個彈給我聽。'],
      ['那就好，我會記得的。', '好啊，妳先幫我保留一點期待。', '哈哈，好，第一個給妳聽。']),
  ],
  masa: [
    routeRound('你剛剛唱錯了', [
      n('瑪莎坐在一旁整理 Bass 的背帶，聽見你還在哼剛才那段旋律，立刻抬頭說你有一個音唱歪了。你瞪他，他反而笑得更開心，還故意把那個音彈得很誇張。'),
      d('瑪莎', '就是這裡啦，妳剛剛唱成另外一首歌了。'),
    ], '瑪莎',
      ['那你唱一次給我聽啊。', '我覺得很好聽，是你耳朵有問題。', '你是不是一直在注意我唱歌？'],
      ['唱就唱啊，妳不要等一下又笑我。', '好啦，妳開心就好。反正我有聽到。', '我是在確認有沒有人走音，剛好聽到妳而已。']),
    routeRound('把撥片還來', [
      n('你伸手去拿他放在琴袋上的撥片，瑪莎故意用手掌蓋住，說這是他的戰利品。你們一來一回，最後他把撥片放到你手心，卻沒有立刻鬆手。'),
      d('瑪莎', '拿去啦，妳到底要不要？'),
    ], '瑪莎',
      ['要啊，你放手。', '你不放手我怎麼拿？', '那你送我好了。'],
      ['我有放啊，是妳自己抓太慢。', '妳真的很會找麻煩欸。……好啦，給妳。', '蛤？妳很會欸。拿去啦，反正我還有。']),
    routeRound('不想散場', [
      n('夕陽剩下一小截時，瑪莎把琴袋拉鍊拉好，卻沒有馬上站起來。他用鞋尖撥了撥沙子，問你回去之後會不會又忙到沒空出門。'),
      d('瑪莎', '下次要約就早點講，不要每次都臨時起意。'),
    ], '瑪莎',
      ['那你要先把時間空下來。', '你是在約我喔？', '我會記得找你的啦。'],
      ['妳先講，我再看看。……大概會啦。', '妳不要每次都要我講第二遍。', '最好是，妳上次也這樣說。']),
  ],
  stone: [
    routeRound('照片裡的海', [
      n('石頭把相機裡的底片盒收好，拿出剛才拍的幾張照片給你看。他停在一張夕陽落到海面的畫面，指尖輕輕點了點照片邊緣，說這張他很喜歡。'),
      d('石錦航', '這張光線很剛好，海面有一點金色。'),
    ], '石錦航',
      ['我也喜歡，可以洗一張給我嗎？', '你是不是每個地方都想拍下來？', '那你幫我拍一張跟海的合照。'],
      ['可以啊，我多洗一張給妳。', '不是每個地方啦，有些時候只是覺得值得留著。', '好，妳站那邊，光剛好落在肩膀上。']),
    routeRound('安靜坐一會兒', [
      n('你們沿著海邊走了一小段，石頭把步子放得很慢，讓你可以停下來看潮水退去。浪花碰到鞋尖時，你往後縮了一下，他伸手扶住你的手腕，等你站穩才放開。'),
      d('石錦航', '小心，這裡的石頭有點滑。'),
    ], '石錦航',
      ['你剛剛扶我那一下很及時。', '那我們再走一點點就好。', '我想把這裡記下來。'],
      ['還好有扶到。妳慢慢走，不用急。', '好啊，走到前面那塊平一點的地方就回來。', '我也想。回去可以把照片和今天寫在一起。']),
    routeRound('明天回台北', [
      n('天色暗下來，石頭把相機收好，卻把那張六人合照的底片編號寫在小本子上。他說等洗出來會先讓你看，因為你今天一直問照片拍得怎麼樣。'),
      d('石錦航', '這張我會好好洗出來。妳也有在裡面，記得跟我拿。'),
    ], '石錦航',
      ['那你不可以忘記喔。', '我想把它放進日記裡。', '等照片洗好，我們再一起看。'],
      ['不會忘。底片我已經另外收好了。', '好啊，這趟旅行很值得留一頁。', '可以，到時候我拿來給妳挑。']),
  ],
  yanming: [
    routeRound('節奏停下來', [
      n('諺明哥把鼓棒放在膝上，聽著其他人慢慢收尾。他剛才敲的節奏還留在你耳邊，你坐到旁邊時，他把其中一支鼓棒遞過來，讓你看上面被磨亮的地方。'),
      d('劉諺明', '剛剛那段節奏，妳有跟上嗎？'),
    ], '劉諺明',
      ['有啊，我還偷偷打拍子。', '你打鼓的時候看起來很不一樣。', '你教我剛剛那個節奏好不好？'],
      ['我有看到妳的手在動。拍子抓得不錯。', '是嗎？可能很久沒有這樣在外面打了。', '可以啊，先從最簡單的四拍開始。']),
    routeRound('一起數拍子', [
      n('他把鼓棒放到你掌心，先示範四下，再讓你跟著敲。你敲到第三下就慢了半拍，他沒有笑，只把自己的節奏放慢，陪你重新來一次。'),
      d('劉諺明', '沒關係，再一次。這次聽我的拍子。'),
    ], '劉諺明',
      ['你不要放慢啦，我想跟上你。', '這樣是不是好多了？', '我想再試一次。'],
      ['好，那我再打一次，妳跟著聽。', '有，這次很穩了。', '來，這次我們一起。']),
    routeRound('把今天收進記憶', [
      n('最後一點夕陽落到海面後，諺明哥把鼓棒收回袋子。他看著大家還在討論剛才的旋律，笑著說這趟旅行很值得。你問他是不是也玩得開心，他點點頭。'),
      d('劉諺明', '難得大家都有空，能一起出來走走就很好。'),
    ], '劉諺明',
      ['下次還要一起來。', '你今天也有玩到吧？', '謝謝你帶我們來這裡。'],
      ['好啊，下次再找個大家都方便的時間。', '有啊。妳們玩得開心，我也就開心。', '不客氣，這趟是大家一起安排的。']),
  ],
}

const pokerRounds: [GroupRound, GroupRound, GroupRound] = [
  groupRound('第一把・牌還沒出就吵起來', [
    n('民宿公共區域的木桌剛好夠六個人圍一圈。瑪莎把牌洗得啪啪響，溫尚翊嫌他洗牌像在摔東西，阿信一邊笑一邊把桌上的水果盤往裡推。石頭替你拉開椅子，諺明哥則把規則又講了一遍，免得有人等一下裝傻。'),
    d('瑪莎', '先講好，輸的人負責去買宵夜。'),
    d('溫尚翊', '你先不要急著安排別人做事，等一下輸的搞不好是你。'),
    n('你拿到牌後才看一眼，眉頭就皺了起來。石頭注意到你的表情，阿信也把身子稍微往你這邊傾。'),
  ], [
    gc('把牌攤開給阿信看，問他這手還有沒有救。', 'ashin', '陳信宏', '哈哈，先不要急著放棄啦。妳可以留這幾張，等一下再看。', 2),
    gc('把最爛的那張推到怪獸面前，說這張很適合他。', 'wen', '溫尚翊', '妳自己的牌先顧好啦，還有空管我喔？', 2),
    gc('趁瑪莎洗牌時盯著他，懷疑他偷偷藏牌。', 'masa', '瑪莎', '妳不要用那種眼神看我，我洗牌很公平好不好！', 2),
  ]),
  groupRound('第二把・有人開始認真了', [
    n('第一把結束後，大家的勝負欲突然都被叫醒。溫尚翊把袖子往上捲了一點，說這把要認真；瑪莎立刻回他剛才也是這樣講。阿信把牌重新整理好，石頭把掉到地上的一張撿起來，諺明哥看著兩個人鬥嘴，忍不住笑了一聲。'),
    d('陳信宏', '欸，這次不要一直偷看別人的牌啦。'),
    d('瑪莎', '我哪有？我是在看大家的表情。'),
    n('輪到你出牌時，石頭把桌上的零食袋往旁邊挪開，替你留出一塊空位。'),
  ], [
    gc('小聲問石頭，這張牌現在出會不會太早。', 'stone', '石錦航', '可以啊，妳照自己的想法出就好。我覺得這樣滿穩的。', 2),
    gc('故意把牌扣在桌上，挑釁怪獸先出。', 'wen', '溫尚翊', '來啊，誰怕誰。妳不要等一下輸了又說我欺負妳。', 2),
    gc('把瑪莎剛剛的表情學給大家看。', 'masa', '瑪莎', '妳很閒欸！牌不出，倒是很會模仿我。', 2),
  ]),
  groupRound('最後一把・宵夜到底誰買', [
    n('最後一把開始前，諺明哥把桌上的牌重新收齊，說這次真的不重來。阿信把最後一塊西瓜分成兩半，遞了一半給你；溫尚翊靠在椅背上裝作不在意，瑪莎卻已經開始計算誰最有可能輸。石頭把相機放在桌角，趁大家沒注意拍了一張笑成一團的照片。'),
    d('劉諺明', '好，最後一把。輸的人不要賴帳喔。'),
    n('牌一張張落到桌面，最後只剩你和另一個人的牌還沒出完。'),
  ], [
    gc('把最後一張牌交給阿信看，讓他幫你一起決定。', 'ashin', '陳信宏', '我覺得可以出這張。妳相信我一次看看？', 2),
    gc('跟瑪莎約定，如果你們其中一個輸，另一個陪去買宵夜。', 'masa', '瑪莎', '成交啊。不過妳不要故意輸，想偷懶喔？', 2),
    gc('把牌往怪獸面前一放，說你們兩個今天一定要分個高下。', 'wen', '溫尚翊', '好啊，來啊。今天我就不信會輸給妳。', 2),
  ]),
]

const sunsetGroupRounds: [GroupRound, GroupRound, GroupRound] = [
  groupRound('把樂器搬到海邊', [
    n('夕陽還沒完全落下去，大家已經在找一塊比較平坦、離浪線遠一點的地方放樂器。溫尚翊把效果器和導線放好，阿信先抱著木吉他試音，石頭蹲在旁邊替大家理線。瑪莎扛著 Bass 一邊走一邊嫌重，諺明哥則把小打擊樂器放在乾燥的石面上。'),
    d('瑪莎', '我真的想問，誰提議把這麼多東西扛來海邊的？'),
    d('溫尚翊', '你啊，昨天說要把練團室搬過來的不是你喔？'),
    n('你忍不住笑出聲，海風吹過來，大家的頭髮和衣角都被吹得亂七八糟。'),
  ], [
    gc('跑去幫怪獸把導線理好，順便問他要不要幫忙。', 'wen', '溫尚翊', '妳先不要踩到線啦。……好，幫我拿那個接頭就好。', 2),
    gc('坐到阿信旁邊，請他先彈一小段給你聽。', 'ashin', '陳信宏', '好啊，等我把弦調好。妳先坐這邊，不會被風吹到沙。', 2),
    gc('走到瑪莎旁邊，故意問他 Bass 是不是重到快把他壓扁。', 'masa', '瑪莎', '妳真的很會講欸。來，妳試著拿一下就知道了。', 2),
  ]),
  groupRound('第一段旋律', [
    n('幾個人總算把音調好。阿信先彈出一段簡單的和弦，怪獸接上電吉他的旋律，石頭跟著補了一層乾淨的節奏。瑪莎一開始還在抱怨，手指落到 Bass 弦上後卻立刻跟上；諺明哥用鼓棒敲著木箱，節奏穩穩地把大家兜在一起。'),
    n('你坐在他們中間，聽著幾種聲音慢慢合起來。沒有誰在指揮，也沒有誰急著把它變成一首完整的歌。'),
  ], [
    gc('跟著阿信的和弦輕輕唱起來。', 'ashin', '陳信宏', '欸，妳真的有跟上耶。不要停，這樣剛剛好。', 2),
    gc('朝怪獸比個大拇指，說他的那段最帥。', 'wen', '溫尚翊', '妳不要突然講這種話啦……看前面，等一下又錯拍。', 2),
    gc('故意把瑪莎的低音哼得很誇張。', 'masa', '瑪莎', '妳那個是什麼聲音啦？不要破壞我的低音好不好！', 2),
  ]),
  groupRound('太陽快下去了', [
    n('第二段旋律比第一段順得多。諺明哥把節奏放慢，石頭的吉他聲像是把海浪的空隙補起來。阿信唱到一半忘了下一句，索性笑著停下來；瑪莎立刻抓住機會吐槽，溫尚翊則用琴弦輕輕掃了一下，像是在催大家繼續。'),
    d('石錦航', '再一次好了，這次應該會更順。'),
    n('你看著海面上的光慢慢縮小，忽然有點捨不得這段時間結束。'),
  ], [
    gc('說想再聽一次阿信剛剛唱的那一段。', 'ashin', '陳信宏', '好啊，這次我記得下一句了。妳要一起唱喔。', 2),
    gc('把怪獸的撥片遞回去，叫他不要偷懶。', 'wen', '溫尚翊', '誰偷懶？我剛剛明明彈最多。妳才不要跑掉。', 2),
    gc('請石頭把剛剛那段拍下來，說想留作紀念。', 'stone', '石錦航', '好，我把相機架好。等一下大家再一起來一次。', 2),
  ]),
]

const photoChoices: [GroupChoice, GroupChoice, GroupChoice, GroupChoice, GroupChoice] = [
  gc('拉住溫尚翊的外套袖子，叫他站近一點，不要躲到最旁邊。', 'wen', '溫尚翊', '我哪有躲？……好啦，妳站中間一點，這樣才拍得到。', 2),
  gc('朝阿信招招手，讓他站到你旁邊一起看鏡頭。', 'ashin', '陳信宏', '好啊，我站這裡。妳頭髮被風吹起來了，等一下我提醒妳。', 2),
  gc('抓住瑪莎的手臂，不准他趁倒數時跑去躲鏡頭。', 'masa', '瑪莎', '欸！我哪有要躲？妳先放手啦……好啦，站這裡。', 2),
  gc('站到石頭旁邊，請他也不要只顧著按快門，這次要一起入鏡。', 'stone', '石錦航', '好，我把定時器設好就過去。妳幫我留個位置。', 2),
  gc('把諺明哥拉到大家中間，說這張照片不能少了他。', 'yanming', '劉諺明', '好，這次我不站外面了。大家靠近一點，才不會有人被切掉。', 2),
]

const sunsetSoloRoutes: CharacterRecord = sunsetRoutes

const initialInteraction = (): Interaction => ({ character: null, roundIndex: 0, pendingChoice: null, choices: [] })
const initialGroup = (): GroupProgress => ({ roundIndex: 0, pendingChoice: null, choices: [] })
const initialProgress = (): Progress => ({
  version: 1, phase: 'trip-intro', train: initialInteraction(), poker: initialGroup(),
  homestay: initialInteraction(), scooter: initialInteraction(), photoChoice: null,
  sunsetGroup: initialGroup(), sunset: initialInteraction(),
})
const isCharacter = (value: unknown): value is SeptemberCharacter => typeof value === 'string' && ORDER.includes(value as SeptemberCharacter)
const validChoices = (value: unknown): value is number[] => Array.isArray(value) && value.every((item) => Number.isInteger(item) && item >= 0 && item <= 2)
const validInteraction = (value: unknown): value is Interaction => {
  if (!value || typeof value !== 'object') return false
  const item = value as Partial<Interaction>
  return (item.character === null || isCharacter(item.character)) &&
    Number.isInteger(item.roundIndex) && Number(item.roundIndex) >= 0 && Number(item.roundIndex) <= 2 &&
    (item.pendingChoice === null || (Number.isInteger(item.pendingChoice) && Number(item.pendingChoice) >= 0 && Number(item.pendingChoice) <= 2)) &&
    validChoices(item.choices)
}
const validGroup = (value: unknown): value is GroupProgress => {
  if (!value || typeof value !== 'object') return false
  const item = value as Partial<GroupProgress>
  return Number.isInteger(item.roundIndex) && Number(item.roundIndex) >= 0 && Number(item.roundIndex) <= 2 &&
    (item.pendingChoice === null || (Number.isInteger(item.pendingChoice) && Number(item.pendingChoice) >= 0 && Number(item.pendingChoice) <= 4)) &&
    validChoices(item.choices)
}
function readProgress(): Progress {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as Partial<Progress> | null
    const phases: Phase[] = ['trip-intro', 'train-picker', 'train-interaction', 'arrival', 'homestay-arrival', 'poker', 'homestay-picker', 'homestay-interaction', 'day-two-morning', 'scooter-picker', 'scooter-interaction', 'coast-photo', 'sunset-group', 'sunset-picker', 'sunset-interaction', 'return', 'ending']
    if (saved?.version === 1 && saved.phase && phases.includes(saved.phase) &&
      validInteraction(saved.train) && validGroup(saved.poker) && validInteraction(saved.homestay) &&
      validInteraction(saved.scooter) && validGroup(saved.sunsetGroup) && validInteraction(saved.sunset) &&
      (saved.photoChoice === null || (Number.isInteger(saved.photoChoice) && Number(saved.photoChoice) >= 0 && Number(saved.photoChoice) <= 4))) {
      return saved as Progress
    }
  } catch { /* Start from the first trip scene if local progress is malformed. */ }
  return initialProgress()
}

const phaseDate = (phase: Phase): string => {
  if (phase === 'trip-intro') return '1997.09.03'
  if (['day-two-morning', 'scooter-picker', 'scooter-interaction', 'coast-photo', 'sunset-group', 'sunset-picker', 'sunset-interaction'].includes(phase)) return '1997.09.05'
  if (phase === 'return' || phase === 'ending') return '1997.09.06'
  return '1997.09.04'
}
const phaseClock = (progress: Progress): string => {
  if (progress.phase === 'trip-intro') return '19:20'
  if (progress.phase === 'train-picker') return '07:10'
  if (progress.phase === 'train-interaction') return ['08:10', '09:05', '10:05'][progress.train.roundIndex]
  if (progress.phase === 'arrival') return '12:30'
  if (progress.phase === 'homestay-arrival') return '16:10'
  if (progress.phase === 'poker') return ['19:20', '19:45', '20:10'][progress.poker.roundIndex]
  if (progress.phase === 'homestay-picker') return '20:45'
  if (progress.phase === 'homestay-interaction') return ['21:00', '21:20', '21:40'][progress.homestay.roundIndex]
  if (progress.phase === 'day-two-morning') return '08:05'
  if (progress.phase === 'scooter-picker') return '09:15'
  if (progress.phase === 'scooter-interaction') return ['09:45', '10:35', '11:25'][progress.scooter.roundIndex]
  if (progress.phase === 'coast-photo') return '14:20'
  if (progress.phase === 'sunset-group') return ['17:10', '17:35', '18:00'][progress.sunsetGroup.roundIndex]
  if (progress.phase === 'sunset-picker') return '18:15'
  if (progress.phase === 'sunset-interaction') return ['18:25', '18:45', '19:05'][progress.sunset.roundIndex]
  if (progress.phase === 'return') return '09:30'
  return '16:20'
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="narrative-blocks">
      {blocks.map((block, index) => block.kind === 'dialogue' ? (
        <div className="narrative-dialogue" key={index}>
          <span>{block.speaker}</span>
          <p>{'「' + block.text.replace(/^「|」$/g, '') + '」'}</p>
        </div>
      ) : (
        <p className="narrative-paragraph" key={index}>{block.text}</p>
      ))}
    </div>
  )
}

export function SeptemberPhotoCard({ caption = '1997.09.05 · 綠島海邊 · 六個人' }: { caption?: string }) {
  return (
    <div className="september-photo-print" role="img" aria-label="綠島海邊的六人合照：你和溫尚翊、陳信宏、瑪莎、石錦航、劉諺明站在夕陽與海風裡">
      <div className="september-photo-image">
        <span className="september-photo-sun" />
        <span className="september-photo-sea" />
        <div className="september-photo-people">
          {ORDER.map((character) => <span key={character} className={'september-photo-person person-' + character} />)}
          <span className="september-photo-person person-you" />
        </div>
      </div>
      <div className="september-photo-caption">
        <strong>綠島・海邊</strong>
        <span>{caption}</span>
      </div>
    </div>
  )
}

export function SeptemberStory({
  onAddAffection,
  onClockChange,
  onFinish,
}: {
  onAddAffection: (character: SeptemberCharacter, amount: number) => void
  onClockChange: (time: string) => void
  onFinish: (selection: SeptemberSelection) => void
}) {
  const [progress, setProgress] = useState<Progress>(readProgress)
  const choiceLock = useRef(false)
  const finishLock = useRef(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    localStorage.setItem('mayday-september-date', phaseDate(progress.phase))
    onClockChange(phaseClock(progress))
  }, [progress, onClockChange])

  const addAffectionOnce = (key: string, character: SeptemberCharacter, amount: number) => {
    const storageKey = 'mayday-september-affection-' + key
    if (localStorage.getItem(storageKey) === 'true') return
    localStorage.setItem(storageKey, 'true')
    onAddAffection(character, amount)
  }

  const sectionState = (section: Section): Interaction => progress[section]
  const sectionPhase: Record<Section, Phase> = {
    train: 'train-interaction', homestay: 'homestay-interaction',
    scooter: 'scooter-interaction', sunset: 'sunset-interaction',
  }
  const sectionNextPhase: Record<Section, Phase> = {
    train: 'arrival', homestay: 'day-two-morning',
    scooter: 'coast-photo', sunset: 'return',
  }
  const sectionRoutes: Record<Section, CharacterRecord> = {
    train: trainRoutes, homestay: homestayRoutes, scooter: scooterRoutes, sunset: sunsetSoloRoutes,
  }

  const selectCharacter = (section: Section, character: SeptemberCharacter) => {
    const current = sectionState(section)
    if (current.character !== null || choiceLock.current) return
    choiceLock.current = true
    addAffectionOnce(section + '-seat-' + character, character, 1)
    setProgress((state) => ({
      ...state,
      phase: sectionPhase[section],
      [section]: { character, roundIndex: 0, pendingChoice: null, choices: [] },
    }))
    window.setTimeout(() => { choiceLock.current = false }, 0)
  }

  const chooseRouteOption = (section: Section, index: number) => {
    const current = sectionState(section)
    if (progress.phase !== sectionPhase[section] || !current.character || current.pendingChoice !== null || choiceLock.current) return
    const round = sectionRoutes[section][current.character][current.roundIndex]
    const selected = round.choices[index]
    if (!selected) return
    choiceLock.current = true
    addAffectionOnce(section + '-round-' + current.roundIndex, current.character, selected.affection)
    const next = { ...current, pendingChoice: index, choices: [...current.choices, index] }
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...progress, [section]: next }))
    setProgress((state) => ({ ...state, [section]: next }))
  }

  const continueRouteRound = (section: Section) => {
    const current = sectionState(section)
    if (current.pendingChoice === null) return
    choiceLock.current = false
    if (current.roundIndex < 2) {
      setProgress((state) => ({
        ...state,
        [section]: { ...current, roundIndex: current.roundIndex + 1, pendingChoice: null },
      }))
    } else {
      setProgress((state) => ({ ...state, phase: sectionNextPhase[section] }))
    }
  }

  const chooseGroupOption = (section: 'poker' | 'sunsetGroup', index: number) => {
    const current = progress[section]
    const expectedPhase: Phase = section === 'poker' ? 'poker' : 'sunset-group'
    const rounds = section === 'poker' ? pokerRounds : sunsetGroupRounds
    if (progress.phase !== expectedPhase || current.pendingChoice !== null || choiceLock.current) return
    const selected = rounds[current.roundIndex].choices[index]
    if (!selected) return
    choiceLock.current = true
    addAffectionOnce(section + '-round-' + current.roundIndex, selected.target, selected.affection)
    const next = { ...current, pendingChoice: index, choices: [...current.choices, index] }
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...progress, [section]: next }))
    setProgress((state) => ({ ...state, [section]: next }))
  }

  const continueGroupRound = (section: 'poker' | 'sunsetGroup') => {
    const current = progress[section]
    if (current.pendingChoice === null) return
    choiceLock.current = false
    if (current.roundIndex < 2) {
      setProgress((state) => ({
        ...state,
        [section]: { ...current, roundIndex: current.roundIndex + 1, pendingChoice: null },
      }))
    } else {
      setProgress((state) => ({
        ...state,
        phase: section === 'poker' ? 'homestay-picker' : 'sunset-picker',
      }))
    }
  }

  const choosePhotoPosition = (index: number) => {
    if (progress.phase !== 'coast-photo' || progress.photoChoice !== null || choiceLock.current) return
    const selected = photoChoices[index]
    if (!selected) return
    choiceLock.current = true
    addAffectionOnce('photo-position', selected.target, selected.affection)
    setProgress((state) => ({ ...state, photoChoice: index }))
  }

  const continuePhoto = () => {
    if (progress.photoChoice === null) return
    choiceLock.current = false
    setProgress((state) => ({ ...state, phase: 'sunset-group' }))
  }

  const startTrain = () => setProgress((state) => ({ ...state, phase: 'train-picker' }))
  const startArrival = () => setProgress((state) => ({ ...state, phase: 'homestay-arrival' }))
  const startPoker = () => setProgress((state) => ({ ...state, phase: 'poker', poker: initialGroup() }))
  const startScooter = () => setProgress((state) => ({ ...state, phase: 'scooter-picker' }))
  const continueReturn = () => setProgress((state) => ({ ...state, phase: 'ending' }))

  const finish = () => {
    if (progress.phase !== 'ending' || finishLock.current) return
    const { train, poker, homestay, scooter, sunsetGroup, sunset, photoChoice } = progress
    if (!train.character || train.choices.length !== 3 || poker.choices.length !== 3 ||
      !homestay.character || homestay.choices.length !== 3 ||
      !scooter.character || scooter.choices.length !== 3 || photoChoice === null ||
      sunsetGroup.choices.length !== 3 || !sunset.character || sunset.choices.length !== 3) return
    finishLock.current = true
    onFinish({
      trainCharacter: train.character, trainChoices: [...train.choices],
      pokerChoices: [...poker.choices],
      homestayCharacter: homestay.character, homestayChoices: [...homestay.choices],
      scooterCharacter: scooter.character, scooterChoices: [...scooter.choices],
      photoChoice, sunsetGroupChoices: [...sunsetGroup.choices],
      sunsetCharacter: sunset.character, sunsetChoices: [...sunset.choices],
    })
  }

  const interactionFor = (section: Section) => {
    const current = sectionState(section)
    if (progress.phase !== sectionPhase[section] || !current.character) return null
    const round = sectionRoutes[section][current.character][current.roundIndex]
    const selected = current.pendingChoice === null ? null : round.choices[current.pendingChoice]
    return { current, round, selected }
  }
  const trainCurrent = interactionFor('train')
  const homestayCurrent = interactionFor('homestay')
  const scooterCurrent = interactionFor('scooter')
  const sunsetCurrent = interactionFor('sunset')
  const pokerCurrent = progress.phase === 'poker' ? pokerRounds[progress.poker.roundIndex] : null
  const pokerSelected = pokerCurrent && progress.poker.pendingChoice !== null ? pokerCurrent.choices[progress.poker.pendingChoice] : null
  const sunsetGroupCurrent = progress.phase === 'sunset-group' ? sunsetGroupRounds[progress.sunsetGroup.roundIndex] : null
  const sunsetGroupSelected = sunsetGroupCurrent && progress.sunsetGroup.pendingChoice !== null ? sunsetGroupCurrent.choices[progress.sunsetGroup.pendingChoice] : null

  const picker = (title: string, intro: string, section: Section) => (
    <>
      <h2 className="story-scene-title">{title}</h2>
      <p className="narrative-paragraph">{intro}</p>
      <div className="month-visit-picker september-person-picker">
        {ORDER.map((character) => (
          <button className="free-time-person" key={character} onClick={() => selectCharacter(section, character)}>
            <span className="sms-avatar">{character === 'wen' ? '怪' : character === 'ashin' ? '信' : character === 'masa' ? '莎' : character === 'stone' ? '石' : '諺'}</span>
            <span><strong>{NAMES[character]}</strong><small>{section === 'train' ? '選擇火車上的同行座位' : section === 'homestay' ? '牌局結束後，找他單獨聊聊' : section === 'scooter' ? '選擇環島時一起騎車的人' : '日落後，找他多待一會兒'}</small></span>
            <ChevronRight size={15} />
          </button>
        ))}
      </div>
    </>
  )

  const renderInteraction = (section: Section, current: ReturnType<typeof interactionFor>) => {
    if (!current) return null
    const { current: state, round, selected } = current
    return (
      <>
        <h2 className="story-scene-title">{round.title}</h2>
        <div className="reunion-pause-note">和{NAMES[state.character!]}同行・第 {state.roundIndex + 1}／3 段</div>
        <Blocks blocks={round.blocks} />
        {selected ? (
          <>
            <Blocks blocks={[d('你', selected.text)]} />
            <Blocks blocks={selected.response} />
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={() => continueRouteRound(section)}>
                {state.roundIndex < 2 ? '繼續這段旅程' : section === 'train' ? '抵達台東，準備轉船' : section === 'homestay' ? '天亮了，準備出發' : section === 'scooter' ? '停下來拍張合照' : '收拾樂器，準備回程'} <ChevronRight size={15} />
              </button>
            </div>
          </>
        ) : (
          <div className="choice-area">
            <div className="choice-heading">你想怎麼回應？</div>
            {round.choices.map((choice, index) => (
              <button className="reply-choice" key={index} onClick={() => chooseRouteOption(section, index)}>
                <span>{choice.text}</span><ChevronRight size={15} />
              </button>
            ))}
          </div>
        )}
      </>
    )
  }

  const groupInteraction = (section: 'poker' | 'sunsetGroup', current: GroupRound | null, selected: GroupChoice | null) => {
    if (!current) return null
    const state = progress[section]
    return (
      <>
        <h2 className="story-scene-title">{current.title}</h2>
        <div className="reunion-pause-note">六個人的晚上・第 {state.roundIndex + 1}／3 輪</div>
        <Blocks blocks={current.blocks} />
        {selected ? (
          <>
            <Blocks blocks={[d('你', selected.text)]} />
            <Blocks blocks={selected.response} />
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={() => continueGroupRound(section)}>
                {state.roundIndex < 2 ? '下一把，繼續玩' : section === 'poker' ? '牌局結束，去外面透透氣' : '太陽快下山了'} <ChevronRight size={15} />
              </button>
            </div>
          </>
        ) : (
          <div className="choice-area">
            <div className="choice-heading">你想加入哪一邊？</div>
            {current.choices.map((choice, index) => (
              <button className="reply-choice" key={index} onClick={() => chooseGroupOption(section, index)}>
                <span>{choice.text}</span><ChevronRight size={15} />
              </button>
            ))}
          </div>
        )}
      </>
    )
  }

  const dayLabel = progress.phase === 'trip-intro'
    ? '1997 年 9 月 3 日・星期三・晚上'
    : progress.phase === 'day-two-morning' || progress.phase === 'scooter-picker' || progress.phase === 'scooter-interaction' || progress.phase === 'coast-photo' || progress.phase === 'sunset-group' || progress.phase === 'sunset-picker' || progress.phase === 'sunset-interaction'
    ? '1997 年 9 月 5 日・星期五'
    : progress.phase === 'return' || progress.phase === 'ending'
      ? '1997 年 9 月 6 日・星期六'
      : '1997 年 9 月 4 日・星期四'

  return (
    <div className="story-screen-overlay">
      <div className="story-screen-head">
        <div className="chapter-mark">九月・綠島旅行</div>
        <div className="story-contact-title">
          <strong>{progress.phase === 'ending' ? '夏天的海，和我們' : '綠島三日小旅行'}</strong>
          <small>{dayLabel}</small>
        </div>
        <span className="story-head-spacer" />
      </div>
      <div className="story-narrative-scroll">
        <div className="story-kicker">SEPTEMBER · A TRIP TO THE SEA</div>

        {progress.phase === 'trip-intro' && (
          <>
            <h2 className="story-scene-title">出發！去看海</h2>
            <Blocks blocks={[
              n('你把包放到牆邊，瑪莎正翻著那本旅遊手冊，忽然把它啪地放到桌上。練團室的電風扇轉得吱呀作響，幾個人剛收好樂器，誰也不太想立刻回家。'),
              d('瑪莎', '不然出去玩啊。趁還沒開學，去有海的地方。'),
              n('溫尚翊原本在收導線，聽見這句話抬起頭，嘴上先嫌了一句，手卻沒有停。阿信把木吉他抱在腿上，說最近每天都在練團，好像真的沒有好好出去玩過。石頭提議去東邊，諺明哥拿過手冊看了看，最後指向台東外海的綠島。'),
              d('劉諺明', '搭火車到台東，再轉船上島。三天兩夜剛好，不用趕。'),
              d('你', '綠島！我想去！'),
              n('你幾乎是從椅子上彈起來的。瑪莎看著你笑，溫尚翊把最後一條導線繞好，抬眼說了一句「那就真的去啊」，像是這件事本來就該這麼簡單。'),
              n('大家七嘴八舌地討論了好一會兒，最後把車票、船班和民宿都確認下來。更誇張的是，幾個人還決定把樂器帶上：溫尚翊的電吉他、阿信的木吉他、石頭的吉他、瑪莎的 Bass，諺明哥則帶了鼓棒和一件小型打擊樂器。你看著排在牆邊的琴袋，突然覺得這趟旅行大概不會太安靜。'),
              n('這次同行的只有你們六個人。明天一早在台北車站集合，先搭火車到台東，再轉船上綠島。行程終於定下來，大家卻還坐在練團室裡，像是已經開始期待明天了。'),
            ]} />
            <div className="reunion-pause-note">三天兩夜・台東轉船・綠島環島</div>
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={startTrain}>隔天一早，台北車站見 <ChevronRight size={15} /></button>
            </div>
          </>
        )}

        {progress.phase === 'train-picker' && picker('火車上，想坐在誰旁邊？', '台北車站的月台開始廣播。大家把琴袋和行李搬上車，諺明哥確認好車票後，還剩下一個靠窗的位置和幾個空位。你看了看他們，決定這段路要和誰一起坐。', 'train')}

        {progress.phase === 'train-interaction' && renderInteraction('train', trainCurrent)}

        {progress.phase === 'arrival' && (
          <>
            <h2 className="story-scene-title">一路往海的方向</h2>
            <Blocks blocks={[
              n('列車一路往南，窗外的景色從城市的屋頂慢慢變成田地、山線和偶爾閃過的海。你們中途換過一次位置拿行李，瑪莎嫌琴袋太多，卻還是伸手幫石頭把吉他往裡面推；阿信在車廂裡找到了好吃的便當，硬是分了幾口給你；溫尚翊嘴上說不要，最後還是把你快滑下來的外套撿回來。'),
              n('抵達台東後，大家提著行李和樂器往富岡漁港移動。海風比台北更直接，船還沒開，瑪莎就已經開始嫌自己背上的 Bass 太重。諺明哥把船票一張張分好，石頭確認相機和底片都在，阿信站在欄杆邊看著海面，溫尚翊則幫你把行李放到不會被浪花濺到的位置。'),
              d('陳信宏', '真的要上島了欸。感覺有點像去很遠的地方。'),
              d('溫尚翊', '明明就沒多遠，講得好像要出國一樣。'),
              d('瑪莎', '你不要破壞氣氛好不好？'),
              n('船離開港口後，海水在船尾拉出一條白色的線。有人靠著欄杆聊天，有人閉著眼吹風。你回頭看見台東的岸慢慢變小，突然有種這個夏天真的被你們偷偷拉長了一點的感覺。'),
            ]} />
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={startArrival}>抵達綠島 <ChevronRight size={15} /></button>
            </div>
          </>
        )}

        {progress.phase === 'homestay-arrival' && (
          <>
            <h2 className="story-scene-title">民宿的第一個晚上</h2>
            <Blocks blocks={[
              n('民宿就在靠海的小路旁，木頭陽台外能看見一小片藍色的海。大家先把行李和樂器搬進去，分好房間，才終於有空坐下來喘口氣。你把背包放到椅子上，剛走到公共區域，就聽見瑪莎在翻找東西。'),
              d('瑪莎', '欸！誰有帶撲克牌？'),
              n('他從背包側袋摸出一副已經有點磨舊的牌，往桌上一放。溫尚翊立刻說他一定又想耍賴，阿信笑著把水果盤往中間推，石頭替你拉開椅子，諺明哥則先確認大家明天的租車時間。'),
              d('你', '好啊！來玩！'),
              n('六個人圍著木桌坐下，窗外的海風把窗簾吹得一下一下鼓起來。誰也沒有急著回房間，這個晚上好像才剛開始。'),
            ]} />
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={startPoker}>加入牌局 <ChevronRight size={15} /></button>
            </div>
          </>
        )}

        {progress.phase === 'poker' && groupInteraction('poker', pokerCurrent, pokerSelected)}

        {progress.phase === 'homestay-picker' && picker('牌局散了，想和誰單獨待一會兒？', '最後一把結束後，大家把牌收回盒子裡。瑪莎還在算剛才到底誰偷看牌，溫尚翊說他根本沒輸，阿信笑得靠在椅背上。你趁著大家各自散開，想找一個人到院子或陽台透透氣。', 'homestay')}

        {progress.phase === 'homestay-interaction' && renderInteraction('homestay', homestayCurrent)}

        {progress.phase === 'day-two-morning' && (
          <>
            <h2 className="story-scene-title">第二天・小綿羊出發</h2>
            <Blocks blocks={[
              n('第二天早上，民宿院子裡已經有了早餐的香味。你揉著眼睛走出去，溫尚翊正把安全帽一頂頂排好，瑪莎蹲在旁邊研究車鑰匙，阿信拿著早餐問大家要不要再多買一份。石頭把相機掛到肩上，諺明哥則和租車行確認車況。'),
              d('瑪莎', '今天誰最後起床，等一下就坐最難騎的那台。'),
              d('溫尚翊', '你不要亂分配啦，先吃早餐。'),
              n('早餐吃到一半，大家開始討論要先去哪裡。沒有人想把路線排得太滿，諺明哥說沿著海岸慢慢繞就好，看到喜歡的地方再停。你看著院子裡一排小綿羊，忽然覺得今天一定會很有趣。'),
            ]} />
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={startScooter}>去租車，準備環島 <ChevronRight size={15} /></button>
            </div>
          </>
        )}

        {progress.phase === 'scooter-picker' && picker('今天想坐誰的車？', '租車行門口排著幾台小綿羊。大家各自拿好安全帽，樂器和不方便帶著走的行李先留在民宿。你看著他們一個個把車牽出來，決定今天要把後座交給誰。', 'scooter')}

        {progress.phase === 'scooter-interaction' && renderInteraction('scooter', scooterCurrent)}

        {progress.phase === 'coast-photo' && (
          <>
            <h2 className="story-scene-title">海邊停一下，拍張合照</h2>
            <Blocks blocks={[
              n('繞過一段沿海公路後，你們先在燈塔附近停了一會兒。白色的塔身被太陽曬得發亮，瑪莎拿著安全帽比了比，說這裡看起來像明信片；溫尚翊嫌他站的位置剛好擋住燈塔，兩個人又為了誰比較會找角度吵起來。再往前繞過一段海岸，路邊的風景忽然開闊起來，大家才把小綿羊停在一處能直接看見海的空地。'),
              n('風把衣角吹得亂飛，遠處的浪一層一層推上岸。你才剛摘下安全帽，瑪莎就說這裡很適合拍照；石頭把相機拿出來，找了一塊平穩的石頭架好，調整自拍定時器。'),
              d('石錦航', '這次大家都要入鏡，不可以有人只負責拍照。'),
              n('諺明哥把鼓棒和小袋子放到一旁。溫尚翊走過來，像是想替你撥開黏在臉上的髮絲，手抬到一半又停住，只用下巴指了指你的耳邊，示意你自己勾好。阿信站在另一邊，笑著問要不要把安全帽拿在手上；瑪莎則已經跑到鏡頭前面，說自己一定要站在最中間。'),
              d('溫尚翊', '你站好啦，等一下倒數完不要又突然跑掉。'),
              n('石頭把相機放到一塊平穩的石頭上，設定好自拍定時器。大家先試著排位置，瑪莎堅持站中間，怪獸嫌他擋到海，阿信笑著往旁邊挪，諺明哥則蹲下來確認鏡頭有沒有把所有人都拍進去。你站在前面，忽然發現自己還沒決定要把誰拉到身邊。'),
            ]} />
            {progress.photoChoice === null ? (
              <div className="choice-area">
                <div className="choice-heading">倒數之前，你想把誰拉到身邊？</div>
                {photoChoices.map((choice, index) => (
                  <button className="reply-choice" key={index} onClick={() => choosePhotoPosition(index)}>
                    <span>{choice.text}</span><ChevronRight size={15} />
                  </button>
                ))}
              </div>
            ) : (
              <>
                <Blocks blocks={[d('你', photoChoices[progress.photoChoice].text)]} />
                <Blocks blocks={photoChoices[progress.photoChoice].response} />
                <Blocks blocks={[
                  n('你剛把人拉到身邊，石頭就按下倒數。你們六個人往鏡頭前擠，鞋底踩進細沙裡，肩膀挨著肩膀。瑪莎在最後一秒還不忘做鬼臉，溫尚翊笑著偏過頭，阿信也跟著笑起來。快門就在一陣笑聲裡落下。'),
                  n('石頭跑回來把相機遞給大家看。六個人全都入鏡了，沒有誰被切掉。照片裡的海很藍，風很大，而你們看起來像是把整個夏天都留在那一秒。'),
                ]} />
                <SeptemberPhotoCard />
                <div className="reunion-pause-note">這張六人合照已經收進九月旅行的回憶裡。</div>
                <div className="story-action-bar story-inline-action">
                  <button className="story-primary-button" onClick={continuePhoto}>收好照片，繼續去看海 <ChevronRight size={15} /></button>
                </div>
              </>
            )}
          </>
        )}

        {progress.phase === 'sunset-group' && groupInteraction('sunsetGroup', sunsetGroupCurrent, sunsetGroupSelected)}

        {progress.phase === 'sunset-picker' && picker('日落以後，想和誰多待一會兒？', '大家把樂器收好，卻沒有急著離開海邊。海面已經變成深藍色，遠處還留著一點橘紅。你想趁大家各自忙著收東西時，找一個人再聊一會兒。', 'sunset')}

        {progress.phase === 'sunset-interaction' && renderInteraction('sunset', sunsetCurrent)}

        {progress.phase === 'return' && (
          <>
            <h2 className="story-scene-title">第三天・把海留在身後</h2>
            <Blocks blocks={[
              n('第三天早上，民宿房間裡到處都是收拾到一半的行李。你把衣服塞進背包，拉鍊卡住兩次，最後還是石頭幫你把袋口整理好。溫尚翊把琴袋背上肩，阿信確認木吉他沒有受潮，瑪莎一邊喊著東西太多，一邊把自己的 Bass 抱得緊緊的。諺明哥把房卡和船票點了一遍，確定六個人都沒有漏東西。'),
              d('瑪莎', '我宣布，下次不准有人帶這麼多樂器。'),
              d('溫尚翊', '你自己 Bass 最大，還敢講。'),
              d('陳信宏', '可是昨天真的很好玩欸。下次可以再找個地方。'),
              d('石錦航', '照片洗出來之後，再一起看吧。'),
              d('劉諺明', '先把船搭好，回台東再轉火車。大家的行李都拿好了嗎？'),
              n('船離開綠島時，你靠在欄杆旁，看著海面慢慢往後退。阿信站在你旁邊，溫尚翊把一瓶水遞過來，瑪莎還在和石頭爭論照片裡到底誰的表情最奇怪。諺明哥確認完行李，終於也空出手來，站到你們旁邊吹風。'),
              n('回到台北時，天色已經暗了。大家在車站外把琴袋一個個分好，明明三天前還在討論要去哪裡，現在卻像是一下子就走完了。你低頭看著石頭先沖洗出來的那張小樣，照片裡六個人擠在海邊，誰也沒有站得端端正正。'),
            ]} />
            <div className="reunion-pause-note">1997 年 9 月 6 日・星期六・旅行結束</div>
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={continueReturn}>寫下這趟旅行 <ChevronRight size={15} /></button>
            </div>
          </>
        )}

        {progress.phase === 'ending' && (
          <>
            <h2 className="story-scene-title">夏天的海，和我們</h2>
            <Blocks blocks={[
              n('你們在車站外道別。溫尚翊把琴袋往肩上拉好，還不忘提醒你回家不要忘記把照片收好；阿信說等底片洗出來，要找一天一起看；瑪莎已經開始嫌這趟旅行太累，卻又說下次可以換個地方；石頭答應會多洗幾張照片；諺明哥則確認大家都找到回家的車，才終於轉身離開。'),
              n('你把那張六人合照小樣放進包包最裡層。紙片薄薄的，卻像是把這三天的海風、笑聲、琴聲和那些沒說出口的小心思，全都一起夾了進去。'),
              n('九月還沒開學，夏天也還沒有真的結束。只是這一次，你知道自己會很想念這幾天。'),
            ]} />
            <SeptemberPhotoCard />
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={finish}>寫進九月日記 <ChevronRight size={15} /></button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
