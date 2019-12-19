<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
          <v-icon color='purple' v-on='on'>edit</v-icon>
      </template>  
      <v-card>
          <v-card-title>Edit</v-card-title>
          <v-card-text>
          <v-form ref='form' v-model='valid' :lazy-validation="lazy">
              <v-text-field placeholder='Name' outlined v-model='form.name' :rules='form.nameRules' required></v-text-field>
              <v-textarea placeholder="Description" outlined v-model='form.description' :rules='form.descriptionRules' required></v-textarea>
              <v-switch v-model="form.completed" label="Complete"></v-switch>
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
  //props
  props:['type','id'],
  data(){
    return{
      //v-model and form validation
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
          completed:false
      },
      dialog:false,
      lazy: false
    }
  },
  methods:{
    //updating and fetching the project or task
    submit(){
      if(this.type == 'project'){
        let data = {
          id:this.id,
          name:this.form.name,
          description:this.form.description,
          completed:this.form.completed
        }
        this.$projects.updateProject(this.$store.state.token,data)
                      .then(() => {
                        console.log(this.$store.state.token)
                         this.$projects.getProjects(this.$store.state.token)
                            .then(projects => {
                              console.log(projects)
                              this.$store.dispatch('setProjects',projects)
                            })
                            .catch(err => {
                              console.log(err)
                            })
                      })
                      .catch(err => {
                        console.log(err)
                      })  
        this.$refs.form.resetValidation()  
        this.dialog = false
      }else if(this.type == 'task'){
        let data = {
          id:this.id,
          name:this.form.name,
          description:this.form.description,
          completed:this.form.completed
        }
        this.$tasks.updateTask(this.$store.state.token,data)
                      .then(() => {
                         this.$tasks.getTasks(this.$store.state.token)
                            .then(tasks => {
                              console.log(tasks)
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
        this.dialog = false
      }
    },
    close(){
        this.dialog = false
    },
    getData(){
        if(this.type == 'project'){
          let project = this.$store.state.projects.filter(project => project.id == this.id)
          this.form.name = project[0].name
          this.form.description = project[0].description
          this.form.completed = project[0].completed
        }else if(this.type = 'task'){
          let task = this.$store.state.tasks.filter(task => task.id == this.id)
          this.form.name = task[0].name
          this.form.description = task[0].description
          this.form.completed = task[0].completed
        }
    }
  },
  mounted(){
      this.getData()
  }

}
</script>