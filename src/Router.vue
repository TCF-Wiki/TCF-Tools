<script lang="ts">
import {defineComponent} from 'vue';

import Home from './home/PageHome.vue';
// @ts-ignore
import Calc from './calc/PageCalc.vue';
import Loadout from './loadout/PageLoadout.vue';
import Map from './map/PageMap.vue';
import NotFound from './Page404.vue';

const routes = {
    '/': Home,
    '/about': Home,
    '/calculator': Calc,
    '/loadout': Loadout,
    '/map': Map,
};
const names = {
    '/': 'Apps',
    '/about': 'About',
    '/calculator': 'Weapon Calculator',
    '/loadout': 'Loadout Generator',
    '/map': 'Interactive Map',
};

export default defineComponent({
    data: function () {
        return {
            currentPath: window.location.pathname,
        };
    },
    computed: {
        currentView(): any {
            // @ts-expect-error
            var newPage = routes[this.currentPath || '/'] || NotFound;
            if (newPage != NotFound) {
                // @ts-expect-error
                var name = names[this.currentPath];
                document.title = name + ' | TC:F Wiki';
            } else {
                document.title = '404 - Not Found';
            }
            return newPage;
        },
    },
    mounted() {
        /*console.log('Pathname: ' + window.location.pathname);
        console.log('Hostname: ' + window.location.hostname);
        console.log('Hash: ' + window.location.hash);
        console.log('Href: ' + window.location.href);
        console.log('Origin: ' + window.location.origin);*/
        window.addEventListener('hashchange', () => {
            this.currentPath = window.location.pathname;
        });
    },
});
</script>

<template>
    <component :is="currentView" />
</template>
