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
  { kind: 'narration', text: '晚上八點多，你跟著他們走進那間藏在巷子裡的小酒吧。樓梯還沒走到底，就先聽見裡面有人笑鬧、有人喊朋友的名字，鼓聲隔著門板傳出來，一下一下敲得人心癢。門一推開，暖黃的燈光、碰杯聲和音箱裡試音的吉他聲立刻湧上來。' },
  { kind: 'narration', text: '店裡幾乎坐滿了。吧台前有人挪出位置，靠近舞台的客人已經把椅子轉過來，還有人一看見他們就拍了拍朋友的肩膀：「欸欸欸，他們來了！」佑達聽見了，立刻把鼓棒在手裡轉了一圈，瑪莎從旁邊看見，順手吐槽他不要還沒上台就先掉棒。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '我這叫熱身好不好！等一下你們就知道了。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '你先不要把棒子飛到客人桌上，我們今天是來唱歌，不是來表演雜技。' },
  { kind: 'narration', text: '溫尚翊蹲在音箱旁調效果器，石頭拿著吉他試了幾個和弦，阿信則站在舞台邊跟老闆確認歌序。幾個人嘴上互相嫌棄，手上卻熟得很，誰的音量不對、哪條線沒插好，幾乎一個眼神就能接上。你在前排找到位置坐下，桌面還留著上一桌客人喝過的水痕，心裡卻已經開始期待。' },
  { kind: 'narration', text: '燈光一暗，佑達先敲了四下。溫尚翊的吉他前奏乾乾淨淨地切進來，石頭很快接上第二把吉他，瑪莎的 Bass 從底下把節奏托起來。阿信走到麥克風前，抬眼看了看台下，第一句唱出來時，原本還在聊天的幾桌人真的慢慢安靜了。' },
  { kind: 'narration', text: '副歌一到，前排有人跟著唱，旁邊的客人也開始拍桌打拍子。佑達越打越起勁，鼓棒落下的聲音清脆得像把整間店的心跳都帶快了；瑪莎跟著節奏晃肩，還趁空檔朝石頭做了個鬼臉。石頭沒理他，只在下一個轉段時把吉他接得漂亮得不得了。' },
  { kind: 'narration', text: '第二首結束，台下立刻有人喊安可，明明才剛開始，吧台那邊已經有人站起來。阿信笑著跟大家說還有很多歌，溫尚翊回頭跟石頭交換了一個眼神，幾個人幾乎同時重新踩進節拍。你拍得手心發熱，連隔壁桌的陌生客人都轉過來跟你一起笑。' },
  { kind: 'narration', text: '你坐得離舞台很近，能看清他們彈奏時的手勢，也能看見燈光落在額角的汗珠上。平常在練團室裡吵吵鬧鬧的幾個人，一站上台就像忽然找到另一種語言；不用多說什麼，只要一個節拍、一個眼神，就知道下一段要怎麼走。' },
]

export const winterGigFocusBlocks: Record<WinterCharacterId, WinterStoryBlock[]> = {
  wen: [
    { kind: 'narration', text: '你幾乎是第一眼就被溫尚翊抓住了視線。平常他穿得隨意，說話又總帶著一點不服輸的神氣，可站上舞台後，那股勁全變成了俐落又漂亮的自信。他把袖口往上折了一點，吉他背帶斜過肩膀，低頭調好最後一個音，抬起眼時剛好有一道燈光落在他的側臉上。' },
    { kind: 'narration', text: '前奏一進，他的手指就在琴弦上飛快移動，手腕穩得幾乎看不出多餘動作。到了間奏，他往前踏了一步，身體跟著鼓點微微傾斜，琴聲乾淨地往上拉，台下立刻有人吹口哨。你看見他額前的頭髮被汗弄得有點亂，他卻連眼睛都沒眨一下，最後一個音收得又準又漂亮。' },
    { kind: 'narration', text: '最讓你移不開眼的是下一首。阿信唱到副歌時，他和石頭一左一右把吉他聲疊起來，溫尚翊忽然抬頭，目光越過前排的人群，正好和你對上。你愣了一下，他卻像是早就知道你在看，嘴角揚起一點點，接著把那段旋律彈得更亮。' },
    { kind: 'narration', text: '台下的掌聲湧上來時，他沒有立刻轉身，只是把吉他往身側放低，抬手擦過額角，呼吸還有點急。燈光從他肩上滑過，你突然覺得他和平常那個會為了一句話跟你鬥嘴的人很不一樣——不是變成了別人，而是你第一次看見他這麼自在、這麼耀眼的樣子。' },
    { kind: 'dialogue', speaker: '溫尚翊', text: '謝謝啦！前面那幾桌很捧場喔，等一下最後幾首不要偷懶，跟著拍手啦。' },
    { kind: 'narration', text: '他說完又往你這邊看了一眼。這次你沒有躲開，反而大大方方地朝他比了個讚。他像是想笑，又忍住了，轉回去時耳朵似乎有點紅，手上的前奏卻一點也沒亂。' },
  ],
  ashin: [
    { kind: 'narration', text: '阿信一站到麥克風前，整個人的氣質就慢慢沉了下來。剛才在台下還會拿歌序跟瑪莎鬥嘴的他，這時把一隻手輕輕搭在麥克風架上，低頭等前奏進來。第一句唱出口，聲音穿過人群，連吧台邊原本還在說話的人都轉過頭。' },
    { kind: 'narration', text: '唱到副歌，他抬起眼看向台下，沒有刻意做什麼誇張的動作，只是隨著旋律往前一步，手掌朝大家打開。前排有人跟著唱，他眼睛立刻彎起來，像是收到一份很珍貴的回應。那個笑不是對著鏡頭的，也不是刻意討好誰，反而讓人覺得特別真。' },
    { kind: 'narration', text: '下一首節奏快了起來，他一手握著麥克風，一手跟著鼓點輕輕打拍子，唱到高處時微微仰起頭，額前的頭髮被燈光照得發亮。佑達在後面加了一個漂亮的鼓花，他轉頭看了一眼，忍不住笑出來，連台下都跟著起鬨。' },
    { kind: 'narration', text: '中間換歌時，他拿起水喝了一口，低頭看了看歌序，又抬眼找到你的位置。你一直在拍手，他便朝你點了點頭，像是在說有看見。那一瞬間，他臉上還帶著唱完一整首歌的薄汗和笑意，溫柔得讓人很難把目光移開。' },
    { kind: 'dialogue', speaker: '陳信宏', text: '謝謝你們喔。今天唱到這裡，真的覺得有你們一起聽很幸福。' },
    { kind: 'narration', text: '他說完把麥克風重新握好，下一個前奏響起時，整間酒吧又跟著他一起亮了起來。' },
  ],
  masa: [
    { kind: 'narration', text: '瑪莎上台後反而比平常安靜。Bass 往身前一掛，他低頭確認了兩個旋鈕，指尖在弦上一撥，低沉的聲音立刻把整首歌的底盤穩穩托住。燈光照到他的側臉，他微微瞇起眼睛聽著鼓點，平常那副愛吐槽的表情忽然變得很專注。' },
    { kind: 'narration', text: '到了副歌，他整個人跟著節奏晃了一下，右手指尖落弦的動作俐落得像不用思考。溫尚翊在另一側彈進一段旋律，瑪莎立刻抬頭跟他對上眼，兩個人像在台上無聲較勁。石頭接住下一拍時，瑪莎還故意挑眉，像在說這次算你厲害。' },
    { kind: 'narration', text: '你忍不住笑了一下，他竟然真的看見了。下一個間奏，他朝你這邊抬了抬下巴，手上的 Bass 線卻半點沒漏，還把最後一個音收得乾淨俐落。那種「我知道妳在看」的得意，隔著整個舞台都看得出來。' },
    { kind: 'narration', text: '最後一段他稍微往前站，肩膀隨著節拍一沉一抬，低音和鼓點咬得剛剛好。掌聲響起時，他把 Bass 往上托了一下，露出平常那種欠揍的笑。你忽然發現，這個人認真彈起音樂來，是真的很有魅力。' },
    { kind: 'dialogue', speaker: '蔡昇晏', text: '欸，前面那個一直笑的，剛剛有聽到我的 Bass 吧？不要只顧著看熱鬧喔！' },
    { kind: 'narration', text: '旁邊幾桌客人跟著笑起來。他自己也笑了，低頭轉回去調音，像是剛才那句只是隨口鬧你，卻又明顯記得你坐在哪裡。' },
  ],
  stone: [
    { kind: 'narration', text: '石頭站在舞台另一側，沒有像溫尚翊那樣往前衝，也不會像瑪莎一樣趁空檔逗台下的人。他只是低著頭，手指安安靜靜地在琴弦上移動，卻把每一段和弦接得非常穩。當燈光從側面照過來，你看見他微微垂著眼，神情專注得像整個世界只剩下那把吉他。' },
    { kind: 'narration', text: '溫尚翊的旋律往上走時，石頭沒有搶位置，而是把自己的音色收得更乾淨，剛好在下一拍接住。兩把吉他交錯的那一瞬間，整首歌忽然變得很有層次。台下有人喊了一聲好，他才抬起頭，露出一個很淡、卻很漂亮的笑。' },
    { kind: 'narration', text: '中間有個客人站起來擋住後排視線，他注意到了，稍微往舞台另一側移了半步，讓後面的人也能看見。做完這個小動作，他又低頭接回旋律，彷彿照顧別人的習慣連在台上都改不掉。' },
    { kind: 'narration', text: '最後一段吉他尾奏，他的手指沿著琴頸滑過，音符一個接一個落下。燈光停在他的肩線和側臉上，汗水沿著鬢角滑下來，他卻只在最後一個音結束後輕輕吐了口氣。你朝他比了個大拇指，他看見後笑著點頭，那個笑讓你心裡也跟著安靜了一下。' },
    { kind: 'dialogue', speaker: '石錦航', text: '謝謝大家，剛剛那首我們自己也很喜歡。希望你們也有聽得開心。' },
    { kind: 'narration', text: '他把吉他稍微放低，抬手擦汗時又往你這邊看了一眼。沒有太多話，卻讓你覺得那份認真被好好地接住了。' },
  ],
  yanming: [
    { kind: 'narration', text: '諺明哥沒有跟著他們上台，你的視線卻好幾次被鼓聲帶回下午的練團室。你還記得他把袖子往上拉、拿起鼓棒時那個有點無奈的笑；第一下只是試拍，第二下開始，整個人的氣勢就完全不一樣了。' },
    { kind: 'narration', text: '他坐在鼓組前時背脊挺得很直，手腕卻放得很鬆。鼓棒在指間翻過去又落下，低音鼓、軍鼓和鈸聲一層一層接起來，節奏既有力又乾淨。最厲害的是他沒有急著把速度打快，每個停頓都抓得剛好，像是整個房間的拍子都在他手裡。' },
    { kind: 'narration', text: '佑達當時站在旁邊看得目不轉睛，瑪莎還吹了聲口哨。諺明哥最後一個鈸音收住，抬頭時只是笑著說手還記得，額角卻也有一點汗。那種平常不張揚、真正拿起鼓棒就讓所有人安靜下來的樣子，你到現在還記得很清楚。' },
    { kind: 'narration', text: '酒吧裡的鼓點響起，你看著佑達在台上揮棒，忽然又想起下午那個畫面。你不是沒看見今晚其他人的帥氣，只是諺明哥那一段，像是被你偷偷收進口袋裡，變成只有你知道的特別回憶。' },
    { kind: 'dialogue', speaker: '你', text: '下午那段真的好帥……' },
    { kind: 'narration', text: '你忍不住笑了笑。想到他被大家起鬨時明明一臉拿你們沒辦法，坐上鼓椅後卻又認真得不得了，心裡忽然有點期待下次還能不能再聽一次。' },
  ],
}

export const winterBreakGigEndingBlocks: WinterStoryBlock[] = [
  { kind: 'narration', text: '最後一首歌的前奏才剛響起，前排已經有人把手舉得老高。阿信笑著把麥克風往台下遞，佑達順勢把鼓點推得更滿，瑪莎和石頭一左一右接住節奏，溫尚翊則在最後一段把吉他旋律拉得又亮又乾淨。整間酒吧跟著唱、跟著拍，連吧台的客人都站起來了。' },
  { kind: 'narration', text: '最後一個音落下，掌聲像一下子把屋頂掀開。有人吹口哨，有人敲桌子喊再一首，阿信笑著鞠躬，溫尚翊把吉他往身側放低，石頭抬手擦汗，瑪莎朝台下揮了揮手。佑達從鼓組後面站起來，額頭全是汗，還不忘把鼓棒舉高，像剛打贏一場仗。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '欸欸欸，剛剛最後那個鼓花有沒有帥？我自己都快被自己帥到了！' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '你先下來啦，等一下真的被自己帥到跌倒，還要我們把你抬出去。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '謝謝大家今天來，真的很開心。你們剛剛一起唱的時候，我差點聽不到自己的聲音了。' },
  { kind: 'narration', text: '下台後，幾個人立刻被忙碌的收尾包圍。溫尚翊蹲在地上拔導線，石頭把效果器一個個收進袋子，瑪莎拿毛巾擦著汗，還在跟佑達爭論最後一段到底是誰多打了一下。阿信經過你旁邊，順手把一瓶水放到桌上，說剛才前排太熱鬧，怕你喊到口渴。' },
  { kind: 'narration', text: '店裡有客人走過來稱讚剛才的吉他段落，溫尚翊一邊道謝一邊把最後一條線捲好，嘴上還不忘回頭吐槽瑪莎收東西收得像在拆炸彈。瑪莎立刻回敬，石頭在旁邊笑著勸兩個人快一點，阿信則被老闆拉去說下次演出的時間。剛才在台上發光的五個人，轉眼又變回那群吵吵鬧鬧的大男生。' },
  { kind: 'narration', text: '佑達被老闆留下來確認費用和器材清單，其他人先陪你走到門口透透氣。門一推開，夜風立刻吹散了酒吧裡的熱氣。街上還有幾家店亮著燈，機車從巷口一台接一台地經過，遠處公車站的站牌亮著白光。' },
  { kind: 'narration', text: '你們站在騎樓下，誰也沒有急著立刻道別。有人還在回味剛才哪一段最順，有人把外套披上，有人拿著水瓶慢慢喝。演出結束了，可那股熱鬧還留在每個人的聲音裡；接下來這段走去公車站的路，反而像是今晚真正屬於你們幾個人的時間。' },
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
      { kind: 'narration', text: '溫尚翊走在靠近馬路的那一側，手裡還拎著剛收好的效果器袋。酒吧門口的人聲慢慢遠了，街邊幾家小店還亮著燈，騎樓下有客人抽菸聊天。你跟在他旁邊，耳朵裡好像還留著剛才最後一首歌的尾音。' },
      { kind: 'dialogue', speaker: '你', text: '你剛剛那段吉他真的超帥欸！尤其最後那個轉音，我差點叫出來。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '有這麼誇張喔？我還以為妳只顧著拍手，根本沒聽清楚咧。' },
      { kind: 'dialogue', speaker: '你', text: '我有認真聽好不好！而且我有看到你中間一直往我這邊看。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '哪有一直看。只是剛好那個位置比較亮，我看一下台下而已。' },
      { kind: 'narration', text: '他回答得很快，還故意把視線轉去看前面的路。你偏偏不肯放過他，笑著說自己明明就坐在最前面，他要找人怎麼可能找不到。溫尚翊清了清喉嚨，嘴角卻一直壓不下來。' },
      { kind: 'dialogue', speaker: '你', text: '所以你有看到我對不對？' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '有啦，有看到。妳拍手拍那麼大聲，我又不是聽不到。' },
      { kind: 'narration', text: '你正想再逗他兩句，前方巷口忽然傳來一陣急促的引擎聲。一台機車貼著騎樓邊緣衝出來，你下意識往旁邊退，鞋跟卻踩到路面凸起的磚角，整個人一下失去平衡。' },
      { kind: 'narration', text: '溫尚翊幾乎是反射動作地扣住你的手腕，另一隻手立刻扶上你的腰側，把你往自己這邊帶。你沒有撞上路邊的柱子，卻因為退得太急，整個人斜斜地跌進他懷裡。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '欸！小心！' },
      { kind: 'narration', text: '他的手還扶在你的腰側，你一隻手抓著他的衣服，兩個人近得連呼吸都像撞在一起。機車已經騎遠了，你卻一時忘了站直。溫尚翊低頭看你，原本皺著的眉頭慢慢鬆開，耳朵卻先紅了起來。' },
      { kind: 'dialogue', speaker: '你', text: '……我是不是差點撞到你？' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '妳不是差點，是已經撞到了啦。' },
      { kind: 'narration', text: '他說完才像突然意識到手還放在哪裡，立刻把你扶好，自己也往後退了半步。明明剛才反應快得不得了，現在卻不太敢看你的眼睛，還伸手摸了一下自己的後頸。' },
      { kind: 'dialogue', speaker: '你', text: '溫尚翊，你耳朵怎麼紅紅的？' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '哪有！剛剛裡面很熱啦。妳先看自己有沒有跌傷，不要一直注意奇怪的地方。' },
      { kind: 'dialogue', speaker: '你', text: '我又沒說你害羞。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '……妳真的很會欸。走啦，前面路不平，這次看著走。' },
      { kind: 'narration', text: '他重新走到靠馬路的那側，這次卻沒有離你太遠。經過一段人行道比較窄的地方，他伸手輕輕碰了一下你的手肘，提醒你往裡面走。你們又聊起剛才的演出，他說最後那段其實臨時改了一點，你追問是哪裡，他便一邊走一邊用手指在空中比節拍，講得比在台上還起勁。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '下次有空再彈給妳聽啦。今天那邊太吵，妳不一定聽得出差別。' },
      { kind: 'dialogue', speaker: '你', text: '好啊，那我下次還要坐第一排。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '妳是每次都要坐那麼前面喔？好啦，幫妳留位置。' },
      { kind: 'narration', text: '公車站就在前面。他先陪你走到站牌下，低頭看了看路線，又確認下一班車還有多久。車燈從街口轉進來時，他把你往站牌裡側讓了讓，等你上車找到位置，才抬手揮了揮。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '到家傳訊息給我。還有，剛剛那個差點跌倒的事，不准回去跟瑪莎講。' },
      { kind: 'dialogue', speaker: '你', text: '為什麼？' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '沒有為什麼啦！快上車！' },
    ],
    diarySummary: '我大概會一直記得那一下。前一秒還在笑他明明有看我，下一秒就因為踩到磚角整個人撞進他懷裡。他扶住我的時候明明很急，等我站穩了卻先紅了耳朵，還硬要裝作是酒吧裡太熱。最可疑的是，他居然特地叮嚀我不准告訴瑪莎。',
  },
  ashin: {
    label: '跟陳信宏一起走',
    title: '和陳信宏走到公車站',
    blocks: [
      { kind: 'narration', text: '阿信走出酒吧時還拿著那張被折了好幾次的歌序紙。他把外套拉好，先問你剛才有沒有聽清楚最後一首，接著又回頭看了一眼已經關上的酒吧門，像是還有一點捨不得剛才台上的氣氛。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '剛剛最後那首，妳有跟著唱嗎？我唱到副歌的時候有聽到前面有人一起唱，還在想是不是妳。' },
      { kind: 'dialogue', speaker: '你', text: '有啊！可是我怕唱太大聲會吵到旁邊的人。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '不會啦，大家都是來聽歌的。有人一起唱，台上反而會更有精神。' },
      { kind: 'narration', text: '你們沿著騎樓往公車站走。他把歌序紙攤開給你看，指著其中一首說剛才唱的版本跟平常練習時不太一樣，因為台下反應很好，所以中間多留了一段給吉他。你低頭看紙，差點沒注意到前面停車格旁有台機車突然發動。' },
      { kind: 'narration', text: '引擎聲一下子靠近，阿信先聽見了。他伸手握住你的手腕，把你往自己身側帶，另一隻手護在你前面。機車擦著騎樓邊緣過去，你手上的歌序紙被風吹得一掀，他順勢替你按住，紙才沒有飛走。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '小心！有沒有嚇到？剛剛看妳一直在看歌單，我怕妳沒注意到車。' },
      { kind: 'dialogue', speaker: '你', text: '有一點……還好你有拉我。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '還好有看到。妳先站裡面一點，這段路機車真的很多。' },
      { kind: 'narration', text: '他確認你站穩了才鬆開手，接著把歌序紙重新折好，仔細地交回你手上。剛才那一下讓你們靠得很近，他倒沒有急著退開，只是低頭笑了笑，問你剛剛是不是被嚇到了。' },
      { kind: 'dialogue', speaker: '你', text: '我沒事啦。你剛剛反應好快喔。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '可能是因為我手上拿著紙，剛好也聽到聲音。下次不要邊走邊看啦，等停下來再看也可以。' },
      { kind: 'narration', text: '你們繼續往前。他開始跟你聊剛才唱的那首歌，說有幾句詞還想再改，問你聽起來會不會太繞。你認真想了一下，提出自己的看法，他竟然真的停下腳步聽完，還從口袋裡找出一支筆，在歌序紙背面記了兩個字。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '妳這樣講滿有道理的欸。我回去再想想看，說不定真的可以改得更順。' },
      { kind: 'dialogue', speaker: '你', text: '那我是不是也算參與創作了？' },
      { kind: 'dialogue', speaker: '陳信宏', text: '算啊，至少今天這個版本有妳的意見。下次來聽，我再跟妳說有沒有改成功。' },
      { kind: 'narration', text: '到了公車站，他先替你看了一眼站牌，確認方向沒有走錯，又陪你站在比較亮的地方等車。車子進站時，他把那張歌序紙的邊角壓平，像是怕你一上車就弄丟。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '這張妳留著好了。今天的歌單，還有妳剛剛幫忙想的那兩個字。回去路上小心，到家再跟我說一聲。' },
      { kind: 'narration', text: '你上車後回頭看，他還站在原地朝你揮手，直到公車重新開出去，才把手放下。' },
    ],
    diarySummary: '阿信把那張歌序紙留給我了。紙背面還有他剛剛記下的兩個字，想到他真的把我的意見當一回事，就覺得有點不可思議。路口那台機車突然衝過來時，他握住我的手腕把我拉到身邊，連被風吹起來的歌單都替我按住了。',
  },
  masa: {
    label: '跟瑪莎一起走',
    title: '和瑪莎走到公車站',
    blocks: [
      { kind: 'narration', text: '瑪莎一走出酒吧就開始算帳，說今晚至少有三個地方是佑達自己加的花樣，害他差點跟不上。佑達明明已經被老闆留下來，還隔著門大聲回了一句自己明明打得超好，瑪莎聽見後立刻翻了個白眼。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '妳剛剛有沒有聽到？他還敢說自己打得好。最後那一下差點把我心臟打出來欸。' },
      { kind: 'dialogue', speaker: '你', text: '可是我覺得很好聽啊！你們配合得超好的。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '喔？所以妳有認真聽我的 Bass？我還以為妳整晚都在看某個吉他手。' },
      { kind: 'dialogue', speaker: '你', text: '你不要自己對號入座好不好！' },
      { kind: 'narration', text: '瑪莎笑得一臉得逞，還故意放慢腳步等你追上來。你們沿著騎樓繼續鬥嘴，他把剛才台上誰看錯拍、誰差點笑場講得活靈活現，講到一半還模仿溫尚翊彈錯一個音時的表情，害你差點在路邊笑彎腰。' },
      { kind: 'dialogue', speaker: '你', text: '你真的很壞欸！人家又沒有彈錯很多。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '我是在幫妳還原現場，妳要珍惜這種第一手情報。' },
      { kind: 'narration', text: '你正想反駁，旁邊巷子忽然竄出一台機車，速度快得連喇叭都來不及按。瑪莎反應很快，一把抓住你的手腕往後拉，你卻因為正在轉頭跟他說話，腳步一下沒踩穩，肩膀撞上他的手臂。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '欸欸欸！先看路啦！妳是打算邊走邊跟我吵到馬路中間是不是？' },
      { kind: 'dialogue', speaker: '你', text: '我哪知道它會突然衝出來！你拉那麼大力，我差點跌倒欸！' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '不然我要站在旁邊看妳跟機車打招呼喔？剛剛那個叫緊急救援，還不快謝謝我。' },
      { kind: 'narration', text: '他嘴上講得很欠揍，手卻沒有立刻放開，先低頭確認你有沒有踩到腳。你說沒事，他才鬆開手腕，還故意伸手在你眼前晃了晃，叫你把眼睛帶出門。' },
      { kind: 'dialogue', speaker: '你', text: '你才要把嘴巴帶出門，吵死了！' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '我嘴巴本來就在啊，是妳自己愛聽。走啦，這次換我走外面，免得妳又跟路上的車吵起來。' },
      { kind: 'narration', text: '走到便利商店前，他突然停下來，問你要不要喝點熱的。你說不用，他卻已經推門進去了，出來時手裡多了一罐熱飲，直接塞到你手上。' },
      { kind: 'dialogue', speaker: '你', text: '不是說不用買嗎？' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '我買給自己喝的，剛好拿錯口味。妳不要就還我。' },
      { kind: 'narration', text: '你低頭看了一眼，明明就是你平常會選的口味。他看見你笑，立刻裝作沒看見，轉身往前走，還故意把步子邁得很大。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '快點啦，公車要來了。喝完罐子丟掉，不要拿著一路晃。' },
      { kind: 'narration', text: '到了站牌，他陪你看好車號，嘴上還在提醒你不要坐過站。車來時，他把手插回口袋，朝你揮了揮，最後又補了一句下次看表演記得坐近一點，才看得清楚他有沒有彈錯。' },
    ],
    diarySummary: '瑪莎真的很煩，從酒吧一路講到公車站，連誰彈錯一個音都能被他拿來笑半天。可是機車衝出來時，他抓我抓得比誰都快；後來那罐熱飲又偏偏是我喜歡的口味。明明就記得，還要說自己拿錯，這個人嘴巴到底有多硬。',
  },
  stone: {
    label: '跟石錦航一起走',
    title: '和石錦航走到公車站',
    blocks: [
      { kind: 'narration', text: '石頭走在你身旁，手裡還拿著相機和剛收好的小袋子。酒吧的門在身後闔上，裡面的掌聲和音樂一下子變得很遠。他先問你剛才坐的位置會不會太靠近音箱，又問最後一首是不是聽得很清楚。' },
      { kind: 'dialogue', speaker: '石錦航', text: '剛剛那邊音量有點大，我本來怕妳坐太近會不舒服。耳朵還好嗎？' },
      { kind: 'dialogue', speaker: '你', text: '很好啊！而且你們最後那段吉他真的很好聽。' },
      { kind: 'dialogue', speaker: '石錦航', text: '那就好。最後那段我們有稍微改一下，本來還怕接得不夠順。' },
      { kind: 'narration', text: '你們慢慢沿著騎樓走。他拿出相機給你看剛才拍的幾張照片，裡面有舞台燈光、佑達揮起鼓棒的瞬間，還有溫尚翊低頭彈琴時被燈照亮的側臉。你一張張看得很認真，差點沒注意到前方路面有一塊磚翹了起來。' },
      { kind: 'narration', text: '你腳尖勾到磚角，身體往前一晃。石頭立刻握住你的手腕，另一隻手扶住你的手肘和肩背，把你穩穩帶回騎樓內側。幾乎同一時間，一台機車從路邊擦過去，風把你額前的頭髮吹得亂了一點。' },
      { kind: 'dialogue', speaker: '石錦航', text: '慢一點，這裡地不平。妳有沒有扭到？先站好，不要急著走。' },
      { kind: 'dialogue', speaker: '你', text: '沒有啦，還好你有拉我，不然我真的要跌了。' },
      { kind: 'narration', text: '他低頭看了看你的鞋，又確認你能正常站穩，才慢慢放開手。看見你頭髮被風吹到臉旁，他抬手示意了一下，等你自己撥開後才笑著把相機收好。' },
      { kind: 'dialogue', speaker: '石錦航', text: '這段路晚上比較暗，妳走裡面一點。我拿東西沒關係，慢慢走就好。' },
      { kind: 'narration', text: '你們繼續聊剛才的照片。他說底片還沒洗，等沖出來會挑幾張拍得清楚的給你。你問他會不會把自己也拍進去，他笑著說可能只有一張背影，因為整晚都在忙著看大家有沒有準備好。' },
      { kind: 'dialogue', speaker: '你', text: '那下次你也要拍一張正面的，不然都沒有你的照片。' },
      { kind: 'dialogue', speaker: '石錦航', text: '好啊。下次如果妳還來，我請別人幫忙拍一張大家的合照。' },
      { kind: 'narration', text: '走到公車站時，他先替你看了看站牌，發現車還要等幾分鐘，就陪你站到騎樓比較亮的地方。夜風有點涼，他把手裡多帶的薄外套遞給你，說等車時先披著，車來再還他就好。' },
      { kind: 'dialogue', speaker: '石錦航', text: '今天謝謝妳來。看到台下有人認真聽，我們唱起來也會更開心。' },
      { kind: 'narration', text: '公車進站時，他替你讓開人潮，等你找到座位才往後退。你隔著車窗跟他揮手，他也抬手回應，另一隻手還記得把相機帶子收好。' },
    ],
    diarySummary: '石頭把今晚拍的照片給我看，說底片洗好後會挑幾張送我。路上我差點踩空，他扶住我的手腕和肩背，第一句不是笑我不看路，而是問我有沒有扭到。那種不聲不響、卻總把細節放在心上的溫柔，真的很容易讓人記很久。',
  },
  yanming: {
    label: '跟劉諺明一起走',
    title: '和劉諺明走到公車站',
    blocks: [
      { kind: 'narration', text: '諺明哥陪你離開酒吧時，先把外套往你肩上拉好，才跟著你往公車站的方向走。街上比店裡安靜很多，遠處還聽得到酒吧裡隱約傳出的音樂聲。他沒有催你，只是配合你的步伐，讓你慢慢把剛才的熱鬧收進心裡。' },
      { kind: 'dialogue', speaker: '你', text: '你真的等很久了嗎？怎麼不先進去找我們？' },
      { kind: 'dialogue', speaker: '劉諺明', text: '沒有很久。我看你們還在收東西，就先在外面等。裡面忙，我進去反而會擋到你們。' },
      { kind: 'dialogue', speaker: '你', text: '可是你今天還特地跑來接我耶。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '這麼晚了，知道妳要自己搭車，過來陪妳走一段比較安心。' },
      { kind: 'narration', text: '你把下午在練團室看見的那段鼓又提了一遍，說佑達今晚打得很熱鬧，但你還是覺得諺明哥下午那一段最讓人驚訝。他聽完笑了，說你記得比他自己還清楚。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '那時候是被他們拱上去的啦。很久沒打，手感都快忘了。' },
      { kind: 'dialogue', speaker: '你', text: '才沒有！你一坐上去整個人都不一樣了，超帥的。' },
      { kind: 'narration', text: '他被你說得有點不好意思，低頭笑了一下，沒有急著接話，只問你今天在酒吧有沒有坐到舒服的位置。你說看得很清楚，他才點點頭，像是把這件事也放進心裡記下來。' },
      { kind: 'narration', text: '走到巷口時，旁邊突然有台機車加速轉出來。諺明哥先聽見引擎聲，手掌穩穩握住你的手腕，把你往自己身側帶了一步，另一隻手自然地擋在你前面。機車從你們面前呼嘯而過，他沒有慌張，只先低頭確認你有沒有被嚇到。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '先等一下。這個路口晚上常有車突然轉出來，妳走裡面，我看著外面就好。' },
      { kind: 'dialogue', speaker: '你', text: '我剛剛真的沒注意到，還好你有拉我。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '沒事就好。晚上走路不要只顧著聊天，尤其這種巷口，車子有時候不會先減速。' },
      { kind: 'narration', text: '他確認左右都沒有車，才鬆開你的手腕。之後一路都走在靠馬路的那一側，遇到路口便先停一下看車流。你問他以前是不是常常這樣照顧團員，他笑著說習慣了，大家一忙起來就容易忘記看路。' },
      { kind: 'dialogue', speaker: '你', text: '那我今天也算團員嗎？' },
      { kind: 'dialogue', speaker: '劉諺明', text: '妳今天是最認真的觀眾。下次如果大家還要練，我再通知妳過來聽。' },
      { kind: 'narration', text: '公車站就在前面。他替你確認車號和方向，還看了看時刻表，說下一班很快就到。等車時他沒有一直找話題，只陪你站在路燈下，偶爾接住你想到什麼就冒出來的一句話。那種不急不徐的陪伴，讓夜晚安靜下來也不覺得尷尬。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '車來了。上車小心一點，到了家傳個訊息，讓我知道妳平安到就好。' },
      { kind: 'narration', text: '他等你刷卡、找到座位後才退到站牌旁。你隔著車窗朝他揮手，他也抬起手回應，直到公車轉過街口才離開。' },
    ],
    diarySummary: '諺明哥真的在外面等我，手裡還多帶了一件外套。走在路上，我又忍不住提起下午他坐上鼓椅的樣子；他明明被誇得有點不好意思，還是耐心聽我講完。機車衝出來時，他只是很穩地把我帶到身側，之後一路走在靠馬路的那邊，直到我上車才離開。',
  },
}
