import { useEffect, useState } from 'react'
import type { PublicConfig, ProfilePatchPayload } from './api'
import { patchConfig } from './api'
import {
  DEFAULT_WIN_DEFINITION_LINES,
  PROFILE_AREA_META,
  PROFILE_AREA_IDS,
  type ProfileAreaId,
} from './profile-defaults'

type CaptureMode = 'obsidian' | 'textbox' | 'hana'
type ReminderMode = 'morning' | 'evening' | 'none'

type ProfileProps = {
  config: PublicConfig
  onClose: () => void
  onSaved: (c: PublicConfig) => void
}

export function Profile({ config, onClose, onSaved }: ProfileProps) {
  const onboarded = config.onboarded
  const [captureMode, setCaptureMode] = useState<CaptureMode>(
    config.captureMode ?? 'textbox',
  )
  const [obsidianPath, setObsidianPath] = useState(config.obsidianPath ?? '')
  const [reminderMode, setReminderMode] = useState<ReminderMode>(
    config.reminderMode ?? 'none',
  )
  const [reminderTime, setReminderTime] = useState(config.reminderTime ?? '21:00')
  const [timezone, setTimezone] = useState(
    config.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
  )

  const [areaText, setAreaText] = useState(() => {
    const m: Record<ProfileAreaId, string> = {} as Record<ProfileAreaId, string>
    for (const id of PROFILE_AREA_IDS) {
      m[id] = config.effectiveWinDefinitions[id] ?? DEFAULT_WIN_DEFINITION_LINES[id]
    }
    return m
  })

  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!config.onboarded) {
      const m = {} as Record<ProfileAreaId, string>
      for (const id of PROFILE_AREA_IDS) {
        m[id] = config.effectiveWinDefinitions[id] ?? DEFAULT_WIN_DEFINITION_LINES[id]
      }
      setAreaText(m)
      return
    }
    setCaptureMode(config.captureMode ?? 'textbox')
    setObsidianPath(config.obsidianPath ?? '')
    setReminderMode(config.reminderMode ?? 'none')
    setReminderTime(config.reminderTime ?? '21:00')
    setTimezone(
      config.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
    )
    const m = {} as Record<ProfileAreaId, string>
    for (const id of PROFILE_AREA_IDS) {
      m[id] = config.effectiveWinDefinitions[id] ?? DEFAULT_WIN_DEFINITION_LINES[id]
    }
    setAreaText(m)
  }, [config])

  const buildWinDefinitionPatch = (): Record<string, string> => {
    const out: Record<string, string> = {}
    for (const id of PROFILE_AREA_IDS) {
      const trimmed = areaText[id].trim()
      const def = DEFAULT_WIN_DEFINITION_LINES[id]
      if (trimmed === '' || trimmed === def) out[id] = ''
      else out[id] = trimmed
    }
    return out
  }

  const handleSave = async () => {
    if (!onboarded) return
    setBusy(true)
    setError(null)
    try {
      const patch: ProfilePatchPayload = {
        captureMode,
        obsidianPath: captureMode === 'obsidian' ? obsidianPath.trim() : undefined,
        reminderMode,
        reminderTime,
        timezone,
        winDefinitions: buildWinDefinitionPatch(),
      }
      const next = await patchConfig(patch)
      onSaved(next)
      onClose()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="lm-profile-overlay" role="dialog" aria-modal="true" aria-labelledby="lm-profile-title">
      <div className="lm-profile-panel">
        <div className="lm-profile-header">
          <h2 id="lm-profile-title" className="lm-profile-title">Profile</h2>
          <button type="button" className="lm-profile-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        {!onboarded && (
          <p className="lm-profile-notice">
            Finish setup with your agent (lifemaxxing skill) so <code className="lm-profile-code">~/.lifemaxxing/config.json</code> exists.
            Below are <strong>default</strong> win definitions—you can personalize them here after onboarding.
          </p>
        )}

        <section className="lm-profile-section">
          <h3 className="lm-profile-h">Capture</h3>
          <select
            className="lm-profile-field"
            value={captureMode}
            onChange={(e) => setCaptureMode(e.target.value as CaptureMode)}
            disabled={!onboarded}
          >
            <option value="obsidian">Obsidian vault</option>
            <option value="textbox">Local file (no vault)</option>
            <option value="hana">Desktop pet</option>
          </select>
          {captureMode === 'obsidian' && (
            <>
              <label className="lm-profile-label">Obsidian folder path</label>
              <input
                type="text"
                className="lm-profile-field"
                value={obsidianPath}
                onChange={(e) => setObsidianPath(e.target.value)}
                placeholder="/path/to/vault"
                disabled={!onboarded}
              />
            </>
          )}
        </section>

        <section className="lm-profile-section">
          <h3 className="lm-profile-h">Reminders</h3>
          <select
            className="lm-profile-field"
            value={reminderMode}
            onChange={(e) => setReminderMode(e.target.value as ReminderMode)}
            disabled={!onboarded}
          >
            <option value="morning">Morning</option>
            <option value="evening">Evening</option>
            <option value="none">None</option>
          </select>
          <label className="lm-profile-label">Reminder time</label>
          <input
            type="time"
            className="lm-profile-field"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            disabled={!onboarded || reminderMode === 'none'}
          />
          <label className="lm-profile-label">Timezone</label>
          <input
            type="text"
            className="lm-profile-field"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            disabled={!onboarded}
          />
        </section>

        <section className="lm-profile-section">
          <h3 className="lm-profile-h">What counts as winning (by area)</h3>
          <p className="lm-profile-hint">
            Log wins in chat with your agent. Clear a field or reset text to defaults to drop a custom definition.
          </p>
          {PROFILE_AREA_META.map(({ id, label, emoji }) => (
            <div key={id} className="lm-profile-area-row">
              <label className="lm-profile-area-label">
                {emoji} {label}
                {config.winDefinitionCustomized?.[id] ? (
                  <span className="lm-profile-chip"> customized</span>
                ) : null}
              </label>
              <textarea
                className="lm-profile-textarea"
                rows={3}
                value={areaText[id]}
                onChange={(e) => setAreaText((t) => ({ ...t, [id]: e.target.value }))}
                readOnly={!onboarded}
              />
            </div>
          ))}
        </section>

        {error && <p className="lm-profile-error">{error}</p>}

        <div className="lm-profile-actions">
          <button type="button" className="lm-profile-btn lm-profile-btn--ghost" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className="lm-profile-btn lm-profile-btn--primary"
            disabled={!onboarded || busy}
            onClick={handleSave}
          >
            {busy ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
