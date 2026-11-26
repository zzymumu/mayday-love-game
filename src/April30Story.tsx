import { useEffect, useState, type ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'

export type April30Route = 'wen' | 'ashin' | 'masa' | 'stone' | 'yanming'
export type April30Selection = { route: April30Route; choices: number[] }
type April30Block = { kind: 'narration' | 'dialogue'; text: string; speaker?: string }
type April30Choice = { text: string; response: April30Block[] }
type April30Round = { title: string; scene: April30Block[]; choices: [April30Choice, April30Choice, April30Choice] }
type April30Phase = 'intro' | 'mainChoice' | 'wen' | 'otherPicker' | 'ashin' | 'schoolPicker' | 'schoolWalk' | 'yanming' | 'complete'
type April30Progress = {
  phase: April30Phase
  route: April30Route | null
  roundIndex: number
  choices: number[]
  pendingChoice: number | null
}

const STORAGE_KEY = 'mayday-april30-progress'
const initialProgress: April30Progress = {
  phase: 'intro',
  route: null,
  roundIndex: 0,
  choices: [],
  pendingChoice: null,
}

const openingBlocks: April30Block[] = [
  { kind: 'narration', text: '四月二十日之後，錢佑達就再也沒有來過練團室。' },
  { kind: 'narration', text: '一開始大家還以為他只是需要一點時間冷靜，畢竟那天吵得不太愉快，誰都沒想到事情會發展成這樣。' },
  { kind: 'narration', text: '可是接下來的幾次練團，鼓的位置始終空著。' },
  { kind: 'narration', text: '溫尚翊、陳信宏、瑪莎和石錦航輪流去找他談，希望他能再考慮一下。溫尚翊、陳信宏、瑪莎、石錦航和錢佑達，從附中時期就已經一起玩音樂了，誰都不希望事情走到這一步。' },
  { kind: 'narration', text: '結果都一樣。錢佑達始終沒有改變主意。' },
  { kind: 'narration', text: '練團室還是那個練團室，吉他、Bass、鼓和音箱都還在原來的位置，只是少了一個平常最愛把氣氛搞得亂七八糟的人。' },
  { kind: 'narration', text: '這幾天，大家說話的時候似乎都比以前少了一點。' },
  { kind: 'narration', text: '這天早上，你照常來到學校。上課前，你經過系館走廊，習慣性地往平常溫尚翊會出現的地方看了一眼。' },
  { kind: 'narration', text: '沒人。' },
  { kind: 'narration', text: '一開始你也沒太在意，可能是今天有事，或者只是比你晚到。上午的課結束，你去買了午餐，下午又回教室上課。' },
  { kind: 'narration', text: '還是沒看到他。' },
  { kind: 'narration', text: '直到最後一堂課結束，你收拾好書本走出教室，才後知後覺地發現：今天居然一整天都沒有碰到溫尚翊。' },
  { kind: 'narration', text: '平常總能在走廊、系館或者校園裡偶然遇見的人，今天像是突然消失了一樣。' },
  { kind: 'narration', text: '你站在走廊邊想了一會兒。要不要去找找他？' },
]

const wenRounds: April30Round[] = [
  {
    title: '第一輪互動：你怎麼在這裡？',
    scene: [
      { kind: 'narration', text: '你在校園裡找了一圈，最後想到了學校的天台。推開通往頂樓的鐵門時，風一下子灌了進來。' },
      { kind: 'narration', text: '你原本只是抱著試試看的心情，沒想到真的看見了他。' },
      { kind: 'narration', text: '溫尚翊坐在靠牆的位置，旁邊散著好幾個空啤酒罐，還有幾罐沒開的酒。他今天穿得很隨意，頭髮也有些亂，平常總是精神十足的人，這會兒卻只是低著頭，手裡捏著一罐啤酒。' },
      { kind: 'narration', text: '聽見開門的聲音，他抬起頭。看見是你，明顯愣了一下。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '……妳怎麼跑來這裡？' },
      { kind: 'narration', text: '你走近了一點，目光落在他旁邊那些酒罐上。他順著你的視線看了一眼，沒解釋，只是把手裡的罐子放到旁邊。' },
    ],
    choices: [
      { text: '我今天一整天都沒看到你。', response: [
        { kind: 'dialogue', speaker: '溫尚翊', text: '所以妳就特地跑來找我喔？' },
        { kind: 'narration', text: '他扯了一下嘴角，像是想開個玩笑，最後卻沒真的笑出來。' },
      ] },
      { text: '你今天翹課翹得很徹底欸。', response: [
        { kind: 'dialogue', speaker: '溫尚翊', text: '蛤？妳是來抓我回去上課的喔？' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '今天不想去啦。' },
        { kind: 'narration', text: '他低下頭，拿鞋尖碰了碰地上的空罐。' },
      ] },
      { text: '你旁邊這些酒是怎麼回事？', response: [
        { kind: 'dialogue', speaker: '溫尚翊', text: '就喝一點啊。' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '妳不要一上來就念我啦。' },
        { kind: 'narration', text: '他說完，自己也看了一眼旁邊的酒，沒再伸手去拿。' },
      ] },
    ],
  },
  {
    title: '第二輪互動：他今天為什麼沒來？',
    scene: [
      { kind: 'narration', text: '你在他旁邊找了個位置坐下來。平常兩個人見面，總有說不完的話，不是互相吐槽，就是為了某件小事爭上兩句。' },
      { kind: 'narration', text: '但今天，他似乎連鬥嘴的力氣都沒有。' },
    ],
    choices: [
      { text: '你是在躲大家嗎？', response: [
        { kind: 'dialogue', speaker: '溫尚翊', text: '沒有啦。' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '只是現在不太想看到練團室那些東西。' },
      ] },
      { text: '你至少也該跟大家說一聲吧。', response: [
        { kind: 'dialogue', speaker: '溫尚翊', text: '我又不是小孩子，還要跟人報備喔？' },
        { kind: 'narration', text: '他下意識回了一句，停了一下，又放低聲音。' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '……好啦，我知道。' },
      ] },
      { text: '你今天一直待在這裡嗎？', response: [
        { kind: 'dialogue', speaker: '溫尚翊', text: '沒有很久啦。' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '就想找個地方坐一下。' },
        { kind: 'narration', text: '他抬頭看了一眼遠處的校園，又把視線收回來。' },
      ] },
    ],
  },
  {
    title: '第三輪互動：錢佑達的決定',
    scene: [
      { kind: 'dialogue', speaker: '溫尚翊', text: '佑達不會回來了。' },
      { kind: 'narration', text: '你轉過頭看他。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '他已經決定退團了。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '不是暫時休息，也不是想等大家消氣。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '他跟我講得很清楚。' },
      { kind: 'narration', text: '他的語氣很平靜，反而讓人不知道該怎麼接話。' },
    ],
    choices: [
      { text: '他真的決定好了嗎？', response: [
        { kind: 'dialogue', speaker: '溫尚翊', text: '嗯。' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '這次是真的。' },
      ] },
      { text: '大家不是還在勸他嗎？', response: [
        { kind: 'dialogue', speaker: '溫尚翊', text: '勸過了啊。' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '大家都去找過他，該講的也都講了。' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '可是他不想回來，我們也沒辦法。' },
      ] },
      { text: '所以以後練團就沒有他了？', response: [
        { kind: 'dialogue', speaker: '溫尚翊', text: '……對。' },
        { kind: 'narration', text: '他停頓了一下。' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '以後就少一個人了。' },
      ] },
    ],
  },
  {
    title: '第四輪互動：從附中開始的伙伴',
    scene: [
      { kind: 'narration', text: '溫尚翊把手臂搭在膝蓋上，過了好一會兒才繼續說。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '我們幾個從附中就一起玩音樂了。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '那時候哪有想那麼多啊，放學就跑去練團，整天搞得亂七八糟的。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '有時候練到很晚，隔天上課還不是照樣爬不起來。' },
      { kind: 'narration', text: '他笑了一聲，聲音卻很輕。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '那時候覺得反正大家都會一直玩下去啊。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '誰知道現在會變成這樣。' },
    ],
    choices: [
      { text: '你們認識這麼久，應該很難接受吧。', response: [
        { kind: 'dialogue', speaker: '溫尚翊', text: '廢話。' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '妳以為我現在為什麼坐在這裡？' },
        { kind: 'narration', text: '他轉過頭看了你一眼，又把視線移開。' },
      ] },
      { text: '你是不是很捨不得他？', response: [
        { kind: 'dialogue', speaker: '溫尚翊', text: '……嗯啊。' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '一起玩那麼久了，哪有可能說沒差就沒差。' },
        { kind: 'narration', text: '這次他沒有嘴硬。' },
      ] },
      { text: '你們以前是不是常常一起練到很晚？', response: [
        { kind: 'dialogue', speaker: '溫尚翊', text: '超常啊。' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '那時候根本不知道累，現在想想真的有夠白痴。' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '可是那時候滿好玩的。' },
      ] },
    ],
  },
  {
    title: '第五輪互動：溫尚翊的迷惘',
    scene: [
      { kind: 'narration', text: '他伸手撥了一下額前有些凌亂的頭髮。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '而且我回家也很煩。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '我爸本來就不太支持我玩音樂。' },
      { kind: 'narration', text: '你看著他，等他繼續說下去。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '他是律師啊，從以前就希望我考台大法律系，最好以後也跟他一樣。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '結果我又沒考上。' },
      { kind: 'narration', text: '他低頭笑了一下，聽不出多少輕鬆的意思。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '反正他一直覺得玩音樂不是什麼正經事。' },
      { kind: 'narration', text: '你突然想起了什麼。難怪。之前你就有點好奇，溫尚翊怎麼會跑去選修法律，原來還有這一層原因。' },
    ],
    choices: [
      { text: '難怪你會選修法律……我之前還在想你怎麼會去修那門課。', response: [
        { kind: 'dialogue', speaker: '溫尚翊', text: '妳現在才想到喔？' },
        { kind: 'narration', text: '他終於有了一點平常的語氣。' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '不然咧，妳以為我很喜歡研究那些東西喔？' },
      ] },
      { text: '所以你爸爸到現在還是希望你走法律這條路？', response: [
        { kind: 'dialogue', speaker: '溫尚翊', text: '差不多吧。' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '他是覺得那條路比較穩啦。' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '可是我也不知道我到底適不適合。' },
      ] },
      { text: '那你自己呢？你想做什麼？', response: [
        { kind: 'dialogue', speaker: '溫尚翊', text: '我？' },
        { kind: 'narration', text: '他沉默了一下。' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '我就想繼續玩音樂啊。' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '可是現在連團裡都變成這樣了……' },
        { kind: 'narration', text: '他沒有把話說完。' },
      ] },
    ],
  },
]

const ashinIntroBlocks: April30Block[] = [
  { kind: 'narration', text: '下午，你去了練團室。推開門的時候，裡面沒有平常那種吵吵鬧鬧的聲音，只有一把木吉他的聲音。' },
  { kind: 'narration', text: '陳信宏一個人坐在椅子上，吉他搭在腿上，低著頭反覆彈著同一段旋律。彈到一半，他停下來，手指在琴弦上輕輕撥了兩下，又重新來過。' },
  { kind: 'narration', text: '你站在門口聽了一會兒。他終於注意到你。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '欸？妳怎麼來了？' },
  { kind: 'dialogue', speaker: '你', text: '我還以為今天會有人練團，結果只有你一個人。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '今天沒有正式練啦。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '我只是想說過來彈一下。' },
  { kind: 'narration', text: '他把吉他放低了一點，往旁邊挪出位置。' },
  { kind: 'dialogue', speaker: '你', text: '你剛剛一直在彈同一段欸。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '有嗎？' },
  { kind: 'narration', text: '他低頭看了一眼自己的手。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '可能剛剛在想事情吧，彈到一半就忘記了。' },
  { kind: 'narration', text: '你注意到練團室裡少了很多平常熟悉的聲音。沒有錢佑達的鼓聲，也沒有溫尚翊在旁邊試效果器。' },
  { kind: 'dialogue', speaker: '你', text: '是佑達的事情嗎？' },
  { kind: 'narration', text: '陳信宏沒有馬上回答。過了一會兒，他才輕輕點了點頭。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '嗯。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '佑達已經決定退團了。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '今天他把話說得很清楚，不會再回來了。' },
  { kind: 'dialogue', speaker: '你', text: '真的沒有辦法了嗎？' },
  { kind: 'dialogue', speaker: '陳信宏', text: '大家都試過了馁。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '可是他既然已經決定了，我們也不能一直逼他。' },
  { kind: 'narration', text: '他低頭撥了一下琴弦。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '我們幾個從附中就一起玩音樂了，突然少一個人，真的會有點不習慣。' },
]

const ashinChoices: [April30Choice, April30Choice, April30Choice] = [
  { text: '你也很捨不得他吧？', response: [
    { kind: 'dialogue', speaker: '陳信宏', text: '嗯啊。' },
    { kind: 'dialogue', speaker: '陳信宏', text: '畢竟一起玩了那麼久，哪有可能說沒差就沒差。' },
  ] },
  { text: '怪獸今天也沒來學校。', response: [
    { kind: 'dialogue', speaker: '陳信宏', text: '他今天也沒來喔？' },
    { kind: 'dialogue', speaker: '陳信宏', text: '我猜他現在應該也不太好受吧。' },
  ] },
  { text: '你還彈得下去嗎？', response: [
    { kind: 'dialogue', speaker: '陳信宏', text: '還是會彈啊。' },
    { kind: 'dialogue', speaker: '陳信宏', text: '只是有時候彈到一半，會突然想到以前大家都在的時候。' },
  ] },
]

const schoolIntroBlocks: April30Block[] = [
  { kind: 'narration', text: '下午，你想起瑪莎和石頭還在附中上課，於是決定過去找他們。' },
  { kind: 'narration', text: '輔導班剛好下課，走廊裡擠滿了收拾書包的學生。你站在教室外面等了一會兒，終於看見兩個人一起走出來。' },
  { kind: 'narration', text: '瑪莎手裡拿著講義，石頭正低頭把筆收進筆袋。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '……欸？' },
  { kind: 'dialogue', speaker: '瑪莎', text: '妳怎麼會跑來這裡？' },
  { kind: 'dialogue', speaker: '你', text: '我來找你們啊。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '台大太無聊喔？' },
  { kind: 'narration', text: '石頭看見你，笑了一下。' },
  { kind: 'dialogue', speaker: '石錦航', text: '妳等很久了嗎？' },
  { kind: 'dialogue', speaker: '你', text: '沒有啦，我剛到。' },
  { kind: 'narration', text: '你們三個站在走廊邊說了幾句話。瑪莎把講義捲起來，敲了敲自己的書包。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '對了，有件事妳應該還不知道。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '佑達退團了。' },
  { kind: 'dialogue', speaker: '你', text: '真的？' },
  { kind: 'dialogue', speaker: '石錦航', text: '嗯，他已經跟大家說清楚了。' },
  { kind: 'dialogue', speaker: '石錦航', text: '這陣子大家都勸過他，不過他還是決定不繼續了。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '那傢伙這次還真的挺乾脆的。' },
  { kind: 'narration', text: '他說完，自己也安靜了一下。' },
  { kind: 'dialogue', speaker: '石錦航', text: '怪獸今天也沒來學校吧？' },
  { kind: 'dialogue', speaker: '你', text: '嗯。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '我們幾個從附中就一起玩音樂了，現在突然少一個人，哪有那麼容易習慣。' },
  { kind: 'narration', text: '石頭看了瑪莎一眼，沒有接著調侃。' },
]

const masaWalkBlocks: April30Block[] = [
  { kind: 'narration', text: '瑪莎把書包往肩上一甩，走到你旁邊。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '走啦，妳不是要回去嗎？' },
  { kind: 'dialogue', speaker: '瑪莎', text: '站在這裡當路燈喔？' },
  { kind: 'narration', text: '一路上，他還是跟平常一樣嘴上不饒人，但說到錢佑達的時候，明顯沒有以前那麼愛開玩笑。' },
]

const stoneWalkBlocks: April30Block[] = [
  { kind: 'narration', text: '石頭把講義整理好，等你一起走出校門。他走路不快，偶爾會側過頭聽你說話。' },
  { kind: 'dialogue', speaker: '石錦航', text: '其實大家都不太習慣。' },
  { kind: 'dialogue', speaker: '石錦航', text: '以前練團的時候，佑達總是很有精神。' },
  { kind: 'dialogue', speaker: '石錦航', text: '現在突然安靜下來，反而有點不習慣了。' },
]

const yanmingIntroBlocks: April30Block[] = [
  { kind: 'narration', text: '下午，你剛從系館出來，就看見諺明哥站在外面。他看見你，朝你招了招手。' },
  { kind: 'dialogue', speaker: '你', text: '諺明哥？你怎麼來學校了？' },
  { kind: 'dialogue', speaker: '劉諺明', text: '剛好有件事想跟妳說。' },
  { kind: 'narration', text: '他沒有繞彎子。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '佑達正式退團了。' },
  { kind: 'dialogue', speaker: '你', text: '已經確定了嗎？' },
  { kind: 'dialogue', speaker: '劉諺明', text: '嗯，他已經把話說清楚了。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '這陣子大家輪流去找他談過，不過看起來，他是真的想好了。' },
  { kind: 'dialogue', speaker: '你', text: '所以以後都不來練團了？' },
  { kind: 'dialogue', speaker: '劉諺明', text: '應該是不會了。' },
  { kind: 'narration', text: '他頓了頓。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '你們幾個從附中就一起玩音樂，這件事對大家來說，恐怕不只是少一個鼓手而已。' },
]

const yanmingChoices: [April30Choice, April30Choice, April30Choice] = [
  { text: '怪獸今天也沒來學校。', response: [
    { kind: 'dialogue', speaker: '劉諺明', text: '我猜也是。' },
    { kind: 'dialogue', speaker: '劉諺明', text: '他現在可能需要一點時間整理自己的心情。' },
  ] },
  { text: '大家都勸過他了，還是沒用嗎？', response: [
    { kind: 'dialogue', speaker: '劉諺明', text: '嗯，有些事情不是別人多講幾次就能改變的。' },
  ] },
  { text: '那接下來練團怎麼辦？', response: [
    { kind: 'dialogue', speaker: '劉諺明', text: '先照大家的步調來吧。' },
    { kind: 'dialogue', speaker: '劉諺明', text: '現在最重要的不是急著找人補上位置。' },
  ] },
]

const wenEndingBlocks: April30Block[] = [
  { kind: 'narration', text: '你看著他，突然不知道該怎麼安慰。平常那個會為了一個和弦跟人爭半天、抓娃娃輸了還不肯認輸、說話直得讓人想揍他的溫尚翊，今天卻像是把所有話都收了回去。' },
  { kind: 'narration', text: '你沒有再追問。過了一會兒，他把旁邊沒開的酒往遠處推了推。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '妳要坐就坐啦。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '不要一直站著，擋到風了。' },
  { kind: 'narration', text: '他往旁邊挪了一點位置。你在他身邊坐下來。這一次，他沒有再急著找話題，也沒有催你離開。' },
  { kind: 'narration', text: '天台上的風吹過來，遠處還能聽見校園裡學生說話的聲音。' },
]

const ashinEndingBlocks: April30Block[] = [
  { kind: 'narration', text: '他把吉他重新抱好，低頭調整了一下琴弦。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '要不要聽我彈一次剛剛那段？' },
  { kind: 'dialogue', speaker: '陳信宏', text: '這次應該不會再彈錯了。' },
  { kind: 'narration', text: '他抬頭看了你一眼，手指重新落在琴弦上。練團室裡又響起木吉他的聲音。' },
]

const yanmingEndingBlocks: April30Block[] = [
  { kind: 'narration', text: '諺明哥沒有急著再說什麼，只是陪你在系館外站了一會兒。那件事沒有因為幾句話就變得容易，但至少你知道，大家都還在想辦法適應。' },
]

function readProgress(): April30Progress {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as Partial<April30Progress> | null
    const phases: April30Phase[] = ['intro', 'mainChoice', 'wen', 'otherPicker', 'ashin', 'schoolPicker', 'schoolWalk', 'yanming', 'complete']
    const routes: April30Route[] = ['wen', 'ashin', 'masa', 'stone', 'yanming']
    if (saved && typeof saved.phase === 'string' && phases.includes(saved.phase as April30Phase)
      && (saved.route === null || routes.includes(saved.route as April30Route))
      && Number.isInteger(saved.roundIndex) && Array.isArray(saved.choices)
      && (saved.pendingChoice === null || Number.isInteger(saved.pendingChoice))) {
      return {
        phase: saved.phase as April30Phase,
        route: saved.route as April30Route | null,
        roundIndex: Math.max(0, Math.min(4, saved.roundIndex as number)),
        choices: saved.choices.filter((value): value is number => Number.isInteger(value) && value >= 0 && value <= 2),
        pendingChoice: saved.pendingChoice as number | null,
      }
    }
  } catch {
    // Start from the opening scene if the saved progress is unreadable.
  }
  return initialProgress
}

function clockForProgress(progress: April30Progress): string {
  if (progress.phase === 'intro') return '08:10'
  if (progress.phase === 'mainChoice') return '16:20'
  if (progress.phase === 'wen') return ['16:30', '16:40', '16:50', '17:00', '17:10'][progress.roundIndex] ?? '17:10'
  if (progress.phase === 'otherPicker' || progress.phase === 'schoolPicker') return '16:30'
  if (progress.phase === 'ashin' || progress.phase === 'yanming') return '16:45'
  if (progress.phase === 'schoolWalk') return '17:10'
  return '17:30'
}

function April30Blocks({ blocks }: { blocks: April30Block[] }) {
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

function April30Frame({ title, kicker, children }: { title: string; kicker: string; children: ReactNode }) {
  return (
    <div className="story-screen-overlay">
      <div className="story-screen-head">
        <div className="chapter-mark">4 月 30 日・星期三</div>
        <div className="story-contact-title">
          <strong>{title}</strong>
          <small>1997 年 4 月 30 日・下午</small>
        </div>
        <span className="story-head-spacer" />
      </div>
      <div className="story-narrative-scroll">
        <div className="story-kicker">{kicker}</div>
        {children}
      </div>
    </div>
  )
}

export function April30Story({
  onClockChange,
  onFinish,
}: {
  onClockChange: (time: string) => void
  onFinish: (selection: April30Selection) => void
}) {
  const [progress, setProgress] = useState<April30Progress>(readProgress)
  const commit = (next: April30Progress) => setProgress(next)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    onClockChange(clockForProgress(progress))
  }, [progress, onClockChange])

  const chooseMainRoute = (findWen: boolean) => {
    if (findWen) commit({ ...initialProgress, phase: 'wen', route: 'wen' })
    else commit({ ...initialProgress, phase: 'otherPicker' })
  }

  const chooseOtherRoute = (route: April30Route | 'school') => {
    if (route === 'school') commit({ ...initialProgress, phase: 'schoolPicker' })
    else if (route === 'ashin' || route === 'yanming') commit({ ...initialProgress, phase: route, route })
  }

  const chooseSchoolCompanion = (route: 'masa' | 'stone') => {
    commit({ ...initialProgress, phase: 'schoolWalk', route })
  }

  const chooseRound = (index: number) => {
    if (progress.pendingChoice !== null) return
    commit({ ...progress, pendingChoice: index })
  }

  const continueRound = () => {
    if (progress.pendingChoice === null) return
    const nextChoices = [...progress.choices, progress.pendingChoice]
    if (progress.phase === 'wen') {
      if (progress.roundIndex < wenRounds.length - 1) {
        commit({ ...progress, roundIndex: progress.roundIndex + 1, choices: nextChoices, pendingChoice: null })
      } else {
        commit({ ...progress, phase: 'complete', route: 'wen', choices: nextChoices, pendingChoice: null })
      }
      return
    }
    if (progress.phase === 'ashin' || progress.phase === 'yanming') {
      commit({ ...progress, phase: 'complete', choices: nextChoices, pendingChoice: null })
    }
  }

  const finish = () => {
    if (!progress.route) return
    onFinish({ route: progress.route, choices: progress.choices })
  }

  const roundForSingleRoute = progress.phase === 'ashin' ? ashinChoices : progress.phase === 'yanming' ? yanmingChoices : null
  const singleSelected = progress.pendingChoice !== null && roundForSingleRoute ? roundForSingleRoute[progress.pendingChoice] : null

  if (progress.phase === 'intro') {
    return (
      <April30Frame title="少了一個人的練團室" kicker="APRIL 30 · THE EMPTY DRUM KIT">
        <h2 className="story-scene-title">少了一個人的練團室</h2>
        <April30Blocks blocks={openingBlocks} />
        <div className="story-action-bar story-inline-action">
          <button className="story-primary-button" onClick={() => commit({ ...progress, phase: 'mainChoice' })}>放學了，去看看吧 <ChevronRight size={15} /></button>
        </div>
      </April30Frame>
    )
  }

  if (progress.phase === 'mainChoice') {
    return (
      <April30Frame title="放學後的決定" kicker="AFTER CLASS · ONE PERSON IS MISSING">
        <h2 className="story-scene-title">今天下午，你打算……</h2>
        <April30Blocks blocks={[{ kind: 'narration', text: '你站在走廊邊想了一會兒。要不要去找找溫尚翊？' }]} />
        <div className="march29-reply-list">
          <button className="reply-choice" onClick={() => chooseMainRoute(true)}><span>去找溫尚翊</span><ChevronRight size={15} /></button>
          <button className="reply-choice" onClick={() => chooseMainRoute(false)}><span>不去找他，去看看其他人</span><ChevronRight size={15} /></button>
        </div>
      </April30Frame>
    )
  }

  if (progress.phase === 'wen') {
    const currentRound = wenRounds[progress.roundIndex]
    const selected = progress.pendingChoice !== null ? currentRound.choices[progress.pendingChoice] : null
    return (
      <April30Frame title="學校天台・溫尚翊" kicker="ROOFTOP · WITH WEN">
        <h2 className="story-scene-title">天台上的風</h2>
        {progress.choices.map((choiceIndex, index) => {
          const round = wenRounds[index]
          const choice = round?.choices[choiceIndex]
          if (!round || !choice) return null
          return (
            <div className="month-visit-round-history" key={index}>
              <div className="choice-heading">{round.title}</div>
              <April30Blocks blocks={round.scene} />
              <April30Blocks blocks={[{ kind: 'dialogue', speaker: '你', text: choice.text }, ...choice.response]} />
            </div>
          )
        })}
        <div className="month-visit-round-history">
          <div className="choice-heading">{currentRound.title}（第 {progress.roundIndex + 1}／5 輪）</div>
          <April30Blocks blocks={currentRound.scene} />
          {selected ? (
            <>
              <April30Blocks blocks={[{ kind: 'dialogue', speaker: '你', text: selected.text }, ...selected.response]} />
              <div className="story-action-bar story-inline-action">
                <button className="story-primary-button" onClick={continueRound}>{progress.roundIndex < 4 ? '繼續下一輪' : '繼續'} <ChevronRight size={15} /></button>
              </div>
            </>
          ) : (
            <div className="choice-area">
              <div className="choice-heading">你想怎麼回答？</div>
              {currentRound.choices.map((choice, index) => (
                <button className="reply-choice" key={index} onClick={() => chooseRound(index)}>
                  <span>{choice.text}</span><ChevronRight size={15} />
                </button>
              ))}
            </div>
          )}
        </div>
      </April30Frame>
    )
  }

  if (progress.phase === 'otherPicker') {
    return (
      <April30Frame title="下午的安排" kicker="AFTER CLASS · WHERE TO GO">
        <h2 className="story-scene-title">不去找他，你想去哪裡？</h2>
        <April30Blocks blocks={[{ kind: 'narration', text: '你想了想，決定去看看其他人。' }]} />
        <div className="march29-reply-list">
          <button className="reply-choice" onClick={() => chooseOtherRoute('ashin')}><span>去練團室找陳信宏</span><ChevronRight size={15} /></button>
          <button className="reply-choice" onClick={() => chooseOtherRoute('school')}><span>去附中輔導班找瑪莎和石頭</span><ChevronRight size={15} /></button>
          <button className="reply-choice" onClick={() => chooseOtherRoute('yanming')}><span>留在學校，遇見來找你的諺明哥</span><ChevronRight size={15} /></button>
        </div>
      </April30Frame>
    )
  }

  if (progress.phase === 'ashin' || progress.phase === 'yanming') {
    const isAshin = progress.phase === 'ashin'
    const blocks = isAshin ? ashinIntroBlocks : yanmingIntroBlocks
    const choices = roundForSingleRoute
    return (
      <April30Frame title={isAshin ? '一個人的練團室' : '系館外・劉諺明'} kicker={isAshin ? 'THE REHEARSAL ROOM · ASHIN' : 'A VISIT TO CAMPUS · YANMING'}>
        <h2 className="story-scene-title">{isAshin ? '木吉他的聲音' : '帶來消息的人'}</h2>
        <April30Blocks blocks={blocks} />
        {singleSelected ? (
          <>
            <April30Blocks blocks={[{ kind: 'dialogue', speaker: '你', text: choices?.[progress.pendingChoice as number].text ?? '' }, ...singleSelected.response]} />
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={continueRound}>繼續 <ChevronRight size={15} /></button>
            </div>
          </>
        ) : (
          <div className="choice-area">
            <div className="choice-heading">你想怎麼回答？</div>
            {choices?.map((choice, index) => (
              <button className="reply-choice" key={index} onClick={() => chooseRound(index)}>
                <span>{choice.text}</span><ChevronRight size={15} />
              </button>
            ))}
          </div>
        )}
      </April30Frame>
    )
  }

  if (progress.phase === 'schoolPicker') {
    return (
      <April30Frame title="附中輔導班・放學後" kicker="AFTER SCHOOL · AT THE AFFILIATED HIGH SCHOOL">
        <h2 className="story-scene-title">今天放學，你想跟誰一起走？</h2>
        <April30Blocks blocks={schoolIntroBlocks} />
        <div className="choice-area">
          <div className="choice-heading">選一個人，陪你走一段路</div>
          <button className="reply-choice" onClick={() => chooseSchoolCompanion('masa')}><span>跟瑪莎一起走</span><ChevronRight size={15} /></button>
          <button className="reply-choice" onClick={() => chooseSchoolCompanion('stone')}><span>跟石頭一起走</span><ChevronRight size={15} /></button>
        </div>
      </April30Frame>
    )
  }

  if (progress.phase === 'schoolWalk') {
    const blocks = progress.route === 'masa' ? masaWalkBlocks : stoneWalkBlocks
    return (
      <April30Frame title={progress.route === 'masa' ? '放學路上・瑪莎' : '放學路上・石頭'} kicker="WALKING HOME · AFTER CLASS">
        <h2 className="story-scene-title">{progress.route === 'masa' ? '跟瑪莎一起走' : '跟石頭一起走'}</h2>
        <April30Blocks blocks={blocks} />
        <div className="reunion-pause-note">錢佑達退團的消息，讓大家都還有些不習慣。今天的話題沒有因此變得輕鬆。</div>
        <div className="story-action-bar story-inline-action">
          <button className="story-primary-button" onClick={finish}>結束今天 <ChevronRight size={15} /></button>
        </div>
      </April30Frame>
    )
  }

  if (progress.phase === 'complete' && progress.route) {
    const title = progress.route === 'wen' ? '天台上的午後'
      : progress.route === 'ashin' ? '一個人的練團室'
        : '帶著消息的午後'
    const ending = progress.route === 'wen' ? wenEndingBlocks
      : progress.route === 'ashin' ? ashinEndingBlocks
        : yanmingEndingBlocks
    return (
      <April30Frame title="今天先到這裡" kicker="APRIL 30 · END OF DAY">
        <h2 className="story-scene-title">{title}</h2>
        <April30Blocks blocks={ending} />
        <div className="reunion-pause-note">錢佑達正式退團的消息，已經成為大家都必須面對的現實。無論今天選擇去哪裡，這件事都不會改變。</div>
        <div className="story-action-bar story-inline-action">
          <button className="story-primary-button" onClick={finish}>結束今天 <ChevronRight size={15} /></button>
        </div>
      </April30Frame>
    )
  }

  return null
}
