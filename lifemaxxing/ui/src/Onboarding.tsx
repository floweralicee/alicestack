import { useState } from 'react'
import type { PublicConfig } from './api'

type OnboardingProps = {
  onComplete: (config: PublicConfig) => void
}

type CaptureMode = 'obsidian' | 'textbox' | 'hana'
type ReminderMode = 'morning' | 'evening' | 'none'
type Step = 1 | 2 | 3 | 'done'

const AREAS = [
  { id: 'finance', emoji: '💰', label: 'Finance' },
  { id: 'career', emoji: '🚀', label: 'Career' },
  { id: 'growth', emoji: '🌱', label: 'Personal Growth' },
  { id: 'health', emoji: '🏃', label: 'Health' },
  { id: 'relationships', emoji: '👥', label: 'Relationships' },
]

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState<Step>(1)
  const [captureMode, setCaptureMode] = useState<CaptureMode | null>(null)
  const [obsidianPath, setObsidianPath] = useState('')
  const [reminderMode, setReminderMode] = useState<ReminderMode | null>(null)
  const [reminderTime, setReminderTime] = useState('21:00')
  const [winDefinitions, setWinDefinitions] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Step 1 — How do you want to capture wins?
  const handleStep1 = (mode: CaptureMode) => {
    setCaptureMode(mode)
    setStep(2)
  }

  // Step 2 — When do you want to be reminded?
  const handleStep2 = (mode: ReminderMode, time: string) => {
    setReminderMode(mode)
    setReminderTime(time)
    setStep(3)
  }

  // Step 3 — What does winning look like for you? (optional per area)
  const handleWinDef = (areaId: string, value: string) => {
    setWinDefinitions(prev => ({ ...prev, [areaId]: value }))
  }

  const handleFinish = async () => {
    setIsSubmitting(true)
    setError(null)
    try {
      const payload = {
        captureMode,
        obsidianPath: captureMode === 'obsidian' ? obsidianPath.trim() : '',
        reminderMode,
        reminderTime,
        winDefinitions,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Los_Angeles',
      }
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error((data as { error?: string }).error ?? `Server error ${res.status}`)
      }
      const config = await res.json() as PublicConfig
      onComplete(config)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="lm-onboarding">
      <div className="lm-onboarding-card">

        {/* Progress dots */}
        <div className="lm-onboarding-progress">
          {[1, 2, 3].map(n => (
            <span
              key={n}
              className={`lm-onboarding-dot${step === n || (step === 'done' && n === 3) ? ' lm-onboarding-dot--active' : ''}${typeof step === 'number' && n < step ? ' lm-onboarding-dot--done' : ''}`}
            />
          ))}
        </div>

        {/* ── Step 1: Capture mode ─────────────────────────────────────────── */}
        {step === 1 && (
          <div className="lm-onboarding-step">
            <p className="lm-onboarding-eyebrow">Step 1 of 3</p>
            <h1 className="lm-onboarding-title">How do you want to capture your wins?</h1>
            <p className="lm-onboarding-subtitle">
              You don't need to label anything a win. The agent finds them for you.
            </p>

            <div className="lm-option-list">
              <button
                className="lm-option-btn"
                onClick={() => handleStep1('obsidian')}
              >
                <span className="lm-option-emoji">📓</span>
                <div>
                  <div className="lm-option-title">I write in Obsidian</div>
                  <div className="lm-option-desc">Link a folder. Agent reads your journal and finds wins automatically.</div>
                </div>
              </button>

              <button
                className="lm-option-btn"
                onClick={() => handleStep1('textbox')}
              >
                <span className="lm-option-emoji">✍️</span>
                <div>
                  <div className="lm-option-title">I'll write in a text box</div>
                  <div className="lm-option-desc">Open the app, write what happened, agent extracts the wins.</div>
                </div>
              </button>

              <button
                className="lm-option-btn"
                onClick={() => handleStep1('hana')}
              >
                <span className="lm-option-emoji">🐾</span>
                <div>
                  <div className="lm-option-title">Desktop pet (Hana)</div>
                  <div className="lm-option-desc">She lives on your screen. Type a win → she burps. Win logged.</div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ── Step 1.5: Obsidian path (sub-step before reminder) ───────────── */}
        {step === 2 && captureMode === 'obsidian' && !obsidianPath.trim() && (
          <div className="lm-onboarding-step">
            <p className="lm-onboarding-eyebrow">Step 1 of 3 — Obsidian path</p>
            <h1 className="lm-onboarding-title">Where's your journal?</h1>
            <p className="lm-onboarding-subtitle">
              Paste the absolute path to your Obsidian vault folder. We'll read your journal entries from there.
            </p>

            <label className="lm-field">
              <span className="lm-field-label">Vault folder path</span>
              <input
                type="text"
                className="lm-field-input"
                value={obsidianPath}
                onChange={e => setObsidianPath(e.target.value)}
                placeholder="/Users/you/Documents/Obsidian/MyVault"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                autoFocus
              />
              <span className="lm-field-hint">We'll read journal entries from this folder. Nothing is deleted or modified.</span>
            </label>

            <div className="lm-onboarding-nav">
              <button className="lm-btn lm-btn--ghost" onClick={() => setStep(1)}>Back</button>
              <button
                className="lm-btn lm-btn--primary"
                onClick={() => { /* path entered, re-render will show reminder step */ }}
                disabled={!obsidianPath.trim()}
                style={{ opacity: obsidianPath.trim() ? 1 : 0.4 }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2: Reminder preference ──────────────────────────────────── */}
        {step === 2 && (captureMode !== 'obsidian' || obsidianPath.trim()) && (
          <StepReminder
            onBack={() => {
              if (captureMode === 'obsidian') setObsidianPath('')
              else setStep(1)
            }}
            onNext={handleStep2}
          />
        )}

        {/* ── Step 3: Win definitions (optional) ───────────────────────────── */}
        {step === 3 && (
          <div className="lm-onboarding-step">
            <p className="lm-onboarding-eyebrow">Step 3 of 3</p>
            <h1 className="lm-onboarding-title">What does winning look like for you?</h1>
            <p className="lm-onboarding-subtitle">
              Optional — skip anything you want. The agent has defaults for every area.
              This just helps it understand what matters to you specifically.
            </p>

            <div className="lm-area-inputs">
              {AREAS.map(area => (
                <label key={area.id} className="lm-field lm-field--area">
                  <span className="lm-field-area-label">
                    <span className="lm-field-area-emoji">{area.emoji}</span>
                    {area.label}
                  </span>
                  <input
                    type="text"
                    className="lm-field-input"
                    value={winDefinitions[area.id] ?? ''}
                    onChange={e => handleWinDef(area.id, e.target.value)}
                    placeholder={`What counts as a ${area.label.toLowerCase()} win for you?`}
                  />
                </label>
              ))}
            </div>

            {error && <p className="lm-onboarding-error">{error}</p>}

            <div className="lm-onboarding-nav">
              <button className="lm-btn lm-btn--ghost" onClick={() => setStep(2)}>Back</button>
              <button
                className="lm-btn lm-btn--primary"
                onClick={handleFinish}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Setting up…' : 'Start tracking →'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

// ── Step 2 sub-component (reminder) ───────────────────────────────────────────
function StepReminder({
  onBack,
  onNext,
}: {
  onBack: () => void
  onNext: (mode: ReminderMode, time: string) => void
}) {
  const [mode, setMode] = useState<ReminderMode | null>(null)
  const [time, setTime] = useState('21:00')

  return (
    <div className="lm-onboarding-step">
      <p className="lm-onboarding-eyebrow">Step 2 of 3</p>
      <h1 className="lm-onboarding-title">When do you want to be reminded?</h1>
      <p className="lm-onboarding-subtitle">
        A nudge at the right time means you actually log the wins instead of forgetting them.
      </p>

      <div className="lm-option-list">
        <button
          className={`lm-option-btn${mode === 'morning' ? ' lm-option-btn--selected' : ''}`}
          onClick={() => { setMode('morning'); setTime('08:00') }}
        >
          <span className="lm-option-emoji">🌅</span>
          <div>
            <div className="lm-option-title">Morning</div>
            <div className="lm-option-desc">Write about yesterday first thing. Clean slate before the day starts.</div>
          </div>
        </button>

        <button
          className={`lm-option-btn${mode === 'evening' ? ' lm-option-btn--selected' : ''}`}
          onClick={() => { setMode('evening'); setTime('21:00') }}
        >
          <span className="lm-option-emoji">🌙</span>
          <div>
            <div className="lm-option-title">Evening</div>
            <div className="lm-option-desc">End of day reflection. Catch everything before sleep.</div>
          </div>
        </button>

        <button
          className={`lm-option-btn${mode === 'none' ? ' lm-option-btn--selected' : ''}`}
          onClick={() => setMode('none')}
        >
          <span className="lm-option-emoji">🤙</span>
          <div>
            <div className="lm-option-title">No reminders</div>
            <div className="lm-option-desc">I'll open it when I want. Don't ping me.</div>
          </div>
        </button>
      </div>

      {mode && mode !== 'none' && (
        <label className="lm-field lm-field--time">
          <span className="lm-field-label">What time?</span>
          <input
            type="time"
            className="lm-field-input lm-field-input--time"
            value={time}
            onChange={e => setTime(e.target.value)}
          />
        </label>
      )}

      <div className="lm-onboarding-nav">
        <button className="lm-btn lm-btn--ghost" onClick={onBack}>Back</button>
        <button
          className="lm-btn lm-btn--primary"
          onClick={() => mode && onNext(mode, time)}
          disabled={!mode}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
