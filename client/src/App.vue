<template>
  <v-app>
    <Navbar/>
    <v-content class="mx-5 mx-b-5" justify-center>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  components:{Navbar},
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
