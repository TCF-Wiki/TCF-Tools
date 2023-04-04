<template>
<div class="container-wrapper"> 
    <div class="container">
        <input type="range" min="0" max="100" 
            v-model="HSValue" 
            @input="selectedHSValue.changeValue(HSValue)"
        > <span> {{ HSValue }}%</span>
    </div>
    <div v-if="selectedTarget.selected !== 'PlayerDefault'" class="container"> 
        <v-select  
                v-model="value" 
                :options="weakSpotList" 
                label="inGameName"
                placeholder="Select weakspot"
                :clearable="false"
        />
    </div>
</div>
</template>

<script>
import { targetData } from '../data'
import { selectedHSValue, selectedTarget, selectedWeakspotValue } from '../store'
export default {
    data() {
        return {
            HSValue: 0,
            selectedHSValue,
            selectedTarget,
            selectedWeakspotValue,
            targetData,
            weakSpotList: [],
            value: ''
        }
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
                if (selectedTarget.selected != 'PlayerDefault') this.getWeakspotList(targetData[selectedTarget.selected]['damageAreas'])
                this.value = ''
            }
        },
        value : {
            deep: true,
            handler() {
                selectedWeakspotValue.changeValue(this.value.value)
            }
        }
    }

}

</script>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 8.9fr 1fr;
    gap: var(--space-md);
}

.container-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
}
</style>