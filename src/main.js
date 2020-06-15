import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import axios from '../node_modules/axios'
import VueApexCharts from 'vue-apexcharts'
import store from './vuex/store'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(Vuex);
Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);

/* axios default settings */
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true; // ajax with coockie
Vue.prototype.$axios = axios;
Vue.prototype.$ajax = axios;


new Vue({
  render: h => h(App),
  router,
  axios,
  store,
}).$mount('#app');
