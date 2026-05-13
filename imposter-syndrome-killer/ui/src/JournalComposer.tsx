import { useRef, useState } from 'react'

type JournalComposerProps = {
  onClose: () => void
  onSubmitted: () => void
}

type SubmitState = 'idle' | 'loading' | 'done' | 'error'

export function JournalComposer({ onClose, onSubmitted }: JournalComposerProps) {
  const [text, setText] = useState('')
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [result, setResult] = useState<{
    winsFound: number
    scores: Record<string, number>
    lowAreaAlert: { area: string; prompt: string } | null
    message: string
  } | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Speech recognition (optional — same as win-calendar)
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const SpeechRecognitionAPI: SpeechRecognitionConstructor | undefined =
    typeof window !== 'undefined'
      ? window.SpeechRecognition ?? window.webkitSpeechRecognition
      : undefined

  const toggleListening = () => {
    if (!SpeechRecognitionAPI) return
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      return
    }
    const recognition = new SpeechRecognitionAPI()
    recognition.continuous = true
    recognition.interimResults = false
    recognition.lang = 'en-US'
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const list = event.results
      const chunk: string[] = []
      for (let i = event.resultIndex; i < list.length; i++) {
        chunk.push(list[i][0].transcript)
      }
      const transcript = chunk.join(' ')
      setText(prev => prev ? `${prev} ${transcript}` : transcript)
    }
    recognition.onend = () => setIsListening(false)
    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
  }

  const handleSubmit = async () => {
    if (!text.trim()) return
    setSubmitState('loading')
    setErrorMessage(null)
    try {
      const res = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text.trim(),
          date: new Date().toISOString().slice(0, 10),
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as { error?: string }
        throw new Error(data.error ?? `Server error ${res.status}`)
      }
      const data = await res.json() as typeof result
      setResult(data)
      setSubmitState('done')
      onSubmitted()
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.')
      setSubmitState('error')
    }
  }

  const AREA_LABELS: Record<string, string> = {
    finance: '💰 Finance',
    career: '🚀 Career',
    growth: '🌱 Growth',
    health: '🏃 Health',
    relationships: '👥 Relationships',
  }

  return (
    <div className="journal-backdrop" role="dialog" aria-modal="true" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="journal-modal">

        <div className="journal-header">
          <h2 className="journal-title">
            {submitState === 'done' ? 'Wins found 🎉' : 'What happened today?'}
          </h2>
          <button className="journal-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        {submitState !== 'done' ? (
          <>
            <p className="journal-hint">
              Write freely — what you did, thought, felt, or got done. The agent finds the wins.
            </p>

            <div className="journal-textarea-wrapper">
              <textarea
                ref={textareaRef}
                className="journal-textarea"
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Paid a bill I'd been avoiding. Went for a walk even though I didn't want to. Had a real conversation with my sister for the first time in weeks..."
                rows={7}
                autoFocus
              />
              {SpeechRecognitionAPI && (
                <button
                  type="button"
                  className={`journal-mic-button${isListening ? ' journal-mic-button--active' : ''}`}
                  onClick={toggleListening}
                  aria-label={isListening ? 'Stop dictation' : 'Start dictation'}
                >
                  {isListening ? '⏹' : '🎤'}
                </button>
              )}
            </div>

            {errorMessage && <p className="journal-error">{errorMessage}</p>}

            <div className="journal-actions">
              <button className="lm-btn lm-btn--ghost" onClick={onClose}>Cancel</button>
              <button
                className="lm-btn lm-btn--primary"
                onClick={handleSubmit}
                disabled={!text.trim() || submitState === 'loading'}
              >
                {submitState === 'loading' ? 'Finding wins…' : 'Find my wins →'}
              </button>
            </div>
          </>
        ) : result && (
          <div className="journal-result">
            <p className="journal-result-message">{result.message}</p>

            {/* Scores */}
            <div className="journal-scores">
              {Object.entries(result.scores)
                .filter(([key]) => key !== 'total' && (result.scores[key] ?? 0) > 0)
                .map(([area, score]) => (
                  <div key={area} className="journal-score-row">
                    <span className="journal-score-area">{AREA_LABELS[area] ?? area}</span>
                    <span className="journal-score-value">+{score}</span>
                  </div>
                ))}
              <div className="journal-score-row journal-score-row--total">
                <span className="journal-score-area">Total</span>
                <span className="journal-score-value">+{result.scores.total}</span>
              </div>
            </div>

            {/* Low area nudge */}
            {result.lowAreaAlert && (
              <div className="journal-low-alert">
                <p className="journal-low-area">{AREA_LABELS[result.lowAreaAlert.area] ?? result.lowAreaAlert.area} has been quiet lately.</p>
                <p className="journal-low-prompt">{result.lowAreaAlert.prompt}</p>
              </div>
            )}

            <button className="lm-btn lm-btn--primary" onClick={onClose}>
              See my calendar →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
