<template>
    <h2> Containers </h2>
    <div class="button-container">
        <div v-if="mapData" v-for="(value, key) in getLocations()" @click="selectedLocations.locationSwitch(key.toString())">
            <div>
                <p 
                    :class="selectedLocations.list.includes(key.toString()) ? 'selected' : 'not-selected' "
                    >
                    {{ locationNamer(key.toString()) }}

                    <img 
                    :src="'/map-images/marker-icons/' + key + '.png'"
                    class="icon"
                    />
                </p>
            </div>
        </div>
    </div>
    <h2> Other </h2>
    <div class="button-container">
        <div v-if="mapData" v-for="(value, key) in mapData['locations'][selectedMap.map]['other']" @click="selectedLocations.locationSwitch(key.toString())">
            <p 
                :class="selectedLocations.list.includes(key.toString()) ? 'selected' : 'not-selected'"
                >
                {{ locationNamer(key.toString()) }}
        </p>
        </div>
    </div>
</template>

<style scoped>
p {
    cursor: pointer;
}

.selected::before {
    content: '✔ ';
    color: var(--rarity-color-uncommon);
}
.not-selected::before {
    content: '✖ ';
    color: var(--rarity-color-exotic);
}

.hidden {
    display: none;
}

.button-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: .6rem;
    justify-content: left;
}

@media screen  and (max-width: 900px){
    .button-container {
        grid-template-columns: 1fr
    }
}

.icon {
    display: inline-block;
    margin-left: 10r;
    width: 16px;
    position: absolute;
    z-index: -1;
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
