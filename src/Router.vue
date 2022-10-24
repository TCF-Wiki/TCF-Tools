<script lang="ts">
import {defineComponent} from 'vue';


import Home from './views/home/PageHome.vue';
import About from './views/about/PageAbout.vue';
// @ts-ignore
import Calc from './apps/calc/PageCalc.vue';
import Loadout from './apps/loadout/PageLoadout.vue';
import Map from './apps/map/PageMap.vue';
import Forge from './apps/forge/PageForge.vue';
import Progress from './apps/quest/PageQuest.vue'
import NotFound from './views/Page404.vue';

const routes = {
    '/': Home,
    '/about': About,
    '/calc': Calc,
    '/loadout': Loadout,
    '/map': Map,
    '/forge': Forge,
    '/progress': Progress
};
const names = {
    '/': 'Apps',
    '/about': 'About',
    '/calc': 'Weapon Calculator',
    '/loadout': 'Loadout Generator',
    '/map': 'Interactive Map',
    '/forge': 'Forge Simulator',
    '/progress': 'Progress Tracker'
};

export default defineComponent({
    data: function () {
        return {
            currentPath: window.location.pathname,
        };
    },
    computed: {
        currentView(): any {
            //@ts-expect-error
            var newPage = routes[this.currentPath || '/'] || NotFound;
            if (newPage != NotFound) {
                //@ts-expect-error
                var name = names[this.currentPath];
                document.title = name + ' | TC:F Wiki';
            } else {
                document.title = '404 - Not Found | TC:F Wiki';
            }
            return newPage;
        },
    },
    mounted() {
        window.addEventListener('hashchange', () => {
            this.currentPath = window.location.pathname;
        });
    },
});
</script>

<template>
    <component :is="currentView" />
</template>
