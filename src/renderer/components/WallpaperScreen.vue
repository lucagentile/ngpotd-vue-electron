<template>
  <div>
    <Row>
      <Col span="24">
        <div class="layout-content-main">
          <Button type="primary" icon="ios-download" @click="startDownload" :disabled="this.isDownloading">{{ $t("input.download") }}</Button>
        </div>
      </Col>
    </Row>
    <Spin size="large" fix v-if="isDownloading"></Spin>
    <Modal :value="isDownloaded"
           :showHead="false"
           :maskClosable="false"
           :closable="false"
           ok-text="Ok"
           cancel-text="No"
           @on-ok="ok"
           @on-cancel="cancel">
      <p>{{ $t("modal.setWallpaper") }}</p>
      <img :src="imageDownloaded" width="100%">
    </Modal>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as types from '../store/types.js'
  export default {
    name: 'wallpaper-screen',
    components: {},
    computed: {
      ...mapGetters([
        'isDownloading',
        'imageDownloaded'
      ]),
      isDownloaded: function () {
        return this.imageDownloaded !== ''
      }
    },
    methods: {
      ...mapActions({
        startDownload: types.START_DOWNLOAD,
        stopDownload: types.STOP_DOWNLOAD,
        setDownloadedImage: types.SET_DOWNLOADED_IMAGE,
        resetImage: types.RESET_DOWNLOADED_IMAGE
      }),
      ok () {
        this.resetImage()
      },
      cancel () {
        this.resetImage()
      }
    },
    mounted () {
      this.$electron.ipcRenderer.on('image:saved', (event, image) => {
        this.setDownloadedImage(image)
        this.stopDownload()
      })
      this.$electron.ipcRenderer.on('image:error', () => {
        this.stopDownload()
      })
    }
  }
</script>

<style scoped>
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
</style>
