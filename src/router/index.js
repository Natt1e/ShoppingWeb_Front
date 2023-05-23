import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/MainFace')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register')
  },
  {
    path: '/d',
    name: 'D',
    component: () => import('../views/Detail')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/ShoppingCart')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/Order')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/AboutView')
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('../views/GoodDetail')
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('../views/Chat')
  },
  {
    path:'/information',
    name: 'Information',
    component: () => import('../views/ChangeInformation')
  },
  {
    path:'/business',
    name:'Business',
    component:() => import('../views/BusinessFace')
  }
]

const router = new VueRouter({
  routes
})

export default router
