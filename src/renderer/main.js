import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import VueI18n from 'vue-i18n'
import iView from 'iview'
import en from 'iview/dist/locale/en-US'
import it from 'iview/dist/locale/it-IT'
import 'iview/dist/styles/iview.css'
import './theme/ngpotd-iview-theme.less'
import './theme/ngpotd-theme.less'
import VueMasonry from 'vue-masonry-css'

Vue.use(VueMasonry)
Vue.use(VueI18n)
Vue.use(iView)
Vue.locale = () => {}

const messages = {
  en: Object.assign({
    section: {
      gallery: 'Gallery'
    },
    input: {
      download: 'Download'
    },
    connection: {
      no: 'No internet connection'
    },
    message: {
      wallpaperSuccess: 'Wallpaper has been set',
      wallpaperError: 'An error has occured. Retry'
    }
  }, en),
  it: Object.assign({
    section: {
      gallery: 'Galleria'
    },
    input: {
      download: 'Scarica'
    },
    connection: {
      no: 'Nessuna connessione a internet'
    },
    message: {
      wallpaperSuccess: 'Lo sfondo è stato impostato',
      wallpaperError: 'Si è verificato un errore. Riprova'
    }
  }, it)
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
