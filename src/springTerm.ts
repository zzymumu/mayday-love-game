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
  storeReplies?: [number | null, number | null, number | null]
  lessonReplies?: number[]
  dinnerReplies?: number[]
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

const springStoreNarration = (text: string): SpringBlock => ({ kind: 'narration', text })
const springStoreDialogue = (speaker: string, text: string): SpringBlock => ({ kind: 'dialogue', speaker, text })
const springStoreChoice = (text: string, response: string, affection = 2): SpringChoice => ({ text, response, affection })
const springStoreRound = (scene: SpringBlock[], prompt: string, choices: SpringChoice[]): SpringStoreRound => ({ scene, prompt, choices })

export const springStoreRoutes: Record<SpringCharacterId, SpringStoreRoute> = {
  wen: {
    title: '溫尚翊・效果器區',
    blocks: [
      springStoreNarration('溫尚翊一進樂器行就像回到自己地盤一樣，先跟店員打了聲招呼，連停下來看招牌的時間都沒有，徑直往電吉他和效果器的區域走。你才剛跟上，他已經熟門熟路地蹲到展示架前，開始研究那一排效果器。'),
      springStoreDialogue('溫尚翊', '等我一下喔，我先看個東西。'),
      springStoreDialogue('你', '你不是說今天只是來逛逛嗎？'),
      springStoreDialogue('溫尚翊', '對啊，逛逛啊。'),
      springStoreDialogue('溫尚翊', '又沒有說不能買東西。'),
      springStoreDialogue('你', '……你根本早就想好了吧！'),
      springStoreDialogue('溫尚翊', '哈哈哈哈哈。'),
      springStoreDialogue('溫尚翊', '被妳發現了喔？'),
      springStoreNarration('他拿起一顆效果器，跟店員確認完規格，便把自己的吉他接上音箱。先是一段乾淨清爽的旋律，接著腳尖輕輕一踩，聲音立刻變得厚重起來。他像是還嫌示範不夠，故意多彈了幾個音，最後用一個俐落的收尾停住。'),
      springStoreDialogue('溫尚翊', '怎樣？'),
      springStoreDialogue('溫尚翊', '有沒有覺得很帥？'),
      springStoreDialogue('你', '……你是在問效果器还是在问你自己？'),
      springStoreNarration('他轉過頭看你，表情空白了一瞬，像是沒料到你會這樣回。下一秒，他忍不住笑出聲，連肩膀都跟著晃了一下。'),
      springStoreDialogue('溫尚翊', '蛤？'),
      springStoreDialogue('溫尚翊', '妳真的很會欸。'),
    ],
    rounds: [
      springStoreRound([], '你覺得哪一種聲音比較好聽？', [
        springStoreChoice('「后面那个！听起来很有气势，帅死了！」', '「我就知道妳會喜歡這個。」他又踩了一次開關，故意彈了一段更張揚的旋律。說完還不忘看你一眼，神情明顯有點得意。「這個拿來表演很適合啊，對不對？」', 3),
        springStoreChoice('「前面那个比较好听，干净清爽。」', '「喔？妳喜歡這種喔？」他把效果器關掉，又試著彈了幾句，讓乾淨的音色在店裡慢慢散開。「也是啦，這種聲音比較耐聽。」', 2),
        springStoreChoice('「我觉得都好听，反正你弹什么都好听。」', '「……妳今天嘴巴很甜喔。」他低頭轉了兩下旋鈕，嘴角卻怎麼也壓不下去。「好啦，這句我收下。」', 3),
      ]),
      springStoreRound([
        springStoreNarration('店員又拿來另一顆效果器。溫尚翊接上去試過幾個音，確認完音色後，忽然朝你招了招手，指了指自己腳邊的開關。'),
        springStoreDialogue('溫尚翊', '欸，妳過來一下。'),
        springStoreDialogue('溫尚翊', '幫我踩這個，我彈給妳聽。'),
        springStoreDialogue('你', '我不会踩错吗？'),
        springStoreDialogue('溫尚翊', '踩錯又不會怎樣。'),
        springStoreDialogue('溫尚翊', '放心啦，我在這裡。'),
      ], '你看著他腳邊的開關，決定怎麼幫忙。', [
        springStoreChoice('「好！我来控制，你负责弹！」', '你興致勃勃地站到他旁邊，第一次卻踩得太早。「欸欸欸！還沒好啦！」他笑得肩膀都抖了，重新把吉他抱穩。「好啦，再一次。這次聽我喊。」第二次總算配合得剛剛好，他還很認真地朝你比了個讚。', 3),
        springStoreChoice('「你先教我，我不想搞砸。」', '「好啦，妳看喔。」他蹲下來指給你看開關的位置，耐心說明什麼時候踩。「這個不用怕，妳踩下去就好了。」你照著試了一次，他在旁邊點點頭。「不錯嘛，學得很快欸。」', 3),
        springStoreChoice('「我觉得你就是想找个人帮你干活！」', '「哈哈哈哈哈，被妳講中了。」他一點也不心虛，甚至重新把吉他背好，還把腳邊的位置讓給你。「不然咧？我一個人又要彈又要踩，很忙欸。」', 2),
      ]),
      springStoreRound([
        springStoreNarration('效果器總算試得差不多，溫尚翊留下來跟店員確認規格，你便趁空檔在店裡慢慢逛。走到吉他展示區時，一排電吉他在燈光下泛著漂亮的光澤，你忍不住停下腳步，隔著展示架多看了幾眼。'),
        springStoreDialogue('溫尚翊', '欸，妳在看這個喔？'),
        springStoreDialogue('你', '就是觉得很好看啊。'),
        springStoreDialogue('溫尚翊', '只有好看喔？'),
        springStoreDialogue('溫尚翊', '要不要試試看？'),
        springStoreDialogue('你', '我又不会弹……'),
        springStoreDialogue('溫尚翊', '不會才要試啊。'),
        springStoreDialogue('溫尚翊', '拿著看看，這個位置不要碰到牆。'),
        springStoreNarration('他先把展示琴取下來，確認背帶長度，再扶著琴身交到你手上。你低頭看著琴頸，手指懸在半空，不知道該先放哪裡；他站在旁邊看著，沒有催你。'),
      ], '你抱著吉他，抬頭看向他。', [
        springStoreChoice('「如果我真的想学，你会教我吗？」', '「妳真的想學喔？」他看了你兩秒，隨後笑了一下。「可以啊，先來練團室試試看。」他把琴身扶穩，語氣帶著一點故意的嚴肅。「不過我教得很嚴格喔，不准偷懶。」', 3),
        springStoreChoice('「你先弹给我听嘛！」', '「好啊，想聽什麼？」他接過琴，隨手彈了一段輕快的旋律。「這樣可以嗎？」彈完還故意抬眼看你，嘴角帶著笑。「是不是突然更想學了？」', 3),
        springStoreChoice('「我怕我没有天分，学不会。」', '「妳都還沒學就在擔心這個喔？」他把琴放回展示架，語氣裡帶著一點笑意。「哪有人一開始就會的啦。先玩玩看，不喜歡再說啊。」', 2),
      ]),
    ],
    endingBlocks: [
      springStoreNarration('結帳時，溫尚翊把效果器和配件一樣樣確認好，裝進店員遞來的袋子。走出店門後，他沒有像進門時那樣走得飛快，反而特意放慢腳步，讓你能跟他並肩走。'),
      springStoreDialogue('溫尚翊', '今天還不錯吧？'),
      springStoreDialogue('溫尚翊', '下次有空再帶妳來。'),
      springStoreDialogue('溫尚翊', '不過妳剛剛說的那件事，我有記得喔。'),
    ],
  },
  ashin: {
    title: '陳信宏・木吉他區',
    blocks: [
      springStoreNarration('阿信沒有像溫尚翊那樣一進門就往目標衝，而是先陪你在店裡慢慢逛了一圈。經過木吉他區時，他的腳步才停下來，視線在一排琴身上來回看了看。'),
      springStoreDialogue('陳信宏', '欸，妳等我一下。'),
      springStoreDialogue('陳信宏', '我想看看這邊。'),
      springStoreNarration('他拿起一把木吉他，先用指腹輕輕撥了幾下弦。溫暖的聲音在店裡散開，帶著木頭特有的共鳴。他又拿起另一把，沒有急著介紹規格，而是把兩把琴輪流彈給你聽。'),
      springStoreDialogue('你', '你平常也会弹木吉他吗？'),
      springStoreDialogue('陳信宏', '會啊，只是有時候還是比較習慣電吉他。'),
      springStoreDialogue('陳信宏', '這把聲音比較亮，妳聽聽看。'),
      springStoreDialogue('你', '嗯！第二把好像比较清楚。'),
      springStoreDialogue('陳信宏', '對啊，妳耳朵滿好的嘛。'),
      springStoreNarration('他笑著把琴放回去，還特地又看了一眼你剛才點頭的那一把，像是把你的喜好也順手記了下來。'),
    ],
    rounds: [
      springStoreRound([], '兩段旋律停下來後，你比較喜歡哪一把？', [
        springStoreChoice('「我喜欢第一把，声音很温暖。」', '「我也喜歡這種。」他重新彈了一遍，讓音符慢慢散開。「聽起來是不是很舒服？」', 3),
        springStoreChoice('「第二把比较清亮，感觉很适合唱歌。」', '「對，這把配人聲應該滿好的。」他隨手彈了幾個和弦，還輕輕哼了兩句，隨後自己笑了。「我剛剛是不是唱太小聲了？」', 2),
        springStoreChoice('「我听不出来啦，你再弹一次！」', '「哈哈，好啊。」他真的又彈了一遍，還把速度放慢，方便你比較。「這次有沒有比較清楚？」', 2),
      ]),
      springStoreRound([
        springStoreNarration('店員問你要不要試抱一下。阿信先把琴接過來，確認好琴身和背帶，才小心地交給你。你把琴抱進懷裡，才發現琴身比想像中大，連手肘都不知道該擺在哪裡。'),
        springStoreDialogue('陳信宏', '妳先抱抱看。'),
        springStoreDialogue('陳信宏', '不用緊張，這個很穩的。'),
        springStoreDialogue('你', '哇，原来是这个感觉！'),
        springStoreDialogue('陳信宏', '是不是？'),
        springStoreNarration('他看你前後調整了兩次姿勢，終於忍不住笑了出來。'),
        springStoreDialogue('陳信宏', '妳好像在抱一個很大的抱枕喔。'),
      ], '你抱著琴，忍不住想回他一句。', [
        springStoreChoice('「你不要笑！我真的不知道怎么拿啦！」', '「好啦好啦，不笑妳。」他走近一點，幫你把琴身稍微轉正，手掌扶著琴背讓它穩穩靠在你懷裡。「這樣舒服一點嗎？」', 3),
        springStoreChoice('「你帮我调整一下嘛，我怕拿错。」', '「可以啊。」他輕輕扶著琴身，幫你調整到比較舒服的位置，還確認背帶沒有卡住。「這樣就好，慢慢來。」', 3),
        springStoreChoice('「你坐旁边弹给我听，我想体验一下！」', '「好啊。」他坐到你旁邊，拿起另一把琴，彈了一小段。你抱著琴聽，忍不住跟著節奏輕輕晃了晃。阿信看見了，笑著說：「妳還滿投入的欸。」', 3),
      ]),
      springStoreRound([
        springStoreNarration('你把琴交還給店員，卻又忍不住回頭看了一眼。阿信注意到了，沒有急著追問，只是拿起一張琴型介紹卡，簡單替你講了講尺寸，讓你知道不同大小抱起來會有什麼差別。'),
        springStoreDialogue('陳信宏', '妳是不是有點想學？'),
        springStoreDialogue('你', '有一点吧……不过我完全不会。'),
        springStoreDialogue('陳信宏', '沒關係啊，誰不是從不會開始的？'),
      ], '他把琴型介紹卡放到你面前，你怎麼回答？', [
        springStoreChoice('「那你可以教我吗？我想试试看。」', '「當然可以啊。」他答得很自然，像是這件事本來就沒什麼好猶豫的。「下次去練團室，我找一把木吉他給妳。先學最簡單的和弦，不用急。」', 3),
        springStoreChoice('「我怕手指会很痛欸。」', '「剛開始按弦會有一點不習慣啦。」他笑著比了比自己的指尖。「不過慢慢來就好，不用跟別人比。」', 2),
        springStoreChoice('「算了，我还是觉得看你们弹比较轻松。」', '「哈哈哈哈，也可以啊。」他把琴型卡折好收起來，語氣仍然很輕。「不過哪天突然想學了，要記得跟我說。」', 2),
      ]),
    ],
    endingBlocks: [
      springStoreNarration('阿信把琴交還給店員，最後還問了一下剛才那兩把琴的型號。走到門口時，他回頭確認你有沒有跟上，手裡還捏著剛才那張琴型介紹卡。'),
      springStoreDialogue('陳信宏', '今天有沒有逛得開心？'),
      springStoreDialogue('陳信宏', '下次如果還想聽，我再彈給妳聽。'),
    ],
  },
  masa: {
    title: '瑪莎・Bass與樂器配件',
    blocks: [
      springStoreNarration('瑪莎一進門就直奔 Bass 區，拿起一包琴弦看了眼價格，眉毛立刻皺了起來。他把包裝翻過來又看了一次，像是不太相信上面的數字。'),
      springStoreDialogue('瑪莎', '……現在琴弦都這麼貴喔？'),
      springStoreDialogue('你', '你干嘛？买不起啊？'),
      springStoreDialogue('瑪莎', '妳講話真的很討打欸。'),
      springStoreDialogue('瑪莎', '我只是覺得這個價格很沒有道理。'),
      springStoreDialogue('你', '那你不要买啊。'),
      springStoreDialogue('瑪莎', '不買我拿什麼彈？'),
      springStoreDialogue('瑪莎', '妳到底是來陪我的，還是來氣我的？'),
      springStoreNarration('你忍不住笑了，他瞥你一眼，最後也跟著笑。接著他拿起一把展示 Bass 接上音箱，隨手彈了一段節奏感很強的低音。你原本以為低音會很單調，沒想到每一下都很有力量，連腳下的地板都像跟著震了兩下。'),
      springStoreDialogue('瑪莎', '怎樣？有沒有感覺？'),
      springStoreDialogue('你', '有！感觉地板都在震！'),
      springStoreDialogue('瑪莎', '那是妳站太近了啦！'),
    ],
    rounds: [
      springStoreRound([], '剛才那段 Bass 你聽得怎麼樣？', [
        springStoreChoice('「刚才那个低音好帅！再来一次！」', '「妳是來聽演唱會的喔？」他嘴上嫌棄，手上卻很誠實地又彈了一遍，最後還故意把尾音拖長。「這樣夠不夠？」', 3),
        springStoreChoice('「我觉得你弹得很像在蹦迪！」', '瑪莎先停了半秒，轉頭看你。「妳對低音的理解只有蹦迪是不是？」他故意彈出一段更誇張的節奏，還朝你挑了挑眉。「這樣呢？可以跳了嗎？」', 2),
        springStoreChoice('「原来 Bass 也可以这么好听！」', '「不然咧？」他挑了挑眉，又把琴往自己身前靠穩。「妳以為我們只是在旁邊裝飾喔？」', 2),
      ]),
      springStoreRound([
        springStoreNarration('店員拿來兩種規格的琴弦，瑪莎把包裝並排放在櫃檯上，先看粗細，再看價格，還不忘翻到背面確認規格。他把兩包推到你面前，自己蹲下來繼續研究價差。'),
        springStoreDialogue('瑪莎', '妳幫我看一下。'),
        springStoreDialogue('瑪莎', '這兩包差在哪？'),
        springStoreDialogue('你', '我哪知道啊！'),
        springStoreDialogue('瑪莎', '所以才叫妳看啊，又不是叫妳背規格。'),
      ], '你看著兩包琴弦，決定怎麼幫他。', [
        springStoreChoice('「你比较喜欢哪种？我帮你问店员。」', '「這個比較細，彈起來手感會不太一樣。」他站起來，和你一起走到店員旁邊，把兩包琴弦的規格問清楚。「欸，妳還滿有當助理的潛力嘛。」', 3),
        springStoreChoice('「我觉得便宜的比较好，省下来的钱请我吃饭。」', '「……妳算得還真精欸。」他把便宜的那包拿起來，在手裡掂了掂，最後還是放進購物籃。「好啦，這個月先不讓妳破產。」', 3),
        springStoreChoice('「你自己选啦，我又不是 Bass 专家。」', '「妳不是剛剛還講得頭頭是道？」他故意學你的語氣。「這個好帥！那個好好聽！」說完自己先笑了，還把兩包琴弦重新排好，繼續比對。', 2),
      ]),
      springStoreRound([
        springStoreNarration('瑪莎把挑好的琴弦交給店員結帳，你在旁邊等著，目光卻不自覺飄向隔壁的電吉他展示區。那幾把琴的漆面在燈光下亮得很漂亮，你多看了幾眼，身旁的人立刻察覺。'),
        springStoreDialogue('瑪莎', '欸。'),
        springStoreDialogue('瑪莎', '妳眼睛黏在那邊幹嘛？'),
        springStoreDialogue('你', '没有啊。'),
        springStoreDialogue('瑪莎', '少來。'),
        springStoreDialogue('瑪莎', '妳該不會想學吉他吧？'),
      ], '他一臉抓到新八卦的表情，你怎麼回答？', [
        springStoreChoice('「有一点啦，可是我完全是新手。」', '「那有什麼關係？」他把袋子掛在手上，語氣難得認真了一點。「先去練團室試試看啊，不要一開始就花錢買一堆東西，最後放著積灰塵。」', 3),
        springStoreChoice('「你觉得我适合学什么？」', '「這個問題要問妳自己吧。」他真的停下來想了一下。「不過妳要是學 Bass，以後我就有伴了。」他停了兩秒，立刻又改口。「算了，妳還是學吉他好了，免得跟我搶位置。」', 3),
        springStoreChoice('「我只是觉得它很好看而已！」', '「好喔。」他點點頭，一臉不相信。「那我先幫妳記著。等妳哪天真的跑來說要學，不要裝作今天沒看過。」', 2),
      ]),
    ],
    endingBlocks: [
      springStoreNarration('瑪莎結完帳，把琴弦和配件裝進袋子，走到門口還回頭看了一眼你剛才盯著的吉他。你以為他又要吐槽，結果他只是把袋子換到另一隻手上，示意你跟上。'),
      springStoreDialogue('瑪莎', '欸，妳今天還滿有用的嘛。'),
      springStoreDialogue('你', '？？？'),
      springStoreDialogue('瑪莎', '幫忙挑東西、聽聲音、還負責提供娛樂。'),
      springStoreDialogue('瑪莎', '下次可以再找妳。'),
      springStoreNarration('他說完就走，你在原地想了半天，才反應過來這到底算不算誇獎。'),
    ],
  },
  stone: {
    title: '石錦航・吉他與器材保養',
    blocks: [
      springStoreNarration('石頭今天要買一條新的吉他背帶，還有一些琴弦和保養用品。他不像溫尚翊那樣一進店就開始試音，而是先把要買的東西一項項看過，連包裝邊角和縫線都仔細確認。'),
      springStoreDialogue('石錦航', '這條看起來不錯。'),
      springStoreNarration('他拿起一條背帶，仔細看了看接縫，再把背帶搭在肩上試長度，轉過身讓你看。'),
      springStoreDialogue('你', '你买东西都这么认真吗？'),
      springStoreDialogue('石錦航', '差不多吧。'),
      springStoreDialogue('石錦航', '畢竟每天都要用，還是挑舒服一點的比較好。'),
      springStoreDialogue('石錦航', '妳覺得這樣好看嗎？'),
      springStoreDialogue('你', '嗯！很适合你欸。'),
      springStoreNarration('他低頭看了看肩上的背帶，像是對你的評價還挺滿意，嘴角也跟著揚了一點。'),
    ],
    rounds: [
      springStoreRound([], '你想幫他選哪一條背帶？', [
        springStoreChoice('「黑色那条比较适合你，简单又耐看。」', '「我本來也比較喜歡這條。」他把背帶重新搭在肩上，又轉過身給你看。「這樣看起來會不會太普通？」', 3),
        springStoreChoice('「我喜欢另一条，有一点特别。」', '「妳喜歡這種喔？」他拿起另一條認真看了一會兒，還用手摸了摸邊緣的材質。「好像也不錯，平常可以換著用。」', 2),
        springStoreChoice('「你戴哪条都好看啦！」', '「哈哈，妳這樣我很難選欸。」他笑著把兩條都拿在手裡，最後還是低頭看了看扣環和材質。「不過還是要選一條實用的。」', 3),
      ]),
      springStoreRound([
        springStoreNarration('店員拿來一些琴弦和清潔用品。石頭一邊確認規格，一邊向你解釋不同清潔布和琴弦的用途，語氣不急不徐，像是怕一次講太多你會記不住。'),
        springStoreDialogue('石錦航', '這個是擦琴身的。'),
        springStoreDialogue('石錦航', '平常彈完如果手汗留在上面，還是要稍微清理一下。'),
        springStoreDialogue('你', '你连这个都会自己弄啊？'),
        springStoreDialogue('石錦航', '會啊，自己的琴還是要照顧。'),
        springStoreNarration('他拿起一把展示電吉他，示範如何擦拭琴身，動作很輕，擦到邊角時還特地放慢了一點。'),
        springStoreDialogue('石錦航', '妳看，這樣就好。'),
      ], '聽他講解完，你想接什麼？', [
        springStoreChoice('「感觉你好像在照顾小孩！」', '「哈哈哈哈，有這麼誇張嗎？」他低頭看著琴，笑得有點無奈。「不過它真的陪我很久了，多少有感情啦。」', 3),
        springStoreChoice('「那你平常会自己换琴弦吗？」', '「會啊。」他拿起一包琴弦給你看。「這個其實不難，只是要有耐心。」隨後又補了一句：「妳有興趣的話，下次可以讓妳看看。」', 3),
        springStoreChoice('「我觉得你很适合当老师欸，讲得好认真。」', '「真的假的？」他笑著搖頭，像是被你說得有點不好意思。「那我可能要先準備一下，不然怕教不好。」', 2),
      ]),
      springStoreRound([
        springStoreNarration('店員把剛才那把展示電吉他放回架子旁。你忍不住多看了幾眼，石頭順著你的視線看過去，沒有直接替你做決定，而是先問了店員能不能試背。'),
        springStoreDialogue('石錦航', '想試試看嗎？'),
        springStoreDialogue('你', '可以吗？'),
        springStoreDialogue('石錦航', '可以啊，這是展示琴。'),
        springStoreNarration('他先幫你調整背帶長度，再扶著琴身，讓你慢慢把琴背起來。你低頭看著琴，卻發現自己根本不知道手該放在哪裡。'),
        springStoreDialogue('你', '怎么办，我看起来是不是很笨？'),
        springStoreDialogue('石錦航', '不會啊。'),
        springStoreDialogue('石錦航', '第一次拿琴本來就這樣。'),
      ], '你背著展示琴，想怎麼回應他？', [
        springStoreChoice('「你教我怎么拿嘛！」', '「好，先不要緊張。」他站到你旁邊，幫你把琴身稍微調整了一下，確認重量落得舒服才慢慢放手。「這樣就可以了，舒服一點嗎？」', 3),
        springStoreChoice('「你觉得我适合学吉他吗？」', '「我覺得可以試試看啊。」他看著你，回答得很認真。「喜不喜歡比較重要，不用先想適不適合。」', 3),
        springStoreChoice('「我突然觉得你们每天练琴好辛苦。」', '「哈哈，習慣了就好。」他接過琴，隨手彈了幾個音。「不過如果真的喜歡，就不會覺得那麼辛苦了。」', 2),
      ]),
    ],
    endingBlocks: [
      springStoreNarration('石頭把自己的東西結完帳，順手幫你拿著外套，一起走出樂器行。外頭的天色已經慢慢暗下來，他沒有急著往前走，等你把外套穿好才並肩離開。'),
      springStoreDialogue('石錦航', '今天謝謝妳陪我來。'),
      springStoreDialogue('石錦航', '下次如果妳想試琴，也可以再來。'),
      springStoreDialogue('石錦航', '不用急著學，慢慢來就好。'),
    ],
  },
  yanming: {
    title: '劉諺明・鼓組器材區',
    blocks: [
      { kind: 'narration', text: '諺明推開樂器行的玻璃門，先跟店員打了聲招呼。看得出來他對這裡並不陌生，進門後便熟門熟路地往打擊樂器區走。' },
      { kind: 'narration', text: '他手裡拿著一張折起來的清單，上面密密麻麻寫著鼓棒、鼓皮、導線，還有幾樣你根本叫不出名字的器材。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '今天要買的東西有點多，妳可能要陪我逛一陣子了。' },
      { kind: 'dialogue', speaker: '你', text: '你這清單也太長了吧？到底要買多少東西啊？' },
      { kind: 'dialogue', speaker: '劉諺明', text: '哈哈，練團室有些東西該換了，剛好今天有空，想說一次買齊。' },
      { kind: 'narration', text: '他把清單遞給你看。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '而且有些東西還是自己挑比較放心。' },
      { kind: 'narration', text: '走到鼓棒展示架前，他拿起兩副不同規格的鼓棒，在掌心輕輕掂了掂，隨後又拿起其中一副，在旁邊的練習墊上敲了幾下。' },
      { kind: 'narration', text: '哒、哒哒、哒。原本只是簡單的試音，到了他手裡卻自然地變成了一小段節奏。手腕輕輕一轉，鼓棒便在指間換了個方向。' },
      { kind: 'dialogue', speaker: '你', text: '欸，你剛剛是在隨便打嗎？' },
      { kind: 'dialogue', speaker: '劉諺明', text: '算是吧，習慣了。' },
      { kind: 'narration', text: '他笑著把另一副鼓棒遞給你。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '妳拿拿看，這兩副重量不太一樣。' },
    ],
    rounds: [
      {
        scene: [
          { kind: 'narration', text: '你接過鼓棒，發現它比想像中輕不少。諺明站在旁邊，拿著另一副給你比較。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '這副比較輕，這副稍微重一點。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '妳覺得哪個拿起來比較順手？' },
        ],
        prompt: '你拿著兩副鼓棒，想怎麼回答？',
        choices: [
          { text: '「這副比較輕，感覺比較容易控制！」', response: '「這副確實比較輕。」他接過鼓棒，示範了一下握法。「不過也不一定越輕越好，還是要看自己習慣的手感。」他又把鼓棒遞給妳。「妳再試試看，手腕放鬆一點。」', affection: 3 },
          { text: '「我覺得重一點的比較有感覺！」', response: '「哈哈，喜歡有份量的喔？」他把較重的那副拿起來，在練習墊上敲了幾下。「這種打起來會比較有重量感，不過打久了也比較考驗手腕。」他看妳握得緊緊的，忍不住提醒：「不用握那麼用力啦，放輕鬆。」', affection: 2 },
          { text: '「我根本分不出來，你示範給我看！」', response: '「好啊，那妳聽聽看。」他先用輕一點的鼓棒敲了一段，再換成另一副。兩種鼓棒碰上練習墊時，聲音和回彈都有些不同。「有沒有聽出來？」他看妳認真比較的樣子，笑著補了一句：「其實這個要多試幾次才會有感覺，不用急。」', affection: 2 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '挑好鼓棒後，諺明又拿著清單去看鼓皮和導線。他拿起一張鼓皮，仔細檢查表面，又用指節輕輕敲了敲，隨後轉頭問店員規格和耐用程度。' },
          { kind: 'narration', text: '店員拿來兩條不同規格的導線，諺明把它們接上展示音箱，逐一測試接頭和聲音。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '這些東西平常都會用到，如果品質不好，沒多久又要換一次，反而更麻煩。' },
          { kind: 'narration', text: '他把兩條導線拿到你面前。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '妳幫我看一下，這兩條哪個比較好？' },
          { kind: 'dialogue', speaker: '你', text: '我又不懂這些……' },
          { kind: 'dialogue', speaker: '劉諺明', text: '沒關係啊，妳先看看外觀也可以。我再跟妳說差在哪裡。' },
        ],
        prompt: '你看著他手上的兩條導線，想怎麼回答？',
        choices: [
          { text: '「這條看起來比較結實，應該比較耐用吧？」', response: '「妳眼光不錯，這條接頭的地方確實比較扎實。」他把導線拿起來檢查了一遍。「不過還是要實際接上去測試，不能只看外表。」說著便請店員拿來設備試接。', affection: 3 },
          { text: '「我覺得另一條比較好看！」', response: '「哈哈，妳是來挑好看的喔？」他忍不住笑了，隨後把兩條導線並排放在一起。「不過也不是不行啦，至少妳有認真看。」', affection: 2 },
          { text: '「你是老闆，你決定啦，我負責陪你就好。」', response: '「那妳今天的工作很輕鬆欸。」他笑著把導線收回來。「不過有妳陪我逛，確實比較不無聊。」', affection: 3 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '採購得差不多後，諺明帶你走到旁邊的試打區。裡面擺著一套完整的架子鼓，旁邊還有幾個練習墊。' },
          { kind: 'narration', text: '他把剛才挑好的鼓棒放在一旁，坐到鼓椅上。' },
          { kind: 'dialogue', speaker: '你', text: '這個也可以試嗎？' },
          { kind: 'dialogue', speaker: '劉諺明', text: '可以啊。妳先看我打一遍。' },
          { kind: 'narration', text: '他調整了一下鼓椅的高度，拿起鼓棒，先敲了幾下踩镲，接著加入軍鼓和底鼓。簡單的節奏在他手裡變得格外穩當，隨後他又加了一段變化，手腕和腳上的動作配合得十分自然。最後一個乾脆的收尾，整個試打區都安靜了下來。' },
          { kind: 'dialogue', speaker: '你', text: '哇……你剛剛那個好帥！' },
          { kind: 'dialogue', speaker: '劉諺明', text: '哈哈，有嗎？' },
          { kind: 'narration', text: '他把鼓棒遞給你。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '換妳試試看。不用緊張，我先教妳最簡單的。' },
        ],
        prompt: '你看著面前的練習墊，決定怎麼試。',
        choices: [
          { text: '「好！你教我，我想試試！」', response: '他把練習墊調整到妳面前，自己站在旁邊。「先跟著我，右、左、右、左。」他放慢速度，妳認真跟著敲了幾下，結果越敲越快，最後直接亂了節奏。「哈哈哈哈，沒關係，妳跑得有點快喔。」他重新敲了一遍，這次刻意放慢速度。「來，再一次。先聽節奏，不用急著追。」', affection: 3 },
          { text: '「我怕我打得很難聽欸！」', response: '「這裡又沒有人考試。」他笑著敲了兩下練習墊。「妳先試試看，不用怕打錯。」妳小心翼翼地敲了幾下，雖然動作有點僵硬，但總算跟上了節奏。「很好，這次有抓到拍子了。手腕再放鬆一點，會更自然。」', affection: 3 },
          { text: '「你先打一个很帥的給我看！」', response: '「哈哈，好啊。」他坐回鼓組前，先敲出一段乾淨俐落的節奏，接著突然加速，手上的鼓棒在鼓面與镲片之間靈活地切換，最後用一個漂亮的收尾停住。「這樣算帥嗎？」他看著你驚訝的表情，難得露出一點得意的笑。', affection: 2 },
        ],
      },
      {
        scene: [
          { kind: 'narration', text: '你把鼓棒放回架子上，手指還在回味剛才敲擊時的感覺。諺明把鼓棒收好，轉過頭看你。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '怎麼樣？剛剛有沒有覺得好玩？' },
          { kind: 'dialogue', speaker: '你', text: '還蠻有意思的！不過感覺好難哦。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '第一次都這樣啦。' },
          { kind: 'narration', text: '他把鼓棒放進袋子，隨後又問：' },
          { kind: 'dialogue', speaker: '劉諺明', text: '妳以前有想過學打鼓嗎？' },
        ],
        prompt: '他看著你，等你回答。',
        choices: [
          { text: '「有欸！剛才雖然一直打錯，但還挺好玩的！」', response: '「那很好啊。」他笑著點點頭。「下次有空來練團室，我可以再教妳。先從基本節奏開始，不用一下子學太多。」', affection: 3 },
          { text: '「感覺好難哦，我剛才根本跟不上！」', response: '「哈哈，第一次都會這樣。」他拿起鼓棒，又示範了一遍剛才的節奏。「打鼓不是只靠手快，慢慢練就會進步。不用跟別人比，先把自己的拍子抓穩就好。」', affection: 3 },
          { text: '「我覺得你剛才打鼓的樣子很帥，所以才想試試！」', response: '「喔？原來是這樣。」他愣了一下，隨後笑了起來。「那妳剛剛應該看得比聽得還認真吧？」他把鼓棒放回袋子裡，語氣仍然溫和。「不過想學的話，我也可以教妳。」', affection: 3 },
        ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '諺明最後核對了一遍清單，確認鼓棒、鼓皮和導線都買齊了，才提起購物袋。離開前，他還回頭跟店員確認了一下剛才那套展示鼓組的配置。' },
      { kind: 'dialogue', speaker: '你', text: '你今天買這麼多東西，應該花不少錢吧？' },
      { kind: 'dialogue', speaker: '劉諺明', text: '還好啦，都是該換的東西。' },
      { kind: 'dialogue', speaker: '你', text: '老闆的錢包是不是在哭？' },
      { kind: 'dialogue', speaker: '劉諺明', text: '哈哈哈哈，妳不要亂講。' },
      { kind: 'narration', text: '他提著袋子走在你旁邊，突然想起什麼似的，又轉頭看你。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '對了，妳剛剛試的那副鼓棒，拿起來好像還滿順手的。我記得型號了。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '下次如果想練，我幫妳準備一副。' },
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

const springSmsChoice = (text: string, response: string[], affection = 2): SpringSmsChoice => ({ text, response, affection })
const springSmsRound = (incoming: string, choices: SpringSmsChoice[]): SpringSmsRound => ({ incoming, choices })

const springYanmingOwnerSmsRounds = (replies: number[]): SpringSmsRound[] => {
  const r0 = replies[0] ?? 0
  const r1 = replies[1] ?? 0
  const r2 = replies[2] ?? 0
  const r3 = replies[3] ?? 0
  return [
    springSmsRound('對了，妳下次要來店裡，先傳個訊息給我吧。有時候我在裡面忙，怕妳站在外面等。', [
      springSmsChoice('「我哪有等很久啦，我可以自己找地方坐。」', ['「妳是可以啊，不過妳每次都客氣地說沒關係，我還是怕妳白等。」'], 3),
      springSmsChoice('「那你要記得看手機，不要訊息放半天。」', ['「好，這個提醒合理。我把手機放在看得到的地方。」'], 3),
      springSmsChoice('「你這樣講得好像很期待我去欸。」', ['「……我是怕妳白跑一趟啦。妳要這樣想，我也沒辦法。」'], 4),
    ]),
    springSmsRound(
      r0 === 0
        ? '妳剛才說可以自己找地方坐，我倒是想到，妳每次來都會先說「沒關係，你先忙」。'
        : r0 === 1
          ? '我剛把手機放到櫃檯旁邊了，這樣有訊息就看得到，不會又漏掉。'
          : '妳今天倒是很會把話繞回來，我只是怕妳白跑一趟而已。',
      r0 === 0
        ? [
            springSmsChoice('「因為我知道你忙啊，又不是第一次來。」', ['「我知道妳體諒，不過也不用每次都站在旁邊等我。」'], 3),
            springSmsChoice('「那你下次忙完要記得來找我。」', ['「好，答應妳。忙完我就過去。」'], 4),
            springSmsChoice('「你是不是覺得我很乖？」', ['「妳偶爾是滿乖的啦，偶爾而已。」'], 3),
          ]
        : r0 === 1
          ? [
              springSmsChoice('「這才對嘛，不然我傳訊息都像丟進海裡。」', ['「不會了，至少今天開始不會。」'], 3),
              springSmsChoice('「你真的有放下來喔？我不信。」', ['「有啦，妳要不要現在傳一個來測試？」'], 3),
              springSmsChoice('「那我下次就不客氣了，想到什麼都傳。」', ['「可以啊，只要不是半夜叫我去搬器材就好。」'], 2),
            ]
          : [
              springSmsChoice('「好啦，知道你是怕我白跑，不是怕我去。」', ['「嗯，這樣理解就對了。」'], 3),
              springSmsChoice('「你解釋得這麼快，反而很可疑喔。」', ['「我只是把話講清楚，妳不要一直套我話。」'], 3),
              springSmsChoice('「那我下次真的去，你不准躲在裡面忙。」', ['「好，先把時間留給妳。」'], 4),
            ]),
    springSmsRound(
      r1 === 0
        ? '我剛才把明天的預約簿重新對了一遍，下午有個時段臨時改了，還好現在才看到。'
        : r1 === 1
          ? '手機放在旁邊之後，才發現其實看一眼訊息也花不了多少時間。'
          : '我剛把櫃檯收好，今天的事情總算告一段落了。',
      r1 === 0
        ? [
            springSmsChoice('「你看吧，還是先整理好比較安心。」', ['「對啊，先確認好，明天才不會臨時手忙腳亂。」'], 3),
            springSmsChoice('「那你現在可以放心回家了吧？」', ['「可以了，剩下的明天再處理。」'], 3),
            springSmsChoice('「你是不是連休息都要排進行程表？」', ['「被妳發現了，這個習慣可能真的改不掉。」'], 2),
          ]
        : r1 === 1
          ? [
              springSmsChoice('「你看，沒有想像中那麼難吧。」', ['「嗯，這次算妳說得有道理。」'], 3),
              springSmsChoice('「那我以後可以放心傳訊息了？」', ['「可以啊，不過我忙的時候可能還是會晚一點回。」'], 3),
              springSmsChoice('「很好，老闆終於學會看手機了。」', ['「不要講得像我剛學會用手機一樣。」'], 2),
            ]
          : [
              springSmsChoice('「今天辛苦啦，終於能喘口氣了。」', ['「是啊，忙完坐下來才覺得肩膀有點酸。」'], 3),
              springSmsChoice('「那你快回家，不要又留下來找事情做。」', ['「好，這次不拖了。」'], 3),
              springSmsChoice('「我下次去再聽你講今天遇到什麼客人。」', ['「好啊，有些事當面講比較有趣。」'], 3),
            ]),
    springSmsRound(
      r2 === 0
        ? '妳剛才說先整理好比較安心，我也覺得。事情一件件收好，腦袋才不會一直掛著。'
        : r2 === 1
          ? '妳說手機放旁邊就看得到，這個方法還真的有用，剛剛又收到一個改時間的訊息。'
          : '妳說下次來再聽我講客人的事，我先記著，有些真的當面講比較有趣。',
      [
      springSmsChoice('「所以我去找你聊天，算是幫你調劑生活嗎？」', ['「算啊，不過妳不要因此要求加薪。」'], 3),
      springSmsChoice('「你平常都自己顧店，不會覺得無聊嗎？」', ['「忙起來不會，安靜下來偶爾會。有人說說話也很好。」'], 3),
      springSmsChoice('「那我以後常去，免得你太無聊。」', ['「好啊，來之前傳訊息就好，我幫妳留時間。」'], 4),
    ]),
    springSmsRound(
      r3 === 0
        ? '好啦，今天就先不談工作了。妳也早點休息，明天還有自己的事要忙。'
        : r3 === 1
          ? '我準備回去了，到了再跟妳說一聲。妳不用等訊息等到太晚。'
          : '妳說下次來不准我裝忙，我記住了。到時候我先把時間空出來。',
      [
      springSmsChoice('「晚安諺明哥，回去好好休息！」', ['「好，妳也是。明天見。」'], 3),
      springSmsChoice('「下次不准又把自己排得滿滿的喔。」', ['「知道了，我會留一點空檔。」'], 3),
      springSmsChoice('「我下次去店裡再找你，記得不要裝忙。」', ['「好啦，妳來我就知道了。」'], 3),
    ]),
  ]
}

const springYanmingSharedSmsRounds = (context: SpringDayContext, replies: number[]): SpringSmsRound[] => {
  const wentStore = context.storeCharacter === 'yanming'
  const ateDinner = context.afterChoice === 'yanming-dinner'
  const dessert = context.dinnerReplies?.[5]
  const r1 = replies[1] ?? 0

  if (ateDinner) return [
    springSmsRound(
      dessert === 0 || dessert === 2
        ? '妳剛剛那碗紅豆湯吃得很認真，我差點以為還要再幫妳叫一碗。'
        : '剛剛看妳吃到最後真的飽了，我就沒再勸妳點甜湯。吃舒服比較重要。',
      dessert === 0 || dessert === 2
        ? [
            springSmsChoice('「那碗真的很好吃啊，我差點想把最後一口也留著。」', ['「看得出來，妳吃得很滿足，我就放心了。」'], 3),
            springSmsChoice('「我是真的吃不下了，再吃會走不動啦。」', ['「我知道，所以才沒勉強妳。下次還有機會再吃。」'], 2),
            springSmsChoice('「你剛剛也吃得很開心吧？」', ['「有啊，難得不用趕時間，慢慢吃一頓很好。」'], 3),
          ]
        : [
            springSmsChoice('「我是真的飽了，再吃會走不動啦。」', ['「我知道，所以才沒勉強妳。吃舒服比較重要。」'], 2),
            springSmsChoice('「你剛剛沒有一直勸我點甜湯，這點很加分。」', ['「妳都說吃不下了，我還勸什麼。」'], 3),
            springSmsChoice('「下次我還有胃口的話，再來補一碗。」', ['「好啊，店又不會跑掉，下次再吃。」'], 3),
          ]),
    springSmsRound(
      wentStore
        ? '今天先陪妳看器材，後來又一起吃飯，時間一下就過去了。'
        : '今天那家店的老闆還記得我，問我最近怎麼比較少過去。聊了幾句，才發現以前常去的地方都沒變。',
      wentStore
        ? [
            springSmsChoice('「我也覺得時間過好快，還有點意猶未盡。」', ['「我也是，今天一下子就從店裡逛到吃飯了。」'], 3),
            springSmsChoice('「你剛剛挑器材時還很認真，坐下來吃飯才終於放鬆。」', ['「被妳看出來了，事情確認好，吃飯就不用一直惦記。」'], 2),
            springSmsChoice('「下次換我帶你去我喜歡的店！」', ['「好啊，那我就等妳推薦了。」'], 3),
          ]
        : [
            springSmsChoice('「難怪你跟老闆那麼熟，感覺你以前常常去欸。」', ['「以前比較常去，最近事情多，倒是有一陣子沒去了。」'], 2),
            springSmsChoice('「你剛剛跟老闆聊得很自在，真的像老朋友。」', ['「認識一陣子了，每次來都會聊幾句。」'], 2),
            springSmsChoice('「下次換我帶你去我喜歡的店！」', ['「好啊，那我就等妳推薦了。」'], 3),
          ]),
    springSmsRound(
      wentStore
        ? r1 === 0
          ? '妳剛剛說時間過得很快，我也覺得，從店裡逛到飯桌，一路上都沒有冷場。'
          : r1 === 1
            ? '妳說我挑器材時很認真，東西要合用，買回來才不會麻煩。'
            : '妳說下次要帶我去妳喜歡的店，那我可先把這句記下來了。'
        : r1 === 0
          ? '妳剛剛說有點意猶未盡，我也覺得，難得今天不用趕著吃完就走。'
          : r1 === 1
            ? '以前練團完常常來這裡，老闆也知道我們的習慣，所以一看到我就先打招呼。'
            : '妳說要帶我去妳喜歡的店，那我就等妳推薦了。',
      wentStore
        ? r1 === 0
          ? [
              springSmsChoice('「我本來以為看器材會很無聊，結果還滿有趣的。」', ['「有妳一起看，就不會只是對著規格表發呆。」'], 3),
              springSmsChoice('「我也覺得，今天好像一下子就過去了。」', ['「那下次再找個不用趕時間的下午。」'], 3),
              springSmsChoice('「下次還要一起去，然後再找好吃的。」', ['「好啊，這個安排不錯。」'], 3),
            ]
          : r1 === 1
            ? [
                springSmsChoice('「你真的很替大家著想欸。」', ['「都是大家要用的，先看清楚比較好。」'], 3),
                springSmsChoice('「那你也要替自己想想，不要只顧店裡。」', ['「好，我會記得，妳也別只顧著操心我。」'], 3),
                springSmsChoice('「下次我也要幫你看清單。」', ['「好啊，這次妳有幫上忙。」'], 2),
              ]
            : [
                springSmsChoice('「不准忘喔，我會抽查。」', ['「好，等妳帶路。」'], 3),
                springSmsChoice('「我怕你吃不習慣，先說好不准嫌。」', ['「我哪有那麼挑，先去再說。」'], 2),
                springSmsChoice('「你到時候負責吃，我負責點。」', ['「那我就放心了，妳負責安排。」'], 3),
              ]
        : r1 === 0
          ? [
              springSmsChoice('「下次再約一次，不要每次都等練團結束。」', ['「好啊，找個時間，慢慢吃。」'], 3),
              springSmsChoice('「你平常都這麼忙嗎？難怪很久沒來。」', ['「最近事情比較多，不過還是會找時間出來吃飯。」'], 2),
              springSmsChoice('「我還想跟你聊更多，今天有點不夠。」', ['「那下次再慢慢聊，不用一次講完。」'], 3),
            ]
          : r1 === 1
            ? [
                springSmsChoice('「難怪老闆一看到你就招呼，真的很熟欸。」', ['「來久了自然就熟，老闆人也很好。」'], 2),
                springSmsChoice('「你以前常跟誰一起來？」', ['「有時候跟大家，有時候自己來。」'], 2),
                springSmsChoice('「下次我也要變成這裡的熟客。」', ['「好啊，下次帶妳來，老闆很快就會記住妳。」'], 3),
              ]
            : [
                springSmsChoice('「我先想一下，不能隨便帶你去。」', ['「好，不急，妳慢慢挑。」'], 2),
                springSmsChoice('「我有好多家想帶你去。」', ['「那我可能要留幾個晚上給妳了。」'], 3),
                springSmsChoice('「你不准嫌棄我選的店。」', ['「不會啦，妳推薦的我先試試看。」'], 3),
            ]),
    springSmsRound('我把明天店裡的事情先排好了，今天就不再想工作了。', [
      springSmsChoice('「很好，今天下班了就不准再想店裡的事。」', ['「好，今天聽妳的。」'], 3),
      springSmsChoice('「你做事真的很讓人放心。」', ['「謝謝妳，這句我收下了。」'], 3),
      springSmsChoice('「下次吃飯不要又聊到忘記時間。」', ['「那要看妳會不會又講到有趣的事。」'], 2),
    ]),
    springSmsRound('今天謝謝妳一起吃飯。回去早點休息，下次想吃什麼再跟我說。', [
      springSmsChoice('「我也很開心，晚安諺明哥！」', ['「晚安，回去路上小心。」'], 3),
      springSmsChoice('「下次換我請你，不准搶著結帳。」', ['「好啊，那我就不跟妳客氣了。」'], 3),
      springSmsChoice('「晚安，你也不要忙到太晚。」', ['「好，我會記得。晚安。」'], 2),
    ]),
  ]

  if (wentStore) return [
    springSmsRound('今天在鼓棒那邊，妳拿起來比了好幾支，最後挑的那支重量剛好。妳的眼光其實不錯。', [
      springSmsChoice('「我只是怕挑錯，回去還要被你退貨。」', ['「不會啦，尺寸和重量都合適，這次挑得很好。」'], 2),
      springSmsChoice('「你自己明明也比較了很久，還說我。」', ['「器材還是要確認清楚，買回去大家才用得順手。」'], 2),
      springSmsChoice('「你剛剛有看到我偷偷拿另一支嗎？」', ['「有啊，不過妳最後還是選了比較合手的那支。」'], 3),
    ]),
    springSmsRound('我把今天確認過的規格寫進清單了，下一次補貨就不用再從頭查。', [
      springSmsChoice('「你那張清單真的很有用，感覺什麼都不會漏掉。」', ['「習慣先記下來，忙的時候才不會忘。」'], 2),
      springSmsChoice('「你連這種小地方都記得，真的很細心。」', ['「店裡要用的東西，還是仔細一點比較好。」'], 2),
      springSmsChoice('「下次我還要幫你挑，這次我有經驗了。」', ['「好啊，下次再讓妳當一次顧問。」'], 3),
    ]),
    springSmsRound('店員還問我是不是每次都列這麼細，我說習慣了，不然買錯一次，大家都得等。', [
      springSmsChoice('「你真的很替大家著想欸。」', ['「都是一起用的東西，先確認好比較省事。」'], 3),
      springSmsChoice('「那你有沒有自己的購物清單？還是只記店裡的？」', ['「自己的東西反而比較隨便，這點可能要改一下。」'], 2),
      springSmsChoice('「下次你也列一張給我，我要看看有多誇張。」', ['「可以啊，不過妳不要拿去笑我。」'], 2),
    ]),
    springSmsRound('今天謝謝妳陪我跑一趟，有人一起看，確實比我自己慢慢比快一些。', [
      springSmsChoice('「不客氣啦，我也覺得很有趣。」', ['「那就好，下次有需要再一起去。」'], 3),
      springSmsChoice('「那下次要請我吃東西，顧問不能白當。」', ['「好，這次先記帳，下次補給妳。」'], 3),
      springSmsChoice('「你不用每次都這麼客氣啦。」', ['「習慣了，還是要跟妳說聲謝謝。」'], 2),
    ]),
    springSmsRound('今天先這樣吧，妳回去早點休息。下次店裡有需要補的東西，我再問妳有沒有空。', [
      springSmsChoice('「好啊，有需要再叫我。」', ['「好，晚安，路上小心。」'], 3),
      springSmsChoice('「下次不要只找我做苦力喔。」', ['「不會啦，至少會先請妳吃東西。」'], 3),
      springSmsChoice('「晚安，清單先生。」', ['「晚安，妳也早點休息。」'], 2),
    ]),
  ]

  return springYanmingOwnerSmsRounds(replies)
}

const springYanmingSmsOpeners = (context: SpringDayContext): { text: string; response: string; affection: number }[] => {
  if (context.afterChoice === 'yanming-dinner') {
    const hadDessert = context.dinnerReplies?.[5] === 0 || context.dinnerReplies?.[5] === 2
    return [
      {
        text: hadDessert ? '「我到家了，那碗紅豆湯真的很好吃。」' : '「我到家了，今天吃得好飽，差點不想走路。」',
        response: hadDessert ? '「到家就好。看妳吃得開心，我也覺得這家店沒帶錯。」' : '「那就好，剛剛看妳真的吃得很飽，我還怕妳走回去不舒服。」',
        affection: 3,
      },
      { text: '「今天謝謝你帶我去吃飯，感覺整個人都放鬆下來了。」', response: '「不客氣，偶爾停下來吃頓飯也很好，妳開心就好。」', affection: 3 },
      { text: '「下次換我帶你去吃我喜歡的店！」', response: '「好啊，那我就等妳推薦了。」', affection: 3 },
    ]
  }
  if (context.storeCharacter === 'yanming') return [
    { text: '「今天陪你去看器材還滿有趣的，原來你連鼓棒都要比較半天。」', response: '「習慣了，東西要合用才行。不過有妳一起看，確實快很多。」', affection: 2 },
    { text: '「我回家才發現自己好像也學會看一點規格了。」', response: '「那很好啊，下次再去就知道要注意哪些地方了。」', affection: 2 },
    { text: '「下次還要找我一起去，不准自己偷偷跑掉。」', response: '「好啊，有需要我再問妳。今天謝謝妳陪我。」', affection: 3 },
  ]
  return [
    { text: '「我到家了～你那邊也收工了嗎？」', response: '「剛鎖好門，正準備走。今天比平常晚一點。」', affection: 3 },
    { text: '「諺明哥，你今天是不是又把茶放到冷掉了？」', response: '「妳怎麼又記得這件事。剛剛才喝完，今天有乖乖喝掉。」', affection: 3 },
    { text: '「剛才走太快，忘記跟你說晚安了。」', response: '「沒關係啦，妳有平安到家就好。我這邊也差不多收完了。」', affection: 3 },
  ]

}



type SpringMemberSmsId = Exclude<SpringCharacterId, 'yanming'>

const springNaturalMemberSmsOpeners = (character: SpringMemberSmsId, context: SpringDayContext): { text: string; response: string; affection: number }[] => {
  const wentStore = context.storeCharacter === character
  const learned = context.lessonCharacter === character
  const touched = context.lessonReplies?.[4] === 0

  if (learned) {
    if (character === 'wen') return touched
      ? [
          { text: '「我剛剛摸到你手上的繭，真的比看起來粗欸。」', response: '「不然咧，練這麼多年是裝飾喔？妳剛才倒是摸得滿認真的。」', affection: 3 },
          { text: '「你剛剛突然把手收回去，我還以為我弄痛你了。」', response: '「沒有啦！是妳突然抬頭看我，我一時不知道要看哪裡。」', affection: 3 },
          { text: '「我比較在意你耳朵怎麼紅了。」', response: '「蛤？妳今天是來學吉他，還是來檢查我耳朵的？」', affection: 4 },
        ]
      : [
          { text: '「我回家才發現手指真的有點酸，今天玩太多了啦。」', response: '「現在才發現喔？妳剛剛每個和弦都要再試一次，當然會酸。」', affection: 2 },
          { text: '「你剛剛明明一臉很認真，結果還是有偷笑我。」', response: '「我哪有笑妳，是妳那個表情真的很好笑……欸，不是啦，是很有趣。」', affection: 3 },
          { text: '「撥片我收好了，不准反悔喔。」', response: '「送妳就送妳，誰跟妳反悔啦。收好，不要又弄丟。」', affection: 3 },
        ]
    if (character === 'ashin') return touched
      ? [
          { text: '「剛剛摸到你指尖的時候，我真的有點不敢用力。」', response: '「我有感覺到妳很小心啊。沒關係的，不用那麼緊張。」', affection: 3 },
          { text: '「原來你手上的繭摸起來是這種感覺，跟我想像的不太一樣。」', response: '「是不是？看起來薄薄的，摸起來其實有一點硬。」', affection: 2 },
          { text: '「你剛剛一直讓我慢慢看，我反而有點不好意思。」', response: '「欸～我只是想讓妳看清楚而已，沒有要讓妳尷尬啦。」', affection: 3 },
        ]
      : [
          { text: '「我回家還在想剛剛那個和弦，終於有一次彈得很清楚。」', response: '「有啊，我有聽到。妳那時候自己也愣了一下，然後才笑出來。」', affection: 3 },
          { text: '「你一直叫我慢慢來，害我真的沒那麼緊張了。」', response: '「那就好啊，第一次本來就不用急，妳願意試就很棒了。」', affection: 3 },
          { text: '「我還記得你坐在旁邊陪我，一直沒有催我。」', response: '「我又不趕時間。看妳慢慢抓到那個聲音，我也滿開心的。」', affection: 3 },
        ]
    if (character === 'masa') return touched
      ? [
          { text: '「檢查報告還沒寫完，老師先不要急著下課。」', response: '「欸，妳還真的要寫喔？那記得寫優點，不准只挑毛病。」', affection: 3 },
          { text: '「我只是好奇，誰叫你的手看起來不像會長繭。」', response: '「妳是把我當成每天坐辦公室的人喔？Bass不是拿來擺好看的。」', affection: 2 },
          { text: '「你剛剛明明一直在笑，還裝得很鎮定。」', response: '「我是在配合檢查員，服務態度要好一點嘛。」', affection: 3 },
        ]
      : [
          { text: '「我現在手指還在抗議，Bass真的不是看起來那麼簡單。」', response: '「現在知道了吧？剛剛還一副很有把握的樣子。」', affection: 2 },
          { text: '「你今天吐槽歸吐槽，還是有把我教會一點點。」', response: '「一點點也是進步啦，妳不要急著領獎。」', affection: 3 },
          { text: '「下次我要練到你沒話可以吐槽。」', response: '「這個目標很遠大，我先幫妳記在行事曆上。」', affection: 3 },
        ]
    return touched
      ? [
          { text: '「剛剛摸到你指腹的繭，比我想像中粗一點。」', response: '「有一點吧，練久了就會這樣。妳剛剛碰得很輕，我有感覺到。」', affection: 3 },
          { text: '「你一直把手攤著讓我看，我反而不知道要說什麼了。」', response: '「沒關係啊，不用特別說什麼。妳只是好奇而已。」', affection: 3 },
          { text: '「我本來怕你會覺得我很奇怪，結果你比我還自然。」', response: '「我只是覺得沒什麼好尷尬的，妳不用一直想太多。」', affection: 3 },
        ]
      : [
          { text: '「我回家還記得最後那次換和弦，真的順過去了！」', response: '「我有看到，妳那一下整個人都放鬆了，聲音也乾淨很多。」', affection: 3 },
          { text: '「謝謝你一直等我，我前面真的卡了好久。」', response: '「不用謝啊，妳後來有抓到就好。前面多試幾次很正常。」', affection: 3 },
          { text: '「你剛剛沒有催我，我反而比較敢一直試。」', response: '「那就照這個速度來，下次也不用怕按錯。」', affection: 3 },
        ]
  }

  if (wentStore) {
    if (character === 'wen') return [
      { text: '「你不是說只是看看？結果在效果器那邊蹲到差點忘記我。」', response: '「欸，我哪有忘記妳？妳不是也踩得很開心，還踩第二次。」', affection: 2 },
      { text: '「我回家還記得那顆效果器一踩下去的聲音，真的差好多。」', response: '「那顆不錯吧，聲音厚起來很有感覺，拿去表演也很適合。」', affection: 2 },
      { text: '「下次換我自己試，你不准先幫我按。」', response: '「好啦，讓妳自己玩。這次我站旁邊，看妳會不會又踩太早。」', affection: 3 },
    ]
    if (character === 'ashin') return [
      { text: '「今天那兩把木吉他的聲音，我到現在還分得出來。」', response: '「妳耳朵滿仔細的耶，第一把比較厚，第二把亮一點。」', affection: 2 },
      { text: '「我抱著那把琴的時候，真的有點不知道手要放哪裡。」', response: '「我有看到啦，所以才幫妳把位置調好。後來是不是舒服多了？」', affection: 2 },
      { text: '「你剛剛彈給我聽的那段，我回家還在哼。」', response: '「真的喔？那我下次再彈給妳聽，這次讓妳聽完整一點。」', affection: 3 },
    ]
    if (character === 'masa') return [
      { text: '「你今天盯著琴弦標價的眼神，真的很像在查帳。」', response: '「價差那麼大，不看清楚是要當冤大頭喔？」', affection: 2 },
      { text: '「你最後還是買了那包比較貴的，嘴上嫌半天欸。」', response: '「規格差那麼多，便宜也不能亂買好不好。」', affection: 2 },
      { text: '「下次再去，我要負責挑東西，你負責不要吐槽。」', response: '「這個分工有點困難，我盡量啦。」', affection: 3 },
    ]
    return [
      { text: '「你最後選的那條背帶，我越想越覺得很適合你。」', response: '「謝謝，妳剛剛幫我看了好幾次，我自己也比較放心。」', affection: 2 },
      { text: '「今天才知道，原來挑一條背帶也要看這麼多細節。」', response: '「背起來舒服最重要，外型再慢慢挑就好。」', affection: 2 },
      { text: '「下次我還想再試試看那把展示琴。」', response: '「好啊，下次有空再一起去，不用急。」', affection: 3 },
    ]
  }

  if (character === 'wen') return [
    { text: '「佑達今天那個鼓花真的太誇張，我回家還在笑。」', response: '「妳還不是笑最大聲的那個，少裝啦。」', affection: 2 },
    { text: '「最後那一遍你彈得很帥，我有看到你自己也很滿意。」', response: '「有接起來就好，不然前面被佑達鬧成那樣就白練了。」', affection: 3 },
    { text: '「我今天坐在旁邊，差點被你們的音量震到。」', response: '「那妳下次坐遠一點啦，免得又怪我們太吵。」', affection: 2 },
  ]
  if (character === 'ashin') return [
    { text: '「今天第一遍真的有點失控，佑達一加鼓花，我差點笑到聽不見你唱歌。」', response: '「欸～我自己也差點唱不下去，還好後來有接回來。」', affection: 2 },
    { text: '「最後一遍大家一起進來的時候，整間練團室突然變得好有氣勢。」', response: '「對啊，那一下大家都有抓到同一個感覺，唱起來很過癮。」', affection: 3 },
    { text: '「我有看到你差點笑場，還硬是忍住。」', response: '「有啦，妳不要一直提醒我，不然我現在又要笑了。」', affection: 3 },
  ]
  if (character === 'masa') return [
    { text: '「你今天吐槽佑達的速度比Bass還快。」', response: '「那是因為他提供的素材太多了，怪我喔？」', affection: 2 },
    { text: '「佑達今天根本想把《轧車》改成個人秀。」', response: '「我差點把他的鼓棒沒收，真的。還好最後有把歌救回來。」', affection: 2 },
    { text: '「我現在還覺得地板在震，耳朵也在震。」', response: '「那是妳笑到腳軟，不要什麼都怪音箱。」', affection: 2 },
  ]
  return [
    { text: '「最後一遍收得很齊，我有聽出來，前面明明還亂成一團。」', response: '「前面大家都在鬧，最後那次反而更專心，聽起來就不一樣了。」', affection: 2 },
    { text: '「你彈吉他的時候看起來很投入，我差點也想拿一把來試。」', response: '「下次有機會可以試試看，不用怕，慢慢來就好。」', affection: 3 },
    { text: '「佑達跟瑪莎真的很有戲，坐在旁邊像看現場喜劇。」', response: '「他們兩個一搭一唱的，有時候連我們都不知道該不該接話。」', affection: 2 },
  ]
}

const springNaturalLessonSmsRounds = (
  character: SpringMemberSmsId,
  context: SpringDayContext,
  replies: number[],
): SpringSmsRound[] => {
  const touched = context.lessonReplies?.[4] === 0
  const wentStore = context.storeCharacter === character
  const r0 = replies[0] ?? 0
  const r1 = replies[1] ?? 0
  const r2 = replies[2] ?? 0
  const r3 = replies[3] ?? 0

  if (character === 'wen') return [
    springSmsRound(
      touched
        ? '欸，妳剛才摸完我手上的繭，還一副在做研究的樣子。怎樣，有沒有寫出心得？'
        : '欸，妳最後那個和弦總算有聲音了欸。妳那個瞬間整個坐直，我差點以為妳要站起來慶祝。',
      touched
        ? [
            springSmsChoice('「我是真的第一次摸到吉他手的繭，當然要仔細研究啊。」', ['「齁，研究得很認真嘛。下次是不是還要帶筆記本來？」'], 3),
            springSmsChoice('「你剛剛突然把手收回去，我還以為你害羞欸。」', ['「蛤？我哪有，是妳一直盯著看，我一時不知道手要放哪裡啦。」'], 4),
            springSmsChoice('「我比較想知道你耳朵怎麼紅了。」', ['「妳今天到底是來學吉他，還是來找我麻煩的？……少管啦。」'], 4),
          ]
        : [
            springSmsChoice('「我真的以為又要失敗，突然有聲音我自己都嚇到！」', ['「我有看到，妳先愣住，然後才開始笑。欸，那個反應倒是滿可愛的。」'], 3),
            springSmsChoice('「還不是你一直幫我調手指，不然我早就放棄了。」', ['「我只是幫妳挪一點位置啦，真正按出聲音的是妳。不要把功勞全推給我。」'], 3),
            springSmsChoice('「我比較記得你剛剛靠過來幫我調位置的樣子。」', ['「……妳不是在學和弦嗎？怎麼這個記得那麼清楚。」'], 4),
          ]),
    springSmsRound(
      r0 === 0
        ? '妳剛才那聲「有了」喊得很大聲，我在旁邊差點跟著妳一起得意。'
        : r0 === 1
          ? '欸，妳不要把功勞全算我頭上，這樣我壓力很大欸。'
          : '妳剛剛那句我先當沒聽到，免得妳等一下又得寸進尺。',
      r0 === 0
        ? [
            springSmsChoice('「我忍很久了欸！前面每次都是雜音，終於成功當然要叫一下。」', ['「好啦，准妳叫。下次記得先把和弦按穩再慶祝。」'], 2),
            springSmsChoice('「你也有笑啊，我明明看到了！」', ['「我是在替妳高興好不好，這也要抓包喔？」'], 3),
            springSmsChoice('「那你下次要教我更難的，不可以小看我。」', ['「先把今天這個練熟啦，口氣倒是很大。」'], 3),
          ]
        : r0 === 1
          ? [
              springSmsChoice('「可是你真的很有耐心啊，換別人可能早就被我煩死了。」', ['「我哪有那麼沒耐心。妳肯試，我就繼續教啊。」'], 3),
              springSmsChoice('「那我下次自己練給你看，讓你知道我有沒有進步。」', ['「好啊，我等著驗收。不要只會先放話喔。」'], 3),
              springSmsChoice('「你嘴上說不是你的功勞，表情明明很得意。」', ['「……有成功我當然也會高興啊，這有什麼好藏的。」'], 3),
            ]
          : [
              springSmsChoice('「我記性很好啊，尤其是重要的畫面。」', ['「妳喔，真的很會講。好啦，先把手指位置記牢比較重要。」'], 4),
              springSmsChoice('「那你現在是不是不敢看我了？」', ['「誰不敢看妳？我是在回訊息欸，少亂講。」'], 3),
              springSmsChoice('「好啦，不逗你了。下次還要你教。」', ['「這還差不多。下次來再教妳，先別把今天的忘光。」'], 3),
            ]),
    springSmsRound(
      r1 === 0
        ? '妳剛剛說下次想練更難的，先別急著升級啦，今天這個和弦還要再熟一點。'
        : r1 === 1
          ? '妳說我有耐心喔？我只是看妳一直試，不想讓妳自己在那邊急而已。'
          : '妳剛才一直拿我開玩笑，現在又說下次要我教，妳真的很會欸。',
      [
      springSmsChoice('「我明明還可以再練一下啦！」', ['「不要硬撐，琴又不會跑掉。明天手痛不要怪我沒提醒。」'], 2),
      springSmsChoice('「你這麼怕我手痛喔？」', ['「我是不想妳明天連筷子都拿不穩，少亂想。」'], 3),
      springSmsChoice('「那下次要補課，不能賴帳。」', ['「知道啦，妳記性倒是很好，這種事記最快。」'], 3),
    ]),
    springSmsRound(
      r2 === 0
        ? (wentStore ? '妳剛才說想再試那顆效果器，我記得啦，下次讓妳自己踩個夠。' : '妳剛剛還說手指可以再練，結果撥片都快拿不穩了，先休息啦。')
        : r2 === 1
          ? (wentStore ? '妳一直問我是不是怕妳手痛，欸，我是不想妳明天痛到不能寫筆記啦。' : '妳剛才問我是不是怕妳手痛，這不是廢話嗎？明天還要上課欸。')
          : '補課的事妳倒是記得很清楚，我可沒說不教喔。',
      wentStore
        ? [
            springSmsChoice('「你居然有記得我喜歡哪一顆喔？」', ['「妳那時候聽完又踩一次，我想忘記也難。」'], 3),
            springSmsChoice('「下次要讓我自己試，不准你先按。」', ['「好啦，讓妳當主控。這次不要踩太早就好。」'], 3),
            springSmsChoice('「你是不是早就看出來我很想再玩一次？」', ['「妳那個眼神都快黏在踏板上了，還需要看喔？」'], 3),
          ]
        : [
            springSmsChoice('「收好了！第一堂課紀念品欸。」', ['「才第一堂就要紀念喔，妳還滿會的嘛。」'], 3),
            springSmsChoice('「你怎麼知道我會弄丟？」', ['「妳剛剛連筆都差點忘在椅子上，還敢問。」'], 2),
            springSmsChoice('「那你下次再送我一片不同顏色的。」', ['「先把這片顧好再說啦，要求倒是不少。」'], 2),
          ]),
    springSmsRound(
      r3 === 0
        ? '妳剛才說下次要自己試，這句我記住了。到時候可不要又把琴推回來叫我救妳。'
        : r3 === 1
          ? '好啦，知道妳會收好撥片了。今天就先放過妳的手指，別再硬練。'
          : '不同顏色先不要想，先把今天這片顧好，免得下次又找不到。',
      [
      springSmsChoice('「知道啦，吉他老師管好多。」', ['「我不管妳，明天手痛又要怪我。晚安啦。」'], 2),
      springSmsChoice('「你也不要練到太晚，不准只管我。」', ['「好啦，知道了。撥片收好，晚安。」'], 3),
      springSmsChoice('「晚安，今天真的很好玩，下次還要你教。」', ['「好啊，妳先把今天的和弦記熟，我等妳來。」'], 3),
    ]),
  ]

  if (character === 'ashin') return [
    springSmsRound(
      touched
        ? '欸～剛剛妳摸我指尖的時候那麼小心，我差點想提醒妳，不用怕弄痛我啦。'
        : '妳最後那個和弦一出聲，自己先愣住，過了兩秒才笑出來。我剛剛想到還是覺得很好笑。',
      touched
        ? [
            springSmsChoice('「我怕弄痛你嘛，剛剛看你手指都磨出繭了。」', ['「不會啦，這些早就習慣了。倒是妳自己的手也紅紅的，回去要休息喔。」'], 3),
            springSmsChoice('「你一直把手攤著給我看，我才不知道要不要碰。」', ['「是我自己說可以的呀，妳不用那麼拘謹啦。」'], 3),
            springSmsChoice('「我只是想多看一下，平常哪有機會看到吉他手的手。」', ['「欸～原來是這樣，那我今天算是提供教材了。」'], 3),
          ]
        : [
            springSmsChoice('「我真的以為又會只有雜音，突然成功我自己也嚇一跳！」', ['「我有聽到啊，那一下很清楚。妳自己也愣住了吧。」'], 3),
            springSmsChoice('「你笑得比我還開心耶。」', ['「有啊，看到妳成功，我也會跟著開心嘛。」'], 3),
            springSmsChoice('「我比較記得你坐在旁邊陪我的樣子。」', ['「……那我今天應該也算有幫上忙了。」'], 4),
          ]),
    springSmsRound(
      r0 === 0
        ? '妳剛剛那個表情真的很可愛，像是連自己都不敢相信做到了。'
        : r0 === 1
          ? '其實我也有點替妳緊張，怕妳一直按不出聲音會越來越沒信心。'
          : '妳剛剛那句我有放在心上喔，不是隨便聽聽而已。',
      r0 === 0
        ? [
            springSmsChoice('「我本來都想放棄了，結果突然有聲音，太神奇了！」', ['「所以才說不用急嘛。有時候多試一下，就會突然抓到了。」'], 3),
            springSmsChoice('「你是不是一直在等我成功，連自己的琴都沒顧？」', ['「有一點啦，妳那邊比較讓我在意。」'], 4),
            springSmsChoice('「下次我想自己先試，不要一開始就找你救援。」', ['「好啊，我在旁邊看著，真的卡住再叫我就好。」'], 3),
          ]
        : r0 === 1
          ? [
              springSmsChoice('「你不要緊張啦，我又不是要去比賽。」', ['「我知道呀，只是希望妳玩得開心，不要因為按不好就不敢試。」'], 3),
              springSmsChoice('「那你剛剛怎麼不說？害我自己在那邊皺眉頭。」', ['「我想讓妳自己找到感覺嘛，不想一直打斷妳。」'], 3),
              springSmsChoice('「有你在旁邊，我其實沒那麼怕出錯。」', ['「那就好。下次也不用怕，彈錯了我們再來一次。」'], 4),
            ]
          : [
              springSmsChoice('「我說真的啊，你今天教得很好。」', ['「欸～妳這樣講，我會有點不好意思啦。」'], 3),
              springSmsChoice('「那我下次再多稱讚你一點好了。」', ['「不用特地安排啦，妳自然講就好。」'], 3),
              springSmsChoice('「你開心就好，我沒有要故意逗你。」', ['「我知道啊，所以才說我有聽進去。」'], 3),
            ]),
    springSmsRound(
      r1 === 0
        ? '妳剛才說那一下太神奇，我也覺得。其實不是突然會了，是前面那些次都有慢慢累積起來。'
        : r1 === 1
          ? '妳說我一直在旁邊等妳，其實我沒有覺得浪費時間，反而覺得看妳抓到感覺滿好的。'
          : '妳說我教得好，我剛剛收琴時還在想這句，真的有點開心。',
      [
      springSmsChoice('「你還真的幫我記下來喔，謝謝你。」', ['「不客氣啊，免得下次又要從頭找。」'], 2),
      springSmsChoice('「我怕一放下琴就忘記剛剛那個聲音。」', ['「那就先記住那個感覺，不用急著把每個細節都背起來。」'], 3),
      springSmsChoice('「下次我想自己把和弦換過去，不要一直靠你提醒。」', ['「可以啊，我在旁邊看著，妳自己試試看。」'], 3),
    ]),
    springSmsRound(
      r2 === 0
        ? (wentStore ? '妳剛才說怕忘記那把琴的聲音，我也記得，第一把比較厚，第二把亮一點。' : '妳剛才說想記住那個聲音，那就先記住今天成功的感覺，不用急著練到手痛。')
        : r2 === 1
          ? (wentStore ? '妳說那把琴想再聽一次，我有記住，下次可以再彈給妳聽。' : '妳說怕忘記，我懂，所以我才把和弦位置記下來，讓下次不用重找。')
          : (wentStore ? '妳說下次想自己抱琴試試看，好啊，我到時候先幫妳把高度調好。' : '妳想自己換和弦很好啊，下次我先不提醒，讓妳自己試一遍。'),
      wentStore
        ? [
            springSmsChoice('「我一開始真的不知道怎麼抱，還好你有幫我調。」', ['「下次我先幫妳調好，妳就可以直接試了。」'], 3),
            springSmsChoice('「那把琴的聲音我也很喜歡，想再聽一次。」', ['「好啊，下次再彈給妳聽，這次讓妳聽完整一點。」'], 3),
            springSmsChoice('「我剛剛有沒有看起來很笨？」', ['「沒有啦，只是第一次抱琴會不習慣，很正常。」'], 2),
          ]
        : [
            springSmsChoice('「有一點酸，不過我沒有不舒服啦。」', ['「那就好。今天先休息，明天如果還酸就不要勉強。」'], 3),
            springSmsChoice('「你剛剛是不是有看到我偷偷甩手？」', ['「有啊，所以才想說差不多該讓妳休息了。」'], 2),
            springSmsChoice('「其實我還想再練一下，今天才剛有點感覺。」', ['「下次再接著練嘛，今天有抓到就很好了。」'], 3),
          ]),
    springSmsRound(
      r3 === 0
        ? '那把木吉他的事我記著，下次再找時間讓妳慢慢試。'
        : r3 === 1
          ? '妳剛才說想再聽一次，我也想再彈給妳聽。今天先讓手指休息啦。'
          : '好，下次換妳彈給我聽。我不會笑妳，真的。',
      [
      springSmsChoice('「晚安，今天真的很開心，下次還要你教。」', ['「好啊，說好了。妳也早點休息。」'], 3),
      springSmsChoice('「你也早點睡，不要又彈到忘記時間。」', ['「好啦，我等等就收。妳也不要熬夜喔。」'], 2),
      springSmsChoice('「下次我要自己彈給你聽，不准笑我。」', ['「我哪有那麼容易笑妳。好，等妳下次表演。」'], 3),
    ]),
  ]

  if (character === 'masa') return [
    springSmsRound(
      touched
        ? '欸，妳剛才摸完我的手，表情像在驗貨。報告呢？Bass老師的手有沒有通過檢驗？'
        : '妳剛剛那段節奏總算接上了，前面有個音自己跑出去散步，後面倒是有追回來。',
      touched
        ? [
            springSmsChoice('「檢查員有職業操守，當然要看仔細一點。」', ['「好喔，那報告記得寫優點，不准只挑毛病。」'], 3),
            springSmsChoice('「你明明一直在笑，還裝得很鎮定。」', ['「我是在配合檢查員，服務態度要好一點嘛。」'], 2),
            springSmsChoice('「我只是想知道你平常練Bass有多辛苦。」', ['「這個理由勉強可以接受，至少不是純粹找我麻煩。」'], 3),
          ]
        : [
            springSmsChoice('「那個音是故意的，增加一點驚喜。」', ['「喔？那妳的驚喜還滿多的，下次先通知我一聲。」'], 2),
            springSmsChoice('「你不要只記得那個音，我後面明明有跟上！」', ['「有啦，後面那段有跟上，這句算稱讚。」'], 3),
            springSmsChoice('「下次我要練到你沒話可以吐槽。」', ['「這個目標比學Bass還困難，妳慢慢努力。」'], 3),
          ]),
    springSmsRound(
      r0 === 0
        ? '妳剛剛替那個失誤找理由的速度，比妳彈Bass還快。'
        : r0 === 1
          ? '好啦，我承認後面那段有比較穩，這句不用妳再提醒。'
          : '妳說要練到我閉嘴，我先把這句記下來，免得妳下次裝沒說過。',
      r0 === 0
        ? [
            springSmsChoice('「我那是在解釋，不是在找理由好不好！」', ['「好喔，解釋得很完整，差點以為妳在開記者會。」'], 2),
            springSmsChoice('「你明明也笑了，還好意思說我。」', ['「我笑是因為妳那個表情，跟失誤沒關係。」'], 3),
            springSmsChoice('「那下次我就不解釋，直接彈給你看。」', ['「行啊，這句我先記著，別到時候又找藉口。」'], 3),
          ]
        : r0 === 1
          ? [
              springSmsChoice('「你自己承認了喔，我可沒有逼你。」', ['「知道啦，妳現在是不是很想把這句裱起來？」'], 3),
              springSmsChoice('「那你再說一次，我想聽清楚一點。」', ['「不要得寸進尺，稱讚一次就夠了。」'], 3),
              springSmsChoice('「我就知道我後面有跟上！」', ['「有啦，後面那段有穩住，這句算妳的。」'], 2),
            ]
        : [
            springSmsChoice('「你先別急著記，等我真的做到了再說。」', ['「好啊，我等著驗收，妳不要臨時裝失憶。」'], 3),
            springSmsChoice('「你要是閉嘴五分鐘，我可能真的會進步。」', ['「那我下次計時，五分鐘後再來檢查。」'], 2),
            springSmsChoice('「我說到做到，你等著看！」', ['「行，這次我不先吐槽，妳自己證明。」'], 3),
          ]),
    springSmsRound(
      r1 === 0
        ? '妳剛才說那個音是驚喜，我看是驚嚇吧。下次驚喜之前先通知老師。'
        : r1 === 1
          ? '好啦，後面那段有跟上，這句我已經講過了，不要逼我再說一次。'
          : '妳說要練到我閉嘴，我現在就先保持安靜三秒，看看有沒有用。',
      [
      springSmsChoice('「因為那段真的很洗腦，我現在停不下來。」', ['「那就讓它住妳腦袋裡，至少不用我再教一次。」'], 2),
      springSmsChoice('「我是在複習，不是在哼歌！」', ['「好啦，複習。妳高興就好。」'], 2),
      springSmsChoice('「下次我想把整段接起來，這次不准偷笑。」', ['「可以啊，先把今天這一小段練穩，我再考慮要不要笑。」'], 3),
    ]),
    springSmsRound(
      r2 === 0
        ? (wentStore ? '妳剛才還說要收顧問費，先記帳啦，別以為我會賴掉。' : '妳剛才說那段很洗腦，回家就讓它自己在腦袋裡播，不用再拿Bass折磨手指。')
        : r2 === 1
          ? (wentStore ? '妳說只是陪我比規格，少來，妳剛剛明明看得很認真。' : '妳說是在複習就算複習吧，反正別練到手指罷工。')
          : (wentStore ? '下次要請吃飯這件事我也記著，條件還真不少。' : '妳想把整段接起來可以，下次再練，今天先到這裡。'),
      wentStore
        ? [
            springSmsChoice('「所以我有幫上忙吧？顧問費呢？」', ['「有啦有啦，顧問費先欠著，別一直催。」'], 3),
            springSmsChoice('「你本來就懂，我只是陪你比一下。」', ['「有人幫忙看還是比較快，這句我承認。」'], 2),
            springSmsChoice('「下次還可以找我，不過要請吃飯。」', ['「條件越開越多欸，妳先把Bass練好再談。」'], 3),
          ]
        : [
            springSmsChoice('「我才沒有硬練，我只是想趁熱打鐵。」', ['「熱打鐵也要看手指狀況，明天還要上課吧？」'], 2),
            springSmsChoice('「那你下次還要教我，不能嫌我慢。」', ['「知道啦，妳不要每次都先替我下結論。」'], 3),
            springSmsChoice('「我今晚先放過它，明天再繼續。」', ['「這樣才對，總算有聽進去一次。」'], 2),
          ]),
    springSmsRound(
      r3 === 0
        ? '顧問費先欠著，Bass課也先欠妳一堂。今天回去休息，不准再自己加練。'
        : r3 === 1
          ? '妳說會放過Bass，那我就當妳說真的。晚點不要又傳訊息說手痛。'
          : '好啦，下次再讓妳把整段接起來。到時候我可不會放水。',
      [
      springSmsChoice('「晚安啦，老師，今天沒有白交學費！」', ['「妳有交學費嗎？我怎麼沒收到。晚安啦。」'], 3),
      springSmsChoice('「你才要早點睡，不要一直吐槽到半夜。」', ['「我那是教學的一部分好不好。晚安啦。」'], 2),
      springSmsChoice('「下次我要練到你沒話可以吐槽。」', ['「好啊，我等著看妳有沒有這個本事。」'], 3),
    ]),
  ]

  return [
    springSmsRound(
      touched
        ? '剛才妳摸我指尖的時候很輕，我有注意到妳一直怕弄痛我。其實不用那麼小心啦。'
        : '妳最後那個和弦接起來時，肩膀終於放鬆了。我本來想提醒妳，後來看妳自己抓到了。',
      touched
        ? [
            springSmsChoice('「我怕弄痛你嘛，而且你手上那層繭真的很特別。」', ['「不會痛啦。妳剛剛看得很仔細，我反而有點不好意思。」'], 3),
            springSmsChoice('「你怎麼知道我很小心？我明明沒說。」', ['「妳碰一下就停一下，我有感覺到。」'], 3),
            springSmsChoice('「我本來以為你會覺得我很奇怪。」', ['「不會啊，妳只是好奇。沒什麼好奇怪的。」'], 3),
          ]
        : [
            springSmsChoice('「我前面真的卡了好久，突然順過去我自己都愣住了。」', ['「我有看到，妳愣了一下才笑出來。」'], 3),
            springSmsChoice('「還不是你一直等我，沒有催我。」', ['「學東西本來就不用趕，妳照自己的速度就好。」'], 3),
            springSmsChoice('「我現在比較記得你坐在旁邊陪我的樣子。」', ['「……那我今天應該也算有幫上忙。」'], 4),
          ]),
    springSmsRound(
      r0 === 0
        ? '妳剛才成功那一下，整個人都鬆下來了，跟前面皺著眉的樣子差很多。'
        : r0 === 1
          ? '我以前練琴也常常卡在同一個地方，越急反而越容易按錯。'
          : '妳那句話我記住了。其實有人願意一起慢慢練，感覺也不錯。',
      r0 === 0
        ? [
            springSmsChoice('「我前面真的有點急，總覺得自己怎麼還學不會。」', ['「很正常啊，先讓手記住位置，其他的慢慢來。」'], 3),
            springSmsChoice('「你剛剛一直等我，我反而比較敢試。」', ['「我看得出來妳後來放鬆多了，這樣就很好。」'], 3),
            springSmsChoice('「我成功的時候自己都愣住了。」', ['「我有看到，妳那個表情很值得記住。」'], 3),
          ]
        : r0 === 1
          ? [
              springSmsChoice('「你以前也會這樣？看不出來欸。」', ['「當然會，只是現在比較知道怎麼調整了。」'], 2),
              springSmsChoice('「原來不是只有我會卡在同一個地方。」', ['「真的不是，練琴的人多少都會遇到。」'], 3),
              springSmsChoice('「那你後來怎麼練過去的？」', ['「先放慢，把手指位置弄清楚，再一點一點加快。」'], 2),
            ]
          : [
              springSmsChoice('「我也覺得，有人陪著練比較不容易慌。」', ['「那下次也不用客氣，想練就跟我說。」'], 3),
              springSmsChoice('「你這樣講，我突然有點不好意思了。」', ['「不用不好意思，我只是說真的。」'], 3),
              springSmsChoice('「那下次還想跟你一起練。」', ['「好啊，我會把琴先準備好。」'], 3),
            ]),
    springSmsRound(
      r1 === 0
        ? '妳剛才說自己卡了好久，我有看到。其實妳後面放鬆下來之後，手指就比較順了。'
        : r1 === 1
          ? '妳說我一直等妳，因為我知道一催妳就會更緊張，所以才想讓妳自己試。'
          : '妳說下次還想一起練，我記住了。今天那個和弦可以再慢慢熟一點。',
      [
      springSmsChoice('「你還幫我記下來喔，謝謝你。」', ['「不客氣，免得下次又要重新找位置。」'], 2),
      springSmsChoice('「我想趁現在還記得，再自己練一次。」', ['「可以，但不要練太久，手指酸了就停。」'], 3),
      springSmsChoice('「下次我想自己換過去，看看能不能不靠你提醒。」', ['「好啊，我在旁邊看著，讓妳自己試。」'], 3),
    ]),
    springSmsRound(
      r2 === 0
        ? (wentStore ? '妳剛才說怕我背起來不舒服，還特地看了好幾次。謝謝妳有注意到。' : '妳說想自己再練一次可以，不過手指酸了就先停，不用急著證明什麼。')
        : r2 === 1
          ? (wentStore ? '妳說下次換妳挑東西，我倒是有點期待妳會挑什麼。' : '妳說有甩手指，我有看到，所以才想提醒妳休息一下。')
          : (wentStore ? '妳說今天比我還認真，我覺得妳是在替自己加分吧。' : '妳說今天很值得，我也覺得。第一次能把和弦按出來，已經很好了。'),
      wentStore
        ? [
            springSmsChoice('「我只是怕你買回去不舒服，還要再跑一趟。」', ['「謝謝妳，妳替我想到這些，我自己有時候會漏掉。」'], 3),
            springSmsChoice('「下次換我挑東西，你只要負責試用。」', ['「好啊，我也想看看妳會怎麼挑。」'], 3),
            springSmsChoice('「我今天是不是比你還認真？」', ['「有一點，尤其妳檢查背帶那幾次。」'], 2),
          ]
        : [
            springSmsChoice('「有一點酸，不過休息一下就好多了。」', ['「那就好。今天先不要再練，明天如果還酸就讓手休息。」'], 3),
            springSmsChoice('「你剛剛是不是有看到我偷偷甩手？」', ['「有啊，所以才想說差不多該停了。」'], 2),
            springSmsChoice('「其實我還想再練一下，今天才剛有點感覺。」', ['「下次再接著練，今天有抓到就很好了。」'], 3),
          ]),
    springSmsRound(
      r3 === 0
        ? '那就先照妳自己的速度來，下次想練的時候再找我就好。'
        : r3 === 1
          ? '我會記得妳說的，下次讓妳自己先試，我在旁邊看著就好。'
          : '今天真的不用再逼自己了，妳已經有進步。先好好休息。',
      [
      springSmsChoice('「晚安，今天謝謝你陪我慢慢練。」', ['「不客氣，今天妳很認真。晚安。」'], 3),
      springSmsChoice('「你也早點休息，不要再彈到忘記時間。」', ['「好，我會記得。妳也照顧好自己的手。」'], 2),
      springSmsChoice('「下次再教我別的和弦，好不好？」', ['「當然好啊，下次我們再慢慢練。」'], 3),
    ]),
  ]
}

const springNaturalRehearsalSmsRounds = (
  character: SpringMemberSmsId,
  replies: number[],
  wentStore: boolean,
): SpringSmsRound[] => {
  const r0 = replies[0] ?? 0
  const r1 = replies[1] ?? 0
  const r2 = replies[2] ?? 0
  const r3 = replies[3] ?? 0

  if (character === 'wen') return [
    springSmsRound('欸，妳剛才是不是笑到差點嗆到？佑達那個鼓花連我都差點沒忍住，妳還敢說自己有認真聽。', [
      springSmsChoice('「我有認真聽啊，只是佑達太搶戲了！」', ['「他今天真的很有表演慾，妳不要跟他說我這樣講。」'], 2),
      springSmsChoice('「你明明也笑了，還差點彈歪！」', ['「我那是在忍，差一點而已啦。」'], 2),
      springSmsChoice('「最後一遍你彈得很帥，前面先不算。」', ['「蛤？前面那幾遍都不算喔？好啦，這句我收下。」'], 3),
    ]),
    springSmsRound(
      r0 === 0 ? '我剛才跟佑達說，下次不要一開始就加那麼多花樣，他還說那叫熱身。'
        : r0 === 1 ? '瑪莎剛剛又拿那段鼓花堵佑達，兩個人真的很會找對方麻煩。'
          : '妳只給最後一遍加分喔？前面我也有認真彈欸。',
      r0 === 0
        ? [
            springSmsChoice('「他那個熱身方式也太有破壞力了吧。」', ['「對啊，差點連我都不知道要從哪裡接。」'], 2),
            springSmsChoice('「可是他不亂來就不是佑達了。」', ['「這倒是真的，叫他安靜可能比較難。」'], 3),
            springSmsChoice('「下次我幫你盯著他，不准再亂加。」', ['「好啊，妳去跟他講，我看他會不會聽妳的。」'], 2),
          ]
        : r0 === 1
          ? [
              springSmsChoice('「瑪莎根本等著吐槽他，忍一整場了吧。」', ['「他們兩個每天都要鬥一下才甘願。」'], 2),
              springSmsChoice('「你剛剛也在旁邊拱火，少裝無辜。」', ['「我哪有，我只是把大家心裡想的講出來。」'], 2),
              springSmsChoice('「你們排練室真的不能沒有這兩個人。」', ['「是啦，不然少很多笑聲。」'], 3),
            ]
          : [
              springSmsChoice('「好啦，前面也很帥，只是最後那遍最完整。」', ['「這還差不多，妳剛剛那句差點讓我不想回了。」'], 3),
              springSmsChoice('「那你想要我從第一遍開始誇嗎？」', ['「不用，妳不要突然變得很刻意。」'], 3),
              springSmsChoice('「你很在意我有沒有看到喔？」', ['「……我只是覺得彈得好有人聽到也不錯啦。」'], 4),
            ]),
    springSmsRound(
      r1 === 0
        ? '妳剛才說佑達那個熱身很有破壞力，我跟妳說，他還真的覺得自己很有道理。'
        : r1 === 1
          ? '瑪莎剛剛又補了一句，佑達現在還在想要怎麼回他。'
          : '妳說前面也帥，這句我先收下，免得妳等一下又改口。',
      [
      springSmsChoice('「那一下真的很整齊，聽起來超爽！」', ['「有接起來就好，今天沒白吵。」'], 2),
      springSmsChoice('「我喜歡你彈進副歌那個瞬間。」', ['「妳聽得還滿仔細的嘛，這句我記下來了。」'], 3),
      springSmsChoice('「我其實一直在等佑達會不會又加鼓花。」', ['「妳到底是來看我彈，還是來監督鼓手的？」'], 2),
    ]),
    springSmsRound(
      r2 === 0
        ? (wentStore ? '妳說下次還要試那顆效果器，我記得啦，先別急著把整間店踩一遍。' : '妳說最後那一下很整齊，我也覺得，大家總算有互相聽進去。')
        : r2 === 1
          ? (wentStore ? '妳問我是不是也想買，先不要替我做決定啦，我還在想。' : '妳說喜歡我進副歌那一下，這句我有記住，聽了還滿開心的。')
          : '妳一直盯著佑達的鼓花，下次我可能要把妳的位置安排到鼓手旁邊。',
      wentStore
        ? [
            springSmsChoice('「我就說那顆很好玩吧！下次還要試。」', ['「好啦，下次讓妳自己踩，這次不要又搶在我前面。」'], 3),
            springSmsChoice('「你是不是也想買？老實說喔。」', ['「我只是覺得可以研究一下，妳不要馬上開始起鬨。」'], 2),
            springSmsChoice('「今天從樂器行到練團室都好好玩。」', ['「嗯，今天是滿充實的。妳有玩得開心就好。」'], 3),
          ]
        : [
            springSmsChoice('「你不要說他，明明你也玩得很開心。」', ['「有一點啦，這首就是要鬧起來才對。」'], 2),
            springSmsChoice('「下次我坐遠一點好了，耳朵真的要休息。」', ['「坐遠一點也沒用，佑達的鼓聲到哪裡都聽得到。」'], 2),
            springSmsChoice('「下次再練給我看，我要聽你們更整齊的一次。」', ['「好啊，下次讓妳驗收。」'], 3),
          ]),
    springSmsRound(
      r3 === 0
        ? '好啦，下次讓妳自己踩效果器，不過先說好，不能一進門就把每顆都試過。'
        : r3 === 1
          ? '妳說耳朵要休息，那今天就真的放過它，回家不要再把鼓聲重播一整晚。'
          : '妳說要再聽一遍，那下次排練讓妳驗收，這次不要只顧著看佑達。',
      [
      springSmsChoice('「我才不要，我也要加入你們亂來。」', ['「先把拍子抓好再說啦，野心倒是不小。」'], 2),
      springSmsChoice('「你下次彈吉他給我看，我就乖乖坐好。」', ['「這個可以，妳自己說的喔。」'], 3),
      springSmsChoice('「晚安啦，今天真的很好玩。」', ['「晚安，回去小心。到家傳一下也可以。」'], 2),
    ]),
  ]

  if (character === 'ashin') return [
    springSmsRound('我回去後還想到第一遍那個鼓花，佑達一加進去，瑪莎的表情真的太好笑了，我差點唱不下去。', [
      springSmsChoice('「你明明也在笑，還一直假裝在唱歌！」', ['「有啦，差點沒忍住，還好後來有接回來。」'], 2),
      springSmsChoice('「瑪莎那個表情真的太好笑了，我現在想起來還會笑。」', ['「他嘴上嫌歸嫌，其實也玩得很開心啦。」'], 2),
      springSmsChoice('「你唱到副歌那裡真的很有氣勢。」', ['「謝謝妳～那一段大家一起進來，唱起來很過癮。」'], 3),
    ]),
    springSmsRound(
      r0 === 0 ? '後來最後一遍大家都收得很齊，我本來還怕前面鬧太多，會影響到最後。'
        : r0 === 1 ? '我剛才還聽到瑪莎在問佑達，那個鼓花到底是練了幾天才敢拿出來。'
          : '妳說我唱得有氣勢，我看到訊息的時候有點不好意思，是真的喔？',
      r0 === 0
        ? [
            springSmsChoice('「最後那一下超帥，前面越亂反而越有反差。」', ['「妳這個形容好直接喔，不過真的有那個感覺。」'], 3),
            springSmsChoice('「你們一接起來，我坐旁邊都跟著緊張。」', ['「我有看到妳一直盯著大家，還好最後沒有讓妳失望。」'], 3),
            springSmsChoice('「下次我還想聽你們再練一次。」', ['「好啊，下次有空再來，不用客氣。」'], 3),
          ]
        : r0 === 1
          ? [
              springSmsChoice('「他一定會說自己是即興天才。」', ['「很有可能，而且他講得還會很認真。」'], 2),
              springSmsChoice('「瑪莎根本嘴上嫌棄，心裡覺得好玩吧。」', ['「我也覺得，他們兩個其實很有默契。」'], 3),
              springSmsChoice('「你們平常是不是都這樣互相鬧？」', ['「差不多呀，熟了就會這樣，大家都知道沒有惡意。」'], 2),
            ]
          : [
              springSmsChoice('「真的啊，我又不是隨便稱讚人的。」', ['「那我就收下了，今天聽到這句很開心。」'], 3),
              springSmsChoice('「你自己唱的時候沒感覺，旁邊聽真的很有氣勢。」', ['「可能唱進去的時候不太會注意到，謝謝妳有聽見。」'], 3),
              springSmsChoice('「你不要害羞啦，我只是講實話。」', ['「欸～妳這樣講，我更不知道要怎麼回了。」'], 3),
            ]),
    springSmsRound(
      r1 === 0
        ? '妳剛才說前面亂、最後很帥，我也覺得那個反差滿有趣的。'
        : r1 === 1
          ? '妳說瑪莎和佑達很有默契，我剛剛看到他們又在門口講了好一會兒。'
          : '妳說我唱得有氣勢，我回頭想想，剛才那段確實唱得滿投入的。',
      [
      springSmsChoice('「被你發現了，我回家還在哼。」', ['「那就讓它多留一下，今天那個聲音滿值得記住的。」'], 3),
      springSmsChoice('「我只是怕忘記，先在腦袋裡複習一下。」', ['「不用那麼認真啦，妳放輕鬆聽就好。」'], 2),
      springSmsChoice('「誰叫你們最後那一遍真的很好聽。」', ['「謝謝妳，聽到妳這樣說我很開心。」'], 3),
    ]),
    springSmsRound(
      r2 === 0
        ? (wentStore ? '妳剛才說抱琴一開始不習慣，下次我先幫妳調好，妳就不用手忙腳亂。' : '妳說他們兩個每天都要吵一下，真的欸，剛才收器材還在鬥嘴。')
        : r2 === 1
          ? (wentStore ? '妳還記得那把琴的聲音，我也記得。下次有空再彈給妳聽。' : '妳說大家都習慣了，其實有時候還是會被他們逗笑。')
          : (wentStore ? '妳猜對了，我那時候真的覺得妳會喜歡那把琴。' : '妳說下次還要來看他們鬥嘴，那我可要提醒瑪莎收斂一點了。'),
      wentStore
        ? [
            springSmsChoice('「我一開始真的不知道怎麼抱，還好你有幫我調。」', ['「下次我先幫妳調好，妳就可以直接試了。」'], 3),
            springSmsChoice('「那把琴的聲音我還記得，真的很溫暖。」', ['「我也喜歡那把，下次再彈給妳聽。」'], 3),
            springSmsChoice('「你今天是不是故意挑那把給我聽的？」', ['「有一點啦，我覺得妳應該會喜歡那個音色。」'], 4),
          ]
        : [
            springSmsChoice('「他們兩個根本每天都要吵一下才行。」', ['「差不多啦，不過有他們在，真的很少冷場。」'], 2),
            springSmsChoice('「你們其他人都習慣了吧？」', ['「習慣是習慣，有時候還是會被他們逗笑。」'], 2),
            springSmsChoice('「下次我還要來看他們鬥嘴。」', ['「好啊，不過也要聽我們把歌練完喔。」'], 3),
          ]),
    springSmsRound(
      r3 === 0
        ? '下次抱琴的時候就不會那麼生疏了，我們再慢慢試。'
        : r3 === 1
          ? '那把琴我也想再彈給妳聽，今天先讓耳朵休息一下。'
          : '好啊，下次再來。今天妳也辛苦了，晚安喔。',
      [
      springSmsChoice('「晚安，今天真的很開心。」', ['「晚安～妳也早點休息，路上小心。」'], 3),
      springSmsChoice('「你也不要太晚睡，明天才有精神。」', ['「好啦，我等等就收。妳也是喔。」'], 2),
      springSmsChoice('「下次見，我還想聽你們練別的歌。」', ['「好啊，下次再讓妳聽。」'], 3),
    ]),
  ]

  if (character === 'masa') return [
    springSmsRound('我剛把Bass收起來，先問妳一件事：妳今天到底是來看團，還是來看佑達一個人表演？', [
      springSmsChoice('「他今天真的很搶戲欸，我想不注意都難。」', ['「對啊，主唱都快變伴奏了，這合理嗎？」'], 2),
      springSmsChoice('「我有在聽你彈Bass好不好！」', ['「最好是，妳剛剛笑到差點整個人滑下椅子。」'], 2),
      springSmsChoice('「我是在觀察你們每個人的反應，超精彩。」', ['「喔，原來妳今天是來做田野調查的。」'], 3),
    ]),
    springSmsRound(
      r0 === 0 ? '佑達剛才還在替自己辯護，說那個鼓花是臨場反應，不是亂打。'
        : r0 === 1 ? '我剛剛有聽到妳說有在聽Bass，這句先記著，下次不要又只顧著看鼓手。'
          : '妳的田野調查做得怎樣？有沒有發現誰最值得吐槽？',
      r0 === 0
        ? [
            springSmsChoice('「他要不要乾脆說自己在創作新版本？」', ['「他真的有可能喔，還會講得一臉認真。」'], 2),
            springSmsChoice('「你們不要一直欺負他啦，他也很努力了。」', ['「我哪有欺負他，我是在幫他校正人生方向。」'], 2),
            springSmsChoice('「你明明也覺得好玩，還裝得很嚴格。」', ['「我是在維持團內紀律，懂不懂？」'], 3),
          ]
        : r0 === 1
          ? [
              springSmsChoice('「我有聽到低音啊，最後那一下很穩。」', ['「嗯，這句總算講到重點了，低音不是裝飾。」'], 3),
              springSmsChoice('「那你下次站近一點彈給我聽。」', ['「可以啊，這次不要又被鼓聲吸引走。」'], 3),
              springSmsChoice('「你是不是很在意我有沒有注意到？」', ['「廢話，彈了當然希望有人聽到。」'], 3),
            ]
          : [
              springSmsChoice('「目前第一名是你，因為你吐槽最快。」', ['「謝謝喔，這個獎項聽起來很廉價。」'], 3),
              springSmsChoice('「佑達第一，你第二，恭喜。」', ['「妳這個排名有經過評審同意嗎？」'], 2),
              springSmsChoice('「我覺得你們每個人都很有戲。」', ['「這句聽起來像是在說我們都不正常。」'], 2),
            ]),
    springSmsRound(
      r1 === 0
        ? '佑達剛才還在替自己的鼓花辯護，說他那叫臨場發揮，不是亂來。'
        : r1 === 1
          ? '我有聽到妳說Bass穩，這句先記著，免得妳下次又只顧著看鼓手。'
          : '妳把大家都排進名單了喔？那我倒想知道妳最後給誰第一名。',
      [
      springSmsChoice('「那一下真的很帥，前面鬧成那樣反而更有反差。」', ['「這句講得還可以，總算不是只記得佑達。」'], 3),
      springSmsChoice('「我有聽到你的Bass，低音一進來整個就穩了。」', ['「嗯，低音不是拿來裝飾的，這句記起來。」'], 3),
      springSmsChoice('「我還是覺得佑達最搶戲。」', ['「妳到底是來看團還是來看鼓手的？」'], 2),
    ]),
    springSmsRound(
      r2 === 0
        ? (wentStore ? '妳說要把我這次承認的話拿去邀功，先說好，不准到處宣傳。' : '妳說前面鬧成那樣反而更帥，這句還算有點眼光。')
        : r2 === 1
          ? (wentStore ? '妳說會低調收下稱讚，最好是，妳剛才那個表情可一點都不低調。' : '妳說有聽到Bass，這句我收下。下次站近一點聽會更清楚。')
          : (wentStore ? '顧問費還沒談好就先開條件，妳真的很會做生意。' : '妳還是只記得佑達喔？我看下次要把妳安排到Bass旁邊。'),
      wentStore
        ? [
            springSmsChoice('「太晚了，我已經打算拿這件事邀功了。」', ['「妳真的很會抓機會欸。好啦，這次算妳有幫忙。」'], 3),
            springSmsChoice('「你放心，我會低調地收下這個稱讚。」', ['「最好是，妳剛剛那個得意樣完全不像低調。」'], 2),
            springSmsChoice('「下次再找我幫忙，顧問費要先談好。」', ['「知道了，現在連報酬都談起來了。」'], 3),
          ]
        : [
            springSmsChoice('「我本來就沒有說Bass是背景音好不好！」', ['「最好是，妳以前那個表情我還記得。」'], 2),
            springSmsChoice('「那你下次再彈一段給我聽，我要重新認識Bass。」', ['「可以啊，這次讓妳站近一點，聽清楚再評論。」'], 3),
            springSmsChoice('「你是不是很在意別人有沒有聽見Bass？」', ['「廢話，彈了當然希望有人聽到。」'], 2),
          ]),
    springSmsRound(
      r3 === 0
        ? '好啦，下次讓妳站近一點聽Bass，這次不要再說我沒有提醒妳。'
        : r3 === 1
          ? '今天就先放過佑達吧，至少他最後有把歌接回來。晚安啦。'
          : '妳要坐前面看戲可以，但記得也要聽歌，不要只等我們吵架。',
      [
      springSmsChoice('「我現在腦袋裡是你吐槽他的聲音。」', ['「那更糟，妳趕快去睡。」'], 3),
      springSmsChoice('「晚安啦，明天不要又嫌佑達。」', ['「我盡量，不能保證。」'], 2),
      springSmsChoice('「下次我還要坐前面看你們鬥嘴。」', ['「妳是來看團還是看戲的？」'], 3),
    ]),
  ]

  return [
    springSmsRound('剛才收東西時，我還想到妳最後那個表情。前面被佑達鬧得那麼亂，最後一遍總算有把歌接回來。', [
      springSmsChoice('「我真的以為你們要一路亂到底了。」', ['「我也有一瞬間這樣想，還好大家最後有聽彼此的。」'], 2),
      springSmsChoice('「你彈吉他的時候看起來很投入，我有注意到。」', ['「謝謝妳。今天那段彈起來滿順的，自己也有點開心。」'], 3),
      springSmsChoice('「我其實一直在等佑達會不會又加鼓花。」', ['「他今天真的很搶眼，連我都忍不住看他。」'], 2),
    ]),
    springSmsRound(
      r0 === 0 ? '最後那一遍大家有互相聽，節奏才慢慢穩下來。'
        : r0 === 1 ? '妳說有注意到我彈吉他，我剛才收琴時還想起來。謝謝妳。'
          : '佑達今天大概是全場最忙的人，連收工都還在解釋他的鼓花。',
      r0 === 0
        ? [
            springSmsChoice('「對啊，最後突然整齊起來，我還愣了一下。」', ['「我也有感覺到，大家一起收住的時候很有成就感。」'], 3),
            springSmsChoice('「你們有時候真的很像在互相追著跑。」', ['「有時候是這樣，不過大家都知道怎麼把歌接回來。」'], 2),
            springSmsChoice('「下次我想坐近一點，看你們怎麼互相配合。」', ['「好啊，下次幫妳留個舒服的位置。」'], 3),
          ]
        : r0 === 1
          ? [
              springSmsChoice('「因為你彈得很認真，很難不注意到。」', ['「妳這樣講，我會有點不好意思。」'], 3),
              springSmsChoice('「不用謝啦，我只是剛好坐在那裡。」', ['「可是妳有認真聽，我還是很高興。」'], 3),
              springSmsChoice('「下次再彈給我聽，我想聽清楚一點。」', ['「好啊，下次可以再讓妳聽一次。」'], 3),
            ]
          : [
              springSmsChoice('「他真的很有活力，感覺永遠不會累。」', ['「對啊，有時候看他打鼓都替他手痠。」'], 2),
              springSmsChoice('「瑪莎吐槽他的時候也很好笑。」', ['「他們兩個一搭一唱，大家都不用特別找話題。」'], 2),
              springSmsChoice('「你們平常收工也都這麼熱鬧嗎？」', ['「差不多啦，安靜的時候反而比較少。」'], 2),
            ]),
    springSmsRound(
      r1 === 0
        ? '妳剛才說最後突然整齊起來，我也有那種感覺，大家終於抓到同一個拍子。'
        : r1 === 1
          ? '妳說有注意到我彈吉他，謝謝妳。今天那段我自己也滿喜歡的。'
          : '佑達剛才還在解釋那個鼓花，瑪莎站旁邊一句話就把他堵回去了。',
      [
      springSmsChoice('「我自己都沒發現，可能不知不覺就跟著唱了。」', ['「很自然啊，聽進去就會這樣。」'], 3),
      springSmsChoice('「因為最後那段真的很好聽嘛。」', ['「謝謝，大家有互相聽，才會接得那麼好。」'], 3),
      springSmsChoice('「我只是怕坐著睡著，才一直跟著動。」', ['「妳看起來不像快睡著，倒是聽得很投入。」'], 2),
    ]),
    springSmsRound(
      r2 === 0
        ? (wentStore ? '妳說那條背帶適合我，我後來又試了一下，真的滿舒服的。' : '妳說不知不覺跟著哼，我剛剛也差點跟著哼起來。')
        : r2 === 1
          ? (wentStore ? '妳說今天從逛店到練團過得很快，我也覺得，整個下午一下就過去了。' : '妳說喜歡大家這樣相處，我也很珍惜這種可以一起玩音樂的日子。')
          : (wentStore ? '妳還想再試那把展示琴，好啊，下次我們再慢慢看。' : '妳說下次想坐近一點，我幫妳留個不會被音箱震到的位置。'),
      wentStore
        ? [
            springSmsChoice('「你最後選的那條背帶，我還是覺得很適合你。」', ['「謝謝妳，妳剛剛幫我看了好幾次，我自己也比較放心。」'], 3),
            springSmsChoice('「今天從逛店到練團，時間過得好快。」', ['「嗯，今天一下子就過去了。謝謝妳陪我。」'], 3),
            springSmsChoice('「下次我還想試試看那把展示琴。」', ['「好啊，下次有空再一起去，不用急。」'], 3),
          ]
        : [
            springSmsChoice('「你們每次收工都還要再聊一輪嗎？」', ['「有時候是，剛好想到什麼就多說幾句。」'], 2),
            springSmsChoice('「我真的很喜歡你們這種氣氛。」', ['「能一起玩音樂，也能一起笑，滿難得的。」'], 3),
            springSmsChoice('「下次我還想坐近一點看你們怎麼配合。」', ['「好啊，下次幫妳留個舒服的位置。」'], 3),
          ]),
    springSmsRound(
      r3 === 0
        ? '下次再讓妳坐近一點，不過先幫妳挑個舒服的位置。'
        : r3 === 1
          ? '我也覺得今天很開心。能一起練音樂、一起笑，真的滿難得的。'
          : '好啊，下次再見。到時候再讓妳聽我們練新的歌。',
      [
      springSmsChoice('「晚安，今天謝謝你們讓我旁聽。」', ['「不客氣，妳願意來我們也很開心。晚安。」'], 3),
      springSmsChoice('「你也早點休息，今天彈得很棒。」', ['「謝謝妳，晚安。」'], 3),
      springSmsChoice('「下次見喔，我還會來的。」', ['「好啊，下次見。」'], 2),
    ]),
  ]
}

const springNaturalMemberSmsRounds = (
  character: SpringMemberSmsId,
  context: SpringDayContext,
  replies: number[],
): SpringSmsRound[] => {
  const wentStore = context.storeCharacter === character
  const learned = context.lessonCharacter === character
  if (learned) return springNaturalLessonSmsRounds(character, context, replies)
  return springNaturalRehearsalSmsRounds(character, replies, wentStore)
}


export const getSpringSmsOpeners = (character: SpringCharacterId, context: SpringDayContext): { text: string; response: string; affection: number }[] => {
  if (character === 'yanming') return springYanmingSmsOpeners(context)
  return springNaturalMemberSmsOpeners(character as SpringMemberSmsId, context)
}



export const getSpringSmsRounds = (character: SpringCharacterId, context: SpringDayContext, smsReplies: number[] = []): SpringSmsRound[] => {
  if (character === 'yanming') return springYanmingSharedSmsRounds(context, smsReplies)
  return springNaturalMemberSmsRounds(character as SpringMemberSmsId, context, smsReplies)
}
