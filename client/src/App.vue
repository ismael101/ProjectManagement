<template>
  <div>
    <div v-if='this.$route.name == "Error"'>
      <v-app id='app'>
          <v-content>
              <router-view/>
          </v-content>
        </v-app>
    </div>
    <div v-else>
        <div v-if="this.$store.state.error">
        <v-app id='app'>
          <v-content>
            <Error v-bind:error="'500'" v-bind:message="'Server Error'"/>
          </v-content>
        </v-app>
      </div>
      <div v-else>
        <v-app id="app">
          <v-app-bar flat app color="blue-grey lighten-5">
          <v-app-bar-nav-icon @click="drawer = !drawer" />
          <v-toolbar-title><span class="font-regular">Project Manager</span></v-toolbar-title>
          </v-app-bar>
              <v-navigation-drawer
              color='deep-purple accent-4'
              dark
              app
              v-model="drawer"
              width="256"
          >
          <v-layout column align-center>
              <v-avatar size="200" class="mt-5">
              <v-img :src="require('@/assets/ismaelfarah.png')"></v-img>
              </v-avatar>
          </v-layout>
          <div class="my-5">
          <v-list rounded>
              <v-list-item link to='/'>
              <v-list-item-content>
                  <v-list-item-title>Home</v-list-item-title>
              </v-list-item-content>
              </v-list-item>
          </v-list>
          <v-expansion-panels flat class="my-2" v-model="panel">
              <v-expansion-panel>
              <v-expansion-panel-header color='deep-purple accent-4'>Projects</v-expansion-panel-header>
              <v-expansion-panel-content color='deep-purple accent-4'>
                  <v-list rounded>
                  <v-list-item
                  v-for="project in this.$store.state.projects"
                  :key="project._id"
                  link
                  :to="`/project/${project._id}`"
                  >
                  <v-list-item-content>
                    <v-list-item-title>{{project.name}}</v-list-item-title>
                  </v-list-item-content>
                  </v-list-item>
              </v-list>
              </v-expansion-panel-content>
              </v-expansion-panel>
          </v-expansion-panels>
          </div>
          <template v-slot:append>
          <div class="pa-2">
            <Create v-bind:type="'project'"  v-on:createObject='createProject'/>
          </div>
          </template>

          </v-navigation-drawer>
            <v-content class="blue-grey lighten-5">
              <router-view/>
            </v-content>
        </v-app>
      </div>
    </div>
</div>
</template>

<script>
import Create from './components/Create'
import Error from './components/Error'
export default {
  name: 'App',
  components:{
    Create,
    Error
  },
  data(){
    return{
      drawer:true,
      panel:0,
    }
  },
  methods:{
    createProject(object){
      try{
        this.$store.dispatch('addproject', object)
      }catch(err){
        console.log(err)
      }
    }
  },
  async mounted(){
    try{
      await this.$store.dispatch('setprojects')
    }catch(err){
    
    }

  },
};
</script>
<style>

</style>
