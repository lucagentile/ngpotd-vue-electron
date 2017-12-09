<template>
  <div>
    <Row>
      <Col span="24">
        <div class="layout-content-main">
          <Button type="primary" icon="ios-download" @click="startDownload" :disabled="this.isDownloading">{{ $t("input.download") }}</Button>
        </div>
      </Col>
    </Row>
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
  .layout-content-main{
    padding: 10px;
  }
</style>
