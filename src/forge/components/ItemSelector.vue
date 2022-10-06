<template>
<details>
    <summary>  
        <div class="container"> 
            <div>
                <h2> Ingot Items</h2>
            </div>

            <div>
                <h2> Gear Items </h2>
            </div>

            <div>
                <h2> Recipe Items </h2>
            </div>

            <div>
                <h2> Special Items </h2>
            </div>
        </div>   
    </summary>

        <div class="container">
            <div>
                <p v-for="item, index in sortedItemList.ingots" @click="selectedItems.add(item)" role="button" class="selector">
                    <img class="item-icon" width="24" :alt="index.toString()" :src="'map-images/item-images/' + index.toString().split(' ').join('_') + '.png'">
                    {{ index }} 
                </p>
            </div>
            <div>
                <p v-for="item, index in sortedItemList.gear" @click="selectedItems.add(item)" role="button" class="selector">
                    <img class="item-icon" width="24" :alt="index.toString()" :src="'map-images/item-images/' + index.toString().split(' ').join('_') + '.png'">
                    {{ index }}
                </p>
            </div>
            <div>
                <p v-for="item, index in sortedItemList.perkRecipes" @click="selectedItems.add(item)" role="button" class="selector">
                    <img class="item-icon" width="24" :alt="index.toString()" :src="'map-images/item-images/' + index.toString().split(' ').join('_') + '.png'">
                    {{ index }}
                </p>
            </div>
            <div>
                <p v-for="item, index in sortedItemList.special" @click="selectedItems.add(item)" aria-role="button" class="selector">
                    <img class="item-icon" width="24" :alt="index.toString()" :src="'map-images/item-images/' + index.toString().split(' ').join('_') + '.png'">
                    {{ index }} 
                </p>

            </div>
        </div>

</details>

{{ selectedItems }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { validItems } from '../ValidItems'
import { selectedItems } from '../store';
import { helmetData, shieldData, backpackData, itemData } from '../data';
export default defineComponent({
    data() {
        return {
            validItems: validItems,
            helmetData: helmetData,
            shieldData: shieldData,
            backpackData: backpackData,
            itemData: itemData,
            unsortedItemList: {} as any,
            sortedItemList: {} as any,
            selectedItems
        }
    },
    mounted() {
        for (let type in validItems) {
            this.unsortedItemList[type] = {}

            let currentType = validItems[type]
            for (let item in currentType) {
                
                let realName : string;
                if (currentType[item].includes('Shield_')) realName = shieldData[currentType[item]]['ingamename']
                else if (currentType[item].includes('Helmet_')) realName = helmetData[currentType[item]]['ingamename']
                else if (currentType[item].includes('Bag_')) realName = backpackData[currentType[item]]['ingamename']
                else realName = itemData[currentType[item]]['ingamename']

                if (realName) this.unsortedItemList[type][realName] = currentType[item]
            }
        }

        for (let type in this.unsortedItemList) {
            this.sortedItemList[type] = Object.keys(this.unsortedItemList[type]).sort().reduce(
                (obj, key) => { 
                    // @ts-ignore
                    obj[key] = this.unsortedItemList[type][key]; 
                    return obj;
                }, 
            {});
        }
    }
})

</script>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
}

.selector {
    cursor: pointer;
}

details {
    width: 80%;
}
p {
    width: 80%;
    transition: background-color .2s ease-in-out;
}
p:hover {
  background-color: var(--background-button-color);
}
.item-icon {
    display: inline-block;
    translate: 0 7px;
}
</style>