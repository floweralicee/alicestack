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

**3 ways — pick one at setup:**

1. **Obsidian** — point it at your journal folder. Agent reads nightly and finds wins.
2. **End-of-day text box** — write freely. Agent extracts the wins for you.
3. **Hana desktop pet** — she lives on your screen. Type a win → she burps. Win logged.

You don't need to label wins yourself. The agent finds them in whatever you wrote.

---

## What the agent does

Reads your journal and translates it into wins — including the ones you forgot about.

"Made dinner" → Health win.
"Replied to that email I'd been avoiding" → Career win.
"Cried about something and felt better" → Health + Growth win.

When an area hasn't had a win in 5+ days, your next journal prompt includes a gentle nudge question toward that area. Not guilt. Just: *"Did anything happen there this week you might have missed?"*

---

## The UI

Two views:

**Month view** — calendar grid, colored area dots on each day, click any day to see wins.

**Year view** — GitHub-style heatmap per area, 52 weeks across. This is where you see the shape of your year.

---

## Setup

```bash
cd lifemaxxing/app
npm install
cp server/.env.example server/.env
# Add your AI_GATEWAY_API_KEY to server/.env
npm run dev
```

Open http://localhost:5173. Answer 3 setup questions. Start logging.

---

## Desktop pet (optional)

Hana is the default pet. She burps when you log a win. She lives in the corner of your screen. You can talk to her instead of opening the app.

To enable: choose "desktop pet" during setup. Hana will ask for her own config (she needs the server running).

---

## Part of alicestack

This is one tool in Alice's personal AI stack. See [../README.md](../README.md) for the full stack.

The win-finding agent logic is adapted from Alice's `agent_wins_instructions_v2.md`.
The UI is adapted from [win-calendar](https://github.com/floweralicee/win-calendar).
The desktop pet is Hana from [animini-os](https://github.com/floweralicee/animini-os).
