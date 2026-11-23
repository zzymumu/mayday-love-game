export type WinterCharacterId = 'wen' | 'masa' | 'ashin' | 'stone' | 'yanming'
export type WinterStoryBlock = { kind: 'narration' | 'dialogue' | 'aside'; text: string; speaker?: string }
export type WinterRoundChoice = {
  text: string
  response: WinterStoryBlock[]
  affection: Partial<Record<WinterCharacterId, number>>
}
export type WinterRound = {
  scene?: string
  promptSpeaker: string
  prompt: string
  choices: WinterRoundChoice[]
}
export type WinterBusStopRoute = {
  label: string
  title: string
  blocks: WinterStoryBlock[]
  diarySummary: string
}
export type WinterDiaryData = { title: string; sections: { label: string; text: string }[] }

export const winterExamIntroBlocks: WinterStoryBlock[] = [
  { kind: 'narration', text: '一月七日，期末考週。新年的熱鬧才剛過去沒幾天，校園又被一疊疊講義、參考書和咖啡杯占滿。走廊上有人抱著課本邊走邊背，教室門口貼著考試時間表，連平常最愛聊天的同學，這幾天見面第一句也變成了「妳讀到哪裡了？」' },
  { kind: 'narration', text: '統計學的講義攤在桌上，平均數、中位數、標準差和一堆看起來長得很像的符號排在一起。你盯著同一題看了好一會兒，算式寫了又擦，橡皮擦屑堆在桌角，答案還是跟參考書對不起來。' },
  { kind: 'narration', text: '窗外的天色慢慢暗下來。你翻到通訊錄，手指在溫尚翊的名字上停了一會兒。想到他之前聊起統計學時一副很有把握的樣子，你決定這次不要再自己硬撐，主動問問看他有沒有空。' },
]

export const winterExamChatChoices = [
  {
    text: '我有幾題真的不太會，尤其是平均數跟標準差……明天下午去圖書館可以嗎？',
    response: '可以啊，明天下午我有空。兩點在圖書館碰面？妳把課本跟講義都帶來，我先幫妳找個位子。',
  },
  {
    text: '我快被統計學逼瘋了啦！你明天下午能不能救救我？我們去圖書館好不好？',
    response: '哈哈，有這麼嚴重喔？好啦，明天下午兩點，圖書館見。我們慢慢看，不要自己先嚇自己。',
  },
  {
    text: '如果你方便的話，明天下午可以陪我在圖書館讀一下嗎？我想把不懂的地方弄清楚。',
    response: '方便啊。那就明天下午兩點，圖書館見。妳先把不會的題目標起來，來了我們一題一題看。',
  },
]

export const winterExamTutoringIntroBlocks: WinterStoryBlock[] = [
  { kind: 'narration', text: '隔天下午，你抱著一疊講義走進圖書館。午後的陽光從高窗斜斜照進來，落在一排排書架和木桌上。館內很安靜，只有翻頁聲、鉛筆寫過紙面的沙沙聲，還有遠處偶爾傳來的椅腳聲。' },
  { kind: 'narration', text: '你照著昨晚約好的時間往窗邊走，遠遠就看見溫尚翊坐在那裡。他把外套搭在椅背上，桌上攤著自己的筆記，旁邊還放了一杯熱飲。看見你，他抬起手示意，順便把對面的椅子拉開。' },
  { kind: 'narration', text: '你把講義放到桌上，才發現他不只帶了課本，還另外整理了一張筆記。上面把幾個容易混淆的觀念分成小格，旁邊畫著箭頭和例題，連你之前問過的地方都做了記號。' },
  { kind: 'narration', text: '你本來還有點緊張，看到那張紙，心裡忽然踏實了一點。他把筆遞給你，示意你先把最不懂的那一題翻出來。今天的統計學補習，總算正式開始了。' },
]

export const winterExamTutoringRounds: WinterRound[] = [
  {
    scene: '你把講義翻到折了好幾個角的那一頁，指著題目裡一串數字。溫尚翊沒有急著拿筆替你算，而是先把題目從頭看了一遍，接著用筆尾輕輕點了點題幹。',
    promptSpeaker: '溫尚翊',
    prompt: '先不要急著套公式。妳看這題，題目要我們找的是平均數，還是中位數？先說說妳怎麼想。',
    choices: [
      { text: '我覺得是平均數？可是我不知道為什麼。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '方向差不多。先看題目給的資料，再想它要代表整體的哪一種位置，不是看到數字就全部加起來啦。' }, { kind: 'dialogue', speaker: '溫尚翊', text: '來，這次妳自己講一次，我聽聽看。' }], affection: { wen: 2 } },
      { text: '我看不懂它到底在問什麼，你先幫我拆句子。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '好，這樣比較快。先把題目最後一句圈起來，再回頭看前面給了什麼資料。' }, { kind: 'dialogue', speaker: '溫尚翊', text: '妳不是不會，是一看到一整段就先被嚇到了。慢慢來。' }], affection: { wen: 3 } },
      { text: '你先講一遍，我再自己算給你看。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '可以啊。妳先看我寫的這個例子，等一下換妳做，不能只負責點頭。' }, { kind: 'dialogue', speaker: '溫尚翊', text: '我會看著妳算，不會偷幫妳寫答案。' }], affection: { wen: 2 } },
    ],
  },
  {
    scene: '第一題終於算對了。你才剛鬆一口氣，溫尚翊就把講義往後翻了一頁。下一題開始出現平方、差值和一長串計算，你的表情又慢慢垮下來。他看了一眼，忍不住笑了一聲，卻沒有催你。',
    promptSpeaker: '溫尚翊',
    prompt: '這題是標準差。不要看到一堆平方就想逃跑，妳先告訴我，為什麼要看每個數字離平均數有多遠？',
    choices: [
      { text: '因為想知道大家的差距有多大？', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '對，就是這個意思。妳看，妳其實知道，只是每次都不敢相信自己。' }, { kind: 'dialogue', speaker: '溫尚翊', text: '先把概念弄懂，公式就只是照順序算，不用怕它。' }], affection: { wen: 3 } },
      { text: '我腦袋已經被平方塞滿了，可以休息三秒嗎？', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '三秒也太短了吧。好啦，給妳三分鐘，喝口水再回來。' }, { kind: 'dialogue', speaker: '溫尚翊', text: '不過休息完要把這題做完，不能跟平方和解。' }], affection: { wen: 2 } },
      { text: '我知道一點點，但你再講慢一點啦。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '好，我慢一點。妳有哪一步跟不上就直接問，不用怕打斷我。' }, { kind: 'dialogue', speaker: '溫尚翊', text: '今天本來就是來幫妳弄懂的，又不是來比誰講得快。' }], affection: { wen: 3 } },
    ],
  },
  {
    scene: '圖書館裡很安靜，遠處偶爾傳來翻頁聲和椅腳挪動的聲音。溫尚翊俯身替你指出算式裡漏掉的一步，你也跟著低下頭，兩個人的筆尖剛好停在同一個位置。你下意識往旁邊讓了讓，他卻只是把筆遞給你。',
    promptSpeaker: '溫尚翊',
    prompt: '這裡少寫了一步。妳剛剛是不是算到後面就開始趕了？',
    choices: [
      { text: '因為你坐旁邊，我有點緊張啦。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '蛤？我又不會吃掉妳。' }, { kind: 'dialogue', speaker: '溫尚翊', text: '……好啦，那我坐遠一點點。可是有問題還是要叫我。' }], affection: { wen: 3 } },
      { text: '我怕你等太久嘛，想快點算完。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '我又沒有在趕時間。妳慢慢算，算對比較重要。' }, { kind: 'dialogue', speaker: '溫尚翊', text: '我今天下午都留給妳了，不用急。' }], affection: { wen: 3 } },
      { text: '哪有，我只是想測試你有沒有認真看。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '喔？那我是不是還要謝謝妳出題考我？' }, { kind: 'dialogue', speaker: '溫尚翊', text: '好啦，這次算妳過關。下一題換妳自己來。' }], affection: { wen: 2 } },
    ],
  },
  {
    scene: '你們不知不覺坐了快兩個小時。溫尚翊看你揉了揉眼睛，便把筆放下，從外套口袋裡拿出一小包餅乾，推到你手邊。你低頭一看，還是你平常會買的那種口味。',
    promptSpeaker: '溫尚翊',
    prompt: '先休息一下。妳午餐有好好吃嗎？不要跟我說又忙到忘記吃。',
    choices: [
      { text: '有啦！不過餅乾我可以收下，謝謝溫老師。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '少來，什麼溫老師。餅乾拿去吃，等一下才有力氣算。' }, { kind: 'dialogue', speaker: '溫尚翊', text: '我記得妳喜歡這個口味，剛好看到就買了。' }], affection: { wen: 3 } },
      { text: '其實沒有……我本來想算完再去吃。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '妳喔，讀書也不是這樣讀的。先吃一點，等一下我陪妳去買東西。' }, { kind: 'dialogue', speaker: '溫尚翊', text: '題目又不會趁妳吃飯的時候自己跑掉。' }], affection: { wen: 3 } },
      { text: '你怎麼連我喜歡吃什麼都記得？', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '就……之前看妳買過啊。這有什麼好奇怪的。' }, { kind: 'dialogue', speaker: '溫尚翊', text: '快吃啦，等一下餅乾都要被妳問到軟掉了。' }], affection: { wen: 3 } },
    ],
  },
  {
    scene: '最後一題是模擬考裡最長的題目。你照著剛剛整理的步驟，一行一行寫下去，中間停了一次，自己回頭檢查，最後把答案圈起來。溫尚翊看完沒有立刻說話，只是把你的講義轉正，仔細對了一遍。',
    promptSpeaker: '溫尚翊',
    prompt: '這題妳自己做完了欸。要不要先別看我的答案，妳說說看，這次為什麼會算對？',
    choices: [
      { text: '因為我有一個很厲害的老師啊。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '這句我可以收下。' }, { kind: 'dialogue', speaker: '溫尚翊', text: '不過主要還是妳自己算出來的，這次真的有進步。' }], affection: { wen: 3 } },
      { text: '因為我終於沒有一看到公式就慌掉了。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '對啊，先看懂題目再動筆，妳就不會一直被那些符號牽著走。' }, { kind: 'dialogue', speaker: '溫尚翊', text: '考試的時候也照這樣來，不要一緊張就把自己嚇到。' }], affection: { wen: 2 } },
      { text: '因為你今天不准我偷懶，只好認真了。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '我哪有不准妳偷懶？我只是把妳拉回來而已。' }, { kind: 'dialogue', speaker: '溫尚翊', text: '好啦，今天表現不錯。考完再請妳吃東西，當作補習費。' }], affection: { wen: 3 } },
    ],
  },
]

export const winterExamTutoringEnding: WinterStoryBlock[] = [
  { kind: 'narration', text: '圖書館廣播提醒閉館時，你才發現窗外已經完全暗了。桌上的講義被你們整理成兩疊，錯題旁邊多了幾個溫尚翊寫的小註記，原本看起來像天書的公式，現在至少知道該從哪裡下手。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '今天先到這裡。回去把剛剛那幾題再做一次，明天考試不要又只記答案。' },
  { kind: 'dialogue', speaker: '你', text: '知道啦，謝謝你今天救我。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '不用謝啦。考完再跟我說結果，考得好不好都可以講。' },
  { kind: 'narration', text: '你把講義塞進包包時，他伸手替你把散在桌上的橡皮擦屑掃到紙巾上。明明只是很普通的一個動作，你卻突然覺得，這次期末考好像沒有原本那麼難熬了。' },
]

export const winterBreakPracticeBlocks: WinterStoryBlock[] = [
  { kind: 'narration', text: '一月二十二日，最後一科考試結束已經半個月。校園裡的學生少了很多，走廊安靜下來，寒假終於正式開始。你原本以為這幾天可以好好睡到自然醒，結果下午就收到訊息，說晚上要去酒吧看他們駐唱，出發前大家會先到諺明哥那邊練一下。' },
  { kind: 'narration', text: '諺明哥那裡比你想像中熱鬧。客廳一角堆著音箱、導線和幾個裝器材的箱子，牆邊的鼓組擦得很乾淨，鼓棒整整齊齊地放在架上。你才剛進門，就聽見瑪莎在嫌佑達把導線繞得像一團麵線。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '欸，我這樣哪裡不對？明明就有收好啊！' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '你自己看啦，這個結打得比我耳機線還誇張。等一下誰要拆？你是不是想留給老闆當紀念品？' },
  { kind: 'dialogue', speaker: '劉諺明', text: '先放著，我等一下整理。你們先把要用的東西拿出來，不要全部擠在門口。' },
  { kind: 'narration', text: '溫尚翊正蹲在音箱旁邊確認接線，阿信拿著一張寫滿歌序的紙，石頭則在調整吉他的背帶。你一進來，幾個人幾乎同時抬頭，原本各忙各的聲音又多了一層招呼。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '妳來啦。外面冷不冷？先把外套放裡面，等一下不要站在門口吹風。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '今天來得剛好，我們才剛要從第一首開始。妳等一下可以幫我們聽聽看，哪裡接起來比較順。' },
  { kind: 'dialogue', speaker: '石錦航', text: '桌上有熱茶，妳先喝一點。線跟器材先不要碰，這邊有幾條還沒接好。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '妳坐那邊就好，等一下如果太吵就跟我說。' },
  { kind: 'narration', text: '五個人很快又回到各自的位置。阿信試了試麥克風，溫尚翊撥了幾下弦，石頭跟著找和弦，瑪莎抱著 Bass 在旁邊調音，佑達坐到鼓組前敲了幾下。幾個音還沒完全對上，瑪莎已經先喊停，說有人慢了半拍。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '等一下等一下，剛剛那裡到底是誰慢？我聽到有人在後面散步欸。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '你不要每次都先懷疑鼓好不好！我剛剛明明跟得上。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '先不要吵，重來一次。這次前面數清楚，大家一起進。' },
  { kind: 'narration', text: '第二次總算順了不少。你坐在沙發邊，手指跟著節拍輕輕敲膝蓋。諺明哥原本只是站在旁邊聽，聽到某一段時卻下意識伸手拿起鼓棒，在空中比了兩下。瑪莎眼尖，一下就看見了。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '欸，老闆，你手都拿起來了，不然自己來啊？' },
  { kind: 'dialogue', speaker: '劉諺明', text: '我很久沒打了啦，你們先練你們的。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '少來，你以前不是打得很厲害？來一段啦，我讓位給你。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '對啊，難得大家都在，讓我們聽一下嘛。' },
  { kind: 'dialogue', speaker: '石錦航', text: '鼓棒都拿在手上了，就不要客氣了。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '來啦，打幾個小節就好。今天又不是正式演出。' },
  { kind: 'narration', text: '幾個人一人一句，諺明哥最後只好笑著搖頭。他把袖子往上拉，坐到鼓組前，先輕輕敲了幾下確認手感。下一秒，節奏忽然完整地跑起來，低音鼓穩穩踩在拍點上，軍鼓和鈸聲一層一層推開，原本有點散的空氣像被他一下收攏。' },
  { kind: 'narration', text: '他沒有刻意炫技，只是把一段熟悉的節奏打得乾淨又漂亮。佑達站在旁邊看得眼睛都亮了，瑪莎更是直接吹了一聲口哨。等最後一下鈸聲落下，房間裡安靜了半秒，接著所有人一起拍手。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '靠，這叫很久沒打？你剛剛那個轉拍也太順了吧！' },
  { kind: 'dialogue', speaker: '劉諺明', text: '少誇張了啦，手還記得而已。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '你不要再謙虛了，剛剛那段我差點以為我們今天要換鼓手。' },
]

export const winterBreakPracticeRounds: WinterRound[] = [
  {
    scene: '諺明哥把鼓棒放回架上，佑達還站在旁邊研究剛剛那段節奏。你看著鼓組，突然覺得平常總是最穩、最像負責收拾大家的人，原來也有這麼帥氣的一面。',
    promptSpeaker: '蔡昇晏',
    prompt: '妳剛剛是不是看傻了？老闆以前可是有練過的欸。',
    choices: [
      { text: '我真的嚇到！諺明哥也太厲害了吧。', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '沒有啦，妳太客氣了。只是以前常打，手還記得。' }, { kind: 'dialogue', speaker: '錢佑達', text: '這哪是手還記得，根本是隨時可以回來搶我的位置！' }], affection: { yanming: 3 } },
      { text: '你不是說很久沒打？這樣叫很久沒打喔？', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '哈哈，真的有一段時間了。偶爾碰一下，還不至於全部忘光。' }, { kind: 'dialogue', speaker: '蔡昇晏', text: '聽到沒有？本人都說還沒忘光了，等一下再逼他來一次。' }], affection: { yanming: 2, masa: 1 } },
      { text: '下次可不可以教我一點？我也想試試看。', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '可以啊。下次有空我慢慢教妳，先從最基本的拍子開始。' }, { kind: 'dialogue', speaker: '溫尚翊', text: '妳先不要一次學太多，等一下又多一個人要我們顧。' }], affection: { yanming: 3, wen: 1 } },
    ],
  },
]

export const winterBreakPracticeEnding: WinterStoryBlock[] = [
  { kind: 'narration', text: '大家又把剛剛的歌序順了一遍。諺明哥沒有再坐回鼓組，只是在旁邊聽著，偶爾提醒某個地方可以再收乾淨一點。等時間差不多，五個人開始收拾要帶去酒吧的器材。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '你們晚上好好唱，器材我先幫你們看著。結束了傳個訊息，太晚就不要自己亂走。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '知道啦。你也別忙到太晚，等一下我們會注意。' },
  { kind: 'narration', text: '你跟著他們一起出門。諺明哥站在門邊目送你們，佑達走到巷口還回頭喊了一句下次一定要再聽他打鼓，惹得大家又笑成一團。' },
]

export const winterBreakGigIntroBlocks: WinterStoryBlock[] = [
  { kind: 'narration', text: '晚上八點多，你跟著他們走進那間不大的酒吧。入口藏在一條熱鬧街道旁的樓梯下，推開門時，先聽見杯子碰撞的聲音，再聞到一點木頭、飲料和舊音箱混在一起的味道。舞台不高，燈光偏暖，幾張桌子已經坐滿，靠近舞台的位置還有人把外套搭在椅背上，像是專程來等今晚的表演。' },
  { kind: 'narration', text: '五個人一上台，原本還在聊天的客人慢慢安靜下來。溫尚翊把吉他背好，試了試音量；石頭站到另一側調整效果器；瑪莎抱著 Bass，低頭確認最後一個旋鈕；阿信走到麥克風前，先笑著跟台下打招呼；佑達坐在鼓組後面，抬起鼓棒敲了兩下。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '晚上好，今天很高興可以在這裡跟大家一起玩音樂。等一下如果有哪一首你們聽過，也可以跟著我們一起唱。' },
  { kind: 'narration', text: '第一首歌的前奏一出來，整個空間像是突然被接上電。吉他的聲音從音箱裡推開，Bass 線把節奏穩穩托住，鼓點落下時，桌上的杯子都跟著輕輕震了一下。阿信的聲音越過人群，原本還有點拘謹的台下，很快就有人跟著拍手。' },
  { kind: 'narration', text: '第二首比第一首更熱鬧。瑪莎一邊彈一邊朝石頭做了個表情，石頭差點笑出來，溫尚翊則在轉段時抬頭看了一眼佑達，幾個人像是早就練過無數次，彼此不用多說就知道下一拍要往哪裡走。' },
  { kind: 'narration', text: '你坐在離舞台不遠的位置，近到能看見他們額角的汗、手指按弦時細小的動作，還有每次一首歌結束後，幾個人交換眼神時那種只有一起練過很久才會有的默契。酒吧裡的掌聲和口哨聲一陣接一陣，連你也忍不住跟著節拍拍起手來。' },
]

export const winterGigFocusBlocks: Record<WinterCharacterId, WinterStoryBlock[]> = {
  wen: [
    { kind: 'narration', text: '你最常注意到的是溫尚翊。他彈吉他時整個人像是終於找到最自在的位置，平常說話有點嘴硬的樣子不見了，手指一落到弦上，連眉眼都變得專注。中間換歌時，他往台下掃了一眼，視線剛好停在你這邊。你還沒來得及移開眼睛，他已經很輕地笑了一下，接著把下一段前奏彈得比剛才更有精神。' },
    { kind: 'dialogue', speaker: '溫尚翊', text: '謝謝大家今天來。等一下還有幾首，大家不要太早走喔。' },
  ],
  ashin: [
    { kind: 'narration', text: '你的目光不知不覺一直跟著阿信。他站在麥克風前時，比平常聊天多了一點靦腆，可一開口，聲音就很自然地把整個酒吧填滿。唱到副歌時，他看見台下有人跟著拍手，笑得像是突然收到很好的回應。你發現他每唱完一段，都會趁間奏喝一口水，再低頭確認下一首的歌序。' },
    { kind: 'dialogue', speaker: '陳信宏', text: '謝謝你們，真的。今天大家都很捧場，唱到後面我都有點捨不得停了。' },
  ],
  masa: [
    { kind: 'narration', text: '瑪莎在台上完全不像平常那個嘴巴停不下來的人。他抱著 Bass，節奏一進來就穩穩地踩住整首歌，偶爾還故意朝石頭挑一下眉，像是在等對方回他一個眼神。第三首中間他看見你笑了，立刻用嘴型問了一句「笑什麼」，手上卻一點也沒慢，害你差點又笑出聲。' },
    { kind: 'dialogue', speaker: '蔡昇晏', text: '剛剛那邊有沒有聽到？不要只顧著笑，拍手啦！' },
  ],
  stone: [
    { kind: 'narration', text: '石頭在舞台另一側安安靜靜地彈著吉他，卻是你很難忽略的一個人。他每次進拍都很準，和溫尚翊的聲音一前一後接起來，讓整首歌聽起來特別完整。燈光掃過他時，他偶爾會抬頭看看台下，確認大家有沒有跟上，像是連表演也不忘照顧每個人的感受。' },
    { kind: 'dialogue', speaker: '石錦航', text: '如果你們喜歡剛剛那首，等一下最後一首也可以一起拍手喔。' },
  ],
  yanming: [
    { kind: 'narration', text: '你明明知道諺明哥沒有跟他們一起上台，視線卻還是好幾次想起下午那段鼓聲。那幾個小節打得乾淨俐落，連佑達都忍不住說他差點要把鼓手的位置讓出來。此刻看著台上的五個人，你才發現下午那一段不只是大家起鬨的插曲，也讓你看見了諺明哥平常沉穩之外、很少露出來的一面。' },
    { kind: 'dialogue', speaker: '你', text: '下午那段真的好厲害……' },
  ],
}

export const winterBreakGigEndingBlocks: WinterStoryBlock[] = [
  { kind: 'narration', text: '最後一首歌結束時，酒吧裡的掌聲比前面幾次都大。有人吹口哨，有人站起來拍手，阿信笑著向台下鞠躬，溫尚翊和石頭把吉他稍微放低，瑪莎還不忘朝剛剛一直拍手的客人揮了揮手。佑達從鼓組後面站起來，額頭全是汗，卻笑得很得意。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '欸欸欸，剛剛那個最後的拍子有沒有帥到？我就說今天狀態很好吧！' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '你先把鼓棒放下再說，不然等一下又要敲到人家的杯子。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '今天真的很開心，謝謝你們來聽。' },
  { kind: 'narration', text: '你還坐在原位，耳朵裡像是留著剛才的鼓聲和吉他尾音。幾個人下台後忙著收線、把器材搬到一旁。佑達被老闆叫住，要留下來確認費用和器材清單；溫尚翊、阿信、瑪莎和石頭則先走到門口透透氣。' },
  { kind: 'narration', text: '外頭的夜風比酒吧裡冷得多。你把外套拉緊，才發現散場後的街道還是很熱鬧，遠處公車站的站牌在路燈下亮著。幾個人回頭看你，像是在等你決定接下來要跟誰一起走。' },
]

export const winterYanmingPickupBlocks: WinterStoryBlock[] = [
  { kind: 'narration', text: '你正準備跟大家往外走，手機忽然震了一下。螢幕上跳出諺明哥的名字。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '我到酒吧外面了。你們結束了嗎？外面有點冷，慢慢出來就好。' },
  { kind: 'narration', text: '你推開酒吧的門，果然看見諺明哥站在騎樓下。他手裡拿著一件多帶來的外套，先朝你點了點頭，才把視線移向其他人。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '辛苦了，今天唱得不錯。妳如果要搭公車，我陪妳走到站牌那邊。' },
  { kind: 'narration', text: '他沒有特別張揚，只是很自然地站在你旁邊，像是早就把「等你散場」這件事安排進今晚的行程裡。' },
]

export const winterBusStopRoutes: Record<WinterCharacterId, WinterBusStopRoute> = {
  wen: {
    label: '跟溫尚翊一起走',
    title: '和溫尚翊走到公車站',
    blocks: [
      { kind: 'narration', text: '溫尚翊走在你旁邊，出門後很自然地把步伐放慢。酒吧門口還有人在聊剛才的表演，街角的招牌一閃一閃，夜風從巷子裡灌過來，你下意識縮了縮脖子。他看見了，伸手把你外套領口往上拉了一點。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '剛剛不是拍手拍得很大聲？現在知道冷喔。' },
      { kind: 'dialogue', speaker: '你', text: '我那是捧場！而且你們真的唱得很好啊。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '有聽到就好。妳站那麼前面，音箱很大聲吧？耳朵有沒有不舒服？' },
      { kind: 'narration', text: '你們一路聊著剛才的歌。他嘴上問得像是在確認音響有沒有問題，卻連你剛才在哪一首開始跟著打拍子都記得。走到公車站時，他先看了一眼路線牌，又替你確認下一班車還要等多久。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '車還有幾分鐘。妳站裡面一點，不要一直吹風。等車來了我再走。' },
      { kind: 'narration', text: '公車從街口轉進來時，他往前一步替你看了車號。你上車前回頭跟他揮手，他也抬起手，直到車門關上才退回站牌旁。' },
    ],
    diarySummary: '散場後跟溫尚翊一起走到公車站。他一路嘴上嫌我拍手太大聲，卻一直留意我冷不冷、耳朵有沒有被音箱震到，還替我看好公車路線。車來時，他站在站牌旁等我上車才離開。',
  },
  ashin: {
    label: '跟陳信宏一起走',
    title: '和陳信宏走到公車站',
    blocks: [
      { kind: 'narration', text: '阿信走出門後先把外套拉好，接著問你剛剛最喜歡哪一首。你們沿著騎樓慢慢走，酒吧裡的音樂聲逐漸被街上的車聲蓋過去，他卻還記得每一段轉拍的地方，說起來時眼睛亮亮的。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '剛剛那首妳有跟到嗎？我唱到後面有看到妳在拍手，還以為妳已經把節奏記起來了。' },
      { kind: 'dialogue', speaker: '你', text: '有啊！只是我怕我拍錯，害你們在台上分心。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '不會啦，台下有人一起拍手，反而會覺得更有力氣。' },
      { kind: 'narration', text: '走到公車站前，他從口袋裡拿出一張折好的歌序紙，背面被鉛筆寫了幾個修改過的地方。他把紙遞給你，說今天有幾首還想再練得更好，下次如果有機會，希望你也能再來聽。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '這張妳先拿著。今天唱的順序我有記下來，等我們下次再改好一點，再請妳來聽。' },
      { kind: 'narration', text: '公車進站前，你們又聊了幾句。阿信一直等到你找到座位，才隔著車窗朝你揮手。' },
    ],
    diarySummary: '散場後和阿信一起走到公車站。他問我最喜歡哪一首，還把今天的歌序紙送給我，說等他們練得更好，下次再請我來聽。和他聊天總是不知不覺就走慢了。',
  },
  masa: {
    label: '跟瑪莎一起走',
    title: '和瑪莎走到公車站',
    blocks: [
      { kind: 'narration', text: '瑪莎一走出酒吧就開始講剛才台上的小插曲，說佑達最後那一下差點把他嚇到。你才笑出聲，他就立刻轉過來，像是抓到證據一樣指著你。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '欸，妳剛剛是不是笑我？我明明彈得很好，妳不要只記得我看妳那一下。' },
      { kind: 'dialogue', speaker: '你', text: '我哪有！我是在笑佑達啦。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '最好是。妳每次都很會把責任推給別人。' },
      { kind: 'narration', text: '他一路嘴上不饒人，卻在經過便利商店時停下來，問你要不要買點熱的喝。你說不用，他還是替你買了一罐，最後只補一句是怕你等公車時一直喊冷。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '拿著啦，等一下又說手很冰。不要跟我客氣，這罐不是免費的，明天記得請回來。' },
      { kind: 'narration', text: '公車站就在前面。他把空罐丟進垃圾桶，站在站牌旁陪你等車，直到車燈從街口出現，才又提醒你不要坐過站。' },
    ],
    diarySummary: '和瑪莎一路鬥嘴走到公車站。他說我只記得他在台上看我的那一下，還在便利商店替我買了熱飲，嘴上卻堅持要我明天請回來。',
  },
  stone: {
    label: '跟石錦航一起走',
    title: '和石錦航走到公車站',
    blocks: [
      { kind: 'narration', text: '石頭走在你身旁，手上還拿著剛才替大家收好的小袋子。他先問你今天坐的位置會不會太靠近音箱，又問最後一首是不是聽得很清楚。你說很好，他才像是終於放心似的笑了笑。' },
      { kind: 'dialogue', speaker: '石錦航', text: '剛剛燈有點暗，我本來怕妳看不清楚。還好妳坐的位置不錯，沒有被前面的人擋住。' },
      { kind: 'dialogue', speaker: '你', text: '看得很清楚啊，而且你們每個人都很帥！' },
      { kind: 'dialogue', speaker: '石錦航', text: '哈哈，妳這樣講，他們等一下又要得意了。' },
      { kind: 'narration', text: '他陪你走到站牌前，先看了看時刻表，發現下一班車還要等一會兒，就帶你站到騎樓裡比較不會吹風的地方。等車的空檔，他還拿出相機，說今天有拍幾張舞台照，洗出來再給你看。' },
      { kind: 'dialogue', speaker: '石錦航', text: '等照片洗好，我挑幾張拍得清楚的給妳。今天的燈光滿漂亮的，應該會很好看。' },
      { kind: 'narration', text: '車來時，他幫你看著車門前的人潮，等你上車坐好，才揮手道別。' },
    ],
    diarySummary: '石頭陪我走到公車站，路上一直確認我有沒有看清楚表演、會不會被音箱震到。他還說今天拍了幾張舞台照，洗出來會挑給我。',
  },
  yanming: {
    label: '跟劉諺明一起走',
    title: '和劉諺明走到公車站',
    blocks: [
      { kind: 'narration', text: '諺明哥走在你旁邊，步伐不快，像是刻意配合你走路的速度。酒吧裡的聲音慢慢遠了，街上的車聲和夜風重新變得清楚。他沒有急著問你今天玩得開不開心，而是先把外套遞給你，提醒你夜裡降溫了。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '今天待到這麼晚，還好嗎？如果累了就慢慢走，不用趕。' },
      { kind: 'dialogue', speaker: '你', text: '不累啦！今天真的很好玩，而且你下午打鼓超厲害的。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '妳還記得那段喔。很久沒碰了，今天只是剛好大家都在，才被他們拱上去。' },
      { kind: 'narration', text: '他聽你把下午的事情又說了一遍，沒有打斷，只在你講到最後那個轉拍時笑了一下。走到公車站，他替你看了車號，確認車還沒到，才站到你旁邊一起等。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '下次如果還想聽，我可以再打給妳聽。不過今天先回去休息，明天不要睡過頭。' },
      { kind: 'narration', text: '公車停下來時，他替你讓開上車的人潮，站在站牌旁目送你離開。那種不急不徐的照顧，讓這個晚上像是多了一個很安穩的句點。' },
    ],
    diarySummary: '諺明哥特地到酒吧接我，陪我走到公車站。路上又聊起下午那段鼓聲，他說下次如果我想聽，還可以再打給我聽。',
  },
}
