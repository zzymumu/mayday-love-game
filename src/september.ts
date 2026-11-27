export type SeptemberStoryBlock = {
  kind: 'narration' | 'dialogue' | 'aside'
  text: string
  speaker?: string
}

export const septemberIntroBlocks: SeptemberStoryBlock[] = [
  {
    kind: 'narration',
    text: '八月的日記才剛收好，九月就已經到了。離開學還有幾天，天氣仍然熱得很有夏天的樣子。你本來以為這個暑假會照著打工、練團和偶爾見面的節奏慢慢結束，沒想到下午忽然收到一條訊息，說大家今晚都到練團室一趟，有件事想一起商量。',
  },
  {
    kind: 'narration',
    text: '你出門時還不知道這趟約會變成什麼樣子。只知道大家難得都有空，連諺明哥都說會過來。等你走進練團室，看見桌上多了一本旅遊手冊和幾張火車時刻表，才發現這次好像不是普通的聚會。',
  },
  {
    kind: 'narration',
    text: '九月的夏天還沒結束，而你們似乎正打算把它再拉長一點。',
  },
]
