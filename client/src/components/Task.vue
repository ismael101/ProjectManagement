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
          <Status v-bind:task="task" v-on:statusChange="statusChange(task)"/>
        </div>
      </v-col>
      <v-col>
        <div>
          <div class="caption grey--text">Actions</div>
          <v-layout>
              <Edit v-bind:object="task" v-on:editObject="editTask(data)"/>
              <Delete v-bind:id="task._id" v-on:deleteObject="deleteTask(task)"/>
          </v-layout>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Edit from './Edit'
import Delete from './Delete'
import Status from './Status'
export default {
props:['task'],
components:{
  Edit,
  Delete,
  Status
},
methods:{
  deleteTask(task){
    this.$store.dispatch('deletetask',task)
  },
  editTask(task){
    this.$store.dispatch('edittask',task)
  },
  statusChange(task){
    this.$store.dispatch('statuschange',task)
  }
}
}
</script>

<style scoped>
.tasks{
  border-radius: 25px;
}
</style>