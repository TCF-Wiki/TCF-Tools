<template>
<div> 
    <header class="modal__header"> 
        <h2>  
            <div> 
                <img :src="'/map-images/item-images/'+ faction + '_Reputation.png'" class="modal__header-image"> 
                {{ name }} 
                <img :src="'/map-images/item-images/'+ faction + '_Reputation.png'" class="modal__header-image"> 
            </div>
        </h2>
    </header>
    <section class="modal__description"> 
        <div class="modal__description-text">
            {{ desc }}
        </div>
    </section>
    <section class="quest-parts"> 
        <div v-for="m, index in missions" class="container">
            <QuestCardPart 
                :mission="m"
                :zIndex="missions.length-index"
                :index="index"
                :faction="faction"
                :name="name"
            />
        </div>

    </section>

    <section class="quest-parts">
        <div class="container"  v-if="Object.keys(items).length">
            <p> Items needed to finish this mission: </p>
            <div class="item-list">
                <div v-for="amount, index in items" :key="index.toString()" class="item__row">
                    <img :src="'/map-images/item-images/' + itemName(index.toString(), true) + '.png'" class="item__image"> 
                    <span>
                        <span v-if="index.toString()=='SoftCurrency'"> {{ amount/1000 }}k </span>
                        <span v-else> {{ amount }} </span>
                        {{ itemName(index.toString()) }}
                    </span>
                </div> 
            </div>
        </div>
    </section>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { missionData, stringTables, locationData } from '../data';
import QuestCardPart from './QuestPartsCard.vue'
import { missions } from '../QuestConstants';
import { factionProgress } from '../trackProgress';
import { getItemsOfMission } from '../utils'
import { itemData, shieldData, helmetData, backpackData } from '../../forge/data';
export default defineComponent({
    props: ['name', 'faction'],
    components: {
        QuestCardPart
    },
    data() {
        return {
            missionData: missionData,
            missions: missions[this.faction][this.name],
            stringTable: stringTables['Objectives'],
            locations: locationData,
            desc: '' as string,
            progress: factionProgress,
            shieldData: shieldData,
            helmetData: helmetData,
            backpackData: backpackData,

            items: {} as any
        }
    },
    mounted() {
        const mission = missions[this.faction][this.name] 
        if (mission) {
            this.desc = this.missionData[mission[0]]['chainDescription']
        }        

        this.getItems()
    },
    computed: {
    },
    methods: {
        getItems() {
            const mission = missions[this.faction][this.name]
            const length = mission.length
            const progress = this.progress.get()[this.faction][this.name]

            let newData : any = {}
            for (let p in missions[this.faction][this.name]) {
                const part = missions[this.faction][this.name][p]

                // we have not completed this part of the mission yet
                if (progress < parseInt(p)+1) {
                    const partData = missionData[part]

                    // just in case, if the data exists
                    if (partData) {
                        // get the total items we use for this mission
                        let data = getItemsOfMission(partData['objectives'])

                        // save the items, adding duplicate entries together
                        for (let item in data) {
                            if (newData[item]) {
                                newData[item] = newData[item] + data[item]
                            } else {
                                newData[item] = data[item]
                            }
                        }
                    }
                }
            }
            const sortedData = Object.keys(newData).sort((a,b) => newData[b]-newData[a]).reduce((r, k) => ({...r, [k]: newData[k]}), {});


            this.items = sortedData
        },

        itemName(item: string, urlFormat?: boolean) : string {
            // This function gets the name of the image when given an item name. Handles edge cases.
            if (item.includes('Shield_'))    item =  this.shieldData[item]['ingamename']
            if (item.includes('SoftCurrency')) item = 'K-Marks'
            if (item.includes('ICAScrip')) item = "ICA Scrip"
            if (item.includes('OsirisScrip')) item = "Osiris Scrip"
            if (item.includes('KorolevScrip')) item = "Korolev Scrip"
            else if (item.includes('Helmet_'))    item = this.helmetData[item]['ingamename']
            else if (item.includes('Bag_'))       item =  this.backpackData[item]['ingamename']
            else if (item.includes('ShockGrenade_02')) item =  'Frag Grenade'
            else if (item.includes('SmokeGrenade_01')) item = 'Smoke Grenade'
            else if (item.includes('Consumable_Health')) item = 'Weak Medkit'
            else if (item.includes('Scrip'))      item = item
            else if (item.includes('HardDrive'))  item = 'Data Drive Tier 1'
            else if (item.includes('VadimPredecessorItem')) item = 'Gregor\'s Dossier'
            else {
                if (itemData[item]) {
                    item = itemData[item]['ingamename']
                } else {
                    if (stringTables['Materials'][item]) item = stringTables['Materials'][item]['name']
                }
            }
            if (item.includes('Fusion Cartridge')) item = 'Fusion Cartridge Batteries'
            if (item.includes('OrbitalCanonTarget')) item = 'Orbital Cannon Beacon'
            
            
            if (urlFormat) return item.split(' ').join('_').replace('#', '%23')
            return item
        }
    },
    watch: {
        progress: {
            deep: true,
            handler() {
                this.getItems()
            }
        }
    }
})
</script>

<style scoped>


.modal__header h2 {
    font-family: sans-serif;
    text-transform: initial;
    letter-spacing: .2rem;
}

.modal__header h2 div {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.modal__header-image {
    margin: 0;
    scale: 0.7;
    translate: 0 -.5rem;
}


.modal__description {
    max-width: 75%;
    margin: 1.5rem auto;
    border-bottom: 0px solid var(--text-color-body-white);
}

@media screen and (max-width: 900px) {
    .modal__header h2 {
        font-size: 2rem;
    }

    .modal__header-image {
        display: none;
    }

    .modal__description {
        max-width: 90%;
    }

}
.quest-parts {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 100%;
    max-width: 100%;

    gap: 3rem;
    margin-bottom: 20rem;
}

@media screen and (max-width: 1500px) {
    .quest-parts {
        grid-template-columns: 1fr 1fr 1fr;
    }
}
@media screen and (max-width: 1200px) {
    .quest-parts {
        grid-template-columns: 1fr 1fr;
    }
}
@media screen and (max-width: 900px) {
    .quest-parts {
        grid-template-columns: 1fr;
        margin: auto;
    }
}

.container {
    position: relative;
}

.item__row {
    display: grid;
    grid-template-columns: 1fr 5fr;
    gap: .5rem;

    height: 2.2rem;
}

.item__row span {
    text-overflow: ellipsis;
}

.item__image {
    height: 2rem;
}

.container p {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    border-bottom: 2px dotted var(--text-color-body-white);
}
</style>