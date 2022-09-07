<template>
<div>
    <h2> Selected Locations </h2>
    <div class="selected-locations"> 
        <ul>
            <li v-for="location in selectedLocations.list"> {{ location}} <span @click="selectedLocations.removeLocation(location)"> (remove)</span> </li>
        </ul>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { selectedLocations } from '../store';
export default defineComponent({
    data() {
        return {
            selectedLocations
        }
    }
})
</script>

<style scoped>
.selected-locations {
    background-color: var(--background-button-color);
    width: 18rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: .7rem;
    height: 100%;
}


</style>