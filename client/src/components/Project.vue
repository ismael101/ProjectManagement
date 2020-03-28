<template>
<div>
    <v-row>
        <v-col>
            <h2 class="my-1">{{project.name}}</h2>
            <div class="my-1">
                <span class="grey--text">{{project.description}}</span>
            </div>
        </v-col>
        <v-col class="text-right">
            <Add/>      
        </v-col>
    </v-row>
        <v-progress-linear
        class="my-4"
        :value="progress"
        color="blue-grey"
        height="25"
        reactive
        >
            <template v-slot="{ value }">
                <strong>{{ Math.ceil(value) }}%</strong>
            </template>
        </v-progress-linear>
</div>
</template>

<script>
import Add from './Add'
export default {
props:['project'],
components:{
    Add
},
computed: {
    progress(){
        if(this.project.tasks.length > 0){
            let progress = 0
            this.project.tasks.forEach(element => {
                if(element.complete){
                    progress++
                }
            });
            return (progress/this.project.tasks.length) * 100  
        }else{
            return 100
        }     
    }
  }
}
</script>

<style>

</style>