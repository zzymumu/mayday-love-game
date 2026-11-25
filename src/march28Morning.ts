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
