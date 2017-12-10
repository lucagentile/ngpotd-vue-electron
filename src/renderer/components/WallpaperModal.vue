<template>
  <div>
    <Modal :value="showModal"
           :showHead="false"
           :maskClosable="false"
           :closable="false"
           ok-text="Ok"
           cancel-text="No"
           @on-ok="setWallpaper"
           @on-cancel="dontSetWallpaper"
           class-name="vertical-center-modal"
           width="60%">
      <img :src="imageToSet.url" width="100%">
    </Modal>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as types from '../store/types.js'
  export default {
    name: 'wallpaper-modal',
    computed: {
      ...mapGetters({
        imageToSet: types.GET_IMAGE_TO_SET
      }),
      showModal: function () {
        return Object.keys(this.imageToSet).length !== 0
      }
    },
    methods: {
      ...mapActions({
        setImageToSet: types.SET_IMAGE_TO_SET,
        stopDownload: types.STOP_DOWNLOAD
      }),
      setWallpaper () {
        this.$electron.ipcRenderer.send('wallpaper:set', this.imageToSet)
        this.closeModal()
      },
      dontSetWallpaper () {
        this.closeModal()
      },
      closeModal () {
        this.setImageToSet({})
      }
    },
    mounted () {
      this.$electron.ipcRenderer.on('image:saved', (event, image) => {
        this.setImageToSet(image)
        this.stopDownload()
      })
      this.$electron.ipcRenderer.on('wallpaper:success', () => {
        this.$Message.success(this.$t('message.wallpaperSuccess'))
      })
      this.$electron.ipcRenderer.on('image:error, wallpaper:error', () => {
        this.$Message.error(this.$t('message.wallpaperError'))
        this.stopDownload()
      })
    }
  }
</script>

<style>
</style>
