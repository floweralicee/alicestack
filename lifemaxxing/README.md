# lifemaxxing

Track wins across every area of your life. See where you're growing. Get called out when you're not.

Not a task manager. Not a habit tracker. A wins tracker — because you're already doing more than you think, and no one is keeping score.

---

## The 5 areas

| Area | What it tracks |
|------|---------------|
| 💰 Finance | Money moves, bills, income, savings, financial awareness |
| 🚀 Career | Work, shipping, skills, projects, showing up |
| 🌱 Personal Growth | Learning, reflection, mindset shifts, therapy, journaling |
| 🏃 Health | Movement, sleep, food, going outside, mental health |
| 👥 Relationships | Friends, family, partner, community, self-love |

Every win = 1 point. The heatmap fills. The gaps become visible.

---

## How to log wins

**Primary path:** Through your **agent** (OpenClaw, Hermes, etc.) using the **`lifemaxxing/skill`** instructions — you answer setup in chat, paste or describe your day, and the agent finds wins and appends them to your timeline markdown (Obsidian vault or `~/.lifemaxxing`).

Optional: run the **`ui`** dev server so **`POST /api/journal`** can extract wins via the gateway (**`AI_GATEWAY_API_KEY`** in `server/.env`). Prefer file-based appends when the server is off.

The **browser UI does not replace chat logging** — it is for viewing the calendar/heatmap and opening **Profile** to adjust the same settings the skill wrote (`~/.lifemaxxing/config.json`).

---

## What the agent does

Reads your journal and translates it into wins — including the ones you forgot about.

"Made dinner" → Health win.
"Replied to that email I'd been avoiding" → Career win.
"Cried about something and felt better" → Health + Growth win.

When an area hasn't had a win in 5+ days, your next journal prompt includes a gentle nudge question toward that area. Not guilt. Just: *"Did anything happen there this week you might have missed?"*

---

## The UI

**Month view** — calendar grid, colored area dots each day (see [win-calendar](https://github.com/floweralicee/win-calendar)).

**Year view** — GitHub-style heatmap per area.

Use **Profile** in the UI to tweak capture mode, reminders, timezone, vault path (Obsidian mode), and per-area win definitions once the skill has created `config.json`.

---

## Setup

1. **Skill / chat onboarding** — With the agent, follow **Q1→Q3** in [`skill/SKILL.md`](skill/SKILL.md) so `~/.lifemaxxing/config.json` exists (see the skill for default win meanings and timeline paths).

2. **Optional: view dashboard locally**

From the repo root (`lifemaxxing/`):

```bash
cd lifemaxxing
npm install
cp ui/server/.env.example ui/server/.env
# For optional AI extraction routes only: add AI_GATEWAY_API_KEY to ui/server/.env
npm run dev
```

Or only inside **`lifemaxxing/ui`**: install there, copy `server/.env.example`, then `npm run dev`.

Open http://localhost:5173 — use **Profile** to edit saved answers; wins still flow from the agent or optional API routes as described in the skill.

## Structure

```
lifemaxxing/
├── skill/              ← the agent skill
│   ├── SKILL.md        ← win-finding agent instructions
│   └── win-criteria/   ← what counts as a win per area
└── ui/                 ← the localhost web app
    ├── src/            ← React frontend
    └── server/         ← Hono server + AI extraction
```

---

## Part of alicestack

This is one tool in Alice's personal AI stack. See [../README.md](../README.md) for the full stack.

The win-finding agent logic is adapted from Alice's `agent_wins_instructions_v2.md`.
The UI is adapted from [win-calendar](https://github.com/floweralicee/win-calendar).
