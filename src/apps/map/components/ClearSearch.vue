<template>
<button @click="clearSearch" class="btn">
    <font-awesome-icon icon="fa-solid fa-trash" />
</button>

<div class="hover"> 
    Clear your current selections
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { selectedItems, selectedLocations } from '../store';
export default defineComponent({
    data() {
        return {
            selectedItems, 
            selectedLocations
        }
    },
    methods: {
        clearSearch() : void {
            // this function clears the current search
            selectedItems.clear()
            selectedLocations.clear()
        }
    }
})
</script>

<style scoped> 
.btn {
    color: var(--rarity-color-exotic);
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
    right: 27%;
    padding: .5rem;
    border-radius: .5rem;

    transition: all .2s ease-in-out .2s;
}

.btn:hover + .hover {
    opacity: 1;
    pointer-events: all;
}
</style>