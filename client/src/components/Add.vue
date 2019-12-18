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
              <v-text-field placeholder='Name' outlined v-model='name'></v-text-field>
              <v-textarea placeholder="Description" outlined v-model='description'></v-textarea>
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
  props:['type'],
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
      if(this.type = 'project'){
        this.$projects.createProject(this.$store.state.token,this.form)
        this.dialog = false
      }else if(this.type = 'task'){
        this.$tasks.createTask(this.$store.state.token,this.form)
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