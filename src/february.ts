export type FebruaryCharacterId = 'wen' | 'ashin' | 'masa' | 'stone' | 'yanming'
export type FebruaryStoryBlock = { kind: 'narration' | 'dialogue' | 'aside'; text: string; speaker?: string }
export type FebruaryChoice = {
  text: string
  response: FebruaryStoryBlock[]
  affection: Partial<Record<FebruaryCharacterId, number>>
}
export type FebruaryRound = {
  scene: string
  promptSpeaker: string
  prompt: string
  choices: FebruaryChoice[]
}
export type FebruaryAfterDinnerRoute = {
  label: string
  title: string
  blocks: FebruaryStoryBlock[]
  rounds: FebruaryRound[]
  endingBlocks: FebruaryStoryBlock[]
}
export type FebruaryDiaryData = { title: string; text: string }

export const februaryIntroBlocks: FebruaryStoryBlock[] = [
  { kind: 'narration', text: '二月初，寒假已經過了一大半。午後的練團室開著窗，外頭偶爾傳來機車經過的聲音。你抱著飲料坐在沙發上，看他們剛練完一輪，幾個人把樂器放到一旁，桌上攤著一份活動簡章和報名表。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '欸，我剛剛看了一下報名資料。三二九野台開唱，這邊要填樂團名稱、成員，還有表演資料。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '那團名就先寫 So Band 嗎？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '對啊，不然咧？不是一直都叫這個嗎？' },
  { kind: 'narration', text: '瑪莎原本正低頭拆餅乾，聽見 So Band，手上的動作忽然停了一下。他抬起頭，像是腦袋裡有什麼東西轉了一圈。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '等一下。So Band……欸？' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '你們把它倒過來念看看。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '蛤？為什麼？' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: 'So Band、Band So……靠北，聽起來很像便所欸！' },
  { kind: 'narration', text: '桌邊安靜了兩秒。溫尚翊先是愣住，接著直接笑出聲，阿信也把報名表放低，肩膀抖個不停。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '哈哈哈哈哈！靠，還真的有點像欸！' },
  { kind: 'dialogue', speaker: '石錦航', text: '你這樣講，我現在也覺得很像了。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '哪裡像啦！你們不要亂聯想好不好！' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '不是啊，你自己念。So Band、Band So。難道我們要頂著這個名字去野台開唱，讓人家以為我們是來開公共廁所的？' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '哈哈哈哈哈，好啦，趁這次報名換一個啦。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '不然到時候主持人一介紹，台下先笑成一團，歌都還沒唱就先輸了。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '那大家重新想一個好了，簡單一點，也比較好記。' },
  { kind: 'narration', text: '佑達一聽見要重新取名，立刻把桌上的空白紙抽過去，抓起一支粗頭筆。那個表情認真得像是終於輪到他拯救全團。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '好啦！取名字有什麼難的，我來！' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '喔？那我先替大家捏把冷汗。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '你不要小看我！第一個，暗黑究極音波使徒！' },
  { kind: 'narration', text: '他還特地在紙上畫了一道閃電，畫完往桌上一推，等著大家欣賞。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '……你是要組樂團，還是要去打魔王？' },
  { kind: 'dialogue', speaker: '陳信宏', text: '哈哈哈哈哈哈！' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '你是被音波攻擊過是不是？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '你懂什麼！這個很有氣勢欸！音樂可以穿透靈魂啊，我們就是音樂的使者！' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '那你負責傳教好了，我們負責彈琴。' },
  { kind: 'dialogue', speaker: '石錦航', text: '可是為什麼是暗黑？我們有這麼黑暗嗎？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '因為這樣比較有神祕感啊！' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '我覺得你比較神祕，腦袋到底怎麼長的。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '好！第二個！銀河終焉・五芒星暴走團！' },
  { kind: 'dialogue', speaker: '陳信宏', text: '哈哈哈哈哈，怎麼還有五芒星？' },
  { kind: 'dialogue', speaker: '石錦航', text: '我們五個人剛好可以湊一個五芒星嗎？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '對啊！五個人、五個方向、五種力量！' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '那你負責哪一個方向？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '當然是中心啊！我是鼓手欸！' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '你還真會幫自己安排位置。那不然我們叫銀河系，你自己在中間爆走好了。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '你們真的很沒有想像力！' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '我現在比較擔心報名表有沒有足夠的空格。' },
  { kind: 'narration', text: '阿信已經笑到把報名資料放在桌上，抬手擦了擦眼角。佑達卻完全沒有要放棄的意思，翻過紙張又寫了第三個名字。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '最後一個！地獄烈焰・末日審判者！這次絕對是最強的！' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '你到底要去唱歌，還是要毀滅世界？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '搖滾就是要有這種精神！' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '好，那我建議你上台之前先去買保險。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '為什麼啦！' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '怕你真的把舞台燒了。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '哈哈哈哈哈哈哈哈！' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '好了啦，真的不行。我們是去參加野台開唱，不是去參加漫畫角色選拔。' },
  { kind: 'narration', text: '佑達把筆往桌上一放，嘴裡還嘟囔著大家沒有審美。瑪莎看著那張寫滿字的紙，終於把餅乾袋推到一邊，拿起筆在另一張紙的空白處寫下幾個英文字母。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '不然 Mayday 好了。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '蛤？怎麼突然想到這個？' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '我 BBS 用的名字啊。拿來當團名不是剛好？' },
  { kind: 'dialogue', speaker: '陳信宏', text: 'Mayday……欸，我覺得不錯耶。' },
  { kind: 'dialogue', speaker: '石錦航', text: '簡單，也滿好記的。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '可是 Mayday 不是求救的意思嗎？' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '對啊，我們團最需要救援的就是你的鼓。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '靠！我的鼓到底怎麼了！' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '哈哈哈哈，好啦，Mayday 我覺得可以。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '那就這個？' },
  { kind: 'dialogue', speaker: '石錦航', text: '我沒意見。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '……至少不要再叫便所就好。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '那你剛剛那三個名字就先留著，以後可以拿來當廁所的名字。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '瑪莎！！' },
  { kind: 'narration', text: '溫尚翊拿起筆，在報名表的團名欄裡寫下 MAYDAY。阿信湊過去確認了一遍，石頭點點頭。佑達雖然嘴上還在嘟囔，卻也伸手幫忙把其他資料整理好。' },
  { kind: 'narration', text: '就在這時候，練團室的門被推開。諺明哥從外面回來，手裡提著兩大袋飲料和零食。他看了一眼圍在桌邊的幾個人，又看了看笑得東倒西歪的你。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '討論好了喔？' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '差不多啦，團名換成 Mayday。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '喔，好啊。' },
  { kind: 'narration', text: '他沒有繼續問，把飲料一瓶瓶放在桌邊，又把零食擺到沙發旁邊，順手把吸管也放好。' },
  { kind: 'narration', text: '你剛伸手拿飲料，就發現他特地把你喜歡喝的那瓶放到了最靠近你的位置。' },
]

export const februarySecretInteractions: Record<FebruaryCharacterId, {
  label: string
  blocks: FebruaryStoryBlock[]
  caughtBy: string
  caughtLine: string
  afterReply: FebruaryStoryBlock[]
}> = {
  wen: {
    label: '溫尚翊・偷偷湊過去說悄悄話',
    blocks: [
      { kind: 'narration', text: '大家各自忙起來，你趁溫尚翊低頭看報名表時，抱著飲料挪到他旁邊，稍微彎下腰。' },
      { kind: 'dialogue', speaker: '你', text: '欸，你剛剛是不是也覺得佑達那些名字很好笑？' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '妳不要講出來啦，等一下他又要鬧。' },
      { kind: 'dialogue', speaker: '你', text: '可是你剛剛笑最大聲欸！' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '我哪有？妳不要亂講。' },
      { kind: 'narration', text: '他嘴上否認，自己卻又忍不住笑了一下。你正想補上一句，旁邊忽然有人把椅子往後一拉。' },
    ],
    caughtBy: '蔡昇晏',
    caughtLine: '欸欸欸，你們兩個在旁邊講什麼？開小會喔？',
    afterReply: [
      { kind: 'narration', text: '瑪莎把椅子往桌邊一靠，嘴角還掛著那種明明在看熱鬧、卻偏要裝沒事的笑。' },
      { kind: 'dialogue', speaker: '你', text: '你明明就是故意的！突然拉椅子，誰不會被你嚇到啦。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '欸，我只是問一下而已。妳跟溫尚翊反應這麼大，才讓人想多問吧？' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '好啦，你不要一直鬧她。你自己的資料弄好了沒？' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '轉移話題喔？我剛剛明明是在關心團員感情交流。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '哈哈，你這個關心方式也太奇怪了吧。先把桌上的東西收一收啦，等一下不是要去吃飯？' },
      { kind: 'dialogue', speaker: '錢佑達', text: '吃飯？要吃飯了喔？那我先把這個收起來！' },
      { kind: 'narration', text: '瑪莎終於笑出聲，沒有再追問。溫尚翊把報名表疊好，石頭也伸手把散在桌邊的筆和紙收回盒子裡。剛才那點小小的尷尬，很快就被佑達對晚餐的期待沖散了。' },
    ],
  },
  ashin: {
    label: '陳信宏・偷偷分享剛才的笑點',
    blocks: [
      { kind: 'narration', text: '阿信正把報名資料重新疊好，你湊過去，故意把聲音壓得很低。' },
      { kind: 'dialogue', speaker: '你', text: '欸，你是不是其實也覺得 Mayday 滿好聽的？' },
      { kind: 'dialogue', speaker: '陳信宏', text: '嗯，我覺得很好記啊，而且念起來滿有感覺的。' },
      { kind: 'dialogue', speaker: '你', text: '那你剛剛怎麼沒有早點說？' },
      { kind: 'dialogue', speaker: '陳信宏', text: '因為我想先聽大家的意見嘛。' },
      { kind: 'narration', text: '他朝你笑了一下，你正要接話，佑達忽然從桌子另一邊探過頭來。' },
    ],
    caughtBy: '錢佑達',
    caughtLine: '喂！你們兩個是不是已經私下決定了？',
    afterReply: [
      { kind: 'narration', text: '佑達把椅子拖近了一點，眼神在你和阿信之間來回，像是非得問出個答案不可。' },
      { kind: 'dialogue', speaker: '錢佑達', text: '我就知道！你們一定有偷偷討論，不然怎麼笑得那麼開心？' },
      { kind: 'dialogue', speaker: '陳信宏', text: '真的沒有啦，我們只是在講剛剛那個團名。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '你不要什麼事情都先想到自己好不好。' },
      { kind: 'dialogue', speaker: '錢佑達', text: '不然你們剛剛在笑什麼？' },
      { kind: 'dialogue', speaker: '陳信宏', text: '想到你剛剛那幾個名字啊，真的太有創意了。' },
      { kind: 'dialogue', speaker: '錢佑達', text: '那是你們不懂欣賞！' },
      { kind: 'narration', text: '阿信笑著把最後幾張資料疊整齊，佑達還想替自己的命名辯護，瑪莎已經把筆塞回盒子裡，催大家先把桌面清出來。' },
    ],
  },
  masa: {
    label: '蔡昇晏・偷偷研究他的 BBS 帳號',
    blocks: [
      { kind: 'narration', text: '瑪莎正把那張寫滿中二團名的紙折起來，你伸手輕輕戳了戳他的手臂。' },
      { kind: 'dialogue', speaker: '你', text: '欸，所以你的 BBS 帳號真的叫 Mayday 喔？' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '不然妳以為我隨便亂取的喔？' },
      { kind: 'dialogue', speaker: '你', text: '那你平常都用這個跟別人聊天？' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '對啊，怎麼？妳想研究我的網路生活？' },
      { kind: 'dialogue', speaker: '你', text: '有一點欸。' },
      { kind: 'narration', text: '瑪莎正要繼續說，溫尚翊已經從報名表後面抬起頭來。' },
    ],
    caughtBy: '溫尚翊',
    caughtLine: '瑪莎，你又在講什麼有的沒的？',
    afterReply: [
      { kind: 'narration', text: '溫尚翊把手裡的報名表放低了一點，視線先落在瑪莎身上，又瞥了你一眼。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '我在回答她剛剛問我的事啊，這樣也不行喔？' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '你講話每次都先繞一圈，誰知道你又在挖什麼洞。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '我這叫有問有答，不然你以為大家都像你，想到什麼就直接講喔？' },
      { kind: 'dialogue', speaker: '你', text: '你們兩個不要又吵起來啦，我真的只是問 BBS 帳號而已。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '好啦，知道了。妳先坐著，桌上那些紙我來收。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '喔～有人突然變得很會照顧人喔。' },
      { kind: 'narration', text: '溫尚翊抬眼瞪了瑪莎一下，瑪莎立刻低頭假裝整理紙張。石頭在旁邊忍著笑，把散開的資料重新排好，大家也陸續準備收東西。' },
    ],
  },
  stone: {
    label: '石錦航・偷偷傳一張小紙條',
    blocks: [
      { kind: 'narration', text: '石頭正把桌上的紙張疊整齊，你抽過一張廢紙，低頭寫了幾個字，再趁他轉身時輕輕推到他面前。' },
      { kind: 'aside', text: '紙條上寫著：「你覺得末日審判者能報名嗎？」' },
      { kind: 'narration', text: '石頭看完，忍不住低頭笑了。他拿起筆，在下面寫了一句：「我覺得評審可能會先被嚇跑。」' },
      { kind: 'narration', text: '你剛看完，阿信就從旁邊湊了過來。' },
    ],
    caughtBy: '陳信宏',
    caughtLine: '欸，你們在傳什麼？',
    afterReply: [
      { kind: 'narration', text: '阿信把身子往前探了一點，視線落在石頭手邊那張小紙條上。' },
      { kind: 'dialogue', speaker: '石錦航', text: '沒有啦，只是想到剛剛那個名字，隨手寫了一句。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '可以給我看一下嗎？我有點好奇耶。' },
      { kind: 'narration', text: '石頭把紙條往他那邊推了一點。阿信看完，先是抿著嘴忍笑，最後還是忍不住笑出聲。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '怎樣？是不是又在寫佑達的名字？' },
      { kind: 'dialogue', speaker: '石錦航', text: '這次真的不是啦。' },
      { kind: 'dialogue', speaker: '錢佑達', text: '等一下，為什麼每次你們笑，我都覺得跟我有關？' },
      { kind: 'narration', text: '大家又笑了一陣。石頭把紙條折好收進口袋，阿信則把報名資料放進資料夾，提醒大家別把剛整理好的東西又弄亂。' },
    ],
  },
  yanming: {
    label: '劉諺明・趁他整理東西時偷偷說話',
    blocks: [
      { kind: 'narration', text: '諺明哥把飲料和零食放好後，正要把空袋子折起來。你拿著那瓶飲料，悄悄走到他旁邊。' },
      { kind: 'dialogue', speaker: '你', text: '諺明哥，你怎麼知道我喜歡喝這個？' },
      { kind: 'dialogue', speaker: '劉諺明', text: '妳不是一直拿這瓶嗎？' },
      { kind: 'dialogue', speaker: '你', text: '你連這個都有注意喔？' },
      { kind: 'dialogue', speaker: '劉諺明', text: '哈哈，剛好記得而已。先喝啦，等一下冰塊都化了。' },
      { kind: 'narration', text: '你正要回話，佑達忽然轉過頭來。' },
    ],
    caughtBy: '錢佑達',
    caughtLine: '欸！你們兩個在說什麼？',
    afterReply: [
      { kind: 'narration', text: '佑達探過身來，先看了看你手裡的飲料，又看了看諺明哥，表情像是發現了什麼不得了的事。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '剛好聊到飲料而已啦，袋子裡還有，你要喝自己拿。' },
      { kind: 'dialogue', speaker: '錢佑達', text: '喔～原來是飲料。諺明哥，你怎麼知道她喜歡喝哪一瓶，我都不知道欸！' },
      { kind: 'dialogue', speaker: '劉諺明', text: '她平常拿哪一瓶，看幾次就記得了。你先拿一瓶就好，不要一次拿兩瓶。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '他哪是想喝飲料，他是看到有人有特別待遇就不平衡。' },
      { kind: 'dialogue', speaker: '錢佑達', text: '我哪有！我只是也口渴了！' },
      { kind: 'dialogue', speaker: '陳信宏', text: '哈哈，袋子就在那邊啦，你自己挑一瓶嘛。' },
      { kind: 'narration', text: '諺明哥把飲料袋往桌子中間挪，佑達立刻低頭翻找自己想喝的口味。你把手裡那瓶握好，大家也開始把桌上的資料和零食整理起來。' },
    ],
  },
}

export const februarySecretReplyChoices = [
  { text: '「沒有啦！我只是問一點事情而已！」', response: '我又沒說什麼，妳緊張什麼？' },
  { text: '「你們繼續討論啊，我又沒有打擾你們。」', response: '我們是有在討論啦，可是妳們剛剛真的很明顯欸。' },
  { text: '「你們剛剛不也一直互相攻擊嗎？我只是加入一下而已！」', response: '好像也是啦，反正剛剛本來就很吵。' },
] as const

export const februaryDinnerBlocks: FebruaryStoryBlock[] = [
  { kind: 'narration', text: '天色漸漸暗下來，練團室裡的燈還亮著。報名資料總算整理得差不多，佑達第一個站起來伸懶腰。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '好啦！終於結束了！' },
  { kind: 'dialogue', speaker: '錢佑達', text: '我快餓死了，今天一定要吃頓好的！' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '你剛剛不是吃了一大包洋芋片？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '那是零食欸！怎麼能算飯！' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '好了啦，走啦。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '諺明哥也一起啊？' },
  { kind: 'dialogue', speaker: '劉諺明', text: '好啊，我先把門鎖一下。' },
  { kind: 'narration', text: '一行人去了附近的小吃店。店裡幾張木桌挨得很近，大家好不容易坐下來，佑達就先把菜單搶到自己面前。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '老闆，這個、這個，還有這個！' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '你點給幾個人吃？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '大家一起吃啊！' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '我看是你自己要吃吧。' },
  { kind: 'dialogue', speaker: '石錦航', text: '先點幾道大家分著吃，不夠再加就好了。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '對啊，不然等一下吃不完啦。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '佑達，你先把菜單放下來啦。' },
  { kind: 'narration', text: '菜陸續上桌，熱氣一下子把桌面弄得霧濛濛的。佑達剛夾起一塊肉，瑪莎就伸筷子過來搶走了。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '欸！那是我的！' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '你剛剛不是點了一桌？還差這一塊喔？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '我夾到的就是我的啦！' },
  { kind: 'dialogue', speaker: '劉諺明', text: '先別搶，鍋裡還有。佑達你先吃，等一下再夾就好。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '你看！諺明哥都說話了！' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '他是在叫你先好好吃飯啦。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '我只是怕你們筷子打起來，菜還沒吃就先翻桌。' },
  { kind: 'dialogue', speaker: '石錦航', text: '哈哈，真的會被你們弄得很忙。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '我剛剛看到老闆一直往我們這桌看，應該很怕我們把桌子拆掉。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '你們小聲一點啦，隔壁桌都在看了。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '我們明明很正常！' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '你先把嘴裡那口吞下去再講。' },
  { kind: 'narration', text: '佑達真的低頭把飯吞了，還很不服氣地瞪了瑪莎一眼。諺明哥趁著大家終於安靜幾秒，把剛送上來的菜往桌子中間挪，順手替每個人的杯子添了飲料。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '今天報名資料總算整理得差不多了，接下來曲目跟練習時間也要排好。三月底很快就到了。' },
  { kind: 'dialogue', speaker: '石錦航', text: '我可以把幾首歌的段落再整理一次，下次大家一起確認。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '我覺得先挑大家最熟的幾首，再慢慢修細節，這樣比較順。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '先把歌練好吧，別到時候連自己要唱什麼都沒決定。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '對啊，尤其某個人，先不要想著加什麼鼓花。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '你到底有完沒完！' },
  { kind: 'dialogue', speaker: '劉諺明', text: '最後一遍確實很穩，保持那個節奏就好。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '聽到沒有！諺明哥說我穩！' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '他是說最後一遍，前面先不要算。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '哈哈哈哈，你不要只記得自己想聽的那一半啦。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '阿信！你也站在他那邊喔！' },
  { kind: 'dialogue', speaker: '陳信宏', text: '我沒有啊，我只是把話聽完整而已。' },
  { kind: 'narration', text: '桌邊又笑成一團。原本只是隨口聊幾句，話題不知不覺又繞回剛定下來的團名。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '不過今天把名字定下來，感覺真的不太一樣了。Mayday，聽起來滿好的。' },
  { kind: 'dialogue', speaker: '石錦航', text: '簡單，也滿好記的。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '那接下來就把報名跟練習的事情一件件做好。名字定了，大家也比較有方向。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '嗯，先把三月底那場準備好。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '欸，說到三月底，妳呢？如果我們真的報上了，妳會不會來？' },
]


export const februaryDinnerChoices = [
  {
    text: '當然會啊！我可是你們的忠實觀眾欸！',
    response: [
      { kind: 'dialogue', speaker: '錢佑達', text: '那當然！到時候妳就知道我的鼓有多厲害！' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '她剛剛明明只說會來，又沒說是來看你。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '有觀眾總是好事啊，先把歌練好比較重要。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '那我們要認真一點了，妳到時候記得來喔！' },
      { kind: 'dialogue', speaker: '石錦航', text: '到時候我們會把歌練好，不會讓妳白跑一趟。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '等報名確定，我把時間整理好再跟妳說。' },
    ],
    affection: { wen: 1, ashin: 1, masa: 1, stone: 1, yanming: 1 },
  },
  {
    text: '我比較擔心佑達，到時候不要又突然加一堆鼓花！',
    response: [
      { kind: 'dialogue', speaker: '錢佑達', text: '喂！妳怎麼也跟著瑪莎欺負我！' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '終於有人有良心了。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '你先把基本節奏顧好啦。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '最後一遍你有穩住，保持那個狀態就好。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '我剛剛唱到一半都被你嚇到了，差點笑場。' },
      { kind: 'dialogue', speaker: '石錦航', text: '不過最後真的接得很好，再練幾次就更穩了。' },
      { kind: 'dialogue', speaker: '錢佑達', text: '你看！石頭講的才是重點！' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '你真的很會挑自己想聽的話。' },
    ],
    affection: { masa: 2, wen: 1 },
  },
  {
    text: '你們先好好準備啦！我可不想聽到一半發現還沒練熟。',
    response: [
      { kind: 'dialogue', speaker: '石錦航', text: '哈哈，這個要求很合理。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '我們會好好準備啦，曲目先整理好再說。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '放心，不會讓妳失望。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '我會先把練習時間對一下，大家比較好安排。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '聽到了吧，這可是觀眾監督。' },
      { kind: 'dialogue', speaker: '錢佑達', text: '好啦好啦，我會練穩，不要一直盯著我！' },
    ],
    affection: { stone: 2, ashin: 1 },
  },
] satisfies FebruaryChoice[]


export const februaryTableMoments: Record<FebruaryCharacterId, FebruaryStoryBlock[]> = {
  wen: [
    { kind: 'narration', text: '你一直顧著聽他們講話，面前那盤菜幾乎沒動。溫尚翊看了一眼，沒提醒你，只把你剛剛伸筷子夾過的那盤菜挪到你面前。' },
    { kind: 'dialogue', speaker: '溫尚翊', text: '妳不是要吃這個？一直看幹嘛。' },
    { kind: 'narration', text: '瑪莎正好抬頭看見，筷子停在半空中。' },
    { kind: 'dialogue', speaker: '蔡昇晏', text: '欸，溫尚翊，你今天很會照顧人喔？' },
    { kind: 'dialogue', speaker: '溫尚翊', text: '吃你的飯啦！' },
    { kind: 'narration', text: '他低頭繼續吃，耳朵卻好像有點紅。' },
  ],
  ashin: [
    { kind: 'narration', text: '你不小心被桌上的辣菜嗆了一下，阿信馬上把水遞過來，又把那盤辣菜往遠處挪了挪。' },
    { kind: 'dialogue', speaker: '陳信宏', text: '慢慢吃啦，沒有人跟妳搶。' },
    { kind: 'dialogue', speaker: '錢佑達', text: '欸，阿信，你怎麼連這個都注意到？' },
    { kind: 'dialogue', speaker: '陳信宏', text: '她剛剛咳嗽了啊。' },
    { kind: 'narration', text: '他說得很自然，隨後又把話題接了回去。' },
  ],
  masa: [
    { kind: 'narration', text: '你正看著桌上最後一塊炸物，瑪莎瞄了一眼，趁大家說話時直接夾進你的碗裡。' },
    { kind: 'dialogue', speaker: '蔡昇晏', text: '這個我吃不下，妳解決掉。' },
    { kind: 'dialogue', speaker: '石錦航', text: '你剛剛不是還說要留最後一塊？' },
    { kind: 'dialogue', speaker: '蔡昇晏', text: '我現在不想吃了不行喔？' },
    { kind: 'narration', text: '他一臉理所當然，完全不給你追問的機會。' },
  ],
  stone: [
    { kind: 'narration', text: '你伸手拿紙巾，發現手邊那包已經空了。石頭沒說什麼，直接把自己旁邊那包推過來，還順手扶住你差點碰倒的筷子。' },
    { kind: 'dialogue', speaker: '石錦航', text: '小心，差點掉了。' },
    { kind: 'dialogue', speaker: '陳信宏', text: '石頭，你真的很細心欸。' },
    { kind: 'dialogue', speaker: '石錦航', text: '剛好看到而已啦。' },
    { kind: 'narration', text: '他笑了一下，繼續聽大家聊天。' },
  ],
  yanming: [
    { kind: 'narration', text: '你正忙著聽佑達說話，諺明哥看見你碗裡的飯快涼了，便把剛上來的菜往你面前推了推。' },
    { kind: 'dialogue', speaker: '劉諺明', text: '先吃飯啦，等一下涼掉了。' },
    { kind: 'narration', text: '他還順手幫你添了一點飲料。' },
    { kind: 'dialogue', speaker: '錢佑達', text: '欸，諺明哥，你怎麼每次都在照顧她？' },
    { kind: 'dialogue', speaker: '劉諺明', text: '大家一起吃飯啊，順手而已。' },
    { kind: 'narration', text: '他笑著繼續吃飯，沒有加入大家的起鬨。' },
  ],
}

export const februaryAfterDinnerRoutes: Record<FebruaryCharacterId, FebruaryAfterDinnerRoute> = {
  wen: {
    label: '溫尚翊',
    title: '和溫尚翊走一段路',
    blocks: [
      { kind: 'narration', text: '溫尚翊原本還站在店門口跟阿信說話，看見你走過來，便把手插進外套口袋，慢慢跟上你的步子。街邊的店家正準備收攤，鐵門拉到一半，空氣裡還留著炒菜的香味。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '欸，妳還不回去喔？' },
      { kind: 'dialogue', speaker: '你', text: '想再走一會兒，不行喔？' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '可以啊，又沒有人趕妳。' },
    ],
    rounds: [
      {
        scene: '走了一小段，他忽然想起剛才那場團名會議，忍不住笑了一聲。你轉頭看他，他立刻裝作沒事。',
        promptSpeaker: '溫尚翊',
        prompt: '妳剛剛笑佑達笑成那樣，是不是覺得他那些名字很有創意？',
        choices: [
          { text: '你自己也笑最大聲，還敢說我！', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '我那是被你們笑到啦，誰叫他講得那麼認真。' }], affection: { wen: 2 } },
          { text: '我覺得暗黑究極音波使徒可以出個單曲欸。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '妳不要鼓勵他啦！他真的會當真。' }], affection: { wen: 3 } },
          { text: '至少比 So Band 倒過來好聽吧。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '……妳今天是打算把便所梗講一整晚是不是？' }], affection: { wen: 3 } },
        ],
      },
      {
        scene: '路口的紅燈亮起，你們停在斑馬線前。溫尚翊低頭踢了踢鞋尖，像是忽然想到什麼。',
        promptSpeaker: '溫尚翊',
        prompt: '不過 Mayday 這個名字還不錯吧？至少寫在報名表上不會讓人笑場。',
        choices: [
          { text: '很好聽啊，而且是瑪莎的 BBS 名字，還滿有紀念價值的。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '對啊，這次算他有貢獻。' }], affection: { wen: 2 } },
          { text: '我喜歡，念起來很有氣勢。', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '那就好。以後妳看到這個名字，就知道是我們。' }], affection: { wen: 3 } },
          { text: '那你們以後是不是要開始有團名周邊了？', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '妳想得也太遠了吧，先報名成功再說啦。' }], affection: { wen: 2 } },
        ],
      },
      {
        scene: '綠燈亮了，他沒有立刻往前走，先側過頭確認你也看見了。走到下一個路口時，他才像想起來似的開口。',
        promptSpeaker: '溫尚翊',
        prompt: '欸，三月底如果真的報上了，妳會來吧？',
        choices: [
          { text: '當然啊，我怎麼可能錯過！', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '好啊，那我到時候幫妳留意一下。' }], affection: { wen: 3 } },
          { text: '怎麼，你很希望我去喔？', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '……我只是問一下不行喔？' }, { kind: 'narration', text: '他把臉轉回去，走了兩步又忍不住笑。' }], affection: { wen: 4 } },
          { text: '那你到時候要記得看我！', response: [{ kind: 'dialogue', speaker: '溫尚翊', text: '妳要求還真多欸。不過妳不要站太後面就好。' }], affection: { wen: 4 } },
        ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '走到公車站時，車燈從街口一輛輛掠過。溫尚翊站在站牌旁陪你等了一會兒，直到你確認車子快到了，他才把手插回口袋。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '上車小心，到家再說一聲。' },
      { kind: 'narration', text: '他說完往後退了一步，卻沒有馬上轉身，像是還想再說什麼，最後只朝你揮了揮手。' },
    ],
  },
  ashin: {
    label: '陳信宏',
    title: '和陳信宏走一段路',
    blocks: [
      { kind: 'narration', text: '阿信把外套搭在手臂上，走到你身邊時還在哼剛才練團的一小段旋律。路邊有間唱片行還亮著燈，櫥窗裡的海報被風吹得微微翹起。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '妳今天有沒有聽出來，我們後來重來那次有比較順？' },
    ],
    rounds: [
      {
        scene: '他把剛才哼到一半的旋律停下來，像是在等你回答。',
        promptSpeaker: '陳信宏',
        prompt: '下午練團那首，妳覺得副歌接起來會不會太急？',
        choices: [
          { text: '不會啊，我覺得剛剛好，聽起來很過癮。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '真的喔？那我就放心一點了。' }], affection: { ashin: 3 } },
          { text: '有一點點，不過後來那次好多了。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '我也有覺得，回去再跟大家講一下好了。' }], affection: { ashin: 2 } },
          { text: '我其實都在看你唱歌，沒有注意到那麼多。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '欸？妳這樣講，我反而不知道要接什麼了。' }, { kind: 'narration', text: '他低頭笑了一下，耳朵有點紅。' }], affection: { ashin: 4 } },
        ],
      },
      {
        scene: '唱片行的櫥窗裡放著幾張新到的專輯。阿信停下來看了一眼，手指隔著玻璃點了點其中一張。',
        promptSpeaker: '陳信宏',
        prompt: '妳平常會自己去唱片行找歌聽嗎？還是都聽朋友推薦？',
        choices: [
          { text: '都會啊，有時候看到封面喜歡就買了。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '哈哈，那妳很容易被封面騙欸。不過有時候真的會挖到寶。' }], affection: { ashin: 2 } },
          { text: '比較常聽朋友推薦，你有沒有私藏的歌？', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '有啊，下次拿幾張給妳聽。妳可以再告訴我喜不喜歡。' }], affection: { ashin: 4 } },
          { text: '如果是你推薦的，我應該都會去聽。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '那我可要認真挑了，不能隨便拿一張敷衍妳。' }], affection: { ashin: 4 } },
        ],
      },
      {
        scene: '你們在唱片行門口停了一會兒，店裡的音樂隱約傳出來。阿信把手裡的飲料換到另一隻手，語氣比剛才認真一點。',
        promptSpeaker: '陳信宏',
        prompt: '其實我有點期待三月底。第一次用這個名字去參加活動，感覺很不一樣。',
        choices: [
          { text: '你們一定會很棒的，我會去聽。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '那就說好了喔，妳要來。' }], affection: { ashin: 3 } },
          { text: '你會緊張嗎？', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '會一點點啦，不過想到有人認真聽，就比較不怕了。' }], affection: { ashin: 3 } },
          { text: '那你到時候唱歌的時候，記得不要忘詞。', response: [{ kind: 'dialogue', speaker: '陳信宏', text: '哈哈哈，妳不要先給我壓力啦！我會記得的。' }], affection: { ashin: 2 } },
        ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '走到公車站前，阿信把剛才聊到的那張專輯名字寫在一小張紙上，遞給你。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '這張妳可以先聽聽看，喜歡的話再跟我說喔。' },
      { kind: 'narration', text: '他朝你揮揮手，等你上車後才轉身離開。' },
    ],
  },
  masa: {
    label: '蔡昇晏（瑪莎）',
    title: '和瑪莎一路鬥嘴',
    blocks: [
      { kind: 'narration', text: '瑪莎走在你旁邊，手裡轉著剛才從店裡拿出來的牙籤。其他人已經走到前面，他倒是一點也不急，還回頭看了一眼，確認沒有人要插話。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '欸，今天是不是覺得我很有才華？' },
    ],
    rounds: [
      {
        scene: '他故意把下巴抬高一點，像是等著你頒獎。',
        promptSpeaker: '蔡昇晏',
        prompt: '最後那個 Mayday，是不是很有水準？',
        choices: [
          { text: '是啊，居然拿自己的 BBS 帳號當團名。', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '不然咧？這叫靈感，懂不懂。' }], affection: { masa: 3 } },
          { text: '你是不是想不到名字才拿帳號出來救場？', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '妳講話真的很傷人欸，我明明是早就準備好了。' }], affection: { masa: 2 } },
          { text: '我覺得你今天終於做了一件有用的事。', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '喂！我平常都在做什麼？' }], affection: { masa: 3 } },
        ],
      },
      {
        scene: '走到轉角，他忽然伸手比了個五芒星的形狀，差點撞到路過的人，自己先笑出來。',
        promptSpeaker: '蔡昇晏',
        prompt: '妳覺得佑達那個五芒星暴走團怎麼樣？其實我覺得可以留著當備案欸。',
        choices: [
          { text: '可以啊，等他們真的要召喚魔王的時候用。', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '哈哈哈哈，那佑達一定要站中間，負責念咒語。' }], affection: { masa: 3 } },
          { text: '你不要再害他了啦，他剛剛已經很受傷了。', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '我哪有害他？我是在幫他保存創作紀錄。' }], affection: { masa: 2 } },
          { text: '我覺得末日審判者比較適合你。', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '喔？妳是在稱讚我很有威嚴是不是？' }], affection: { masa: 4 } },
        ],
      },
      {
        scene: '他把牙籤丟進路邊垃圾桶，回頭看你時，嘴角還掛著剛才那個壞笑。',
        promptSpeaker: '蔡昇晏',
        prompt: '欸，如果三月底真的有演出，妳會不會來？',
        choices: [
          { text: '會啊，我要去看你們到底有沒有把舞台燒掉。', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '哈哈，放心啦，我會盯著末日審判者，不讓他亂來。' }], affection: { masa: 3 } },
          { text: '看你表現啊。', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '妳現在是在威脅我是不是？好啦，我會認真一點。' }], affection: { masa: 3 } },
          { text: '我可以做一塊寫著 MAYDAY 的牌子！', response: [{ kind: 'dialogue', speaker: '蔡昇晏', text: '哈哈哈哈，妳真的很閒欸。不過這個可以，記得不要做成五芒星。' }], affection: { masa: 4 } },
        ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '走到路口，瑪莎停下來等紅燈，還不忘回頭補一句。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '到時候記得來喔，不然我就把妳的名字寫進下一版報名表。' },
      { kind: 'narration', text: '他說完自己先笑了，揮揮手往另一條路走去。' },
    ],
  },
  stone: {
    label: '石錦航',
    title: '和石頭慢慢走回去',
    blocks: [
      { kind: 'narration', text: '石頭走在你旁邊，步子不快。路邊幾家店正準備收攤，老闆把椅子一張張疊起來，街燈把你們的影子拉得很長。' },
      { kind: 'dialogue', speaker: '石錦航', text: '今天大家好像都很開心。' },
    ],
    rounds: [
      {
        scene: '他想起下午那張寫滿奇怪名字的紙，忍不住笑了一下。',
        promptSpeaker: '石錦航',
        prompt: '妳覺得佑達哪個名字最誇張？',
        choices: [
          { text: '暗黑究極音波使徒！那個真的太中二了。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '哈哈，我也覺得那個最有畫面。' }], affection: { stone: 3 } },
          { text: '我覺得末日審判者很有氣勢啊。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '那到時候要請他真的把氣勢打出來了。' }], affection: { stone: 3 } },
          { text: '五芒星暴走團，感覺真的會有人相信。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '那我們可能要先準備一張說明，告訴大家不是魔法社。' }], affection: { stone: 2 } },
        ],
      },
      {
        scene: '走過一間還亮著燈的唱片行，他放慢腳步，朝櫥窗裡的海報看了一眼。',
        promptSpeaker: '石錦航',
        prompt: '其實我有點期待三月底的活動。妳覺得我們這次準備的歌，聽起來怎麼樣？',
        choices: [
          { text: '我很喜歡啊，尤其兩把吉他接在一起的地方。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '真的喔？那我回去再把那一段整理得更好一點。' }], affection: { stone: 4 } },
          { text: '有幾個地方還可以再更順，不過已經很好聽了。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '嗯，我也有注意到。謝謝妳認真聽。' }], affection: { stone: 3 } },
          { text: '我覺得你們只要站上台就很帥了。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '哈哈，妳這樣講，我們會不好意思的。' }], affection: { stone: 3 } },
        ],
      },
      {
        scene: '他把手插進外套口袋，走了幾步後才又開口。',
        promptSpeaker: '石錦航',
        prompt: '如果真的能上台，我想把幾段吉他再整理好一點。到時候妳願意來聽嗎？',
        choices: [
          { text: '我一定去！', response: [{ kind: 'dialogue', speaker: '石錦航', text: '好，那我就把妳算進觀眾裡了。' }], affection: { stone: 3 } },
          { text: '你最喜歡哪一首？先偷偷告訴我。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '先保密，等到時候妳聽完再猜。' }], affection: { stone: 4 } },
          { text: '你要先答應我，到時候不要緊張。', response: [{ kind: 'dialogue', speaker: '石錦航', text: '哈哈，好，我會努力。妳也不要緊張。' }], affection: { stone: 2 } },
        ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '走到公車站時，石頭替你看了一眼站牌，確認還有車才停下來。' },
      { kind: 'dialogue', speaker: '石錦航', text: '車還有幾分鐘，妳慢慢等，不用急。' },
      { kind: 'narration', text: '他朝你笑了一下，等你上車後才轉身離開。' },
    ],
  },
  yanming: {
    label: '劉諺明',
    title: '和諺明哥走一段路',
    blocks: [
      { kind: 'narration', text: '諺明哥把店裡的鑰匙收進口袋，跟大家道別後，陪你沿著騎樓往前走。晚上的風有點涼，店家正一間間收拾桌椅，路邊還有人在賣熱豆花。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '今天吃得還習慣嗎？剛剛看妳一直在聽他們講話，飯好像都沒吃幾口。' },
    ],
    rounds: [
      {
        scene: '他看了看你手裡的飲料，像是想起下午買東西時的事。',
        promptSpeaker: '劉諺明',
        prompt: '剛剛那瓶有喜歡嗎？我怕買錯口味。'
        ,
        choices: [
          { text: '喜歡啊！你怎麼知道我愛喝這個？', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '妳之前拿過幾次，我就記得了。' }], affection: { yanming: 4 } },
          { text: '很好喝，謝謝你特地買回來。', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '不客氣啦，大家都有份，妳喜歡就好。' }], affection: { yanming: 3 } },
          { text: '下次可以換別的口味，我想試試看。', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '好啊，下次看到再買給妳挑。' }], affection: { yanming: 3 } },
        ],
      },
      {
        scene: '走過路口時，他替你讓開迎面而來的腳踏車，等車子過去才接著說。',
        promptSpeaker: '劉諺明',
        prompt: '今天看他們為了團名吵半天，妳是不是也覺得很有趣？',
        choices: [
          { text: '超好笑，尤其佑達那幾個名字！', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '哈哈，我回來的時候就看你們笑成一團。' }], affection: { yanming: 3 } },
          { text: '你是不是早就習慣他們這樣了？', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '差不多啦，大家有精神就好。' }], affection: { yanming: 2 } },
          { text: '其實你回來的時候，我還在想你會不會也被他們逗笑。', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '有啊，只是我沒聽到前面到底發生什麼事。' }], affection: { yanming: 4 } },
        ],
      },
      {
        scene: '路口的紅燈亮起，他陪你停在騎樓下，等車流慢慢過去。',
        promptSpeaker: '劉諺明',
        prompt: '三月底如果他們真的有演出，妳會去看吧？',
        choices: [
          { text: '當然啊，我怎麼可能錯過。', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '那就好，他們知道的話應該會很開心。' }], affection: { yanming: 3 } },
          { text: '你會去嗎？', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '如果店裡沒什麼事，我也想去看看。' }], affection: { yanming: 3 } },
          { text: '那你要不要陪我一起去？', response: [{ kind: 'dialogue', speaker: '劉諺明', text: '可以啊，到時候時間確定了再說。' }], affection: { yanming: 4 } },
        ],
      },
    ],
    endingBlocks: [
      { kind: 'narration', text: '走到公車站附近，諺明哥停下來看了一眼路口的車流。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '車來了再上去，晚上回家小心一點。' },
      { kind: 'narration', text: '他沒有催你，陪你站了一會兒，直到你等的車出現，才朝你揮揮手。' },
    ],
  },
}

export const februarySecretDiaryText: Record<FebruaryCharacterId, string> = {
  wen: '我還趁大家低頭看資料的時候，偷偷挪到溫尚翊旁邊講話。明明只是問他是不是也覺得佑達很好笑，他卻先叫我不要講出來，怕佑達又鬧。結果我們兩個自己先笑了，還是被瑪莎抓包。真的很像做壞事被當場逮到。',
  ashin: '我偷偷湊去問阿信是不是也喜歡 Mayday 這個名字。他講話還是那麼溫柔，連這種小事都會認真回答。結果佑達突然探頭過來，害我差點以為自己在做什麼見不得人的事。',
  masa: '我還偷偷問了瑪莎的 BBS 帳號，結果他一副很得意的樣子，講得好像自己的網路生活有什麼重大機密。偏偏溫尚翊還在旁邊問他又在講什麼有的沒的，真的很吵。',
  stone: '我跟石頭居然用傳紙條的方式講話，紙上寫的還是「末日審判者能不能報名」這種廢話。石頭回我的那句更好笑，結果阿信差點看到。好像回到小學喔。',
  yanming: '我拿著飲料去問諺明哥怎麼知道我喜歡這個口味。他居然說因為我之前拿過幾次，所以記得。這種小事他也有注意到喔？被佑達突然問我們在講什麼時，我還有點心虛。',
}

export const februaryTableDiaryText: Record<FebruaryCharacterId, string> = {
  wen: '吃飯的時候，溫尚翊看我一直顧著聊天，直接把我想吃的那盤菜挪到面前，還一副只是順手的樣子。瑪莎當然不會放過他，當場就問他是不是很會照顧人。溫尚翊叫他吃自己的飯，耳朵卻有點紅。很好笑，也有點可愛。',
  ashin: '吃飯時我被辣菜嗆到，阿信馬上把水遞過來，還把那盤菜挪遠。佑達居然當場問他怎麼連這個都注意到。阿信回答得很自然，反而讓我不知道該看哪裡。',
  masa: '吃飯時瑪莎把最後一塊炸物夾進我碗裡，還說自己吃不下。石頭明明看見他剛剛還搶著留那一塊，偏偏他嘴硬得很，死不承認。這個人真的很會找理由。',
  stone: '吃飯時我伸手拿紙巾，石頭已經把自己旁邊那包推過來，還順手扶住我差點碰倒的筷子。阿信在旁邊說他很細心，石頭只回一句剛好看到。真的很像他會做的事。',
  yanming: '吃飯時諺明哥看我一直顧著聽大家講話，默默把菜推到我面前，還幫我添飲料。佑達問他是不是每次都在照顧我，他只說順手而已。明明就是有注意到嘛。',
}

export const februaryAfterDinnerDiaryText: Record<FebruaryCharacterId, string> = {
  wen: '飯後我又跟溫尚翊多走了一段。他嘴上一直嫌佑達那些名字太誇張，自己卻笑得最大聲。聊到 Mayday 時，他說以後看到這個名字就知道是他們。最後還問我三月底會不會去，明明只是隨口問的樣子，卻讓人有點在意。',
  ashin: '飯後阿信陪我慢慢走，還停在唱片行櫥窗前聊了一會兒。他問我平常怎麼找歌聽，說下次可以拿幾張自己喜歡的專輯給我。感覺跟他聊天很舒服，時間一下就過去了。',
  masa: '飯後跟瑪莎一路鬥嘴。他對自己的 BBS 帳號得意得不得了，還把佑達那幾個中二名字拿出來繼續笑。明明一路都在互相吐槽，最後卻還是提醒我三月底要記得去看。嘴巴真的很壞。',
  stone: '飯後跟石頭慢慢走了一段。他問我最喜歡佑達哪個名字，後來又聊到三月底的演出和吉他。他說想把幾段旋律再整理好一點，還讓我猜他最喜歡哪首歌。突然有點期待他之後會告訴我答案。',
  yanming: '飯後諺明哥陪我走到公車站，還記得問我下午買的飲料喜不喜歡。他說只是剛好記得我拿過幾次。聊到三月底，他也說如果店裡沒事，想去看看他們演出。感覺他一直都在旁邊默默替大家加油。',
}
