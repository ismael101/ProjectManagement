import axios from 'axios'

export default{
    getProjects(token){
        return axios.get('/projects/',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.data
        })
    },
    createProject(token,data){
        return axios.post('/projects/',data,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.data
        })
    },
    updateProject(token, data){
        return axios.patch(`/projects/${data.id}`,data,{
            headers:{
                Authorization:`Bearer ${token}`
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