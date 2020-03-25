<template>
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
            :to="`/${project._id}`"
          >
          <v-list-item-icon>
            <v-icon v-if="project.complete" color='cyan'>mdi-circle-outline</v-icon>
            <v-icon v-else color='red'>mdi-circle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{project.name}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    </div>
     </v-navigation-drawer>
      <v-content class="blue-grey lighten-5">
        <router-view/>
      </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      drawer:true,
      panel:0
    }
  },
  async mounted(){
    try{
      await this.$store.dispatch('setprojects')
    }catch(err){
      console.log(err)
    }
    
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
body{
  font-family: 'Roboto', sans-serif;
}
</style>