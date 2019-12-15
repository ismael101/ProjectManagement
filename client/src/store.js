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
        user:{
            username:'',
            id:''
        },
        projects:[],
        tasks:[],
        team:[]
    },
    mutations:{
        setToken(state,token){
            state.token = token
        },
        setUser(state,username,id){
            state.user.username = username
            state.user.id = id
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
        }
    },
    actions:{
        setToken({commit}, token){
            commit('setToken', token)
        },
        setUser({commit}, username, id){
            commit('setUser',username,id)
        },
        setProjects({commit}, projects){
            commit('setProjects', projects)
        },
        setTasks({commit}, tasks){
            commit('setTasks', tasks)
        },
        setTeam({commit}, team){
            commit('setTeam', team)
        }
    }
})