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
        <div md="1" class="">
          <v-layout>
          <Edit v-bind:task="task"/>
            <v-icon color='red'>
              mdi-delete-outline
            </v-icon>
          </v-layout>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Edit from './Edit'
export default {
props:['task'],
components:{
  Edit
}
}
</script>

<style scoped>
.tasks{
  border-radius: 25px;
}
</style>