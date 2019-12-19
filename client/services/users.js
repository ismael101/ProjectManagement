import axios from 'axios'

export default{
    login(credentials){
        return axios.post('/users/login',credentials).then(response => {
            return response.data
        })
    },
    register(data){
        return axios.post('/users/register',data,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response.data
        })
    },
    members(token){
        return axios.get('/users/members',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            return response.data
        })
    }

}