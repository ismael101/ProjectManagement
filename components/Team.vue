<template>
  <div>
      <v-card outlined>
          <v-card-subtitle>
              {{user.name}}
              <v-spacer/>
              {{user.title}}
          </v-card-subtitle>
      <v-card-text>
          <v-layout column align-center>
          <v-avatar size="200" class="mt-5">
            <v-img :src=' "http://localhost:8000/" + user.avatar'></v-img>
        </v-avatar>
          </v-layout>
      </v-card-text> 
  
      </v-card>
  </div>
</template>

<script>
export default {
    props:['user'],
}
</script>

<style>

</style>