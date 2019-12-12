import axios from 'axios'

export default{
    getTasks(token){
        return axios.get('/tasks/',{
            headers:{
                Authentication:`Bearer ${token}`
            }
        })
        .then(response => {
            return response.data
        })
    },
    createTask(token,data){
        return axios.get('/tasks/',data,{
           headers:{
               Authentication:`Bearer ${token}`
           } 
        })
        .then(response => {
            return response.data
        })
    },
    updateTask(token, data){
        return axios.patch('/tasks/',data,{
            headers:{
                Authentication:`Bearer ${token}`
            }
        })
        .then(response => {
            return response.data
        })
    },
    deleteTask(token,id){
        return axios.delete(`/tasks/${id}`,{
           headers:{
               Authentication:`Bearer ${token}`
           } 
        })
        .then(response => {
            return response.data
        })
    }

}