import { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'

export type May10Character = 'wen' | 'ashin' | 'masa' | 'stone' | 'yanming'
export type May10Selection = {
  character: May10Character
  choices: number[]
  jealousyCharacter: May10Character | null
  jealousyChoices: number[]
}

type Block = { kind: 'narration' | 'dialogue'; text: string; speaker?: string }
type Choice = { text: string; response: Block[]; affection: number }
type Round = { prompt: string; scene?: Block[]; choices: [Choice, Choice, Choice] }
type Route = { name: string; intro: Block[]; rounds: [Round, Round, Round]; tease: Block[]; ending: Block[] }
type JealousyRoute = { intro: Block[]; rounds: [Round, Round, Round]; ending: Block[] }
type Phase = 'intro' | 'auditions' | 'newDrummer' | 'picker' | 'interaction' | 'jealousyIntro' | 'jealousyInteraction' | 'complete'
type Progress = {
  phase: Phase
  character: May10Character | null
  roundIndex: number
  pendingChoice: number | null
  choices: number[]
  jealousyCharacter: May10Character | null
  jealousyRoundIndex: number
  jealousyPendingChoice: number | null
  jealousyChoices: number[]
}

const STORAGE_KEY = 'mayday-may10-progress-v1'
const CHARACTER_SELECTION_AFFECTION_KEY = 'mayday-may10-character-selection-affection-v1'
const ORDER: May10Character[] = ['wen', 'ashin', 'masa', 'stone', 'yanming']
const NAMES: Record<May10Character, string> = {
  wen: '溫尚翊',
  ashin: '陳信宏',
  masa: '瑪莎',
  stone: '石錦航',
  yanming: '劉諺明',
}
const initialProgress: Progress = {
  phase: 'intro',
  character: null,
  roundIndex: 0,
  pendingChoice: null,
  choices: [],
  jealousyCharacter: null,
  jealousyRoundIndex: 0,
  jealousyPendingChoice: null,
  jealousyChoices: [],
}

const n = (text: string): Block => ({ kind: 'narration', text })
const d = (speaker: string, text: string): Block => ({ kind: 'dialogue', speaker, text })
const c = (text: string, response: Block[], affection = 1): Choice => ({ text, response, affection })
const round = (prompt: string, choices: [Choice, Choice, Choice], scene: Block[] = []): Round => ({ prompt, choices, scene })

function readProgress(): Progress {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as Partial<Progress> | null
    const phases: Phase[] = ['intro', 'auditions', 'newDrummer', 'picker', 'interaction', 'jealousyIntro', 'jealousyInteraction', 'complete']
    if (!saved || !phases.includes(saved.phase as Phase)) return initialProgress
    const character = ORDER.includes(saved.character as May10Character) ? saved.character as May10Character : null
    const jealousyCharacter = ORDER.includes(saved.jealousyCharacter as May10Character) ? saved.jealousyCharacter as May10Character : null
    const cleanChoices = (value: unknown) => Array.isArray(value)
      ? value.filter((item): item is number => Number.isInteger(item) && item >= 0 && item <= 2).slice(0, 3)
      : []
    const roundIndex = Number.isInteger(saved.roundIndex) ? Math.max(0, Math.min(2, Number(saved.roundIndex))) : 0
    const jealousyRoundIndex = Number.isInteger(saved.jealousyRoundIndex) ? Math.max(0, Math.min(2, Number(saved.jealousyRoundIndex))) : 0
    const pendingChoice = Number.isInteger(saved.pendingChoice) && Number(saved.pendingChoice) >= 0 && Number(saved.pendingChoice) <= 2
      ? Number(saved.pendingChoice) : null
    const jealousyPendingChoice = Number.isInteger(saved.jealousyPendingChoice) && Number(saved.jealousyPendingChoice) >= 0 && Number(saved.jealousyPendingChoice) <= 2
      ? Number(saved.jealousyPendingChoice) : null
    return {
      phase: saved.phase as Phase,
      character,
      roundIndex,
      pendingChoice,
      choices: cleanChoices(saved.choices),
      jealousyCharacter,
      jealousyRoundIndex,
      jealousyPendingChoice,
      jealousyChoices: cleanChoices(saved.jealousyChoices),
    }
  } catch {
    return initialProgress
  }
}

function clockForProgress(progress: Progress) {
  if (progress.phase === 'intro') return '13:40'
  if (progress.phase === 'auditions') return '14:00'
  if (progress.phase === 'newDrummer') return '15:00'
  if (progress.phase === 'picker') return '15:45'
  if (progress.phase === 'interaction') return ['16:00', '16:15', '16:30'][progress.roundIndex]
  if (progress.phase === 'jealousyIntro') return '16:45'
  if (progress.phase === 'jealousyInteraction') return ['16:50', '17:00', '17:10'][progress.jealousyRoundIndex]
  return '17:25'
}

const auditionBlocks: Block[] = [
  n('這陣子，大家幾乎把認識的人問了一輪。誰有朋友會打鼓、誰以前玩過團，連很久沒聯絡的同學都被翻出來問了一遍。今天練團室排了幾個面試時段，你也特地過來幫忙看場面。'),
  n('溫尚翊從剛才開始就一直在調鼓組，鼓棒在掌心轉了兩圈，又被他啪一聲放回鼓面。'),
  d('溫尚翊', '我先講喔，今天如果再來一個只會打鼓花的，我真的會瘋掉。'),
  d('瑪莎', '你上次也是這樣講的。'),
  d('溫尚翊', '上次那個更扯好不好！'),
  d('陳信宏', '好啦，先不要生氣啦，說不定今天會遇到合適的。'),
  d('溫尚翊', '最好是啦。'),
  n('你坐在靠牆的位置，手裡拿著剛買來的飲料，看他一副隨時要跟鼓組吵架的樣子，忍不住笑了一聲。'),
  d('你', '你今天看起來好凶喔，等一下人家會不會不敢進來？'),
  d('溫尚翊', '蛤？我哪有很凶？'),
  d('瑪莎', '有啊，我剛剛差點以為你要把鼓棒折斷。'),
  d('溫尚翊', '蔡昇晏！'),
]

const failedAuditionBlocks: Block[] = [
  n('第一個人一進門就說想先來一段自己的鼓 Solo。大家還沒來得及把吉他拿好，他已經坐到鼓組後面，從頭到尾打了快兩分鐘，最後還自己加了一個很長的收尾。'),
  d('面試者一', '怎麼樣？我平常比較習慣自己發揮。'),
  d('溫尚翊', '……我們是想找可以一起合奏的鼓手。'),
  d('瑪莎', '那你真的很適合一個人組團欸。'),
  n('第二個人看起來很有自信，大家才剛進第一段，他就一路越打越快。溫尚翊試著把速度拉回來，對方卻像完全沒聽見，還在最後一拍自己停了下來。'),
  d('面試者二', '欸？你們怎麼停了？'),
  d('溫尚翊', '因為我們在等你啊。'),
  d('面試者二', '喔，那你們下次可以跟著我的速度走。'),
  n('瑪莎把臉轉向牆壁，肩膀抖了兩下。石頭低頭整理導線，努力假裝自己什麼都沒聽見。'),
  d('溫尚翊', '不是，你到底有沒有在聽我們彈啊？'),
  n('第三個人倒是基本功很穩，節拍器一開就打得整整齊齊。只是每次大家想加一點變化，他都會停下來重新調節拍器，還認真地問能不能把所有歌都固定在同一個速度。'),
  d('面試者三', '我比較習慣完全照節拍器走，大家也可以配合一下。'),
  d('瑪莎', '那我們是不是還要先跟節拍器預約練團時間？'),
  d('陳信宏', '謝謝你今天過來喔，我們再聯絡。'),
  n('人一走，溫尚翊把吉他放到椅子上，兩手叉腰站了一會兒。'),
  d('溫尚翊', '我真的快被氣死了。'),
  d('你', '哈哈哈哈哈哈！'),
  d('溫尚翊', '妳還笑！'),
  d('瑪莎', '不然下一個讓怪獸自己坐上去打好了，反正他什麼都會。'),
  d('溫尚翊', '你要不要聽聽看自己在講什麼？'),
]

const newDrummerBlocks: Block[] = [
  n('大家正準備休息，門外又響起敲門聲。這次進來的是個看起來有些腼腆的男生，背著一個舊背包，手裡拿著鼓棒。'),
  n('他站在門口，先朝大家點了點頭，視線在屋裡繞了一圈，最後才落到鼓組上。'),
  d('陳泳錩', '不好意思……請問這裡是找鼓手的地方嗎？'),
  d('劉諺明', '對，你是來面試的嗎？'),
  d('陳泳錩', '嗯，我叫陳泳錩。'),
  d('陳信宏', '你之前有跟團的經驗嗎？'),
  d('陳泳錩', '有一點……不過還不是很正式。'),
  n('他說話的聲音不大，介紹自己的時候還有點不好意思。溫尚翊把鼓棒遞過去，語氣倒是比剛才客氣了不少。'),
  d('溫尚翊', '沒關係啦，先試試看。'),
  n('陳泳錩接過鼓棒，小聲說了句謝謝。他坐下來調整椅子和鼓的距離，剛才還有些拘謹，手指甚至在鼓棒上換了兩次握法。'),
  n('第一聲鼓點落下。'),
  n('咚。'),
  n('緊接著，穩定的節奏鋪開。他的背挺直了，手腕一下子靈活起來，底鼓和軍鼓之間的配合乾淨俐落，銅鈸落下的時機也恰到好處。'),
  n('陳信宏幾乎是第一時間就接上了吉他，石頭跟著進來，瑪莎低頭看著 Bass，嘴角慢慢揚起來。'),
  n('溫尚翊原本只是抱著試試看的心態，彈著彈著，眼睛卻亮了起來。他臨時加了一個變化，陳泳錩聽了一下，竟然穩穩接住。'),
  n('一段結束，陳泳錩放下鼓棒，有些不好意思地看向大家。'),
  d('陳泳錩', '……剛剛有哪裡不好的話，可以再試一次。'),
  d('溫尚翊', '等一下。你剛剛最後那個變化，是自己加的喔？'),
  d('陳泳錩', '嗯，我習慣那樣收尾。'),
  d('溫尚翊', '再來一次。'),
  n('第二次合奏，他打得比剛才更放開，最後甚至主動接住溫尚翊臨時加進去的變化。鼓點落下的瞬間，溫尚翊直接笑了出來。'),
  d('溫尚翊', '欸！這個可以欸！'),
  d('瑪莎', '終於來了一個正常的。'),
  d('陳信宏', '真的很不錯欸，剛剛那段接得很好。'),
  d('石錦航', '而且聽得很仔細。'),
  d('陳泳錩', '謝謝……'),
  n('大家還在說剛才那段的時候，陳泳錩忽然看向站在一旁的諺明哥。他猶豫了一下，握著鼓棒的手指輕輕動了動。'),
  d('陳泳錩', '那個……我可以跟你打一段嗎？'),
  d('劉諺明', '跟我？'),
  d('陳泳錩', '嗯。我剛剛有聽到你在旁邊打拍子，想跟你試試看。'),
  n('瑪莎立刻來了精神，拍了兩下手。'),
  d('瑪莎', '喔喔喔！這是要幹嘛？'),
  d('溫尚翊', 'Battle 喔？'),
  d('陳泳錩', '如果可以的話……'),
  d('劉諺明', '好啊，那我陪你玩一段。'),
  n('諺明哥拿起另一副鼓棒，先敲出一段穩定的節奏。陳泳錩聽著，沒有急著搶拍，而是等諺明哥留出空隙後才接上。兩個人一來一回，像是在用鼓棒聊天。'),
  n('諺明哥先加了一段變化，陳泳錩馬上接住；陳泳錩把鼓點收得很輕，諺明哥又用一個乾淨的重拍回應。後面節奏越來越熱鬧，旁邊的人也跟著拍手。'),
  d('溫尚翊', '欸欸欸！這個有意思！'),
  d('陳信宏', '他剛剛明明還那麼害羞欸。'),
  d('石錦航', '坐到鼓前面就完全不一樣了。'),
  n('最後諺明哥打出一個漂亮的收尾，陳泳錩緊跟著補上最後一記重拍。兩個人同時停下，練團室裡安靜了一秒，接著大家一起笑了起來。'),
  d('劉諺明', '不錯喔。'),
  d('陳泳錩', '你也很厲害。'),
  d('溫尚翊', '好啦，不用再試了。我覺得就是他了。'),
  d('瑪莎', '同意。'),
  d('陳信宏', '我也覺得可以。'),
  d('石錦航', '嗯，剛剛合起來真的很順。'),
  d('劉諺明', '我也沒問題。'),
  d('陳泳錩', '欸？所以……'),
  d('溫尚翊', '所以就你啦！'),
  d('陳泳錩', '謝謝……我會好好努力的。'),
  n('大家又確認了一次下次正式練團的時間。陳泳錩把鼓棒收進背包，走到門口時還回頭朝大家點了點頭。'),
  d('陳泳錩', '那……下次見。'),
  d('溫尚翊', '好啦，路上小心！'),
  n('門關上以後，練團室安靜了幾秒。'),
  d('瑪莎', '欸，我現在才發現，他剛剛坐下來之前真的一句話都不太敢講欸。'),
  d('陳信宏', '可是打起來真的很不一樣。'),
  d('石錦航', '而且他跟諺明哥那段配合得很好。'),
  d('劉諺明', '他的反應很快，聽得也很仔細。'),
  d('溫尚翊', '這次應該真的可以了。'),
  d('你', '終於不用再生氣了吧？'),
  d('溫尚翊', '我哪有一直生氣？'),
  d('瑪莎', '你剛剛那個臉喔，我都怕你把鼓手嚇跑。'),
  d('溫尚翊', '你今天真的很煩欸！'),
  n('你們忍不住笑起來。諺明哥把鼓組重新整理好，順手將多餘的鼓棒放回架子。'),
  d('劉諺明', '好了，既然人選確定了，接下來就等他正式來練幾次。'),
  d('陳信宏', '感覺下次會很好玩馁。'),
  d('石錦航', '嗯，今天總算有個好消息了。'),
]

const routes: Record<May10Character, Route> = {
  wen: {
    name: '溫尚翊',
    intro: [
      n('溫尚翊坐回鼓組旁邊，拿起陳泳錩剛才用過的鼓棒看了看，像是還在回味最後那段合奏。'),
      n('你走過去，把手裡的飲料遞給他。他接過去，仰頭喝了一口。'),
      d('溫尚翊', '欸，妳剛剛有沒有認真聽？'),
    ],
    rounds: [
      round('他把飲料放在旁邊，鼓棒在指尖轉了一下。', [
        c('你剛才那個臉都快皺在一起了。', [d('溫尚翊', '那是在思考好不好！'), d('溫尚翊', '前面幾個真的很誇張欸，我都不知道要怎麼接話。')], 1),
        c('終於找到人了，值得慶祝一下。', [d('溫尚翊', '對啊，這次真的可以了。'), n('他笑著用鼓棒輕輕敲了一下你的飲料罐。'), d('溫尚翊', '那妳這罐先借我當慶功酒啦。')], 2),
        c('你剛剛是不是已經想把人趕出去了？', [d('溫尚翊', '我哪有！'), n('他看了你一眼，自己也忍不住笑了。'), d('溫尚翊', '好啦，第二個真的有一點。')], 0),
      ]),
      round('他把鼓棒放回架子，抬手揉了揉剛才繃得有點緊的肩膀。', [
        c('你跟陳泳錩說再來一次的時候，整個人都精神了。', [d('溫尚翊', '因為他接得住啊。'), d('溫尚翊', '有人可以一起把東西玩起來，感覺差很多欸。')], 2),
        c('你是不是已經開始想下次要練什麼了？', [d('溫尚翊', '有啊，剛剛那個地方還可以再試別的變化。'), d('溫尚翊', '下次他來，我想直接把整段跑一次。')], 1),
        c('你下次不准再把面試的人嚇跑了。', [d('溫尚翊', '蛤？我哪有嚇人！'), d('溫尚翊', '我明明很客氣欸。')], 0),
      ]),
      round('他把吉他拿起來，隨手撥了兩下弦，又看向你。', [
        c('下次正式練團，我也要來。', [d('溫尚翊', '那妳就來啊。'), d('溫尚翊', '坐妳平常那個位置就好，聽得到。')], 2),
        c('你今天笑得比剛才面試時好看多了。', [n('他手上的弦音突然停了一下。'), d('溫尚翊', '……妳突然講這個幹嘛啦。'), n('他低頭調了一下弦，耳朵有點紅。')], 2),
        c('今天可以少生一點氣了吧？', [d('溫尚翊', '看在終於找到鼓手的份上，今天放過他們。'), d('溫尚翊', '也放過妳，妳剛剛笑最大聲。')], 1),
      ]),
    ],
    tease: [
      n('你們正說著，瑪莎從旁邊經過，聽見最後一句，立刻停下腳步。'),
      d('瑪莎', '喔，怪獸現在連練團都要有人陪了喔？'),
      d('溫尚翊', '你很閒是不是？'),
      d('陳信宏', '有人來陪練團也不錯啊。'),
      n('溫尚翊瞥了你一眼，沒再接話，拿起吉他假裝忙著調弦。'),
    ],
    ending: [
      n('溫尚翊把吉他背帶重新調好，說下次要早點來把剛才那段試完。'),
      d('溫尚翊', '下次不要遲到喔。'),
      n('他說得像是在交代練團時間，卻又特地看了你一眼。'),
    ],
  },
  ashin: {
    name: '陳信宏',
    intro: [
      n('陳信宏坐在椅子上，把剛才用過的樂譜一張張疊好。你走過去時，他抬頭看見你，順手把旁邊的位置留了出來。'),
      d('陳信宏', '欸，妳剛剛有沒有嚇到？'),
    ],
    rounds: [
      round('他把樂譜放在膝上，手指輕輕壓住紙角。', [
        c('我還以為他剛剛會一直那麼害羞欸。', [d('陳信宏', '對啊，我一開始也有點意外。'), d('陳信宏', '結果一坐上去，整個人就不一樣了。')], 1),
        c('你剛剛接他的節奏接得好快。', [d('陳信宏', '因為他打得很穩啊。'), d('陳信宏', '我只要聽著他的拍子走，就很容易接上去。'), n('他低頭笑了一下。'), d('陳信宏', '好久沒有這麼順了。')], 2),
        c('你是不是也鬆了一口氣？', [d('陳信宏', '嗯，有一點。'), d('陳信宏', '大家最近為了找鼓手的事情，真的花了不少時間。')], 1),
      ]),
      round('陳信宏把整理好的樂譜放在桌上，手指還壓著其中一頁。', [
        c('你是不是已經在想下一首歌了？', [d('陳信宏', '有一點點啦。'), d('陳信宏', '不過還沒想完整，等下次大家一起試試看。')], 2),
        c('他看起來那麼害羞，以後你們會不會欺負他？', [d('陳信宏', '應該不會吧。'), d('陳信宏', '不過我覺得他可能會慢慢習慣我們這邊的氣氛。')], 1),
        c('那以後練團室是不是會比以前更熱鬧？', [d('陳信宏', '一定會啊。'), d('陳信宏', '尤其是瑪莎，感覺又多了一個可以鬧的人。')], 1),
      ]),
      round('他把樂譜收好，抬頭看了你一會兒。', [
        c('下次練團我還坐這裡聽，好不好？', [d('陳信宏', '當然好啊。'), d('陳信宏', '妳坐這裡就可以聽得很清楚了。')], 2),
        c('那你下次可不准彈錯了。', [d('陳信宏', '欸，妳要求也太高了吧。'), d('陳信宏', '如果我又彈錯，妳還是要聽完喔。')], 1),
        c('其實我覺得你剛才笑起來特別好看。', [n('陳信宏手上的樂譜停了一下。'), d('陳信宏', '……真的喔？'), n('他低頭把紙邊對齊，嘴角卻一直沒壓下來。')], 2),
      ]),
    ],
    tease: [
      n('溫尚翊剛好經過，看到陳信宏還坐在你旁邊。'),
      d('溫尚翊', '阿信，你那個譜到底收好了沒？'),
      d('瑪莎', '收譜需要笑成這樣喔？'),
      d('陳信宏', '你們兩個很無聊欸。'),
    ],
    ending: [
      n('陳信宏把樂譜放進資料夾，說下次可以把剛才那段重新試一遍。'),
      d('陳信宏', '下次妳也來聽喔，我想再試一次那個接法。'),
    ],
  },
  masa: {
    name: '瑪莎',
    intro: [
      n('瑪莎正坐在音箱旁邊，手裡轉著一根鼓棒。看見你走過去，他立刻抬頭。'),
      d('瑪莎', '欸，妳來得正好。剛剛那幾個人是不是很精彩？'),
    ],
    rounds: [
      round('他把鼓棒往掌心一拍，像是又想起剛才的面試。', [
        c('我看到你剛才差點笑出聲了。', [d('瑪莎', '我已經很努力了好不好！'), d('瑪莎', '尤其是第一個，我真的差點忍不住。')], 2),
        c('你對前面那幾個人也太不客氣了吧。', [d('瑪莎', '我哪有？'), d('瑪莎', '我明明很有禮貌欸。'), d('瑪莎', '而且第二個還叫我們跟著他打耶。')], 1),
        c('你剛才誇陳泳錩倒是很快嘛。', [d('瑪莎', '有實力幹嘛不誇？'), d('瑪莎', '總比前面那幾個好吧。')], 1),
      ]),
      round('瑪莎把鼓棒放到一旁，伸了個懶腰。', [
        c('我覺得他以後可能會被你欺負。', [d('瑪莎', '蛤？我哪有那麼壞！'), d('瑪莎', '而且他剛剛不是也敢找諺明哥 Battle 嗎？')], 1),
        c('你剛才跟著他的拍子點頭了欸。', [d('瑪莎', '我那是在聽音樂好不好。'), d('瑪莎', '不然咧，難道要我站在旁邊發呆？')], 1),
        c('你是不是其實很期待下一次練團？', [d('瑪莎', '……還好啦。'), d('瑪莎', '不過今天確實不錯。')], 2),
      ]),
      round('他拿起 Bass 包的拉鍊拉了兩下，抬頭看你。', [
        c('下次你教我怎麼分辨鼓手打得好不好？', [d('瑪莎', '妳先學會不要把拍子數錯再說。'), d('瑪莎', '不過可以啦，我教妳。')], 2),
        c('你以後不准再吐槽人家了。', [d('瑪莎', '我只吐槽不行喔？'), d('瑪莎', '那妳要不要順便規定我以後不准講話？')], 0),
        c('你今天笑得比平常多欸。', [d('瑪莎', '妳看錯了啦。'), n('他肩膀輕輕撞了你一下。'), d('瑪莎', '……今天是有比較好玩一點。')], 2),
      ]),
    ],
    tease: [
      n('石頭從旁邊經過，聽見你們的對話，停下來看了一眼。'),
      d('石錦航', '瑪莎，你剛剛不是還說今天很煩嗎？'),
      d('瑪莎', '我現在改變主意不行喔？'),
      d('溫尚翊', '你真的很善變欸。'),
      d('瑪莎', '你管我！'),
    ],
    ending: [
      n('瑪莎把 Bass 包的拉鍊拉好，順手把鼓棒往架子上一放。'),
      d('瑪莎', '下次妳要來就早點來，免得錯過好玩的。'),
    ],
  },
  stone: {
    name: '石錦航',
    intro: [
      n('石頭正在整理剛才散落的導線。你走過去時，他看見你，稍稍挪出一點位置。'),
      d('石錦航', '妳要不要坐這邊？那邊東西有點多。'),
    ],
    rounds: [
      round('他把最後一條線收好，抬頭看了你一眼。', [
        c('你剛才是不是第一個聽出他節奏很穩？', [d('石錦航', '有注意到一點。'), d('石錦航', '他雖然一開始比較緊張，不過拍子一直很穩。')], 2),
        c('他看起來那麼害羞，沒想到打起鼓來完全不一樣。', [d('石錦航', '嗯，我也有點意外。'), d('石錦航', '可能音樂對他來說，是比較熟悉的表達方式吧。')], 1),
        c('看到你們終於找到人，我也鬆了一口氣。', [d('石錦航', '我也是。'), d('石錦航', '大家這段時間其實都很努力，只是一直沒有遇到合適的。')], 2),
      ]),
      round('石頭把線材放回架子，順手把桌邊的樂譜疊整齊。', [
        c('你覺得他下次來還會這麼害羞嗎？', [d('石錦航', '可能還是會吧。'), d('石錦航', '不過熟悉以後應該會好一點。')], 1),
        c('你剛才跟他合奏的時候，看起來很開心欸。', [d('石錦航', '真的嗎？'), d('石錦航', '因為今天那段真的彈得很順，大家都接得很好。')], 2),
        c('你是不是已經在想下次練什麼了？', [d('石錦航', '有一點。'), d('石錦航', '不過還是要等他正式來了再說。')], 1),
      ]),
      round('石頭把最後一張譜放好，替你把旁邊的椅子拉開。', [
        c('下次練團你還坐我旁邊嗎？', [d('石錦航', '如果妳想的話，當然可以。')], 2),
        c('我覺得你今天特別可靠欸。', [d('石錦航', '我只是做自己能做的事情而已。'), d('石錦航', '不過……謝謝妳這麼說。')], 2),
        c('以後我也可以幫忙整理線材嗎？', [d('石錦航', '可以啊。'), d('石錦航', '不過要小心，不要被線絆到了。'), n('他看了看你，又補了一句。'), d('石錦航', '有些比較重的東西還是讓我們來就好。')], 1),
      ]),
    ],
    tease: [
      n('瑪莎看見石頭把椅子拉到你旁邊，立刻從音箱後面探出頭。'),
      d('瑪莎', '石頭，你是不是把整理線材變成約會了？'),
      d('石錦航', '我只是怕她被線絆到。'),
      d('溫尚翊', '這個理由也太好了吧。'),
    ],
    ending: [
      n('石頭把最後一條線收進箱子，站起來時順手替你把椅子推回桌邊。'),
      d('石錦航', '下次來的時候，還是坐這邊吧，這裡比較不會被線絆到。'),
    ],
  },
  yanming: {
    name: '劉諺明',
    intro: [
      n('諺明哥把鼓組重新檢查了一遍，確認鼓棒和踏板都放回原位。你走過去時，他剛好把工具收進抽屜。'),
      d('劉諺明', '怎麼了？剛才那段 Battle 很精彩吧。'),
    ],
    rounds: [
      round('他把抽屜關上，像是還在想剛才的節奏。', [
        c('你是不是沒想到他會主動找你？', [d('劉諺明', '確實有一點意外。'), d('劉諺明', '他剛進來的時候看起來還滿害羞的。')], 2),
        c('我還以為你不會答應呢。', [d('劉諺明', '為什麼不答應？'), d('劉諺明', '既然他有興趣，我也正好可以看看他的反應。')], 1),
        c('你們最後那一下也太整齊了吧。', [d('劉諺明', '那是他接得好。'), d('劉諺明', '我本來只是想試試他的反應，沒想到他真的跟上來了。')], 2),
      ]),
      round('諺明哥把鼓棒放進收納袋，拉好拉鍊。', [
        c('你覺得他適合跟大家一起玩嗎？', [d('劉諺明', '我覺得可以。'), d('劉諺明', '他的節奏很穩，也願意聽別人的變化。')], 1),
        c('你以前也經常這樣跟別人 Battle 嗎？', [d('劉諺明', '以前練團的時候偶爾會啊。'), d('劉諺明', '有時候不是為了分出誰比較厲害，就是互相玩一下。')], 2),
        c('你剛才看起來很開心欸。', [d('劉諺明', '遇到有意思的鼓手，當然會開心。'), d('劉諺明', '而且他還主動找我，這點滿難得的。')], 2),
      ]),
      round('他把收納袋放到桌上，轉頭看你。', [
        c('下次我可以來聽你們練團嗎？', [d('劉諺明', '妳不是本來就常來嗎？'), d('劉諺明', '當然可以啊。')], 1),
        c('下次你也教我一點打鼓吧。', [d('劉諺明', '可以啊。'), d('劉諺明', '有空我教妳最基本的節奏，先從簡單的開始。')], 2),
        c('你今天也辛苦了，諺明哥。', [d('劉諺明', '我還好，今天主要是他們在忙。'), d('劉諺明', '不過，謝謝妳記得。')], 2),
      ]),
    ],
    tease: [
      n('溫尚翊看著你們兩個，忽然笑了一聲。'),
      d('溫尚翊', '欸，諺明哥，鼓組收好了嗎？還是還要再教她一節課？'),
      d('瑪莎', '我覺得你們可以收學費了。'),
      d('劉諺明', '你們真的很閒欸。'),
    ],
    ending: [
      n('諺明哥把收納袋放進櫃子，關上抽屜。'),
      d('劉諺明', '下次妳要來的話，先跟我說一聲，我把比較合適的鼓棒留給妳。'),
    ],
  },
}

const jealousyRoutes: Record<May10Character, JealousyRoute> = {
  wen: {
    intro: [
      n('另一頭的溫尚翊正把導線繞成圈，聽見你們笑了一聲，手指卻停在插頭上。他沒立刻抬頭，只把那圈線繞完，才往這邊看。等你再回過神，他已經把導線掛回架上，朝你走來，步子比平常快了半拍。'),
      d('溫尚翊', '欸，妳過來一下。'),
      d('溫尚翊', '我剛剛那個地方還想問妳，現在啦。'),
    ],
    rounds: [
      round('他用指節敲了敲琴身，像是有話想問，又不太肯先開口。', [
        c('你是不是一直在等我？', [d('溫尚翊', '誰等妳了！'), n('他立刻把臉轉向音箱，拇指沿著邊緣蹭了一下，明明沒要調音，卻把旋鈕碰得輕輕響了一聲。'), d('溫尚翊', '我只是剛好有事要問啦。')], 2),
        c('你剛才不是有話要跟我說嗎？', [d('溫尚翊', '對啊。'), n('他張了張嘴，話到一半又吞回去，目光落在你身後那張空椅子上，像是在重新找一個比較不丟臉的開場。'), d('溫尚翊', '……等一下再講也可以。')], 1),
        c('你是不是有點不高興？', [d('溫尚翊', '我哪有！'), n('他嘴角鬆了一點，肩膀卻還繃著，說到後半句時，聲音明顯低了下去。'), d('溫尚翊', '就覺得妳聊很久了。')], 2),
      ], [
        n('他把你帶到音箱旁，自己卻沒坐下。吉他還掛在肩上，他先低頭把橫在你腳邊的導線撥到一旁，才用手掌撐住音箱頂端。剛才還皺著的眉頭沒有完全鬆開，眼神卻總往你身上跑。'),
      ]),
      round('等音準穩了，他才側過臉看你，語氣還是硬邦邦的。', [
        c('你可以直接叫我過來啊。', [d('溫尚翊', '我剛剛不是叫了嗎？'), n('他把撥片夾在指間轉了半圈，話說得很硬，目光卻一直沒有離開你。'), d('溫尚翊', '……妳下次不要讓我等那麼久就好。')], 2),
        c('你剛剛是不是在吃醋？', [d('溫尚翊', '妳少亂講啦！'), n('他伸手去轉效果器的旋鈕，轉了一下又停住，像是忽然想起根本還沒接上電源。'), d('溫尚翊', '我只是有點事情想跟妳講。')], 1),
        c('我也想跟你待一會兒。', [n('他終於抬眼看你，眉心那道皺褶一點點散開，原本抓著琴頸的手也鬆了些。'), d('溫尚翊', '那妳就先不要走啊。')], 2),
      ], [
        n('他把吉他抱正，撥了兩下弦。第一個音還有點飄，他皺著眉轉了轉弦鈕，明明已經調得差不多，手卻一直沒離開琴頭。'),
      ]),
      round('他終於想起剛才說有事情要問你，抬眼時表情比前兩輪自然了一點。', [
        c('那我陪你把線收完。', [d('溫尚翊', '好啊，妳拿那條就好。'), n('他先把地上那條線理直，才把比較輕的那一端遞給你，自己蹲下去收另一頭，還回頭確認你有沒有拿穩。')], 2),
        c('下次想聽你把剛才那段彈給我聽。', [d('溫尚翊', '那妳下次要早點來。'), n('他把撥片夾回琴弦間，笑意從嘴角冒出來，這回也沒再找事情把自己支開。')], 2),
        c('你也坐下來休息一下啦。', [d('溫尚翊', '我本來就要休息啊。'), n('他把吉他靠到腳邊，拖過旁邊那張矮凳坐下，膝蓋朝你的方向偏了一點，終於肯把手上的事放著不管。')], 1),
      ], [
        n('他把吉他背帶從肩上拉開，重新扣好，手指在扣環上多停了一秒。音箱旁的導線已經收得差不多，他卻沒有急著回去，反而把吉他往身側挪了挪，給你留出站的位置。'),
      ]),
    ],
    ending: [n('最後一條導線被他繞好掛回架上。溫尚翊拍了拍手上的灰，往練團室門口看了一眼，卻沒催你跟上，只用鞋尖把身旁那張椅子勾近了一點。'), d('溫尚翊', '等一下再走啦，還有時間。')],
  },
  ashin: {
    intro: [
      n('陳信宏坐在桌邊整理樂譜。你們的笑聲傳過去時，他手上的紙疊到一半，指尖在頁角停了一會兒。等你抬頭，他才把吉他背好，抱著譜走近，像是想了幾秒才決定開口。'),
      d('陳信宏', '欸，妳等一下有空嗎？我剛剛那段還想再彈給妳聽一次。'),
    ],
    rounds: [
      round('他的手指停在弦上，像是在斟酌要從哪一句開始。', [
        c('你是不是等我很久了？', [d('陳信宏', '也沒有很久啦。'), n('他笑著把琴頸往懷裡收了收，目光仍落在你臉上，像是在確認你有沒有真的聽見他的話。'), d('陳信宏', '只是剛剛看到妳在聊天，就先沒有打擾。')], 2),
        c('你剛才想給我聽什麼？', [d('陳信宏', '就是那個新接法啊。'), n('他指腹在琴弦上輕輕掃過，像是又想起剛才那段旋律。'), d('陳信宏', '我怕等一下忘記，所以想先找妳試聽看看。')], 1),
        c('你是不是有一點在意我跟別人聊太久？', [n('他正要撥弦的手停在半空，指尖懸了一秒才收回去，笑意慢慢從眼角浮出來。'), d('陳信宏', '有一點點啦。'), d('陳信宏', '不過我沒有要打斷妳。')], 2),
      ], [
        n('陳信宏把吉他抱在身前，指腹沿著弦輕輕掃過，發出一聲很短的悶音。他沒有急著彈，只抬眼看你，等你把注意力放回他身上。'),
      ]),
      round('他指了指其中一處，說明時還特地放慢了速度。', [
        c('下次你可以直接叫我啊。', [d('陳信宏', '好啊，那我下次就不客氣了。'), n('他把譜往你這邊推近一點，指尖仍壓著那個空白的位置。'), d('陳信宏', '妳不要嫌我一直找妳就好。')], 2),
        c('你剛剛是不是有點吃醋？', [d('陳信宏', '欸，被妳發現了喔？'), n('他低頭把譜上的鉛筆痕描了一遍，嘴角卻壓不住，耳尖也慢慢泛紅。'), d('陳信宏', '我只是也想跟妳講講話嘛。')], 2),
        c('我沒有忘記你啦。', [n('他再抬起眼時，剛才那點藏著的笑已經留在臉上，連眼睛都彎了起來。'), d('陳信宏', '嗯，我知道啊。'), d('陳信宏', '只是聽妳這樣講，還是會開心。')], 1),
      ], [
        n('他把樂譜翻到背面，紙上有幾個鉛筆改過的和弦記號。他用指尖壓住翹起的紙角，把那一小塊空位推到你面前，自己也跟著靠近半步。'),
      ]),
      round('他看起來終於放鬆下來，連說話的尾音都輕快了些。', [
        c('那我現在專心聽你彈。', [d('陳信宏', '好，那妳要認真聽喔。'), n('第一個和弦落下來時，他側過臉留意你的反應；接著把速度放慢，讓每個音都清清楚楚地停在你面前。')], 2),
        c('我想坐在你旁邊聽。', [d('陳信宏', '這邊有位置啊。'), n('他起身把靠牆那張椅子拖近，椅腳在地板上擦出一聲輕響，還伸手替你把椅面上的譜紙拿開。')], 2),
        c('等一下你也要聽我說話。', [d('陳信宏', '好啊。'), n('他把手掌從琴弦上移開，整個人轉向你，真的把接下來的時間空了出來。'), d('陳信宏', '今天妳想講多久都可以。')], 1),
      ], [
        n('他把椅子往旁邊挪出一點，吉他也跟著轉向你。右手停在弦上，他先試了一個和弦，抬眼確認你有沒有準備好，才把手指放回正確的位置。'),
      ]),
    ],
    ending: [n('最後一個和弦慢慢散掉，他的手掌仍輕輕貼在琴弦上。等餘音完全停了，他才抬起頭，朝你露出一個有點捨不得結束的笑。'), d('陳信宏', '下次還想先彈給妳聽。')],
  },
  masa: {
    intro: [
      n('瑪莎斜靠在音箱旁，手臂交疊，鞋尖有一下沒一下地點著地面。看見你走近，他先挑了挑眉，視線往你剛才聊天的方向飄了一眼，才慢悠悠挪開半步，明明留了位置，嘴上卻一副不在乎的樣子。'),
      d('瑪莎', '欸，妳今天很忙喔？我是不是要先拿號碼牌？'),
    ],
    rounds: [
      round('他偏了偏頭，明知故問的語氣一點也沒藏。', [
        c('你也想跟我聊天喔？', [d('瑪莎', '不然咧？我站這裡當背景喔？'), n('他把下巴往旁邊一抬，像是在等你承認自己也想找他。')], 2),
        c('你是不是在等我過來？', [d('瑪莎', '我哪有等！'), n('他先瞄了一眼自己剛讓出來的空位，像是怕你沒看見，隨即又裝作只是隨便看了看。'), d('瑪莎', '……我是剛好有位置。')], 2),
        c('你剛剛是不是在吃醋？', [d('瑪莎', '妳今天問題很多欸。'), n('他抬手用指節輕輕敲了下你的額頭，力道不重；敲完還故意把手收回去，挑眉等你抗議。'), d('瑪莎', '有空猜這個，不如先陪我講話。')], 1),
      ], [
        n('瑪莎斜靠在音箱旁，手臂交疊，鞋尖有一下沒一下地點著地面。你走近時，他先挑了挑眉，視線往你剛才聊天的方向飄了一眼，嘴角那點笑怎麼看都像故意的。'),
      ]),
      round('那副若無其事的樣子，反而讓人更想逗他。', [
        c('那你直接說想找我不就好了？', [d('瑪莎', '我有說啊，是妳剛剛沒聽到。'), n('他抬起眉毛看你，像是早就等著你自己把這句話說出來。'), d('瑪莎', '現在補聽還來得及。')], 2),
        c('我又沒有不理你。', [d('瑪莎', '最好是啦。'), n('他鼻子裡哼了一聲，嘴上不肯承認，腳下卻把原本靠著的那隻腳收回來，整個人不知不覺站近了些。'), d('瑪莎', '那妳現在就先不要跑。')], 1),
        c('你是不是有什麼話想跟我說？', [d('瑪莎', '有啊。'), n('他故意把話卡在那裡，低頭拉了拉琴包拉鍊，等你看過來才抬起眼，笑得一臉得逞。'), d('瑪莎', '我想叫妳不要一直被別人拐走。')], 2),
      ], [
        n('他終於把手臂放下來，手指勾著 Bass 包的背帶晃了兩下。嘴上講得漫不經心，眼睛卻一直留意你的反應；你一看過去，他又裝作在研究包上的拉鍊。'),
      ]),
      round('他把背帶往肩上一搭，等著聽你怎麼回答。', [
        c('好啦，我現在陪你。', [d('瑪莎', '這還差不多。'), n('他用鞋尖把旁邊的椅子勾過來，椅子滑到你面前時，他還伸手扶了一下，免得撞上你的腳。')], 2),
        c('那你要不要先請我吃東西？', [d('瑪莎', '妳很會欸，安慰還要收費喔？'), d('瑪莎', '走啦，等一下看有沒有東西吃。')], 2),
        c('你今天不要再裝沒事了。', [d('瑪莎', '我哪有裝？'), n('他偏過肩膀輕輕撞了你一下，見你轉頭，立刻又把視線移開，假裝只是站得太近。'), d('瑪莎', '好啦，今天讓妳贏一次。')], 1),
      ], [
        n('瑪莎蹲下來把 Bass 包側邊翻起的背帶理順，拉鍊拉到一半又停住。他抬頭看你時，臉上那副逗人的表情倒是收斂了一點，像是想把話說得認真些。'),
      ]),
    ],
    ending: [n('瑪莎把 Bass 包甩上肩，背帶滑到手肘時，他隨手往上提了提。走到門邊，他本來已經轉過身，聽見你挪動椅子的聲音，又回頭確認你還在不在。'), d('瑪莎', '等一下不要又被別人叫走喔。')],
  },
  stone: {
    intro: [
      n('石頭把手裡的樂譜放到桌面，沒有立刻走近。他先把散在桌角的幾張紙疊齊，等你轉頭看見他，才抬手示意，聲音放得很輕，像是不想讓旁邊的人覺得被打斷。'),
      d('石錦航', '妳等一下方便嗎？我想跟妳說一件事。'),
    ],
    rounds: [
      round('他沒有急著追問，只留了足夠的時間讓你看清楚那一行。', [
        c('你是不是有話想跟我說？', [d('石錦航', '嗯，其實剛才就想找妳了。'), n('他把桌邊那疊譜往旁邊收好，說話時沒有催你，只安安靜靜等你看向他。'), d('石錦航', '只是看妳聊得很開心，就想等一下。')], 2),
        c('你剛剛是不是在等我？', [d('石錦航', '有一點。'), n('他沒有急著接話，只是把譜往你這邊挪了些，嘴角淡淡地彎起來，像是覺得承認也沒什麼不好。'), d('石錦航', '不過我不想打斷妳。')], 2),
        c('你也想跟我單獨待一下嗎？', [d('石錦航', '嗯，想啊。'), n('他把桌上的樂譜往自己那側收好，手掌在空出來的位置輕輕抹平，讓你能自然地站到他旁邊。')], 2),
      ], [
        n('石頭把樂譜攤在桌面，用指腹壓住被風吹起的頁角，指尖停在剛才合奏的那一小節。等你靠近，他才往下指了指，說話前還先替你把旁邊的椅子拉開。'),
      ]),
      round('他的語氣一向平穩，這次卻比平常多了一點想讓你聽懂的耐心。', [
        c('下次有事情可以直接找我。', [d('石錦航', '好，我會記得。'), n('他把筆放下，手掌在紙面上輕輕壓平，抬起眼時神情比剛才更柔和。'), d('石錦航', '妳也一樣，有事可以跟我說。')], 2),
        c('你是不是不太喜歡打斷別人？', [d('石錦航', '嗯，怕對方正在講重要的事。'), d('石錦航', '不過今天我還是想找妳。')], 2),
        c('我其實也想跟你說話。', [n('他抬起頭，原本專注在譜上的神情鬆開了些，目光停在你臉上，像是把剛才那句話也當成今天值得記住的事。'), d('石錦航', '那就好，我還怕只有我這樣想。')], 2),
      ], [
        n('他翻過那張譜，背面有幾個鉛筆寫下的拍點和箭頭。他用指尖沿著記號慢慢比了一遍，說明時偶爾抬眼看你，確認你有沒有跟上。'),
      ]),
      round('他抬起眼時，神情很安靜，卻沒有把話題就此收掉。', [
        c('那我陪你把譜整理完。', [d('石錦航', '好啊，這些很快就好了。'), n('他先把厚的那疊留在自己手邊，只把薄薄幾張遞給你，還順手壓住容易滑落的紙角。')], 2),
        c('你想不想跟我出去走一下？', [d('石錦航', '可以啊。'), d('石錦航', '等我把這邊收好，我們就走。')], 2),
        c('你今天看起來很開心。', [d('石錦航', '因為今天有好消息。'), n('他把筆放到紙邊，停了半拍，像是怕自己說得太直接，才又抬起眼補上後半句。'), d('石錦航', '而且妳也在。')], 2),
      ], [
        n('石頭把幾張譜依序疊好，沿著桌面把紙角對齊，最後才把資料夾闔上。他沒有立刻起身，手掌搭在資料夾上，留在你身邊等你把話說完。'),
      ]),
    ],
    ending: [n('石頭把最後一張譜收進資料夾，拇指沿著封面壓了一下才闔上。他替你把椅子推回桌邊，自己往旁邊讓出位置，沒有催你走。'), d('石錦航', '下次來，我再把剛才那段拿給妳看。')],
  },
  yanming: {
    intro: [
      n('諺明哥把最後一個鼓架鎖緊，確認踏板沒有鬆動，才走到櫃檯旁翻開預約簿。你走近時，他先把手裡的筆擱在本子上，抬眼朝你點了點頭，整個人仍帶著剛忙完的從容。'),
      d('劉諺明', '今天看起來總算順利了。'),
    ],
    rounds: [
      round('他把手掌在桌沿輕輕一搭，才轉過來聽你說。', [
        c('你剛剛是不是很久沒有打得這麼盡興了？', [d('劉諺明', '有一陣子了。'), n('他把鼓棒盒往桌內側推好，想了一下才接著說，語氣裡還留著剛才打完那段的愉快。'), d('劉諺明', '遇到願意互相聽節奏的人，打起來就是不一樣。')], 2),
        c('你是不是很欣賞陳泳錩？', [d('劉諺明', '我覺得他很有潛力。'), d('劉諺明', '而且他不是只顧著表現自己，這點很重要。')], 2),
        c('你剛才有沒有故意讓他一點？', [d('劉諺明', '沒有特別讓啦。'), n('他把鼓棒盒往旁邊推了推，笑意在眼角停了一下，像是也覺得剛才那段合奏很難得。'), d('劉諺明', '不過他接得很好，確實讓我有點意外。')], 1),
      ], [
        n('諺明哥把預約簿合上，將桌上的兩支鼓棒平行放回盒子裡，盒蓋沒有急著扣上。看得出來，他還在回想剛才那段合奏，說話時眼角仍帶著一點笑。'),
      ]),
      round('筆尖在紙上停了一下，他抬眼問你時，語氣仍是那種不疾不徐的穩。', [
        c('你覺得他很快就能跟大家熟起來嗎？', [d('劉諺明', '應該可以。'), d('劉諺明', '他剛開始比較害羞，不過音樂上很敢表達。')], 2),
        c('你會不會再找他打一次？', [d('劉諺明', '如果他願意，當然可以。'), d('劉諺明', '剛剛那段還有幾個地方可以再玩。')], 2),
        c('今天多虧你幫忙看面試。', [d('劉諺明', '這本來就是我該做的。'), n('他把預約簿闔起來，笑意很淡，像是不太習慣把謝意掛在嘴邊。'), d('劉諺明', '不過有人一起分擔，確實輕鬆不少。')], 1),
      ], [
        n('他重新翻開預約簿，在空白處寫下下次練團的時間。寫到一半，還停下來核對了一眼牆上的時鐘，確定沒有記錯才繼續。'),
      ]),
      round('他看著你，像是想把這段空檔好好留給你。', [
        c('下次我可以再來看你們練團嗎？', [d('劉諺明', '當然可以。'), n('他順手把椅子推回原位，語氣像是在說一件再平常不過的事，卻已經替你把下次來的事情安排好了。'), d('劉諺明', '妳來的話，記得跟我說一聲就好。')], 2),
        c('你有空也可以教我打鼓啊。', [d('劉諺明', '可以啊，先從基本拍子開始。'), d('劉諺明', '不過不要急，慢慢來就好。')], 2),
        c('你今天也辛苦了。', [d('劉諺明', '還好，今天最忙的是他們幾個。'), d('劉諺明', '謝謝妳特地過來。')], 2),
      ], [
        n('他把筆蓋扣好，順手把預約簿推回櫃檯內側，這才從手邊的事情裡抬起頭。見你還站在那裡，他沒有立刻轉身去忙別的，只把身旁的椅子往外拉了一點。'),
      ]),
    ],
    ending: [n('諺明哥把預約簿收進抽屜，確認抽屜推到底，才起身將門邊擋路的紙箱挪到牆邊，替你留出一條好走的路。'), d('劉諺明', '下次過來不用客氣，直接進來就好。')],
  },
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="narrative-blocks">
      {blocks.map((block, index) => block.kind === 'dialogue' ? (
        <div className="narrative-dialogue" key={index}>
          <span>{block.speaker}</span>
          <p>{'「' + block.text.replace(/^「|」$/g, '') + '」'}</p>
        </div>
      ) : (
        <p className="narrative-paragraph" key={index}>{block.text}</p>
      ))}
    </div>
  )
}

export function May10Story({
  affection,
  onAddAffection,
  onClockChange,
  onFinish,
}: {
  affection: Record<May10Character, number>
  onAddAffection: (character: May10Character, amount: number) => void
  onClockChange: (time: string) => void
  onFinish: (selection: May10Selection) => void
}) {
  const [progress, setProgress] = useState<Progress>(readProgress)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    onClockChange(clockForProgress(progress))
  }, [progress, onClockChange])

  // The one-person route picker is also a relationship choice. Apply its point
  // once, including when resuming a save made after the character was selected.
  useEffect(() => {
    if (!progress.character || localStorage.getItem(CHARACTER_SELECTION_AFFECTION_KEY) === 'true') return
    onAddAffection(progress.character, 1)
    localStorage.setItem(CHARACTER_SELECTION_AFFECTION_KEY, 'true')
  }, [progress.character, onAddAffection])

  const chooseCharacter = (character: May10Character) => {
    const maxAffection = Math.max(...ORDER.map((id) => Number(affection[id] ?? 0)))
    const jealousyCharacter = Number(affection[character] ?? 0) < maxAffection
      ? ORDER.find((id) => Number(affection[id] ?? 0) === maxAffection) ?? null
      : null
    setProgress({
      ...initialProgress,
      phase: 'interaction',
      character,
      jealousyCharacter,
    })
  }

  const chooseMainChoice = (index: number) => {
    if (!progress.character || progress.pendingChoice !== null) return
    const choice = routes[progress.character].rounds[progress.roundIndex].choices[index]
    if (!choice) return
    setProgress((current) => ({
      ...current,
      pendingChoice: index,
      choices: [...current.choices.slice(0, current.roundIndex), index],
    }))
    onAddAffection(progress.character, choice.affection)
  }

  const continueMainRound = () => {
    if (progress.pendingChoice === null) return
    if (progress.roundIndex < 2) {
      setProgress((current) => ({ ...current, roundIndex: current.roundIndex + 1, pendingChoice: null }))
    } else if (progress.jealousyCharacter) {
      setProgress((current) => ({ ...current, phase: 'jealousyIntro', pendingChoice: null }))
    } else {
      setProgress((current) => ({ ...current, phase: 'complete', pendingChoice: null }))
    }
  }

  const startJealousyInteraction = () => {
    if (!progress.jealousyCharacter) return
    setProgress((current) => ({ ...current, phase: 'jealousyInteraction', jealousyRoundIndex: 0, jealousyPendingChoice: null }))
  }

  const chooseJealousyChoice = (index: number) => {
    if (!progress.jealousyCharacter || progress.jealousyPendingChoice !== null) return
    const choice = jealousyRoutes[progress.jealousyCharacter].rounds[progress.jealousyRoundIndex].choices[index]
    if (!choice) return
    setProgress((current) => ({
      ...current,
      jealousyPendingChoice: index,
      jealousyChoices: [...current.jealousyChoices.slice(0, current.jealousyRoundIndex), index],
    }))
    onAddAffection(progress.jealousyCharacter, choice.affection)
  }

  const continueJealousyRound = () => {
    if (progress.jealousyPendingChoice === null) return
    if (progress.jealousyRoundIndex < 2) {
      setProgress((current) => ({ ...current, jealousyRoundIndex: current.jealousyRoundIndex + 1, jealousyPendingChoice: null }))
    } else {
      setProgress((current) => ({ ...current, phase: 'complete', jealousyPendingChoice: null }))
    }
  }

  const finish = () => {
    if (!progress.character || progress.choices.length !== 3) return
    if (progress.jealousyCharacter && progress.jealousyChoices.length !== 3) return
    onFinish({
      character: progress.character,
      choices: progress.choices,
      jealousyCharacter: progress.jealousyCharacter,
      jealousyChoices: progress.jealousyChoices,
    })
  }

  const route = progress.character ? routes[progress.character] : null
  const currentRound = route?.rounds[progress.roundIndex]
  const selectedChoice = progress.pendingChoice !== null && currentRound ? currentRound.choices[progress.pendingChoice] : null
  const jealousyRoute = progress.jealousyCharacter ? jealousyRoutes[progress.jealousyCharacter] : null
  const currentJealousyRound = jealousyRoute?.rounds[progress.jealousyRoundIndex]
  const selectedJealousyChoice = progress.jealousyPendingChoice !== null && currentJealousyRound
    ? currentJealousyRound.choices[progress.jealousyPendingChoice] : null

  return (
    <div className="story-screen-overlay">
      <div className="story-screen-head">
        <div className="chapter-mark">5 月 10 日・練團室</div>
        <div className="story-contact-title">
          <strong>新鼓手面試</strong>
          <small>1997 年 5 月 10 日・星期六</small>
        </div>
        <span className="story-head-spacer" />
      </div>

      <div className="story-narrative-scroll">
        <div className="story-kicker">MAY 10 · A NEW DRUMMER</div>

        {progress.phase === 'intro' && (
          <>
            <h2 className="story-scene-title">今天，練團室要找一個新鼓手。</h2>
            <Blocks blocks={auditionBlocks} />
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={() => setProgress((current) => ({ ...current, phase: 'auditions' }))}>
                開始今天的面試 <ChevronRight size={15} />
              </button>
            </div>
          </>
        )}

        {progress.phase === 'auditions' && (
          <>
            <h2 className="story-scene-title">前面幾位，真的各有各的問題。</h2>
            <Blocks blocks={failedAuditionBlocks} />
            <div className="reunion-pause-note">溫尚翊已經快要失去耐心了。</div>
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={() => setProgress((current) => ({ ...current, phase: 'newDrummer' }))}>
                看看最後一位面試者 <ChevronRight size={15} />
              </button>
            </div>
          </>
        )}

        {progress.phase === 'newDrummer' && (
          <>
            <h2 className="story-scene-title">最後進來的男生，和前面幾個完全不一樣。</h2>
            <Blocks blocks={newDrummerBlocks} />
            <div className="reunion-pause-note">陳泳錩正式確定成為樂團的新鼓手。</div>
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={() => setProgress((current) => ({ ...current, phase: 'picker' }))}>
                等他離開後，和大家聊聊 <ChevronRight size={15} />
              </button>
            </div>
          </>
        )}

        {progress.phase === 'picker' && (
          <>
            <h2 className="story-scene-title">新鼓手終於有著落了。</h2>
            <Blocks blocks={[
              n('陳泳錩離開後，大家還在回味剛才那段 Battle。溫尚翊難得沒有繼續抱怨，反而已經開始想下次要試什麼歌。'),
              n('練團室裡的氣氛比前陣子輕鬆不少。有人整理樂譜，有人收線，也有人只是坐在音箱旁邊休息。你看著他們，想趁這個空檔找一個人待一會兒。'),
            ]} />
            <div className="march29-reply-list">
              {ORDER.map((character) => (
                <button className="reply-choice" key={character} onClick={() => chooseCharacter(character)}>
                  <span>{NAMES[character]}</span><ChevronRight size={15} />
                </button>
              ))}
            </div>
          </>
        )}

        {progress.phase === 'interaction' && route && currentRound && (
          <>
            <h2 className="story-scene-title">練團空檔・和{route.name}待一會兒</h2>
            {progress.roundIndex === 0 && <Blocks blocks={route.intro} />}
            <div className="reunion-pause-note">第 {progress.roundIndex + 1}／3 輪・練團室的小空檔</div>
            <Blocks blocks={currentRound.scene ?? []} />
            <p className="narrative-paragraph">{currentRound.prompt}</p>
            {selectedChoice ? (
              <>
                <div className="reunion-pause-note">你選擇的回應</div>
                <Blocks blocks={[d('你', selectedChoice.text)]} />
                <Blocks blocks={selectedChoice.response} />
                {progress.roundIndex === 2 && <Blocks blocks={route.tease} />}
                <div className="story-action-bar story-inline-action">
                  <button className="story-primary-button" onClick={continueMainRound}>
                    {progress.roundIndex < 2 ? '繼續聊一會兒' : progress.jealousyCharacter ? '看看他有什麼反應' : '今天先到這裡'} <ChevronRight size={15} />
                  </button>
                </div>
              </>
            ) : (
              <div className="choice-area">
                <div className="choice-heading">你想怎麼回應？</div>
                {currentRound.choices.map((choice, index) => (
                  <button className="reply-choice" key={index} onClick={() => chooseMainChoice(index)}>
                    <span>{choice.text}</span><ChevronRight size={15} />
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {progress.phase === 'jealousyIntro' && jealousyRoute && progress.jealousyCharacter && progress.character && (
          <>
            <h2 className="story-scene-title">有人好像等得有點久了。</h2>
            <Blocks blocks={[n('你們又聊了一會兒。剛才的面試自然還是話題之一，聊著聊著，又說到下次練團和其他零零碎碎的小事。正說著，練團室另一頭忽然傳來一點動靜。')]} />
            <Blocks blocks={jealousyRoute.intro} />
            <Blocks blocks={[
              d(NAMES[progress.character], ({
                wen: '蛤？我們剛剛還沒講完欸。',
                ashin: '欸，我剛剛還有一段想給妳聽。',
                masa: '欸？現在才來喔？',
                stone: '沒關係，你們先聊。',
                yanming: '你們先說，我等一下再找她。',
              })[progress.character]),
              n('那句話一落下，練團室裡幾個人的動作都慢了半拍。有人手裡還拿著導線，卻忘了往架上掛；桌邊翻到一半的樂譜也停在原處。幾道視線很快碰在一起，又各自裝作沒事地移開，偏偏誰都沒有真的把注意力放回手上。'),
            ]} />
            <div className="reunion-pause-note">剛才的單獨聊天沒有被打斷，只是現在換另一個人想和你說話。</div>
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={startJealousyInteraction}>
                過去聽聽他想說什麼 <ChevronRight size={15} />
              </button>
            </div>
          </>
        )}

        {progress.phase === 'jealousyInteraction' && jealousyRoute && progress.jealousyCharacter && currentJealousyRound && (
          <>
            <h2 className="story-scene-title">練團室另一邊・和{NAMES[progress.jealousyCharacter]}說幾句話</h2>
            <div className="reunion-pause-note">額外互動・第 {progress.jealousyRoundIndex + 1}／3 輪</div>
            <Blocks blocks={currentJealousyRound.scene ?? []} />
            <p className="narrative-paragraph">{currentJealousyRound.prompt}</p>
            {selectedJealousyChoice ? (
              <>
                <div className="reunion-pause-note">你選擇的回應</div>
                <Blocks blocks={[d('你', selectedJealousyChoice.text)]} />
                <Blocks blocks={selectedJealousyChoice.response} />
                <div className="story-action-bar story-inline-action">
                  <button className="story-primary-button" onClick={continueJealousyRound}>
                    {progress.jealousyRoundIndex < 2 ? '繼續說一會兒' : '看今天的結尾'} <ChevronRight size={15} />
                  </button>
                </div>
              </>
            ) : (
              <div className="choice-area">
                <div className="choice-heading">你想怎麼回應？</div>
                {currentJealousyRound.choices.map((choice, index) => (
                  <button className="reply-choice" key={index} onClick={() => chooseJealousyChoice(index)}>
                    <span>{choice.text}</span><ChevronRight size={15} />
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {progress.phase === 'complete' && route && (
          <>
            <h2 className="story-scene-title">1997 年 5 月 10 日・練團室的午後</h2>
            <Blocks blocks={route.ending} />
            {jealousyRoute && <Blocks blocks={jealousyRoute.ending} />}
            <Blocks blocks={[
              n('今天總算找到合適的新鼓手了。陳泳錩正式加入，下一次練團，鼓聲就不會再空著。'),
              n('練團室裡的燈還亮著，大家一邊收拾東西，一邊又開始討論下次要練什麼。'),
            ]} />
            <div className="reunion-pause-note">今天的事情暫時告一段落。</div>
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={finish}>
                結束今天 <ChevronRight size={15} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
