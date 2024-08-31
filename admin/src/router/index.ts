import { createRouter, createWebHistory } from 'vue-router'
import Test from '@/views/Test.vue'
import Test2 from '@/views/Test2.vue'
import { useAuthStore } from '../stores/user'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'home',
      component: () => import('@/views/Main.vue'),
      children: [
        {
          path: '/admin/top_management',
          name: 'top_management',
          component: () => import('@/views/TopManagement.vue')
        },
        {
          path: '/admin/ad/create',
          name: 'ad_create',
          component: () => import('@/views/ad/Ads.vue')
        },
        {
          path: '/admin/ad/edit/:id',
          name: 'ad_edit',
          component: () => import('@/views/ad/Ads.vue'),
          props: true
        },
        {
          path: '/admin/ad/list',
          name: 'ad_list',
          component: () => import('@/views/ad/AdList.vue')
        },
        {
          path: '/admin/user_info',
          name: 'user_info',
          component: () => import('@/views/user/Info.vue')
        },
        {
          path: '/admin/product/categories',
          name: 'product_categories',
          component: () => import('@/views/product/Categories.vue')
        },
        {
          path: '/admin/product/categories/edit/:id',
          name: 'product_categories_edit',
          props: true,
          component: () => import('@/views/product/Categories.vue')
        },
        {
          path: '/admin/product/categories_list',
          name: 'product_categories_list',
          component: () => import('@/views/product/CategoriesList.vue')
        },
        {
          path: '/admin/product/list',
          name: 'product_list',
          component: () => import('@/views/product/ProductList.vue')
        },
        {
          path: '/admin/product/product',
          name: 'product',
          props: true,
          component: () => import('@/views/product/Product.vue')
        },
        {
          path: '/admin/product/edit/:id',
          name: 'product_edit',
          props: true,
          component: () => import('@/views/product/Product.vue')
        },
        {
          path: '/admin/news/categories',
          name: 'news_categories',
          component: () => import('@/views/news/Categories.vue')
        },
        {
          path: '/admin/news/categories/edit/:id',
          name: 'news_categories_edit',
          props: true,
          component: () => import('@/views/news/Categories.vue')
        },
        {
          path: '/admin/news/categories_list',
          name: 'news_categories_list',
          component: () => import('@/views/news/CategoriesList.vue')
        },
        {
          path: '/admin/news/list',
          name: 'news_list',
          component: () => import('@/views/news/NewsList.vue')
        },
        {
          path: '/admin/news/news',
          name: 'news',
          component: () => import('@/views/news/News.vue')
        },
        {
          path: '/admin/news/edit/:id',
          name: 'news_edit',
          component: () => import('@/views/news/News.vue'),
          props: true
        },
        {
          path: '/admin/order/list',
          name: 'order_list',
          component: () => import('@/views/order/List.vue')
        },
        {
          path: '/admin/order/order',
          name: 'order',
          component: () => import('@/views/order/Order.vue')
        },
        {
          path: '/admin/member/list',
          name: 'member_list',
          component: () => import('@/views/member/List.vue')
        },
        {
          path: '/admin/member/info',
          name: 'member_info',
          component: () => import('@/views/member/Member.vue')
        }
      ]
    },
    {
      path: '/admin/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/404',
      name: 'error',
      component: () => import('@/views/404.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
      name: 'any'
    }
  ],
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})

router.beforeEach((to, from) => {
  const { isLogin } = useAuthStore()
  if (!isLogin && to.name !== 'login') {
    return { name: 'login' }
  }
})

export default router
