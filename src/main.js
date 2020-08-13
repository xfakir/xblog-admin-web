import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Router from "vue-router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/styles/basic.scss";
import "@/styles/variables.scss";
import "@/styles/transition.scss";
import "@/styles/mixin.scss";
// import "../mock/mock";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import axios from "axios";
//import "./plugins/element.js";
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(mavonEditor);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
