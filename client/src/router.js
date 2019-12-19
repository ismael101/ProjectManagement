import Vue from 'vue'
import Router from 'vue-router'
import Projects from './views/Projects'
import Team from './views/Team'
import Tasks from './views/Tasks'
import NotFound from './views/NotFound'
import Login from './views/Login'
import Register from './views/Register'
import store from './store';

Vue.use(Router)

export default new Router({
    mode:'history',
    base:process.env.BASE_URL,
    routes:[
        {
            path:'/',
            name:'login',
            component:Login,
            beforeEnter: (to,from,next) => {
                if(store.state.auth){
                    next({name:'projects'})
                }
                else{
                  next()
                }
              }
        },
        {
            path:'/register',
            name:'register',
            component:Register,
            beforeEnter: (to,from,next) => {
                if(store.state.auth){
                    next({name:'projects'})
                }
                else{
                  next()
                }
              }
        },
        {
            path:'/projects',
            name:'projects',
            component:Projects,
            beforeEnter: (to,from,next) => {
                if(store.state.auth){
                    next()
                }
                else{
                  next({name:'login'})
                }
              }
        },
        {
            path:'/tasks/:id',
            name:'task',
            component:Tasks,
            beforeEnter: (to,from,next) => {
                if(store.state.auth){
                    next()
                }
                else{
                  next({name:'login'})
                }
              }
        },
        {
            path:'/team',
            name:'team',
            component:Team,
            beforeEnter: (to,from,next) => {
                if(store.state.auth){
                    next()
                }
                else{
                  next({name:'login'})
                }
              }
        },
        {
            path:'*',
            name:'notfound',
            component:NotFound
        }
    ]
})