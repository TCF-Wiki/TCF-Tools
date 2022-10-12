<template>
<button class=""
@click="clearSearch">
    Clear Search
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