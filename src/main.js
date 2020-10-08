import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/vant.js'
import axios from 'axios'
//导入index.js
import store from './store/index.js'
// 导入全局css
import './assets/index.css'

Vue.prototype.$http = axios
// 配置请求的基准URL地址
axios.defaults.baseURL = 'http://localhost:3000/'

Vue.config.productionTip = false

// 全局过滤器 播放次数// 调用  {{ msg | 过滤器名字() }}
Vue.filter('playCount', (count) => {
  if (count >= 100000) {
    count = parseInt(count / 10000)
    count = `${count}万`
  }
  return count
})

// 过滤器播放时间
Vue.filter('playTime', (time) => {
  const m = parseInt(time / 60)
  const s = parseInt(time % 60)

  time = `${m}:${s}`
  return time
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
