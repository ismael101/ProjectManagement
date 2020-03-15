<template>
  <div>
      <v-card outlined color="blue-grey lighten-5">
          <v-card-title>
              {{todo.name}}
              <v-spacer/>
                <v-chip
                v-if="!todo.complete"
                color="red"
                outlined
                >
                uncomplete
                </v-chip>
                <v-chip
                v-if="todo.complete"
                color="cyan"
                outlined
                >
                complete
                </v-chip>
          </v-card-title>
          <v-card-text>
              <div v-for="task in todo.tasks" :key="task._id">
              <v-sheet class="my-5" v-if='task.complete' color='cyan' dark>
                  <v-row align="center">
                      <v-col>
                        <div class="px-5">
                        <h1 class="overline">Name</h1>
                        {{task.name}}
                        </div>
                    </v-col>
                    <v-col>
                        <div class="px-5">
                            <v-switch v-model="task.complete" inset label="complete"></v-switch>
                        </div>
                    </v-col>
                  </v-row>
              </v-sheet>
              </div>
              <div v-for="task in todo.tasks" :key="task._id">
              <v-sheet class="my-5" v-if='!task.complete' color='red' dark>
                  <v-row align="center">
                      <v-col>
                        <div class="px-5">
                        <h1 class="overline">Name</h1>
                        {{task.name}}
                        </div>
                    </v-col>
                    <v-col>
                        <div class="px-5">
                            <v-switch v-model="task.complete" inset label="uncomplete"></v-switch>
                        </div>
                    </v-col>
                  </v-row>
              </v-sheet>
              </div>
          </v-card-text>
      </v-card>
  </div>
</template>

<script>
export default {
props:['todo']
}
</script>

<style>

</style>