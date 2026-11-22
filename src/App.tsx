import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  BatteryFull,
  BookHeart,
  CalendarDays,
  Camera,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Contact,
  Headphones,
  Heart,
  MessageSquare,
  NotebookPen,
  Phone,
  Radio,
  Settings,
  Signal,
  Smartphone,
  X,
} from 'lucide-react'

type AppKey = 'messages' | 'contacts' | 'calls' | 'diary' | 'calendar' | 'photos' | 'music' | 'notes' | 'settings'
type StoryStage = 'notification' | 'messages' | 'reply' | 'walk' | 'studio' | 'reunion' | 'reunion-chat' | 'nickname' | 'paused'
type ReplyKey = 'a' | 'b' | 'c'
type ReunionReplyKey = 'a' | 'b' | 'c'
type NicknameQuestionKey = 'a' | 'b' | 'c'
type StoryBlock = { kind: 'narration' | 'dialogue' | 'aside'; text: string; speaker?: string }
type StoryScene = { kicker: string; title: string; blocks: StoryBlock[]; button: string }

type PhoneApp = {
  id: AppKey
  name: string
  subtitle: string
  icon: typeof MessageSquare
}

const phoneApps: PhoneApp[] = [
  { id: 'messages', name: '訊息', subtitle: 'SMS 收件匣', icon: MessageSquare },
  { id: 'contacts', name: '通訊錄', subtitle: '認識的人', icon: Contact },
  { id: 'calls', name: '通話紀錄', subtitle: '來電與未接', icon: Phone },
  { id: 'diary', name: '日記', subtitle: '今天的心情', icon: BookHeart },
  { id: 'calendar', name: '行事曆', subtitle: '課表與約定', icon: CalendarDays },
  { id: 'photos', name: '相簿', subtitle: '生活底片', icon: Camera },
  { id: 'music', name: '隨身聽', subtitle: '喜歡的音樂', icon: Headphones },
  { id: 'notes', name: '記事本', subtitle: '隨手記下來', icon: NotebookPen },
]

const appCopy: Record<AppKey, { heading: string; body: string; detail: string }> = {
  messages: {
    heading: '訊息收件匣',
    body: '溫尚翊',
    detail: '一則新邀約，正在等待妳的回覆。故事進度會保存在這支手機裡。',
  },
  contacts: {
    heading: '通訊錄',
    body: '目前還沒有已解鎖的聯絡人。',
    detail: '認識一個人之後，他的名字才會真正留在你的通訊錄裡。',
  },
  calls: {
    heading: '通話紀錄',
    body: '尚無通話紀錄。',
    detail: '未接來電、已接來電與撥出的電話都會留在這裡。',
  },
  diary: {
    heading: '私人日記',
    body: '今天還沒有寫下任何事情。',
    detail: '重要的一天結束後，或許會有一些話想留給明天的自己。',
  },
  calendar: {
    heading: '行事曆',
    body: '1996 年 10 月',
    detail: '大學課表、練團時間和朋友的邀約，都會慢慢記錄在這裡。',
  },
  photos: {
    heading: '相簿',
    body: '底片還沒有沖洗。',
    detail: '以後遇見的人、去過的地方，都可能成為值得留下來的畫面。',
  },
  music: {
    heading: '隨身聽',
    body: '請先放入一卷卡帶。',
    detail: '那個年代，喜歡一首歌有時候是從借來的一卷卡帶開始。',
  },
  notes: {
    heading: '記事本',
    body: '沒有待辦事項。',
    detail: '記下課堂、地址、電話，還有那些怕自己忘記的小事。',
  },
  settings: {
    heading: '設定',
    body: '手機設定',
    detail: '可以修改顯示名稱，或重設這台手機上的本機遊戲資料。',
  },
}

const historicalDays: { date: string; messages: { from: 'wen' | 'me'; text: string }[] }[] = [
  {
    date: '上上週・星期一',
    messages: [
      { from: 'wen', text: '妳今天有來學校嗎？' },
      { from: 'me', text: '有啊，怎麼了？' },
      { from: 'wen', text: '幫我佔個位置，我快到了。' },
      { from: 'me', text: '你最好是快到了。' },
      { from: 'wen', text: '真的啦，公車剛到。' },
      { from: 'me', text: '你每次都這樣說。' },
      { from: 'wen', text: '啊不然妳先幫我聽教授講課。' },
      { from: 'me', text: '……你快點。' },
    ],
  },
  {
    date: '上上週・星期三',
    messages: [
      { from: 'me', text: '你上次借我的筆記是不是少了兩頁？' },
      { from: 'wen', text: '蛤？哪兩頁？' },
      { from: 'me', text: '就是教授講到那個理論的地方。' },
      { from: 'wen', text: '喔，那個我自己也沒抄到。' },
      { from: 'me', text: '你不是坐第一排嗎？？' },
      { from: 'wen', text: '我有坐第一排就代表我有在聽喔？' },
      { from: 'me', text: '溫尚翊！！！' },
      { from: 'wen', text: '哈哈哈哈，好啦，下次幫妳問別人。' },
    ],
  },
  {
    date: '上週・星期二',
    messages: [
      { from: 'wen', text: '妳吃飯了沒？' },
      { from: 'me', text: '還沒，排隊的人好多。' },
      { from: 'wen', text: '妳要吃什麼？' },
      { from: 'me', text: '不知道欸，還在想。' },
      { from: 'wen', text: '我剛好要去買，幫妳帶一份？' },
      { from: 'me', text: '真的假的！那我要跟你一樣的。' },
      { from: 'wen', text: '好，記得下來拿。' },
      { from: 'me', text: '你人真好。' },
      { from: 'wen', text: '不要突然這樣，很奇怪。' },
    ],
  },
  {
    date: '上週・星期四',
    messages: [
      { from: 'me', text: '你今天是不是又去練團？' },
      { from: 'wen', text: '對啊，怎麼了？' },
      { from: 'me', text: '沒事，剛剛看到你背吉他。' },
      { from: 'wen', text: '眼睛還蠻利的嘛。' },
      { from: 'me', text: '那麼大一個吉他袋很難看不到吧！' },
      { from: 'wen', text: '哈哈哈哈，也是。' },
    ],
  },
  {
    date: '昨天・18:21',
    messages: [
      { from: 'wen', text: '妳今天怎麼這麼早走？' },
      { from: 'me', text: '今天沒課了啊，不然咧。' },
      { from: 'wen', text: '想說去福利社找妳，結果沒看到人。' },
      { from: 'me', text: '你找我幹嘛？' },
      { from: 'wen', text: '沒幹嘛，想問妳要不要喝東西。' },
      { from: 'me', text: '……你下次早點問。' },
    ],
  },
]

const replies: Record<ReplyKey, { text: string; response: string[]; affection: number }> = {
  a: {
    text: '好啊，反正我今天也沒事。幾點出發？',
    response: ['四點半吧。', '我去妳教室樓下找妳。'],
    affection: 2,
  },
  b: {
    text: '好啊！我還沒看過你們練團欸，突然有點期待。',
    response: ['有什麼好期待的啦。', '四點半，我去妳教室樓下找妳。'],
    affection: 4,
  },
  c: {
    text: '你怎麼突然想到約我？該不會又想找人幫你拿東西吧？',
    response: ['妳真的很會想欸。', '我只是想說妳應該會有興趣，才問妳要不要去。', '四點半，我去妳教室樓下找妳。'],
    affection: 3,
  },
}

const reunionReplies: Record<ReunionReplyKey, { text: string; blocks: StoryBlock[] }> = {
  a: {
    text: '嗯，我們小時候就認識了。',
    blocks: [
      { kind: 'dialogue', speaker: '你', text: '嗯，我們小時候就認識了。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '真的假的？妳們以前就認識喔？' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '很久以前了啦。' },
      { kind: 'narration', text: '他把貝斯輕輕靠到椅邊，目光還停在你身上。那句「很久以前」說得簡單，卻讓你一下子想起了好多事。' },
    ],
  },
  b: {
    text: '以前住得很近，後來搬家就沒再聯絡了。',
    blocks: [
      { kind: 'dialogue', speaker: '你', text: '以前住得很近，後來搬家就沒再聯絡了。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '難怪妳剛剛那個表情。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '真的隔很久了。' },
      { kind: 'narration', text: '你點點頭。明明只是幾句話，卻還是有點難以相信，自己竟然真的在這裡重新見到了他。' },
    ],
  },
  c: {
    text: '很久以前的朋友了，我也沒想到會在這裡遇到他。',
    blocks: [
      { kind: 'dialogue', speaker: '你', text: '很久以前的朋友了，我也沒想到會在這裡遇到他。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '這也太巧了吧。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '我也沒想到啊。' },
      { kind: 'narration', text: '他笑了一下，像是還沒完全從驚訝裡回過神。你也一樣，胸口那股突然湧上來的情緒，還沒找到地方安放。' },
    ],
  },
}

const nicknameQuestions: Record<NicknameQuestionKey, string> = {
  a: '你們怎麼都叫他 Masa 啊？',
  b: '等一下，Masa 是你的綽號喔？',
  c: '你什麼時候開始被叫 Masa 的？',
}

const nicknameStoryBlocks = (question: string): StoryBlock[] => [
  { kind: 'narration', text: '你原本還想問他這些年過得怎麼樣，房間另一頭卻先傳來阿信的聲音。' },
  { kind: 'dialogue', speaker: '陳信宏', text: 'Masa，等一下那段你再幫我聽一下。' },
  { kind: 'narration', text: '你轉過頭，這才發現大家喊他的時候，用的根本不是他的本名。' },
  { kind: 'dialogue', speaker: '你', text: question },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '這個喔？很無聊啦。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '高一的時候，我是學弟，怪獸跟阿信都是學長。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '那時候阿信常常把我名字叫反，明明是蔡昇晏，他偏偏叫成蔡晏昇，還說這樣念起來比較順。' },
  { kind: 'narration', text: '他說到這裡，朝阿信那邊看了一眼。阿信摸了摸鼻子，沒有否認。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '有一次我們經過南京東路五段那邊的理容院，看到門口穿花襯衫、絲質西裝褲的人，就拿他們開玩笑，說那種人好像都叫 Masa 或阿龍。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '怪獸就說我很適合叫 Masa，還說阿信應該叫阿龍。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '欸，結果阿龍根本沒人記得，只有他一直被叫到現在。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '啊不然妳覺得他適合叫什麼？' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '你不要再亂取了啦。' },
  { kind: 'narration', text: '你終於忍不住笑了。原來大家口中的 Masa，是高中時候一個隨口開的玩笑留下來的。至少今天，在你心裡，他還是那個叫蔡昇晏的人。' },
]

const walkBlocks: StoryBlock[] = [
  { kind: 'narration', text: '下午四點半，最後一堂課總算結束。教室裡的人一下子散了大半，你把桌上的課本一本本收進包裡，還不忘確認那本借來的筆記有沒有放好。' },
  { kind: 'narration', text: '走出教學樓時，午後的陽光還沒完全退去。校園裡有腳踏車鈴聲，有人抱著講義匆匆往下一堂課趕，也有人已經在想晚餐要吃什麼。你在福利社買了飲料，冰涼的杯身很快凝出一層薄薄的水珠。' },
  { kind: 'narration', text: '剛走到樓下，你就看見溫尚翊站在靠近台階的地方。他背著那個深色吉他袋，肩帶有點滑，正低頭把它往上拉。聽見腳步聲，他抬起頭，朝你招了招手。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '欸，這邊。' },
  { kind: 'narration', text: '你小跑著走過去，停在他面前。' },
  { kind: 'dialogue', speaker: '你', text: '等很久了嗎？' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '還好啦，我也剛到。' },
  { kind: 'narration', text: '他順手把肩上的吉他袋往上提了提，視線落到你手裡的飲料上。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '走啊。' },
  { kind: 'narration', text: '你跟在溫尚翊後面，手裡還拿著剛剛在學校買的飲料。' },
  { kind: 'narration', text: '他走路不算快，偶爾會回頭看你有沒有跟上。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '妳走快一點啦。' },
  { kind: 'narration', text: '你低頭看了一眼自己的鞋子。' },
  { kind: 'dialogue', speaker: '你', text: '是你走太快了好嗎？' },
  { kind: 'narration', text: '他笑了一聲，也沒反駁，只是稍微放慢了腳步。' },
  { kind: 'narration', text: '你們就這樣沿著街道往練團室走。' },
  { kind: 'narration', text: '路邊的機車一輛接一輛地經過，風把騎樓下的傳單吹得翻了個面。你喝了一口飲料，冰塊碰到杯壁，發出很輕的聲音。溫尚翊走在前面，吉他袋偶爾擦過他的手臂。他沒有特別找話題，你也不覺得尷尬。' },
  { kind: 'narration', text: '你們本來就常常這樣，一起走去上課、在福利社碰面，或者下課後順路去吃點東西。只是今天，你終於要看看他口中那個總是讓他趕時間的地方，究竟長什麼樣子。' },
]

const studioScenes: StoryScene[] = [
  {
    kicker: '台北・下午',
    title: '門裡的聲音，比想像中更近',
    button: '走進去看看',
    blocks: [
      { kind: 'narration', text: '你跟著溫尚翊走進一棟有些年頭的樓。樓梯間不算寬，牆角貼著幾張褪色的演出海報，紙邊微微翹起。' },
      { kind: 'narration', text: '越往上走，聲音就越清楚。先是幾下吉他弦音，接著有鼓棒敲過鼓面的聲響，中間還夾著低低的貝斯聲。有人試了幾個音，又停下來調整，房間裡的聲音此起彼落。' },
      { kind: 'narration', text: '溫尚翊走在前面，熟門熟路地轉過樓梯口。到了二樓，他沒有敲門，只伸手推開那扇有點沉的門。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '欸，我來了。' },
      { kind: 'dialogue', speaker: '裡面的人', text: '今天還蠻準時的嘛。' },
      { kind: 'narration', text: '你跟在他身後走進去。房間比從外面聽起來還要熱鬧，牆邊靠著幾把吉他，音箱上放著沒收好的導線，地上有幾張寫滿字的紙。空氣裡混著木頭、金屬弦和一點悶熱的味道。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '進來啦，站門口幹嘛。' },
      { kind: 'narration', text: '他把吉他袋靠到牆邊，回頭朝裡面拍了拍手。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '欸，先介紹一下，這是我大學同學。今天帶她來看看。' },
      { kind: 'narration', text: '你朝大家點了點頭。幾個人抬眼向你打了招呼，隨後又繼續手邊的事。溫尚翊偶爾帶朋友過來，大家並不覺得奇怪。' },
    ],
  },
  {
    kicker: '認識新朋友・01',
    title: '第一個向你打招呼的人',
    button: '繼續認識大家',
    blocks: [
      { kind: 'narration', text: '靠近音箱的男生先停下手裡的動作。他把手上的線材放到一旁，抬起頭看了你一眼，笑容很自然，沒有讓人覺得拘束。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '妳好，我是陳信宏。' },
      { kind: 'dialogue', speaker: '你', text: '你好。' },
      { kind: 'narration', text: '他說話的聲音比房間裡的樂器聲輕一些，尾音帶著溫和的笑意。你還沒來得及多說什麼，他已經很自然地把旁邊的位置讓出來，讓你可以先把包包放下。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '妳先坐，等一下如果太吵再跟我們說。' },
      { kind: 'narration', text: '你說了聲謝謝，心裡那點剛進門的不自在，也跟著散掉了一些。' },
    ],
  },
  {
    kicker: '認識新朋友・02',
    title: '替你挪開椅子的人',
    button: '繼續認識大家',
    blocks: [
      { kind: 'narration', text: '你正想找地方坐，旁邊靠牆的人已經先站起來，把一張椅子往外挪了挪。動作不大，卻剛好替你留出一個不會擋到大家走動的位置。' },
      { kind: 'dialogue', speaker: '石錦航', text: '坐這邊好了，比較不會踩到線。' },
      { kind: 'narration', text: '他看起來比剛才那位安靜一些，說完又朝你點了點頭。' },
      { kind: 'dialogue', speaker: '石錦航', text: '我是石錦航。' },
      { kind: 'dialogue', speaker: '你', text: '你好，謝謝你。' },
      { kind: 'narration', text: '你把飲料放在椅子旁邊，低頭看了看地上交錯的線。剛才那句提醒不是客套，這裡每樣器材都得小心，連走路都要留意腳下。' },
    ],
  },
  {
    kicker: '認識新朋友・03',
    title: '鼓組後面的聲音',
    button: '繼續認識大家',
    blocks: [
      { kind: 'narration', text: '房間另一頭傳來一聲鼓棒敲在鼓框上的輕響。你轉過去，看見鼓組後面的人探出頭，手裡還拿著一支鼓棒。' },
      { kind: 'dialogue', speaker: '錢佑達', text: '嗨，我是錢佑達。今天鼓可能會有點大聲，妳先習慣一下喔。' },
      { kind: 'dialogue', speaker: '你', text: '沒關係，我坐遠一點就好了。' },
      { kind: 'narration', text: '他笑了笑，把鼓棒在掌心轉了一圈，又回頭去調整鼓的位置。你這才知道，原來剛剛那些試音聲就是從這裡傳出來的。' },
    ],
  },
  {
    kicker: '認識練團室的人・04',
    title: '練團室的老闆',
    button: '看看角落那個人',
    blocks: [
      { kind: 'narration', text: '你剛把飲料拿起來，門口又傳來鑰匙碰撞的聲音。一個男人推門走進來，手裡握著一串鑰匙，目光先掃過房間裡的器材，接著才注意到你。' },
      { kind: 'dialogue', speaker: '男人', text: '今天有新朋友喔？' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '諺明哥，這是我大學同學。這位是諺明，這間練團室的老闆。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '妳好啊，隨便坐，不用客氣。線不要亂踩就好。' },
      { kind: 'dialogue', speaker: '你', text: '好，謝謝。' },
      { kind: 'narration', text: '他把鑰匙放到桌上，檢查了一下牆邊的器材，又翻看桌上的預約簿。溫尚翊告訴你，諺明哥是這間練團室的老闆，平常負責照看場地和器材，並沒有跟他們一起玩音樂。' },
      { kind: 'narration', text: '你已經認識了幾位來練團的人，也知道這間場地是諺明哥在照看。大家各自忙著手上的事，你原本以為今天的介紹大概就到這裡了。' },
      { kind: 'narration', text: '溫尚翊忽然朝房間角落抬了抬下巴。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '那邊那個是蔡昇晏，彈 Bass 的。' },
      { kind: 'narration', text: '你順著他指的方向看過去。' },
    ],
  },
]

function MessageBubble({ mine, text }: { mine: boolean; text: string }) {
  return (
    <div className={mine ? 'message-row mine' : 'message-row'}>
      <div className={mine ? 'message-bubble mine' : 'message-bubble'}>{text}</div>
    </div>
  )
}

function StoryBlocks({ blocks }: { blocks: StoryBlock[] }) {
  return (
    <div className="narrative-blocks">
      {blocks.map((block, index) => {
        if (block.kind === 'dialogue') {
          return (
            <div className="narrative-dialogue" key={index}>
              <span>{block.speaker}</span>
              <p>「{block.text}」</p>
            </div>
          )
        }
        return <p className={block.kind === 'aside' ? 'narrative-aside' : 'narrative-paragraph'} key={index}>{block.text}</p>
      })}
    </div>
  )
}

function App() {
  const [playerName, setPlayerName] = useState(() => localStorage.getItem('mayday-player-name') ?? '')
  const [nameDraft, setNameDraft] = useState('')
  const [activeApp, setActiveApp] = useState<AppKey | null>(null)
  const [showNameSetup, setShowNameSetup] = useState(() => !localStorage.getItem('mayday-player-name'))
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [storyStage, setStoryStage] = useState<StoryStage>(() => {
    const saved = localStorage.getItem('mayday-story-stage')
    const valid: StoryStage[] = ['notification', 'messages', 'reply', 'walk', 'studio', 'reunion', 'reunion-chat', 'nickname', 'paused']
    return saved && valid.includes(saved as StoryStage) ? saved as StoryStage : 'notification'
  })
  const [studioStep, setStudioStep] = useState(() => Number(localStorage.getItem('mayday-studio-step') ?? '0'))
  const [replyKey, setReplyKey] = useState<ReplyKey | null>(() => {
    const saved = localStorage.getItem('mayday-reply')
    return saved === 'a' || saved === 'b' || saved === 'c' ? saved : null
  })
  const [wenAffection, setWenAffection] = useState(() => Number(localStorage.getItem('mayday-affection-wen') ?? '0'))
  const [reunionReplyKey, setReunionReplyKey] = useState<ReunionReplyKey | null>(() => {
    const saved = localStorage.getItem('mayday-reunion-reply')
    return saved === 'a' || saved === 'b' || saved === 'c' ? saved : null
  })
  const [nicknameQuestionKey, setNicknameQuestionKey] = useState<NicknameQuestionKey | null>(() => {
    const saved = localStorage.getItem('mayday-nickname-question')
    return saved === 'a' || saved === 'b' || saved === 'c' ? saved : null
  })
  const [resumeStage, setResumeStage] = useState<StoryStage>(() => {
    const saved = localStorage.getItem('mayday-resume-stage')
    const valid: StoryStage[] = ['notification', 'messages', 'reply', 'walk', 'studio', 'reunion', 'reunion-chat', 'nickname']
    return saved && valid.includes(saved as StoryStage) ? saved as StoryStage : 'reunion'
  })
  const messageScrollRef = useRef<HTMLDivElement>(null)
  const currentTime = storyStage === 'notification' || storyStage === 'messages' ? '15:42' : '16:30'

  useEffect(() => {
    if (storyStage === 'messages' && messageScrollRef.current) {
      messageScrollRef.current.scrollTop = messageScrollRef.current.scrollHeight
    }
  }, [storyStage])

  const changeStage = (next: StoryStage) => {
    setStoryStage(next)
    localStorage.setItem('mayday-story-stage', next)
  }

  const pauseStory = () => {
    if (storyStage !== 'paused') {
      setResumeStage(storyStage)
      localStorage.setItem('mayday-resume-stage', storyStage)
      changeStage('paused')
    }
  }

  const resumeStory = () => changeStage(resumeStage)

  const chooseReunionReply = (key: ReunionReplyKey) => {
    setReunionReplyKey(key)
    localStorage.setItem('mayday-reunion-reply', key)
  }

  const chooseNicknameQuestion = (key: NicknameQuestionKey) => {
    setNicknameQuestionKey(key)
    localStorage.setItem('mayday-nickname-question', key)
  }

  const saveName = (startStory = false) => {
    const trimmed = (nameDraft || playerName).trim()
    if (!trimmed) return
    localStorage.setItem('mayday-player-name', trimmed)
    setPlayerName(trimmed)
    if (startStory) {
      setShowNameSetup(false)
      changeStage('notification')
    } else {
      setActiveApp(null)
    }
  }

  const resetLocalData = () => {
    ;['mayday-player-name', 'mayday-story-stage', 'mayday-studio-step', 'mayday-reply', 'mayday-affection-wen', 'mayday-reunion-reply', 'mayday-nickname-question', 'mayday-resume-stage'].forEach((key) => localStorage.removeItem(key))
    setPlayerName('')
    setNameDraft('')
    setActiveApp(null)
    setStudioStep(0)
    setReplyKey(null)
    setWenAffection(0)
    setReunionReplyKey(null)
    setNicknameQuestionKey(null)
    setResumeStage('reunion')
    setShowResetConfirm(false)
    setStoryStage('notification')
    setShowNameSetup(true)
  }

  const chooseReply = (key: ReplyKey) => {
    const points = replies[key].affection
    const nextAffection = wenAffection + points
    setReplyKey(key)
    setWenAffection(nextAffection)
    localStorage.setItem('mayday-reply', key)
    localStorage.setItem('mayday-affection-wen', String(nextAffection))
    changeStage('reply')
  }

  const continueStudio = () => {
    if (studioStep < studioScenes.length - 1) {
      const next = studioStep + 1
      setStudioStep(next)
      localStorage.setItem('mayday-studio-step', String(next))
    } else {
      changeStage('reunion')
    }
  }

  const activeCopy = activeApp ? appCopy[activeApp] : null
  const ActiveIcon = activeApp ? (phoneApps.find((app) => app.id === activeApp)?.icon ?? Settings) : null
  const selectedReply = replyKey ? replies[replyKey] : null
  const currentScene = studioScenes[studioStep] ?? studioScenes[0]

  return (
    <main className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="page-heading">
        <div className="project-mark"><Heart size={14} fill="currentColor" /> A LITTLE STORY · 1996—1999</div>
        <h1>那年夏天，還有未讀訊息</h1>
        <p>五月天同人戀愛互動遊戲 · 第一章試玩</p>
      </header>

      <section className="device-wrap" aria-label="手機模擬器">
        <div className="phone">
          <div className="phone-top">
            <span className="brand-word">M<span>·</span>96</span>
            <div className="earpiece" />
            <div className="camera-dot" />
          </div>

          <div className="screen-frame">
            <div className="screen">
              <div className="status-bar">
                <div className="status-left"><Signal size={12} strokeWidth={2.4} /><span>中華電信</span></div>
                <span className="status-time">{currentTime}</span>
                <div className="status-right"><span>GSM</span><BatteryFull size={15} /></div>
              </div>

              <div className="screen-wallpaper">
                <div className="screen-date">
                  <span>TUESDAY</span>
                  <strong>10<span>.</span>15</strong>
                  <small>1996 · 台北</small>
                </div>
                <div className="screen-greeting">
                  <span>嗨，{playerName || '新朋友'}</span>
                  <small>今天也要好好生活。</small>
                </div>
              </div>

              {storyStage === 'reunion-chat' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">第一章</div>
                    <div className="story-contact-title">
                      <strong>久別重逢</strong>
                      <small>先回答溫尚翊</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">練團室・片刻安靜</div>
                    <h2 className="story-scene-title">你要怎麼回答？</h2>
                    {reunionReplyKey === null ? (
                      <>
                        <StoryBlocks blocks={[
                          { kind: 'narration', text: '溫尚翊還站在你身旁，等著你的回答。你看了看他，又看向角落裡那個多年沒見的人，一時之間竟不知道該從哪裡說起。' },
                        ]} />
                        <div className="choice-area">
                          <div className="choice-heading">選擇你的回答</div>
                          <button className="reply-choice" onClick={() => chooseReunionReply('a')}><span>嗯，我們小時候就認識了。</span><ChevronRight size={15} /></button>
                          <button className="reply-choice" onClick={() => chooseReunionReply('b')}><span>以前住得很近，後來搬家就沒再聯絡了。</span><ChevronRight size={15} /></button>
                          <button className="reply-choice" onClick={() => chooseReunionReply('c')}><span>很久以前的朋友了，我也沒想到會在這裡遇到他。</span><ChevronRight size={15} /></button>
                        </div>
                      </>
                    ) : (
                      <>
                        <StoryBlocks blocks={reunionReplies[reunionReplyKey].blocks} />
                        <div className="story-action-bar">
                          <button className="story-primary-button" onClick={() => changeStage('nickname')}>聽聽他們聊起以前 <ChevronRight size={15} /></button>
                        </div>
                      </>
                    )}
                  </div>
                  {reunionReplyKey === null && (
                    <div className="story-action-bar">
                      <button className="story-primary-button" onClick={() => changeStage('reunion')}>回去看剛才那一刻 <ChevronRight size={15} /></button>
                    </div>
                  )}
                </div>
              )}

              {storyStage === 'nickname' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">第一章</div>
                    <div className="story-contact-title">
                      <strong>那個綽號</strong>
                      <small>蔡昇晏 · 高中往事</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">大家嘴裡的 Masa</div>
                    <h2 className="story-scene-title">「你們怎麼都這樣叫他？」</h2>
                    {nicknameQuestionKey === null ? (
                      <>
                        <StoryBlocks blocks={[
                          { kind: 'narration', text: '你們才說了幾句，阿信已經轉回去整理手邊的東西，順口喊了角落的人一聲 Masa。你這才注意到，練團室裡的每個人似乎都這麼叫他。' },
                          { kind: 'narration', text: '你記得的明明是蔡昇晏。這個新名字讓你有點好奇，忍不住想問個清楚。' },
                        ]} />
                        <div className="choice-area">
                          <div className="choice-heading">你想怎麼問？</div>
                          <button className="reply-choice" onClick={() => chooseNicknameQuestion('a')}><span>你們怎麼都叫他 Masa 啊？</span><ChevronRight size={15} /></button>
                          <button className="reply-choice" onClick={() => chooseNicknameQuestion('b')}><span>等一下，Masa 是你的綽號喔？</span><ChevronRight size={15} /></button>
                          <button className="reply-choice" onClick={() => chooseNicknameQuestion('c')}><span>你什麼時候開始被叫 Masa 的？</span><ChevronRight size={15} /></button>
                        </div>
                      </>
                    ) : (
                      <>
                        <StoryBlocks blocks={nicknameStoryBlocks(nicknameQuestions[nicknameQuestionKey])} />
                        <div className="reunion-pause-note">那時候大家喊的是 Masa；後來，這個名字才以「瑪莎」的字樣被更多人認識。</div>
                        <div className="story-action-bar">
                          <button className="story-primary-button" onClick={pauseStory}>把這段重逢記下來 <ChevronRight size={15} /></button>
                        </div>
                      </>
                    )}
                  </div>
                  {nicknameQuestionKey === null && (
                    <div className="story-action-bar">
                      <button className="story-primary-button" onClick={() => changeStage('reunion-chat')}>回去看看剛才的對話 <ChevronRight size={15} /></button>
                    </div>
                  )}
                </div>
              )}

              {storyStage === 'paused' && (
                <div className="paused-story-banner">
                  <div>
                    <strong>故事暫停在：意外重逢</strong>
                    <small>練團室裡，重新認識蔡昇晏。</small>
                  </div>
                  <button onClick={resumeStory}>繼續 <ChevronRight size={13} /></button>
                </div>
              )}

              <div className="menu-title">
                <span>MENU</span>
                <span>主選單</span>
              </div>

              <div className="app-grid">
                {phoneApps.map((app, index) => {
                  const Icon = app.icon
                  return (
                    <button className="app-tile" key={app.id} onClick={() => setActiveApp(app.id)} aria-label={app.name}>
                      <span className={'app-icon icon-tone-' + (index % 4)}><Icon size={21} strokeWidth={1.8} /></span>
                      <span className="app-name">{app.name}</span>
                    </button>
                  )
                })}
              </div>

              <div className="screen-bottom">
                <button onClick={() => setActiveApp('settings')}>選項</button>
                <span className="tiny-signal">● ● ●</span>
                <button onClick={() => setActiveApp('contacts')}>通訊錄</button>
              </div>

              {storyStage === 'notification' && playerName && (
                <button className="sms-notification" onClick={() => changeStage('messages')}>
                  <span className="notification-icon"><MessageSquare size={19} /></span>
                  <span className="notification-copy">
                    <strong>溫尚翊</strong>
                    <span>妳下課了嗎？</span>
                    <span>今天要不要跟我去練團室？</span>
                  </span>
                  <span className="notification-time">現在</span>
                </button>
              )}

              {(storyStage === 'messages' || storyStage === 'reply') && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <button className="story-back" onClick={() => changeStage('notification')} aria-label="返回"><ArrowLeft size={17} /></button>
                    <div className="story-contact-mark">溫</div>
                    <div className="story-contact-title">
                      <strong>溫尚翊</strong>
                      <small>簡訊對話</small>
                    </div>
                    <button className="story-close" onClick={() => changeStage('paused')} aria-label="暫停故事"><X size={17} /></button>
                  </div>

                  {storyStage === 'messages' && (
                    <div className="story-message-scroll" ref={messageScrollRef}>
                      <div className="story-date-label">歷史簡訊</div>
                      {historicalDays.map((day) => (
                        <div className="history-day" key={day.date}>
                          <div className="story-date-label">{day.date}</div>
                          {day.messages.map((message, index) => (
                            <MessageBubble key={day.date + '-' + index} mine={message.from === 'me'} text={message.text} />
                          ))}
                        </div>
                      ))}
                      <div className="story-date-label">今天・15:42</div>
                      <MessageBubble mine={false} text="妳下課了嗎？" />
                      <MessageBubble mine={false} text="今天要不要跟我去練團室？" />
                      <div className="choice-area">
                        <div className="choice-heading">選擇你的回覆</div>
                        <button className="reply-choice" onClick={() => chooseReply('a')}>
                          <span>好啊，反正我今天也沒事。幾點出發？</span><ChevronRight size={15} />
                        </button>
                        <button className="reply-choice" onClick={() => chooseReply('b')}>
                          <span>好啊！我還沒看過你們練團欸，突然有點期待。</span><ChevronRight size={15} />
                        </button>
                        <button className="reply-choice" onClick={() => chooseReply('c')}>
                          <span>你怎麼突然想到約我？該不會又想找人幫你拿東西吧？</span><ChevronRight size={15} />
                        </button>
                        <small>選擇會影響你和溫尚翊之間的好感度，訊息不會自動送出。</small>
                      </div>
                    </div>
                  )}

                  {storyStage === 'reply' && selectedReply && (
                    <div className="story-message-scroll reply-result">
                      <div className="story-date-label">今天・15:43</div>
                      <MessageBubble mine text={selectedReply.text} />
                      {selectedReply.response.map((text, index) => <MessageBubble key={index} mine={false} text={text} />)}
                      <div className="reply-note">訊息已送出。溫尚翊說四點半會在妳教室樓下等。</div>
                      <button className="story-primary-button" onClick={() => changeStage('walk')}>收起手機，去樓下找他 <ChevronRight size={15} /></button>
                    </div>
                  )}
                </div>
              )}

              {storyStage === 'walk' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">第一章</div>
                    <div className="story-contact-title">
                      <strong>樓下見</strong>
                      <small>1996 年・台灣大學</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">下午四點半・台大校園</div>
                    <h2 className="story-scene-title">他在樓下等你</h2>
                    <StoryBlocks blocks={walkBlocks} />
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={() => { setStudioStep(0); localStorage.setItem('mayday-studio-step', '0'); changeStage('studio') }}>前往練團室 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'studio' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">第一章</div>
                    <div className="story-contact-title">
                      <strong>練團室</strong>
                      <small>練團室初訪 · {studioStep + 1}/5</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">{currentScene.kicker}</div>
                    <h2 className="story-scene-title">{currentScene.title}</h2>
                    <StoryBlocks blocks={currentScene.blocks} />
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={continueStudio}>{currentScene.button} <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'reunion' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">第一章</div>
                    <div className="story-contact-title">
                      <strong>意外重逢</strong>
                      <small>練團室・角落</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">隔了好多年，再一次認出他</div>
                    <h2 className="story-scene-title">「……蔡昇晏？」</h2>
                    <StoryBlocks blocks={[
                      { kind: 'narration', text: '你順著溫尚翊指的方向看過去。角落裡的人低著頭，懷裡抱著一把貝斯，指尖在弦上輕輕撥了幾下，確認音準。' },
                      { kind: 'narration', text: '聽見有人喊自己的名字，他停下手上的動作，抬起頭。' },
                      { kind: 'narration', text: '四目相對的那一刻，你整個人都愣住了。' },
                      { kind: 'dialogue', speaker: '你', text: '……蔡昇晏？' },
                      { kind: 'narration', text: '他的手指還停在琴弦上，視線牢牢落在你臉上。過了兩秒，他才像是終於認出你。' },
                      { kind: 'dialogue', speaker: '蔡昇晏', text: '……蛤？' },
                      { kind: 'aside', text: '救命。' },
                      { kind: 'narration', text: '你真的沒想過會在這裡見到他。那個搬家前還跟你約好要保持聯絡，後來卻因為一場大雨和一張模糊的地址紙失去消息的人，現在就坐在離你不到幾步的地方。' },
                      { kind: 'narration', text: '你看著他，忽然想起小時候那些零碎的畫面。明明隔了這麼多年，你卻還是一眼就認出了他。' },
                      { kind: 'narration', text: '溫尚翊站在你旁邊，看看你，又看看角落裡的人，完全摸不著頭緒。' },
                      { kind: 'dialogue', speaker: '溫尚翊', text: '等一下。' },
                      { kind: 'dialogue', speaker: '溫尚翊', text: '妳們認識喔？' },
                    ]} />
                    <div className="reunion-pause-note">有些人以為再也見不到了，卻偏偏在今天重逢。</div>
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={() => changeStage('reunion-chat')}>回應溫尚翊 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'paused' && (
                <div className="story-resume-hint">
                  <span>第一章・意外重逢</span>
                  <small>故事已暫停，進度會保存在這台手機。</small>
                  <button onClick={resumeStory}>繼續故事 <ChevronRight size={14} /></button>
                </div>
              )}

              {activeApp && activeCopy && (
                <div className="app-overlay">
                  <div className="app-window">
                    <div className="app-window-head">
                      <button className="back-button" onClick={() => setActiveApp(null)} aria-label="返回主選單"><ArrowLeft size={17} /></button>
                      <div className="app-window-title">
                        {ActiveIcon && <ActiveIcon size={17} />}
                        <span>{activeCopy.heading}</span>
                      </div>
                      <button className="close-button" onClick={() => setActiveApp(null)} aria-label="關閉"><X size={17} /></button>
                    </div>
                    <div className="app-window-content">
                      {activeApp === 'settings' ? (
                        <>
                          <div className="settings-symbol"><Settings size={28} /></div>
                          <h2>{activeCopy.body}</h2>
                          <p>{activeCopy.detail}</p>
                          <label className="field-label" htmlFor="rename-player">你的名字</label>
                          <div className="rename-row">
                            <input id="rename-player" value={nameDraft || playerName} onChange={(event) => setNameDraft(event.target.value)} placeholder="輸入名字" maxLength={12} />
                            <button className="small-action" onClick={() => saveName(false)}><Check size={15} /> 儲存</button>
                          </div>
                          <button className="danger-action" onClick={() => setShowResetConfirm(true)}>清除本機資料並重新開始</button>
                        </>
                      ) : (
                        <>
                          <div className="empty-symbol">{ActiveIcon && <ActiveIcon size={29} />}</div>
                          <h2>{activeCopy.body}</h2>
                          <p>{activeCopy.detail}</p>
                          <div className="coming-soon"><Radio size={15} /> 故事開始後逐步開放</div>
                        </>
                      )}
                    </div>
                    <div className="app-window-foot"><span>1996 / TAIPEI</span><span>BACK <ChevronRight size={11} /></span></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="phone-controls">
            <div className="soft-keys">
              <button onClick={() => { setActiveApp(null); pauseStory() }}>返回</button>
              <span className="control-light" />
              <button onClick={() => setActiveApp('contacts')}>選擇</button>
            </div>
            <div className="keypad">
              {['1','2','3','4','5','6','7','8','9','*','0','#'].map((key) => (
                <button key={key} className="key" aria-label={'按鍵 ' + key}>
                  <strong>{key}</strong>
                  <small>{({ '2':'ABC', '3':'DEF', '4':'GHI', '5':'JKL', '6':'MNO', '7':'PQRS', '8':'TUV', '9':'WXYZ', '0':'+', '1':'', '*':'', '#':'' } as Record<string,string>)[key]}</small>
                </button>
              ))}
            </div>
            <div className="phone-bottom-label">TAIPEI · 1996—1999</div>
          </div>
        </div>
      </section>

      <footer className="page-footer">
        <span><Clock3 size={13} /> 故事，從一九九六年開始。</span>
        <span>BUILD 0.2.0 · FIRST CHAPTER</span>
      </footer>

      {showNameSetup && (
        <div className="modal-backdrop">
          <div className="name-modal">
            <div className="modal-icon"><Smartphone size={25} /></div>
            <span className="eyebrow">WELCOME TO TAIPEI · 1996</span>
            <h2>先留下你的名字吧。</h2>
            <p>這支手機以後會記下你的訊息、日記，還有那些不想忘記的人。</p>
            <label htmlFor="player-name">你的名字</label>
            <input id="player-name" autoFocus value={nameDraft} onChange={(event) => setNameDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') saveName(true) }} placeholder="輸入名字（最多12字）" maxLength={12} />
            <button className="primary-action" onClick={() => saveName(true)} disabled={!nameDraft.trim()}>好，開始吧 <ChevronRight size={16} /></button>
            <small>姓名之後仍可在手機設定中修改。</small>
          </div>
        </div>
      )}

      {showResetConfirm && (
        <div className="modal-backdrop">
          <div className="confirm-modal">
            <div className="modal-icon warning"><CircleHelp size={24} /></div>
            <h2>確定要重新開始嗎？</h2>
            <p>這會清除目前這台瀏覽器保存的玩家姓名、劇情進度和好感度，讓你從第一條短信重新開始。</p>
            <div className="confirm-actions">
              <button onClick={() => setShowResetConfirm(false)}>先不要</button>
              <button className="danger-solid" onClick={resetLocalData}>清除資料</button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default App
