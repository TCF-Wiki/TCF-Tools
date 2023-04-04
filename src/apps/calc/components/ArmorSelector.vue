<template>
    <div class="container" @input="updateSelected" v-if="selectedTarget.selected == 'PlayerDefault'">
        <v-select  
            v-model="selected" 
            :options="sortedData" 
            :reduce="sortedData => sortedData.codeName" 
            label="inGameName"
            placeholder="Select armor"
            :clearable="false"
        />
    </div>
    <div v-else class="container"> 
        <v-select  
                v-model="value" 
                :options="weakSpotList" 
                label="inGameName"
                placeholder="Select weakspot"
                :clearable="false"
        />
    </div>
    {{ value  }}
</template>


<script>
import {armorData, targetData} from "../data";
import {selectedArmor, selectedTarget, selectedWeakspotValue} from "../store";
export default {
    name: "ArmorSelector",
    data() {
        return {
            data: armorData,
            sortedData: [
                {inGameName: 'No Armor', codeName: 'PlayerDefault'},
                {inGameName: 'Basic Shields (Common)', codeName: 'Shield_01'},
                {inGameName: 'Standard Shields (Uncommon)', codeName: 'Shield_02'},
                {inGameName: 'Reinforced Shields (Rare)', codeName: 'Shield_03'},
                {inGameName: 'Combat Shields (Epic)', codeName: 'Shield_04'},
                {inGameName: 'Enhanced Shields (Exotic)', codeName: 'Shield_05'},
                {inGameName: 'Titan Forged Shields (Legendary)', codeName: 'Shield_Altered_03'},
            ],
            selected: 'Shield_01',
            targetData,
            selectedTarget,
            selectedWeakspotValue,
            targetData,
            weakSpotList: [],
            value: 'None'
        };
    },
    methods: {
        getWeakspotList(data) {
            // this is to get a list of weakspots for the current target, removing unused/weird weakspots
            let output = [{inGameName: 'None', value: 1}]
            for (let key in data) {
                if (key.includes('Ankle') && !key.includes('WeakSpot')) continue;
                // split it to just the first word
                let realKey = key.split('_')[0]
                // remove numbers
                realKey = realKey.replace(/[0-9]/g, '');
                // remove trailing A or C
                if (realKey.charAt(realKey.length-1) == 'A' || realKey.charAt(realKey.length-1) == 'C') {
                    realKey = realKey.slice(0, -1)
                }
                if (realKey == 'NeckSpike') realKey = 'Neck Spike'
                if (realKey == 'EggSack') realKey = 'Egg Sack'
                if (['Neck', 'Spine'].includes(realKey)) continue
                if (realKey == 'EggExploding' || realKey == 'Eggpulse') realKey = 'Exploding Sac'
                if (output.length > 1 && output[output.length -1]['inGameName'] == realKey) continue

                output.push({inGameName: realKey, value: data[key]['m_damageMultiplier']})
            }

            this.weakSpotList = output
        },
        getWeakspotValue(value) {
            return value
        }
    },
    watch: {
        selectedTarget : {
            deep: true,
            handler() {
                selectedWeakspotValue.changeValue(1)
                if (selectedTarget.selected != 'PlayerDefault') this.getWeakspotList(targetData[selectedTarget.selected]['damageAreas'])
            }
        },
        value : {
            deep: true,
            handler() {
                selectedWeakspotValue.changeValue(this.value.value)
            }
        },
        selected : {
            deep: true,
            handler() {
                selectedArmor.changeSelected(this.selected)
            }
        }
    }
};
</script>

<style scoped>

.armor-image {
    width: 6em;
    margin: auto;
    transition: all .2s ease-in-out;
}

.armor-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 
}

.container button {
    width: 100%;
    height: 100%;
}


.armor-selector {
    margin: .2em;
    text-align: center;
    cursor: pointer;
}

.armor-selector:hover .armor-image {
    transform: scale(1.05);
}

@media screen  and (max-width: 900px){
    .armor-image {
        display: none;
    }
    .armor-name {
        font-size: .8rem;
    }
    .armor-container {
        grid-template-columns: 1fr 1fr
    }
}

</style>