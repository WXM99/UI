import Vue from 'vue'
import Router from 'vue-router'
// import Cookies from 'js-cookie'

Vue.use(Router);
function loadView (view) {
    return () => import(/* webpackChunkName: "view-[request]" */ `../components/${view}.vue`)
}

Vue.use(Router);

const router = new Router({
    // ordinary user pages
    routes: [
        {
            path: '/signin',
            name: 'login',
            component: loadView('login')
        },
        {
            path: '/',
            component: loadView('TabbarFrame'),
            children: [
                {
                    path: 'md/:product',
                    name: 'marketDepth',
                    component: loadView('marketDepth/OrderBook')
                },
                {
                    path: 'tx',
                    name: 'orderHistory',
                    component: loadView('orderHistory/index')
                },
                {
                    path: '',
                    name: 'index',
                    component: loadView('marketDepth/index')
                }
            ]
        },
        {
            path: '/broker',
            component: loadView('broker/TabbarFrame'),
            children: [
                {
                    path: 'md/:product',
                    name: 'brokerMarketDepth',
                    component: loadView('broker/OrderBook')
                },
                {
                    path: 'tx',
                    name: 'brokerOrderHistory',
                    component: loadView('broker/OrderHistory')
                },
                {
                    path: '',
                    name: 'brokerIndex',
                    component: loadView('broker/index')
                }
            ]
        },
    ]
});


export default router
