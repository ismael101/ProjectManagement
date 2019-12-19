import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    strict:true,
    plugins:[createPersistedState()],
    state:{
        token:null,
        auth:false,
        username:'',
        pic:'',
        id:'',
        projects:[],
        tasks:[],
        team:[]
    },
    mutations:{
        setToken(state,token){
            state.token = token
        },
        setUser(state,user){
            state.username = user.username
            state.pic = user.pic
            state.id = user.id
            state.auth = true
        },
        setProjects(state,projects){
            state.projects = projects
        },
        setTasks(state,tasks){
            state.tasks = tasks
        },
        setTeam(state,team){
            state.team = team
        },
        Dump(state){
            state.token = null,
            state.auth = false
            state.username = '',
            state.id = '',
            state.pic = '',
            state.projects = [],
            state.tasks = [],
            state.team = []
        }
    },
    actions:{
        setToken({commit}, token){
            commit('setToken', token)
        },
        setUser({commit}, user){
            commit('setUser',user)
        },
        setProjects({commit}, projects){
            commit('setProjects', projects)
        },
        setTasks({commit}, tasks){
            commit('setTasks', tasks)
        },
        setTeam({commit}, team){
            commit('setTeam', team)
        },
        Dump({commit}){
            commit('Dump',null)
        }
    }
})