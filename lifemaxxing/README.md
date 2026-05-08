# lifemaxxing

Track wins across every area of your life. See where you're growing. Get called out when you're not.

Not a task manager. Not a habit tracker. A daily wins tracker — because you're already doing more than you think, and no one is keeping score.

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

The agent reads whatever you wrote — journal entry, quick note — and finds the wins you forgot about.

"Made dinner" → Health win.
"Replied to that email I'd been avoiding" → Career + Growth win.
"Cried about something and felt better" → Health win.

The win doesn't need to be dramatic. Doesn't need to be intentional. Doesn't need to be finished.

**Daily, not weekly.** Every day is its own record. A quiet day still has wins.

**Low area alerts.** When any area hasn't had a win in 5+ days, your next journal prompt includes a gentle nudge. Not guilt. Just: *"Did anything happen there you might have missed?"*

---

## Works with life-coach

lifemaxxing reads from `~/.alicestack/game-state.md` (written by life-coach) to:
- Connect quiet areas to active Villager patterns in the morning brief
- Flag when wins look like pattern behavior rather than real progress
- Include arc progress in the daily summary

lifemaxxing writes to `~/.alicestack/wins/timeline.md` so life-coach can:
- Pull area scores to surface what's going quiet
- Find evidence of past wins when the user needs proof they can do something
- Connect real life data to the patterns it sees

[See shared state schema →](../shared/state-schema.md)

---

## On first install

The skill shows you the default win standard — what counts as a win for each area — and asks if it feels right. Accept the defaults or change any area. Saved once, used from then on.

[See the defaults →](skill/default-win-instructions.md)

---

## The UI

Two views at http://localhost:5173:

**Month view** — calendar grid with colored area dots on each day.

**Year view** — GitHub-style heatmap per life area. This is where you see the shape of your year.

---

## Setup

```
Load the skill at lifemaxxing/skill/SKILL.md
```

Follow Q1–Q3 in chat. Saves to `~/.lifemaxxing/config.json`. Done.

**Optional: run the UI locally**
```bash
cd lifemaxxing/ui
npm install && npm run dev
```

---

## Structure

```
lifemaxxing/
├── skill/
│   ├── SKILL.md                      ← load this
│   ├── default-win-instructions.md   ← defaults shown at install
│   └── win-criteria/                 ← detailed examples per area
└── ui/
    ├── src/                          ← React (month + year views)
    └── server/                       ← Hono + AI extraction
```

---

*Part of [alicestack](../README.md)*

UI adapted from [win-calendar](https://github.com/floweralicee/win-calendar).
