import { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import type { March29DiaryCharacter } from './march29Diary'

type March29Character = March29DiaryCharacter
type March29Block =
  | { kind: 'narration'; text: string }
  | { kind: 'dialogue'; speaker: string; text: string }

type March29Choice = { text: string; response: string; affection: number; afterResponse: string }
type March29Round = { prompt: string; before?: March29Block[]; choices: March29Choice[] }
type March29EscortRoute = {
  name: string
  intro: March29Block[]
  rounds: March29Round[]
  ending: March29Block[]
}
type March29AfterPhase = 'group' | 'handsome' | 'restaurant' | 'escortPicker' | 'escort' | 'complete'
type March29AfterProgress = {
  phase: March29AfterPhase
  handsomeChoice: March29Character | null
  escortCharacter: March29Character | null
  roundIndex: number
  pendingReply: number | null
}

const STORAGE_KEY = 'mayday-march29-aftershow-progress'
const CHARACTER_ORDER: March29Character[] = ['wen', 'ashin', 'masa', 'stone', 'yanming']
const CHARACTER_NAMES: Record<March29Character, string> = {
  wen: '溫尚翊',
  ashin: '陳信宏',
  masa: '瑪莎',
  stone: '石錦航',
  yanming: '劉諺明',
}
const initialProgress: March29AfterProgress = {
  phase: 'group',
  handsomeChoice: null,
  escortCharacter: null,
  roundIndex: 0,
  pendingReply: null,
}

function readProgress(): March29AfterProgress {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as Partial<March29AfterProgress> | null
    const phases: March29AfterPhase[] = ['group', 'handsome', 'restaurant', 'escortPicker', 'escort', 'complete']
    if (!saved || !phases.includes(saved.phase as March29AfterPhase)) return initialProgress
    return {
      phase: saved.phase as March29AfterPhase,
      handsomeChoice: CHARACTER_ORDER.includes(saved.handsomeChoice as March29Character) ? saved.handsomeChoice as March29Character : null,
      escortCharacter: CHARACTER_ORDER.includes(saved.escortCharacter as March29Character) ? saved.escortCharacter as March29Character : null,
      roundIndex: Number.isInteger(saved.roundIndex) ? Math.max(0, Math.min(2, Number(saved.roundIndex))) : 0,
      pendingReply: Number.isInteger(saved.pendingReply) && Number(saved.pendingReply) >= 0 && Number(saved.pendingReply) <= 2 ? Number(saved.pendingReply) : null,
    }
  } catch {
    return initialProgress
  }
}

const afterShowBlocks: March29Block[] = [
  { kind: 'narration', text: '18:40，最後一個音符落下。台下的掌聲還沒有停，阿信剛把麥克風放低，怪獸就已經轉過身，朝身後的石頭伸出了手。' },
  { kind: 'narration', text: '兩個人重重地擊了一下掌。下一秒，瑪莎從旁邊衝過來，一把摟住怪獸的肩膀，佑達也從鼓組後面站起來，舉著鼓棒朝他們跑過去。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '啊啊啊啊啊！結束了啦！' },
  { kind: 'narration', text: '佑達喊完，把鼓棒往空中揮了一下，笑得整張臉都皺起來。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '靠！剛剛真的爽死了！' },
  { kind: 'narration', text: '瑪莎勾著怪獸的肩膀用力晃了兩下，貝斯還掛在身上，整個人興奮得停不下來。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '最後那段有沒有！有沒有！' },
  { kind: 'narration', text: '怪獸轉頭問石頭，手掌還在他肩上拍個不停，像是恨不得立刻把剛才的每個瞬間再演一次。' },
  { kind: 'dialogue', speaker: '石錦航', text: '有啦！我聽到了啦！' },
  { kind: 'narration', text: '石頭被他搖得往旁邊歪了一下，伸手抓住怪獸的手臂，兩個人又一起笑了出來。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '欸，我們真的演完了耶。' },
  { kind: 'narration', text: '阿信握著麥克風站在旁邊，額前的頭髮被汗沾得有點亂，說這句話時眼睛還亮亮的，像是自己也有點不敢相信。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '演完了啦！而且超順欸！' },
  { kind: 'narration', text: '他說完又伸手跟石頭碰了一下拳頭，笑得露出一排牙齒。' },
  { kind: 'dialogue', speaker: '石錦航', text: '你剛剛不是還說有一段會來不及？' },
  { kind: 'narration', text: '石頭故意學他上台前緊張的樣子，肩膀縮了一下，逗得瑪莎立刻笑出聲。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '我有說嗎？' },
  { kind: 'narration', text: '怪獸立刻裝傻，眼睛往旁邊飄，手卻還搭在石頭肩上沒放開。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '他有啦，他還一直碎念。' },
  { kind: 'narration', text: '瑪莎毫不留情地拆穿他，還伸手比了個嘴巴停不下來的動作。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '蔡昇晏你不要亂講。' },
  { kind: 'narration', text: '怪獸伸手要去推瑪莎，瑪莎早有準備，往佑達身後一躲，幾個人又鬧成一團。' },
  { kind: 'narration', text: '你才剛走近，就被怪獸一把抓住手腕。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '欸！妳也過來啦！' },
  { kind: 'narration', text: '他笑得眼睛都快看不見了，手掌還牢牢握著你的手腕，直接把你拉進幾個人中間。' },
  { kind: 'dialogue', speaker: '你', text: '蛤？幹嘛啦！' },
  { kind: 'narration', text: '你被他拉得往前踉蹌半步，還沒站穩，石頭已經伸手扶了一下你的肩膀。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '慶祝啊！快點！' },
  { kind: 'narration', text: '他說著便鬆開你的手腕，抬起兩隻手，示意大家一起來。' },
  { kind: 'dialogue', speaker: '石錦航', text: '來啦！今天都要跳！' },
  { kind: 'narration', text: '石頭笑著往前一蹦，還朝你伸出手，像是怕你臨陣逃跑。' },
  { kind: 'dialogue', speaker: '你', text: '你們不要一直拉我啦！' },
  { kind: 'narration', text: '你嘴上喊著，還是被他們帶著一起跳了起來。幾個人肩膀撞著肩膀，笑聲和尖叫聲混在一起，連剛才演出時的緊張都被甩得一乾二淨。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '哈哈哈哈哈！妳有沒有跳起來！' },
  { kind: 'narration', text: '阿信也跟著蹦了兩下，笑著朝你伸手，整個人難得這麼放開。' },
  { kind: 'dialogue', speaker: '你', text: '有啦！你們不要一直拉我！' },
  { kind: 'narration', text: '你被逗得笑到快站不直，伸手拍了拍阿信的手臂，總算從人堆裡退開一點。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '不行啦！今天一定要跳！' },
  { kind: 'narration', text: '怪獸又笑著朝你伸手，像是還想把你拉回去。' },
  { kind: 'narration', text: '就在大家鬧成一團的時候，溫尚翊忽然鬆開手，轉頭看了一眼石頭。石頭也正好看向他。兩個人對視了大概一秒。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '走啦！' },
  { kind: 'narration', text: '他只丟下兩個字，整個人已經往前衝了出去。' },
  { kind: 'dialogue', speaker: '石錦航', text: '走啊！' },
  { kind: 'narration', text: '石頭幾乎同時拔腿追上去，兩個人沿著草地旁邊的小路一路狂奔，邊跑邊嗷嗷叫。怪獸甚至舉起一隻手，像是在參加什麼莫名其妙的比賽；石頭在後面追著他，笑得整個人都快岔氣。' },
  { kind: 'dialogue', speaker: '你', text: '？？？？？' },
  { kind: 'narration', text: '你愣了半秒，接著看著兩個人越跑越遠，終於忍不住彎下腰，笑得肩膀直抖。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '靠！這兩個人有病喔！' },
  { kind: 'narration', text: '瑪莎站在原地看著他們，嘴上嫌棄，自己卻也笑到扶住了佑達的肩膀。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '哈哈哈哈哈哈！他們在幹嘛啦！' },
  { kind: 'narration', text: '阿信笑得彎下腰，拿著麥克風的手都跟著抖了兩下。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '欸！不要跑太遠啦！' },
  { kind: 'narration', text: '佑達把手圈在嘴邊朝遠處喊，喊完又自己笑了起來。' },
  { kind: 'narration', text: '過了一會兒，兩個人終於跑回來。溫尚翊一手撐著膝蓋，喘得說不出話；石頭也彎腰扶著腿，笑得停不下來。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '哈哈……靠……好爽喔！' },
  { kind: 'narration', text: '他抬起頭，額前的頭髮全亂了，卻還是一臉得意，像是剛剛贏了什麼大賽。' },
  { kind: 'dialogue', speaker: '石錦航', text: '你剛剛跑那麼快幹嘛啦！' },
  { kind: 'narration', text: '石頭喘著氣，伸手推了怪獸一下，自己先笑到站不直。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '你不是在追我嗎！' },
  { kind: 'narration', text: '怪獸理直氣壯地回嘴，還故意往旁邊跨了一步，躲開石頭的手。' },
  { kind: 'dialogue', speaker: '石錦航', text: '我哪有！明明是你先跑的！' },
  { kind: 'narration', text: '石頭伸手比了比剛才的方向，講到一半又忍不住笑出來。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '兩個幼稚鬼。' },
  { kind: 'narration', text: '瑪莎抱著手臂搖頭，臉上卻還掛著笑。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '我真的快笑死了……' },
  { kind: 'narration', text: '阿信抬手擦了擦眼角，總算把笑意壓下去一點。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '你們兩個等一下還有力氣走路嗎？' },
  { kind: 'narration', text: '諺明站在旁邊看著他們，笑著搖了搖頭，語氣裡滿是無奈。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '有啦！' },
  { kind: 'narration', text: '怪獸立刻站直，還拍了拍自己的胸口，像是要證明自己一點都不累。' },
  { kind: 'dialogue', speaker: '石錦航', text: '當然有！' },
  { kind: 'narration', text: '石頭也跟著站直，兩個人幾乎同時回答，隨後又互相看了一眼，一起笑了起來。' },
]

const handsomeQuestionBlocks: March29Block[] = [
  { kind: 'narration', text: '鬧了好一會兒，大家終於稍微安靜下來。怪獸拿起毛巾擦了擦額頭，原本被汗弄亂的頭髮又被他隨手往後撥了一把。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '欸，對了。' },
  { kind: 'narration', text: '他忽然轉過頭看你，眉毛微微揚起來，像是想到一個很重要的問題。' },
  { kind: 'dialogue', speaker: '你', text: '嗯？' },
  { kind: 'narration', text: '你看向他，手裡還拿著剛才被大家鬧得有點皺的節目單。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '妳今天有沒有認真看我們表演？' },
  { kind: 'narration', text: '他抱著手臂，故意裝出一副要檢查你有沒有專心的樣子。' },
  { kind: 'dialogue', speaker: '你', text: '有啊！' },
  { kind: 'narration', text: '你回答得很快，怪獸聽完似乎挺滿意，嘴角已經先翹起來。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '那我考妳一題。' },
  { kind: 'narration', text: '瑪莎立刻湊過來，眼睛在你和怪獸之間轉了一圈，一看就沒安好心。' },
  { kind: 'dialogue', speaker: '你', text: '什麼？' },
  { kind: 'narration', text: '你被他看得有點想笑，往後退了半步。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '今天誰最帥？' },
  { kind: 'narration', text: '他把問題丟出來，還故意朝其他人比了比，像是要所有人都參賽。' },
  { kind: 'dialogue', speaker: '你', text: '……啊？' },
  { kind: 'narration', text: '你一時沒反應過來，眨了眨眼睛。' },
  { kind: 'dialogue', speaker: '石錦航', text: '欸，這個問題好像不錯耶。' },
  { kind: 'narration', text: '石頭笑著點點頭，還真的開始認真等你的答案。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '蛤？這有什麼好為難的？' },
  { kind: 'narration', text: '怪獸抱起手臂，一副答案根本不需要想的樣子。' },
  { kind: 'dialogue', speaker: '石錦航', text: '你不要自己先認定是你喔。' },
  { kind: 'narration', text: '石頭轉頭看他，嘴角帶著笑，明擺著要拆他的台。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '我有說嗎？' },
  { kind: 'narration', text: '怪獸挑起眉毛，故意把臉轉開，卻沒有真的否認。' },
  { kind: 'dialogue', speaker: '石錦航', text: '你臉上就寫著了。' },
  { kind: 'narration', text: '石頭伸手指了指他的臉，笑得肩膀都在抖。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '你們不要突然為難人家啦。' },
  { kind: 'narration', text: '阿信笑著看了看你，像是想替你解圍，卻也沒忍住跟著起鬨。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '那我是不是不用參加？我今天只是站在旁邊看而已。' },
  { kind: 'narration', text: '諺明推了推眼鏡，故意把自己排除在外。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '不行啦！諺明哥也要算！' },
  { kind: 'narration', text: '瑪莎立刻伸手把諺明也拉進話題裡，完全不給他退場的機會。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '好啦，讓她選嘛。' },
  { kind: 'narration', text: '阿信笑著往旁邊讓了一點，五個人的目光一下子全落在你身上。' },
]

function handsomeReactionBlocks(character: March29Character): March29Block[] {
  if (character === 'wen') return [
    { kind: 'dialogue', speaker: '溫尚翊', text: '蛤？我喔？' },
    { kind: 'narration', text: '溫尚翊明顯愣了一下，隨即眉毛一揚，嘴角慢慢翹起來。' },
    { kind: 'dialogue', speaker: '你', text: '對啊，不然咧？' },
    { kind: 'narration', text: '你故意看著他，沒有把視線移開。' },
    { kind: 'dialogue', speaker: '溫尚翊', text: '沒有啦。我就知道妳眼光不錯。' },
    { kind: 'narration', text: '他低頭笑了一下，伸手撥了撥被汗弄亂的頭髮，嘴上倒是一點也不謙虛。' },
    { kind: 'dialogue', speaker: '你', text: '你不要這麼得意好不好！' },
    { kind: 'narration', text: '你看著他那副快要翹到天上的表情，忍不住伸手推了他一下。' },
    { kind: 'dialogue', speaker: '溫尚翊', text: '哪有？我只是講實話啊。' },
    { kind: 'narration', text: '他說著還故意朝你挑了挑眉，臉上那點藏不住的笑意，怎麼看都不像是真的謙虛。' },
    { kind: 'dialogue', speaker: '石錦航', text: '欸，你真的很敢講欸！' },
    { kind: 'narration', text: '石頭看著他那副得意樣，忍不住伸手推了他一下。' },
    { kind: 'dialogue', speaker: '溫尚翊', text: '不然咧？她自己選的啊。' },
    { kind: 'narration', text: '怪獸理直氣壯地攤了攤手，笑得更加明目張膽。' },
    { kind: 'dialogue', speaker: '石錦航', text: '好啦好啦，知道你帥了。' },
    { kind: 'narration', text: '石頭順手拍了拍他的背，故意把語氣說得像在哄小孩。' },
    { kind: 'dialogue', speaker: '瑪莎', text: '救命喔，現在有人已經開始膨脹了。' },
    { kind: 'narration', text: '瑪莎捂著額頭，轉頭朝阿信做了個受不了的表情。' },
    { kind: 'dialogue', speaker: '你', text: '我後悔了可以嗎？' },
    { kind: 'narration', text: '你故意嘆了口氣，想看看他還能得意到什麼程度。' },
    { kind: 'dialogue', speaker: '溫尚翊', text: '不行！' },
    { kind: 'narration', text: '他幾乎立刻接話，伸手朝你比了個叉，惹得大家又笑成一團。' },
    { kind: 'dialogue', speaker: '陳信宏', text: '不過妳剛剛有沒有看到最後那段？他彈得很認真欸。' },
    { kind: 'narration', text: '阿信笑著看了看溫尚翊，又轉過頭來問你，語氣裡還帶著一點替朋友高興的認真。' },
    { kind: 'dialogue', speaker: '你', text: '有啊！我有看到！' },
    { kind: 'narration', text: '你回答得很大聲，阿信聽完笑了起來。' },
    { kind: 'dialogue', speaker: '溫尚翊', text: '聽到沒有？她有看到。' },
    { kind: 'narration', text: '他立刻接過話，甚至朝阿信揚了揚下巴，像是要他替自己作證。' },
    { kind: 'dialogue', speaker: '瑪莎', text: '好了啦，今天整個晚上都不用跟他講話了，他已經滿足了。' },
    { kind: 'narration', text: '瑪莎笑著拍了拍石頭的肩膀，示意大家別再餵他得意。' },
    { kind: 'dialogue', speaker: '劉諺明', text: '好啦，恭喜怪獸得到第一名。' },
    { kind: 'narration', text: '諺明一本正經地拍了兩下手，眼鏡後面的眼睛也帶著笑。' },
    { kind: 'dialogue', speaker: '瑪莎', text: '走啦走啦！不要再讓第一名繼續發表得獎感言了！' },
    { kind: 'narration', text: '瑪莎轉身往出口走，還故意回頭朝怪獸揮了揮手。' },
    { kind: 'dialogue', speaker: '溫尚翊', text: '你真的很欠揍欸！' },
    { kind: 'narration', text: '怪獸嘴上罵著，卻還是笑著拿起自己的外套，跟上大家。' },
    { kind: 'dialogue', speaker: '你', text: '看什麼？' },
    { kind: 'narration', text: '你發現他趁大家轉身時悄悄朝你看了一眼，便故意逮住他。' },
    { kind: 'dialogue', speaker: '溫尚翊', text: '沒有啊。' },
    { kind: 'narration', text: '他把視線移開，嘴角卻還翹著，伸手把外套搭到肩上。' },
    { kind: 'dialogue', speaker: '溫尚翊', text: '走啦，不是要吃飯？' },
    { kind: 'narration', text: '他走了兩步，又回頭催你，今天的第一名好像真的特別開心。' },
  ]
  if (character === 'ashin') return [
    { kind: 'dialogue', speaker: '陳信宏', text: '欸？真的喔？' },
    { kind: 'narration', text: '阿信愣了一下，手指下意識摸了摸自己的耳朵，笑容慢慢浮上來。' },
    { kind: 'dialogue', speaker: '你', text: '對啊，你今天唱得很好聽。' },
    { kind: 'narration', text: '你看著他笑，阿信原本想接話，卻先低頭笑了一下。' },
    { kind: 'dialogue', speaker: '陳信宏', text: '謝謝啦……我剛剛還有一點怕自己唱太快。' },
    { kind: 'narration', text: '他把麥克風線往手臂上繞好，說到最後又抬眼看你。' },
    { kind: 'dialogue', speaker: '溫尚翊', text: '欸，那我的吉他咧？' },
    { kind: 'narration', text: '怪獸立刻從旁邊探過頭來，故意擺出不服氣的表情。' },
    { kind: 'dialogue', speaker: '瑪莎', text: '你剛剛不是還說自己最帥？' },
    { kind: 'narration', text: '瑪莎伸手拍了拍怪獸的肩膀，笑得一臉看好戲。' },
    { kind: 'dialogue', speaker: '陳信宏', text: '沒有啦，怪獸彈得也很帥啊。' },
    { kind: 'narration', text: '阿信趕緊替他補了一句，還朝怪獸笑了笑。' },
    { kind: 'dialogue', speaker: '石錦航', text: '好啦，今天大家都有帥到。' },
    { kind: 'narration', text: '石頭笑著把吉他背帶往肩上提了提，替這場比賽收了尾。' },
    { kind: 'dialogue', speaker: '溫尚翊', text: '這還差不多。' },
    { kind: 'narration', text: '怪獸這才滿意地點點頭，伸手勾住阿信的肩膀。' },
  ]
  if (character === 'masa') return [
    { kind: 'dialogue', speaker: '瑪莎', text: '欸！這個答案我喜歡！' },
    { kind: 'narration', text: '瑪莎立刻笑出聲，還故意朝怪獸挑了挑眉，像是贏了什麼比賽。' },
    { kind: 'dialogue', speaker: '溫尚翊', text: '你少臭美啦！' },
    { kind: 'narration', text: '怪獸抬手指了指他，嘴角卻還掛著笑。' },
    { kind: 'dialogue', speaker: '瑪莎', text: '有聽到沒有？人家有眼光欸。' },
    { kind: 'narration', text: '瑪莎把手掌往自己胸前一拍，故意挺直了背。' },
    { kind: 'dialogue', speaker: '你', text: '你不要現在就開始得意。' },
    { kind: 'narration', text: '你看著他那副樣子，忍不住笑著提醒。' },
    { kind: 'dialogue', speaker: '瑪莎', text: '我哪有？我只是接受事實而已。' },
    { kind: 'narration', text: '他攤開手，一臉理所當然，還故意朝你眨了眨眼。' },
    { kind: 'dialogue', speaker: '石錦航', text: '你們兩個真的很適合互相吹捧欸。' },
    { kind: 'narration', text: '石頭笑著搖頭，伸手把瑪莎往旁邊推開一點。' },
    { kind: 'dialogue', speaker: '陳信宏', text: '哈哈哈哈，好啦，至少今天大家都很開心。' },
    { kind: 'narration', text: '阿信笑得肩膀一抖，拿起水喝了一口。' },
    { kind: 'dialogue', speaker: '劉諺明', text: '那第一名是不是可以請大家吃飯？' },
    { kind: 'narration', text: '諺明推了推眼鏡，語氣平穩地補了一句。' },
    { kind: 'dialogue', speaker: '瑪莎', text: '可以啊！第一名請客！' },
    { kind: 'narration', text: '瑪莎立刻順著話題接下去，伸手指向出口。' },
  ]
  if (character === 'stone') return [
    { kind: 'dialogue', speaker: '石錦航', text: '真的假的？我喔？' },
    { kind: 'narration', text: '石頭明顯沒料到你會選他，眼睛睜大了一點，接著笑得眉眼都彎起來。' },
    { kind: 'dialogue', speaker: '你', text: '對啊，你今天也很帥啊。' },
    { kind: 'narration', text: '你回答得自然，石頭聽完忍不住低頭笑了笑。' },
    { kind: 'dialogue', speaker: '石錦航', text: '真的喔？那我今天有沒有比怪獸好一點？' },
    { kind: 'narration', text: '他說著轉頭看向怪獸，故意把問題丟給他。' },
    { kind: 'dialogue', speaker: '溫尚翊', text: '欸！你不要得寸進尺喔！' },
    { kind: 'narration', text: '怪獸立刻伸手推了石頭一下，石頭笑著往旁邊躲。' },
    { kind: 'dialogue', speaker: '瑪莎', text: '你今天跑得最像野人，這樣也算帥喔？' },
    { kind: 'narration', text: '瑪莎故意上下打量他，還指了指他被風吹亂的頭髮。' },
    { kind: 'dialogue', speaker: '石錦航', text: '那是表演的一部分啦！' },
    { kind: 'narration', text: '石頭笑著把頭髮往後撥，完全不打算認輸。' },
    { kind: 'dialogue', speaker: '陳信宏', text: '哈哈哈哈，至少今天真的很有精神。' },
    { kind: 'narration', text: '阿信看著他們兩個，笑得眼睛都彎了。' },
    { kind: 'dialogue', speaker: '劉諺明', text: '好啦，今天大家都辛苦了，去吃點東西吧。' },
    { kind: 'narration', text: '諺明抬手示意大家往外走，石頭還不忘朝你笑了一下。' },
  ]
  return [
    { kind: 'dialogue', speaker: '劉諺明', text: '欸？我今天也算喔？' },
    { kind: 'narration', text: '諺明有些意外地笑了，抬手推了推眼鏡。' },
    { kind: 'dialogue', speaker: '你', text: '當然啊！' },
    { kind: 'narration', text: '你點點頭，諺明聽完笑得更明顯了。' },
    { kind: 'dialogue', speaker: '劉諺明', text: '我今天連台都沒上，這樣也算喔？' },
    { kind: 'narration', text: '他指了指自己，語氣裡帶著一點不好意思。' },
    { kind: 'dialogue', speaker: '瑪莎', text: '當然算啦！站在台下也有競爭力好不好！' },
    { kind: 'narration', text: '瑪莎立刻拍了拍諺明的肩膀，說得煞有介事。' },
    { kind: 'dialogue', speaker: '溫尚翊', text: '諺明哥今天是後援會代表啦。' },
    { kind: 'narration', text: '怪獸笑著朝諺明比了個大拇指，總算把剛才的臭屁收斂了一點。' },
    { kind: 'dialogue', speaker: '石錦航', text: '哈哈哈哈，這個獎很特別欸。' },
    { kind: 'narration', text: '石頭跟著笑，伸手拍了拍諺明的背。' },
    { kind: 'dialogue', speaker: '陳信宏', text: '好啦，今天大家都有被看到。' },
    { kind: 'narration', text: '阿信笑著看過一圈，示意大家別再鬧了。' },
    { kind: 'dialogue', speaker: '劉諺明', text: '那我就收下了，謝謝妳。' },
    { kind: 'narration', text: '諺明朝你點點頭，眼神溫和，隨後跟著大家往出口走。' },
  ]
}

const restaurantBlocks: March29Block[] = [
  { kind: 'narration', text: '鬧了好一會兒，大家終於把器材和隨身的東西收拾好。天色已經完全暗下來，公園裡的燈一盞盞亮起，剛才舞台上的熱鬧還留在耳邊。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '好啦！我真的快餓死了！' },
  { kind: 'narration', text: '佑達把鼓棒往包裡一塞，伸了個大大的懶腰，肚子還很配合地叫了一聲。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '你今天到底喊了幾次餓？' },
  { kind: 'narration', text: '瑪莎轉頭看他，故意把眉毛挑得老高。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '演出很消耗體力欸！' },
  { kind: 'narration', text: '佑達拍了拍自己的肚子，一臉理直氣壯。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '走啦，去吃熱炒。' },
  { kind: 'narration', text: '怪獸把外套往肩上一搭，已經先替大家決定好下一站。' },
  { kind: 'dialogue', speaker: '石錦航', text: '好啊！我想吃炒蛤蜊。' },
  { kind: 'narration', text: '石頭一聽到吃飯立刻有了精神，還伸手比了比熱炒店的方向。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '我想吃炒飯欸。' },
  { kind: 'narration', text: '阿信跟在旁邊，說到炒飯時眼睛都亮了一點。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '你每次都吃炒飯。' },
  { kind: 'narration', text: '瑪莎斜眼看他，像是早就猜到他的答案。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '不然咧？炒飯很好吃啊。' },
  { kind: 'narration', text: '阿信笑著聳了聳肩，完全不覺得自己的選擇有什麼問題。' },
  { kind: 'narration', text: '最後大家決定找一家附近還有位置的熱炒店。諺明也跟著一起去，臨走前還幫忙確認了一遍器材都收好了沒有。店裡人聲鼎沸，炒鍋碰撞的聲音從廚房傳出來，空氣裡全是蒜香和熱氣。你們好不容易拼出一張夠坐下所有人的桌子，幾個人一坐下就開始搶著看菜單。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '欸，這個看起來不錯。' },
  { kind: 'narration', text: '瑪莎拿著菜單往石頭那邊湊，手指在照片上點了兩下。' },
  { kind: 'dialogue', speaker: '石錦航', text: '你不要什麼都點辣的啦。' },
  { kind: 'narration', text: '石頭伸手把菜單往中間挪了挪，笑著提醒他。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '我哪有？' },
  { kind: 'narration', text: '瑪莎立刻抬起頭，一臉被冤枉的樣子。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '點啦點啦，今天又不是吃不起。' },
  { kind: 'narration', text: '怪獸大手一揮，把菜單推回桌子中間，說得豪氣得不得了。' },
  { kind: 'narration', text: '菜還沒上齊，溫尚翊就已經朝老闆招了招手。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '老闆！先來一打啤酒！' },
  { kind: 'narration', text: '他伸出一根手指比了比，又轉頭看向石頭，像是已經約好要碰杯。' },
  { kind: 'dialogue', speaker: '你', text: '一打喔？' },
  { kind: 'narration', text: '你看了看桌上還沒拆開的菜單，又看了看他。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '對啊，怎樣？' },
  { kind: 'narration', text: '他挑了挑眉，完全不覺得一打有什麼問題。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '你今天是打算喝到明天是不是？' },
  { kind: 'narration', text: '瑪莎把菜單放下，轉頭看著怪獸笑。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '難得演出結束欸！' },
  { kind: 'narration', text: '他拍了拍桌面，語氣裡還帶著剛才演出後的興奮。' },
  { kind: 'narration', text: '老闆把一打啤酒放到桌上，冰涼的瓶身碰在一起，發出清脆的聲響。溫尚翊伸手拿了幾瓶，分給桌上的人。石頭接過酒瓶，笑著跟他碰了一下；瑪莎也伸手拿了一瓶，正準備打開。' },
  { kind: 'dialogue', speaker: '你', text: '欸，等一下。' },
  { kind: 'narration', text: '你忽然想起什麼似的，視線在瑪莎和石頭身上轉了一圈。' },
  { kind: 'dialogue', speaker: '你', text: '你們兩個不是還在讀高中嗎？' },
  { kind: 'narration', text: '你指了指瑪莎，又指了指石頭，兩個人手裡都還拿著啤酒瓶。' },
  { kind: 'dialogue', speaker: '你', text: '高中生不能喝酒吧？' },
  { kind: 'narration', text: '桌上安靜了一秒。瑪莎拿著酒瓶，轉過頭一臉不可置信地看著你；石頭已經先低下頭，肩膀抖了起來。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '妳現在才想到喔？！' },
  { kind: 'narration', text: '他把酒瓶往桌上一放，眉毛整個揚起來，聲音也跟著拔高。' },
  { kind: 'dialogue', speaker: '石錦航', text: '噗哈哈哈哈哈哈！' },
  { kind: 'narration', text: '石頭第一個沒忍住，直接笑出聲，還伸手拍了拍桌沿。' },
  { kind: 'dialogue', speaker: '你', text: '對啊！突然發現這個問題很嚴重欸！' },
  { kind: 'narration', text: '你故意一本正經地點點頭，越說越覺得好笑。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '妳很無聊欸！我們今天是來慶祝演出的，不是來上公民課的好不好！' },
  { kind: 'narration', text: '瑪莎一手叉腰，一手還握著酒瓶，整個人都快被你氣笑了。' },
  { kind: 'dialogue', speaker: '石錦航', text: '哈哈哈哈哈！可是她講得也沒錯啊。' },
  { kind: 'narration', text: '石頭笑著往後靠，還故意朝你點了點頭。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '欸！你到底站哪邊的？' },
  { kind: 'narration', text: '瑪莎立刻轉頭瞪他，伸手指了指他手裡的酒瓶。' },
  { kind: 'dialogue', speaker: '石錦航', text: '我只是覺得滿好笑的啊。' },
  { kind: 'narration', text: '石頭把酒瓶舉起來晃了晃，笑得一臉無辜。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '你自己也是高中生欸！' },
  { kind: 'narration', text: '瑪莎立刻把矛頭轉回石頭身上，像是終於找到同盟。' },
  { kind: 'dialogue', speaker: '石錦航', text: '我只是陪你喝兩口，怎麼又扯到我？' },
  { kind: 'narration', text: '石頭攤開一隻手，另一隻手還拿著酒瓶，笑得完全沒有要認真辯解的意思。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '哈哈哈哈哈！妳現在才在那邊管喔？' },
  { kind: 'narration', text: '怪獸靠在椅背上笑，伸手用瓶底輕輕敲了敲桌面。' },
  { kind: 'dialogue', speaker: '你', text: '不然呢！你們兩個明天還要上學吧？' },
  { kind: 'narration', text: '你看著瑪莎和石頭，故意把語氣放得像在點名。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '蔡昇晏明天不上學啦！' },
  { kind: 'narration', text: '瑪莎立刻拍了拍自己的胸口，說得理直氣壯。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '哈哈哈哈哈，瑪莎，你不要那麼激動啦。' },
  { kind: 'narration', text: '阿信拿著酒瓶小小抿了一口，笑著朝瑪莎看過去。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '我哪有激動！' },
  { kind: 'narration', text: '他立刻坐直身體，還把酒瓶往自己面前挪了挪，明明整張臉都寫著不服氣。' },
  { kind: 'dialogue', speaker: '你', text: '好啦好啦，不說了。高中生請慢用喔。' },
  { kind: 'narration', text: '你笑著舉起手，做出投降的樣子，嘴角卻完全壓不下來。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '妳！！！！！' },
  { kind: 'narration', text: '瑪莎氣得伸手指你，石頭已經笑到把臉埋進手臂裡，整桌瞬間又笑成一團。' },
  { kind: 'narration', text: '酒瓶終於一一打開。溫尚翊和石頭先碰了一下，兩個人幾乎同時仰頭喝了一口。' },
  { kind: 'dialogue', speaker: '石錦航', text: '來啊，今天喝一點。' },
  { kind: 'narration', text: '石頭把酒瓶放下，抬眼朝怪獸笑了一下，語氣爽快得和平時很不一樣。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '誰怕誰？' },
  { kind: 'narration', text: '怪獸立刻拿起酒瓶跟他碰了一下，兩個人又喝了一口。' },
  { kind: 'dialogue', speaker: '你', text: '石頭，你酒量這麼好喔？' },
  { kind: 'narration', text: '你看著石頭手裡的酒瓶，又忍不住多看了他兩眼。' },
  { kind: 'dialogue', speaker: '石錦航', text: '蛤？妳不知道喔？' },
  { kind: 'narration', text: '石頭轉過頭，眉毛一揚，像是你問了什麼很奇怪的問題。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '妳不知道吧，石頭可是搖滾浪子來著。' },
  { kind: 'narration', text: '瑪莎總算找到機會反擊，伸手拍了拍石頭的肩膀，故意把「搖滾浪子」幾個字說得特別響亮。' },
  { kind: 'dialogue', speaker: '石錦航', text: '欸！你不要亂講啦！' },
  { kind: 'narration', text: '石頭笑著推開瑪莎的手，耳朵有點紅，卻沒有真的否認。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '哈哈哈哈哈！他以前真的很敢玩欸！' },
  { kind: 'narration', text: '怪獸伸手指了指石頭，像是要替這個稱號作證。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '對啊，平常看起來人模人樣的，熟了以後根本不是這樣。' },
  { kind: 'narration', text: '瑪莎故意上下打量石頭，笑得一臉神祕。' },
  { kind: 'dialogue', speaker: '石錦航', text: '你們兩個不要在那邊造謠！' },
  { kind: 'narration', text: '石頭拿起筷子敲了敲桌面，想阻止他們繼續說，自己卻先笑了。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '可是我覺得石頭今天真的滿不一樣的欸。' },
  { kind: 'narration', text: '阿信小口抿著啤酒，笑著看向石頭，喝完又把酒瓶放回桌上。' },
  { kind: 'dialogue', speaker: '石錦航', text: '連你也來喔？' },
  { kind: 'narration', text: '石頭轉頭看阿信，故意皺起鼻子，伸手把一盤炒蛤蜊往自己面前挪。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '我只是說真的啊。' },
  { kind: 'narration', text: '阿信笑著舉起一隻手，另一隻手仍然只拿著那瓶喝了幾口的啤酒。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '阿信，你那瓶是拿來擺飾的喔？' },
  { kind: 'narration', text: '瑪莎瞄了一眼阿信手裡幾乎沒少多少的酒，故意拿筷子指了指。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '哪有啦，我有在喝啊。' },
  { kind: 'narration', text: '阿信趕緊把酒瓶拿起來，象徵性地抿了一小口。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '你喝慢一點是打算喝到打烊是不是？' },
  { kind: 'narration', text: '怪獸笑著看他，伸手把自己那瓶往桌上一放。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '我本來就喝不了那麼多啊。' },
  { kind: 'narration', text: '阿信聳聳肩，拿起筷子夾了一口炒飯，完全沒有要跟他們比的意思。' },
  { kind: 'dialogue', speaker: '石錦航', text: '沒關係啦，你慢慢喝。' },
  { kind: 'narration', text: '石頭把炒蛤蜊往阿信那邊推了推，語氣倒是很體貼。' },
  { kind: 'dialogue', speaker: '你', text: '對啊，你不用跟他們比。' },
  { kind: 'narration', text: '你也跟著點頭，阿信聽完立刻朝你露出一個感激的笑。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '妳看，還是有人比較有良心。' },
  { kind: 'narration', text: '他故意朝瑪莎看了一眼，拿起筷子又夾了一口菜。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '欸，這樣就開始拉幫結派了喔？' },
  { kind: 'narration', text: '瑪莎立刻把椅子往阿信那邊挪了一點，裝作要加入你們。' },
  { kind: 'narration', text: '菜陸陸續續上桌，炒蛤蜊、三杯雞、炒空心菜、蔥爆牛肉，還有一大盤熱騰騰的炒飯。桌上的話題從剛才的演出一路跑到以前練團的糗事。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '欸，我跟你們講，剛剛最後那首我差點笑出來！' },
  { kind: 'narration', text: '佑達一邊夾菜，一邊拿筷子比劃著台上的方向。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '蛤？你笑什麼？' },
  { kind: 'narration', text: '怪獸轉頭看他，嘴裡還嚼著東西，含糊地追問。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '你跟石頭在那邊交換眼神啊！你們兩個到底在演什麼？' },
  { kind: 'narration', text: '佑達說著還學了兩個人互看一眼的樣子，逗得石頭差點把筷子放下。' },
  { kind: 'dialogue', speaker: '石錦航', text: '沒有啦！就剛好看到而已！' },
  { kind: 'narration', text: '石頭伸手指了指怪獸，想把話題推回去。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '他們兩個平常就很有默契啊，吵架也很有默契。' },
  { kind: 'narration', text: '瑪莎夾了一口菜，說完還自己點了點頭。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '哈哈哈哈哈，這倒是真的。' },
  { kind: 'narration', text: '阿信笑得肩膀直抖，手裡的酒瓶只輕輕碰了碰桌面。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '你們真的很閒欸。' },
  { kind: 'narration', text: '怪獸把筷子往碗上一放，故意瞪了他們一眼，眼角卻還帶著笑。' },
  { kind: 'narration', text: '你笑著把一塊雞肉夾進碗裡。溫尚翊看見桌上那盤菜快空了，乾脆把盤子往你面前推了一點。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '欸，妳吃這個。' },
  { kind: 'narration', text: '他用筷子點了點盤子裡剩下的雞肉，示意你夾。' },
  { kind: 'dialogue', speaker: '你', text: '我有在吃啦。' },
  { kind: 'narration', text: '你低頭看了看自己的碗，裡面其實已經堆了不少菜。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '那就多吃一點啊。' },
  { kind: 'narration', text: '他又把盤子往你面前推了推，自己才轉頭朝老闆招手。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '老闆，再來一盤！' },
  { kind: 'narration', text: '他抬起手比了比空盤子，語氣豪爽得像是今天真的要把整間店吃下來。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '你們幾個今天真的很能吃欸。' },
  { kind: 'narration', text: '諺明拿著筷子笑著搖頭，還順手替桌邊的空盤子挪出一點位置。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '今天我請啦！大家想吃什麼就點，不要客氣！' },
  { kind: 'narration', text: '怪獸大手一揮，說完又拿起酒瓶跟石頭碰了一下。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '哇，今天這麼大方喔？' },
  { kind: 'narration', text: '瑪莎挑眉看他，故意把手伸向桌上的菜單。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '不然咧？演出結束還不能吃頓好的喔？' },
  { kind: 'narration', text: '他笑著把菜單推給瑪莎，還拍了拍自己的胸口，像是要大家放心點。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '那我先謝謝老闆了。' },
  { kind: 'narration', text: '諺明笑著舉了舉手裡的茶杯，順著他們的玩笑叫了一聲老闆。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '諺明哥，你也不要客氣啦！' },
  { kind: 'narration', text: '怪獸朝諺明揮了揮手，接著又轉回去跟石頭碰杯。' },
  { kind: 'narration', text: '桌上的氣氛越來越熱鬧。瑪莎不知道什麼時候開始用筷子敲起桌邊，石頭跟著打起節奏，佑達在旁邊故意接了一段鼓點。阿信笑得肩膀直抖，諺明則一邊吃菜一邊提醒他們不要把碗敲破。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '欸，碗不是鼓，不要敲破了。' },
  { kind: 'narration', text: '諺明伸手把桌上的碗往裡挪了一點，免得真的被他們敲翻。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '那我用筷子打節奏就好！' },
  { kind: 'narration', text: '佑達立刻把筷子舉起來，還真的在桌面上敲了兩下。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '欸，這個可以欸！' },
  { kind: 'narration', text: '瑪莎跟著敲了兩下，石頭也加入，三個人一下子把桌子敲得像排練室。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '你們小聲一點啦，隔壁桌都在看了。' },
  { kind: 'narration', text: '阿信笑著壓低聲音，還朝隔壁桌點了點頭表示不好意思。' },
  { kind: 'narration', text: '溫尚翊已經有點喝多了。他原本還在跟石頭爭論剛才哪一段吉他比較帥，講著講著忽然抬手扇了扇風。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '好熱喔……' },
  { kind: 'narration', text: '他低頭扯了扯衣服下擺，額前的頭髮也被汗弄得亂七八糟。' },
  { kind: 'narration', text: '他竟然真的準備把上衣往上脫。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '欸欸欸！你幹嘛啦！' },
  { kind: 'narration', text: '瑪莎眼明手快地伸手抓住他的手腕，另一隻手還指了指你。' },
  { kind: 'dialogue', speaker: '石錦航', text: '有女生在啦！' },
  { kind: 'narration', text: '石頭也趕緊伸手按住他的肩膀，怕他真的把衣服脫下來。' },
  { kind: 'narration', text: '溫尚翊的動作一下子停住了。他低頭看了看自己的手，又抬起頭，視線正好撞上你。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '……喔。' },
  { kind: 'narration', text: '他終於反應過來，臉一下子紅了，連耳朵都跟著泛起顏色。' },
  { kind: 'dialogue', speaker: '你', text: '哈哈哈哈哈哈！' },
  { kind: 'narration', text: '你看著他那副突然清醒的表情，笑得整個人往椅背上靠。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '笑屁喔！' },
  { kind: 'narration', text: '他抓起桌上的紙巾擦了擦臉，努力裝出一副什麼都沒發生的樣子。' },
  { kind: 'dialogue', speaker: '你', text: '你剛剛想幹嘛啦！' },
  { kind: 'narration', text: '你故意湊過去追問，笑意完全藏不住。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '就……很熱啊！' },
  { kind: 'narration', text: '他把臉轉到另一邊，伸手扯了扯衣領，臉上的紅還沒退。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '熱也不是這樣解決的吧！' },
  { kind: 'narration', text: '瑪莎笑到差點把筷子掉進湯裡，還故意拿筷子比了比他的衣服。' },
  { kind: 'dialogue', speaker: '石錦航', text: '哈哈哈哈哈！你剛剛真的差一點欸！' },
  { kind: 'narration', text: '石頭笑得肩膀直抖，伸手拍了拍怪獸的背。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '怪獸，你先把衣服穿好啦。' },
  { kind: 'narration', text: '阿信笑著搖頭，順手把怪獸的外套往他那邊遞了遞。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '我又沒有脫！' },
  { kind: 'narration', text: '他立刻把外套抓過來搭在腿上，像是終於找到一件可以遮掩自己的東西。' },
  { kind: 'dialogue', speaker: '你', text: '可是你剛剛明明就要脫了！' },
  { kind: 'narration', text: '你越看他越想笑，連說話都斷斷續續的。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '……妳不要一直講啦！' },
  { kind: 'narration', text: '他抓起紙巾又擦了一次臉，這回乾脆低頭假裝專心吃菜。' },
  { kind: 'narration', text: '石頭在旁邊笑到差點把筷子掉進湯裡，瑪莎則還在學怪獸剛才扯衣服的動作。' },
]

const escortPickerBlocks: March29Block[] = [
  { kind: 'narration', text: '吃完飯已經很晚了。大家從熱炒店出來，夜風迎面吹過來，剛才在店裡積攢的熱氣終於散去一些。你站在門口整理包包，才發現自己的嗓子已經有點啞了。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '妳今天喊得很大聲欸，喉嚨還好嗎？' },
  { kind: 'narration', text: '阿信轉過頭看你，眉頭微微皺了一下，像是真的有點擔心。' },
  { kind: 'dialogue', speaker: '你', text: '還好啦，就是有一點點啞。' },
  { kind: 'narration', text: '你清了清喉嚨，說完自己也笑了。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '誰叫妳剛剛叫得比佑達還大聲。' },
  { kind: 'narration', text: '瑪莎立刻接話，伸手指了指佑達。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '欸！我哪有！' },
  { kind: 'narration', text: '佑達立刻轉過頭抗議，手裡還拿著剛才沒吃完的牙籤。' },
  { kind: 'dialogue', speaker: '石錦航', text: '哈哈哈哈哈，真的有啦。' },
  { kind: 'narration', text: '石頭笑著看了你一眼，又把手插回外套口袋。' },
  { kind: 'dialogue', speaker: '石錦航', text: '我可以送啊。' },
  { kind: 'narration', text: '他說得很自然，還往你這邊走近了一步。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '我也可以啊，反正我還不想回家。' },
  { kind: 'narration', text: '瑪莎抬手伸了個懶腰，說完還朝你眨了眨眼。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '欸，我送啦。' },
  { kind: 'narration', text: '怪獸忽然插進來，說完還往前站了一點，腳步卻比平時慢了半拍。' },
  { kind: 'narration', text: '他剛說完，身體就輕輕晃了一下。石頭伸手扶住他的肩膀。' },
  { kind: 'dialogue', speaker: '石錦航', text: '你先站穩再說啦。' },
  { kind: 'narration', text: '石頭一邊扶著他，一邊笑著搖頭。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '我有站穩啊！' },
  { kind: 'narration', text: '怪獸立刻站直，還拍了拍石頭的手，像是嫌他多管閒事。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '你剛剛連衣服都差點脫了，還是先清醒一點吧。' },
  { kind: 'narration', text: '瑪莎抱著手臂看他，嘴角又開始忍不住往上翹。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '閉嘴啦！' },
  { kind: 'narration', text: '怪獸伸手指了指瑪莎，卻因為自己也笑了，完全沒有什麼威嚇力。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '好啦，讓她自己選。想讓誰送？' },
  { kind: 'narration', text: '諺明看了看時間，又看向你，沒有替你決定，只是把選擇權交給你。' },
]

const escortRoutes: Record<March29Character, March29EscortRoute> = {
  wen: {
    name: '溫尚翊',
    intro: [
      { kind: 'narration', text: '你說完要讓溫尚翊送你回家，其他幾個人立刻露出意味深長的表情。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '喔～～～還真的選怪獸喔？' },
      { kind: 'narration', text: '瑪莎故意拖長聲音，轉頭看向溫尚翊，眉毛還一上一下地挑了挑。' },
      { kind: 'dialogue', speaker: '石錦航', text: '哈哈哈哈哈，他今天應該很開心欸。' },
      { kind: 'narration', text: '石頭笑著拍了拍怪獸的肩膀，眼神裡全是看熱鬧的意思。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '不然咧？我送不行喔？' },
      { kind: 'narration', text: '他一邊說，一邊伸手拿起自己的外套。剛才在熱炒店裡喝了不少，臉頰還帶著一點紅，動作也比平時慢了半拍。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '可是怪獸，你真的還好嗎？你剛剛喝不少欸。' },
      { kind: 'narration', text: '阿信看了看他手裡的外套，又看了看他的臉，語氣裡帶著一點擔心。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '有啦，我又沒有醉。' },
      { kind: 'narration', text: '怪獸把外套往肩上一甩，說得很有把握，卻差點沒把袖子找對。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '好好好，你沒醉。剛剛差點脫衣服的人不是你。' },
      { kind: 'narration', text: '瑪莎立刻在旁邊補刀，還故意做了個扯衣服的動作。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '蔡昇晏！' },
      { kind: 'narration', text: '他抬手指了指瑪莎，想反駁，結果自己先笑了出來。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '好了啦，車我幫你們叫好了。到了記得傳個消息。' },
      { kind: 'narration', text: '諺明拿出手機確認了一下車子的位置，順手把車牌記下來。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '知道啦，諺明哥。' },
      { kind: 'narration', text: '怪獸朝諺明點點頭，轉過頭看你，伸手輕輕碰了一下你的手臂。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '走啦，我送妳。' },
      { kind: 'narration', text: '你跟大家揮手道別，溫尚翊走在你旁邊。剛走出幾步，他忽然放慢速度，低頭看了一眼自己的鞋子，又抬頭看看你。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '欸，妳走慢一點啦。' },
      { kind: 'narration', text: '他偏過頭看你，腳步明明比平常慢，還硬要裝成是在配合你。' },
      { kind: 'dialogue', speaker: '你', text: '明明是你走得慢吧！' },
      { kind: 'narration', text: '你故意加快半步，回頭看他會不會跟上。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '……我是在配合妳欸。' },
      { kind: 'narration', text: '他說得理直氣壯，下一步卻差點踩歪，趕緊伸手扶了一下旁邊的欄杆。' },
      { kind: 'dialogue', speaker: '你', text: '噗。' },
      { kind: 'narration', text: '你看著他那副樣子，忍不住笑出聲。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '笑屁喔！' },
      { kind: 'narration', text: '他瞪了你一眼，自己也跟著笑了，伸手抓了抓後腦勺。' },
    ],
    rounds: [
      {
        prompt: '等車的時候，溫尚翊靠在路邊的欄杆旁，低頭研究自己的鞋帶。你看著他那副認真又有點迷糊的樣子，忍不住想逗逗他。',
        choices: [
          { text: '你確定你還走得穩嗎？', response: '蛤？當然啊！妳不要把我當成醉鬼好不好。', afterResponse: '他立刻站直了身體，還特地往前走了兩步證明自己。結果第三步稍稍晃了一下，他趕緊若無其事地停住，還硬著頭皮補了一句：「……剛剛地不平啦。」', affection: 2 },
          { text: '你剛剛差一點就把衣服脫掉了欸！', response: '欸！那個是因為真的很熱好不好！而且我最後不是沒有脫嗎？', afterResponse: '他一下子抬起頭，臉上的紅似乎又明顯了一點，說完還伸手把外套往身上拉了拉，像是怕你又提起剛才那件事。', affection: 1 },
          { text: '今天拿了最帥獎，怎麼走路都不帥了？', response: '……妳現在是在嫌棄我喔？那是因為我今天太累了啦。帥也是要花力氣的好不好？', afterResponse: '他先愣了一下，接著笑起來，故意揚了揚眉毛，還把背挺直了一點，努力找回剛才那副臭屁樣。', affection: 3 },
        ],
      },
      {
        before: [
          { kind: 'narration', text: '沒過多久，車子停在路邊。溫尚翊先替你拉開車門，等你坐好後，自己才繞到另一邊坐進來。車子緩緩駛離熱炒店，他靠在座椅上，終於安靜了一會兒。窗外的路燈一盞一盞往後退，他的頭髮還有些亂，額前幾縷髮絲垂下來，整個人看起來比平時乖了不少。' },
          { kind: 'narration', text: '車開了一段路，溫尚翊忽然把右手抬起來，翻來覆去地看了看。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '唉……' },
          { kind: 'narration', text: '他低頭看著自己的手指，輕輕活動了一下，又慢慢握起來。' },
          { kind: 'dialogue', speaker: '你', text: '怎麼了？' },
          { kind: 'narration', text: '你順著他的視線看過去，發現他一直在看自己的右手。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '今天手好痛喔。' },
          { kind: 'narration', text: '他把手掌攤開，幾根手指輕輕活動了一下，又握起來。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '剛剛彈太久了啦，這裡酸酸的。' },
          { kind: 'narration', text: '他把手伸到你面前，指了指自己的指關節，說完還輕輕甩了兩下，像是在向你展示自己的傷情。' },
        ],
        prompt: '他把手伸到你面前，掌心朝上，手指上還有長時間彈琴留下的薄繭。',
        choices: [
          { text: '把手伸過來，我幫你呼呼。', response: '蛤？呼呼喔？……欸，好像真的有比較好欸。那這邊呢？這邊也有一點痛。', afterResponse: '他低頭看看自己的手，隨即乖乖把手掌攤開遞給你。你捧住他的手指，輕輕吹了幾下。他盯著你看了一會兒，忽然又把另一隻手遞過來，眼神裡還帶著一點得寸進尺的期待。', affection: 3 },
          { text: '誰叫你剛剛彈得那麼賣力，活該！', response: '欸！我是在認真表演欸！妳剛剛不是還說我最帥？而且我真的有點痛啦，妳都不心疼喔？', afterResponse: '他立刻轉頭看你，眉毛皺起來，像是很不服氣；說到最後卻又把手往你這邊遞近了一點，等著你看。', affection: 2 },
          { text: '那回去要好好休息，不能再亂彈了。', response: '那怎麼可能啦。明天還是要彈啊，不然手感跑掉怎麼辦？不過今天真的有點累了。', afterResponse: '他笑著搖搖頭，手指輕輕蜷起來，說到最後聲音慢了下來，靠回椅背時還把手放在膝蓋上。', affection: 1 },
        ],
      },
      {
        before: [
          { kind: 'narration', text: '車子終於在你家附近停下。溫尚翊先下車，站在路邊等你。夜風吹過來，他抬手把額前的頭髮往後撥了一下，隨後又低頭看了看自己的手。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '到了喔？' },
          { kind: 'narration', text: '他站在路燈下看著你，眼神比剛才清醒了一點，卻還是慢半拍。' },
          { kind: 'dialogue', speaker: '你', text: '對啊，到家了。' },
          { kind: 'narration', text: '你把包包往肩上拉好，朝家門口指了指。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '喔……' },
          { kind: 'narration', text: '他點點頭，卻沒有馬上說再見。你看著他，發現他今天真的有點不一樣，平時那個動不動就要跟你斗嘴的人，現在反而有點像喝醉的小朋友，反應慢慢的，還帶著一點藏不住的黏人。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '欸。' },
          { kind: 'narration', text: '他往你這邊挪了一小步，像是還有話想說。' },
          { kind: 'dialogue', speaker: '你', text: '嗯？' },
          { kind: 'narration', text: '你停下腳步，轉頭看他。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '今天是不是很好玩？' },
          { kind: 'narration', text: '他問得很認真，眼睛亮亮的，說完又笑了起來。' },
          { kind: 'dialogue', speaker: '溫尚翊', text: '我覺得今天超爽的。' },
          { kind: 'narration', text: '他說完又笑了一下，像是只要再想起剛才的舞台，心情就會重新亮起來。' },
        ],
        prompt: '你看著他站在路燈下，忽然覺得今天好像真的有點捨不得結束。',
        choices: [
          { text: '是啊，你今天開心得像個小朋友。', response: '哪有小朋友……不過今天真的很開心啦。下次有演出，妳也要來喔。', afterResponse: '他嘴上反駁，臉上卻笑得很開心，低頭踢了踢鞋尖，又抬起頭看你，像是已經開始期待下一次。', affection: 2 },
          { text: '今天真的很帥，尤其是彈吉他的時候。', response: '真的喔？那個間奏有沒有看到？我那時候彈得超順欸。妳有看到就好。', afterResponse: '他眼睛一下子亮起來，說到間奏時還忍不住抬起手比了個彈琴的動作，最後那句卻放輕了聲音。', affection: 3 },
          { text: '你趕快回去休息啦，明天手還要用呢。', response: '知道啦……可是我今天真的很累欸。妳明天不要忘記今天喔。', afterResponse: '他拖長聲音應了一句，低頭看了看自己的手，抬起眼時又朝你露出一個有點傻氣的笑。', affection: 2 },
        ],
      },
    ],
    ending: [
      { kind: 'narration', text: '你陪他站了一會兒，直到他終於準備轉身。' },
      { kind: 'narration', text: '溫尚翊走出兩步，又回過頭來。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '欸！' },
      { kind: 'dialogue', speaker: '你', text: '又怎麼啦？' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '沒事啦。' },
      { kind: 'narration', text: '他笑著擺擺手，手指還不自覺地蜷了一下。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '快進去啦，晚安。' },
      { kind: 'narration', text: '他終於轉過身，慢慢朝路邊走去。走了幾步，還不忘回頭確認你有沒有進門。' },
      { kind: 'narration', text: '你站在原地看著他的背影，忍不住笑了。今天那個在舞台上彈得特別帥、在熱炒店裡差點脫衣服、剛才還把手遞給你要你呼呼的人，竟然是同一個溫尚翊。想到這裡，你又忍不住笑了一下。今天晚上，好像真的有點捨不得結束。' },
    ],
  },
  ashin: {
    name: '陳信宏',
    intro: [
      { kind: 'narration', text: '你選了阿信，其他人立刻轉過頭來。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '喔～～今天換阿信喔？' },
      { kind: 'narration', text: '瑪莎故意拖長聲音，還伸手拍了拍阿信的肩膀。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '你不要鬧啦。' },
      { kind: 'narration', text: '阿信笑著低下頭，手指摸了摸鼻尖，耳朵有點紅。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '他今天唱得很認真欸，讓他送也不錯啦。' },
      { kind: 'narration', text: '怪獸故意裝得很大方，還伸手拍了拍阿信的背。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '好啦，我送妳。' },
      { kind: 'narration', text: '阿信轉過頭看你，語氣很自然，還順手拿起外套。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '我幫你們叫車，到了記得說一聲。' },
      { kind: 'narration', text: '諺明拿出手機確認車子的位置，順手把車牌記下來。' },
    ],
    rounds: [
      {
        prompt: '走出熱炒店後，夜風一吹，阿信先注意到你清了清喉嚨。',
        choices: [
          { text: '剛剛喊太大聲了，現在有點啞。', response: '我就知道妳剛剛喊得很大聲。回去喝點溫水啦，不要再一直講話了。', afterResponse: '他微微皺起眉頭，伸手把自己的水瓶遞給你，還特地把瓶蓋先轉鬆。', affection: 2 },
          { text: '還好啦，看到你們演出太開心了。', response: '真的喔？那我今天有沒有唱得很好？', afterResponse: '他眼睛彎起來，說完又有點不好意思地笑了，手指輕輕捏著外套拉鍊。', affection: 3 },
          { text: '你剛剛有看到我在台下嗎？', response: '有啊。妳一直在跳，我想沒看到也很難吧。', afterResponse: '他笑著比了比台下前排的位置，眼神停在你臉上，像是想起剛才那個畫面。', affection: 3 },
        ],
      },
      {
        before: [
          { kind: 'narration', text: '車子來了，阿信先替你拉開車門，等你坐好才繞到另一邊。他坐下後把外套放在膝上，車窗外的街燈一盞一盞往後退。' },
          { kind: 'narration', text: '過了一會兒，他忽然轉過頭來。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '欸，其實我剛剛在台上有看到妳。' },
          { kind: 'narration', text: '他說得很輕，像是怕自己講得太明顯，視線卻沒有立刻移開。' },
        ],
        prompt: '阿信把手放在膝上，等著你的反應。',
        choices: [
          { text: '我那麼大聲，你當然看得到啊！', response: '哈哈哈，也是啦。妳真的很捧場欸，我唱到後面都快被妳的聲音蓋過去了。', afterResponse: '他笑著往椅背靠了一點，說到最後還抬手遮了遮嘴，像是怕自己笑得太大聲。', affection: 2 },
          { text: '那你有沒有看到我一直在看你？', response: '……有啦。其實有看到。', afterResponse: '他先是安靜了一下，接著低頭笑起來，拇指在外套袖口上來回摩挲。', affection: 3 },
          { text: '我怕你唱到一半找不到我嘛。', response: '怎麼會找不到？妳站在那邊，我一下就看到了。', afterResponse: '他轉頭看向窗外，嘴角卻一直沒有放下來，過了一會兒才又偷偷看你一眼。', affection: 3 },
        ],
      },
      {
        before: [
          { kind: 'narration', text: '車子慢慢停在你家附近。阿信先下車，替你把車門扶住，等你站穩才把手收回去。' },
          { kind: 'dialogue', speaker: '陳信宏', text: '到了喔。' },
          { kind: 'narration', text: '他抬頭看了看你家門口，又轉回來看你。' },
          { kind: 'dialogue', speaker: '你', text: '嗯，今天謝謝你送我。' },
          { kind: 'narration', text: '你把包包往肩上拉好，朝他笑了一下。' },
        ],
        prompt: '阿信站在路燈下，像是還想多說幾句。',
        choices: [
          { text: '今天唱得真的很好聽。', response: '謝謝妳啦。妳這樣講，我會有點不好意思欸。', afterResponse: '他低頭笑了笑，手指把外套袖口折了一下，耳朵又慢慢紅起來。', affection: 3 },
          { text: '下次演出我還要站前面！', response: '好啊，那我就知道要往哪邊看了。', afterResponse: '他笑著點頭，還抬手朝你剛才站的位置比了一下。', affection: 3 },
          { text: '你回去也要早點休息喔。', response: '好，妳也是。回去先喝點水，喉嚨不要再逞強了。', afterResponse: '他認真地叮嚀你，直到看見你點頭，才稍稍放下心。', affection: 2 },
        ],
      },
    ],
    ending: [
      { kind: 'narration', text: '阿信往後退了一小步，手還扶著車門，像是還不太想立刻結束今晚的道別。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '下次也要來喔。' },
      { kind: 'narration', text: '他笑著朝你揮揮手，直到你走到門口，才轉身離開。' },
    ],
  },
  masa: {
    name: '瑪莎',
    intro: [
      { kind: 'narration', text: '你選了瑪莎，怪獸立刻轉頭看他。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '蛤？你不是還要喝嗎？' },
      { kind: 'narration', text: '怪獸伸手指了指他剛才喝到一半的酒瓶，故意問得很大聲。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '喝完再送啊，怎樣？' },
      { kind: 'narration', text: '瑪莎把外套往肩上一甩，還朝怪獸挑了挑眉。' },
      { kind: 'dialogue', speaker: '石錦航', text: '你們兩個不要在路上又吵起來喔。' },
      { kind: 'narration', text: '石頭笑著拍了拍瑪莎的背，像是已經預見等一下會有多吵。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '放心啦，我又不是怪獸。' },
      { kind: 'narration', text: '瑪莎說完還故意朝怪獸看了一眼，接著轉向你。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '走啦，大小姐。' },
      { kind: 'narration', text: '他笑著朝出口一揚下巴，示意你跟上。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '我幫你們叫車，到了說一聲。' },
      { kind: 'narration', text: '諺明拿出手機，替你們確認車子的位置。' },
    ],
    rounds: [
      {
        prompt: '走出店門後，瑪莎把手插進口袋，偏過頭看你，嘴角還掛著剛才鬧你的笑。',
        choices: [
          { text: '你剛剛被說是高中生不能喝酒，氣很久喔？', response: '妳還敢講！我剛剛差點被妳害到連酒都喝不了欸。', afterResponse: '他立刻轉過頭瞪你，走了兩步又自己笑出來，伸手把外套領子往上拉了拉。', affection: 2 },
          { text: '你今天玩得很開心吧？', response: '廢話啊！演出順利，吃飯又有人請客，哪有不開心的道理。', afterResponse: '他抬手拍了拍肚子，說到有人請客時還故意朝怪獸離開的方向看了一眼。', affection: 1 },
          { text: '你剛剛在台上那個動作很帥欸。', response: '真的喔？早知道我就多做兩次了。', afterResponse: '他立刻得意起來，還在路邊比劃了一下剛才抬貝斯的動作。', affection: 3 },
        ],
      },
      {
        before: [
          { kind: 'narration', text: '車子來了。瑪莎先替你拉開車門，自己坐進去後還把外套往旁邊挪了挪，替你留出位置。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '欸，妳今天真的喊得很誇張欸。' },
          { kind: 'narration', text: '車子開出去後，他側過頭看你，像是終於有空好好算帳。' },
        ],
        prompt: '他抬手比了比自己的耳朵，故意露出一副受不了的表情。',
        choices: [
          { text: '我那是在幫你們加油！', response: '我知道啊，不然我還以為有人在台下跟佑達比誰比較大聲。', afterResponse: '他笑著往椅背一靠，還故意學你剛才揮手尖叫的樣子。', affection: 2 },
          { text: '怎樣？你嫌我吵喔？', response: '沒有啦，滿有用的啊。至少我知道妳有來。', afterResponse: '他原本還想繼續吐槽，說到後半句卻放輕了聲音，視線也轉向窗外。', affection: 3 },
          { text: '那你下次要彈更帥一點，我就不喊那麼大聲。', response: '欸，這樣不行吧？妳的工作就是負責在下面幫忙炒熱氣氛。', afterResponse: '他轉過來看你，笑得一臉理所當然，還伸手在空中比了個加油的姿勢。', affection: 2 },
        ],
      },
      {
        before: [
          { kind: 'narration', text: '車子停在你家附近。瑪莎先下車，繞過來替你拉開車門，等你拿好包包才把手收回去。' },
          { kind: 'dialogue', speaker: '瑪莎', text: '到了啦。' },
          { kind: 'narration', text: '他抬頭看了看你家門口，確認位置沒錯，才轉回來。' },
        ],
        prompt: '夜風把他的頭髮吹亂了一點，他伸手抓了抓，忽然笑著看你。',
        choices: [
          { text: '今天謝謝你送我。', response: '不客氣啦。下次記得請我吃東西就好。', afterResponse: '他把手插回口袋，說得像在討債，嘴角卻一直帶著笑。', affection: 2 },
          { text: '你回去不要再喝了喔。', response: '知道啦，妳現在真的很像在管高中生欸。', afterResponse: '他故意把聲音學得很乖，接著自己先笑出來，還朝你揮了揮手。', affection: 2 },
          { text: '下次演出我還要來看。', response: '那當然啊，妳不來誰負責在台下吵？', afterResponse: '他挑了挑眉，說完又補上一個很輕的笑，像是已經把你算進下一次的觀眾裡。', affection: 3 },
        ],
      },
    ],
    ending: [
      { kind: 'narration', text: '瑪莎往後退了兩步，還不忘朝你揮揮手。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '快進去啦，晚點再聊。' },
      { kind: 'narration', text: '他轉身走了幾步，又回頭確認你已經走到門口，這才放心地離開。' },
    ],
  },
  stone: {
    name: '石錦航',
    intro: [
      { kind: 'narration', text: '你選了石頭，瑪莎立刻笑著朝他看過去。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '喔～～搖滾浪子要送人回家了喔？' },
      { kind: 'narration', text: '瑪莎故意把剛才的稱號又拿出來講，還伸手拍了拍石頭的肩膀。' },
      { kind: 'dialogue', speaker: '石錦航', text: '你不要再講那個啦！' },
      { kind: 'narration', text: '石頭笑著把他的手撥開，轉頭看你時又恢復了平常溫和的表情。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '好啦，讓他送。至少他剛剛走路比我穩。' },
      { kind: 'narration', text: '怪獸說完自己先笑了，還扶著桌沿站直。' },
      { kind: 'dialogue', speaker: '石錦航', text: '你先顧好你自己啦。' },
      { kind: 'narration', text: '石頭伸手拍了拍怪獸的肩膀，順手拿起外套。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '我幫你們叫車，到了記得說一聲。' },
      { kind: 'narration', text: '諺明拿出手機確認車子位置，石頭則走到你旁邊等你整理好包包。' },
    ],
    rounds: [
      {
        prompt: '走出熱炒店，石頭還帶著剛才喝酒時的興奮，走路比平時輕快了一點。',
        choices: [
          { text: '我今天第一次看到你喝得這麼豪爽欸。', response: '哈哈，妳今天才知道喔？我以前也不是一直都那麼乖啦。', afterResponse: '他笑著轉頭看你，伸手把被風吹亂的頭髮往後撥，眼神裡還有剛才那股得意。', affection: 3 },
          { text: '搖滾浪子，名不虛傳喔。', response: '欸，妳不要跟著瑪莎一起鬧啦。', afterResponse: '他伸手摸了摸鼻子，嘴上嫌棄，嘴角卻一直壓不下來。', affection: 2 },
          { text: '你剛剛跟怪獸跑得也太誇張了吧！', response: '哈哈哈哈，那個真的太好玩了。我們兩個突然就想跑啊。', afterResponse: '他說著又笑起來，還往前小跑兩步，接著回頭等你跟上。', affection: 2 },
        ],
      },
      {
        before: [
          { kind: 'narration', text: '車子來了，石頭先替你拉開車門，等你坐好才坐到另一邊。車子開出去後，他把外套往膝上放，還在回味剛才的演出。' },
          { kind: 'dialogue', speaker: '石錦航', text: '今天真的滿開心的欸。' },
          { kind: 'narration', text: '他轉頭看你，眼睛還亮亮的，像是剛才那股興奮還沒完全散掉。' },
        ],
        prompt: '石頭靠回椅背，忽然想起你剛才在熱炒店問他的事。',
        choices: [
          { text: '所以你以前真的很常玩到這麼晚？', response: '有時候啦。那時候大家都很有精神，排完團還不想回家。', afterResponse: '他笑著點點頭，手指在膝上輕輕敲了兩下，像是想起以前的日子。', affection: 2 },
          { text: '我覺得你今天比平常更像自己。', response: '真的喔？那平常的我看起來怎麼樣？', afterResponse: '他側過頭看你，眉毛微微揚起來，語氣裡帶著一點好奇。', affection: 3 },
          { text: '下次還要看你們這樣一起發瘋。', response: '哈哈，好啊。不過下次可能要先跟怪獸約好，不然他又突然跑掉。', afterResponse: '他笑著搖頭，說完還往窗外看了一眼，嘴角一直帶著笑。', affection: 2 },
        ],
      },
      {
        before: [
          { kind: 'narration', text: '車子停在你家附近。石頭先下車，繞過來替你拉開車門，還伸手扶了一下門框，免得你起身時撞到。' },
          { kind: 'dialogue', speaker: '石錦航', text: '到了，慢慢來。' },
          { kind: 'narration', text: '他等你站穩，才把車門輕輕關上。' },
        ],
        prompt: '你們站在路燈下，石頭看了看你，又看了看已經安靜下來的街道。',
        choices: [
          { text: '今天真的很開心，謝謝你陪我。', response: '我也很開心啊。今天大家都玩得很盡興，妳也有一起在裡面。', afterResponse: '他笑著點頭，眼神柔和下來，說完還輕輕拍了拍你的肩膀。', affection: 3 },
          { text: '你回去要記得喝水，不然明天會頭痛。', response: '好啦，我知道。妳也一樣，今天喊那麼大聲，回去要休息。', afterResponse: '他認真地看著你，像是把這件事記下來，直到你點頭才放心。', affection: 2 },
          { text: '下次還要聽你們唱歌。', response: '好啊，那下次妳也要來。到時候我再找妳站前面一點。', afterResponse: '他笑著朝你比了比舞台前方的位置，語氣自然，卻把你的期待接得很認真。', affection: 3 },
        ],
      },
    ],
    ending: [
      { kind: 'narration', text: '石頭往後退了一步，替你讓出回家的路。' },
      { kind: 'dialogue', speaker: '石錦航', text: '快進去吧，到了跟我說一聲。' },
      { kind: 'narration', text: '他朝你揮揮手，等你走到門口才轉身離開，步子裡還留著一點剛才的輕快。' },
    ],
  },
  yanming: {
    name: '劉諺明',
    intro: [
      { kind: 'narration', text: '你選了諺明，其他人立刻轉頭看他。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '喔！諺明哥今天也有護送任務喔？' },
      { kind: 'narration', text: '瑪莎故意把聲音抬高，還朝諺明敬了個不太標準的禮。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '什麼護送任務，講得好像很嚴重一樣。' },
      { kind: 'narration', text: '諺明笑著推了推眼鏡，伸手把外套拿起來。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '諺明哥比較穩啦，交給你我放心。' },
      { kind: 'narration', text: '阿信笑著點點頭，還朝你比了個放心的手勢。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '欸，那我就不用擔心了。' },
      { kind: 'narration', text: '怪獸靠在石頭肩上，說完還打了個小小的酒嗝，惹得大家笑起來。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '好啦，走吧，我送妳。' },
      { kind: 'narration', text: '諺明先確認你有沒有拿好包包，才帶著你往路邊走。' },
    ],
    rounds: [
      {
        prompt: '走出熱炒店後，諺明放慢腳步，先看了看你肩上的包包。',
        choices: [
          { text: '諺明哥，今天大家是不是都很開心？', response: '是啊，好一陣子沒看他們這麼放開玩了。今天演得順，大家心情都很好。', afterResponse: '他笑著看向你們剛才離開的方向，推了推眼鏡，語氣裡也帶著一點高興。', affection: 2 },
          { text: '你今天在台下看，有沒有想起以前上台的時候？', response: '有啊，多少會想起來。不過今天看他們站在台上，我也覺得很過癮。', afterResponse: '他把手插進外套口袋，目光往遠處停了一會兒，才轉回來看你。', affection: 3 },
          { text: '今天辛苦你了，還特地趕過來。', response: '不會啦，能趕上就好。大家這麼重要的一天，我怎麼可能不來。', afterResponse: '他笑著搖搖頭，伸手替你把包包背帶理順了一點。', affection: 2 },
        ],
      },
      {
        before: [
          { kind: 'narration', text: '車子來了，諺明先替你確認車牌，等你坐進去後才坐到另一邊。車子開出去，他沒有急著找話題，只是看了看窗外的街景。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '今天那幾個真的很像小孩子。' },
          { kind: 'narration', text: '他說著笑了起來，像是腦中又浮現怪獸和石頭剛才狂奔的樣子。' },
        ],
        prompt: '諺明轉過頭看你，想起你剛才也被拉著一起跳。',
        choices: [
          { text: '我差點被他們拉到站不穩。', response: '我有看到，妳笑得很開心。下次他們再這樣，記得先站穩一點。', afterResponse: '他笑著搖頭，語氣像是在叮嚀，眼神卻很溫和。', affection: 2 },
          { text: '你是不是早就習慣他們這樣了？', response: '差不多吧。從以前到現在，他們只要一開心就很難安靜下來。', afterResponse: '他靠回椅背，手指在膝上輕輕敲了兩下，說起這些事時顯得很熟悉。', affection: 2 },
          { text: '其實我覺得這樣很好啊。', response: '我也覺得。有人可以一起這樣鬧，還滿難得的。', afterResponse: '他點點頭，轉頭看向窗外，嘴角留著一點笑意。', affection: 3 },
        ],
      },
      {
        before: [
          { kind: 'narration', text: '車子在你家附近停下。諺明先下車，替你拉開車門，等你拿好包包才退到一旁。' },
          { kind: 'dialogue', speaker: '劉諺明', text: '到了，這邊走進去就好。' },
          { kind: 'narration', text: '他指了指你家門口的方向，確認你沒有拿錯東西。' },
        ],
        prompt: '夜裡安靜下來，你們終於有空好好道別。',
        choices: [
          { text: '今天真的謝謝你。', response: '不客氣，今天玩得開心就好。回去早點休息，嗓子也要顧一下。', afterResponse: '他笑著點頭，還抬手示意你先進去，不急著轉身離開。', affection: 2 },
          { text: '下次大家演出，你也要來喔。', response: '好啊，只要時間允許，我一定來。', afterResponse: '他推了推眼鏡，答應得很乾脆，還朝你露出一個安心的笑。', affection: 3 },
          { text: '你會不會也有點懷念以前的舞台？', response: '會啊。不過今天能在台下看著他們，也是一種很好的位置。', afterResponse: '他看了一眼夜色，語氣平穩，卻比平時多了一點感慨。', affection: 3 },
        ],
      },
    ],
    ending: [
      { kind: 'narration', text: '諺明等你走到門口，才往後退了一步。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '進去吧，到了記得把門鎖好。' },
      { kind: 'narration', text: '他朝你點點頭，確認你進門後才轉身離開。' },
    ],
  },
}

const completeBlocks: March29Block[] = [
  { kind: 'narration', text: '門在身後輕輕關上，公園裡的音樂、熱炒店裡的笑聲，還有那幾個人一路鬧到停不下來的樣子，像是還留在耳邊。' },
  { kind: 'narration', text: '你低頭看了看時間，才發現這一天真的過去了。可是想到剛才的舞台，想到他們笑得毫無顧忌的樣子，你又忍不住彎起嘴角。' },
  { kind: 'narration', text: '1997 年 3 月 29 日。今天大概會是很久以後，想起來還是會笑的一天。' },
]

function March29Blocks({ blocks }: { blocks: March29Block[] }) {
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

function clockForPhase(phase: March29AfterPhase) {
  if (phase === 'group' || phase === 'handsome') return phase === 'group' ? '18:40' : '18:50'
  if (phase === 'restaurant') return '19:30'
  if (phase === 'escortPicker') return '21:00'
  if (phase === 'escort') return '21:10'
  return '21:30'
}

export function March29AfterShow({
  onAddAffection,
  onClockChange,
  onFinish,
}: {
  onAddAffection: (character: March29Character, amount: number) => void
  onClockChange: (time: string) => void
  onFinish: (selection: { handsomeChoice: March29Character | null; escortCharacter: March29Character | null }) => void
}) {
  const [progress, setProgress] = useState<March29AfterProgress>(readProgress)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    onClockChange(clockForPhase(progress.phase))
    if (progress.phase === 'complete') localStorage.setItem('mayday-march29-complete', 'true')
  }, [progress, onClockChange])

  const chooseHandsome = (character: March29Character) => setProgress((current) => ({ ...current, handsomeChoice: character }))
  const chooseEscort = (character: March29Character) => setProgress((current) => ({
    ...current,
    phase: 'escort',
    escortCharacter: character,
    roundIndex: 0,
    pendingReply: null,
  }))
  const chooseEscortReply = (choiceIndex: number) => {
    if (!progress.escortCharacter || progress.pendingReply !== null) return
    const choice = escortRoutes[progress.escortCharacter].rounds[progress.roundIndex]?.choices[choiceIndex]
    if (!choice) return
    setProgress((current) => ({ ...current, pendingReply: choiceIndex }))
    onAddAffection(progress.escortCharacter, choice.affection)
  }
  const continueEscort = () => {
    if (progress.pendingReply === null) return
    if (progress.roundIndex < 2) {
      setProgress((current) => ({ ...current, roundIndex: current.roundIndex + 1, pendingReply: null }))
    } else {
      setProgress((current) => ({ ...current, phase: 'complete', pendingReply: null }))
    }
  }

  const escortRoute = progress.escortCharacter ? escortRoutes[progress.escortCharacter] : null
  const currentRound = escortRoute?.rounds[progress.roundIndex]
  const selectedChoice = progress.pendingReply !== null && currentRound ? currentRound.choices[progress.pendingReply] : null

  return (
    <div className="story-screen-overlay">
      <div className="story-screen-head">
        <div className="chapter-mark">3 月 29 日・演出後</div>
        <div className="story-contact-title">
          <strong>大安森林公園・演出結束以後</strong>
          <small>1997 年 3 月 29 日・晚上</small>
        </div>
        <span className="story-head-spacer" />
      </div>

      <div className="story-narrative-scroll">
        <div className="story-kicker">MARCH 29 · AFTER THE SHOW</div>

        {progress.phase === 'group' && (
          <>
            <h2 className="story-scene-title">下台以後，還沒玩夠。</h2>
            <March29Blocks blocks={afterShowBlocks} />
            <div className="reunion-pause-note">演出結束了，大家卻還捨不得散場。</div>
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={() => setProgress((current) => ({ ...current, phase: 'handsome' }))}>
                看看誰最帥 <ChevronRight size={15} />
              </button>
            </div>
          </>
        )}

        {progress.phase === 'handsome' && (
          <>
            <h2 className="story-scene-title">今天到底誰最帥？</h2>
            <March29Blocks blocks={handsomeQuestionBlocks} />
            {!progress.handsomeChoice ? (
              <div className="march29-reply-list">
                {CHARACTER_ORDER.map((character) => (
                  <button className="reply-choice" key={character} onClick={() => chooseHandsome(character)}>
                    <span>{CHARACTER_NAMES[character]}</span><ChevronRight size={15} />
                  </button>
                ))}
              </div>
            ) : (
              <>
                <March29Blocks blocks={handsomeReactionBlocks(progress.handsomeChoice)} />
                <div className="reunion-pause-note">第一名已經選出來了，其他人也沒打算放過他。</div>
                <div className="story-action-bar story-inline-action">
                  <button className="story-primary-button" onClick={() => setProgress((current) => ({ ...current, phase: 'restaurant' }))}>
                    去吃熱炒 <ChevronRight size={15} />
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {progress.phase === 'restaurant' && (
          <>
            <h2 className="story-scene-title">熱炒店・今晚不醉不歸？</h2>
            <March29Blocks blocks={restaurantBlocks} />
            <div className="reunion-pause-note">一桌人鬧到很晚，才終於想起該回家了。</div>
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={() => setProgress((current) => ({ ...current, phase: 'escortPicker' }))}>
                散場，準備回家 <ChevronRight size={15} />
              </button>
            </div>
          </>
        )}

        {progress.phase === 'escortPicker' && (
          <>
            <h2 className="story-scene-title">散場以後，誰送你回家？</h2>
            <March29Blocks blocks={escortPickerBlocks} />
            <div className="march29-reply-list">
              {CHARACTER_ORDER.map((character) => (
                <button className="reply-choice" key={character} onClick={() => chooseEscort(character)}>
                  <span>{CHARACTER_NAMES[character]}</span><ChevronRight size={15} />
                </button>
              ))}
            </div>
          </>
        )}

        {progress.phase === 'escort' && escortRoute && currentRound && (
          <>
            <h2 className="story-scene-title">和{escortRoute.name}一起回家</h2>
            {progress.roundIndex === 0 && <March29Blocks blocks={escortRoute.intro} />}
            {currentRound.before && <March29Blocks blocks={currentRound.before} />}
            <div className="reunion-pause-note">第 {progress.roundIndex + 1}／3 輪互動</div>
            <p className="narrative-paragraph">{currentRound.prompt}</p>
            {selectedChoice ? (
              <>
                <div className="narrative-dialogue">
                  <span>你</span>
                  <p>{'「' + selectedChoice.text + '」'}</p>
                </div>
                <div className="narrative-dialogue">
                  <span>{escortRoute.name}</span>
                  <p>{'「' + selectedChoice.response + '」'}</p>
                </div>
                <p className="narrative-paragraph">{selectedChoice.afterResponse}</p>
                {progress.roundIndex === 2 && <March29Blocks blocks={escortRoute.ending} />}
                <div className="story-action-bar story-inline-action">
                  <button className="story-primary-button" onClick={continueEscort}>
                    {progress.roundIndex < 2 ? '繼續走一段路' : '結束今天'} <ChevronRight size={15} />
                  </button>
                </div>
              </>
            ) : (
              <div className="march29-reply-list">
                {currentRound.choices.map((choice, index) => (
                  <button className="reply-choice" key={index} onClick={() => chooseEscortReply(index)}>
                    <span>{choice.text}</span><ChevronRight size={15} />
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {progress.phase === 'complete' && (
          <>
            <h2 className="story-scene-title">1997 年 3 月 29 日・晚安</h2>
            <March29Blocks blocks={completeBlocks} />
            <div className="reunion-pause-note">今天的故事暫時告一段落。回家洗完澡，還有好多事情想記下來。</div>
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={() => onFinish({ handsomeChoice: progress.handsomeChoice, escortCharacter: progress.escortCharacter })}>
                寫下今天的日記 <ChevronRight size={15} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
