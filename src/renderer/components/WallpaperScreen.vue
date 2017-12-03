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
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as types from '../store/types.js'
  export default {
    name: 'wallpaper-screen',
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
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
</style>
