<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
          <v-icon color='green' v-on='on'>add</v-icon>
      </template>  
      <v-card>
          <v-card-title>Add</v-card-title>
          <v-card-text>
          <v-form ref='form' v-model='valid' :lazy-validation="lazy">
              <v-text-field placeholder='Name' outlined v-model='form.name' :rules='form.nameRules' required counter=10>

              </v-text-field>
              <v-textarea placeholder="Description" outlined v-model='form.description' :rules='form.descriptionRules' required counter=10>

              </v-textarea>
          </v-form>
          </v-card-text>
          <v-card-actions>
              <v-btn outlined color='cyan' @click="submit" :disabled="!valid">submit</v-btn>
              <v-btn outlined color='red' @click="close">close</v-btn>
          </v-card-actions>
      </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
  //passed props
  props:['type','projectid','team'],
  data(){
    return{
      //added model data and form rules
      valid: true,
      form:{
        name:'',
        nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
        description:'',
        descriptionRules: [
        v => !!v || 'Description is required',
        v => (v && v.length >= 10) || 'Description must be atleast 10 characters',
      ],
      },
      dialog:false,
      lazy: false
    }
  },
  methods:{
    submit(){
      //submiting the project or task
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
        this.$refs.form.resetValidation()
        this.form.name = ''
        this.form.description = ''
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
        this.$refs.form.resetValidation()
        this.form.name = ''
        this.form.description = ''
        this.dialog = false
      }
    },
    close(){
      this.form.name = ''
      this.form.description = ''
      this.$refs.form.resetValidation()
      this.dialog = false
    }
  }

}
</script>

<style>

</style>