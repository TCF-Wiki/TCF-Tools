<template>
    <div class="button-container">
        <div v-if="mapData" v-for="(value, key) in getLocations()" @click="selectedLocations.locationSwitch(key.toString())">
            <div>
                <button 
                    class="button locationBtn" 
                    :class="selectedLocations.list.includes(key.toString()) ? 'selected' : 'not-selected' && key.toString() != 'other' ? '' : ''"
                    >
                    {{ locationNamer(key.toString()) }}
                </button>
            </div>
        </div>
    </div>
    <h2> Other </h2>
    <div class="button-container">
        <div v-if="mapData" v-for="(value, key) in mapData['locations'][selectedMap.map]['other']" @click="selectedLocations.locationSwitch(key.toString())">
            <button 
                class="button locationBtn" 
                :class="selectedLocations.list.includes(key.toString()) ? 'selected' : 'not-selected'"
                >
                {{ locationNamer(key.toString()) }}
            </button>
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
import { locationNames } from '../mapConstants'
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
    methods: {
        getLocations() {
            let data = {...this.mapData['locations'][selectedMap.map]}
            delete data['VelteciteMineral']
            delete data['FocusCrystalMineral']
            delete data['TitanMineral'] 
            delete data['NickelMineral']
            delete data['WaterPlant']
            delete data['IvyPlant']
            delete data['DesertPlant']
            delete data['Brightcap']
            delete data['LootSpawnPoint_RedBarrel']
            delete data['LootSpawnPoint_CM_Human']
            delete data['LootSpawnPoint_Epic']
            delete data['LootSpawnPoint_Rare']
            delete data['LootSpawnPoint_Common']
            delete data['LootSpawnPoint_CM_Area']
            delete data['LootSpawnPoint_HDD']
            delete data['Special_LootPoint']
            delete data['LootPoint']
            delete data['other']
            return data
        },
        locationNamer(key: string) {
            /* @ts-ignore */
            return locationNames[key]
        }
    }
});
</script>
