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
  import { mapGetters } from 'vuex'
  import * as types from './store/types.js'
  import WallpaperModal from './components/WallpaperModal'
  import Titlebar from './components/Titlebar'
  export default {
    name: 'ngpotd-electron-vue',
    computed: {
      ...mapGetters({
        isDownloading: types.GET_IS_DOWNLOADING
      }),
      isNotDarwin () {
        return this.$electron.remote.getGlobal('process').env !== 'darwin'
      }
    },
    components: {
      WallpaperModal, Titlebar
    }
  }
</script>

<style scoped>
</style>
