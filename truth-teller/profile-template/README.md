# truth-mirror — Profile Template

This folder is optional. The skill works without it, using your chat history instead.

But if you keep a journal, notes, or an Obsidian vault — pointing the skill at these
files makes it significantly more precise. It's reading evidence you've already written
rather than building the picture from scratch.

## How to use

Create a folder anywhere — in your Obsidian vault, on your desktop, wherever:

```
truth-mirror-profile/
├── os.md           ← how you operate
├── intelligence.md ← how you think and process
├── goals.md        ← what you're building toward
├── wins.md         ← evidence log
└── patterns.md     ← loops you've noticed in yourself
```

On first run, tell the skill the path:
> "My profile is at [path]. Read it."

The skill reads all files and uses them to build your pattern library before the first
question is asked.

## If you already have files under different names

That's fine. Tell the skill what you have:
> "I have an alice_os_v4.md and an intelligence_profile.md in my Obsidian vault at [path]."

It will read whatever you point it at. The template names are just defaults.

## Keeping it current

You don't need to maintain these files manually. The skill will tell you when something
worth adding has surfaced — a new pattern named, a goal shifted, a behavior changed —
and will update the files directly if you give it write access.

If you journal daily, your journal entries are the best source. The skill can read recent
journal entries and extract what's relevant automatically.

## If you use Obsidian

The game state file lives at:
```
06_WINS/_game-state.md
```

If that path doesn't match your vault structure, tell the skill where your wins folder
is and it will adapt.
