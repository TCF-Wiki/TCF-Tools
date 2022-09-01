import {createApp} from 'vue';
import {library} from '@fortawesome/fontawesome-svg-core';

import {faBars} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

library.add(faBars);

import './assets/main.css';

import Router from './Router.vue';
const RouterApp = createApp(Router);
RouterApp.mount('main');

import Navbar from './Navbar.vue';
const NavbarApp = createApp(Navbar).component('font-awesome-icon', FontAwesomeIcon);
NavbarApp.mount('nav');

import Footer from './Footer.vue';
const FooterApp = createApp(Footer);
FooterApp.mount('footer');
