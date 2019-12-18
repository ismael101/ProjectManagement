import axios from 'axios'

export default{
    login(credentials){
        return axios.post('/users/login',credentials).then(response => {
            return response.data
        })
    },
    register(credentials){
        return axios.post('/users/register',credentials).then(response => {
            return response.data
        })
    },
    members(token){
        return axios.post('/users/members',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            return response.data
        })
    }

}