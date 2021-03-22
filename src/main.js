import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "./store"
import Snotify, { SnotifyPosition } from 'vue-snotify'
import 'vue-snotify/styles/material.css';
import router from "./router"
import VConsole from 'vconsole'
const vConsole = new VConsole()
Vue.use(vConsole)
// let isPC = false
// window.onresize = function (){
//   const isPhone = () => {
//     const userAgentInfo = navigator.userAgent
//     const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
//     let flag = true
//     for (var v = 0; v < Agents.length; v++) {
//       if (userAgentInfo.indexOf(Agents[v]) > 0) {
//         flag = false
//         break
//       }
//     }
//     return flag
//   }
//   isPC = isPhone()
  
// }

const options = {
  toast: {
    position: SnotifyPosition.rightTop
  }
}
// console.log(router)
Vue.use(Snotify, options)
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
