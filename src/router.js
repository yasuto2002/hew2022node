import {
  createRouter,
  createWebHistory
} from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import HelloJSX from './components/Hello.vue'
import Member from './components/Member.vue'
import Top from './components/Top.vue'
import Login from './components/Login.vue'
import Test from './components/Test.vue'
import Error from './components/Error.vue'
import memberauthentication from './components/memberauthentication.vue'

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
    {
      path: '/Test',
      name: 'Test',
      component: Test,
    },
    {
      path: '/Error',
      name: 'Error',
      component: Error,
    },
    {
      path: '/Error',
      name: 'Error',
      component: Error,
    },
    {
      path: '/memberauthentication',
      name: 'member-authentication',
      component: memberauthentication,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0
    }
  }
})
