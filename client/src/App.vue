<template>
  <v-app>
    <v-app-bar
      app
      color="blue-grey darken-4"
      flat
      dark
      >
      <v-toolbar-title>
        Projects
      </v-toolbar-title>
    </v-app-bar>
      <v-content class="blue-grey darken-4" app>
          <router-view/>
      </v-content>
  </v-app>
</template>

<script>
import Error from './components/Error'
export default {
  name: 'App',
  components:{
    Error
  },
  async mounted(){
    try{
      await this.$store.dispatch('setprojects')
    }catch(err){
    
    }
  }
};
</script>
