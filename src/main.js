import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import axios from 'axios'
Vue.config.productionTip = false

axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;

import Router from 'vue-router'

// import Vconsole from 'vconsole'
// const vConsole = new Vconsole()
// Vue.use(vConsole)
 
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
