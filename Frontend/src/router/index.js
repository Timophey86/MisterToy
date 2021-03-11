import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import toyApp from '../views/toy-app.cmp.vue'
import toyEdit from "../views/toy-edit.cmp.vue"
import toyDetails from "../views/toy-details.cmp.vue"
import userPage from "../views/user-page.cmp.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/app',
    name: 'Toy-App',
    component: toyApp
  },
  {
    path: '/user',
    name: 'user-page',
    component: userPage
  },
  {
    path: '/toy/details/:toyId',
    component: toyDetails
},
  {
    path: '/toy/edit/:toyId?',
    component: toyEdit
}
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
