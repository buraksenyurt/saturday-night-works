import Vue from 'vue'
import App from './App.vue'
import axios from 'axios' // API servisine HTTP talebini göndermek için kullandığımız modül

axios.defaults.baseURL = 'http://localhost:4001/api/'; // base url adresini atadık
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
