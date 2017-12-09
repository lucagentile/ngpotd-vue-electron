<template>
  <div class="mg-rx-40">
    <Button type="primary" @click="startDownload" :disabled="this.isDownloading" size="large">{{ $t("input.download") }}</Button>
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
      })
    },
    methods: {
      ...mapActions({
        startDownload: types.START_DOWNLOAD
      })
    }
  }
</script>

<style scoped>
</style>
