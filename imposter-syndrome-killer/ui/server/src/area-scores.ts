import { readFile } from 'fs/promises'
import path from 'path'

/** Canonical win areas — shared with PATCH /api/wins validation and prompts. */
export const LIFE_AREAS = [
  'finance',
  'career',
  'growth',
  'health',
  'relationships',
] as const
export type LifeArea = (typeof LIFE_AREAS)[number]

/**
 * Returns total wins per area over the last N days.
 * Returns 0 for any area with no wins in that window.
 */
export async function getRecentAreaScores(
  obsidianPath: string,
  days: number
): Promise<Record<LifeArea, number>> {
  const scores = Object.fromEntries(
    LIFE_AREAS.map((a) => [a, 0]),
  ) as Record<LifeArea, number>

  if (!obsidianPath) return scores

  const timelinePath = path.join(obsidianPath, 'WinCalendar', 'timeline-life.md')
  let content: string
  try {
    content = await readFile(timelinePath, 'utf-8')
  } catch {
    return scores
  }

  // Date cutoff
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)

  // Parse wins with area field
  const blocks = content.split(/\n(?=## )/)
  for (const block of blocks) {
    const dateMatch = block.match(/## (\w+ \d+, \d{4})/)
    if (!dateMatch) continue
    const date = new Date(dateMatch[1])
    if (isNaN(date.getTime()) || date < cutoff) continue

    const areaMatch = block.match(/^area:\s*(\w+)/m)
    if (!areaMatch) continue
    const area = areaMatch[1].toLowerCase() as LifeArea
    if (area in scores) scores[area]++
  }

  return scores
}
