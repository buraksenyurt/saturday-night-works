import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios' // API servisine HTTP talebini göndermek için kullandığımız modül

axios.defaults.baseURL = 'http://localhost:4001/api/'; // base url adresini atadık

const app = createApp(App)
app.config.globalProperties.$http = axios  // Vue 3: prototype yerine globalProperties kullanılır
app.mount('#app')
