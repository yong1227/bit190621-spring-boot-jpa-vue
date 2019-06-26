import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import JoinForm from '@/components/member/JoinForm'
import LoginForm from '@/components/member/LoginForm'
import Calculator2 from '@/components/basic/Calculator2'
import ListTable from '@/components/member/ListTable'


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
      path: '/Calculator2',
      name: 'Calculator2',
      component: Calculator2
    },
    {
      path: '/JoinForm',
      name: 'JoinForm',
      component: JoinForm
    },
    {
      path: '/LoginForm',
      name: 'LoginForm',
      component: LoginForm
    },
    {
      path: '/ListTable',
      name: 'ListTable',
      component: ListTable
    },
    
  
  ]
})
