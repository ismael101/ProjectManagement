<template>
  <div>
      <v-sheet v-if="task.complete" dark color="teal" class="font-weight-bold">
          <v-row align="center">
              <v-col lg='2' md='2'>
                  <div class="px-5">
                  <h1 class="overline">Name</h1>
                  {{task.name}}
                  </div>
              </v-col>
              <v-col lg='4' md='4'>
                  <div class="px-5">
                  <h3 class="overline">Description</h3>
                  {{task.description}}
                  </div>
              </v-col>
              <v-col lg='6' md='6'>
                  <div class="px-5">
                  <h3 class="overline">Assigned To</h3>
                  {{user}}
                  </div>
              </v-col>
              <v-col lg='2' md='2'>
                    <v-switch v-model="task.complete" inset label="complete"></v-switch>
              </v-col>
          </v-row>
      </v-sheet>
      <v-sheet v-if="!task.complete" dark color="red" class="font-weight-bold">
          <v-row align="center">
              <v-col lg='2' md='2'>
                  <div class="px-5">
                  <h1 class="overline">Name</h1>
                  {{task.name}}
                  </div>
              </v-col>
              <v-col lg='6' md='6'>
                  <div class="px-5">
                  <h3 class="overline">Description</h3>
                  {{task.description}}
                  </div>
              </v-col>
              <v-col lg='2' md='2'>
                  <div class="px-5">
                  <h3 class="overline">Assigned To</h3>
                  {{user}}
                  </div>
              </v-col>
              <v-col lg='2' md='2'>
                    <v-switch v-model="task.complete" inset label="uncomplete"></v-switch>
              </v-col>
          </v-row>
      </v-sheet>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    props:['task'],
    data(){
        return{
            user:''
        }
    },
    methods:{
        async getUser(){
            let user = await this.$axios.$get(`http://localhost:8000/users/${this.task._user}`)
            this.user = user.name
        }
    },
    beforeMount(){
        this.getUser()
    }
    
}
</script>

<style>

</style>