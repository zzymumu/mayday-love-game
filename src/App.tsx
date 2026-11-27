import { useCallback, useEffect, useRef, useState } from 'react'
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
import {
  NEXT_MONTH_INVITE_THRESHOLD,
  nextMonthIntroBlocks,
  nextMonthInviteRoutes,
  nextMonthOpenDayIntroBlocks,
  nextMonthOpenDayRoutes,
  nextMonthFreeChatOpeners,
  nextMonthFreeChatContextRounds,
  nextMonthFreeChatScripts,
  nextMonthChatDiary,
  nextMonthDiaryCopy,
  type NextMonthDiaryData,
  type NextMonthFreeChatContext,
} from './nextMonth'
import {
  winterExamIntroBlocks,
  winterExamChatChoices,
  winterExamChatClosingChoices,
  winterExamTutoringIntroBlocks,
  winterExamTutoringRounds,
  winterExamTutoringEnding,
  winterBreakPracticeBlocks,
  winterBreakPracticeRounds,
  winterBreakPracticeEnding,
  winterBreakGigIntroBlocks,
  winterGigFocusBlocks,
  winterBreakGigEndingBlocks,
  winterYanmingPickupBlocks,
  winterBusStopRoutes,
  type WinterCharacterId,
  type WinterDiaryData,
} from './winterBreak'
import {
  februaryIntroBlocks,
  februarySecretInteractions,
  februarySecretReplyChoices,
  februaryDinnerBlocks,
  februaryDinnerChoices,
  februaryTableMoments,
  februaryAfterDinnerRoutes,
  februarySecretDiaryText,
  februaryTableDiaryText,
  februaryAfterDinnerDiaryText,
  type FebruaryCharacterId,
  type FebruaryDiaryData,
} from './february'
import {
  SPRING_INVITE_THRESHOLD,
  springCharacterOrder,
  springInvites,
  springInviteRounds,
  springStoreRoutes,
  springRehearsalBlocks,
  springLessonRoutes,
  springYanmingDinnerBlocks,
  springYanmingDinnerRounds,
  springYanmingDinnerEndingBlocks,
  getSpringSmsOpeners,
  getSpringSmsRounds,
  type SpringCharacterId,
  type SpringDayContext,
} from './springTerm'
import {
  march28CharacterOrder,
  march28MonthRecap,
  march28Routes,
  march28AfterDinnerBlocks,
  march28ParkIntroBlocks,
  march28ParkStayIntroBlocks,
  march28ParkStayRounds,
  march28ParkStayEndingBlocks,
  type March28CharacterId,
} from './march28'
import { march28MorningAshinRoute, getMarch28MorningVisitorIntroBlocks } from './march28Morning'
import { march28MorningVisitorRoutes } from './march28MorningVisitors'
import { March29Show } from './March29Show'
import { buildMarch29DiaryData, type March29DiaryCharacter, type March29DiaryData } from './march29Diary'
import { April12Story, buildApril12DiaryData, type April12Character, type April12DiaryData } from './April12Story'
import { April20Story, type April20Character } from './April20Story'
import { April30Story, getApril30AffectionTotal, type April30Route, type April30Selection } from './April30Story'
import { May10Story, type May10Character, type May10Selection } from './May10Story'
import { JuneStudyStory, type JuneStudySelection } from './JuneStudyStory'
import { JulyLostKeyStory, julyLostKeyMessageArchive, rewindJulyLostKeyStoryToStart, type JulyLostKeySelection } from './JulyLostKeyStory'
import { AugustStory, rewindAugustStoryToStart, type AugustCharacter, type AugustSelection } from './AugustStory'
import { buildAugustDiaryData, type AugustDiaryData } from './augustDiary'
import { SeptemberStory, SeptemberPhotoCard, type SeptemberSelection } from './SeptemberStory'
import { buildSeptemberDiaryData, type SeptemberDiaryData } from './septemberDiary'
import { septemberIntroBlocks } from './september'
import { juneFreeChatScripts } from './JuneFreeChat'
import { buildJuneDiaryData, type JuneDiaryData } from './juneDiary'
import { buildApril20DiaryData, type April20DiaryData } from './april20Diary'
import { buildApril30DiaryData, type April30DiaryData } from './april30Diary'
import { buildMay10DiaryData, type May10DiaryData } from './may10Diary'
import {
  YEAR_END_INVITE_THRESHOLD,
  yearEndIntroBlocks,
  yearEndShoppingRoutes,
  yearEndShoppingReplyChoices,
  yearEndFireworksIntroBlocks,
  yearEndFireworksRounds,
  yearEndFireworksEnding,
  yearEndNewYearMessages,
  yearEndNewYearReplies,
  yearEndProactiveOpeners,
  yearEndFreeChatScripts,
  type YearEndCharacterId,
  type YearEndRouteCharacterId,
} from './yearEnd'

type AppKey = 'messages' | 'contacts' | 'calls' | 'diary' | 'calendar' | 'photos' | 'music' | 'notes' | 'settings'
type CharacterId = 'wen' | 'masa' | 'ashin' | 'stone' | 'yanming' | 'youda'
type RouteCharacterId = Exclude<CharacterId, 'youda'>
type StoryStage = 'notification' | 'messages' | 'reply' | 'walk' | 'studio' | 'reunion' | 'reunion-chat' | 'nickname' | 'rehearsal' | 'dinner' | 'after-dinner' | 'ending' | 'completed' | 'greetings' | 'classroom' | 'masa-checkin' | 'stone-checkin' | 'ice-date' | 'stroll' | 'day2-diary' | 'free-time' | 'free-chat' | 'day2-complete' | 'month-free-time' | 'month-visit' | 'month-visit-complete' | 'month-free-chat' | 'month-diary' | 'next-month-intro' | 'next-month-invite-notification' | 'next-month-invite-picker' | 'next-month-invite' | 'next-month-invite-chat' | 'next-month-invite-date' | 'next-month-open-day' | 'next-month-open-day-picker' | 'next-month-open-day-visit' | 'next-month-open-day-visit-complete' | 'next-month-free-chat' | 'next-month-diary' | 'year-end-intro' | 'year-end-invite-notification' | 'year-end-invite-picker' | 'year-end-shopping-notification' | 'year-end-shopping-chat' | 'year-end-shopping' | 'year-end-fireworks' | 'year-end-new-year-notification' | 'year-end-new-year-chat' | 'year-end-free-chat' | 'year-end-free-chat-picker' | 'year-end-diary' | 'winter-exam-intro' | 'winter-exam-notification' | 'winter-exam-chat' | 'winter-exam-tutoring' | 'winter-break-practice' | 'winter-break-gig' | 'winter-break-pickup' | 'winter-break-bus-choice' | 'winter-break-bus' | 'winter-diary' | 'february-intro' | 'february-secret' | 'february-dinner' | 'february-table' | 'february-after-dinner-picker' | 'february-after-dinner' | 'february-diary' | 'spring-term-intro' | 'spring-invite-picker' | 'spring-invite-notification' | 'spring-invite-chat' | 'spring-store' | 'spring-rehearsal' | 'spring-after-picker' | 'spring-lesson' | 'spring-dinner' | 'spring-sms-picker' | 'spring-sms-chat' | 'spring-diary' | 'march28-intro' | 'march28-visit' | 'march28-end' | 'march28-park' | 'march28-park-stay' | 'march28-morning' | 'march28-diary' | 'march29-show' | 'april12-story' | 'april20-story' | 'april30-story' | 'may10-story' | 'june-study' | 'june-free-chat' | 'june-diary' | 'june-study-complete' | 'july-lost-key' | 'august-story' | 'august-diary' | 'september-intro' | 'september-story' | 'september-diary' | 'paused'
type ReplyKey = 'a' | 'b' | 'c'
type ReunionReplyKey = 'a' | 'b' | 'c'
type NicknameQuestionKey = 'a' | 'b' | 'c'
type DinnerReplyKey = 'a' | 'b' | 'c'
type StoryBlock = { kind: 'narration' | 'dialogue' | 'aside'; text: string; speaker?: string }
type StoryScene = { kicker: string; title: string; blocks: StoryBlock[]; button: string }
type SmsMessage = { id: string; date: string; time?: string; from: CharacterId | 'me'; text: string }
type NewChatEntry = { from: CharacterId | 'me'; text: string; time?: string }

const splitDiaryParagraphs = (value: string): string[] => {
  const blocks = value
    .replace(/\r\n/g, '\n')
    .replace(/\\n/g, '\n')
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
  const paragraphs: string[] = []

  blocks.forEach((block) => {
    const sentences = block.match(/[^。！？!?]+[。！？!?]["」』）)]*|[^。！？!?]+$/g) ?? [block]
    let current = ''
    let sentenceCount = 0
    const flush = () => {
      if (current.trim()) paragraphs.push(current.trim())
      current = ''
      sentenceCount = 0
    }

    sentences.forEach((sentence) => {
      if (sentence.length > 78) {
        flush()
        const clauses = sentence.match(/[^，,；;]+[，,；;]?/g) ?? [sentence]
        let clauseGroup = ''
        clauses.forEach((clause) => {
          if (clauseGroup && clauseGroup.length + clause.length > 64) {
            paragraphs.push(clauseGroup.trim())
            clauseGroup = clause
          } else {
            clauseGroup += clause
          }
        })
        if (clauseGroup.trim()) paragraphs.push(clauseGroup.trim())
        return
      }

      if (current && (current.length + sentence.length > 78 || sentenceCount >= 2)) flush()
      current += sentence
      sentenceCount += 1
    })

    flush()
  })

  return paragraphs
}

const DiarySection = ({ label, text }: { label: string; text: string }) => {
  const paragraphs = splitDiaryParagraphs(text)
  if (!paragraphs.length) return null

  return (
    <section className="diary-section">
      <div className="diary-section-label">{label}</div>
      {paragraphs.map((paragraph, index) => (
        <p key={`${label}-${index}`}>{paragraph}</p>
      ))}
    </section>
  )
}

const removeDuplicateWenMovieInviteLine = (messages: SmsMessage[]): SmsMessage[] => {
  let removed = false
  const normalized = messages.filter((message, index) => {
    const previous = messages[index - 1]
    const next = messages[index + 1]
    const isDuplicate =
      message.from === 'wen' &&
      message.text === '妳到底要不要去啦！' &&
      previous?.from === 'wen' &&
      previous.text === '我就問妳啊，不然咧？' &&
      next?.from === 'wen' &&
      next.text === '所以，妳到底要不要跟我去啦？'
    if (isDuplicate) removed = true
    return !isDuplicate
  })
  return removed ? normalized : messages
}

const removeDuplicateMasaErrandLine = (messages: SmsMessage[]): SmsMessage[] => {
  let seen = false
  let removed = false
  const normalized = messages.filter((message) => {
    const isErrandLine = message.from === 'masa' && message.text === '我媽還叫我順便買一堆東西，清單長得要命。'
    if (!isErrandLine) return true
    if (seen) {
      removed = true
      return false
    }
    seen = true
    return true
  })
  return removed ? normalized : messages
}

const migrateWenClassroomReplyCopy = (messages: SmsMessage[]): SmsMessage[] => {
  const replacements: Record<string, string> = {
    '他們兩個都才大一，今天想偷跑出去，剛好被老師逮到。': '他們大概覺得溜出去一下不會怎樣，結果運氣也太差。',
    '現在還被留下來談話，今天練團才湊不齊人。': '我本來還想趁今天把那段練完，現在只好改天再說。',
    '平常看起來都很乖，今天倒是很有默契，一起翹課、一起被抓。': '平常看起來都挺乖的，今天膽子倒是不小。',
    '所以今天練團才湊不齊人。': '等他們回來，我再問問到底跑去哪裡玩，搞不好比我今天的練習還精彩。',
    '他們兩個今天只是翹課被抓，跟練團有什麼關係。': '我只是難得不用趕去練團，才有空約妳出來。',
  }
  let changed = false
  const normalized = messages.map((message) => {
    if (message.from !== 'wen' || message.date !== '10月16日・上午' || message.time !== '10:14') return message
    const replacement = replacements[message.text]
    if (!replacement) return message
    changed = true
    return { ...message, text: replacement }
  })
  return changed ? normalized : messages
}
type ChatChoice = { text: string; response: string[]; affection: number; nextIncoming?: string }
type ChatRound = { incoming: string; choices: ChatChoice[] }
type CallLogEntry = { id: string; character: RouteCharacterId; status: 'answered' | 'missed'; time: string; date?: string }
type CallTranscriptLine = { speaker: RouteCharacterId | 'me'; text: string }
type CallExperienceSource = 'first-chapter' | 'day2' | 'free-chat' | 'month-visit' | 'month-free-chat' | 'next-month-invite' | 'next-month-open-day' | 'next-month-free-chat' | 'june-study'
type CharacterExperienceRecord = {
  character: RouteCharacterId
  source: CallExperienceSource
  date: string
  eventKey: string
  day2StrollAccepted: boolean
  choices?: number[]
}
type SaveSlotData = { version: 1; savedAt: string; gameDate: string; gameTime: string; stage: StoryStage; stageLabel: string; data: Record<string, string> }

type DaySnapshotRecord = { date: string; snapshot: SaveSlotData }
type AutoStepSnapshotRecord = { id: string; timestamp: number; date: string; time: string; stageLabel: string; fingerprint: string; snapshot: SaveSlotData }
const DAY_SNAPSHOT_DB_NAME = 'mayday-day-start-snapshots-v1'
const DAY_SNAPSHOT_STORE_NAME = 'day-starts'
const AUTO_STEP_SNAPSHOT_STORE_NAME = 'auto-steps'

const getSaveSnapshotFingerprint = (snapshot: SaveSlotData): string => {
  const serialized = JSON.stringify({ gameDate: snapshot.gameDate, gameTime: snapshot.gameTime, stage: snapshot.stage, data: snapshot.data })
  let hash = 2166136261
  for (let index = 0; index < serialized.length; index += 1) {
    hash ^= serialized.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return serialized.length + ':' + (hash >>> 0).toString(36)
}

const openDaySnapshotDatabase = (): Promise<IDBDatabase> => new Promise((resolve, reject) => {
  if (typeof indexedDB === 'undefined') {
    reject(new Error('這個瀏覽器不支援時間回溯紀錄。'))
    return
  }
  const request = indexedDB.open(DAY_SNAPSHOT_DB_NAME, 2)
  request.onupgradeneeded = () => {
    const database = request.result
    if (!database.objectStoreNames.contains(DAY_SNAPSHOT_STORE_NAME)) {
      database.createObjectStore(DAY_SNAPSHOT_STORE_NAME, { keyPath: 'date' })
    }
    if (!database.objectStoreNames.contains(AUTO_STEP_SNAPSHOT_STORE_NAME)) {
      database.createObjectStore(AUTO_STEP_SNAPSHOT_STORE_NAME, { keyPath: 'id' })
    }
  }
  request.onsuccess = () => resolve(request.result)
  request.onerror = () => reject(request.error ?? new Error('無法開啟時間回溯紀錄。'))
  request.onblocked = () => reject(new Error('時間回溯資料庫正在更新，請重新整理頁面後再試。'))
})

const listDaySnapshots = async (): Promise<DaySnapshotRecord[]> => {
  const database = await openDaySnapshotDatabase()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(DAY_SNAPSHOT_STORE_NAME, 'readonly')
    const request = transaction.objectStore(DAY_SNAPSHOT_STORE_NAME).getAll()
    let records: DaySnapshotRecord[] = []
    request.onsuccess = () => {
      records = (request.result as DaySnapshotRecord[]).filter((record) =>
        record && /^\d{4}\.\d{2}\.\d{2}$/.test(record.date) &&
        record.snapshot && record.snapshot.version === 1)
    }
    request.onerror = () => reject(request.error ?? new Error('讀取時間回溯紀錄失敗。'))
    transaction.oncomplete = () => {
      database.close()
      resolve(records.sort((left, right) => left.date.localeCompare(right.date)))
    }
    transaction.onerror = () => {
      database.close()
      reject(transaction.error ?? new Error('讀取時間回溯紀錄失敗。'))
    }
    transaction.onabort = () => {
      database.close()
      reject(transaction.error ?? new Error('讀取時間回溯紀錄已中斷。'))
    }
  })
}

const getDaySnapshot = async (date: string): Promise<DaySnapshotRecord | null> => {
  const database = await openDaySnapshotDatabase()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(DAY_SNAPSHOT_STORE_NAME, 'readonly')
    const request = transaction.objectStore(DAY_SNAPSHOT_STORE_NAME).get(date)
    let record: DaySnapshotRecord | null = null
    request.onsuccess = () => { record = (request.result as DaySnapshotRecord | undefined) ?? null }
    request.onerror = () => reject(request.error ?? new Error('找不到這一天的回溯紀錄。'))
    transaction.oncomplete = () => {
      database.close()
      resolve(record)
    }
    transaction.onerror = () => {
      database.close()
      reject(transaction.error ?? new Error('讀取時間回溯紀錄失敗。'))
    }
    transaction.onabort = () => {
      database.close()
      reject(transaction.error ?? new Error('讀取時間回溯紀錄已中斷。'))
    }
  })
}

const putDaySnapshotIfMissing = async (record: DaySnapshotRecord): Promise<boolean> => {
  const database = await openDaySnapshotDatabase()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(DAY_SNAPSHOT_STORE_NAME, 'readwrite')
    const store = transaction.objectStore(DAY_SNAPSHOT_STORE_NAME)
    const request = store.get(record.date)
    let inserted = false
    request.onsuccess = () => {
      if (!request.result) {
        store.add(record)
        inserted = true
      }
    }
    request.onerror = () => reject(request.error ?? new Error('保存日初紀錄失敗。'))
    transaction.oncomplete = () => {
      database.close()
      resolve(inserted)
    }
    transaction.onerror = () => {
      database.close()
      reject(transaction.error ?? new Error('保存日初紀錄失敗。'))
    }
    transaction.onabort = () => {
      database.close()
      reject(transaction.error ?? new Error('保存日初紀錄已中斷。'))
    }
  })
}

const deleteDaySnapshotsAfter = async (date: string): Promise<void> => {
  const database = await openDaySnapshotDatabase()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(DAY_SNAPSHOT_STORE_NAME, 'readwrite')
    const request = transaction.objectStore(DAY_SNAPSHOT_STORE_NAME).openCursor()
    request.onsuccess = () => {
      const cursor = request.result
      if (!cursor) return
      const record = cursor.value as DaySnapshotRecord
      if (record.date > date) cursor.delete()
      cursor.continue()
    }
    request.onerror = () => reject(request.error ?? new Error('更新時間線失敗。'))
    transaction.oncomplete = () => {
      database.close()
      resolve()
    }
    transaction.onerror = () => {
      database.close()
      reject(transaction.error ?? new Error('更新時間線失敗。'))
    }
    transaction.onabort = () => {
      database.close()
      reject(transaction.error ?? new Error('更新時間線已中斷。'))
    }
  })
}


const listAutoStepSnapshots = async (): Promise<AutoStepSnapshotRecord[]> => {
  const database = await openDaySnapshotDatabase()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(AUTO_STEP_SNAPSHOT_STORE_NAME, 'readonly')
    const request = transaction.objectStore(AUTO_STEP_SNAPSHOT_STORE_NAME).getAll()
    let records: AutoStepSnapshotRecord[] = []
    request.onsuccess = () => {
      records = (request.result as AutoStepSnapshotRecord[]).filter((record) =>
        record && typeof record.id === 'string' && Number.isFinite(record.timestamp) &&
        typeof record.fingerprint === 'string' && record.snapshot && record.snapshot.version === 1)
    }
    request.onerror = () => reject(request.error ?? new Error('讀取自動進度紀錄失敗。'))
    transaction.oncomplete = () => {
      database.close()
      resolve(records.sort((left, right) => left.timestamp - right.timestamp))
    }
    transaction.onerror = () => {
      database.close()
      reject(transaction.error ?? new Error('讀取自動進度紀錄失敗。'))
    }
    transaction.onabort = () => {
      database.close()
      reject(transaction.error ?? new Error('讀取自動進度紀錄已中斷。'))
    }
  })
}

const putAutoStepSnapshot = async (record: AutoStepSnapshotRecord): Promise<void> => {
  const database = await openDaySnapshotDatabase()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(AUTO_STEP_SNAPSHOT_STORE_NAME, 'readwrite')
    transaction.objectStore(AUTO_STEP_SNAPSHOT_STORE_NAME).put(record)
    transaction.oncomplete = () => {
      database.close()
      resolve()
    }
    transaction.onerror = () => {
      database.close()
      reject(transaction.error ?? new Error('保存自動進度失敗。'))
    }
    transaction.onabort = () => {
      database.close()
      reject(transaction.error ?? new Error('保存自動進度已中斷。'))
    }
  })
}

const deleteAutoStepSnapshotsAfter = async (timestamp: number): Promise<void> => {
  const database = await openDaySnapshotDatabase()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(AUTO_STEP_SNAPSHOT_STORE_NAME, 'readwrite')
    const request = transaction.objectStore(AUTO_STEP_SNAPSHOT_STORE_NAME).openCursor()
    request.onsuccess = () => {
      const cursor = request.result
      if (!cursor) return
      const record = cursor.value as AutoStepSnapshotRecord
      if (record.timestamp > timestamp) cursor.delete()
      cursor.continue()
    }
    request.onerror = () => reject(request.error ?? new Error('整理自動進度紀錄失敗。'))
    transaction.oncomplete = () => {
      database.close()
      resolve()
    }
    transaction.onerror = () => {
      database.close()
      reject(transaction.error ?? new Error('整理自動進度紀錄失敗。'))
    }
    transaction.onabort = () => {
      database.close()
      reject(transaction.error ?? new Error('整理自動進度紀錄已中斷。'))
    }
  })
}

const clearDaySnapshots = async (): Promise<void> => {
  const database = await openDaySnapshotDatabase()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([DAY_SNAPSHOT_STORE_NAME, AUTO_STEP_SNAPSHOT_STORE_NAME], 'readwrite')
    transaction.objectStore(DAY_SNAPSHOT_STORE_NAME).clear()
    transaction.objectStore(AUTO_STEP_SNAPSHOT_STORE_NAME).clear()
    transaction.oncomplete = () => {
      database.close()
      resolve()
    }
    transaction.onerror = () => {
      database.close()
      reject(transaction.error ?? new Error('清除時間回溯紀錄失敗。'))
    }
    transaction.onabort = () => {
      database.close()
      reject(transaction.error ?? new Error('清除時間回溯紀錄已中斷。'))
    }
  })
}

type YearEndDiaryData = { title: string; sections: { label: string; text: string }[] }
type March28DiaryData = { title: string; text: string }
type MonthVisitChoice = { text: string; response: string[]; affection: number }
type MonthVisitRound = { scene?: string; prompt: string; choices: MonthVisitChoice[] }
type MonthFreeChatOpening = { text: string; response: string; affection: number }
type MonthVisitRoute = { label: string; subtitle: string; location: string; title: string; kicker: string; blocks: StoryBlock[]; rounds: MonthVisitRound[]; ending: StoryBlock[] }

const SAVE_SLOT_PREFIX = 'mayday-save-slot-'
const getSaveSlotIds = (): number[] => {
  const ids = new Set<number>()
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index)
    const match = key?.match(/^mayday-save-slot-(\d+)$/)
    if (!match) continue
    const slot = Number(match[1])
    if (Number.isSafeInteger(slot) && slot > 0) ids.add(slot)
  }
  return Array.from(ids).sort((left, right) => left - right)
}
const getNextSaveSlotId = (slots: Record<number, SaveSlotData | null>): number => {
  const occupied = new Set(Object.keys(slots).map(Number))
  let next = 1
  while (occupied.has(next)) next += 1
  return next
}
const storyStageLabels: Record<StoryStage, string> = {
  notification: '收到練團室邀約', messages: '回覆邀約', reply: '準備出發', walk: '前往練團室',
  studio: '練團室初訪', reunion: '意外重逢', 'reunion-chat': '久別重逢', nickname: 'Masa 的由來',
  rehearsal: '第一次聽他們練團', dinner: '練團後的晚餐', 'after-dinner': '晚餐後的談話',
  ending: '回家後', completed: '第一章完成', greetings: '晚間訊息', classroom: '課堂中的邀約',
  'masa-checkin': '關心瑪莎', 'stone-checkin': '關心石頭', 'ice-date': '下課吃冰', stroll: '傍晚散步',
  'day2-diary': '寫下第二篇日記', 'free-time': '自由活動', 'free-chat': '自由聊天',
  'day2-complete': '第二天結束', 'month-free-time': '一個月後・自由活動', 'month-visit': '一個月後・外出見面', 'month-visit-complete': '一個月後・見面結束', 'month-free-chat': '一個月後・自由對話', 'month-diary': '一個月後・私人日記',
  'next-month-intro': '又一個月後・校園開放日', 'next-month-invite-notification': '有人想約你', 'next-month-invite-picker': '看看是誰想約你', 'next-month-invite': '回覆邀約', 'next-month-invite-chat': '邀約簡訊', 'next-month-invite-date': '赴約', 'next-month-open-day': '椰風搖滾社・校園開放日', 'next-month-open-day-picker': '一起逛校園', 'next-month-open-day-visit': '校園散步', 'next-month-open-day-visit-complete': '校園開放日・見面結束', 'next-month-free-chat': '十二月・自由對話', 'next-month-diary': '十二月・私人日記',
  'year-end-intro': '十二月三十一日・跨年篇', 'year-end-invite-notification': '收到年貨邀約', 'year-end-invite-picker': '選擇邀約對象', 'year-end-shopping-notification': '年貨邀約簡訊', 'year-end-shopping-chat': '回覆年貨邀約', 'year-end-shopping': '一起買年貨', 'year-end-fireworks': '七人跨年煙火', 'year-end-new-year-notification': '收到新年祝福', 'year-end-new-year-chat': '回覆新年祝福', 'year-end-free-chat': '新年自由聊天', 'year-end-free-chat-picker': '新年自由活動', 'year-end-diary': '1996 年最後一篇日記', 'winter-exam-intro': '一九九七年・期末考前一週', 'winter-exam-notification': '統計學補習提示', 'winter-exam-chat': '傳訊息給溫尚翊', 'winter-exam-tutoring': '圖書館・統計學補習', 'winter-break-practice': '寒假・諺明哥的練團室', 'winter-break-gig': '寒假・酒吧駐唱', 'winter-break-pickup': '諺明哥來接你', 'winter-break-bus-choice': '散場後・選擇同行的人', 'winter-break-bus': '一起走到公車站', 'winter-diary': '一九九七年・寒假日記', 'february-intro': '二月初・MAYDAY 的名字', 'february-secret': '練團室裡的小秘密', 'february-dinner': '一起吃晚餐', 'february-table': '餐桌上的小動作', 'february-after-dinner-picker': '飯後・選擇同行的人', 'february-after-dinner': '飯後單獨相處', 'february-diary': '二月初・私人日記',
  'spring-term-intro': '開學後・春日邀約', 'spring-invite-picker': '看看誰約你去樂器行', 'spring-invite-notification': '收到樂器行邀約簡訊', 'spring-invite-chat': '回覆樂器行邀約', 'spring-store': '樂器行・一起逛逛', 'spring-rehearsal': '練團室・轧車', 'spring-after-picker': '練團結束・選擇去處', 'spring-lesson': '練團室・學樂器', 'spring-dinner': '和諺明一起吃飯', 'spring-sms-picker': '回家後・想傳訊息給誰', 'spring-sms-chat': '今晚的簡訊', 'spring-diary': '開學後・私人日記', 'march28-intro': '三月二十八日・野台開唱前一天', 'march28-visit': '白天・選擇一段相遇', 'march28-end': '晚飯後・公園散步', 'march28-park': '大安森林公園・遇見阿信', 'march28-park-stay': '大安森林公園・夜裡聊天', 'march28-morning': '三月二十九日・清晨早餐', 'march28-diary': '三月二十八日・私人日記', 'march29-show': '大安森林公園・野台開唱現場', 'april12-story': '四月十二日・練團室', 'april20-story': '四月二十日・佑達的訊息與練團室', 'april30-story': '四月三十日・少了一個人的練團室', 'may10-story': '五月十日・新鼓手面試', 'june-study': '六月中旬・期末複習', 'june-free-chat': '六月中旬・自由簡訊', 'june-diary': '六月中旬・私人日記', 'june-study-complete': '六月中旬・期末複習完成', 'july-lost-key': '七月・忘記帶鑰匙', 'august-story': '八月・便利店與炸雞店', 'august-diary': '八月・私人日記', 'september-intro': '九月・綠島旅行前', 'september-story': '九月・綠島三日旅行', 'september-diary': '九月・私人日記', paused: '故事暫停',
}

const DAY_START_STAGE_DATES: Partial<Record<StoryStage, string>> = {
  notification: '1996.10.15',
  classroom: '1996.10.16',
  'month-free-time': '1996.11.16',
  'next-month-intro': '1996.12.14',
  'year-end-intro': '1996.12.31',
  'year-end-new-year-notification': '1997.01.01',
  'winter-exam-intro': '1997.01.07',
  'winter-exam-tutoring': '1997.01.08',
  'winter-break-practice': '1997.01.22',
  'february-intro': '1997.02.03',
  'spring-term-intro': '1997.02.17',
  'march28-intro': '1997.03.28',
  'march28-morning': '1997.03.29',
  'april12-story': '1997.04.12',
  'april20-story': '1997.04.20',
  'april30-story': '1997.04.30',
  'may10-story': '1997.05.10',
  'june-study': '1997.06.15',
  'july-lost-key': '1997.07.15',
  'august-story': '1997.08.01',
  'september-intro': '1997.09.03',
  'september-story': '1997.09.03',
}

const isAtDayOpening = (stage: StoryStage, savedData?: Record<string, string>): boolean => {
  if (stage === 'september-story') {
    const raw = savedData ? savedData['mayday-september-story-progress-v1'] : localStorage.getItem('mayday-september-story-progress-v1')
    if (!raw) return true
    try {
      const saved = JSON.parse(raw) as { phase?: unknown } | null
      return Boolean(saved && ['trip-intro', 'train-picker', 'day-two-morning', 'return'].includes(String(saved.phase)))
    } catch { return false }
  }
  const progressChecks: Partial<Record<StoryStage, { key: string; phase?: string; emptyArray?: boolean; companionKey?: string }>> = {
    'april12-story': { key: 'mayday-april12-progress', phase: 'discussion' },
    'april20-story': { key: 'mayday-april20-progress', phase: 'notification' },
    'april30-story': { key: 'mayday-april30-progress-v2', phase: 'intro' },
    'may10-story': { key: 'mayday-may10-progress-v1', phase: 'intro' },
    'june-study': { key: 'mayday-june-study-progress-v1', phase: 'intro' },
    'july-lost-key': { key: 'mayday-july-lost-key-progress-v1', phase: 'intro' },
    'august-story': { key: 'mayday-august-story-progress-v1', phase: 'transition' },
    'winter-exam-tutoring': { key: 'mayday-winter-exam-replies', emptyArray: true },
    'winter-break-practice': { key: 'mayday-winter-practice-replies', emptyArray: true },
    'march28-morning': { key: 'mayday-march28-morning-replies', emptyArray: true, companionKey: 'mayday-march28-morning-character' },
  }
  const check = progressChecks[stage]
  if (!check) return true
  const raw = savedData ? savedData[check.key] : localStorage.getItem(check.key)
  const companion = check.companionKey
    ? (savedData ? savedData[check.companionKey] : localStorage.getItem(check.companionKey))
    : null
  if (companion) return false
  if (!raw) return true
  try {
    const saved = JSON.parse(raw) as { phase?: unknown } | unknown
    if (check.emptyArray) return Array.isArray(saved) && saved.length === 0
    return Boolean(saved && typeof saved === 'object' && (saved as { phase?: unknown }).phase === check.phase)
  } catch {
    return false
  }
}

const getDayStartDate = (stage: StoryStage, savedData?: Record<string, string>): string | null => {
  if (stage === 'september-story') {
    const raw = savedData ? savedData['mayday-september-story-progress-v1'] : localStorage.getItem('mayday-september-story-progress-v1')
    if (!raw) return '1997.09.03'
    try {
      const saved = JSON.parse(raw) as { phase?: unknown } | null
      if (saved?.phase === 'trip-intro') return '1997.09.03'
      if (saved?.phase === 'train-picker') return '1997.09.04'
      if (saved?.phase === 'day-two-morning') return '1997.09.05'
      if (saved?.phase === 'return') return '1997.09.06'
      return null
    } catch { return null }
  }
  return DAY_START_STAGE_DATES[stage] ?? null
}

const readSaveSlot = (slot: number): SaveSlotData | null => {
  try {
    const raw = localStorage.getItem(SAVE_SLOT_PREFIX + slot)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<SaveSlotData>
    if (parsed.version !== 1 || typeof parsed.savedAt !== 'string' || typeof parsed.gameDate !== 'string' || typeof parsed.gameTime !== 'string' || typeof parsed.stage !== 'string' || !Object.prototype.hasOwnProperty.call(storyStageLabels, parsed.stage) || !parsed.data || typeof parsed.data !== 'object' || Array.isArray(parsed.data)) return null
    const validated = parsed as SaveSlotData
    let migratedData: Record<string, string> | null = null
    const updateSavedValue = (key: string, value: string) => {
      if (!migratedData) migratedData = { ...validated.data }
      migratedData[key] = value
    }
    const savedChats = validated.data['mayday-chat-messages']
    if (savedChats) {
      try {
        const chats = JSON.parse(savedChats) as Partial<Record<CharacterId, SmsMessage[]>>
        const wenMessages = Array.isArray(chats.wen)
          ? migrateWenClassroomReplyCopy(removeDuplicateWenMovieInviteLine(chats.wen))
          : null
        const masaMessages = Array.isArray(chats.masa) ? removeDuplicateMasaErrandLine(chats.masa) : null
        if ((wenMessages && wenMessages !== chats.wen) || (masaMessages && masaMessages !== chats.masa)) {
          const migratedChats = {
            ...chats,
            ...(wenMessages ? { wen: wenMessages } : {}),
            ...(masaMessages ? { masa: masaMessages } : {}),
          }
          updateSavedValue('mayday-chat-messages', JSON.stringify(migratedChats))
        }
      } catch {
        // Keep the save slot unchanged if its message history cannot be parsed.
      }
    }
    const savedApril30Route = validated.data['mayday-april30-route'] as April30Route | undefined
    const validApril30Routes: April30Route[] = ['wen', 'ashin', 'masa', 'stone', 'yanming']
    if (validated.data['mayday-april30-day-complete'] === 'true'
      && savedApril30Route && validApril30Routes.includes(savedApril30Route)) {
      const rebuiltDiary = JSON.stringify(buildApril30DiaryData(savedApril30Route))
      if (validated.data['mayday-april30-diary-data'] !== rebuiltDiary) {
        updateSavedValue('mayday-april30-diary-data', rebuiltDiary)
        updateSavedValue('mayday-april30-diary-unlocked', 'true')
      }
    }
    if (migratedData) {
      const migrated: SaveSlotData = { ...validated, data: migratedData }
      localStorage.setItem(SAVE_SLOT_PREFIX + slot, JSON.stringify(migrated))
      return migrated
    }
    return validated
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
const MARCH28_DIARY_COPY_VERSION = '2026-11-26-v1'
const march28DiaryCopy: Record<March28CharacterId, {
  title: string
  afternoon: string
  closingThoughts: [string, string, string]
}> = {
  wen: {
    title: '那張海報我會好好收著。',
    afternoon: '今天去系辦本來只是想整理資料，結果莫名其妙變成溫尚翊的免費助手。那張海報明明剪得歪歪的，他還很有自信地拿來問我有沒有比較好，真的是誰給他的自信啦。後來我按著紙角，他拿尺靠過來量，捲起來的袖口就在我手背旁邊晃。明明只是在幫忙壓張紙，我卻突然很在意自己的手要放哪裡……拜託，我到底在緊張什麼。最後他還真的把一張海報留給我，叫我明天到了傳訊息。嘴上嫌他很煩，結果那張海報我還是好好收進袋子裡了。',
    closingThoughts: [
      '最後聊到明天，他問我會不會去，我答得倒是很快。明明只是去看演出，怎麼講得像跟他約好了似的。……本來就是期待啊，有什麼好心虛的。',
      '我故意說要看他們表現，溫尚翊最好真的不要太得意。雖然我還是會去啦，這個不用他提醒。',
      '我居然直接問他是不是希望我去。這句話現在想起來好像有點太直球了吧？算了，當時都問出口了，現在才害羞也太慢。',
    ],
  },
  ashin: {
    title: '書籤應該不會再弄丟吧。',
    afternoon: '今天去書店找老師指定的書，找得我差點想直接放棄。阿信居然就在旁邊，還先看到我。後來他陪我找書，連挑書籤都真的站在旁邊等我慢慢選。那本厚書差點從懷裡滑下來，他伸手托住書底，還笑得一臉很想吐槽的樣子。最可惡的是，走到門口他還記得提醒我不要把書籤弄丟。這種小事他怎麼也記得啦……我自己都不一定記得。',
    closingThoughts: [
      '阿信問我明天會不會去，我說想看他們表演。這不是廢話嗎？我都期待那麼久了。',
      '我故意說唱得好聽才去，明明心裡早就決定了。嘴硬這件事，好像也會傳染。',
      '我還叫他記得跟我打招呼。希望他真的會記得，不然我站在人群裡找不到他會很糗欸。',
    ],
  },
  stone: {
    title: '今天的茶舍好像特別忙。',
    afternoon: '今天去茶舍找石頭，結果他忙到根本像陀螺。客人一個接一個，他還是趁空檔過來幫我看菜單，推薦了一杯。後來旁邊客人差點碰倒杯子，他第一個反應是先扶住，放到我桌上還特地挪開課本，怕杯壁的水沾到紙。真的有夠細心。更好笑的是，他忙完還要回去看數學講義，寫兩行又擦掉兩行。白天上課、晚上打工還要寫作業，石頭到底哪來那麼多時間啊。',
    closingThoughts: [
      '石頭問明天會不會去，我答得很自然，現在倒是有點期待明天他會不會在人群裡看到我。',
      '我居然問他表演完有沒有空，想當面說恭喜是真的啦，但講出口的時候還是有點不好意思。',
      '我叫他先好好上班，不要光顧著跟我聊天。講完才想到，明明是我坐在那裡佔著他休息時間的人。',
    ],
  },
  masa: {
    title: '瑪莎當老師的樣子好好笑。',
    afternoon: '今天在樂器行看到瑪莎教小朋友彈鋼琴，真的有夠新鮮。他平常講話那麼欠，結果坐在琴邊居然一遍一遍示範，還敲著四拍讓小朋友跟上。最精彩的是，小朋友突然問「老師，這個姐姐是你的女朋友嗎？」瑪莎整個人卡住，琴譜跟鉛筆都停在半空中。哈哈哈哈哈，我當時真的快忍不住。後來小朋友走了，他一翻出數學講義又開始哀號，嗯，這才是我認識的瑪莎。',
    closingThoughts: [
      '我說明天換我看他被大家圍觀，瑪莎最好不要又嫌我吵。',
      '我居然像個家長一樣叫他早點回去寫作業，明明自己也沒有資格管他吧。',
      '我說明天要給他最大的掌聲，這句可不能只是嘴上說說。',
    ],
  },
  yanming: {
    title: '耳塞我會記得帶。',
    afternoon: '今天去練團室幫諺明哥整理明天要用的器材，才知道那些導線和小配件有夠多。諺明哥做事真的很有條理，連線都分好長短，標籤也是一條一條對。我貼好一條，他才把下一條遞過來，完全不會讓人手忙腳亂。試音的時候他還讓我站遠一點聽有沒有雜音，我其實很怕自己聽錯，結果他真的照著我說的地方再檢查一次。最後還把耳塞交給我，叫我明天記得帶。這種被人把小事也先想到的感覺，還滿好的。',
    closingThoughts: [
      '諺明哥提醒我明天帶耳塞，我真的要記得，不然站太近可能會被音箱震到。',
      '我提醒他別忙到忘記吃飯，結果他又反過來叮嚀我先吃點東西。好像大家都很愛提醒別人，自己卻不一定記得。',
      '我誇他周到，這句是真的。那些小地方都先幫大家想到，難怪事情交給他就很安心。',
    ],
  },
}

const buildMarch28DiaryData = (
  character: March28CharacterId,
  choice: 'skip' | 'return',
  replies: number[],
): March28DiaryData => {
  const copy = march28DiaryCopy[character]
  const finalReplyIndex = Number.isInteger(replies[4]) && replies[4] >= 0 && replies[4] <= 2 ? replies[4] : 0
  const eveningThought = choice === 'skip'
    ? '吃完晚飯本來有點想去大安森林公園晃晃，最後還是決定乖乖回房間整理明天要帶的東西。說好要早點睡，結果整理包包整理到一半，又開始想明天現場會是什麼樣子。明明只是去看演出，怎麼搞得像自己也要上台一樣緊張啦。希望明天不要下雨，拜託天氣好一點。'
    : '吃完晚飯還是沒忍住，跑去大安森林公園晃了一圈。結果真的遇到阿信，他一個人坐在樹下顧著明天要用的器材，旁邊堆著音箱和器材箱。明明看起來已經很累了，卻還是隔一會兒就抬頭看一下那些箱子。我才陪他說了幾句，他就開始催我回家，說明天也要來看演出，不用陪他在這裡吹風。嘴上答應得很乾脆，走回去時卻又有點捨不得。好啦，他說得也沒錯，明天還要早起。只是希望他今晚真的有休息一下。'
  return {
    title: choice === 'return' ? '本來只是想去公園晃一下。' : copy.title,
    text: [copy.afternoon, copy.closingThoughts[finalReplyIndex], eveningThought].join('\n\n'),
  }
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

const makeMonthChatRound = (
  incoming: string,
  first: ChatChoice,
  second: ChatChoice,
  third: ChatChoice,
): ChatRound => ({ incoming, choices: [first, second, third] })

// Every message reply round presents three distinct responses and affection outcomes (including neutral or negative choices).
// Author-only continuity note: in 1996, Masa (蔡昇晏) and Shitou (石錦航) are both university first-years after repeating a year in high school. The heroine is already a third-year student at NTU; Masa is one year younger than her. She does not yet know the details behind their delayed academic progress. Do not explain it in early narration or messages; let her ask Masa about it in the later check-in conversation.
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
    makeChatRound('剛剛在圖書館旁邊坐了一會兒，風一直把講義吹起來，還好最後沒有飛走。', '我看你一直用手壓著，差點想幫你拿。', '哈哈，謝謝妳，我那時候還怕紙真的被吹走。', '你是不是常常帶著講義到處跑？', '有時候要去拿資料，帶在身上比較方便。', '下次我幫你拿一半好了。', '不用啦，妳自己也有東西要拿。一起走就好。', 3),
    makeChatRound('今天聊到讀書的習慣，才發現每個人喜歡的地方真的不太一樣。', '對啊，我有時候也會看心情換位置。', '這樣很好啊，找到自己舒服的方式比較重要啦。', '你平常都喜歡坐哪裡？', '我滿喜歡靠窗的，偶爾可以看看外面。', '那下次我們可以一起找個靠窗的位置。', '好啊，如果剛好有空位，我幫妳留意。', 3),
    makeChatRound('妳下次如果再來實踐，我可以帶妳去看看今天沒走到的地方。', '好啊，我還想知道你平常都在哪裡上課。', '可以啊，順便介紹幾個我常去的地方喔。', '那你要記得，不可以又走到天黑才發現。', '哈哈，好，我會看時間，不讓妳等車太晚。', '我覺得今天這樣剛剛好，不用趕。', '我也覺得。慢慢走、慢慢聊，其實滿舒服的。', 3),
    makeChatRound('今天真的謝謝妳來。原本只是想帶妳看看校園，沒想到能聊這麼多。', '我也要謝謝你，今天很像多認識了你一點。', '聽妳這樣說，我很開心。', '下次換我帶你去台大走走。', '好啊，我也想看看妳平常上課的地方。', '那就說好了，不可以只是客氣喔。', '不會啦，我會期待的。到家了就好好休息。', 3),
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

const nextMonthOpenDayCallScripts: Record<RouteCharacterId, ChatRound[]> = {
  wen: [
    makeChatRound('喂，妳回去有沒有把手上的膠帶洗掉？我剛剛撕袖口那段時，還掉了一小截在地上。', '洗掉了啦，你才要檢查自己的袖子。', '我有看，應該沒有了。妳不要一直抓這件事。', '你剛剛還把紅豆餅藏起來，不給瑪莎吃。', '他手伸過來那麼快，我不藏起來等一下就沒了。', '那你有沒有留一口給我？', '有啦，妳不是已經吃了？', 3),
    makeChatRound('我把海報筒拿回去，裡面那張傳單還是皺的，怎麼壓都壓不平。', '那張就留著當今天的紀念啊。', '妳還真的要留喔？', '當然，這可是我們一起救回來的。', '哈哈，講得好像做了什麼大事。', '下次掛海報記得先找我，不然你又要踩椅子。', '妳先顧好自己不要被風刮走啦。', 3),
    makeChatRound('瑪莎剛剛還說，我今天出去買紅豆餅的時間比搬海報還久。', '他就是嫉妒你有休息時間。', '我哪有休息？我是在排隊。', '你還買了兩個，明明就是想偷懶。', '妳到底有沒有站在我這邊？', '我站在紅豆餅那邊。', '……妳真的很會講。', 2),
    makeChatRound('對了，剛剛小舞台那個吉他手，妳真的覺得第二段太趕喔？', '有一點啊，你不是也聽出來了？', '我只是覺得他可以再穩一點。', '你是不是又想去跟他講？', '沒有啦，人家在表演，我幹嘛跑去管。', '那你下次也彈一段給我聽。', '有機會啦，妳不要每次都考我。', 3),
    makeChatRound('好啦，我先去把今天的東西收好。妳回家就不要又把包包丟在門口。', '你怎麼連這個都記得？', '上次差點被我踢到，想忘也很難。', '知道啦，我會放好。你也早點休息。', '嗯，晚安啦。', '明天有空再找我。', '知道啦，妳先去睡。', 3),
  ],
  masa: [
    makeChatRound('妳剛剛是不是故意在我套圈圈失手的時候笑那麼大聲？', '我沒有故意，是你真的很好笑。', '妳這個人真的很過分欸。', '你不是說一定會中嗎？', '那個圈有風啦！', '下次換我玩，你站旁邊不准笑。', '好啊，我等著看妳出糗。', 3),
    makeChatRound('我回家才發現那枚皺眉徽章真的被我帶回來了。', '很適合你啊，幹嘛不戴？', '妳不要再說了，我已經被佑達笑過一次。', '你可以貼在冰箱上，每天提醒自己不要皺眉。', '我看妳比較需要貼一張，提醒自己少講兩句。', '那你幫我寫，我字很醜。', '想得美，自己寫。', 3),
    makeChatRound('剛剛那袋地瓜球我本來想留到晚上吃，結果回家就被我弟拿走一半。', '你怎麼不先藏起來？', '我哪知道他會翻我袋子！', '那你就跟他說是我的。', '妳又想把事情推給我喔？', '不然你下次再買一袋賠我。', '好啦，這次算我的。', 2),
    makeChatRound('我媽剛剛又問我，怎麼最近出門都會帶一堆奇怪的小東西回家。', '你就說那是戰利品啊。', '她問我是不是去參加園遊會。', '你不是本來就很像去園遊會的小學生？', '妳真的很會惹我欸。', '那你下次記得帶我去買貼紙。', '妳自己去挑啦，我才不要幫妳選。', 3),
    makeChatRound('好了啦，我要去把那堆東西收起來，不然明天又找不到。', '你先把徽章收好，不要又怪我。', '知道啦，這次我會放固定位置。', '晚安，蔡昇晏。', '晚安啦，妳也不要再笑我了。', '我盡量。', '最好是。', 2),
  ],
  ashin: [
    makeChatRound('妳把那張小花書籤夾進書裡了嗎？我剛剛突然想到，還滿想知道妳會不會真的用。', '有啊，夾在我最近在看的小說裡。', '那很好欸，翻開的時候就會看到。', '你是不是怕我把它收起來忘記？', '哈哈，有一點啦，送出去的東西還是希望妳會用。', '那我下次拿書給你檢查。', '好啊，不過不用特地為了這個帶來。', 3),
    makeChatRound('我剛剛把小熊吊飾的事情又想了一下，差一點真的就丟中了。', '你明明第一個沙包就丟太高。', '哈哈，妳怎麼記得那麼清楚？', '因為你當時的表情很好笑啊。', '那我下次要再試一次，不能一直停在差一點。', '好啊，我可以幫你看方向。', '那就說好了喔。', 3),
    makeChatRound('妳手上那時候沾到紅豆餡，我回家才想到，還好有先拿紙巾給妳。', '不然書籤就真的要黏到了。', '對啊，那張紙很容易沾到東西。', '你怎麼連這種小事都記得？', '因為剛好看到啊，而且妳那時候一直想把手擦乾淨。', '下次換我準備紙巾。', '好啊，那我就可以少帶一包了。', 3),
    makeChatRound('我媽剛剛問我，今天是不是又在外面待到很晚。', '你怎麼回答？', '我說是去學校幫忙，後來又陪朋友逛了一下。', '你有沒有說其實是去買紅豆餅？', '哈哈，這個就沒有講了。', '那下次買到好吃的要告訴我。', '好啊，我看到再跟妳說。', 2),
    makeChatRound('好啦，我先去把桌上的東西收一收，明天還有事情要忙。', '你不要又把書籤壓在東西下面。', '哈哈，我會放好。', '晚安，阿信。', '晚安喔，妳也早點休息。', '知道啦，掰掰。', '掰掰。', 3),
  ],
  stone: [
    makeChatRound('我剛剛把相機收起來，才想到今天替妳拍的那張還要等沖洗。', '你要記得喔，我會等照片的。', '我有記著，底片洗好就先留給妳。', '如果拍得很醜，你要負責重拍。', '哈哈，好，我接受這個要求。', '那我下次就不躲鏡頭了。', '好，這樣我就不用一直等妳轉過來。', 3),
    makeChatRound('我把底片送去沖印了，老闆說大概要幾天才能拿。', '那你拿到先看，不要把我拍得閉眼睛。', '我會先檢查一下。', '如果有拍到我在笑呢？', '那就留著啊，笑起來很好看。', '你講這種話很自然欸。', '只是把看到的說出來而已。', 3),
    makeChatRound('今天那張操場照片，我後來又想起妳說像有人剛離開。', '對啊，所以我一直覺得那張很有故事。', '我也喜歡那種沒有把事情說完的照片。', '你是不是常常會幫照片想故事？', '有時候會，看到一個畫面就會想像前面發生什麼。', '那下次你也幫我想一個。', '好啊，我可以慢慢想。', 3),
    makeChatRound('那張明信片我有多拿一張，想說妳如果要寫給朋友也可以用。', '你怎麼連這個都想到？', '剛好看到有兩張一樣的，就順手拿了。', '那我可以先欠著，等想到要寄給誰再寫嗎？', '當然可以，不用急。', '你真的很會替人留餘地。', '哈哈，這樣比較自在。', 3),
    makeChatRound('我先去把相機和底片袋收好，等照片洗出來再拿給妳。', '好，我等你消息。', '嗯，拿到我就跟妳說。', '你也早點休息。', '好，妳也是。晚安。', '晚安，石頭。', '晚安。', 3),
  ],
  yanming: [
    makeChatRound('我回到練團室才發現，那個轉接頭真的被我放在工具盒最下面。', '還好我有幫你找到，不然你可能要翻到晚上。', '是啊，少了那個試音就會比較麻煩。', '你下次要記得放在固定位置。', '我已經記在清單上了。', '那你要不要也記得謝謝我？', '哈哈，今天真的謝謝妳。', 3),
    makeChatRound('溫尚翊剛剛問我，那組導線是不是已經送回來了。', '他是不是又怕東西不見？', '有一點，他很在意器材有沒有收好。', '你們不是都很熟了嗎，還要這樣一條條確認？', '熟歸熟，東西還是要確認，這樣下次才不會找不到。', '好啦，諺明哥說得有道理。', '哈哈，妳不要講得像在開會。', 3),
    makeChatRound('瑪莎剛剛又把束線帶拿去綁他的水壺，說這樣比較不會掉。', '他真的很會亂用東西欸。', '我有叫他不要綁太緊，結果他還說很好用。', '你有沒有把他抓回來？', '沒有啦，讓他自己拆就好。', '那你下次要先把束線帶藏起來。', '這個方法可能比較有效。', 2),
    makeChatRound('明天有人要來練團室試音，我得早一點過去。', '那你今晚早點睡，不要又忙到很晚。', '好，我會把事情先準備好。', '要不要我幫你帶早餐？', '不用特地準備啦，妳有空再說。', '那我下次去再帶給你。', '好啊，謝謝妳。', 3),
    makeChatRound('我先去確認一下明天的時間和器材，免得早上臨時找不到。', '你去忙吧，我不吵你了。', '好，妳也早點休息。', '晚安，諺明哥。', '晚安，路上和回家都小心。', '知道啦。', '那就好。', 3),
  ],
}

const nextMonthLaterCallScripts: Record<RouteCharacterId, ChatRound[]> = {
  wen: [
    makeChatRound('喂，剛剛練團時我又找不到撥片，大家現在看到我翻袋子就開始笑。', '你是不是應該在袋子上貼一張大大的標籤？', '妳不要真的幫我貼喔。', '那你就自己記得放哪裡啊。', '我有在改了啦。', '下次我幫你檢查。', '不用啦，妳先顧好自己的東西。', 3),
    makeChatRound('瑪莎剛剛說我把吉他袋整理得像百寶箱。', '那不是很好嗎？什麼都有。', '問題是我要找的時候找不到。', '你可以問百寶箱本人啊。', '妳今天真的很愛講。', '因為你一直給我機會。', '……好啦，這句算妳贏。', 2),
    makeChatRound('我本來要去買晚餐，結果走到巷口才發現忘記帶錢包。', '你先回去拿啊，不要又想賒帳。', '我哪有常常賒帳？', '那你快點回去，不然店要關了。', '知道啦，我已經折回來了。', '記得幫我帶一份。', '妳想得美，先把店名傳來。', 3),
    makeChatRound('對了，妳上次說那家麵店還想去嗎？', '想啊，你不是說要帶我去？', '我有記得啦，等大家時間對上就約。', '不准又臨時被練團抓走。', '我會先看好時間啦。', '那我就等你通知。', '好，說好了。', 3),
    makeChatRound('好啦，我要去吃飯了，妳也不要只喝飲料。', '知道啦，你先去吃。', '嗯，晚點再聊。', '晚安先說一聲。', '還沒那麼早啦。', '那我等一下再跟妳說晚安。', '好啦，掰。', 2),
  ],
  masa: [
    makeChatRound('欸，我媽剛剛又叫我去買東西，清單長到我差點以為要搬家。', '你不是很會跑腿嗎？', '妳真的很想被我記仇欸。', '拍給我看，我幫你刪掉幾項。', '妳是要幫忙還是想看笑話？', '兩個都有。', '……算了，我傳給妳。', 3),
    makeChatRound('我剛剛在店裡拿錯袋子，走到門口才發現不是我的。', '你今天是怎樣，連袋子都會認錯？', '店員放太近了啦。', '你不要每次都怪別人。', '好啦，這次算我眼睛不好。', '你承認了喔？我要記下來。', '妳最好不要拿去到處講。', 3),
    makeChatRound('佑達剛剛打電話來，問我明天要不要一起吃飯，講了半天才說重點。', '你有沒有先打斷他？', '我有啊，他還叫我聽他講完。', '那你怎麼不直接掛掉？', '我怕他又打第二通。', '你們兩個真的很有耐心。', '才怪，我快被他煩死了。', 2),
    makeChatRound('我剛剛看到一家新開的冰店，想說下次可以去試試。', '你是想找人陪你吃吧？', '不然咧，一個人吃冰很無聊欸。', '那你要先請客。', '妳怎麼什麼都要先講條件？', '不然我怕你到時候裝傻。', '好啦，我請，這樣可以了吧。', 3),
    makeChatRound('好了啦，我先去忙，不然等一下又有人來叫我跑腿。', '你快逃啊！', '妳不要在旁邊出主意。', '晚安，蔡昇晏。', '晚安啦，妳也不要太晚睡。', '我才不會。', '最好是。', 2),
  ],
  ashin: [
    makeChatRound('我剛剛去買晚餐，老闆把隔壁桌的湯先放到我面前，我差點就喝下去了。', '你是不是看起來太餓了？', '可能喔，我剛剛真的有點餓。', '那你有沒有發現得很快？', '有啦，還好先看了一眼。', '下次先看清楚再喝。', '好，我會記得。', 3),
    makeChatRound('回家的時候我看到一隻小狗，牠一直追著自己的尾巴轉圈圈。', '牠有沒有追到？', '沒有欸，轉了幾圈就跑去找主人了。', '你是不是站在旁邊看很久？', '有一點啦，真的滿可愛的。', '下次看到要拍給我看。', '好啊，如果又遇到牠，我再拍給妳。', 3),
    makeChatRound('我回到家才發現，買的豆花忘在店裡了。', '你今天到底忘記多少東西啦！', '哈哈，真的有點糊塗。', '那你現在還要出門一次喔？', '對啊，走一趟就好。', '我幫你吃掉就不用回去拿了。', '妳倒是很會幫忙。', 2),
    makeChatRound('我媽剛剛問我，最近是不是常常在外面吃東西。', '你怎麼回答？', '我說偶爾啦，沒有每天。', '你有沒有說是因為跟朋友出去？', '有啊，她就問我下次什麼時候再約。', '那你要不要約我？', '好啊，有空再一起去。', 3),
    makeChatRound('好啦，我先去把明天要帶的東西整理好。', '去吧，不要又忘在桌上。', '哈哈，我會檢查一次。', '晚安，阿信。', '晚安喔，妳也早點休息。', '知道啦。', '那就好。', 3),
  ],
  stone: [
    makeChatRound('我剛剛整理照片，發現有一張底片拍得有點歪，但我還滿喜歡的。', '歪掉的照片有時候反而比較有味道。', '我也這麼覺得。', '那你要不要洗出來給我看？', '好啊，我挑幾張拍得比較有意思的。', '我想看你最喜歡的那一張。', '那我先留著，等洗好再給妳。', 3),
    makeChatRound('沖印店老闆說，這卷底片裡有幾張曝光不太一樣。', '那剛好可以看看不同效果。', '對啊，有幾張反而比我原本想的好看。', '有沒有哪張特別喜歡？', '有一張拍到路邊的樹影，我滿喜歡的。', '那你要把它放在哪裡？', '可能先放在相簿裡。', 3),
    makeChatRound('我今天回家路上看到一間小店，窗邊擺了好多盆栽。', '你有進去看嗎？', '有啊，裡面有幾盆小小的仙人掌。', '你是不是又站在窗外看很久？', '哈哈，有一點。', '買一盆放在練團室啊。', '這個主意不錯，我再看看。', 2),
    makeChatRound('下次經過那邊，妳要不要一起去看看？', '好啊，我想看你最後會不會真的買。', '哈哈，那就一起去。', '如果真的買了，你要負責照顧。', '好，我會記得澆水。', '那我會去檢查喔。', '好，交給妳監督。', 3),
    makeChatRound('我先去把相機收好，明天還要早起。', '你去吧，記得把底片袋放好。', '好，謝謝妳提醒。', '晚安，石頭。', '晚安，妳也早點休息。', '好。', '那就好。', 3),
  ],
  yanming: [
    makeChatRound('我今天把練團室門口那盞燈換好了，結果大家一直說變得太亮。', '太亮不好嗎？至少晚上不會看不到路。', '是啊，我也是這樣想。', '是不是瑪莎嫌的？', '妳猜對了，他第一個說太亮。', '那你怎麼回他？', '我說至少不用摸黑找鞋子。', 3),
    makeChatRound('瑪莎說那盞燈亮得像在審問人。', '哈哈哈哈，他是不是站在燈下面被照到？', '對，他還故意站在那邊演了一下。', '你有沒有被他逗笑？', '有啊，大家都笑了。', '那你下次換成暖一點的燈。', '這個建議可以考慮。', 3),
    makeChatRound('我剛剛去附近買便當，老闆多送了一份小菜。', '你有沒有留給自己吃？', '有留一點，其他的分給他們了。', '你是不是每次都把好吃的分給別人？', '沒有啦，我也有吃到。', '那下次記得留一份給我。', '好啊，妳來的話我幫妳留。', 2),
    makeChatRound('明天有人要來練團室試音，我得早一點過去。', '那你今晚早點睡，不要又忙到很晚。', '好，我會把事情先準備好。', '要不要我幫你帶早餐？', '不用特地準備啦，妳有空再說。', '那我下次去再帶給你。', '好啊，謝謝妳。', 3),
    makeChatRound('我先去確認一下明天的時間和器材，免得早上臨時找不到。', '你去忙吧，我不吵你了。', '好，妳也早點休息。', '晚安，諺明哥。', '晚安，路上和回家都小心。', '知道啦。', '那就好。', 3),
  ],
}

const thresholdCallScripts: Record<RouteCharacterId, ChatRound[]> = {
  // Wen uses the route-specific home/stroll call scripts below.
  wen: wenStrollCallScript,
  masa: [
    makeChatRound('欸，妳到家了沒？我剛剛才想到，今天在店裡那幾張照片妳有沒有看到最後一張？', '有啊，你那張閉著眼睛的最好笑。', '那張不算啦，是我媽拍太快。', '我看你根本是不想讓大家看到。', '誰小時候沒有幾張很蠢的照片？', '下次我也要帶照片去，換我笑你。', '妳敢帶來我就敢看，誰怕誰。', 3),
    makeChatRound('剛剛回家我媽還問，妳是不是又要跟我吵到忘記吃飯。', '阿姨很了解我們嘛。', '她說妳以前也是這樣，講到一半就忘記自己要幹嘛。', '你不要把自己講得很無辜。', '我哪有？我明明都記得。', '那你記不記得以前欠我的冰？', '……妳怎麼又想到這個啦。', 3),
    makeChatRound('我剛剛把今天的事情跟佑達講，他第一句就問我是不是又被妳欺負。', '你就說是啊，讓他同情你一下。', '妳還真的承認喔？', '不然呢，你今天明明一直拿我開玩笑。', '那叫久別重逢的正常交流。', '你這個說法我不接受。', '好啦，下次讓妳先講，我不插嘴。', 2),
    makeChatRound('對了，之前那家冰店不知道還在不在。我剛剛經過附近，突然想到。', '你不是說要帶我去嗎？', '我有說啊，妳不要一直催。', '我沒有催，我是在提醒你履行承諾。', '妳真的很會記這種事。', '那當然，吃的事情不能忘。', '好啦，有經過我再看一下。', 3),
    makeChatRound('好了，我先去洗澡，不然等一下又被我媽叫去做事。', '快去吧，今天你已經跑很多趟了。', '妳這句聽起來很像在趕我。', '我是在關心你，蔡昇晏。', '好啦，知道了。妳也早點休息。', '晚安，明天再找你算帳。', '蛤？又要算什麼啦！', 3),
  ],
  ashin: [
    makeChatRound('喂？是我，阿信。剛剛回家把今天聽到的歌又找出來放了一次馁。', '你真的一回家就開始聽喔？', '哈哈，因為剛剛聊到一半，我還有幾首想讓妳聽。', '那你先把歌名寫給我，我怕我記不住。', '好啊，我等一下整理好傳給妳。', '不准一次傳十首，我會選擇困難。', '那我先挑三首，這樣可以嗎？', 3),
    makeChatRound('我剛剛翻了一下唱片封套，發現裡面有一張小小的介紹卡，之前一直沒注意到。', '你是不是連包裝都會研究？', '有時候會啊，裡面偶爾會寫一些有趣的東西。', '那你下次拿給我看，我也想知道。', '好啊，我先收好，不會弄丟。', '你每次都把東西收得很仔細欸。', '哈哈，喜歡的東西就會想留著。', 3),
    makeChatRound('妳剛剛說那首歌的副歌很容易記，我後來又聽了一次，真的滿像會一直留在腦袋裡的。', '對吧！我剛剛回家路上還在哼。', '哈哈，那代表妳真的有記住。', '你是不是也在哼？', '有一點，剛剛差點在家裡唱出來。', '那下次我們一起唱啊。', '好啊，不過妳不要笑我唱錯啦。', 3),
    makeChatRound('我把剛剛想推薦的幾首歌寫在紙上了，怕打字的時候又漏掉。', '你這樣好像在交作業。', '哈哈，真的有一點。', '那我也要寫一張給你，交換歌單。', '好啊，我很期待妳會選什麼。', '如果你不喜歡不准嫌棄。', '怎麼會啦，妳喜歡的我都想聽聽看。', 3),
    makeChatRound('那我先不吵妳了。今天聊得很開心，改天再把剩下的歌慢慢介紹給妳。', '好啊，我等你下次推薦。', '那就說好了，妳也可以隨時傳歌給我。', '你不要只說改天，要記得喔。', '哈哈，好，我會記得。', '晚安，阿信。', '晚安喔，回去早點休息。', 3),
  ],
  stone: [
    makeChatRound('喂，妳回去以後有沒有把包包裡的東西整理好？我剛剛想到，今天椅子旁邊那幾條線差點勾到妳的袋子。', '有啊，還好你那時候先提醒我。', '那就好，我後來又把那一段重新收了一下。', '你是不是每次離開前都要檢查好幾遍？', '差不多，器材多，少一樣就會很麻煩。', '那下次我去可以幫你一起檢查。', '好啊，不過妳不用把自己當工作人員。', 3),
    makeChatRound('我剛剛整理器材時，看到那張椅子還放在原來的位置，突然想到妳坐在那裡聽歌的樣子。', '你記得這麼清楚喔？', '嗯，因為那個位置剛好不會擋到大家走動。', '我還以為你只是隨便找一張給我。', '沒有啦，當時有看過旁邊的線，才讓妳坐那裡。', '那我下次還要坐同一張。', '可以啊，我幫妳留意。', 3),
    makeChatRound('剛剛有一段副歌，我回去又想了一下，覺得如果鼓再收一點，整體會更乾淨。', '你們練團真的會一直想這些細節欸。', '會啊，有時候差一點點，聽起來就不一樣。', '我坐旁邊其實有聽出來那段比較不一樣。', '真的嗎？那妳耳朵滿敏銳的。', '下次我再去聽，你要告訴我有沒有改好。', '好啊，到時候再讓妳聽一次。', 3),
    makeChatRound('瑪莎剛剛把一條導線繞成一團，還說這樣收比較快。', '哈哈哈，他是不是被你念了？', '有啊，我叫他重收一次。', '他一定在旁邊碎碎念。', '妳猜對了，他還說我很像器材管理員。', '那我下次幫你一起念他。', '哈哈，不用啦，他自己知道怎麼收。', 2),
    makeChatRound('那我先去把剩下的器材放好。妳今天也走了一段路，回去記得休息。', '好，你也不要忙到太晚。', '我會把事情弄完再回去。', '下次見面的時候再跟我說那段歌有沒有改好。', '好，我記著。', '晚安，石頭。', '晚安，妳也早點睡。', 3),
  ],
  yanming: [
    makeChatRound('喂，妳回去以後有沒有想到今天那個轉接頭？我後來把它放回工具盒固定的位置了。', '有啊，還好最後有找到，不然你們試音會很麻煩。', '是啊，器材少一個就會卡住。', '你是不是每次都要把清單核對完才肯走？', '差不多，這樣下次才不會臨時找不到。', '那下次我去可以幫你看清單。', '好啊，有人一起確認會更快。', 3),
    makeChatRound('我把今天用過的導線重新整理了一次，發現有一條外皮有點磨損，明天要拿去換。', '你連這種小地方都會注意到。', '這個不能忽略，繼續用可能會有雜音。', '你們平常真的很忙欸。', '習慣了，東西整理好，後面就比較順。', '那你記得不要什麼都自己做。', '我知道，大家有空也會一起幫忙。', 3),
    makeChatRound('剛剛溫尚翊問我，今天送來的那袋轉接頭有沒有收好。', '他是不是怕又有人把東西放錯地方？', '哈哈，他比較怕明天要用的時候找不到。', '那你有沒有跟他說我也有幫忙？', '有啊，我有說妳眼睛很利，一下就找到。', '那他有沒有稱讚我？', '他說下次要記得把東西放回原位。', 2),
    makeChatRound('瑪莎今天把束線帶拿去綁水壺，說這樣比較不會掉。', '他真的很會亂用東西欸。', '我有叫他拆掉，束線帶還要留著收器材。', '他有乖乖拆嗎？', '沒有，還說他會自己負責。', '那你下次把束線帶藏起來。', '這個方法我可以考慮。', 3),
    makeChatRound('我先去把明天要用的清單整理好。今天謝謝妳幫忙，讓我少翻了好幾個袋子。', '不客氣啦，你下次不要再把轉接頭藏那麼深。', '哈哈，好，我會放在固定的位置。', '晚安，諺明哥。', '晚安，妳也早點休息。', '好，掰掰。', '掰掰。', 3),
  ],
}

const freeChatCallOpeners: Record<RouteCharacterId, ChatRound> = {
  wen: makeChatRound('喂，剛剛跟妳聊完，我才想到還有件事想問妳。', '你怎麼不在訊息裡問？', '有些話用電話講比較快啦。', '你又想到什麼了？', '沒什麼大事，就是突然想到。', '你是不是還有話沒跟我說？', '妳很會猜欸……等一下再慢慢講。', 2),
  masa: makeChatRound('欸，剛剛聊完我才發現，有些話打字真的講不清楚。', '那你現在可以講清楚啊。', '妳很急欸，我又沒有要跑掉。', '你最好不要又講一半就不說了。', '我哪有，妳不要先把我想得那麼差。', '好啦，我現在有空，慢慢講。', '這還差不多。', 2),
  ashin: makeChatRound('喂，是我阿信。剛剛聊到那家小店，我又想到一件事想問妳馁。', '你是不是還有什麼東西忘記買？', '哈哈，這次沒有啦。是想問妳下次要不要一起去看看。', '你先說是哪一家，我再決定。', '好啊，我把地址記下來給妳。', '那你不要到時候自己先跑去喔。', '不會啦，我等妳有空再一起去。', 3),
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
  makeChatRound('妳到家了嗎？我剛剛回去才發現，今天在巷口買的那包餅乾還塞在外套口袋裡馁。', '你不怕它被壓碎喔？', '有一點，還好袋子夠厚。', '你怎麼現在才發現？', '我回家脫外套才摸到，差點忘了。', '那你有沒有留一點給我？', '有啦，下次見面帶給妳。', 3),
  makeChatRound('剛剛我媽問我，怎麼最近回家都會先找冰箱。', '你是不是又把吃的藏在裡面？', '沒有啦，是她買了水果，叫我記得吃。', '你有乖乖吃嗎？', '有啊，還切了一盤放桌上。', '那我下次去你家是不是有水果可以吃？', '哈哈，有啊，妳來就幫妳留。', 3),
  makeChatRound('我今天路過一間小店，門口擺的盆栽很可愛。', '你也會注意這種東西喔？', '會啊，放在窗邊看起來很舒服。', '你想買一盆回家嗎？', '有想過，但怕自己忘記澆水。', '那你要不要買仙人掌？', '這個好像比較適合我。', 2),
  makeChatRound('對了，妳上次說想找時間去書店慢慢逛，最近有空嗎？', '有啊，不過你不要又站在門口等我選半天。', '哈哈，我會提醒妳時間啦。', '你明明也會在書架前面看很久。', '被妳發現了喔？有時候真的會忘記時間。', '那下次我們比賽誰先挑好。', '好啊，輸的人請喝飲料。', 3),
  makeChatRound('那我先去把桌上那疊講義收起來，不然明天又找不到。', '你是不是每次都把東西堆在一起？', '有一點啦，等要用的時候才發現。', '那你快去收，不要又拖到睡覺前。', '好，我先去整理一下。', '晚點再聊，記得把餅乾留著。', '知道啦，會留給妳的。', 3),
]

const freeTimeChats: Record<RouteCharacterId, ChatRound[]> = {
  // Wen has separate afternoon-route scripts above; this entry is only a safe fallback.
  wen: wenHomeFreeTimeChats,
  masa: [
    makeChatRound('妳今天有沒有好好上課？昨天吃飯的時候大家一直把話題繞到以前，我都還沒問妳最近過得怎麼樣。', '還不錯啊，就是最近課業有點忙。', '大學生聽起來也沒有比較輕鬆嘛。', '你不是也要顧學校跟練團？先管好自己吧。', '我有在管啦，妳不要一開口就唸我。', '你是想知道我這幾年過得怎麼樣嗎？', '不然咧？都隔這麼久才又碰到，總要問一下吧。', 3),
    makeChatRound('昨天吃飯的時候，大家一直問我們小時候的事。妳有沒有覺得很尷尬？', '還好啊，反而覺得滿好笑的。', '我就知道妳不會介意，妳以前臉皮就很厚。', '有一點啦，突然被大家問，我都不知道怎麼回答。', '那我下次先幫妳擋一下，免得他們又一直問。', '你自己明明也講得很起勁，還敢說要幫我擋？', '我那是在幫大家補充好不好，妳不要亂講。', 3),
    makeChatRound('今天跟石頭翹課被老師抓到，還被留下來念了一下，現在想想還是滿倒楣的。', '誰叫你們要翹課，被抓到也不意外吧。', '妳現在是站在老師那邊喔？', '至少老師沒有真的把你們怎麼樣吧？', '就念了幾句而已啦，沒事了。', '你下次還敢不敢？我看你根本學不乖。', '妳很煩欸，這種事哪有下次啦。', -1),
    makeChatRound('對了，昨天重新見到妳，我本來有好多話想問，結果一下子就被大家打斷了。', '那你現在可以問啊，我又沒有不讓你問。', '好啊，那我就不客氣了。', '你先想好要問什麼，不要又問一半忘記。', '我哪有那麼誇張，妳才是想到什麼就講什麼。', '你是不是其實也有點緊張？', '……有一點啦。很久沒見了，突然不知道怎麼開口也正常吧。', 3),
    makeChatRound('有空再找時間聊吧。這次不要又隔那麼久，連妳最近喜歡什麼都不知道。', '好啊，那你要記得主動找我。', '知道啦，我會傳訊息給妳。', '你也可以跟我說說你最近在忙什麼。', '好啊，等我把學校跟練團的事弄完再慢慢講。', '那下次見面你請客，我們把昨天沒聊完的補回來。', '妳真的很會安排欸……好啦，找一天再說。', 3),
  ],
  ashin: ashinAfternoonFreeTimeChats,
  stone: [
    makeChatRound('妳下午還特地傳訊息問我，謝謝妳。今天被老師留下來念了幾句，沒有什麼大事。', '沒事就好，我只是有點擔心你們。', '謝謝妳，真的不用擔心啦。', '你跟瑪莎下次還是小心一點，不要再被抓了。', '哈哈，我會記得的。今天確實是我們不對。', '你們兩個被留下來，應該等很久吧？', '還好啦，主要是聽老師講了幾句，後來就回去了。', 3),
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
    subtitle: '師大附近・送便當給他',
    location: '師大附近的補習班',
    title: '午休時間的便當',
    kicker: '中午・師大附近',
    blocks: [
      { kind: 'narration', text: '午餐時間快到了，你提著便當來到師大附近，照著石頭之前提過的地址，找到他兼職當助教的補習班。巷口的機車一台接一台經過，騎樓下有學生拿著塑膠袋匆匆走過，也有人靠著牆翻講義，空氣裡混著便當店飄來的飯菜香。' },
      { kind: 'narration', text: '你站在門邊等了一會兒，教室裡的下課鐘聲響起，學生陸續抱著課本走出來。石頭留在最後，手裡拿著剛收好的作業和紅筆，正低頭確認有沒有漏掉的講義。看見你時，他明顯愣了一下，隨即把手上的東西交給櫃檯，快步走近。' },
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
        scene: '他把講義和紅筆整齊放到桌邊，先替你拉開靠牆、比較不會被人來人往撞到的椅子，等你坐好才把便當放平。休息時間不長，他卻沒有急著拆開筷子，而是先看了看你的神情，確認你一路過來沒有被太陽曬得不舒服。',
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
      { kind: 'narration', text: '他陪你走到門口，還替你把便當袋的提把整理好，提醒你外面車多要看路。你走出騎樓時回頭看了一眼，他已經拿起講義準備回去幫忙下一堂課，卻還是特地停下來朝你點了點頭。' }
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
    { text: '我到家啦～你剛剛那瓶水有喝完嗎？', response: '有啦，早就喝完了。妳買的那瓶很冰，剛好。', affection: 1 },
    { text: '欸我回家才想到，你最後那球真的滿帥的。', response: '現在才講喔？我剛剛在旁邊等妳誇獎，結果妳都沒說。', affection: 3 },
    { text: '我今天是不是有點像球場啦啦隊哈哈哈。', response: '妳哪有啦，坐在旁邊一直偷笑而已。', affection: 2 },
  ],
  ashin: [
    { text: '我到家了～今天走到腳有點酸，不過滿好玩的。', response: '哈哈，今天真的走了不少路。妳先坐著休息一下啦，腳還會酸嗎？', affection: 1 },
    { text: '我回家還在想今天走的那條小路，感覺傍晚去那邊很舒服欸。', response: '我也滿喜歡那條路的。今天跟妳一起走，邊走邊聊，感覺一下就到校門口了。', affection: 2 },
    { text: '你今天在校門口是不是有一句話沒講完？我有記得喔。', response: '妳真的有注意到喔……本來想跟妳說今天很開心，結果走到校門口反而有點不好意思。', affection: 3 },
  ],
  masa: [
    { text: '我媽剛剛又把相簿拿出來了啦！！！', response: '蛤？又來？妳快叫阿姨把那本收起來啦。', affection: 2 },
    { text: '我爸剛剛問你下次什麼時候要來，笑死。', response: '欸，叔叔也太直接了吧。妳不要現在就幫我排時間喔。', affection: 3 },
    { text: '我到家了，水果有乖乖放冰箱，沒有偷吃完。', response: '最好是沒有偷吃。那袋本來就有一半是要給妳的。', affection: 1 },
  ],
  stone: [
    { text: '我到家啦，便當盒我洗好了，沒有弄丟你的筷子！', response: '哈哈，妳還特地報告這個。今天謝謝妳，真的吃得很飽。', affection: 2 },
    { text: '你今天是不是差點來不及上課？我一直記得你看時間那個表情。', response: '差一點點而已，還好最後有趕上。妳回去路上順利嗎？', affection: 1 },
    { text: '下次想吃什麼先跟我說，我可以再帶去找你。', response: '那我可不可以先點菜？不然每次都讓妳準備也不好意思。', affection: 3 },
  ],
  yanming: [
    { text: '我回家才發現手上還有一點灰，剛剛洗了兩次才掉。', response: '哈哈，今天真的整理得很認真。那些器材平常不太容易注意到灰塵。', affection: 1 },
    { text: '我有記住你教我的收線方法！下次可以考我。', response: '好啊，那下次就看看妳有沒有真的記住。', affection: 2 },
    { text: '今天那杯水有喝完嗎？我走之前好像看到你還放在桌上。', response: '有，後來忙完就喝掉了。謝謝妳還記得。', affection: 3 },
  ],
}

const monthFreeChatScripts: Record<RouteCharacterId, ChatRound[]> = {
  wen: [
    makeMonthChatRound('妳到家了喔？我剛剛洗完澡才看到訊息。今天那瓶水真的有救到我。',
      { text: '那你下次記得自己帶水啦。', response: ['知道啦，妳不要一直唸。', '不過今天真的剛好，謝謝妳。'], affection: 1, nextIncoming: '欸，剛剛隊友還問我，今天來送水的是誰。' },
      { text: '我還怕你打到忘記喝水欸。', response: ['哪有那麼誇張啦。', '……好啦，是真的有點渴。'], affection: 2, nextIncoming: '我剛剛被隊友問了一個問題，差點不知道怎麼回。' },
      { text: '其實我是想看你打球，送水只是藉口。', response: ['……妳現在講這個，我會不知道怎麼接欸。', '下次想看就直接說啦。'], affection: 3, nextIncoming: '對了，隊友剛才還問我妳是誰。' }),
    makeMonthChatRound('欸，剛剛隊友還問我，今天來送水的是誰。',
      { text: '那你怎麼介紹我的？', response: ['就說是我大學同學啊。', '不然妳還想要什麼介紹？'], affection: 2, nextIncoming: '他還問我妳下次會不會再來，我說要看妳有沒有空。' },
      { text: '你是不是有說我很漂亮？', response: ['蛤？我哪有講這個啦。', '妳不要自己幫我加台詞。'], affection: 3, nextIncoming: '不過他們真的有問妳下次會不會來。' },
      { text: '你就說我是來監督你有沒有偷懶的啊。', response: ['哈哈，這個介紹很適合妳。', '妳真的很愛管欸。'], affection: 1, nextIncoming: '他們還說妳坐在旁邊看得很認真。' }),
    makeMonthChatRound('他還問我妳下次會不會再來，我說要看妳有沒有空。',
      { text: '你可以直接跟我說啊，我有空就去。', response: ['好啊，有球賽我先跟妳講。', '不過妳不用每次都特地買水啦。'], affection: 3, nextIncoming: '我剛剛想到，妳坐在旁邊是不是有點無聊？' },
      { text: '那你要先練好一點，不然我會笑你。', response: ['妳要求很多欸。', '好啦，下次不讓妳抓到我失誤。'], affection: 2, nextIncoming: '說真的，妳今天坐那麼久有沒有覺得無聊？' },
      { text: '我才不要去，太陽超大，我差點曬昏。', response: ['哈哈哈，妳不是坐樹蔭下面嗎？', '下次我找個有遮雨棚的地方。'], affection: 0, nextIncoming: '不過今天妳坐在旁邊看那麼久，真的不無聊喔？' }),
    makeMonthChatRound('我剛剛想了一下，妳坐在旁邊看那麼久，真的不無聊喔？',
      { text: '不會啊，我有看到你最後那球，超帥的。', response: ['……妳突然這樣講喔。', '好啦，這句我收下。'], affection: 3, nextIncoming: '妳這樣講，我下次是不是要打得更好一點？' },
      { text: '有一點，所以你要請我吃冰補償。', response: ['妳剛剛不是已經吃了？', '怎麼還有第二次收費啦。'], affection: 1, nextIncoming: '妳是不是每次出門都會先想好要吃什麼？' },
      { text: '我有在看啦，只是中間有偷看旁邊的人。', response: ['旁邊有什麼好看的？', '……算了，妳不要講了。'], affection: 2, nextIncoming: '我等一下還要去練一下吉他，今天有一段卡住了。' }),
    makeMonthChatRound('我等一下還要去練一下吉他，今天有一段卡住了。',
      { text: '那你快去練，練完再跟我說有沒有成功。', response: ['好啦，妳還要驗收喔。', '我練完再傳給妳。'], affection: 2 },
      { text: '不要練太晚啦，明天手會酸。', response: ['知道啦，我又不是第一次練。', '妳也不要滑手機滑到半夜。'], affection: 1 },
      { text: '如果練不好就打電話跟我抱怨，我可以聽。', response: ['妳很閒喔？', '……好啦，真的卡住再找妳。'], affection: 3 }),
  ],
  ashin: [
    makeMonthChatRound('我回家才發現講義被風吹皺了，剛剛一路拿著都沒注意到。',
      { text: '哈哈哈我有看到，你一路都用手壓著。', response: ['妳有看到喔？我還以為妳沒注意到。', '那張紙差點就飛走了，還好有拿好。'], affection: 2, nextIncoming: '我剛剛整理講義，才發現背面還有幾句沒寫完的歌詞。' },
      { text: '下次我幫你拿一半，就不會飛走了。', response: ['好啊，那我下次就不客氣囉。', '不過妳自己的東西也不少，還是我拿一點好了。'], affection: 3, nextIncoming: '我剛剛整理講義，才發現背面還有幾句沒寫完的歌詞。' },
      { text: '你是不是又帶太多東西出門？', response: ['可能有一點啦，出門前總覺得每樣都用得到。', '結果背包就越塞越滿。'], affection: 1, nextIncoming: '我剛剛整理講義，才發現背面還有幾句沒寫完的歌詞。' }),
    makeMonthChatRound('我剛剛整理講義，才發現背面還有幾句沒寫完的歌詞。',
      { text: '真的假的！你寫了什麼？', response: ['還沒寫完啦，就幾句突然想到的。', '我怕等一下忘記，就先寫在講義背面了。'], affection: 3, nextIncoming: '對了，妳有沒有聽我前幾天推薦妳的歌？' },
      { text: '你上課也會偷寫歌詞喔？', response: ['有時候旋律突然跑出來，就會先記一下。', '不然一下課真的會忘記。'], affection: 2, nextIncoming: '對了，妳有沒有聽我前幾天推薦妳的歌？' },
      { text: '那你要不要也看看我上課的筆記，保證比你的整齊。', response: ['好啊，我想看欸。', '不過妳不要只拿最整齊的那一頁給我看喔。'], affection: 1, nextIncoming: '對了，妳有沒有聽我前幾天推薦妳的歌？' }),
    makeMonthChatRound('對了，妳有沒有聽我前幾天推薦妳的歌？',
      { text: '有啊，我還重播了其中一首。', response: ['真的喔？妳喜歡哪一首？', '我本來還有點怕妳不喜歡，妳這樣說我就放心了。'], affection: 3, nextIncoming: '欸，妳聽歌的時候會先注意旋律，還是歌詞？' },
      { text: '還沒啦，我一回家就先找東西吃了。', response: ['哈哈，沒關係啦，先吃東西比較重要。', '妳有空再聽就好，不用趕。'], affection: 1, nextIncoming: '欸，妳聽歌的時候會先注意旋律，還是歌詞？' },
      { text: '有聽，可是我覺得你推薦的那首比較好聽。', response: ['真的嗎？妳這樣講我會有點開心欸。', '下次我再找幾首給妳，妳也幫我挑挑看。'], affection: 2, nextIncoming: '欸，妳聽歌的時候會先注意旋律，還是歌詞？' }),
    makeMonthChatRound('欸，妳聽歌的時候會先注意旋律，還是歌詞？',
      { text: '旋律吧，喜歡了才會去看歌詞。', response: ['我也是欸，常常先被旋律吸引。', '後來才會想知道它在唱什麼。'], affection: 2, nextIncoming: '我有時候也會因為一句歌詞，突然很喜歡一首歌。' },
      { text: '歌詞！我會一直想他到底在寫什麼。', response: ['妳聽得滿仔細的欸。', '那妳有沒有哪一句歌詞一直記到現在？'], affection: 3, nextIncoming: '我有時候也會因為一句歌詞，突然很喜歡一首歌。' },
      { text: '看心情，有時候只想聽，不想動腦。', response: ['哈哈，我也會啊。', '有時候只是想放著聽，休息一下就好。'], affection: 1, nextIncoming: '我有時候也會因為一句歌詞，突然很喜歡一首歌。' }),
    makeMonthChatRound('我有時候也會因為一句歌詞，突然很喜歡一首歌。',
      { text: '那你有沒有哪句很喜歡的？', response: ['有欸，不過現在突然要我講，我反而想不起來了。', '等我想到再寫給妳看，好不好？'], affection: 3 },
      { text: '你是不是又想寫歌了？', response: ['有時候會啦，聽到喜歡的句子就會想記下來。', '不過現在還沒有整理好。'], affection: 2 },
      { text: '那我們下次交換歌詞！', response: ['好啊，妳先挑一句給我。', '我也找一句我喜歡的給妳。'], affection: 1 }),
  ],
  masa: [
    makeMonthChatRound('妳媽最後真的把那本相簿收起來了嗎？我回家以後還在想那幾張照片。',
      { text: '沒有，她說下次還要拿別本出來。', response: ['……阿姨到底有幾本啦。', '妳先幫我確認一下，有沒有更可怕的。'], affection: 2, nextIncoming: '我剛剛想到一件事，妳小時候那張戴大蝴蝶結的照片還在嗎？' },
      { text: '哈哈哈你是不是很怕被我看到以前的照片？', response: ['誰不怕啊！而且妳笑得最大聲。', '妳自己那幾張也沒有好到哪裡去。'], affection: 3, nextIncoming: '欸，說到照片，妳小時候那張戴大蝴蝶結的還在不在？' },
      { text: '我覺得你小時候滿可愛的啊。', response: ['妳不要突然講這種話，很奇怪欸。', '……反正那張不准再拿出來。'], affection: 1, nextIncoming: '對了，妳小時候那張戴大蝴蝶結的照片還在嗎？' }),
    makeMonthChatRound('我剛剛想到一件事，妳小時候那張戴大蝴蝶結的照片還在嗎？',
      { text: '在啊！我還可以翻出來給你看。', response: ['不要！我沒有要看！', '妳真的很想害我是不是。'], affection: 2, nextIncoming: '好啦不講照片了。今天那個滷肉飯我回家還在想。' },
      { text: '你先把你小時候那張拿來交換。', response: ['妳很會談條件欸。', '好啦，這樣算公平。'], affection: 3, nextIncoming: '不然我們交換照片好了。今天那個滷肉飯也滿好吃的。' },
      { text: '不告訴你，這是我的秘密。', response: ['拜託，妳小時候的照片我又不是沒看過。', '還秘密咧。'], affection: 1, nextIncoming: '算了，照片先放過妳。今天那個滷肉飯真的不錯。' }),
    makeMonthChatRound('好啦不講照片了。今天那個滷肉飯我回家還在想。',
      { text: '你不是吃了兩碗嗎？還想喔？', response: ['那家真的不錯啊，兩碗怎麼了。', '妳不要一直記我吃幾碗。'], affection: 2, nextIncoming: '我剛剛路過巷口，突然想到以前我們常去買冰的那家。' },
      { text: '下次再帶你去吃別的，我知道一家更好吃的。', response: ['真的假的？先說好，不好吃妳要負責。', '我可是很挑的喔。'], affection: 3, nextIncoming: '說到吃的，我剛剛想到以前巷口那家冰店。' },
      { text: '你真的很容易被食物收買欸。', response: ['有好吃的東西為什麼不行？', '妳才是吧，今天一直在問還有沒有甜點。'], affection: 1, nextIncoming: '妳還記得以前巷口那家冰店嗎？' }),
    makeMonthChatRound('我剛剛路過巷口，突然想到以前我們常去買冰的那家。',
      { text: '記得啊，你每次都說要請客，最後都叫我選最便宜的。', response: ['欸，那是因為妳每次都挑最大碗的！', '我哪有那麼小氣。'], affection: 2, nextIncoming: '不然改天真的去看看？不知道還在不在。' },
      { text: '我記得你都挑巧克力，吃到最後嘴巴黑黑的。', response: ['哈哈哈哈妳還記得這個喔。', '那妳每次都吃草莓，還不是一樣。'], affection: 3, nextIncoming: '突然有點想去看看那家店還在不在。' },
      { text: '不記得了啦，我只記得你很吵。', response: ['妳這個人真的很會破壞氣氛欸。', '算了，妳不記得我幫妳補充。'], affection: 0, nextIncoming: '算了，改天真的帶妳去看看，妳就會想起來了。' }),
    makeMonthChatRound('不然改天真的去看看？不知道那家店還在不在。',
      { text: '好啊！我想吃以前那個口味。', response: ['那就說好了。', '不過妳到時候不要又選半天。'], affection: 3 },
      { text: '可以，但這次你要請客。', response: ['妳怎麼還記得這件事啦。', '好啦，我請，這樣可以了吧。'], affection: 2 },
      { text: '看你表現，我再考慮。', response: ['妳現在很難約欸。', '……好啦，我再努力一下。'], affection: 1 }),
  ],
  stone: [
    makeMonthChatRound('妳到家了嗎？我剛剛才想到，今天便當袋好像還有一個小湯匙在裡面。',
      { text: '有啦，我拿出來洗好了。', response: ['那就好，我還怕妳回家才發現。', '今天真的謝謝妳，吃得很飽。'], affection: 1, nextIncoming: '我今天下午上課時，還想到妳說便當是早上就準備好的。' },
      { text: '你是不是又把東西忘在我這裡了？', response: ['哈哈，可能真的有一點。', '下次我自己檢查清楚。'], affection: 2, nextIncoming: '我剛剛整理書包，還想到今天那個便當。' },
      { text: '那你下次要自己來拿，不能再麻煩我。', response: ['好啊，這樣也可以。', '下次換我請妳吃飯。'], affection: 3, nextIncoming: '說起來，今天那個便當真的很好吃。' }),
    makeMonthChatRound('我今天下午上課時，還想到妳說便當是早上就準備好的。',
      { text: '對啊，我怕中午來不及，所以很早就弄好了。', response: ['難怪還是溫溫的，妳真的準備得很仔細。', '不過下次不用那麼趕，時間來得及就好。'], affection: 2, nextIncoming: '妳平常也會這麼早起來準備東西嗎？' },
      { text: '你有吃完就好，我最怕你忙到忘記吃。', response: ['有吃完，真的。', '今天有妳提醒，我就沒有拖到太晚。'], affection: 3, nextIncoming: '妳是不是常常怕別人忘記吃飯？' },
      { text: '我本來想多帶一點，可是怕你吃不完。', response: ['哈哈，妳帶的份量剛剛好。', '再多一點我可能真的會吃不完。'], affection: 1, nextIncoming: '對了，妳今天回去以後有沒有也好好吃晚餐？' }),
    makeMonthChatRound('妳平常也會這麼早起來準備東西嗎？',
      { text: '看心情啦，有時候鬧鐘響了我還會賴床。', response: ['哈哈，這樣比較像平常的妳。', '不過今天真的辛苦了。'], affection: 2, nextIncoming: '我今天有一堂課差點遲到，還好最後趕上了。' },
      { text: '為了送給你，當然要早起啊。', response: ['……妳這樣說，我會有點不好意思。', '謝謝妳，我真的有放在心上。'], affection: 3, nextIncoming: '我今天上課差點遲到，想到妳早上還特地準備便當，就覺得自己有點慚愧。' },
      { text: '才沒有，我是剛好睡不著。', response: ['原來是這樣。', '那希望妳今晚可以睡好一點。'], affection: 1, nextIncoming: '今天有一堂課差點遲到，還好最後趕上了。' }),
    makeMonthChatRound('我今天有一堂課差點遲到，還好最後趕上了。',
      { text: '你下次要早一點出門啦！', response: ['知道了，今天真的有點大意。', '下次我會把時間抓好。'], affection: 1, nextIncoming: '我後來想想，還好今天有趕上，不然就糗了。' },
      { text: '你不是平常都很準時嗎？今天怎麼了？', response: ['出門前找不到筆記，耽誤了一下。', '最後一路走得很快。'], affection: 2, nextIncoming: '我後來才發現是筆記本放錯袋子，難怪找不到。' },
      { text: '是不是因為在想我送的便當？', response: ['哈哈，妳真的很會猜。', '有一點點啦。'], affection: 3, nextIncoming: '我後來找到筆記本了，才發現它一直在另一個袋子裡。' }),
    makeMonthChatRound('我後來找到筆記本了，才發現它一直在另一個袋子裡。',
      { text: '哈哈哈哈，還好不是掉在路上。', response: ['真的，不然今天就麻煩了。', '妳不要笑我啦。'], affection: 2 },
      { text: '你下次把東西固定放同一個地方啦。', response: ['好，我會記得。', '妳講得對，這樣比較不會忘。'], affection: 1 },
      { text: '下次我幫你在筆記本上貼名字。', response: ['哈哈，這樣好像小學生。', '不過也許真的有用。'], affection: 3 }),
  ],
  yanming: [
    makeMonthChatRound('妳回去有沒有洗手？今天那些器材放久了，摸起來多少會有點灰。',
      { text: '有啦，我回家第一件事就是去洗手。', response: ['那就好，今天辛苦妳了。', '第一次整理就做得很仔細。'], affection: 1, nextIncoming: '我剛剛又檢查了一次今天收好的線，妳那幾條都沒問題。' },
      { text: '有啊，不然我現在可能還是一手灰。', response: ['哈哈，今天真的像在打掃。', '不過整理完看起來舒服很多。'], affection: 2, nextIncoming: '我剛才重新看了一遍今天整理的器材，妳收的那幾條線都很整齊。' },
      { text: '沒有欸，我現在要去洗，謝謝你提醒。', response: ['好，記得洗乾淨。', '今天碰過的器材比較多，還是注意一下。'], affection: 3, nextIncoming: '對了，我剛剛又檢查了一遍，妳收的線都沒有問題。' }),
    makeMonthChatRound('我剛剛又檢查了一次今天收好的線，妳那幾條都沒問題。',
      { text: '真的嗎！我還怕自己繞得很醜。', response: ['沒有，收得很整齊。', '看得出來妳有照著剛才教的方法做。'], affection: 3, nextIncoming: '下次如果妳還想學，我可以再教妳怎麼分不同長度的線。' },
      { text: '那我是不是可以畢業了？', response: ['哈哈，還早啦。', '不過今天算是過關。'], affection: 2, nextIncoming: '妳下次還想學什麼？不同長度的線可以用不同方式整理。' },
      { text: '你也太認真了吧，還特地檢查。', response: ['習慣了，器材要常用，還是得確認。', '不過今天有妳幫忙，省了不少時間。'], affection: 1, nextIncoming: '今天有人來問預約，我差點把時間記錯，還好有再核對。' }),
    makeMonthChatRound('下次如果妳還想學，我可以再教妳怎麼分不同長度的線。',
      { text: '好啊，我想學！', response: ['好，那下次有空再慢慢教妳。', '不用急，一次學一點就好。'], affection: 3, nextIncoming: '我今天還差點把一組預約時間記錯，幸好最後有核對。' },
      { text: '先不要，我怕我下次又把線弄成一團。', response: ['哈哈，今天不是做得很好嗎？', '不用怕，慢慢來就好。'], affection: 2, nextIncoming: '今天我還差點把預約時間記錯，幸好最後又看了一遍。' },
      { text: '那你要先準備飲料，我才肯來。', response: ['這個很簡單，練團室有水。', '妳還會先談條件喔。'], affection: 1, nextIncoming: '今天有個預約時間差點排錯，幸好我最後又核對一次。' }),
    makeMonthChatRound('今天有人來問預約，我差點把時間記錯，還好有再核對。',
      { text: '還好你有檢查，不然大家都要白跑一趟。', response: ['對啊，所以這種事情不能只靠記憶。', '寫下來還是比較保險。'], affection: 2, nextIncoming: '妳平常會把要做的事情寫在紙上嗎？' },
      { text: '你也會有出錯的時候喔，哈哈。', response: ['當然會，我又不是機器。', '只是盡量不要讓小錯變成大麻煩。'], affection: 3, nextIncoming: '我現在都習慣把事情寫下來，妳呢？' },
      { text: '我可能早就記錯了，哈哈哈。', response: ['所以才要寫下來啊。', '妳可以先從比較重要的事情開始記。'], affection: 1, nextIncoming: '說到記東西，妳平常會不會也常常忘東忘西？' }),
    makeMonthChatRound('我現在都習慣把事情寫下來，妳呢？',
      { text: '我會寫在課本旁邊，然後忘記自己寫過。', response: ['哈哈，那妳可能需要一本固定的筆記本。', '不過找到適合自己的方式最重要。'], affection: 2 },
      { text: '我都靠記憶，結果常常忘記。', response: ['那就試著先寫下明天最重要的兩三件事。', '不用寫很多，簡單就好。'], affection: 1 },
      { text: '我會寫在紙條上，貼得到處都是。', response: ['這樣也算有提醒到自己。', '只要最後找得到紙條就好。'], affection: 3 }),
  ],
}

const monthPreviousFreeChatOpeners: Record<RouteCharacterId, MonthFreeChatOpening[]> = {
  wen: [
    { text: '我今天差點把筆記本忘在教室，走到樓下才想起來，真的很誇張。你今天在忙什麼？', response: '妳怎麼連筆記本都可以忘記啦。 我下午在練團室，剛好有一段一直彈不順。', affection: 2 },
    { text: '我剛剛買飲料排隊排超久，差點不想等了。你今天有出去嗎？', response: '有啊，早上去學校一下，下午就待在練團室。妳最後有買到喔？', affection: 1 },
    { text: '欸我今天看到一家新開的冰店，感覺你會喜歡。', response: '妳怎麼知道我喜歡？有空再去看看啊。', affection: 3 },
  ],
  ashin: [
    { text: '我今天上課差點睡著，老師突然叫我，我整個嚇醒哈哈。你今天呢？', response: '哈哈，妳也太累了吧。還好老師有叫妳，不然妳可能真的會一路睡到下課欸。我下午去唱片行晃了一下，剛回家沒多久。', affection: 2 },
    { text: '我剛剛整理書桌，翻到一張不知道什麼時候買的票根。', response: '妳還記得是哪一天的嗎？我有時候也會這樣，東西收著收著就忘記放在哪裡了。', affection: 1 },
    { text: '我今天聽到一首歌，副歌一直卡在腦袋裡，救命。', response: '哈哈，是不是做別的事也會一直哼那一段？我剛剛也在聽歌，差點跟著唱出來。', affection: 3 },
  ],
  masa: [
    { text: '我今天本來想早點回家，結果在路上看到冰店又停下來了。', response: '哈哈，妳真的很容易被吃的吸引欸。我今天也差不多，下課後跑去買東西。', affection: 2 },
    { text: '我今天被報告追著跑，差點以為自己要住在圖書館。', response: '妳也太誇張了吧。我今天在學校也被事情拖住，回家還要幫忙跑腿。', affection: 1 },
    { text: '欸，我剛剛想到小時候那家冰店，不知道還在不在。', response: '妳突然講這個，我也想到以前那家。改天真的去看看啊。', affection: 3 },
  ],
  stone: [
    { text: '我今天把講義塞進包包，回家才發現有一張是上禮拜的，哈哈。', response: '至少沒有把重要的那張弄丟。 我今天上課前也找了半天筆記。', affection: 2 },
    { text: '我今天走到一半才發現忘記帶傘，還好最後沒下雨。', response: '還好天氣幫忙了。我今天下午也在外面跑了一下，差點忘記時間。', affection: 1 },
    { text: '你今天忙嗎？我剛剛終於把報告的資料找齊了。', response: '有一點，不過事情都處理好了。妳找資料找很久嗎？', affection: 3 },
  ],
  yanming: [
    { text: '我今天整理書桌整理到一半就放棄了，東西怎麼會越整理越多。', response: '哈哈，可能是妳把每樣東西都拿出來看了一遍。我今天也整理了練團室。', affection: 2 },
    { text: '我剛剛路過一家店，突然想到上次你說的那個東西。', response: '是嗎？妳還記得啊。我今天大部分時間都在練團室，處理一些預約的事情。', affection: 1 },
    { text: '今天有點累，想找人講幾句廢話，你現在忙嗎？', response: '現在剛好有空。妳說吧，今天遇到什麼事了？', affection: 3 },
  ],
}

const monthAwayFreeChatScripts: Record<RouteCharacterId, ChatRound[]> = {
  wen: [
    makeMonthChatRound('我下午去練團室，本來只想待一下，結果被叫去搬音箱。吉他手還要兼差搬運欸。',
      { text: '哈哈哈你不是吉他手嗎，怎麼還要搬音箱？', response: ['吉他手也是有手的好不好。', '而且又不是只有我一個人搬。'], affection: 2, nextIncoming: '搬完以後瑪莎還在旁邊說我動作太慢，妳說他是不是很欠揍。' },
      { text: '你現在手還好嗎？音箱很重吧。', response: ['還好啦，沒有那麼誇張。', '妳不要把我當老人家。'], affection: 3, nextIncoming: '不過搬完以後瑪莎還在旁邊笑我動作慢。' },
      { text: '活該，誰叫你不早點回家。', response: ['妳很會講欸。', '我是在幫忙，不是在偷懶。'], affection: 0, nextIncoming: '今天瑪莎真的很煩，一直在旁邊講風涼話。' }),
    makeMonthChatRound('搬完以後瑪莎還在旁邊說我動作太慢，妳說他是不是很欠揍。',
      { text: '他可能只是想找你吵架啦。', response: ['他每天都想找人吵架。', '我都懷疑他是不是太閒。'], affection: 2, nextIncoming: '我本來想回他，結果找不到我的撥片，整個人更煩。' },
      { text: '你就不要理他，越理他越開心。', response: ['我知道啊，可是有時候真的忍不住。', '他那張臉很欠揍欸。'], affection: 1, nextIncoming: '結果我後來還找不到撥片，真的很煩。' },
      { text: '你們兩個半斤八兩吧。', response: ['蛤？妳站哪邊的啦。', '我明明比較有道理。'], affection: 3, nextIncoming: '我剛剛還找不到撥片，妳不要再補刀了。' }),
    makeMonthChatRound('結果我後來還找不到撥片，真的很煩。',
      { text: '是不是又塞在吉他袋裡了？', response: ['我找過了啦。', '等一下，我再找一次。'], affection: 2, nextIncoming: '找到了，在外面那個小袋子，真的很丟臉。' },
      { text: '你先不要急，慢慢找啦。', response: ['知道啦，我沒有急。', '……好啦，有一點。'], affection: 3, nextIncoming: '找到了啦，就在吉他袋最外面那格。' },
      { text: '哈哈哈哈你連撥片都會弄丟。', response: ['妳笑夠了沒。', '我下次要把它綁在手上。'], affection: 1, nextIncoming: '找到了，就在最外面那個小袋子，我真的白找十分鐘。' }),
    makeMonthChatRound('找到了啦，就在吉他袋最外面那格。我真的白找十幾分鐘。',
      { text: '哈哈哈你自己也太粗心了吧。', response: ['我今天可能腦袋不太清楚。', '妳不要再笑了啦。'], affection: 1, nextIncoming: '我等一下還要練一下剛剛那段，今天一直卡住。' },
      { text: '至少找到了，不然你明天又要怪瑪莎。', response: ['我本來就想怪他啊。', '好啦，這次是我自己的問題。'], affection: 2, nextIncoming: '等一下還要把剛剛那段再練一次，不然我會一直惦記。' },
      { text: '下次我幫你在袋子上貼一張「撥片在這裡」。', response: ['妳是把我當小朋友喔？', '……不過好像真的有用。'], affection: 3, nextIncoming: '我等一下再練一下那段，今天怎麼彈都不太順。' }),
    makeMonthChatRound('我等一下再練一下那段，今天怎麼彈都不太順。',
      { text: '加油啦，練完記得回去休息。', response: ['知道啦。', '妳也早點睡，不要明天上課打瞌睡。'], affection: 2 },
      { text: '你要不要錄一小段給我聽？', response: ['現在喔？我還沒練好欸。', '等順一點再傳給妳。'], affection: 3 },
      { text: '彈不好就不要睡覺了，哈哈哈。', response: ['妳很壞欸。', '好啦，我先去練，不跟妳講了。'], affection: 0 }),
  ],
  ashin: [
    makeMonthChatRound('欸，我今天買了一張唱片，剛剛放來聽，裡面有一首歌我覺得妳可能會喜歡。',
      { text: '是哪一首？快跟我說！', response: ['我把歌名寫給妳，妳有空再找來聽就好。', '我有點想知道妳會不會喜歡。'], affection: 3, nextIncoming: '我剛剛聽到副歌那裡，又忍不住倒回去一次。' },
      { text: '你自己很喜歡這首嗎？', response: ['嗯，滿喜歡的。尤其副歌那邊，聽起來很舒服。', '我剛剛不小心又重播了好幾次。'], affection: 2, nextIncoming: '我剛剛聽到副歌那裡，又忍不住倒回去一次。' },
      { text: '你是不是每次買唱片回家都要馬上聽？', response: ['差不多啦，買回來就會很想先放來聽看看。', '不然一直放在旁邊，我會一直想它到底好不好聽。'], affection: 1, nextIncoming: '我剛剛聽到副歌那裡，又忍不住倒回去一次。' }),
    makeMonthChatRound('我剛剛聽到副歌那裡，又忍不住倒回去一次。',
      { text: '有那麼好聽喔？我現在有點好奇了。', response: ['哈哈，可能是我自己很喜歡啦。', '妳聽了再笑我也可以。'], affection: 2, nextIncoming: '欸，妳平常聽歌會先注意旋律，還是歌詞？' },
      { text: '你也會一直重播同一段喔？', response: ['會啊，有時候就是很喜歡那一小段，會想再聽一次。', '妳也會這樣嗎？'], affection: 3, nextIncoming: '欸，妳平常聽歌會先注意旋律，還是歌詞？' },
      { text: '你是不是偷偷想把這首歌推薦給我？', response: ['有一點啦。剛剛聽到的時候就想到妳，想說妳可能也會喜歡。'], affection: 1, nextIncoming: '欸，妳平常聽歌會先注意旋律，還是歌詞？' }),
    makeMonthChatRound('欸，妳平常聽歌會先注意旋律，還是歌詞？',
      { text: '旋律吧，喜歡了才會一直聽。', response: ['我也是欸，常常先被旋律吸引，後來才會去看歌詞。'], affection: 2, nextIncoming: '我有時候也會因為一句歌詞，突然很喜歡一首歌。' },
      { text: '歌詞！我會一直想他到底在寫什麼。', response: ['妳會很認真聽喔。', '那妳會不會把喜歡的句子記下來？'], affection: 3, nextIncoming: '我有時候也會因為一句歌詞，突然很喜歡一首歌。' },
      { text: '看心情，有時候只想聽，不想動腦。', response: ['哈哈，我也會啊。', '有時候就只是想放著聽，休息一下就好。'], affection: 1, nextIncoming: '我有時候也會因為一句歌詞，突然很喜歡一首歌。' }),
    makeMonthChatRound('我有時候也會因為一句歌詞，突然很喜歡一首歌。',
      { text: '那你有沒有哪一句一直記到現在？', response: ['有欸，不過現在突然要我講，我反而想不起來了。', '等我想到再寫給妳看，好不好？'], affection: 3, nextIncoming: '不然我們交換歌好了，妳推薦一首給我，我也找一首給妳。' },
      { text: '你以前也會抄歌詞嗎？', response: ['會啊，喜歡的句子就先抄下來。', '不然過幾天真的會忘記。'], affection: 2, nextIncoming: '不然我們交換歌好了，妳推薦一首給我，我也找一首給妳。' },
      { text: '我比較容易先注意旋律。', response: ['那也很好啊，先喜歡上旋律，再慢慢聽歌詞。', '我有時候也是這樣。'], affection: 1, nextIncoming: '不然我們交換歌好了，妳推薦一首給我，我也找一首給妳。' }),
    makeMonthChatRound('不然我們交換歌好了，妳推薦一首給我，我也找一首給妳。',
      { text: '好啊！我等一下就想一首傳給你。', response: ['好啊，我等妳。', '有空再傳給我就好馁，我不急。'], affection: 3 },
      { text: '你先推薦，我怕我選不出來。', response: ['好，那我先找一首給妳。', '妳聽聽看，喜不喜歡再跟我說喔。'], affection: 2 },
      { text: '你要是嫌我品味不好怎麼辦？', response: ['怎麼會啦，我只是想知道妳喜歡聽什麼。', '妳喜歡的歌，我也想聽聽看。'], affection: 1 }),
  ],
  masa: [
    makeMonthChatRound('我今天下課後被我媽叫去買東西，原本以為只有一樣，結果她講了一長串。',
      { text: '哈哈哈你是不是又忘記買其中一樣？', response: ['沒有好嗎，我都有買。', '只是回家才發現多買了一包餅乾。'], affection: 2, nextIncoming: '結果我回家還被問怎麼多買了餅乾。' },
      { text: '你媽是不是很會使喚你？', response: ['妳現在才知道喔？', '我在家就是跑腿的。'], affection: 1, nextIncoming: '我回家以後還被問怎麼多買了一包餅乾。' },
      { text: '那包餅乾分我，我就不笑你。', response: ['妳很會趁火打劫欸。', '下次再說啦。'], affection: 3, nextIncoming: '我回家才發現多買了一包餅乾，還被唸了一下。' }),
    makeMonthChatRound('結果我回家還被問怎麼多買了一包餅乾。',
      { text: '因為你自己也想吃吧，承認啦。', response: ['……好啦，是有一點。', '但那包真的很好吃。'], affection: 3, nextIncoming: '說到吃的，妳今天晚餐吃什麼？' },
      { text: '你就說是幫我買的啊。', response: ['妳想得美。', '而且妳又不在我家。'], affection: 1, nextIncoming: '妳晚餐吃了沒？我現在有點餓。' },
      { text: '下次買東西記得先拍清單，不然又買錯。', response: ['我有記啦，是我自己多拿的。', '不要把我講得那麼不可靠。'], affection: 2, nextIncoming: '欸，妳今天晚餐吃什麼？我有點不知道要吃什麼。' }),
    makeMonthChatRound('妳今天晚餐吃什麼？我現在有點不知道要吃什麼。',
      { text: '我吃了麵，還加了一顆蛋。', response: ['這樣不錯啊，至少有吃飽。', '我可能去買滷味。'], affection: 1, nextIncoming: '我剛剛看到巷口那家冰店，突然想到以前。' },
      { text: '你不是很會吃嗎，還需要我幫你想？', response: ['我只是選擇困難，不行喔？', '妳快推薦一個啦。'], affection: 2, nextIncoming: '我剛剛經過以前那家冰店，突然想到我們小時候。' },
      { text: '吃冰啊！我今天也想吃。', response: ['現在喔？妳真的很會挑時間。', '不過我也有點想吃。'], affection: 3, nextIncoming: '剛剛經過巷口那家冰店，突然想到以前。' }),
    makeMonthChatRound('我剛剛經過以前那家冰店，突然想到我們小時候。',
      { text: '你以前每次都搶最後一口！', response: ['妳還不是每次都說吃不完，結果又跟我搶。', '不要只記得對妳有利的部分。'], affection: 3, nextIncoming: '改天要不要真的去看看？不知道現在還有沒有開。' },
      { text: '我記得老闆都會多給我們一支小湯匙。', response: ['對欸！那個老闆好像一直都記得我們。', '突然好想去。'], affection: 2, nextIncoming: '不知道那家店現在還在不在，改天去看看？' },
      { text: '我不記得了啦，你講得好像昨天才發生。', response: ['因為妳真的很容易忘記小事。', '我幫妳記著不行喔。'], affection: 1, nextIncoming: '那改天我帶妳去，妳看到店就會想起來了。' }),
    makeMonthChatRound('改天要不要真的去看看？不知道現在還有沒有開。',
      { text: '好啊！我要吃以前那個口味。', response: ['好，這次我先去確認有沒有開。', '妳不要到時候又改主意。'], affection: 3 },
      { text: '可以，但這次你請客。', response: ['又來了，妳怎麼什麼都記得。', '好啦，我請。'], affection: 2 },
      { text: '看你表現囉。', response: ['妳很難搞欸。', '……算了，我還是會約妳。'], affection: 1 }),
  ],
  stone: [
    makeMonthChatRound('我今天上課前才發現筆記少帶了一本，還好同學有借我看。',
      { text: '你也會忘記帶東西喔？', response: ['會啊，我又不是每天都很有條理。', '只是今天剛好被自己嚇到。'], affection: 2, nextIncoming: '後來我把筆記補完，發現有一題還是看不太懂。' },
      { text: '還好有人借你，不然就麻煩了。', response: ['對啊，真的幫了我一個忙。', '下次出門前要再確認一次。'], affection: 1, nextIncoming: '我後來把筆記補完，還有一題想了好久。' },
      { text: '你是不是昨天整理書包整理到一半就睡著？', response: ['哈哈，沒有啦。', '只是昨天有點晚，可能漏看了。'], affection: 3, nextIncoming: '我後來補筆記時，有一題想了很久。' }),
    makeMonthChatRound('後來我把筆記補完，發現有一題還是看不太懂。',
      { text: '你把題目傳給我，我們一起想。', response: ['好啊，不過我先自己再看一次。', '真的卡住再麻煩妳。'], affection: 3, nextIncoming: '我剛剛重新看了一遍，好像找到問題在哪裡了。' },
      { text: '是不是老師上課講太快了？', response: ['有一點，今天後面幾題真的很快。', '我有抄下來，應該還能補起來。'], affection: 2, nextIncoming: '我後來又把那一題看了一次，差不多懂了。' },
      { text: '哈哈你也有不會的時候喔。', response: ['當然有啊。', '不然我就不用上課了。'], affection: 1, nextIncoming: '我剛剛又看了一次那題，總算比較懂了。' }),
    makeMonthChatRound('我剛剛重新看了一遍，好像找到問題在哪裡了。',
      { text: '你看吧，慢慢來就會懂。', response: ['嗯，剛剛只是太急了。', '謝謝妳陪我一起想。'], affection: 2, nextIncoming: '對了，妳今天上課有沒有遇到什麼好笑的事？' },
      { text: '那你是不是要請我喝飲料，慶祝解題成功？', response: ['哈哈，可以啊。', '這個理由很充分。'], affection: 3, nextIncoming: '說起來，妳今天上課有沒有發生什麼有趣的事？' },
      { text: '早知道我就直接把答案告訴你了。', response: ['妳先不要太有自信。', '不過我真的有比較清楚了。'], affection: 1, nextIncoming: '妳今天上課還順利嗎？有沒有什麼有趣的事？' }),
    makeMonthChatRound('對了，妳今天上課有沒有遇到什麼好笑的事？',
      { text: '老師講到一半粉筆斷掉，全班都笑了。', response: ['哈哈，老師自己有沒有笑？', '有時候這種小事反而會記很久。'], affection: 2, nextIncoming: '妳是不是也常常因為這種小事笑很久？' },
      { text: '沒有欸，我差點睡著，還好沒被點名。', response: ['哈哈，幸好。', '下次如果真的很累，晚上就早點休息。'], affection: 1, nextIncoming: '那妳今天是不是很累？有沒有早點回家？' },
      { text: '我今天其實滿開心的，沒什麼特別原因。', response: ['這樣很好啊。', '有時候沒有原因的開心最舒服。'], affection: 3, nextIncoming: '那妳今天心情不錯喔？有沒有什麼想分享的？' }),
    makeMonthChatRound('妳是不是也常常因為這種小事笑很久？',
      { text: '會啊，我笑點超低的。', response: ['看得出來。', '不過這樣也滿好的，身邊的人會跟著開心。'], affection: 3 },
      { text: '看人欸，如果是瑪莎我可以笑一整天。', response: ['哈哈，他真的很會講話。', '有時候連我都不知道怎麼接。'], affection: 2 },
      { text: '不會，我通常只在心裡笑。', response: ['那妳忍得很辛苦欸。', '下次可以笑出來沒關係。'], affection: 1 }),
  ],
  yanming: [
    makeMonthChatRound('今天練團室預約排得滿滿的，有一組還提早半小時來，我差點來不及準備。',
      { text: '那你今天根本沒什麼時間休息吧。', response: ['還好，中間有空檔可以喝口水。', '習慣了，時間排好就不會太亂。'], affection: 2, nextIncoming: '不過今天有個新來的人把導線放錯位置，我找了好一會兒。' },
      { text: '哈哈哈你是不是又一個人忙全部？', response: ['沒有啦，大家有空都會幫忙。', '只是最後還是要確認一次。'], affection: 3, nextIncoming: '今天有個新來的人把導線放錯，我找了好一會兒。' },
      { text: '你要不要下次把時間排鬆一點？', response: ['有時候很難，大家能來的時間都不太一樣。', '不過我會留意，不會排得太緊。'], affection: 1, nextIncoming: '今天有一組把導線放錯位置，我找了好一會兒才找到。' }),
    makeMonthChatRound('今天有個新來的人把導線放錯位置，我找了好一會兒。',
      { text: '最後有找到嗎？', response: ['有，後來發現放到另一個箱子裡了。', '只是多花了一點時間。'], affection: 2, nextIncoming: '我後來順手把整個架子重新整理了一次。' },
      { text: '你是不是一看到東西不在原位就會很在意？', response: ['哈哈，有一點。', '東西固定放好，大家要用的時候比較方便。'], affection: 3, nextIncoming: '我後來乾脆把整個架子重新整理了一遍。' },
      { text: '那你有沒有先懷疑是瑪莎弄的？', response: ['沒有啦，他今天沒有碰那個箱子。', '不過妳怎麼第一個想到他？'], affection: 1, nextIncoming: '我後來把架子重新整理了一次，才發現有些東西也該換位置。' }),
    makeMonthChatRound('我後來順手把整個架子重新整理了一次。',
      { text: '你是不是整理起來就停不下來？', response: ['有時候是，看到不整齊就會想順手弄好。', '不過也不能一直做，還有其他事情要忙。'], affection: 2, nextIncoming: '忙完以後我泡了杯茶，總算坐下來一下。' },
      { text: '那你有沒有趁機休息一下？', response: ['有，後來泡了杯茶。', '坐下來才發現已經過了好一段時間。'], affection: 3, nextIncoming: '我後來泡了杯茶，坐下來才發現已經很晚了。' },
      { text: '我可能整理五分鐘就放棄了。', response: ['哈哈，每個人習慣不一樣。', '妳可以先從一小塊地方開始。'], affection: 1, nextIncoming: '我後來泡了杯茶，終於有時間坐著休息。' }),
    makeMonthChatRound('忙完以後我泡了杯茶，總算坐下來一下。',
      { text: '你平常都喝什麼茶？', response: ['看時間，晚上會喝淡一點的。', '不然有時候會睡不著。'], affection: 2, nextIncoming: '妳平常忙完會怎麼放鬆？' },
      { text: '感覺你很需要一張舒服的椅子。', response: ['哈哈，椅子倒是有。', '只是常常坐下來又有人敲門。'], affection: 3, nextIncoming: '妳忙完一天通常都怎麼放鬆？' },
      { text: '你是不是連休息都很有規劃？', response: ['沒有那麼誇張啦。', '只是事情做完，才比較能安心休息。'], affection: 1, nextIncoming: '妳平常都怎麼讓自己放鬆一下？' }),
    makeMonthChatRound('妳平常忙完會怎麼放鬆？',
      { text: '洗完澡躺著聽歌，最好不要有人叫我。', response: ['哈哈，這聽起來很舒服。', '那妳今晚就好好放空一下。'], affection: 2 },
      { text: '找朋友聊天啊，像現在這樣。', response: ['那我很榮幸。', '有空就聊，不用客氣。'], affection: 3 },
      { text: '吃東西！心情不好先吃再說。', response: ['哈哈，這個方法很直接。', '不過也記得吃點有營養的。'], affection: 1 }),
  ],
}

const monthPastChatDiary: Record<RouteCharacterId, string> = {
  wen: '晚上我自己跑去敲溫尚翊，本來只是想問他今天在忙什麼，結果訊息一來一回就聊了好久。他說下午在練團室搬音箱，被瑪莎嫌動作慢，後來連撥片都不知道掉到哪裡去。我光想像他蹲在地上翻東西的樣子就想笑。明明只是隨口問候，最後居然聊到吉他和冰店。叫他早點休息，他還要回我一句「妳也是」。哼，明明自己也很晚睡。',
  ashin: '晚上找阿信聊了一下。他今天去唱片行，本來只想買一張，結果站在架子前挑來挑去，又多帶了一張回家。我完全可以想像他拿著兩張唱片猶豫半天的樣子。他還說下次可以借我聽，這樣明天又有新歌可以期待了。跟他聊天很舒服，不用一直想著要找什麼話題，想到什麼就說什麼也不會冷場。',
  masa: '晚上跟瑪莎聊了好一陣子。他今天被媽媽叫去買東西，結果不小心多買了一包餅乾，回家還被唸。最好笑的是，聊著聊著又講到以前巷口那家冰店，我本來以為他早就忘了，沒想到他連我以前每次都要站在冰櫃前面猶豫很久都記得。嘴巴還是很壞，記性倒是好得不得了。',
  stone: '晚上跟石頭聊了些今天的日常。他說上課前差點忘記帶筆記，還有一題想了很久才弄懂。我跟他講自己上課差點睡著的事，他居然沒有笑我，只提醒我下次不要熬夜。後來又聊到一些有的沒的小事，明明沒有什麼重要內容，回過神來才發現時間已經過了好久。',
  yanming: '晚上找諺明哥聊天。他說今天練團室的預約排得很滿，還有人把導線放錯箱子，害他找了半天。忙完以後他重新整理了一遍架子，才終於泡了杯茶坐下來。我問他平常都怎麼放鬆，他還真的很認真地回答我。感覺他連聊天都很有條理，不過偶爾被瑪莎鬧到無奈的樣子，想想也滿好笑的。',
}

const monthDiaryEntries: Record<RouteCharacterId, { title: string; visit: string; chat: string; ending: string }> = {
  wen: {
    title: '我只是去送水，沒有別的意思！',
    visit: '今天拎著兩瓶冰水跑去台大找溫尚翊。本來想說送到就走，結果一到球場就聽見球砰砰地撞在地上，旁邊的人一直喊他的名字。他正在打球，跳起來投籃的時候真的……算了，先不誇他。明明想裝得很自然，結果他一看到我就把球交給隊友跑過來，害我拿著水瓶突然不知道要講什麼。後來我坐在樹蔭下看他們打完，太陽曬得腿都熱了，他又把我拉去福利社吃東西。明明是我送水，最後還是他請客，哼，算他有良心。',
    chat: '回家後我還是忍不住傳訊息跟他說最後那球很帥。他一開始裝得很平常，後來又說下次有球賽會通知我。欸，這句我可是記下來了喔。明明只是隨口一句，我卻把訊息看了好幾遍，還怕自己回得太快會顯得很期待。希望他不要到時候又說自己忘記了。',
    ending: '今天兩瓶水都送出去了，球賽也看完了，只有他跑過來拿水的那個畫面還在我腦袋裡重播。完了，我是不是有點太明顯了？明天見到他要記得正常一點！',
  },
  ashin: {
    title: '實踐真的比我想像中大欸。',
    visit: '今天去實踐找阿信，他帶我在校園裡到處走。原本想說只是逛一下，結果從圖書館旁邊一路走到校門口，差點忘記時間。走到一半風把他的頭髮吹開，我才注意到眉毛旁邊那顆小痣，忍不住多看了兩眼，還差點被他發現。阿信講起學校和音樂時真的很認真，連哪條路比較好走都會慢慢跟我說。最後他陪我等車，還一直等到我上車才離開。今天的路好像特別長，但一點都不無聊。',
    chat: '回家後我傳訊息跟他說今天走得很開心。他說自己本來還怕我覺得無聊，拜託，明明是我一直不想回家！後來又聊到他寫在講義背面的歌詞，他還答應下次有空拿給我看。現在反而有點好奇，那到底寫了什麼，最好不要讓我等太久。',
    ending: '今天走了好多路，腳有點酸，回家才發現鞋底都沾了灰。可是如果下次還能再逛一次，好像也不錯。嗯……我是不是已經在想下次了？',
  },
  masa: {
    title: '我媽真的很愛翻相簿！',
    visit: '今天把瑪莎帶回家吃飯，我媽一看到他就像突然想起什麼大事，轉身就去把相簿翻出來。救命，連我小時候那種剪得亂七八糟的瀏海都有，真的很想把相簿整本搶走！瑪莎一開始還裝得很客氣，坐沒多久就笑得比我還大聲，根本是來看我出糗的吧。吃飯時我媽一直叫他多吃一點，他也真的很捧場，最後還幫忙把碗拿去廚房。明明隔了這麼多年，坐在餐桌旁邊又好像回到以前。',
    chat: '晚上他還傳訊息來問相簿到底收好了沒，哈哈哈，這人到底有多在意自己的黑歷史？後來又聊到以前巷口那家冰店，他居然連我每次都要挑很久、最後還是點同一種口味都記得。聊到最後約好改天去看看店還在不在。這次可不准放我鴿子，不然我真的會去他家門口堵人。',
    ending: '我媽說下次還要找以前的照片。拜託不要了，我的黑歷史已經夠多了！不過……今天能跟瑪莎一起坐在家裡吃飯，感覺真的有點奇妙。好像有些東西繞了一大圈，還是回來了。',
  },
  stone: {
    title: '便當有送到，人也有看到啦。',
    visit: '中午帶便當去找石頭。天氣熱得要命，我一路上都怕便當悶太久會不好吃，走得比平常快好多。結果他一看到我，第一句不是問便當，是問我有沒有等很久。後來我們坐在騎樓邊一起吃，他又把自己那份裡比較好吃的菜推到我這邊，真的很會欸。吃到一半他還一直看時間，怕趕不上課。便當吃完後，他把袋子收好，還提醒我回去路上小心。明明是我特地跑去找他，最後又像被照顧了一遍。',
    chat: '晚上他又傳訊息來問我有沒有把便當盒洗好，拜託，我又不是會把便當盒弄丟的人！後來聊到他上課差點遲到，還有筆記放錯袋子，原來他也會有這麼迷糊的時候。下次換他請我喝飲料，這句我有記下來，不能讓他裝作沒說過。',
    ending: '本來只是想送個便當，結果又被他照顧了一遍。石頭真的很細心欸，有時候連我自己都沒注意到的小事，他好像都會先想到。',
  },
  yanming: {
    title: '我差點把導線收成一團。',
    visit: '今天去練團室找諺明哥，跟他一起整理器材。原本以為就是把東西放回去而已，結果光是收導線就有好多眉角。他教我順著線的弧度慢慢繞，不能硬折。我第一次試的時候差點把自己弄成一團，還好他沒有笑我，只是站在旁邊慢慢示範。練團室裡有一點灰塵和器材的味道，忙起來時間過得超快。整理完再回頭看，整個角落真的整齊好多，突然很有成就感。',
    chat: '晚上我傳訊息跟他說手上還有灰，他居然還記得提醒我洗手。後來他說又檢查了一遍我收的線，全部都過關，哈哈！還聊到他今天差點記錯預約時間，原來他也不是每件事都能安排得滴水不漏嘛。這個小秘密我先記著，以後說不定可以拿來笑他。',
    ending: '下次如果還有機會去，我想再學一點別的。這次至少不要再把線繞歪了，拜託。',
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
    response: ['今天練團取消啦。', '瑪莎跟石頭兩個人翹課被老師抓到，兩個都才大一，現在還被留下來談話，湊不齊人。'],
    affection: 3,
  },
  {
    text: '你今天不用練團喔？居然有空約我吃冰。',
    response: ['今天剛好不用練啦。', '本來想練的，結果瑪莎跟石頭翹課被老師抓到，兩個都才大一，現在還被留下來談話。'],
    affection: 2,
  },
  {
    text: '怎麼，今天沒人陪你練團，只好找我？',
    response: ['妳很會講欸。', '今天是瑪莎跟石頭出狀況，兩個都才大一，翹課被老師抓到，練團湊不齊人，我才剛好有空。'],
    affection: -1,
  },
]

const classroomChoices: ChatChoice[] = [
  { text: '蛤？大學翹課也會被抓喔？', response: ['會啊，妳以為大學老師都不點名喔？', '他們大概覺得溜出去一下不會怎樣，結果運氣也太差。', '我本來還想趁今天把那段練完，現在只好改天再說。'], affection: 3 },
  { text: '他們兩個不是才大一嗎，膽子倒是不小欸。', response: ['妳也覺得喔？', '平常看起來都挺乖的，今天膽子倒是不小。', '等他們回來，我再問問到底跑去哪裡玩，搞不好比我今天的練習還精彩。'], affection: 1 },
  { text: '你們練團的人怎麼老是出包？', response: ['妳講話很難聽欸。', '我只是難得不用趕去練團，才有空約妳出來。', '妳到底是要不要來吃冰？'], affection: -1 },
]
const masaCheckinRounds: ChatChoice[][] = [
  [
    { text: '蛤？你們真的才大一喔？我還以為你們至少大二了欸。', response: ['妳反應也太大了吧。', '我跟石頭本來就晚了一點啊，現在才大一。今天只是想偷跑出去一下，誰知道就被抓了。'], affection: 2 },
    { text: '等一下，你現在才大一？', response: ['不然咧？妳以為我一轉眼就大三喔？', '老師今天剛好在附近，才這麼倒楣。'], affection: 1 },
    { text: '你不是只比我小一歲嗎？我還以為你跟我差不多年級。', response: ['一歲就不能差兩個年級喔？', '反正我現在就是大一，妳先不要笑。'], affection: 3 },
  ],
  [
    { text: '可是你怎麼會到現在才大一啊？', response: ['妳這問題問得很直接欸。', '以前有些事情耽擱了一下，就比別人晚了一點。'], affection: 3 },
    { text: '你之前是不是有休學過？', response: ['沒有啦，妳不要自己亂猜。', '反正就是晚了一點，講起來有點複雜，改天有空再跟妳說。'], affection: 2 },
    { text: '所以你現在還在適應大學生活喔？', response: ['差不多啦，跟高中還是有點不一樣。', '先把眼前的課顧好就好，妳不用替我操心。'], affection: 1 },
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

const stripCornerQuotes = (value: string): string =>
  value.trim().replace(/^「/, '').replace(/」$/, '').trim()

const springResponseBlocks = (speaker: string, response: string): StoryBlock[] => {
  const blocks: StoryBlock[] = []
  const quotedSpeech = /「([^」]*)」/g
  let cursor = 0
  let match: RegExpExecArray | null

  while ((match = quotedSpeech.exec(response)) !== null) {
    const action = response.slice(cursor, match.index).trim()
    if (action) blocks.push({ kind: 'narration', text: action })
    if (match[1].trim()) blocks.push({ kind: 'dialogue', speaker, text: match[1].trim() })
    cursor = quotedSpeech.lastIndex
  }

  const trailingAction = response.slice(cursor).trim()
  if (trailingAction) blocks.push({ kind: 'narration', text: trailingAction })
  if (!blocks.length) blocks.push({ kind: 'dialogue', speaker, text: stripCornerQuotes(response) })
  return blocks
}

function MessageBubble({ mine, text }: { mine: boolean; text: string }) {
  return (
    <div className={mine ? 'message-row mine' : 'message-row'}>
      <div className={mine ? 'message-bubble mine' : 'message-bubble'}>{stripCornerQuotes(text)}</div>
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
              <p>{`「${stripCornerQuotes(block.text)}」`}</p>
            </div>
          )
        }
        return <p className={block.kind === 'aside' ? 'narrative-aside' : 'narrative-paragraph'} key={index}>{stripCornerQuotes(block.text)}</p>
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
  const [saveSlots, setSaveSlots] = useState<Record<number, SaveSlotData | null>>(() => Object.fromEntries(getSaveSlotIds().map((slot) => [slot, readSaveSlot(slot)])))
  const [saveFeedback, setSaveFeedback] = useState('')
  const [daySnapshots, setDaySnapshots] = useState<DaySnapshotRecord[]>([])
  const [daySnapshotLoading, setDaySnapshotLoading] = useState(true)
  const [daySnapshotError, setDaySnapshotError] = useState('')
  const [autoStepSnapshots, setAutoStepSnapshots] = useState<AutoStepSnapshotRecord[]>([])
  const [autoStepSnapshotLoading, setAutoStepSnapshotLoading] = useState(true)
  const [autoStepSnapshotError, setAutoStepSnapshotError] = useState('')
  const autoStepCaptureRef = useRef<(() => SaveSlotData) | null>(null)
  const autoStepScheduleRef = useRef<(() => void) | null>(null)
  const autoStepReadyRef = useRef(false)
  const autoStepLastFingerprintRef = useRef('')
  const autoStepSequenceRef = useRef(0)


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
  const smsMessagesRef = useRef(smsMessages)
  const [storyStage, setStoryStage] = useState<StoryStage>(() => {
    const saved = localStorage.getItem('mayday-story-stage')
    if (saved === 'completed' && localStorage.getItem('mayday-august-day-complete') === 'true' && localStorage.getItem('mayday-august-diary-unlocked') !== 'true') return 'august-diary'
    if (saved === 'completed' && localStorage.getItem('mayday-august-day-complete') === 'true' && localStorage.getItem('mayday-august-diary-unlocked') === 'true' && localStorage.getItem('mayday-september-started') !== 'true') return 'september-intro'
    if (saved === 'completed' && localStorage.getItem('mayday-july-lost-key-day-complete') === 'true' && localStorage.getItem('mayday-august-day-complete') !== 'true') return 'august-story'
    if (saved === 'june-study-complete' && localStorage.getItem('mayday-june-free-chat-complete') !== 'true') return 'june-free-chat'
    if (saved === 'june-study-complete' && localStorage.getItem('mayday-june-diary-unlocked') !== 'true') return 'june-diary'
    if (saved === 'march28-diary' && localStorage.getItem('mayday-march28-park-choice') === 'stay') return 'march28-park-stay'
    if (saved === 'completed' && localStorage.getItem('mayday-april12-diary-unlocked') === 'true') return 'completed'
    if (saved === 'completed' && localStorage.getItem('mayday-march29-diary-unlocked') === 'true') return 'completed'
    if (saved === 'completed' && localStorage.getItem('mayday-march28-park-choice') === 'stay' && localStorage.getItem('mayday-march28-day-complete') === 'true' && localStorage.getItem('mayday-march28-morning-complete') !== 'true') return 'march28-morning'
    if (saved === 'completed' && localStorage.getItem('mayday-march28-day-complete') === 'true') return 'march29-show'
    const savedSpringStage = saved === 'paused' ? localStorage.getItem('mayday-resume-stage') : saved
    if (savedSpringStage === 'spring-free-chat-picker' || savedSpringStage === 'spring-free-chat') return 'spring-diary'
    const resetWenSpringSmsStage = localStorage.getItem('mayday-spring-wen-sms-content-version') !== 'hot-cocoa-v3'
      && localStorage.getItem('mayday-spring-sms-target') === 'wen'
    const springSmsCopyNeedsRefresh = localStorage.getItem('mayday-spring-sms-content-version') !== 'daily-chat-v6' || resetWenSpringSmsStage
    if (springSmsCopyNeedsRefresh && savedSpringStage === 'spring-sms-chat' &&
      localStorage.getItem('mayday-spring-sms-event-started') !== 'true' &&
      !localStorage.getItem('mayday-spring-sms-target') &&
      localStorage.getItem('mayday-spring-sms-opening-sent') !== 'true') return 'spring-sms-picker'
    if (saved === 'completed' && localStorage.getItem('mayday-chapter1-complete') === 'true' && localStorage.getItem('mayday-greetings-complete') !== 'true') return 'greetings'
    if (saved === 'completed' && localStorage.getItem('mayday-free-chat-complete') === 'true' && localStorage.getItem('mayday-month-visit-complete') !== 'true') return 'month-free-time'
    if (saved === 'completed' && localStorage.getItem('mayday-next-month-day-complete') === 'true' && localStorage.getItem('mayday-year-end-day-complete') !== 'true') return 'year-end-intro'
    if (saved === 'completed' && localStorage.getItem('mayday-year-end-day-complete') === 'true' && localStorage.getItem('mayday-winter-break-day-complete') !== 'true') return 'winter-exam-intro'
    if (saved === 'completed' && localStorage.getItem('mayday-winter-break-day-complete') === 'true' && localStorage.getItem('mayday-february-day-complete') !== 'true') return 'february-intro'
    if (saved === 'completed' && localStorage.getItem('mayday-february-day-complete') === 'true' && localStorage.getItem('mayday-spring-day-complete') !== 'true') return 'spring-term-intro'
    if (saved === 'completed' && localStorage.getItem('mayday-spring-day-complete') === 'true' && localStorage.getItem('mayday-march28-day-complete') !== 'true') {
      const savedCharacter = localStorage.getItem('mayday-march28-visit-character')
      let savedReplies: unknown = []
      try { savedReplies = JSON.parse(localStorage.getItem('mayday-march28-visit-replies') ?? '[]') } catch { savedReplies = [] }
      if (savedCharacter && march28CharacterOrder.includes(savedCharacter as March28CharacterId)) return Array.isArray(savedReplies) && savedReplies.length >= 5 ? 'march28-end' : 'march28-visit'
      return 'march28-intro'
    }
    if (saved === 'completed' && localStorage.getItem('mayday-month-day-complete') === 'true' && localStorage.getItem('mayday-next-month-started') !== 'true') return 'next-month-intro'
    const savedMonthVisitTarget = localStorage.getItem('mayday-month-visit-target')
    if (saved === 'month-visit' && (!savedMonthVisitTarget || !monthVisitOrder.includes(savedMonthVisitTarget as RouteCharacterId))) return 'month-free-time'
    const savedTarget = localStorage.getItem('mayday-free-chat-target')
    const day2PlanChosen = localStorage.getItem('mayday-day2-after-ice-choice') === 'accept' || localStorage.getItem('mayday-day2-after-ice-choice') === 'decline'
    if (['free-time', 'free-chat', 'day2-complete'].includes(saved ?? '') && !day2PlanChosen) return 'ice-date'
    if (saved === 'free-time' && savedTarget && freeTimeOrder.includes(savedTarget as RouteCharacterId) && localStorage.getItem('mayday-free-chat-complete') !== 'true') return 'free-chat'
    const valid: StoryStage[] = ['notification', 'messages', 'reply', 'walk', 'studio', 'reunion', 'reunion-chat', 'nickname', 'rehearsal', 'dinner', 'after-dinner', 'ending', 'completed', 'greetings', 'classroom', 'masa-checkin', 'stone-checkin', 'ice-date', 'stroll', 'day2-diary', 'free-time', 'free-chat', 'day2-complete', 'month-free-time', 'month-visit', 'month-visit-complete', 'month-free-chat', 'month-diary', 'next-month-intro', 'next-month-invite-notification', 'next-month-invite-picker', 'next-month-invite', 'next-month-invite-chat', 'next-month-invite-date', 'next-month-open-day', 'next-month-open-day-picker', 'next-month-open-day-visit', 'next-month-open-day-visit-complete', 'next-month-free-chat', 'next-month-diary', 'year-end-intro', 'year-end-invite-notification', 'year-end-invite-picker', 'year-end-shopping-notification', 'year-end-shopping-chat', 'year-end-shopping', 'year-end-fireworks', 'year-end-new-year-notification', 'year-end-new-year-chat', 'year-end-free-chat', 'year-end-free-chat-picker', 'year-end-diary', 'winter-exam-intro', 'winter-exam-notification', 'winter-exam-chat', 'winter-exam-tutoring', 'winter-break-practice', 'winter-break-gig', 'winter-break-pickup', 'winter-break-bus-choice', 'winter-break-bus', 'winter-diary', 'february-intro', 'february-secret', 'february-dinner', 'february-table', 'february-after-dinner-picker', 'february-after-dinner', 'february-diary', 'spring-term-intro', 'spring-invite-picker', 'spring-invite-notification', 'spring-invite-chat', 'spring-store', 'spring-rehearsal', 'spring-after-picker', 'spring-lesson', 'spring-dinner', 'spring-sms-picker', 'spring-sms-chat', 'spring-diary', 'march28-intro', 'march28-visit', 'march28-end', 'march28-park', 'march28-park-stay', 'march28-morning', 'march28-diary', 'march29-show', 'april12-story', 'april20-story', 'april30-story', 'may10-story', 'june-study', 'june-free-chat', 'june-diary', 'june-study-complete', 'july-lost-key', 'august-story', 'august-diary', 'september-intro', 'september-story', 'september-diary', 'paused']
    return saved && valid.includes(saved as StoryStage) ? saved as StoryStage : 'notification'
  })
  const [march29Clock, setMarch29Clock] = useState(() => localStorage.getItem('mayday-march29-clock') ?? '15:30')
  const updateMarch29Clock = useCallback((time: string) => {
    localStorage.setItem('mayday-march29-clock', time)
    setMarch29Clock(time)
  }, [])
  const [april12Clock, setApril12Clock] = useState(() => localStorage.getItem('mayday-april12-clock') ?? '14:30')
  const updateApril12Clock = useCallback((time: string) => {
    localStorage.setItem('mayday-april12-clock', time)
    setApril12Clock(time)
  }, [])
  const [april20Clock, setApril20Clock] = useState(() => localStorage.getItem('mayday-april20-clock') ?? '15:16')
  const updateApril20Clock = useCallback((time: string) => {
    localStorage.setItem('mayday-april20-clock', time)
    setApril20Clock(time)
  }, [])
  const [april30Clock, setApril30Clock] = useState(() => localStorage.getItem('mayday-april30-clock') ?? '08:10')
  const updateApril30Clock = useCallback((time: string) => {
    localStorage.setItem('mayday-april30-clock', time)
    setApril30Clock(time)
  }, [])
  const [may10Clock, setMay10Clock] = useState(() => localStorage.getItem('mayday-may10-clock') ?? '13:40')
  const updateMay10Clock = useCallback((time: string) => {
    localStorage.setItem('mayday-may10-clock', time)
    setMay10Clock(time)
  }, [])
  const [juneStudyClock, setJuneStudyClock] = useState(() => localStorage.getItem('mayday-june-study-clock') ?? '13:30')
  const updateJuneStudyClock = useCallback((time: string) => {
    localStorage.setItem('mayday-june-study-clock', time)
    setJuneStudyClock(time)
  }, [])
  const [julyLostKeyClock, setJulyLostKeyClock] = useState(() => localStorage.getItem('mayday-july-lost-key-clock') ?? '18:00')
  const updateJulyLostKeyClock = useCallback((time: string) => {
    localStorage.setItem('mayday-july-lost-key-clock', time)
    setJulyLostKeyClock(time)
  }, [])
  const [augustClock, setAugustClock] = useState(() => localStorage.getItem('mayday-august-clock') ?? '15:05')
  const updateAugustClock = useCallback((time: string) => {
    localStorage.setItem('mayday-august-clock', time)
    setAugustClock(time)
  }, [])
  const [septemberClock, setSeptemberClock] = useState(() => localStorage.getItem('mayday-september-clock') ?? '06:35')
  const updateSeptemberClock = useCallback((time: string) => {
    localStorage.setItem('mayday-september-clock', time)
    setSeptemberClock(time)
  }, [])
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
  const [monthDiaryUnlocked, setMonthDiaryUnlocked] = useState(() => localStorage.getItem('mayday-month-diary-unlocked') === 'true' || localStorage.getItem('mayday-month-day-complete') === 'true')
  const [selectedDiaryDate, setSelectedDiaryDate] = useState<'1996-10-15' | '1996-10-16' | '1996-11-16' | '1996-12-14' | '1996-12-31' | '1997-01-22' | '1997-02-03' | '1997-02-17' | '1997-03-28' | '1997-03-29' | '1997-04-12' | '1997-04-20' | '1997-04-30' | '1997-05-10' | '1997-06-15' | '1997-08-01' | '1997-09-06' | null>(null)
  const [chatMessages, setChatMessages] = useState<Record<CharacterId, SmsMessage[]>>(() => {
    // Keep the refreshed conversation copy, but restore the player's original 17 February
    // messages automatically from the most complete existing save slot.
    const springSmsAlreadyStarted =
      localStorage.getItem('mayday-spring-sms-event-started') === 'true' ||
      localStorage.getItem('mayday-spring-sms-event-complete') === 'true' ||
      Boolean(localStorage.getItem('mayday-spring-sms-target')) ||
      localStorage.getItem('mayday-spring-sms-opening-sent') === 'true' ||
      localStorage.getItem('mayday-spring-sms-replied') === 'true'
    if (localStorage.getItem('mayday-spring-sms-content-version') !== 'daily-chat-v6') {
      localStorage.setItem('mayday-spring-sms-content-version', 'daily-chat-v6')
      if (!springSmsAlreadyStarted) {
        localStorage.removeItem('mayday-spring-sms-target')
        localStorage.setItem('mayday-spring-sms-round', '0')
        localStorage.setItem('mayday-spring-sms-replied', 'false')
        localStorage.setItem('mayday-spring-sms-opening-sent', 'false')
        localStorage.removeItem('mayday-spring-sms-opening-choice')
        localStorage.setItem('mayday-spring-sms-replies', '[]')
        localStorage.setItem('mayday-spring-sms-mode', 'day')
      }
    }
    if (localStorage.getItem('mayday-spring-wen-sms-content-version') !== 'hot-cocoa-v3') {
      localStorage.setItem('mayday-spring-wen-sms-content-version', 'hot-cocoa-v3')
      // A content refresh must never reset a selected/started one-time SMS event.
    }

    const saved = localStorage.getItem('mayday-chat-messages')
    let current: Record<CharacterId, SmsMessage[]> = createInitialChatMessages()
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Partial<Record<CharacterId, SmsMessage[]>>
        if (parsed && greetingOrder.every((id) => Array.isArray(parsed[id]))) {
          current = {
            ...parsed as Record<CharacterId, SmsMessage[]>,
            wen: migrateWenClassroomReplyCopy(removeDuplicateWenMovieInviteLine(parsed.wen as SmsMessage[])).map((message) => message.text === '今天大家好像都滿喜歡妳的，尤其阿信，一直找妳聊天。'
              ? { ...message, text: '剛剛在唱片行，妳跟阿信聊得滿開心的嘛。' }
              : message),
            ashin: (parsed.ashin as SmsMessage[]).map((message) => ['剛剛在樂器行碰到你們，感覺你們今天心情很好。我也順利買到吉他弦了。', '剛剛一起逛唱片行滿開心的，妳最後有沒有挑到喜歡的？我本來還想多介紹幾張，結果得趕回去練團。'].includes(message.text)
              ? { ...message, text: '剛剛一起逛唱片行滿開心的，妳最後有沒有挑到喜歡的？我本來還想多介紹幾張，不過後來也差不多該回家了。' }
              : message),
            masa: removeDuplicateMasaErrandLine(parsed.masa as SmsMessage[]),
          }
        }
      } catch {
        // If the current message store is malformed, start with the authored inbox
        // and still attempt to restore the saved conversation archive below.
      }
    }

    // A saved archive may preserve the original 17 February messages after a content
    // refresh, but it must never be merged into a timeline that was loaded before that
    // evening's SMS event. loadSaveSlot writes this checkpoint from the selected save.
    const archiveRestoreCheckpoint = localStorage.getItem('mayday-spring-sms-history-restore-v1')
    const canRestoreSpringSmsArchive = archiveRestoreCheckpoint === 'true' ||
      (archiveRestoreCheckpoint !== 'false' && (
        localStorage.getItem('mayday-spring-sms-opening-sent') === 'true' ||
        localStorage.getItem('mayday-spring-day-complete') === 'true'
      ))
    const savedArchives = canRestoreSpringSmsArchive ? getSaveSlotIds().flatMap((slot) => {
      const save = readSaveSlot(slot)
      const raw = save?.data['mayday-chat-messages']
      if (!save || !raw) return []
      try {
        const archived = JSON.parse(raw) as Partial<Record<CharacterId, SmsMessage[]>>
        const messages = greetingOrder.reduce((total, character) => {
          const thread = Array.isArray(archived[character]) ? archived[character]! : []
          return total + thread.filter((message) => message?.date === '1997年2月17日・晚上').length
        }, 0)
        return messages ? [{ save, archived, messages }] : []
      } catch {
        return []
      }
    }).sort((left, right) => right.messages - left.messages || right.save.savedAt.localeCompare(left.save.savedAt)) : []

    const bestArchive = savedArchives[0]
    if (bestArchive) {
      const restored: Record<CharacterId, SmsMessage[]> = { ...current }
      const messageOrder = (message: SmsMessage) => {
        const match = message.id.match(/^[^-]+-(\d+)-(\d+)$/)
        return match ? Number(match[1]) * 100 + Number(match[2]) : 0
      }
      const isDuplicate = (left: SmsMessage, right: SmsMessage) =>
        left.id === right.id ||
        (left.date === right.date && left.from === right.from && left.text === right.text && (left.time ?? '') === (right.time ?? ''))

      for (const character of greetingOrder) {
        const archivedMessages = Array.isArray(bestArchive.archived[character])
          ? bestArchive.archived[character]!.filter((message): message is SmsMessage =>
              Boolean(message && message.date === '1997年2月17日・晚上' &&
                typeof message.id === 'string' && typeof message.text === 'string' &&
                (message.from === 'me' || greetingOrder.includes(message.from as CharacterId))))
          : []
        const existing = restored[character] ?? []
        const additions = archivedMessages.filter((message) => !existing.some((item) => isDuplicate(item, message)))
        if (additions.length) {
          restored[character] = [...existing, ...additions].sort((left, right) =>
            messageOrder(left) - messageOrder(right) || (left.time ?? '').localeCompare(right.time ?? ''))
        }
      }
      current = restored
    }

    // Refresh only the July 15 conversation entries that already exist. This repairs
    // saved chat histories without changing any messages from earlier or later dates.
    const julyDate = '1997年7月15日・傍晚'
    for (const [characterKey, entries] of Object.entries(julyLostKeyMessageArchive)) {
      const character = characterKey as CharacterId
      const existing = current[character] ?? []
      const firstJulyIndex = existing.findIndex((message) => message.date === julyDate)
      if (firstJulyIndex < 0) continue
      const lastJulyIndex = existing.length - 1 - [...existing].reverse().findIndex((message) => message.date === julyDate)
      const refreshedJulyMessages: SmsMessage[] = entries.map((entry, index) => ({
        id: 'july-lost-key-' + characterKey + '-' + index,
        date: julyDate,
        time: entry.time ?? '18:03',
        from: entry.from,
        text: entry.text,
      }))
      current[character] = [
        ...existing.slice(0, firstJulyIndex),
        ...refreshedJulyMessages,
        ...existing.slice(lastJulyIndex + 1),
      ]
    }

    if (JSON.stringify(current) !== saved) localStorage.setItem('mayday-chat-messages', JSON.stringify(current))
    return current
  })
  const chatMessagesRef = useRef(chatMessages)
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
  const [juneFreeChatTarget, setJuneFreeChatTarget] = useState<RouteCharacterId | null>(() => {
    const saved = localStorage.getItem('mayday-june-free-chat-target')
    return saved && freeTimeOrder.includes(saved as RouteCharacterId) ? saved as RouteCharacterId : null
  })
  const [juneFreeChatRound, setJuneFreeChatRound] = useState(() => Math.max(0, Math.min(4, Number(localStorage.getItem('mayday-june-free-chat-round') ?? '0'))))
  const [juneFreeChatReplied, setJuneFreeChatReplied] = useState(() => localStorage.getItem('mayday-june-free-chat-replied') === 'true')
  const [juneFreeChatStarted, setJuneFreeChatStarted] = useState(() =>
    localStorage.getItem('mayday-june-free-chat-started') === 'true' ||
    (localStorage.getItem('mayday-june-study-day-complete') === 'true' && localStorage.getItem('mayday-june-free-chat-complete') !== 'true')
  )
  const [juneFreeChatReplies, setJuneFreeChatReplies] = useState<number[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-june-free-chat-replies') ?? '[]')
      return Array.isArray(saved) ? saved.filter((value): value is number => Number.isInteger(value) && value >= 0 && value <= 2).slice(0, 5) : []
    } catch { return [] }
  })
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
  const [monthFreeChatTarget, setMonthFreeChatTarget] = useState<RouteCharacterId | null>(() => {
    const saved = localStorage.getItem('mayday-month-free-chat-target')
    if (saved && monthVisitOrder.includes(saved as RouteCharacterId)) return saved as RouteCharacterId
    if (localStorage.getItem('mayday-month-free-chat-started') === 'true' && localStorage.getItem('mayday-month-free-chat-choice-pending') !== 'true') {
      const legacyTarget = localStorage.getItem('mayday-month-visit-target')
      if (legacyTarget && monthVisitOrder.includes(legacyTarget as RouteCharacterId)) return legacyTarget as RouteCharacterId
    }
    return null
  })
  const [monthFreeChatRound, setMonthFreeChatRound] = useState(() => Number(localStorage.getItem('mayday-month-free-chat-round') ?? '0'))
  const [monthFreeChatReplied, setMonthFreeChatReplied] = useState(() => localStorage.getItem('mayday-month-free-chat-replied') === 'true')
  const [monthFreeChatStarted, setMonthFreeChatStarted] = useState(() => localStorage.getItem('mayday-month-free-chat-started') === 'true')
  const [monthFreeChatOpeningSent, setMonthFreeChatOpeningSent] = useState(() => localStorage.getItem('mayday-month-free-chat-opening-sent') === 'true')
  const [monthFreeChatReplies, setMonthFreeChatReplies] = useState<number[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-month-free-chat-replies') ?? '[]')
      return Array.isArray(saved) ? saved.filter((value): value is number => Number.isInteger(value) && value >= 0 && value <= 2).slice(0, 6) : []
    } catch { return [] }
  })
  const [nextMonthInviteCandidates, setNextMonthInviteCandidates] = useState<RouteCharacterId[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-next-month-invite-candidates') ?? '[]')
      return Array.isArray(saved) ? saved.filter((value): value is RouteCharacterId => monthVisitOrder.includes(value as RouteCharacterId)) : []
    } catch { return [] }
  })
  const [nextMonthInviteTarget, setNextMonthInviteTarget] = useState<RouteCharacterId | null>(() => {
    const saved = localStorage.getItem('mayday-next-month-invite-target')
    return saved && monthVisitOrder.includes(saved as RouteCharacterId) ? saved as RouteCharacterId : null
  })
  const [nextMonthInviteTeaseChoice, setNextMonthInviteTeaseChoice] = useState<number | null>(() => {
    const saved = Number(localStorage.getItem('mayday-next-month-invite-tease-choice') ?? '-1')
    return Number.isInteger(saved) && saved >= 0 && saved <= 2 ? saved : null
  })
  const [nextMonthInviteReplyChoice, setNextMonthInviteReplyChoice] = useState<number | null>(() => {
    const saved = Number(localStorage.getItem('mayday-next-month-invite-reply-choice') ?? '-1')
    return Number.isInteger(saved) && saved >= 0 && saved <= 2 ? saved : null
  })
  const [nextMonthInviteDateReplies, setNextMonthInviteDateReplies] = useState<number[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-next-month-invite-date-replies') ?? '[]')
      return Array.isArray(saved) ? saved.filter((value): value is number => Number.isInteger(value) && value >= 0 && value <= 2).slice(0, 5) : []
    } catch { return [] }
  })
  const [nextMonthOpenDayTarget, setNextMonthOpenDayTarget] = useState<RouteCharacterId | null>(() => {
    const saved = localStorage.getItem('mayday-next-month-open-day-target')
    return saved && monthVisitOrder.includes(saved as RouteCharacterId) ? saved as RouteCharacterId : null
  })
  const [nextMonthOpenDayReplies, setNextMonthOpenDayReplies] = useState<number[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-next-month-open-day-replies') ?? '[]')
      const target = localStorage.getItem('mayday-next-month-open-day-target')
      return Array.isArray(saved)
        ? saved.slice(0, 5).filter((value, index): value is number => Number.isInteger(value) && value >= 0 && value <= (target === 'wen' && index === 3 ? 3 : 2))
        : []
    } catch { return [] }
  })
  const [nextMonthEventKind, setNextMonthEventKind] = useState<'invite' | 'open-day' | null>(() => {
    const saved = localStorage.getItem('mayday-next-month-event-kind')
    return saved === 'invite' || saved === 'open-day' ? saved : null
  })
  const [nextMonthEventCharacter, setNextMonthEventCharacter] = useState<RouteCharacterId | null>(() => {
    const saved = localStorage.getItem('mayday-next-month-event-character')
    return saved && monthVisitOrder.includes(saved as RouteCharacterId) ? saved as RouteCharacterId : null
  })
  const [nextMonthFreeChatTarget, setNextMonthFreeChatTarget] = useState<RouteCharacterId | null>(() => {
    const saved = localStorage.getItem('mayday-next-month-free-chat-target')
    return saved && monthVisitOrder.includes(saved as RouteCharacterId) ? saved as RouteCharacterId : null
  })
  const [nextMonthFreeChatRound, setNextMonthFreeChatRound] = useState(() => Number(localStorage.getItem('mayday-next-month-free-chat-round') ?? '0'))
  const [nextMonthFreeChatReplied, setNextMonthFreeChatReplied] = useState(() => localStorage.getItem('mayday-next-month-free-chat-replied') === 'true')
  const [nextMonthFreeChatOpeningSent, setNextMonthFreeChatOpeningSent] = useState(() => localStorage.getItem('mayday-next-month-free-chat-opening-sent') === 'true')
  const [nextMonthFreeChatReplies, setNextMonthFreeChatReplies] = useState<number[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-next-month-free-chat-replies') ?? '[]')
      return Array.isArray(saved) ? saved.filter((value): value is number => Number.isInteger(value) && value >= 0 && value <= 2).slice(0, 5) : []
    } catch { return [] }
  })
  const [nextMonthDiaryUnlocked, setNextMonthDiaryUnlocked] = useState(() => localStorage.getItem('mayday-next-month-diary-unlocked') === 'true')
  const [nextMonthDiaryData, setNextMonthDiaryData] = useState<NextMonthDiaryData | null>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-next-month-diary-data') ?? 'null') as NextMonthDiaryData | null
      if (!saved || typeof saved.title !== 'string' || typeof saved.eventSummary !== 'string' || typeof saved.chatSummary !== 'string') return null
      const eventCharacter = monthVisitOrder.includes(saved.eventCharacter as RouteCharacterId) ? saved.eventCharacter as RouteCharacterId : null
      const chatCharacter = monthVisitOrder.includes(saved.chatCharacter as RouteCharacterId) ? saved.chatCharacter as RouteCharacterId : null
      if (!eventCharacter || !chatCharacter) return saved
      const inviteTargetValue = localStorage.getItem('mayday-next-month-invite-target')
      const inviteTarget = inviteTargetValue && monthVisitOrder.includes(inviteTargetValue as RouteCharacterId) ? inviteTargetValue as RouteCharacterId : null
      const inviteReplyChoice = Number(localStorage.getItem('mayday-next-month-invite-reply-choice') ?? '-1')
      const inviteChoice = inviteTarget && Number.isInteger(inviteReplyChoice) && inviteReplyChoice >= 0 && inviteReplyChoice < nextMonthInviteRoutes[inviteTarget].replyChoices.length
        ? nextMonthInviteRoutes[inviteTarget].replyChoices[inviteReplyChoice]
        : null
      const acceptedInviteCopy = inviteTarget && inviteChoice?.accepted ? nextMonthDiaryCopy[inviteTarget] : null
      const eventCopy = nextMonthDiaryCopy[eventCharacter]
      const refreshed: NextMonthDiaryData = {
        ...saved,
        title: acceptedInviteCopy ? '今天也太充實了吧！' : eventCopy.openDayTitle,
        eventSummary: [acceptedInviteCopy?.inviteSummary, eventCopy.openDaySummary].filter(Boolean).join('\n\n'),
        chatSummary: nextMonthChatDiary[chatCharacter],
        ending: eventCopy.ending,
        eventCharacter,
        chatCharacter,
      }
      localStorage.setItem('mayday-next-month-diary-data', JSON.stringify(refreshed))
      return refreshed
    } catch { return null }
  })
  const [yearEndInviteCandidates, setYearEndInviteCandidates] = useState<YearEndRouteCharacterId[]>(() => {
    const inviteCheckKey = 'mayday-year-end-invite-check-done'
    const savedStage = localStorage.getItem('mayday-story-stage')
    const inviteFlowStages = ['year-end-invite-notification', 'year-end-invite-picker', 'year-end-shopping-notification', 'year-end-shopping-chat', 'year-end-shopping', 'year-end-fireworks', 'year-end-new-year-notification', 'year-end-new-year-chat', 'year-end-free-chat', 'year-end-free-chat-picker', 'year-end-diary']
    if (localStorage.getItem(inviteCheckKey) !== 'true' && savedStage && inviteFlowStages.includes(savedStage)) {
      localStorage.setItem(inviteCheckKey, 'true')
    }
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-year-end-invite-candidates') ?? '[]')
      return Array.isArray(saved) ? saved.filter((id): id is YearEndRouteCharacterId => monthVisitOrder.includes(id as RouteCharacterId)) : []
    } catch { return [] }
  })
  const [yearEndInviteTarget, setYearEndInviteTarget] = useState<YearEndRouteCharacterId | null>(() => {
    const saved = localStorage.getItem('mayday-year-end-invite-target')
    return saved && monthVisitOrder.includes(saved as RouteCharacterId) ? saved as YearEndRouteCharacterId : null
  })
  const [yearEndShoppingReplyChoice, setYearEndShoppingReplyChoice] = useState<number | null>(() => {
    const saved = Number(localStorage.getItem('mayday-year-end-shopping-reply-choice') ?? '-1')
    return Number.isInteger(saved) && saved >= 0 && saved <= 2 ? saved : null
  })
  const [yearEndShoppingReplies, setYearEndShoppingReplies] = useState<number[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-year-end-shopping-replies') ?? '[]')
      return Array.isArray(saved) ? saved.filter((value): value is number => Number.isInteger(value) && value >= 0 && value <= 2).slice(0, 5) : []
    } catch { return [] }
  })
  const [yearEndFireworksReplies, setYearEndFireworksReplies] = useState<number[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-year-end-fireworks-replies') ?? '[]')
      return Array.isArray(saved) ? saved.filter((value): value is number => Number.isInteger(value) && value >= 0 && value <= 2).slice(0, 5) : []
    } catch { return [] }
  })
  const [yearEndGreetingQueue, setYearEndGreetingQueue] = useState<YearEndRouteCharacterId[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-year-end-greeting-queue') ?? '[]')
      return Array.isArray(saved) ? saved.filter((id): id is YearEndRouteCharacterId => monthVisitOrder.includes(id as RouteCharacterId)) : []
    } catch { return [] }
  })
  const [yearEndGreetingIndex, setYearEndGreetingIndex] = useState(() => Number(localStorage.getItem('mayday-year-end-greeting-index') ?? '0'))
  const [yearEndGreetingTarget, setYearEndGreetingTarget] = useState<YearEndCharacterId | null>(() => {
    const saved = localStorage.getItem('mayday-year-end-greeting-target')
    return saved && greetingOrder.includes(saved as CharacterId) ? saved as YearEndCharacterId : null
  })
  const [yearEndChatMode, setYearEndChatMode] = useState<'incoming' | 'outgoing'>(() => localStorage.getItem('mayday-year-end-chat-mode') === 'outgoing' ? 'outgoing' : 'incoming')
  const [yearEndFirstReplySent, setYearEndFirstReplySent] = useState(() => localStorage.getItem('mayday-year-end-first-reply-sent') === 'true')
  const [yearEndFreeChatRound, setYearEndFreeChatRound] = useState(() => Number(localStorage.getItem('mayday-year-end-free-chat-round') ?? '0'))
  const [yearEndFreeChatReplied, setYearEndFreeChatReplied] = useState(() => localStorage.getItem('mayday-year-end-free-chat-replied') === 'true')
  const [yearEndFreeChatReplies, setYearEndFreeChatReplies] = useState<number[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-year-end-free-chat-replies') ?? '[]')
      return Array.isArray(saved) ? saved.filter((value): value is number => Number.isInteger(value) && value >= 0 && value <= 2).slice(0, 5) : []
    } catch { return [] }
  })
  const [yearEndProactiveSent, setYearEndProactiveSent] = useState<YearEndCharacterId[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-year-end-proactive-sent') ?? '[]')
      return Array.isArray(saved) ? saved.filter((id): id is YearEndCharacterId => greetingOrder.includes(id as CharacterId)) : []
    } catch { return [] }
  })
  const [yearEndExtendedChatCharacters, setYearEndExtendedChatCharacters] = useState<YearEndCharacterId[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-year-end-extended-chat-characters') ?? '[]')
      return Array.isArray(saved) ? saved.filter((id): id is YearEndCharacterId => greetingOrder.includes(id as CharacterId)) : []
    } catch { return [] }
  })
  const [yearEndDiaryUnlocked, setYearEndDiaryUnlocked] = useState(() => localStorage.getItem('mayday-year-end-diary-unlocked') === 'true')
  const [yearEndDiaryData, setYearEndDiaryData] = useState<YearEndDiaryData | null>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-year-end-diary-data') ?? 'null') as YearEndDiaryData | null
      return saved && typeof saved.title === 'string' && Array.isArray(saved.sections) ? saved : null
    } catch { return null }
  })
  const [winterExamChatReplyChoice, setWinterExamChatReplyChoice] = useState<number | null>(() => {
    if (localStorage.getItem('mayday-winter-exam-chat-choice-confirmed-v2') !== 'true') return null
    const saved = Number(localStorage.getItem('mayday-winter-exam-chat-reply-choice') ?? '-1')
    if (!Number.isInteger(saved) || saved < 0 || saved >= winterExamChatChoices.length) return null
    const selectedText = winterExamChatChoices[saved]?.text
    return (chatMessages.wen ?? []).some((message) => message.date === '1月7日・晚上' && message.from === 'me' && message.text === selectedText) ? saved : null
  })
  const [winterExamChatClosingChoice, setWinterExamChatClosingChoice] = useState<number | null>(() => {
    const saved = Number(localStorage.getItem('mayday-winter-exam-chat-closing-choice') ?? '-1')
    if (Number.isInteger(saved) && saved >= 0 && saved < winterExamChatClosingChoices.length) {
      const selectedText = winterExamChatClosingChoices[saved]?.text
      if ((chatMessages.wen ?? []).some((message) => message.date === '1月7日・晚上' && message.from === 'me' && message.text === selectedText)) return saved
    }
    const legacyClosingText = '好！那我明天把講義跟題目都帶去。謝啦，溫老師～'
    const hasConfirmedTimeReply = winterExamChatReplyChoice !== null
    return hasConfirmedTimeReply && (chatMessages.wen ?? []).some((message) => message.date === '1月7日・晚上' && message.from === 'me' && message.text === legacyClosingText) ? 0 : null
  })
  const [winterExamTutoringUnlocked, setWinterExamTutoringUnlocked] = useState(() => {
    const saved = localStorage.getItem('mayday-winter-exam-tutoring-unlocked')
    if (saved !== null) return saved === 'true'
    try {
      const affection = JSON.parse(localStorage.getItem('mayday-route-affection') ?? '{}') as Partial<Record<RouteCharacterId, number>>
      const wenAffectionAtNewYear = Number(affection.wen ?? localStorage.getItem('mayday-affection-wen') ?? '0')
      return localStorage.getItem('mayday-year-end-day-complete') === 'true'
        && localStorage.getItem('mayday-winter-break-day-complete') !== 'true'
        && wenAffectionAtNewYear > 40
    } catch { return false }
  })
  const [winterExamReplies, setWinterExamReplies] = useState<number[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-winter-exam-replies') ?? '[]')
      return Array.isArray(saved) ? saved.filter((value): value is number => Number.isInteger(value) && value >= 0 && value <= 2).slice(0, 5) : []
    } catch { return [] }
  })
  const [winterPracticeReplies, setWinterPracticeReplies] = useState<number[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-winter-practice-replies') ?? '[]')
      return Array.isArray(saved) ? saved.filter((value): value is number => Number.isInteger(value) && value >= 0 && value <= 2).slice(0, 1) : []
    } catch { return [] }
  })
  const [winterYanmingPickupAvailable, setWinterYanmingPickupAvailable] = useState(() => {
    if (localStorage.getItem('mayday-winter-yanming-pickup-available') === 'true') return true
    const savedStage = localStorage.getItem('mayday-story-stage')
    const stageToResume = savedStage === 'paused' ? localStorage.getItem('mayday-resume-stage') : savedStage
    if (stageToResume !== 'winter-break-pickup' && stageToResume !== 'winter-break-bus-choice') return false
    try {
      const savedAffection = JSON.parse(localStorage.getItem('mayday-route-affection') ?? '{}') as Partial<Record<RouteCharacterId, number>> | null
      return Number(savedAffection?.yanming ?? localStorage.getItem('mayday-affection-yanming') ?? '0') >= 40
    } catch {
      return Number(localStorage.getItem('mayday-affection-yanming') ?? '0') >= 40
    }
  })
  const [winterBusStopCharacter, setWinterBusStopCharacter] = useState<WinterCharacterId | null>(() => {
    const saved = localStorage.getItem('mayday-winter-bus-stop-character')
    return saved && ['wen', 'masa', 'ashin', 'stone', 'yanming'].includes(saved) ? saved as WinterCharacterId : null
  })
  const [winterBusStopReplies, setWinterBusStopReplies] = useState<number[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-winter-bus-stop-replies') ?? '[]')
      return Array.isArray(saved) ? saved.filter((value): value is number => Number.isInteger(value) && value >= 0 && value <= 2).slice(0, 3) : []
    } catch { return [] }
  })
  const [winterDiaryUnlocked, setWinterDiaryUnlocked] = useState(() => localStorage.getItem('mayday-winter-diary-unlocked') === 'true')
  const [winterDiaryData, setWinterDiaryData] = useState<WinterDiaryData | null>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-winter-diary-data') ?? 'null') as WinterDiaryData | null
      return saved && typeof saved.title === 'string' && Array.isArray(saved.sections) ? saved : null
    } catch { return null }
  })
  const [februarySecretTarget, setFebruarySecretTarget] = useState<FebruaryCharacterId | null>(() => {
    const saved = localStorage.getItem('mayday-february-secret-target')
    return saved && ['wen', 'ashin', 'masa', 'stone', 'yanming'].includes(saved) ? saved as FebruaryCharacterId : null
  })
  const [februarySecretReply, setFebruarySecretReply] = useState<number | null>(() => {
    const saved = Number(localStorage.getItem('mayday-february-secret-reply') ?? '-1')
    return Number.isInteger(saved) && saved >= 0 && saved < februarySecretReplyChoices.length ? saved : null
  })
  const [februaryDinnerReply, setFebruaryDinnerReply] = useState<number | null>(() => {
    const saved = Number(localStorage.getItem('mayday-february-dinner-reply') ?? '-1')
    return Number.isInteger(saved) && saved >= 0 && saved < februaryDinnerChoices.length ? saved : null
  })
  const [februaryTableCharacter, setFebruaryTableCharacter] = useState<FebruaryCharacterId | null>(() => {
    const saved = localStorage.getItem('mayday-february-table-character')
    return saved && ['wen', 'ashin', 'masa', 'stone', 'yanming'].includes(saved) ? saved as FebruaryCharacterId : null
  })
  const [februaryAfterDinnerCharacter, setFebruaryAfterDinnerCharacter] = useState<FebruaryCharacterId | null>(() => {
    const saved = localStorage.getItem('mayday-february-after-dinner-character')
    return saved && ['wen', 'ashin', 'masa', 'stone', 'yanming'].includes(saved) ? saved as FebruaryCharacterId : null
  })
  const [februaryAfterDinnerReplies, setFebruaryAfterDinnerReplies] = useState<number[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-february-after-dinner-replies') ?? '[]')
      return Array.isArray(saved) ? saved.filter((value): value is number => Number.isInteger(value) && value >= 0 && value <= 2).slice(0, 3) : []
    } catch { return [] }
  })
  const [februaryDiaryUnlocked, setFebruaryDiaryUnlocked] = useState(() => localStorage.getItem('mayday-february-diary-unlocked') === 'true')
  const [februaryDiaryData, setFebruaryDiaryData] = useState<FebruaryDiaryData | null>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-february-diary-data') ?? 'null') as FebruaryDiaryData | null
      return saved && typeof saved.title === 'string' && typeof saved.text === 'string' ? saved : null
    } catch { return null }
  })
  const [springInviteCandidates, setSpringInviteCandidates] = useState<SpringCharacterId[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-spring-invite-candidates') ?? '[]')
      return Array.isArray(saved) ? saved.filter((id): id is SpringCharacterId => springCharacterOrder.includes(id)) : []
    } catch { return [] }
  })
  const [springInviteTarget, setSpringInviteTarget] = useState<SpringCharacterId | null>(() => {
    const saved = localStorage.getItem('mayday-spring-invite-target')
    return saved && springCharacterOrder.includes(saved as SpringCharacterId) ? saved as SpringCharacterId : null
  })
  const [springInviteReplies, setSpringInviteReplies] = useState<number[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-spring-invite-replies') ?? '[]')
      return Array.isArray(saved) ? saved.filter((value): value is number => Number.isInteger(value) && value >= 0 && value <= 2).slice(0, 3) : []
    } catch { return [] }
  })
  const [springInviteDeclined, setSpringInviteDeclined] = useState<SpringCharacterId[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-spring-invite-declined') ?? '[]')
      return Array.isArray(saved) ? saved.filter((id): id is SpringCharacterId => springCharacterOrder.includes(id)) : []
    } catch { return [] }
  })
  const [springStoreCharacter, setSpringStoreCharacter] = useState<SpringCharacterId | null>(() => {
    const saved = localStorage.getItem('mayday-spring-store-character')
    return saved && springCharacterOrder.includes(saved as SpringCharacterId) ? saved as SpringCharacterId : null
  })
  const [springStoreReply, setSpringStoreReply] = useState<number | null>(() => {
    const saved = Number(localStorage.getItem('mayday-spring-store-reply') ?? '-1')
    return Number.isInteger(saved) && saved >= 0 && saved < 3 ? saved : null
  })
  const [springStoreSecondReply, setSpringStoreSecondReply] = useState<number | null>(() => {
    const saved = Number(localStorage.getItem('mayday-spring-store-second-reply') ?? '-1')
    return Number.isInteger(saved) && saved >= 0 && saved < 3 ? saved : null
  })
  const [springStoreThirdReply, setSpringStoreThirdReply] = useState<number | null>(() => {
    const saved = Number(localStorage.getItem('mayday-spring-store-third-reply') ?? '-1')
    return Number.isInteger(saved) && saved >= 0 && saved < 3 ? saved : null
  })
  const [springAfterChoice, setSpringAfterChoice] = useState<'yanming-dinner' | 'lesson' | 'home' | null>(() => {
    const saved = localStorage.getItem('mayday-spring-after-choice')
    return saved === 'yanming-dinner' || saved === 'lesson' || saved === 'home' ? saved : null
  })
  const [springLessonCharacter, setSpringLessonCharacter] = useState<Exclude<SpringCharacterId, 'yanming'> | null>(() => {
    const saved = localStorage.getItem('mayday-spring-lesson-character')
    return saved && ['wen', 'ashin', 'masa', 'stone'].includes(saved) ? saved as Exclude<SpringCharacterId, 'yanming'> : null
  })
  const [springLessonReplies, setSpringLessonReplies] = useState<number[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-spring-lesson-replies') ?? '[]') as unknown
      return Array.isArray(saved)
        ? saved.filter((value): value is number => Number.isInteger(value) && value >= 0 && value < 3).slice(0, 6)
        : []
    } catch {
      return []
    }
  })
  const [springDinnerReplies, setSpringDinnerReplies] = useState<number[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-spring-dinner-replies') ?? 'null') as unknown
      if (Array.isArray(saved)) {
        return saved.filter((value): value is number => Number.isInteger(value) && value >= 0 && value < 3).slice(0, 6)
      }
    } catch {
      // Fall back to the earlier one-choice save format.
    }
    const legacy = Number(localStorage.getItem('mayday-spring-dinner-reply') ?? '-1')
    return Number.isInteger(legacy) && legacy >= 0 && legacy < 3 ? [legacy] : []
  })
  const [springSmsTarget, setSpringSmsTarget] = useState<SpringCharacterId | null>(() => {
    const saved = localStorage.getItem('mayday-spring-sms-target')
    return saved && springCharacterOrder.includes(saved as SpringCharacterId) ? saved as SpringCharacterId : null
  })
  const [springSmsRound, setSpringSmsRound] = useState(() => Number(localStorage.getItem('mayday-spring-sms-round') ?? '0'))
  const [springSmsReplied, setSpringSmsReplied] = useState(() => localStorage.getItem('mayday-spring-sms-replied') === 'true')
  const [springSmsOpeningSent, setSpringSmsOpeningSent] = useState(() => localStorage.getItem('mayday-spring-sms-opening-sent') === 'true')
  const [springSmsOpeningChoice, setSpringSmsOpeningChoice] = useState<number | null>(() => {
    const saved = Number(localStorage.getItem('mayday-spring-sms-opening-choice') ?? '-1')
    return Number.isInteger(saved) && saved >= 0 && saved <= 2 ? saved : null
  })
  const [springSmsReplies, setSpringSmsReplies] = useState<number[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-spring-sms-replies') ?? '[]')
      return Array.isArray(saved) ? saved.filter((value): value is number => Number.isInteger(value) && value >= 0 && value <= 2).slice(0, 5) : []
    } catch { return [] }
  })
  const [springSmsEventStarted, setSpringSmsEventStarted] = useState(() => {
    const savedStage = localStorage.getItem('mayday-story-stage') === 'paused'
      ? localStorage.getItem('mayday-resume-stage')
      : localStorage.getItem('mayday-story-stage')
    return localStorage.getItem('mayday-spring-sms-event-started') === 'true' ||
      (savedStage === 'spring-sms-chat' && Boolean(localStorage.getItem('mayday-spring-sms-target')))
  })
  const [springSmsEventComplete, setSpringSmsEventComplete] = useState(() => {
    const savedStage = localStorage.getItem('mayday-story-stage') === 'paused'
      ? localStorage.getItem('mayday-resume-stage')
      : localStorage.getItem('mayday-story-stage')
    return localStorage.getItem('mayday-spring-sms-event-complete') === 'true' ||
      localStorage.getItem('mayday-spring-day-complete') === 'true' ||
      savedStage === 'spring-diary' ||
      savedStage === 'spring-free-chat-picker' ||
      savedStage === 'spring-free-chat'
  })
  const [springDiaryUnlocked, setSpringDiaryUnlocked] = useState(() => localStorage.getItem('mayday-spring-diary-unlocked') === 'true')
  const [springDiaryData, setSpringDiaryData] = useState<{ title: string; text: string } | null>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-spring-diary-data') ?? localStorage.getItem('mayday-spring-diary-pending-data') ?? 'null') as { title?: unknown; text?: unknown } | null
      return saved && typeof saved.title === 'string' && typeof saved.text === 'string' ? { title: saved.title, text: saved.text } : null
    } catch { return null }
  })
  const [march28VisitCharacter, setMarch28VisitCharacter] = useState<March28CharacterId | null>(() => {
    const saved = localStorage.getItem('mayday-march28-visit-character')
    return saved && march28CharacterOrder.includes(saved as March28CharacterId) ? saved as March28CharacterId : null
  })
  const [march28VisitReplies, setMarch28VisitReplies] = useState<number[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-march28-visit-replies') ?? '[]')
      return Array.isArray(saved) ? saved.filter((value): value is number => Number.isInteger(value) && value >= 0 && value < 3).slice(0, 5) : []
    } catch { return [] }
  })
  const [march28DayComplete, setMarch28DayComplete] = useState(() => localStorage.getItem('mayday-march28-day-complete') === 'true')
  const [march28ParkChoice, setMarch28ParkChoice] = useState<'go' | 'skip' | 'return' | 'stay' | null>(() => {
    const saved = localStorage.getItem('mayday-march28-park-choice')
    return saved === 'go' || saved === 'skip' || saved === 'return' || saved === 'stay' ? saved : null
  })
  const [march28MorningCharacter, setMarch28MorningCharacter] = useState<March28CharacterId | null>(() => {
    const saved = localStorage.getItem('mayday-march28-morning-character')
    return saved && march28CharacterOrder.includes(saved as March28CharacterId) ? saved as March28CharacterId : null
  })
  const [march28MorningReplies, setMarch28MorningReplies] = useState<number[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-march28-morning-replies') ?? '[]')
      return Array.isArray(saved) ? saved.filter((value): value is number => Number.isInteger(value) && value >= 0 && value < 3).slice(0, 3) : []
    } catch { return [] }
  })
  const [march28ParkStayReplies, setMarch28ParkStayReplies] = useState<number[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-march28-park-stay-replies') ?? '[]')
      return Array.isArray(saved) ? saved.filter((value): value is number => Number.isInteger(value) && value >= 0 && value < 3).slice(0, 8) : []
    } catch { return [] }
  })
  const [march28DiaryUnlocked, setMarch28DiaryUnlocked] = useState(() => localStorage.getItem('mayday-march28-park-choice') !== 'stay' && localStorage.getItem('mayday-march28-diary-unlocked') === 'true')
  const [march28DiaryData, setMarch28DiaryData] = useState<March28DiaryData | null>(() => {
    const savedChoice = localStorage.getItem('mayday-march28-park-choice')
    if (savedChoice === 'stay') return null
    if (localStorage.getItem('mayday-march28-diary-copy-version') !== MARCH28_DIARY_COPY_VERSION) {
      const savedCharacter = localStorage.getItem('mayday-march28-visit-character')
      if (savedCharacter && march28CharacterOrder.includes(savedCharacter as March28CharacterId) && (savedChoice === 'skip' || savedChoice === 'return')) {
        let savedReplies: number[] = []
        try {
          const parsed = JSON.parse(localStorage.getItem('mayday-march28-visit-replies') ?? '[]')
          if (Array.isArray(parsed)) savedReplies = parsed.filter((value): value is number => Number.isInteger(value) && value >= 0 && value < 3).slice(0, 5)
        } catch { savedReplies = [] }
        const updated = buildMarch28DiaryData(savedCharacter as March28CharacterId, savedChoice, savedReplies)
        localStorage.setItem('mayday-march28-diary-data', JSON.stringify(updated))
        localStorage.setItem('mayday-march28-diary-copy-version', MARCH28_DIARY_COPY_VERSION)
        return updated
      }
    }
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-march28-diary-data') ?? 'null') as Partial<March28DiaryData> | null
      return saved && typeof saved.title === 'string' && typeof saved.text === 'string' ? { title: saved.title, text: saved.text } : null
    } catch { return null }
  })
  const [march29DiaryUnlocked, setMarch29DiaryUnlocked] = useState(() => localStorage.getItem('mayday-march29-diary-unlocked') === 'true')
  const [march29DiaryData, setMarch29DiaryData] = useState<March29DiaryData | null>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-march29-diary-data') ?? 'null') as Partial<March29DiaryData> | null
      return saved && typeof saved.title === 'string' && typeof saved.text === 'string' ? { title: saved.title, text: saved.text } : null
    } catch { return null }
  })
  const [april12DiaryUnlocked, setApril12DiaryUnlocked] = useState(() => localStorage.getItem('mayday-april12-diary-unlocked') === 'true')
  const [april12DiaryData, setApril12DiaryData] = useState<April12DiaryData | null>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-april12-diary-data') ?? 'null') as Partial<April12DiaryData> | null
      return saved && typeof saved.title === 'string' && typeof saved.text === 'string' ? { title: saved.title, text: saved.text } : null
    } catch { return null }
  })
  const [april20DiaryUnlocked, setApril20DiaryUnlocked] = useState(() =>
    localStorage.getItem('mayday-april20-diary-unlocked') === 'true' || localStorage.getItem('mayday-april20-day-complete') === 'true'
  )
  const [april20DiaryData, setApril20DiaryData] = useState<April20DiaryData | null>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-april20-diary-data') ?? 'null') as Partial<April20DiaryData> | null
      if (saved && typeof saved.title === 'string' && typeof saved.text === 'string') return { title: saved.title, text: saved.text }
    } catch { /* Rebuild the entry from the completed route below. */ }
    if (localStorage.getItem('mayday-april20-day-complete') === 'true') {
      const route = localStorage.getItem('mayday-april20-route') === 'park' ? 'park' : 'rehearsal'
      const rebuilt = buildApril20DiaryData(route)
      localStorage.setItem('mayday-april20-diary-data', JSON.stringify(rebuilt))
      localStorage.setItem('mayday-april20-diary-unlocked', 'true')
      return rebuilt
    }
    return null
  })
  const [april30DiaryUnlocked, setApril30DiaryUnlocked] = useState(() =>
    localStorage.getItem('mayday-april30-diary-unlocked') === 'true' || localStorage.getItem('mayday-april30-day-complete') === 'true'
  )
  const [april30DiaryData, setApril30DiaryData] = useState<April30DiaryData | null>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-april30-diary-data') ?? 'null') as Partial<April30DiaryData> | null
      if (saved && typeof saved.title === 'string' && typeof saved.text === 'string') {
        const savedRoute = localStorage.getItem('mayday-april30-route') as April30Route | null
        if (savedRoute && localStorage.getItem('mayday-april30-day-complete') === 'true') {
          const rebuilt = buildApril30DiaryData(savedRoute)
          if (saved.text !== rebuilt.text) {
            localStorage.setItem('mayday-april30-diary-data', JSON.stringify(rebuilt))
            return rebuilt
          }
        }
        return { title: saved.title, text: saved.text }
      }
    } catch { /* Rebuild the entry from the completed day below. */ }
    if (localStorage.getItem('mayday-april30-day-complete') === 'true') {
      const rebuilt = buildApril30DiaryData()
      localStorage.setItem('mayday-april30-diary-data', JSON.stringify(rebuilt))
      localStorage.setItem('mayday-april30-diary-unlocked', 'true')
      return rebuilt
    }
    return null
  })
  const [may10DiaryUnlocked, setMay10DiaryUnlocked] = useState(() =>
    localStorage.getItem('mayday-may10-diary-unlocked') === 'true' || localStorage.getItem('mayday-may10-day-complete') === 'true'
  )
  const [may10DiaryData, setMay10DiaryData] = useState<May10DiaryData | null>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mayday-may10-diary-data') ?? 'null') as Partial<May10DiaryData> | null
      if (saved && saved.version === 2 && typeof saved.title === 'string' && typeof saved.text === 'string') return { version: 2, title: saved.title, text: saved.text }
    } catch { /* Rebuild the entry from the completed day below. */ }
    if (localStorage.getItem('mayday-may10-day-complete') === 'true') {
      const validCharacters: May10Character[] = ['wen', 'ashin', 'masa', 'stone', 'yanming']
      const savedCharacter = localStorage.getItem('mayday-may10-character')
      const savedJealousyCharacter = localStorage.getItem('mayday-may10-jealousy-character')
      const selection = {
        character: validCharacters.includes(savedCharacter as May10Character) ? savedCharacter as May10Character : null,
        jealousyCharacter: validCharacters.includes(savedJealousyCharacter as May10Character) ? savedJealousyCharacter as May10Character : null,
      }
      const rebuilt = buildMay10DiaryData(selection)
      localStorage.setItem('mayday-may10-diary-data', JSON.stringify(rebuilt))
      localStorage.setItem('mayday-may10-diary-unlocked', 'true')
      return rebuilt
    }
    return null
  })
  const [juneDiaryUnlocked, setJuneDiaryUnlocked] = useState(() => localStorage.getItem('mayday-june-diary-unlocked') === 'true')
  const [juneDiaryData, setJuneDiaryData] = useState<JuneDiaryData | null>(() => {
    const storedText = localStorage.getItem('mayday-june-diary-data') ?? localStorage.getItem('mayday-june-diary-pending-data')
    if (storedText) {
      try {
        const saved = JSON.parse(storedText) as Partial<JuneDiaryData> | null
        if (saved && typeof saved.title === 'string' && typeof saved.text === 'string') return { title: saved.title, text: saved.text }
      } catch { /* Rebuild from the recorded study and SMS choices below. */ }
    }
    const validCharacters: RouteCharacterId[] = ['wen', 'ashin', 'masa', 'stone', 'yanming']
    const studyCharacter = localStorage.getItem('mayday-june-study-character')
    const chatCharacter = localStorage.getItem('mayday-june-free-chat-target')
    if (localStorage.getItem('mayday-june-free-chat-complete') !== 'true' ||
      !validCharacters.includes(studyCharacter as RouteCharacterId) ||
      !validCharacters.includes(chatCharacter as RouteCharacterId)) return null
    const readChoices = (key: string) => {
      try {
        const value = JSON.parse(localStorage.getItem(key) ?? '[]')
        return Array.isArray(value) ? value.filter((choice): choice is number => Number.isInteger(choice) && choice >= 0 && choice <= 2).slice(0, 5) : []
      } catch { return [] }
    }
    return buildJuneDiaryData({
      studyCharacter: studyCharacter as JuneStudySelection['character'],
      studyChoices: readChoices('mayday-june-study-choices'),
      chatCharacter: chatCharacter as RouteCharacterId,
      chatChoices: readChoices('mayday-june-free-chat-replies'),
    })
  })
  const [augustDiaryUnlocked, setAugustDiaryUnlocked] = useState(() => localStorage.getItem('mayday-august-diary-unlocked') === 'true')
  const [augustDiaryData, setAugustDiaryData] = useState<AugustDiaryData | null>(() => {
    const storedText = localStorage.getItem('mayday-august-diary-data') ?? localStorage.getItem('mayday-august-diary-pending-data')
    if (storedText) {
      try {
        const saved = JSON.parse(storedText) as Partial<AugustDiaryData> | null
        if (saved && saved.version === 1 && typeof saved.title === 'string' && typeof saved.text === 'string') {
          return { version: 1, title: saved.title, text: saved.text }
        }
      } catch { /* Rebuild the diary from the completed August choices below. */ }
    }
    if (localStorage.getItem('mayday-august-day-complete') !== 'true') return null
    const validCharacters: AugustCharacter[] = ['wen', 'ashin', 'masa', 'stone', 'yanming']
    const readArray = (key: string): unknown[] => {
      try {
        const parsed = JSON.parse(localStorage.getItem(key) ?? '[]') as unknown
        return Array.isArray(parsed) ? parsed : []
      } catch { return [] }
    }
    const storeCandidates = readArray('mayday-august-store-candidates')
      .filter((item): item is AugustCharacter => typeof item === 'string' && validCharacters.includes(item as AugustCharacter))
    const readChoices = (key: string) => readArray(key)
      .filter((item): item is number => Number.isInteger(item) && Number(item) >= 0 && Number(item) <= 2)
      .slice(0, 5)
    const storeChoices = readChoices('mayday-august-store-choices')
    const eveningChoices = readChoices('mayday-august-evening-choices')
    const eveningRoute = localStorage.getItem('mayday-august-evening-route')
    const eveningCharacter = localStorage.getItem('mayday-august-evening-character')
    const validEveningCharacter = validCharacters.includes(eveningCharacter as AugustCharacter)
    if ((storeCandidates.length > 0 && storeChoices.length !== 5) ||
      (storeCandidates.length === 0 && storeChoices.length !== 0) ||
      eveningChoices.length !== 5 ||
      (eveningRoute !== 'fried' && eveningRoute !== 'yanming') ||
      !validEveningCharacter ||
      (eveningRoute === 'fried' && eveningCharacter === 'yanming') ||
      (eveningRoute === 'yanming' && eveningCharacter !== 'yanming')) return null
    const rebuilt = buildAugustDiaryData({
      storeCandidates,
      storeChoices,
      eveningRoute,
      eveningCharacter: eveningCharacter as AugustCharacter,
      eveningChoices,
    })
    localStorage.setItem('mayday-august-diary-data', JSON.stringify(rebuilt))
    localStorage.setItem('mayday-august-diary-unlocked', 'true')
    return rebuilt
  })
  const [septemberDiaryUnlocked, setSeptemberDiaryUnlocked] = useState(() => localStorage.getItem('mayday-september-diary-unlocked') === 'true')
  const [septemberDiaryData, setSeptemberDiaryData] = useState<SeptemberDiaryData | null>(() => {
    const storedText = localStorage.getItem('mayday-september-diary-data') ?? localStorage.getItem('mayday-september-diary-pending-data')
    if (!storedText) return null
    try {
      const saved = JSON.parse(storedText) as Partial<SeptemberDiaryData> | null
      if (saved && saved.version === 1 && typeof saved.title === 'string' && typeof saved.text === 'string' && typeof saved.photoCaption === 'string') {
        return { version: 1, title: saved.title, text: saved.text, photoCaption: saved.photoCaption }
      }
    } catch { /* The September diary is rebuilt when the trip is completed again. */ }
    return null
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
      return saved && freeTimeOrder.includes(saved.character) && ['first-chapter', 'day2', 'free-chat', 'month-visit', 'month-free-chat', 'next-month-invite', 'next-month-open-day', 'next-month-free-chat'].includes(saved.source) && typeof saved.date === 'string' ? saved : null
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
    const valid: StoryStage[] = ['notification', 'messages', 'reply', 'walk', 'studio', 'reunion', 'reunion-chat', 'nickname', 'rehearsal', 'dinner', 'after-dinner', 'ending', 'completed', 'greetings', 'classroom', 'masa-checkin', 'stone-checkin', 'ice-date', 'stroll', 'day2-diary', 'free-time', 'free-chat', 'day2-complete', 'month-free-time', 'month-visit', 'month-visit-complete', 'month-free-chat', 'month-diary', 'next-month-intro', 'next-month-invite-notification', 'next-month-invite-picker', 'next-month-invite', 'next-month-invite-chat', 'next-month-invite-date', 'next-month-open-day', 'next-month-open-day-picker', 'next-month-open-day-visit', 'next-month-open-day-visit-complete', 'next-month-free-chat', 'next-month-diary', 'year-end-intro', 'year-end-invite-notification', 'year-end-invite-picker', 'year-end-shopping-notification', 'year-end-shopping-chat', 'year-end-shopping', 'year-end-fireworks', 'year-end-new-year-notification', 'year-end-new-year-chat', 'year-end-free-chat', 'year-end-free-chat-picker', 'year-end-diary', 'winter-exam-intro', 'winter-exam-notification', 'winter-exam-chat', 'winter-exam-tutoring', 'winter-break-practice', 'winter-break-gig', 'winter-break-pickup', 'winter-break-bus-choice', 'winter-break-bus', 'winter-diary', 'february-intro', 'february-secret', 'february-dinner', 'february-table', 'february-after-dinner-picker', 'february-after-dinner', 'february-diary', 'spring-term-intro', 'spring-invite-picker', 'spring-invite-notification', 'spring-invite-chat', 'spring-store', 'spring-rehearsal', 'spring-after-picker', 'spring-lesson', 'spring-dinner', 'spring-sms-picker', 'spring-sms-chat', 'spring-diary', 'march28-intro', 'march28-visit', 'march28-end', 'march28-park', 'march28-park-stay', 'march28-morning', 'march28-diary', 'march29-show', 'april12-story', 'april20-story', 'april30-story', 'may10-story', 'june-study', 'june-free-chat', 'june-diary', 'june-study-complete', 'july-lost-key', 'august-story', 'august-diary', 'september-intro', 'september-story', 'september-diary']
    return saved && valid.includes(saved as StoryStage) ? saved as StoryStage : 'reunion'
  })
  const messageScrollRef = useRef<HTMLDivElement>(null)
  const callTranscriptRef = useRef<HTMLDivElement>(null)
  const currentTime =
    storyStage === 'paused' && resumeStage === 'september-story' ? septemberClock
      : storyStage === 'september-story' ? septemberClock
        : storyStage === 'september-diary' ? '21:30'
          : storyStage === 'paused' && resumeStage === 'september-intro' ? '19:10'
            : storyStage === 'september-intro' ? '19:10'
        : storyStage === 'paused' && resumeStage === 'august-diary' ? '21:30'
          : storyStage === 'august-diary' ? '21:30'
            : storyStage === 'paused' && resumeStage === 'august-story' ? augustClock
      : storyStage === 'august-story' ? augustClock
        : storyStage === 'paused' && resumeStage === 'july-lost-key' ? julyLostKeyClock
      : storyStage === 'july-lost-key' ? julyLostKeyClock
        : storyStage === 'paused' && resumeStage === 'june-diary' ? '21:30'
      : storyStage === 'paused' && resumeStage === 'june-study' ? juneStudyClock
      : storyStage === 'june-study' ? juneStudyClock
        : storyStage === 'june-study-complete' ? '17:10'
          : storyStage === 'june-diary' ? '21:30'
          : storyStage === 'june-free-chat' ? (juneFreeChatTarget ? '17:20' : '17:15')
          : storyStage === 'notification' || storyStage === 'messages' ? '15:42'
      : storyStage === 'walk' ? '16:30'
        : storyStage === 'dinner' ? '19:10'
          : storyStage === 'after-dinner' ? '20:35'
            : storyStage === 'ending' || storyStage === 'greetings' ? '21:18'
              : storyStage === 'completed' ? (localStorage.getItem('mayday-september-day-complete') === 'true' ? '21:30' : localStorage.getItem('mayday-august-day-complete') === 'true' ? '21:30' : localStorage.getItem('mayday-july-lost-key-day-complete') === 'true' ? '21:15' : localStorage.getItem('mayday-june-diary-unlocked') === 'true' ? '21:30' : localStorage.getItem('mayday-may10-day-complete') === 'true' ? '17:25' : localStorage.getItem('mayday-april30-day-complete') === 'true' ? '17:30' : localStorage.getItem('mayday-april20-day-complete') === 'true' ? '17:50' : localStorage.getItem('mayday-april12-diary-unlocked') === 'true' ? '22:00' : localStorage.getItem('mayday-march29-diary-unlocked') === 'true' ? '21:30' : localStorage.getItem('mayday-march28-park-choice') === 'stay' && localStorage.getItem('mayday-march28-day-complete') === 'true' ? (localStorage.getItem('mayday-march28-morning-complete') === 'true' ? '07:30' : '05:40') : localStorage.getItem('mayday-march28-day-complete') === 'true' ? '18:45' : localStorage.getItem('mayday-february-day-complete') === 'true' ? '22:30' : localStorage.getItem('mayday-winter-break-day-complete') === 'true' ? '00:30' : localStorage.getItem('mayday-year-end-day-complete') === 'true' ? '00:40' : '21:18')
              : storyStage === 'classroom' || storyStage === 'masa-checkin' || storyStage === 'stone-checkin' ? '10:12'
                : storyStage === 'ice-date' ? '16:20'
                  : storyStage === 'stroll' ? '17:05'
                    : storyStage === 'day2-diary' ? '18:00'
                      : storyStage === 'free-time' || storyStage === 'free-chat' || storyStage === 'day2-complete' ? '18:20'
                        : ['month-free-time', 'month-visit'].includes(storyStage) ? '10:30'
                          : storyStage === 'month-visit-complete' || storyStage === 'month-free-chat' ? '18:10'
                            : storyStage === 'month-diary' || storyStage === 'next-month-diary' ? '20:45'
                              : storyStage === 'next-month-free-chat' ? '20:10'
                                : ['next-month-intro', 'next-month-invite-notification', 'next-month-invite-picker', 'next-month-invite', 'next-month-invite-chat', 'next-month-invite-date', 'next-month-open-day', 'next-month-open-day-picker', 'next-month-open-day-visit', 'next-month-open-day-visit-complete'].includes(storyStage) ? '10:30'
                                  : ['year-end-intro', 'year-end-invite-notification', 'year-end-invite-picker', 'year-end-shopping-notification', 'year-end-shopping-chat', 'year-end-shopping'].includes(storyStage) ? '14:30'
                                    : storyStage === 'year-end-fireworks' ? '23:40'
                                      : ['year-end-new-year-notification', 'year-end-new-year-chat', 'year-end-free-chat', 'year-end-free-chat-picker'].includes(storyStage) ? '00:15'
                                        : storyStage === 'year-end-diary' ? '00:40'
                                          : storyStage === 'winter-exam-intro' ? '18:40'
                                            : storyStage === 'winter-exam-notification' ? '19:00'
                                              : storyStage === 'winter-exam-chat' ? '19:05'
                                                : storyStage === 'winter-exam-tutoring' ? '14:10'
                                              : storyStage === 'winter-break-practice' ? '16:30'
                                                : storyStage === 'winter-break-gig' ? '21:15'
                                                  : storyStage === 'winter-break-pickup' || storyStage === 'winter-break-bus-choice' || storyStage === 'winter-break-bus' ? '23:20'
                                                    : storyStage === 'winter-diary' ? '00:30'
                                                      : storyStage === 'february-intro' ? '15:00'
                                                        : storyStage === 'february-secret' ? '16:30'
                                                          : storyStage === 'february-dinner' ? '18:30'
                                                            : storyStage === 'february-table' ? '19:15'
                                                              : storyStage === 'february-after-dinner-picker' ? '19:45'
                                                                : storyStage === 'february-after-dinner' ? '20:00'
                                                                  : storyStage === 'february-diary' ? '22:00'
                                                                    : ['spring-term-intro', 'spring-invite-picker', 'spring-invite-notification', 'spring-invite-chat'].includes(storyStage) ? '14:00'
                                                                      : storyStage === 'spring-store' ? '15:00'
                                                                        : storyStage === 'spring-rehearsal' ? '16:30'
                                                                          : storyStage === 'spring-after-picker' ? '18:30'
                                                                            : storyStage === 'spring-lesson' || storyStage === 'spring-dinner' ? '19:00'
                                                                              : ['spring-sms-picker', 'spring-sms-chat'].includes(storyStage) ? '21:00'
                                                                                : storyStage === 'spring-diary' ? '22:30'
                                                                     : storyStage === 'march28-intro' ? '09:40'
                                                                       : storyStage === 'march28-visit' ? '13:20'
                                                                         : storyStage === 'march28-end' ? '20:20'
                                                                         : storyStage === 'march28-park' ? '20:40'
                                                                           : storyStage === 'march28-park-stay' ? (march28ParkStayReplies.length >= 8 ? '05:40' : march28ParkStayReplies.length >= 7 ? '03:10' : march28ParkStayReplies.length >= 6 ? '01:30' : march28ParkStayReplies.length >= 5 ? '00:20' : march28ParkStayReplies.length >= 4 ? '23:10' : march28ParkStayReplies.length >= 3 ? '22:30' : march28ParkStayReplies.length >= 2 ? '22:00' : march28ParkStayReplies.length >= 1 ? '21:35' : '21:10')
                                                                             : storyStage === 'march28-morning' ? '07:10'
                                                                              : storyStage === 'march29-show' ? march29Clock
                                                                             : storyStage === 'may10-story' ? may10Clock
                                                                             : storyStage === 'april30-story' ? april30Clock
                                                                              : storyStage === 'april20-story' ? april20Clock
                                                                             : storyStage === 'april12-story' ? april12Clock
                                                                             : storyStage === 'march28-diary' ? '22:00'
                                                                               : '17:20'
  const effectiveDateStage = storyStage === 'paused' ? resumeStage : storyStage
  const isSecondDay = ['classroom', 'masa-checkin', 'stone-checkin', 'ice-date', 'stroll', 'day2-diary', 'free-time', 'free-chat', 'day2-complete'].includes(effectiveDateStage)
  const isNextMonth = ['next-month-intro', 'next-month-invite-notification', 'next-month-invite-picker', 'next-month-invite', 'next-month-invite-chat', 'next-month-invite-date', 'next-month-open-day', 'next-month-open-day-picker', 'next-month-open-day-visit', 'next-month-open-day-visit-complete', 'next-month-free-chat', 'next-month-diary'].includes(effectiveDateStage) || localStorage.getItem('mayday-next-month-day-complete') === 'true'
  const isMonthLater = ['month-free-time', 'month-visit', 'month-visit-complete', 'month-free-chat', 'month-diary'].includes(effectiveDateStage) || localStorage.getItem('mayday-month-visit-complete') === 'true'
  const isWinterExam = ['winter-exam-intro', 'winter-exam-notification', 'winter-exam-chat', 'winter-exam-tutoring'].includes(effectiveDateStage)
  const isFebruary = ['february-intro', 'february-secret', 'february-dinner', 'february-table', 'february-after-dinner-picker', 'february-after-dinner', 'february-diary'].includes(effectiveDateStage) || localStorage.getItem('mayday-february-day-complete') === 'true'
  const isMarch28 = localStorage.getItem('mayday-march29-complete') !== 'true' && (['march28-intro', 'march28-visit', 'march28-end', 'march28-park', 'march28-park-stay', 'march28-morning', 'march28-diary'].includes(effectiveDateStage) || localStorage.getItem('mayday-march28-started') === 'true' || localStorage.getItem('mayday-march28-day-complete') === 'true')
  const isSpringTerm = ['spring-term-intro', 'spring-invite-picker', 'spring-invite-notification', 'spring-invite-chat', 'spring-store', 'spring-rehearsal', 'spring-after-picker', 'spring-lesson', 'spring-dinner', 'spring-sms-picker', 'spring-sms-chat', 'spring-diary', 'march28-intro', 'march28-visit', 'march28-end', 'march28-park', 'march28-park-stay', 'march28-morning', 'march28-diary', 'march29-show', 'april20-story', 'april30-story', 'may10-story', 'june-study', 'june-free-chat', 'june-diary', 'june-study-complete'].includes(effectiveDateStage) || localStorage.getItem('mayday-spring-day-complete') === 'true' || localStorage.getItem('mayday-april20-day-complete') === 'true' || localStorage.getItem('mayday-april30-day-complete') === 'true' || localStorage.getItem('mayday-may10-day-complete') === 'true' || localStorage.getItem('mayday-june-study-day-complete') === 'true'
  const isWinterBreak = ['winter-break-practice', 'winter-break-gig', 'winter-break-pickup', 'winter-break-bus-choice', 'winter-break-bus', 'winter-diary'].includes(effectiveDateStage) || isFebruary || localStorage.getItem('mayday-winter-break-day-complete') === 'true'
  const isYearEnd = ['year-end-intro', 'year-end-invite-notification', 'year-end-invite-picker', 'year-end-shopping-notification', 'year-end-shopping-chat', 'year-end-shopping', 'year-end-fireworks', 'year-end-new-year-notification', 'year-end-new-year-chat', 'year-end-free-chat', 'year-end-free-chat-picker', 'year-end-diary'].includes(effectiveDateStage) || localStorage.getItem('mayday-year-end-day-complete') === 'true'
  const isNewYear = ['year-end-new-year-notification', 'year-end-new-year-chat', 'year-end-free-chat', 'year-end-free-chat-picker', 'year-end-diary'].includes(effectiveDateStage) || (effectiveDateStage === 'completed' && localStorage.getItem('mayday-year-end-day-complete') === 'true' && localStorage.getItem('mayday-winter-break-day-complete') !== 'true')
  const saveGameDate = effectiveDateStage === 'september-intro' ? '1997.09.03' : effectiveDateStage === 'september-story' || effectiveDateStage === 'september-diary' ? (localStorage.getItem('mayday-september-date') ?? '1997.09.04') : effectiveDateStage === 'completed' && localStorage.getItem('mayday-september-day-complete') === 'true' ? '1997.09.06' : effectiveDateStage === 'august-story' || effectiveDateStage === 'august-diary' || (effectiveDateStage === 'completed' && localStorage.getItem('mayday-august-day-complete') === 'true') ? '1997.08.01' : effectiveDateStage === 'july-lost-key' || (effectiveDateStage === 'completed' && localStorage.getItem('mayday-july-lost-key-day-complete') === 'true') ? '1997.07.15' : effectiveDateStage === 'june-study' || effectiveDateStage === 'june-free-chat' || effectiveDateStage === 'june-diary' || effectiveDateStage === 'june-study-complete' || (effectiveDateStage === 'completed' && localStorage.getItem('mayday-june-study-day-complete') === 'true') ? '1997.06.15' : effectiveDateStage === 'may10-story' || (effectiveDateStage === 'completed' && localStorage.getItem('mayday-may10-day-complete') === 'true') ? '1997.05.10' : effectiveDateStage === 'april30-story' || (effectiveDateStage === 'completed' && localStorage.getItem('mayday-april30-day-complete') === 'true') ? '1997.04.30' : effectiveDateStage === 'april20-story' || (effectiveDateStage === 'completed' && localStorage.getItem('mayday-april20-day-complete') === 'true') ? '1997.04.20' : effectiveDateStage === 'april12-story' || (effectiveDateStage === 'completed' && localStorage.getItem('mayday-april12-diary-unlocked') === 'true') ? '1997.04.12' : effectiveDateStage === 'march29-show' || effectiveDateStage === 'march28-morning' || (effectiveDateStage === 'completed' && localStorage.getItem('mayday-march29-diary-unlocked') === 'true') || (effectiveDateStage === 'completed' && localStorage.getItem('mayday-march28-park-choice') === 'stay' && localStorage.getItem('mayday-march28-day-complete') === 'true') ? '1997.03.29' : isMarch28 ? '1997.03.28' : isSpringTerm ? '1997.02.17' : isFebruary ? '1997.02.03' : isWinterBreak ? '1997.01.22' : isWinterExam ? (effectiveDateStage === 'winter-exam-tutoring' ? '1997.01.08' : '1997.01.07') : isNewYear ? '1997.01.01' : isYearEnd ? '1996.12.31' : isNextMonth ? '1996.12.14' : isMonthLater ? '1996.11.16' : isSecondDay ? '1996.10.16' : '1996.10.15'
  const [calendarYear, calendarMonth, calendarDay] = saveGameDate.split('.')
  const calendarDate = new Date(Number(calendarYear), Number(calendarMonth) - 1, Number(calendarDay))
  const calendarWeekday = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][calendarDate.getDay()]

  const buildCurrentSaveSnapshot = (): SaveSlotData => {
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
    put('mayday-month-diary-unlocked', String(monthDiaryUnlocked || localStorage.getItem('mayday-month-day-complete') === 'true'))
    put('mayday-sms-messages', JSON.stringify(smsMessagesRef.current))
    put('mayday-chat-messages', JSON.stringify(chatMessagesRef.current))
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
    put('mayday-month-free-chat-target', monthFreeChatTarget)
    put('mayday-month-free-chat-choice-pending', localStorage.getItem('mayday-month-free-chat-choice-pending'))
    put('mayday-month-visit-replies', JSON.stringify(monthVisitReplies))
    put('mayday-month-visit-choice', null)
    put('mayday-month-visit-complete', localStorage.getItem('mayday-month-visit-complete'))
    put('mayday-month-free-chat-round', String(monthFreeChatRound))
    put('mayday-month-free-chat-replied', String(monthFreeChatReplied))
    put('mayday-month-free-chat-started', String(monthFreeChatStarted))
    put('mayday-month-free-chat-opening-sent', String(monthFreeChatOpeningSent))
    put('mayday-month-free-chat-replies', JSON.stringify(monthFreeChatReplies))
    put('mayday-month-free-chat-complete', localStorage.getItem('mayday-month-free-chat-complete'))
    put('mayday-month-day-complete', localStorage.getItem('mayday-month-day-complete'))
    put('mayday-year-end-started', localStorage.getItem('mayday-year-end-started'))
    put('mayday-year-end-invite-check-done', localStorage.getItem('mayday-year-end-invite-check-done'))
    put('mayday-year-end-invite-candidates', JSON.stringify(yearEndInviteCandidates))
    put('mayday-year-end-invite-target', yearEndInviteTarget)
    put('mayday-year-end-shopping-reply-choice', yearEndShoppingReplyChoice === null ? null : String(yearEndShoppingReplyChoice))
    put('mayday-year-end-shopping-replies', JSON.stringify(yearEndShoppingReplies))
    put('mayday-year-end-fireworks-replies', JSON.stringify(yearEndFireworksReplies))
    put('mayday-year-end-greeting-queue', JSON.stringify(yearEndGreetingQueue))
    put('mayday-year-end-greeting-index', String(yearEndGreetingIndex))
    put('mayday-year-end-greeting-target', yearEndGreetingTarget)
    put('mayday-year-end-chat-mode', yearEndChatMode)
    put('mayday-year-end-first-reply-sent', String(yearEndFirstReplySent))
    put('mayday-year-end-free-chat-round', String(yearEndFreeChatRound))
    put('mayday-year-end-free-chat-replied', String(yearEndFreeChatReplied))
    put('mayday-year-end-free-chat-replies', JSON.stringify(yearEndFreeChatReplies))
    put('mayday-year-end-proactive-sent', JSON.stringify(yearEndProactiveSent))
    put('mayday-year-end-extended-chat-characters', JSON.stringify(yearEndExtendedChatCharacters))
    put('mayday-year-end-diary-unlocked', String(yearEndDiaryUnlocked))
    put('mayday-year-end-diary-data', yearEndDiaryData ? JSON.stringify(yearEndDiaryData) : null)
    put('mayday-winter-exam-chat-started', localStorage.getItem('mayday-winter-exam-chat-started'))
    put('mayday-winter-exam-chat-reply-choice', winterExamChatReplyChoice === null ? null : String(winterExamChatReplyChoice))
    put('mayday-winter-exam-chat-choice-confirmed-v2', localStorage.getItem('mayday-winter-exam-chat-choice-confirmed-v2'))
    put('mayday-winter-exam-chat-closing-choice', winterExamChatClosingChoice === null ? null : String(winterExamChatClosingChoice))
    put('mayday-winter-exam-tutoring-unlocked', String(winterExamTutoringUnlocked))
    put('mayday-winter-exam-replies', JSON.stringify(winterExamReplies))
    put('mayday-winter-practice-replies', JSON.stringify(winterPracticeReplies))
    put('mayday-winter-yanming-pickup-available', String(winterYanmingPickupAvailable))
    put('mayday-winter-bus-stop-character', winterBusStopCharacter)
    put('mayday-winter-bus-stop-replies', JSON.stringify(winterBusStopReplies))
    put('mayday-winter-diary-unlocked', String(winterDiaryUnlocked))
    put('mayday-winter-diary-data', winterDiaryData ? JSON.stringify(winterDiaryData) : null)
    put('mayday-february-secret-target', februarySecretTarget)
    put('mayday-february-secret-reply', februarySecretReply === null ? null : String(februarySecretReply))
    put('mayday-february-dinner-reply', februaryDinnerReply === null ? null : String(februaryDinnerReply))
    put('mayday-february-table-character', februaryTableCharacter)
    put('mayday-february-after-dinner-character', februaryAfterDinnerCharacter)
    put('mayday-february-after-dinner-replies', JSON.stringify(februaryAfterDinnerReplies))
    put('mayday-february-diary-unlocked', String(februaryDiaryUnlocked))
    put('mayday-february-diary-data', februaryDiaryData ? JSON.stringify(februaryDiaryData) : null)
    put('mayday-march28-started', localStorage.getItem('mayday-march28-started'))
    put('mayday-march28-visit-character', march28VisitCharacter)
    put('mayday-march28-visit-replies', JSON.stringify(march28VisitReplies))
    put('mayday-march28-visit-complete', localStorage.getItem('mayday-march28-visit-complete'))
    put('mayday-march28-day-complete', String(march28DayComplete))
    put('mayday-march28-park-choice', march28ParkChoice)
    put('mayday-march28-park-stay-replies', JSON.stringify(march28ParkStayReplies))
    put('mayday-march28-morning-character', march28MorningCharacter)
    put('mayday-march28-morning-replies', JSON.stringify(march28MorningReplies))
    put('mayday-march28-morning-complete', localStorage.getItem('mayday-march28-morning-complete'))
    put('mayday-march28-diary-unlocked', String(march28DiaryUnlocked))
    put('mayday-march28-diary-data', march28DiaryData ? JSON.stringify(march28DiaryData) : null)
    put('mayday-spring-sms-target', springSmsTarget)
    put('mayday-spring-sms-round', String(springSmsRound))
    put('mayday-spring-sms-replied', String(springSmsReplied))
    put('mayday-spring-sms-opening-sent', String(springSmsOpeningSent))
    put('mayday-spring-sms-opening-choice', springSmsOpeningChoice === null ? null : String(springSmsOpeningChoice))
    put('mayday-spring-sms-replies', JSON.stringify(springSmsReplies))
    put('mayday-spring-sms-mode', 'day')
    put('mayday-spring-sms-event-started', String(springSmsEventStarted))
    put('mayday-spring-sms-event-complete', String(springSmsEventComplete))
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

    return saved
  }

  autoStepCaptureRef.current = buildCurrentSaveSnapshot

  // Capture a complete game-state checkpoint after each persisted story step.
  // Storage writes from the same interaction are grouped so the checkpoint is
  // taken only after React has committed the selected choice and affection.
  useEffect(() => {
    const storage = window.localStorage
    const nativeSetItem = storage.setItem.bind(storage)
    const nativeRemoveItem = storage.removeItem.bind(storage)
    let timer: number | null = null

    const scheduleCapture = () => {
      if (!autoStepReadyRef.current) return
      if (timer !== null) window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        timer = null
        if (!autoStepReadyRef.current) return
        const capture = autoStepCaptureRef.current
        if (!capture) return
        try {
          const snapshot = capture()
          if (!snapshot.data['mayday-player-name']) return
          const fingerprint = getSaveSnapshotFingerprint(snapshot)
          if (fingerprint === autoStepLastFingerprintRef.current) return

          const sequence = ++autoStepSequenceRef.current
          const timestamp = Date.now() + sequence / 1000
          const record: AutoStepSnapshotRecord = {
            id: 'step-' + Math.floor(timestamp) + '-' + sequence,
            timestamp,
            date: snapshot.gameDate,
            time: snapshot.gameTime,
            stageLabel: snapshot.stageLabel,
            fingerprint,
            snapshot,
          }
          autoStepLastFingerprintRef.current = fingerprint
          void putAutoStepSnapshot(record).then(() => {
            setAutoStepSnapshots((current) => [...current, record])
            setAutoStepSnapshotError('')
          }).catch(() => {
            if (autoStepLastFingerprintRef.current === fingerprint) autoStepLastFingerprintRef.current = ''
            setAutoStepSnapshotError('有一個進度節點未能保存，請確認瀏覽器允許本機資料儲存。')
          })
        } catch {
          setAutoStepSnapshotError('自動記錄暫時失敗，請重新整理頁面後再試。')
        }
      }, 90)
    }

    autoStepScheduleRef.current = scheduleCapture
    const wrappedSetItem: Storage['setItem'] = (key, value) => {
      nativeSetItem(key, value)
      if (key.startsWith('mayday-') && !key.startsWith(SAVE_SLOT_PREFIX)) scheduleCapture()
    }
    const wrappedRemoveItem: Storage['removeItem'] = (key) => {
      nativeRemoveItem(key)
      if (key.startsWith('mayday-') && !key.startsWith(SAVE_SLOT_PREFIX)) scheduleCapture()
    }
    storage.setItem = wrappedSetItem
    storage.removeItem = wrappedRemoveItem

    return () => {
      if (timer !== null) window.clearTimeout(timer)
      if (storage.setItem === wrappedSetItem) storage.setItem = nativeSetItem
      if (storage.removeItem === wrappedRemoveItem) storage.removeItem = nativeRemoveItem
      autoStepScheduleRef.current = null
    }
  }, [])

  // Also observe React-only progress changes that do not write localStorage directly.
  // The snapshot fingerprint filters out ordinary UI-only renders.
  useEffect(() => {
    autoStepScheduleRef.current?.()
  })

  const saveCurrentProgress = (slot: number) => {
    if (saveSlots[slot] && !window.confirm('要覆蓋第 ' + slot + ' 格存檔嗎？原本的存檔會被新的進度取代。')) return
    const saved = buildCurrentSaveSnapshot()
    try {
      localStorage.setItem(SAVE_SLOT_PREFIX + slot, JSON.stringify(saved))
      setSaveSlots((current) => ({ ...current, [slot]: saved }))
      setSaveFeedback('已保存至存檔 ' + slot + '。')
    } catch {
      setSaveFeedback('保存失敗：瀏覽器本機儲存空間可能已滿，暫時無法保存這份進度。')
    }
  }

  const restoreSaveData = (saved: SaveSlotData) => {
    const keysToRemove: string[] = []
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index)
      if (key && key.startsWith('mayday-') && !key.startsWith(SAVE_SLOT_PREFIX)) keysToRemove.push(key)
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key))

    // Restore the year-end invitation checkpoint from the selected timeline.
    // A save made before the December 31 checkpoint must be allowed to evaluate
    // affection again when the player reaches it, even if a later timeline had
    // already consumed the invitation checkpoint.
    const restoredData = { ...saved.data }
    const beforeYearEndInviteCheckpoint =
      saved.gameDate < '1996.12.31' ||
      (saved.gameDate === '1996.12.31' && saved.stage === 'year-end-intro')
    if (beforeYearEndInviteCheckpoint) {
      ;[
        'mayday-year-end-invite-check-done',
        'mayday-year-end-invite-candidates',
        'mayday-year-end-invite-target',
        'mayday-year-end-shopping-reply-choice',
        'mayday-year-end-shopping-replies',
        'mayday-year-end-shopping-complete',
      ].forEach((key) => delete restoredData[key])
      ;(['wen', 'masa', 'ashin', 'stone', 'yanming'] as YearEndRouteCharacterId[]).forEach((character) => {
        delete restoredData['mayday-year-end-shopping-invite-sent-' + character]
      })
    }

    // Decide entirely from the selected save, never from another save slot or
    // from a later in-memory timeline.
    const savedResumeStage = restoredData['mayday-resume-stage']
    const savedTimelineStage = saved.stage === 'paused' && savedResumeStage
      ? savedResumeStage
      : saved.stage
    const legacyExtraChatStage = savedTimelineStage === 'spring-free-chat-picker' || savedTimelineStage === 'spring-free-chat'
    const eventTimelineStage = legacyExtraChatStage ? 'spring-diary' : savedTimelineStage
    if (legacyExtraChatStage) {
      // Old saves from the mistakenly-added extra chat resume at the original diary.
      const pendingDiary = (() => {
        try {
          const value = JSON.parse(restoredData['mayday-spring-diary-pending-data'] ?? 'null') as { title?: unknown; text?: unknown } | null
          return value && typeof value.title === 'string' && typeof value.text === 'string'
            ? { title: value.title, text: value.text }
            : null
        } catch { return null }
      })()
      if (pendingDiary) {
        restoredData['mayday-spring-diary-data'] = JSON.stringify(pendingDiary)
        restoredData['mayday-spring-diary-unlocked'] = 'true'
      }
      restoredData['mayday-story-stage'] = 'spring-diary'
      if (saved.stage === 'paused') restoredData['mayday-resume-stage'] = 'spring-diary'
      restoredData['mayday-spring-sms-mode'] = 'day'
    }

    const beforeSpringSmsEvent =
      saved.gameDate < '1997.02.17' ||
      (saved.gameDate === '1997.02.17' &&
        !['spring-sms-picker', 'spring-sms-chat', 'spring-diary'].includes(eventTimelineStage))
    if (beforeSpringSmsEvent) {
      ;[
        'mayday-spring-sms-event-started',
        'mayday-spring-sms-event-complete',
        'mayday-spring-sms-target',
        'mayday-spring-sms-round',
        'mayday-spring-sms-replied',
        'mayday-spring-sms-opening-sent',
        'mayday-spring-sms-opening-choice',
        'mayday-spring-sms-replies',
      ].forEach((key) => delete restoredData[key])
      ;[
        'mayday-spring-day-complete',
        'mayday-spring-diary-unlocked',
        'mayday-spring-diary-data',
      ].forEach((key) => delete restoredData[key])
      restoredData['mayday-spring-sms-mode'] = 'day'
    } else if (saved.gameDate === '1997.02.17' && eventTimelineStage === 'spring-sms-picker') {
      // A 2/17 daytime or pre-selection save can still enter the SMS once that evening.
      restoredData['mayday-spring-sms-event-started'] = 'false'
      restoredData['mayday-spring-sms-event-complete'] = 'false'
      ;[
        'mayday-spring-sms-target',
        'mayday-spring-sms-round',
        'mayday-spring-sms-replied',
        'mayday-spring-sms-opening-sent',
        'mayday-spring-sms-opening-choice',
        'mayday-spring-sms-replies',
      ].forEach((key) => delete restoredData[key])
      ;[
        'mayday-spring-day-complete',
        'mayday-spring-diary-unlocked',
        'mayday-spring-diary-data',
      ].forEach((key) => delete restoredData[key])
      restoredData['mayday-spring-sms-mode'] = 'day'
    } else if (saved.gameDate === '1997.02.17' && eventTimelineStage === 'spring-sms-chat') {
      const validTarget = springCharacterOrder.includes(restoredData['mayday-spring-sms-target'] as SpringCharacterId)
      if (validTarget) {
        restoredData['mayday-spring-sms-event-started'] = 'true'
        restoredData['mayday-spring-sms-event-complete'] = 'false'
      } else {
        restoredData['mayday-spring-sms-event-started'] = 'false'
        restoredData['mayday-spring-sms-event-complete'] = 'false'
        restoredData['mayday-story-stage'] = 'spring-sms-picker'
        if (saved.stage === 'paused') restoredData['mayday-resume-stage'] = 'spring-sms-picker'
      }
      restoredData['mayday-spring-sms-mode'] = 'day'
    } else if (eventTimelineStage === 'spring-diary' || saved.gameDate > '1997.02.17' ||
      restoredData['mayday-spring-day-complete'] === 'true') {
      // Once the five-round main SMS reaches the diary, it is permanently consumed in this save.
      restoredData['mayday-spring-sms-event-started'] = 'true'
      restoredData['mayday-spring-sms-event-complete'] = 'true'
      restoredData['mayday-spring-sms-mode'] = 'day'
    }

    ;[
      'mayday-spring-free-chat-eligible-v1',
      'mayday-spring-free-chat-started',
      'mayday-spring-free-chat-complete',
      'mayday-spring-free-chat-return-stage',
      'mayday-spring-diary-pending-data',
    ].forEach((key) => delete restoredData[key])

    // Keep the message archive aligned with the selected save, not with the furthest
    // progress that may still exist in another save slot.
    const selectedSaveHasSpringSmsHistory =
      restoredData['mayday-spring-sms-opening-sent'] === 'true' ||
      restoredData['mayday-spring-sms-event-complete'] === 'true' ||
      restoredData['mayday-spring-day-complete'] === 'true' ||
      saved.gameDate > '1997.02.17' ||
      (saved.gameDate === '1997.02.17' && ['spring-diary', 'march28-intro', 'march28-visit', 'march28-end', 'march28-park', 'march28-park-stay', 'march28-morning', 'march28-diary', 'march29-show', 'april12-story', 'april20-story', 'completed'].includes(eventTimelineStage))
    restoredData['mayday-spring-sms-history-restore-v1'] = selectedSaveHasSpringSmsHistory ? 'true' : 'false'

    Object.entries(restoredData).forEach(([key, value]) => {
      if (key.startsWith('mayday-') && !key.startsWith(SAVE_SLOT_PREFIX)) localStorage.setItem(key, value)
    })
    window.location.reload()
  }

  const loadSaveSlot = async (slot: number) => {
    const saved = saveSlots[slot]
    if (!saved) return
    if (!window.confirm('確定讀取第 ' + slot + ' 格存檔嗎？目前未保存的進度會被這份存檔取代。')) return
    try {
      await deleteDaySnapshotsAfter(saved.gameDate)
      const savedAt = Date.parse(saved.savedAt)
      if (Number.isFinite(savedAt)) await deleteAutoStepSnapshotsAfter(savedAt)
      setDaySnapshots((current) => current.filter((record) => record.date <= saved.gameDate))
      setAutoStepSnapshots((current) => current.filter((record) => !Number.isFinite(savedAt) || record.timestamp <= savedAt))
    } catch {
      setSaveFeedback('自動時間線暫時無法更新，仍會讀取你的手動存檔。')
    }
    restoreSaveData(saved)
  }

  const rollbackToDayStart = async (date: string) => {
    try {
      const record = await getDaySnapshot(date)
      if (!record) {
        setSaveFeedback('找不到這一天的日初紀錄，請重新整理後再試。')
        return
      }
      if (!window.confirm('確定回到 ' + date + ' 的第一幕嗎？目前進度會回到當天開場；此前的劇情與選擇會保留，手動存檔也不受影響。')) return
      const startTimestamp = Date.parse(record.snapshot.savedAt)
      if (Number.isFinite(startTimestamp)) await deleteAutoStepSnapshotsAfter(startTimestamp)
      await deleteDaySnapshotsAfter(date)
      setDaySnapshots((current) => current.filter((item) => item.date <= date))
      setAutoStepSnapshots((current) => current.filter((item) => !Number.isFinite(startTimestamp) || item.timestamp <= startTimestamp))
      restoreSaveData(record.snapshot)
    } catch {
      setSaveFeedback('時間回溯失敗，原本進度沒有變動。請重新整理後再試。')
    }
  }

  const rollbackToAutoStep = async (id: string) => {
    try {
      const record = autoStepSnapshots.find((item) => item.id === id)
      if (!record) {
        setSaveFeedback('找不到這個自動記錄節點，請重新整理後再試。')
        return
      }
      if (!window.confirm('確定回到 ' + record.date + ' ' + record.time + ' 的「' + record.stageLabel + '」嗎？這一步之前的劇情、訊息和玩家選擇都會保留；之後的時間線會從這裡重新開始。手動存檔不受影響。')) return
      await deleteAutoStepSnapshotsAfter(record.timestamp)
      await deleteDaySnapshotsAfter(record.date)
      setAutoStepSnapshots((current) => current.filter((item) => item.timestamp <= record.timestamp))
      setDaySnapshots((current) => current.filter((item) => item.date <= record.date))
      autoStepLastFingerprintRef.current = record.fingerprint
      restoreSaveData(record.snapshot)
    } catch {
      setSaveFeedback('時間回溯失敗，原本進度沒有變動。請重新整理後再試。')
    }
  }

  useEffect(() => {
    smsMessagesRef.current = smsMessages
    localStorage.setItem('mayday-sms-messages', JSON.stringify(smsMessages))
  }, [smsMessages])

  useEffect(() => {
    chatMessagesRef.current = chatMessages
    localStorage.setItem('mayday-chat-messages', JSON.stringify(chatMessages))
  }, [chatMessages])

  useEffect(() => {
    localStorage.setItem('mayday-route-affection', JSON.stringify(routeAffection))
  }, [routeAffection])

  useEffect(() => {
    if (winterExamChatReplyChoice === null) localStorage.removeItem('mayday-winter-exam-chat-reply-choice')
    else localStorage.setItem('mayday-winter-exam-chat-reply-choice', String(winterExamChatReplyChoice))
    if (winterExamChatClosingChoice === null) localStorage.removeItem('mayday-winter-exam-chat-closing-choice')
    else localStorage.setItem('mayday-winter-exam-chat-closing-choice', String(winterExamChatClosingChoice))
    localStorage.setItem('mayday-winter-exam-tutoring-unlocked', String(winterExamTutoringUnlocked))
    localStorage.setItem('mayday-winter-exam-replies', JSON.stringify(winterExamReplies))
    localStorage.setItem('mayday-winter-practice-replies', JSON.stringify(winterPracticeReplies))
    localStorage.setItem('mayday-winter-yanming-pickup-available', String(winterYanmingPickupAvailable))
    if (winterBusStopCharacter) localStorage.setItem('mayday-winter-bus-stop-character', winterBusStopCharacter)
    else localStorage.removeItem('mayday-winter-bus-stop-character')
    localStorage.setItem('mayday-winter-bus-stop-replies', JSON.stringify(winterBusStopReplies))
    localStorage.setItem('mayday-winter-diary-unlocked', String(winterDiaryUnlocked))
    if (winterDiaryData) localStorage.setItem('mayday-winter-diary-data', JSON.stringify(winterDiaryData))
    else localStorage.removeItem('mayday-winter-diary-data')
    if (februarySecretTarget) localStorage.setItem('mayday-february-secret-target', februarySecretTarget)
    else localStorage.removeItem('mayday-february-secret-target')
    if (februarySecretReply === null) localStorage.removeItem('mayday-february-secret-reply')
    else localStorage.setItem('mayday-february-secret-reply', String(februarySecretReply))
    if (februaryDinnerReply === null) localStorage.removeItem('mayday-february-dinner-reply')
    else localStorage.setItem('mayday-february-dinner-reply', String(februaryDinnerReply))
    if (februaryTableCharacter) localStorage.setItem('mayday-february-table-character', februaryTableCharacter)
    else localStorage.removeItem('mayday-february-table-character')
    if (februaryAfterDinnerCharacter) localStorage.setItem('mayday-february-after-dinner-character', februaryAfterDinnerCharacter)
    else localStorage.removeItem('mayday-february-after-dinner-character')
    localStorage.setItem('mayday-february-after-dinner-replies', JSON.stringify(februaryAfterDinnerReplies))
    localStorage.setItem('mayday-february-diary-unlocked', String(februaryDiaryUnlocked))
    if (februaryDiaryData) localStorage.setItem('mayday-february-diary-data', JSON.stringify(februaryDiaryData))
    else localStorage.removeItem('mayday-february-diary-data')
  }, [winterExamChatReplyChoice, winterExamChatClosingChoice, winterExamTutoringUnlocked, winterExamReplies, winterPracticeReplies, winterYanmingPickupAvailable, winterBusStopCharacter, winterBusStopReplies, winterDiaryUnlocked, winterDiaryData, februarySecretTarget, februarySecretReply, februaryDinnerReply, februaryTableCharacter, februaryAfterDinnerCharacter, februaryAfterDinnerReplies, februaryDiaryUnlocked, februaryDiaryData])

  useEffect(() => {
    // Migration completion and player confirmation are separate flags.
    // Only a matching outgoing choice message proves that the player actually selected a reply.
    const migrationKey = 'mayday-winter-exam-chat-choice-migration-v3'
    const confirmationKey = 'mayday-winter-exam-chat-choice-confirmed-v2'
    const replyChoiceKey = 'mayday-winter-exam-chat-reply-choice'
    if (localStorage.getItem(migrationKey) === 'true') return

    const savedChoice = Number(localStorage.getItem(replyChoiceKey) ?? '-1')
    const savedChoiceText = Number.isInteger(savedChoice) && savedChoice >= 0 && savedChoice < winterExamChatChoices.length
      ? winterExamChatChoices[savedChoice]?.text
      : null
    const hasConfirmedChoice = localStorage.getItem(confirmationKey) === 'true'
      && Boolean(savedChoiceText)
      && (chatMessages.wen ?? []).some((message) => message.date === '1月7日・晚上' && message.from === 'me' && message.text === savedChoiceText)

    if (!hasConfirmedChoice) {
      const legacyChoiceTexts = new Set<string>([
        ...winterExamChatChoices.map((choice) => choice.text),
        ...winterExamChatChoices.map((choice) => choice.response),
        '好！那我明天把講義跟題目都帶去。謝啦，溫老師～',
        '溫老師？不要亂叫。快去把題目圈好，別又熬夜到半夜。明天見。',
      ])
      if ((chatMessages.wen ?? []).some((message) => message.date === '1月7日・晚上' && legacyChoiceTexts.has(message.text))) {
        setChatMessages((current) => {
          const thread = current.wen ?? []
          const cleaned = thread.filter((message) => !(message.date === '1月7日・晚上' && legacyChoiceTexts.has(message.text)))
          return cleaned.length === thread.length ? current : { ...current, wen: cleaned }
        })
      }
      setWinterExamChatReplyChoice(null)
      setWinterExamChatClosingChoice(null)
      localStorage.removeItem(replyChoiceKey)
      localStorage.removeItem(confirmationKey)
    } else {
      const legacyClosingText = '好！那我明天把講義跟題目都帶去。謝啦，溫老師～'
      if ((chatMessages.wen ?? []).some((message) => message.date === '1月7日・晚上' && message.from === 'me' && message.text === legacyClosingText)) {
        setWinterExamChatClosingChoice(0)
      }
    }

    localStorage.setItem(migrationKey, 'true')
  }, [])

  useEffect(() => {
    localStorage.setItem('mayday-year-end-invite-candidates', JSON.stringify(yearEndInviteCandidates))
    if (yearEndInviteTarget) localStorage.setItem('mayday-year-end-invite-target', yearEndInviteTarget)
    else localStorage.removeItem('mayday-year-end-invite-target')
    if (yearEndShoppingReplyChoice === null) localStorage.removeItem('mayday-year-end-shopping-reply-choice')
    else localStorage.setItem('mayday-year-end-shopping-reply-choice', String(yearEndShoppingReplyChoice))
    localStorage.setItem('mayday-year-end-shopping-replies', JSON.stringify(yearEndShoppingReplies))
    localStorage.setItem('mayday-year-end-fireworks-replies', JSON.stringify(yearEndFireworksReplies))
    localStorage.setItem('mayday-year-end-greeting-queue', JSON.stringify(yearEndGreetingQueue))
    localStorage.setItem('mayday-year-end-greeting-index', String(yearEndGreetingIndex))
    if (yearEndGreetingTarget) localStorage.setItem('mayday-year-end-greeting-target', yearEndGreetingTarget)
    else localStorage.removeItem('mayday-year-end-greeting-target')
    localStorage.setItem('mayday-year-end-chat-mode', yearEndChatMode)
    localStorage.setItem('mayday-year-end-first-reply-sent', String(yearEndFirstReplySent))
    localStorage.setItem('mayday-year-end-free-chat-round', String(yearEndFreeChatRound))
    localStorage.setItem('mayday-year-end-free-chat-replied', String(yearEndFreeChatReplied))
    localStorage.setItem('mayday-year-end-free-chat-replies', JSON.stringify(yearEndFreeChatReplies))
    localStorage.setItem('mayday-year-end-proactive-sent', JSON.stringify(yearEndProactiveSent))
    localStorage.setItem('mayday-year-end-extended-chat-characters', JSON.stringify(yearEndExtendedChatCharacters))
    localStorage.setItem('mayday-year-end-diary-unlocked', String(yearEndDiaryUnlocked))
    if (yearEndDiaryData) localStorage.setItem('mayday-year-end-diary-data', JSON.stringify(yearEndDiaryData))
    else localStorage.removeItem('mayday-year-end-diary-data')
  }, [yearEndInviteCandidates, yearEndInviteTarget, yearEndShoppingReplyChoice, yearEndShoppingReplies, yearEndFireworksReplies, yearEndGreetingQueue, yearEndGreetingIndex, yearEndGreetingTarget, yearEndChatMode, yearEndFirstReplySent, yearEndFreeChatRound, yearEndFreeChatReplied, yearEndFreeChatReplies, yearEndProactiveSent, yearEndExtendedChatCharacters, yearEndDiaryUnlocked, yearEndDiaryData])

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
    if (monthFreeChatTarget) localStorage.setItem('mayday-month-free-chat-target', monthFreeChatTarget)
    else localStorage.removeItem('mayday-month-free-chat-target')
  }, [monthFreeChatTarget])

  useEffect(() => {
    localStorage.setItem('mayday-month-free-chat-opening-sent', String(monthFreeChatOpeningSent))
  }, [monthFreeChatOpeningSent])

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
    const legacyInviteOnly = ['next-month-free-chat', 'next-month-diary'].includes(storyStage)
      && localStorage.getItem('mayday-next-month-event-kind') === 'invite'
      && !localStorage.getItem('mayday-next-month-open-day-target')
      && localStorage.getItem('mayday-next-month-day-complete') !== 'true'
    if (!legacyInviteOnly) return

    setNextMonthFreeChatTarget(null)
    setNextMonthFreeChatRound(0)
    setNextMonthFreeChatReplied(false)
    setNextMonthFreeChatOpeningSent(false)
    setNextMonthFreeChatReplies([])
    localStorage.removeItem('mayday-next-month-free-chat-target')
    localStorage.setItem('mayday-next-month-free-chat-round', '0')
    localStorage.setItem('mayday-next-month-free-chat-replied', 'false')
    localStorage.setItem('mayday-next-month-free-chat-opening-sent', 'false')
    localStorage.setItem('mayday-next-month-free-chat-replies', '[]')

    setNextMonthDiaryUnlocked(false)
    setNextMonthDiaryData(null)
    localStorage.removeItem('mayday-next-month-diary-unlocked')
    localStorage.removeItem('mayday-next-month-diary-data')

    setNextMonthOpenDayTarget(null)
    setNextMonthOpenDayReplies([])
    localStorage.removeItem('mayday-next-month-open-day-target')
    localStorage.setItem('mayday-next-month-open-day-replies', '[]')
    setNextMonthEventKind('open-day')
    setNextMonthEventCharacter(null)
    localStorage.setItem('mayday-next-month-event-kind', 'open-day')
    localStorage.removeItem('mayday-next-month-event-character')
    setActiveApp(null)
    setSelectedSmsThread(null)
    setStoryStage('next-month-open-day')
    localStorage.setItem('mayday-story-stage', 'next-month-open-day')
  }, [])

  useEffect(() => {
    const legacyInviteOnly = ['next-month-free-chat', 'next-month-diary'].includes(storyStage)
      && localStorage.getItem('mayday-next-month-event-kind') === 'invite'
      && !localStorage.getItem('mayday-next-month-open-day-target')
      && localStorage.getItem('mayday-next-month-day-complete') !== 'true'
    if (legacyInviteOnly || !['day2-complete', 'month-visit-complete', 'next-month-invite-date', 'next-month-open-day-visit-complete', 'next-month-free-chat', 'next-month-diary', 'june-study-complete', 'june-diary'].includes(storyStage) || activeApp !== null || incomingCallCharacter || activeCallCharacter) return
    if (!pendingCallCharacter) {
      const eligible = freeTimeOrder.find((id) => routeAffection[id] >= AFFECTION_CALL_THRESHOLD && localStorage.getItem('mayday-call-v2-triggered-' + id) !== 'true')
      if (eligible) {
        setPendingCallCharacter(eligible)
        localStorage.setItem('mayday-pending-call', eligible)
      }
      return
    }

    const juneStudyCharacter = localStorage.getItem('mayday-june-study-character')
    const juneFreeChatCharacter = localStorage.getItem('mayday-june-free-chat-target')
    const isJuneStudyDay = storyStage === 'june-study-complete' || storyStage === 'june-diary'
    const latestExperience = isJuneStudyDay && juneFreeChatCharacter === pendingCallCharacter && localStorage.getItem('mayday-june-free-chat-complete') === 'true'
      ? {
          character: pendingCallCharacter,
          source: 'june-study' as const,
          date: saveGameDate,
          eventKey: '六月中旬・日常簡訊',
          day2StrollAccepted: false,
        }
      : isJuneStudyDay && juneStudyCharacter === pendingCallCharacter
        ? {
            character: pendingCallCharacter,
            source: 'june-study' as const,
            date: saveGameDate,
            eventKey: '六月中旬・期末複習',
            day2StrollAccepted: false,
          }
        : storyStage === 'month-visit-complete' && monthVisitTarget === pendingCallCharacter
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
  }, [storyStage, activeApp, pendingCallCharacter, incomingCallCharacter, activeCallCharacter, routeAffection, sharedExperienceLog, monthVisitTarget, monthVisitReplies, saveGameDate, day2StrollAccepted, juneFreeChatTarget])

  useEffect(() => {
    if (activeApp === 'messages' && selectedSmsThread && messageScrollRef.current) {
      messageScrollRef.current.scrollTop = messageScrollRef.current.scrollHeight
    }
  }, [activeApp, selectedSmsThread, smsMessages, chatMessages, greetingRound, freeChatRound, juneFreeChatRound, monthFreeChatRound, nextMonthFreeChatRound])

  useEffect(() => {
    if (activeCallCharacter && callTranscriptRef.current) {
      callTranscriptRef.current.scrollTop = callTranscriptRef.current.scrollHeight
    }
  }, [activeCallCharacter, callTranscript])

  useEffect(() => {
    const migrationKey = 'mayday-wen-open-day-guitar-praise-v1'
    if (localStorage.getItem(migrationKey) === 'true') return
    if (storyStage !== 'next-month-open-day-visit' || nextMonthOpenDayTarget !== 'wen' || nextMonthOpenDayReplies.length <= 3) return

    const replayReplies = nextMonthOpenDayReplies.slice(0, 3)
    const removedAffection = nextMonthOpenDayReplies.slice(3).reduce((total, choiceIndex, offset) => {
      const round = nextMonthOpenDayRoutes.wen.rounds[3 + offset]
      return total + (round?.choices[choiceIndex]?.affection ?? 0)
    }, 0)
    setNextMonthOpenDayReplies(replayReplies)
    localStorage.setItem('mayday-next-month-open-day-replies', JSON.stringify(replayReplies))
    if (removedAffection > 0) {
      const adjustedAffection = Math.max(0, routeAffection.wen - removedAffection)
      setRouteAffection((current) => ({ ...current, wen: Math.max(0, current.wen - removedAffection) }))
      if (pendingCallCharacter === 'wen' && adjustedAffection < AFFECTION_CALL_THRESHOLD && localStorage.getItem('mayday-call-v2-triggered-wen') !== 'true') {
        setPendingCallCharacter(null)
        localStorage.removeItem('mayday-pending-call')
      }
    }
    localStorage.setItem(migrationKey, 'true')
  }, [])

  useEffect(() => {
    const appliedKey = 'mayday-april30-affection-applied'
    if (localStorage.getItem(appliedKey) === 'true' || localStorage.getItem('mayday-april30-day-complete') !== 'true') return
    const routeValue = localStorage.getItem('mayday-april30-route')
    const validRoutes: April30Route[] = ['wen', 'ashin', 'masa', 'stone', 'yanming']
    let choices: unknown = []
    try { choices = JSON.parse(localStorage.getItem('mayday-april30-choices') ?? '[]') } catch { choices = [] }
    if (!routeValue || !validRoutes.includes(routeValue as April30Route) || !Array.isArray(choices) || choices.length !== 5) return
    const validChoices = choices.filter((value): value is number => Number.isInteger(value) && value >= 0 && value <= 2)
    if (validChoices.length !== 5) return
    const storedComfortChoice = localStorage.getItem('mayday-april30-comfort-choice')
    const parsedComfortChoice = storedComfortChoice === null || storedComfortChoice === '' ? null : Number(storedComfortChoice)
    const comfortChoice = parsedComfortChoice !== null && Number.isInteger(parsedComfortChoice) && parsedComfortChoice >= 0 && parsedComfortChoice <= 2
      ? parsedComfortChoice
      : null
    const amount = getApril30AffectionTotal(routeValue as April30Route, validChoices, comfortChoice)
    addRouteAffection(routeValue as April30Route, amount)
    localStorage.setItem(appliedKey, 'true')
    localStorage.setItem('mayday-april30-affection-backfill-v1', 'true')
    localStorage.setItem('mayday-april30-affection-total', String(amount))
  }, [])

  useEffect(() => {
    const marker = 'mayday-spring-selection-affection-backfill-v1'
    if (localStorage.getItem(marker) === 'true' || localStorage.getItem('mayday-spring-day-complete') !== 'true') return
    const validCharacters: SpringCharacterId[] = ['wen', 'ashin', 'masa', 'stone', 'yanming']
    const isCharacter = (value: string | null): value is SpringCharacterId => Boolean(value && validCharacters.includes(value as SpringCharacterId))
    const bonus: Record<SpringCharacterId, number> = { wen: 0, ashin: 0, masa: 0, stone: 0, yanming: 0 }
    let declined: unknown = []
    try { declined = JSON.parse(localStorage.getItem('mayday-spring-invite-declined') ?? '[]') } catch { declined = [] }
    if (Array.isArray(declined)) {
      declined.forEach((value) => { if (typeof value === 'string' && isCharacter(value)) bonus[value] += 1 })
    }
    // Older accepted invites already received a hidden +1 at confirmation; that point now represents the invite-open selection.
    const afterChoice = localStorage.getItem('mayday-spring-after-choice')
    if (afterChoice === 'yanming-dinner') bonus.yanming += 1
    if (afterChoice === 'lesson') {
      const teacher = localStorage.getItem('mayday-spring-lesson-character')
      if (isCharacter(teacher) && teacher !== 'yanming') bonus[teacher] += 1
    }
    const smsTarget = localStorage.getItem('mayday-spring-sms-target')
    if (isCharacter(smsTarget)) bonus[smsTarget] += 1
    validCharacters.forEach((character) => { if (bonus[character] !== 0) addRouteAffection(character, bonus[character]) })
    localStorage.setItem(marker, 'true')
  }, [])

  const changeStage = (next: StoryStage) => {
    setStoryStage(next)
    localStorage.setItem('mayday-story-stage', next)
  }

  const pauseStory = () => {
    if (storyStage !== 'paused' && storyStage !== 'completed' && storyStage !== 'day2-complete' && storyStage !== 'june-study-complete') {
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
    const current = chatMessagesRef.current
    const next: Record<CharacterId, SmsMessage[]> = {
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
    }
    // Persist each appended message immediately so a manual save cannot capture
    // the previous render's chat history while React is still committing state.
    chatMessagesRef.current = next
    localStorage.setItem('mayday-chat-messages', JSON.stringify(next))
    setChatMessages(next)
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

  useEffect(() => {
    const appliedKey = 'mayday-may10-character-selection-affection-v1'
    if (localStorage.getItem(appliedKey) === 'true' || localStorage.getItem('mayday-may10-day-complete') !== 'true') return
    const character = localStorage.getItem('mayday-may10-character')
    const validCharacters: May10Character[] = ['wen', 'ashin', 'masa', 'stone', 'yanming']
    if (!character || !validCharacters.includes(character as May10Character)) return
    addRouteAffection(character as May10Character, 1)
    localStorage.setItem(appliedKey, 'true')
  }, [])

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
      const experience: CharacterExperienceRecord = {
        character: 'masa',
        source: 'day2',
        date: saveGameDate,
        eventKey: 'day2-masa-check-in',
        day2StrollAccepted,
      }
      const nextExperienceLog = { ...sharedExperienceLog, masa: experience }
      setSharedExperienceLog(nextExperienceLog)
      localStorage.setItem('mayday-shared-experience-log', JSON.stringify(nextExperienceLog))
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
    const experience: CharacterExperienceRecord = {
      character: 'stone',
      source: 'day2',
      date: saveGameDate,
      eventKey: 'day2-stone-check-in',
      day2StrollAccepted,
    }
    const nextExperienceLog = { ...sharedExperienceLog, stone: experience }
    setSharedExperienceLog(nextExperienceLog)
    localStorage.setItem('mayday-shared-experience-log', JSON.stringify(nextExperienceLog))
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
    const followsMonthVisit = context.source === 'month-visit' || (context.source === 'month-free-chat' && context.eventKey.startsWith('month-visit-follow-up:'))
    const followsNextMonthOpenDay = context.source === 'next-month-open-day'
      || (context.source === 'next-month-free-chat' && context.eventKey.includes('open-day:' + character))
    const followsNextMonthFollowUp = context.source === 'next-month-invite' || context.source === 'next-month-free-chat'
    const earlierChapterIsStale = ['first-chapter', 'day2', 'free-chat'].includes(context.source) && context.date !== saveGameDate
    const selectedRounds = followsMonthVisit
      ? monthVisitCallScripts[character]
      : followsNextMonthOpenDay
        ? nextMonthOpenDayCallScripts[character]
        : followsNextMonthFollowUp || earlierChapterIsStale
          ? nextMonthLaterCallScripts[character]
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
    setMonthFreeChatTarget(null)
    setMonthFreeChatRound(0)
    setMonthFreeChatReplied(false)
    setMonthFreeChatStarted(false)
    setMonthFreeChatOpeningSent(false)
    setMonthFreeChatReplies([])
    localStorage.removeItem('mayday-month-visit-target')
    localStorage.removeItem('mayday-month-visit-choice')
    localStorage.removeItem('mayday-month-visit-replies')
    localStorage.removeItem('mayday-month-visit-complete')
    localStorage.removeItem('mayday-month-free-chat-target')
    localStorage.removeItem('mayday-month-free-chat-choice-pending')
    localStorage.removeItem('mayday-month-free-chat-round')
    localStorage.removeItem('mayday-month-free-chat-replied')
    localStorage.removeItem('mayday-month-free-chat-started')
    localStorage.removeItem('mayday-month-free-chat-opening-sent')
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

  const getMonthFreeChatRounds = (character: RouteCharacterId): ChatRound[] =>
    character === monthVisitTarget ? monthFreeChatScripts[character] : monthAwayFreeChatScripts[character]

  const getMonthFreeChatOpeningChoices = (character: RouteCharacterId): MonthFreeChatOpening[] =>
    character === monthVisitTarget ? monthFreeChatOpeners[character] : monthPreviousFreeChatOpeners[character]

  const getMonthFreeChatDiaryText = (character: RouteCharacterId): string =>
    character === monthVisitTarget ? monthDiaryEntries[character].chat : monthPastChatDiary[character]

  const startMonthFreeChat = () => {
    if (!monthVisitTarget) return
    if (monthFreeChatStarted) {
      setSelectedSmsThread(monthFreeChatTarget)
      setActiveApp(monthFreeChatTarget ? 'messages' : null)
      changeStage('month-free-chat')
      return
    }
    setMonthFreeChatStarted(true)
    localStorage.setItem('mayday-month-free-chat-started', 'true')
    setMonthFreeChatTarget(null)
    localStorage.removeItem('mayday-month-free-chat-target')
    localStorage.setItem('mayday-month-free-chat-choice-pending', 'true')
    setMonthFreeChatOpeningSent(false)
    localStorage.setItem('mayday-month-free-chat-opening-sent', 'false')
    setMonthFreeChatRound(0)
    localStorage.setItem('mayday-month-free-chat-round', '0')
    setMonthFreeChatReplied(false)
    localStorage.setItem('mayday-month-free-chat-replied', 'false')
    setMonthFreeChatReplies([])
    localStorage.setItem('mayday-month-free-chat-replies', '[]')
    setSelectedSmsThread(null)
    setActiveApp(null)
    changeStage('month-free-chat')
  }

  const chooseMonthFreeChatTarget = (character: RouteCharacterId) => {
    if (!monthFreeChatStarted || monthFreeChatTarget) return
    setMonthFreeChatTarget(character)
    localStorage.setItem('mayday-month-free-chat-target', character)
    localStorage.setItem('mayday-month-free-chat-choice-pending', 'false')
    setMonthFreeChatRound(0)
    localStorage.setItem('mayday-month-free-chat-round', '0')
    setMonthFreeChatReplied(false)
    localStorage.setItem('mayday-month-free-chat-replied', 'false')
    setMonthFreeChatOpeningSent(false)
    localStorage.setItem('mayday-month-free-chat-opening-sent', 'false')
    setMonthFreeChatReplies([])
    localStorage.setItem('mayday-month-free-chat-replies', '[]')
    setSelectedSmsThread(character)
    setActiveApp('messages')
  }

  const chooseMonthFreeChatOpening = (choiceIndex: number) => {
    if (!monthFreeChatTarget || !monthFreeChatStarted || monthFreeChatOpeningSent) return
    const character = monthFreeChatTarget
    const opening = getMonthFreeChatOpeningChoices(character)[choiceIndex]
    const rounds = getMonthFreeChatRounds(character)
    if (!opening || !rounds[0]) return
    appendChatMessages(character, [
      { from: 'me', text: opening.text, time: '18:10' },
      { from: character, text: opening.response, time: '18:11' },
      { from: character, text: rounds[0].incoming, time: '18:12' },
    ], '11月16日・晚上')
    addRouteAffection(character, opening.affection)
    setMonthFreeChatOpeningSent(true)
    localStorage.setItem('mayday-month-free-chat-opening-sent', 'true')
  }

  const chooseMonthFreeChatReply = (choiceIndex: number) => {
    if (!monthFreeChatTarget || !monthFreeChatOpeningSent || monthFreeChatReplied) return
    const character = monthFreeChatTarget
    const rounds = getMonthFreeChatRounds(character)
    const round = rounds[monthFreeChatRound]
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
    if (monthFreeChatRound < rounds.length - 1) {
      const nextRound = monthFreeChatRound + 1
      setMonthFreeChatRound(nextRound)
      localStorage.setItem('mayday-month-free-chat-round', String(nextRound))
      appendChatMessages(character, [{ from: character, text: choice.nextIncoming ?? rounds[nextRound].incoming, time: '18:' + String(minute + 1).padStart(2, '0') }], '11月16日・晚上')
      setMonthFreeChatReplied(false)
      localStorage.setItem('mayday-month-free-chat-replied', 'false')
    } else {
      setMonthFreeChatReplied(true)
      localStorage.setItem('mayday-month-free-chat-replied', 'true')
    }
  }

  const finishMonthFreeChat = () => {
    if (!monthFreeChatTarget || !monthFreeChatStarted || !monthFreeChatOpeningSent || !monthFreeChatReplied || monthFreeChatRound !== 4 || monthFreeChatReplies.length !== 5) return
    const isVisitFollowUp = monthFreeChatTarget === monthVisitTarget
    const previousExperience = sharedExperienceLog[monthFreeChatTarget]
    const experience: CharacterExperienceRecord = {
      character: monthFreeChatTarget,
      source: 'month-free-chat',
      date: saveGameDate,
      eventKey: isVisitFollowUp
        ? 'month-visit-follow-up:' + monthVisitRoutes[monthFreeChatTarget].title
        : 'month-free-chat-after:' + (previousExperience?.source ?? 'first-chapter') + ':' + (previousExperience?.eventKey ?? 'first-rehearsal-room-meeting'),
      day2StrollAccepted,
      choices: [...monthFreeChatReplies],
    }
    const nextExperienceLog = { ...sharedExperienceLog, [monthFreeChatTarget]: experience }
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
    setMonthDiaryUnlocked(true)
    localStorage.setItem('mayday-month-diary-unlocked', 'true')
    localStorage.setItem('mayday-month-day-complete', 'true')
    changeStage('next-month-intro')
  }


  const openNextMonthInviteChat = (character: RouteCharacterId) => {
    const route = nextMonthInviteRoutes[character]
    setNextMonthInviteTarget(character)
    localStorage.setItem('mayday-next-month-invite-target', character)
    setNextMonthInviteTeaseChoice(null)
    localStorage.removeItem('mayday-next-month-invite-tease-choice')
    setNextMonthInviteReplyChoice(null)
    localStorage.removeItem('mayday-next-month-invite-reply-choice')
    setNextMonthInviteDateReplies([])
    localStorage.setItem('mayday-next-month-invite-date-replies', '[]')

    if (localStorage.getItem('mayday-next-month-invite-thread-started') !== character) {
      const entries: NewChatEntry[] = route.invitation.map((message, index) => ({
        from: character,
        text: message.text,
        time: '10:' + String(10 + index).padStart(2, '0'),
      }))
      if (!route.teaseChoices?.length && route.replyPrompt) {
        entries.push({ from: character, text: route.replyPrompt, time: '10:' + String(10 + entries.length).padStart(2, '0') })
      }
      appendChatMessages(character, entries, '12月14日・上午')
      localStorage.setItem('mayday-next-month-invite-thread-started', character)
    }

    setSelectedSmsThread(character)
    setActiveApp('messages')
    changeStage('next-month-invite-chat')
  }

  const startNextMonthFlow = () => {
    const candidates = monthVisitOrder.filter((id) => routeAffection[id] >= NEXT_MONTH_INVITE_THRESHOLD)
    setNextMonthInviteCandidates(candidates)
    localStorage.setItem('mayday-next-month-started', 'true')
    localStorage.setItem('mayday-next-month-invite-candidates', JSON.stringify(candidates))
    setNextMonthInviteTeaseChoice(null)
    localStorage.removeItem('mayday-next-month-invite-tease-choice')
    setNextMonthInviteReplyChoice(null)
    localStorage.removeItem('mayday-next-month-invite-reply-choice')
    setNextMonthInviteDateReplies([])
    localStorage.removeItem('mayday-next-month-invite-date-replies')
    localStorage.removeItem('mayday-next-month-invite-thread-started')
    setNextMonthOpenDayReplies([])
    localStorage.setItem('mayday-next-month-open-day-replies', '[]')
    setNextMonthFreeChatTarget(null)
    localStorage.removeItem('mayday-next-month-free-chat-target')
    if (candidates.length === 1) {
      openNextMonthInviteChat(candidates[0])
    } else if (candidates.length > 1) {
      setNextMonthInviteTarget(null)
      localStorage.removeItem('mayday-next-month-invite-target')
      setSelectedSmsThread(null)
      setActiveApp(null)
      changeStage('next-month-invite-notification')
    } else {
      setNextMonthInviteTarget(null)
      localStorage.removeItem('mayday-next-month-invite-target')
      startNextMonthOpenDay()
    }
  }

  const chooseNextMonthInviteTarget = (character: RouteCharacterId) => {
    if (!nextMonthInviteCandidates.includes(character)) return
    openNextMonthInviteChat(character)
  }

  const chooseNextMonthInviteTease = (choiceIndex: number) => {
    if (!nextMonthInviteTarget || nextMonthInviteTeaseChoice !== null) return
    const character = nextMonthInviteTarget
    const route = nextMonthInviteRoutes[character]
    const choice = route.teaseChoices?.[choiceIndex]
    if (!choice) return
    const baseMinute = 10 + route.invitation.length
    appendChatMessages(character, [
      { from: 'me', text: choice.text, time: '10:' + String(baseMinute).padStart(2, '0') },
      ...choice.response.map((text, index) => ({
        from: character,
        text,
        time: '10:' + String(baseMinute + index + 1).padStart(2, '0'),
      })),
      { from: character, text: route.replyPrompt, time: '10:' + String(baseMinute + choice.response.length + 1).padStart(2, '0') },
    ], '12月14日・上午')
    setNextMonthInviteTeaseChoice(choiceIndex)
    localStorage.setItem('mayday-next-month-invite-tease-choice', String(choiceIndex))
    addRouteAffection(character, choice.affection)
  }

  const chooseNextMonthInviteReply = (choiceIndex: number) => {
    if (!nextMonthInviteTarget || nextMonthInviteReplyChoice !== null) return
    const character = nextMonthInviteTarget
    const route = nextMonthInviteRoutes[character]
    const choice = route.replyChoices[choiceIndex]
    if (!choice) return
    const minute = 24
    appendChatMessages(character, [
      { from: 'me', text: choice.text, time: '10:' + String(minute).padStart(2, '0') },
      ...choice.response.map((text, index) => ({
        from: character,
        text,
        time: '10:' + String(minute + index + 1).padStart(2, '0'),
      })),
    ], '12月14日・上午')
    setNextMonthInviteReplyChoice(choiceIndex)
    localStorage.setItem('mayday-next-month-invite-reply-choice', String(choiceIndex))
    addRouteAffection(character, choice.affection)
  }

  const continueNextMonthInvite = () => {
    if (!nextMonthInviteTarget || nextMonthInviteReplyChoice === null) return
    const choice = nextMonthInviteRoutes[nextMonthInviteTarget].replyChoices[nextMonthInviteReplyChoice]
    if (!choice) return
    if (!choice.accepted) {
      startNextMonthOpenDay()
      return
    }
    setNextMonthInviteDateReplies([])
    localStorage.setItem('mayday-next-month-invite-date-replies', '[]')
    setNextMonthEventKind('invite')
    setNextMonthEventCharacter(nextMonthInviteTarget)
    localStorage.setItem('mayday-next-month-event-kind', 'invite')
    localStorage.setItem('mayday-next-month-event-character', nextMonthInviteTarget)
    setSelectedSmsThread(null)
    setActiveApp(null)
    changeStage('next-month-invite-date')
  }

  const chooseNextMonthInviteDateReply = (choiceIndex: number) => {
    if (!nextMonthInviteTarget || nextMonthInviteDateReplies.length >= 5) return
    const route = nextMonthInviteRoutes[nextMonthInviteTarget]
    const choice = route.rounds[nextMonthInviteDateReplies.length]?.choices[choiceIndex]
    if (!choice) return
    const nextReplies = [...nextMonthInviteDateReplies, choiceIndex]
    setNextMonthInviteDateReplies(nextReplies)
    localStorage.setItem('mayday-next-month-invite-date-replies', JSON.stringify(nextReplies))
    addRouteAffection(nextMonthInviteTarget, choice.affection)
  }

  const finishNextMonthInviteDate = () => {
    if (!nextMonthInviteTarget || nextMonthInviteDateReplies.length !== 5) return
    const experience: CharacterExperienceRecord = {
      character: nextMonthInviteTarget,
      source: 'next-month-invite',
      date: saveGameDate,
      eventKey: 'next-month-invite:' + nextMonthInviteRoutes[nextMonthInviteTarget].title,
      day2StrollAccepted,
      choices: [...nextMonthInviteDateReplies],
    }
    const nextExperienceLog = { ...sharedExperienceLog, [nextMonthInviteTarget]: experience }
    setSharedExperienceLog(nextExperienceLog)
    localStorage.setItem('mayday-shared-experience-log', JSON.stringify(nextExperienceLog))
    startNextMonthOpenDay()
  }

  const startNextMonthOpenDay = () => {
    setNextMonthEventKind('open-day')
    setNextMonthEventCharacter(null)
    localStorage.setItem('mayday-next-month-event-kind', 'open-day')
    localStorage.removeItem('mayday-next-month-event-character')
    setNextMonthOpenDayTarget(null)
    setNextMonthOpenDayReplies([])
    localStorage.removeItem('mayday-next-month-open-day-target')
    localStorage.setItem('mayday-next-month-open-day-replies', '[]')
    setActiveApp(null)
    setSelectedSmsThread(null)
    changeStage('next-month-open-day')
  }

  const chooseNextMonthOpenDayTarget = (character: RouteCharacterId) => {
    if (nextMonthOpenDayTarget) return
    setNextMonthOpenDayTarget(character)
    setNextMonthEventKind('open-day')
    setNextMonthEventCharacter(character)
    setNextMonthOpenDayReplies([])
    localStorage.setItem('mayday-next-month-open-day-target', character)
    localStorage.setItem('mayday-next-month-event-kind', 'open-day')
    localStorage.setItem('mayday-next-month-event-character', character)
    localStorage.setItem('mayday-next-month-open-day-replies', '[]')
    changeStage('next-month-open-day-visit')
  }

  const chooseNextMonthOpenDayReply = (choiceIndex: number) => {
    if (!nextMonthOpenDayTarget || nextMonthOpenDayReplies.length >= 5) return
    const route = nextMonthOpenDayRoutes[nextMonthOpenDayTarget]
    const choice = route.rounds[nextMonthOpenDayReplies.length]?.choices[choiceIndex]
    if (!choice) return
    const nextReplies = [...nextMonthOpenDayReplies, choiceIndex]
    setNextMonthOpenDayReplies(nextReplies)
    localStorage.setItem('mayday-next-month-open-day-replies', JSON.stringify(nextReplies))
    addRouteAffection(nextMonthOpenDayTarget, choice.affection)
  }

  const finishNextMonthOpenDayVisit = () => {
    if (!nextMonthOpenDayTarget || nextMonthOpenDayReplies.length !== 5) return
    const experience: CharacterExperienceRecord = {
      character: nextMonthOpenDayTarget,
      source: 'next-month-open-day',
      date: saveGameDate,
      eventKey: 'next-month-open-day:' + nextMonthOpenDayRoutes[nextMonthOpenDayTarget].title,
      day2StrollAccepted,
      choices: [...nextMonthOpenDayReplies],
    }
    const nextExperienceLog = { ...sharedExperienceLog, [nextMonthOpenDayTarget]: experience }
    setSharedExperienceLog(nextExperienceLog)
    localStorage.setItem('mayday-shared-experience-log', JSON.stringify(nextExperienceLog))
    changeStage('next-month-open-day-visit-complete')
  }

  const startNextMonthFreeChat = () => {
    setNextMonthFreeChatTarget(null)
    setNextMonthFreeChatRound(0)
    setNextMonthFreeChatReplied(false)
    setNextMonthFreeChatOpeningSent(false)
    setNextMonthFreeChatReplies([])
    localStorage.removeItem('mayday-next-month-free-chat-target')
    localStorage.setItem('mayday-next-month-free-chat-round', '0')
    localStorage.setItem('mayday-next-month-free-chat-replied', 'false')
    localStorage.setItem('mayday-next-month-free-chat-opening-sent', 'false')
    localStorage.setItem('mayday-next-month-free-chat-replies', '[]')
    setSelectedSmsThread(null)
    setActiveApp(null)
    changeStage('next-month-free-chat')
  }

  const chooseNextMonthFreeChatTarget = (character: RouteCharacterId) => {
    if (nextMonthFreeChatTarget) return
    setNextMonthFreeChatTarget(character)
    setNextMonthFreeChatRound(0)
    setNextMonthFreeChatReplied(false)
    setNextMonthFreeChatOpeningSent(false)
    setNextMonthFreeChatReplies([])
    localStorage.setItem('mayday-next-month-free-chat-target', character)
    localStorage.setItem('mayday-next-month-free-chat-round', '0')
    localStorage.setItem('mayday-next-month-free-chat-replied', 'false')
    localStorage.setItem('mayday-next-month-free-chat-opening-sent', 'false')
    localStorage.setItem('mayday-next-month-free-chat-replies', '[]')
    setSelectedSmsThread(character)
    setActiveApp('messages')
  }

  const getNextMonthFreeChatContext = (character: RouteCharacterId): NextMonthFreeChatContext => {
    const inviteChoice = nextMonthInviteTarget && nextMonthInviteReplyChoice !== null
      ? nextMonthInviteRoutes[nextMonthInviteTarget].replyChoices[nextMonthInviteReplyChoice]
      : null
    const sharedInvite = nextMonthInviteTarget === character && inviteChoice?.accepted === true
    const sharedOpenDay = nextMonthOpenDayTarget === character
    if (sharedInvite && sharedOpenDay) return 'both'
    if (sharedInvite) return 'invite'
    if (sharedOpenDay) return 'open-day'
    return 'general'
  }

  const getNextMonthFreeChatRounds = (character: RouteCharacterId) => [
    nextMonthFreeChatContextRounds[character][getNextMonthFreeChatContext(character)],
    ...nextMonthFreeChatScripts[character],
  ]

  const chooseNextMonthFreeChatOpening = (choiceIndex: number) => {
    if (!nextMonthFreeChatTarget || nextMonthFreeChatOpeningSent) return
    const character = nextMonthFreeChatTarget
    const opening = nextMonthFreeChatOpeners[character][choiceIndex]
    const firstRound = getNextMonthFreeChatRounds(character)[0]
    if (!opening || !firstRound) return
    appendChatMessages(character, [
      { from: 'me', text: opening.text, time: '20:10' },
      { from: character, text: opening.response, time: '20:11' },
      { from: character, text: firstRound.incoming, time: '20:12' },
    ], '12月14日・晚上')
    addRouteAffection(character, opening.affection)
    setNextMonthFreeChatOpeningSent(true)
    localStorage.setItem('mayday-next-month-free-chat-opening-sent', 'true')
  }

  const chooseNextMonthFreeChatReply = (choiceIndex: number) => {
    if (!nextMonthFreeChatTarget || !nextMonthFreeChatOpeningSent || nextMonthFreeChatReplied) return
    const character = nextMonthFreeChatTarget
    const rounds = getNextMonthFreeChatRounds(character)
    const round = rounds[nextMonthFreeChatRound]
    const choice = round?.choices[choiceIndex]
    if (!choice) return
    const minute = 13 + nextMonthFreeChatRound * 2
    const time = '20:' + String(minute).padStart(2, '0')
    appendChatMessages(character, [
      { from: 'me', text: choice.text, time },
      ...choice.response.map((text) => ({ from: character, text, time })),
    ], '12月14日・晚上')
    const nextReplies = [...nextMonthFreeChatReplies, choiceIndex]
    setNextMonthFreeChatReplies(nextReplies)
    localStorage.setItem('mayday-next-month-free-chat-replies', JSON.stringify(nextReplies))
    addRouteAffection(character, choice.affection)
    if (nextMonthFreeChatRound < 4) {
      const nextRound = nextMonthFreeChatRound + 1
      setNextMonthFreeChatRound(nextRound)
      localStorage.setItem('mayday-next-month-free-chat-round', String(nextRound))
      appendChatMessages(character, [{ from: character, text: choice.nextIncoming ?? rounds[nextRound].incoming, time: '20:' + String(minute + 1).padStart(2, '0') }], '12月14日・晚上')
      setNextMonthFreeChatReplied(false)
      localStorage.setItem('mayday-next-month-free-chat-replied', 'false')
    } else {
      setNextMonthFreeChatReplied(true)
      localStorage.setItem('mayday-next-month-free-chat-replied', 'true')
    }
  }

  const finishNextMonthFreeChat = () => {
    if (!nextMonthFreeChatTarget || !nextMonthFreeChatOpeningSent || !nextMonthFreeChatReplied || nextMonthFreeChatRound !== 4 || nextMonthFreeChatReplies.length !== 5) return
    const eventCharacter = nextMonthEventKind === 'open-day'
      ? nextMonthEventCharacter ?? nextMonthOpenDayTarget ?? nextMonthInviteTarget ?? nextMonthFreeChatTarget
      : nextMonthEventCharacter ?? nextMonthInviteTarget ?? nextMonthOpenDayTarget ?? nextMonthFreeChatTarget
    const openDayCopy = nextMonthDiaryCopy[eventCharacter]
    const inviteChoice = nextMonthInviteTarget && nextMonthInviteReplyChoice !== null
      ? nextMonthInviteRoutes[nextMonthInviteTarget].replyChoices[nextMonthInviteReplyChoice]
      : null
    const acceptedInviteCopy = nextMonthInviteTarget && inviteChoice?.accepted
      ? nextMonthDiaryCopy[nextMonthInviteTarget]
      : null
    const eventSummary = [
      acceptedInviteCopy?.inviteSummary,
      openDayCopy.openDaySummary,
    ].filter(Boolean).join('\n\n')
    const diaryData: NextMonthDiaryData = {
      title: acceptedInviteCopy ? '今天也太充實了吧！' : openDayCopy.openDayTitle,
      eventSummary,
      chatSummary: nextMonthChatDiary[nextMonthFreeChatTarget],
      ending: openDayCopy.ending,
      eventCharacter,
      chatCharacter: nextMonthFreeChatTarget,
    }
    setNextMonthDiaryData(diaryData)
    setNextMonthDiaryUnlocked(true)
    localStorage.setItem('mayday-next-month-diary-data', JSON.stringify(diaryData))
    localStorage.setItem('mayday-next-month-diary-unlocked', 'true')
    const experience: CharacterExperienceRecord = {
      character: nextMonthFreeChatTarget,
      source: 'next-month-free-chat',
      date: saveGameDate,
      eventKey: 'next-month-free-chat:' + (acceptedInviteCopy ? 'invite:' + nextMonthInviteTarget : 'no-invite') + ':open-day:' + (nextMonthOpenDayTarget ?? 'none'),
      day2StrollAccepted,
      choices: [...nextMonthFreeChatReplies],
    }
    const nextExperienceLog = { ...sharedExperienceLog, [nextMonthFreeChatTarget]: experience }
    setSharedExperienceLog(nextExperienceLog)
    localStorage.setItem('mayday-shared-experience-log', JSON.stringify(nextExperienceLog))
    setSelectedSmsThread(null)
    setActiveApp(null)
    changeStage('next-month-diary')
  }

  const finishNextMonthChapter = () => {
    if (!nextMonthDiaryData) return
    localStorage.setItem('mayday-next-month-day-complete', 'true')
    localStorage.setItem('mayday-year-end-started', 'true')
    setSelectedSmsThread(null)
    setActiveApp(null)
    changeStage('year-end-intro')
  }

  const beginYearEndFireworks = () => {
    setActiveApp(null)
    setSelectedSmsThread(null)
    setYearEndFireworksReplies([])
    localStorage.setItem('mayday-year-end-fireworks-replies', '[]')
    changeStage('year-end-fireworks')
  }

  const sendYearEndShoppingInvite = (character: YearEndRouteCharacterId) => {
    const sentKey = 'mayday-year-end-shopping-invite-sent-' + character
    if (localStorage.getItem(sentKey) !== 'true') {
      appendChatMessages(
        character,
        yearEndShoppingRoutes[character].invitation.map((text, index) => ({
          from: character,
          text,
          time: '14:' + String(8 + index).padStart(2, '0'),
        })),
        '12月31日・下午',
      )
      localStorage.setItem(sentKey, 'true')
    }
    setYearEndInviteTarget(character)
    localStorage.setItem('mayday-year-end-invite-target', character)
    setYearEndShoppingReplyChoice(null)
    setYearEndShoppingReplies([])
    setActiveApp(null)
    setSelectedSmsThread(null)
    changeStage('year-end-shopping-notification')
  }

  const startYearEndFlow = () => {
    localStorage.setItem('mayday-year-end-started', 'true')
    const checkKey = 'mayday-year-end-invite-check-done'
    let candidates = yearEndInviteCandidates

    // The invitation threshold is evaluated once at this fixed December 31 checkpoint.
    // Later affection gains must never add new shopping invitations.
    if (localStorage.getItem(checkKey) !== 'true') {
      candidates = monthVisitOrder.filter((character) => routeAffection[character] >= YEAR_END_INVITE_THRESHOLD)
      localStorage.setItem(checkKey, 'true')
      localStorage.setItem('mayday-year-end-invite-candidates', JSON.stringify(candidates))
    } else {
      try {
        const frozen = JSON.parse(localStorage.getItem('mayday-year-end-invite-candidates') ?? '[]')
        candidates = Array.isArray(frozen)
          ? frozen.filter((id): id is YearEndRouteCharacterId => monthVisitOrder.includes(id as RouteCharacterId))
          : []
      } catch {
        candidates = []
      }
    }

    setYearEndInviteCandidates(candidates)
    if (candidates.length === 1) {
      sendYearEndShoppingInvite(candidates[0])
    } else if (candidates.length > 1) {
      changeStage('year-end-invite-notification')
    } else {
      beginYearEndFireworks()
    }
  }

  const chooseYearEndInviteTarget = (character: YearEndRouteCharacterId) => {
    if (!yearEndInviteCandidates.includes(character)) return
    sendYearEndShoppingInvite(character)
  }

  const openYearEndShoppingMessages = () => {
    if (!yearEndInviteTarget) return
    setSelectedSmsThread(yearEndInviteTarget)
    setActiveApp('messages')
    changeStage('year-end-shopping-chat')
  }

  const chooseYearEndShoppingReply = (index: number) => {
    if (!yearEndInviteTarget || yearEndShoppingReplyChoice !== null) return
    const choice = yearEndShoppingReplyChoices[yearEndInviteTarget][index]
    if (!choice) return
    appendChatMessages(yearEndInviteTarget, [
      { from: 'me', text: choice.text, time: '14:15' },
      ...choice.response.map((text, responseIndex) => ({ from: yearEndInviteTarget, text, time: responseIndex === 0 ? '14:16' : '14:17' })),
    ], '12月31日・下午')
    setYearEndShoppingReplyChoice(index)
    addRouteAffection(yearEndInviteTarget, choice.affection)
  }

  const continueYearEndShoppingInvite = () => {
    if (!yearEndInviteTarget || yearEndShoppingReplyChoice === null) return
    const accepted = yearEndShoppingReplyChoices[yearEndInviteTarget][yearEndShoppingReplyChoice]?.accepted
    setActiveApp(null)
    setSelectedSmsThread(null)
    if (accepted) {
      setYearEndShoppingReplies([])
      changeStage('year-end-shopping')
    } else {
      beginYearEndFireworks()
    }
  }

  const chooseYearEndShoppingReplyRound = (index: number) => {
    if (!yearEndInviteTarget) return
    const route = yearEndShoppingRoutes[yearEndInviteTarget]
    const round = route.rounds[yearEndShoppingReplies.length]
    const choice = round?.choices[index]
    if (!choice) return
    setYearEndShoppingReplies((current) => [...current, index])
    Object.entries(choice.affection).forEach(([character, amount]) => {
      if (amount) addRouteAffection(character as YearEndRouteCharacterId, amount)
    })
  }

  const finishYearEndShopping = () => {
    if (yearEndShoppingReplies.length !== 5) return
    localStorage.setItem('mayday-year-end-shopping-complete', 'true')
    beginYearEndFireworks()
  }

  const chooseYearEndFireworksReply = (index: number) => {
    const round = yearEndFireworksRounds[yearEndFireworksReplies.length]
    const choice = round?.choices[index]
    if (!choice) return
    setYearEndFireworksReplies((current) => [...current, index])
    Object.entries(choice.affection).forEach(([character, amount]) => {
      if (amount) addRouteAffection(character as YearEndRouteCharacterId, amount)
    })
  }

  const startYearEndNewYearMessages = () => {
    const candidates = monthVisitOrder.filter((character) => routeAffection[character] >= YEAR_END_INVITE_THRESHOLD)
    setYearEndGreetingQueue(candidates)
    setYearEndGreetingIndex(0)
    setYearEndProactiveSent([])
    setYearEndExtendedChatCharacters([])
    setYearEndFirstReplySent(false)
    localStorage.setItem('mayday-year-end-greeting-queue', JSON.stringify(candidates))
    localStorage.setItem('mayday-year-end-greeting-index', '0')
    localStorage.setItem('mayday-year-end-proactive-sent', '[]')
    localStorage.setItem('mayday-year-end-extended-chat-characters', '[]')
    if (candidates.length) {
      const character = candidates[0]
      setYearEndGreetingTarget(character)
      setYearEndChatMode('incoming')
      appendChatMessages(character, [{ from: character, text: yearEndNewYearMessages[character], time: '00:05' }], '1997年1月1日・凌晨')
      setActiveApp(null)
      setSelectedSmsThread(null)
      changeStage('year-end-new-year-notification')
    } else {
      setYearEndGreetingTarget(null)
      setActiveApp(null)
      setSelectedSmsThread(null)
      changeStage('year-end-free-chat-picker')
    }
  }

  const advanceYearEndGreetingQueue = () => {
    const nextIndex = yearEndGreetingIndex + 1
    if (nextIndex < yearEndGreetingQueue.length) {
      const character = yearEndGreetingQueue[nextIndex]
      setYearEndGreetingIndex(nextIndex)
      setYearEndGreetingTarget(character)
      setYearEndChatMode('incoming')
      setYearEndFirstReplySent(false)
      appendChatMessages(character, [{ from: character, text: yearEndNewYearMessages[character], time: '00:' + String(5 + nextIndex * 2).padStart(2, '0') }], '1997年1月1日・凌晨')
      setActiveApp(null)
      setSelectedSmsThread(null)
      changeStage('year-end-new-year-notification')
    } else {
      setYearEndGreetingTarget(null)
      setActiveApp(null)
      setSelectedSmsThread(null)
      changeStage('year-end-free-chat-picker')
    }
  }

  const finishYearEndFireworks = () => {
    if (yearEndFireworksReplies.length !== 5) return
    localStorage.setItem('mayday-year-end-fireworks-complete', 'true')
    startYearEndNewYearMessages()
  }

  const openYearEndNewYearMessages = () => {
    if (!yearEndGreetingTarget) return
    setSelectedSmsThread(yearEndGreetingTarget)
    setActiveApp('messages')
    changeStage('year-end-new-year-chat')
  }

  const chooseYearEndIncomingGreetingReply = (index: number) => {
    if (!yearEndGreetingTarget || yearEndChatMode !== 'incoming' || yearEndGreetingTarget === 'youda' || yearEndFirstReplySent) return
    const choice = yearEndNewYearReplies[yearEndGreetingTarget][index]
    if (!choice) return
    const replyMinute = 7 + yearEndGreetingIndex * 2
    appendChatMessages(yearEndGreetingTarget, [
      { from: 'me', text: choice.text, time: '00:' + String(replyMinute).padStart(2, '0') },
      ...choice.response.map((text, responseIndex) => ({ from: yearEndGreetingTarget, text, time: '00:' + String(replyMinute + responseIndex + 1).padStart(2, '0') })),
    ], '1997年1月1日・凌晨')
    addRouteAffection(yearEndGreetingTarget, choice.affection)
    setYearEndFirstReplySent(true)
  }

  const chooseYearEndProactiveGreeting = (index: number) => {
    if (!yearEndGreetingTarget || yearEndChatMode !== 'outgoing' || yearEndFirstReplySent) return
    const choice = yearEndProactiveOpeners[yearEndGreetingTarget][index]
    if (!choice) return
    appendChatMessages(yearEndGreetingTarget, [
      { from: 'me', text: choice.text, time: '00:15' },
      ...choice.response.map((text, responseIndex) => ({ from: yearEndGreetingTarget, text, time: responseIndex === 0 ? '00:16' : '00:17' })),
    ], '1997年1月1日・凌晨')
    addRouteAffection(yearEndGreetingTarget, choice.affection)
    setYearEndProactiveSent((current) => current.includes(yearEndGreetingTarget) ? current : [...current, yearEndGreetingTarget])
    setYearEndFirstReplySent(true)
  }

  const continueYearEndGreetingChat = () => {
    if (!yearEndGreetingTarget || !yearEndFirstReplySent) return
    setYearEndFreeChatRound(0)
    setYearEndFreeChatReplied(false)
    setYearEndFreeChatReplies([])
    appendChatMessages(yearEndGreetingTarget, [{ from: yearEndGreetingTarget, text: yearEndFreeChatScripts[yearEndGreetingTarget][0].incoming, time: '00:20' }], '1997年1月1日・凌晨')
    setSelectedSmsThread(yearEndGreetingTarget)
    setActiveApp('messages')
    changeStage('year-end-free-chat')
  }

  const finishYearEndGreetingWithoutChat = () => {
    if (!yearEndGreetingTarget || !yearEndFirstReplySent) return
    setActiveApp(null)
    setSelectedSmsThread(null)
    if (yearEndChatMode === 'incoming') {
      advanceYearEndGreetingQueue()
    } else {
      changeStage('year-end-free-chat-picker')
    }
  }

  const chooseYearEndFreeChatTarget = (character: YearEndCharacterId) => {
    if (yearEndGreetingQueue.includes(character as YearEndRouteCharacterId) || yearEndProactiveSent.includes(character)) return
    setYearEndGreetingTarget(character)
    setYearEndChatMode('outgoing')
    setYearEndFirstReplySent(false)
    setSelectedSmsThread(character)
    setActiveApp('messages')
    changeStage('year-end-new-year-chat')
  }

  const openYearEndFreeChatMessages = () => {
    if (!yearEndGreetingTarget) return
    setSelectedSmsThread(yearEndGreetingTarget)
    setActiveApp('messages')
  }

  const chooseYearEndFreeChatReply = (index: number) => {
    if (!yearEndGreetingTarget || yearEndFreeChatReplied) return
    const rounds = yearEndFreeChatScripts[yearEndGreetingTarget]
    const round = rounds[yearEndFreeChatRound]
    const choice = round?.choices[index]
    if (!choice) return
    const minute = 20 + yearEndGreetingIndex * 2 + yearEndFreeChatRound * 5
    appendChatMessages(yearEndGreetingTarget, [
      { from: 'me', text: choice.text, time: '00:' + String(minute).padStart(2, '0') },
      ...choice.response.map((text, responseIndex) => ({ from: yearEndGreetingTarget, text, time: '00:' + String(minute + responseIndex + 1).padStart(2, '0') })),
    ], '1997年1月1日・凌晨')
    addRouteAffection(yearEndGreetingTarget, choice.affection)
    const nextRound = yearEndFreeChatRound + 1
    setYearEndFreeChatReplies((current) => [...current, index])
    if (nextRound < 5) {
      setYearEndFreeChatRound(nextRound)
      setYearEndFreeChatReplied(false)
      appendChatMessages(yearEndGreetingTarget, [{ from: yearEndGreetingTarget, text: rounds[nextRound].incoming, time: '00:' + String(minute + 3).padStart(2, '0') }], '1997年1月1日・凌晨')
    } else {
      setYearEndFreeChatReplied(true)
    }
  }

  const finishYearEndFreeChat = () => {
    if (!yearEndGreetingTarget || yearEndFreeChatRound !== 4 || !yearEndFreeChatReplied) return
    setYearEndExtendedChatCharacters((current) => current.includes(yearEndGreetingTarget) ? current : [...current, yearEndGreetingTarget])
    setActiveApp(null)
    setSelectedSmsThread(null)
    if (yearEndChatMode === 'incoming') {
      advanceYearEndGreetingQueue()
    } else {
      changeStage('year-end-free-chat-picker')
    }
  }

  const buildYearEndDiaryData = (): YearEndDiaryData => {
    const focus = yearEndInviteTarget
    const entries: Record<YearEndRouteCharacterId, string> = {
      wen: '溫尚翊今天真的很煩。市場那麼多人，他偏偏還記得我喜歡哪種水果糖，拿起來就問我要不要。講完「這有什麼好忘的」又一副沒事的樣子，啊不然咧，我要怎麼接啦。那包糖我有好好收著，才沒有一直拿出來看。\n\n晚上河堤冷得要命，大家卻吵到像在辦園遊會。佑達倒數倒太快，瑪莎還在旁邊故意搗亂，溫尚翊蹲著拆仙女棒，嘴裡一直叫我們站遠一點。煙火炸開的時候我本來想許願，結果第一聲太大，我整個人先縮了一下，旁邊那幾個還笑我。算了啦，反正新年才剛開始，願望晚點再想。',
      masa: '我真的快被瑪莎笑死。說好去買年貨，結果一路都在試吃，還把清單弄得皺巴巴的。那個辣餅乾明明辣到眼睛都快睜不開了，還硬說是市場太熱。最好是。回去以後我一定要提醒他，他欠我一杯水。\n\n晚上他又跟佑達為了一包零食吵起來，兩個人幼稚得不得了。我本來想勸架，後來想想還是算了，反正他們吵完照樣一起玩。跨年那幾秒根本沒人在好好倒數，聲音全混在一起，亂七八糟的，倒是很好笑。',
      ashin: '阿信今天居然還準備了卡片。大家的那幾張已經夠忙了，他還另外留了一張給我。拿到的時候我只會說謝謝，回來才發現自己根本沒認真看周圍的人，腦袋一直在想那幾行字。明天再看一次好了……不對，我剛剛是不是已經看第三次了？\n\n晚上他忙著分飲料，自己的那杯放到都快忘記。煙火升起來時，他就在旁邊跟大家一起喊，沒有講什麼特別的話。可是那張卡片現在就在桌上，我每次經過都會瞄一眼。好啦，收進書裡，不然真的沒完沒了。',
      stone: '石頭今天又拍了好多照片。市場那個水窪到底有什麼好拍的，他蹲在那邊看半天，還很認真地把相機拿給我看。結果他後來拍到我挑糖果的樣子，還說很自然。哪裡自然啦，我那時候明明在挑半天。\n\n他說照片洗出來會給我看，我現在居然有點期待。跨年時大家都在亂喊，石頭還想把每個人都拍進去，瑪莎偏偏一直做鬼臉。希望底片沒有被他拍光，不然下次又要聽他念。',
      yanming: '諺明哥的清單真的細到有點誇張，連飲料幾杯都寫好了。可是他沒有一直催我，還先把熱飲遞過來，叫我慢慢喝。紅豆餅也是，我明明只停下來看了一眼，他就去買了兩個。拿到手才發現那個還燙得要命，我差點直接咬下去。\n\n晚上大家忙成一團，他一直在確認東西有沒有放好。明明是跨年，怎麼有種他在帶隊校外教學的感覺啦。可是他最後也有跟大家一起喊，笑得很開心。那個紅豆餅我現在還記得，外皮脆脆的，裡面燙到我舌頭。下次要先吹啦，笨死了。',
    }
    const shared = '現在外面應該還有人在放鞭炮吧，窗戶關著都聽得到。頭髮好像還有一點煙火味，外套也不知道沾到誰的零食屑。明天再整理好了。新年快樂啦，一九九七。'
    const diaryText = focus ? entries[focus] + '\n\n' + shared : '剛剛大家真的吵死了。佑達喊倒數，瑪莎偏要搶他的拍子，阿信拿著飲料到處找人，石頭忙著拍照，諺明哥一直確認仙女棒有沒有拿好，溫尚翊蹲在旁邊拆包裝還嫌我們站太近。煙火一放，所有人都在叫，我也跟著叫，根本不知道自己在喊什麼。\n\n現在安靜下來反而有點不習慣。外面還有人在放鞭炮，頭髮好像有煙火味，外套上不知道沾到誰的零食屑。明天再整理好了。新年快樂啦，一九九七。'
    return { title: '一九九六年最後一天', sections: [{ label: '日記', text: diaryText }] }
  }

  const startYearEndDiary = () => {
    const data = buildYearEndDiaryData()
    setYearEndDiaryData(data)
    setYearEndDiaryUnlocked(true)
    localStorage.setItem('mayday-year-end-diary-data', JSON.stringify(data))
    localStorage.setItem('mayday-year-end-diary-unlocked', 'true')
    setActiveApp(null)
    setSelectedSmsThread(null)
    changeStage('year-end-diary')
  }

  const finishYearEndDiary = () => {
    if (!yearEndDiaryData) return
    localStorage.setItem('mayday-year-end-day-complete', 'true')
    setYearEndDiaryUnlocked(true)
    localStorage.removeItem('mayday-winter-exam-chat-started')
    localStorage.removeItem('mayday-winter-exam-chat-reply-choice')
    localStorage.removeItem('mayday-winter-exam-chat-choice-confirmed-v2')
    localStorage.removeItem('mayday-winter-exam-chat-closing-choice')
    setWinterExamChatReplyChoice(null)
    setWinterExamChatClosingChoice(null)
    const tutoringUnlocked = routeAffection.wen > 40
    setWinterExamTutoringUnlocked(tutoringUnlocked)
    localStorage.setItem('mayday-winter-exam-tutoring-unlocked', String(tutoringUnlocked))
    setWinterExamReplies([])
    setWinterPracticeReplies([])
    setWinterYanmingPickupAvailable(false)
    setWinterBusStopCharacter(null)
    setWinterBusStopReplies([])
    setWinterDiaryUnlocked(false)
    setWinterDiaryData(null)
    setActiveApp(null)
    setSelectedSmsThread(null)
    changeStage('winter-exam-intro')
  }

  const startWinterExamChat = () => {
    const openingMessages: NewChatEntry[] = [
      { from: 'me', text: '溫尚翊！！你明天下午有空嗎？', time: '19:32' },
      { from: 'wen', text: '怎樣啦？突然找我。', time: '19:33' },
      { from: 'me', text: '我跟機率統計快吵起來了……尤其貝氏定理，我每次都把條件放反。', time: '19:34' },
      { from: 'wen', text: '哈哈哈哈哈，妳前幾天不是還說快弄懂了？', time: '19:35' },
      { from: 'me', text: '我那時候太有自信了……現在看題目又開始懷疑人生。', time: '19:36' },
      { from: 'wen', text: '好啦好啦，先不要跟課本吵架。妳要我幫妳看喔？明天下午我有空，妳幾點方便？', time: '19:37' },
    ]
    const oldOpeningText = '溫尚翊，你這幾天有空嗎？我統計學有幾個地方真的搞不太懂，想問你能不能幫我補習一下？'
    const oldChoiceTexts = [
      '我有幾題機率真的卡住了，尤其是條件機率跟貝氏定理……明天下午去圖書館可以嗎？',
      '我快被二項分配、卜瓦松分配搞混了啦！你明天下午能不能救救我？',
      '如果你方便的話，明天下午可以陪我整理一下機率分配嗎？我想弄懂題目到底該怎麼判斷。',
    ]
    const migrationKey = 'mayday-winter-exam-chat-copy-v2'
    if (localStorage.getItem(migrationKey) !== 'true') {
      const oldIndex = (chatMessages.wen ?? []).findIndex((message) => message.text === oldOpeningText)
      if (oldIndex >= 0) {
        setChatMessages((current) => {
          const thread = current.wen ?? []
          const index = thread.findIndex((message) => message.text === oldOpeningText)
          if (index < 0) return current
          let endIndex = index + 3
          if (thread[endIndex]?.from === 'me' && oldChoiceTexts.includes(thread[endIndex].text)) endIndex += 4
          const stamp = Date.now()
          const replacement = openingMessages.map((entry, messageIndex) => ({
            id: 'wen-winter-exam-v2-' + stamp + '-' + messageIndex,
            date: '1月7日・晚上',
            time: entry.time,
            from: entry.from,
            text: entry.text,
          }))
          return { ...current, wen: [...thread.slice(0, index), ...replacement, ...thread.slice(endIndex)] }
        })
        setWinterExamChatReplyChoice(null)
        localStorage.removeItem('mayday-winter-exam-chat-reply-choice')
      }
      localStorage.setItem(migrationKey, 'true')
    }
    if (localStorage.getItem('mayday-winter-exam-chat-started') !== 'true') {
      appendChatMessages('wen', openingMessages, '1月7日・晚上')
      localStorage.setItem('mayday-winter-exam-chat-started', 'true')
      setWinterExamChatReplyChoice(null)
    }
    setSelectedSmsThread('wen')
    setActiveApp('messages')
    changeStage('winter-exam-chat')
  }

  const chooseWinterExamChatReply = (choiceIndex: number) => {
    if (winterExamChatReplyChoice !== null) return
    const choice = winterExamChatChoices[choiceIndex]
    if (!choice) return
    appendChatMessages('wen', [
      { from: 'me', text: choice.text, time: '19:39' },
      { from: 'wen', text: choice.response, time: '19:40' },
    ], '1月7日・晚上')
    setWinterExamChatReplyChoice(choiceIndex)
    localStorage.setItem('mayday-winter-exam-chat-choice-confirmed-v2', 'true')
    localStorage.setItem('mayday-winter-exam-chat-reply-choice', String(choiceIndex))
  }

  const chooseWinterExamChatClosingReply = (choiceIndex: number) => {
    if (winterExamChatReplyChoice === null || winterExamChatClosingChoice !== null) return
    const choice = winterExamChatClosingChoices[choiceIndex]
    if (!choice) return
    appendChatMessages('wen', [
      { from: 'me', text: choice.text, time: '19:41' },
      { from: 'wen', text: choice.response, time: '19:42' },
    ], '1月7日・晚上')
    setWinterExamChatClosingChoice(choiceIndex)
    localStorage.setItem('mayday-winter-exam-chat-closing-choice', String(choiceIndex))
  }

  const continueWinterExamTutoring = () => {
    if (winterExamChatReplyChoice === null || winterExamChatClosingChoice === null) return
    setActiveApp(null)
    setSelectedSmsThread(null)
    changeStage('winter-exam-tutoring')
  }

  const chooseWinterExamReply = (choiceIndex: number) => {
    if (winterExamReplies.length >= winterExamTutoringRounds.length) return
    const choice = winterExamTutoringRounds[winterExamReplies.length]?.choices[choiceIndex]
    if (!choice) return
    Object.entries(choice.affection).forEach(([character, amount]) => {
      if (amount) addRouteAffection(character as WinterCharacterId, amount)
    })
    setWinterExamReplies((current) => [...current, choiceIndex])
  }

  const chooseWinterPracticeReply = (choiceIndex: number) => {
    if (winterPracticeReplies.length >= winterBreakPracticeRounds.length) return
    const choice = winterBreakPracticeRounds[winterPracticeReplies.length]?.choices[choiceIndex]
    if (!choice) return
    Object.entries(choice.affection).forEach(([character, amount]) => {
      if (amount) addRouteAffection(character as WinterCharacterId, amount)
    })
    setWinterPracticeReplies((current) => [...current, choiceIndex])
  }

  const finishWinterPractice = () => {
    if (winterPracticeReplies.length !== winterBreakPracticeRounds.length) return
    changeStage('winter-break-gig')
  }

  const finishWinterGig = () => {
    const pickupAvailable = routeAffection.yanming >= 40
    setWinterYanmingPickupAvailable(pickupAvailable)
    localStorage.setItem('mayday-winter-yanming-pickup-available', String(pickupAvailable))
    changeStage(pickupAvailable ? 'winter-break-pickup' : 'winter-break-bus-choice')
  }

  const chooseWinterBusStopCharacter = (character: WinterCharacterId) => {
    if (character === 'yanming' && !winterYanmingPickupAvailable) return
    setWinterBusStopCharacter(character)
    setWinterBusStopReplies([])
    localStorage.setItem('mayday-winter-bus-stop-character', character)
    localStorage.setItem('mayday-winter-bus-stop-replies', '[]')
    changeStage('winter-break-bus')
  }

  const chooseWinterBusStopReply = (choiceIndex: number) => {
    if (!winterBusStopCharacter || winterBusStopReplies.length >= 3) return
    const round = winterBusStopRoutes[winterBusStopCharacter].rounds[winterBusStopReplies.length]
    const choice = round?.choices[choiceIndex]
    if (!choice) return
    const nextReplies = [...winterBusStopReplies, choiceIndex]
    setWinterBusStopReplies(nextReplies)
    localStorage.setItem('mayday-winter-bus-stop-replies', JSON.stringify(nextReplies))
    const affection = choice.affection[winterBusStopCharacter] ?? 0
    if (affection) addRouteAffection(winterBusStopCharacter, affection)
  }

  const buildWinterDiaryData = (): WinterDiaryData => {
    const route = winterBusStopCharacter ? winterBusStopRoutes[winterBusStopCharacter] : null
    const fallback = '現在耳朵還在嗡嗡叫。下午練團室裡瑪莎和佑達為了一條導線吵半天，晚上到了酒吧又像什麼事都沒發生，配合得比誰都好。最後佑達真的加了鼓花，瑪莎嘴上嫌他，手上還不是接得好好的。回來突然安靜下來，才發現我剛才一直在笑。'
    return {
      title: '一月二十二日，還沒睡',
      sections: [{ label: '日記', text: route?.diarySummary ?? fallback }],
    }
  }

  const startWinterDiary = () => {
    if (!winterBusStopCharacter || winterBusStopReplies.length !== winterBusStopRoutes[winterBusStopCharacter].rounds.length) return
    const data = buildWinterDiaryData()
    setWinterDiaryData(data)
    setWinterDiaryUnlocked(true)
    localStorage.setItem('mayday-winter-diary-data', JSON.stringify(data))
    localStorage.setItem('mayday-winter-diary-unlocked', 'true')
    setActiveApp(null)
    setSelectedSmsThread(null)
    changeStage('winter-diary')
  }
  const finishWinterDiary = () => {
    if (!winterDiaryData) return
    localStorage.setItem('mayday-winter-break-day-complete', 'true')
    setWinterDiaryUnlocked(true)
    setActiveApp(null)
    setSelectedSmsThread(null)
    changeStage('february-intro')
  }

  const chooseFebruarySecretTarget = (character: FebruaryCharacterId) => {
    if (februarySecretTarget !== null) return
    setFebruarySecretTarget(character)
    localStorage.setItem('mayday-february-secret-target', character)
    addRouteAffection(character, 1)
  }

  const chooseFebruarySecretReply = (choiceIndex: number) => {
    if (!februarySecretTarget || februarySecretReply !== null) return
    const choice = februarySecretReplyChoices[choiceIndex]
    if (!choice) return
    setFebruarySecretReply(choiceIndex)
    localStorage.setItem('mayday-february-secret-reply', String(choiceIndex))
    addRouteAffection(februarySecretTarget, choice.affection)
  }

  const chooseFebruaryDinnerReply = (choiceIndex: number) => {
    if (februaryDinnerReply !== null) return
    const choice = februaryDinnerChoices[choiceIndex]
    if (!choice) return
    setFebruaryDinnerReply(choiceIndex)
    localStorage.setItem('mayday-february-dinner-reply', String(choiceIndex))
    const updatedAffection = { ...routeAffection }
    Object.entries(choice.affection).forEach(([character, amount]) => {
      if (amount) {
        addRouteAffection(character as FebruaryCharacterId, amount)
        updatedAffection[character as FebruaryCharacterId] += amount
      }
    })
    const focusOrder: FebruaryCharacterId[] = ['wen', 'ashin', 'masa', 'stone', 'yanming']
    const best = focusOrder.reduce((current, character) => updatedAffection[character] > updatedAffection[current] ? character : current, focusOrder[0])
    setFebruaryTableCharacter(best)
    localStorage.setItem('mayday-february-table-character', best)
  }

  const chooseFebruaryAfterDinnerCharacter = (character: FebruaryCharacterId) => {
    setFebruaryAfterDinnerCharacter(character)
    setFebruaryAfterDinnerReplies([])
    localStorage.setItem('mayday-february-after-dinner-character', character)
    localStorage.setItem('mayday-february-after-dinner-replies', '[]')
    // Choosing to spend the walk with this character is itself a relationship choice.
    addRouteAffection(character, 1)
    changeStage('february-after-dinner')
  }

  const chooseFebruaryAfterDinnerReply = (choiceIndex: number) => {
    if (!februaryAfterDinnerCharacter || februaryAfterDinnerReplies.length >= 3) return
    const route = februaryAfterDinnerRoutes[februaryAfterDinnerCharacter]
    const choice = route.rounds[februaryAfterDinnerReplies.length]?.choices[choiceIndex]
    if (!choice) return
    const nextReplies = [...februaryAfterDinnerReplies, choiceIndex]
    setFebruaryAfterDinnerReplies(nextReplies)
    localStorage.setItem('mayday-february-after-dinner-replies', JSON.stringify(nextReplies))
    const affection = choice.affection[februaryAfterDinnerCharacter] ?? 0
    if (affection) addRouteAffection(februaryAfterDinnerCharacter, affection)
  }

  const buildFebruaryDiaryData = (): FebruaryDiaryData => {
    const secretTarget = februarySecretTarget ?? 'wen'
    const tableTarget = februaryTableCharacter ?? 'wen'
    const afterTarget = februaryAfterDinnerCharacter ?? 'wen'
    const dinnerMemories = [
      '吃飯時瑪莎突然問我，三月底如果他們真的報上了，我會不會去。我當然說會啊，還補了一句自己可是忠實觀眾。佑達馬上把這句話當成在替他個人應援，瑪莎當然也不肯放過他。',
      '我說我比較擔心佑達，到時候不要又突然加一堆鼓花。他立刻抗議我怎麼也跟著瑪莎欺負他，瑪莎倒是笑得很開心。其實我只是想看他到時候能不能忍住不加戲。',
      '我叫他們先把歌好好練熟，別到時候上台才發現還沒準備好。石頭和阿信都很認真地答應了，溫尚翊也說不會讓我失望。突然有點期待三月底了。',
    ]
    const groupText = februaryDinnerReply === null ? '' : dinnerMemories[februaryDinnerReply]
    const lastRound = februaryAfterDinnerRoutes[afterTarget].rounds[2]
    const lastChoice = lastRound.choices[februaryAfterDinnerReplies[2] ?? 0]
    const endingNote = lastChoice
      ? '最後聊到三月底的演出，他問我會不會去。我回了：「' + lastChoice.text.replace(/^「|」$/g, '') + '」'
      : ''
    const text = [
      '我現在只要想到佑達拿著那支粗頭筆的樣子就想笑。\\n\\n他寫「暗黑究極音波使徒」的時候，那個表情認真得不得了，好像下一秒真的要帶我們去拯救世界。瑪莎每吐槽一句，他就多解釋兩句，後來居然還扯出五芒星、銀河系……我真的很想知道，他平常到底都在看些什麼。\\n\\n最後救場的居然是瑪莎自己的 BBS 名字。Mayday。就這樣？前面那幾個名字瞬間變成廢紙，佑達還一臉不甘心。可是看著溫尚翊把 MAYDAY 寫進報名表的時候，我突然覺得三月底真的越來越近了。',
      februarySecretDiaryText[secretTarget],
      groupText,
      februaryTableDiaryText[tableTarget],
      februaryAfterDinnerDiaryText[afterTarget],
      endingNote,
      '不知道這個名字最後會走到哪裡。不過今天看他們為了一張報名表吵成這樣，反而覺得很踏實。希望三月底真的能站上那個舞台。到時候我一定要去。',
    ].filter(Boolean).join('\\n\\n')
    return { title: '佑達今天真的很有事', text }
  }

  const startFebruaryDiary = () => {
    if (!februarySecretTarget || februarySecretReply === null || februaryDinnerReply === null || !februaryTableCharacter || !februaryAfterDinnerCharacter || februaryAfterDinnerReplies.length !== 3) return
    const data = buildFebruaryDiaryData()
    setFebruaryDiaryData(data)
    setFebruaryDiaryUnlocked(true)
    localStorage.setItem('mayday-february-diary-data', JSON.stringify(data))
    localStorage.setItem('mayday-february-diary-unlocked', 'true')
    setActiveApp(null)
    setSelectedSmsThread(null)
    changeStage('february-diary')
  }

  const finishFebruaryDiary = () => {
    if (!februaryDiaryData) return
    localStorage.setItem('mayday-february-day-complete', 'true')
    setFebruaryDiaryUnlocked(true)
    setActiveApp(null)
    setSelectedSmsThread(null)
    changeStage('spring-term-intro')
  }

  const beginSpringInvites = () => {
    if (localStorage.getItem('mayday-spring-invites-sent') === 'true') {
      changeStage('spring-invite-picker')
      return
    }
    const candidates = springCharacterOrder.filter((character) => routeAffection[character] > SPRING_INVITE_THRESHOLD)
    setSpringInviteCandidates(candidates)
    setSpringInviteDeclined([])
    setSpringInviteTarget(null)
    setSpringInviteReplies([])
    localStorage.setItem('mayday-spring-invite-candidates', JSON.stringify(candidates))
    localStorage.setItem('mayday-spring-invite-declined', '[]')
    localStorage.removeItem('mayday-spring-invite-target')
    localStorage.setItem('mayday-spring-invite-replies', '[]')
    localStorage.setItem('mayday-spring-invites-sent', 'true')
    changeStage('spring-invite-picker')
  }

  const chooseSpringInviteTarget = (character: SpringCharacterId) => {
    if (!springInviteCandidates.includes(character) || springInviteDeclined.includes(character) || springStoreCharacter) return
    if (springInviteTarget) return
    setSpringInviteTarget(character)
    localStorage.setItem('mayday-spring-invite-target', character)
    // Opening one invitation is a deliberate choice to give that person attention.
    addRouteAffection(character, 1)
    setSpringInviteReplies([])
    localStorage.setItem('mayday-spring-invite-replies', '[]')
    const sentKey = 'mayday-spring-invite-thread-sent-' + character
    if (localStorage.getItem(sentKey) !== 'true') {
      const existing = chatMessages[character] ?? []
      const openingMessages = springInviteRounds[character][0].incoming
      const missingMessages = openingMessages.filter((text) => !existing.some((message) =>
        message.from === character && message.date === '1997年2月17日・下午' && message.text === text
      ))
      if (missingMessages.length) {
        appendChatMessages(character, missingMessages.map((text, index) => ({
          from: character,
          text,
          time: '14:' + String(5 + index).padStart(2, '0'),
        })), '1997年2月17日・下午')
      }
      localStorage.setItem(sentKey, 'true')
    }
    setActiveApp(null)
    setSelectedSmsThread(null)
    changeStage('spring-invite-notification')
  }

  const openSpringInviteMessages = () => {
    if (!springInviteTarget) return
    setSelectedSmsThread(springInviteTarget)
    setActiveApp('messages')
    changeStage('spring-invite-chat')
  }

  const chooseSpringInviteReply = (choiceIndex: number) => {
    if (!springInviteTarget) return
    const rounds = springInviteRounds[springInviteTarget]
    const round = rounds[springInviteReplies.length]
    const choice = round?.choices[choiceIndex]
    if (!choice) return
    const minute = 8 + springInviteReplies.length * 6
    const time = (value: number) => '14:' + String(value).padStart(2, '0')
    appendChatMessages(springInviteTarget, [
      { from: 'me', text: choice.text, time: time(minute) },
      ...choice.response.map((text, index) => ({ from: springInviteTarget, text, time: time(minute + index + 1) })),
      ...(rounds[springInviteReplies.length + 1]?.incoming ?? []).map((text, index) => ({
        from: springInviteTarget,
        text,
        time: time(minute + choice.response.length + index + 1),
      })),
    ], '1997年2月17日・下午')
    const nextReplies = [...springInviteReplies, choiceIndex]
    setSpringInviteReplies(nextReplies)
    localStorage.setItem('mayday-spring-invite-replies', JSON.stringify(nextReplies))
    addRouteAffection(springInviteTarget, choice.affection)
  }

  const finishSpringInvite = () => {
    if (!springInviteTarget || !springInviteFinalChoice) return
    const character = springInviteTarget
    setActiveApp(null)
    setSelectedSmsThread(null)
    if (springInviteFinalChoice.accepted) {
      setSpringStoreCharacter(character)
      localStorage.setItem('mayday-spring-store-character', character)
      setSpringStoreReply(null)
      localStorage.removeItem('mayday-spring-store-reply')
      setSpringStoreSecondReply(null)
      localStorage.removeItem('mayday-spring-store-second-reply')
      setSpringStoreThirdReply(null)
      localStorage.removeItem('mayday-spring-store-third-reply')
      setSpringInviteTarget(null)
      localStorage.removeItem('mayday-spring-invite-target')
      setSpringInviteReplies([])
      localStorage.setItem('mayday-spring-invite-replies', '[]')
      changeStage('spring-store')
      return
    }
    const declined = [...new Set([...springInviteDeclined, character])]
    setSpringInviteDeclined(declined)
    localStorage.setItem('mayday-spring-invite-declined', JSON.stringify(declined))
    setSpringInviteTarget(null)
    localStorage.removeItem('mayday-spring-invite-target')
    setSpringInviteReplies([])
    localStorage.setItem('mayday-spring-invite-replies', '[]')
    changeStage('spring-invite-picker')
  }

  const chooseSpringStoreReply = (choiceIndex: number) => {
    if (!springStoreCharacter || springStoreReply !== null) return
    const choice = springStoreRoutes[springStoreCharacter].rounds[0].choices[choiceIndex]
    if (!choice) return
    setSpringStoreReply(choiceIndex)
    localStorage.setItem('mayday-spring-store-reply', String(choiceIndex))
    addRouteAffection(springStoreCharacter, choice.affection)
  }

  const chooseSpringStoreSecondReply = (choiceIndex: number) => {
    if (!springStoreCharacter || springStoreReply === null || springStoreSecondReply !== null) return
    const choice = springStoreRoutes[springStoreCharacter].rounds[1].choices[choiceIndex]
    if (!choice) return
    setSpringStoreSecondReply(choiceIndex)
    localStorage.setItem('mayday-spring-store-second-reply', String(choiceIndex))
    addRouteAffection(springStoreCharacter, choice.affection)
  }

  const chooseSpringStoreThirdReply = (choiceIndex: number) => {
    if (!springStoreCharacter || springStoreSecondReply === null || springStoreThirdReply !== null) return
    const choice = springStoreRoutes[springStoreCharacter].rounds[2].choices[choiceIndex]
    if (!choice) return
    setSpringStoreThirdReply(choiceIndex)
    localStorage.setItem('mayday-spring-store-third-reply', String(choiceIndex))
    addRouteAffection(springStoreCharacter, choice.affection)
  }

  const openSpringSmsPicker = () => {
    if (saveGameDate !== '1997.02.17' || springSmsEventComplete ||
      localStorage.getItem('mayday-spring-sms-event-complete') === 'true') return
    if (springSmsEventStarted && springSmsTarget) {
      setSelectedSmsThread(springSmsTarget)
      setActiveApp('messages')
      changeStage('spring-sms-chat')
      return
    }
    changeStage('spring-sms-picker')
  }

  const chooseSpringAfterChoice = (choice: 'yanming-dinner' | 'lesson' | 'home') => {
    setSpringAfterChoice(choice)
    // Dinner is a direct choice to spend one-on-one time with Yanming; lesson points wait until a teacher is chosen, and going home is neutral.
    if (choice === 'yanming-dinner') addRouteAffection('yanming', 1)
    localStorage.setItem('mayday-spring-after-choice', choice)
    if (choice === 'yanming-dinner') {
      setSpringLessonCharacter(null)
      localStorage.removeItem('mayday-spring-lesson-character')
      setSpringLessonReplies([])
      localStorage.removeItem('mayday-spring-lesson-replies')
      localStorage.removeItem('mayday-spring-lesson-touch-choice')
      localStorage.removeItem('mayday-spring-lesson-reply')
      setSpringDinnerReplies([])
      localStorage.setItem('mayday-spring-dinner-replies', '[]')
      localStorage.removeItem('mayday-spring-dinner-reply')
      changeStage('spring-dinner')
    } else if (choice === 'lesson') {
      setSpringLessonReplies([])
      localStorage.removeItem('mayday-spring-lesson-replies')
      localStorage.removeItem('mayday-spring-lesson-touch-choice')
      localStorage.removeItem('mayday-spring-lesson-reply')
      setSpringDinnerReplies([])
      localStorage.removeItem('mayday-spring-dinner-replies')
      localStorage.removeItem('mayday-spring-dinner-reply')
      changeStage('spring-after-picker')
    } else {
      setSpringLessonCharacter(null)
      localStorage.removeItem('mayday-spring-lesson-character')
      setSpringLessonReplies([])
      localStorage.removeItem('mayday-spring-lesson-replies')
      localStorage.removeItem('mayday-spring-lesson-touch-choice')
      localStorage.removeItem('mayday-spring-lesson-reply')
      setSpringDinnerReplies([])
      localStorage.removeItem('mayday-spring-dinner-replies')
      localStorage.removeItem('mayday-spring-dinner-reply')
      openSpringSmsPicker()
    }
  }

  const chooseSpringLessonCharacter = (character: Exclude<SpringCharacterId, 'yanming'>) => {
    if (springLessonCharacter) return
    setSpringLessonCharacter(character)
    addRouteAffection(character, 1)
    localStorage.setItem('mayday-spring-lesson-character', character)
    setSpringLessonReplies([])
    localStorage.setItem('mayday-spring-lesson-replies', '[]')
    localStorage.removeItem('mayday-spring-lesson-touch-choice')
    localStorage.removeItem('mayday-spring-lesson-reply')
    changeStage('spring-lesson')
  }

  const chooseSpringLessonRoundReply = (roundIndex: number, choiceIndex: number) => {
    if (!springLessonCharacter || roundIndex !== springLessonReplies.length) return
    const round = springLessonRoutes[springLessonCharacter].rounds[roundIndex]
    const choice = round?.choices[choiceIndex]
    if (!choice) return
    const nextReplies = [...springLessonReplies, choiceIndex]
    setSpringLessonReplies(nextReplies)
    localStorage.setItem('mayday-spring-lesson-replies', JSON.stringify(nextReplies))
    addRouteAffection(springLessonCharacter, choice.affection)
  }

  const chooseSpringDinnerRoundReply = (roundIndex: number, choiceIndex: number) => {
    if (roundIndex !== springDinnerReplies.length) return
    const round = springYanmingDinnerRounds[roundIndex]
    const choice = round?.choices[choiceIndex]
    if (!choice) return
    const nextReplies = [...springDinnerReplies, choiceIndex]
    setSpringDinnerReplies(nextReplies)
    localStorage.setItem('mayday-spring-dinner-replies', JSON.stringify(nextReplies))
    localStorage.setItem('mayday-spring-dinner-reply', String(nextReplies[0]))
    addRouteAffection('yanming', choice.affection)
  }

  const chooseSpringSmsTarget = (character: SpringCharacterId) => {
    if (storyStage !== 'spring-sms-picker' || effectiveDateStage !== 'spring-sms-picker' ||
      saveGameDate !== '1997.02.17' || currentTime < '21:00' ||
      springSmsEventStarted || springSmsEventComplete || springSmsTarget ||
      localStorage.getItem('mayday-spring-sms-event-started') === 'true' ||
      localStorage.getItem('mayday-spring-sms-event-complete') === 'true' ||
      localStorage.getItem('mayday-spring-sms-target')) return
    setSpringSmsEventStarted(true)
    localStorage.setItem('mayday-spring-sms-event-started', 'true')
    setSpringSmsTarget(character)
    addRouteAffection(character, 1)
    setSpringSmsRound(0)
    setSpringSmsReplied(false)
    setSpringSmsOpeningSent(false)
    setSpringSmsOpeningChoice(null)
    setSpringSmsReplies([])
    localStorage.setItem('mayday-spring-sms-target', character)
    localStorage.setItem('mayday-spring-sms-round', '0')
    localStorage.setItem('mayday-spring-sms-replied', 'false')
    localStorage.setItem('mayday-spring-sms-opening-sent', 'false')
    localStorage.removeItem('mayday-spring-sms-opening-choice')
    localStorage.setItem('mayday-spring-sms-replies', '[]')
    localStorage.setItem('mayday-spring-sms-mode', 'day')
    setSelectedSmsThread(character)
    setActiveApp('messages')
    changeStage('spring-sms-chat')
  }

  const chooseSpringSmsOpening = (choiceIndex: number) => {
    if (!springSmsTarget || springSmsOpeningSent || !springSmsEventStarted || springSmsEventComplete ||
      localStorage.getItem('mayday-spring-sms-opening-sent') === 'true' ||
      localStorage.getItem('mayday-spring-sms-event-complete') === 'true' ||
      saveGameDate !== '1997.02.17' || storyStage !== 'spring-sms-chat') return
    const context: SpringDayContext = {
      storeCharacter: springStoreCharacter,
      afterChoice: springAfterChoice,
      lessonCharacter: springLessonCharacter,
      dinnerChoice: springDinnerReplies[0] ?? null,
      storeReplies: [springStoreReply, springStoreSecondReply, springStoreThirdReply],
      lessonReplies: springLessonReplies,
      dinnerReplies: springDinnerReplies,
    }
    const opening = getSpringSmsOpeners(springSmsTarget, context)[choiceIndex]
    const firstRound = getSpringSmsRounds(springSmsTarget, context, [], choiceIndex)[0]
    if (!opening || !firstRound) return
    const openingTextMessages = opening.textMessages?.length ? opening.textMessages : [opening.text]
    const openingResponseMessages = opening.responseMessages?.length ? opening.responseMessages : [opening.response]
    const springSmsHour = '21'
    const openingStartMinute = 8
    const openingEntries = [
      ...openingTextMessages.map((text, index) => ({
        from: 'me' as const,
        text,
        time: springSmsHour + ':' + String(openingStartMinute + index).padStart(2, '0'),
      })),
      ...openingResponseMessages.map((text, index) => ({
        from: springSmsTarget as CharacterId,
        text,
        time: springSmsHour + ':' + String(openingStartMinute + openingTextMessages.length + index).padStart(2, '0'),
      })),
    ]
    const firstRoundIncoming = firstRound.incomingMessages?.length
      ? firstRound.incomingMessages
      : firstRound.incoming ? [firstRound.incoming] : []
    const firstRoundStartMinute = openingStartMinute + openingEntries.length
    const springSmsHistoryDate = '1997年2月17日・晚上'
    appendChatMessages(springSmsTarget, [
      ...openingEntries,
      ...(firstRound.outgoing ? [{
        from: 'me' as const,
        text: firstRound.outgoing,
        time: springSmsHour + ':' + String(firstRoundStartMinute).padStart(2, '0'),
      }] : []),
      ...firstRoundIncoming.map((text, index) => ({
        from: springSmsTarget as CharacterId,
        text,
        time: springSmsHour + ':' + String(firstRoundStartMinute + (firstRound.outgoing ? 1 : 0) + index).padStart(2, '0'),
      })),
    ], springSmsHistoryDate)
    localStorage.setItem('mayday-spring-sms-history-restore-v1', 'true')
    addRouteAffection(springSmsTarget, opening.affection)
    setSpringSmsOpeningChoice(choiceIndex)
    localStorage.setItem('mayday-spring-sms-opening-choice', String(choiceIndex))
    setSpringSmsOpeningSent(true)
    localStorage.setItem('mayday-spring-sms-opening-sent', 'true')
  }

  const chooseSpringSmsReply = (choiceIndex: number) => {
    if (!springSmsTarget || !springSmsOpeningSent || springSmsReplied || !springSmsEventStarted || springSmsEventComplete ||
      localStorage.getItem('mayday-spring-sms-replied') === 'true' ||
      localStorage.getItem('mayday-spring-sms-event-complete') === 'true' ||
      Number(localStorage.getItem('mayday-spring-sms-round') ?? '0') !== springSmsRound ||
      saveGameDate !== '1997.02.17' || storyStage !== 'spring-sms-chat') return
    const context: SpringDayContext = {
      storeCharacter: springStoreCharacter,
      afterChoice: springAfterChoice,
      lessonCharacter: springLessonCharacter,
      dinnerChoice: springDinnerReplies[0] ?? null,
      storeReplies: [springStoreReply, springStoreSecondReply, springStoreThirdReply],
      lessonReplies: springLessonReplies,
      dinnerReplies: springDinnerReplies,
    }
    const rounds = getSpringSmsRounds(springSmsTarget, context, springSmsReplies, springSmsOpeningChoice)
    const round = rounds[springSmsRound]
    const choice = round?.choices[choiceIndex]
    if (!choice) return
    const nextReplies = [...springSmsReplies, choiceIndex]
    const nextRounds = getSpringSmsRounds(springSmsTarget, context, nextReplies, springSmsOpeningChoice)
    const springSmsHour = '21'
    const minute = (springSmsTarget === 'wen' ? 12 : 11) + springSmsRound * (springSmsTarget === 'wen' ? 7 : 3)
    const nextRound = springSmsRound < 4 ? nextRounds[springSmsRound + 1] : null
    const nextRoundIncoming = nextRound
      ? (nextRound.incomingMessages?.length ? nextRound.incomingMessages : nextRound.incoming ? [nextRound.incoming] : [])
      : []
    const nextRoundMessages = nextRound ? [
      ...(nextRound.outgoing ? [{
        from: 'me' as const,
        text: nextRound.outgoing,
        time: springSmsHour + ':' + String(minute + choice.response.length + 1).padStart(2, '0'),
      }] : []),
      ...nextRoundIncoming.map((text, index) => ({
        from: springSmsTarget as CharacterId,
        text,
        time: springSmsHour + ':' + String(minute + choice.response.length + (nextRound.outgoing ? 2 : 1) + index).padStart(2, '0'),
      })),
    ] : []
    const springSmsHistoryDate = '1997年2月17日・晚上'
    appendChatMessages(springSmsTarget, [
      { from: 'me', text: choice.text, time: springSmsHour + ':' + String(minute).padStart(2, '0') },
      ...choice.response.map((text, index) => ({ from: springSmsTarget, text, time: springSmsHour + ':' + String(minute + index + 1).padStart(2, '0') })),
      ...nextRoundMessages,
    ], springSmsHistoryDate)
    setSpringSmsReplies(nextReplies)
    localStorage.setItem('mayday-spring-sms-replies', JSON.stringify(nextReplies))
    addRouteAffection(springSmsTarget, choice.affection)
    if (springSmsRound < 4) {
      const nextRound = springSmsRound + 1
      setSpringSmsRound(nextRound)
      localStorage.setItem('mayday-spring-sms-round', String(nextRound))
    } else {
      setSpringSmsReplied(true)
      localStorage.setItem('mayday-spring-sms-replied', 'true')
    }
  }

  const buildSpringDiaryData = () => {
    const storeMemories: Record<SpringCharacterId, string> = {
      wen: '溫尚翊一進樂器行就直奔效果器區，嘴上還說今天只是逛逛，結果蹲在展示架前研究得超認真。後來他把自己的吉他接上音箱，腳尖一踩，聲音立刻變得厚起來，還轉頭問我有沒有覺得很帥。我回他到底是在問效果器還是在問自己，他愣了一下才笑出來。真的很會。',
      ashin: '阿信先陪我在店裡慢慢逛，經過木吉他區才停下來。他拿兩把琴輪流彈給我聽，讓我比較聲音有什麼不一樣。我說第二把好像比較清楚，他還笑我耳朵滿好的，後來又特地多看了一眼我喜歡的那把。這種小事他居然也會記得。',
      masa: '瑪莎一進門就跑去 Bass 區，看到琴弦的價格馬上皺眉，還跟我為了到底買不買吵了兩句。後來他接上展示 Bass 彈了一段，低音真的震得地板都像在動。接著又把兩包琴弦推給我，叫我幫忙看差別；最後還抓包我一直偷看旁邊的電吉他。眼睛也太尖了吧。',
      stone: '石頭今天要買背帶、琴弦和保養用品。挑背帶時還真的轉過來問我哪條好看，後來又很仔細地示範怎麼擦琴，連展示琴都先問我想不想試背。跟他逛店不用急，也不用怕自己什麼都不懂，這點真的很舒服。',
      yanming: '諺明哥拿著一張長長的清單去買鼓棒、鼓皮和導線，連兩副鼓棒的重量都要拿起來比較。他在練習墊上隨手敲了幾下，結果一下就變成一小段節奏，後來還帶我去試打區看他打鼓。離開前他居然記得我拿起來比較順手的是哪一副，還說下次想練的話可以幫我準備。也太仔細了吧。',
    }
    const touchLessonMemories: Record<Exclude<SpringCharacterId, 'yanming'>, string[]> = {
      wen: [
        '我真的伸手摸了溫尚翊指腹上的繭。才剛碰到，他的手指就不自覺蜷了一下，抬眼跟我對上視線後又立刻把眼神挪開。接著他清了清喉嚨，抓起撥片把琴弦刷得超大聲，假裝自己只是要試音。拜託，誰看不出來啦。',
        '我問他是不是害羞了，他立刻否認，結果下一秒重新刷弦還刮出一聲怪音。他又裝作只是沒拿穩，低頭繼續教我按弦。這個人真的很會嘴硬。',
        '我叫他坐近一點教我，他嘴上還反問現在不夠近嗎，椅子卻真的往我這邊挪了半寸，肩膀幾乎碰在一起。後來他托住我的手腕幫我調位置，講話聲音還比剛才低了一點。',
      ],
      ashin: [
        '我真的摸了阿信指尖那層薄繭，還忍不住說比想像中硬。他笑著說自己以前也沒注意過，都是彈久了才變成這樣。明明只是摸一下手指，我卻莫名有點不知道手該放哪裡。',
        '我問阿信怎麼一點都不驚訝，他才說其實有一點，只是怕他一笑，我就不好意思繼續摸了。這句話講得也太自然，害我反而更不好意思。',
        '我問他是不是我問得太突然，他說不會，只是好奇而已，還說我剛才那個表情比問的話還可愛。救命，這種話他怎麼可以講得這麼順。',
      ],
      masa: [
        '我真的伸手摸了瑪莎的繭，結果他全程盯著我看，還故意一動也不動。等我抬頭，他馬上笑著問檢查報告寫好了沒。明明是他先把手伸過來的，最後卻變成我被他逗。',
        '我叫瑪莎不要一直講，他還回我又沒怎樣，是我自己先開口的，接著就把手收回去。這人真的連被摸一下都可以講得像在吵架。',
        '我叫他把手拿開，他居然說檢查還沒結束，故意又把手放回我面前。到底是誰在檢查誰啦！',
      ],
      stone: [
        '我真的摸了石頭指腹上的繭。他一直很安靜地把手放在我面前，等我抬頭時還對我笑了一下。後來他問會不會覺得有點粗，還怕刮到我的手。這個人連這種小地方都會先替我想到。',
        '我問石頭以前剛開始練琴的時候是不是也會痛，他說會，所以知道我現在的感覺。明明是我在摸他的手，最後卻又變成他在提醒我不要勉強自己。',
        '我問石頭是不是也要練到這樣才算厲害，他說練琴不是比誰的繭子多，還用手背輕輕碰了一下我的指尖。這句話好像比剛才那幾個和弦還讓人記得住。',
      ],
    }
    const noTouchLessonMemories: Record<Exclude<SpringCharacterId, 'yanming'>, { question: string; comment: string }> = {
      wen: {
        question: '我沒有真的摸他的手，只是問那些繭要練多久才磨得出來。他說很久了，剛開始也會痛，後來才慢慢習慣，還叫我手痛就先休息，不要硬撐。',
        comment: '我說他的手指也太辛苦了吧，他居然回我吉他又不會自己變厲害。嘴巴還是很硬，倒是有記得叫我不要勉強。',
      },
      ashin: {
        question: '我問阿信以前剛開始練琴的時候是不是也會痛。他說會，按久了手指真的會酸，還提醒我今天已經很認真了，回去要記得休息。',
        comment: '我說那些痕跡都是練琴留下來的，他點點頭，說不用急著也練成這樣，先享受彈出聲音就好了。聽起來簡單，卻讓人安心。',
      },
      masa: {
        question: '我問瑪莎平常練那麼久，手指不會痛嗎。他說剛開始當然會，所以我現在痛就該停，不要逞強，琴又不會跑掉。難得講了一句很像老師的話。',
        comment: '我說他嘴巴那麼壞，手倒是很認真在練。他馬上反問這跟嘴巴有什麼關係，最後還是笑著說今天算我有學到東西。',
      },
      stone: {
        question: '我問石頭以前剛開始練琴的時候是不是也會痛。他說會，所以知道我現在的感覺，還提醒我不用一次練太久，慢慢來就好。',
        comment: '我說他平常看起來溫溫柔柔的，沒想到手上也有這些痕跡。他笑著說彈久了多少都會有，沒有把話說得很嚴肅。',
      },
    }
    const lessonMemory = springLessonCharacter
      ? springLessonReplies[4] === 0
        ? touchLessonMemories[springLessonCharacter][springLessonReplies[5] ?? 0]
        : springLessonReplies[4] === 2
          ? noTouchLessonMemories[springLessonCharacter].comment
          : noTouchLessonMemories[springLessonCharacter].question
      : ''
    const storeMemory = springStoreCharacter ? storeMemories[springStoreCharacter] : ''
    const rehearsalMemory = '《轧車》一開下去，整間練團室真的像要被掀掉。佑達第一遍就打得太起勁，突然加了一串誇張鼓點，瑪莎直接喊他，溫尚翊也叫他不要自己加戲，阿信差點跟不上，石頭在旁邊笑。第二遍大家重新抓好節奏，最後一段幾乎同時收住。前面還像一群小學生在吵架，音樂一進來卻又默契得不得了。'
    const afterMemory = springAfterChoice === 'yanming-dinner'
      ? '散場後佑達先趕去拿朋友幫他留的東西，其他人還在收拾器材。諺明哥已經先一步到樓下等我，我背起包走出去就看見他在騎樓那邊。那家小店他很熟，老闆一看到他就打招呼；吃飯時他讓我慢慢看菜單，也會把湯和菜往桌子中間挪。聊到剛才練團的事，才知道他打鼓時其實一直要聽著大家、幫整首歌穩住節奏。跟他吃飯不用刻意找話題，安安靜靜的也很舒服。'
      : springAfterChoice === 'home'
        ? '今天散場後沒有續攤，我背起包自己回家。走出練團室才發現外面安靜得有點不習慣，耳朵裡卻還在轟轟響。走到一半又想到佑達那串亂七八糟的鼓花，忍不住自己笑出來。路人可能覺得我怪怪的。'
        : springLessonCharacter
          ? lessonMemory
          : ''
    const chatMemories: Record<SpringCharacterId, string[]> = {
      wen: ['回家後我跟溫尚翊抱怨熱可可喝太急，第一口差點燙到舌頭。他先嫌我到底有多急，後來又補一句熱的東西要先吹一下。明明只是喝個東西，還是被他念了兩句。'],
      ashin: [
        '回家後跟阿信聊到早餐紙袋突然破掉，飯糰差點滾到地上。他居然也講起自己以前豆漿袋裂開的糗事，原來大家都有這種狼狽時刻。',
        '回家後跟阿信聊到今天下大雨，連帶傘都被風吹翻。他說自己也遇過，講得像是在交換倒楣經驗，害我覺得好像沒那麼丟臉了。',
        '回家後跟阿信抱怨買麵包居然買成紅豆口味，他還替紅豆麵包說話，說至少不是買到完全不能吃的東西。可是我本來就想吃奶油啊！',
      ],
      masa: [
        '回家後跟瑪莎抱怨自動販賣機把飲料卡住，我站在那裡看了一分鐘也沒用。他先問我看它有什麼用，接著又說自己以前拍了機器兩下，旁邊那罐也掉下來了。這種解決方式真的很瑪莎。',
        '回家後跟瑪莎說我在教室拆洋芋片，結果碎屑飛得到處都是。他居然問我有沒有考慮過旁邊同學的感受，拜託，我也不是故意的！',
        '回家後跟瑪莎說我自己拿剪刀修劉海，現在左右好像不是同一個長度。他先沉默，接著叫我先不要動。怎麼辦，我突然有點不敢照鏡子。',
      ],
      stone: [
        '回家後跟石頭分享盆栽終於長出新葉。他還記得我之前一直說它都沒動靜，看到新葉好像真的替我開心。',
        '回家後跟石頭聊到我煎蛋失敗，蛋黃一破就變成一團不知道是什麼的東西。他居然也說自己以前煎蛋煎到最後變炒蛋，至少不是只有我一個人不會。',
        '回家後跟石頭聊到在書裡找到一張舊書籤。他說自己以前也在書裡發現過別人留下的東西，看到的時候還愣了一下。這種小小的巧合還滿有意思的。',
      ],
      yanming: [
        '回家後跟諺明哥說我買便當忘了拿筷子，站在店門口差點想直接用手吃。他問我是不是在等筷子自己從天上掉下來，真的很會吐槽欸。',
        '回家後跟諺明哥抱怨洗完衣服只剩一隻襪子，另一隻不知道跑去哪。他說洗衣機開始收租了喔，我居然覺得很有道理。',
        '回家後跟諺明哥說我明明寫了購物清單，買了一堆東西卻偏偏忘記雞蛋。他問我那張清單今天有沒有出勤，這句真的太好笑了。',
      ],
    }
    const chatMemory = springSmsTarget
      ? chatMemories[springSmsTarget][springSmsOpeningChoice ?? 0] ?? chatMemories[springSmsTarget][0]
      : ''
    const title = springAfterChoice === 'yanming-dinner'
      ? '諺明哥已經在樓下等我'
      : springAfterChoice === 'home'
        ? '《轧車》的鼓聲一路跟回家'
        : springLessonCharacter === 'wen'
          ? springLessonReplies[4] === 0 ? '今天最燙手的不是琴弦' : '跟溫尚翊學電吉他，手指先投降'
          : springLessonCharacter === 'ashin'
            ? springLessonReplies[4] === 0 ? '木吉他和一雙很有耐心的手' : '阿信教吉他真的很有耐心'
            : springLessonCharacter === 'masa'
              ? 'Bass 很難，瑪莎更難搞'
              : springLessonCharacter === 'stone'
                ? springLessonReplies[4] === 0 ? '今天有人比我還怕我手痛' : '石頭教吉他，比我有耐心'
                : '開學第一天，練團室還是很吵'
    const text = [
      '過完年回來上課，第一天還有點沒切回上課模式，結果才進練團室，就被《轧車》吵到完全清醒。這學期看來真的不會太安靜。',
      storeMemory,
      rehearsalMemory,
      afterMemory,
      chatMemory,
    ].filter(Boolean).join('\\n\\n')
    return { title, text }
  }

  const startSpringDiary = () => {
    if (storyStage !== 'spring-sms-chat' || effectiveDateStage !== 'spring-sms-chat' ||
      saveGameDate !== '1997.02.17' || !springSmsEventStarted || springSmsEventComplete ||
      localStorage.getItem('mayday-spring-sms-event-complete') === 'true' ||
      !springSmsTarget || !springSmsOpeningSent || !springSmsReplied ||
      springSmsRound !== 4 || springSmsReplies.length !== 5) return
    const data = buildSpringDiaryData()
    setSpringDiaryData(data)
    setSpringDiaryUnlocked(true)
    setSpringSmsEventComplete(true)
    localStorage.setItem('mayday-spring-sms-event-started', 'true')
    localStorage.setItem('mayday-spring-sms-event-complete', 'true')
    localStorage.setItem('mayday-spring-diary-data', JSON.stringify(data))
    localStorage.setItem('mayday-spring-diary-unlocked', 'true')
    setActiveApp(null)
    setSelectedSmsThread(null)
    changeStage('spring-diary')
  }

  const finishSpringDiary = () => {
    if (!springDiaryData) return
    setSpringDiaryUnlocked(true)
    localStorage.setItem('mayday-spring-day-complete', 'true')
    localStorage.setItem('mayday-spring-sms-event-started', 'true')
    localStorage.setItem('mayday-spring-sms-event-complete', 'true')
    localStorage.setItem('mayday-spring-selection-affection-backfill-v1', 'true')
    localStorage.setItem('mayday-march28-started', 'true')
    setActiveApp(null)
    setSelectedSmsThread(null)
    changeStage('march28-intro')
  }

  const chooseMarch28VisitCharacter = (character: March28CharacterId) => {
    if (march28VisitCharacter || march28DayComplete) return
    setMarch28VisitCharacter(character)
    localStorage.setItem('mayday-march28-visit-character', character)
    setMarch28VisitReplies([])
    localStorage.setItem('mayday-march28-visit-replies', '[]')
    localStorage.setItem('mayday-march28-started', 'true')
    changeStage('march28-visit')
  }

  const chooseMarch28VisitReply = (roundIndex: number, choiceIndex: number) => {
    if (!march28VisitCharacter || march28DayComplete || roundIndex !== march28VisitReplies.length) return
    const choice = march28Routes[march28VisitCharacter].rounds[roundIndex]?.choices[choiceIndex]
    if (!choice) return
    const nextReplies = [...march28VisitReplies, choiceIndex]
    setMarch28VisitReplies(nextReplies)
    localStorage.setItem('mayday-march28-visit-replies', JSON.stringify(nextReplies))
    addRouteAffection(march28VisitCharacter, choice.affection)
  }

  const finishMarch28Visit = () => {
    if (!march28VisitCharacter || march28VisitReplies.length !== 5) return
    localStorage.setItem('mayday-march28-visit-complete', 'true')
    changeStage('march28-end')
  }

  const startMarch28Diary = (choice: 'skip' | 'return') => {
    if (!march28VisitCharacter || march28VisitReplies.length !== 5) return
    setMarch28ParkChoice(choice)
    localStorage.setItem('mayday-march28-park-choice', choice)
    setMarch28MorningCharacter(null)
    setMarch28MorningReplies([])
    localStorage.removeItem('mayday-march28-morning-replies')
    localStorage.removeItem('mayday-march28-morning-character')
    localStorage.removeItem('mayday-march28-morning-complete')
    const data = buildMarch28DiaryData(march28VisitCharacter, choice, march28VisitReplies)
    localStorage.setItem('mayday-march28-diary-copy-version', MARCH28_DIARY_COPY_VERSION)
    setMarch28DiaryData(data)
    setMarch28DiaryUnlocked(true)
    localStorage.setItem('mayday-march28-diary-data', JSON.stringify(data))
    localStorage.setItem('mayday-march28-diary-unlocked', 'true')
    setActiveApp(null)
    setSelectedSmsThread(null)
    changeStage('march28-diary')
  }

  const chooseMarch28Park = (choice: 'go' | 'skip') => {
    if (!march28VisitCharacter || march28DayComplete) return
    if (choice === 'skip') {
      startMarch28Diary('skip')
      return
    }
    setMarch28ParkChoice('go')
    localStorage.setItem('mayday-march28-park-choice', 'go')
    setMarch28MorningCharacter(null)
    setMarch28MorningReplies([])
    localStorage.removeItem('mayday-march28-morning-replies')
    localStorage.removeItem('mayday-march28-morning-character')
    localStorage.removeItem('mayday-march28-morning-complete')
    setMarch28ParkStayReplies([])
    localStorage.setItem('mayday-march28-park-stay-replies', '[]')
    changeStage('march28-park')
  }

  const chooseMarch28ParkStay = (choice: 'return' | 'stay') => {
    if (!march28VisitCharacter || march28DayComplete) return
    if (choice === 'return') {
      startMarch28Diary('return')
      return
    }
    setMarch28ParkChoice('stay')
    localStorage.setItem('mayday-march28-park-choice', 'stay')
    setMarch28MorningCharacter(null)
    setMarch28MorningReplies([])
    localStorage.removeItem('mayday-march28-morning-replies')
    localStorage.removeItem('mayday-march28-morning-character')
    localStorage.removeItem('mayday-march28-morning-complete')
    setMarch28ParkStayReplies([])
    localStorage.setItem('mayday-march28-park-stay-replies', '[]')
    setMarch28DiaryUnlocked(false)
    setMarch28DiaryData(null)
    localStorage.removeItem('mayday-march28-diary-unlocked')
    localStorage.removeItem('mayday-march28-diary-data')
    addRouteAffection('ashin', 2)
    changeStage('march28-park-stay')
  }

  const chooseMarch28ParkStayReply = (roundIndex: number, choiceIndex: number) => {
    if (march28ParkChoice !== 'stay' || march28ParkStayReplies.length !== roundIndex) return
    const choice = march28ParkStayRounds[roundIndex]?.choices[choiceIndex]
    if (!choice) return
    const nextReplies = [...march28ParkStayReplies, choiceIndex]
    setMarch28ParkStayReplies(nextReplies)
    localStorage.setItem('mayday-march28-park-stay-replies', JSON.stringify(nextReplies))
    addRouteAffection('ashin', choice.affection)
  }

  const chooseMarch28MorningReply = (roundIndex: number, choiceIndex: number) => {
    if (march28ParkChoice !== 'stay' || march28MorningReplies.length !== roundIndex || localStorage.getItem('mayday-march28-morning-complete') === 'true') return
    const choice = currentMarch28MorningRoute.rounds[roundIndex]?.choices[choiceIndex]
    if (!choice) return
    const nextReplies = [...march28MorningReplies, choiceIndex]
    setMarch28MorningReplies(nextReplies)
    localStorage.setItem('mayday-march28-morning-replies', JSON.stringify(nextReplies))
    addRouteAffection(march28MorningFocusCharacter, choice.affection)
  }

  const enterMarch29Show = () => {
    localStorage.setItem('mayday-march29-started', 'true')
    setActiveApp(null)
    setSelectedSmsThread(null)
    changeStage('march29-show')
  }

  const finishMarch28Day = () => {
    if (!march28VisitCharacter || march28VisitReplies.length !== 5) return
    if (march28ParkChoice === 'stay') {
      if (march28ParkStayReplies.length !== march28ParkStayRounds.length) return
      setMarch28DiaryUnlocked(false)
      setMarch28DiaryData(null)
      localStorage.removeItem('mayday-march28-diary-unlocked')
      localStorage.removeItem('mayday-march28-diary-data')
      const morningCharacter = march28CharacterOrder.reduce(
        (best, character) => routeAffection[character] > routeAffection[best] ? character : best,
        march28CharacterOrder[0],
      )
      setMarch28MorningCharacter(morningCharacter)
      localStorage.setItem('mayday-march28-morning-character', morningCharacter)
      setMarch28MorningReplies([])
      localStorage.setItem('mayday-march28-morning-replies', '[]')
      localStorage.removeItem('mayday-march28-morning-complete')
      changeStage('march28-morning')
      return
    }
    if (!march28DiaryData) return
    setMarch28DayComplete(true)
    localStorage.setItem('mayday-march28-day-complete', 'true')
    enterMarch29Show()
  }

  const finishMarch28Morning = () => {
    if (march28ParkChoice !== 'stay' || march28ParkStayReplies.length !== march28ParkStayRounds.length || march28MorningReplies.length !== currentMarch28MorningRoute.rounds.length) return
    const morningCharacter = march28MorningCharacter ?? march28CharacterOrder.reduce(
      (best, character) => routeAffection[character] > routeAffection[best] ? character : best,
      march28CharacterOrder[0],
    )
    setMarch28MorningCharacter(morningCharacter)
    localStorage.setItem('mayday-march28-morning-character', morningCharacter)
    localStorage.setItem('mayday-march28-morning-complete', 'true')
    setMarch28DayComplete(true)
    localStorage.setItem('mayday-march28-day-complete', 'true')
    enterMarch29Show()
  }

  const finishMarch29AfterShow = (selection: { handsomeChoice: March29DiaryCharacter | null; escortCharacter: March29DiaryCharacter | null }) => {
    const data = buildMarch29DiaryData(selection.handsomeChoice, selection.escortCharacter)
    setMarch29DiaryData(data)
    setMarch29DiaryUnlocked(true)
    localStorage.setItem('mayday-march29-complete', 'true')
    localStorage.setItem('mayday-march29-diary-data', JSON.stringify(data))
    localStorage.setItem('mayday-march29-diary-unlocked', 'true')
    setActiveApp('diary')
    setSelectedDiaryDate('1997-03-29')
    changeStage('completed')
  }

  const startApril12Story = () => {
    if (localStorage.getItem('mayday-march29-diary-unlocked') !== 'true' || localStorage.getItem('mayday-april12-diary-unlocked') === 'true') return
    localStorage.setItem('mayday-april12-started', 'true')
    setActiveApp(null)
    setSelectedDiaryDate(null)
    setSelectedSmsThread(null)
    changeStage('april12-story')
  }

  const startApril20Story = () => {
    if (localStorage.getItem('mayday-april12-diary-unlocked') !== 'true' || localStorage.getItem('mayday-april20-day-complete') === 'true') return
    localStorage.setItem('mayday-april20-started', 'true')
    setActiveApp(null)
    setSelectedDiaryDate(null)
    setSelectedSmsThread(null)
    changeStage('april20-story')
  }

  const finishApril20Story = (selection: { route: 'park' | 'rehearsal'; character: April20Character; choices: number[] }) => {
    const expectedChoices = selection.route === 'park' || selection.character === 'wen' ? 3 : 5
    const legacyThreeRoundCompletion = selection.route === 'rehearsal' && selection.character !== 'wen' && selection.choices.length === 3
    if (selection.choices.length !== expectedChoices && !legacyThreeRoundCompletion) return
    localStorage.setItem('mayday-april20-complete', 'true')
    localStorage.setItem('mayday-april20-day-complete', 'true')
    localStorage.setItem('mayday-april20-route', selection.route)
    localStorage.setItem('mayday-april20-character', selection.character)
    localStorage.setItem('mayday-april20-choices', JSON.stringify(selection.choices))
    const diaryData = buildApril20DiaryData(selection.route)
    setApril20DiaryData(diaryData)
    setApril20DiaryUnlocked(true)
    localStorage.setItem('mayday-april20-diary-data', JSON.stringify(diaryData))
    localStorage.setItem('mayday-april20-diary-unlocked', 'true')
    setActiveApp('diary')
    setSelectedDiaryDate('1997-04-20')
    setSelectedSmsThread(null)
    changeStage('completed')
  }

  const startApril30Story = () => {
    if (localStorage.getItem('mayday-april20-day-complete') !== 'true' || localStorage.getItem('mayday-april30-day-complete') === 'true') return
    localStorage.setItem('mayday-april30-started', 'true')
    setActiveApp(null)
    setSelectedDiaryDate(null)
    setSelectedSmsThread(null)
    changeStage('april30-story')
  }

  const finishApril30Story = (selection: April30Selection) => {
    const expectedChoices = 5
    if (selection.choices.length !== expectedChoices) return
    const diaryData = buildApril30DiaryData(selection.route)
    setApril30DiaryData(diaryData)
    setApril30DiaryUnlocked(true)
    localStorage.setItem('mayday-april30-complete', 'true')
    localStorage.setItem('mayday-april30-day-complete', 'true')
    if (localStorage.getItem('mayday-april30-affection-applied') !== 'true') {
      addRouteAffection(selection.route, selection.affection)
      localStorage.setItem('mayday-april30-affection-applied', 'true')
    }
    localStorage.setItem('mayday-april30-affection-total', String(selection.affection))
    localStorage.setItem('mayday-april30-comfort-choice', selection.comfortChoice === null ? '' : String(selection.comfortChoice))
    localStorage.setItem('mayday-april30-route', selection.route)
    localStorage.setItem('mayday-april30-choices', JSON.stringify(selection.choices))
    localStorage.setItem('mayday-april30-diary-data', JSON.stringify(diaryData))
    localStorage.setItem('mayday-april30-diary-unlocked', 'true')
    setActiveApp('diary')
    setSelectedDiaryDate('1997-04-30')
    setSelectedSmsThread(null)
    changeStage('completed')
  }

  const startMay10Story = () => {
    if (localStorage.getItem('mayday-april30-day-complete') !== 'true' || localStorage.getItem('mayday-may10-day-complete') === 'true') return
    localStorage.setItem('mayday-may10-started', 'true')
    setActiveApp(null)
    setSelectedDiaryDate(null)
    setSelectedSmsThread(null)
    changeStage('may10-story')
  }

  const finishMay10Story = (selection: May10Selection) => {
    if (selection.choices.length !== 3) return
    if (selection.jealousyCharacter && selection.jealousyChoices.length !== 3) return
    if (!selection.jealousyCharacter && selection.jealousyChoices.length !== 0) return
    const diaryData = buildMay10DiaryData({ character: selection.character, jealousyCharacter: selection.jealousyCharacter })
    setMay10DiaryData(diaryData)
    setMay10DiaryUnlocked(true)
    localStorage.setItem('mayday-may10-complete', 'true')
    localStorage.setItem('mayday-may10-day-complete', 'true')
    localStorage.setItem('mayday-may10-character', selection.character)
    localStorage.setItem('mayday-may10-choices', JSON.stringify(selection.choices))
    localStorage.setItem('mayday-may10-jealousy-character', selection.jealousyCharacter ?? '')
    localStorage.setItem('mayday-may10-jealousy-choices', JSON.stringify(selection.jealousyChoices))
    localStorage.setItem('mayday-current-drummer', '陳泳錩')
    localStorage.setItem('mayday-drummer-joined-date', '1997.05.10')
    localStorage.setItem('mayday-may10-diary-data', JSON.stringify(diaryData))
    localStorage.setItem('mayday-may10-diary-unlocked', 'true')
    setActiveApp('diary')
    setSelectedDiaryDate('1997-05-10')
    setSelectedSmsThread(null)
    changeStage('completed')
  }

  const startJuneStudyStory = () => {
    if (localStorage.getItem('mayday-may10-day-complete') !== 'true' || localStorage.getItem('mayday-june-study-day-complete') === 'true') return
    localStorage.setItem('mayday-june-study-started', 'true')
    setActiveApp(null)
    setSelectedDiaryDate(null)
    setSelectedSmsThread(null)
    changeStage('june-study')
  }

  const finishJuneStudyStory = (selection: JuneStudySelection) => {
    if (selection.choices.length !== 5 || !selection.choices.every((choice) => Number.isInteger(choice) && choice >= 0 && choice <= 2)) return
    localStorage.setItem('mayday-june-study-complete', 'true')
    localStorage.setItem('mayday-june-study-day-complete', 'true')
    localStorage.setItem('mayday-june-study-character', selection.character)
    localStorage.setItem('mayday-june-study-choices', JSON.stringify(selection.choices))
    localStorage.setItem('mayday-june-study-date', '1997.06.15')
    setActiveApp(null)
    setSelectedDiaryDate(null)
    setSelectedSmsThread(null)
    setJuneFreeChatTarget(null)
    localStorage.removeItem('mayday-june-free-chat-target')
    setJuneFreeChatRound(0)
    localStorage.setItem('mayday-june-free-chat-round', '0')
    setJuneFreeChatReplied(false)
    localStorage.setItem('mayday-june-free-chat-replied', 'false')
    setJuneFreeChatReplies([])
    localStorage.setItem('mayday-june-free-chat-replies', '[]')
    setJuneFreeChatStarted(true)
    localStorage.setItem('mayday-june-free-chat-started', 'true')
    localStorage.removeItem('mayday-june-free-chat-complete')
    changeStage('june-free-chat')
  }

  const chooseJuneFreeChatTarget = (character: RouteCharacterId) => {
    if (!juneFreeChatStarted || juneFreeChatTarget || localStorage.getItem('mayday-june-free-chat-complete') === 'true') return
    const script = juneFreeChatScripts[character]
    if (!script || script.rounds.length !== 5) return
    setJuneFreeChatTarget(character)
    localStorage.setItem('mayday-june-free-chat-target', character)
    setJuneFreeChatRound(0)
    localStorage.setItem('mayday-june-free-chat-round', '0')
    setJuneFreeChatReplied(false)
    localStorage.setItem('mayday-june-free-chat-replied', 'false')
    setJuneFreeChatReplies([])
    localStorage.setItem('mayday-june-free-chat-replies', '[]')
    const openingMessages = script.openingMessages ?? [script.opening]
    const openingReply = script.openingReply ?? (script.rounds[0].incoming ? [script.rounds[0].incoming] : [])
    appendChatMessages(character, [
      ...openingMessages.map((text) => ({ from: 'me' as const, text, time: '17:16' })),
      ...openingReply.map((text) => ({ from: character, text, time: '17:17' })),
      ...(script.rounds[0].prompt ? [{ from: 'me' as const, text: script.rounds[0].prompt, time: '17:18' }] : []),
    ], '1997年6月15日・傍晚')
    setSelectedSmsThread(character)
    setActiveApp('messages')
  }

  const chooseJuneFreeChatReply = (choiceIndex: number) => {
    if (!juneFreeChatStarted || !juneFreeChatTarget || juneFreeChatReplied) return
    const script = juneFreeChatScripts[juneFreeChatTarget]
    const round = script.rounds[juneFreeChatRound]
    const choice = round?.choices[choiceIndex]
    if (!choice) return
    const minute = 18 + juneFreeChatRound * 2
    const time = '17:' + String(minute).padStart(2, '0')
    const nextTime = '17:' + String(minute + 1).padStart(2, '0')
    const nextRound = juneFreeChatRound < 4 ? script.rounds[juneFreeChatRound + 1] : null
    const nextPromptMessages = nextRound?.prompt
      ? [{ from: 'me' as const, text: nextRound.prompt, time: nextTime }]
      : nextRound?.incoming
        ? [{ from: juneFreeChatTarget, text: nextRound.incoming, time: nextTime }]
        : []
    appendChatMessages(juneFreeChatTarget, [
      { from: 'me', text: choice.text, time },
      ...choice.response.map((text) => ({ from: juneFreeChatTarget, text, time })),
      ...nextPromptMessages,
    ], '1997年6月15日・傍晚')
    const nextReplies = [...juneFreeChatReplies, choiceIndex]
    setJuneFreeChatReplies(nextReplies)
    localStorage.setItem('mayday-june-free-chat-replies', JSON.stringify(nextReplies))
    addRouteAffection(juneFreeChatTarget, choice.affection)
    if (juneFreeChatRound < 4) {
      const nextRound = juneFreeChatRound + 1
      setJuneFreeChatRound(nextRound)
      localStorage.setItem('mayday-june-free-chat-round', String(nextRound))
      setJuneFreeChatReplied(false)
      localStorage.setItem('mayday-june-free-chat-replied', 'false')
    } else {
      setJuneFreeChatReplied(true)
      localStorage.setItem('mayday-june-free-chat-replied', 'true')
    }
  }

  const finishJuneFreeChat = () => {
    if (!juneFreeChatTarget || !juneFreeChatStarted || !juneFreeChatReplied || juneFreeChatRound !== 4 || juneFreeChatReplies.length !== 5) return
    const studyCharacter = localStorage.getItem('mayday-june-study-character')
    const validCharacters: RouteCharacterId[] = ['wen', 'ashin', 'masa', 'stone', 'yanming']
    if (!studyCharacter || !validCharacters.includes(studyCharacter as RouteCharacterId)) return
    const experience: CharacterExperienceRecord = {
      character: juneFreeChatTarget,
      source: 'june-study',
      date: saveGameDate,
      eventKey: '六月中旬・日常簡訊',
      day2StrollAccepted: false,
      choices: [...juneFreeChatReplies],
    }
    const nextExperienceLog = { ...sharedExperienceLog, [juneFreeChatTarget]: experience }
    setSharedExperienceLog(nextExperienceLog)
    localStorage.setItem('mayday-shared-experience-log', JSON.stringify(nextExperienceLog))
    localStorage.setItem('mayday-june-free-chat-complete', 'true')
    setJuneFreeChatStarted(false)
    localStorage.setItem('mayday-june-free-chat-started', 'false')
    const readChoices = (key: string) => {
      try {
        const value = JSON.parse(localStorage.getItem(key) ?? '[]')
        return Array.isArray(value) ? value.filter((choice): choice is number => Number.isInteger(choice) && choice >= 0 && choice <= 2).slice(0, 5) : []
      } catch { return [] }
    }
    const diaryData = buildJuneDiaryData({
      studyCharacter: studyCharacter as JuneStudySelection['character'],
      studyChoices: readChoices('mayday-june-study-choices'),
      chatCharacter: juneFreeChatTarget,
      chatChoices: [...juneFreeChatReplies],
    })
    setJuneDiaryData(diaryData)
    localStorage.setItem('mayday-june-diary-pending-data', JSON.stringify(diaryData))
    setActiveApp(null)
    setSelectedSmsThread(null)
    changeStage('june-diary')
  }

  const finishJuneDiary = () => {
    if (!juneDiaryData) return
    setJuneDiaryUnlocked(true)
    localStorage.setItem('mayday-june-diary-unlocked', 'true')
    localStorage.setItem('mayday-june-diary-data', JSON.stringify(juneDiaryData))
    localStorage.removeItem('mayday-june-diary-pending-data')
    setActiveApp('diary')
    setSelectedDiaryDate('1997-06-15')
    setSelectedSmsThread(null)
    changeStage('completed')
  }

  const startJulyLostKeyStory = () => {
    if (localStorage.getItem('mayday-june-study-day-complete') !== 'true' || localStorage.getItem('mayday-july-lost-key-day-complete') === 'true') return
    localStorage.setItem('mayday-july-lost-key-started', 'true')
    setActiveApp(null)
    setSelectedDiaryDate(null)
    setSelectedSmsThread(null)
    changeStage('july-lost-key')
  }

  const finishJulyLostKeyStory = (selection: JulyLostKeySelection) => {
    const validCharacters: JulyLostKeySelection['character'][] = ['wen', 'ashin', 'masa', 'stone', 'yanming']
    const validFlirtTargets = ['wen', 'ashin']
    if (!validCharacters.includes(selection.character) || selection.choices.length !== 5 || !selection.choices.every((choice) => Number.isInteger(choice) && choice >= 0 && choice <= 2)) return
    if (selection.flirtTarget !== null && !validFlirtTargets.includes(selection.flirtTarget)) return
    if (selection.character !== 'wen' && selection.character !== 'ashin' && selection.flirtTarget !== null) return
    localStorage.setItem('mayday-july-lost-key-complete', 'true')
    localStorage.setItem('mayday-july-lost-key-day-complete', 'true')
    localStorage.setItem('mayday-july-lost-key-character', selection.character)
    localStorage.setItem('mayday-july-lost-key-choices', JSON.stringify(selection.choices))
    localStorage.setItem('mayday-july-lost-key-flirt-target', selection.flirtTarget ?? '')
    localStorage.setItem('mayday-july-lost-key-date', '1997.07.15')
    localStorage.setItem('mayday-august-started', 'true')
    setActiveApp(null)
    setSelectedDiaryDate(null)
    setSelectedSmsThread(null)
    changeStage('august-story')
  }

  const finishAugustStory = (selection: AugustSelection) => {
    const validCharacters: AugustCharacter[] = ['wen', 'ashin', 'masa', 'stone', 'yanming']
    const validFriedCharacters: AugustCharacter[] = ['wen', 'ashin', 'masa', 'stone']
    const validChoices = (choices: number[]) => Array.isArray(choices) && choices.every((choice) => Number.isInteger(choice) && choice >= 0 && choice <= 2)
    if (!selection || !Array.isArray(selection.storeCandidates) || !selection.storeCandidates.every((character) => validCharacters.includes(character))) return
    if (selection.storeCandidates.length > 0 && (selection.storeChoices.length !== 5 || !validChoices(selection.storeChoices))) return
    if (selection.storeCandidates.length === 0 && selection.storeChoices.length !== 0) return
    if (selection.eveningChoices.length !== 5 || !validChoices(selection.eveningChoices)) return
    if (selection.eveningRoute === 'fried' && !validFriedCharacters.includes(selection.eveningCharacter)) return
    if (selection.eveningRoute === 'yanming' && selection.eveningCharacter !== 'yanming') return
    localStorage.setItem('mayday-august-store-candidates', JSON.stringify(selection.storeCandidates))
    localStorage.setItem('mayday-august-store-choices', JSON.stringify(selection.storeChoices))
    localStorage.setItem('mayday-august-evening-route', selection.eveningRoute)
    localStorage.setItem('mayday-august-evening-character', selection.eveningCharacter)
    localStorage.setItem('mayday-august-evening-choices', JSON.stringify(selection.eveningChoices))
    localStorage.setItem('mayday-august-day-complete', 'true')
    localStorage.setItem('mayday-august-date', '1997.08.01')
    const diaryData = buildAugustDiaryData(selection)
    setAugustDiaryData(diaryData)
    localStorage.setItem('mayday-august-diary-pending-data', JSON.stringify(diaryData))
    setActiveApp(null)
    setSelectedDiaryDate(null)
    setSelectedSmsThread(null)
    changeStage('august-diary')
  }

  const finishAugustDiary = () => {
    if (!augustDiaryData) return
    setAugustDiaryUnlocked(true)
    localStorage.setItem('mayday-august-diary-data', JSON.stringify(augustDiaryData))
    localStorage.removeItem('mayday-august-diary-pending-data')
    localStorage.setItem('mayday-august-diary-unlocked', 'true')
    localStorage.setItem('mayday-september-started', 'true')
    setActiveApp(null)
    setSelectedDiaryDate(null)
    setSelectedSmsThread(null)
    changeStage('september-intro')
  }

  const startSeptemberIntro = () => {
    localStorage.setItem('mayday-september-started', 'true')
    localStorage.setItem('mayday-september-date', '1997.09.03')
    setActiveApp(null)
    setSelectedDiaryDate(null)
    setSelectedSmsThread(null)
    changeStage('september-intro')
  }

  const startSeptemberStory = () => {
    localStorage.setItem('mayday-september-started', 'true')
    localStorage.setItem('mayday-september-date', '1997.09.03')
    setActiveApp(null)
    setSelectedDiaryDate(null)
    setSelectedSmsThread(null)
    changeStage('september-story')
  }

  const finishSeptemberStory = (selection: SeptemberSelection) => {
    const validSoloLength = (length: number) => length === 5 || length === 3
    if (!selection || !validSoloLength(selection.trainChoices.length) || selection.pokerChoices.length !== 3 ||
      !validSoloLength(selection.homestayChoices.length) || !validSoloLength(selection.scooterChoices.length) ||
      selection.sunsetGroupChoices.length !== 3 || !validSoloLength(selection.sunsetChoices.length) ||
      !Number.isInteger(selection.photoChoice) || selection.photoChoice < 0 || selection.photoChoice > 4) return
    const diaryData = buildSeptemberDiaryData(selection)
    setSeptemberDiaryData(diaryData)
    setSeptemberDiaryUnlocked(false)
    localStorage.setItem('mayday-september-story-selection', JSON.stringify(selection))
    localStorage.setItem('mayday-september-day-complete', 'true')
    localStorage.setItem('mayday-september-date', '1997.09.06')
    localStorage.setItem('mayday-september-photo-memory', 'true')
    localStorage.setItem('mayday-september-diary-pending-data', JSON.stringify(diaryData))
    setActiveApp(null)
    setSelectedDiaryDate(null)
    setSelectedSmsThread(null)
    changeStage('september-diary')
  }

  const finishSeptemberDiary = () => {
    if (!septemberDiaryData) return
    setSeptemberDiaryUnlocked(true)
    localStorage.setItem('mayday-september-diary-data', JSON.stringify(septemberDiaryData))
    localStorage.removeItem('mayday-september-diary-pending-data')
    localStorage.setItem('mayday-september-diary-unlocked', 'true')
    setActiveApp('diary')
    setSelectedDiaryDate('1997-09-06')
    changeStage('completed')
  }

  const finishApril12Story = (selection: { character: April12Character; choices: number[] }) => {
    if (selection.choices.length !== 3) return
    const data = buildApril12DiaryData(selection.character, selection.choices)
    setApril12DiaryData(data)
    setApril12DiaryUnlocked(true)
    localStorage.setItem('mayday-april12-complete', 'true')
    localStorage.setItem('mayday-april12-diary-data', JSON.stringify(data))
    localStorage.setItem('mayday-april12-diary-unlocked', 'true')
    setActiveApp('diary')
    setSelectedDiaryDate('1997-04-12')
    changeStage('completed')
  }

  useEffect(() => {
    const rewriteKey = 'mayday-diary-narrative-rewrite-v13'
    if (localStorage.getItem(rewriteKey) === 'true') return

    if (yearEndDiaryData) {
      const refreshed = buildYearEndDiaryData()
      setYearEndDiaryData(refreshed)
      localStorage.setItem('mayday-year-end-diary-data', JSON.stringify(refreshed))
    }
    if (winterDiaryData && winterBusStopCharacter && winterBusStopReplies.length === winterBusStopRoutes[winterBusStopCharacter].rounds.length) {
      const refreshed = buildWinterDiaryData()
      setWinterDiaryData(refreshed)
      localStorage.setItem('mayday-winter-diary-data', JSON.stringify(refreshed))
    }
    localStorage.setItem(rewriteKey, 'true')
  }, [])

  useEffect(() => {
    const rewriteKey = 'mayday-february-diary-narrative-rewrite-v1'
    if (localStorage.getItem(rewriteKey) === 'true') return
    if (februaryDiaryUnlocked && februaryDiaryData) {
      if (!februarySecretTarget || februarySecretReply === null || februaryDinnerReply === null || !februaryTableCharacter || !februaryAfterDinnerCharacter || februaryAfterDinnerReplies.length !== 3) return
      const refreshed = buildFebruaryDiaryData()
      setFebruaryDiaryData(refreshed)
      localStorage.setItem('mayday-february-diary-data', JSON.stringify(refreshed))
    }
    localStorage.setItem(rewriteKey, 'true')
  }, [])

  useEffect(() => {
    const rewriteKey = 'mayday-spring-diary-narrative-rewrite-v2'
    if (localStorage.getItem(rewriteKey) === 'true') return
    if (springDiaryUnlocked && springDiaryData) {
      if (!springAfterChoice || !springSmsTarget || springSmsOpeningChoice === null || springSmsReplies.length !== 5) return
      if (springAfterChoice === 'lesson' && (!springLessonCharacter || springLessonReplies.length < 5 || (springLessonReplies[4] === 0 && springLessonReplies.length < 6))) return
      const refreshed = buildSpringDiaryData()
      setSpringDiaryData(refreshed)
      localStorage.setItem('mayday-spring-diary-data', JSON.stringify(refreshed))
    }
    localStorage.setItem(rewriteKey, 'true')
  }, [])


  useEffect(() => {
    let cancelled = false
    const initializeAutoStepSnapshots = async () => {
      try {
        const records = await listAutoStepSnapshots()
        if (cancelled) return
        setAutoStepSnapshots(records)
        autoStepLastFingerprintRef.current = records.length ? records[records.length - 1].fingerprint : ''
        autoStepReadyRef.current = true
        setAutoStepSnapshotLoading(false)
        setAutoStepSnapshotError('')
        autoStepScheduleRef.current?.()
      } catch {
        if (!cancelled) {
          setAutoStepSnapshotError('無法讀取自動進度紀錄。請確認瀏覽器允許網站使用本機資料。')
          setAutoStepSnapshotLoading(false)
        }
      }
    }
    void initializeAutoStepSnapshots()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    let cancelled = false
    const initializeDaySnapshots = async () => {
      try {
        const records = await listDaySnapshots()
        if (cancelled) return
        setDaySnapshots(records)

        if (!playerName) {
          setDaySnapshotLoading(false)
          return
        }

        const currentSnapshot = buildCurrentSaveSnapshot()
        const pendingRecords: DaySnapshotRecord[] = []

        if (currentSnapshot.gameDate === '1997.08.01') {
          const augustStartData = rewindAugustStoryToStart(currentSnapshot.data, AFFECTION_CALL_THRESHOLD)
          if (augustStartData) {
            pendingRecords.push({
              date: '1997.08.01',
              snapshot: {
                ...currentSnapshot,
                gameDate: '1997.08.01',
                gameTime: '15:05',
                stage: 'august-story',
                stageLabel: storyStageLabels['august-story'],
                data: augustStartData,
              },
            })
            const julyStartData = rewindJulyLostKeyStoryToStart(augustStartData, AFFECTION_CALL_THRESHOLD)
            if (julyStartData) {
              pendingRecords.push({
                date: '1997.07.15',
                snapshot: {
                  ...currentSnapshot,
                  gameDate: '1997.07.15',
                  gameTime: '18:00',
                  stage: 'july-lost-key',
                  stageLabel: storyStageLabels['july-lost-key'],
                  data: julyStartData,
                },
              })
            }
          }
        } else if (currentSnapshot.gameDate === '1997.07.15') {
          const julyStartData = rewindJulyLostKeyStoryToStart(currentSnapshot.data, AFFECTION_CALL_THRESHOLD)
          if (julyStartData) {
            pendingRecords.push({
              date: '1997.07.15',
              snapshot: {
                ...currentSnapshot,
                gameDate: '1997.07.15',
                gameTime: '18:00',
                stage: 'july-lost-key',
                stageLabel: storyStageLabels['july-lost-key'],
                data: julyStartData,
              },
            })
          }
        }

        // Older dates are offered only when a manual save is demonstrably at that day's opening scene.
        for (const slot of getSaveSlotIds()) {
          const manualSave = readSaveSlot(slot)
          if (!manualSave) continue
          const manualDate = getDayStartDate(manualSave.stage, manualSave.data)
          if (manualDate && manualDate === manualSave.gameDate && isAtDayOpening(manualSave.stage, manualSave.data)) {
            pendingRecords.push({ date: manualDate, snapshot: manualSave })
          }
        }

        const openingDate = getDayStartDate(storyStage, currentSnapshot.data)
        if (openingDate && openingDate === saveGameDate && isAtDayOpening(storyStage)) {
          pendingRecords.push({ date: openingDate, snapshot: currentSnapshot })
        }

        for (const record of pendingRecords) {
          if (cancelled || records.some((existing) => existing.date === record.date)) continue
          const inserted = await putDaySnapshotIfMissing(record)
          if (inserted) records.push(record)
        }
        if (!cancelled) {
          setDaySnapshots(records.sort((left, right) => left.date.localeCompare(right.date)))
          setDaySnapshotError('')
          setDaySnapshotLoading(false)
        }
      } catch {
        if (!cancelled) {
          setDaySnapshotError('無法讀取自動時間回溯紀錄。請確認瀏覽器允許網站使用本機資料。')
          setDaySnapshotLoading(false)
        }
      }
    }
    void initializeDaySnapshots()
    return () => { cancelled = true }
  }, [storyStage, saveGameDate, playerName])

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
    chatMessagesRef.current = initialChats
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

  const resetLocalData = async () => {
    const keysToRemove: string[] = []
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index)
      if (key?.startsWith('mayday-')) keysToRemove.push(key)
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key))
    try { await clearDaySnapshots() } catch { /* The local game data is still cleared if IndexedDB is unavailable. */ }
    window.location.reload()
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
    if (!smsMessagesRef.current.some((message) => message.id === 'story-reply-player')) {
      const nextSmsMessages = [
        ...smsMessagesRef.current,
        { id: 'story-reply-player', date: '今天', time: '15:43', from: 'me' as const, text: selected.text },
        ...selected.response.map((text, index) => ({ id: `story-reply-wen-${index}`, date: '今天', time: index === 0 ? '15:43' : '15:44', from: 'wen' as const, text })),
      ]
      smsMessagesRef.current = nextSmsMessages
      localStorage.setItem('mayday-sms-messages', JSON.stringify(nextSmsMessages))
      setSmsMessages(nextSmsMessages)
    }
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
  const currentNextMonthInvite = nextMonthInviteTarget ? nextMonthInviteRoutes[nextMonthInviteTarget] : null
  const currentNextMonthInviteRound = currentNextMonthInvite?.rounds[nextMonthInviteDateReplies.length] ?? null
  const currentNextMonthOpenDay = nextMonthOpenDayTarget ? nextMonthOpenDayRoutes[nextMonthOpenDayTarget] : null
  const currentNextMonthOpenDayRound = currentNextMonthOpenDay?.rounds[nextMonthOpenDayReplies.length] ?? null
  const currentYearEndShoppingRoute = yearEndInviteTarget ? yearEndShoppingRoutes[yearEndInviteTarget] : null
  const currentYearEndShoppingRound = currentYearEndShoppingRoute?.rounds[yearEndShoppingReplies.length] ?? null
  const currentYearEndFireworksRound = yearEndFireworksRounds[yearEndFireworksReplies.length] ?? null
  const currentWinterExamRound = winterExamTutoringRounds[winterExamReplies.length] ?? null
  const currentWinterPracticeRound = winterBreakPracticeRounds[winterPracticeReplies.length] ?? null
  const currentWinterBusStopRound = winterBusStopCharacter ? winterBusStopRoutes[winterBusStopCharacter].rounds[winterBusStopReplies.length] ?? null : null
  const currentFebruaryAfterDinnerRoute = februaryAfterDinnerCharacter ? februaryAfterDinnerRoutes[februaryAfterDinnerCharacter] : null
  const currentFebruaryAfterDinnerRound = currentFebruaryAfterDinnerRoute?.rounds[februaryAfterDinnerReplies.length] ?? null
  const springDayContext: SpringDayContext = {
    storeCharacter: springStoreCharacter,
    afterChoice: springAfterChoice,
    lessonCharacter: springLessonCharacter,
    dinnerChoice: springDinnerReplies[0] ?? null,
    storeReplies: [springStoreReply, springStoreSecondReply, springStoreThirdReply],
    lessonReplies: springLessonReplies,
    dinnerReplies: springDinnerReplies,
  }
  const currentSpringSmsRounds = springSmsTarget ? getSpringSmsRounds(springSmsTarget, springDayContext, springSmsReplies, springSmsOpeningChoice) : []
  const currentSpringSmsOpeners = springSmsTarget ? getSpringSmsOpeners(springSmsTarget, springDayContext) : []
  const springInvitePendingCandidates = springInviteCandidates.filter((character) => !springInviteDeclined.includes(character))
  const currentSpringInviteRound = springInviteTarget ? springInviteRounds[springInviteTarget][springInviteReplies.length] ?? null : null
  const springInviteFinalChoice = springInviteTarget && springInviteReplies.length === springInviteRounds[springInviteTarget].length
    ? springInviteRounds[springInviteTarget][springInviteReplies.length - 1]?.choices[springInviteReplies[springInviteReplies.length - 1]] ?? null
    : null
  const currentFebruaryHighestAffection: FebruaryCharacterId = (['wen', 'ashin', 'masa', 'stone', 'yanming'] as FebruaryCharacterId[]).reduce((best, character) => routeAffection[character] > routeAffection[best] ? character : best, 'wen')
  const currentMarch28HighestAffection: March28CharacterId = march28CharacterOrder.reduce((best, character) => routeAffection[character] > routeAffection[best] ? character : best, 'wen')
  const march28MorningFocusCharacter: March28CharacterId = march28MorningCharacter ?? currentMarch28HighestAffection
  const currentMarch28MorningRoute = march28MorningFocusCharacter === 'ashin'
    ? march28MorningAshinRoute
    : march28MorningVisitorRoutes[march28MorningFocusCharacter]
  const currentMarch28MorningIntroBlocks = march28MorningFocusCharacter === 'ashin'
    ? march28MorningAshinRoute.introBlocks
    : getMarch28MorningVisitorIntroBlocks(march28MorningFocusCharacter)
  const winterFocusOrder: WinterCharacterId[] = ['wen', 'ashin', 'masa', 'stone', 'yanming']
  const winterGigFocusCharacter = winterFocusOrder.reduce((best, character) => routeAffection[character] > routeAffection[best] ? character : best, winterFocusOrder[0])
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
                      <DiarySection label="TODAY · 今天記事" text={[
                        '下課後跟著溫尚翊去吃冰，沒想到在路上又遇見阿信。後來三個人一起逛了唱片行，他講起音樂的時候真的很認真，連一首歌要從哪裡開始聽都會仔細介紹。',
                        day2StrollAccepted
                          ? '阿信走後，溫尚翊問我要不要再逛一下。我本來沒有特別想去哪裡，最後還是跟著他去了附近的小書店。'
                          : '阿信走後，溫尚翊問我要不要再逛一下。我想了想，還是跟他說今天差不多了，想先回家。',
                        day2StrollAccepted
                          ? '我們在裡面待了好一會兒，聊了些很普通的事情。他有時候真的很會惹人嫌，可是跟他一起走路，好像連沒有目的地也不會覺得無聊。逛完之後，他還一路陪我走回家，站在門口等我進去才離開。'
                          : '他沒有勉強我，還是陪我慢慢走回家，直到我站在家門口才轉身離開。臨走前還提醒我早點休息，明明只是很平常的一句話，卻讓人覺得今天好像被好好照顧了一下。',
                        '今天又和阿信多聊了一會兒，也和原本就認識的人多相處了一段時間。明明沒有發生什麼大事，卻覺得這一天比平常長了很多。',
                        '不知道明天又會收到誰的訊息。',
                      ].join('\n\n')} />
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
                        <p>今天難得沒有課，白天只能安排一個人的見面；晚上回家後，還可以另外選擇想聊天的人。沒被選中見面的朋友也能聊日常，但他不會知道白天的見面細節，除非你主動告訴他。</p>
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
                              <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
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
                    <div className="reunion-pause-note">回到家後，你還想主動找一個人聊聊。白天見誰、晚上找誰，可以分開選。</div>
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={startMonthFreeChat}>回家後，選擇今晚聊天對象 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'month-free-chat' && monthFreeChatStarted && monthFreeChatTarget === null && activeApp === null && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">一個月後・晚上</div>
                    <div className="story-contact-title">
                      <strong>自由對話</strong>
                      <small>1996 年 11 月 16 日・晚上</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">回到家，手機就在手邊</div>
                    <h2 className="story-scene-title">今晚想主動找誰聊聊？</h2>
                    <StoryBlocks blocks={[
                      { kind: 'narration', text: '白天見了誰，和晚上想找誰聊天，是兩個可以分開做的選擇。你想起誰，就可以主動傳訊息給誰；沒見面的朋友不會知道白天發生的事，除非你自己告訴他，聊天就從各自的日常開始。' },
                    ]} />
                    <div className="month-visit-picker">
                      {monthVisitOrder.map((id) => {
                        const person = characterInfo.find((item) => item.id === id)!
                        return (
                          <button className="free-time-person" key={id} onClick={() => chooseMonthFreeChatTarget(id)}>
                            <span className="sms-avatar">{person.avatar}</span>
                            <span><strong>{person.name}</strong><small>{id === monthVisitTarget ? '延續今天的見面' : '主動找他聊聊今天的日常'}</small></span>
                            <ChevronRight size={15} />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
              {storyStage === 'month-free-chat' && monthFreeChatStarted && monthFreeChatTarget !== null && activeApp === null && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">一個月後・晚上</div>
                    <div className="story-contact-title">
                      <strong>{characterNames[monthFreeChatTarget]}</strong>
                      <small>自由對話・1996 年 11 月 16 日</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">訊息還停留在剛才的地方</div>
                    <h2 className="story-scene-title">要繼續和他聊天嗎？</h2>
                    <StoryBlocks blocks={[
                      { kind: 'narration', text: '你已經選好了今晚想找的人。打開訊息，就能接著剛才的對話繼續聊。' },
                    ]} />
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={() => openMessagesApp(monthFreeChatTarget)}>打開訊息 <ChevronRight size={15} /></button>
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
                      <DiarySection label="DAYTIME · 白天記事" text={monthDiaryEntries[monthVisitTarget].visit} />
                      <DiarySection label="NIGHT · 晚上聊天" text={getMonthFreeChatDiaryText(monthFreeChatTarget ?? monthVisitTarget)} />
                      <DiarySection label="BEFORE SLEEP · 睡前補記" text={monthDiaryEntries[monthVisitTarget].ending} />
                    </div>
                    <div className="reunion-pause-note">好啦，今天就先寫到這裡。明天再看這頁的時候，希望我不要覺得自己太花癡。</div>
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={finishMonthChapter}>合上日記，結束今天 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}


              {storyStage === 'next-month-intro' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">又一個月後</div>
                    <div className="story-contact-title">
                      <strong>十二月的校園開放日</strong>
                      <small>1996 年 12 月 14 日・星期六</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">時間又往前走了一個月</div>
                    <h2 className="story-scene-title">最近，好像有些不一樣了</h2>
                    <StoryBlocks blocks={nextMonthIntroBlocks} />
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={startNextMonthFlow}>看看今天會發生什麼事 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'next-month-invite-notification' && (
                <div className="invite-notification-overlay">
                  <div className="invite-notification-card">
                    <div className="invite-notification-top">
                      <span className="invite-notification-icon"><MessageSquare size={17} /></span>
                      <span><strong>特別通知</strong><small>剛剛</small></span>
                    </div>
                    <h2>有人想約你出去！</h2>
                    <p>最近好像有人想趁著有空，約你一起出去走走。</p>
                    <p>要不要看看是誰？</p>
                    <div className="invite-notification-actions">
                      <button className="story-primary-button" onClick={() => changeStage('next-month-invite-picker')}>看看是誰 <ChevronRight size={15} /></button>
                      <button className="story-primary-button secondary-chat-action" onClick={startNextMonthOpenDay}>今天先去社團幫忙 <ChevronRight size={15} /></button>
                    </div>
                  </div>
                </div>
              )}

              {storyStage === 'next-month-invite-picker' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">有人想約你</div>
                    <div className="story-contact-title">
                      <strong>想先看看誰的邀請？</strong>
                      <small>1996 年 12 月 14 日・上午</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">手機裡有幾則還沒回覆的訊息</div>
                    <h2 className="story-scene-title">選一個人看看吧</h2>
                    <p className="narrative-paragraph">每個人好像都有自己的安排。你想先回覆誰？</p>
                    <div className="month-visit-picker">
                      {nextMonthInviteCandidates.map((id) => {
                        const person = characterInfo.find((item) => item.id === id)!
                        return (
                          <button className="free-time-person" key={id} onClick={() => chooseNextMonthInviteTarget(id)}>
                            <span className="sms-avatar">{person.avatar}</span>
                            <span><strong>{person.name}</strong><small>有話想跟你說</small></span>
                            <ChevronRight size={15} />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button secondary-chat-action" onClick={startNextMonthOpenDay}>先去社團幫忙 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'next-month-invite' && nextMonthInviteTarget && activeApp === null && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">邀約簡訊</div>
                    <div className="story-contact-title">
                      <strong>{characterNames[nextMonthInviteTarget]}</strong>
                      <small>1996 年 12 月 14 日・上午</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">邀約已經在訊息裡等你</div>
                    <h2 className="story-scene-title">打開簡訊，看看他說了什麼</h2>
                    <p className="narrative-paragraph">這次的邀約會直接在你們的簡訊對話裡進行。</p>
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={() => openNextMonthInviteChat(nextMonthInviteTarget)}>打開簡訊 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'next-month-invite-chat' && nextMonthInviteTarget && activeApp === null && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">邀約還沒回覆</div>
                    <div className="story-contact-title">
                      <strong>{characterNames[nextMonthInviteTarget]}</strong>
                      <small>1996 年 12 月 14 日・上午</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">手機裡有一則還沒回覆的邀約</div>
                    <h2 className="story-scene-title">要不要回覆{characterNames[nextMonthInviteTarget]}？</h2>
                    <p className="narrative-paragraph">對話和你之前選過的回覆都會保留在簡訊裡。</p>
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={() => openMessagesApp(nextMonthInviteTarget)}>回到簡訊對話 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'next-month-invite-date' && currentNextMonthInvite && nextMonthInviteTarget && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">今天的約定</div>
                    <div className="story-contact-title">
                      <strong>{currentNextMonthInvite.title}</strong>
                      <small>{currentNextMonthInvite.location}・1996 年 12 月</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">赴約・下午到晚上</div>
                    <h2 className="story-scene-title">{currentNextMonthInvite.title}</h2>
                    <StoryBlocks blocks={currentNextMonthInvite.activity} />
                    {currentNextMonthInvite.rounds.slice(0, nextMonthInviteDateReplies.length).map((round, index) => {
                      const selected = round.choices[nextMonthInviteDateReplies[index]]
                      if (!selected) return null
                      return (
                        <div className="month-visit-round-history" key={index}>
                          {round.scene && <StoryBlocks blocks={[{ kind: 'narration', text: round.scene }]} />}
                          <StoryBlocks blocks={[
                            { kind: 'dialogue', speaker: round.promptSpeaker ?? currentNextMonthInvite.invitation[0]?.speaker ?? characterNames[nextMonthInviteTarget], text: round.prompt },
                            { kind: 'dialogue', speaker: '你', text: selected.text },
                            ...selected.response.map((text) => ({ kind: 'dialogue' as const, speaker: currentNextMonthInvite.invitation[0]?.speaker ?? characterNames[nextMonthInviteTarget], text })),
                          ]} />
                        </div>
                      )
                    })}
                    {currentNextMonthInviteRound ? (
                      <>
                        {currentNextMonthInviteRound.scene && <StoryBlocks blocks={[{ kind: 'narration', text: currentNextMonthInviteRound.scene }]} />}
                        <StoryBlocks blocks={[{ kind: 'dialogue', speaker: currentNextMonthInviteRound.promptSpeaker ?? currentNextMonthInvite.invitation[0]?.speaker ?? characterNames[nextMonthInviteTarget], text: currentNextMonthInviteRound.prompt }]} />
                        <div className="choice-area">
                          <div className="choice-heading">第 {nextMonthInviteDateReplies.length + 1}/5 輪・你想怎麼回應？</div>
                          {currentNextMonthInviteRound.choices.map((choice, index) => (
                            <button className="reply-choice" key={index} onClick={() => chooseNextMonthInviteDateReply(index)}>
                              <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
                            </button>
                          ))}
                          <small>每個選擇都會影響對方的感受與好感度。</small>
                        </div>
                      </>
                    ) : (
                      <>
                        <StoryBlocks blocks={currentNextMonthInvite.ending} />
                        <div className="reunion-pause-note">這次約會的五輪互動已經完成。</div>
                      </>
                    )}
                  </div>
                  {nextMonthInviteDateReplies.length === 5 && (
                    <div className="story-action-bar">
                      <button className="story-primary-button" onClick={finishNextMonthInviteDate}>收起手機，繼續校園開放日主線 <ChevronRight size={15} /></button>
                    </div>
                  )}
                </div>
              )}

              {storyStage === 'next-month-open-day' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">十二月・校園開放日</div>
                    <div className="story-contact-title">
                      <strong>椰風搖滾社今天也很忙</strong>
                      <small>1996 年 12 月 14 日・星期六</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">上午八點二十分・台大校園</div>
                    <h2 className="story-scene-title">今天的攤位好熱鬧</h2>
                    <StoryBlocks blocks={nextMonthOpenDayIntroBlocks} />
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={() => changeStage('next-month-open-day-picker')}>先忙完，再去逛逛 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'next-month-open-day-picker' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">校園開放日</div>
                    <div className="story-contact-title">
                      <strong>想和誰單獨逛逛？</strong>
                      <small>1996 年 12 月 14 日・上午</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">攤位暫時有人顧著</div>
                    <h2 className="story-scene-title">出去走一小段吧</h2>
                    <StoryBlocks blocks={[
                      { kind: 'narration', text: '人潮稍微散開了一點，溫尚翊讓大家輪流去休息。錢佑達還在旁邊興奮地研究下一個要看的攤位，瑪莎叫他不要再亂跑。你看了看周圍，想趁這個空檔找一個人單獨逛逛校園。' },
                    ]} />
                    <div className="month-visit-picker">
                      {monthVisitOrder.map((id) => {
                        const person = characterInfo.find((item) => item.id === id)!
                        const route = nextMonthOpenDayRoutes[id]
                        return (
                          <button className="free-time-person" key={id} onClick={() => chooseNextMonthOpenDayTarget(id)}>
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

              {storyStage === 'next-month-open-day-visit' && currentNextMonthOpenDay && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">校園開放日</div>
                    <div className="story-contact-title">
                      <strong>{currentNextMonthOpenDay.label}</strong>
                      <small>{currentNextMonthOpenDay.location}・1996 年 12 月 14 日</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">{currentNextMonthOpenDay.kicker}</div>
                    <h2 className="story-scene-title">{currentNextMonthOpenDay.title}</h2>
                    <StoryBlocks blocks={currentNextMonthOpenDay.blocks} />
                    {currentNextMonthOpenDay.rounds.slice(0, nextMonthOpenDayReplies.length).map((round, index) => {
                      const selected = round.choices[nextMonthOpenDayReplies[index]]
                      if (!selected) return null
                      return (
                        <div className="month-visit-round-history" key={index}>
                          {round.scene && <StoryBlocks blocks={[{ kind: 'narration', text: round.scene }]} />}
                          <StoryBlocks blocks={[
                            { kind: 'dialogue', speaker: round.promptSpeaker ?? currentNextMonthOpenDay.label, text: round.prompt },
                            { kind: 'dialogue', speaker: '你', text: selected.text },
                            ...selected.response.map((text) => ({ kind: 'dialogue' as const, speaker: currentNextMonthOpenDay.label, text })),
                          ]} />
                        </div>
                      )
                    })}
                    {currentNextMonthOpenDayRound ? (
                      <>
                        {currentNextMonthOpenDayRound.scene && <StoryBlocks blocks={[{ kind: 'narration', text: currentNextMonthOpenDayRound.scene }]} />}
                        <StoryBlocks blocks={[{ kind: 'dialogue', speaker: currentNextMonthOpenDayRound.promptSpeaker ?? currentNextMonthOpenDay.label, text: currentNextMonthOpenDayRound.prompt }]} />
                        <div className="choice-area">
                          <div className="choice-heading">第 {nextMonthOpenDayReplies.length + 1}/5 輪・你想怎麼回應？</div>
                          {currentNextMonthOpenDayRound.choices.map((choice, index) => (
                            <button className="reply-choice" key={index} onClick={() => chooseNextMonthOpenDayReply(index)}>
                              <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
                            </button>
                          ))}
                          <small>每個選擇都會影響對方的感受。</small>
                        </div>
                      </>
                    ) : (
                      <>
                        <StoryBlocks blocks={currentNextMonthOpenDay.ending} />
                        <div className="reunion-pause-note">今天的五輪互動已經完成。</div>
                      </>
                    )}
                  </div>
                  {nextMonthOpenDayReplies.length === 5 && (
                    <div className="story-action-bar">
                      <button className="story-primary-button" onClick={finishNextMonthOpenDayVisit}>收好今天的回憶 <ChevronRight size={15} /></button>
                    </div>
                  )}
                </div>
              )}

              {storyStage === 'next-month-open-day-visit-complete' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">校園開放日・午後</div>
                    <div className="story-contact-title">
                      <strong>回到椰風搖滾社</strong>
                      <small>1996 年 12 月 14 日</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">攤位前又熱鬧起來了</div>
                    <h2 className="story-scene-title">還有一些話，留到晚上再說</h2>
                    <StoryBlocks blocks={[
                      { kind: 'narration', text: '你們回到攤位時，溫尚翊正忙著跟新生介紹社團，佑達在旁邊比手畫腳，瑪莎一臉受不了地叫他小聲一點。石頭正在整理器材，阿信則把最後幾張傳單放回桌上。你看著大家忙成一團，忽然覺得今天過得很快。' },
                      { kind: 'narration', text: '活動結束後回到家，你還想主動找一個人聊聊。' },
                    ]} />
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={startNextMonthFreeChat}>回家後，選擇今晚聊天對象 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'next-month-free-chat' && nextMonthFreeChatTarget === null && activeApp === null && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">十二月・晚上</div>
                    <div className="story-contact-title">
                      <strong>自由對話</strong>
                      <small>1996 年 12 月 14 日・晚上</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">回到家，手機就在手邊</div>
                    <h2 className="story-scene-title">今晚想主動找誰聊聊？</h2>
                    <StoryBlocks blocks={[
                      { kind: 'narration', text: '你沒有急著休息，先把包包裡的東西放好，才拿起手機。今天發生了不少事，突然想找個人說說話。沒一起單獨逛校園的人，也可以從自己的日常開始聊，不會突然知道你白天和誰去了哪裡。' },
                    ]} />
                    <div className="month-visit-picker">
                      {monthVisitOrder.map((id) => {
                        const person = characterInfo.find((item) => item.id === id)!
                        return (
                          <button className="free-time-person" key={id} onClick={() => chooseNextMonthFreeChatTarget(id)}>
                            <span className="sms-avatar">{person.avatar}</span>
                            <span><strong>{person.name}</strong><small>主動傳訊息聊聊日常</small></span>
                            <ChevronRight size={15} />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {storyStage === 'next-month-free-chat' && nextMonthFreeChatTarget !== null && activeApp === null && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">十二月・晚上</div>
                    <div className="story-contact-title">
                      <strong>{characterNames[nextMonthFreeChatTarget]}</strong>
                      <small>自由對話・1996 年 12 月 14 日</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">訊息還在等你開口</div>
                    <h2 className="story-scene-title">想好要傳什麼了嗎？</h2>
                    <StoryBlocks blocks={[{ kind: 'narration', text: '你已經選好今晚想找的人。打開訊息，先由你傳出第一句話。' }]} />
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={() => openMessagesApp(nextMonthFreeChatTarget)}>打開訊息 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'next-month-diary' && nextMonthDiaryData && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">十二月・私人日記</div>
                    <div className="story-contact-title">
                      <strong>今天想記下來的事</strong>
                      <small>1996 年 12 月 14 日・星期六</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">晚上回到家・翻開日記</div>
                    <h2 className="story-scene-title">{nextMonthDiaryData.title}</h2>
                    <div className="diary-paper story-diary-paper">
                      <span className="diary-date">1996 年 12 月 14 日・星期六</span>
                      <h2>{nextMonthDiaryData.title}</h2>
                      <DiarySection label="DAYTIME · 白天記事" text={nextMonthDiaryData.eventSummary} />
                      <DiarySection label="NIGHT · 晚上聊天" text={nextMonthDiaryData.chatSummary} />
                      <DiarySection label="BEFORE SLEEP · 睡前補記" text={nextMonthDiaryData.ending} />
                    </div>
                    <div className="reunion-pause-note">這篇日記會留在日記列表裡，之後也可以重新打開來看。</div>
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={finishNextMonthChapter}>合上日記，結束今天 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}


              {storyStage === 'year-end-intro' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">年末特別篇</div>
                    <div className="story-contact-title">
                      <strong>一九九六年的最後一天</strong>
                      <small>1996 年 12 月 31 日・星期二</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">聖誕節過後・時間走到年底</div>
                    <h2 className="story-scene-title">今年最後一個晚上</h2>
                    <StoryBlocks blocks={yearEndIntroBlocks} />
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={startYearEndFlow}>看看今天收到什麼訊息 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'year-end-invite-notification' && (
                <div className="invite-notification-overlay">
                  <div className="invite-notification-card">
                    <div className="invite-notification-top">
                      <span className="invite-notification-icon"><MessageSquare size={17} /></span>
                      <span><strong>新訊息</strong><small>12 月 31 日・下午</small></span>
                    </div>
                    <h2>有人約你一起買年貨！</h2>
                    <p>手機裡有幾個熟悉的名字亮了起來。好像有人想趁著跨年前，約你一起去採買。</p>
                    <p>你想先看看是誰傳來訊息嗎？</p>
                    <div className="invite-notification-actions">
                      <button className="story-primary-button" onClick={() => changeStage('year-end-invite-picker')}>查看邀約 <ChevronRight size={15} /></button>
                      <button className="story-primary-button secondary-chat-action" onClick={beginYearEndFireworks}>今天先不出門，晚上再見 <ChevronRight size={15} /></button>
                    </div>
                  </div>
                </div>
              )}

              {storyStage === 'year-end-invite-picker' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">跨年前的邀約</div>
                    <div className="story-contact-title">
                      <strong>想先回覆誰？</strong>
                      <small>1996 年 12 月 31 日・下午</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">幾則還沒點開的訊息</div>
                    <h2 className="story-scene-title">有人想找你一起採買</h2>
                    <p className="narrative-paragraph">選一個人的邀請看看。接受就會和他一起去買年貨；婉拒也沒關係，晚上大家還是會一起跨年。</p>
                    <div className="month-visit-picker">
                      {yearEndInviteCandidates.map((id) => {
                        const person = characterInfo.find((item) => item.id === id)!
                        return (
                          <button className="free-time-person" key={id} onClick={() => chooseYearEndInviteTarget(id)}>
                            <span className="sms-avatar">{person.avatar}</span>
                            <span><strong>{person.name}</strong><small>邀你一起買年貨</small></span>
                            <ChevronRight size={15} />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button secondary-chat-action" onClick={beginYearEndFireworks}>今天先不出門，直接準備跨年 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'year-end-shopping' && currentYearEndShoppingRoute && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">跨年前・下午</div>
                    <div className="story-contact-title">
                      <strong>{currentYearEndShoppingRoute.title}</strong>
                      <small>{currentYearEndShoppingRoute.location}・1996 年 12 月 31 日</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">年末採買・一起出門走走</div>
                    <h2 className="story-scene-title">{currentYearEndShoppingRoute.title}</h2>
                    <StoryBlocks blocks={currentYearEndShoppingRoute.blocks} />
                    {currentYearEndShoppingRoute.rounds.slice(0, yearEndShoppingReplies.length).map((round, index) => {
                      const selected = round.choices[yearEndShoppingReplies[index]]
                      if (!selected) return null
                      return (
                        <div className="month-visit-round-history" key={index}>
                          {round.scene && <StoryBlocks blocks={[{ kind: 'narration', text: round.scene }]} />}
                          <StoryBlocks blocks={[
                            { kind: 'dialogue', speaker: round.promptSpeaker, text: round.prompt },
                            { kind: 'dialogue', speaker: '你', text: selected.text },
                            ...selected.response.map((line) => ({ kind: 'dialogue' as const, speaker: line.speaker, text: line.text })),
                          ]} />
                        </div>
                      )
                    })}
                    {currentYearEndShoppingRound ? (
                      <>
                        {currentYearEndShoppingRound.scene && <StoryBlocks blocks={[{ kind: 'narration', text: currentYearEndShoppingRound.scene }]} />}
                        <StoryBlocks blocks={[{ kind: 'dialogue', speaker: currentYearEndShoppingRound.promptSpeaker, text: currentYearEndShoppingRound.prompt }]} />
                        <div className="choice-area">
                          <div className="choice-heading">第 {yearEndShoppingReplies.length + 1}/5 輪・你想怎麼回應？</div>
                          {currentYearEndShoppingRound.choices.map((choice, index) => (
                            <button className="reply-choice" key={index} onClick={() => chooseYearEndShoppingReplyRound(index)}>
                              <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
                            </button>
                          ))}
                          <small>每個選擇都會影響對方的感受。</small>
                        </div>
                      </>
                    ) : (
                      <>
                        <StoryBlocks blocks={currentYearEndShoppingRoute.ending} />
                        <div className="reunion-pause-note">今天的五輪採買互動已經完成。</div>
                      </>
                    )}
                  </div>
                  {yearEndShoppingReplies.length === 5 && (
                    <div className="story-action-bar">
                      <button className="story-primary-button" onClick={finishYearEndShopping}>收好東西，晚上集合 <ChevronRight size={15} /></button>
                    </div>
                  )}
                </div>
              )}

              {storyStage === 'year-end-fireworks' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">跨年主線</div>
                    <div className="story-contact-title">
                      <strong>和大家一起迎接新年</strong>
                      <small>1996 年 12 月 31 日・深夜</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">河堤旁・晚上九點多</div>
                    <h2 className="story-scene-title">七個人的跨年夜</h2>
                    <StoryBlocks blocks={yearEndFireworksIntroBlocks} />
                    {yearEndFireworksRounds.slice(0, yearEndFireworksReplies.length).map((round, index) => {
                      const selected = round.choices[yearEndFireworksReplies[index]]
                      if (!selected) return null
                      return (
                        <div className="month-visit-round-history" key={index}>
                          {round.scene && <StoryBlocks blocks={[{ kind: 'narration', text: round.scene }]} />}
                          <StoryBlocks blocks={[
                            { kind: 'dialogue', speaker: round.promptSpeaker, text: round.prompt },
                            { kind: 'dialogue', speaker: '你', text: selected.text },
                            ...selected.response.map((line) => ({ kind: 'dialogue' as const, speaker: line.speaker, text: line.text })),
                          ]} />
                        </div>
                      )
                    })}
                    {currentYearEndFireworksRound ? (
                      <>
                        {currentYearEndFireworksRound.scene && <StoryBlocks blocks={[{ kind: 'narration', text: currentYearEndFireworksRound.scene }]} />}
                        <StoryBlocks blocks={[{ kind: 'dialogue', speaker: currentYearEndFireworksRound.promptSpeaker, text: currentYearEndFireworksRound.prompt }]} />
                        <div className="choice-area">
                          <div className="choice-heading">跨年夜・第 {yearEndFireworksReplies.length + 1}/5 輪</div>
                          {currentYearEndFireworksRound.choices.map((choice, index) => (
                            <button className="reply-choice" key={index} onClick={() => chooseYearEndFireworksReply(index)}>
                              <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
                            </button>
                          ))}
                          <small>大家都在等你的反應，選一個最想做的事吧。</small>
                        </div>
                      </>
                    ) : (
                      <>
                        <StoryBlocks blocks={yearEndFireworksEnding} />
                        <div className="reunion-pause-note">一九九七年，已經開始了。</div>
                      </>
                    )}
                  </div>
                  {yearEndFireworksReplies.length === 5 && (
                    <div className="story-action-bar">
                      <button className="story-primary-button" onClick={finishYearEndFireworks}>收起煙火，看看凌晨的訊息 <ChevronRight size={15} /></button>
                    </div>
                  )}
                </div>
              )}

              {storyStage === 'year-end-new-year-chat' && yearEndGreetingTarget && activeApp === null && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">新年祝福</div>
                    <div className="story-contact-title">
                      <strong>{characterNames[yearEndGreetingTarget]}</strong>
                      <small>1997 年 1 月 1 日・凌晨</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">手機裡的新年訊息</div>
                    <h2 className="story-scene-title">{yearEndFirstReplySent ? '還想繼續聊幾句嗎？' : '打開訊息，回覆新年快樂'}</h2>
                    <p className="narrative-paragraph">這段對話會留在你們的訊息紀錄裡。你可以回覆祝福，也可以在回覆後決定要不要繼續聊天。</p>
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={openYearEndNewYearMessages}>打開簡訊 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'year-end-free-chat' && yearEndGreetingTarget && activeApp === null && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">新年自由聊天</div>
                    <div className="story-contact-title">
                      <strong>{characterNames[yearEndGreetingTarget]}</strong>
                      <small>1997 年 1 月 1 日・凌晨</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">新年的第一段閒聊</div>
                    <h2 className="story-scene-title">第 {yearEndFreeChatRound + 1}/5 輪</h2>
                    <p className="narrative-paragraph">你們剛才的祝福還停在訊息裡。打開對話，看看他接下來想說什麼。</p>
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={openYearEndFreeChatMessages}>繼續聊天 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'year-end-free-chat-picker' && activeApp === null && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">1997・自由活動</div>
                    <div className="story-contact-title">
                      <strong>還想向誰說新年快樂？</strong>
                      <small>1997 年 1 月 1 日・凌晨</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">煙火散去，手機還亮著</div>
                    <h2 className="story-scene-title">接下來由你決定</h2>
                    <StoryBlocks blocks={[
                      { kind: 'narration', text: '主動傳來新年祝福的人，你都已經回覆過了。其他朋友還沒有傳訊息，你可以自己打開對話，先向他們說一聲新年快樂。' },
                      { kind: 'narration', text: '每個人都可以只收到一句祝福；如果聊起來了，也可以選擇再多聊五輪。想先停下來也沒關係。' },
                    ]} />
                    <div className="month-visit-picker">
                      {greetingOrder.filter((id) => !yearEndGreetingQueue.includes(id as YearEndRouteCharacterId) && !yearEndProactiveSent.includes(id)).map((id) => {
                        const person = characterInfo.find((item) => item.id === id)!
                        return (
                          <button className="free-time-person" key={id} onClick={() => chooseYearEndFreeChatTarget(id)}>
                            <span className="sms-avatar">{person.avatar}</span>
                            <span><strong>{person.name}</strong><small>主動傳送新年祝福</small></span>
                            <ChevronRight size={15} />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={startYearEndDiary}>今晚先聊到這裡，寫日記 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'year-end-diary' && yearEndDiaryData && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">跨年特別篇・私人日記</div>
                    <div className="story-contact-title">
                      <strong>把今年最後一天寫下來</strong>
                      <small>1996 年 12 月 31 日・星期二</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">一九九七年・凌晨回到家</div>
                    <h2 className="story-scene-title">{yearEndDiaryData.title}</h2>
                    <div className="diary-paper story-diary-paper">
                      <span className="diary-date">1996 年 12 月 31 日・星期二</span>
                      <h2>{yearEndDiaryData.title}</h2>
                      {yearEndDiaryData.sections.map((section) => (
                        <DiarySection key={section.label} label={section.label} text={section.text} />
                      ))}
                    </div>
                    <div className="reunion-pause-note">這篇日記會保留在日記列表裡，之後也可以重新打開來看。</div>
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={finishYearEndDiary}>合上日記，迎接一九九七年 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'winter-exam-intro' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">一九九七年・一月</div>
                    <div className="story-contact-title">
                      <strong>期末考前一週</strong>
                      <small>1997 年 1 月 7 日・台北</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">EXAM WEEK · 考試倒數</div>
                    <h2 className="story-scene-title">統計學，拜託對我好一點。</h2>
                    <StoryBlocks blocks={winterExamIntroBlocks} />
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={() => changeStage(winterExamTutoringUnlocked ? 'winter-exam-notification' : 'winter-break-practice')}>
                      {winterExamTutoringUnlocked ? '拿起手機，主動問溫尚翊' : '考完期末考，半個月後迎接寒假'} <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
              )}

              {storyStage === 'winter-exam-notification' && (
                <div className="invite-notification-overlay">
                  <div className="invite-notification-card">
                    <div className="invite-notification-top">
                      <span className="invite-notification-icon"><MessageSquare size={17} /></span>
                      <span><strong>特別劇情提示</strong><small>1 月 7 日・晚上</small></span>
                    </div>
                    <h2>要不要找溫尚翊幫忙？</h2>
                    <p>統計學的講義越看越讓人頭痛。你想起溫尚翊之前提過自己還滿擅長這一科，猶豫了一會兒，還是決定主動傳訊息問問他。</p>
                    <p>這次不是他先來找你，是你鼓起勇氣去問他能不能幫忙補習。</p>
                    <div className="invite-notification-actions">
                      <button className="story-primary-button" onClick={startWinterExamChat}>打開簡訊，問問溫尚翊 <ChevronRight size={15} /></button>
                    </div>
                  </div>
                </div>
              )}

              {storyStage === 'winter-exam-chat' && activeApp === null && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">一月七日・晚上</div>
                    <div className="story-contact-title">
                      <strong>和溫尚翊的簡訊</strong>
                      <small>統計學補習約定</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">MESSAGES · 你主動傳出的訊息</div>
                    <h2 className="story-scene-title">問問他有沒有空。</h2>
                    <p className="narrative-paragraph">你已經把想請他幫忙補習的訊息傳出去了。溫尚翊也回了訊息，打開對話看看吧。</p>
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={() => openMessagesApp('wen')}>回到溫尚翊的簡訊 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'winter-exam-tutoring' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">期末考前・特別篇</div>
                    <div className="story-contact-title">
                      <strong>和溫尚翊在圖書館補習</strong>
                      <small>1997 年 1 月 8 日・下午</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">STUDY DATE · 統計學急救</div>
                    <h2 className="story-scene-title">今天的老師，是溫尚翊。</h2>
                    <StoryBlocks blocks={winterExamTutoringIntroBlocks} />
                    {winterExamTutoringRounds.slice(0, winterExamReplies.length).map((round, index) => {
                      const selected = round.choices[winterExamReplies[index]]
                      if (!selected) return null
                      return (
                        <div className="month-visit-round-history" key={index}>
                          {round.scene && <StoryBlocks blocks={[{ kind: 'narration', text: round.scene }]} />}
                          <StoryBlocks blocks={[
                            { kind: 'dialogue', speaker: round.promptSpeaker, text: round.prompt },
                            { kind: 'dialogue', speaker: '你', text: selected.text },
                            ...selected.response,
                          ]} />
                        </div>
                      )
                    })}
                    {currentWinterExamRound ? (
                      <>
                        {currentWinterExamRound.scene && <StoryBlocks blocks={[{ kind: 'narration', text: currentWinterExamRound.scene }]} />}
                        <StoryBlocks blocks={[{ kind: 'dialogue', speaker: currentWinterExamRound.promptSpeaker, text: currentWinterExamRound.prompt }]} />
                        <div className="choice-area">
                          <div className="choice-heading">第 {winterExamReplies.length + 1}/5 輪・你想怎麼回答？</div>
                          {currentWinterExamRound.choices.map((choice, index) => (
                            <button className="reply-choice" key={index} onClick={() => chooseWinterExamReply(index)}>
                              <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
                            </button>
                          ))}
                          <small>每個選擇都會影響溫尚翊對你的感受。</small>
                        </div>
                      </>
                    ) : (
                      <>
                        <StoryBlocks blocks={winterExamTutoringEnding} />
                        <div className="reunion-pause-note">今天的五輪補習互動已經完成。</div>
                      </>
                    )}
                  </div>
                  {winterExamReplies.length === winterExamTutoringRounds.length && (
                    <div className="story-action-bar">
                      <button className="story-primary-button" onClick={() => changeStage('winter-break-practice')}>收好講義，半個月後就是寒假 <ChevronRight size={15} /></button>
                    </div>
                  )}
                </div>
              )}

              {storyStage === 'winter-break-practice' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">寒假第一天</div>
                    <div className="story-contact-title">
                      <strong>諺明哥的練團室</strong>
                      <small>1997 年 1 月 22 日・傍晚</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">WINTER BREAK · 練團前</div>
                    <h2 className="story-scene-title">六個人，又湊在一起了。</h2>
                    <StoryBlocks blocks={winterBreakPracticeBlocks} />
                    {winterBreakPracticeRounds.slice(0, winterPracticeReplies.length).map((round, index) => {
                      const selected = round.choices[winterPracticeReplies[index]]
                      if (!selected) return null
                      return (
                        <div className="month-visit-round-history" key={index}>
                          {round.scene && <StoryBlocks blocks={[{ kind: 'narration', text: round.scene }]} />}
                          <StoryBlocks blocks={[
                            { kind: 'dialogue', speaker: round.promptSpeaker, text: round.prompt },
                            { kind: 'dialogue', speaker: '你', text: selected.text },
                            ...selected.response,
                          ]} />
                        </div>
                      )
                    })}
                    {currentWinterPracticeRound ? (
                      <>
                        {currentWinterPracticeRound.scene && <StoryBlocks blocks={[{ kind: 'narration', text: currentWinterPracticeRound.scene }]} />}
                        <StoryBlocks blocks={[{ kind: 'dialogue', speaker: currentWinterPracticeRound.promptSpeaker, text: currentWinterPracticeRound.prompt }]} />
                        <div className="choice-area">
                          <div className="choice-heading">練團室裡・你想怎麼接話？</div>
                          {currentWinterPracticeRound.choices.map((choice, index) => (
                            <button className="reply-choice" key={index} onClick={() => chooseWinterPracticeReply(index)}>
                              <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
                            </button>
                          ))}
                          <small>大家的反應和好感度會隨你的回答改變。</small>
                        </div>
                      </>
                    ) : (
                      <>
                        <StoryBlocks blocks={winterBreakPracticeEnding} />
                        <div className="reunion-pause-note">練團告一段落，五個人準備出發去酒吧。</div>
                      </>
                    )}
                  </div>
                  {winterPracticeReplies.length === winterBreakPracticeRounds.length && (
                    <div className="story-action-bar">
                      <button className="story-primary-button" onClick={finishWinterPractice}>一起去酒吧看他們駐唱 <ChevronRight size={15} /></button>
                    </div>
                  )}
                </div>
              )}

              {storyStage === 'winter-break-gig' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">寒假・今晚的演出</div>
                    <div className="story-contact-title">
                      <strong>酒吧駐唱</strong>
                      <small>1997 年 1 月 22 日・晚上</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">LIVEHOUSE · FIVE ON STAGE</div>
                    <h2 className="story-scene-title">燈亮起來的時候。</h2>
                    <StoryBlocks blocks={winterBreakGigIntroBlocks} />
                    <div className="month-visit-round-history">
                      <StoryBlocks blocks={winterGigFocusBlocks[winterGigFocusCharacter]} />
                    </div>
                    <StoryBlocks blocks={winterBreakGigEndingBlocks} />
                    <div className="reunion-pause-note">今晚的演出已經結束。佑達留下來整理器材，你可以決定和誰一起走去公車站。</div>
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={finishWinterGig}>演出結束，走出酒吧 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'winter-break-pickup' && (
                <div className="invite-notification-overlay">
                  <div className="invite-notification-card">
                    <div className="invite-notification-top">
                      <span className="invite-notification-icon"><MessageSquare size={17} /></span>
                      <span><strong>劉諺明</strong><small>1 月 22 日・深夜</small></span>
                    </div>
                    <h2>諺明哥到酒吧外面了。</h2>
                    <p>演出剛結束，手機就震了一下。諺明哥傳來訊息，說他已經在酒吧外面，手上還多帶了一件外套。</p>
                    <div className="invite-notification-actions">
                      <button className="story-primary-button" onClick={() => changeStage('winter-break-bus-choice')}>去門口看看 <ChevronRight size={15} /></button>
                    </div>
                  </div>
                </div>
              )}

              {storyStage === 'winter-break-bus-choice' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">演出結束・散場後</div>
                    <div className="story-contact-title">
                      <strong>一起走去公車站</strong>
                      <small>1997 年 1 月 22 日・深夜</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">AFTER SHOW · WHO GOES WITH YOU?</div>
                    <h2 className="story-scene-title">今晚想和誰多走一段路？</h2>
                    <StoryBlocks blocks={winterYanmingPickupAvailable ? winterYanmingPickupBlocks : [
                      { kind: 'narration', text: '你走到酒吧門口，夜風一下子吹散了舞台上的熱度。店裡最後幾桌客人還在聊天，舞台邊的燈一盞盞暗下來；佑達蹲在鼓組旁，把鼓棒和小配件一件件收進袋子，老闆拿著清單過來跟他核對。' },
                      { kind: 'dialogue', speaker: '錢佑達', text: '你們先去公車站啦，我跟老闆對一下器材清單，很快就追上！' },
                      { kind: 'dialogue', speaker: '蔡昇晏', text: '你最好快一點，剛剛不是還喊著要再唱一首？現在收東西倒是慢吞吞。' },
                      { kind: 'narration', text: '阿信把外套搭在手臂上，還在輕聲哼著最後一首歌的旋律；石頭確認琴袋拉鍊都拉好了，才把背帶往肩上調整；溫尚翊和瑪莎仍在爭論剛才那個小節，誰也不肯先認輸。你站在他們旁邊聽著，忽然覺得剛才舞台上的熱鬧還沒有散去。' },
                      { kind: 'narration', text: '公車站就在前面幾分鐘的路程。夜風有點涼，路口的車聲一陣一陣經過；幾個人看了看你，又看了看站牌的方向，像是都想陪你走完這一段。' },
                    ]} />
                    <div className="choice-area">
                      <div className="choice-heading">選一個人，陪你走到公車站</div>
                      {(['wen', 'ashin', 'masa', 'stone', ...(winterYanmingPickupAvailable ? ['yanming'] : [])] as WinterCharacterId[]).map((character) => (
                        <button className="reply-choice" key={character} onClick={() => chooseWinterBusStopCharacter(character)}>
                          <span>{winterBusStopRoutes[character].label}</span><ChevronRight size={15} />
                        </button>
                      ))}
                      <small>佑達要留下來收拾器材，這次就不列入同行選擇。</small>
                    </div>
                  </div>
                </div>
              )}

              {storyStage === 'winter-break-bus' && winterBusStopCharacter && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">散場後・夜風裡</div>
                    <div className="story-contact-title">
                      <strong>{winterBusStopRoutes[winterBusStopCharacter].title}</strong>
                      <small>1997 年 1 月 22 日・深夜</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">THE WAY TO THE BUS STOP</div>
                    <h2 className="story-scene-title">{winterBusStopRoutes[winterBusStopCharacter].title}</h2>
                    {winterYanmingPickupAvailable && winterBusStopCharacter !== 'yanming' && (
                      <StoryBlocks blocks={[
                        { kind: 'narration', text: '你回頭看向還站在騎樓下的諺明哥，先走過去跟他說一聲。' },
                        { kind: 'dialogue', speaker: '你', text: `諺明哥，我今晚想跟${winterBusStopRoutes[winterBusStopCharacter].label.replace(/^跟/, '').replace(/一起走$/, '')}一起走。謝謝你特地跑一趟。` },
                        { kind: 'dialogue', speaker: '劉諺明', text: '好啊，沒關係。妳跟朋友一起走也好，回去路上小心，到家記得傳個訊息。' },
                        { kind: 'narration', text: '他朝你點點頭，沒有多留你，轉身沿著騎樓往另一頭走去。你這才回到選好的同行人身邊。' },
                      ]} />
                    )}
                    <StoryBlocks blocks={winterBusStopRoutes[winterBusStopCharacter].blocks} />
                    {winterBusStopRoutes[winterBusStopCharacter].rounds.slice(0, winterBusStopReplies.length).map((round, index) => {
                      const selected = round.choices[winterBusStopReplies[index]]
                      if (!selected) return null
                      return (
                        <div className="month-visit-round-history" key={index}>
                          {round.sceneBlocks ? <StoryBlocks blocks={round.sceneBlocks} /> : round.scene && <StoryBlocks blocks={[{ kind: 'narration', text: round.scene }]} />}
                          <StoryBlocks blocks={[
                            { kind: 'dialogue', speaker: round.promptSpeaker, text: round.prompt },
                            { kind: 'dialogue', speaker: '你', text: selected.text },
                            ...selected.response,
                          ]} />
                        </div>
                      )
                    })}
                    {currentWinterBusStopRound ? (
                      <>
                        {currentWinterBusStopRound.sceneBlocks ? <StoryBlocks blocks={currentWinterBusStopRound.sceneBlocks} /> : currentWinterBusStopRound.scene && <StoryBlocks blocks={[{ kind: 'narration', text: currentWinterBusStopRound.scene }]} />}
                        <StoryBlocks blocks={[{ kind: 'dialogue', speaker: currentWinterBusStopRound.promptSpeaker, text: currentWinterBusStopRound.prompt }]} />
                        <div className="choice-area">
                          <div className="choice-heading">第 {winterBusStopReplies.length + 1}/3 輪・你想怎麼回答？</div>
                          {currentWinterBusStopRound.choices.map((choice, index) => (
                            <button className="reply-choice" key={index} onClick={() => chooseWinterBusStopReply(index)}>
                              <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
                            </button>
                          ))}
                          <small>每一輪都會影響你和對方之間的好感度。</small>
                        </div>
                      </>
                    ) : (
                      <>
                        <StoryBlocks blocks={winterBusStopRoutes[winterBusStopCharacter].endingBlocks} />
                      </>
                    )}
                  </div>
                  {winterBusStopReplies.length === winterBusStopRoutes[winterBusStopCharacter].rounds.length && (
                    <div className="story-action-bar">
                      <button className="story-primary-button" onClick={startWinterDiary}>回到家，寫下今天的日記 <ChevronRight size={15} /></button>
                    </div>
                  )}
                </div>
              )}

              {storyStage === 'winter-diary' && winterDiaryData && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">寒假特別篇・私人日記</div>
                    <div className="story-contact-title">
                      <strong>寒假的第一個晚上</strong>
                      <small>1997 年 1 月 22 日・星期三</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">1997 · WINTER JOURNAL</div>
                    <h2 className="story-scene-title">{winterDiaryData.title}</h2>
                    <div className="diary-paper story-diary-paper">
                      <span className="diary-date">1997 年 1 月 22 日・星期三</span>
                      <h2>{winterDiaryData.title}</h2>
                      {winterDiaryData.sections.map((section) => (
                        <DiarySection key={section.label} label={section.label} text={section.text} />
                      ))}
                    </div>
                    <div className="reunion-pause-note">這篇日記會保留在日記列表裡，之後也可以重新打開來看。</div>
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={finishWinterDiary}>合上日記，繼續寒假生活 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'february-intro' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">寒假・二月初</div>
                    <div className="story-contact-title">
                      <strong>一個名字的誕生</strong>
                      <small>1997 年 2 月初・台北</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">FEBRUARY · MAYDAY</div>
                    <h2 className="story-scene-title">這次，換個名字吧。</h2>
                    <StoryBlocks blocks={februaryIntroBlocks} />
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={() => changeStage('february-secret')}>趁大家忙著收東西，偷偷做點什麼 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'february-secret' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">練團室・小秘密</div>
                    <div className="story-contact-title">
                      <strong>趁大家沒注意的時候</strong>
                      <small>1997 年 2 月初・下午</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">A LITTLE SECRET</div>
                    <h2 className="story-scene-title">{februarySecretTarget ? februarySecretInteractions[februarySecretTarget].label : '你想偷偷找誰？'}</h2>
                    {!februarySecretTarget ? (
                      <>
                        <StoryBlocks blocks={[{ kind: 'narration', text: '報名資料暫時整理好了，大家各自忙起來。溫尚翊和阿信還在核對資料，石頭把桌上的紙張疊好，瑪莎正研究佑達那張中二團名清單。諺明哥把飲料和零食放好後，回到櫃台附近。你看了看周圍，突然覺得現在正是偷偷做點小動作的好時候。' }]} />
                        <div className="choice-area">
                          <div className="choice-heading">選一個人，趁空檔說幾句悄悄話</div>
                        {(Object.keys(februarySecretInteractions) as FebruaryCharacterId[]).map((character) => (
                          <button className="reply-choice" key={character} onClick={() => chooseFebruarySecretTarget(character)}>
                            <span>{februarySecretInteractions[character].label}</span><ChevronRight size={15} />
                          </button>
                        ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <StoryBlocks blocks={februarySecretInteractions[februarySecretTarget].blocks} />
                        <StoryBlocks blocks={[{
                          kind: 'dialogue',
                          speaker: februarySecretInteractions[februarySecretTarget].caughtBy,
                          text: februarySecretInteractions[februarySecretTarget].caughtLine,
                        }]} />
                        {februarySecretReply === null ? (
                          <div className="choice-area">
                            <div className="choice-heading">被發現了！你要怎麼回應？</div>
                            {februarySecretReplyChoices.map((choice, index) => (
                              <button className="reply-choice" key={index} onClick={() => chooseFebruarySecretReply(index)}>
                                <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
                              </button>
                            ))}
                          </div>
                        ) : (
                          <StoryBlocks blocks={[
                            { kind: 'dialogue', speaker: '你', text: februarySecretReplyChoices[februarySecretReply].text.replace(/^「|」$/g, '') },
                            { kind: 'dialogue', speaker: februarySecretInteractions[februarySecretTarget].caughtBy, text: februarySecretReplyChoices[februarySecretReply].response },
                            ...februarySecretInteractions[februarySecretTarget].afterReply,
                          ]} />
                        )}
                      </>
                    )}
                  </div>
                  {februarySecretTarget && februarySecretReply !== null && (
                    <div className="story-action-bar">
                      <button className="story-primary-button" onClick={() => changeStage('february-dinner')}>收拾東西，一起去吃飯 <ChevronRight size={15} /></button>
                    </div>
                  )}
                </div>
              )}

              {storyStage === 'february-dinner' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">二月初・晚餐</div>
                    <div className="story-contact-title">
                      <strong>附近的小吃店</strong>
                      <small>1997 年 2 月初・晚上</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">DINNER · ALL TOGETHER</div>
                    <h2 className="story-scene-title">一桌人，七嘴八舌。</h2>
                    <StoryBlocks blocks={februaryDinnerBlocks} />
                    {februaryDinnerReply === null ? (
                      <div className="choice-area">
                        <div className="choice-heading">瑪莎問你會不會去看他們演出，你想怎麼回答？</div>
                        {februaryDinnerChoices.map((choice, index) => (
                          <button className="reply-choice" key={index} onClick={() => chooseFebruaryDinnerReply(index)}>
                            <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <>
                        <StoryBlocks blocks={[
                          { kind: 'dialogue', speaker: '你', text: februaryDinnerChoices[februaryDinnerReply].text },
                          ...februaryDinnerChoices[februaryDinnerReply].response,
                        ]} />
                        <div className="reunion-pause-note">桌上的話題又繞到三月底的演出，大家一邊吃飯，一邊七嘴八舌地討論要練哪些歌。</div>
                      </>
                    )}
                  </div>
                  {februaryDinnerReply !== null && (
                    <div className="story-action-bar">
                      <button className="story-primary-button" onClick={() => changeStage('february-table')}>繼續吃飯 <ChevronRight size={15} /></button>
                    </div>
                  )}
                </div>
              )}

              {storyStage === 'february-table' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">晚餐・不經意的小動作</div>
                    <div className="story-contact-title">
                      <strong>有人悄悄注意著你</strong>
                      <small>1997 年 2 月初・晚上</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">A SMALL GESTURE</div>
                    <h2 className="story-scene-title">{februaryAfterDinnerRoutes[februaryTableCharacter ?? currentFebruaryHighestAffection].label} · 餐桌上的小動作</h2>
                    <StoryBlocks blocks={februaryTableMoments[februaryTableCharacter ?? currentFebruaryHighestAffection]} />
                    <div className="reunion-pause-note">飯後，你還可以重新選擇想一起走一段路的人。</div>
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={() => changeStage('february-after-dinner-picker')}>吃完了，想再和誰走一段路？ <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'february-after-dinner-picker' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">晚餐後・自由選擇</div>
                    <div className="story-contact-title">
                      <strong>今晚還不想這麼早結束</strong>
                      <small>1997 年 2 月初・晚上</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">AFTER DINNER · WHO WITH YOU?</div>
                    <h2 className="story-scene-title">你想和誰再走一段？</h2>
                    <StoryBlocks blocks={[
                      { kind: 'narration', text: '吃完飯，大家陸續從店裡出來。夜風從街口吹過，佑達還在跟瑪莎爭論到底是誰吃掉最後一塊炸物。其他人已經準備各自回家，你卻覺得今天還沒結束似的，想再找一個人走一小段路。' },
                      { kind: 'dialogue', speaker: '錢佑達', text: '明明就是你！' },
                      { kind: 'dialogue', speaker: '蔡昇晏', text: '你有證據嗎？' },
                      { kind: 'dialogue', speaker: '溫尚翊', text: '好了啦，你們兩個回去繼續吵。' },
                      { kind: 'dialogue', speaker: '陳信宏', text: '那大家明天見喔。' },
                      { kind: 'dialogue', speaker: '石錦航', text: '路上小心。' },
                    ]} />
                    <div className="choice-area">
                      <div className="choice-heading">選一個人，和他單獨走一段路</div>
                      {(Object.keys(februaryAfterDinnerRoutes) as FebruaryCharacterId[]).map((character) => (
                        <button className="reply-choice" key={character} onClick={() => chooseFebruaryAfterDinnerCharacter(character)}>
                          <span>{februaryAfterDinnerRoutes[character].label}</span><ChevronRight size={15} />
                        </button>
                      ))}
                      <small>這次選擇獨立於餐桌上的小動作，可以選不同的人。</small>
                    </div>
                  </div>
                </div>
              )}

              {storyStage === 'february-after-dinner' && currentFebruaryAfterDinnerRoute && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">晚餐後・單獨相處</div>
                    <div className="story-contact-title">
                      <strong>{currentFebruaryAfterDinnerRoute.title}</strong>
                      <small>1997 年 2 月初・晚上</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">AFTER DINNER · ONE ON ONE</div>
                    <h2 className="story-scene-title">{currentFebruaryAfterDinnerRoute.title}</h2>
                    <StoryBlocks blocks={currentFebruaryAfterDinnerRoute.blocks} />
                    {currentFebruaryAfterDinnerRoute.rounds.slice(0, februaryAfterDinnerReplies.length).map((round, index) => {
                      const selected = round.choices[februaryAfterDinnerReplies[index]]
                      if (!selected) return null
                      return (
                        <div className="month-visit-round-history" key={index}>
                          <StoryBlocks blocks={[
                            { kind: 'narration', text: round.scene },
                            { kind: 'dialogue', speaker: round.promptSpeaker, text: round.prompt },
                            { kind: 'dialogue', speaker: '你', text: selected.text },
                            ...selected.response,
                          ]} />
                        </div>
                      )
                    })}
                    {currentFebruaryAfterDinnerRound ? (
                      <>
                        <StoryBlocks blocks={[
                          { kind: 'narration', text: currentFebruaryAfterDinnerRound.scene },
                          { kind: 'dialogue', speaker: currentFebruaryAfterDinnerRound.promptSpeaker, text: currentFebruaryAfterDinnerRound.prompt },
                        ]} />
                        <div className="choice-area">
                          <div className="choice-heading">第 {februaryAfterDinnerReplies.length + 1}/3 輪・你想怎麼回答？</div>
                          {currentFebruaryAfterDinnerRound.choices.map((choice, index) => (
                            <button className="reply-choice" key={index} onClick={() => chooseFebruaryAfterDinnerReply(index)}>
                              <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
                            </button>
                          ))}
                          <small>每一輪的回覆都會影響你和對方之間的好感度。</small>
                        </div>
                      </>
                    ) : (
                      <>
                        <StoryBlocks blocks={currentFebruaryAfterDinnerRoute.endingBlocks} />
                        <div className="reunion-pause-note">這段路也走到尾聲了。回家後，把今天想記住的事情寫下來吧。</div>
                      </>
                    )}
                  </div>
                  {februaryAfterDinnerReplies.length === 3 && (
                    <div className="story-action-bar">
                      <button className="story-primary-button" onClick={startFebruaryDiary}>回家，寫下今天的日記 <ChevronRight size={15} /></button>
                    </div>
                  )}
                </div>
              )}

              {storyStage === 'february-diary' && februaryDiaryData && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">二月初・私人日記</div>
                    <div className="story-contact-title">
                      <strong>寫給今天的自己</strong>
                      <small>1997 年 2 月初・夜晚</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">1997 · FEBRUARY JOURNAL</div>
                    <h2 className="story-scene-title">{februaryDiaryData.title}</h2>
                    <div className="diary-paper story-diary-paper">
                      <span className="diary-date">1997 年 2 月初</span>
                      <h2>{februaryDiaryData.title}</h2>
                      <DiarySection label="日記" text={februaryDiaryData.text} />
                    </div>
                    <div className="reunion-pause-note">這篇日記會保留在日記列表裡，之後也可以重新打開來看。</div>
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={finishFebruaryDiary}>合上日記，結束今天 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'spring-term-intro' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head"><div className="chapter-mark">春季學期</div><div className="story-contact-title"><strong>開學以後</strong><small>1997 年 2 月・台北</small></div><span className="story-head-spacer" /></div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">A NEW SEMESTER</div><h2 className="story-scene-title">又回到熟悉的日子</h2>
                    <StoryBlocks blocks={[
                      { kind: 'narration', text: '過年幾天一下子就過去了。拜年、吃飯、收紅包，還有被長輩問功課的時間，轉眼就結束。開學後，校園重新熱鬧起來，你也把課本和筆記重新塞回書包。' },
                      { kind: 'narration', text: '上午下課時，你才剛走出教室，手機就接連響了幾聲。有人問你今天有沒有空，說想去樂器行看看。' },
                      { kind: 'narration', text: '你低頭看著螢幕，發現不是每個人都傳了訊息。到底有誰想約你一起去呢？' },
                    ]} />
                  </div>
                  <div className="story-action-bar"><button className="story-primary-button" onClick={beginSpringInvites}>看看手機 <ChevronRight size={15} /></button></div>
                </div>
              )}

              {storyStage === 'spring-invite-picker' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head"><div className="chapter-mark">春季學期</div><div className="story-contact-title"><strong>樂器行邀約</strong><small>1997 年 2 月・上午</small></div><span className="story-head-spacer" /></div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">WHO WANTS TO GO WITH YOU?</div><h2 className="story-scene-title">{springInvitePendingCandidates.length ? '有人約你一起出門' : '今天沒有收到邀約'}</h2>
                    {springInvitePendingCandidates.length ? (
                      <>
                        <StoryBlocks blocks={[{ kind: 'narration', text: '手機螢幕亮了幾次，幾個熟悉的名字旁邊都多了未讀訊息。你沒有急著看內容，打算先點開一個人的訊息再決定。' }]} />
                        <div className="choice-area"><div className="choice-heading">選擇一個邀約</div>
                          {springInvitePendingCandidates.map((character) => (
                            <button className="reply-choice spring-invite-person-choice" key={character} onClick={() => chooseSpringInviteTarget(character)}>
                              <span className="spring-invite-person-copy"><strong>{characterNames[character]}</strong><small>未讀訊息・點開查看</small></span><ChevronRight size={15} />
                            </button>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <StoryBlocks blocks={[{ kind: 'narration', text: '看來今天的邀約都已經看過了。你把手機收起來，想了想，還是決定自己去練團室看看。' }]} />
                        <div className="story-action-bar"><button className="story-primary-button" onClick={() => changeStage('spring-rehearsal')}>自己去練團室 <ChevronRight size={15} /></button></div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {storyStage === 'spring-store' && springStoreCharacter && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head"><div className="chapter-mark">上午・樂器行</div><div className="story-contact-title"><strong>{springStoreRoutes[springStoreCharacter].title}</strong><small>一起逛逛</small></div><span className="story-head-spacer" /></div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">MUSIC STORE</div><h2 className="story-scene-title">逛一間熟悉的店</h2>
                    <StoryBlocks blocks={springStoreRoutes[springStoreCharacter].blocks} />
                    {springStoreReply === null ? (
                      <div className="choice-area">
                        <div className="choice-heading">第 1/3 輪・{springStoreRoutes[springStoreCharacter].rounds[0].prompt}</div>
                        {springStoreRoutes[springStoreCharacter].rounds[0].choices.map((choice, index) => (
                          <button className="reply-choice" key={index} onClick={() => chooseSpringStoreReply(index)}><span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} /></button>
                        ))}
                      </div>
                    ) : (
                      <>
                        <StoryBlocks blocks={[
                          { kind: 'dialogue', speaker: '你', text: stripCornerQuotes(springStoreRoutes[springStoreCharacter].rounds[0].choices[springStoreReply].text) },
                          ...springResponseBlocks(
                            springStoreCharacter === 'wen' ? '溫尚翊' : springStoreCharacter === 'ashin' ? '陳信宏' : springStoreCharacter === 'masa' ? '瑪莎' : springStoreCharacter === 'stone' ? '石錦航' : '劉諺明',
                            springStoreRoutes[springStoreCharacter].rounds[0].choices[springStoreReply].response,
                          ),
                        ]} />
                        <StoryBlocks blocks={springStoreRoutes[springStoreCharacter].rounds[1].scene} />
                        {springStoreSecondReply === null ? (
                          <div className="choice-area">
                            <div className="choice-heading">第 2/3 輪・{springStoreRoutes[springStoreCharacter].rounds[1].prompt}</div>
                            {springStoreRoutes[springStoreCharacter].rounds[1].choices.map((choice, index) => (
                              <button className="reply-choice" key={index} onClick={() => chooseSpringStoreSecondReply(index)}><span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} /></button>
                            ))}
                          </div>
                        ) : (
                          <>
                            <StoryBlocks blocks={[
                              { kind: 'dialogue', speaker: '你', text: stripCornerQuotes(springStoreRoutes[springStoreCharacter].rounds[1].choices[springStoreSecondReply].text) },
                              ...springResponseBlocks(
                                springStoreCharacter === 'wen' ? '溫尚翊' : springStoreCharacter === 'ashin' ? '陳信宏' : springStoreCharacter === 'masa' ? '瑪莎' : springStoreCharacter === 'stone' ? '石錦航' : '劉諺明',
                                springStoreRoutes[springStoreCharacter].rounds[1].choices[springStoreSecondReply].response,
                              ),
                            ]} />
                            <StoryBlocks blocks={springStoreRoutes[springStoreCharacter].rounds[2].scene} />
                            {springStoreThirdReply === null ? (
                              <div className="choice-area">
                                <div className="choice-heading">第 3/3 輪・{springStoreRoutes[springStoreCharacter].rounds[2].prompt}</div>
                                {springStoreRoutes[springStoreCharacter].rounds[2].choices.map((choice, index) => (
                                  <button className="reply-choice" key={index} onClick={() => chooseSpringStoreThirdReply(index)}><span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} /></button>
                                ))}
                              </div>
                            ) : (
                              <>
                                <StoryBlocks blocks={[
                                  { kind: 'dialogue', speaker: '你', text: stripCornerQuotes(springStoreRoutes[springStoreCharacter].rounds[2].choices[springStoreThirdReply].text) },
                                  ...springResponseBlocks(
                                    springStoreCharacter === 'wen' ? '溫尚翊' : springStoreCharacter === 'ashin' ? '陳信宏' : springStoreCharacter === 'masa' ? '瑪莎' : springStoreCharacter === 'stone' ? '石錦航' : '劉諺明',
                                    springStoreRoutes[springStoreCharacter].rounds[2].choices[springStoreThirdReply].response,
                                  ),
                                ]} />
                                <StoryBlocks blocks={springStoreRoutes[springStoreCharacter].endingBlocks} />
                                <div className="story-action-bar"><button className="story-primary-button" onClick={() => changeStage('spring-rehearsal')}>一起去練團室 <ChevronRight size={15} /></button></div>
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}

              {storyStage === 'spring-rehearsal' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head"><div className="chapter-mark">春季學期・主線</div><div className="story-contact-title"><strong>練團室</strong><small>今天練習《轧車》</small></div><span className="story-head-spacer" /></div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">MAYDAY REHEARSAL</div><h2 className="story-scene-title">轧車！</h2>
                    <StoryBlocks blocks={[
                      { kind: 'narration', text: springStoreCharacter ? characterNames[springStoreCharacter] + '陪你一路走到練團室。你們一起推開門，佑達正坐在鼓組旁邊轉著鼓棒。' : '你自己走到練團室，推開門時，佑達正坐在鼓組旁邊轉著鼓棒。' },
                      ...springRehearsalBlocks,
                    ]} />
                  </div>
                  <div className="story-action-bar"><button className="story-primary-button" onClick={() => changeStage('spring-after-picker')}>練團結束了 <ChevronRight size={15} /></button></div>
                </div>
              )}

              {storyStage === 'spring-after-picker' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head"><div className="chapter-mark">練團結束・晚上</div><div className="story-contact-title"><strong>接下來的時間</strong><small>佑達已經先離開</small></div><span className="story-head-spacer" /></div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">AFTER REHEARSAL</div><h2 className="story-scene-title">{springAfterChoice === 'lesson' ? '想跟誰學一點東西？' : '晚上想做什麼？'}</h2>
                    <StoryBlocks blocks={springAfterChoice === 'lesson'
                      ? [{ kind: 'narration', text: '佑達已經先走了，其他人還在收拾器材。瑪莎把 Bass 放回琴袋，溫尚翊和石頭整理吉他，阿信把麥克風收好。你忽然想趁大家還在，多學一點。' }]
                      : [{ kind: 'narration', text: '佑達已經先走了，其他人還在練團室裡收拾器材。諺明哥剛才先一步出去了；如果想跟他吃飯，就收好東西到外面找他。想留下來學樂器的話，裡面還有人在；今晚也可以什麼都不安排，直接回家。' }]} />
                    {springAfterChoice !== 'lesson' ? (
                      <div className="spring-after-choice-list">
                        <div className="spring-after-choice-heading">選擇今晚的安排</div>
                        <button className="spring-after-choice-button" onClick={() => chooseSpringAfterChoice('yanming-dinner')}>
                          <span className="spring-after-choice-copy"><strong>跟諺明哥去吃飯</strong><small>附近有家他常去的小店，正好可以慢慢聊聊。</small></span>
                          <ChevronRight size={17} />
                        </button>
                        <button className="spring-after-choice-button" onClick={() => chooseSpringAfterChoice('lesson')}>
                          <span className="spring-after-choice-copy"><strong>留下來學樂器</strong><small>溫尚翊、阿信、瑪莎或石頭，看看今晚誰留下來陪你。</small></span>
                          <ChevronRight size={17} />
                        </button>
                        <button className="spring-after-choice-button" onClick={() => chooseSpringAfterChoice('home')}>
                          <span className="spring-after-choice-copy"><strong>收拾東西，自己回家</strong><small>今晚先不另外安排活動，回家休息，之後再和大家傳訊息。</small></span>
                          <ChevronRight size={17} />
                        </button>
                      </div>
                    ) : (
                      <div className="choice-area"><div className="choice-heading">選一位老師</div>
                        {(['wen', 'ashin', 'masa', 'stone'] as const).map((character) => (
                          <button className="reply-choice" key={character} onClick={() => chooseSpringLessonCharacter(character)}><span>{springLessonRoutes[character].title}</span><ChevronRight size={15} /></button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {storyStage === 'spring-lesson' && springLessonCharacter && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head"><div className="chapter-mark">練團室・留下來一下</div><div className="story-contact-title"><strong>{springLessonRoutes[springLessonCharacter].title}</strong><small>每輪親自互動・摸茧後也由你接話</small></div><span className="story-head-spacer" /></div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">A LITTLE CLOSER</div><h2 className="story-scene-title">從第一個和弦開始</h2>
                    <StoryBlocks blocks={springLessonRoutes[springLessonCharacter].blocks} />
                    {springLessonRoutes[springLessonCharacter].rounds.map((round, index) => (
                      index > springLessonReplies.length || (index === 5 && springLessonReplies[4] !== 0) ? null : (
                        <div className="lesson-interaction-round" key={index}>
                          {round.scene.length > 0 ? <StoryBlocks blocks={round.scene} /> : null}
                          {index < springLessonReplies.length ? (
                            <StoryBlocks blocks={[
                              { kind: 'dialogue', speaker: '你', text: stripCornerQuotes(round.choices[springLessonReplies[index]].text) },
                              ...springResponseBlocks(
                                springLessonCharacter === 'wen' ? '溫尚翊' : springLessonCharacter === 'ashin' ? '陳信宏' : springLessonCharacter === 'masa' ? '瑪莎' : '石錦航',
                                round.choices[springLessonReplies[index]].response,
                              ),
                            ]} />
                          ) : (
                            <div className="choice-area">
                              <div className="choice-heading">{index === 5 ? round.prompt : `第 ${index + 1}/5 輪・${round.prompt}`}</div>
                              {round.choices.map((choice, choiceIndex) => (
                                <button className="reply-choice" key={choiceIndex} onClick={() => chooseSpringLessonRoundReply(index, choiceIndex)}><span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} /></button>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    ))}
                    {(springLessonReplies.length === 6 || (springLessonReplies.length === 5 && springLessonReplies[4] !== 0)) ? (
                      <>
                        <StoryBlocks blocks={springLessonRoutes[springLessonCharacter].endingBlocks} />
                        <div className="story-action-bar"><button className="story-primary-button" onClick={openSpringSmsPicker}>收拾東西，回家 <ChevronRight size={15} /></button></div>
                      </>
                    ) : null}
                  </div>
                </div>
              )}

              {storyStage === 'spring-dinner' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head"><div className="chapter-mark">練團後・晚餐</div><div className="story-contact-title"><strong>和諺明一起吃飯</strong><small>一頓飯，慢慢聊</small></div><span className="story-head-spacer" /></div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">DINNER WITH YANMING</div><h2 className="story-scene-title">附近的小店</h2>
                    <StoryBlocks blocks={springYanmingDinnerBlocks} />
                    {springYanmingDinnerRounds.map((round, index) => (
                      index > springDinnerReplies.length ? null : (
                        <div className="dinner-interaction-round" key={index}>
                          {round.scene.length > 0 ? <StoryBlocks blocks={round.scene} /> : null}
                          {index < springDinnerReplies.length ? (
                            <StoryBlocks blocks={[
                              { kind: 'dialogue', speaker: '你', text: stripCornerQuotes(round.choices[springDinnerReplies[index]].text) },
                              ...springResponseBlocks('劉諺明', round.choices[springDinnerReplies[index]].response),
                            ]} />
                          ) : (
                            <div className="choice-area">
                              <div className="choice-heading">第 {index + 1}/6 輪・{round.prompt}</div>
                              {round.choices.map((choice, choiceIndex) => (
                                <button className="reply-choice" key={choiceIndex} onClick={() => chooseSpringDinnerRoundReply(index, choiceIndex)}><span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} /></button>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    ))}
                    {springDinnerReplies.length === springYanmingDinnerRounds.length ? (
                      <>
                        <StoryBlocks blocks={springYanmingDinnerEndingBlocks} />
                        <div className="story-action-bar"><button className="story-primary-button" onClick={openSpringSmsPicker}>吃完飯，回家 <ChevronRight size={15} /></button></div>
                      </>
                    ) : null}
                  </div>
                </div>
              )}

              {storyStage === 'spring-sms-picker' && saveGameDate === '1997.02.17' && !springSmsEventComplete && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head"><div className="chapter-mark">回家後・手機</div><div className="story-contact-title"><strong>想傳訊息給誰？</strong><small>1997 年 2 月・晚上</small></div><span className="story-head-spacer" /></div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">ONE MORE MESSAGE</div><h2 className="story-scene-title">今天還有話想說</h2>
                    <StoryBlocks blocks={[{ kind: 'narration', text: '回到家，洗完澡，練團室裡《轧車》的鼓聲好像還留在耳朵裡。你想起剛才那些笑聲，還有每個人各自忙著收東西的樣子。手機就在枕頭旁邊，你想找一個人聊聊今天，最後決定先傳訊息給誰？' }]} />
                    <div className="choice-area"><div className="choice-heading">選擇一位聯絡人</div>
                      {springCharacterOrder.map((character) => (
                        <button className="reply-choice" key={character} onClick={() => chooseSpringSmsTarget(character)}><span>{characterNames[character]}</span><ChevronRight size={15} /></button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {storyStage === 'spring-diary' && springDiaryData && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head"><div className="chapter-mark">開學後・私人日記</div><div className="story-contact-title"><strong>寫給今天的自己</strong><small>1997 年 2 月 17 日・夜晚</small></div><span className="story-head-spacer" /></div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">1997 · SPRING SEMESTER</div>
                    <div className="diary-paper story-diary-paper"><span className="diary-date">1997 年 2 月 17 日</span><h2>{springDiaryData.title}</h2><DiarySection label="日記" text={springDiaryData.text} /></div>
                    <div className="reunion-pause-note">這篇日記會保留在日記列表裡，之後可以隨時重讀。</div>
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={finishSpringDiary}>合上日記，結束今天 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'march28-intro' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head"><div className="chapter-mark">1997 年・三月</div><div className="story-contact-title"><strong>野台開唱前一天</strong><small>3 月 28 日・星期五</small></div><span className="story-head-spacer" /></div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">ONE MONTH LATER</div><h2 className="story-scene-title">三月快要結束了</h2>
                    <StoryBlocks blocks={[
                      { kind: 'narration', text: '三月的最後幾天，台北已經有點夏天的脾氣了。早上出門時還覺得剛好，走到台大校門口，陽光就明晃晃地落在肩上，害人忍不住想把外套脫下來。' },
                      { kind: 'narration', text: '開學後的日子像被誰偷偷調快了。課表、報告、社團的雜事輪流追著人跑，桌上的講義總是才收好一疊，隔天又多出兩疊。偶爾和同學在小福排隊，明明只想買個午餐，聊著聊著就差點錯過下午的課；也有幾次在總圖坐到忘記時間，抬頭才發現窗外的光已經斜了。' },
                      { kind: 'narration', text: '校園裡的樹冒出新葉，走廊上有人抱著厚厚的課本一路小跑，腳踏車鈴聲從身後叮叮地追過去。日子沒什麼驚天動地的大事，卻在這些零零碎碎的小忙碌裡，一下子就走到了月底。' },
                      { kind: 'narration', text: '而這個月，你和某個人的距離，好像也悄悄近了一點。' },
                      { kind: 'narration', text: march28MonthRecap[currentMarch28HighestAffection] },
                      { kind: 'narration', text: '明天就是大安森林公園的野台開唱。這幾天練團室裡總有人待到很晚，偶爾經過附近，還能聽見吉他聲一遍遍從門縫裡漏出來。想到明天終於能在台下看他們演出，心裡便有點坐不住，連走路都不自覺快了幾步。' },
                      { kind: 'narration', text: '今天上午的事情處理完了，下午難得留了段空檔。你把桌上的講義收進包裡，站在宿舍門口想了一會兒：既然還有時間，不如出去晃晃。只是這個時間，去哪裡好呢？' },
                    ]} />
                    <div className="spring-after-choice-list">
                      <div className="spring-after-choice-heading">白天想去哪裡？選一個地方逛逛</div>
                      {march28CharacterOrder.map((character) => (
                        <button className="spring-after-choice-button" key={character} onClick={() => chooseMarch28VisitCharacter(character)}>
                          <span className="spring-after-choice-copy"><strong>{march28Routes[character].place}</strong><small>下午去這裡走走</small></span>
                          <ChevronRight size={17} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {storyStage === 'march28-visit' && march28VisitCharacter && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head"><div className="chapter-mark">3 月 28 日・白天</div><div className="story-contact-title"><strong>{march28Routes[march28VisitCharacter].title}</strong><small>{march28Routes[march28VisitCharacter].place}</small></div><span className="story-head-spacer" /></div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">A DAY BEFORE THE GIG</div>
                    <StoryBlocks blocks={march28Routes[march28VisitCharacter].blocks} />
                    {march28Routes[march28VisitCharacter].rounds.map((round, index) => (
                      index > march28VisitReplies.length ? null : (
                        <div className="lesson-interaction-round" key={index}>
                          {round.scene.length > 0 ? <StoryBlocks blocks={round.scene} /> : null}
                          {index < march28VisitReplies.length ? (
                            <StoryBlocks blocks={[
                              { kind: 'dialogue', speaker: '你', text: stripCornerQuotes(round.choices[march28VisitReplies[index]].text) },
                              ...springResponseBlocks(characterNames[march28VisitCharacter], round.choices[march28VisitReplies[index]].response),
                            ]} />
                          ) : (
                            <div className="choice-area">
                              <div className="choice-heading">第 {index + 1}/5 輪・{round.prompt}</div>
                              {round.choices.map((choice, choiceIndex) => (
                                <button className="reply-choice" key={choiceIndex} onClick={() => chooseMarch28VisitReply(index, choiceIndex)}><span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} /></button>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    ))}
                    {march28VisitReplies.length === 5 ? (
                      <>
                        <StoryBlocks blocks={march28Routes[march28VisitCharacter].endingBlocks} />
                        <div className="story-action-bar"><button className="story-primary-button" onClick={finishMarch28Visit}>收拾東西，準備回家 <ChevronRight size={15} /></button></div>
                      </>
                    ) : null}
                  </div>
                </div>
              )}

              {storyStage === 'march28-end' && march28VisitCharacter && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head"><div className="chapter-mark">3 月 28 日・晚飯後</div><div className="story-contact-title"><strong>要不要去公園走走？</strong><small>大安森林公園・野台開唱前一晚</small></div><span className="story-head-spacer" /></div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">A LITTLE WALK AFTER DINNER</div>
                    <h2 className="story-scene-title">突然想出去晃晃</h2>
                    <StoryBlocks blocks={march28AfterDinnerBlocks} />
                    <div className="choice-area">
                      <div className="choice-heading">晚飯後，想去哪裡？</div>
                      <button className="reply-choice" onClick={() => chooseMarch28Park('go')}><span>去大安森林公園走走</span><ChevronRight size={15} /></button>
                      <button className="reply-choice" onClick={() => chooseMarch28Park('skip')}><span>太麻煩了，今天還是直接回家吧</span><ChevronRight size={15} /></button>
                    </div>
                  </div>
                </div>
              )}

              {storyStage === 'march28-park' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head"><div className="chapter-mark">3 月 28 日・夜晚</div><div className="story-contact-title"><strong>大安森林公園</strong><small>明天演出的器材區</small></div><span className="story-head-spacer" /></div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">A SURPRISE ENCOUNTER</div>
                    <h2 className="story-scene-title">夜裡遇見阿信</h2>
                    <StoryBlocks blocks={march28ParkIntroBlocks} />
                    <div className="choice-area">
                      <div className="choice-heading">阿信勸你早點回家，你想？</div>
                      <button className="reply-choice" onClick={() => chooseMarch28ParkStay('return')}><span>好啦，我先回家，你也不要顧太晚</span><ChevronRight size={15} /></button>
                      <button className="reply-choice" onClick={() => chooseMarch28ParkStay('stay')}><span>我再陪你一下，反正還不想回家</span><ChevronRight size={15} /></button>
                    </div>
                  </div>
                </div>
              )}

              {storyStage === 'march28-park-stay' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head"><div className="chapter-mark">3 月 28 日・夜晚</div><div className="story-contact-title"><strong>一起守到天亮</strong><small>大安森林公園・只有你們兩個</small></div><span className="story-head-spacer" /></div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">A LITTLE LONGER TOGETHER</div>
                    <h2 className="story-scene-title">夜色慢慢變深</h2>
                    <StoryBlocks blocks={march28ParkStayIntroBlocks} />
                    {march28ParkStayRounds.map((round, index) => (
                      index > march28ParkStayReplies.length ? null : (
                        <div className="lesson-interaction-round" key={index}>
                          <StoryBlocks blocks={round.scene} />
                          {index < march28ParkStayReplies.length ? (
                            <StoryBlocks blocks={[
                              { kind: 'dialogue', speaker: '你', text: stripCornerQuotes(round.choices[march28ParkStayReplies[index]].text) },
                              ...springResponseBlocks('陳信宏', round.choices[march28ParkStayReplies[index]].response),
                            ]} />
                          ) : (
                            <div className="choice-area">
                              <div className="choice-heading">第 {index + 1}/{march28ParkStayRounds.length} 輪・{round.prompt}</div>
                              {round.choices.map((choice, choiceIndex) => (
                                <button className="reply-choice" key={choiceIndex} onClick={() => chooseMarch28ParkStayReply(index, choiceIndex)}><span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} /></button>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    ))}
                    {march28ParkStayReplies.length === march28ParkStayRounds.length ? (
                      <>
                        <StoryBlocks blocks={march28ParkStayEndingBlocks} />
                        <div className="reunion-pause-note">你們沒有回家，就這樣在公園裡陪著彼此，直到天色慢慢亮起。</div>
                      </>
                    ) : null}
                  </div>
                  {march28ParkStayReplies.length === march28ParkStayRounds.length && (
                    <div className="story-action-bar">
                      <button className="story-primary-button" onClick={finishMarch28Day}>天亮了，今天的演出要開始了 <ChevronRight size={15} /></button>
                    </div>
                  )}
                </div>
              )}

              {storyStage === 'march28-morning' && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">3 月 29 日・清晨</div>
                    <div className="story-contact-title">
                      <strong>{march28MorningFocusCharacter === 'ashin' ? '一起吃早餐' : '清晨的飯糰'}</strong>
                      <small>大安森林公園・演出開始前</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">{march28MorningFocusCharacter === 'ashin' ? 'A LITTLE BREAKFAST TOGETHER' : 'A SURPRISE VISITOR'}</div>
                    <h2 className="story-scene-title">{march28MorningFocusCharacter === 'ashin' ? '早晨的蛋餅' : '有人來送早餐了'}</h2>
                    <StoryBlocks blocks={currentMarch28MorningIntroBlocks} />
                    {currentMarch28MorningRoute.rounds.map((round, index) => (
                      index > march28MorningReplies.length ? null : (
                        <div className="lesson-interaction-round" key={index}>
                          <StoryBlocks blocks={round.scene} />
                          {index < march28MorningReplies.length ? (
                            <StoryBlocks blocks={[
                              { kind: 'dialogue', speaker: '你', text: stripCornerQuotes(round.choices[march28MorningReplies[index]].text) },
                              ...springResponseBlocks(characterNames[march28MorningFocusCharacter], round.choices[march28MorningReplies[index]].response),
                            ]} />
                          ) : (
                            <div className="choice-area">
                              <div className="choice-heading">{'第 ' + (index + 1) + '/' + currentMarch28MorningRoute.rounds.length + ' 輪・' + round.prompt}</div>
                              {round.choices.map((choice, choiceIndex) => (
                                <button className="reply-choice" key={choiceIndex} onClick={() => chooseMarch28MorningReply(index, choiceIndex)}><span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} /></button>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    ))}
                    {march28MorningReplies.length === currentMarch28MorningRoute.rounds.length ? (
                      <>
                        <StoryBlocks blocks={currentMarch28MorningRoute.endingBlocks} />
                        <div className="reunion-pause-note">早餐吃完了，今天的演出也快開始了。</div>
                      </>
                    ) : null}
                  </div>
                  {march28MorningReplies.length === currentMarch28MorningRoute.rounds.length && (
                    <div className="story-action-bar">
                      <button className="story-primary-button" onClick={finishMarch28Morning}>準備出發，去看今天的演出 <ChevronRight size={15} /></button>
                    </div>
                  )}
                </div>
              )}

              {storyStage === 'march28-diary' && march28DiaryData && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head"><div className="chapter-mark">3 月 28 日・私人日記</div><div className="story-contact-title"><strong>寫給今天的自己</strong><small>1997 年 3 月 28 日・夜晚</small></div><span className="story-head-spacer" /></div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">1997 · MARCH JOURNAL</div>
                    <div className="diary-paper story-diary-paper">
                      <span className="diary-date">1997 年 3 月 28 日・星期五</span>
                      <h2>{march28DiaryData.title}</h2>
                      <DiarySection label="日記" text={march28DiaryData.text} />
                    </div>
                    <div className="reunion-pause-note">這篇日記會保留在日記列表裡，之後也可以重新打開來看。</div>
                  </div>
                  <div className="story-action-bar"><button className="story-primary-button" onClick={finishMarch28Day}>合上日記，明天見 <ChevronRight size={15} /></button></div>
                </div>
              )}

              {storyStage === 'march29-show' && (
                <March29Show
                  affection={routeAffection}
                  onAddAffection={addRouteAffection}
                  onClockChange={updateMarch29Clock}
                  onFinish={finishMarch29AfterShow}
                />
              )}

              {storyStage === 'april12-story' && (
                <April12Story
                  onAddAffection={addRouteAffection}
                  onClockChange={updateApril12Clock}
                  onFinish={finishApril12Story}
                />
              )}

              {storyStage === 'april20-story' && (
                <April20Story
                  onAddAffection={addRouteAffection}
                  onAppendMessages={(entries) => appendChatMessages('youda', entries, '1997年4月20日・下午')}
                  onClockChange={updateApril20Clock}
                  onFinish={finishApril20Story}
                />
              )}

              {storyStage === 'april30-story' && (
                <April30Story
                  onClockChange={updateApril30Clock}
                  onFinish={finishApril30Story}
                />
              )}

              {storyStage === 'may10-story' && (
                <May10Story
                  affection={routeAffection}
                  onAddAffection={addRouteAffection}
                  onClockChange={updateMay10Clock}
                  onFinish={finishMay10Story}
                />
              )}

              {storyStage === 'june-study' && (
                <JuneStudyStory
                  onAddAffection={addRouteAffection}
                  onClockChange={updateJuneStudyClock}
                  onFinish={finishJuneStudyStory}
                />
              )}

              {storyStage === 'july-lost-key' && (
                <JulyLostKeyStory
                  onAddAffection={addRouteAffection}
                  onAppendMessages={(character, entries, date) => appendChatMessages(character, entries, date)}
                  onClockChange={updateJulyLostKeyClock}
                  onFinish={finishJulyLostKeyStory}
                />
              )}

              {storyStage === 'august-story' && (
                <AugustStory
                  affection={routeAffection}
                  onAddAffection={addRouteAffection}
                  onClockChange={updateAugustClock}
                  onFinish={finishAugustStory}
                />
              )}

              {storyStage === 'august-diary' && augustDiaryData && activeApp === null && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">八月・私人日記</div>
                    <div className="story-contact-title">
                      <strong>寫給今天的自己</strong>
                      <small>1997 年 8 月 1 日・星期五・夜晚</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">PRIVATE JOURNAL · AUGUST 1</div>
                    <div className="diary-paper story-diary-paper">
                      <span className="diary-date">1997 年 8 月 1 日・星期五</span>
                      <h2>{augustDiaryData.title}</h2>
                      <div className="diary-section-label">星期五 · 便利店與下班後</div>
                      <DiarySection label="日記" text={augustDiaryData.text} />
                    </div>
                    <div className="reunion-pause-note">這篇日記會留在日記列表裡，之後也可以隨時重新打開來看。</div>
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={finishAugustDiary}>合上日記，開啟九月 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'september-intro' && activeApp === null && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">九月・出發前</div>
                    <div className="story-contact-title">
                      <strong>夏天的海，和我們</strong>
                      <small>1997 年 9 月 3 日・星期三・晚上</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">SEPTEMBER · BEFORE THE SEMESTER</div>
                    <h2 className="story-scene-title">趁著開學以前，去看海</h2>
                    <StoryBlocks blocks={septemberIntroBlocks} />
                    <div className="reunion-pause-note">六個人・三天兩夜・台東轉船・綠島環島</div>
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={startSeptemberStory}>
                      看看大家在商量什麼 <ChevronRight size={15} />
                    </button>
                    <button className="diary-detail-back" onClick={() => { setActiveApp('diary'); setSelectedDiaryDate('1997-08-01') }}>
                      回看八月日記
                    </button>
                  </div>
                </div>
              )}

              {storyStage === 'september-story' && (
                <SeptemberStory
                  onAddAffection={addRouteAffection}
                  onClockChange={updateSeptemberClock}
                  onFinish={finishSeptemberStory}
                />
              )}

              {storyStage === 'september-diary' && septemberDiaryData && activeApp === null && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">九月・私人日記</div>
                    <div className="story-contact-title">
                      <strong>夏天的海，和我們</strong>
                      <small>1997 年 9 月 6 日・星期六・夜晚</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">PRIVATE JOURNAL · SEPTEMBER 6</div>
                    <div className="diary-paper story-diary-paper">
                      <span className="diary-date">1997 年 9 月 6 日・星期六</span>
                      <h2>{septemberDiaryData.title}</h2>
                      <div className="diary-section-label">綠島三日小旅行</div>
                      <SeptemberPhotoCard caption={septemberDiaryData.photoCaption} />
                      <DiarySection label="日記" text={septemberDiaryData.text} />
                    </div>
                    <div className="reunion-pause-note">六人合照已經收進日記裡，之後也可以隨時回來重看。</div>
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={finishSeptemberDiary}>
                      合上日記 <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
              )}

              {storyStage === 'june-free-chat' && juneFreeChatStarted && juneFreeChatTarget === null && activeApp === null && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">六月中旬・傍晚</div>
                    <div className="story-contact-title">
                      <strong>自由簡訊</strong>
                      <small>1997 年 6 月 15 日・星期日</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">JUNE · EVENING MESSAGES</div>
                    <h2 className="story-scene-title">今晚想找誰聊聊？</h2>
                    <StoryBlocks blocks={[
                      { kind: 'narration', text: '期末複習告一段落，回到家後，你忽然想到幾件今天遇到的小事。沒有什麼特別的原因，只是想拿起手機，找一個人隨便聊聊。' },
                    ]} />
                    <div className="month-visit-picker">
                      {freeTimeOrder.map((id) => {
                        const person = characterInfo.find((item) => item.id === id)!
                        return (
                          <button className="free-time-person" key={id} onClick={() => chooseJuneFreeChatTarget(id)}>
                            <span className="sms-avatar">{person.avatar}</span>
                            <span><strong>{person.name}</strong><small>主動傳訊息，聊聊日常</small></span>
                            <ChevronRight size={15} />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {storyStage === 'june-free-chat' && juneFreeChatStarted && juneFreeChatTarget !== null && activeApp === null && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">六月中旬・傍晚</div>
                    <div className="story-contact-title">
                      <strong>{characterNames[juneFreeChatTarget]}</strong>
                      <small>自由簡訊・1997 年 6 月 15 日</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">訊息還停留在剛才的地方</div>
                    <h2 className="story-scene-title">要繼續和他聊天嗎？</h2>
                    <StoryBlocks blocks={[
                      { kind: 'narration', text: '你已經選好了今晚想找的人。打開訊息，就能接著剛才的對話繼續聊。' },
                    ]} />
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={() => openMessagesApp(juneFreeChatTarget)}>打開訊息 <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {storyStage === 'june-diary' && juneDiaryData && activeApp === null && (
                <div className="story-screen-overlay">
                  <div className="story-screen-head">
                    <div className="chapter-mark">六月中旬・私人日記</div>
                    <div className="story-contact-title">
                      <strong>寫給今天的自己</strong>
                      <small>1997 年 6 月 15 日・星期日・夜晚</small>
                    </div>
                    <span className="story-head-spacer" />
                  </div>
                  <div className="story-narrative-scroll">
                    <div className="story-kicker">PRIVATE JOURNAL · JUNE 15</div>
                    <div className="diary-paper story-diary-paper">
                      <span className="diary-date">1997 年 6 月 15 日・星期日</span>
                      <h2>{juneDiaryData.title}</h2>
                      <div className="diary-section-label">星期日 · 期末複習與晚間簡訊</div>
                      <DiarySection label="日記" text={juneDiaryData.text} />
                    </div>
                    <div className="reunion-pause-note">這篇日記會留在日記列表裡，之後也可以隨時重新打開來看。</div>
                  </div>
                  <div className="story-action-bar">
                    <button className="story-primary-button" onClick={finishJuneDiary}>合上日記，結束今天 <ChevronRight size={15} /></button>
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
              
              {(storyStage === 'spring-invite-notification' || storyStage === 'spring-invite-chat') && springInviteTarget && activeApp === null && (
                <button className="sms-notification" onClick={openSpringInviteMessages}>
                  <span className="notification-icon"><MessageSquare size={19} /></span>
                  <span className="notification-copy">
                    <strong>{characterNames[springInviteTarget]}</strong>
                    <span>{storyStage === 'spring-invite-notification' ? springInvites[springInviteTarget][springInvites[springInviteTarget].length - 1] : '邀約簡訊還在等妳回覆，點開繼續。'}</span>
                    <span>樂器行邀約・新訊息</span>
                  </span>
                  <span className="notification-time">現在</span>
                </button>
              )}
              {storyStage === 'year-end-shopping-notification' && yearEndInviteTarget && activeApp === null && (
                <button className="sms-notification" onClick={openYearEndShoppingMessages}>
                  <span className="notification-icon"><MessageSquare size={19} /></span>
                  <span className="notification-copy">
                    <strong>{characterNames[yearEndInviteTarget]}</strong>
                    <span>{yearEndShoppingRoutes[yearEndInviteTarget].invitation[yearEndShoppingRoutes[yearEndInviteTarget].invitation.length - 1]}</span>
                    <span>邀你一起買年貨</span>
                  </span>
                  <span className="notification-time">現在</span>
                </button>
              )}
              {storyStage === 'year-end-new-year-notification' && yearEndGreetingTarget && activeApp === null && (
                <button className="sms-notification" onClick={openYearEndNewYearMessages}>
                  <span className="notification-icon"><MessageSquare size={19} /></span>
                  <span className="notification-copy">
                    <strong>{characterNames[yearEndGreetingTarget]}</strong>
                    <span>{yearEndNewYearMessages[yearEndGreetingTarget as YearEndRouteCharacterId]}</span>
                    <span>新年快樂</span>
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
                        onClick={() => activeApp === 'messages' && selectedSmsThread ? (storyStage === 'next-month-free-chat' ? (setSelectedSmsThread(null), setActiveApp(null)) : setSelectedSmsThread(null)) : activeApp === 'diary' && selectedDiaryDate ? setSelectedDiaryDate(null) : setActiveApp(null)}
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
                              <span>{isSpringTerm ? "收件匣 · 1997" : "收件匣 · 1996"}</span>
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
                              {storyStage === 'winter-exam-chat' && selectedSmsThread === 'wen' && winterExamChatReplyChoice === null && (
                                <div className="choice-area">
                                  <div className="choice-heading">溫尚翊問你什麼時候方便，你想怎麼回？</div>
                                  {winterExamChatChoices.map((choice, index) => (
                                    <button className="reply-choice" key={index} onClick={() => chooseWinterExamChatReply(index)}>
                                      <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
                                    </button>
                                  ))}
                                  <small>選擇後只會送出這一則回覆；後續訊息仍要由你親自選擇。</small>
                                </div>
                              )}
                              {storyStage === 'winter-exam-chat' && selectedSmsThread === 'wen' && winterExamChatReplyChoice !== null && winterExamChatClosingChoice === null && (
                                <div className="choice-area">
                                  <div className="choice-heading">時間約好了，你還想怎麼回他？</div>
                                  {winterExamChatClosingChoices.map((choice, index) => (
                                    <button className="reply-choice" key={index} onClick={() => chooseWinterExamChatClosingReply(index)}>
                                      <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
                                    </button>
                                  ))}
                                  <small>這一輪也要由你親自選擇，不會自動替你補發訊息。</small>
                                </div>
                              )}
                              {storyStage === 'greetings' && selectedSmsThread === currentGreetingId && !greetingReplied && (
                                <div className="choice-area">
                                  <div className="choice-heading">{characterNames[currentGreetingId]}的回覆</div>
                                  {currentGreetingRound.choices.map((choice, index) => (
                                    <button className="reply-choice" key={index} onClick={() => chooseGreetingReply(index)}>
                                      <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
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
                                      <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
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
                                      <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
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
                                      <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
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
                                      <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
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
                                      <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
                                    </button>
                                  ))}
                                  <small>每輪都有三種回法，會影響對方反應與好感；也可能一不小心扣分。</small>
                                </div>
                              )}
                              {storyStage === 'june-free-chat' && juneFreeChatTarget && selectedSmsThread === juneFreeChatTarget && !juneFreeChatReplied && (
                                <div className="choice-area">
                                  <div className="choice-heading">六月日常簡訊・第 {juneFreeChatRound + 1}/5 輪</div>
                                  {juneFreeChatScripts[juneFreeChatTarget].rounds[juneFreeChatRound].choices.map((choice, index) => (
                                    <button className="reply-choice" key={index} onClick={() => chooseJuneFreeChatReply(index)}>
                                      <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
                                    </button>
                                  ))}
                                  <small>每輪有三個回覆選項，會影響對方的好感度；聊天紀錄會保留在收件匣裡。</small>
                                </div>
                              )}
                              {storyStage === 'month-free-chat' && monthFreeChatTarget && selectedSmsThread === monthFreeChatTarget && !monthFreeChatOpeningSent && (
                                <div className="choice-area">
                                  <div className="choice-heading">{monthFreeChatTarget === monthVisitTarget ? '延續今天和' + characterNames[monthFreeChatTarget] + '的見面，先傳一則訊息' : '今天想找' + characterNames[monthFreeChatTarget] + '聊聊，先傳一則訊息'}</div>
                                  {getMonthFreeChatOpeningChoices(monthFreeChatTarget).map((choice, index) => (
                                    <button className="reply-choice" key={index} onClick={() => chooseMonthFreeChatOpening(index)}>
                                      <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
                                    </button>
                                  ))}
                                  <small>由你主動開啟對話。沒見面的朋友不會知道白天的見面細節，除非你自己告訴他。</small>
                                </div>
                              )}
                              {storyStage === 'month-free-chat' && monthFreeChatTarget && selectedSmsThread === monthFreeChatTarget && monthFreeChatOpeningSent && !monthFreeChatReplied && (
                                <div className="choice-area">
                                  <div className="choice-heading">一個月後・自由對話・第 {monthFreeChatRound + 1}/5 輪</div>
                                  {getMonthFreeChatRounds(monthFreeChatTarget)[monthFreeChatRound].choices.map((choice, index) => (
                                    <button className="reply-choice" key={index} onClick={() => chooseMonthFreeChatReply(index)}>
                                      <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
                                    </button>
                                  ))}
                                  <small>每輪都有三個回覆選項，會影響對方的反應與好感度。</small>
                                </div>
                              )}
                            </div>
                            {storyStage === 'winter-exam-chat' && selectedSmsThread === 'wen' && winterExamChatClosingChoice !== null && (
                              <div className="sms-thread-actions">
                                <div className="reply-note">你們已經約好明天下午兩點在圖書館見。溫尚翊還特別提醒你把課本和講義都帶上。</div>
                                <button className="story-primary-button" onClick={continueWinterExamTutoring}>
                                  收起手機，明天下午去圖書館 <ChevronRight size={15} />
                                </button>
                              </div>
                            )}
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
                                <div className="reply-note">你終於弄清楚了：瑪莎和石頭現在都才大一。至於他為什麼比你晚了兩個年級，他似乎還不太想細說。</div>
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
                            {storyStage === 'june-free-chat' && juneFreeChatTarget && selectedSmsThread === juneFreeChatTarget && juneFreeChatReplied && juneFreeChatRound === 4 && (
                              <div className="sms-thread-actions">
                                <div className="reply-note">五輪日常聊天已經聊完，所有訊息都會留在收件匣裡，之後也可以隨時回看。</div>
                                <button className="story-primary-button" onClick={finishJuneFreeChat}>收起手機，結束今晚聊天 <ChevronRight size={15} /></button>
                              </div>
                            )}
                            {storyStage === 'month-free-chat' && monthFreeChatTarget && selectedSmsThread === monthFreeChatTarget && monthFreeChatReplied && monthFreeChatRound === 4 && (
                              <div className="sms-thread-actions">
                                <div className="reply-note">五輪對話已經聊完。你把手機裡的訊息收好，準備把今天記進日記。</div>
                                <button className="story-primary-button" onClick={finishMonthFreeChat}>收起手機，寫下今天的日記 <ChevronRight size={15} /></button>
                              </div>
                            )}
                              {storyStage === 'next-month-invite-chat' && nextMonthInviteTarget && selectedSmsThread === nextMonthInviteTarget && currentNextMonthInvite?.teaseChoices && nextMonthInviteTeaseChoice === null && (
                                <div className="choice-area">
                                  <div className="choice-heading">{currentNextMonthInvite.teasePrompt ?? '你想怎麼回他？'}</div>
                                  {currentNextMonthInvite.teaseChoices.map((choice, index) => (
                                    <button className="reply-choice" key={index} onClick={() => chooseNextMonthInviteTease(index)}>
                                      <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
                                    </button>
                                  ))}
                                  <small>你選的回覆會直接傳送到這個簡訊對話裡，也會影響好感度。</small>
                                </div>
                              )}
                              {storyStage === 'next-month-invite-chat' && nextMonthInviteTarget && selectedSmsThread === nextMonthInviteTarget && (!currentNextMonthInvite?.teaseChoices || nextMonthInviteTeaseChoice !== null) && nextMonthInviteReplyChoice === null && currentNextMonthInvite && (
                                <div className="choice-area">
                                  <div className="choice-heading">你想怎麼回覆{characterNames[nextMonthInviteTarget]}？</div>
                                  {currentNextMonthInvite.replyChoices.map((choice, index) => (
                                    <button className="reply-choice" key={index} onClick={() => chooseNextMonthInviteReply(index)}>
                                      <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
                                    </button>
                                  ))}
                                  <small>每個選項都有不同的回應與好感度；婉拒邀約不會扣好感。</small>
                                </div>
                              )}
                              {storyStage === 'next-month-invite-chat' && nextMonthInviteTarget && selectedSmsThread === nextMonthInviteTarget && nextMonthInviteReplyChoice !== null && currentNextMonthInvite && (
                                <div className="sms-thread-actions">
                                  <div className="reply-note">
                                    {currentNextMonthInvite.replyChoices[nextMonthInviteReplyChoice].accepted
                                      ? '你們已經把時間約好了。收起手機，準備出門赴約吧。'
                                      : '他表示沒關係，等下次有空再約。你今天還是可以回社團幫忙。'}
                                  </div>
                                  <button className="story-primary-button" onClick={continueNextMonthInvite}>
                                    {currentNextMonthInvite.replyChoices[nextMonthInviteReplyChoice].accepted ? '收起手機，去赴約' : '收起手機，先去社團幫忙'} <ChevronRight size={15} />
                                  </button>
                                </div>
                              )}
                              {storyStage === 'next-month-free-chat' && nextMonthFreeChatTarget && selectedSmsThread === nextMonthFreeChatTarget && !nextMonthFreeChatOpeningSent && (
                                <div className="choice-area">
                                  <div className="choice-heading">先傳一則訊息給{characterNames[nextMonthFreeChatTarget]}</div>
                                  {nextMonthFreeChatOpeners[nextMonthFreeChatTarget].map((choice, index) => (
                                    <button className="reply-choice" key={index} onClick={() => chooseNextMonthFreeChatOpening(index)}>
                                      <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
                                    </button>
                                  ))}
                                  <small>由你主動開啟對話，先聊聊今天的小事。</small>
                                </div>
                              )}
                              {storyStage === 'next-month-free-chat' && nextMonthFreeChatTarget && selectedSmsThread === nextMonthFreeChatTarget && nextMonthFreeChatOpeningSent && !nextMonthFreeChatReplied && (
                                <div className="choice-area">
                                  <div className="choice-heading">十二月・自由對話・第 {nextMonthFreeChatRound + 1}/5 輪</div>
                                  {getNextMonthFreeChatRounds(nextMonthFreeChatTarget)[nextMonthFreeChatRound].choices.map((choice, index) => (
                                    <button className="reply-choice" key={index} onClick={() => chooseNextMonthFreeChatReply(index)}>
                                      <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
                                    </button>
                                  ))}
                                  <small>每輪都有三個回覆選項，會影響對方的反應與好感。</small>
                                </div>
                              )}
                              {storyStage === 'next-month-free-chat' && nextMonthFreeChatTarget && selectedSmsThread === nextMonthFreeChatTarget && nextMonthFreeChatReplied && nextMonthFreeChatRound === 4 && (
                                <div className="sms-thread-actions">
                                  <div className="reply-note">五輪對話已經聊完。把手機收好，準備寫下今天的日記。</div>
                                  <button className="story-primary-button" onClick={finishNextMonthFreeChat}>收起手機，寫下今天的日記 <ChevronRight size={15} /></button>
                                </div>
                              )}

                              {storyStage === 'spring-invite-chat' && springInviteTarget && selectedSmsThread === springInviteTarget && currentSpringInviteRound && (
                                <div className="choice-area">
                                  <div className="choice-heading">第 {springInviteReplies.length + 1}/3 輪・你想怎麼回覆{characterNames[springInviteTarget]}？</div>
                                  {currentSpringInviteRound.choices.map((choice, index) => (
                                    <button className="reply-choice" key={index} onClick={() => chooseSpringInviteReply(index)}>
                                      <span>{choice.text.replace(/^「|」$/g, '')}</span><ChevronRight size={15} />
                                    </button>
                                  ))}
                                  <small>每一輪都由你親自回覆。最後再決定要不要接受邀約。</small>
                                </div>
                              )}
                              {storyStage === 'spring-invite-chat' && springInviteTarget && selectedSmsThread === springInviteTarget && springInviteFinalChoice && (
                                <div className="sms-thread-actions">
                                  <div className="reply-note">{springInviteFinalChoice.accepted ? '你答應了邀約。收起手機，準備和' + characterNames[springInviteTarget] + '一起去樂器行吧。' : '你婉拒了這次邀約。對方表示沒關係，你還可以看看其他人的訊息。'}</div>
                                  <button className="story-primary-button" onClick={finishSpringInvite}>
                                    {springInviteFinalChoice.accepted ? '收起手機，去樂器行' : '收起手機，返回邀約列表'} <ChevronRight size={15} />
                                  </button>
                                </div>
                              )}
                              {storyStage === 'spring-sms-chat' && springSmsTarget && selectedSmsThread === springSmsTarget && !springSmsOpeningSent && (
                                <div className="choice-area">
                                  <div className="choice-heading">先傳一則訊息給{characterNames[springSmsTarget]}</div>
                                  {currentSpringSmsOpeners.map((choice, index) => (
                                    <button className="reply-choice" key={index} onClick={() => chooseSpringSmsOpening(index)}>
                                      <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
                                    </button>
                                  ))}
                                  <small>先由你開啟對話。</small>
                                </div>
                              )}
                              {storyStage === 'spring-sms-chat' && springSmsTarget && selectedSmsThread === springSmsTarget && springSmsOpeningSent && !springSmsReplied && (
                                <div className="choice-area">
                                  <div className="choice-heading">回家後的簡訊・第 {springSmsRound + 1}/5 輪</div>
                                  {currentSpringSmsRounds[springSmsRound]?.choices.map((choice, index) => (
                                    <button className="reply-choice" key={index} onClick={() => chooseSpringSmsReply(index)}>
                                      <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
                                    </button>
                                  ))}
                                  <small>每一輪都由你親自回覆，對話會依照今天的真實經歷延續。</small>
                                </div>
                              )}
                              {storyStage === 'spring-sms-chat' && springSmsTarget && selectedSmsThread === springSmsTarget && springSmsReplied && (
                                <div className="sms-thread-actions">
                                  <div className="reply-note">聊到這裡，今天的訊息也該收好了。</div>
                                  <button className="story-primary-button" onClick={startSpringDiary}>收起手機，寫下今天的日記 <ChevronRight size={15} /></button>
                                </div>
                              )}
                              {storyStage === 'year-end-shopping-chat' && yearEndInviteTarget && selectedSmsThread === yearEndInviteTarget && yearEndShoppingReplyChoice !== null && (
                                <div className="sms-thread-actions">
                                  <div className="reply-note">{yearEndShoppingReplyChoices[yearEndInviteTarget][yearEndShoppingReplyChoice].accepted ? '你答應了邀約。收起手機，準備出門買年貨吧。' : '你婉拒了邀約。他表示沒關係，晚上還是會一起跨年。'}</div>
                                  <button className="story-primary-button" onClick={continueYearEndShoppingInvite}>{yearEndShoppingReplyChoices[yearEndInviteTarget][yearEndShoppingReplyChoice].accepted ? '收起手機，去買年貨' : '收起手機，準備晚上集合'} <ChevronRight size={15} /></button>
                                </div>
                              )}
                              {storyStage === 'year-end-new-year-chat' && yearEndGreetingTarget && selectedSmsThread === yearEndGreetingTarget && yearEndFirstReplySent && (
                                <div className="sms-thread-actions">
                                  <div className="reply-note">新年祝福已經回覆。要不要趁著還沒睡，再多聊幾句？</div>
                                  <button className="story-primary-button secondary-chat-action" onClick={continueYearEndGreetingChat}>再聊五輪 <ChevronRight size={15} /></button>
                                  <button className="story-primary-button" onClick={finishYearEndGreetingWithoutChat}>{yearEndChatMode === 'incoming' ? '先到這裡，回覆下一則祝福' : '先到這裡，看看還有誰'} <ChevronRight size={15} /></button>
                                </div>
                              )}
                              {storyStage === 'year-end-free-chat' && yearEndGreetingTarget && selectedSmsThread === yearEndGreetingTarget && yearEndFreeChatReplied && yearEndFreeChatRound === 4 && (
                                <div className="sms-thread-actions">
                                  <div className="reply-note">五輪對話已經聊完。這段新年聊天會保留在訊息紀錄裡。</div>
                                  <button className="story-primary-button" onClick={finishYearEndFreeChat}>{yearEndChatMode === 'incoming' ? '收起手機，看看下一則祝福' : '收起手機，回到自由活動'} <ChevronRight size={15} /></button>
                                </div>
                              )}

                              {storyStage === 'year-end-shopping-chat' && yearEndInviteTarget && selectedSmsThread === yearEndInviteTarget && yearEndShoppingReplyChoice === null && (
                                <div className="choice-area">
                                  <div className="choice-heading">你想怎麼回覆{characterNames[yearEndInviteTarget]}？</div>
                                  {yearEndShoppingReplyChoices[yearEndInviteTarget].map((choice, index) => (
                                    <button className="reply-choice" key={index} onClick={() => chooseYearEndShoppingReply(index)}>
                                      <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
                                    </button>
                                  ))}
                                  <small>接受就一起去買年貨；婉拒也不影響晚上的跨年主線。</small>
                                </div>
                              )}
                              {storyStage === 'year-end-new-year-chat' && yearEndGreetingTarget && selectedSmsThread === yearEndGreetingTarget && !yearEndFirstReplySent && (
                                <div className="choice-area">
                                  <div className="choice-heading">{yearEndChatMode === 'incoming' ? '回覆' + characterNames[yearEndGreetingTarget] + '的新年祝福' : '先傳一句新年快樂給' + characterNames[yearEndGreetingTarget]}</div>
                                  {(yearEndChatMode === 'incoming'
                                    ? yearEndNewYearReplies[yearEndGreetingTarget as YearEndRouteCharacterId]
                                    : yearEndProactiveOpeners[yearEndGreetingTarget]
                                  ).map((choice, index) => (
                                    <button className="reply-choice" key={index} onClick={() => yearEndChatMode === 'incoming' ? chooseYearEndIncomingGreetingReply(index) : chooseYearEndProactiveGreeting(index)}>
                                      <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
                                    </button>
                                  ))}
                                  <small>{yearEndChatMode === 'incoming' ? '這則新年祝福需要先回覆；回覆後再決定要不要繼續聊。' : '由你主動傳送新年祝福，對方會依照你選的說法回覆。'}</small>
                                </div>
                              )}
                              {storyStage === 'year-end-free-chat' && yearEndGreetingTarget && selectedSmsThread === yearEndGreetingTarget && !yearEndFreeChatReplied && (
                                <div className="choice-area">
                                  <div className="choice-heading">新年自由對話・第 {yearEndFreeChatRound + 1}/5 輪</div>
                                  {yearEndFreeChatScripts[yearEndGreetingTarget][yearEndFreeChatRound].choices.map((choice, index) => (
                                    <button className="reply-choice" key={index} onClick={() => chooseYearEndFreeChatReply(index)}>
                                      <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={15} />
                                    </button>
                                  ))}
                                  <small>每輪三個回覆選項；繼續聊天會完成五輪，不想聊也可以在祝福後直接停下來。</small>
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
                                  <span className="profile-eyebrow">PRIVATE JOURNAL · 1996—1997</span>
                                  <strong>寫下來的日子</strong>
                                  <small>點選日期，可以重新讀一遍當時的心情。</small>
                                </div>
                                {septemberDiaryUnlocked && septemberDiaryData && (
                                  <button className="diary-entry-row" onClick={() => setSelectedDiaryDate('1997-09-06')}>
                                    <span className="diary-entry-date">06<br/><small>SEP</small></span>
                                    <span className="diary-entry-copy"><strong>{septemberDiaryData.title}</strong><small>{septemberDiaryData.text.slice(0, 48)}…</small></span>
                                    <ChevronRight size={16} />
                                  </button>
                                )}
                                {augustDiaryUnlocked && augustDiaryData && (
                                  <button className="diary-entry-row" onClick={() => setSelectedDiaryDate('1997-08-01')}>
                                    <span className="diary-entry-date">01<br/><small>AUG</small></span>
                                    <span className="diary-entry-copy"><strong>{augustDiaryData.title}</strong><small>{augustDiaryData.text.slice(0, 48)}…</small></span>
                                    <ChevronRight size={16} />
                                  </button>
                                )}
                                {juneDiaryUnlocked && juneDiaryData && (
                                  <button className="diary-entry-row" onClick={() => setSelectedDiaryDate('1997-06-15')}>
                                    <span className="diary-entry-date">15<br/><small>JUN</small></span>
                                    <span className="diary-entry-copy"><strong>{juneDiaryData.title}</strong><small>{juneDiaryData.text.slice(0, 48)}…</small></span>
                                    <ChevronRight size={16} />
                                  </button>
                                )}
                                {may10DiaryUnlocked && may10DiaryData && (
                                  <button className="diary-entry-row" onClick={() => setSelectedDiaryDate('1997-05-10')}>
                                    <span className="diary-entry-date">10<br/><small>MAY</small></span>
                                    <span className="diary-entry-copy"><strong>{may10DiaryData.title}</strong><small>{may10DiaryData.text.slice(0, 48)}…</small></span>
                                    <ChevronRight size={16} />
                                  </button>
                                )}
                                {april30DiaryUnlocked && april30DiaryData && (
                                  <button className="diary-entry-row" onClick={() => setSelectedDiaryDate('1997-04-30')}>
                                    <span className="diary-entry-date">30<br/><small>APR</small></span>
                                    <span className="diary-entry-copy"><strong>{april30DiaryData.title}</strong><small>{april30DiaryData.text.slice(0, 48)}…</small></span>
                                    <ChevronRight size={16} />
                                  </button>
                                )}
                                {april20DiaryUnlocked && april20DiaryData && (
                                  <button className="diary-entry-row" onClick={() => setSelectedDiaryDate('1997-04-20')}>
                                    <span className="diary-entry-date">20<br/><small>APR</small></span>
                                    <span className="diary-entry-copy"><strong>{april20DiaryData.title}</strong><small>{april20DiaryData.text.slice(0, 48)}…</small></span>
                                    <ChevronRight size={16} />
                                  </button>
                                )}
                                {april12DiaryUnlocked && april12DiaryData && (
                                  <button className="diary-entry-row" onClick={() => setSelectedDiaryDate('1997-04-12')}>
                                    <span className="diary-entry-date">12<br/><small>APR</small></span>
                                    <span className="diary-entry-copy"><strong>{april12DiaryData.title}</strong><small>{april12DiaryData.text.slice(0, 48)}…</small></span>
                                    <ChevronRight size={16} />
                                  </button>
                                )}
                                {march29DiaryUnlocked && march29DiaryData && (
                                  <button className="diary-entry-row" onClick={() => setSelectedDiaryDate('1997-03-29')}>
                                    <span className="diary-entry-date">29<br/><small>MAR</small></span>
                                    <span className="diary-entry-copy"><strong>{march29DiaryData.title}</strong><small>{march29DiaryData.text.slice(0, 48)}…</small></span>
                                    <ChevronRight size={16} />
                                  </button>
                                )}
                                {march28DiaryUnlocked && march28DiaryData && (
                                  <button className="diary-entry-row" onClick={() => setSelectedDiaryDate('1997-03-28')}>
                                    <span className="diary-entry-date">28<br/><small>MAR</small></span>
                                    <span className="diary-entry-copy"><strong>{march28DiaryData.title}</strong><small>{march28DiaryData.text.slice(0, 48)}…</small></span>
                                    <ChevronRight size={16} />
                                  </button>
                                )}
                                {springDiaryUnlocked && springDiaryData && (
                                  <button className="diary-entry-row" onClick={() => setSelectedDiaryDate('1997-02-17')}>
                                    <span className="diary-entry-date">17<br/><small>FEB</small></span>
                                    <span className="diary-entry-copy"><strong>{springDiaryData.title}</strong><small>{springDiaryData.text.slice(0, 48)}…</small></span>
                                    <ChevronRight size={16} />
                                  </button>
                                )}
                                {februaryDiaryUnlocked && februaryDiaryData && (
                                  <button className="diary-entry-row" onClick={() => setSelectedDiaryDate('1997-02-03')}>
                                    <span className="diary-entry-date">03<br/><small>FEB</small></span>
                                    <span className="diary-entry-copy"><strong>{februaryDiaryData.title}</strong><small>{februaryDiaryData.text.slice(0, 48)}…</small></span>
                                    <ChevronRight size={16} />
                                  </button>
                                )}
                                {winterDiaryUnlocked && winterDiaryData && (
                                  <button className="diary-entry-row" onClick={() => setSelectedDiaryDate('1997-01-22')}>
                                    <span className="diary-entry-date">22<br/><small>JAN</small></span>
                                    <span className="diary-entry-copy"><strong>{winterDiaryData.title}</strong><small>{winterDiaryData.sections[2]?.text.slice(0, 44)}…</small></span>
                                    <ChevronRight size={16} />
                                  </button>
                                )}
                                {yearEndDiaryUnlocked && yearEndDiaryData && (
                                  <button className="diary-entry-row" onClick={() => setSelectedDiaryDate('1996-12-31')}>
                                    <span className="diary-entry-date">31<br/><small>DEC</small></span>
                                    <span className="diary-entry-copy"><strong>{yearEndDiaryData.title}</strong><small>{yearEndDiaryData.sections[2]?.text.slice(0, 44)}…</small></span>
                                    <ChevronRight size={16} />
                                  </button>
                                )}
                                {nextMonthDiaryUnlocked && nextMonthDiaryData && (
                                  <button className="diary-entry-row" onClick={() => setSelectedDiaryDate('1996-12-14')}>
                                    <span className="diary-entry-date">14<br/><small>DEC</small></span>
                                    <span className="diary-entry-copy"><strong>{nextMonthDiaryData.title}</strong><small>{nextMonthDiaryData.eventSummary.slice(0, 44)}…</small></span>
                                    <ChevronRight size={16} />
                                  </button>
                                )}
                                {monthDiaryUnlocked && monthVisitTarget && (
                                  <button className="diary-entry-row" onClick={() => setSelectedDiaryDate('1996-11-16')}>
                                    <span className="diary-entry-date">16<br/><small>NOV</small></span>
                                    <span className="diary-entry-copy"><strong>{monthDiaryEntries[monthVisitTarget].title}</strong><small>白天和{characterNames[monthVisitTarget]}見面，晚上找{characterNames[monthFreeChatTarget ?? monthVisitTarget]}聊了好一會兒。</small></span>
                                    <ChevronRight size={16} />
                                  </button>
                                )}
                                {day2DiaryUnlocked && (
                                  <button className="diary-entry-row" onClick={() => setSelectedDiaryDate('1996-10-16')}>
                                    <span className="diary-entry-date">16<br/><small>OCT</small></span>
                                    <span className="diary-entry-copy"><strong>本來只是想吃冰，結果行程一直加長。</strong><small>遇見阿信，還跟溫尚翊多逛了一段路。</small></span>
                                    <ChevronRight size={16} />
                                  </button>
                                )}
                                <button className="diary-entry-row" onClick={() => setSelectedDiaryDate('1996-10-15')}>
                                  <span className="diary-entry-date">15<br/><small>OCT</small></span>
                                  <span className="diary-entry-copy"><strong>我真的沒想到會在這裡遇到他！</strong><small>在練團室，重新遇見小時候的朋友。</small></span>
                                  <ChevronRight size={16} />
                                </button>
                              </>
                            ) : (
                              <>
                                <button className="diary-detail-back" onClick={() => setSelectedDiaryDate(null)}><ArrowLeft size={13}/> 返回日記列表</button>
                                {selectedDiaryDate === '1997-09-06' && septemberDiaryUnlocked && septemberDiaryData ? (
                                  <>
                                    <div className="diary-paper">
                                      <span className="diary-date">1997 年 9 月 6 日・星期六</span>
                                      <h2>{septemberDiaryData.title}</h2>
                                      <div className="diary-section-label">綠島三日小旅行</div>
                                      <SeptemberPhotoCard caption={septemberDiaryData.photoCaption} />
                                      <DiarySection label="日記" text={septemberDiaryData.text} />
                                    </div>
                                  </>
                                ) : selectedDiaryDate === '1997-08-01' && augustDiaryUnlocked && augustDiaryData ? (
                                  <>
                                    <div className="diary-paper">
                                      <span className="diary-date">1997 年 8 月 1 日・星期五</span>
                                      <h2>{augustDiaryData.title}</h2>
                                      <div className="diary-section-label">星期五 · 便利店與下班後</div>
                                      <DiarySection label="日記" text={augustDiaryData.text} />
                                    </div>
                                    {localStorage.getItem('mayday-september-started') !== 'true' && (
                                      <div className="story-action-bar story-inline-action">
                                        <button className="story-primary-button" onClick={startSeptemberIntro}>
                                          繼續到九月・新學期 <ChevronRight size={15} />
                                        </button>
                                      </div>
                                    )}
                                  </>
                                ) : selectedDiaryDate === '1997-06-15' && juneDiaryUnlocked && juneDiaryData ? (
                                  <>
                                    <div className="diary-paper">
                                      <span className="diary-date">1997 年 6 月 15 日・星期日</span>
                                      <h2>{juneDiaryData.title}</h2>
                                      <div className="diary-section-label">星期日 · 期末複習與晚間簡訊</div>
                                      <DiarySection label="日記" text={juneDiaryData.text} />
                                    </div>
                                    {localStorage.getItem('mayday-july-lost-key-day-complete') !== 'true' && (
                                      <div className="story-action-bar story-inline-action">
                                        <button className="story-primary-button" onClick={startJulyLostKeyStory}>
                                          繼續到七月・暑假篇 <ChevronRight size={15} />
                                        </button>
                                      </div>
                                    )}
                                  </>
                                ) : selectedDiaryDate === '1997-05-10' && may10DiaryUnlocked && may10DiaryData ? (
                                  <>
                                    <div className="diary-paper">
                                      <span className="diary-date">1997 年 5 月 10 日・星期六</span>
                                      <h2>{may10DiaryData.title}</h2>
                                      <div className="diary-section-label">星期六 · 練團室</div>
                                      <DiarySection label="日記" text={may10DiaryData.text} />
                                    </div>
                                    {localStorage.getItem('mayday-june-study-day-complete') !== 'true' && (
                                      <div className="story-action-bar story-inline-action">
                                        <button className="story-primary-button" onClick={startJuneStudyStory}>
                                          繼續到六月中旬・期末複習 <ChevronRight size={15} />
                                        </button>
                                      </div>
                                    )}
                                  </>
                                ) : selectedDiaryDate === '1997-04-30' && april30DiaryUnlocked && april30DiaryData ? (
                                  <>
                                    <div className="diary-paper">
                                      <span className="diary-date">1997 年 4 月 30 日・星期三</span>
                                      <h2>{april30DiaryData.title}</h2>
                                      <div className="diary-section-label">星期三 · 校園</div>
                                      <DiarySection label="日記" text={april30DiaryData.text} />
                                    </div>
                                    {localStorage.getItem('mayday-may10-day-complete') !== 'true' && (
                                      <div className="story-action-bar story-inline-action">
                                        <button className="story-primary-button" onClick={startMay10Story}>
                                          繼續到 5 月 10 日 <ChevronRight size={15} />
                                        </button>
                                      </div>
                                    )}
                                  </>
                                ) : selectedDiaryDate === '1997-04-20' && april20DiaryUnlocked && april20DiaryData ? (
                                  <>
                                    <div className="diary-paper">
                                      <span className="diary-date">1997 年 4 月 20 日・星期日</span>
                                      <h2>{april20DiaryData.title}</h2>
                                      <div className="diary-section-label">{localStorage.getItem('mayday-april20-route') === 'park' ? '星期日 · 公園' : '星期日 · 練團室'}</div>
                                      <DiarySection label="日記" text={april20DiaryData.text} />
                                    </div>
                                    {localStorage.getItem('mayday-april30-day-complete') !== 'true' && (
                                      <div className="story-action-bar story-inline-action">
                                        <button className="story-primary-button" onClick={startApril30Story}>
                                          繼續到 4 月 30 日 <ChevronRight size={15} />
                                        </button>
                                      </div>
                                    )}
                                  </>
                                ) : selectedDiaryDate === '1997-04-12' && april12DiaryUnlocked && april12DiaryData ? (
                                  <>
                                    <div className="diary-paper">
                                      <span className="diary-date">1997 年 4 月 12 日・星期六</span>
                                      <h2>{april12DiaryData.title}</h2>
                                      <div className="diary-section-label">星期六 · 練團室</div>
                                      <DiarySection label="日記" text={april12DiaryData.text} />
                                    </div>
                                    {localStorage.getItem('mayday-april20-day-complete') !== 'true' && (
                                      <div className="story-action-bar story-inline-action">
                                        <button className="story-primary-button" onClick={startApril20Story}>
                                          繼續到 4 月 20 日 <ChevronRight size={15} />
                                        </button>
                                      </div>
                                    )}
                                  </>
                                ) : selectedDiaryDate === '1997-03-29' && march29DiaryUnlocked && march29DiaryData ? (
                                  <>
                                    <div className="diary-paper">
                                      <span className="diary-date">1997 年 3 月 29 日</span>
                                      <h2>{march29DiaryData.title}</h2>
                                      <div className="diary-section-label">星期六 · 大安森林公園</div>
                                      <DiarySection label="日記" text={march29DiaryData.text} />
                                    </div>
                                    {!april12DiaryUnlocked && (
                                      <div className="story-action-bar story-inline-action">
                                        <button className="story-primary-button" onClick={startApril12Story}>
                                          繼續到 4 月 12 日 <ChevronRight size={15} />
                                        </button>
                                      </div>
                                    )}
                                  </>
                                ) : selectedDiaryDate === '1997-03-28' && march28DiaryUnlocked && march28DiaryData ? (
                                  <div className="diary-paper">
                                    <span className="diary-date">1997 年 3 月 28 日・星期五</span>
                                    <h2>{march28DiaryData.title}</h2>
                                    <DiarySection label="日記" text={march28DiaryData.text} />
                                  </div>
                                ) : selectedDiaryDate === '1997-02-17' && springDiaryUnlocked && springDiaryData ? (
                                  <div className="diary-paper">
                                    <span className="diary-date">1997 年 2 月 17 日</span>
                                    <h2>{springDiaryData.title}</h2>
                                    <DiarySection label="日記" text={springDiaryData.text} />
                                  </div>
                                ) : selectedDiaryDate === '1997-02-03' && februaryDiaryUnlocked && februaryDiaryData ? (
                                  <div className="diary-paper">
                                    <span className="diary-date">1997 年 2 月初</span>
                                    <h2>{februaryDiaryData.title}</h2>
                                    <DiarySection label="日記" text={februaryDiaryData.text} />
                                  </div>
                                ) : selectedDiaryDate === '1997-01-22' && winterDiaryUnlocked && winterDiaryData ? (
                                  <div className="diary-paper">
                                    <span className="diary-date">1997 年 1 月 22 日・星期三</span>
                                    <h2>{winterDiaryData.title}</h2>
                                    {winterDiaryData.sections.map((section) => (
                                      <DiarySection key={section.label} label={section.label} text={section.text} />
                                    ))}
                                  </div>
                                ) : selectedDiaryDate === '1996-12-31' && yearEndDiaryUnlocked && yearEndDiaryData ? (
                                  <div className="diary-paper">
                                    <span className="diary-date">1996 年 12 月 31 日・星期二</span>
                                    <h2>{yearEndDiaryData.title}</h2>
                                    {yearEndDiaryData.sections.map((section) => (
                                      <DiarySection key={section.label} label={section.label} text={section.text} />
                                    ))}
                                  </div>
                                ) : selectedDiaryDate === '1996-12-14' && nextMonthDiaryUnlocked && nextMonthDiaryData ? (
                                  <div className="diary-paper">
                                    <span className="diary-date">1996 年 12 月 14 日・星期六</span>
                                    <h2>{nextMonthDiaryData.title}</h2>
                                    <section className="diary-section">
                                      <div className="diary-section-label">DAYTIME · 白天記事</div>
                                      {splitDiaryParagraphs(nextMonthDiaryData.eventSummary).map((paragraph, index) => (
                                        <p key={`event-${index}`}>{paragraph}</p>
                                      ))}
                                    </section>
                                    <section className="diary-section">
                                      <div className="diary-section-label">NIGHT · 晚上聊天</div>
                                      {splitDiaryParagraphs(nextMonthDiaryData.chatSummary).map((paragraph, index) => (
                                        <p key={`chat-${index}`}>{paragraph}</p>
                                      ))}
                                    </section>
                                    <section className="diary-section">
                                      <div className="diary-section-label">BEFORE SLEEP · 睡前補記</div>
                                      {splitDiaryParagraphs(nextMonthDiaryData.ending).map((paragraph, index) => (
                                        <p key={`ending-${index}`}>{paragraph}</p>
                                      ))}
                                    </section>
                                  </div>
                                ) : selectedDiaryDate === '1996-11-16' && monthDiaryUnlocked && monthVisitTarget ? (
                                  <div className="diary-paper">
                                    <span className="diary-date">1996 年 11 月 16 日・星期六</span>
                                    <h2>{monthDiaryEntries[monthVisitTarget].title}</h2>
                                    <DiarySection label="DAYTIME · 白天記事" text={monthDiaryEntries[monthVisitTarget].visit} />
                                    <DiarySection label="NIGHT · 晚上聊天" text={getMonthFreeChatDiaryText(monthFreeChatTarget ?? monthVisitTarget)} />
                                    <DiarySection label="BEFORE SLEEP · 睡前補記" text={monthDiaryEntries[monthVisitTarget].ending} />
                                  </div>
                                ) : selectedDiaryDate === '1996-10-16' && day2DiaryUnlocked ? (
                                  <div className="diary-paper">
                                    <span className="diary-date">1996 年 10 月 16 日・星期三</span>
                                    <h2>本來只是想吃冰，結果行程一直加長。</h2>
                                    <DiarySection label="TODAY · 今天記事" text={[
                                      '下課後跟著溫尚翊去吃冰，沒想到路上又遇到阿信。後來三個人一起逛唱片行，阿信一講起音樂就停不下來，連哪張唱片適合從哪一首開始聽都介紹得清清楚楚。我本來只是想買碗冰，最後卻站在唱片架前聽了半天，差點忘記時間。',
                                      day2StrollAccepted
                                        ? '阿信走後，溫尚翊問我要不要再逛一下。我明明心裡想著今天已經走很多路了，嘴巴卻很快就答應。最後跟著他去了附近的小書店，在裡面磨蹭了好一會兒。'
                                        : '阿信走後，溫尚翊問我要不要再逛一下。我想了想，還是說今天差不多了，想先回家。他沒有勉強我，陪我慢慢走回去，到了門口還提醒我早點休息。',
                                      day2StrollAccepted
                                        ? '我們聊的都是些很普通的事，可是跟他一起走路，好像連沒有目的地也不會覺得無聊。他有時候真的很會惹人嫌，偏偏又會在回家時一路陪著我，站在門口等我進去才離開。這種人到底要怎麼辦啦。'
                                        : '明明只是很平常的一段路，卻因為有人陪著走，好像也沒有那麼想趕快到家。',
                                      '今天走得比平常久，腳有點酸，心情倒是很好。阿信聊的那些歌還在腦袋裡轉，溫尚翊說話的樣子也一直跑出來。到底是去吃冰，還是順便收集回憶的啊？',
                                    ].join('\n\n')} />
                                  </div>
                                ) : (
                                  <div className="diary-paper">
                                    <span className="diary-date">1996 年 10 月 15 日・星期二</span>
                                    <h2>我真的沒想到會在這裡遇到他！</h2>
                                    <DiarySection label="TODAY · 今天記事" text={[
                                      '今天跟著溫尚翊去練團室，本來只是想看看他們平常練團的地方，誰知道一進去就碰到瑪莎。我第一眼還有點不敢認，畢竟小時候搬家後就再也沒見過了，明明名字一直記得，卻不知道他現在變成什麼樣子。',
                                      '搬家前他把地址寫給我，說以後一定要聯絡。結果那場雨把紙上的字沖得模模糊糊，我後來還是留了很久，偶爾拿出來看，想說到底還找不找得到。',
                                      '結果今天居然就這樣遇到本人。也太扯了吧！本來有好多話想問，真的見到人反而不知道從哪一句開始，最後只顧著發愣。',
                                      '更讓我意外的是，他居然跟溫尚翊認識。這兩個人到底是怎麼湊在一起的？我現在腦袋還有點亂，明天一定要找機會問清楚。',
                                      '明明只是去看一下練團室，結果回家後一直在想今天的事。這種事情也太像電影了吧，拜託不要是我自己想太多。',
                                    ].join('\n\n')} />
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
                            <small>每份存檔都會保留當時的劇情、訊息紀錄與人物好感度。新增存檔後會自動出現下一格，不設固定數量上限。</small>
                          </div>
                          <div className="save-slot-list">
                            {[...Object.keys(saveSlots).map(Number), getNextSaveSlotId(saveSlots)].sort((a, b) => a - b).map((slot) => {
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
                            {saveFeedback || '自動保存仍會持續運作；手動存檔可以保留不同時間點。實際可保存數量取決於瀏覽器本機空間。'}
                          </div>
                          <div className="save-center-timeline">
                            <div className="save-center-timeline-heading">
                              <strong>時間回溯</strong>
                              <small>選擇曾經開始過的日期，回到當天第一幕。回退後，後續自動時間線會重新建立；手動存檔不受影響。</small>
                            </div>
                            {daySnapshotLoading ? (
                              <div className="day-snapshot-empty">正在整理可以回去的日期……</div>
                            ) : daySnapshots.length ? (
                              <div className="day-snapshot-list">
                                {[...daySnapshots].sort((left, right) => right.date.localeCompare(left.date)).map((record) => (
                                  <section className="day-snapshot-card" key={record.date}>
                                    <div className="day-snapshot-details">
                                      <strong>{record.date}</strong>
                                      <small>{record.snapshot.stageLabel} · 當日開場</small>
                                    </div>
                                    <button className="day-snapshot-action" onClick={() => { void rollbackToDayStart(record.date) }}>回到這一天</button>
                                  </section>
                                ))}
                              </div>
                            ) : (
                              <div className="day-snapshot-empty">
                                {daySnapshotError || '目前還沒有可回溯的日初紀錄。從新的故事日期開始，系統會自動保存當天開頭。'}
                              </div>
                            )}
                          </div>
                          <div className="save-center-timeline auto-step-timeline">
                            <div className="save-center-timeline-heading">
                              <strong>自動記錄的每一步</strong>
                              <small>每次劇情推進、選擇與訊息變化都會自動留下完整進度，不需要先手動存檔。回到某一步時，此前的故事和選項會完整保留。</small>
                            </div>
                            {autoStepSnapshotLoading ? (
                              <div className="day-snapshot-empty">正在整理自動記錄……</div>
                            ) : autoStepSnapshots.length ? (
                              <div className="auto-step-list">
                                {[...autoStepSnapshots].sort((left, right) => right.timestamp - left.timestamp).map((record) => (
                                  <section className="day-snapshot-card auto-step-card" key={record.id}>
                                    <div className="day-snapshot-details">
                                      <strong>{record.date} · {record.time}</strong>
                                      <small>{record.stageLabel}</small>
                                    </div>
                                    <button className="day-snapshot-action" onClick={() => { void rollbackToAutoStep(record.id) }}>回到這一步</button>
                                  </section>
                                ))}
                              </div>
                            ) : (
                              <div className="day-snapshot-empty">
                                {autoStepSnapshotError || '開始遊玩後，系統就會自動記錄每一步，不需要手動存檔。'}
                              </div>
                            )}
                            {autoStepSnapshotError && autoStepSnapshots.length > 0 && (
                              <small className="auto-step-warning">{autoStepSnapshotError}</small>
                            )}
                          </div>
                          <div className="save-center-reset">
                            <button className="save-reset-action" onClick={() => setShowResetConfirm(true)}>清除全部紀錄，重新開始</button>
                            <small>會刪除這台瀏覽器中的所有遊戲存檔與進度，且無法復原。</small>
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
                            <span>{stripCornerQuotes(choice.text)}</span><ChevronRight size={14}/>
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
            <p>這會清除這台瀏覽器中的全部遊戲紀錄，包括所有手動存檔、自動進度、聊天訊息、日記、人物好感度和玩家姓名，並讓你從一九九六年的開場重新開始。此操作無法復原。</p>
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
