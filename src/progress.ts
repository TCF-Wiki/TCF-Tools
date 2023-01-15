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

import PageQuest from './apps/quest/PageQuest.vue';

import Toast, {useToast} from "vue-toastification";
import "vue-toastification/dist/index.css";

import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

const RouterApp = createApp(PageQuest)
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

