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

const springStoreFollowUpLine = (character: SpringCharacterId, context: SpringDayContext): string => {
  const storeReply = context.storeReplies?.[1] ?? null
  if (character === 'wen') {
    if (storeReply === 0) return '妳第一次踩開關踩得太早那一下，我到現在還記得，第二次就配合得很好了。'
    if (storeReply === 1) return '妳剛剛還怕自己踩錯，結果真的試過一次就上手了。'
    if (storeReply === 2) return '妳說我找人幫忙，這不是被妳抓包了嗎？哈哈。'
    return '剛剛那顆效果器妳有聽出差別吧？'
  }
  if (character === 'ashin') {
    if (storeReply === 0) return '妳剛剛抱著木吉他還不讓我笑，現在想起來還是覺得很可愛。'
    if (storeReply === 1) return '後來幫妳把琴身調好，有沒有覺得抱起來舒服一點？'
    if (storeReply === 2) return '妳抱著琴聽我彈的時候，還跟著節奏輕輕晃，真的很投入耶。'
    return '今天那兩把木吉他，妳後來有沒有想起哪一把的聲音？'
  }
  if (character === 'masa') {
    if (storeReply === 0) return '妳今天還真的陪我去問店員琴弦規格，助理做得不錯嘛。'
    if (storeReply === 1) return '妳說挑便宜的，結果還想把省下來的錢拿去吃飯，算盤打得真響。'
    if (storeReply === 2) return '妳把選擇丟回給我，自己倒是很會吐槽，這樣也算幫忙喔？'
    return '那兩包琴弦的價差，妳現在還覺得很誇張吧？'
  }
  if (character === 'stone') {
    if (storeReply === 0) return '妳剛剛說我像在照顧小孩，我回去想想，好像也沒有說錯。'
    if (storeReply === 1) return '妳剛剛問我會不會自己換琴弦，哪天有空可以真的示範給妳看。'
    if (storeReply === 2) return '妳說我適合當老師，我反而有點怕自己講得太認真，讓妳覺得無聊。'
    return '今天那些清潔用品和琴弦，妳有沒有覺得比想像中複雜？'
  }
  return '今天店裡那些器材的規格不少，還好有一起確認，沒有漏掉要買的東西。'
}

const springContextLine = (character: SpringCharacterId, context: SpringDayContext): string => {
  const wentStore = context.storeCharacter === character
  const learnedTogether = context.lessonCharacter === character
  const ateTogether = character === 'yanming' && context.afterChoice === 'yanming-dinner'
  const touchedCallus = context.lessonReplies?.[4] === 0
  const thirdStoreReply = context.storeReplies?.[2] ?? null

  if (wentStore && learnedTogether) {
    if (character === 'wen') return '今天先在樂器行試效果器，後來又留下來練吉他，妳的手指還好嗎？'
    if (character === 'ashin') return '今天先聽木吉他，後來又真的坐下來練和弦，妳回家手指有沒有酸？'
    if (character === 'masa') return '今天先看 Bass，後來又留下來練，妳的手指有沒有還在抗議？'
    if (character === 'stone') return '今天先看背帶和吉他，後來又留下來練和弦，妳手指還好嗎？'
  }

  if (wentStore && ateTogether && character === 'yanming') return '今天先一起去看器材，後來又一起吃飯，妳有沒有覺得行程排得很剛好？'

  if (wentStore) {
    if (character === 'wen') {
      if (thirdStoreReply === 0) return '妳今天問我會不會教妳，我有記得喔。真的想學的話，來練團室找我就好。'
      if (thirdStoreReply === 1) return '妳今天還叫我先彈給妳聽，現在是不是更想學了？'
      if (thirdStoreReply === 2) return '妳今天還沒學就先擔心自己沒天分，先玩玩看啦，不用想那麼多。'
      return '今天在樂器行玩效果器還滿有趣的吧？'
    }
    if (character === 'ashin') {
      if (thirdStoreReply === 0) return '妳今天說想學木吉他，我有記得喔。下次去練團室可以先陪妳試最簡單的和弦。'
      if (thirdStoreReply === 1) return '妳剛剛還擔心手指會痛，先不用急著練很久，慢慢來就好。'
      if (thirdStoreReply === 2) return '妳說看我們彈比較輕鬆也沒關係啊，哪天想學了再跟我說。'
      return '今天那兩把木吉他的聲音，妳後來有沒有想起來？'
    }
    if (character === 'masa') {
      if (thirdStoreReply === 0) return '妳今天說有一點想學吉他，我有聽到喔，不要明天就反悔。'
      if (thirdStoreReply === 1) return '妳今天問自己適合學什麼，我回去想了一下，還是覺得先試吉他比較好。'
      if (thirdStoreReply === 2) return '妳說只是覺得吉他好看，最好是啦，我又不是沒看到妳盯著看。'
      return '今天 Bass 那幾個低音有沒有讓妳感覺到地板在震？'
    }
    if (character === 'stone') {
      if (thirdStoreReply === 0) return '妳今天背著展示琴的樣子很認真，回去有沒有想起來？'
      if (thirdStoreReply === 1) return '妳今天問自己適不適合學吉他，我覺得可以慢慢試，不用急著決定。'
      if (thirdStoreReply === 2) return '妳說每天練琴很辛苦，我倒覺得喜歡的話就會慢慢習慣。'
      return '今天那條背帶，妳後來有沒有覺得哪個顏色比較好看？'
    }
    return '今天一起去看器材，清單上的東西有沒有都看清楚？妳有沒有覺得哪樣最有趣？'
  }

  if (learnedTogether) {
    if (character === 'wen') return touchedCallus
      ? '妳今天真的摸了我手上的繭，現在還在想那個觸感喔？手指有沒有酸？'
      : '今天練的那個和弦回家還記得嗎？妳的手指有沒有比較習慣？'
    if (character === 'ashin') return touchedCallus
      ? '妳今天摸到我指尖那層繭了，會不會覺得跟想像中不太一樣？'
      : '今天木吉他那幾個和弦，妳回家有沒有再想起來？手指還好嗎？'
    if (character === 'masa') return touchedCallus
      ? '妳今天還真的要檢查我的繭，現在有沒有比較了解 Bass 手指要受多少罪？'
      : '今天 Bass 那段節奏有沒有又在腦袋裡打轉？手指還好嗎？'
    if (character === 'stone') return touchedCallus
      ? '妳今天摸了我指腹上的繭，會不會覺得比看起來粗一點？'
      : '今天練的換和弦，回去有沒有再試一次？記得讓手指休息。'
  }

  if (ateTogether) return '今天一起吃飯還滿開心的，妳回到家了嗎？有沒有吃飽？'

  if (character === 'yanming' && wentStore) return '今天一起去看器材，妳有沒有覺得店裡比想像中好逛？'
  if (character === 'wen') return '今天《轧車》最後一遍總算接起來了，妳是不是笑佑達笑得很開心？'
  if (character === 'ashin') return '今天《轧車》練到最後總算順了，佑達那幾下鼓花真的很有精神。'
  if (character === 'masa') return '今天《轧車》那幾遍妳也看到了吧？佑達差點把歌變成自己的獨奏會。'
  if (character === 'stone') return '今天最後一遍大家接得比前面順很多，妳有聽出來嗎？'
  return '今天《轧車》練得很熱鬧，佑達第一遍就加了不少東西，妳應該也有被嚇到。'
}

export const getSpringSmsOpeners = (character: SpringCharacterId, context: SpringDayContext) => {
  const rehearsal: Record<SpringCharacterId, { text: string; response: string; affection: number }[]> = {
    wen: [
      { text: '「今天《轧車》最後一遍真的很帥！」', response: '「妳終於有講一句公道話了喔。」', affection: 2 },
      { text: '「我回家还在笑佑达的鼓花。」', response: '「哈哈，他自己也知道很誇張啦。」', affection: 1 },
      { text: '「你们今天练团也太热闹了吧。」', response: '「《轧車》就是要這樣啦。」', affection: 2 },
    ],
    ashin: [
      { text: '「今天《轧車》最後那遍好好聽。」', response: '「謝謝～最後那次大家真的有接起來。」', affection: 2 },
      { text: '「我回家脑袋里还在响佑达的鼓声。」', response: '「哈哈，他今天真的很有精神。」', affection: 1 },
      { text: '「今天看你们练团很开心。」', response: '「那就好，下次有空再來聽啊。」', affection: 2 },
    ],
    masa: [
      { text: '「你今天吐槽佑达真的太好笑。」', response: '「我那是忍很久了好不好。」', affection: 2 },
      { text: '「佑达是不是每天都这么有精力？」', response: '「我也想知道他的電池在哪裡。」', affection: 1 },
      { text: '「你们练《轧車》也太吵了啦。」', response: '「嫌吵還笑那麼大聲？」', affection: 2 },
    ],
    stone: [
      { text: '「今天最後一遍真的很順欸。」', response: '「對啊，前面鬧歸鬧，最後有接起來就好。」', affection: 2 },
      { text: '「我还在想刚刚那段吉他。」', response: '「有聽到妳喜歡的地方嗎？」', affection: 1 },
      { text: '「今天看你们练团很开心。」', response: '「那就好，下次再來聽。」', affection: 2 },
    ],
    yanming: [
      { text: '「今天佑达第一遍真的吓到我了。」', response: '「哈哈，他今天特別有精神。」', affection: 2 },
      { text: '「最後一遍大家接得好整齊。」', response: '「那一遍大家都有聽彼此，才會這麼順。」', affection: 2 },
      { text: '「今天练团很热闹欸。」', response: '「是啊，大家玩得很開心。」', affection: 1 },
    ],
  }

  const storeAndLesson: Record<Exclude<SpringCharacterId, 'yanming'>, { text: string; response: string; affection: number }[]> = {
    wen: [
      { text: '「今天從樂器行到練團室，手指有點忙不過來了。」', response: '「哈哈，今天是讓妳體驗一下啦。手指還好嗎？」', affection: 2 },
      { text: '「效果器跟吉他都玩到了，今天很充實欸。」', response: '「有玩到就好，妳今天還滿認真的。」', affection: 2 },
      { text: '「我回家還在想你教我按和弦的樣子。」', response: '「先不要想太多啦，記得休息就好。」', affection: 2 },
    ],
    ashin: [
      { text: '「今天從聽木吉他到自己按和弦，差好多。」', response: '「有啊，妳後來真的有彈出聲音了。」', affection: 2 },
      { text: '「我回家還在想今天那把木吉他的聲音。」', response: '「那把音色真的滿舒服的，下次可以再聽。」', affection: 2 },
      { text: '「今天謝謝你陪我慢慢試。」', response: '「不客氣啊，妳今天很認真耶。」', affection: 2 },
    ],
    masa: [
      { text: '「今天先看 Bass，後來又真的上手練了。」', response: '「現在知道兩隻手要合作有多難了吧。」', affection: 2 },
      { text: '「我現在還記得你教我的那個節奏。」', response: '「那就好，至少沒有白教。」', affection: 2 },
      { text: '「今天被你吐槽，但好像真的有學到東西。」', response: '「妳有學到就好，不然我不是白費口水。」', affection: 1 },
    ],
    stone: [
      { text: '「今天先看配件，後來還真的坐下來練和弦。」', response: '「妳今天很認真，手指還好嗎？」', affection: 2 },
      { text: '「我回家還在想你教我換和弦的樣子。」', response: '「慢慢練就好，不用一次記住全部。」', affection: 2 },
      { text: '「今天謝謝你陪我從頭慢慢來。」', response: '「不客氣啊，妳有興趣就很好。」', affection: 2 },
    ],
  }

  const storeOnly: Record<SpringCharacterId, { text: string; response: string; affection: number }[]> = {
    wen: [
      { text: '「今天那顆效果器的聲音真的差好多。」', response: '「妳聽得出來就好啦，這顆還滿有意思的。」', affection: 2 },
      { text: '「我还记得你让我踩开关那段。」', response: '「哈哈，第一次當音控還不錯啦。」', affection: 2 },
      { text: '「今天那顆效果器的聲音，我回家還在想。」', response: '「哈哈，妳喜歡哪一種音色？」', affection: 2 },
    ],
    ashin: [
      { text: '「今天那两把木吉他的声音真的不一样。」', response: '「對啊，妳有聽出差別就好。」', affection: 2 },
      { text: '「我还记得抱木吉他的感觉，好大一把。」', response: '「哈哈，妳剛剛真的像抱大抱枕。」', affection: 2 },
      { text: '「今天那兩把木吉他的聲音，我回家還在想。」', response: '「下次有空再來聽，我再彈給妳聽。」', affection: 2 },
    ],
    masa: [
      { text: '「今天 Bass 的声音震得我脚底都麻了。」', response: '「那是妳站太近了啦。」', affection: 2 },
      { text: '「琴弦真的有必要那么贵吗？」', response: '「我也想問店家這個問題。」', affection: 1 },
      { text: '「你还记得我看了那把吉他吗？」', response: '「我又沒有瞎，當然看到了。」', affection: 2 },
    ],
    stone: [
      { text: context.storeReplies?.[0] === 1 ? '「你后来有考虑那条比较特别的背带吗？」' : '「你后来还是选了那条背带吗？」', response: '「有啊，最後挑了一條背起來舒服的。」', affection: 2 },
      { text: '「我今天才知道吉他保养也有这么多学问。」', response: '「其實不難，平常多注意就好。」', affection: 2 },
      { text: '「你说下次可以再让我试琴喔。」', response: '「可以啊，妳想試的時候再說。」', affection: 2 },
    ],
    yanming: [
      { text: '「今天跟你去看器材还蛮有趣的。」', response: '「有妳一起看，確認起來也快一點。」', affection: 2 },
      { text: '「你买东西真的好仔细。」', response: '「器材要合用，還是得多確認一下。」', affection: 2 },
      { text: '「下次还想去看看你们用的鼓棒。」', response: '「好啊，下次再帶妳去。」', affection: 2 },
    ],
  }

  const lessonOnly: Record<Exclude<SpringCharacterId, 'yanming'>, { text: string; response: string; affection: number }[]> = {
    wen: [
      { text: '「今天練的和弦我回家還想再試一次。」', response: '「先休息啦，手指不要硬撐。」', affection: 2 },
      { text: '「我还记得你手指上的茧子。」', response: '「練久了就會有啊，妳不用急。」', affection: 2 },
      { text: '「今天谢谢你没有嫌我学得慢。」', response: '「我哪有嫌妳，慢慢來就好。」', affection: 2 },
    ],
    ashin: [
      { text: '「今天木吉他那几个和弦我还记得一点。」', response: '「那就好，慢慢練就會記得更牢。」', affection: 2 },
      { text: '「我还在想你手指上的那层薄茧。」', response: '「哈哈，彈久了就會這樣，妳不用急著練成這樣。」', affection: 2 },
      { text: '「今天谢谢你一直陪我慢慢试。」', response: '「不客氣啦，妳願意試就很好了。」', affection: 2 },
    ],
    masa: [
      { text: '「Bass那段节奏我现在脑袋里还在循环。」', response: '「那表示妳有記住一點了。」', affection: 2 },
      { text: '「我现在还记得你手指上的茧。」', response: '「哈哈，這是練出來的，不是故意弄給妳看的。」', affection: 2 },
      { text: '「今天被你吐槽，结果还是学到了。」', response: '「不然妳以為我真的只會吐槽喔？」', affection: 2 },
    ],
    stone: [
      { text: '「今天换和弦的时候我一直按错。」', response: '「很正常啊，慢慢來就好。」', affection: 2 },
      { text: '「我还记得你指腹上的茧子。」', response: '「練久了就會有，妳不用急著也練成這樣。」', affection: 2 },
      { text: '「今天谢谢你没有催我。」', response: '「學東西本來就不用趕，照自己的速度就好。」', affection: 2 },
    ],
  }

  const dinnerOnly: { text: string; response: string; affection: number }[] = [
    { text: '「今天谢谢你陪我吃饭，真的很开心。」', response: '「不客氣，妳喜歡那家店就好。」', affection: 2 },
    { text: '「我回家还在想刚刚桌上的笑话。」', response: '「哈哈，今天大家練團的事又被我們講了一遍。」', affection: 2 },
    { text: '「下次换我请你吃饭！」', response: '「好啊，那我就等妳安排。」', affection: 2 },
  ]

  if (character === 'yanming') {
    if (context.storeCharacter === 'yanming' && context.afterChoice === 'yanming-dinner') {
      return [
        { text: '「今天看器材又一起吃飯，行程也太充實了吧。」', response: '「哈哈，今天剛好把事情一起辦完，也吃了頓飯。」', affection: 2 },
        { text: '「今天谢谢你带我去看器材，还请我吃饭。」', response: '「不客氣，妳有玩得開心就好。」', affection: 2 },
        { text: '「下次我们可以再找时间一起吃饭。」', response: '「好啊，有空再一起去。」', affection: 2 },
      ]
    }
    if (context.storeCharacter === 'yanming') return storeOnly.yanming
    if (context.afterChoice === 'yanming-dinner') return dinnerOnly
    return rehearsal.yanming
  }
  if (context.storeCharacter === character && context.lessonCharacter === character) return storeAndLesson[character]
  if (context.storeCharacter === character) {
    const choices = storeOnly[character].map((choice) => ({ ...choice }))
    const thirdStoreReply = context.storeReplies?.[2] ?? null
    if (character === 'wen') {
      if (thirdStoreReply === 0) choices[2] = { text: '「你说会教我吉他，记得喔。」', response: '「有啦，妳來練團室找我就好。」', affection: 2 }
      else if (thirdStoreReply === 1) choices[2] = { text: '「我还想再听你弹刚刚那段旋律。」', response: '「好啊，下次再彈給妳聽。」', affection: 2 }
      else if (thirdStoreReply === 2) choices[2] = { text: '「我今天说没天分，你不会真的觉得我学不会吧？」', response: '「妳都還沒學，哪來的學不會啦。」', affection: 2 }
    }
    if (character === 'ashin') {
      if (thirdStoreReply === 0) choices[2] = { text: '「你说下次去练团室要教我和弦，记得喔。」', response: '「當然啊，我會找一把木吉他給妳。」', affection: 2 }
      else if (thirdStoreReply === 1) choices[2] = { text: '「我还是有点怕按弦会痛。」', response: '「先慢慢來，不用練太久。」', affection: 2 }
      else if (thirdStoreReply === 2) choices[2] = { text: '「我今天还是觉得看你们弹比较轻松。」', response: '「哈哈，也可以啊，下次再彈給妳聽。」', affection: 2 }
    }
    return choices
  }
  if (context.lessonCharacter === character) return lessonOnly[character]
  return rehearsal[character]
}

const springStoreSmsFirstRound = (character: SpringCharacterId, context: SpringDayContext): SpringSmsRound => {
  const selected = context.storeReplies?.[0] ?? null
  const incoming = springContextLine(character, context)
  if (character === 'wen') {
    const choices = selected === 0
      ? [
          springSmsChoice('「后面那个真的很有气势，我还是最喜欢那个。」', ['「我就知道妳會喜歡這個。」'], 2),
          springSmsChoice('「你刚刚故意多弹那几个音，是不是在炫技？」', ['「有一點啦，效果器好用就要試給妳聽啊。」'], 2),
          springSmsChoice('「拿去表演一定很适合。」', ['「對啊，這個音色在台上很有存在感。」'], 2),
        ]
      : selected === 1
        ? [
            springSmsChoice('「我还是觉得前面那个干净的声音比较耐听。」', ['「我也覺得，乾淨的音色其實很實用。」'], 2),
            springSmsChoice('「你关掉效果器之后那几句也很好听。」', ['「那本來就是吉他的聲音啊。」'], 2),
            springSmsChoice('「我比较喜欢清爽一点的感觉。」', ['「好啦，知道妳喜歡哪種了。」'], 2),
          ]
        : selected === 2
          ? [
              springSmsChoice('「我说你弹什么都好听是真的。」', ['「妳今天真的很會講欸。」'], 2),
              springSmsChoice('「你刚刚是不是偷笑了？」', ['「哪有，妳看錯了啦。」'], 2),
              springSmsChoice('「你自己是不是也觉得很帅？」', ['「蛤？妳不要一直抓我語病。」'], 2),
            ]
          : [
              springSmsChoice('「我最喜歡後面那個音色，真的很有氣勢。」', ['「我就知道妳會喜歡那個，拿來表演很適合。」'], 2),
              springSmsChoice('「我覺得你彈起來真的很帥。」', ['「又來了喔，妳今天很會講欸。」'], 2),
              springSmsChoice('「我還記得你讓我踩開關那次。」', ['「哈哈，第一次當音控就上手了啦。」'], 2),
            ]
    return springSmsRound(incoming, choices)
  }
  if (character === 'ashin') {
    const choices = selected === 0
      ? [
          springSmsChoice('「第一把的聲音真的很溫暖，我很喜歡。」', ['「我也喜歡那種音色，聽起來很舒服。」'], 2),
          springSmsChoice('「我現在還記得第一把琴的共鳴。」', ['「那把的聲音比較厚一點，聽起來很柔和。」'], 2),
          springSmsChoice('「你剛剛彈第一把的時候，我覺得很舒服。」', ['「哈哈，那就好，我自己也滿喜歡那個聲音。」'], 2),
        ]
      : selected === 1
        ? [
            springSmsChoice('「第二把比較清亮，真的很適合唱歌。」', ['「對啊，配人聲應該會滿好的。」'], 2),
            springSmsChoice('「我還記得你剛剛哼的那兩句。」', ['「哈哈，妳有聽到喔？我剛剛唱得很小聲耶。」'], 2),
            springSmsChoice('「我覺得第二把的聲音比較清楚。」', ['「妳耳朵真的滿好的，有聽出那個差別。」'], 2),
          ]
        : selected === 2
          ? [
              springSmsChoice('「我還是分不太出來，你下次再彈給我聽一次。」', ['「好啊，下次我再放慢一點，讓妳慢慢聽。」'], 2),
              springSmsChoice('「你慢慢彈，我就比較聽得出來了。」', ['「沒問題啊，不用急，慢慢聽就好。」'], 2),
              springSmsChoice('「我覺得你彈兩把都很好聽。」', ['「哈哈，這樣我會不知道妳到底喜歡哪一把耶。」'], 2),
            ]
          : [
              springSmsChoice('「第一把的聲音比較溫暖，我很喜歡。」', ['「我也喜歡那種音色，聽起來很舒服。」'], 2),
              springSmsChoice('「第二把比較清亮，真的很適合唱歌。」', ['「對啊，配人聲應該會滿好的。」'], 2),
              springSmsChoice('「我還在想抱著木吉他的感覺，好大一把。」', ['「哈哈，妳剛剛真的像抱大抱枕。」'], 2),
            ]
    return springSmsRound(incoming, choices)
  }
  if (character === 'masa') {
    const choices = selected === 0
      ? [
          springSmsChoice('「你剛剛那段低音真的很帥，我還想再聽一次。」', ['「妳是來聽演唱會的喔？」'], 2),
          springSmsChoice('「我现在知道 Bass 为什么这么重要了。」', ['「現在知道還不遲，低音可不是裝飾。」'], 2),
          springSmsChoice('「地板真的有在震，太有感觉了！」', ['「那是妳站太近了啦。」'], 2),
        ]
      : selected === 1
        ? [
            springSmsChoice('「我说像蹦迪不是嫌弃啦，真的很有节奏。」', ['「最好是，妳剛剛明明笑得很開心。」'], 2),
            springSmsChoice('「你刚刚故意弹得更夸张，是想让我跳起来吗？」', ['「不然咧？我還可以再誇張一點。」'], 2),
            springSmsChoice('「我现在脑袋里还在响那个节奏。」', ['「那表示妳有聽進去一點嘛。」'], 2),
          ]
        : selected === 2
          ? [
              springSmsChoice('「原来 Bass 也可以这么好听，我以前真的小看它了。」', ['「現在知道就好，不要再說我們是裝飾。」'], 2),
              springSmsChoice('「你刚刚弹的时候看起来超投入。」', ['「廢話，自己的樂器當然要認真。」'], 2),
              springSmsChoice('「我觉得低音一出来，整首歌都不一样了。」', ['「這句總算講到重點了。」'], 2),
            ]
          : [
              springSmsChoice('「Bass 的聲音真的很有力量！」', ['「不然咧？低音可不是站在旁邊裝飾的。」'], 2),
              springSmsChoice('「我现在还记得你嫌琴弦太贵。」', ['「那個價格本來就很沒有道理好不好。」'], 2),
              springSmsChoice('「你今天一直叫我帮忙，我是不是很有用？」', ['「至少比只會站旁邊說好聽有用一點。」'], 2),
            ]
    return springSmsRound(incoming, choices)
  }
  if (character === 'stone') {
    const choices = selected === 0
      ? [
          springSmsChoice('「黑色那条真的很耐看，我觉得很适合你。」', ['「我也覺得，簡單一點比較不容易看膩。」'], 2),
          springSmsChoice('「你刚刚搭在肩上那条，看起来很舒服。」', ['「背帶還是要先看舒不舒服，外型再慢慢挑。」'], 2),
          springSmsChoice('「我觉得黑色很适合你平常用。」', ['「嗯，平常練團用這種最方便。」'], 2),
        ]
      : selected === 1
        ? [
            springSmsChoice('「我还是喜欢那条比较特别的，有自己的感觉。」', ['「那條也不錯，平常可以換著用。」'], 2),
            springSmsChoice('「那条特别一点的真的很好看。」', ['「哈哈，妳喜歡就好，我再想想要不要帶。」'], 2),
            springSmsChoice('「你可以两条换着用啊。」', ['「這樣好像也不錯，之後再看看。」'], 2),
          ]
        : selected === 2
          ? [
              springSmsChoice('「我说你戴哪条都好看是真的。」', ['「哈哈，妳這樣我很難選欸。」'], 2),
              springSmsChoice('「你最后还是选实用的，对吧？」', ['「對啊，畢竟每天都要用，舒服比較重要。」'], 2),
              springSmsChoice('「我觉得你认真挑东西的样子很好笑。」', ['「有這麼好笑嗎？我只是想挑仔細一點。」'], 2),
            ]
          : [
              springSmsChoice('「黑色那条真的很耐看。」', ['「我也覺得，簡單一點比較不容易看膩。」'], 2),
              springSmsChoice('「我喜欢那条比较特别的。」', ['「那條也不錯，之後可以換著用。」'], 2),
              springSmsChoice('「我今天才知道保养吉他也要这么仔细。」', ['「平常多注意一點，琴就可以陪很久。」'], 2),
            ]
    return springSmsRound(incoming, choices)
  }
  return springSmsRound(incoming, [
    springSmsChoice('「今天看器材真的学到不少。」', ['「那就好，至少知道規格差在哪裡。」'], 2),
    springSmsChoice('「你每样东西都确认得好仔细。」', ['「習慣了，買回去要大家都用得順手。」'], 2),
    springSmsChoice('「下次还想跟你一起去逛。」', ['「好啊，有需要再一起去。」'], 2),
  ])
}

export const getSpringSmsRounds = (character: SpringCharacterId, context: SpringDayContext): SpringSmsRound[] => {
  const rehearsal: Record<SpringCharacterId, SpringSmsRound[]> = {
    wen: [
      springSmsRound(springContextLine(character, context), [
        springSmsChoice('「我有啊，佑達第一遍那個鼓花真的太誇張了。」', ['「哈哈，他自己也知道啦，還一直說那是他的新招。」'], 1),
        springSmsChoice('「最後一遍很帥欸，你們接得超整齊。」', ['「有練到啦，不然前面那幾遍不就白吵了。」'], 2),
        springSmsChoice('「我覺得你今天彈得很帥。」', ['「妳今天怎麼一直講這個啦。」', '「……不過我有聽到。」'], 2),
      ]),
      springSmsRound('妳今天笑佑達笑得那麼大聲，他自己都快聽到了吧。', [
        springSmsChoice('「誰叫他一直自己加戲！」', ['「哈哈，他就是很有自己的想法。」'], 1),
        springSmsChoice('「你也笑得很開心啊。」', ['「我哪有，妳不要亂講。」'], 2),
        springSmsChoice('「你們兩個根本半斤八兩。」', ['「喂，這句我不能接受欸。」'], 2),
      ]),
      springSmsRound('下次還會來練團室嗎？', [
        springSmsChoice('「會啊，我都快變固定班底了。」', ['「哈哈，那我們要幫妳留位置了。」'], 2),
        springSmsChoice('「要看有沒有人陪我。」', ['「有空的話，我可以陪妳。」'], 2),
        springSmsChoice('「你會在的話我就來。」', ['「那我盡量在。」'], 2),
      ]),
      springSmsRound('我剛剛回去還在想最後那個收尾，總算沒有再亂掉。', [
        springSmsChoice('「那段真的很好聽！」', ['「有嗎？那就好，沒有白練。」'], 2),
        springSmsChoice('「你下次再彈一次給我聽。」', ['「下次來再彈給妳聽啦。」'], 2),
        springSmsChoice('「我只記得佑達又想加鼓花。」', ['「哈哈，那個真的很難忘。」'], 1),
      ]),
      springSmsRound('好啦，時間不早了，妳快去睡。', [
        springSmsChoice('「你也是，不要練到太晚。」', ['「知道啦，晚安。」'], 1),
        springSmsChoice('「你先說晚安。」', ['「……晚安啦。」'], 2),
        springSmsChoice('「晚安，明天見！」', ['「明天見。」'], 1),
      ]),
    ],
    ashin: [
      springSmsRound(springContextLine(character, context), [
        springSmsChoice('「他差點把整首歌打成另一首！」', ['「哈哈哈哈，瑪莎剛剛臉都皺起來了，真的很好笑。」'], 1),
        springSmsChoice('「可是最後一次真的很順！」', ['「對啊，大家一起進去的時候很過癮。」'], 2),
        springSmsChoice('「你唱到一半是不是也笑了？」', ['「有啦，我差點真的唱不下去。」'], 2),
      ]),
      springSmsRound('今天練《轧車》的時候，佑達真的很有精神欸。', [
        springSmsChoice('「他差點把鼓組拆了吧！」', ['「沒有那麼誇張啦，不過他今天真的很投入。」'], 1),
        springSmsChoice('「瑪莎是不是快被他氣死了？」', ['「哈哈，他們兩個平常就很會互相吐槽。」'], 2),
        springSmsChoice('「我覺得你們最後一起收住那一下很帥。」', ['「謝謝～那一下大家有抓到同一個點。」'], 2),
      ]),
      springSmsRound('下次有空也可以再來聽我們練團啊，今天妳聽得滿認真的。', [
        springSmsChoice('「好啊，我還想再聽一次《轧車》。」', ['「好啊，下次再讓妳聽完整一點。」'], 2),
        springSmsChoice('「你們練團真的很有趣，尤其佑達。」', ['「哈哈，他今天真的很有精神。」'], 2),
        springSmsChoice('「那你要幫我留個位置喔。」', ['「沒問題，幫妳留靠前面一點。」'], 2),
      ]),
      springSmsRound('妳剛剛有聽清楚最後那段嗎？我自己覺得這次接得滿順的。', [
        springSmsChoice('「有啊！最後一次大家一起進來的時候很有氣勢。」', ['「對啊，那一下真的很過癮，前面亂成那樣還好最後有接起來。」'], 2),
        springSmsChoice('「我有看到你差點笑場！」', ['「哈哈，妳有看到喔？我真的快忍不住了。」'], 2),
        springSmsChoice('「佑達的鼓聲太搶戲了啦。」', ['「他今天真的很有精神，瑪莎應該快被他弄瘋了。」'], 1),
      ]),
      springSmsRound('好啦，今天先這樣，妳早點休息。', [
        springSmsChoice('「晚安阿信，今天謝謝你。」', ['「晚安～今天真的很開心。」'], 2),
        springSmsChoice('「你也不要太晚睡！」', ['「好啦，我等等就收。」'], 1),
        springSmsChoice('「下次見！」', ['「下次見喔。」'], 1),
      ]),
    ],
    masa: [
      springSmsRound(springContextLine(character, context), [
        springSmsChoice('「還不是因為你一直吐槽佑達！」', ['「那是他真的很好吐槽，妳自己也有笑吧。」'], 1),
        springSmsChoice('「你們兩個根本是固定搭檔。」', ['「誰跟他固定搭檔啊？」'], 2),
        springSmsChoice('「我覺得你們感情很好欸。」', ['「……妳不要亂下結論。」'], 2),
      ]),
      springSmsRound('今天看妳在旁邊笑得那麼開心，我差點也忘記要彈 Bass 了。', [
        springSmsChoice('「那你還怪我？」', ['「我哪有怪妳，我是在提醒妳不要笑到跌下去。」'], 2),
        springSmsChoice('「因為你講話真的很好笑。」', ['「謝謝喔，我是不是還要收妳門票？」'], 2),
        springSmsChoice('「下次我坐遠一點好了。」', ['「不用啦，坐近一點才聽得到我彈得多好。」'], 1),
      ]),
      springSmsRound('下次有空再來練團室聽我們練啊。', [
        springSmsChoice('「好啊！但你們不可以再吵到把歌帶去隔壁棚。」', ['「那妳要先叫佑達安分一點。」'], 2),
        springSmsChoice('「我想再聽一次你彈 Bass。」', ['「這個簡單，下次彈給妳聽。」'], 2),
        springSmsChoice('「看你表現囉。」', ['「妳要求還真多。」'], 1),
      ]),
      springSmsRound('妳今天是不是一直在等我吐槽佑達？', [
        springSmsChoice('「被你发现了！」', ['「我就知道，妳根本不是來聽歌的。」'], 2),
        springSmsChoice('「我明明也有认真听歌！」', ['「有啦有啦，偶爾有認真一下。」'], 1),
        springSmsChoice('「谁叫你们两个太有戏。」', ['「那是他自己先開始的，不要算到我頭上。」'], 2),
      ]),
      springSmsRound('好啦，今天先聊到這裡，妳也早點休息。', [
        springSmsChoice('「你也不要練到太晚。」', ['「知道啦，妳也是。」'], 1),
        springSmsChoice('「晚安啦，明天練團見！」', ['「晚安，明天見。」'], 2),
        springSmsChoice('「下次我還要看你吐槽佑達。」', ['「妳是把我當脫口秀喔？」'], 2),
      ]),
    ],
    stone: [
      springSmsRound(springContextLine(character, context), [
        springSmsChoice('「有啊！你跟溫尚翊接起來的地方很好聽。」', ['「謝謝，今天那一段大家真的配合得不錯。」'], 2),
        springSmsChoice('「我還在想佑達到底加了幾次鼓花。」', ['「哈哈，這個可能要問他本人才知道。」'], 1),
        springSmsChoice('「下次還想坐近一點聽你們練。」', ['「好啊，下次幫妳留位置。」'], 2),
      ]),
      springSmsRound('今天看妳聽得很投入，回家後還在回想最後那段嗎？', [
        springSmsChoice('「有啊，最後大家一起收住的地方很漂亮。」', ['「對啊，那一遍大家都有聽彼此。」'], 2),
        springSmsChoice('「我還在想前面到底亂了幾次。」', ['「哈哈，前面多試幾次，後面才會更穩。」'], 1),
        springSmsChoice('「你下次可以再彈給我聽嗎？」', ['「可以啊，妳來的話我再彈一次。」'], 2),
      ]),
      springSmsRound('下次還想來練團室聽嗎？', [
        springSmsChoice('「想啊，你們練團很有趣。」', ['「那就好，妳有空就過來。」'], 2),
        springSmsChoice('「想，但你要幫我留位置。」', ['「好啊，幫妳留靠前面一點。」'], 2),
        springSmsChoice('「看我那天有沒有空。」', ['「沒關係，不用特地趕。」'], 1),
      ]),
      springSmsRound('今天最後那遍吉他接得還不錯，妳有聽出來嗎？', [
        springSmsChoice('「有啊！你跟溫尚翊接得很漂亮。」', ['「真的喔？那下次再把那個地方練穩一點。」'], 2),
        springSmsChoice('「我有聽到，整段變得很完整。」', ['「那就好，大家一起接起來的感覺很好。」'], 2),
        springSmsChoice('「我只顧著看佑達有沒有又加鼓花。」', ['「哈哈，他今天真的很搶眼。」'], 1),
      ]),
      springSmsRound('今天辛苦妳了，早點休息。', [
        springSmsChoice('「你也是，晚安！」', ['「晚安，明天見。」'], 1),
        springSmsChoice('「謝謝你今天陪我，晚安。」', ['「不客氣，今天大家都玩得很開心。」'], 2),
        springSmsChoice('「下次見喔！」', ['「好，下次見。」'], 1),
      ]),
    ],
    yanming: [
      springSmsRound(springContextLine(character, context), [
        springSmsChoice('「我真的以為佑達要把整套鼓拆掉了！」', ['「哈哈哈，沒有那麼誇張啦，他一興奮就會想加東西。」'], 2),
        springSmsChoice('「可是最後一遍真的很好聽。」', ['「那一遍有抓到，大家都有聽彼此。」'], 2),
        springSmsChoice('「你今天一直在旁邊看大家，真的很像隊長。」', ['「習慣了，大家一起練，總要互相照應。」'], 2),
      ]),
      springSmsRound('佑達今天第一遍就加了不少鼓花，妳有沒有被嚇到？', [
        springSmsChoice('「有！我差點以為他打錯歌了。」', ['「哈哈，他自己倒是打得很開心。」'], 2),
        springSmsChoice('「瑪莎那個表情才好笑。」', ['「他們平常就這樣，嘴上嫌，最後還是會配合。」'], 2),
        springSmsChoice('「你怎麼都不阻止他？」', ['「先讓他試，最後再一起把段落收好就行。」'], 2),
      ]),
      springSmsRound('下次如果有空，妳還可以來聽我們練團。', [
        springSmsChoice('「好啊，我還想再聽一次《轧車》。」', ['「好，下一次再讓妳聽完整一點。」'], 2),
        springSmsChoice('「你會不會覺得我們在旁邊很吵？」', ['「不會啊，有人一起聽，練團室也比較熱鬧。」'], 2),
        springSmsChoice('「那你要幫我留個位置。」', ['「沒問題，我幫妳留。」'], 2),
      ]),
      springSmsRound('今天大家練得很投入，妳在旁邊有沒有聽得過癮？', [
        springSmsChoice('「有啊，尤其最後一次，真的很有氣勢。」', ['「那就好，大家聽到應該會很開心。」'], 2),
        springSmsChoice('「我差點被佑達的鼓聲嚇到。」', ['「哈哈，他一投入就會這樣。」'], 1),
        springSmsChoice('「你們平常練團也都這麼熱鬧嗎？」', ['「看練什麼歌，有時候比今天還吵。」'], 2),
      ]),
      springSmsRound('那我不吵妳了，晚安。', [
        springSmsChoice('「晚安，諺明哥。」', ['「晚安，好好休息。」'], 1),
        springSmsChoice('「你也快去休息。」', ['「好，妳也是。」'], 1),
        springSmsChoice('「明天見！」', ['「明天見。」'], 1),
      ]),
    ],
  }

  const rounds = rehearsal[character].map((round) => ({
    incoming: round.incoming,
    choices: round.choices.map((choice) => ({ ...choice, response: [...choice.response] })),
  }))
  const wentStore = context.storeCharacter === character
  const ateTogether = character === 'yanming' && context.afterChoice === 'yanming-dinner'

  if (character === 'yanming' && ateTogether) {
    if (wentStore) {
    rounds[0] = springSmsRound(springContextLine(character, context), [
      springSmsChoice('「今天先看器材又一起吃飯，真的很充實。」', ['「哈哈，今天剛好把事情一起辦完，也吃了頓飯。」'], 2),
      springSmsChoice('「謝謝你帶我去看器材，還找了好吃的店。」', ['「不客氣，妳喜歡那家店就好。」'], 2),
      springSmsChoice('「下次換我找一家店請你！」', ['「好啊，那我就等妳安排。」'], 2),
    ])
    rounds[1] = springSmsRound('今天那家店妳覺得怎麼樣？下次還想吃什麼？', [
      springSmsChoice('「我覺得很好吃，下次還可以再去。」', ['「好啊，那下次再帶妳去。」'], 2),
      springSmsChoice('「下次想試試看別的菜。」', ['「沒問題，附近還有幾家也不錯。」'], 2),
      springSmsChoice('「今天有人陪我吃飯就很開心了。」', ['「……這樣喔。」他隔了一會兒才回：「那下次有空再一起吃。」'], 2),
    ])
    } else {
    rounds[0] = springSmsRound(springContextLine(character, context), [
      springSmsChoice('「今天那家店真的很好吃，谢谢你带我去。」', ['「不客氣，妳喜歡就好。」'], 2),
      springSmsChoice('「跟你吃饭很轻松，不用一直找话题。」', ['「哈哈，那就好，吃飯本來就不用太拘束。」'], 2),
      springSmsChoice('「下次换我请你，不可以拒绝。」', ['「好啊，那我就等妳安排。」'], 2),
    ])
    const dessertChosen = context.dinnerReplies?.[5] === 0 || context.dinnerReplies?.[5] === 2
    rounds[1] = springSmsRound(
      dessertChosen ? '妳今天最後還有分紅豆湯，吃完有沒有覺得太飽？' : '今天那頓飯吃得還習慣嗎？下次想吃什麼可以跟我說。',
      dessertChosen
        ? [
            springSmsChoice('「红豆汤很好吃，幸好有分着吃。」', ['「哈哈，一人一點剛剛好。」'], 2),
            springSmsChoice('「我本来以为吃不下，结果还是吃完了。」', ['「那就好，沒有勉強妳就好。」'], 2),
            springSmsChoice('「下次还想去那家店。」', ['「好啊，下次再帶妳去。」'], 2),
          ]
        : [
            springSmsChoice('「我吃得很饱，今天谢谢你。」', ['「不客氣，吃飽就好。」'], 2),
            springSmsChoice('「下次想试试别的菜。」', ['「好啊，下次再看看有什麼推薦的。」'], 2),
            springSmsChoice('「下次换我找一家店！」', ['「沒問題，我等妳的推薦。」'], 2),
          ])
    }
  } else if (wentStore && context.lessonCharacter === character) {
    const touchedCallus = context.lessonReplies?.[4] === 0
    const secondIncoming = touchedCallus
      ? character === 'wen' ? '妳今天真的摸了我的繭，後來有沒有覺得很新奇？'
        : character === 'ashin' ? '妳今天摸到我指尖那層薄繭，會不會覺得比想像中硬？'
          : character === 'masa' ? '妳今天還真的檢查我的繭，現在有沒有比較了解 Bass 手指的辛苦？'
            : '妳今天摸了我指腹上的繭，會不會覺得比看起來粗一點？'
      : character === 'wen' ? '剛剛練的那個和弦，妳回家有沒有再試？手指還酸嗎？'
        : character === 'ashin' ? '今天木吉他那幾個和弦，妳回家有沒有再想起來？'
          : character === 'masa' ? '今天練的 Bass 節奏，妳回去有沒有再試一次？'
            : '今天練的換和弦，回家有沒有再試一次？'

    if (character === 'wen') {
      rounds[0] = springSmsRound(springContextLine(character, context), [
        springSmsChoice('「有一點酸欸，剛剛按弦按到手指都快打結了。」', ['「哈哈，第一次本來就會這樣。回去不要再自己偷偷練到手痛喔。」'], 1),
        springSmsChoice('「還好啦，休息一下就好。你剛剛教得比我想像中有耐心耶。」', ['「妳是不是趁機稱讚我？不過有聽懂就好，慢慢來。」'], 2),
        springSmsChoice(touchedCallus ? '「手指有點酸，不過我現在還記得你剛剛把手伸過來的樣子。」' : '「手指有點酸……不過我還記得你手上的繭。」', [touchedCallus ? '「蛤？妳怎麼還一直記得那個啦。」' : '「那有什麼好記的啦，彈久了就會有。」'], 3),
      ])
      rounds[1] = springSmsRound(secondIncoming, touchedCallus ? [
        springSmsChoice('「比我想像中硬一點，真的看得出來練很久了。」', ['「不然咧，彈那麼多年不是假的。」'], 2),
        springSmsChoice('「你剛剛明明有點不自在，還裝得很鎮定。」', ['「哪有，妳不要亂講啦。」'], 3),
        springSmsChoice('「我本來只想摸一下，結果你手伸過來，我反而緊張了。」', ['「……妳講這個幹嘛啦。」'], 4),
      ] : [
        springSmsChoice('「有記得啦，我回家會慢慢試，不會硬練。」', ['「這樣就對了，手痛就先停。」'], 2),
        springSmsChoice('「剛剛有幾次還是按不乾淨，我有點不甘心。」', ['「第一次就想按得很漂亮喔？慢慢來啦。」'], 1),
        springSmsChoice('「下次你還要教我喔，今天才剛開始欸。」', ['「好啦，說好了。」'], 3),
      ])
      rounds[2] = springSmsRound('今天那個和弦，妳回家還記得怎麼按嗎？', [
        springSmsChoice('「記得啊，你說食指要立起來，不可以整個貼上去。」', ['「有記住就好，先把位置按對，不用急著快。」'], 2),
        springSmsChoice('「我現在腦袋裡還是你坐在旁邊示範的樣子。」', ['「妳不是在記和弦喔？」'], 3),
        springSmsChoice('「下次可以教我下一個和弦嗎？」', ['「可以啊，等妳手指休息好了再說。」'], 4),
      ])
      rounds[3] = springSmsRound('對了，今天在樂器行試的那幾顆效果器，妳最喜歡哪個音色？', [
        springSmsChoice('「我最喜歡踩下去之後，聲音突然變厚的那個。」', ['「那顆我也滿喜歡的，吉他一接上去差很多。」'], 2),
        springSmsChoice('「其實我比較喜歡你剛剛彈給我聽的那段。」', ['「妳到底是在選效果器，還是在選我啦？」'], 3),
        springSmsChoice('「下次換我自己踩開關，我想再試一次。」', ['「好啊，下次讓妳自己玩，這次不要踩太早喔。」'], 1),
      ])
      rounds[4] = springSmsRound('好啦，今天先這樣，妳的手指快去休息。', [
        springSmsChoice('「你也不要練到太晚，晚安。」', ['「知道啦，晚安。」'], 1),
        springSmsChoice('「你先說晚安，我才要去睡。」', ['「……晚安啦，大小姐。」'], 3),
        springSmsChoice('「明天見啦，吉他老師！」', ['「少來，明天見。」'], 2),
      ])
    } else if (character === 'ashin') {
      rounds[0] = springSmsRound(springContextLine(character, context), [
        springSmsChoice('「有一點酸，剛剛有幾個音還是悶悶的。」', ['「那就先不要再按了，手指休息一下。第一次能彈出聲音已經很好了。」'], 1),
        springSmsChoice('「還好啦，最後真的有幾個音彈對，我超有成就感。」', ['「真的啊，妳剛剛抬頭那個表情，我看得出來妳很開心。」'], 2),
        springSmsChoice(touchedCallus ? '「手指有點酸，不過我比較記得你把手掌翻過來給我摸的樣子。」' : '「手指還好啦，我比較記得你手上那層薄薄的繭。」', [touchedCallus ? '「哈哈，妳剛剛還很認真地看，現在又想起來了喔？」' : '「那是練久了慢慢留下來的，妳不用急著也練成這樣。」'], 3),
      ])
      rounds[1] = springSmsRound(secondIncoming, touchedCallus ? [
        springSmsChoice('「有欸，比看起來硬一點，而且你還特地轉給我看。」', ['「我怕妳看不清楚嘛。」'], 2),
        springSmsChoice('「我本來以為你會不好意思，結果是我先緊張。」', ['「哈哈，妳剛剛真的有點不知所措。」'], 3),
        springSmsChoice('「你是不是怕我不好意思，所以才一直沒有把手收回去？」', ['「可能有一點吧，不想讓妳覺得突然。」'], 4),
      ] : [
        springSmsChoice('「有記得幾個和弦，但手指還要再熟悉一點。」', ['「慢慢來就好，先把每個位置記清楚。」'], 2),
        springSmsChoice('「剛剛有幾個音還是悶掉了，我想再試一次。」', ['「可以啊，下次我們再慢慢調整。」'], 1),
        springSmsChoice('「下次你還可以再陪我練嗎？」', ['「當然可以啊，妳想練的時候跟我說。」'], 3),
      ])
      rounds[2] = springSmsRound('今天木吉他那幾個和弦，妳最記得哪一個？', [
        springSmsChoice('「記得你說指尖要靠近品絲一點點。」', ['「對，就是那個位置，妳有記住就好。」'], 2),
        springSmsChoice('「我比較記得你一直說不用急，害我真的沒那麼緊張了。」', ['「那就好，我不想讓妳覺得學琴有壓力。」'], 3),
        springSmsChoice('「下次還想學你今天彈的那一段。」', ['「好啊，我可以再彈慢一點給妳聽。」'], 4),
      ])
      rounds[3] = springSmsRound('今天在木吉他區試的兩把琴，妳比較喜歡哪一把的聲音？', [
        springSmsChoice('「我比較喜歡音色溫暖的那一把。」', ['「我也覺得那把比較耐聽，抱起來也滿舒服。」'], 2),
        springSmsChoice('「其實你兩把都彈得很好聽，我有點選不出來。」', ['「那下次再慢慢比較，不用急著選。」'], 3),
        springSmsChoice('「我還想再抱一次，剛剛那把真的比想像中大。」', ['「哈哈，可以啊，下次我幫妳把琴身調好再試。」'], 1),
      ])
      rounds[4] = springSmsRound('好啦，今天先聊到這裡，妳早點休息，手指也要休息喔。', [
        springSmsChoice('「晚安，今天謝謝你慢慢教我。」', ['「晚安～今天陪妳練琴我也很開心。」'], 3),
        springSmsChoice('「你也早點休息，不要再彈到太晚。」', ['「好，我等一下就收，妳也早點睡。」'], 2),
        springSmsChoice('「下次見面再繼續上課喔。」', ['「好啊，我會先想想下次教妳什麼。」'], 1),
      ])
    } else if (character === 'masa') {
      rounds[0] = springSmsRound(springContextLine(character, context), [
        springSmsChoice('「有！你的 Bass 根本是手指體能訓練吧。」', ['「現在知道了吧？兩隻手要一起做事，沒有那麼簡單。」'], 1),
        springSmsChoice('「還好啦，至少最後有跟上節拍，沒有整段散掉。」', ['「這句倒是可以給妳加分，至少有抓到一點。」'], 2),
        springSmsChoice(touchedCallus ? '「手指酸是酸，不過我還想寫你的繭子檢查報告。」' : '「手指酸是酸，不過我還是很好奇你手上的繭。」', [touchedCallus ? '「欸，妳那份報告到底要寫多久？不要亂打分數喔。」' : '「有什麼好奇的，練久就會有啦。」'], 3),
      ])
      rounds[1] = springSmsRound(secondIncoming, touchedCallus ? [
        springSmsChoice('「有！報告結論是你嘴巴比手指還硬。」', ['「欸，妳這份報告有偏見喔。」'], 3),
        springSmsChoice('「你明明一直在笑，手卻乖乖攤著沒有躲。」', ['「我是在配合檢查員，不要自己加戲。」'], 4),
        springSmsChoice('「我是不是應該收個檢查費？」', ['「妳先把今天的節拍練好再說啦。」'], 2),
      ] : [
        springSmsChoice('「有啦，我現在聽到節拍都會想起來。」', ['「那表示妳至少有記住一點。」'], 2),
        springSmsChoice('「我還是覺得兩隻手根本不熟。」', ['「那就下次繼續練，不能一直怪手不配合。」'], 1),
        springSmsChoice('「下次我要練到你沒話可以吐槽。」', ['「這個目標有點困難喔。」'], 3),
      ])
      rounds[2] = springSmsRound('今天那段 Bass 節奏，妳現在還記得右手怎麼輪嗎？', [
        springSmsChoice('「記得啊，食指和中指要輪流撥。」', ['「至少這個有記住，沒有白教。」'], 2),
        springSmsChoice('「我現在還記得你在旁邊一直數拍子。」', ['「不然咧？不數妳又要跑掉了。」'], 3),
        springSmsChoice('「下次我要把整段練到不出錯。」', ['「好啊，我等著看妳有沒有這個本事。」'], 4),
      ])
      rounds[3] = springSmsRound('今天幫我看琴弦的時候，妳有沒有搞懂那兩包差在哪裡？', [
        springSmsChoice('「大概懂了，原來不是只看價格就好。」', ['「至少有聽進去，買錯才麻煩。」'], 2),
        springSmsChoice('「我只記得你一直在比價，真的很會精打細算。」', ['「不然咧，錢又不是撿來的。」'], 1),
        springSmsChoice('「下次再教我怎麼挑琴弦，我不想只看價格。」', ['「好啊，下次不要只顧著看標價。」'], 3),
      ])
      rounds[4] = springSmsRound('好了，今天先放過妳，早點睡，明天手指不要再來抗議。', [
        springSmsChoice('「晚安啦，Bass 老師。」', ['「欸，還算有禮貌嘛。晚安。」'], 2),
        springSmsChoice('「你才要早點睡，不要一直吐槽我。」', ['「我那是教學的一部分好不好。晚安啦。」'], 1),
        springSmsChoice('「下次我要練到你沒話可以吐槽。」', ['「好啊，我等著看妳有沒有這個本事。」'], 3),
      ])
    } else {
      rounds[0] = springSmsRound(springContextLine(character, context), [
        springSmsChoice('「有一點酸，原來換和弦比看起來難好多。」', ['「很正常，手指還不熟悉，先休息，不用勉強。」'], 1),
        springSmsChoice('「還好，最後那一次終於順過去了，我自己都嚇一跳。」', ['「我有看到，妳後來真的越來越順了。」'], 2),
        springSmsChoice(touchedCallus ? '「我現在還記得剛剛摸到你指腹的觸感。」' : '「我還記得你手上那層薄繭，看起來跟平常很不一樣。」', [touchedCallus ? '「哈哈，會有一點粗粗的，不過妳剛剛摸得很小心。」' : '「練久了就會留下痕跡，妳不用急著也練成這樣。」'], 3),
      ])
      rounds[1] = springSmsRound(secondIncoming, touchedCallus ? [
        springSmsChoice('「有一點，不過你一直很耐心地讓我看。」', ['「我只是怕妳手指不舒服。」'], 2),
        springSmsChoice('「我本來以為你會害羞，結果反而是我先不好意思。」', ['「其實我也有一點，只是怕妳更不好意思。」'], 3),
        springSmsChoice('「你剛剛看著我的時候，我差點忘記要說什麼。」', ['「……我也是。」'], 4),
      ] : [
        springSmsChoice('「有記得幾個位置，但手指還要再練習。」', ['「沒關係，慢慢來，先讓手指記住。」'], 2),
        springSmsChoice('「我剛剛還是一直碰到旁邊的弦。」', ['「那很正常，下次我們再把角度調好。」'], 1),
        springSmsChoice('「下次你還要陪我練嗎？」', ['「好啊，只要妳想學，我就陪妳。」'], 3),
      ])
      rounds[2] = springSmsRound('今天換和弦那幾次，妳回家還記得手指要怎麼放嗎？', [
        springSmsChoice('「記得要先把手指抬起來，再一起放下去。」', ['「對，先記住位置，速度以後再慢慢加。」'], 2),
        springSmsChoice('「你剛剛一直等我，真的沒有催我。」', ['「學東西本來就不用趕，妳照自己的速度就好。」'], 3),
        springSmsChoice('「下次想再跟你練另一組和弦。」', ['「好啊，下次我們再慢慢試。」'], 4),
      ])
      rounds[3] = springSmsRound('今天在店裡看了那麼多背帶和保養用品，妳最喜歡哪一樣？', [
        springSmsChoice('「我還是覺得你最後挑的那條背帶最適合你。」', ['「我也覺得，實用跟舒服都重要。」'], 2),
        springSmsChoice('「我其實比較喜歡另一條，顏色很特別。」', ['「那條也不錯，之後可以再看看。」'], 1),
        springSmsChoice('「下次可以再教我怎麼保養吉他嗎？」', ['「可以啊，妳想學的話我再慢慢教妳。」'], 3),
      ])
      rounds[4] = springSmsRound('時間不早了，妳先休息，手指明天應該會舒服一點。', [
        springSmsChoice('「晚安，今天謝謝你。」', ['「不客氣，今天妳很認真。晚安。」'], 1),
        springSmsChoice('「你也早點休息，手指也要保養喔。」', ['「好，我會記得。妳也要照顧好自己的手。」'], 2),
        springSmsChoice('「下次再教我別的和弦，好不好？」', ['「當然好啊，下次我們再慢慢練。」'], 3),
      ])
    }
} else if (wentStore) {
    const secondIncoming = springStoreFollowUpLine(character, context)
    rounds[0] = springStoreSmsFirstRound(character, context)
    rounds[1] = springSmsRound(secondIncoming, [
      springSmsChoice('「你真的很会挑东西欸。」', [character === 'wen' ? '「還好啦，自己要用的當然要看仔細。」' : character === 'ashin' ? '「多聽幾次就會知道自己喜歡哪種聲音了。」' : character === 'masa' ? '「不然錢花下去，買到不合用的不是更嘔？」' : character === 'stone' ? '「用得舒服比較重要，不一定要挑最貴的。」' : '「器材合用最重要，其他都可以慢慢看。」'], 2),
      springSmsChoice('「我今天其实玩得很开心。」', ['「那就好，下次有空再一起來。」'], 2),
      springSmsChoice('「下次还要带我来喔。」', ['「好啦，知道了。」'], 2),
    ])
} else if (context.lessonCharacter === character) {
    rounds[0] = springSmsRound(springContextLine(character, context), [
      springSmsChoice('「我今天真的有学到东西，谢谢你。」', ['「不客氣啦，妳今天很認真。」'], 2),
      springSmsChoice('「我手指有一点酸，不过还好。」', ['「那就先休息，不要急著練。」'], 1),
      springSmsChoice('「下次还想继续学。」', ['「好啊，我們慢慢來。」'], 2),
    ])
    rounds[1] = springSmsRound(
      context.lessonReplies?.[4] === 0
        ? character === 'wen' ? '妳今天摸了我的繭，現在還覺得新奇嗎？'
          : character === 'ashin' ? '妳今天摸到我手上的薄繭，會不會覺得很不一樣？'
            : character === 'masa' ? '妳今天還真的檢查我的繭，這麼好奇喔？'
              : '妳今天摸了我指腹上的繭，會不會覺得粗粗的？'
        : '今天練到後來，妳的手指有沒有比較舒服？',
      [
        springSmsChoice('「真的比我想像中硬一点。」', ['「哈哈，練久了就會這樣。」'], 2),
        springSmsChoice('「我觉得很神奇，原来练琴会留下这些痕迹。」', ['「都是慢慢累積的，不用急著也練成這樣。」'], 2),
        springSmsChoice('「我回家会记得先休息，不会硬练。」', ['「這樣就對了，手指不舒服就停一下。」'], 2),
      ])
  }

  return rounds
}
