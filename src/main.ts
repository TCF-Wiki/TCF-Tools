const path = location.pathname;

if (path == "/map") {
    location.pathname = "/map.html";
} else if (path == "/progress") {
    location.pathname = "/progress.html";
} else if (path == "/calculator") {
    location.pathname = "/calculator.html";
} else if (path == "/forge") {
    location.pathname = "/forge.html";
} else if (path == "/loadout") {
    location.pathname = "/loadout.html";
}
import {createApp} from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";
import all from "./all";
import Page from "./views/home/PageHome.vue";
const App = createApp(Page).component("font-awesome-icon", all.FontAwesome).use(Toast).use(FloatingVue);
App.mount("main");
