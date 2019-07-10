import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home'
import CreateBook from 'components/book/new'
import Book from 'components/book'
import Login from 'components/login'
import store from '../store'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/books/:id',
      name: 'book',
      component: Book,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/book/new',
      name: 'CreateBook',
      component: CreateBook,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: ifNotAuthenticated,
    },
  ],
})
