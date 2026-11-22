import { useEffect, useState } from 'react'
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
  NotebookPen,
  Phone,
  Radio,
  Settings,
  Signal,
  Smartphone,
  X,
} from 'lucide-react'

type AppKey = 'messages' | 'contacts' | 'calls' | 'diary' | 'calendar' | 'photos' | 'music' | 'notes' | 'settings'

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
  { id: 'notes', name: '記事本', subtitle: '隨手記下來', icon: NotebookPen },
]

const appCopy: Record<AppKey, { heading: string; body: string; detail: string }> = {
  messages: {
    heading: '訊息收件匣',
    body: '目前還沒有新的訊息。',
    detail: '等認識更多人之後，收到的簡訊會出現在這裡。別忘了偶爾看一下手機。',
  },
  contacts: {
    heading: '通訊錄',
    body: '通訊錄目前是空的。',
    detail: '新的名字會隨著故事慢慢出現。每個人都有自己的生活，不一定隨時有空接電話。',
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
    body: '1999 年 10 月',
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
    heading: '記事本',
    body: '沒有待辦事項。',
    detail: '記下課堂、地址、電話，還有那些怕自己忘記的小事。',
  },
  settings: {
    heading: '設定',
    body: '手機設定',
    detail: '可以修改顯示名稱，或重設這台手機上的本機遊戲資料。',
  },
}

function App() {
  const [playerName, setPlayerName] = useState(() => localStorage.getItem('mayday-player-name') ?? '')
  const [nameDraft, setNameDraft] = useState('')
  const [activeApp, setActiveApp] = useState<AppKey | null>(null)
  const [showNameSetup, setShowNameSetup] = useState(() => !localStorage.getItem('mayday-player-name'))
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [currentTime, setCurrentTime] = useState('16:28')

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false }))
    }
    updateClock()
    const timer = window.setInterval(updateClock, 30_000)
    return () => window.clearInterval(timer)
  }, [])

  const saveName = () => {
    const trimmed = nameDraft.trim()
    if (!trimmed) return
    localStorage.setItem('mayday-player-name', trimmed)
    setPlayerName(trimmed)
    setShowNameSetup(false)
  }

  const resetLocalData = () => {
    localStorage.removeItem('mayday-player-name')
    setPlayerName('')
    setNameDraft('')
    setActiveApp(null)
    setShowResetConfirm(false)
    setShowNameSetup(true)
  }

  const activeCopy = activeApp ? appCopy[activeApp] : null
  const ActiveIcon = activeApp ? (phoneApps.find((app) => app.id === activeApp)?.icon ?? Settings) : null

  return (
    <main className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="page-heading">
        <div className="project-mark"><Heart size={14} fill="currentColor" /> A LITTLE STORY IN 1999</div>
        <h1>那年夏天，還有未讀訊息</h1>
        <p>五月天同人戀愛互動遊戲 · 第一階段測試版</p>
      </header>

      <section className="device-wrap" aria-label="手機模擬器">
        <div className="phone">
          <div className="phone-top">
            <span className="brand-word">M<span>·</span>1999</span>
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
                  <span>FRIDAY</span>
                  <strong>10<span>.</span>15</strong>
                  <small>1999 · 台北</small>
                </div>
                <div className="screen-greeting">
                  <span>嗨，{playerName || '新朋友'}</span>
                  <small>今天也要好好生活。</small>
                </div>
              </div>

              <div className="menu-title">
                <span>MENU</span>
                <span>主選單</span>
              </div>

              <div className="app-grid">
                {phoneApps.map((app, index) => {
                  const Icon = app.icon
                  return (
                    <button className="app-tile" key={app.id} onClick={() => setActiveApp(app.id)} aria-label={app.name}>
                      <span className={`app-icon icon-tone-${index % 4}`}><Icon size={21} strokeWidth={1.8} /></span>
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

              {activeApp && activeCopy && (
                <div className="app-overlay">
                  <div className="app-window">
                    <div className="app-window-head">
                      <button className="back-button" onClick={() => setActiveApp(null)} aria-label="返回主選單"><ArrowLeft size={17} /></button>
                      <div className="app-window-title">
                        {ActiveIcon && <ActiveIcon size={17} />}
                        <span>{activeCopy.heading}</span>
                      </div>
                      <button className="close-button" onClick={() => setActiveApp(null)} aria-label="關閉"><X size={17} /></button>
                    </div>
                    <div className="app-window-content">
                      {activeApp === 'settings' ? (
                        <>
                          <div className="settings-symbol"><Settings size={28} /></div>
                          <h2>{activeCopy.body}</h2>
                          <p>{activeCopy.detail}</p>
                          <label className="field-label" htmlFor="rename-player">你的名字</label>
                          <div className="rename-row">
                            <input id="rename-player" value={nameDraft || playerName} onChange={(event) => setNameDraft(event.target.value)} placeholder="輸入名字" maxLength={12} />
                            <button className="small-action" onClick={() => { if (!nameDraft.trim()) setNameDraft(playerName); else saveName() }}><Check size={15} /> 儲存</button>
                          </div>
                          <button className="danger-action" onClick={() => setShowResetConfirm(true)}>清除本機資料並重新開始</button>
                        </>
                      ) : (
                        <>
                          <div className="empty-symbol">
                            {ActiveIcon && <ActiveIcon size={29} />}
                          </div>
                          <h2>{activeCopy.body}</h2>
                          <p>{activeCopy.detail}</p>
                          <div className="coming-soon"><Radio size={15} /> 故事開始後逐步開放</div>
                        </>
                      )}
                    </div>
                    <div className="app-window-foot"><span>1999 / TAIPEI</span><span>BACK <ChevronRight size={11} /></span></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="phone-controls">
            <div className="soft-keys">
              <button onClick={() => setActiveApp(null)}>返回</button>
              <span className="control-light" />
              <button onClick={() => setActiveApp('contacts')}>選擇</button>
            </div>
            <div className="keypad">
              {['1','2','3','4','5','6','7','8','9','*','0','#'].map((key) => (
                <button key={key} className="key" aria-label={`按鍵 ${key}`}>
                  <strong>{key}</strong>
                  <small>{({ '2':'ABC', '3':'DEF', '4':'GHI', '5':'JKL', '6':'MNO', '7':'PQRS', '8':'TUV', '9':'WXYZ', '0':'+', '1':'', '*':'', '#':'' } as Record<string,string>)[key]}</small>
                </button>
              ))}
            </div>
            <div className="phone-bottom-label">TAIPEI · AUTUMN 1999</div>
          </div>
        </div>
      </section>

      <footer className="page-footer">
        <span><Clock3 size={13} /> 一九九九年，故事還沒開始。</span>
        <span>BUILD 0.1.0 · PREVIEW</span>
      </footer>

      {showNameSetup && (
        <div className="modal-backdrop">
          <div className="name-modal">
            <div className="modal-icon"><Smartphone size={25} /></div>
            <span className="eyebrow">WELCOME TO TAIPEI · 1999</span>
            <h2>先留下你的名字吧。</h2>
            <p>這支手機以後會記下你的訊息、日記，還有那些不想忘記的人。</p>
            <label htmlFor="player-name">你的名字</label>
            <input id="player-name" autoFocus value={nameDraft} onChange={(event) => setNameDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') saveName() }} placeholder="輸入名字（最多12字）" maxLength={12} />
            <button className="primary-action" onClick={saveName} disabled={!nameDraft.trim()}>好，開始吧 <ChevronRight size={16} /></button>
            <small>姓名之後仍可在手機設定中修改。</small>
          </div>
        </div>
      )}

      {showResetConfirm && (
        <div className="modal-backdrop">
          <div className="confirm-modal">
            <div className="modal-icon warning"><CircleHelp size={24} /></div>
            <h2>確定要重新開始嗎？</h2>
            <p>這會清除目前這台瀏覽器保存的玩家姓名。後續加入的劇情存檔也會使用同一個本機存檔區。</p>
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