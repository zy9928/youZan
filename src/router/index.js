import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HomeConfig from "./home";
import mineConfig from "./mine";
import a from "./../views/login.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: HomeConfig
    // children: [
    //   {
    //     path: 'shopeCont/:id',
    //     name: 'shopeCont',
    //     component: () => import(/* webpackChunkName: "shopeCont" */ '../views/shopeCont.vue'),
    //   }
    // ]
  },
  {
    path: '/order/:id',
    name: 'order',
    component: () => import(/* webpackChunkName: "mine" */ '../views/Order.vue')
  },
  {
    path: '/mine/:id',
    name: 'mine',
    component: () => import(/* webpackChunkName: "mine" */ '../views/Mine.vue'),
    children: mineConfig
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  },
  {
    path: '/regiest',
    component: () => import(/* webpackChunkName: "regiest" */ '../views/regiest.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
  var isLogin = window.localStorage.getItem("isLogin");
  // console.log(!isLogin);
  if(!isLogin){
    switch(to.fullPath){
      case "/order/undefined" : router.push('/login');
      return;
      case "/mine/undefined" : router.push('/login');
      return;
    }
  }
  next();
})

export default router
