import Vue from 'vue'
import VueRouter from 'vue-router'
import Buefy from "buefy"
import HomeView from '@/views/HomeView.vue'
import isAuth from './isAuth'

Vue.use(VueRouter)
Vue.use(Buefy)

const routes = [{
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    beforeEnter: isAuth,
  },

  {
    path: '/product',
    name: 'product',
    component: () => import('@/views/ProductView.vue'),
    beforeEnter: isAuth,
  },

  {
    path: '/menu',
    name: 'menu',
    component: () => import('@/views/MenuView.vue'),
    beforeEnter: isAuth,
  },
  {
    path: '/unit',
    name: 'unit',
    component: () => import('@/views/UnitView.vue'),
    beforeEnter: isAuth,
  },

  {
    path: '/office',
    name: 'office',
    component: () => import('@/views/OfficeView.vue'),
    beforeEnter: isAuth,
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/core',
    name: 'core',
    component: () => import('@/views/AdminLTE.vue'),
    beforeEnter: isAuth,
  },

  {
    path: '/order',
    component: () => import('@/views/shopOrderView.vue'),
    beforeEnter: isAuth,
    children: [{
      path: ':shopId',
      component: () => import('@/views/shopOrderStockView.vue'),
      props: true,
    }]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'router-active',
  linkExactActiveClass: 'exact-active',
})

export default router