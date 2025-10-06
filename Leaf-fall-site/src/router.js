import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/who-i-am',
    name: 'who-i-am', 
    component: () => import('@/views/WhoIAm.vue')
  },
  {
    path: '/works',
    name: 'works',
    component: () => import('@/views/Works.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error404',
    component: () => import('@/views/Error404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
