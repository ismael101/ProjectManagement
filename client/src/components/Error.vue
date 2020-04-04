<template>
  <v-container fill-height class="text-center justify-center">
    <div>
    <h1 class="display-4">{{error}}</h1>
    <v-divider class="my-2" />
    <h2 class="display-1 grey-text">{{message}}</h2>
    </div>
  </v-container>
</template>

<script>

export default {
  props:['error','message'],
  name:'Error',
}
</script>