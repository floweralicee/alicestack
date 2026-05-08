const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('hana', {
  moveBy:        (dx, dy) => ipcRenderer.invoke('hana-move', dx, dy),
  openBubble:    ()       => ipcRenderer.invoke('hana-open-bubble'),
  closeBubble:   ()       => ipcRenderer.invoke('hana-close-bubble'),
  submitWin:     (text)   => ipcRenderer.invoke('hana-submit-win', text),
  getServerUrl:  ()       => ipcRenderer.invoke('hana-get-server-url'),
  setSubmitting: (state)  => ipcRenderer.send('hana-submitting', state),
  // Use once-and-re-register pattern to avoid listener leak
  onWinLogged:   (cb)     => {
    ipcRenderer.removeAllListeners('hana-win-logged')
    ipcRenderer.on('hana-win-logged', (_e, data) => cb(data))
  },
})
