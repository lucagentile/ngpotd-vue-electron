<template>
  <div>
    <Row type="flex">
      <Col span="8" v-for="image in images" :key="image.name">
        <img :src="image.url" width="100%" v-on:click="askToSetWallpaper" :data-name="image.name">
      </Col>
    </Row>
    <Spin size="large" fix v-if="isSettingWallpaper"></Spin>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as types from '../store/types.js'
  export default {
    name: 'images-screen',
    data () {
      return {
        isSettingWallpaper: false
      }
    },
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
    }
  }
</script>

<style scoped>
</style>
