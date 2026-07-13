import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  Scissors,
  Sparkles,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Check,
  ChevronLeft,
  ChevronRight,
  CalendarPlus,
  PartyPopper,
  Loader2,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type Service = {
  id: string
  name: string
  duration: number // minutes
  price: number
}

const HAIR_SERVICES: Service[] = [
  { id: 'wash-style', name: 'Wash & Style', duration: 60, price: 65 },
  { id: 'braids', name: 'Braids', duration: 150, price: 120 },
  { id: 'wig-install', name: 'Wig Install', duration: 90, price: 90 },
  { id: 'color', name: 'Color & Highlights', duration: 120, price: 150 },
]

const NAIL_SERVICES: Service[] = [
  { id: 'classic-mani', name: 'Classic Manicure', duration: 45, price: 35 },
  { id: 'gel-mani', name: 'Gel Manicure', duration: 60, price: 50 },
  { id: 'acrylic-set', name: 'Full Set Acrylic', duration: 90, price: 70 },
  { id: 'pedicure', name: 'Pedicure', duration: 60, price: 45 },
]

const ALL_SERVICES = [...HAIR_SERVICES, ...NAIL_SERVICES]

const STEPS = ['Services', 'Date & time', 'Your details', 'Confirm'] as const

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function formatMoney(n: number) {
  return `$${n.toFixed(0)}`
}

function formatDuration(mins: number) {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  if (h === 0) return `${m} min`
  if (m === 0) return `${h} hr`
  return `${h} hr ${m} min`
}

const MAX_MONTHS_AHEAD = 12

function startOfDay(d: Date) {
  const c = new Date(d)
  c.setHours(0, 0, 0, 0)
  return c
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
}

function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1)
}

/** Full 6-row calendar grid for the given month, including leading/trailing days from adjacent months. */
function getCalendarGrid(monthDate: Date) {
  const firstOfMonth = startOfMonth(monthDate)
  const gridStart = new Date(firstOfMonth)
  gridStart.setDate(gridStart.getDate() - firstOfMonth.getDay()) // back up to the preceding Sunday

  const cells: { date: Date; inCurrentMonth: boolean }[] = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart)
    d.setDate(gridStart.getDate() + i)
    cells.push({ date: d, inCurrentMonth: isSameMonth(d, monthDate) })
  }
  return cells
}

function isSunday(d: Date) {
  return d.getDay() === 0
}

function isSaturday(d: Date) {
  return d.getDay() === 6
}

function getSlotsForDate(date: Date): string[] {
  if (isSunday(date)) return []
  const openHour = 10
  const closeHour = isSaturday(date) ? 17 : 19
  const slots: string[] = []
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()

  for (let h = openHour; h < closeHour; h++) {
    for (const m of [0, 30]) {
      const slotDate = new Date(date)
      slotDate.setHours(h, m, 0, 0)
      if (isToday && slotDate.getTime() < now.getTime() + 60 * 60 * 1000) continue
      const period = h >= 12 ? 'PM' : 'AM'
      const displayHour = h % 12 === 0 ? 12 : h % 12
      slots.push(`${displayHour}:${m === 0 ? '00' : '30'} ${period}`)
    }
  }
  return slots
}

function generateConfirmationCode() {
  return `KC-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
}

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="mx-auto mb-12 flex max-w-lg items-center justify-between">
      {STEPS.map((label, i) => {
        const isDone = i < current
        const isActive = i === current
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors ${
                  isDone
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
                    : isActive
                      ? 'border-[var(--color-accent)] text-[var(--color-accent)]'
                      : 'border-white/15 text-[var(--color-primary)]/40'
                }`}
              >
                {isDone ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={`hidden text-xs sm:block ${
                  isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-primary)]/50'
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`mx-2 h-px flex-1 transition-colors ${
                  isDone ? 'bg-[var(--color-accent)]' : 'bg-white/10'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

function ServiceCard({
  service,
  selected,
  onToggle,
}: {
  service: Service
  selected: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all ${
        selected
          ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10'
          : 'border-white/10 bg-white/5 hover:border-white/20'
      }`}
    >
      <div>
        <p className="font-semibold text-white">{service.name}</p>
        <p className="mt-0.5 text-sm text-[var(--color-primary)]/60">{formatDuration(service.duration)}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-semibold text-[var(--color-accent)]">{formatMoney(service.price)}</span>
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
            selected ? 'border-[var(--color-accent)] bg-[var(--color-accent)]' : 'border-white/20'
          }`}
        >
          {selected && <Check className="h-3.5 w-3.5 text-white" />}
        </span>
      </div>
    </button>
  )
}

function FieldWrapper({
  icon,
  label,
  error,
  children,
}: {
  icon: ReactNode
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--color-primary)]/80">
        <span className="text-[var(--color-accent)]">{icon}</span>
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
    </div>
  )
}

const inputClasses =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-[var(--color-primary)]/30 outline-none transition-colors focus:border-[var(--color-accent)]'

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

type FormState = {
  fullName: string
  phone: string
  email: string
  address: string
  notes: string
}

const emptyForm: FormState = { fullName: '', phone: '', email: '', address: '', notes: '' }

export default function BookingPage() {
  const [step, setStep] = useState(0)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(new Date()))
  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [confirmationCode] = useState(generateConfirmationCode)

  const today = useMemo(() => startOfDay(new Date()), [])
  const currentMonth = useMemo(() => startOfMonth(new Date()), [])
  const maxMonth = useMemo(() => addMonths(currentMonth, MAX_MONTHS_AHEAD), [currentMonth])
  const calendarCells = useMemo(() => getCalendarGrid(viewMonth), [viewMonth])
  const canGoPrevMonth = viewMonth.getTime() > currentMonth.getTime()
  const canGoNextMonth = viewMonth.getTime() < maxMonth.getTime()

  const selectedServices = useMemo(
    () => ALL_SERVICES.filter((s) => selectedIds.includes(s.id)),
    [selectedIds],
  )
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0)
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0)

  const timeSlots = selectedDate ? getSlotsForDate(selectedDate) : []

  function toggleService(id: string) {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  function validateDetails() {
    const next: Partial<FormState> = {}
    if (!form.fullName.trim()) next.fullName = 'Enter your full name'
    if (!/^[\d\s()+-]{7,}$/.test(form.phone.trim())) next.phone = 'Enter a valid phone number'
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = 'Enter a valid email'
    if (!form.address.trim()) next.address = 'Enter where we should come to you'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function goNext() {
    if (step === 2 && !validateDetails()) return
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0))
    setSubmitError(null)
  }

  const [submitError, setSubmitError] = useState<string | null>(null)

  async function handleConfirm() {
    setSubmitError(null)
    setSubmitting(true)

    const payload = {
      name: form.fullName,
      phone: form.phone,
      email: form.email,
      address: form.address,
      services: selectedServices.map((s) => s.name).join(', '),
      total_price: formatMoney(totalPrice),
      total_duration: formatDuration(totalDuration),
      appointment_date: selectedDate?.toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      appointment_time: selectedTime,
      notes: form.notes || '—',
      confirmation_code: confirmationCode,
      _subject: `New booking: ${form.fullName} — ${selectedDate?.toLocaleDateString()} ${selectedTime}`,
      _template: 'table',
      _captcha: 'false',
    }

    try {
      const res = await fetch('https://formsubmit.co/ajax/kchairandnails8@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Request failed')

      setConfirmed(true)
    } catch (err) {
      setSubmitError("We couldn't send your booking — please check your connection and try again, or call us directly.")
    } finally {
      setSubmitting(false)
    }
  }

  function resetBooking() {
    setStep(0)
    setSelectedIds([])
    setSelectedDate(null)
    setSelectedTime(null)
    setForm(emptyForm)
    setErrors({})
    setConfirmed(false)
  }

  function downloadIcs() {
    if (!selectedDate || !selectedTime) return
    const [time, period] = selectedTime.split(' ')
    const [hStr, mStr] = time.split(':')
    let h = parseInt(hStr, 10)
    const m = parseInt(mStr, 10)
    if (period === 'PM' && h !== 12) h += 12
    if (period === 'AM' && h === 12) h = 0

    const start = new Date(selectedDate)
    start.setHours(h, m, 0, 0)
    const end = new Date(start.getTime() + totalDuration * 60 * 1000)

    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `UID:${confirmationCode}@kchairandnails`,
      `DTSTAMP:${fmt(new Date())}`,
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:KC Hair & Nails - ${selectedServices.map((s) => s.name).join(', ')}`,
      `LOCATION:${form.address}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')

    const blob = new Blob([ics], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'kc-appointment.ics'
    a.click()
    URL.revokeObjectURL(url)
  }

  /* -------------------------------------------------------------- */
  /* Success state                                                   */
  /* -------------------------------------------------------------- */

  if (confirmed) {
    return (
      <section className="relative overflow-hidden bg-[var(--color-background)] py-24 text-[var(--color-primary)]">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
        <div className="relative mx-auto max-w-lg px-6 text-center md:px-8">
          <div className="mx-auto mb-6 flex h-20 w-20 animate-[scale-in_0.4s_ease-out] items-center justify-center rounded-full bg-[var(--color-accent)]/15">
            <Check className="h-10 w-10 text-[var(--color-accent)]" strokeWidth={3} />
          </div>
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-accent)]">Booking confirmed</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">See you soon, {form.fullName.split(' ')[0]}!</h2>
          <p className="mt-3 text-sm text-[var(--color-primary)]/70">
            We've sent a confirmation to <span className="text-white">{form.email}</span>. We'll text you at{' '}
            <span className="text-white">{form.phone}</span> shortly to confirm final details.
          </p>

          <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs uppercase tracking-wide text-[var(--color-primary)]/50">Confirmation #</span>
              <span className="font-mono text-sm font-semibold text-[var(--color-accent)]">{confirmationCode}</span>
            </div>

            <div className="space-y-3 py-4">
              {selectedServices.map((s) => (
                <div key={s.id} className="flex justify-between text-sm">
                  <span className="text-[var(--color-primary)]/80">{s.name}</span>
                  <span className="text-white">{formatMoney(s.price)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-white/10 pt-4 text-sm text-[var(--color-primary)]/80">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[var(--color-accent)]" />
                {selectedDate?.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[var(--color-accent)]" />
                {selectedTime} · {formatDuration(totalDuration)}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[var(--color-accent)]" />
                {form.address}
              </div>
            </div>

            <div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-sm font-semibold">
              <span className="text-white">Total</span>
              <span className="text-[var(--color-accent)]">{formatMoney(totalPrice)}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={downloadIcs}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <CalendarPlus className="h-4 w-4" />
              Add to calendar
            </button>
            <button
              onClick={resetBooking}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <PartyPopper className="h-4 w-4" />
              Book another visit
            </button>
          </div>
        </div>
      </section>
    )
  }

  /* -------------------------------------------------------------- */
  /* Booking flow                                                    */
  /* -------------------------------------------------------------- */

  return (
    <section id="booking" className="bg-[var(--color-background)] py-24 text-[var(--color-primary)]">
      <div className="mx-auto max-w-3xl px-6 md:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-accent)]">Book now</p>
          <h1 className="mt-2 text-3xl font-semibold text-white md:text-4xl">Reserve your appointment</h1>
          <p className="mt-3 text-sm text-[var(--color-primary)]/70">
            Four quick steps and we'll be at your door — no account needed.
          </p>
        </div>

        <StepIndicator current={step} />

        <div className="rounded-[2rem] border border-white/10 bg-black/40 p-6 shadow-[0_0_30px_rgba(236,64,122,0.08)] md:p-10">
          {/* Step 0 — Services */}
          {step === 0 && (
            <div>
              <h2 className="mb-1 text-xl font-semibold text-white">Choose your services</h2>
              <p className="mb-6 text-sm text-[var(--color-primary)]/60">Select one or more — hair, nails, or both.</p>

              <div className="mb-6">
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)]">
                  <Scissors className="h-4 w-4" /> Hair
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {HAIR_SERVICES.map((s) => (
                    <ServiceCard key={s.id} service={s} selected={selectedIds.includes(s.id)} onToggle={() => toggleService(s.id)} />
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)]">
                  <Sparkles className="h-4 w-4" /> Nails
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {NAIL_SERVICES.map((s) => (
                    <ServiceCard key={s.id} service={s} selected={selectedIds.includes(s.id)} onToggle={() => toggleService(s.id)} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1 — Date & time */}
          {step === 1 && (
            <div>
              <h2 className="mb-1 text-xl font-semibold text-white">Pick a date & time</h2>
              <p className="mb-6 text-sm text-[var(--color-primary)]/60">Closed Sundays. We'll travel to you for the visit.</p>

              <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-3 flex items-center justify-between px-1">
                  <button
                    type="button"
                    onClick={() => canGoPrevMonth && setViewMonth((m) => addMonths(m, -1))}
                    disabled={!canGoPrevMonth}
                    aria-label="Previous month"
                    className="rounded-full p-1.5 text-[var(--color-primary)]/70 transition hover:bg-white/10 hover:text-white disabled:opacity-20"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <p className="text-sm font-semibold text-white">
                    {viewMonth.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                  </p>
                  <button
                    type="button"
                    onClick={() => canGoNextMonth && setViewMonth((m) => addMonths(m, 1))}
                    disabled={!canGoNextMonth}
                    aria-label="Next month"
                    className="rounded-full p-1.5 text-[var(--color-primary)]/70 transition hover:bg-white/10 hover:text-white disabled:opacity-20"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 px-1 pb-1 text-center text-xs text-[var(--color-primary)]/40">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <span key={i}>{d}</span>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {calendarCells.map(({ date, inCurrentMonth }) => {
                    const disabled = !inCurrentMonth || isSunday(date) || date.getTime() < today.getTime()
                    const selected = selectedDate?.toDateString() === date.toDateString()
                    return (
                      <button
                        key={date.toISOString()}
                        type="button"
                        disabled={disabled}
                        onClick={() => {
                          setSelectedDate(date)
                          setSelectedTime(null)
                        }}
                        className={`aspect-square rounded-xl text-sm transition-colors ${
                          !inCurrentMonth
                            ? 'text-transparent'
                            : disabled
                              ? 'cursor-not-allowed text-[var(--color-primary)]/20'
                              : selected
                                ? 'bg-[var(--color-accent)] font-semibold text-white'
                                : 'text-[var(--color-primary)]/70 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {date.getDate()}
                      </button>
                    )
                  })}
                </div>
              </div>

              {selectedDate && (
                <div>
                  {timeSlots.length === 0 ? (
                    <p className="text-sm text-[var(--color-primary)]/60">No slots left for this day — try another date.</p>
                  ) : (
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                      {timeSlots.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                            selectedTime === t
                              ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
                              : 'border-white/10 text-[var(--color-primary)]/70 hover:border-white/20'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 2 — Details */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="mb-1 text-xl font-semibold text-white">Your details</h2>
                <p className="text-sm text-[var(--color-primary)]/60">So we know who to expect and where to go.</p>
              </div>

              <FieldWrapper icon={<User className="h-4 w-4" />} label="Full name" error={errors.fullName}>
                <input
                  className={inputClasses}
                  placeholder="Jane Doe"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                />
              </FieldWrapper>

              <div className="grid gap-5 sm:grid-cols-2">
                <FieldWrapper icon={<Phone className="h-4 w-4" />} label="Phone" error={errors.phone}>
                  <input
                    className={inputClasses}
                    placeholder="(519) 555-0134"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </FieldWrapper>
                <FieldWrapper icon={<Mail className="h-4 w-4" />} label="Email" error={errors.email}>
                  <input
                    className={inputClasses}
                    placeholder="jane@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </FieldWrapper>
              </div>

              <FieldWrapper icon={<MapPin className="h-4 w-4" />} label="Appointment address" error={errors.address}>
                <input
                  className={inputClasses}
                  placeholder="Street address, London ON"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </FieldWrapper>

              <FieldWrapper icon={<MessageSquare className="h-4 w-4" />} label="Notes (optional)">
                <textarea
                  className={`${inputClasses} min-h-[90px] resize-none`}
                  placeholder="Reference photos, allergies, parking notes..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </FieldWrapper>
            </div>
          )}

          {/* Step 3 — Review */}
          {step === 3 && (
            <div>
              <h2 className="mb-1 text-xl font-semibold text-white">Review your booking</h2>
              <p className="mb-6 text-sm text-[var(--color-primary)]/60">Everything look right?</p>

              <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                <div>
                  <p className="text-xs uppercase tracking-wide text-[var(--color-primary)]/50">Services</p>
                  <div className="mt-2 space-y-2">
                    {selectedServices.map((s) => (
                      <div key={s.id} className="flex justify-between text-sm">
                        <span className="text-[var(--color-primary)]/80">{s.name}</span>
                        <span className="text-white">{formatMoney(s.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-2">
                  <div className="flex items-center gap-2 text-sm text-[var(--color-primary)]/80">
                    <Calendar className="h-4 w-4 text-[var(--color-accent)]" />
                    {selectedDate?.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--color-primary)]/80">
                    <Clock className="h-4 w-4 text-[var(--color-accent)]" />
                    {selectedTime} · {formatDuration(totalDuration)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--color-primary)]/80 sm:col-span-2">
                    <MapPin className="h-4 w-4 text-[var(--color-accent)]" />
                    {form.address}
                  </div>
                </div>

                <div className="flex justify-between border-t border-white/10 pt-4 text-sm font-semibold">
                  <span className="text-white">Total</span>
                  <span className="text-[var(--color-accent)]">{formatMoney(totalPrice)}</span>
                </div>
              </div>

              {submitError && (
                <p className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
                  {submitError}
                </p>
              )}
            </div>
          )}

          {/* Nav buttons */}
          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
            <button
              onClick={goBack}
              disabled={step === 0}
              className="inline-flex items-center gap-1 rounded-full px-4 py-2.5 text-sm font-medium text-[var(--color-primary)]/70 transition disabled:opacity-0 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>

            {step < STEPS.length - 1 ? (
              <button
                onClick={goNext}
                disabled={
                  (step === 0 && selectedIds.length === 0) || (step === 1 && (!selectedDate || !selectedTime))
                }
                className="inline-flex items-center gap-1 rounded-full bg-[var(--color-accent)] px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Continue
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleConfirm}
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Confirming...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Confirm booking
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {selectedServices.length > 0 && step < 3 && (
          <p className="mt-4 text-center text-sm text-[var(--color-primary)]/60">
            {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} selected · {formatDuration(totalDuration)} ·{' '}
            <span className="font-semibold text-[var(--color-accent)]">{formatMoney(totalPrice)}</span>
          </p>
        )}
      </div>
    </section>
  )
}