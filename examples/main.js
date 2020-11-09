import Vue from 'vue';
import App from './App.vue';

import picker from '../packages/index';
Vue.use(picker); //全局注册

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount('#app')