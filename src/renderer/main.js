import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import VueI18n from 'vue-i18n'
import iView from 'iview'
import en from 'iview/dist/locale/en-US'
import 'iview/dist/styles/iview.css'

Vue.use(VueI18n)
Vue.use(iView)
Vue.locale = () => {}

const messages = {
  en: Object.assign({
    input: {
      download: 'Download'
    },
    modal: {
      setWallpaper: 'Do you want to set this as a wallpaper?'
    }
  }, en)
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en',
  messages
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  i18n
}).$mount('#app')
