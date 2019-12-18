<template>
  <div class='login'>
    <v-container>
      <v-layout column align-center justify-center>
        <v-flex>
          <v-alert v-if='error' type='error'>Authentication Error</v-alert>
          <h1 class='subheading grey--text my-10 align-center my-5'>Login</h1>
          <v-card width="600" flat>
            <v-form  ref="form" v-model="valid"  :lazy-validation="lazy">
              <v-text-field v-model='form.username' required outlined :rules='form.usernameRules' label='Enter Username'/>
              <v-text-field v-model="form.password" required outlined :rules='form.passwordRules' label='Enter Password'/>
              <v-btn outlined @click="submit" :disabled="!valid">
                Login
              </v-btn>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
import jsonwebtoken from 'jsonwebtoken'

export default {
  data(){
    return{
      valid: true,
      form:{
        username:'',
        usernameRules:[
          (v) => !!v || 'Username is Required'],
        password:'',
        passwordRules:[
         (v) => !!v || 'Password is Required'] 
      },
      error:false
    }
  },
  methods:{
    submit(){
      this.$users.login({username:this.form.username,password:this.form.password})
                .then(res => {
                  console.log(res)
                  this.error = false
                  this.$store.dispatch('setToken', res.token)
                  let info = jsonwebtoken.decode(res.token)
                  this.$store.dispatch('setUser', {username:info.username,id:info.id,teamid:info.teamid})
                  this.$router.push({name:'projects'})
                })
                .catch((err) => {
                  console.log(err)
                  this.error = true
                  this.valid = true
                })
    }
  }
}
</script>

<style scoped>
.login{
  margin: auto;
  width: 50%;
  padding-top: 20vh;
}
</style>