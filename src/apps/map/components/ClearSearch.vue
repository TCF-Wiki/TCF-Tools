<template>
<button class=""
@click="clearSearch">
    <font-awesome-icon icon="fa-solid fa-trash" />
</button>

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
button {
    color: var(--rarity-color-exotic);
    appearance: none;
    background: none;
    border: none;
}
</style>