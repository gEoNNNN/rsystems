import { useState, useRef, useEffect } from 'react'
import './ChatBot.css'

const API_BASE = 'https://rsistemschatbot-humming-meadowland-6553.fly.dev'

const BUSINESS_TYPES = [
  'Restaurant',
  'Cafenea',
  'Bar / Pub',
  'Fast-food',
  'Delivery / Takeaway',
  'Lanț de locații',
]

interface Message {
  id: number
  text: string
  sender: 'bot' | 'user'
  time: string
}

interface ResForm {
  date: string
  slot: string
  name: string
  phone: string
  email: string
  business_type: string
}

type View = 'chat' | 'reservation'
type ResStep = 'datetime' | 'details' | 'success'

const getTime = () =>
  new Date().toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })

const todayISO = () => new Date().toISOString().split('T')[0]

export default function ChatBot() {
  // ── chat state
  const [open, setOpen] = useState(false)
  const [view, setView] = useState<View>('chat')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [hasNotification, setHasNotification] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const greetedRef = useRef(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [showAttention, setShowAttention] = useState(false)

  // ── reservation state
  const [resStep, setResStep] = useState<ResStep>('datetime')
  const [resForm, setResForm] = useState<ResForm>({
    date: todayISO(),
    slot: '',
    name: '',
    phone: '',
    email: '',
    business_type: '',
  })
  const [slots, setSlots] = useState<string[]>([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [slotsError, setSlotsError] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [calYear, setCalYear] = useState<number>(new Date().getFullYear())
  const [calMonth, setCalMonth] = useState<number>(new Date().getMonth())
  const [conversationEnded, setConversationEnded] = useState(false)

  // ── attention wiggle after 4 s if chat never opened
  useEffect(() => {
    const t = setTimeout(() => setShowAttention(true), 4000)
    return () => clearTimeout(t)
  }, [])

  // ── open chat → greet once
  useEffect(() => {
    if (open && !greetedRef.current) {
      greetedRef.current = true
      setHasNotification(false)
      setShowAttention(false)
      fetchGreeting()
    } else if (open) {
      setHasNotification(false)
      setShowAttention(false)
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [open])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // ── fetch slots when date changes (reservation view)
  useEffect(() => {
    if (view !== 'reservation' || resStep !== 'datetime' || !resForm.date) return
    setSlotsLoading(true)
    setSlotsError('')
    setResForm((f) => ({ ...f, slot: '' }))
    fetch(`${API_BASE}/api/demo-reservation/slots?date=${resForm.date}`)
      .then((r) => r.json())
      .then((d) => setSlots(d.slots ?? []))
      .catch(() => setSlotsError('Nu s-au putut încărca intervalele. Încercați din nou.'))
      .finally(() => setSlotsLoading(false))
  }, [resForm.date, view, resStep])

  const addMessage = (text: string, sender: 'bot' | 'user') => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), text, sender, time: getTime() },
    ])
  }

  const fetchGreeting = async () => {
    setIsTyping(true)
    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'buna ziua' }),
      })
      const data = await res.json()
      if (data.conversation_id) setConversationId(data.conversation_id)
      addMessage(data.reply ?? 'Bun venit! Cu ce vă pot ajuta?', 'bot')
    } catch {
      addMessage('Bun venit! Cu ce vă pot ajuta?', 'bot')
    } finally {
      setIsTyping(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  const sendToApi = async (userMsg: string) => {
    setIsTyping(true)
    try {
      const body: Record<string, string> = { message: userMsg }
      if (conversationId) body.conversation_id = conversationId

      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        if (errData.error === 'unknown_conversation') {
          setConversationId(null)
          const retry = await fetch(`${API_BASE}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMsg }),
          })
          const retryData = await retry.json()
          if (retryData.conversation_id) setConversationId(retryData.conversation_id)
          addMessage(retryData.reply ?? 'A apărut o eroare. Vă rugăm să încercați din nou.', 'bot')
          return
        }
        addMessage('A apărut o eroare. Vă rugăm să încercați din nou.', 'bot')
        return
      }

      const data = await res.json()
      if (data.conversation_id) setConversationId(data.conversation_id)
      const reply = data.reply ?? 'A apărut o eroare. Vă rugăm să încercați din nou.'
      if (reply.includes('Această conversație s-a încheiat')) {
        setConversationEnded(true)
        addMessage('Operatorul a ieșit din cameră. Conversația s-a încheiat.', 'bot')
      } else {
        addMessage(reply, 'bot')
      }
    } catch {
      addMessage('Nu s-a putut stabili conexiunea. Verificați internetul și încercați din nou.', 'bot')
    } finally {
      setIsTyping(false)
    }
  }

  const handleSend = (text?: string) => {
    const msg = (text ?? input).trim()
    if (!msg || isTyping) return
    addMessage(msg, 'user')
    setInput('')
    sendToApi(msg)
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend()
  }

  const openReservation = () => {
    setResStep('datetime')
    setResForm({ date: todayISO(), slot: '', name: '', phone: '', email: '', business_type: '' })
    setSubmitError('')
    const now = new Date()
    setCalYear(now.getFullYear())
    setCalMonth(now.getMonth())
    setView('reservation')
  }

  const handleNewConversation = () => {
    setConversationEnded(false)
    setConversationId(null)
    setMessages([])
    greetedRef.current = false
    fetchGreeting()
  }

  const handleResSubmit = async () => {
    setSubmitError('')
    if (resForm.name.trim().length < 2) {
      setSubmitError('Numele trebuie să aibă cel puțin 2 caractere.')
      return
    }
    if (!/^(\+40|0)[0-9]{9}$/.test(resForm.phone.trim())) {
      setSubmitError('Numărul de telefon trebuie să fie în format românesc: 07xxxxxxxx sau +40xxxxxxxx.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resForm.email.trim())) {
      setSubmitError('Adresa de email nu este validă.')
      return
    }
    setSubmitLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/demo-reservation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: resForm.name,
          phone: resForm.phone,
          email: resForm.email,
          business_type: resForm.business_type,
          datetime: resForm.slot,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setSubmitError(data.message ?? 'A apărut o eroare. Verificați datele și încercați din nou.')
        return
      }
      setResStep('success')
    } catch {
      setSubmitError('Nu s-a putut stabili conexiunea. Verificați internetul și încercați din nou.')
    } finally {
      setSubmitLoading(false)
    }
  }

  const formatSlot = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })
  }

  const renderCalendar = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const selectedDate = resForm.date ? new Date(resForm.date + 'T00:00:00') : null
    const monthNames = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie']
    const dayHeaders = ['Lu','Ma','Mi','Jo','Vi','Sâ','Du']
    const firstDay = new Date(calYear, calMonth, 1)
    const lastDay = new Date(calYear, calMonth + 1, 0)
    const startOffset = (firstDay.getDay() + 6) % 7
    const cells: (number | null)[] = []
    for (let i = 0; i < startOffset; i++) cells.push(null)
    for (let d = 1; d <= lastDay.getDate(); d++) cells.push(d)
    while (cells.length % 7 !== 0) cells.push(null)
    const canGoPrev = !(calYear === today.getFullYear() && calMonth <= today.getMonth())
    const selectDay = (day: number) => {
      const mm = String(calMonth + 1).padStart(2, '0')
      const dd = String(day).padStart(2, '0')
      setResForm((f) => ({ ...f, date: `${calYear}-${mm}-${dd}`, slot: '' }))
    }
    return (
      <div className="chatbot-cal">
        <div className="chatbot-cal-nav">
          <button
            className="chatbot-cal-arrow"
            onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1) } else setCalMonth(m => m - 1) }}
            disabled={!canGoPrev}
            aria-label="Luna anterioară"
          >‹</button>
          <span className="chatbot-cal-title">{monthNames[calMonth]} {calYear}</span>
          <button
            className="chatbot-cal-arrow"
            onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1) } else setCalMonth(m => m + 1) }}
            aria-label="Luna următoare"
          >›</button>
        </div>
        <div className="chatbot-cal-grid">
          {dayHeaders.map(h => <div key={h} className="chatbot-cal-dayname">{h}</div>)}
          {cells.map((day, i) => {
            if (!day) return <div key={`e-${i}`} className="chatbot-cal-cell chatbot-cal-cell--empty" />
            const date = new Date(calYear, calMonth, day)
            const isWeekend = date.getDay() === 0 || date.getDay() === 6
            const isPast = date < today
            const isDisabled = isWeekend || isPast
            const isToday = date.getTime() === today.getTime()
            const isSelected = !!(selectedDate && date.getTime() === selectedDate.getTime())
            return (
              <button
                key={day}
                className={['chatbot-cal-cell', isDisabled ? 'chatbot-cal-cell--disabled' : '', isToday && !isSelected ? 'chatbot-cal-cell--today' : '', isSelected ? 'chatbot-cal-cell--selected' : ''].filter(Boolean).join(' ')}
                disabled={isDisabled}
                onClick={() => selectDay(day)}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // ── render reservation panel
  const renderReservation = () => (
    <div className="chatbot-res">
      <div className="chatbot-res-header">
        <button className="chatbot-res-back" onClick={() => setView('chat')} aria-label="Înapoi">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span>Programare demo showroom</span>
      </div>

      {resStep === 'datetime' && (
        <div className="chatbot-res-body chatbot-res-body--cal">
          {renderCalendar()}

          <div className="chatbot-res-slots-section">
            <span className="chatbot-res-slots-label">ORE DISPONIBILE</span>
            {slotsLoading && <p className="chatbot-res-hint">Se încarcă intervalele...</p>}
            {slotsError && <p className="chatbot-res-error">{slotsError}</p>}
            {!slotsLoading && !slotsError && slots.length === 0 && (
              <p className="chatbot-res-hint">Nu există intervale disponibile pentru această dată.</p>
            )}
            {!slotsLoading && slots.length > 0 && (
              <div className="chatbot-res-slots">
                {slots.map((s) => (
                  <button
                    key={s}
                    className={`chatbot-res-slot${resForm.slot === s ? ' chatbot-res-slot--active' : ''}`}
                    onClick={() => setResForm((f) => ({ ...f, slot: s }))}
                  >
                    {formatSlot(s)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="chatbot-res-btn"
            disabled={!resForm.slot}
            onClick={() => setResStep('details')}
          >
            Continuă
          </button>

          <div className="chatbot-res-disclaimer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Showroom-ul Rsistems este disponibil doar în <strong>București</strong>. Luni–Vineri, 10:00–18:00.
          </div>
        </div>
      )}

      {resStep === 'details' && (
        <div className="chatbot-res-body">
          <label className="chatbot-res-label">Nume complet</label>
          <input
            className="chatbot-res-input"
            type="text"
            placeholder="Ion Popescu"
            value={resForm.name}
            onChange={(e) => setResForm((f) => ({ ...f, name: e.target.value }))}
          />

          <label className="chatbot-res-label">Telefon</label>
          <input
            className="chatbot-res-input"
            type="tel"
            placeholder="0712345678"
            value={resForm.phone}
            onChange={(e) => setResForm((f) => ({ ...f, phone: e.target.value }))}
          />

          <label className="chatbot-res-label">Email</label>
          <input
            className="chatbot-res-input"
            type="email"
            placeholder="email@exemplu.ro"
            value={resForm.email}
            onChange={(e) => setResForm((f) => ({ ...f, email: e.target.value }))}
          />

          <label className="chatbot-res-label">Tip afacere</label>
          <select
            className="chatbot-res-input"
            value={resForm.business_type}
            onChange={(e) => setResForm((f) => ({ ...f, business_type: e.target.value }))}
          >
            <option value="">Selectați...</option>
            {BUSINESS_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {submitError && <p className="chatbot-res-error">{submitError}</p>}

          <div className="chatbot-res-row">
            <button className="chatbot-res-btn chatbot-res-btn--outline" onClick={() => setResStep('datetime')}>
              Înapoi
            </button>
            <button
              className="chatbot-res-btn"
              disabled={!resForm.name || !resForm.phone || !resForm.email || !resForm.business_type || submitLoading}
              onClick={handleResSubmit}
            >
              {submitLoading ? 'Se trimite...' : 'Confirmă rezervarea'}
            </button>
          </div>
        </div>
      )}

      {resStep === 'success' && (
        <div className="chatbot-res-body chatbot-res-success">
          <div className="chatbot-res-success-icon">✓</div>
          <p className="chatbot-res-success-title">Rezervare confirmată!</p>
          <p className="chatbot-res-success-sub">Veți primi un email de confirmare în scurt timp. Ne vedem la demo!</p>
          <button className="chatbot-res-btn" onClick={() => setView('chat')}>
            Înapoi la chat
          </button>
        </div>
      )}
    </div>
  )

  return (
    <>
      {/* Chat popup */}
      <div className={`chatbot-popup ${open ? 'chatbot-popup--open' : ''}`} role="dialog" aria-label="Chat Asistent Rsistems">
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-avatar">R</div>
          <div className="chatbot-header-info">
            <span className="chatbot-header-title">Asistent Rsistems</span>
            <span className="chatbot-header-subtitle">Te ajutam rapid</span>
          </div>
          <button
            className="chatbot-close"
            onClick={() => setOpen(false)}
            aria-label="Închide chat"
          >
            ×
          </button>
        </div>

        {view === 'reservation' ? renderReservation() : (
          <>
            {/* Messages */}
            <div className="chatbot-messages" aria-live="polite">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`chatbot-message chatbot-message--${msg.sender}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="chatbot-message-avatar">R</div>
                  )}
                  <div className="chatbot-message-bubble">
                    <p>{msg.text}</p>
                    <span className="chatbot-message-time">{msg.time}</span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="chatbot-message chatbot-message--bot">
                  <div className="chatbot-message-avatar">R</div>
                  <div className="chatbot-message-bubble">
                    <p className="chatbot-typing">
                      <span /><span /><span />
                    </p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            {conversationEnded ? (
              <div className="chatbot-ended">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Conversația s-a încheiat</span>
                <button className="chatbot-ended-btn" onClick={handleNewConversation}>
                  Conversație nouă
                </button>
              </div>
            ) : (
              <div className="chatbot-input-row">
                <input
                  ref={inputRef}
                  className="chatbot-input"
                  type="text"
                  placeholder="Scrie aici ..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  aria-label="Mesaj"
                />
                <button
                  className="chatbot-send"
                  onClick={() => handleSend()}
                  aria-label="Trimite"
                  disabled={isTyping}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            )}

            {/* CTAs */}
            <div className="chatbot-ctas">
              <button
                className="chatbot-cta chatbot-cta--primary"
                onClick={openReservation}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Programare demo showroom
              </button>
              <a
                className="chatbot-cta chatbot-cta--whatsapp"
                href="https://wa.me/40751088772"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Discută cu un manager pe WhatsApp
              </a>
            </div>
          </>
        )}
      </div>

      {/* Floating button */}
      <button
        className={`chatbot-fab${showAttention && !open ? ' chatbot-fab--attention' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Deschide chat"
      >
        <span className="chatbot-fab-letter">R</span>
        {hasNotification && <span className="chatbot-fab-dot" />}
      </button>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="chatbot-overlay"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
