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
    update(data){
        return axios.post('/users/update',data).then(response => {
            return response.data
        })
    }

}