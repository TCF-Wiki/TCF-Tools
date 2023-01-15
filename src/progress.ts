import {createApp} from "vue";
import Page from "./apps/quest/PageQuest.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";

import all from "./all";
const App = createApp(Page).component("font-awesome-icon", all.FontAwesome).use(Toast).use(FloatingVue);
App.mount("main");
