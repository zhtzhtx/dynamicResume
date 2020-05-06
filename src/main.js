import Vue from 'vue'
import App from './App.vue'
import Mobile from './Mobile.vue'

Vue.config.productionTip = false

//获取屏幕宽度以自适应
const width = document.documentElement.clientWidth
new Vue({
  render: h => h(width > 500 ? App : Mobile),
}).$mount('#app')
