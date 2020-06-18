import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import AddPlayer from '../components/AddPlayer.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add-player',
    name: 'AddPlayer',
    component: AddPlayer
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
