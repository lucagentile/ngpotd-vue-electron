<template>
  <div id="app" class="layout">
    <i-menu mode="horizontal" theme="dark" active-name="wallpaper-screen" v-on:on-select="changeRoute">
      <div class="layout-nav">
        <MenuItem name="wallpaper-screen">
          <Icon type="ios-navigate"></Icon>
          {{ $t("menu.wallpaper") }}
        </MenuItem>
        <MenuItem name="images-screen">
          <Icon type="ios-keypad"></Icon>
          {{ $t("menu.images") }}
        </MenuItem>
      </div>
    </i-menu>
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
      }),
      changeRoute (route) {
        this.$router.push({
          name: route
        })
        this.$router.replace({
          name: route
        })
      }
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
  .layout-nav{
    width: 100%;
  }
  .layout-content{
    min-height: 200px;
    height: 100%;
    margin: 15px;
  }
</style>
