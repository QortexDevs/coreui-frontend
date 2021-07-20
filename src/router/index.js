import Vue from 'vue'
import Router from 'vue-router'
import { authService } from '../services/auth.service'

const TheContainer = () => import('@/containers/TheContainer')
const Dashboard = () => import('@/views/Dashboard')

const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const LoginForm = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

Vue.use(Router)

export const router = new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

router.beforeEach((to, from, next) => {
  const authPages = ['/login']
  const authRequired = !authPages.includes(to.path)
  const loggedIn = authService.isLoggedIn()
  if (authRequired && !loggedIn) {
    return next('/login')
  } else if (!authRequired && loggedIn) {
    return next('/')
  }

  return next()
})

function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        }
      ]
    },
    {
      path: '/login',
      name: 'LoginForm',
      component: LoginForm
    }
  ]
}
