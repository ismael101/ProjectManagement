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
    addproject(state, project){
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
    },
    addtask(state, task){
      state.projects.forEach(project => {
        console.log(task)
        if(project._id == task.project){
          project.tasks.push(task)
        }
      });
    },
    updatetask(state, task){
      state.projects.forEach(project => {
        if(project._id == task.project){
          project.tasks.forEach(element => {
            if(element._id == task._id){
              element = task
            }
          })
        }
      })
    },
    deletetask(state, task){
      state.projects.forEach(project => {
        if(project._id == task.project){
          project.tasks.filter(element => element._id == task._id)
        }
      })
    }
  },
  actions: {
    async setprojects({commit}){
      try{
       let projects = await axios.get('http://localhost:4000/api/projects/')
       commit('setprojects', projects.data)
      }catch(err){
        console.log(err)
      }
    },
    async addproject({commit}, data){
      try{
        let project = await axios.post('http://localhost:4000/api/projects/', data)
        commit('addproject', project.data) 
      }catch(err){
        console.log(err)
      }
    },
    async updateproject({commit}, data){
      try{
        await axios.patch(`http://localhost:4000/api/projects/${data._id}`,data)
        commit('updateproject', data)
      }catch(err){
        console.log(err)
      }
    },
    async deleteproject({commit}, project){
      try{
        await axios.delete(`http://localhost:4000/api/projects/${project._id}`)
        commit('deleteproject', project) 
      }catch(err){
        console.log(err)
      }
    },
    async addtask({commit}, data){
      try{
        let res = await axios.post('http://localhost:4000/api/tasks/',data)
        commit('addtask',res.data)
      }catch(err){
        console.log(err)
      }
    },
    async updatetask({commit}, task){
      try{
        await axios.update(`http://localhost:4000/api/tasks/${task._id}`,task)
        commit('updatetask', task)
      }catch(err){

      }
    },
    async deletetask({commit}, task){
      await axios.delete(`http://localhost:4000/api/tasks/${task._id}`)
      commit('deletetask',task)
    }
  },
})
