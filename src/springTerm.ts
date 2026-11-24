export type SpringCharacterId = 'wen' | 'ashin' | 'masa' | 'stone' | 'yanming'
export type SpringBlock = { kind: 'narration' | 'dialogue' | 'aside'; speaker?: string; text: string }
export type SpringChoice = { text: string; response: string; affection: number }
export type SpringRoute = { title: string; blocks: SpringBlock[]; prompt: string; choices: SpringChoice[] }
export type SpringStoreRound = { scene: SpringBlock[]; prompt: string; choices: SpringChoice[] }
export type SpringStoreRoute = { title: string; blocks: SpringBlock[]; rounds: SpringStoreRound[]; endingBlocks: SpringBlock[] }
export type SpringLessonRoute = { title: string; blocks: SpringBlock[]; rounds: SpringStoreRound[]; endingBlocks: SpringBlock[] }
export type SpringInviteChoice = { text: string; response: string[]; affection: number; accepted?: boolean }
export type SpringInviteRound = { incoming: string[]; choices: SpringInviteChoice[] }
export type SpringSmsChoice = { text: string; response: string[]; affection: number; nextIncoming?: string }
export type SpringSmsRound = { incoming: string; choices: SpringSmsChoice[] }
export type SpringDayContext = {
  storeCharacter: SpringCharacterId | null
  afterChoice: 'yanming-dinner' | 'lesson' | 'home' | null
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

export const springStoreRoutes: Record<SpringCharacterId, SpringStoreRoute> = {
  wen: {
    title: '溫尚翊・效果器區',
    blocks: [
      { kind: 'narration', text: '你跟著溫尚翊走進樂器行，他一進門就熟門熟路地往效果器那一區走。嘴上說今天只是來看看，腳步卻一點都不像只是隨便逛逛。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '我上次看到一顆新的，想說今天來試一下。妳先不用管那些旋鈕，站這邊聽就好。' },
      { kind: 'narration', text: '他把自己帶來的電吉他接上音箱，先彈了一小段乾淨清亮的旋律。接著踩下效果器，同樣幾個音立刻變得厚重又有點張揚。他彈完還故意停住，轉頭看你，像是在等評審打分數。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '有聽出來差在哪裡喔？不用講得很專業，妳覺得哪個比較好聽就好。' },
    ],
    rounds: [
      {
        scene: [],
        prompt: '你回想剛才兩種完全不同的聲音。',
        choices: [
          { text: '「後面那個比較有氣勢，聽起來很像要衝上台了！」', response: '「哈哈，這樣就對了啦。」他又踩了一次效果器，故意把尾音拉長。「這顆就是比較有個性，彈起來會很爽。」', affection: 2 },
          { text: '「我喜歡前面那個，乾乾淨淨的很好聽。」', response: '「喔，妳喜歡乾淨的喔？」他點點頭，又把效果器關掉彈了一小段。「這種其實也很耐聽。」', affection: 3 },
          { text: '「我覺得都好聽，因為是你彈的啊。」', response: '「……妳不要突然講這種話啦。」他低頭假裝在調旋鈕，嘴角卻很明顯地翹了一下。「好啦，再聽一遍，這次認真選。」', affection: 3 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '店員又拿來另一顆效果器，說這顆的破音比較細，音量也比較好控制。溫尚翊接上去試了幾個音，接著指了指腳邊的開關。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '妳要不要幫我踩一下？就踩這個，聽聽看聲音有沒有變。' },
        ],
        prompt: '你看著腳邊那顆開關，決定怎麼做。',
        choices: [
          { text: '「好！你彈，我來控制！」', response: '「欸，踩慢一點啦！」他一邊笑一邊跟著你的節奏彈，還故意在你踩下去的瞬間拉了一個長音。「不錯喔，第一次當音控就上手了。」', affection: 3 },
          { text: '「我怕踩錯欸，你先示範一次。」', response: '「這有什麼好怕的，踩下去就好了。」他先示範一次，接著把位置讓給你，站在旁邊等你試。「妳看，很簡單吧。」', affection: 2 },
          { text: '「你是不是故意找事情給我做，自己好專心彈？」', response: '「被妳發現了喔？」他笑得一臉理直氣壯，卻還是把腳邊的位置讓給你。「好啦，這次我自己來，妳負責聽。」', affection: 2 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '試完效果器，溫尚翊正和店員確認規格，你的目光卻不知不覺停在旁邊一排吉他上。幾把琴整整齊齊掛著，標價牌上還寫著入門款。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '看很久了欸。妳也想學喔？' },
        ],
        prompt: '他順著你的視線看過去，你怎麼回答？',
        choices: [
          { text: '「有一點好奇，可是我連要買哪種都不知道。」', response: '「現在不知道很正常啊。」他看了一眼那排琴，沒有急著替妳挑。「先不用買，妳哪天真的想學，來練團室用我的琴試試看。確定喜歡再說。」', affection: 3 },
          { text: '「如果我想學，你會教我嗎？」', response: '「妳先說是真的想學，不是三分鐘熱度喔。」他故意挑眉，見妳看著他，又笑了一下。「好啦，想學就教妳。琴先用練團室的，不用急著花錢。」', affection: 3 },
          { text: '「沒有啦，我只是覺得那幾把木頭顏色很好看。」', response: '「喔，是喔。」他故意拖長聲音，嘴角帶著笑。「那妳慢慢看，等妳哪天看上眼了再跟我講。」', affection: 2 },
        ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '溫尚翊最後挑了一顆效果器，請店員幫他確認保固和配件。結帳時他還回頭看了一眼剛才那排吉他，像是把妳停留的那幾秒也記了下來。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '走啦，回去再接上試試看。妳剛剛說的那件事也不用急，想學的時候再跟我講。' },
    ],
  },
  ashin: {
    title: '陳信宏・木吉他區',
    blocks: [
      { kind: 'narration', text: '阿信帶你走到木吉他那一排，沒有急著拿琴，而是先看了看琴身大小和木頭顏色。店員認出他常來，拿了兩把不同尺寸的琴讓他比較。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '妳先聽聽看喔，這兩把看起來差不多，聲音其實不太一樣。' },
      { kind: 'narration', text: '他坐到試琴椅上，先彈了幾個和弦。第一把聲音比較溫暖，第二把則清亮一些。他沒有急著講一堆規格，只把兩段旋律又各彈了一次，讓你慢慢聽。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '妳不用懂那些木頭的名字啦，先說哪個聲音讓妳比較喜歡就好。' },
    ],
    rounds: [
      {
        scene: [],
        prompt: '兩段旋律停下來後，你比較喜歡哪一把？',
        choices: [
          { text: '「第一把，聽起來比較溫柔，很舒服。」', response: '「我也滿喜歡這把的。」他低頭看了看琴身，笑著說：「有時候聲音不用很亮，聽起來舒服就很好了。」', affection: 3 },
          { text: '「第二把比較清楚，感覺唱歌的時候很合。」', response: '「對耶，這把的聲音比較往前。」他又彈了幾個和弦，還輕輕哼了兩句，像是在試它配上人聲的感覺。', affection: 2 },
          { text: '「我選不出來啦，你再各彈一次。」', response: '「好啊，慢慢聽。」他真的沒有催你，又把兩把琴輪流彈了一遍，最後還問你想不想再比較一次。', affection: 2 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '店員把其中一把琴放到展示架旁，問你要不要抱抱看。阿信先替你確認背帶和琴身都穩了，才把琴交到你手上，自己坐在旁邊看著。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '妳先不用急著按弦，抱著看看會不會太大、太重。樂器拿起來舒服也很重要。' },
        ],
        prompt: '你抱著木吉他，忍不住有點緊張。',
        choices: [
          { text: '「欸，原來比看起來重一點！」', response: '「哈哈，對啊，所以尺寸真的要試過才知道。」他伸手幫你扶穩琴身，等你站好才鬆開手。', affection: 2 },
          { text: '「我怕我一動就把它撞壞了。」', response: '「不會啦，妳慢慢來。」他站在旁邊看著，還幫你把琴身轉到比較好抱的位置。「不用怕，這是展示琴，本來就是讓人試的。」', affection: 3 },
          { text: '「你坐旁邊彈給我聽，我想看看抱著琴聽是什麼感覺。」', response: '「好啊。」他把另一把琴拿起來，坐在你旁邊彈了一小段。兩把木吉他的聲音在店裡疊在一起，他還特地放慢速度讓你聽清楚。', affection: 3 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '你把展示琴交還給店員，卻又回頭看了一眼那排木吉他。阿信注意到了，沒有立刻接話，只把剛才試過的兩把琴型號記在店家的小卡上。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '妳是不是有點想學？如果真的有興趣，可以先從簡單的和弦開始，不用一開始就買琴。' },
        ],
        prompt: '他把寫著型號的小卡遞給你，你怎麼回答？',
        choices: [
          { text: '「我有點想，可是怕自己學兩天就放棄。」', response: '「那就先不要急著買呀。」他笑得很溫柔。「下次去練團室，我找一把木吉他陪妳試試看。喜歡再慢慢學，不用給自己壓力。」', affection: 3 },
          { text: '「那你可以教我第一個和弦嗎？」', response: '「可以啊，這個不難。」他把小卡收好，像是已經替妳記住這件事。「等一下回去有空，我先教妳最簡單的。」', affection: 3 },
          { text: '「我想先多聽聽看，現在還不敢說要學。」', response: '「這樣也很好啊。」他沒有催妳，只把小卡放進口袋。「先知道自己喜歡什麼，等真的想學了再決定。」', affection: 2 },
        ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '阿信把剛才試過的琴交還給店員，請對方把型號和價錢記下來，說想再考慮看看。走到門口時，他還回頭確認你有沒有把那張小卡收好。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '先留著就好，不用今天決定。哪天真的想學了，再一起來慢慢挑。' },
    ],
  },
  masa: {
    title: '瑪莎・Bass 器材區',
    blocks: [
      { kind: 'narration', text: '瑪莎一進店就直奔 Bass 區，先看琴弦，再看導線，最後蹲在架子前研究價格標籤。你才剛走近，就聽見他小聲嘀咕了好幾句。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '這個價格是怎樣？琴弦是用金子做的喔？' },
      { kind: 'dialogue', speaker: '你', text: '你不是很喜歡音樂嗎？怎麼一直在看價錢？' },
      { kind: 'dialogue', speaker: '瑪莎', text: '喜歡音樂跟喜歡當冤大頭是兩回事好不好。妳過來，幫我看一下這兩包差在哪。' },
      { kind: 'narration', text: '他拿起一把展示用的 Bass，接上音箱彈了幾個低音，又換了另一組琴弦試同一段節奏。聲音一厚一亮，他還故意把其中一個音拉得很長，逗得你忍不住笑。' },
    ],
    rounds: [
      {
        scene: [],
        prompt: '他問你哪一種聲音比較好聽，你怎麼回答？',
        choices: [
          { text: '「剛剛比較厚的那個，聽起來很有存在感。」', response: '「這個我也有考慮。」他把那包琴弦拿起來看了看，嘴上還是補一句：「至少妳今天有講出一個有用的意見。」', affection: 3 },
          { text: '「另一個比較清楚，感覺節奏會更明顯。」', response: '「喔，妳耳朵還不錯嘛。」他又試了幾個音，故意把節奏彈得更誇張。「這樣有沒有更明顯？」', affection: 2 },
          { text: '「我覺得都好聽，你彈什麼都可以。」', response: '「妳這個答案很會偷懶欸。」他嘴上嫌棄，臉上卻忍不住笑，還是把兩組琴弦都放在旁邊比較。', affection: 2 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '店員拿來兩條不同規格的導線，瑪莎一條一條看接頭，又請店員說明保固。他把其中一條接上音箱，彎腰確認接觸有沒有雜音。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '妳幫我聽一下，這條有沒有怪聲？不要只會說好聽喔。' },
        ],
        prompt: '你站在音箱旁邊，認真聽了一下。',
        choices: [
          { text: '「這條好像真的有一點沙沙聲。」', response: '「對吧，我就說不是我耳朵有問題。」他立刻把那條放到一旁，轉頭對店員說要再換一條試。', affection: 3 },
          { text: '「我聽不太出來，你再插一次嘛。」', response: '「好，這次妳靠近一點聽。」他重新插拔測試，還故意把音量轉小，免得你被突然的聲音嚇到。', affection: 2 },
          { text: '「你是不是把我當免費品管？」', response: '「不然咧，妳不是很熱心要幫我挑？」他笑得很欠揍，卻還是把音量調好，讓你再聽一次。', affection: 2 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '瑪莎終於把要買的琴弦和導線放到櫃檯。等店員結帳時，你的視線飄到隔壁的吉他區，他順著你的目光看過去，眉毛立刻挑了起來。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '等一下，妳該不會也想學吉他吧？' },
        ],
        prompt: '他一臉抓到新八卦的表情，你怎麼回？',
        choices: [
          { text: '「有一點啦，可是我完全是新手。」', response: '「新手就新手啊，有什麼好心虛的。」他把袋子往櫃檯一放。「先去練團室摸摸看，不要第一天就衝來買琴，買回去當衣架我可不負責。」', affection: 3 },
          { text: '「如果我想學，你覺得吉他跟 Bass 哪個比較適合我？」', response: '「妳先不要問哪個比較適合，先問自己想聽哪種聲音。」他講得一本正經，下一秒又補刀：「不過妳要是選 Bass，以後就要忍受我一直糾正妳。」', affection: 3 },
          { text: '「我只是看看而已，你不要自己腦補。」', response: '「好喔，我什麼都沒說。」他把收據折好塞進口袋，走了兩步又回頭。「但妳要是真的想學，先試過再買啦，這句我認真的。」', affection: 2 },
        ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '瑪莎最後只買了真正需要的琴弦和導線，結帳時還確認了一次折扣有沒有算對。走出店門，他又回頭看了一眼你剛才停留的吉他區。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '走啦，等一下回去要是有人問妳在看什麼，妳自己解釋喔。我可沒有答應要收學生。' },
    ],
  },
  stone: {
    title: '石錦航・吉他配件區',
    blocks: [
      { kind: 'narration', text: '石頭帶你慢慢看吉他配件，先確認自己要用的琴弦和背帶。他沒有急著挑，反而把兩種材質的背帶都拿下來摸了摸，仔細比較縫線和扣環。' },
      { kind: 'dialogue', speaker: '石錦航', text: '這條比較軟，背久一點肩膀比較不會痛。另一條看起來漂亮，但邊緣有點硬。' },
      { kind: 'narration', text: '你陪他看了一會兒，目光停在旁邊展示的木吉他上。石頭注意到了，先問過店員，才把其中一把展示琴取下來，確認好琴身和背帶都穩了，讓你抱著試試看。' },
      { kind: 'dialogue', speaker: '石錦航', text: '不用急著彈，先感覺一下大小和重量就好。如果不舒服，我再幫妳放回去。' },
    ],
    rounds: [
      {
        scene: [],
        prompt: '你抱著展示琴，發現它比想像中大一些。',
        choices: [
          { text: '「欸，原來抱起來是這種感覺！」', response: '「哈哈，跟站在旁邊看真的不一樣吧。」他站在旁邊扶著琴身，等你抱穩才慢慢鬆手。', affection: 3 },
          { text: '「好像有一點重，我的手快不知道放哪裡了。」', response: '「那我幫妳調一下位置。」他沒有催你，只把琴身稍微轉正，讓你抱得比較舒服。', affection: 3 },
          { text: '「你先彈給我聽，我想知道抱著琴聽起來有什麼不同。」', response: '「好啊。」他把琴接回去，坐在試琴椅上彈了一小段，還特地放慢速度，讓你能看清楚他的手指。', affection: 2 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '你把展示琴交還給店員，石頭才回去挑自己的背帶。他拿了兩條不同材質的讓你摸，自己則把其中一條搭在肩上試長度。' },
          { kind: 'dialogue', speaker: '石錦航', text: '這條比較輕，背久一點肩膀不會那麼累。妳覺得哪條比較實用？' },
        ],
        prompt: '你看著他手上的兩條背帶，想怎麼回答？',
        choices: [
          { text: '「軟一點的比較舒服，你平常練很久欸。」', response: '「我也覺得這條比較適合。」他把背帶收好，笑著說：「謝謝妳幫我看，這樣我比較放心。」', affection: 3 },
          { text: '「我喜歡另一條的顏色，比較像你的風格。」', response: '「真的嗎？」他低頭看了看，像是重新認識那個顏色似的。「那我再試背看看，謝謝妳。」', affection: 2 },
          { text: '「你自己用得舒服最重要，我怕我選錯。」', response: '「不會啦，妳剛剛講的很有道理。」他沒有要妳替他做決定，只把兩條都再比較了一次。', affection: 2 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '店員把石頭挑好的背帶和琴弦放到櫃檯。你又看了一眼剛才那把木吉他，他像是想了一下，才輕聲問你。' },
          { kind: 'dialogue', speaker: '石錦航', text: '妳是不是有點想學？如果有興趣，可以先試試看，不用急著買自己的琴。' },
        ],
        prompt: '石頭沒有催你，只安靜地等你回答。',
        choices: [
          { text: '「有一點，可是我怕自己學不好。」', response: '「一開始本來就不會啊。」他笑了笑。「先用練團室的琴試試看，慢慢找到喜歡的感覺就好。真的想買了，我再陪妳來挑。」', affection: 3 },
          { text: '「如果我想學，你會陪我練嗎？」', response: '「會啊。」他答得很自然，停了一下又補充：「妳不用一次學很多，我可以陪妳從最簡單的開始。」', affection: 3 },
          { text: '「我還在想啦，今天先陪你買東西。」', response: '「好啊，不急。」他把收據收好，沒有再追問，只說：「等妳想好了再告訴我。」', affection: 2 },
        ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '石頭買好了自己的背帶和琴弦，離開前還替你把剛才試過的展示琴交還給店員。走出店門時，他把袋子提到另一隻手，讓你走在比較靠裡面的位置。' },
      { kind: 'dialogue', speaker: '石錦航', text: '今天逛得還開心嗎？下次如果妳真的想學，我們再來慢慢挑，不用趕。' },
    ],
  },
  yanming: {
    title: '劉諺明・鼓組器材區',
    blocks: [
      { kind: 'narration', text: '諺明沒有一進門就亂逛，而是先把要買的東西列出來：鼓棒、鼓皮和幾條導線。他一樣一樣對照清單，還先跟店員確認尺寸，像是怕漏掉任何一項。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '我先把要用的東西買齊，等一下再陪妳慢慢看。妳不用一直跟著我跑，想看什麼都可以。' },
      { kind: 'narration', text: '他拿起兩副不同重量的鼓棒，分別在掌心掂了掂，又請店員拿出同尺寸的另一個款式比較。你在旁邊看著，才發現連一副鼓棒也有這麼多細節。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '這副比較輕，另一副重一點。手感差很多，還是要看平常怎麼打。' },
    ],
    rounds: [
      {
        scene: [],
        prompt: '諺明把兩副鼓棒放在你面前，問你哪個看起來比較順手。',
        choices: [
          { text: '「這副比較輕，你拿起來好像比較自在。」', response: '「妳觀察得很仔細欸。」他拿起來試了幾下，點點頭：「這副確實比較合手。」', affection: 3 },
          { text: '「重一點的看起來比較有份量！」', response: '「哈哈，外觀看不太出來啦。」他把兩副都拿起來掂了掂，還真的讓你各拿一次比較重量。', affection: 2 },
          { text: '「我不懂這個，你平常用哪副就選哪副。」', response: '「也對，最後還是要自己用得習慣。」他沒有考你，反而把兩副鼓棒都放回手裡重新試了一遍。', affection: 2 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '鼓棒挑好後，諺明又去確認鼓皮和導線。他把導線接上展示音箱，測過左右接頭，再請店員換另一條，確認沒有雜音才點頭。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '這種東西平常不會特別注意，真的出問題時，整團都得停下來等。' },
        ],
        prompt: '你看著他把清單一項項打勾，忍不住想說點什麼。',
        choices: [
          { text: '「你真的把大家的事情都記得很清楚欸。」', response: '「習慣了啦。」他把清單折好收進口袋。「大家一起練團，能先準備好的就先準備好。」', affection: 3 },
          { text: '「難怪你每次都知道缺什麼。」', response: '「不然等到要用才發現沒有，就更麻煩了。」他笑著把最後一條導線放進袋子。', affection: 2 },
          { text: '「我今天是不是也算幫忙採購了？」', response: '「當然算啊，剛剛還幫我挑鼓棒。」他把袋子交給你一下，自己去拿收據，回來時還記得接回去。', affection: 2 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '東西都買齊後，諺明才陪你走到另一側。你在吉他展示區前停了一會兒，他看見了，沒有急著催你走。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '妳對吉他有興趣嗎？剛剛看妳在那邊站了一下。' },
        ],
        prompt: '諺明的語氣很自然，你想怎麼回答？',
        choices: [
          { text: '「有一點，覺得你們平常彈得很帥。」', response: '「哈哈，原來是這樣。」他看了看展示琴，又說：「如果想學，不用急著買。先去練團室試試看，看看自己喜不喜歡。」', affection: 3 },
          { text: '「可是我完全不懂，連怎麼挑都不知道。」', response: '「那更不用急著買了。」他笑著說：「我可以幫妳問問他們誰有空教妳，先用練團室的琴練習，之後真的想買，再一起來看尺寸和手感。」', affection: 3 },
          { text: '「我只是看看啦，還沒有想那麼遠。」', response: '「沒關係啊，先看看也很好。」他把清單收進口袋，沒有再追問。「有興趣的話，以後再慢慢研究。」', affection: 2 },
        ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '諺明確認清單上的東西都買齊，才提起紙袋和你一起走出店門。你們經過櫥窗時，他還回頭確認了一眼有沒有漏拿收據。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '走吧，先回練團室。妳剛剛說的吉他，如果之後真的有興趣，我再幫妳問問看。' },
    ],
  },
}
export const springRehearsalBlocks: SpringBlock[] = [
  { kind: 'dialogue', speaker: '錢佑達', text: '欸欸欸！今天練《轧車》對不對？' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '對啊，怎麼了？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '那我今天要認真打！' },
  { kind: 'dialogue', speaker: '瑪莎', text: '你哪一天不認真？認真把大家帶跑。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '你真的很煩欸！' },
  { kind: 'dialogue', speaker: '陳信宏', text: '哈哈哈哈哈，好啦，先開始啦。' },
  { kind: 'narration', text: '溫尚翊把吉他背好，朝佑達抬了抬下巴。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '來，數拍子。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '一、二、三、四！' },
  { kind: 'narration', text: '下一秒，鼓聲直接炸開。' },
  { kind: 'narration', text: '佑達打得特別起勁，鼓點又快又猛，瑪莎的 Bass 緊跟著往前衝，溫尚翊和石頭的吉他幾乎同時炸出聲音。阿信拿起麥克風，整個人也跟著節奏晃起來。' },
  { kind: 'narration', text: '這哪是練團，根本像有人把一群精力過剩的人關進了一個隔音房！' },
  { kind: 'narration', text: '你坐在旁邊，桌上的水瓶都跟著震了兩下。' },
  { kind: 'narration', text: '第一遍還沒結束，佑達突然加了一串特別誇張的鼓點。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '欸！！！你幹嘛啦！' },
  { kind: 'dialogue', speaker: '錢佑達', text: '怎樣！我加一點變化不行喔！' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '你先不要自己加戲啦！' },
  { kind: 'dialogue', speaker: '錢佑達', text: '這叫創意！' },
  { kind: 'dialogue', speaker: '石錦航', text: '哈哈哈哈哈。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '等一下啦，我剛剛差點跟不上你們！' },
  { kind: 'narration', text: '所有人停下來。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '我真的受不了他。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '你不要每次都針對我！' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '好了啦，再來一次。這次照原本的走。' },
  { kind: 'narration', text: '第二遍。' },
  { kind: 'narration', text: '這次溫尚翊的吉他一進，石頭馬上接上，瑪莎把低音壓得穩穩的，佑達終於沒有亂加鼓花。阿信也越唱越投入，整個人幾乎要跟著音樂跳起來。' },
  { kind: 'narration', text: '唱到最熱鬧的地方，溫尚翊還故意朝佑達揚了揚眉毛。佑達馬上回了一個更誇張的鼓點。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '你們兩個夠了喔！' },
  { kind: 'narration', text: '你在旁邊笑得直不起腰。' },
  { kind: 'narration', text: '最後一段，幾個人幾乎同時收住。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '欸！！！這次是不是超帥！' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '嗯，這次可以。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '終於沒有自己亂加東西了。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '你到底要不要誇我！' },
  { kind: 'dialogue', speaker: '石錦航', text: '我覺得今天狀態不錯啦。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '哈哈，剛剛真的很過癮欸！' },
  { kind: 'narration', text: '溫尚翊把吉他放下來，轉頭看向你。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '怎麼樣？有沒有被嚇到？' },
  { kind: 'narration', text: '你還沒回答，瑪莎已經插話。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '她可能在想我們是不是每天都這麼吵。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '本來就是啊！' },
  { kind: 'narration', text: '練團室又是一陣笑聲。' },
  { kind: 'narration', text: '練習結束，大家開始收拾器材。' },
  { kind: 'narration', text: '佑達剛把鼓棒放進袋子，突然看了一眼手錶。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '靠，我差點忘記！' },
  { kind: 'dialogue', speaker: '瑪莎', text: '又怎麼了？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '我朋友幫我留了東西，我得趕快過去拿，不然店要關了。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '那你快去啊。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '走了走了！你們慢慢弄！' },
  { kind: 'narration', text: '他拎起包就跑了，臨走還不忘回頭喊一句：' },
  { kind: 'dialogue', speaker: '錢佑達', text: '明天不要說我今天沒打好喔！' },
  { kind: 'dialogue', speaker: '瑪莎', text: '誰有空記得你啦！' },
  { kind: 'narration', text: '大家又笑成一團。' },
]

export const springLessonRoutes: Record<Exclude<SpringCharacterId, 'yanming'>, SpringLessonRoute> = {
  wen: {
    title: '溫尚翊・電吉他',
    blocks: [
      { kind: 'narration', text: '練團結束後，其他人陸續收拾東西離開。溫尚翊卻沒急著走，把電吉他重新背好，拖了張椅子到你旁邊。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '妳剛剛一直盯著我按弦，是不是也想試？' },
    ],
    rounds: [
      {
        scene: [],
        prompt: '他把吉他轉向你，等你回答。',
        choices: [
          { text: '「我是在看你有沒有彈錯啦。」', response: '「蛤？我哪有那麼容易彈錯。」他挑起眉，嘴上不服氣，手卻已經把琴轉得更正，讓妳方便試。「好啦，既然妳這麼會看，換妳來。」', affection: 2 },
          { text: '「想試啊，可是我怕把你的琴弄壞。」', response: '「這把沒那麼脆弱啦。」他笑了一聲，把背帶調鬆一點。「我在旁邊看著，妳不用怕。」', affection: 3 },
          { text: '「你剛剛那段再彈一次，我想聽清楚。」', response: '「妳是想聽還是想偷學？」他故意問，卻真的又彈了一遍，最後把撥片遞給妳。「好，現在換妳試試看。」', affection: 1 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '他把琴穩穩放到你腿上，自己坐到旁邊，指了指琴頸靠近第一格的位置。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '先把食指放這裡，指尖立起來，不要整個貼上去。' },
        ],
        prompt: '你看著琴頸和自己的手指，想怎麼回？',
        choices: [
          { text: '「這樣喔？我怎麼覺得每根手指都在打架。」', response: '「哈哈，妳先不要叫它們打架啦。」他伸出自己的手示範一次，故意放慢速度。「一根一根來，不用一次全部擠上去。」', affection: 2 },
          { text: '「等一下，你先慢一點，我真的跟不上。」', response: '「好啦，我放慢。」他把動作拆得很細，還特地停在每個手指的位置等妳看清楚。「這樣有沒有比較懂？」', affection: 3 },
          { text: '「是不是我的手指太短了？」', response: '「不是手指的問題，是妳角度還沒抓到。」他笑著用撥片輕敲琴頸。「不要先怪自己的手，來，再試一次。」', affection: 1 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '第一聲只悶悶地響了一下。你再試一次，弦還是沒有乾淨地發聲。溫尚翊看了看你的手腕，沒有直接碰上來。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '手腕先放鬆啦。要不要我幫妳調一下位置？' },
        ],
        prompt: '他把手停在你手腕旁邊，等你決定。',
        choices: [
          { text: '「好，你幫我一下，我真的不知道哪裡不對。」', response: '「手給我。」他先托住妳的手腕，再把食指輕輕往旁邊挪了一點。「這樣，別用整隻手去壓，指尖立起來就好。」他的手很快就收回去，卻沒有坐遠。', affection: 3 },
          { text: '「先不要，我自己再試一次！」', response: '「好啊，妳自己來。」他把手收回去，靠在椅背上看著妳，嘴角帶著一點笑。「這麼有志氣，那我等妳彈出來。」', affection: 2 },
          { text: '「你先示範給我看，我照著學。」', response: '「看仔細喔。」他把自己的手放到琴頸上，慢慢做了一次，還故意把角度轉給妳看。「換妳，照這樣放。」', affection: 2 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '這次和弦終於乾淨地響起來。溫尚翊抬頭看你，像是比你還早一步發現那個聲音對了。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '有了啦，我就說妳可以。' },
        ],
        prompt: '你終於彈出第一個完整的和弦，會怎麼反應？',
        choices: [
          { text: '「欸！真的有聲音了！你聽到了嗎！」', response: '「有啦有啦，我又沒有聾。」他笑到肩膀都動了一下，還是把琴扶穩讓妳再彈一次。「這次比剛剛好多了。」', affection: 3 },
          { text: '「還不是你教得好，不然我現在還在跟琴弦打架。」', response: '「知道就好。」他一臉得意，下一秒又補一句：「不過是妳自己按對的，這個不能算我的功勞。」', affection: 2 },
          { text: '「剛剛那一下算不算可以拿出去炫耀？」', response: '「才一個和弦就要炫耀喔？」他故意搖頭，卻把撥片放回妳手裡。「好啦，再練兩次，讓妳有東西可以炫耀。」', affection: 2 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '練了幾次後，你的指尖開始發紅。溫尚翊把琴扶穩，示意先停一下，接著攤開自己的左手給你看。幾個常按弦的位置都有一層薄繭。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '先休息啦。妳看，手指都紅了。這些繭就是彈久了慢慢磨出來的。' },
        ],
        prompt: '你注意到他指腹上的繭，想怎麼做？',
        choices: [
          { text: '欸，你手上這個繭……可以摸摸看嗎？', response: '話一出口，你才發現自己問得太直接，伸出去的手停在半空，連忙想縮回來。溫尚翊看著你那隻進退兩難的手，先愣了半秒，隨即挑起眉。「不是妳自己說想摸的？現在又不敢了喔？」他故意用平常鬥嘴的口氣逗你，卻把左手往你面前送近一些，掌心朝上。「來啦，給妳摸。輕一點就好。」', affection: 2 },
          { text: '「這個是練多久才磨出來的啊？」', response: '「很久啦，剛開始也會痛，後來就習慣了。」他把手翻過來給妳看得更清楚。「不過妳不用急，手痛就休息，不要硬撐。」', affection: 2 },
          { text: '「你的手指也太辛苦了吧，平常都這樣練喔？」', response: '「不然咧，吉他又不會自己變厲害。」他笑著收回手，拿起撥片轉了兩圈。「好啦，今天先到這裡，妳的手比我還需要放假。」', affection: 1 },
        ],
      },
      {
        scene: [
{ kind: 'narration', text: '你終於伸出手，指腹輕輕碰上他左手常按弦的位置。那層薄繭比看起來硬一些，沿著指腹摸過去時，能感覺到一點粗糙。溫尚翊原本還撐著一副沒什麼的樣子，直到你的指尖真的停在他指腹上，他的手指才不受控制地蜷了一下。' },
      { kind: 'narration', text: '你抬起眼，正好撞上他的目光；他也看著你，卻只停了一瞬，就像突然想起什麼似的把視線挪開。他清了清喉嚨，立刻把手收回去，伸手撈起旁邊的撥片，在指間轉了兩圈。像是怕空氣安靜得太明顯，他把吉他重新抱穩，故意刷出一串清脆的和弦，音量比剛才大了一點。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '好啦，檢查完了喔？' },
      { kind: 'narration', text: '他沒等你回答，又接著彈了兩下，裝作只是在示範。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '來，換妳。剛剛那個和弦再試一次，我看看妳到底是哪根手指不聽話。' },
      { kind: 'narration', text: '說著，他把椅子往你這邊挪近一點，伸手指了指琴頸，像是剛才那幾秒根本沒發生過。' },
{ kind: 'narration', text: '他把琴頸轉向你，撥片在弦上輕輕敲了兩下，催你再試一次。明明裝得很像在認真教學，耳根卻還沒完全退紅。' },
        ],
        prompt: '你想怎麼接他的話？',
        choices: [
      { text: '你剛剛是不是故意彈那麼大聲？', response: '「哪有，剛好想試一下音啦。」他回得飛快，低頭又刷了一下弦，這次音量倒是乖乖小了下來。你還沒來得及笑，他就把撥片往你手裡一放：「笑什麼，換妳彈。」', affection: 2 },
      { text: '你是不是害羞了？', response: '「蛤？我哪有。」他立刻否認，低頭想再刷一個和弦，撥片卻在弦上刮出一聲突兀的雜音。他皺了下眉，裝作只是沒拿穩，把撥片重新夾回指間，故作鎮定地說：「不要亂講啦，手放好，我教妳。」說著伸手替你把食指的位置調正，指尖在你手背旁停了一瞬才收回。', affection: 2 },
      { text: '好啊，那你坐近一點教我。', response: '「我現在不夠近喔？」他嘴上回得很快，卻真的把椅子往你身邊挪了半寸，肩膀幾乎碰上來。「這樣可以了吧？來，手給我。」他伸手托住你的手腕，低頭看著琴頸，說話聲音比剛才低了些。', affection: 1 },
    ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '他把吉他重新抱好，又把撥片放到你手心。剛才那幾個和弦還在耳邊打轉，手指也真的有點酸了。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '今天先這樣啦。手指有點酸就先休息，不用硬撐。下次來練團室，我再教妳。' },
    ],
  },
  ashin: {
    title: '陳信宏・木吉他',
    blocks: [
      { kind: 'narration', text: '練團結束後，阿信沒有急著把木吉他收起來，反而拉了張椅子坐到你旁邊，低頭把琴弦重新調好。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '妳剛剛聽得很認真耶，是不是也想試試看？' },
    ],
    rounds: [
      {
        scene: [],
        prompt: '他把木吉他放到你面前，笑著等你回答。',
        choices: [
          { text: '「我怕一彈就把好好的琴弄得很難聽。」', response: '「不會啦，第一次本來就會有一點亂。」他把琴身扶穩，語氣很輕鬆。「而且我在旁邊，妳慢慢試就好。」', affection: 2 },
          { text: '「想啊，我想學你剛剛那個和弦。」', response: '「好啊，那我們就從那個開始。」他把琴轉向妳，還特地又彈了一次讓妳聽清楚。', affection: 3 },
          { text: '「你坐旁邊教我好不好？我一個人會緊張。」', response: '「當然可以啊。」他很自然地把椅子挪近一些，讓妳看得到他的手。「有不懂的就問我，不用不好意思。」', affection: 3 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '他把琴放到你腿上，先幫你調整好坐姿，再用指尖示範按弦的位置。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '妳先按這裡，指尖靠近品絲一點點，聲音比較不會悶掉。' },
        ],
        prompt: '你低頭看著自己的手，想怎麼回？',
        choices: [
          { text: '「這樣嗎？我是不是按太用力了？」', response: '「可以再放鬆一點點。」他把自己的手放到旁邊示範，還特地讓妳看指尖的位置。「不是越用力越好喔，角度比較重要。」', affection: 2 },
          { text: '「等一下，我的手指一直碰到旁邊的弦。」', response: '「沒關係，這個很常見。」他沒有笑妳，只把琴頸轉了一點。「我們一根一根調，先讓這個音乾淨就好。」', affection: 3 },
          { text: '「你可以再做慢一點嗎？我想看清楚。」', response: '「可以啊。」他把動作放得很慢，每換一根手指都停一下。「妳看，這樣就比較容易跟上了。」', affection: 2 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '你試著撥弦，幾個音還是悶在一起。阿信沒有笑，只把自己的手放到你旁邊，重新示範了一遍。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '沒關係，妳看我的手就好，我慢慢來，妳不用急。' },
        ],
        prompt: '他示範完，把位置留給你再試一次。',
        choices: [
          { text: '「好，我再試一次，這次應該可以了！」', response: '「嗯，慢慢來。」他往旁邊讓了一點，視線一直留在妳按弦的手上，沒有催促。', affection: 3 },
          { text: '「你不要笑喔，我剛剛真的不是故意的。」', response: '「我沒有要笑妳啦。」他先舉起手表示投降，接著自己也笑了。「真的，妳放心試。」', affection: 2 },
          { text: '「我好像懂了，可是手指就是不聽話。」', response: '「這很正常啊，腦袋懂了，手還要多練幾次才會記住。」他把琴扶好，陪妳把動作再拆開一次。', affection: 2 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '這回有幾個音終於清楚地響了出來。阿信抬起頭，笑得像是比你還高興。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '有了耶！就是這個聲音。' },
        ],
        prompt: '你也聽見和弦終於彈對了，會怎麼說？',
        choices: [
          { text: '「欸！我真的彈出來了！」', response: '「對啊，妳聽。」他又輕輕彈了一次，讓那幾個音在練團室裡多留了一會兒。「第一次就有這樣，很不錯了。」', affection: 3 },
          { text: '「你笑得比我還開心耶。」', response: '「因為真的有成功啊。」他笑著低下頭，手指還停在琴弦上。「看到妳學會，我也會很開心嘛。」', affection: 3 },
          { text: '「再彈一次，我想記住剛剛那個感覺。」', response: '「好啊，我陪妳。」他把琴重新放回妳腿上，這次只在旁邊輕輕打拍子。', affection: 2 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '練了幾次後，你的指尖開始發酸。阿信把琴接回去，讓你先放鬆手指，接著攤開自己的左手。指尖上有一層薄薄的繭。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '我以前剛開始也會痛，所以真的不用急。' },
        ],
        prompt: '你看著他指尖的薄繭，想怎麼回應？',
        choices: [
          { text: '欸，你手上這個繭……可以摸摸看嗎？', response: '話一出口，你自己先愣住，手停在半空。你這才意識到，剛才問的不是琴、不是指法，而是要碰他的手，臉頰一下子熱了起來。阿信看見你想把手縮回去，沒有笑你，只輕輕把手掌翻過來。「可以啊，當然可以。」他把左手放到你面前，聲音也跟著放輕。「妳慢慢摸，不用急。」', affection: 2 },
          { text: '「你以前也會痛成這樣喔？」', response: '「會啊，剛開始按久了，手指真的會酸。」他把手收回去，輕輕揉了揉指尖。「所以妳今天已經很厲害了，記得回去休息。」', affection: 2 },
          { text: '「原來這些都是你練琴留下來的痕跡。」', response: '「嗯，久了就會變成這樣。」他看了看自己的手，又看向妳。「不過不用急著也練成這樣，先享受彈出聲音就好了。」', affection: 2 },
        ],
      },
      {
        scene: [
{ kind: 'narration', text: '你用指腹輕輕碰上他指尖那層薄繭。阿信的手掌微微收了一下，很快又放鬆，還配合著把手指轉向你看得清楚的位置。他低頭看著你，沒有催促，只在你抬眼時溫柔地笑了一下。' },
{ kind: 'narration', text: '阿信的指尖還留在你手邊，他低聲問：' },
      { kind: 'dialogue', speaker: '陳信宏', text: '是不是比妳想像中硬？' },
        ],
        prompt: '你怎麼回答？',
        choices: [
      { text: '有欸，跟看起來不太一樣。', response: '「哈哈，真的喔？」他看著你認真比較的樣子，笑意更深。「我以前也沒注意過，都是彈久了才變這樣。」', affection: 2 },
      { text: '你剛剛怎麼一點都不驚訝？', response: '「有一點啊。」他笑了笑，手卻沒有收回去。「只是怕我一笑，妳就不好意思摸了。」', affection: 2 },
      { text: '我是不是問得太突然了？', response: '「不會啊，妳只是好奇嘛。」他把手輕輕放回你掌心旁邊。「而且妳剛剛那個表情，比問的話還可愛。」', affection: 2 },
    ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '阿信把琴放回琴架，還替你把椅子推回原位。你手指仍有點酸，心情倒是比剛開始輕鬆不少。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '今天先到這裡啦。下次妳想練哪個和弦，再跟我說，我可以陪妳慢慢來。' },
    ],
  },
  masa: {
    title: '瑪莎・Bass',
    blocks: [
      { kind: 'narration', text: '其他人收拾好東西離開後，瑪莎把 Bass 靠在椅子旁，自己拉了張椅子坐到你對面，手指在琴身上敲了兩下。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '好啦，終於安靜了。妳不是說想學？先看右手。' },
    ],
    rounds: [
      {
        scene: [],
        prompt: '他把 Bass 稍微轉向你，等你接話。',
        choices: [
          { text: '「你不是剛剛也跟著罵佑達嗎？」', response: '「我那叫維持秩序好不好。」他一臉理直氣壯，接著把琴往妳這邊推。「少轉移話題，手伸過來。」', affection: 2 },
          { text: '「好，老師請多指教！」', response: '「不要突然這麼有禮貌，我會不習慣。」他笑了一聲，還是認真把右手位置示範給妳看。', affection: 2 },
          { text: '「你先彈慢一點，我想看清楚。」', response: '「好啦，這次放慢。」他把食指和中指交替撥弦，還故意停在半空讓妳看清楚順序。', affection: 3 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '他示範食指和中指輪流撥弦，接著把琴交給你。你一開始還能跟上，兩隻手一忙起來，節拍就開始亂掉。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '右手輪流，左手按穩，兩隻手不要各做各的。' },
        ],
        prompt: '你發現自己一直漏拍，想怎麼回他？',
        choices: [
          { text: '「你剛剛明明看起來很簡單啊！」', response: '「那是因為我在彈啊。」他笑得很欠揍，卻把速度放慢。「好啦，這次跟著我，不要偷跑。」', affection: 2 },
          { text: '「等一下，我的右手跟左手好像不認識。」', response: '「哈哈哈哈，妳這個比喻還滿準的。」他用指尖敲了敲節拍。「先讓右手記住，再把左手加進來。」', affection: 3 },
          { text: '「你再示範一次啦，我剛剛沒看清楚。」', response: '「好，這次看仔細。」他又彈了一遍，還故意把最後一拍停住。「有了沒？不要等一下又怪我教太快。」', affection: 2 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '你瞪了他一眼又試了一次，這回節拍總算接上，中間卻有一個音被撥得特別大聲。瑪莎笑了一聲，伸手指了指你左手的位置。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '這裡啦，妳剛剛按太外面了。' },
        ],
        prompt: '他笑得有點欠揍，你怎麼反擊？',
        choices: [
          { text: '「欸！你不要一直笑！」', response: '「我哪有？我是在鼓勵妳欸。」他嘴上這樣說，嘴角卻還是翹著，伸手把琴扶穩讓妳再試。', affection: 2 },
          { text: '「我剛剛那一下其實很準吧？」', response: '「妳是說那個突然大聲到嚇人的音嗎？」他故意裝作認真回想，最後還是笑出來。「好啦，節拍有跟上，算妳過關。」', affection: 1 },
          { text: '「你講歸講，不要一直戳我的手啦。」', response: '「好好好，我用講的。」他立刻把手收回去，改用撥片指位置。「這樣可以了吧，大小姐？」', affection: 3 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '又練了幾遍，你終於把節奏接得比較完整。瑪莎把琴身扶穩，難得沒有立刻吐槽。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '欸，剛剛那次有跟上喔。' },
        ],
        prompt: '難得得到他的肯定，你怎麼回？',
        choices: [
          { text: '「快誇我！我練得這麼認真欸。」', response: '「好啦，今天有進步。」他故意拍了兩下手，接著補刀：「不要現在就開始得意忘形。」', affection: 3 },
          { text: '「這次沒錯吧？你不准再挑毛病了。」', response: '「我哪有挑毛病，我是在幫妳進步。」他把琴遞回來。「好啦，這次真的不錯。」', affection: 2 },
          { text: '「原來 Bass 比看起來難這麼多。」', response: '「現在知道了吧？」他挑眉，接著又把節拍放慢。「不過妳剛剛已經抓到感覺了。」', affection: 2 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '練到後來，你的指尖開始發酸。瑪莎立刻把琴扶住，讓你先停下來，接著攤開自己的左手給你看，指腹上有一層明顯的硬繭。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '先休息啦。這些都是長期按弦磨出來的，妳不要現在就跟我比。' },
        ],
        prompt: '你注意到他指腹上的繭，想怎麼回？',
        choices: [
          { text: '欸，你手上這個繭……可以摸摸看嗎？', response: '你話才出口就發現自己問得太直接，手停在半空，耳朵先熱了。瑪莎看著你，眉毛慢慢挑起來，像是抓到什麼把柄。「欸？妳剛剛是不是沒經過大腦就問了？」他故意把左手伸過來，指尖在你面前晃了晃。「來啦，檢查員，摸完要寫報告喔。」', affection: 2 },
          { text: '「你平常練這麼久，手不會痛喔？」', response: '「剛開始當然會啊。」他把手指彎了彎，語氣難得正經一點。「所以妳現在痛就停，不要逞強，琴又不會跑掉。」', affection: 2 },
          { text: '「你嘴巴那麼壞，手倒是很認真在練嘛。」', response: '「欸，這跟嘴巴有什麼關係？」他立刻反駁，卻忍不住笑了。「好啦，今天算妳有學到東西。」', affection: 2 },
        ],
      },
      {
        scene: [
{ kind: 'narration', text: '你才剛碰到，他就低頭盯著你看，故意一動也不動。你想裝作很認真地研究，他卻偏偏在你快要抬頭時問：' },
      { kind: 'dialogue', speaker: '瑪莎', text: '欸，怎麼突然這麼安靜？' },
      { kind: 'narration', text: '你一抬眼，他笑得一臉得逞，手指卻很配合地攤著，沒有躲開。' },
{ kind: 'narration', text: '瑪莎故意晃了晃手指，笑得一臉得逞：' },
      { kind: 'dialogue', speaker: '瑪莎', text: '報告寫好了沒？還是妳要再檢查一次？' },
        ],
        prompt: '你怎麼回？',
        choices: [
      { text: '我哪有！我只是認真研究！', response: '「好喔，研究員。那妳摸出心得沒？」他把手伸到你面前，真的等著聽評語。', affection: 2 },
      { text: '你不要一直講啦！', response: '「我又沒怎樣，是妳自己先開口的欸。」他笑著把手收回去，還故意在你面前晃了晃。', affection: 2 },
      { text: '不然你把手拿開啊。', response: '「那怎麼行，檢查還沒結束吧？」他挑眉，故意把手又放回你面前。', affection: 2 },
    ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '瑪莎把 Bass 放回架上，還順手把你剛才漏掉的節拍敲了一遍，像是怕你回家就忘記。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '今天先下課啦。回去記得休息，不要明天手痛又怪我虐待學生。' },
    ],
  },
  stone: {
    title: '石錦航・吉他',
    blocks: [
      { kind: 'narration', text: '其他人離開後，石頭把吉他靠在椅子旁，先替你拉開旁邊的椅子，等你坐好才把琴拿過來。' },
      { kind: 'dialogue', speaker: '石錦航', text: '妳想學哪一段？不一定要從最難的開始。' },
    ],
    rounds: [
      {
        scene: [],
        prompt: '他把琴放到你面前，耐心等你決定。',
        choices: [
          { text: '「先教我最簡單的好了，我怕拖累你。」', response: '「不會啦，妳不用擔心這個。」他把琴放到妳腿上，還特地調整了一下角度。「我們慢慢來就好。」', affection: 2 },
          { text: '「我想學換和弦，剛才看你手指移動好快。」', response: '「好啊，那我們就從最基本的換法開始。」他把動作放慢，讓妳看清楚每根手指的位置。', affection: 3 },
          { text: '「你慢慢教，我不趕時間。」', response: '「好。」他笑了一下，真的沒有急著開始，先確認妳坐得舒服，才把琴遞過來。', affection: 2 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '石頭示範最基本的和弦轉換，手指先抬起，再一起放下。他把動作放得很慢，讓你看清楚每個位置。' },
          { kind: 'dialogue', speaker: '石錦航', text: '先不用快，妳看我這樣換過去。' },
        ],
        prompt: '你看著他的手，想問什麼？',
        choices: [
          { text: '「我試試看……怎麼一直碰到旁邊那根弦？」', response: '「沒關係，這個很常見。」他用指尖點了點琴頸的位置。「妳先把指尖立起來一點，別急著一次按好全部。」', affection: 3 },
          { text: '「你可以再做一次給我看嗎？」', response: '「當然可以。」他又慢慢做了一遍，這次還從側面轉了個角度，讓妳看得更清楚。', affection: 2 },
          { text: '「原來手指要一起放下去喔？」', response: '「對，先把位置記住，再慢慢練速度。」他點點頭，等妳準備好才把琴轉回來。', affection: 2 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '你試了幾次，手指總是碰到旁邊的弦。石頭看見你皺起眉，沒有直接握住你的手，只把自己的手停在琴頸旁邊。' },
          { kind: 'dialogue', speaker: '石錦航', text: '要不要我幫妳調一下手的位置？' },
        ],
        prompt: '他沒有催你，等你自己決定。',
        choices: [
          { text: '「好，麻煩你。」', response: '「不麻煩。」他先輕輕扶住妳的手背，把手指往正確的位置移了一點，確認妳按得舒服才鬆開。', affection: 3 },
          { text: '「我想自己再試一次看看。」', response: '「好啊，妳自己試。」他把手收回去，坐在旁邊陪妳看著琴頸，沒有插手。', affection: 2 },
          { text: '「你先告訴我手指應該放哪裡就好。」', response: '「好，我指給妳看。」他用自己的指尖點了點位置，讓妳照著調整，不急著碰妳的手。', affection: 2 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '幾次練習後，終於有一次和弦換得很順。石頭抬起頭，對你露出一個很踏實的笑。' },
          { kind: 'dialogue', speaker: '石錦航', text: '有啊，剛剛那次就很好。' },
        ],
        prompt: '你也發現自己成功了，會怎麼說？',
        choices: [
          { text: '「欸，真的順過去了！」', response: '「有啊，妳看，這次每根弦都很清楚。」他又陪妳彈了一遍，讓妳把那個手感記住。', affection: 3 },
          { text: '「你剛剛一直等我，謝謝你喔。」', response: '「不用謝啊，學東西本來就要慢慢來。」他把琴往妳這邊挪了一點，讓妳再試一次。', affection: 2 },
          { text: '「再一次，我想把它記住。」', response: '「好，我陪妳。」他在旁邊輕輕打拍子，等妳自己把和弦換完。', affection: 2 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '練到後來，你的指尖開始發酸。石頭立刻把琴放到一旁，讓你先休息，接著攤開自己的左手給你看。指腹上有一層長年按弦留下的薄繭。' },
          { kind: 'dialogue', speaker: '石錦航', text: '剛開始練都會這樣，手指還不習慣，不用勉強。' },
        ],
        prompt: '你看見他指腹上的薄繭，想怎麼回應？',
        choices: [
          { text: '欸，你手上這個繭……可以摸摸看嗎？', response: '話一出口，你才發現自己好像太直接，手指停在半空，連眼神都不知道該往哪裡放。石頭看見你突然僵住，沒有笑你，只把手掌放得更平，輕聲說：「可以啊，妳想摸就摸。」他頓了一下，又補了一句：「如果不好意思，也沒關係。」', affection: 2 },
          { text: '「你以前剛開始練的時候也會這麼痛嗎？」', response: '「會啊，所以我知道妳現在的感覺。」他把手收回去，提醒妳先活動一下手指。「不用一次練太久，慢慢來就好。」', affection: 2 },
          { text: '「你平常看起來很溫柔，沒想到手上也有這些痕跡。」', response: '「哈哈，彈久了多少都會有。」他低頭看了看自己的手，接著把琴重新拿起來。「不過妳今天已經很認真了。」', affection: 2 },
        ],
      },
      {
        scene: [
{ kind: 'narration', text: '你指尖輕輕碰上他指腹那層薄繭。石頭沒有動，只把手安穩地放在你面前，讓你能慢慢看清楚。你摸到一半抬起頭，正好撞上他的目光；他沒有躲開，只很輕地笑了一下，像是怕驚動這個安靜的瞬間。' },
{ kind: 'narration', text: '石頭看著你，語氣仍舊溫柔：' },
      { kind: 'dialogue', speaker: '石錦航', text: '會不會覺得有點粗？我怕刮到妳的手。' },
        ],
        prompt: '你想怎麼回答？',
        choices: [
      { text: '原來真的摸得到耶，好神奇。', response: '「哈哈，妳剛剛不是還嫌手痛？現在反而對這個比較有興趣。」他笑著把手往回收了一點，卻沒有完全抽走。', affection: 2 },
      { text: '你以前剛開始練的時候也會這麼痛嗎？', response: '「會啊，所以我知道妳現在的感覺。」他把琴往你這邊挪了挪。「等一下我再陪妳練，慢慢來就好。」', affection: 2 },
      { text: '那我是不是也要練到這樣才算厲害？', response: '「不用啦，練琴不是比誰的繭子多。」他笑著把琴拿回來，手背卻輕輕碰了碰你的指尖。「妳願意學就很棒了。」', affection: 2 },
    ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '石頭把吉他收好，還替你把椅子推回原位。練團室安靜下來，只剩琴弦最後一點餘音。' },
      { kind: 'dialogue', speaker: '石錦航', text: '今天先到這裡吧。回去記得休息，手指不舒服就不要再練了。' },
    ],
  },
}

export const springYanmingDinnerBlocks: SpringBlock[] = [
  { kind: 'narration', text: '你把包背好，跟練團室裡的人打了聲招呼，推開門走出去。門關上後，裡面收拾器材的聲音一下子遠了，走廊也安靜不少。' },
  { kind: 'narration', text: '諺明沒有留在練團室裡。他已經先一步到樓下等你，外套搭在手臂上，另一隻手還拿著剛才收好的東西。看見你走出來，他抬手示意，等你走近才一起往街口走。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '收好了？走吧，附近有家店還不錯，走過去不用多久。' },
  { kind: 'narration', text: '沿路的店家陸續亮起燈，機車從騎樓外一輛輛經過。諺明走在你旁邊，步子不快，偶爾側過頭確認你有沒有跟上。' },
  { kind: 'narration', text: '小店裡坐著幾桌熟客，老闆一看到他就笑著招呼：「諺明，今天比較晚喔？」他熟門熟路地回了聲招呼，帶你到靠牆的位置，替你拉開椅子。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '這裡不用客氣，想坐哪邊都可以。菜單先看一下，這家份量不小，可以點幾樣一起吃。' },
  { kind: 'narration', text: '桌上的玻璃水壺凝著一層薄薄的水氣。諺明把菜單留在你面前，自己沒有急著點，等你慢慢看。' },
]

export const springYanmingDinnerRounds: SpringStoreRound[] = [
  {
    scene: [
      { kind: 'narration', text: '菜單上有炒飯、熱炒和幾樣湯品。諺明用手指點了點其中兩道，像是想起自己以前吃過的味道。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '他們家的炒飯不錯，湯也可以。妳有沒有什麼不吃的？我們慢慢點，不用急。' },
    ],
    prompt: '你看著菜單，打算怎麼點？',
    choices: [
      { text: '「你常來的話你推薦吧，我想吃你覺得好吃的。」', response: '「好，那我點一個炒飯，再配兩道可以分著吃的菜。」他把菜單轉過來，跟老闆確認份量，還特地問了一句辣度。「這樣應該夠了，不夠再加。」', affection: 3 },
      { text: '「我們點兩三樣分著吃好了，這樣可以吃到比較多種。」', response: '「可以啊，我也喜歡這樣點。」他笑著把菜單往中間挪，和妳一起挑了幾道招牌菜。「那湯就點一碗大的，兩個人分。」', affection: 2 },
      { text: '「我自己來！不然都被學長安排好了。」', response: '「哈哈，好啊，菜單交給妳。」他真的把手收回去，靠著椅背等妳選。「我負責吃，妳負責點，這樣分工很公平。」', affection: 2 },
    ],
  },
  {
    scene: [
      { kind: 'narration', text: '菜一道道送上桌，熱氣混著香味冒起來。諺明把湯碗往桌子中間挪了挪，又把筷子遞給你。你們才剛動筷，剛才練團室裡那陣亂七八糟的鼓聲就又被提了起來。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '佑達今天真的打得很起勁，第一遍那個鼓花連我自己都差點笑出來。' },
    ],
    prompt: '想到剛才練《轧車》的場面，你怎麼接話？',
    choices: [
      { text: '「我真的以為他要把整套鼓拆掉了！」', response: '「哈哈哈，沒有那麼誇張啦。」諺明笑著搖頭，「他一興奮就會想加東西，大家有時候要把他拉回來。」', affection: 3 },
      { text: '「瑪莎那個表情才好笑吧，他真的快受不了了。」', response: '「瑪莎嘴上嫌歸嫌，其實也很享受啦。」他說完自己先笑了，「不然第二遍也不會跟得那麼起勁。」', affection: 2 },
      { text: '「可是第二遍真的很好聽，最後大家一起收住那一下很帥。」', response: '「那一遍有抓到。」他點點頭，語氣裡有一點滿意，「大家玩得開心，也還是要記得一起收回來，不然就真的變成各玩各的了。」', affection: 3 },
    ],
  },
  {
    scene: [
      { kind: 'narration', text: '你們吃了一會兒，話題慢慢從剛才的笑鬧轉到樂團平常練習的事。諺明說起鼓手不只是把拍子打準，還得一直聽著其他人的聲音，哪裡快了、哪裡慢了，都要想辦法把整首歌穩住。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '有時候看起來只是一直打拍子，其實耳朵要顧很多地方。' },
    ],
    prompt: '你聽他說著，對他的鼓手工作有了點好奇。',
    choices: [
      { text: '「所以你一邊打鼓，還要一直注意其他人喔？不會分心嗎？」', response: '「一開始會啊，練久了就會習慣。」他用筷子輕輕敲了兩下桌面，示意剛才的節奏。「大家熟了以後，很多時候不用講話也知道對方要怎麼接。」', affection: 3 },
      { text: '「難怪你剛剛一直看著大家，原來是在幫忙抓速度。」', response: '「嗯，差不多是這樣。」他點點頭，「不是只有我顧他們啦，大家都要互相聽。哪個人一急，其他人也會跟著受影響。」', affection: 2 },
      { text: '「我剛剛只覺得你打得很穩，完全沒想到還要顧這麼多事。」', response: '「謝謝妳喔。」他有點不好意思地笑了一下，又低頭喝了口湯。「其實大家都很重要，少一個人都不會是同一首歌。」', affection: 3 },
    ],
  },
  {
    scene: [
      { kind: 'narration', text: '老闆經過桌邊時，又放下一小盤剛做好的小菜，順口問諺明最近是不是很少過來。他笑著說最近都在忙練團，老闆便讓你們慢慢吃，轉身去招呼下一桌。' },
      { kind: 'narration', text: '你這才發現他對這間店熟得很，連老闆都記得他的習慣。諺明把小菜往桌子中間推了推。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '這個可以試試看，老闆自己做的，味道還不錯。' },
    ],
    prompt: '你看著那盤小菜，想起他剛才熟門熟路的樣子。',
    choices: [
      { text: '「你真的很常來欸，老闆都記得你。」', response: '「練完團不想跑太遠，有時候就會來這裡吃。」他夾了一點小菜放進自己碗裡，「而且老闆人很好，常常會多給一點。」', affection: 2 },
      { text: '「你平常也會一個人來吃飯嗎？」', response: '「會啊，有時候大家時間對不上，我就自己來。」他語氣很平常，接著笑著補了一句：「一個人吃也方便，不用等大家決定半天。」', affection: 2 },
      { text: '「下次如果我不知道吃什麼，可以來問你嗎？」', response: '「當然可以啊。」他答得很自然，「附近我還算熟，妳想吃什麼我可以幫妳想想。也不一定要等練團結束。」', affection: 3 },
    ],
  },
  {
    scene: [
      { kind: 'narration', text: '一盤盤菜慢慢見底，桌上的話題也從樂團聊到平常在學校遇到的瑣事。諺明沒有一直追問，只是偶爾接上一句，聽你說完才講自己的事。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '妳平常課多嗎？有時候看妳坐在旁邊聽我們練，好像也不太會喊無聊。' },
    ],
    prompt: '他注意到你平常的生活，你怎麼回答？',
    choices: [
      { text: '「課不少啦，不過偶爾來聽你們練團，還滿像換個腦袋休息。」', response: '「那也不錯啊。」他笑著點頭，「練團室有時候是吵了點，不過大家認真起來還是滿有趣的。」', affection: 3 },
      { text: '「看你們練團比上課有趣多了，尤其佑達出包的時候。」', response: '「哈哈，這句不要讓佑達聽到，不然他又要替自己辯護半天。」諺明笑著把最後一口菜吃完。', affection: 2 },
      { text: '「有時候也會累啊，不過今天這樣出來吃飯就很好。」', response: '「那就好。」他把空碗往旁邊挪開，「偶爾停下來吃頓飯，不用一直趕事情，也滿重要的。」', affection: 3 },
    ],
  },
  {
    scene: [
      { kind: 'narration', text: '吃到最後，老闆過來問要不要再加一碗紅豆湯。諺明看了看你面前幾乎空了的碗，沒有替你回答，只把決定留給你。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '還吃得下嗎？想吃的話我們分一碗，不用勉強。' },
    ],
    prompt: '飯後的小甜湯，你怎麼決定？',
    choices: [
      { text: '「好啊，我們分一碗就好。」', response: '「好，那就一碗。」他替你向老闆點了甜湯，還把湯匙放到你手邊，「妳想吃多少就吃多少。」', affection: 3 },
      { text: '「我真的飽了，再吃會走不動啦！」', response: '「哈哈，那就不點了。」他沒有勉強，自己把桌上的空碗疊好一些，「吃飽就好，不用硬塞。」', affection: 2 },
      { text: '「你想吃嗎？如果你想吃，我可以陪你分。」', response: '「那就點一碗好了。」他笑著點頭，「我本來也有點想吃，剛好有人一起分。」', affection: 3 },
    ],
  },
]

export const springYanmingDinnerEndingBlocks: SpringBlock[] = [
  { kind: 'narration', text: '最後一口甜湯吃完，諺明先起身去櫃檯結帳。你們走出店門時，街上的車聲比剛才少了一些，招牌燈光落在騎樓地面上。' },
  { kind: 'narration', text: '他陪你慢慢走到街口，沒有刻意把話題拉長，只在要分開前停下腳步。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '今天吃得還習慣嗎？下次有想吃的再跟我說。回去路上小心。' },
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
      { text: '「今天真的很開心，謝謝你。」', response: '「哈哈，我也覺得今天滿好玩的耶。」', affection: 2 },
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
    choices[0] = { text: '「今天一起逛樂器行真的很好玩！」', response: character === 'wen' ? '「是喔？妳最後那個撥片有收好吧。」' : character === 'ashin' ? '「我也覺得啊，木吉他那區可以逛很久。」' : character === 'masa' ? '「妳今天挑東西的眼光還滿敢的嘛。」' : character === 'stone' ? '「妳有喜歡就好，下次還可以慢慢看。」' : '「哈哈，今天逛得還算仔細吧。」', affection: 2 }
  } else if (learnedTogether) {
    choices[0] = { text: '「今天留下來學樂器真的很好玩！」', response: character === 'wen' ? '「有玩到就好，手指還痛不痛？」' : character === 'ashin' ? '「妳今天學得很認真耶，和弦有記住嗎？」' : character === 'masa' ? '「哈哈，現在知道 Bass 沒那麼好惹了吧。」' : '「妳今天學得滿認真的，回家有沒有再練？」', affection: 2 }
  } else if (ateTogether) {
    choices[0] = { text: '「今天謝謝你陪我吃飯，真的很開心！」', response: '「不客氣，妳喜歡那家店就好。」', affection: 2 }
  } else {
    choices[0] = { text: '「今天《轧車》練得好熱鬧，我回家還在笑。」', response: character === 'wen' ? '「哈哈，妳是不是又在笑佑達？」' : character === 'ashin' ? '「他今天真的超有精神，差點害我唱錯。」' : character === 'masa' ? '「妳也有看到吧？我真的忍他很久了。」' : character === 'stone' ? '「哈哈，他們兩個每次都這樣。」' : '「哈哈，他們一練起來就會忘記時間。」', affection: 1 }
  }

  if (character === 'ashin' && !wentStore) choices[2] = { text: '「下次還想聽你彈木吉他。」', response: '「好啊，有空再彈給妳聽啊。」', affection: 2 }
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
        { text: '「我還想再練一下，今天好像有進步。」', response: ['「有啊，妳今天已經比剛開始順很多了耶。」'], affection: 2 },
        { text: '「我的手指有點酸，明天再練好了。」', response: ['「對啦，先休息，手指要慢慢適應。」'], affection: 1 },
        { text: '「今天跟你一起逛真的很開心。」', response: ['「我也是啊，下次再一起去。」'], affection: 2 },
      ] },
      { incoming: '妳剛剛那個和弦後來有沒有記住？', choices: [
        { text: '「我有偷偷記在紙上！」', response: ['「哈哈，這麼認真喔？」'], affection: 2 },
        { text: '「沒有欸，明天可能又忘了。」', response: ['「沒關係，下次我再教妳一次啊。」'], affection: 1 },
        { text: '「你要不要再傳一次指法給我？」', response: ['「好啊，我找一下畫給妳。」'], affection: 2 },
      ] },
      { incoming: '今天練《轧車》的時候，佑達真的很有精神欸。', choices: [
        { text: '「他差點把整首歌打成另一首！」', response: ['「哈哈哈哈，瑪莎剛剛臉都皺起來了，超好笑。」'], affection: 1 },
        { text: '「可是最後一次真的很順！」', response: ['「對啊，大家一起進去的時候很過癮。」'], affection: 2 },
        { text: '「你唱到一半是不是也笑了？」', response: ['「有啦，我差點真的唱不下去。」'], affection: 2 },
      ] },
      { incoming: '下次如果妳還想練木吉他，可以再找我。', choices: [
        { text: '「說好了喔，不可以嫌我笨。」', response: ['「不會啦，妳明明就很認真。」'], affection: 2 },
        { text: '「那我要從頭開始學。」', response: ['「好啊，我們慢慢來。」'], affection: 1 },
        { text: '「那你要準備好當老師了。」', response: ['「哈哈，這個老師有點不專業啦。」'], affection: 1 },
      ] },
      { incoming: '好啦，今天先這樣，妳早點休息。', choices: [
        { text: '「晚安阿信，今天謝謝你。」', response: ['「晚安～今天真的很開心。」'], affection: 2 },
        { text: '「你也不要太晚睡！」', response: ['「好啦，我等等就收。」'], affection: 1 },
        { text: '「下次見！」', response: ['「下次見喔。」'], affection: 1 },
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
      { text: '「今天真的謝謝你教我木吉他！」', response: ['「不客氣啦，妳今天很認真耶。」'], affection: 2 },
      { text: '「我的手指現在還有一點酸。」', response: ['「那就先休息，明天不要急著練。」'], affection: 1 },
      { text: '「下次還想再跟你學一點。」', response: ['「好啊，我們慢慢來。」'], affection: 2 },
    ] }
  }
  if (character === 'ashin' && !learned) {
    if (!wentStore) {
      rounds[0] = { ...rounds[0], choices: [
        { text: '「你唱到一半差點笑場，我有看到！」', response: ['「哈哈，真的差點唱不下去啦。」'], affection: 2 },
        { text: '「今天最後一次大家接得很順欸。」', response: ['「對啊，大家一起進去的時候很過癮。」'], affection: 2 },
        { text: '「下次還想聽你們練團。」', response: ['「好啊，妳有空就來。」'], affection: 2 },
      ] }
      rounds[1] = { ...rounds[1], incoming: '妳剛剛有聽清楚最後那段嗎？我自己覺得這次接得滿順的。' }
    } else {
      rounds[1] = { ...rounds[1], incoming: '今天在店裡試的那把木吉他，妳覺得聲音怎麼樣？', choices: [
        { text: '「很溫柔欸，我很喜歡。」', response: ['「我也覺得，那把音色滿舒服的啊。」'], affection: 2 },
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
  if (character === 'ashin' && !wentStore && !learned) {
    rounds[1] = { ...rounds[1], incoming: '妳剛剛有聽清楚最後那段嗎？我自己覺得這次接得滿順的。', choices: [
      { text: '「有啊！最後一次大家一起進來的時候很有氣勢。」', response: ['「對啊，那一下真的很過癮，前面亂成那樣還好最後有接起來。」'], affection: 2 },
      { text: '「我有看到你差點笑場！」', response: ['「哈哈，妳有看到喔？我真的快忍不住了。」'], affection: 2 },
      { text: '「佑達的鼓聲太搶戲了啦。」', response: ['「他今天真的很有精神，瑪莎應該快被他弄瘋了。」'], affection: 1 },
    ] }
    rounds[3] = { incoming: '下次來練團室，妳可以坐近一點，聽得比較清楚。', choices: [
      { text: '「好啊，我要坐前面一點！」', response: ['「可以啊，幫妳留個位置。」'], affection: 2 },
      { text: '「你到時候不要又笑場喔。」', response: ['「哈哈，我盡量啦。」'], affection: 2 },
      { text: '「那你要唱大聲一點，我才聽得清楚。」', response: ['「好，收到，這位同學要求很多喔。」'], affection: 1 },
    ] }
  }
  if (character === 'masa' && !wentStore && !learned) {
    rounds[0] = { ...rounds[0], choices: [
      { text: '「你剛剛一直吐槽佑達，我差點笑到聽不見歌。」', response: ['「那是因為他一直自己加戲，誰叫他那麼好吐槽。」'], affection: 2 },
      { text: '「你彈 Bass 的時候看起來超投入欸。」', response: ['「廢話，總不能真的站在旁邊當裝飾吧。」'], affection: 1 },
      { text: '「你們兩個到底誰比較愛鬧？」', response: ['「當然是佑達啊，這還需要問喔？」'], affection: 2 },
    ] }
    rounds[4] = { incoming: '好啦，今天先聊到這裡，妳也早點休息。', choices: [
      { text: '「你也不要練到太晚。」', response: ['「知道啦，妳也是。」'], affection: 1 },
      { text: '「晚安啦，明天練團見！」', response: ['「晚安，明天見。」'], affection: 2 },
      { text: '「下次我還要看你吐槽佑達。」', response: ['「妳是把我當脫口秀喔？」'], affection: 2 },
    ] }
  }
  if (character === 'stone' && !wentStore && !learned) {
    rounds[4] = { incoming: '今天看妳聽得很投入，回家後還在回想最後那段嗎？', choices: [
      { text: '「有啊，你跟溫尚翊接起來的地方很好聽。」', response: ['「謝謝，今天那一段大家真的配合得不錯。」'], affection: 2 },
      { text: '「我還在想佑達到底加了幾次鼓花。」', response: ['「哈哈，這個可能要問他本人才知道。」'], affection: 1 },
      { text: '「下次還想坐近一點聽你們練。」', response: ['「好啊，下次幫妳留位置。」'], affection: 2 },
    ] }
  }
  return rounds
}
