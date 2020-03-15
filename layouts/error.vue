<template>
<v-content class="blue-grey darken-4 white--text" dark> 
    <v-container fluid fill-height>
      <v-row align="center" justify="center">
        <v-col>
          <v-container>
         <h1 v-if="error.statusCode === 404" class="text-center display-2 font-weight-bold">
         404 | {{ pageNotFound }}
        </h1>
          <h1 v-else class="text-center display-1">
          400 | {{ otherError }}
        </h1>
        <v-divider color='white' class="my-5"/>
        <p class="text-center headline">
        <NuxtLink to="/" color='white'>
            Home page
          </NuxtLink>
        </p>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
</v-content>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: 'THIS PAGE DOESNT EXIST',
      otherError: 'AN ERROR OCCURED'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
