# alicestack — shared state schema

## Mode-switching protocol

Both skills share memory. Together they decide when to be the truth teller and when to be the imposter-syndrome killer.

| Signal | Who leads | What happens |
|--------|-----------|-------------|
| User sounds defeated / sparse wins last 7 days / dismissing themselves | Imposter-syndrome killer | Pull win evidence first. Show receipts before any feedback or pushback. Name what they did that they couldn't do before. |
| Same Villager pattern appearing again | Truth teller | Name the loop. Ask the question the user is avoiding. |
| Area quiet 5+ days + Villager active | Both | Truth teller names the connection. Imposter-syndrome killer finds any wins that were there anyway. |
| User explicitly asks for pushback | Truth teller | Full pattern audit. No softening. |
| User says they're struggling | Imposter-syndrome killer | Lead with wins. Hold the hard questions for later. |
| Win pattern looks like avoidance (building systems, not shipping) | Truth teller | Flag it specifically. "You built 3 things this week. Did anything ship?" |

**The rule:** Evidence before judgment. Always check what they've actually done before calling anything out. The imposter-syndrome killer goes first when confidence is low. The truth teller goes first when a pattern is running unchecked.

---

Both `truth-teller` and `imposter-syndrome-killer` read and write from the same folder at runtime:

```
~/.alicestack/
├── profile.md          ← who this person is (truth-teller writes, imposter-syndrome-killer reads)
├── game-state.md       ← patterns, arc, tokens, Villagers (truth-teller owns)
└── wins/
    └── timeline.md     ← daily wins + area scores (imposter-syndrome-killer owns, truth-teller reads)
```

---

## profile.md

Written by truth-teller on first install. Read by imposter-syndrome-killer to personalize win criteria.

Fields:
- name
- operating mode (clarity-driven, deadline-driven, etc.)
- peak window
- current main goal
- active patterns (named Villagers)
- custom win definitions per area

---

## game-state.md

Written and read by truth-teller. Read by imposter-syndrome-killer for morning brief and Villager alerts.

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

Written by imposter-syndrome-killer after each journal entry. Read by truth-teller for evidence and pattern correlation.

Format matches win-calendar timeline — `## Mon DD, YYYY — Title` headings with `area:` field.

Truth-teller reads last 7 days on every check-in to:
1. Pull area scores (which areas are quiet)
2. Surface evidence when user says they can't do something
3. Connect quiet areas to active Villager patterns

---

## Who owns what

| File | Writes | Reads |
|------|--------|-------|
| profile.md | truth-teller | imposter-syndrome-killer |
| game-state.md | truth-teller | imposter-syndrome-killer (morning brief) |
| wins/timeline.md | imposter-syndrome-killer | truth-teller |

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
