import * as types from '../types'
import axios from 'axios'
import { ipcRenderer } from 'electron'

const state = {
  isDownloading: false,
  url: 'https://www.nationalgeographic.com/photography/photo-of-the-day/'
}

const getters = {
  [types.GET_IS_DOWNLOADING]: (state) => {
    return state.isDownloading
  }
}

const mutations = {
  [types.START_DOWNLOAD] (state) {
    state.isDownloading = true
  },
  [types.STOP_DOWNLOAD] (state) {
    state.isDownloading = false
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
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
