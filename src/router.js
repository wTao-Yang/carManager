import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/login.vue')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import(/* webpackChunkName: "about" */ './views/index.vue'),
      children:[
        {
          path: '/newCar',
          name: 'newCar',
          component: () => import(/* webpackChunkName: "about" */ './views/newCar.vue')
        },
        {
          path: '/about',
          name: 'about',
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
          path: '/appoint',
          name: 'appoint',
          component: () => import(/* webpackChunkName: "about" */ './views/appoint.vue')
        },
        {
          path: '/suggest',
          name: 'suggest',
          component: () => import(/* webpackChunkName: "about" */ './views/suggest.vue')
        },
        {
          path: '/admin',
          name: 'admin',
          component: () => import(/* webpackChunkName: "about" */ './views/admin.vue')
        },
        {
          path: '/setting',
          name: 'setting',
          redirect:'/brand',
          component: () => import(/* webpackChunkName: "about" */ './views/setting.vue'),
          children:[
            {
              path: '/hotBrand',
              name: 'hotBrand',
              component: () => import(/* webpackChunkName: "about" */ './components/hotBrand.vue')
            },
            {
              path: '/brand',
              name: 'brand',
              component: () => import(/* webpackChunkName: "about" */ './components/brand.vue')
            },
            {
              path: '/wheel',
              name: 'wheel',
              component: () => import(/* webpackChunkName: "about" */ './components/wheel.vue')
            },
          ]
        },
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/',
          redirect:'/home'
        },
      ]
    },
    {
      path: '/',
      name: 'index',
      redirect:'/index',
      component: () => import(/* webpackChunkName: "about" */ './views/index.vue'),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    // {
    //   path: '/appoint',
    //   name: 'appoint',
    //   component: () => import(/* webpackChunkName: "about" */ './views/appoint.vue')
    // },
    // {
    //   path: '/suggest',
    //   name: 'suggest',
    //   component: () => import(/* webpackChunkName: "about" */ './views/suggest.vue')
    // },
    // {
    //   path: '/admin',
    //   name: 'admin',
    //   component: () => import(/* webpackChunkName: "about" */ './views/admin.vue')
    // },
    // {
    //   path: '/setting',
    //   name: 'setting',
    //   component: () => import(/* webpackChunkName: "about" */ './views/setting.vue')
    // }
  ]
})
