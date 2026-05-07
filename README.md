# astack

This is Alice's personal AI stack — the skills, systems, and setup she uses to think,
create, and grow with AI agents.

Not a productivity framework. Not a course. Just the actual thing she built and uses
every day, shared so you can fork it and make it yours.

---

## What's in here

### `truth-mirror/`

The main one. A life mentor skill that builds a real picture of who you are from your
conversation history — or your journal if you keep one — and refuses to let you lie
to yourself about the gap between what you say you want and what you're actually doing.

It knows your patterns. It names them. It pushes back.

It also runs a game layer modeled after Animal Crossing — daily quests, streaks, tokens,
named pattern characters (Villagers), and season arcs toward your big goal. Growth feels
like arriving somewhere, not just grinding.

Works immediately with no setup. Chat history mode builds your profile automatically.
Optional: point it at your Obsidian vault or any folder of `.md` files and it gets
significantly more precise.

[Read more →](truth-mirror/README.md)

---

## Alice's setup

Alice is a former film and 3A game animator turned independent builder and creator.
She runs on clarity, not discipline — when she knows what she's doing and why, she can't
stop. When the map disappears, everything stalls.

Her stack is built around that reality:

- **Self-knowledge first.** She keeps an operating system (`os.md`), an intelligence
  profile, a goals file, a wins log, and a patterns file. These aren't productivity
  templates — they're the actual files her agents read to know who they're talking to.

- **Agents that know her.** Every agent she uses reads her OS files before doing
  anything. The goal is an agent that already knows her context, her energy model, her
  patterns, and her current main line — so she doesn't have to re-explain herself every
  session.

- **A game layer on top of real work.** The `truth-mirror` skill runs a game state in
  her Obsidian vault. Daily quests, a token system with real unlockables, Villager
  characters for her recurring patterns, and a season arc tracking her current sprint.
  The vault is the island. Work updates the island.

- **Content pipeline built in.** She films raw thoughts on camera, runs them through
  Whisper transcription, generates a canvas mind map in Obsidian, restructures the video
  into labeled clips, and extracts post seeds for X and RedNote — all from one workflow.
  The vault holds every transcript, canvas, and final script.

- **Humanizer on everything.** Any substantial AI output — feedback, scripts, content —
  gets a humanizer pass before she reads or publishes it. English uses
  [blader/humanizer](https://github.com/blader/humanizer). Chinese uses
  [op7418/Humanizer-zh](https://github.com/op7418/Humanizer-zh).

---

## How to use this

**Just want the truth-mirror skill?**
```
Load the skill at truth-mirror/SKILL.md
```
Start talking. No setup required. It builds your profile from conversation.

**Want to point it at your own files?**
Copy `truth-mirror/profile-template/` somewhere, fill in the files, tell the skill the
path. Works with Obsidian or plain markdown.

**Want to build your own version of Alice's stack?**
The files in `truth-mirror/profile-template/` are the starting point. Build:
- `os.md` — how you actually operate (not how you think you should)
- `intelligence.md` — how you actually think
- `goals.md` — what you're building and why
- `wins.md` — evidence log, updated frequently
- `patterns.md` — the loops you've caught yourself running

Once those exist, any agent you use can read them and actually know you.

---

## Philosophy

Most AI tools treat you like a generic user. This stack treats you like a specific
person with a specific operating system, specific patterns, and a specific thing you're
trying to build.

The agents here don't give advice. They give you back what you already know — the parts
you're not letting yourself see clearly. The game layer makes it so showing up every day
feels like building something, not just maintaining discipline.

The goal isn't productivity. It's clarity. Clarity is what actually moves Alice.
It might be what moves you too.

---

## More

- Alice on X: [@flower_alicee](https://x.com/flower_alicee)
- Alice on RedNote: flower_alicee
- [blader/humanizer](https://github.com/blader/humanizer) — EN humanizer skill
- [op7418/Humanizer-zh](https://github.com/op7418/Humanizer-zh) — ZH humanizer skill
- [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) — Obsidian canvas + markdown skills

---

*Built for Alice. Shared for anyone who wants it.*
