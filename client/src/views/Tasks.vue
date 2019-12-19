<template>
   <div>
   <v-app-bar flat>
     <v-toolbar-title>Tasks for Project: {{name}}</v-toolbar-title>
     <v-spacer/>
     <Add type='task' :team='team' v-bind:projectid='projectid'></Add>
   </v-app-bar>
    <v-divider></v-divider>
      <v-container fluid class="my-5">
      <v-card height="150px" flat v-for="task in this.$store.state.tasks.filter(task => task.projectid  == $route.params.id)" :key="task.id" :class='task.completed'>
        <v-layout row wrap >
          <v-flex xs6 sm3 md3>
            <h2 class="text-center grey--text text-xs-center">Title</h2>
            <h3 class="text-center grey--text text-xs-center">{{ task.name }}</h3>
          </v-flex>
          <v-flex xs6 sm3 md3>
            <h2 class="text-center grey--text text-xs-center">Description</h2>
            <h3 class="text-center grey--text text-xs-center">{{ task.description.substring(0,50) }}</h3>
          </v-flex>
          <v-flex xs6 sm3 md3>
            <div class="text-center grey--text text-xs-center">
              <h2 class="text-center grey--text text-xs-center">Status</h2>
              <v-chip outlined small color='green' v-if='task.completed' class="text-center text-xs-center">complete</v-chip>
              <v-chip outlined small color='red' v-if='!task.completed' class="text-center text-xs-center">ongoing</v-chip>
            </div>
          </v-flex>
          <v-flex xs6 sm3 md3 justify='center'>
            <h2 class="text-center grey--text text-xs-center">Action</h2>
            <v-btn-toggle class="text-center">
              <Edit type='task' v-bind:id="task.id" class="text-xs-center"></Edit>
              <v-icon color='red' @click='deleteTask(task.id)' class="text-center text-xs-center" outlined>delete</v-icon>
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
      name:'',
      projectid:'',
      team:''
    }
  },
  methods:{
    getTasks(){
      this.$tasks.getTasks(this.$store.state.token)
                  .then(tasks =>{
                    this.$store.dispatch('setTasks', tasks)
                    let projects = this.$store.state.projects.filter(project => project.id == this.$route.params.id)
                    this.name = projects[0].name
                    this.projectid = projects[0].id
                    this.team = projects[0].team
                  })
                  .catch(err => {
                    console.log(err)
                  })
    },
    deleteTask(id){
      this.$tasks.deleteTask(this.$store.state.token,id)
                .then(() => {
                  this.$store.dispatch('deleteTask',id)
                })
                .catch(err => {
                  console.log(err)
                })
    }
  },
  mounted(){
    this.getTasks()
  }
}
</script>

<style>

</style>