import axios from 'axios'

export default{
    getProjects(token){
        return axios.get('/projects/',{
            headers:{
                Authentication:`Bearer ${token}`
            }
        })
        .then(response => {
            return response.data
        })
    },
    createProject(token,data){
        return axios.get('/projects/',data,{
           headers:{
               Authentication:`Bearer ${token}`
           } 
        })
        .then(response => {
            return response.data
        })
    },
    updateProject(token, data){
        return axios.patch('/projects/',data,{
            headers:{
                Authentication:`Bearer ${token}`
            }
        })
        .then(response => {
            return response.data
        })
    },
    deleteProject(token,id){
        return axios.delete(`/projects/${id}`,{
           headers:{
               Authentication:`Bearer ${token}`
           } 
        })
        .then(response => {
            return response.data
        })
    }

}