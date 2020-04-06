<template>
  <v-container fluid>
    <Create v-bind:type="'project'" v-on:createObject='createProject' class="my-3"/>
    <v-row>
      <v-col sm="12" md='4' v-for="project in this.$store.state.projects" :key="project._id">
        <Project v-bind:project="project"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Project from '../components/Project'
import Create from '../components/Create'
export default {
  name: 'Home',
  components:{
    Project,
    Create
  },
  methods:{
    createProject(object){
      try{
        this.$store.dispatch('addproject', object)
      }catch(err){
        console.log(err)
      }
    }
  }
}
</script>
