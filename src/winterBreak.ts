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
  { kind: 'narration', text: '晚上八點多，你跟著他們鑽進巷子裡的小酒吧。門才推開，鼓聲、笑鬧聲和碰杯聲就一起湧出來，暖黃燈光底下幾乎每張桌子都坐滿了。有人認出他們，立刻拍桌喊：「欸！今晚是你們喔！」' },
  { kind: 'narration', text: '佑達把鼓棒轉了一圈，瑪莎立刻伸手指著他：「先拿穩，不要還沒開始就掉下來。」阿信在台邊確認歌序，石頭調弦，溫尚翊蹲在音箱旁試最後一個音。幾個人嘴上互虧，手上卻默契得很，三兩下就準備好了。' },
  { kind: 'narration', text: '燈一暗，佑達敲下四拍，溫尚翊的吉他立刻切進來，石頭接上旋律，瑪莎的 Bass 把節奏穩穩托住。阿信走到麥克風前一開口，吧台邊還在聊天的人也轉過了頭。' },
  { kind: 'narration', text: '副歌一到，前排跟著唱，後面有人拍桌打拍子。佑達越打越起勁，瑪莎還趁空檔朝石頭挑眉，石頭回他一個笑，下一段吉他卻接得漂亮得讓人忍不住叫好。你跟著大家拍手，整間小酒吧像被這幾個人的節奏點著了。' },
]

export const winterGigFocusBlocks: Record<WinterCharacterId, WinterStoryBlock[]> = {
  wen: [
    { kind: 'narration', text: '溫尚翊一站到燈下，平常那股愛逞強的神氣就變成了舞台上的自信。他把袖口往上折，吉他背帶斜過肩，前奏一下，手指俐落地跑過琴弦。間奏時他往前踏了一步，台下立刻有人吹口哨。' },
    { kind: 'narration', text: '副歌裡，他和石頭的吉他聲一前一後疊起來。溫尚翊抬眼越過人群，正好和你對上視線；他明明看見你坐在前排，卻只揚了揚嘴角，接著把那段旋律彈得更亮。' },
    { kind: 'dialogue', speaker: '溫尚翊', text: '前面那幾桌很捧場喔！等一下最後幾首不要偷懶，跟著拍手啦。' },
    { kind: 'narration', text: '他說完又往你這邊看了一眼。你大大方方朝他比了個讚，他像是想笑又忍住，轉回去時耳朵似乎紅了一點，手上的節拍卻半點沒亂。' },
  ],
  ashin: [
    { kind: 'narration', text: '阿信握住麥克風，第一句唱出來，吧台邊的談笑聲便慢慢停了。他沒有刻意做什麼，只在副歌時往前一步，朝台下伸出手。前排有人跟著唱，他眼睛彎起來，那個笑一下子把整間店都唱暖了。' },
    { kind: 'narration', text: '唱到第二首，他忽然在人群裡找到你。你跟著節奏輕輕哼，他看見了，唱完那句才低頭笑了一下，像是收到只有你們兩個知道的小小回應。' },
    { kind: 'dialogue', speaker: '陳信宏', text: '剛剛前面有人唱得很認真喔，我有聽見。謝謝妳們一起唱。' },
    { kind: 'narration', text: '你還沒來得及確定他是不是在說你，他已經轉回麥克風前。下一首歌的前奏響起，你卻忍不住跟著他剛才那個笑，也彎起了嘴角。' },
  ],
  masa: [
    { kind: 'narration', text: '瑪莎把 Bass 往身前一掛，剛才還在嘴佑達的人立刻安靜下來。低音一落，整首歌的節奏就被他穩穩抓住；他跟溫尚翊隔著舞台交換一個眼神，下一拍兩個人默契地接上，台下馬上有人喊帥。' },
    { kind: 'narration', text: '他一抬頭就看見你在笑，故意朝你挑眉，手上的旋律卻彈得更俐落。那副「有看到吧」的表情實在太欠揍，你忍不住比了個大拇指，他才滿意地轉回去。' },
    { kind: 'dialogue', speaker: '蔡昇晏', text: '欸，前面那個笑得很開心的，有聽到我的 Bass 吧？不要只顧著看別人喔！' },
    { kind: 'narration', text: '旁邊幾桌笑成一片。他也笑了，還趁換歌時朝你晃了晃琴頭，像是把剛才那句玩笑當成了你們兩個的小暗號。' },
  ],
  stone: [
    { kind: 'narration', text: '石頭站在舞台另一側，沒有刻意往前搶位置，只低著頭把每個和弦接得乾淨又穩。溫尚翊的旋律往上走，他便剛好在下一拍托住，兩把吉他交錯的瞬間，台下有人忍不住叫好。' },
    { kind: 'narration', text: '他抬頭時看見你正專心望著舞台，便朝你笑了一下。後來有客人站起來擋住視線，他往旁邊挪了半步，讓你重新看清楚；那個小動作很輕，卻讓你忽然覺得自己一直有被他留意著。' },
    { kind: 'dialogue', speaker: '石錦航', text: '謝謝大家。希望今天的歌有陪你們度過一個不錯的晚上。' },
    { kind: 'narration', text: '最後一個音收住，他擦了擦額角的汗，又往你這邊看了一眼。你朝他比了個讚，他沒有多說，只回了一個溫柔的笑。' },
  ],
  yanming: [
    { kind: 'narration', text: '諺明哥沒有上台，卻一直留在你的心思裡。下午他被大家拱上鼓椅時，原本還笑著推辭，鼓棒一落下，整個練團室卻立刻安靜了。低音鼓踩得穩，軍鼓和鈸聲一層層推開，幾個小節就把所有人的目光都抓了過去。' },
    { kind: 'narration', text: '佑達在旁邊看得眼睛發亮，瑪莎吹了聲口哨。諺明哥收住最後一下，抬頭時只說「手還記得啦」，額角卻有一點汗。那種平常沉穩、拿起鼓棒又完全不同的樣子，你到現在還記得。' },
    { kind: 'narration', text: '酒吧裡的鼓聲是佑達打的。你看著台上的節奏，卻忍不住想：如果諺明哥也在這裡，聽見大家這樣起鬨，大概又會笑著說你們太誇張了。' },
  ],
}

export const winterBreakGigEndingBlocks: WinterStoryBlock[] = [
  { kind: 'narration', text: '最後一首歌一進副歌，前排立刻跟著唱，佑達把鼓點推得更滿，阿信笑著把麥克風遞向台下。最後一個音落下，掌聲和口哨聲幾乎把小酒吧淹沒。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '欸！剛剛最後那個鼓花有沒有帥？我自己都快被自己帥到了！' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '你先下來啦，等一下真的被自己帥到跌倒，還要我們把你抬出去。' },
  { kind: 'narration', text: '下台後大家手腳俐落地收器材。阿信順手把一瓶水放到你面前，石頭把相機收好，溫尚翊和瑪莎還在為剛才一個小節互相吐槽，佑達則被老闆留下來確認費用和器材清單。' },
  { kind: 'narration', text: '其他人陪你走到門口。門一推開，夜風帶走了酒吧裡的熱氣，街角的機車聲和遠處公車站的燈光一下子清楚起來。剛才台上的熱鬧還留在耳邊，你們卻終於有了可以慢慢說話的時間。' },
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
      { kind: 'narration', text: '阿信拿著那張折過幾次的歌序紙，陪你沿著騎樓慢慢走。酒吧裡的歌聲還沒完全從耳朵裡散去，他先問你剛才有沒有跟著唱，說自己在台上好像聽見前排有個熟悉的聲音。' },
      { kind: 'dialogue', speaker: '你', text: '有啦！可是我怕唱太大聲，旁邊的人會覺得我很吵。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '不會啊，我有聽到。妳唱到副歌的時候，我還有點開心，覺得今天不是只有我們在唱歌。' },
      { kind: 'narration', text: '他把歌序紙攤開給你看，指著其中一首說中間有一小段臨時改過。你低頭看得認真，沒注意到巷口一台機車突然發動，阿信立刻握住你的手腕，把你帶到自己身側。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '小心！先站這邊。' },
      { kind: 'narration', text: '機車擦著騎樓邊緣過去，他的手還握著你的手腕。確認車子走遠，他才慢慢鬆開，低頭看你一眼，語氣比剛才更輕了些。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '有沒有嚇到？剛剛真的差一點。妳不要只顧著看歌單啦，我會擔心欸。' },
      { kind: 'dialogue', speaker: '你', text: '你剛剛拉得好快喔，謝謝你。' },
      { kind: 'narration', text: '他笑了笑，把歌序紙重新折好，卻沒有馬上收回口袋，而是翻到背面，用筆寫下剛才你說喜歡的那一段。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '妳剛剛說這裡最好聽，對不對？我記一下。下次如果有改好，再唱給妳聽。' },
      { kind: 'dialogue', speaker: '你', text: '那我是不是有特別待遇？' },
      { kind: 'dialogue', speaker: '陳信宏', text: '有啊。這個版本先讓妳聽，別人還不知道。' },
      { kind: 'narration', text: '他把那張紙交給你，指尖在你的手上停了一瞬才收回去。到了公車站，他陪你站在路燈下等車，還低聲哼了兩句剛才的旋律。車來時，他替你把紙收進外套口袋，提醒你別弄丟。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '到家跟我說一聲喔。今天妳唱得很好聽，下次也要來。' },
      { kind: 'narration', text: '你上車後回頭看，他還站在原地朝你揮手。公車開出一段距離，你低頭看著那張寫了小字的歌序紙，忽然覺得今晚好像多了一首只屬於你們的歌。' },
    ],
    diarySummary: '阿信把歌序紙背面寫了幾個字，說下次改好要先唱給我聽。機車突然衝出來時，他握住我的手腕把我拉到身邊，還說會擔心我。那句話明明很輕，我卻一路都記得。最讓人心動的是，他說這個版本先讓我聽，別人還不知道。',
  },
  masa: {
    label: '跟瑪莎一起走',
    title: '和瑪莎走到公車站',
    blocks: [
      { kind: 'narration', text: '瑪莎一出酒吧就開始吐槽佑達最後那個鼓花，佑達隔著門回嘴，兩個人隔空吵得像還在台上。你笑到停不下來，他瞥你一眼，忽然把話題轉過來。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '妳笑那麼開心，剛剛到底有沒有聽我的 Bass？還是眼睛整晚都黏在別人身上？' },
      { kind: 'dialogue', speaker: '你', text: '有啦！你彈得很好啊，幹嘛這麼在意我有沒有看到？' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '誰在意了？我只是怕有人只會看熱鬧，聽不懂真正厲害的地方。' },
      { kind: 'narration', text: '他說完故意走快兩步，你追上去時，巷口突然竄出一台機車。瑪莎反手抓住你的手腕，把你往騎樓裡一帶；你撞上他的肩膀，他順勢伸手扶住你。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '欸！跟我講話也要看路吧？妳是想讓我今晚多一個工作，送妳去急診喔？' },
      { kind: 'dialogue', speaker: '你', text: '你才不要烏鴉嘴！而且你抓那麼緊，我手都要被你捏紅了。' },
      { kind: 'narration', text: '他低頭看了一眼，手指立刻鬆開，卻又順手替你把袖口拉好。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '哪有很緊。好啦，現在放開了，妳不要又自己跑去跟車子聊天。' },
      { kind: 'narration', text: '走到便利商店前，他忽然停下來，問你要不要喝熱的。你才說不用，他已經進去；出來時手裡多了一罐你平常愛喝的口味。' },
      { kind: 'dialogue', speaker: '你', text: '你不是說買給自己？怎麼又是我喜歡的口味？' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '店員拿錯啦。妳到底要不要？不要我拿回去。' },
      { kind: 'narration', text: '你故意把飲料抱在胸前不還他。他看見你笑，自己也忍不住笑了，伸手替你把拉環掀開。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '拿好啦，燙。下次來看表演，記得坐前面一點，這樣才看得到我有沒有彈錯。' },
      { kind: 'narration', text: '到了公車站，他陪你看好車號，還故意站在站牌旁不走。你問他不是要回去嗎，他才把手插進口袋，裝作隨意地說等車來再走，免得你又分心。' },
    ],
    diarySummary: '瑪莎一路都在嘴硬，說自己才不在意我有沒有聽他的 Bass，結果連我喜歡的熱飲口味都記得。機車衝出來時，他抓住我的手腕把我拉回來，還順手替我拉好袖口。到了公車站，他又故意說要等車來才走。這個人明明很會照顧人，偏偏每次都要包裝成嫌棄。',
  },
  stone: {
    label: '跟石錦航一起走',
    title: '和石錦航走到公車站',
    blocks: [
      { kind: 'narration', text: '石頭拿著相機陪你走出酒吧，先問你剛才坐的位置會不會太靠近音箱。你說完全沒問題，他才放心地把相機遞過來，讓你看剛才拍下的幾張照片。' },
      { kind: 'dialogue', speaker: '石錦航', text: '這張是妳剛剛在台下笑的時候拍到的。我本來想拍舞台，結果剛好看到妳。' },
      { kind: 'dialogue', speaker: '你', text: '你有拍到我喔？那我有沒有很奇怪？' },
      { kind: 'dialogue', speaker: '石錦航', text: '沒有，很好看啊。妳那時候笑得很開心。' },
      { kind: 'narration', text: '你還想再看一眼，路邊忽然有台機車貼著騎樓轉出來。石頭立刻握住你的手腕，把你帶到裡側，另一隻手護住你的肩。你靠近他時，他先低聲問你有沒有站穩，等車子過去才慢慢放開。' },
      { kind: 'dialogue', speaker: '石錦航', text: '小心一點。剛剛真的很近，還好妳沒有跌倒。' },
      { kind: 'dialogue', speaker: '你', text: '你反應也太快了吧。' },
      { kind: 'narration', text: '他笑了一下，替你把被風吹亂的髮絲指了指，沒有直接碰，只等你自己整理好。接著他把相機拿回去，翻到剛才那張照片，又看了看你。' },
      { kind: 'dialogue', speaker: '石錦航', text: '這張洗出來我想留一份給妳，可以嗎？我自己也想留著。' },
      { kind: 'dialogue', speaker: '你', text: '當然可以啊。那下次也要拍一張我們的合照。' },
      { kind: 'dialogue', speaker: '石錦航', text: '好。下次不用等散場，我們找個光線好一點的地方慢慢拍。' },
      { kind: 'narration', text: '到了公車站，車還要等幾分鐘。他把薄外套遞給你，自己站在迎風的那一側。你問他冷不冷，他只笑著說還好，接著舉起相機，問你要不要趁路燈漂亮再拍一張。' },
      { kind: 'dialogue', speaker: '石錦航', text: '看這邊。嗯，這樣就很好。這張我也想留著。' },
      { kind: 'narration', text: '公車進站時，他替你讓開人潮，等你坐好才退到站牌旁。你隔著車窗揮手，他也抬手回應，手裡還握著那台裝著你照片的相機。' },
    ],
    diarySummary: '石頭說他想把那張我在台下笑的照片留一份給自己，也會洗一張送我。機車衝過來時，他握住我的手腕把我拉到身邊，確認我站穩後才鬆手。後來他又問我下次要不要找個光線好看的地方慢慢拍照。明明話不多，卻每一句都讓人忍不住多想一點。',
  },
  yanming: {
    label: '跟劉諺明一起走',
    title: '和劉諺明走到公車站',
    blocks: [
      { kind: 'narration', text: '諺明哥把外套往你肩上拉好，才陪你往公車站走。街上安靜下來，酒吧的音樂只剩遠遠的一點。他問你今晚看得開不開心，你卻先提起下午他坐上鼓椅的那一段。' },
      { kind: 'dialogue', speaker: '你', text: '我還是覺得你下午打鼓最帥，真的跟平常完全不一樣。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '妳怎麼還記得那幾個小節？我都快忘了。' },
      { kind: 'dialogue', speaker: '你', text: '因為很好看啊。你一拿起鼓棒，大家都安靜了。' },
      { kind: 'narration', text: '他低頭笑了一下，像是不太習慣被你這樣直接稱讚。走到巷口時，一台機車突然加速轉出來，他握住你的手腕，把你穩穩帶到自己身側，另一隻手擋在你前面。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '先等一下。這裡車子轉得急，妳走我裡面。' },
      { kind: 'narration', text: '機車過去後，他沒有立刻放開，先低頭確認你真的沒事，才慢慢鬆手。你抬頭看他，他的語氣仍然平穩，眼神卻比剛才認真。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '剛剛有嚇到嗎？我看到車衝出來，心裡還是緊了一下。' },
      { kind: 'dialogue', speaker: '你', text: '還好有你在。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '嗯。今天就讓我陪妳走這段。' },
      { kind: 'narration', text: '你們繼續往前，他仍走在靠馬路的那一側。你問他是不是每個人晚回家，他都會這樣等；他想了一下，沒有立刻回答，只替你把外套領口往上拉了一點。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '大家我都會照顧。不過今天，我比較想確定妳平安到家。' },
      { kind: 'narration', text: '公車站的燈光就在前面。他替你確認車號，陪你站在站牌下等車。車來時，他沒有催你，只等你上車、找到座位，才朝你點點頭。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '到家傳個訊息給我。下次想聽鼓的話，直接跟我說，我再打給妳聽。' },
      { kind: 'narration', text: '公車開出去時，你回頭看見他還站在原地。路燈落在他的肩上，他抬手跟你揮了揮，直到車子轉過街口才離開。' },
    ],
    diarySummary: '諺明哥真的特地來接我，還把外套往我肩上拉好。機車衝出來時，他握住我的手腕把我帶到身邊，過了好一會兒才鬆開。最讓我心跳亂掉的是，他說大家他都會照顧，但今天比較想確定我平安到家。下次他還答應再打鼓給我聽。',
  },

}
