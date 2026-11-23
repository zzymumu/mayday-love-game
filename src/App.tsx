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
  Save,
  Phone,
  Radio,
  Settings,
  Signal,
  Smartphone,
  X,
} from 'lucide-react'

type AppKey = 'messages' | 'contacts' | 'calls' | 'diary' | 'calendar' | 'photos' | 'music' | 'notes' | 'settings'
type CharacterId = 'wen' | 'masa' | 'ashin' | 'stone' | 'yanming' | 'youda'
type RouteCharacterId = Exclude<CharacterId, 'youda'>
type StoryStage = 'notification' | 'messages' | 'reply' | 'walk' | 'studio' | 'reunion' | 'reunion-chat' | 'nickname' | 'rehearsal' | 'dinner' | 'after-dinner' | 'ending' | 'completed' | 'greetings' | 'classroom' | 'masa-checkin' | 'stone-checkin' | 'ice-date' | 'stroll' | 'day2-diary' | 'free-time' | 'free-chat' | 'day2-complete' | 'month-free-time' | 'month-visit' | 'month-visit-complete' | 'month-free-chat' | 'month-diary' | 'paused'
type ReplyKey = 'a' | 'b' | 'c'
type ReunionReplyKey = 'a' | 'b' | 'c'
type NicknameQuestionKey = 'a' | 'b' | 'c'
type DinnerReplyKey = 'a' | 'b' | 'c'
type StoryBlock = { kind: 'narration' | 'dialogue' | 'aside'; text: string; speaker?: string }
type StoryScene = { kicker: string; title: string; blocks: StoryBlock[]; button: string }
type SmsMessage = { id: string; date: string; time?: string; from: CharacterId | 'me'; text: string }
type NewChatEntry = { from: CharacterId | 'me'; text: string; time?: string }
type ChatChoice = { text: string; response: string[]; affection: number }
type ChatRound = { incoming: string; choices: ChatChoice[] }
type CallLogEntry = { id: string; character: RouteCharacterId; status: 'answered' | 'missed'; time: string; date?: string }
type CallTranscriptLine = { speaker: RouteCharacterId | 'me'; text: string }
type CallExperienceSource = 'first-chapter' | 'day2' | 'free-chat' | 'month-visit' | 'month-free-chat'
type CharacterExperienceRecord = {
  character: RouteCharacterId
  source: CallExperienceSource
  date: string
  eventKey: string
  day2StrollAccepted: boolean
  choices?: number[]
}
type SaveSlotData = { version: 1; savedAt: string; gameDate: string; gameTime: string; stage: StoryStage; stageLabel: string; data: Record<string, string> }
type MonthVisitChoice = { text: string; response: string[]; affection: number }
type MonthVisitRound = { scene?: string; prompt: string; choices: MonthVisitChoice[] }
type MonthFreeChatOpening = { text: string; response: string }
type MonthVisitRoute = { label: string; subtitle: string; location: string; title: string; kicker: string; blocks: StoryBlock[]; rounds: MonthVisitRound[]; ending: StoryBlock[] }

const SAVE_SLOT_IDS = [1, 2, 3] as const
const SAVE_SLOT_PREFIX = 'mayday-save-slot-'
const storyStageLabels: Record<StoryStage, string> = {
  notification: '收到練團室邀約', messages: '回覆邀約', reply: '準備出發', walk: '前往練團室',
  studio: '練團室初訪', reunion: '意外重逢', 'reunion-chat': '久別重逢', nickname: 'Masa 的由來',
  rehearsal: '第一次聽他們練團', dinner: '練團後的晚餐', 'after-dinner': '晚餐後的談話',
  ending: '回家後', completed: '第一章完成', greetings: '晚間訊息', classroom: '課堂中的邀約',
  'masa-checkin': '關心瑪莎', 'stone-checkin': '關心石頭', 'ice-date': '下課吃冰', stroll: '傍晚散步',
  'day2-diary': '寫下第二篇日記', 'free-time': '自由活動', 'free-chat': '自由聊天',
  'day2-complete': '第二天結束', 'month-free-time': '一個月後・自由活動', 'month-visit': '一個月後・外出見面', 'month-visit-complete': '一個月後・見面結束', 'month-free-chat': '一個月後・自由對話', 'month-diary': '一個月後・私人日記', paused: '故事暫停',
}
const readSaveSlot = (slot: number): SaveSlotData | null => {
  try {
    const raw = localStorage.getItem(SAVE_SLOT_PREFIX + slot)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<SaveSlotData>
    if (parsed.version !== 1 || typeof parsed.savedAt !== 'string' || typeof parsed.gameDate !== 'string' || typeof parsed.gameTime !== 'string' || typeof parsed.stage !== 'string' || !Object.prototype.hasOwnProperty.call(storyStageLabels, parsed.stage) || !parsed.data || typeof parsed.data !== 'object' || Array.isArray(parsed.data)) return null
    return parsed as SaveSlotData
  } catch {
    return null
  }
}

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
  { id: 'notes', name: '存檔中心', subtitle: '保存與讀取進度', icon: Save },
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
    heading: '存檔中心',
    body: '把故事好好收起來。',
    detail: '保存或讀取不同時間點的劇情、訊息與好感度。',
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
    response: ['妳每次都把我想得那麼差喔。', '我只是覺得妳可能會有興趣，才問一下。', '四點半樓下等妳，不要遲到。'],
    affection: -1,
  },
}

function createInitialSmsMessages(): SmsMessage[] {
  const initial: SmsMessage[] = historicalDays.flatMap((day, dayIndex) =>
    day.messages.map((message, messageIndex) => ({
      id: `history-${dayIndex}-${messageIndex}`,
      date: day.date,
      from: message.from,
      text: message.text,
    })),
  )
  initial.push(
    { id: 'invite-1', date: '今天', time: '15:42', from: 'wen', text: '妳下課了嗎？' },
    { id: 'invite-2', date: '今天', time: '15:42', from: 'wen', text: '今天要不要跟我去練團室？' },
  )
  const savedReply = localStorage.getItem('mayday-reply')
  if (savedReply === 'a' || savedReply === 'b' || savedReply === 'c') {
    const selected = replies[savedReply]
    initial.push({ id: 'story-reply-player', date: '今天', time: '15:43', from: 'me', text: selected.text })
    selected.response.forEach((text, index) => initial.push({
      id: `story-reply-wen-${index}`,
      date: '今天',
      time: index === 0 ? '15:43' : '15:44',
      from: 'wen',
      text,
    }))
  }
  return initial
}

const reunionReplies: Record<ReunionReplyKey, { text: string; affection: number; blocks: StoryBlock[] }> = {
  a: {
    text: '嗯，我們小時候就認識了。',
    affection: 3,
    blocks: [
      { kind: 'dialogue', speaker: '你', text: '嗯，我們小時候就認識了。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '真的假的？妳們以前就認識喔？' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '很久以前了啦。' },
      { kind: 'narration', text: '他把貝斯輕輕靠到椅邊，目光還停在你身上。那句「很久以前」說得簡單，卻讓你一下子想起了好多事。' },
    ],
  },
  b: {
    text: '以前住得很近，後來搬家就沒再聯絡了。',
    affection: 1,
    blocks: [
      { kind: 'dialogue', speaker: '你', text: '以前住得很近，後來搬家就沒再聯絡了。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '難怪妳剛剛那個表情。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '真的隔很久了。' },
      { kind: 'narration', text: '你點點頭。明明只是幾句話，卻還是有點難以相信，自己竟然真的在這裡重新見到了他。' },
    ],
  },
  c: {
    text: '很久以前的朋友了，我也沒想到會在這裡遇到他。',
    affection: -1,
    blocks: [
      { kind: 'dialogue', speaker: '你', text: '很久以前的朋友了，我也沒想到會在這裡遇到他。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '這也太巧了吧。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '我也沒想到啊。' },
      { kind: 'narration', text: '他笑了一下，像是還沒完全從驚訝裡回過神。你也一樣，胸口那股突然湧上來的情緒，還沒找到地方安放。' },
    ],
  },
}

const nicknameQuestions: Record<NicknameQuestionKey, { text: string; response: string; affection: number }> = {
  a: { text: '你們怎麼都叫他 Masa 啊？', response: '就高中時候亂取的啦，說起來很無聊。', affection: 2 },
  b: { text: '等一下，Masa 是你的綽號喔？', response: '不然妳以為我本名就叫 Masa？妳以前不是最愛叫我本名？', affection: 3 },
  c: { text: '你什麼時候開始被叫 Masa 的？', response: '妳現在是要查戶口喔？怎麼什麼都問。', affection: -1 },
}

const nicknameStoryBlocks = (question: string, masaResponse: string): StoryBlock[] => [
  { kind: 'narration', text: '你原本還想問他這些年過得怎麼樣，房間另一頭卻先傳來阿信的聲音。' },
  { kind: 'dialogue', speaker: '陳信宏', text: 'Masa，等一下那段你再幫我聽一下，好不好？' },
  { kind: 'narration', text: '你轉過頭，這才發現大家喊他的時候，用的根本不是他的本名。' },
  { kind: 'dialogue', speaker: '你', text: question },
  { kind: 'dialogue', speaker: '蔡昇晏', text: masaResponse },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '高一的時候，我是學弟，怪獸跟阿信都是學長。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '那時候阿信常常把我名字叫反，明明是蔡昇晏，他偏偏叫成蔡晏昇，還說這樣念起來比較順。' },
  { kind: 'narration', text: '他說到這裡，朝阿信那邊看了一眼。阿信摸了摸鼻子，沒有否認。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '有一次我們經過南京東路五段那邊的理容院，看到門口穿花襯衫、絲質西裝褲的人，就拿他們開玩笑，說那種人好像都叫 Masa 或阿龍。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '怪獸就說我很適合叫 Masa，還說阿信應該叫阿龍。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '結果阿龍根本沒人記得，只有他一直被叫到現在欸。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '啊不然妳覺得他適合叫什麼？' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '你不要再亂取了啦。' },
  { kind: 'narration', text: '你終於忍不住笑了。原來大家口中的 Masa，是高中時候一個隨口開的玩笑留下來的。至少今天，在你心裡，他還是那個叫蔡昇晏的人。' },
]

const rehearsalBlocks: StoryBlock[] = [
  { kind: 'narration', text: '綽號的話題告一段落，房間裡又慢慢回到練團前的忙碌。錢佑達坐回鼓組後面，拿鼓棒輕輕敲了敲鼓框。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '好啦，準備喔。從前面一次。' },
  { kind: 'narration', text: '溫尚翊把吉他袋靠到牆邊，回頭看了一眼你坐的位置。石錦航剛才替你挪好的椅子，剛好避開了地上交錯的線材。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '石頭幫妳找好位置了喔？' },
  { kind: 'dialogue', speaker: '你', text: '嗯，他剛剛還提醒我小心地上的線。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '那就好。飲料先放桌上啦，別擺在音箱旁邊，等一下線勾到會整個翻掉。' },
  { kind: 'dialogue', speaker: '你', text: '知道啦，你怎麼比我還緊張。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '我只是提醒妳，等一下不要又顧著看我們練團。' },
  { kind: 'narration', text: '他說完才拿起吉他。走回大家身邊前，還是回頭確認了一次你有沒有把飲料放好。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '等一下如果覺得太吵就跟我說，不用硬撐。' },
  { kind: 'dialogue', speaker: '你', text: '好啦，你快去練你的。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '怪獸，你今天是帶同學來，還是帶小朋友來校外教學？' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '你管好你的 Bass 就好。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '我的 Bass 好得很，是你剛剛那個和弦又按得亂七八糟。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '我剛剛是在調音。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '每次彈錯都說在調音。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '你們兩個先把歌練完再吵啦，好不好？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '等一下，我剛剛到底要跟誰的拍子？' },
  { kind: 'dialogue', speaker: '石錦航', text: '再來一次吧，從副歌前面進。' },
  { kind: 'narration', text: '這次沒有人再接話。錢佑達先數了拍子，鼓聲落下來，溫尚翊的吉他跟著進去，低沉的 Bass 從另一側接住旋律。剛才還吵成一團的幾個人，一拿起樂器就像突然找到共同的語言。' },
  { kind: 'narration', text: '你坐在牆邊，手指無意識地跟著節奏敲在膝蓋上。偶爾有人停下來重來，瑪莎總能第一個指出哪裡不對，語氣還特別不客氣。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '剛剛副歌那邊又快了啦。有人是不是太想表現？' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '你是在說誰？' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '誰自己心裡有數。' },
  { kind: 'dialogue', speaker: '陳信宏', text: 'Masa，你先不要講風涼話啦，你剛剛也有一個音沒跟到欸。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '我那個叫留空間，懂不懂？' },
  { kind: 'dialogue', speaker: '你', text: '你這個解釋也太方便了吧。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '欸？妳坐那邊聽得懂喔？' },
  { kind: 'dialogue', speaker: '你', text: '聽不懂也聽得出來你很吵。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '很好，至少耳朵還沒退化。' },
  { kind: 'narration', text: '你忍不住笑了。這個人真的一點都沒變，甚至比小時候更會接話、更懂得怎麼把人噎得說不出話。只是當他低下頭重新撥動琴弦，神情又很快認真起來。' },
  { kind: 'narration', text: '中間休息時，溫尚翊拿著水走到你旁邊，彎下腰，沒有打斷其他人的聊天，只低聲問了你一句。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '還好嗎？會不會太大聲？' },
  { kind: 'dialogue', speaker: '你', text: '還好啊，滿好聽的。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '那就好。等一下再坐一下，快結束了。' },
  { kind: 'narration', text: '他沒有多說什麼，喝了兩口水就又回到自己的位置。你看著他把吉他背好，忽然覺得自己好像比想像中更習慣他這樣自然地照顧你。' },
  { kind: 'narration', text: '最後一段音樂停下來時，錢佑達把鼓棒往膝上一放，長長吐了口氣。練團室裡終於安靜了幾秒，接著又被大家七嘴八舌的聲音填滿。' },
]

const dinnerIntroBlocks: StoryBlock[] = [
  { kind: 'narration', text: '收好器材時，外面的天已經暗了。錢佑達一邊把鼓棒收進袋子，一邊宣布自己現在最需要的不是休息，是吃飯。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '我真的快餓死了，先去吃東西啦。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '你剛剛不是還說要再練一次？' },
  { kind: 'dialogue', speaker: '錢佑達', text: '我現在改變主意不行喔？' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '附近有間熱炒還不錯，走啦。' },
  { kind: 'narration', text: '你跟著大家走進附近一間熱鬧的小店。玻璃門上沾著一點油煙，牆上的菜單用紅筆寫在白板上，廚房裡的鍋鏟聲和店員報菜名的聲音混在一起。' },
  { kind: 'narration', text: '桌上很快擺滿了幾道熱菜。阿信把筷子分給大家，石錦航替你把靠牆的位置拉開，溫尚翊則把一杯茶推到你手邊。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '妳今天第一次來，還習慣嗎？剛剛鼓聲真的滿大的，有沒有嚇到馁？' },
  { kind: 'dialogue', speaker: '你', text: '還好啊，滿有趣的。' },
  { kind: 'dialogue', speaker: '石錦航', text: '那就好。下次可以坐更裡面一點。' },
  { kind: 'narration', text: '原本大家還在聊剛才練到一半的段落，沒過多久，阿信終於把話題繞回了你和瑪莎身上。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '欸，對了，妳跟 Masa 剛剛到底是怎麼回事啊？' },
  { kind: 'dialogue', speaker: '石錦航', text: '你們一見面就直接叫出本名，看起來真的認識很久了。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '我剛剛還以為你們認錯人，結果是真的認識喔？' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '你們是來吃飯還是來審問的？菜先吃啦。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '我也想知道啊，我都不知道你跟她認識。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '我也是今天才知道她跟你混在一起啊！' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '蛤？什麼叫混在一起？' },
  { kind: 'narration', text: '桌邊立刻響起一陣笑聲。瑪莎夾了一口菜，還是一臉理直氣壯，彷彿剛才那句話完全沒有問題。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '好啦，所以你們以前就認識喔？怎麼認識的？' },
]

const dinnerReplies: Record<DinnerReplyKey, { text: string; affection: number; blocks: StoryBlock[] }> = {
  a: {
    text: '我們小時候住得很近，常常一起玩。後來他搬家，就沒再聯絡了。',
    affection: 3,
    blocks: [
      { kind: 'dialogue', speaker: '你', text: '我們小時候住得很近，常常一起玩。後來他搬家，就沒再聯絡了。' },
      { kind: 'dialogue', speaker: '石錦航', text: '原來是這樣，難怪妳一眼就認出他。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '講得好像我們以前真的很常一起玩一樣。' },
      { kind: 'dialogue', speaker: '你', text: '不然你以前都在做什麼？' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '找妳吵架啊。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '聽起來很合理欸。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '難怪妳剛剛整個人都愣住了。' },
      { kind: 'narration', text: '你低頭笑了一下。隔了這麼多年，瑪莎還是能把一段很普通的回憶講得像在跟你抬槓。' },
    ],
  },
  b: {
    text: '他小時候就很愛惹我，現在完全沒變，甚至變本加厲。',
    affection: 4,
    blocks: [
      { kind: 'dialogue', speaker: '你', text: '他小時候就很愛惹我，現在完全沒變，甚至變本加厲。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '妳才剛坐下就開始告狀喔？' },
      { kind: 'dialogue', speaker: '你', text: '我只是講事實。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '那妳怎麼不說妳以前也很難搞？' },
      { kind: 'dialogue', speaker: '你', text: '我哪有！' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '妳看，現在不就來了。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '你們以前也是這樣講話喔？' },
      { kind: 'dialogue', speaker: '陳信宏', text: '感覺你們完全不用重新熟悉欸。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '她以前就這樣，長大也沒有比較成熟。' },
      { kind: 'dialogue', speaker: '你', text: '你才沒有進步！' },
      { kind: 'narration', text: '大家笑成一團。你本來還有點擔心多年不見會不知道怎麼相處，現在看來，這個問題根本不存在。' },
    ],
  },
  c: {
    text: '我們本來說好搬家後要繼續聯絡，後來卻失聯了。',
    affection: 2,
    blocks: [
      { kind: 'dialogue', speaker: '你', text: '我們本來說好搬家後要繼續聯絡，後來卻失聯了。' },
      { kind: 'dialogue', speaker: '石錦航', text: '那真的隔很久了。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '難怪剛剛你們兩個都嚇了一跳喔。' },
      { kind: 'narration', text: '瑪莎手裡的筷子停了一下，很快又若無其事地夾起菜。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '那時候都還小嘛，誰知道會隔這麼久。' },
      { kind: 'dialogue', speaker: '你', text: '對啊，我也沒想到今天會在這裡遇到你。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '現在重新遇到了就好啦。' },
      { kind: 'narration', text: '桌上的話題又慢慢回到練團和晚餐。只是你注意到，瑪莎偶爾會抬眼看你，像是還有些話想問。' },
    ],
  },
}

const afterDinnerBlocks: StoryBlock[] = [
  { kind: 'narration', text: '吃完飯後，大家陸續走出熱炒店。街邊的招牌亮了起來，機車從路口一輛輛經過，晚風把店裡沾上的油煙味吹散了一些。' },
  { kind: 'narration', text: '阿信和石錦航走在前面，錢佑達說要去旁邊買飲料。溫尚翊停下來等你，瑪莎卻在這時伸手輕輕碰了碰你的手臂。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '欸，妳等一下。' },
  { kind: 'dialogue', speaker: '你', text: '怎樣？' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '剛剛大家都在，我有些話不太好問。那時候妳後來怎麼都沒消息？' },
  { kind: 'dialogue', speaker: '你', text: '我真的有想找你，只是地址被雨淋壞了。' },
  { kind: 'narration', text: '你把那天回家路上突然下起的大雨、地址紙上的字一點一點暈開的樣子，還有後來搬家時不小心把那張紙弄丟的事，慢慢說給他聽。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '所以妳那時候不是故意不找我喔？' },
  { kind: 'dialogue', speaker: '你', text: '當然不是啊。我那時候真的很想找到你。' },
  { kind: 'narration', text: '他低頭看著鞋尖，安靜了一會兒。剛才在店裡還能接連吐槽所有人的人，這時候反而不知道該怎麼接話。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '我那時候也有等妳的消息啊。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '後來等不到，就想說妳可能已經忘記我了。' },
  { kind: 'dialogue', speaker: '你', text: '我怎麼可能忘記你。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '好啦，現在知道了。不要一直擺那個表情。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '而且妳現在不是找到我了？以後要找我就直接來練團室，記得路就好。' },
  { kind: 'narration', text: '他說完又恢復了那副理所當然的樣子，像是怕氣氛太認真，故意把話說得輕鬆。' },
  { kind: 'dialogue', speaker: '你', text: '你真的很會破壞氣氛欸。' },
  { kind: 'dialogue', speaker: '蔡昇晏', text: '不然咧？要抱著哭喔？' },
  { kind: 'narration', text: '你瞪了他一眼，他終於笑了。這個人真的一點都沒變。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '妳們聊好了嗎？我送妳去搭車。' },
  { kind: 'dialogue', speaker: '你', text: '好。' },
  { kind: 'narration', text: '溫尚翊沒有催你，只是等你走到身邊，才和你一起往前走。路口車多，他很自然地走在靠近車道的那一側。' },
]

const endingBlocks: StoryBlock[] = [
  { kind: 'narration', text: '回到家時，已經快九點了。你把包放到椅子上，換下鞋子，才發現自己從下午到現在幾乎沒有真正安靜下來過。' },
  { kind: 'narration', text: '今天本來只是跟著溫尚翊去練團室看看。你聽見了他們認真練習的聲音，認識了幾個新朋友，還在一個完全沒預料到的地方，重新遇見了蔡昇晏。' },
  { kind: 'narration', text: '手機螢幕亮起。通訊錄裡多了幾個名字，日記也空出了一頁，像是替這個有點不真實的下午留了位置。' },
  { kind: 'narration', text: '你把今天發生的事情一件件寫進日記裡。寫到最後，才終於有了今天真的發生過的實感。' },
]


const characterInfo: { id: CharacterId; name: string; role: string; avatar: string }[] = [
  { id: 'wen', name: '溫尚翊', role: '大學同學・吉他手', avatar: '溫' },
  { id: 'masa', name: '蔡昇晏', role: '童年玩伴・Bass', avatar: '蔡' },
  { id: 'ashin', name: '陳信宏', role: '主唱', avatar: '陳' },
  { id: 'stone', name: '石錦航', role: '吉他手', avatar: '石' },
  { id: 'yanming', name: '劉諺明', role: '練團室老闆', avatar: '劉' },
  { id: 'youda', name: '錢佑達', role: '鼓手', avatar: '錢' },
]
const greetingOrder: CharacterId[] = ['wen', 'masa', 'ashin', 'stone', 'yanming', 'youda']
const freeTimeOrder: RouteCharacterId[] = ['wen', 'masa', 'ashin', 'stone', 'yanming']
const monthVisitOrder: RouteCharacterId[] = ['wen', 'ashin', 'masa', 'stone', 'yanming']
const characterNames: Record<CharacterId, string> = {
  wen: '溫尚翊', masa: '蔡昇晏', ashin: '陳信宏', stone: '石錦航', yanming: '劉諺明', youda: '錢佑達',
}
const makeChatRound = (
  incoming: string,
  firstText: string,
  firstResponse: string,
  secondText: string,
  secondResponse: string,
  thirdText: string,
  thirdResponse: string,
  thirdAffection: number,
): ChatRound => ({
  incoming,
  choices: [
    { text: firstText, response: [firstResponse], affection: 1 },
    { text: secondText, response: [secondResponse], affection: 2 },
    { text: thirdText, response: [thirdResponse], affection: thirdAffection },
  ],
})

// Every message reply round presents three distinct responses and affection outcomes (including neutral or negative choices).
// Author-only continuity note: in 1996, Masa (蔡昇晏) and Shitou (石錦航) are both repeat students in their final year at 師大附中. Masa is one year younger than the heroine. The heroine does not know their school year or repeat-year history yet; never reveal it in her narration, unlocked profile, or these early messages.
const greetingChats: Record<CharacterId, ChatRound[]> = {
  wen: [
    makeChatRound('妳到家了嗎？今天謝謝妳跟我們去。', '到了啦，今天還滿好玩的。', '那就好，我還怕妳會覺得無聊。', '剛到家。你今天也辛苦了。', '還好啦，今天有人陪著，時間過得比較快。', '你是不是怕我回家以後就忘記今天了？', '我只是想確認妳平安到家，妳不要什麼都想得那麼複雜。', -1),
    makeChatRound('剛剛大家一直問妳跟瑪莎以前的事，妳還好吧？', '還好啊，大家只是好奇而已。', '那就好。瑪莎那個人就是嘴巴停不下來。', '你是不是也很好奇？', '有一點啊，妳剛剛整個人都愣住了。', '你剛剛是不是一直在注意我跟瑪莎講話？', '有啦，怕妳們聊得太投入，最後把我這個帶路的人忘了。', 3),
    makeChatRound('下次有空再帶妳去，這次應該不會那麼突然了。', '好啊，不過下次要先跟我說。', '知道啦，不會再突然把妳抓過去了。', '看你表現囉。', '妳很難約欸，還要看我表現。', '算了啦，你們練團我又聽不懂，去了也是發呆。', '妳都還沒聽過就先下結論喔？隨便妳啦。', 0),
  ],
  masa: [
    makeChatRound('到家沒？今天突然遇到妳，我現在還覺得有點扯。', '我也是啊，到現在還覺得不真實。', '妳剛剛那個表情真的很好笑。', '你還敢說，我差點以為自己看錯人。', '妳最好是看錯，明明一眼就認出來。', '你現在才覺得扯喔？我還想問你怎麼都沒找我。', '妳現在是在算帳是不是？才剛見面就開始了喔。', -1),
    makeChatRound('我剛剛本來想問妳這些年過得怎樣，結果大家一直插話。', '那你現在可以問啊。', '好啊，那改天找時間慢慢問。', '你想知道的話就自己約我啊。', '妳現在講話很有底氣喔。', '你少裝了，你剛剛明明也一直看我。', '妳真的很會替自己加戲欸。', 3),
    makeChatRound('還有，今天不要再一直叫我蔡昇晏，聽起來很像要被老師點名。', '那我下次叫你瑪莎？', '這樣比較正常，至少大家都聽得懂。', '看我心情，誰叫你以前都不聯絡。', '又來了，這件事妳是打算講幾年？', '好啊，那你要請客，不然我可不去。', '妳還是一樣，什麼都要先談條件。', 0),
  ],
  ashin: [
    makeChatRound('妳到家了嗎？今天第一次來練團室，還習慣嗎？對了，大家都叫我阿信，妳也可以這樣叫我喔。', '到了喔，今天很有趣，謝謝你招呼我。', '那就好喔，我剛剛還怕大家太熱鬧，妳會覺得不自在。', '到了啦，聽你們唱歌還滿好聽的。', '真的嗎？妳這樣說我會有點不好意思欸。不過妳喜歡就好啦。', '本來有點怕插不上話，結果大家都滿好相處的。', '那就好喔，第一次來多少會有點陌生，我剛剛還怕妳不自在。', 0),
    makeChatRound('剛剛本來想問妳平常喜歡聽什麼歌，結果一直沒找到空檔，有點可惜欸。', '我最近聽的歌滿雜的，你呢？', '我也聽滿多的啦，有時候聽到喜歡的歌，就會忍不住一直重播。', '你可以推薦幾首給我啊。', '好啊，那我回去整理幾首給妳。希望妳會喜歡喔。', '你有沒有私藏歌單？先交出來。', '哈哈，這麼直接喔？好啦，那我得認真挑一下，不能隨便交差。', 3),
    makeChatRound('今天認識妳很開心喔，希望下次還有機會再聊。', '我也是，下次見面再聊。', '好啊，那就說定囉。妳今天也早點休息喔。', '下次不要只顧著忙，記得跟我聊天喔。', '哈哈，好啦，我會記得。下次見面一定找妳聊幾句。', '你這樣講，我會以為你在約我欸。', '欸？我不是那個意思啦，只是覺得跟妳聊天很舒服，想說下次還可以再聊。', -1),
  ],
  stone: [
    makeChatRound('今天坐的位置還舒服嗎？有沒有被地上的線材絆到？', '很舒服，謝謝你特地幫我挪椅子。', '那就好，剛剛看妳坐得還算自在。', '沒有啦，我有很小心，放心。', '那就好，練團室東西多，第一次來容易沒注意到。', '有啦，差點踩到一條線，幸好你提醒我。', '還好妳有注意到，不然器材弄壞了就麻煩了。', 0),
    makeChatRound('今天練到一半大家有點吵，希望沒有讓妳覺得太亂。', '不會啊，感覺你們平常就很熱鬧。', '哈哈，習慣就好，大家熟了都這樣。', '其實滿有趣的，尤其瑪莎一直吐槽。', '他真的很會講，不過有時候也滿有道理的。', '你們練團吵一點沒關係，我反而覺得有趣。', '那就好，下次妳可以再坐久一點，慢慢聽就會熟悉了。', 3),
    makeChatRound('下次妳如果再來，我可以幫妳留剛才那個位置。', '好啊，那就麻煩你了。', '沒問題，靠牆那邊比較不會被線擋到。', '不用特別留啦，我到時候自己找就好。', '好，妳來了再看，位置不夠我再想辦法。', '那你要是留了，我就不客氣了喔。', '當然啊，妳來就好，位置的事不用擔心。', 3),
  ],
  yanming: [
    makeChatRound('妳好，我是劉諺明。以後練團室有什麼問題，可以隨時來找我。', '好，謝謝諺明哥，有問題我再請教你。', '不會啦，第一次來不熟悉很正常，有需要再問我就好。', '那我就不客氣了，下次有不懂的地方再麻煩你。', '可以啊，妳儘管問，不用覺得不好意思。', '那我先記下來了，以後要是常常麻煩你，你可別嫌我煩喔。', '哈哈，不會啦。只要我在練團室，能幫上的我就幫忙。', 0),
    makeChatRound('今天器材都收好了，沒有東西落在練團室吧？', '應該沒有，我回去再檢查一下包包。', '好，第一次來容易忘東西。', '沒有啦，我今天只有帶飲料跟包包。', '哈哈，那就好，飲料記得不要放音箱旁邊。', '音箱真的不能放飲料嗎？我剛剛差點放上去。', '最好不要，液體進去容易出問題，放旁邊桌子就好。', 0),
    makeChatRound('妳在台大讀書應該很忙吧？有空也可以來聽他們練團。', '最近課還好，偶爾過去應該可以。', '好啊，時間先跟怪獸確認就好。', '有空再說，今天已經很謝謝你們了。', '不客氣，大家多個朋友也熱鬧。', '怪獸是不是常常翹課跑來練團？', '這個妳得自己問他，我不替他回答。', -1),
  ],
  youda: [
    makeChatRound('今天鼓聲沒有把妳嚇到吧？我看妳後來都跟著拍子點頭。', '沒有啦，還滿好聽的。', '那就好，我還怕自己打太大聲。', '有幾下真的滿大聲的，不過很過癮。', '哈哈，那我下次控制一下力道。', '你是不是故意打大聲，想讓我注意你？', '蛤？我只是照平常力道打啦，妳想太多了。', -1),
    makeChatRound('今天練到後面我真的快餓扁了，還好大家有去吃飯。', '你看起來真的很餓，菜一上來就開始夾。', '被妳發現了，我那時候已經沒力氣講話。', '下次記得先吃飽再練。', '這個建議很實用，我會記住。', '你剛剛真的吃超多，大家都快搶不過你了。', '哈哈，練完真的會餓，不好意思啦。', 3),
    makeChatRound('下次有機會再來聽啊，鼓組旁邊的位置視野最好。', '好啊，不過你不要打到我耳朵痛。', '我會注意啦，保證讓妳坐得安心。', '那我要先看看你下次練得怎麼樣。', '喔？還要考核我是不是？壓力來了。', '你下次要是打太大聲，我就坐到門外聽。', '那不行啦，門外哪聽得到鼓的低音？妳還是坐裡面啦。', -1),
  ],
}

const AFFECTION_CALL_THRESHOLD = 10

// Every first call has at least five interaction rounds. Each round offers exactly three replies.
const wenStrollCallScript: ChatRound[] = [
  makeChatRound('喂，妳到家了喔？我剛剛回去才想到，今天好像都沒問妳玩得開不開心。', '很開心啊，難得能逛那麼久。', '那就好，我看妳在唱片行待得滿久的。', '你怎麼現在才問？', '剛剛送妳到巷口時想問，結果又忘記了。', '你今天不是也玩得很開心嗎？', '還可以啦，反正不用趕著回去練團，時間就過得比較慢。', 3),
  makeChatRound('妳跟阿信聊音樂的時候，我站旁邊差點插不上話。', '你明明也有插話啊。', '我那是怕他一次介紹太多，妳會記不住。', '怎麼，你吃醋喔？', '蛤？妳不要亂講。我只是看妳聽得很認真，不好意思打斷啦。', '那你下次也推薦幾首給我。', '可以啊，不過我可能沒辦法像阿信那樣講得那麼仔細。', 3),
  makeChatRound('對了，剛剛走回去時說的那家麵店，妳是真的想去，還是只是隨口說說？', '真的想去啊，你要帶路。', '好，那我找一天把時間空出來。', '你是不是想約我吃飯？', '妳講得這麼直接喔……不過，約妳吃飯也沒什麼不好啦。', '我想去，但這次換我請你。', '妳上次才說要請我，這次又搶著付喔？好啦，先說好，不能臨時反悔。', 3),
  makeChatRound('妳剛剛說下次想聽我推薦歌，我有記著啦。只是先講好，我選的妳不准每首都嫌。', '我哪有那麼挑。', '最好是，妳上次還嫌我挑的歌太吵。', '那你要挑我真的會喜歡的啊。', '好啦，我會認真挑，不會隨便拿幾首敷衍妳。', '不然下次我們一起去找，這樣比較公平。', '也可以啊，省得妳又說我亂推薦。', 3),
  makeChatRound('好啦，今天先不吵妳了。回去把東西放好，別又一進門就把包包丟在地上。', '你怎麼連這個都要管？', '我哪有管，之前就看過妳這樣啊。', '知道啦，你也早點休息。', '嗯，明天還有事要忙，不能太晚睡。', '那你明天記得傳訊息給我。', '知道啦，妳不要一直提醒。', 3),
]
const wenHomeCallScript: ChatRound[] = [
  makeChatRound('喂，妳現在在忙嗎？我剛剛回去路上才想起來，妳今天說那堂課很難熬，是哪一堂啊？', '就是早上的那堂，老師講太快了。', '那妳筆記有沒有抄完？下次上課前記得先整理一下。', '你問這個幹嘛？', '沒什麼啦，剛剛走回去時想到，隨口問一下。', '你先說你今天有沒有回練團室？', '沒有啦，今天不是跟妳說了，大家都被老師留下來。', 3),
  makeChatRound('今天本來還想問妳，下次如果我有空，要不要一起去學校附近走走。', '你不是已經陪我走過了？', '是走過啦，但附近還有幾家店，妳不一定都知道。', '你是不是很閒？', '妳很會講欸，我是看時間啦，不是每天都有空。', '好啊，你有空再找我。', '那我記著，等時間確定再跟妳說。', 3),
  makeChatRound('那先這樣啦，妳今晚早點休息。明天如果課上到很晚，記得吃點東西再回去。', '知道啦，你也是。', '我會啦，妳先顧好自己。', '你也要記得吃飯，不准只顧練團。', '好啦，我知道，妳怎麼跟我媽一樣。', '那你明天會傳訊息給我嗎？', '會啦，想到就傳，不用一直提醒。', 3),
  makeChatRound('對了，妳剛剛說那堂課很難熬，我有點好奇，妳平常都怎麼讓自己撐過去？', '就靠下課鐘聲啊。', '哈哈，這個答案很實際欸。', '偶爾會找朋友抱怨一下就好了。', '那也不錯，至少不要什麼都悶在心裡。', '下次如果我又聽不懂，可以問你嗎？', '可以啊，妳有問題就傳訊息來。', 3),
  makeChatRound('我明天應該會回學校一趟，如果剛好遇到妳，再把那件事跟妳講完。', '什麼事？現在不能先講喔？', '現在講就沒有下次聊天的理由啦。', '你是不是故意賣關子？', '沒有啦，妳不要什麼都先懷疑我。', '那我等你自己來找我。', '好啦，我會記得。', 3),
]
const thresholdCallScripts: Record<RouteCharacterId, ChatRound[]> = {
  wen: wenStrollCallScript,
  masa: [
    makeChatRound('喂，妳現在有空喔？我剛剛突然想到一件事。', '你講啊，我有在聽。', '妳這次倒是沒有嫌我囉嗦。', '怎麼啦？是不是又想到什麼小時候的糗事？', '妳怎麼每次都先想到這個啦。', '你是不是想起以前那間雜貨店了？', '……有啦。剛剛突然想到，不知道它現在還在不在。', 3),
    makeChatRound('以前我們放學常常繞過去買東西，妳那時候每次都挑超久。', '我哪有，我明明很快就決定了。', '最好是，站在冰櫃前面半天的人不是妳喔？', '那是因為你一直在旁邊催。', '我是在提醒妳，不然老闆都要關門了。', '你是不是其實都記得啊？', '廢話，妳那麼多奇怪習慣，我哪有那麼容易忘記。', 3),
    makeChatRound('改天有空要不要一起去看看？不一定還在啦，就當散步。', '好啊，我也想知道現在變成什麼樣子了。', '那就說好了，時間再約。', '可以，不過你要請我吃以前那家冰。', '妳怎麼什麼都記得要吃？好啦，如果還有開就請妳。', '你先把時間空出來，我可不想又等你消息等好多年。', '欸，這個就不要拿出來講了啦……我知道啦。', -1),
    makeChatRound('不過講真的，今天突然想到以前那些事，還滿奇妙的。以前明明覺得每天都一樣，現在想起來卻記得很清楚。', '你居然也會講這麼感性的話喔？', '妳不要把我講得好像都沒良心一樣。', '我也有點想念以前的日子。', '嗯，有些事情真的隔很久才會想起來。', '那我們以後多製造一點新的回憶。', '妳這句話倒是講得滿好的。', 3),
    makeChatRound('好了啦，時間也不早了。下次真的要去那附近，記得先跟我說。', '知道啦，不會又把你弄丟。', '最好是，妳才是比較容易迷路的那個。', '那你要負責帶路。', '可以啊，這種事我還做得到。', '晚安啦，蔡昇晏。', '晚安啦，妳也早點睡。', 3),
  ],
  ashin: [
    makeChatRound('喂？是我，阿信。現在講電話方便嗎？我剛剛把今天提到的歌名抄下來了。', '方便啊，你整理得也太快了吧。', '哈哈，怕我等一下又忘記，所以先寫下來馁。', '你可以慢慢整理，不用這麼趕。', '沒關係啦，我本來就想把這幾首推薦給妳。', '你是不是還有私藏的歌沒有交出來？', '被妳發現了喔？那我下次再挑幾首比較特別的給妳。', 3),
    makeChatRound('今天在唱片行，妳聽到喜歡的歌時眼睛都亮起來了。', '因為你介紹得很仔細啊，我真的有聽進去。', '那太好了，我還怕自己講太多會讓妳覺得無聊馁。', '你講音樂的樣子很有趣，我不會覺得無聊。', '真的嗎？那我下次可以再跟妳分享一些。', '那下次換你唱給我聽，好不好？', '欸？突然變成這個要求喔……好啦，有機會再說。', 3),
    makeChatRound('今天認識妳很開心。希望下次見面，不會又忙到沒時間好好聊天。', '我也很開心，下次再一起聊歌。', '好啊，妳到時候記得告訴我聽完的感想馁。', '你不用特地找話題，想到什麼都可以跟我說。', '謝謝妳這樣講，跟妳聊天真的滿舒服的。', '那你下次要主動找我，不可以只說有機會。', '哈哈，好，我會記得的。那妳也要記得回我訊息喔。', 3),
    makeChatRound('我回去以後又翻了一下剛才記下來的歌名，發現還有一首很想推薦給妳。', '你真的很認真欸，連這個都記得。', '因為怕漏掉啊，既然答應妳了就要好好整理馁。', '那你下次要告訴我為什麼喜歡這首。', '好啊，我可以慢慢講給妳聽。', '你不要一次推薦太多，我會選擇困難。', '哈哈，那我幫妳分成幾次，不用急。', 3),
    makeChatRound('如果妳哪天在學校聽到一首喜歡的歌，也可以記下來告訴我。', '好啊，說不定你也會喜歡。', '那我很期待喔。', '如果我記不得歌名怎麼辦？', '沒關係，哼一小段也可以，我再幫妳猜猜看。', '那你可要猜對，不然我會笑你。', '欸，這個要求很嚴格欸。', 3),
  ],
  stone: [
    makeChatRound('喂，妳到家了嗎？今天第一次來練團室，回去的路還順利吧？', '到了，謝謝你關心。', '那就好，第一次去不熟悉，總怕妳找不到路。', '到了啦，今天謝謝你幫我留位置。', '不客氣，那個位置比較安全，也不會擋到大家。', '你是不是一直有注意我坐得舒不舒服？', '有稍微看一下，畢竟妳是第一次來。', 3),
    makeChatRound('剛剛整理器材時，看到妳坐的那張椅子還在原位。', '你們每天都要整理這麼多東西嗎？', '差不多，器材多，收好才不會出問題。', '那你今天也辛苦了，記得早點休息。', '謝謝妳，大家一起收其實很快。', '下次我去的時候，可以再坐那個位置嗎？', '當然可以，我幫妳留著就好。', 3),
    makeChatRound('下次如果還想來聽練團，提前跟我說一聲就好。', '好啊，那就麻煩你了。', '不麻煩，妳來之前跟我說就好。', '你也可以直接跟我說哪天比較方便。', '好，我們再看看大家的時間。', '那你要記得幫我留位置喔，我會去的。', '放心，我記得。', 3),
    makeChatRound('妳今天第一次來，還願意坐在旁邊聽我們練這麼久，真的謝謝妳。', '我覺得很好聽啊，沒有你想的那麼無聊。', '那就好，我還怕妳只是不好意思先走。', '下次我想再聽你們練另一首歌。', '可以啊，我們最近也在整理新的段落。', '那你要先跟我說哪天比較精彩。', '好，我幫妳留意一下。', 3),
    makeChatRound('回去如果覺得耳朵有點累，就先休息一下。練團室裡聲音比較大，第一次可能要適應。', '我沒事啦，你不要太擔心。', '好，那我放心了。', '你也忙了一整天，早點休息。', '謝謝妳，妳也是。', '晚安，石頭。', '晚安，路上小心的話我剛剛已經說過了，那就祝妳有個好夢。', 3),
  ],
  yanming: [
    makeChatRound('喂，妳好，我是諺明。剛剛回去路上還順利嗎？', '很順利，謝謝諺明哥。', '那就好，第一次過來，路線可能還不熟。', '今天真的麻煩你照顧了。', '不會，大家都很歡迎妳來。', '下次我還可以直接去找你問問題嗎？', '當然可以，先傳個訊息確認我在不在就好。', 3),
    makeChatRound('我剛剛收拾練團室，想到妳第一次看到那麼多器材，應該滿新鮮的。', '真的，很多東西我都叫不出名字。', '沒關係，慢慢認識就好，不用一次記住。', '你下次可以教我分辨那些器材嗎？', '可以啊，我有空就帶妳看一遍。', '那我下次可能會問很多問題，你不要嫌我煩喔。', '哈哈，不會，願意問就很好。', 3),
    makeChatRound('今天大家都玩得滿開心的。妳如果還想來，先跟怪獸約好時間就行。', '好，我會先跟他說。', '嗯，這樣大家也比較好安排。', '謝謝你今天招呼我，下次見。', '不客氣，回去早點休息。', '那你也要記得休息，不要只顧著照顧他們。', '哈哈，知道了，謝謝妳提醒。', 3),
    makeChatRound('今天看妳第一次接觸那些器材，還願意慢慢學，真的很不錯。', '我只是覺得很新鮮，想多了解一點。', '願意了解就很好，不需要急著一次學會。', '下次如果我又弄錯，你要再提醒我喔。', '沒問題，我會在旁邊看著。', '你是不是平常也都這樣照顧大家？', '工作上該注意的地方還是要注意，習慣了就好。', 3),
    makeChatRound('之後如果有時間，妳也可以來看看他們練團，不一定每次都要幫忙。', '好啊，我也想再聽一次。', '那就先這樣說定，時間再確認。', '你不要每次都把事情安排得這麼周到，會讓我不好意思。', '哈哈，這只是順手，妳不用放在心上。', '那我下次來之前先傳訊息給你。', '好，這樣我也比較好安排。', 3),
  ],
}

const monthVisitCallScripts: Record<RouteCharacterId, ChatRound[]> = {
  wen: [
    makeChatRound('喂，妳到家了喔？今天突然跑來球場，怎麼沒先跟我說一聲？', '想給你一個驚喜啊。', '驚喜是有啦，差點以為自己看錯人。', '我怕先說了，你又叫我不要過去。', '我哪有那麼不講理？……不過妳今天來得剛好。', '就剛好路過嘛。', '妳最好是路過，福利社跟球場根本不同方向欸。', 3),
    makeChatRound('妳坐在樹蔭那邊等我的時候，有沒有很無聊？', '不會啊，看你打球還滿有趣的。', '真的喔？那我下次要打好一點。', '有一點，所以你要補償我。', '蛤？妳不是還看得滿認真的嗎？', '我都特地等你了，當然要收點利息。', '妳很會算欸……好啦，下次請妳吃東西。', 3),
    makeChatRound('那兩瓶水我後來都喝完了，妳還真的特地買了兩瓶喔。', '不然你以為我拿兩瓶是要自己喝嗎？', '我哪知道，妳平常就很會找理由。', '有一瓶本來就是給你的啊。', '嗯，我知道啦。剛好打完真的很渴。', '那你有沒有覺得我很貼心？', '有啦，有啦。妳不要等我講第三次。', 3),
    makeChatRound('剛剛說要請妳吃東西不是隨便講講，妳有沒有想好要吃什麼？', '你決定啊，我相信你的眼光。', '突然把決定權丟給我喔？那我可要好好想一下。', '我要吃你平常最喜歡的那家。', '好啊，那家我知道，走過去也不遠。', '我想吃點冰的，打球的人應該不會反對吧？', '不反對啦，妳不要吃到肚子痛就好。', 3),
    makeChatRound('下次如果我又去球場，妳要不要再過來看？不用特地送水也沒關係啦。', '那我要看你表現，打得好才考慮。', '欸，還要先考核喔？壓力很大欸。', '可以啊，不過你要先告訴我時間。', '好啦，有確定我再跟妳說。', '那我就當你已經邀請我了。', '妳不要自己先答應喔……算了，來就來啦。', 3),
  ],
  ashin: [
    makeChatRound('喂，妳到家了嗎？今天帶妳走校園，後來才發現已經走到這麼晚了。', '到了喔，今天走得很開心。', '那就好，我還怕妳會覺得我一直帶妳繞路馁。', '你不是也說時間過得很快嗎？', '對啊，跟妳聊天很自在，一下子就忘記看時間了。', '下次可以再帶我走別的地方嗎？', '當然可以啊，校園裡還有幾個地方我想介紹給妳。', 3),
    makeChatRound('剛剛在圖書館旁邊坐了一會兒，風一直把講義吹起來，還好最後沒有飛走。', '我看你一直用手壓著，差點想幫你拿。', '哈哈，謝謝妳馁，我那時候還怕紙真的被吹走。', '你是不是常常帶著講義到處跑？', '有時候要去拿資料，帶在身上比較方便。', '下次我幫你拿一半好了。', '不用啦，妳自己也有東西要拿。一起走就好。', 3),
    makeChatRound('今天聊到讀書的習慣，才發現每個人喜歡的地方真的不太一樣。', '對啊，我有時候也會看心情換位置。', '這樣很好啊，找到自己舒服的方式比較重要馁。', '你平常都喜歡坐哪裡？', '我滿喜歡靠窗的，偶爾可以看看外面。', '那下次我們可以一起找個靠窗的位置。', '好啊，如果剛好有空位，我幫妳留意。', 3),
    makeChatRound('妳下次如果再來實踐，我可以帶妳去看看今天沒走到的地方。', '好啊，我還想知道你平常都在哪裡上課。', '可以啊，順便介紹幾個我常去的地方馁。', '那你要記得，不可以又走到天黑才發現。', '哈哈，好，我會看時間，不讓妳等車太晚。', '我覺得今天這樣剛剛好，不用趕。', '我也覺得。慢慢走、慢慢聊，其實滿舒服的。', 3),
    makeChatRound('今天真的謝謝妳來。原本只是想帶妳看看校園，沒想到能聊這麼多。', '我也要謝謝你，今天很像多認識了你一點。', '聽妳這樣說，我很開心馁。', '下次換我帶你去台大走走。', '好啊，我也想看看妳平常上課的地方。', '那就說好了，不可以只是客氣喔。', '不會啦，我會期待的。到家了就好好休息。', 3),
  ],
  masa: [
    makeChatRound('喂，妳到家沒？今天我去妳家，阿姨有沒有又翻相簿出來笑妳？', '有啊，你剛剛不是也笑得很開心。', '那是因為照片真的很好笑欸。', '我看你自己也很怕被翻到以前的照片。', '廢話，誰小時候沒有幾張很蠢的照片？', '下次我先把照片挑好，再邀請你來。', '妳最好是挑好，搞不好妳自己的更多。', 3),
    makeChatRound('今天午飯吃得滿開心的，阿姨還是跟以前一樣，一直怕我們吃不夠。', '她就是怕客人餓到啊。', '我看得出來，菜一直往我碗裡放。', '你今天有沒有吃飽？', '有啦，妳不要把我當成小朋友。', '那你下次還要來吃嗎？', '如果有機會當然要啊，阿姨煮的東西不錯。', 3),
    makeChatRound('回去路上經過那間雜貨店，我才發現招牌換了，可是旁邊那條巷子還是老樣子。', '我小時候常常從那裡跑過去。', '我記得啊，妳每次都走得比我快。', '明明是你一直在後面拖拖拉拉。', '妳現在還是很會把事情推給我欸。', '那下次我們再走一次以前常走的路。', '好啦，反正我也想看看附近變成什麼樣子。', 3),
    makeChatRound('妳爸媽今天還記得我，老實說我有點意外，也有點不好意思。', '他們怎麼可能忘記你？', '也是啦，以前常常跑去妳家，阿姨應該被我吵過不少次。', '你今天一開始明明很緊張。', '妳不要再提了啦，我那是基本禮貌。', '下次就不用那麼緊張了，當自己家就好。', '妳講得倒是很輕鬆，妳爸媽又不是我爸媽。', 3),
    makeChatRound('下次有空我再過去看看叔叔阿姨，妳不要又臨時把我抓回家就好。', '那我要先問過你，這樣可以嗎？', '這還差不多，至少讓我有時間準備。', '不然你也可以主動說想來啊。', '妳這樣講，我反而不知道怎麼接了。', '那就約好了，下一次換你先開口。', '好啦，我記著。妳也別忘了。', 3),
  ],
  stone: [
    makeChatRound('妳到家了嗎？今天特地帶便當過來，自己回去有沒有順利？', '到了，路上很順利。', '那就好，我剛才還怕妳回去太趕。', '你有吃飽嗎？休息時間是不是很短？', '有吃飽，今天有妳帶來的便當，時間也剛好。', '那就好，我還怕耽誤你上課。', '不會，剛好可以坐下來吃一頓。', 3),
    makeChatRound('剛才在騎樓吃飯時，妳一直說不用把菜夾給妳，結果最後還是吃了不少。', '因為你一直把好吃的推過來啊。', '我只是覺得妳也應該吃一點。', '你是不是很習慣照顧別人？', '可能吧，看到有人需要，就會順手幫一下。', '那你自己呢？也要記得有人會關心你。', '謝謝妳，我會記得的。', 3),
    makeChatRound('今天休息時間不長，還好妳沒有一直站在外面等。', '你不是有叫我進去坐嗎？', '嗯，那邊比較涼，也不會被人來人往撞到。', '你每次都先想到這些小地方。', '只是覺得能先安排好，就不要讓妳不方便。', '下次我來之前先跟你說，你就不用擔心了。', '好啊，這樣我也能先把時間安排好。', 3),
    makeChatRound('下次如果妳又想帶東西過來，不用特地挑我休息時間，先傳訊息就好。', '我怕你忙，才想說趁午休拿給你。', '我知道妳是好意，只是也要顧慮妳自己。', '那下次換你來找我吃飯。', '好啊，如果時間配得上，我很樂意。', '你不要每次都只顧著提醒我。', '哈哈，可能是習慣了。妳也可以提醒我。', 3),
    makeChatRound('今天真的謝謝妳。不是只有便當，妳願意特地跑一趟，我都記得。', '不用這麼客氣啦，我也很開心看到你。', '那就好，我也希望妳今天沒有白跑。', '下次見面再跟你聊久一點。', '好啊，到時候不用趕著回去上課。', '你要記得好好吃飯，不要又忘記。', '好，我答應妳。妳也一樣。', 3),
  ],
  yanming: [
    makeChatRound('妳回到家了嗎？今天一起整理器材，手有沒有覺得痠？', '有一點，不過還好啦。', '那回去先休息一下，今天辛苦妳了。', '你才忙了一整個上午吧？', '習慣了，整理完看到東西都歸位，反而覺得很踏實。', '那你有沒有覺得我今天幫上忙？', '當然有，妳做得很仔細。', 3),
    makeChatRound('妳最後整理的那條線，我後來又檢查了一次，收得很整齊。', '真的嗎？我還怕自己繞錯方向。', '沒有，接頭和線身都沒有折到。', '還好你有先教我，不然我一定弄得亂七八糟。', '第一次做能這樣已經很好了。', '下次我可以自己整理一整箱嗎？', '可以啊，到時候我在旁邊看著就好。', 3),
    makeChatRound('清單收進抽屜之後，我才發現今天比平常早一點整理完。', '所以我今天算是提高效率的幫手？', '哈哈，可以這麼說。', '那下次要不要繼續聘用我？', '如果妳願意來，我當然歡迎。', '那你要準備供餐喔。', '這個我記得，不能讓工讀生餓肚子。', 3),
    makeChatRound('今天原本只是想把器材整理好，沒想到還能有人陪著一起做，感覺不太一樣。', '有人一起做事情，時間真的過得比較快。', '對啊，而且妳也很願意學。', '你平常都自己一個人整理嗎？', '有時候大家會一起幫忙，不過有些細節還是得自己確認。', '下次我來的時候，你可以再教我別的事情。', '可以，慢慢來，不用一次學完。', 3),
    makeChatRound('下次妳如果還想來練團室，先傳訊息給我，我幫妳看看當天的安排。', '好啊，謝謝諺明哥。', '不客氣，妳來坐坐也很好。', '那我下次要帶飲料來，不能一直讓你招待。', '不用特地準備，不過妳想喝什麼可以先告訴我。', '那就說好了，下次見。', '好，路上小心，到家記得休息。', 3),
  ],
}

const freeChatCallOpeners: Record<RouteCharacterId, ChatRound> = {
  wen: makeChatRound('喂，剛剛跟妳聊完，我才想到還有件事想問妳。', '你怎麼不在訊息裡問？', '有些話用電話講比較快啦。', '你又想到什麼了？', '沒什麼大事，就是突然想到。', '你是不是還有話沒跟我說？', '妳很會猜欸……等一下再慢慢講。', 2),
  masa: makeChatRound('欸，剛剛聊完我才發現，有些話打字真的講不清楚。', '那你現在可以講清楚啊。', '妳很急欸，我又沒有要跑掉。', '你最好不要又講一半就不說了。', '我哪有，妳不要先把我想得那麼差。', '好啦，我現在有空，慢慢講。', '這還差不多。', 2),
  ashin: makeChatRound('喂，是我阿信。剛剛聊到音樂，我又想到一首歌想跟妳分享馁。', '你是不是腦袋裡一直都裝著歌？', '哈哈，好像有一點欸。', '那你先說歌名，我去找來聽。', '好啊，我等一下慢慢講給妳聽。', '你先不要一次推薦太多，我會記不住。', '那我分幾次介紹，不用急馁。', 3),
  stone: makeChatRound('喂，剛剛跟妳聊完，我還想確認一件小事。', '怎麼了？', '沒有急事，只是怕剛才有些話沒說清楚。', '你可以直接問啊。', '好，那我就不拐彎了。', '你是不是又在擔心我？', '有一點，確認一下比較放心。', 2),
  yanming: makeChatRound('喂，剛才聊到學校和時間安排，我又想到一件事想提醒妳。', '你說，我有在聽。', '不是什麼大事，記得忙的時候也要安排休息。', '你怎麼比我還像老師？', '哈哈，可能是習慣了。', '好啦，我會記得，你也要休息。', '謝謝妳提醒，我會的。', 2),
}

// The free-chat conversation with Wen changes to reflect the afternoon route the player actually took.
const wenStrollFreeTimeChats: ChatRound[] = [
  makeChatRound('妳回家之後有沒有把那張明信片拿出來看？我剛剛想起妳在門口挑了好久。', '有啊，放在書桌上了。', '那就好，我還以為妳會一路收到包包最底下。', '你不是說很像我嗎？我還是不知道哪裡像。', '就感覺啊，妳挑東西的眼光本來就滿有妳自己的樣子。', '你是不是其實也想要一張？我可以分你。', '蛤？那是妳挑的欸，自己留著啦。', 3),
  makeChatRound('妳在書店翻那本攝影雜誌翻很久欸，平常也喜歡看照片喔？', '偶爾啊，看到好看的照片會想多看一下。', '嗯，我看妳剛剛是真的滿認真的。', '我比較喜歡裡面拍街道的那幾張，很有生活感。', '我也覺得那幾張不錯，不用特別擺拍就很好看。', '下次你陪我去拍照好不好？', '妳先把相機拿穩再說啦。好啦，有空再帶妳去。', 3),
  makeChatRound('妳最後挑的那張明信片，上面那個圖案我覺得滿適合妳的。', '你是不是很會觀察別人啊？', '哪有，我只是剛好看到。', '那你說說看，哪裡適合？', '就……看起來很自在啊。妳不要一直考我。', '你是不是早就想好要送我一張？', '沒有啦，是妳自己挑的。不要亂加戲。', 3),
  makeChatRound('剛剛走回妳家那段路，好像一下子就到了。', '因為你一路都在跟我講話啊。', '我哪有一直講，是妳也有回我。', '我覺得那段路還滿舒服的。', '嗯，走慢一點也沒關係，反正又不趕時間。', '那下次你還要送我回家。', '妳把我當專屬接送喔？……好啦，看妳有沒有迷路。', 3),
  makeChatRound('對了，妳今天是不是還有話想問我？在書店的時候好像講到一半。', '沒有啦，今天已經聊很多了。', '好，那妳想到再問。', '有啊，不過我想留到下次見面再問。', '妳還賣關子喔？好啦，我等妳問。', '我只是想找理由再跟你見面。', '……妳今天講話真的很直接欸。好啦，下次見面再說。', 3),
]
const wenHomeFreeTimeChats: ChatRound[] = [
  makeChatRound('妳回到家了喔？剛剛走到巷口時，妳包包肩帶一直滑下來。', '有啦，現在已經坐下來了。', '那就好，今天走了一段路，回去就休息一下。', '你剛剛不是已經幫我拉好了嗎？還一直記得喔。', '我只是剛好看到啦，妳不要想太多。', '你是不是因為不放心我，才特地打電話……啊不是，傳訊息來？', '妳打字還打錯喔？我只是確認妳到家了沒。', 3),
  makeChatRound('下午妳說今天差不多了，我沒有覺得掃興啦。妳不要回家又自己亂想。', '我沒有亂想，只是今天真的有點累。', '知道啦，所以我才叫妳早點休息。', '我知道你沒有不開心，謝謝你還陪我走回家。', '順路而已啦。妳一個人走那段路我也不放心。', '其實如果你想逛，我也可以再陪你一下。', '妳今天都說要回家了，哪有叫妳硬撐的道理。下次再說啦。', 3),
  makeChatRound('剛剛走到妳家附近，妳說那家麵店好像不錯。', '對啊，我一直想找時間去吃。', '那下次帶妳去，應該不會讓妳失望。', '可以啊，不過這次換我請你。', '妳不是說過要請？我有記得喔。', '你要先答應，不准臨時說練團有事。', '哈哈，好啦，我會先把時間留起來。', 3),
  makeChatRound('妳進門前有回頭看一下，我還以為妳忘了拿東西。', '我只是想看看你有沒有走啦。', '我有看到，妳快進去啦，外面有點涼。', '你不是說我進去你才走？我有確認啊。', '哈哈，妳還真的有在看喔。', '那你有沒有等到我關門才離開？', '有啦，確認妳進去了我才走。這樣可以了吧？', 3),
  makeChatRound('今天還是滿開心的。下次有空再一起吃點東西，妳不要又說太晚。', '好啊，下次我會先把時間空出來。', '那就說好了，時間再約。', '下次換我找地方，你只要負責出現。', '好啦，交給妳安排，不過不要挑太遠。', '你要是再送我回家，我就考慮一下。', '妳還談條件喔？……好啦，這個條件我可以考慮。', 3),
]

const ashinAfternoonFreeTimeChats: ChatRound[] = [
  makeChatRound('妳回到家了嗎？今天在唱片行看妳翻那幾盒卡帶，我後來才想到，還有一張也滿適合妳的。剛剛沒來得及拿給妳看馁。', '哪一張呀？你先告訴我，我下次去找。', '我回頭想一下是哪張，再把名字記給妳。', '你怎麼知道我會喜歡？', '哈哈，其實也不敢確定啦，只是看妳剛剛聽得很認真，想說妳可能會喜歡。', '那你先幫我留著，等下次見面再介紹給我。', '好啊，那我先記著。下次見面再慢慢講，今天真的一下就過去了馁。', 3),
  makeChatRound('我剛剛想起來，妳在唱片行問我不知道該從哪一首開始聽。妳平常聽歌比較注意旋律，還是歌詞？', '旋律吧，第一耳聽起來喜歡就會一直聽。', '我也是欸，有時候旋律先留下來，才會慢慢去看歌詞。', '我比較在意歌詞，會想知道他到底在唱什麼。', '那妳聽歌應該會聽得很仔細喔，連一些小地方都會注意到。', '看心情耶。不過如果是你推薦的，我會認真聽。', '哈哈，這樣我壓力很大欸。那我下次要挑好一點的給妳馁。', 3),
  makeChatRound('今天妳在架子前面看曲目的時候，我本來想多拿幾張給妳比較，後來又怕一次講太多，妳反而不知道怎麼選。', '不會啊，我其實很喜歡聽你慢慢介紹。', '真的喔？那我下次可以再多講一點，不用怕妳嫌我囉嗦。', '你剛剛已經講得很清楚了，我回去會慢慢聽。', '那就好，聽歌不用急，喜歡哪一首就先從哪一首開始。', '你下次可以直接陪我逛，不准只站旁邊看。', '哈哈，好啊。妳要是願意聽，我可以陪妳慢慢挑馁。', 3),
  makeChatRound('對了，今天買的吉他弦我有帶回家收好了。差點忘記自己原本只是出門買這個，結果在唱片行待了好一陣子。', '還好你有想起來，不然明天練團怎麼辦？', '對啊，還好最後有買到，不然又要跟別人借了。', '你是不是常常買完東西就忘記自己拿了什麼？', '偶爾啦，今天是剛好聊得太開心，才差點忘記時間。', '所以今天是我害你忘記正事囉？', '沒有啦，怎麼會怪妳。今天這樣剛剛好啊。', 3),
  makeChatRound('今天能在唱片行多聊一下，我滿開心的。昨天在練團室大家都在忙，沒什麼機會好好聊音樂。妳聽完那些歌再跟我說感想，好不好？', '好啊，我聽完一定跟你分享。', '那我等妳的心得喔。就算不喜歡也可以直接跟我說馁。', '如果我有聽不懂的地方，可以再問你嗎？', '當然可以啊，妳想問什麼都可以，不用不好意思。', '那下次見面你要再推薦幾首，今天還沒聽夠。', '哈哈，好啊。下次再找時間慢慢聊，妳不要一次考我太多題就好。', 3),
]

const freeTimeChats: Record<RouteCharacterId, ChatRound[]> = {
  // Wen has separate afternoon-route scripts above; this entry is only a safe fallback.
  wen: wenHomeFreeTimeChats,
  masa: [
    makeChatRound('妳今天有沒有好好上課？昨天吃飯的時候大家一直把話題繞到以前，我都還沒問妳最近過得怎麼樣。', '還不錯啊，就是最近課業有點忙。', '大學生聽起來也沒有比較輕鬆嘛。', '你不是也要顧學校跟練團？先管好自己吧。', '我有在管啦，妳不要一開口就唸我。', '你是想知道我這幾年過得怎麼樣嗎？', '不然咧？都隔這麼久才又碰到，總要問一下吧。', 3),
    makeChatRound('昨天吃飯的時候，大家一直問我們小時候的事。妳有沒有覺得很尷尬？', '還好啊，反而覺得滿好笑的。', '我就知道妳不會介意，妳以前臉皮就很厚。', '有一點啦，突然被大家問，我都不知道怎麼回答。', '那我下次先幫妳擋一下，免得他們又一直問。', '你自己明明也講得很起勁，還敢說要幫我擋？', '我那是在幫大家補充好不好，妳不要亂講。', 3),
    makeChatRound('今天跟石頭被老師留下來念了一下，現在想想還是滿倒楣的。', '誰叫你們要翹課，被抓到也不意外吧。', '妳現在是站在老師那邊喔？', '至少老師沒有真的把你們怎麼樣吧？', '就念了幾句而已啦，沒事了。', '你下次還敢不敢？我看你根本學不乖。', '妳很煩欸，這種事哪有下次啦。', -1),
    makeChatRound('對了，昨天重新見到妳，我本來有好多話想問，結果一下子就被大家打斷了。', '那你現在可以問啊，我又沒有不讓你問。', '好啊，那我就不客氣了。', '你先想好要問什麼，不要又問一半忘記。', '我哪有那麼誇張，妳才是想到什麼就講什麼。', '你是不是其實也有點緊張？', '……有一點啦。很久沒見了，突然不知道怎麼開口也正常吧。', 3),
    makeChatRound('有空再找時間聊吧。這次不要又隔那麼久，連妳最近喜歡什麼都不知道。', '好啊，那你要記得主動找我。', '知道啦，我會傳訊息給妳。', '你也可以跟我說說你最近在忙什麼。', '好啊，等我把學校跟練團的事弄完再慢慢講。', '那下次見面你請客，我們把昨天沒聊完的補回來。', '妳真的很會安排欸……好啦，找一天再說。', 3),
  ],
  ashin: ashinAfternoonFreeTimeChats,
  stone: [
    makeChatRound('妳下午還特地傳訊息問我，謝謝妳。今天被老師留下來只是挨了幾句念，沒有什麼大事。', '沒事就好，我只是有點擔心你們。', '謝謝妳，真的不用擔心啦。', '你跟瑪莎下次還是小心一點，不要再被抓了。', '哈哈，我會記得的。今天確實是我們不對。', '你們兩個被留下來，應該等很久吧？', '還好啦，主要是聽老師講了幾句，後來就回去了。', 3),
    makeChatRound('昨天妳坐在牆邊那個位置，會不會覺得離器材太近？我後來想想，第一次來可能不太熟悉。', '不會啊，你幫我挪的位置剛剛好。', '那就好，我當時只是怕妳走動時會踩到線。', '其實我覺得坐那裡看得很清楚。', '嗯，那個角度還不錯，也比較不會擋到大家。', '你是不是有偷偷注意我有沒有坐得不舒服？', '有稍微看一下啦，畢竟妳是第一次來。', 3),
    makeChatRound('昨天練團的聲音會不會太大？我們有時候一練起來，就很容易忘記旁邊還有人。', '不會啊，我覺得現場聽很有感覺。', '那就好，還怕妳第一次來會不習慣。', '有幾段真的滿大聲的，不過我沒有被嚇到。', '哈哈，那妳適應得比我想像中快。', '下次我還想坐近一點，看你們怎麼彈。', '可以啊，不過要先找個安全的位置，別被線絆到。', 3),
    makeChatRound('昨天看到妳和瑪莎聊以前的事，感覺你們真的認識很久了。', '對啊，小時候就認識了，只是後來失去聯絡。', '難怪他昨天一直想把以前的事情講給大家聽。', '他嘴巴還是跟以前一樣，完全停不下來。', '哈哈，這點我倒是看得出來。', '你們是不是也常常被他吐槽？', '滿常的啦，不過大家都習慣了，他其實很熱心。', 3),
    makeChatRound('如果妳下次還想來聽練團，可以先跟怪獸說一聲。到時候我再幫妳看看坐哪裡比較方便。', '好啊，那就麻煩你了。', '不麻煩，妳來之前先說一聲就好。', '我想再聽一次昨天那段吉他，真的滿好聽的。', '哈哈，好啊，下次練到那段再讓妳聽。', '那我下次要坐你旁邊，可以嗎？', '可以啊，只要不影響大家走動就好。', 3),
  ],
  yanming: [
    makeChatRound('昨天第一次來練團室，還習慣嗎？那裡跟一般教室不太一樣，第一次進去可能會覺得有點亂。', '還好啊，大家都很照顧我。', '那就好，大家練起來比較投入，平常其實都滿好相處的。', '一開始有點不知所措，不過後來就習慣了。', '第一次來都這樣，慢慢熟悉就好。', '我覺得很新鮮，下次還想再去看看。', '好啊，歡迎妳來，記得先跟怪獸確認時間。', 3),
    makeChatRound('昨天妳坐的位置旁邊有幾條導線，我一直提醒大家不要亂踩。希望沒有讓妳覺得我太囉嗦。', '不會啊，你提醒得很對，我差點就踩到了。', '那就好，器材和線材都不便宜，小心一點比較好。', '我反而覺得你很細心，什麼都先安排好了。', '哈哈，這是工作嘛，習慣了。', '下次我去的時候，你再教我怎麼分辨那些器材好不好？', '可以啊，有空我再慢慢跟妳介紹，不用一次記住。', 3),
    makeChatRound('怪獸帶妳來練團室，應該讓妳看到他平常待的地方了吧？他平常練團時還算認真嗎？', '很認真啊，感覺一進去就完全不一樣了。', '他對吉他和音樂一直都滿投入的。', '認真是認真，不過偶爾也會被大家吐槽。', '哈哈，這個我倒是不意外，大家在一起就是這樣。', '你是不是常常要幫他們收拾善後？', '偶爾啦，不過他們也不是故意的，年輕人嘛。', 3),
    makeChatRound('妳在台大讀書，最近課業會不會很忙？大學的時間安排跟高中不太一樣吧。', '還可以，就是有時候報告會比較多。', '那要記得安排時間，別把自己弄得太累。', '有時候會忙到忘記吃飯，不過還應付得來。', '這樣可不行，忙也要記得吃東西。', '你以前念書的時候也是這麼忙嗎？', '每個時期都有忙的事啦，慢慢安排就好。', 3),
    makeChatRound('以後如果還想來練團室，先跟怪獸約好時間就好。場地有時候會有人預約，我也比較好幫你們安排。', '好，我會先跟他說，謝謝諺明哥。', '不客氣，妳有需要再傳訊息來就好。', '如果我想帶朋友一起去，也可以嗎？', '可以啊，不過先說一聲，人數和時間都要安排。', '那下次我來之前先問你，不讓你臨時忙不過來。', '哈哈，這樣最好，大家都方便。', 3),
  ],
}
const monthLaterIntroBlocks: StoryBlock[] = [
  { kind: 'narration', text: '一個月的時間，就這樣在課業、練團和日常的往來中過去了。' },
  { kind: 'narration', text: '這段時間，你和他們漸漸熟悉起來。有時候會在學校碰見，有時候收到幾條不經意的簡訊，偶爾也會約著一起吃飯。原本有些生疏的關係，在一次次見面和聊天中慢慢變得自然。' },
  { kind: 'narration', text: '溫尚翊還是一樣，嘴上不饒人，卻總會在一些小事上照顧你。阿信偶爾和你聊音樂，瑪莎依舊很會吐槽，石頭總是溫柔細心，諺明則是那個讓人很安心的存在。' },
  { kind: 'narration', text: '今天難得沒有課。看著空出來的一整天，你突然有點想念他們。' },
]

const monthVisitRoutes: Record<RouteCharacterId, MonthVisitRoute> = {
  wen: {
    label: '溫尚翊',
    subtitle: '台大籃球場・帶水去找他',
    location: '台灣大學・籃球場',
    title: '球場邊的那瓶水',
    kicker: '上午・台大校園',
    blocks: [
      { kind: 'narration', text: '你在福利社買了兩瓶冰水，循著籃球場傳來的聲音走過去。球一下下撞上地面，鞋底擦過球場，幾個人的笑鬧聲混在一起，遠遠就聽得見。' },
      { kind: 'narration', text: '你很快在人群裡找到溫尚翊。他接到傳球，沒有急著出手，只把球往身側一帶，肩膀微微晃了一下。防守的人才剛跟著偏過去，他已經從另一側切入，兩步跨進禁區，起跳時手腕輕輕一挑，球擦過籃板落進框裡。' },
      { kind: 'narration', text: '下一球回到他手上時，他本來還在看場上的位置，視線掃過場邊的瞬間，卻忽然停了一下。' },
      { kind: 'narration', text: '他看見站在入口的你，原本還繃著的神情一下子鬆開，眼睛像被陽光晃亮了一樣，連嘴角都跟著揚起來，亮晶晶的，像隻突然發現主人的小狗。' },
      { kind: 'narration', text: '他朝隊友喊了聲「等一下」，把球交給旁邊的人，幾乎是立刻往你這邊跑來。' },
      { kind: 'narration', text: '他跑到你面前時，呼吸還有點急，額前的頭髮被汗沾濕了幾縷，眼睛卻還是亮亮的。明明剛才還在場上打得氣勢十足，這會兒站到你面前，神情卻莫名有點像邀功似的。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '妳怎麼跑來這裡？' },
      { kind: 'dialogue', speaker: '你', text: '我來送水啊。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '我又不是不知道去哪裡買水。' },
      { kind: 'narration', text: '他嘴上這麼說，眼睛卻已經落在你手裡那瓶冰水上。你把水遞給他，他接過去時指尖碰到瓶身的水珠，這才像是想起自己已經打了好一會兒，低頭轉開瓶蓋喝了一大口。' }
    ],
    rounds: [
      {
        prompt: '妳今天沒課喔？怎麼突然有空過來？',
        choices: [
          { text: '怕你打到一半渴死，特地來送水。', response: ['妳講話可不可以好聽一點？', '……不過，謝啦，剛好有點渴。'], affection:  2 },
          { text: '路過啦，剛好多買了一瓶。', response: ['最好是路過。', '妳要去的地方跟籃球場根本不同方向吧？'], affection: 3 },
          { text: '來看看你有沒有偷懶，順便查勤。', response: ['蛤？我這是在運動欸。', '妳到底是來送水，還是來監督我的？'], affection: 1 }
        ]
      },
      {
        scene: '他把瓶蓋轉回去，手裡的水瓶還冒著細細的水珠。聽見你回答，他低頭笑了一下，像是想起什麼，又抬眼看你。',
        prompt: '所以妳是被球聲吸引過來的喔？',
        choices: [
          { text: '對啊，剛好看到某個人打得滿帥的。', response: ['……妳突然講這個幹嘛啦。', '球都還沒打完，妳就先誇了喔。'], affection: 3 },
          { text: '沒有啦，是看到你才停下來的。', response: ['喔？那我是不是應該感到榮幸？', '妳今天講話怎麼怪怪的。'], affection: 2 },
          { text: '我只是想知道你們到底要打多久。', response: ['哈哈，原來是來催人的。', '快了啦，再打一局就好。'], affection: 1 }
        ]
      },
      {
        scene: '場上的隊友朝他招手，球已經重新回到中線。他看了一眼比分，又回頭看你，語氣比剛才放慢了一點。',
        prompt: '妳先坐一下啦，我打完這場就過去找妳。',
        choices: [
          { text: '好啊，你快回去，別讓大家等。', response: ['知道啦。', '妳坐樹蔭那邊，別站在太陽底下。'], affection: 2 },
          { text: '那我坐這裡看你打完。', response: ['真的要看喔？', '那我等一下可不能打得太隨便了。'], affection: 3 },
          { text: '你要是輸了，就請我吃東西。', response: ['欸，妳很會趁機敲竹槓欸。', '好啦，反正打完也要去買東西。'], affection: 1 }
        ]
      }
    ],
    ending: [
      { kind: 'narration', text: '你在樹蔭旁找了個位置坐下，把另一瓶水放在身邊。溫尚翊回到場上，鞋底在地面一蹬，整個人很快又進入比賽的節奏。' },
      { kind: 'narration', text: '他先在外線接球，假動作晃開防守後才往前切。隊友投籃沒進，他已經搶到籃下，把彈回來的球穩穩收住；下一回合又在對方突破時伸手把球拍掉，轉身傳給跑在前面的隊友。球進了，他和隊友擊掌，笑了一下，又立刻回到位置上。' },
      { kind: 'narration', text: '你原本只是打算坐著等，後來卻不知不覺跟著場上的節奏看了起來。直到最後一球落進籃框，場邊的人才慢慢散開。溫尚翊拿起毛巾擦了擦臉，走回你面前時，呼吸已經平穩了不少。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '等很久喔？剛剛那場有點拖，隊友一直不肯認輸。' },
      { kind: 'dialogue', speaker: '你', text: '還好啦，我又沒有趕時間。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '走啦，我請妳吃點東西，當作今天的送水費。' },
      { kind: 'narration', text: '他把毛巾搭在肩上，順手拿起你帶來的空瓶，陪你沿著球場旁的小路往福利社走。剛才在場上跑得那麼快的人，這會兒卻特地放慢腳步，和你並肩走在樹影底下。' }
    ]
  },
  ashin: {
    label: '陳信宏',
    subtitle: '實踐大學・讓他帶你逛校園',
    location: '實踐大學',
    title: '第一次逛他的校園',
    kicker: '上午・實踐大學',
    blocks: [
      { kind: 'narration', text: '你搭車來到實踐大學時，校門附近正是學生進出的時候。有人抱著課本匆匆往教室走，也有人坐在樹下吃早餐、聊天。阿信站在校門旁的樹蔭下等你，手裡拿著幾張摺過的講義，遠遠看見你便笑著揮了揮手。' },
      { kind: 'narration', text: '你走近時，他把講義稍微收整齊，先問你一路過來順不順利，又看了看手錶，解釋自己剛才去辦公室拿資料，怕你找不到地方才一直留意校門口。說完，他像是終於放心似的，肩膀也放鬆下來。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '妳真的來啦？我還怕妳找不到路馁。' },
      { kind: 'dialogue', speaker: '你', text: '我有先查過啦，沒有迷路。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '那就好。今天不用趕，我帶妳慢慢走，好不好？' },
      { kind: 'narration', text: '他沒有急著把校園裡的地方一口氣介紹完，而是配合你的步伐，沿著教學大樓旁的步道慢慢往裡走。經過岔路時，他會告訴你哪一邊通往教室、哪一邊平常比較少人；遇到迎面走來的同學，也自然地點頭打招呼，再接著把剛才的話題說完。' },
      { kind: 'narration', text: '你們走到圖書館旁邊那段比較安靜的走廊時，風正好從另一頭吹過來。' },
      { kind: 'narration', text: '阿信下意識抬手壓了一下被吹亂的額髮，原本被劉海稍微擋住的眉眼也跟著露出來。你這才發現，他左邊眉毛上方有一顆很小的痣，不算明顯，卻讓人莫名多看了一眼。' },
      { kind: 'narration', text: '他注意到了你短暫的出神，便偏過頭來，輕聲問你：' }
    ],
    rounds: [
      {
        prompt: '怎麼了？是不是走累了？',
        choices: [
          { text: '沒有啦，只是剛剛風把你的頭髮吹起來了。', response: ['喔，原來是這樣。', '今天風真的有點大，妳有沒有被吹得不舒服？'], affection:  3 },
          { text: '有一點點，不過我還想再走走。', response: ['那我們就慢慢走，不用趕。', '前面剛好有幾張長椅，妳想休息的話我們再停一下。'], affection: 2 },
          { text: '我只是突然發現，你左邊眉毛上面有一顆痣。', response: ['欸？妳注意到那個喔？', '哈哈，我自己有時候都會忘記它在那裡。'], affection: 3 }
        ]
      },
      {
        scene: '走廊旁邊剛好有幾張靠窗的長椅，阿信問你要不要坐一下。等你們坐定，他把手裡的講義放到長椅另一側，沒有急著翻開，只順手壓住被風吹起的紙角。窗外有人抱著書從樹下經過，遠處傳來幾聲球場上的哨音，圖書館裡則安靜得只聽得見翻頁聲。',
        prompt: '妳平常讀書的時候，喜歡熱鬧一點，還是安靜一點？',
        choices: [
          { text: '我喜歡靠窗的位置，可以看外面發呆。', response: ['我也是欸。', '有時候看一下外面，讓腦袋休息一下，反而比較能繼續讀下去。'], affection: 3 },
          { text: '看當天心情，有時候需要一點聲音。', response: ['這樣也很好啊。', '有時候太安靜反而會想東想西，找到自己舒服的方式比較重要。'], affection: 2 },
          { text: '我通常找離插座最近的位置。', response: ['哈哈，這個很實際。', '那下次如果看到靠插座的位置，我就知道要幫妳留意了。'], affection: 1 }
        ]
      },
      {
        scene: '休息了一會兒，阿信把放在長椅另一側的講義重新拿起來，整齊地夾在手臂下，陪你沿著圖書館外的樹蔭繼續往校園另一側走。路上經過貼滿社團活動和講座海報的公告欄，他停下來替你介紹幾張自己也有興趣的活動單，還說起哪幾場講座之前同學討論得很熱烈。你們沒有刻意趕路，偶爾停下來看一眼海報，再沿著走廊往前。下課鐘聲響過幾次，學生一批批走出教室，原本熱鬧的步道也慢慢安靜下來。等走到校門附近，天色已經比剛才暗了不少，樹影沿著步道慢慢拉長。阿信這才看了眼時間，像是忽然發現你們已經走了好一段路。他稍稍放慢腳步，偏過頭來看你，笑容裡帶著一點不好意思。',
        prompt: '欸，怎麼一下子就走到這麼晚了。今天跟妳邊走邊聊，時間過得好快喔。',
        choices: [
          { text: '你之前也會陪別人散步到這麼晚嗎？', response: ['其實不太會欸。', '平常跟同學聊起音樂，有時候也會忘記時間，不過像今天這樣一路慢慢走到天都暗了，倒是很少。', '可能是因為跟妳聊天很自在，一下子就沒注意到時間了。'], affection: 3 },
          { text: '你是不是常常一聊到音樂，就會忘記原本要做的事？', response: ['有時候真的會啊。', '本來只是想說一首歌，後來又想到別的歌，常常聊著聊著就忘了時間。'], affection: 3 },
          { text: '還好啦，今天跟你逛校園很開心。', response: ['那就好，我本來還怕妳覺得無聊。', '下次妳如果還想來，我再帶妳走走今天沒逛到的地方。'], affection: 2 }
        ]
      }
    ],
    ending: [
      { kind: 'narration', text: '阿信眼角的笑意停了一會兒，沒有急著再找新的話題，只陪你沿著校門旁的步道慢慢往外走。這時校園裡的路燈才一盞盞亮起，教室裡的人聲逐漸遠去，晚風從校門外輕輕吹進來，帶著一點傍晚的涼意，整個下午像是在不知不覺間被你們走得很長很長。' },
      { kind: 'narration', text: '走出校門前，他還記得回頭替你指了指公車站的位置，陪你走到站牌旁確認方向。等車的時候，你們又聊了幾句剛才經過的社團海報和他平常上課的小事；他手臂下仍夾著那幾張講義，偶爾有紙角被風吹起，他便用手掌輕輕壓好。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '今天謝謝妳來啊。跟妳這樣慢慢走一走，感覺還滿舒服的。回去路上小心，到了再跟我說一聲，好不好？' },
      { kind: 'narration', text: '公車從路口慢慢轉進來時，阿信往站牌旁退了一步，替你看著車門停穩，才朝你揮揮手。你隔著車窗看見他還站在原地，直到車子重新開動、轉過路口，才把視線收回來。原本只是想來看看他的校園，最後卻和他一路散步到這麼晚；那些沿途聊起的小事，也像被晚風輕輕收進了這一天裡。' }
    ]
  },
  masa: {
    label: '蔡昇晏',
    subtitle: '帶他回家・見見爸媽，一起吃午飯',
    location: '回家的路上・家裡',
    title: '把小時候的玩伴帶回家',
    kicker: '上午・回家路上',
    blocks: [
      { kind: 'narration', text: '你找到瑪莎時，他原本還以為你只是約他出來走走。直到你說今天要帶他回家，他才停下腳步，一臉懷疑地看著你。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '等一下，妳真的要帶我回妳家喔？' },
      { kind: 'dialogue', speaker: '你', text: '不然咧？都多久沒見了，帶你回去給我爸媽看看啊。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '妳怎麼都沒先講？我現在什麼都沒準備欸。' },
      { kind: 'narration', text: '從巷口走回家的路上，你們幾乎一路都在拌嘴。他嫌你走太快，你嫌他問題太多；他嘴上抱怨，卻還是很自然地走在靠馬路的那一側。路過轉角的小雜貨店時，你們又不約而同慢了下來。招牌換過了，門口那條窄巷卻還是老樣子，連騎樓下那張掉漆的木椅都還在原處。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '這附近好像沒什麼變欸，至少這條路還在。' },
      { kind: 'dialogue', speaker: '你', text: '有些地方變了啦，只是你太久沒回來。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '妳不要講得好像我離開幾十年一樣。' },
      { kind: 'narration', text: '走到家門前，他忽然安靜了一點，低頭整理衣角，又伸手摸了摸頭髮，還把原本背得歪歪的包帶拉正。你看著他忍笑，他立刻瞪了你一眼，壓低聲音叫你不准在叔叔阿姨面前提他剛才一路緊張。門鈴響起後，他又立刻站直，像是要把那點不自在藏起來。' }
    ],
    rounds: [
      {
        prompt: '妳等一下要怎麼跟叔叔阿姨介紹我？先講好，不准亂講以前的事喔。',
        choices: [
          { text: '就說你是我小時候最常一起玩的朋友。', response: ['這樣聽起來還不錯。', '至少比妳剛才一路叫我「麻煩鬼」好聽。'], affection: 3 },
          { text: '說你是以前最愛跟我吵架的人。', response: ['妳有必要講得這麼具體嗎？', '我現在就站在妳旁邊欸，妳客氣一點。'], affection: 2 },
          { text: '你自己說啊，我不幫你。', response: ['我就知道不能靠妳。', '等一下如果我講錯，妳也不准在旁邊補刀。'], affection: 1 }
        ]
      },
      {
        scene: '門一開，媽媽先愣了幾秒，接著笑著叫出他的名字，還伸手拍了拍他的肩，問他怎麼瘦了沒有。爸爸也從客廳走出來，順手把椅子拉開，問他這些年過得怎麼樣。瑪莎一開始還坐得端端正正，回答得很客氣，直到媽媽翻出舊相簿，塑膠內頁發出輕輕的摩擦聲，他看見照片裡兩個小孩狼狽地蹲在院子裡，才忍不住笑出來。媽媽指著其中一張照片，笑著問你們當年到底在忙什麼。',
        prompt: '欸，這張我有印象。妳那時候還說是我弄壞的，明明就不是我。',
        choices: [
          { text: '就是你啦！我到現在都記得。', response: ['妳記得也太久了吧。', '那時候明明是妳先把東西弄倒，還推給我。'], affection: 2 },
          { text: '你有證據嗎？沒有就不要亂講。', response: ['哇，現在還要跟我講證據喔？', '阿姨妳看，她從小就這麼會狡辯。'], affection: 3 },
          { text: '你居然還記得這件事喔？', response: ['當然啊，妳以前做過的糗事我都記得。', '要不要我再幫妳回憶幾件？'], affection: 1 }
        ]
      },
      {
        scene: '午飯端上桌，湯碗裡的熱氣慢慢往上冒，媽媽一邊替你們添飯，一邊問起以前常玩的遊戲。瑪莎起初還記得客氣，夾菜時會先問叔叔阿姨要不要，等大家都動了筷子，才漸漸露出平常那副愛吐槽的樣子。他把筷子停在半空，像是突然想到一件不能放過你的事，轉頭看向你。',
        prompt: '阿姨，妳不知道，她以前還……',
        choices: [
          { text: '蔡昇晏！！！你給我閉嘴！', response: ['哈哈哈哈，妳看吧，心虛了。', '我都還沒講完欸。'], affection: 2 },
          { text: '你敢講，我就把你的糗事也全部說出來。', response: ['好啦好啦，算妳狠。', '今天先放妳一馬。'], affection: 3 },
          { text: '媽，妳不要聽他亂講啦。', response: ['我哪有亂講？', '阿姨，我等一下再慢慢跟妳說。'], affection: 1 }
        ]
      }
    ],
    ending: [
      { kind: 'narration', text: '飯桌上笑成一團。瑪莎一邊回答爸媽的問題，一邊還是忍不住拿你以前的糗事開玩笑；你不甘示弱地回嘴，媽媽在旁邊笑著替你們添菜。那頓午飯吃得比預想中久，卻沒有一點生疏。' },
      { kind: 'narration', text: '吃完飯後，他主動把碗筷拿到廚房，還幫忙把桌面擦乾淨。媽媽一邊說不用客氣，一邊又把水果裝進袋子，叫你們帶著路上吃。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '妳家還是跟以前一樣欸，連阿姨講話的方式都沒什麼變。' },
      { kind: 'dialogue', speaker: '你', text: '所以我才說你應該早點回來啊。' },
      { kind: 'dialogue', speaker: '蔡昇晏', text: '好啦，下次有空再來。妳不要每次都拿我小時候的事威脅我就好。' },
      { kind: 'narration', text: '你陪他走回巷口，兩個人一路還在吐槽剛才的相簿。那些空白的年月，好像就在一頓午飯和幾句熟悉的玩笑裡，慢慢接了回來。' }
    ]
  },
  stone: {
    label: '石錦航',
    subtitle: '師大附中附近・送便當給他',
    location: '師大附中附近的補習班',
    title: '午休時間的便當',
    kicker: '中午・師大附中附近',
    blocks: [
      { kind: 'narration', text: '午餐時間快到了，你提著便當來到師大附中附近，照著石頭之前提過的地址，找到他正在上課的補習班。巷口的機車一台接一台經過，騎樓下有學生拿著塑膠袋匆匆走過，也有人靠著牆翻講義，空氣裡混著便當店飄來的飯菜香。' },
      { kind: 'narration', text: '你站在門邊等了一會兒，聽見裡頭下課鐘聲響起，學生陸續抱著課本走出來。石頭拿著課本和紅筆跟在人群後面，看見你時明顯愣了一下，隨即把手上的東西換到一邊，快步走近。' },
      { kind: 'dialogue', speaker: '石錦航', text: '妳怎麼會來？' },
      { kind: 'dialogue', speaker: '你', text: '今天剛好有空，想說過來看看你。' },
      { kind: 'narration', text: '他這才注意到你手裡的便當，視線停在袋子上，像是忽然明白你今天特地跑這一趟的原因。他伸手接過去時先確認袋口有沒有歪，接著看了看你被太陽曬得微微發紅的臉，側身替你讓出騎樓裡比較涼的位置。' },
      { kind: 'dialogue', speaker: '石錦航', text: '這是特地帶來給我的嗎？妳怎麼還跑一趟。' }
    ],
    rounds: [
      {
        prompt: '妳等很久了嗎？外面有點熱，怎麼不先找個地方坐？',
        choices: [
          { text: '沒有啦，剛好等到你休息。', response: ['那就好，我剛才還怕妳一直站在外面。', '先進來坐一下，這邊比較不曬。'], affection: 2 },
          { text: '有一點點，不過看到你就不算久了。', response: ['妳這樣講，我反而不知道要怎麼回了。', '謝謝妳特地過來。'], affection: 3 },
          { text: '我怕你找不到我，所以站在門口等。', response: ['我一出來就看到妳了。', '下次可以先找個地方坐，我會出來找妳。'], affection: 2 }
        ]
      },
      {
        scene: '他把課本和紅筆整齊放到桌邊，先替你拉開靠牆、比較不會被人來人往撞到的椅子，等你坐好才把便當放平。休息時間不長，他卻沒有急著拆開筷子，而是先看了看你的神情，確認你一路過來沒有被太陽曬得不舒服。',
        prompt: '最近課業還好嗎？這陣子是不是也有不少報告？',
        choices: [
          { text: '還可以啦，就是偶爾會忙到忘記時間。', response: ['忙的時候更要記得吃飯。', '事情可以慢慢做，不用每一件都趕在同一天。'], affection: 3 },
          { text: '有一點忙，不過都還應付得來。', response: ['那就好。', '如果哪天真的忙不過來，也不要勉強自己。'], affection: 2 },
          { text: '你先回答我，你是不是也常常忙到沒吃飯？', response: ['被妳發現了。', '不過今天有便當，我就不會忘記了。'], affection: 2 }
        ]
      },
      {
        scene: '他打開便當，白飯和配菜的香氣一下子散開。他先把筷子拆好，將免洗筷套和紙巾放到你手邊，再把盒子裡看起來最合你口味的那樣配菜往你面前推近了一點。你還沒開口，他就像早猜到你會客氣似的，抬眼看了看你。',
        prompt: '妳也吃一點吧，不然我一個人吃好像有點不好意思。',
        choices: [
          { text: '好啊，那我就不客氣了。', response: ['嗯，這個味道不錯，妳試試看。', '我幫妳把筷子拿過來。'], affection: 3 },
          { text: '你先吃啦，我看你吃就好。', response: ['這樣我會更不好意思欸。', '一起吃比較快，休息時間也不用那麼趕。'], affection: 2 },
          { text: '那你要分我最好吃的那一口。', response: ['好，這個留給妳。', '不過妳也要答應我，下次不要只顧著送飯，自己也要吃。'], affection: 2 }
        ]
      }
    ],
    ending: [
      { kind: 'narration', text: '你們坐在騎樓邊的長椅上一起吃午飯。石頭吃得不快，聽你說話時會停下筷子；騎樓外偶爾有機車經過，他就稍微側過身替你擋一下濺起的水花。你說到一半，他還會記得把便當裡比較好吃的那塊配菜往你這邊推，見你吃了才低頭繼續吃自己的。' },
      { kind: 'narration', text: '牆上的時鐘慢慢走近上課時間，裡頭已經有人開始翻找講義。石頭把便當盒蓋好，仔細收進袋子裡，又確認桌面沒有留下湯汁或筷子。' },
      { kind: 'dialogue', speaker: '石錦航', text: '今天真的謝謝妳。回去路上小心，到家再跟我說一聲。' },
      { kind: 'narration', text: '他陪你走到門口，還替你把便當袋的提把整理好，提醒你外面車多要看路。你走出騎樓時回頭看了一眼，他已經拿起課本準備回去上課，卻還是特地停下來朝你點了點頭。' }
    ]
  },
  yanming: {
    label: '劉諺明',
    subtitle: '練團室・陪他整理器材',
    location: '練團室',
    title: '一起把練團室收拾好',
    kicker: '上午・練團室',
    blocks: [
      { kind: 'narration', text: '你到練團室時，諺明正蹲在一旁整理線材。地上幾條導線沿著牆角散開，譜架、麥克風架和器材箱分門別類地靠在一側，牆邊還貼著手寫的器材清單，幾個項目已經被他用筆打了勾。' },
      { kind: 'narration', text: '音箱剛關掉不久，空氣裡還留著一點木頭、灰塵和器材散熱後的味道。諺明手裡正拿著一條還沒整理完的導線，聽見你進來，便先把線放到身旁，拍掉掌心的灰，再抽張紙巾擦乾淨，才站起來跟你說話。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '妳今天沒有課喔？怎麼有空過來？' },
      { kind: 'dialogue', speaker: '你', text: '今天剛好空著，想說過來看看有沒有什麼能幫忙的。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '那妳來得正好。不過線材要小心一點，我先教妳怎麼整理。' }
    ],
    rounds: [
      {
        prompt: '線材先不要急著捲，妳要不要先試試看？',
        choices: [
          { text: '好啊，你教我一次，我照著做。', response: ['好，先把線順開。', '不要硬拉，從接頭旁邊開始整理會比較順。'], affection: 3 },
          { text: '這麼多條都要分開收嗎？', response: ['對，長度和用途不太一樣。', '先分好類，之後要用才不會找半天。'], affection: 2 },
          { text: '我今天來當免費工讀生，有沒有供餐？', response: ['哈哈，這樣我是不是要先準備便當？', '放心啦，不會讓妳白忙的。'], affection: 2 }
        ]
      },
      {
        scene: '你照著他的方式試著把線材繞成圈，第一條還是有點歪，拆開重來時，諺明就在旁邊扶住另一端，先替你把打結的地方慢慢理開。他沒有直接接手，只用手指比出線身該順著哪個方向走，等你重新握好線頭。',
        prompt: '妳看，這樣順著弧度繞，線就不會被折到。要不要再試一次？',
        choices: [
          { text: '再給我一次機會，這次一定可以。', response: ['慢慢來，不用急。', '妳已經比剛才順很多了。'], affection: 3 },
          { text: '原來這麼小的地方也有差喔。', response: ['有差，線材用久了更要注意。', '平常多花一點時間整理，之後就少很多麻煩。'], affection: 2 },
          { text: '我覺得你整理得比我快十倍。', response: ['做習慣了就會比較快。', '妳第一次整理，這樣已經很好了。'], affection: 2 }
        ]
      },
      {
        scene: '等你把手上最後一條導線整理好，諺明接過來檢查了一下接頭，確認沒有打結後才放進標好類別的器材箱。你們接著把譜架靠回牆邊、麥克風架按數量排好。接著，他拿起清單逐項核對，把剩下的項目一一勾完，才把筆放下，抬頭看了看時間。',
        prompt: '妳等一下還有安排嗎？如果沒有，可以先坐下喝杯水。',
        choices: [
          { text: '沒有啊，今天可以慢慢來。', response: ['那就休息一下。', '等一下如果他們開始練團，妳也可以留下來聽。'], affection: 3 },
          { text: '我還要回學校，不過不急。', response: ['好，那妳休息一下再走。', '回去路上注意安全，別為了趕時間跑太快。'], affection: 2 },
          { text: '你是不是終於要請我吃飯了？', response: ['哈哈，原來妳還記得供餐這件事。', '等一下我看看附近有什麼，不能讓工讀生餓肚子。'], affection: 2 }
        ]
      }
    ],
    ending: [
      { kind: 'narration', text: '諺明把已經核對完的清單收進抽屜，接著替你倒了一杯水，也給自己倒了一杯。忙了這麼久，他終於拉開椅子坐下來，肩膀微微放鬆，順手把用過的紙巾丟進門邊的垃圾桶。' },
      { kind: 'narration', text: '你們坐在練團室旁邊休息。聊到課業時，他沒有多問，只提醒你學校和練團室兩邊跑，時間要安排得剛好，不要把自己弄得太累。說話時，他偶爾看一眼牆邊已經歸位的器材，確認沒有東西擋住走道，才又把注意力放回你身上。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '今天真的幫了我不少忙，謝謝妳。下次如果有空，也可以再過來坐坐，不一定要幫忙，來聽他們練團也可以。' },
      { kind: 'narration', text: '門外傳來腳步聲，有人隔著門問器材是不是都準備好了。諺明回了一聲快好了，起身去開門前，還回頭確認你有沒有把水喝完。你看著牆邊整整齊齊的器材，忽然觉得这个人身上有种很奇怪的安心感——像只要有他在，乱掉的东西最后都会被好好收回原位。這個原本只是過來幫個小忙的上午，也意外地留下了不少值得記住的細節。' }
    ]
  }
}


const monthFreeChatOpeners: Record<RouteCharacterId, MonthFreeChatOpening[]> = {
  wen: [
    { text: '今天謝謝你請我吃東西～我回到家了！', response: '到家就好啦，剛剛走回去有沒有太熱？' },
    { text: '你最後那球真的很帥欸！', response: '妳真的有認真看喔？我還以為妳都在看旁邊的人。' },
    { text: '今天看你打球很開心，下次有比賽再叫我。', response: '好啊，有打球我再跟妳說。' },
  ],
  ashin: [
    { text: '今天謝謝你帶我逛校園，我已經到家了。', response: '到家就好，今天走了那麼久，妳回去先休息一下。' },
    { text: '我今天才注意到你左邊眉毛上面有一顆小痣。', response: '欸，妳真的有注意到喔？那顆痣很小，我自己有時候都會忘記。' },
    { text: '今天走到那麼晚，跟你聊天很開心。', response: '我也是啊，今天很多話都還沒聊完，下次再慢慢說。' },
  ],
  masa: [
    { text: '今天謝謝你陪我回家，我到家啦。', response: '安全到家就好。妳媽今天真的很熱情，我差點吃不下了。' },
    { text: '我媽是不是又翻出你小時候的照片了？', response: '妳還敢問！那幾張照片到底為什麼還留著啦。' },
    { text: '今天午飯好好吃，下次再來我家吧。', response: '欸，妳這麼快就安排下次了喔？我會記得啦。' },
  ],
  stone: [
    { text: '今天便當吃完了嗎？我回到家了。', response: '吃完了，謝謝妳特地送過來。妳也記得吃點東西。' },
    { text: '你今天又把好吃的菜推給我了。', response: '因為看妳一直沒夾，想說妳應該也會喜歡。' },
    { text: '你後來有趕上課嗎？', response: '有，時間剛好。妳不用擔心，今天沒有耽誤到。' },
  ],
  yanming: [
    { text: '我到家啦，今天整理器材很有趣。', response: '那就好，第一次整理能覺得有趣很不錯。' },
    { text: '你教我的收線方法我記住了。', response: '很好，記得不要急著拉緊，順著線的弧度慢慢收就好。' },
    { text: '今天謝謝你照顧我，下次再去找你。', response: '不客氣，妳下次有空再過來就好。' },
  ],
}

const monthFreeChatScripts: Record<RouteCharacterId, ChatRound[]> = {
  wen: [
    makeChatRound('妳到家了喔？今天那瓶水真的有救到我，打到後面差點忘記自己有多渴。', '那你下次要記得自己帶水。', '知道啦，今天不是有妳送來嗎？', '我本來就是特地買給你的啊。', '嗯，我有收到啦。謝謝妳，真的剛好。', '那你後來請我吃東西，算是還清送水費了。', '那一點東西就把妳打發了喔？下次再請啦。', 3),
    makeChatRound('妳坐在場邊看那麼久，有沒有覺得很無聊？我中間有幾球打得不太好欸。', '不會啊，我覺得很好看。', '真的喔？那我下次要打好一點。', '有一點無聊，所以你要補償我。', '蛤？妳不是看得滿認真的嗎？還敢說無聊。', '我有看到你最後那球，超帥的。', '……妳突然這樣講，我會不知道要回什麼欸。', 3),
    makeChatRound('剛剛隊友還問我，今天來送水的人是誰。', '那你怎麼介紹我的？', '就說是朋友啊，不然咧？', '你可以說是很重要的朋友。', '妳要求還滿多的欸……好啦，下次看情況。', '你是不是有跟他們說我很常來？', '沒有啦，妳才第一次來，講得好像常客一樣。', 2),
    makeChatRound('後來走去福利社的時候，妳一直說不用我請，結果看到冰的又停下來。', '因為天氣真的很熱嘛。', '我又沒有說不讓妳買，想吃就拿啊。', '你不是說要請我嗎？我當然要認真挑。', '哈哈，妳還真的很有原則欸。', '下次換我請你，不然一直讓你付很不好意思。', '好啊，這次我記下來了，不准賴帳。', 3),
    makeChatRound('下次如果我又去球場，妳要不要再過來看？不用特地送水也沒關係啦。', '好啊，不過我要先看你的賽程。', '還要先看賽程喔？妳把自己當教練是不是。', '可以啊，你有打球就跟我說。', '好啦，有確定我再傳訊息給妳。', '那我就期待下一場了。', '嗯，這次我會記得先帶水，免得又被妳笑。', 3),
  ],
  ashin: [
    makeChatRound('妳到家就好。今天帶妳走校園，後來才發現真的走了好久，還好妳沒有覺得累。', '不會啊，我很喜歡那邊的氣氛。', '那就好，我本來還怕自己介紹得太無聊。', '你不是也說時間過得很快嗎？', '對啊，跟妳邊走邊聊，常常一下子就忘記看時間。', '下次可以再帶我去別的地方嗎？', '當然可以啊，還有幾個地方我覺得妳會喜歡。', 3),
    makeChatRound('剛才走到校門口時，我好像看到妳看著我出了一下神，是不是有什麼話想問？', '我只是突然發現你眉毛上面有一顆小痣。', '欸，妳觀察得好仔細喔，我自己都快忘記它了。', '沒有啦，只是覺得你剛剛看起來很認真。', '哈哈，原來是這樣。我還以為自己臉上沾到什麼東西。', '你是不是早就知道我在看你？', '有一點點感覺啦，不過怕自己猜錯，就沒有直接問。', 3),
    makeChatRound('妳後來有順利搭上車嗎？我看車門關起來才放心。', '有啊，很順利，謝謝你陪我等車。', '那就好，晚上站牌那邊人比較少，還是確認一下比較安心。', '其實你不用陪到那麼久啦。', '不會啊，反正我也還不急著回去。', '我覺得今天散步到那麼晚剛剛好。', '我也這麼覺得。難得不用趕時間，可以慢慢走一段路。', 3),
    makeChatRound('對了，今天那幾張講義差點被風吹走，回去整理時才發現有一張角落都折起來了。', '哈哈，我剛剛就看到你一直用手壓著。', '真的有點狼狽欸，還好最後沒有整疊飛出去。', '下次我幫你拿一半，這樣就不怕了。', '謝謝妳，不過妳自己也有東西要拿，不用特地幫我。', '那你下次少帶一點嘛。', '這個可能比較難，課堂上要用的資料還是得帶著。', 2),
    makeChatRound('今天真的很開心。下次妳來實踐，或是我去台大附近，都可以再約出來走走。', '好啊，下次換我帶你逛台大。', '那我很期待喔，妳要記得介紹妳平常喜歡去的地方。', '你不要每次都客氣，想到什麼就找我聊天。', '好，我會的。跟妳聊天不用想太多，滿自在的。', '那說好了，我們下次再一起散步。', '嗯，說好了。今天也謝謝妳來。', 3),
  ],
  masa: [
    makeChatRound('妳今天把我帶回家，害我一開始還有點緊張欸。阿姨怎麼什麼都記得？', '她當然記得啊，你以前常常來。', '我知道啦，可是連那張照片都翻出來，真的很過分。', '你剛剛明明笑得最大聲。', '因為妳那張照片真的太好笑了啊，這不能怪我。', '我看你看到自己的照片也很想逃吧。', '廢話，誰想在別人面前看自己小時候那副樣子？', 3),
    makeChatRound('不過今天那頓飯真的滿好吃的，阿姨一直叫我多吃一點，我差點以為自己要被餵到走不動。', '她就是怕客人吃不飽啦。', '那我今天算是受到很好的招待了。', '你不是也把菜吃得差不多了？', '有好吃的當然要吃啊，妳不要把我講得像餓很久。', '下次你還想吃什麼？我可以先跟我媽說。', '欸，還有下次喔？那我得先想一下要點什麼。', 3),
    makeChatRound('我後來看到那本相簿，才想到以前我們真的做過很多蠢事。', '你還記得我們以前去巷口買冰嗎？', '記得啊，妳每次都要挑最久，最後還是選一樣的。', '明明是你一直催我。', '我是在提醒妳店快關了，不然我們就沒得吃了。', '那你還記得其他什麼事？', '有啊，只是有些講出來妳可能又要否認。', 3),
    makeChatRound('阿姨最後還把水果裝給我們帶走，妳回家有記得放冰箱嗎？', '有啦，我一進門就放好了。', '那就好，不然放外面一下就不新鮮了。', '你也有拿一袋回去吧？不要忘記吃。', '有啦，我媽看到應該也會很開心。', '下次你來，我們再一起吃水果。', '好啊，妳不要又趁機翻相簿就好。', 2),
    makeChatRound('今天跟妳家人坐在一起吃飯，感覺好像有些以前的日子真的回來了。', '我也有這種感覺，好像中間那些年沒有隔那麼久。', '嗯，剛開始還有點不習慣，後來就自然了。', '那以後你可以常常來啊。', '妳這樣邀請，我會當真的喔。', '下次換你帶我去你常去的地方。', '可以啊，這次換我安排，妳不准嫌東嫌西。', 3),
  ],
  stone: [
    makeChatRound('妳到家了嗎？今天特地送便當過來，回去路上有沒有太趕？', '到了，路上很順利。', '那就好，我剛才還怕妳為了趕時間走得太急。', '你後來有趕上上課嗎？', '有，時間剛好，妳不用擔心。', '那就好，我還怕耽誤你休息。', '不會，能一起吃頓飯，我今天也覺得很開心。', 3),
    makeChatRound('今天妳一直說不用把菜推給妳，結果最後還是吃了不少。', '因為你一直把好吃的推過來啊。', '我只是想讓妳也吃一點，不用一直客氣。', '你是不是很習慣先照顧別人？', '可能吧，看到身邊的人需要，就會順手幫一下。', '那你自己也要記得吃好一點。', '謝謝妳提醒，我會注意的。', 3),
    makeChatRound('妳離開之後，我把便當袋收好，才發現妳連筷子都多準備了一雙。', '我怕你臨時找不到，所以多帶一雙。', '妳想得很周到，真的幫上忙了。', '其實我只是怕你忙起來又忘記吃飯。', '我知道，妳今天特地跑這一趟，我有放在心上。', '下次我也可以帶便當去找你。', '好啊，如果時間剛好，我們就一起吃。', 3),
    makeChatRound('最近妳課業還好嗎？今天聽妳說報告的事，好像有幾份都擠在一起。', '還可以啦，我會慢慢安排。', '那就好，別一次把所有事情都扛在身上。', '有時候真的會忙到忘記休息。', '這樣不行，至少要留一點時間吃飯和睡覺。', '你也一樣，不要只顧著上課。', '好，我們互相提醒。', 3),
    makeChatRound('今天真的謝謝妳。妳願意特地來送便當，還陪我坐下來吃完，我都記得。', '不用一直謝啦，我也很高興看到你。', '那就好，我希望妳今天也有好好吃飯。', '下次見面我們找時間慢慢聊，不用趕著回去。', '好啊，我也想找個比較不趕的時間。', '那說好了，下次換我找你。', '好，等我把時間安排好，再跟妳說。', 3),
  ],
  yanming: [
    makeChatRound('妳到家了嗎？今天幫忙整理器材，辛苦妳了。第一次收線就做得很仔細。', '我到家了，今天學到不少東西。', '那就好，回去先休息，今天不用再惦記那些器材了。', '其實我覺得整理完很有成就感。', '我看得出來，妳後來越做越順手。', '下次我還想再去幫忙。', '歡迎啊，不過不用把它當成工作，有空來坐坐就好。', 3),
    makeChatRound('妳最後收的那條線，我後來又檢查了一次，弧度和接頭都沒有問題。', '真的嗎？我還怕自己繞得不夠整齊。', '沒有，妳做得很好，我只是照例確認一下。', '你是不是對每件器材都這麼仔細？', '習慣了，器材要用很久，平常多注意就能少出問題。', '那你有沒有什麼整理的小技巧可以再教我？', '有啊，下次我可以再示範幾種不同的收法。', 3),
    makeChatRound('今天把清單收進抽屜時，我才發現比平常早了一點完成。', '所以我今天算是有效率的小幫手嗎？', '算啊，妳沒有只在旁邊看，是真的有幫上忙。', '那下次要不要繼續聘用我？', '哈哈，妳這樣講好像真的在應徵工作。', '我可是有要求的，要有水喝。', '這個沒問題，練團室不會少妳一杯水。', 3),
    makeChatRound('妳今天問我是不是常常自己整理，其實大家有空都會互相幫忙，只是最後還是要有人確認。', '難怪你剛剛一直回頭檢查。', '嗯，確認過才放心，這樣大家用起來也比較安全。', '你真的很會把事情安排好。', '只是把該做的事情做好而已，沒有妳說得那麼厲害。', '可是有你在，感覺就不用擔心會亂掉。', '謝謝妳這樣說，能讓大家放心就很好。', 3),
    makeChatRound('下次妳如果還想來，先傳訊息給我，我幫妳看看大家的時間。', '好啊，我會先跟你說。', '這樣比較好安排，也不會讓妳白跑一趟。', '那下次我帶飲料來，不能一直讓你招待。', '不用特地準備，妳人來就很好了。', '那就約好了，下次再請你教我別的。', '好，慢慢來，不用一次學完。', 3),
  ],
}

const monthDiaryEntries: Record<RouteCharacterId, { title: string; visit: string; chat: string }> = {
  wen: {
    title: '今天去了球場，還帶了兩瓶水。',
    visit: '今天特地繞去台大的籃球場找溫尚翊。原本只是想把水交給他，沒想到剛好看見他在場上打球。他跑動的樣子和平常很不一樣，接球、變向、切入，每個動作都俐落得讓人移不開眼。看到我站在場邊時，他眼睛一下子亮了起來，像是突然發現熟悉的人，連球都先交給隊友就跑過來了。後來我坐在樹蔭下看完他們那場球，他還請我去福利社吃東西，回程也特地放慢腳步陪我走。',
    chat: '回家後我先傳訊息給他，說今天看他打球真的很帥。他嘴上還是不肯好好接受稱讚，卻記得我送來的水，也答應下次有球賽會告訴我。明明只是幾句訊息，卻讓我開始期待下一次去球場的時候。',
  },
  ashin: {
    title: '傍晚在校園裡走了很久。',
    visit: '今天去了實踐找阿信，讓他帶我逛校園。走到圖書館旁邊時，風把他的額髮吹開，我才注意到左邊眉毛上方有一顆小小的痣。他沒有忽略我短暫的出神，只是偏過頭，輕聲問我是不是走累了。後來我們沿著校園裡比較安靜的路慢慢走，聊課堂、講義和一些不太重要的小事，等到路燈一盞盞亮起，他還陪我走到公車站。',
    chat: '回到家後，我主動傳訊息告訴他已經平安到了。他還記得我在校門口看他的那一眼，也問我下次想不想再去走走。跟他聊天的時候，總覺得不用急著想好下一句要說什麼，話題就會很自然地接下去。',
  },
  masa: {
    title: '原來有些熟悉，真的沒有走遠。',
    visit: '今天帶瑪莎回家見爸媽。媽媽翻出以前的相簿，連小時候那些糗事都一併挖了出來。瑪莎一開始還有點不好意思，後來卻笑得比誰都大聲，還趁機拿我的照片反擊。午飯吃了很久，他吃完後主動把碗筷拿進廚房，幫忙收拾桌面。那些中間空白了好多年的日子，好像就在熟悉的玩笑和一頓飯裡，慢慢接了回來。',
    chat: '回家後我傳訊息問他有沒有平安到家，兩個人又聊起相簿裡的照片和以前常去買冰的巷口。他嘴上嫌我一直翻舊帳，卻連當年我挑冰挑很久的事都記得。原來有些回憶，並沒有因為隔了這麼多年就變得模糊。',
  },
  stone: {
    title: '一份便當，和一個很細心的人。',
    visit: '中午去師大附中附近送便當給石頭。外面有點熱，他一看到我就先問等了多久，還叫我別一直站在太陽底下。後來我們坐在騎樓邊一起吃飯，他把比較好吃的配菜往我這邊推，聽我說話時也會停下筷子。時間快到上課時，他仔細把便當盒收好，還替我整理好提袋，提醒我路上看車。',
    chat: '回家後我主動傳訊息問他有沒有趕上課。他不只回答得很仔細，還記得提醒我別把報告和課業都擠在一起。明明是我送便當去給他，最後卻又像被他照顧了一遍。',
  },
  yanming: {
    title: '把東西一件一件整理好的上午。',
    visit: '今天去了練團室陪諺明整理器材。他先教我怎麼順著線材的弧度慢慢收，不要急著硬折；後來又讓我自己試了一次，還仔細檢查接頭有沒有受損。等清單全部核對完，他才倒了水，拉開椅子坐下來休息。看著原本散在牆邊的器材一件件回到位置，忽然覺得他身上有種讓人安心的沉穩。',
    chat: '回家後我傳訊息跟他說今天學到很多。他還特地確認我收的線沒有問題，也說下次有空可以再教我別的整理方法。跟他說話總讓人覺得，事情好像真的都能慢慢處理好。',
  },
}


const unlockedContacts = [
  { id: 'wen', name: '溫尚翊', role: '大學同學・吉他手', description: '妳在大學認識的同學。熟門熟路地出入練團室，嘴上常常不饒人，卻總會留意妳有沒有跟上。' },
  { id: 'masa', name: '蔡昇晏', role: '兒時玩伴・Bass', description: '搬家後失去聯絡的童年朋友。大家現在都叫他 Masa，嘴巴比記憶裡更毒，卻還是那個熟悉的人。' },
  { id: 'ashin', name: '陳信宏', role: '主唱', description: '說話溫和，觀察細膩，總會留意別人的感受。' },
  { id: 'stone', name: '石錦航', role: '吉他手', description: '安靜細心，會默默替身邊的人留意小地方。' },
  { id: 'yanming', name: '劉諺明', role: '練團室老闆', description: '戴著眼鏡，負責照看練團室的場地與器材。' },
  { id: 'youda', name: '錢佑達', role: '鼓手', description: '目前和大家一起練團的鼓手，爽朗又有精神。' },
]

const walkBlocks: StoryBlock[] = [
  { kind: 'narration', text: '下午四點半，最後一堂課總算結束。教室裡的人一下子散了大半，你把桌上的課本一本本收進包裡，還不忘確認那本借來的筆記有沒有放好。' },
  { kind: 'narration', text: '走出教學樓時，午後的陽光還沒完全退去。校園裡有腳踏車鈴聲，有人抱著講義匆匆往下一堂課趕，也有人已經在想晚餐要吃什麼。你在福利社買了飲料，冰涼的杯身很快凝出一層薄薄的水珠。' },
  { kind: 'narration', text: '剛走到樓下，你就看見溫尚翊站在靠近台階的地方。他背著那個深色吉他袋，肩帶有點滑，正低頭把它往上拉。聽見腳步聲，他抬起頭，朝你招了招手。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '這邊。' },
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
      { kind: 'dialogue', speaker: '溫尚翊', text: '我來了。' },
      { kind: 'dialogue', speaker: '裡面的人', text: '今天還蠻準時的嘛。' },
      { kind: 'narration', text: '你還站在門口，視線越過溫尚翊的肩膀往裡看。剛才一路聽見的樂器聲，原來就是從這裡傳出來的。' },
      { kind: 'dialogue', speaker: '你', text: '你們平常就在這裡練習喔？' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '對啊。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '進來啦，站門口幹嘛。' },
      { kind: 'narration', text: '你這才跟著他走進去。房間比從外面聽起來還要熱鬧，牆邊靠著幾把吉他，音箱上放著沒收好的導線，地上有幾張寫滿字的紙。空氣裡混著木頭、金屬弦和一點悶熱的味道。' },
      { kind: 'narration', text: '他把吉他袋靠到牆邊，回頭朝裡面拍了拍手。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '先介紹一下，這是我大學同學。今天帶她來看看。' },
      { kind: 'narration', text: '你笑著抬起手，朝大家揮了揮。' },
    ],
  },
  {
    kicker: '認識新朋友・01',
    title: '第一個向你打招呼的人',
    button: '繼續認識大家',
    blocks: [
      { kind: 'narration', text: '靠近音箱的男生先停下手邊的動作，把手上的線材放到一旁。他留著妹妹頭，抬手搔了搔頭，腼腆地抿著嘴笑了笑。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '妳好，我是陳信宏。' },
      { kind: 'dialogue', speaker: '你', text: '你好。' },
      { kind: 'narration', text: '他說話的聲音比房間裡的樂器聲輕一些，帶著軟軟的台灣腔，尾音總像含著笑意，輕輕地落下來。你還沒來得及多說什麼，他已經很自然地把旁邊的位置讓出來，讓你可以先把包包放下。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '妳先坐啦，等一下如果太吵再跟我們說喔。' },
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
      { kind: 'narration', text: '他笑了笑，把鼓棒在掌心轉了一圈，又回頭去調整鼓的位置。等他坐回鼓凳，重新握好鼓棒，先試敲了幾下，接著鼓聲便咚、咚、咚地響起來，低沉的節奏一下一下落在房間裡，連空氣都像跟著震動了。' },
    ],
  },
  {
    kicker: '認識練團室的人・04',
    title: '練團室的老闆',
    button: '看看角落那個人',
    blocks: [
      { kind: 'narration', text: '你剛把飲料拿起來，門口又傳來鑰匙碰撞的聲音。一個戴著眼鏡的男人推門走進來，手裡握著一串鑰匙，鏡片後的目光先掃過房間裡的器材，接著才注意到你。' },
      { kind: 'dialogue', speaker: '男人', text: '今天有新朋友喔？' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '諺明哥，這是我大學同學。這位是諺明，這間練團室的老闆。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '妳好啊，隨便坐，不用客氣。線不要亂踩就好。' },
      { kind: 'dialogue', speaker: '你', text: '好，謝謝。' },
      { kind: 'narration', text: '諺明哥朝你點了點頭，便轉身忙自己的事。他把鑰匙放到桌上，走到牆邊逐一查看器材和接線，又拿起桌上的預約簿翻了幾頁，確認完才闔上。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '你們慢慢來喔，器材有問題再叫我。線不要亂拉，結束記得把東西放回原位就好。' },
      { kind: 'narration', text: '交代完，他把預約簿夾在手臂下，拿起桌上的鑰匙，朝大家揮了揮手，便走出練團室，順手把門帶上。' },
      { kind: 'narration', text: '溫尚翊看你在椅子上坐穩了，才稍微放下心來。他朝房間角落抬了抬下巴，順手替你介紹。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '那邊那個是瑪莎，彈 Bass 的。' },
    ],
  },
]


const classroomIntroChoices: ChatChoice[] = [
  {
    text: '大忙人今天怎麼沒去練團？',
    response: ['今天練團取消啦。', '瑪莎跟石頭兩個人翹課被抓，現在還被老師留在學校，湊不齊人。'],
    affection: 3,
  },
  {
    text: '你今天不用練團喔？居然有空約我吃冰。',
    response: ['今天剛好不用練啦。', '本來想練的，結果瑪莎跟石頭翹課被抓，兩個人都被留在學校了。'],
    affection: 2,
  },
  {
    text: '怎麼，今天沒人陪你練團，只好找我？',
    response: ['妳很會講欸。', '今天是瑪莎跟石頭出狀況，練團湊不齊人，我才剛好有空。'],
    affection: -1,
  },
]

const classroomChoices: ChatChoice[] = [
  { text: '蛤？大學翹課也會被抓喔？', response: ['不是啦，妳在想什麼。', '他們兩個還在師大附中讀高三啦。', '今天想偷跑出去，剛好被老師逮到，現在都被留在學校了。'], affection: 3 },
  { text: '等一下，你說的是大學的課嗎？', response: ['不是啦，妳先聽我講完。', '石頭跟瑪莎都還在念高三，今天翹課被老師抓個正著。', '所以今天練團才湊不齊人。'], affection: 1 },
  { text: '你們練團的人怎麼老是出包？', response: ['妳講話很難聽欸。', '他們兩個今天只是翹課被抓，跟練團有什麼關係。', '妳到底是要不要來吃冰？'], affection: -1 },
]
const masaCheckinRounds: ChatChoice[][] = [
  [
    { text: '蛤？你們真的還在讀高三喔？我以為你們都上大學了欸。', response: ['妳反應也太大了吧。', '我跟石頭本來就還在念書啊，今天只是想偷跑出去一下，誰知道就被抓了。'], affection: 2 },
    { text: '等一下，你現在還是高三？', response: ['不然咧？妳以為我已經畢業了喔？', '老師今天剛好在附近，才這麼倒楣。'], affection: 1 },
    { text: '你不是只比我小一歲嗎？我還以為你也上大學了。', response: ['一歲就不能差一個學制喔？', '反正我現在就是還在念高三，妳先不要笑。'], affection: 3 },
  ],
  [
    { text: '可是你怎麼會到現在才高三啊？', response: ['妳這問題問得很直接欸。', '以前有些事情耽擱了一下，就比別人晚了一點。'], affection: 3 },
    { text: '你之前是不是有休學過？', response: ['沒有啦，妳不要自己亂猜。', '反正就是晚了一點，講起來有點複雜，改天有空再跟妳說。'], affection: 2 },
    { text: '所以你現在還要準備考大學喔？', response: ['對啊，不然咧。', '先把眼前的事情弄好再說，考試還早。'], affection: 1 },
  ],
  [
    { text: '那石頭也是跟你一樣，晚了一點嗎？', response: ['石頭的事妳自己問他啦。', '我不能替他講那麼多，妳不是也可以傳訊息給他？'], affection: 2 },
    { text: '你不想說就算了，我只是有點意外。', response: ['沒有不想說啦。', '只是這種事講起來有點長，今天先不聊這個。'], affection: 3 },
    { text: '好啦，那今天被抓有被罵很慘嗎？', response: ['妳現在才想到要關心喔？', '還好啦，老師念一念就放人了，妳不用替我操心。'], affection: -1 },
  ],
]
const stoneCheckinChoices: ChatChoice[] = [
  { text: '聽說你今天跟瑪莎一起被抓了，還好嗎？', response: ['謝謝妳關心，沒事啦。', '就是被老師留下來講了幾句，讓大家等不到我們了。'], affection: 3 },
  { text: '怪獸說你們今天都沒辦法去練團，還順利嗎？', response: ['嗯，事情已經處理好了。', '今天真的不好意思，下次練團再補上。'], affection: 2 },
  { text: '你們兩個到底跑去哪裡，怎麼一起被抓？', response: ['說來話長，改天再跟妳說。', '反正今天算我們倒楣，妳就先別聽瑪莎亂講。'], affection: 1 },
]

const createInitialChatMessages = (): Record<CharacterId, SmsMessage[]> => {
  const empty: Record<CharacterId, SmsMessage[]> = { wen: [], masa: [], ashin: [], stone: [], yanming: [], youda: [] }
  if (localStorage.getItem('mayday-chapter1-complete') === 'true' && localStorage.getItem('mayday-greetings-complete') !== 'true') {
    empty.wen = [{ id: 'greeting-wen-0', date: '10月15日・晚上', time: '21:18', from: 'wen', text: greetingChats.wen[0].incoming }]
  }
  return empty
}

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
  const [saveSlots, setSaveSlots] = useState<Record<number, SaveSlotData | null>>(() => ({ 1: readSaveSlot(1), 2: readSaveSlot(2), 3: readSaveSlot(3) }))
  const [saveFeedback, setSaveFeedback] = useState('')
  const [selectedSmsThread, setSelectedSmsThread] = useState<CharacterId | null>(null)
  const [smsMessages, setSmsMessages] = useState<SmsMessage[]>(() => {
    const saved = localStorage.getItem('mayday-sms-messages')
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as SmsMessage[]
        if (Array.isArray(parsed) && parsed.every((message) => message && typeof message.id === 'string' && typeof message.text === 'string' && (message.from === 'me' || greetingOrder.includes(message.from as CharacterId)))) return parsed
      } catch {
        // Rebuild the inbox from the authored conversation if old local data is malformed.
      }
    }
    return createInitialSmsMessages()
  })
  const [storyStage, setStoryStage] = useState<StoryStage>(() => {
    const saved = localStorage.getItem('mayday-story-stage')
    if (saved === 'completed' && localStorage.getItem('mayday-chapter1-complete') === 'true' && localStorage.getItem('mayday-greetings-complete') !== 'true') return 'greetings'
    if (saved === 'completed' && localStorage.getItem('mayday-free-chat-complete') === 'true' && localStorage.getItem('mayday-month-visit-complete') !== 'true') return 'month-free-time'
    const savedMonthVisitTarget = localStorage.getItem('mayday-month-visit-target')
    if (saved === 'month-visit' && (!savedMonthVisitTarget || !monthVisitOrder.includes(savedMonthVisitTarget as RouteCharacterId))) return 'month-free-time'
    const savedTarget = localStorage.getItem('mayday-free-chat-target')
    const day2PlanChosen = localStorage.getItem('mayday-day2-after-ice-choice') === 'accept' || localStorage.getItem('mayday-day2-after-ice-choice') === 'decline'
    if (['free-time', 'free-chat', 'day2-complete'].includes(saved ?? '') && !day2PlanChosen) return 'ice-date'
    if (saved === 'free-time' && savedTarget && freeTimeOrder.includes(savedTarget as RouteCharacterId) && localStorage.getItem('mayday-free-chat-complete') !== 'true') return 'free-chat'
    const valid: StoryStage[] = ['notification', 'messages', 'reply', 'walk', 'studio', 'reunion', 'reunion-chat', 'nickname', 'rehearsal', 'dinner', 'after-dinner', 'ending', 'completed', 'greetings', 'classroom', 'masa-checkin', 'stone-checkin', 'ice-date', 'stroll', 'day2-diary', 'free-time', 'free-chat', 'day2-complete', 'month-free-time', 'month-visit', 'month-visit-complete', 'month-free-chat', 'month-diary', 'paused']
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
  const [dinnerReplyKey, setDinnerReplyKey] = useState<DinnerReplyKey | null>(() => {
    const saved = localStorage.getItem('mayday-dinner-reply')
    return saved === 'a' || saved === 'b' || saved === 'c' ? saved : null
  })
  const [marthaAffection, setMarthaAffection] = useState(() => Number(localStorage.getItem('mayday-affection-martha') ?? '0'))
  const [firstChapterComplete, setFirstChapterComplete] = useState(() => localStorage.getItem('mayday-chapter1-complete') === 'true')
  const [day2StrollAccepted, setDay2StrollAccepted] = useState(() => localStorage.getItem('mayday-day2-after-ice-choice') === 'accept')
  const [day2DiaryUnlocked, setDay2DiaryUnlocked] = useState(() => localStorage.getItem('mayday-day2-diary-unlocked') === 'true')
  const [selectedDiaryDate, setSelectedDiaryDate] = useState<'1996-10-15' | '1996-10-16' | null>(null)
  const [chatMessages, setChatMessages] = useState<Record<CharacterId, SmsMessage[]>>(() => {
    const saved = localStorage.getItem('mayday-chat-messages')
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Record<CharacterId, SmsMessage[]>
        if (parsed && greetingOrder.every((id) => Array.isArray(parsed[id]))) {
          const migrated: Record<CharacterId, SmsMessage[]> = {
            ...parsed,
            wen: parsed.wen.map((message) => message.text === '今天大家好像都滿喜歡妳的，尤其阿信，一直找妳聊天。'
              ? { ...message, text: '剛剛在唱片行，妳跟阿信聊得滿開心的嘛。' }
              : message),
            ashin: parsed.ashin.map((message) => ['剛剛在樂器行碰到你們，感覺你們今天心情很好。我也順利買到吉他弦了。', '剛剛一起逛唱片行滿開心的，妳最後有沒有挑到喜歡的？我本來還想多介紹幾張，結果得趕回去練團。'].includes(message.text)
              ? { ...message, text: '剛剛一起逛唱片行滿開心的，妳最後有沒有挑到喜歡的？我本來還想多介紹幾張，不過後來也差不多該回家了。' }
              : message),
          }
          if (JSON.stringify(migrated) !== JSON.stringify(parsed)) localStorage.setItem('mayday-chat-messages', JSON.stringify(migrated))
          return migrated
        }
      } catch {
        // Rebuild the new contact threads if saved chat data is malformed.
      }
    }
    return createInitialChatMessages()
  })
  const [greetingIndex, setGreetingIndex] = useState(() => Number(localStorage.getItem('mayday-greeting-index') ?? '0'))
  const [greetingRound, setGreetingRound] = useState(() => Number(localStorage.getItem('mayday-greeting-round') ?? '0'))
  const [greetingReplied, setGreetingReplied] = useState(() => localStorage.getItem('mayday-greeting-replied') === 'true')
  const [classroomReplySent, setClassroomReplySent] = useState(() => localStorage.getItem('mayday-classroom-reply-sent-v2') === 'true')
  const [classroomIntroReplied, setClassroomIntroReplied] = useState(() => localStorage.getItem('mayday-classroom-intro-replied-v1') === 'true')
  const [masaCheckInSent, setMasaCheckInSent] = useState(() => localStorage.getItem('mayday-masa-checkin-complete-v2') === 'true')
  const [masaCheckInRound, setMasaCheckInRound] = useState(() => Number(localStorage.getItem('mayday-masa-checkin-round-v2') ?? '0'))
  const [masaCheckInReplied, setMasaCheckInReplied] = useState(() => localStorage.getItem('mayday-masa-checkin-replied-v2') === 'true')
  const [stoneCheckInSent, setStoneCheckInSent] = useState(() => localStorage.getItem('mayday-stone-checkin-sent') === 'true')
  const [freeChatTarget, setFreeChatTarget] = useState<RouteCharacterId | null>(() => {
    const saved = localStorage.getItem('mayday-free-chat-target')
    return saved && freeTimeOrder.includes(saved as RouteCharacterId) ? saved as RouteCharacterId : null
  })
  const [freeChatRound, setFreeChatRound] = useState(() => Number(localStorage.getItem('mayday-free-chat-round') ?? '0'))
  const [freeChatReplied, setFreeChatReplied] = useState(() => localStorage.getItem('mayday-free-chat-replied') === 'true')
  const [monthVisitTarget, setMonthVisitTarget] = useState<RouteCharacterId | null>(() => {
    const saved = localStorage.getItem('mayday-month-visit-target')
    return saved && monthVisitOrder.includes(saved as RouteCharacterId) ? saved as RouteCharacterId : null
  })
  const [monthVisitReplies, setMonthVisitReplies] = useState<number[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-month-visit-replies') ?? 'null')
      if (Array.isArray(saved)) return saved.filter((value): value is number => Number.isInteger(value) && value >= 0 && value <= 2).slice(0, 3)
    } catch { /* Restore the previous one-choice save format below. */ }
    return []
  })
  const [monthFreeChatRound, setMonthFreeChatRound] = useState(() => Number(localStorage.getItem('mayday-month-free-chat-round') ?? '0'))
  const [monthFreeChatReplied, setMonthFreeChatReplied] = useState(() => localStorage.getItem('mayday-month-free-chat-replied') === 'true')
  const [monthFreeChatStarted, setMonthFreeChatStarted] = useState(() => localStorage.getItem('mayday-month-free-chat-started') === 'true')
  const [monthFreeChatOpeningSent, setMonthFreeChatOpeningSent] = useState(() => localStorage.getItem('mayday-month-free-chat-opening-sent') === 'true')
  const [monthFreeChatReplies, setMonthFreeChatReplies] = useState<number[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-month-free-chat-replies') ?? '[]')
      return Array.isArray(saved) ? saved.filter((value): value is number => Number.isInteger(value) && value >= 0 && value <= 2).slice(0, 5) : []
    } catch { return [] }
  })
  const [routeAffection, setRouteAffection] = useState<Record<RouteCharacterId, number>>(() => {
    let saved: Partial<Record<RouteCharacterId, number>> = {}
    try { saved = JSON.parse(localStorage.getItem('mayday-route-affection') ?? '{}') as Partial<Record<RouteCharacterId, number>> } catch { saved = {} }
    return {
      wen: Number(saved.wen ?? localStorage.getItem('mayday-affection-wen') ?? '0'),
      masa: Number(saved.masa ?? localStorage.getItem('mayday-affection-martha') ?? '0'),
      ashin: Number(saved.ashin ?? 0),
      stone: Number(saved.stone ?? 0),
      yanming: Number(saved.yanming ?? 0),
    }
  })
  const [sharedExperienceLog, setSharedExperienceLog] = useState<Partial<Record<RouteCharacterId, CharacterExperienceRecord>>>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-shared-experience-log') ?? '{}') as Partial<Record<RouteCharacterId, CharacterExperienceRecord>>
      return saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {}
    } catch { return {} }
  })
  const [callExperienceContext, setCallExperienceContext] = useState<CharacterExperienceRecord | null>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-call-experience-context') ?? 'null') as CharacterExperienceRecord | null
      return saved && freeTimeOrder.includes(saved.character) && ['first-chapter', 'day2', 'free-chat', 'month-visit', 'month-free-chat'].includes(saved.source) && typeof saved.date === 'string' ? saved : null
    } catch { return null }
  })
  const [pendingCallCharacter, setPendingCallCharacter] = useState<RouteCharacterId | null>(() => {
    const saved = localStorage.getItem('mayday-pending-call')
    return saved && freeTimeOrder.includes(saved as RouteCharacterId) ? saved as RouteCharacterId : null
  })
  const [incomingCallCharacter, setIncomingCallCharacter] = useState<RouteCharacterId | null>(() => {
    const saved = localStorage.getItem('mayday-incoming-call')
    return saved && freeTimeOrder.includes(saved as RouteCharacterId) ? saved as RouteCharacterId : null
  })
  const [activeCallCharacter, setActiveCallCharacter] = useState<RouteCharacterId | null>(() => {
    const saved = localStorage.getItem('mayday-active-call-character')
    return saved && freeTimeOrder.includes(saved as RouteCharacterId) ? saved as RouteCharacterId : null
  })
  const [callRoundIndex, setCallRoundIndex] = useState(() => Number(localStorage.getItem('mayday-call-round-index') ?? '0'))
  const [callReplied, setCallReplied] = useState(() => localStorage.getItem('mayday-call-replied') === 'true')
  const [callTranscript, setCallTranscript] = useState<CallTranscriptLine[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-call-transcript') ?? '[]') as CallTranscriptLine[]
      return Array.isArray(saved) ? saved : []
    } catch { return [] }
  })
  const [callHistory, setCallHistory] = useState<CallLogEntry[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-call-history') ?? '[]') as CallLogEntry[]
      return Array.isArray(saved) ? saved.filter((entry) => entry && freeTimeOrder.includes(entry.character) && (entry.status === 'answered' || entry.status === 'missed')) : []
    } catch { return [] }
  })
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null)
  const [resumeStage, setResumeStage] = useState<StoryStage>(() => {
    const saved = localStorage.getItem('mayday-resume-stage')
    const valid: StoryStage[] = ['notification', 'messages', 'reply', 'walk', 'studio', 'reunion', 'reunion-chat', 'nickname', 'rehearsal', 'dinner', 'after-dinner', 'ending', 'completed', 'greetings', 'classroom', 'masa-checkin', 'stone-checkin', 'ice-date', 'stroll', 'day2-diary', 'free-time', 'free-chat', 'day2-complete', 'month-free-time', 'month-visit', 'month-visit-complete', 'month-free-chat', 'month-diary']
    return saved && valid.includes(saved as StoryStage) ? saved as StoryStage : 'reunion'
  })
  const messageScrollRef = useRef<HTMLDivElement>(null)
  const callTranscriptRef = useRef<HTMLDivElement>(null)
  const currentTime =
    storyStage === 'notification' || storyStage === 'messages' ? '15:42'
      : storyStage === 'walk' ? '16:30'
        : storyStage === 'dinner' ? '19:10'
          : storyStage === 'after-dinner' ? '20:35'
            : storyStage === 'ending' || storyStage === 'completed' || storyStage === 'greetings' ? '21:18'
              : storyStage === 'classroom' || storyStage === 'masa-checkin' || storyStage === 'stone-checkin' ? '10:12'
                : storyStage === 'ice-date' ? '16:20'
                  : storyStage === 'stroll' ? '17:05'
                    : storyStage === 'day2-diary' ? '18:00'
                      : storyStage === 'free-time' || storyStage === 'free-chat' || storyStage === 'day2-complete' ? '18:20'
                        : ['month-free-time', 'month-visit'].includes(storyStage) ? '10:30'
                          : storyStage === 'month-visit-complete' || storyStage === 'month-free-chat' ? '18:10'
                            : storyStage === 'month-diary' ? '20:45'
                              : '17:20'
  const effectiveDateStage = storyStage === 'paused' ? resumeStage : storyStage
  const isSecondDay = ['classroom', 'masa-checkin', 'stone-checkin', 'ice-date', 'stroll', 'day2-diary', 'free-time', 'free-chat', 'day2-complete'].includes(effectiveDateStage)
  const isMonthLater = ['month-free-time', 'month-visit', 'month-visit-complete', 'month-free-chat', 'month-diary'].includes(effectiveDateStage) || localStorage.getItem('mayday-month-visit-complete') === 'true'
  const saveGameDate = isMonthLater ? '1996.11.16' : isSecondDay ? '1996.10.16' : '1996.10.15'
  const [calendarYear, calendarMonth, calendarDay] = saveGameDate.split('.')
  const calendarDate = new Date(Number(calendarYear), Number(calendarMonth) - 1, Number(calendarDay))
  const calendarWeekday = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][calendarDate.getDay()]

  const saveCurrentProgress = (slot: number) => {
    if (saveSlots[slot] && !window.confirm('要覆蓋第 ' + slot + ' 格存檔嗎？原本的存檔會被新的進度取代。')) return
    const data: Record<string, string> = {}
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index)
      if (key && key.startsWith('mayday-') && !key.startsWith(SAVE_SLOT_PREFIX)) {
        const value = localStorage.getItem(key)
        if (value !== null) data[key] = value
      }
    }
    const put = (key: string, value: string | null) => {
      if (value === null) delete data[key]
      else data[key] = value
    }
    put('mayday-player-name', playerName)
    put('mayday-story-stage', storyStage)
    put('mayday-studio-step', String(studioStep))
    put('mayday-reply', replyKey)
    put('mayday-affection-wen', String(wenAffection))
    put('mayday-reunion-reply', reunionReplyKey)
    put('mayday-nickname-question', nicknameQuestionKey)
    put('mayday-dinner-reply', dinnerReplyKey)
    put('mayday-affection-martha', String(marthaAffection))
    put('mayday-chapter1-complete', String(firstChapterComplete))
    put('mayday-day2-diary-unlocked', String(day2DiaryUnlocked))
    put('mayday-sms-messages', JSON.stringify(smsMessages))
    put('mayday-chat-messages', JSON.stringify(chatMessages))
    put('mayday-greeting-index', String(greetingIndex))
    put('mayday-greeting-round', String(greetingRound))
    put('mayday-greeting-replied', String(greetingReplied))
    put('mayday-classroom-reply-sent-v2', String(classroomReplySent))
    put('mayday-classroom-intro-replied-v1', String(classroomIntroReplied))
    put('mayday-masa-checkin-complete-v2', String(masaCheckInSent))
    put('mayday-masa-checkin-round-v2', String(masaCheckInRound))
    put('mayday-masa-checkin-replied-v2', String(masaCheckInReplied))
    put('mayday-stone-checkin-sent', String(stoneCheckInSent))
    put('mayday-free-chat-target', freeChatTarget)
    put('mayday-free-chat-round', String(freeChatRound))
    put('mayday-free-chat-replied', String(freeChatReplied))
    put('mayday-month-visit-target', monthVisitTarget)
    put('mayday-month-visit-replies', JSON.stringify(monthVisitReplies))
    put('mayday-month-visit-choice', null)
    put('mayday-month-visit-complete', localStorage.getItem('mayday-month-visit-complete'))
    put('mayday-month-free-chat-round', String(monthFreeChatRound))
    put('mayday-month-free-chat-replied', String(monthFreeChatReplied))
    put('mayday-month-free-chat-started', String(monthFreeChatStarted))
    put('mayday-month-free-chat-replies', JSON.stringify(monthFreeChatReplies))
    put('mayday-month-free-chat-complete', localStorage.getItem('mayday-month-free-chat-complete'))
    put('mayday-month-day-complete', localStorage.getItem('mayday-month-day-complete'))
    put('mayday-route-affection', JSON.stringify(routeAffection))
    put('mayday-shared-experience-log', JSON.stringify(sharedExperienceLog))
    put('mayday-call-experience-context', callExperienceContext ? JSON.stringify(callExperienceContext) : null)
    put('mayday-call-history', JSON.stringify(callHistory))
    put('mayday-pending-call', pendingCallCharacter)
    put('mayday-incoming-call', incomingCallCharacter)
    put('mayday-resume-stage', resumeStage)
    put('mayday-active-call-character', activeCallCharacter)
    put('mayday-call-round-index', activeCallCharacter ? String(callRoundIndex) : null)
    put('mayday-call-replied', activeCallCharacter ? String(callReplied) : null)
    put('mayday-call-transcript', activeCallCharacter ? JSON.stringify(callTranscript) : null)

    const saved: SaveSlotData = {
      version: 1,
      savedAt: new Date().toISOString(),
      gameDate: saveGameDate,
      gameTime: currentTime,
      stage: storyStage,
      stageLabel: storyStageLabels[storyStage],
      data,
    }
    try {
      localStorage.setItem(SAVE_SLOT_PREFIX + slot, JSON.stringify(saved))
      setSaveSlots((current) => ({ ...current, [slot]: saved }))
      setSaveFeedback('已保存至存檔 ' + slot + '。')
    } catch {
      setSaveFeedback('保存失敗：瀏覽器儲存空間可能不足，請先清理不需要的存檔。')
    }
  }

  const loadSaveSlot = (slot: number) => {
    const saved = saveSlots[slot]
    if (!saved) return
    if (!window.confirm('確定讀取第 ' + slot + ' 格存檔嗎？目前未保存的進度會被這份存檔取代。')) return
    const keysToRemove: string[] = []
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index)
      if (key && key.startsWith('mayday-') && !key.startsWith(SAVE_SLOT_PREFIX)) keysToRemove.push(key)
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key))
    Object.entries(saved.data).forEach(([key, value]) => {
      if (key.startsWith('mayday-') && !key.startsWith(SAVE_SLOT_PREFIX)) localStorage.setItem(key, value)
    })
    window.location.reload()
  }

  useEffect(() => {
    localStorage.setItem('mayday-sms-messages', JSON.stringify(smsMessages))
  }, [smsMessages])

  useEffect(() => {
    localStorage.setItem('mayday-chat-messages', JSON.stringify(chatMessages))
  }, [chatMessages])

  useEffect(() => {
    localStorage.setItem('mayday-route-affection', JSON.stringify(routeAffection))
  }, [routeAffection])

  useEffect(() => {
    localStorage.setItem('mayday-shared-experience-log', JSON.stringify(sharedExperienceLog))
  }, [sharedExperienceLog])

  useEffect(() => {
    localStorage.setItem('mayday-month-free-chat-round', String(monthFreeChatRound))
  }, [monthFreeChatRound])

  useEffect(() => {
    localStorage.setItem('mayday-month-free-chat-replied', String(monthFreeChatReplied))
  }, [monthFreeChatReplied])

  useEffect(() => {
    localStorage.setItem('mayday-month-free-chat-started', String(monthFreeChatStarted))
  }, [monthFreeChatStarted])

  useEffect(() => {
    localStorage.setItem('mayday-month-free-chat-replies', JSON.stringify(monthFreeChatReplies))
  }, [monthFreeChatReplies])

  useEffect(() => {
    if (callExperienceContext) localStorage.setItem('mayday-call-experience-context', JSON.stringify(callExperienceContext))
    else localStorage.removeItem('mayday-call-experience-context')
  }, [callExperienceContext])

  useEffect(() => {
    localStorage.setItem('mayday-call-history', JSON.stringify(callHistory))
  }, [callHistory])

  useEffect(() => {
    if (activeCallCharacter) {
      localStorage.setItem('mayday-active-call-character', activeCallCharacter)
      localStorage.setItem('mayday-call-round-index', String(callRoundIndex))
      localStorage.setItem('mayday-call-replied', String(callReplied))
      localStorage.setItem('mayday-call-transcript', JSON.stringify(callTranscript))
    } else {
      localStorage.removeItem('mayday-active-call-character')
      localStorage.removeItem('mayday-call-round-index')
      localStorage.removeItem('mayday-call-replied')
      localStorage.removeItem('mayday-call-transcript')
    }
  }, [activeCallCharacter, callRoundIndex, callReplied, callTranscript])

  useEffect(() => {
    if ((storyStage !== 'day2-complete' && storyStage !== 'month-visit-complete') || activeApp !== null || incomingCallCharacter || activeCallCharacter) return
    if (!pendingCallCharacter) {
      const eligible = freeTimeOrder.find((id) => routeAffection[id] >= AFFECTION_CALL_THRESHOLD && localStorage.getItem('mayday-call-v2-triggered-' + id) !== 'true')
      if (eligible) {
        setPendingCallCharacter(eligible)
        localStorage.setItem('mayday-pending-call', eligible)
      }
      return
    }

    const latestExperience = storyStage === 'month-visit-complete' && monthVisitTarget === pendingCallCharacter
      ? {
          character: pendingCallCharacter,
          source: 'month-visit' as const,
          date: saveGameDate,
          eventKey: monthVisitRoutes[pendingCallCharacter].title,
          day2StrollAccepted,
          choices: [...monthVisitReplies],
        }
      : sharedExperienceLog[pendingCallCharacter] ?? {
          character: pendingCallCharacter,
          source: 'day2' as const,
          date: saveGameDate,
          eventKey: day2StrollAccepted ? 'day2-stroll' : 'day2-after-ice',
          day2StrollAccepted,
        }
    setCallExperienceContext(latestExperience)
    localStorage.setItem('mayday-call-experience-context', JSON.stringify(latestExperience))
    setIncomingCallCharacter(pendingCallCharacter)
    localStorage.setItem('mayday-incoming-call', pendingCallCharacter)
    localStorage.setItem('mayday-call-v2-triggered-' + pendingCallCharacter, 'true')
    localStorage.removeItem('mayday-pending-call')
    setPendingCallCharacter(null)
  }, [storyStage, activeApp, pendingCallCharacter, incomingCallCharacter, activeCallCharacter, routeAffection, sharedExperienceLog, monthVisitTarget, monthVisitReplies, saveGameDate, day2StrollAccepted])

  useEffect(() => {
    if (activeApp === 'messages' && selectedSmsThread && messageScrollRef.current) {
      messageScrollRef.current.scrollTop = messageScrollRef.current.scrollHeight
    }
  }, [activeApp, selectedSmsThread, smsMessages, chatMessages, greetingRound, freeChatRound, monthFreeChatRound])

  useEffect(() => {
    if (activeCallCharacter && callTranscriptRef.current) {
      callTranscriptRef.current.scrollTop = callTranscriptRef.current.scrollHeight
    }
  }, [activeCallCharacter, callTranscript])

  const changeStage = (next: StoryStage) => {
    setStoryStage(next)
    localStorage.setItem('mayday-story-stage', next)
  }

  const pauseStory = () => {
    if (storyStage !== 'paused' && storyStage !== 'completed' && storyStage !== 'day2-complete') {
      setResumeStage(storyStage)
      localStorage.setItem('mayday-resume-stage', storyStage)
      changeStage('paused')
    }
  }

  const resumeStory = () => changeStage(resumeStage)

  const openMessagesApp = (thread: CharacterId | null = null) => {
    setSelectedSmsThread(thread)
    setActiveApp('messages')
    if (thread === 'wen' && storyStage === 'notification') changeStage('messages')
  }

  const openSmsThread = (thread: CharacterId) => {
    setSelectedSmsThread(thread)
    if (storyStage === 'notification' && thread === 'wen') changeStage('messages')
  }

  const appendChatMessages = (character: CharacterId, entries: NewChatEntry[], date = '10月15日・晚上') => {
    const stamp = Date.now()
    setChatMessages((current) => ({
      ...current,
      [character]: [
        ...(current[character] ?? []),
        ...entries.map((entry, index) => ({
          id: character + '-' + stamp + '-' + index,
          date,
          time: entry.time ?? '21:20',
          from: entry.from,
          text: entry.text,
        })),
      ],
    }))
  }

  const addRouteAffection = (character: CharacterId, amount: number) => {
    if (character === 'youda') return
    const previous = routeAffection[character]
    const next = previous + amount
    setRouteAffection((current) => ({ ...current, [character]: current[character] + amount }))
    const alreadyTriggered = localStorage.getItem('mayday-call-v2-triggered-' + character) === 'true'
    const alreadyPending = localStorage.getItem('mayday-pending-call') !== null || localStorage.getItem('mayday-incoming-call') !== null
    if (previous < AFFECTION_CALL_THRESHOLD && next >= AFFECTION_CALL_THRESHOLD && !alreadyTriggered && !alreadyPending) {
      setPendingCallCharacter(character)
      localStorage.setItem('mayday-pending-call', character)
    }
  }

  const finishGreetingPerson = () => {
    const nextIndex = greetingIndex + 1
    if (nextIndex < greetingOrder.length) {
      const nextCharacter = greetingOrder[nextIndex]
      setGreetingIndex(nextIndex)
      localStorage.setItem('mayday-greeting-index', String(nextIndex))
      setGreetingRound(0)
      localStorage.setItem('mayday-greeting-round', '0')
      setGreetingReplied(false)
      localStorage.setItem('mayday-greeting-replied', 'false')
      appendChatMessages(nextCharacter, [{ from: nextCharacter, text: greetingChats[nextCharacter][0].incoming }])
      setSelectedSmsThread(null)
      setActiveApp(null)
      return
    }
    localStorage.setItem('mayday-greetings-complete', 'true')
    setClassroomIntroReplied(false)
    localStorage.removeItem('mayday-classroom-intro-replied-v1')
    setClassroomReplySent(false)
    localStorage.removeItem('mayday-classroom-reply-sent-v2')
    setSelectedSmsThread(null)
    setActiveApp(null)
    appendChatMessages('wen', [
      { from: 'wen', text: '妳現在還在上課嗎？', time: '10:12' },
      { from: 'wen', text: '下課要不要去吃冰？', time: '10:12' },
    ], '10月16日・上午')
    changeStage('classroom')
  }

  const chooseGreetingReply = (choiceIndex: number) => {
    if (greetingReplied) return
    const character = greetingOrder[greetingIndex]
    const round = greetingChats[character][greetingRound]
    const choice = round?.choices[choiceIndex]
    if (!choice) return
    appendChatMessages(character, [
      { from: 'me', text: choice.text },
      ...choice.response.map((text) => ({ from: character, text })),
    ])
    addRouteAffection(character, choice.affection)
    setGreetingReplied(true)
    localStorage.setItem('mayday-greeting-replied', 'true')
  }

  const continueGreeting = () => {
    if (!greetingReplied) return
    const character = greetingOrder[greetingIndex]
    if (greetingRound >= greetingChats[character].length - 1) {
      finishGreetingPerson()
      return
    }
    const nextRound = greetingRound + 1
    setGreetingRound(nextRound)
    localStorage.setItem('mayday-greeting-round', String(nextRound))
    setGreetingReplied(false)
    localStorage.setItem('mayday-greeting-replied', 'false')
    appendChatMessages(character, [{ from: character, text: greetingChats[character][nextRound].incoming }])
  }

  const chooseClassroomIntro = (choiceIndex: number) => {
    if (classroomIntroReplied || classroomReplySent) return
    const choice = classroomIntroChoices[choiceIndex]
    if (!choice) return
    appendChatMessages('wen', [
      { from: 'me', text: choice.text, time: '10:13' },
      ...choice.response.map((text) => ({ from: 'wen' as const, text, time: '10:13' })),
    ], '10月16日・上午')
    addRouteAffection('wen', choice.affection)
    setClassroomIntroReplied(true)
    localStorage.setItem('mayday-classroom-intro-replied-v1', 'true')
  }

  const chooseClassroomReply = (choiceIndex: number) => {
    if (!classroomIntroReplied || classroomReplySent) return
    const choice = classroomChoices[choiceIndex]
    if (!choice) return
    appendChatMessages('wen', [
      { from: 'me', text: choice.text, time: '10:14' },
      ...choice.response.map((text) => ({ from: 'wen' as const, text, time: '10:14' })),
    ], '10月16日・上午')
    addRouteAffection('wen', choice.affection)
    setClassroomReplySent(true)
    localStorage.setItem('mayday-classroom-reply-sent-v2', 'true')
  }

  const startMasaCheckIn = () => {
    setMasaCheckInSent(false)
    setMasaCheckInRound(0)
    setMasaCheckInReplied(false)
    localStorage.setItem('mayday-masa-checkin-complete-v2', 'false')
    localStorage.setItem('mayday-masa-checkin-round-v2', '0')
    localStorage.setItem('mayday-masa-checkin-replied-v2', 'false')
    setSelectedSmsThread('masa')
    setActiveApp('messages')
    changeStage('masa-checkin')
  }

  const chooseMasaCheckIn = (choiceIndex: number) => {
    if (masaCheckInSent || masaCheckInReplied) return
    const choices = masaCheckinRounds[masaCheckInRound]
    const choice = choices?.[choiceIndex]
    if (!choice) return
    const minute = 15 + masaCheckInRound
    const time = '10:' + String(minute).padStart(2, '0')
    appendChatMessages('masa', [
      { from: 'me', text: choice.text, time },
      ...choice.response.map((text) => ({ from: 'masa' as const, text, time })),
    ], '10月16日・上午')
    addRouteAffection('masa', choice.affection)
    setMasaCheckInReplied(true)
    localStorage.setItem('mayday-masa-checkin-replied-v2', 'true')
    if (masaCheckInRound === masaCheckinRounds.length - 1) {
      setMasaCheckInSent(true)
      localStorage.setItem('mayday-masa-checkin-complete-v2', 'true')
    }
  }

  const continueMasaCheckIn = () => {
    if (!masaCheckInReplied || masaCheckInSent || masaCheckInRound >= masaCheckinRounds.length - 1) return
    const nextRound = masaCheckInRound + 1
    setMasaCheckInRound(nextRound)
    setMasaCheckInReplied(false)
    localStorage.setItem('mayday-masa-checkin-round-v2', String(nextRound))
    localStorage.setItem('mayday-masa-checkin-replied-v2', 'false')
  }

  const startStoneCheckIn = () => {
    setSelectedSmsThread('stone')
    setActiveApp('messages')
    changeStage('stone-checkin')
  }

  const chooseStoneCheckIn = (choiceIndex: number) => {
    if (stoneCheckInSent) return
    const choice = stoneCheckinChoices[choiceIndex]
    if (!choice) return
    appendChatMessages('stone', [
      { from: 'me', text: choice.text, time: '10:18' },
      ...choice.response.map((text) => ({ from: 'stone' as const, text, time: '10:18' })),
    ], '10月16日・上午')
    addRouteAffection('stone', choice.affection)
    setStoneCheckInSent(true)
    localStorage.setItem('mayday-stone-checkin-sent', 'true')
  }

  const goToIceDate = () => {
    setSelectedSmsThread(null)
    setActiveApp(null)
    changeStage('ice-date')
  }

  const chooseAfterIcePlan = (accept: boolean) => {
    setDay2StrollAccepted(accept)
    localStorage.setItem('mayday-day2-after-ice-choice', accept ? 'accept' : 'decline')
    setSelectedSmsThread(null)
    setActiveApp(null)
    addRouteAffection('wen', accept ? 2 : 1)
    if (accept) {
      changeStage('stroll')
    } else {
      setDay2DiaryUnlocked(true)
      localStorage.setItem('mayday-day2-diary-unlocked', 'true')
      changeStage('day2-diary')
    }
  }

  const finishStroll = () => {
    setDay2DiaryUnlocked(true)
    localStorage.setItem('mayday-day2-diary-unlocked', 'true')
    setSelectedSmsThread(null)
    setActiveApp(null)
    changeStage('day2-diary')
  }

  const startDay2FreeTime = () => {
    const day2Experiences = {
      ...sharedExperienceLog,
      wen: {
        character: 'wen' as const,
        source: 'day2' as const,
        date: saveGameDate,
        eventKey: day2StrollAccepted ? 'day2-stroll-and-bookstore' : 'day2-ice-and-walk-home',
        day2StrollAccepted,
      },
      ashin: {
        character: 'ashin' as const,
        source: 'day2' as const,
        date: saveGameDate,
        eventKey: 'day2-campus-ice-and-record-store',
        day2StrollAccepted,
      },
    }
    setSharedExperienceLog(day2Experiences)
    localStorage.setItem('mayday-shared-experience-log', JSON.stringify(day2Experiences))
    setFreeChatTarget(null)
    localStorage.removeItem('mayday-free-chat-target')
    setFreeChatRound(0)
    localStorage.setItem('mayday-free-chat-round', '0')
    setFreeChatReplied(false)
    localStorage.setItem('mayday-free-chat-replied', 'false')
    localStorage.removeItem('mayday-free-chat-complete')
    setSelectedSmsThread(null)
    setActiveApp(null)
    changeStage('free-time')
  }

  const getFreeTimeRounds = (character: RouteCharacterId): ChatRound[] => {
    if (character === 'wen') return day2StrollAccepted ? wenStrollFreeTimeChats : wenHomeFreeTimeChats
    if (character === 'ashin') return ashinAfternoonFreeTimeChats
    return freeTimeChats[character]
  }

  const getCallRounds = (character: RouteCharacterId): ChatRound[] => {
    const context = callExperienceContext?.character === character
      ? callExperienceContext
      : sharedExperienceLog[character] ?? {
          character,
          source: 'day2' as const,
          date: saveGameDate,
          eventKey: day2StrollAccepted ? 'day2-stroll' : 'day2-after-ice',
          day2StrollAccepted,
        }
    const earlierRouteRounds = character === 'wen'
      ? (context.day2StrollAccepted ? wenStrollCallScript : wenHomeCallScript)
      : thresholdCallScripts[character]
    const selectedRounds = context.source === 'month-visit' || context.source === 'month-free-chat'
      ? monthVisitCallScripts[character]
      : context.source === 'free-chat'
        ? [freeChatCallOpeners[character], ...earlierRouteRounds.slice(1)]
        : earlierRouteRounds

    if (context.date === saveGameDate) return selectedRounds
    const adjustTimeReference = (value: string) => value
      .replace(/今天/g, '那天')
      .replace(/剛剛/g, '那時候')
      .replace(/明天/g, '之後')
      .replace(/今晚/g, '那天晚上')
    return selectedRounds.map((round) => ({
      ...round,
      incoming: adjustTimeReference(round.incoming),
      choices: round.choices.map((choice) => ({
        ...choice,
        text: adjustTimeReference(choice.text),
        response: choice.response.map(adjustTimeReference),
      })),
    }))
  }

  const startFreeChat = (character: RouteCharacterId) => {
    if (freeChatTarget || localStorage.getItem('mayday-free-chat-target')) return
    setFreeChatTarget(character)
    localStorage.setItem('mayday-free-chat-target', character)
    setFreeChatRound(0)
    localStorage.setItem('mayday-free-chat-round', '0')
    setFreeChatReplied(false)
    localStorage.setItem('mayday-free-chat-replied', 'false')
    appendChatMessages(character, [{ from: character, text: getFreeTimeRounds(character)[0].incoming, time: '18:06' }], '10月16日・傍晚')
    setSelectedSmsThread(character)
    setActiveApp('messages')
    changeStage('free-chat')
  }

  const chooseFreeChatReply = (choiceIndex: number) => {
    if (!freeChatTarget || freeChatReplied) return
    const round = getFreeTimeRounds(freeChatTarget)[freeChatRound]
    const choice = round?.choices[choiceIndex]
    if (!choice) return
    appendChatMessages(freeChatTarget, [
      { from: 'me', text: choice.text, time: '18:' + String(7 + freeChatRound).padStart(2, '0') },
      ...choice.response.map((text) => ({ from: freeChatTarget, text, time: '18:' + String(7 + freeChatRound).padStart(2, '0') })),
    ], '10月16日・傍晚')
    addRouteAffection(freeChatTarget, choice.affection)
    if (freeChatRound < 4) {
      const nextRound = freeChatRound + 1
      setFreeChatRound(nextRound)
      localStorage.setItem('mayday-free-chat-round', String(nextRound))
      appendChatMessages(freeChatTarget, [{ from: freeChatTarget, text: getFreeTimeRounds(freeChatTarget)[nextRound].incoming, time: '18:' + String(8 + nextRound).padStart(2, '0') }], '10月16日・傍晚')
      setFreeChatReplied(false)
      localStorage.setItem('mayday-free-chat-replied', 'false')
    } else {
      setFreeChatReplied(true)
      localStorage.setItem('mayday-free-chat-replied', 'true')
    }
  }

  const answerIncomingCall = () => {
    if (!incomingCallCharacter) return
    const character = incomingCallCharacter
    const rounds = getCallRounds(character)
    setActiveCallCharacter(character)
    setIncomingCallCharacter(null)
    setCallRoundIndex(0)
    setCallReplied(false)
    setCallTranscript([{ speaker: character, text: rounds[0].incoming }])
    localStorage.removeItem('mayday-incoming-call')
  }

  const chooseCallReply = (choiceIndex: number) => {
    if (!activeCallCharacter || callReplied) return
    const rounds = getCallRounds(activeCallCharacter)
    const currentRound = rounds[callRoundIndex]
    const choice = currentRound?.choices[choiceIndex]
    if (!choice) return

    const nextTranscript: CallTranscriptLine[] = [
      { speaker: 'me', text: choice.text },
      ...choice.response.map((text) => ({ speaker: activeCallCharacter, text })),
    ]
    const nextRoundIndex = callRoundIndex + 1
    if (nextRoundIndex < rounds.length) {
      nextTranscript.push({ speaker: activeCallCharacter, text: rounds[nextRoundIndex].incoming })
    }
    setCallTranscript((current) => [...current, ...nextTranscript])
    addRouteAffection(activeCallCharacter, choice.affection)

    if (nextRoundIndex < rounds.length) {
      setCallRoundIndex(nextRoundIndex)
    } else {
      setCallReplied(true)
    }
  }

  const finishThresholdCall = () => {
    if (!activeCallCharacter || !callReplied) return
    setCallHistory((current) => [{ id: 'call-' + Date.now(), character: activeCallCharacter, status: 'answered', time: '18:38', date: saveGameDate }, ...current])
    setActiveCallCharacter(null)
    setCallRoundIndex(0)
    setCallReplied(false)
    setCallTranscript([])
    setCallExperienceContext(null)
    localStorage.removeItem('mayday-call-experience-context')
  }

  const finishFreeChat = () => {
    if (!freeChatTarget || !freeChatReplied || freeChatRound !== 4) return
    const freeChatExperience: CharacterExperienceRecord = {
      character: freeChatTarget,
      source: 'free-chat',
      date: saveGameDate,
      eventKey: 'day2-free-chat',
      day2StrollAccepted,
    }
    const nextExperienceLog = { ...sharedExperienceLog, [freeChatTarget]: freeChatExperience }
    setSharedExperienceLog(nextExperienceLog)
    localStorage.setItem('mayday-shared-experience-log', JSON.stringify(nextExperienceLog))
    localStorage.setItem('mayday-free-chat-complete', 'true')
    setSelectedSmsThread(null)
    setActiveApp(null)
    changeStage('day2-complete')
  }

  const startMonthFreeTime = () => {
    setMonthVisitTarget(null)
    setMonthVisitReplies([])
    setMonthFreeChatRound(0)
    setMonthFreeChatReplied(false)
    setMonthFreeChatStarted(false)
    setMonthFreeChatReplies([])
    localStorage.removeItem('mayday-month-visit-target')
    localStorage.removeItem('mayday-month-visit-choice')
    localStorage.removeItem('mayday-month-visit-replies')
    localStorage.removeItem('mayday-month-visit-complete')
    localStorage.removeItem('mayday-month-free-chat-round')
    localStorage.removeItem('mayday-month-free-chat-replied')
    localStorage.removeItem('mayday-month-free-chat-started')
    localStorage.removeItem('mayday-month-free-chat-replies')
    localStorage.removeItem('mayday-month-free-chat-complete')
    localStorage.removeItem('mayday-month-day-complete')
    setSelectedSmsThread(null)
    setActiveApp(null)
    changeStage('month-free-time')
  }

  const startMonthVisit = (character: RouteCharacterId) => {
    if (monthVisitTarget || localStorage.getItem('mayday-month-visit-target')) return
    setMonthVisitTarget(character)
    setMonthVisitReplies([])
    localStorage.setItem('mayday-month-visit-target', character)
    localStorage.setItem('mayday-month-visit-replies', '[]')
    localStorage.removeItem('mayday-month-visit-choice')
    changeStage('month-visit')
  }

  const chooseMonthVisitReply = (choiceIndex: number) => {
    if (!monthVisitTarget || monthVisitReplies.length >= 3) return
    const round = monthVisitRoutes[monthVisitTarget].rounds[monthVisitReplies.length]
    const choice = round?.choices[choiceIndex]
    if (!choice) return
    const nextReplies = [...monthVisitReplies, choiceIndex]
    setMonthVisitReplies(nextReplies)
    localStorage.setItem('mayday-month-visit-replies', JSON.stringify(nextReplies))
    localStorage.removeItem('mayday-month-visit-choice')
    addRouteAffection(monthVisitTarget, choice.affection)
  }

  const finishMonthVisit = () => {
    if (!monthVisitTarget || monthVisitReplies.length !== monthVisitRoutes[monthVisitTarget].rounds.length) return
    const visitExperience: CharacterExperienceRecord = {
      character: monthVisitTarget,
      source: 'month-visit',
      date: saveGameDate,
      eventKey: monthVisitRoutes[monthVisitTarget].title,
      day2StrollAccepted,
      choices: [...monthVisitReplies],
    }
    const nextExperienceLog = { ...sharedExperienceLog, [monthVisitTarget]: visitExperience }
    setSharedExperienceLog(nextExperienceLog)
    localStorage.setItem('mayday-shared-experience-log', JSON.stringify(nextExperienceLog))
    localStorage.setItem('mayday-month-visit-complete', 'true')
    changeStage('month-visit-complete')
  }

  const startMonthFreeChat = () => {
    if (!monthVisitTarget) return
    const character = monthVisitTarget
    if (localStorage.getItem('mayday-month-free-chat-started') === 'true') {
      setSelectedSmsThread(character)
      setActiveApp('messages')
      changeStage('month-free-chat')
      return
    }
    setMonthFreeChatStarted(true)
    localStorage.setItem('mayday-month-free-chat-started', 'true')
    setMonthFreeChatOpeningSent(false)
    localStorage.setItem('mayday-month-free-chat-opening-sent', 'false')
    setMonthFreeChatRound(0)
    localStorage.setItem('mayday-month-free-chat-round', '0')
    setMonthFreeChatReplied(false)
    localStorage.setItem('mayday-month-free-chat-replied', 'false')
    setMonthFreeChatReplies([])
    localStorage.setItem('mayday-month-free-chat-replies', '[]')
    setSelectedSmsThread(character)
    setActiveApp('messages')
    changeStage('month-free-chat')
  }

  const chooseMonthFreeChatOpening = (choiceIndex: number) => {
    if (!monthVisitTarget || !monthFreeChatStarted || monthFreeChatOpeningSent) return
    const character = monthVisitTarget
    const opening = monthFreeChatOpeners[character][choiceIndex]
    if (!opening) return
    appendChatMessages(character, [
      { from: 'me', text: opening.text, time: '18:10' },
      { from: character, text: opening.response, time: '18:11' },
      { from: character, text: monthFreeChatScripts[character][0].incoming, time: '18:12' },
    ], '11月16日・晚上')
    setMonthFreeChatOpeningSent(true)
    localStorage.setItem('mayday-month-free-chat-opening-sent', 'true')
  }

  const chooseMonthFreeChatReply = (choiceIndex: number) => {
    if (!monthVisitTarget || !monthFreeChatOpeningSent || monthFreeChatReplied) return
    const character = monthVisitTarget
    const round = monthFreeChatScripts[character][monthFreeChatRound]
    const choice = round?.choices[choiceIndex]
    if (!choice) return
    const minute = 13 + monthFreeChatRound * 2
    const time = '18:' + String(minute).padStart(2, '0')
    appendChatMessages(character, [
      { from: 'me', text: choice.text, time },
      ...choice.response.map((text) => ({ from: character, text, time })),
    ], '11月16日・晚上')
    const nextReplies = [...monthFreeChatReplies, choiceIndex]
    setMonthFreeChatReplies(nextReplies)
    localStorage.setItem('mayday-month-free-chat-replies', JSON.stringify(nextReplies))
    addRouteAffection(character, choice.affection)
    if (monthFreeChatRound < monthFreeChatScripts[character].length - 1) {
      const nextRound = monthFreeChatRound + 1
      setMonthFreeChatRound(nextRound)
      localStorage.setItem('mayday-month-free-chat-round', String(nextRound))
      appendChatMessages(character, [{ from: character, text: monthFreeChatScripts[character][nextRound].incoming, time: '18:' + String(minute + 1).padStart(2, '0') }], '11月16日・晚上')
      setMonthFreeChatReplied(false)
      localStorage.setItem('mayday-month-free-chat-replied', 'false')
    } else {
      setMonthFreeChatReplied(true)
      localStorage.setItem('mayday-month-free-chat-replied', 'true')
    }
  }

  const finishMonthFreeChat = () => {
    if (!monthVisitTarget || !monthFreeChatStarted || !monthFreeChatOpeningSent || !monthFreeChatReplied || monthFreeChatRound !== 4 || monthFreeChatReplies.length !== 5) return
    const experience: CharacterExperienceRecord = {
      character: monthVisitTarget,
      source: 'month-free-chat',
      date: saveGameDate,
      eventKey: monthVisitRoutes[monthVisitTarget].title + '・晚間自由對話',
      day2StrollAccepted,
      choices: [...monthFreeChatReplies],
    }
    const nextExperienceLog = { ...sharedExperienceLog, [monthVisitTarget]: experience }
    setSharedExperienceLog(nextExperienceLog)
    localStorage.setItem('mayday-shared-experience-log', JSON.stringify(nextExperienceLog))
    localStorage.setItem('mayday-month-free-chat-complete', 'true')
    setSelectedSmsThread(null)
    setActiveApp(null)
    changeStage('month-diary')
  }

  const finishMonthChapter = () => {
    setSelectedSmsThread(null)
    setActiveApp(null)
    localStorage.setItem('mayday-month-day-complete', 'true')
    changeStage('completed')
  }

  const chooseReunionReply = (key: ReunionReplyKey) => {
    const selected = reunionReplies[key]
    const nextAffection = wenAffection + selected.affection
    addRouteAffection('wen', selected.affection)
    setWenAffection(nextAffection)
    localStorage.setItem('mayday-affection-wen', String(nextAffection))
    setReunionReplyKey(key)
    localStorage.setItem('mayday-reunion-reply', key)
  }

  const chooseNicknameQuestion = (key: NicknameQuestionKey) => {
    const selected = nicknameQuestions[key]
    const nextAffection = marthaAffection + selected.affection
    addRouteAffection('masa', selected.affection)
    setMarthaAffection(nextAffection)
    localStorage.setItem('mayday-affection-martha', String(nextAffection))
    setNicknameQuestionKey(key)
    localStorage.setItem('mayday-nickname-question', key)
  }

  const chooseDinnerReply = (key: DinnerReplyKey) => {
    if (dinnerReplyKey) return
    const selected = dinnerReplies[key]
    const nextAffection = marthaAffection + selected.affection
    addRouteAffection('masa', selected.affection)
    setDinnerReplyKey(key)
    setMarthaAffection(nextAffection)
    localStorage.setItem('mayday-dinner-reply', key)
    localStorage.setItem('mayday-affection-martha', String(nextAffection))
  }

  const finishFirstChapter = () => {
    const firstChapterExperiences = freeTimeOrder.reduce((records, character) => {
      records[character] = {
        character,
        source: 'first-chapter',
        date: saveGameDate,
        eventKey: 'first-rehearsal-room-meeting',
        day2StrollAccepted: false,
      }
      return records
    }, {} as Partial<Record<RouteCharacterId, CharacterExperienceRecord>>)
    setSharedExperienceLog(firstChapterExperiences)
    localStorage.setItem('mayday-shared-experience-log', JSON.stringify(firstChapterExperiences))
    setFirstChapterComplete(true)
    localStorage.setItem('mayday-chapter1-complete', 'true')
    localStorage.removeItem('mayday-greetings-complete')
    const initialChats: Record<CharacterId, SmsMessage[]> = { wen: [], masa: [], ashin: [], stone: [], yanming: [], youda: [] }
    initialChats.wen = [{ id: 'greeting-wen-0', date: '10月15日・晚上', time: '21:18', from: 'wen', text: greetingChats.wen[0].incoming }]
    setChatMessages(initialChats)
    localStorage.setItem('mayday-chat-messages', JSON.stringify(initialChats))
    setGreetingIndex(0)
    localStorage.setItem('mayday-greeting-index', '0')
    setGreetingRound(0)
    localStorage.setItem('mayday-greeting-round', '0')
    setGreetingReplied(false)
    localStorage.setItem('mayday-greeting-replied', 'false')
    setClassroomReplySent(false)
    setClassroomIntroReplied(false)
    localStorage.removeItem('mayday-classroom-intro-replied-v1')
    localStorage.removeItem('mayday-classroom-reply-sent')
    localStorage.removeItem('mayday-classroom-reply-sent-v2')
    setMasaCheckInSent(false)
    setMasaCheckInRound(0)
    setMasaCheckInReplied(false)
    localStorage.removeItem('mayday-masa-checkin-sent')
    localStorage.removeItem('mayday-masa-checkin-complete-v2')
    localStorage.removeItem('mayday-masa-checkin-round-v2')
    localStorage.removeItem('mayday-masa-checkin-replied-v2')
    setStoneCheckInSent(false)
    localStorage.removeItem('mayday-stone-checkin-sent')
    setFreeChatTarget(null)
    localStorage.removeItem('mayday-free-chat-target')
    setFreeChatRound(0)
    localStorage.removeItem('mayday-free-chat-round')
    setFreeChatReplied(false)
    localStorage.removeItem('mayday-free-chat-replied')
    localStorage.removeItem('mayday-free-chat-complete')
    setSelectedProfile(null)
    setSelectedSmsThread(null)
    setActiveApp('contacts')
    changeStage('greetings')
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
    ;['mayday-player-name', 'mayday-story-stage', 'mayday-studio-step', 'mayday-reply', 'mayday-affection-wen', 'mayday-reunion-reply', 'mayday-nickname-question', 'mayday-dinner-reply', 'mayday-affection-martha', 'mayday-chapter1-complete', 'mayday-resume-stage', 'mayday-sms-messages', 'mayday-chat-messages', 'mayday-greetings-complete', 'mayday-greeting-index', 'mayday-greeting-round', 'mayday-greeting-replied', 'mayday-classroom-reply-sent', 'mayday-classroom-reply-sent-v2', 'mayday-classroom-intro-replied-v1', 'mayday-masa-checkin-sent', 'mayday-masa-checkin-complete-v2', 'mayday-masa-checkin-round-v2', 'mayday-masa-checkin-replied-v2', 'mayday-stone-checkin-sent', 'mayday-free-chat-target', 'mayday-free-chat-round', 'mayday-free-chat-replied', 'mayday-free-chat-complete', 'mayday-month-visit-target', 'mayday-month-visit-choice', 'mayday-month-visit-replies', 'mayday-month-visit-complete', 'mayday-month-free-chat-round', 'mayday-month-free-chat-replied', 'mayday-month-free-chat-started', 'mayday-month-free-chat-replies', 'mayday-month-free-chat-complete', 'mayday-month-day-complete', 'mayday-route-affection', 'mayday-shared-experience-log', 'mayday-call-experience-context', 'mayday-day2-after-ice-choice', 'mayday-day2-diary-unlocked', 'mayday-call-history', 'mayday-pending-call', 'mayday-incoming-call', 'mayday-call-triggered-wen', 'mayday-call-triggered-masa', 'mayday-call-triggered-ashin', 'mayday-call-triggered-stone', 'mayday-call-triggered-yanming', 'mayday-call-v2-triggered-wen', 'mayday-call-v2-triggered-masa', 'mayday-call-v2-triggered-ashin', 'mayday-call-v2-triggered-stone', 'mayday-call-v2-triggered-yanming', 'mayday-active-call-character', 'mayday-call-round-index', 'mayday-call-replied', 'mayday-call-transcript'].forEach((key) => localStorage.removeItem(key))
    SAVE_SLOT_IDS.forEach((slot) => localStorage.removeItem(SAVE_SLOT_PREFIX + slot))
    setPlayerName('')
    setNameDraft('')
    setActiveApp(null)
    setSelectedSmsThread(null)
    setSmsMessages(createInitialSmsMessages())
    setStudioStep(0)
    setReplyKey(null)
    setWenAffection(0)
    setReunionReplyKey(null)
    setNicknameQuestionKey(null)
    setDinnerReplyKey(null)
    setMarthaAffection(0)
    setFirstChapterComplete(false)
    setChatMessages({ wen: [], masa: [], ashin: [], stone: [], yanming: [], youda: [] })
    setGreetingIndex(0)
    setGreetingRound(0)
    setGreetingReplied(false)
    setClassroomReplySent(false)
    setClassroomIntroReplied(false)
    setMasaCheckInSent(false)
    setMasaCheckInRound(0)
    setMasaCheckInReplied(false)
    setStoneCheckInSent(false)
    setFreeChatTarget(null)
    setFreeChatRound(0)
    setFreeChatReplied(false)
    setMonthVisitTarget(null)
    setMonthVisitReplies([])
    setMonthFreeChatRound(0)
    setMonthFreeChatReplied(false)
    setMonthFreeChatStarted(false)
    setMonthFreeChatReplies([])
    setRouteAffection({ wen: 0, masa: 0, ashin: 0, stone: 0, yanming: 0 })
    setSharedExperienceLog({})
    setCallExperienceContext(null)
    setDay2StrollAccepted(false)
    setDay2DiaryUnlocked(false)
    setSelectedDiaryDate(null)
    setPendingCallCharacter(null)
    setIncomingCallCharacter(null)
    setActiveCallCharacter(null)
    setCallRoundIndex(0)
    setCallReplied(false)
    setCallTranscript([])
    setCallHistory([])
    setSaveSlots({ 1: null, 2: null, 3: null })
    setSaveFeedback('')
    setSelectedProfile(null)
    setResumeStage('reunion')
    setShowResetConfirm(false)
    setStoryStage('notification')
    setShowNameSetup(true)
  }

  const chooseReply = (key: ReplyKey) => {
    if (replyKey) return
    const selected = replies[key]
    const nextAffection = wenAffection + selected.affection
    addRouteAffection('wen', selected.affection)
    setReplyKey(key)
    setWenAffection(nextAffection)
    localStorage.setItem('mayday-reply', key)
    localStorage.setItem('mayday-affection-wen', String(nextAffection))
    setSmsMessages((current) => current.some((message) => message.id === 'story-reply-player') ? current : [
      ...current,
      { id: 'story-reply-player', date: '今天', time: '15:43', from: 'me', text: selected.text },
      ...selected.response.map((text, index) => ({ id: `story-reply-wen-${index}`, date: '今天', time: index === 0 ? '15:43' : '15:44', from: 'wen' as const, text })),
    ])
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
  const latestSmsMessage = smsMessages[smsMessages.length - 1]
  const selectedContactProfile = unlockedContacts.find((contact) => contact.id === selectedProfile) ?? null
  const currentGreetingId = greetingOrder[Math.min(greetingIndex, greetingOrder.length - 1)]
  const currentMonthVisit = monthVisitTarget ? monthVisitRoutes[monthVisitTarget] : null
  const currentMonthVisitRound = currentMonthVisit?.rounds[monthVisitReplies.length] ?? null
  const currentGreetingRound = greetingChats[currentGreetingId][Math.min(greetingRound, greetingChats[currentGreetingId].length - 1)]
  const currentThreadMessages: SmsMessage[] = selectedSmsThread === 'wen'
    ? [...smsMessages, ...(chatMessages.wen ?? [])]
    : selectedSmsThread ? (chatMessages[selectedSmsThread] ?? []) : []
  const inboxThreads = characterInfo.filter((person) => person.id === 'wen' || (chatMessages[person.id]?.length ?? 0) > 0).map((person) => ({
    ...person,
    latest: person.id === 'wen'
      ? (chatMessages.wen?.[chatMessages.wen.length - 1]?.text ?? latestSmsMessage?.text ?? '尚無訊息')
      : (chatMessages[person.id]?.[chatMessages[person.id].length - 1]?.text ?? '尚無訊息'),
    time: person.id === 'wen'
      ? (chatMessages.wen?.[chatMessages.wen.length - 1]?.time ?? latestSmsMessage?.time ?? '15:42')
      : (chatMessages[person.id]?.[chatMessages[person.id].length - 1]?.time ?? '21:20'),
  }))

  return (
    <main className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="page-heading">
        <div className="project-mark"><Heart size={14} fill="currentColor" /> A LITTLE STORY · 1996—1999</div>
        <h1>那年夏天，還有未讀訊息</h1>
        <p>從一九九六年開始，把心事慢慢寫給你。</p>
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
                  <span>{calendarWeekday}</span>
                  <strong>{String(Number(calendarMonth)).padStart(2, '0')}<span>.</span>{String(Number(calendarDay)).padStart(2, '0')}</strong>
                  <small>{calendarYear} · 台北</small>
                </div>
                <div className="screen-greeting">
                  <span>嗨，{playerName || '新朋友'}</span>
                  <small>喜歡一個人的時候，連夏天都會變慢。</small>
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
                          <small>不同說法會影響溫尚翊對你的感覺，有些回答也可能讓氣氛變尷尬。</small>
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
                          <small>問法不同，他的反應也會不同；太直接有時候會踩到雷。</small>
                        </div>
                      </>
                    ) : (
                      <>
                        <StoryBlocks blocks={nicknameStoryBlocks(nicknameQuestions[nicknameQuestionKey].text, nicknameQuestions[nicknameQuestionKey].response)} />
                        <div className="reunion-pause-note">那時候大家喊的是 Masa；後來，這個名字才以「瑪莎」的字樣被更多人認識。</div>
                        <div className="story-action-bar">
                          <button className="story-primary-button" onClick={() => changeStage('rehearsal')}>回到練團室，聽他們演奏 <ChevronRight size={15} /></button>
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

              {storyStage === 'rehearsal' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">第一章</div>
                    <div className="story-contact-title">
                      <strong>第一次聽他們練團</strong>
                      <small>練團室・傍晚</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">鼓聲落下以後</div>
                    <h2 className="story-scene-title">還沒開始，就先吵起來了</h2>
                    <StoryBlocks blocks={rehearsalBlocks} />
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={() => changeStage('dinner')}>練團結束，跟大家去吃飯 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'dinner' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">第一章</div>
                    <div className="story-contact-title">
                      <strong>練團後的晚餐</strong>
                      <small>台北・熱炒店・晚上</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">晚上七點多・一桌人的好奇心</div>
                    <h2 className="story-scene-title">「妳跟 Masa 怎麼認識的？」</h2>
                    <StoryBlocks blocks={dinnerIntroBlocks} />
                    {dinnerReplyKey === null ? (
                      <div className="choice-area">
                        <div className="choice-heading">你想怎麼回答？</div>
                        <button className="reply-choice" onClick={() => chooseDinnerReply('a')}><span>我們小時候住得很近，常常一起玩。</span><ChevronRight size={15} /></button>
                        <button className="reply-choice" onClick={() => chooseDinnerReply('b')}><span>他小時候就很愛惹我，現在完全沒變，甚至變本加厲。</span><ChevronRight size={15} /></button>
                        <button className="reply-choice" onClick={() => chooseDinnerReply('c')}><span>我們本來說好搬家後要繼續聯絡，後來卻失聯了。</span><ChevronRight size={15} /></button>
                        <small>你怎麼介紹這段過去，也會影響瑪莎對你的好感。</small>
                      </div>
                    ) : (
                      <>
                        <StoryBlocks blocks={dinnerReplies[dinnerReplyKey].blocks} />
                      </>
                    )}
                  </div>
                  {dinnerReplyKey !== null && (
                    <div className="story-action-bar">
                      <button className="story-primary-button" onClick={() => changeStage('after-dinner')}>飯後，和瑪莎說幾句話 <ChevronRight size={15} /></button>
                    </div>
                  )}
                </div>
              )}

              {storyStage === 'after-dinner' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">第一章</div>
                    <div className="story-contact-title">
                      <strong>有些話，還是想問清楚</strong>
                      <small>熱炒店外・夜晚</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">久別重逢之後</div>
                    <h2 className="story-scene-title">那張被雨淋濕的地址紙</h2>
                    <StoryBlocks blocks={afterDinnerBlocks} />
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={() => changeStage('ending')}>和溫尚翊一起回家 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'ending' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">第一章</div>
                    <div className="story-contact-title">
                      <strong>今天的最後一頁</strong>
                      <small>回到家・21:12</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">1996 年・台北</div>
                    <h2 className="story-scene-title">今天居然遇到了瑪莎</h2>
                    <StoryBlocks blocks={endingBlocks} />
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={finishFirstChapter}>看看手機裡的新紀錄 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'classroom' && activeApp === null && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">第二天</div>
                    <div className="story-contact-title">
                      <strong>課堂間的訊息</strong>
                      <small>1996 年 10 月 16 日・上午</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">台灣大學・上午的課</div>
                    <h2 className="story-scene-title">桌肚裡的手機震了一下</h2>
                    <StoryBlocks blocks={[
                      { kind: 'narration', text: '第二天上午，你坐在教室靠窗的位置，課本攤在桌上，筆記才抄到一半。教授轉過身，在黑板上寫下一整排公式，粉筆聲在教室裡輕輕響著。' },
                      { kind: 'narration', text: '桌肚裡的手機忽然震了一下。你低頭看了一眼，螢幕上跳出溫尚翊的名字。這個人明明也在上課，居然還有空偷偷傳訊息。' },
                      { kind: 'narration', text: '你把手機往桌子底下挪了挪，確認教授還背對著大家，才點開那則訊息。' },
                    ]} />
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={() => openMessagesApp('wen')}>偷偷看一下溫尚翊的訊息 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'ice-date' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">第二天</div>
                    <div className="story-contact-title">
                      <strong>下課後的冰店</strong>
                      <small>台北・校園附近・下午</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">十月十六日・午後</div>
                    <h2 className="story-scene-title">臨時多出來的約會</h2>
                    <StoryBlocks blocks={[
                      { kind: 'narration', text: '下課鐘聲一響，你把筆記本塞進包裡，才剛走出教室，就看見溫尚翊靠在走廊邊等你。他手裡拿著兩張折起來的講義，像是剛剛也才匆匆收好東西。' },
                      { kind: 'dialogue', speaker: '溫尚翊', text: '走啦，不是說好要去吃冰？' },
                      { kind: 'dialogue', speaker: '你', text: '我還以為你會先去練團室。' },
                      { kind: 'dialogue', speaker: '溫尚翊', text: '今天不是跟妳說了，人都被留下來了。先吃冰比較重要。' },
                      { kind: 'narration', text: '他帶你拐進學校附近一條不算寬的巷子。冰店開在騎樓底下，門口掛著褪色的招牌，玻璃櫃裡一格一格放著紅豆、芋頭、花生和各種配料。店裡的電風扇慢慢轉著，空氣裡有糖水和碎冰的涼意。' },
                      { kind: 'dialogue', speaker: '溫尚翊', text: '妳要吃什麼？' },
                      { kind: 'dialogue', speaker: '你', text: '你推薦啊，你不是常來？' },
                      { kind: 'dialogue', speaker: '溫尚翊', text: '紅豆牛奶冰不錯。妳應該會喜歡。' },
                      { kind: 'dialogue', speaker: '你', text: '你怎麼知道我會喜歡？' },
                      { kind: 'dialogue', speaker: '溫尚翊', text: '猜的啦。不喜歡再換我的。' },
                      { kind: 'narration', text: '冰端上來後，你挖了一口，冰涼的甜味很快在舌尖化開。溫尚翊坐在對面，講起上午教授臨時點名的事，說到一半又嫌你笑得太大聲。你們明明只是出來吃碗冰，卻像把原本被課表和練團塞滿的一天，偷偷挪出了一小段空白。' },
                      { kind: 'narration', text: '吃完走出店門時，溫尚翊看了一眼手錶，說還有時間，不用急著回去。你們沿著騎樓慢慢往前走，經過一間樂器行時，玻璃門剛好被人從裡面推開。' },
                      { kind: 'narration', text: '陳信宏拿著一包吉他弦走了出來。看見你們，他先是愣了一下，隨即笑了。' },
                      { kind: 'dialogue', speaker: '陳信宏', text: '怪獸？你們怎麼在這裡？' },
                      { kind: 'dialogue', speaker: '溫尚翊', text: '出來吃冰啊。你不是回去了？' },
                      { kind: 'dialogue', speaker: '陳信宏', text: '弦快用完了，想說趁還沒關門先來買一包。還好有買到，不然明天練團又要跟別人借了。' },
                      { kind: 'narration', text: '他這才注意到站在溫尚翊旁邊的你，笑著朝你點了點頭。' },
                      { kind: 'dialogue', speaker: '陳信宏', text: '妳也在喔。昨天回去還順利嗎？第一次來練團室，會不會覺得我們很吵？' },
                      { kind: 'dialogue', speaker: '你', text: '還好啊，就是沒想到你們練起來那麼認真。' },
                      { kind: 'dialogue', speaker: '陳信宏', text: '哈哈，那就好喔。我本來想去前面那間唱片行看看有沒有新進的唱片，你們要不要一起？' },
                      { kind: 'dialogue', speaker: '溫尚翊', text: '你弦都買好了還不回去喔？' },
                      { kind: 'dialogue', speaker: '陳信宏', text: '看一下就好啦，不會很久的。' },
                      { kind: 'dialogue', speaker: '溫尚翊', text: '好啦，走啊。' },
                      { kind: 'narration', text: '唱片行就在隔壁街，店面不大，門口貼著幾張新專輯的海報。推門進去，冷氣混著紙盒和塑膠封膜的味道迎面而來，架上整整齊齊排著 CD 和卡帶，角落還有一台供客人試聽的耳機。' },
                      { kind: 'dialogue', speaker: '陳信宏', text: '妳平常會逛唱片行嗎？' },
                      { kind: 'dialogue', speaker: '你', text: '偶爾啊，不過有些歌我知道，真的要挑唱片就不太會了。' },
                      { kind: 'dialogue', speaker: '陳信宏', text: '那我幫妳介紹幾張好了。這張我最近很常聽，旋律滿舒服的，妳可以先聽聽看喔。' },
                      { kind: 'narration', text: '阿信說起音樂時，聲音不自覺輕快了些。他抽出唱片，翻到背面指給你看曲目，連哪一首適合先聽都說得很仔細。' },
                      { kind: 'dialogue', speaker: '溫尚翊', text: '你不要一次介紹一整排啦，她等一下哪記得住。' },
                      { kind: 'dialogue', speaker: '陳信宏', text: '我哪有啦，我只是怕她不知道要從哪一首開始聽。' },
                      { kind: 'dialogue', speaker: '你', text: '沒關係，我聽得很認真啊。' },
                      { kind: 'dialogue', speaker: '溫尚翊', text: '妳還真的聽得很認真喔。' },
                      { kind: 'narration', text: '你在架上慢慢挑了幾盒卡帶，阿信陪你看背面的曲目，溫尚翊則站在旁邊，偶爾拿起一張唱片看兩眼，又放回原位。三個人就這樣在不大的店裡待了一會兒，誰也沒有急著催誰。' },
                      { kind: 'narration', text: '過了一陣子，阿信低頭看了看手錶，才想起自己也差不多該回去了。今天練團既然湊不齊人，他打算先把新買的吉他弦帶回家收好，等下次練團再拿過去。' },
                      { kind: 'dialogue', speaker: '陳信宏', text: '我差不多該回去了，這包弦先帶回家收好，下次練團再拿過去就好。' },
                      { kind: 'dialogue', speaker: '溫尚翊', text: '好啦，那你回去吧，路上小心。' },
                      { kind: 'dialogue', speaker: '陳信宏', text: '知道啦。昨天在練團室都在忙，沒什麼機會好好聊音樂，今天倒是剛好補上了一點。妳剛剛看的那幾張可以先聽聽看，喜歡的話下次再跟我說喔。' },
                      { kind: 'dialogue', speaker: '你', text: '好啊，那你路上小心，唱片的事下次再聊。' },
                      { kind: 'dialogue', speaker: '陳信宏', text: '那我先走囉，妳路上小心喔。' },
                      { kind: 'narration', text: '阿信把吉他弦收進紙袋，朝你們揮了揮手，便往回家的方向走去。看著他的身影轉過街角，唱片行門口一下子安靜了下來。溫尚翊沒有立刻往回走，只站在你身旁，像是在等你決定接下來要去哪裡。' },
                      { kind: 'dialogue', speaker: '溫尚翊', text: '還早啦。要不要再逛逛？' },
                    ]} />
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={() => chooseAfterIcePlan(true)}>好啊，再逛一下 <ChevronRight size={15} /></button>
                    <button className="story-primary-button secondary-chat-action" onClick={() => chooseAfterIcePlan(false)}>今天差不多了，我想先回家 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'stroll' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">第二天</div>
                    <div className="story-contact-title">
                      <strong>再走一小段路</strong>
                      <small>台北・校園附近・傍晚</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">唱片行外・十月十六日</div>
                    <h2 className="story-scene-title">沒有特別目的地的散步</h2>
                    <StoryBlocks blocks={[
                      { kind: 'narration', text: '你答應之後，溫尚翊像是終於有了下一個主意，朝前面那條巷子抬了抬下巴。' },
                      { kind: 'dialogue', speaker: '溫尚翊', text: '前面有間小書店，要不要去看看？' },
                      { kind: 'dialogue', speaker: '你', text: '你怎麼連這種地方都知道？' },
                      { kind: 'dialogue', speaker: '溫尚翊', text: '常常經過啊。又不是只有練團室跟學校可以去。' },
                      { kind: 'narration', text: '巷子比剛才那條街安靜一些。書店的門面不大，玻璃上貼著幾張褪色的海報，門一推開，紙張和木頭混在一起的味道就慢慢散出來。靠牆的架子放著新書，另一邊則堆著雜誌和過期刊物。' },
                      { kind: 'narration', text: '你在架子前停了下來，隨手翻了幾本書。溫尚翊沒有催你，只是站在旁邊看封面，偶爾抽出一本翻兩頁，又放回去。' },
                      { kind: 'dialogue', speaker: '你', text: '你平常也會來這種地方喔？' },
                      { kind: 'dialogue', speaker: '溫尚翊', text: '會啊。妳以為我每天除了彈吉他就沒別的事喔？' },
                      { kind: 'dialogue', speaker: '你', text: '我哪有這樣說。' },
                      { kind: 'dialogue', speaker: '溫尚翊', text: '妳剛剛那個表情就差不多是這個意思。' },
                      { kind: 'narration', text: '你拿起一本薄薄的攝影雜誌，翻到中間幾頁。照片裡的街道和行人都很普通，卻被拍得有點不一樣。溫尚翊湊過來看了一眼，沒有急著評論，只問你是不是喜歡這一類的東西。' },
                      { kind: 'dialogue', speaker: '你', text: '不知道欸，就是覺得這幾張拍得很好看。' },
                      { kind: 'dialogue', speaker: '溫尚翊', text: '那就慢慢看啊，反正今天又沒有人催我們。' },
                      { kind: 'narration', text: '你們在書店裡待了好一會兒。最後你沒有買書，只在門口的小架子上挑了一張明信片。溫尚翊看見上面的圖案，說這張很像你會選的東西，害你忍不住問他到底哪裡像。' },
                      { kind: 'dialogue', speaker: '溫尚翊', text: '就很像啊。妳不要每句話都要我解釋。' },
                      { kind: 'narration', text: '離開書店時，天色已經暗了一點。溫尚翊說反正順路，便陪你一路往家裡走。路上聊的都是些沒什麼要緊的小事：哪堂課最難熬、學校附近哪家店最近換了招牌，還有他下次想帶你去吃的東西。' },
                      { kind: 'narration', text: '走到你家巷口時，他放慢腳步，陪你走到公寓門前。一路上原本沒什麼特別的話題，卻因為這段路比想像中長，像是把剛才在書店裡沒聊完的話也慢慢補上了。' },
                      { kind: 'dialogue', speaker: '溫尚翊', text: '到了啦。快上去，外面有點涼。' },
                      { kind: 'dialogue', speaker: '你', text: '你送我到這裡就好了，回去路上小心。' },
                      { kind: 'dialogue', speaker: '溫尚翊', text: '知道啦。妳進去我再走。' },
                      { kind: 'narration', text: '你拿鑰匙開門時回頭看了一眼，他果然還站在原地。直到你進了門，才聽見他的腳步聲慢慢往巷口遠去。' },
                    ]} />
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={finishStroll}>回家，寫下今天的日記 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'day2-diary' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">第二天</div>
                    <div className="story-contact-title">
                      <strong>私人日記</strong>
                      <small>1996 年 10 月 16 日・星期三</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">十月十六日・傍晚回到家</div>
                    {!day2StrollAccepted ? (
                      <StoryBlocks blocks={[
                        { kind: 'narration', text: '你看了看時間，覺得今天差不多該回去了，便跟溫尚翊說想先回家。' },
                        { kind: 'dialogue', speaker: '溫尚翊', text: '好啊，那我陪妳走到公車站。' },
                        { kind: 'narration', text: '他沒有追問，也沒有露出失望的樣子，只是很自然地陪你沿著騎樓往家裡走。一路上你們聊著今天的課、唱片行門口那張海報，還有他說下次想去吃的那家麵店。' },
                        { kind: 'narration', text: '到了你家門口，他停下來，伸手替你把快滑下肩膀的包帶扶正。' },
                        { kind: 'dialogue', speaker: '溫尚翊', text: '好啦，妳到家了。快進去。' },
                        { kind: 'dialogue', speaker: '你', text: '嗯，你回去小心。' },
                        { kind: 'dialogue', speaker: '溫尚翊', text: '知道啦，進去啦。' },
                        { kind: 'narration', text: '回到家後，你把包放在椅子上，才發現今天不知不覺過得很充實。' },
                      ]} />
                    ) : (
                      <StoryBlocks blocks={[{ kind: 'narration', text: '回到家後，你把今天買的明信片放在書桌上。巷口書店的紙張氣味好像還留在指尖，你坐下來，忍不住想把今天記下來。' }]} />
                    )}
                    <div className="diary-paper story-diary-paper">
                      <span className="diary-date">1996 年 10 月 16 日・星期三</span>
                      <h2>今天原本只是想去吃一碗冰。</h2>
                      <p>下課後跟著溫尚翊去吃冰，沒想到在路上又遇見阿信。後來三個人一起逛了唱片行，他講起音樂的時候真的很認真，連一首歌要從哪裡開始聽都會仔細介紹。</p>
                      {day2StrollAccepted ? (
                        <>
                          <p>阿信走後，溫尚翊問我要不要再逛一下。我本來沒有特別想去哪裡，最後還是跟著他去了附近的小書店。</p>
                          <p>我們在裡面待了好一會兒，聊了些很普通的事情。他有時候真的很會惹人嫌，可是跟他一起走路，好像連沒有目的地也不會覺得無聊。逛完之後，他還一路陪我走回家，站在門口等我進去才離開。</p>
                        </>
                      ) : (
                        <>
                          <p>阿信走後，溫尚翊問我要不要再逛一下。我想了想，還是跟他說今天差不多了，想先回家。</p>
                          <p>他沒有勉強我，還是陪我慢慢走回家，直到我站在家門口才轉身離開。臨走前還提醒我早點休息，明明只是很平常的一句話，卻讓人覺得今天好像被好好照顧了一下。</p>
                        </>
                      )}
                      <p>今天又和阿信多聊了一會兒，也和原本就認識的人多相處了一段時間。明明沒有發生什麼大事，卻覺得這一天比平常長了很多。</p>
                      <p>不知道明天又會收到誰的訊息。</p>
                    </div>
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={startDay2FreeTime}>收好日記，看看有誰傳訊息 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'day2-complete' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">第二天</div>
                    <div className="story-contact-title">
                      <strong>自由活動結束</strong>
                      <small>1996 年 10 月 16 日・傍晚</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">今天的訊息，也有好好留下來</div>
                    <h2 className="story-scene-title">還有一些話，留到下次再說</h2>
                    <StoryBlocks blocks={[
                      { kind: 'narration', text: '你把手機握在手裡，剛才那幾輪訊息還停在螢幕上。有人用玩笑掩飾關心，有人認真地問你今天過得好不好，也有人只是很自然地分享了一件小事。' },
                      { kind: 'narration', text: '你沒有辦法同時回覆所有人。今天選擇和其中一個人多聊了一會兒，其他人的訊息就先留在收件匣裡。' },
                      { kind: 'narration', text: '傍晚的課後時間慢慢過去。你想，明天大概還會有新的事情發生。' },
                    ]} />
                    <div className="reunion-pause-note">本次自由活動已完成。你選擇的對話與回覆都會保留在訊息列表中。</div>
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={startMonthFreeTime}>一個月後，看看今天的安排 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'month-free-time' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">一個月後</div>
                    <div className="story-contact-title">
                      <strong>難得的空閒日</strong>
                      <small>1996 年 11 月 16 日・星期六</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">時間，悄悄往前走了一個月</div>
                    <h2 className="story-scene-title">今天想去找誰？</h2>
                    <StoryBlocks blocks={monthLaterIntroBlocks} />
                    <div className="month-visit-picker">
                      <div className="free-time-intro">
                        <span className="profile-eyebrow">A DAY OFF · 1996.11.16</span>
                        <strong>選一個人，去見見他吧。</strong>
                        <p>今天難得沒有課，只能安排一個人的行程。選定之後，就會直接進入你們今天的見面。</p>
                      </div>
                      {monthVisitOrder.map((id) => {
                        const person = characterInfo.find((item) => item.id === id)!
                        const route = monthVisitRoutes[id]
                        return (
                          <button className="free-time-person" key={id} onClick={() => startMonthVisit(id)}>
                            <span className="sms-avatar">{person.avatar}</span>
                            <span><strong>{person.name}</strong><small>{route.subtitle}</small></span>
                            <ChevronRight size={15} />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {storyStage === 'month-visit' && currentMonthVisit && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">一個月後</div>
                    <div className="story-contact-title">
                      <strong>{currentMonthVisit.label}</strong>
                      <small>{currentMonthVisit.location} · 1996.11.16</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">{currentMonthVisit.kicker}</div>
                    <h2 className="story-scene-title">{currentMonthVisit.title}</h2>
                    <StoryBlocks blocks={currentMonthVisit.blocks} />
                    {currentMonthVisit.rounds.slice(0, monthVisitReplies.length).map((round, index) => {
                      const selected = round.choices[monthVisitReplies[index]]
                      if (!selected) return null
                      return (
                        <div className="month-visit-round-history" key={index}>
                          {round.scene && <StoryBlocks blocks={[{ kind: 'narration', text: round.scene }]} />}
                          <StoryBlocks blocks={[
                            { kind: 'dialogue', speaker: currentMonthVisit.label, text: round.prompt },
                            { kind: 'dialogue', speaker: '你', text: selected.text },
                            ...selected.response.map((text) => ({ kind: 'dialogue' as const, speaker: currentMonthVisit.label, text })),
                          ]} />
                        </div>
                      )
                    })}
                    {currentMonthVisitRound ? (
                      <>
                        {currentMonthVisitRound.scene && <StoryBlocks blocks={[{ kind: 'narration', text: currentMonthVisitRound.scene }]} />}
                        <StoryBlocks blocks={[{ kind: 'dialogue', speaker: currentMonthVisit.label, text: currentMonthVisitRound.prompt }]} />
                        <div className="choice-area">
                          <div className="choice-heading">第 {monthVisitReplies.length + 1} 輪・你想怎麼回應？</div>
                          {currentMonthVisitRound.choices.map((choice, index) => (
                            <button className="reply-choice" key={index} onClick={() => chooseMonthVisitReply(index)}>
                              <span>{choice.text}</span><ChevronRight size={15} />
                            </button>
                          ))}
                          <small>選擇你的回應，繼續今天的聊天。</small>
                        </div>
                      </>
                    ) : (
                      <>
                        <StoryBlocks blocks={currentMonthVisit.ending} />
                        <div className="reunion-pause-note">今天的三輪對話已經好好記下來了。</div>
                      </>
                    )}
                  </div>
                  {monthVisitReplies.length === currentMonthVisit.rounds.length && (
                    <div className="story-action-bar">
                      <button className="story-primary-button" onClick={finishMonthVisit}>收好今天的回憶 <ChevronRight size={15} /></button>
                    </div>
                  )}
                </div>
              )}

              {storyStage === 'month-visit-complete' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">一個月後</div>
                    <div className="story-contact-title">
                      <strong>今天的見面</strong>
                      <small>1996 年 11 月 16 日・午後</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">平凡的一天，也有值得記住的片段</div>
                    <h2 className="story-scene-title">時間好像過得特別快</h2>
                    <StoryBlocks blocks={[
                      { kind: 'narration', text: '回家的路上，你想起今天和' + (currentMonthVisit?.label ?? '他') + '相處的片段。明明只是很普通的一天，卻因為特地去見了他，變得格外值得記住。' },
                      { kind: 'narration', text: '一個月裡慢慢累積的熟悉感，好像又往前走了一點。你把這一天收進心裡，想著下次見面時，或許還有新的話題可以聊。' },
                    ]} />
                    <div className="reunion-pause-note">見面後還有一些話想說。回到家後，你決定主動傳訊息給{currentMonthVisit?.label ?? '他'}。</div>
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={startMonthFreeChat}>回家後，主動傳訊息 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'month-diary' && monthVisitTarget && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">一個月後</div>
                    <div className="story-contact-title">
                      <strong>私人日記</strong>
                      <small>1996 年 11 月 16 日・星期六</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">十一月十六日・晚上回到家</div>
                    <h2 className="story-scene-title">把今天留在日記裡</h2>
                    <StoryBlocks blocks={[
                      { kind: 'narration', text: '回到家後，你把包放到椅子上，換下鞋子，才發現今天從早上到現在，竟然已經過了這麼久。手機裡還留著剛才的對話，你坐到書桌前，翻開那本寫了一個多月的日記。' },
                    ]} />
                    <div className="diary-paper story-diary-paper">
                      <span className="diary-date">1996 年 11 月 16 日・星期六</span>
                      <h2>{monthDiaryEntries[monthVisitTarget].title}</h2>
                      <p>{monthDiaryEntries[monthVisitTarget].visit}</p>
                      <p>{monthDiaryEntries[monthVisitTarget].chat}</p>
                      <p>一個月前，很多事情還只是剛剛開始。今天再回頭看，才發現我們已經有了不少只有彼此才懂的小事。也許日子就是這樣慢慢往前走的吧，不一定每天都有什麼大事發生，但總會有一些瞬間，讓人想好好記下來。</p>
                    </div>
                    <div className="reunion-pause-note">今天的見面和訊息都已經收進日記。寫完這一頁，今天就到這裡了。</div>
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={finishMonthChapter}>合上日記，結束今天 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'paused' && (
                <div className="paused-story-banner">
                  <div>
                    <strong>故事已暫停</strong>
                    <small>目前進度會保存在這支手機裡。</small>
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
                    <button className="app-tile" key={app.id} onClick={() => app.id === 'messages' ? openMessagesApp(null) : setActiveApp(app.id)} aria-label={app.name}>
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

              {storyStage === 'notification' && playerName && activeApp === null && (
                <button className="sms-notification" onClick={() => openMessagesApp('wen')}>
                  <span className="notification-icon"><MessageSquare size={19} /></span>
                  <span className="notification-copy">
                    <strong>溫尚翊</strong>
                    <span>妳下課了嗎？</span>
                    <span>今天要不要跟我去練團室？</span>
                  </span>
                  <span className="notification-time">現在</span>
                </button>
              )}
              {storyStage === 'greetings' && playerName && activeApp === null && (
                <button className="sms-notification" onClick={() => openMessagesApp(currentGreetingId)}>
                  <span className="notification-icon"><MessageSquare size={19} /></span>
                  <span className="notification-copy">
                    <strong>{characterNames[currentGreetingId]}</strong>
                    <span>{greetingReplied ? '還想再聊幾句嗎？' : currentGreetingRound.incoming}</span>
                    <span>新朋友傳來訊息</span>
                  </span>
                  <span className="notification-time">現在</span>
                </button>
              )}
              {storyStage === 'masa-checkin' && activeApp === null && (
                <button className="sms-notification" onClick={() => openMessagesApp('masa')}>
                  <span className="notification-icon"><MessageSquare size={19} /></span>
                  <span className="notification-copy">
                    <strong>蔡昇晏</strong>
                    <span>{masaCheckInSent ? '查看剛才的對話' : '傳訊息問問今天的事'}</span>
                    <span>訊息草稿</span>
                  </span>
                  <span className="notification-time">現在</span>
                </button>
              )}
              {storyStage === 'stone-checkin' && activeApp === null && (
                <button className="sms-notification" onClick={() => openMessagesApp('stone')}>
                  <span className="notification-icon"><MessageSquare size={19} /></span>
                  <span className="notification-copy">
                    <strong>石錦航</strong>
                    <span>{stoneCheckInSent ? '查看剛才的對話' : '傳訊息關心一下石頭'}</span>
                    <span>訊息草稿</span>
                  </span>
                  <span className="notification-time">現在</span>
                </button>
              )}
              {storyStage === 'free-time' && activeApp === null && (
                <button className="sms-notification free-time-notification" onClick={() => openMessagesApp(null)}>
                  <span className="notification-icon"><MessageSquare size={19} /></span>
                  <span className="notification-copy">
                    <strong>自由活動時間</strong>
                    <span>選一位朋友傳訊息，這次只能選一位。</span>
                    <span>至少完成五輪對話，錢佑達不在選擇名單內。</span>
                  </span>
                  <span className="notification-time">現在</span>
                </button>
              )}
              {storyStage === 'free-chat' && freeChatTarget && activeApp === null && (
                <button className="sms-notification" onClick={() => openMessagesApp(freeChatTarget)}>
                  <span className="notification-icon"><MessageSquare size={19} /></span>
                  <span className="notification-copy">
                    <strong>{characterNames[freeChatTarget]}</strong>
                    <span>{chatMessages[freeChatTarget]?.[chatMessages[freeChatTarget].length - 1]?.text ?? '有新訊息'}</span>
                    <span>自由活動・第 {freeChatRound + 1}/5 輪</span>
                  </span>
                  <span className="notification-time">剛剛</span>
                </button>
              )}
              {storyStage === 'month-free-chat' && monthVisitTarget && monthFreeChatStarted && activeApp === null && (
                <button className="sms-notification" onClick={() => openMessagesApp(monthVisitTarget)}>
                  <span className="notification-icon"><MessageSquare size={19} /></span>
                  <span className="notification-copy">
                    <strong>{characterNames[monthVisitTarget]}</strong>
                    <span>{chatMessages[monthVisitTarget]?.[chatMessages[monthVisitTarget].length - 1]?.text ?? '查看剛才的訊息'}</span>
                    <span>一個月後・自由對話・第 {monthFreeChatRound + 1}/5 輪</span>
                  </span>
                  <span className="notification-time">剛剛</span>
                </button>
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
                    <h2 className="story-scene-title">四目相對的那一刻</h2>
                    <StoryBlocks blocks={[
                      { kind: 'narration', text: '溫尚翊朝角落抬了抬下巴。你順著他的方向看過去，那個抱著貝斯的人正低著頭，指尖在弦上輕輕撥了幾下。' },
                      { kind: 'narration', text: '聽見你們說話，他手上的動作停了下來，抬起頭。' },
                      { kind: 'narration', text: '四目相對的那一刻，你整個人都愣住了。' },
                      { kind: 'dialogue', speaker: '你', text: '……蔡昇晏？' },
                      { kind: 'narration', text: '那張臉比記憶裡成熟了許多，眉眼卻沒有變。你幾乎沒經過思考，就認出了他。' },
                      { kind: 'dialogue', speaker: '蔡昇晏', text: '……蛤？' },

                      { kind: 'dialogue', speaker: '蔡昇晏', text: '妳怎麼會在這裡？' },
                      { kind: 'dialogue', speaker: '你', text: '我才想問你咧！' },
                      { kind: 'dialogue', speaker: '你', text: '你怎麼會在這裡啊？' },
                      { kind: 'aside', text: '救命。' },
                      { kind: 'narration', text: '你真的沒想過會在這裡見到他。那個搬家前還跟你約好要保持聯絡，後來卻因為一場大雨和一張模糊的地址紙失去消息的人，現在就坐在離你不到幾步的地方。' },
                      { kind: 'narration', text: '你腦子裡一下子閃過好多年前的畫面，卻又不知道該先問哪一件事。' },
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
                      <button
                        className="back-button"
                        onClick={() => activeApp === 'messages' && selectedSmsThread ? setSelectedSmsThread(null) : activeApp === 'diary' && selectedDiaryDate ? setSelectedDiaryDate(null) : setActiveApp(null)}
                        aria-label={activeApp === 'messages' && selectedSmsThread ? '返回訊息列表' : '返回主選單'}
                      ><ArrowLeft size={17} /></button>
                      <div className="app-window-title">
                        {ActiveIcon && <ActiveIcon size={17} />}
                        <span>{activeApp === 'messages' && selectedSmsThread ? characterNames[selectedSmsThread] : activeApp === 'diary' && selectedDiaryDate ? '日記內容' : activeCopy.heading}</span>
                      </div>
                      <button className="close-button" onClick={() => { setActiveApp(null); setSelectedSmsThread(null); setSelectedDiaryDate(null) }} aria-label="關閉"><X size={17} /></button>
                    </div>
                    <div className={activeApp === 'messages' ? 'app-window-content sms-mode' : activeApp === 'diary' ? 'app-window-content diary-mode' : activeApp === 'notes' ? 'app-window-content save-mode' : 'app-window-content'}>
                      {activeApp === 'messages' ? (
                        storyStage === 'free-time' && selectedSmsThread === null && !freeChatTarget ? (
                          <div className="free-time-picker">
                            <div className="free-time-intro">
                              <span className="profile-eyebrow">FREE TIME · 1996</span>
                              <strong>今天想找誰聊一聊？</strong>
                              <p>只能選擇一位朋友。選定後會進入至少五輪的專屬訊息，這次不能中途換人。</p>
                              <small>錢佑達今天沒有開放個人聊天。</small>
                            </div>
                            {freeTimeOrder.map((id) => {
                              const person = characterInfo.find((item) => item.id === id)!
                              return (
                                <button className="free-time-person" key={id} onClick={() => startFreeChat(id)}>
                                  <span className="sms-avatar">{person.avatar}</span>
                                  <span><strong>{person.name}</strong><small>{person.role}</small></span>
                                  <ChevronRight size={15} />
                                </button>
                              )
                            })}
                          </div>
                        ) : selectedSmsThread === null ? (
                          <div className="sms-inbox">
                            <div className="sms-inbox-heading">
                              <strong>訊息列表</strong>
                              <span>收件匣 · 1996</span>
                            </div>
                            {inboxThreads.map((thread) => (
                              <button className="sms-thread-row" key={thread.id} onClick={() => openSmsThread(thread.id)}>
                                <span className="sms-avatar">{thread.avatar}</span>
                                <span className="sms-thread-summary">
                                  <strong>{thread.name}</strong>
                                  <span>{thread.latest}</span>
                                </span>
                                <span className="sms-thread-meta">
                                  <small>{thread.time}</small>
                                  <ChevronRight size={14} />
                                </span>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="sms-thread">
                            <div className="sms-thread-caption">
                              <span>與{characterNames[selectedSmsThread]}的簡訊</span>
                              <small>訊息會一直保留在這裡</small>
                            </div>
                            <div className="sms-thread-scroll" ref={messageScrollRef}>
                              {currentThreadMessages.map((message, index) => (
                                <div key={message.id}>
                                  {(index === 0 || currentThreadMessages[index - 1].date !== message.date) && (
                                    <div className="story-date-label">{message.date}</div>
                                  )}
                                  <MessageBubble mine={message.from === 'me'} text={message.text} />
                                </div>
                              ))}
                              {storyStage === 'messages' && selectedSmsThread === 'wen' && replyKey === null && (
                                <div className="choice-area">
                                  <div className="choice-heading">選擇你的回覆</div>
                                  <button className="reply-choice" onClick={() => chooseReply('a')}>
                                    <span>好啊，反正我今天也沒事。幾點出發？</span><ChevronRight size={15} />
                                  </button>
                                  <button className="reply-choice" onClick={() => chooseReply('b')}>
                                    <span>好啊！我還沒看過你們練團，突然有點期待。</span><ChevronRight size={15} />
                                  </button>
                                  <button className="reply-choice" onClick={() => chooseReply('c')}>
                                    <span>你怎麼突然想到約我？該不會又想找人幫你拿東西吧？</span><ChevronRight size={15} />
                                  </button>
                                  <small>每個選項都會影響對方的感受；有些選擇可能加分，也可能扣分。</small>
                                </div>
                              )}
                              {storyStage === 'greetings' && selectedSmsThread === currentGreetingId && !greetingReplied && (
                                <div className="choice-area">
                                  <div className="choice-heading">{characterNames[currentGreetingId]}的回覆</div>
                                  {currentGreetingRound.choices.map((choice, index) => (
                                    <button className="reply-choice" key={index} onClick={() => chooseGreetingReply(index)}>
                                      <span>{choice.text}</span><ChevronRight size={15} />
                                    </button>
                                  ))}
                                  <small>不同回覆會帶來不同反應，也會影響好感；有些話可能會惹對方不高興。</small>
                                </div>
                              )}
                              {storyStage === 'classroom' && selectedSmsThread === 'wen' && !classroomIntroReplied && !classroomReplySent && (
                                <div className="choice-area">
                                  <div className="choice-heading">你想怎麼問這位大忙人？</div>
                                  {classroomIntroChoices.map((choice, index) => (
                                    <button className="reply-choice" key={index} onClick={() => chooseClassroomIntro(index)}>
                                      <span>{choice.text}</span><ChevronRight size={15} />
                                    </button>
                                  ))}
                                  <small>平常忙著練團的人今天突然有空，先問問他為什麼吧。</small>
                                </div>
                              )}
                              {storyStage === 'classroom' && selectedSmsThread === 'wen' && classroomIntroReplied && !classroomReplySent && (
                                <div className="choice-area">
                                  <div className="choice-heading">原來今天練團取消了……</div>
                                  {classroomChoices.map((choice, index) => (
                                    <button className="reply-choice" key={index} onClick={() => chooseClassroomReply(index)}>
                                      <span>{choice.text}</span><ChevronRight size={15} />
                                    </button>
                                  ))}
                                  <small>他提到瑪莎和石頭今天翹課被抓了，你想怎麼接話？</small>
                                </div>
                              )}
                              {storyStage === 'masa-checkin' && selectedSmsThread === 'masa' && !masaCheckInSent && !masaCheckInReplied && (
                                <div className="choice-area">
                                  <div className="choice-heading">{masaCheckInRound === 0 ? '你想怎麼問瑪莎？' : masaCheckInRound === 1 ? '你還想追問什麼？' : '最後再問他一件事'}</div>
                                  {masaCheckinRounds[masaCheckInRound].map((choice, index) => (
                                    <button className="reply-choice" key={index} onClick={() => chooseMasaCheckIn(index)}>
                                      <span>{choice.text}</span><ChevronRight size={15} />
                                    </button>
                                  ))}
                                  <small>不同問法會讓瑪莎有不同反應，也可能影響好感度。</small>
                                </div>
                              )}
                              {storyStage === 'masa-checkin' && selectedSmsThread === 'masa' && masaCheckInReplied && !masaCheckInSent && (
                                <div className="sms-thread-actions">
                                  <div className="reply-note">瑪莎回得很快，但聽起來還有些事情沒有說清楚。</div>
                                  <button className="story-primary-button" onClick={continueMasaCheckIn}>再問他一點 <ChevronRight size={15} /></button>
                                </div>
                              )}
                              {storyStage === 'stone-checkin' && selectedSmsThread === 'stone' && !stoneCheckInSent && (
                                <div className="choice-area">
                                  <div className="choice-heading">你想怎麼關心石頭？</div>
                                  {stoneCheckinChoices.map((choice, index) => (
                                    <button className="reply-choice" key={index} onClick={() => chooseStoneCheckIn(index)}>
                                      <span>{choice.text}</span><ChevronRight size={15} />
                                    </button>
                                  ))}
                                  <small>太冷淡、太好奇或真心關心，得到的反應都不一樣。</small>
                                </div>
                              )}
                              {storyStage === 'free-chat' && freeChatTarget && selectedSmsThread === freeChatTarget && !freeChatReplied && (
                                <div className="choice-area">
                                  <div className="choice-heading">自由活動・第 {freeChatRound + 1}/5 輪</div>
                                  {getFreeTimeRounds(freeChatTarget)[freeChatRound].choices.map((choice, index) => (
                                    <button className="reply-choice" key={index} onClick={() => chooseFreeChatReply(index)}>
                                      <span>{choice.text}</span><ChevronRight size={15} />
                                    </button>
                                  ))}
                                  <small>每輪都有三種回法，會影響對方反應與好感；也可能一不小心扣分。</small>
                                </div>
                              )}
                              {storyStage === 'month-free-chat' && monthVisitTarget && selectedSmsThread === monthVisitTarget && !monthFreeChatReplied && (
                                <div className="choice-area">
                                  <div className="choice-heading">一個月後・自由對話・第 {monthFreeChatRound + 1}/5 輪</div>
                                  {monthFreeChatScripts[monthVisitTarget][monthFreeChatRound].choices.map((choice, index) => (
                                    <button className="reply-choice" key={index} onClick={() => chooseMonthFreeChatReply(index)}>
                                      <span>{choice.text}</span><ChevronRight size={15} />
                                    </button>
                                  ))}
                                  <small>這次由你先傳訊息。每輪有三個回覆選項，會影響對方的反應與好感度。</small>
                                </div>
                              )}
                            </div>
                            {storyStage === 'reply' && selectedSmsThread === 'wen' && selectedReply && (
                              <div className="sms-thread-actions">
                                <div className="reply-note">訊息已送出。溫尚翊會在四點半到妳教室樓下等妳。</div>
                                <button className="story-primary-button" onClick={() => { setActiveApp(null); setSelectedSmsThread(null); changeStage('walk') }}>
                                  收起手機，去樓下找他 <ChevronRight size={15} />
                                </button>
                              </div>
                            )}
                            {storyStage === 'greetings' && selectedSmsThread === currentGreetingId && greetingReplied && (
                              <div className="sms-thread-actions">
                                {greetingRound < greetingChats[currentGreetingId].length - 1 && (
                                  <button className="story-primary-button secondary-chat-action" onClick={continueGreeting}>再聊一輪 <ChevronRight size={15} /></button>
                                )}
                                <button className="story-primary-button" onClick={finishGreetingPerson}>
                                  {greetingRound < greetingChats[currentGreetingId].length - 1 ? '先聊到這裡' : '完成打招呼'} <ChevronRight size={15} />
                                </button>
                              </div>
                            )}
                            {storyStage === 'classroom' && selectedSmsThread === 'wen' && classroomReplySent && (
                              <div className="sms-thread-actions">
                                <div className="reply-note">溫尚翊說今天練團湊不齊人。你想起瑪莎剛才的樣子，忍不住想問問他。</div>
                                <button className="story-primary-button" onClick={startMasaCheckIn}>傳訊息問問瑪莎 <ChevronRight size={15} /></button>
                              </div>
                            )}
                            {storyStage === 'masa-checkin' && selectedSmsThread === 'masa' && masaCheckInSent && (
                              <div className="sms-thread-actions">
                                <div className="reply-note">你終於稍微弄清楚了：瑪莎和石頭都還在讀高三。至於為什麼比你想像中晚了一點，他似乎還不太想細說。</div>
                                <button className="story-primary-button secondary-chat-action" onClick={startStoneCheckIn}>也傳訊息關心石頭 <ChevronRight size={15} /></button>
                                <button className="story-primary-button" onClick={goToIceDate}>先不打擾他們，去找溫尚翊 <ChevronRight size={15} /></button>
                              </div>
                            )}
                            {storyStage === 'stone-checkin' && selectedSmsThread === 'stone' && stoneCheckInSent && (
                              <div className="sms-thread-actions">
                                <div className="reply-note">石頭說已經沒事了。你把手機收起來，準備去赴溫尚翊的約。</div>
                                <button className="story-primary-button" onClick={goToIceDate}>收起手機，去找溫尚翊 <ChevronRight size={15} /></button>
                              </div>
                            )}
                            {storyStage === 'free-chat' && freeChatTarget && selectedSmsThread === freeChatTarget && freeChatReplied && freeChatRound === 4 && (
                              <div className="sms-thread-actions">
                                <div className="reply-note">五輪對話已完成。這段訊息會保留在收件匣裡，你之後可以隨時回看。</div>
                                <button className="story-primary-button" onClick={finishFreeChat}>結束自由活動 <ChevronRight size={15} /></button>
                              </div>
                            )}
                            {storyStage === 'month-free-chat' && monthVisitTarget && selectedSmsThread === monthVisitTarget && monthFreeChatReplied && monthFreeChatRound === 4 && (
                              <div className="sms-thread-actions">
                                <div className="reply-note">五輪對話已經聊完。你把手機裡的訊息收好，準備把今天記進日記。</div>
                                <button className="story-primary-button" onClick={finishMonthFreeChat}>收起手機，寫下今天的日記 <ChevronRight size={15} /></button>
                              </div>
                            )}
                          </div>
                        )
                      ) : activeApp === 'contacts' ? (
                        firstChapterComplete ? (
                          <div className="contact-list">
                            <div className="unlock-banner">
                              <strong>第一章・新增聯絡人</strong>
                              <span>6 位新朋友</span>
                            </div>
                            {selectedContactProfile ? (
                              <div className="contact-profile">
                                <button className="profile-back" onClick={() => setSelectedProfile(null)}><ArrowLeft size={13} /> 返回通訊錄</button>
                                <div className="profile-avatar-large">{selectedContactProfile.name.slice(0, 1)}</div>
                                <span className="profile-eyebrow">PERSONAL FILE · 1996</span>
                                <h2>{selectedContactProfile.name}</h2>
                                <div className="profile-role">{selectedContactProfile.role}</div>
                                <p>{selectedContactProfile.description}</p>
                                <div className="profile-footnote">人物資料已解鎖 · 故事仍在繼續</div>
                              </div>
                            ) : (
                              <>
                                {unlockedContacts.map((contact) => (
                                  <button className="contact-list-row" key={contact.id} onClick={() => setSelectedProfile(contact.id)}>
                                    <span className="contact-avatar">{contact.name.slice(0, 1)}</span>
                                    <span className="contact-summary"><strong>{contact.name}</strong><small>{contact.role}</small></span>
                                    <ChevronRight size={15} />
                                  </button>
                                ))}
                                <p className="profile-footnote">點選名字查看人物資料。暫時不會顯示任何攻略結局。</p>
                              </>
                            )}
                          </div>
                        ) : (
                          <>
                            <div className="empty-symbol"><Contact size={29} /></div>
                            <h2>目前還沒有已解鎖的聯絡人。</h2>
                            <p>認識一個人之後，他的名字才會真正留在你的通訊錄裡。</p>
                            <div className="coming-soon"><Radio size={15} /> 故事開始後逐步開放</div>
                          </>
                        )
                      ) : activeApp === 'calls' ? (
                        <div className="call-history-page">
                          <div className="call-history-intro"><strong>最近通話</strong><small>來電紀錄會保存在這支手機裡。</small></div>
                          {callHistory.length ? callHistory.map((entry) => {
                            const person = characterInfo.find((item) => item.id === entry.character)!
                            return (
                              <div className="call-history-row" key={entry.id}>
                                <span className="call-history-avatar">{person.avatar}</span>
                                <span className="call-history-copy"><strong>{person.name}</strong><small>{entry.status === 'missed' ? '未接來電' : '已接來電'}</small></span>
                                <span className="call-history-time">{(entry.date ?? '1996.10.16').slice(5).replace('.', '/')}<br/>{entry.time}</span>
                              </div>
                            )
                          }) : <div className="call-history-empty"><Phone size={24}/><strong>還沒有通話紀錄</strong><small>當有人打電話給你，這裡就會留下紀錄。</small></div>}
                        </div>
                      ) : activeApp === 'diary' ? (
                        firstChapterComplete ? (
                          <div className="diary-page">
                            {!selectedDiaryDate ? (
                              <>
                                <div className="diary-index-intro">
                                  <span className="profile-eyebrow">PRIVATE JOURNAL · 1996</span>
                                  <strong>寫下來的日子</strong>
                                  <small>點選日期，可以重新讀一遍當時的心情。</small>
                                </div>
                                {day2DiaryUnlocked && (
                                  <button className="diary-entry-row" onClick={() => setSelectedDiaryDate('1996-10-16')}>
                                    <span className="diary-entry-date">16<br/><small>OCT</small></span>
                                    <span className="diary-entry-copy"><strong>今天原本只是想去吃一碗冰。</strong><small>遇見阿信，還有和溫尚翊一起度過的傍晚。</small></span>
                                    <ChevronRight size={16} />
                                  </button>
                                )}
                                <button className="diary-entry-row" onClick={() => setSelectedDiaryDate('1996-10-15')}>
                                  <span className="diary-entry-date">15<br/><small>OCT</small></span>
                                  <span className="diary-entry-copy"><strong>今天真的發生了一件很不可思議的事。</strong><small>在練團室，重新遇見了小時候的朋友。</small></span>
                                  <ChevronRight size={16} />
                                </button>
                              </>
                            ) : (
                              <>
                                <button className="diary-detail-back" onClick={() => setSelectedDiaryDate(null)}><ArrowLeft size={13}/> 返回日記列表</button>
                                {selectedDiaryDate === '1996-10-16' && day2DiaryUnlocked ? (
                                  <div className="diary-paper">
                                    <span className="diary-date">1996 年 10 月 16 日・星期三</span>
                                    <h2>今天原本只是想去吃一碗冰。</h2>
                                    <p>下課後跟著溫尚翊去吃冰，沒想到在路上遇見阿信。後來三個人一起逛了唱片行，他講起音樂的時候真的很認真，連一首歌要從哪裡開始聽都仔細介紹。</p>
                                    {day2StrollAccepted ? (
                                      <>
                                        <p>阿信走後，溫尚翊問我要不要再逛一下。我答應了，最後跟著他去了附近的小書店。</p>
                                        <p>我們在裡面待了好一會兒，聊了些很普通的事情。他有時候真的很會惹人嫌，可是跟他一起走路，好像連沒有目的地也不會覺得無聊。逛完之後，他還一路陪我走回家，站在門口等我進去才離開。</p>
                                      </>
                                    ) : (
                                      <>
                                        <p>阿信走後，溫尚翊問我要不要再逛一下。我想了想，還是跟他說今天差不多了，想先回家。</p>
                                        <p>他沒有勉強我，還是陪我慢慢走回家，直到我站在家門口才轉身離開。臨走前還提醒我早點休息。</p>
                                      </>
                                    )}
                                    <p>今天又和阿信多聊了一會兒，也和原本就認識的人多相處了一段時間。明明沒有發生什麼大事，卻覺得這一天比平常長了很多。</p>
                                    <p>不知道明天又會收到誰的訊息。</p>
                                  </div>
                                ) : (
                                  <div className="diary-paper">
                                    <span className="diary-date">1996 年 10 月 15 日・星期二</span>
                                    <h2>今天真的發生了一件很不可思議的事。</h2>
                                    <p>本來只是跟著溫尚翊去練團室看看，結果居然在那裡遇到了瑪莎。</p>
                                    <p>我到現在還是覺得有點不真實。</p>
                                    <p>小時候搬家之前，他還特地把地址寫給我，說以後一定要聯絡。</p>
                                    <p>可是後來那場大雨，把紙上的字都弄模糊了。</p>
                                    <p>我一直很想知道他後來去了哪裡。</p>
                                    <p>沒想到兜兜轉轉這麼多年，居然會在這樣的地方重新遇見蔡昇晏。</p>
                                    <p>而且他竟然也認識溫尚翊。</p>
                                    <p>這個世界真的好小。</p>
                                    <p>今天還有好多事情沒來得及問他。</p>
                                    <p>下次見面再說吧。</p>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        ) : (
                          <>
                            <div className="empty-symbol"><BookHeart size={29} /></div>
                            <h2>今天還沒有寫下任何事情。</h2>
                            <p>重要的一天結束後，或許會有一些話想留給明天的自己。</p>
                            <div className="coming-soon"><Radio size={15} /> 故事開始後逐步開放</div>
                          </>
                        )
                      ) : activeApp === 'notes' ? (
                        <div className="save-center-page">
                          <div className="save-center-intro">
                            <span className="profile-eyebrow">SAVE DATA · 1996</span>
                            <strong>把故事好好收起來。</strong>
                            <small>每份存檔都會保留當時的劇情、訊息紀錄與人物好感度。</small>
                          </div>
                          <div className="save-slot-list">
                            {SAVE_SLOT_IDS.map((slot) => {
                              const saved = saveSlots[slot]
                              return (
                                <section className="save-slot-card" key={slot}>
                                  <div className="save-slot-heading">
                                    <strong>存檔 {String(slot).padStart(2, '0')}</strong>
                                    <span className={saved ? 'save-slot-status saved' : 'save-slot-status'}>{saved ? '已保存' : '空白存檔'}</span>
                                  </div>
                                  {saved ? (
                                    <div className="save-slot-details">
                                      <strong>{saved.stageLabel}</strong>
                                      <small>{saved.gameDate} · {saved.gameTime}</small>
                                    </div>
                                  ) : (
                                    <div className="save-slot-empty">這個位置還沒有保存進度。</div>
                                  )}
                                  <div className="save-slot-actions">
                                    <button className="save-slot-primary" onClick={() => saveCurrentProgress(slot)}>{saved ? '覆蓋保存' : '保存進度'}</button>
                                    <button className="save-slot-secondary" disabled={!saved} onClick={() => loadSaveSlot(slot)}>讀取存檔</button>
                                  </div>
                                </section>
                              )
                            })}
                          </div>
                          <div className="save-center-feedback" aria-live="polite">
                            {saveFeedback || '自動保存仍會持續運作；手動存檔可以留下不同時間點。'}
                          </div>
                        </div>
                      ) : activeApp === 'settings' ? (
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
              {incomingCallCharacter && (
                <div className="threshold-call-overlay">
                  <div className="threshold-call-card">
                    <span className="call-eyebrow">INCOMING CALL</span>
                    <div className="call-avatar">{characterInfo.find((item) => item.id === incomingCallCharacter)?.avatar}</div>
                    <h2>{characterNames[incomingCallCharacter]}</h2>
                    <p>正在打電話給你……</p>
                    <div className="call-action-row">
                      <button className="call-decline-button" onClick={() => {
                        setCallHistory((current) => [{ id: 'call-' + Date.now(), character: incomingCallCharacter, status: 'missed', time: '18:35', date: saveGameDate }, ...current])
                        setIncomingCallCharacter(null)
                        setCallExperienceContext(null)
                        localStorage.removeItem('mayday-call-experience-context')
                        localStorage.removeItem('mayday-incoming-call')
                      }}><X size={18}/>拒絕</button>
                      <button className="call-answer-button" onClick={answerIncomingCall}><Phone size={18}/>接聽</button>
                    </div>
                  </div>
                </div>
              )}
              {activeCallCharacter && (
                <div className="threshold-call-overlay">
                  <div className="threshold-call-card active-call-card">
                    <div className="call-active-head">
                      <div className="call-avatar">{characterInfo.find((item) => item.id === activeCallCharacter)?.avatar}</div>
                      <div className="call-active-person">
                        <strong>{characterNames[activeCallCharacter]}</strong>
                        <small>通話中 · 1996</small>
                      </div>
                      <span className="call-active-indicator">●</span>
                    </div>
                    <div className="call-transcript" ref={callTranscriptRef} aria-live="polite">
                      {callTranscript.map((line, index) => (
                        <div className={'call-transcript-row' + (line.speaker === 'me' ? ' mine' : '')} key={index}>
                          <span className="call-transcript-speaker">{line.speaker === 'me' ? '你' : characterNames[line.speaker]}</span>
                          <div className="call-transcript-bubble">{line.text}</div>
                        </div>
                      ))}
                    </div>
                    {!callReplied ? (
                      <div className="call-choice-area">
                        <div className="call-choice-heading">你想怎麼回應？ <span>第 {callRoundIndex + 1}/{getCallRounds(activeCallCharacter).length} 輪</span></div>
                        {getCallRounds(activeCallCharacter)[callRoundIndex].choices.map((choice, index) => (
                          <button className="call-choice-button" key={index} onClick={() => chooseCallReply(index)}>
                            <span>{choice.text}</span><ChevronRight size={14}/>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <button className="call-finish-button" onClick={finishThresholdCall}>結束通話 <Phone size={14}/></button>
                    )}
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
              {['1','2','3','4','5','6','7','8','9','*','0','#'].map((key) => {
                const label = ({ '2':'ABC', '3':'DEF', '4':'GHI', '5':'JKL', '6':'MNO', '7':'PQRS', '8':'TUV', '9':'WXYZ', '0':'+', '1':'', '*':'', '#':'' } as Record<string,string>)[key];
                return (
                  <button key={key} className={`key ${label ? 'key-with-label' : 'key-number-only'}`} aria-label={'按鍵 ' + key}>
                    <strong>{key}</strong>
                    {label && <small>{label}</small>}
                  </button>
                );
              })}
            </div>
            <div className="phone-bottom-label">TAIPEI · 1996—1999</div>
          </div>
        </div>
      </section>

      <footer className="page-footer">
        <span><Clock3 size={13} /> 故事，從一九九六年開始。</span>
        <span>BUILD 0.4.7 · ONE MONTH LATER</span>
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
