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

        <v-text-field outlined v-model='form.password' :rules='form.passwordRules' label="Enter Password">

        </v-text-field>
        <v-text-field outlined v-model='form.repassword' :rules='form.repasswordRules' label='Re-Enter Password'>
        </v-text-field>
        <v-file-input v-model='form.files' outlined accept="image/png, image/jpeg"  label="Image Upload" required prepend-icon="mdi-camera" :rules='form.fileRules'></v-file-input>
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
      form:{
        username:'',
        usernameRules:[
          (v) => !!v || 'Username is Required', (v) => v.length > 4 || 'Username has to be 4 or more characters'],
        team:'',
        teamRules:[
          (v) => !!v || 'Team is Required', (v) => v.length > 4 || 'Team has to be 4 or more characters'],
        password:'',
        passwordRules:[
          (v) => !!v || 'Password is Required', (v) => v.length > 8 || 'Password has to be 8 or more characters'
        ],
        repassword:'',
        repasswordRules:[
          (v) => !!v || 'Re-Entering Password is Required', 
          (v) =>  (v != this.data.form.password) || 'Re-Entered Password Doesnt Match'
        ],
        files:[],
        fileRules:[
          (v) => !v || 'Avatar Image is required'
        ]

      },
      yall:10,
      good:this.password
    }
  },
  methods:{
    submit(){
      console.log('high')
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