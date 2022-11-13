<template>
<button @click="selectedTier.toggle" class="btn"
v-tooltip="{ content: ' Toggle loot tiers <br>  Not available on map 3 yet', html: true }">
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
.btn {
    color: var(--rarity-color-epic);
    appearance: none;
    background: none;
    border: none;
}
</style>