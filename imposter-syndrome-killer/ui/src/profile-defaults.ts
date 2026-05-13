/** Mirror of `server/default-win-definitions.ts` — used to detect “matches default”. */
export const PROFILE_AREA_IDS = [
  'finance',
  'career',
  'growth',
  'health',
  'relationships',
] as const
export type ProfileAreaId = (typeof PROFILE_AREA_IDS)[number]

export const DEFAULT_WIN_DEFINITION_LINES: Record<ProfileAreaId, string> = {
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

export const PROFILE_AREA_META: { id: ProfileAreaId; label: string; emoji: string }[] = [
  { id: 'finance', emoji: '💰', label: 'Finance' },
  { id: 'career', emoji: '🚀', label: 'Career' },
  { id: 'growth', emoji: '🌱', label: 'Personal growth' },
  { id: 'health', emoji: '🏃', label: 'Health' },
  { id: 'relationships', emoji: '👥', label: 'Relationships' },
]
