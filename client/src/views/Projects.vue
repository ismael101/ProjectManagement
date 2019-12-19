<template>
   <div>
   <v-app-bar flat>
     <v-toolbar-title>Projects</v-toolbar-title>
     <v-spacer/>
     <Add type='project' :team='team'></Add>
   </v-app-bar>
    <v-divider></v-divider>
      <v-container fluid class="my-5">
      <v-card height="150px" flat v-for="project in this.$store.state.projects" :key="project.id" :class='project.completed'>
        <v-layout row wrap >
          <v-flex xs12 md2>
            <h2 class="text-center grey--text text-xs-center">Team</h2>
            <h3 class="text-center grey--text text-xs-center">{{ project.team }}</h3>
          </v-flex>
          <v-flex xs12 sm3 md2>
            <h2 class="text-center grey--text text-xs-center">Title</h2>
            <h3 class="text-center grey--text text-xs-center">{{ project.name }}</h3>
          </v-flex>
          <v-flex xs4 sm3 md4>
            <h2 class="text-center grey--text text-xs-center">Description</h2>
            <h3 class="text-center grey--text text-xs-center">{{ project.description.substring(0,50) }}</h3>
          </v-flex>
          <v-flex xs4 sm3 md2>
            <div class="text-center grey--text text-xs-center">
              <h2 class="text-center grey--text text-xs-center">Status</h2>
              <v-chip outlined small color='green' v-if='project.completed' class="text-center text-xs-center">complete</v-chip>
              <v-chip outlined small color='red' v-if='!project.completed' class="text-center text-xs-center">ongoing</v-chip>
            </div>
          </v-flex>
          <v-flex xs4 sm3 md2 justify='center'>
            <h2 class="text-center grey--text text-xs-center">Action</h2>
            <v-btn-toggle class="text-center">
              <Edit type='project' v-bind:id='project.id' class="text-xs-center"></Edit>
              <v-icon color='yellow' outlined class="text-center text-xs-center" v-on:click='tasks(project.id)'>list_alt</v-icon>
              <v-icon color='red' @click='deleteProject(project.id)' class="text-center text-xs-center" outlined>delete</v-icon>
            </v-btn-toggle>
          </v-flex>
        </v-layout>
      </v-card>
      </v-container>
   
  </div>
</template>

<script>
import Edit from '../components/Edit'
import Add from '../components/Add'
export default {
  components:{Edit,Add},
  data(){
    return{
      team:''
    }
  },
  methods:{
    getProjects(){
      this.$projects.getProjects(this.$store.state.token)
                    .then(projects => {
                        this.$store.dispatch('setProjects', projects)
                        this.team = projects[0].team
                    })
                    .catch(err => {
                      console.log(err)
                      this.$store.dispatch('Dump')
                      this.$router.push(login)
                    })
    },
    deleteProject(id){
      this.$projects.deleteProject(this.$store.state.token,id)
                    .then(() => {
                      this.$projects.getProjects(this.$store.state.token)
                      .then(projects => {
                          this.$store.dispatch('setProjects', projects)
                          this.team = projects[0].team
                      })
                      .catch(err => {
                        console.log(err)
                        this.$store.dispatch('Dump')
                        this.$router.push(login)
                      })
                    })
                    .catch(err => {
                      console.log(err)
                    })
    },
    tasks(id){
      this.$router.push({ name: 'task', params: { id: id } })

    }
  },
  mounted(){
    this.getProjects()
  }
}
</script>

<style scoped>
.true{
  border-right: 4px solid lightgreen;
  border-left: 4px solid lightgreen
}
.false{
  border-right: 4px solid red;
  border-left: 4px solid red
}
</style>