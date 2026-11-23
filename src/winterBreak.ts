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
  rounds: WinterRound[]
  endingBlocks: WinterStoryBlock[]
  diarySummary: string
}
export type WinterDiaryData = { title: string; sections: { label: string; text: string }[] }

export const winterExamIntroBlocks: WinterStoryBlock[] = [
  { kind: 'narration', text: '一月七日，期末考週。新年的熱鬧才剛過去沒幾天，校園又被一疊疊講義、參考書和咖啡杯占滿。走廊上有人抱著課本邊走邊背，教室門口貼著考試時間表，連平常最愛聊天的同學，這幾天見面第一句也變成了「妳讀到哪裡了？」' },
  { kind: 'narration', text: '桌上的《機率論與數理統計》翻得滿是折角。條件機率、貝氏定理、二項分配、卜瓦松分配和常態分配擠在同一份講義裡，公式你都看得懂，真正做題時卻常常卡在第一步：這題究竟該用哪一種分配？題目給的條件又該怎麼放進去？' },
  { kind: 'narration', text: '你在題目旁邊寫了好幾個問號，尤其是條件機率和各種分配的選擇，明明每個字都認識，組合起來卻總覺得哪裡不對。窗外天色慢慢暗下來，你翻到通訊錄，手指停在溫尚翊的名字上——他之前提過自己大學聯考數學拿滿分，這次或許真的能救你一把。' },
]

export const winterExamChatChoices = [
  {
    text: '兩點！我把貝氏定理那幾題圈起來了，你不准笑我喔。',
    response: '好啦，不笑妳。兩點圖書館，帶來我看。',
  },
  {
    text: '你要不要先做好心理準備，我的問題可能很多哈哈哈。',
    response: '妳問題多又不是今天才知道。兩點啦，我幫妳挑重點。',
  },
  {
    text: '我明天下午都可以！地點你決定，我跟著數學滿分的人走。',
    response: '少來喔，現在才想起來捧我。兩點圖書館，記得帶筆。',
  },
]

export const winterExamTutoringIntroBlocks: WinterStoryBlock[] = [
  { kind: 'narration', text: '隔天下午，你抱著課本和一疊講義走進圖書館。窗邊的陽光落在桌面上，溫尚翊已經坐在那裡，面前攤著自己的筆記，旁邊還放了兩杯飲料。你才剛走近，他就抬起頭，朝你勾了勾手指。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '妳終於來啦，我還以為妳會抱著整個書架過來欸。' },
  { kind: 'dialogue', speaker: '你', text: '哪有那麼誇張！我只是怕你覺得我準備不夠充分。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '妳那一疊還不夠喔？來，坐這邊。這杯給妳，剛剛順手買的。' },
  { kind: 'narration', text: '他把靠窗的位置讓給你，自己坐到旁邊。你拿起飲料喝了一口，才發現他連吸管都替你拆好了。' },
  { kind: 'dialogue', speaker: '你', text: '你真的有把握教我喔？我問題很多欸。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '拜託，我大學聯考數學滿分欸。這種程度還難不倒我啦。' },
  { kind: 'dialogue', speaker: '你', text: '又來了！你到底要講幾次啦。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '有實力當然要講啊，不然妳怎麼知道今天請到的是誰？' },
  { kind: 'narration', text: '他說完自己先笑了，伸手把你的講義拉到兩個人中間。你本來還想回嘴，卻發現他已經很自然地把椅子挪近了一點。' },
]

export const winterExamTutoringRounds: WinterRound[] = [
  {
    scene: '你把講義攤開，裡面被螢光筆畫得五顏六色，旁邊還有好幾個大大的問號。溫尚翊低頭看了幾秒，嘴角慢慢翹起來。',
    promptSpeaker: '溫尚翊',
    prompt: '等一下，妳這是做筆記喔？我怎麼覺得比較像在跟題目打架？',
    choices: [
      { text: '不准笑！我已經很努力了欸。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '好啦好啦，我沒有笑。' }, { kind: 'narration', text: '他嘴上說沒有，肩膀卻很明顯地抖了一下。你伸手要把講義抽回來，他趕緊用手壓住另一邊。' }, { kind: 'dialogue', speaker: '溫尚翊', text: '欸，不要收走啦。我是覺得妳畫得很有個人風格。來，我幫妳把這幾個圈圈整理一下。' }], affection: { wen: 3 } },
      { text: '那你當年聯考的時候都不用畫重點喔？', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '我喔？看一遍大概就知道怎麼寫了啊。' }, { kind: 'dialogue', speaker: '你', text: '……你真的很欠揍欸。' }, { kind: 'dialogue', speaker: '溫尚翊', text: '哈哈哈哈，開玩笑啦。好啦，今天就讓滿分的人帶妳飛一下。' }], affection: { wen: 3 } },
      { text: '你坐近一點啦，我想看你怎麼整理。', response: [{ kind: 'narration', text: '他愣了一下，隨即把椅子往你這邊挪。椅腳在地板上輕輕磨過，兩個人的手肘幾乎碰在一起。' }, { kind: 'dialogue', speaker: '溫尚翊', text: '這樣可以了吧？妳還真會使喚人欸。' }, { kind: 'dialogue', speaker: '你', text: '不是你說要教我的嗎？' }, { kind: 'dialogue', speaker: '溫尚翊', text: '好啦，算妳有道理。' }], affection: { wen: 3 } },
    ],
  },
  {
    scene: '他拿起筆，在其中一題旁邊寫了幾個字，沒有急著把整題講完，只先提醒你最容易看反的地方。你盯著他的字看了一會兒，忽然注意到他寫字的時候也會習慣把眉頭皺起來。',
    promptSpeaker: '溫尚翊',
    prompt: '這樣有比較懂一點嗎？還是我這個滿分家教要從頭開始？',
    choices: [
      { text: '你先不要得意，我只是還沒完全進入狀況。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '好，慢慢來。反正我下午留給妳了。' }, { kind: 'dialogue', speaker: '你', text: '你今天很閒喔？' }, { kind: 'dialogue', speaker: '溫尚翊', text: '本來沒有啊。還不是有人昨天一直喊救命。' }, { kind: 'narration', text: '他說得像是在抱怨，卻把筆又放回你手邊，等你繼續寫。' }], affection: { wen: 3 } },
      { text: '你講慢一點啦，我又不是你，聯考數學滿分欸。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '欸，這個滿分妳今天到底要講幾次？' }, { kind: 'dialogue', speaker: '你', text: '誰叫你一直拿來炫耀！' }, { kind: 'dialogue', speaker: '溫尚翊', text: '好啦，我講慢一點。妳看這裡，先照自己的速度來，不用急。' }, { kind: 'narration', text: '這次他真的放慢了語速，還把筆尖停在你看得懂的那一行，等你點頭才往下說。' }], affection: { wen: 3 } },
      { text: '其實你認真教人的樣子還滿帥的嘛。', response: [{ kind: 'narration', text: '溫尚翊的筆尖停在紙上。他抬頭看你，像是沒料到你會突然講這句。' }, { kind: 'dialogue', speaker: '溫尚翊', text: '蛤？妳現在是在稱讚我，還是想讓我分心？' }, { kind: 'dialogue', speaker: '你', text: '都有啊，不行喔？' }, { kind: 'dialogue', speaker: '溫尚翊', text: '……少來。快看題目啦。' }, { kind: 'narration', text: '他低下頭繼續寫，耳朵卻悄悄紅了一點。' }], affection: { wen: 4 } },
    ],
  },
  {
    scene: '你照著他的提示重新寫了一遍，這次總算沒有把方向弄反。溫尚翊看了一眼，拿筆在旁邊打了個勾，還故意把那個勾畫得特別大。',
    promptSpeaker: '溫尚翊',
    prompt: '欸，不錯喔。這題自己弄懂了。要不要老師給妳一點獎勵？',
    choices: [
      { text: '獎勵？可以不要再出題給我嗎？', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '妳想得美，還有好幾頁欸。' }, { kind: 'dialogue', speaker: '你', text: '你這個老師怎麼這麼壞！' }, { kind: 'dialogue', speaker: '溫尚翊', text: '哈哈，好啦，先休息十分鐘。飲料喝完再繼續。' }], affection: { wen: 2 } },
      { text: '那我要你承認我其實很聰明。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '嗯……有一點啦。' }, { kind: 'dialogue', speaker: '你', text: '只有一點？' }, { kind: 'dialogue', speaker: '溫尚翊', text: '好啦，滿聰明的。至少沒有辜負我這個聯考數學滿分的老師。' }, { kind: 'dialogue', speaker: '你', text: '你又來了！' }, { kind: 'narration', text: '他笑著把飲料推到你面前，像是終於等到機會又炫耀了一次。' }], affection: { wen: 3 } },
      { text: '那你請我吃點心啊，補習很耗體力欸。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '妳來補習還附帶點心喔？' }, { kind: 'dialogue', speaker: '你', text: '不然呢，學生很辛苦欸。' }, { kind: 'dialogue', speaker: '溫尚翊', text: '好啦，等一下我去買。妳先把這題收好，不要趁我不在偷懶。' }, { kind: 'narration', text: '他把你的講義往旁邊挪出一小塊位置，還順手把散開的紙角壓平。' }], affection: { wen: 3 } },
    ],
  },
  {
    scene: '休息時，溫尚翊真的起身去買了點吃的。回來時，他把紙袋放在你手邊，自己卻沒有立刻坐回原位，而是站在你旁邊看你拆開包裝。',
    promptSpeaker: '溫尚翊',
    prompt: '怎樣？這個可以吧？我剛剛看妳一直盯著櫃檯那邊。',
    choices: [
      { text: '你怎麼知道我想吃這個？', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '妳剛剛看了好幾次欸，我又不是瞎子。' }, { kind: 'dialogue', speaker: '你', text: '所以你有在注意我喔？' }, { kind: 'dialogue', speaker: '溫尚翊', text: '我是在注意妳有沒有認真看書啦。' }, { kind: 'narration', text: '他回答得很快，快到反而有點可疑。' }], affection: { wen: 4 } },
      { text: '謝啦！你今天根本是全世界最好的家教。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '剛剛不是還嫌我很壞？' }, { kind: 'dialogue', speaker: '你', text: '有點心就不一樣了。' }, { kind: 'dialogue', speaker: '溫尚翊', text: '妳也太好收買了吧。' }, { kind: 'narration', text: '他拉開椅子坐回你旁邊，嘴上嫌棄，表情卻藏不住笑。' }], affection: { wen: 3 } },
      { text: '你不要一直站在旁邊啦，坐下來一起吃。', response: [{ kind: 'narration', text: '他看了看你旁邊的空位，這才坐下來。你把紙袋往中間推了一點，他伸手拿的時候，指尖不小心碰到你的手。兩個人都停了半秒，最後是他先若無其事地把包裝拆開。' }, { kind: 'dialogue', speaker: '溫尚翊', text: '好啦，一起吃。不然妳一個人吃完又要說我都沒陪妳。' }, { kind: 'dialogue', speaker: '你', text: '我哪有！' }, { kind: 'dialogue', speaker: '溫尚翊', text: '現在就有了啊。' }], affection: { wen: 4 } },
    ],
  },
  {
    scene: '點心吃得差不多，你們又把剩下的幾頁翻完。其實真正需要他幫忙的地方已經不多了，你卻開始有點在意時間，總覺得圖書館今天閉館得特別快。溫尚翊把筆蓋蓋上，抬眼看你。',
    promptSpeaker: '溫尚翊',
    prompt: '差不多了吧？還有哪裡不懂？今天這個滿分家教服務得還可以嗎？',
    choices: [
      { text: '還可以啦，勉強給你九十分。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '蛤？我聯考數學都拿滿分了，妳只給我九十分？' }, { kind: 'dialogue', speaker: '你', text: '那剩下十分要看你下次表現啊。' }, { kind: 'dialogue', speaker: '溫尚翊', text: '喔，原來還有下次喔？' }, { kind: 'narration', text: '他看著你笑了一下，沒有再追問，卻把這句話記得很清楚似的。' }], affection: { wen: 4 } },
      { text: '今天有比較懂了，謝謝你特地陪我。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '不客氣啦。妳有聽懂就好，不然我講一下午也白費。' }, { kind: 'dialogue', speaker: '你', text: '所以你今天真的特地空出時間喔？' }, { kind: 'dialogue', speaker: '溫尚翊', text: '不然咧？妳都開口了，我總不能叫妳自己跟課本奮鬥吧。' }, { kind: 'narration', text: '他說得很平常，收講義時卻把你寫得最亂的那幾頁另外夾好，像是怕你回去找不到。' }], affection: { wen: 3 } },
      { text: '如果我下次還有問題，可以再找你嗎？', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '可以啊，這有什麼好問的。' }, { kind: 'dialogue', speaker: '你', text: '你不會嫌我煩喔？' }, { kind: 'dialogue', speaker: '溫尚翊', text: '妳問題是滿多的啦……' }, { kind: 'narration', text: '他故意停了一下，見你真的要瞪他，才笑著補了一句。' }, { kind: 'dialogue', speaker: '溫尚翊', text: '不過又不是只有補習才能找我。' }], affection: { wen: 5 } },
    ],
  },
]

export const winterExamTutoringEnding: WinterStoryBlock[] = [
  { kind: 'narration', text: '圖書館廣播響起閉館提醒，你才發現窗外已經暗了。桌上的講義被溫尚翊整理成整整齊齊的一疊，幾個容易看錯的地方還被他貼了小紙條。他把筆記本推到你面前，最上面那頁寫著幾個簡單的提醒，旁邊還畫了一個歪歪的滿分符號。' },
  { kind: 'dialogue', speaker: '你', text: '你還真的幫我整理喔？' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '不然咧？我坐在這裡一下午，總不能只負責吃點心吧。' },
  { kind: 'dialogue', speaker: '你', text: '你今天是不是很享受當老師？' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '還好啦。主要是有人一直誇我聯考數學滿分，聽起來滿爽的。' },
  { kind: 'dialogue', speaker: '你', text: '我哪有一直誇！明明都是你自己一直講。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '哈哈哈哈，好啦，我承認我有一點得意。畢竟不是每個人都考得到滿分。' },
  { kind: 'narration', text: '他把你的課本和講義一起收進袋子，自己拿起剩下的筆記。你伸手想接，他卻先一步把袋子提了起來。' },
  { kind: 'dialogue', speaker: '你', text: '我自己拿就好了啦。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '沒差，又沒有很重。走啦，送妳到外面。' },
  { kind: 'narration', text: '走出圖書館時，夜風從台階旁吹過來。你低頭確認袋子裡的筆記，他放慢腳步配合你，走到階梯轉角時還伸手替你擋了一下迎面跑過的腳踏車。' },
  { kind: 'dialogue', speaker: '你', text: '今天謝謝你啦，滿分家教。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '知道就好。下次有不懂的再問我。' },
  { kind: 'dialogue', speaker: '你', text: '只有不懂的才能問喔？' },
  { kind: 'narration', text: '他腳步頓了一下，轉過頭看你。路燈的光落在他臉上，他像是想回什麼，最後卻只是笑了笑。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '……妳喔。想找我就找我啦，哪有那麼多規定。' },
  { kind: 'narration', text: '他把手插回外套口袋，走在你旁邊，偶爾側過頭確認你有沒有跟上。原本只是為了統計學約出來的一個下午，最後卻變成你有點捨不得結束的時間。' },
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
  { kind: 'narration', text: '晚上八點多，你跟著他們走進巷子裡的小酒吧。裡面不算大，幾張桌子坐著聊天的客人，吧台有人低頭喝酒，沒有人特別注意剛走進來的這幾個年輕人。舞台上的燈有點暗，音箱還傳出試音時的雜音，倒是佑達一看到鼓組就開始手癢。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '欸，今天一定要把最後那首打漂亮！我剛剛想到一個新的鼓花。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '你先把原本的打穩再說啦，不要每次想到什麼就加。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '你等一下就知道了！' },
  { kind: 'narration', text: '阿信站在麥克風前試了兩句，石頭低頭調弦，溫尚翊蹲在音箱旁轉效果器。沒有人認出他們，也沒有人特地等著他們上台，可幾個人完全不在意。瑪莎隨手撥了兩下 Bass，溫尚翊立刻接上一段旋律，石頭聽見後笑著跟進去，佑達在鼓組後面敲了兩下，五個人就這樣自己玩了起來。' },
  { kind: 'narration', text: '燈光暗下來，佑達敲出四拍，第一首歌便俐落地衝了出去。剛開始台下還有人繼續聊天，阿信也不受影響，唱得比排練時還放得開；溫尚翊和石頭一來一往地接吉他，瑪莎故意把某個低音彈得俏皮，惹得佑達差點在鼓後面笑場。' },
  { kind: 'narration', text: '到了第二首，靠近舞台的客人漸漸停下交談，有人跟著節奏敲桌，有人拍了幾下手。佑達一看見，打得更起勁，還在段落結束時朝瑪莎揚了揚下巴，像是在說「有沒有看到」。瑪莎回他一個白眼，下一秒卻把 Bass 線推得更滿。你坐在台下看著他們，忽然覺得最開心的不是有多少人鼓掌，而是他們五個人光是一起玩音樂，就已經高興得不得了。' },
]

export const winterGigFocusBlocks: Record<WinterCharacterId, WinterStoryBlock[]> = {
  wen: [
    { kind: 'narration', text: '溫尚翊一站到舞台中央，暖黃的燈就落在他側臉和肩上。襯衫袖口隨手捲到手肘，吉他背帶斜斜穿過胸前。他低頭試了最後一個音，下一秒鼓點落下，手指沿著琴頸俐落地滑過去，右手撥弦乾淨又狠，整個人跟著節奏微微往前傾。平常那副愛臭屁的樣子不見了，取而代之的是一種很篤定、很有把握的帥氣。' },
    { kind: 'narration', text: '間奏一到，他踩著節拍往前走了兩步，肩膀一沉，手腕連著帶出一串漂亮的音。背後的燈光勾出他的輪廓，額前的頭髮被汗弄得有點亂，他卻連看都沒看一眼，只專心把那段旋律推到最亮的地方。最後一個音收住，他抬起眼，視線越過台下的人，準確地落在你身上。' },
    { kind: 'narration', text: '你明明只是坐在台下，卻像被他那一眼定住了。他看見你一直望著他，嘴角很輕地揚了一下，沒有躲開，反而慢慢把吉他往身前帶，接著轉身踩進下一段。那個像是知道自己很帥、又偏偏只讓你看見的小表情，真的很犯規。' },
    { kind: 'dialogue', speaker: '溫尚翊', text: '前面那幾桌，聽得到嗎？最後這段跟上啦！' },
    { kind: 'narration', text: '他說完便笑著低頭，手上的節奏卻一點也沒亂。你忍不住跟著拍手，他像是聽見了，下一次抬眼時又往你這邊看了一下。' },
  ],
  ashin: [
    { kind: 'narration', text: '阿信握住麥克風時，原本在台下和大家說笑的神情慢慢收了起來。暖色燈光從側面打過來，照亮他的眉眼和微微垂下的睫毛。他沒有急著唱，先低頭聽了一下前奏，等鼓點落穩，才把第一句送進麥克風。那把帶點沙啞的聲音一出來，原本還在聊天的客人不知不覺安靜了。' },
    { kind: 'narration', text: '副歌前，他一手扶住麥克風架，另一手輕輕打著拍子；等旋律往上推，他忽然把麥克風拿下來，往舞台前沿走了兩步。高音沒有硬往上衝，而是穩穩地拉開，尾音落下時，他微微仰著頭，額前的髮絲被燈光照得發亮。那一刻，他看起來不像平常那個會笑著接話的人，而是整個人都被音樂點亮了。' },
    { kind: 'narration', text: '你跟著唱了幾句，他像是在人群裡聽見熟悉的聲音，目光很快就找到你。唱到下一句時，他的嘴角忍不住揚起來，眼睛彎了一下，卻沒有因此漏掉半個拍子。那個笑只停留了一瞬，下一秒他又把整首歌唱得很投入，像是把剛才那點只給你的反應藏進了旋律裡。' },
    { kind: 'dialogue', speaker: '陳信宏', text: '會唱的話，一起唱喔。' },
    { kind: 'narration', text: '他把麥克風朝台下遞了一點，前排真的有人跟著唱起來。阿信聽見後笑得更開，掌心朝外輕輕一攤，像把整首歌都交給大家。你看著他站在燈下的樣子，忽然明白為什麼他一開口，連原本不認識他們的人都願意停下來聽。' },
  ],
  masa: [
    { kind: 'narration', text: '瑪莎把 Bass 往肩上一掛，低頭調好旋鈕，平常那副隨時準備吐槽別人的表情一下子收乾淨了。燈光落在琴身上，他的手指搭上琴弦，第一個低音彈出來時，整間小店像跟著震了一下。他站得不算張揚，肩膀卻隨著節拍穩穩晃動，左手沿著琴頸移動，右手每一下都落得俐落又準。' },
    { kind: 'narration', text: '到了間奏，他和怪獸隔著舞台交換了一個眼神。下一拍，瑪莎故意把低音往前推，溫尚翊的吉他立刻接上來，兩道聲音咬得剛剛好。他像是早就算準那個空檔，身體往前傾了一點，手指連續滑過幾個品格，最後收在一個乾淨漂亮的重拍上。那種不急著搶鏡、卻能把整首歌牢牢托住的樣子，反而特別有魅力。' },
    { kind: 'narration', text: '你看得入神，瑪莎抬起頭時剛好撞上你的視線。他眉毛一挑，像在問你有沒有聽懂，嘴角還帶著一點得意。你朝他比了個大拇指，他才滿意地笑了一下，低頭把最後幾個音收得乾乾淨淨。' },
    { kind: 'dialogue', speaker: '蔡昇晏', text: '前面那位，有沒有聽到？這段低音不是裝飾欸。' },
    { kind: 'narration', text: '台下有人笑出聲，他也跟著笑，卻在下一首開始前又往你這邊看了一眼，像是還在等你給他打分數。' },
  ],
  stone: [
    { kind: 'narration', text: '石頭站在舞台另一側，沒有刻意走到最亮的地方。他低頭調好音，手指搭上琴弦時，整個人便安靜下來。第一個和弦落下，燈光沿著他的肩線和手臂滑過去，左手在琴頸上移動得又快又準，右手撥弦乾淨得幾乎沒有多餘的聲音。平常話不多的他，一拿起吉他，反而有種讓人移不開眼的專注。' },
    { kind: 'narration', text: '溫尚翊的旋律往上拉時，石頭沒有急著跟著搶。他留出半拍，像是先聽清楚對方要去哪裡，再用另一條線穩穩接住。兩把吉他交錯的那一瞬間，他抬起頭，眼神裡忽然多了一點鋒利；手腕順勢一轉，音符從指尖俐落地滑出去，整段旋律被他收得漂亮又完整。' },
    { kind: 'narration', text: '最後一個和弦落下，他才像從音樂裡回過神來。抬眼看見你一直望著他，他先是愣了一下，接著露出一個很淡的笑。那不是刻意做給台下看的表情，只像是你們兩個剛好在一片吵鬧裡對上了眼，安安靜靜地分享了一個只有彼此知道的瞬間。' },
    { kind: 'dialogue', speaker: '石錦航', text: '謝謝大家，這首歌送給今晚還不想回家的人。' },
    { kind: 'narration', text: '他說完把吉他背好，視線又短短地停在你這裡，才轉身接上下一首。' },
  ],
  yanming: [
    { kind: 'narration', text: '諺明哥沒有跟著大家去酒吧，但下午在練團室的那一幕，卻在你看著舞台時忽然清楚地浮上來。大家起鬨時，他還笑著擺手說很久沒碰鼓了；真的坐上鼓椅後，他把袖子捲到手肘，背脊挺直，先在指間轉了半圈鼓棒，才落下第一記。' },
    { kind: 'narration', text: '低音鼓穩穩踩進去，軍鼓緊接著敲出清脆的聲響，鼓棒在他手裡翻飛，從軍鼓一路滾過嗵鼓，再乾淨俐落地收在鈸聲上。原本還在鬧的瑪莎和佑達一下子都安靜了，連你也忘了跟著笑，只看著他手腕起落、肩背隨節奏微微發力。那幾個小節不像臨時被拱上去，更像他一直都沒有離開過鼓組。' },
    { kind: 'narration', text: '最後一下停住，他才抬起頭，額角帶著薄汗，卻只是笑著說「手還記得啦」。佑達在旁邊看得眼睛發亮，瑪莎吹了聲口哨。此刻酒吧裡的鼓手是佑達，可你耳朵裡還留著下午那段節奏，怎麼也揮不掉。' },
  ],
}

export const winterBreakGigEndingBlocks: WinterStoryBlock[] = [
  { kind: 'narration', text: '最後一首歌一進副歌，前排立刻跟著唱，佑達把鼓點推得更滿，阿信笑著把麥克風遞向台下。最後一個音落下，掌聲和口哨聲幾乎把小酒吧淹沒。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '欸！剛剛最後那個鼓花有沒有帥？我自己都快被自己帥到了！' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '你先下來啦，等一下真的被自己帥到跌倒，還要我們把你抬出去。' },
  { kind: 'narration', text: '下台後幾個人手腳俐落地收器材。阿信把歌單摺好塞進琴袋，石頭蹲下來把纏在一起的導線理順；溫尚翊和瑪莎還在為剛才一個小節互相吐槽，佑達則被老闆留下來確認費用和器材清單。' },
  { kind: 'narration', text: '你推開門，夜風一下子帶走了酒吧裡的熱氣。街角的機車聲和遠處公車站的燈光漸漸清楚起來，耳邊卻還留著剛才最後一首歌的尾音。你站在門邊等著大家收拾好，心裡還捨不得今晚這麼快結束。' },
]

export const winterYanmingPickupBlocks: WinterStoryBlock[] = [
  { kind: 'narration', text: '你正準備跟大家往外走，手機忽然震了一下。螢幕上跳出諺明哥的名字。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '我到酒吧外面了。你們結束了嗎？外面有點冷，妳慢慢出來就好。' },
  { kind: 'narration', text: '你推開酒吧的門，果然看見諺明哥站在騎樓下。他沒有站在最顯眼的地方，只靠著柱子等，手裡拿著一件多帶來的外套。看見你出來，他先把外套遞過來，目光又在你身後的人群裡找了一下。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '辛苦了。看妳們收得差不多，我才傳訊息。今天很晚了，我陪妳走到公車站。' },
  { kind: 'dialogue', speaker: '你', text: '你怎麼真的跑來了？不是說你今天也有事情要忙嗎？' },
  { kind: 'dialogue', speaker: '劉諺明', text: '事情先處理完了。想說妳散場後要自己搭車，過來等一下比較放心。' },
  { kind: 'narration', text: '他說得很平常，像只是順路做了一件小事，卻連外套都替你多帶了一件。你把外套披上，他確認你有穿好，才轉身陪你往前走。' },
]

export const winterBusStopRoutes: Record<WinterCharacterId, WinterBusStopRoute> = {
  wen: {
    label: '跟溫尚翊一起走',
    title: '和溫尚翊走到公車站',
    blocks: [
      { kind: 'narration', text: '酒吧門口還有人在收最後幾條導線，佑達被老闆叫住確認器材，你和溫尚翊先沿著騎樓往公車站的方向走。夜裡的風帶著一點涼意，巷口招牌的燈一閃一閃，剛才舞台上的鼓聲好像還留在耳朵裡。' },
      { kind: 'narration', text: '溫尚翊把效果器袋換到另一隻手，走到靠近馬路的那側。明明剛下台還在跟瑪莎鬥嘴，現在只剩你們兩個，他反而安靜了幾秒，像是在等你先開口。' },
    ],
    rounds: [
      {
        scene: '你側過頭看他，忍不住又想起剛才那段吉他。溫尚翊察覺你的視線，抬手撥了一下額前被汗弄亂的頭髮，故意裝得很隨意。',
        promptSpeaker: '溫尚翊',
        prompt: '妳剛剛一直看我幹嘛？有哪裡彈錯喔？',
        choices: [
          { text: '因為你彈得真的超帥啊，這還要問？', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '……妳今天講話怎麼這麼直接啦。' }, { kind: 'narration', text: '他嘴上嫌你，嘴角卻怎麼也壓不下去，還故意把背帶往肩上拉正，像是突然又想起自己剛才在台上的樣子。' }], affection: { wen:  3 } },
          { text: '我在確認團長有沒有失誤，責任重大欸。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '拜託，妳也太嚴格了吧！我哪有失誤。' }, { kind: 'narration', text: '他伸手用手背輕輕碰了碰你的手臂，像要你把剛才那句收回去，自己卻先笑了。' }], affection: { wen:  2 } },
          { text: '我在看你是不是只看我這邊，結果真的有欸。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '蛤？妳哪有證據啦。' }, { kind: 'narration', text: '他立刻轉頭看向前方，耳朵卻慢慢紅起來。走了兩步，又忍不住補一句：「我只是剛好看那邊啦。」' }], affection: { wen:  3 } },
        ],
      },
      {
        scene: '你們正說著話，巷口忽然傳來一陣引擎聲。一台機車從路邊斜斜地竄出來，離你很近。你還沒反應過來，溫尚翊已經一把扣住你的手腕，把你往自己身側拉。你踩到凸起的磚角，整個人失去平衡，額頭和肩膀一下撞進他懷裡。\n\n他的手臂先護住你的背，另一隻手還牢牢握著你的手腕。機車擦身衝過去的瞬間，溫尚翊猛地抬起頭，朝著那台車的背影破口大罵：「幹！你衝三小啦？騎車不看路喔？靠北！」他的聲音又急又兇，連巷口的人都忍不住回頭看。車子轉過街角後，他還盯著那個方向，胸口起伏了一下，像是氣到想追上去理論。可下一秒，他就低下頭看你，手臂仍護在你背後，急著確認你有沒有撞傷。離得近到你能看見他額角的汗。等發現你真的沒事，他才像突然意識到兩個人靠得太近，動作僵了一下。',
        promptSpeaker: '溫尚翊',
        prompt: '欸，妳有沒有撞到？腳有沒有扭到？',
        choices: [
          { text: '我沒事啦……你先放開我，抓得好緊。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '喔、好啦。剛剛不是怕妳跌倒嗎。' }, { kind: 'narration', text: '他立刻鬆手，卻沒有真的走遠，還低頭看了看你的鞋跟，確認你站穩了才把手收回去。' }], affection: { wen:  2 } },
          { text: '你剛剛是不是抱得太緊了？', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '不然咧？妳整個人都要倒了欸！' }, { kind: 'narration', text: '他說得理直氣壯，手卻摸上後頸，耳朵紅得比剛才更明顯。你一笑，他就小聲嘟囔：「還笑，真的很會。」' }], affection: { wen:  3 } },
          { text: '你不是說沒一直看我？反應倒是很快嘛。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '這兩件事有什麼關係啦！' }, { kind: 'narration', text: '他瞪了你一眼，卻又伸手把你往騎樓裡側帶了一點：「走裡面啦，今天不要再嚇我一次。」' }], affection: { wen:  3 } },
        ],
      },
      {
        scene: '走過剛才那段路後，他沒有再跟你隔著半步，而是自然地走在你旁邊。公車站的燈箱已經看得見了，你們卻都走得比剛才慢。溫尚翊把效果器袋放到腳邊，抬頭看了一眼時刻表，說下一班還要等幾分鐘。你們便站在站牌旁，聽著遠處車聲，繼續聊剛才那首歌。',
        promptSpeaker: '溫尚翊',
        prompt: '下次我把那段重新彈給妳聽啦。妳還要坐第一排喔？',
        choices: [
          { text: '當然！而且你要記得一抬頭就看到我。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '要求很多欸……好啦，我會留意。' }, { kind: 'narration', text: '他說完低頭踢了踢站牌旁的小石子，過一會兒又問你下次哪天有空，像是怕你沒聽清楚似的。' }], affection: { wen:  3 } },
          { text: '那要看你表現，今天先給你九十分。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '九十分？我今天至少九十九吧！' }, { kind: 'narration', text: '他不服氣地跟你爭了起來，連下一班公車亮起車頭燈都沒注意，直到你提醒，他才趕緊把袋子拎起來。' }], affection: { wen:  2 } },
          { text: '如果你願意教我彈那段，我就再來。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '可以啊，這有什麼難的。妳不要學兩下就說手痠喔。' }, { kind: 'narration', text: '他笑著替你指了指琴弦的位置，說下次慢慢教。公車進站時，他還不忘提醒你上車小心，別又踩到奇怪的地方。' }], affection: { wen:  3 } },
        ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '公車慢慢靠站，車門打開時，溫尚翊先替你看了一眼車內還有沒有位置。他把效果器袋往身後挪，讓出上車的空間，等你站上階梯才又叫住你。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '到家傳訊息給我。還有，剛剛那個差點跌倒的事，不准回去跟瑪莎講。' },
      { kind: 'dialogue', speaker: '你', text: '為什麼？' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '沒有為什麼啦！快上車！' },
      { kind: 'narration', text: '車門關上後，他還站在站牌邊看著車子開出去。你隔著窗戶朝他揮手，他也抬手回了一下，直到轉過街角才看不見他的身影。' },
    ],
    diarySummary: '溫尚翊一路都在嘴硬，明明在台上看見我，走下台又不肯承認。巷口那台機車突然衝出來時，他反應快得不得了，一把把我拉進懷裡，等我站穩了卻先紅了耳朵。到了公車站還跟我爭今天到底該拿幾分，最後又叮嚀我到家要傳訊息。這個人真的很會裝沒事。',
  },
  ashin: {
    label: '跟陳信宏一起走',
    title: '和陳信宏走到公車站',
    blocks: [
      { kind: 'narration', text: '阿信把麥克風線交回店裡，走出門時還輕輕清了清喉嚨。唱了一整晚，他的聲音有點沙啞，說話卻還是很溫柔。你們沿著騎樓往公車站走，他把摺好的歌單收進外套口袋，走了幾步又回頭確認你有沒有跟上。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '剛剛有幾句妳是不是也跟著唱了？我在台上有看到喔。' },
    ],
    rounds: [
      {
        scene: '阿信聽見你提起副歌，笑著低頭看了一眼自己的鞋尖。走出酒吧後，沒有音箱和鼓聲，他的聲音聽起來比剛才更近一些。他把歌單從口袋裡拿出來，指尖停在其中一首歌的名字上，像是還想跟你聊剛才那一段。',
        promptSpeaker: '陳信宏',
        prompt: '我剛剛有看到妳跟著唱欸。妳是本來就喜歡那首，還是剛好記得我唱的那一句馁？',
        choices: [
          { text: '兩個都有啊，尤其你唱到副歌的時候，真的很吸引人。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '欸……妳這樣講，我會當真喔馁。' }, { kind: 'narration', text: '他笑著摸了摸鼻子，原本走在你旁邊的步子慢了半拍。等你轉頭看他，他又假裝在看路邊的招牌，耳朵卻有點紅。' }], affection: { ashin: 3 } },
          { text: '我怕你又忘詞，所以才一直盯著你。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '原來妳是來監督我的喔？那我下次要唱得更熟一點，不能再被妳抓到馁。' }, { kind: 'narration', text: '他故意把歌單舉起來擋了一下臉，笑完才又把它收好，像是被你逗得很開心。' }], affection: { ashin: 2 } },
          { text: '因為你看過來的時候，我才開始唱的。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '真的假的？那我剛才是不是應該再多看妳幾眼馁？' }, { kind: 'narration', text: '他說完自己先笑了，肩膀輕輕碰了你一下，卻沒有把視線立刻移開。' }], affection: { ashin: 3 } },
        ],
      },
      {
        scene: '你們走到一段比較窄的騎樓，身後突然傳來機車催油門的聲音。阿信回頭看見車子貼著路邊衝過來，立刻握住你的手腕，把你拉到自己身後。機車擦著騎樓邊緣過去，他另一隻手下意識擋在你肩前。\n\n他低頭看了看你，原本帶笑的神情一下子認真起來，手還停在你的腕上，像是要先確認你真的站穩了才放心。',
        promptSpeaker: '陳信宏',
        prompt: '有沒有撞到？我剛剛拉得太急，有沒有弄痛妳？',
        choices: [
          { text: '沒有，是你拉得剛剛好。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '那就好馁。我剛剛真的有嚇到，還好有看到那台車。' }, { kind: 'narration', text: '他沒有立刻放開你的手腕，而是等你往騎樓裡側站好，才慢慢鬆手，還很仔細地看了看你有沒有擦傷。' }], affection: { ashin: 3 } },
          { text: '你剛剛整個人都擋在我前面欸。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '車子那麼近，哪有時間想那麼多馁。妳沒事就好。' }, { kind: 'narration', text: '他說得很輕，卻又往外側站了一點，把靠近車道的位置留給自己。你注意到他剛才被風吹亂的頭髮還沒整理，呼吸也比平常急了一些。' }], affection: { ashin: 3 } },
          { text: '你手還沒放開喔。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '啊……對不起馁。剛剛一緊張就忘記了。' }, { kind: 'narration', text: '他鬆開手，卻沒有退遠，反而低頭問你要不要先站一下。那句道歉說得很小聲，像是連他自己都還沒完全從剛才的驚險裡回過神。' }], affection: { ashin: 3 } },
        ],
      },
      {
        scene: '公車站就在前面，站牌旁的燈把兩個人的影子拉得很長。阿信看了一眼時刻表，說還有幾分鐘，便沒有急著道別。他把剛才那張歌單重新拿出來，翻到空白的背面，像是忽然想到一件事。',
        promptSpeaker: '陳信宏',
        prompt: '下次我把剛剛那首歌再唱給妳聽，好不好？這次只唱給妳一個人聽馁。',
        choices: [
          { text: '好啊，那我就不跟別人分享這個版本了。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '那就先說好了，這個版本先留給妳馁。' }, { kind: 'narration', text: '他把歌單重新摺好，收進口袋時還特地拍了一下，像是怕自己忘記這個約定。' }], affection: { ashin: 3 } },
          { text: '你要唱到我真的記住為止。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '那我可能要唱很多次喔，妳不要嫌我煩馁。' }, { kind: 'narration', text: '他笑著哼了兩個音，沒有真的唱出歌詞，只把旋律輕輕留在夜風裡。' }], affection: { ashin: 3 } },
          { text: '那你要先告訴我，你唱的時候會不會再看我。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '會啊。如果妳在，我應該會忍不住找妳馁。' }, { kind: 'narration', text: '他回答得很自然，說完才像意識到自己講得太直接，低頭笑了好一會兒。' }], affection: { ashin: 3 } },
        ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '公車進站時，阿信先替你看了一眼車內，確認還有座位才讓你上車。他站在車門旁，手指輕輕敲了兩下剛才收起來的歌單，像是又想起什麼。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '到家跟我說一聲喔。今天真的很開心馁，妳回去如果還在哼那首歌，也可以傳訊息給我。' },
      { kind: 'narration', text: '車子開出去後，你回頭看見他還站在原地。剛才那句「只唱給妳一個人聽」，一路跟著車窗外的燈光，在你腦子裡繞了好幾圈。' },
    ],
    diarySummary: '阿信唱到副歌時看見我跟著唱，走出酒吧後還特地問我是不是喜歡那首歌。機車突然衝過來時，他第一時間把我拉到身後，手還停在我的手腕上，確認我真的沒事才放開。到了公車站，他說下次要把那首歌只唱給我一個人聽。明明聲音都唱啞了，講起話來還是那麼溫柔。',
  },
  masa: {
    label: '跟瑪莎一起走',
    title: '和瑪莎走到公車站',
    blocks: [
      { kind: 'narration', text: '瑪莎一走出酒吧就開始評論今晚的演出，先嫌佑達最後那個鼓花太多，再說怪獸有一段吉他差點把他帶偏。你替大家辯護，他立刻轉過頭來，手裡還比著剛才 Bass 的節奏，嘴上嫌你沒聽懂，腳步卻一直配合著你。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '妳剛剛到底有沒有認真聽？我那段低音才是整首歌的靈魂欸。' },
    ],
    rounds: [
      {
        scene: '你們沿著騎樓往前走，瑪莎嘴上還在嫌東嫌西，卻一直等你回嘴。他把琴袋往肩上甩了甩，忽然想起剛才副歌前的那一段，手指在空中比出進拍的位置。',
        promptSpeaker: '蔡昇晏',
        prompt: '剛剛副歌那段，我跟怪獸互相接的地方，妳有沒有聽出來？',
        choices: [
          { text: '有啊，你故意晚半拍再進來那一下超帥。', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '喔，原來妳有聽懂。怪獸那個眼神一過來，我就知道要接了。' }, { kind: 'narration', text: '他嘴上裝得很平常，嘴角卻明顯翹了起來，還故意把剛才那個節奏又比了一次給你看。' }], affection: { masa: 3 } },
          { text: '我只聽到你在台上一直跟佑達較勁。', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '那叫互相激勵好不好！他每次都想多塞一個鼓花，我不盯著怎麼行。' }, { kind: 'narration', text: '他說得理直氣壯，走了兩步又回頭看你有沒有跟上，像是怕你真的把他的部分全忘了。' }], affection: { masa: 2 } },
          { text: '我其實一直在看你的手，根本沒空數拍子。', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '……妳講這個是要我怎麼彈啦？' }, { kind: 'narration', text: '他難得卡了一下，立刻把視線轉去看路邊，過了幾秒才又補一句：「反正妳有看到就好。」' }], affection: { masa: 3 } },
        ],
      },
      {
        scene: '你們走到巷口，一台機車突然從停車格旁倒車衝出來。瑪莎先聽見引擎聲，反手抓住你的手腕往自己這邊一帶，讓你避開車頭。你被他拉得踉蹌半步，肩膀差點撞上他的胸口。他另一隻手扶住你的手臂，等機車騎遠才鬆開，眉頭皺得很緊。',
        promptSpeaker: '蔡昇晏',
        prompt: '妳有沒有怎樣？剛剛差一點就撞到了欸！',
        choices: [
          { text: '你剛剛拉我那一下，我差點以為自己要被你扛走。', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '不然咧？妳要我站著看妳被撞喔？' }, { kind: 'narration', text: '他嘴上兇巴巴，手卻還扶著你的手臂，直到你站穩才放開，接著又低聲補了一句：「下次走路靠裡面一點啦。」' }], affection: { masa: 3 } },
          { text: '你手還抓著欸，是不是不想放？', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '蛤？我是在確認妳有沒有站穩，妳少亂講。' }, { kind: 'narration', text: '他這才像被提醒似的鬆開手，卻沒有往前走，反而站在你旁邊等你先笑夠。' }], affection: { masa: 3 } },
          { text: '我沒事啦，倒是你臉色怎麼比我還難看？', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '廢話，差點撞到人欸！妳以為我會很開心喔？' }, { kind: 'narration', text: '他瞪了你一眼，接著把你往騎樓裡側帶，自己走到靠近車道的那一邊。' }], affection: { masa: 2 } },
        ],
      },
      {
        scene: '公車站就在前面。瑪莎把琴袋靠在柱子邊，手指在欄杆上敲了兩遍剛才的節拍，故意停在最後一拍等你接。這次你沒有慢半拍，他立刻露出「我就知道」的表情，還把手掌伸過來要跟你擊掌。',
        promptSpeaker: '蔡昇晏',
        prompt: '下次來練團室，我教妳剛才那段。先說好，我可是很嚴格的。',
        choices: [
          { text: '那你要負責教會我，不能教到一半嫌我笨。', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '我哪有那麼沒耐心？只要妳肯學，我就肯教。' }, { kind: 'narration', text: '他把手收回去，卻已經開始跟你討論下次要從哪一段練起，像是這件事早就說定了。' }], affection: { masa: 3 } },
          { text: '你這是在偷偷約我吧？', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '……妳要這樣想，我也懶得糾正妳。' }, { kind: 'narration', text: '他挑了挑眉，故意把琴袋背好往前走，卻又放慢腳步等你跟上。' }], affection: { masa: 3 } },
          { text: '好啊，但輸的人要請吃宵夜。', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '妳又來了，什麼事都能扯到吃的。' }, { kind: 'narration', text: '他嘴上嫌棄，最後還是答應了，還補一句：「不過妳要先練到不會一直搶拍。」' }], affection: { masa: 2 } },
        ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '公車還有一會兒才到。瑪莎陪你站在站牌下，嘴裡繼續嫌佑達的鼓花太多，卻把靠近車道的位置留給自己。等車燈轉進街口，他才把琴袋往肩上提好，伸手替你把滑下來的背包肩帶拉回去。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '到了傳個訊息啦，不然我還要被說沒把人送好。' },
      { kind: 'dialogue', speaker: '你', text: '你明明就很關心我。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '少自作多情！快上車啦！' },
      { kind: 'narration', text: '他嘴上還在否認，等車子開出去時卻朝你揮了揮手。你才剛轉過頭，他又隔著車窗比了個電話的手勢，像是在提醒你不要忘記傳訊息。' },
    ],
    diarySummary: '瑪莎一路都在嫌東嫌西，還硬要我承認他那段 Bass 很帥。巷口機車突然衝出來時，他一把抓住我的手腕把我拉開，嘴上兇得要命，手卻一直等我站穩才放開。到了公車站，他又主動約我下次去練團，還把它說得像一場比賽。這個人真的很會把關心講得像在找架吵。',
  },
  stone: {
    label: '跟石錦航一起走',
    title: '和石錦航走到公車站',
    blocks: [
      { kind: 'narration', text: '石頭把最後一條導線交給店裡的人，走出門時先回頭確認沒有東西遺漏。你們沿著比較安靜的那側騎樓往公車站走，酒吧裡的音樂聲漸漸遠去，夜風把剛才舞台上的熱度慢慢吹散。' },
      { kind: 'dialogue', speaker: '石錦航', text: '剛剛那段兩把吉他交錯的地方，妳有聽清楚嗎？' },
    ],
    rounds: [
      {
        scene: '石頭沒有急著往前走，而是配合你的速度慢慢走在旁邊。他提起剛才那段交錯的旋律，說其中有一個音其實是臨時改的。你看見他講到音樂時眼神會變得很專注，連平常不太明顯的笑意都多了一點。',
        promptSpeaker: '石錦航',
        prompt: '妳剛才是不是一直看我這邊？我有幾次抬頭，都剛好看到妳。',
        choices: [
          { text: '因為你彈那段的時候，整個人都不太一樣。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '哪裡不一樣？' }, { kind: 'narration', text: '他問得很認真，像是真的想知道你看見了什麼。你還沒回答，他就先低頭笑了一下，耳根悄悄紅了。' }], affection: { stone: 3 } },
          { text: '我有聽到啊，你把最後那個音收得很漂亮。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '妳連那個地方都有注意到喔？' }, { kind: 'narration', text: '他把那段旋律又輕輕哼了一次，還特地放慢速度，像是只想讓你一個人聽清楚。' }], affection: { stone: 3 } },
          { text: '我在看你是不是也會看過來，結果真的有。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '……原來妳有發現。' }, { kind: 'narration', text: '他沒有急著解釋，只是笑著把視線移到前方，走了一小段又回頭確認你還在身邊。' }], affection: { stone: 3 } },
        ],
      },
      {
        scene: '你們走到騎樓轉角，一台機車突然從巷子裡衝出來。石頭聽見引擎聲，立刻伸手握住你的手腕，把你往牆邊安全的位置帶。你被他拉得往前一步，他另一隻手穩穩扶住你的肩，讓你沒有撞上柱子。\n\n機車騎遠後，他沒有馬上放開，先低頭確認你的手腕和肩膀有沒有撞到，神情裡滿是擔心。',
        promptSpeaker: '石錦航',
        prompt: '有沒有哪裡痛？我剛剛拉得比較急，怕妳撞到。',
        choices: [
          { text: '沒有，你剛剛把我護得很好。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '那就好。剛剛真的很近，我差點來不及。' }, { kind: 'narration', text: '他鬆了一口氣，手掌卻還停在你的肩側，直到你點頭說真的沒事，他才慢慢收回去。' }], affection: { stone: 3 } },
          { text: '你剛剛整個人都擋在我前面了。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '看到車子過來，第一個想到的就是先讓妳躲開。' }, { kind: 'narration', text: '他說完像是覺得太直接，低頭整理了一下自己的琴袋背帶，耳朵卻微微紅了。' }], affection: { stone: 3 } },
          { text: '我沒事啦，你不要一直皺著眉頭。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '好，我不皺了。只是剛剛真的有點擔心。' }, { kind: 'narration', text: '他終於笑了一下，接著自然地走到靠車道的外側，讓你留在騎樓裡面。' }], affection: { stone: 2 } },
        ],
      },
      {
        scene: '公車站旁邊有一排長椅，石頭問你要不要坐一下。車還沒來，他靠在站牌旁，輕輕哼起剛才那段旋律。這次沒有其他樂器的聲音，你聽得見他每一個音都收得很輕，像是怕打擾到夜裡的安靜。',
        promptSpeaker: '石錦航',
        prompt: '下次如果妳願意，我想把那段另一個版本彈給妳聽。可以嗎？',
        choices: [
          { text: '可以啊，但我要第一個聽到，不可以先給別人。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '好，那我先留給妳。' }, { kind: 'narration', text: '他答應得很認真，還把那段旋律又在心裡默念了一遍，像是已經開始想下次要怎麼彈給你聽。' }], affection: { stone: 3 } },
          { text: '我想坐在你旁邊聽，這樣可以嗎？', response: [{ kind: 'dialogue', speaker: '石錦航', text: '當然可以。我會把位置留給妳。' }, { kind: 'narration', text: '他說完看了你一眼，沒有再把視線移開，直到遠處公車的燈光慢慢出現。' }], affection: { stone: 3 } },
          { text: '你先答應我，彈完還要解釋給我聽。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '好，我慢慢講，妳不用怕聽不懂。' }, { kind: 'narration', text: '他笑著把琴袋放到腳邊，開始跟你說那段旋律原本想表達的情緒。' }], affection: { stone: 2 } },
        ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '公車進站前，石頭先站起來，把長椅旁邊你的包包遞給你，還提醒你小心車門的階梯。你上車後回頭，他仍站在路燈下，手裡拎著琴袋，安安靜靜地朝你揮手。' },
      { kind: 'dialogue', speaker: '石錦航', text: '到家跟我們說一聲。下次那段我會記得，妳不用再提醒我。' },
      { kind: 'narration', text: '車子慢慢開遠，你還記得他說「先留給妳」時那個認真的表情。明明沒有什麼誇張的話，卻讓你覺得自己好像被很仔細地放在心上。' },
    ],
    diarySummary: '石頭一路都很安靜，卻記得我在台下看他的時候。機車突然衝出來，他立刻把我帶到安全的地方，還一直確認我有沒有撞傷。到了公車站，他說想把剛才那段旋律的另一個版本先彈給我聽。跟他相處時，很多心意都藏在很小的動作裡。',
  },
  yanming: {
    label: '跟劉諺明一起走',
    title: '和劉諺明走到公車站',
    blocks: [
      { kind: 'narration', text: '諺明哥站在酒吧外的騎樓下等你，手裡拿著一件多帶來的外套。看見你出來，他先把外套遞過來，確認你穿好後才陪你往公車站走。街上比店裡安靜很多，遠處偶爾有車燈從路口掠過。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '今天辛苦了。剛才看妳們收得差不多，我才傳訊息給妳。' },
    ],
    rounds: [
      {
        scene: '你提起下午在練團室看他打鼓的事。諺明哥聽完笑了一下，像是還有點不好意思，卻沒有否認自己剛才確實玩得很開心。他把外套領口替你順好，才繼續往前走。',
        promptSpeaker: '劉諺明',
        prompt: '下午我打鼓的時候，妳是不是一直看著？我還以為妳覺得太吵了。',
        choices: [
          { text: '我是真的看得入迷，跟平常照顧大家的你完全不一樣。', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '原來妳是這樣想的。那我還滿高興的。' }, { kind: 'narration', text: '他低頭笑了笑，手指不自覺地在外套口袋邊敲了兩下，像是又想起下午那幾個小節。' }], affection: { yanming: 3 } },
          { text: '你一坐上鼓椅，整個人都變了，真的很帥。', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '哈哈，妳講得太直接了啦。只是以前練過，手還記得。' }, { kind: 'narration', text: '他難得有點不好意思，抬手摸了摸後頸，卻沒有把你的稱讚推回去。' }], affection: { yanming: 3 } },
          { text: '我還想說你要是再打下去，我可能會一直看下去。', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '那我下次就不客氣了，找時間再打給妳看。' }, { kind: 'narration', text: '他看了你一眼，笑意比剛才更明顯，像是把「下次」這件事認真記了下來。' }], affection: { yanming: 3 } },
        ],
      },
      {
        scene: '走到路口時，一台機車忽然從停車格旁竄出來，速度快得讓人來不及反應。諺明哥先聽見引擎聲，立刻握住你的手腕，把你帶到自己身側靠裡的位置，另一隻手護在你肩前。車子擦過路邊後很快騎遠，他沒有急著繼續走，而是低頭確認你有沒有被嚇到。\n\n他的手掌仍穩穩握著你的手腕，等你站好才慢慢放開，語氣比平常低了一點。',
        promptSpeaker: '劉諺明',
        prompt: '剛剛有沒有嚇到？我是不是拉得太急了？',
        choices: [
          { text: '沒有，還好你把我護住了。', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '那就好。我不想妳受傷，接下來走裡面一點，我走外側。' }, { kind: 'narration', text: '他說完便自然地換到靠近車道的一側，沒有再多講什麼，卻一路留意著路口的車。' }], affection: { yanming: 3 } },
          { text: '你手還握著我欸。', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '啊，抱歉。剛剛太急了，一時沒注意到。' }, { kind: 'narration', text: '他慢慢鬆開手，卻在你往前走時仍伸手替你擋了一下路邊的車鏡，像是還沒完全放心。' }], affection: { yanming: 3 } },
          { text: '你剛剛是不是比我還緊張？', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '有一點。看到車子突然過來，還是會擔心妳來不及躲。' }, { kind: 'narration', text: '他回答得很坦白，接著確認你的手腕沒有被抓疼，才重新把手收回外套口袋。' }], affection: { yanming: 2 } },
        ],
      },
      {
        scene: '公車站的燈光落在路面上，下一班車還有幾分鐘。諺明哥陪你站在站牌旁，沒有一直看手錶，也沒有催你。他把你的講義袋接過去拿了一會兒，另一隻手替你把外套袖口往上折好，免得你一直踩到。',
        promptSpeaker: '劉諺明',
        prompt: '如果妳以後還來練團室，我想把靠我旁邊那張椅子留給妳。可以嗎？',
        choices: [
          { text: '那你要記得，不能讓別人坐走。', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '好，我會記得。那個位置就先幫妳留著。' }, { kind: 'narration', text: '他答應得很認真，還問你下次大概什麼時候有空，像是已經開始替那張椅子安排主人。' }], affection: { yanming: 3 } },
          { text: '如果我每次都坐你旁邊，大家不會笑你嗎？', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '讓他們笑啊。妳坐得舒服比較重要。' }, { kind: 'narration', text: '他說得很自然，卻在你看向他時也笑了，沒有把這句話收回去。' }], affection: { yanming: 3 } },
          { text: '那我下次可以連外套都跟你借嗎？', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '可以啊。天氣冷的話先跟我說，我多帶一件就好。' }, { kind: 'narration', text: '他把講義袋還給你，又確認外套有沒有穿好，像是已經把這件事當成下次見面的約定。' }], affection: { yanming: 2 } },
        ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '公車轉進街口時，諺明哥先把講義袋交回你手上，還替你確認外套有沒有穿好。他站在車門旁，等你上車找到位置，才往後退了一步。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '到家傳個訊息。今天很晚了，回去就早點休息。' },
      { kind: 'narration', text: '你隔著車窗朝他揮手，他也抬起手回應。車子開遠後，他仍站在路燈下，直到看不見你才轉身離開。' },
    ],
    diarySummary: '諺明哥真的來酒吧外面接我，還特地多帶了一件外套。路上他問我下午看他打鼓的感想，聽見我說他坐上鼓椅時很帥，難得有點不好意思。機車突然竄出來時，他一把握住我的手腕，把我帶到安全的地方，確認我沒事才放手。到了公車站，他說要把靠自己旁邊的椅子留給我。那種不急不徐的照顧，讓人很安心。',
  },

}

