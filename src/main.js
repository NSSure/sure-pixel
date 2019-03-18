import Vue from 'vue';
import App from './App.vue';
import store from './store';

import Verte from 'verte';
import 'verte/dist/verte.css';

Vue.config.productionTip = false;

Vue.component('verte', Verte);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
