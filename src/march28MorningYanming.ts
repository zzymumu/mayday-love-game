import type { March28MorningRoute } from './march28Morning'

export const march28MorningYanmingRoute: March28MorningRoute = {
  introBlocks: [],
  rounds: [
    {
      scene: [
        { kind: 'dialogue', speaker: '諺明', text: '妳昨晚也陪他守了一整晚？' },
        { kind: 'narration', text: '諺明看了看你，又看了看阿信，目光在你肩上的外套停了一瞬，沒有立刻追問。' },
      ],
      prompt: '諺明哥發現你也在公園。你怎麼回答？',
      choices: [
        { text: '嗯，後來就留下來陪阿信了。', response: '諺明點點頭。「這樣啊，難怪。」他看了一眼器材箱，又看向你：「那妳昨晚應該也沒怎麼睡吧？」', affection: 1 },
        { text: '諺明哥一大早就來檢查器材嗎？', response: '他笑著點頭。「對啊，今天要演出，還是先過來確認一下比較放心。」他順手拍了拍早餐袋：「剛好也買了早餐過來。」', affection: 3 },
        { text: '你該不會也要念我吧？', response: '諺明笑了一聲。「我還沒說什麼，妳怎麼就先想到被念了？」他搖搖頭：「我只是怕妳太累。」', affection: -1 },
      ],
    },
    {
      scene: [
        { kind: 'narration', text: '諺明把早餐袋放在器材箱旁邊，視線掃過箱扣，確認東西都還在原位。' },
        { kind: 'dialogue', speaker: '諺明', text: '不過你們兩個倒是挺能熬的。' },
        { kind: 'dialogue', speaker: '陳信宏', text: '她比我厲害啦，我剛剛還差點睡著。' },
        { kind: 'dialogue', speaker: '諺明', text: '那你更要謝謝人家了。' },
      ],
      prompt: '諺明哥看起來也起得很早。你怎麼接話？',
      choices: [
        { text: '阿信昨晚真的沒怎麼休息。', response: '諺明點點頭。「那你今天更要注意精神了，等一下事情還不少。」他又看向你：「妳也別只顧著陪人，自己要休息。」', affection: 2 },
        { text: '諺明哥你也很早欸，難道你都不累嗎？', response: '他笑了笑。「習慣了啦，練團室有時候比這個還忙。」他抬手看了一眼時間：「不過今天確實起得早了一點。」', affection: 3 },
        { text: '我們年輕嘛！', response: '諺明聽完笑出聲。「好，年輕就是本錢。」他頓了頓，又故意補了一句：「不過還是要吃早餐，不然等一下可沒有力氣。」', affection: 0 },
      ],
    },
    {
      scene: [
        { kind: 'narration', text: '諺明從早餐袋裡拿出三個飯糰，先把一個遞給阿信，再把另一個遞給你，最後把自己的那份留在手裡。' },
        { kind: 'dialogue', speaker: '諺明', text: '來，先吃點東西。今天還有演出，別到時候兩個人都沒精神。' },
      ],
      prompt: '諺明哥把飯糰遞給你。你怎麼回應？',
      choices: [
        { text: '謝謝諺明哥，辛苦你特地跑一趟了。', response: '諺明擺擺手。「這有什麼，反正我也要過來確認器材。」他看你接過飯糰，才放心地收回手：「先吃吧，等一下忙起來就沒空了。」', affection: 2 },
        { text: '諺明哥你也一起吃一點吧。', response: '他看了看手裡的飯糰，笑著點頭。「好啊，那我也吃一個。」他站在器材箱旁拆開自己的包裝，陪你們一起吃了幾口。', affection: 3 },
        { text: '我現在不餓，先放著好了。', response: '諺明沒有勉強你，只把飯糰放在長椅空出來的位置。「那先放著，等一下記得吃。今天可別忙到連飯都忘了。」', affection: -1 },
      ],
    },
  ],
  endingBlocks: [
    { kind: 'narration', text: '諺明把自己的早餐拿好，又轉身確認了一次器材箱和周圍的線材。今天他還有不少準備工作，卻還是特地抽空把早餐送了過來。' },
  ],
}
