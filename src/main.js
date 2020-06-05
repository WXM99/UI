import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import axios from '../node_modules/axios'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(Vuex);

/* axios default settings */
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true; // ajax with coockie
Vue.prototype.$axios = axios;
Vue.prototype.$ajax = axios;
// todo: modify `axios.defaults.baseURL` when dispatch or integrate testing
axios.defaults.baseURL = "http://localhost:8080/demo/";

/* vuex to keep local market depth */
const store = new Vuex.Store({
  state: {
    marketDepth: [],
    productId: '234',
    brokerId: '123',
  },
  mutations: {
    updateMarketDepth (productId, brokerId) {
      this.state.productId = productId;
      this.state.brokerId = brokerId;
      // todo: make the market depth coherent.
    }
  }
});
export default store

new Vue({
  render: h => h(App),
  router,
  axios,
}).$mount('#app');
