<template>
    <div class="forge-button" role="button" @click="initiateForge()"
    >
        <img class="bg-image" src="forge-images/Button_Ready.png" v-if="Object.keys(selectedItems.get()).length > 0">
        <img class="hover-image" src="forge-images/Button_Hover.png">
    </div>

</template>
<script lang="ts">
import {defineComponent} from 'vue';
import { outputItems, selectedItems } from '../store';
import { chooseRecipeOutput, resolveAbyssToken } from '../ForgeLogic';

export default defineComponent({
    props: ['item'],
    data() {
        return {
            outputItems,
            selectedItems
        }
    },
    methods: {
        initiateForge() : void {
            chooseRecipeOutput()
        }
    }
});
</script>
<style scoped>
.forge-button {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
    z-index: 2;
    position: absolute;
}

.forge-button:hover .hover-image {
    opacity: 1;
}
.hover-image {
    position: absolute;
    opacity: 0;
    transition: all .2s ease-out;
    transform: scale(1.80) translateY(-20%) translateX(-.5%);
}


.bg-image {
    position: absolute;
    transition: all .2s ease-out;
    animation: pulse 5s infinite;
}


</style>
