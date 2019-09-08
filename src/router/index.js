import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/views/Home')

const Signup = () => import('@/views/Signup')
const Signin = () => import('@/views/Signin')

const TransitoValidacion = () => import('@/views/TransitoValidacion')
const TransitoRegistros = () => import('@/views/TransitoRegistros')
//import AuthGuard from './routeGuard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'signin'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/transito',
      name: 'transito',
      component: TransitoValidacion,
    },
    {
      path: '/transito-registros',
      name: 'transito-registros',
      component: TransitoRegistros
    }
  ],
  mode: 'history',
  base: process.env.BASE_URL
})