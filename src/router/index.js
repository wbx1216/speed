import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/Index.vue'
import tool from '../views/Tool.vue'
import speed from '../views/Speed.vue'
import record from '../views/record.vue'
import detail from '../views/detail.vue'
import ipSearch from '../views/ipSearch.vue'
import pingTest from '../views/pingTest.vue'
import test from '../views/test.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
	 meta: {
	        keepAlive: true // 需要缓存
	      } 
  },
  {
    path: '/tool',
    name: 'tool', 
    component: () => import(/* webpackChunkName: "about" */ '../views/Tool.vue')
  },
  {
    path: '/speed',
    name: 'speed', 
    component: () => import(/* webpackChunkName: "about" */ '../views/Speed.vue')
  },
  {
    path: '/record',
    name: 'record', 
    component: () => import(/* webpackChunkName: "about" */ '../views/record.vue')
  }, 
  {
    path: '/detail',
    name: 'detail', 
    component: () => import(/* webpackChunkName: "about" */ '../views/detail.vue')
  }, 
  {
    path: '/ipSearch',
    name: 'ipSearch', 
    component: () => import(/* webpackChunkName: "about" */ '../views/ipSearch.vue')
  }, 
  {
    path: '/pingTest',
    name: 'pingTest', 
    component: () => import(/* webpackChunkName: "about" */ '../views/pingTest.vue')
  }, 
  {
    path: '/test',
    name: 'test', 
    component: () => import(/* webpackChunkName: "about" */ '../views/test.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
