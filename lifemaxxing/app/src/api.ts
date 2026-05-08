import type { WinsByDate } from './wins'

// ── Config ────────────────────────────────────────────────────────────────────

export type CaptureMode = 'obsidian' | 'textbox' | 'hana'
export type ReminderMode = 'morning' | 'evening' | 'none'

export type PublicConfig = {
  onboarded: boolean
  captureMode?: CaptureMode
  obsidianPath?: string
  reminderMode?: ReminderMode
  reminderTime?: string
  timezone?: string
  winDefinitions?: Record<string, string>
}

export type OnboardingPayload = {
  captureMode: CaptureMode
  obsidianPath?: string
  reminderMode: ReminderMode
  reminderTime?: string
  timezone?: string
  winDefinitions?: Record<string, string>
}

// ── Journal / wins ────────────────────────────────────────────────────────────

export type JournalResult = {
  winsFound: number
  scores: Record<string, number>
  lowAreaAlert: {
    area: string
    daysSince: number
    prompt: string
  } | null
  message: string
}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function parseJsonOrThrow<T>(response: Response): Promise<T> {
  let json: unknown
  try {
    json = await response.json()
  } catch {
    throw new Error(`Server returned ${response.status} with non-JSON body.`)
  }
  if (!response.ok) {
    const message =
      json && typeof json === 'object' && 'error' in json &&
      typeof (json as { error: unknown }).error === 'string'
        ? (json as { error: string }).error
        : `Server returned ${response.status}.`
    throw new Error(message)
  }
  return json as T
}

// ── API calls ─────────────────────────────────────────────────────────────────

export async function fetchConfig(): Promise<PublicConfig> {
  const res = await fetch('/api/config')
  return parseJsonOrThrow<PublicConfig>(res)
}

export async function submitOnboarding(payload: OnboardingPayload): Promise<PublicConfig> {
  const res = await fetch('/api/config', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return parseJsonOrThrow<PublicConfig>(res)
}

export async function fetchWins(): Promise<WinsByDate> {
  const res = await fetch('/api/wins')
  const json = await parseJsonOrThrow<{ winsByDate: WinsByDate }>(res)
  return json.winsByDate ?? {}
}

export async function submitJournal(payload: {
  text: string
  date?: string
}): Promise<JournalResult> {
  const res = await fetch('/api/journal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return parseJsonOrThrow<JournalResult>(res)
}
