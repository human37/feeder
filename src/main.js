import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  data() {
    return {
      myData: [{
        "title": "reddit",
        "icon": "mdi-reddit"
      }]
    };
  },
  render: h => h(App)
}).$mount('#app');
