import * as types from '../types'
import axios from 'axios'
import { ipcRenderer } from 'electron'

const state = {
  isDownloading: false,
  imageDownloaded: '',
  url: 'https://www.nationalgeographic.com/photography/photo-of-the-day/'
}

const getters = {
  isDownloading: (state) => {
    return state.isDownloading
  },
  imageDownloaded: (state) => {
    return state.imageDownloaded
  }
}

const mutations = {
  [types.START_DOWNLOAD] (state) {
    state.isDownloading = true
  },
  [types.STOP_DOWNLOAD] (state) {
    state.isDownloading = false
  },
  [types.SET_DOWNLOADED_IMAGE] (state, imageUrl) {
    state.imageDownloaded = imageUrl
  }
}

const actions = {
  [types.START_DOWNLOAD] ({ commit }) {
    commit(types.START_DOWNLOAD)
    axios.get(state.url).then(({data}) => {
      const parser = new DOMParser()
      const htmlDoc = parser.parseFromString(data, 'text/html')
      const imageUrl = htmlDoc.querySelector('meta[property="og:image"]').content
      const date = htmlDoc.querySelector('meta[property="gsa_publish_date"]').content
      ipcRenderer.send('image:url', {imageUrl, date})
    }).catch((error) => {
      console.log(error)
      commit(types.STOP_DOWNLOAD)
    })
  },
  [types.STOP_DOWNLOAD] ({ commit }) {
    commit(types.STOP_DOWNLOAD)
  },
  [types.SET_DOWNLOADED_IMAGE] ({ commit }, image) {
    let arrayBufferView = new Uint8Array(image.data)
    let blob = new Blob([ arrayBufferView ], { type: image.mimeType })
    let urlCreator = window.URL || window.webkitURL
    let imageUrl = urlCreator.createObjectURL(blob)
    commit(types.SET_DOWNLOADED_IMAGE, imageUrl)
  },
  [types.RESET_DOWNLOADED_IMAGE] ({commit}) {
    commit(types.SET_DOWNLOADED_IMAGE, '')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
