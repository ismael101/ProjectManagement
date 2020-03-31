<template>
  <div>
    <div v-if="this.$store.state.projects.filter(project => project._id == this.$route.params.id).length > 0">
      <v-container width='500' class="py-5 px-5">
        <Project v-bind:project='this.$store.state.projects.filter(project => project._id == this.$route.params.id)[0]'/>
    <v-sheet class="infosheet">
          <Task v-for="task in this.$store.state.projects.filter(project => project._id == this.$route.params.id)[0].tasks" :key="task._id" v-bind:task="task"/>
    </v-sheet>
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
import Project from '../components/Project'
import Create from '../components/Create'
import Task from '../components/Task'
export default {
  components:{
    Task,
    Project,
    Create
  },
  data(){
    return{
      dialog:false
    }
  }
}

</script>

<style>
.infosheet{
  border-radius: 50;
}
</style>
