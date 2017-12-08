module.exports = {
  createImage (image) {
    let arrayBufferView = new Uint8Array(image.data)
    let blob = new Blob([ arrayBufferView ], { type: image.mimeType })
    let urlCreator = window.URL || window.webkitURL
    return {
      name: image.name,
      url: urlCreator.createObjectURL(blob),
      mimeType: image.mimeType
    }
  }
}
