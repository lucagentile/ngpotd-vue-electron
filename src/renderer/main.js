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

Vue.use(VueI18n)
Vue.use(iView)
Vue.locale = () => {}

const messages = {
  en: Object.assign({
    menu: {
      images: 'Images',
      wallpaper: 'Wallpaper'
    },
    input: {
      download: 'Download'
    },
    modal: {
      setWallpaper: 'Do you want to set this image as a wallpaper?'
    },
    message: {
      wallpaperSuccess: 'Wallpaper has been set',
      wallpaperError: 'An error has occured. Retry'
    }
  }, en),
  it: Object.assign({
    menu: {
      images: 'Immagini',
      wallpaper: 'Sfondo'
    },
    input: {
      download: 'Scarica'
    },
    modal: {
      setWallpaper: 'Vuoi questa immagine come sfondo del desktop?'
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
