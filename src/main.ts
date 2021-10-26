import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import ElementUI from 'element-ui';

import App from './App.vue';
import router from './router';
import store from './store';

import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/main.scss';

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
