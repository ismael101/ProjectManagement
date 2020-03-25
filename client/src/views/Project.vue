<template>
  <v-container width='500' fluid class="py-5 px-5">
    <v-row>
      <v-col md="4" sm="2">
        <h1>Info</h1>
        <v-divider/>
      </v-col>
      <v-col md="8" sm="10">
        <h1>Tasks</h1>
        <v-divider/>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4" sm="2" xs="12">
        <v-progress-linear
          :value="this.$store.state.projects.filter(project => project._id == this.$route.params.id)[0].progress"
          height="25"
          reactive
          class="my-2"
        >
          <strong>{{ Math.ceil(this.$store.state.projects.filter(project => project._id == this.$route.params.id)[0].progress) }}%</strong>
        </v-progress-linear>
      </v-col>
      <v-col md="8" sm="10" xs="12">
        <Task v-for="task in this.$store.state.projects.filter(project => project._id == this.$route.params.id)[0].tasks" :key="task._id" v-bind:task="task"/> 
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Task from '../components/Task'
export default {
  components:{
    Task
  },
  data(){
    return{
    
    }
  }
}

</script>

<style>

</style>