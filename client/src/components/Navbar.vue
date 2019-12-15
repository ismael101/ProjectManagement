<template>
<nav>
  <v-app-bar flat app>
      <v-app-bar-nav-icon @click="drawer = !drawer" v-if='!$store.state.auth'></v-app-bar-nav-icon>
      <v-toolbar-title><span class="font-weight-light">Project Management</span></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text v-on:click='signout' v-if='$store.state.auth'>Sign Out</v-btn>
        <v-btn text v-on:click='register' v-if="!$store.state.auth">Register</v-btn> 
  </v-app-bar>
  <v-navigation-drawer width='300' class="cyan" v-if='$store.state.auth'>
      <v-container>
          <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="200">
            <img class="text-lg-center" :src="this.$store.state.userimage">
          </v-avatar>
        </v-flex>
        <v-flex class='mt-2'>
           <p class="white--text subheading mt-5">{{this.$store.state.user}}</p>
        </v-flex>
        <v-flex class="mt-4 mb-6">
        </v-flex>
      </v-layout>
       <v-list
        dense
        nav
      >
        <v-list-item 
          v-for="item in items"
          :key="item.title"
          link
          router :to='item.route'
          class='white--text'
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
         </v-container>
  </v-navigation-drawer>
</nav>
</template>

<script>
export default {
    data(){
        return{
            drawer:true,
            items:[
                {
                    icon:'fas fa-list',
                    title:'Projects',
                    route:'/projects'
                },
                {
                    icon:'mdi-message-tex',
                    title:'Team',
                    route:'/team'

                },
                {
                    icon:'account_circle',
                    title:'Chat',
                    route:'/chat'
                }
            ]
        }
    },
    methods:{
        signout(){
            this.$router.push({name:'login'})
        },
        register(){
            this.$router.push({name:'register'})
        }
    }

}
</script>

<style>

</style>