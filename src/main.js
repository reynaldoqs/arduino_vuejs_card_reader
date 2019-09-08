import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import { rtdbPlugin } from 'vuefire'
import './plugins'

Vue.prototype.changedUser = null
Vue.config.productionTip = false
Vue.use(rtdbPlugin)
new Vue({

  router,
  store,
  render: h => h(App)
}).$mount('#app')
