import axios from 'axios'
//added functions here to fetch teams
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