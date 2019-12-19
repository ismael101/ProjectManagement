<template>
  <div>
    <v-app-bar flat>
      <v-toolbar-title>Team</v-toolbar-title>
    </v-app-bar>
    <v-divider></v-divider>
    <v-container>
      <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg4 v-for="person in this.$store.state.team" :key="person.id">
         <v-card flat class="text-xs-center ma-3">
            <v-responsive class="pt-4 text-center">
              <v-avatar size="200" class="grey lighten-2">
                <img :src="person.pic">
              </v-avatar>
            </v-responsive>
            <v-card-text class='text-center'>
              <div class="subheading">{{ person.username }}</div>
              <div class="grey--text">{{ person.role }}</div>
            </v-card-text>
         </v-card>
      </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    getMembers(){
      this.$users.members(this.$store.state.token)
                .then(members => {
                  this.$store.dispatch('setTeam', members)
                })
    }
  },
  mounted(){
    this.getMembers()
  }
}
</script>

<style>

</style>