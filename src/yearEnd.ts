export type YearEndCharacterId = 'wen' | 'masa' | 'ashin' | 'stone' | 'yanming' | 'youda'
export type YearEndRouteCharacterId = Exclude<YearEndCharacterId, 'youda'>
export type YearEndStoryBlock = { kind: 'narration' | 'dialogue' | 'aside'; text: string; speaker?: string }
export type YearEndRoundChoice = {
  text: string
  response: { speaker: string; text: string }[]
  affection: Partial<Record<YearEndRouteCharacterId, number>>
}
export type YearEndRound = {
  scene?: string
  promptSpeaker: string
  prompt: string
  choices: YearEndRoundChoice[]
}
export type YearEndShoppingRoute = {
  invitation: string[]
  title: string
  location: string
  blocks: YearEndStoryBlock[]
  rounds: YearEndRound[]
  ending: YearEndStoryBlock[]
}
export type YearEndSmsChoice = { text: string; response: string[]; affection: number }
export type YearEndChatRound = { incoming: string; choices: YearEndSmsChoice[] }

export const YEAR_END_INVITE_THRESHOLD = 30

export const yearEndIntroBlocks: YearEndStoryBlock[] = [
  { kind: 'narration', text: '聖誕節那幾天，台北的街上到處都是燈。百貨公司門口擺了聖誕樹，騎樓下的小店掛著紅綠色的裝飾，晚上經過時，還能聽見店裡傳出熟悉的聖誕歌曲。' },
  { kind: 'narration', text: '系上有人辦了交換禮物，你抽到一個包裝得很漂亮、拆開卻是兩雙厚襪子的禮物。西藍花笑你今年冬天至少不會凍到腳，你嘴上嫌棄，回家還是立刻穿上了。' },
  { kind: 'narration', text: '這幾天偶爾會收到他們傳來的訊息。有人抱怨街上人太多，有人問你聖誕節吃了什麼，也有人只傳來一張不知道哪裡拍的聖誕燈飾照片。日子就在報告、期末收尾和一點點節日氣氛裡，慢慢走到了年底。' },
  { kind: 'narration', text: '十二月三十一日。早上醒來時，窗外的天氣冷得讓人只想把被子拉高一點。桌曆翻到最後一頁，才突然意識到：今天晚上過後，年份就要從一九九六變成一九九七了。' },
  { kind: 'narration', text: '手機放在枕頭旁邊，今天似乎會比平常熱鬧很多。你一邊找外套，一邊想著晚上那群人到底又會弄出什麼動靜。' },
]

export const yearEndShoppingRoutes: Record<YearEndRouteCharacterId, YearEndShoppingRoute> = {
  wen: {
    invitation: ['欸，妳今天下午有空嗎？', '我想去買一點晚上大家要用的東西，清單有點長。', '妳要是有空，陪我一起去好不好？兩個人挑比較快。'],
    title: '跟溫尚翊去買年貨',
    location: '台北・傳統市場與雜貨店',
    blocks: [
      { kind: 'narration', text: '下午兩點半，市場入口已經擠滿了人。騎樓下掛著紅色的小燈籠，攤販把一箱箱糖果和瓜子搬到門口，蒸籠掀開時冒出的白煙混著烤香腸的味道，整條街都熱鬧得不得了。你遠遠就看見溫尚翊站在路邊，深色外套拉到下巴，手裡拿著一張折得整整齊齊的清單，腳邊放著兩個空購物袋。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '妳來啦。外面風滿大的，圍巾有戴好嗎？' },
      { kind: 'narration', text: '他先看了看你身上的外套，確認你沒有穿得太單薄，才把手裡的清單遞過來。你伸手想接，他卻故意把紙往上抬了一點，嘴角藏著笑。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '先說好，今天妳是我的採購顧問。看到喜歡的可以跟我講，不過不要逛到最後，整張清單只剩糖果就好。' },
      { kind: 'narration', text: '你低頭看著那張清單，上面寫著花生、瓜子、糖果、飲料、餅乾，還有幾盒晚上要玩的仙女棒。每一項旁邊都被他畫了小小的記號，連要買幾份都算好了。看得出來他不是隨便應付，而是真的想把今晚大家需要的東西準備妥當。' },
    ],
    rounds: [
      {
        scene: '你們一走進市場，人聲立刻從四面八方湧過來。賣年糕的老闆正忙著招呼客人，隔壁攤的阿姨一邊裝瓜子一邊喊著今天特價。溫尚翊把清單攤在你們中間，才看了兩眼，就被一旁飄來的香味引得抬起頭。你忍不住笑他明明寫了清單，逛起來卻也沒有比較有方向。', 
        promptSpeaker: '溫尚翊',
        prompt: '先買哪一樣？我想把比較重的先買好，等一下就不用一路提著。妳有沒有特別想先逛的？',
        choices: [
          { text: '先買花生和瓜子，重的早點買完。', response: [{ speaker: '溫尚翊', text: '好，聽妳的。妳幫我拿清單勾數量，我去跟老闆買，今天分工合作。' }], affection: { wen: 2 } },
          { text: '先去買糖果！我想看看有沒有小時候吃的那種。', response: [{ speaker: '溫尚翊', text: '我就知道妳會先選這個。走啦，我陪妳慢慢挑，反正清單又不會自己跑掉。' }], affection: { wen: 3 } },
          { text: '先陪我逛一圈再決定嘛。', response: [{ speaker: '溫尚翊', text: '好啊，妳想看就看，不用趕。等一下人更多，我們再回來買也可以。' }], affection: { wen: 2 } },
        ],
      },
      {
        scene: '糖果攤前擺著一排排透明玻璃罐，水果糖被分成紅色、橘色和淡黃色，燈光照上去亮晶晶的。你才剛停下腳步，溫尚翊就順著你的視線拿起其中一包，沒有先問價錢，反而轉過來看你。', 
        promptSpeaker: '溫尚翊',
        prompt: '這個妳不是很喜歡嗎？我記得妳愛吃這種。要不要拿一包？',
        choices: [
          { text: '你還記得喔？', response: [{ speaker: '溫尚翊', text: '這有什麼好忘的。妳喜歡的口味，我有記住啦。' }, { speaker: '溫尚翊', text: '拿一包吧，晚上妳想吃就自己留著，不用跟他們搶。' }], affection: { wen: 3 } },
          { text: '買啊，反正大家一起吃，多一包也沒差。', response: [{ speaker: '溫尚翊', text: '好，那就拿兩包。一包放大家那邊，一包給妳。' }, { speaker: '溫尚翊', text: '不然等一下瑪莎先拆光，妳又要來跟我抱怨。' }], affection: { wen: 2 } },
          { text: '你是不是特地拿給我看的？', response: [{ speaker: '溫尚翊', text: '不然咧？剛好看到就想到妳了。' }, { speaker: '溫尚翊', text: '……快挑啦，不要站在這裡笑我。' }], affection: { wen: 3 } },
        ],
      },
      {
        scene: '買完糖果，你們又繞進旁邊的雜貨店。門口掛著紅色春聯，架上擺滿仙女棒、小燈籠和各種小型煙火，店裡的收音機還播著老歌。溫尚翊拿起兩盒仙女棒比較包裝，嘴裡念著要買安全一點的，卻又很認真地問你哪一盒看起來比較漂亮。', 
        promptSpeaker: '溫尚翊',
        prompt: '仙女棒買兩盒好不好？大家一起玩才熱鬧。太大支的就不買了，晚上人多，還是安全一點。',
        choices: [
          { text: '兩盒！我要跟你比誰的亮比較久。', response: [{ speaker: '溫尚翊', text: '妳很有勝負欲欸。好啦，買兩盒，到時候不要輸了就耍賴。' }, { speaker: '溫尚翊', text: '不過拿的時候離衣服遠一點，我會看著妳。' }], affection: { wen: 3 } },
          { text: '你怎麼連煙火都挑得這麼認真，像在做功課。', response: [{ speaker: '溫尚翊', text: '不然咧，總不能亂買。' }, { speaker: '溫尚翊', text: '妳負責挑好玩的，我負責看安全，這樣剛好。' }], affection: { wen: 2 } },
          { text: '再買個小燈籠吧，拍照一定很好看。', response: [{ speaker: '溫尚翊', text: '好啊，妳挑顏色。紅色應該不錯，拍起來比較有過年的感覺。' }], affection: { wen: 2 } },
        ],
      },
      {
        scene: '結帳時，店員把飲料、零食和仙女棒分成好幾袋。你伸手想接其中一袋，溫尚翊已經先把最重的那袋提到自己手上，又把裝糖果的輕袋遞給你。你看他兩隻手都快被袋子占滿，還是忍不住想幫忙。', 
        promptSpeaker: '溫尚翊',
        prompt: '這袋比較重，我拿。妳幫我拿糖果那袋就好，順便幫我看清單，看看還有沒有漏掉的。',
        choices: [
          { text: '我可以幫忙啦，不用全部自己拿。', response: [{ speaker: '溫尚翊', text: '我知道妳可以啊。只是這袋真的比較重，我拿就好。' }, { speaker: '溫尚翊', text: '等一下如果還有東西，再換妳幫我拿輕的。' }], affection: { wen: 3 } },
          { text: '那你拿重的，我幫你把袋子分好。', response: [{ speaker: '溫尚翊', text: '好，妳最會整理。糖果放上面，別被飲料壓碎了。' }], affection: { wen: 2 } },
          { text: '你是不是怕我累到？', response: [{ speaker: '溫尚翊', text: '……不然咧？妳等一下還要跟大家玩，現在先留點力氣。' }, { speaker: '溫尚翊', text: '走啦，前面有熱飲，順便買一杯給妳暖手。' }], affection: { wen: 3 } },
        ],
      },
      {
        scene: '等你們把清單上的東西勾得差不多，街邊的燈也一盞盞亮了起來。市場口比剛才更熱鬧，提著年貨的人來來往往。溫尚翊低頭看見你把手縮進袖子裡，便把手上的袋子往上提了提，帶你走到一間熱飲攤前。', 
        promptSpeaker: '溫尚翊',
        prompt: '差不多齊了。妳手是不是有點冷？要不要先買杯熱的，晚上還要在外面待很久。',
        choices: [
          { text: '我要熱奶茶，而且你要陪我一起喝。', response: [{ speaker: '溫尚翊', text: '好，兩杯。妳先拿著暖手，等一下再慢慢喝。' }, { speaker: '溫尚翊', text: '今天辛苦妳陪我跑這一趟了。' }], affection: { wen: 3 } },
          { text: '買熱豆漿吧，大家也可以分著喝。', response: [{ speaker: '溫尚翊', text: '可以，再多買幾杯。妳還滿會照顧大家的。' }, { speaker: '溫尚翊', text: '不過妳自己的那杯先拿好，不要又忙著分給別人。' }], affection: { wen: 2 } },
          { text: '我不冷啦，你才是一直在拿東西的人。', response: [{ speaker: '溫尚翊', text: '我還好啦。妳如果真的不冷，那就陪我走慢一點。' }, { speaker: '溫尚翊', text: '難得兩個人出來，不用那麼趕。' }], affection: { wen: 3 } },
        ],
      },
    ],
    ending: [
      { kind: 'narration', text: '熱飲握在手裡，掌心終於暖了起來。你們站在騎樓下重新核對清單，溫尚翊一項一項打勾，確認沒有漏掉晚上要用的東西。最後，他把那包你喜歡的水果糖從袋子裡拿出來，單獨放進你手上的小袋子。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '這包妳拿著。妳喜歡的，先幫妳留起來，不然等一下那群人看到糖果就沒了。' },
      { kind: 'narration', text: '你抬頭看他，他正低頭把購物袋的提把重新繞好，像是剛才那句話只是順口說出來。可是他連你喜歡哪一種都記得，還特地替你留了一包。市場裡的人聲依舊熱鬧，你卻忽然覺得，這趟採買好像比想像中還要開心。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '走啦，先把東西拿過去。等一下大家看到這麼多吃的，應該會吵翻天。' },
      { kind: 'narration', text: '他提起比較重的幾袋，走在你身旁，還不時回頭確認你有沒有跟上。你們一路聊著晚上要怎麼分零食、誰最可能先把糖吃光，笑聲混進街上的叫賣聲裡。明明只是出來買年貨，卻像是提前把今晚的熱鬧和一點點甜蜜都先買回來了。' },
    ],
  },
  masa: {
    invitation: ['欸，妳今天下午有沒有空？', '我媽丟了一張清單給我，長得跟作文一樣。', '妳要不要來幫我看一下？不然我怕我買到明年都吃不完的東西。'],
    title: '跟瑪莎去買年貨',
    location: '台北・老街市場',
    blocks: [
      { kind: 'narration', text: '你到市場入口時，瑪莎正靠在柱子旁邊，手裡拿著一張長得幾乎快拖到地上的購物清單。他看見你，立刻把紙往你面前一遞。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '來，救星，妳終於來了。' },
      { kind: 'dialogue', speaker: '你', text: '你這是要買年貨，還是要把整間市場搬回家？' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '我哪知道！我媽寫的欸。妳先看，這裡面有幾樣我根本不知道是什麼。' },
      { kind: 'narration', text: '市場裡人來人往，攤販的聲音此起彼落。瑪莎一邊抱怨清單太長，一邊又很熟練地帶著你往熟悉的攤位走，完全不像第一次來。' },
    ],
    rounds: [
      {
        scene: '你把清單攤在兩個人中間，才發現上面除了糖果、瓜子和水果，還有幾樣調味料和乾貨。瑪莎指著其中一行，表情十分嚴肅。',
        promptSpeaker: '蔡昇晏',
        prompt: '這個「紅棗」到底要買幾包？妳看得懂我媽的字嗎？',
        choices: [
          { text: '看得懂啊，寫兩包。你是不是故意裝不懂？', response: [{ speaker: '蔡昇晏', text: '我哪有！她的字本來就很難認好不好。妳不要什麼都怪我。' }], affection: { masa: 3 } },
          { text: '先問老闆好了，不要自己亂猜。', response: [{ speaker: '蔡昇晏', text: '好啦，這樣比較保險。妳今天總算講了一句有用的話。' }], affection: { masa: 2 } },
          { text: '全部買一包，剩下的就說賣完了。', response: [{ speaker: '蔡昇晏', text: '妳這個人很會偷懶欸！我媽回家一看就知道了啦。' }], affection: { masa: 1 } },
        ],
      },
      {
        scene: '經過零食攤時，瑪莎突然停下來，眼睛盯著一大袋地瓜球旁邊的辣味餅乾。他嘴上還在說清單很麻煩，手卻已經伸過去拿了。',
        promptSpeaker: '蔡昇晏',
        prompt: '這個看起來不錯欸。買一包回去，反正大家都會吃吧？',
        choices: [
          { text: '你先承認你自己想吃，我就讓你買。', response: [{ speaker: '蔡昇晏', text: '我本來就要吃啊！妳到底在審問什麼？' }], affection: { masa: 3 } },
          { text: '買啊，晚上大家一起分。', response: [{ speaker: '蔡昇晏', text: '這才對嘛。妳終於有一點團隊精神了。' }], affection: { masa: 2 } },
          { text: '不行，清單上沒有，不能亂買。', response: [{ speaker: '蔡昇晏', text: '妳現在是我媽派來監督我的喔？好啦，先放回去。' }], affection: { masa: 1 } },
        ],
      },
      {
        scene: '你們在水果攤前挑橘子。瑪莎拿起一顆，翻來覆去看了半天，還一本正經地敲了敲，像是要從聲音判斷它好不好吃。',
        promptSpeaker: '蔡昇晏',
        prompt: '這顆可以吧？我覺得長得滿有誠意的。',
        choices: [
          { text: '你挑水果還要看它有沒有誠意喔？', response: [{ speaker: '蔡昇晏', text: '不然咧？總不能挑一顆看起來很沒精神的吧。' }], affection: { masa: 3 } },
          { text: '這顆不錯，皮看起來滿漂亮的。', response: [{ speaker: '蔡昇晏', text: '好，那就這顆。妳看，兩個人一起挑比較快。' }], affection: { masa: 2 } },
          { text: '你問老闆啦，他比我們懂。', response: [{ speaker: '蔡昇晏', text: '好啦好啦，問就問。妳今天真的很會把事情丟回給別人。' }], affection: { masa: 1 } },
        ],
      },
      {
        scene: '東西越買越多，瑪莎把其中兩袋掛到手腕上，另一手還拿著清單。你想接過一袋，他卻先把袋子往另一邊挪。',
        promptSpeaker: '蔡昇晏',
        prompt: '妳拿那袋比較輕的就好，不然等一下又要說手痠。',
        choices: [
          { text: '你少看不起人，我拿這袋。', response: [{ speaker: '蔡昇晏', text: '好啊，那妳就拿。等一下不要走到一半偷偷換給我。' }], affection: { masa: 3 } },
          { text: '那我們一人兩袋，公平一點。', response: [{ speaker: '蔡昇晏', text: '可以，這樣我就不用被妳說欺負女生了。' }], affection: { masa: 2 } },
          { text: '你拿得動就你拿，我負責看路。', response: [{ speaker: '蔡昇晏', text: '哇，妳這個分工也太舒服了吧？我怎麼沒有這種工作。' }], affection: { masa: 1 } },
        ],
      },
      {
        scene: '清單終於只剩最後一行。瑪莎把紙翻過來看了看，發現背面還有一段被折痕擋住的小字，整個人瞬間安靜了兩秒。',
        promptSpeaker: '蔡昇晏',
        prompt: '……等一下，背面還有。妳不要笑，我真的沒看到。',
        choices: [
          { text: '哈哈哈哈哈哈！你剛剛還說自己很會買！', response: [{ speaker: '蔡昇晏', text: '妳笑夠了沒！我現在就知道為什麼我媽要我帶清單了。' }], affection: { masa: 3 } },
          { text: '沒關係啦，還好現在看到，走吧。', response: [{ speaker: '蔡昇晏', text: '妳今天居然沒有趁機補刀，真難得。' }], affection: { masa: 2 } },
          { text: '我就知道你會漏東西，早就提醒你了。', response: [{ speaker: '蔡昇晏', text: '妳根本沒有提醒！不要現在才把功勞攬走。' }], affection: { masa: 1 } },
        ],
      },
    ],
    ending: [
      { kind: 'narration', text: '最後一樣東西買齊時，瑪莎把清單折好塞進口袋，像是終於完成了一件人生大事。你看著他手上那幾袋東西，突然覺得他剛才抱怨的樣子其實滿好笑的。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '走啦，先把東西拿回去。今天算妳有幫上忙。' },
      { kind: 'dialogue', speaker: '你', text: '什麼叫算？我明明是大功臣！' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '好啦，大功臣。要不要順便去買飲料？我請啦。' },
    ],
  },
  ashin: {
    invitation: ['妳今天下午有安排嗎？', '我想去買一點晚上大家要用的東西，順便挑些小裝飾。', '如果妳有空，要不要一起去？'],
    title: '跟阿信去買年貨',
    location: '台北・年貨店與文具店',
    blocks: [
      { kind: 'narration', text: '你到約好的地方時，阿信已經站在騎樓下等著。他手裡拿著一張小小的紙，旁邊還夾著一支鉛筆，紙上分成了幾個欄位，字寫得整整齊齊。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '妳來了馁。外面有點冷，先把外套拉好。' },
      { kind: 'narration', text: '他把清單遞給你看，除了大家要吃的零食和飲料，還有幾張紅色的紙卡、包裝用的細繩，以及一小盒可以掛在窗邊的裝飾。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '想說既然要一起跨年，弄得有一點節日的樣子也不錯。妳覺得呢？' },
      { kind: 'narration', text: '你們沿著街邊慢慢走，店門口掛著紅色燈籠，玻璃櫃裡擺著各式各樣的糖果。阿信走得不快，偶爾會停下來讓你先看。' },
    ],
    rounds: [
      {
        scene: '你們先走進一間年貨店。阿信拿起兩盒包裝不同的糖果，放在手掌上比較了一下，似乎真的很難決定。',
        promptSpeaker: '陳信宏',
        prompt: '這兩盒都滿好看的，妳覺得哪一盒比較適合帶去給大家？',
        choices: [
          { text: '選這盒紅色包裝的，很有過年的感覺。', response: [{ speaker: '陳信宏', text: '好，那就這盒。妳挑的顏色真的很喜氣馁。' }], affection: { ashin: 3 } },
          { text: '另一盒比較簡單，大家應該都會喜歡。', response: [{ speaker: '陳信宏', text: '我也覺得這盒比較耐看。那我們就拿這個。' }], affection: { ashin: 2 } },
          { text: '兩盒都買啊，反正大家人多。', response: [{ speaker: '陳信宏', text: '哈哈，妳是不是覺得只要是吃的就不嫌多？好啦，可以分著吃。' }], affection: { ashin: 1 } },
        ],
      },
      {
        scene: '走到文具店時，阿信在一排紅色卡片前停下來。他抽出一張有細細金線的卡片，對著燈光看了看。',
        promptSpeaker: '陳信宏',
        prompt: '這個可以寫幾句祝福的話，放在大家的袋子裡。會不會有點太正式？',
        choices: [
          { text: '不會啊，手寫的比較有心意。', response: [{ speaker: '陳信宏', text: '那我來寫好了。妳等一下也可以幫我想一句，不要太老派的。' }], affection: { ashin: 3 } },
          { text: '你寫就好，我負責在旁邊監督字好不好看。', response: [{ speaker: '陳信宏', text: '欸，這樣壓力很大馁。那我一定要寫得漂亮一點。' }], affection: { ashin: 2 } },
          { text: '大家應該不會在意這個啦，買吃的就好了。', response: [{ speaker: '陳信宏', text: '也是啦，不過偶爾多一點小心思，好像也不錯。' }], affection: { ashin: 1 } },
        ],
      },
      {
        scene: '你們在店門口整理剛買好的東西。阿信把其中一盒糖果放進紙袋，發現你的手指被紙袋邊緣刮了一下，立刻停下動作。',
        promptSpeaker: '陳信宏',
        prompt: '妳的手還好嗎？剛剛是不是被紙邊刮到了？',
        choices: [
          { text: '沒事啦，只是小小刮到而已。', response: [{ speaker: '陳信宏', text: '那就好。不過等一下拿東西小心一點，不要又被刮到馁。' }], affection: { ashin: 2 } },
          { text: '有一點痛，你幫我看一下。', response: [{ speaker: '陳信宏', text: '好，我看看。還好沒有破皮，等一下不要一直碰那個地方。' }], affection: { ashin: 3 } },
          { text: '你怎麼連這種小事都注意到了？', response: [{ speaker: '陳信宏', text: '因為妳剛剛皺了一下眉頭啊。我剛好有看到。' }], affection: { ashin: 3 } },
        ],
      },
      {
        scene: '最後一間店裡掛滿了紅色和金色的小裝飾。阿信拿起一個小小的紙燈籠，放在手心裡看了一會兒。',
        promptSpeaker: '陳信宏',
        prompt: '這個掛在晚上集合的地方，好像會滿好看的。妳想挑哪一個？',
        choices: [
          { text: '選紅色的，遠遠看也比較明顯。', response: [{ speaker: '陳信宏', text: '好，那就紅色。等一下我來掛，妳幫我看位置。' }], affection: { ashin: 2 } },
          { text: '金色的比較特別，我喜歡這個。', response: [{ speaker: '陳信宏', text: '那就照妳喜歡的。金色的燈光照起來應該會很好看。' }], affection: { ashin: 3 } },
          { text: '你挑吧，我覺得你眼光不錯。', response: [{ speaker: '陳信宏', text: '真的喔？那我就挑這個。希望妳等一下看到也會喜歡。' }], affection: { ashin: 1 } },
        ],
      },
      {
        scene: '天色慢慢暗下來，你們提著幾袋東西走到路口。阿信把寫好的小卡片收進外套口袋，確認沒有被壓皺。',
        promptSpeaker: '陳信宏',
        prompt: '今天買得差不多了。妳覺得大家看到這些東西會不會很開心？',
        choices: [
          { text: '一定會啊，尤其瑪莎看到糖果應該會很興奮。', response: [{ speaker: '陳信宏', text: '哈哈，我也有想到他。希望他不要一次把整袋吃完馁。' }], affection: { ashin: 3 } },
          { text: '會啊，大家一起準備感覺很好。', response: [{ speaker: '陳信宏', text: '嗯，我也覺得。一起做這些小事，好像更有跨年的感覺。' }], affection: { ashin: 2 } },
          { text: '如果有人不喜歡，我們就自己吃掉。', response: [{ speaker: '陳信宏', text: '這個辦法也不錯欸。至少不會浪費。' }], affection: { ashin: 1 } },
        ],
      },
    ],
    ending: [
      { kind: 'narration', text: '阿信把小卡片和裝飾收好，還特地把比較容易壓壞的東西放在最上面。你們走到路口時，他把一小包水果糖遞給你，說是剛才多拿的。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '這個給妳啦。剛剛看妳好像很喜歡那個味道。' },
      { kind: 'narration', text: '你低頭看著手裡的糖果，包裝紙在路燈下亮亮的。明明只是出來買東西，卻覺得今天的下午過得很舒服。' },
    ],
  },
  stone: {
    invitation: ['今天下午妳有空嗎？', '我想去附近買一些跨年要用的東西，順便挑點吃的。', '如果妳方便的話，要不要一起？'],
    title: '跟石頭去買年貨',
    location: '台北・市場旁的雜貨店',
    blocks: [
      { kind: 'narration', text: '石頭比約定時間早到了幾分鐘。他站在市場旁邊的小店門口，手裡拿著一張簡單的清單，另一隻手還提著一個可以重複使用的布袋。' },
      { kind: 'dialogue', speaker: '石錦航', text: '妳到了。外面風有點大，剛剛等的時候還好嗎？' },
      { kind: 'narration', text: '他先確認你有沒有把外套穿好，才把清單遞過來。上面寫的東西不多，都是大家晚上可能會用到的零食、飲料和一些簡單的用品。' },
      { kind: 'dialogue', speaker: '石錦航', text: '我想說先買好，晚上就不用臨時找東西了。妳看看有沒有想加的。' },
      { kind: 'narration', text: '店裡的燈光偏黃，貨架上擺著整齊的罐頭、餅乾和茶包。石頭沒有急著拿東西，只是陪你慢慢看。' },
    ],
    rounds: [
      {
        scene: '你們先在餅乾架前停下來。石頭拿起兩包不同口味的餅乾，仔細看了看成分和保存期限。',
        promptSpeaker: '石錦航',
        prompt: '這兩種都可以放一陣子。妳比較想吃哪一個？',
        choices: [
          { text: '選海苔口味的，感覺比較不容易膩。', response: [{ speaker: '石錦航', text: '好，那就拿這個。妳選的話，我也比較放心。' }], affection: { stone: 3 } },
          { text: '甜的好了，跨年晚上吃甜食比較有氣氛。', response: [{ speaker: '石錦航', text: '也可以。那再搭一包鹹的，大家想吃什麼都有。' }], affection: { stone: 2 } },
          { text: '你平常喜歡哪種就買哪種。', response: [{ speaker: '石錦航', text: '我都可以，主要是大家一起吃。妳有喜歡的比較重要。' }], affection: { stone: 1 } },
        ],
      },
      {
        scene: '你們走到飲料區，冷藏櫃的玻璃上蒙著一層薄薄的水氣。石頭拿了一瓶溫熱的茶，又看了看你手裡的東西。',
        promptSpeaker: '石錦航',
        prompt: '晚上可能會待比較久，要不要也買幾瓶熱的？',
        choices: [
          { text: '好啊，吹風的時候喝熱的剛剛好。', response: [{ speaker: '石錦航', text: '那我多拿幾瓶。妳晚上如果冷，就先拿一瓶喝。' }], affection: { stone: 3 } },
          { text: '買一些就好，不用準備太多。', response: [{ speaker: '石錦航', text: '嗯，先買這幾瓶，真的不夠再說。' }], affection: { stone: 2 } },
          { text: '你是不是自己怕冷？', response: [{ speaker: '石錦航', text: '有一點。今天風真的滿大的。妳也要記得穿暖一點。' }], affection: { stone: 1 } },
        ],
      },
      {
        scene: '結帳後你們把東西放進布袋。石頭看見袋底有一個小洞，便蹲下來把比較重的飲料先拿出來，重新調整位置。',
        promptSpeaker: '石錦航',
        prompt: '這個袋子可能不太牢，我們分開拿比較好。妳拿這些輕的就行。',
        choices: [
          { text: '那我拿餅乾和糖果，你拿飲料。', response: [{ speaker: '石錦航', text: '好，這樣比較穩。謝謝妳幫忙分。' }], affection: { stone: 2 } },
          { text: '我可以拿飲料啦，不用都給你。', response: [{ speaker: '石錦航', text: '好，那我們一人一半。袋子如果不舒服就跟我說。' }], affection: { stone: 3 } },
          { text: '你先拿著，我去旁邊再找一個袋子。', response: [{ speaker: '石錦航', text: '好，麻煩妳了。小心不要走太快。' }], affection: { stone: 1 } },
        ],
      },
      {
        scene: '走出店門時，旁邊有一個小攤正在整理新年裝飾。石頭停下來看了一眼，發現攤位邊放著幾張印著街景的小明信片。',
        promptSpeaker: '石錦航',
        prompt: '這幾張照片拍得滿好看的。妳要不要挑一張？',
        choices: [
          { text: '選這張有路燈的，顏色很好看。', response: [{ speaker: '石錦航', text: '我也喜歡這張。光落在地上的樣子很漂亮。' }], affection: { stone: 3 } },
          { text: '你幫我挑一張好了，我想看看你會選哪張。', response: [{ speaker: '石錦航', text: '那我選這張有樹影的。感覺比較安靜，也很耐看。' }], affection: { stone: 2 } },
          { text: '不用啦，今天已經買很多東西了。', response: [{ speaker: '石錦航', text: '好，那就先不買。等一下還要拿東西，別讓妳的手太滿。' }], affection: { stone: 1 } },
        ],
      },
      {
        scene: '你們把最後幾樣東西整理好，準備往回走。石頭看了看天色，又看了一眼你手上的袋子，伸手把袋口折好。',
        promptSpeaker: '石錦航',
        prompt: '差不多了。等一下回去的路上，要不要先找個地方休息一下？',
        choices: [
          { text: '好啊，剛好想喝點熱的。', response: [{ speaker: '石錦航', text: '那我們去前面那家店坐一下。妳先把東西放好。' }], affection: { stone: 3 } },
          { text: '不用啦，我還走得動。', response: [{ speaker: '石錦航', text: '好，那我們慢慢走，不用趕。' }], affection: { stone: 2 } },
          { text: '你是不是怕我累？', response: [{ speaker: '石錦航', text: '有一點。今天走了不少路，休息一下也好。' }], affection: { stone: 3 } },
        ],
      },
    ],
    ending: [
      { kind: 'narration', text: '你們把買好的東西放進布袋，石頭又確認了一次袋口有沒有綁緊。走到路口時，他拿出剛才挑的明信片，遞給你看。' },
      { kind: 'dialogue', speaker: '石錦航', text: '這張我覺得很適合妳。妳如果喜歡，就先收著。' },
      { kind: 'narration', text: '你把明信片放進外套口袋，紙張的邊角貼著手心。石頭沒有多說什麼，只是陪你一起往回走。' },
    ],
  },
  yanming: {
    invitation: ['今天下午我打算去買一些晚上要用的東西。', '大家跨年可能會待到比較晚，零食、飲料和簡單用品都要先準備好。', '妳如果有空，要不要一起去？'],
    title: '跟諺明哥去買年貨',
    location: '台北・市場與雜貨行',
    blocks: [
      { kind: 'narration', text: '你到約好的路口時，諺明哥已經在那裡等著。他手上拿著一張分好類的清單，旁邊還有一支筆，幾個項目後面已經先寫了預估數量。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '來了？今天要買的東西比較多，我先把清單整理過了。' },
      { kind: 'narration', text: '他沒有急著往前走，而是先把清單給你看，逐項說明哪些是大家一起吃的，哪些是晚上放煙火時需要用到的用品。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '先買不容易壞的，飲料最後再拿。這樣提回去比較方便。' },
      { kind: 'narration', text: '你看著他把事情安排得清清楚楚，忍不住覺得這趟採買應該不會出什麼大問題。至少，應該不會有人買完才發現忘了最重要的東西。' },
    ],
    rounds: [
      {
        scene: '你們先到乾貨攤。諺明哥把清單上的花生和瓜子勾起來，又問老闆不同包裝的重量和保存期限。',
        promptSpeaker: '劉諺明',
        prompt: '這兩種份量差不多，妳覺得哪一種比較方便大家分著吃？',
        choices: [
          { text: '選小包裝的，拿取方便，也不用一次拆完。', response: [{ speaker: '劉諺明', text: '好，這樣分配比較容易，也不會一下子受潮。' }], affection: { yanming: 3 } },
          { text: '買大包裝，大家一起吃比較省。', response: [{ speaker: '劉諺明', text: '也可以，那我再多拿幾個乾淨的袋子，方便分裝。' }], affection: { yanming: 2 } },
          { text: '你決定就好，你比較知道大家的份量。', response: [{ speaker: '劉諺明', text: '好，那我照平常的量買。謝謝妳幫我看。' }], affection: { yanming: 1 } },
        ],
      },
      {
        scene: '接著你們去買飲料。諺明哥拿著筆在清單上算了一下，發現如果每個人都拿一瓶，還需要多準備幾瓶。',
        promptSpeaker: '劉諺明',
        prompt: '大家口味不太一樣，要不要多買幾種？這樣比較不容易有人喝不到喜歡的。',
        choices: [
          { text: '多買幾種吧，反正大家可以交換。', response: [{ speaker: '劉諺明', text: '好，那就各拿一些。這樣比較周全。' }], affection: { yanming: 3 } },
          { text: '先買大家常喝的就好，不用太複雜。', response: [{ speaker: '劉諺明', text: '嗯，先以基本的為主，剩下的看情況再補。' }], affection: { yanming: 2 } },
          { text: '你是不是連飲料都要做統計？', response: [{ speaker: '劉諺明', text: '哈哈，習慣了。先算好，回去就不用臨時分配。' }], affection: { yanming: 1 } },
        ],
      },
      {
        scene: '你們走到雜貨行，架上有膠帶、紙巾、垃圾袋和幾種簡單的煙火用品。諺明哥先把需要的用品放進籃子，再仔細看了看包裝。',
        promptSpeaker: '劉諺明',
        prompt: '煙火用品要挑標示清楚的，另外也要準備水和垃圾袋。妳覺得還缺什麼？',
        choices: [
          { text: '再帶一條濕毛巾吧，手弄髒可以擦。', response: [{ speaker: '劉諺明', text: '這個提醒很好，我加進去。準備齊全一點比較安心。' }], affection: { yanming: 3 } },
          { text: '多買幾包紙巾，大家一定用得到。', response: [{ speaker: '劉諺明', text: '好，紙巾確實會用得比較快。' }], affection: { yanming: 2 } },
          { text: '我覺得已經很多了，不然先結帳？', response: [{ speaker: '劉諺明', text: '好，我再確認一次清單，沒有漏掉就結帳。' }], affection: { yanming: 1 } },
        ],
      },
      {
        scene: '結帳後，諺明哥把收據折好放進口袋，又把東西依照重量分成兩袋。他把比較重的那袋提起來，確認提把沒有鬆脫。',
        promptSpeaker: '劉諺明',
        prompt: '這袋比較重，我拿就好。妳拿紙巾和裝飾用品，可以嗎？',
        choices: [
          { text: '可以啊，這樣分配剛剛好。', response: [{ speaker: '劉諺明', text: '好，謝謝妳。這樣回去也比較好整理。' }], affection: { yanming: 2 } },
          { text: '我也可以拿重的，不用都你來。', response: [{ speaker: '劉諺明', text: '好，那我們一人一袋。走路時注意一下，不要讓東西撞到。' }], affection: { yanming: 3 } },
          { text: '那我負責拿清單，幫你確認有沒有漏。', response: [{ speaker: '劉諺明', text: '哈哈，也可以。妳今天是我的檢查員了。' }], affection: { yanming: 1 } },
        ],
      },
      {
        scene: '回程前，你們在路邊停下來休息。諺明哥把清單拿出來，逐項確認後終於在最後一格打上勾。',
        promptSpeaker: '劉諺明',
        prompt: '都買齊了。今天謝謝妳一起來，不然一個人拿這些確實比較麻煩。',
        choices: [
          { text: '不客氣啊，跟你一起買東西很有效率。', response: [{ speaker: '劉諺明', text: '哈哈，這算是稱讚嗎？那我就收下了。' }], affection: { yanming: 3 } },
          { text: '下次有這種清單還可以找我，我很會挑零食。', response: [{ speaker: '劉諺明', text: '好，那下次就交給妳負責零食這一區。' }], affection: { yanming: 2 } },
          { text: '你真的很會安排，難怪大家都放心交給你。', response: [{ speaker: '劉諺明', text: '謝謝。大家願意一起幫忙，事情才會做得順利。' }], affection: { yanming: 3 } },
        ],
      },
    ],
    ending: [
      { kind: 'narration', text: '諺明哥把最後一張收據收好，提起袋子時還順手確認了一下裡面的東西有沒有壓壞。你們把買好的年貨帶回去，晚上的準備總算有了著落。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '今天辛苦妳了。晚上集合的時間我再提醒大家，妳先回去休息一下。' },
      { kind: 'narration', text: '你看著他把清單折好放進口袋，突然覺得有這種人一起準備事情，真的會安心很多。' },
    ],
  },
}

export const yearEndFireworksIntroBlocks: YearEndStoryBlock[] = [
  { kind: 'narration', text: '晚上九點多，你按照約好的時間來到河堤旁的空地。遠遠就聽見有人在喊你的名字，還沒走近，就先看見佑達把一大袋東西放在地上，正努力阻止瑪莎伸手去翻。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '欸欸欸！那袋是等一下大家一起吃的，你不要現在就拆啦！' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '我只是確認一下有沒有買錯口味，這也要管喔？' },
  { kind: 'narration', text: '石頭蹲在旁邊整理相機和底片，阿信拿著幾個紙杯，把飲料分成熱的和常溫的。諺明哥則把垃圾袋、水和煙火用品放在一旁，確認周圍沒有太靠近人群。' },
  { kind: 'narration', text: '溫尚翊站在稍遠一點的地方，正低頭拆開一盒仙女棒。聽見腳步聲，他抬起頭，朝你招了招手。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '這邊啦。妳怎麼現在才來？我們都快準備好了。' },
  { kind: 'narration', text: '你走過去，才發現他們真的準備了不少東西。零食、飲料、仙女棒、小型煙火，還有一條不知道誰帶來的紅色圍巾。六個人難得都聚在一起，光是站在這裡就已經吵得像一場小型演唱會。' },
]

export const yearEndFireworksRounds: YearEndRound[] = [
  {
    scene: '佑達把零食袋放到中間，宣布要先分配大家的工作。瑪莎立刻說自己負責試吃，結果被石頭伸手把整袋往後挪了一點。',
    promptSpeaker: '錢佑達',
    prompt: '那妳要不要幫忙分零食？還是要跟瑪莎一起負責「試吃」？',
    choices: [
      { text: '我負責分，瑪莎負責站遠一點。', response: [{ speaker: '蔡昇晏', text: '蛤？為什麼我被排擠？' }, { speaker: '錢佑達', text: '因為你剛剛已經偷吃兩包了啦！' }], affection: { masa: 2 } },
      { text: '我跟瑪莎一起試吃，這工作很重要。', response: [{ speaker: '蔡昇晏', text: '聽到沒有！終於有人懂我的專業。' }, { speaker: '溫尚翊', text: '你們兩個最好不要把整袋吃完。' }], affection: { masa: 3 } },
      { text: '我去幫石頭整理相機，零食交給你們。', response: [{ speaker: '石錦航', text: '好啊，這邊有幾張底片要先收好，妳幫我拿一下。' }, { speaker: '陳信宏', text: '那我來分飲料，大家先不要全部擠在一起馁。' }], affection: { stone: 2, ashin: 1 } },
    ],
  },
  {
    scene: '諺明哥把煙火用品拿出來，先確認每一盒的標示和使用方式。溫尚翊蹲在旁邊幫忙，還特地把仙女棒和其他用品分開放。',
    promptSpeaker: '劉諺明',
    prompt: '等一下點煙火的時候，大家記得保持距離。妳想先拿仙女棒，還是等一下再一起點？',
    choices: [
      { text: '我先拿仙女棒，想看看大家一起點的樣子。', response: [{ speaker: '劉諺明', text: '好，我先分給大家。拿的時候注意前面，不要碰到別人。' }, { speaker: '溫尚翊', text: '妳拿這支就好，等一下我幫妳點。' }], affection: { wen: 2, yanming: 2 } },
      { text: '我想等一下再點，先幫你們拿東西。', response: [{ speaker: '劉諺明', text: '也好，那妳幫我看一下水和垃圾袋放哪裡，等一下比較好拿。' }, { speaker: '石錦航', text: '我先把相機收好，等一下拍大家。' }], affection: { yanming: 3 } },
      { text: '我想先看你們點，確定不會燙到再說。', response: [{ speaker: '溫尚翊', text: '妳很謹慎欸。好啦，先看一下，等一下再玩。' }, { speaker: '蔡昇晏', text: '妳放心，我會站得很遠，遠到看不到煙火。' }], affection: { wen: 1, masa: 2 } },
    ],
  },
  {
    scene: '瑪莎拿著一支仙女棒走到溫尚翊旁邊，故意把手舉得很高，像是準備宣布什麼重要事情。佑達一看就知道他又想鬧。',
    promptSpeaker: '蔡昇晏',
    prompt: '欸，溫尚翊，你不是很會嗎？來啊，點給大家看啊！',
    choices: [
      { text: '對啊，團長示範一下，大家都在看。', response: [{ speaker: '溫尚翊', text: '妳也跟著鬧喔？好啦，拿過來。' }, { speaker: '蔡昇晏', text: '哈哈哈哈，來來來，我看你等一下會不會點歪。' }], affection: { wen: 3, masa: 1 } },
      { text: '瑪莎你不要只會出一張嘴，自己點啊！', response: [{ speaker: '蔡昇晏', text: '我這叫監督，不叫出一張嘴。妳到底站哪邊的？' }, { speaker: '溫尚翊', text: '不用理他啦，妳站旁邊一點。' }], affection: { masa: 3, wen: 2 } },
      { text: '我想看你們兩個比賽，輸的人去拿飲料。', response: [{ speaker: '錢佑達', text: '這個好！我來當裁判！' }, { speaker: '溫尚翊', text: '蛤？誰答應要比了？' }, { speaker: '蔡昇晏', text: '來啊，我才不會輸咧。' }], affection: { masa: 2, wen: 2 } },
    ],
  },
  {
    scene: '仙女棒一支支亮起來，金色的火花在夜色裡閃動。石頭把相機架好，阿信站在旁邊看了一會兒，伸手替你把被風吹到臉上的頭髮撥開。',
    promptSpeaker: '石錦航',
    prompt: '要不要拍一張？大家都在，今天應該很難得。',
    choices: [
      { text: '好啊，我站中間，大家不准躲到後面。', response: [{ speaker: '石錦航', text: '好，我會把大家都拍進去。妳站那邊，光線比較剛好。' }, { speaker: '陳信宏', text: '我幫妳拿一下仙女棒，等拍完再還妳馁。' }], affection: { stone: 3, ashin: 1 } },
      { text: '我想跟大家一起拍，不要只有我一個人。', response: [{ speaker: '石錦航', text: '嗯，這樣比較好。大家靠近一點，不然會拍不進去。' }, { speaker: '錢佑達', text: '欸欸欸，瑪莎不要在最後一秒做鬼臉！' }], affection: { stone: 2, masa: 1 } },
      { text: '先不要拍啦，我想好好看一下煙火。', response: [{ speaker: '石錦航', text: '好，那就先玩。等一下如果妳想拍，再叫我就好。' }, { speaker: '陳信宏', text: '沒關係，今天不用每一刻都留下來，記得就好了馁。' }], affection: { stone: 2, ashin: 2 } },
    ],
  },
  {
    scene: '時間越來越接近午夜。大家把最後幾支仙女棒分完，佑達看了一眼手錶，立刻大喊還有十秒。瑪莎先喊了五，溫尚翊叫他不要亂帶，結果所有人都跟著笑起來。',
    promptSpeaker: '溫尚翊',
    prompt: '欸，快十二點了。妳要不要過來一點？等一下煙火升起來才看得到。',
    choices: [
      { text: '走到溫尚翊旁邊，跟他一起倒數。', response: [{ speaker: '溫尚翊', text: '站這裡就好，等一下不要被後面的人撞到。' }, { speaker: '蔡昇晏', text: '喔——有人先卡位喔！' }], affection: { wen: 3, masa: 1 } },
      { text: '拉著瑪莎一起倒數，誰也不准搶拍子。', response: [{ speaker: '蔡昇晏', text: '好啊！我數得比佑達準多了。' }, { speaker: '錢佑達', text: '你不要亂講！我剛剛明明數得很好！' }], affection: { masa: 3 } },
      { text: '站到大家中間，讓所有人都一起入鏡。', response: [{ speaker: '石錦航', text: '好，我把相機準備好。這次一定要拍到大家。' }, { speaker: '陳信宏', text: '那我們一起喊喔，等一下不要有人太早喊馁。' }, { speaker: '劉諺明', text: '大家注意腳下，站穩一點。' }], affection: { stone: 2, ashin: 2, yanming: 2 } },
    ],
  },
]

export const yearEndFireworksEnding: YearEndStoryBlock[] = [
  { kind: 'narration', text: '「十、九、八——」佑達的聲音最大，瑪莎故意慢半拍，還被他伸手推了一下。阿信笑著跟上，石頭一邊倒數一邊確認快門，諺明哥站在旁邊提醒大家不要往前擠。' },
  { kind: 'narration', text: '「三、二、一——新年快樂！」' },
  { kind: 'narration', text: '第一聲煙火在夜空中炸開，接著又是一朵、兩朵，金色和紅色的光映在每個人的臉上。有人大聲歡呼，有人抬頭看得忘了說話，還有人在煙火聲裡喊著新年快樂，喊到最後自己都笑了。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '一九九七年啦！！！新年快樂！！！' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '欸欸欸，剛剛那個最大聲的有沒有嚇到？哈哈哈哈！' },
  { kind: 'dialogue', speaker: '陳信宏', text: '新年快樂馁。希望大家今年都可以好好的。' },
  { kind: 'dialogue', speaker: '石錦航', text: '等一下我把照片洗出來，再拿給大家看。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '先把東西收好，垃圾記得帶走。今天玩得開心就好。' },
  { kind: 'narration', text: '溫尚翊站在你旁邊，手裡還拿著最後一支沒有點燃的仙女棒。他看著天空，過了一會兒才轉頭看你。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '新年快樂啦。今天有來就好。' },
  { kind: 'narration', text: '你們沒有急著散開。煙火還在遠處一聲聲響著，零食袋被風吹得沙沙作響，六個人的聲音混在一起，吵吵鬧鬧的，卻讓這個跨年夜變得格外真實。' },
]

export type YearEndInviteReplyChoice = YearEndSmsChoice & { accepted: boolean }

export const yearEndShoppingReplyChoices: Record<YearEndRouteCharacterId, YearEndInviteReplyChoice[]> = {
  wen: [
    { text: '好啊，我下午有空，幾點碰面？', response: ['那兩點半，市場入口見。我先把清單整理好。', '妳到了傳訊息給我，我去找妳。東西多的話我來拿，妳幫我挑就好。'], affection: 3, accepted: true },
    { text: '可以啊，反正我也想出去走走。', response: ['那剛好，兩點半市場入口見。', '我有幾樣東西想聽妳的意見，妳不要只顧著看糖果喔。'], affection: 2, accepted: true },
    { text: '今天想先在家休息，年貨你們先買吧。', response: ['好啦，那妳先休息，不用勉強。', '我把妳喜歡的那種糖留一包，晚上拿給妳。'], affection: 1, accepted: false },
  ],
  masa: [
    { text: '好啊！我去幫你監督，免得你買錯。', response: ['妳最好是真的來幫忙，不是來增加我的工作量。', '兩點半市場口見，快一點喔！'], affection: 3, accepted: true },
    { text: '可以，但買完要請我吃東西。', response: ['妳很會欸，還沒出門就先談條件。', '好啦，買完再看妳想吃什麼。'], affection: 2, accepted: true },
    { text: '今天不太方便，你自己加油哈哈。', response: ['蛤？妳就這樣丟下我喔！', '好啦好啦，我自己去，妳晚上再來。'], affection: 1, accepted: false },
  ],
  ashin: [
    { text: '好啊！我也想看看有什麼好看的小裝飾。', response: ['太好了馁，那我們兩點半在巷口見。', '妳不用趕，慢慢來就好。'], affection: 3, accepted: true },
    { text: '可以呀，順便幫你挑糖果。', response: ['好啊，那我就把選擇權交給妳一半。', '等等見馁。'], affection: 2, accepted: true },
    { text: '今天想在家整理一下，可能沒辦法出門。', response: ['沒關係啦，妳先忙自己的事。', '晚上見面的時候再一起熱鬧就好馁。'], affection: 1, accepted: false },
  ],
  stone: [
    { text: '好啊，我下午有空，可以一起去。', response: ['好，那我們兩點半在市場旁邊碰面。', '外面有點冷，妳記得多穿一件。'], affection: 3, accepted: true },
    { text: '可以，剛好我也想買一點東西。', response: ['那就一起去吧。', '我先把清單帶著，到了再慢慢看。'], affection: 2, accepted: true },
    { text: '今天可能不太方便，你自己去可以嗎？', response: ['可以啊，沒關係。', '妳先忙，晚上見面的時候再說。'], affection: 1, accepted: false },
  ],
  yanming: [
    { text: '好啊，我下午可以一起去。', response: ['好，那兩點半在市場入口見。', '我會先把清單整理好，到了就可以直接開始。'], affection: 3, accepted: true },
    { text: '可以，我幫你一起確認數量。', response: ['那就麻煩妳了。', '有妳一起看，應該會更周全。'], affection: 2, accepted: true },
    { text: '今天想先休息，可能沒辦法一起去。', response: ['沒關係，妳先休息。', '我會把需要的東西準備好，晚上再見。'], affection: 1, accepted: false },
  ],
}

export const yearEndNewYearMessages: Record<YearEndRouteCharacterId, string> = {
  wen: '新年快樂啦。剛剛煙火有看到嗎？回去路上小心一點，到了跟我說一聲。',
  masa: '新年快樂！！！剛剛那個煙火是不是差點把妳嚇到？哈哈哈哈，我有看到喔。',
  ashin: '新年快樂馁。剛才那一瞬間真的好漂亮，希望新的一年可以有很多開心的事情。',
  stone: '新年快樂。剛才拍的照片我先收好了，等洗出來再拿給妳看。',
  yanming: '新年快樂。今天大家都玩得很開心，希望新的一年也都平安順利。回去路上注意安全。',
}

export const yearEndNewYearReplies: Record<YearEndRouteCharacterId, YearEndSmsChoice[]> = {
  wen: [
    { text: '新年快樂！我有看到，剛剛那個真的好漂亮。', response: ['嗯，還不錯啦。', '妳有看到就好，剛剛人太多，我還怕妳被擠到。'], affection: 2 },
    { text: '新年快樂！你剛剛是不是一直在偷看我有沒有嚇到？', response: ['誰偷看妳了？我是在看大家有沒有站好。', '……好啦，有看一下，怎樣。'], affection: 3 },
    { text: '新年快樂啦！你回家了沒？', response: ['還沒，等一下先把東西收一收。', '妳先到家再說，不要邊走邊看手機。'], affection: 1 },
  ],
  masa: [
    { text: '新年快樂！我哪有被嚇到，是你叫太大聲。', response: ['我哪有！是妳自己反應太誇張吧！', '哈哈哈哈，妳剛剛那個表情真的很好笑。'], affection: 3 },
    { text: '新年快樂～你不要再笑我了啦。', response: ['好啦好啦，今天先放過妳。', '明年再繼續，反正妳也跑不掉。'], affection: 2 },
    { text: '新年快樂！你是不是又把零食帶回去了？', response: ['哪有全部！我有留一點給大家好不好。', '妳不要一過十二點就開始查帳欸。'], affection: 1 },
  ],
  ashin: [
    { text: '新年快樂馁！剛剛真的很漂亮，我有偷偷許願。', response: ['真的喔？那希望妳許的願望可以實現。', '我剛剛也有想一件事情，不過先不告訴妳。'], affection: 3 },
    { text: '新年快樂！你今天玩得開心嗎？', response: ['很開心啊，大家好久沒有這樣一起待到這麼晚了。', '而且妳也在，感覺更熱鬧一點。'], affection: 2 },
    { text: '新年快樂～你回去記得早點休息。', response: ['好啦，妳也是。今天走了不少路，回家先暖一下。'], affection: 1 },
  ],
  stone: [
    { text: '新年快樂！我已經開始期待照片了。', response: ['哈哈，我也想快點洗出來。', '有幾張拍得滿好的，應該可以留下來。'], affection: 3 },
    { text: '新年快樂～你剛剛有沒有拍到瑪莎的鬼臉？', response: ['有一張剛好拍到，他自己應該還不知道。', '等洗出來再給妳看。'], affection: 2 },
    { text: '新年快樂！回去路上小心。', response: ['妳也是。到家後記得把外套掛好，別放在椅子上忘記了。'], affection: 1 },
  ],
  yanming: [
    { text: '新年快樂！今天真的很熱鬧，謝謝你準備那麼多東西。', response: ['不客氣，大家一起幫忙才準備得起來。', '今天辛苦妳了。'], affection: 3 },
    { text: '新年快樂～你是不是又在確認東西有沒有收好？', response: ['哈哈，被妳猜到了。', '剛才有幾樣用品要帶回去，確認一下比較放心。'], affection: 2 },
    { text: '新年快樂！希望你明年不要被瑪莎氣到。', response: ['這個可能有點難。', '不過有大家在，應該還是會很有趣。'], affection: 1 },
  ],
}

export const yearEndProactiveOpeners: Record<YearEndCharacterId, YearEndSmsChoice[]> = {
  wen: [
    { text: '新年快樂！今天真的玩得很開心。', response: ['嗯，我也覺得。', '明年有空再一起出來。'], affection: 2 },
    { text: '新年快樂啦，記得不要忙到忘記吃飯。', response: ['妳怎麼新年第一句就在唸我？', '知道啦，我會去吃東西。'], affection: 3 },
    { text: '新年快樂！今天那支仙女棒我還想再玩一次。', response: ['那有什麼難的，下次再買就好了。', '不過妳拿的時候不要一直揮來揮去。'], affection: 1 },
  ],
  masa: [
    { text: '新年快樂！明年不准再笑我。', response: ['蛤？我什麼時候笑妳了？', '好啦，這句我先答應，其他不保證。'], affection: 3 },
    { text: '新年快樂～你今天是不是偷吃最多？', response: ['我那叫幫大家試味道。', '妳不要每次都記這種事情啦！'], affection: 2 },
    { text: '新年快樂！下次再一起出去玩。', response: ['可以啊，妳先想好要去哪裡。', '不要到時候又說隨便，最後什麼都不決定。'], affection: 1 },
  ],
  ashin: [
    { text: '新年快樂馁！希望你今年也一直開開心心。', response: ['謝謝妳馁。', '也希望妳今年每天都可以遇到一點值得開心的小事。'], affection: 3 },
    { text: '新年快樂！剛剛那個煙火我還想再看一次。', response: ['我也是。', '有些畫面真的會想多記一下。'], affection: 2 },
    { text: '新年快樂～你回家了嗎？', response: ['快到了馁，妳呢？', '今天晚上有點冷，回去記得喝點熱的。'], affection: 1 },
  ],
  stone: [
    { text: '新年快樂！照片洗出來一定要給我看。', response: ['好，我洗好就跟妳說。', '有幾張我自己也滿期待的。'], affection: 3 },
    { text: '新年快樂～今天謝謝你幫忙拍照。', response: ['不客氣，大家都在才值得拍下來。', '妳今天也玩得很開心吧？'], affection: 2 },
    { text: '新年快樂！你有沒有覺得今天風很大？', response: ['有一點，所以我才多帶了外套。', '妳回去也記得穿暖一點。'], affection: 1 },
  ],
  yanming: [
    { text: '新年快樂！今天多虧你準備得那麼齊全。', response: ['大家一起準備的，不是我一個人的功勞。', '妳也幫了不少忙。'], affection: 3 },
    { text: '新年快樂～你回去有沒有順利？', response: ['有，東西都交給大家分著拿了。', '妳也平安到家了嗎？'], affection: 2 },
    { text: '新年快樂！明年也要一起玩喔。', response: ['好啊，有機會就一起。', '希望大家都能安排出時間。'], affection: 1 },
  ],
  youda: [
    { text: '佑達，新年快樂！今天你喊倒數超大聲。', response: ['哈哈哈哈！不大聲一點怎麼有跨年的感覺！', '明年我還要負責倒數，先說好喔！'], affection: 0 },
    { text: '新年快樂！你今天帶的零食也太多了吧。', response: ['我怕大家吃不夠啊！結果瑪莎還是一直嫌不夠。', '下次我乾脆帶兩大袋！'], affection: 0 },
    { text: '新年快樂～明年有機會再一起玩。', response: ['一定啊！大家要常常聚在一起才好玩！', '妳到家了沒？路上小心喔！'], affection: 0 },
  ],
}

export const yearEndFreeChatScripts: Record<YearEndCharacterId, YearEndChatRound[]> = {
  wen: [
    { incoming: '剛剛回去的時候，妳是不是走得很快？我差點沒跟上。', choices: [
      { text: '誰叫你一直在後面收東西。', response: ['我是在確認有沒有漏東西好不好。', '不然明天又要有人問東問西。'], affection: 2 },
      { text: '我怕你又要叫我走快一點啊。', response: ['妳記性倒是很好。', '今天已經沒有趕路了，慢慢走就好。'], affection: 3 },
      { text: '你是不是還有話沒說完？', response: ['哪有。', '……只是覺得今天滿開心的，想多待一下。'], affection: 3 },
    ] },
    { incoming: '對了，妳剛剛拿的那包糖有沒有帶回去？', choices: [
      { text: '有啊，我放在包包裡了。', response: ['那就好，別回家又忘在袋子裡。', '妳真的很容易把東西亂放。'], affection: 2 },
      { text: '你不是說大家一起吃嗎？我沒有偷藏。', response: ['我又沒說妳偷藏。', '不過妳要是真的喜歡，下次再買就好了。'], affection: 3 },
      { text: '沒有，早就被瑪莎搶走了。', response: ['我就知道。', '下次要先幫妳留一包，不然妳又要抱怨。'], affection: 2 },
    ] },
    { incoming: '今年最後一天好像一下子就過去了。', choices: [
      { text: '因為你們一直吵，時間才過那麼快。', response: ['妳自己也沒少講。', '今天如果太安靜，妳大概又會嫌無聊。'], affection: 2 },
      { text: '我覺得這樣很好啊，熱熱鬧鬧的。', response: ['嗯，大家都在就滿好的。', '明年也不知道會忙成怎樣，至少今天有聚到。'], affection: 3 },
      { text: '那明年要安排更多好玩的事情。', response: ['妳先把自己的課顧好啦。', '有空的話再說，我又沒說不行。'], affection: 2 },
    ] },
    { incoming: '妳回家以後記得把外套掛好，不要又丟在椅子上。', choices: [
      { text: '你怎麼連這個都要管啦。', response: ['我只是提醒一下。', '上次看到妳把外套堆在椅子上，隔天才想起來。'], affection: 2 },
      { text: '知道啦，溫爸爸。', response: ['……妳現在是故意的喔？', '誰是妳爸爸啦。少亂叫，快去洗澡，今天外面很冷。', '洗完記得把頭髮吹乾，不要又偷懶。'], affection: 3 },
      { text: '那你也要記得把東西收好。', response: ['知道啦，我等一下就整理。', '妳不要反過來唸我。'], affection: 1 },
    ] },
    { incoming: '好啦，不吵妳了。新的一年，事情慢慢來就好。', choices: [
      { text: '你也是，不要什麼都自己扛。', response: ['……嗯，我知道啦。', '妳也是，有事就講，不要都悶著。'], affection: 3 },
      { text: '我才不會慢慢來，我要馬上變厲害。', response: ['哈哈，妳先不要把自己累死。', '一步一步來啦，急什麼。'], affection: 2 },
      { text: '好啦，晚安，新年快樂。', response: ['晚安。', '新年快樂。'], affection: 1 },
    ] },
  ],
  masa: [
    { incoming: '我剛剛回家才發現，袋子裡那包餅乾不見了。', choices: [
      { text: '你是不是自己吃掉了還忘記？', response: ['我哪有！我記得我有放進去。', '一定是有人趁亂拿走。'], affection: 3 },
      { text: '你先檢查一下是不是放在別袋。', response: ['有啦，找到了，在最下面。', '妳不要一副我很笨的樣子。'], affection: 2 },
      { text: '可能被佑達拿走了哈哈哈。', response: ['……很有可能。', '他剛剛一直在那袋旁邊晃來晃去。'], affection: 2 },
    ] },
    { incoming: '還有，妳剛剛是不是故意跟我搶最後一支仙女棒？', choices: [
      { text: '對啊，誰叫你拿得那麼慢。', response: ['妳真的很幼稚欸！', '下次我先拿，妳不要想搶。'], affection: 3 },
      { text: '我以為那支是大家都可以拿的。', response: ['本來就是啊，我只是想說妳拿走了。', '算了啦，妳玩得開心就好。'], affection: 2 },
      { text: '你不是還有一支嗎？不要那麼小氣。', response: ['我哪有小氣！', '好啦，反正最後也有玩到。'], affection: 1 },
    ] },
    { incoming: '今天大家一起倒數的時候，佑達差點把拍子喊亂。', choices: [
      { text: '你也有跟著喊錯，不要只說佑達。', response: ['我那是故意配合他好不好。', '妳不要什麼都記得那麼清楚。'], affection: 3 },
      { text: '哈哈哈，我有聽到，真的差點亂掉。', response: ['對吧！我剛剛差點笑出來。', '還好最後大家有一起喊完。'], affection: 2 },
      { text: '我覺得很有趣啊，這樣才熱鬧。', response: ['也是啦。', '如果每個人都照著拍子喊，就不好玩了。'], affection: 2 },
    ] },
    { incoming: '妳今年有沒有什麼想做的事？', choices: [
      { text: '想去很多地方玩，最好有人陪我。', response: ['妳這個願望很大欸。', '好啦，有空再看看，不要現在就把行程排滿。'], affection: 3 },
      { text: '想把課業顧好，少一點熬夜。', response: ['這個比較實際。', '不過妳不要只講講，真的要做到喔。'], affection: 2 },
      { text: '不告訴你，說出來就不靈了。', response: ['哇，還有秘密喔？', '好啦，那我不問，等妳哪天自己說。'], affection: 1 },
    ] },
    { incoming: '好啦，先這樣。明年再找妳吵架。', choices: [
      { text: '誰要跟你吵啊！', response: ['妳啊。', '妳今天明明就玩得很開心。'], affection: 3 },
      { text: '可以啊，但你不准每次都耍賴。', response: ['我哪有耍賴！', '好啦，下次讓妳一次。'], affection: 2 },
      { text: '晚安啦，新年快樂。', response: ['晚安。', '新年快樂，明年見。'], affection: 1 },
    ] },
  ],
  ashin: [
    { incoming: '剛剛回去的路上，我還在想最後那一朵煙火。', choices: [
      { text: '我也有看到，顏色很漂亮。', response: ['對啊，先是金色，後來又變成紅色。', '我本來想記下來，結果一下子就消失了馁。'], affection: 3 },
      { text: '你是不是又在腦袋裡畫畫了？', response: ['哈哈，有一點。', '剛剛那個畫面很適合畫成一張小卡片。'], affection: 2 },
      { text: '我只記得瑪莎一直在旁邊叫。', response: ['他真的很有精神欸。', '不過有他在，大家都不會冷場。'], affection: 1 },
    ] },
    { incoming: '我剛才有點想把那個畫面畫下來。', choices: [
      { text: '那你畫好了，畫完記得給我看。', response: ['好啊，我可以試試看。', '不過可能要等我有空，妳不要催我馁。'], affection: 3 },
      { text: '你可以把煙火畫得很漂亮吧。', response: ['謝謝妳。', '其實我還想把大家站在一起的樣子也畫進去。'], affection: 2 },
      { text: '畫煙火是不是很難？', response: ['有一點，要把光的感覺留下來。', '不過越難的東西，反而越想試試看。'], affection: 1 },
    ] },
    { incoming: '妳剛剛有沒有許願？', choices: [
      { text: '有啊，希望今年可以多見到大家。', response: ['這個願望很好馁。', '我也希望大家忙歸忙，還是可以常常聚在一起。'], affection: 3 },
      { text: '有，但不能告訴你。', response: ['哈哈，好啦，我不問。', '希望妳的願望可以實現。'], affection: 2 },
      { text: '我忙著看煙火，忘記許願了。', response: ['那也沒關係。', '有時候好好看著眼前的畫面，也是一件很好的事。'], affection: 1 },
    ] },
    { incoming: '新的一年，妳有沒有想做什麼不一樣的事？', choices: [
      { text: '想學一點畫畫，至少不要每次都畫歪。', response: ['可以啊，我可以教妳一些簡單的。', '不用急，先從自己喜歡的東西開始畫就好馁。'], affection: 3 },
      { text: '想多聽一些新的音樂。', response: ['這個我可以推薦妳。', '下次整理好歌單再傳給妳。'], affection: 2 },
      { text: '還沒想好，先把眼前的事做好。', response: ['這樣也很好。', '不用急著替新的一年安排太多事情。'], affection: 1 },
    ] },
    { incoming: '那今天就先聊到這裡吧。新的一年也請多多指教馁。', choices: [
      { text: '請多多指教！你也要常常找我聊天。', response: ['好啊，我會記得的。', '妳也可以主動傳訊息來，不用客氣馁。'], affection: 3 },
      { text: '你不要只會說，真的要做到喔。', response: ['哈哈，好，我答應妳。', '不會讓妳等太久的。'], affection: 2 },
      { text: '晚安，新年快樂。', response: ['晚安馁。', '希望妳今晚睡個好覺。'], affection: 1 },
    ] },
  ],
  stone: [
    { incoming: '我剛剛把照片和底片收好了，回家才發現手有點冷。', choices: [
      { text: '你不是有帶外套嗎？', response: ['有啊，只是剛剛一直拿相機，手沒什麼地方可以放。', '回來喝了熱水就好多了。'], affection: 2 },
      { text: '下次記得戴手套，手冷很難受欸。', response: ['好，我會記得。', '妳也要注意，今天風真的滿大的。'], affection: 3 },
      { text: '照片有拍好就值得啦。', response: ['哈哈，也對。', '有幾張我很想快點洗出來看看。'], affection: 2 },
    ] },
    { incoming: '我覺得今天那張大家一起拍的照片應該不錯。', choices: [
      { text: '我也很期待，記得不要把我拍得太奇怪。', response: ['不會啦，妳那時候笑得很自然。', '我覺得應該會很好看。'], affection: 3 },
      { text: '瑪莎那個表情一定會毀掉整張照片。', response: ['哈哈，我有注意到。', '不過那張可能反而會最好笑。'], affection: 2 },
      { text: '只要大家都有拍進去就好。', response: ['嗯，這樣就很好了。', '難得大家都在，應該留一張。'], affection: 2 },
    ] },
    { incoming: '剛剛有一段時間，大家都沒有說話，只聽得到煙火聲。', choices: [
      { text: '我很喜歡那一小段，感覺很安靜。', response: ['我也是。', '大家平常都很吵，偶爾安靜一下也滿好的。'], affection: 3 },
      { text: '我還以為你們突然都累了。', response: ['可能有一點。', '不過那時候大家都在看天空，沒有特別想說話。'], affection: 2 },
      { text: '我那時候只想著零食還剩多少。', response: ['哈哈，妳真的很在意吃的。', '不過我有幫妳留一點。'], affection: 1 },
    ] },
    { incoming: '明年如果有機會，我想多拍一些大家的照片。', choices: [
      { text: '好啊，我可以幫你拿東西。', response: ['謝謝妳。', '有妳幫忙的話，我應該可以多拍幾張。'], affection: 3 },
      { text: '那你要記得也拍自己，不要都躲在相機後面。', response: ['哈哈，我會記得。', '下次可以請別人幫忙拍一張。'], affection: 2 },
      { text: '你先把今天的洗出來再說啦。', response: ['好，我知道。', '等洗好了再跟妳分享。'], affection: 1 },
    ] },
    { incoming: '那妳早點休息。今天走了不少路，別太晚睡。', choices: [
      { text: '你也是，明天不要又忘記吃早餐。', response: ['好，我會記得。', '妳也要吃，不要只喝咖啡。'], affection: 3 },
      { text: '知道啦，謝謝你今天照顧大家。', response: ['大家都有幫忙。', '今天能一起跨年就很好了。'], affection: 2 },
      { text: '晚安，新年快樂。', response: ['晚安，新年快樂。', '明年見。'], affection: 1 },
    ] },
  ],
  yanming: [
    { incoming: '我剛剛回去又確認了一次，用品都收齊了。', choices: [
      { text: '你真的很仔細欸，連這個都要再確認。', response: ['習慣了，東西收好，明天就不用再找。', '不過今天大家都有幫忙，省了不少時間。'], affection: 3 },
      { text: '有沒有少了什麼？我可以幫你想。', response: ['目前看起來都齊全。', '謝謝妳，妳今天也幫了不少忙。'], affection: 2 },
      { text: '你終於可以休息了吧？', response: ['哈哈，差不多了。', '今天也該讓自己放鬆一下。'], affection: 2 },
    ] },
    { incoming: '今天大家一起倒數的時候，真的很有精神。', choices: [
      { text: '佑達喊得最大聲，差點把大家蓋過去。', response: ['他一直都很有活力。', '有他帶頭，氣氛確實熱鬧很多。'], affection: 2 },
      { text: '瑪莎一直亂喊，害我差點笑到數錯。', response: ['哈哈，我也有聽到。', '他有時候就是喜歡故意鬧大家。'], affection: 3 },
      { text: '我覺得大家一起喊的時候很感動。', response: ['嗯，能聚在一起不容易。', '希望明年也有機會這樣。'], affection: 3 },
    ] },
    { incoming: '新的一年，妳有沒有什麼想完成的事情？', choices: [
      { text: '想把課業和生活安排得更好一點。', response: ['這個目標很好。', '不用一次做到完美，慢慢調整就可以。'], affection: 3 },
      { text: '想多跟朋友出去走走，不要一直待在家。', response: ['也很好。', '平常忙的時候，確實容易忘記留時間給自己。'], affection: 2 },
      { text: '想學一件新的事情，還沒決定是什麼。', response: ['可以先想想自己有興趣的方向。', '有時候不用急著決定，遇到機會再試試看。'], affection: 2 },
    ] },
    { incoming: '今天買的東西大家都很喜歡，謝謝妳下午一起幫忙。', choices: [
      { text: '不客氣啊，跟你一起買東西很順利。', response: ['哈哈，這樣我就放心了。', '下次有需要再一起去。'], affection: 3 },
      { text: '主要是你清單整理得好，不然我也會迷路。', response: ['大家分工就會比較有效率。', '妳也很會挑東西，幫了不少忙。'], affection: 2 },
      { text: '下次記得先把清單背面也看完。', response: ['哈哈，這次沒有漏掉。', '妳倒是記得很清楚。'], affection: 1 },
    ] },
    { incoming: '那今天就先休息。希望新的一年，大家都能平安順利。', choices: [
      { text: '你也是，別總是把大家的事放在自己前面。', response: ['謝謝妳，我會注意。', '妳也要好好照顧自己。'], affection: 3 },
      { text: '明年還要一起出去玩喔。', response: ['好，有機會大家再約。', '希望大家都能排出時間。'], affection: 2 },
      { text: '晚安，明年見！', response: ['晚安，新年快樂。', '明年見。'], affection: 1 },
    ] },
  ],
  youda: [
    { incoming: '哈哈哈哈！我剛剛回家還在回想大家倒數的聲音，真的超大聲！', choices: [
      { text: '你自己喊最大聲，還好意思說大家。', response: ['我那是帶氣氛啦！', '不然怎麼會那麼有跨年的感覺！'], affection: 0 },
      { text: '你明年還要負責倒數嗎？', response: ['當然啊！這個工作我先預約！', '明年我還要喊得更大聲！'], affection: 0 },
      { text: '今天真的很好玩，謝謝你準備零食。', response: ['不客氣！大家吃得開心就好！', '下次我再帶更多！'], affection: 0 },
    ] },
    { incoming: '我剛剛才發現，最後那包糖果好像被瑪莎拿走了。', choices: [
      { text: '你現在才發現喔哈哈哈。', response: ['我剛剛在忙著收東西啦！', '下次我要把糖果藏起來！'], affection: 0 },
      { text: '我有看到，他拿得超自然。', response: ['對吧！他根本把那袋當自己的！', '下次我要盯緊一點。'], affection: 0 },
      { text: '算了啦，反正大家都吃得很開心。', response: ['也是啦！跨年就是要大家一起吃！'], affection: 0 },
    ] },
    { incoming: '妳覺得今天的煙火怎麼樣？我覺得最後那個超漂亮！', choices: [
      { text: '真的！最後那個我有看到，超大一朵。', response: ['對啊！我差點忘記倒數！', '還好大家有提醒我。'], affection: 0 },
      { text: '你不是一直在喊，怎麼還有空看？', response: ['我有偷看啦！', '一邊喊一邊看，兩邊都不能少！'], affection: 0 },
      { text: '我比較喜歡大家一起放仙女棒的時候。', response: ['那個也很棒！', '大家站在一起真的很有感覺。'], affection: 0 },
    ] },
    { incoming: '新的一年有空再約大家出來玩吧！', choices: [
      { text: '好啊，下次可以換你們選地方。', response: ['沒問題！我來想！', '不過要先問大家什麼時候有空。'], affection: 0 },
      { text: '可以，但你不准再帶那麼多零食。', response: ['蛤？怎麼可能！', '零食是最重要的準備之一欸！'], affection: 0 },
      { text: '好啊，大家一起最熱鬧了。', response: ['就是說嘛！', '希望今年可以常常聚！'], affection: 0 },
    ] },
    { incoming: '那我先去睡了！新年快樂，再見啦！', choices: [
      { text: '晚安啦，明年見！', response: ['晚安！明年見！'], affection: 0 },
      { text: '你今天回家有沒有把東西放好？', response: ['有啦有啦！', '我不是小孩子了！'], affection: 0 },
      { text: '下次記得先把糖果藏好。', response: ['哈哈哈哈！我會記住這個教訓！'], affection: 0 },
    ] },
  ],
}
