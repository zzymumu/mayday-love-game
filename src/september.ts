export type SeptemberStoryBlock = {
  kind: 'narration' | 'dialogue' | 'aside'
  text: string
  speaker?: string
}

export const septemberIntroBlocks: SeptemberStoryBlock[] = [
  {
    kind: 'narration',
    text: '八月的日記才剛收好，九月就已經到了。離開學還有幾天，天氣仍然熱得很有夏天的樣子。你本來以為這個暑假會照著打工、練團和偶爾見面的節奏慢慢結束，沒想到大家忽然提議：不如趁還沒開學，真的出去玩一趟。',
  },
  {
    kind: 'narration',
    text: '目的地最後選了綠島。先搭火車到台東，再轉船上島。這次不是誰臨時約誰，也不是練團後順路吃個飯，而是六個人一起出門，三天兩夜，還要把樂器一起帶去。',
  },
  {
    kind: 'narration',
    text: '你想到海、火車、民宿，還有那幾個人湊在一起肯定不會安靜的樣子，光是整理行李就忍不住開始期待。九月四日一早，台北車站見。',
  },
]
