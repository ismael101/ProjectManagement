<template>
      <Error v-bind:error="'404'" v-bind:message="'Page Not Found'"/>
</template>

<script>
import Error from '../components/Error'
export default {
components:{
    Error
}
}
</script>

<style>

</style>