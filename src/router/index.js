import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/views/Home')

const Login = () => import('@/views/Login')

const OdecoRegistro = () => import('@/views/OdecoRegistro')

const CajeroRecargas = () => import('@/views/CajeroRecargas')

const AdminRegistro = () => import('@/views/AdminRegistro')
const AdminUsuarios = () => import('@/views/AdminUsuarios')
const AdminValidacionesList = () => import('@/views/AdminValidacionesList')

const TransitoValidacion = () => import('@/views/TransitoValidacion')
const TransitoRegistros = () => import('@/views/TransitoRegistros')

import AuthGuard from './routeGuard'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: 'login'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/transito-validacion',
      name: 'transito-validacion',
      component: TransitoValidacion
    },
    {
      path: '/transito-registros',
      name: 'transito-registros',
      component: TransitoRegistros
    },
    {
      path: '/admin-usuarios',
      name: 'admin-usuarios',
      component: AdminUsuarios
    },
    {
      path: '/admin-registro',
      name: 'admin-registro',
      component: AdminRegistro
    },
    {
      path: '/admin-validaciones-list',
      name: 'admin-validaciones-list',
      component: AdminValidacionesList
    },
    {
      path: '/cajero-recargas',
      name: 'cajero-recargas',
      component: CajeroRecargas
    },
    {
      path: '/odeco-registro',
      name: 'odeco-registro',
      component: OdecoRegistro
    }
  ],
  mode: 'history',
  base: process.env.BASE_URL
})
router.beforeEach(AuthGuard)
export default router