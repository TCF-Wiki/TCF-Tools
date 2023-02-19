<template>
    <section>
        <header> 
            <h2> Containers </h2> 
            <div @click="enableAllContainers()" aria-label="Enable all container locations" class="enable-all"
            v-tooltip="{ content: 'Enable all', html: true }">
                <font-awesome-icon icon="fa-solid fa-square-check" />    
            </div> 
        
            <div @click="disableAllContainers()" aria-label="Disable all container locations" class="disable-all"
            v-tooltip="{ content: 'Disable all', html: true }">
                <font-awesome-icon icon="fa-solid fa-square-xmark" />   
            </div> 
        </header>
        <div class="button-container">
            <div v-if="mapData" 
            v-for="value in orderedContainers" 
            @click="notFoundContainers.includes(value) ? null : selectedLocations.toggle(value)"
            :aria-label="'Toggle ' + locationNamer(value)"
            role="button">
                <div>
                    <p :class="containerClassGiver(value)">
                        <span>{{ locationNamer(value) }} </span>
                        <span class="small"> ({{ spawnAmount(value, 'locations')}}) </span>
                    </p>
                        
                </div>
            </div>
        </div>
    </section>
    <section> 
        <header> 
            <h2> Creature Spawns </h2> 
            <div @click="enableAllCreatures()" aria-label="Enable all creature locations" class="enable-all"     
            v-tooltip="{ content: 'Enable all', html: true }">
                <font-awesome-icon icon="fa-solid fa-square-check" />    
            </div> 
        
            <div @click="disableAllCreatures()" aria-label="Disable all creature locations" class="disable-all"
            v-tooltip="{ content: 'Disable all', html: true }">
                <font-awesome-icon icon="fa-solid fa-square-xmark" />
            </div> 
        </header>
        <div class="button-container">
            <div v-if="mapData" 
                v-for="value in orderedCreatures" 
                @click="notFoundCreatures.includes(value) ? null : selectedCreatures.toggle(value)"
                :aria-label="'Toggle ' + creatureNamer(value)"
                role="button">
                <p :class="creatureClassGiver(value)">
                    <span> {{ creatureNamer(value) }} </span>
                    <span class="small"> ({{ spawnAmount(value, 'creatureLocations')}}) </span>
                </p>
            </div>
        </div>
    </section> 
    <section> 
        <header> 
            <h2> Special Locations </h2> 
            <div @click="enableAllSpecial()" aria-label="Enable all special locations" class="enable-all"     
            v-tooltip="{ content: 'Enable all', html: true }">
                <font-awesome-icon icon="fa-solid fa-square-check" />    
            </div> 
        
            <div @click="disableAllSpecial()" aria-label="Disable all special locations" class="disable-all"
            v-tooltip="{ content: 'Disable all', html: true }">
                <font-awesome-icon icon="fa-solid fa-square-xmark" />
            </div> 
        </header>
        <div class="button-container">
            <div v-if="mapData" 
                v-for="value in orderedSpecialLocations" 
                @click="notFoundSpecialLocations.includes(value) ? null : selectedLocations.toggle(value)"
                :aria-label="'Toggle ' + locationNamer(value)"
                role="button">
                <p :class="specialLocationClassGiver(value)">
                    <span> {{ locationNamer(value) }} </span>
                    <span class="small"> ({{ spawnAmount(value, 'other')}}) </span>
            </p>
            </div>
        </div>
    </section> 
</template>



<script lang="ts">
import { defineComponent } from 'vue';
import { getMapData } from '../data';
import { selectedLocations, selectedMap, selectedCreatures } from '../store';
import { locationNames, specialLocations, alphabeticalContainers, alphabeticalSpecialLocations, alphabeticalCreatures } from '../mapConstants'
export default defineComponent({
    data() {
        return {
            mapData: null as null | any,
            selectedLocations,
            selectedMap,
            selectedCreatures,
            containers: [] as string[],
            specialLocations: [] as string[],
            orderedContainers: [] as string[],
            orderedSpecialLocations: [] as string[],
            notFoundContainers: [] as string[],
            notFoundSpecialLocations: [] as string[],
            creatures: [] as string[],
            orderedCreatures: [] as string[],
            notFoundCreatures: [] as string[]
        };
    },
    async mounted() {
        // load map data and other misc data
        this.mapData = await getMapData();
        this.containers = await this.getLocations()
        this.creatures = await this.getCreatures()
        this.specialLocations = Object.keys(this.mapData['locations'][selectedMap.get()]['other'])

        // create our initial list of locations, properly ordered
        this.orderContainers()
        this.orderSpecialLocations()
        this.orderCreatures()

        // whenever our map changes update our list locations
        this.$watch(
            'selectedMap',
            async () => {
                this.containers = await this.getLocations()
                this.specialLocations = Object.keys(this.mapData['locations'][selectedMap.get()]['other'])
                this.creatures = await this.getCreatures()

                this.orderContainers()
                this.orderSpecialLocations()
                this.orderCreatures()
            },
            {deep: true}
        );
    },
    methods: {
        spawnAmount(value: string, source: string) {
            let data;
            if (source == 'other') {
                data = this.mapData['locations'][selectedMap.get()]['other'][value];
            } else {
                data = this.mapData[source][selectedMap.get()][value];
            }

            if (data) return Object.keys(data).length
            return 0
        },
        async getLocations() {
            // returns a list of our location data used for display. 
            // We remove the keys we do not want people to be able to search for.
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
            delete data['GenericContainer']
            delete data['other']
            return Object.keys(data)
        },
        async getCreatures() {
            let data = {...this.mapData['creatureLocations'][selectedMap.get()]}
            return Object.keys(data)
        },
        locationNamer(key: string) {
            /* @ts-ignore */
            return locationNames[key]
        },
        orderContainers() {
            // order our list of containers on this map alphabetically
            let containerNames = this.containers;
            let ordered = alphabeticalContainers;


            let orderedList : string[] = [];
            let notFoundOnThisMap : string[] = []
            for (let cont in ordered) {
                if (containerNames.includes(cont)) {
                    orderedList.push(cont)
                } else {
                    // update our display to show if this map does not have this search available
                    orderedList.push(cont)
                    notFoundOnThisMap.push(cont)
                }
            }
            this.orderedContainers = orderedList;
            this.notFoundContainers = notFoundOnThisMap;
        },
        orderSpecialLocations() {
            let specialNames = this.specialLocations;
            let ordered = alphabeticalSpecialLocations;


            let orderedList : string[] = [] 
            let notFoundOnThisMap : string[] = []
            for (let cont in ordered) {
                if (specialNames.includes(cont)) {
                    orderedList.push(cont)
                } else {
                    orderedList.push(cont)
                    notFoundOnThisMap.push(cont)
                }
            }
            this.orderedSpecialLocations = orderedList;
            this.notFoundSpecialLocations = notFoundOnThisMap;
        },
        enableAllContainers() : void {
            // enables all containers
            let nameList = this.orderedContainers

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
        creatureNamer(creature: string) : string {
            /* @ts-ignore */
            return alphabeticalCreatures[creature]
        },
        orderCreatures() {
            // order our list of creatures on this map alphabetically
            let creatureNames = this.creatures;
            let ordered = alphabeticalCreatures;

            let orderedList : string[] = [];
            let notFoundOnThisMap : string[] = []

            for (let creature in ordered) {
                if (creatureNames.includes(creature)) {
                    orderedList.push(creature)
                } else {
                    // update our display to show if this map does not have this search available
                    orderedList.push(creature)
                    notFoundOnThisMap.push(creature)
                }
            }
            this.orderedCreatures = orderedList;
            this.notFoundCreatures = notFoundOnThisMap;
        },
        enableAllCreatures() : void {
            // enables all containers
            let nameList = this.orderedCreatures

            let newLocations : string[] = [];

            for (let cont in nameList) {
                newLocations.push(nameList[cont])
            }

            selectedCreatures.set(newLocations)
        },
        disableAllCreatures() : void {
            selectedCreatures.clear()
        },
        enableAllSpecial() : void {
            // enables all special locations
            let nameList = Object.keys(this.mapData['locations'][selectedMap.get()]['other'])
            let newLocations : string[] = []

            selectedLocations.set(Object.keys(alphabeticalSpecialLocations))
            // if (nameList) {
            //     for (let loc in nameList) {
            //         newLocations.push(nameList[loc])
            //     }
            //     selectedLocations.set(newLocations)
            // }
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
        },
        containerClassGiver(location: string) : string {
            // returns a list of classes this location should have

            let classList = ''
            if (selectedLocations.get().includes(location)) {
                classList += 'selected '
            } else {
                classList += 'not-selected '
            }

            if (this.notFoundContainers.includes(location)) {
                classList += 'not-found'
            }
            
            return classList
        },
        specialLocationClassGiver(location: string) : string {
            // returns a list of classes this location should have

            let classList = ''
            if (selectedLocations.get().includes(location)) {
                classList += 'selected '
            } else {
                classList += 'not-selected '
            }

            if (this.notFoundSpecialLocations.includes(location)) {
                classList += 'not-found'
            }
            
            return classList
        },
        creatureClassGiver(creature: string) : string {
            // returns a list of classes this location should have

            let classList = ''
            if (selectedCreatures.get().includes(creature)) {
                classList += 'selected '
            } else {
                classList += 'not-selected '
            }

            if (this.notFoundCreatures.includes(creature)) {
                classList += 'not-found'
            }
            
            return classList
        }
    }
});
</script>


<style scoped>
header {
    border-bottom: 1px solid var(--border-color-base);
    margin: auto;
    margin-bottom: var(--space-sm);
    width: 77%;
}

h2 {
    text-align: center;
}
p {
    cursor: pointer;
    user-select: none;
}

.selected::before {
    content: '✔ ';
    color: var(--rarity-color-uncommon);
}
.not-selected::before {
    content: '✖ ';
    color: var(--rarity-color-exotic);
}

.not-found span{
    text-decoration-line: line-through;
}

/* Two spaces after this so it iw side enough to be equal width as selected and not selected. Second one is unicode space. */
.not-found::before {
    content: '? \00a0';
    color: var(--rarity-color-rare);
    font-weight: bold;
}

.hidden {
    display: none;
}

.button-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: .6rem;
}

@media screen  and (max-width: 900px){
    .button-container {
        grid-template-columns: 1fr;
        width: 100%;
        font-size: .9rem;
    }
}
.button-container div {
    background-color: transparent;
    transition: background-color .2s ease-in-out;
}
.button-container div:hover {
    background-color: var(--background-stripe-color);
}

.enable-all,
.disable-all {
    width: 	var(--space-md);
    cursor: pointer;
}

.enable-all:hover,
.disable-all:hover {
    scale: 1.1
}

.enable-all {
    color: var(--rarity-color-uncommon);
}

.disable-all {
    color: var(--rarity-color-exotic);
}

header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-xs);
}

section {
    background-color: var(--background-body-color);
    padding: var(--space-md);
    margin-bottom: var(--space-md);
}

.small {
    font-size: small;
    text-decoration-line: none !important;
}
</style>