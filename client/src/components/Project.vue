<template>
<div>
    <v-alert type="warning" v-if="error">
      API Error
    </v-alert>
    <v-row>
        <v-col md='6' sm='6' xs='6'>
            <h2 class="my-1 headline">{{project.name}} - <span class="grey--text">{{project.due.substring(0,10)}}</span></h2>
            <div>
                <h3 class="grey--text">{{project.description}}</h3>
            </div>
        </v-col>
        <v-col class="text-right" md='6' sm='6' xs='6'>
            <Create v-bind:type="'task'"  v-on:createObject='createTask' class="my-2"/>
            <v-layout justify-end class="my-2">   
                <Edit v-bind:object="project" v-on:editObject="editProject"/>
                <Delete v-bind:object="project" v-on:deleteObject="deleteProject"/>
            </v-layout>
        </v-col>
    </v-row>
        <v-progress-linear
        class="my-4"
        :value="progress"
        color="deep-purple accent-4"
        height="25"
        reactive
        >
            <template v-slot="{ value }">
                <strong class="white--text">{{ Math.ceil(value) }}%</strong>
            </template>
        </v-progress-linear>
</div>
</template>

<script>
import Create from './Create'
import Edit from './Edit'
import Delete from './Delete'
export default {
props:['project'],
components:{
    Create,
    Edit,
    Delete
},
data(){
    return{
        error:false
    }
},
computed: {
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
    }
  },
methods:{
    createTask(object){
        try{
            object.project = this.project._id
            this.$store.dispatch('addtask',object)
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
    deleteProject(project){
        try{
            this.$store.dispatch('deleteproject', project)
            this.$router.push('/')
        }catch(err){
            this.error = true
        }
    }
}
}
</script>

<style>

</style>