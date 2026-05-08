import { Hono } from 'hono'
import { generateText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { readConfig } from '../config-store.js'
import { appendWinsToTimeline } from '../obsidian.js'
import { LIFEMAXXING_SYSTEM_PROMPT, WIN_EXTRACTION_USER_PROMPT } from '../prompts.js'
import { getRecentAreaScores } from '../area-scores.js'

const journal = new Hono()

journal.post('/api/journal', async (c) => {
  try {
    const { text, date } = await c.req.json<{ text: string; date?: string }>()
    if (!text?.trim()) return c.json({ error: 'No text provided' }, 400)

    const today = date ?? new Date().toISOString().slice(0, 10)
    const config = readConfig()

    // Find areas with no wins in the last 5 days
    const recentScores = await getRecentAreaScores(config.obsidianPath, 5)
    const lowAreas = Object.entries(recentScores)
      .filter(([, score]) => score === 0)
      .map(([area]) => area)

    // Call Claude to extract wins
    const openai = createOpenAI({ apiKey: process.env.AI_GATEWAY_API_KEY ?? '' })
    const { text: result } = await generateText({
      model: openai('anthropic/claude-haiku-4-5'),
      system: LIFEMAXXING_SYSTEM_PROMPT,
      prompt: WIN_EXTRACTION_USER_PROMPT(text, today, lowAreas),
    })

    let parsed: {
      date: string
      wins: { title: string; areas: string[] }[]
      scores: Record<string, number>
      lowAreaAlert: { area: string; daysSince: number; prompt: string } | null
    }

    try {
      parsed = JSON.parse(result)
    } catch {
      return c.json({ error: 'Failed to parse wins from AI response', raw: result }, 500)
    }

    // Append wins to timeline-life.md
    const winCount = parsed.wins.length
    if (winCount > 0 && config.obsidianPath) {
      for (const win of parsed.wins) {
        const primaryArea = win.areas[0] ?? 'growth'
        await appendWinsToTimeline(config.obsidianPath, {
          date: parsed.date,
          title: win.title,
          area: primaryArea,
          body: `**Areas:** ${win.areas.join(', ')}`,
        })
      }
    }

    return c.json({
      winsFound: winCount,
      scores: parsed.scores,
      lowAreaAlert: parsed.lowAreaAlert,
      message: winCount === 1
        ? `Found 1 win today.`
        : `Found ${winCount} wins today.`,
    })
  } catch (err) {
    console.error('[journal]', err)
    return c.json({ error: 'Something went wrong' }, 500)
  }
})

// Quick win from Hana pet — single text entry
journal.post('/api/wins/quick', async (c) => {
  try {
    const { text, date } = await c.req.json<{ text: string; date?: string }>()
    if (!text?.trim()) return c.json({ error: 'No text provided' }, 400)

    const today = date ?? new Date().toISOString().slice(0, 10)
    const config = readConfig()

    const openai = createOpenAI({ apiKey: process.env.AI_GATEWAY_API_KEY ?? '' })
    const { text: result } = await generateText({
      model: openai('anthropic/claude-haiku-4-5'),
      system: LIFEMAXXING_SYSTEM_PROMPT,
      prompt: WIN_EXTRACTION_USER_PROMPT(text, today),
    })

    let parsed: { wins: { title: string; areas: string[] }[]; scores: Record<string, number> }
    try { parsed = JSON.parse(result) } catch { parsed = { wins: [], scores: {} } }

    if (parsed.wins.length > 0 && config.obsidianPath) {
      for (const win of parsed.wins) {
        await appendWinsToTimeline(config.obsidianPath, {
          date: today,
          title: win.title,
          area: win.areas[0] ?? 'growth',
          body: `**Areas:** ${win.areas.join(', ')}`,
        })
      }
    }

    return c.json({ wins: parsed.wins, scores: parsed.scores })
  } catch (err) {
    console.error('[wins/quick]', err)
    return c.json({ error: 'Something went wrong' }, 500)
  }
})

export default journal
