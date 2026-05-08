# alicestack — shared state schema

Both `life-coach` and `lifemaxxing` read and write from the same folder at runtime:

```
~/.alicestack/
├── profile.md          ← who this person is (life-coach writes, lifemaxxing reads)
├── game-state.md       ← patterns, arc, tokens, Villagers (life-coach owns)
└── wins/
    └── timeline.md     ← daily wins + area scores (lifemaxxing owns, life-coach reads)
```

---

## profile.md

Written by life-coach on first install. Read by lifemaxxing to personalize win criteria.

Fields:
- name
- operating mode (clarity-driven, deadline-driven, etc.)
- peak window
- current main goal
- active patterns (named Villagers)
- custom win definitions per area

---

## game-state.md

Written and read by life-coach. Read by lifemaxxing for morning brief and Villager alerts.

Format:
```
[GAME STATE — YYYY-MM-DD]

Clarity Tokens: N
Current streak: N days
Active quest: [text] [started date]
Weekly quest: [text] [N/7 days]
Active arc: [name] — Day N — [current/target]

Villagers:
  [emoji] [name]: active/quiet/dormant ([detail])
```

---

## wins/timeline.md

Written by lifemaxxing after each journal entry. Read by life-coach for evidence and pattern correlation.

Format matches win-calendar timeline — `## Mon DD, YYYY — Title` headings with `area:` field.

Life-coach reads last 7 days on every check-in to:
1. Pull area scores (which areas are quiet)
2. Surface evidence when user says they can't do something
3. Connect quiet areas to active Villager patterns

---

## Who owns what

| File | Writes | Reads |
|------|--------|-------|
| profile.md | life-coach | lifemaxxing |
| game-state.md | life-coach | lifemaxxing (morning brief) |
| wins/timeline.md | lifemaxxing | life-coach |

---

## Morning brief format (both skills contribute)

```
Day N of [arc name].
Yesterday: [N] wins — [area]: [N], [area]: [N]
[Area] on a [N]-day streak.
[Villager] was quiet ([N] days — keep going).
One area dark: [area] — [N] days with no win.
Today's quest: [text]
```
