/* babel-polyfill识别Promise */
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import '@/common/css/index.css'
Vue.config.productionTip = false

/* 处理移动端click事件300毫秒延迟 */
fastclick.attach(document.body)

Vue.use(VueLazyLoad,{
  loading:require(
    '@/common/image/logo@2x.png'
  )
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
