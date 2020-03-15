<template>
  <v-app>
    <v-app-bar flat app color="blue-grey lighten-5">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title><span class="font-weight-bold">Nuxt.js Project Manager</span></v-toolbar-title>
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
        <v-img :src='avatar'></v-img>
      </v-avatar>
      <h1 class="my-2 white--text">{{username}}</h1>
    </v-layout>
      <v-divider/>
      <v-list rounded>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
     </v-navigation-drawer>
      <v-content class="blue-grey lighten-5">
        <nuxt/>
      </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
      return {
        drawer:false,
        username:'',
        avatar:'',
        items: [
          { title: 'Home', icon:'view_headline', link:'/'},
          { title: 'Projects', icon:'fas fa-list', link:"/projects"},
          { title: 'Team', icon:'mdiAccount', link:"/teams"},
        ],
      }
    },
  methods:{
    async getUser(){
      let user = await this.$axios.$get(`http://localhost:8000/users/${process.env.user}`)
      this.username = user.name,
      this.avatar = `http://localhost:8000/${user.avatar}`
    }
  },
  mounted(){
    this.getUser()
  }
}
</script>
