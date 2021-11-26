import Vue from "vue";
import Storage from "vue-web-storage";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from './store'

new Vue({
  vuetify,
  Storage,
  store,
  render: (h) => h(App)
}).$mount("#app");
