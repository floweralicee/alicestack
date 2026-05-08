/**
 * Hana — lifemaxxing desktop pet.
 * Sits on screen, opens a win-entry bubble on click, burps on submit.
 */
const {
  app, BrowserWindow, ipcMain, Tray, Menu, nativeImage, screen, shell,
} = require('electron')
const path = require('path')

const isMac = process.platform === 'darwin'
const isLinux = process.platform === 'linux'

const PET_SIZE = 96
const BUBBLE_WIDTH = 320
const BUBBLE_HEIGHT = 180

// Lifemaxxing server URL — must be running
const SERVER_URL = process.env.LM_SERVER_URL || 'http://127.0.0.1:8788'

let petWindow = null
let bubbleWindow = null
let tray = null
let isQuitting = false

// ── Pet position helpers ──────────────────────────────────────────────────────

function getInitialBounds() {
  const { bounds } = screen.getPrimaryDisplay()
  return {
    x: Math.round(bounds.x + bounds.width - PET_SIZE - 24),
    y: Math.round(bounds.y + bounds.height - PET_SIZE - 48),
    width: PET_SIZE,
    height: PET_SIZE,
  }
}

function getBubbleBounds() {
  if (!petWindow || petWindow.isDestroyed()) return null
  const [px, py] = petWindow.getPosition()
  const { bounds } = screen.getPrimaryDisplay()
  // Place bubble above and to the left of pet; flip if near edge
  const x = Math.min(px - BUBBLE_WIDTH + PET_SIZE, bounds.x + bounds.width - BUBBLE_WIDTH - 8)
  const y = Math.max(py - BUBBLE_HEIGHT - 8, bounds.y + 8)
  return { x: Math.max(x, bounds.x + 8), y, width: BUBBLE_WIDTH, height: BUBBLE_HEIGHT }
}

// ── Tray ──────────────────────────────────────────────────────────────────────

function createTray() {
  const icon = nativeImage.createFromPath(
    path.join(__dirname, 'hana-icon', 'active.svg')
  )
  if (icon.isEmpty()) return

  const sized = isMac ? icon.resize({ width: 18, height: 18 }) : icon.resize({ width: 32, height: 32 })
  if (isMac) sized.setTemplateImage(true)

  tray = new Tray(sized)
  tray.setToolTip('Hana — lifemaxxing')
  tray.setContextMenu(
    Menu.buildFromTemplate([
      { label: 'Open lifemaxxing', click: () => shell.openExternal('http://localhost:5173') },
      { type: 'separator' },
      { label: 'Quit', click: () => { isQuitting = true; app.quit() } },
    ])
  )
}

// ── Pet window ────────────────────────────────────────────────────────────────

function createPetWindow() {
  const { x, y, width, height } = getInitialBounds()
  petWindow = new BrowserWindow({
    x, y, width, height,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    hasShadow: false,
    fullscreenable: false,
    enableLargerThanScreen: true,
    ...(isLinux ? { type: 'toolbar' } : {}),
    ...(isMac ? { type: 'panel', roundedCorners: false } : {}),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      backgroundThrottling: false,
    },
  })

  if (isMac) petWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })
  petWindow.loadFile(path.join(__dirname, 'pet.html'))
  petWindow.showInactive()
}

// ── Bubble window ─────────────────────────────────────────────────────────────

function openBubble() {
  if (bubbleWindow && !bubbleWindow.isDestroyed()) {
    bubbleWindow.focus()
    return
  }
  const bounds = getBubbleBounds()
  if (!bounds) return

  bubbleWindow = new BrowserWindow({
    ...bounds,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    hasShadow: true,
    fullscreenable: false,
    ...(isMac ? { type: 'panel', roundedCorners: true } : {}),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  if (isMac) bubbleWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })
  bubbleWindow.loadFile(path.join(__dirname, 'bubble.html'))
  bubbleWindow.once('ready-to-show', () => bubbleWindow?.show())
  bubbleWindow.on('closed', () => { bubbleWindow = null })

  // Close bubble when it loses focus (user clicked away)
  bubbleWindow.on('blur', () => {
    if (bubbleWindow && !bubbleWindow.isDestroyed()) bubbleWindow.close()
  })
}

function closeBubble() {
  if (bubbleWindow && !bubbleWindow.isDestroyed()) bubbleWindow.close()
}

// ── IPC handlers ──────────────────────────────────────────────────────────────

ipcMain.handle('hana-move', (_event, dx, dy) => {
  if (!petWindow || petWindow.isDestroyed()) return
  const [x, y] = petWindow.getPosition()
  petWindow.setPosition(Math.round(x + dx), Math.round(y + dy))
})

ipcMain.handle('hana-open-bubble', () => openBubble())
ipcMain.handle('hana-close-bubble', () => closeBubble())

ipcMain.handle('hana-submit-win', async (_event, text) => {
  try {
    const res = await fetch(`${SERVER_URL}/api/wins/quick`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        date: new Date().toISOString().slice(0, 10),
      }),
    })
    const data = await res.json()
    // Tell pet window to play eat + burp
    if (petWindow && !petWindow.isDestroyed()) {
      petWindow.webContents.send('hana-win-logged', data)
    }
    closeBubble()
    return { ok: true, wins: data.wins ?? [] }
  } catch (err) {
    console.error('[hana-submit-win]', err)
    return { ok: false, error: err.message }
  }
})

ipcMain.handle('hana-get-server-url', () => SERVER_URL)

// ── App lifecycle ─────────────────────────────────────────────────────────────

const gotLock = app.requestSingleInstanceLock()
if (!gotLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    if (petWindow) {
      if (petWindow.isMinimized()) petWindow.restore()
      petWindow.showInactive()
    }
  })

  app.whenReady().then(() => {
    createPetWindow()
    createTray()
    app.on('activate', () => {
      if (!petWindow || petWindow.isDestroyed()) createPetWindow()
      else petWindow.showInactive()
    })
  })

  app.on('window-all-closed', () => { if (!isMac) app.quit() })
  app.on('before-quit', () => { isQuitting = true })
}
