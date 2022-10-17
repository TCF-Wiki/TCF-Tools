<template>
<div v-if="list[0].length > 0">
    <p v-for="perk,index in list[0]">
        <img width="24" class="item-icon" :src="'map-images/item-images/' + itemData[list[1][index]]['ingamename'].replaceAll(' ','_') + '.png'">
        {{perkData[perk]['Description'] }}
    </p>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { itemData, perkData } from '../data';
import { perksByType } from '../ForgeConstants';
import { getMatchingPerks } from '../ForgeLogic';
import { selectedItems } from '../store'
import { validItems } from '../ValidItems';
export default defineComponent({
    data() {
        return {
            list: [[]] as string[][],
            selectedItems,
            validItems: validItems,
            perkData: perkData,
            itemData: itemData
        }
    },
    watch: {
        selectedItems : {
            deep: true,
            handler() {
                const inputItems = Object.keys(selectedItems.get())
                inputItems.forEach(input => {
                    validItems.gear.forEach((item: string) => {
                        if (input === item) {
                            if (input.includes("Bag_")) this.list = getMatchingPerks(perksByType['Bag'])
                            else if (input.includes("Helmet_")) this.list = getMatchingPerks(perksByType['Helmet'])
                            else if (input.includes("Shield_")) this.list = getMatchingPerks(perksByType['Shield'])
                            else return;
                        }
                    })
                })
            }
        }
    }
})
</script>

<style scoped>
.item-icon {
    display: inline-block;
    translate: 0 7px;
}
</style>