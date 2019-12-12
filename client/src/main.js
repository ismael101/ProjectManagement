import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Users from '../services/users'
import Projects from '../services/projects'
import Tasks from '../services/tasks'
import Teams from '../services/teams'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false


Vue.prototype.$users = Users
Vue.prototype.$projects = Projects
Vue.prototype.$tasks = Tasks
Vue.prototype.$teams = Teams


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
