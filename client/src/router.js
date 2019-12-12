import Vue from 'vue'
import Router from 'vue-router'
import Projects from './views/Projects'
import Team from './views/Team'
import Chat from './views/Chat'
import NotFound from './views/NotFound'
import Login from './views/Login'
import Register from './views/Register'

Vue.use(Router)

export default new Router({
    mode:'history',
    base:process.env.BASE_URL,
    routes:[
        {
            path:'/',
            name:'login',
            component:Login
        },
        {
            path:'/register',
            name:'register',
            component:Register
        },
        {
            path:'/projects',
            name:'projects',
            component:Projects
        },
        {
            path:'/chat',
            name:'chat',
            component:Chat
        },
        {
            path:'/team',
            name:'team',
            component:Team
        },
        {
            path:'*',
            name:'notfound',
            component:NotFound
        }
    ]
})