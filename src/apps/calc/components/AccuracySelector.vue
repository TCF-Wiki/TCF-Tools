<template>
<div class="container">
    <h2> Weakspot Percentage: {{ HSValue }}% </h2>
    <input type="range" min="0" max="100" 
        v-model="HSValue" 
        @input="selectedHSValue.changeValue(HSValue)"
    > 
    <div v-if="selectedTarget.selected !== 'PlayerDefault'"> 
        <h2> Weakspot to hit</h2>
        <div> 
            <input 
                :value="true"
                checked
                type="radio" 
                class="radioButton default"
                :name="selectedTarget.selected + '-weakspotRadios'" 
                key="'none'" :id="selectedTarget.selected+'none'" 
                @input="selectedWeakspotValue.changeValue(1)"
                ><label :for="selectedTarget.selected+'none'">None (1×)</label>
        </div>
        <div v-for="value, key in getWeakspotList(targetData[selectedTarget.selected]['damageAreas'])">
                <input 
                type="radio" 
                class="radioButton"
                :name="selectedTarget.selected + '-weakspotRadios'" 
                :key="key" :id="selectedTarget.selected+key" 
                @input="selectedWeakspotValue.changeValue(getWeakspotValue(value))"
                ><label :for="selectedTarget.selected+key">{{ key }} ({{ getWeakspotValue(value) }}×)</label>
        </div>
    </div> 
</div>
</template>

<script>
import { onKeyUp } from '@vueuse/core'
import { targetData } from '../data'
import { selectedHSValue, selectedTarget, selectedWeakspotValue } from '../store'
export default {
    data() {
        return {
            HSValue: 0,
            selectedHSValue,
            selectedTarget,
            selectedWeakspotValue,
            targetData
        }
    },
    methods: {
        getWeakspotList(data) {
            // this is to delete duplicate weakspots which have similar names
            let output = {}
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

                output[realKey] = data[key]
            }
            return output
        },
        getWeakspotValue(value) {
            let weakSpotMultiplier = targetData[selectedTarget.selected]['weakSpotMultiplier']

            if (value == 1) return 1 * weakSpotMultiplier
            return value
        }
    },
    watch: {
        selectedTarget : {
            deep: true,
            handler() {
                const els = document.querySelectorAll('.container .radioButton')
                if (!els) return
                for (let el in els) {
                    if (els[el].checked) {
                        els[el].checked = false
                    }
                }
            }
        }
    }

}

</script>

<style scoped>
h2 {
    line-height: 1;
    border-bottom: 1px solid var(--border-color-base);
    margin-bottom: var(--space-sm)
}

.container {
 display: flex;
 flex-direction: column;
}

label {
    cursor: pointer;
}
</style>