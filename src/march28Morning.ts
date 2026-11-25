import type { March28Block, March28CharacterId } from './march28'

export type March28MorningChoice = { text: string; response: string; affection: number }
export type March28MorningRound = { scene: March28Block[]; prompt: string; choices: March28MorningChoice[] }
export type March28MorningRoute = { introBlocks: March28Block[]; rounds: March28MorningRound[]; endingBlocks: March28Block[] }
