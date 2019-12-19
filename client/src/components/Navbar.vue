<template>
<nav>
  <v-app-bar flat app>
      <v-icon @click="drawer = !drawer" v-if='$store.state.auth' class="mr-3">menu</v-icon>
      <v-toolbar-title><span class="font-weight-light">Project Management</span></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text v-on:click='signout' v-if='$store.state.auth'>Sign Out</v-btn>
        <v-btn text v-on:click='register' v-if="!$store.state.auth && $route.name == 'login'">Register</v-btn>
        <v-btn text v-on:click='login' v-if='!$store.state.auth && $route.name == "register"'> Login</v-btn>
  </v-app-bar>
   <v-navigation-drawer width=300 app v-model="drawer" class="cyan" v-if='$store.state.auth'>
       <v-container>
          <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="200">
            <v-img :src='this.$store.state.pic'></v-img>
          </v-avatar>
        </v-flex>
        <v-flex class='mt-2'>
           <p class="white--text subheading mt-5">{{this.$store.state.username}}</p>
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
                    icon:'list',
                    title:'Projects',
                    route:'/projects'
                },
                {
                    icon:'person_pin',
                    title:'Team',
                    route:'/team'

                },
            ]
        }
    },
    methods:{
        signout(){
            this.$router.push({path:'/'})
            this.$store.dispatch('Dump')
        },
        register(){
            this.$router.push({path:'/register'})
        },
        login(){
          this.$router.push({path:'/'})
        }
    }

}
</script>

<style>

</style>