const { app, BrowserWindow } = require('electron')

let mainWindow

app.on('ready', () => {
  const path = require('path')
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: path.join(__dirname, 'public/favicon.png'),
  })

  mainWindow.loadURL('http://localhost:8083')

  mainWindow.on('closed', () => {
    mainWindow = null 
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
