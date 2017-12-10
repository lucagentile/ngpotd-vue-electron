<template>
  <div class="mg-rx-40">
    <Tooltip placement="left" :content="tooltipOnline" :disabled="!cantDownload">
      <Button type="primary" @click="startDownload" :disabled="cantDownload" size="large">{{ $t("input.download") }}</Button>
    </Tooltip>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as types from '../store/types.js'
  export default {
    name: 'downloader-view',
    computed: {
      ...mapGetters({
        isDownloading: types.GET_IS_DOWNLOADING
      }),
      cantDownload () {
        return !this.isOnline || this.isDownloading
      }
    },
    data () {
      return {
        tooltipOnline: this.$i18n.t(''),
        isOnline: navigator.onLine
      }
    },
    methods: {
      ...mapActions({
        startDownload: types.START_DOWNLOAD
      }),
      updateConnectionStatus () {
        this.isOnline = navigator.onLine
      }
    },
    created () {
      window.addEventListener('online', this.updateConnectionStatus)
      window.addEventListener('offline', this.updateConnectionStatus)
    }
  }
</script>

<style scoped>
</style>
