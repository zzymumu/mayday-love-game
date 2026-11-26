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
type InteractionRound = { prompt: string; choices: [InteractionChoice, InteractionChoice, InteractionChoice] }
type April20Route = {
  name: string
  intro: April20Block[]
  rounds: [InteractionRound, InteractionRound, InteractionRound]
  ending: April20Block[]
}
type April20Phase = 'notification' | 'sms' | 'routePicker' | 'park' | 'conflict' | 'characterPicker' | 'interaction' | 'complete'
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
  { kind: 'dialogue', speaker: '錢佑達', text: '可是我以前真的沒有想過這些。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '你們現在開始討論Demo，還有唱片公司的事情，我才發現，好像大家想的東西越來越不一樣了。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '所以咧？' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '誰規定玩團就一定要靠音樂吃飯？' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '我們現在想錄Demo，就代表以後每個人都要當音樂人喔？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '可是你們是真的想把音樂做好。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '我有時候甚至不知道自己能不能打好一首歌。' },
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
      { kind: 'narration', text: '阿信沒有跟著大家說話。他拿著剛才寫曲目的紙，走到靠牆的椅子旁坐下，手指把紙角慢慢壓平。' },
      { kind: 'narration', text: '你走過去時，他抬頭看見你，往旁邊挪出一點位置。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '妳要坐這裡嗎？' },
    ],
    rounds: [
      { prompt: '阿信把那張寫著曲目的紙放在膝上，低頭看了一會兒。', choices: [
        { text: '「你剛剛是不是也很擔心佑達？」', affection: 2, response: [
          { kind: 'dialogue', speaker: '陳信宏', text: '有一點啦。' },
          { kind: 'narration', text: '他用指腹把紙角壓平，沒有急著抬頭。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '我只是覺得，他好像把很多事情都先怪到自己身上了。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '可是我們練團哪有可能每次都一次就很順嘛。' },
        ]},
        { text: '「你剛才一直想讓大家先聽他說完欸。」', affection: 2, response: [
          { kind: 'dialogue', speaker: '陳信宏', text: '因為大家都太急了呀。' },
          { kind: 'narration', text: '他抬起眼看你，語氣放得很輕。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '怪獸是急著留住他，佑達又一直覺得自己不夠好，兩個人講著講著就撞在一起了。' },
        ]},
        { text: '「先不要想那些了，坐一下嘛。」', affection: 2, response: [
          { kind: 'dialogue', speaker: '陳信宏', text: '好啊。' },
          { kind: 'narration', text: '他把紙放到旁邊，往椅背靠了一點。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '剛剛一直站著講話，現在坐下來才發現腿有點酸。' },
          { kind: 'dialogue', speaker: '你', text: '你也會腿酸喔？' },
          { kind: 'dialogue', speaker: '陳信宏', text: '會啊，我又不是機器人。' },
        ]},
      ]},
      { prompt: '阿信把紙翻到背面，拿起鉛筆，在空白處隨手畫了幾個小圈。', choices: [
        { text: '「你還在想Demo的事情喔？」', affection: 2, response: [
          { kind: 'dialogue', speaker: '陳信宏', text: '有一點。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '可是現在好像不是挑歌的時候啦。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '等大家心情好一點，再一起慢慢弄就好了。' },
        ]},
        { text: '把鉛筆拿過來，在他畫的小圈旁邊補一顆星星。', affection: 2, response: [
          { kind: 'narration', text: '他看見你補上的星星，笑著把鉛筆又推回你手邊。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '這樣看起來比較像一張地圖了欸。' },
          { kind: 'dialogue', speaker: '你', text: '那你要負責畫路線。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '好啊，那妳不要亂改我的方向喔。' },
        ]},
        { text: '伸手把他膝上的紙往自己這邊拉近一點，一起看。', affection: 3, response: [
          { kind: 'narration', text: '阿信順著你的手把紙移到兩個人中間，肩膀也自然靠近了一點。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '妳看，這裡我本來想寫幾首比較適合先錄的。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '不過今天先不想了，陪妳坐一下比較重要。' },
        ]},
      ]},
      { prompt: '走廊裡傳來瑪莎搬椅子的聲音，阿信把鉛筆放回紙上。', choices: [
        { text: '「你等一下還會去勸佑達嗎？」', affection: 2, response: [
          { kind: 'dialogue', speaker: '陳信宏', text: '我想先讓他自己靜一靜。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '等他願意講的時候，我們再聽他說，好不好？' },
        ]},
        { text: '把手輕輕搭在他的手背上，沒有馬上收回來。', affection: 3, response: [
          { kind: 'narration', text: '阿信低頭看了一眼你的手，手指慢慢放鬆，沒有抽開。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '妳今天也被嚇到了吧？' },
          { kind: 'dialogue', speaker: '你', text: '有一點點。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '那先坐一下，不用急著回去。' },
        ]},
        { text: '「你剛剛那句『我們可以一起找方法』講得很好欸。」', affection: 2, response: [
          { kind: 'dialogue', speaker: '陳信宏', text: '真的嗎？我只是覺得……可以一起做的事情，就不要一個人扛嘛。' },
          { kind: 'narration', text: '他說完笑了一下，伸手把你剛才畫的星星圈起來。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '這顆留著好了，等下次真的錄Demo，再拿出來看。' },
        ]},
      ]},
    ],
    ending: [
      { kind: 'narration', text: '阿信把那張紙折好，沒有再繼續討論Demo。他陪你坐了一會兒，等裡面的聲音慢慢恢復平常的樣子，才一起站起來。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '今天先這樣好了。回去路上小心喔，妳到家再休息。' },
      { kind: 'narration', text: '他把椅子推回原位，還順手替你把包包帶子從椅腳旁邊拿開。' },
    ],
  },
  masa: {
    name: '瑪莎',
    intro: [
      { kind: 'narration', text: '瑪莎還站在鼓組旁邊，手裡拿著一瓶水，瓶蓋轉了半天也沒喝一口。你走近時，他瞥了你一眼，像是早就知道你會過來。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '幹嘛？要來幫我罵人喔？' },
    ],
    rounds: [
      { prompt: '瑪莎把水瓶放到音箱上，雙手抱在胸前。', choices: [
        { text: '「我才沒有要罵人，我是來看你還在不在生氣。」', affection: 2, response: [
          { kind: 'dialogue', speaker: '瑪莎', text: '妳看不出來喔？' },
          { kind: 'narration', text: '他故意把眉毛挑得很高，過了一會兒又自己笑出來。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '好啦，沒有那麼氣了。只是覺得很莫名其妙。' },
        ]},
        { text: '「你剛剛是不是差點想把鼓棒塞回他手裡？」', affection: 2, response: [
          { kind: 'dialogue', speaker: '瑪莎', text: '我倒是想問他要不要先把話講完。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '拿著鼓棒講退團，講完又直接走人，是怎樣啦。' },
          { kind: 'narration', text: '他嘴上嫌著，手卻把那瓶水往你這邊推了一點。' },
        ]},
        { text: '「你先喝水啦，瓶子都快被你捏扁了。」', affection: 1, response: [
          { kind: 'narration', text: '他低頭看了一眼瓶身，這才發現自己真的把塑膠瓶捏得凹了一塊。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '……妳不要管這麼多啦。' },
          { kind: 'narration', text: '話是這麼說，他還是把瓶蓋打開喝了一口。' },
        ]},
      ]},
      { prompt: '他把水瓶放下，視線又落回空著的鼓椅。', choices: [
        { text: '「你是不是也不想他真的走？」', affection: 2, response: [
          { kind: 'dialogue', speaker: '瑪莎', text: '不然咧？少一個鼓手，誰來幫我們收尾？' },
          { kind: 'narration', text: '他停了一下，語氣沒有剛才那麼尖。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '而且一起玩這麼久，哪有說散就散的。' },
        ]},
        { text: '「你剛剛講Bass那段，是不是故意讓他知道大家也會出錯？」', affection: 2, response: [
          { kind: 'dialogue', speaker: '瑪莎', text: '不然咧，我又不是每次都彈得多神。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '他最好不要以為只有他會出包。' },
          { kind: 'narration', text: '他伸手彈了一下自己的琴弦，低低的聲音在房間裡震了一下。' },
        ]},
        { text: '「你不要一直皺眉啦，額頭都快打結了。」', affection: 2, response: [
          { kind: 'dialogue', speaker: '瑪莎', text: '妳才打結咧。' },
          { kind: 'narration', text: '他伸手用指節輕輕敲了一下你的額頭，像是把那句話原封不動還給你。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '好了，這樣比較平均。' },
        ]},
      ]},
      { prompt: '練團室裡的其他人沒有再說話，瑪莎把Bass背帶重新拉正。', choices: [
        { text: '伸手替他把歪掉的背帶拉回肩膀正中間。', affection: 3, response: [
          { kind: 'narration', text: '他低頭看著你整理背帶，原本想吐槽的話停在嘴邊。等你弄好，他才慢慢把琴背穩。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '欸，妳現在很會照顧人喔。' },
          { kind: 'dialogue', speaker: '你', text: '偶爾啦，看對象。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '喔？那我是不是要感到榮幸？' },
        ]},
        { text: '把水瓶遞給他，叫他先不要再瞪那張空椅子。', affection: 2, response: [
          { kind: 'dialogue', speaker: '瑪莎', text: '我哪有瞪？' },
          { kind: 'narration', text: '他接過水瓶，卻還是忍不住朝鼓椅看了一眼。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '好啦，我知道啦。先喝水。' },
        ]},
        { text: '「等一下要不要陪我出去買點東西？不要一直悶在這裡。」', affection: 2, response: [
          { kind: 'dialogue', speaker: '瑪莎', text: '妳是把我當小朋友在哄喔？' },
          { kind: 'dialogue', speaker: '你', text: '你現在看起來很需要被哄啊。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '……走啦，買什麼？' },
        ]},
      ]},
    ],
    ending: [
      { kind: 'narration', text: '瑪莎把Bass重新背好，路過你身邊時用肩膀輕輕撞了你一下。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '走啦，等一下不要又站在門口發呆。' },
      { kind: 'narration', text: '他嘴上還是那麼欠，卻放慢腳步等你跟上。' },
    ],
  },
  stone: {
    name: '石錦航',
    intro: [
      { kind: 'narration', text: '石頭把剛才撿起來的鼓棒放回鼓組旁邊，又蹲下來把散開的導線慢慢理好。你走近時，他抬頭看了你一眼，先把手上的線放到一旁。' },
      { kind: 'dialogue', speaker: '石錦航', text: '妳要不要先坐一下？剛剛站在門口應該也聽了不少。' },
    ],
    rounds: [
      { prompt: '石頭把導線收好，坐到旁邊的椅子上。', choices: [
        { text: '「你是不是也覺得很突然？」', affection: 2, response: [
          { kind: 'dialogue', speaker: '石錦航', text: '有一點。之前沒有聽他提過這些。' },
          { kind: 'narration', text: '他把手掌放在膝上，想了一會兒才繼續。' },
          { kind: 'dialogue', speaker: '石錦航', text: '不過仔細想想，他可能真的悶了很久，只是我們都沒發現。' },
        ]},
        { text: '「你剛才一直在幫大家把東西收好欸。」', affection: 1, response: [
          { kind: 'dialogue', speaker: '石錦航', text: '總要有人先把東西放回去嘛。' },
          { kind: 'narration', text: '他笑了一下，伸手把旁邊的椅子往你這邊拉近。' },
          { kind: 'dialogue', speaker: '石錦航', text: '不然等一下真的要練，也不知道從哪裡開始。' },
        ]},
        { text: '坐到他旁邊，肩膀輕輕靠上去。', affection: 3, response: [
          { kind: 'narration', text: '他先是停了一下，隨後把肩膀放鬆，讓你靠得穩一點。' },
          { kind: 'dialogue', speaker: '石錦航', text: '今天好像大家都需要休息一下。' },
          { kind: 'dialogue', speaker: '你', text: '那你呢？' },
          { kind: 'dialogue', speaker: '石錦航', text: '我現在還好，有妳坐在旁邊就不會那麼悶。' },
        ]},
      ]},
      { prompt: '石頭拿起桌上的歌譜，把被折到的角慢慢撫平。', choices: [
        { text: '「你覺得佑達還會回來嗎？」', affection: 2, response: [
          { kind: 'dialogue', speaker: '石錦航', text: '我希望會。' },
          { kind: 'dialogue', speaker: '石錦航', text: '但現在一直猜也沒有用，先讓他把心情整理好吧。' },
          { kind: 'narration', text: '他把歌譜放回桌上，沒有把話說得太滿。' },
        ]},
        { text: '伸手替他把歌譜折起來的角壓平。', affection: 2, response: [
          { kind: 'narration', text: '你們的手指在紙邊碰到，他稍微讓開一點，卻沒有把歌譜抽走。' },
          { kind: 'dialogue', speaker: '石錦航', text: '謝謝。這張剛剛差點被踩到。' },
          { kind: 'dialogue', speaker: '你', text: '還好你有撿起來。' },
          { kind: 'dialogue', speaker: '石錦航', text: '妳也有看到啊。' },
        ]},
        { text: '「你不要一直忙了，坐下來陪我一下。」', affection: 2, response: [
          { kind: 'dialogue', speaker: '石錦航', text: '好啊。' },
          { kind: 'narration', text: '他把手裡的紙放下，真的坐回你旁邊，沒有再找事情做。' },
          { kind: 'dialogue', speaker: '石錦航', text: '這樣可以嗎？' },
        ]},
      ]},
      { prompt: '練團室裡傳來一聲椅腳摩擦地面的聲音，石頭抬眼看了看門口。', choices: [
        { text: '「你等一下會去找佑達嗎？」', affection: 2, response: [
          { kind: 'dialogue', speaker: '石錦航', text: '先不急。現在大家都還有點情緒，晚一點再問問他在哪裡。' },
          { kind: 'dialogue', speaker: '石錦航', text: '如果他願意說，我們就好好聽。' },
        ]},
        { text: '把手放到他手背上，輕輕拍兩下。', affection: 3, response: [
          { kind: 'narration', text: '他低頭看了看你的手，隨後把自己的手翻過來，輕輕碰了碰你的指尖。' },
          { kind: 'dialogue', speaker: '石錦航', text: '謝謝妳陪我坐一下。' },
          { kind: 'dialogue', speaker: '石錦航', text: '剛剛那麼吵，現在安靜下來，反而有點不習慣。' },
        ]},
        { text: '「等一下要不要出去走走？在裡面待太久了。」', affection: 2, response: [
          { kind: 'dialogue', speaker: '石錦航', text: '好啊，出去吹一下風也好。' },
          { kind: 'narration', text: '他站起來時，先替你把椅子往後拉開，等你起身才跟上。' },
        ]},
      ]},
    ],
    ending: [
      { kind: 'narration', text: '石頭把最後一條導線放回箱子裡，沒有再急著開始下一件事。' },
      { kind: 'dialogue', speaker: '石錦航', text: '今天先不要勉強自己待太久了。妳要是想回去，我陪妳走到外面。' },
      { kind: 'narration', text: '他把門替你扶住，等你走出去才跟上。' },
    ],
  },
  yanming: {
    name: '劉諺明',
    intro: [
      { kind: 'narration', text: '諺明哥站在練團室門邊，剛才的爭執他沒有插手。看見你走過去，他先往裡面看了一眼，才把門帶上了一點，讓裡面的聲音小一些。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '妳也聽到了喔？' },
      { kind: 'dialogue', speaker: '你', text: '嗯……有一點不知道該怎麼辦。' },
    ],
    rounds: [
      { prompt: '諺明哥靠在門邊，手裡拿著剛才從櫃檯帶過來的帳本。', choices: [
        { text: '「你不進去勸他們嗎？」', affection: 1, response: [
          { kind: 'dialogue', speaker: '劉諺明', text: '那是他們自己的事情，我先不插手比較好。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '等大家冷靜一點，想講話自然會出來找我。' },
        ]},
        { text: '「你是不是也覺得他們今天很不對勁？」', affection: 2, response: [
          { kind: 'dialogue', speaker: '劉諺明', text: '嗯，從剛才開始就有點不太對。' },
          { kind: 'narration', text: '他把帳本換到另一隻手，語氣還是很平穩。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '不過這種事情，總要讓他們自己把話說清楚。' },
        ]},
        { text: '「我可以在這裡陪你一下嗎？」', affection: 2, response: [
          { kind: 'dialogue', speaker: '劉諺明', text: '當然可以啊。' },
          { kind: 'narration', text: '他把旁邊的椅子拉出來，讓你坐在門邊不會擋到出入。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '裡面現在比較吵，坐這裡舒服一點。' },
        ]},
      ]},
      { prompt: '門內的聲音慢慢低下來，諺明哥把帳本放到旁邊的小桌上。', choices: [
        { text: '「你覺得佑達是不是想了很久才說出口？」', affection: 2, response: [
          { kind: 'dialogue', speaker: '劉諺明', text: '有可能。今天看起來不像是一時衝動。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '不過他們一起練這麼久，應該還有機會慢慢談。' },
        ]},
        { text: '「你平常都要幫他們收拾這些爛攤子嗎？」', affection: 1, response: [
          { kind: 'dialogue', speaker: '劉諺明', text: '也不算啦，平常比較常收拾的是器材。' },
          { kind: 'narration', text: '他笑了一聲，抬手推了推眼鏡。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '人跟人的事情，我可沒有辦法幫他們整理得那麼整齊。' },
        ]},
        { text: '把手裡的水遞給他，叫他也休息一下。', affection: 2, response: [
          { kind: 'dialogue', speaker: '劉諺明', text: '謝謝。妳倒是比裡面那幾個人冷靜。' },
          { kind: 'narration', text: '他接過水喝了一口，又把瓶子放回你手邊。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '妳自己也喝一點，今天跑來跑去的。' },
        ]},
      ]},
      { prompt: '諺明哥看了一眼牆上的時鐘，準備把帳本拿回櫃檯。', choices: [
        { text: '「等一下陪我出去走一小段路好不好？」', affection: 3, response: [
          { kind: 'dialogue', speaker: '劉諺明', text: '好啊，等我把帳本放回去。' },
          { kind: 'narration', text: '他把帳本收好，回來時順手拿起外套。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '走吧，外面風還滿舒服的。' },
        ]},
        { text: '「你不要一直站著，坐一下啦。」', affection: 2, response: [
          { kind: 'dialogue', speaker: '劉諺明', text: '好，聽妳的。' },
          { kind: 'narration', text: '他把椅子拉到你旁邊坐下，還特意留了一點空間讓你伸腿。' },
        ]},
        { text: '「你回去忙吧，我再進去看看大家。」', affection: 1, response: [
          { kind: 'dialogue', speaker: '劉諺明', text: '好啊。那妳進去的時候小心一點，別被他們的導線絆到。' },
          { kind: 'narration', text: '他替你把門拉開，讓你先走進去。' },
        ]},
      ]},
    ],
    ending: [
      { kind: 'narration', text: '諺明哥把帳本放回櫃檯，沒有替團員做任何決定，只是把門口和走道整理好，讓大家有地方安靜一下。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '今天先到這裡吧。妳回去路上小心，到了家記得休息。' },
      { kind: 'narration', text: '他站在門口目送你走遠，才轉身回去。' },
    ],
  },
}

function readProgress(): April20Progress {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as Partial<April20Progress> | null
    const phases: April20Phase[] = ['notification', 'sms', 'routePicker', 'park', 'conflict', 'characterPicker', 'interaction', 'complete']
    if (!saved || !phases.includes(saved.phase as April20Phase)) return initialProgress
    const route = saved.route === 'park' || saved.route === 'rehearsal' ? saved.route : null
    const character = CHARACTER_ORDER.includes(saved.character as April20Character) ? saved.character as April20Character : null
    const messages = Array.isArray(saved.messages)
      ? saved.messages.filter((item): item is SmsLine => item && (item.from === 'youda' || item.from === 'me') && typeof item.text === 'string' && typeof item.time === 'string').slice(0, 40)
      : []
    const choices = Array.isArray(saved.choices)
      ? saved.choices.filter((value): value is number => Number.isInteger(value) && value >= 0 && value < 3).slice(0, 3)
      : []
    const smsRound = Number.isInteger(saved.smsRound) ? Math.max(0, Math.min(4, Number(saved.smsRound))) : 0
    const roundIndex = Number.isInteger(saved.roundIndex) ? Math.max(0, Math.min(2, Number(saved.roundIndex))) : 0
    const smsPendingChoice = Number.isInteger(saved.smsPendingChoice) && Number(saved.smsPendingChoice) >= 0 && Number(saved.smsPendingChoice) < 3 ? Number(saved.smsPendingChoice) : null
    const pendingChoice = Number.isInteger(saved.pendingChoice) && Number(saved.pendingChoice) >= 0 && Number(saved.pendingChoice) < 3 ? Number(saved.pendingChoice) : null
    if ((saved.phase === 'park' || saved.phase === 'interaction' || saved.phase === 'complete') && !character) return initialProgress
    if (saved.phase === 'complete' && choices.length !== 3) return initialProgress
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
  if (progress.phase === 'routePicker') return '15:40'
  if (progress.phase === 'park') return ['16:00', '16:20', '16:40'][progress.roundIndex]
  if (progress.phase === 'conflict') return '16:00'
  if (progress.phase === 'characterPicker') return '16:35'
  if (progress.phase === 'interaction') return ['16:45', '17:05', '17:25'][progress.roundIndex]
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
        <div className="reunion-pause-note">第 {progress.roundIndex + 1}／3 輪互動</div>
        <p className="narrative-paragraph">{round.prompt}</p>
        {selected ? (
          <>
            <April20Blocks blocks={[{ kind: 'dialogue', speaker: '你', text: selected.text }, ...selected.response]} />
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={onContinue}>
                {progress.roundIndex < 2 ? '繼續聊一會兒' : '收下這段相處'} <ChevronRight size={15} />
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
      setProgress((current) => ({ ...current, phase: 'routePicker', smsPendingChoice: null }))
    }
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

  const chooseInteraction = (index: number) => {
    if (!progress.character || progress.pendingChoice !== null) return
    const route = progress.phase === 'park' ? parkRoute : characterRoutes[progress.character]
    const choice = route.rounds[progress.roundIndex]?.choices[index]
    if (!choice) return
    setProgress((current) => ({
      ...current,
      pendingChoice: index,
      choices: [...current.choices.slice(0, current.roundIndex), index],
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

  const finish = () => {
    if (!progress.route || !progress.character || progress.choices.length !== 3) return
    onFinish({ route: progress.route, character: progress.character, choices: progress.choices })
  }

  const currentRoute = progress.route === 'park'
    ? parkRoute
    : progress.character ? characterRoutes[progress.character] : null

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
            { kind: 'narration', text: '你把手機收進包裡，心裡還惦記著佑達剛才那些沒頭沒尾的問題。想了一下，決定先去找個人，或是直接去練團室看看。' },
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
