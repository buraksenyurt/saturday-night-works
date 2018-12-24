import Vue from 'vue';
import App from './App.vue';

// App.vue içeriğini render ettiriyoruz.
new Vue({
    el: '#firstApp',
    render: h => h(App),
});