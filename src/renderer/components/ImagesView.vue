<template>
  <div>
    <Row type="flex" class="ng-margin">
      <Col span="9">
        <h1 class="section-title">{{ $t("section.gallery") }}</h1>
      </Col>
      <Col span="6" class="align-center bottom">
        <Page :total="imagesCount" size="small" :page-size="pageSize" v-on:on-change="onChangePage" simple class-name="pager"></Page>
      </Col>
      <Col span="9" class="align-right">
        <downloader-view></downloader-view>
      </Col>
    </Row>
    <masonry id="masonry" :cols="3" :gutter="0">
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
        pageSize: types.GET_PAGE_SIZE,
        imagesCount: types.GET_IMAGES_COUNT,
        images: types.GET_IMAGES,
        page: types.GET_IMAGES_CURRENTPAGE
      })
    },
    methods: {
      ...mapActions({
        setImageToSet: types.SET_IMAGE_TO_SET,
        setImageFromName: types.SET_IMAGE_FROM_NAME,
        setPage: types.SET_PAGE,
        setImageCount: types.SET_IMAGES_COUNT,
        pushImage: types.PUSH_IMAGE
      }),
      askToSetWallpaper (event) {
        this.setImageFromName(event.target.getAttribute('data-name'))
      },
      onChangePage (page) {
        this.setPage(parseInt(page) - 1)
        const pagination = {
          pageSize: this.pageSize,
          page: parseInt(page) - 1
        }
        this.$electron.ipcRenderer.send('image:index', pagination)
      }
    },
    components: {
      DownloaderView
    },
    created () {
      this.$electron.ipcRenderer.on('images:count', (event, count) => {
        this.setImageCount(count)
      })
      this.$electron.ipcRenderer.on('images:push', (event, images) => {
        this.pushImage(images)
      })
      const pagination = {
        pageSize: this.pageSize,
        page: this.page
      }
      this.$electron.ipcRenderer.send('image:index', pagination)
    }
  }
</script>

<style scoped>
  #masonry {
    max-height: calc(100vh - 92px - 30px);
    overflow-y: scroll;
  }
  .pager {
    padding-bottom: 1rem;
  }
</style>
