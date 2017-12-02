<template>
  <div class="layout">
    <Menu mode="horizontal" theme="dark" active-name="1">
      <div class="layout-nav">
        <MenuItem name="1">
          <Icon type="ios-navigate"></Icon>
          Wallpaper
        </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-keypad"></Icon>
          Images
        </MenuItem>
      </div>
    </Menu>
    <div class="layout-content">
      <Row>
        <Col span="24">
          <div class="layout-content-main">
            <Button type="primary" icon="ios-download" @click="startDownload" :disabled="this.isDownloading">{{ $t("input.download") }}</Button>
          </div>
        </Col>
      </Row>
    </div>
    <Spin size="large" fix v-if="isDownloading"></Spin>
    <Modal :value="isDownloaded"
           title="Common Modal dialog box title"
           :showHead="false"
           :maskClosable="false"
           :closable="false"
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
    name: 'home-screen',
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
  .layout{
    background: #f5f7f9;
  }
  .layout-nav{
    width: 100%;
  }
  .layout-content{
    min-height: 200px;
    height: 100%;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
</style>
