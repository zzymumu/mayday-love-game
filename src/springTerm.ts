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
type SpringDailySmsTrack = [SpringSmsRound, SpringSmsRound, SpringSmsRound, SpringSmsRound]
type SpringDailySmsChat = {
  opening: SpringSmsRound
  tracks: [SpringDailySmsTrack, SpringDailySmsTrack, SpringDailySmsTrack]
}
const springDailySmsRound = (incoming: string, choices: SpringDailySmsChoiceData[]): SpringSmsRound =>
  springSmsRound(incoming, choices.map(({ text, response, affection = 2 }) =>
    springSmsChoice(text, Array.isArray(response) ? response : [response], affection),
  ))

// Five people, five genuinely different ways of chatting.
// The first reply selects one everyday topic; every later prompt stays on that topic,
// so the player's reply always answers the message immediately above it.
const springDailySmsOpeners: Record<SpringCharacterId, { text: string; response: string; affection: number }[]> = {
  wen: [
    { text: '「欸，你現在有空喔？我有件事要跟你講，真的很扯。」', response: '「有啦，剛好停一下。」', affection: 2 },
    { text: '「我剛剛看到一個東西，第一個就想到你，哈哈。」', response: '「蛤？聽起來有鬼喔。」', affection: 2 },
    { text: '「溫尚翊！快點借我一點注意力！」', response: '「有啦有啦，耳朵在，妳不要喊那麼大聲。」', affection: 3 },
  ],
  ashin: [
    { text: '「欸～你現在有空嗎？我有件小事想跟你說。」', response: '「有啊。」', affection: 2 },
    { text: '「我今天遇到一件很好笑的事，忍到現在才想到要跟你講。」', response: '「哈哈，妳這樣講很神祕欸。」', affection: 3 },
    { text: '「你猜我今天做了什麼蠢事？」', response: '「欸？妳先不要賣關子啦。」', affection: 2 },
  ],
  masa: [
    { text: '「瑪莎，我要跟你投訴一件事！」', response: '「喔？投訴單先拿來，我看看。」', affection: 2 },
    { text: '「我今天真的快被一個東西氣死。」', response: '「先別氣，妳說。」', affection: 2 },
    { text: '「欸，我現在需要一個人陪我吐槽。」', response: '「可以啊，今天我心情好，聽妳講。」', affection: 2 },
  ],
  stone: [
    { text: '「石頭，你在嗎？我想跟你講個小插曲。」', response: '「在，我看到了。」', affection: 2 },
    { text: '「我今天碰到一件事，現在想起來還是覺得很好笑。」', response: '「哈哈，聽起來有意思喔。」', affection: 3 },
    { text: '「你現在有空嗎？我想找人聊一下。」', response: '「有空，妳慢慢打。」', affection: 2 },
  ],
  yanming: [
    { text: '「諺明哥，你忙完了嗎？我今天有點事想跟你分享。」', response: '「剛忙完，正好可以喘口氣。」', affection: 2 },
    { text: '「我今天又忘東忘西了，先跟你報告一下。」', response: '「哈哈，妳先講，我猜不到啦。」', affection: 2 },
    { text: '「你現在有空嗎？我有個問題想問你。」', response: '「有，今天不忙。」', affection: 3 },
  ],
}

const springDailySmsChats: Record<SpringCharacterId, SpringDailySmsChat> = {
  wen: {
    opening: springDailySmsRound('「好啦，快講。妳今天又遇到什麼怪事？」', [
      { text: '「欸我踩雷了！新出的草莓奶茶喝起來根本像牙膏，還是草莓味的那種……」', response: '「草莓牙膏？妳這個形容也太狠了吧，聽起來根本不能喝。」' },
      { text: '「我剛看到一隻胖到不行的貓坐在店門口，牠那個臉真的像老闆欸。」', response: '「哈哈，牠是坐在那邊收租是不是？那個店面看起來有牠一半股份喔。」' },
      { text: '「我今天上課差點睡著，老師一轉頭看我，我直接坐得比誰都直！」', response: '「欸，妳那一秒是不是直接醒到可以考試？老師真的很會挑時間看人。」' },
    ]),
    tracks: [
      [
        springDailySmsRound('「妳買哪一家啦？我先記起來，下次看到直接繞路。」', [
          { text: '「就巷口新開那家啊！裝潢弄得超漂亮，我一走進去就覺得不妙了，結果還是點了。」', response: '「妳是被店面騙進去，不是被飲料騙進去喔？欸，這家很會欸。」' },
          { text: '「我還很不死心地加了珍珠欸，結果珍珠也救不了它……」', response: '「連珍珠都救不了，這杯可以直接判出局了啦。」' },
          { text: '「我本來都要點熟的了，看到『新品』兩個字又鬼迷心竅，真的很欠。」', response: '「妳每次看到新品都這樣喔？下次先拍給我看，我幫妳踩煞車啦。」' },
        ]),
        springDailySmsRound('「那妳最後有喝完喔？不要跟我說妳硬灌完了。」', [
          { text: '「喝兩口就放棄了，真的不行。」', response: '「做得好，終於學會不要委屈自己了。」' },
          { text: '「喝完了啊，錢都付了欸。」', response: '「妳是把錢喝回來是不是？不好喝就丟掉啦。」' },
          { text: '「我拿去給朋友喝，結果她也說難喝。」', response: '「哈哈，那就不是妳的問題了，這杯可以正式判死刑。」' },
        ]),
        springDailySmsRound('「妳平常不是有固定愛喝的？怎麼突然跑去冒險。」', [
          { text: '「我平常都喝熟成紅茶啦，今天只是想換口味。」', response: '「那就喝妳熟悉的啊，沒事不要挑戰自己的底線。」' },
          { text: '「看到店門口寫新品上市，我就忍不住了。」', response: '「妳真的很容易被兩個字拐走欸。下次先問清楚再買啦。」' },
          { text: '「我也不知道，可能今天腦袋比較不清醒。」', response: '「這個理由我接受，妳今天腦袋可能真的還沒開機。」' },
        ]),
        springDailySmsRound('「下次要買新品先傳給我看一下，至少幫妳把關。」', [
          { text: '「你又不是飲料評審，憑什麼？」', response: '「我至少不會買草莓牙膏，這點就贏妳了吧。」', affection: 3 },
          { text: '「好啊，那你要負責推薦一杯好喝的。」', response: '「欸，還把工作丟給我喔？好啦，我想一下。」', affection: 3 },
          { text: '「我怕你也踩雷，兩個人一起浪費錢。」', response: '「那就當作一起做市場調查啊，妳怕喔？」', affection: 3 },
        ]),
      ],
      [
        springDailySmsRound('「牠真的坐在店門口顧店喔？有照片嗎？」', [
          { text: '「有啦！牠坐得超像真的在顧店，旁邊還擺一個小碗，太像老闆了吧。」', response: '「哈哈哈哈，配備都齊了，根本正式上班。」' },
          { text: '「我才剛拿出手機欸，牠就把臉轉走，根本故意的吧！」', response: '「牠很有明星架子欸，還挑攝影師喔。」' },
          { text: '「沒拍到啦，我跟牠對看對到忘記自己本來要拍照……」', response: '「妳是去看貓，不是去採訪貓啦。」' },
        ]),
        springDailySmsRound('「那牠有理妳嗎？還是完全把妳當路人？」', [
          { text: '「我蹲下去牠還真的走過來蹭我。」', response: '「喔，牠眼光不錯，知道妳是好人。」' },
          { text: '「完全不理我，還打了個哈欠。」', response: '「哈哈哈，這個比不理人還傷欸。」' },
          { text: '「牠一直盯著我手上的袋子，可能以為有吃的。」', response: '「很現實喔，妳沒有帶罐頭還敢跟牠交朋友。」' },
        ]),
        springDailySmsRound('「妳怎麼每次看到貓都可以停下來那麼久？」', [
          { text: '「因為牠們很可愛啊，我真的忍不住。」', response: '「知道啦，妳看到貓眼睛就會亮起來。」' },
          { text: '「我只是想確認牠是不是店裡養的。」', response: '「嗯，調查得很仔細，差點要幫牠查戶口了。」' },
          { text: '「牠看起來比我還悠閒，我有點羨慕。」', response: '「那妳也去旁邊坐著，說不定老闆會給妳發薪水。」' },
        ]),
        springDailySmsRound('「下次再遇到牠，記得拍張照給我看。我想看看那個店長。」', [
          { text: '「好啊，牠要是還在我就去打卡。」', response: '「打卡？妳不要真的幫牠做員工考勤欸。」' },
          { text: '「你這麼想看，乾脆自己來找牠啊。」', response: '「蛤？妳是在邀我還是在叫我去看貓？……好啦，有機會再去。」', affection: 4 },
          { text: '「我怕牠下次不認得我了。」', response: '「妳想太多啦，牠搞不好每天都在那邊等客人。」' },
        ]),
      ],
      [
        springDailySmsRound('「妳昨天到底幾點睡？不要跟我說又滑手機滑到很晚。」', [
          { text: '「一點多啦……本來真的只想看一集，結果下一集自己跑出來欸。」', response: '「一集變一整晚喔？妳真的很會騙自己。」' },
          { text: '「我在趕報告啦，弄完一看時間，直接傻眼。」', response: '「那就沒辦法啦，不過今天回去早點睡。」' },
          { text: '「才十二點！是你們早八太不人道，跟我有什麼關係！」', response: '「好喔，十二點還嫌早八太早，理由很多欸。」' },
        ]),
        springDailySmsRound('「老師最後有點妳名嗎？我看妳說得好像很驚險。」', [
          { text: '「沒有！但他從我旁邊走過去，我差點把筆捏斷。」', response: '「哈哈，妳也太緊張了吧，演得像在躲警察。」' },
          { text: '「有，他問我上一頁在講什麼，我差點原地消失。」', response: '「蛤？這也太突然了吧，還好老師沒有繼續追問妳。」' },
          { text: '「沒有啦，我後來有認真聽，還記了兩頁筆記。」', response: '「喔？難得欸，今天值得鼓掌一下。」' },
        ]),
        springDailySmsRound('「妳明天還有早課嗎？有的話今晚不要再拖。」', [
          { text: '「有啊，第一節。想到就想請假。」', response: '「不准。鬧鐘設兩個，手機放遠一點。」' },
          { text: '「沒有！明天可以睡到自然醒！」', response: '「那妳今晚可以放心睡，不要又自己找事做。」' },
          { text: '「有，但我打算坐最後一排補眠。」', response: '「妳最好真的只是打算，別被老師抓到。」' },
        ]),
        springDailySmsRound('「好啦，今天先放過妳。回去把鬧鐘設好，聽到沒？」', [
          { text: '「知道啦！你很像我媽欸。」', response: '「誰要當妳媽啦，快去睡。」' },
          { text: '「那你明天要負責叫我起床嗎？」', response: '「蛤？我又不是妳鬧鐘。……妳先設好啦。」', affection: 4 },
          { text: '「我保證今晚不看電視了！」', response: '「這句我先保留，不太相信妳。」' },
        ]),
      ],
    ],
  },
  ashin: {
    opening: springDailySmsRound('「好啦，我坐好了。今天要聽哪一樁？」', [
      { text: '「我剛剛經過麵包店，奶油餐包才剛出爐，香到我直接走不動欸！」', response: '「哈哈，這麼誇張喔？妳是被麵包香定住了吧。」' },
      { text: '「路邊有隻小狗叼著比牠還大的拖鞋，走得一臉理直氣壯，超好笑。」', response: '「哈哈哈，牠是要搬家喔？聽起來很有使命感欸。」' },
      { text: '「早餐店阿姨居然記得我昨天點什麼，我當下整個愣住。」', response: '「欸，連妳點什麼都記得喔？妳是不是突然有種自己變熟客的感覺？」' },
    ]),
    tracks: [
      [
        springDailySmsRound('「妳最後有買嗎？還是只站在門口聞香味？」', [
          { text: '「買了啦！我走到轉角就拆開，燙到舌頭還是捨不得放。」', response: '「欸，妳也太急了吧，麵包又不會長腳跑掉。先吹一下啦。」' },
          { text: '「本來只拿一個，結果菠蘿麵包在旁邊看我，我就又拿了……」', response: '「哈哈，妳那個只買一個的決心，維持不到三十秒喔。」' },
          { text: '「排隊排到我快遲到，只好買豆漿走人，超不甘心。」', response: '「哎唷，聞得到吃不到，這個最折磨人了。」' },
        ]),
        springDailySmsRound('「那妳覺得那家店值得再去嗎？」', [
          { text: '「值得啦！至少餐包是真的好吃，我已經原諒它的排隊人潮了。」', response: '「哈哈，原來好吃真的可以讓人忘記剛剛等多久。」' },
          { text: '「我想再去一次，這次要早點到，不然又要排到天荒地老。」', response: '「這次記得挑人少的時間，不然妳又要站在門口聞香味了。」' },
          { text: '「先不要好了，我今天排到差點想直接回家。」', response: '「好啦，那就先讓它失去妳幾天，等氣消了再說。」' },
        ]),
        springDailySmsRound('「妳是不是很容易被剛出爐的東西拐進去？」', [
          { text: '「對啊！我本來只是路過，結果腳自己走進去了。」', response: '「哈哈，妳這個腳很有自己的想法欸。」' },
          { text: '「才沒有！今天只是剛好很餓，真的只有今天！」', response: '「好好好，我先假裝相信妳。」' },
          { text: '「要看東西啦，如果剛好是我愛吃的，我就投降。」', response: '「這樣比較合理，至少妳還有挑選標準。」' },
        ]),
        springDailySmsRound('「下次再路過那家店，帶我去看看啦，我也想知道到底有多香。」', [
          { text: '「可以啊！但你要負責請我喝飲料，我才有帶路的動力。」', response: '「欸，原來還要附帶條件喔？好啦，妳先把店記好。妳講得我都餓了馁。」', affection: 4 },
          { text: '「好！我先幫你試吃，難吃的就不推薦你。」', response: '「那我是不是還要付妳試吃費？哈哈。」', affection: 3 },
          { text: '「你自己來啦，我怕我推薦完你嫌我品味差。」', response: '「不會啦，我相信妳至少不會推薦草莓牙膏味的。」', affection: 3 },
        ]),
      ],
      [
        springDailySmsRound('「牠叼著走得動嗎？拖鞋有沒有比牠還大？」', [
          { text: '「差不多欸，拖鞋尾巴都拖到地上了，牠還走得超認真。」', response: '「哈哈，牠那個樣子一定很像在搬什麼重要貨物。」' },
          { text: '「牠叼兩步就停下來休息，我差點想幫牠加油。」', response: '「妳真的很投入欸，差點就變成牠的啦啦隊了。」' },
          { text: '「主人在後面叫牠，牠還假裝沒聽到，超跩。」', response: '「哈哈哈，牠可能覺得自己正在執行任務，不能分心。」' },
        ]),
        springDailySmsRound('「主人有追上去嗎？還是就讓牠一路叼著走？」', [
          { text: '「有啊，主人一直叫牠，牠才慢吞吞停下來。」', response: '「牠還要人家三催四請喔，脾氣不小欸。」' },
          { text: '「主人就在旁邊笑，感覺已經習慣牠這樣了。」', response: '「那牠應該是家裡的固定搞笑擔當吧。」' },
          { text: '「我沒看到後來啦，我走掉的時候牠還在努力。」', response: '「好可惜，妳沒看到任務最後有沒有成功。」' },
        ]),
        springDailySmsRound('「妳有沒有拍到？我現在有點想看那隻小狗。」', [
          { text: '「有！可是拍得有點糊，牠一直動啦！」', response: '「沒關係啊，有拍到就好。牠看起來是不是很得意？」' },
          { text: '「沒有欸，我光顧著看牠，手機根本沒拿出來。」', response: '「哈哈，妳看得太認真，攝影師直接下班了。」' },
          { text: '「我有拍到背影，牠的屁股還一扭一扭的。」', response: '「哈哈哈哈，光看背影就知道牠很有自信。」' },
        ]),
        springDailySmsRound('「下次再遇到牠，記得跟我說後續，我想知道牠有沒有成功。」', [
          { text: '「好！我下次看到牠一定先問拖鞋的事。」', response: '「妳不要真的把牠當朋友盤問啦。」', affection: 3 },
          { text: '「如果牠成功了，我要封牠拖鞋搬運冠軍。」', response: '「可以欸，還要頒獎嗎？妳負責主持好了。」' },
          { text: '「我怕牠下次改叼別的，可能要幫牠注意一下。」', response: '「哈哈，妳還替牠安排後續工作喔。」' },
        ]),
      ],
      [
        springDailySmsRound('「她記得妳點什麼？是每天都點一樣的嗎？」', [
          { text: '「我都點蛋餅加豆漿，她連豆漿要少冰都記得，太神了吧！」', response: '「連少冰都記得喔？這已經不是普通熟客待遇了吧。」' },
          { text: '「她記得我不吃香菜，還沒等我開口就先問了。」', response: '「欸，這真的很細心耶，難怪妳會愣住。」' },
          { text: '「她一看到我就問今天還是老樣子嗎，我差點不知道怎麼回。」', response: '「哈哈，妳是不是突然覺得自己在那家店很有名？」' },
        ]),
        springDailySmsRound('「妳當下是不是愣了一下，還回頭看了看？」', [
          { text: '「對啊！我還真的回頭看，想說她是不是在叫別人。」', response: '「哈哈哈，結果真的是叫妳，這個反應也太真實了。」' },
          { text: '「有一點開心啦，突然覺得自己好像被記住了。」', response: '「會啊，尤其是這種沒想到的小事，心情會偷偷變好。」' },
          { text: '「我差點脫口而出：妳怎麼記得我啦！」', response: '「妳真的可以這樣問啊，搞不好阿姨也會很開心。」' },
        ]),
        springDailySmsRound('「後來有跟阿姨聊兩句嗎？還是拿了早餐就跑？」', [
          { text: '「有啦，我還跟她說妳記性也太好了吧！」', response: '「哈哈，她應該會覺得妳很可愛，講話很直接欸。」' },
          { text: '「沒有，我害羞欸，拿了就趕快走了。」', response: '「喔～原來妳也會害羞喔，我還以為妳什麼都敢講。」' },
          { text: '「我只顧著笑，最後連謝謝都講得亂七八糟。」', response: '「沒關係啦，她應該看得出來妳很開心。」' },
        ]),
        springDailySmsRound('「下次換口味也不用不好意思啦，阿姨大概都記得妳了。」', [
          { text: '「那我下次故意點不一樣的，看她會不會認得出來！」', response: '「哈哈，妳不要把早餐店變成記憶力測驗啦。」', affection: 3 },
          { text: '「不行，我怕她問我怎麼突然變心，哈哈哈。」', response: '「連早餐都要專情喔？妳也太好笑了吧。」', affection: 3 },
          { text: '「那下次我帶你去，看她會不會也記得你。」', response: '「欸，這個可以啊。搞不好我還會被妳介紹成固定客人。」', affection: 4 },
        ]),
      ],
    ],
  },
  masa: {
    opening: springDailySmsRound('「來，今天又有誰惹到妳？我先聽聽看。」', [
      { text: '「販賣機把我十塊吃掉了！飲料沒掉，還一副什麼事都沒發生的樣子。」', response: '「哈哈哈哈，妳跟一台機器槓上了喔？它今天是打算不做生意了是不是？」' },
      { text: '「我在佈告欄看到尋物啟事，居然是在找右腳拖鞋，誰會只丟一隻啦！」', response: '「等一下，右腳？左腳是自己先回家了是不是？」' },
      { text: '「我買了一包洋芋片，打開來空氣比薯片還多，真的會氣欸。」', response: '「這根本買包裝送幾片洋芋片，商家真的很會做生意欸。」' },
    ]),
    tracks: [
      [
        springDailySmsRound('「妳投了多少？先說，這是一場小額投資失敗。」', [
          { text: '「十塊！錢不多是一回事，被它吃掉又是另一回事欸！」', response: '「十塊也是錢。尤其是被一台不會道歉的機器吃掉。」' },
          { text: '「二十塊！我還不信邪按了兩次，現在想想我才是笨蛋。」', response: '「妳還追加投資喔？它都不出貨了，妳還相信它。」' },
          { text: '「我投完它還亮了一下欸，我以為有救了，結果根本是在耍我！」', response: '「那個亮一下很像在跟妳說：謝謝惠顧。」' },
        ]),
        springDailySmsRound('「妳有沒有去找管理員？還是就這樣放過它了？」', [
          { text: '「有啊，管理員說會去看，叫我不要再投了。」', response: '「至少有人類願意處理。那台機器今天業績應該不錯。」' },
          { text: '「我拍了機器編號，打算下次經過再去問。」', response: '「做得好，證據先留著。不要跟它單挑。」' },
          { text: '「算了啦，為了十塊跑去找人好像有點丟臉。」', response: '「不丟臉啊，妳是在維護消費者權益，不是在討飯。」', affection: 3 },
        ]),
        springDailySmsRound('「那妳本來想買什麼？不要告訴我最後連飲料都沒喝到。」', [
          { text: '「原本要買汽水，結果現在連瓶蓋都沒看到。」', response: '「這個故事最慘的地方就是，妳連汽水味都沒聞到。」' },
          { text: '「想買咖啡，現在只得到一肚子火。」', response: '「咖啡因沒拿到，怒氣倒是提神了。」' },
          { text: '「本來只是口渴，現在變成很想跟機器吵架。」', response: '「妳先冷靜，它不會回嘴，但可能會再吃妳十塊。」' },
        ]),
        springDailySmsRound('「下次要買飲料，找個會正常出貨的店家吧。」', [
          { text: '「我決定跟那台販賣機絕交。」', response: '「支持，這段關係已經沒有未來了。」' },
          { text: '「我下次經過還是會瞪它一眼。」', response: '「可以，精神上的警告。不要真的踹它。」' },
          { text: '「你陪我去買，我就不跟它計較了。」', response: '「蛤？怎麼最後變成我要負責？……好啦，請妳喝一瓶。」', affection: 4 },
        ]),
      ],
      [
        springDailySmsRound('「右腳拖鞋？這個尋物啟事有沒有寫得很急？」', [
          { text: '「有，還寫著『急尋，左腳已經在家等很久』。」', response: '「哈哈哈哈，左腳還在等？這是拖鞋版苦情戲欸。」' },
          { text: '「下面還留了電話，我差點想打去問是不是認真的。」', response: '「妳打去問的話，對方可能真的會跟妳講拖鞋的身世。」' },
          { text: '「我最想知道的是，為什麼只丟一隻，不是整雙。」', response: '「可能另一隻逃家成功了，剩下這隻在等救援。」' },
        ]),
        springDailySmsRound('「妳有沒有看一下附近？搞不好那隻拖鞋就在公告旁邊。」', [
          { text: '「我真的找了一圈，結果只看到一雙球鞋。」', response: '「調查沒有進展，但妳已經很盡責了。」' },
          { text: '「沒有啦，我怕被路過的人以為我在找垃圾。」', response: '「妳蹲在地上找拖鞋的樣子確實滿可疑的。」' },
          { text: '「我覺得它可能已經跟左腳分手了。」', response: '「感情的事我們外人不要介入，尊重拖鞋的選擇。」' },
        ]),
        springDailySmsRound('「妳是不是還站在那邊看了很久？我猜你有。」', [
          { text: '「有啊，我還想像了一下失主發現少一隻的表情。」', response: '「妳已經幫失主寫好內心戲了是不是？」' },
          { text: '「沒有，我看完就走了，我又不是拖鞋偵探。」', response: '「可惜，這個職業感覺很有發展空間。」' },
          { text: '「我拍下來了，想說這麼荒謬一定要分享給你。」', response: '「收到，今天最有價值的情報就是這張拖鞋公告。」', affection: 3 },
        ]),
        springDailySmsRound('「好啦，希望那雙拖鞋早日團圓，別再讓佈告欄出現續集。」', [
          { text: '「如果找到左腳，我一定回去看公告有沒有更新。」', response: '「妳真的很投入欸，追連載追到拖鞋身上。」' },
          { text: '「我覺得可以直接幫它們辦一場相親。」', response: '「妳先把主持人的工作搶走了是不是？」' },
          { text: '「下次看到更奇怪的公告，我再來報告。」', response: '「好，我的荒謬事件專線隨時為妳服務。」' },
        ]),
      ],
      [
        springDailySmsRound('「妳打開的時候有沒有先愣住？那個空氣比例很誇張嗎？」', [
          { text: '「超誇張！我還以為自己買到家庭號，結果底下薄薄一層。」', response: '「包裝做得很有氣勢，內容物很有自知之明。」' },
          { text: '「我搖了半天，聽起來很滿，打開才知道是空氣在開派對。」', response: '「空氣派對還不收妳門票，算它有良心。」' },
          { text: '「我拿去跟同學比，大家的都差不多，原來不是我倒楣。」', response: '「很好，集體受害就有研究價值了。」' },
        ]),
        springDailySmsRound('「那妳有沒有秤一下？我想知道它到底有沒有偷工減料。」', [
          { text: '「沒有秤啦，我只知道吃三口就見底了。」', response: '「三口？那不是零食，是試吃包吧。」' },
          { text: '「我看包裝寫重量有符合，可能只是袋子太大。」', response: '「所以是視覺詐欺，法律上可能抓不到它。」' },
          { text: '「我同學說這樣比較好，吃完不會有罪惡感。」', response: '「妳同學很會安慰自己，商家應該請她當公關。」' },
        ]),
        springDailySmsRound('「妳最後有吃完嗎？還是連那幾片都不想留給它面子？」', [
          { text: '「吃完了啊，雖然很少，但味道還可以。」', response: '「至少它有把工作做好一半，味道有過關。」' },
          { text: '「分給同學了，大家一人一片就沒了。」', response: '「這包零食最成功的地方是促進同學感情。」' },
          { text: '「我邊吃邊罵，吃完才發現自己很沒出息。」', response: '「嘴巴罵它，手倒是很誠實。」' },
        ]),
        springDailySmsRound('「下次買之前記得看一下包裝大小，不要再被空氣騙了。」', [
          { text: '「我現在看到大包裝都會先懷疑它。」', response: '「很好，消費者教育成功一例。」' },
          { text: '「不然你幫我挑，保證不會買到空氣吧？」', response: '「我可以幫妳看，但不保證妳不會挑到更奇怪的。」', affection: 3 },
          { text: '「算了啦，至少今天有笑到。」', response: '「這倒是真的，妳今天的娛樂費花得滿值得。」' },
        ]),
      ],
    ],
  },
  stone: {
    opening: springDailySmsRound('「今天怎麼啦？妳這個開場聽起來像有故事喔。」', [
      { text: '「我出門忘記帶傘，走到一半突然下雨，旁邊的阿姨居然借我一把！」', response: '「幸好遇到好心人，不然妳今天真的要淋回去了。」' },
      { text: '「我在二手書裡翻到一張便條，居然寫著『這一頁很好看』，也太可愛了吧。」', response: '「欸，像是前一個讀者偷偷留給下一個人的小暗號耶。」' },
      { text: '「我搭公車看風景看到坐過站，回神才發現已經多坐兩站了……」', response: '「哈哈，妳是不是看得太入迷，連廣播都沒聽到？」' },
    ]),
    tracks: [
      [
        springDailySmsRound('「那位阿姨借妳傘之後，妳有把傘還給她嗎？」', [
          { text: '「有啊！她就在前面一站下車，我差點拿著傘追到站務員那邊去。」', response: '「還好有遇到她，不然妳可能會一路擔心傘的事。」' },
          { text: '「她說不用還啦，叫我下次也幫幫別人，怎麼突然變得好像在傳接力棒。」', response: '「這句話好溫柔喔。感覺她把一點善意傳給妳了。」', affection: 3 },
          { text: '「我有問她住哪，想說洗乾淨再送回去，結果她一直叫我不用啦。」', response: '「妳很仔細耶，對方應該也會覺得很暖心。」' },
        ]),
        springDailySmsRound('「妳當時是不是有點不好意思？突然被陌生人幫忙，會不知道怎麼反應。」', [
          { text: '「對啊，我一直說謝謝，講到自己都覺得有點結巴。」', response: '「哈哈，沒關係啦，對方應該聽得出來妳是真的感謝。」' },
          { text: '「我本來想拒絕，結果雨越下越大，只好接受了。」', response: '「有時候接受別人的好意也很好，不用什麼都自己撐著。」', affection: 3 },
          { text: '「我回頭看了好幾次，想說一定要記得還她。」', response: '「妳有放在心上就好，不用一直責怪自己。」' },
        ]),
        springDailySmsRound('「這種下雨天的小插曲，反而會讓人記很久。」', [
          { text: '「真的！我本來覺得今天很倒楣，後來心情突然變好了。」', response: '「嗯，有時候一天的感覺真的會被一個小小的善意改變。」', affection: 3 },
          { text: '「我以後包包裡要放一把備用傘，免得再麻煩別人。」', response: '「這樣也好。不過今天那位阿姨應該不覺得妳是麻煩。」' },
          { text: '「我希望她下次出門也剛好遇到好天氣。」', response: '「妳這樣想很可愛，希望她也有個好心情。」' },
        ]),
        springDailySmsRound('「下次如果妳有多帶傘，也可以把這份好意傳下去。」', [
          { text: '「好啊，說不定我也能當一次救星。」', response: '「一定可以的。記得先問對方需不需要，別把傘塞給人家。」' },
          { text: '「我會記得今天這件事的。」', response: '「那就很好了，今天也算遇到一件值得記住的事。」', affection: 3 },
          { text: '「可是我希望下次不要下雨，大家都不用淋濕。」', response: '「哈哈，這個願望最實際。希望接下來都是晴天。」' },
        ]),
      ],
      [
        springDailySmsRound('「妳有看那張便條是哪一頁嗎？還是剛好翻開就看到了？」', [
          { text: '「剛好翻到那頁欸，旁邊還畫了一顆小星星，太可愛了吧。」', response: '「那個人一定很喜歡那一段，才會特地留下記號。」' },
          { text: '「在書中間，字小小的，像怕被人發現一樣。」', response: '「像是留給下一個讀到的人一個小秘密。」' },
          { text: '「我本來想拿掉，後來又覺得算了，留給下一個人看到好了。」', response: '「我也會想留下來，說不定下一個人看到也會覺得開心。」' },
        ]),
        springDailySmsRound('「妳有沒有翻那一頁看看？說不定真的很好看。」', [
          { text: '「有啊，結果我站在書店裡看了好幾頁。」', response: '「哈哈，這樣就被那張便條成功推坑了。」' },
          { text: '「還沒，我想買回家慢慢看。」', response: '「那就留到回家再看，感覺會多一點期待。」' },
          { text: '「有看一點，雖然還不知道前面在講什麼。」', response: '「先讀到有感覺的地方也不錯，之後再補前面。」' },
        ]),
        springDailySmsRound('「妳覺得那張便條是寫給誰的？下一個讀者，還是寫給自己？」', [
          { text: '「我覺得是給下一個人吧，像是偷偷推薦。」', response: '「我也覺得。很像隔著時間跟陌生人打了一聲招呼。」', affection: 3 },
          { text: '「可能是寫給自己，怕以後忘記這一頁。」', response: '「也有可能。喜歡的東西，有時候真的會想留個記號。」' },
          { text: '「不知道欸，反正我看到的時候有被安慰到。」', response: '「那就夠了。它原本是寫給誰的，好像也沒那麼重要。」', affection: 3 },
        ]),
        springDailySmsRound('「如果妳真的買了那本書，看完再跟我說好不好看。」', [
          { text: '「好啊，如果很好看我也推薦給你。」', response: '「好，那我等妳的讀後感。」', affection: 3 },
          { text: '「如果不好看，我就要回去找那張便條算帳。」', response: '「哈哈，那張便條的作者可能已經搬家了。」' },
          { text: '「我希望裡面還有別人留下的小紙條。」', response: '「那就像在讀一本書，也在讀很多人的小秘密。」', affection: 3 },
        ]),
      ],
      [
        springDailySmsRound('「妳坐過站之後怎麼辦？有馬上下車再搭回來嗎？」', [
          { text: '「有啊，我下車跑去對面等下一班，還好沒等太久，不然我真的要哭。」', response: '「那還好，至少沒有耽誤太多時間。」' },
          { text: '「我想說都坐過頭了，乾脆坐到終點看看會到哪裡，哈哈。」', response: '「哈哈，這個處理方式滿隨性的，還好妳當時不趕時間。」' },
          { text: '「下車才發現我根本不知道自己在哪欸，只好先找站牌，再拿地圖救命。」', response: '「那一下應該有點慌，還好妳先停下來確認方向。」' },
        ]),
        springDailySmsRound('「最後有順利回到原本要去的地方嗎？」', [
          { text: '「有啦，等下一班回去就好了。」', response: '「那就好，至少沒有讓這趟小插曲耽誤太久。」' },
          { text: '「有啊，坐到終點站反而看到平常不會經過的街。」', response: '「這樣也算意外多看了一段路，還滿特別的。」' },
          { text: '「有，查完地圖才發現其實不遠，走一小段就到了。」', response: '「還好距離不遠，妳處理得滿穩的。」' },
        ]),
        springDailySmsRound('「後來想想，這趟小繞路讓妳覺得有趣，還是只覺得麻煩？」', [
          { text: '「有欸，平常都急著回家，反而看到沒注意過的地方。」', response: '「嗯，偶爾慢一點，真的會看到平常忽略的東西。」', affection: 3 },
          { text: '「還是希望下次不要坐過站，太浪費時間了。」', response: '「哈哈，也對，不能每次都靠意外增加行程。」' },
          { text: '「如果有人陪我一起坐過站，好像就不會那麼慌。」', response: '「有人一起的話，確實會安心一點。」', affection: 3 },
        ]),
        springDailySmsRound('「下次搭車記得看一下站牌，不過也不用一直趕。」', [
          { text: '「知道啦，我下次會乖乖下車。」', response: '「哈哈，好，記得就好。」' },
          { text: '「那你下次坐公車要負責提醒我！」', response: '「可以啊，妳負責看風景，我負責看站牌。」', affection: 4 },
          { text: '「我決定把今天當成免費的小旅行。」', response: '「這個說法不錯，至少沒有白白坐過去。」' },
        ]),
      ],
    ],
  },
  yanming: {
    opening: springDailySmsRound('「今天有什麼新鮮事？沒有也沒關係，想聊天就說。」', [
      { text: '「我買便當回來才發現沒拿筷子，站在店門口跟自己大眼瞪小眼。」', response: '「妳這個是買了飯，偏偏忘了最重要的工具喔。」' },
      { text: '「我洗完衣服發現襪子只剩一隻，另一隻到底跟誰私奔了？」', response: '「洗衣機又藏東西了喔，妳先別急著判它失蹤。」' },
      { text: '「我明明寫了清單，結果買了一堆，最重要的雞蛋還是忘了！」', response: '「妳這張清單是不是只負責陪妳出門，完全沒負責工作？」' },
    ]),
    tracks: [
      [
        springDailySmsRound('「妳後來有回去拿筷子嗎？還是找到別的辦法了？」', [
          { text: '「有啦，我又走回去拿，老闆看到我還笑，真的很丟臉欸。」', response: '「哈哈，至少老闆記得妳了。下次拿便當先確認一下。」' },
          { text: '「我跟隔壁同學借了一雙，差點以為今天要用手吃飯了。」', response: '「那還好有同學在。出門前可以順手放一雙免洗筷在包包裡。」' },
          { text: '「我在門口糾結超久，最後還是默默走回去拿，根本白站五分鐘。」', response: '「這個決定是對的，不用為了省一步路讓自己吃得很辛苦。」' },
        ]),
        springDailySmsRound('「妳是不是常常買完東西才發現少拿了什麼？」', [
          { text: '「有時候欸，尤其肚子餓的時候，腦袋只想著快點吃。」', response: '「那就先把要拿的東西想好，結帳前看一下桌面。」' },
          { text: '「我平常很少忘記，今天可能真的太餓了。」', response: '「那今天就算特例。先吃飯，別餓著。」' },
          { text: '「我每次都覺得自己記得，結果每次都會漏一樣。」', response: '「那就寫在紙上，不要太相信記性。大家都一樣。」' },
        ]),
        springDailySmsRound('「便當有吃飽嗎？有沒有因為這件事耽誤到？」', [
          { text: '「有啦，拿到筷子之後吃得很快，差點噎到。」', response: '「慢慢吃，不用跟時間比賽。吃太快反而不舒服。」' },
          { text: '「有吃飽，今天的配菜還不錯，算是有補償到我。」', response: '「那就好，至少便當沒有讓妳失望。」' },
          { text: '「本來有點煩，後來覺得很好笑，就沒事了。」', response: '「有時候小麻煩過去就好，別放在心上。」' },
        ]),
        springDailySmsRound('「下次出門前把筷子也列進清單，應該就不會再忘了。」', [
          { text: '「好，我要寫一張超完整的便當清單！」', response: '「不用寫到那麼複雜，記得筷子就好。」' },
          { text: '「你講得好像我很不可靠一樣。」', response: '「沒有啦，只是多準備一下比較方便。」', affection: 3 },
          { text: '「那下次你提醒我，我請你吃便當。」', response: '「好啊，不過妳先把自己的筷子帶好。」', affection: 3 },
        ]),
      ],
      [
        springDailySmsRound('「妳有找過洗衣機裡面嗎？有時候會黏在桶邊。」', [
          { text: '「找了啦！衣服整桶倒出來，真的只有一隻，我快懷疑人生了。」', response: '「那可能是卡在衣服裡了，再檢查一下褲管和袖子。」' },
          { text: '「洗衣籃也翻了，房間都快被我翻過來，還是沒有。」', response: '「那就先把這隻收好，等另一隻哪天自己出現。」' },
          { text: '「我看它是跟其他襪子私奔了，留下我一個人收拾爛攤子。」', response: '「哈哈，這個說法倒是很合理，襪子失蹤案又多一件。」' },
        ]),
        springDailySmsRound('「妳平常洗衣服會把襪子分開放嗎？還是整桶一起丟？」', [
          { text: '「我都整桶丟，難道還要幫襪子安排座位喔？」', response: '「不用安排座位，放進洗衣袋就好，比較不容易散掉。」' },
          { text: '「我有用洗衣袋，可是今天不知道為什麼少一隻。」', response: '「那可能真的卡在哪裡了，等晾衣服時再仔細看一次。」' },
          { text: '「我都是一雙一雙放，結果還是會不見。」', response: '「那就真的很奇怪了，洗衣機可能有自己的收藏癖。」' },
        ]),
        springDailySmsRound('「妳現在只剩一隻襪子，要怎麼辦？」', [
          { text: '「先收起來，等哪天另一隻回家。」', response: '「好，先不要急著丟，說不定會找到。」' },
          { text: '「我拿另一雙來配，今天就先不管它了。」', response: '「這樣最實際，不用為了一隻襪子耽誤時間。」' },
          { text: '「我想把它貼在牆上，提醒自己襪子要成雙成對。」', response: '「哈哈，妳的提醒方式很有創意。」' },
        ]),
        springDailySmsRound('「下次洗衣服記得用洗衣袋，至少可以少一點失蹤人口。」', [
          { text: '「好啦，我會試試看，不然襪子快不夠穿了。」', response: '「嗯，先試一陣子看看。」' },
          { text: '「你是不是也有襪子失蹤的經驗？」', response: '「有啊，找不到的時候就會懷疑是不是自己記錯了。」', affection: 3 },
          { text: '「如果找到另一隻，我第一時間通知你。」', response: '「好，我等這件案子結案。」', affection: 3 },
        ]),
      ],
      [
        springDailySmsRound('「妳買東西的時候有照著清單看嗎？還是想到什麼就拿什麼？」', [
          { text: '「有看啦！但我一看到別的東西就忘記自己在找雞蛋了。」', response: '「那就把最重要的寫在最上面，先拿完再逛其他的。」' },
          { text: '「我把清單塞口袋，逛完才想起來它根本沒出場過。」', response: '「那下次拿在手上，或者買一樣勾一樣。」' },
          { text: '「七樣都記得，偏偏漏掉雞蛋，我到底在幹嘛啦。」', response: '「這就是為什麼要寫下來，不要只靠記憶。」' },
        ]),
        springDailySmsRound('「那妳現在還需要雞蛋嗎？今天一定要買到嗎？」', [
          { text: '「要啊，我本來想煮蛋，現在計畫全亂了。」', response: '「那就再去一趟，順便把其他東西先收好。」' },
          { text: '「不急，明天再買也可以。」', response: '「那就明天再去，不用為了一樣東西跑兩趟。」' },
          { text: '「我本來想做早餐，現在只能改吃吐司了。」', response: '「吐司也可以，先把今天的晚餐安排好。」' },
        ]),
        springDailySmsRound('「妳是不是一進商店就容易被其他東西吸引？」', [
          { text: '「對啊，尤其看到特價就會停下來看。」', response: '「特價不一定真的需要，先想好要買什麼比較不容易多花錢。」' },
          { text: '「沒有啦，今天只是剛好遇到想買的東西。」', response: '「那就好，偶爾買點喜歡的也沒關係。」' },
          { text: '「我覺得商店的東西都在跟我招手。」', response: '「哈哈，那妳要練習只跟清單上的東西打招呼。」' },
        ]),
        springDailySmsRound('「下次先買清單上最重要的，再慢慢看其他東西。」', [
          { text: '「收到！雞蛋下次一定排第一名。」', response: '「很好，這次總算有記住了。」' },
          { text: '「那你陪我去，我負責挑，你負責看清單。」', response: '「可以啊，這樣分工應該不會漏掉。」', affection: 4 },
          { text: '「我現在就把雞蛋寫在手背上，絕對忘不了。」', response: '「不用寫在手上，寫紙上就好，洗手會不見。」' },
        ]),
      ],
    ],
  },
}

export const getSpringSmsOpeners = (
  character: SpringCharacterId,
  context: SpringDayContext,
): { text: string; response: string; affection: number }[] => {
  void context
  return springDailySmsOpeners[character]
}

export const getSpringSmsRounds = (
  character: SpringCharacterId,
  context: SpringDayContext,
  smsReplies: number[] = [],
  openingChoice: number | null = null,
): SpringSmsRound[] => {
  // The first selected reply chooses one of three topics. All later rounds
  // stay on that topic, with every option written for the incoming message.
  void context
  void openingChoice
  const chat = springDailySmsChats[character]
  const selectedTrack = Math.max(0, Math.min(2, smsReplies[0] ?? 0)) as 0 | 1 | 2
  return [chat.opening, ...chat.tracks[selectedTrack]]
}

