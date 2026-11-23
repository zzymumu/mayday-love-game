export type NextMonthCharacterId = 'wen' | 'masa' | 'ashin' | 'stone' | 'yanming'
export type NextMonthStoryBlock = { kind: 'narration' | 'dialogue' | 'aside'; text: string; speaker?: string }
export type NextMonthChoice = { text: string; response: string[]; affection: number }
export type NextMonthRound = { scene?: string; prompt: string; choices: NextMonthChoice[] }
export type NextMonthInviteReplyChoice = NextMonthChoice & { accepted: boolean }
export type NextMonthInviteRoute = {
  title: string
  location: string
  invitation: NextMonthStoryBlock[]
  teasePrompt?: string
  teaseChoices?: NextMonthChoice[]
  replyPrompt: string
  replyChoices: NextMonthInviteReplyChoice[]
  activity: NextMonthStoryBlock[]
  rounds: NextMonthRound[]
  ending: NextMonthStoryBlock[]
}
export type NextMonthOpenDayRoute = {
  label: string
  subtitle: string
  location: string
  title: string
  kicker: string
  blocks: NextMonthStoryBlock[]
  rounds: NextMonthRound[]
  ending: NextMonthStoryBlock[]
}
export type NextMonthChatChoice = NextMonthChoice & { nextIncoming?: string }
export type NextMonthChatRound = { incoming: string; choices: NextMonthChatChoice[] }
export type NextMonthChatOpening = { text: string; response: string; affection: number }
export type NextMonthDiaryData = {
  title: string
  eventSummary: string
  chatSummary: string
  ending: string
  eventCharacter: NextMonthCharacterId
  chatCharacter: NextMonthCharacterId
}

export const NEXT_MONTH_INVITE_THRESHOLD = 20

export const nextMonthIntroBlocks: NextMonthStoryBlock[] = [
  { kind: 'narration', text: '又過了一個月。十二月的天氣比前陣子涼了一些，早上出門時，你開始會記得多帶一件外套。課堂上的報告一份接著一份，偶爾還是會收到練團室那群人的訊息；有時只是問你吃了沒，有時是瑪莎丟來一句不知道在抱怨什麼的話。' },
  { kind: 'narration', text: '這個星期，台大的校園開放日終於到了。校園裡比平常熱鬧得多，社團攤位、學生作品展和小型表演都排在同一天。溫尚翊前幾天就傳訊息來，說椰風搖滾社也有攤位，問你願不願意來幫忙。' },
  { kind: 'narration', text: '你本來想說只是去幫忙一個上午，沒想到昨晚又收到幾則訊息。有人問你週末有沒有空，有人說最近想找你出去走走。你看著手機想了一會兒，決定先把今天的事過好再說。' },
]

export const nextMonthInviteRoutes: Record<NextMonthCharacterId, NextMonthInviteRoute> = {
  wen: {
    title: '多買的兩張電影票',
    location: '台北・電影院',
    invitation: [
      { kind: 'dialogue', speaker: '溫尚翊', text: '欸，妳這禮拜六有空嗎？' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '我這邊多兩張電影票，放著也是浪費，妳要不要一起去看？' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '如果妳有空啦。' },
    ],
    teasePrompt: '你想怎麼回他？',
    replyPrompt: '所以，妳到底要不要跟我去啦？',
    replyChoices: [
      { text: '好啊！電影幾點開始？', response: ['晚上七點啦，我們可以先去吃點東西。', '那就這樣說定喔。'], affection: 3, accepted: true },
      { text: '可以啊，不過電影不好看我可是會抱怨的喔。', response: ['蛤？妳要求很多欸。', '好啦，票都買了，妳就來看啦。'], affection: 3, accepted: true },
      { text: '這週六可能不行欸，下次再約我好不好？', response: ['喔，好啊，沒關係啦。', '妳有空再跟我說就好。'], affection: 0, accepted: false },
    ],
    teaseChoices: [
      { text: '買多了？你原本是約誰啊？', response: ['蛤？沒有約誰啦！', '就剛好買多了，妳問題很多欸。'], affection: 3 },
      { text: '兩張？那你怎麼不找別人去？', response: ['我就問妳啊，不然咧？'], affection: 2 },
      { text: '你該不會是特地買給我的吧？', response: ['……妳不要自己亂想。', '我只是看到場次不錯，順手買的啦。'], affection: 3 },
    ],
    rounds: [
      { scene: '電影院大廳裡人來人往，溫尚翊把那桶已經買好的爆米花抱在手上，往飲料櫃檯看了一眼，轉頭問你。', prompt: '妳要喝什麼？我去排。', choices: [
        { text: '可樂！看電影一定要配可樂啊。', response: ['知道了啦，妳先站這邊等。', '不要亂跑喔，我一下就回來。'], affection: 3 },
        { text: '你喝什麼我就跟著買。', response: ['妳都不先問喔？', '我喝紅茶啦，那就幫妳也買一杯。'], affection: 2 },
        { text: '我想喝紅茶就好，不用買太多。', response: ['好啊，那我去排。', '爆米花已經夠多了，等一下吃不完又要怪我。'], affection: 1 },
      ] },
      { scene: '電影開始後，影廳裡慢慢安靜下來。中間有一段反轉，你忍不住轉頭看他，發現他也正好看過來。', prompt: '剛剛那個轉折，妳覺得怎樣？', choices: [
        { text: '我覺得前面有埋伏筆欸，你有發現嗎？', response: ['有啊，不然我剛剛幹嘛一直看那邊。', '妳還看得滿仔細的嘛。'], affection: 3 },
        { text: '你剛剛是不是偷看我反應？', response: ['蛤？我是在看字幕啦！', '妳不要自己想太多。'], affection: 2 },
        { text: '我承認，中間有一點想睡。', response: ['妳有沒有搞錯？才看到一半欸。', '算了，至少爆米花有吃完。'], affection: 1 },
      ] },
      { scene: '散場時人潮慢慢往出口移動。你們還在爭論結局，溫尚翊忽然指了指隔壁亮著燈的遊樂場。', prompt: '那邊有娃娃機，要不要去玩一下？', choices: [
        { text: '要！我剛剛就看到那隻小熊了。', response: ['妳眼睛也太尖了吧。', '走啦，我看一下哪台比較好夾。'], affection: 3 },
        { text: '可以啊，但你要負責夾到。', response: ['為什麼變成我的工作？', '好啦，妳等一下不要一直在旁邊指揮。'], affection: 2 },
        { text: '你不是說電影票多買的？現在又要花錢。', response: ['看個電影又不會破產。', '妳到底要不要玩啦？'], affection: 1 },
      ] },
      { scene: '娃娃機的爪子晃了兩下，第一次只碰到玩偶的耳朵，第二次乾脆從旁邊滑過去。溫尚翊盯著玻璃看了幾秒，眉頭越皺越緊。你才剛把手伸向搖桿，他就往前一步把位置擋住，還一副不准你碰的樣子。', prompt: '欸，妳不要亂動啦！剛剛只是沒抓準，看我的。', choices: [
        { text: '好啦好啦，你再試一次，我在旁邊看。', response: ['這就對了，站旁邊看就好。', '這次一定中，妳等著。'], affection: 3 },
        { text: '不然換我試一次嘛！', response: ['不用不用，妳不要亂動。', '我都摸清楚這台的角度了，交給我。'], affection: 2 },
        { text: '我覺得這隻根本夾不到欸。', response: ['妳不要烏鴉嘴啦！', '等一下夾到妳就知道了。'], affection: 1 },
      ] },
      { scene: '溫尚翊把最後一枚代幣推進去，這次沒有急著按，反而蹲下來仔細看了看玩偶的位置。他調整好角度，按下搖桿，爪子終於穩穩抓住那隻小熊，晃了兩下後掉進出口。聽見聲音，他立刻抬頭看你，臉上寫著「我就說吧」。', prompt: '怎樣？我就說這次會中吧。拿去啦，妳剛剛不是一直看這隻？', choices: [
        { text: '你剛剛還不准我幫忙，原來是想自己表現喔？', response: ['不然咧？我自己夾到的，當然要自己拿出來啊。', '而且我本來就會，是這台剛剛不配合。'], affection: 3 },
        { text: '好啦好啦，承認你很厲害。', response: ['這還差不多。早就跟妳說站旁邊看就好。', '拿去啦，妳剛剛不是一直盯著它。'], affection: 2 },
        { text: '哼，還不是夾了好幾次。', response: ['欸，妳到底會不會稱讚人？', '反正最後有夾到就好啦，拿去。'], affection: 1 },
      ] },
    ],
    ending: [
      { kind: 'narration', text: '走出遊樂場時，街上的風已經有點涼。你把小玩偶塞進包包，溫尚翊伸手替你把快滑下來的背帶拉回肩上，嘴上還嫌你東西怎麼那麼多。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '到家傳個訊息，知道嗎？不要又走到一半跑去買東西。' },
      { kind: 'narration', text: '他說完就把手插回口袋，裝作只是順口交代。你看著他走遠，忍不住低頭又看了一眼那隻娃娃。' },
    ],
    activity: [
      { kind: 'narration', text: '週六傍晚，你照著溫尚翊傳來的地址找到電影院。他比約定時間早到了十幾分鐘，手裡拿著兩張電影票和一大桶爆米花，時不時往入口看一眼。看見你出現，他很快把視線收回去，裝作只是剛好看到你，嘴角卻忍不住揚了一下。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '來啦？票在我這邊，走吧。爆米花我先買好了，妳要不要再去買飲料？' },
      { kind: 'narration', text: '他把其中一張票遞給你，另一隻手把爆米花往你那邊挪了挪，示意你先拿。明明是他先開口約你，現在卻像是怕被你看出來有多期待，說完就催你一起往影廳走。' },
    ],
  },
  masa: {
    title: '晚上去逛夜市',
    location: '台北・夜市',
    invitation: [
      { kind: 'dialogue', speaker: '蔡昇晏', text: '欸，妳晚上有沒有空？' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '最近有一間夜市多了幾攤吃的，帶妳去看看啊。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '先說好，妳不要每一攤都只看不買，站在那邊選半天。' },
    ],
    replyPrompt: '妳要不要一起去？',
    replyChoices: [
      { text: '好啊！你說的那幾攤我都想吃。', response: ['哈哈，妳先不要期待太高。', '那晚上見，記得不要遲到。'], affection: 3, accepted: true },
      { text: '你是不是想找人陪你吃？', response: ['不然咧，一個人吃很無聊欸。', '所以妳到底來不來？'], affection: 2, accepted: true },
      { text: '今天晚上不行欸，下次再去！', response: ['好啦，那下次再找時間。', '妳不要到時候又說忘記。'], affection: 0, accepted: false },
    ],
    rounds: [
      { scene: '第一排攤位前擠滿了人，炸物的香味一直飄過來。瑪莎拿著菜單，故意把選擇權丟給你。', prompt: '要吃哪個？不要跟我說都可以喔。', choices: [
        { text: '那個炸雞看起來很香！', response: ['好，妳的眼光至少還有救。', '去旁邊等，我來排。'], affection: 3 },
        { text: '你推薦什麼我就吃什麼。', response: ['妳很會欸，連選晚餐都外包。', '好啦，我挑一個不會踩雷的。'], affection: 2 },
        { text: '我想先全部看一遍再決定。', response: ['……我就知道。', '走啦，給妳看，等一下不要說腳酸。'], affection: 1 },
      ] },
      { scene: '你們拿著剛買好的食物往人少一點的地方走。瑪莎咬了一口，立刻皺起眉頭，又不肯承認自己挑錯。', prompt: '怎樣？是不是沒有你說的那麼好吃？', choices: [
        { text: '明明就很好吃，是你嘴巴太挑。', response: ['我哪有挑？我只是有基本標準。', '妳吃妳的，不要管我。'], affection: 3 },
        { text: '還可以啦，下次我帶你去吃更好吃的。', response: ['喔？講得這麼有自信。', '好啊，我倒要看看妳有什麼口袋名單。'], affection: 2 },
        { text: '你那份看起來比較好吃，我們交換。', response: ['妳想得美，自己去買。', '……算了，咬一口就好，不要整份拿走。'], affection: 1 },
      ] },
      { scene: '旁邊有一攤賣甜不辣和關東煮，你們停下來看了好一會兒。瑪莎拿竹籤敲了敲菜單，開始吐槽你的選擇困難。', prompt: '妳到底要哪個？我站到快變招牌了。', choices: [
        { text: '這個、那個，還有那個！', response: ['妳剛剛不是說吃不下？', '好啦，買小份的，免得又剩給我。'], affection: 3 },
        { text: '你幫我選一個啦，我真的選不出來。', response: ['真的是服了妳。', '這個好了，至少我覺得不錯。'], affection: 2 },
        { text: '不買了，我們去下一攤。', response: ['妳每次都這樣，害我站半天。', '走啦，下一攤再讓妳猶豫。'], affection: 1 },
      ] },
      { scene: '夜市中間有個套圈圈的攤位，瑪莎看了一眼獎品，立刻說這種東西根本難不倒他。結果第一個圈就彈到地上。', prompt: '剛剛不是很有把握？要不要再來？', choices: [
        { text: '再一次！我覺得你這次會中。', response: ['妳現在是在安慰我還是在看笑話？', '拿來，我今天一定要套到。'], affection: 3 },
        { text: '換我啦，我可能比你厲害。', response: ['妳先不要講大話。', '來啊，輸的人請飲料。'], affection: 2 },
        { text: '哈哈哈哈，這就是你的技術？', response: ['笑夠了沒？妳來試試看啊。', '等一下中給妳看，不要太早得意。'], affection: 1 },
      ] },
      { scene: '最後你們還是套中了一個小吊飾。瑪莎把它掛在手指上晃了晃，像是在考慮要不要交給你。', prompt: '這個小東西妳要不要？反正我拿回去也沒地方掛。', choices: [
        { text: '要啊！這可是你努力很久的戰利品。', response: ['妳不要把我講得很可憐欸。', '拿去啦，反正是妳先看上的。'], affection: 3 },
        { text: '你留著啊，掛在包包上很好看。', response: ['真的假的？妳今天怎麼突然這麼會講話。', '好啦，那我就勉強收下。'], affection: 2 },
        { text: '不要，除非你再請我吃一攤。', response: ['妳根本是來敲竹槓的吧！', '走啦，最後一攤，吃完就回家。'], affection: 1 },
      ] },
    ],
    ending: [
      { kind: 'narration', text: '離開夜市時，你們手上還拎著最後一袋沒吃完的小點心。瑪莎把袋子塞給你，說自己只是拿一下，結果一路走到路口都沒把它拿回去。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '到家記得說一聲。還有，今天那個套圈圈不算我輸，老闆的圈有問題。' },
      { kind: 'narration', text: '你笑著說好，他立刻回頭叫你不准把這件事講出去。' },
    ],
    activity: [
      { kind: 'narration', text: '夜市入口比你想像中還熱鬧。瑪莎站在招牌旁邊，手裡捏著一張折起來的美食地圖，看到你就把地圖往你面前一攤。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '來啦？先說好，今天不要每一攤都站在那邊想半天。' },
      { kind: 'narration', text: '你才剛說自己沒有，他已經指著第一家攤位叫你跟上。' },
    ],
  },
  stone: {
    title: '河堤邊的星星',
    location: '台北・河堤',
    invitation: [
      { kind: 'dialogue', speaker: '石錦航', text: '最近晚上天氣還不錯。' },
      { kind: 'dialogue', speaker: '石錦航', text: '妳有沒有空？想不想去河堤走走，順便看看星星？' },
      { kind: 'dialogue', speaker: '石錦航', text: '如果太冷的話，我們就早點回來。' },
    ],
    replyPrompt: '妳如果願意，我們可以找個時間去走走。',
    replyChoices: [
      { text: '好啊，聽起來很舒服。', response: ['那我們晚一點再出發，天黑前可以走一段。', '如果冷的話就早點回來。'], affection: 3, accepted: true },
      { text: '你是不是有什麼話想跟我說？', response: ['沒有特別啦，只是想說最近都在忙。', '如果妳願意一起走走，我會很開心。'], affection: 2, accepted: true },
      { text: '今天可能不太方便，下次好嗎？', response: ['好啊，沒關係。', '妳先忙自己的事情，改天再約。'], affection: 0, accepted: false },
    ],
    rounds: [
      { scene: '河堤入口有一間小飲料店，石頭把菜單遞給你，自己已經先點了熱的。', prompt: '妳想喝什麼？今天晚上喝冰的可能會有點冷。', choices: [
        { text: '那我也喝熱的，跟你一樣。', response: ['好，那我幫妳點。', '甜度要一樣嗎？妳可以自己選。'], affection: 3 },
        { text: '我還是想喝冰的啦。', response: ['哈哈，好啊。', '那妳慢慢喝，風大的地方先不要站太久。'], affection: 2 },
        { text: '不用特別買啦，我帶水了。', response: ['沒關係，我剛好想買。', '那這杯我先拿著，等妳想喝再給妳。'], affection: 1 },
      ] },
      { scene: '你們走到一段視野比較開闊的地方，河面被路燈照出細細的光。石頭放慢腳步，讓你走到欄杆旁邊。', prompt: '這邊是不是比剛剛入口那裡安靜很多？', choices: [
        { text: '嗯，感覺可以在這裡待很久。', response: ['我也覺得。', '有時候出來走走，比一直待在室內舒服。'], affection: 3 },
        { text: '你怎麼會找到這個地方？', response: ['之前經過幾次，覺得這裡不錯。', '想說妳可能也會喜歡。'], affection: 2 },
        { text: '我以為你要帶我去看很亮的星星欸。', response: ['哈哈，城市裡可能沒辦法看到很多。', '我們再往前一點，應該會好一些。'], affection: 1 },
      ] },
      { scene: '你們抬頭找了好一會兒，才在城市燈光上方看見幾顆星星。石頭指著其中一顆，沒有急著催你。', prompt: '妳有看到那顆嗎？在那邊。', choices: [
        { text: '看到了！旁邊那顆也有欸。', response: ['真的耶，剛剛被雲擋住了。', '今天能看到這幾顆就很好了。'], affection: 3 },
        { text: '我找不到，你指給我看。', response: ['好，妳看我手指的方向。', '慢慢來，不用急。'], affection: 2 },
        { text: '我比較想看你是不是會認錯星星。', response: ['我哪有那麼不可靠。', '……好啦，如果認錯妳再提醒我。'], affection: 1 },
      ] },
      { scene: '走了一段路後，你們在河堤旁的長椅坐下。腳踏車偶爾從身後經過，鈴聲響一下又遠去。', prompt: '最近課業還好嗎？妳之前說有一份報告卡住了。', choices: [
        { text: '有比較好了，終於找到方向。', response: ['那就好，至少不用一直卡在那裡。', '慢慢做就好，不用一次逼自己完成。'], affection: 3 },
        { text: '還是有點煩，題目怎麼看都不順眼。', response: ['那就先休息一下，換個時間再看。', '有時候離開一下，回來反而比較有想法。'], affection: 2 },
        { text: '你要不要幫我想題目？', response: ['可以陪妳想，但最後還是要妳自己決定。', '不然寫到一半又不是妳想寫的方向。'], affection: 1 },
      ] },
      { scene: '天色完全暗下來，你們準備往回走。石頭把外套遞給你，自己則把空杯子拿去丟。', prompt: '回去的路上要不要走慢一點？還不算太晚。', choices: [
        { text: '好啊，我還想再待一下。', response: ['好，那我們慢慢走。', '妳如果覺得冷就跟我說。'], affection: 3 },
        { text: '今天這樣剛剛好，走回去吧。', response: ['嗯，今天出來走走滿好的。', '下次有空再來也可以。'], affection: 2 },
        { text: '我想快點回去把報告寫完。', response: ['好，那我們走快一點。', '回去記得先吃點東西，不要空著肚子寫。'], affection: 1 },
      ] },
    ],
    ending: [
      { kind: 'narration', text: '回程時石頭走在靠近車道的那一側，遇到台階還會先提醒你一聲。到了路口，他沒有急著走，只等你確認車來了，才揮手跟你道別。' },
      { kind: 'dialogue', speaker: '石錦航', text: '到家跟我說一下，好嗎？今天謝謝妳陪我出來。' },
      { kind: 'narration', text: '你手裡還握著那杯已經不太燙的熱飲，心裡卻覺得暖暖的。' },
    ],
    activity: [
      { kind: 'narration', text: '傍晚的河堤比市區安靜很多。石頭已經在入口等你，手上拿著兩杯熱飲和一件摺好的外套。看見你走近，他先把其中一杯遞過來。' },
      { kind: 'dialogue', speaker: '石錦航', text: '這杯是妳的，先拿著。今天風有點大，等一下可能會冷。' },
      { kind: 'narration', text: '你們沿著河邊慢慢往前走，遠處的車燈在橋面上移動，水面偶爾閃過一點光。' },
    ],
  },
  yanming: {
    title: '練團室臨時幫手',
    location: '台北・練團室',
    invitation: [
      { kind: 'dialogue', speaker: '劉諺明', text: '最近練團室這邊人手有點不夠。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '妳這幾天有沒有空？想拜託妳過來幫忙整理一下東西。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '不會耽誤妳太久，忙完我請妳吃點東西。' },
    ],
    replyPrompt: '妳方便的話，再跟我說一聲就好。',
    replyChoices: [
      { text: '好啊，我可以去幫忙。', response: ['那就麻煩妳了。', '忙完我會請妳吃飯，不會讓妳白忙。'], affection: 3, accepted: true },
      { text: '怎麼突然缺人？你們最近很忙嗎？', response: ['最近場地安排比較多，大家都分身乏術。', '妳有空再來就好，不用勉強。'], affection: 2, accepted: true },
      { text: '今天不太方便欸，下次再找我！', response: ['好，沒問題。', '妳先忙自己的事。'], affection: 0, accepted: false },
    ],
    rounds: [
      { scene: '桌上的導線纏成一團，諺明拿起其中一條，示範怎麼繞才不會折到裡面的線。', prompt: '這樣繞就可以了嗎？我怕等一下又打結。', choices: [
        { text: '我照你剛剛的方法再試一次。', response: ['對，慢慢繞就好，不用拉太緊。', '這樣收起來，下次拿出來也比較方便。'], affection: 3 },
        { text: '你平常都記得這些細節喔？', response: ['習慣了，器材用久了就知道要注意什麼。', '整理好可以省掉很多麻煩。'], affection: 2 },
        { text: '我可以直接把它塞進箱子嗎？', response: ['最好不要，這樣很容易壓壞。', '我再拿一條給妳練習。'], affection: 1 },
      ] },
      { scene: '整理到一半，你在箱子底下找到幾張舊的排練清單，上面還有不同顏色的筆記。諺明接過去看了一眼。', prompt: '這些是之前練團留下來的嗎？', choices: [
        { text: '你們每次練團都記這麼仔細？', response: ['重要的段落會記一下，免得下次又要重來。', '大家的時間不太一樣，寫下來比較好接。'], affection: 3 },
        { text: '這個字是誰寫的？也太潦草了吧。', response: ['這個應該是瑪莎寫的。', '他自己看得懂就好，別人不一定。'], affection: 2 },
        { text: '我可以把這張帶走當紀念嗎？', response: ['可以啊，這些已經整理過了。', '不過妳要收好，不要弄丟。'], affection: 1 },
      ] },
      { scene: '忙了一陣子，諺明把桌上的東西暫時放下，去倒了兩杯水。他把其中一杯放在你手邊。', prompt: '休息一下吧。妳今天還有其他事情要忙嗎？', choices: [
        { text: '本來有報告要寫，不過可以晚點再弄。', response: ['那就先休息幾分鐘，等一下再回去。', '事情可以排順序，不用全部擠在一起。'], affection: 3 },
        { text: '沒有，今天就是特地來幫你。', response: ['謝謝妳特地過來。', '不過也不用把自己的安排都往後放。'], affection: 2 },
        { text: '有啊，所以你要快點把我放走。', response: ['哈哈，好，我們把剩下這一箱整理完。', '不會耽誤妳太久。'], affection: 1 },
      ] },
      { scene: '最後一箱器材也整理好了。諺明對著清單逐項確認，發現有一個轉接頭還沒找到，便和你一起回頭檢查桌子底下。', prompt: '是不是這個？我剛剛看到它掉在椅子旁邊。', choices: [
        { text: '找到了！我是不是很有幫助？', response: ['是，剛好補上最後一項。', '今天真的多虧妳一起整理。'], affection: 3 },
        { text: '我就說東西不會憑空消失吧。', response: ['哈哈，通常只是放到不容易看到的地方。', '下次先確認桌子周圍就好。'], affection: 2 },
        { text: '差點以為要重新買一個了。', response: ['還好找到了，不然又要多一件事。', '先把它放回固定的位置。'], affection: 1 },
      ] },
      { scene: '收拾完已經接近傍晚。諺明把清單收進資料夾，拿起外套，問你要不要一起去附近吃飯。', prompt: '今天辛苦妳了。晚餐想吃什麼？', choices: [
        { text: '你決定吧，我今天只負責吃。', response: ['好，那我選一家走路就到的。', '今天讓妳省點心。'], affection: 3 },
        { text: '簡單吃就好，不要花太多時間。', response: ['好，我知道附近有一家還不錯。', '吃完我再送妳去搭車。'], affection: 2 },
        { text: '我要吃很多，今天搬東西消耗太多體力。', response: ['哈哈，那今天點多一點。', '不過不要吃到不舒服。'], affection: 1 },
      ] },
    ],
    ending: [
      { kind: 'narration', text: '吃完飯後，諺明陪你走到公車站，還把剛才整理好的清單折了一份給你，說如果哪天想看看練團室平常怎麼安排，可以再拿出來看。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '今天真的謝謝妳。回去路上小心，到了再傳個訊息就好。' },
      { kind: 'narration', text: '他一直等到你上車才轉身離開。你低頭看著那張清單，覺得今天好像真的幫上了忙。' },
    ],
    activity: [
      { kind: 'narration', text: '你到練團室時，諺明已經把要整理的器材列成清單，桌上放著幾條導線和一箱待確認的配件。他先幫你把門邊的紙箱挪開，才把清單遞給你。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '今天要麻煩妳了。我們先照清單整理，遇到不確定的東西再一起確認。' },
      { kind: 'narration', text: '練團室裡還留著一點木頭和金屬混在一起的味道，角落的音箱沒有關，指示燈一閃一閃的。' },
    ],
  },
  ashin: {
    title: '一起去唱KTV',
    location: '台北・KTV',
    invitation: [
      { kind: 'dialogue', speaker: '陳信宏', text: '欸，妳最近有沒有空啊？我想問妳一件事喔。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '我最近有點想去唱歌啦，想說妳要不要一起去？' },
      { kind: 'dialogue', speaker: '陳信宏', text: '而且我們也好一陣子沒有一起出去玩了，想說這次可以約妳。' },
    ],
    replyPrompt: '妳有空的話，我們一起去，好不好？',
    replyChoices: [
      { text: '好啊！我也想唱歌了。', response: ['真的喔？那太好了啦。', '妳想唱什麼可以先想一下，我去訂時間喔。'], affection: 3, accepted: true },
      { text: '你想唱歌怎麼不找怪獸他們？', response: ['哈哈，他們最近也忙嘛。', '而且我也想找妳一起唱啦。'], affection: 2, accepted: true },
      { text: '今天可能不行欸，下次我們再約。', response: ['沒關係啦，妳有空再說就好。', '下次再找時間也可以。'], affection: 0, accepted: false },
    ],
    rounds: [
      { scene: '包廂裡的燈光有點暗，點歌本攤在桌上。阿信拿著筆，等你先選歌。', prompt: '妳先點啦，今天第一首想唱什麼？', choices: [
        { text: '我想唱一首最近很喜歡的歌！', response: ['好啊～那我可以跟妳一起唱嗎？', '妳先選，我幫妳找伴奏喔。'], affection: 3 },
        { text: '你先唱一首給我聽嘛。', response: ['欸？突然這樣我會有點不好意思喔。', '好啦，那我先唱一首比較熟的。'], affection: 2 },
        { text: '我還沒想好，我們先點吃的。', response: ['哈哈，好啊，妳慢慢看啦。', '我先點個薯條，不然等一下唱到一半會餓。'], affection: 1 },
      ] },
      { scene: '第一首歌唱完，阿信把麥克風放回桌上，自己先笑了出來。他剛剛有一句進得太早，還被你抓包。', prompt: '剛剛是不是有一句唱太快了？', choices: [
        { text: '有啊！我都還沒唱你就進來了。', response: ['哈哈，對不起啦，我剛剛太急了。', '下一首我會等妳，不搶拍了。'], affection: 3 },
        { text: '還好啦，我覺得滿可愛的。', response: ['真的喔？那我就放心啦。', '妳不要只是安慰我喔。'], affection: 2 },
        { text: '你是不是太久沒來唱歌了？', response: ['有一點欸，最近都在忙別的事情。', '今天剛好可以放鬆一下。'], affection: 1 },
      ] },
      { scene: '服務生送來飲料和小吃。阿信把薯條推到你面前，又翻開點歌本，停在一首你們都聽過的歌。', prompt: '這首妳會唱嗎？要不要一起唱？', choices: [
        { text: '會啊！這首我很熟。', response: ['太好了啦，那我們一起唱～', '副歌妳唱，我來接後面。'], affection: 3 },
        { text: '我會一點點，你不要笑我喔。', response: ['不會啦，唱歌本來就是開心就好。', '我可以小聲一點陪妳唱喔。'], affection: 2 },
        { text: '我想聽你唱完整首。', response: ['好啊，那妳要幫我打分數喔？', '不要太嚴格喔。'], affection: 1 },
      ] },
      { scene: '唱到後面，你們開始亂點歌，還把幾首完全不同風格的歌接在一起。阿信笑到差點按錯下一首。', prompt: '妳是不是故意挑這種歌來整我？', choices: [
        { text: '對啊，想看看你到底會多少首。', response: ['哈哈，妳這樣很像在考試喔。', '好啦，我盡量不要讓妳失望。'], affection: 3 },
        { text: '沒有啦，我只是覺得這首很好笑。', response: ['我也覺得欸，剛剛差點笑到唱不下去。', '下次可以再找一些奇怪的歌來唱。'], affection: 2 },
        { text: '你剛剛唱得太認真，我忍不住想鬧你。', response: ['欸，被妳發現了喔。', '那我下首歌要更認真一點了。'], affection: 1 },
      ] },
      { scene: '時間快到了，阿信把最後一首歌點好，唱完後才慢慢把麥克風放下。他看了看螢幕上的時間，像是還有點捨不得結束。', prompt: '今天玩得開心嗎？下次還想不想來？', choices: [
        { text: '很開心啊！下次換我選歌單。', response: ['好啊～那我就等妳的歌單了。', '希望不要全部都是我不會唱的喔。'], affection: 3 },
        { text: '滿好玩的，尤其是你唱錯那幾次。', response: ['哈哈，妳怎麼還記得啦。', '下次我會努力不要再唱錯。'], affection: 2 },
        { text: '我現在喉嚨有點累了，哈哈。', response: ['那我們今天就唱到這裡。', '回去多喝一點水，喉嚨才不會不舒服。'], affection: 1 },
      ] },
    ],
    ending: [
      { kind: 'narration', text: '離開KTV時，外面已經有點晚了。阿信陪你走到路口，還幫你確認公車的方向。你們剛剛唱的那首歌一直在腦袋裡打轉，走了一小段路還忍不住哼出來。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '今天真的滿開心的欸。妳到家跟我說一下喔，不然我會有點擔心馁。' },
      { kind: 'narration', text: '他笑著跟你揮手，直到你轉過街角，才往另一個方向走。' },
    ],
    activity: [
      { kind: 'narration', text: '你們約在KTV樓下碰面。阿信比約定時間早到了一點，手裡拿著飲料單，看到你時先笑著把單子遞過來。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '妳來啦～我剛剛還在想要不要先點東西，妳有沒有想喝什麼？' },
      { kind: 'narration', text: '進包廂後，他把點歌本推到你面前，自己坐在旁邊翻了好幾頁，像是每一首都想唱，又每一首都還沒決定好。' },
    ],
  },
}

export const nextMonthOpenDayIntroBlocks: NextMonthStoryBlock[] = [
  { kind: 'narration', text: '十二月十四日，星期六。早上八點多，你抱著一疊傳單走進台大。昨晚下過一點雨，活動廣場旁的樹葉還濕著，地上貼了好幾張臨時指標；遠遠就聽見有人試音，音箱偶爾發出一聲刺耳的回授，接著又有人喊「麥克風先關掉啦」。' },
  { kind: 'narration', text: '椰風搖滾社的攤位在廣場靠裡面。溫尚翊蹲在桌子旁邊理電線，膠帶黏在手背上，旁邊那張海報被風吹得一直掀角。他抬頭看見你，先看了眼手錶，又看了看你手上的傳單。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '妳怎麼這麼早？我不是說九點再過來就好。' },
  { kind: 'dialogue', speaker: '你', text: '我怕你又臨時多出一堆事情，先來看看有沒有要幫忙的啊。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '我哪有每次都臨時加工作。那疊先放桌上，等一下幫我把報名表跟傳單分開就好。' },
  { kind: 'narration', text: '你才剛把紙放下，錢佑達就從廣場另一頭跑過來，手裡提著兩大袋早餐，袋子撞在膝蓋上發出沙沙聲。他跑得太急，差點把一杯豆漿甩出去。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '我找到你們了！欸，誰的豆漿？我剛剛差點把它灑在報名表上！' },
  { kind: 'dialogue', speaker: '瑪莎', text: '你先不要碰報名表。你剛剛是不是又走去看別的攤位，才會現在才到？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '我只是停下來看一下熱舞社彩排，誰知道他們跳完一首又一首。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '你是來擺攤還是來追星的？早餐拿來，我先檢查有沒有少。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '欸！你不要趁機偷吃，那袋有一半是我的！' },
  { kind: 'narration', text: '瑪莎嘴上嫌他，手卻很快地把差點倒下的豆漿扶正。兩個人為了誰拿錯了飯糰吵了幾句，最後還是把早餐一份份放到桌邊。你忍不住笑了一聲，瑪莎立刻轉頭看你。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '妳笑什麼？等一下他把整袋吃完，妳就知道我們為什麼要先搶了。' },
  { kind: 'dialogue', speaker: '你', text: '我看你明明也很想吃，還裝得一副在管理秩序的樣子。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '我是在維持社團財產安全，懂不懂？' },
  { kind: 'narration', text: '石頭把幾瓶飲料搬到桌子底下，順手將一張紙箱攤平墊在潮濕的桌腳旁；諺明則從工具袋裡拿出延長線和轉接頭，一邊對清單，一邊確認電源位置。阿信抱著另一疊傳單走過來，把兩種不同顏色的紙分開放在你面前。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '妳來得剛好～這兩疊不要混在一起喔，黃色是活動流程，白色才是社團報名。剛剛有人拿錯，差點把整疊帶走馁。' },
  { kind: 'dialogue', speaker: '你', text: '你們這裡事情也太多了吧，我才剛來就要考分類。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '哈哈，等一下人更多，可能還會有新的考題。先把這關過了就好馁。' },
  { kind: 'narration', text: '你低頭整理紙張，旁邊不時傳來瑪莎和佑達互相指責的聲音。溫尚翊一邊試音，一邊伸手把快被風吹走的報名表壓住；石頭拿膠帶固定桌布，諺明蹲在音箱旁檢查接頭。原本還有點空的廣場，沒多久就被學生和攤位填滿。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '這疊先放我右手邊。等一下有人來問社團，再把白色那張給他。妳忙完就去逛，不用一直站在這裡。' },
  { kind: 'dialogue', speaker: '你', text: '知道啦。你先把那條線弄好，不然等一下又要被瑪莎嫌。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '我聽到了喔！而且我不是嫌，我是在幫他把問題講出來。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '你先管好你那疊貼紙啦。' },
  { kind: 'narration', text: '你把最後一疊傳單放整齊，抬頭時正好看見瑪莎把一張貼紙偷偷貼到佑達背後。佑達還毫無察覺地轉過身問大家要不要吃飯糰。你突然覺得，今天大概不會有太多安靜的時候。' },
]

export const nextMonthOpenDayRoutes: Record<NextMonthCharacterId, NextMonthOpenDayRoute> = {
  wen: {
    label: '溫尚翊', subtitle: '陪社長把海報掛好', location: '台灣大學・椰風搖滾社攤位周邊', title: '差點飛走的社團海報', kicker: '上午・活動廣場',
    blocks: [
      { kind: 'narration', text: '椰風搖滾社攤位前的橫幅被風吹得啪啪作響，最上面的海報有一角已經鬆開。溫尚翊踩在摺疊椅上，一手拉著麻繩，一手還要按住海報，嘴裡不停叫人幫忙。你才剛走近，他就把膠帶往你手裡一塞。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '妳先幫我壓住下面啦，欸，不要往那邊拉，整張要歪掉了。' },
    ],
    rounds: [
      { scene: '你把海報下緣壓住，風卻偏偏在這時候又吹了一陣。紙張整片鼓起來，溫尚翊一邊伸手抓，一邊差點踩空，最後總算把它重新按回牆面。', prompt: '欸，妳那邊到底有沒有壓好？我快抓不住了啦！', choices: [
        { text: '你先站穩啦！海報又不會自己長腳跑掉。', response: ['妳不要在旁邊講風涼話，剛剛差點整張飛走欸。', '好了好了，這次抓到了，妳再壓緊一點。'], affection: 3 },
        { text: '是你拉歪了還怪我！', response: ['我哪有？明明是風一直吹。', '……好啦，等一下我重新貼正。'], affection: 2 },
        { text: '社長，請問有沒有危險加給？', response: ['妳現在還跟我談加給喔？', '等一下請妳喝東西啦，快點幫忙。'], affection: 1 },
      ] },
      { scene: '海報終於掛好。溫尚翊跳下椅子，袖口卻黏著一截透明膠帶，自己完全沒發現。你盯著那一小片看了兩秒，他順著你的視線低頭，才伸手去扯。', prompt: '欸，妳是不是趁我不注意，把膠帶黏我衣服上？', choices: [
        { text: '我哪敢啊，可能是社長自己太忙了。', response: ['最好是。妳剛剛明明一直在笑。', '算了，反正也撕得掉。'], affection: 3 },
        { text: '有一點點啦，當作你剛剛指揮我的精神補償。', response: ['蛤？妳還真的承認喔！', '下次不准亂貼，這件衣服很難洗欸。'], affection: 2 },
        { text: '你先別動，我幫你撕，不然等一下扯到袖子。', response: ['……好啦，妳小心一點。', '這樣有比較乾淨嗎？'], affection: 1 },
      ] },
      { scene: '忙完海報，你們總算離開攤位幾分鐘。路邊有攤紅豆餅剛出爐，甜甜的香味一直飄過來。溫尚翊看你往那邊瞄了好幾次，沒多說什麼，直接走去排隊。', prompt: '妳剛剛一直看那攤，是想吃紅豆餅喔？', choices: [
        { text: '你怎麼知道！我要奶油的！', response: ['知道了啦，妳不要站在隊伍旁邊一直看。', '我買兩個，等一下不要又說吃不完。'], affection: 3 },
        { text: '我只是看看，沒有一定要吃。', response: ['少來，妳剛剛眼睛都黏在招牌上了。', '站著等啦，我順便買。'], affection: 2 },
        { text: '那你請我，我就承認。', response: ['妳很會欸，什麼都要先談條件。', '好啦，今天算妳幫忙的工錢。'], affection: 1 },
      ] },
      { scene: '回程經過小舞台，另一個社團正在試音。吉他手彈到一半停下來調音，溫尚翊也跟著放慢腳步，手指在紙杯上輕輕敲了幾下。你故意站到他面前晃了晃手。', prompt: '妳覺得剛剛那個吉他手怎麼樣？第二段好像有點趕。', choices: [
        { text: '你現在連逛活動都在偷聽別人彈吉他喔？', response: ['我是在聽他音箱有沒有問題好不好。', '而且那段真的有點趕，妳沒聽出來喔？'], affection: 3 },
        { text: '我覺得還不錯啊，你是不是想上去跟他比？', response: ['誰要跟他比啦，妳不要亂講。', '……不過他那把吉他看起來滿新的。'], affection: 2 },
        { text: '我只注意到你手上的紅豆餅快掉了。', response: ['欸！妳怎麼不早點講！', '差點浪費掉，還好有接住。'], affection: 1 },
      ] },
      { scene: '你們回到攤位時，瑪莎正拿著報名表當扇子搧風，看到你們手上的紙袋，立刻伸手。溫尚翊往旁邊一閃，把袋子藏到身後。', prompt: '妳剛剛是不是有看到我偷吃那個紅豆餅？', choices: [
        { text: '有啊，而且你還挑最大口的先咬。', response: ['那是因為它很燙，我先試一下。', '妳不要跟瑪莎講，等一下他又來搶。'], affection: 3 },
        { text: '沒有，我只看到有人一直說自己不餓。', response: ['我本來就沒有很餓，是妳買的那個太香。', '好了啦，妳先把剩下的吃完。'], affection: 2 },
        { text: '你要是分我一口，我就幫你保密。', response: ['妳不是已經有自己的了？', '……好啦，就一口，不准整個拿走。'], affection: 1 },
      ] },
    ],
    ending: [
      { kind: 'narration', text: '回到攤位後，溫尚翊把最後一截膠帶撕下來，順手把紙袋放到你旁邊。瑪莎果然伸手來搶，兩個人隔著桌子推來推去，差點把報名表弄亂。你還沒來得及笑，溫尚翊已經把那疊紙往你這邊推。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '妳先幫我看著這個啦，不要讓他又亂拿。' },
    ],
  },
  masa: {
    label: '蔡昇晏', subtitle: '跟瑪莎逛攤位、互相找碴', location: '台灣大學・活動廣場', title: '誰輸誰請飲料', kicker: '上午・社團活動區',
    blocks: [
      { kind: 'narration', text: '你才剛把最後一疊報名表放好，瑪莎就從桌子另一頭探過來，拿走你手上的筆，在紙角畫了一個歪歪的箭頭。' },
      { kind: 'dialogue', speaker: '你', text: '欸！你畫我的報名表幹嘛？' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '這不是報名表，是逃生路線。妳再站在這裡整理下去，等一下就要跟桌子一起被搬走了。' },
      { kind: 'dialogue', speaker: '你', text: '那你要帶我去哪？' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '去玩啊。不然妳以為我真的想整個早上站在這裡看你分類紙？走啦，先說好，輸的人請飲料。' },
      { kind: 'narration', text: '他把筆往桌上一丟，轉身走了兩步又回頭催你。你跟上去時，他還故意把手裡那張貼紙舉高，不讓你看清楚上面畫了什麼。' },
    ],
    rounds: [
      { scene: '第一個攤位是套圈圈。瑪莎一眼就看中最上面那隻戴著紅帽子的小熊，立刻把袖子捲起來，還跟攤主多要了兩個圈。第一個圈飛出去，連瓶子邊都沒碰到，反而彈回來滾到他的鞋尖旁。', prompt: '欸！剛剛那個不算啦，圈圈彈到我鞋子才跑掉的。妳不要在旁邊偷笑，下一個我一定中。', choices: [
        { text: '剛剛不是說一定會中？要不要我幫你把牛吹大一點？', response: ['妳很煩欸！我那是還沒熱身啦。', '妳等一下看好，這次我一定套中。'], affection: 3 },
        { text: '換我啦，你站旁邊學一下什麼叫準。', response: ['妳先不要講大話。', '來啊，輸的人請飲料，現在就算數。'], affection: 2 },
        { text: '我看你還是直接跟老闆買比較快。', response: ['誰要直接買？我今天就是要靠實力拿到。', '妳等著看啦。'], affection: 1 },
      ] },
      { scene: '第二次他總算套中一個小瓶子，立刻把圈圈舉到你眼前，得意得像真的拿下頭獎。你伸手想拿那個獎品看，他卻故意往後一縮，還把手舉得比你高。', prompt: '欸，先說，剛剛那個有沒有算我厲害？', choices: [
        { text: '有啦有啦，快把獎品拿下來，不然我搶了喔。', response: ['妳敢！這是我辛苦套到的。', '好啦，給妳看一下，不准弄丟。'], affection: 3 },
        { text: '你先不要得意，剛剛前面失敗那幾次我都有看到。', response: ['那些不算，正式紀錄從這次開始。', '妳不要一直翻舊帳。'], affection: 2 },
        { text: '勉強及格，老師沒有要頒獎。', response: ['誰是老師？妳少在那邊裝。', '等一下妳自己玩就知道了。'], affection: 1 },
      ] },
      { scene: '你們往炸物攤走，瑪莎嘴上說自己不餓，卻在地瓜球剛裝袋時第一個伸手拿。你也伸手去拿，他立刻把紙袋往胸前一收，兩個人隔著袋子拉了一下，差點把地瓜球灑出來。', prompt: '欸欸欸，妳不是說不餓？手伸那麼快幹嘛？', choices: [
        { text: '你剛剛不是也說不餓？先放手啦！', response: ['我是在幫妳試味道好不好。', '好啦，這顆給妳，別把袋子扯破。'], affection: 3 },
        { text: '我拿一顆而已，你又不會少一塊肉。', response: ['妳每次都說一顆，最後都挑最大顆的。', '算了啦，拿去。'], affection: 2 },
        { text: '那我去跟佑達告狀，說你偷吃大家的早餐。', response: ['妳不要什麼事都找佑達！', '好啦好啦，分妳就是了。'], affection: 1 },
      ] },
      { scene: '手作攤上排著一整排手繪徽章。瑪莎拿起一枚皺著眉的小人，趁你低頭看別款時，啪一聲別到你的包包帶上。你發現後伸手要拆，他卻往旁邊躲，還故意把自己的外套往你面前一晃。', prompt: '這個很適合妳吧？我看妳剛剛整理報名表就是這個表情。', choices: [
        { text: '蔡昇晏！你才每天都皺眉！', response: ['我哪有？我明明笑得很和善。', '妳先戴著啦，等一下再還我。'], affection: 3 },
        { text: '好啊，那我也幫你挑一個，別動喔。', response: ['蛤？妳要幹嘛？', '欸！不要真的別在我衣服上啦！'], affection: 2 },
        { text: '我要拿去換一個比較可愛的。', response: ['不准！我挑的欸。', '……好啦，妳要換也先讓我看一下。'], affection: 1 },
      ] },
      { scene: '回攤位前，瑪莎手上多了兩杯飲料，卻把其中一杯藏到身後。你看見杯套上貼著剛才那枚皺眉徽章的同款貼紙，伸手想拿，他往旁邊閃了一步，最後還是把杯子塞到你手裡。', prompt: '欸，妳不要亂猜，那杯不是買給妳的。', choices: [
        { text: '那你拿回去啊，我又沒有要喝。', response: ['……妳真的很會。', '好啦，這杯本來就要給妳，拿著啦。'], affection: 3 },
        { text: '你都拿到我手上了，現在才說不是？', response: ['我只是怕妳等一下又說我自作主張。', '喝啦，冰的快融了。'], affection: 2 },
        { text: '我知道，是買給你自己，另一杯才是我的。', response: ['妳到底有沒有在聽我講話？', '算了，妳愛怎麼說就怎麼說。'], affection: 1 },
      ] },
    ],
    ending: [{ kind: 'narration', text: '回到攤位時，瑪莎把那枚皺眉徽章別到自己衣服上，說這樣才公平。你低頭一看，自己的包包上也還有一枚。溫尚翊一看到就笑了，瑪莎立刻指著你說是你先動手的，明明剛才一路躲著不讓你追上的人就是他。你們兩個還沒吵出結果，佑達已經伸手來拿桌上的地瓜球，瑪莎轉頭就把紙袋舉高，攤位又亂成一團。' }],
  },
  stone: {
    label: '石錦航', subtitle: '一起看學生攝影展', location: '台灣大學・學生作品展區', title: '照片裡的午後光線', kicker: '上午・作品展區',
    blocks: [
      { kind: 'narration', text: '石頭在作品展入口旁等你，手裡拿著一台小相機。他沒有急著往裡走，而是先讓你看牆上那排照片：有操場邊的樹影、下雨後的窗戶，也有幾張拍得很近的街景。' },
      { kind: 'dialogue', speaker: '石錦航', text: '這幾張我剛剛看了滿久的，妳要不要一起看看？有些角度很有意思。' },
    ],
    rounds: [
      { scene: '你們停在一張午後操場的照片前。照片裡沒有拍到人，只有球場邊拉長的影子和一顆滾到邊線的球。石頭站在旁邊，沒有催你往下一張走。', prompt: '妳剛剛是不是在看這張？喜歡它哪裡？', choices: [
        { text: '那個影子很漂亮，感覺像有人剛離開。', response: ['我也有這種感覺。', '照片沒有把事情說完，反而會讓人想像前面發生了什麼。'], affection: 3 },
        { text: '我喜歡那顆球，像是有人玩到一半跑去吃飯了。', response: ['哈哈，妳的想像很生活欸。', '說不定真的只是被叫去吃飯。'], affection: 2 },
        { text: '我只是覺得這張顏色很好看。', response: ['這樣就很好了，不一定要說出什麼大道理。', '喜歡就多看一會兒。'], affection: 1 },
      ] },
      { scene: '旁邊的手作攤把明信片排在木架上，忽然一陣風把最上面幾張吹到地上。你和石頭同時蹲下去撿，兩個人的手差點碰在一起。', prompt: '慢慢來，別急，這幾張不要折到了。', choices: [
        { text: '你先拿那張，我去撿桌子底下的。', response: ['好，小心不要撞到桌腳。', '謝謝妳，這張邊角已經有點翹了。'], affection: 3 },
        { text: '風也太大了吧，差點把人家的明信片全吹走。', response: ['是啊，剛剛還好有人幫忙。', '我幫妳把這幾張壓好。'], affection: 2 },
        { text: '我剛剛差點以為你要跟我搶同一張。', response: ['哈哈，我沒有要搶啦。', '妳先挑，喜歡哪張就拿哪張。'], affection: 1 },
      ] },
      { scene: '明信片重新排好後，石頭挑了一張畫著校園樹道的，翻到背面看了看，又放到你手邊。', prompt: '這張是不是很像剛剛那條路？妳要不要留著？', choices: [
        { text: '好啊，看到它就會想到剛才那張照片。', response: ['那就帶回去吧。', '我覺得妳應該會喜歡這種安安靜靜的畫面。'], affection: 3 },
        { text: '你先挑啦，我想看看你會選哪張。', response: ['我可能會選這張有樹影的。', '不過妳喜歡的話，我們可以各拿一張。'], affection: 2 },
        { text: '我怕買回去又捨不得寫，最後一直放著。', response: ['那就先不要寫啊。', '有時候留白也很好。'], affection: 1 },
      ] },
      { scene: '走到展區外面，樹影剛好落在地上。石頭停下來調整相機，先看了看光線，再抬頭問你。', prompt: '妳可以站到那邊一點嗎？我想幫妳拍一張，不用看鏡頭。', choices: [
        { text: '好啊，那我假裝在看旁邊的樹。', response: ['嗯，這樣就好。', '不用特別擺姿勢，平常站著就可以。'], affection: 3 },
        { text: '你要拍就拍，不准把我拍得很奇怪。', response: ['我會先看好角度的。', '如果妳不喜歡，我就不拿給別人看。'], affection: 2 },
        { text: '我不會擺姿勢欸，你不要笑我。', response: ['不會啦，我也不太會叫人擺姿勢。', '我們就當作只是留一張照片。'], affection: 1 },
      ] },
      { scene: '快門聲很輕地響了一下。石頭把相機收好，沒有立刻把照片拿給你看，只是低頭確認底片計數，像是怕自己剛才按得太快。', prompt: '等照片洗出來，我拿一張給妳，好不好？', choices: [
        { text: '好啊，我想看看你拍出來是什麼樣子。', response: ['那我洗好就先留給妳。', '不用急，照片要等幾天。'], affection: 3 },
        { text: '你不要洗出來才發現我閉眼睛喔。', response: ['哈哈，我剛剛有看妳眨眼的時間。', '應該沒有拍到閉眼睛。'], affection: 2 },
        { text: '如果拍得不好看，你要負責重拍。', response: ['好，我記住了。', '不過妳要先答應我，下次不要躲鏡頭。'], affection: 1 },
      ] },
    ],
    ending: [{ kind: 'narration', text: '回到攤位前，石頭把相機放回包裡，還特地確認背帶沒有勾到桌角。你手裡多了一張明信片，照片則要等沖洗好才看得到。那種還沒拿到、卻已經開始期待的感覺，讓你忍不住又低頭看了一眼明信片。' }],
  },
  yanming: {
    label: '劉諺明', subtitle: '幫忙接應練團室送來的器材', location: '台灣大學・椰風搖滾社攤位', title: '臨時來支援的諺明哥', kicker: '上午・活動廣場入口',
    blocks: [
      { kind: 'narration', text: '活動廣場入口處，一個紙箱擋住了半個指示牌。你走近才看見諺明哥站在旁邊，手裡還拎著一袋導線和轉接頭。他不是台大的學生，今天是受溫尚翊拜託，從練團室送一批備用器材過來，卻不太熟校園裡的路。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '不好意思，妳可以帶我去椰風那個攤位嗎？我怕把器材放錯地方。' },
    ],
    rounds: [
      { scene: '你帶著諺明哥穿過活動廣場。他把紙箱抱在胸前，走得不快，還會刻意避開迎面跑過來的小朋友。你指了指前面掛著藍色布條的攤位，他才點頭跟上。', prompt: '這邊就是了嗎？我看見尚翊說的那個招牌了。', choices: [
        { text: '對啦，你看起來像第一次來參觀的家長。', response: ['哈哈，我是真的不熟這裡。', '還好有妳帶路，不然我可能會繞到別的活動區。'], affection: 3 },
        { text: '你把箱子給我拿一邊啦，抱那麼久很重吧。', response: ['不用，這箱我拿就好。', '妳幫我看路就很有用了。'], affection: 2 },
        { text: '老闆也會迷路喔？', response: ['場地熟不代表每個學校都熟啊。', '而且我今天是來送東西，不是來考校園地圖的。'], affection: 1 },
      ] },
      { scene: '器材放到攤位後，諺明把導線一條條拿出來，照著清單核對。你幫忙翻紙袋時，摸到一個小小的轉接頭，正好是清單上還沒打勾的那一項。', prompt: '妳手上那個是不是轉接頭？我剛剛還在找它。', choices: [
        { text: '找到了！它躲在紙袋最下面。', response: ['太好了，這個少了就接不起來。', '妳眼睛很利，謝謝妳。'], affection: 3 },
        { text: '你是不是把它跟零食放在一起了？', response: ['我沒有啦，可能是收東西時順手放進去。', '下次我會分開裝。'], affection: 2 },
        { text: '我是不是可以領一個尋寶獎？', response: ['哈哈，可以，今天這個任務算妳完成。', '不過獎品可能只有一杯飲料。'], affection: 1 },
      ] },
      { scene: '溫尚翊接好器材後試了幾個音，音箱突然傳出一聲短促的雜音。諺明沒有慌張，只是蹲下來看接頭，讓你幫忙把另一端的線稍微抬高。', prompt: '妳先幫我扶住這條線，我確認一下是不是接頭鬆了。', choices: [
        { text: '好，你慢慢看，我不會亂動。', response: ['謝謝，這樣就可以。', '找到了，是這個接頭沒有插到底。'], affection: 3 },
        { text: '剛剛那聲嚇我一跳，還以為音箱壞了。', response: ['沒事，這種狀況先檢查連接就好。', '器材有聲音不對，不能硬撐著用。'], affection: 2 },
        { text: '我是不是突然變成技術人員了？', response: ['哈哈，今天先當臨時助手。', '等一下我請妳喝水，辛苦了。'], affection: 1 },
      ] },
      { scene: '試音完成後，瑪莎從攤位另一頭探出頭來，喊諺明哥能不能再幫忙看一下麥克風。諺明哥才剛把清單收好，又被叫去調整架子。你看著他一趟趟來回，忍不住笑。', prompt: '妳是不是覺得我今天不像來送器材，反而像來打工的？', choices: [
        { text: '有一點，你都快變成社團工作人員了。', response: ['本來只答應送一趟，結果大家都很會找人幫忙。', '不過器材都弄好，活動順利比較重要。'], affection: 3 },
        { text: '你要不要乾脆留下來當顧問？', response: ['這個要看尚翊願不願意付顧問費。', '妳可以先幫我問問他。'], affection: 2 },
        { text: '我看你根本很習慣照顧這群人。', response: ['他們常常在練團室碰面，久了就知道要注意什麼。', '有時候多看一眼，事情就不會亂掉。'], affection: 1 },
      ] },
      { scene: '器材都確認好後，諺明把清單交給溫尚翊，自己準備把空紙箱帶回車上。你跟到入口，他把手裡那袋空束線帶遞給你，讓你拿回攤位備用。', prompt: '這個先放你們攤位吧，之後收線會用得到。', choices: [
        { text: '好，我幫你拿回去。你回去路上小心。', response: ['謝謝妳，今天多虧妳帶路。', '我回去還有場地要顧，就先走了。'], affection: 3 },
        { text: '你下次來之前先傳訊息，我就不用在入口找你了。', response: ['好，這次是我沒先問清楚。', '下次我會先確認位置和時間。'], affection: 2 },
        { text: '所以今天的臨時助手有沒有工資？', response: ['有啊，剛剛不是說請妳喝飲料？', '下次到練團室再補給妳。'], affection: 1 },
      ] },
    ],
    ending: [{ kind: 'narration', text: '諺明哥離開後，你把束線帶放進攤位的工具盒。溫尚翊一邊整理剛接好的線，一邊說這次總算沒有少東西。你想起剛才他抱著紙箱在校園入口找路的樣子，忍不住又笑了一下。' }],
  },
  ashin: {
    label: '陳信宏', subtitle: '一起逛手作攤和小遊戲', location: '台灣大學・活動廣場', title: '手繪書籤和小熊吊飾', kicker: '上午・活動廣場',
    blocks: [
      { kind: 'narration', text: '阿信剛送走一組來問社團的學生，手裡還拿著幾張報名表。他把表格交給溫尚翊，看到你正低頭看隔壁攤位的手繪書籤，便走過來陪你一起看。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '妳真的要跟我去看看喔？那邊有一攤手繪書籤，我剛剛看到幾張滿可愛的馁。' },
    ],
    rounds: [
      { scene: '桌上排著各種手繪書籤，有小花、窗台和一隻趴在書堆上的貓。阿信拿起其中一張，翻到背面看了看，像是在確認紙張有沒有沾到顏料。', prompt: '妳喜歡哪一張？我覺得這隻貓畫得滿像真的。', choices: [
        { text: '我喜歡小花那張，顏色好溫柔。', response: ['那張也很好看，顏色不會太亮。', '妳可以拿起來看看，紙摸起來也滿厚的。'], affection: 3 },
        { text: '我要貓！牠看起來一臉不想上課。', response: ['哈哈，真的有一點像。', '那妳是不是也想把它夾在課本裡？'], affection: 2 },
        { text: '你先選啦，我想知道你會挑哪一張。', response: ['我可能會選這張窗台的。', '看起來很安靜，放在書裡應該滿適合。'], affection: 1 },
      ] },
      { scene: '前面的小遊戲攤位正在玩丟沙包，最高的獎品是一隻圓滾滾的小熊。阿信看了幾秒，拿起沙包試了試重量，還回頭問你要不要一起玩。', prompt: '要不要試一次？那隻小熊好像很適合掛在包包上。', choices: [
        { text: '好啊！你先丟，我幫你看方向。', response: ['好，那妳幫我看一下。', '如果沒中也不要笑太大聲喔。'], affection: 3 },
        { text: '你想要小熊就直說嘛。', response: ['有一點啦，牠真的滿可愛的。', '不過如果妳喜歡，也可以給妳。'], affection: 2 },
        { text: '不要，我怕你丟不中還要再玩十次。', response: ['哈哈，妳先不要把我想得那麼執著。', '那我們先看別人玩好了。'], affection: 1 },
      ] },
      { scene: '阿信第一個沙包丟得太高，擦過木板邊緣掉到地上。他抿著嘴笑了一下，撿回沙包，還很認真地重新站好位置。', prompt: '剛剛那一下是手滑嗎？', choices: [
        { text: '沒關係，再一次！我覺得你這次會中。', response: ['好，我再試一次。', '妳這樣講，我突然有點壓力了。'], affection: 3 },
        { text: '你是不是太想要那隻小熊了？', response: ['有一點啦，哈哈。', '不過我會再調整一下角度。'], affection: 2 },
        { text: '要不然我們換一個獎品，這個太高了。', response: ['也可以啊，不一定要拿最高的。', '挑一個妳喜歡的就好。'], affection: 1 },
      ] },
      { scene: '你們離開遊戲攤位，阿信把剛買的紅豆餅紙袋遞給你，自己拿著飲料。走到樹蔭下時，他才發現你手上沾了一點紅豆餡，趕緊從口袋拿出紙巾。', prompt: '妳手上沾到了，先擦一下，不然等一下會黏到書籤。', choices: [
        { text: '謝謝，你怎麼連紙巾都準備好了？', response: ['剛好有帶啦，出門常常會用到。', '妳先擦乾淨，不然那張紙會黏住。'], affection: 3 },
        { text: '你自己也沾到了啦，這邊。', response: ['真的喔？我剛剛都沒注意到。', '謝謝妳，還好有發現。'], affection: 2 },
        { text: '我本來想留一點帶回去，現在全沾手上了。', response: ['哈哈，沒關係啦，紙袋裡還有。', '等一下再買也可以。'], affection: 1 },
      ] },
      { scene: '回攤位前，阿信把剛才挑的那張小花書籤遞給你，說他已經幫你付好了。你還沒來得及問，他就先把紙袋往你手裡放。', prompt: '這張給妳啦，剛剛看妳一直拿起來看，應該是真的喜歡。', choices: [
        { text: '你怎麼偷偷買了啦！我自己可以付。', response: ['沒關係啦，就當作今天一起逛的小紀念。', '下次妳再請我吃東西就好。'], affection: 3 },
        { text: '那我收下了，謝謝你。', response: ['不客氣，希望妳會喜歡。', '夾在常看的那本書裡就好。'], affection: 2 },
        { text: '你是不是怕我買太多，所以先幫我決定？', response: ['哈哈，也有一點啦。', '我怕妳站在那邊選到攤主都要收攤了。'], affection: 1 },
      ] },
    ],
    ending: [{ kind: 'narration', text: '回到椰風攤位時，阿信把那隻小熊吊飾的事又提了一次，說剛才差一點就丟中了。你低頭看著手裡的小花書籤，忽然覺得今天帶回去的東西好像比預期多了一點。' }],
  },
}

export type NextMonthFreeChatContext = 'invite' | 'open-day' | 'both' | 'general'

export const nextMonthFreeChatOpeners: Record<NextMonthCharacterId, NextMonthChatOpening[]> = {
  wen: [
    { text: '你回去了喔？我剛剛想到一件事想問你。', response: '嗯，剛到。什麼事？', affection: 2 },
    { text: '我今天有個小插曲，想跟你講哈哈。', response: '又怎樣？妳先說。', affection: 3 },
    { text: '你現在有空嗎？我不會耽誤你很久啦。', response: '有啦，講啊。', affection: 1 },
  ],
  masa: [
    { text: '我剛剛想到你今天那個表情，笑死。', response: '妳最好不是又要拿我開玩笑。', affection: 3 },
    { text: '欸，我有件事想問你，先說不准吐槽我。', response: '妳都這樣講了，我更想吐槽了。說吧。', affection: 2 },
    { text: '你現在在幹嘛？我想跟你講件事。', response: '剛坐下來。妳又有什麼新鮮事？', affection: 1 },
  ],
  ashin: [
    { text: '我回到家了～你現在有空嗎？', response: '有啊～妳到家就好啦，怎麼了？', affection: 3 },
    { text: '我剛剛想到一件好笑的事，想跟你說。', response: '好呀～是什麼事？妳說給我聽。', affection: 2 },
    { text: '今天有件小事想跟你分享。', response: '好呀，妳慢慢說啦，我在聽。', affection: 1 },
  ],
  stone: [
    { text: '你到家了嗎？我剛剛想到一件事。', response: '到了，妳呢？怎麼了？', affection: 3 },
    { text: '我剛剛整理東西，突然想到你說的話。', response: '是喔，妳想到什麼？', affection: 2 },
    { text: '想問你一個小問題，不知道你忙不忙。', response: '我現在有空，妳問吧。', affection: 1 },
  ],
  yanming: [
    { text: '你忙完了嗎？想問你一件事。', response: '剛忙完，妳說。', affection: 3 },
    { text: '今天那件事我回家才想到，還想跟你確認一下。', response: '好，妳把想到的地方告訴我。', affection: 2 },
    { text: '你現在方便嗎？有個小問題想請教你。', response: '方便，妳問看看。', affection: 1 },
  ],
}

export const nextMonthFreeChatContextRounds: Record<NextMonthCharacterId, Record<NextMonthFreeChatContext, NextMonthChatRound>> = {
  wen: {
    invite: { incoming: '我剛剛把電影票根從外套口袋拿出來，才想起妳散場時還跟我爭那個結局。', choices: [
      { text: '因為你明明就猜錯了，還不肯承認。', response: ['我哪有猜錯？妳自己才是硬要把每個細節都扯進去。', '下次看電影不准妳先偷看評論。'], affection: 3, nextIncoming: '我剛剛找撥片，翻了半天，結果它卡在吉他袋最外面的夾層。' },
      { text: '我只是覺得你那個表情很好笑。', response: ['妳到底是來看電影還是來看我表演表情的？', '算了，反正妳笑得很開心。'], affection: 2, nextIncoming: '我剛剛找撥片，翻了半天，結果它卡在吉他袋最外面的夾層。' },
      { text: '我現在只記得那隻娃娃，電影真的不重要。', response: ['妳還敢講？那隻娃娃最後是誰夾到的？', '下次先講清楚，免得妳又把我當免費代幣機。'], affection: 1, nextIncoming: '我剛剛找撥片，翻了半天，結果它卡在吉他袋最外面的夾層。' },
    ] },
    'open-day': { incoming: '妳袖口那段膠帶後來撕掉了沒？我回攤位才發現妳手上也黏了一小截。', choices: [
      { text: '撕掉了啦，倒是你袖子上還有一段。', response: ['蛤？哪裡？妳怎麼不早點講。', '……好啦，我等一下自己處理。'], affection: 3, nextIncoming: '我剛剛找撥片，翻了半天，結果它卡在吉他袋最外面的夾層。' },
      { text: '我留著當今天的工作證。', response: ['妳很無聊欸，這也能當工作證。', '下次我直接發一卷給妳好了。'], affection: 2, nextIncoming: '我剛剛找撥片，翻了半天，結果它卡在吉他袋最外面的夾層。' },
      { text: '沒有，現在還黏在包包上。', response: ['妳快撕掉啦，黏久了會留痕跡。', '包包弄壞了不要又算在我頭上。'], affection: 1, nextIncoming: '我剛剛找撥片，翻了半天，結果它卡在吉他袋最外面的夾層。' },
    ] },
    both: { incoming: '妳把那隻小熊放哪了？我剛剛看到桌上有個東西，還以為是妳夾到的那隻。', choices: [
      { text: '放在床頭啊，現在每天都看得到。', response: ['妳還真的很喜歡喔。', '那我那幾次投幣總算沒有白費。'], affection: 3, nextIncoming: '我剛剛找撥片，翻了半天，結果它卡在吉他袋最外面的夾層。' },
      { text: '你是不是想拿回去？想都不要想。', response: ['誰要拿回去啦！送出去的東西哪有收回來的。', '妳不要自己加戲。'], affection: 2, nextIncoming: '我剛剛找撥片，翻了半天，結果它卡在吉他袋最外面的夾層。' },
      { text: '被瑪莎看到，他說很像你。', response: ['……他又在講什麼？', '妳不要跟著他一起鬧。'], affection: 1, nextIncoming: '我剛剛找撥片，翻了半天，結果它卡在吉他袋最外面的夾層。' },
    ] },
    general: { incoming: '我剛剛把海報筒拿去放好，裡面竟然還卡著一張皺掉的傳單。', choices: [
      { text: '是不是你自己塞進去忘記了？', response: ['我哪有，可能是妳幫忙時放的。', '算了啦，反正還能用。'], affection: 3, nextIncoming: '我剛剛找撥片，翻了半天，結果它卡在吉他袋最外面的夾層。' },
      { text: '留著啊，說不定以後會變成古董。', response: ['一張傳單也能變古董喔？', '妳的想法真的很多。'], affection: 2, nextIncoming: '我剛剛找撥片，翻了半天，結果它卡在吉他袋最外面的夾層。' },
      { text: '你先把它攤平，不然看起來很可憐。', response: ['好啦，我等一下壓在書下面。', '妳連一張傳單都要管。'], affection: 1, nextIncoming: '我剛剛找撥片，翻了半天，結果它卡在吉他袋最外面的夾層。' },
    ] },
  },
  masa: {
    invite: { incoming: '我剛剛經過那家夜市攤，老闆居然還記得妳上次站在那邊選半天。', choices: [
      { text: '他記得我很正常啊，我是熟客。', response: ['妳是熟客還是選擇障礙本人？', '老闆都快把菜單背給妳聽了。'], affection: 3, nextIncoming: '我剛剛回家又被叫去跑腿，真的很煩。' },
      { text: '那你有沒有跟他說我很難伺候？', response: ['我哪敢？我只說妳每次都要看完整張菜單。', '這已經很客氣了好不好。'], affection: 2, nextIncoming: '我剛剛回家又被叫去跑腿，真的很煩。' },
      { text: '下次你先幫我點好，我到了直接吃。', response: ['妳想得倒是很美。', '好啦，我先幫妳看有什麼新東西。'], affection: 1, nextIncoming: '我剛剛回家又被叫去跑腿，真的很煩。' },
    ] },
    'open-day': { incoming: '妳是不是把那枚皺眉徽章別在我衣服上了？我回家才看到。', choices: [
      { text: '我沒有啊，是它自己黏上去的。', response: ['妳當我三歲喔？', '我就知道是妳，還裝。'], affection: 3, nextIncoming: '我剛剛回家又被叫去跑腿，真的很煩。' },
      { text: '很適合你啊，幹嘛拿下來。', response: ['妳今天到底要笑我幾次？', '算了，反正我也沒有真的拿掉。'], affection: 2, nextIncoming: '我剛剛回家又被叫去跑腿，真的很煩。' },
      { text: '那你有沒有發現我包包上也有一個？', response: ['有啊，妳那個比較像在瞪人。', '我們兩個現在是成套的喔？'], affection: 1, nextIncoming: '我剛剛回家又被叫去跑腿，真的很煩。' },
    ] },
    both: { incoming: '妳是不是把我套中的那個小獎品帶走了？我回來找半天都沒看到。', choices: [
      { text: '你不是說送我了嗎？現在反悔喔？', response: ['我哪有反悔，我只是確認妳有沒有收好。', '不要弄丟了，害我白套那麼久。'], affection: 3, nextIncoming: '我剛剛回家又被叫去跑腿，真的很煩。' },
      { text: '我放在包包裡，你要看照片嗎？', response: ['不用啦，我又不是沒看過。', '妳收好就行。'], affection: 2, nextIncoming: '我剛剛回家又被叫去跑腿，真的很煩。' },
      { text: '被我拿去跟別人交換了。', response: ['蛤？妳敢！', '……妳不要真的拿去換喔。'], affection: 1, nextIncoming: '我剛剛回家又被叫去跑腿，真的很煩。' },
    ] },
    general: { incoming: '佑達剛剛又打電話來，問我一個他自己明明就知道答案的問題。', choices: [
      { text: '你有沒有先叫他自己想三秒？', response: ['我叫他想三十秒，他還是打來。', '真的拿他沒辦法。'], affection: 3, nextIncoming: '我媽還叫我順便買一堆東西，清單長得要命。' },
      { text: '你是不是嘴上嫌他，電話還是接得很快？', response: ['我怕他一直打啊，吵死了。', '而且他真的會打到沒完沒了。'], affection: 2, nextIncoming: '我媽還叫我順便買一堆東西，清單長得要命。' },
      { text: '那你下次也打給他問一個很笨的問題。', response: ['好主意欸，我記下來了。', '這次換我讓他頭痛。'], affection: 1, nextIncoming: '我媽還叫我順便買一堆東西，清單長得要命。' },
    ] },
  },
  ashin: {
    invite: { incoming: '我剛剛整理包包，才發現KTV那天買的小點心還有一包沒拆。', choices: [
      { text: '你居然現在才發現！', response: ['哈哈，真的放在最裡面，完全忘記了。', '妳要不要下次見面拿去吃？'], affection: 3, nextIncoming: '我剛剛去買晚餐，老闆把隔壁桌的湯先放到我面前，我差點就喝下去了。' },
      { text: '先不要拆，留著下次一起吃。', response: ['好啊，那我先收起來。', '不過妳不要到時候又忘記喔。'], affection: 2, nextIncoming: '我剛剛去買晚餐，老闆把隔壁桌的湯先放到我面前，我差點就喝下去了。' },
      { text: '你是不是想找理由再約我？', response: ['被妳發現了喔？', '哈哈，好啦，也有一點。'], affection: 1, nextIncoming: '我剛剛去買晚餐，老闆把隔壁桌的湯先放到我面前，我差點就喝下去了。' },
    ] },
    'open-day': { incoming: '妳把那張小花書籤夾在哪本書裡了？我剛剛想到，還滿想知道妳會不會真的用。', choices: [
      { text: '夾在我最近在看的小說裡。', response: ['那很適合欸，翻開的時候就會看到。', '希望它沒有把書頁弄皺。'], affection: 3, nextIncoming: '我剛剛去買晚餐，老闆把隔壁桌的湯先放到我面前，我差點就喝下去了。' },
      { text: '我放在筆記本裡，怕弄丟。', response: ['這樣也很好，至少不會找不到。', '妳收得很仔細欸。'], affection: 2, nextIncoming: '我剛剛去買晚餐，老闆把隔壁桌的湯先放到我面前，我差點就喝下去了。' },
      { text: '你是不是想檢查我有沒有好好收？', response: ['哈哈，沒有啦，只是突然想到。', '妳喜歡就好，不用特別跟我交代。'], affection: 1, nextIncoming: '我剛剛去買晚餐，老闆把隔壁桌的湯先放到我面前，我差點就喝下去了。' },
    ] },
    both: { incoming: '妳那張書籤還在嗎？我記得妳那天一直拿起來看，後來又把它收得很小心。', choices: [
      { text: '在啊，跟那天KTV拿回來的小紙袋放一起。', response: ['這樣很好欸，都是那天留下來的小東西。', '以後翻到應該會想起來。'], affection: 3, nextIncoming: '我剛剛去買晚餐，老闆把隔壁桌的湯先放到我面前，我差點就喝下去了。' },
      { text: '你送的東西，我哪敢弄丟。', response: ['妳這樣講，我會有點不好意思。', '不過我真的很開心妳喜歡。'], affection: 2, nextIncoming: '我剛剛去買晚餐，老闆把隔壁桌的湯先放到我面前，我差點就喝下去了。' },
      { text: '被我拿去當書籤了，不然要供起來嗎？', response: ['哈哈，當然是拿來用啊。', '那我下次再找一張別的給妳。'], affection: 1, nextIncoming: '我剛剛去買晚餐，老闆把隔壁桌的湯先放到我面前，我差點就喝下去了。' },
    ] },
    general: { incoming: '我剛剛去買晚餐，老闆把隔壁桌的湯先放到我面前，我差點就喝下去了。', choices: [
      { text: '哈哈哈，你有沒有發現得很快？', response: ['有啦，還好我先看了一眼。', '老闆也一直跟我道歉，弄得我有點不好意思。'], affection: 3, nextIncoming: '回家路上我看到一隻小狗，牠一直追著自己的尾巴轉圈圈。' },
      { text: '你是不是看起來太餓了，老闆才先給你？', response: ['可能喔，我剛剛真的有點餓。', '不過我還是有等自己的那份啦。'], affection: 2, nextIncoming: '回家路上我看到一隻小狗，牠一直追著自己的尾巴轉圈圈。' },
      { text: '你就先喝一口，再假裝沒事。', response: ['不行啦，這樣太沒禮貌了。', '而且我也不知道那碗是什麼。'], affection: 1, nextIncoming: '回家路上我看到一隻小狗，牠一直追著自己的尾巴轉圈圈。' },
    ] },
  },
  stone: {
    invite: { incoming: '我剛剛經過河邊，看到有人把外套忘在長椅上，突然想起妳那天差點把圍巾落下。', choices: [
      { text: '我那天明明有記得拿走！', response: ['有啦，最後有拿。', '只是妳走出去兩步又折回來，我剛好看到了。'], affection: 3, nextIncoming: '我剛剛整理照片，發現有一張底片拍得有點歪，但我還滿喜歡的。' },
      { text: '還好你有提醒我，不然真的會忘記。', response: ['沒關係，小東西常常一忙就忘了。', '下次我再幫妳看一下。'], affection: 2, nextIncoming: '我剛剛整理照片，發現有一張底片拍得有點歪，但我還滿喜歡的。' },
      { text: '你是不是很常幫我收拾東西？', response: ['沒有啦，剛好看到就提醒一下。', '妳自己也很細心。'], affection: 1, nextIncoming: '我剛剛整理照片，發現有一張底片拍得有點歪，但我還滿喜歡的。' },
    ] },
    'open-day': { incoming: '我剛剛把相機收起來，才想到今天替妳拍的那張還要等沖洗。', choices: [
      { text: '你要記得喔，我會等照片的。', response: ['我有記著，底片洗好就先留給妳。', '應該不用等太久。'], affection: 3, nextIncoming: '我剛剛整理照片，發現有一張底片拍得有點歪，但我還滿喜歡的。' },
      { text: '如果拍得很醜，你要負責重拍。', response: ['哈哈，好，我接受這個要求。', '不過妳下次要先答應不要躲鏡頭。'], affection: 2, nextIncoming: '我剛剛整理照片，發現有一張底片拍得有點歪，但我還滿喜歡的。' },
      { text: '你自己先看過再決定要不要給我。', response: ['好啊，我洗出來先看一下。', '如果妳不喜歡，我們再找時間重拍。'], affection: 1, nextIncoming: '我剛剛整理照片，發現有一張底片拍得有點歪，但我還滿喜歡的。' },
    ] },
    both: { incoming: '我把今天拍的底片袋和河邊那天的車票放在一起了，整理時突然覺得滿有意思的。', choices: [
      { text: '你還留著那張車票喔？', response: ['嗯，剛好夾在相機袋裡。', '有時候看到這些小東西，會想起當時的事情。'], affection: 3, nextIncoming: '我剛剛整理照片，發現有一張底片拍得有點歪，但我還滿喜歡的。' },
      { text: '那你要不要幫我也留一張？', response: ['可以啊，妳想留哪一張？', '等照片洗出來再一起挑。'], affection: 2, nextIncoming: '我剛剛整理照片，發現有一張底片拍得有點歪，但我還滿喜歡的。' },
      { text: '你怎麼什麼都收得好好的？', response: ['哈哈，也不是每樣都收得好。', '只是有些東西不想弄丟。'], affection: 1, nextIncoming: '我剛剛整理照片，發現有一張底片拍得有點歪，但我還滿喜歡的。' },
    ] },
    general: { incoming: '我剛剛整理照片，發現有一張底片拍得有點歪，但我還滿喜歡的。', choices: [
      { text: '歪掉的照片有時候反而比較有味道。', response: ['我也這麼覺得。', '有些不完美的地方，反而會讓人記得更久。'], affection: 3, nextIncoming: '沖印店老闆說，這卷底片裡有幾張曝光不太一樣。' },
      { text: '你是不是按快門的時候手滑？', response: ['可能有一點，當時旁邊有人撞到我。', '不過洗出來還是滿有趣的。'], affection: 2, nextIncoming: '沖印店老闆說，這卷底片裡有幾張曝光不太一樣。' },
      { text: '那你要不要寄給我看？', response: ['好啊，我挑幾張拍得比較好的給妳看。', '等我整理好再拿給妳。'], affection: 1, nextIncoming: '沖印店老闆說，這卷底片裡有幾張曝光不太一樣。' },
    ] },
  },
  yanming: {
    invite: { incoming: '我剛剛把練團室的預約本翻了一遍，發現有一格時間被我寫得太小，差點看漏。', choices: [
      { text: '還好你有再檢查一次。', response: ['嗯，時間這種事不能只靠印象。', '看清楚再安排比較不會出錯。'], affection: 3, nextIncoming: '我今天把練團室門口那盞燈換好了，結果大家一直說變得太亮。' },
      { text: '你也會有差點出錯的時候喔？', response: ['當然會，我又不是機器。', '所以才要多確認一次。'], affection: 2, nextIncoming: '我今天把練團室門口那盞燈換好了，結果大家一直說變得太亮。' },
      { text: '下次字寫大一點啦，不然我也看不懂。', response: ['哈哈，好，我會注意。', '至少要讓大家都看得清楚。'], affection: 1, nextIncoming: '我今天把練團室門口那盞燈換好了，結果大家一直說變得太亮。' },
    ] },
    'open-day': { incoming: '今天送去攤位的那袋束線帶，妳後來有放進工具盒嗎？', choices: [
      { text: '有啊，已經放在最上面了。', response: ['好，這樣下次找起來比較快。', '謝謝妳幫忙收好。'], affection: 3, nextIncoming: '我今天把練團室門口那盞燈換好了，結果大家一直說變得太亮。' },
      { text: '放好了，溫尚翊還問我是不是你交代的。', response: ['哈哈，他應該是怕東西又不見。', '我有跟他說已經收好了。'], affection: 2, nextIncoming: '我今天把練團室門口那盞燈換好了，結果大家一直說變得太亮。' },
      { text: '你下次來自己找，我才不要當倉庫管理員。', response: ['可以啊，這樣也好。', '不過妳今天幫忙帶路，已經很謝謝妳了。'], affection: 1, nextIncoming: '我今天把練團室門口那盞燈換好了，結果大家一直說變得太亮。' },
    ] },
    both: { incoming: '今天在台大那邊妳幫我找器材，之前又陪我整理練團室，妳好像越來越熟這些東西了。', choices: [
      { text: '那我現在算半個練團室員工嗎？', response: ['哈哈，這個稱呼倒是滿有趣的。', '不過妳來玩就好，不用真的幫忙工作。'], affection: 3, nextIncoming: '我今天把練團室門口那盞燈換好了，結果大家一直說變得太亮。' },
      { text: '我只是剛好眼尖，沒有很專業啦。', response: ['能注意到細節就很好了。', '專業的部分慢慢來就好。'], affection: 2, nextIncoming: '我今天把練團室門口那盞燈換好了，結果大家一直說變得太亮。' },
      { text: '你是不是以後都想叫我去幫忙？', response: ['不會啦，不能每次都麻煩妳。', '有空來坐坐就好。'], affection: 1, nextIncoming: '我今天把練團室門口那盞燈換好了，結果大家一直說變得太亮。' },
    ] },
    general: { incoming: '我今天把練團室門口那盞燈換好了，結果大家一直說變得太亮。', choices: [
      { text: '太亮不好嗎？至少晚上不會看不到路。', response: ['是啊，我也是這樣想。', '只是他們剛開始有點不習慣。'], affection: 3, nextIncoming: '瑪莎說那盞燈亮得像在審問人。' },
      { text: '是不是瑪莎嫌的？他很會挑。', response: ['妳猜對了，他第一個說太亮。', '不過他後來還是走那邊走得很勤。'], affection: 2, nextIncoming: '瑪莎說那盞燈亮得像在審問人。' },
      { text: '下次換成粉紅色，大家就不會抱怨了。', response: ['這個可能不太適合練團室。', '不過妳的想法可以先記下來。'], affection: 1, nextIncoming: '瑪莎說那盞燈亮得像在審問人。' },
    ] },
  },
}

export const nextMonthFreeChatScripts: Record<NextMonthCharacterId, NextMonthChatRound[]> = {
  wen: [
    { incoming: '我剛剛找撥片，翻了半天，結果它卡在吉他袋最外面的夾層。', choices: [
      { text: '你是不是又把東西塞得亂七八糟？', response: ['我有整理好不好，只是那個袋子太多層。', '妳不要每次都先怪我。'], affection: 3, nextIncoming: '瑪莎剛剛還說我找東西像在挖寶。' },
      { text: '哈哈哈，你剛剛是不是把整個袋子倒過來？', response: ['差不多啦，還好沒有真的全部掉出來。', '不然我又要被笑一整天。'], affection: 2, nextIncoming: '瑪莎剛剛還說我找東西像在挖寶。' },
      { text: '下次我幫你貼一張「撥片在這裡」。', response: ['妳是把我當小學生喔？', '……不過好像真的有用。'], affection: 1, nextIncoming: '瑪莎剛剛還說我找東西像在挖寶。' },
    ] },
    { incoming: '瑪莎剛剛還說我找東西像在挖寶。', choices: [
      { text: '他只是把你平常的樣子講出來而已。', response: ['妳到底站哪邊的啦。', '我看妳跟他根本一夥的。'], affection: 3, nextIncoming: '我本來要去買晚餐，結果走到巷口才發現忘記帶錢包。' },
      { text: '你們兩個不是每天都互相嫌棄嗎？', response: ['那不一樣，他今天特別吵。', '而且我明明已經找到東西了。'], affection: 2, nextIncoming: '我本來要去買晚餐，結果走到巷口才發現忘記帶錢包。' },
      { text: '我覺得他講得滿有道理的。', response: ['……妳今天是不是故意來氣我的？', '算了，不跟妳計較。'], affection: 1, nextIncoming: '我本來要去買晚餐，結果走到巷口才發現忘記帶錢包。' },
    ] },
    { incoming: '我本來要去買晚餐，結果走到巷口才發現忘記帶錢包。', choices: [
      { text: '你先回去拿啊，不要又想用賒帳的。', response: ['我哪有常常賒帳？', '好啦，我已經折回來了。'], affection: 3, nextIncoming: '好啦，我先去把吉他收好，等一下還要幫忙搬東西。' },
      { text: '那你今天晚餐吃什麼？', response: ['還沒買到啦，現在正在回去拿錢。', '妳不要趁機笑我。'], affection: 2, nextIncoming: '好啦，我先去把吉他收好，等一下還要幫忙搬東西。' },
      { text: '叫瑪莎幫你付，他不是很愛管你嗎？', response: ['妳不要害我，等一下他會念更久。', '我自己回去拿就好。'], affection: 1, nextIncoming: '好啦，我先去把吉他收好，等一下還要幫忙搬東西。' },
    ] },
    { incoming: '好啦，我先去把吉他收好，等一下還要幫忙搬東西。', choices: [
      { text: '去吧，這次不要又把撥片弄丟。', response: ['知道啦，妳很煩欸。', '晚點再跟妳講。'], affection: 3 },
      { text: '你不是吉他手嗎，怎麼又要搬東西？', response: ['吉他手就不能有手喔？', '大家一起弄比較快啦。'], affection: 2 },
      { text: '那我先不吵你，忙完再說。', response: ['好，妳也去忙自己的事。', '不要又忘記吃晚餐。'], affection: 1 },
    ] },
  ],
  masa: [
    { incoming: '我剛剛回家又被叫去跑腿，真的很煩。', choices: [
      { text: '哈哈哈，你不是很會跑？', response: ['妳很想被我記仇是不是？', '下次換妳去買。'], affection: 3, nextIncoming: '我媽還叫我順便買一堆東西，清單長得要命。' },
      { text: '阿姨是不是覺得你最閒？', response: ['她可能覺得我看起來很閒。', '明明我也有自己的事要做。'], affection: 2, nextIncoming: '我媽還叫我順便買一堆東西，清單長得要命。' },
      { text: '你有沒有又忘記要買什麼？', response: ['妳不要一直記得那件事好不好！', '那次是意外。'], affection: 1, nextIncoming: '我媽還叫我順便買一堆東西，清單長得要命。' },
    ] },
    { incoming: '我媽還叫我順便買一堆東西，清單長得要命。', choices: [
      { text: '拍給我看，我幫你檢查有沒有漏。', response: ['妳是要幫忙還是要看笑話？', '算了，傳給妳看一下。'], affection: 3, nextIncoming: '我剛剛去買東西，店員把我跟隔壁客人的袋子弄反。' },
      { text: '你就照清單買啊，有這麼難嗎？', response: ['妳講得很簡單欸。', '店裡東西那麼多，誰記得住。'], affection: 2, nextIncoming: '我剛剛去買東西，店員把我跟隔壁客人的袋子弄反。' },
      { text: '我覺得你需要一個秘書。', response: ['那妳要應徵嗎？薪水很低喔。', '而且還要被我嫌。'], affection: 1, nextIncoming: '我剛剛去買東西，店員把我跟隔壁客人的袋子弄反。' },
    ] },
    { incoming: '我剛剛去買東西，店員把我跟隔壁客人的袋子弄反。', choices: [
      { text: '你怎麼不當場打開來看？', response: ['我有看啊，結果裡面多了一包我沒買的餅乾。', '還好那個人也發現了。'], affection: 3, nextIncoming: '佑達剛剛又打電話來，問我明天要不要一起吃飯。' },
      { text: '你是不是看到有餅乾就不想還了？', response: ['我哪有那麼沒品！', '而且那包還是海苔口味，我又不愛。'], affection: 2, nextIncoming: '佑達剛剛又打電話來，問我明天要不要一起吃飯。' },
      { text: '哈哈哈，今天跑腿跑到連袋子都拿錯。', response: ['妳笑夠了沒？', '我今天真的不想再出門了。'], affection: 1, nextIncoming: '佑達剛剛又打電話來，問我明天要不要一起吃飯。' },
    ] },
    { incoming: '佑達剛剛又打電話來，問我明天要不要一起吃飯。', choices: [
      { text: '他是不是又講了半天都沒講到重點？', response: ['妳怎麼知道？真的講了快十分鐘。', '最後才說只是問吃飯而已。'], affection: 3 },
      { text: '那你就去啊，順便叫他請客。', response: ['這個可以考慮。', '不過他大概又會裝沒聽到。'], affection: 2 },
      { text: '你們兩個真的很吵欸。', response: ['妳現在才知道？', '好啦，我先不跟妳吵了。'], affection: 1 },
    ] },
  ],
  ashin: [
    { incoming: '我剛剛去買晚餐，老闆把隔壁桌的湯先放到我面前，我差點就喝下去了。', choices: [
      { text: '哈哈哈，你有沒有發現得很快？', response: ['有啦，還好我先看了一眼。', '老闆也一直跟我道歉，弄得我有點不好意思。'], affection: 3, nextIncoming: '回家路上我看到一隻小狗，牠一直追著自己的尾巴轉圈圈。' },
      { text: '你是不是看起來太餓了，老闆才先給你？', response: ['可能喔，我剛剛真的有點餓。', '不過我還是有等自己的那份啦。'], affection: 2, nextIncoming: '回家路上我看到一隻小狗，牠一直追著自己的尾巴轉圈圈。' },
      { text: '你就先喝一口，再假裝沒事。', response: ['不行啦，這樣太沒禮貌了。', '而且我也不知道那碗是什麼。'], affection: 1, nextIncoming: '回家路上我看到一隻小狗，牠一直追著自己的尾巴轉圈圈。' },
    ] },
    { incoming: '回家路上我看到一隻小狗，牠一直追著自己的尾巴轉圈圈。', choices: [
      { text: '牠有沒有追到？我光想就覺得好好笑。', response: ['沒有欸，轉了幾圈就跑去找主人了。', '主人還一直跟牠說不要再轉了。'], affection: 3, nextIncoming: '我回到家才發現，買的豆花忘在店裡了。' },
      { text: '你是不是站在旁邊看很久？', response: ['有一點啦，真的滿可愛的。', '後來怕牠主人找不到，就先走了。'], affection: 2, nextIncoming: '我回到家才發現，買的豆花忘在店裡了。' },
      { text: '下次看到要拍下來給我看！', response: ['好啊，如果又遇到牠，我再拍給妳。', '希望牠不要又一直轉圈圈。'], affection: 1, nextIncoming: '我回到家才發現，買的豆花忘在店裡了。' },
    ] },
    { incoming: '我回到家才發現，買的豆花忘在店裡了。', choices: [
      { text: '你今天到底忘記多少東西啦！', response: ['哈哈，真的有點糊塗。', '還好老闆有幫我冰著，我等一下再去拿。'], affection: 3, nextIncoming: '對了，妳最近有沒有在看什麼好看的連續劇？' },
      { text: '那你現在還要出門一次喔？', response: ['對啊，走一趟就好。', '剛好也可以散散步。'], affection: 2, nextIncoming: '對了，妳最近有沒有在看什麼好看的連續劇？' },
      { text: '我幫你吃掉就不用回去拿了。', response: ['哈哈，妳倒是很會幫忙。', '可是我還滿想吃那碗豆花的。'], affection: 1, nextIncoming: '對了，妳最近有沒有在看什麼好看的連續劇？' },
    ] },
    { incoming: '對了，妳最近有沒有在看什麼好看的連續劇？', choices: [
      { text: '有！我最近每次都想說只看一集，結果停不下來。', response: ['哈哈，這個我懂啦。', '妳先不要熬夜追，明天還要上課喔。'], affection: 3 },
      { text: '沒有欸，最近都在忙課業。', response: ['那等忙完再找一部來看啊。', '偶爾也要留一點時間給自己放鬆。'], affection: 2 },
      { text: '有啊，但我不告訴你，怕你劇透。', response: ['好啦好啦，我不問。', '等妳看完再跟我說好不好看。'], affection: 1 },
    ] },
  ],
  stone: [
    { incoming: '我剛剛整理照片，發現有一張底片拍得有點歪，但我還滿喜歡的。', choices: [
      { text: '歪掉的照片有時候反而比較有味道。', response: ['我也這麼覺得。', '有些不完美的地方，反而會讓人記得更久。'], affection: 3, nextIncoming: '沖印店老闆說，這卷底片裡有幾張曝光不太一樣。' },
      { text: '你是不是按快門的時候手滑？', response: ['可能有一點，當時旁邊有人撞到我。', '不過洗出來還是滿有趣的。'], affection: 2, nextIncoming: '沖印店老闆說，這卷底片裡有幾張曝光不太一樣。' },
      { text: '那你要不要寄給我看？', response: ['好啊，我挑幾張拍得比較好的給妳看。', '等我整理好再拿給妳。'], affection: 1, nextIncoming: '沖印店老闆說，這卷底片裡有幾張曝光不太一樣。' },
    ] },
    { incoming: '沖印店老闆說，這卷底片裡有幾張曝光不太一樣。', choices: [
      { text: '那剛好可以看看不同效果。', response: ['對啊，有幾張反而比我原本想的好看。', '我想先挑出來放在相簿裡。'], affection: 3, nextIncoming: '我今天回家路上看到一間小店，窗邊擺了好多盆栽。' },
      { text: '有沒有哪張特別喜歡？', response: ['有一張拍到路邊的樹影，我滿喜歡的。', '光剛好落在牆上。'], affection: 2, nextIncoming: '我今天回家路上看到一間小店，窗邊擺了好多盆栽。' },
      { text: '你下次記得檢查底片，不要又拍歪。', response: ['好，我會多留意。', '不過偶爾拍歪也不一定是壞事。'], affection: 1, nextIncoming: '我今天回家路上看到一間小店，窗邊擺了好多盆栽。' },
    ] },
    { incoming: '我今天回家路上看到一間小店，窗邊擺了好多盆栽。', choices: [
      { text: '你有進去看嗎？', response: ['有啊，裡面有幾盆小小的仙人掌。', '老闆說很好照顧，放在窗邊就可以。'], affection: 3, nextIncoming: '下次經過那邊，妳要不要一起去看看？' },
      { text: '你是不是又站在窗外看很久？', response: ['哈哈，有一點。', '我怕進去之後會忍不住買一盆回家。'], affection: 2, nextIncoming: '下次經過那邊，妳要不要一起去看看？' },
      { text: '買一盆啊，放在練團室也不錯。', response: ['這個主意不錯。', '不過要先找個不會被碰倒的位置。'], affection: 1, nextIncoming: '下次經過那邊，妳要不要一起去看看？' },
    ] },
    { incoming: '下次經過那邊，妳要不要一起去看看？', choices: [
      { text: '好啊，我想看你最後會不會真的買。', response: ['哈哈，那就一起去。', '如果真的買了，還要麻煩妳幫我挑位置。'], affection: 3 },
      { text: '可以，但你不准只顧著看盆栽。', response: ['好，我會記得。', '妳也可以幫我挑一盆。'], affection: 2 },
      { text: '看你有沒有先把照片洗出來給我。', response: ['這個我記得，洗好就拿給妳。', '不會忘記的。'], affection: 1 },
    ] },
  ],
  yanming: [
    { incoming: '我今天把練團室門口那盞燈換好了，結果大家一直說變得太亮。', choices: [
      { text: '太亮不好嗎？至少晚上不會看不到路。', response: ['是啊，我也是這樣想。', '只是他們剛開始有點不習慣。'], affection: 3, nextIncoming: '瑪莎說那盞燈亮得像在審問人。' },
      { text: '是不是瑪莎嫌的？他很會挑。', response: ['妳猜對了，他第一個說太亮。', '不過他後來還是走那邊走得很勤。'], affection: 2, nextIncoming: '瑪莎說那盞燈亮得像在審問人。' },
      { text: '下次換成粉紅色，大家就不會抱怨了。', response: ['這個可能不太適合練團室。', '不過妳的想法可以先記下來。'], affection: 1, nextIncoming: '瑪莎說那盞燈亮得像在審問人。' },
    ] },
    { incoming: '瑪莎說那盞燈亮得像在審問人。', choices: [
      { text: '哈哈哈哈，他是不是站在燈下面被照到？', response: ['對，他還故意站在那邊演了一下。', '大家都被他逗笑了。'], affection: 3, nextIncoming: '我剛剛去附近買便當，老闆多送了一份小菜。' },
      { text: '那你怎麼回他？', response: ['我說至少現在找東西不會摸黑。', '他就說那他以後要戴墨鏡進來。'], affection: 2, nextIncoming: '我剛剛去附近買便當，老闆多送了一份小菜。' },
      { text: '你不要理他，他只是想找人吵架。', response: ['哈哈，我知道。', '他有時候就是需要有人回他兩句。'], affection: 1, nextIncoming: '我剛剛去附近買便當，老闆多送了一份小菜。' },
    ] },
    { incoming: '我剛剛去附近買便當，老闆多送了一份小菜。', choices: [
      { text: '你有沒有問他是不是送錯了？', response: ['有啊，他說今天剛好多做了一點。', '我就帶回來跟大家分了。'], affection: 3, nextIncoming: '明天有人要來練團室試音，我得早一點過去。' },
      { text: '那你有留給自己吃嗎？', response: ['有留一點，其他的分給他們了。', '大家剛好都還沒吃。'], affection: 2, nextIncoming: '明天有人要來練團室試音，我得早一點過去。' },
      { text: '你是不是又把好吃的都分給別人？', response: ['沒有啦，我有吃到。', '只是剛好大家都在。'], affection: 1, nextIncoming: '明天有人要來練團室試音，我得早一點過去。' },
    ] },
    { incoming: '明天有人要來練團室試音，我得早一點過去。', choices: [
      { text: '那你今晚早點睡，不要又忙到很晚。', response: ['好，我會把事情先準備好。', '妳也早點休息。'], affection: 3 },
      { text: '要不要我幫你帶早餐？', response: ['不用特地準備啦，妳有空再說。', '不過謝謝妳想到這件事。'], affection: 2 },
      { text: '你要是遲到，我就去笑你。', response: ['哈哈，那我得準時一點。', '不然又要被妳抓到把柄了。'], affection: 1 },
    ] },
  ],
}

export const nextMonthChatDiary: Record<NextMonthCharacterId, string> = {
  wen: '晚上我自己先敲了溫尚翊。從白天發生的事聊起，後來又莫名其妙扯到報告、練團和吃飯。這個人講話還是一樣直接，嘴上嫌我問題很多，卻又真的會接著我的話聊下去。每次跟他講話都很容易鬥嘴。',
  masa: '晚上找瑪莎聊天，聽他抱怨又被叫去跑腿，還把店員拿錯袋子的事講得像什麼大災難。我當然沒有放過他，兩個人一路互相吐槽，最後又扯到佑達打電話來問吃飯。',
  ashin: '晚上找阿信聊了幾句。他說買晚餐時差點拿錯別人的湯，回家路上又看到一隻追著尾巴轉圈的小狗，還把自己忘在店裡的豆花講得很不好意思。話題都是些小事，卻很自然地聊了好久。',
  stone: '晚上找石頭聊照片。他說有張底片拍歪了，卻意外地很喜歡，後來又聊到沖印店和路邊的小盆栽。他總是會注意到那些很小的畫面，跟他聊天也會不自覺慢下來。',
  yanming: '晚上找諺明哥聊了幾句。他說自己換了練團室門口的燈，結果被瑪莎嫌太亮，後來又聊到附近便當店多送的小菜和隔天的試音安排。明明做事很有條理，偶爾也會被那群人鬧得沒辦法。',
}

export const nextMonthDiaryCopy: Record<NextMonthCharacterId, { inviteTitle: string; inviteSummary: string; openDayTitle: string; openDaySummary: string; ending: string }> = {
  wen: {
    inviteTitle: '電影票真的只是多買的嗎？',
    inviteSummary: '今天跟溫尚翊去看電影。他一直說票是多買的，問多了還會炸毛，真的很好笑。看完電影又被他拉去遊樂場抓娃娃，前幾次都沒夾到，最後終於抓出一隻小玩偶。他還一副很得意的樣子，非要我承認他很厲害。好啦，是有一點厲害。',
    openDayTitle: '椰風搖滾社今天忙翻了！',
    openDaySummary: '今天在椰風攤位幫忙掛海報，風大到差點把整張吹走，還抓到溫尚翊袖口黏著膠帶的糗樣。後來他帶我去買紅豆餅，路過小舞台又忍不住停下來聽別人試音。回攤位時瑪莎還想搶我們的點心，大家吵成一團。',
    ending: '海報、紅豆餅和一群吵吵鬧鬧的人，今天的聲音到現在好像還留在耳邊。'
  },
  masa: {
    inviteTitle: '夜市真的逛不完欸！',
    inviteSummary: '晚上跟瑪莎去逛夜市，本來說好只吃一點，結果每看到一攤就停下來。還玩了套圈圈，他好不容易套中一個小獎品，得意得不得了。嘴巴還是很壞，不過跟他出門真的不會無聊。',
    openDayTitle: '今天跟瑪莎逛了好多攤位',
    openDaySummary: '瑪莎拉著我去逛攤位，套圈圈前還信誓旦旦說自己一定會中，結果第一個圈就飛到旁邊。後來他又把皺眉小徽章別到我包包上，自己笑得很得意。一路上互相吐槽，連買飲料都能吵起來。',
    ending: '那枚皺眉徽章被我帶回家了。下次見面一定要找機會貼回他身上。'
  },
  stone: {
    inviteTitle: '河堤的風有點冷',
    inviteSummary: '晚上跟石頭去河堤走走。城市的燈光映在水面上，抬頭還真的看見幾顆星星。石頭帶了外套，還記得提醒我晚上會冷。沒有安排什麼特別的事，卻覺得很舒服。',
    openDayTitle: '慢慢逛完校園開放日',
    openDaySummary: '今天跟石頭看了學生攝影展，還一起撿被風吹落的明信片。他替我拍了一張照片，說等底片洗出來再拿給我。明明只是慢慢逛了一圈，卻有一張還沒拿到手的照片，讓人開始期待。',
    ending: '照片還要等幾天才洗得出來。想到石頭說會留一張給我，突然有點期待去拿照片的那天。'
  },
  yanming: {
    inviteTitle: '練團室的臨時小幫手',
    inviteSummary: '今天去練團室幫諺明哥整理器材。原本以為只是搬東西，結果光是收導線就有好多細節。忙完他請我吃飯，還問起我最近的報告。感覺自己真的幫上忙了，也學到不少東西。',
    openDayTitle: '今天學會好多小事',
    openDaySummary: '諺明哥受溫尚翊拜託，從練團室送來備用器材，卻不熟台大校園，還是我帶他找到椰風攤位。後來一起核對導線、找轉接頭、處理試音時的雜音，他明明只是來送東西，最後卻忙成了臨時技術人員。',
    ending: '諺明哥回練團室了，我卻還記得他抱著紙箱在入口找路的樣子。原來不是每個人都熟悉台大校園嘛。'
  },
  ashin: {
    inviteTitle: '唱到最後都捨不得走',
    inviteSummary: '今天跟阿信去KTV唱歌。他一開始還說自己只是想找人陪，結果唱到後來比我還投入。點歌、搶麥克風、吃小點心，還笑我有幾句唱得太大聲。跟他待在一起真的很輕鬆。',
    openDayTitle: '跟阿信逛了校園開放日',
    openDaySummary: '阿信陪我看了手繪書籤，還為了那隻圓滾滾的小熊去丟沙包。最後他偷偷買下我看了好幾次的小花書籤送給我，還拿紙巾替我擦掉手上的紅豆餡。今天帶回家的小東西，比原本打算的多了一樣。',
    ending: '那張小花書籤被我夾進常看的書裡了。阿信說下次要換我請他吃東西，我可記著呢。'
  },
}
