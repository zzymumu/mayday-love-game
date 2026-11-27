import { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'

export type April12Character = 'wen' | 'ashin' | 'masa' | 'stone' | 'yanming'
export type April12DiaryData = { title: string; text: string }

type April12Block =
  | { kind: 'narration'; text: string }
  | { kind: 'dialogue'; speaker: string; text: string }

type April12Choice = {
  action: string
  reaction: string
  diary: string
  affection: number
}

type April12Round = { prompt: string; choices: April12Choice[] }
type April12Route = {
  name: string
  intro: string[]
  rounds: [April12Round, April12Round, April12Round]
  ending: string
}

type April12Phase = 'discussion' | 'picker' | 'interaction' | 'complete'
type April12Progress = {
  phase: April12Phase
  character: April12Character | null
  roundIndex: number
  pendingChoice: number | null
  choices: number[]
}

const STORAGE_KEY = 'mayday-april12-progress'
const CHARACTER_ORDER: April12Character[] = ['wen', 'ashin', 'masa', 'stone', 'yanming']
const CHARACTER_NAMES: Record<April12Character, string> = {
  wen: '溫尚翊',
  ashin: '陳信宏',
  masa: '瑪莎',
  stone: '石錦航',
  yanming: '諺明哥',
}

const initialProgress: April12Progress = {
  phase: 'discussion',
  character: null,
  roundIndex: 0,
  pendingChoice: null,
  choices: [],
}

function readProgress(): April12Progress {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as Partial<April12Progress> | null
    const phases: April12Phase[] = ['discussion', 'picker', 'interaction', 'complete']
    if (!saved || !phases.includes(saved.phase as April12Phase)) return initialProgress
    const character = CHARACTER_ORDER.includes(saved.character as April12Character) ? saved.character as April12Character : null
    const choices = Array.isArray(saved.choices)
      ? saved.choices.filter((value): value is number => Number.isInteger(value) && value >= 0 && value < 3).slice(0, 3)
      : []
    const roundIndex = Number.isInteger(saved.roundIndex) ? Math.max(0, Math.min(2, Number(saved.roundIndex))) : 0
    const pendingChoice = Number.isInteger(saved.pendingChoice) && Number(saved.pendingChoice) >= 0 && Number(saved.pendingChoice) < 3
      ? Number(saved.pendingChoice)
      : null
    if ((saved.phase === 'interaction' || saved.phase === 'complete') && !character) return initialProgress
    if (saved.phase === 'complete' && choices.length !== 3) return initialProgress
    return {
      phase: saved.phase as April12Phase,
      character,
      roundIndex,
      pendingChoice,
      choices,
    }
  } catch {
    return initialProgress
  }
}

const discussionBlocks: April12Block[] = [
  { kind: 'narration', text: '你推開練團室的門時，裡面居然沒有在放音樂。怪獸坐在桌邊轉著一支筆，阿信拿著幾張寫滿歌名的紙，石頭坐在旁邊，瑪莎則靠著椅背，正跟怪獸討論著什麼。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '如果真的要寄唱片公司，我覺得還是先錄個 Demo 比較好啦。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '不然人家光看信，也不知道我們的歌聽起來是什麼樣子。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '對啊，所以要先挑幾首出來錄。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '嗯，我也是這樣想的。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '可以先選幾首大家比較有把握的，錄起來以後再聽聽看嘛。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '講得很簡單欸，錄音不用錢喔？' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '蛤？不然你有比較好的辦法喔？' },
  { kind: 'dialogue', speaker: '瑪莎', text: '我是在提醒你現實一點好嗎？' },
  { kind: 'narration', text: '怪獸把筆往桌上一放，轉頭看他。瑪莎也不甘示弱地看回去。' },
  { kind: 'dialogue', speaker: '石錦航', text: '先不要吵啦，我們連要錄哪幾首都還沒決定。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '對啊，可以先把想錄的歌列出來。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '不用急著今天就決定啦，我們慢慢挑就好了。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '那就先列啊。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '你不要等一下又說每一首都要錄就好。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '不會啦，先列出來看看嘛。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '說不定大家想的都差不多啊。' },
  { kind: 'narration', text: '阿信把紙攤平，拿起筆在上面補了幾個曲名。你坐在旁邊聽他們討論，這才注意到錢佑達今天格外安靜。' },
  { kind: 'narration', text: '佑達坐在鼓組旁邊，手裡拿著鼓棒，偶爾轉兩下，更多時候只是聽大家說話。平常這種時候，他總會跟著插幾句，今天卻一直沒怎麼出聲。你看了他一眼，沒太在意，又把注意力放回桌邊的討論。' },
  { kind: 'dialogue', speaker: '石錦航', text: '不過我跟瑪莎最近真的要準備期中考了，可能沒那麼多時間。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '對啦！先讓我把期中考考完好不好？我現在看到書就頭痛。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '那就等你們考完再說啊。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '這樣也好啦，先把想法留著。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '等你們考完，我們再找一天慢慢弄，不用急啦。' },
  { kind: 'dialogue', speaker: '石錦航', text: '嗯，那就先這樣。' },
  { kind: 'narration', text: '幾個人又順著這個話題聊了幾句，阿信還在紙上補充曲目，怪獸則伸手指了指其中一首，似乎又有新的意見。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '好了好了，先練團啦！再講下去，今天是不是不用練了？' },
  { kind: 'dialogue', speaker: '瑪莎', text: '欸，明明是他們兩個一直在講。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '蛤？我哪有一直講？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '好啦，等一下練的時候再繼續討論，先把今天的歌練完啦。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '好喔，那我們先練一遍。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '剛剛講的先放著，等有空再繼續討論就好了。' },
  { kind: 'narration', text: '阿信把寫滿曲名的紙疊好，放在桌子旁邊。怪獸拿起吉他，瑪莎把 Bass 背好，石頭蹲下來整理導線，佑達也轉回鼓組後面，拿起鼓棒在鼓面上敲了兩下。' },
  { kind: 'narration', text: '關於 Demo 和寄唱片公司的事情，暫時就這樣告一段落。沒有決定錄哪幾首，也沒有定下時間，只約好等瑪莎和石頭考完期中考，再找時間好好討論。練團室很快重新響起熟悉的聲音。' },
]

const routes: Record<April12Character, April12Route> = {
  wen: {
    name: '溫尚翊',
    intro: [
      '怪獸蹲在效果器前面調旋鈕，吉他還掛在肩上。撥片夾在指間，他低著頭試了兩下音，眉頭微微皺著，像是怎麼調都還差一點。',
      '你走到他旁邊時，他正好伸手去拿掉在腳邊的導線，暫時沒注意到你。',
    ],
    rounds: [
      { prompt: '他還蹲在效果器旁邊，手指慢慢轉著旋鈕。', choices: [
        { action: '蹲到他旁邊，故意讓肩膀輕輕貼上去。', reaction: '他的手停了半秒，側過臉看你。你沒有退開，他也沒有。過了一會兒，他把膝蓋往旁邊挪了挪，讓你蹲得舒服一點，肩膀卻還是貼著你的。', diary: '怪獸蹲在效果器前面時，我也跟著蹲到他旁邊。肩膀貼上去那一下，他手上的旋鈕都停住了。明明旁邊還有位置，他卻也沒躲開。', affection: 2 },
        { action: '趁他低頭時，伸手把他額前垂下來的頭髮撥開。', reaction: '他的手指突然停住，抬起頭時剛好撞上你的視線。你收回手，他卻還看了你一會兒，最後才低下頭繼續調音，耳朵慢慢紅了。', diary: '我伸手把他額前那撮頭髮撥開，他整個人停了一下。平常那麼會嘴硬的人，突然安靜下來，還真的有點稀奇。', affection: 3 },
        { action: '把他手裡的撥片拿走，藏進自己的掌心。', reaction: '他先看了一眼空掉的手指，又看向你的手。伸手來拿時，指腹從你的掌心擦過，卻沒有立刻把撥片抽走，像是故意多停了一下。', diary: '我把他的撥片藏起來，結果他伸手來拿的時候，指尖從掌心擦過去。明明是我先鬧他的，最後反而是我心虛。', affection: 2 },
      ] },
      { prompt: '一首歌練完，怪獸把吉他放低，拿起毛巾擦汗。', choices: [
        { action: '伸手替他把被背帶壓歪的衣領整理平。', reaction: '他低下頭配合你，原本扶著琴頸的手也慢慢放鬆。等你把最後一點皺褶撫平，他沒有馬上轉身，反而低頭看了一眼你還沒收回去的手。', diary: '休息時我幫他把衣領壓平，他低著頭配合，等我收手還盯著我的手看了一眼。', affection: 3 },
        { action: '趁他坐著，伸手輕輕戳一下他的膝蓋。', reaction: '他低頭看你，眉毛挑了一下。你又戳了一下，他忽然伸手扣住你的指尖，停了兩秒才放開，接著若無其事地拿起水瓶。', diary: '我戳了戳他的膝蓋，他居然扣住我的手指兩秒才放開，還裝作什麼都沒發生。', affection: 3 },
        { action: '把自己的鞋尖輕輕碰上他的鞋尖。', reaction: '他低頭看了一眼，先往旁邊挪開一點。你正準備收回腳，他又把鞋尖挪回來，最後乾脆抵著你的鞋尖不動了。', diary: '我用鞋尖碰他的鞋，他先挪開一下，後來又自己碰回來，最後還抵著不動。這個人真的很會裝。', affection: 2 },
      ] },
      { prompt: '休息結束，怪獸站起來，準備重新背好吉他。', choices: [
        { action: '從他身後靠近，替他把扭在一起的背帶理平。', reaction: '他察覺你靠近，特意把肩膀稍微放低。你的手從背帶旁邊整理過去時，他沒有回頭，只是安安靜靜地站著，等你弄好才重新把吉他背穩。', diary: '他重新背吉他時，我從後面幫他理背帶，他還特地把肩膀放低了一點，乖乖站著等我弄好。', affection: 2 },
        { action: '朝他攤開手掌，示意想看看他的撥片。', reaction: '他把撥片放到你掌心，指尖卻沒有立刻離開，輕輕擦過你的手心才收回去。你低頭看撥片時，他已經轉過身，嘴角藏著一點笑。', diary: '我朝他攤手要撥片，他放進來時手指還在我掌心停了半秒。拿個撥片而已，有必要弄得這麼奇怪嗎？', affection: 2 },
        { action: '站到他身後，跟著他試音的節奏輕輕晃動。', reaction: '他從旁邊的玻璃反光裡看見你，嘴角忍不住往上揚。彈到熟悉的段落時，他還故意把吉他往你這邊傾了一點，讓你看清楚他的手指。', diary: '我站在他身後跟著節奏晃，他從玻璃反光裡發現我，彈到熟悉的地方還把琴往我這邊傾了一點。', affection: 2 },
      ] },
    ],
    ending: '練團室裡的音樂又接著響起。怪獸回到自己的位置，彈了幾個音確認效果器，偶爾會從琴頸旁邊抬眼看你。你明明沒有再做什麼，他卻像是還記得剛才那些小動作。',
  },
  ashin: {
    name: '陳信宏',
    intro: [
      '阿信抱著木吉他坐在椅子上，膝蓋上攤著一張歌譜。他一邊低頭標記和弦，一邊用手指輕輕壓住快被風扇吹起來的紙角。',
      '你走近時，他剛好翻到下一頁，留出半張椅子的空位。',
    ],
    rounds: [
      { prompt: '阿信低頭看著歌譜，鉛筆還夾在指間。', choices: [
        { action: '從旁邊湊過去看譜，讓肩膀輕輕靠上他的肩膀。', reaction: '他先是側過臉看了你一眼，接著把自己的肩膀放鬆，微微往你這邊靠了一點。你們的頭髮幾乎碰在一起，他卻仍然低頭看著同一行和弦，沒有急著拉開距離。', diary: '我湊過去看阿信的歌譜，肩膀靠上去時，他也很自然地往我這邊靠了一點。兩個人看同一行字，明明不用靠那麼近。', affection: 2 },
        { action: '拿過他的鉛筆，在歌譜空白處畫一個小小的笑臉。', reaction: '他看見那個笑臉，眼睛彎了起來，沒有擦掉，反而在旁邊補了一顆小星星，再把鉛筆輕輕放回你手邊。', diary: '我在他的歌譜旁邊畫了一個小笑臉，他不但沒擦掉，還在旁邊補了一顆星星。那張譜大概以後都不能認真看了。', affection: 2 },
        { action: '趁他翻頁時，輕輕把手按在他的手背上。', reaction: '他的手停在紙上，沒有抽走。你抬眼時，他也正好看著你，過了一會兒才用另一隻手慢慢翻過下一頁，手背仍然留在你的掌心下面。', diary: '翻歌譜的時候，我把手按在阿信手背上。他沒有抽開，還用另一隻手慢慢翻頁，弄得我也不知道該不該先把手收回來。', affection: 3 },
      ] },
      { prompt: '阿信剛唱完一段，把吉他靠在腿上，伸手拿水。', choices: [
        { action: '替他把額前垂下來的頭髮輕輕撥到一邊。', reaction: '他順著你的手抬起臉，眼睛彎彎的。等你的手離開，他又故意低下頭，讓那縷頭髮重新落下來，抬眼看你時，像是在等你再幫一次。', diary: '我幫阿信把額前的頭髮撥開，結果他過一會兒又故意低下頭，讓那撮頭髮掉回來。這個人是不是有一點故意的啊？', affection: 3 },
        { action: '拿起紙巾，輕輕替他擦掉臉頰旁邊的汗。', reaction: '他沒有躲，反而微微側過臉，讓你擦得更方便。你的指尖經過臉頰時，他的睫毛輕輕動了一下，等你收手才伸手接過紙巾。', diary: '阿信剛唱完有點出汗，我拿紙巾替他擦了一下。他真的就乖乖坐著讓我擦，害我突然有點不好意思。', affection: 3 },
        { action: '把自己的水瓶推到他面前，順手替他把瓶蓋鬆開。', reaction: '他看見後沒有拿自己的那瓶，反而拿起你的水瓶喝了一小口。喝完又輕輕放回原位，瓶口還特意轉向你這邊，像是把那一口也留給你。', diary: '我把水推給阿信，他居然拿起我的水瓶喝了一口，放回來時還把瓶口轉向我這邊。現在想想，這樣算不算間接接吻啊？', affection: 3 },
      ] },
      { prompt: '阿信重新抱起木吉他，低頭試了幾個和弦。', choices: [
        { action: '把手輕輕搭在他的肩膀上，靠近一點聽他試音。', reaction: '他彈了兩個音，忽然把音量放輕。你靠近一點，他也沒有躲開，只是側過臉朝你笑了一下，接著把那段旋律慢慢彈完。', diary: '我把手搭在阿信肩上聽他試音，他後來還把聲音放輕了。那幾個和弦明明很短，我卻聽得特別認真。', affection: 2 },
        { action: '把手伸到他面前，攤開掌心。', reaction: '他看了看你的手，才把手裡的撥片輕輕放進去。指尖在你的掌心停了一下，等你收起手，他才重新低頭調整琴弦。', diary: '我朝阿信攤開手，他把撥片放進來時，指尖在掌心停了一下。那個小動作不知道為什麼，比他直接把東西遞給我還讓人在意。', affection: 2 },
        { action: '趁他專心看譜，輕輕勾住他垂在椅子旁的小指。', reaction: '他的手指先是微微一頓，隨後很輕地回勾了一下。過了幾秒，他才慢慢把手收回吉他旁邊，嘴角一直帶著笑。', diary: '最後我還偷偷勾了一下阿信的小指。他居然也輕輕勾回來，之後整個人都笑得很安靜。', affection: 3 },
      ] },
    ],
    ending: '阿信把木吉他重新抱穩，低頭試著剛才那幾個和弦。你坐在旁邊時，他翻譜的速度比平常慢了一點，偶爾抬眼看你，笑意一直沒有完全退掉。',
  },
  masa: {
    name: '瑪莎',
    intro: [
      '瑪莎抱著 Bass 站在音箱旁邊，低頭調整琴弦，嘴裡還叼著一小截吸管。你走過去時，他正好把撥片放在譜架上，轉身去拿水。',
      '他背對著你，完全沒注意到你已經站在旁邊。',
    ],
    rounds: [
      { prompt: '瑪莎剛把 Bass 放好，手邊的撥片就在譜架上。', choices: [
        { action: '趁他沒注意，把他的撥片拿走，藏在身後。', reaction: '他摸了摸空掉的手指，轉頭就看見你背在身後的手。下一秒，他伸手去搔你的腰，你忍不住縮了一下，他才趁機把撥片拿回去，臉上全是惡作劇得逞的笑。', diary: '我把瑪莎的撥片藏起來，他一眼就看穿，最後還伸手搔我腰把它搶回去。這個人真的很幼稚，偏偏我也笑得很開心。', affection: 2 },
        { action: '把一張廢紙折成小紙帽，偷偷放到他的譜架上。', reaction: '他拿起來看了看，居然真的把紙帽戴到頭上，還故意朝你擺出一個很臭屁的姿勢，像在等你給他打分數。', diary: '我折了一頂紙帽放在他的譜架上，沒想到瑪莎真的戴起來，還一臉等著我稱讚的樣子。', affection: 1 },
        { action: '趁他轉身時，輕輕拉一下他的琴背帶。', reaction: '他低頭看見你的手，順勢把背帶往前一帶，讓你差點靠近他。看見你愣住，他才露出那種很欠揍的得意笑容。', diary: '我拉了一下瑪莎的背帶，結果反而被他順勢拉近，差點撞上去。這個人真的很會反過來捉弄人。', affection: 3 },
      ] },
      { prompt: '瑪莎把 Bass 靠在旁邊，伸手去拿水。', choices: [
        { action: '把他的水瓶拿起來，故意放到自己身後。', reaction: '他伸手來拿，你就往另一邊躲。他繞過椅子，最後從你旁邊把水瓶拿走，經過時還故意用肩膀輕輕撞了你一下。', diary: '我把瑪莎的水瓶藏到身後，他繞過來拿的時候還故意撞我一下。明明只是拿個水，硬是被他弄成追逐戰。', affection: 2 },
        { action: '趁他低頭時，用指尖輕輕戳一下他的臉頰。', reaction: '他突然轉過頭，伸手扣住你的手腕，故意把你的指尖按在自己臉頰上停了兩秒，才慢慢放開，眉毛還挑得老高。', diary: '我戳了一下瑪莎的臉，他居然抓住我的手，故意把我的指尖按在自己臉上。那個表情真的很欠揍。', affection: 3 },
        { action: '學他剛才皺眉調音的表情，故意皺得更誇張。', reaction: '他看見後立刻把眉毛皺得更誇張，甚至故意鼓起臉頰。兩個人隔著一張椅子互相做鬼臉，最後他先笑得肩膀發抖。', diary: '我學瑪莎剛才皺眉的樣子，他馬上回敬一個更誇張的。最後兩個人像小學生一樣互相做鬼臉。', affection: 1 },
      ] },
      { prompt: '休息結束，瑪莎重新把 Bass 背到肩上。', choices: [
        { action: '把手伸到他面前，做出索要撥片的動作。', reaction: '他把撥片舉高，你伸手也搆不到。他故意看著你努力了一會兒，最後才彎下腰，把撥片放進你手裡，還用眼神笑你。', diary: '我伸手跟瑪莎要撥片，他偏偏舉得老高，最後看我快搆不到才肯放下來。真的很幼稚。', affection: 2 },
        { action: '站到他旁邊，跟著他的動作一起假裝彈 Bass。', reaction: '他發現以後，故意把動作放慢，像是在教你一樣。等你跟上，他又突然加快速度，最後笑著看你手忙腳亂。', diary: '我在旁邊跟著瑪莎假裝彈 Bass，他還故意放慢動作讓我跟，下一秒又突然加速。這人根本不是在教我，是在看我出糗。', affection: 2 },
        { action: '趁他背好琴，輕輕拉住他的袖口不放。', reaction: '他低頭看了看被你拉住的袖口，沒有立刻抽走，反而把手臂往你這邊放低一點。等你鬆開，他才用手背輕輕碰了一下你的手。', diary: '最後我拉住瑪莎的袖口，他居然沒馬上走，還把手臂往我這邊放低了一點。平常嘴巴那麼壞，倒也不是完全沒良心。', affection: 3 },
      ] },
    ],
    ending: '瑪莎把 Bass 背回肩上，路過你身邊時故意用琴身輕輕碰了碰你的手臂。你抬頭看他，他已經若無其事地轉回去，嘴角卻還掛著笑。',
  },
  stone: {
    name: '石錦航',
    intro: [
      '石頭蹲在地上整理導線，幾條線繞在一起。他把其中一條慢慢抽出來，另一隻手扶著旁邊的譜架，免得它被碰倒。',
      '你走近時，他剛好把最後一條線理順，抬手把額前的頭髮往旁邊撥了一下。',
    ],
    rounds: [
      { prompt: '石頭還蹲在地上，手邊的吉他背帶垂在椅子旁。', choices: [
        { action: '蹲到他旁邊，替他扶住快滑下來的吉他背帶。', reaction: '他低頭看見你的手，稍微放鬆了肩膀。等你扶穩，他才慢慢把背帶調好，手背輕輕碰過你的指尖。', diary: '石頭整理東西時，我蹲下去幫他扶背帶。他沒有急著接過去，還慢慢把位置調好，手背碰到我的指尖時也沒有慌張。', affection: 2 },
        { action: '趁他低頭檢查琴弦，伸手替他把額前的頭髮撥開。', reaction: '他抬起頭時剛好看見你收回手，先是有些意外，隨後笑了笑，低頭把被你撥亂的頭髮隨手整理了一下。', diary: '我幫石頭把額前的頭髮撥開，他抬頭時有點意外，後來只是笑了一下。跟他靠近好像不用先想好要怎麼收場。', affection: 2 },
        { action: '坐到他旁邊，讓自己的膝蓋輕輕碰上他的膝蓋。', reaction: '他低頭看了一眼，沒有挪開，反而把原本放在膝上的手稍微移到旁邊，給你留出更舒服的位置。', diary: '我坐到石頭旁邊，膝蓋輕輕碰到他的。他看見了也沒躲，還把手挪開，讓我坐得更自在。', affection: 3 },
      ] },
      { prompt: '石頭把歌譜放到譜架上，低頭確認剛才標記的地方。', choices: [
        { action: '把歌譜往兩個人中間拉近一點。', reaction: '他順著你的動作扶住譜架，兩個人的肩膀自然靠在一起。他低頭看著同一行譜，偶爾側過臉確認你看到的位置。', diary: '我把歌譜拉近，石頭也扶住譜架。兩個人的肩膀就這樣靠在一起，他還很自然地跟我一起看完那一行。', affection: 2 },
        { action: '伸手替他把被琴帶壓住的衣袖拉出來。', reaction: '他安靜地抬起手臂配合你，等你整理好才把吉他重新背穩。低頭看見你還捏著袖口，他的目光停了一會兒才移開。', diary: '石頭的袖子被琴帶壓住，我幫他拉出來時，他就安安靜靜抬著手讓我弄。那種不急不躲的樣子，反而讓人有點心動。', affection: 3 },
        { action: '把一根手指輕輕放在他正在按弦的手旁邊。', reaction: '他低頭看了看你的手，隨後把自己的手指稍微挪開，給你留出一點位置。你沒有碰到琴弦，他也沒有急著收手。', diary: '我把手指放在石頭按弦的手旁邊，他還特地挪開一點給我留位置。明明只是看他彈琴，卻靠得有點太近了。', affection: 2 },
      ] },
      { prompt: '練團暫時停下來，石頭把吉他放到一旁。', choices: [
        { action: '坐到他旁邊，把頭輕輕靠在他的肩上。', reaction: '他先停了一下，隨後慢慢放鬆肩膀，微微偏過來讓你靠得更穩。手裡的撥片也不再轉動，他低頭看了你一眼，沒有催你起來。', diary: '休息時我把頭靠在石頭肩上，他沒有動，還微微偏過來讓我靠得舒服一點。那一小段時間安靜得剛剛好。', affection: 3 },
        { action: '把自己的手放進他攤開的掌心裡。', reaction: '他稍稍收攏手指，輕輕握了一下，沒有用力。等你準備收回手，他才慢慢鬆開，指尖最後輕輕擦過你的手腕。', diary: '我把手放進石頭掌心，他很輕地握了一下。沒有多做什麼，卻讓我回家以後還記得那個溫度。', affection: 3 },
        { action: '趁他低頭時，把一張小紙條夾進他的歌譜。', reaction: '他發現以後打開看了一眼，抬頭尋找你的目光。隨後把紙條仔細折好，重新夾回自己最常翻的那一頁。', diary: '我偷偷把一張小紙條夾進石頭的歌譜，他看完以後沒有丟掉，還重新夾回常翻的那一頁。', affection: 2 },
      ] },
    ],
    ending: '石頭把導線收好，又回頭看了你一眼。他沒有特別說什麼，只是把旁邊的椅子稍微往外拉開，像是替你留著位置。',
  },
  yanming: {
    name: '諺明哥',
    intro: [
      '練團室裡重新響起音樂，你沒有留在裡面，而是輕輕帶上門，走到外面的櫃檯。',
      '諺明哥坐在櫃檯後面，桌上攤著帳本、幾疊鈔票和零錢，旁邊還放著一本翻到一半的漫畫。他一邊低頭數錢，一邊偶爾瞄兩眼漫畫，數到一半還會用指尖把剛才看到的那一格壓住。',
      '你拉開旁邊的椅子坐下，伸手把漫畫拿近一點。諺明哥抬眼看了你一下，沒有阻止，只把漫畫往你這邊推了一些，繼續把手裡的鈔票數完。',
    ],
    rounds: [
      { prompt: '漫畫停在一頁很熱鬧的畫面，諺明哥正低頭把一疊鈔票對齊。', choices: [
        { action: '把漫畫輕輕拉到自己面前，翻回他剛才看到的那一頁。', reaction: '他抬眼看見你翻錯頁，伸手扶住書角，沒有直接拿回去，而是把漫畫轉正，指尖替你壓住他看到的位置。', diary: '我拿他的漫畫翻錯頁，他沒有把書拿回去，只伸手替我壓住剛才看到的位置。數錢的人居然還記得自己看到第幾格。', affection: 2 },
        { action: '拿起桌上的零錢，按照面額一枚一枚排成小堆。', reaction: '他把桌面清出一小塊位置，等你排好以後，用指節把每一堆的邊緣輕輕敲齊，最後把最整齊的那一堆推到你面前。', diary: '我跟著諺明哥一起整理零錢，他還把我排好的硬幣敲得整整齊齊。明明是在算帳，最後弄得像在玩桌上遊戲。', affection: 1 },
        { action: '指著漫畫裡一個特別好笑的畫面，讓他也看。', reaction: '他順著你的手指低頭看過去，原本數到一半的鈔票被他暫時壓在掌心下面。看完以後，他把漫畫往你這邊推近，讓你再看一次。', diary: '我指給諺明哥看漫畫裡最好笑的那一格，他居然真的停下來看完，還把書推近，讓我再看一次。', affection: 2 },
      ] },
      { prompt: '他把數好的鈔票放進抽屜，又重新拿起漫畫。', choices: [
        { action: '把椅子往他身邊拉近一點，肩膀輕輕靠過去一起看。', reaction: '他低頭看了你一眼，沒有挪開，反而把漫畫往兩個人中間移了移。翻頁時肩膀輕輕碰到你的，他也沒有刻意拉開距離。', diary: '我把椅子拉近，跟諺明哥一起看漫畫。肩膀碰在一起的時候，他只是把書挪到中間，像是這樣很自然。', affection: 2 },
        { action: '把一枚硬幣放在掌心，伸到他面前。', reaction: '他伸手來拿，發現你故意把手指蜷起來，便用另一隻手輕輕托住你的手掌，一根一根把你的手指撥開，最後才取走硬幣。', diary: '我把硬幣藏在手心不給他拿，諺明哥沒有硬搶，反而托著我的手一根一根把手指撥開。這個動作比拿硬幣本身還慢。', affection: 3 },
        { action: '趁他核對帳目，偷偷把漫畫翻到最好笑的那一格。', reaction: '他一抬眼就看見你翻到那裡，原本認真的表情鬆了下來。手裡的筆停在帳本上，最後乾脆把漫畫轉向你們中間，一起看完那一格。', diary: '諺明哥核對帳目的時候，我偷偷把漫畫翻到最好笑的地方。他一看就知道我在做什麼，最後乾脆把書轉過來一起看。', affection: 2 },
      ] },
      { prompt: '櫃檯上的帳目快整理完了，練團室裡的音樂聲隔著門傳出來。', choices: [
        { action: '把漫畫合起來，輕輕放回他手邊。', reaction: '他看了看漫畫，又看了看你，沒有立刻拿回去，而是把書放到桌子裡側，像是暫時不打算繼續看了。', diary: '我把漫畫合起來放回去，諺明哥卻沒有馬上拿起來，反而把它放到桌子裡面。好像也不急著把這段時間結束。', affection: 2 },
        { action: '把整理好的零錢推回他面前，順手替他把散開的鈔票疊齊。', reaction: '他仔細核對了一遍，隨後把其中一小疊遞到你手邊，示意你幫忙放進抽屜。兩個人的手在抽屜邊碰了一下，他沒有急著收回去，只等你把錢放好。', diary: '我幫諺明哥把鈔票疊好，他把一小疊交給我放進抽屜。手在抽屜邊碰到的時候，他還等我放好才收回去。', affection: 2 },
        { action: '離開椅子前，伸手輕輕拍一下他的肩膀。', reaction: '他抬頭看你，隨手把椅子往裡推好。等你轉身走了兩步，他才重新低頭看帳本，目光卻還跟著你停了一小會兒。', diary: '我起身前拍了拍諺明哥的肩膀，他替我把椅子推回去。走回練團室前，我回頭看了一眼，他還在看我這邊。', affection: 2 },
      ] },
    ],
    ending: '櫃檯上的零錢終於收好，諺明哥把帳本合起來，漫畫也被他放到桌子一旁。練團室裡的音樂隔著門傳出來，你在椅子上多坐了一會兒，才準備回去。',
  },
}

export function buildApril12DiaryData(character: April12Character, choices: number[]): April12DiaryData {
  const route = routes[character]
  const memories = route.rounds.map((round, index) => round.choices[choices[index] ?? 0].diary)
  const text = [
    '今天回家以後，腦袋裡還一直回放佑達那句「好了好了，先練團啦！再講下去，今天是不是不用練了？」',
    '本來以為一進練團室就會聽見吉他聲，結果大家居然圍著桌子討論起 Demo。阿信說要先錄一份，不然光寄信人家也不知道他們的歌是什麼樣子；怪獸忙著想曲目，瑪莎則一直提醒錄音要花錢。幾個人明明是在講很認真的事，講著講著又差點吵起來。',
    '石頭和瑪莎最近要準備期中考，最後只好約好等考完再繼續談。佑達一開始真的安靜得出奇，我有看他兩眼，不過也沒多想。等大家又開始繞著曲目打轉，他才把鼓棒往腿上一搭，直接把人都趕回去練團。那句「好了好了」現在想起來還是很好笑。',
    memories[0],
    memories[1],
    memories[2],
    '本來以為只是普通的練團日，結果回家以後，腦袋裡記住的反而都是這些小得不能再小的事情。',
    '好啦，今天先寫到這裡。晚安！',
  ].join('\n\n')
  return { title: '今天差點變成開會', text }
}

function April12Blocks({ blocks }: { blocks: April12Block[] }) {
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

function clockForProgress(progress: April12Progress) {
  if (progress.phase === 'discussion') return '14:30'
  if (progress.phase === 'picker') return '15:00'
  if (progress.phase === 'interaction') return ['15:30', '15:55', '16:20'][progress.roundIndex]
  return '17:00'
}

export function April12Story({
  onAddAffection,
  onClockChange,
  onFinish,
}: {
  onAddAffection: (character: April12Character, amount: number) => void
  onClockChange: (time: string) => void
  onFinish: (selection: { character: April12Character; choices: number[] }) => void
}) {
  const [progress, setProgress] = useState<April12Progress>(readProgress)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    onClockChange(clockForProgress(progress))
  }, [progress, onClockChange])

  const chooseCharacter = (character: April12Character) => {
    setProgress({ phase: 'interaction', character, roundIndex: 0, pendingChoice: null, choices: [] })
  }

  const chooseAction = (choiceIndex: number) => {
    if (!progress.character || progress.pendingChoice !== null) return
    const choice = routes[progress.character].rounds[progress.roundIndex]?.choices[choiceIndex]
    if (!choice) return
    setProgress((current) => ({
      ...current,
      pendingChoice: choiceIndex,
      choices: [...current.choices.slice(0, current.roundIndex), choiceIndex],
    }))
    onAddAffection(progress.character, choice.affection)
  }

  const continueInteraction = () => {
    if (progress.pendingChoice === null) return
    if (progress.roundIndex < 2) {
      setProgress((current) => ({ ...current, roundIndex: current.roundIndex + 1, pendingChoice: null }))
    } else {
      setProgress((current) => ({ ...current, phase: 'complete', pendingChoice: null }))
    }
  }

  const route = progress.character ? routes[progress.character] : null
  const currentRound = route?.rounds[progress.roundIndex]
  const selectedChoice = progress.pendingChoice !== null && currentRound ? currentRound.choices[progress.pendingChoice] : null

  return (
    <div className="story-screen-overlay">
      <div className="story-screen-head">
        <div className="chapter-mark">4 月 12 日・練團日</div>
        <div className="story-contact-title">
          <strong>練團室・午後</strong>
          <small>1997 年 4 月 12 日・星期六</small>
        </div>
        <span className="story-head-spacer" />
      </div>

      <div className="story-narrative-scroll">
        <div className="story-kicker">APRIL 12 · REHEARSAL</div>

        {progress.phase === 'discussion' && (
          <>
            <h2 className="story-scene-title">今天還沒開始練，就先開起會來了。</h2>
            <April12Blocks blocks={discussionBlocks} />
            <div className="reunion-pause-note">Demo 的事情先留到期中考結束以後，今天先把歌練好。</div>
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={() => setProgress((current) => ({ ...current, phase: 'picker' }))}>
                等大家開始練團 <ChevronRight size={15} />
              </button>
            </div>
          </>
        )}

        {progress.phase === 'picker' && (
          <>
            <h2 className="story-scene-title">練團開始了，想趁空檔靠近誰？</h2>
            <April12Blocks blocks={[
              { kind: 'narration', text: '吉他和鼓聲重新響起，幾個人各自回到位置。你在旁邊看了一會兒，想趁他們調音或休息的空檔，偷偷做點小動作。' },
              { kind: 'narration', text: '也可以出去找諺明哥。他今天在外面的櫃檯，似乎還有帳要算。' },
            ]} />
            <div className="march29-reply-list">
              {CHARACTER_ORDER.map((character) => (
                <button className="reply-choice" key={character} onClick={() => chooseCharacter(character)}>
                  <span>{character === 'yanming' ? '出去找諺明哥' : CHARACTER_NAMES[character]}</span>
                  <ChevronRight size={15} />
                </button>
              ))}
            </div>
          </>
        )}

        {progress.phase === 'interaction' && route && currentRound && (
          <>
            <h2 className="story-scene-title">{progress.character === 'yanming' ? '櫃檯旁邊・和諺明哥待一會兒' : '練團空檔・和' + route.name + '待一會兒'}</h2>
            {progress.roundIndex === 0 && (
              <April12Blocks blocks={route.intro.map((text) => ({ kind: 'narration' as const, text }))} />
            )}
            <div className="reunion-pause-note">第 {progress.roundIndex + 1}／3 輪・不說話的小動作</div>
            <p className="narrative-paragraph">{currentRound.prompt}</p>
            {selectedChoice ? (
              <>
                <div className="reunion-pause-note">你的小動作</div>
                <p className="narrative-paragraph">{'你' + selectedChoice.action}</p>
                <p className="narrative-paragraph">{selectedChoice.reaction}</p>
                <div className="story-action-bar story-inline-action">
                  <button className="story-primary-button" onClick={continueInteraction}>
                    {progress.roundIndex < 2 ? '繼續待一會兒' : '今天就到這裡'} <ChevronRight size={15} />
                  </button>
                </div>
              </>
            ) : (
              <div className="march29-reply-list">
                {currentRound.choices.map((choice, index) => (
                  <button className="reply-choice" key={index} onClick={() => chooseAction(index)}>
                    <span>{choice.action}</span>
                    <ChevronRight size={15} />
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {progress.phase === 'complete' && route && (
          <>
            <h2 className="story-scene-title">1997 年 4 月 12 日・練團結束</h2>
            <p className="narrative-paragraph">{route.ending}</p>
            <p className="narrative-paragraph">今天沒有把 Demo 的事情討論出結果，不過那張寫滿歌名的紙還留在桌邊。等瑪莎和石頭考完期中考，大家應該還會再把它拿出來。</p>
            <div className="reunion-pause-note">回家洗完澡，今天的小事好像還值得記下來。</div>
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={() => onFinish({ character: progress.character as April12Character, choices: progress.choices })}>
                寫下今天的日記 <ChevronRight size={15} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
