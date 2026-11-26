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
  pendingComfortChoice: number | null
}

const STORAGE_KEY = 'mayday-april30-progress-v2'
const initialProgress: April30Progress = {
  phase: 'intro',
  route: null,
  roundIndex: 0,
  choices: [],
  pendingChoice: null,
  pendingComfortChoice: null,
}

const n = (text: string): April30Block => ({ kind: 'narration', text })
const d = (speaker: string, text: string): April30Block => ({ kind: 'dialogue', speaker, text })
const c = (text: string, response: April30Block[]): April30Choice => ({ text, response })

const openingBlocks: April30Block[] = [
  n('四月二十日之後，錢佑達就再也沒有來過練團室。'),
  n('一開始大家還以為他只是需要一點時間冷靜，畢竟那天吵得不太愉快，誰都沒想到事情會發展成這樣。'),
  n('可是接下來的幾次練團，鼓的位置始終空著。'),
  n('溫尚翊、陳信宏、瑪莎和石錦航輪流去找他談，希望他能再考慮一下。溫尚翊、陳信宏、瑪莎、石錦航和錢佑達，從附中時期就已經一起玩音樂了，誰都不希望事情走到這一步。'),
  n('結果都一樣。錢佑達始終沒有改變主意。'),
  n('練團室還是那個練團室，吉他、Bass、鼓和音箱都還在原來的位置，只是少了一個平常最愛把氣氛搞得亂七八糟的人。'),
  n('這幾天，大家說話的時候似乎都比以前少了一點。'),
  n('這天早上，你照常來到學校。上課前，你經過系館走廊，習慣性地往平常溫尚翊會出現的地方看了一眼。'),
  n('沒人。'),
  n('一開始你也沒太在意，可能是今天有事，或者只是比你晚到。上午的課結束，你去買了午餐，下午又回教室上課。'),
  n('還是沒看到他。'),
  n('直到最後一堂課結束，你收拾好書本走出教室，才後知後覺地發現：今天居然一整天都沒有碰到溫尚翊。'),
  n('平常總能在走廊、系館或者校園裡偶然遇見的人，今天像是突然消失了一樣。'),
  n('你站在走廊邊想了一會兒。要不要去找找他？'),
]

const wenRounds: April30Round[] = [
  {
    title: '第一輪互動：你怎麼在這裡？',
    scene: [
      n('你在校園裡找了一圈，最後想到了學校的天台。推開通往頂樓的鐵門時，風一下子灌了進來。'),
      n('你原本只是抱著試試看的心情，沒想到真的看見了他。'),
      n('溫尚翊坐在靠牆的位置，旁邊散著好幾個空啤酒罐，還有幾罐沒開的酒。他今天穿得很隨意，頭髮也有些亂，平常總是精神十足的人，這會兒卻只是低著頭，手裡捏著一罐啤酒。'),
      n('聽見開門的聲音，他抬起頭。看見是你，明顯愣了一下。'),
      d('溫尚翊', '……妳怎麼跑來這裡？'),
      n('你走近了一點，目光落在他旁邊那些酒罐上。他順著你的視線看了一眼，沒解釋，只是把手裡的罐子放到旁邊。'),
    ],
    choices: [
      c('我今天一整天都沒看到你。', [
        d('溫尚翊', '所以妳就特地跑來找我喔？'),
        n('他扯了一下嘴角，像是想開個玩笑，最後卻沒真的笑出來。'),
        d('溫尚翊', '……還是妳今天剛好經過？'),
      ]),
      c('你今天翹課翹得很徹底欸。', [
        d('溫尚翊', '蛤？妳是來抓我回去上課的喔？'),
        d('溫尚翊', '今天不想去啦。'),
        n('他低下頭，拿鞋尖碰了碰地上的空罐。'),
      ]),
      c('你旁邊這些酒是怎麼回事？', [
        d('溫尚翊', '就喝一點啊。'),
        d('溫尚翊', '妳不要一上來就念我啦。'),
        n('他說完，自己也看了一眼旁邊的酒，沒再伸手去拿。'),
        n('你注意到他的眼尾有些泛紅。他發現你在看，便稍稍偏過臉。'),
      ]),
    ],
  },
  {
    title: '第二輪互動：他今天為什麼沒來？',
    scene: [
      n('你在他旁邊找了個位置坐下來。平常兩個人見面，總有說不完的話，不是互相吐槽，就是為了某件小事爭上兩句。'),
      n('但今天，他似乎連鬥嘴的力氣都沒有。'),
      n('你把書包放在身邊，沒有急著開口。過了一會兒，他用鞋尖輕輕碰了一下地上的易拉罐。'),
    ],
    choices: [
      c('你是在躲大家嗎？', [
        d('溫尚翊', '沒有啦。'),
        d('溫尚翊', '只是現在不太想看到練團室那些東西。'),
        n('他抬頭看了一眼遠處，聲音低了下來。'),
        d('溫尚翊', '一進去就會想到一堆有的沒的。'),
      ]),
      c('你至少也該跟大家說一聲吧。', [
        d('溫尚翊', '我又不是小孩子，還要跟人報備喔？'),
        n('他下意識回了一句，停了一下，又放低聲音。'),
        d('溫尚翊', '……好啦，我知道。'),
        d('溫尚翊', '只是現在真的不知道要講什麼。'),
      ]),
      c('你今天一直待在這裡嗎？', [
        d('溫尚翊', '沒有很久啦。'),
        d('溫尚翊', '上午就來坐了一下。'),
        d('溫尚翊', '本來想說坐一下就回去，結果不知不覺就這麼久了。'),
        n('他抬頭看了一眼遠處的校園，又把視線收回來。'),
      ]),
    ],
  },
  {
    title: '第三輪互動：錢佑達的決定',
    scene: [
      n('天台上安靜了一會兒，只有風掠過鐵門時發出的輕微聲響。溫尚翊忽然開口。'),
      d('溫尚翊', '佑達不會回來了。'),
      n('你轉過頭看他。'),
      d('溫尚翊', '他已經決定退團了。'),
      d('溫尚翊', '不是暫時休息，也不是想等大家消氣。'),
      d('溫尚翊', '他跟我講得很清楚。'),
      n('他的語氣很平靜，反而讓人不知道該怎麼接話。'),
    ],
    choices: [
      c('他真的決定好了嗎？', [
        d('溫尚翊', '嗯。'),
        d('溫尚翊', '這次是真的。'),
      ]),
      c('大家不是還在勸他嗎？', [
        d('溫尚翊', '勸過了啊。'),
        d('溫尚翊', '大家都去找過他，該講的也都講了。'),
        d('溫尚翊', '可是他不想回來，我們也沒辦法。'),
      ]),
      c('所以以後練團就沒有他了？', [
        d('溫尚翊', '……對。'),
        n('他停頓了一下。'),
        d('溫尚翊', '以後就少一個人了。'),
      ]),
    ],
  },
  {
    title: '第四輪互動：從附中開始的伙伴',
    scene: [
      n('溫尚翊把手臂搭在膝蓋上，視線落在遠處的操場。'),
      d('溫尚翊', '我們幾個從附中就一起玩音樂了。'),
      d('溫尚翊', '那時候哪有想那麼多啊，放學就跑去練團，整天搞得亂七八糟的。'),
      d('溫尚翊', '有時候練到很晚，隔天上課還不是照樣爬不起來。'),
      n('他笑了一聲，聲音卻很輕。'),
      d('溫尚翊', '那時候覺得反正大家都會一直玩下去啊。'),
      d('溫尚翊', '誰知道現在會變成這樣。'),
    ],
    choices: [
      c('你們認識這麼久，應該很難接受吧。', [
        d('溫尚翊', '廢話。'),
        d('溫尚翊', '妳以為我現在為什麼坐在這裡？'),
        n('他轉過頭看了你一眼，又把視線移開。'),
      ]),
      c('你是不是很捨不得他？', [
        d('溫尚翊', '……嗯啊。'),
        d('溫尚翊', '一起玩那麼久了，哪有可能說沒差就沒差。'),
        n('這一次，他沒有嘴硬。'),
      ]),
      c('你們以前是不是常常一起練到很晚？', [
        d('溫尚翊', '超常啊。'),
        d('溫尚翊', '有時候根本不知道自己在彈什麼了，還是硬要繼續。'),
        d('溫尚翊', '現在想想真的有夠白痴。'),
        d('溫尚翊', '可是那時候滿好玩的。'),
      ]),
    ],
  },
  {
    title: '第五輪互動：溫尚翊的迷惘',
    scene: [
      n('溫尚翊伸手撥了一下額前有些凌亂的頭髮。'),
      d('溫尚翊', '而且我回家也很煩。'),
      d('溫尚翊', '我爸本來就不太支持我玩音樂。'),
      n('你看著他，等他繼續說下去。他把手裡的罐子放在腳邊，雙手交握著，像是在想該怎麼說。'),
      d('溫尚翊', '他是律師啊，從以前就希望我考台大法律系，最好以後也跟他一樣。'),
      d('溫尚翊', '結果我又沒考上。'),
      n('他低頭笑了一下，聽不出多少輕鬆的意思。'),
      d('溫尚翊', '反正他一直覺得玩音樂不是什麼正經事。'),
      n('他說完，抬手揉了一下眼睛。眼尾有些發紅，天台的風一直吹，他卻沒有抬頭。'),
      n('你突然想起了什麼。難怪。之前你就有點好奇，溫尚翊怎麼會跑去選修法律，原來還有這一層原因。'),
    ],

    choices: [
      c('難怪你會選修法律……我之前還在想你怎麼會去修那門課。', [
        d('溫尚翊', '妳現在才想到喔？'),
        n('他終於有了一點平常的語氣，卻沒有真的笑出來。'),
        d('溫尚翊', '不然咧，妳以為我很喜歡研究那些東西喔？'),
      ]),
      c('所以你爸爸到現在還是希望你走法律這條路？', [
        d('溫尚翊', '差不多吧。'),
        d('溫尚翊', '他是覺得那條路比較穩啦。'),
        d('溫尚翊', '可是我也不知道我到底適不適合。'),
      ]),
      c('那你自己呢？你想做什麼？', [
        d('溫尚翊', '我？'),
        n('他沉默了很久，視線落在自己的手背上。'),
        d('溫尚翊', '我就想繼續玩音樂啊。'),
        d('溫尚翊', '可是現在連團裡都變成這樣了……'),
        n('他的聲音漸漸低下去。他抬手揉了一下眼睛，像是想把那點不舒服揉掉。'),
        d('溫尚翊', '……靠，今天風真的很大欸。'),
        n('他說完，卻沒有再抬頭。你沒有拆穿他。'),
      ]),
    ],
  },
]

const ashinIntroBlocks: April30Block[] = [
  n('下午，你去了練團室。推開門的時候，裡面沒有平常那種吵吵鬧鬧的聲音，只有一把木吉他的聲音。'),
  n('陳信宏一個人坐在椅子上，吉他搭在腿上，低著頭反覆彈著同一段旋律。彈到一半，他停下來，手指在琴弦上輕輕撥了兩下，又重新來過。'),
  n('你站在門口聽了一會兒。他終於注意到你。'),
  d('陳信宏', '欸？妳怎麼來了？'),
  d('你', '我還以為今天會有人練團，結果只有你一個人。'),
  d('陳信宏', '今天沒有正式練啦。'),
  d('陳信宏', '我只是想說過來彈一下。'),
  n('他把吉他放低了一點，往旁邊挪出位置。'),
  d('你', '你剛剛一直在彈同一段欸。'),
  d('陳信宏', '有嗎？'),
  n('他低頭看了一眼自己的手。'),
  d('陳信宏', '可能剛剛在想事情吧，彈到一半就忘記了。'),
  n('你注意到練團室裡少了很多平常熟悉的聲音。沒有錢佑達的鼓聲，也沒有溫尚翊在旁邊試效果器。'),
  d('你', '是佑達的事情嗎？'),
  n('陳信宏沒有馬上回答。過了一會兒，他才輕輕點了點頭。'),
  d('陳信宏', '嗯。'),
  d('陳信宏', '佑達已經決定退團了。'),
  d('陳信宏', '今天他把話說得很清楚，不會再回來了。'),
  d('你', '真的沒有辦法了嗎？'),
  d('陳信宏', '大家都試過了啦。'),
  d('陳信宏', '可是他既然已經決定了，我們也不能一直逼他。'),
  n('他低頭撥了一下琴弦。'),
  d('陳信宏', '我們幾個從附中就一起玩音樂了，突然少一個人，真的會有點不習慣。'),
]

const ashinRounds: April30Round[] = [
  {
    title: '第一輪互動：彈錯的那一段',
    scene: [
      n('陳信宏重新抱好木吉他，手指在琴弦上試了兩個音。'),
      d('陳信宏', '不然我再彈一次給妳聽好了。'),
      n('這一次，他彈得比剛才順了一些。只是到了剛才那個地方，手指還是稍微停頓了一下，錯了一個音。'),
      n('他自己先笑了出來。'),
      d('陳信宏', '欸，還是錯了。'),
    ],
    choices: [
      c('我覺得你剛剛彈錯的那次比較可愛。', [
        n('陳信宏的手指停在琴弦上。他抬頭看你，明顯沒料到你會這麼說。'),
        d('陳信宏', '……蛤？'),
        n('他低頭看了一眼吉他，又忍不住笑起來。'),
        d('陳信宏', '妳怎麼連這個都覺得可愛啦。'),
        d('陳信宏', '那我是不是不要練好了？'),
        n('他故意把吉他往旁邊挪了一點。'),
        d('陳信宏', '不然我下次每次都彈錯好了。'),
      ]),
      c('這次有比較好聽欸。', [
        n('陳信宏抬起眼睛，像是在確認你是不是認真的。'),
        d('陳信宏', '真的喔？'),
        d('陳信宏', '那我剛剛沒有白彈。'),
        n('他重新調整了一下手指的位置。'),
        d('陳信宏', '不過還是有一個地方怪怪的，我自己聽得出來。'),
      ]),
      c('你是不是故意彈錯的？', [
        n('陳信宏立刻抬起頭，手還停在琴弦上。'),
        d('陳信宏', '欸！我哪有啦！'),
        n('他笑著搖了搖頭。'),
        d('陳信宏', '我如果真的故意的，應該不會錯得這麼明顯吧。'),
      ]),
    ],
  },
  {
    title: '第二輪互動：一個人的練習',
    scene: [
      n('你看著他重新調整琴弦。他剛才彈錯的時候，明明自己也覺得好笑，現在又認真地開始練習。'),
      n('他低頭試了幾個和弦，手指在弦上停了一下，才又抬頭看你。'),
    ],
    choices: [
      c('你平常也會一個人來練這麼久嗎？', [
        d('陳信宏', '有時候會啊。'),
        d('陳信宏', '一個人的時候比較不會有人打斷我。'),
        n('說到這裡，他忽然抬眼看你。'),
        d('陳信宏', '不過妳來了，好像也不算一個人了。'),
      ]),
      c('你今天是不是不太想回去？', [
        n('陳信宏想了一下，手指輕輕撥過琴弦。'),
        d('陳信宏', '也不是不想回去啦。'),
        d('陳信宏', '只是回去好像也不知道要做什麼。'),
        d('陳信宏', '所以就多坐一下。'),
      ]),
      c('你是不是一直在想佑達？', [
        d('陳信宏', '有一點吧。'),
        d('陳信宏', '剛剛彈到某個地方，突然就想到以前練團的時候。'),
        d('陳信宏', '那時候旁邊明明都很吵，現在反而安靜得有點奇怪。'),
      ]),
    ],
  },
  {
    title: '第三輪互動：以前的練團',
    scene: [
      n('你把椅子往他那邊挪了一點。他注意到你的動作，稍微讓出了吉他旁邊的位置。'),
      d('陳信宏', '妳有沒有覺得，以前練團的時候真的很吵？'),
    ],
    choices: [
      c('尤其佑達，感覺他一個人就能吵翻整個練團室。', [
        n('陳信宏笑出了聲。'),
        d('陳信宏', '真的欸。'),
        d('陳信宏', '有時候明明才剛開始，他就已經不知道在忙什麼了。'),
        d('陳信宏', '不過如果真的沒有他，可能又會覺得少了什麼。'),
      ]),
      c('你們幾個從附中就認識，應該有很多回憶吧？', [
        d('陳信宏', '嗯，很多啊。'),
        d('陳信宏', '那時候大家都還不知道以後會怎麼樣，只覺得有時間就想去練團。'),
        n('他低頭撥了兩下弦。'),
        d('陳信宏', '現在想想，好像那時候最開心。'),
      ]),
      c('那你現在還會想起以前嗎？', [
        d('陳信宏', '會啊。'),
        d('陳信宏', '尤其是現在。'),
        d('陳信宏', '以前有些事情根本不會特別記得，等到少了一個人，反而突然想起來了。'),
      ]),
    ],
  },
  {
    title: '第四輪互動：大家的決定',
    scene: [
      n('陳信宏把吉他放在腿上，手掌輕輕搭著琴身。'),
      d('陳信宏', '其實大家都不太知道接下來要怎麼辦。'),
      d('你', '是因為佑達嗎？'),
      n('他點點頭，沒有急著接話。'),
    ],
    choices: [
      c('你們是不是都很捨不得他？', [
        d('陳信宏', '當然啊。'),
        d('陳信宏', '一起玩那麼久了，哪有可能突然就不在意。'),
      ]),
      c('你有想過以後練團會是什麼樣子嗎？', [
        n('陳信宏沉默了一下，視線落在吉他的弦上。'),
        d('陳信宏', '還沒有欸。'),
        d('陳信宏', '現在想那些，好像有點太快了。'),
        d('陳信宏', '先把現在的事情弄清楚再說吧。'),
      ]),
      c('那你們還會繼續練團嗎？', [
        d('陳信宏', '會啊。'),
        d('陳信宏', '只是可能要花一點時間重新習慣。'),
        d('陳信宏', '畢竟喜歡音樂這件事，又不是說少一個人就會突然不喜歡了。'),
      ]),
    ],
  },
  {
    title: '第五輪互動：留在這裡一會兒',
    scene: [
      n('陳信宏把吉他抱回懷裡，手指輕輕撥了一下最細的那根弦。'),
      n('你看著他，忽然覺得他今天好像比平常安靜許多。'),
    ],

    choices: [
      c('那我陪你再坐一下好了。', [
        n('陳信宏抬起頭，笑了。'),
        d('陳信宏', '好啊。'),
        d('陳信宏', '那妳不要嫌我一直彈同一段喔。'),
      ]),
      c('你再彈一次給我聽，這次不准出錯。', [
        n('陳信宏笑著看你。'),
        d('陳信宏', '欸，妳要求也太高了吧。'),
        d('陳信宏', '那我等一下如果又錯了，妳要負責喔。'),
      ]),
      c('等你想說話的時候再說吧。', [
        n('陳信宏的動作慢了下來。他看了你一會兒，才輕輕笑了一下。'),
        d('陳信宏', '嗯。'),
        d('陳信宏', '謝謝妳喔。'),
      ]),
    ],
  },
]

const schoolIntroBlocks: April30Block[] = [
  n('下午，你想起瑪莎和石頭還在附中上課，於是決定過去找他們。'),
  n('輔導班剛好下課，走廊裡擠滿了收拾書包的學生。你站在教室外面等了一會兒，終於看見兩個人一起走出來。'),
  n('瑪莎手裡拿著一疊講義，石頭正低頭把筆收進筆袋。'),
  d('瑪莎', '……欸？'),
  d('瑪莎', '妳怎麼會跑來這裡？'),
  d('你', '我來找你們啊。'),
  d('瑪莎', '台大太無聊喔？'),
  n('石頭看見你，笑了一下。'),
  d('石錦航', '妳等很久了嗎？'),
  d('你', '沒有啦，我剛到。'),
  n('你們三個站在走廊邊說了幾句話。瑪莎把講義捲起來，敲了敲自己的書包。'),
  d('瑪莎', '對了，有件事妳應該還不知道。'),
  d('瑪莎', '佑達退團了。'),
  d('你', '真的？'),
  d('石錦航', '嗯，他已經跟大家說清楚了。'),
  d('石錦航', '這陣子大家都勸過他，不過他還是決定不繼續了。'),
  d('瑪莎', '那傢伙這次還真的挺乾脆的。'),
  n('他說完，自己也安靜了一下。'),
  d('石錦航', '怪獸今天也沒來學校吧？'),
  d('你', '嗯。'),
  d('瑪莎', '我們幾個從附中就一起玩音樂了，現在突然少一個人，哪有那麼容易習慣。'),
  n('石頭看了瑪莎一眼，沒有接著調侃。'),
  n('你們準備一起離開教室時，瑪莎忽然用手肘輕輕碰了你一下。'),
  d('瑪莎', '欸，妳等一下要去哪？'),
]

const masaWalkIntroBlocks: April30Block[] = [
  n('石頭先一步走到前面，回頭朝你們揮了揮手。'),
  d('石錦航', '那我先走啦，明天見。'),
  n('瑪莎隨便抬了抬手。'),
  d('瑪莎', '知道啦，快走。'),
  n('等石頭走遠，瑪莎才把書包往肩上重新扯了一下。'),
  d('瑪莎', '走啦。'),
  n('你們一起穿過附中的走廊。剛好有一群學生從樓梯口跑下來，瑪莎下意識往旁邊讓了一步，伸手擋了一下，免得你被撞到。'),
  d('瑪莎', '小心啦。'),
  n('等那群人過去，他才轉過頭看你。'),
]

const masaRounds: April30Round[] = [
  {
    title: '第一輪互動：特地來看我們？',
    scene: [d('瑪莎', '妳今天怎麼突然想到來找我們？')],
    choices: [
      c('想你們了不行喔？', [
        n('瑪莎瞥了你一眼，故意搓了搓手臂。'),
        d('瑪莎', '哇，講得這麼肉麻。'),
        d('瑪莎', '我雞皮疙瘩都起來了欸。'),
        n('走了兩步，他又補了一句。'),
        d('瑪莎', '不過妳有空來也不錯啦。'),
      ]),
      c('我來檢查你有沒有認真上課。', [
        n('瑪莎立刻停下腳步，轉過頭看你。'),
        d('瑪莎', '蛤？妳是我媽喔？'),
        n('他把書包往身前拉了一下。'),
        d('瑪莎', '我今天可是很認真欸，講義都有帶回來。'),
        n('說著，他還特地把那疊講義抽出來給你看。'),
      ]),
      c('我剛好路過嘛。', [
        n('瑪莎眯起眼睛，像是不太相信。'),
        d('瑪莎', '附中跟台大是順路喔？'),
        d('瑪莎', '妳這個路過也太有誠意了吧。'),
        n('他笑了一聲，繼續往前走。'),
      ]),
    ],
  },
  {
    title: '第二輪互動：你其實很捨不得佑達吧？',
    scene: [
      n('走到校門附近時，瑪莎把講義塞進書包，空出手來拉了一下背帶。你們之間安靜了一小段路。'),
    ],
    choices: [
      c('你是不是也很捨不得佑達？', [
        n('瑪莎的腳步慢了一點。'),
        d('瑪莎', '不然咧？'),
        d('瑪莎', '我看起來有那麼冷血喔？'),
        d('瑪莎', '一起玩那麼久了，突然說不玩就不玩，誰會沒感覺啊。'),
      ]),
      c('你們最近是不是都不太開心？', [
        n('瑪莎撇了撇嘴，抬手把書包往上提了提。'),
        d('瑪莎', '妳這不是廢話嗎？'),
        d('瑪莎', '練團室少一個人，還能每天開心到唱歌喔？'),
        n('他說完，自己也覺得這話有點重，聲音放低了一些。'),
        d('瑪莎', '反正就……很不習慣啦。'),
      ]),
      c('你有沒有想過他真的不會回來了？', [
        n('瑪莎沉默了一下，踢開路邊一顆小石子。'),
        d('瑪莎', '有啊。'),
        d('瑪莎', '所以才煩啊。'),
        d('瑪莎', '之前還覺得說不定再過幾天就好了，現在看來是真的沒了。'),
      ]),
    ],
  },
  {
    title: '第三輪互動：從附中開始的日子',
    scene: [
      n('你們走到一處比較安靜的路段。瑪莎忽然伸手拍了拍自己的書包。'),
      d('瑪莎', '欸，妳知道我們以前放學都在幹嘛嗎？'),
    ],
    choices: [
      c('所以你們以前也常常翹課？', [
        n('瑪莎馬上轉過頭，像是怕你把話傳出去。'),
        d('瑪莎', '欸，妳不要亂講喔！'),
        d('瑪莎', '我們是放學以後去練團，不是翹課。'),
        n('他頓了一下。'),
        d('瑪莎', '……至少大部分時候是啦。'),
      ]),
      c('那時候你們是不是經常吵架？', [
        n('瑪莎笑了，伸手比了比自己，又朝前面指了一下。'),
        d('瑪莎', '超常啊。'),
        d('瑪莎', '怪獸有時候真的很欠揍，佑達也不是省油的燈。'),
        d('瑪莎', '阿信跟石頭倒是比較常在旁邊看戲。'),
      ]),
      c('你現在還會想起以前嗎？', [
        n('瑪莎低頭看著腳下，踢著路面一顆小石子。'),
        d('瑪莎', '會啊。'),
        d('瑪莎', '尤其現在這種時候。'),
        d('瑪莎', '以前覺得每天都一樣，現在才發現那些日子其實滿珍貴的。'),
      ]),
    ],
  },
  {
    title: '第四輪互動：溫尚翊今天也不在',
    scene: [
      n('你們經過路邊的小攤，瑪莎停下來讓了一輛腳踏車。你忽然想起今天一整天都沒看見溫尚翊。'),
    ],
    choices: [
      c('怪獸今天也沒來學校。', [
        n('瑪莎抬了抬眉，想了一下。'),
        d('瑪莎', '真的喔？'),
        d('瑪莎', '那傢伙最近應該也很煩吧。'),
        d('瑪莎', '他跟佑達認識那麼久，現在突然變成這樣，哪有可能沒事。'),
      ]),
      c('你有去找過怪獸嗎？', [
        d('瑪莎', '有啊。'),
        d('瑪莎', '不過他現在可能不太想理人。'),
        n('他看了你一眼，語氣比剛才認真了一點。'),
        d('瑪莎', '妳要是碰到他，就不要一直逼他講話啦。'),
      ]),
      c('你覺得他會不會也想退出？', [
        n('瑪莎立刻皺起眉頭，腳步也停了一下。'),
        d('瑪莎', '蛤？妳在講什麼啦。'),
        d('瑪莎', '他現在只是心情不好，不代表他不想玩音樂了。'),
        n('他把視線移開，聲音低了一點。'),
        d('瑪莎', '至少我不希望他也這樣。'),
      ]),
    ],
  },
  {
    title: '第五輪互動：以後還會一起練團嗎？',
    scene: [
      n('快走到路口時，瑪莎把書包換到了另一邊肩膀。你們之間又安靜了一會兒。'),
      d('瑪莎', '欸，妳覺得我們之後還會繼續嗎？'),
      n('你有點意外地看向他。'),
    ],

    choices: [
      c('當然會啊，你們不是都很喜歡音樂嗎？', [
        n('瑪莎笑了一聲，低頭踢了踢路邊的石子。'),
        d('瑪莎', '妳講得倒是很簡單。'),
        d('瑪莎', '不過也是啦。'),
        d('瑪莎', '總不能因為少一個人，就全部不玩了吧。'),
      ]),
      c('我覺得你們應該先休息一下。', [
        n('瑪莎點了點頭，手指勾著書包帶。'),
        d('瑪莎', '可能吧。'),
        d('瑪莎', '最近大家都太煩了，先不要一直逼自己也好。'),
      ]),
      c('那你自己還想繼續嗎？', [
        n('瑪莎幾乎沒有猶豫，說完才像是意識到自己回答得太快。'),
        d('瑪莎', '想啊。'),
        d('瑪莎', '不然我每天背著這麼重的Bass是背好玩的喔？'),
        n('你忍不住笑了。瑪莎也跟著笑了一下。'),
      ]),
    ],
  },
]

const stoneWalkIntroBlocks: April30Block[] = [
  n('瑪莎先一步離開，走之前還不忘回頭喊了一句。'),
  d('瑪莎', '石頭，妳記得把她送到校門口喔！'),
  n('石頭笑著搖搖頭。'),
  d('石錦航', '知道啦。'),
  n('等瑪莎走遠，你們才一起離開教室。石頭把講義整理好，放進書包裡，走在你旁邊。'),
  n('他的步子不快，偶爾還會側過頭聽你說話。走出校門時，剛好有一群學生從旁邊經過，他稍稍往你這邊靠了一點，讓你避開迎面而來的人群。'),
  d('石錦航', '今天人好多喔。'),
  n('你們走到路邊，終於不用再被來來往往的學生擠著。'),
]

const stoneRounds: April30Round[] = [
  {
    title: '第一輪互動：今天怎麼想到來找我們？',
    scene: [d('石錦航', '今天怎麼突然想到來找我們？')],
    choices: [
      c('我想來看看你們嘛。', [
        n('石頭笑了一下，順手把肩上的書包帶往上拉好。'),
        d('石錦航', '那很好啊。'),
        d('石錦航', '只是下次可以先跟我說，我怕妳等太久。'),
      ]),
      c('我剛好有時間，就過來了。', [
        d('石錦航', '嗯，最近課業還忙嗎？'),
        n('他沒有繼續追問，只是配合你的步子慢慢往前走。'),
      ]),
      c('我怕你們兩個又偷偷跑去玩音樂。', [
        n('石頭忍不住笑了。'),
        d('石錦航', '我們今天可是有乖乖上課喔。'),
        d('石錦航', '而且妳怎麼只抓我們兩個？'),
      ]),
    ],
  },
  {
    title: '第二輪互動：你也很捨不得佑達吧？',
    scene: [
      n('走了一段路，石頭把手裡的講義換到另一邊，視線落在前方。'),
      d('石錦航', '其實今天知道佑達真的退團，還是有點難接受。'),
    ],
    choices: [
      c('你也很捨不得他吧？', [
        n('石頭輕輕點頭。'),
        d('石錦航', '嗯。'),
        d('石錦航', '畢竟從附中就在一起玩了，很多事情都已經習慣有他在。'),
        d('石錦航', '現在突然少一個人，真的會覺得怪怪的。'),
      ]),
      c('你們是不是已經勸過他很多次了？', [
        d('石錦航', '嗯，大家都試過了。'),
        d('石錦航', '可是他已經想好了，我們也不想讓他覺得被逼得太緊。'),
      ]),
      c('你覺得他會不會改變主意？', [
        n('石頭想了一會兒，沒有立刻回答。'),
        d('石錦航', '我不知道。'),
        d('石錦航', '不過既然他已經決定了，可能我們也要慢慢接受這件事。'),
      ]),
    ],
  },
  {
    title: '第三輪互動：以前一起玩音樂的日子',
    scene: [
      n('你們經過一排店面，石頭忽然想起什麼似的笑了一下。'),
      d('石錦航', '其實以前練團的時候，有很多很好笑的事情。'),
      d('你', '什麼事情？'),
      n('他搖搖頭。'),
      d('石錦航', '一下子講不完啦。'),
    ],
    choices: [
      c('是不是怪獸最常惹麻煩？', [
        n('石頭笑了，像是想起了什麼。'),
        d('石錦航', '有時候是他啦。'),
        d('石錦航', '不過也不能都怪他，大家其實都滿愛鬧的。'),
      ]),
      c('你們五個是不是從附中就一直在一起？', [
        d('石錦航', '嗯，差不多就是那時候開始的。'),
        d('石錦航', '那時候只要有人說要練團，大家就會想辦法湊出時間。'),
        d('石錦航', '現在想想，真的滿不可思議的。'),
      ]),
      c('那時候你有沒有想過以後會發生這些事？', [
        n('石頭搖搖頭，笑意淡了一點。'),
        d('石錦航', '沒有欸。'),
        d('石錦航', '那時候只覺得今天能不能把歌練好就很重要了。'),
        d('石錦航', '可能就是因為這樣，才會覺得那時候很開心吧。'),
      ]),
    ],
  },
  {
    title: '第四輪互動：溫尚翊今天也沒來',
    scene: [
      n('你想起溫尚翊今天一整天都沒有出現，忍不住提起了他。'),
    ],
    choices: [
      c('怪獸今天也沒來學校。', [
        n('石頭輕輕嘆了一口氣。'),
        d('石錦航', '我猜他應該也不太好受。'),
        d('石錦航', '他們認識那麼久，突然發生這種事，總要一點時間。'),
      ]),
      c('你有去找過他嗎？', [
        d('石錦航', '有啊。'),
        d('石錦航', '不過他最近比較安靜，我也沒有一直追著問。'),
        n('他看了你一眼。'),
        d('石錦航', '有時候陪在旁邊就好了，不一定要一直說話。'),
      ]),
      c('你覺得他現在最需要什麼？', [
        n('石頭想了一下，放慢了腳步。'),
        d('石錦航', '可能是時間吧。'),
        d('石錦航', '等他自己想清楚一點，應該就會好一些了。'),
      ]),
    ],
  },
  {
    title: '第五輪互動：接下來怎麼辦？',
    scene: [
      n('走到一個路口時，石頭停下來等一輛車經過，才轉過頭看你。'),
      d('石錦航', '妳覺得我們接下來應該怎麼辦？'),
    ],

    choices: [
      c('先繼續練團吧，慢慢來就好了。', [
        n('石頭笑了。'),
        d('石錦航', '嗯，我也是這麼想的。'),
        d('石錦航', '現在突然要大家做決定，可能也不太容易。'),
      ]),
      c('我覺得你們應該先好好休息。', [
        d('石錦航', '也許吧。'),
        d('石錦航', '最近大家都累了，先讓自己喘口氣也好。'),
      ]),
      c('只要你們還喜歡音樂，就不會結束吧。', [
        n('石頭看著你，輕輕笑了一下。'),
        d('石錦航', '希望是這樣。'),
        d('石錦航', '畢竟大家花了那麼多時間，才走到現在。'),
      ]),
    ],
  },
]

const yanmingIntroBlocks: April30Block[] = [
  n('下午，你剛從系館出來，就看見諺明哥站在外面。他靠著走廊邊的柱子，手裡拿著一張折起來的紙。看見你出來，他朝你招了招手。'),
  d('你', '諺明哥？你怎麼來學校了？'),
  d('劉諺明', '剛好有件事想跟妳說。'),
  n('他把手裡的紙收進外套口袋，沒有繞彎子。'),
  d('劉諺明', '佑達正式退團了。'),
  d('你', '已經確定了嗎？'),
  d('劉諺明', '嗯，他已經把話說清楚了。'),
  d('劉諺明', '這陣子大家輪流去找他談過，不過看起來，他是真的想好了。'),
  d('你', '所以以後都不來練團了？'),
  d('劉諺明', '應該是不會了。'),
  n('他頓了頓。'),
  d('劉諺明', '他們幾個從附中就一起玩音樂，這件事對大家來說，恐怕不只是少一個鼓手而已。'),
  n('你們沿著系館外側慢慢往前走。'),
]

const yanmingRounds: April30Round[] = [
  {
    title: '第一輪互動：已經確定了嗎？',
    scene: [n('你看著諺明哥，還是有點難以置信。')],
    choices: [
      c('所以是真的不會再回來了嗎？', [
        d('劉諺明', '嗯，照目前的情況來看，應該是了。'),
        d('劉諺明', '他不是臨時說說而已。'),
      ]),
      c('大家都勸過他了，還是沒用嗎？', [
        n('諺明哥輕輕嘆了一口氣。'),
        d('劉諺明', '嗯，該說的都說過了。'),
        d('劉諺明', '有些事情不是別人多講幾次，就一定會有不一樣的結果。'),
      ]),
      c('他是什麼時候決定的？', [
        n('諺明哥想了一下，像是在回想這幾天的情況。'),
        d('劉諺明', '這陣子應該就已經有想法了。'),
        d('劉諺明', '只是今天才把事情正式講清楚。'),
      ]),
    ],
  },
  {
    title: '第二輪互動：諺明哥也去找過他嗎？',
    scene: [
      n('你們走到樓梯旁，他停下來讓一群學生先過去。等人群散開，他才繼續往前走。'),
    ],
    choices: [
      c('你也有去找佑達談嗎？', [
        d('劉諺明', '有啊。'),
        d('劉諺明', '畢竟練團室的事情，我也不能完全不管。'),
        d('劉諺明', '不過我沒有一直勸他回來，還是得看他自己的想法。'),
      ]),
      c('你覺得他是真的想清楚了嗎？', [
        n('諺明哥想了一會兒。'),
        d('劉諺明', '我想，他至少知道自己在做什麼決定。'),
        d('劉諺明', '至於以後會不會後悔，那就不是現在能知道的了。'),
      ]),
      c('你會不會覺得很可惜？', [
        d('劉諺明', '會啊。'),
        d('劉諺明', '不過可惜歸可惜，也不能因為這樣就不尊重他的決定。'),
      ]),
    ],
  },
  {
    title: '第三輪互動：溫尚翊今天沒來',
    scene: [
      n('你們走出系館，外面的陽光已經沒有中午那麼刺眼。你想起今天一整天都沒見到溫尚翊。'),
    ],
    choices: [
      c('怪獸今天也沒來學校。', [
        n('諺明哥稍微停頓了一下。'),
        d('劉諺明', '是喔。'),
        d('劉諺明', '我今天也沒碰到他。'),
        d('劉諺明', '他跟佑達認識那麼久，應該需要一點時間整理心情。'),
      ]),
      c('你覺得怪獸會不會很難接受？', [
        d('劉諺明', '應該會吧。'),
        d('劉諺明', '他們幾個從附中就一起玩音樂，這麼多年下來，早就不是單純一起練團的關係了。'),
      ]),
      c('我有點擔心他。', [
        n('諺明哥看了看你，語氣放緩了一些。'),
        d('劉諺明', '會擔心也是正常的。'),
        d('劉諺明', '不過妳不用太著急，等他想說話的時候，自然會找人聊的。'),
      ]),
    ],
  },
  {
    title: '第四輪互動：練團室接下來怎麼辦？',
    scene: [
      n('諺明哥把手插進口袋，走路的速度稍稍慢了下來。'),
      d('劉諺明', '其實現在練團室也得重新安排一下。'),
    ],
    choices: [
      c('鼓的位置怎麼辦？', [
        d('劉諺明', '先空著吧。'),
        d('劉諺明', '現在急著找人補上，也不一定是好事。'),
      ]),
      c('那大家還會繼續練團嗎？', [
        d('劉諺明', '我想會。'),
        d('劉諺明', '只是可能要重新調整一下，大家也需要時間適應。'),
      ]),
      c('你會不會覺得很麻煩？', [
        n('諺明哥笑了笑，把口袋裡的紙拿出來看了一眼，又重新收好。'),
        d('劉諺明', '當然會啊。'),
        d('劉諺明', '不過開練團室本來就會遇到各種事情，這也沒什麼。'),
      ]),
    ],
  },
  {
    title: '第五輪互動：以後還會好起來嗎？',
    scene: [
      n('你們走到校園邊緣，前面就是通往校門的路。諺明哥停了一下，轉頭看你。'),
      d('劉諺明', '妳是不是也在想，接下來會怎麼樣？'),
    ],
    choices: [
      c('我只是覺得大家這樣很可惜。', [
        d('劉諺明', '我懂。'),
        d('劉諺明', '不過他們幾個從附中一路玩到現在，也不是說遇到一次挫折就會什麼都沒有了。'),
      ]),
      c('你覺得他們還能回到以前嗎？', [
        n('諺明哥沒有馬上回答，視線落在前方。'),
        d('劉諺明', '可能回不到一模一樣的以前了。'),
        d('劉諺明', '不過以後還是可以有新的樣子。'),
        d('劉諺明', '這種事情急不來。'),
      ]),
      c('那我們是不是只能先等一等？', [
        n('諺明哥笑了一下。'),
        d('劉諺明', '嗯，先讓大家喘口氣吧。'),
        d('劉諺明', '該做的事情還是會繼續做，只是不用急著把所有事情一次想完。'),
      ]),
    ],
  },
]


const wenComfortChoices: April30Choice[] = [
  c('伸手把他輕輕摟進懷裡', [
    n('你往他身邊挪近了一點，抬手環住他的肩膀，沒有用力，只是把他輕輕帶向自己。'),
    n('溫尚翊整個人僵了一下，手抬到一半，像是想把你推開，最後卻只是停在半空。'),
    d('溫尚翊', '欸……妳幹嘛啦？'),
    d('你', '先不要講話啦。'),
    n('你掌心在他背上輕輕拍了兩下。他低著頭，眼尾紅得更明顯，過了好一會兒才慢慢把手落在你的背後。'),
    d('溫尚翊', '……我又沒有哭。'),
    n('他的聲音悶在你肩邊，手指卻悄悄捏住了你衣服的一小角。'),
  ]),
  c('替他擦掉眼角的水氣', [
    n('你沒有拆穿他，只是抽出紙巾，伸手替他擦過眼角。'),
    n('他下意識偏了一下頭，卻沒有真的躲開。'),
    d('溫尚翊', '欸，等一下啦。'),
    d('你', '好啦，不笑你。'),
    n('他接過紙巾，胡亂在眼角按了一下，吸了口氣。'),
    d('溫尚翊', '……妳真的很煩欸。'),
    n('話還是那句話，這次卻沒什麼力氣，反而把紙巾好好收進口袋。'),
  ]),
  c('握住他的手，陪他多坐一會兒', [
    n('你伸手碰了碰他放在膝上的手背，見他沒有躲，才慢慢把他的手握住。'),
    n('溫尚翊低頭看著你們交握的手，拇指在你手背上蹭了一下。'),
    d('你', '不用現在就想清楚，我可以陪你坐久一點。'),
    d('溫尚翊', '……妳今天不用回去喔？'),
    d('你', '不用你操心啦。'),
    n('他終於很輕地笑了一聲，沒有把手抽回去。'),
  ]),
]

const ashinComfortChoices: April30Choice[] = [
  c('握住他停在琴弦上的手', [
    n('你伸手握住他剛剛還停在琴弦上的手指，細細的弦音一下子斷了。陳信宏低頭看了一眼，才抬起眼睛。'),
    d('陳信宏', '怎麼啦？'),
    d('你', '你不用一直彈啦，休息一下也沒關係。'),
    n('他看了看你，又看了看腿上的木吉他，最後小心地把吉他靠到旁邊的椅子上。'),
    n('空出手後，他沒有立刻說話，只是伸手輕輕抱住你。手臂繞過你的背，力道很輕，像是怕嚇到你。'),
    d('陳信宏', '……謝謝妳喔。'),
    n('他把下巴輕輕靠在你的肩上，安靜地停了一會兒，才慢慢鬆開手。'),
  ]),
  c('朝他張開手臂，讓他自己決定要不要抱過來', [
    n('你沒有多說什麼，只是朝他張開手臂。陳信宏看了你一眼，像是沒想到你會這麼直接。'),
    d('陳信宏', '現在喔？'),
    d('你', '嗯，想抱一下嗎？'),
    n('他被你逗得笑了一下，把木吉他仔細放到椅子上，才起身走近你。'),
    n('他伸手環住你的背，抱得很溫柔，掌心在你背上輕輕停著。'),
    d('陳信宏', '那我就抱一下下喔。'),
    n('話是這麼說，他卻沒有急著放開。'),
  ]),
  c('靠近一點，讓他把額頭靠在你的肩上', [
    n('你伸手輕輕碰了碰他的肩膀，在他旁邊坐近了一點。'),
    d('你', '今天不用一直裝作沒事啦。'),
    n('陳信宏安靜了一下，才把肩膀往你這邊靠過來，額頭輕輕抵在你的肩側。'),
    d('陳信宏', '我沒有裝啦……只是有點不知道要怎麼講。'),
    d('你', '那就先不要講。'),
    n('他輕輕點頭，手指搭在你的手背上，沒有再把距離拉開。'),
    d('陳信宏', '嗯。這樣就很好了。'),
  ]),
]

const masaComfortChoices: April30Choice[] = [
  c('伸手摟住他的肩膀', [
    n('你往瑪莎身邊靠了一步，伸手勾住他的肩膀，把他往自己這邊帶了帶。'),
    d('瑪莎', '欸欸欸！妳幹嘛啦？'),
    n('他整個人先是僵住，還低頭看了一眼你搭在他肩上的手，像是想確認你是不是認真的。'),
    d('你', '安慰你一下不行喔？'),
    n('瑪莎張了張嘴，原本想吐槽，最後只嘖了一聲，抬手在你背上拍了兩下。'),
    d('瑪莎', '……好啦，就一下。'),
    n('他嘴上還是嫌棄，卻沒有把你的手拿開，反而放慢了腳步。'),
  ]),
  c('趁他沒注意時，輕輕牽住他的手', [
    n('你伸手握住他垂在身側的手。瑪莎的話一下子停住，低頭看了看你們牽在一起的手。'),
    d('瑪莎', '妳現在是在幹嘛？'),
    d('你', '怕你又一個人偷偷不開心啊。'),
    n('他像是想反駁，手指卻先一步回握住你。'),
    d('瑪莎', '誰偷偷不開心了……'),
    n('他把視線轉向前面，耳朵有點紅，過了一會兒才小聲補了一句。'),
    d('瑪莎', '……不過妳牽就牽，不要一直講。'),
  ]),
  c('勾住他的手臂，陪他慢慢走', [
    n('你伸手勾住瑪莎的手臂，故意把腳步放慢了一點。'),
    d('瑪莎', '走路就走路，妳突然黏過來幹嘛？'),
    d('你', '陪你走慢一點啊，不然你又要自己亂想。'),
    n('他瞥了你一眼，沒有把手臂抽走，反而配合著你的速度往前走。'),
    d('瑪莎', '妳今天不用一直想辦法逗我啦。'),
    d('你', '那你也不要一直踢路邊的石頭。'),
    n('瑪莎忍不住笑了一聲，肩膀輕輕撞了你一下。'),
    d('瑪莎', '知道啦，囉嗦。'),
  ]),
]

const stoneComfortChoices: April30Choice[] = [
  c('輕輕牽住他的手', [
    n('你伸手牽住石頭的手，拇指輕輕捏了捏他的指節。石頭低頭看了一眼，沒有抽開，只是把手指慢慢收攏，穩穩地握住你。'),
    d('你', '你也不用什麼事情都自己想好啊。'),
    d('石錦航', '嗯，我知道。'),
    n('他回握了一下，像是在告訴你他有收到你的心意。'),
    d('石錦航', '有妳陪我走這一段，已經很好了。'),
  ]),
  c('停下腳步，主動抱抱他', [
    n('你停下腳步，往前一步輕輕抱住石頭。'),
    n('他明顯怔了一下，手還停在身側，過了半秒才慢慢抬起來，輕輕環住你的背。'),
    d('石錦航', '……怎麼突然抱我？'),
    d('你', '因為你也會難過啊。'),
    n('他低下頭，手掌在你背上輕輕拍了兩下，沒有急著放開。'),
    d('石錦航', '嗯。那我就借妳抱一下。'),
    n('他的聲音很輕，抱著你的手卻比剛才更安穩了一點。'),
  ]),
  c('替他理好被風吹亂的頭髮，再輕輕拍一拍肩膀', [
    n('你抬手替他把額前被風吹亂的頭髮理好，指尖掠過他的鬢角，又輕輕拍了拍他的肩。'),
    d('石錦航', '妳這樣，我反而不知道要說什麼了。'),
    d('你', '那就不用說啊。'),
    n('石頭笑了一下，伸手輕輕握住你的手腕，讓你的手在他肩上多停了一會兒。'),
    d('石錦航', '好。那我就先收下這個安慰。'),
  ]),
]

const wenEndingBlocks: April30Block[] = [
  n('你沒有再追問，也沒有急著把氣氛拉回平常。溫尚翊把旁邊沒開的酒往遠處推了推，手指在膝蓋上停了一會兒。'),
  n('天台的風還是很大，他卻沒有再拿風當藉口。你留在他身邊，兩個人安靜地坐了一會兒。'),
  n('過了好一陣子，他才抬起頭，眼尾仍然有些紅，卻沒有再刻意別開臉。'),
]

const ashinEndingBlocks: April30Block[] = [
  n('陳信宏把吉他重新抱好，低頭調整了一下琴弦。'),
  d('陳信宏', '要不要聽我彈一次剛剛那段？'),
  d('陳信宏', '這次應該不會再彈錯了。'),
  n('他抬頭看了你一眼，手指重新落在琴弦上。練團室裡又響起木吉他的聲音。'),
]

const masaEndingBlocks: April30Block[] = [
  n('走到路口，瑪莎停下來，把書包重新背好。'),
  d('瑪莎', '好啦，妳差不多該回去了吧？'),
  d('瑪莎', '不要在外面晃到太晚，明天還要上課欸。'),
  n('嘴上還是一副嫌棄的樣子。不過等你轉身準備離開時，他又叫住了你。'),
  d('瑪莎', '欸。'),
  n('你回過頭。'),
  d('瑪莎', '下次要來就直接講啦，不用突然跑來嚇人。'),
  d('瑪莎', '走啦，掰。'),
]

const stoneEndingBlocks: April30Block[] = [
  n('石頭把手裡的講義往書包裡收好，陪你走到路口。'),
  d('石錦航', '妳回去小心一點喔。'),
  d('石錦航', '下次有空再過來。'),
  n('他朝你揮了揮手，直到你走出一段距離，才轉身離開。'),
]

const yanmingEndingBlocks: April30Block[] = [
  n('走到校門附近，諺明哥停下來。'),
  d('劉諺明', '好啦，妳也差不多該回去了吧？'),
  n('他抬手看了一眼時間。'),
  d('劉諺明', '我等一下還要回練團室。'),
  d('劉諺明', '有什麼事情再過來找我就好。'),
  n('他說完，朝你揮了揮手。你看著他轉身離開。'),
  n('雖然錢佑達退團的事情已經確定，但至少練團室還在，大家也還沒有決定放棄。只是接下來的路，可能真的要重新走一遍了。'),
]

function readProgress(): April30Progress {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as Partial<April30Progress> | null
    const phases: April30Phase[] = ['intro', 'mainChoice', 'wen', 'otherPicker', 'ashin', 'schoolPicker', 'schoolWalk', 'yanming', 'complete']
    const routes: April30Route[] = ['wen', 'ashin', 'masa', 'stone', 'yanming']
    if (saved && typeof saved.phase === 'string' && phases.includes(saved.phase as April30Phase)
      && (saved.route === null || routes.includes(saved.route as April30Route))
      && Number.isInteger(saved.roundIndex) && Array.isArray(saved.choices)
      && (saved.pendingChoice === null || Number.isInteger(saved.pendingChoice))
      && (saved.pendingComfortChoice === undefined || saved.pendingComfortChoice === null
        || (Number.isInteger(saved.pendingComfortChoice) && saved.pendingComfortChoice >= 0 && saved.pendingComfortChoice <= 2))) {
      // Old v2 saves may contain a selected physical-action option in the fifth round.
      // Reopen that final dialogue choice so the original fifth-round interaction is not skipped.
      const legacyActionWasSelected = saved.pendingComfortChoice === undefined
        && saved.phase !== 'complete' && saved.roundIndex === 4
        && saved.pendingChoice !== null && saved.route !== 'yanming'
      return {
        phase: saved.phase as April30Phase,
        route: saved.route as April30Route | null,
        roundIndex: Math.max(0, Math.min(4, saved.roundIndex as number)),
        choices: saved.choices.filter((value): value is number => Number.isInteger(value) && value >= 0 && value <= 2),
        pendingChoice: legacyActionWasSelected ? null : saved.pendingChoice as number | null,
        pendingComfortChoice: saved.pendingComfortChoice ?? null,
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
  if (progress.phase === 'ashin' || progress.phase === 'yanming' || progress.phase === 'schoolWalk') {
    return ['16:45', '16:55', '17:05', '17:15', '17:25'][progress.roundIndex] ?? '17:25'
  }
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
    commit({ ...progress, pendingChoice: index, pendingComfortChoice: null })
  }

  const chooseComfort = (index: number) => {
    if (progress.pendingChoice === null || progress.roundIndex !== 4
      || !progress.route || progress.route === 'yanming' || progress.pendingComfortChoice !== null) return
    commit({ ...progress, pendingComfortChoice: index })
  }

  const continueRound = () => {
    if (progress.pendingChoice === null) return
    if (progress.roundIndex === 4 && progress.route !== 'yanming' && progress.pendingComfortChoice === null) return
    const nextChoices = [...progress.choices, progress.pendingChoice]
    if (progress.roundIndex < 4) {
      commit({ ...progress, roundIndex: progress.roundIndex + 1, choices: nextChoices, pendingChoice: null, pendingComfortChoice: null })
    } else {
      commit({ ...progress, phase: 'complete', choices: nextChoices, pendingChoice: null, pendingComfortChoice: null })
    }
  }

  const finish = () => {
    if (!progress.route || progress.choices.length !== 5) return
    onFinish({ route: progress.route, choices: progress.choices })
  }

  const routeRounds = progress.phase === 'wen' ? wenRounds
    : progress.phase === 'ashin' ? ashinRounds
      : progress.phase === 'yanming' ? yanmingRounds
        : progress.phase === 'schoolWalk' && progress.route === 'masa' ? masaRounds
          : progress.phase === 'schoolWalk' && progress.route === 'stone' ? stoneRounds
            : null

  const routeTitle = progress.phase === 'wen' ? '學校天台・溫尚翊'
    : progress.phase === 'ashin' ? '一個人的練團室・陳信宏'
      : progress.phase === 'yanming' ? '系館外・劉諺明'
        : progress.route === 'masa' ? '放學路上・瑪莎'
          : '放學路上・石頭'

  const routeKicker = progress.phase === 'wen' ? 'ROOFTOP · WITH WEN'
    : progress.phase === 'ashin' ? 'THE REHEARSAL ROOM · ASHIN'
      : progress.phase === 'yanming' ? 'A VISIT TO CAMPUS · YANMING'
        : progress.route === 'masa' ? 'WALKING HOME · WITH MASA'
          : 'WALKING HOME · WITH STONE'

  const routeHeading = progress.phase === 'wen' ? '天台上的風'
    : progress.phase === 'ashin' ? '木吉他的聲音'
      : progress.phase === 'yanming' ? '帶來消息的人'
        : progress.route === 'masa' ? '跟瑪莎一起走'
          : '跟石頭一起走'

  const routeIntro = progress.phase === 'ashin' ? ashinIntroBlocks
    : progress.phase === 'yanming' ? yanmingIntroBlocks
      : progress.phase === 'schoolWalk' && progress.route === 'masa' ? masaWalkIntroBlocks
        : progress.phase === 'schoolWalk' && progress.route === 'stone' ? stoneWalkIntroBlocks
          : []

  const routeEnding = progress.route === 'wen' ? wenEndingBlocks
    : progress.route === 'ashin' ? ashinEndingBlocks
      : progress.route === 'masa' ? masaEndingBlocks
        : progress.route === 'stone' ? stoneEndingBlocks
          : yanmingEndingBlocks

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
        <April30Blocks blocks={[n('你站在走廊邊想了一會兒。要不要去找找溫尚翊？')]} />
        <div className="march29-reply-list">
          <button className="reply-choice" onClick={() => chooseMainRoute(true)}><span>去找溫尚翊</span><ChevronRight size={15} /></button>
          <button className="reply-choice" onClick={() => chooseMainRoute(false)}><span>不去找他，去看看其他人</span><ChevronRight size={15} /></button>
        </div>
      </April30Frame>
    )
  }

  if (progress.phase === 'otherPicker') {
    return (
      <April30Frame title="下午的安排" kicker="AFTER CLASS · WHERE TO GO">
        <h2 className="story-scene-title">不去找他，你想去哪裡？</h2>
        <April30Blocks blocks={[n('你想了想，決定去看看其他人。')]} />
        <div className="march29-reply-list">
          <button className="reply-choice" onClick={() => chooseOtherRoute('ashin')}><span>去練團室找陳信宏</span><ChevronRight size={15} /></button>
          <button className="reply-choice" onClick={() => chooseOtherRoute('school')}><span>去附中輔導班找瑪莎和石頭</span><ChevronRight size={15} /></button>
          <button className="reply-choice" onClick={() => chooseOtherRoute('yanming')}><span>留在學校，遇見來找你的諺明哥</span><ChevronRight size={15} /></button>
        </div>
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

  if (routeRounds && (progress.phase === 'wen' || progress.phase === 'ashin' || progress.phase === 'yanming' || progress.phase === 'schoolWalk')) {
    const currentRound = routeRounds[progress.roundIndex]
    const selected = progress.pendingChoice !== null ? currentRound.choices[progress.pendingChoice] : null
    const comfortChoices = progress.route === 'wen' ? wenComfortChoices
      : progress.route === 'ashin' ? ashinComfortChoices
        : progress.route === 'masa' ? masaComfortChoices
          : progress.route === 'stone' ? stoneComfortChoices
            : null
    const selectedComfort = progress.pendingComfortChoice !== null && comfortChoices
      ? comfortChoices[progress.pendingComfortChoice] : null
    return (
      <April30Frame title={routeTitle} kicker={routeKicker}>
        <h2 className="story-scene-title">{routeHeading}</h2>
        {routeIntro.length > 0 && <April30Blocks blocks={routeIntro} />}
        {progress.choices.map((choiceIndex, index) => {
          const round = routeRounds[index]
          const choice = round?.choices[choiceIndex]
          if (!round || !choice) return null
          return (
            <div className="month-visit-round-history" key={index}>
              <div className="choice-heading">{round.title}</div>
              <April30Blocks blocks={round.scene} />
              <April30Blocks blocks={[d('你', choice.text), ...choice.response]} />
            </div>
          )
        })}
        <div className="month-visit-round-history">
          <div className="choice-heading">{currentRound.title}（第 {progress.roundIndex + 1}／5 輪）</div>
          <April30Blocks blocks={currentRound.scene} />
          {selected ? (
            <>
              <April30Blocks blocks={[d('你', selected.text), ...selected.response]} />
              {progress.roundIndex === 4 && progress.route !== 'yanming' && comfortChoices ? (
                selectedComfort ? (
                  <>
                    <div className="month-visit-round-history">
                      <div className="choice-heading">你選擇用這種方式陪他</div>
                      <April30Blocks blocks={selectedComfort.response} />
                    </div>
                    <div className="story-action-bar story-inline-action">
                      <button className="story-primary-button" onClick={continueRound}>看今天的結尾 <ChevronRight size={15} /></button>
                    </div>
                  </>
                ) : (
                  <div className="choice-area">
                    <div className="choice-heading">你想怎麼安慰他？</div>
                    {comfortChoices.map((choice, index) => (
                      <button className="reply-choice" key={index} onClick={() => chooseComfort(index)}>
                        <span>{choice.text}</span><ChevronRight size={15} />
                      </button>
                    ))}
                  </div>
                )
              ) : (
                <div className="story-action-bar story-inline-action">
                  <button className="story-primary-button" onClick={continueRound}>{progress.roundIndex < 4 ? '繼續下一輪' : '看今天的結尾'} <ChevronRight size={15} /></button>
                </div>
              )}
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

  if (progress.phase === 'complete' && progress.route) {
    const title = progress.route === 'wen' ? '天台上的午後'
      : progress.route === 'ashin' ? '一個人的練團室'
        : progress.route === 'masa' ? '放學路上的瑪莎'
          : progress.route === 'stone' ? '放學路上的石頭'
            : '帶著消息的午後'
    return (
      <April30Frame title="今天先到這裡" kicker="APRIL 30 · END OF DAY">
        <h2 className="story-scene-title">{title}</h2>
        <April30Blocks blocks={routeEnding} />
        <div className="reunion-pause-note">錢佑達正式退團的消息，已經成為大家都必須面對的現實。無論今天選擇去哪裡，這件事都不會改變。</div>
        <div className="story-action-bar story-inline-action">
          <button className="story-primary-button" onClick={finish}>結束今天 <ChevronRight size={15} /></button>
        </div>
      </April30Frame>
    )
  }

  return null
}
