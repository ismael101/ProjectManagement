<template>
  <v-container fill-height class="text-center justify-center">
    <div>
        <h1 class="display-4 white--text">{{error}}</h1>
        <v-divider class="my-2" color='white'/>
        <h2 class="display-1 white--text">{{message}}</h2>
    </div>
  </v-container>
</template>

<script>
export default {
  props:['error','message'],
  name:'Error',
}
</script>