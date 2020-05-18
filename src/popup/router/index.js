import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home.vue'
import New from '../pages/New.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
    	path:'/new',
    	name: 'new',
      component: New,
      props:true
    }
  ]
})