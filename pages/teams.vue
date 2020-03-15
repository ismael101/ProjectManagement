<template>
  <div>
      <v-container fluid class="py-5 px-5">
          <div class="mx-5 my-5">
            <v-row>
                <v-col v-for="member in members" :key="member.id">
                    <Team :user='member'/>
                </v-col>
            </v-row>
          </div>
      </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import Team from '../components/Team'
export default {
    components:{
        Team
    },
    async asyncData({$axios}){
        let members = await $axios.$get(`http://localhost:8000/users/team/${process.env.team}`)
    
        return({members:members})
    }
}
</script>

<style>

</style>