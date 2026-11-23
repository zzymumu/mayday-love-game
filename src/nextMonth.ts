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
    location: '台北・電影院與遊樂場',
    invitation: [
      { kind: 'dialogue', speaker: '溫尚翊', text: '欸，妳這禮拜六有空嗎？' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '我這邊多兩張電影票，放著也是浪費，妳要不要一起去看？' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '如果妳有空啦。' },
    ],
    teasePrompt: '你想怎麼回他？',
    replyPrompt: '所以，妳到底要不要跟我去啦？',
    replyChoices: [
      { text: '好啊！電影幾點開始？', response: ['晚上七點啦，我們可以先去吃點東西。', '那就這樣說定喔。'], affection: 3, accepted: true },
      { text: '可以啊，不過抓娃娃你要負責喔。', response: ['蛤？怎麼還附帶這個條件啦。', '好啦，如果夾不到妳不准笑我。'], affection: 3, accepted: true },
      { text: '這週六可能不行欸，下次再約我好不好？', response: ['喔，好啊，沒關係啦。', '妳有空再跟我說就好。'], affection: 0, accepted: false },
    ],
    teaseChoices: [
      { text: '買多了？你原本是約誰啊？', response: ['蛤？沒有約誰啦！', '就剛好買多了，妳問題很多欸。'], affection: 3 },
      { text: '兩張？那你怎麼不找別人去？', response: ['我就問妳啊，不然咧？', '妳到底要不要去啦！'], affection: 2 },
      { text: '你該不會是特地買給我的吧？', response: ['……妳不要自己亂想。', '我只是看到場次不錯，順手買的啦。'], affection: 3 },
    ],
    activity: [
      { kind: 'narration', text: '週六下午，你照著溫尚翊傳來的地址找到電影院。他已經在售票口旁邊等著，手裡拿著兩張票和一袋爆米花。看見你走近，他先把其中一張票遞過來，還故意裝得很隨意。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '喏，妳的。差五分鐘開場，快點啦。' },
      { kind: 'dialogue', speaker: '你', text: '你不是說多買的？怎麼連爆米花都準備好了？' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '看電影本來就要吃啊，不然手要放哪裡？' },
      { kind: 'narration', text: '電影散場時，外面的天已經暗了一點。你們一邊往外走，一邊討論剛才哪一段最好笑。溫尚翊嘴上說自己早就猜到結局，卻又忍不住問你是不是也覺得中間那個轉折很扯。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '旁邊那間遊樂場好像有新機台，去不去？' },
      { kind: 'narration', text: '遊樂場裡燈光亮得有點刺眼，娃娃機前面站了幾個學生。溫尚翊先投了幾枚硬幣，第一次只夾到娃娃的耳朵，第二次連邊都沒碰到。' },
      { kind: 'dialogue', speaker: '你', text: '團長，這就是你的實力喔？' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '妳不要在旁邊講風涼話啦，我剛剛只是沒抓準。' },
      { kind: 'narration', text: '他又試了幾次，終於把一隻小小的玩偶夾了出來。明明只是抓到一個普通的娃娃，他卻像完成什麼大事一樣把它遞給你，還要你承認剛才是他比較厲害。' },
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
    activity: [
      { kind: 'narration', text: '晚上你們在夜市入口碰面。人潮比想像中多，攤販的燈一盞接一盞亮著，空氣裡混著胡椒、油炸食物和甜湯的味道。瑪莎一見到你就把手裡的零錢袋晃了晃，說今天的任務是把幾家新攤位都吃過一遍。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '走啦，先去買那個。聽說還不錯。' },
      { kind: 'narration', text: '你們一路邊走邊挑，明明說好只買一點，最後手上卻多了好幾袋。瑪莎每次都說下一攤是最後一攤，結果看到新的招牌又會停下來。' },
      { kind: 'dialogue', speaker: '你', text: '你不是說只吃一點點嗎？' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '我有說啊，是妳一直說想吃這個那個欸。' },
      { kind: 'narration', text: '走到遊戲攤前，他突然停下來，說要證明自己不是只會吃。你們玩了幾輪套圈圈，他第一次沒中還嘴硬說是圈圈太輕，第二次終於套中一個小獎品，立刻轉頭看你，等著你稱讚。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '欸，有看到吧？這個才叫技術。' },
      { kind: 'narration', text: '離開夜市時，你們手裡還剩下一小袋沒吃完的東西。瑪莎把袋子遞給你，說回去路上慢慢吃，不然等一下又要抱怨太撐。' },
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
    activity: [
      { kind: 'narration', text: '晚上你們沿著河堤慢慢走。遠處的車燈在橋面上移動，河面偶爾反出一點光，風比白天大一些。石頭把帶來的外套遞給你，自己只穿著原本那件，說走一走就不冷了。' },
      { kind: 'dialogue', speaker: '你', text: '你怎麼每次都記得帶這些東西？' },
      { kind: 'dialogue', speaker: '石錦航', text: '剛好想到而已。晚上河邊會比較涼，帶著總是比較安心。' },
      { kind: 'narration', text: '你們在欄杆旁停下來，抬頭找了好一會兒，才在城市的燈光上方看見幾顆不太明顯的星星。石頭沒有急著說話，只是陪你慢慢看，偶爾指給你看哪一顆比較亮。' },
      { kind: 'dialogue', speaker: '石錦航', text: '那邊有一顆。雖然沒有很多，但今天看得到就不錯了。' },
      { kind: 'narration', text: '後來你們坐在河堤旁的長椅上，聊起最近的課、家裡和一些沒什麼大不了的小事。偶爾有腳踏車從身後經過，鈴聲響一下，又很快遠去。' },
      { kind: 'dialogue', speaker: '石錦航', text: '下次如果天氣更好，也可以再來。' },
      { kind: 'narration', text: '回程時，他走在靠近車道的那一側，還提醒你台階有點高。明明沒有安排什麼特別的活動，這個晚上卻安安靜靜地留在了記憶裡。' },
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
    activity: [
      { kind: 'narration', text: '你到練團室時，諺明已經把需要整理的器材和清單放在桌上。他先帶你確認哪些東西要搬、哪些要留下，再把幾條導線分開放好。整個地方看起來比平常更忙，門外不時有人進來詢問時段。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '今天真的麻煩妳了。這幾箱先放到裡面，標籤朝外，等一下比較好找。' },
      { kind: 'narration', text: '你照著他的方式整理，剛開始還是有點手忙腳亂，後來慢慢抓到順序。諺明沒有一直站在旁邊盯著，只在你遇到不確定的地方時過來確認。' },
      { kind: 'dialogue', speaker: '你', text: '原來平常要顧這麼多事情喔？' },
      { kind: 'dialogue', speaker: '劉諺明', text: '場地有人使用，就要先把前後的安排確認好。不然大家來了才發現東西不齊，會更麻煩。' },
      { kind: 'narration', text: '忙到傍晚，最後一批器材也終於歸位。諺明看了一眼清單，確認沒有漏掉，才把筆放下來。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '今天真的幫了大忙。走吧，我請妳吃飯，妳應該也餓了。' },
      { kind: 'narration', text: '你們到附近的小店吃了晚餐。他沒有一直聊工作，反而問起你最近的課業，還記得你之前提過有一份報告一直找不到資料。' },
    ],
  },
  ashin: {
    title: '一起去唱KTV',
    location: '台北・KTV',
    invitation: [
      { kind: 'dialogue', speaker: '陳信宏', text: '欸，妳最近有沒有空啊？' },
      { kind: 'dialogue', speaker: '陳信宏', text: '我有點想去唱歌，想說問妳要不要一起去。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '一個人去好像有點無聊，妳如果有空再跟我說就好。' },
    ],
    replyPrompt: '妳有空的話，我們一起去，好不好？',
    replyChoices: [
      { text: '好啊！我也想唱歌了。', response: ['真的喔？那太好了。', '妳想唱什麼可以先想一下，我去訂時間。'], affection: 3, accepted: true },
      { text: '你想唱歌怎麼不找怪獸他們？', response: ['哈哈，他們有時候會比較忙嘛。', '而且我也想找妳一起唱啊。'], affection: 2, accepted: true },
      { text: '今天可能不行欸，下次我們再約。', response: ['沒關係啦，妳有空再說就好。', '下次再找時間也可以。'], affection: 0, accepted: false },
    ],
    activity: [
      { kind: 'narration', text: '你們約在KTV樓下碰面。阿信比約定時間早到了一點，手裡拿著飲料單，看到你時先笑著問你有沒有吃晚餐。進包廂後，他把點歌本推到你面前，說今天你先選，不用客氣。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '妳先點啦，我每次都會看太久，等一下又不知道要唱什麼。' },
      { kind: 'narration', text: '你們先點了幾樣小吃和飲料。阿信唱到一半會回頭問你要不要接下一首，有時候唱錯一句，自己先笑出來，還把麥克風遞給你，說這段妳比較熟。' },
      { kind: 'dialogue', speaker: '你', text: '你剛剛那句唱錯了啦！' },
      { kind: 'dialogue', speaker: '陳信宏', text: '有嗎？哈哈，我剛剛太緊張了啦。妳不要一直盯著我看嘛。' },
      { kind: 'narration', text: '唱到後來，你們開始亂點一些平常不會在別人面前唱的歌，還互相搶著按下一首。阿信笑得眼睛都彎起來，偶爾把麥克風放低，聽你唱完一整段。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '今天滿好玩的欸。下次如果妳還想唱，我們可以再來。' },
      { kind: 'narration', text: '離開時已經不早了。他陪你走到路口，確認你搭車的方向沒錯，才揮手跟你說再見。' },
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

export const nextMonthFreeChatOpeners: Record<NextMonthCharacterId, NextMonthChatOpening[]> = {
  wen: [
    { text: '你今天忙完了沒？我剛剛回家才發現腳好酸。', response: '剛忙完啦。妳今天走很多路喔？回去先坐一下，不要又忙著整理東西。', affection: 2 },
    { text: '我剛剛看到一個很好笑的東西，第一個就想到你。', response: '什麼東西？妳先講，我聽聽看。', affection: 3 },
    { text: '今天的傳單是不是還有剩？我是不是可以帶幾張回家？', response: '有啦，妳要拿就拿。只是不要拿回去當草稿紙喔。', affection: 1 },
  ],
  masa: [
    { text: '我今天回家才發現，買的東西好像有點太多了。', response: '妳又買了什麼？先說好，不要叫我幫妳拿。', affection: 2 },
    { text: '欸，我剛剛想到一件小時候的事。', response: '真的假的？妳這次又想到什麼了？', affection: 3 },
    { text: '你今天是不是又吃了很多東西？', response: '妳怎麼一開口就在管我吃什麼啦？', affection: 1 },
  ],
  ashin: [
    { text: '我剛剛回家了～今天走到腳有點酸。你呢？', response: '我也剛到家欸。妳先坐一下啦，今天是不是走了滿多路？', affection: 3 },
    { text: '我剛剛整理包包，發現裡面有一張不知道哪來的傳單哈哈。', response: '哈哈，妳是不是今天拿太多了？我剛剛也在包包裡找到一張。', affection: 2 },
    { text: '你今天晚餐吃什麼？我現在有點餓。', response: '我剛剛隨便吃了一點。妳還沒吃喔？要記得吃東西欸。', affection: 1 },
  ],
  stone: [
    { text: '我回到家了，今天好像一直在走來走去。', response: '到家就好。妳先休息一下，今天人多，應該滿累的。', affection: 3 },
    { text: '我剛剛發現飲料忘在包包裡，還好沒有打翻。', response: '那就好，包包裡如果有紙或筆記就麻煩了。', affection: 2 },
    { text: '你今天回去之後還要忙嗎？', response: '還有一點事情要整理，不過不急。妳呢？', affection: 1 },
  ],
  yanming: [
    { text: '今天終於忙完了！你那邊還順利嗎？', response: '差不多都整理好了，謝謝妳今天幫忙。妳回去路上還順利嗎？', affection: 3 },
    { text: '我剛剛想到今天有個地方好像放錯了。', response: '妳說哪一個？如果是器材的話，我明天再確認一下。', affection: 2 },
    { text: '你今天有沒有記得吃飯啊？', response: '有，今天有按時吃。妳也要記得照顧自己。', affection: 1 },
  ],
}

export const nextMonthFreeChatScripts: Record<NextMonthCharacterId, NextMonthChatRound[]> = {
  wen: [
    { incoming: '妳今天回去之後有沒有先休息？我看妳白天一直在跑來跑去。', choices: [
      { text: '有啦，我現在已經躺在床上了。', response: ['那就好，今天辛苦妳了。', '明天不要又一早跑來學校。'], affection: 2, nextIncoming: '對了，今天有個新生問了我好幾次社團平常在做什麼。' },
      { text: '沒有，我還在整理今天拿回來的東西。', response: ['妳也太有精神了吧。', '先放著啦，明天再整理也不會怎樣。'], affection: 3, nextIncoming: '對了，今天有個新生問了我好幾次社團平常在做什麼。' },
      { text: '你是不是也還沒休息？', response: ['我剛坐下來而已啦。', '妳不要轉移話題，先顧好自己。'], affection: 1, nextIncoming: '今天有個新生問了我好幾次社團平常在做什麼。' },
    ] },
    { incoming: '對了，今天有個新生問了我好幾次社團平常在做什麼。', choices: [
      { text: '你有沒有好好介紹？不要只說來彈吉他。', response: ['我有講啦，還介紹了平常會做的活動。', '妳以為我只會彈吉他喔？'], affection: 2, nextIncoming: '最近學校的報告是不是很多？妳上次說那份弄完了沒？' },
      { text: '你是不是講到自己都忘記時間？', response: ['哪有，我有看時間。', '只是那個學弟問得比較仔細。'], affection: 3, nextIncoming: '最近學校的報告是不是很多？妳上次說那份弄完了沒？' },
      { text: '那他有沒有報名？', response: ['有啊，填完表就走了。', '希望他是真的有興趣，不是被佑達嚇到才填的。'], affection: 1, nextIncoming: '妳上次說的報告弄完了沒？' },
    ] },
    { incoming: '最近學校的報告是不是很多？妳上次說那份弄完了沒？', choices: [
      { text: '快了！我終於找到資料了。', response: ['那就好，至少有進度了。', '剩下的慢慢弄，不要熬太晚。'], affection: 3, nextIncoming: '妳平常壓力大的時候都怎麼放鬆？' },
      { text: '還沒啦，我現在看到那份報告就頭痛。', response: ['哈哈，那妳先做一小段就好。', '不要一直拖到最後一天。'], affection: 2, nextIncoming: '妳平常壓力大的時候都怎麼放鬆？' },
      { text: '你要不要幫我寫？我請你喝飲料。', response: ['妳想得美。', '飲料可以，報告自己寫。'], affection: 1, nextIncoming: '妳平常壓力大的時候都怎麼放鬆？' },
    ] },
    { incoming: '妳平常壓力大的時候都怎麼放鬆？', choices: [
      { text: '找朋友聊天，或是出去走走。', response: ['這樣不錯啊，總比一直悶著好。', '有空就出去透透氣。'], affection: 3, nextIncoming: '那下次妳如果想出去走走，可以先問我有沒有空。' },
      { text: '吃東西！吃完就覺得人生又有希望了。', response: ['哈哈，妳真的很愛吃。', '那下次找一家新的店去試試看。'], affection: 2, nextIncoming: '那下次妳如果想出去走走，可以先問我有沒有空。' },
      { text: '睡覺，什麼都不想管。', response: ['這個也很有效啦。', '不過不要睡過頭，隔天還有課。'], affection: 1, nextIncoming: '那下次妳如果想出去走走，可以先問我有沒有空。' },
    ] },
    { incoming: '那下次妳如果想出去走走，可以先問我有沒有空。', choices: [
      { text: '好啊，那你不可以說沒空。', response: ['妳先問再說啦。', '如果時間可以，我就陪妳去。'], affection: 3 },
      { text: '你這樣算不算在約我？', response: ['蛤？妳不要什麼都拿來問啦。', '……反正有空就可以一起出去啊。'], affection: 2 },
      { text: '好，我記下來了。', response: ['知道了啦。', '妳也早點睡，明天見。'], affection: 1 },
    ] },
  ],
  masa: [
    { incoming: '妳今天回家有沒有把東西放好？不要又全部丟在椅子上。', choices: [
      { text: '你怎麼知道我都放椅子上？', response: ['猜的啊，妳看起來就很像會這樣。', '不然妳現在敢不敢拍給我看？'], affection: 2, nextIncoming: '我剛剛回家被我媽叫去買東西，結果差點忘記要買什麼。' },
      { text: '有啦，我今天很勤勞。', response: ['真的假的？太陽從西邊出來喔。', '那我是不是要鼓掌一下？'], affection: 3, nextIncoming: '我剛剛回家被我媽叫去買東西，結果差點忘記要買什麼。' },
      { text: '沒有，等一下再整理。', response: ['我就知道。', '妳真的很會拖欸。'], affection: 1, nextIncoming: '我剛剛回家被我媽叫去買東西，結果差點忘記要買什麼。' },
    ] },
    { incoming: '我剛剛回家被我媽叫去買東西，結果差點忘記要買什麼。', choices: [
      { text: '你是不是走到店裡才發現忘記？', response: ['對啊，站在那邊想超久。', '最後還打電話回家問。'], affection: 3, nextIncoming: '妳小時候也常常忘東忘西，還記得嗎？' },
      { text: '哈哈哈哈，你也有今天。', response: ['妳笑什麼啦，誰沒有忘記過。', '妳以前更誇張好不好。'], affection: 2, nextIncoming: '妳小時候也常常忘東忘西，還記得嗎？' },
      { text: '下次我幫你寫清單。', response: ['不用啦，我又不是小朋友。', '不過妳要寫也可以，反正我不一定會照著買。'], affection: 1, nextIncoming: '妳小時候也常常忘東忘西，還記得嗎？' },
    ] },
    { incoming: '妳小時候也常常忘東忘西，還記得嗎？', choices: [
      { text: '我哪有！你不要亂講。', response: ['妳有啊，還把東西放我家忘記拿回去。', '我那時候還幫妳收著欸。'], affection: 3, nextIncoming: '最近有沒有什麼想吃的？' },
      { text: '真的假的？我完全不記得了。', response: ['妳當然不記得，都是我在幫妳收尾。', '所以我才記得很清楚。'], affection: 2, nextIncoming: '最近有沒有什麼想吃的？' },
      { text: '你是不是又想翻我黑歷史？', response: ['哈哈，被妳發現了。', '放心啦，今天先不講。'], affection: 1, nextIncoming: '最近有沒有什麼想吃的？' },
    ] },
    { incoming: '最近有沒有什麼想吃的？', choices: [
      { text: '我想吃冰！', response: ['現在天氣有點冷欸。', '不過妳想吃的話，改天還是可以去。'], affection: 3, nextIncoming: '好啦，今天先不吵妳了。' },
      { text: '想吃你上次說的那家麵店。', response: ['那家喔？可以啊，找一天去。', '這次不要又讓妳等太久。'], affection: 2, nextIncoming: '好啦，今天先不吵妳了。' },
      { text: '我還沒想到，想到再跟你說。', response: ['好啦，妳慢慢想。', '反正吃的東西不怕沒得選。'], affection: 1, nextIncoming: '好啦，今天先不吵妳了。' },
    ] },
    { incoming: '好啦，今天先不吵妳了。', choices: [
      { text: '你哪有吵，我還滿喜歡跟你聊天的。', response: ['……妳今天真的很會講欸。', '好啦，晚安。'], affection: 3 },
      { text: '那你早點睡，不要又被阿姨叫起來。', response: ['知道啦，妳也是。', '明天再聊。'], affection: 2 },
      { text: '晚安啦，瑪莎。', response: ['晚安啦。', '不要又熬夜。'], affection: 1 },
    ] },
  ],
  ashin: [
    { incoming: '妳今天回家之後有沒有先吃點東西？', choices: [
      { text: '有啊，我剛剛還吃了一大碗。', response: ['那就好，我剛剛還怕妳忙到忘記吃飯。', '吃飽一點比較有精神。'], affection: 3, nextIncoming: '我今天回家才發現，外套口袋裡還有一張小攤位的折價券。' },
      { text: '還沒欸，我現在才想到。', response: ['欸，那妳先去找點東西吃啦。', '不用急著回我，吃完再說也可以。'], affection: 2, nextIncoming: '我今天回家才發現，外套口袋裡還有一張小攤位的折價券。' },
      { text: '你是不是也還沒吃？', response: ['我有吃啦，妳不要擔心。', '不過妳這樣問，我有點開心欸。'], affection: 1, nextIncoming: '我今天回家才發現，外套口袋裡還有一張小攤位的折價券。' },
    ] },
    { incoming: '我今天回家才發現，外套口袋裡還有一張小攤位的折價券。', choices: [
      { text: '哈哈哈，你是不是忘記拿出來了？', response: ['對啊，剛剛洗手才摸到。', '還好沒有跟著衣服一起洗掉。'], affection: 3, nextIncoming: '妳平常會把小票根或折價券留下來嗎？' },
      { text: '那張還能用嗎？', response: ['我看了一下，還沒過期。', '下次經過就可以拿去用。'], affection: 2, nextIncoming: '妳平常會把小票根或折價券留下來嗎？' },
      { text: '你是不是常常把東西塞口袋忘記？', response: ['有時候啦，尤其是小小張的東西。', '妳不要把我講得那麼迷糊喔。'], affection: 1, nextIncoming: '妳平常會把小票根或折價券留下來嗎？' },
    ] },
    { incoming: '妳平常會把小票根或折價券留下來嗎？', choices: [
      { text: '會啊，有時候看到就會想起那天去哪裡。', response: ['我也是欸。', '有些東西明明很小，過一陣子看到還是會想起來。'], affection: 3, nextIncoming: '妳最近在學校有沒有遇到什麼好玩的事？' },
      { text: '不會，我通常都直接丟掉。', response: ['哈哈，那妳包包應該比較不會亂。', '我有時候也會忘記清。'], affection: 2, nextIncoming: '妳最近在學校有沒有遇到什麼好玩的事？' },
      { text: '看心情，有時候留著有時候就丟了。', response: ['這樣也很好啊，不用什麼都留。', '想留的再收起來就好。'], affection: 1, nextIncoming: '妳最近在學校有沒有遇到什麼好玩的事？' },
    ] },
    { incoming: '妳最近在學校有沒有遇到什麼好玩的事？', choices: [
      { text: '有啊，昨天上課有人把老師叫錯名字。', response: ['真的假的？那老師有沒有生氣？', '我光想就覺得很好笑。'], affection: 3, nextIncoming: '下次妳遇到好玩的事，也可以再跟我說。' },
      { text: '最近都在忙報告，好像沒什麼特別的。', response: ['那也很辛苦欸。', '忙完之後記得給自己放個假。'], affection: 2, nextIncoming: '下次妳遇到好玩的事，也可以再跟我說。' },
      { text: '有啊，不過我先保密。', response: ['欸，還要保密喔？', '好啦，那我下次再問妳。'], affection: 1, nextIncoming: '下次妳遇到好玩的事，也可以再跟我說。' },
    ] },
    { incoming: '下次妳遇到好玩的事，也可以再跟我說。', choices: [
      { text: '好啊，你也要跟我分享你的。', response: ['好啊，我想到就傳給妳。', '妳也不要嫌我講太多喔。'], affection: 3 },
      { text: '那你要負責聽我抱怨。', response: ['哈哈，可以啊。', '不過如果是太累的事，還是要記得休息。'], affection: 2 },
      { text: '你會不會覺得我很吵？', response: ['不會啦，怎麼會。', '妳想到什麼就說啊。'], affection: 1 },
    ] },
  ],
  stone: [
    { incoming: '妳今天回家後有沒有把外套穿好？晚上風有點大。', choices: [
      { text: '有啦，我已經換上厚的了。', response: ['那就好，最近晚上真的比較涼。', '不要為了方便就穿太少。'], affection: 3, nextIncoming: '我剛剛整理桌子，找到上次忘記收起來的便條紙。' },
      { text: '你怎麼還記得這種小事？', response: ['剛好想到而已。', '今天走了一整天，怕妳回去會冷。'], affection: 2, nextIncoming: '我剛剛整理桌子，找到上次忘記收起來的便條紙。' },
      { text: '我現在還不冷啦。', response: ['好，那就好。', '如果晚點覺得冷，記得加件衣服。'], affection: 1, nextIncoming: '我剛剛整理桌子，找到上次忘記收起來的便條紙。' },
    ] },
    { incoming: '我剛剛整理桌子，找到上次忘記收起來的便條紙。', choices: [
      { text: '上面寫了什麼？', response: ['是之前記的一些待辦，差點忘記。', '還好今天有整理到。'], affection: 2, nextIncoming: '妳平常會不會把事情都寫在紙上？' },
      { text: '你是不是很常整理東西？', response: ['有空就會整理一下。', '不然東西一直堆著，之後更難找。'], affection: 3, nextIncoming: '妳平常會不會把事情都寫在紙上？' },
      { text: '我桌上現在還有一堆紙，哈哈。', response: ['那妳有空也整理一下吧。', '不用一次整理完，先分一小疊就好。'], affection: 1, nextIncoming: '妳平常會不會把事情都寫在紙上？' },
    ] },
    { incoming: '妳平常會不會把事情都寫在紙上？', choices: [
      { text: '會啊，不然我真的會忘記。', response: ['我也是。', '寫下來之後比較不會一直記掛著。'], affection: 3, nextIncoming: '最近有沒有哪件事讓妳覺得很開心？' },
      { text: '不會，我都靠腦袋記。', response: ['那妳記性應該不錯。', '不過重要的事還是寫一下比較保險。'], affection: 2, nextIncoming: '最近有沒有哪件事讓妳覺得很開心？' },
      { text: '想到才寫，常常寫完就忘記放哪裡。', response: ['哈哈，那妳可能需要固定放在一個地方。', '不然真的很容易找不到。'], affection: 1, nextIncoming: '最近有沒有哪件事讓妳覺得很開心？' },
    ] },
    { incoming: '最近有沒有哪件事讓妳覺得很開心？', choices: [
      { text: '有啊，今天逛校園就滿開心的。', response: ['那就好。', '偶爾有這種不趕時間的日子，滿好的。'], affection: 3, nextIncoming: '希望妳最近都能有這樣的小空檔。' },
      { text: '暫時想不到欸，最近都在忙。', response: ['那妳先把手上的事情慢慢做完。', '忙完之後再安排一點自己喜歡的事。'], affection: 2, nextIncoming: '希望妳最近都能有這樣的小空檔。' },
      { text: '有人請我吃東西就會很開心。', response: ['哈哈，這個目標很實際。', '下次有機會再一起去吃。'], affection: 1, nextIncoming: '希望妳最近都能有這樣的小空檔。' },
    ] },
    { incoming: '希望妳最近都能有這樣的小空檔。', choices: [
      { text: '那下次也要找你一起。', response: ['好啊，有空就一起走走。', '妳也要記得留時間給自己。'], affection: 3 },
      { text: '你也是，不要一直忙。', response: ['我會的，謝謝妳。', '妳也早點休息。'], affection: 2 },
      { text: '好啦，知道了。', response: ['嗯，晚安。', '明天再聊。'], affection: 1 },
    ] },
  ],
  yanming: [
    { incoming: '今天回去之後還順利嗎？有沒有覺得太累？', choices: [
      { text: '還好，今天其實滿充實的。', response: ['那就好。', '今天活動人多，回去休息一下比較好。'], affection: 3, nextIncoming: '我剛剛把今天的清單重新整理了一遍。' },
      { text: '有一點累，不過還可以。', response: ['那妳今晚就早點休息。', '明天不要排太多事情。'], affection: 2, nextIncoming: '我剛剛把今天的清單重新整理了一遍。' },
      { text: '我現在只想躺著不動。', response: ['哈哈，那就先好好休息。', '今天辛苦妳了。'], affection: 1, nextIncoming: '我剛剛把今天的清單重新整理了一遍。' },
    ] },
    { incoming: '我剛剛把今天的清單重新整理了一遍。', choices: [
      { text: '你真的很有條理欸。', response: ['習慣了，事情多的時候不記下來很容易漏。', '整理好之後也比較安心。'], affection: 3, nextIncoming: '妳平常做報告會先列大綱嗎？' },
      { text: '有沒有發現我哪裡做錯？', response: ['沒有，妳今天幫忙的地方都做得很好。', '不用一直擔心自己有沒有弄錯。'], affection: 2, nextIncoming: '妳平常做報告會先列大綱嗎？' },
      { text: '我看到清單就頭痛。', response: ['哈哈，那妳可以先列最重要的幾項。', '不用把所有事情一次寫完。'], affection: 1, nextIncoming: '妳平常做報告會先列大綱嗎？' },
    ] },
    { incoming: '妳平常做報告會先列大綱嗎？', choices: [
      { text: '會啊，先列出來比較不會亂。', response: ['這樣很好，後面比較容易補內容。', '也比較知道自己還缺什麼。'], affection: 3, nextIncoming: '如果妳最近有事情卡住，也可以跟我說。' },
      { text: '不會，我通常想到哪裡寫到哪裡。', response: ['那也可以，不過最後記得整理一下順序。', '不然讀的人可能會跟不上。'], affection: 2, nextIncoming: '如果妳最近有事情卡住，也可以跟我說。' },
      { text: '看老師要求，有時候很隨便。', response: ['哈哈，至少要先看清楚題目。', '不然寫完才發現方向不對就麻煩了。'], affection: 1, nextIncoming: '如果妳最近有事情卡住，也可以跟我說。' },
    ] },
    { incoming: '如果妳最近有事情卡住，也可以跟我說。', choices: [
      { text: '好啊，那我下次真的要問你了。', response: ['沒問題，能幫忙的我會盡量幫。', '不過也不要什麼都自己扛著。'], affection: 3, nextIncoming: '今天謝謝妳，早點休息。' },
      { text: '我只是偶爾抱怨一下啦。', response: ['抱怨也沒關係。', '有時候說出來會比較輕鬆。'], affection: 2, nextIncoming: '今天謝謝妳，早點休息。' },
      { text: '那你也可以跟我抱怨啊。', response: ['哈哈，好。', '有時候我也會需要有人聽我說幾句。'], affection: 1, nextIncoming: '今天謝謝妳，早點休息。' },
    ] },
    { incoming: '今天謝謝妳，早點休息。', choices: [
      { text: '今天也謝謝你照顧大家。', response: ['大家一起幫忙才順利。', '晚安，明天也要加油。'], affection: 3 },
      { text: '你也不要忙到太晚。', response: ['我會注意的，謝謝妳提醒。', '妳先休息。'], affection: 2 },
      { text: '晚安，諺明哥。', response: ['晚安。', '有需要再傳訊息給我。'], affection: 1 },
    ] },
  ],
}

export const nextMonthChatDiary: Record<NextMonthCharacterId, string> = {
  wen: '晚上回家後還是忍不住找溫尚翊聊了幾句。他問我今天有沒有先休息，還記得我白天一直跑來跑去。明明自己忙得要命，還要管我有沒有坐下來。後來聊到報告，我差點想把整份丟給他寫，當然被拒絕了。這個人真的很會管東管西。',
  masa: '晚上跟瑪莎聊了一下。他回家被阿姨叫去買東西，結果站在店裡想半天還是忘記要買什麼，笑死。後來又翻出我小時候忘東忘西的事來講，明明自己也會忘記，還好意思笑我。跟他聊天真的很容易歪樓。',
  ashin: '晚上找阿信聊了幾句。他先問我有沒有吃東西，後來講到外套口袋裡忘記拿出來的折價券，還問我最近在學校有沒有遇到什麼好玩的事。沒有一直聊音樂也可以聊很久欸，而且他講話真的很軟，聽了心情會變好。',
  stone: '晚上跟石頭聊了一下。他提醒我最近晚上比較涼，還說自己整理桌子時找到一張忘記收起來的便條紙。後來我們聊到平常怎麼安排事情、最近有沒有什麼開心的小事。跟他說話很舒服，不用急著找話題。',
  yanming: '晚上找諺明哥聊天。他又把今天的清單整理了一遍，還問我平常做報告會不會先列大綱。明明只是隨便聊聊，他還是很認真地給我建議。不過他也說有事情卡住可以跟他講，感覺滿可靠的。',
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
