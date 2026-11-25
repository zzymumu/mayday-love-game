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
    { kind: 'narration', text: '你聽見熟悉的聲音，才意識到有人來了。外套底下，你悄悄把臉露出來一點。' },
    { kind: 'dialogue', speaker: '你', text: '……早。' },
    { kind: 'narration', text: '原本正提著早餐袋的人，動作頓了一下。他低頭看向長椅，這才發現阿信旁邊還坐著一個人。你的頭髮有些凌亂，肩上披著一件明顯不是自己的外套。' },
    { kind: 'dialogue', speaker: name, text: '……妳怎麼也在？' },
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
