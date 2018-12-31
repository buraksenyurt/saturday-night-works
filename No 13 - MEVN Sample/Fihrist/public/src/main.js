import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/app.vue'

new Vue({
    el: 'app',
    created: function () {
        console.log('Root oluşturuldu')
    },
    components: { App },
    methods: {}
})