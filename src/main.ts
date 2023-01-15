import {createApp} from 'vue';
import {library} from '@fortawesome/fontawesome-svg-core';

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
    faXmark

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

library.add(faBars, faTrash, faRedo, faSave, faMagnifyingGlass, faCircleXmark, faSquareCheck, faSquareXmark, faRankingStar, faUpRightFromSquare, faLocationDot, faCaretLeft, faCaretRight, faCircleNodes, faPercent, faXmark);

import './assets/main.css';

import PageHome from './views/home/PageHome.vue';

import Toast, {useToast} from "vue-toastification";
import "vue-toastification/dist/index.css";

import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

const path = location.pathname;

if (path == '/map') {
    location.pathname = '/map.html'
} else if (path == '/progress') {
    location.pathname = '/progress.html'
} else if (path == '/calculator') {
    location.pathname = '/calculator.html'
} else if (path == '/forge') {
    location.pathname = '/forge.html'
} else if (path == '/loadout') {
    location.pathname = '/loadout.html'
}

const RouterApp = createApp(PageHome)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(Toast)
    .use(FloatingVue)
RouterApp.mount('main');

import Navbar from './constantComponents/Navbar.vue';
const NavbarApp = createApp(Navbar).component('font-awesome-icon', FontAwesomeIcon).use(FloatingVue);
NavbarApp.mount('#header');

import Footer from './constantComponents/Footer.vue';
const FooterApp = createApp(Footer);
FooterApp.mount('#footer');

