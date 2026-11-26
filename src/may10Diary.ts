import type { May10Character } from './May10Story'

export type May10DiaryData = {
  version: 2
  title: string
  text: string
}

type May10DiarySelection = {
  character: May10Character | null
  jealousyCharacter: May10Character | null
}

const NAMES: Record<May10Character, string> = {
  wen: '溫尚翊',
  ashin: '陳信宏',
  masa: '瑪莎',
  stone: '石錦航',
  yanming: '劉諺明',
}

const may10DiaryParagraphs = [
  '今天去練團室，差點笑到肚子痛。',
  '前面那幾個面試的人真的太有自己的想法了。一個來了就想打自己的 Solo，一個完全不管大家在彈什麼，還有一個居然想讓所有歌都跟著節拍器走。',
  '我真的很好奇，他們到底是怎麼找到這裡來的啦！',
  '怪獸今天的臉色也很好笑。',
  '從第一個人開始，他就一直皺著眉頭，後來乾脆連話都懶得講了。偏偏瑪莎還一直在旁邊補刀，我本來想忍住的，最後還是笑出來。',
  '結果怪獸立刻轉過來：「妳還笑！」',
  '不然咧！難道我要跟你一起生氣嗎！',
  '不過最後那個陳泳錩真的讓人有點意外。',
  '剛進來的時候看起來很害羞，講話也小小聲的，我還以為他會是今天最安靜的一個。結果一坐上鼓椅，整個人就不一樣了。',
  '而且他居然還主動找諺明哥一起打。',
  '兩個人一來一回的，真的很厲害。明明沒有講幾句話，卻好像完全知道對方下一個節奏會落在哪裡。',
  '怪獸那時候的表情我有看到。',
  '終於不用再皺眉頭了吧！',
  '今天總算把新鼓手找到了。',
  '想想前陣子練團室裡那個空下來的位置，現在終於有人要坐上去了。雖然還不知道以後會變成什麼樣子，但突然有點期待下一次練團。',
  '啊，對了。',
  '今天怪獸真的很容易生氣。',
  '但是找到鼓手以後又笑得很開心。',
  '這個人到底是怎樣啦。',
  '先這樣好了，今天笑得有點累。',
  '晚安！',
]

const jealousyDiaryText: Record<May10Character, (mainCharacter: May10Character | null) => string> = {
  wen: (mainCharacter) =>
    `本來還在跟${mainCharacter ? NAMES[mainCharacter] : '他'}聊著，怪獸就從另一頭走過來叫我，說剛才有個地方還想問我。結果聊著聊著，話題又繞回我怎麼跟別人聊那麼久。明明有話想說，偏偏又不肯好好講，這個人真的很不會拐彎。`,
  ashin: (mainCharacter) =>
    `本來還在跟${mainCharacter ? NAMES[mainCharacter] : '他'}聊著，阿信後來抱著吉他和樂譜走過來，說剛才那段還想再彈給我聽。他沒有直接打斷我們，一直等到我轉過頭才開口。後來那段時間，他倒是很認真地留給我，連我說話也好好聽著。`,
  masa: (mainCharacter) =>
    `本來還在跟${mainCharacter ? NAMES[mainCharacter] : '他'}聊著，瑪莎就靠過來問我是不是很忙，還說要不要拿號碼牌。明明一副在看熱鬧的樣子，話裡話外卻一直拿我跟別人聊天這件事開玩笑。最後還不忘提醒我，等一下不要又被別人叫走。真的是，嘴巴那麼壞，自己倒很會把人留下來。`,
  stone: (mainCharacter) =>
    `本來還在跟${mainCharacter ? NAMES[mainCharacter] : '他'}聊著，石頭等我轉過頭才輕聲叫我，沒有急著插話。後來他攤開樂譜，慢慢跟我聊起剛才那段，最後還說下次來要再拿給我看。石頭講話總是輕輕的，卻會讓人不知不覺把那些小事記住。`,
  yanming: (mainCharacter) =>
    `本來還在跟${mainCharacter ? NAMES[mainCharacter] : '他'}聊著，諺明哥忙完鼓組才過來，沒有急著打斷我們，只跟我聊起陳泳錩剛才打鼓的事。最後還說，下次過來不用客氣，直接進來就好。跟諺明哥講話就是這樣，明明很平常，卻總讓人覺得被照顧到了。`,
}

export function buildMay10DiaryData(selection?: May10DiarySelection): May10DiaryData {
  const paragraphs = [...may10DiaryParagraphs]
  if (selection?.jealousyCharacter) {
    const insertAt = paragraphs.indexOf('啊，對了。')
    const jealousyEntry = jealousyDiaryText[selection.jealousyCharacter](selection.character)
    paragraphs.splice(insertAt < 0 ? paragraphs.length : insertAt, 0, jealousyEntry)
  }

  return {
    version: 2,
    title: '終於找到新鼓手了！',
    text: paragraphs.join('\\n\\n'),
  }
}
