<script lang="ts">
import {defineComponent} from 'vue';

import Home from './views/home/PageHome.vue';
// @ts-ignore
import Calc from './apps/calc/PageCalc.vue';
import Loadout from './apps/loadout/PageLoadout.vue';
import Map from './apps/map/PageMap.vue';
import Forge from './apps/forge/PageForge.vue';
import Progress from './apps/quest/PageQuest.vue';
import NotFound from './views/Page404.vue';

const routes = {
    '/': Home,
    '/index.html': Home,
    '/calculator.html': Calc,
    '/loadout.html': Loadout,
    '/map.html': Map,
    '/forge.html': Forge,
    '/progress.html': Progress,
};
const names = {
    '/': 'Apps',
    '/index.html': 'Apps',
    '/calculator.html': 'Weapon Calculator',
    '/loadout.html': 'Loadout Generator',
    '/map.html': 'Interactive Map',
    '/forge.html': 'Forge Simulator',
    '/progress.html': 'Progress Tracker',
};

export default defineComponent({
    data: function () {
        return {
            currentPath: location.pathname,
        };
    },
    computed: {
        currentView(): any {
            let page: string = location.pathname;
            if (page == '/index.html') {
                location.pathname = '/';
                page = '/';
            }
            if (page == '/calc') {
                location.pathname = '/calculator';
                page = '/calculator';
            }
            if (!page) return;
            var newPage: any;
            if (page.includes('.html')) {
                //@ts-expect-error
                newPage = routes[page] || NotFound;
            } else {
                //@ts-expect-error
                newPage = routes[page != '/' ? page + '.html' : page] || NotFound;
            }
            if (newPage != NotFound) {
                let name: string;
                if (page.includes('.html')) {
                    //@ts-expect-error
                    name = names[page];
                } else {
                    //@ts-expect-error
                    name = names[page != '/' ? page + '.html' : page];
                }
                document.title = name + ' | TC:F Wiki';
            } else {
                document.title = '404 - Not Found | TC:F Wiki';
            }
            return newPage;
        },
    },
    mounted() {
        window.addEventListener('hashchange', () => {
            return;
        });
    },
});
</script>

<template>
    <component :is="currentView" />
</template>
