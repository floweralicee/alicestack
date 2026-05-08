# life-coach

An AI skill that knows you well enough to call your bullshit.

Builds a God's-eye view of who you are from your conversation history — or your journal if you keep one. Names your patterns before you finish describing them. Calls out what you're rationalizing as strategy when it's actually fear. Makes the fear specific so it's smaller.

No soft answers. No generic advice. It knows this specific person.

---

## Quick start

```
Load the skill at life-coach/SKILL.md
```

First run asks 5 questions to build your profile from conversation. Every session after, it remembers and builds on what it knows.

---

## What it does

**Calls patterns.** When you're running a loop — avoidance, perfectionism, the late-night pivot — it names it before you finish the sentence.

**Mirrors the truth.** Uses the Dan Koe framework to answer the hard questions about your identity, your unconscious goals, and the gap between what you say and what you do. Shows you the answer. Says: "Tell me where I'm wrong."

**Surfaces evidence.** When you say you can't do something, it pulls from your wins history to show you've already done it. Not "you can do this." Actual proof.

**Runs the game.** Daily quests, season arcs, Clarity Tokens, named Villager characters for your recurring patterns. Growth feels like arriving somewhere, not grinding.

---

## Works with lifemaxxing

life-coach reads from `~/.alicestack/wins/timeline.md` (written by lifemaxxing) to:
- See which areas of life are going quiet
- Connect quiet areas to active Villager patterns
- Pull real evidence from your win history when you need it

life-coach writes to `~/.alicestack/game-state.md` so lifemaxxing can:
- Include Villager status in the morning brief
- Flag when wins look like pattern behavior, not real progress
- Connect arc progress to daily scores

[See shared state schema →](../shared/state-schema.md)

---

## The game layer

| Thing | What it is |
|-------|------------|
| Daily quest | Today's ONE THING, tracked |
| Season arc | 2–8 week sprint toward your main goal |
| Clarity Token | Earned by completing quests, catching your own patterns |
| Villager | A named pattern character — appears when the pattern fires |

Token unlocks: 10 → choose your quest · 25 → rest day · 50 → big picture session · 100 → full retrospective

---

## Optional: point it at your files

```
"My profile files are at [path]. Read them."
```

Works with Obsidian vault, plain markdown, or `~/.alicestack/`. Profile template at `profile-template/`.

---

## Files

```
life-coach/
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

*Part of [alicestack](../README.md)*
