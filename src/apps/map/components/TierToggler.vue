<template>
<button @click="selectedTier.toggle" class="btn">
    <font-awesome-icon icon="fa-solid fa-ranking-star" />
</button>

<div class="hover"> 
    Toggle loot tiers
</div>

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
    color: var(--rarity-color-rare);
    appearance: none;
    background: none;
    border: none;
}

.hover {
    opacity: 0;
    pointer-events: none;
    position: absolute;
    z-index: 1;
    background-color: var(--background-stripe-color);
    top: -250%;
    left: 3.9%;
    padding: .5rem;
    border-radius: .5rem;

    transition: all .2s ease-in-out .2s;
}

.btn:hover + .hover {
    opacity: 1;
    pointer-events: all;
}
</style>