# imposter-syndrome-killer

**This is what's going to kill your imposter syndrome and torture yourself into greatness.**

The skill that helps you reach your highest potential — by showing you evidence of who you already are.

Not "you've got this" with nothing behind it. Not generic encouragement from an AI that doesn't know your history. This one has your receipts. It's been reading your timeline. When you say "I haven't done anything" — it shows you what you actually did.

---

## What makes it different from generic AI

Every AI tries to cheer you on. But it has no idea whether you deserve it. It doesn't know what you did last Tuesday. It doesn't know what you've been doing for six months. So when it says "great job," it's just saying words.

The imposter-syndrome killer cheers you on with evidence. It's been logging your wins daily — across 5 areas of life — so when you feel behind, it can show you exactly where you've been moving. Your wins log exists. Your AI just hasn't been reading it.

That's the difference. "Great job" means nothing without proof. This one has the proof.

---

## The receipts that kill imposter syndrome

The kill shot isn't "you can do this." It's: *"Six months ago you said you froze every time you had to pitch. You just pitched to three people this week. That happened."*

That's what this skill does. It tracks you against your own baseline — not the person next to you at the coffee shop. Your win looks different from theirs. That's the point.

---

## But it knows when to call it in

The imposter-syndrome killer knows when you need the truth teller.

When an area has gone quiet for too long — no wins in health for 9 days, relationships silent for 2 weeks — it doesn't just log it. It passes the signal to truth-teller: *"Something's been quiet here. You should ask what's going on."*

Because cheering someone through avoidance isn't support. It's just comfortable.

---

## Quick start

```
Load the skill at imposter-syndrome-killer/skill/SKILL.md
```

Follow Q1–Q3 in chat. It shows you the default win standard first — what counts as a win — and asks if it feels right for you.

---

## The 5 life areas

| Area | What it tracks |
|------|---------------|
| 💰 Finance | Money moves, bills, income, savings, awareness |
| 🚀 Career | Work, shipping, skills, projects, showing up |
| 🌱 Personal Growth | Learning, reflection, mindset shifts, journaling |
| 🏃 Health | Movement, sleep, food, going outside, mental health |
| 👥 Relationships | Friends, family, partner, community, self-love |

Every win = 1 point. The heatmap fills. The gaps become visible.

---

## What it does

**Finds wins you forgot.** Reads whatever you wrote — journal, notes, chat — and translates it into wins. "Made dinner" is a Health win. "Replied to that email I'd been avoiding" is Career + Growth. Nothing needs to be dramatic, intentional, or finished.

**Tracks you against yourself.** Your win is going to look different than someone else's win. The heatmap compares you to your own baseline — not to the founder next to you at the coffee shop.

**Shows you proof when you need it.** When you're low or dismissing yourself, the system leads with your win history before anything else. Evidence first.

**References your own history.** When it can pull something from what you've said before — "you said last month you couldn't" — it does. That specificity is what makes it land.

**Alerts the truth teller when something goes quiet.** When an area hasn't had a win in 5+ days and a pattern is active, it connects the dots and hands the signal to truth-teller.

---

## When it hands off to truth-teller

- An area quiet for 5+ days + a Villager is active → truth teller gets the signal
- A win pattern looks like avoidance behavior (building systems instead of shipping) → flags it
- User is over-indexing on one area while others collapse → surfaces the imbalance

---

## On first install

Shows you the default win standard — what counts as a win for each area — and asks if it feels right. Accept or customize. Saved once.

[See the defaults →](skill/default-win-instructions.md)

---

## The UI

Two views at http://localhost:5173:

**Month view** — calendar grid, colored dots by area.
**Year view** — GitHub-style heatmap. The shape of your year.

---

## Setup

```bash
cd imposter-syndrome-killer/ui
npm install && npm run dev
```

---

## Works with truth-teller

Reads `~/.alicestack/game-state.md` — truth-teller's Villager + arc state — to connect quiet areas to active patterns in the morning brief.

Writes `~/.alicestack/wins/timeline.md` so truth-teller can pull evidence when you need proof you can do something.

[Shared state schema →](../shared/state-schema.md)

---

## Structure

```
imposter-syndrome-killer/
├── skill/
│   ├── SKILL.md                      ← load this
│   ├── default-win-instructions.md   ← defaults shown at install
│   └── win-criteria/
└── ui/
    ├── src/
    └── server/
```

---

*Part of [alicestack](../README.md) — the imposter-syndrome killer. Works with [truth-teller](../truth-teller/README.md).*
