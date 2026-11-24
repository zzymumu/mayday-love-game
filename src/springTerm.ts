export type SpringCharacterId = 'wen' | 'ashin' | 'masa' | 'stone' | 'yanming'
export type SpringBlock = { kind: 'narration' | 'dialogue' | 'aside'; speaker?: string; text: string }
export type SpringChoice = { text: string; response: string; affection: number }
export type SpringRoute = { title: string; blocks: SpringBlock[]; prompt: string; choices: SpringChoice[] }
export type SpringInviteChoice = { text: string; response: string[]; affection: number; accepted?: boolean }
export type SpringInviteRound = { incoming: string[]; choices: SpringInviteChoice[] }
export type SpringSmsChoice = { text: string; response: string[]; affection: number; nextIncoming?: string }
export type SpringSmsRound = { incoming: string; choices: SpringSmsChoice[] }
export type SpringDayContext = {
  storeCharacter: SpringCharacterId | null
  afterChoice: 'yanming-dinner' | 'lesson' | null
  lessonCharacter: Exclude<SpringCharacterId, 'yanming'> | null
  dinnerChoice: number | null
}

export const SPRING_INVITE_THRESHOLD = 60
export const springCharacterOrder: SpringCharacterId[] = ['wen', 'ashin', 'masa', 'stone', 'yanming']

export const springInvites: Record<SpringCharacterId, string[]> = {
  wen: ['欸，妳今天下課了嗎？', '我等一下想去樂器行看個效果器。', '要不要一起去？'],
  ashin: ['欸～妳今天有空嗎？', '我想去樂器行看看木吉他，順便試幾把。', '妳要不要一起來？'],
  masa: ['欸，我等一下要去樂器行。', '有東西要買，順便幫我看看哪個比較划算。', '有空就一起來啦。'],
  stone: ['今天下午有空嗎？', '我想去樂器行看看吉他配件。', '如果妳沒事的話，可以一起走走。'],
  yanming: ['妳今天下課了嗎？', '我下午想去樂器行看看一些器材。', '有空的話一起去吧。'],
}

export const springInviteRounds: Record<SpringCharacterId, SpringInviteRound[]> = {
  wen: [
    { incoming: springInvites.wen, choices: [
      { text: '「你不是說只是去看看嗎？怎麼聽起來很認真？」', response: ['「我本來就只是看啊。」', '「妳不要每次都把我講得好像一定會買。」'], affection: 2 },
      { text: '「好啊！我可以幫你挑，雖然我也不太懂效果器。」', response: ['「效果器哪有在挑顏色啦……」', '「算了，妳來就知道了。」'], affection: 3 },
      { text: '「你又要買器材？你家是開樂器行喔。」', response: ['「欸，這句很過分欸。」', '「我只是去看看，妳到底要不要來？」'], affection: -1 },
    ]},
    { incoming: ['「我剛剛看了一下，店裡好像有一顆新的。」', '「上次妳不是說想聽聽看不同效果的聲音？」'], choices: [
      { text: '「對啊！我想聽你試給我聽。」', response: ['「那妳到時候站旁邊聽，我試給妳看。」'], affection: 3 },
      { text: '「你還記得我說過喔？」', response: ['「有啦，這種小事有什麼好忘的。」', '「妳不要突然問得這麼奇怪。」'], affection: 3 },
      { text: '「那你買之前先問問我的意見。」', response: ['「妳是要當採購喔？」', '「好啦，會問妳。」'], affection: 1 },
    ]},
    { incoming: ['「所以妳今天有空嗎？」', '「我大概三點過去，妳要不要一起？」'], choices: [
      { text: '「好啊，三點見！」', response: ['「好，那三點。妳下課慢慢來，不用趕。」'], affection: 3, accepted: true },
      { text: '「可以啊，但你要先答應不准嫌我不懂。」', response: ['「我哪有要嫌妳，亂講。」', '「三點見啦。」'], affection: 2, accepted: true },
      { text: '「今天不行，我還有事情要忙。」', response: ['「好啦，那妳先忙，不用趕。」', '「下次有空再一起去。」'], affection: 1, accepted: false },
    ]},
  ],
  ashin: [
    { incoming: springInvites.ashin, choices: [
      { text: '「木吉他我還沒認真試過幾把欸。」', response: ['「那今天可以讓妳多試幾把啊，不用怕弄壞。」'], affection: 3 },
      { text: '「你是不是又想買新琴了？」', response: ['「沒有啦，我只是想看看，最近剛好有一把聲音滿特別的。」'], affection: 1 },
      { text: '「我今天可能會有點忙，你先說說看要去哪家。」', response: ['「好啊，我把店名傳給妳。時間還可以再慢慢喬。」'], affection: 2 },
    ]},
    { incoming: ['「我剛剛問過店員了，有一把木吉他的音色滿溫柔的。」', '「我自己有點想試試看，也想讓妳聽聽看。」'], choices: [
      { text: '「聽起來很棒，我想聽你彈！」', response: ['「哈哈，那我到時候彈一小段給妳聽。」'], affection: 3 },
      { text: '「你先試，我在旁邊當聽眾就好。」', response: ['「好啊，妳也可以試試看，不用只站在旁邊。」'], affection: 2 },
      { text: '「我比較想自己抱抱看，木吉他看起來好大。」', response: ['「可以啊，我幫妳拿，妳慢慢試。」'], affection: 2 },
    ]},
    { incoming: ['「如果妳今天有空的話……」', '「要不要一起去？我覺得妳應該會喜歡那把琴。」'], choices: [
      { text: '「好啊，我想跟你一起去！」', response: ['「太好了，那我們三點左右在校門口碰面。」'], affection: 3, accepted: true },
      { text: '「可以！但你要教我怎麼聽木吉他的音色。」', response: ['「好啊，我們可以慢慢聽，不用急。」'], affection: 2, accepted: true },
      { text: '「今天真的不行，我還有事情要處理。」', response: ['「沒關係啦，妳先忙自己的事。」', '「下次有空再一起去也可以。」'], affection: 1, accepted: false },
    ]},
  ],
  masa: [
    { incoming: springInvites.masa, choices: [
      { text: '「你自己去不就好了，幹嘛還要找我？」', response: ['「我本來也可以啊。」', '「但至少妳會講人話，不會每個都說好看。」'], affection: 2 },
      { text: '「要我去幫你把關是不是？放心，交給我！」', response: ['「對啊，至少要找一個有審美的人。」', '「妳不要太得意，等一下還是要聽我的。」'], affection: 3 },
      { text: '「你該不會是想找人幫你付錢吧？」', response: ['「我看起來有這麼窮嗎？」', '「妳到底是來幫忙還是來亂的？」'], affection: -1 },
    ]},
    { incoming: ['「我剛剛看了幾個配件，價差真的很誇張欸。」', '「同一種東西可以差到快一倍，店家是當我盤子喔？」'], choices: [
      { text: '「先看實用的啦，不要只看最便宜的。」', response: ['「我知道啦，我又不是第一次買。」', '「好啦，這句算妳有道理。」'], affection: 2 },
      { text: '「你是不是早就有喜歡的，只是在等我幫你背書？」', response: ['「……妳不要把我講得這麼心機好不好。」', '「但妳等一下真的要幫我看一下。」'], affection: 3 },
      { text: '「你可以自己決定啊，我又不懂。」', response: ['「蛤？那我找妳來幹嘛？」', '「算了，妳至少幫我吐槽店員。」'], affection: -1 },
    ]},
    { incoming: ['「好啦，講正事。」', '「下午要不要一起去？我請妳吃個東西，省得妳說我只會使喚人。」'], choices: [
      { text: '「好啊，走！我倒要看看你要買什麼。」', response: ['「這才像話。三點，校門口不要遲到。」'], affection: 3, accepted: true },
      { text: '「可以，但買完你要請我吃東西喔。」', response: ['「妳還真的很會談條件欸。」', '「好啦，買完再說。」'], affection: 2, accepted: true },
      { text: '「今天不想陪你比價，哈哈哈。」', response: ['「……妳真的很欠揍欸。」', '「好啦，不勉強妳，我自己去。」'], affection: -1, accepted: false },
    ]},
  ],
  stone: [
    { incoming: springInvites.stone, choices: [
      { text: '「有空呀，怎麼了？」', response: ['「我想去看看幾條新的吉他背帶，順便補一些配件。」'], affection: 2 },
      { text: '「你要去買東西嗎？我可以幫你看看。」', response: ['「好啊，如果妳有喜歡的，也可以一起試試看。」'], affection: 3 },
      { text: '「今天可能有點趕，怎麼啦？」', response: ['「沒關係，我還沒決定幾點去，妳不用特地趕時間。」'], affection: 1 },
    ]},
    { incoming: ['「店裡好像有幾條新背帶，顏色都滿好看的。」', '「我想先挑一條自己用，也可以順便看看有沒有適合妳的。」'], choices: [
      { text: '「你覺得適合我的顏色是什麼？」', response: ['「我覺得深一點的顏色很適合妳，不過還是要妳自己試過才知道。」'], affection: 3 },
      { text: '「那我要先試背，不能只聽你說。」', response: ['「當然啊，妳試過比較準，我幫妳拿著琴。」'], affection: 2 },
      { text: '「你怎麼連這個都幫我想好了？」', response: ['「剛好看到就想到妳了，沒有特別啦。」'], affection: 3 },
    ]},
    { incoming: ['「我大概三點會到那附近。」', '「妳如果有空，要不要一起走過去？慢慢看就好。」'], choices: [
      { text: '「好啊，我們一起去。」', response: ['「好，那我三點在校門口等妳。」'], affection: 3, accepted: true },
      { text: '「可以，你等我一下，我下課就過去。」', response: ['「不急，妳下課再傳訊息給我就好。」'], affection: 2, accepted: true },
      { text: '「今天想先回家，改天再一起去吧。」', response: ['「好啊，沒關係，回家路上小心。」'], affection: 1, accepted: false },
    ]},
  ],
  yanming: [
    { incoming: springInvites.yanming, choices: [
      { text: '「下課後還沒有安排，怎麼了？」', response: ['「練團室有幾樣器材需要補，我下午想去店裡確認一下。」'], affection: 2 },
      { text: '「你要買什麼？我可以陪你一起挑。」', response: ['「主要是一些配件和耗材，有人一起看會比較周全。」'], affection: 3 },
      { text: '「我可能要先整理一下課堂筆記，晚一點呢？」', response: ['「可以，時間不急，我先把要買的東西列好。」'], affection: 1 },
    ]},
    { incoming: ['「店裡說今天會到一批新的鼓棒和導線。」', '「我想先確認尺寸和規格，免得買回去不合用。」'], choices: [
      { text: '「你列清單真的很仔細欸。」', response: ['「習慣了，器材要合用，大家練團才不會受影響。」'], affection: 2 },
      { text: '「那我幫你看外觀，規格就交給你。」', response: ['「好啊，這樣分工剛剛好。」'], affection: 3 },
      { text: '「我只負責陪逛，不負責做功課喔。」', response: ['「哈哈，沒問題，規格我會先確認好。」'], affection: 1 },
    ]},
    { incoming: ['「我大概三點出發，妳如果方便的話……」', '「要不要一起去？買完也可以順路走走。」'], choices: [
      { text: '「好啊，三點一起出發。」', response: ['「好，那我在校門口等妳，妳下課再過來就可以。」'], affection: 3, accepted: true },
      { text: '「可以，我也想看看你們平常用的器材。」', response: ['「好，到了我再慢慢跟妳介紹。」'], affection: 2, accepted: true },
      { text: '「今天不太方便，改天再陪你去。」', response: ['「沒關係，妳先忙，改天有空再一起去。」'], affection: 1, accepted: false },
    ]},
  ],
}

export const springStoreRoutes: Record<SpringCharacterId, SpringRoute> = {
  wen: {
    title: '溫尚翊・樂器行',
    blocks: [
      { kind: 'narration', text: '溫尚翊一進店就熟門熟路地往效果器那一區走，嘴上還說今天只是來看看，結果不到半分鐘，注意力就被一把剛上架的電吉他勾走了。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '欸，妳過來聽一下，這把聲音還不錯。' },
      { kind: 'narration', text: '他插上音箱試了幾個音，越彈越起勁。你站在旁邊看，他忽然把撥片遞過來，讓你也試試。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '拿好啦。手腕放鬆，不要一副要跟琴弦打架的樣子。' },
      { kind: 'narration', text: '你試著撥了兩下，聲音歪歪斜斜。他忍了兩秒，還是笑出來，伸手替你把撥片角度調正。' },
    ],
    prompt: '他把撥片留在你手裡，你想怎麼回？',
    choices: [
      { text: '「你剛剛那段再彈一次給我聽嘛！」', response: '「蛤？妳是來聽我彈琴的喔？……好啦，再一次。」他嘴上嫌你，手卻已經重新接上音箱。', affection: 2 },
      { text: '「我剛剛是不是有一點點厲害？」', response: '「一點點啦。」他故意停了一下，又補一句：「第一次這樣已經可以了啦。」', affection: 1 },
      { text: '「這個撥片送我好不好？」', response: '「那本來就是拿給妳試的啊。」他看你把撥片收好，笑著搖了搖頭。', affection: 2 },
    ],
  },
  ashin: {
    title: '陳信宏・木吉他',
    blocks: [
      { kind: 'narration', text: '阿信沒有急著逛其他區，一進門就先去看木吉他。他拿起一把原木色的琴，坐在試琴椅上，慢慢撥了幾個和弦。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '欸，這把聲音滿溫的耶。妳聽聽看。' },
      { kind: 'narration', text: '他把琴遞給你，先教你怎麼抱穩琴身，再示範最簡單的撥弦。你一撥，幾根弦卻一起悶住，聲音像打了個結。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '哈哈哈哈，沒關係啦，第一次都會這樣。妳先不要急著每根弦都要很大聲。' },
      { kind: 'narration', text: '他坐到你旁邊，重新把琴擺正，讓你照著他的手勢試一次。' },
    ],
    prompt: '你終於彈出比較清楚的聲音，想怎麼回？',
    choices: [
      { text: '「欸！有聲音了！我是不是很有天分？」', response: '「有有有，天分先保留，至少今天有進步馁。」他笑得眼睛都彎起來。', affection: 2 },
      { text: '「你坐近一點啦，我看不清楚。」', response: '「這樣有比較清楚嗎？」他往你旁邊挪了一點，聲音也跟著放輕。', affection: 2 },
      { text: '「我手指好像開始痛了……」', response: '「那先休息一下，不要硬撐啦。」他把琴接回去，還真的停下來等你。', affection: 1 },
    ],
  },
  masa: {
    title: '瑪莎・Bass 專區',
    blocks: [
      { kind: 'narration', text: '瑪莎一進店就直奔 Bass 區，先看琴弦，再看背帶，最後蹲在架子前研究價格標籤，眉頭越皺越緊。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '這個價格是怎樣？琴弦是用金子做的喔？' },
      { kind: 'dialogue', speaker: '你', text: '你不是很喜歡音樂嗎？怎麼一直在看價錢？' },
      { kind: 'dialogue', speaker: '瑪莎', text: '喜歡音樂跟喜歡花錢是兩回事好不好。' },
      { kind: 'narration', text: '他拿起一把 Bass 試了幾個音，低沉的聲音從音箱裡傳出來。接著把琴稍微轉向你，示意你聽聽看。' },
    ],
    prompt: '他問你哪一把比較好看，你怎麼回答？',
    choices: [
      { text: '「最貴那把啊，跟你比較配。」', response: '「……妳是來幫店家衝業績的喔？」他嘴上嫌棄，還是忍不住笑了。', affection: 1 },
      { text: '「這把啦，顏色很像你會選的。」', response: '「妳怎麼知道？」他低頭看了看琴身，居然真的又試了幾個音。', affection: 2 },
      { text: '「我覺得都好看，你自己挑啦。」', response: '「這種答案跟沒回答一樣欸。」他把琴放回架上，卻把你剛指過的那把又拿起來看了一遍。', affection: 1 },
    ],
  },
  stone: {
    title: '石錦航・吉他配件',
    blocks: [
      { kind: 'narration', text: '石頭帶你慢慢看吉他配件，從撥片、琴弦到背帶。他沒有急著替你決定，反而每樣都拿起來讓你看看手感。' },
      { kind: 'dialogue', speaker: '石錦航', text: '這種背帶比較軟，背久一點肩膀比較不會痛。' },
      { kind: 'narration', text: '你拿起一條顏色很鮮豔的背帶，在自己肩上比了比。他看了一眼，笑著幫你把扣環整理好。' },
      { kind: 'dialogue', speaker: '石錦航', text: '欸，這個顏色好像滿適合妳的。' },
      { kind: 'narration', text: '後來你又在一把木吉他前停了很久，他看出來了，便幫你把琴取下來，讓你試著背背看。' },
    ],
    prompt: '石頭問你是不是喜歡這個顏色，你怎麼回答？',
    choices: [
      { text: '「喜歡啊，很亮眼！」', response: '「那就記住這個顏色，下次再來看也不遲。」他把背帶放回架上，沒有催你。', affection: 2 },
      { text: '「你覺得適合我就好。」', response: '「那我覺得滿適合的。」他說完才意識到這句話有點像在替你挑東西，笑著移開視線。', affection: 2 },
      { text: '「我只是看看啦，買東西要想很久。」', response: '「嗯，慢慢挑就好。喜歡的東西不用急著決定。」', affection: 1 },
    ],
  },
  yanming: {
    title: '劉諺明・器材區',
    blocks: [
      { kind: 'narration', text: '諺明哥沒有一進門就試樂器，而是先去看鼓棒、鼓皮和一些小配件。他拿起兩副不同重量的鼓棒，分別放在手裡掂了掂。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '這副比較輕，這副重一點。用起來的感覺會差很多。' },
      { kind: 'dialogue', speaker: '你', text: '你買東西是不是都要研究這麼久？' },
      { kind: 'dialogue', speaker: '劉諺明', text: '哈哈，習慣了啦。用起來順手比較重要。' },
      { kind: 'narration', text: '你拿起一副鼓棒，試著在掌心轉了一圈，差點沒接住。他伸手幫你扶了一下，順勢把鼓棒放回你手裡。' },
    ],
    prompt: '你看著他手裡的鼓棒，忍不住問了一句。',
    choices: [
      { text: '「你平常是不是也會幫大家挑器材？」', response: '「偶爾啦，他們有時候忙著練習，這些小東西就順手幫忙看一下。」', affection: 2 },
      { text: '「你剛剛接得也太快了吧！」', response: '「哈哈，怕妳真的把它摔壞了。」他把鼓棒收好，還是笑著看了你一眼。', affection: 2 },
      { text: '「下次我還想跟你來逛。」', response: '「好啊，下次有要買的東西再一起來。」他答得很自然，卻沒有立刻轉身走。', affection: 2 },
    ],
  },
}

export const springRehearsalBlocks: SpringBlock[] = [
  { kind: 'narration', text: '佑達正坐在鼓組旁邊轉著鼓棒，瑪莎抱著 Bass，兩個人還沒開始練就已經為了今天要練哪一段鬥起嘴來。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '我剛剛那個鼓點明明很帥！' },
  { kind: 'dialogue', speaker: '瑪莎', text: '帥在哪？我只聽到有人差點把歌帶去隔壁棚。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '好了啦，今天先把《轧車》練順，不要還沒開始就先吵到沒力。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '我剛剛還沒唱就先笑場了馁。' },
  { kind: 'narration', text: '佑達坐回鼓椅，還特地轉頭看了瑪莎一眼，像是在警告他等一下不准再吐槽。瑪莎直接回了一個白眼。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '一、二、三、四！' },
  { kind: 'narration', text: '鼓聲一下子炸開。佑達打得特別起勁，整個人跟著節奏晃，瑪莎的 Bass 緊跟著往前衝，溫尚翊和石頭的吉他一左一右接上。阿信拿起麥克風，才唱沒幾句，佑達就又忍不住加了一串花。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '欸！！！你又自己加什麼啦！' },
  { kind: 'dialogue', speaker: '錢佑達', text: '那叫變化！整首歌要有生命力！' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '你的生命力先收斂一點啦！' },
  { kind: 'dialogue', speaker: '陳信宏', text: '哈哈哈哈哈，我剛剛真的差點唱錯馁！' },
  { kind: 'dialogue', speaker: '錢佑達', text: '再來一次啦！這次我保證不加！' },
  { kind: 'narration', text: '第二遍他真的忍住了，結果瑪莎在最後一拍故意把尾音拖長，害佑達收鼓收得一臉問號。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '蔡昇晏！！！' },
  { kind: 'dialogue', speaker: '瑪莎', text: '怎樣？我只是很有音樂性。' },
  { kind: 'dialogue', speaker: '石錦航', text: '你們兩個一個比一個會加戲。' },
  { kind: 'narration', text: '第三遍總算從頭到尾順順地跑完。最後一個音落下，佑達整個人往鼓椅上一靠，像剛跑完八百公尺。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '欸！這次超帥吧！' },
  { kind: 'dialogue', speaker: '瑪莎', text: '嗯，至少這次沒有把我們送去隔壁棚。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '可以啦，這遍有比較像樣。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '再練幾次應該就很順了馁。' },
  { kind: 'narration', text: '你笑到肩膀都在抖。佑達聽見了，還特地轉過來抗議，說今天明明是他最穩的一天。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '妳不要笑！我今天真的很穩好不好！' },
  { kind: 'dialogue', speaker: '瑪莎', text: '穩到差點把歌帶去隔壁棚。' },
  { kind: 'narration', text: '大家又笑成一團。收拾器材時，佑達忽然想起和朋友約好要去拿東西，匆匆抓起包包先走了，還不忘隔著門喊：「明天不要說我今天沒打好！」瑪莎立刻回他：「誰有空記得你啦！」' },
  { kind: 'narration', text: '佑達離開後，練團室終於安靜了幾秒。溫尚翊把吉他放回架上，阿信揉了揉肩膀，石頭把導線捲好，瑪莎則蹲下來收 Bass。' },
]

export const springLessonRoutes: Record<Exclude<SpringCharacterId, 'yanming'>, SpringRoute> = {
  wen: {
    title: '溫尚翊・電吉他',
    blocks: [
      { kind: 'narration', text: '溫尚翊把吉他重新背好，讓你站到他旁邊。他先示範怎麼按弦，再把琴交給你。你試著按了幾次，指尖很快就開始發酸。' },
      { kind: 'dialogue', speaker: '你', text: '嘶……手指好痛喔。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '哈哈，第一次都這樣啦。妳剛剛是不是又太用力？' },
      { kind: 'narration', text: '他伸手看了看你的指尖。你卻注意到他左手指腹有一層薄薄的硬繭，邊緣被琴弦磨得有點粗。' },
      { kind: 'dialogue', speaker: '你', text: '欸，你手上好多茧子喔。' },
      { kind: 'dialogue', speaker: '你', text: '我可以摸摸看嗎？' },
      { kind: 'narration', text: '溫尚翊愣了一下，低頭看了看自己的手，像是沒想到你會突然提出這種要求。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '蛤？有什麼好摸的啦……' },
      { kind: 'narration', text: '嘴上這樣說，他還是把左手伸到你面前。' },
    ],
    prompt: '你輕輕碰了碰他的指尖，他有點不自在地笑了。',
    choices: [
      { text: '「真的硬硬的欸！你以前也會痛嗎？」', response: '「廢話，剛開始哪有不痛的。」他把手收回去，又補了一句：「妳慢慢練就好，不用急。」', affection: 2 },
      { text: '「原來你每天都這樣練喔，難怪這麼厲害。」', response: '「哪有每天……好啦，差不多啦。」他低頭調音，耳朵有點紅。', affection: 2 },
      { text: '「那我以後也會長出跟你一樣的茧子嗎？」', response: '「妳先把今天這幾個和弦練熟再說啦。」他笑著把撥片塞回你手裡。', affection: 1 },
    ],
  },
  ashin: {
    title: '陳信宏・木吉他',
    blocks: [
      { kind: 'narration', text: '阿信把木吉他放到你腿上，先教你最簡單的和弦。你一開始還覺得沒什麼，結果按了幾輪，指尖很快就酸起來。' },
      { kind: 'dialogue', speaker: '你', text: '欸，木吉他弦好硬喔！手指痛死了。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '哈哈，真的會欸。妳先休息一下，不要硬撐馁。' },
      { kind: 'narration', text: '他把琴接過去放好，你這才看見他左手指尖也有明顯的茧。' },
      { kind: 'dialogue', speaker: '你', text: '阿信，你手上這個也是彈琴長出來的嗎？' },
      { kind: 'dialogue', speaker: '你', text: '我可以摸摸看嗎？' },
      { kind: 'dialogue', speaker: '陳信宏', text: '哈哈，可以啊。剛開始真的會痛，後來就慢慢習慣了馁。' },
      { kind: 'narration', text: '他把手掌攤開，讓你仔細看。你用指尖輕輕碰了一下，他低頭看著你，笑得有點不好意思。' },
    ],
    prompt: '他把木吉他重新拿回來，問你還要不要再試一次。',
    choices: [
      { text: '「好啊！這次我想把和弦按好。」', response: '「好，那我陪妳慢慢來。這次手指不要太用力，按穩就好馁。」', affection: 2 },
      { text: '「等一下啦，我還想再研究一下你的手。」', response: '「哈哈哈哈，妳怎麼突然對這個這麼有興趣？」他沒有把手收走，反而又攤開給你看了一眼。', affection: 2 },
      { text: '「今天先不要了，我怕明天拿筆都拿不動。」', response: '「那就休息啦。第一次已經很厲害了，不要把手弄痛才是真的。」', affection: 1 },
    ],
  },
  masa: {
    title: '瑪莎・Bass',
    blocks: [
      { kind: 'narration', text: '瑪莎把 Bass 調好，讓你坐在旁邊試著跟節拍撥弦。你才練了幾分鐘，左手指尖就開始發酸。' },
      { kind: 'dialogue', speaker: '你', text: '欸，手指真的好痛喔！' },
      { kind: 'dialogue', speaker: '瑪莎', text: '哈哈哈哈，現在知道弦不是拿來裝飾的了吧？' },
      { kind: 'narration', text: '你揉著手指，忽然發現他的指尖有一層明顯的硬繭。' },
      { kind: 'dialogue', speaker: '你', text: '欸，你手上這個茧子可以摸嗎？' },
      { kind: 'dialogue', speaker: '瑪莎', text: '蛤？妳現在連這個都要研究喔？' },
      { kind: 'narration', text: '他嘴上吐槽，卻把手伸過來，還故意把指尖翻給你看。' },
    ],
    prompt: '你摸了摸他的指尖，他等著聽你的評論。',
    choices: [
      { text: '「真的很硬欸！你是砂紙喔？」', response: '「……妳摸完還要人身攻擊是不是？」他把手收回去，自己也笑了。', affection: 2 },
      { text: '「原來這就是 Bass 大師的證明。」', response: '「那當然，不然妳以為這幾年白彈的喔？」他一臉得意地把琴重新背好。', affection: 2 },
      { text: '「我還以為會很粗糙，結果沒有想像中誇張。」', response: '「妳到底想像成什麼啦？」他挑眉看你，忍不住笑出聲。', affection: 1 },
    ],
  },
  stone: {
    title: '石錦航・吉他',
    blocks: [
      { kind: 'narration', text: '石頭把吉他調整好，讓你先練習最基本的和弦轉換。你試了幾次，手指開始酸，換弦時還不小心碰到旁邊的弦。' },
      { kind: 'dialogue', speaker: '你', text: '我手指快沒知覺了啦。' },
      { kind: 'dialogue', speaker: '石錦航', text: '哈哈，先休息一下。剛開始真的會不習慣。' },
      { kind: 'narration', text: '他把琴放到一旁，你看見他左手指尖有一層薄薄的繭。' },
      { kind: 'dialogue', speaker: '你', text: '石頭，你手上這個茧子……我可以摸摸看嗎？' },
      { kind: 'narration', text: '他愣了一下，隨即笑著把手掌攤開，讓你看得更清楚。' },
      { kind: 'dialogue', speaker: '石錦航', text: '可以啊，這個就是練久了留下來的。' },
    ],
    prompt: '你輕輕碰了碰他的指尖，他安靜地看著你。',
    choices: [
      { text: '「原來真的摸得到耶，好神奇。」', response: '「哈哈，妳剛剛不是還嫌手痛？現在反而對這個比較有興趣。」', affection: 2 },
      { text: '「你以前剛開始練的時候也會這麼痛嗎？」', response: '「會啊，所以我知道妳現在的感覺。慢慢來就好。」', affection: 2 },
      { text: '「那我是不是也要練到這樣才算厲害？」', response: '「不用啦，練琴不是比誰的茧子多。」他笑著把琴拿回來。', affection: 1 },
    ],
  },
}

export const springYanmingDinnerBlocks: SpringBlock[] = [
  { kind: 'narration', text: '諺明哥等大家收拾得差不多，才拿起外套問你要不要一起去吃飯。其他人還在門口鬧成一團，他倒是不急，站在旁邊等你收好東西。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '附近有家店還不錯，妳有吃過嗎？' },
  { kind: 'narration', text: '小店裡有幾桌熟客，老闆一看到諺明哥就笑著打招呼。他替你拉開椅子，等你坐好才把菜單遞過來。' },
  { kind: 'dialogue', speaker: '你', text: '你常常來這裡喔？' },
  { kind: 'dialogue', speaker: '劉諺明', text: '練團結束比較晚的時候會來。今天剛好想到妳可能也餓了，就問問看。' },
  { kind: 'narration', text: '你點完餐，他把水杯往你手邊推近一點，自己才低頭看菜單。' },
]

export const springYanmingDinnerChoices = [
  { text: '「你怎麼知道我剛好餓了？」', response: '「妳剛剛坐在那裡看他們練了好久，肚子應該早就餓了吧。」他笑著把筷子遞給你。', affection: 2 },
  { text: '「那下次換我請你，不能每次都讓你請。」', response: '「好啊，那我就等妳約我。」他答得很自然，像是已經把下次也算進去了。', affection: 2 },
  { text: '「這家看起來不錯欸，還好有跟你來。」', response: '「妳喜歡就好。下次想吃什麼再跟我說。」', affection: 1 },
]

const springContextLine = (character: SpringCharacterId, context: SpringDayContext): string => {
  if (context.storeCharacter === character && context.lessonCharacter === character) {
    if (character === 'wen') return '今天先陪妳去樂器行，後來又留下來練吉他，妳的手指還痛嗎？'
    if (character === 'ashin') return '今天木吉他從樂器行一路練到練團室，妳回家有沒有再試那幾個和弦？'
    if (character === 'masa') return '今天先在店裡看 Bass，後來又真的留下來練，手指有沒有還在抗議？'
    if (character === 'stone') return '今天一起看了配件，後來又練了和弦，妳手指還好嗎？'
  }
  if (context.storeCharacter === 'yanming' && character === 'yanming' && context.afterChoice === 'yanming-dinner') return '今天先一起逛了器材，後來又去吃飯，妳有沒有覺得行程排得很剛好？'
  if (context.storeCharacter === character) {
    if (character === 'wen') return '今天陪妳去樂器行，妳最後有沒有把那個撥片收好？'
    if (character === 'ashin') return '今天去樂器行試木吉他還滿好玩的，妳後來手指還會酸嗎？'
    if (character === 'masa') return '今天那把 Bass 妳最後還是選最貴的那把喔？我可沒答應要買。'
    if (character === 'stone') return '今天妳在店裡試背帶的樣子還滿認真的，後來有沒有一直惦記那個顏色？'
    return '今天在樂器行差點接不住鼓棒，回去有沒有再練習轉？'
  }
  if (context.lessonCharacter === character) {
    if (character === 'wen') return '今天練吉他的時候，妳手指後來還痛不痛？'
    if (character === 'ashin') return '今天木吉他的和弦回家有沒有再試？手指還好嗎？'
    if (character === 'masa') return '今天 Bass 的弦有沒有把妳手指弄痛？'
    if (character === 'stone') return '今天練和弦有沒有又偷偷練？記得讓手指休息。'
  }
  if (character === 'yanming' && context.afterChoice === 'yanming-dinner') return '今天吃完飯回去有順利到家嗎？那家店妳覺得怎麼樣？'
  return '今天《轧車》練到最後總算順了，佑達還一直說自己今天超穩。妳是不是也笑他了？'
}

export const getSpringSmsOpeners = (character: SpringCharacterId, context: SpringDayContext) => {
  const base: Record<SpringCharacterId, { text: string; response: string; affection: number }[]> = {
    wen: [
      { text: '「哈哈，今天真的很好玩欸。」', response: '「是喔，妳今天笑得很大聲欸。」', affection: 2 },
      { text: '「我回家還在想剛剛練的那首歌。」', response: '「《轧車》喔？那首本來就很容易卡在腦袋裡。」', affection: 1 },
      { text: '「你今天有沒有覺得我很認真？」', response: '「有啦，至少沒有一直喊累。」', affection: 2 },
    ],
    ashin: [
      { text: '「今天真的很開心，謝謝你。」', response: '「哈哈，我也覺得今天滿好玩的馁。」', affection: 2 },
      { text: '「我回家還一直想到今天那段旋律。」', response: '「那首很容易讓人一直哼欸。」', affection: 1 },
      { text: '「下次有空還想再跟你去逛逛。」', response: '「好啊，有看到喜歡的琴再一起去。」', affection: 2 },
    ],
    masa: [
      { text: '「今天被你吐槽好多次喔！」', response: '「哈哈，妳自己明明也笑得很開心。」', affection: 1 },
      { text: '「我現在終於知道 Bass 沒那麼簡單了。」', response: '「現在知道還不遲，先不要急著當大師。」', affection: 2 },
      { text: '「你今天是不是故意逗我？」', response: '「我哪有，我只是很誠實。」', affection: 1 },
    ],
    stone: [
      { text: '「今天謝謝你陪我，回家路上還一直想到剛剛的事。」', response: '「不客氣啊，今天大家都玩得滿開心的。」', affection: 2 },
      { text: '「我覺得今天學到好多東西。」', response: '「那就好，慢慢來，不用一次記住全部。」', affection: 1 },
      { text: '「下次還想跟你一起去樂器行。」', response: '「好啊，下次有空再一起去。」', affection: 2 },
    ],
    yanming: [
      { text: '「今天謝謝你，吃飯很開心！」', response: '「不客氣，妳喜歡那家店就好。」', affection: 2 },
      { text: '「今天大家練《轧車》真的好吵哈哈哈。」', response: '「哈哈，他們練得投入的時候就是這樣。」', affection: 1 },
      { text: '「你回去也要記得休息喔。」', response: '「好，妳也是。今天辛苦了。」', affection: 2 },
    ],
  }
  const choices = base[character].map((choice) => ({ ...choice }))
  const wentStore = context.storeCharacter === character
  const learnedTogether = context.lessonCharacter === character
  const ateTogether = character === 'yanming' && context.afterChoice === 'yanming-dinner'

  if (wentStore && learnedTogether) {
    choices[0] = { text: '「今天從樂器行一路待到練團室，真的好充實！」', response: '「哈哈，妳今天很認真欸。手指後來還好嗎？」', affection: 2 }
  } else if (wentStore) {
    choices[0] = { text: '「今天一起逛樂器行真的很好玩！」', response: character === 'wen' ? '「是喔？妳最後那個撥片有收好吧。」' : character === 'ashin' ? '「我也覺得啊，木吉他那區可以逛很久馁。」' : character === 'masa' ? '「妳今天挑東西的眼光還滿敢的嘛。」' : character === 'stone' ? '「妳有喜歡就好，下次還可以慢慢看。」' : '「哈哈，今天逛得還算仔細吧。」', affection: 2 }
  } else if (learnedTogether) {
    choices[0] = { text: '「今天留下來學樂器真的很好玩！」', response: character === 'wen' ? '「有玩到就好，手指還痛不痛？」' : character === 'ashin' ? '「妳今天學得很認真馁，和弦有記住嗎？」' : character === 'masa' ? '「哈哈，現在知道 Bass 沒那麼好惹了吧。」' : '「妳今天學得滿認真的，回家有沒有再練？」', affection: 2 }
  } else if (ateTogether) {
    choices[0] = { text: '「今天謝謝你陪我吃飯，真的很開心！」', response: '「不客氣，妳喜歡那家店就好。」', affection: 2 }
  } else {
    choices[0] = { text: '「今天《轧車》練得好熱鬧，我回家還在笑。」', response: character === 'wen' ? '「哈哈，妳是不是又在笑佑達？」' : character === 'ashin' ? '「他今天真的很有精神馁，差點害我唱錯。」' : character === 'masa' ? '「妳也有看到吧？我真的忍他很久了。」' : character === 'stone' ? '「哈哈，他們兩個每次都這樣。」' : '「哈哈，他們一練起來就會忘記時間。」', affection: 1 }
  }

  if (character === 'ashin' && !wentStore) choices[2] = { text: '「下次還想聽你彈木吉他。」', response: '「好啊，有空再彈給妳聽馁。」', affection: 2 }
  if (character === 'masa' && !learnedTogether) choices[1] = { text: '「今天《轧車》的 Bass 聽起來特別有勁！」', response: '「那當然，Bass 可不是站在旁邊裝飾的。」', affection: 2 }
  if (character === 'stone' && !learnedTogether) choices[1] = { text: '「今天最後一遍真的很順欸！」', response: '「對啊，大家終於接在一起了。」', affection: 1 }
  if (character === 'stone' && !wentStore) choices[2] = { text: '「下次還想聽你們練團。」', response: '「好啊，妳有空就過來。」', affection: 2 }
  if (character === 'wen' && !wentStore && !learnedTogether) choices[2] = { text: '「你們今天最後一遍真的很帥！」', response: '「有嗎？那就好，沒有白練。」', affection: 2 }
  if (character === 'yanming' && !ateTogether) choices[0] = { text: '「今天看你們練團真的很有趣！」', response: '「哈哈，大家玩得開心就好。」', affection: 1 }
  return choices
}

export const getSpringSmsRounds = (character: SpringCharacterId, context: SpringDayContext): SpringSmsRound[] => {
  const firstIncoming = springContextLine(character, context)
  const scripts: Record<SpringCharacterId, SpringSmsRound[]> = {
    wen: [
      { incoming: firstIncoming, choices: [
        { text: '「我有收好啦，才不會弄丟。」', response: ['「最好是，妳上次還把東西忘在練團室。」', '「下次來記得帶著。」'], affection: 2 },
        { text: '「手指還有一點酸，不過還好。」', response: ['「那就不要一直練，休息一下啦。」'], affection: 1 },
        { text: '「你是不是很想知道我有沒有想你？」', response: ['「蛤？妳今天怎麼突然這樣啦。」', '「……少來。」'], affection: 2 },
      ] },
      { incoming: '對了，三月底那個演出，妳真的會來喔？', choices: [
        { text: '「當然啊，我要看你們站上台！」', response: ['「好啊，那妳到時候記得找個看得到的位置。」'], affection: 2 },
        { text: '「看你表現囉。」', response: ['「妳要求還真多欸。」'], affection: 1 },
        { text: '「你上台不要彈錯就好。」', response: ['「喂！妳到底站哪邊的？」'], affection: 1 },
      ] },
      { incoming: '妳今天笑佑達笑得很大聲欸。', choices: [
        { text: '「因為他真的很有戲啊！」', response: ['「哈哈，他自己也知道啦。」'], affection: 1 },
        { text: '「你笑得也不小聲。」', response: ['「我哪有，妳不要亂講。」'], affection: 2 },
        { text: '「我是在笑你們兩個啦。」', response: ['「……妳真的很會欸。」'], affection: 2 },
      ] },
      { incoming: '今天那段終於練順了，回去我還在想最後那個收尾。', choices: [
        { text: '「我覺得超帥的！」', response: ['「有嗎？那就好。」'], affection: 2 },
        { text: '「你可以再彈一次給我聽。」', response: ['「下次來再彈給妳聽啦。」'], affection: 2 },
        { text: '「我只記得佑達亂加鼓花。」', response: ['「哈哈哈哈，那個真的很煩。」'], affection: 1 },
      ] },
      { incoming: '好啦，時間不早了，妳快去睡。', choices: [
        { text: '「你也是，不要練到太晚。」', response: ['「知道啦，晚安。」'], affection: 1 },
        { text: '「你先說晚安。」', response: ['「……晚安啦。」'], affection: 2 },
        { text: '「晚安，明天見！」', response: ['「明天見。」'], affection: 1 },
      ] },
    ],
    ashin: [
      { incoming: firstIncoming, choices: [
        { text: '「我還想再練一下，今天好像有進步。」', response: ['「有啊，妳今天已經比剛開始順很多了馁。」'], affection: 2 },
        { text: '「我的手指有點酸，明天再練好了。」', response: ['「對啦，先休息，手指要慢慢適應。」'], affection: 1 },
        { text: '「今天跟你一起逛真的很開心。」', response: ['「我也是啊，下次再一起去。」'], affection: 2 },
      ] },
      { incoming: '妳剛剛那個和弦後來有沒有記住？', choices: [
        { text: '「我有偷偷記在紙上！」', response: ['「哈哈，這麼認真喔？」'], affection: 2 },
        { text: '「沒有欸，明天可能又忘了。」', response: ['「沒關係，下次我再教妳一次馁。」'], affection: 1 },
        { text: '「你要不要再傳一次指法給我？」', response: ['「好啊，我找一下畫給妳。」'], affection: 2 },
      ] },
      { incoming: '今天練《轧車》的時候，佑達真的很有精神欸。', choices: [
        { text: '「他差點把整首歌打成另一首！」', response: ['「哈哈哈哈，瑪莎剛剛臉都皺起來了馁。」'], affection: 1 },
        { text: '「可是最後一次真的很順！」', response: ['「對啊，大家一起進去的時候很過癮。」'], affection: 2 },
        { text: '「你唱到一半是不是也笑了？」', response: ['「有啦，我差點真的唱不下去。」'], affection: 2 },
      ] },
      { incoming: '下次如果妳還想練木吉他，可以再找我。', choices: [
        { text: '「說好了喔，不可以嫌我笨。」', response: ['「不會啦，妳明明就很認真。」'], affection: 2 },
        { text: '「那我要從頭開始學。」', response: ['「好啊，我們慢慢來。」'], affection: 1 },
        { text: '「那你要準備好當老師了。」', response: ['「哈哈，這個老師有點不專業馁。」'], affection: 1 },
      ] },
      { incoming: '好啦，今天先這樣，妳早點休息。', choices: [
        { text: '「晚安阿信，今天謝謝你。」', response: ['「晚安～今天很開心馁。」'], affection: 2 },
        { text: '「你也不要太晚睡！」', response: ['「好啦，我等等就收。」'], affection: 1 },
        { text: '「下次見！」', response: ['「下次見馁。」'], affection: 1 },
      ] },
    ],
    masa: [
      { incoming: firstIncoming, choices: [
        { text: '「我今天真的被你笑死了！」', response: ['「哈哈，妳自己也沒好到哪裡去。」'], affection: 1 },
        { text: '「我已經決定要把 Bass 練起來了。」', response: ['「先不要立志太快，手指先練出來再說。」'], affection: 2 },
        { text: '「你今天其實教得滿好的嘛。」', response: ['「什麼叫其實？我本來就很會教好不好。」'], affection: 2 },
      ] },
      { incoming: '妳剛剛摸完我的手，是不是覺得很有專業感？', choices: [
        { text: '「我覺得比較像砂紙。」', response: ['「……妳真的很不會聊天欸。」'], affection: 1 },
        { text: '「有啦，Bass 大師認證。」', response: ['「這還差不多。」'], affection: 2 },
        { text: '「我只是想確認是不是會痛。」', response: ['「剛開始會啦，現在早就習慣了。」'], affection: 2 },
      ] },
      { incoming: '佑達今天又差點把我們帶去隔壁棚。', choices: [
        { text: '「哈哈哈哈你不要再講了！」', response: ['「我真的忍很久欸。」'], affection: 1 },
        { text: '「可是他最後一次很穩啊。」', response: ['「妳不要鼓勵他，他會得意。」'], affection: 1 },
        { text: '「你們兩個明明都很享受互相吐槽。」', response: ['「誰跟他享受啊？」'], affection: 2 },
      ] },
      { incoming: '下次要不要再試一次？這次不准說弦太硬。', choices: [
        { text: '「好啊，我才不會怕你。」', response: ['「很好，有志氣。」'], affection: 2 },
        { text: '「你要先保證不笑我。」', response: ['「這個我沒辦法保證。」'], affection: 1 },
        { text: '「那你要再教我一段。」', response: ['「行啦，先把今天的練熟。」'], affection: 2 },
      ] },
      { incoming: '好啦，不鬧妳了，去睡。', choices: [
        { text: '「晚安啦，Bass 大師。」', response: ['「晚安，學生。」'], affection: 2 },
        { text: '「你才要早點睡。」', response: ['「知道啦。」'], affection: 1 },
        { text: '「明天不要再嫌我。」', response: ['「看妳表現。」'], affection: 1 },
      ] },
    ],
    stone: [
      { incoming: firstIncoming, choices: [
        { text: '「今天真的謝謝你，跟你逛很開心。」', response: ['「不客氣啊，妳玩得開心就好。」'], affection: 2 },
        { text: '「我覺得我好像有比較懂吉他了。」', response: ['「有啊，慢慢就會熟悉。」'], affection: 1 },
        { text: '「我還想再看一次那條背帶。」', response: ['「下次有空再一起去看。」'], affection: 2 },
      ] },
      { incoming: '妳剛剛問的那個和弦，我可以再畫一次給妳。', choices: [
        { text: '「好！我怕我回家忘記。」', response: ['「那我畫清楚一點，妳照著按就好。」'], affection: 2 },
        { text: '「你真的很有耐心欸。」', response: ['「因為妳有認真學啊。」'], affection: 2 },
        { text: '「我下次要彈給你聽。」', response: ['「好啊，我等妳。」'], affection: 2 },
      ] },
      { incoming: '今天《轧車》最後那遍，大家配合得滿好的。', choices: [
        { text: '「對啊，前面還吵成那樣！」', response: ['「哈哈，這就是他們平常的樣子。」'], affection: 1 },
        { text: '「你跟溫尚翊兩把吉他接起來很帥欸。」', response: ['「真的喔？那我下次再注意那個地方。」'], affection: 2 },
        { text: '「佑達真的很有精神。」', response: ['「他每次都很有精神。」'], affection: 1 },
      ] },
      { incoming: '今天手指有沒有比較舒服？不要練過頭喔。', choices: [
        { text: '「有啦，我有乖乖休息。」', response: ['「那就好。」'], affection: 1 },
        { text: '「還有一點點酸，你要負責。」', response: ['「哈哈，那下次我教慢一點。」'], affection: 2 },
        { text: '「下次還要你教我。」', response: ['「好啊，妳想學就來。」'], affection: 2 },
      ] },
      { incoming: '晚點了，早點休息。', choices: [
        { text: '「晚安，謝謝你今天陪我。」', response: ['「晚安，今天很開心。」'], affection: 2 },
        { text: '「你也早點睡。」', response: ['「好，妳也是。」'], affection: 1 },
        { text: '「下次見喔！」', response: ['「下次見。」'], affection: 1 },
      ] },
    ],
    yanming: [
      { incoming: firstIncoming, choices: [
        { text: '「今天謝謝你陪我，吃飯很開心！」', response: ['「不客氣，妳喜歡那家店就好。」'], affection: 2 },
        { text: '「今天練團室真的好熱鬧哈哈哈。」', response: ['「他們一練起來就很投入，吵是難免的。」'], affection: 1 },
        { text: '「你回去也要記得休息喔。」', response: ['「好，妳也是。今天辛苦了。」'], affection: 2 },
      ] },
      { incoming: '剛剛看妳跟著節奏敲桌子，還滿認真的。', choices: [
        { text: '「我是在幫忙打拍子！」', response: ['「哈哈，我有聽出來。」'], affection: 2 },
        { text: '「我怕自己聽得太入迷。」', response: ['「那很好啊，喜歡就多聽。」'], affection: 1 },
        { text: '「你是不是在偷看我？」', response: ['「剛好看到而已啦。」'], affection: 2 },
      ] },
      { incoming: '妳下次還會來練團室嗎？', choices: [
        { text: '「會啊，我都快變固定班底了。」', response: ['「哈哈，那我們要幫妳留位置了。」'], affection: 2 },
        { text: '「要看有沒有人陪我。」', response: ['「有空的話，我可以陪妳。」'], affection: 2 },
        { text: '「你會在的話我就來。」', response: ['「那我盡量在。」'], affection: 2 },
      ] },
      { incoming: '今天大家都挺開心的，妳也早點休息。', choices: [
        { text: '「你也是，晚安！」', response: ['「晚安。」'], affection: 1 },
        { text: '「下次再一起吃飯。」', response: ['「好啊，等妳有空。」'], affection: 2 },
        { text: '「記得下次還要推薦好吃的店。」', response: ['「沒問題。」'], affection: 1 },
      ] },
      { incoming: '那我不吵妳了，晚安。', choices: [
        { text: '「晚安，諺明哥。」', response: ['「晚安，路上……啊，妳已經到家了，哈哈。好好休息。」'], affection: 1 },
        { text: '「你也快去休息。」', response: ['「好，明天見。」'], affection: 1 },
        { text: '「明天見！」', response: ['「明天見。」'], affection: 1 },
      ] },
    ],
  }
  const rounds = scripts[character].map((round, index) => index === 0 ? { ...round, incoming: firstIncoming } : round)
  const wentStore = context.storeCharacter === character
  const learned = context.lessonCharacter === character
  const dinner = character === 'yanming' && context.afterChoice === 'yanming-dinner'
  if (character === 'yanming' && !dinner) {
    rounds[0] = { ...rounds[0], choices: [
      { text: wentStore ? '「今天謝謝你陪我去看器材！」' : '「今天看你們練團真的很有趣！」', response: [wentStore ? '「不客氣啊，妳有沒有看到喜歡的東西？」' : '「哈哈，大家練得投入的時候就是這樣。」'], affection: 1 },
      rounds[0].choices[1],
      rounds[0].choices[2],
    ] }
    rounds[1] = { ...rounds[1], incoming: wentStore ? '今天在店裡看的那些器材，妳後來有沒有最喜歡哪一樣？' : '今天大家練得很投入，妳在旁邊有沒有聽得很過癮？', choices: wentStore ? [
      { text: '「那兩副鼓棒我都覺得很有趣！」', response: ['「哈哈，下次再讓妳試試看。」'], affection: 2 },
      { text: '「我覺得你挑東西真的很仔細。」', response: ['「習慣了啦，用得順手比較重要。」'], affection: 2 },
      { text: '「下次還想跟你一起去逛。」', response: ['「好啊，有要買東西再一起去。」'], affection: 2 },
    ] : [
      { text: '「有啊！尤其最後一遍，超有氣勢。」', response: ['「那就好，他們聽到應該會很開心。」'], affection: 2 },
      { text: '「我差點被佑達的鼓聲嚇到。」', response: ['「哈哈，他一投入就會這樣。」'], affection: 1 },
      { text: '「你下次也要坐旁邊陪我聽喔。」', response: ['「好啊，有空我就陪妳。」'], affection: 2 },
    ] }
  }
  if (character === 'yanming' && dinner) {
    rounds[1] = { ...rounds[1], incoming: '今天那家店妳覺得怎麼樣？下次還想吃什麼？', choices: [
      { text: '「我覺得很好吃！下次還可以再去。」', response: ['「好啊，那下次再帶妳去。」'], affection: 2 },
      { text: '「下次換我請你，不可以拒絕。」', response: ['「哈哈，好，我不跟妳搶。」'], affection: 2 },
      { text: '「我比較喜歡今天有人陪我吃飯。」', response: ['「……這樣喔。」他隔了一會兒才回：「那下次有空再一起吃。」'], affection: 2 },
    ] }
  }
  if (character === 'masa' && !learned) {
    rounds[3] = { ...rounds[3], incoming: '下次有空再來練團室聽我們練啊。', choices: [
      { text: '「好啊！但你們不可以再吵到把歌帶去隔壁棚。」', response: ['「那妳要先叫佑達安分一點。」'], affection: 2 },
      { text: '「我想再聽一次你彈 Bass。」', response: ['「這個簡單，下次彈給妳聽。」'], affection: 2 },
      { text: '「看你表現囉。」', response: ['「妳要求還真多。」'], affection: 1 },
    ] }
    rounds[1] = { ...rounds[1], incoming: '今天看妳在旁邊笑得那麼開心，我差點也忘記要彈 Bass 了。', choices: [
      { text: '「還不是因為你一直吐槽佑達！」', response: ['「那是他真的很好吐槽。」'], affection: 1 },
      { text: '「你們兩個根本是固定搭檔。」', response: ['「誰跟他固定搭檔啊？」'], affection: 2 },
      { text: '「我覺得你們感情很好欸。」', response: ['「……妳不要亂下結論。」'], affection: 2 },
    ] }
  }
  if (character === 'ashin' && learned && !wentStore) {
    rounds[0] = { ...rounds[0], choices: [
      { text: '「今天真的謝謝你教我木吉他！」', response: ['「不客氣啦，妳今天很認真馁。」'], affection: 2 },
      { text: '「我的手指現在還有一點酸。」', response: ['「那就先休息，明天不要急著練。」'], affection: 1 },
      { text: '「下次還想再跟你學一點。」', response: ['「好啊，我們慢慢來。」'], affection: 2 },
    ] }
  }
  if (character === 'ashin' && !learned) {
    if (!wentStore) {
      rounds[0] = { ...rounds[0], choices: [
        { text: '「你唱到一半差點笑場，我有看到！」', response: ['「哈哈，真的差點唱不下去馁。」'], affection: 2 },
        { text: '「今天最後一次大家接得很順欸。」', response: ['「對啊，大家一起進去的時候很過癮。」'], affection: 2 },
        { text: '「下次還想聽你們練團。」', response: ['「好啊，妳有空就來。」'], affection: 2 },
      ] }
      rounds[1] = { ...rounds[1], incoming: '妳剛剛有聽清楚最後那段嗎？我自己覺得這次接得滿順的。' }
    } else {
      rounds[1] = { ...rounds[1], incoming: '今天在店裡試的那把木吉他，妳覺得聲音怎麼樣？', choices: [
        { text: '「很溫柔欸，我很喜歡。」', response: ['「我也覺得，那把音色滿舒服的馁。」'], affection: 2 },
        { text: '「我比較喜歡你坐在旁邊教我的時候。」', response: ['「哈哈，妳怎麼突然講這個啦。」'], affection: 2 },
        { text: '「下次還想再試一次！」', response: ['「好啊，下次再去看看。」'], affection: 2 },
      ] }
    }
  }
  if (character === 'stone' && !learned) {
    rounds[3] = { ...rounds[3], incoming: '今天最後那遍的吉他接得還不錯，妳有聽出來嗎？', choices: [
      { text: '「有啊！你跟溫尚翊接得很漂亮。」', response: ['「謝謝，這次真的比較順了。」'], affection: 2 },
      { text: '「有，我還在回想那段聲音。」', response: ['「哈哈，那就好。」'], affection: 1 },
      { text: '「下次我還要坐近一點聽。」', response: ['「好啊，幫妳留個位置。」'], affection: 2 },
    ] }
  }
  if (character === 'stone' && learned && !wentStore) {
    rounds[0] = { ...rounds[0], choices: [
      { text: '「今天謝謝你慢慢教我，真的有比較懂了。」', response: ['「有進步就好，今天不用再練太晚。」'], affection: 2 },
      { text: '「我剛剛摸到你的茧子，還是覺得很神奇。」', response: ['「哈哈，練久了就會有，妳不用急著也練成這樣。」'], affection: 2 },
      { text: '「下次還要你教我喔。」', response: ['「好啊，妳想學就來。」'], affection: 2 },
    ] }
  }
  if (character === 'stone' && !learned) {
    if (!wentStore) {
      rounds[0] = { ...rounds[0], choices: [
        { text: '「今天最後一遍吉他接得很好欸。」', response: ['「真的喔？那下次再把那段練穩一點。」'], affection: 2 },
        { text: '「你跟溫尚翊兩把吉他接起來很帥欸。」', response: ['「真的喔？那我下次再注意那個地方。」'], affection: 2 },
        { text: '「下次還想聽你們練團。」', response: ['「好啊，妳有空就來。」'], affection: 2 },
      ] }
      rounds[1] = { ...rounds[1], incoming: '今天最後那遍真的比前面順很多，大家終於有接在一起。' }
    } else {
      rounds[1] = { ...rounds[1], incoming: '今天在店裡那條背帶，妳後來還有一直想到嗎？', choices: [
        { text: '「有啊，顏色真的很好看。」', response: ['「哈哈，那下次再去看看有沒有別的顏色。」'], affection: 2 },
        { text: '「你說適合我的，我就記住了。」', response: ['「我是真的覺得滿適合妳的。」'], affection: 2 },
        { text: '「我還想再背一次那把木吉他。」', response: ['「好啊，下次再讓妳試。」'], affection: 2 },
      ] }
    }
  }
  if (character === 'wen' && !wentStore && !learned) {
    rounds[0] = { ...rounds[0], choices: [
      { text: '「我有記得你們今天練《轧車》最後那遍。」', response: ['「那就好，最後那遍總算順了。」'], affection: 1 },
      { text: '「我現在還在笑佑達亂加鼓花那段。」', response: ['「哈哈哈哈，他真的很愛自己加戲。」'], affection: 1 },
      rounds[0].choices[2],
    ] }
  }
  return rounds
}
