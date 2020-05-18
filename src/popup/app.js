import Vue from 'vue'
import UUID from 'vue-uuid';
Vue.use(UUID);

require('dotenv').config()

import store from '../store';
import App from './App.vue'
import router from './router'


import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas);

Vue.component('font-awesome-icon', FontAwesomeIcon)


new Vue({
  el: '#app',
  store,
  router,

  render: h => h(App)
})