<template>
  <div>
      <v-row align="center" class="pa-3">
      <v-col md="2">
        <div class="caption grey--text">Title</div>
        <div>{{ task.name }}</div>
      </v-col>
      <v-col md="5">
        <div class="caption grey--text">Description</div>
        <div>{{ task.description }}</div>
      </v-col>
      <v-col md="2">
        <div class="caption grey--text">Due</div>
        <div>{{ task.due.substring(0,10) }}</div>
      </v-col>
      <v-col md="2">
        <div class="right">
          <div class="caption grey--text">Status</div>
          <v-chip v-if='task.complete' outlined color='cyan' small>complete</v-chip>
          <v-chip v-else outlined color='red' small>incomplete</v-chip>
        </div>
      </v-col>
      <v-col>
        <div>
          <div class="caption grey--text">Status</div>
          <v-layout>
          <Edit v-bind:object="task"/>
          <Delete v-bind:object="task"/>
          </v-layout>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Edit from './Edit'
import Delete from './Delete'
export default {
props:['task'],
components:{
  Edit,
  Delete
},
methods:{
  deleteTask(){

  },
  editTask(){

  }
}
}
</script>

<style scoped>
.tasks{
  border-radius: 25px;
}
</style>