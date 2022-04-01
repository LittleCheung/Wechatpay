// 创建应用程序的路由器
import Vue from 'vue'
import VueRouter from 'vue-router'
// 此时就可以在Vue实例中配置路由器了
Vue.use(VueRouter)

// 引入组件
import Index from '../views/index'
import Orders from '../views/Orders'
import Download from '../views/Download'
import Success from '../views/Success'

// 创建并暴露一个路由器
export default new VueRouter({
    routes:[
        {
            path: '/',
            component: Index
        },
        {
            path: '/orders',
            component: Orders
        },
        {
            path: '/download',
            component: Download
        },
        {
            path: '/success',
            component: Success
        }
    ]
})