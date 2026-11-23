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
      { text: '兩張？那你怎麼不找別人去？', response: ['我就問妳啊，不然咧？', '妳到底要不要去啦！'], affection: 2 },
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
  { kind: 'narration', text: '十二月十四日，星期六。早上八點多，你抱著一疊傳單走進台大校園。平常熟悉的路今天到處都是指示牌，學生會在路口擺了桌子，社團攤位一個接一個，還沒走到活動廣場就已經聽見有人在試音。' },
  { kind: 'narration', text: '椰風搖滾社的攤位在廣場靠裡面的位置。溫尚翊蹲在桌子旁邊整理電線，旁邊放著幾把吉他和一疊報名表。看見你來，他先抬頭看了眼時間。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '欸，妳來啦？不是叫妳九點再來就好？' },
  { kind: 'dialogue', speaker: '你', text: '你昨天不是說八點半開始準備？' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '我是說我們八點半開始準備，又沒有叫妳這麼早來。吃早餐了沒？' },
  { kind: 'narration', text: '你還沒回答，錢佑達已經拎著一大袋早餐從另一頭跑過來，遠遠就開始喊。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '欸欸欸！你們在這裡喔！我找超久欸！' },
  { kind: 'dialogue', speaker: '瑪莎', text: '你不是有看指示牌？到底是怎麼找不到的？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '我走到一半看到有人在跳舞，就停下來看了一下，然後忘記自己要去哪裡了啊！' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '你不要一大早就添亂啦。' },
  { kind: 'narration', text: '諺明提著工具袋過來，先確認音箱和電源；石頭把幾瓶飲料放到桌邊，提醒大家記得喝水；瑪莎一邊嫌佑達吵，一邊還是幫忙把桌子搬正。阿信則拿著整理好的傳單，笑著跟你打招呼。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '早安～妳今天也來幫忙喔？辛苦了欸。剛剛有吃東西嗎？' },
  { kind: 'narration', text: '六個人一下子把小小的攤位擠得滿滿的。溫尚翊負責音箱和吉他，諺明看器材，石頭整理桌面，阿信幫忙接待，瑪莎和佑達則一邊鬥嘴一邊搬東西。你被分到整理報名表和發傳單，忙得連水都忘了喝。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '妳先幫我把這疊報名表分好，等一下人多會更忙。弄完再去逛，知道嗎？' },
  { kind: 'narration', text: '你看著他們各自忙碌的樣子，忽然覺得這個週末應該會很熱鬧。' },
]

export const nextMonthOpenDayRoutes: Record<NextMonthCharacterId, NextMonthOpenDayRoute> = {
  wen: {
    label: '溫尚翊', subtitle: '跟社團負責人出去透透氣', location: '台灣大學・校園開放日', title: '忙裡偷閒的一小段路', kicker: '上午・活動廣場附近',
    blocks: [
      { kind: 'narration', text: '攤位前的人潮稍微少了一點，溫尚翊把最後一疊傳單交給阿信，才轉頭問你要不要陪他去校門口拿另一箱社團海報。說是拿東西，其實那段路不近不遠，剛好可以離開攤位透口氣。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '走啦，陪我去拿一下海報。順便讓妳休息一下，不然妳從早上忙到現在都沒停。' },
    ],
    rounds: [
      { scene: '你們沿著活動廣場旁的小路往校門口走。溫尚翊一手拿著海報筒，另一手替你把快被風吹走的傳單壓住。', prompt: '妳今天怎麼這麼認真？我看妳剛剛一直在幫忙欸。', choices: [
        { text: '我怕你一個人忙不過來啊。', response: ['哪有那麼誇張，我們又不是只有我一個人。', '……不過妳有來幫忙，是真的輕鬆很多。'], affection: 3 },
        { text: '因為你昨天講得很可憐啊。', response: ['我哪有講得很可憐？', '妳不要自己加油添醋啦。'], affection: 2 },
        { text: '我只是想看看你們社團到底有多忙。', response: ['現在看到了吧？', '等一下回去還有一堆人要問東問西。'], affection: 1 },
      ] },
      { scene: '拿到海報後，你們沒有立刻回攤位。溫尚翊看見前面有個小攤位在賣熱飲，問你要不要先買一杯。', prompt: '妳要喝什麼？我去買。', choices: [
        { text: '我要跟你一樣的。', response: ['妳都不先問是什麼喔？', '好啦，那我買兩杯。'], affection: 3 },
        { text: '不用啦，我自己去買就好。', response: ['我順便而已，妳站著等就好。', '不要每次都跟我客氣。'], affection: 2 },
        { text: '你先說你要喝什麼，我再決定。', response: ['熱奶茶啊，今天早上有點冷。', '妳真的很會挑。'], affection: 1 },
      ] },
      { scene: '你們坐在路邊的矮牆旁休息。遠處傳來社團表演的聲音，溫尚翊低頭看了眼手上的海報，像是突然想到什麼。', prompt: '妳覺得我們社團的攤位怎麼樣？會不會很亂？', choices: [
        { text: '不會啊，感覺很有你們的風格。', response: ['什麼風格？亂七八糟的風格喔？', '哈哈，好啦，至少妳沒有嫌棄。'], affection: 3 },
        { text: '有一點，不過很熱鬧。', response: ['我就知道妳會這樣說。', '等一下回去我再把桌子整理一下。'], affection: 2 },
        { text: '我覺得你們應該再做一個更大的招牌。', response: ['欸，這個建議可以。', '回去問問大家要不要改。'], affection: 1 },
      ] },
      { scene: '喝完熱飲，你們沿著另一條小路慢慢往回走。溫尚翊把海報筒換到另一隻手，問起你最近的課。', prompt: '最近是不是快要忙期末了？妳的報告弄完了沒？', choices: [
        { text: '還沒啦，有一份我完全不想碰。', response: ['哈哈，妳至少要先打開來看吧。', '不然最後又要熬夜趕。'], affection: 2 },
        { text: '差不多了，你呢？練團跟學校還忙得過來嗎？', response: ['還可以啦，大家分一分就好。', '妳也不要只顧著問我，自己的事情先弄好。'], affection: 3 },
        { text: '你要不要幫我寫？我可以付你飲料。', response: ['蛤？妳想得美。', '飲料先欠著，報告自己寫。'], affection: 1 },
      ] },
      { scene: '快走回攤位時，溫尚翊把手裡剩下的傳單分了一半給你，自己則把海報筒夾在手臂下。', prompt: '等一下回去又要忙了，妳還要不要再逛一下？', choices: [
        { text: '等你忙完再說，我可以幫忙。', response: ['妳今天已經幫很多了啦。', '等一下我找時間帶妳去吃東西。'], affection: 3 },
        { text: '好啊，但你要陪我去看表演。', response: ['好啦，等這波人潮過去。', '妳先把想看的時間記一下。'], affection: 2 },
        { text: '不要，我要回去監督你們。', response: ['妳到底是來幫忙還是來監工的？', '好啦，回去再讓妳檢查。'], affection: 1 },
      ] },
    ],
    ending: [
      { kind: 'narration', text: '回到攤位時，佑達正努力把一疊傳單排成整齊的樣子，瑪莎站在旁邊懷疑他是不是把順序弄反了。溫尚翊把海報交給諺明，接著看了你一眼，像是想確認你剛才有沒有真的休息到。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '等一下忙完再帶妳去吃東西，妳不要又說不餓。' },
    ],
  },
  masa: {
    label: '蔡昇晏', subtitle: '一起逛社團攤位', location: '台灣大學・活動廣場', title: '每一攤都想看一下', kicker: '上午・社團活動區',
    blocks: [
      { kind: 'narration', text: '瑪莎看你把報名表整理好，立刻把手上的工作交給石頭，說要帶你去看看其他攤位。嘴上說只是走一圈，腳步卻已經往最熱鬧的方向去了。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '走啦，難得來一次，不要一直待在我們攤位。' },
    ],
    rounds: [
      { scene: '你們經過一排社團攤位，有人正在教人打鼓，有人拿著傳單到處拉人。瑪莎停在一個桌遊攤前面。', prompt: '欸，這個看起來滿好玩的，要不要試一下？', choices: [
        { text: '好啊！我想看看你會不會輸。', response: ['妳先不要太早下結論。', '等一下輸的人不要哭喔。'], affection: 3 },
        { text: '可以啊，不過規則你先看。', response: ['知道啦，我來研究。', '妳就負責等一下不要耍賴。'], affection: 2 },
        { text: '不要啦，我怕你玩到不肯走。', response: ['哪有，我才沒那麼幼稚。', '……好啦，玩一局就走。'], affection: 1 },
      ] },
      { scene: '玩完桌遊，你們走到小吃攤前。瑪莎看著菜單，突然問你想吃哪一個。', prompt: '妳要吃什麼？不要又說都可以。', choices: [
        { text: '我想吃那個炸的，看起來很香。', response: ['好，那我去排。', '妳先找地方站，不要被人潮擠到。'], affection: 3 },
        { text: '你挑啊，我相信你的眼光。', response: ['妳真的很會把事情丟給別人。', '好啦，我挑一個不會踩雷的。'], affection: 2 },
        { text: '我想先看看別攤，等等再回來。', response: ['妳到底要逛到什麼時候啦。', '算了，我陪妳看。'], affection: 1 },
      ] },
      { scene: '你們拿著食物往樹蔭下走，旁邊幾個學生正在拍社團宣傳照。瑪莎看了一眼，忽然想起以前的事。', prompt: '妳以前是不是也很愛參加這種活動？', choices: [
        { text: '對啊，我以前很愛湊熱鬧。', response: ['看得出來，妳現在也差不多。', '不過這樣也不錯，至少不會無聊。'], affection: 3 },
        { text: '看活動啦，有好玩的才會去。', response: ['這很合理。', '我也是，不然誰想站在太陽底下。'], affection: 2 },
        { text: '我比較喜歡當觀眾，不想被拉去玩。', response: ['哈哈，那妳今天怎麼跟我出來？', '放心，我不會把妳推上台。'], affection: 1 },
      ] },
      { scene: '你們經過一個小型表演區，台上的學生剛結束一段演出，台下的人拍手叫好。瑪莎把吃完的紙袋丟進垃圾桶。', prompt: '今天是不是比妳想像中熱鬧？', choices: [
        { text: '超熱鬧，而且跟你一起逛滿好玩的。', response: ['妳今天嘴巴很甜欸。', '不過我也覺得還不錯。'], affection: 3 },
        { text: '還好啦，主要是吃的很多。', response: ['我就知道妳最在意這個。', '下次再帶妳去別的地方吃。'], affection: 2 },
        { text: '有點吵，不過氣氛很好。', response: ['這種活動本來就這樣啊。', '不喜歡太吵的話，我們走旁邊一點。'], affection: 1 },
      ] },
      { scene: '回攤位的路上，瑪莎走在你旁邊，手裡還拿著剛才抽到的小貼紙。', prompt: '下次有這種活動，妳還要不要跟我一起逛？', choices: [
        { text: '要啊！下次換我帶你去吃好吃的。', response: ['真的假的？那我先記下來。', '不要到時候又說忘記喔。'], affection: 3 },
        { text: '看你下次會不會再迷路。', response: ['我今天哪有迷路？', '妳不要把佑達的事算到我頭上。'], affection: 2 },
        { text: '如果有好玩的再說。', response: ['妳還滿難約的欸。', '好啦，有好玩的我再通知妳。'], affection: 1 },
      ] },
    ],
    ending: [{ kind: 'narration', text: '你們回到攤位時，瑪莎把抽到的小貼紙貼在報名表旁邊，說這樣看起來比較有精神。溫尚翊看了一眼，嫌他亂貼，兩個人又開始拌嘴。' }],
  },
  stone: {
    label: '石錦航', subtitle: '看看學生作品展', location: '台灣大學・作品展區', title: '慢慢看也很好', kicker: '上午・作品展區',
    blocks: [
      { kind: 'narration', text: '石頭看你忙完一小段，便問你要不要去旁邊的學生作品展看看。他說攤位前面人多，剛好可以趁這段時間走走，等一下再回來幫忙。' },
      { kind: 'dialogue', speaker: '石錦航', text: '那邊有一些攝影和手工作品，妳有興趣的話我們可以去看看。' },
    ],
    rounds: [
      { scene: '展區裡掛著不少學生的照片，有校園角落、街景，也有朋友之間的合照。石頭停在一張午後操場的照片前。', prompt: '妳比較喜歡哪一張？', choices: [
        { text: '我喜歡這張操場的，光線很好看。', response: ['嗯，我也覺得這張很自然。', '沒有刻意安排什麼，反而很有感覺。'], affection: 3 },
        { text: '我喜歡那張大家一起拍的，看起來很開心。', response: ['那張也不錯。', '看得出來拍照的人跟他們很熟。'], affection: 2 },
        { text: '我都喜歡欸，很難選。', response: ['哈哈，那就慢慢看，不用急著選。', '喜歡哪張就多看一會兒。'], affection: 1 },
      ] },
      { scene: '你們走到一個手作攤位，桌上放著木頭小物和手工卡片。石頭拿起一張卡片看了看，又放回原位。', prompt: '妳平常會買這種手作的小東西嗎？', choices: [
        { text: '會啊，看到喜歡的就會想帶回家。', response: ['那妳可以慢慢挑，這些都滿特別的。', '有時候小東西放在桌上，看到心情也會好一點。'], affection: 3 },
        { text: '偶爾，通常會先想好要送誰。', response: ['這樣很好啊，收到的人應該也會很開心。', '妳很會替別人想。'], affection: 2 },
        { text: '不太會，我怕買回去不知道放哪裡。', response: ['哈哈，那就看看就好。', '不用為了買而買。'], affection: 1 },
      ] },
      { scene: '展區外有幾張椅子，你們坐下來休息。石頭把飲料放到你手邊，自己則看了看活動地圖。', prompt: '今天一直站著，妳會不會累？', choices: [
        { text: '有一點，不過這樣坐著剛剛好。', response: ['那我們多坐一下。', '等妳休息好了再回去。'], affection: 3 },
        { text: '還好啦，你呢？你也忙了一早上。', response: ['我還好，剛才有休息到。', '妳不用一直顧著別人，自己也要休息。'], affection: 2 },
        { text: '我還可以，想再去別的地方看看。', response: ['好啊，那我們再走一小段。', '如果累了就跟我說。'], affection: 1 },
      ] },
      { scene: '休息後，你們繞到校園一條比較安靜的小路。樹下有人坐著聊天，遠處傳來攤位的廣播聲。', prompt: '妳平常在台大也會來這種比較安靜的地方嗎？', choices: [
        { text: '會啊，有時候想自己待一下。', response: ['我懂，有時候安靜一下會比較舒服。', '不一定要一直跟人說話。'], affection: 3 },
        { text: '不太會，我常常一下課就趕去下一個地方。', response: ['那妳今天可以慢慢走。', '難得有空，不用把每分鐘都排滿。'], affection: 2 },
        { text: '如果有人陪我就會來。', response: ['那下次也可以一起來。', '這裡平常人不多，滿適合散步的。'], affection: 1 },
      ] },
      { scene: '你們準備回攤位時，石頭把剛才看到的作品展地圖折好，放進口袋。', prompt: '今天這樣走走，妳覺得怎麼樣？', choices: [
        { text: '很好啊，跟你一起逛很舒服。', response: ['那就好，我也覺得今天很輕鬆。', '下次有展覽，我再問妳要不要一起來。'], affection: 3 },
        { text: '下次可以再去看別的展區。', response: ['好啊，校園裡還有不少地方。', '下次我們再慢慢看。'], affection: 2 },
        { text: '還不錯，至少有休息到。', response: ['哈哈，那今天的目的也算達成了。', '回去再喝點水吧。'], affection: 1 },
      ] },
    ],
    ending: [{ kind: 'narration', text: '回到攤位時，石頭先把你手上的地圖收好，提醒你等一下別忘了拿自己的飲料。你們剛走近，就聽見佑達在問瑪莎午餐要吃什麼。' }],
  },
  yanming: {
    label: '劉諺明', subtitle: '陪他去拿活動用品', location: '台灣大學・校園各處', title: '把事情一件件做好', kicker: '上午・校園開放日',
    blocks: [
      { kind: 'narration', text: '諺明拿著一張清單走過來，說活動區另一頭還有一箱備用用品要拿，原本想自己去，但攤位暫時有人顧著，問你願不願意陪他走一趟。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '如果妳不介意的話，陪我去拿一下東西？路上也可以順便看看其他攤位。' },
    ],
    rounds: [
      { scene: '你們沿著指示牌往另一個活動區走。諺明一邊看清單，一邊確認箱子的領取位置。', prompt: '今天人真的不少，妳有沒有覺得很熱鬧？', choices: [
        { text: '很熱鬧欸，感覺每個社團都準備很多。', response: ['是啊，這種活動前面要準備不少。', '不過看到大家願意來參加，就覺得值得了。'], affection: 3 },
        { text: '有一點混亂，不過滿有趣的。', response: ['哈哈，開放日多少會這樣。', '只要把動線顧好，基本上就沒問題。'], affection: 2 },
        { text: '我剛剛差點找不到我們攤位。', response: ['那等一下回去我再帶妳走一次。', '指示牌有些被人群擋住了。'], affection: 1 },
      ] },
      { scene: '你們找到備用品，諺明把比較輕的那袋交給你，自己抱起較重的紙箱。', prompt: '這樣拿可以嗎？會不會太重？', choices: [
        { text: '可以啊，我拿得動。', response: ['好，那我們慢慢走，不用急。', '如果覺得重就跟我說。'], affection: 3 },
        { text: '有一點重，不過還好。', response: ['那我再拿一點過去。', '不要勉強，東西可以分開拿。'], affection: 2 },
        { text: '你是不是把比較重的都留給自己了？', response: ['哈哈，箱子比較重，我拿就好。', '妳拿那袋已經很幫忙了。'], affection: 1 },
      ] },
      { scene: '回程經過學生會的服務台，有幾個新生正在問路。諺明停下來幫他們指了方向，等人走遠才繼續。', prompt: '你平常是不是很常被人問事情？', choices: [
        { text: '感覺大家都很信任你欸。', response: ['可能是因為我常在場地這邊吧。', '有人問就盡量幫忙，事情會比較順。'], affection: 3 },
        { text: '你是不是很難拒絕別人？', response: ['也不是每件事都會答應啦。', '只是能幫的時候就幫一下。'], affection: 2 },
        { text: '那我以後也可以一直問你問題嗎？', response: ['可以啊，妳有問題就問。', '不過如果我在忙，可能要等一下。'], affection: 1 },
      ] },
      { scene: '你們在路邊找了個位置把箱子放下來，諺明確認清單上的數量，才終於把筆收起來。', prompt: '妳最近課業還順利嗎？期末是不是快到了？', choices: [
        { text: '還好，就是報告有點多。', response: ['那要記得分配時間，不要全部拖到最後。', '有需要找資料的話，也可以問問同學。'], affection: 2 },
        { text: '有一份報告卡住了，我還在想題目。', response: ['先把想寫的方向列出來，可能會比較清楚。', '不用一次就想出完整答案。'], affection: 3 },
        { text: '我現在只想放假，完全不想面對。', response: ['哈哈，這個心情我懂。', '不過先做一點點，之後就不會那麼趕。'], affection: 1 },
      ] },
      { scene: '你們抱著用品回到活動廣場，攤位那邊已經有人在等著領傳單。', prompt: '今天真的謝謝妳幫忙。下次如果有活動，妳還願意來嗎？', choices: [
        { text: '願意啊，今天其實滿好玩的。', response: ['那就好，妳來大家也會很開心。', '下次我會早點把工作分配好。'], affection: 3 },
        { text: '可以啊，不過要先跟我說時間。', response: ['沒問題，我會提前通知妳。', '也讓妳比較好安排自己的事。'], affection: 2 },
        { text: '要看有沒有供餐。', response: ['哈哈，這個我記下來。', '下次一定先準備吃的。'], affection: 1 },
      ] },
    ],
    ending: [{ kind: 'narration', text: '回到攤位後，諺明把用品一一放好，還替你留了一瓶水。你發現他做事真的很有條理，連這種臨時的小事都能安排得清清楚楚。' }],
  },
  ashin: {
    label: '陳信宏', subtitle: '一起逛校園開放日', location: '台灣大學・校園開放日', title: '在熱鬧裡慢慢逛', kicker: '上午・活動廣場',
    blocks: [
      { kind: 'narration', text: '阿信接待完一組來參觀的學生，正好看見你站在攤位旁邊。他把剩下的傳單交給溫尚翊，問你要不要趁人潮還沒完全湧進來，先去前面逛一圈。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '妳要不要跟我去前面看看？我剛剛看到有幾個攤位滿有趣的。' },
    ],
    rounds: [
      { scene: '你們先走到一個學生手作攤位，桌上擺著小吊飾、卡片和手工餅乾。阿信拿起一張印著校園角落的明信片看了看。', prompt: '妳會想買這種小東西回去嗎？', choices: [
        { text: '會啊，這張明信片滿可愛的。', response: ['真的喔？那妳可以挑一張喜歡的。', '我覺得這張顏色滿舒服的。'], affection: 3 },
        { text: '我通常只看，不一定會買。', response: ['哈哈，我也是欸。', '有時候看看就很開心了。'], affection: 2 },
        { text: '我比較想買吃的。', response: ['那我們等一下去找吃的。', '我剛剛有看到一攤在賣紅豆餅。'], affection: 1 },
      ] },
      { scene: '你們走到一個小遊戲攤位，攤主正在邀請路過的人試玩。阿信看了看獎品，指著最上面的小熊吊飾。', prompt: '要不要玩一次？我覺得那個小熊很可愛。', choices: [
        { text: '好啊！你幫我看看怎麼玩。', response: ['好，我先看一下規則。', '等一下如果沒中也不要笑我喔。'], affection: 3 },
        { text: '你想要那個小熊喔？', response: ['有一點啦，掛在包包上應該滿可愛的。', '不過妳喜歡的話也可以給妳。'], affection: 2 },
        { text: '不要啦，我怕玩一次就停不下來。', response: ['哈哈，那我們就看看就好。', '不然等一下真的會忘記時間。'], affection: 1 },
      ] },
      { scene: '遊戲攤旁邊有一排椅子，你們買了兩杯飲料坐下來。阿信把吸管插好，才想起你之前提過最近報告很多。', prompt: '妳最近是不是常常忙到很晚？', choices: [
        { text: '對啊，有時候回家還要繼續寫。', response: ['那妳真的要記得休息欸。', '不要每次都弄到很晚，隔天上課會很累。'], affection: 3 },
        { text: '還好啦，我最近有比較會安排時間。', response: ['那很好啊。', '有時候先做一點，後面就不會那麼慌。'], affection: 2 },
        { text: '我都靠最後一天的求生意志。', response: ['哈哈，這個聽起來好危險喔。', '妳還是稍微提早一點好了。'], affection: 1 },
      ] },
      { scene: '休息完，你們繞到一個學生社團的照片牆。照片裡有活動、旅行和一群朋友的合照。阿信看了幾張，忽然笑了。', prompt: '妳大學有沒有參加什麼社團？', choices: [
        { text: '有啊，不過最近比較少去。', response: ['是因為課業比較忙嗎？', '有空還是可以去看看，認識不同的人滿有趣的。'], affection: 3 },
        { text: '還沒有欸，我一直不知道要參加哪個。', response: ['那妳可以慢慢看，不用急。', '今天這麼多攤位，說不定會看到有興趣的。'], affection: 2 },
        { text: '我比較喜歡跟朋友到處吃東西。', response: ['哈哈，這也算一種固定活動吧。', '那妳以後可以帶我去吃妳喜歡的店。'], affection: 1 },
      ] },
      { scene: '你們慢慢走回椰風搖滾社的攤位。阿信把手裡剩下的明信片收進包包，轉頭問你今天玩得怎麼樣。', prompt: '今天這樣逛一圈，妳有沒有覺得還不錯？', choices: [
        { text: '有啊，跟你一起逛很開心。', response: ['真的喔？那我也很開心欸。', '下次如果有這種活動，我再問妳要不要一起來。'], affection: 3 },
        { text: '滿好玩的，下次可以再去別的地方。', response: ['好啊，我還有幾個地方想去看看。', '下次我們可以慢慢逛。'], affection: 2 },
        { text: '還可以啦，不過我現在有點餓了。', response: ['哈哈，那我們回去看看有沒有東西吃。', '我剛剛也有點餓了。'], affection: 1 },
      ] },
    ],
    ending: [{ kind: 'narration', text: '回到攤位時，阿信把剛才買的明信片收好，還把你挑的那張拿給你看，說這張很適合夾在課本裡。你們剛走近，溫尚翊就問你們是不是終於逛回來了。' }],
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
    invite: { incoming: '剛剛那部片，妳真的覺得結尾有那麼好猜喔？', choices: [
      { text: '有啦，前面那個細節就怪怪的。', response: ['真的假的？我還以為妳沒注意到。', '看來妳有認真看，不是只顧著吃爆米花。'], affection: 3, nextIncoming: '對了，妳上次說那份報告，現在有進度了沒？' },
      { text: '我只記得你一直偷吃我的爆米花。', response: ['蛤？我哪有！妳自己吃不完還怪我喔。', '下次各買各的，省得妳算帳。'], affection: 2, nextIncoming: '對了，妳上次說那份報告，現在有進度了沒？' },
      { text: '其實我比較在意娃娃機，電影還好。', response: ['妳今天到底是來看電影還是夾娃娃的？', '下次先講，我就直接帶妳去遊樂場。'], affection: 1, nextIncoming: '對了，妳上次說那份報告，現在有進度了沒？' },
    ] },
    'open-day': { incoming: '今天去拿海報那段路，妳有沒有真的休息到？', choices: [
      { text: '有啊，還買到熱飲，剛剛好。', response: ['那就好，妳早上一直站著發傳單。', '回去不要又忙到忘記休息。'], affection: 3, nextIncoming: '對了，妳上次說那份報告，現在有進度了沒？' },
      { text: '你明明就是想趁機偷懶吧。', response: ['我是在拿海報好不好！', '順便喘口氣不行喔？'], affection: 2, nextIncoming: '對了，妳上次說那份報告，現在有進度了沒？' },
      { text: '沒有，回去還是被你抓去繼續忙。', response: ['不然咧，攤位又不會自己顧。', '下次人少一點再讓妳休息。'], affection: 1, nextIncoming: '對了，妳上次說那份報告，現在有進度了沒？' },
    ] },
    both: { incoming: '妳今天從攤位忙到晚上看電影，現在是不是累翻了？', choices: [
      { text: '有一點，但今天很好玩。', response: ['那就好，至少沒有白忙。', '明天不要又排一堆事情，聽到沒？'], affection: 3, nextIncoming: '對了，妳上次說那份報告，現在有進度了沒？' },
      { text: '你才是吧，白天忙完晚上還陪我。', response: ['我哪有那麼弱。', '……不過今天是有點累啦。'], affection: 2, nextIncoming: '對了，妳上次說那份報告，現在有進度了沒？' },
      { text: '我現在只想躺平，誰都不要吵我。', response: ['好啦，那妳快去休息。', '手機不要拿著滑到半夜。'], affection: 1, nextIncoming: '對了，妳上次說那份報告，現在有進度了沒？' },
    ] },
    general: { incoming: '今天攤位那邊忙成那樣，妳後來有沒有逛到想看的？', choices: [
      { text: '有啊，我還看到一個很有趣的社團。', response: ['喔？哪一個？', '下次有空再去看看啊。'], affection: 3, nextIncoming: '對了，妳上次說那份報告，現在有進度了沒？' },
      { text: '沒有，光發傳單就快把我累死。', response: ['我就知道妳會這樣講。', '下次人多的時候不要站在最前面。'], affection: 2, nextIncoming: '對了，妳上次說那份報告，現在有進度了沒？' },
      { text: '我都在看你們忙，滿好笑的。', response: ['妳是來幫忙還是來看戲的？', '算了，至少妳有把傳單發完。'], affection: 1, nextIncoming: '對了，妳上次說那份報告，現在有進度了沒？' },
    ] },
  },
  masa: {
    invite: { incoming: '妳回去有沒有又餓？剛剛那袋東西到底有沒有吃完？', choices: [
      { text: '吃完了啦，你不是也吃很多。', response: ['我那是幫忙消耗，不然放著浪費。', '妳不要把責任都推給我。'], affection: 3, nextIncoming: '對了，我剛剛回家又被叫去跑腿。' },
      { text: '還剩一點，我留著明天吃。', response: ['妳確定明天還記得它？', '不要放到最後變成冰箱考古。'], affection: 2, nextIncoming: '對了，我剛剛回家又被叫去跑腿。' },
      { text: '沒有，我現在又想吃別的了。', response: ['妳的胃是沒有下班時間喔？', '好啦，下次再帶妳去找新的。'], affection: 1, nextIncoming: '對了，我剛剛回家又被叫去跑腿。' },
    ] },
    'open-day': { incoming: '剛剛桌遊最後那一局，妳是不是故意放水？', choices: [
      { text: '我才沒有，是你自己運氣好。', response: ['喔～輸了就說別人運氣好。', '妳這個藉口我給零分。'], affection: 3, nextIncoming: '對了，我剛剛回家又被叫去跑腿。' },
      { text: '你玩到一半還偷看我的牌欸！', response: ['我那是在研究規則好不好。', '妳不要亂告狀。'], affection: 2, nextIncoming: '對了，我剛剛回家又被叫去跑腿。' },
      { text: '我只是想讓你開心一下。', response: ['少來，妳明明就很想贏。', '下次再玩，我不會讓妳了。'], affection: 1, nextIncoming: '對了，我剛剛回家又被叫去跑腿。' },
    ] },
    both: { incoming: '妳今天白天陪我逛攤位，晚上又跑來夜市，體力也太好了吧。', choices: [
      { text: '是你一直說下一攤才是最後一攤欸。', response: ['我有說啊，最後一攤是指每一個當下。', '這樣有什麼問題？'], affection: 3, nextIncoming: '對了，我剛剛回家又被叫去跑腿。' },
      { text: '跟你出門就是會不小心吃很多。', response: ['妳不要怪我，明明是妳自己每攤都想試。', '不過今天吃得還不錯啦。'], affection: 2, nextIncoming: '對了，我剛剛回家又被叫去跑腿。' },
      { text: '我現在真的需要一張床。', response: ['哈哈，早叫妳不要每攤都買。', '快去休息啦，明天再抱怨。'], affection: 1, nextIncoming: '對了，我剛剛回家又被叫去跑腿。' },
    ] },
    general: { incoming: '妳有看到佑達今天找不到攤位那段嗎？我真的快笑死。', choices: [
      { text: '有啊，他怎麼可以走到一半就忘記目的地。', response: ['他看到什麼都想停下來看啊。', '我都懷疑他是來參觀不是來幫忙的。'], affection: 3, nextIncoming: '對了，我剛剛回家又被叫去跑腿。' },
      { text: '你還不是一直嫌他，結果自己也笑最大聲。', response: ['我那是被他氣笑的。', '這兩件事不一樣好不好。'], affection: 2, nextIncoming: '對了，我剛剛回家又被叫去跑腿。' },
      { text: '我覺得他滿可愛的啊。', response: ['妳跟他一樣，看到什麼都覺得可愛。', '難怪你們聊得來。'], affection: 1, nextIncoming: '對了，我剛剛回家又被叫去跑腿。' },
    ] },
  },
  ashin: {
    invite: { incoming: '剛剛從KTV出來，妳不是還說有點餓？回家有沒有再吃東西啊？', choices: [
      { text: '有啊！我又去買了鹽酥雞，哈哈。', response: ['哈哈，妳真的很會找東西吃欸。', '有吃就好啦，今天也玩得滿晚的。'], affection: 3, nextIncoming: '欸，妳最近上課還順利嗎？' },
      { text: '沒有啦，太晚了，我回家就直接洗澡了。', response: ['那也好啦，晚一點就不要吃太多。', '妳今天應該也累了吧？'], affection: 2, nextIncoming: '欸，妳最近上課還順利嗎？' },
      { text: '你不是也說餓嗎？你後來有吃東西嗎？', response: ['有啦，我回去有先弄點東西吃。', '妳不用擔心我啦，先顧好自己。'], affection: 1, nextIncoming: '欸，妳最近上課還順利嗎？' },
    ] },
    'open-day': { incoming: '今天那張校園明信片，妳有沒有好好收起來？', choices: [
      { text: '有啊，我想夾在筆記本裡。', response: ['這樣很好欸，之後翻到應該會想起今天。', '那張的顏色我也滿喜歡的。'], affection: 3, nextIncoming: '欸，妳最近上課還順利嗎？' },
      { text: '有，不過我差點忘記放哪裡。', response: ['哈哈，妳要不要先放在固定的地方？', '不然真的很容易找不到。'], affection: 2, nextIncoming: '欸，妳最近上課還順利嗎？' },
      { text: '我本來想買，後來又忘記了。', response: ['沒關係啦，下次看到喜歡的再買。', '不用每次都勉強自己帶東西回家。'], affection: 1, nextIncoming: '欸，妳最近上課還順利嗎？' },
    ] },
    both: { incoming: '今天從早上的校園活動一路忙到晚上，妳回家是不是累壞了？', choices: [
      { text: '真的欸，我一坐下來就不想動了。', response: ['哈哈，那妳先好好休息啦。', '今天跑來跑去的，回家當然會累。'], affection: 3, nextIncoming: '欸，妳最近上課還順利嗎？' },
      { text: '還好啦，就是腳有一點痠。', response: ['那明天不要又穿那雙不好走的鞋喔。', '有空就坐著休息一下。'], affection: 2, nextIncoming: '欸，妳最近上課還順利嗎？' },
      { text: '我現在只想躺平，什麼都不想管。', response: ['那就先不要管啦，明天再說。', '記得洗澡，不要直接睡著喔。'], affection: 1, nextIncoming: '欸，妳最近上課還順利嗎？' },
    ] },
    general: { incoming: '今天攤位一直有人來問東問西，妳後來有沒有找到喜歡的社團？', choices: [
      { text: '有看到幾個滿有趣的，不過還沒決定。', response: ['那可以慢慢看啊，不用急著選。', '有喜歡的活動再去試試看。'], affection: 3, nextIncoming: '欸，妳最近上課還順利嗎？' },
      { text: '我光幫忙就快沒時間逛了。', response: ['辛苦妳了啦。', '下次如果還有活動，我們可以早一點去逛。'], affection: 2, nextIncoming: '欸，妳最近上課還順利嗎？' },
      { text: '我只看到吃的攤位，哈哈。', response: ['哈哈，這也很重要啊。', '下次再找時間去吃妳剛剛沒買到的。'], affection: 1, nextIncoming: '欸，妳最近上課還順利嗎？' },
    ] },
  },
  stone: {
    invite: { incoming: '剛剛河邊那陣風，妳回去有沒有覺得冷？', choices: [
      { text: '有一點，不過你外套很有用。', response: ['那就好，還好有帶。', '回去再喝點熱的，會舒服一點。'], affection: 3, nextIncoming: '妳最近那份報告有比較順利嗎？' },
      { text: '還好啦，我沒有你想得那麼怕冷。', response: ['哈哈，好，我知道了。', '只是河邊風比較大，提醒妳一下。'], affection: 2, nextIncoming: '妳最近那份報告有比較順利嗎？' },
      { text: '你自己才要小心吧，外套都給我了。', response: ['我走一走就不冷了。', '不過謝謝妳有想到我。'], affection: 1, nextIncoming: '妳最近那份報告有比較順利嗎？' },
    ] },
    'open-day': { incoming: '剛剛作品展那張操場照片，妳後來有沒有再回去看？', choices: [
      { text: '有啊，光線真的很好看。', response: ['我也覺得，那張看起來很自然。', '沒有刻意擺姿勢的照片反而很有感覺。'], affection: 3, nextIncoming: '妳最近那份報告有比較順利嗎？' },
      { text: '我後來比較喜歡手作卡片那一區。', response: ['那邊也很不錯，東西都滿有巧思的。', '妳有挑到喜歡的嗎？'], affection: 2, nextIncoming: '妳最近那份報告有比較順利嗎？' },
      { text: '我忘記是哪張了，你下次再帶我看。', response: ['好啊，下次經過可以再去看看。', '我記得大概在哪個位置。'], affection: 1, nextIncoming: '妳最近那份報告有比較順利嗎？' },
    ] },
    both: { incoming: '今天白天看作品展，晚上又去河邊走走，妳會不會覺得行程太滿？', choices: [
      { text: '不會啊，兩個地方感覺完全不一樣。', response: ['那就好，我也覺得今天安排得剛剛好。', '有熱鬧的地方，也有安靜的時間。'], affection: 3, nextIncoming: '妳最近那份報告有比較順利嗎？' },
      { text: '有一點，不過我很喜歡河邊那段。', response: ['嗯，那段真的比較安靜。', '下次如果妳想走走，也可以再去。'], affection: 2, nextIncoming: '妳最近那份報告有比較順利嗎？' },
      { text: '我現在只想睡到明天中午。', response: ['哈哈，那妳今晚就早點睡。', '明天醒來應該就有精神了。'], affection: 1, nextIncoming: '妳最近那份報告有比較順利嗎？' },
    ] },
    general: { incoming: '今天開放日人好多，妳回去之後有沒有終於安靜下來？', choices: [
      { text: '有啊，回家之後整個人都放鬆了。', response: ['那就好，今天真的滿熱鬧的。', '偶爾安靜一下也很好。'], affection: 3, nextIncoming: '妳最近那份報告有比較順利嗎？' },
      { text: '我耳朵現在好像還聽得到音樂聲。', response: ['哈哈，今天試音真的很大聲。', '晚上應該會安靜很多。'], affection: 2, nextIncoming: '妳最近那份報告有比較順利嗎？' },
      { text: '我還想再去逛一次，剛剛有幾攤沒看到。', response: ['那可以找時間再去。', '今天人太多，有些地方確實不好逛。'], affection: 1, nextIncoming: '妳最近那份報告有比較順利嗎？' },
    ] },
  },
  yanming: {
    invite: { incoming: '今天整理器材時妳幫忙找到的轉接頭，我已經放回固定位置了。', choices: [
      { text: '很好！下次就不用再找半天了。', response: ['是啊，固定位置比較不容易弄丟。', '今天謝謝妳一起確認。'], affection: 3, nextIncoming: '妳最近期末報告的進度還好嗎？' },
      { text: '我是不是可以領一個最佳尋寶獎？', response: ['哈哈，可以，今天確實幫了不少忙。', '下次有需要再請妳當顧問。'], affection: 2, nextIncoming: '妳最近期末報告的進度還好嗎？' },
      { text: '我只是剛好看到啦，沒有那麼厲害。', response: ['能注意到細節就很好了。', '不用太客氣。'], affection: 1, nextIncoming: '妳最近期末報告的進度還好嗎？' },
    ] },
    'open-day': { incoming: '今天拿活動用品那一趟，妳手上那袋有沒有太重？', choices: [
      { text: '還好啊，你才是抱著整箱走的人。', response: ['我平常搬習慣了。', '不過下次還是分開拿比較安全。'], affection: 3, nextIncoming: '妳最近期末報告的進度還好嗎？' },
      { text: '有一點，回家手腕還有點痠。', response: ['那今晚先不要提重的東西。', '如果明天還不舒服，就多休息一下。'], affection: 2, nextIncoming: '妳最近期末報告的進度還好嗎？' },
      { text: '你是不是故意把輕的留給我？', response: ['不是故意，是重量本來就要分配好。', '讓妳拿得動比較重要。'], affection: 1, nextIncoming: '妳最近期末報告的進度還好嗎？' },
    ] },
    both: { incoming: '今天早上活動、後來又到練團室幫忙，妳應該累了吧。', choices: [
      { text: '有一點，但今天做了好多事。', response: ['那就好，至少今天很充實。', '今晚先休息，其他事情明天再處理。'], affection: 3, nextIncoming: '妳最近期末報告的進度還好嗎？' },
      { text: '你也很忙啊，還要顧兩邊。', response: ['事情分開處理就還好。', '謝謝妳有注意到。'], affection: 2, nextIncoming: '妳最近期末報告的進度還好嗎？' },
      { text: '我現在只想把鞋子脫掉。', response: ['哈哈，那先坐下來休息。', '今天走很多路，腳痠很正常。'], affection: 1, nextIncoming: '妳最近期末報告的進度還好嗎？' },
    ] },
    general: { incoming: '今天活動結束後，器材都已經歸位了。妳回家還順利嗎？', choices: [
      { text: '順利啊，回家路上還買了晚餐。', response: ['那就好，有吃東西就好。', '今天忙了一天，晚餐不要隨便省略。'], affection: 3, nextIncoming: '妳最近期末報告的進度還好嗎？' },
      { text: '有一點塞車，不過還好。', response: ['週末活動結束後通常會比較多人。', '還好妳有平安到家。'], affection: 2, nextIncoming: '妳最近期末報告的進度還好嗎？' },
      { text: '我差點坐過站，哈哈。', response: ['還好有注意到。', '下次搭車可以先設個提醒。'], affection: 1, nextIncoming: '妳最近期末報告的進度還好嗎？' },
    ] },
  },
}

export const nextMonthFreeChatScripts: Record<NextMonthCharacterId, NextMonthChatRound[]> = {
  wen: [
    { incoming: '對了，妳上次說那份報告，現在有進度了沒？', choices: [
      { text: '有啦，終於找到資料了。', response: ['那就趕快趁現在把它寫完。', '不要又拖到最後一天才在那邊哀。'], affection: 3, nextIncoming: '我今天練團時試了一段新的吉他編曲。' },
      { text: '還沒，我每次打開檔案就想關掉。', response: ['妳是有多不想寫？', '先寫一頁啦，不要一直逃避。'], affection: 2, nextIncoming: '我今天練團時試了一段新的吉他編曲。' },
      { text: '你要不要幫我寫？我請你喝飲料。', response: ['想得美，飲料拿來我也不會幫妳寫。', '妳自己的報告自己負責。'], affection: 1, nextIncoming: '我今天練團時試了一段新的吉他編曲。' },
    ] },
    { incoming: '我今天練團時試了一段新的吉他編曲。', choices: [
      { text: '真的假的？有沒有錄下來給我聽？', response: ['還沒整理好，等弄順一點再說。', '現在聽可能會被妳笑。'], affection: 3, nextIncoming: '妳最近是不是又找到什麼好吃的店？' },
      { text: '你是不是又彈到忘記時間？', response: ['哪有，我有看時間。', '只是大家討論比較久而已。'], affection: 2, nextIncoming: '妳最近是不是又找到什麼好吃的店？' },
      { text: '我只想知道你有沒有記得吃飯。', response: ['有啦，妳很煩欸。', '今天有吃，不用一直提醒。'], affection: 1, nextIncoming: '妳最近是不是又找到什麼好吃的店？' },
    ] },
    { incoming: '妳最近是不是又找到什麼好吃的店？', choices: [
      { text: '有！下次我帶你去。', response: ['先把店名傳給我，不要到時候找不到。', '如果真的好吃再考慮。'], affection: 3, nextIncoming: '好啦，我要去洗澡了，妳也早點睡。' },
      { text: '還沒有，我最近都在吃學餐。', response: ['學餐也不至於每天都一樣吧。', '偶爾出去換換口味啦。'], affection: 2, nextIncoming: '好啦，我要去洗澡了，妳也早點睡。' },
      { text: '有啊，但我不告訴你。', response: ['小氣欸，問一下也不行。', '算了，妳哪天想講再講。'], affection: 1, nextIncoming: '好啦，我要去洗澡了，妳也早點睡。' },
    ] },
    { incoming: '好啦，我要去洗澡了，妳也早點睡。', choices: [
      { text: '知道啦，你不要洗到睡著。', response: ['妳才會吧。', '手機放下，快去睡。'], affection: 3 },
      { text: '晚安，明天不要又遲到。', response: ['我哪有常常遲到？', '晚安啦。'], affection: 2 },
      { text: '好啦，掰掰。', response: ['嗯，掰。', '記得把報告打開。'], affection: 1 },
    ] },
  ],
  masa: [
    { incoming: '我剛剛回家又被叫去跑腿，真的很煩。', choices: [
      { text: '哈哈哈，你不是很會跑？', response: ['妳很想被我記仇是不是？', '下次換妳去買。'], affection: 3, nextIncoming: '我媽還叫我順便買一堆東西，清單長得要命。' },
      { text: '阿姨是不是覺得你最閒？', response: ['她可能覺得我看起來很閒。', '明明我也有自己的事要做。'], affection: 2, nextIncoming: '我媽還叫我順便買一堆東西，清單長得要命。' },
      { text: '你有沒有又忘記要買什麼？', response: ['妳不要一直記得那件事好不好！', '那次是意外。'], affection: 1, nextIncoming: '我媽還叫我順便買一堆東西，清單長得要命。' },
    ] },
    { incoming: '我媽還叫我順便買一堆東西，清單長得要命。', choices: [
      { text: '拍給我看，我幫你檢查有沒有漏。', response: ['妳是要幫忙還是要看笑話？', '算了，傳給妳看一下。'], affection: 3, nextIncoming: '妳最近有沒有在追什麼連續劇？' },
      { text: '你就照清單買啊，有這麼難嗎？', response: ['妳講得很簡單欸。', '店裡東西那麼多，誰記得住。'], affection: 2, nextIncoming: '妳最近有沒有在追什麼連續劇？' },
      { text: '我覺得你需要一個秘書。', response: ['那妳要應徵嗎？薪水很低喔。', '而且還要被我嫌。'], affection: 1, nextIncoming: '妳最近有沒有在追什麼連續劇？' },
    ] },
    { incoming: '妳最近有沒有在追什麼連續劇？', choices: [
      { text: '有啊，我最近每天都想看下一集。', response: ['這麼誇張？講來聽聽。', '不要爆雷，我還沒看。'], affection: 3, nextIncoming: '我剛剛本來想早點睡，結果又被佑達打電話。' },
      { text: '沒有欸，最近都在忙課業。', response: ['妳也太認真了吧。', '偶爾還是要休息一下。'], affection: 2, nextIncoming: '我剛剛本來想早點睡，結果又被佑達打電話。' },
      { text: '有，但你一定會嫌我看的很無聊。', response: ['妳先講，我再決定要不要嫌。', '我又沒有那麼難伺候。'], affection: 1, nextIncoming: '我剛剛本來想早點睡，結果又被佑達打電話。' },
    ] },
    { incoming: '我剛剛本來想早點睡，結果又被佑達打電話。', choices: [
      { text: '他又怎麼了啦？', response: ['問我明天要不要一起吃飯，講了半天都沒講到重點。', '我真的服了他。'], affection: 3 },
      { text: '你不要接啊，讓他自己冷靜。', response: ['我也想啊，結果他一直打。', '算了，明天再跟他算帳。'], affection: 2 },
      { text: '哈哈哈，你們兩個很吵欸。', response: ['妳現在才知道？', '好啦，我先不跟妳吵了。'], affection: 1 },
    ] },
  ],
  ashin: [
    { incoming: '欸，妳今天上課還順利嗎？有沒有遇到什麼好玩的事？', choices: [
      { text: '有啊！下課去買飲料，結果店員把我的名字聽錯了。', response: ['哈哈，怎麼會聽成那樣啦？', '妳是不是當場不知道要不要糾正他？'], affection: 3, nextIncoming: '我今天去買晚餐的時候，在店門口想了好久。' },
      { text: '還好啦，就是老師今天講得有點快。', response: ['辛苦妳了欸，筆記有來得及抄嗎？', '如果有漏掉的地方，可以再問同學喔。'], affection: 2, nextIncoming: '我今天去買晚餐的時候，在店門口想了好久。' },
      { text: '沒有欸，我今天差點睡過頭。', response: ['欸？那妳最後有趕上嗎？', '還好沒有真的遲到啦。'], affection: 1, nextIncoming: '我今天去買晚餐的時候，在店門口想了好久。' },
    ] },
    { incoming: '我今天去買晚餐的時候，在店門口想了好久，最後還是買了平常那一家。', choices: [
      { text: '你也太難決定了吧，哈哈哈。', response: ['真的啊，明明每次都說要換一家。', '結果走到門口又覺得熟悉的比較安心。'], affection: 3, nextIncoming: '妳是不是也常常這樣，想換口味又怕踩雷？' },
      { text: '那你到底吃了什麼？', response: ['雞腿飯啊，最普通的那種。', '不過今天那家青菜給得滿多的。'], affection: 2, nextIncoming: '妳是不是也常常這樣，想換口味又怕踩雷？' },
      { text: '下次我幫你選啦，不准反悔。', response: ['好啊～那我就把這個任務交給妳了。', '妳不要到時候也站在那邊選半天喔。'], affection: 1, nextIncoming: '妳是不是也常常這樣，想換口味又怕踩雷？' },
    ] },
    { incoming: '妳是不是也常常這樣，想換口味又怕踩雷？', choices: [
      { text: '對啊！每次都看很久，最後還是點一樣的。', response: ['哈哈，原來妳也一樣。', '那下次我們可以各點一種，分著吃看看啊。'], affection: 3, nextIncoming: '對了，妳最近有沒有在看什麼好看的連續劇？' },
      { text: '不會啊，我看到沒吃過的就想試試看。', response: ['那妳膽子滿大的欸。', '有踩雷的話記得跟我分享喔。'], affection: 2, nextIncoming: '對了，妳最近有沒有在看什麼好看的連續劇？' },
      { text: '我只要看到有甜點就會改變主意。', response: ['這個理由很有說服力喔。', '吃完正餐還有甜點，感覺很不錯。'], affection: 1, nextIncoming: '對了，妳最近有沒有在看什麼好看的連續劇？' },
    ] },
    { incoming: '對了，妳最近有沒有在看什麼好看的連續劇？', choices: [
      { text: '有！我最近每次都想說只看一集，結果停不下來。', response: ['哈哈，這個我懂啦。', '妳先不要熬夜追，明天還要上課喔。'], affection: 3 },
      { text: '沒有欸，最近都在忙課業。', response: ['那等忙完再找一部來看啊。', '偶爾也要留一點時間給自己放鬆。'], affection: 2 },
      { text: '有啊，但我不告訴你，怕你劇透。', response: ['好啦好啦，我不問。', '等妳看完再跟我說好不好看。'], affection: 1 },
    ] },
  ],
  stone: [
    { incoming: '妳最近那份報告有比較順利嗎？之前聽妳說卡在資料上。', choices: [
      { text: '有，終於找到幾篇可以用的資料了。', response: ['那就好，接下來應該會比較順。', '記得把資料來源先整理起來，後面比較省時間。'], affection: 3, nextIncoming: '我最近整理照片，發現有幾張一直忘記拿去洗。' },
      { text: '還是有點卡，我可能要換個方向。', response: ['如果原本的方向真的不好找，也可以試著縮小題目。', '不用急著一次決定。'], affection: 2, nextIncoming: '我最近整理照片，發現有幾張一直忘記拿去洗。' },
      { text: '我現在看到報告兩個字就頭痛。', response: ['哈哈，先休息一下也沒關係。', '等精神好一點再繼續。'], affection: 1, nextIncoming: '我最近整理照片，發現有幾張一直忘記拿去洗。' },
    ] },
    { incoming: '我最近整理照片，發現有幾張一直忘記拿去洗。', choices: [
      { text: '是之前出去玩的照片嗎？', response: ['對，有幾張光線滿好的。', '想說洗出來放在桌上。'], affection: 3, nextIncoming: '妳平常會把照片貼在房間嗎？' },
      { text: '你怎麼突然想到要整理照片？', response: ['剛好翻到以前的底片。', '有些照片放久了，看到還是會想起當時的事。'], affection: 2, nextIncoming: '妳平常會把照片貼在房間嗎？' },
      { text: '我相簿裡也有一堆還沒整理。', response: ['那可以慢慢挑，不用一次整理完。', '先把喜歡的幾張留下來就好。'], affection: 1, nextIncoming: '妳平常會把照片貼在房間嗎？' },
    ] },
    { incoming: '妳平常會把照片貼在房間嗎？', choices: [
      { text: '會啊，看到就會想起那段時間。', response: ['這樣滿好的。', '房間裡有一些自己的回憶，感覺會比較自在。'], affection: 3, nextIncoming: '最近有沒有哪件小事讓妳覺得很開心？' },
      { text: '不太會，我怕牆壁變得很亂。', response: ['那就放在相簿裡也可以。', '不一定要貼出來才算留下來。'], affection: 2, nextIncoming: '最近有沒有哪件小事讓妳覺得很開心？' },
      { text: '我都塞在抽屜裡，想到才拿出來看。', response: ['這樣也不錯啊。', '有時候突然翻到，還會有驚喜。'], affection: 1, nextIncoming: '最近有沒有哪件小事讓妳覺得很開心？' },
    ] },
    { incoming: '最近有沒有哪件小事讓妳覺得很開心？', choices: [
      { text: '今天有一段時間不用趕路，慢慢走很舒服。', response: ['這樣很好啊。', '偶爾不用趕時間，心情真的會差很多。'], affection: 3 },
      { text: '我買到一直想吃的點心了。', response: ['哈哈，那很值得開心。', '喜歡的東西有買到就好。'], affection: 2 },
      { text: '暫時想不到欸，最近都在忙。', response: ['沒關係，不用每天都要有什麼大事。', '有空就讓自己放鬆一下。'], affection: 1 },
    ] },
  ],
  yanming: [
    { incoming: '妳最近期末報告的進度還好嗎？時間安排得過來嗎？', choices: [
      { text: '有排進度，應該可以按時完成。', response: ['那很好，照著進度走就可以。', '如果中間有變動，再調整就好。'], affection: 3, nextIncoming: '我這幾天把練團室的器材清單重新整理了一次。' },
      { text: '有點趕，我還有兩份報告沒開始。', response: ['那可以先把截止日期列出來。', '先處理比較急的，不用同時想全部。'], affection: 2, nextIncoming: '我這幾天把練團室的器材清單重新整理了一次。' },
      { text: '我完全不想面對，想先放假。', response: ['哈哈，這個心情我理解。', '不過先完成一小部分，壓力會少一點。'], affection: 1, nextIncoming: '我這幾天把練團室的器材清單重新整理了一次。' },
    ] },
    { incoming: '我這幾天把練團室的器材清單重新整理了一次。', choices: [
      { text: '是不是以後找東西會快很多？', response: ['是，位置和數量都重新確認過了。', '大家照著清單收，會比較不容易漏。'], affection: 3, nextIncoming: '妳平常做事情會先安排順序嗎？' },
      { text: '你真的很習慣把事情整理得清清楚楚。', response: ['工作一多就需要這樣，不然容易忘記。', '整理好之後也比較放心。'], affection: 2, nextIncoming: '妳平常做事情會先安排順序嗎？' },
      { text: '我看到清單就覺得頭很痛。', response: ['哈哈，那妳可以先列最重要的幾件。', '不需要一開始就寫得很完整。'], affection: 1, nextIncoming: '妳平常做事情會先安排順序嗎？' },
    ] },
    { incoming: '妳平常做事情會先安排順序嗎？', choices: [
      { text: '會啊，不然很容易漏掉。', response: ['這樣很好，事情多的時候特別有用。', '也比較知道哪一件要先完成。'], affection: 3, nextIncoming: '最近有沒有想學的新東西？' },
      { text: '看情況，有時候想到什麼就先做什麼。', response: ['也可以，只要最後有確認就好。', '每個人習慣不太一樣。'], affection: 2, nextIncoming: '最近有沒有想學的新東西？' },
      { text: '我常常排了計畫又不照著做。', response: ['那就把計畫排鬆一點。', '留一些彈性，反而比較容易做到。'], affection: 1, nextIncoming: '最近有沒有想學的新東西？' },
    ] },
    { incoming: '最近有沒有想學的新東西？', choices: [
      { text: '我想學一點吉他，但還沒開始。', response: ['可以先從簡單的和弦開始。', '有興趣的話，不用急著一次學很多。'], affection: 3 },
      { text: '我想學做菜，至少不要每次都吃外面。', response: ['這個很實用。', '可以先從簡單的家常菜開始。'], affection: 2 },
      { text: '我想學怎麼早睡。', response: ['這個確實需要練習。', '可以先固定一個時間把事情收尾。'], affection: 1 },
    ] },
  ],
}

export const nextMonthChatDiary: Record<NextMonthCharacterId, string> = {
  wen: '晚上我自己先敲了溫尚翊。從白天發生的事聊起，後來又莫名其妙扯到報告、練團和吃飯。這個人講話還是一樣直接，嘴上嫌我問題很多，卻又真的會接著我的話聊下去。每次跟他講話都很容易鬥嘴。',
  masa: '晚上我主動找瑪莎聊天，果然沒幾句就開始互相吐槽。他很會抓我話裡的小漏洞，還故意把普通的小事講得很好笑。明明有時候真的很想翻白眼，結果還是被他逗到笑出來。',
  ashin: '晚上找阿信聊了幾句。從今天上課遇到的小糗事聊到晚餐，他說自己站在店門口想了半天，最後還是買了平常那家。後來又聊到最近有沒有好看的連續劇，講著講著就忘了時間。跟他聊天真的不用一直想話題，想到什麼就慢慢說，滿舒服的。',
  stone: '晚上我主動傳訊息給石頭。話題從今天的事情慢慢聊到課業、照片和一些很小的日常。他不會一直追問，也不會急著給答案，但總是記得我前面說過什麼。這樣聊天真的很舒服。',
  yanming: '晚上找諺明哥聊了幾句。他還是很有條理，聊到課業時會認真給我一些實際的建議，也會分享練團室最近在整理什麼。不是很熱鬧的聊天，但每句話都讓人覺得很踏實。',
}

export const nextMonthDiaryCopy: Record<NextMonthCharacterId, { inviteTitle: string; inviteSummary: string; openDayTitle: string; openDaySummary: string; ending: string }> = {
  wen: {
    inviteTitle: '電影票真的只是多買的嗎？',
    inviteSummary: '今天跟溫尚翊去看電影。他一直說票是多買的，問多了還會炸毛，真的很好笑。看完電影又被他拉去遊樂場抓娃娃，前幾次都沒夾到，最後終於抓出一隻小玩偶。他還一副很得意的樣子，非要我承認他很厲害。好啦，是有一點厲害。',
    openDayTitle: '椰風搖滾社今天忙翻了！',
    openDaySummary: '今天是校園開放日，一早就去椰風搖滾社幫忙。溫尚翊從早上就忙著顧攤位，嘴上一直叫大家快一點，自己卻連水都忘了喝。後來陪他去拿海報，總算有機會離開人群喘口氣。回來時大家還在吵吵鬧鬧，真的很像平常的他們。',
    ending: '今天好像一直在笑。回家之後腳有點酸，但心情很好。'
  },
  masa: {
    inviteTitle: '夜市真的逛不完欸！',
    inviteSummary: '晚上跟瑪莎去逛夜市，本來說好只吃一點，結果每看到一攤就停下來。還玩了套圈圈，他好不容易套中一個小獎品，得意得不得了。嘴巴還是很壞，不過跟他出門真的不會無聊。',
    openDayTitle: '今天跟瑪莎逛了好多攤位',
    openDaySummary: '校園開放日人好多，瑪莎帶我去看桌遊攤和小吃攤，一路上都在吐槽我選東西太慢。後來還玩了小遊戲，回攤位時又跟佑達和溫尚翊吵成一團。今天真的很熱鬧。',
    ending: '下次再跟他出去，應該還是會被他念一路吧。'
  },
  stone: {
    inviteTitle: '河堤的風有點冷',
    inviteSummary: '晚上跟石頭去河堤走走。城市的燈光映在水面上，抬頭還真的看見幾顆星星。石頭帶了外套，還記得提醒我晚上會冷。沒有安排什麼特別的事，卻覺得很舒服。',
    openDayTitle: '慢慢逛完校園開放日',
    openDaySummary: '今天跟石頭去看學生作品展，照片和手作都很有意思。他不會催我，看到喜歡的東西就一起停下來看。後來還找地方坐了一會兒，聊了些最近的生活。這樣慢慢逛真的很好。',
    ending: '有時候不用安排太多，能好好走一段路就很不錯了。'
  },
  yanming: {
    inviteTitle: '練團室的臨時小幫手',
    inviteSummary: '今天去練團室幫諺明哥整理器材。原本以為只是搬東西，結果光是收導線就有好多細節。忙完他請我吃飯，還問起我最近的報告。感覺自己真的幫上忙了，也學到不少東西。',
    openDayTitle: '今天學會好多小事',
    openDaySummary: '校園開放日跟諺明哥一起去拿活動用品，順便逛了幾個攤位。他做事真的很有條理，連臨時的事情都安排得很好。一路上也聊到我的課業，還提醒我不要把報告拖到最後。',
    ending: '今天有一點累，但覺得自己很有用，哈哈。'
  },
  ashin: {
    inviteTitle: '唱到最後都捨不得走',
    inviteSummary: '今天跟阿信去KTV唱歌。他一開始還說自己只是想找人陪，結果唱到後來比我還投入。點歌、搶麥克風、吃小點心，還笑我有幾句唱得太大聲。跟他待在一起真的很輕鬆。',
    openDayTitle: '跟阿信逛了校園開放日',
    openDaySummary: '今天跟阿信去逛校園開放日，先看了手作攤位，還玩了小遊戲。後來坐著喝飲料，聊到課業和社團的事。他講話一直都很溫柔，偶爾還會不好意思，滿可愛的。',
    ending: '今天過得好快，回家後還想起他笑的樣子。'
  },
}
