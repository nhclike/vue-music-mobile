/* babel-polyfill识别Promise */
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import '@/common/css/index.css'
import store from './store'
Vue.config.productionTip = false;


/* eslint-disable no-unused-vars*/
import vConsole from 'vconsole'
/*手机上用console.log调试*/
console.log('mobile console test');

/* 处理移动端click事件300毫秒延迟 */
fastclick.attach(document.body);


Vue.use(VueLazyLoad,{
  loading:require(
    '@/common/image/logo@2x.png'
  )
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
