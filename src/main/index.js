'use strict'

import { app, BrowserWindow, ipcMain, Menu } from 'electron'
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import imageType from 'image-type'
import wallpaper from 'wallpaper'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow

let picturesPath = app.getPath('pictures') + path.sep + 'NGPOTD'

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

const template = [
  {
    role: 'reload'
  },
  {
    label: 'Donate to National Geographic Society',
    click () {
      require('electron').shell.openExternal('https://www.nationalgeographic.org/give/')
    }
  },
  {
    role: 'quit'
  }
]

if (process.env.NODE_ENV === 'development') {
  template.unshift({
    label: 'View',
    submenu: [
      {role: 'forcereload'},
      {role: 'toggledevtools'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  })
}

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      {role: 'services', submenu: []},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  })

  // Edit menu
  template[1].submenu.push(
    {type: 'separator'},
    {
      label: 'Speech',
      submenu: [
        {role: 'startspeaking'},
        {role: 'stopspeaking'}
      ]
    }
  )

  // Window menu
  template[3].submenu = [
    {role: 'close'},
    {role: 'minimize'},
    {role: 'zoom'},
    {type: 'separator'},
    {role: 'front'}
  ]
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    minWidth: 850,
    minHeight: 650,
    frame: false,
    resizable: true,
    show: false,
    backgroundColor: '#222222'
  })

  mainWindow.loadURL(winURL)
  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize()
    mainWindow.show()
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/*
  MainWindow
 */
ipcMain.on('image:url', (event, {imageUrl, date}) => {
  axios.request({
    responseType: 'arraybuffer',
    url: imageUrl,
    method: 'get'
  }).then(response => {
    let mimeType = response.headers['content-type']
    if (mimeType.indexOf('image') === -1) {
      throw new NotImageException('The imageURL doesn\'t point to an image file')
    }
    let ext = mimeType.substr(6, mimeType.length)
    if (ext === 'jpeg') {
      ext = 'jpg'
    }
    // Images/NGPOTD
    if (!fs.existsSync(picturesPath)) {
      fs.mkdirSync(picturesPath)
    }
    let filename = date.replace(/-/g, '') + '.' + ext
    let filenameAndPath = picturesPath + path.sep + filename
    fs.writeFileSync(filenameAndPath, response.data)
    mainWindow.webContents.send('image:saved', {
      name: filename,
      data: response.data,
      mimeType
    })
  }).catch(error => {
    console.log(error)
    // TODO NotImageException should prompt bug notice to me
    mainWindow.webContents.send('image:error', error.message)
  })
})

function NotImageException (message) {
  this.message = message
  this.name = 'NotImage'
  this.stack = (new Error()).stack
}
NotImageException.prototype = Object.create(Error.prototype)
NotImageException.prototype.constructor = NotImageException

ipcMain.on('image:index', (event, pagination) => {
  fs.readdir(picturesPath, (err, items) => {
    if (err) throw err
    const start = pagination.pageSize * pagination.page
    const end = (pagination.page + 1) * pagination.pageSize
    let images = []
    mainWindow.webContents.send('images:count', items.length)
    items = items.reverse()
    items = items.slice(start, end)
    let length = items.length
    for (let i = 0; i < length; i++) {
      let imagePath = picturesPath + path.sep + items[i]
      let data = fs.readFileSync(imagePath)
      let image = {
        name: items[i],
        data,
        mimeType: imageType(data).mime
      }
      images.push(image)
    }
    mainWindow.webContents.send('images:push', images)
  })
})

ipcMain.on('wallpaper:set', (event, image) => {
  wallpaper.set(picturesPath + path.sep + image.name).then(() => {
    mainWindow.webContents.send('wallpaper:success')
  }).catch(() => {
    mainWindow.webContents.send('wallpaper:error')
  })
})

fs.watch(picturesPath, { encoding: 'buffer' }, (eventType, filename) => {
  if (eventType) {
    ipcMain.emit('image:index')
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
