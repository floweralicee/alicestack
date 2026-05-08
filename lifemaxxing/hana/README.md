# Hana — lifemaxxing desktop pet

Hana lives in the corner of your screen. Click her to log a win. She burps.

## Setup

```bash
cd lifemaxxing/hana
npm install
npm start
```

**Requires the lifemaxxing server to be running** (`npm run dev` in `lifemaxxing/app/`).

By default Hana talks to `http://127.0.0.1:8788`. Override with:
```bash
LM_SERVER_URL=http://127.0.0.1:8788 npm start
```

## How it works

1. Hana sits on your screen, always on top, transparent background
2. **Click her** → speech bubble opens
3. Type your win (or multiple) → press Enter or click "Log it →"
4. She sends the text to `/api/wins/quick` on the lifemaxxing server
5. Server runs the win-finding agent, classifies into life areas
6. Hana plays the **eat animation + burp sound** — win confirmed
7. Bubble shows which areas the win counted toward, then auto-closes
8. Win appears on your heatmap immediately

## Pet states

| State | When |
|-------|------|
| active | Default — she's awake |
| touch | While being dragged |
| eat | Win logged — plays burp sound |
| sleep | 2 minutes of no interaction |

## Drag to move

Click and drag Hana anywhere on screen. She stays where you leave her.
