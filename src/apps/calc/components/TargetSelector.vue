<template>
    <div class="container" @input="updateSelected">
        <v-select  
            v-model="selected" 
            :options="sortedData" 
            :reduce="sortedData => sortedData.codeName" 
            label="inGameName"
            placeholder="Select target"
            :clearable="false"
        />
    </div>
</template>

<script>
import { targetData } from '../data';
import { selectedTarget } from '../store';
import { creatureNames } from '../utils'
export default {
    name: "TargetSelector",
    data() {
        return {
            targetData: targetData,
            selectedTarget,
            creatureNames: creatureNames,
            selected: 'PlayerDefault',
            sortedData: []
        }
    },
    mounted() {
        let sorted = []
        for (let creature in this.targetData) {
            sorted.push({inGameName: creatureNames[creature], codeName: creature})
        }
        this.sortedData = sorted
    },
    watch: {
        selected : {
            deep: true,
            handler() {
                selectedTarget.changeSelected(this.selected)
            }
        }
    }
};
</script>

