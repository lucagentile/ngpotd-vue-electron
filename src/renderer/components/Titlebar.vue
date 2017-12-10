<template>
    <div class="titlebar">
        <Row type="flex" align="middle">
            <Col span="8">
                <button type="text" class="app-menu" v-on:click="openMenu"><Icon type="android-menu"></Icon></button>
                <p class="title">NGPOTD - Wallpaper Changer</p>
            </Col>
            <Col span="8" offset="8">
                <div class="wc-box">
                    <div class="close" v-on:click="closeApp"></div>
                    <div class="maximize" v-on:click="maximize"></div>
                    <div class="minimize" v-on:click="minimize"></div>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
  export default {
    name: 'titlebar',
    methods: {
      openMenu () {
        let remote = this.$electron.remote
        remote.Menu.getApplicationMenu().popup(remote.getCurrentWindow())
      },
      closeApp () {
        let window = this.$electron.remote.getCurrentWindow()
        window.close()
      },
      maximize () {
        let window = this.$electron.remote.getCurrentWindow()
        window.isMaximized() ? window.unmaximize() : window.maximize()
      },
      minimize () {
        let window = this.$electron.remote.getCurrentWindow()
        window.minimize()
      }
    }
  }
</script>

<style scoped>
    .titlebar {
        background-color: black;
        -webkit-app-region: drag;
    }
    .titlebar .wc-box div, .titlebar button {
        -webkit-app-region: no-drag;
    }
    .titlebar .title {
        font-family: 'Josefin Sans', Helvetica, sans-serif;
        color: white;
        display: inline;
    }
    .app-menu {
        display: inline;
        background: none;
        color: #CCCCCC;
        border: none;
        padding: 0.7em;
        font-size: 1em;
        cursor: pointer;
        outline: inherit;
        margin-right: 0.3em;
    }
    .app-menu:hover {
        background-color: #ffce00;
        color: black;
    }
    .wc-box div {
        position: relative;
        float: right;
        width: 30px;
        height: 30px;
    }
    .wc-box div:before,
    .wc-box div:after {
        top: 30%;
        right: 30%;
        bottom: 30%;
        left: 30%;
        content: " ";
        position: absolute;
        border-color: #CCCCCC;
        border-style: solid;
        border-width: 0 0 2px 0;
    }
    .wc-box .minimize:before {
        border-bottom-width: 2px;
    }
    .wc-box .maximize:before {
        border-width: 1px 1px 2px 1px;
    }
    .wc-box .close:before,
    .wc-box .close:after {
        bottom: 50%;
        top: 50%;
    }
    .wc-box .close:before {
        transform: rotate(45deg);
    }
    .wc-box .close:after {
        transform: rotate(-45deg);
    }
    .wc-box div:hover {
        background-color: #CCCCCC;
    }
    .wc-box .close:hover {
        background-color: #E04343;
    }
    .wc-box div:hover:after,
    .wc-box div:hover:before {
        border-color: #333333;
    }
    .wc-box .close:hover:after,
    .wc-box .close:hover:before {
        border-color: #FFFFFF;
    }
</style>