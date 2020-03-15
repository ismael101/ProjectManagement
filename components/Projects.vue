<template>
  <v-card outlined>
      <v-card-title>
            {{project.name}}
            <v-spacer/> 
            <v-chip
            v-if="!project.complete"
            class="ma-2"
            color="red"
            text-color="white"
            >
            uncomplete
            </v-chip>
            <v-chip
            v-if="project.complete"
            class="ma-2"
            color="cyan"
            text-color="white"
            >
            complete
            </v-chip>
      </v-card-title>
      <v-card-subtitle>
          {{project.description}}
      </v-card-subtitle>
      <v-card-text>
          
          <v-row align="center">
              <v-col md='3'>
                  <h4>Progress: </h4>
              </v-col>
              <v-col md='9'>
                  <v-progress-linear :value='project.progress'></v-progress-linear>
              </v-col>
          </v-row>
      </v-card-text>
        
      <v-card-actions class="font-weight-bold">
          Assigned To: {{team}}
      </v-card-actions>
  </v-card>
</template>

<script>
export default {
    props:['project'],
    data(){
        return{
            team:''
        }
    },
    methods:{
        async getTeam(){
            let team = await this.$axios.$get(`http://localhost:8000/teams/${this.project._team}`)
            this.team = team.name
        }
    },
    mounted(){
        this.getTeam()
    }   
}
</script>

<style>

</style>