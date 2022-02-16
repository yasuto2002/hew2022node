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
import memberconfirmation from './components/member-confirmation.vue'
import MemberComp from './components/MemberComp.vue'
import Wsearchresult from './components/Wsearch-result.vue'
import Csearchresult from './components/Csearch-result.vue'
import Propertydetail from './components/Property-detail.vue'
import Logreg from './components/Logreg.vue'
import Mypage from './components/Mypage.vue'
import passchange from './components/pass-change.vue'
import Passchangecomp from './components/Pass-change-comp.vue'
import Mypagechange from './components/Mypage-change.vue'
import Memberwithdrawal from './components/Member-withdrawal.vue'
import Memberwithdrawaldecision from './components/Member-withdrawal-decision.vue'
import Contact from './components/Contact.vue'
import Contactdecision from './components/Contact-decision.vue'
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
      path: '/memberauthentication',
      name: 'member-authentication',
      component: memberauthentication,
    },
    {
      path: '/member-confirmation',
      name: 'member-confirmation',
      component: memberconfirmation,
    },
    {
      path: '/MemberComp',
      name: 'MemberComp',
      component: MemberComp,
    },
    {
      path: '/Wsearch-result',
      name: 'Wsearch-result',
      component: Wsearchresult,
      props: true
    },
    {
      path: '/Csearch-result',
      name: 'Csearch-result',
      component: Csearchresult,
      props: true,
    },
    {
      path: '/Property-detail',
      name: 'Property-detail',
      component: Propertydetail,
      props: true,
    },
    {
      path: '/Logreg',
      name: 'Logreg',
      component: Logreg,
      props: true,
    },
    {
      path: '/Mypage',
      name: 'Mypage',
      component: Mypage,
      props: true,
    },
    {
      path: '/pass-change',
      name: 'pass-change',
      component: passchange,
      props: true,
    },
    {
      path: '/Pass-change-comp',
      name: 'Pass-change-comp',
      component: Passchangecomp,
      props: true,
    }, {
      path: '/Mypage-change',
      name: 'Mypage-change',
      component: Mypagechange,
      props: true,
    }, {
      path: '/Member-withdrawal',
      name: 'Member-withdrawal',
      component: Memberwithdrawal,
      props: true,
    }, {
      path: '/Member-withdrawal-decision',
      name: 'Member-withdrawal-decision',
      component: Memberwithdrawaldecision,
      props: true,
    }, {
      path: '/Contact',
      name: 'Contact',
      component: Contact,
      props: true,
    }, {
      path: '/Contact-decision',
      name: 'Contact-decision',
      component: Contactdecision,
      props: true,
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0
    }
  }
})
