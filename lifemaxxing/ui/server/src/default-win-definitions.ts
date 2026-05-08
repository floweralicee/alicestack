/**
 * One-line defaults per area — aligned with `prompts.ts` THE 5 AREAS and
 * `skill/win-criteria/*.md` “what counts” intros.
 */
export const LIFE_AREA_KEYS = [
  'finance',
  'career',
  'growth',
  'health',
  'relationships',
] as const
export type LifeAreaKey = (typeof LIFE_AREA_KEYS)[number]

export const DEFAULT_WIN_DEFINITIONS: Record<LifeAreaKey, string> = {
  finance:
    'Anything that improves financial awareness, stability, or growth—including small money moves.',
  career:
    'Work, shipping, learning on the job, projects, skills, pitches, and showing up professionally.',
  growth:
    'Reflection, learning, mindset shifts, naming patterns, journaling, therapy, naming change.',
  health:
    'Movement, sleep, food, hydration, going outside, mental health, healthier boundaries.',
  relationships:
    'Friends, family, partner, community, self-love, real conversations, showing up for people.',
}

/** Merge saved overrides onto defaults; blank override values fall back to default. */
export function getEffectiveWinDefinitions(
  overrides: Record<string, string> | null | undefined,
): Record<LifeAreaKey, string> {
  const merged = { ...DEFAULT_WIN_DEFINITIONS }
  if (!overrides) return merged
  for (const key of LIFE_AREA_KEYS) {
    const v = overrides[key]?.trim()
    if (v) merged[key] = v
  }
  return merged
}
