import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCookie from 'vue-cookie'

Vue.prototype.$cookie = VueCookie;  //配置时候prototype.$这里的名字自己定义不是固定是cookie
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.prototype.$axios = axios
Vue.use(ElementUI);
Vue.use(VueCookie);
axios.defaults.baseURL = 'http://127.0.0.1:8000';

// axios.defaults.withCredentials=true;//让ajax携带cookie
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8;';

// axios.defaults.headers.post['Access-Control-Allow-Origin'] = "*";
// axios.defaults.headers.post['Access-Control-Allow-Methods']= "GET,PUT,POST,DELETE,OPTIONS";

// axios.interceptors.request.use(config => {
//   const temp = VueCookie.get('sessionid');
//   if (temp) {
//     config.headers.sessionid = temp;
//   }
//   return config;
// });