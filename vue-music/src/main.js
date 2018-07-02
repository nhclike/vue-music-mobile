/* babel-polyfill识别Promise */
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import '@/common/css/index.css'
Vue.config.productionTip = false

/* 处理移动端click事件300毫秒延迟 */
fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
