import {createApp} from 'vue';
import {library} from '@fortawesome/fontawesome-svg-core';



import {faBars, faTrash, faRedo, faSave} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

library.add(faBars, faTrash, faRedo, faSave);

import './assets/main.css';

import Router from './Router.vue';

import Toast, {useToast} from "vue-toastification";
import "vue-toastification/dist/index.css";

const RouterApp = createApp(Router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(Toast)
RouterApp.mount('main');

import Navbar from './Navbar.vue';
const NavbarApp = createApp(Navbar).component('font-awesome-icon', FontAwesomeIcon);
NavbarApp.mount('nav');

import Footer from './Footer.vue';
const FooterApp = createApp(Footer);
FooterApp.mount('footer');

