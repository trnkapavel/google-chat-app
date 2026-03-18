const { app, BrowserWindow, session, shell, ipcMain, Notification } = require('electron')
const path = require('path')

app.setName('Google Chat')

const gotLock = app.requestSingleInstanceLock()
if (!gotLock) {
  app.quit()
}

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    title: 'Google Chat',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      spellcheck: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    show: false,
  })

  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    const allowed = ['notifications', 'media', 'mediaKeySystem', 'geolocation', 'clipboard-read']
    callback(allowed.includes(permission))
  })

  session.defaultSession.setPermissionCheckHandler((webContents, permission) => {
    if (permission === 'notifications') return true
    return null
  })

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://chat.google.com') || url.startsWith('https://accounts.google.com')) {
      mainWindow.loadURL(url)
      mainWindow.show()
      return { action: 'deny' }
    }
    shell.openExternal(url)
    return { action: 'deny' }
  })

  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith('https://chat.google.com') && !url.startsWith('https://accounts.google.com')) {
      event.preventDefault()
      shell.openExternal(url)
    }
  })

  mainWindow.loadURL('https://chat.google.com')

  // Badge přes IPC z preload.js
  ipcMain.removeAllListeners('badge')
  ipcMain.on('badge', (_, count) => {
    app.setBadgeCount(count)
  })

  mainWindow.webContents.on('did-finish-load', () => {
    // MutationObserver na aria-label atributy – Google Chat zobrazuje počet nepřečtených takto
    mainWindow.webContents.executeJavaScript(`
      (function() {
        function getCount() {
          for (const el of document.querySelectorAll('[aria-label*="nepřečtené zprávy:"]')) {
            const m = el.getAttribute('aria-label').match(/nepřečtené zprávy:(\\d+)/)
            if (m) return parseInt(m[1], 10)
          }
          for (const el of document.querySelectorAll('[aria-label]')) {
            const m = el.getAttribute('aria-label').match(/^(\\d+) nepřečten/)
            if (m) return parseInt(m[1], 10)
          }
          return 0
        }
        function update() {
          window.__electronBadge?.set(getCount())
        }
        new MutationObserver(update).observe(document.body, {
          subtree: true,
          attributes: true,
          attributeFilter: ['aria-label']
        })
        update()
      })()
    `).catch(() => {})

    // Spusť macOS permission dialog pro notifikace
    if (Notification.isSupported()) {
      const n = new Notification({ title: 'Google Chat', body: 'Notifikace jsou aktivní.', silent: true })
      n.show()
    }
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('close', (e) => {
    if (!app.isQuitting) {
      e.preventDefault()
      mainWindow.hide()
    }
  })
}

app.on('ready', createWindow)

app.on('activate', () => {
  if (mainWindow) {
    mainWindow.show()
  } else {
    createWindow()
  }
})

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.show()
    mainWindow.focus()
  }
})

app.on('before-quit', () => {
  app.isQuitting = true
})
