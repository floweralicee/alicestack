# lifemaxxing

Track wins across every area of your life. See where you're growing. Get called out when you're not.

Not a task manager. Not a habit tracker. A wins tracker — because you're already doing more than you think, and no one is keeping score.

---

## The 5 life areas

| Area | What it tracks |
|------|---------------|
| 💰 Finance | Money moves, bills, income, savings, financial awareness |
| 🚀 Career | Work, shipping, skills, projects, showing up |
| 🌱 Personal Growth | Learning, reflection, mindset shifts, therapy, journaling |
| 🏃 Health | Movement, sleep, food, going outside, mental health |
| 👥 Relationships | Friends, family, partner, community, self-love |

Every win = 1 point. The heatmap fills. The gaps become visible.

---

## How it works

**The agent finds wins for you.**

You don't need to label anything a win. You write — journal entry, quick note, voice memo — and the agent reads it and translates it into wins across the 5 areas.

"Made dinner" → Health win.
"Replied to that email I'd been avoiding" → Career + Growth win.
"Cried about something and felt better" → Health win.
"Went to the boardwalk even though I didn't feel like it" → Health + Relationships.

The win doesn't need to be dramatic. It doesn't need to be intentional. It doesn't need to be finished.

**Daily, not weekly.** Every day is its own record. A quiet day still has wins. The point is to catch what was real.

**Low area alerts.** When any area hasn't had a win in 5+ days, your next journal prompt includes a gentle nudge: *"Did anything happen there this week you might have missed?"* Not guilt. Just curiosity.

---

## On first install

The skill shows you the default win standard — what counts as a win for each area — and asks if it feels right for you. You can accept the defaults or change any area to match how you actually live. The standard is saved once and used from then on.

[See the defaults →](skill/default-win-instructions.md)

---

## The UI

Two views at http://localhost:5173:

**Month view** — calendar grid with colored area dots on each day. Click any day to see the wins.

**Year view** — GitHub-style heatmap per life area, 52 weeks across. This is where you see the shape of your year.

---

## Setup

### Step 1 — Skill onboarding (chat)

Load the skill in any agent (OpenClaw, Claude Code, Hermes, etc.):

```
Load the skill at lifemaxxing/skill/SKILL.md
```

Answer Q1–Q3 in chat. The skill saves `~/.lifemaxxing/config.json` and you're set.

### Step 2 — Optional: run the UI locally

```bash
cd lifemaxxing/ui
npm install
cp server/.env.example server/.env
# Optional: add AI_GATEWAY_API_KEY for server-side win extraction
npm run dev
```

Open http://localhost:5173 to see your calendar and heatmap.

---

## Structure

```
lifemaxxing/
├── skill/
│   ├── SKILL.md                      ← agent instructions (load this)
│   ├── default-win-instructions.md   ← default win standard, shown at install
│   └── win-criteria/                 ← detailed examples per area
│       ├── finance.md
│       ├── career.md
│       ├── growth.md
│       ├── health.md
│       └── relationships.md
└── ui/
    ├── src/                          ← React frontend (month + year views)
    └── server/                       ← Hono server + optional AI extraction
```

---

*Part of [alicestack](../README.md)*

The win-finding agent logic is adapted from Alice's `agent_wins_instructions_v2.md`.
The UI is adapted from [win-calendar](https://github.com/floweralicee/win-calendar).
