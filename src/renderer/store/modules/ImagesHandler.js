import * as types from '../types'
import { createImage } from '../../helpers'

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
      return createImage(image)
    })
    commit(types.PUSH_IMAGE, images)
  },
  [types.SET_IMAGE_TO_SET] ({ commit }, image) {
    if (image.hasOwnProperty('data')) {
      image = createImage(image)
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
