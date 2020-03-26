<template>
  <div>
    <div v-if="this.$store.state.projects.filter(project => project._id == this.$route.params.id).length > 0">
      <v-container width='500' class="py-5 px-5">
        <v-row class="my-2">
          <v-col>
            <h2>{{this.$store.state.projects.filter(project => project._id == this.$route.params.id)[0].name}}</h2>
            <span class="grey--text">created: {{this.$store.state.projects.filter(project => project._id == this.$route.params.id)[0].createdAt.substring(0,10)}}</span>
          </v-col>
          <v-col class="text-right">
            <v-btn color='deep-purple accent-4' dark @click="dialog = !dialog">
              Add Task
            </v-btn>
          </v-col>
        </v-row>
        <v-progress-linear
        class="mb-4"
        :value="this.$store.state.projects.filter(project => project._id == this.$route.params.id)[0].progress"
        color="blue-grey"
        height="25"
        reactive
      >
      <template v-slot="{ value }">
        <strong>{{ Math.ceil(value) }}%</strong>
      </template>
    </v-progress-linear>
        <Task v-bind:tasks="this.$store.state.projects.filter(project => project._id == this.$route.params.id)[0].tasks"/>
      </v-container>
      <v-dialog v-model="dialog" width='500'>
        <v-card class="py-3 px-3">
          <v-card-title>
            <span>Create Task</span>
          </v-card-title>
          <v-card-text>
            <v-form ref='form'>
              <v-text-field outlined label='Name'>
              </v-text-field>
              <v-textarea
                outlined
                name="input-7-4"
                label="Description"
              ></v-textarea>
              </v-form>
          </v-card-text>
          <v-card-actions class="text-right">
            <v-btn outlined color='red'>
              Cancel
            </v-btn>
            <v-btn outlined color='cyan'>
              Create Task
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div v-else/>
  </div>
</template>
<script>
import Task from '../components/Task'
export default {
  components:{
    Task
  },
  data(){
    return{
      dialog:false
    }
  }
}

</script>

<style>

</style>
