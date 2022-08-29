import {createApp} from 'vue';
import './assets/main.css';

import Router from './Router.vue';
const RouterApp = createApp(Router);
RouterApp.mount('main');

import Navbar from './Navbar.vue';
const NavbarApp = createApp(Navbar);
NavbarApp.mount('nav');

import Footer from './Footer.vue';
const FooterApp = createApp(Footer);
FooterApp.mount('footer');
