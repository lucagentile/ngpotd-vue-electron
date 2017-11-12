<template>
  <div class="layout">
    <Menu mode="horizontal" theme="dark" active-name="1">
      <div class="layout-logo"></div>
      <div class="layout-nav">
        <MenuItem name="1">
          <Icon type="ios-navigate"></Icon>
          Item 1
        </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-keypad"></Icon>
          Item 2
        </MenuItem>
        <MenuItem name="3">
          <Icon type="ios-analytics"></Icon>
          Item 3
        </MenuItem>
        <MenuItem name="4">
          <Icon type="ios-paper"></Icon>
          Item 4
        </MenuItem>
      </div>
    </Menu>
    <div class="layout-content">
      <Row>
        <Col span="24">
          <div class="layout-content-main">Content</div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home-screen',
    components: {},
    methods: {
    }
  }
</script>

<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
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
