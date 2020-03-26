<template>
  <div>
    <div v-if='this.$route.name == "404"'>
      <v-app id="app">
        <v-content>
          <router-view/>
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
                <v-list-item-icon>
                <v-icon small>mdi-dots-vertical</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title v-if="project.complete" class="cyan--text">{{project.name}}</v-list-item-title>
                <v-list-item-title v-else class="red--text">{{project.name}}</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list>
            </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        </div>
        <template v-slot:append>
        <div class="pa-2">
            <v-btn block outlined color='white'>Add Project</v-btn>
        </div>
        </template>

        </v-navigation-drawer>
          <v-content class="blue-grey lighten-5">
            <router-view/>
          </v-content>
      </v-app>
    </div>
</div>
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

</style>
