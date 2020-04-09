<template>
  <v-card color="blue-grey darken-3 px-2 py-2" dark outlined>
      <v-card-title class="mb-5">
          <span class="headline" id='name' v-text="project.name"/>
          <v-spacer/>
          <v-chip color="cyan" id="status" v-if="complete" v-text="'complete'"/>
          <v-chip color="red" id="status" v-else v-text="'incomplete'"/>
      </v-card-title>
      <v-card-subtitle class="mb-2">
           <Progress v-bind:project="project"/>
      </v-card-subtitle>
      <v-card-text>
          <span class="subtitle-1" id="description" v-text="project.description"/>
          <v-row>
            <v-col>
                <div class="subtitle-1 grey--text">Created</div>
                <div class="subtitle-2" id="created" v-text="project.createdAt.substring(0,10)"/>
            </v-col>
            <v-col>
                <div class="subtitle-1 grey--text">Due</div>
                <div class="subtitle-2" id="due" v-text="project.due.substring(0,10)"/>
            </v-col>
            <v-col>
                <div class="subtitle-1 grey--text">Tasks</div>
                <div class="subtitle-2" id="task" v-text="project.tasks.length"/>
            </v-col>
          </v-row>
      </v-card-text>
      <v-card-actions>
          <router-link :to="`/${project._id}`">
            <span>
                Tasks
            </span>
          </router-link>
          <v-spacer/>
            <Delete v-bind:object="project" v-on:deleteObject="deleteProject"/>
            <Edit v-bind:object="project" v-on:editObject="editProject"/>
      </v-card-actions>
  </v-card>
</template>

<script>
import Delete from './Delete'
import Edit from './Edit'
import Progress from './Progress'

export default {
    props:['project'],
    components:{
        Delete,
        Edit,
        Progress
    },
    computed:{
        progress(){
        if(this.project.tasks.length > 0){
            let progress = 0
            this.project.tasks.forEach(element => {
                if(element.complete){
                    progress++
                }
            });
            return (progress/this.project.tasks.length) * 100  
        }else{
            return 100
        }     
        },
        complete(){
            let flag = true
            this.project.tasks.forEach(task => {
                if(task.complete == false){
                    flag = false
                }
            })
            return flag
        }
    },
    methods:{
        deleteProject(project){
        try{
            this.$store.dispatch('deleteproject', project)
            this.$router.push('/')
        }catch(err){
            this.error = true
        }
        
        },
        editProject(object){
        try{
            object._id = this.project._id
            this.$store.dispatch('editproject', object)
        }catch(err){
            this.error = true
        }
    },
    }
}
</script>

<style>

</style>