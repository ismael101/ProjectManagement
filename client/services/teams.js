import axios from 'axios'

export default{
    getTeam(token){
        return axios.get('/teams/',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.data
        })
    }
}