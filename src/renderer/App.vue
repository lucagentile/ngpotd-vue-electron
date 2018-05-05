<template>
  <div id="app" class="layout">
    <titlebar v-if="isNotDarwin"></titlebar>
    <div class="layout-content">
      <router-view></router-view>
    </div>
    <wallpaper-modal></wallpaper-modal>
    <Spin size="large" fix v-if="isDownloading"></Spin>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as types from './store/types.js'
  import WallpaperModal from './components/WallpaperModal'
  import Titlebar from './components/Titlebar'
  export default {
    name: 'ngpotd-electron-vue',
    computed: {
      ...mapGetters({
        isDownloading: types.GET_IS_DOWNLOADING,
        pageSize: types.GET_PAGE_SIZE,
        page: types.GET_IMAGES_CURRENTPAGE
      }),
      isNotDarwin () {
        return this.$electron.remote.getGlobal('process').env !== 'darwin'
      }
    },
    methods: {
      ...mapActions({
        pushImage: types.PUSH_IMAGE,
        setImageCount: types.SET_IMAGES_COUNT
      })
    },
    beforeCreate () {
      this.$electron.ipcRenderer.on('images:count', (event, count) => {
        this.setImageCount(count)
      })
      this.$electron.ipcRenderer.on('images:push', (event, images) => {
        this.pushImage(images)
      })
    },
    created () {
      const pagination = {
        pageSize: this.pageSize,
        page: this.page
      }
      this.$electron.ipcRenderer.send('image:index', pagination)
    },
    components: {
      WallpaperModal, Titlebar
    }
  }
</script>

<style scoped>
</style>
