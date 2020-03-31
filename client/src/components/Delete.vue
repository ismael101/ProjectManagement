<template>
<div>
    <v-tooltip right>
        <template v-slot:activator="{on}">
            <v-icon color='red' v-on="on" @click="overlay = !overlay">
                mdi-delete-outline
            </v-icon>
        </template>
        <span>
            Delete
        </span>
    </v-tooltip>
    <v-overlay :value="overlay" :opacity='0.85' :absolute='false'>
      <h2>Are You Sure You Want to Delete?</h2>
      <div class="my-3">
      <v-btn @click="overlay = false" dark outlined color='cyan' class="mx-1">No</v-btn><v-btn @click="deleteObject" dark color='red' outlined class="mx-1">Delete</v-btn>
      </div>
    </v-overlay>
</div>
</template>

<script>
export default {
props:['id'],
data(){
    return{
        overlay:false
    }
},
methods:{
    deleteObject(){
        this.overlay = false
        this.$emit('deleteObject',this.id)
    }
}
}
</script>

<style>

</style>