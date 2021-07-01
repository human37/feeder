import Vue from "vue";
import Storage from "vue-web-storage";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

new Vue({
  vuetify,
  Storage,
  render: (h) => h(App),
}).$mount("#app");
