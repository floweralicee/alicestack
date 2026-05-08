import { promises as fs, constants as fsConstants } from 'node:fs'
import path from 'node:path'
import os from 'node:os'

const CONFIG_DIR = path.join(os.homedir(), '.lifemaxxing')
const CONFIG_PATH = path.join(CONFIG_DIR, 'config.json')

export type CaptureMode = 'obsidian' | 'textbox' | 'hana'
export type ReminderMode = 'morning' | 'evening' | 'none'

export type StoredConfig = {
  captureMode: CaptureMode
  obsidianPath: string        // empty string if not obsidian mode
  reminderMode: ReminderMode
  reminderTime: string        // HH:MM local time, e.g. "21:00"
  timezone: string
  winDefinitions: Record<string, string>   // per-area custom definitions
}

export type PublicConfig = {
  onboarded: boolean
  captureMode?: CaptureMode
  obsidianPath?: string
  reminderMode?: ReminderMode
  reminderTime?: string
  timezone?: string
  winDefinitions?: Record<string, string>
}

async function ensureConfigDir(): Promise<void> {
  await fs.mkdir(CONFIG_DIR, { recursive: true, mode: 0o700 })
}

export function readConfig(): StoredConfig {
  // Sync read — called in hot paths
  const { readFileSync } = require('node:fs')
  try {
    const raw = readFileSync(CONFIG_PATH, 'utf8')
    return JSON.parse(raw) as StoredConfig
  } catch {
    return {
      captureMode: 'textbox',
      obsidianPath: '',
      reminderMode: 'none',
      reminderTime: '21:00',
      timezone: 'America/Los_Angeles',
      winDefinitions: {},
    }
  }
}

export async function writeConfig(config: StoredConfig): Promise<void> {
  await ensureConfigDir()
  await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), { mode: 0o600 })
  await fs.chmod(CONFIG_PATH, 0o600)
}

export function toPublicConfig(config: StoredConfig | null): PublicConfig {
  if (!config) return { onboarded: false }
  return {
    onboarded: true,
    captureMode: config.captureMode,
    obsidianPath: config.obsidianPath,
    reminderMode: config.reminderMode,
    reminderTime: config.reminderTime,
    timezone: config.timezone,
    winDefinitions: config.winDefinitions,
  }
}

export async function validateObsidianPath(
  candidate: string
): Promise<{ ok: true } | { ok: false; reason: string }> {
  try {
    const stat = await fs.stat(candidate)
    if (!stat.isDirectory()) return { ok: false, reason: 'Not a directory' }
    await fs.access(candidate, fsConstants.W_OK)
    return { ok: true }
  } catch (error: unknown) {
    const err = error as NodeJS.ErrnoException
    if (err.code === 'ENOENT') return { ok: false, reason: 'Folder does not exist' }
    if (err.code === 'EACCES') return { ok: false, reason: 'Folder is not writable' }
    return { ok: false, reason: err.message ?? 'Unknown error' }
  }
}
