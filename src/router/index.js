import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Knowledge from '../views/Knowledge.vue'
import Find from '../views/Find.vue'
import Me from '../views/Me.vue'
import Login from '../views/Login.vue'
import Iframe from '../components/iframe.vue'
import Noticedetail from '../views/home/noticedetail.vue'
import Noticelist from '../views/home/noticelist.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/knowledge',
    name: 'Knowledge',
    component: Knowledge
  },
  {
    path: '/find',
    name: 'Find',
    component: Find
  },
  {
    path: '/me',
    name: 'Me',
    component: Me
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/iframe',
    name: 'Iframe',
    component: Iframe
  },
  {
    path: '/noticedetail',
    name: 'Noticedetail',
    component: Noticedetail
  },
  {
    path: '/noticelist',
    name: 'Noticelist',
    component: Noticelist
  },
  {
    path: '*',
    redirect: '/home'/* 默认重定向 */
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
