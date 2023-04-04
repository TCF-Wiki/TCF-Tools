import {createApp} from "vue";
import Page from "./apps/calc/PageCalc.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";

// @ts-ignore
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

import all from "./all";
const App = createApp(Page).component("font-awesome-icon", all.FontAwesome).use(Toast).use(FloatingVue).component('v-select', vSelect).component("EasyDataTable", Vue3EasyDataTable);
App.mount("main");
