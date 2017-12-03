import * as types from '../types'

const state = {
  images: []
}

const getters = {
  [types.GET_IMAGES]: (state) => {
    return state.images
  }
}

const mutations = {
  [types.PUSH_IMAGE] (state, images) {
    state.images = images
  }
}

const actions = {
  [types.PUSH_IMAGE] ({ commit }, images) {
    images = images.map((image) => {
      let arrayBufferView = new Uint8Array(image.data)
      let blob = new Blob([ arrayBufferView ], { type: image.mimeType })
      let urlCreator = window.URL || window.webkitURL
      return urlCreator.createObjectURL(blob)
    })
    commit(types.PUSH_IMAGE, images)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
