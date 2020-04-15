import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Project from '../views/Project.vue'
import Notfound from '../views/Notfound.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path:'/',
    name:'Home',
    component:Home
  },
  {
    path:'/:id',
    name:'Project',
    component:Project
  },
  {
    path:'*',
    name:'Error',
    component:Notfound
  }
]
const router = new VueRouter({
  routes
})

export default router
