# truth-teller

**This is what's going to torture you into greatness.**

The skill that helps you reach your highest potential — by refusing to let you fool yourself.

It knows your patterns. It knows the gap between what you say you want and what you're actually doing. And unlike every other AI, it can prove it — because it's been reading your history.

---

## What makes it different from generic AI

Every AI tries to push back sometimes. But it's pushing back with no information about you specifically. It's giving advice that could apply to anyone at any stage in any city.

truth-teller pushes back with *your* data. It's seen the pattern three times before. It knows which Villager is running right now. It knows which area of your life has gone quiet. When it calls something out, it's not a heuristic. It's your actual behavior.

That's what makes it land.

---

## But it knows when not to push

The truth teller knows when you need the imposter-syndrome killer first.

When you show up defeated — wins sparse, tone low — truth-teller reads your `wins/timeline.md` before it says anything. It leads with what you've actually done. It hands you evidence before it asks anything hard.

Because calling someone out when they're already down isn't honesty. It's just timing it badly.

---

## Quick start

```
Load the skill at truth-teller/SKILL.md
```

First run asks 5 questions — but only if it can't build your profile from chat history first. Every session after, it remembers.

---

## What it does

**Knows you.** Builds a pattern library from your history. Updates every session.

**Calls patterns.** Names the loop before you finish describing the situation.

**Mirrors the truth.** Answers the hard questions about your identity and unconscious goals — from your own data. Shows you the answer. Says: "Tell me where I'm wrong."

**Leads with wins when you need it.** Reads the imposter-syndrome killer's win history. When you're low, it shows you what you've done before it asks anything hard.

**Runs the game.** Daily quests, season arcs, Clarity Tokens, Villager characters for your patterns. Growth feels like building something.

---

## When it hands off to imposter-syndrome-killer

- You show up defeated or dismissing yourself → imposter-syndrome killer leads with win evidence first
- Wins have been sparse for 5+ days → evidence mode before pattern audit
- You explicitly say you're struggling → receipts first, hard questions later

---

## The game layer

| Thing | What it is |
|-------|------------|
| Daily quest | Today's ONE THING |
| Season arc | 2–8 week sprint toward your main goal |
| Clarity Token | Earned by completing quests, catching your own patterns |
| Villager | A named pattern character — appears when the pattern fires |

Token unlocks: 10 → choose your quest · 25 → rest day · 50 → big picture session · 100 → full retrospective

---

## Works with imposter-syndrome-killer

Reads `~/.alicestack/wins/timeline.md` — the daily win log — to:
- Surface evidence when you say you can't do something
- Connect quiet areas to active Villager patterns
- Lead with wins when you need them

Writes `~/.alicestack/game-state.md` so the imposter-syndrome killer can:
- Include Villager status in the morning brief
- Flag when wins look like pattern behavior, not real progress

[Shared state schema →](../shared/state-schema.md)

---

## Files

```
truth-teller/
├── SKILL.md              ← load this
├── README.md             ← you are here
└── profile-template/
    ├── os.md
    ├── intelligence.md
    ├── goals.md
    ├── wins.md
    └── patterns.md
```

---

*Part of [alicestack](../README.md) — the truth teller. Works with [imposter-syndrome-killer](../imposter-syndrome-killer/README.md).*
