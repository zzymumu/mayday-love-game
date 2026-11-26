import { useEffect, useState } from 'react'
import { ChevronRight, MessageSquare } from 'lucide-react'

export type April20Character = 'wen' | 'ashin' | 'masa' | 'stone' | 'yanming'

type April20Block =
  | { kind: 'narration'; text: string }
  | { kind: 'dialogue'; speaker: string; text: string }

type SmsLine = { from: 'youda' | 'me'; text: string; time: string }
type SmsChoice = { text: string; replies: string[] }
type SmsRound = { incoming: string[]; choices: [SmsChoice, SmsChoice, SmsChoice] }
type InteractionChoice = { text: string; response: April20Block[]; affection: number }
type InteractionRound = { prompt: string; setup?: April20Block[]; choices: [InteractionChoice, InteractionChoice, InteractionChoice] }
type April20Route = {
  name: string
  intro: April20Block[]
  rounds: InteractionRound[]
  ending: April20Block[]
}
type April20Phase = 'notification' | 'sms' | 'smsEnding' | 'routePicker' | 'park' | 'conflict' | 'characterPicker' | 'interaction' | 'complete'
type April20RouteKind = 'park' | 'rehearsal' | null
type April20Progress = {
  phase: April20Phase
  smsRound: number
  smsPendingChoice: number | null
  messages: SmsLine[]
  route: April20RouteKind
  character: April20Character | null
  roundIndex: number
  pendingChoice: number | null
  choices: number[]
}

const STORAGE_KEY = 'mayday-april20-progress'
const SMS_SEEDED_KEY = 'mayday-april20-sms-seeded'
const CHARACTER_ORDER: April20Character[] = ['wen', 'ashin', 'masa', 'stone', 'yanming']
const CHARACTER_NAMES: Record<April20Character, string> = {
  wen: '溫尚翊',
  ashin: '陳信宏',
  masa: '瑪莎',
  stone: '石錦航',
  yanming: '劉諺明',
}
const initialProgress: April20Progress = {
  phase: 'notification',
  smsRound: 0,
  smsPendingChoice: null,
  messages: [],
  route: null,
  character: null,
  roundIndex: 0,
  pendingChoice: null,
  choices: [],
}

const smsRounds: SmsRound[] = [
  {
    incoming: [
      '欸，妳現在有空嗎？',
      '我想問妳幾個問題，可能有點奇怪。',
      '就是……妳覺得玩地下樂團，最重要的是什麼啊？',
      '是技術比較重要，還是大家有默契？',
    ],
    choices: [
      { text: '大家玩得開心比較重要吧，至少要真的喜歡跟彼此一起玩。', replies: ['嗯……這樣講也沒錯。', '可是如果有人每次都要其他人等他，還能玩得開心嗎？'] },
      { text: '技術吧，畢竟上台總不能一直出錯。', replies: ['也是喔。', '如果一個人技術差太多，是不是就會很明顯？'] },
      { text: '怎麼突然研究起這個了？你是不是看到什麼文章？', replies: ['沒有啦！', '就剛好看到有人在討論，想說問問妳。'] },
    ],
  },
  {
    incoming: ['我之前看到有人在討論，說一個團的整體水平，其實就是看裡面最差的那個人。', '妳覺得這種說法有道理嗎？'],
    choices: [
      { text: '不太對吧，一個團又不是只有一個人在表演。', replies: ['可是如果那個人一直出錯，其他人不是也要跟著停下來？'] },
      { text: '有一點道理欸，畢竟每個人負責的部分都會影響整首歌。', replies: ['對啊……有時候一個地方不穩，整首歌聽起來就會怪怪的。'] },
      { text: '你怎麼突然變得這麼嚴肅啦？', replies: ['有嗎？', '我只是覺得這個問題滿有意思的。'] },
    ],
  },
  {
    incoming: ['那如果一個人已經練很久了，可是進步還是沒有其他人快呢？', '是不是就算再努力，也不一定有用？'],
    choices: [
      { text: '怎麼會沒用，練習本來就不是每個人進步的速度都一樣啊。', replies: ['可是如果其他人已經練到下一個程度了呢？'] },
      { text: '可以把比較難的地方拆開來練啊，不一定要一直硬跟。', replies: ['嗯……這倒是。', '只是有時候會覺得，大家好像一直在配合一個人。'] },
      { text: '你今天到底怎麼了？感覺你一直在替某個人擔心欸。', replies: ['蛤？沒有啦。', '我真的只是想到才問的。'] },
    ],
  },
  {
    incoming: [
      '還有一件事。',
      '如果一個團裡面，有些人真的很想繼續玩下去，甚至想錄Demo、找唱片公司，可是有人一開始只是覺得好玩……',
      '這樣會不會不太一樣？',
    ],
    choices: [
      { text: '不會啊，喜歡音樂也不一定非要當成工作吧。', replies: ['所以只是想跟大家一起玩，也可以喔？'] },
      { text: '如果大家想走的方向不一樣，還是應該找時間講清楚吧。', replies: ['嗯……一直不講，好像也不太好。'] },
      { text: '你說的那個人，該不會就是你自己吧？', replies: ['……', '妳不要突然講這麼直接啦。', '我真的只是隨便問問。'] },
    ],
  },
  {
    incoming: [
      '最後一個問題喔。',
      '如果一個人真的覺得自己是整個團裡最差的那個，覺得繼續留下來只會拖累大家……',
      '妳覺得他應該留下來繼續練，還是乾脆退出比較好？',
    ],
    choices: [
      { text: '不要自己替大家決定啊，其他人又沒有說不想跟你一起練。', replies: ['……也是。', '有時候自己想的，跟別人想的好像不一定一樣。'] },
      { text: '至少先跟大家說清楚吧，不能什麼都自己一個人扛。', replies: ['嗯，我知道了。', '可能真的應該講出來比較好。'] },
      { text: '如果真的已經不開心了，也不用勉強自己留下來。', replies: ['這樣喔……', '好，我知道了。'] },
    ],
  },
]

const conflictBlocks: April20Block[] = [
  { kind: 'narration', text: '你走到練團室門口時，裡面已經傳來爭執聲。' },
  { kind: 'narration', text: '門沒有關嚴，你推開一點，發現大家並沒有在練習。' },
  { kind: 'narration', text: '溫尚翊站在音箱旁邊，手裡的撥片被捏得緊緊的。瑪莎靠著鼓組，眉頭皺著。阿信和石頭站在兩人中間。' },
  { kind: 'narration', text: '錢佑達沒有坐在鼓後面。他站著，手裡握著兩根鼓棒，低著頭。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '我想退團。' },
  { kind: 'narration', text: '練團室一下子安靜下來。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '……蛤？' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '你認真的喔？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '嗯，我想過一陣子了。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '不是，等一下。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '你到底在講三小啦？' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '練不好就再練啊，是有什麼問題？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '不是練幾次的問題。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '我是真的覺得，我可能不適合繼續待在這個團。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '蛤？你今天是怎樣？' },
  { kind: 'dialogue', speaker: '瑪莎', text: '突然跑來跟我們講這個？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '我自己打鼓打得不好，每次都要大家等我。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '靠夭，練團本來就會停下來重來啊！' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '我彈錯的時候，你們有少等過我喔？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '可是我真的覺得自己跟不上。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '誰跟你說你拖住大家了？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '每次練到一半，我出錯，你們就要停下來重來。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '有時候一個地方要練好幾遍。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '不然咧？練團不就是這樣？' },
  { kind: 'dialogue', speaker: '瑪莎', text: '我Bass彈錯的時候，你們有少重來過喔？' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '對啊！誰沒有彈錯過？你現在是要把自己講成什麼啊？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '可是我不是偶爾出錯。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '我就是一直不夠好。' },
  { kind: 'narration', text: '溫尚翊張了張嘴，似乎還想反駁。他把撥片在指間轉了一圈，眉頭越皺越緊。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '幹，誰一開始就什麼都會啊？' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '你現在打不好就繼續練啊，啊不然咧？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '可是我不想一直拖累大家。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '靠北，我們到底哪一句話讓你覺得自己在拖累大家？' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '你悶在心裡這麼久，現在突然跑來說要退團，你有沒有想過我們怎麼想？' },
  { kind: 'dialogue', speaker: '陳信宏', text: '怪獸，你先讓佑達把話說完啦……' },
  { kind: 'narration', text: '阿信往前走了一點，語氣比剛才輕了些。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '佑達，你是不是最近練團的時候壓力很大？' },
  { kind: 'dialogue', speaker: '陳信宏', text: '如果真的有哪裡不舒服，可以跟我們講啊。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '我不是不知道你們對我很好。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '只是你們真的很想繼續玩音樂啊。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '上次不是還在討論Demo，還有要不要投唱片公司的事情？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '可是我以前根本沒想過，以後要真的走音樂這條路。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '一開始只是覺得打鼓很好玩，跟你們一起練團也很開心。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '可是現在好像不一樣了。' },
  { kind: 'narration', text: '他低頭看了看手裡的鼓棒，拇指在鼓棒邊緣反覆摩挲。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '你們有沒有想過，一個團到底是怎麼看水平的？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '不是看最厲害的那個人吧。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '應該是看最差的那個人能到什麼程度。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '吉他再厲害、歌寫得再好，如果鼓一直跟不上，整首歌不還是會被拖住嗎？' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '誰跟你說你拖住大家了？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '我知道你們不會這樣講。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '可是我自己聽得出來。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '有時候你們已經練得很順了，還是要因為我停下來。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '我真的不想每次都這樣。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '幹，我們又不是在比誰比較厲害！' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '練團本來就是大家一起練，哪有人規定每個人都要一樣快？' },
  { kind: 'dialogue', speaker: '石錦航', text: '佑達，怪獸說的也是我們大家的意思。' },
  { kind: 'dialogue', speaker: '石錦航', text: '我們真的沒有覺得你拖累大家。' },
  { kind: 'dialogue', speaker: '石錦航', text: '練團本來就是一起練、一起進步啊。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '可是你們都在往前走。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '我有時候連一首歌都打不好。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '我不想每次都要你們配合我。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '可是……佑達，我們也不是說現在就要你決定以後的事情啊。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '想跟大家一起練團，跟以後要不要靠音樂生活，本來就是兩件事。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '你不用因為這樣，就覺得自己一定要做到什麼程度。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '對啊！' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '誰規定玩團就一定要靠音樂吃飯？' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '我們現在想錄Demo，就代表以後每個人都要當音樂人喔？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '可是你們是真的想把音樂做好。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '不是啊，你現在到底在想什麼？' },
  { kind: 'dialogue', speaker: '瑪莎', text: '我們有說過因為你打不好，就不要跟你玩了嗎？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '沒有。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '可是我自己會覺得很不好意思啊。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '每次練到一半，大家都要停下來等我。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '欸，你到底有沒有聽懂我們在講什麼？' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '我們又沒有覺得你不好！' },
  { kind: 'dialogue', speaker: '錢佑達', text: '你們當然不會這樣講。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '可是我真的覺得自己不適合。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '所以你就直接退團？' },
  { kind: 'dialogue', speaker: '瑪莎', text: '你連讓我們一起想辦法的機會都不給？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '我已經想好了。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '想好了就可以這樣一句話丟給我們喔？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '那不然要怎樣？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '我現在不是已經講了嗎？' },
  { kind: 'narration', text: '溫尚翊往前走了一步，手裡的撥片被他攥得更緊。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '幹……' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '你現在講這些，是不是不管我們說什麼，你都不會改變主意？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '……嗯。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '佑達，你真的不能再想一下嗎？' },
  { kind: 'dialogue', speaker: '陳信宏', text: '我們可以一起找方法，不用現在就決定啊。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '不要再勸我了。' },
  { kind: 'narration', text: '他把鼓棒放到鼓旁邊，抓起自己的包，徑直朝門口走去。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '欸！錢佑達！' },
  { kind: 'narration', text: '他追了一步。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '你給我把話講清楚再走啦！' },
  { kind: 'narration', text: '錢佑達沒有回頭，徑直拉開門走了出去。' },
  { kind: 'narration', text: '門被重重關上。' },
  { kind: 'narration', text: '溫尚翊站在原地，胸口起伏著，最後煩躁地抓了一把頭髮。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '……幹。' },
  { kind: 'narration', text: '他鞋尖把旁邊的椅子往裡踢了一下。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '現在是怎樣啊……' },
  { kind: 'narration', text: '瑪莎看著空蕩蕩的鼓組，剛才還想反駁的話，這會兒也說不出來了。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '他應該真的想很久了。' },
  { kind: 'narration', text: '阿信輕輕嘆了口氣，目光停在錢佑達剛才站著的位置。' },
  { kind: 'dialogue', speaker: '石錦航', text: '先讓他一個人靜一下吧。' },
  { kind: 'narration', text: '石頭彎腰，把掉在地上的鼓棒撿起來，放回鼓組旁邊。' },
  { kind: 'narration', text: '你站在門口，手還搭在門把上，一時不知道該不該進去。' },
]

const parkRoute: April20Route = {
  name: '諺明哥',
  intro: [
    { kind: 'narration', text: '你走到練團室外面的櫃檯時，諺明哥正把帳本收進抽屜。旁邊那本漫畫還攤在桌上，書籤歪歪地夾在中間。' },
    { kind: 'dialogue', speaker: '你', text: '諺明哥，你等一下有空嗎？要不要出去走走？' },
    { kind: 'dialogue', speaker: '劉諺明', text: '現在喔？可以啊。等我把這邊收一下。' },
    { kind: 'narration', text: '他把抽屜鎖好，拿起外套，又順手把漫畫合起來放到櫃檯裡側。你們沿著街道慢慢往附近的公園走。' },
    { kind: 'narration', text: '星期天下午的公園很熱鬧。有人牽著狗散步，有小朋友在空地追球，樹蔭底下坐著幾個聊天的老人。諺明哥走在你旁邊，步子不快，偶爾還會替迎面走來的人讓一下路。' },
  ],
  rounds: [
    { prompt: '走到公園入口時，諺明哥抬頭看了一眼樹蔭，又轉過來看你。', choices: [
      { text: '「你平常也會來這裡走走嗎？」', affection: 1, response: [
        { kind: 'dialogue', speaker: '劉諺明', text: '偶爾啦，店裡待久了，出來走一下也不錯。' },
        { kind: 'narration', text: '他抬手指了指前面的步道，讓你挑想走哪一邊。' },
        { kind: 'dialogue', speaker: '劉諺明', text: '今天不用趕時間，慢慢走就好。' },
      ]},
      { text: '「你剛剛是不是還在看漫畫？看到哪裡啦？」', affection: 2, response: [
        { kind: 'dialogue', speaker: '劉諺明', text: '妳眼睛倒是很尖。' },
        { kind: 'narration', text: '他笑了一下，伸手比了比書本大概的位置。' },
        { kind: 'dialogue', speaker: '劉諺明', text: '看到一半而已，回去再看也不遲。' },
      ]},
      { text: '「我今天想走遠一點，順便消消食。」', affection: 1, response: [
        { kind: 'dialogue', speaker: '劉諺明', text: '好啊，那就繞大圈。' },
        { kind: 'narration', text: '他看了看你的鞋子，提醒你步道有幾段不太平。' },
        { kind: 'dialogue', speaker: '劉諺明', text: '走路看前面，別光顧著聊天。' },
      ]},
    ]},
    { prompt: '一隻小狗從你們前面跑過去，牽繩差點繞到長椅腳邊。', choices: [
      { text: '蹲下來跟小狗打招呼，還回頭叫他一起看。', affection: 2, response: [
        { kind: 'narration', text: '諺明哥停在你旁邊，等小狗的主人把牽繩整理好，才跟著蹲低一點。' },
        { kind: 'dialogue', speaker: '劉諺明', text: '牠好像很喜歡妳欸。' },
        { kind: 'dialogue', speaker: '你', text: '明明是你蹲下來牠才靠近的吧！' },
        { kind: 'dialogue', speaker: '劉諺明', text: '那可能是我們兩個都滿有親和力的。' },
      ]},
      { text: '往旁邊讓開，順手拉一下他的袖子提醒他小心。', affection: 2, response: [
        { kind: 'narration', text: '他順著你的力道往旁邊退了半步，低頭看了一眼被你拉住的袖口。' },
        { kind: 'dialogue', speaker: '劉諺明', text: '謝啦，差點踩到牠的牽繩。' },
        { kind: 'dialogue', speaker: '劉諺明', text: '妳反應倒是很快。' },
      ]},
      { text: '笑著說牠跑得比你們兩個都快。', affection: 1, response: [
        { kind: 'dialogue', speaker: '劉諺明', text: '那妳要不要跟牠比一下？' },
        { kind: 'narration', text: '他說完自己先笑了，伸手替你把被風吹到臉旁的頭髮撥開一點。' },
      ]},
    ]},
    { prompt: '走到一排長椅旁邊，諺明哥停下來問你要不要坐一下。', choices: [
      { text: '「坐一下好了，我想聽你講講練團室以前的趣事。」', affection: 2, response: [
        { kind: 'dialogue', speaker: '劉諺明', text: '以前喔？那可多了。' },
        { kind: 'narration', text: '他坐到你旁邊，想了一會兒，挑了件不太丟臉的先講。' },
        { kind: 'dialogue', speaker: '劉諺明', text: '有一次他們練到太晚，收器材收得亂七八糟，最後還是我留下來一件一件點。' },
        { kind: 'dialogue', speaker: '你', text: '聽起來很像他們會做的事欸。' },
        { kind: 'dialogue', speaker: '劉諺明', text: '所以我才要盯著啊，不然隔天又找不到東西。' },
      ]},
      { text: '把手裡的飲料遞給他，問他要不要喝一口。', affection: 2, response: [
        { kind: 'narration', text: '他接過飲料時，手指避開了你的指尖，卻還是碰到了一下。' },
        { kind: 'dialogue', speaker: '劉諺明', text: '謝謝。妳自己也喝一點，走了這麼久。' },
        { kind: 'narration', text: '他把飲料還給你，順手把瓶蓋替你轉鬆。' },
      ]},
      { text: '坐到他旁邊，肩膀輕輕靠過去。', affection: 3, response: [
        { kind: 'narration', text: '他察覺你的動作，先低頭看了一眼，隨後把肩膀放鬆，讓你靠得穩一點。' },
        { kind: 'dialogue', speaker: '劉諺明', text: '累了就坐一下，不用急著走。' },
        { kind: 'narration', text: '他沒有再多說什麼，只是把手臂稍微往旁邊收了收，替你留出舒服的位置。' },
      ]},
    ]},
  ],
  ending: [
    { kind: 'narration', text: '你們在公園裡繞了一大圈，回去時天色已經慢慢暗下來。諺明哥走在靠馬路的那一側，偶爾提醒你看車，也沒有催你走快。' },
    { kind: 'dialogue', speaker: '劉諺明', text: '今天走得還滿舒服的。下次妳想出來透氣，再叫我就好。' },
    { kind: 'narration', text: '他把你送到路口才轉身回練團室。你看著他的背影走遠，才慢慢往家的方向走去。' },
  ],
}

const characterRoutes: Record<April20Character, April20Route> = {
  wen: {
    name: '溫尚翊',
    intro: [
      { kind: 'narration', text: '溫尚翊站在音箱旁邊，胸口還有些起伏。他把吉他放回架子上，轉身走出練團室。' },
      { kind: 'narration', text: '走廊的窗戶開著，四月的風吹進來，帶著一點太陽曬過牆面的味道。他靠在窗邊，低頭看著自己的鞋尖，手指無意識地捏著衣服下擺。' },
      { kind: 'dialogue', speaker: '你', text: '你怎麼一個人跑出來了？' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '裡面太悶了啦。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '出來透個氣不行喔？' },
      { kind: 'narration', text: '他嘴上這麼說，卻沒有轉過身趕你回去。' },
    ],
    rounds: [
      { prompt: '他靠在窗邊，視線還停在走廊外面。', choices: [
        { text: '你剛才真的很凶欸，我站在門口都不敢進去了。', affection: 2, response: [
          { kind: 'dialogue', speaker: '溫尚翊', text: '蛤？有這麼誇張喔？' },
          { kind: 'narration', text: '他終於轉過頭看你，眉毛揚了一下。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '我哪有凶妳，我是在跟佑達講話欸。' },
          { kind: 'dialogue', speaker: '你', text: '可是你聲音真的很大嘛。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '啊不然咧？他突然說要退團，我還不能問清楚喔？' },
          { kind: 'narration', text: '說完，他又轉回去，過了兩秒才補上一句。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '……而且我也沒有要罵他。' },
        ]},
        { text: '你是不是很怕他真的不回來了？', affection: 2, response: [
          { kind: 'narration', text: '他原本搭在窗沿上的手停了一下。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '廢話啊。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '練了這麼久，突然少一個人，妳覺得沒差喔？' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '而且我們又不是隨便找個人來就可以一起玩的。' },
          { kind: 'narration', text: '他低頭踢了一下牆邊的小石子。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '就……很煩啊。' },
        ]},
        { text: '我先不問你啦，陪你站一下好了。', affection: 2, response: [
          { kind: 'dialogue', speaker: '溫尚翊', text: '……妳今天是怎樣？' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '突然這麼安靜。' },
          { kind: 'narration', text: '他看了你一眼，像是想笑，又忍住了。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '好啦，隨便妳。' },
          { kind: 'narration', text: '他往旁邊挪了一點，給你留出位置。兩個人並排站著，聽見裡面偶爾傳來瑪莎和石頭說話的聲音。' },
        ]},
      ]},
      { prompt: '過了一會兒，溫尚翊終於又開口。', choices: [
        { text: '可是你也會擔心Demo錄不好吧？', affection: 2, response: [
          { kind: 'dialogue', speaker: '溫尚翊', text: '當然會啊！' },
          { kind: 'narration', text: '他回答得很快，像是覺得這個問題根本不用想。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '誰不想把歌弄好一點？' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '我們又不是錄完隨便丟出去就算了。' },
          { kind: 'narration', text: '他頓了一下。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '可是想把歌做好，跟一定要每個人現在就變得很厲害，是兩回事吧。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '我又沒有叫他明天就去當職業鼓手。' },
        ]},
        { text: '那你有沒有想過，他可能真的不想走音樂這條路？', affection: 2, response: [
          { kind: 'narration', text: '他沉默了一下。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '有啊。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '可是誰說玩團就一定要走音樂這條路？' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '他喜歡打鼓，我們喜歡一起練團，這樣不就好了？' },
          { kind: 'narration', text: '他說到這裡，語氣稍微放緩了一點。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '又不是現在就要簽什麼合約，還是以後一定要靠這個吃飯。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '幹嘛把事情想得那麼遠啦。' },
        ]},
        { text: '你剛才一直打斷他，他可能根本沒機會把話說完。', affection: 2, response: [
          { kind: 'dialogue', speaker: '溫尚翊', text: '……我知道啦。' },
          { kind: 'narration', text: '他把視線移開，手指在窗沿上輕輕敲了兩下。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '可是他一開口就是要退團，我哪有辦法慢慢聽？' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '我又不是不想讓他講。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '妳現在是在幫他講話喔？' },
          { kind: 'dialogue', speaker: '你', text: '我只是覺得你們兩個都很急嘛。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '……好啦。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '這個我承認。' },
        ]},
      ]},
      { prompt: '走廊裡又安靜了一會兒。溫尚翊把手從窗沿收回來，低頭看了看自己的掌心。', choices: [
        { text: '那你也要記得問問他到底在害怕什麼呀。', affection: 2, response: [
          { kind: 'dialogue', speaker: '溫尚翊', text: '嗯……' },
          { kind: 'narration', text: '他點了一下頭。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '等他願意講再說吧。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '我現在追出去，他大概也不想聽我講話。' },
          { kind: 'narration', text: '他想了一下，又補充道。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '而且我也不想每次都變成在跟他吵架。' },
        ]},
        { text: '你剛才那個樣子，我還以為你要跟他打起來了。', affection: 2, response: [
          { kind: 'dialogue', speaker: '溫尚翊', text: '蛤？！' },
          { kind: 'narration', text: '他一下子轉過頭，表情簡直不可思議。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '妳到底有沒有在看啊？' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '我有要打他喔？' },
          { kind: 'dialogue', speaker: '你', text: '可是你真的很凶嘛！' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '啊我就講話比較大聲啊！' },
          { kind: 'narration', text: '他終於沒忍住笑了一下。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '妳不要亂講，等一下傳出去變成我在練團室打人，靠夭。' },
        ]},
        { text: '你其實很在乎這個團嘛。', affection: 3, response: [
          { kind: 'dialogue', speaker: '溫尚翊', text: '廢話。' },
          { kind: 'narration', text: '他回答得理所當然，連想都沒想。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '不然我每天跑來練團室幹嘛？' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '有時間我不會去打球喔？' },
          { kind: 'dialogue', speaker: '你', text: '所以你真的很喜歡跟大家一起練團？' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '……嗯。' },
          { kind: 'narration', text: '他這次沒有馬上接話，只是看了你一眼。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '不然咧。都玩這麼久了，哪有說不在乎就不在乎的。' },
        ]},
      ]},
    ],
    ending: [
      { kind: 'narration', text: '你們又在走廊站了一會兒。溫尚翊看起來總算沒有剛才那麼煩躁了。' },
      { kind: 'narration', text: '他伸手推開練團室的門，卻沒有馬上進去，而是側過身等你先走。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '欸，等一下。' },
      { kind: 'dialogue', speaker: '你', text: '嗯？' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '妳剛剛是不是有被嚇到？' },
      { kind: 'dialogue', speaker: '你', text: '還好啦，就是你們聲音真的很大。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '……有這麼大聲喔？' },
      { kind: 'dialogue', speaker: '你', text: '不然呢？我在門口都聽得清清楚楚。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '好啦好啦。' },
      { kind: 'narration', text: '他伸手替你把門扶住，等你走進去以後才跟上來。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '等一下妳坐裡面一點啦。' },
      { kind: 'dialogue', speaker: '你', text: '為什麼？' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '不然等一下瑪莎又開始念，妳坐那邊不是很吵？' },
      { kind: 'dialogue', speaker: '你', text: '那你呢？你不怕他念你喔？' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '蛤？我又沒有做錯事。' },
      { kind: 'narration', text: '他走到自己的吉他旁邊，回頭看了你一眼。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '而且他要念就讓他念啊。我又不會怎樣。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '欸，怪獸！你到底還要不要練啊？' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '來了啦！催什麼催！' },
      { kind: 'narration', text: '他轉頭朝裡面喊了一句，又低聲對你說。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '妳看吧，真的很吵。' },
      { kind: 'narration', text: '你終於忍不住笑了出來。他看著你笑，自己也跟著彎了一下嘴角。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '笑屁喔。' },
      { kind: 'narration', text: '不過這次，聽起來已經沒有剛才那麼凶了。' },
    ],
  },
  ashin: {
    name: '陳信宏',
    intro: [
      { kind: 'narration', text: '錢佑達離開以後，練團室裡安靜了好一會兒。溫尚翊還站在音箱旁邊，眉頭皺得很緊。瑪莎靠著鼓組，低頭撥弄著Bass弦，石頭站在旁邊整理剛才散落的譜紙。' },
      { kind: 'narration', text: '阿信沒有馬上回到裡面。他把手裡那幾張譜紙拿著，走到靠牆的椅子旁坐下。你走過去時，他抬起頭，往旁邊挪出一點位置。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '欸，妳還在喔？' },
      { kind: 'dialogue', speaker: '陳信宏', text: '剛剛是不是有嚇到妳？' },
      { kind: 'dialogue', speaker: '你', text: '有一點啦……' },
      { kind: 'dialogue', speaker: '陳信宏', text: '我剛剛講話是不是有點急啊……' },
      { kind: 'dialogue', speaker: '陳信宏', text: '可是聽佑達一直說自己拖累大家，我真的有點聽不下去。' },
    ],
    rounds: [
      { prompt: '阿信把那張寫著曲目的紙放在膝上，指腹慢慢壓平紙角，像是在想剛才那幾句話。', choices: [
        { text: '你已經說得很清楚了啊。', affection: 2, response: [
          { kind: 'dialogue', speaker: '陳信宏', text: '有嗎？我自己都覺得剛剛講得有點亂欸。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '不過妳這樣說，我好像有比較放心一點。' },
        ]},
        { text: '你剛才其實也生氣了吧？', affection: 2, response: [
          { kind: 'dialogue', speaker: '陳信宏', text: '有一點啦。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '不是氣佑達，只是……他好像把我們說的每一句話，都往自己身上攬。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '我不知道要怎麼講，他才會相信我們真的不是那個意思。' },
        ]},
        { text: '我還以為你會先攔著怪獸呢。', affection: 2, response: [
          { kind: 'dialogue', speaker: '陳信宏', text: '妳有看到喔？' },
          { kind: 'dialogue', speaker: '陳信宏', text: '我本來也想攔他的，可是怪獸剛剛那個表情……' },
          { kind: 'dialogue', speaker: '陳信宏', text: '我怕我還沒開口，他就先把旁邊的譜架踢倒了。' },
          { kind: 'narration', text: '他說完自己也覺得有點好笑，嘴角輕輕彎了一下。' },
        ]},
      ]},
      { setup: [
        { kind: 'narration', text: '阿信把桌上的譜紙重新整理好，抽出其中一張看了看。' },
        { kind: 'dialogue', speaker: '陳信宏', text: '其實我剛剛聽到他說，以前根本沒想過要走音樂這條路……' },
        { kind: 'dialogue', speaker: '陳信宏', text: '我才突然想到，搞不好我們最近真的講得太多了。' },
        { kind: 'dialogue', speaker: '陳信宏', text: '一下子說Demo，一下子說唱片公司，好像大家都已經想好以後要做什麼了。' },
        { kind: 'dialogue', speaker: '陳信宏', text: '可是也沒有人規定一定要這樣啊。' },
      ], prompt: '他把譜紙翻到背面，抬眼看了看你。', choices: [
        { text: '他好像把每次重來都當成自己的錯。', affection: 2, response: [
          { kind: 'dialogue', speaker: '陳信宏', text: '嗯，我也有這樣想。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '可是我們每次停下來重來，其實也不是只在等他啊。大家都有要調整的地方。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '可能他自己聽起來，跟我們聽起來真的不太一樣。' },
        ]},
        { text: 'Demo又不是馬上就要出道了。', affection: 2, response: [
          { kind: 'dialogue', speaker: '陳信宏', text: '對啊，本來只是想把歌錄下來，留個紀錄而已。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '結果講著講著，好像變成一件很嚴肅的事情了。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '我們自己都還不知道以後會怎樣呢。' },
        ]},
        { text: '你們是不是還沒認真問過他想不想繼續？', affection: 2, response: [
          { kind: 'dialogue', speaker: '陳信宏', text: '好像真的沒有欸……' },
          { kind: 'narration', text: '他停了一下，輕輕嘆了口氣。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '我們一直跟他說可以一起練、可以一起進步，可是他想不想繼續，可能才是最重要的吧。' },
        ]},
      ]},
      { setup: [
        { kind: 'narration', text: '阿信把譜紙放回桌上，發現還有一疊散在你旁邊。' },
        { kind: 'dialogue', speaker: '陳信宏', text: '欸，妳可以幫我拿一下那幾張嗎？' },
        { kind: 'dialogue', speaker: '陳信宏', text: '我把這邊收好，不然等一下又不知道跑去哪裡了。' },
        { kind: 'narration', text: '你伸手接過譜紙，他也剛好伸手拿住另一邊，兩個人的指尖不小心碰在一起。' },
        { kind: 'dialogue', speaker: '陳信宏', text: '啊，抱歉。' },
        { kind: 'narration', text: '他很快鬆開手，低頭把剩下的譜紙疊好。' },
        { kind: 'dialogue', speaker: '陳信宏', text: '這個看起來薄薄的，怎麼每次整理都一大堆啊。' },
        { kind: 'dialogue', speaker: '陳信宏', text: '妳拿得住嗎？' },
      ], prompt: '他看了看你手裡那疊譜紙，伸手想幫你扶一下。', choices: [
        { text: '你是不是把整個月的譜都塞給我了？', affection: 2, response: [
          { kind: 'dialogue', speaker: '陳信宏', text: '哪有啦，我只是把剛剛散掉的收起來而已。' },
          { kind: 'narration', text: '他看了一眼你手裡厚厚的一疊，自己也笑了。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '好啦，好像真的有一點多。我幫妳拿一半好了。' },
        ]},
        { text: '我拿得住啦，不要小看我。', affection: 2, response: [
          { kind: 'dialogue', speaker: '陳信宏', text: '好喔，那我就放心交給妳了。' },
          { kind: 'narration', text: '他把最後幾張遞過來，看到你穩穩接住，嘴角彎了一下。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '欸，真的拿得很穩耶。' },
        ]},
        { text: '你剛剛碰到我的手了。', affection: 3, response: [
          { kind: 'dialogue', speaker: '陳信宏', text: '欸……' },
          { kind: 'narration', text: '他低頭看了看剛才碰到你的手，耳朵慢慢有點紅。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '剛剛那張一直滑下來嘛，我只是想幫妳拿好啦。' },
          { kind: 'narration', text: '他輕輕笑了一聲。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '妳怎麼連這個都注意到啊。' },
        ]},
      ]},
      { setup: [
        { kind: 'narration', text: '兩個人把譜紙放回架上。阿信沒有馬上走回其他人身邊，而是看了一眼練團室裡安靜下來的幾個人。' },
        { kind: 'narration', text: '門外有風吹進來，桌上的紙張被掀起一個小角。' },
        { kind: 'dialogue', speaker: '陳信宏', text: '這裡好像有點悶。' },
        { kind: 'dialogue', speaker: '陳信宏', text: '要不要出去站一下？不用走遠，就門口。' },
      ], prompt: '他拿起放在一旁的外套，回頭看你，像是在等你的回答。', choices: [
        { text: '好啊，裡面真的有點悶。', affection: 2, response: [
          { kind: 'narration', text: '他替你推開門，等你先走出去，才跟在旁邊。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '嗯，出來透透氣也好。' },
        ]},
        { text: '你不回去陪他們嗎？', affection: 2, response: [
          { kind: 'dialogue', speaker: '陳信宏', text: '他們應該也想自己靜一下吧。' },
          { kind: 'narration', text: '他看了你一眼，聲音放輕了一點。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '而且我也沒有要走很遠啦，等一下就回去。只是想跟妳說幾句話。' },
        ]},
        { text: '你是不是想找藉口跟我單獨待著？', affection: 3, response: [
          { kind: 'dialogue', speaker: '陳信宏', text: '欸……妳怎麼突然這樣講啦？' },
          { kind: 'narration', text: '他笑著移開視線，手指輕輕捏了捏外套袖口。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '好啦，也不是不行啊。' },
        ]},
      ]},
      { setup: [
        { kind: 'narration', text: '走廊比練團室安靜許多。偶爾有人從樓梯間經過，腳步聲很快又遠了。阿信靠著牆，手裡還拿著剛才整理好的幾張譜紙。' },
        { kind: 'dialogue', speaker: '陳信宏', text: '其實我剛剛說那句，大家一起把歌練好……' },
        { kind: 'dialogue', speaker: '陳信宏', text: '不是覺得只要這樣講，事情就會變簡單啦。' },
        { kind: 'dialogue', speaker: '陳信宏', text: '只是我不想讓佑達覺得，自己好像不應該待在這裡。' },
      ], prompt: '他說得很輕，低頭看了看手裡的紙，過了一會兒才重新看向你。', choices: [
        { text: '等他願意回來，再慢慢說吧。', affection: 2, response: [
          { kind: 'dialogue', speaker: '陳信宏', text: '嗯，我也是這樣想。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '先讓他喘口氣好了。等他願意講的時候，我們再找他。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '我想他應該也不是真的不想跟大家玩了。' },
        ]},
        { text: '你也不用什麼事情都替大家想。', affection: 2, response: [
          { kind: 'dialogue', speaker: '陳信宏', text: '我沒有啦……' },
          { kind: 'narration', text: '他有點不好意思地笑了笑。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '只是有時候大家都不講，事情就會一直卡在那裡啊。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '不過妳是不是覺得我很愛想東想西？' },
        ]},
        { text: '那你剛剛有顧到我嗎？', affection: 3, response: [
          { kind: 'dialogue', speaker: '陳信宏', text: '有啊。' },
          { kind: 'narration', text: '他回答得很快，說完才像是意識到什麼，稍稍停了一下。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '我剛剛還怕妳站在那邊會不會覺得很尷尬。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '可是後來看到妳一直都在，我就比較放心了。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '妳在旁邊，我會比較想把話講清楚一點。' },
        ]},
      ]},
    ],
    ending: [
      { kind: 'narration', text: '走廊的風把阿信手裡的譜紙吹起一角。他低頭把紙角壓平，過了一會兒才重新看向你。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '今天好像也沒辦法繼續練了。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '等大家心情好一點，再說吧。' },
      { kind: 'narration', text: '他把譜紙夾在手臂間，忽然像是想起什麼，又叫住你。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '欸，對了。' },
      { kind: 'dialogue', speaker: '你', text: '嗯？' },
      { kind: 'dialogue', speaker: '陳信宏', text: '妳剛剛是不是一直站在門口？' },
      { kind: 'dialogue', speaker: '你', text: '對啊，怎麼了？' },
      { kind: 'dialogue', speaker: '陳信宏', text: '沒什麼啦。' },
      { kind: 'narration', text: '他笑了一下，伸手替你把被風吹到臉頰旁邊的一縷頭髮輕輕撥開，碰到髮梢便收回了手。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '就是覺得妳今天也陪我們聽了好久。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '謝謝妳喔。' },
      { kind: 'narration', text: '他像是覺得最後那句話有點太認真，低頭笑了笑。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '走啦，我們回去看看他們。' },
      { kind: 'narration', text: '他走在你旁邊，經過門口時特意放慢了一點腳步。' },
    ],
  },
  masa: {
    name: '瑪莎',
    intro: [
      { kind: 'narration', text: '錢佑達離開後，練團室裡的氣氛變得有些奇怪。瑪莎還站在鼓組旁邊，手裡拿著一瓶水，瓶蓋轉了半天也沒喝一口。你走近時，他瞥了你一眼。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '幹嘛？站這麼久，腳不酸喔？' },
      { kind: 'dialogue', speaker: '瑪莎', text: '剛剛是不是被嚇到了？' },
      { kind: 'dialogue', speaker: '你', text: '有一點啦……' },
      { kind: 'dialogue', speaker: '瑪莎', text: '嘖，早知道剛剛叫妳先出去。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '不過也沒什麼好看的，一群人吵架而已。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '尤其某個人，嗓門大得跟不用錢一樣。' },
    ],
    rounds: [
      { setup: [
        { kind: 'narration', text: '瑪莎把水瓶放到音箱上，雙手抱在胸前。' },
        { kind: 'dialogue', speaker: '瑪莎', text: '不過認真講，妳剛剛應該都有聽到吧？' },
        { kind: 'dialogue', speaker: '瑪莎', text: '我都拿自己彈錯的事情跟他講了，他還是一直覺得自己不行。' },
        { kind: 'dialogue', speaker: '瑪莎', text: '是有沒有這麼固執啊……' },
      ], prompt: '他皺著眉，視線又落到空著的鼓椅上。', choices: [
        { text: '你剛才其實也很生氣吧？', affection: 2, response: [
          { kind: 'dialogue', speaker: '瑪莎', text: '廢話，當然會生氣啊。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '我們又不是今天才認識，突然跑來說要退團，誰聽了會爽？' },
          { kind: 'narration', text: '他把導線往旁邊一放，輕輕嘖了一聲。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '而且我最討厭他那種，好像什麼事情都自己決定好了才來通知我們的樣子。' },
        ]},
        { text: '你拿自己舉例，他好像還是沒聽進去。', affection: 2, response: [
          { kind: 'dialogue', speaker: '瑪莎', text: '對啊！所以我才覺得很煩。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '我都跟他講了，我彈錯你們還不是照樣陪我重來。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '他到底是沒聽懂，還是根本不想聽啊？' },
          { kind: 'narration', text: '他嘴上嫌著，手卻把那瓶水往你這邊推了一點。' },
        ]},
        { text: '你是不是怕他真的不回來了？', affection: 3, response: [
          { kind: 'dialogue', speaker: '瑪莎', text: '……廢話。' },
          { kind: 'narration', text: '他回答得很快，隨後又像覺得自己說得太直接，低頭看了一眼Bass。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '不然咧？少一個鼓手，我們是要自己長出第三隻手喔？' },
          { kind: 'dialogue', speaker: '瑪莎', text: '而且都一起玩多久了。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '這種事情誰會真的無所謂啊。' },
        ]},
      ]},
      { setup: [
        { kind: 'narration', text: '瑪莎把導線收好，坐到旁邊的椅子上，順手拿起桌上的撥片，在指間轉了兩圈。' },
        { kind: 'dialogue', speaker: '瑪莎', text: '欸，妳有沒有覺得最近大家很奇怪？' },
        { kind: 'dialogue', speaker: '瑪莎', text: '一下子說要錄Demo，一下子又在講唱片公司。' },
        { kind: 'dialogue', speaker: '瑪莎', text: '搞得好像明天就要出道一樣。' },
        { kind: 'dialogue', speaker: '瑪莎', text: '雖然我也不是不想啦。' },
      ], prompt: '他把撥片在指間轉了一圈，抬頭看你。', choices: [
        { text: '你其實很期待錄Demo吧？', affection: 2, response: [
          { kind: 'dialogue', speaker: '瑪莎', text: '當然啊，不然錄來幹嘛？' },
          { kind: 'dialogue', speaker: '瑪莎', text: '總不能每次練完就回家睡覺，連自己彈成什麼樣都不知道吧。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '不過真的要寄出去，還是有點緊張啦。' },
        ]},
        { text: '你自己不也很認真在準備嗎？', affection: 2, response: [
          { kind: 'dialogue', speaker: '瑪莎', text: '我哪有？' },
          { kind: 'narration', text: '他馬上抬頭反駁。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '我只是覺得Bass的部分不能太隨便好不好。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '欸，妳不要用那種表情看我。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '認真一點也有錯喔？' },
        ]},
        { text: '你有沒有想過以後真的靠音樂生活？', affection: 2, response: [
          { kind: 'dialogue', speaker: '瑪莎', text: '蛤？妳想得也太遠了吧。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '我連高三都還沒搞定，妳就在幫我安排職涯了喔？' },
          { kind: 'narration', text: '他忍不住笑了一下。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '先讓我把聯考考完再說啦，拜託。' },
        ]},
      ]},
      { setup: [
        { kind: 'narration', text: '瑪莎站起來，準備把剩下的導線收好。' },
        { kind: 'dialogue', speaker: '瑪莎', text: '欸，妳不要亂拉。' },
        { kind: 'dialogue', speaker: '瑪莎', text: '這個要先從接頭那邊拆，不然等一下纏成一團，我還要重新弄。' },
        { kind: 'dialogue', speaker: '你', text: '我又不是笨蛋！' },
        { kind: 'dialogue', speaker: '瑪莎', text: '喔？那妳上次把耳機線打成死結是誰？' },
        { kind: 'dialogue', speaker: '你', text: '……那是意外！' },
        { kind: 'dialogue', speaker: '瑪莎', text: '每次都意外，妳的人生意外還真多。' },
        { kind: 'narration', text: '他笑著把導線遞給你，讓你幫忙扶住另一端。你低頭照著他說的方式收線，沒注意到線繞過了自己的手腕。' },
        { kind: 'dialogue', speaker: '瑪莎', text: '等一下，妳手。' },
        { kind: 'narration', text: '他走近一步，伸手托住你的手腕，另一隻手把纏住的線慢慢繞開。' },
        { kind: 'dialogue', speaker: '瑪莎', text: '妳到底是來幫忙，還是來增加我的工作量啊？' },
      ], prompt: '他低頭把最後一圈線解開，手還扶著你的手腕。', choices: [
        { text: '我明明很認真，是你要求太多！', affection: 2, response: [
          { kind: 'dialogue', speaker: '瑪莎', text: '好啦好啦，妳最認真。' },
          { kind: 'narration', text: '他鬆開你的手腕，把整理好的線遞給你。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '那這條交給妳，拜託不要再跟它打架了。' },
        ]},
        { text: '你靠這麼近，我怎麼知道要怎麼弄啦。', affection: 3, response: [
          { kind: 'dialogue', speaker: '瑪莎', text: '蛤？' },
          { kind: 'narration', text: '他低頭看了看兩個人之間的距離，手上的動作頓了一下。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '……是妳自己站過來的欸。' },
          { kind: 'narration', text: '嘴上這麼說，他還是往旁邊退了半步。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '好啦，這樣可以了吧？大小姐。' },
        ]},
        { text: '那你教我啊，不要一直嫌棄我。', affection: 2, response: [
          { kind: 'dialogue', speaker: '瑪莎', text: '我剛剛不是在教了嗎？' },
          { kind: 'narration', text: '他重新拿起導線，放慢動作給你看。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '妳看，這樣繞。' },
          { kind: 'narration', text: '他握著你的手稍微調整了一下方向。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '對啦，就是這樣。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '妳看，明明就會。' },
        ]},
      ]},
      { setup: [
        { kind: 'narration', text: '導線終於整理好了。瑪莎把它放到架子旁邊，自己坐在音箱邊緣，低頭擺弄著手裡的撥片。' },
        { kind: 'dialogue', speaker: '瑪莎', text: '說真的，我現在有點不知道要怎麼辦。' },
        { kind: 'dialogue', speaker: '瑪莎', text: '叫他回來，他又不一定肯。' },
        { kind: 'dialogue', speaker: '瑪莎', text: '可是就這樣讓他走，我又覺得很莫名其妙。' },
        { kind: 'dialogue', speaker: '瑪莎', text: '妳說，這種事情到底要怎麼處理啊？' },
      ], prompt: '他把撥片放在膝上，抬眼看著你。', choices: [
        { text: '等他冷靜下來再找他談吧。', affection: 2, response: [
          { kind: 'dialogue', speaker: '瑪莎', text: '嗯，現在追出去大概也只是繼續吵。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '等他自己想清楚再說吧。' },
          { kind: 'narration', text: '他把撥片重新夾回指間。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '不過最好不要讓我等太久，聯考已經夠煩了。' },
        ]},
        { text: '你們也可以試著聽聽他真正想要什麼。', affection: 2, response: [
          { kind: 'dialogue', speaker: '瑪莎', text: '這個我知道啦。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '可是妳也看到他剛剛那個樣子了，根本不給人插話。' },
          { kind: 'narration', text: '他抬頭看了你一眼。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '下次如果有機會，我會問清楚一點。' },
        ]},
        { text: '你是不是也有點難過？', affection: 3, response: [
          { kind: 'dialogue', speaker: '瑪莎', text: '……妳今天怎麼突然變得這麼會講話？' },
          { kind: 'narration', text: '他原本想吐槽你，最後卻只是笑了一下。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '有一點吧。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '一起練這麼久了，突然少一個人，當然會覺得怪啊。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '而且佑達平常其實滿好笑的，少了他，練團室可能會安靜很多。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '雖然有時候也會被他吵到啦。' },
        ]},
      ]},
      { setup: [
        { kind: 'narration', text: '瑪莎把撥片在指尖轉了一圈，忽然抬頭看你。' },
        { kind: 'dialogue', speaker: '瑪莎', text: '欸，妳今天怎麼一直待在這裡？' },
        { kind: 'dialogue', speaker: '瑪莎', text: '平常不是很會到處跑嗎？' },
        { kind: 'dialogue', speaker: '瑪莎', text: '今天這麼閒喔？' },
      ], prompt: '他看著你，嘴角帶著一點笑意。', choices: [
        { text: '我是怕你一個人生悶氣。', affection: 2, response: [
          { kind: 'dialogue', speaker: '瑪莎', text: '我哪有生悶氣？' },
          { kind: 'narration', text: '他馬上反駁，隨後又忍不住笑了。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '妳是把我當小朋友喔？還要人陪？' },
          { kind: 'narration', text: '他把旁邊的椅子往你這邊推了一點。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '不過妳要是真的想坐，就坐啊。' },
        ]},
        { text: '怎麼，不歡迎我啊？', affection: 2, response: [
          { kind: 'dialogue', speaker: '瑪莎', text: '歡迎啊，怎麼不歡迎？' },
          { kind: 'dialogue', speaker: '瑪莎', text: '只是怕妳待太久，等一下又開始嫌無聊。' },
          { kind: 'narration', text: '他拍了拍旁邊空出來的位置。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '來啦，坐這邊。不要一直站著擋路。' },
        ]},
        { text: '因為想陪你一下嘛。', affection: 3, response: [
          { kind: 'dialogue', speaker: '瑪莎', text: '……蛤？' },
          { kind: 'narration', text: '他明顯愣了一下，隨後低頭笑了出來。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '妳今天是怎樣啦，突然講這種話。' },
          { kind: 'narration', text: '他用撥片輕輕碰了一下你的手背。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '好啦，那就陪我一下。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '反正我現在也不想回去聽怪獸碎碎念。' },
        ]},
      ]},
    ],
    ending: [
      { kind: 'narration', text: '你在旁邊坐下來。瑪莎把Bass從架子上取下來，檢查了一下琴弦，又重新放回去。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '欸，對了。' },
      { kind: 'dialogue', speaker: '你', text: '又怎麼了？' },
      { kind: 'dialogue', speaker: '瑪莎', text: '妳剛剛是不是有偷看我？' },
      { kind: 'dialogue', speaker: '你', text: '？？？我哪有！' },
      { kind: 'dialogue', speaker: '瑪莎', text: '沒有喔？那妳幹嘛這麼緊張？' },
      { kind: 'dialogue', speaker: '你', text: '蔡昇晏！' },
      { kind: 'dialogue', speaker: '瑪莎', text: '好啦好啦，不鬧妳了。' },
      { kind: 'narration', text: '他笑著坐回去，手指撥了一下Bass弦，發出很輕的一聲低音。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '不過……今天謝啦。' },
      { kind: 'dialogue', speaker: '你', text: '謝什麼？' },
      { kind: 'dialogue', speaker: '瑪莎', text: '沒什麼。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '就覺得有人陪著講幾句廢話，好像也不錯。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '好了，妳可以回去找妳的怪獸了。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '不要在這裡妨礙我練琴，謝謝。' },
      { kind: 'narration', text: '他嘴上趕你，手卻還搭在旁邊的椅背上，沒有馬上起身。' },
    ],
  },
  stone: {
    name: '石錦航',
    intro: [
      { kind: 'narration', text: '錢佑達離開後，石頭一直沒有說話。他彎腰把剛才掉在地上的鼓棒撿起來，輕輕拍掉上面的灰，放回鼓組旁邊。' },
      { kind: 'narration', text: '溫尚翊還在一旁煩躁地走來走去，瑪莎低頭整理著Bass的導線，阿信則把散落的譜紙重新收好。石頭看了一眼空下來的鼓椅，伸手把它扶正。' },
      { kind: 'dialogue', speaker: '石錦航', text: '妳還好嗎？' },
      { kind: 'dialogue', speaker: '石錦航', text: '剛剛是不是有嚇到？' },
      { kind: 'dialogue', speaker: '你', text: '還好啦，就是有點突然……' },
      { kind: 'dialogue', speaker: '石錦航', text: '嗯，我也沒想到他今天會突然講這些。' },
      { kind: 'dialogue', speaker: '石錦航', text: '不過，他應該真的想很久了。' },
    ],
    rounds: [
      { setup: [
        { kind: 'narration', text: '石頭把鼓棒放回鼓組旁邊，又看了一眼空著的鼓椅。' },
        { kind: 'dialogue', speaker: '石錦航', text: '妳剛剛有聽到他說的那些話吧？' },
        { kind: 'dialogue', speaker: '石錦航', text: '我覺得他好像一直很在意自己有沒有跟上大家。' },
        { kind: 'dialogue', speaker: '石錦航', text: '可是有些事情，不是他一個人覺得不夠好，就代表大家也這樣想啊。' },
      ], prompt: '他把手掌輕輕放在膝上，安靜地看著你。', choices: [
        { text: '你剛才一直沒怎麼說話，是不是也很擔心他？', affection: 2, response: [
          { kind: 'dialogue', speaker: '石錦航', text: '有一點吧。' },
          { kind: 'narration', text: '他把手掌放在膝上，想了一會兒才繼續。' },
          { kind: 'dialogue', speaker: '石錦航', text: '只是剛剛大家都在講，我也不知道要從哪裡說起。' },
          { kind: 'dialogue', speaker: '石錦航', text: '而且我覺得，他可能不是聽不懂我們的意思，只是他自己還過不去。' },
        ]},
        { text: '我看見你把他的鼓棒收起來了。', affection: 2, response: [
          { kind: 'dialogue', speaker: '石錦航', text: '嗯，怕他剛剛走得太急，等一下回來又找不到。' },
          { kind: 'narration', text: '他笑了一下，手指輕輕碰了碰鼓棒末端。' },
          { kind: 'dialogue', speaker: '石錦航', text: '之前他也常常把鼓棒隨手放在這裡，過一會兒又問大家有沒有看到。' },
        ]},
        { text: '怪獸剛剛真的氣得不輕欸。', affection: 2, response: [
          { kind: 'dialogue', speaker: '石錦航', text: '怪獸是真的很生氣。' },
          { kind: 'dialogue', speaker: '石錦航', text: '不過他不是討厭佑達啦，妳應該也看得出來。' },
          { kind: 'narration', text: '他看了一眼練團室裡面，語氣放得更輕了一點。' },
          { kind: 'dialogue', speaker: '石錦航', text: '就是太在乎了，才會講話那麼急。' },
        ]},
      ]},
      { setup: [
        { kind: 'narration', text: '石頭把旁邊的椅子往外挪了一點，示意你坐下。' },
        { kind: 'dialogue', speaker: '石錦航', text: '其實我覺得，佑達剛剛說的那個標準……' },
        { kind: 'dialogue', speaker: '石錦航', text: '一個團要看最差的那個人能到什麼程度。' },
        { kind: 'dialogue', speaker: '石錦航', text: '聽起來好像很有道理，可是我不太喜歡這樣想。' },
        { kind: 'dialogue', speaker: '石錦航', text: '如果每次練團，都要一直擔心自己是不是最差的那個，那不是會很累嗎？' },
      ], prompt: '他坐在你旁邊，轉過頭來問你。', choices: [
        { text: '那你覺得一個團真正重要的是什麼？', affection: 2, response: [
          { kind: 'dialogue', speaker: '石錦航', text: '我想，應該是大家願不願意一起把一首歌完成吧。' },
          { kind: 'dialogue', speaker: '石錦航', text: '有人今天狀態不好，有人明天彈錯，這些都很正常啊。' },
          { kind: 'dialogue', speaker: '石錦航', text: '如果每個人都只顧著證明自己很厲害，那還要一起練團做什麼？' },
          { kind: 'narration', text: '他說完，輕輕笑了一下。' },
          { kind: 'dialogue', speaker: '石錦航', text: '我是不是講得有點像老師啊？' },
        ]},
        { text: '可是他好像真的覺得自己跟不上。', affection: 2, response: [
          { kind: 'dialogue', speaker: '石錦航', text: '嗯，我知道。' },
          { kind: 'dialogue', speaker: '石錦航', text: '可是妳有沒有發現，他一直在說自己不夠好，卻很少說自己其實還想不想跟我們一起練？' },
          { kind: 'narration', text: '他停了一下，視線落回空著的鼓椅。' },
          { kind: 'dialogue', speaker: '石錦航', text: '我有點在意這個。' },
        ]},
        { text: '你自己會不會也有這種壓力？', affection: 2, response: [
          { kind: 'dialogue', speaker: '石錦航', text: '會啊。' },
          { kind: 'dialogue', speaker: '石錦航', text: '我也有彈不好的時候，尤其有時候大家已經練得很順了，我還在想剛剛那個地方怎麼接。' },
          { kind: 'narration', text: '他有些不好意思地摸了摸鼻子。' },
          { kind: 'dialogue', speaker: '石錦航', text: '不過後來就覺得，反正多練幾次就好了。' },
          { kind: 'dialogue', speaker: '石錦航', text: '總不能每次彈錯，都要懷疑自己是不是不適合玩團吧。' },
        ]},
      ]},
      { setup: [
        { kind: 'narration', text: '你坐了一會兒，發現桌邊還有幾張譜紙沒有整理好，便伸手幫忙。' },
        { kind: 'dialogue', speaker: '石錦航', text: '這幾張應該是剛剛練歌的時候用的。' },
        { kind: 'dialogue', speaker: '石錦航', text: '妳幫我拿一下，我把下面那幾張疊好。' },
        { kind: 'narration', text: '你把譜紙遞過去，其中一張卻因為沒有夾穩，輕輕滑了下來。石頭伸手接住，另一隻手也剛好扶住你的手背。' },
        { kind: 'dialogue', speaker: '石錦航', text: '小心。' },
        { kind: 'narration', text: '他低頭看了一眼，發現你的手指沾上了一點鉛筆灰。' },
        { kind: 'dialogue', speaker: '石錦航', text: '欸，妳手弄髒了。' },
        { kind: 'narration', text: '他從桌邊拿了一張乾淨的紙巾遞給你。' },
      ], prompt: '石頭看了看你的指尖，等著你接過紙巾。', choices: [
        { text: '沒關係啦，擦一下就好了。', affection: 2, response: [
          { kind: 'dialogue', speaker: '石錦航', text: '好，那妳擦一下。' },
          { kind: 'narration', text: '他把紙巾遞到你手裡，又順手把滑下來的譜紙夾好。' },
          { kind: 'dialogue', speaker: '石錦航', text: '這幾張很容易散掉，我剛剛就差點弄丟了。' },
        ]},
        { text: '你怎麼連這個都注意到了？', affection: 2, response: [
          { kind: 'dialogue', speaker: '石錦航', text: '因為就在眼前啊。' },
          { kind: 'narration', text: '他笑了笑，目光落在你的指尖。' },
          { kind: 'dialogue', speaker: '石錦航', text: '而且妳剛剛一直拿著譜紙，我怕等一下弄到衣服上。' },
          { kind: 'dialogue', speaker: '石錦航', text: '白白的衣服沾到鉛筆灰，很難洗欸。' },
        ]},
        { text: '那你幫我擦嘛。', affection: 3, response: [
          { kind: 'dialogue', speaker: '石錦航', text: '蛤？真的要我幫妳喔？' },
          { kind: 'narration', text: '他愣了一下，隨後笑著接過你的手，用紙巾輕輕擦掉指尖的灰。' },
          { kind: 'dialogue', speaker: '石錦航', text: '這樣可以了吧？' },
          { kind: 'narration', text: '擦完以後，他沒有馬上鬆開，只是低頭確認了一下。' },
          { kind: 'dialogue', speaker: '石錦航', text: '嗯，乾淨了。' },
        ]},
      ]},
      { setup: [
        { kind: 'narration', text: '譜紙終於整理好了。石頭把它們放回架子上，又看了一眼練團室的門。' },
        { kind: 'dialogue', speaker: '石錦航', text: '我在想，晚一點要不要去找他。' },
        { kind: 'dialogue', speaker: '石錦航', text: '現在追出去，他應該也不想聽我們講話。' },
        { kind: 'dialogue', speaker: '石錦航', text: '可是就這樣放著，好像也不太好。' },
      ], prompt: '他轉過來看你，像是在認真聽你的想法。', choices: [
        { text: '等他自己冷靜下來吧。', affection: 2, response: [
          { kind: 'dialogue', speaker: '石錦航', text: '嗯，我也是這樣想。' },
          { kind: 'dialogue', speaker: '石錦航', text: '先讓他自己待一下吧。' },
          { kind: 'dialogue', speaker: '石錦航', text: '有時候一直追著問，反而會讓人更想躲起來。' },
        ]},
        { text: '你可以先傳個訊息給他。', affection: 2, response: [
          { kind: 'dialogue', speaker: '石錦航', text: '這個好像可以。' },
          { kind: 'dialogue', speaker: '石錦航', text: '不用講太多，問他有沒有平安到家就好了。' },
          { kind: 'narration', text: '他想了一下，又補了一句。' },
          { kind: 'dialogue', speaker: '石錦航', text: '至少讓他知道，我們沒有因為剛剛吵架，就不理他了。' },
        ]},
        { text: '你是不是很捨不得他離開？', affection: 3, response: [
          { kind: 'dialogue', speaker: '石錦航', text: '當然啊。' },
          { kind: 'dialogue', speaker: '石錦航', text: '一起練了這麼久，怎麼可能說不在意就不在意。' },
          { kind: 'narration', text: '他笑了一下。' },
          { kind: 'dialogue', speaker: '石錦航', text: '而且佑達平常其實滿好笑的，少了他，練團室可能會安靜很多。' },
          { kind: 'dialogue', speaker: '石錦航', text: '雖然有時候也會被他吵到啦。' },
        ]},
      ]},
      { setup: [
        { kind: 'narration', text: '練團室裡的聲音漸漸小了下來。石頭把最後幾張譜紙收好，發現你還坐在旁邊，便走過來停在你身邊。' },
        { kind: 'dialogue', speaker: '石錦航', text: '欸，妳今天是不是站了很久？' },
        { kind: 'dialogue', speaker: '石錦航', text: '剛剛我好像一直看到妳在門口。' },
        { kind: 'dialogue', speaker: '石錦航', text: '怎麼沒有找個地方坐？' },
      ], prompt: '他把旁邊的椅子稍微拉開，讓你坐得舒服一點。', choices: [
        { text: '因為你們在吵架，我不好意思進去嘛。', affection: 2, response: [
          { kind: 'dialogue', speaker: '石錦航', text: '原來是這樣喔。' },
          { kind: 'narration', text: '他把旁邊的椅子往你這邊挪了挪。' },
          { kind: 'dialogue', speaker: '石錦航', text: '下次不用一直站在那裡啦。' },
          { kind: 'dialogue', speaker: '石錦航', text: '妳可以直接進來坐，沒有人會介意的。' },
        ]},
        { text: '我在等你們什麼時候吵完啊。', affection: 2, response: [
          { kind: 'dialogue', speaker: '石錦航', text: '那妳應該等了滿久的。' },
          { kind: 'narration', text: '他有點不好意思地笑了。' },
          { kind: 'dialogue', speaker: '石錦航', text: '抱歉喔，今天好像讓妳看了不少熱鬧。' },
          { kind: 'dialogue', speaker: '石錦航', text: '下次應該不會這樣了……希望啦。' },
        ]},
        { text: '其實我今天就是想多待一會兒。', affection: 3, response: [
          { kind: 'dialogue', speaker: '石錦航', text: '是喔？' },
          { kind: 'narration', text: '他看著你，安靜了一小會兒。' },
          { kind: 'dialogue', speaker: '石錦航', text: '那今天就多待一下啊。' },
          { kind: 'narration', text: '他像是怕自己顯得太刻意，又補了一句。' },
          { kind: 'dialogue', speaker: '石錦航', text: '反正我也還沒整理完東西。妳可以陪我慢慢弄。' },
        ]},
      ]},
    ],
    ending: [
      { kind: 'narration', text: '石頭把鼓組旁邊的椅子重新擺好，又把錢佑達的鼓棒放回原來的位置，沒有收進櫃子裡。' },
      { kind: 'dialogue', speaker: '你', text: '你還留著他的鼓棒喔？' },
      { kind: 'dialogue', speaker: '石錦航', text: '嗯，先放著吧。' },
      { kind: 'dialogue', speaker: '石錦航', text: '他如果明天來，還是可以直接拿。' },
      { kind: 'dialogue', speaker: '你', text: '沒有啦，只是覺得你真的很細心。' },
      { kind: 'dialogue', speaker: '石錦航', text: '有嗎？' },
      { kind: 'narration', text: '他笑了一下，伸手把你剛才放在椅子上的外套拿起來，遞給你。' },
      { kind: 'dialogue', speaker: '石錦航', text: '妳自己的東西都差點忘了，還說我細心。' },
      { kind: 'dialogue', speaker: '你', text: '哎呀，我剛剛不是在幫忙嘛！' },
      { kind: 'dialogue', speaker: '石錦航', text: '好啦，知道妳有幫忙。' },
      { kind: 'dialogue', speaker: '石錦航', text: '妳等一下要回去了嗎？' },
      { kind: 'dialogue', speaker: '你', text: '怎麼啦？' },
      { kind: 'dialogue', speaker: '石錦航', text: '沒有啊。' },
      { kind: 'dialogue', speaker: '石錦航', text: '如果不急的話，我陪妳走一段好了。' },
      { kind: 'dialogue', speaker: '石錦航', text: '今天外面風好像滿舒服的。' },
      { kind: 'narration', text: '他拿起自己的外套，等你一起往門口走。走到門邊時，他稍稍放慢了腳步。' },
      { kind: 'dialogue', speaker: '石錦航', text: '欸，今天謝謝妳喔。' },
      { kind: 'dialogue', speaker: '你', text: '我又沒做什麼。' },
      { kind: 'dialogue', speaker: '石錦航', text: '有啊。妳有在這裡陪我們。' },
      { kind: 'dialogue', speaker: '石錦航', text: '而且剛剛幫忙整理譜紙，也算有做事啦。' },
      { kind: 'narration', text: '他替你推開門，等你先走出去，自己才跟上來。走廊裡的風迎面吹來，他稍稍側過身，替你擋了一下。' },
    ],
  },
  yanming: {
    name: '劉諺明',
    intro: [
      { kind: 'narration', text: '錢佑達離開後，練團室裡還是有些亂。你看了一眼裡面的情況，沒有貿然過去，轉身走到外面的櫃檯。' },
      { kind: 'narration', text: '諺明正坐在櫃檯後面，戴著眼鏡，低頭核對今天的場地租借紀錄。旁邊放著一疊收據，他手裡還拿著計算器。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '欸？怎麼出來了？' },
      { kind: 'dialogue', speaker: '劉諺明', text: '裡面還在吵喔？' },
      { kind: 'dialogue', speaker: '你', text: '沒有啦，剛剛吵完。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '嗯，剛剛聲音是不小。' },
      { kind: 'narration', text: '他把手裡的筆放下，伸手拿過旁邊的玻璃杯，往你這邊推了推。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '先喝點水吧，站那麼久。' },
    ],
    rounds: [
      { setup: [
        { kind: 'dialogue', speaker: '劉諺明', text: '我剛剛有聽到一點。' },
        { kind: 'dialogue', speaker: '劉諺明', text: '佑達說想退團，是吧？' },
        { kind: 'narration', text: '他沒有繼續追問，只是把收據疊整齊。' },
        { kind: 'dialogue', speaker: '劉諺明', text: '這幾個年輕人啊，平常練團吵吵鬧鬧的，真的碰到事情，反而都不知道怎麼講了。' },
      ], prompt: '他把收據放到桌邊，抬頭看了你一眼。', choices: [
        { text: '怪獸剛剛真的氣壞了。', affection: 1, response: [
          { kind: 'dialogue', speaker: '劉諺明', text: '看得出來。' },
          { kind: 'narration', text: '他笑著搖了搖頭。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '怪獸那個脾氣，平常就藏不住事情。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '不過他會那麼生氣，應該也是因為真的很在乎吧。' },
        ]},
        { text: '佑達好像是真的覺得自己不夠好。', affection: 2, response: [
          { kind: 'dialogue', speaker: '劉諺明', text: '嗯，這種事情旁邊的人講再多，也不一定聽得進去。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '有時候自己覺得不夠好，別人怎麼說都沒用。' },
          { kind: 'narration', text: '他把計算器放到一邊。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '可能要讓他自己慢慢想通才行。' },
        ]},
        { text: '諺明哥，你覺得他們還能和好嗎？', affection: 2, response: [
          { kind: 'dialogue', speaker: '劉諺明', text: '會不會和好，我倒是不敢說。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '不過他們幾個認識這麼久，不至於因為今天吵一架就什麼都不剩。' },
          { kind: 'narration', text: '他看了你一眼。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '先別替他們擔心了，妳看起來比他們還緊張。' },
        ]},
      ]},
      { setup: [
        { kind: 'narration', text: '諺明把桌上的收據收進文件夾，順手調整了一下眼鏡。' },
        { kind: 'dialogue', speaker: '劉諺明', text: '其實玩團就是這樣啦。' },
        { kind: 'dialogue', speaker: '劉諺明', text: '一開始大家只是覺得好玩，後來慢慢有了自己的想法，就會開始碰到一些問題。' },
        { kind: 'dialogue', speaker: '劉諺明', text: '我以前也玩過團，多少知道那種感覺。' },
      ], prompt: '他把文件夾放到一旁，等你接話。', choices: [
        { text: '諺明哥以前也是鼓手嘛？', affection: 2, response: [
          { kind: 'dialogue', speaker: '劉諺明', text: '對啊，鼓手。' },
          { kind: 'narration', text: '他笑了一下。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '不過現在比較常做的是幫人搬器材、算時間，還有提醒他們不要把東西弄壞。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '有時候覺得自己好像比以前還忙。' },
        ]},
        { text: '那你以前有沒有跟團員吵過架？', affection: 2, response: [
          { kind: 'dialogue', speaker: '劉諺明', text: '有啊，哪有可能完全不吵。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '每個人想法不一樣，練久了多少會有意見。' },
          { kind: 'narration', text: '他想了一下，才繼續說。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '不過吵架也不一定是壞事，至少有些事情講出來，總比一直悶著好。' },
        ]},
        { text: '所以你現在才開練團室喔？', affection: 2, response: [
          { kind: 'dialogue', speaker: '劉諺明', text: '也不完全是啦。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '只是後來覺得，能讓喜歡音樂的人有個地方練團，也滿好的。' },
          { kind: 'narration', text: '他看了一眼裡面亮著的燈。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '而且每天聽他們在裡面吵吵鬧鬧，還挺有意思的。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '雖然有時候真的很吵。' },
        ]},
      ]},
      { setup: [
        { kind: 'narration', text: '你喝完水，把杯子放回櫃檯。諺明正準備整理一疊場地登記表，旁邊的風扇卻把幾張紙吹得翹了起來。' },
        { kind: 'dialogue', speaker: '劉諺明', text: '欸，等一下。' },
        { kind: 'dialogue', speaker: '劉諺明', text: '妳幫我拿一下這幾張紙好不好？風扇一直吹，快飛到地上了。' },
        { kind: 'narration', text: '你伸手幫他按住紙張。他一邊翻找登記表，一邊把散開的幾張收據重新疊好。其中一張滑到桌邊，你趕緊伸手去接，兩個人的手剛好碰在一起。' },
        { kind: 'dialogue', speaker: '劉諺明', text: '喔，小心。' },
        { kind: 'dialogue', speaker: '劉諺明', text: '有沒有撞到？' },
      ], prompt: '他先把收據接過來，隨後看了看你的手。', choices: [
        { text: '沒有啦，我反應很快吧！', affection: 2, response: [
          { kind: 'dialogue', speaker: '劉諺明', text: '是啊，反應不錯。' },
          { kind: 'narration', text: '他笑著把收據放好。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '不然我這個櫃檯今天可能要多一個工讀生了。' },
        ]},
        { text: '諺明哥，你平常都自己整理這麼多東西喔？', affection: 2, response: [
          { kind: 'dialogue', speaker: '劉諺明', text: '差不多啦，租借時間、器材紀錄，還有一些雜七雜八的事情。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '有時候忙起來，連午餐都會忘記吃。' },
          { kind: 'narration', text: '他看了看桌上的文件。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '不過習慣就好了，東西放整齊，找起來也比較快。' },
        ]},
        { text: '你剛剛是不是碰到我的手了？', affection: 3, response: [
          { kind: 'dialogue', speaker: '劉諺明', text: '有嗎？' },
          { kind: 'narration', text: '他低頭看了一眼自己的手，隨後笑了笑。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '剛剛是怕收據掉下去啦。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '不過妳反應這麼快，我倒是省事了。' },
          { kind: 'narration', text: '他說著，把另一張收據遞給你。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '來，這張也幫我顧一下，今天請妳當臨時助理。' },
        ]},
      ]},
      { setup: [
        { kind: 'narration', text: '諺明把登記表整理好，拿起計算器核對了一遍今天的租借時間。' },
        { kind: 'dialogue', speaker: '劉諺明', text: '對了，今天他們的時間還沒到。' },
        { kind: 'dialogue', speaker: '劉諺明', text: '妳不用擔心，我不會現在就進去催他們。' },
        { kind: 'dialogue', speaker: '劉諺明', text: '這種時候，讓他們自己待一下比較好。' },
        { kind: 'dialogue', speaker: '劉諺明', text: '而且佑達如果等一下回來，東西還在原位，不用再跑來問我。' },
      ], prompt: '他朝練團室看了一眼，又轉回來看你。', choices: [
        { text: '諺明哥，你是不是其實很照顧他們？', affection: 2, response: [
          { kind: 'dialogue', speaker: '劉諺明', text: '每天看他們在這裡練，多少會有感情啦。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '而且這些人有時候真的很會給人添麻煩。' },
          { kind: 'narration', text: '他笑著搖搖頭。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '不過也還算有趣。' },
        ]},
        { text: '那如果佑達真的不回來了呢？', affection: 2, response: [
          { kind: 'dialogue', speaker: '劉諺明', text: '那也沒辦法啊。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '他如果真的想清楚了，我們也不能替他決定。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '不過我想，至少應該找個時間好好談一次。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '畢竟有些話，今天吵架的時候可能還沒講完。' },
        ]},
        { text: '你都不擔心今天練團室的氣氛變得很差嗎？', affection: 2, response: [
          { kind: 'dialogue', speaker: '劉諺明', text: '不會啊，練團室本來就不是每天都只有開心的事情。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '有人心情好，有人心情不好，總不能因為今天吵架，就把音箱全部收起來吧？' },
          { kind: 'narration', text: '他說完，自己也覺得好笑。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '那我可能要失業了。' },
        ]},
      ]},
      { setup: [
        { kind: 'narration', text: '諺明把最後一張收據夾進文件夾，終於從櫃檯後面站起來，活動了一下肩膀。' },
        { kind: 'dialogue', speaker: '劉諺明', text: '欸，妳等一下還有事嗎？' },
        { kind: 'dialogue', speaker: '劉諺明', text: '我本來想出去買點東西，順便走走。' },
        { kind: 'dialogue', speaker: '劉諺明', text: '妳要不要一起？' },
      ], prompt: '他拿起鑰匙，站在櫃檯旁邊等你的回答。', choices: [
        { text: '好啊，我也想出去透透氣。', affection: 2, response: [
          { kind: 'dialogue', speaker: '劉諺明', text: '好啊。' },
          { kind: 'narration', text: '他拿起櫃檯上的鑰匙。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '外面天氣還不錯，走一走也好。' },
        ]},
        { text: '你要買什麼？我陪你去。', affection: 2, response: [
          { kind: 'dialogue', speaker: '劉諺明', text: '買點日用品，還有櫃檯要用的東西。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '不過不多啦，妳不用擔心要幫我提一大堆。' },
          { kind: 'narration', text: '他笑著看你。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '真的要買很多，我可不敢麻煩妳。' },
        ]},
        { text: '你是怕我一個人在這裡無聊嗎？', affection: 3, response: [
          { kind: 'dialogue', speaker: '劉諺明', text: '哈哈，妳這樣講，好像我很怕妳無聊一樣。' },
          { kind: 'narration', text: '他把鑰匙收進口袋，語氣依舊平穩。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '不過妳今天在這裡待了這麼久，出去透透氣也好。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '走吧，順便陪我買個東西。' },
        ]},
      ]},
    ],
    ending: [
      { kind: 'narration', text: '諺明把櫃檯簡單整理了一下，交代裡面的人如果有事情就叫他，隨後帶著你走出練團室。外面的太陽已經沒有下午剛來時那麼刺眼，巷口有賣飲料的小攤，旁邊停著幾輛腳踏車。' },
      { kind: 'narration', text: '諺明走在靠近馬路的一側，經過路邊的小攤時停下來，買了兩瓶水。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '妳要喝嗎？' },
      { kind: 'dialogue', speaker: '你', text: '你不是剛剛才給我水？' },
      { kind: 'dialogue', speaker: '劉諺明', text: '剛剛那杯是坐在裡面喝的，現在出來走路又不一樣。' },
      { kind: 'narration', text: '他把水遞給你，自己擰開另一瓶喝了一口。' },
      { kind: 'dialogue', speaker: '你', text: '諺明哥，你是不是平常都這樣照顧別人啊？' },
      { kind: 'dialogue', speaker: '劉諺明', text: '哪樣？' },
      { kind: 'dialogue', speaker: '你', text: '就是……什麼都幫人家想到。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '習慣了吧。開店做生意，總要多留意一點。' },
      { kind: 'narration', text: '走了一小段，他忽然側過頭看你。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '不過妳今天倒是挺乖的。' },
      { kind: 'dialogue', speaker: '你', text: '蛤？我哪裡乖了？' },
      { kind: 'dialogue', speaker: '劉諺明', text: '剛剛在裡面那麼吵，妳也沒跟著起鬨。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '還知道出來透透氣。' },
      { kind: 'narration', text: '他推了推眼鏡，嘴角帶著一點笑意。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '比裡面那幾個省心多了。' },
      { kind: 'dialogue', speaker: '你', text: '你這樣講，他們知道會傷心欸。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '那就不要讓他們知道。' },
      { kind: 'narration', text: '他說完，自己先笑了。快走到巷口時，他稍稍放慢腳步。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '今天如果還想回去，就慢慢來。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '不用急著走。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '我等一下也會回去看著他們，妳不用擔心。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '對了，下次來練團室，記得先跟我打聲招呼。' },
      { kind: 'dialogue', speaker: '你', text: '為什麼？' },
      { kind: 'dialogue', speaker: '劉諺明', text: '不然我怎麼知道妳來了？' },
      { kind: 'narration', text: '他說得很自然，像是在講一件再普通不過的事情。可說完以後，他又笑了一下。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '走啦，回去吧。' },
    ],
  },
}

function readProgress(): April20Progress {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as Partial<April20Progress> | null
    const phases: April20Phase[] = ['notification', 'sms', 'smsEnding', 'routePicker', 'park', 'conflict', 'characterPicker', 'interaction', 'complete']
    if (!saved || !phases.includes(saved.phase as April20Phase)) return initialProgress
    const route = saved.route === 'park' || saved.route === 'rehearsal' ? saved.route : null
    const character = CHARACTER_ORDER.includes(saved.character as April20Character) ? saved.character as April20Character : null
    const messages = Array.isArray(saved.messages)
      ? saved.messages.filter((item): item is SmsLine => item && (item.from === 'youda' || item.from === 'me') && typeof item.text === 'string' && typeof item.time === 'string').slice(0, 40)
      : []
    if ((saved.phase === 'park' || saved.phase === 'interaction' || saved.phase === 'complete') && !character) return initialProgress
    const savedRoute = route === 'park' ? parkRoute : character ? characterRoutes[character] : null
    const roundCount = savedRoute?.rounds.length ?? 3
    const choices = Array.isArray(saved.choices)
      ? saved.choices.filter((value): value is number => Number.isInteger(value) && value >= 0 && value < 3).slice(0, roundCount)
      : []
    const smsRound = Number.isInteger(saved.smsRound) ? Math.max(0, Math.min(4, Number(saved.smsRound))) : 0
    const roundIndex = Number.isInteger(saved.roundIndex) ? Math.max(0, Math.min(roundCount - 1, Number(saved.roundIndex))) : 0
    const smsPendingChoice = Number.isInteger(saved.smsPendingChoice) && Number(saved.smsPendingChoice) >= 0 && Number(saved.smsPendingChoice) < 3 ? Number(saved.smsPendingChoice) : null
    const pendingChoice = Number.isInteger(saved.pendingChoice) && Number(saved.pendingChoice) >= 0 && Number(saved.pendingChoice) < 3 ? Number(saved.pendingChoice) : null
    const legacyThreeRoundCompletion = saved.phase === 'complete' && roundCount === 5 && choices.length === 3
    if (saved.phase === 'complete' && choices.length !== roundCount && !legacyThreeRoundCompletion) return initialProgress
    return {
      phase: saved.phase as April20Phase,
      smsRound,
      smsPendingChoice,
      messages,
      route,
      character,
      roundIndex,
      pendingChoice,
      choices,
    }
  } catch {
    return initialProgress
  }
}

function clockForProgress(progress: April20Progress) {
  if (progress.phase === 'notification' || progress.phase === 'sms') return ['15:16', '15:20', '15:24', '15:28', '15:32'][progress.smsRound]
  if (progress.phase === 'smsEnding') return '15:36'
  if (progress.phase === 'routePicker') return '15:40'
  if (progress.phase === 'park') return ['16:00', '16:20', '16:40'][progress.roundIndex]
  if (progress.phase === 'conflict') return '16:00'
  if (progress.phase === 'characterPicker') return '16:35'
  if (progress.phase === 'interaction') return ['16:45', '17:00', '17:15', '17:30', '17:45'][progress.roundIndex] ?? '17:45'
  return '17:50'
}

function April20Blocks({ blocks }: { blocks: April20Block[] }) {
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

function InteractionScreen({
  title,
  kicker,
  route,
  progress,
  onChoose,
  onContinue,
}: {
  title: string
  kicker: string
  route: April20Route
  progress: April20Progress
  onChoose: (index: number) => void
  onContinue: () => void
}) {
  const round = route.rounds[progress.roundIndex]
  const selected = progress.pendingChoice !== null ? round.choices[progress.pendingChoice] : null
  return (
    <div className="story-screen-overlay">
      <div className="story-screen-head">
        <div className="chapter-mark">4 月 20 日・星期日</div>
        <div className="story-contact-title">
          <strong>{title}</strong>
          <small>1997 年 4 月 20 日・下午</small>
        </div>
        <span className="story-head-spacer" />
      </div>
      <div className="story-narrative-scroll">
        <div className="story-kicker">{kicker}</div>
        <h2 className="story-scene-title">{title}</h2>
        {progress.roundIndex === 0 && <April20Blocks blocks={route.intro} />}
        {round.setup && <April20Blocks blocks={round.setup} />}
        <div className="reunion-pause-note">第 {progress.roundIndex + 1}／{route.rounds.length} 輪互動</div>
        <p className="narrative-paragraph">{round.prompt}</p>
        {selected ? (
          <>
            <April20Blocks blocks={[{ kind: 'dialogue', speaker: '你', text: selected.text }, ...selected.response]} />
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={onContinue}>
                {progress.roundIndex < route.rounds.length - 1 ? '繼續聊一會兒' : '收下這段相處'} <ChevronRight size={15} />
              </button>
            </div>
          </>
        ) : (
          <div className="march29-reply-list">
            {round.choices.map((choice, index) => (
              <button className="reply-choice" key={index} onClick={() => onChoose(index)}>
                <span>{choice.text}</span><ChevronRight size={15} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function April20Story({
  onAddAffection,
  onAppendMessages,
  onClockChange,
  onFinish,
}: {
  onAddAffection: (character: April20Character, amount: number) => void
  onAppendMessages: (entries: { from: 'youda' | 'me'; text: string; time?: string }[]) => void
  onClockChange: (time: string) => void
  onFinish: (selection: { route: 'park' | 'rehearsal'; character: April20Character; choices: number[] }) => void
}) {
  const [progress, setProgress] = useState<April20Progress>(readProgress)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    onClockChange(clockForProgress(progress))
  }, [progress, onClockChange])

  useEffect(() => {
    const opening = smsRounds[0].incoming.map((text, index) => ({
      from: 'youda' as const,
      text,
      time: ['15:16', '15:16', '15:17', '15:17'][index],
    }))
    if (progress.messages.length === 0) {
      setProgress((current) => current.messages.length ? current : { ...current, messages: opening })
    }
    if (localStorage.getItem(SMS_SEEDED_KEY) !== 'true') {
      onAppendMessages(opening)
      localStorage.setItem(SMS_SEEDED_KEY, 'true')
    }
  }, [onAppendMessages, progress.messages.length])

  const chooseSms = (index: number) => {
    if (progress.smsPendingChoice !== null) return
    const choice = smsRounds[progress.smsRound].choices[index]
    if (!choice) return
    const time = ['15:18', '15:22', '15:26', '15:30', '15:34'][progress.smsRound]
    const outgoing: SmsLine = { from: 'me', text: choice.text, time }
    const replies = choice.replies.map((text, replyIndex) => ({
      from: 'youda' as const,
      text,
      time: replyIndex === 0 ? time : time,
    }))
    setProgress((current) => ({
      ...current,
      smsPendingChoice: index,
      messages: [...current.messages, outgoing, ...replies],
    }))
    onAppendMessages([outgoing, ...replies])
  }

  const continueSms = () => {
    if (progress.smsPendingChoice === null) return
    if (progress.smsRound < smsRounds.length - 1) {
      const nextRound = progress.smsRound + 1
      const incomingTime = ['15:20', '15:24', '15:28', '15:32'][nextRound - 1]
      const incoming = smsRounds[nextRound].incoming.map((text) => ({
        from: 'youda' as const,
        text,
        time: incomingTime,
      }))
      setProgress((current) => ({
        ...current,
        smsRound: nextRound,
        smsPendingChoice: null,
        messages: [...current.messages, ...incoming],
      }))
      onAppendMessages(incoming)
    } else {
      const endingMessages: SmsLine[] = [
        { from: 'youda', text: '謝謝妳啦，突然問這些奇怪的問題。', time: '15:36' },
        { from: 'youda', text: '妳就當我今天想太多好了。', time: '15:36' },
        { from: 'youda', text: '先這樣，我還有點事。', time: '15:36' },
      ]
      setProgress((current) => ({
        ...current,
        phase: 'smsEnding',
        smsPendingChoice: null,
        messages: [...current.messages, ...endingMessages],
      }))
      onAppendMessages(endingMessages)
    }
  }

  const continueAfterSmsEnding = () => {
    if (progress.phase !== 'smsEnding') return
    setProgress((current) => ({ ...current, phase: 'routePicker' }))
  }

  const chooseRoute = (route: 'park' | 'rehearsal') => {
    if (route === 'park') {
      setProgress((current) => ({
        ...current,
        phase: 'park',
        route: 'park',
        character: 'yanming',
        roundIndex: 0,
        pendingChoice: null,
        choices: [],
      }))
    } else {
      setProgress((current) => ({
        ...current,
        phase: 'conflict',
        route: 'rehearsal',
        character: null,
        roundIndex: 0,
        pendingChoice: null,
        choices: [],
      }))
    }
  }

  const chooseCharacter = (character: April20Character) => {
    setProgress((current) => ({
      ...current,
      phase: 'interaction',
      route: 'rehearsal',
      character,
      roundIndex: 0,
      pendingChoice: null,
      choices: [],
    }))
  }

  const currentRoute = progress.route === 'park'
    ? parkRoute
    : progress.character ? characterRoutes[progress.character] : null

  const chooseInteraction = (index: number) => {
    if (!progress.character || progress.pendingChoice !== null || !currentRoute) return
    const choice = currentRoute.rounds[progress.roundIndex]?.choices[index]
    if (!choice) return
    setProgress((current) => ({
      ...current,
      pendingChoice: index,
      choices: [...current.choices.slice(0, current.roundIndex), index],
    }))
    onAddAffection(progress.character, choice.affection)
  }

  const continueInteraction = () => {
    if (progress.pendingChoice === null || !currentRoute) return
    if (progress.roundIndex < currentRoute.rounds.length - 1) {
      setProgress((current) => ({ ...current, roundIndex: current.roundIndex + 1, pendingChoice: null }))
    } else {
      setProgress((current) => ({ ...current, phase: 'complete', pendingChoice: null }))
    }
  }

  const finish = () => {
    if (!progress.route || !progress.character || !currentRoute) return
    const legacyThreeRoundCompletion = progress.phase === 'complete' && currentRoute.rounds.length === 5 && progress.choices.length === 3
    if (progress.choices.length !== currentRoute.rounds.length && !legacyThreeRoundCompletion) return
    onFinish({ route: progress.route, character: progress.character, choices: progress.choices })
  }

  if (progress.phase === 'notification') {
    return (
      <button className="sms-notification" onClick={() => setProgress((current) => ({ ...current, phase: 'sms' }))}>
        <span className="notification-icon"><MessageSquare size={19} /></span>
        <span className="notification-copy">
          <strong>錢佑達</strong>
          <span>欸，妳現在有空嗎？</span>
          <span>我想問妳幾個問題，可能有點奇怪。</span>
        </span>
        <span className="notification-time">現在</span>
      </button>
    )
  }

  if (progress.phase === 'sms') {
    const selected = progress.smsPendingChoice !== null ? smsRounds[progress.smsRound].choices[progress.smsPendingChoice] : null
    return (
      <div className="story-screen-overlay">
        <div className="story-screen-head">
          <div className="chapter-mark">新訊息・4 月 20 日</div>
          <div className="story-contact-title">
            <strong>錢佑達</strong>
            <small>1997 年 4 月 20 日・下午</small>
          </div>
          <span className="story-head-spacer" />
        </div>
        <div className="story-narrative-scroll">
          <div className="story-kicker">NEW MESSAGE · 15:16</div>
          <h2 className="story-scene-title">錢佑達傳來幾個奇怪的問題。</h2>
          <div className="sms-thread-scroll">
            <div className="story-date-label">1997 年 4 月 20 日・下午</div>
            {progress.messages.map((message, index) => (
              <div key={index}>
                <div className={message.from === 'me' ? 'message-row mine' : 'message-row'}>
                  <div className={message.from === 'me' ? 'message-bubble mine' : 'message-bubble'}>{message.text}</div>
                </div>
              </div>
            ))}
          </div>
          {selected ? (
            <div className="choice-area">
              <div className="choice-heading">佑達回覆了。</div>
              <button className="story-primary-button" onClick={continueSms}>
                {progress.smsRound < smsRounds.length - 1 ? '繼續看下一個問題' : '結束聊天，看看下午要去哪裡'} <ChevronRight size={15} />
              </button>
            </div>
          ) : (
            <div className="choice-area">
              <div className="choice-heading">你想怎麼回答？（第 {progress.smsRound + 1}／5 輪）</div>
              {smsRounds[progress.smsRound].choices.map((choice, index) => (
                <button className="reply-choice" key={index} onClick={() => chooseSms(index)}>
                  <span>{choice.text}</span><ChevronRight size={15} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (progress.phase === 'smsEnding') {
    return (
      <div className="story-screen-overlay">
        <div className="story-screen-head">
          <div className="chapter-mark">新訊息・4 月 20 日</div>
          <div className="story-contact-title">
            <strong>錢佑達</strong>
            <small>1997 年 4 月 20 日・下午</small>
          </div>
          <span className="story-head-spacer" />
        </div>
        <div className="story-narrative-scroll">
          <div className="story-kicker">MESSAGE ENDED · 15:36</div>
          <h2 className="story-scene-title">佑達最後又傳了幾句話。</h2>
          <div className="sms-thread-scroll">
            <div className="story-date-label">1997 年 4 月 20 日・下午</div>
            {progress.messages.map((message, index) => (
              <div key={index}>
                <div className={message.from === 'me' ? 'message-row mine' : 'message-row'}>
                  <div className={message.from === 'me' ? 'message-bubble mine' : 'message-bubble'}>{message.text}</div>
                </div>
              </div>
            ))}
          </div>
          <April20Blocks blocks={[
            { kind: 'narration', text: '對話框安靜了下來。' },
            { kind: 'narration', text: '你盯著屏幕看了一會兒，總覺得佑達今天說話怪怪的。明明每個問題都像是在討論樂團，卻又好像不只是討論樂團。' },
          ]} />
          <div className="story-action-bar story-inline-action">
            <button className="story-primary-button" onClick={continueAfterSmsEnding}>
              看看下午要去哪裡 <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (progress.phase === 'routePicker') {
    return (
      <div className="story-screen-overlay">
        <div className="story-screen-head">
          <div className="chapter-mark">4 月 20 日・星期日</div>
          <div className="story-contact-title">
            <strong>下午的安排</strong>
            <small>1997 年 4 月 20 日</small>
          </div>
          <span className="story-head-spacer" />
        </div>
        <div className="story-narrative-scroll">
          <div className="story-kicker">SUNDAY AFTERNOON</div>
          <h2 className="story-scene-title">今天下午想去哪裡？</h2>
          <April20Blocks blocks={[
            { kind: 'narration', text: '你把手機收進包裡，抬頭看了一眼時間。下午還早，想了想，決定先去找個人，或是直接去練團室看看。' },
          ]} />
          <div className="march29-reply-list">
            <button className="reply-choice" onClick={() => chooseRoute('park')}>
              <span>去找諺明哥，和他一起逛公園</span><ChevronRight size={15} />
            </button>
            <button className="reply-choice" onClick={() => chooseRoute('rehearsal')}>
              <span>去練團室看看大家</span><ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (progress.phase === 'conflict') {
    return (
      <div className="story-screen-overlay">
        <div className="story-screen-head">
          <div className="chapter-mark">4 月 20 日・練團室</div>
          <div className="story-contact-title">
            <strong>一場沒有練成的團</strong>
            <small>1997 年 4 月 20 日・下午</small>
          </div>
          <span className="story-head-spacer" />
        </div>
        <div className="story-narrative-scroll">
          <div className="story-kicker">APRIL 20 · REHEARSAL ROOM</div>
          <h2 className="story-scene-title">「我想退團。」</h2>
          <April20Blocks blocks={conflictBlocks} />
          <div className="reunion-pause-note">練團室裡安靜下來，大家都還沒想好接下來該怎麼辦。</div>
          <div className="story-action-bar story-inline-action">
            <button className="story-primary-button" onClick={() => setProgress((current) => ({ ...current, phase: 'characterPicker' }))}>
              找一個人聊聊 <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (progress.phase === 'characterPicker') {
    return (
      <div className="story-screen-overlay">
        <div className="story-screen-head">
          <div className="chapter-mark">4 月 20 日・練團室</div>
          <div className="story-contact-title">
            <strong>爭執之後</strong>
            <small>1997 年 4 月 20 日・下午</small>
          </div>
          <span className="story-head-spacer" />
        </div>
        <div className="story-narrative-scroll">
          <div className="story-kicker">AFTER THE ARGUMENT</div>
          <h2 className="story-scene-title">想找誰單獨聊一聊？</h2>
          <April20Blocks blocks={[
            { kind: 'narration', text: '溫尚翊還站在音箱旁邊，阿信低頭整理歌譜，瑪莎靠著鼓組沒說話，石頭正在把導線收好。諺明哥站在門邊，沒有插手團員之間的爭論。' },
            { kind: 'narration', text: '你看著他們，想了想，決定找一個人單獨聊一聊。' },
          ]} />
          <div className="march29-reply-list">
            {CHARACTER_ORDER.map((character) => (
              <button className="reply-choice" key={character} onClick={() => chooseCharacter(character)}>
                <span>{CHARACTER_NAMES[character]}</span><ChevronRight size={15} />
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if ((progress.phase === 'park' || progress.phase === 'interaction') && currentRoute) {
    return (
      <InteractionScreen
        title={progress.phase === 'park' ? '公園散步・和諺明哥' : '練團室外・和' + currentRoute.name}
        kicker={progress.phase === 'park' ? 'A WALK IN THE PARK' : 'AFTER THE ARGUMENT'}
        route={currentRoute}
        progress={progress}
        onChoose={chooseInteraction}
        onContinue={continueInteraction}
      />
    )
  }

  if (progress.phase === 'complete' && currentRoute) {
    return (
      <div className="story-screen-overlay">
        <div className="story-screen-head">
          <div className="chapter-mark">4 月 20 日・星期日</div>
          <div className="story-contact-title">
            <strong>今天先到這裡</strong>
            <small>1997 年 4 月 20 日・傍晚</small>
          </div>
          <span className="story-head-spacer" />
        </div>
        <div className="story-narrative-scroll">
          <div className="story-kicker">APRIL 20 · END OF DAY</div>
          <h2 className="story-scene-title">{progress.route === 'park' ? '公園裡的午後' : '練團室裡的午後'}</h2>
          <April20Blocks blocks={currentRoute.ending} />
          <div className="reunion-pause-note">今天的事情暫時告一段落。回去以後，腦袋裡大概還會想起佑達說過的那些話。</div>
          <div className="story-action-bar story-inline-action">
            <button className="story-primary-button" onClick={finish}>
              結束今天 <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
