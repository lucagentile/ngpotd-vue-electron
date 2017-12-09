<template>
  <div>
    <Row type="flex">
      <downloader-view></downloader-view>
    </Row>
    <Row type="flex">
      <Col span="8" v-for="image in images" :key="image.name">
        <img :src="image.url" width="100%" v-on:click="askToSetWallpaper" :data-name="image.name">
      </Col>
    </Row>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as types from '../store/types.js'
  import DownloaderView from './DownloaderView'
  export default {
    name: 'images-view',
    computed: {
      ...mapGetters({
        images: types.GET_IMAGES
      })
    },
    methods: {
      ...mapActions({
        setImageToSet: types.SET_IMAGE_TO_SET,
        setImageFromName: types.SET_IMAGE_FROM_NAME
      }),
      askToSetWallpaper (event) {
        this.setImageFromName(event.target.getAttribute('data-name'))
      }
    },
    components: {
      DownloaderView
    }
  }
</script>

<style scoped>
</style>
