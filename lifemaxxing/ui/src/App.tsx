import { useCallback, useEffect, useState } from 'react'
import { Calendar } from './Calendar'
import { HeatmapView } from './HeatmapView'
import { WinDetail } from './WinDetail'
import { Profile } from './Profile'
import { fetchConfig, fetchWins, patchWinAreas, type PublicConfig } from './api'
import type { Win, WinsByDate } from './wins'

type ActiveView = 'month' | 'year'

function addMonths(year: number, monthIndex: number, delta: number) {
  const total = year * 12 + monthIndex + delta
  return { year: Math.floor(total / 12), monthIndex: ((total % 12) + 12) % 12 }
}

type LoadState = 'loading' | 'ready' | 'error'

export function App() {
  const today = new Date()
  const [loadState, setLoadState] = useState<LoadState>('loading')
  const [loadError, setLoadError] = useState<string | null>(null)
  const [config, setConfig] = useState<PublicConfig | null>(null)
  const [winsByDate, setWinsByDate] = useState<WinsByDate>({})
  const [visibleYear, setVisibleYear] = useState(today.getFullYear())
  const [visibleMonth, setVisibleMonth] = useState(today.getMonth())
  const [selectedWin, setSelectedWin] = useState<Win | null>(null)
  const [activeView, setActiveView] = useState<ActiveView>('month')
  const [profileOpen, setProfileOpen] = useState(false)

  const reload = useCallback(async () => {
    setLoadState('loading')
    setLoadError(null)
    try {
      const nextConfig = await fetchConfig()
      setConfig(nextConfig)
      setWinsByDate(await fetchWins())
      setLoadState('ready')
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to contact local server.'
      setLoadError(message)
      setLoadState('error')
    }
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  useEffect(() => {
    if (!selectedWin) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedWin(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedWin])

  const goToPreviousMonth = () => {
    const next = addMonths(visibleYear, visibleMonth, -1)
    setVisibleYear(next.year)
    setVisibleMonth(next.monthIndex)
  }
  const goToNextMonth = () => {
    const next = addMonths(visibleYear, visibleMonth, 1)
    setVisibleYear(next.year)
    setVisibleMonth(next.monthIndex)
  }
  const goToToday = () => {
    const now = new Date()
    setVisibleYear(now.getFullYear())
    setVisibleMonth(now.getMonth())
  }

  if (loadState === 'loading') return <div className="app-status"><p>Loading…</p></div>

  if (loadState === 'error') {
    return (
      <div className="app-status">
        <p className="app-status-error">Can't reach the local server.</p>
        <p className="app-status-hint">Make sure it's running: <code>npm run dev</code>. Error: {loadError}</p>
        <button type="button" className="app-status-retry" onClick={reload}>Retry</button>
      </div>
    )
  }

  if (!config) return null

  const showSetupBanner =
    !config.onboarded ||
    (config.captureMode === 'obsidian' && !(config.obsidianPath?.trim()))

  return (
    <>
      <div className="lm-view-toggle">
        <button
          type="button"
          className={`lm-view-btn${activeView === 'month' ? ' lm-view-btn--active' : ''}`}
          onClick={() => setActiveView('month')}
        >
          Month
        </button>
        <button
          type="button"
          className={`lm-view-btn${activeView === 'year' ? ' lm-view-btn--active' : ''}`}
          onClick={() => setActiveView('year')}
        >
          Year
        </button>
        <button
          type="button"
          className="lm-profile-open-btn"
          onClick={() => setProfileOpen(true)}
        >
          Profile
        </button>
      </div>

      {showSetupBanner && (
        <div className="lm-setup-banner" role="status">
          <p>
            <strong>Finish setup in chat:</strong>{' '}
            Open the lifemaxxing skill in OpenClaw, Hermes, or your assistant and answer Q1–Q3; that writes{' '}
            <code className="lm-setup-code">~/.lifemaxxing/config.json</code>.
            Wins are logged through your agent — this view is read-only apart from Profile.
          </p>
          {config.onboarded && config.captureMode === 'obsidian' && !(config.obsidianPath?.trim()) ? (
            <p className="lm-setup-banner-extra">
              Obsidian vault path is missing. Add your vault folder in Profile or rerun setup with the agent.
            </p>
          ) : null}
        </div>
      )}

      {activeView === 'month' && (
        <Calendar
          year={visibleYear}
          month={visibleMonth}
          winsByDate={winsByDate}
          onSelectWin={setSelectedWin}
          onPreviousMonth={goToPreviousMonth}
          onNextMonth={goToNextMonth}
          onJumpToToday={goToToday}
        />
      )}

      {activeView === 'year' && (
        <HeatmapView winsByDate={winsByDate} />
      )}

      {selectedWin && (
        <WinDetail
          win={selectedWin}
          onClose={() => setSelectedWin(null)}
          onUpdateAreas={async (w, areas) => {
            await patchWinAreas(w.id, areas)
            setSelectedWin({ ...w, areas })
            setWinsByDate(await fetchWins())
          }}
        />
      )}

      {profileOpen && (
        <Profile
          config={config}
          onClose={() => setProfileOpen(false)}
          onSaved={(c) => setConfig(c)}
        />
      )}
    </>
  )
}
