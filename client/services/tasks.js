import axios from 'axios'

export default{
    getTasks(token){
        return axios.get('/tasks/',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.data
        })
    },
    createTask(token,data){
        return axios.post('/tasks/',data,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.data
        })
    },
    updateTask(token, data){
        return axios.patch(`/tasks/${data.id}`,data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then(response => {
            return response.data
        })
    },
    deleteTask(token,id){
        return axios.delete(`/tasks/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.data
        })
    }

}