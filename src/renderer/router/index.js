import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'wallpaper-screen',
      component: require('@/components/WallpaperScreen').default
    },
    {
      path: '/images/',
      name: 'images-screen',
      component: require('@/components/ImagesScreen').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
