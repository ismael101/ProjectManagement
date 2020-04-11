<template>
  <div>
    <div v-if="this.$store.state.projects.filter(project => project._id == this.$route.params.id).length > 0">
      <v-container width='500' class="py-5 px-5" fluid>
            <Create v-bind:type="'task'" v-on:createObject='createTask' class="my-3"/>
          <v-row>
              <v-col md="4" sm="12">
                <h1 class="white--text">Project Info</h1>
                <v-divider class="mt-2 mb-5" color='white'/>
                <v-row class="white--text">
                    <v-col sm="4">
                        <span class="subtitle-1">Name</span>
                    </v-col>
                    <v-col sm="8">
                        <span class="subtitle-1">{{this.$store.state.projects.filter(project => project._id == this.$route.params.id)[0].name}}</span>
                    </v-col>
                    <v-col sm="4">
                        <span class="subtitle-1">Description</span>
                    </v-col>
                    <v-col sm="8">
                        <span class="subtitle-1">{{this.$store.state.projects.filter(project => project._id == this.$route.params.id)[0].description}}</span>
                    </v-col>
                    <v-col sm="4">
                        <span class="subtitle-1">Created</span>
                    </v-col>
                    <v-col sm="8">
                        <span class="subtitle-1">{{this.$store.state.projects.filter(project => project._id == this.$route.params.id)[0].createdAt.substring(0,10)}}</span>
                    </v-col>
                    <v-col sm="4">
                        <span class="subtitle-1">Due</span>
                    </v-col>
                    <v-col sm="8">
                        <span class="subtitle-1">{{this.$store.state.projects.filter(project => project._id == this.$route.params.id)[0].due.substring(0,10)}}</span>
                    </v-col>
                </v-row>
                <Progress v-bind:project="this.$store.state.projects.filter(project => project._id == this.$route.params.id)[0]"/>
              </v-col>
              <v-col md="8" sm="12">
                <h1 class="white--text" >Tasks</h1>
                <v-divider class="mt-2 mb-5" color='white'/>
                <Task v-for="task in this.$store.state.projects.filter(project => project._id == this.$route.params.id)[0].tasks" :key="task._id" v-bind:task="task" class="my-2"/>
              </v-col>
          </v-row>
      </v-container>
    </div>
    <div v-else>
      <v-container>
        <v-row justify='center' align='center'>
          <h1>Project Not Found</h1>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
import Create from '../components/Create'
import Task from '../components/Task'
import Progress from '../components/Progress'
export default {
  components:{
    Task,
    Create,
    Progress
  },
  data(){
    return{
      dialog:false
    }
  },
  methods:{
    createTask(object){
      try{
        object.project = this.$route.params.id
        this.$store.dispatch('addtask', object)
      }catch(err){
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>