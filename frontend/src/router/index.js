import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Calculator from '@/components/basic/Calculator'
import JoinForm from '@/components/member/JoinForm'
// import KbnLoginView from '@/components/templates/KbnLoginView'
import KbnLoginForm from '@/components/molecules/KbnLoginForm'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/calculator',
      name: 'calculator',
      component: Calculator
    },
    {
      path: '/joinForm',
      name: 'joinForm',
      component: JoinForm
    },
    {
      path: '/KbnLoginForm',
      name: 'KbnLoginForm',
      component: KbnLoginForm
    },
    // {
    //   path: '/KbnLoginView',
    //   name: 'KbnLoginView',
    //   component: KbnLoginView
    // }
  
  ]
})
