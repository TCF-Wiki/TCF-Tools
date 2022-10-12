<template>
<details>
    <summary>  
        <div class="container"> 
            <div class="itemTitle-Container">
                <h2> Ingot Items</h2>
            </div>

            <div class="itemTitle-Container">
                <h2> Ingots </h2>
            </div>

            <div class="itemTitle-Container">
                <h2> Gear Items </h2>
            </div>

            <div class="itemTitle-Container">
                <h2> Recipe Items </h2>
            </div>

            <div class="itemTitle-Container">
                <h2> Special Items </h2>
            </div>

            <div class="itemTitle-Container">
                <h2> Matching Recipes </h2>
            </div>
        </div>   
    </summary>

        <div class="container">
            <div>
                <p v-for="item, index in sortedItemList.ingots" @click="selectedItems.add(item)" role="button" class="selector">
                    <img class="item-icon" width="24" :alt="index.toString()" :src="'map-images/item-images/' + index.toString().split(' ').join('_') + '.png'">
                    <span class="item-name">{{ index }}</span>
                </p>
            </div>
            <div>
                <p v-for="item, index in sortedItemList.catalyst" @click="selectedItems.add(item)" role="button" class="selector">
                    <img class="item-icon" width="24" :alt="index.toString()" :src="'map-images/item-images/' + index.toString().split(' ').join('_') + '.png'">
                    <span class="item-name">{{ index }}</span>
                </p>
            </div>
            <div>
                <p v-for="item, index in sortedItemList.gear" @click="selectedItems.add(item)" role="button" class="selector">
                    <img class="item-icon" width="24" :alt="index.toString()" :src="'map-images/item-images/' + index.toString().split(' ').join('_') + '.png'">
                    <span class="item-name">{{ index }}</span>
                </p>
            </div>
            <div>
                <p v-for="item, index in sortedItemList.perkRecipes" @click="selectedItems.add(item)" role="button" class="selector">
                    <img class="item-icon" width="24" :alt="index.toString()" :src="'map-images/item-images/' + index.toString().split(' ').join('_') + '.png'">
                    <span class="item-name">{{ index }}</span>
                </p>
            </div>
            <div>
                <p v-for="item, index in sortedItemList.special" @click="selectedItems.add(item)" aria-role="button" class="selector">
                    <img class="item-icon" width="24" :alt="index.toString()" :src="'map-images/item-images/' + index.toString().split(' ').join('_') + '.png'">
                    <span class="item-name">{{ index }}</span>
                </p>
            </div>

            <div>
                <RecipeList />
            </div>
        </div>

</details>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { validItems } from '../ValidItems'
import { selectedItems } from '../store';
import { helmetData, shieldData, backpackData, itemData } from '../data';
import RecipeList from './RecipeList.vue';
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
        };
    },
    mounted() {
        for (let type in validItems) {
            this.unsortedItemList[type] = {};
            let currentType = validItems[type];
            for (let item in currentType) {
                let realName: string;
                if (currentType[item].includes("Shield_"))
                    realName = shieldData[currentType[item]]["ingamename"];
                else if (currentType[item].includes("Helmet_"))
                    realName = helmetData[currentType[item]]["ingamename"];
                else if (currentType[item].includes("Bag_"))
                    realName = backpackData[currentType[item]]["ingamename"];
                else
                    realName = itemData[currentType[item]]["ingamename"];
                if (realName)
                    this.unsortedItemList[type][realName] = currentType[item];
            }
        }
        for (let type in this.unsortedItemList) {
            this.sortedItemList[type] = Object.keys(this.unsortedItemList[type]).sort().reduce((obj, key) => {
                // @ts-ignore
                obj[key] = this.unsortedItemList[type][key];
                return obj;
            }, {});
        }
    },
    components: { RecipeList }
})

</script>

<style scoped>
.container {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
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

@media screen and (max-width: 1100px) {

    details {
        width: 100%;
    }

    summary {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .selector {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .itemTitle-Container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .itemTitle-Container h2 {
        text-align: center;
        font-size: 1.2rem;
    }

    .item-name {
        display: none;
    }
    
    .item-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: .25rem;
    }
}
</style>