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
    invitation: ['欸，妳下午有空嗎？', '我被我媽派去買年貨，清單長到我看了想直接回家。', '妳來陪我一下啦，至少有人可以一起吐槽。'],
    title: '跟瑪莎去買年貨',
    location: '台北・老街市場',
    blocks: [
      { kind: 'narration', text: '老街入口擠得水洩不通，攤販把一箱箱瓜子、糖果搬到騎樓下，空氣裡全是烤香腸和炸年糕的味道。瑪莎站在柱子旁邊，手裡抓著一張被揉得皺巴巴的清單，另一隻手還拿著剛買的地瓜球。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '妳終於來了！我剛剛已經被問三次要不要加購，差點連自己都一起買下去。' },
      { kind: 'dialogue', speaker: '你', text: '你才來多久就被推銷三次？' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '我看起來很好騙是不是？欸，先不要笑，這張清單真的有問題。' },
      { kind: 'narration', text: '他把清單攤開給你看，紙上密密麻麻寫著零食、水果、飲料，最下面還有幾項你連名字都沒聽過的乾貨。瑪莎嘴上嫌麻煩，卻把地瓜球分了一半給你，還很自然地接過你手上的外套袋。' },
    ],
    rounds: [
      {
        scene: '你們才走到乾貨攤前，一陣風就把清單吹得啪啦作響。瑪莎一手按住紙角、一手還抓著地瓜球，整張紙差點從他手裡飛出去。你趕緊伸手幫忙，兩個人一人壓一邊，像在跟一張紙拔河。',
        promptSpeaker: '蔡昇晏',
        prompt: '欸欸欸！先幫我壓住啦！這張飛走我回家真的會被唸一整年。',
        choices: [
          { text: '你先把地瓜球放下，哪有人兩隻手都在忙還硬要吃。', response: [{ speaker: '蔡昇晏', text: '我這是在補充體力欸！好啦，先交給妳，妳不要趁機把清單改成買一百包零食。' }, { speaker: '你', text: '我才不會，頂多九十九包。' }, { speaker: '蔡昇晏', text: '……妳比我還可怕。' }], affection: { masa: 3 } },
          { text: '我抓清單，你快去跟老闆買東西啦。', response: [{ speaker: '蔡昇晏', text: '遵命，採購組長！那妳看著，不要讓它再飛第二次。' }, { speaker: '蔡昇晏', text: '老闆，花生先來兩包！' }], affection: { masa: 2 } },
          { text: '算了吧，清單飛走我們就可以回家了。', response: [{ speaker: '蔡昇晏', text: '妳敢！我特地把妳約出來，結果第一站就回家，這樣我多沒面子。' }, { speaker: '蔡昇晏', text: '快點啦，等一下請妳吃別的，當作封口費。' }], affection: { masa: 2 } },
        ],
      },
      {
        scene: '零食攤前擺著一排試吃小碟。瑪莎本來說要先照清單買，結果經過不到十秒，他已經拿了兩塊辣味餅乾，還裝作只是替大家確認口味。第一口才咬下去，他就被辣得吸了一口氣，偏偏還硬是不肯承認。',
        promptSpeaker: '蔡昇晏',
        prompt: '這個不錯欸……嘶，有一點辣而已。妳要不要試？',
        choices: [
          { text: '你眼睛都紅了還說只有一點辣？', response: [{ speaker: '蔡昇晏', text: '哪有紅！這是市場太熱。妳到底要不要吃啦？' }, { speaker: '你', text: '好啦，拿來，我幫你驗貨。' }, { speaker: '蔡昇晏', text: '……妳吃完不准笑。' }], affection: { masa: 3 } },
          { text: '買一包回去，讓大家一起受害。', response: [{ speaker: '蔡昇晏', text: '這個提議我喜歡！瑪莎牌跨年挑戰，誰先喝水誰輸。' }, { speaker: '蔡昇晏', text: '不過妳先不要跟溫尚翊說是我買的。' }], affection: { masa: 2 } },
          { text: '你想吃就承認，不用拿大家當藉口。', response: [{ speaker: '蔡昇晏', text: '我本來就想吃啊！我又沒有要假裝。' }, { speaker: '蔡昇晏', text: '老闆，這包也算進去！' }], affection: { masa: 2 } },
        ],
      },
      {
        scene: '水果攤老闆切了一小瓣橘子讓你們試吃。瑪莎先拿了一瓣，酸得整張臉皺起來，還不死心地把另一瓣遞到你面前，說剛剛那塊一定是切到比較酸的地方。',
        promptSpeaker: '蔡昇晏',
        prompt: '妳再試這塊啦，這次一定甜。我剛剛只是運氣不好。',
        choices: [
          { text: '你自己先吃，甜不甜看你的表情就知道。', response: [{ speaker: '蔡昇晏', text: '妳真的很會使喚人欸。好，我吃。' }, { speaker: '蔡昇晏', text: '……欸，這塊真的比較甜。妳看吧，我沒有亂講。' }], affection: { masa: 3 } },
          { text: '好啦，我相信你一次。', response: [{ speaker: '蔡昇晏', text: '這才對嘛！老闆，這袋幫我們挑甜一點的。' }, { speaker: '蔡昇晏', text: '等一下回去如果不好吃，妳可以把責任推給我。' }], affection: { masa: 2 } },
          { text: '我覺得你只是想找人陪你一起被酸到。', response: [{ speaker: '蔡昇晏', text: '被妳發現了。兩個人一起皺眉比較不丟臉啊。' }, { speaker: '蔡昇晏', text: '好啦，這袋買回去，至少可以拿來整佑達。' }], affection: { masa: 2 } },
        ],
      },
      {
        scene: '買完水果，瑪莎把兩袋東西往手腕上一掛，還想空出手去拿路邊攤的試吃。你伸手接過其中一袋，袋子的提把卻突然滑了一下，裡面的橘子差點滾出來。你們同時蹲下去撿，額頭差點撞在一起。',
        promptSpeaker: '蔡昇晏',
        prompt: '欸！小心啦。橘子要是滾到馬路上，我們今天就真的要追著年貨跑了。',
        choices: [
          { text: '你不要一直掛那麼多袋子，分我一點啦。', response: [{ speaker: '蔡昇晏', text: '好啦，這袋給妳。可是提把鬆了，我先幫妳綁一下。' }, { speaker: '蔡昇晏', text: '好了，這次橘子不會離家出走。' }], affection: { masa: 3 } },
          { text: '剛剛是不是差點撞到我？你要負責。', response: [{ speaker: '蔡昇晏', text: '蛤？明明是妳突然蹲下來欸！' }, { speaker: '蔡昇晏', text: '好啦，請妳喝飲料，這樣可以了吧？' }], affection: { masa: 3 } },
          { text: '你看，這就是不專心只顧著吃的下場。', response: [{ speaker: '蔡昇晏', text: '我哪有只顧著吃！我明明還有顧橘子。' }, { speaker: '蔡昇晏', text: '妳不要趁機把我講得一無是處啦。' }], affection: { masa: 1 } },
        ],
      },
      {
        scene: '天色漸暗，市場口掛起一串串紅燈籠。你們終於買到清單最後一樣東西，瑪莎正要把清單收起來，才發現背面還有一行被折痕蓋住的小字。他盯著那行字沉默兩秒，慢慢把紙轉向你。',
        promptSpeaker: '蔡昇晏',
        prompt: '……還有這個。妳先笑沒關係，我現在已經接受今天不可能準時回去了。',
        choices: [
          { text: '哈哈哈哈！你剛剛還說自己很會採買！', response: [{ speaker: '蔡昇晏', text: '我現在宣布，這張清單是我們共同的敵人。' }, { speaker: '蔡昇晏', text: '走啦，最後一站買完，我請妳吃熱的，妳不准再笑。' }], affection: { masa: 3 } },
          { text: '走啦，我陪你買完，不然你回去又要被唸。', response: [{ speaker: '蔡昇晏', text: '算妳有良心。等一下我幫妳拿袋子，妳去挑飲料。' }], affection: { masa: 2 } },
          { text: '我早就說了，清單要先翻面檢查。', response: [{ speaker: '蔡昇晏', text: '妳現在才講！剛剛怎麼不提醒我？' }, { speaker: '蔡昇晏', text: '算了，今天的糗事不准傳到群組。' }], affection: { masa: 1 } },
        ],
      },
    ],
    ending: [
      { kind: 'narration', text: '最後一袋年貨終於買齊。瑪莎把清單揉成一小團塞進口袋，像是終於打完一場仗。你們站在路邊等飲料時，他把剛才買的辣味餅乾往你手裡一塞，還故意裝得很隨便。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '這包先給妳拿，免得回去被那群人搶光。' },
      { kind: 'dialogue', speaker: '你', text: '你不是說要大家一起吃嗎？' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '對啊，所以這包是大家的。只是妳可以先挑第一片，這樣總行了吧？' },
      { kind: 'narration', text: '他說完自己先笑了，伸手把你手上的飲料袋接過去。你們一邊鬥嘴一邊往集合的地方走，瑪莎還不忘提醒你，剛剛那幾件糗事絕對不准告訴其他人。' },
    ],
  },
  ashin: {
    invitation: ['妳今天下午有安排嗎？', '我想去買一點晚上大家要用的東西，也想挑幾張小卡片和裝飾。', '如果妳有空，陪我一起去好不好？我想聽聽妳的意見。'],
    title: '跟阿信去買年貨',
    location: '台北・年貨店與文具店',
    blocks: [
      { kind: 'narration', text: '你到約好的騎樓時，阿信已經在那裡等著。他手裡拿著一張寫得整整齊齊的清單，另一隻手提著兩杯熱豆漿。街口的風把他的頭髮吹得有點亂，他看見你走近，先把其中一杯遞了過來。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '妳來啦。外面風滿大的，先拿著暖暖手。' },
      { kind: 'dialogue', speaker: '你', text: '你怎麼連熱豆漿都準備好了？' },
      { kind: 'dialogue', speaker: '陳信宏', text: '剛剛經過看到就買了，想說妳可能還沒吃東西。走吧，今天想慢慢逛，不用趕。' },
      { kind: 'narration', text: '清單上除了大家要吃的零食和飲料，還多了幾張紅色小卡、包裝用的細繩，以及一個可以掛在集合地點的小燈籠。阿信把紙收進外套口袋，走到店門口時還替你扶住快要被風吹上的門簾。' },
    ],
    rounds: [
      {
        scene: '年貨店裡擺滿透明玻璃罐，梅子糖、牛奶糖和水果糖一層層排得像彩色的小山。老闆看你們進來，立刻拿出幾顆試吃糖。阿信沒有急著拿，反而先把一顆淡黃色的糖放到你掌心。',
        promptSpeaker: '陳信宏',
        prompt: '這個是梅子口味，我剛剛試過，酸酸甜甜的。妳先吃看看，喜不喜歡？',
        choices: [
          { text: '你怎麼知道我會喜歡這種味道？', response: [{ speaker: '陳信宏', text: '上次妳不是說過，太甜的吃幾顆就會膩？我就記得妳比較喜歡這種。' }, { speaker: '陳信宏', text: '如果喜歡，我們買一小包，晚上可以慢慢吃。' }], affection: { ashin: 3 } },
          { text: '好酸！你是不是故意挑最酸的給我？', response: [{ speaker: '陳信宏', text: '真的有那麼酸喔？我剛剛吃覺得還好。' }, { speaker: '陳信宏', text: '那我再找一個甜一點的，妳不要被我這顆嚇跑。' }], affection: { ashin: 2 } },
          { text: '你先吃一顆，我要看你的表情。', response: [{ speaker: '陳信宏', text: '好啊，那我先試。' }, { speaker: '陳信宏', text: '……嗯，這個真的有點酸。妳看，我沒有騙妳吧。' }], affection: { ashin: 2 } },
        ],
      },
      {
        scene: '離開年貨店後，你們走進隔壁的文具店。阿信在一排紅色卡片前停了下來，挑了一張有細細金線的，坐到櫃檯旁的小桌子寫字。他寫到一半忽然停住，筆尖懸在紙上，像是在想怎麼把祝福寫得不那麼制式。',
        promptSpeaker: '陳信宏',
        prompt: '我想在每個人的袋子裡放一張小卡片。妳幫我想一句吧，不要只有「新年快樂」四個字。',
        choices: [
          { text: '寫「新的一年也要常常見面」啊。', response: [{ speaker: '陳信宏', text: '這句很好，我喜歡。' }, { speaker: '陳信宏', text: '那我每張都寫一遍，大家看到應該會笑吧。' }], affection: { ashin: 3 } },
          { text: '你自己寫啦，我想看你會寫什麼。', response: [{ speaker: '陳信宏', text: '那我就不客氣了。' }, { speaker: '陳信宏', text: '希望新的一年，大家都能把喜歡的事情好好做下去。這樣會不會太認真？' }], affection: { ashin: 2 } },
          { text: '寫「零食不准被瑪莎一個人吃完」！', response: [{ speaker: '陳信宏', text: '哈哈，這句我一定要寫在他的那張上面。' }, { speaker: '陳信宏', text: '不過他看到大概會先抗議。' }], affection: { ashin: 2 } },
        ],
      },
      {
        scene: '阿信把卡片和細繩放在桌上，準備把小卡綁到紙袋上。沒想到他拉得太急，細繩整圈纏到自己的手指，越解越亂。你忍不住笑出聲，他也低頭看著那團結，無奈地笑了。',
        promptSpeaker: '陳信宏',
        prompt: '我好像把自己打結了。妳可以幫我拉住這邊嗎？不然等一下卡片還沒綁好，我先被繩子綁住。',
        choices: [
          { text: '把手給我，我幫你解開。', response: [{ speaker: '陳信宏', text: '好，麻煩妳了。' }, { speaker: '陳信宏', text: '妳看，妳一來事情就變簡單了。' }], affection: { ashin: 3 } },
          { text: '哈哈哈哈，你平常不是很會寫字嗎？怎麼連繩子都不會。', response: [{ speaker: '陳信宏', text: '寫字跟打蝴蝶結是兩回事吧。' }, { speaker: '陳信宏', text: '好啦，妳笑完再救我一下。' }], affection: { ashin: 2 } },
          { text: '剪刀呢？我們不要跟這條繩子硬碰硬。', response: [{ speaker: '陳信宏', text: '這個方法比較直接。' }, { speaker: '陳信宏', text: '不過剪掉的話就要重新綁了，妳陪我再試一次？' }], affection: { ashin: 2 } },
        ],
      },
      {
        scene: '最後一間雜貨店門口掛著幾盞紙燈籠。老闆把其中一盞點亮，暖黃色的光透過紙面，照得旁邊的紅色裝飾也亮了起來。阿信站在燈籠旁邊看了一會兒，伸手把快滑下來的吊繩扶正。',
        promptSpeaker: '陳信宏',
        prompt: '這盞掛在晚上集合的地方應該很漂亮。妳幫我拿一下下面，我把繩子整理好。',
        choices: [
          { text: '我拿著，你慢慢弄，不要急。', response: [{ speaker: '陳信宏', text: '好，謝謝妳。' }, { speaker: '陳信宏', text: '等一下掛起來，大家遠遠就看得到我們在哪裡了。' }], affection: { ashin: 3 } },
          { text: '這盞很像小時候過年家裡掛的那種。', response: [{ speaker: '陳信宏', text: '對啊，我剛剛也是想到以前家裡的樣子。' }, { speaker: '陳信宏', text: '有些東西好像不用很貴，看到就會覺得很有過年的感覺。' }], affection: { ashin: 2 } },
          { text: '你站旁邊，我幫你拍一張跟燈籠的合照。', response: [{ speaker: '陳信宏', text: '蛤？我也要拍喔？' }, { speaker: '陳信宏', text: '好啦，那妳拍好看一點，我等一下也幫妳拍。' }], affection: { ashin: 2 } },
        ],
      },
      {
        scene: '天色暗下來，你們提著裝好的紙袋往街口走。風忽然變大，最上面那張小卡差點被吹走，阿信伸手去接，你也同時伸出手，兩個人的指尖在紙邊碰了一下。他把卡片壓回袋子裡，抬頭時笑得有點不好意思。',
        promptSpeaker: '陳信宏',
        prompt: '差點飛走了。還好妳也有看到，不然我今天寫的字就要先去流浪了。',
        choices: [
          { text: '那張卡片很重要喔？你一直顧著它。', response: [{ speaker: '陳信宏', text: '嗯，寫了那麼久，當然想好好交到大家手上。' }, { speaker: '陳信宏', text: '而且有一張我另外留著，想等一下給妳。' }], affection: { ashin: 3 } },
          { text: '你放心，我幫你把袋口壓好。', response: [{ speaker: '陳信宏', text: '好，那我就不用一路跟風比賽了。' }, { speaker: '陳信宏', text: '今天有妳一起，真的輕鬆很多。' }], affection: { ashin: 2 } },
          { text: '你看吧，卡片真的要綁緊一點。', response: [{ speaker: '陳信宏', text: '收到，老師。下次我會記得打兩個結。' }, { speaker: '陳信宏', text: '妳不要因為這樣就不讓我負責寫卡片喔。' }], affection: { ashin: 2 } },
        ],
      },
    ],
    ending: [
      { kind: 'narration', text: '走到路口時，阿信從外套口袋裡拿出一張折得很整齊的小卡片，沒有和其他人的放在一起。他把卡片遞給你，紙上只寫了短短幾行字，字跡比剛才寫給大家的還要慢、還要仔細。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '這張是給妳的。剛剛想了很久，還是覺得親手寫比較好。' },
      { kind: 'narration', text: '你低頭看著卡片，心裡像被那杯熱豆漿暖了一下。阿信沒有催你看完，只是把比較重的袋子換到另一隻手，陪你慢慢走到路口。' },
    ],
  },
  stone: {
    invitation: ['妳下午有空嗎？', '我想去市場買點跨年要用的東西，順便看看有沒有適合拍照的小東西。', '妳陪我走一趟好不好？有人一起逛，應該比較容易挑。'],
    title: '跟石頭去買年貨',
    location: '台北・市場旁的雜貨店',
    blocks: [
      { kind: 'narration', text: '市場旁的小巷掛著一串紅燈籠，光落在濕漉漉的地面上。石頭比約定時間早到了幾分鐘，肩上背著相機包，手裡提著一個布袋，正蹲在路邊拍燈籠映在水窪裡的倒影。' },
      { kind: 'dialogue', speaker: '石錦航', text: '妳來了。等一下，我剛剛拍到一個滿漂亮的角度，妳看。' },
      { kind: 'narration', text: '他把相機轉過來給你看，照片裡的紅燈籠被水面映成兩個，旁邊還有一點路過行人的模糊影子。你才看完，他就把相機收好，伸手替你把被風吹起來的圍巾壓回外套裡。' },
      { kind: 'dialogue', speaker: '石錦航', text: '今天不只買東西，也想順便留幾張照片。妳不用特別擺姿勢，照平常那樣就很好。' },
      { kind: 'narration', text: '你們走進市場，攤販的叫賣聲和塑膠袋摩擦聲混在一起。石頭走在你身旁，偶爾停下來拍一張，又很自然地等你跟上。' },
    ],
    rounds: [
      {
        scene: '經過一個掛滿紅燈籠的攤位時，石頭忽然停下腳步。你正低頭看一排糖果，沒注意到他已經把相機舉起來，快門聲很輕地響了一下。你一抬頭，他立刻把相機放低，笑著指了指剛拍好的畫面。',
        promptSpeaker: '石錦航',
        prompt: '剛剛那張不是故意偷拍妳啦，是妳看糖果的樣子剛好很好看。要不要看一下？',
        choices: [
          { text: '給我看！你不准把我拍得很奇怪。', response: [{ speaker: '石錦航', text: '好，妳自己檢查。' }, { speaker: '石錦航', text: '我覺得很自然啊，妳看得很認真，像是整個市場只剩那一排糖果。' }], affection: { stone: 3 } },
          { text: '你先說，有沒有把我拍得很胖？', response: [{ speaker: '石錦航', text: '沒有啦，角度很好。' }, { speaker: '石錦航', text: '而且照片又不是拿來挑毛病的，是想把那個瞬間留下來。' }], affection: { stone: 2 } },
          { text: '那你也站過來，我們拍一張。', response: [{ speaker: '石錦航', text: '好啊。等一下我把相機放穩，這張就不要只有我在鏡頭後面了。' }], affection: { stone: 3 } },
        ],
      },
      {
        scene: '你們走進雜貨店挑零食。石頭拿起一包餅乾，正要放進布袋，卻發現包裝上的插畫和旁邊一張舊海報很像。他把兩樣東西放在一起比了比，忽然笑了。',
        promptSpeaker: '石錦航',
        prompt: '妳看，這個包裝是不是很像以前的廣告？我想買一包，吃完還想把包裝留下來。',
        choices: [
          { text: '你連零食包裝都要收藏喔？', response: [{ speaker: '石錦航', text: '有時候圖案很有意思嘛。' }, { speaker: '石錦航', text: '而且這個口味大家應該也會喜歡，買回去一起吃。' }], affection: { stone: 2 } },
          { text: '那你拿著，我幫你拍一張和海報的合照。', response: [{ speaker: '石錦航', text: '好，妳站那邊一點，燈光剛好不會反光。' }, { speaker: '石錦航', text: '妳拍得比我想像中好欸。' }], affection: { stone: 3 } },
          { text: '買啦，反正你都已經研究這麼久了。', response: [{ speaker: '石錦航', text: '被妳看出來了。' }, { speaker: '石錦航', text: '好，那就買。等一下也讓妳挑一包喜歡的。' }], affection: { stone: 2 } },
        ],
      },
      {
        scene: '結帳時，店員把餅乾和飲料裝進同一個紙袋。石頭一眼就看見袋底有點潮，立刻把飲料拿出來，蹲在門邊重新整理。你幫忙扶住袋口，他把最容易壓碎的餅乾放到上面。',
        promptSpeaker: '石錦航',
        prompt: '這樣應該比較安全。妳幫我扶一下，我把袋子重新分開，不然餅乾回去可能都碎掉了。',
        choices: [
          { text: '我拿飲料，你拿餅乾，這樣就不會壓到了。', response: [{ speaker: '石錦航', text: '好，這樣最剛好。' }, { speaker: '石錦航', text: '謝謝妳，妳反應很快。' }], affection: { stone: 3 } },
          { text: '你蹲著整理，我幫你把相機包拿好。', response: [{ speaker: '石錦航', text: '那就麻煩妳了，裡面有底片，別讓它碰到水。' }, { speaker: '石錦航', text: '妳幫我顧著，我就可以放心整理。' }], affection: { stone: 2 } },
          { text: '餅乾碎掉也沒關係，反正還是可以吃。', response: [{ speaker: '石錦航', text: '妳講得也有道理。' }, { speaker: '石錦航', text: '不過我還是想讓大家拿到完整的，回去拆開比較有過年的感覺。' }], affection: { stone: 1 } },
        ],
      },
      {
        scene: '走出店門，旁邊的小攤正在賣明信片。石頭停下來翻了幾張，挑到一張拍著冬天街景的照片。他把明信片放在掌心，和相機裡剛才拍的燈籠比了一下。',
        promptSpeaker: '石錦航',
        prompt: '這張的光線跟剛才那條巷子很像。妳覺得要不要買下來？我想把它留著。',
        choices: [
          { text: '買啊，這張很像今天的我們。', response: [{ speaker: '石錦航', text: '嗯，我也有這種感覺。' }, { speaker: '石錦航', text: '那我多買一張，妳也留一張，好不好？' }], affection: { stone: 3 } },
          { text: '你挑的東西都很有自己的味道欸。', response: [{ speaker: '石錦航', text: '謝謝。可能是因為我會記得看到它時的感覺。' }, { speaker: '石錦航', text: '今天這一趟，我應該也會記得很久。' }], affection: { stone: 3 } },
          { text: '你喜歡就買，不用問我啦。', response: [{ speaker: '石錦航', text: '好，那我就收下。' }, { speaker: '石錦航', text: '不過妳的那張我還是想讓妳自己挑。' }], affection: { stone: 2 } },
        ],
      },
      {
        scene: '天色暗下來，市場口的燈籠一盞盞亮起。石頭把買好的東西放在長椅旁，將相機架在一個穩固的位置，調好倒數。他站到你旁邊，卻還留了一點距離，像是在等你決定要不要靠近。',
        promptSpeaker: '石錦航',
        prompt: '今天拍了好多東西，好像還少一張。妳要不要跟我一起拍？就一張，不用很正式。',
        choices: [
          { text: '好啊，你站近一點，不然拍不到。', response: [{ speaker: '石錦航', text: '這樣可以嗎？' }, { speaker: '石錦航', text: '好，倒數要開始了。妳看鏡頭，不要看我啦。' }], affection: { stone: 3 } },
          { text: '你先笑一下，不然照片看起來像證件照。', response: [{ speaker: '石錦航', text: '哈哈，好，我努力。' }, { speaker: '石錦航', text: '妳也不要笑到閉眼，等一下我們兩個都拍糊了。' }], affection: { stone: 3 } },
          { text: '今天先不要拍合照，我想記得現在這個樣子就好。', response: [{ speaker: '石錦航', text: '好，那就不拍。' }, { speaker: '石錦航', text: '有些畫面留在心裡也很好，等一下我再陪妳慢慢走回去。' }], affection: { stone: 2 } },
        ],
      },
    ],
    ending: [
      { kind: 'narration', text: '石頭把相機收回包裡，確認底片沒有受潮，又把那張明信片放進一個乾淨的紙套。他把紙套遞給你，說洗好的照片也會一起整理好。' },
      { kind: 'dialogue', speaker: '石錦航', text: '這張先給妳。照片洗出來以後，我想把今天拍到的那張也送妳。' },
      { kind: 'narration', text: '你把明信片收進外套口袋。石頭提起比較重的布袋，走在你身旁，偶爾停下來替你避開迎面而來的人潮。這趟採買沒有很趕，卻留下了好多值得慢慢看的小畫面。' },
    ],
  },
  yanming: {
    invitation: ['我下午要去市場補一些晚上用的東西。', '零食、飲料和仙女棒都還差幾樣，我已經列好清單了。', '妳有空陪我去一趟嗎？也幫我看看大家會喜歡哪種口味。'],
    title: '跟諺明哥去買年貨',
    location: '台北・市場與雜貨行',
    blocks: [
      { kind: 'narration', text: '你到市場入口時，諺明哥已經等在騎樓下。他手裡拿著一張分好類的清單，另一隻手還提著兩杯熱飲。看見你過來，他先把其中一杯遞給你，才把清單折好收進口袋。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '先喝一點，外面風大。等一下裡面人多，可能沒空慢慢喝。' },
      { kind: 'dialogue', speaker: '你', text: '你連這個都先準備好了喔？' },
      { kind: 'dialogue', speaker: '劉諺明', text: '剛好路過就買了。今天東西不少，妳不用急，跟著我慢慢逛就好。' },
      { kind: 'narration', text: '清單上的東西分成幾類，哪些先買、哪些最後再拿都標得清清楚楚。不過他沒有一到市場就照著清單往前衝，而是先陪你在入口旁邊讓開人潮，等你喝完熱飲才一起走進去。' },
    ],
    rounds: [
      {
        scene: '乾貨攤的老闆一看到你們，就熱情地舀了一大袋瓜子，份量比清單上寫的多出不少。諺明哥看了看秤，又看了看你，像是在等你幫忙判斷要不要真的買這麼多。',
        promptSpeaker: '劉諺明',
        prompt: '老闆好像很怕我們不夠吃。這一袋有點多了，妳幫我看一下，大家真的吃得完嗎？',
        choices: [
          { text: '買小一點就好，留點胃給其他零食。', response: [{ speaker: '劉諺明', text: '好，那就照原本的量。' }, { speaker: '劉諺明', text: '不然照這個份量買回去，瑪莎可能會說我們打算讓他吃到明年。' }], affection: { yanming: 3 } },
          { text: '多一點也沒關係，大家聚在一起很快就吃完了。', response: [{ speaker: '劉諺明', text: '妳說得也有道理。那多留一點，吃不完就帶回去。' }, { speaker: '劉諺明', text: '今晚人多，準備充足一點比較安心。' }], affection: { yanming: 2 } },
          { text: '你去跟老闆說啦，我在旁邊幫你加油。', response: [{ speaker: '劉諺明', text: '哈哈，好，那就交給我。' }, { speaker: '劉諺明', text: '不過妳等一下要負責幫我挑飲料，這樣才公平。' }], affection: { yanming: 2 } },
        ],
      },
      {
        scene: '飲料店前排了幾個人。諺明哥照著清單念口味，老闆卻連續問了兩次甜度和數量。你看他一邊記、一邊還要顧著手上的袋子，忍不住伸手把筆接過來。',
        promptSpeaker: '劉諺明',
        prompt: '謝謝妳幫我記。那妳自己的要不要也點一杯？不要只顧著幫大家買，忘了自己想喝什麼。',
        choices: [
          { text: '我要跟你一樣的，省得你又算錯。', response: [{ speaker: '劉諺明', text: '我剛剛沒有算錯，是老闆問得太快。' }, { speaker: '劉諺明', text: '好，那就一樣的。等一下我幫妳拿，妳先把筆收好。' }], affection: { yanming: 3 } },
          { text: '我要甜一點的，今天跨年要開心。', response: [{ speaker: '劉諺明', text: '好，今天就讓妳選甜的。' }, { speaker: '劉諺明', text: '不過喝慢一點，等一下還要走一段路。' }], affection: { yanming: 2 } },
          { text: '我喝你手上那杯就好。', response: [{ speaker: '劉諺明', text: '這杯我還沒喝。' }, { speaker: '劉諺明', text: '不過妳如果想試一口可以，自己的還是幫妳買一杯。' }], affection: { yanming: 3 } },
        ],
      },
      {
        scene: '雜貨行裡擺著仙女棒、紙杯、垃圾袋和幾種小型煙火。諺明哥拿起一盒看了看標示，確認使用方式和注意事項，才放進籃子。你在旁邊看他這麼認真，忍不住伸手拿起另一盒比較。',
        promptSpeaker: '劉諺明',
        prompt: '這種要先看清楚使用方式，晚上人多，安全最重要。妳拿的那盒也給我看一下，我們挑標示清楚的。',
        choices: [
          { text: '好啦，安全隊長，交給你檢查。', response: [{ speaker: '劉諺明', text: '這個稱號聽起來還不錯。' }, { speaker: '劉諺明', text: '妳負責挑好看的，我負責確認安全，分工剛好。' }], affection: { yanming: 3 } },
          { text: '那我們買仙女棒就好，不要挑太大的。', response: [{ speaker: '劉諺明', text: '我也這麼想。' }, { speaker: '劉諺明', text: '大家一起玩小支的就很有氣氛了，不需要買太危險的。' }], affection: { yanming: 2 } },
          { text: '你看得好仔細，我剛剛只看包裝漂亮不漂亮。', response: [{ speaker: '劉諺明', text: '漂亮也要挑，不過先確認能不能安心使用。' }, { speaker: '劉諺明', text: '妳剛剛挑的顏色不錯，等一下可以拿那盒。' }], affection: { yanming: 2 } },
        ],
      },
      {
        scene: '走出雜貨行時，裝著飲料的袋子突然往一邊歪。諺明哥立刻伸手托住袋底，把幾瓶飲料重新分開。你也把手上的紙杯和裝飾用品挪到另一邊，兩個人站在騎樓下整理了好一會兒。',
        promptSpeaker: '劉諺明',
        prompt: '這樣分比較穩。妳拿紙杯和小裝飾就好，重的我來。要是手不舒服就換我拿。',
        choices: [
          { text: '我又不是紙做的，重的也可以拿。', response: [{ speaker: '劉諺明', text: '我知道妳拿得動。' }, { speaker: '劉諺明', text: '那我們一人一袋，走累了就交換，不要逞強。' }], affection: { yanming: 3 } },
          { text: '好，那我負責看著你不要漏東西。', response: [{ speaker: '劉諺明', text: '這個工作很重要，交給妳了。' }, { speaker: '劉諺明', text: '我剛剛差點把收據留在櫃檯，還好妳有看到。' }], affection: { yanming: 2 } },
          { text: '那你拿重的，我幫你把袋口綁好。', response: [{ speaker: '劉諺明', text: '好，麻煩妳了。' }, { speaker: '劉諺明', text: '妳綁得比我整齊，回去應該不會一路掉東西。' }], affection: { yanming: 2 } },
        ],
      },
      {
        scene: '最後一間攤子在賣剛出爐的紅豆餅，熱氣從鐵板邊緣冒出來。你原本只是停下來看了一眼，諺明哥卻已經把手上的袋子放好，轉身去跟老闆買了兩個。等他回來時，還把比較完整、沒有破皮的那一個遞給你。',
        promptSpeaker: '劉諺明',
        prompt: '先吃一個暖暖手吧。採買差不多完成了，剩下的回去再整理。',
        choices: [
          { text: '你怎麼知道我想吃？', response: [{ speaker: '劉諺明', text: '妳剛剛在攤子前面停了兩次。' }, { speaker: '劉諺明', text: '我只是想說，難得出來一趟，也不要只記得買大家的東西。' }], affection: { yanming: 3 } },
          { text: '那我要挑大的，你不准跟我換。', response: [{ speaker: '劉諺明', text: '好，這個大的給妳。' }, { speaker: '劉諺明', text: '我吃小的就好，妳慢慢吃，裡面很燙。' }], affection: { yanming: 3 } },
          { text: '你也坐下來吃，不要一直忙。', response: [{ speaker: '劉諺明', text: '好，我陪妳吃完再走。' }, { speaker: '劉諺明', text: '今天事情都差不多了，難得可以慢慢休息一下。' }], affection: { yanming: 2 } },
        ],
      },
    ],
    ending: [
      { kind: 'narration', text: '你們坐在騎樓邊把紅豆餅吃完，諺明哥才重新拿出清單，一項一項確認。這次他沒有急著把最後一格打勾，而是把筆遞給你，讓你替他畫上最後那個記號。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '好了，這樣就齊了。今天有妳陪我，事情做得很順，還多了時間吃點東西。' },
      { kind: 'dialogue', speaker: '你', text: '所以我不是來當免費搬運工的喔？' },
      { kind: 'dialogue', speaker: '劉諺明', text: '當然不是。妳是來陪我採買的，搬東西只是順便。' },
      { kind: 'narration', text: '他笑著把比較重的袋子提起來，另一隻手替你扶住差點滑落的紙袋。市場裡還是很吵，回程的路卻走得比來時慢了一點。' },
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
  { kind: 'narration', text: '你走過去，才發現他們真的準備了不少東西。零食、飲料、仙女棒、小型煙火，還有一條不知道誰帶來的紅色圍巾。七個人難得都聚在一起，光是站在這裡就已經吵得像一場小型演唱會。' },
]

export const yearEndFireworksRounds: YearEndRound[] = [
  {
    scene: '佑達把零食袋放到中間，宣布要先分配大家的工作。瑪莎立刻說自己負責試吃，結果被石頭伸手把整袋往後挪了一點。',
    promptSpeaker: '錢佑達',
    prompt: '那妳要不要幫忙分零食？還是要跟瑪莎一起負責「試吃」？',
    choices: [
      { text: '我負責分，瑪莎負責站遠一點。', response: [{ speaker: '蔡昇晏', text: '蛤？為什麼我被排擠？' }, { speaker: '錢佑達', text: '因為你剛剛已經偷吃兩包了啦！' }], affection: { masa: 2 } },
      { text: '我跟瑪莎一起試吃，這工作很重要。', response: [{ speaker: '蔡昇晏', text: '聽到沒有！終於有人懂我的專業。' }, { speaker: '溫尚翊', text: '你們兩個最好不要把整袋吃完。' }], affection: { masa: 3 } },
      { text: '我去幫石頭整理相機，零食交給你們。', response: [{ speaker: '石錦航', text: '好啊，這邊有幾張底片要先收好，妳幫我拿一下。' }, { speaker: '陳信宏', text: '那我來分飲料，大家先不要全部擠在一起啦。' }], affection: { stone: 2, ashin: 1 } },
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
      { text: '好啊，我站中間，大家不准躲到後面。', response: [{ speaker: '石錦航', text: '好，我會把大家都拍進去。妳站那邊，光線比較剛好。' }, { speaker: '陳信宏', text: '我幫妳拿一下仙女棒，等拍完再還妳。' }], affection: { stone: 3, ashin: 1 } },
      { text: '我想跟大家一起拍，不要只有我一個人。', response: [{ speaker: '石錦航', text: '嗯，這樣比較好。大家靠近一點，不然會拍不進去。' }, { speaker: '錢佑達', text: '欸欸欸，瑪莎不要在最後一秒做鬼臉！' }], affection: { stone: 2, masa: 1 } },
      { text: '先不要拍啦，我想好好看一下煙火。', response: [{ speaker: '石錦航', text: '好，那就先玩。等一下如果妳想拍，再叫我就好。' }, { speaker: '陳信宏', text: '沒關係，今天不用每一刻都留下來，記得就好了。' }], affection: { stone: 2, ashin: 2 } },
    ],
  },
  {
    scene: '時間越來越接近午夜。大家把最後幾支仙女棒分完，佑達看了一眼手錶，立刻大喊還有十秒。瑪莎先喊了五，溫尚翊叫他不要亂帶，結果所有人都跟著笑起來。',
    promptSpeaker: '溫尚翊',
    prompt: '欸，快十二點了。妳要不要過來一點？等一下煙火升起來才看得到。',
    choices: [
      { text: '走到溫尚翊旁邊，跟他一起倒數。', response: [{ speaker: '溫尚翊', text: '站這裡就好，等一下不要被後面的人撞到。' }, { speaker: '蔡昇晏', text: '喔——有人先卡位喔！' }], affection: { wen: 3, masa: 1 } },
      { text: '拉著瑪莎一起倒數，誰也不准搶拍子。', response: [{ speaker: '蔡昇晏', text: '好啊！我數得比佑達準多了。' }, { speaker: '錢佑達', text: '你不要亂講！我剛剛明明數得很好！' }], affection: { masa: 3 } },
      { text: '站到大家中間，讓所有人都一起入鏡。', response: [{ speaker: '石錦航', text: '好，我把相機準備好。這次一定要拍到大家。' }, { speaker: '陳信宏', text: '那我們一起喊喔，等一下不要有人太早喊喔。' }, { speaker: '劉諺明', text: '大家注意腳下，站穩一點。' }], affection: { stone: 2, ashin: 2, yanming: 2 } },
    ],
  },
]

export const yearEndFireworksEnding: YearEndStoryBlock[] = [
  { kind: 'narration', text: '「十、九、八——」佑達的聲音最大，瑪莎故意慢半拍，還被他伸手推了一下。阿信笑著跟上，石頭一邊倒數一邊確認快門，諺明哥站在旁邊提醒大家不要往前擠。' },
  { kind: 'narration', text: '「三、二、一——新年快樂！」' },
  { kind: 'narration', text: '第一聲煙火在夜空中炸開，接著又是一朵、兩朵，金色和紅色的光映在每個人的臉上。有人大聲歡呼，有人抬頭看得忘了說話，還有人在煙火聲裡喊著新年快樂，喊到最後自己都笑了。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '一九九七年啦！！！新年快樂！！！' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '欸欸欸，剛剛那個最大聲的有沒有嚇到？哈哈哈哈！' },
  { kind: 'dialogue', speaker: '陳信宏', text: '新年快樂。希望大家今年都可以好好的。' },
  { kind: 'dialogue', speaker: '石錦航', text: '等一下我把照片洗出來，再拿給大家看。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '先把東西收好，垃圾記得帶走。今天玩得開心就好。' },
  { kind: 'narration', text: '溫尚翊站在你旁邊，手裡還拿著最後一支沒有點燃的仙女棒。他看著天空，過了一會兒才轉頭看你。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '新年快樂啦。今天有來就好。' },
  { kind: 'narration', text: '你們沒有急著散開。煙火還在遠處一聲聲響著，零食袋被風吹得沙沙作響，七個人的聲音混在一起，吵吵鬧鬧的，卻讓這個跨年夜變得格外真實。' },
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
    { text: '新年快樂！剛剛真的很漂亮，我有偷偷許願。', response: ['真的喔？那希望妳許的願望可以實現。', '我剛剛也有想一件事情，不過先不告訴妳。'], affection: 3 },
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
    { text: '新年快樂！希望妳今年也一直開開心心。', response: ['謝謝妳。', '也希望妳今年每天都可以遇到一點值得開心的小事。'], affection: 3 },
    { text: '新年快樂！剛剛那個煙火我還想再看一次。', response: ['我也是。', '有些畫面真的會想多記一下。'], affection: 2 },
    { text: '新年快樂～你回家了嗎？', response: ['快到了，妳呢？', '今天晚上有點冷，回去記得喝點熱的。'], affection: 1 },
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
      { text: '我也有看到，顏色很漂亮。', response: ['對啊，先是金色，後來又變成紅色。', '我本來想記下來，結果一下子就消失了。'], affection: 3 },
      { text: '你是不是又在腦袋裡畫畫了？', response: ['哈哈，有一點。', '剛剛那個畫面很適合畫成一張小卡片。'], affection: 2 },
      { text: '我只記得瑪莎一直在旁邊叫。', response: ['他真的很有精神欸。', '不過有他在，大家都不會冷場。'], affection: 1 },
    ] },
    { incoming: '我剛才有點想把那個畫面畫下來。', choices: [
      { text: '那你畫好了，畫完記得給我看。', response: ['好啊，我可以試試看。', '不過可能要等我有空，妳不要催我啦。'], affection: 3 },
      { text: '你可以把煙火畫得很漂亮吧。', response: ['謝謝妳。', '其實我還想把大家站在一起的樣子也畫進去。'], affection: 2 },
      { text: '畫煙火是不是很難？', response: ['有一點，要把光的感覺留下來。', '不過越難的東西，反而越想試試看。'], affection: 1 },
    ] },
    { incoming: '妳剛剛有沒有許願？', choices: [
      { text: '有啊，希望今年可以多見到大家。', response: ['這個願望很好耶。', '我也希望大家忙歸忙，還是可以常常聚在一起。'], affection: 3 },
      { text: '有，但不能告訴你。', response: ['哈哈，好啦，我不問。', '希望妳的願望可以實現。'], affection: 2 },
      { text: '我忙著看煙火，忘記許願了。', response: ['那也沒關係。', '有時候好好看著眼前的畫面，也是一件很好的事。'], affection: 1 },
    ] },
    { incoming: '新的一年，妳有沒有想做什麼不一樣的事？', choices: [
      { text: '想學一點畫畫，至少不要每次都畫歪。', response: ['可以啊，我可以教妳一些簡單的。', '不用急，先從自己喜歡的東西開始畫就好啦。'], affection: 3 },
      { text: '想多聽一些新的音樂。', response: ['這個我可以推薦妳。', '下次整理好歌單再傳給妳。'], affection: 2 },
      { text: '還沒想好，先把眼前的事做好。', response: ['這樣也很好。', '不用急著替新的一年安排太多事情。'], affection: 1 },
    ] },
    { incoming: '那今天就先聊到這裡吧。新的一年也請多多指教喔。', choices: [
      { text: '請多多指教！你也要常常找我聊天。', response: ['好啊，我會記得的。', '妳也可以主動傳訊息來，不用客氣啦。'], affection: 3 },
      { text: '你不要只會說，真的要做到喔。', response: ['哈哈，好，我答應妳。', '不會讓妳等太久的。'], affection: 2 },
      { text: '晚安，新年快樂。', response: ['晚安喔。', '希望妳今晚睡個好覺。'], affection: 1 },
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
