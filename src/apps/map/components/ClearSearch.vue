<template>
<button @click="clearSearch" class="btn" 
v-tooltip="{ content: 'Clear your current selections', html: true }">
    <font-awesome-icon icon="fa-solid fa-trash" />
</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { selectedCreatures, selectedItems, selectedLocations } from '../store';
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
            selectedCreatures.clear()
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

</style>