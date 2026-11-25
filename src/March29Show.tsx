import { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'

type March29Character = 'wen' | 'ashin' | 'masa' | 'stone' | 'yanming'
type March29Phase = 'group' | 'picker' | 'interaction' | 'watch' | 'stage' | 'ending'
type March29Block =
  | { kind: 'narration'; text: string }
  | { kind: 'dialogue'; speaker: string; text: string }

type March29Choice = { text: string; response: string; affection: number; afterResponse?: string }
type March29Round = { prompt: string; choices: March29Choice[] }
type March29Route = {
  name: string
  intro: March29Block[]
  rounds: March29Round[]
  ending: March29Block[]
}

type March29Progress = {
  phase: March29Phase
  character: March29Character | null
  roundIndex: number
  pendingReply: number | null
  watchIndex: number
}

const STORAGE_KEY = 'mayday-march29-progress'
const CHARACTER_ORDER: March29Character[] = ['wen', 'ashin', 'masa', 'stone', 'yanming']
const CHARACTER_NAMES: Record<March29Character, string> = {
  wen: '溫尚翊',
  ashin: '陳信宏',
  masa: '蔡昇晏',
  stone: '石錦航',
  yanming: '劉諺明',
}

const initialProgress: March29Progress = {
  phase: 'group',
  character: null,
  roundIndex: 0,
  pendingReply: null,
  watchIndex: 0,
}

function readProgress(): March29Progress {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as Partial<March29Progress> | null
    if (!saved || !['group', 'picker', 'interaction', 'watch', 'stage', 'ending'].includes(String(saved.phase))) return initialProgress
    const character = CHARACTER_ORDER.includes(saved.character as March29Character) ? saved.character as March29Character : null
    return {
      phase: saved.phase as March29Phase,
      character,
      roundIndex: Number.isInteger(saved.roundIndex) ? Math.max(0, Math.min(2, Number(saved.roundIndex))) : 0,
      pendingReply: Number.isInteger(saved.pendingReply) && Number(saved.pendingReply) >= 0 && Number(saved.pendingReply) <= 2 ? Number(saved.pendingReply) : null,
      watchIndex: Number.isInteger(saved.watchIndex) ? Math.max(0, Math.min(3, Number(saved.watchIndex))) : 0,
    }
  } catch {
    return initialProgress
  }
}

const groupBlocks: March29Block[] = [
  { kind: 'narration', text: '下午三點多，大安森林公園的露天音樂台已經熱鬧了好一陣子。草地上坐著三三兩兩的人，有人拿著節目單對時間，有人抱著外套替朋友占位置；舞台上的音箱不時傳出試音聲，工作人員蹲在地上整理電線，旁邊還有人一聽見音樂就跟著打拍子。' },
  { kind: 'narration', text: '你還沒走近器材區，就先聽見一陣熟悉的吵鬧聲。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '欸！那條線不要從這邊過啦！' },
  { kind: 'dialogue', speaker: '瑪莎', text: '你自己剛剛放的欸！' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '我哪有？我剛剛明明放在旁邊！' },
  { kind: 'dialogue', speaker: '石錦航', text: '有啦，我有看到。你剛剛蹲在那邊弄半天，還差點把自己的腳纏進去。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '哈哈哈哈哈！你是要彈吉他還是要把自己綁起來？' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '石頭！你很閒是不是？' },
  { kind: 'narration', text: '怪獸蹲在效果器前面，一手捏著撥片，一手忙著把導線重新理好。石頭抱著吉他站在旁邊，笑得肩膀都在抖，完全沒有要幫忙的意思。' },
  { kind: 'dialogue', speaker: '石錦航', text: '好啦，不鬧你了。你再弄下去，等一下真的不用彈了，直接跟線一起上台。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '你們兩個真的很煩欸。' },
  { kind: 'narration', text: '阿信站在麥克風旁邊試音，聽見他們的聲音，轉過頭來。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '欸，你們可以先讓我講完一句話嗎？' },
  { kind: 'dialogue', speaker: '瑪莎', text: '你講啊，沒人阻止你。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '我剛剛講到一半，你們就在那邊吵。' },
  { kind: 'dialogue', speaker: '石錦航', text: '那你現在講，我們聽。來，大家安靜。' },
  { kind: 'narration', text: '石頭煞有介事地抬手比了個安靜的手勢。阿信清了清嗓子，拿起麥克風。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '喂？喂喂？' },
  { kind: 'narration', text: '音箱突然傳出一聲尖銳的回授聲。你下意識捂住耳朵，怪獸立刻抬起頭。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '欸欸欸！阿信！' },
  { kind: 'dialogue', speaker: '陳信宏', text: '不是我啦！我什麼都還沒做！' },
  { kind: 'dialogue', speaker: '瑪莎', text: '你剛剛那個聲音真的很有特色欸。' },
  { kind: 'dialogue', speaker: '石錦航', text: '很適合當今天的開場啊。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '你們不要再講了啦！' },
  { kind: 'narration', text: '錢佑達坐在鼓組後面，手裡的鼓棒轉了一圈，終於忍不住敲了兩下鼓邊。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '你們到底準備好了沒？我在這邊聽你們吵半天了。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '好了啦，達叔不要急！' },
  { kind: 'dialogue', speaker: '錢佑達', text: '誰是達叔！' },
  { kind: 'dialogue', speaker: '石錦航', text: '哈哈哈哈哈，達叔生氣了！' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '好啦好啦，趕快弄一弄。' },
  { kind: 'narration', text: '怪獸站起來重新背好吉他，順手撥了兩下弦。石頭也跟著試了試自己的琴，兩個人交換了個眼神，像是在確認剛才說好的地方。瑪莎抱著貝斯晃過來，故意在怪獸旁邊彈了一個低音。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '欸！你不要亂彈啦！' },
  { kind: 'dialogue', speaker: '瑪莎', text: '我在測試啊。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '你測試個屁啦！' },
  { kind: 'dialogue', speaker: '石錦航', text: '你們兩個等一下上台不要也這樣吵喔。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '我覺得不太可能欸。' },
  { kind: 'narration', text: '你終於走到他們旁邊。明明離正式演出還有一段時間，幾個人卻已經忙得團團轉，偏偏嘴上誰也不肯安靜。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '欸！妳來啦！' },
  { kind: 'dialogue', speaker: '瑪莎', text: '她來了就好了，等一下有人可以幫忙管一下怪獸。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '蛤？關我什麼事啦！' },
  { kind: 'dialogue', speaker: '石錦航', text: '不然妳幫忙看一下他有沒有把線弄好，哈哈哈哈。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '石頭！' },
  { kind: 'narration', text: '石頭笑著往旁邊躲了一步。你還沒來得及回嘴，錢佑達忽然朝公園入口的方向揮了揮手。' },
  { kind: 'dialogue', speaker: '錢佑達', text: '諺明！' },
  { kind: 'narration', text: '你轉過頭，看見諺明從入口走過來。他顯然是忙完練團室那邊的事情才趕來，手裡還拿著剛收好的東西。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '你們都到了喔？看起來挺熱鬧的。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '你再晚一點，就只能聽我們講心得了。' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '他來得剛好啦，不然等一下你又要一直叫我幫忙。' },
  { kind: 'dialogue', speaker: '石錦航', text: '諺明哥，你不知道，他剛剛差點跟導線打起來。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '是喔？那還好我沒有錯過。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '你等一下要從頭看到尾喔。' },
  { kind: 'dialogue', speaker: '劉諺明', text: '好啦，我會看完的。' },
  { kind: 'narration', text: '諺明走到你旁邊，順手讓開一個搬運器材的工作人員。舞台那邊又傳來一陣試音聲，瑪莎已經忍不住踮腳往前看，怪獸則低頭重新確認自己的吉他背帶。' },
]

const routes: Record<March29Character, March29Route> = {
  wen: {
    name: '溫尚翊',
    intro: [
      { kind: 'narration', text: '怪獸把吉他背好，背帶卻正好壓住後面的衣領，襯衫被扯得皺成一團。他一隻手扶著琴頸，另一隻手還捏著撥片，根本騰不出手整理。' },
      { kind: 'dialogue', speaker: '你', text: '溫尚翊，你後面的衣服皺掉了啦。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '蛤？哪裡？' },
      { kind: 'narration', text: '他試著往後摸了兩下，當然什麼也沒摸到，最後只好把肩膀往你這邊側了一點。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '喔，那妳幫我弄一下好了。' },
    ],
    rounds: [
      {
        prompt: '你看了看被背帶壓住的衣領。',
        choices: [
          { text: '你把吉他扶穩，我幫你弄。', response: '不用啦，我扶著就好。妳快一點，不然等一下又要重新調音了。', affection: 2 },
          { text: '你低一點啦，我看不到。', response: '蛤？我已經很低了欸。', affection: 1 },
          { text: '你這件衣服再皺下去就不能上台了。', response: '妳是來幫忙還是來嫌我的？快點啦。', affection: 2 },
        ],
      },
      {
        prompt: '你伸手把衣領從背帶底下拉出來，指尖不經意擦過他的後頸。他原本還在看琴弦，肩膀卻明顯僵了一下。',
        choices: [
          { text: '我又不會把你弄壞。', response: '誰知道妳會不會亂弄……欸，好啦，妳弄就妳弄。', affection: 2 },
          { text: '你是不是怕癢？', response: '哪有！妳不要亂碰就好了啦。', afterResponse: '他說完才發現自己講得有點奇怪，趕緊低頭看琴。', affection: 1 },
          { text: '你剛剛明明就抖了一下。', response: '……妳眼睛是有這麼尖喔？快點啦。', affection: 3 },
        ],
      },
      {
        prompt: '你把最後一處皺褶撫平，往後退了一點，重新看了看他的衣服。',
        choices: [
          { text: '今天一定要帥一點喔。', response: '我哪一天不帥？', affection: 2 },
          { text: '等一下我會站前面看你。', response: '那妳站穩一點，不要被擠到。聽到沒有？', affection: 3 },
          { text: '如果彈錯了我就笑你。', response: '妳敢！……算了，妳笑就笑，反正妳又不會彈。', affection: 1 },
        ],
      },
    ],
    ending: [
      { kind: 'narration', text: '他重新把吉他背好，低頭撥了兩下弦，像是確認衣服和背帶都回到原位。過了一會兒，他又抬眼看你。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '欸，剛剛謝啦。' },
      { kind: 'narration', text: '他把撥片在指間轉了一下，明明只是道謝，表情卻還是那副不肯認輸的臭屁樣。' },
    ],
  },
  ashin: {
    name: '陳信宏',
    intro: [
      { kind: 'narration', text: '阿信正拿著麥克風線，衣領卻被線材勾住了一角。他試著伸手去夠，弄了半天還是沒弄好。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '欸，妳可以幫我看一下後面嗎？' },
      { kind: 'dialogue', speaker: '你', text: '怎麼啦？' },
      { kind: 'dialogue', speaker: '陳信宏', text: '我好像把衣領弄歪了，可是自己看不到。' },
      { kind: 'narration', text: '他把手裡的線稍微放到一邊，轉過身來，還把頭髮往旁邊撥了撥。' },
    ],
    rounds: [
      {
        prompt: '你走到他身前，準備替他把勾住的衣領整理好。',
        choices: [
          { text: '你低頭一點，我幫你弄。', response: '好，這樣可以嗎？', affection: 2 },
          { text: '你怎麼連衣服都不會整理啦？', response: '不是不會啦……後面真的看不到嘛。', affection: 1 },
          { text: '你是不是故意找我幫忙的？', response: '欸，沒有啦！真的卡住了。', affection: 3 },
        ],
      },
      {
        prompt: '你把勾住衣領的線輕輕撥開，再把翻進去的布料整理好。阿信一直很安靜，直到你收回手才慢慢抬起頭。',
        choices: [
          { text: '這下總算整齊了。', response: '真的欸，妳很厲害耶。我剛剛弄半天都弄不好。', affection: 2 },
          { text: '你剛剛怎麼都不敢動？', response: '因為妳在弄啊，我怕我一動又弄亂了。', affection: 3 },
          { text: '你是不是有點緊張？', response: '有一點吧……不過好像也不全是因為等一下要表演。', affection: 2 },
        ],
      },
      {
        prompt: '他低頭看了看衣領，伸手把麥克風線重新理好。',
        choices: [
          { text: '我會幫你大聲加油。', response: '那我應該聽得到吧？妳不要站太遠喔。', affection: 2 },
          { text: '你不要緊張，唱錯也沒關係。', response: '妳這樣講，我反而更有壓力了啦。', affection: 1 },
          { text: '我會一直看著你。', response: '……那我等一下可能真的會更緊張欸。', affection: 3 },
        ],
      },
    ],
    ending: [
      { kind: 'narration', text: '他重新拿起麥克風，走了兩步，又回過頭來，像是還想跟你說點什麼。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '等一下見喔。' },
      { kind: 'narration', text: '他笑著朝你揮了揮手，這才回到其他人身邊。' },
    ],
  },
  masa: {
    name: '蔡昇晏',
    intro: [
      { kind: 'narration', text: '瑪莎正背著貝斯試著調整背帶，結果背帶把襯衫後面的衣角卷了起來。他低頭看了半天，也沒辦法騰出手來弄。' },
      { kind: 'dialogue', speaker: '你', text: '瑪莎，你衣服被卷起來了啦。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '真的假的？' },
      { kind: 'narration', text: '他扭了扭腰，還是看不到，最後乾脆轉過身，把後背朝向你。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '欸，那妳幫我拉一下啦，我現在拿著琴欸。' },
    ],
    rounds: [
      {
        prompt: '你看著他被背帶卷住的衣角。',
        choices: [
          { text: '你轉過去，我幫你弄。', response: '好啊，今天我的造型就交給妳了。', affection: 2 },
          { text: '你怎麼連衣服都能穿成這樣？', response: '這叫個人風格好不好，妳不懂啦。', affection: 1 },
          { text: '你自己弄不行嗎？', response: '可以啊，但我現在有更方便的人力資源，不用白不用嘛。', affection: 2 },
        ],
      },
      {
        prompt: '你伸手把卷進背帶下面的衣角拉出來，順手把後腰的布料撫平。瑪莎故意站得筆直，還不忘回頭偷看你弄好了沒。',
        choices: [
          { text: '再動我就不幫你了。', response: '好啦好啦，妳今天怎麼這麼有威嚴。', affection: 2 },
          { text: '你到底有沒有在聽話？', response: '有啊，我現在不是乖乖站著嗎？', affection: 1 },
          { text: '你是不是故意的？', response: '欸，我只是想確認妳有沒有認真工作欸。', affection: 3 },
        ],
      },
      {
        prompt: '你終於把最後一處皺褶整理好，往後退了一點。',
        choices: [
          { text: '等一下好好表現喔。', response: '放心啦，我可不想被妳嫌。', affection: 2 },
          { text: '我會在台下幫你打拍子。', response: '那妳記得打準一點，不然我會以為自己彈錯。', affection: 3 },
          { text: '你最好不要彈錯。', response: '蛤？妳現在是在給我壓力喔？等一下就讓妳看看。', affection: 1 },
        ],
      },
    ],
    ending: [
      { kind: 'narration', text: '他把貝斯重新背好，低頭看了看衣角，滿意地點點頭。經過你身邊時，還故意用肩膀輕輕碰了你一下。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '謝啦，造型師。' },
    ],
  },
  stone: {
    name: '石錦航',
    intro: [
      { kind: 'narration', text: '石頭剛把吉他背好，肩膀上的背帶卻把襯衫壓出一道明顯的褶皺，後面的衣領也翻進去一小截。他一隻手扶著琴頸，另一隻手拿著撥片，怎麼弄都不太方便。' },
      { kind: 'dialogue', speaker: '你', text: '石頭，你後面衣服皺掉了啦。' },
      { kind: 'dialogue', speaker: '石錦航', text: '真的假的？我剛剛怎麼都沒發現。' },
      { kind: 'narration', text: '他低頭看了一眼，又試著伸手去夠，結果越弄越亂，自己先笑了出來。' },
      { kind: 'dialogue', speaker: '石錦航', text: '好像真的不太行欸。好啦，今天就麻煩妳當一下造型師了。' },
    ],
    rounds: [
      {
        prompt: '他稍稍側過身，把肩膀往你這邊放低了一點。',
        choices: [
          { text: '你站好，我幫你弄。', response: '好，妳慢慢來。今天的造型就交給妳了。', affection: 2 },
          { text: '你怎麼跟怪獸一樣笨手笨腳的？', response: '欸，這樣不公平吧！我明明比他好很多。', affection: 3 },
          { text: '你把肩膀放低一點啦。', response: '好好好，妳說了算。', affection: 1 },
        ],
      },
      {
        prompt: '你伸手把背帶下方的布料拉平，又把翻進去的袖口一點點整理出來。石頭很配合地站著，卻還是忍不住低頭偷看。',
        choices: [
          { text: '你再動我就弄不好了。', response: '好，我不動。妳慢慢來，不然等一下真的要被妳罵了。', affection: 2 },
          { text: '你是不是故意的？', response: '我哪有？我只是想看看妳有沒有認真工作。', affection: 3 },
          { text: '你們幾個真的很難照顧欸。', response: '那妳辛苦了，尤其怪獸那個真的比較難搞。', affection: 1 },
        ],
      },
      {
        prompt: '你把最後一處皺褶撫平，伸手拍了拍他的肩膀。',
        choices: [
          { text: '現在帥多了。', response: '本來就不差吧？不過妳整理完，好像真的有比較好看。', affection: 2 },
          { text: '等一下記得好好表現喔。', response: '知道啦，不然妳這個造型師不是白忙了？', affection: 1 },
          { text: '我會在下面看著你的。', response: '那妳可要看仔細一點，不能只顧著看怪獸喔。', affection: 3 },
        ],
      },
    ],
    ending: [
      { kind: 'narration', text: '石頭重新把吉他背好，還故意轉了半圈給你檢查。' },
      { kind: 'dialogue', speaker: '石錦航', text: '怎樣？這樣有沒有及格？' },
      { kind: 'narration', text: '你還沒回答，他自己先笑了，拿起撥片往舞台那邊走。' },
    ],
  },
  yanming: {
    name: '劉諺明',
    intro: [
      { kind: 'narration', text: '諺明站在舞台側邊，看著佑達重新調整鼓組。鼓棒敲在鼓面上的聲音一下一下傳過來，他的手指也不自覺跟著節奏輕敲。' },
      { kind: 'dialogue', speaker: '你', text: '諺明哥，你剛剛一直看著佑達的鼓欸。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '以前自己也常常在這個位置忙啊，看到鼓組就會多看兩眼。' },
      { kind: 'dialogue', speaker: '你', text: '你會不會懷念以前站在舞台上的日子？' },
      { kind: 'dialogue', speaker: '劉諺明', text: '會啊。尤其聽到鼓聲的時候，手有時候還是會自己想跟著打拍子。' },
    ],
    rounds: [
      {
        prompt: '他笑著看了一眼台上的鼓組，手指還在腿上輕輕敲著。',
        choices: [
          { text: '那你現在看他們，會不會有點像看以前的自己？', response: '有一點吧。只是現在站在旁邊，反而會注意到更多以前自己沒空注意的事。', affection: 3 },
          { text: '你是不是也很想上去打兩下？', response: '哈哈，有一點。不過今天先讓佑達好好表現，不然他等一下要跟我算帳了。', affection: 2 },
          { text: '你以前上台前也這麼忙嗎？', response: '比他們好不到哪裡去啦。以前也是一下找這個、一下找那個，常常到最後一刻才發現少東西。', affection: 1 },
        ],
      },
      {
        prompt: '舞台上換場的工作人員搬走一個器材箱。諺明往旁邊讓了一步，視線卻還是跟著台上的鼓組。',
        choices: [
          { text: '你現在會不會有點懷念？', response: '會啊，不過也不是一直想回去。現在看著他們好好表演，我也覺得很過癮。', affection: 3 },
          { text: '所以你以前也常常手忙腳亂喔？', response: '當然啊，誰一開始就什麼都會。那時候還不是大家互相幫忙。', affection: 2 },
          { text: '你現在當觀眾，反而可以看他們出糗欸。', response: '哈哈，這倒是真的。不過我應該還是會先替他們緊張。', affection: 1 },
        ],
      },
      {
        prompt: '台下的掌聲響起，諺明轉過頭看你，笑著問你想站在哪裡。',
        choices: [
          { text: '等一下我們站近一點吧。', response: '好啊，等人潮再多一點就不好走了，我們早點過去。', affection: 2 },
          { text: '你也要跟著拍手，不要裝鎮定。', response: '好啦，我又沒有說不拍。妳等一下不要拍到手痛就好。', affection: 2 },
          { text: '今天你就負責跟我一起喊。', response: '哈哈，好。那妳可不要喊到最後只剩我一個人在喊。', affection: 3 },
        ],
      },
    ],
    ending: [
      { kind: 'narration', text: '他把手裡的節目單折好收起來，站到你身旁。舞台那邊又傳來一陣鼓聲，他的手指跟著敲了兩下，這才笑著看向你。' },
      { kind: 'dialogue', speaker: '劉諺明', text: '走吧，去找個看得清楚的位置。' },
    ],
  },
}

const watchScenes: { time: string; band: string; blocks: March29Block[] }[] = [
  {
    time: '16:05–16:35',
    band: 'Buzz',
    blocks: [
      { kind: 'narration', text: 'Buzz 上台後，台下的人群很快跟著音樂動了起來。有人拍手，有人吹口哨，前排幾個人甚至跟著節奏往旁邊晃。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '欸，現場真的滿熱鬧的耶。' },
      { kind: 'dialogue', speaker: '石錦航', text: '你剛剛不是還在嫌人家音箱擺太近？現在聽得很開心嘛。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '我是在研究啦，懂不懂？' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '你最好是真的有在研究。' },
    ],
  },
  {
    time: '16:35–17:05',
    band: '直覺',
    blocks: [
      { kind: 'narration', text: '下一組直覺接著上台。換場的空檔，工作人員在舞台上來回走動，台下的人也趁機挪了挪位置。音樂重新響起時，你身邊幾個人又不約而同地安靜下來。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '這樣一組接一組看下來，時間過得好快喔。' },
      { kind: 'dialogue', speaker: '石錦航', text: '你剛剛還在說時間很慢欸。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '那是因為剛剛怪獸一直在那邊找東西啊。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '欸，怎麼又扯到我？' },
      { kind: 'dialogue', speaker: '瑪莎', text: '因為很好用啊。' },
    ],
  },
  {
    time: '17:10–17:40',
    band: 'Death Bone',
    blocks: [
      { kind: 'narration', text: 'Death Bone 開始演出時，天色已經慢慢往下沉。舞台周圍的人比剛才更多了，你被旁邊的歡呼聲感染，忍不住跟著拍手，腳尖也一下一下踩著節拍。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '妳好像比剛剛更興奮了欸。' },
      { kind: 'dialogue', speaker: '你', text: '因為快輪到你們了啊！' },
      { kind: 'dialogue', speaker: '瑪莎', text: '她等一下可能會比我們還忙欸。' },
      { kind: 'dialogue', speaker: '石錦航', text: '那我們是不是要先跟她說辛苦了？' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '你們真的很吵欸。' },
    ],
  },
  {
    time: '17:40–18:10',
    band: '混沌',
    blocks: [
      { kind: 'narration', text: '最後一組混沌上台。你們站在人群裡看完這一段，身邊的聲音、掌聲和舞台上的音樂混在一起，整個公園都像醒著一樣。' },
      { kind: 'narration', text: '演出接近尾聲時，怪獸已經開始頻頻看向器材區。阿信把手裡的節目單折好，瑪莎則把貝斯背帶重新調整了一次。' },
      { kind: 'dialogue', speaker: '陳信宏', text: '好像真的快輪到我們了。' },
      { kind: 'dialogue', speaker: '石錦航', text: '終於欸。' },
      { kind: 'dialogue', speaker: '瑪莎', text: '你剛剛不是還說不要緊張？' },
      { kind: 'dialogue', speaker: '石錦航', text: '我哪有緊張，我是等不及了。' },
      { kind: 'dialogue', speaker: '溫尚翊', text: '好啦，準備一下，等一下不要有人忘東忘西。' },
    ],
  },
]

const stageBlocks: March29Block[] = [
  { kind: 'narration', text: '18:10。工作人員示意他們準備上台。佑達先坐到鼓組後面，調整好坐姿，拿起鼓棒在鼓面上輕輕敲了幾下。怪獸和石頭分別背好吉他，瑪莎抱著貝斯，阿信拿著麥克風走到舞台前方。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '欸，大家準備好了沒？' },
  { kind: 'dialogue', speaker: '溫尚翊', text: '你才是吧？不要等一下第一個出包。' },
  { kind: 'dialogue', speaker: '瑪莎', text: '最好是啦！' },
  { kind: 'dialogue', speaker: '石錦航', text: '好了啦，快上去。等一下真的來不及了。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '走吧。' },
  { kind: 'narration', text: '阿信先走上舞台，回頭朝其他人看了一眼。怪獸跟著上去，經過石頭身邊時伸手碰了一下他的肩膀。瑪莎最後確認了一遍背帶，衝著佑達比了個手勢。五個人各自站到位置上。' },
  { kind: 'narration', text: '台下的掌聲漸漸響起。阿信握起麥克風，笑著看向觀眾。' },
  { kind: 'dialogue', speaker: '陳信宏', text: '大家好！我們是五月天！' },
  { kind: 'narration', text: '你立刻跟著喊了起來。鼓點落下，吉他聲緊跟著衝出來。怪獸和石頭的吉他一前一後接上，瑪莎的貝斯穩穩壓住節奏，佑達坐在鼓組後面，鼓棒一下接著一下，整個舞台瞬間活了起來。' },
  { kind: 'narration', text: '阿信站在最前面唱歌，唱到興奮的地方，還抬起空著的那隻手，朝台下揮了揮。你根本顧不上矜持，跟著音樂又蹦又跳，手舉得高高的，嗓子也跟著喊起來。' },
  { kind: 'narration', text: '怪獸和石頭偶爾交換一個眼神，下一段吉他配合得格外漂亮。瑪莎抱著貝斯往前走了幾步，故意朝怪獸挑了挑眉。怪獸回了他一個眼神，手上的動作卻一點沒停。石頭看見了，乾脆也往前跨了一步。阿信唱到一半，忍不住笑了一下。' },
  { kind: 'narration', text: '佑達的鼓點越打越有勁，最後一下落下時，瑪莎還故意把貝斯往上一揚。台下立刻爆出一陣掌聲。' },
]

const highMoments: Record<March29Character, March29Block[]> = {
  wen: [
    { kind: 'narration', text: '一段吉他間奏響起，怪獸往舞台前方踏了一步，右腳穩穩踩住節拍，肩膀隨著音樂往後一沉。' },
    { kind: 'narration', text: '燈光從他的手背掠過。那雙手真的很好看——手指修長，骨節分明，左手在琴頸上俐落地換把位，指腹一下下準確地按住琴弦；右手拇指和食指夾著撥片，手腕放得很鬆，掃弦、點弦，每一下都乾淨得漂亮。手背的線條隨著動作微微繃起，指尖在琴弦間飛快移動，快得讓人幾乎看不清。' },
    { kind: 'narration', text: '他低著頭把那一段彈完，最後一個音落下時，手腕俐落地一收，撥片還在指間轉了半圈。接著他抬起琴頸，像是知道自己剛剛有多帥，眉梢很臭屁地一挑。' },
    { kind: 'narration', text: '你在台下看得忘了眨眼，心裡只剩下一句：手也太好看了吧。偏偏他像是察覺你一直盯著，抬眼往你這邊看了一下，嘴角揚起來，那表情簡直像在問：有看到吧？我就知道很帥。' },
    { kind: 'narration', text: '你立刻又蹦又跳，喊得比剛才還大聲。他看見了，笑得更得意，下一拍便把琴背帶往肩上一提，轉回去接著彈，整個人張揚得不得了。臭屁死了。可是你偏偏最吃這一套。' },
  ],
  ashin: [
    { kind: 'narration', text: '阿信握著麥克風走到舞台前方，唱到一段有力量的地方，忽然抬起手，示意台下跟著拍手。掌聲從前排一路往後傳，你也跟著大家一起拍，越拍越起勁，甚至踮起腳尖朝他揮手。' },
    { kind: 'narration', text: '他看見你，眼睛彎了起來，沒有急著移開視線，而是迎著台下的歡呼聲繼續唱下去。平時說話軟軟的男生，此刻握著麥克風，聲音卻有一種讓人不自覺跟著他的力量。' },
    { kind: 'narration', text: '唱完一段，他稍稍退後一步，抬手擦了一下額角，笑著看向台下。你突然覺得，這個畫面大概會記很久。' },
  ],
  masa: [
    { kind: 'narration', text: '瑪莎的貝斯聲在一段間奏裡格外突出。他低頭彈了幾下，忽然往舞台前方跨了一大步，身體跟著節奏一晃，手指卻穩穩地壓著琴弦。' },
    { kind: 'narration', text: '怪獸剛好轉過來，兩個人在舞台中央交換了一個眼神。瑪莎衝他揚了揚下巴，像是在說「看我的」。下一秒，他把貝斯往上抬了一點，彈完一段後又故意朝台下挑眉。' },
    { kind: 'narration', text: '你立刻興奮地尖叫起來。他聽見你的聲音，笑得特別得意，甚至還多做了一個誇張的動作。這傢伙，平時嘴上那麼欠，站上台倒是真的有兩把刷子。' },
  ],
  stone: [
    { kind: 'narration', text: '石頭在舞台一側彈得很投入。原本低頭看著琴弦的他，隨著音樂漸漸進入狀態，動作也越來越放開。' },
    { kind: 'narration', text: '怪獸往他那邊靠過來，兩個人在一段配合裡幾乎同時抬起琴頸，彈完後又相視一笑。石頭轉身朝台下走了幾步，正好看見你在下面蹦得特別起勁。' },
    { kind: 'narration', text: '他忍不住笑了，眉眼舒展開來，原本有些內斂的神情一下子變得張揚。接著他重新低下頭，手指在琴弦上俐落地移動，整個人跟著節奏晃起來。你看著他，突然覺得平時那個愛開玩笑、偶爾還有點孩子氣的石頭，原來也可以這麼耀眼。' },
  ],
  yanming: [
    { kind: 'narration', text: '諺明沒有站上舞台，就在你旁邊看著那幾個熟悉的身影。他原本只是跟著節奏輕輕拍手，可音樂越來越熱鬧，他也漸漸顧不上維持平時那副沉穩的樣子，手掌拍得越來越響，甚至跟著鼓點在腿上敲了起來。' },
    { kind: 'dialogue', speaker: '劉諺明', text: '妳真的很投入欸！' },
    { kind: 'dialogue', speaker: '你', text: '你也很投入啊！' },
    { kind: 'narration', text: '他無奈地笑著搖搖頭，卻沒有否認。隨後重新望向舞台，目光落在那幾個熟悉的身影上。鼓點響起時，他的手指也跟著輕輕敲了兩下。那一刻，他看起來既像一個驕傲的老朋友，也像一個終於能安心站在台下的觀眾。' },
  ],
}

const endingBlocks: March29Block[] = [
  { kind: 'narration', text: '18:40，最後一段音樂結束。佑達放下鼓棒，瑪莎把貝斯稍稍放低，石頭和怪獸相互看了一眼，阿信握著麥克風向台下鞠躬。掌聲和歡呼聲一下子湧了上來。' },
  { kind: 'narration', text: '你拍得手掌都有點發紅，嗓子也快喊啞了，卻還是忍不住繼續鼓掌。怪獸把吉他背帶往肩膀上撥了撥，額頭上已經有了一層薄汗；阿信笑著和大家揮手，瑪莎轉過頭跟佑達說了句什麼，石頭則笑著拍了拍怪獸的肩膀。' },
  { kind: 'narration', text: '他們剛剛還在台下吵吵鬧鬧，現在卻真的完成了這場演出。你站在人群裡看著舞台上的他們，忽然有點捨不得這一刻結束。' },
  { kind: 'narration', text: '至少今天，他們終於站上了自己期待已久的舞台。而你也真的在台下，親眼看見了這一刻。' },
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

function clockForProgress(progress: March29Progress) {
  if (progress.phase === 'stage') return '18:10'
  if (progress.phase === 'ending') return '18:40'
  if (progress.phase === 'watch') return ['16:05', '16:35', '17:10', '17:40'][progress.watchIndex] ?? '17:40'
  return '15:30'
}

export function March29Show({
  affection,
  onAddAffection,
  onClockChange,
}: {
  affection: Record<March29Character, number>
  onAddAffection: (character: March29Character, amount: number) => void
  onClockChange: (time: string) => void
}) {
  const [progress, setProgress] = useState<March29Progress>(readProgress)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    localStorage.setItem('mayday-march29-clock', clockForProgress(progress))
    if (progress.phase === 'ending') localStorage.setItem('mayday-march29-complete', 'true')
    onClockChange(clockForProgress(progress))
  }, [progress, onClockChange])

  const setPhase = (phase: March29Phase) => setProgress((current) => ({ ...current, phase }))
  const selectCharacter = (character: March29Character) => {
    setProgress({ phase: 'interaction', character, roundIndex: 0, pendingReply: null, watchIndex: 0 })
  }
  const chooseReply = (choiceIndex: number) => {
    if (!progress.character || progress.pendingReply !== null) return
    const choice = routes[progress.character].rounds[progress.roundIndex]?.choices[choiceIndex]
    if (!choice) return
    setProgress((current) => ({ ...current, pendingReply: choiceIndex }))
    onAddAffection(progress.character, choice.affection)
  }
  const continueInteraction = () => {
    if (progress.pendingReply === null) return
    if (progress.roundIndex < 2) {
      setProgress((current) => ({ ...current, roundIndex: current.roundIndex + 1, pendingReply: null }))
    } else {
      setProgress((current) => ({ ...current, phase: 'watch', watchIndex: 0, pendingReply: null }))
    }
  }
  const nextBand = () => {
    if (progress.watchIndex < watchScenes.length - 1) {
      setProgress((current) => ({ ...current, watchIndex: current.watchIndex + 1 }))
    } else {
      setPhase('stage')
    }
  }

  const focusCharacter = CHARACTER_ORDER.reduce(
    (best, character) => affection[character] > affection[best] ? character : best,
    CHARACTER_ORDER[0],
  )
  const selectedRoute = progress.character ? routes[progress.character] : null
  const currentRound = selectedRoute?.rounds[progress.roundIndex]
  const selectedChoice = progress.pendingReply !== null && currentRound ? currentRound.choices[progress.pendingReply] : null
  const currentBand = watchScenes[progress.watchIndex]

  return (
    <div className="story-screen-overlay">
      <div className="story-screen-head">
        <div className="chapter-mark">3 月 29 日・演出日</div>
        <div className="story-contact-title">
          <strong>大安森林公園・野台開唱</strong>
          <small>1997 年 3 月 29 日・現場</small>
        </div>
        <span className="story-head-spacer" />
      </div>

      <div className="story-narrative-scroll">
        <div className="story-kicker">MARCH 29 · LIVE</div>

        {progress.phase === 'group' && (
          <>
            <h2 className="story-scene-title">今天，終於來到現場了。</h2>
            <March29Blocks blocks={groupBlocks} />
            <div className="reunion-pause-note">舞台旁的器材都已經就位，離五月天上台還有一段時間。</div>
          </>
        )}

        {progress.phase === 'picker' && (
          <>
            <h2 className="story-scene-title">演出前，想陪誰待一會兒？</h2>
            <March29Blocks blocks={[
              { kind: 'narration', text: '大家又各自忙了起來。怪獸低頭確認吉他背帶，阿信正在整理麥克風線，瑪莎抱著貝斯跟佑達說話，石頭則在旁邊試了試琴弦。諺明站在舞台側邊，看著他們忙碌，偶爾跟佑達聊上幾句。' },
              { kind: 'narration', text: '你看了看這群人，決定趁正式上台前，找其中一個人說說話。' },
            ]} />
            {CHARACTER_ORDER.map((character) => (
              <button className="reply-choice" key={character} onClick={() => selectCharacter(character)}>
                <span>{CHARACTER_NAMES[character]}</span><ChevronRight size={15} />
              </button>
            ))}
          </>
        )}

        {progress.phase === 'interaction' && selectedRoute && currentRound && (
          <>
            <h2 className="story-scene-title">和{selectedRoute.name}待一會兒</h2>
            {progress.roundIndex === 0 && <March29Blocks blocks={selectedRoute.intro} />}
            <div className="reunion-pause-note">第 {progress.roundIndex + 1}／3 輪互動</div>
            <p className="narrative-paragraph">{currentRound.prompt}</p>
            {selectedChoice ? (
              <>
                <div className="narrative-dialogue">
                  <span>你</span>
                  <p>{'「' + selectedChoice.text + '」'}</p>
                </div>
                <div className="narrative-dialogue">
                  <span>{selectedRoute.name}</span>
                  <p>{'「' + selectedChoice.response + '」'}</p>
                </div>
                {selectedChoice.afterResponse && <p className="narrative-paragraph">{selectedChoice.afterResponse}</p>}
                {progress.roundIndex === 2 && <March29Blocks blocks={selectedRoute.ending} />}
                <div className="story-action-bar story-inline-action">
                  <button className="story-primary-button" onClick={continueInteraction}>
                    {progress.roundIndex < 2 ? '繼續聊下去' : '去看其他樂團'} <ChevronRight size={15} />
                  </button>
                </div>
              </>
            ) : (
              <div className="march29-reply-list">
                {currentRound.choices.map((choice, index) => (
                  <button className="reply-choice" key={index} onClick={() => chooseReply(index)}>
                    <span>{choice.text}</span><ChevronRight size={15} />
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {progress.phase === 'watch' && currentBand && (
          <>
            <h2 className="story-scene-title">台下的時間也很熱鬧。</h2>
            <div className="march29-band-heading">
              <span>{currentBand.time}</span>
              <strong>{currentBand.band}</strong>
            </div>
            <March29Blocks blocks={currentBand.blocks} />
            <div className="reunion-pause-note">節目單上的下一組演出即將開始。</div>
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={nextBand}>
                {progress.watchIndex < watchScenes.length - 1 ? '繼續看下一組' : '五月天快上場了'} <ChevronRight size={15} />
              </button>
            </div>
          </>
        )}

        {progress.phase === 'stage' && (
          <>
            <h2 className="story-scene-title">18:10 · 五月天上台</h2>
            <March29Blocks blocks={stageBlocks} />
            <div className="march29-high-moment">
              <div className="march29-high-moment-label">台下的你，目光不自覺追著他</div>
              <strong>{CHARACTER_NAMES[focusCharacter]}</strong>
              <March29Blocks blocks={highMoments[focusCharacter]} />
            </div>
            <div className="reunion-pause-note">18:10–18:40 · 五月天</div>
            <div className="story-action-bar story-inline-action">
              <button className="story-primary-button" onClick={() => setPhase('ending')}>
                看完這場演出 <ChevronRight size={15} />
              </button>
            </div>
          </>
        )}

        {progress.phase === 'ending' && (
          <>
            <h2 className="story-scene-title">18:40 · 演出結束</h2>
            <March29Blocks blocks={endingBlocks} />
            <div className="reunion-pause-note">1997 年 3 月 29 日・大安森林公園</div>
          </>
        )}
      </div>

      {progress.phase === 'group' && (
        <div className="story-action-bar">
          <button className="story-primary-button" onClick={() => setPhase('picker')}>走過去看看他們 <ChevronRight size={15} /></button>
        </div>
      )}
      {progress.phase === 'picker' && (
        <div className="story-action-bar">
          <button className="story-primary-button" onClick={() => setPhase('group')}>再看一眼現場 <ChevronRight size={15} /></button>
        </div>
      )}
    </div>
  )
}
