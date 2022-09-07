<template>
    <div>
        <p v-for="(value, key) in mapData['locations'][selectedMap.map]" @click="selectedLocations.locationSwitch(key.toString())">
            <button class="button locationBtn" :class="selectedLocations.list.includes(key.toString()) ? 'selected' : 'not-selected' && key.toString() != 'other' ? '' : 'hidden'">{{ key }}</button>
        </p>
    </div>
    <div>
        <p>Other</p>
        <p v-for="(value, key) in mapData['locations'][selectedMap.map]['other']" @click="selectedLocations.locationSwitch(key.toString())">
            <button class="button locationBtn" :class="selectedLocations.list.includes(key.toString()) ? 'selected' : 'not-selected'">{{ key }}</button>
        </p>
    </div>
</template>

<style scoped>
.locationBtn {
    width: 100%;
    margin-bottom: 0.2rem;
}

.selected {
    background-color: #eaff00;
}
.hidden {
    display: none;
}
</style>

<script lang="ts">
import {defineComponent} from 'vue';
import {mapData} from '../data';
import {selectedLocations, selectedMap} from '../store';
export default defineComponent({
    data() {
        return {
            mapData: mapData,
            selectedLocations,
            selectedMap,
        };
    },
});
</script>
