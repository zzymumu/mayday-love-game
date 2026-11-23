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
    { kind: 'narration', text: '阿信握住麥克風時，整個人的氣質像是忽然沉了下來。側面的燈只照亮他的眉眼和半邊臉，第一句唱得不急，帶一點微微沙啞的聲音卻很穩，原本還在聊天的客人不知不覺就安靜了。他沒有刻意做出什麼動作，只是站在那裡，便讓人想把注意力都放到他身上。' },
    { kind: 'narration', text: '副歌響起，他把麥克風從架上拿下來，往舞台前沿走了一步。唱到高處時，他微微仰起頭，握著麥克風的手收緊，聲音一下子穿過整間店；下一句又忽然放輕，像是在把心事講給台下的人聽。燈光掠過他額前的髮絲，他閉眼唱完那個長音，再睜開眼時，剛好找到你的方向。' },
    { kind: 'narration', text: '你跟著唱了幾句，他看見了，眼睛彎起來，笑意藏在下一句歌詞裡。那不是對著全場的客套笑容，而是你熟悉的、帶著一點靦腆的樣子。偏偏他一回到麥克風前，又能立刻把整首歌唱得那麼有力量。' },
    { kind: 'dialogue', speaker: '陳信宏', text: '會唱的話，一起唱喔。' },
    { kind: 'narration', text: '前排真的有人跟著唱了起來。他聽見後笑得更開，手掌朝台下輕輕一攤，像把整首歌都交給大家。你看著他，忽然覺得他站在燈下的樣子，比平常還要耀眼。' },
  ],
  masa: [
    { kind: 'narration', text: '瑪莎把 Bass 往肩上一掛，低頭調好旋鈕，原本愛吐槽的表情一下子收乾淨了。燈光落在他垂下的眼睫和琴身上，第一個低音彈出來，整首歌的重心便穩穩落在他手裡。他的左手沿著琴頸移動，右手指尖一下一下扣住節奏，肩膀跟著拍子輕晃，俐落得讓人移不開眼。' },
    { kind: 'narration', text: '間奏時，他和溫尚翊隔著舞台交換了一個眼神，下一拍兩個人同時切進去，吉他和 Bass 咬得剛剛好。瑪莎抬起頭，嘴角帶著一點得意，像是早就知道這段會接得漂亮。他沒有多餘的炫技，每一下都落在最準的位置，反而顯得特別有魅力。' },
    { kind: 'narration', text: '他忽然看見你正盯著他，眉毛一挑，手上的旋律卻完全沒停。你朝他比了個大拇指，他才露出那種「算妳有聽懂」的笑，低頭把最後幾個音收得乾乾淨淨。' },
    { kind: 'dialogue', speaker: '蔡昇晏', text: '前面有沒有聽到？這個低音很重要欸，不要漏掉。' },
    { kind: 'narration', text: '台下有人笑出聲，他也跟著笑，卻在下一首開始前又朝你看了一眼，像是還在等你給他評分。' },
  ],
  stone: [
    { kind: 'narration', text: '石頭站在舞台另一側，沒有刻意搶到最亮的位置。燈光沿著他的肩線落下來，他微微低著頭，左手在琴頸上移動得又快又準，右手每一下撥弦都很乾淨。旁邊的人越吵，他反而越專注，像整個世界只剩下耳朵裡的節拍和手上的旋律。' },
    { kind: 'narration', text: '溫尚翊的吉他往上拉時，他沒有急著跟著搶，而是留出半拍，再把另一條旋律穩穩接住。兩道聲音交錯的瞬間，他抬起頭，額前的髮絲被燈光照得發亮，眼神裡有一點平常少見的鋒利。那一小段他彈得特別投入，連嘴角都跟著旋律微微揚起。' },
    { kind: 'narration', text: '最後一個和弦落下，他才像從音樂裡回過神來。抬眼看見你一直望著他，他先是愣了一下，隨後露出一個很淡、卻很真心的笑。你忽然發現，石頭認真做一件事的時候，真的有種讓人安靜下來的吸引力。' },
    { kind: 'dialogue', speaker: '石錦航', text: '謝謝大家，這首歌送給今晚還沒想睡的人。' },
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
        scene: '你們正說著話，巷口忽然傳來一陣引擎聲。一台機車從路邊斜斜地竄出來，離你很近。你還沒反應過來，溫尚翊已經一把扣住你的手腕，把你往自己身側拉。你踩到凸起的磚角，整個人失去平衡，額頭和肩膀一下撞進他懷裡。\n\n他的手臂先護住你的背，另一隻手還牢牢握著你的手腕。機車呼嘯著騎遠，他低頭確認你有沒有受傷，離得近到你能看見他額角的汗。等發現你沒事，他才像突然意識到兩個人靠得太近，動作僵了一下。',
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
      { kind: 'narration', text: '阿信把麥克風線交回店裡，走出門時還輕輕清了清喉嚨。唱了一整晚，他的聲音有點沙啞，說話卻還是很溫柔。你們沿著騎樓慢慢往公車站走，他先問你剛才有沒有聽清楚歌詞，說有一段自己差點忘詞。' },
      { kind: 'dialogue', speaker: '你', text: '我有聽到！你停了半秒，我差點笑出來。' },
    ],
    rounds: [
      {
        scene: '阿信聽完你的話，先是睜大眼睛，接著笑著搖頭。他把手插進外套口袋，走路時還不自覺地哼起那句差點忘掉的旋律。',
        promptSpeaker: '陳信宏',
        prompt: '妳真的有發現喔？我還以為我藏得很好馁。',
        choices: [
          { text: '有啊，不過你後來接得很好，完全沒露餡。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '那就好馁，我剛剛還一直想說有沒有被妳聽出來。' }, { kind: 'narration', text: '他笑起來時眼睛彎彎的，還很認真地跟你解釋那句歌詞原本想怎麼唱，像是只要你願意聽，他就可以一路講到天亮。' }], affection: { ashin:  3 } },
          { text: '我有聽到，但我覺得有點可愛。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '欸，這樣也可以喔？那我下次是不是可以再忘一次。' }, { kind: 'narration', text: '他講完自己先笑了，肩膀輕輕碰了你一下，像是在跟你分享只有你們兩個知道的小秘密。' }], affection: { ashin:  3 } },
          { text: '那你下次唱錯，我就要在台下提醒你。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '好啊，那我就知道要往哪裡看了馁。' }, { kind: 'narration', text: '他說得自然，卻又像突然想到什麼似的低頭笑了一下，沒有把話收回去。' }], affection: { ashin:  2 } },
        ],
      },
      {
        scene: '你們走到一段比較窄的騎樓，身後突然傳來機車催油門的聲音。阿信回頭看見車子貼著路邊衝過來，立刻握住你的手腕，把你輕輕拉到自己身後。機車擦著騎樓邊緣過去，他的手還停在你腕上，另一隻手下意識擋在你肩前。\n\n他低頭看了看你，原本帶笑的神情一下子認真起來，確認你沒有被車把碰到，才慢慢鬆開手。',
        promptSpeaker: '陳信宏',
        prompt: '有沒有嚇到？剛剛那台車騎得好快喔。',
        choices: [
          { text: '有一點，還好你有拉住我。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '還好有看到馁，不然我真的會嚇到。' }, { kind: 'narration', text: '他沒有馬上把手收回去，而是等你站到騎樓裡側，才輕輕放開你的手腕。' }], affection: { ashin:  3 } },
          { text: '我沒事啦，你剛剛反應也太快了吧！', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '可能是剛好聽到聲音吧。妳沒事就好馁。' }, { kind: 'narration', text: '他鬆了一口氣，還低頭看了看你的鞋子，確認沒有踩歪，才陪你繼續往前走。' }], affection: { ashin:  2 } },
          { text: '你剛剛把我拉到身後，是怕我被撞到嗎？', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '當然啊，不然咧。' }, { kind: 'narration', text: '他回答得很快，過了幾秒才像是覺得太直接，補了一句：「走路還是要小心一點啦，我會擔心馁。」' }], affection: { ashin:  3 } },
        ],
      },
      {
        scene: '到了公車站，你們沒有立刻分開。站牌旁的路燈把兩個人的影子拉得很長，阿信看了一眼時刻表，說還有幾分鐘。他便靠著站牌旁的柱子，輕聲哼起剛才台上唱的那首歌，這次沒有音箱，也沒有其他人的聲音。',
        promptSpeaker: '陳信宏',
        prompt: '剛剛那首歌，妳最喜歡哪一句？我想知道妳記住的是哪裡。',
        choices: [
          { text: '我最喜歡副歌那句，聽起來很像有人在等一個人。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '妳聽得好仔細喔。那句我也很喜歡馁。' }, { kind: 'narration', text: '他把那一句又輕輕唱了一遍，唱完看著你，像是想把這個版本也留給你。' }], affection: { ashin:  3 } },
          { text: '我喜歡你剛剛唱給台下聽的那一段。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '那我下次再唱給妳聽，好不好？' }, { kind: 'narration', text: '他說完便有點不好意思地笑了，還很認真地把這句話記下來似的點了點頭。' }], affection: { ashin:  3 } },
          { text: '我其實最喜歡你走過來找我對到眼的那一下。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '……妳這樣講，我會不知道要怎麼回馁。' }, { kind: 'narration', text: '他低頭笑了好一會兒，等公車轉進街口才抬起頭，提醒你先準備好車票。' }], affection: { ashin:  3 } },
        ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '公車進站時，阿信先替你看了一眼車內，確認還有座位才讓你上車。他站在車門旁，像是還有話想說，最後只把手抬起來揮了揮。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '到家跟我說一聲喔。今天一起唱歌真的很開心馁。' },
      { kind: 'narration', text: '車子開出去後，你回頭看見他還站在原地。剛才那段兩個人小聲接唱的旋律，像是被夜風留在了你們中間。' },
    ],
    diarySummary: '阿信唱到一半差點忘詞，居然還被我發現。走去公車站時，他不只把那句歌詞哼給我聽，還陪我一起唱。機車突然靠近時，他第一時間把我拉到身後，確認我沒事才鬆手。到了站牌旁，他問我最喜歡哪一句，說下次再唱給我聽。那個聲音好像一直留在耳邊。',
  },
  masa: {
    label: '跟瑪莎一起走',
    title: '和瑪莎走到公車站',
    blocks: [
      { kind: 'narration', text: '瑪莎一走出酒吧就開始評論今晚的演出，先嫌佑達最後那個鼓花太多，再說怪獸有一段吉他差點把他帶偏。你替大家辯護，他立刻轉過頭來，手裡還比著剛才 Bass 的節奏。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '妳到底有沒有認真聽？我那段低音才是整首歌的靈魂欸。' },
    ],
    rounds: [
      {
        scene: '你們沿著騎樓往前走，瑪莎嘴上還在嫌東嫌西，腳步卻配合著你的速度。他忽然用指節敲了敲自己的琴袋，像是想起剛才某個很得意的段落。',
        promptSpeaker: '蔡昇晏',
        prompt: '好啦，認真問，妳覺得我今天彈得怎樣？',
        choices: [
          { text: '很帥啊，尤其你跟怪獸交換眼神那段，超有默契。', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '這還差不多，妳總算有聽到重點。' }, { kind: 'narration', text: '他得意地抬了抬下巴，走沒兩步又補一句：「不過妳也不用一直誇啦，我會不好意思。」那個表情完全不像真的不好意思。' }], affection: { masa:  3 } },
          { text: '還可以啦，沒有把大家帶歪，算你厲害。', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '什麼叫還可以？妳標準也太高了吧！' }, { kind: 'narration', text: '他故意走快兩步，發現你沒有跟上，又停在前面等你，嘴裡還念著「今天的評審很難搞」。' }], affection: { masa:  2 } },
          { text: '我最喜歡你專心彈 Bass 的樣子，跟平常差好多。', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '蛤？我平常哪有不專心？' }, { kind: 'narration', text: '他被你說得一愣，隨即咳了一聲，把視線轉去看路邊招牌，卻偷偷笑了。' }], affection: { masa:  3 } },
        ],
      },
      {
        scene: '你們走到巷口，一台機車突然從停車格旁倒車衝出來。瑪莎先聽見引擎聲，反手抓住你的手腕往自己這邊一帶，讓你避開車頭。你被他拉得踉蹌半步，肩膀差點撞上他的胸口。他另一隻手扶了一下你的手臂，等機車騎遠才鬆開。\n\n他皺著眉看你，剛才那副愛鬧的樣子短暫收了起來，像是真的被嚇了一跳。',
        promptSpeaker: '蔡昇晏',
        prompt: '妳走路都不看路喔？差一點就撞到了欸。',
        choices: [
          { text: '你拉那麼大力，我差點被你扯飛欸！', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '不拉妳才真的飛出去吧！' }, { kind: 'narration', text: '他嘴上反駁，手卻還扶著你的手臂，直到你站穩才放開，接著又故意說：「下次走路記得帶眼睛。」' }], affection: { masa:  2 } },
          { text: '你剛剛是不是有點緊張？我看到了喔。', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '我是在怕妳撞到，這有什麼好緊張的！' }, { kind: 'narration', text: '他回答得太快，反而讓你更想笑。他瞪你一眼，卻把你往騎樓裡側帶，自己走到靠馬路的地方。' }], affection: { masa:  3 } },
          { text: '謝啦，這次算你反應快，我給你加分。', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '才加這麼一點？我剛剛可是救了妳欸！' }, { kind: 'narration', text: '他伸手比了個很誇張的數字，非要你重新評分，直到你笑著說滿分，他才滿意地往前走。' }], affection: { masa:  3 } },
        ],
      },
      {
        scene: '公車站就在前面。瑪莎走到站牌旁，先看了看路線，再把琴袋靠在柱子邊。他說剛才那段節拍你其實抓得不錯，接著用手指在欄杆上敲了兩遍，故意停在最後一拍，等你接上。這次你沒有慢半拍，他立刻露出「我就知道」的表情。',
        promptSpeaker: '蔡昇晏',
        prompt: '下次要不要來練團？我可以教妳，不過先說好，學生不能嫌老師囉嗦。',
        choices: [
          { text: '好啊！但老師不准一直罵學生笨。', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '我哪有罵妳笨，我只會說妳拍子很有自己的想法。' }, { kind: 'narration', text: '他笑得肩膀都在抖，卻已經開始跟你約下次哪天有空。' }], affection: { masa:  3 } },
          { text: '那要看老師會不會先請學生吃東西。', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '妳到底是來學音樂還是來敲詐的？' }, { kind: 'narration', text: '他嘆了口氣，最後還是說可以考慮，還補了一句：「不過要先把節拍學會，不能只記得吃。」' }], affection: { masa:  2 } },
          { text: '我怕你教到一半又開始吐槽我。', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '那妳就努力一點，讓我沒機會吐槽啊。' }, { kind: 'narration', text: '他把琴袋重新背起來，故意用手指敲出一個很簡單的節奏，像是已經開始上第一堂課。' }], affection: { masa:  2 } },
        ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '公車還有一會兒才到。瑪莎陪你站在站牌下，嘴裡繼續嫌佑達的鼓花太多，卻把靠近車道的位置留給自己。等車燈轉進街口，他才把琴袋往肩上提好，伸手替你把滑下來的背包肩帶拉回去。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '到了傳個訊息啦，不然我還要被說沒把人送好。' },
      { kind: 'dialogue', speaker: '你', text: '你明明就很關心我。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '少自作多情！快上車啦！' },
      { kind: 'narration', text: '他嘴上還在否認，等車子開出去時卻又朝你揮了揮手，直到看不見才轉身離開。' },
    ],
    diarySummary: '瑪莎一路都在嫌東嫌西，還硬要我替他的 Bass 打分數。巷口機車突然衝出來時，他一把抓住我的手腕把我拉開，嘴上罵我不看路，自己卻一直等我站穩。到了公車站又跟我玩節拍接龍，還說下次要教我。這個人真的很會把關心講得像在找架吵。',
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
        scene: '你說那段是今晚最喜歡的地方。石頭聽完，低頭想了一下，接著用手指在空中比出兩段旋律交錯的方向。他講得很仔細，卻沒有急著把所有細節一次說完。',
        promptSpeaker: '石錦航',
        prompt: '那妳覺得，是哪一把先進來比較好聽？',
        choices: [
          { text: '先聽你的那一段，後面再接怪獸的旋律。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '妳記得很清楚欸。對，這樣接起來比較有空間。' }, { kind: 'narration', text: '他看著你笑了一下，接著又慢慢比了一次，像是很高興你真的有把他的部分聽進去。' }], affection: { stone:  3 } },
          { text: '我覺得兩個一起進來的時候最有力量。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '那個版本也不錯，不過要抓得很準。' }, { kind: 'narration', text: '他說著說著，手指又比出剛才的節拍，還特地放慢讓你看清楚。' }], affection: { stone:  2 } },
          { text: '我其實是看你們兩個互相看了一眼，才知道要進副歌了。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '哈哈，原來妳有注意到那個。' }, { kind: 'narration', text: '他有點不好意思地摸了摸鼻子，說那是排練時慢慢磨出來的默契。' }], affection: { stone:  3 } },
        ],
      },
      {
        scene: '你們走到騎樓轉角，一台機車突然從巷子裡衝出來。石頭聽見引擎聲，立刻伸手握住你的手腕，把你往牆邊安全的位置帶。你被他拉得往前一步，他另一隻手穩穩扶住你的肩，讓你沒有撞上柱子。\n\n機車騎遠後，他沒有馬上放開，先低頭確認你的手腕和肩膀有沒有撞到，才輕輕鬆手，神情裡滿是擔心。',
        promptSpeaker: '石錦航',
        prompt: '有沒有嚇到？剛剛那台車離得很近。',
        choices: [
          { text: '有一點，不過你拉得很及時。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '還好有注意到。妳先站這裡一下，我看車子過去了再走。' }, { kind: 'narration', text: '他很自然地站到靠外側的位置，等你點頭說沒事，才陪你繼續往前。' }], affection: { stone:  3 } },
          { text: '你剛剛抓住我的時候，我真的有嚇一跳。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '對不起，我怕來不及才拉得比較急。' }, { kind: 'narration', text: '他看著你的手腕，像是怕自己弄疼了你，語氣放得很輕，還問你要不要先休息一下。' }], affection: { stone:  2 } },
          { text: '你是不是一直都有在注意我走路？', response: [{ kind: 'dialogue', speaker: '石錦航', text: '有稍微留意啦，這邊路比較窄。' }, { kind: 'narration', text: '他停了一下，又補上一句：「而且我不想妳受傷。」說完便替你把路邊的障礙讓開。' }], affection: { stone:  3 } },
        ],
      },
      {
        scene: '公車站旁邊有一排長椅，石頭問你要不要坐一下。車還沒來，他便靠在站牌旁，輕輕哼起剛才那段旋律。你跟著哼了兩個音，他立刻聽出來，轉過頭來陪你把那一小段接完。',
        promptSpeaker: '石錦航',
        prompt: '下次如果妳還想聽，我可以把那段慢慢彈給妳。妳會想聽嗎？',
        choices: [
          { text: '想啊，而且我想聽你單獨彈給我。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '好，那我找一個比較安靜的時間。' }, { kind: 'narration', text: '他答應得很認真，還像怕忘記似的，把這件事又重複了一遍。' }], affection: { stone:  3 } },
          { text: '好啊，不過你要從頭教我聽懂。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '可以，我慢慢講，妳不用一次記住。' }, { kind: 'narration', text: '他笑著把剛才的節拍又比了一次，等你跟上才停下來。' }], affection: { stone:  2 } },
          { text: '那我下次還要坐你旁邊，這樣才聽得清楚。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '好，我幫妳留位置。' }, { kind: 'narration', text: '他說得很自然，卻在你笑起來時也跟著笑了，沒有把視線移開。' }], affection: { stone:  3 } },
        ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '公車進站前，石頭先站起來，把長椅旁邊你的包包遞給你，還提醒你小心車門的階梯。你上車後回頭，他仍站在路燈下，手裡拎著琴袋，安安靜靜地朝你揮手。' },
      { kind: 'dialogue', speaker: '石錦航', text: '到家跟我們說一聲。今天謝謝妳來，妳喜歡那段就好。' },
      { kind: 'narration', text: '車子慢慢開遠，你還記得他說「我不想妳受傷」時那個認真的表情。明明只是很平常的一句話，卻讓這段回家的路變得特別安靜、也特別難忘。' },
    ],
    diarySummary: '石頭陪我聊了很久兩把吉他怎麼接在一起，還很認真地確認我有沒有聽懂。巷口機車突然衝出來時，他立刻抓住我的手腕把我帶到安全的地方，第一件事就是問我有沒有受傷。到了公車站，他又答應下次單獨彈那段給我聽。跟他走在一起，好像連安靜都很舒服。',
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
        prompt: '妳真的覺得下午那段很好看？我很久沒正式坐上鼓椅了。',
        choices: [
          { text: '真的！你一拿起鼓棒，大家都安靜了。', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '哈哈，妳講得太誇張了。只是以前練過，手還記得。' }, { kind: 'narration', text: '他笑著低頭，指尖卻不自覺地比了兩下握鼓棒的動作，像是也想起那幾個小節。' }], affection: { yanming:  3 } },
          { text: '我最喜歡你最後收住那一下，乾淨又俐落。', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '妳連最後那一下都有注意到喔？' }, { kind: 'narration', text: '他看了你一眼，眼神裡有點意外，也有一點被認真欣賞的高興。' }], affection: { yanming:  3 } },
          { text: '佑達的表情最好笑，他真的快看傻了。', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '他很喜歡鼓，看到有人打得順就會特別興奮。' }, { kind: 'narration', text: '他笑著說起佑達剛才的反應，還學了一下對方瞪大眼睛的樣子，難得露出有點孩子氣的一面。' }], affection: { yanming:  2 } },
        ],
      },
      {
        scene: '走到路口時，一台機車忽然從停車格旁竄出來，速度快得讓人來不及反應。諺明哥先聽見引擎聲，立刻握住你的手腕，把你帶到自己身側靠裡的位置，另一隻手護在你肩前。車子擦過路邊後很快騎遠，他沒有急著繼續走，而是低頭確認你有沒有被嚇到。\n\n他的手掌仍穩穩握著你的手腕，等你站好才慢慢放開，語氣比平常低了一點。',
        promptSpeaker: '劉諺明',
        prompt: '有沒有碰到？剛剛那台車真的太靠近了。',
        choices: [
          { text: '沒有，還好你有注意到。', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '那就好。接下來走裡面一點，我走外側。' }, { kind: 'narration', text: '他沒有再多說什麼，只自然地換到靠近車道的一側，步伐也放慢了些。' }], affection: { yanming:  3 } },
          { text: '我沒事啦，你剛剛是不是嚇到了？', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '有一點。看到車子突然過來，還是會擔心妳來不及躲。' }, { kind: 'narration', text: '他說得很坦白，接著確認你的手腕沒有被抓疼，才重新把手收回外套口袋。' }], affection: { yanming:  3 } },
          { text: '你拉住我的時候，我還以為要被你拎走了。', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '哈哈，當時沒想那麼多，只想先讓妳離車子遠一點。' }, { kind: 'narration', text: '他被你逗笑，還伸手替你把外套袖口拉好，提醒你不要踩到衣角。' }], affection: { yanming:  2 } },
        ],
      },
      {
        scene: '公車站的燈光落在路面上，下一班車還有幾分鐘。諺明哥陪你站在站牌旁，沒有一直看手錶，也沒有催你。他問你明天是不是還要整理期末考的東西，聽你抱怨兩句後，便很自然地接過你手裡比較重的講義袋，讓你空出手來。',
        promptSpeaker: '劉諺明',
        prompt: '如果下次還想來練團室，或是想再聽我打鼓，都可以先跟我說。',
        choices: [
          { text: '那你要答應我，下次真的再打一次給我看。', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '好，我答應妳。有機會就再坐上去打幾段。' }, { kind: 'narration', text: '他答應得很認真，還問你比較喜歡哪一種節奏，像是真的開始替下一次做準備。' }], affection: { yanming:  3 } },
          { text: '我想去看你們練團，不一定要特別表演。', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '當然可以。平常練團也很熱鬧，妳來的話我幫妳留個安全的位置。' }, { kind: 'narration', text: '他把講義袋還給你，還順手替你把外套拉鍊往上拉了一點。' }], affection: { yanming:  3 } },
          { text: '那我以後有問題都可以找你嗎？', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '可以啊。只要我有空，就會回妳。' }, { kind: 'narration', text: '他說得平穩又可靠，卻在公車快到時補了一句：「不只是練團的事也可以。」' }], affection: { yanming:  3 } },
        ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '公車轉進街口時，諺明哥先把講義袋交回你手上，還替你確認外套有沒有穿好。他站在車門旁，等你上車找到位置，才往後退了一步。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '到家傳個訊息。今天很晚了，回去就早點休息。' },
      { kind: 'narration', text: '你隔著車窗朝他揮手，他也抬起手回應。車子開遠後，他仍站在路燈下，直到看不見你才轉身離開。' },
    ],
    diarySummary: '諺明哥真的來酒吧接我，還特地多帶了一件外套。路上他問我下午看他打鼓的感想，聽我說喜歡最後收住的那一下，還有點不好意思。機車突然竄出來時，他一把握住我的手腕，把我帶到安全的地方，確認我沒事才放手。到了公車站，他說下次想聽他打鼓可以直接告訴他。那種不急不徐的照顧，讓人很安心。',
  },
}

