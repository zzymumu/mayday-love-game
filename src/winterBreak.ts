export type WinterCharacterId = 'wen' | 'masa' | 'ashin' | 'stone' | 'yanming'
export type WinterStoryBlock = { kind: 'narration' | 'dialogue' | 'aside'; text: string; speaker?: string }
export type WinterRoundChoice = {
  text: string
  response: WinterStoryBlock[]
  affection: Partial<Record<WinterCharacterId, number>>
}
export type WinterRound = {
  scene?: string
  sceneBlocks?: WinterStoryBlock[]
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
  { kind: 'narration', text: '幾個人一人一句，諺明哥最後只好笑著搖頭。他把鼓棒在指間轉了半圈，坐到鼓組前，先輕輕敲了幾下確認手感。下一秒，節奏忽然完整地跑起來，低音鼓穩穩踩在拍點上，軍鼓和鈸聲一層一層推開，原本有點散的空氣像被他一下收攏。' },
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
  { kind: 'narration', text: '晚上八點多，你跟著他們拐進巷子裡的小酒吧。門一推開，暖氣和低低的鼓聲一起迎上來，空氣裡混著木頭、音箱熱起來的味道，還有吧台飄來的烤物香。店不大，天花板也低，幾串暖黃燈泡照著小舞台；客人各自聊天，沒有人認出剛走進來的這幾個年輕人。' },
  { kind: 'narration', text: '暖氣開得很足，店裡的人大多只穿著簡單的T恤。佑達一看到鼓組就坐不住，先把鼓棒在掌心敲了兩下；瑪莎抱著Bass試音，石頭低頭調弦，阿信站到麥克風前確認高度。溫尚翊蹲在音箱旁調效果器，幾個人明明還沒正式開始，已經忍不住互相接起旋律。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '今天最後一首我想多加一個鼓花，先說好喔！' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '你先把原本那段打穩啦，不要每次都臨時加戲。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '等一下你就照拍子來，不要自己玩到飛出去。' },
  { kind: 'narration', text: '佑達故意朝瑪莎做了個鬼臉，四個人笑成一團。下一秒燈光暗下來，鼓棒敲出四拍，吉他和Bass幾乎同時落進來。原本還在聊天的客人慢慢轉過頭，有人跟著節奏敲桌，第一首歌才唱到副歌，靠近舞台的幾桌就已經拍起手來。' },
  { kind: 'narration', text: '他們越唱越放得開。阿信唱到熟悉的句子時，台下有人跟著接唱；佑達一看有人注意，鼓打得更起勁，瑪莎嘴上嫌他，手上的低音卻跟得又準又狠。你坐在離舞台不遠的地方，看著平常在練團室鬧成一團的幾個人，忽然覺得他們站在燈下的樣子，真的和平常不太一樣。' },
]

export const winterGigFocusBlocks: Record<WinterCharacterId, WinterStoryBlock[]> = {
  wen: [
    { kind: 'narration', text: '試完音，溫尚翊抬手扯開外套拉鍊，順手把外套搭到音箱上，裡面只剩一件黑色T恤。吉他背帶斜斜穿過肩膀，他低頭轉了最後一下效果器，額前的頭髮垂下來，遮住一點眉眼。' },
    { kind: 'narration', text: '鼓點一下，他整個人像被音樂拽進去。左手沿著琴頸俐落滑過，右手撥弦又快又準；唱到間奏，他往前踏半步，肩膀隨著重拍一沉，燈光擦過他的側臉和手臂。最後一個音拉長，他才抬起眼，視線越過台下的人，正好撞上你的。' },
    { kind: 'narration', text: '你忘了移開目光。他看見了，眉梢輕輕一挑，嘴角藏著一點得意，像是明知道你在看，還偏偏不急著把視線收回去。下一秒他低頭笑了一下，手指重新落回琴弦，接著把整段旋律推得更亮。' },
    { kind: 'dialogue', speaker: '溫尚翊', text: '前面那幾桌，跟上啦！最後這段不要放掉！' },
  ],
  ashin: [
    { kind: 'narration', text: '阿信穿著一件淺色T恤站到麥克風前，先用指尖輕敲兩下麥架，聽見回音合適才抬起頭。暖黃燈光落在他的眉眼，他開口前還帶著一點笑，第一句唱出來時，聲音裡那點微啞卻讓整間店慢慢安靜下來。' },
    { kind: 'narration', text: '唱到副歌，他一手握著麥克風，另一手跟著節拍輕輕抬起；旋律往上走時，他往台前靠近，眼睛微微閉了一瞬，再把尾音穩穩送出去。你跟著唱了幾句，他像是在人群裡聽見你的聲音，目光一下就找到你，唱完那句才朝你彎起眼睛。' },
    { kind: 'dialogue', speaker: '陳信宏', text: '會唱的話，一起唱喔。' },
    { kind: 'narration', text: '他把麥克風往台下遞，前排幾個客人真的跟著唱起來。阿信笑得很開，掌心朝外把下一句交給大家；那一刻，他身上那種溫柔又明亮的勁，讓人很難不一直看著他。' },
  ],
  masa: [
    { kind: 'narration', text: '瑪莎穿著深色T恤，Bass背帶一掛好，就低頭轉了轉琴上的旋鈕。他沒有站到最亮的地方，只把一隻腳往前踩穩，手指搭上琴弦。第一個低音落下，整間小店像跟著震了一下；他抬眼看向鼓組，嘴角掛著那種「這次總算對了吧」的表情。' },
    { kind: 'narration', text: '間奏時，他和溫尚翊隔著舞台交換了一個眼神。下一拍，瑪莎故意把低音往前推，吉他立刻接上來，兩道聲音咬得剛剛好。他的右手連續撥過琴弦，左手沿著琴頸滑了幾格，最後收在乾淨的一記重拍上，俐落得讓人忍不住跟著點頭。' },
    { kind: 'narration', text: '你朝他比了個大拇指。瑪莎看見後眉毛一挑，像是終於等到認證，低頭彈完最後幾個音，才抬起下巴朝你示意了一下。' },
    { kind: 'dialogue', speaker: '蔡昇晏', text: '前面那位，有沒有聽到？這段低音不是裝飾欸。' },
  ],
  stone: [
    { kind: 'narration', text: '石頭穿著灰色T恤站在舞台稍後的位置，沒有刻意往燈下走。他低頭確認最後一個和弦，手指搭上琴弦後，整個人便安靜下來。燈光沿著他的肩線落下，左手在琴頸上移動得又快又準，右手每一下都乾淨俐落。' },
    { kind: 'narration', text: '溫尚翊的旋律往上拉時，石頭沒有急著搶。他留出半拍，聽清楚對方的走向，再用另一條線穩穩接住。兩把吉他交錯的瞬間，他抬起頭，眼神忽然銳利起來，手腕一轉，音符從指尖滑出去，漂亮地收住整段旋律。' },
    { kind: 'narration', text: '最後一個和弦落下，他才像從音樂裡回過神。看見你一直望著他，他先是微微一愣，接著露出很淡的笑；不是做給台下看的，只像在一片吵鬧裡，安安靜靜地和你對上了眼。' },
    { kind: 'dialogue', speaker: '石錦航', text: '謝謝大家，這首歌送給今晚還不想回家的人。' },
  ],
  yanming: [
    { kind: 'narration', text: '諺明哥沒有跟著大家去酒吧。下午在練團室，暖氣開著，他穿著簡單的T恤坐上鼓椅，先在指間轉了半圈鼓棒，才落下第一記。' },
    { kind: 'narration', text: '低音鼓穩穩踩進去，軍鼓和鈸聲一層層推開。他沒有多餘的花招，手腕起落乾淨，肩背隨著節奏微微發力；原本還在鬧的瑪莎和佑達一下安靜了，連你也忘了跟著笑。那幾個小節不像臨時被拱上去，更像他從來沒有離開過鼓組。' },
    { kind: 'narration', text: '最後一下停住，他額角帶著薄汗，抬頭看見你還望著他，便笑著說：「手還記得啦。」佑達在旁邊看得眼睛發亮，瑪莎吹了聲口哨。你卻還記得他剛才握著鼓棒的手，俐落得讓人移不開眼。' },
  ],
}

export const winterBreakGigEndingBlocks: WinterStoryBlock[] = [
  { kind: 'narration', text: '最後一首歌的副歌一進來，前排幾個客人就跟著唱。佑達打到最後一段，真的把那個新鼓花塞了進去；瑪莎立刻回頭瞪他，手上的Bass卻半點沒慢。阿信把麥克風往台下遞，溫尚翊和石頭同時接上最後一段吉他，整間店的掌聲跟著最後一個音一起炸開。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '欸！剛剛那個鼓花有沒有帥？我就說可以加吧！' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '帥是帥啦，下次先講，不要每次都讓我猜你的下一拍。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '你們兩個先不要吵，剛剛最後那一下明明是我接得最好。' },
  { kind: 'narration', text: '阿信笑到彎下腰，石頭一邊收導線一邊替佑達把滾到舞台邊的鼓棒撿回來。老闆走過來稱讚今晚唱得好，問他們下次什麼時候再來，顯然只是把他們當成一群很有趣的年輕樂手，沒有認出任何人。' },
  { kind: 'narration', text: '你走到門口時，還聽見瑪莎在裡面嫌溫尚翊把效果器線纏成一團。外頭的冷風從門縫鑽進來，和酒吧裡的暖意撞在一起；你回頭看了一眼，小舞台上的燈還亮著，幾個人笑鬧的聲音也跟著傳出來。' },
  { kind: 'narration', text: '佑達被老闆留下來核對器材和費用，說弄好就會追上你們。阿信、石頭、瑪莎和溫尚翊則先後走到騎樓下，還在為最後那個鼓花爭論，誰也不肯先認輸。' },
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
        scene: '你側過頭看他，忍不住又想起剛才那段吉他。溫尚翊察覺你的視線，抬手撥了一下額前被汗弄亂的頭髮，故意裝得很隨意，還把背帶往肩上拉正了一點。',
        promptSpeaker: '溫尚翊',
        prompt: '妳剛剛一直看我幹嘛？有哪裡彈錯喔？',
        choices: [
          { text: '因為你彈得真的超帥啊，這還要問？', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '……妳今天講話怎麼這麼直接啦。' }, { kind: 'narration', text: '他嘴上嫌你，嘴角卻怎麼也壓不下去，還故意把背帶往肩上拉正，像是突然又想起自己剛才在台上的樣子。' }], affection: { wen: 3 } },
          { text: '我在確認團長有沒有失誤，責任重大欸。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '拜託，妳也太嚴格了吧！我哪有失誤。' }, { kind: 'narration', text: '他伸手用手背輕輕碰了碰你的手臂，像要你把剛才那句收回去，自己卻先笑了。' }], affection: { wen: 2 } },
          { text: '我在看你是不是只看我這邊，結果真的有欸。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '蛤？妳哪有證據啦。' }, { kind: 'narration', text: '他立刻轉頭看向前方，耳朵卻慢慢紅起來。走了兩步，又忍不住補一句：「我只是剛好看那邊啦。」' }], affection: { wen: 3 } },
        ],
      },
      {
        sceneBlocks: [
          { kind: 'narration', text: '你們正說著話，巷口忽然傳來一陣刺耳的引擎聲。一台機車從路邊斜斜竄出來，車頭幾乎擦過你的身側。你還沒反應過來，溫尚翊已經一把扣住你的手腕，另一隻手直接攬過你的背，把你整個人往自己懷裡帶。你踩到凸起的磚角，腳步一亂，額頭和肩膀一下撞進他的胸口。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '幹你娘咧！騎車不看路喔？衝三小啦！靠北喔，差點撞到人欸！' },
          { kind: 'narration', text: '他是朝著機車遠去的方向吼的，聲音又急又兇，連巷口的人都回頭看了一眼。車子轉過街角，他還盯著那個方向，胸口起伏得很明顯，像是氣到想追上去理論。可他的手臂始終沒有鬆開，掌心還牢牢護在你的背後。' },
          { kind: 'narration', text: '機車騎遠了，他還瞪著巷口罵了兩句，直到低頭想確認你有沒有受傷，才發現你整個人還被他圈在懷裡。你的手指抓著他的T恤，臉頰離他的胸口近得不得了；他看見你紅透的臉，像突然被什麼燙到似的，手臂一下僵住。' },
          { kind: 'narration', text: '「欸……」他慌忙把手鬆開，往後退了半步，手掌在半空中停了一下，像是不知道該往哪裡放。可他根本沒心思管自己有多尷尬，視線立刻又落回你身上，從你的肩膀、手腕一路看到膝蓋，眉頭皺得緊緊的。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '妳有沒有怎樣？剛剛有沒有撞到？手給我看一下……啊，不是，我是說，妳哪裡痛就講喔。' },
        ],
        promptSpeaker: '溫尚翊',
        prompt: '真的沒事嗎？妳不要嚇我欸。',
        choices: [
          { text: '我沒事啦，真的沒有撞到。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '最好是喔，剛剛差一點就撞上了欸。' }, { kind: 'narration', text: '他像是還不放心，抬起手想確認你的肩膀，伸到一半又停住，最後只好仔細看了看你有沒有站穩。' }, { kind: 'dialogue', speaker: '溫尚翊', text: '腳有沒有扭到？走兩步給我看一下。' }], affection: { wen: 3 } },
          { text: '你剛剛罵人的時候好兇喔……', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '那台車差點撞到妳欸！我不罵他，難道還要跟他說謝謝喔？' }, { kind: 'narration', text: '他說得還是很快，眉頭也沒鬆開，卻發現你被他的聲音嚇得眨了眨眼，立刻把音量降下來。' }, { kind: 'dialogue', speaker: '溫尚翊', text: '好啦，我不是在兇妳。先跟我說有沒有受傷。' }], affection: { wen: 3 } },
          { text: '你剛剛是不是也嚇到了？手都不知道往哪裡放了。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '哪有！我是怕妳跌倒好不好。' }, { kind: 'narration', text: '他立刻把手插進口袋，視線卻還是黏在你身上。過了兩秒，又忍不住伸出來指了指你的膝蓋。' }, { kind: 'dialogue', speaker: '溫尚翊', text: '真的沒事就好……下次走裡面一點啦。' }], affection: { wen: 4 } },
        ],
      },
      {
        scene: '走過剛才那段路後，他沒有再跟你隔著半步，而是自然地走在你旁邊。公車站的燈箱已經看得見了，你們卻都走得比剛才慢。溫尚翊把效果器袋放到腳邊，抬頭看了一眼時刻表，說下一班還要等幾分鐘。你們便站在站牌旁，聽著遠處車聲，繼續聊剛才那首歌。',
        promptSpeaker: '溫尚翊',
        prompt: '下次我把那段重新彈給妳聽啦。妳還要坐第一排喔？',
        choices: [
          { text: '當然！而且你要記得一抬頭就看到我。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '要求很多欸……好啦，我會留意。' }, { kind: 'narration', text: '他說完低頭踢了踢站牌旁的小石子，過一會兒又問你下次哪天有空，像是怕你沒聽清楚似的。' }], affection: { wen: 3 } },
          { text: '那要看你表現，今天先給你九十分。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '九十分？我今天至少九十九吧！' }, { kind: 'narration', text: '他不服氣地跟你爭了起來，連下一班公車亮起車頭燈都沒注意，直到你提醒，他才趕緊把袋子拎起來。' }], affection: { wen: 2 } },
          { text: '如果你願意教我彈那段，我就再來。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '可以啊，這有什麼難的。妳不要學兩下就說手痠喔。' }, { kind: 'narration', text: '他笑著替你指了指琴弦的位置，說下次慢慢教。公車進站時，他還不忘提醒你上車小心，別又踩到奇怪的地方。' }], affection: { wen: 3 } },
        ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '公車的車燈從街口轉進來，溫尚翊先看了一眼車牌，又伸手替你把背包肩帶拉正。他站在靠近車門的地方，等車停穩才示意你先上。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '上車裡面找個位置坐。到家傳訊息給我，還有，剛剛那件事不准回去跟瑪莎講。' },
      { kind: 'dialogue', speaker: '你', text: '為什麼？他知道了又會怎樣？' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '沒有為什麼啦！' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '快上車！' },
    ],
    diarySummary: '溫尚翊一路都在嘴硬，明明在台上看見我，走下台又不肯承認。巷口那台機車突然衝出來時，他一把把我拉進懷裡，還對著騎士用台語髒話破口大罵。等他低頭發現我還靠在他胸前、整張臉都紅了，自己也跟著不自在起來。到了公車站，他還叮嚀我到家要傳訊息，最後又急著叫我快上車。這個人真的很會裝沒事。',
  },
  ashin: {
    label: '跟陳信宏一起走',
    title: '和陳信宏走到公車站',
    blocks: [
      { kind: 'narration', text: '阿信把麥克風線交回店裡，拿起搭在椅背上的外套，等你一起走出酒吧。門一關，裡面的熱鬧聲就被留在身後。他走在靠馬路的那一側，手裡轉著剛才沒喝完的水，聽你提起台上幾個人鬧成一團的樣子，忍不住笑了。' },
      { kind: 'narration', text: '你們沿著騎樓慢慢走。剛才在台上那個總能接住大家玩笑的人，現在說話反而有點孩子氣。' },
    ],
    rounds: [
      {
        scene: '阿信想起最後一首歌前，瑪莎和佑達又為了一個小地方鬥嘴，自己站在旁邊差點笑到接不上話。他說到一半又笑了，還模仿了瑪莎剛才那個不服氣的表情，模仿得不像，倒把自己逗得先笑出聲。',
        promptSpeaker: '陳信宏',
        prompt: '妳覺得剛才誰最誇張？瑪莎還是佑達？',
        choices: [
          { text: '瑪莎啊，嘴上嫌棄，結果每次都配合得最好。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '對啊，他每次都這樣，明明很在意還要裝作沒差。' }, { kind: 'narration', text: '阿信笑著點頭，還補了一句瑪莎剛才瞪人的樣子，說完又自己笑了起來。' }], affection: { ashin: 3 } },
          { text: '佑達吧，他一被吐槽就故意打得更大聲。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '哈哈，他就是故意的啦，越有人叫他不要加，他越想加。' }, { kind: 'narration', text: '他學著佑達剛才得意的樣子抬了抬下巴，你笑出聲，他也跟著笑，走路的步子都亂了半拍。' }], affection: { ashin: 3 } },
          { text: '你啊，你明明也在旁邊偷笑，還裝得很正經。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '我哪有！……好啦，有一點。' }, { kind: 'narration', text: '他被你抓包，抬手摸了摸鼻子，笑得有點不好意思，倒也沒有再替自己辯解。' }], affection: { ashin: 4 } },
        ],
      },
      {
        sceneBlocks: [
          { kind: 'narration', text: '走到騎樓比較窄的地方，身後忽然傳來機車催油門的聲音。阿信回頭時，車子已經貼著路邊衝過來。他立刻伸手拉住你的前臂，把你往店家門邊帶，自己也跟著跨到外側擋了一下。你被他拉得踉蹌半步，他趕緊扶住你，等車子擦身過去才慢慢鬆開手。' },
          { kind: 'narration', text: '車子擦身過去，他的手還扶著你的前臂，等你站穩才慢慢鬆開。阿信低頭看了看你的手腕和膝蓋，眉頭一直皺著，像是先確認你真的沒事，才想得起自己也被嚇了一跳。' },
        ],
        promptSpeaker: '陳信宏',
        prompt: '有沒有撞到？手腕會不會痛？',
        choices: [
          { text: '我沒事啦，你剛剛也差點跌倒。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '我還好，妳沒事比較重要。' }, { kind: 'narration', text: '他聽你這麼說，這才露出一點笑意，卻仍陪你在原地緩了緩，沒有急著往前走。' }], affection: { ashin: 3 } },
          { text: '你剛剛反應好快，我都還沒看清楚。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '我也是聽到聲音才回頭，真的差一點。' }, { kind: 'narration', text: '他說完笑了一下，像是想把剛才的緊張帶過去，卻還是忍不住又看了看你有沒有擦傷。' }], affection: { ashin: 3 } },
          { text: '我剛剛真的嚇了一跳，差點以為要撞上了。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '先在這裡站一下，等車真的走遠再走。' }, { kind: 'narration', text: '他沒有急著安慰你，只陪你站在鐵門旁，等路口恢復安靜，才問你要不要繼續走。' }], affection: { ashin: 4 } },
        ],
      },
      {
        scene: '到了公車站，你們在站牌旁停下來。剛才那一下過去後，阿信安靜了一會兒，才說自己剛剛其實也有點慌，腦袋一瞬間空白，只記得先把你拉開。他講得有點不好意思，還特地補了一句，平常不是這麼容易被嚇到的。',
        promptSpeaker: '陳信宏',
        prompt: '我剛剛是不是有點狼狽？本來想說點什麼，結果腦袋完全空掉。',
        choices: [
          { text: '不會啊，我覺得你剛剛很可靠。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '真的嗎？那我就放心一點了。' }, { kind: 'narration', text: '他聽完笑了，肩膀終於放鬆下來，還小聲說幸好你沒有受傷。' }], affection: { ashin: 4 } },
          { text: '你剛剛只顧著拉我，連自己都差點跌倒。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '那時候哪有時間想那麼多，先把妳拉開再說啊。' }, { kind: 'narration', text: '他說得很自然，過了一會兒才像想到什麼似的笑起來，承認自己現在回想還有點腿軟。' }], affection: { ashin: 3 } },
          { text: '那你也要看路，不要只顧著我。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '好，我會注意。妳也一樣，不要走路走到分心。' }, { kind: 'narration', text: '他說完往旁邊讓了讓，替你留出靠店家那側的位置，這才重新跟你並肩往站牌走。' }], affection: { ashin: 4 } },
        ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '公車轉進街口，阿信先看了一眼車牌，等車停穩才示意你上車。他站在車門旁，直到你刷卡走進車廂，才往後退了一步。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '到家傳個訊息給我，讓我知道妳平安到了。' },
      { kind: 'dialogue', speaker: '你', text: '好啦，你也早點回去休息。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '好，路上小心。下次見。' },
    ],
    diarySummary: '阿信陪我走到公車站，一路聊著瑪莎和佑達剛才在台上鬥嘴的事。他模仿瑪莎的表情，自己先笑到停不下來。機車突然衝過來時，他反射性地擋到我前面，把我拉到店門邊，還差點害自己踩空。到了站牌，他才承認剛剛其實也嚇到了，說自己腦袋一片空白。看他終於放鬆下來，我也跟著安心了。',
  },
  masa: {
    label: '跟瑪莎一起走',
    title: '和瑪莎走到公車站',
    blocks: [
      { kind: 'narration', text: '瑪莎一走出酒吧就開始評論今晚的演出，先嫌佑達最後那個鼓花太多，再說怪獸有一段吉他差點把他帶偏。你替大家辯護，他立刻轉過頭來，手裡還比著剛才 Bass 的節奏，嘴上嫌你沒聽懂，腳步卻一直配合著你。' },
      { kind: 'narration', text: '他把琴袋往肩上甩了甩，走沒幾步又停下來，非要把副歌前那段低音重新比給你看。你明明已經說聽懂了，他還是不肯放過，像是今晚沒得到你的認證就不算正式散場。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '妳剛剛到底有沒有認真聽？我那段低音才是整首歌的靈魂欸。' },
    ],
    rounds: [
      {
        scene: '你們沿著騎樓往前走，瑪莎嘴上還在嫌東嫌西，卻一直等你回嘴。他把琴袋往肩上甩了甩，忽然想起剛才副歌前的那一段，手指在空中比出進拍的位置，還故意停下來等你跟著比。',
        promptSpeaker: '蔡昇晏',
        prompt: '剛剛副歌那段，我跟怪獸互相接的地方，妳有沒有聽出來？',
        choices: [
          { text: '有啊，你故意晚半拍再進來那一下超帥。', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '喔，原來妳有聽懂。怪獸那個眼神一過來，我就知道要接了。' }, { kind: 'narration', text: '他嘴上裝得很平常，嘴角卻明顯翹了起來，還故意把剛才那個節奏又比了一次給你看。' }], affection: { masa: 3 } },
          { text: '我只聽到你在台上一直跟佑達較勁。', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '那叫互相激勵好不好！他每次都想多塞一個鼓花，我不盯著怎麼行。' }, { kind: 'narration', text: '他說得理直氣壯，走了兩步又回頭看你有沒有跟上，像是怕你真的把他的部分全忘了。' }], affection: { masa: 2 } },
          { text: '我其實一直在看你的手，根本沒空數拍子。', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '……妳講這個是要我怎麼彈啦？' }, { kind: 'narration', text: '他難得卡了一下，立刻把視線轉去看路邊，過了幾秒才又補一句：「反正妳有看到就好。」' }], affection: { masa: 3 } },
        ],
      },
      {
        sceneBlocks: [
          { kind: 'narration', text: '你們走到巷口，一台機車突然從停車格旁倒車衝出來。瑪莎先聽見引擎聲，反手抓住你背包的肩帶往後一扯，自己也往前跨了一步，讓車頭從你面前擦過去。你被他拉得踉蹌半步，琴袋撞在他的腿側，他立刻伸手扶住你的手臂。' },
          { kind: 'dialogue', speaker: '蔡昇晏', text: '欸！看路啦！這裡有人耶！騎那麼快是趕著投胎喔？' },
          { kind: 'narration', text: '車子騎遠後，他還瞪著那個方向，嘴裡嘖了一聲。接著他低頭看你，先把你的背包肩帶拉回正確的位置，又檢查有沒有被車鏡勾到，像是非要找出一點問題才肯放過自己。' },
        ],
        promptSpeaker: '蔡昇晏',
        prompt: '妳有沒有怎樣？剛剛差一點就撞到了欸！',
        choices: [
          { text: '你剛剛拉我那一下，我差點以為自己要被你扛走。', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '不然咧？妳要我站著看妳被撞喔？' }, { kind: 'narration', text: '他嘴上兇巴巴，手卻還扶著你的手臂，直到你站穩才放開，接著又低聲補了一句：「下次走路靠裡面一點啦。」' }], affection: { masa: 3 } },
          { text: '你手還抓著欸，是不是不想放？', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '蛤？我是在確認妳有沒有站穩，妳少亂講。' }, { kind: 'narration', text: '他這才像被提醒似的鬆開手，卻沒有往前走，反而站在你旁邊等你先笑夠。' }], affection: { masa: 3 } },
          { text: '我沒事啦，倒是你臉色怎麼比我還難看？', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '廢話，差點撞到人欸！妳以為我會很開心喔？' }, { kind: 'narration', text: '他瞪了你一眼，接著把你往騎樓裡側帶，自己走到靠近車道的那一邊。' }], affection: { masa: 2 } },
        ],
      },
      {
        scene: '公車站就在前面。瑪莎把琴袋靠在柱子邊，手指在欄杆上敲了兩遍剛才的節拍，故意停在最後一拍等你接。這次你沒有慢半拍，他立刻露出「我就知道」的表情，還把手掌伸過來要跟你擊掌。遠處的車燈還沒出現，他便順勢把話題拉回剛才那段音樂。',
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
    diarySummary: '瑪莎一路都在嫌東嫌西，還硬要我承認他那段 Bass 很帥。巷口機車突然衝出來時，他一把扯住我的背包肩帶把我拉開，還當場罵對方騎車不看路。嘴上兇得要命，卻連我的背包有沒有被車鏡勾到都檢查了一遍。到了公車站，他又主動約我下次去練團，還把它說得像一場比賽。這個人真的很會把關心講得像在找架吵。',
  },
  stone: {
    label: '跟石錦航一起走',
    title: '和石錦航走到公車站',
    blocks: [
      { kind: 'narration', text: '石頭把最後一條導線交給店裡的人，走出門時先回頭確認沒有東西遺漏。你們沿著比較安靜的那側騎樓往公車站走，酒吧裡的音樂聲漸漸遠去，夜風把剛才舞台上的熱度慢慢吹散。' },
      { kind: 'narration', text: '他沒有急著找話題，只配合你的步伐走在旁邊。走到路燈下時，他才提起剛才那段兩把吉他交錯的地方，說其中有一個音其實是臨時改的，還問你有沒有聽出來。' },
      { kind: 'dialogue', speaker: '石錦航', text: '剛剛那段兩把吉他交錯的地方，妳有聽清楚嗎？' },
    ],
    rounds: [
      {
        scene: '剛才那段吉他的話題說完後，石頭沒有再繼續解釋。他走了一小段，才發現你一直看著他。路燈下，他抬眼和你對上視線，像是把這件事放在心裡一會兒了，終於還是問了出口。',
        promptSpeaker: '石錦航',
        prompt: '妳剛才是不是一直看我這邊？我有幾次抬頭，都剛好看到妳。',
        choices: [
          { text: '因為你彈吉他的時候很專注，我就忍不住一直看。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '是喔？我還以為妳在看別的地方。' }, { kind: 'narration', text: '他笑得很淺，視線落回前方，卻沒有掩飾聽見這句話後的開心。' }], affection: { stone: 3 } },
          { text: '你每次抬頭，我們都剛好對到眼啊。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '那可能不是剛好。' }, { kind: 'narration', text: '他說完才像意識到自己講得太直接，輕輕咳了一聲，把目光轉向路口。' }], affection: { stone: 4 } },
          { text: '我在看你會不會發現，結果真的被你抓到了。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '原來妳是故意的喔。' }, { kind: 'narration', text: '他忍不住笑了，沒有再追問，只把步伐放慢，和你並肩走在路燈下。' }], affection: { stone: 3 } },
        ],
      },
      {
        sceneBlocks: [
          { kind: 'narration', text: '你們走到騎樓轉角，一台機車忽然從巷子裡斜斜衝出來。石頭聽見引擎聲，幾乎是反射地攬住你的肩背，把你往店家騎樓裡帶，自己側身擋在外面。車頭從他身前掠過，琴袋撞上他的腿，他也沒低頭看，只先確認你已經退到安全的位置。' },
          { kind: 'narration', text: '車子騎遠後，他仍扶著你的手臂，低頭看了看你的神情。見你還有點愣，他沒有催你往前，也沒有急著追問，只把聲音放輕，陪你在騎樓裡緩一緩。' },
        ],
        promptSpeaker: '石錦航',
        prompt: '有沒有嚇到？要不要先在這裡站一下？',
        choices: [
          { text: '我沒事啦，你剛剛反應好快。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '妳沒事就好，剛才真的很突然。' }, { kind: 'narration', text: '他這才稍微放鬆，手卻還停在你手臂旁邊，等你自己站穩後才收回去。' }], affection: { stone: 4 } },
          { text: '你剛才是不是也嚇到了？', response: [{ kind: 'dialogue', speaker: '石錦航', text: '嗯，有一點。車子突然衝出來，我也來不及多想。' }, { kind: 'narration', text: '他低頭看了看被琴袋撞到的腿，這時才像感覺到疼似的皺了下眉，卻先問你要不要繼續走。' }, { kind: 'dialogue', speaker: '石錦航', text: '如果還沒緩過來，我們就再站一下。' }], affection: { stone: 4 } },
          { text: '我剛剛有點腿軟，可以陪我站一下嗎？', response: [{ kind: 'dialogue', speaker: '石錦航', text: '好啊，不急，我陪妳。' }, { kind: 'narration', text: '他把琴袋放到牆邊，站在你旁邊等了一會兒，沒有一直問東問西，只在你抬頭時回你一個安定的笑。' }], affection: { stone: 4 } },
        ],
      },
      {
        scene: '公車站旁邊有一排長椅，石頭問你要不要坐一下。他把琴袋輕輕放在腳邊，沒有急著看時刻表，反而用指尖在膝上敲出剛才那段旋律的節奏。這次沒有其他樂器的聲音，你聽得見每一下停頓，也看得出他其實還在回想剛才那個轉角。',
        promptSpeaker: '石錦航',
        prompt: '剛才那段旋律，我回去想再整理一個版本。妳願不願意當第一個聽的人？',
        choices: [
          { text: '可以啊，但你要讓我坐在旁邊聽。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '好，我會把旁邊的位置留給妳。' }, { kind: 'narration', text: '他答應得很輕，卻把這句話記得很認真，還開始跟你說那段旋律哪裡想再改得柔和一點。' }], affection: { stone: 4 } },
          { text: '那你不可以偷偷先給別人聽。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '好，先給妳聽。等妳聽完，我再決定要不要改。' }, { kind: 'narration', text: '他笑著低頭，把那段旋律又在膝上敲了一遍，像是已經在心裡替你留了一個位置。' }], affection: { stone: 4 } },
          { text: '你可以把剛才那段教我嗎？我想知道你怎麼想的。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '可以啊。我慢慢講，妳不用急著一次聽懂。' }, { kind: 'narration', text: '他把琴袋往旁邊挪了一點，坐到長椅另一端，開始用很慢的速度把那幾個音拆開給你聽。' }], affection: { stone: 3 } },
        ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '公車進站前，石頭先站起來，把長椅旁邊你的包包遞給你，還提醒你小心車門的階梯。他沒有催你，只等你站穩後才往後退了一步。' },
      { kind: 'dialogue', speaker: '石錦航', text: '到家跟我們說一聲。剛剛那件事如果回去還覺得不舒服，也要跟我說。' },
      { kind: 'dialogue', speaker: '你', text: '知道啦，你也要小心回去。' },
      { kind: 'dialogue', speaker: '石錦航', text: '嗯，妳先上車。路上小心。' },
    ],
    diarySummary: '石頭一路都很安靜，卻記得我在台下看他的時候。聊完剛才兩把吉他交錯的地方，他才發現我一直看著他，還直接問了出來。機車突然衝出來時，他先攬住我的肩背，把我帶進騎樓裡，自己擋在外側。看我還有點愣，他沒有急著問東問西，只陪我站了一會兒，等我緩過來才繼續走。到了公車站，他說想把剛才那段旋律整理成另一個版本，問我願不願意當第一個聽的人。很多心意都藏在很小的動作裡。',
  },
  yanming: {
    label: '跟劉諺明一起走',
    title: '和劉諺明走到公車站',
    blocks: [
      { kind: 'narration', text: '諺明哥站在酒吧外的騎樓下等你，手裡拿著一件多帶來的外套。看見你出來，他先把外套遞過來，確認你穿好後才陪你往公車站走。街上比店裡安靜很多，遠處偶爾有車燈從路口掠過。' },
      { kind: 'narration', text: '他沒有急著問演出好不好看，而是先確認你有沒有帶齊東西。等你把包包背好，他才笑著說，剛才站在外面等的時候，隔著門都聽得出來裡面玩得很開心。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '今天辛苦了。剛才看妳們收得差不多，我才傳訊息給妳。' },
    ],
    rounds: [
      {
        scene: '你提起下午在練團室看他打鼓的事。諺明哥聽完笑了一下，像是還有點不好意思，卻沒有否認自己剛才確實玩得很開心。他把外套領口替你順好，才繼續往前走，還記得提醒你不要踩到騎樓邊緣翹起來的地磚。',
        promptSpeaker: '劉諺明',
        prompt: '下午我打鼓的時候，妳是不是一直看著？我還以為妳覺得太吵了。',
        choices: [
          { text: '我是真的看得入迷，跟平常照顧大家的你完全不一樣。', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '原來妳是這樣想的。那我還滿高興的。' }, { kind: 'narration', text: '他低頭笑了笑，手指不自覺地在外套口袋邊敲了兩下，像是又想起下午那幾個小節。' }], affection: { yanming: 3 } },
          { text: '你一坐上鼓椅，整個人都變了，真的很帥。', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '哈哈，妳講得太直接了啦。只是以前練過，手還記得。' }, { kind: 'narration', text: '他難得有點不好意思，抬手摸了摸後頸，卻沒有把你的稱讚推回去。' }], affection: { yanming: 3 } },
          { text: '我還想說你要是再打下去，我可能會一直看下去。', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '那我下次就不客氣了，找時間再打給妳看。' }, { kind: 'narration', text: '他看了你一眼，笑意比剛才更明顯，像是把「下次」這件事認真記了下來。' }], affection: { yanming: 3 } },
        ],
      },
      {
        sceneBlocks: [
          { kind: 'narration', text: '走到路口時，一台機車忽然從停車格旁竄出來，速度快得讓人來不及反應。諺明哥先聽見引擎聲，立刻低聲提醒你「先站住」，手掌穩穩扶住你的上臂，把你帶到騎樓柱子後面。他自己往外側跨了一步，先擋住車子可能經過的方向，等機車完全騎遠才回頭。' },
          { kind: 'narration', text: '他沒有急著拉著你繼續走，而是先看了一眼路口兩邊，確認沒有第二台車跟上來，才低頭檢查你剛才踩地的腳步。那份冷靜不是不緊張，而是他先把眼前的狀況處理好，才讓自己有空擔心你。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '先不要急著走，等車都過去再說。' },
        ],
        promptSpeaker: '劉諺明',
        prompt: '腳有沒有踩穩？剛剛那一下有沒有扭到？',
        choices: [
          { text: '沒有啦，你剛剛第一句居然是叫我先站住。', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '因為那個路口視線不好，我怕後面還有車。' }, { kind: 'narration', text: '他說完又往路口看了一眼，等確定車流空下來，才帶你繼續走。' }, { kind: 'dialogue', speaker: '劉諺明', text: '現在可以走了，妳跟著我，不用趕。' }], affection: { yanming: 3 } },
          { text: '你是不是早就注意到那台車了？', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '有聽到引擎聲，不過它突然從停車格出來，還是很危險。' }, { kind: 'narration', text: '他把你帶到騎樓裡面，自己重新站回靠車道的一側，確認你走路沒有不舒服。' }, { kind: 'dialogue', speaker: '劉諺明', text: '接下來我走外面，妳走裡面就好。' }], affection: { yanming: 4 } },
          { text: '我沒事，你怎麼一直盯著路口看？', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '先把妳安全送到公車站，其他的等一下再說。' }, { kind: 'narration', text: '他回答得很平穩，卻一路等到下一個路口的車都停了，才示意你跟他一起走過去。' }], affection: { yanming: 3 } },
        ],
      },
      {
        scene: '公車站的燈光落在路面上，下一班車還有幾分鐘。諺明哥陪你站在站牌旁，從外套口袋拿出一張折得整整齊齊的紙，在背面畫了幾個簡單的拍點。他沒有把它寫得很複雜，只標出最基本的四拍，還在旁邊註記哪裡要停一下。',
        promptSpeaker: '劉諺明',
        prompt: '如果妳下次還來練團室，我可以先教妳最基本的節拍。妳想試試看嗎？',
        choices: [
          { text: '好啊，但你要有耐心，不可以笑我。', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '當然不會。第一次本來就要慢慢來。' }, { kind: 'narration', text: '他把那張紙交給你，還特地把容易弄混的地方圈起來，說下次可以照著這張先練。' }], affection: { yanming: 4 } },
          { text: '那你要先幫我準備一副鼓棒。', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '好，這件事我記下來。下次妳來之前，我先找一副適合妳的。' }, { kind: 'narration', text: '他把紙重新摺好，放進你的包包外層，還提醒你不要弄丟，像是真的已經在安排下一次見面。' }], affection: { yanming: 4 } },
          { text: '我怕自己跟不上你們的速度欸。', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '不用一開始就跟上大家，先把自己的拍子打穩就好。' }, { kind: 'narration', text: '他用指尖在站牌邊緣敲出很慢的四拍，等你跟著敲對了，才笑著點點頭。' }], affection: { yanming: 3 } },
        ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '公車轉進街口時，諺明哥先把你的包包遞回來，又確認外套有沒有穿好。他陪你走到車門旁，等你站穩才把手收回去。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '到家傳個訊息。今天很晚了，回去就早點休息。' },
      { kind: 'dialogue', speaker: '你', text: '知道啦，今天謝謝你特地過來。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '不客氣。下次來練團室，記得先跟我說，我把鼓棒準備好。' },
    ],
    diarySummary: '諺明哥真的來酒吧外面接我，還特地多帶了一件外套。路上他問我下午看他打鼓的感想，聽見我說他坐上鼓椅時很帥，難得有點不好意思。機車突然竄出來時，他先叫我站住，再確認路口安全、把我帶到騎樓裡，沒有慌張地拉著我亂跑。到了公車站，他還拿紙畫了幾個基本拍點，說下次要慢慢教我。那種不急不徐、先把事情安排好的照顧，讓人很安心。',
  },

}

