<template>
 <div>
     <v-container fluid class='py-5 px-5'>
      <div class="mx-5">
          <v-row>
              <v-col v-for='todo in todos' :key="todo._id" lg='4' md='4'>
                  <Todo :todo='todo' class="my-5"/>
              </v-col>
          </v-row>
      </div>
   </v-container>
 </div>
</template>

<script>
import Todo from '../components/Todo'
export default {
  components:{
    Todo
  },
  async asyncData({$axios}){
    let todos = await $axios.$get(`http://localhost:8000/todos/user/${process.env.user}`)
    console.log(todos)
    return({todos:todos})
  }
}
</script>
