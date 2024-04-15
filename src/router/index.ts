import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/details/:id',
      name: 'details',
      component: () => import('../views/ProductDetails.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/ShoppingCart.vue')
    }
  ]
})

export default router
