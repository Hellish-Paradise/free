import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/views/HomePage')
  },
  {
    path: '/controlPanel',
    name: 'ControlPanel',
    component: () => import('@/views/ControlPanel')
  },
  {
    path: '/details',
    name: 'Details',
    component: () => import('@/views/Details')
  },
  {
    path: '/confidential',
    name: 'Confidential',
    component: () => import('@/views/Confidential')
  },
  {path: '/:pathMatch(.*)', name: 'NotFound', component: () => import('@/views/404.vue')}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
