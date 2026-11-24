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
  { kind: 'dialogue', speaker: '錢佑達', text: '欸欸欸！今天練《軋車》對不對？' },
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
    prompt: '想到剛才練《軋車》的場面，你怎麼接話？',
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
    springSmsRound('剛把練團室的門鎖好。今天有人把譜架忘在角落，我差點也跟著一起關門回家。', [
      springSmsChoice('「哈哈哈，還好你有發現，不然明天又要找半天。」', ['「對啊，明天一早又要有人問我東西去哪了。」'], 2),
      springSmsChoice('「你每天都要幫大家收拾善後喔？」', ['「習慣了啦。場地是我在顧，總不能真的放著不管。」'], 3),
      springSmsChoice('「那你今天也辛苦了，老闆先生。」', ['「突然叫老闆先生，聽起來好像要跟我談租金。」'], 3),
    ]),
    springSmsRound(
      r0 === 0
        ? '明天還得提醒他們把譜架放回原位，不然我每次都像在玩尋寶。'
        : r0 === 1
          ? '其實收場也沒那麼麻煩，就是東西多，少一樣就會卡住下一組進來。'
          : '老闆先生就不用了啦，叫諺明就好，聽起來比較像在聊天。',
      r0 === 0
        ? [
            springSmsChoice('「下次我幫你貼標籤，誰亂放就抓誰。」', ['「這個提議不錯，妳來當巡查員好了。」'], 3),
            springSmsChoice('「你可以收他們保管費啊。」', ['「那可能先收到一堆抱怨，還不如自己收。」'], 2),
            springSmsChoice('「你真的很像大家的大家長欸。」', ['「大家長太老了吧，我只是把事情顧好而已。」'], 3),
          ]
        : r0 === 1
          ? [
              springSmsChoice('「你做事真的很仔細，難怪大家都放心把場地交給你。」', ['「謝謝妳這樣說。事情先處理好，大家用起來才方便。」'], 3),
              springSmsChoice('「那你自己有沒有好好休息？」', ['「有啦，等一下回去就休息。妳也不用一直替我操心。」'], 3),
              springSmsChoice('「下次我去幫忙，你負責指揮就好。」', ['「好啊，不過我怕妳做兩分鐘就開始跟我討飲料。」'], 2),
            ]
          : [
              springSmsChoice('「好啦諺明，這樣叫比較親切吧。」', ['「這樣就很好。妳不用每次都這麼客氣。」'], 3),
              springSmsChoice('「那我下次就直接叫你，諺明！」', ['「好，聽到了。下次不要隔著整間練團室喊就好。」'], 2),
              springSmsChoice('「可是老闆先生聽起來比較有威嚴啊。」', ['「那妳要是把器材弄亂，我就用老闆的身份找妳算帳。」'], 2),
            ]),
    springSmsRound(
      r1 === 0
        ? '標籤這件事我認真考慮一下。說不定真的可以少找幾次東西。'
        : r1 === 1
          ? '妳剛才問我有沒有休息，我才想到今天晚餐還沒吃。等一下先去找點東西。'
          : '我剛剛看了一下明天的場地安排，下午那組提早半小時，還好現在確認到了。',
      [
        springSmsChoice('「快去吃飯啦，不要又忙到忘記時間。」', ['「好，這次先去吃，不跟妳爭。」'], 3),
        springSmsChoice('「你是不是什麼事情都要自己確認一遍？」', ['「差不多吧，確認過比較安心，也省得別人白跑。」'], 2),
        springSmsChoice('「下次我去的時候幫你檢查譜架有沒有歸位。」', ['「那我就先謝謝妳了，巡查員。」'], 3),
      ]),
    springSmsRound(
      r2 === 0
        ? '我已經找到東西吃了。剛才經過巷口那家麵店，老闆還問我怎麼今天這麼晚。'
        : r2 === 1
          ? '有時候事情交給別人也不是不行，只是我習慣先把該確認的弄好。'
          : '好，那下次妳來我就把巡查工作交給妳。先說好，不能只檢查我一個人。',
      [
        springSmsChoice('「你跟附近店家也都很熟喔？」', ['「常常經過，自然就認識了。那家麵還不錯，下次可以帶妳去。」'], 3),
        springSmsChoice('「我懂啦，只是你也要留一點時間給自己。」', ['「知道了，妳這句我會記得。」'], 3),
        springSmsChoice('「那我專門檢查你有沒有偷懶。」', ['「這個工作聽起來很危險，我要先想想。」'], 3),
      ]),
    springSmsRound(
      r3 === 0
        ? '下次帶妳去吃那家麵店吧。不是什麼特別的店，不過我自己常去。'
        : r3 === 1
          ? '今天就先這樣吧。妳也忙了一天，早點休息，別一直掛著我的事。'
          : '巡查員的職位先替妳留著。下次來之前傳個訊息，我好安排一下。',
      [
        springSmsChoice('「好啊，我想吃你平常會去的店。」', ['「那就說好了，下次帶妳去。」'], 4),
        springSmsChoice('「我才沒有一直掛著你，是順便關心一下！」', ['「好，知道妳是順便。還是謝謝妳。」'], 3),
        springSmsChoice('「收到！下次我會先報備，不讓你措手不及。」', ['「好，等妳訊息。晚安。」'], 3),
      ]),
  ]
}

const springYanmingSharedSmsRounds = (context: SpringDayContext, replies: number[]): SpringSmsRound[] => {
  const wentStore = context.storeCharacter === 'yanming'
  const ateDinner = context.afterChoice === 'yanming-dinner'
  const dessert = context.dinnerReplies?.[5]
  const r0 = replies[0] ?? 0
  const r1 = replies[1] ?? 0
  const r2 = replies[2] ?? 0
  const r3 = replies[3] ?? 0

  if (ateDinner) return [
    springSmsRound(
      dessert === 0 || dessert === 2
        ? '剛剛看妳吃那碗紅豆湯，最後一口還捨不得放下湯匙。'
        : '剛剛看妳吃到最後真的飽了，我就沒再勸妳點甜湯。吃舒服比較重要。',
      [
        springSmsChoice('「那碗真的很好吃啊，我差點想再叫一碗。」', ['「我就猜到妳會喜歡。下次如果還想吃，我們再去。」'], 3),
        springSmsChoice('「我是真的飽了，再吃會走不動啦。」', ['「我知道，所以才沒勉強妳。吃舒服比較重要。」'], 2),
        springSmsChoice('「你剛剛也吃得很開心吧？」', ['「有啊，難得不用趕時間，慢慢吃一頓很好。」'], 3),
      ]),
    springSmsRound(
      r0 === 0
        ? '我回家路上還想到妳最後那口紅豆湯，吃得很認真，差點想幫妳把碗也打包。'
        : r0 === 1
          ? '妳剛剛說吃不下，我就沒再叫甜湯。看妳吃得舒服，比多點一道菜重要。'
          : '今天難得坐下來慢慢吃飯，沒有一直看時間，感覺滿好的。',
      [
        springSmsChoice('「你不要笑我，我是真的很喜歡那碗啦。」', ['「沒有笑妳，我是覺得妳吃得開心很好。」'], 3),
        springSmsChoice('「你真的很會照顧人欸。」', ['「只是看妳已經飽了，就不想再勉強妳。」'], 3),
        springSmsChoice('「下次換我帶你去吃別的！」', ['「好啊，我等妳推薦。只要不要讓我猜半天要吃什麼就好。」'], 3),
      ]),
    springSmsRound(
      r1 === 0
        ? '妳剛剛說喜歡那碗湯，我已經記下來了。下次如果去那附近，再看看有沒有開。'
        : r1 === 1
          ? '妳說我會照顧人，這個稱讚我收下了。平常被說囉嗦比較多。'
          : '那就交給妳安排了。我不太挑店，主要是想找個地方好好吃飯。',
      [
        springSmsChoice('「那下次一定要再點紅豆湯！」', ['「好，幫妳留一碗，免得又捨不得放下。」'], 3),
        springSmsChoice('「誰說你囉嗦，我覺得剛剛好。」', ['「那我就放心了，不然還怕自己講太多。」'], 4),
        springSmsChoice('「我先賣個關子，到時候你就知道了。」', ['「好，那我等著。妳不要到時候自己也忘記。」'], 3),
      ]),
    springSmsRound(
      r2 === 0
        ? '我剛把明天要處理的事情排好了，今天就不再看工作訊息了。'
        : r2 === 1
          ? '被妳這樣講，我下次可能真的要少提醒兩句，免得被妳嫌囉嗦。'
          : '今天這頓飯我也吃得很舒服。下次換妳帶路，我就負責跟著走。',
      [
        springSmsChoice('「很好，今天下班了就不准再看工作。」', ['「好，今天聽妳的。」'], 3),
        springSmsChoice('「你少講兩句，我可能還會不習慣欸。」', ['「那我就保留一點，免得妳突然覺得太安靜。」'], 3),
        springSmsChoice('「你只要負責吃，不准挑剔。」', ['「好啊，這個任務我應該做得到。」'], 3),
      ]),
    springSmsRound('今天謝謝妳一起吃飯。回去早點休息，下次想吃什麼再跟我說。', [
      springSmsChoice('「我也很開心，晚安諺明哥！」', ['「晚安，回去路上小心。」'], 3),
      springSmsChoice('「下次換我請你，不准搶著結帳。」', ['「好啊，那我就不跟妳客氣了。」'], 3),
      springSmsChoice('「晚安，你也不要忙到太晚。」', ['「好，我會記得。晚安。」'], 2),
    ]),
  ]

  if (wentStore) return [
    springSmsRound('今天妳陪我看器材，還幫我拿著清單對規格。說真的，有人一起看比我一個人慢慢比快多了。', [
      springSmsChoice('「我只是怕你買錯，回去又要後悔。」', ['「這倒是真的，妳剛才提醒我的那個尺寸差點就漏掉了。」'], 3),
      springSmsChoice('「你自己也看得很仔細啊，我只是陪你而已。」', ['「有人在旁邊一起確認，還是比較放心。」'], 2),
      springSmsChoice('「那顧問費要怎麼算？」', ['「先欠著，改天請妳吃飯，這樣可以嗎？」'], 4),
    ]),
    springSmsRound(
      r0 === 0
        ? '我把剛才那張清單又看了一遍，妳提醒我的那個尺寸真的不能漏。'
        : r0 === 1
          ? '妳說只是陪我而已，但妳剛才看得比我還認真，這可不是隨便陪陪。'
          : '顧問費先記帳。妳不要現在就開始算利息，我還沒領薪水。',
      [
        springSmsChoice('「那你要記得，下次不能裝作忘記。」', ['「不會忘啦，妳都講得這麼清楚了。」'], 3),
        springSmsChoice('「我本來就很有當採購的天分吧？」', ['「有一點，至少比我想像中可靠。」'], 3),
        springSmsChoice('「利息當然要算，不然我不是虧大了。」', ['「好啦，知道妳很會做生意了。」'], 3),
      ]),
    springSmsRound(
      r1 === 0
        ? '我已經把清單收好了。下次補貨照著看，就不用再問店員一遍。'
        : r1 === 1
          ? '妳說自己有採購天分，我倒覺得妳比較適合當監督，專門抓我有沒有亂買。'
          : '我看這筆顧問費不能拖太久，不然妳下次來可能會拿帳本堵我。',
      [
        springSmsChoice('「我可以幫你做一張正式的採購表！」', ['「好啊，這樣我可能真的會輕鬆不少。」'], 3),
        springSmsChoice('「監督員也要有薪水，不能白做。」', ['「知道了，監督員的薪水也一起記帳。」'], 3),
        springSmsChoice('「你現在才知道我很會記帳喔？」', ['「今天算是見識到了，不能小看妳。」'], 3),
      ]),
    springSmsRound(
      r2 === 0
        ? '下次如果還要買東西，我再問妳有沒有空。當然，不會只找妳來搬東西。'
        : r2 === 1
          ? '好啦，監督員也要休息。今天謝謝妳陪我跑這一趟。'
          : '我先去把東西放好，今天就不再忙別的了。',
      [
        springSmsChoice('「那你要先請我吃東西才行。」', ['「好，這個條件合理。」'], 3),
        springSmsChoice('「你今天也辛苦啦，早點回去休息。」', ['「好，妳也是。晚安。」'], 3),
        springSmsChoice('「下次我還要去，這次我已經上手了。」', ['「好啊，下次再一起去。」'], 3),
      ]),
    springSmsRound('今天謝謝妳。回去早點休息，路上小心。下次再找時間一起逛。', [
      springSmsChoice('「晚安諺明哥，顧問費不要忘記！」', ['「不會忘，晚安。」'], 3),
      springSmsChoice('「好啊，下次見！」', ['「下次見。」'], 2),
      springSmsChoice('「你也早點休息，不准又忙到很晚。」', ['「知道了，妳也是。」'], 3),
    ]),
  ]

  return springYanmingOwnerSmsRounds(replies)
}



const springYanmingSmsOpeners = (context: SpringDayContext): { text: string; response: string; affection: number }[] => {
  if (context.afterChoice === 'yanming-dinner') return [
    { text: '「我到家了！今天那碗紅豆湯我還在想。」', response: '「到家就好。看妳吃得那麼開心，我也覺得沒帶錯地方。」', affection: 3 },
    { text: '「今天謝謝你陪我吃飯，感覺好久沒有這樣慢慢吃了。」', response: '「我也是。平常事情一多，常常吃飯都在趕時間。」', affection: 3 },
    { text: '「下次換我帶你去吃我私藏的店！」', response: '「好啊，那我就等妳帶路了。」', affection: 4 },
  ]
  if (context.storeCharacter === 'yanming') return [
    { text: '「我回家才發現，今天根本是陪你逛器材逛到忘記時間。」', response: '「哈哈，抱歉啦，有幾樣東西真的想確認清楚。不過有妳一起看，時間過得比較快。」', affection: 3 },
    { text: '「你那張清單也太詳細了吧，我眼睛都快花了。」', response: '「習慣了，不先記下來很容易漏東西。妳今天倒是幫了不少忙。」', affection: 3 },
    { text: '「顧問費先欠著喔，我有記帳的。」', response: '「知道了，這筆不敢賴。改天請妳吃飯。」', affection: 4 },
  ]
  return [
    { text: '「我到家了～你那邊也收工了嗎？」', response: '「剛把門鎖好，正準備回去。今天比平常晚一點。」', affection: 3 },
    { text: '「你今天是不是又忙到忘記吃飯了？」', response: '「差一點，被妳提醒才想到。等一下會去吃，不用擔心。」', affection: 3 },
    { text: '「今天謝謝你幫忙顧著大家，辛苦啦。」', response: '「不會，這本來就是我該做的。妳今天也忙了一整天，早點休息。」', affection: 3 },
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
          { text: '「你剛剛突然把手收回去，我還以為你害羞欸。」', response: '「蛤？我哪有，是妳突然抬頭看我，我一時不知道要看哪裡啦。」', affection: 4 },
          { text: '「我比較在意你耳朵怎麼紅了。」', response: '「妳今天是來學吉他，還是來檢查我耳朵的？」', affection: 4 },
        ]
      : [
          { text: '「我回家才發現手指真的有點酸，今天玩太多了啦。」', response: '「現在才發現喔？妳剛剛每個和弦都要再試一次，當然會酸。」', affection: 2 },
          { text: '「你剛剛明明一臉很認真，結果還是有偷笑我。」', response: '「我哪有笑妳，是妳那個表情真的很好笑……欸，不是啦，是很有趣。」', affection: 3 },
          { text: '「撥片我收好了，不准反悔喔。」', response: '「送妳就送妳，誰跟妳反悔啦。收好，不要又弄丟。」', affection: 3 },
        ]
    if (character === 'ashin') return touched
      ? [
          { text: '「剛剛摸到你指尖的時候，我真的有點不敢用力。」', response: '「我有感覺到妳很小心啊。沒關係的，不用那麼緊張。」', affection: 3 },
          { text: '「原來你手上的繭摸起來是這種感覺，跟我想像的不太一樣。」', response: '「是不是？看起來可能比較明顯，摸起來其實早就習慣了。」', affection: 3 },
          { text: '「我本來怕你會覺得我很奇怪，結果你比我還自然。」', response: '「不會啦，我知道妳只是好奇。妳不用一直擔心我怎麼想。」', affection: 3 },
        ]
      : [
          { text: '「我回家還記得最後那次換和弦，真的順過去了！」', response: '「我有看到，妳那一下整個人都放鬆了，聲音也乾淨很多。」', affection: 3 },
          { text: '「謝謝你一直等我，我前面真的卡了好久。」', response: '「不用謝啊，妳後來有抓到就好。我沒有覺得等很久。」', affection: 3 },
          { text: '「你剛剛沒有催我，我反而比較敢一直試。」', response: '「那就好。我怕一直提醒妳，反而讓妳更緊張。」', affection: 3 },
        ]
    if (character === 'masa') return touched
      ? [
          { text: '「你手上的繭也太有存在感了吧，我差點以為摸到砂紙。」', response: '「謝謝喔，這個形容很有禮貌。妳要不要再摸一次確認？」', affection: 2 },
          { text: '「你剛剛是不是有點怕癢？」', response: '「沒有，是妳手法很像在檢查水果熟不熟。」', affection: 3 },
          { text: '「我只是好奇，沒有要笑你啦。」', response: '「最好是。妳剛才那個表情已經把心裡話寫出來了。」', affection: 2 },
        ]
      : [
          { text: '「我回家才發現手指酸到不想碰手機了。」', response: '「恭喜，妳今天終於有認真上課。先休息，不要又逞強。」', affection: 2 },
          { text: '「我最後真的有按出來欸！是不是很厲害！」', response: '「有啦，這次有及格。先不要急著跟我討獎狀。」', affection: 3 },
          { text: '「你今天一直吐槽我，但其實有在認真教嘛。」', response: '「不然咧，學費收了就要負責，雖然妳還沒付。」', affection: 3 },
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
    { text: '「佑達今天根本想把《軋車》改成個人秀。」', response: '「我差點把他的鼓棒沒收，真的。還好最後有把歌救回來。」', affection: 2 },
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
        ? '欸，我剛剛才想到，妳摸完我的手還很認真地點頭，搞得我好像在接受什麼專業鑑定。'
        : '我剛把吉他收好，腦袋還停在妳最後那個和弦。前面一直跟它過不去，結果最後突然就通了。',
      touched
        ? [
            springSmsChoice('「我是在認真研究吉他手的職業傷害好嗎！」', ['「職業傷害？妳講得我好像工地師傅。下次要不要順便幫我開診斷證明？」'], 3),
            springSmsChoice('「誰叫你突然把手收回去，我還以為你害羞欸。」', ['「蛤？我只是手有點不知道要放哪裡啦，妳不要自己加戲。」'], 4),
            springSmsChoice('「鑑定結果：手很好看，可以再借我看一次。」', ['「……妳現在是把我當展示品喔？下次再說啦。」'], 4),
          ]
        : [
            springSmsChoice('「我自己都不敢相信欸！前面明明一直是雜音。」', ['「所以我才叫妳再試一次啊。妳一成功，整個人都亮起來了。」'], 3),
            springSmsChoice('「還不是你一直在旁邊救我，功勞分你一半！」', ['「少來，手是妳自己的，按出聲音也是妳的功勞。不要亂分。」'], 3),
            springSmsChoice('「我比較記得你靠過來幫我調手指的時候。」', ['「……欸，妳到底有沒有在學琴？這種事記那麼清楚。」'], 4),
          ]),
    springSmsRound(
      r0 === 0
        ? '妳剛剛那聲「有了」真的很大聲欸，我差點以為隔壁也要替妳鼓掌。'
        : r0 === 1
          ? '妳很會欸，明明自己做到了，還硬要把功勞塞給我。'
          : '妳剛剛那句我有聽到啦，只是先假裝沒聽到，免得妳又得寸進尺。',
      r0 === 0
        ? [
            springSmsChoice('「我忍了那麼久，當然要慶祝一下啊！」', ['「好啦，准妳得意三分鐘。三分鐘後記得把和弦練熟。」'], 2),
            springSmsChoice('「你明明也笑得很開心，還想裝喔？」', ['「我是在替妳高興好不好，這也要被妳抓包。」'], 3),
            springSmsChoice('「下次教我更難的，我要升級！」', ['「先不要急著升級，今天這關還沒完全過關咧。」'], 3),
          ]
        : r0 === 1
          ? [
              springSmsChoice('「你真的很有耐心欸，換別人早就被我煩死了。」', ['「我哪有那麼容易不耐煩。妳肯一直試，我就繼續教啊。」'], 3),
              springSmsChoice('「下次我自己練給你看，讓你嚇一跳。」', ['「好啊，我等著驗收。不要只有嘴巴說得很厲害喔。」'], 3),
              springSmsChoice('「你剛剛明明很得意，嘴角都快翹到天花板了。」', ['「有成功我當然高興啊，不然我要哭喔？」'], 3),
            ]
          : [
              springSmsChoice('「我記性很好，尤其是重要的畫面。」', ['「妳喔……講話真的很會繞。好啦，這句我先收著。」'], 4),
              springSmsChoice('「那你現在是不是不敢看我了？」', ['「誰不敢看妳？我只是懶得跟妳鬥嘴啦。」'], 3),
              springSmsChoice('「好啦不鬧你了，下次還要你教。」', ['「這還差不多。下次來不要又把今天的忘光。」'], 3),
            ]),
    springSmsRound(
      r1 === 0
        ? '我剛剛本來想再教妳一個，後來看到妳指尖紅成那樣，還是算了。'
        : r1 === 1
          ? '妳說下次要讓我嚇一跳喔？好，我先把標準拉高一點，免得妳太得意。'
          : '剛才那句我不是沒聽見啦。只是當面講跟打字講，好像還是有點不一樣。',
      [
        springSmsChoice('「我還可以再練一下啦，真的沒那麼脆弱。」', ['「妳現在逞強，明天手痛又要怪我。今天先放過妳。」'], 2),
        springSmsChoice('「你是不是怕我手痛？承認一下又不會怎樣。」', ['「我是怕妳明天連筷子都拿不穩，少亂想。」'], 3),
        springSmsChoice('「你剛剛沒說完的話，要不要現在補完？」', ['「……先欠著啦。妳今天已經很會欺負人了。」'], 4),
      ]),
    springSmsRound(
      wentStore
        ? (r2 === 0 ? '對了，妳在效果器那邊踩了好幾次的那顆，我把型號記下來了。下次不用再找半天。' : r2 === 1 ? '妳今天看效果器看得比我還認真，差點以為是妳要買。' : '我剛剛想到，妳在店裡試完那顆還回頭看了一眼，真的有那麼喜歡喔？')
        : (r2 === 0 ? '妳的撥片我有幫妳收好，別跟零錢塞在一起，回家又找不到。' : r2 === 1 ? '今天那片撥片先留著啦，別第一天就弄丟，會被我笑很久。' : '欸，妳今天一直說要補課，我可沒答應要讓妳偷懶喔。'),
      wentStore
        ? [
            springSmsChoice('「你居然記得我喜歡哪一顆喔？」', ['「妳踩完又回頭踩一次，我想忘記也難。」'], 3),
            springSmsChoice('「下次讓我自己試，不准你先按。」', ['「好啦，讓妳當主控。這次不要又踩太早就好。」'], 3),
            springSmsChoice('「我只是覺得那個聲音很像在變魔法！」', ['「哪有那麼誇張，妳形容得倒是很有畫面。」'], 2),
          ]
        : [
            springSmsChoice('「收好了！第一堂課紀念品欸。」', ['「才第一堂就要紀念喔，妳還滿會的嘛。」'], 3),
            springSmsChoice('「你怎麼知道我會弄丟？我很可靠好嗎！」', ['「妳今天連筆都差點忘在椅子上，這句說服力不太夠。」'], 2),
            springSmsChoice('「那下次送我不同顏色的，集滿一套！」', ['「先把這片顧好再說啦，要求倒是不少。」'], 2),
          ]),
    springSmsRound(
      r3 === 0
        ? '好啦，今天真的到這裡。妳手指先休息，不准回家又偷偷練到半夜。'
        : r3 === 1
          ? '我等一下也要收工了。今天這堂課算妳有進步，先不要急著跟我討下一堂。'
          : '時間不早了，妳也該休息。今天嘴巴很厲害，手指倒是辛苦了。',
      [
        springSmsChoice('「知道啦，吉他老師管好多喔。」', ['「我不管妳，明天手痛又要怪我。晚安啦。」'], 2),
        springSmsChoice('「你也不准練到忘記時間，不然我會查勤。」', ['「蛤，還查勤咧。好啦，我會收。」'], 3),
        springSmsChoice('「晚安！下次我一定要彈得比今天好。」', ['「好啊，我等著聽。不要只會先放話喔。」'], 3),
      ]),
  ]

  if (character === 'ashin') return [
    springSmsRound(
      touched
        ? '剛才妳看我手指看得很專心，我差點以為自己要被打分數了。其實那些繭早就習慣了。'
        : '我剛剛把琴收起來，還想到妳最後終於按出那個和弦的樣子。妳自己好像也嚇了一跳。',
      touched
        ? [
            springSmsChoice('「我怕弄痛你嘛，剛剛看你手指都磨出繭了。」', ['「不會啦，真的早就習慣了。倒是妳自己的手也紅紅的，回去要休息喔。」'], 3),
            springSmsChoice('「你一直把手攤著給我看，我才不知道要不要碰。」', ['「是我自己說可以的呀，妳不用那麼拘謹。」'], 3),
            springSmsChoice('「我只是想多看一下，平常哪有機會看到吉他手的手。」', ['「欸，原來是這樣。那我今天算是提供教材了。」'], 3),
          ]
        : [
            springSmsChoice('「我真的以為又會只有雜音，突然成功我自己也嚇到！」', ['「我有聽到啊，那一下很清楚。妳先愣住，然後才笑出來。」'], 3),
            springSmsChoice('「你笑得比我還開心耶。」', ['「有啊，看到妳成功，我也會跟著開心嘛。」'], 3),
            springSmsChoice('「我比較記得你坐在旁邊陪我的樣子。」', ['「……那我今天應該也算有幫上忙了。」'], 4),
          ]),
    springSmsRound(
      r0 === 0
        ? '妳剛剛那個表情真的很可愛，像是連自己都不敢相信做到了。'
        : r0 === 1
          ? '其實我也有點替妳緊張，怕妳一直按不出聲音會越來越沒信心。'
          : '妳剛才那句我有放在心上喔，不是隨便聽聽而已。',
      r0 === 0
        ? [
            springSmsChoice('「我本來都想放棄了，結果突然有聲音，太神奇了！」', ['「所以才說不用急嘛。有時候多試幾次，就會突然抓到了。」'], 3),
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
        ? '我剛剛把那個和弦的位置記在紙上了，怕下次妳一坐下來又要重新找。'
        : r1 === 1
          ? '其實妳不需要每次都等我救援。妳自己慢慢試的時候，反而比較容易找到手感。'
          : '剛剛那句稱讚我先收下了。今天回去路上想到，還是會有點開心。',
      [
        springSmsChoice('「你還真的幫我記下來喔，謝謝你。」', ['「不客氣呀，這樣下次就不用從頭找了。」'], 3),
        springSmsChoice('「我怕一放下琴就忘記剛剛那個聲音。」', ['「那就先記住成功的感覺，不用急著把每個細節都背起來。」'], 3),
        springSmsChoice('「你不要偷偷期待我下次又成功喔。」', ['「有一點期待啊，但妳不用有壓力。」'], 4),
      ]),
    springSmsRound(
      wentStore
        ? '今天在樂器行那兩把木吉他的聲音，我回來後還有想起來。妳後來抱著琴，肩膀就沒那麼僵了。'
        : '剛才看妳一直揉指尖，我本來想問是不是很痛，後來又怕一直提醒妳，反而讓妳更在意。',
      wentStore
        ? [
            springSmsChoice('「我一開始真的不知道怎麼抱，還好你有幫我調。」', ['「下次我先幫妳調好，妳就可以直接試，不用手忙腳亂。」'], 3),
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
        ? '那今天就先把這個和弦留在記憶裡。下次再接著練，不用急著一次學很多。'
        : r2 === 1
          ? '我有記得妳說想再聽那把琴。下次如果時間剛好，我再彈給妳聽。'
          : '妳剛才說不用我救援，我會記得。下次先讓妳自己試，我在旁邊陪妳。',
      [
        springSmsChoice('「好，那下次不准突然考我喔。」', ['「不考妳啦，先讓妳玩得開心比較重要。」'], 3),
        springSmsChoice('「我會偷偷練，等你嚇一跳。」', ['「那我就期待一下。不要把自己逼太緊喔。」'], 3),
        springSmsChoice('「你也可以有不會的地方啊，我又不會笑你。」', ['「那我先把這句記下來，以後真的有不會的再問妳。」'], 4),
      ]),
]

  if (character === 'masa') return [
    springSmsRound(
      touched
        ? '剛才那個檢查員，報告寫好了沒？先說喔，老師只接受有建設性的意見。'
        : '我把Bass收起來了。妳剛才那段節奏前面自己跑出去散步，後面倒是有追回來。',
      touched
        ? [
            springSmsChoice('「檢查員很專業，當然要從頭到尾仔細檢查。」', ['「好喔，那報告記得寫優點，不准只挑毛病。」'], 3),
            springSmsChoice('「你明明一直在笑，還裝得很鎮定。」', ['「我是在配合檢查員，服務態度要好一點嘛。」'], 2),
            springSmsChoice('「我只是想知道你平常練Bass有多辛苦。」', ['「這個理由勉強可以接受，至少不是純粹找我麻煩。」'], 3),
          ]
        : [
            springSmsChoice('「那個音是故意的，增加一點驚喜。」', ['「喔？妳的驚喜還滿多的，下次先通知我一聲。」'], 2),
            springSmsChoice('「你不要只記得那個音，我後面明明有跟上！」', ['「有啦，後面那段有跟上，這句算稱讚。」'], 3),
            springSmsChoice('「下次我要練到你沒話可以吐槽。」', ['「這個目標比學Bass還困難，妳慢慢努力。」'], 3),
          ]),
    springSmsRound(
      r0 === 0
        ? '妳剛才替那個失誤找理由的速度，比妳彈Bass還快。'
        : r0 === 1
          ? '好啦，我承認後面那段有比較穩。這句不用妳再提醒。'
          : '妳說要練到我閉嘴，我先把這句存證，免得妳下次裝沒說過。',
      r0 === 0
        ? [
            springSmsChoice('「我這叫臨場反應，懂不懂？」', ['「懂啊，臨場把自己嚇到的那種反應。」'], 2),
            springSmsChoice('「你真的很愛抓我小辮子欸。」', ['「沒辦法，妳提供的素材太豐富了。」'], 3),
            springSmsChoice('「那你下次不要看我，我就不會緊張。」', ['「好啊，我閉眼彈，出事不要怪我。」'], 2),
          ]
        : r0 === 1
          ? [
              springSmsChoice('「只有比較穩？你稱讚人真的很省字欸。」', ['「有稱讚就不錯了，還想要幾個字？」'], 2),
              springSmsChoice('「我就知道你有看到我努力。」', ['「有啦，妳一直重來，我又不是瞎子。」'], 3),
              springSmsChoice('「下次我進步更多，你就要請我吃飯。」', ['「妳這個進步還附帶收費喔？先把歌練好再談。」'], 3),
            ]
          : [
              springSmsChoice('「你閉嘴三分鐘，我就算成功了。」', ['「三分鐘？妳也太看得起我了。」'], 2),
              springSmsChoice('「你是不是很怕我真的學會？」', ['「我怕的是妳學會以後換妳每天嫌我。」'], 3),
              springSmsChoice('「那你等著，我會讓你刮目相看。」', ['「好，這句我記下來。不要到時候先忘記自己說過什麼。」'], 3),
            ]),
    springSmsRound(
      r1 === 0
        ? '我剛才把今天那段重新在腦袋裡播一次，妳那個臨場反應真的很有創意。'
        : r1 === 1
          ? '妳說我稱讚得省字，我現在補一句：今天後面那段有進步。好了，額度用完。'
          : '妳要我請吃飯是不是？先排隊，今天還有人欠我一杯飲料。',
      [
        springSmsChoice('「你補稱讚的樣子好勉強喔。」', ['「不然咧，我又不是頒獎典禮主持人。」'], 2),
        springSmsChoice('「我才不要飲料，我要吃大餐。」', ['「要求越來越高欸，妳先把Bass練到不走音再說。」'], 3),
        springSmsChoice('「你其實覺得我滿有天分的吧？」', ['「妳要我講幾次？有進步啦。不要逼我講肉麻的。」'], 4),
      ]),
    springSmsRound(
      wentStore
        ? '妳今天在樂器行幫我看規格，至少有阻止我被店員講到暈。這件事先不要拿去邀功。'
        : '佑達剛剛還在替自己的鼓花辯護，說那叫臨場發揮。我差點把他的鼓棒藏起來。',
      wentStore
        ? [
            springSmsChoice('「顧問費呢？我可是很認真欸。」', ['「先記帳啦，妳不要連利息都算進去。」'], 3),
            springSmsChoice('「你明明很需要我，還嘴硬。」', ['「我只是承認妳有一點用，不要自己加戲。」'], 3),
            springSmsChoice('「下次我還要去，這次我有經驗了。」', ['「可以啊，先說好，不准拿我的購物清單亂畫。」'], 2),
          ]
        : [
            springSmsChoice('「拜託把鼓棒藏起來，我想看他怎麼辦。」', ['「妳比我還狠欸。真的藏了他大概會翻遍整間練團室。」'], 3),
            springSmsChoice('「他那叫創意啦，你們不要欺負他。」', ['「妳現在是他的辯護律師喔？那下次妳去跟他溝通。」'], 2),
            springSmsChoice('「你們每次都這樣吵嗎？」', ['「差不多啦，習慣了。安靜才奇怪。」'], 3),
          ]),
    springSmsRound(
      r3 === 0
        ? '好啦，顧問費我記著。不要每天傳訊息來催，會讓我覺得自己欠了高利貸。'
        : r2 === 1
          ? '妳剛剛替佑達講話那麼大聲，下次他真的亂來，我就把妳一起算進去。'
          : '今天這樣鬧一鬧也差不多了。回去不要再練到手指罷工，明天還要用。',
      [
        springSmsChoice('「我可以每天提醒你一次，直到你付錢。」', ['「不用，妳這個催款方式比銀行還可怕。」'], 2),
        springSmsChoice('「好啦，我下次會先把他抓去旁邊談判。」', ['「拜託妳了，談判成功我請妳吃東西。」'], 3),
        springSmsChoice('「你居然會關心我的手指喔？」', ['「我是不想下次又要等妳休息半天，進度很慢欸。」'], 3),
      ]),
]

  return [
    springSmsRound(
      touched
        ? '剛才妳碰到我手指的時候很小心，我有注意到。其實不用擔心弄痛我，這些繭早就習慣了。'
        : '我剛才把吉他收回去，想到妳最後那一下終於按順了，整個人都放鬆下來。',
      touched
        ? [
            springSmsChoice('「我怕弄痛你啊，當然要小心一點。」', ['「我知道，妳剛才真的很小心。謝謝妳有注意到。」'], 3),
            springSmsChoice('「你把手伸過來的時候，我反而有點緊張。」', ['「我也有一點，不過看妳那麼認真，就覺得沒什麼好尷尬的。」'], 4),
            springSmsChoice('「下次換你檢查我的手，公平一點。」', ['「好啊，不過我會先問妳可不可以，不會偷襲。」'], 4),
          ]
        : [
            springSmsChoice('「我真的卡好久，還好最後有成功。」', ['「有啊，後來妳放鬆一點，手指就比較順了。」'], 3),
            springSmsChoice('「謝謝你沒有一直催我，我反而比較敢試。」', ['「我知道妳需要一點時間，所以才想讓妳照自己的速度來。」'], 3),
            springSmsChoice('「你剛剛看我成功的時候也笑了。」', ['「有啊，看到妳開心，我也會跟著開心。」'], 3),
          ]),
    springSmsRound(
      r0 === 0
        ? '妳剛才一直怕弄痛我，結果自己手指都紅了。這個倒是要記得照顧一下。'
        : r0 === 1
          ? '妳說緊張喔？我其實也有一點，只是怕講出來妳會更不好意思。'
          : '好，那下次換我當學生。只是先說好，我可能比妳還不會。',
      [
        springSmsChoice('「我沒事啦，休息一下就好了。」', ['「好，但今天先不要再練了。明天如果還不舒服就休息。」'], 3),
        springSmsChoice('「你也會緊張？我還以為你一直都很淡定。」', ['「哪有一直淡定，只是有時候不太會表現出來。」'], 4),
        springSmsChoice('「你當學生一定很難教，我先收學費。」', ['「那我先預約一堂，學費可以用晚餐抵嗎？」'], 3),
      ]),
    springSmsRound(
      r1 === 0
        ? '那就好。下次如果手指還酸，我們就先練短一點，不用硬撐。'
        : r1 === 1
          ? '其實有些話當面講會比較不好意思，打成訊息反而容易一點。'
          : '妳連學費都想好了，感覺我還沒開始上課就先欠妳一頓飯。',
      [
        springSmsChoice('「那你下次要記得提醒我休息。」', ['「好，我會注意。妳也要記得自己說過的話。」'], 3),
        springSmsChoice('「你現在打字就不會不好意思了嗎？」', ['「還是會啦，只是妳看不到我現在的表情。」'], 4),
        springSmsChoice('「晚餐要吃好一點，我可不隨便收。」', ['「知道了，那我得先想想去哪裡才不會被妳嫌。」'], 3),
      ]),
    springSmsRound(
      wentStore
        ? '今天在樂器行挑背帶時，妳還特地幫我看肩膀那邊會不會磨。後來想想，妳注意到的地方真的很實用。'
        : '剛才大家收東西時，我還想到妳坐在旁邊跟著哼的那一小段。那個旋律好像真的黏住了。',
      wentStore
        ? [
            springSmsChoice('「因為你背起來舒服比較重要啊，不能只看好不好看。」', ['「嗯，妳說得對。後來再試一次，真的舒服很多。」'], 3),
            springSmsChoice('「下次換我挑，你不准嫌我眼光。」', ['「好啊，我倒是有點期待妳會挑什麼。」'], 3),
            springSmsChoice('「我只是怕你肩膀痛，之後又要我幫你揉。」', ['「妳想得還滿遠的。不過真的不舒服我會說啦。」'], 4),
          ]
        : [
            springSmsChoice('「我自己都沒發現我在哼欸！」', ['「我有聽到，妳哼得還滿投入的。」'], 3),
            springSmsChoice('「那首真的很容易黏在腦袋裡。」', ['「對啊，回去可能還會一直想起來。」'], 2),
            springSmsChoice('「下次我想坐近一點聽。」', ['「好啊，我幫妳留個舒服的位置，不會被音箱震到。」'], 3),
          ]),
    springSmsRound(
      r3 === 0
        ? '我會記得妳說的。下次先把舒服不舒服確認好，再慢慢挑，不用急。'
        : r2 === 1
          ? '那就說好了，下次妳負責挑，我負責老實試，不先下結論。'
          : '好啦，妳這樣講我會記得。只是先說，按摩的事不能算在器材預算裡。',
      [
        springSmsChoice('「你還真的把我說的記下來喔。」', ['「有些小事記得也沒什麼不好。」'], 3),
        springSmsChoice('「那我下次要認真挑一個讓你驚艷的。」', ['「我相信妳，至少今天的眼光就不錯。」'], 3),
        springSmsChoice('「按摩明明是額外服務，要另外收費！」', ['「好，這個價目表我先不問，怕太貴。」'], 3),
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
    springSmsRound('欸，剛才那幾遍真的有夠亂，佑達還一直說自己是故意的。妳坐在旁邊看得很開心嘛？', [
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
              springSmsChoice('「你們練團室真的不能沒有這兩個人。」', ['「是啦，不然少很多笑聲。」'], 3),
            ]
          : [
              springSmsChoice('「好啦，前面也很帥，只是最後那遍最完整。」', ['「這還差不多，妳剛剛那句差點讓我不想回了。」'], 3),
              springSmsChoice('「那你想要我從第一遍開始誇嗎？」', ['「不用，妳不要突然變得很刻意。」'], 3),
              springSmsChoice('「你很在意我有沒有看到喔？」', ['「……我只是覺得彈得好有人聽到也不錯啦。」'], 4),
            ]),
    springSmsRound(
      r1 === 0
        ? '我後來又跟佑達講了一次，他還很堅持那叫編曲想法。妳說他是不是欠吐槽？'
        : r1 === 1
          ? '妳剛剛說我也在拱火，這個我不承認。我只是沒有阻止而已。'
          : '妳那句稱讚我先收著，今天就不跟妳爭前面那幾遍了。',
      [
        springSmsChoice('「欠，而且要連本帶利吐回去。」', ['「好，這個任務交給妳。我看妳比瑪莎還狠。」'], 3),
        springSmsChoice('「你根本就是共犯，還想撇清喔。」', ['「欸，我是團長欸，總要維持一下形象吧。」'], 3),
        springSmsChoice('「你開心就好，我今天有看到你很投入。」', ['「……妳突然這樣講，我反而不知道怎麼回了。」'], 4),
      ]),
    springSmsRound(
      wentStore
        ? '妳下午在效果器那邊踩中的那顆，我後來又想了一下，配今天這首應該滿有意思。'
        : '我現在耳朵裡還有佑達的鼓聲。這首真的很適合鬧，難怪大家最後都笑成那樣。',
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
        ? '好啦，下次妳來我先讓妳試那顆效果器。不過不要一進門就把整排踩過去。'
        : r2 === 1
          ? '我承認今天有玩得滿開心的。只是不要跟其他人講，免得他們又拿這個笑我。'
          : '下次排練再讓妳驗收。這次先放過佑達，讓他以為自己真的很有創意。',
      [
        springSmsChoice('「我才不會只踩一顆，我要整排都試！」', ['「妳是來試效果器還是來拆店的？先排隊啦。」'], 3),
        springSmsChoice('「放心，我會幫你保密，收費而已。」', ['「蛤？還要收費喔，妳真的很會做生意。」'], 3),
        springSmsChoice('「你根本也很期待下次吧。」', ['「……有啦。好了，這句不要再拿出來講。」'], 4),
      ]),
]

  if (character === 'ashin') return [
    springSmsRound('剛才最後一遍收住的時候，整間練團室突然很有氣勢。我自己唱完也有點起雞皮疙瘩。', [
      springSmsChoice('「真的！前面明明亂成一團，最後突然帥起來了。」', ['「對啊，那個反差很好笑。不過大家最後有一起抓到感覺，我很喜歡。」'], 3),
      springSmsChoice('「我有看到你差點笑場，還硬是忍住。」', ['「有啦，妳不要一直提醒我，不然我現在又要笑了。」'], 3),
      springSmsChoice('「你唱進副歌的時候，我有一瞬間忘記旁邊還有人。」', ['「……妳這樣講，我會有點不好意思欸。不過謝謝妳有認真聽。」'], 4),
    ]),
    springSmsRound(
      r0 === 0
        ? '佑達剛剛還在替自己的鼓花辯護，說他是故意把大家逗笑的。'
        : r0 === 1
          ? '我剛剛想到妳一直忍笑的樣子，差點又在收琴的時候笑出來。'
          : '妳說忘記旁邊有人，我剛剛回想那一段，還真的有點害羞。',
      r0 === 0
        ? [
            springSmsChoice('「他真的很有自信欸，連亂來都能講成策略。」', ['「哈哈，他有時候就是這樣。不過他一認真起來又很可靠。」'], 3),
            springSmsChoice('「瑪莎根本是他的天敵。」', ['「他們兩個鬥嘴很有默契，常常一句接一句。」'], 2),
            springSmsChoice('「你們每次都這麼熱鬧嗎？」', ['「差不多吧。大家熟了以後，練團也會有很多好玩的事。」'], 2),
          ]
        : r0 === 1
          ? [
              springSmsChoice('「我哪有忍笑，我明明笑出聲了！」', ['「有聽到呀，所以我才更想笑。」'], 3),
              springSmsChoice('「你不要一直記我的糗事啦。」', ['「不是糗事，是覺得妳那時候很可愛。」'], 4),
              springSmsChoice('「下次我坐遠一點，免得你看到我笑。」', ['「不用啦，妳坐哪裡我都看得到……我是說，聽得到妳笑。」'], 4),
            ]
          : [
              springSmsChoice('「你現在才害羞，反應也太慢了吧。」', ['「可能剛剛忙著唱歌，現在才有空想起來。」'], 3),
              springSmsChoice('「我是真的有被你那段吸引到。」', ['「那我今天就沒有白唱了。下次再唱給妳聽。」'], 4),
              springSmsChoice('「好啦，不逗你了，今天真的很好聽。」', ['「謝謝妳。妳這樣講，我今天回去會很開心。」'], 3),
            ]),
    springSmsRound(
      r1 === 0
        ? '我其實滿喜歡大家這樣鬧完，又能在最後一遍一起收回來的感覺。'
        : r1 === 1
          ? '妳不用怕笑出來啦，練團本來就不會每一秒都很正經。'
          : '剛剛那句我有記著。有人認真聽，唱起來真的會不太一樣。',
      [
        springSmsChoice('「你們這群人真的很像一家人欸。」', ['「有時候很吵沒錯，不過大家都在，就覺得很踏實。」'], 3),
        springSmsChoice('「那我下次就不忍了，我要笑最大聲。」', ['「可以呀，妳笑出來我們也會跟著開心。」'], 3),
        springSmsChoice('「那下次我也要點歌，不能只聽你們決定。」', ['「好啊，妳想聽什麼可以先跟我說。」'], 3),
      ]),
    springSmsRound(
      wentStore
        ? '今天在樂器行聽的那兩把木吉他，我後來還有想起來。妳當時抱著琴，後來肩膀就放鬆多了。'
        : '我回去可能還會想起今天那個副歌。佑達的鼓花很鬧，但最後那一下真的很漂亮。',
      wentStore
        ? [
            springSmsChoice('「我比較喜歡第二把，聲音亮亮的。」', ['「我也比較喜歡那把。下次有空再帶妳去聽。」'], 3),
            springSmsChoice('「你是不是早就看出來我比較喜歡那把？」', ['「有一點，妳抱著它的時候表情就不一樣了。」'], 4),
            springSmsChoice('「下次我要自己挑，不准你幫我決定。」', ['「好啊，我陪妳慢慢試，最後由妳自己選。」'], 3),
          ]
        : [
            springSmsChoice('「我回家一定還會在腦袋裡重播。」', ['「我也是。今天那個最後一起進來的瞬間，真的滿值得記住的。」'], 3),
            springSmsChoice('「你不要只記得鼓花，記得你自己也很帥。」', ['「欸～這句我會記得啦。」'], 4),
            springSmsChoice('「下次再唱一次給我聽。」', ['「好，說好了。下次妳來，我再唱給妳聽。」'], 3),
          ]),
    springSmsRound(
      r3 === 0
        ? '那就記住今天最後那一下吧。不是每次都要完美，大家一起接住就很好了。'
        : r2 === 1
          ? '妳這樣誇我，我真的會偷偷開心很久。'
          : '好啊，下次留一首給妳點。到時候不要臨時說想不到喔。',
      [
        springSmsChoice('「我才不會忘記，這種事情很好記欸。」', ['「那就好，我也會記得妳今天坐在旁邊聽的樣子。」'], 3),
        springSmsChoice('「那你就多開心一下，不用偷偷。」', ['「好，那我就不藏了。謝謝妳。」'], 4),
        springSmsChoice('「我已經想好歌了，先不告訴你。」', ['「還賣關子喔？好啦，我等妳公布。」'], 3),
      ]),
]

  if (character === 'masa') return [
    springSmsRound('我剛才差點把佑達的鼓棒沒收。那個人把《軋車》當成自己個人秀是不是？', [
      springSmsChoice('「他今天真的玩瘋了，連我都不知道該看哪裡。」', ['「看我啊，Bass就在這裡，謝謝。」'], 2),
      springSmsChoice('「你明明也一直在旁邊吐槽，根本共犯。」', ['「我那叫維護團隊秩序，跟共犯差很多。」'], 2),
      springSmsChoice('「可是最後一遍真的很帥，你也有功勞啦。」', ['「喔，終於有人發現Bass不是背景音了。」'], 3),
    ]),
    springSmsRound(
      r0 === 0
        ? '佑達還說那叫臨場發揮。我看他是把鼓花當成免責聲明。'
        : r0 === 1
          ? '共犯？妳這個指控很嚴重欸。證據呢？'
          : '這句我錄音存證了，下次不准又說Bass只是背景音。',
      r0 === 0
        ? [
            springSmsChoice('「那你就開一張罰單給他啊！」', ['「可以，罰他下次少加三個鼓花。」'], 3),
            springSmsChoice('「他可能真的覺得自己很有才華。」', ['「這點我不否認，問題是才華要有地方用。」'], 2),
            springSmsChoice('「我覺得他下次還會再犯。」', ['「不用覺得，他一定會。」'], 2),
          ]
        : r0 === 1
          ? [
              springSmsChoice('「你笑到差點彈歪就是證據！」', ['「那是現場太吵，證據不成立。」'], 3),
              springSmsChoice('「你自己承認有拱火了啊。」', ['「我只負責提供評論，行動都是他自己做的。」'], 2),
              springSmsChoice('「我有目擊證人，阿信跟石頭都在。」', ['「妳還找證人喔？這件事有必要鬧這麼大嗎？」'], 2),
            ]
          : [
              springSmsChoice('「我本來就有聽到啊，只是想看你什麼時候發現。」', ['「很好，現在發現了。請繼續保持這個水準。」'], 3),
              springSmsChoice('「那你下次要彈更大聲一點。」', ['「妳是要我跟音箱比誰比較吵喔？」'], 2),
              springSmsChoice('「我下次還是要站你旁邊聽。」', ['「可以，這樣妳就沒藉口說聽不到了。」'], 3),
            ]),
    springSmsRound(
      r1 === 0
        ? '我剛剛真的想過要不要把那張罰單印出來，貼在他的鼓上。'
        : r1 === 1
          ? '妳這個證據也太薄弱了吧。笑一下就算共犯，法律系要不要重修？'
          : '既然妳有聽到，那下次就不要只顧著看熱鬧，認真聽一下低音。',
      [
        springSmsChoice('「我可以幫你設計罰單，還能加上大大的紅字。」', ['「妳很適合當行政，專門處理這種無聊案件。」'], 3),
        springSmsChoice('「你不要轉移話題，自己也笑得很開心。」', ['「笑不代表認罪，這個邏輯有問題。」'], 2),
        springSmsChoice('「好啦，下次我站你旁邊，專心聽Bass。」', ['「這句可以，終於有個懂得欣賞的人。」'], 3),
      ]),
    springSmsRound(
      wentStore
        ? '妳今天在琴弦那邊幫我比規格，至少沒讓我被店員講到暈。顧問費先記帳。'
        : '我回去還在想，最後一遍大家總算有收住。前面吵成那樣，能接回來也是奇蹟。',
      wentStore
        ? [
            springSmsChoice('「顧問費加利息喔，我可是很專業的。」', ['「妳先開價，我再決定要不要破產。」'], 3),
            springSmsChoice('「你明明很需要我，還一直嘴硬。」', ['「我只是承認妳有一點用，不要自己加戲。」'], 3),
            springSmsChoice('「下次還要找我去，這次我有經驗了。」', ['「可以啊，先說好，不准亂畫我的清單。」'], 2),
          ]
        : [
            springSmsChoice('「奇蹟是因為你們終於肯聽彼此的話了吧。」', ['「這句話可以拿去貼在練團室門口。」'], 3),
            springSmsChoice('「我覺得你們吵完反而更有默契欸。」', ['「不要把吵架講得那麼浪漫，謝謝。」'], 2),
            springSmsChoice('「下次我想聽你們練別首歌。」', ['「好啊，先不要點太難的，免得妳又要笑我們。」'], 3),
          ]),
    springSmsRound(
      r3 === 0
        ? '好啦，顧問費我記著。不要每天傳訊息催款，會讓我覺得自己欠了高利貸。'
        : r2 === 1
          ? '下次妳再來，我就把清單交給妳檢查。到時候不要臨陣脫逃。'
          : '我等等要去洗澡了。今天辛苦妳的耳朵，應該也被我們吵得差不多。',
      [
        springSmsChoice('「我每天早晚各催一次，服務很周到吧？」', ['「不用，妳這個催款方式比銀行還可怕。」'], 2),
        springSmsChoice('「我才不會逃，我還要檢查你有沒有亂買。」', ['「好，這個職位就交給妳了，記得負責到底。」'], 3),
        springSmsChoice('「你也知道我耳朵很辛苦喔？」', ['「不然呢，妳今天笑那麼大聲，我都替妳喉嚨擔心。」'], 3),
      ]),
]

  return [
    springSmsRound(
      touched
        ? '剛才妳碰到我手指的時候很小心，我有注意到。其實不用擔心弄痛我，這些繭早就習慣了。'
        : '我剛才把吉他收回去，想到妳最後那一下終於按順了，整個人都放鬆下來。',
      touched
        ? [
            springSmsChoice('「我怕弄痛你啊，當然要小心一點。」', ['「我知道，妳剛才真的很小心。謝謝妳有注意到。」'], 3),
            springSmsChoice('「你把手伸過來的時候，我反而有點緊張。」', ['「我也有一點，不過看妳那麼認真，就覺得沒什麼好尷尬的。」'], 4),
            springSmsChoice('「下次換你檢查我的手，公平一點。」', ['「好啊，不過我會先問妳可不可以，不會偷襲。」'], 4),
          ]
        : [
            springSmsChoice('「我真的卡好久，還好最後有成功。」', ['「有啊，後來妳放鬆一點，手指就比較順了。」'], 3),
            springSmsChoice('「謝謝你沒有一直催我，我反而比較敢試。」', ['「我知道妳需要一點時間，所以才想讓妳照自己的速度來。」'], 3),
            springSmsChoice('「你剛剛看我成功的時候也笑了。」', ['「有啊，看到妳開心，我也會跟著開心。」'], 3),
          ]),
    springSmsRound(
      r0 === 0
        ? '妳剛才一直怕弄痛我，結果自己手指都紅了。這個倒是要記得照顧一下。'
        : r0 === 1
          ? '妳說緊張喔？我其實也有一點，只是怕講出來妳會更不好意思。'
          : '好，那下次換我當學生。只是先說好，我可能比妳還不會。',
      [
        springSmsChoice('「我沒事啦，休息一下就好了。」', ['「好，但今天先不要再練了。明天如果還不舒服就休息。」'], 3),
        springSmsChoice('「你也會緊張？我還以為你一直都很淡定。」', ['「哪有一直淡定，只是有時候不太會表現出來。」'], 4),
        springSmsChoice('「你當學生一定很難教，我先收學費。」', ['「那我先預約一堂，學費可以用晚餐抵嗎？」'], 3),
      ]),
    springSmsRound(
      r1 === 0
        ? '那就好。下次如果手指還酸，我們就先練短一點，不用硬撐。'
        : r1 === 1
          ? '其實有些話當面講會比較不好意思，打成訊息反而容易一點。'
          : '妳連學費都想好了，感覺我還沒開始上課就先欠妳一頓飯。',
      [
        springSmsChoice('「那你下次要記得提醒我休息。」', ['「好，我會注意。妳也要記得自己說過的話。」'], 3),
        springSmsChoice('「你現在打字就不會不好意思了嗎？」', ['「還是會啦，只是妳看不到我現在的表情。」'], 4),
        springSmsChoice('「晚餐要吃好一點，我可不隨便收。」', ['「知道了，那我得先想想去哪裡才不會被妳嫌。」'], 3),
      ]),
    springSmsRound(
      wentStore
        ? '今天在樂器行挑背帶時，妳還特地幫我看肩膀那邊會不會磨。後來想想，妳注意到的地方真的很實用。'
        : '剛才大家收東西時，我還想到妳坐在旁邊跟著哼的那一小段。那個旋律好像真的黏住了。',
      wentStore
        ? [
            springSmsChoice('「因為你背起來舒服比較重要啊，不能只看好不好看。」', ['「嗯，妳說得對。後來再試一次，真的舒服很多。」'], 3),
            springSmsChoice('「下次換我挑，你不准嫌我眼光。」', ['「好啊，我倒是有點期待妳會挑什麼。」'], 3),
            springSmsChoice('「我只是怕你肩膀痛，之後又要我幫你揉。」', ['「妳想得還滿遠的。不過真的不舒服我會說啦。」'], 4),
          ]
        : [
            springSmsChoice('「我自己都沒發現我在哼欸！」', ['「我有聽到，妳哼得還滿投入的。」'], 3),
            springSmsChoice('「那首真的很容易黏在腦袋裡。」', ['「對啊，回去可能還會一直想起來。」'], 2),
            springSmsChoice('「下次我想坐近一點聽。」', ['「好啊，我幫妳留個舒服的位置，不會被音箱震到。」'], 3),
          ]),
    springSmsRound(
      r3 === 0
        ? '我會記得妳說的。下次先把舒服不舒服確認好，再慢慢挑，不用急。'
        : r2 === 1
          ? '那就說好了，下次妳負責挑，我負責老實試，不先下結論。'
          : '好啦，妳這樣講我會記得。只是先說，按摩的事不能算在器材預算裡。',
      [
        springSmsChoice('「你還真的把我說的記下來喔。」', ['「有些小事記得也沒什麼不好。」'], 3),
        springSmsChoice('「那我下次要認真挑一個讓你驚艷的。」', ['「我相信妳，至少今天的眼光就不錯。」'], 3),
        springSmsChoice('「按摩明明是額外服務，要另外收費！」', ['「好，這個價目表我先不問，怕太貴。」'], 3),
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
