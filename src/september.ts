export type SeptemberStoryBlock = {
  kind: 'narration' | 'dialogue' | 'aside'
  text: string
  speaker?: string
}

export const septemberIntroBlocks: SeptemberStoryBlock[] = [
  {
    kind: 'narration',
    text: '八月的日子在便利店的冷氣聲、練團室偶爾傳來的鼓聲，還有一通通沒什麼正事的電話和訊息裡，慢慢走到了尾聲。等你回過神來，日曆已經翻到了九月。',
  },
  {
    kind: 'narration',
    text: '九月一日，星期一。暑氣還沒有完全退去，台大的校園卻已經開始有了新學期的樣子。系辦公告欄貼上新的課表，走廊裡有人抱著書來回找教室，腳踏車一輛接一輛停在熟悉的地方。',
  },
  {
    kind: 'narration',
    text: '你把新課表折好放進包包，忽然想起暑假裡那些零零碎碎的小事。便利店裡有人買完飲料還不肯走，炸雞店那張吵吵鬧鬧的桌子，還有練團室裡一段意外聽見的鼓聲。夏天好像真的要過去了，但有些事情才正要開始。',
  },
  {
    kind: 'narration',
    text: '新的月份，新的課表。至於那些還沒說完的話，就留到接下來的日子慢慢發生吧。',
  },
]
