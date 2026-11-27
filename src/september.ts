export type SeptemberStoryBlock = {
  kind: 'narration' | 'dialogue' | 'aside'
  text: string
  speaker?: string
}

export const septemberIntroBlocks: SeptemberStoryBlock[] = [
  {
    kind: 'narration',
    text: '八月的日記才剛收好，暑假卻還剩下一小截。台北的午後熱得讓人不想動，你原本以為接下來還是照常去練團室、偶爾約人吃飯，直到瑪莎突然傳訊息，說今晚大家都要到練團室集合，誰都不准找藉口。',
  },
  {
    kind: 'narration',
    text: '你到的時候，溫尚翊正坐在地上整理導線，阿信抱著木吉他，石頭把一本旅遊手冊攤在桌上。諺明哥也難得提早到了，手邊還放著列印好的火車時刻表。桌上那張綠島海岸的照片，被電風扇吹得一直翹起來。',
  },
  {
    kind: 'narration',
    text: '原來這次不是臨時約吃飯。你們打算趁開學前，帶著樂器去綠島住三天兩夜，把夏天再拖長一點。',
  },
]
