<template>
  <div>
      <v-card outlined class="my-1">
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
            <div md="1" class="text-right">
              <v-icon outlined color='orange'>
                mdi-pencil-outline
              </v-icon>
              <v-icon outlined color='red'>
                mdi-delete-outline
              </v-icon>
            </div>
          </v-col>
        </v-row>
      </v-card>
  </div>
</template>

<script>
export default {
props:['task']
}
</script>

<style>

</style>