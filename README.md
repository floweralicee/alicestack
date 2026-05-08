# alicestack

Alice's personal AI stack — the skills, systems, and tools she built and uses every day.

Not a productivity framework. Not a course. Just the actual thing, shared so you can fork it and make it yours.

---

## What's in here

### `truth-mirror/`

A life mentor skill that builds a God's-eye view of who you are from your conversation history — and refuses to let you lie to yourself about the gap between what you say you want and what you're actually doing.

It knows your patterns. It names them before you finish describing the situation. It pushes back like a debate partner, not a cheerleader.

It also runs a game layer modeled after Animal Crossing: daily quests, streaks, Clarity Tokens, named Villager characters for your recurring patterns, and season arcs toward your big goal. Growth feels like arriving somewhere, not just grinding.

Works immediately with zero setup. Chat history builds your profile automatically. Optional: point it at your Obsidian vault or any `.md` files and it gets significantly more precise.

[Read more →](truth-mirror/README.md)

---

### `lifemaxxing/`

Track wins across every area of your life. See where you're growing. Get called out when you're not.

Five areas: Finance, Career, Personal Growth, Health, Relationships. Every win = 1 point. The heatmap fills. The gaps become visible.

The agent reads whatever you wrote — journal, notes, a voice memo transcript — and finds the wins you forgot about. "Made dinner" is a Health win. "Replied to that email I'd been avoiding" is Career + Growth. Nothing needs to be dramatic, intentional, or finished.

Includes a default win standard that's shown on first install, which the user can accept or customize per area.

[Read more →](lifemaxxing/README.md)

---

## Alice's setup

Alice is a former Marvel and 3A game animator, now an independent builder and creator based in San Francisco. She runs on clarity, not discipline — when she knows what she's doing and why, she can't stop. When the map disappears, everything stalls.

Her stack is built around that reality:

**Self-knowledge first.** She keeps an operating system (`os.md`), an intelligence profile, a goals file, a wins log, and a patterns file. These aren't productivity templates — they're the actual files her agents read so they already know her context before she says a word.

**Agents that know her.** Every agent she uses reads her OS files first. The goal is an agent that knows her energy model, her patterns, and her current main focus — so she doesn't re-explain herself every session.

**Game layer on top of real work.** The `truth-mirror` skill runs a game state in her Obsidian vault. Daily quests, a token system with real unlockables, Villager characters for her recurring patterns, a season arc for her current sprint. The vault is the island. Work updates the island.

**Life tracked daily.** The `lifemaxxing` skill runs every day. It reads what she wrote, finds what she did, and scores it across the 5 life areas. The heatmap shows the shape of the year. The gaps become hard to ignore.

**Content pipeline built in.** She films raw thoughts on camera, runs them through Whisper transcription, generates a canvas mind map in Obsidian, restructures the video into labeled clips, and extracts post seeds for X and RedNote — all from one workflow.

**Humanizer on everything.** Any AI output that goes out into the world gets a humanizer pass. English uses [blader/humanizer](https://github.com/blader/humanizer). Chinese uses [op7418/Humanizer-zh](https://github.com/op7418/Humanizer-zh).

---

## How to use this

**Just want truth-mirror?**
```
Load the skill at truth-mirror/SKILL.md
```
Start talking. Builds your profile from conversation — no setup needed.

**Just want lifemaxxing?**
```
Load the skill at lifemaxxing/skill/SKILL.md
```
Follow Q1–Q3 in chat to set up. Agent finds wins daily from whatever you write.

**Want the full setup?**
Start with `truth-mirror/profile-template/` — fill in `os.md`, `intelligence.md`, `goals.md`, `wins.md`, and `patterns.md`. Once those exist, any agent in this stack can read them and actually know you.

---

## Philosophy

Most AI tools treat you like a generic user. This stack treats you like a specific person with a specific operating system, specific patterns, and a specific thing you're building.

The agents don't give advice. They give you back what you already know — the parts you're not letting yourself see clearly.

The goal isn't productivity. It's clarity. And it's seeing, over time, that you're already doing more than you think.

---

## Links

- Alice on X: [@flower_alicee](https://x.com/flower_alicee)
- Alice on RedNote: flower_alicee
- [win-calendar](https://github.com/floweralicee/win-calendar) — the calendar UI lifemaxxing is built on
- [blader/humanizer](https://github.com/blader/humanizer) — EN humanizer
- [op7418/Humanizer-zh](https://github.com/op7418/Humanizer-zh) — ZH humanizer
- [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) — Obsidian canvas + markdown skills

---

*Built for Alice. Shared for anyone who wants it.*
