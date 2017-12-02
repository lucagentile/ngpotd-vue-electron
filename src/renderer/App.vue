<template>
  <div id="app" class="layout">
    <Menu mode="horizontal" theme="dark" active-name="1">
      <div class="layout-nav">
        <MenuItem name="1">
          <Icon type="ios-navigate"></Icon>
          {{ $t("menu.wallpaper") }}
        </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-keypad"></Icon>
          {{ $t("menu.images") }}
        </MenuItem>
      </div>
    </Menu>
    <div class="layout-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ngpotd-electron-vue'
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
