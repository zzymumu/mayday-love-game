import { useEffect, useRef, useState } from 'react'
import { ChevronRight } from 'lucide-react'

export type AugustCharacter = 'wen' | 'ashin' | 'masa' | 'stone' | 'yanming'
export type AugustSelection = {
  storeCandidates: AugustCharacter[]
  storeChoices: number[]
  eveningRoute: 'fried' | 'yanming'
  eveningCharacter: AugustCharacter
  eveningChoices: number[]
}

type Three<T> = [T, T, T]
type Five<T> = [T, T, T, T, T]
type Block = { kind: 'narration' | 'dialogue'; text: string; speaker?: string }
type Choice = {
  text: string
  affection: number
  response: Block[]
  affectionByCharacter?: Partial<Record<AugustCharacter, number>>
}
type Round = { title: string; blocks: Block[]; choices: Three<Choice> }
type RoundSpec = {
  title: string
  scene: string
  opening?: string
  prompts: Three<string>
  actions: Three<string>
  replies: Three<string>
}
type Phase =
  | 'transition'
  | 'store-intro'
  | 'store-interaction'
  | 'store-ending'
  | 'evening-choice'
  | 'fried-intro'
  | 'fried-picker'
  | 'yanming-intro'
  | 'evening-interaction'
  | 'evening-ending'
type Progress = {
  phase: Phase
  storeCandidates: AugustCharacter[]
  storeRoundIndex: number
  storePendingChoice: number | null
  storeChoices: number[]
  eveningRoute: 'fried' | 'yanming' | null
  eveningCharacter: AugustCharacter | null
  eveningRoundIndex: number
  eveningPendingChoice: number | null
  eveningChoices: number[]
}

const STORAGE_KEY = 'mayday-august-story-progress-v1'
const ORDER: AugustCharacter[] = ['wen', 'ashin', 'masa', 'stone', 'yanming']
const FRIED_ORDER: AugustCharacter[] = ['wen', 'ashin', 'masa', 'stone']
const NAMES: Record<AugustCharacter, string> = {
  wen: '溫尚翊',
  ashin: '陳信宏',
  masa: '蔡昇晏',
  stone: '石錦航',
  yanming: '劉諺明',
}
const SPEAKER_NAMES: Record<AugustCharacter, string> = {
  wen: '溫尚翊',
  ashin: '陳信宏',
  masa: '瑪莎',
  stone: '石錦航',
  yanming: '劉諺明',
}
const n = (text: string): Block => ({ kind: 'narration', text })
const d = (speaker: string, text: string): Block => ({ kind: 'dialogue', speaker, text })
const five = <T,>(...items: Five<T>): Five<T> => items
const spec = (
  title: string,
  scene: string,
  prompts: Three<string>,
  actions: Three<string>,
  replies: Three<string>,
  opening?: string,
): RoundSpec => ({ title, scene, prompts, actions, replies, opening })

const transitionBlocks: Block[] = [
  n('七月十五日那晚的意外，最後平平安安地過去了。那天的事情沒有被特別寫下來，卻還是留在了暑假的某個角落。接下來的日子又慢慢回到原本的節奏，白天打工，偶爾去練團室坐坐，晚上和大家傳幾句訊息。'),
  n('八月的天氣依舊熱得不像話。午後的柏油路曬得發亮，便利店的冷氣成了你每天上班時最期待的東西。你已經熟悉了收銀機的聲音、冰櫃門打開時冒出的冷氣，還有店長每次補貨前都會提醒你先看日期的習慣。'),
  n('今天也是一樣。你換好制服，把頭髮重新綁好，站回收銀台後面。原本只打算安安穩穩地做完這個班，沒想到下午的便利店，似乎會比平常熱鬧得多。'),
]

const soloStoreSpecs: Record<AugustCharacter, Five<RoundSpec>> = {
  wen: five(
    spec('順路買瓶飲料？', '你正在收銀台後面整理零錢，門口的感應鈴響了一聲。溫尚翊走進來，先往你這邊看了一眼，才慢悠悠地轉去冰櫃。明明已經看見你穿著制服，他還是拿著汽水走到櫃檯前才開口。', ['你不是早就看到我在上班了嗎？', '今天怎麼有空過來？', '你該不會只是想找人聊天吧？'], ['你把找零盤往前推了一點，故意抬眼看他。他被你問得頓了一下，隨即把汽水放到櫃檯上。', '你把收銀台旁邊的購物袋拉開。他看了看你，又看了看手裡的汽水，語氣裝得很隨意。', '你忍著笑看他。他清了清喉嚨，像是想把話題帶開，手指卻還停在汽水瓶蓋上。'], ['有看到啊，問一下也不行喔？', '剛好經過啦，順便買一下。', '妳想太多了吧，我真的只是來買東西。'], '欸，妳今天上班喔？'),
    spec('飲料要挑這麼久？', '他結完帳卻沒有馬上走，反而站在冰櫃前看了看，又回頭問你哪一種比較好喝。你明明正在整理貨架，還是被他叫住。', ['我推薦的你敢不敢喝？', '你平常不是都隨便拿嗎？', '拿跟我一樣的就好了啦。'], ['你指了指冰櫃裡的汽水。他順著你的手看過去，伸手拿了一瓶，嘴角有點藏不住。', '你把一排飲料推回原位。他看你忙著整理，終於不再問東問西。', '你把自己剛拿的那瓶舉給他看。他看了一眼，真的又拿了一瓶一樣的。'], ['有什麼不敢的？妳不要推薦奇怪的就好。', '今天想換一下不行喔？', '好啦，那就這個。妳不要等一下又說不好喝。']),
    spec('臨時搬運工', '倉庫送來一箱飲料，你把紙箱拖到貨架旁，正準備彎腰搬上去。溫尚翊看見了，眉頭立刻皺了一下，伸手把箱子另一側接過去。', ['你不是客人嗎？怎麼還幫我搬？', '那你幫我放上面那層。', '小心喔，這箱真的很重。'], ['你伸手想接回來，他卻已經把箱子抱穩，還往旁邊讓了半步。', '你指了指最上層。他抬頭看了一眼，嘴裡嘀咕著，手上倒是很俐落。', '你提醒得太晚，他已經把箱子抬起來了，聽見你說重，還故意把手臂繃了一下。'], ['不然咧？看妳一個人搬到閃到腰喔？', '知道啦，妳站旁邊看就好。', '我有在拿啦，妳不要一直提醒。']),
    spec('忙起來就別添亂', '店裡突然來了幾位客人，你一邊掃條碼，一邊還要留意旁邊快空掉的飲料。溫尚翊本來靠在櫃檯旁，看到你忙起來，終於把玩笑收住，往旁邊退開。', ['你幫我把那幾個購物籃放回去好不好？', '先不要講話啦，我真的忙不過來。', '你幫我看一下這邊，我去補個貨。'], ['你朝門邊的購物籃指了一下。他點點頭，真的一個個拿回去，還順手把歪掉的籃子疊好。', '你忙著找零，沒有抬頭。他看了你一眼，便安靜地站到不會擋路的位置。', '你把補貨單遞給他。他接過去看了兩秒，像是怕弄錯，先問清楚才開始幫忙。'], ['好啦，這個我會。妳先顧櫃檯。', '知道啦，妳先忙。', '好，妳去吧，我在這邊看著。']),
    spec('下班還要多久？', '牆上的時鐘慢慢往交班時間靠近。你把最後一張補貨單夾好，溫尚翊卻還站在飲料櫃前，手裡拿著一包明明不急著買的餅乾。', ['你是不是在等我下班？', '今天謝謝你，真的有幫上忙。', '下次不要再假裝客人來捉弄我了。'], ['你把聲音放輕了一點。他原本低頭看著餅乾，聽見這句才抬起眼。', '你把找零交給他，順手把櫃檯整理乾淨。他看著你忙完，神情也跟著放鬆下來。', '你笑著把購物袋遞給他。他接過去，嘴上還是要回你一句。'], ['我只是剛好還有東西要買啦……妳幾點下班？', '有幫到就好啦。妳今天看起來真的忙。', '誰捉弄妳了？我哪有。下次再說啦。']),
  ),
  ashin: five(
    spec('今天的店員小姐', '阿信推門進來時，先在門口停了一下，像是怕打擾你工作。看見你抬頭，他才笑著走向飲料櫃，拿了一瓶茶。', ['你怎麼知道我今天上班？', '今天店裡很安靜，剛好可以偷懶一下。', '你先去挑東西啦，我等一下再跟你說話。'], ['你把手裡的抹布搭到櫃檯邊，阿信看見你笑起來，腳步也跟著慢了。', '你朝店裡看了一眼。他順著你的視線看過去，確認沒有客人，才把聲音放輕。', '你指了指冰櫃。他點點頭，沒有再站在櫃檯前妨礙你。'], ['沒有特別知道啦，剛好經過就進來看看馁。', '那很好啊，至少現在可以慢慢講話。', '好啊，妳先忙，我不急。'], '欸，妳今天在這裡喔？'),
    spec('推薦一瓶飲料', '阿信在冰櫃前看了好一會兒，手裡拿著兩瓶茶，像是有點選擇困難。你隔著櫃檯看他猶豫，忍不住笑了。', ['左邊那瓶比較好喝，我常買。', '你是不是每次都要研究很久？', '兩瓶都買啦，這樣就不用選了。'], ['你指了指左邊那瓶。他看了看標籤，最後真的把那瓶放進籃子裡。', '你笑著看他。他也笑了，終於把其中一瓶放回去。', '你把兩瓶都放到櫃檯上。他低頭看著，像是覺得這個答案很合理。'], ['那我聽妳的，買回去試試看馁。', '哈哈，因為我怕買到自己不喜歡的。', '好像也可以欸，反正天氣這麼熱。']),
    spec('一起補貨', '你把一箱麵包搬到架子旁，阿信看見後先把手裡的飲料放好，走過來問你需不需要幫忙。他沒有直接伸手拿，先等你點頭。', ['好啊，幫我把這排放整齊。', '你幫我扶著箱子，我來拿。', '不用啦，你今天是客人。'], ['你把架上的空位指給他看。他照著你的指示一個個排好，還把日期朝外轉正。', '你扶住紙箱，他接過另一側，兩個人配合得很順。', '你把手上的麵包放好。他沒有勉強，只是站在旁邊等你有需要再開口。'], ['這樣排可以嗎？我有把日期放前面喔。', '好，妳慢慢拿，我幫妳扶著。', '沒關係啦，妳忙妳的，我在旁邊就好。']),
    spec('忙裡偷閒的兩分鐘', '客人一下子多了起來。你忙著收銀，阿信便退到旁邊，等最後一位客人離開後才把一瓶水放到櫃檯角落。', ['你怎麼還幫我拿水？', '我現在真的需要休息兩分鐘。', '你先坐一下，我馬上就好。'], ['你看著那瓶水愣了一下。他把瓶身轉到瓶口朝外，像是怕你忙到還要多轉一次。', '你靠著櫃檯吐了口氣。他沒有追問，只把聲音放得很輕。', '你指了指旁邊的椅子。他看了一眼，沒有坐得太靠近，留出你走動的空間。'], ['妳剛剛一直在忙，想說先放著，等妳有空再喝馁。', '那妳先休息一下，不用急著回我。', '好啊，我等妳。妳慢慢來。']),
    spec('等你交班', '交班時間快到了，阿信把買好的東西放進袋子，卻沒有立刻離開。他看著你把最後一格貨架整理好，才往門邊退了退。', ['你今天是不是待很久了？', '下次有空再來找我聊天啦。', '你等一下要去哪裡？'], ['你把最後一個價牌扶正。他看見你終於停下來，才笑著把袋子提好。', '你把抹布掛回原位。他點點頭，像是把你的話記下來了。', '你抬頭看他。他想了想，沒有急著回答，先問你今天累不累。'], ['還好啦，剛好有空就過來買東西。妳今天辛苦了馁。', '好啊，我下次再來，不會每次都挑妳忙的時候。', '先回去一趟，晚點可能還要去練團。妳下班也早點回家。']),
  ),
  masa: five(
    spec('奧客上門', '瑪莎一進門就沒有往貨架走，反而直接站到櫃檯前，兩手撐著檯面，露出一副準備找麻煩的表情。', ['這位客人需要什麼服務？', '你先排隊啦，後面還有人。', '你是不是故意來找我麻煩的？'], ['你把收銀機旁的筆拿起來，故意做出要記錄的樣子。他看著你，嘴角先翹了起來。', '你朝他身後比了一下。他真的回頭看了一眼，才發現後面根本沒人。', '你挑眉看他。他聳聳肩，完全沒有被抓包的自覺。'], ['請問有沒有比較有禮貌的店員？', '我有排隊啊，妳沒看到我站在這裡喔？', '我哪有，客人不能問問題喔？'], '欸，店員小姐，請問一下。'),
    spec('挑餅乾也要挑剔', '他拿著兩包餅乾走到櫃檯，問你哪一包比較好吃。你才剛回答，他又把另一包拿起來，像是完全沒打算聽你的建議。', ['你不是都已經決定好了嗎？', '左邊那包啦，我上次吃過。', '兩包都買，反正你很會吃。'], ['你伸手把其中一包推回去。他低頭看了一眼，嘴裡嘖了一聲，還是照做了。', '你指了指左邊那包。他把另一包放回架上，還故意說自己只是參考。', '你把兩包一起放進袋子。他看著你，像是想反駁，最後只笑了一下。'], ['我只是想確認一下，不行喔？', '好啦，那我相信妳一次。', '妳很會替我花錢欸。']),
    spec('免費勞工報到', '你蹲下來拆一箱零食，膠帶黏得很緊，撕了兩次都沒成功。瑪莎站在旁邊看了一會兒，終於伸手把紙箱轉過去。', ['你終於要幫忙了喔？', '這個交給你，我去拿剪刀。', '小心一點，不要把裡面的餅乾弄破。'], ['你把膠帶頭指給他。他接過紙箱，嘴上嫌你連箱子都打不開，手倒是很快。', '你把剪刀拿來，他接過去沿著膠帶慢慢剪開，還特地避開裡面的包裝。', '你提醒得太認真，他抬起頭看你一眼，像是覺得你把他當成小朋友。'], ['不然咧？看妳拆到下班喔？', '知道啦，妳去拿，我又不會跑掉。', '我有那麼笨嗎？妳站旁邊看就好。']),
    spec('被客人抓包', '店裡忽然來了幾個客人，你忙著結帳，瑪莎卻還站在一旁，手裡拿著一包已經結過帳的餅乾。', ['你先讓開啦，我要工作。', '既然買完了就去旁邊吃，不要擋路。', '你幫我把購物籃收一下，算你有貢獻。'], ['你朝他揮了揮手。他往旁邊一退，還故意做了個拉上嘴巴拉鍊的動作。', '你指了指門邊。他拿著餅乾走開兩步，卻還回頭看你忙不忙。', '你把籃子往他那邊推。他嘆了口氣，還是乖乖把籃子疊好。'], ['好啦好啦，店員小姐不要生氣。', '我又沒有要一直站在這裡。', '這算不算有員工折扣？']),
    spec('買完還不走', '瑪莎明明已經買完了，卻又站到雜誌架前翻了兩頁。你抬頭看他，他立刻把雜誌拿得更高，裝作自己真的看得很認真。', ['你到底還要買什麼啦？', '你是不是在等我下班？', '再不走我就要請店長把你趕出去了。'], ['你把抹布放下，隔著櫃檯看他。他翻頁的手停了一下，才慢慢回頭。', '你把聲音放輕。他沒有馬上接話，先低頭看了看手裡的雜誌。', '你故意板起臉。他把雜誌放回架上，卻還是笑得一臉欠揍。'], ['我看看有沒有什麼需要的啊。', '蛤？妳想太多了啦，我只是還沒看完。', '好啦好啦，知道妳很忙，我等一下就走。']),
  ),
  stone: five(
    spec('安靜的熟客', '石頭推門進來時，手裡拿著一張小紙條。他先看了看店裡的動線，確認沒有擋到你，才走到櫃檯前。', ['你今天怎麼會過來？', '你要買什麼？我幫你找。', '你先去逛，我現在還有一點忙。'], ['你把手裡的筆放下。他看見你有空，才把紙條收進口袋。', '你指了指貨架。他順著你指的方向看過去，沒有急著讓你離開櫃檯。', '你朝他笑了一下。他點點頭，自己慢慢往裡面走。'], ['剛好經過，想說進來買點東西。妳今天忙嗎？', '謝謝，我先自己找找看，妳不用特地過來。', '好啊，妳先忙，我不急。'], '妳今天在這裡上班嗎？'),
    spec('幫你留一口氣', '石頭拿了飲料和一個麵包，結帳時又看見你把午餐袋放在櫃檯底下，卻一直沒有時間打開。', ['你怎麼知道我還沒吃？', '那個麵包是買給我的嗎？', '你不用特地幫我買啦。'], ['你有些意外地看著他。他把麵包放到不會碰到收銀機的位置，語氣很自然。', '你低頭看了看麵包。他也看了一眼，像是怕你誤會，連忙補了一句。', '你把錢包拿出來想付錢。他輕輕搖頭，沒有讓你把錢放到櫃檯上。'], ['看妳一直沒空吃東西，想說先買著，等妳休息再吃。', '嗯，想說妳可能會餓。不是什麼特別的東西啦。', '沒關係，真的不貴。妳等一下記得吃就好。']),
    spec('把貨架整理好', '你正要把一排飲料補滿，石頭看見最下面那層有幾瓶歪了，便蹲下來幫你把位置空出來。', ['你連這個都注意到了喔？', '那你幫我把下面那層排好。', '小心，地上有一點水。'], ['他把飲料一瓶瓶轉正，還順手把地上的水漬擦乾，動作很仔細。', '你把上層補好，他也把下面那排排得整整齊齊。', '他先停下來看了一眼地面，拿起旁邊的拖把把水擦乾才繼續。'], ['剛好看到而已，這樣拿的時候比較方便。', '好，妳先忙上面，我把下面整理好。', '謝謝妳提醒，我先把這邊處理好。']),
    spec('客人多起來了', '店裡一下子忙了起來。石頭沒有一直跟你說話，只是在你忙著收銀時，把旁邊空掉的購物籃收好，讓客人不會擠在櫃檯前。', ['謝謝你，剛剛真的幫到我了。', '你不用一直幫我啦，坐著休息就好。', '你幫我把那袋東西放到旁邊好嗎？'], ['他把最後一個籃子放回原位，才轉頭對你笑了一下。', '他看了看你，又看了看旁邊的椅子，最後還是坐下來等你忙完。', '他照著你指的方向把袋子放好，還把提把整理到外面。'], ['不客氣，剛好順手。妳先忙。', '好，我坐一下，妳有需要再叫我。', '放這裡可以嗎？這樣比較不會擋到人。']),
    spec('下班前的招呼', '交班時間快到了。你把最後一排商品補齊，石頭也把買好的東西收進袋子，站在門邊等你把工作做完。', ['你今天是不是特地來看我的？', '下次有空再來坐一下嘛。', '今天謝謝你，麵包我會記得吃。'], ['你把制服袖口拉好。他聽見你的話，眼神柔和了一點，沒有急著否認。', '你朝他揮揮手。他點點頭，像是已經把下次的時間放在心裡。', '你笑著把袋子拿起來。他看了一眼，像是放心了些。'], ['剛好有空，就想說來看看妳。今天辛苦了。', '好啊，妳下次上班時間如果方便，可以先跟我說。', '那就好。回去路上慢慢走，不要太趕。']),
  ),
  yanming: five(
    spec('練團室用品採購', '諺明哥推門進來時，手裡拿著一張寫了幾項用品的紙。他先看見你，朝你點了點頭，才走到文具和日用品那一排。', ['諺明哥，你怎麼會來這裡？', '練團室又缺東西了喔？', '你先慢慢挑，我等一下幫你結帳。'], ['你把手裡的補貨單放下。他看見你有空，才走到櫃檯前。', '他低頭看了看清單，笑了一下，像是被你猜中了。', '他把紙條折好收起來，沒有催你，先自己把東西找齊。'], ['剛好要補一些東西，想說這附近買比較方便。妳今天上班啊？', '嗯，膠帶、紙巾和幾樣小東西，都是練團室會用到的。', '好，妳先忙，我找齊再過來。'], '妳今天上班啊？'),
    spec('清單上還缺一樣', '諺明哥把幾樣用品放進籃子，低頭對著清單核對。你看見他在某一項旁邊畫了個圈，便隔著櫃檯問了一句。', ['是不是還少了什麼？', '你連買東西都要列清單喔？', '要不要我幫你找？'], ['他把清單遞給你看，讓你確認上面寫的品項。', '他笑了一下，把筆帽蓋好，語氣仍然很平穩。', '他把籃子往你這邊移了一點，指給你看缺的那樣東西。'], ['還差一卷寬一點的膠帶，我剛剛沒看到。', '東西多了容易忘，寫下來比較快。', '如果妳有空，麻煩妳幫我看一下架子最下面。']),
    spec('紙箱有點重', '你把一箱紙巾拖到貨架旁，諺明哥看見後先把自己的籃子放好，走過來接住另一側。', ['這個不用你幫忙啦。', '那麻煩你幫我扶一下。', '你今天是來採購，還是來當搬運工？'], ['他沒有跟你爭，只是把箱子扶穩，等你把裡面的東西拿出來。', '他站在另一側配合你的動作，確認箱子不會歪才慢慢放下。', '他低頭看了看箱子，忍不住笑了一下，還是伸手幫你抬起來。'], ['沒關係，這個我來就好，妳先顧櫃檯。', '不麻煩，妳說放哪裡就好。', '採購也要搬東西啊，剛好順手。']),
    spec('店裡忙起來', '客人一多，你得同時顧著收銀和補貨。諺明哥沒有留在櫃檯前聊天，而是把已經買好的東西放到旁邊，安靜地等你空下來。', ['你先不用等啦，我可能還要一會兒。', '謝謝你沒有一直叫我。', '你幫我把這個籃子放回去好嗎？'], ['他看了一眼時鐘，點點頭，讓你安心把手上的工作做完。', '他把袋子提好，往旁邊退開，沒有再打擾你。', '他照著你指的方向把籃子放回去，還順手把旁邊的籃子排整齊。'], ['沒關係，妳先把工作做好，我不趕時間。', '上班本來就要專心，這樣很好。', '好，放回去了。妳慢慢來。']),
    spec('回去前的叮嚀', '你終於把最後一項補貨完成。諺明哥走到櫃檯前結帳，還順手把清單折好放進口袋。', ['下次缺東西可以先跟我說。', '你今天跑一趟也辛苦了。', '等我下班再聊兩句好不好？'], ['你把購物袋遞給他。他接過去，像是認真把你的話記下來了。', '你朝他笑了一下。他也笑了，沒有把客套話說得太重。', '他看了一眼店裡，確認沒有客人，才把聲音放輕。'], ['好啊，如果妳方便，我先把清單整理好再來。', '還好，東西都買齊了。妳今天也忙了一整個下午。', '可以啊，妳先交班，不用急。']),
  ),
}

const groupStoreScenes: Five<string> = five(
  '你把剛補好的飲料一瓶瓶排進冰櫃，櫃檯前卻還是站著好幾個人。有人拿著東西不結帳，有人明明已經結完帳，卻又繞回貨架，店裡的動線一下子變得奇怪起來。',
  '你正準備把價牌放回原位，旁邊幾個人卻同時伸手拿東西。你抬頭看了一圈，發現每個人都像真的有事要買，偏偏又沒有一個人急著離開。',
  '倉庫送來一箱貨，你把箱子拖到貨架旁。原本只是想自己慢慢拆，結果旁邊幾個人全都看見了，目光一個接一個落到那箱貨上。',
  '店裡突然進來幾位客人，你一邊收銀，一邊還要留意旁邊快空掉的飲料。幾個熟悉的身影總算往旁邊退開，卻又各自找了點事情做。',
  '牆上的時鐘慢慢往交班時間靠近。你把最後一張補貨單夾好，回頭一看，那幾個人居然還在店裡，手上的東西也換了好幾輪。',
)
const groupStoreLines: Record<AugustCharacter, Five<string>> = {
  wen: five('妳先顧妳的啦，我又沒有要催妳。', '這個我剛剛拿過了，怎麼又放回來了？', '箱子放這邊，我來搬。', '妳先結帳，這邊我幫妳看著。', '妳幾點交班？我問一下不行喔？'),
  ashin: five('妳忙妳的，我慢慢挑就好馁。', '這個口味妳覺得怎麼樣？', '我可以幫忙把這幾個放好。', '剛剛客人很多欸，妳還好嗎？', '等妳忙完再說，不用急。'),
  masa: five('我只是進來買東西，妳不要一臉懷疑。', '這兩包到底哪個比較好吃？', '我先講好，搬完沒有員工折扣喔？', '妳看吧，我就說這個架子快空了。', '我買完了啊，現在只是看看。'),
  stone: five('妳先忙，我把旁邊的籃子收一下。', '這個放這裡會不會比較方便？', '我來扶著，妳慢慢拿。', '客人先走了，妳可以喘口氣了。', '妳還有東西沒整理完嗎？'),
  yanming: five('我不急，妳先把手上的事情做完。', '清單上還有一樣東西，我等一下再找。', '這箱我來，妳不用一個人搬。', '我把這邊排好，妳就不用來回跑了。', '差不多該交班了，妳今天辛苦了。'),
}

function buildSpecRound(roundSpec: RoundSpec, speaker: string): Round {
  const blocks: Block[] = [n(roundSpec.scene)]
  if (roundSpec.opening) blocks.push(d(speaker, roundSpec.opening))
  const scores: Three<number> = [2, 1, 0]
  const choices = roundSpec.prompts.map((text, index) => ({
    text,
    affection: scores[index],
    response: [n(roundSpec.actions[index]), d(speaker, roundSpec.replies[index])],
  })) as Three<Choice>
  return { title: roundSpec.title, blocks, choices }
}

function buildGroupStoreRound(candidates: AugustCharacter[], index: number): Round {
  const first = candidates[index % candidates.length]
  const second = candidates[(index + 1) % candidates.length]
  const firstSpec = soloStoreSpecs[first][index]
  const secondSpec = soloStoreSpecs[second][index]
  const allScores: Partial<Record<AugustCharacter, number>> = {}
  candidates.forEach((character) => { allScores[character] = 1 })
  const groupResponses = candidates.flatMap((character) => {
    const item = soloStoreSpecs[character][index]
    return [n(item.actions[2]), d(SPEAKER_NAMES[character], item.replies[2])]
  })
  const sideLines = candidates.map((character) => d(SPEAKER_NAMES[character], groupStoreLines[character][index]))
  return {
    title: ['誰先開口？', '飲料到底要挑多久？', '臨時店員招募中', '忙起來就別添亂啦', '怎麼還不走？'][index],
    blocks: [n(groupStoreScenes[index]), ...sideLines],
    choices: [
      {
        text: '轉頭請' + NAMES[first] + '幫你一下。',
        affection: 2,
        response: [n(firstSpec.actions[0]), d(SPEAKER_NAMES[first], firstSpec.replies[0])],
        affectionByCharacter: { [first]: 2 },
      },
      {
        text: '把手邊的事情交給' + NAMES[second] + '。',
        affection: 1,
        response: [n(secondSpec.actions[1]), d(SPEAKER_NAMES[second], secondSpec.replies[1])],
        affectionByCharacter: { [second]: 1 },
      },
      {
        text: '笑著說：「你們都來了，總不能只站著看吧？」',
        affection: 0,
        response: groupResponses,
        affectionByCharacter: allScores,
      },
    ],
  }
}

function storeArrival(character: AugustCharacter): Block[] {
  const arrivals: Record<AugustCharacter, Block[]> = {
    wen: [
      n('溫尚翊推門進來時，先往收銀台看了一眼。看見你在，他才轉去冰櫃拿了瓶汽水，結帳時還故意把零錢一枚一枚放在櫃檯上。'),
      d('溫尚翊', '欸，妳今天上班喔？'),
    ],
    ashin: [
      n('阿信拿著一瓶茶走進來，原本低頭看著標籤，抬眼看見你時，眉眼一下子彎起來。'),
      d('陳信宏', '欸？妳在上班喔？我剛好想買點東西馁。'),
    ],
    masa: [
      n('瑪莎一進門就往零食架走，拿了兩包餅乾，結完帳卻沒有往外走，反而晃到雜誌架前面，隨手抽了一本翻開。'),
      d('瑪莎', '我買完了啊，看看不行喔？'),
    ],
    stone: [
      n('石頭拿著一瓶水走進來，看見你正把購物籃疊回架上，便順手接過你手裡那幾個，替你放好。'),
      d('石錦航', '妳先忙，我把這邊放回去就好。'),
    ],
    yanming: [
      n('諺明哥推門進來時，手裡還拿著一張清單。他看見你穿著制服，先朝你點了點頭，才往日用品那一排走去。'),
      d('劉諺明', '妳今天在這裡上班啊？我來補幾樣練團室要用的東西。'),
    ],
  }
  return arrivals[character]
}

function getStoreIntroBlocks(candidates: AugustCharacter[]): Block[] {
  if (candidates.length === 1) {
    const character = candidates[0]
    return [
      n('下午三點多，店裡的客人不多。你正整理著收銀台，門口的感應鈴響了一聲。'),
      ...storeArrival(character),
      n('他拿著東西走到櫃檯前，明明有很多話想說，卻先裝作只是普通來買東西的客人。你看著他，忽然覺得今天的班大概不會太無聊。'),
    ]
  }
  const blocks: Block[] = [
    n('下午三點多，店裡的客人不多。你正蹲在飲料櫃前補貨，門口的感應鈴先後響了好幾次。原本只是幾個熟悉的身影，沒想到他們竟然一個接一個走進來。'),
  ]
  candidates.forEach((character) => blocks.push(...storeArrival(character)))
  if (candidates.includes('wen') && candidates.includes('ashin')) {
    blocks.push(
      n('溫尚翊明明已經結完帳，手裡拿著汽水都走到門口了。看見阿信進來，他腳步一停，像是忽然想起什麼，又轉回飲料櫃。'),
      d('溫尚翊', '欸，我還要買個東西。'),
      n('阿信看了他一眼，沒有拆穿，只是低頭笑了一下。'),
      d('陳信宏', '喔，好啊。那你慢慢挑馁。'),
    )
  }
  if (candidates.includes('masa')) {
    blocks.push(
      n('瑪莎明明已經買完了，卻偏偏站在雜誌架前面不動。手裡那本雜誌翻了兩頁又翻回去，像是突然對每一行字都很有興趣。'),
      d('你', '你們到底還要買什麼啦？'),
      d('瑪莎', '不知道啊，看看有沒有什麼需要的。'),
    )
    if (candidates.includes('wen')) {
      blocks.push(n('溫尚翊把汽水放到櫃檯邊，轉頭看了瑪莎一眼，眉毛微微挑起來。'), d('溫尚翊', '你很閒是不是？'))
    } else {
      blocks.push(n('瑪莎聽見你的問題，還故意把雜誌舉高了一點，像是打算在這裡待上一整個下午。'))
    }
  } else {
    blocks.push(d('你', '你們到底還要買什麼啦？'))
    const first = candidates[0]
    blocks.push(d(SPEAKER_NAMES[first], '再看看啊，妳先忙妳的。'))
  }
  blocks.push(
    n('你看著櫃檯前這群人，終於忍不住笑出聲。有人拿著已經結過帳的東西不走，有人又折回去挑第二輪，還有人乾脆站在旁邊等你抬頭。看來他們今天根本沒有打算買完就離開。'),
    n('你把手裡的補貨單放到一旁，決定先把這群不肯離開的熟客安頓好。'),
  )
  return blocks
}

const eveningSpecs: Record<AugustCharacter, Five<RoundSpec>> = {
  wen: five(
    spec('旁邊的位置還空著', '大家終於坐下來吃炸雞。溫尚翊坐在你旁邊，手指有一下沒一下地敲著紙杯邊緣，明明一直聽著大家聊天，卻很少主動插話。你伸手去拿雞翅時，他把盤子往你這邊推近了一點。', ['你今天是不是心情不好？', '這塊雞腿給你，你不是比較喜歡這個？', '你再不說話，瑪莎要以為你被炸雞收買了。'], ['你看著他，他敲杯子的手停了一下，視線從桌面移到你臉上。', '你把雞腿放到他面前。他低頭看了一眼，原本繃著的嘴角終於鬆了一點。', '你朝他那邊偏了偏頭。他瞥了瑪莎一眼，像是想反駁，最後只吐了口氣。'], ['沒有啊，妳不要一直猜。', '我又沒有說我不吃，妳自己吃啦。', '蔡昇晏才不會因為這種事閉嘴。']),
    spec('辣粉放哪邊？', '老闆又端來一小碟辣粉。瑪莎伸手想拿，溫尚翊卻先把碟子往桌子中間挪了挪，提醒大家別碰倒飲料。', ['你幫我拿一點點就好。', '你是不是怕我吃太辣？', '你自己先試，不要只會叫別人小心。'], ['你把盤子遞過去。他接過來，手腕放得很穩，只替你撒了一點點。', '他抬眼看你，像是沒想到你會注意到這個小動作。', '他夾了一小塊沾了辣粉的雞肉，才剛咬下去就皺了下眉。'], ['這樣夠不夠？不要等一下又說太辣。', '妳上次不是才說吃一點就受不了？', '我哪有只會提醒，妳看我不是先吃了嗎？']),
    spec('被大家看穿了', '瑪莎把紙巾往桌上一放，故意看了看溫尚翊，又看了看你。石頭低頭笑了一下，阿信也忍不住抬起眼。', ['你們不要一直看他啦。', '怪獸，你要不要自己說？', '我看你們今天都很閒欸。'], ['你把紙巾推到桌子中間，想把話題帶開。溫尚翊看了你一眼，沒有接著起鬨。', '你轉頭問他。他把手裡的雞骨頭放下，眉毛一下子挑起來。', '你一開口，瑪莎先笑了出來，阿信也跟著低頭笑。'], ['誰看他了？我在吃東西啦。', '說什麼？我又沒怎樣。', '妳現在才發現喔？']),
    spec('手指沾到醬', '你拆開紙巾時，醬汁不小心沾到指尖。溫尚翊看見了，伸手把桌邊那包濕紙巾推過來，動作很快，像是怕被其他人發現。', ['謝啦，你眼睛也太尖了吧。', '你幫我拿一張嘛，我手上都是醬。', '我自己來啦，你不要一直管我。'], ['你接過濕紙巾。他把手收回去，假裝自己只是順手整理桌面。', '他抽出一張遞給你，手指避開你的指尖，眼神卻停了一瞬。', '你把濕紙巾拿過來。他哼了一聲，沒有再多說，只把空袋子收走。'], ['不然咧，妳手都快黏住了。', '拿去啦，小心不要又弄到衣服。', '誰管妳了？我只是看那包放在旁邊。']),
    spec('吃完再走一段', '店裡的客人慢慢少了，桌上的炸雞也只剩幾塊。大家開始收拾紙盤，溫尚翊把椅子往後推開，卻沒有馬上站起來。', ['你等一下要不要陪我走一段？', '今天謝謝你，雖然你一直臭著臉。', '你下次不要再悶著不講話了。'], ['你把外套拿起來。他看了看門外，像是已經在想等一下往哪個方向走。', '你故意笑他。他瞪了你一眼，最後還是沒忍住笑了一下。', '你把紙袋摺好。他沉默了一會兒，才把聲音放低。'], ['可以啊，反正我也要往那邊走。', '我哪有臭臉？……好啦，今天有點累而已。', '知道啦。妳有話就直接跟我講，不用一直猜。']),
  ),
  ashin: five(
    spec('先挑哪一塊？', '阿信把紙盤往你面前挪了挪，自己拿起一塊雞翅，卻沒有急著吃，先看你挑哪一塊。', ['你先吃啦，不用一直讓我。', '我要這塊看起來最脆的。', '你是不是已經偷偷挑好自己喜歡的了？'], ['他笑著把紙盤放穩，自己也拿了一塊。', '你指了指最上面那塊。他順著你的手看過去，替你把紙盤轉了個方向。', '他低頭看了看自己手裡的雞翅，像是被你說中，笑得有點不好意思。'], ['我有拿啊，妳先挑喜歡的就好馁。', '這塊喔？好，妳拿，我再拿別的。', '哈哈，被妳發現了。我剛剛有先看一下。']),
    spec('醬料沾到哪裡了', '阿信把兩小碟醬料放到桌子中間，提醒大家不要把紙盤弄倒。你伸手時不小心碰到其中一碟，他立刻扶住。', ['差點就翻了，還好你反應快。', '你覺得哪個醬比較好吃？', '那我跟你用同一個好了。'], ['他把醬碟扶正，確認沒有灑出來才鬆手。', '他用筷子沾了一點試味道，想了想才告訴你。', '他把醬碟往你們中間移近一點，笑著點頭。'], ['還好啦，沒有弄倒就好。', '我覺得這個比較剛好，不會蓋掉炸雞的味道。', '好啊，那我們就放這邊，拿起來比較方便。']),
    spec('今天的工作報酬', '瑪莎突然提起剛才搬桌子的事，說老闆應該再多送一盤。阿信聽完笑出聲，還認真數了數桌上剩下幾塊。', ['你們真的搬了很多桌子欸。', '那你們有沒有跟老闆談加薪？', '炸雞當報酬好像也不錯啦。'], ['阿信把紙巾折成小方塊，點頭附和你的話。', '他笑著看向瑪莎，像是覺得這個提議很有道理。', '他低頭看了看桌上的炸雞，眼睛彎起來。'], ['真的有搬不少，剛才還差點把椅子卡在門口。', '哈哈，瑪莎剛剛真的有問，老闆只說再送一盤。', '我也覺得欸，至少今天不用自己付錢馁。']),
    spec('聊到練團', '桌上的話題繞到最近的練團。阿信拿紙巾擦了擦手，說起前幾天有一段副歌一直抓不到舒服的唱法。', ['你後來有找到想要的感覺嗎？', '下次練團我還可以去聽嗎？', '你唱歌的時候真的很投入欸。'], ['他想了一下，手指輕輕敲了敲桌面，像是在回想那段旋律。', '他抬眼看你，笑得很自然，沒有把邀請說得太正式。', '他被你誇得有點不好意思，低頭把紙巾折了兩折。'], ['有一點了，還想再試幾次，可能就會比較順馁。', '當然可以啊，妳想來就來，不用特地先問我。', '真的喔？妳這樣講我會有點不好意思欸。']),
    spec('店門口的晚風', '吃完後大家把桌面收乾淨。阿信拿著外套走到門口，回頭確認你有沒有把自己的東西拿齊。', ['你今天是不是一直在幫我拿東西？', '等一下可以一起走到路口嗎？', '下次換我推薦你一家好吃的店。'], ['他看了一眼你手上的包，伸手替你把滑下來的背帶扶正。', '他點點頭，先把門推開，讓你走在裡面。', '他笑著說好，像是已經開始想你會推薦什麼。'], ['剛好看到就順手啦，妳不要客氣馁。', '好啊，慢慢走過去就好。', '那我等妳推薦喔，妳不要忘記。']),
  ),
  masa: five(
    spec('最後一塊到底是誰的', '瑪莎盯著盤子裡最後一塊雞腿，手已經伸到一半。你也同時伸手，兩個人的指尖差點碰在一起。', ['你放手啦，是我先看到的！', '剪刀石頭布，輸的人不准搶。', '你吃啦，我再拿別的。'], ['他把手停在半空，故意裝作沒聽見你的話。', '他立刻把手收回去，還真的把拳頭伸到桌子中間。', '他看了你一眼，像是沒想到你會讓，最後把雞腿往你那邊推。'], ['妳哪有先看到？我手都快拿到了欸。', '好啊，輸的人不准耍賴喔。', '蛤？真的給我喔？那我就不客氣了。']),
    spec('醬料沾到手', '你拿紙巾時，瑪莎正好把醬料往中間推，兩個人一不小心碰到，醬汁在桌面留下了一小道痕跡。', ['你看啦，都是你害的！', '快點拿紙巾，等一下黏住了。', '你是不是故意的？'], ['他低頭看了看桌面，又抬頭看你，表情像是被冤枉。', '他抽了兩張紙巾，一張遞給你，一張自己擦桌子。', '他挑起眉毛，嘴角卻已經在笑。'], ['我只是把醬料移過來欸，妳自己手伸太快。', '知道啦，妳不要一直催。', '妳有證據嗎？沒有就不要亂講。']),
    spec('被大家起鬨', '阿信看見你們又在搶東西，笑著說你們兩個從小到大好像都沒變。石頭也在旁邊點頭，瑪莎立刻轉頭反駁。', ['你們不要聯合起來笑我啦。', '他以前就這麼欠揍，現在更嚴重。', '瑪莎，你自己說是不是？'], ['你把紙盤往自己面前拉了一點。瑪莎看見了，故意伸手又要拿。', '他聽見你告狀，立刻把手裡的雞翅放下，像是要跟你辯到底。', '你轉頭看他。他愣了一下，最後笑著把責任推回你身上。'], ['誰笑妳了？我是在說我們兩個都沒變。', '妳才欠揍吧，從小就很會告狀。', '我才不要幫妳作證，妳自己想辦法。']),
    spec('這盤真的不夠', '老闆又端來一盤炸雞，瑪莎立刻把空盤往旁邊挪，嘴裡還在抱怨剛才那盤太少。', ['你剛剛明明吃最多！', '那你去跟老闆再要一盤啊。', '好啦，這塊分你一半。'], ['他被你指控，低頭看了看自己的盤子，像是想找證據反駁。', '他轉頭看向櫃檯，真的考慮了一下要不要再問。', '你把雞肉掰開，他看著你手上的動作，語氣一下子軟了。'], ['我哪有？妳不要亂算。', '我才不要去，等一下老闆以為我們吃不飽。', '好啦，那我就吃一半，剩下妳自己留著。']),
    spec('散場前還要鬥嘴', '大家開始收拾桌面。瑪莎把空紙盤疊起來，還不忘把最後一張紙巾丟到你面前，像是怕你等一下又忘了擦手。', ['今天還算好玩啦，謝謝你。', '下次不要再跟我搶最後一塊。', '你回去路上小心，別又跑去買東西。'], ['他手上的動作停了一下，隨即又恢復那副不在意的樣子。', '他把紙盤放好，轉頭朝你做了個鬼臉。', '他把外套拉好，聽見你的叮嚀後笑了一聲。'], ['今天本來就很好玩啊，妳現在才知道喔？', '那要看妳下次有沒有先搶。', '知道啦，妳才不要走路走到一半又去買零食。']),
  ),
  stone: five(
    spec('把不辣的留給你', '石頭坐在你旁邊，先看了看桌上的炸雞，再把一塊沒有沾辣粉的雞肉放到你面前。動作很自然，像是早就注意到你剛才沒有碰那碟辣醬。', ['你怎麼知道我不太吃辣？', '你自己也吃啊，不用一直讓我。', '這塊看起來最好吃欸。'], ['他看了看辣粉，又看回你，笑得很輕。', '他把另一塊夾到自己盤子裡，沒有再把食物往你這邊推。', '他低頭看了看那塊雞肉，像是被你誇得有點不好意思。'], ['剛剛看妳都沒有碰那一碟，就先幫妳留了。', '我有拿啊，妳先吃，桌上還有很多。', '那妳快吃，等一下冷掉就沒那麼脆了。']),
    spec('紙巾放在手邊', '你拆開紙巾時，石頭已經把另一包推到你手邊。他看見你手指沾到一點醬，便把濕紙巾也一起放過來。', ['你準備得也太齊全了吧。', '謝謝，我剛好需要。', '你是不是常常幫大家準備這些？'], ['他把空包裝收在自己那一側，免得桌面越來越亂。', '他點點頭，沒有打斷你吃東西。', '他想了一下，像是在回想自己平常整理東西的習慣。'], ['剛好看到店裡有，就順手拿了。', '不客氣，慢慢吃就好。', '可能吧，東西放在手邊比較方便。']),
    spec('聊到夏天的照片', '你看見石頭把相機袋放在椅子旁，問他最近有沒有拍到喜歡的照片。他把紙巾放下，眼神一下子亮了起來。', ['最近有拍到什麼有趣的東西嗎？', '下次可以帶照片給我看嗎？', '你是不是連吃炸雞都想拍照？'], ['他拿手比了一個小小的框，像是在描述照片裡的光線。', '他笑著點頭，已經開始想要挑哪幾張給你看。', '他低頭看了看桌上的炸雞，忍不住也笑了。'], ['有一張是傍晚的樹影，光剛好落在牆邊，我滿喜歡的。', '可以啊，等洗出來再一起看。', '哈哈，沒有啦，只是剛剛覺得這盤擺得很漂亮。']),
    spec('把桌面收乾淨', '大家聊得太投入，桌面上堆了好幾張紙巾和空紙盤。石頭一邊聽你說話，一邊把空盤往旁邊疊好，還替你留出放飲料的位置。', ['你不用一直幫我收啦。', '這樣看起來整齊多了。', '你先休息，我來收這邊。'], ['他把最後一張紙巾折好，才抬頭看你。', '他順著你的視線看了看桌面，像是覺得這樣確實比較舒服。', '他把手裡的紙盤遞給你，兩個人一起把桌面整理好。'], ['沒關係，順手而已。妳先吃。', '嗯，東西放好一點，大家比較不會碰倒。', '好啊，那我把這邊先留給妳。']),
    spec('回家前的晚風', '店裡慢慢安靜下來。石頭把相機袋背好，走到門口時回頭看你，像是想確認你今天有沒有玩得開心。', ['今天跟你坐在一起很舒服。', '下次還可以一起來吃嗎？', '你回去記得把相機收好喔。'], ['他聽見你的話，腳步放慢了一點，沒有急著轉身。', '他點點頭，像是已經把下次的時間記下來。', '他低頭摸了摸相機袋的拉鍊，確認確實拉好了。'], ['我也覺得，今天大家都很熱鬧。', '當然可以啊，下次再找一家試試看。', '好，謝謝妳提醒。妳回去也小心。']),
  ),
  yanming: five(
    spec('鼓聲停下來了', '你推開練團室的門時，鼓聲正好停住。諺明哥坐在鼓組後面，手裡還握著鼓棒，聽見門聲才轉過頭來。看見是你，他先愣了一下，隨即把鼓棒放到鼓邊。', ['我是不是打擾你了？', '沒想到你真的在打鼓欸！', '剛剛那段可以再打一次給我聽嗎？'], ['他把鼓棒放平，先看了看你是不是站在門口太久。', '他笑了一下，肩膀也跟著放鬆下來。', '他看了一眼鼓組，像是在想剛才那段要從哪裡開始。'], ['不會，剛好休息一下。妳進來坐吧。', '偶爾打一下，沒想到被妳撞見了。', '可以啊，妳先找個位置坐好。']),
    spec('鼓棒怎麼拿', '諺明哥把一對鼓棒遞給你，自己坐到旁邊，先示範手指應該放在哪裡。他沒有急著讓你照做，而是等你看清楚才把鼓棒交過來。', ['我怕我一拿就掉下去。', '原來手指要放這裡喔。', '你再示範一次，我想看清楚。'], ['他伸手托了一下鼓棒尾端，讓你先找到平衡點。', '他點點頭，把自己的手放慢，讓你看清楚每個位置。', '他把鼓棒重新握好，動作放得很慢。'], ['沒關係，先握穩就好，不用急著敲。', '對，手腕不要太僵，留一點空間。', '好，我慢慢來，妳看這裡。']),
    spec('試著敲一小段', '你照著他的示範，在鼓面上輕輕敲了兩下，節奏卻一下快一下慢。諺明哥沒有笑你，只是用手指在旁邊替你打拍子。', ['我是不是完全沒有節奏感？', '你幫我數拍子好不好？', '再一次！我剛剛只是太緊張。'], ['他搖搖頭，拿鼓棒在旁邊輕敲兩下，示意你不用急。', '他開始用很穩的速度數拍子，讓你跟著他的節奏走。', '他笑了一下，把鼓棒重新遞回你手裡。'], ['不會啦，第一次都這樣，慢慢來就好。', '好，跟著我，一、二、三、四。', '好啊，這次先不用想太多，聽節奏就好。']),
    spec('他也有認真的時候', '休息時，諺明哥把鼓棒放在膝上，說起以前自己打鼓的日子。現在他多半忙著照顧練團室，真正坐下來打完整段的時間反而少了。', ['你會不會很想念以前一直打鼓的時候？', '你現在偶爾也可以打啊，不用每次都忙別人。', '難怪你剛剛打得那麼熟練。'], ['他低頭轉了轉鼓棒，想了一會兒才回答。', '他聽完笑了笑，像是被你說中了某個習慣。', '他把鼓棒放回鼓邊，神情比剛才放鬆。'], ['會啊，有時候聽到節奏，手就會自己想動。', '也是，偶爾還是要留點時間給自己。', '以前常打，手感還在，只是沒有每天練了。']),
    spec('練團室快打烊了', '牆上的時鐘已經不早。諺明哥把鼓棒收好，又檢查了一遍器材的位置，最後才把燈光調暗一些。你坐在旁邊，還有點捨不得剛才那段鼓聲停下來。', ['下次還想聽你打鼓。', '今天謝謝你教我，雖然我敲得很亂。', '你也別忙到太晚，記得休息。'], ['他把最後一條導線放回架上，聽見你的話後回頭笑了一下。', '他把鼓棒收進袋子，語氣很自然地安慰你。', '他看了一眼時鐘，點點頭，像是答應你也提醒自己。'], ['好啊，妳下次來如果剛好有空，我再打給妳聽。', '不會亂，第一次能跟上拍子已經很好了。', '知道了，妳也是，回去路上小心。']),
  ),
}

function readProgress(affection: Record<AugustCharacter, number>): Progress {
  const freshCandidates = ORDER.filter((character) => affection[character] > 100)
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as Partial<Progress> | null
    const phases: Phase[] = ['transition', 'store-intro', 'store-interaction', 'store-ending', 'evening-choice', 'fried-intro', 'fried-picker', 'yanming-intro', 'evening-interaction', 'evening-ending']
    if (!saved || !phases.includes(saved.phase as Phase)) {
      return {
        phase: 'transition',
        storeCandidates: freshCandidates,
        storeRoundIndex: 0,
        storePendingChoice: null,
        storeChoices: [],
        eveningRoute: null,
        eveningCharacter: null,
        eveningRoundIndex: 0,
        eveningPendingChoice: null,
        eveningChoices: [],
      }
    }
    const candidates = Array.isArray(saved.storeCandidates) ? saved.storeCandidates.filter((item): item is AugustCharacter => ORDER.includes(item as AugustCharacter)) : freshCandidates
    const validChoice = (value: unknown): value is number => Number.isInteger(value) && Number(value) >= 0 && Number(value) <= 2
    const storeChoices = Array.isArray(saved.storeChoices) ? saved.storeChoices.filter(validChoice).slice(0, 5) : []
    const eveningChoices = Array.isArray(saved.eveningChoices) ? saved.eveningChoices.filter(validChoice).slice(0, 5) : []
    const storeRoundIndex = Number.isInteger(saved.storeRoundIndex) ? Math.max(0, Math.min(4, Number(saved.storeRoundIndex))) : 0
    const eveningRoundIndex = Number.isInteger(saved.eveningRoundIndex) ? Math.max(0, Math.min(4, Number(saved.eveningRoundIndex))) : 0
    const storePendingChoice = validChoice(saved.storePendingChoice) ? Number(saved.storePendingChoice) : null
    const eveningPendingChoice = validChoice(saved.eveningPendingChoice) ? Number(saved.eveningPendingChoice) : null
    const eveningRoute = saved.eveningRoute === 'fried' || saved.eveningRoute === 'yanming' ? saved.eveningRoute : null
    const eveningCharacter = ORDER.includes(saved.eveningCharacter as AugustCharacter) ? saved.eveningCharacter as AugustCharacter : null
    if ((saved.phase === 'store-intro' || saved.phase === 'store-interaction') && candidates.length === 0) return { ...readProgressWithoutStorage(freshCandidates), phase: 'evening-choice' }
    if (saved.phase === 'evening-interaction' && (!eveningRoute || !eveningCharacter)) return readProgressWithoutStorage(candidates)
    return {
      phase: saved.phase as Phase,
      storeCandidates: candidates,
      storeRoundIndex,
      storePendingChoice,
      storeChoices,
      eveningRoute,
      eveningCharacter,
      eveningRoundIndex,
      eveningPendingChoice,
      eveningChoices,
    }
  } catch {
    return readProgressWithoutStorage(freshCandidates)
  }
}
function readProgressWithoutStorage(candidates: AugustCharacter[]): Progress {
  return {
    phase: 'transition',
    storeCandidates: candidates,
    storeRoundIndex: 0,
    storePendingChoice: null,
    storeChoices: [],
    eveningRoute: null,
    eveningCharacter: null,
    eveningRoundIndex: 0,
    eveningPendingChoice: null,
    eveningChoices: [],
  }
}


export function rewindAugustStoryToStart(
  source: Record<string, string>,
  callThreshold = 10,
): Record<string, string> | null {
  const data = { ...source }
  const validPhase = (value: unknown): value is Phase =>
    typeof value === 'string' && ['transition', 'store-intro', 'store-interaction', 'store-ending', 'evening-choice', 'fried-intro', 'fried-picker', 'yanming-intro', 'evening-interaction', 'evening-ending'].includes(value)
  const validChoice = (value: unknown): value is number =>
    typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 2
  const parseArray = (value: string | undefined): unknown[] => {
    try {
      const parsed = JSON.parse(value ?? '[]') as unknown
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  let progress: Partial<Progress> | null = null
  const rawProgress = data[STORAGE_KEY]
  if (rawProgress) {
    try {
      progress = JSON.parse(rawProgress) as Partial<Progress>
      if (!validPhase(progress.phase)) return null
    } catch {
      return null
    }
  } else if (data['mayday-august-day-complete'] === 'true') {
    return null
  }

  const candidates = progress
    ? (Array.isArray(progress.storeCandidates) ? progress.storeCandidates.filter((item): item is AugustCharacter => ORDER.includes(item as AugustCharacter)) : [])
    : parseArray(data['mayday-august-store-candidates']).filter((item): item is AugustCharacter => typeof item === 'string' && ORDER.includes(item as AugustCharacter))
  const storeChoicesRaw = progress ? progress.storeChoices : parseArray(data['mayday-august-store-choices'])
  const storeChoices = Array.isArray(storeChoicesRaw) ? storeChoicesRaw.filter(validChoice).slice(0, 5) : []
  const eveningCharacterValue = progress ? progress.eveningCharacter : data['mayday-august-evening-character']
  const eveningCharacter = ORDER.includes(eveningCharacterValue as AugustCharacter) ? eveningCharacterValue as AugustCharacter : null
  const eveningChoicesRaw = progress ? progress.eveningChoices : parseArray(data['mayday-august-evening-choices'])
  const eveningChoices = Array.isArray(eveningChoicesRaw) ? eveningChoicesRaw.filter(validChoice).slice(0, 5) : []
  if (storeChoicesRaw && Array.isArray(storeChoicesRaw) && storeChoices.length !== storeChoicesRaw.length) return null
  if (eveningChoicesRaw && Array.isArray(eveningChoicesRaw) && eveningChoices.length !== eveningChoicesRaw.length) return null
  if (storeChoices.length && !candidates.length) return null
  if (eveningChoices.length && !eveningCharacter) return null

  const earned: Record<AugustCharacter, number> = { wen: 0, ashin: 0, masa: 0, stone: 0, yanming: 0 }
  for (let index = 0; index < storeChoices.length; index += 1) {
    const round = candidates.length === 1
      ? buildSpecRound(soloStoreSpecs[candidates[0]][index], SPEAKER_NAMES[candidates[0]])
      : buildGroupStoreRound(candidates, index)
    const selected = round.choices[storeChoices[index]]
    if (!selected) return null
    if (selected.affectionByCharacter) {
      Object.entries(selected.affectionByCharacter).forEach(([character, amount]) => {
        if (ORDER.includes(character as AugustCharacter) && typeof amount === 'number') earned[character as AugustCharacter] += amount
      })
    } else {
      earned[candidates[0]] += selected.affection
    }
  }
  if (eveningChoices.length && eveningCharacter) {
    for (let index = 0; index < eveningChoices.length; index += 1) {
      const round = buildSpecRound(eveningSpecs[eveningCharacter][index], SPEAKER_NAMES[eveningCharacter])
      const selected = round.choices[eveningChoices[index]]
      if (!selected) return null
      earned[eveningCharacter] += selected.affection
    }
  }

  let currentAffection: Partial<Record<AugustCharacter, number>>
  try {
    currentAffection = JSON.parse(data['mayday-route-affection'] ?? 'null') as Partial<Record<AugustCharacter, number>>
    if (!currentAffection || typeof currentAffection !== 'object' || Array.isArray(currentAffection)) return null
  } catch {
    return null
  }
  const restoredAffection: Partial<Record<AugustCharacter, number>> = { ...currentAffection }
  ORDER.forEach((character) => {
    const current = currentAffection[character]
    if (typeof current !== 'number' || !Number.isFinite(current)) {
      if (earned[character] !== 0) return null
      return
    }
    restoredAffection[character] = current - earned[character]
  })
  data['mayday-route-affection'] = JSON.stringify(restoredAffection)

  const pending = data['mayday-pending-call']
  if (pending && ORDER.includes(pending as AugustCharacter)) {
    const character = pending as AugustCharacter
    const before = restoredAffection[character]
    const after = currentAffection[character]
    if (typeof before === 'number' && typeof after === 'number' &&
      before < callThreshold && after >= callThreshold &&
      data['mayday-call-v2-triggered-' + character] !== 'true') {
      delete data['mayday-pending-call']
    }
  }

  Object.keys(data).forEach((key) => {
    if (key.startsWith('mayday-august-') && key !== 'mayday-august-started') delete data[key]
  })
  data['mayday-august-started'] = 'true'
  data['mayday-august-clock'] = '15:05'
  data['mayday-story-stage'] = 'august-story'
  return data
}

function clockForProgress(progress: Progress): string {
  if (progress.phase === 'transition') return '15:05'
  if (progress.phase === 'store-intro') return '15:12'
  if (progress.phase === 'store-interaction') return ['15:20', '15:35', '15:50', '16:05', '16:20'][progress.storeRoundIndex]
  if (progress.phase === 'store-ending') return '16:40'
  if (progress.phase === 'evening-choice') return '18:20'
  if (progress.phase === 'fried-intro') return '19:00'
  if (progress.phase === 'fried-picker') return '19:35'
  if (progress.phase === 'yanming-intro') return '19:00'
  if (progress.phase === 'evening-interaction') return ['19:25', '19:50', '20:15', '20:40', '21:05'][progress.eveningRoundIndex]
  return '21:30'
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

export function AugustStory({
  affection,
  onAddAffection,
  onClockChange,
  onFinish,
}: {
  affection: Record<AugustCharacter, number>
  onAddAffection: (character: AugustCharacter, amount: number) => void
  onClockChange: (time: string) => void
  onFinish: (selection: AugustSelection) => void
}) {
  const [progress, setProgress] = useState<Progress>(() => readProgress(affection))
  const storeChoiceLocked = useRef(false)
  const eveningChoiceLocked = useRef(false)
  const finishLocked = useRef(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    onClockChange(clockForProgress(progress))
  }, [progress, onClockChange])

  const enterStore = () => {
    if (progress.storeCandidates.length) {
      setProgress((current) => ({ ...current, phase: 'store-intro' }))
    } else {
      setProgress((current) => ({ ...current, phase: 'evening-choice' }))
    }
  }
  const startStoreRounds = () => {
    if (!progress.storeCandidates.length) return
    setProgress((current) => ({ ...current, phase: 'store-interaction', storeRoundIndex: 0, storePendingChoice: null, storeChoices: [] }))
  }
  const chooseStoreChoice = (choiceIndex: number) => {
    if (progress.phase !== 'store-interaction' || progress.storePendingChoice !== null || storeChoiceLocked.current) return
    const round = progress.storeCandidates.length === 1
      ? buildSpecRound(soloStoreSpecs[progress.storeCandidates[0]][progress.storeRoundIndex], SPEAKER_NAMES[progress.storeCandidates[0]])
      : buildGroupStoreRound(progress.storeCandidates, progress.storeRoundIndex)
    const selected = round.choices[choiceIndex]
    if (!selected) return
    storeChoiceLocked.current = true
    const appliedKey = 'mayday-august-store-affection-' + progress.storeRoundIndex
    if (localStorage.getItem(appliedKey) !== 'true') {
      localStorage.setItem(appliedKey, 'true')
      if (selected.affectionByCharacter) {
        Object.entries(selected.affectionByCharacter).forEach(([character, amount]) => {
          if (amount) onAddAffection(character as AugustCharacter, amount)
        })
      } else {
        onAddAffection(progress.storeCandidates[0], selected.affection)
      }
    }
    const nextProgress: Progress = {
      ...progress,
      storePendingChoice: choiceIndex,
      storeChoices: [...progress.storeChoices, choiceIndex],
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProgress))
    setProgress(nextProgress)
  }
  const continueStoreRound = () => {
    if (progress.phase !== 'store-interaction' || progress.storePendingChoice === null) return
    storeChoiceLocked.current = false
    if (progress.storeRoundIndex < 4) {
      setProgress((current) => ({ ...current, storeRoundIndex: current.storeRoundIndex + 1, storePendingChoice: null }))
    } else {
      setProgress((current) => ({ ...current, phase: 'store-ending', storePendingChoice: null }))
    }
  }
  const continueStoreEnding = () => setProgress((current) => ({ ...current, phase: 'evening-choice' }))
  const chooseEveningRoute = (route: 'fried' | 'yanming') => {
    if (route === 'fried') {
      setProgress((current) => ({ ...current, phase: 'fried-intro', eveningRoute: 'fried', eveningCharacter: null, eveningRoundIndex: 0, eveningPendingChoice: null, eveningChoices: [] }))
    } else {
      setProgress((current) => ({ ...current, phase: 'yanming-intro', eveningRoute: 'yanming', eveningCharacter: 'yanming', eveningRoundIndex: 0, eveningPendingChoice: null, eveningChoices: [] }))
    }
  }
  const continueFriedIntro = () => {
    if (progress.eveningRoute !== 'fried') return
    setProgress((current) => ({ ...current, phase: 'fried-picker' }))
  }
  const chooseFriedCharacter = (character: AugustCharacter) => {
    if (progress.phase !== 'fried-picker' || !FRIED_ORDER.includes(character)) return
    setProgress((current) => ({ ...current, phase: 'evening-interaction', eveningCharacter: character, eveningRoundIndex: 0, eveningPendingChoice: null, eveningChoices: [] }))
  }
  const continueYanmingIntro = () => {
    if (progress.phase !== 'yanming-intro') return
    setProgress((current) => ({ ...current, phase: 'evening-interaction', eveningCharacter: 'yanming', eveningRoundIndex: 0, eveningPendingChoice: null, eveningChoices: [] }))
  }
  const chooseEveningChoice = (choiceIndex: number) => {
    if (progress.phase !== 'evening-interaction' || !progress.eveningCharacter || progress.eveningPendingChoice !== null || eveningChoiceLocked.current) return
    const round = buildSpecRound(eveningSpecs[progress.eveningCharacter][progress.eveningRoundIndex], SPEAKER_NAMES[progress.eveningCharacter])
    const selected = round.choices[choiceIndex]
    if (!selected) return
    eveningChoiceLocked.current = true
    const appliedKey = 'mayday-august-evening-affection-' + progress.eveningCharacter + '-' + progress.eveningRoundIndex
    if (localStorage.getItem(appliedKey) !== 'true') {
      localStorage.setItem(appliedKey, 'true')
      onAddAffection(progress.eveningCharacter, selected.affection)
    }
    const nextProgress: Progress = {
      ...progress,
      eveningPendingChoice: choiceIndex,
      eveningChoices: [...progress.eveningChoices, choiceIndex],
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProgress))
    setProgress(nextProgress)
  }
  const continueEveningRound = () => {
    if (progress.phase !== 'evening-interaction' || progress.eveningPendingChoice === null) return
    eveningChoiceLocked.current = false
    if (progress.eveningRoundIndex < 4) {
      setProgress((current) => ({ ...current, eveningRoundIndex: current.eveningRoundIndex + 1, eveningPendingChoice: null }))
    } else {
      setProgress((current) => ({ ...current, phase: 'evening-ending', eveningPendingChoice: null }))
    }
  }
  const finish = () => {
    if (progress.phase !== 'evening-ending' || !progress.eveningCharacter || !progress.eveningRoute || progress.eveningChoices.length !== 5 || finishLocked.current) return
    if (progress.storeCandidates.length && progress.storeChoices.length !== 5) return
    finishLocked.current = true
    onFinish({
      storeCandidates: [...progress.storeCandidates],
      storeChoices: [...progress.storeChoices],
      eveningRoute: progress.eveningRoute,
      eveningCharacter: progress.eveningCharacter,
      eveningChoices: [...progress.eveningChoices],
    })
  }

  const currentStoreRound = progress.phase === 'store-interaction'
    ? progress.storeCandidates.length === 1
      ? buildSpecRound(soloStoreSpecs[progress.storeCandidates[0]][progress.storeRoundIndex], SPEAKER_NAMES[progress.storeCandidates[0]])
      : buildGroupStoreRound(progress.storeCandidates, progress.storeRoundIndex)
    : null
  const selectedStoreChoice = currentStoreRound && progress.storePendingChoice !== null
    ? currentStoreRound.choices[progress.storePendingChoice]
    : null
  const currentEveningRound = progress.phase === 'evening-interaction' && progress.eveningCharacter
    ? buildSpecRound(eveningSpecs[progress.eveningCharacter][progress.eveningRoundIndex], SPEAKER_NAMES[progress.eveningCharacter])
    : null
  const selectedEveningChoice = currentEveningRound && progress.eveningPendingChoice !== null
    ? currentEveningRound.choices[progress.eveningPendingChoice]
    : null
  const headerTitle = progress.phase === 'evening-interaction' && progress.eveningCharacter
    ? NAMES[progress.eveningCharacter]
    : progress.phase === 'yanming-intro'
      ? '練團室・意外的鼓聲'
      : progress.phase === 'fried-intro' || progress.phase === 'fried-picker'
        ? '新開的炸雞店'
        : progress.phase === 'store-intro' || progress.phase === 'store-interaction' || progress.phase === 'store-ending'
          ? '便利店裡的熟客'
          : '八月・夏天還沒結束'

  return (
    <div className="story-screen-overlay">
      <div className="story-screen-head">
        <div className="chapter-mark">八月・暑假</div>
        <div className="story-contact-title">
          <strong>{headerTitle}</strong>
          <small>1997 年 8 月 1 日・星期五</small>
        </div>
        <span className="story-head-spacer" />
      </div>
      <div className="story-narrative-scroll">
        <div className="story-kicker">AUGUST · SUMMER DAYS</div>

        {progress.phase === 'transition' && (
          <>
            <h2 className="story-scene-title">夏天還沒結束</h2>
            <Blocks blocks={transitionBlocks} />
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={enterStore}>
                開始今天的打工 <ChevronRight size={15} />
              </button>
            </div>
          </>
        )}

        {progress.phase === 'store-intro' && (
          <>
            <h2 className="story-scene-title">{progress.storeCandidates.length > 1 ? '今天的熟客也太多了吧！' : '今天有人來找你'}</h2>
            <Blocks blocks={getStoreIntroBlocks(progress.storeCandidates)} />
            <div className="reunion-pause-note">
              {progress.storeCandidates.length > 1
                ? '達標角色都來了。大家沒有買完就走，反而各自找理由留在店裡。'
                : '他沒有買完就離開，反而留在店裡陪你說了幾句話。'}
            </div>
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={startStoreRounds}>
                {progress.storeCandidates.length > 1 ? '看看他們還要鬧什麼' : '和他聊一會兒'} <ChevronRight size={15} />
              </button>
            </div>
          </>
        )}

        {progress.phase === 'store-interaction' && currentStoreRound && (
          <>
            <h2 className="story-scene-title">便利店・{currentStoreRound.title}</h2>
            <div className="reunion-pause-note">第 {progress.storeRoundIndex + 1}／5 輪</div>
            <Blocks blocks={currentStoreRound.blocks} />
            {selectedStoreChoice ? (
              <>
                <Blocks blocks={[d('你', selectedStoreChoice.text)]} />
                <Blocks blocks={selectedStoreChoice.response} />
                <div className="story-action-bar story-inline-action">
                  <button className="story-primary-button" onClick={continueStoreRound}>
                    {progress.storeRoundIndex < 4 ? '繼續忙一會兒' : '看看他們終於要走了嗎'} <ChevronRight size={15} />
                  </button>
                </div>
              </>
            ) : (
              <div className="choice-area">
                <div className="choice-heading">你想怎麼回應？</div>
                {currentStoreRound.choices.map((choice, index) => (
                  <button className="reply-choice" key={index} onClick={() => chooseStoreChoice(index)}>
                    <span>{choice.text}</span><ChevronRight size={15} />
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {progress.phase === 'store-ending' && (
          <>
            <h2 className="story-scene-title">終於肯離開了</h2>
            <Blocks blocks={[
              n('你把最後一件商品放回架上，幾個人這才像是想起自己原本只是來買東西的。'),
              ...(progress.storeCandidates.includes('masa') ? [d('瑪莎', '好啦，今天先放過妳。下次再來。')] : []),
              ...(progress.storeCandidates.includes('wen') ? [n('溫尚翊把手裡的袋子提起來，走到門口又回頭看了你一眼。'), d('溫尚翊', '妳下班記得吃東西，不要只喝飲料。')] : []),
              ...(progress.storeCandidates.includes('ashin') ? [d('陳信宏', '那妳先忙喔，等一下下班也不要太趕馁。')] : []),
              ...(progress.storeCandidates.includes('stone') ? [d('石錦航', '辛苦了，回去路上小心。')] : []),
              ...(progress.storeCandidates.includes('yanming') ? [d('劉諺明', '今天謝謝妳幫忙，妳先忙完再休息。')] : []),
              n('門口的感應鈴又響了一次。這次他們總算真的離開了。你看了一眼牆上的時鐘，繼續把剩下的工作做完。'),
              n('等到交班結束，天色已經慢慢暗下來。你換下制服，背起包包，終於可以想想晚餐要吃什麼了。'),
            ]} />
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={continueStoreEnding}>
                下班了，晚上去哪裡？ <ChevronRight size={15} />
              </button>
            </div>
          </>
        )}

        {progress.phase === 'evening-choice' && (
          <>
            <h2 className="story-scene-title">下班以後，去哪里？</h2>
            <Blocks blocks={[
              n('傍晚的風終於沒有下午那麼燙。你走出便利店，把制服外套摺好放進包包，肚子也很配合地叫了一聲。'),
              n('你想起今天有人提過，新開的炸雞店請他們幫忙撐場面；另一邊，練團室的燈似乎也還亮著。今晚要去哪裡，就由你自己決定。'),
            ]} />
            <div className="choice-area">
              <div className="choice-heading">選擇今晚的去處</div>
              <button className="reply-choice" onClick={() => chooseEveningRoute('fried')}>
                <span>去新開的炸雞店找大家，順便蹭一頓炸雞</span><ChevronRight size={15} />
              </button>
              <button className="reply-choice" onClick={() => chooseEveningRoute('yanming')}>
                <span>去練團室找諺明哥</span><ChevronRight size={15} />
              </button>
            </div>
          </>
        )}

        {progress.phase === 'fried-intro' && (
          <>
            <h2 className="story-scene-title">免費勞工集合！</h2>
            <Blocks blocks={[
              n('新開的炸雞店就在巷口轉角。老闆想讓開幕第一週熱鬧一點，便找他們幾個來幫忙招呼客人、搬桌椅、發傳單，還說只要店裡有人氣，今天的炸雞就算他請。'),
              n('你走近時，溫尚翊正把一張折疊桌往店裡搬。瑪莎站在旁邊扶著桌腳，嘴裡還在嫌桌子太重；阿信拿著一疊傳單，正把它們分成幾份；石頭蹲在門邊調整桌椅的距離。陳泳錩則把最後一張椅子搬到牆邊，放好後還回頭確認有沒有擋到走道。'),
              d('瑪莎', '我真的覺得我們被騙了。'),
              n('他把手裡的傳單往桌上一放，伸手揉了揉肩膀，表情一臉認真。'),
              d('溫尚翊', '哪有騙？老闆不是說有炸雞吃嗎？'),
              d('瑪莎', '那是報酬，不是叫我們把整間店搬過來欸。'),
              n('阿信忍不住笑出聲，手裡的傳單差點散開。石頭伸手替他扶了一下，陳泳錩也跟著笑了，卻還是把最後一張椅子往裡推正。'),
              d('陳信宏', '至少老闆剛剛有先讓我們試吃一塊啦。'),
              d('瑪莎', '一塊？你知道我剛剛搬了幾張桌子嗎？'),
              d('石錦航', '你剛剛還說要把門口那張也搬進來。'),
              d('瑪莎', '我那是怕客人沒地方坐！'),
              n('溫尚翊把桌子放穩，拍了拍手上的灰，抬頭時正好看見你站在門口。'),
              d('溫尚翊', '欸，妳來啦？'),
              d('你', '你們也太認真了吧？我還以為你們只是來吃炸雞的。'),
              d('瑪莎', '我們本來就是來吃炸雞的，誰知道還要先工作。'),
              d('陳信宏', '妳下班了喔？先進來啦，外面很熱馁。'),
              n('阿信把手裡剩下的傳單交給石頭，替你拉開靠牆的椅子。陳泳錩也把桌上的紙巾和飲料往旁邊挪了挪，空出一個位置。'),
              d('陳泳錩', '妳坐這邊好了，這裡比較不會被人撞到。'),
              d('你', '謝謝！你們忙完了嗎？'),
              d('溫尚翊', '差不多啦，剩下交給老闆就好。'),
              n('老闆端著第一大盤炸雞走出來，盤子才剛放到桌上，瑪莎的表情就立刻變了。'),
              d('瑪莎', '老闆，我突然覺得今天很值得。'),
              d('溫尚翊', '妳剛剛不是還在說被騙？'),
              d('瑪莎', '那是剛剛，現在不一樣了。'),
              n('大家終於圍著桌子坐下來。阿信把紙巾分到每個人手邊，石頭替你把飲料往內側挪好，溫尚翊則把炸雞盤轉到你比較容易拿到的位置。陳泳錩坐下時還有點拘謹，直到瑪莎把一塊雞翅推到他面前，他才笑著拿起來。'),
              d('你', '你們今天到底搬了多少東西啦？'),
              d('瑪莎', '不要問，問就是很多。'),
              d('溫尚翊', '他剛剛還差點把桌腳卡在門口，妳沒看到而已。'),
              d('陳泳錩', '那個是桌子有點不好轉啦……'),
              n('陳泳錩說完低頭咬了一口炸雞，耳朵有點紅。阿信笑著把另一盤往中間推，讓大家不用伸長手去夾。'),
              d('陳信宏', '好啦，先吃啦，不然等一下真的冷掉了。'),
              n('你伸手拿了一塊雞翅，剛咬下去就被熱氣燙得縮了一下。石頭立刻把飲料遞過來，瑪莎則在旁邊笑到肩膀都抖了。'),
              d('瑪莎', '妳是餓多久？剛炸好就咬喔！'),
              d('你', '我哪知道它這麼燙啦！'),
              d('溫尚翊', '吹一下再吃不會喔？'),
              n('他嘴上嫌你，手卻把紙巾往你面前推近了一點。桌上幾個人你一句我一句，連陳泳錩也漸漸放開了，開始跟大家聊剛才搬桌子時差點撞到門框的事。'),
              d('陳泳錩', '我剛剛真的以為那張桌子要卡住了，還好石頭有幫我扶一下。'),
              d('石錦航', '你轉一下方向就過了，沒有很難啦。'),
              d('瑪莎', '下次直接叫怪獸搬，他力氣比較大。'),
              d('溫尚翊', '你自己不會搬喔？'),
              d('瑪莎', '我負責精神支持啊。'),
              d('你', '哈哈哈哈哈哈哈！'),
              n('溫尚翊今天卻沒有像平常那樣立刻接著鬧。他低頭拆著雞骨頭，偶爾回一句，神情還是有點悶。你注意到他把比較完整的雞腿留在盤子邊，等你伸手時，才像不經意似的把盤子往你那邊推了一點。'),
              d('你', '怪獸，你今天怎麼這麼安靜？'),
              n('溫尚翊手上的動作停了一下，抬眼看你，又很快把視線移回盤子。'),
              d('溫尚翊', '哪有，妳吃妳的啦。'),
              d('瑪莎', '有啦，他今天從剛剛就怪怪的。'),
              d('溫尚翊', '蔡昇晏，你很閒是不是？'),
              d('瑪莎', '我現在有炸雞吃，當然很閒啊。'),
              n('阿信低頭笑了一聲，石頭把最後一張紙巾遞給陳泳錩。桌上的話題又繞回炸雞到底哪一塊最好吃，只有溫尚翊還是有點悶悶的，卻沒忘記把那塊雞腿留在你面前。'),
            ]} />
            <div className="reunion-pause-note">炸雞店裡今晚只有五個人：溫尚翊、陳信宏、瑪莎、石錦航和陳泳錩。諺明哥不在這裡。</div>
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={continueFriedIntro}>
                坐下來，找個人聊聊 <ChevronRight size={15} />
              </button>
            </div>
          </>
        )}

        {progress.phase === 'fried-picker' && (
          <>
            <h2 className="story-scene-title">想坐到誰旁邊？</h2>
            <Blocks blocks={[
              n('炸雞盤又被推回桌子中間。瑪莎還在跟溫尚翊爭最後一塊雞翅，阿信和石頭則在旁邊笑著看他們鬧。陳泳錩低頭喝了口飲料，偶爾插上一句，已經不像剛坐下時那麼拘謹。'),
              n('你看著桌邊幾個熟悉的身影，決定趁著大家還沒散場，找其中一個人好好聊一會兒。'),
            ]} />
            <div className="choice-area">
              <div className="choice-heading">選擇一位，進行五輪互動</div>
              {FRIED_ORDER.map((character) => (
                <button className="reply-choice" key={character} onClick={() => chooseFriedCharacter(character)}>
                  <span>{NAMES[character]}</span><ChevronRight size={15} />
                </button>
              ))}
            </div>
          </>
        )}

        {progress.phase === 'yanming-intro' && (
          <>
            <h2 className="story-scene-title">練團室裡的鼓聲</h2>
            <Blocks blocks={[
              n('你沒有去炸雞店，而是沿著熟悉的路往練團室走。走到門口時，裡面傳來一段很穩的鼓聲，節奏一下一下落在空間裡，和你平常聽見的整理器材聲完全不同。'),
              n('你推開門，諺明哥正坐在鼓組後面，手裡的鼓棒落下去時乾淨俐落。他打完一小段才察覺門口有人，轉過頭看見你，先是愣了一下，接著把鼓棒放到鼓邊。'),
              d('劉諺明', '欸？妳怎麼來了？'),
              d('你', '我本來想去找你，沒想到你在打鼓。'),
              n('他笑了一下，伸手把旁邊的椅子拉出來。'),
              d('劉諺明', '剛好有空，就打一下。進來坐吧，站在門口不累喔？'),
              n('你走近鼓組，才發現他剛剛打得比你想像中還投入。平常總是忙著照顧練團室大小事情的他，此刻坐在鼓組後面，神情倒是很專注。'),
            ]} />
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={continueYanmingIntro}>
                坐到鼓組旁邊 <ChevronRight size={15} />
              </button>
            </div>
          </>
        )}

        {progress.phase === 'evening-interaction' && currentEveningRound && progress.eveningCharacter && (
          <>
            <h2 className="story-scene-title">{NAMES[progress.eveningCharacter]}・{currentEveningRound.title}</h2>
            <div className="reunion-pause-note">第 {progress.eveningRoundIndex + 1}／5 輪</div>
            <Blocks blocks={currentEveningRound.blocks} />
            {selectedEveningChoice ? (
              <>
                <Blocks blocks={[d('你', selectedEveningChoice.text)]} />
                <Blocks blocks={selectedEveningChoice.response} />
                <div className="story-action-bar story-inline-action">
                  <button className="story-primary-button" onClick={continueEveningRound}>
                    {progress.eveningRoundIndex < 4 ? '繼續聊下去' : '看看今晚的結尾'} <ChevronRight size={15} />
                  </button>
                </div>
              </>
            ) : (
              <div className="choice-area">
                <div className="choice-heading">你想怎麼回應？</div>
                {currentEveningRound.choices.map((choice, index) => (
                  <button className="reply-choice" key={index} onClick={() => chooseEveningChoice(index)}>
                    <span>{choice.text}</span><ChevronRight size={15} />
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {progress.phase === 'evening-ending' && progress.eveningCharacter && (
          <>
            <h2 className="story-scene-title">八月的晚上，慢慢結束了</h2>
            <Blocks blocks={progress.eveningRoute === 'fried' ? [
              n('炸雞店的客人漸漸少了，老闆開始收拾門口的桌椅。你和大家把最後幾個紙盤疊好，空氣裡還留著一點炸雞的香味。'),
              n('溫尚翊走在前面，阿信和石頭在後面聊著剛才的練團，瑪莎還在抱怨今天搬桌子根本不划算。陳泳錩把椅子推回牆邊，最後才背起自己的東西。'),
              n('你回頭看了一眼店裡，忽然覺得這個暑假的晚上過得比想像中快。'),
            ] : [
              n('練團室裡的燈一盞盞關掉，諺明哥把鼓棒和器材收好，最後確認門窗都關妥。剛才那段鼓聲好像還留在耳邊，走出門時，夜風把白天的熱氣吹散了一些。'),
              n('他把門鎖好，回頭提醒你走路看著點路。你們沿著街邊慢慢往外走，沒有急著把話說完。'),
            ]} />
            <div className="reunion-pause-note">今晚的事情暫時告一段落，街上的招牌一盞盞亮起來。</div>
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={finish}>
                結束今天 <ChevronRight size={15} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
