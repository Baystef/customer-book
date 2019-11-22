import Vue from 'vue'
import App from './App.vue'

// Vue devtools config is set to true to enable its chrome extension work
Vue.config.devtools = true;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
