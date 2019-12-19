<template>
  <div class="register">
    <v-container>
    <v-layout column align-center justify-center>
      <v-flex>

        <v-alert v-if='error' type='error'>Authentication Error</v-alert>
          <h1 class='subheading grey--text my-10 align-center my-5'>Register</h1>
      <v-card flat width='800'>
        <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-text-field outlined v-model='form.username' :rules='form.usernameRules' label='Enter Username' required></v-text-field>
            <v-text-field outlined v-model='form.team' :rules="form.teamRules" label="Enter Team" required></v-text-field>
            <v-text-field outlined v-model='form.role' :rules="form.roleRules" label="Enter Role" required></v-text-field>
           <v-text-field outlined v-model='form.password' :rules='form.passwordRules' label="Enter Password" type='password'></v-text-field>
        <v-file-input v-model='form.files' outlined accept="image/png, image/jpeg"  label="Image Upload" required prepend-icon="camera" :rules='form.fileRules'></v-file-input>
        <v-btn outlined @click='submit' :disabled="!valid">
          Register
        </v-btn>
        </v-form>
      </v-card>
      </v-flex>
    </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data(){
    return{
      valid:true,
      error:false,
      lazy: false,
      form:{
        username:'',
        usernameRules:[
          (v) => !!v || 'Username is Required', (v) => v.length >= 4 || 'Username has to be 4 or more characters'],
        team:'',
        teamRules:[
          (v) => !!v || 'Team is Required', (v) => v.length >= 4 || 'Team has to be 4 or more characters'],
        role:'',
        roleRules:[
          (v) => !!v || 'Role is Required', (v) => v.length > 8 || 'Role has to be 4 or more characters'
        ],
        password:'',
        passwordRules:[
          (v) => !!v || 'Password is Required', (v) => v.length > 8 || 'Password has to be 8 or more characters'
        ],
        files:[],
        fileRules:[
          value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
        ]

      },
    }
  },
  methods:{
    submit(){
      let form = new FormData()
      form.append('username',this.form.username)
      form.append('password',this.form.password)
      form.append('role',this.form.role)
      form.append('team',this.form.team)
      form.append('image',this.form.files)
      this.$users.register(form)
                .then(res => {
                   this.$users.login({username:this.form.username,password:this.form.password})
                            .then(res => {
                              this.$router.push({name:'login'})
                            })
                            .catch((err) => {
                              this.error = true
                              this.valid = true
                            })   
                })
                .catch(err => {
                  this.error = true
                })
    }
  },
  computed:{
    password(){
      return this.password
    }
  }
}
</script>

<style>
.register{
  margin:auto;
  padding-top: 12vh
}
</style>