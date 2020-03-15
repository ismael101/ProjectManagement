<template>
  <div>
      <v-container fluid class='py-5 px-5'>
          <div class="my-5 mx-5">
                <v-row>
                    <v-col v-for='project in projects' :key="project.id" lg='4' md='4'>
                        <Projects :project='project'/>
                    </v-col>
                </v-row>
            </div> 
      </v-container>
  </div>
</template>

<script>
import Projects from '../../components/Projects'
export default {
    components:{
        Projects
    },
    async asyncData({$axios}){
        let projects = await $axios.$get(`http://localhost:8000/projects`)
        return({projects:projects})
    }
}
</script>

<style>

</style>