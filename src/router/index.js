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
            path: '/trader',
            component: loadView('TabbarFrame'),
            children: [
                {
                    path: 'marketdepth',
                    name: 'marketdepth',
                    component: loadView('marketDepth/OrderBook')
                },
                {
                    path: '',
                    name: 'index',
                    component: loadView('marketDepth/index')
                }
            ]
        },
        {
            path: '/',
            name: 'login',
            component: loadView('login')
        }
    ]
});


export default router
