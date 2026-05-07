# truth-mirror

A life mentor skill that knows you well enough to call your bullshit.

It builds a God's-eye view of who you are from your chat history — or your journal,
vault, or profile files if you have them. It uses that to mirror your patterns back,
push back like a debate partner, and run a game layer that makes growth feel like
Animal Crossing: quests, streaks, tokens, named pattern characters, season arcs.

No soft answers. No generic advice. It knows this specific person.

---

## Quick start

Works immediately with zero setup. Just load the skill and start talking.

```
Load the skill at [path]/truth-mirror/SKILL.md
```

On first run it asks 5 questions to build your profile from the conversation.
Every session after, it remembers and builds on what it knows.

---

## Optional: point it at your files

If you have a journal, Obsidian vault, or any notes about yourself — tell it:

> "My profile files are at [path]. Read them."

It reads whatever is there and uses it. Obsidian users, plain MD, doesn't matter.

Profile template at `profile-template/` — copy and fill in if starting from scratch.

---

## What it does

**Knows you.** Builds a pattern library from your history. Updates it every session.

**Calls your patterns.** When you're running a loop — avoidance, perfectionism, the
late-night pivot — it names it before you finish describing the situation.

**Mirrors the truth.** Uses the Dan Koe framework to answer the hard questions about
your identity, your unconscious goals, and the gap between what you say and what you do.
Then shows you the answer and says "tell me where I'm wrong."

**Runs the game.** Daily quests. Weekly challenges. Season arcs toward your big goal.
Clarity Tokens with real unlockables. Named Villager characters for your recurring
patterns. An island (your vault or conversation state) that visibly grows as you do.

**Sounds human.** Runs a humanizer pass on all output — English or Chinese — so it
hits like a real person, not a well-prompted AI.

---

## Game layer quick reference

| Thing | What it is |
|-------|-----------|
| Daily quest | Today's ONE THING, registered and tracked |
| Weekly quest | Bigger goal, 7 days |
| Season arc | The 2-8 week sprint toward your main goal |
| Clarity Token | Earned by completing quests, logging wins, catching your own patterns |
| Villager | A named pattern character — appears when the pattern fires |
| Island | Your game state — lives in `06_WINS/_game-state.md` or conversation |

**Token unlocks:**
- 10 → choose your own weekly quest
- 25 → rest day, no pushback
- 50 → big picture session, adjust direction
- 100 → full retrospective, last month's pattern map

---

## Humanizer

English output → humanizer (blader/humanizer)
Chinese output → humanizer-zh (op7418/Humanizer-zh)
Mixed → split and apply both

---

## For other people using this skill

Fork it. Fill in `profile-template/` with your own files. Point the skill at your folder.
Or just start talking — chat history mode builds your profile automatically from what
you say across sessions.

The skill is only as honest as the person using it. It can see your patterns. It cannot
make you look at them.

---

## Files

```
truth-mirror/
├── SKILL.md                    ← load this
├── README.md                   ← you are here
└── profile-template/
    ├── README.md               ← how to set up your profile
    ├── os.md                   ← how you operate
    ├── intelligence.md         ← how you think
    ├── goals.md                ← what you're building
    ├── wins.md                 ← evidence log
    └── patterns.md             ← loops you've noticed
```
