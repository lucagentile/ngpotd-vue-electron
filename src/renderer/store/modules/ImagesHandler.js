import * as types from '../types'

const state = {
  images: [],
  imageToSet: {}
}

const getters = {
  [types.GET_IMAGES]: (state) => {
    return state.images
  },
  [types.GET_IMAGE_TO_SET]: (state) => {
    return state.imageToSet
  }
}

const mutations = {
  [types.PUSH_IMAGE] (state, images) {
    state.images = images
  },
  [types.SET_IMAGE_TO_SET] (state, image) {
    state.imageToSet = image
  }
}

const actions = {
  [types.PUSH_IMAGE] ({ commit }, images) {
    images = images.map((image) => {
      let arrayBufferView = new Uint8Array(image.data)
      let blob = new Blob([ arrayBufferView ], { type: image.mimeType })
      let urlCreator = window.URL || window.webkitURL
      return {
        name: image.name,
        url: urlCreator.createObjectURL(blob),
        mimeType: image.mimeType
      }
    })
    commit(types.PUSH_IMAGE, images)
  },
  [types.SET_IMAGE_TO_SET] ({ commit }, image) {
    if (image.hasOwnProperty('data')) {
      let arrayBufferView = new Uint8Array(image.data)
      let blob = new Blob([ arrayBufferView ], { type: image.mimeType })
      let urlCreator = window.URL || window.webkitURL
      image = {
        name: image.name,
        url: urlCreator.createObjectURL(blob),
        mimeType: image.mimeType
      }
    }
    commit(types.SET_IMAGE_TO_SET, image)
  },
  [types.SET_IMAGE_FROM_NAME]: ({ state, commit }, imageName) => {
    let image = state.images.find((x) => x.name === imageName)
    commit(types.SET_IMAGE_TO_SET, image)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
