import {
  createRouter,
  createWebHistory
} from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import HelloJSX from './components/Hello.vue'
import Member from './components/Member.vue'
import Top from './components/Top.vue'
import Login from './components/Login.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [{
      path: '/',
      name: 'Top',
      component: Top,
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/Member',
      name: 'Member',
      component: Member,
    },
    {
      path: '/Hello',
      name: 'Hello',
      component: HelloJSX,
    },
  ],
})
