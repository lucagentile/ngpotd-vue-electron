<template>
  <div>
    <Row type="flex">
      <Col span="8" v-for="imageUrl in getImages">
        <img :src="imageUrl" width="100%">
      </Col>
    </Row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../store/types.js'
  export default {
    name: 'images-screen',
    computed: {
      ...mapGetters({
        getImages: types.GET_IMAGES
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
