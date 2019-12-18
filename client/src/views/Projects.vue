<template>
   <div>
   <v-app-bar>
     <v-toolbar-title>Projects</v-toolbar-title>
     <v-spacer/>
   </v-app-bar>
    <v-divider></v-divider>
     <v-container class="my-5">
      <v-card flat v-for="project in this.$store.state.projects" :key="project.id" class="project">
        <v-layout row wrap class="`pa-3`">
          <v-flex xs12 md4>
            <div class="caption grey--text text-center">Project title</div>
            <div class="text-center">{{ project.name }}</div>
          </v-flex>
          <v-flex xs12 sm3 md2>
            <div class="caption grey--text text-center">Person</div>
            <div class="text-center">{{ project.description.substring(0,20) }}</div>
          </v-flex>
          <v-flex xs4 sm3 md2>
            <div class="caption grey--text text-center">Status</div>
            <div class="text-center" v-if="project.completed"><v-chip green outlined>complete</v-chip></div>
            <div class="text-center" v-if="!project.completed"><v-chip red outlined>ongoing</v-chip></div>
          </v-flex>
            <v-flex md2 xs4 sm3>
            <v-btn-toggle class='mt-2 text-center'>
              <Edit v-bind:id="project.id" v-bind:type='project'/>
              <v-icon @click='deleteProject(project.id)'>delete</v-icon>
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
    getProjects(){
      this.$projects.getProjects(this.$store.state.token)
                    .then(projects => {
                        this.$store.dispatch('setProjects', projects.data)
                    })
                    .catch(err => {
                      console.log(err)
                      //this.$store.dispatch('Dump')
                      //this.$router.push(login)
                    })
    },
    deleteProject(id){
      this.$projects.deleteProject(this.$store.state.token,id)
                    .then(() => {
                      this.$store.dispatch('deleteProject',id)
                    })
                    .catch(err => {
                      console.log(err)
                      //this.$store.dispatch('Dump')
                      //this.$router.push(login)
                    })
    }
  },
  mounted(){
    this.getProjects()
  }
}
</script>

<style>
.project{
  border-left: 4px solid cyan;
  border-right: 4px solid cyan
}
</style>