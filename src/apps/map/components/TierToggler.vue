<template>
<button @click="selectedTier.toggle">
    <font-awesome-icon icon="fa-solid fa-ranking-star" />
</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { selectedTier } from '../store';
export default defineComponent({
    data() {
        return {
            selectedTier
        }
    }
})
</script> 

<style scoped> 
button {
    color: var(--rarity-color-rare);
    appearance: none;
    background: none;
    border: none;
}
</style>