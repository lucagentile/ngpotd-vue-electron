<template>
  <div id="app" class="layout">
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
  export default {
    name: 'ngpotd-electron-vue',
    computed: {
      ...mapGetters({
        isDownloading: types.GET_IS_DOWNLOADING
      })
    },
    methods: {
      ...mapActions({
        pushImage: types.PUSH_IMAGE
      })
    },
    beforeCreate () {
      this.$electron.ipcRenderer.send('image:index')
      this.$electron.ipcRenderer.on('image:push', (event, image) => {
        this.pushImage(image)
      })
    },
    components: {
      WallpaperModal
    }
  }
</script>

<style scoped>
</style>
