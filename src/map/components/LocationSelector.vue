<template>
    <div class="button-container">
        <div v-if="mapData" v-for="(value, key) in mapData['locations'][selectedMap.map]" @click="selectedLocations.locationSwitch(key.toString())">
            <div v-if="key.toString() != 'other'">
                <button class="button locationBtn" :class="selectedLocations.list.includes(key.toString()) ? 'selected' : 'not-selected' && key.toString() != 'other' ? '' : ''">{{ key }}</button>
            </div>
        </div>
    </div>
    <h2> Other </h2>
    <div class="button-container">
        <div v-if="mapData" v-for="(value, key) in mapData['locations'][selectedMap.map]['other']" @click="selectedLocations.locationSwitch(key.toString())">
            <button class="button locationBtn" :class="selectedLocations.list.includes(key.toString()) ? 'selected' : 'not-selected'">{{ key }}</button>
        </div>
    </div>
</template>

<style scoped>
.locationBtn {
    background-color: var(--rarity-color-common);
    border-color: #b0b3b6;
    width: 100%;
    font-size: .8rem;
}

.selected {
    background-color: var(--rarity-color-uncommon);
    border-color: #398e11;
}
.hidden {
    display: none;
}

.button-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: .2rem
}

@media screen  and (max-width: 900px){
    .button-container {
        grid-template-columns: 1fr 1fr
    }
}
</style>

<script lang="ts">
import {defineComponent} from 'vue';
import {getMapData} from '../data';
import {selectedLocations, selectedMap} from '../store';
export default defineComponent({
    data() {
        return {
            mapData: null as null | any,
            selectedLocations,
            selectedMap,
        };
    },
    async mounted() {
        this.mapData = await getMapData();
    },
});
</script>
