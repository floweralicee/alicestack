import { Hono } from 'hono'
import { generateText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { readConfigOrDefault } from '../config-store.js'
import { appendWinToTimeline } from '../obsidian.js'
import { getEffectiveWinDefinitions } from '../default-win-definitions.js'
import { LIFEMAXXING_SYSTEM_PROMPT, WIN_EXTRACTION_USER_PROMPT } from '../prompts.js'
import { getRecentAreaScores } from '../area-scores.js'

const journal = new Hono()

type ExtractedWin = { title: string; areas: string[] }
type ExtractedResult = {
  date: string
  wins: ExtractedWin[]
  scores: Record<string, number>
  lowAreaAlert: { area: string; daysSince: number; prompt: string } | null
}

async function extractWins(
  text: string,
  date: string,
  lowAreas: string[],
  winDefinitions: Record<string, string>,
): Promise<ExtractedResult> {
  const openai = createOpenAI({ apiKey: process.env.AI_GATEWAY_API_KEY ?? '' })
  const { text: result } = await generateText({
    model: openai('anthropic/claude-haiku-4-5'),
    system: LIFEMAXXING_SYSTEM_PROMPT,
    prompt: WIN_EXTRACTION_USER_PROMPT(text, date, lowAreas, winDefinitions),
  })
  try {
    return JSON.parse(result) as ExtractedResult
  } catch {
    return { date, wins: [], scores: { finance:0,career:0,growth:0,health:0,relationships:0,total:0 }, lowAreaAlert: null }
  }
}

// POST /api/journal — end-of-day or morning journal entry
journal.post('/api/journal', async (c) => {
  try {
    const { text, date } = await c.req.json<{ text: string; date?: string }>()
    if (!text?.trim()) return c.json({ error: 'No text provided' }, 400)

    const today = date ?? new Date().toISOString().slice(0, 10)
    const config = readConfigOrDefault()

    // Bug 4 fix: only check area scores if obsidianPath is set and mode is obsidian
    const lowAreas = config.captureMode === 'obsidian' && config.obsidianPath
      ? Object.entries(await getRecentAreaScores(config.obsidianPath, 5))
          .filter(([, score]) => score === 0)
          .map(([area]) => area)
      : []

    const parsed = await extractWins(text, today, lowAreas, getEffectiveWinDefinitions(config.winDefinitions))

    // Bug 2 fix: use appendWinToTimeline (our new simple writer) not the PersistedWin writer
    if (parsed.wins.length > 0) {
      const storagePath = config.obsidianPath || `${process.env.HOME}/.lifemaxxing`
      for (const win of parsed.wins) {
        await appendWinToTimeline(storagePath, {
          date: parsed.date,
          title: win.title,
          areas: win.areas,
          body: win.title,  // body = title for simple entries
        }).catch(err => console.error('[appendWin]', err))
      }
    }

    const winsFound = parsed.wins.length
    return c.json({
      winsFound,
      scores: parsed.scores,
      lowAreaAlert: parsed.lowAreaAlert,
      message: winsFound === 1 ? 'Found 1 win today.' : `Found ${winsFound} wins today.`,
    })
  } catch (err) {
    console.error('[journal]', err)
    return c.json({ error: 'Something went wrong' }, 500)
  }
})

// POST /api/wins/quick — single win from Hana pet
journal.post('/api/wins/quick', async (c) => {
  try {
    const { text, date } = await c.req.json<{ text: string; date?: string }>()
    if (!text?.trim()) return c.json({ error: 'No text provided' }, 400)

    const today = date ?? new Date().toISOString().slice(0, 10)
    const config = readConfigOrDefault()

    const parsed = await extractWins(text, today, [], getEffectiveWinDefinitions(config.winDefinitions))

    if (parsed.wins.length > 0) {
      const storagePath = config.obsidianPath || `${process.env.HOME}/.lifemaxxing`
      for (const win of parsed.wins) {
        await appendWinToTimeline(storagePath, {
          date: today,
          title: win.title,
          areas: win.areas,
          body: win.title,
        }).catch(err => console.error('[appendWin/quick]', err))
      }
    }

    return c.json({ wins: parsed.wins, scores: parsed.scores })
  } catch (err) {
    console.error('[wins/quick]', err)
    return c.json({ error: 'Something went wrong' }, 500)
  }
})

export default journal
