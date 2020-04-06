<template>
  <v-sheet color="blue-grey darken-3" dark>
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
            <Delete v-bind:object="task" v-on:deleteObject="deleteTask"/>
              <Edit v-bind:object="task" v-on:editObject="editTask"/>
          </v-layout>
        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import Edit from './Edit.vue'
import Delete from './Delete.vue'
import Status from './Status.vue'
export default {
    props:['task'],
    components:{
    Edit,
    Delete,
    Status
    },
    methods:{
    deleteTask(task){
        task.project = this.task.project
        this.$store.dispatch('deletetask',task)
    },
    editTask(task){
        this.$store.dispatch('edittask',task)
    },
    statusChange(task){
        task.complete = !task.complete
        this.$store.dispatch('edittask',task)
    }
    }
}
</script>

<style>

</style>