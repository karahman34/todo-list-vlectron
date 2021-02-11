import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'tailwindcss/tailwind.css'
import '@mdi/font/css/materialdesignicons.min.css'
import Toasted from 'vue-toasted'

Vue.config.productionTip = false

Vue.use(Toasted, {
  iconPack: 'mdi',
  position: 'bottom-center',
  duration: '4500',
  theme: 'bubble',
  containerClass: 'font-semibold'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
