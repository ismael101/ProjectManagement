<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
          <v-icon color='purple' v-on='on'>edit</v-icon>
      </template>  
      <v-card>
          <v-card-title>Edit</v-card-title>
          <v-card-text>
          <v-form>
              <v-text-field placeholder='Name' outlined v-model='form.name'></v-text-field>
              <v-textarea placeholder="Description" outlined v-model='form.description'></v-textarea>
              <v-switch v-model="form.completed" label="Complete"></v-switch>
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
  props:{
    id:Number,
    type:String
  },
  data(){
    return{
      form:{
          name:'',
          description:'',
          completed:false
      },
      dialog:false
    }
  },
  methods:{
    submit(){
      if(this.type = 'project'){
        this.$projects.updateProject(this.$store.state.token,this.form)
        this.dialog = false
      }else if(this.type = 'task'){
        this.$tasks.updateTask(this.$store.state.token,this.form)
        this.dialog = false
      }
    },
    close(){
        this.dialog = false
    },
    getData(){
        if(this.type = 'project'){
            let project = this.$store.state.projects.filter(project => project.id == this.id)
            this.form.name = project.name
            this.form.description = project.description
            this.form.completed = project.completed
            console.log(this.props)
        }else if(this.type = 'task'){
            let task = this.$store.state.tasks.filter(task => task.id == this.id)
            this.form.name = task.name
            this.form.description = task.description
            this.form.completed = task.completed
        }
    }
  },
  mounted(){
      this.getData()
  }

}
</script>