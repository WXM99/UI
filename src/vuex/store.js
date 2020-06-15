import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let state = {
    isLogin: false,
    traderOrBroker: 'trader',
    userId: 0,
    userJWT: "",
    username: "",
    userComp: "",
};

export default new Vuex.Store({
    state
})
