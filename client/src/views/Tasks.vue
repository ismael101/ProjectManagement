<template>
  <div>
   <v-app-bar>
     <v-toolbar-title>Tasks</v-toolbar-title>
     <v-spacer/>
   </v-app-bar>
    <v-divider></v-divider>
     <v-container class="my-5">
      <v-card flat v-for="task in this.$store.state.tasks.filter(task => task.projectid == this.$route.params.projectid)" :key="task.id" class="project">
        <v-layout row wrap class="`pa-3`">
          <v-flex xs12 md4>
            <div class="caption grey--text text-center">Task Title</div>
            <div class="text-center">{{ task.name }}</div>
          </v-flex>
          <v-flex xs12 sm3 md2>
            <div class="caption grey--text text-center">Task Desc.</div>
            <div class="text-center">{{ task.description.substring(0,20) }}</div>
          </v-flex>
          <v-flex xs4 sm3 md2>
            <div class="caption grey--text text-center">Status</div>
            <div class="text-center" v-if="task.completed"><v-chip green outlined>complete</v-chip></div>
            <div class="text-center" v-if="!task.completed"><v-chip red outlined>ongoing</v-chip></div>
          </v-flex>
            <v-flex md2 xs4 sm3>
            <v-btn-toggle class='mt-2 text-center'>
              <Edit v-bind:id="task.id" v-bind:type='task'/>
              <v-icon @click='deleteTask(task.id)'>delete</v-icon>
            </v-btn-toggle>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
   
  </div>
</template>

<script>
import Edit from '../components/Edit'
export default {
  data(){
    return{

    }
  },
  methods:{
    getTasks(){
      this.$tasks.getTasks(this.$store.state.token)
                  .then(tasks =>{
                    this.$store.dispatch('setTasks', tasks.data)
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