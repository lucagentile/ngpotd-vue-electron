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
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import * as types from './store/types.js'
  export default {
    name: 'ngpotd-electron-vue',
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
