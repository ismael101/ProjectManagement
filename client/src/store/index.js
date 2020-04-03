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
    editproject(state, project){
      state.projects.map(element => {
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
        if(project._id == task.project){
          project.tasks.push(task)
        }
      });
    },
    edittask(state, task){
      state.projects.map(project => {
        project.tasks = project.tasks.map(element => {
          if(element._id == task._id){
            element = task
          }
          return element
        })
        return project
      })
    },
    deletetask(state, task){
      state.projects.map(project => {
        project.tasks = project.tasks.filter(element => element._id != task._id)
        return project
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
    async editproject({commit}, data){
      try{
        await axios.patch(`http://localhost:4000/api/projects/${data._id}`,data)
        commit('editproject', data)
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
    async edittask({commit}, task){
      try{
        await axios.patch(`http://localhost:4000/api/tasks/${task._id}`,task)
        commit('edittask', task)
      }catch(err){
        console.log(err)
      }
    },
    async deletetask({commit}, task){
      try{
        await axios.delete(`http://localhost:4000/api/tasks/${task._id}`)
        commit('deletetask',task) 
      }catch(err){
        console.log(err)
      }
    }
  },
})
