import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    projects:[],
  },
  mutations: { 
    setprojects(state, projects){
      state.projects = projects
    },
    addprojects(state, project){
      state.projects.push(project)
    },
    updateproject(state, project){
      state.projects.forEach(element => {
        if(element._id = project.id){
          element = project
        }
      })
    },
    deleteproject(state, project){
      state.projects.filter(element => element._id != project._id)
    }
  },
  actions: {
    async setprojects({commit}){
      try{
       let projects = await axios.get('http://localhost:4000/projects/')
       commit('setprojects', projects.data)
      }catch(err){
        console.log(err)
      }
    },
    async addprojects({commit}, data){
      try{
        let project = await axios.post('http://localhost:4000/projects/', data)
        commit('addprojects', project.data) 
      }catch(err){
        console.log(err)
      }
    },
    async updateproject({commit}, data){
      try{
        await axios.patch(`http://localhost:4000/projects/${data._id}`,data)
        commit('updateproject', data)
      }catch(err){
        console.log(err)
      }
    },
    async deleteproject({commit}, project){
      try{
        await axios.delete(`http://localhost:4000/projects/${project._id}`)
        commit('deleteproject', project) 
      }catch(err){
        console.log(err)
      }
    },
    async createtask({commit}, data){
      try{
        let task = await axios.post('http://localhost:4000/tasks/',data)
        commit('createtask',task)
      }catch(err){
        console.log(err)
      }
    },
    async updatetask({commit}, task){
      try{
        await axios.update(`http://localhost:4000/tasks/${task._id}`,task)
        commit('updatetask', task)
      }catch(err){

      }
    },
    async deletetask({commit}, task){
      await axios.delete(`http://localhost:4000/tasks/${task._id}`)
      commit('deletetask',task)
    }
  },
})