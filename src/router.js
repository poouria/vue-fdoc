import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './components/Login'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home,
    children: [
      { path: '/about', component: () => import('./views/About.vue') }
    ] },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
  ]
})
