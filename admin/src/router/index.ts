import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/views/Main.vue'
import ErrorPage from '@/views/404.vue'
import Login from '@/views/Login.vue'
import Test from '@/views/Test.vue'
import Test2 from '@/views/Test2.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/test2',
      name: 'test2',
      component: Test2
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/404',
      name: 'error',
      component: ErrorPage
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
      name: 'Any'
    }
  ],
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})

export default router
