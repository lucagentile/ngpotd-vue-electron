'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
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

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 750,
    useContentSize: true,
    width: 750
  })

  mainWindow.loadURL(winURL)

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

ipcMain.on('image:index', (event) => {
  fs.readdir(picturesPath, (err, items) => {
    if (err) {
      console.log(err)
    }
    let images = []
    let i = items.length
    while (i--) {
      let imagePath = picturesPath + path.sep + items[i]
      let data = fs.readFileSync(imagePath)
      let image = {
        name: items[i],
        data,
        mimeType: imageType(data).mime
      }
      images.push(image)
    }
    mainWindow.webContents.send('image:push', images)
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
