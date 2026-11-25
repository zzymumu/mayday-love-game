import type { March28MorningRoute } from './march28Morning'

export const march28MorningStoneRoute: March28MorningRoute = {
  introBlocks: [],
  rounds: [
    {
      scene: [
        { kind: 'dialogue', speaker: '石頭', text: '早啊，阿信。' },
        { kind: 'narration', text: '石頭提著早餐袋走近，先朝阿信點了點頭，隨後才注意到長椅另一側的你。' },
        { kind: 'narration', text: '石頭的目光在你肩上的外套停了一瞬，隨後才看向阿信。' },
        { kind: 'dialogue', speaker: '石頭', text: '那你們應該一整晚都沒怎麼休息吧？' },
      ],
      prompt: '石頭發現你也留了一整晚。你怎麼回答？',
      choices: [
        { text: '嗯，昨天後來太晚了，就留下來了。', response: '石頭輕輕點頭。「原來如此，難怪。」他看了看你有些凌亂的頭髮，笑著問：「應該沒睡得很舒服吧？」', affection: 1 },
        { text: '阿信一個人守器材，我有點不放心。', response: '石頭聽完，眼神柔和了一些。「妳還挺替人著想的。」他轉頭看向阿信：「那你昨晚也辛苦了。」', affection: 3 },
        { text: '你一來就開始關心我們喔？', response: '石頭愣了一下，隨後笑著搖搖頭。「沒有啦，我只是怕妳太累了。」', affection: -1 },
      ],
    },
    {
      scene: [
        { kind: 'narration', text: '阿信抬手揉了揉眼睛，石頭的目光也跟著落在你肩上的外套。' },
        { kind: 'dialogue', speaker: '石頭', text: '外套是阿信的吧？早上風還是有點涼，妳別著涼了。' },
        { kind: 'dialogue', speaker: '你', text: '嗯，他借我穿的。' },
        { kind: 'dialogue', speaker: '石頭', text: '那就好。' },
      ],
      prompt: '石頭注意到你身上的外套，語氣很輕。你怎麼回應？',
      choices: [
        { text: '還好有這件外套，不然真的會冷。', response: '石頭笑了笑。「那就先穿著吧，等太陽再大一點就不會冷了。」他看見你把衣領往上拉了一點，才放心地移開視線。', affection: 1 },
        { text: '你觀察得好仔細喔。', response: '他微微一愣，隨後笑了。「因為妳身上那件外套真的滿明顯的，而且尺寸也不太合，應該不是妳自己的吧。」', affection: 3 },
        { text: '我又不是不知道照顧自己。', response: '石頭沒有反駁，只是溫和地點點頭。「我知道啊，只是提醒妳一下而已。」', affection: -1 },
      ],
    },
    {
      scene: [
        { kind: 'narration', text: '石頭打開紙袋，拿出三個飯糰。他先把一個遞給阿信，再把另一個遞到你面前，袋子裡還留著他自己的那份。' },
        { kind: 'dialogue', speaker: '石頭', text: '我買了幾個，你們先吃吧。' },
        { kind: 'dialogue', speaker: '陳信宏', text: '她剛剛還在睡欸，我差點不敢叫她起來。' },
        { kind: 'dialogue', speaker: '石頭', text: '是嗎？那你應該也沒怎麼睡吧。' },
        { kind: 'dialogue', speaker: '石頭', text: '妳也吃一個。陪人守一整晚，應該很累吧。' },
      ],
      prompt: '石頭把飯糰遞到你面前。你怎麼回應？',
      choices: [
        { text: '謝謝你，還特地多帶一份。', response: '石頭笑著把飯糰遞給你。「我想妳應該也還沒吃，就多拿了一個。」他看你接過去，才收回手：「先吃吧，還熱著。」', affection: 3 },
        { text: '你也還沒吃吧？一起吃啊。', response: '他笑著點點頭。「好啊，我也帶了自己的份。」他站在長椅旁邊拆開自己的飯糰，陪你一起吃。', affection: 2 },
        { text: '不用啦，我現在還不餓。', response: '石頭沒有勉強你，只把飯糰輕輕放在長椅旁邊。「好，那妳先放著，等餓了再吃。」', affection: -1 },
      ],
    },
  ],
  endingBlocks: [
    { kind: 'narration', text: '石頭始終站在長椅旁邊，等你把飯糰拿穩，才順手把空出來的紙袋折好。他抬眼看了看器材箱，像是也在替今天的演出確認時間。' },
  ],
}
