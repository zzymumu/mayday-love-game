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
export type SpringSmsRound = { incoming: string; choices: SpringSmsChoice[]; outgoing?: string; incomingMessages?: string[] }
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
  stone: ['今天上午有空嗎？', '我想去樂器行看看吉他配件。', '如果妳沒事的話，可以一起走走。'],
  yanming: ['妳上午有空嗎？', '我想去樂器行看看一些器材。', '有空的話一起去吧。'],
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
    { incoming: ['「所以妳今天有空嗎？」', '「我大概上午十點過去，妳要不要一起？」'], choices: [
      { text: '「好啊，上午十點見！」', response: ['「好，那上午十點。妳慢慢來，不用趕。」'], affection: 3, accepted: true },
      { text: '「可以啊，但你要先答應不准嫌我不懂。」', response: ['「我哪有要嫌妳，亂講。」', '「上午十點見啦。」'], affection: 2, accepted: true },
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
      { text: '「好啊，我想跟你一起去！」', response: ['「太好了，那我們上午十點左右在校門口碰面。」'], affection: 3, accepted: true },
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
    { incoming: ['「好啦，講正事。」', '「上午要不要一起去？我請妳吃個東西，省得妳說我只會使喚人。」'], choices: [
      { text: '「好啊，走！我倒要看看你要買什麼。」', response: ['「這才像話。上午十點，校門口不要遲到。」'], affection: 3, accepted: true },
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
    { incoming: ['「我上午十點左右會到那附近。」', '「妳如果有空，要不要一起走過去？慢慢看就好。」'], choices: [
      { text: '「好啊，我們一起去。」', response: ['「好，那我上午十點在校門口等妳。」'], affection: 3, accepted: true },
      { text: '「可以，你等我一下，我下課就過去。」', response: ['「不急，妳下課再傳訊息給我就好。」'], affection: 2, accepted: true },
      { text: '「今天想先回家，改天再一起去吧。」', response: ['「好啊，沒關係，回家路上小心。」'], affection: 1, accepted: false },
    ]},
  ],
  yanming: [
    { incoming: springInvites.yanming, choices: [
      { text: '「上午還沒有安排，怎麼了？」', response: ['「練團室有幾樣器材需要補，我上午想去店裡確認一下。」'], affection: 2 },
      { text: '「你要買什麼？我可以陪你一起挑。」', response: ['「主要是一些配件和耗材，有人一起看會比較周全。」'], affection: 3 },
      { text: '「我可能要先整理一下課堂筆記，晚一點呢？」', response: ['「可以，時間不急，我先把要買的東西列好。」'], affection: 1 },
    ]},
    { incoming: ['「店裡說今天會到一批新的鼓棒和導線。」', '「我想先確認尺寸和規格，免得買回去不合用。」'], choices: [
      { text: '「你列清單真的很仔細欸。」', response: ['「習慣了，器材要合用，大家練團才不會受影響。」'], affection: 2 },
      { text: '「那我幫你看外觀，規格就交給你。」', response: ['「好啊，這樣分工剛剛好。」'], affection: 3 },
      { text: '「我只負責陪逛，不負責做功課喔。」', response: ['「哈哈，沒問題，規格我會先確認好。」'], affection: 1 },
    ]},
    { incoming: ['「我大概上午十點出發，妳如果方便的話……」', '「要不要一起去？買完也可以順路走走。」'], choices: [
      { text: '「好啊，上午十點一起出發。」', response: ['「好，那我在校門口等妳，妳不用趕，到了再傳訊息給我就可以。」'], affection: 3, accepted: true },
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

type SpringDailySmsChoiceData = {
  text: string
  response: string | string[]
  affection?: number
}
type SpringDailySmsTrack = SpringSmsRound[]
type SpringDailySmsChat = {
  openings: SpringSmsRound[]
  tracks: SpringDailySmsTrack[]
}
const springDailySmsRound = (
  incoming: string,
  choices: SpringDailySmsChoiceData[],
  options: Pick<SpringSmsRound, 'outgoing' | 'incomingMessages'> = {},
): SpringSmsRound => ({
  ...springSmsRound(incoming, choices.map(({ text, response, affection = 2 }) =>
    springSmsChoice(text, Array.isArray(response) ? response : [response], affection),
  )),
  ...options,
})

// Five people, five genuinely different ways of chatting.
// The first reply selects one everyday topic; every later prompt stays on that topic,
// so the player's reply always answers the message immediately above it.
type SpringDailySmsOpener = {
  text: string
  response: string
  affection: number
  textMessages?: string[]
  responseMessages?: string[]
}
const springDailySmsOpeners: Record<SpringCharacterId, SpringDailySmsOpener[]> = {
  wen: [
    {
      text: '「我刚刚泡了杯热可可，结果第一口喝太急，差点把舌头烫到了……」',
      response: '「妳是有多急啦？」',
      textMessages: [
        '「我刚刚泡了杯热可可，结果第一口喝太急，差点把舌头烫到了……」',
        '「现在讲话都有点不利索了哈哈哈哈。」',
      ],
      responseMessages: [
        '「妳是有多急啦？」',
        '「熱的東西也不知道先吹一下喔。」',
      ],
      affection: 2,
    },
  ],
  ashin: [
    { text: "「阿信！！我今天買早餐差點遲到！\n前面那個人點東西點超久，我站在後面都快急死了。」", response: "「欸，真的喔？\n妳是不是已經看了好幾次手錶了啦。\n這種時候真的會很想說，老闆，我可以先點嗎……」", affection: 2 },
    { text: "「阿信，我今天去文具店本來只想買一支筆。\n結果逛了半天，買了一堆貼紙跟筆記本，筆反而忘記買了……」", response: "「欸，妳怎麼這樣啦。\n本來要買的東西沒有買，倒是帶了一堆其他東西回家。\n不過文具店真的很危險，我也常常進去就忘記時間。」", affection: 2 },
    { text: "「阿信，我今天走錯教室了！！\n我坐了好幾分鐘才發現老師講的東西跟我的課完全沒關係。」", response: "「真的假的啦？\n妳怎麼會坐到好幾分鐘才發現？\n那妳後來怎麼出去的？有沒有被大家看見？」", affection: 2 },
  ],
  masa: [
    { text: "「瑪莎！！我剛剛去影印店，結果把講義拿錯了！\n排到我了才發現，真的尷尬死了。」", response: "「妳去影印店是要幹嘛？\n拿錯講義去跟老闆交流感情喔？\n我看妳下次出門還是帶個人好了。」", affection: 2 },
    { text: "「瑪莎，我剛剛買飲料的時候，零錢整個掉地上！\n還有一顆滾到櫃檯下面，我蹲在那裡找半天……」", response: "「妳這是買飲料還是在舉辦尋寶活動？\n一杯飲料喝完，順便鍛鍊一下腰力。」", affection: 2 },
    { text: "「瑪莎，我今天穿新鞋出門，結果才走半小時就磨腳！\n現在腳後跟痛死了，我真的要瘋掉。」", response: "「漂亮嗎？\n如果漂亮的話，至少還有一個優點。\n不然妳今天到底圖什麼？」", affection: 2 },
  ],
  stone: [
    { text: "「石頭！！我剛剛洗完衣服才發現口袋裡有衛生紙！\n現在整桶衣服都是白色碎屑，我真的要崩潰了。」", response: "「喔，這個很麻煩欸。\n尤其是黑色衣服，那個紙屑會黏得特別明顯。\n妳現在是在一件一件清嗎？」", affection: 2 },
    { text: "「石頭，我今天自己裝了一個小架子！\n可是裝完多出來兩顆螺絲，我現在有點懷疑它到底能不能用。」", response: "「欸，妳先不要急著放東西。\n有些家具本來就會多附備用螺絲，不過還是先檢查一下比較好。」", affection: 2 },
    { text: "「石頭，我剛剛整理書包，翻到上學期的筆記。\n我發現我以前上課居然會在旁邊畫小人，畫得還挺認真……」", response: "「妳畫了什麼？\n是那種上課聽到一半，手自己開始動的那種嗎？」", affection: 2 },
  ],
  yanming: [
    { text: "「諺明哥，我買便當回來才發現沒拿筷子。\n站在店門口發呆，差點想直接用手吃。」", response: "「妳是在等筷子自己從天上掉下來喔？」", affection: 2 },
    { text: "「我洗完衣服發現襪子只剩一隻。\n另一隻不知道跑去哪了，整個房間都找過了！」", response: "「洗衣機開始收租了喔。」", affection: 2 },
    { text: "「諺明哥，我明明寫了購物清單。\n結果買了一堆東西，偏偏忘記雞蛋。」", response: "「妳那張清單今天有出勤嗎？」", affection: 3 },
  ],
}

const springDailySmsChats: Record<SpringCharacterId, SpringDailySmsChat> = {
  wen: {
    openings: [
      springDailySmsRound('', [
        { text: '「我哪有！我只是太想喝了嘛。」', response: '「最好是啦，連喝個東西都等不了。」' },
        { text: '「那你下次要記得提醒我。」', response: '「蛤？喝東西還要我提醒喔？……好啦，下次記得先吹涼。」', affection: 3 },
        { text: '「你不要講我，你自己肯定也會這樣！」', response: '「我才不會咧，至少我知道燙的東西要先放一下。」' },
      ]),
    ],
    tracks: [
      [
        springDailySmsRound('', [
          { text: '「想看看你有没有什么私藏的好吃店。」', response: '「喔，原来是想找我当美食地图喔？可以啊，我知道几家不错的。」', affection: 3 },
          { text: '「因为我发现你还挺懂吃的嘛。」', response: '「我哪有很懂，吃得多而已啦。」', affection: 2 },
          { text: '「没什么，我只是想找个人陪我吃东西。」', response: '「妳这个理由倒是很直接欸。想吃就讲啊，又不会不陪妳去。」', affection: 4 },
        ], {
          outgoing: '「你平常是不是也很喜欢吃甜的？」',
          incomingMessages: [
            '「还好吧，看吃什么。」',
            '「怎么突然问这个？」',
          ],
        }),
        springDailySmsRound('', [
          { text: '「那你是不是经常饿着肚子练团？」', response: '「也没有那么夸张啦，有空还是会吃。」' },
          { text: '「我觉得你应该随身带一包零食。」', response: '「妳以为我是小学生喔，还要带零食。」' },
          { text: '「下次我给你带吃的好了。」', response: '「真的喔？那我先说好，不可以拿不好吃的东西来敷衍我。」', affection: 4 },
        ], {
          outgoing: '「对了，你平常练团的时候会不会突然很想吃东西？」',
          incomingMessages: [
            '「会啊，练到一半肚子叫很正常吧。」',
            '「有时候一忙起来，根本忘记时间。」',
          ],
        }),
        springDailySmsRound('', [
          { text: '「有啊！刚刚还叫我吃慢一点。」', response: '「那是因为妳吃太快，正常人都会提醒吧。」' },
          { text: '「那你干嘛一直记得我头痛？」', response: '「……我只是刚好记得而已，有什么好奇怪的。」', affection: 4 },
          { text: '「好啦好啦，你最没有管我了。」', response: '「知道就好，不要一天到晚给我乱扣帽子。」' },
        ], {
          outgoing: '「你讲话真的很像那种嘴上嫌弃别人，实际上又什么都会管的人。」',
          incomingMessages: [
            '「妳现在是在说我喔？」',
            '「我哪有管妳，妳不要乱讲。」',
          ],
        }),
        springDailySmsRound('', [
          { text: '「知道啦！温老师晚安。」', response: '「谁是老师啦。晚安，手机放下去。」' },
          { text: '「你怎么突然这么像我妈？」', response: '「蛤？我有那么啰嗦喔？妳才是要早点睡的那个。」' },
          { text: '「那你也早点睡，不要又熬夜。」', response: '「知道啦，妳也是。晚安。」' },
        ], {
          outgoing: '「好啦，不闹你了，我要去洗澡了。」',
          incomingMessages: [
            '「快去啦，手机不要拿进浴室。」',
          ],
        }),
      ],
    ],
  },
  ashin: {
    openings: [
      springDailySmsRound("「我之前也遇過啊，有一次前面的人一直改飲料。冰的、熱的、少冰，講到最後我都快記住他的訂單了。」", [
        { text: "「你是不是還在旁邊幫他記？」", response: "「差不多欸，差一點就要幫老闆複誦一次了。」", affection: 2 },
        { text: "「那你怎麼不直接幫他決定啦！」", response: "「不行馁，萬一他不喜歡，我不是要負責。」", affection: 2 },
        { text: "「我真的會急死，我後面還有課欸！」", response: "「那真的很緊張喔，尤其看到時間一直走。」", affection: 2 },
      ]),
      springDailySmsRound("「我前陣子也買了一本筆記本，封面很好看。結果到現在只寫了第一頁。」", [
        { text: "「第二頁有什麼魔咒嗎？」", response: "「沒有啦，就是第一天寫得太認真，後面突然不知道要寫什麼。」", affection: 2 },
        { text: "「你是不是捨不得寫壞它？」", response: "「有一點欸，紙很漂亮，寫錯字會覺得可惜。」", affection: 2 },
        { text: "「你拿來給我亂畫就不心疼了！」", response: "「什麼啦，妳倒是很會幫我安排用途。」", affection: 2 },
      ]),
      springDailySmsRound("「我以前也有一次走錯教室，剛好老師已經開始上課了。我本來想說算了，坐一下應該沒關係，結果發現課程完全聽不懂。」", [
        { text: "「你也太敢了吧，居然還坐著！」", response: "「我那時候想說先觀察一下，可能是我記錯教室。」", affection: 2 },
        { text: "「然後呢？你就一直聽？」", response: "「沒有啦，後來還是默默出去了。」", affection: 2 },
        { text: "「我應該直接逃跑，越快越好！」", response: "「妳不要跑啦，萬一撞到人更尷尬。」", affection: 2 },
      ]),
    ],
    tracks: [
      [
        springDailySmsRound("「不過我今天早上也有點糗。買了早餐才發現忘記帶錢，站在櫃檯前面摸了半天。」", [
        { text: "「蛤？？你最後怎麼付的？」", response: "「還好有帶零錢啦，不然真的要跟老闆說下次再來。」", affection: 2 },
        { text: "「你怎麼跟我一樣迷糊啦！」", response: "「什麼啦，偶爾忘記一次而已嘛。」", affection: 2 },
        { text: "「那你有沒有臉紅？我感覺你好像會。」", response: "「有一點啦……老闆還一直看著我，滿不好意思的。」", affection: 2 },
      ]),
        springDailySmsRound("「我剛剛還買了一個飯糰，結果裡面的肉鬆掉出來。吃到一半桌子都是碎屑，差點不知道該從哪裡下口。」", [
        { text: "「你今天到底怎麼了啦，早餐一直出狀況！」", response: "「我也不知道欸，可能今天跟食物不太合。」", affection: 2 },
        { text: "「你應該拍照給我看的，好好笑。」", response: "「才不要，拍起來一定很狼狽。」", affection: 2 },
        { text: "「那你有吃完嗎？不准浪費！」", response: "「有啦，還是吃完了。只是吃得有點辛苦馁。」", affection: 2 },
      ]),
        springDailySmsRound("「下次如果我們一起去買早餐，妳要負責幫我看一下有沒有帶錢包。我負責幫妳看時間，這樣應該就不會遲到了。」", [
        { text: "「好啊！那我還要幫你檢查有沒有帶腦袋。」", response: "「欸，怎麼突然攻擊我啦。」", affection: 2 },
        { text: "「可以！不過我可能會先去買自己想吃的。」", response: "「那我是不是要早點出門，不然妳就自己跑掉了。」", affection: 2 },
        { text: "「我們兩個根本需要一個生活管理員。」", response: "「好像真的有一點……不過應該會很有趣啦。」", affection: 2 },
      ]),
        springDailySmsRound("「我下次應該把錢包放在包包最外層，免得又在櫃檯前面翻找。」", [
        { text: "「你最好真的記得，不然我下次幫你在額頭貼一張提醒。」", response: "「不要啦，這樣我走在路上會被大家看見。」", affection: 2 },
        { text: "「那你明天早餐吃什麼？先練習回答看看。」", response: "「先不要考我啦，我現在已經想好要點什麼了。」", affection: 2 },
        { text: "「好啊，我負責檢查錢包，你負責幫我拿早餐。」", response: "「這個分工可以欸，感覺我比較不會出錯。」", affection: 2 },
      ]),
      ],
      [
        springDailySmsRound("「我有時候買筆也是這樣，明明已經有很多支了。可是看到新的顏色，還是會忍不住拿起來試寫。」", [
        { text: "「對！！那個試寫區真的很容易讓人失控。」", response: "「而且每支都想試，最後手上會沾得到處都是。」", affection: 2 },
        { text: "「你喜歡什麼顏色的筆？」", response: "「藍色吧，寫起來比較順眼。偶爾也會買紅色的。」", affection: 2 },
        { text: "「那下次我幫你挑！保證挑一支最漂亮的。」", response: "「好啊，不過妳不要挑到只剩外表漂亮的喔。」", affection: 2 },
      ]),
        springDailySmsRound("「我剛剛還翻到一支很久沒用的筆，結果一寫就斷水。搖了半天，還是沒有救回來。」", [
        { text: "「你搖筆的時候是不是很像在甩魔法棒？」", response: "「有喔，而且沒有任何效果，魔法失敗了。」", affection: 2 },
        { text: "「拿去跟店家換啦！」", response: "「這支買很久了啦，人家應該不會理我。」", affection: 2 },
        { text: "「那你送給我，我幫你研究。」", response: "「妳確定不是想多拿一支筆？我有點懷疑喔。」", affection: 2 },
      ]),
        springDailySmsRound("「我覺得我們下次可以去文具店逛逛。不過要先說好，只能買清單上的東西。」", [
        { text: "「那你負責拿清單，我負責挑東西！」", response: "「欸，這樣不是更容易買多嗎？」", affection: 2 },
        { text: "「我保證！我發誓！」", response: "「妳每次講保證，我都覺得事情不太單純馁。」", affection: 2 },
        { text: "「你怎麼這麼不相信我啦！」", response: "「沒有啦，我是怕自己也忍不住，最後兩個人一起破功。」", affection: 2 },
      ]),
        springDailySmsRound("「我突然想到，妳今天雖然沒買到筆，但貼紙是不是買得很開心？」", [
        { text: "「超開心！我已經想好要貼在哪裡了。」", response: "「那就好，至少今天不是空手而回嘛。」", affection: 2 },
        { text: "「買完才發現有幾張根本不知道要貼什麼。」", response: "「那先留著啊，總有一天會找到適合它的位置。」", affection: 2 },
        { text: "「你要不要挑一張？送你當作文具店紀念品。」", response: "「真的喔？那我想挑一張不要太可愛的，怕被妳笑。」", affection: 2 },
      ]),
      ],
      [
        springDailySmsRound("「最麻煩的是那種階梯教室，坐進去以後才發現不對勁。要出去還得經過一整排的人。」", [
        { text: "「救命，我最怕這種！」", response: "「對啊，而且椅子還會一直發出聲音，真的很明顯。」", affection: 2 },
        { text: "「我一定會假裝去上廁所。」", response: "「這個理由不錯欸，聽起來比較自然。」", affection: 2 },
        { text: "「你有沒有遇過老師剛好看著你出去？」", response: "「有一次有……我還跟他點頭，真的不知道自己在幹嘛。」", affection: 2 },
      ]),
        springDailySmsRound("「不過妳下次還是先看一下門牌啦。不然哪天坐到完全不認識的課，老師突然叫妳回答就糟糕了。」", [
        { text: "「我就說我是來旁聽的！」", response: "「欸，妳還挺會找理由的喔。」", affection: 2 },
        { text: "「我會裝作很認真，然後趁機溜走。」", response: "「妳這樣老師可能還會以為妳很喜歡他的課。」", affection: 2 },
        { text: "「那我乾脆真的選修好了。」", response: "「欸？不要因為走錯教室就改變人生啦。」", affection: 2 },
      ]),
        springDailySmsRound("「我覺得妳應該在課表上多標幾個顏色。這樣比較不容易看錯，至少出門前還能確認一下。」", [
        { text: "「好啦，我回去就改！」", response: "「乖，記得改喔，不要又忘記。」", affection: 2 },
        { text: "「你幫我記嘛，我的腦袋今天休假。」", response: "「什麼啦，怎麼連這個都要交給我。」", affection: 2 },
        { text: "「我覺得我需要一個專屬導航員。」", response: "「可以啊，不過妳要先告訴我自己到底要去哪裡馁。」", affection: 2 },
      ]),
        springDailySmsRound("「不過妳今天這樣一講，我也想起自己以前走錯教室的事了，現在看到門牌都會多看一眼。」", [
        { text: "「那我們以後互相檢查，誰都不准再走錯！」", response: "「好啊，互相提醒比較保險，妳不要嫌我囉嗦就好。」", affection: 2 },
        { text: "「你先把自己的課表看好啦，還想管我。」", response: "「欸，我有在看啦，只是偶爾眼睛會自動跳過門牌。」", affection: 2 },
        { text: "「下次走錯就當作去別系交流一下。」", response: "「這個理由好像不錯欸，不過還是不要常常交流好了。」", affection: 2 },
      ]),
      ]
    ],
  },
  masa: {
    openings: [
      springDailySmsRound("「我之前印報告，印完才發現整份都印成雙面的。老師說要單面，我拿到的時候差點想裝作沒看見。」", [
        { text: "「你怎麼連這種事情都會弄錯啊！」", response: "「我只是按錯一個選項，又不是把機器拆了。」", affection: 2 },
        { text: "「那你後來全部重印？」", response: "「不然呢？拿去交給老師，說這是環保版本？」", affection: 2 },
        { text: "「哈哈哈，老師搞不好還會表揚你。」", response: "「那妳去跟老師說，我下次也印雙面給他。」", affection: 2 },
      ]),
      springDailySmsRound("「我剛剛想到一個問題。妳蹲下去找的時候，有沒有發現後面的人都在看妳？」", [
        { text: "「有啦！！所以我才覺得超丟臉！」", response: "「那妳有沒有跟他們說，歡迎大家一起參加？」", affection: 2 },
        { text: "「我才不管，錢掉了當然要撿啊！」", response: "「這倒是，妳的財產意識還挺強。」", affection: 2 },
        { text: "「你要是看到我，肯定也會幫忙吧？」", response: "「我會先站旁邊確認是不是妳，再決定要不要裝不認識。」", affection: 2 },
      ]),
      springDailySmsRound("「我之前也買過一雙鞋。試穿的時候明明很好走，結果穿出去才發現腳趾根本沒地方待。」", [
        { text: "「哈哈哈哈哈哈，你腳趾被你關起來了！」", response: "「不然咧？我總不能幫它申請搬家。」", affection: 2 },
        { text: "「那你怎麼還買？」", response: "「因為當時覺得好看啊，審美戰勝理智。」", affection: 2 },
        { text: "「所以我們兩個是同一類人。」", response: "「不要把我拖下水，我只是偶爾判斷失誤。」", affection: 2 },
      ]),
    ],
    tracks: [
      [
        springDailySmsRound("「而且影印店那個老闆真的很有耐心。我上次改了三次尺寸，他最後直接問我：同學，你到底要多大？」", [
        { text: "「哈哈哈哈哈哈你活該！」", response: "「妳有什麼資格笑我？妳連講義都拿錯。」", affection: 2 },
        { text: "「我至少沒有改三次尺寸！」", response: "「對，妳比較厲害，連東西都不用印。」", affection: 2 },
        { text: "「我決定不跟你講話了。」", response: "「好啊，終於安靜了。謝謝配合。」", affection: 2 },
      ]),
        springDailySmsRound("「對了，妳那份講義到底拿去幹嘛了？不會到現在還放在包包裡吧？」", [
        { text: "「對啊，我準備留著紀念今天的恥辱。」", response: "「可以，建議裱框，放在書桌最顯眼的地方。」", affection: 2 },
        { text: "「我拿去問同學是不是他的，結果還真的是！」", response: "「妳還順便幫人家找回失物，今天也算有貢獻。」", affection: 2 },
        { text: "「我直接丟掉了，眼不見為淨！」", response: "「很好，處理問題的方式相當成熟，直接消滅證據。」", affection: 2 },
      ]),
        springDailySmsRound("「下次妳去影印之前先傳訊息給我。我幫妳確認一下有沒有帶對東西。」", [
        { text: "「你確定？我怕你把我的也印錯！」", response: "「放心，我只負責檢查，不負責拯救妳的記憶力。」", affection: 2 },
        { text: "「不要，我寧願相信自己！」", response: "「那我就祝妳好運，跟妳的講義相親相愛。」", affection: 2 },
        { text: "「你就是想看我出糗！」", response: "「不然咧？妳平常也沒少看我出糗啊，公平一點嘛。」", affection: 2 },
      ]),
        springDailySmsRound("「反正妳下次拿講義先看封面，別再把別人的東西帶回家。」", [
        { text: "「知道啦！你才要先看印表機設定。」", response: "「我會看，妳先把講義看好。」", affection: 2 },
        { text: "「你真的很適合當我的監考老師。」", response: "「不敢當，妳這種學生我管不動。」", affection: 2 },
        { text: "「不然下次我們一起去，誰拿錯誰請飲料！」", response: "「這個賭注可以，妳最好先把東西拿對。」", affection: 2 },
      ]),
      ],
      [
        springDailySmsRound("「我剛剛買完東西把錢包收起來，走到門口才發現手機還放在櫃檯。又折回去拿，店員已經準備幫我保管了。」", [
        { text: "「你還敢說我！你自己也差不多嘛！」", response: "「我那叫有驚無險，妳那個叫現場撒錢。」", affection: 2 },
        { text: "「哈哈哈，你是不是還跟店員說謝謝？」", response: "「當然啊，不然還要跟人家說是我故意放在那裡的嗎？」", affection: 2 },
        { text: "「我現在終於覺得自己沒那麼笨了。」", response: "「妳不要因為我犯錯就突然對自己產生自信。」", affection: 2 },
      ]),
        springDailySmsRound("「說起來，我覺得妳應該買個零錢包。不然哪天不是掉一塊錢，是整袋都掉了。」", [
        { text: "「我有零錢包啊！」", response: "「那它今天是放假了是不是？」", affection: 2 },
        { text: "「我只是今天忘記帶啦！」", response: "「喔，原來是零錢包跟主人分居了。」", affection: 2 },
        { text: "「你真的很會講欸！」", response: "「謝謝，我也覺得自己滿有天分的。」", affection: 2 },
      ]),
        springDailySmsRound("「好了，今天就到這裡。我看妳還是先把飲料喝完吧，免得又發生什麼意外。」", [
        { text: "「你能不能說點好聽的！」", response: "「飲料很好喝，妳今天也很努力，滿意了嗎？」", affection: 2 },
        { text: "「我覺得你欠我一杯飲料賠罪。」", response: "「蛤？我連現場都沒去，怎麼就欠錢了？」", affection: 2 },
        { text: "「因為你嘲笑我！精神損失費！」", response: "「那我是不是也可以跟妳申請被妳煩的補償金？」", affection: 2 },
      ]),
        springDailySmsRound("「我剛剛想了一下，妳那顆滾到櫃檯底下的硬幣，最後有撿到嗎？」", [
        { text: "「有啦！我還趴下去找，差點跟地板親密接觸。」", response: "「妳為了一塊錢付出的努力，我會記住的。」", affection: 2 },
        { text: "「沒有，我決定放它自由了。」", response: "「很大方嘛，硬幣應該會感謝妳的成全。」", affection: 2 },
        { text: "「有！但老闆一直看我，我覺得我像在做壞事。」", response: "「妳只是撿自己的錢，不用那麼心虛吧。」", affection: 2 },
      ]),
      ],
      [
        springDailySmsRound("「我還記得那天回家，脫鞋的時候真的有種重獲自由的感覺。那一刻覺得拖鞋才是人類文明的巔峰。」", [
        { text: "「我現在就是這個感覺！！」", response: "「恭喜妳，終於體驗到拖鞋的偉大。」", affection: 2 },
        { text: "「我想以後都穿拖鞋出門。」", response: "「很好，妳的人生目標越來越樸實了。」", affection: 2 },
        { text: "「你不要再笑我了啦！」", response: "「我哪有笑妳，我是在分享我的血淚史。」", affection: 2 },
      ]),
        springDailySmsRound("「不過妳那雙鞋先別急著丟。貼個防磨貼試試看，不行就退掉。不要為了證明自己買得對，硬把腳弄傷。」", [
        { text: "「你居然還有正常的時候？」", response: "「妳這句話很沒有禮貌欸。」", affection: 2 },
        { text: "「知道啦，我回去先貼起來。」", response: "「嗯，不然下次見面妳又要走得像企鵝。」", affection: 2 },
        { text: "「你敢再提企鵝試試看！」", response: "「好喔，企鵝小姐。」", affection: 2 },
      ]),
        springDailySmsRound("「對了，妳下次買鞋記得叫我一起。我可以幫妳判斷一下，至少不會只看外表。」", [
        { text: "「你確定你有這個能力？」", response: "「當然，我的審美比妳穩定多了。」", affection: 2 },
        { text: "「我才不要，你一定會故意挑最醜的給我！」", response: "「被妳發現了。本來還想推薦妳一雙很有特色的。」", affection: 2 },
        { text: "「那你負責買單，我就相信你！」", response: "「妳倒是很會做生意欸，算盤都打到我身上了。」", affection: 2 },
      ]),
        springDailySmsRound("「不過妳那雙鞋如果真的磨得太嚴重，就別硬穿了，漂亮也不能拿來走路。」", [
        { text: "「我知道啦，先讓它冷靜幾天。」", response: "「鞋子需要冷靜，妳也需要休息一下。」", affection: 2 },
        { text: "「你是不是其實很關心我的腳？」", response: "「我是不想下次又聽妳抱怨走不了路，謝謝。」", affection: 2 },
        { text: "「那你下次陪我去買，這次不准只挑好看的。」", response: "「好啊，這次先看合不合腳，妳不要又被外表騙走。」", affection: 2 },
      ]),
      ]
    ],
  },
  stone: {
    openings: [
      springDailySmsRound("「我之前也有過一次，洗完才發現口袋裡有一張收據。結果整張變成紙漿，連買什麼都看不出來。」", [
        { text: "「你是不是根本沒有檢查口袋的習慣！」", response: "「有啦，只是偶爾會忘記。偶爾。」", affection: 2 },
        { text: "「那你還記得自己買了什麼嗎？」", response: "「完全不記得，只記得花了一筆錢。」", affection: 2 },
        { text: "「你應該把它拼起來，說不定可以復原。」", response: "「這個工程有點大，我還是直接放棄好了。」", affection: 2 },
      ]),
      springDailySmsRound("「我以前裝過一個櫃子，說明書翻來翻去，最後發現第一步就裝反了。拆的時候還把自己弄得滿頭汗。」", [
        { text: "「你居然第一步就錯了！」", response: "「對啊，後面做得再認真也沒用。」", affection: 2 },
        { text: "「那你有沒有找人幫忙？」", response: "「沒有，覺得都做到一半了，還是自己拆掉重來。」", affection: 2 },
        { text: "「如果是我，我可能直接坐在地上不動了。」", response: "「我有一瞬間也是這樣想的，真的。」", affection: 2 },
      ]),
      springDailySmsRound("「我以前也會在筆記邊邊亂畫。有時候畫著畫著，一整頁都變成奇怪的圖案。」", [
        { text: "「那你畫得好嗎？拿出來看看！」", response: "「不一定欸，有些現在看起來滿奇怪的。」", affection: 2 },
        { text: "「我覺得上課畫畫真的很容易停不下來。」", response: "「對啊，本來只想畫一個，後來就一直加東西。」", affection: 2 },
        { text: "「我還會給小人取名字！」", response: "「妳這麼認真喔，那他們現在應該已經有自己的故事了。」", affection: 2 },
      ]),
    ],
    tracks: [
      [
        springDailySmsRound("「我後來還發現一張紙卡在褲管裡面。都已經洗完晾乾了，穿的時候才掉出來。」", [
        { text: "「救命，衛生紙還會跟著你回家！」", response: "「對啊，感覺它還滿執著的。」", affection: 2 },
        { text: "「你是不是當場愣住？」", response: "「我看著它掉下來，想說怎麼還有。」", affection: 2 },
        { text: "「我現在覺得洗衣機裡是不是有個衛生紙窩。」", response: "「有可能，應該要定期進去檢查一下。」", affection: 2 },
      ]),
        springDailySmsRound("「不過有個辦法比較快，用膠帶黏。我以前試過，至少不用一直拿手抖。」", [
        { text: "「你怎麼這麼有經驗啦！」", response: "「因為犯過的錯比較多，就會慢慢找到方法。」", affection: 2 },
        { text: "「好，我去拿膠帶，今天跟它拼了！」", response: "「妳先不要太激動，衣服不要一起黏進去。」", affection: 2 },
        { text: "「我感覺我今天一直在做家事。」", response: "「那妳晚上可以休息了，今天的額度用完了。」", affection: 2 },
      ]),
        springDailySmsRound("「處理完記得把口袋翻過來檢查一下。不然下次又要重新下雪了。」", [
        { text: "「我決定以後洗衣服之前先檢查三遍！」", response: "「三遍應該夠了，再多可能會變成強迫症。」", affection: 2 },
        { text: "「你要不要幫我檢查？我怕我漏掉。」", response: "「可以啊，不過妳要先把衣服拿來，我又不能隔空檢查。」", affection: 2 },
        { text: "「算了，我覺得我還是自己努力好了。」", response: "「嗯，這樣比較實際。加油，清潔隊長。」", affection: 2 },
      ]),
        springDailySmsRound("「妳那件黑色衣服現在應該差不多清乾淨了吧？紙屑真的很會黏。」", [
        { text: "「差不多了！我現在看到衛生紙都會有陰影。」", response: "「這個陰影應該會持續到下一次洗衣服。」", affection: 2 },
        { text: "「還有一點點，我決定等它自己掉下來。」", response: "「也可以啦，不過可能要等到下次穿的時候。」", affection: 2 },
        { text: "「我把口袋翻出來了，現在它們都很安全！」", response: "「很好，這樣洗衣機今天就沒有新任務了。」", affection: 2 },
      ]),
      ],
      [
        springDailySmsRound("「而且有些螺絲長得很像，差一點點就裝不進去。我有時候會把它們全部排在桌上，一個一個比。」", [
        { text: "「我也是！我剛剛還拿手機放大說明書。」", response: "「手機放大以後，那個圖還是一樣模糊吧？」", affection: 2 },
        { text: "「對！！我都快把眼睛貼上去了。」", response: "「那妳可能需要的不是放大鏡，是新的說明書。」", affection: 2 },
        { text: "「我覺得家具公司應該派人來幫我裝。」", response: "「那價格可能就不是家具的價格了。」", affection: 2 },
      ]),
        springDailySmsRound("「妳最後有把架子放穩嗎？我之前裝完還特地推了幾下，確認不會晃。」", [
        { text: "「有！現在看起來還挺牢固的。」", response: "「那不錯欸，至少沒有白忙一場。」", affection: 2 },
        { text: "「我不敢推，我怕它直接倒給我看。」", response: "「那妳先放輕一點的東西試試看。」", affection: 2 },
        { text: "「我要把它裝滿書，證明我的實力！」", response: "「先不要急著證明，架子可能還沒準備好。」", affection: 2 },
      ]),
        springDailySmsRound("「我覺得自己裝家具最有成就感的地方，就是最後真的能用。雖然過程有時候滿狼狽的。」", [
        { text: "「對啊！我現在看著它都覺得自己好厲害。」", response: "「那妳可以驕傲一下，畢竟是自己裝的。」", affection: 2 },
        { text: "「下次我要挑戰更難的！」", response: "「先把這次的螺絲收好再說。」", affection: 2 },
        { text: "「你下次可以來幫我，我負責遞工具！」", response: "「可以啊，不過妳不要遞錯工具給我就好。」", affection: 2 },
      ]),
        springDailySmsRound("「那兩顆多出來的螺絲妳先收好，說不定哪天拆開還用得到。」", [
        { text: "「我已經放進抽屜了，還貼了標籤！」", response: "「妳這次很有條理欸，沒有隨手亂放。」", affection: 2 },
        { text: "「我怕我下次找不到，乾脆直接黏在架子下面。」", response: "「這個方法滿特別的，希望妳以後拆的時候記得它們在哪。」", affection: 2 },
        { text: "「要不然你幫我保管？我怕我弄丟。」", response: "「可以啊，不過妳要先把它們裝進袋子，不然我也會搞混。」", affection: 2 },
      ]),
      ],
      [
        springDailySmsRound("「我前幾天還翻到以前寫的一張購物清單。上面寫著牛奶、麵包，還有一個我完全看不懂的東西。」", [
        { text: "「可能是你自己發明的文字！」", response: "「我也覺得，應該只有當時的我看得懂。」", affection: 2 },
        { text: "「你有沒有試著猜一下？」", response: "「猜了半天，最後還是放棄了。」", affection: 2 },
        { text: "「說不定是很重要的東西欸！」", response: "「那我可能錯過了什麼重大採購任務。」", affection: 2 },
      ]),
        springDailySmsRound("「不過整理舊東西真的很容易拖時間。我本來只想整理一下抽屜，最後坐在地上看了半天以前的東西。」", [
        { text: "「我也是！每次整理都變成回憶大會。」", response: "「對啊，東西還沒整理完，時間已經過去了。」", affection: 2 },
        { text: "「我剛剛還翻到以前的照片，救命，好醜。」", response: "「以前的照片多少都會有一點吧，髮型也很有年代感。」", affection: 2 },
        { text: "「你有沒有那種不敢給別人看的照片？」", response: "「有啊，所以我都不太敢隨便翻給別人看。」", affection: 2 },
      ]),
        springDailySmsRound("「那妳那本筆記還留著嗎？我覺得可以先收起來，說不定過幾年再翻會覺得更有意思。」", [
        { text: "「留著啊！裡面還有好多奇怪的塗鴉。」", response: "「那就留著吧，以後看到應該會覺得滿有趣的。」", affection: 2 },
        { text: "「我想把它拿出來繼續畫，反正空白的地方還很多。」", response: "「可以啊，不過妳不要把整本都畫滿了。」", affection: 2 },
        { text: "「不行，我要把它變成我的秘密漫畫本！」", response: "「那我以後是不是可以申請看一下？」", affection: 2 },
      ]),
        springDailySmsRound("「妳那本筆記要是繼續畫下去，說不定真的會變成一本漫畫。」", [
        { text: "「對啊！我還想幫每個小人安排角色。」", response: "「那妳要不要先決定誰是主角？我有點好奇。」", affection: 2 },
        { text: "「不行，畫到最後可能整本都變成亂七八糟的塗鴉。」", response: "「那也沒關係啊，反正是妳自己的筆記。」", affection: 2 },
        { text: "「可以啊！不過你要當第一個讀者。」", response: "「好啊，我可以先看，不過不要叫我寫讀後感喔。」", affection: 2 },
      ]),
      ]
    ],
  },
  yanming: {
    openings: [
      springDailySmsRound("「怎麼不回去問老闆。」", [
        { text: "「我就是覺得回去很丟臉嘛……」", response: "「不會啦，店家一天要遇到幾十個忘東忘西的人。\n妳又不是第一個。」" },
        { text: "「我怕老闆覺得我怎麼連筷子都忘記。」", response: "「不會啦，店家每天都會遇到這種事，妳不用想那麼多。」" },
        { text: "「我真的差點想直接用手吃了。」", response: "「先不要啦，便當是無辜的，還是回去拿一下比較好。」" },
      ]),
      springDailySmsRound("「一次收一隻。」", [
        { text: "「我真的把整桶衣服都翻過了！」", response: "「我以前也找過。\n最後是在褲管裡找到，還以為自己買了一雙新襪子。」" },
        { text: "「我連洗衣籃都翻了，還是沒看到。」", response: "「我那次也是找半天，結果它就卡在褲管裡，完全沒發現。」" },
        { text: "「我看它是跟其他襪子私奔了！」", response: "「這個說法倒是滿合理的，失蹤案又多一件。」" },
      ]),
      springDailySmsRound("「放在口袋裡好好的？」", [
        { text: "「有啊！放在口袋裡好好的。」", response: "「那它比雞蛋還有存在感。」" },
        { text: "「有帶啦，只是我逛到最後完全忘記要看。」", response: "「清單都跟著妳出門了，結果還是沒被派上用場。」" },
        { text: "「我甚至還拿出來看過，然後轉頭就忘了。」", response: "「這個比較厲害欸，清單本人都提醒妳了還是漏掉。」" },
      ]),
    ],
    tracks: [
      [
                springDailySmsRound("", [
        { text: "「你講得好像很有經驗。」", response: "「有啊，我以前拿著便當走到一半，才發現自己根本沒拿湯匙。\n回去拿的時候，老闆還問我是不是又來補考。」" },
        { text: "「你到底去補考幾次啦？」", response: "「沒有很多次啦，只是老闆記性太好，看到我就知道我要幹嘛。」" },
        { text: "「所以你也是站在店門口發呆的人？」", response: "「我沒有站那麼久啦，至少有走回去拿。」" },
      ]),
        springDailySmsRound("", [
        { text: "「哈哈哈哈哈哈哈！」", response: "「所以我包包才放兩雙備用筷子。\n一雙給自己，一雙拿來救人。」" },
        { text: "「你這是有備而來欸。」", response: "「不然每次都要回去補考，很麻煩欸。」" },
        { text: "「那你包包裡還有什麼？」", response: "「一些有的沒的啦，真的要用的時候就會出現。」" },
      ]),
        springDailySmsRound("", [
        { text: "「那我要不要先預約？」", response: "「可以，借一次記一個便當，利息不用算。」" },
        { text: "「我可以直接登記成長期會員嗎？」", response: "「可以啊，會員卡先欠著，便當照算。」" },
        { text: "「那我是不是還要付押金？」", response: "「不用押金啦，記得還我一雙就好。」" },
      ]),
        springDailySmsRound("「好啦，先幫妳留一雙，免得妳下次又忘記。」", [
        { text: "「好啊！那我下次忘記就找你。你不要到時候說備用筷子也忘記帶了喔。」", response: "「應該不會啦。真的忘了的話，我們兩個就一起回去補考。」" },
        { text: "「那你要保證二十四小時都能借喔！」", response: "「妳這個要求有點多欸，我又不是筷子客服。」", affection: 3 },
        { text: "「我覺得你可以開個備用筷子出租店。」", response: "「可以啊，妳先當第一個客人，還有折扣。」", affection: 3 },
      ]),
      ],
      [
                springDailySmsRound("", [
        { text: "「？？？？你怎麼會連這個都搞錯啦！」", response: "「因為那雙襪子本來就長得很普通。\n放在那邊完全沒有存在感。」" },
        { text: "「你是不是找太久，已經不認識自己的襪子了？」", response: "「有可能欸，看久了真的會覺得每一雙都很陌生。」" },
        { text: "「所以你還以為自己多買了一雙喔？」", response: "「對啊，還想說什麼時候買的，後來才發現是失蹤人口。」" },
      ]),
        springDailySmsRound("", [
        { text: "「那你後來怎麼辦？」", response: "「找到就繼續穿啊。\n不然還要幫它辦個失而復得的儀式嗎？」" },
        { text: "「你有沒有考慮幫它拍張紀念照？」", response: "「沒有欸，牠只是襪子，不用搞得這麼隆重吧。」" },
        { text: "「我覺得它值得一個獎狀。」", response: "「可以，獎狀上寫：成功從褲管逃脫。」" },
      ]),
        springDailySmsRound("", [
        { text: "「哈哈哈哈哈哈哈哈！」", response: "「妳那隻先留著吧。\n搞不好哪天它自己回來了。」" },
        { text: "「我已經不抱希望了，可能真的離家出走了。」", response: "「那先把另一隻收好，等它哪天想通了再回來。」" },
        { text: "「我要不要貼個尋襪啟事？」", response: "「可以啊，酬勞寫一包洋芋片，應該有人願意幫忙。」" },
      ]),
        springDailySmsRound("「我覺得先幫它留個位置好了，等另一隻回來。」", [
        { text: "「好啦，那我先幫它留個位置。等它另一半回家！」", response: "「可以啊，幫它留個位置。\n不過妳記得偶爾看一下，別到時候連這隻也找不到了。」" },
        { text: "「那我幫它放在抽屜最顯眼的地方。」", response: "「這樣很好，至少它不會也跟著失蹤。」", affection: 3 },
        { text: "「如果一直找不到，我就幫它找個新搭檔。」", response: "「也可以，襪子應該不會介意重新組隊。」", affection: 3 },
      ]),
      ],
      [
                springDailySmsRound("", [
        { text: "「我本來想回家煎蛋的，現在計畫全亂了。」", response: "「我上次也差不多。\n買了醬油跟蔥，回家才發現忘記買麵。」" },
        { text: "「想做蛋餅啦，現在只能改天了。」", response: "「那就改天再做，材料沒買齊真的很難煮。」" },
        { text: "「本來想煮個簡單的晚餐，結果最重要的東西沒買。」", response: "「這種最麻煩，其他東西都準備好了，就差那一樣。」" },
      ]),
        springDailySmsRound("", [
        { text: "「那你最後吃什麼？」", response: "「一碗蔥花醬油湯。\n差點以為自己在做什麼料理實驗。」" },
        { text: "「你沒有再出去買麵喔？」", response: "「懶得出門了，就先拿家裡有的東西湊一湊。」" },
        { text: "「聽起來好像很有創意，但我不太敢吃。」", response: "「我自己也沒有很想回憶那個味道。」" },
      ]),
        springDailySmsRound("", [
        { text: "「救命哈哈哈哈哈哈！」", response: "「所以妳不要笑我。\n我們兩個應該差不多。」" },
        { text: "「我覺得你應該把食譜記下來。」", response: "「不用了，這種實驗一次就夠了。」" },
        { text: "「你下次煮之前先傳訊息問我好了。」", response: "「好啊，至少有人可以阻止我再做一次。」" },
      ]),
        springDailySmsRound("「下次買東西還是一起去好了，至少可以互相提醒。」", [
        { text: "「那下次你陪我去買東西！」", response: "「可以啊。\n我負責提醒妳拿雞蛋，妳負責提醒我不要再買三瓶醬油。」" },
        { text: "「好啊，我負責看清單，你負責拿東西。」", response: "「這個分工可以，應該不會再有人忘記麵或雞蛋。」", affection: 4 },
        { text: "「那我們兩個最好都不要帶購物清單，靠默契！」", response: "「不行欸，照我們兩個的紀錄，這樣回家可能只剩醬油。」" },
      ]),
      ]
    ],
  },
}

export const getSpringSmsOpeners = (
  character: SpringCharacterId,
  context: SpringDayContext,
): SpringDailySmsOpener[] => {
  void context
  return springDailySmsOpeners[character]
}

export const getSpringSmsRounds = (
  character: SpringCharacterId,
  context: SpringDayContext,
  smsReplies: number[] = [],
  openingChoice: number | null = null,
): SpringSmsRound[] => {
  // The player's opening message selects the topic. The conversation then
  // stays with that thread, but each person can share, tease, or change the angle.
  void context
  const chat = springDailySmsChats[character]
  const selectedTrack = Math.max(0, Math.min(chat.tracks.length - 1, openingChoice ?? smsReplies[0] ?? 0))
  return [chat.openings[selectedTrack], ...chat.tracks[selectedTrack]]
}

