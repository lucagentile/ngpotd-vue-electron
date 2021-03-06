import * as types from '../types'
import { createImage } from '../../helpers'

const state = {
  images: [],
  imageToSet: {},
  page: 0,
  pageSize: 12,
  count: 0
}

const getters = {
  [types.GET_PAGE_SIZE]: (state) => {
    return state.pageSize
  },
  [types.GET_IMAGES]: (state) => {
    return state.images
  },
  [types.GET_IMAGES_COUNT]: (state) => {
    return state.count
  },
  [types.GET_IMAGES_PAGE]: (state) => {
    const start = state.pageSize * state.page
    const end = (state.page + 1) * state.pageSize
    return state.images.slice(start, end)
  },
  [types.GET_IMAGES_CURRENTPAGE]: (state) => {
    return state.page
  },
  [types.GET_IMAGE_TO_SET]: (state) => {
    return state.imageToSet
  }
}

const mutations = {
  [types.PUSH_IMAGES] (state, images) {
    state.images = images
  },
  [types.SET_IMAGE_TO_SET] (state, image) {
    state.imageToSet = image
  },
  [types.SET_PAGE]: (state, page) => {
    state.page = page
  },
  [types.SET_IMAGES_COUNT]: (state, count) => {
    state.count = count
  }
}

const actions = {
  [types.PUSH_IMAGES] ({ commit }, images) {
    images = images.map((image) => {
      return createImage(image)
    })
    commit(types.PUSH_IMAGES, images)
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
  },
  [types.SET_PAGE]: ({ state, commit }, page) => {
    commit(types.SET_PAGE, page)
  },
  [types.SET_IMAGES_COUNT]: ({ state, commit }, count) => {
    commit(types.SET_IMAGES_COUNT, count)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
