<template>
<button class="button" @click="selectedTier.toggle" :class="{on: selectedTier.get()}"> Toggle Loot Tiers </button>
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
.toggleBtn {
    background-color: var(--rarity-color-common);
    border-color: #b0b3b6;
    font-size: .8rem;
}

.on {
    background-color: var(--rarity-color-uncommon);
    border-color: #398e11;
}

</style>