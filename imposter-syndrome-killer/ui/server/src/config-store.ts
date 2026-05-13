import { promises as fs, constants as fsConstants } from 'node:fs'
import { readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import {
  getEffectiveWinDefinitions,
  LIFE_AREA_KEYS,
  type LifeAreaKey,
} from './default-win-definitions.js'

const CONFIG_DIR = path.join(os.homedir(), '.lifemaxxing')
const CONFIG_PATH = path.join(CONFIG_DIR, 'config.json')

export type CaptureMode = 'obsidian' | 'textbox' | 'hana'
export type ReminderMode = 'morning' | 'evening' | 'none'

export type StoredConfig = {
  captureMode: CaptureMode
  obsidianPath: string
  reminderMode: ReminderMode
  reminderTime: string
  timezone: string
  winDefinitions: Record<string, string>
}

export type PublicConfig = {
  onboarded: boolean
  captureMode?: CaptureMode
  obsidianPath?: string
  reminderMode?: ReminderMode
  reminderTime?: string
  timezone?: string
  /** User-authored overrides stored on disk; empty string / missing keys use defaults. */
  winDefinitions?: Record<string, string>
  /** Defaults merged with overrides for prompts and UI. */
  effectiveWinDefinitions: Record<string, string>
  /** True when user has saved non-empty custom text for that area. */
  winDefinitionCustomized: Record<string, boolean>
}

async function ensureConfigDir(): Promise<void> {
  await fs.mkdir(CONFIG_DIR, { recursive: true, mode: 0o700 })
}

/** Sync read for hot paths — returns null if config doesn't exist yet */
export function readConfig(): StoredConfig | null {
  if (!existsSync(CONFIG_PATH)) return null
  try {
    const raw = readFileSync(CONFIG_PATH, 'utf8')
    return JSON.parse(raw) as StoredConfig
  } catch {
    return null
  }
}

/** Sync read with fallback defaults — never returns null, for use after onboarding */
export function readConfigOrDefault(): StoredConfig {
  return readConfig() ?? {
    captureMode: 'textbox',
    obsidianPath: '',
    reminderMode: 'none',
    reminderTime: '21:00',
    timezone: 'America/Los_Angeles',
    winDefinitions: {},
  }
}

export async function writeConfig(config: StoredConfig): Promise<void> {
  await ensureConfigDir()
  await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), { mode: 0o600 })
  await fs.chmod(CONFIG_PATH, 0o600)
}

function winDefinitionCustomizedMap(overrides: Record<string, string>): Record<string, boolean> {
  return Object.fromEntries(
    LIFE_AREA_KEYS.map((k) => [k, Boolean(overrides[k]?.trim())]),
  ) as Record<LifeAreaKey, boolean>
}

/** Public shape when no `config.json` exists yet (chat-first setup). */
export function toPublicConfigUnonboarded(): PublicConfig {
  const overrides: Record<string, string> = {}
  return {
    onboarded: false,
    effectiveWinDefinitions: { ...getEffectiveWinDefinitions(overrides) },
    winDefinitions: {},
    winDefinitionCustomized: winDefinitionCustomizedMap(overrides),
  }
}

export function toPublicConfig(config: StoredConfig): PublicConfig {
  const overrides = config.winDefinitions ?? {}
  return {
    onboarded: true,
    captureMode: config.captureMode,
    obsidianPath: config.obsidianPath,
    reminderMode: config.reminderMode,
    reminderTime: config.reminderTime,
    timezone: config.timezone,
    winDefinitions: config.winDefinitions,
    effectiveWinDefinitions: { ...getEffectiveWinDefinitions(overrides) },
    winDefinitionCustomized: winDefinitionCustomizedMap(overrides),
  }
}

export async function validateObsidianPath(
  candidate: string,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  try {
    const stat = await fs.stat(candidate)
    if (!stat.isDirectory()) return { ok: false, reason: 'Not a directory' }
    await fs.access(candidate, fsConstants.W_OK)
    return { ok: true }
  } catch (err: unknown) {
    const e = err as NodeJS.ErrnoException
    if (e.code === 'ENOENT') return { ok: false, reason: 'Folder does not exist' }
    if (e.code === 'EACCES') return { ok: false, reason: 'Folder is not writable' }
    return { ok: false, reason: e.message ?? 'Unknown error' }
  }
}
