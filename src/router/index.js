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
            path: '/signin',
            name: 'login',
            component: loadView('login')
        }
    ]
});


export default router
