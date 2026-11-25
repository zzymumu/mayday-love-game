import type { March28Block, March28CharacterId } from './march28'

export type March28MorningChoice = { text: string; response: string; affection: number }
export type March28MorningRound = { scene: March28Block[]; prompt: string; choices: March28MorningChoice[] }
export type March28MorningRoute = { introBlocks: March28Block[]; rounds: March28MorningRound[]; endingBlocks: March28Block[] }


const visitorNames: Record<Exclude<March28CharacterId, 'ashin'>, string> = {
  wen: '溫尚翊',
  masa: '瑪莎',
  stone: '石頭',
  yanming: '諺明',
}

export const getMarch28MorningVisitorIntroBlocks = (
  character: Exclude<March28CharacterId, 'ashin'>,
): March28Block[] => {
  const name = visitorNames[character]
  return [
    { kind: 'narration', text: '太陽漸漸升起來，陽光穿過樹葉，斑駁地落在長椅上。你原本還想再閉一會兒眼睛，結果一束陽光正好落在臉上，刺得你直皺眉。' },
    { kind: 'narration', text: '你把阿信的外套往上拉，乾脆蓋住臉，整個人往長椅裡縮了縮。' },
    { kind: 'narration', text: '不遠處傳來腳步聲。' },
    { kind: 'dialogue', speaker: name, text: '阿信！' },
    { kind: 'dialogue', speaker: '陳信宏', text: '欸？你怎麼來了？' },
    { kind: 'dialogue', speaker: name, text: '想說你應該還在這裡啊，昨天就沒看你回去。' },
    { kind: 'narration', text: '對方提著早餐袋走近幾步，紙袋窸窣作響。' },
    { kind: 'dialogue', speaker: name, text: '喏，買了飯糰。你應該還沒吃早餐吧？' },
    { kind: 'dialogue', speaker: '陳信宏', text: '哇，謝謝欸。' },
    { kind: 'narration', text: '你聽見熟悉的聲音，外套底下，你悄悄把臉露出來一點。' },
    { kind: 'dialogue', speaker: '你', text: '……早。' },
    { kind: 'narration', text: '原本正提著早餐袋的人，動作頓了一下。他低頭看向長椅，這才發現阿信旁邊還坐著一個人。你的頭髮有些凌亂，肩上披著一件明顯不是自己的外套。' },
    { kind: 'dialogue', speaker: name, text: '……妳怎麼也在？' },
    { kind: 'dialogue', speaker: '陳信宏', text: '她昨天留下來陪我啊，坐到現在了。' },
  ]
}


const march28MorningAshinIntro: March28Block[] = [
  { kind: 'narration', text: '太陽已經完全升起來了。陽光穿過樹葉，一塊一塊落在長椅上，剛好照到你的臉。你皺了皺眉，把阿信的外套往上拉，乾脆蓋住半張臉，只露出一點亂糟糟的頭髮。' },
  { kind: 'narration', text: '阿信坐在旁邊，手裡還拿著昨天整理的器材清單。聽見你窸窸窣窣的動靜，他轉過頭來，看到你把自己裹得嚴嚴實實的樣子，忍不住笑了一下。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '欸，妳還在睡喔？' },
  { kind: 'dialogue', speaker: '你', text: '沒有啦，太陽好刺眼……' },
  { kind: 'narration', text: '他順著你的動作看了一眼，嘴角彎了起來。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '那妳再躲一下好了。' },
  { kind: 'narration', text: '你剛想把外套往下拉一點，肚子卻突然不爭氣地叫了一聲。你動作一頓，下意識伸手按住肚子。阿信先是愣了一下，隨後低下頭，肩膀輕輕抖了兩下。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '餓了喔？' },
  { kind: 'dialogue', speaker: '你', text: '有一點……坐到現在才發現真的好餓。' },
  { kind: 'narration', text: '阿信低頭看了看時間，又看了看你。他把手裡的清單放到一邊，抬手揉了揉有些發酸的眼睛。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '那妳等我一下，我去買早餐。' },
  { kind: 'dialogue', speaker: '你', text: '你要去哪裡？' },
  { kind: 'dialogue', speaker: '陳信宏', text: '外面有早餐店啊。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '我去買蛋餅給妳吃，好不好？' },
  { kind: 'dialogue', speaker: '你', text: '可是你不是還要顧器材嗎？' },
  { kind: 'dialogue', speaker: '陳信宏', text: '器材箱我先確認好，妳幫我看一下嘛，我很快就回來。' },
]

const march28MorningAshinRound1: March28MorningRound = {
  scene: [],
  prompt: '阿信說要先確認器材，再去買早餐。你怎麼回應？',
  choices: [
    { text: '好啊，那你快去快回。', response: '阿信點點頭，嘴角彎了一下。「好，馬上回來。」他把清單收好，準備再確認一次器材箱。', affection: 2 },
    { text: '你也要買一份，不准只顧我。', response: '他愣了一下，隨即笑出來。「知道啦，兩份都買。妳還幫我記得喔？」他抬手比了個二，這才彎腰去檢查器材。', affection: 3 },
    { text: '真的不用特地跑啦，我吃點別的也可以。', response: '阿信搖搖頭。「沒關係啦，我自己也要吃啊。妳坐著等我一下就好。」他說得很自然，像是早就決定好了。', affection: 1 },
  ],
}


const march28MorningAshinRound2: March28MorningRound = {
  scene: [
    { kind: 'narration', text: '他先彎腰檢查器材箱，手指沿著箱扣逐一按過去，又確認旁邊的線材箱都放在原來的位置。確定沒有問題後，他才起身往公園出口走。' },
    { kind: 'narration', text: '走出幾步，他忽然又回過頭。' },
    { kind: 'dialogue', speaker: '陳信宏', text: '妳不要亂跑喔。' },
    { kind: 'dialogue', speaker: '你', text: '知道啦！我又不是小朋友。' },
    { kind: 'dialogue', speaker: '陳信宏', text: '好啦，知道妳不是。等我一下喔。' },
    { kind: 'narration', text: '他的身影沿著步道慢慢走遠。你重新把外套拉好，坐在長椅上看著旁邊的器材箱。沒過多久，遠處就傳來熟悉的腳步聲。阿信提著一個紙袋回來，袋子裡裝著兩份剛買好的蛋餅，隔著紙袋都能聞到煎蛋的香味。' },
    { kind: 'dialogue', speaker: '陳信宏', text: '來，這個給妳。' },
    { kind: 'dialogue', speaker: '你', text: '你真的買蛋餅回來啦？' },
    { kind: 'dialogue', speaker: '陳信宏', text: '不然咧？我剛剛都答應妳了。' },
  ],
  prompt: '阿信把熱騰騰的蛋餅遞給你。你怎麼回應？',
  choices: [
    { text: '你真的很守信用欸。', response: '阿信笑著把紙袋往你手邊推近一點。「這種事當然要說到做到啊。」他看著你接過早餐，眼神也跟著柔和下來。', affection: 2 },
    { text: '聞起來好香，我現在就想吃！', response: '他看你迫不及待的樣子，忍不住笑起來。「那妳快吃啊，還熱著。」他把紙袋口替你折開一些，方便你拿。', affection: 3 },
    { text: '你買了多久啊，我都快等不及了。', response: '阿信笑了一聲。「有這麼誇張喔？我才出去一下下欸。」他抬手比了個很短的距離，像是在替自己辯解。', affection: 1 },
  ],
}


const march28MorningAshinRound3: March28MorningRound = {
  scene: [
    { kind: 'narration', text: '他把其中一份遞給你，自己的那份仍好好地裝在紙袋裡，還沒有拆開。你低頭咬了一口，外皮煎得微微酥脆，裡面的雞蛋還軟軟的。' },
    { kind: 'dialogue', speaker: '你', text: '你怎麼知道我想吃蛋餅？' },
    { kind: 'dialogue', speaker: '陳信宏', text: '不知道啊，剛好看到那間早餐店開了，就想說買這個給妳。' },
    { kind: 'dialogue', speaker: '陳信宏', text: '而且妳昨天陪我坐到現在，總不能連早餐都讓妳自己想辦法吧。' },
    { kind: 'dialogue', speaker: '你', text: '那你呢？你也一晚上沒吃東西吧？' },
    { kind: 'dialogue', speaker: '陳信宏', text: '我也有啊，妳看。' },
    { kind: 'narration', text: '他把另一份還沒拆開的蛋餅拿起來，在你面前晃了晃。' },
  ],
  prompt: '阿信自己的早餐還沒拆開。你怎麼說？',
  choices: [
    { text: '那你快吃啦，不然等一下就涼了。', response: '阿信笑著點頭。「好啦，我現在就吃。」他低頭拆開自己的包裝，咬了一口，這才安心地靠回長椅。', affection: 2 },
    { text: '你剛剛是不是一直等我先吃？', response: '他拆包裝的手停了一下，抬眼看你，嘴角有點藏不住笑意。「有一點啦，想先看看妳喜不喜歡。」說完才低頭拆開自己的那份。', affection: 3 },
    { text: '你再不吃，我就要搶你的了！', response: '阿信立刻把自己的蛋餅往身邊挪了挪。「欸！妳自己的還沒吃完欸！」他笑著搖搖頭，趕緊拆開包裝，先咬了一口。', affection: 3 },
  ],
}

const march28MorningAshinEnding: March28Block[] = [
  { kind: 'narration', text: '阿信終於也開始好好吃早餐。你咬著手裡的蛋餅，他偶爾轉過頭看看你的表情，像是比起自己吃得怎麼樣，更在意你喜不喜歡。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '好吃嗎？' },
  { kind: 'narration', text: '你點點頭。他看見你的反應，眼睛彎了一下，這才低頭繼續吃自己的那份。晨光落在長椅上，紙袋裡還留著一點煎蛋的香味。' },
]

export const march28MorningAshinRoute: March28MorningRoute = {
  introBlocks: march28MorningAshinIntro,
  rounds: [march28MorningAshinRound1, march28MorningAshinRound2, march28MorningAshinRound3],
  endingBlocks: march28MorningAshinEnding,
}
