//Font Awesome
import {library} from "@fortawesome/fontawesome-svg-core";
import {
    faBars,
    faTrash,
    faRedo,
    faSave,
    faMagnifyingGlass,
    faCircleXmark,
    faSquareCheck,
    faSquareXmark,
    faRankingStar,
    faUpRightFromSquare,
    faLocationDot,
    faCaretLeft,
    faCaretRight,
    faCircleNodes,
    faPercent,
    faXmark,
    faLock,
    faUserLock,
    faCircleInfo,
    faTriangleExclamation,
    faHeart,
} from "@fortawesome/free-solid-svg-icons";
import {faGithub, faTwitter, faDiscord} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
library.add(
    faBars,
    faLock,
    faTrash,
    faRedo,
    faSave,
    faMagnifyingGlass,
    faCircleXmark,
    faSquareCheck,
    faSquareXmark,
    faRankingStar,
    faUpRightFromSquare,
    faLocationDot,
    faCaretLeft,
    faCaretRight,
    faCircleNodes,
    faPercent,
    faXmark,
    faUserLock,
    faCircleInfo,
    faTriangleExclamation,
    faGithub,
    faTwitter,
    faDiscord,
    faHeart
);
export default {FontAwesome: FontAwesomeIcon};
//Vue
import {createApp} from "vue";
import "./assets/main.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";

import Navbar from "./constantComponents/Navbar.vue";
const NavbarApp = createApp(Navbar).component("font-awesome-icon", FontAwesomeIcon).use(FloatingVue);
NavbarApp.mount("#header");

import Footer from "./constantComponents/Footer.vue";
const FooterApp = createApp(Footer).component("font-awesome-icon", FontAwesomeIcon);
FooterApp.mount("#footer");

import SiteNotice from "./constantComponents/SiteNotice.vue";
const NoticeApp = createApp(SiteNotice).component("font-awesome-icon", FontAwesomeIcon);
NoticeApp.mount("#site-notice");

//Stop Loading
export function doneLoading() {
    let element = document.getElementById("loading");
    if (element) {
        element.remove();
    }
    document.querySelector("main")?.classList.add("loaded");
    //clean up the url bar
    window.history.pushState({}, document.title, location.pathname.replace(".html", ""));
}
