<template>
    <h2> Containers </h2>
    <div class="button-container">
        <button type="button" @click="enableAllContainers()"
        aria-label="Enable all container locations">
            Enable All
        </button>
        <button type="button" @click="disableAllContainers()"
        aria-label="Disable all container locations">
            Disable All
        </button>
    </div>
    <div class="button-container">
        <div v-if="mapData" v-for="(value, key) in getLocations()" @click="selectedLocations.toggle(key.toString())"
        :aria-label="'Toggle ' + locationNamer(key.toString())">
            <div>
                <p 
                    :class="selectedLocations.get().includes(key.toString()) ? 'selected' : 'not-selected' "
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
    <h2> Special Locations </h2>
    <div class="button-container">
        <button type="button" @click="enableAllSpecial"
        aria-label="Enable all container locations">
            Enable All
        </button>
        <button type="button" @click="disableAllSpecial"
        aria-label="Disable all special locations">
            Disable All
        </button>
    </div>
    <div class="button-container">
        <div v-if="mapData" v-for="(value, key) in mapData['locations'][selectedMap.get()]['other']" @click="selectedLocations.toggle(key.toString())"
        :aria-label="'Toggle ' + locationNamer(key.toString())">
            <p 
                :class="selectedLocations.get().includes(key.toString()) ? 'selected' : 'not-selected'"
                >
                {{ locationNamer(key.toString()) }}
        </p>
        </div>
    </div>
</template>



<script lang="ts">
import {defineComponent} from 'vue';
import {getMapData} from '../data';
import {selectedLocations, selectedMap} from '../store';
import { locationNames, specialLocations } from '../mapConstants'
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
            let data = {...this.mapData['locations'][selectedMap.get()]}
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
        },
        enableAllContainers() : void {
            // enables all containers
            let nameList = Object.keys(this.getLocations())
            let newLocations : string[] = [];

            for (let cont in nameList) {
                newLocations.push(nameList[cont])
            }

            selectedLocations.set(newLocations)
        },
        disableAllContainers() : void {
            // disables all containers
            let oldLocations = selectedLocations.get()
            let newLocations : string[] = [];

            for (let loc in oldLocations) {
                if (specialLocations.includes(oldLocations[loc])) {
                    newLocations.push(oldLocations[loc])   
                }
            } 

            selectedLocations.set(newLocations)
        },
        enableAllSpecial() : void {
            // enables all special locations
            let nameList = Object.keys(this.mapData['locations'][selectedMap.get()]['other'])
            let newLocations : string[] = []

            if (nameList) {
                for (let loc in nameList) {
                    newLocations.push(nameList[loc])
                }
                selectedLocations.set(newLocations)
            }
        },
        disableAllSpecial() : void {
            // disables all special locations
            let oldLocations = selectedLocations.get()
            let newLocations : string[] = [];

            for (let loc in oldLocations) {
                if (!specialLocations.includes(oldLocations[loc])) {
                    newLocations.push(oldLocations[loc])   
                }
            } 

            selectedLocations.set(newLocations)
        }
    }
});
</script>


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