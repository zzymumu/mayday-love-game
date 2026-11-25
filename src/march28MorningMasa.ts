import type { March28MorningRoute } from './march28Morning'

export const march28MorningMasaRoute: March28MorningRoute = {
  introBlocks: [],
  rounds: [
    {
      scene: [
        { kind: 'dialogue', speaker: '瑪莎', text: '……喔。' },
        { kind: 'narration', text: '瑪莎看著你，又看看阿信，目光最後停在你肩上的外套，嘴角慢慢揚起來。' },
        { kind: 'dialogue', speaker: '瑪莎', text: '我是不是來得不是時候？' },
        { kind: 'dialogue', speaker: '陳信宏', text: '你不要亂講啦！' },
        { kind: 'dialogue', speaker: '瑪莎', text: '我還什麼都沒說欸。' },
      ],
      prompt: '瑪莎一開口就開始鬧你們。你怎麼回他？',
      choices: [
        { text: '你來得正好，我快被太陽曬熟了。', response: '瑪莎看了看你身上的外套，又抬頭看了眼太陽。「那妳不是應該把外套拿掉嗎？」他一臉認真地說完，自己先笑了出來。', affection: 2 },
        { text: '你又在想什麼有的沒的！', response: '他立刻攤開手。「欸，我真的什麼都還沒講欸！」說著還轉頭看向阿信：「你看，她先心虛喔。」', affection: 1 },
        { text: '對，你來得不是時候。', response: '瑪莎臉上的笑容頓了一下，隨後誇張地捂住胸口。「哇，現在連我都不能來了喔？好啦，那我是不是應該先走？」', affection: -2 },
      ],
    },
    {
      scene: [
        { kind: 'narration', text: '瑪莎把早餐袋放到長椅旁，自己仍站在你們面前，故意把「守器材」三個字拖得很長。' },
        { kind: 'dialogue', speaker: '瑪莎', text: '我本來想說，某人怎麼一個晚上都沒消息，原來不是一個人啊。' },
        { kind: 'dialogue', speaker: '你', text: '你不要誤會啦，我昨天只是留下來陪他守器材。' },
        { kind: 'dialogue', speaker: '瑪莎', text: '喔～守器材。' },
        { kind: 'narration', text: '他故意把這三個字重複了一遍，眉毛還挑了一下。' },
        { kind: 'dialogue', speaker: '瑪莎', text: '那辛苦妳了，守夜班應該也沒領薪水吧？' },
        { kind: 'dialogue', speaker: '陳信宏', text: '瑪莎！' },
        { kind: 'dialogue', speaker: '瑪莎', text: '幹嘛？我是在關心她欸。' },
      ],
      prompt: '瑪莎拿守夜班開玩笑。你怎麼回他？',
      choices: [
        { text: '那你要不要給我發工資？', response: '瑪莎低頭看了看自己手裡的早餐袋，煞有介事地點點頭。「可以啊，妳先把出勤紀錄交給我。」他抬眼看你：「不過薪水可能就只有這顆飯糰喔。」', affection: 3 },
        { text: '至少還有早餐可以吃嘛。', response: '他笑了一聲，把早餐袋往你這邊推近一點。「這倒是真的，至少沒有白忙一場。」隨後又故意補充：「不過妳這個員工也太好養了吧。」', affection: 2 },
        { text: '你再說我就讓你也守一整晚。', response: '瑪莎立刻往後退了半步。「欸欸欸，不要啦！我明天還要上課欸！」他轉頭看向阿信：「你管一下她好不好？」', affection: -1 },
      ],
    },
    {
      scene: [
        { kind: 'narration', text: '瑪莎轉頭看了阿信一眼，又瞄了瞄你肩上的外套。' },
        { kind: 'dialogue', speaker: '瑪莎', text: '你也是啦，至少還知道把外套借人家穿。' },
        { kind: 'dialogue', speaker: '陳信宏', text: '晚上真的有點冷啊。' },
        { kind: 'dialogue', speaker: '瑪莎', text: '知道啊，我又沒有說你不應該借。' },
        { kind: 'narration', text: '他從紙袋裡拿出三個飯糰，先把一個遞給阿信，自己留了一個，最後把另一個拿到你面前。' },
        { kind: 'dialogue', speaker: '瑪莎', text: '好啦，這個給妳，省得妳等一下又喊餓。' },
      ],
      prompt: '瑪莎把飯糰遞給你。你怎麼回應？',
      choices: [
        { text: '謝謝，難得你這麼好心。', response: '瑪莎挑了挑眉。「妳這句話聽起來很像在嫌棄我平常都很壞欸。」他把飯糰放進你手裡，笑著補了一句：「不過今天先不跟妳計較。」', affection: 3 },
        { text: '你是不是買多了才分我的？', response: '他立刻點頭。「對啊，不然妳以為咧？」看見你真的接過去，他又笑了：「不過既然都給妳了，就不要浪費。」', affection: 1 },
        { text: '我不吃飯糰，我想吃別的。', response: '瑪莎低頭看了看手裡的飯糰，隨後一臉無奈地看著你。「妳要求真的很多欸。那妳自己去買，我可不負責喔。」', affection: -2 },
      ],
    },
  ],
  endingBlocks: [
    { kind: 'narration', text: '瑪莎撕開自己那顆飯糰的包裝，咬了一口。阿信看著你們鬥嘴，忍不住笑出聲，瑪莎立刻轉過頭瞪他。' },
    { kind: 'dialogue', speaker: '瑪莎', text: '你笑什麼啦！' },
  ],
}
