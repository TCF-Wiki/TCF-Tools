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
    faLocationDot

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

library.add(faBars, faTrash, faRedo, faSave, faMagnifyingGlass, faCircleXmark, faSquareCheck, faSquareXmark, faRankingStar, faUpRightFromSquare, faLocationDot);

import './assets/main.css';

import Router from './Router.vue';

import Toast, {useToast} from "vue-toastification";
import "vue-toastification/dist/index.css";

const RouterApp = createApp(Router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(Toast)
RouterApp.mount('main');

import Navbar from './constantComponents/Navbar.vue';
const NavbarApp = createApp(Navbar).component('font-awesome-icon', FontAwesomeIcon);
NavbarApp.mount('nav');

import Footer from './constantComponents/Footer.vue';
const FooterApp = createApp(Footer);
FooterApp.mount('footer');

