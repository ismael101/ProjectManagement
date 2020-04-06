<template>
  <v-progress-linear
    :value="progress"
    color="teal accent-3"
    height="25"
    reactive
    >
    <template v-slot="{ value }">
        <strong class="black--text">{{ Math.ceil(value) }}%</strong>
    </template>
    </v-progress-linear>
</template>

<script>
export default {
    props:['project'],
    computed:{
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