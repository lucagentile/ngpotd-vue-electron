<template>
  <div>
    <Row type="flex" class="ng-margin">
      <Col span="12">
        <h1 class="section-title">{{ $t("section.gallery") }}</h1>
      </Col>
      <Col span="12" class="align-right">
        <downloader-view></downloader-view>
      </Col>
    </Row>
    <masonry :cols="3" :gutter="0">
      <div v-for="(image, index) in images" :key="index">
        <img :src="image.url" width="100%" v-on:click="askToSetWallpaper" :data-name="image.name">
      </div>
    </masonry>
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
