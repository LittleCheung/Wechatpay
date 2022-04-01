// 引入Vue
import Vue from 'vue'
// 引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入App
import App from './App'
// 引入路由器
import router from './router'
// 二维码生成器
import VueQriously from 'vue-qriously'
Vue.use(VueQriously)

// 关闭Vue生产提示
Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  render: h => h(App), //将App组件放入容器中
  router: router
}).$mount('#app')