import type { March28MorningRoute } from './march28Morning'

export const march28MorningWenRoute: March28MorningRoute = {
  introBlocks: [],
  rounds: [
    {
      scene: [
        { kind: 'narration', text: '溫尚翊眉毛一下子抬了起來。他看看你，又看看阿信，手裡的紙袋被捏得沙沙響。' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '蛤？一整晚？' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '妳也真的是，怎麼不回去休息？' },
      ],
      prompt: '溫尚翊聽見你留了一整晚，會怎麼回應？',
      choices: [
        { text: '昨天太晚了，我就留下來陪阿信。', response: '溫尚翊眉毛又抬了一下。「妳還真的留到現在喔？」他像想說什麼，最後只吐出一口氣：「至少也要睡一下吧。」', affection: 1 },
        { text: '怎麼，看到我很意外喔？', response: '他被你問得一頓，視線立刻挪開。「沒有啊，誰意外了？」他抬手摸了摸鼻子：「我只是沒想到妳這麼能熬而已。」', affection: 3 },
        { text: '不然你以為我去哪了？', response: '他皺起眉頭。「我又沒那個意思，妳兇什麼啦。」紙袋在他手裡沙沙響了一聲。', affection: -1 },
      ],
    },
    {
      scene: [
        { kind: 'narration', text: '溫尚翊像是還想說你幾句，最後只把視線轉向阿信。' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '你是不會叫她回去喔？' },
        { kind: 'dialogue', speaker: '陳信宏', text: '我有叫她回去啊，是她自己說要留下來的。' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '喔，是喔。那你還真的給她留到天亮喔。' },
        { kind: 'dialogue', speaker: '陳信宏', text: '不然咧？她都說要陪我了。' },
        { kind: 'narration', text: '溫尚翊的視線落到你肩上的外套，眉頭又輕輕動了一下。' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '那件也是你的？' },
        { kind: 'dialogue', speaker: '陳信宏', text: '對啊，早上有點冷，就借她穿了。' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '……你倒是滿會照顧人的嘛，連外套都提供。' },
        { kind: 'dialogue', speaker: '陳信宏', text: '哪有啦，就剛好借她一下。' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '我又沒說什麼。' },
      ],
      prompt: '溫尚翊嘴上說沒什麼，眼睛卻一直往外套那邊瞄。你怎麼接話？',
      choices: [
        { text: '他只是借我穿一下啦。', response: '溫尚翊點點頭，裝作不在意。「喔，好啦。」他低頭拆紙袋，隔了一會兒才補一句：「有衣服穿就好，早上還滿涼的。」', affection: 1 },
        { text: '怎麼，你也想借我一件？', response: '他愣了一下，手指停在紙袋封口上。「蛤？妳在講什麼啦！」他清了清嗓子，視線飄到別處：「我又不是沒有外套。」', affection: 3 },
        { text: '你管我穿誰的啦！', response: '他眉頭一挑，立刻回了一句：「好啊，妳愛穿誰的就穿誰的。」說完便把視線挪開，低頭拆自己的早餐，明顯不想繼續這個話題。', affection: -2 },
      ],
    },
    {
      scene: [
        { kind: 'dialogue', speaker: '你', text: '你今天怎麼這麼早就來了？' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '我來送東西啊，不然咧？' },
        { kind: 'narration', text: '他從早餐袋裡拿出兩個飯糰，先把一個遞給阿信。' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '快吃啦，等一下還要忙。' },
        { kind: 'narration', text: '他把另一個飯糰拿在手裡，轉過來遞到你面前。' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '妳也趕快吃點東西，臉都快被外套蓋住了。' },
        { kind: 'dialogue', speaker: '陳信宏', text: '她剛剛在睡覺啦，太陽太刺眼了。' },
        { kind: 'dialogue', speaker: '溫尚翊', text: '我又沒問你。' },
      ],
      prompt: '溫尚翊把飯糰遞到你面前。你怎麼回應？',
      choices: [
        { text: '謝謝你，還特地多買了一份。', response: '溫尚翊把飯糰放進你手裡，眼神稍稍柔和了一點。「順手啦，妳不要想那麼多。」他頓了一下，又補充：「而且我哪知道妳有沒有吃東西。」', affection: 3 },
        { text: '你怎麼知道我還沒吃早餐？', response: '他看了看你，又瞥了一眼阿信。「妳現在這個樣子，看起來就像剛睡醒啊。」他忍不住笑了一聲：「猜也猜得到吧。」', affection: 2 },
        { text: '我比較想吃蛋餅欸。', response: '溫尚翊瞪大眼睛看你。「蛤？有飯糰吃就不錯了欸，還挑喔？」他把飯糰往你手邊一放，嘴上嫌棄，還是留給你了。', affection: -1 },
      ],
    },
  ],
  endingBlocks: [
    { kind: 'narration', text: '溫尚翊把早餐袋放在長椅旁，自己在長椅另一端坐下。阿信抬頭看了他一眼，忍不住笑了一聲。溫尚翊瞪了他一眼，最後還是把紙袋往你們中間推近了一點。' },
  ],
}
