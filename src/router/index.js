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
                    path: 'marketdepth',
                    name: 'marketdepth',
                    component: loadView('marketDepth/OrderBook')
                }
            ]
        }
    ]
});


export default router
