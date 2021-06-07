import Vue from "vue";
import Storage from "vue-web-storage";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  Storage,
  render: (h) => h(App),
}).$mount("#app");

