<template>
<div>
<p v-for="value, key in mapData['locations'][selectedMap.map]" @click="selectedLocations.addLocation(key.toString())"> 
    {{ key }}
</p>

</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapData } from '../data';
import { selectedLocations, selectedMap } from '../store';
export default defineComponent({
    data() {
        return {
            mapData: mapData,
            selectedLocations,
            selectedMap,
        }
    }
})
</script>