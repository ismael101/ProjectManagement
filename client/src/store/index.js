import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    projects:[],
    error:false
  },
  mutations: {
    setprojects(state, projects){
      state.projects = projects
    },
    addproject(state, project){
      state.projects.push(project)
    },
    editproject(state, project){
      state.projects.forEach(element => {
        if(element._id == project._id){
          element.name = project.name
          element.description = project.description
          element.due = project.due
        }
        return element
      })
    },
    deleteproject(state, project){
      state.projects = state.projects.filter(element => element._id != project._id)
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
            element.name = task.name
            element.description = task.description
            element.due = task.due
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
    },
    seterror(state, flag){
      state.error = flag
    }
  },
  actions: {
    async setprojects({commit}){
      try{
       let projects = await axios.get('http://localhost:4000/api/projects/')
       commit('setprojects', projects.data)
       commit('seterror', false)
      }catch(err){
        console.log(err)
        commit('seterror', true)
      }
    },
    async addproject({commit}, data){
      try{
        let project = await axios.post('http://localhost:4000/api/projects/', data)
        commit('addproject', project.data) 
        commit('seterror', false)
      }catch(err){
        console.log(err)
        commit('seterror', true)
      }
    },
    async editproject({commit}, data){
      try{
        await axios.patch(`http://localhost:4000/api/projects/${data._id}`,data)
        commit('editproject', data)
        commit('seterror', false)
        console.log(err)
      }catch(err){
        commit('seterror', true)
      }
    },
    async deleteproject({commit}, project){
      try{
        await axios.delete(`http://localhost:4000/api/projects/${project._id}`)
        commit('deleteproject', project)
        commit('seterror', false) 
      }catch(err){
        console.log(err)
        commit('seterror', true)
      }
    },
    async addtask({commit}, data){
      try{
        let res = await axios.post('http://localhost:4000/api/tasks/',data)
        commit('addtask',res.data)
        commit('seterror', false)
      }catch(err){
        console.log(err)
        commit('seterror', true)
      }
    },
    async edittask({commit}, task){
      try{
        await axios.patch(`http://localhost:4000/api/tasks/${task._id}`,task)
        commit('edittask', task)
        commit('seterror', false)
      }catch(err){
        console.log(err)
        commit('seterror', true)
      }
    },
    async deletetask({commit}, task){
      try{
        await axios.delete(`http://localhost:4000/api/tasks/${task._id}`)
        commit('deletetask',task)
        commit('seterror', false) 
      }catch(err){
        console.log(err)
        commit('seterror', true)
      }
    }
  },
})
