<template>
    <div class="container" @input="updateSelected">
        <v-select  
            v-model="selected" 
            :options="sortedData" 
            :reduce="sortedData => sortedData.codeName" 
            label="inGameName"
            placeholder="Select armor"
            :clearable="false"
        />
    </div>
</template>


<script>
import {armorData} from "../data";
import {selectedArmor} from "../store";
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
            selected: 'Shield_01'
        };
    },
    watch: {
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