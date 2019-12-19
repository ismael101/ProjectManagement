<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
          <v-icon color='green' v-on='on'>add</v-icon>
      </template>  
      <v-card>
          <v-card-title>Add</v-card-title>
          <v-card-text>
          <v-form>
              <v-text-field placeholder='Name' outlined v-model='form.name'></v-text-field>
              <v-textarea placeholder="Description" outlined v-model='form.description'></v-textarea>
          </v-form>
          </v-card-text>
          <v-card-actions>
              <v-btn outlined color='cyan' @click="submit">submit</v-btn>
              <v-btn outlined color='red' @click="close">close</v-btn>
          </v-card-actions>
      </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
  props:['type','projectid','team'],
  data(){
    return{
      form:{
        name:'',
        description:''
      },
      dialog:false
    }
  },
  methods:{
    submit(){
      if(this.type == 'project'){
        let data = {
          name:this.form.name,
          description:this.form.description,
          team:this.team
        }
        this.$projects.createProject(this.$store.state.token,data)
                      .then(res => {
                        this.$projects.getProjects(this.$store.state.token)
                                      .then(projects => {
                                          this.$store.dispatch('setProjects', projects)
                                      })
                                      .catch(err => {
                                        console.log(err)
                                      })
                      })
                      .catch(err => {
                        console.log(err)
                      })
        this.dialog = false
      }else if(this.type == 'task'){
        let data = {
          name:this.form.name,
          description:this.form.description,
          projectid:this.projectid,
          team:this.team
        }
        this.$tasks.createTask(this.$store.state.token,data)
                  .then(() => {
                    this.$tasks.getTasks(this.$store.state.token)
                              .then(tasks => {
                                this.$store.dispatch('setTasks',tasks)
                              })
                              .catch(err => {
                                console.log(err)
                              })
                  })
                  .catch(err => {
                    console.log(err)
                  })
        this.dialog = false
      }
    },
    close(){
      this.dialog = false
    }
  }

}
</script>

<style>

</style>