<template>
  <div class="layout">
    <Menu mode="horizontal" theme="dark" active-name="1">
      <div class="layout-nav">
        <MenuItem name="1">
          <Icon type="ios-navigate"></Icon>
          Main
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
            <Button type="primary" @click="downloadImage">{{ $t("input.download") }}</Button>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { ipcRenderer } from 'electron'
  export default {
    name: 'home-screen',
    components: {},
    methods: {
      downloadImage: () => {
        const url = 'https://www.nationalgeographic.com/photography/photo-of-the-day/'
        axios.get(url).then(({data}) => {
          const parser = new DOMParser()
          const htmlDoc = parser.parseFromString(data, 'text/html')
          const imageUrl = htmlDoc.querySelector('meta[property="og:image"]').content
          const date = htmlDoc.querySelector('meta[property="gsa_publish_date"]').content
          ipcRenderer.send('image:url', {imageUrl, date})
        }).catch((error) => {
          console.log(error)
        })
      }
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
