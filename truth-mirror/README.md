# truth-mirror

A life mentor skill that knows you well enough to call your bullshit.

It builds a God's-eye view of who you are from your chat history — or your journal, vault, or profile files if you have them. It uses that to mirror your patterns back, push back like a debate partner, and run a game layer that makes growth feel like Animal Crossing.

No soft answers. No generic advice. It knows this specific person.

---

## Quick start

Works immediately with zero setup.

```
Load the skill at truth-mirror/SKILL.md
```

On first run it asks 5 questions to build your profile from conversation. Every session after, it remembers and builds on what it knows.

---

## Optional: point it at your files

If you have a journal, Obsidian vault, or any notes about yourself:

> "My profile files are at [path]. Read them."

It reads whatever you point it at. Obsidian, plain markdown, doesn't matter. Profile template at `profile-template/` if you're starting from scratch.

---

## What it does

**Knows you.** Builds a pattern library from your history. Updates it every session. The more you talk, the more precisely it mirrors you back.

**Calls your patterns.** When you're running a loop — avoidance, perfectionism, the late-night pivot — it names it before you finish describing the situation.

**Mirrors the truth.** Uses the Dan Koe framework to answer the hard questions about your identity, your unconscious goals, and the gap between what you say and what you do. Then shows you the answer and says: "Tell me where I'm wrong."

**Runs the game.** Daily quests. Weekly challenges. Season arcs toward your big goal. Clarity Tokens with real unlockables. Named Villager characters for your recurring patterns. An island that visibly grows as you do.

**Sounds human.** Runs a humanizer pass on all output — English or Chinese — so feedback hits like a real person talking, not a well-prompted AI.

---

## The game layer

| Thing | What it is |
|-------|------------|
| Daily quest | Today's ONE THING, registered and tracked |
| Weekly quest | Bigger goal, 7 days |
| Season arc | 2–8 week sprint toward your main goal |
| Clarity Token | Earned by completing quests, logging wins, catching your own patterns |
| Villager | A named pattern character — appears when the pattern fires |
| Island | Your game state — lives in `06_WINS/_game-state.md` or conversation |

**Token unlocks:**
- 10 → choose your own weekly quest
- 25 → rest day, no pushback
- 50 → big picture session, adjust direction
- 100 → full retrospective, last month's pattern map

No punishment for missing days. The island just waits.

---

## The Dan Koe mirror

Eight questions answered from your own data — not asked as prompts, but answered based on what the skill already knows about you. Then shown back:

1. What behavior are you calling "lack of discipline" that's actually self-protection?
2. What goal is being served by *not* having what you say you want?
3. Which of your goals were assigned to you vs. actually chosen?
4. What belief would have to die for you to achieve this?
5. Are you building the lifestyle that creates your goal, or waiting until after?
6. You acted. You got feedback. Did you actually adjust?
7. Who do you want to *be* in 1 year — and are today's actions consistent with that person?
8. What known path are you still following that you know doesn't work?

---

## Humanizer

English output → [blader/humanizer](https://github.com/blader/humanizer)
Chinese output → [op7418/Humanizer-zh](https://github.com/op7418/Humanizer-zh)
Mixed → split and apply both

---

## For other people

Fork it. Fill in `profile-template/` with your own files. Point the skill at your folder. Or just start talking — chat history mode builds the profile automatically.

The skill is only as honest as the person using it. It can see your patterns. It can't make you look at them.

---

## Files

```
truth-mirror/
├── SKILL.md                 ← load this
├── README.md                ← you are here
└── profile-template/
    ├── README.md            ← how to set up your profile
    ├── os.md                ← how you operate
    ├── intelligence.md      ← how you think
    ├── goals.md             ← what you're building
    ├── wins.md              ← evidence log
    └── patterns.md          ← loops you've noticed
```

---

*Part of [alicestack](../README.md)*
