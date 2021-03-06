import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import('@/views/Create.vue')
  },
  {
    path: '/:id',
    name: 'Todo',
    component: () => import('@/views/Todo.vue')
  },
  {
    path: '/:id/edit',
    name: 'Edit',
    component: () => import('@/views/Edit.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
