<template>
    <section>
        <div class="container">
            <div>
                <div class="itemTitle-Container">
                    <h2>Ingot Items</h2>
                </div>

                <div class="grid-container">
                    <p v-for="(item, index) in sortedItemList.ingots" @click="selectedItems.add(item, index.toString().includes('Iron') ? 9 : 3)" role="button" class="selector" v-tooltip="index.toString()">
                        <img class="item-icon" width="24" :alt="index.toString()" :src="'map-images/item-images/' + index.toString().split(' ').join('_') + '.png'" />
                        <span class="item-name"> {{ rarityNamer(item) }} ({{ index.toString().includes("Iron") ? 9 : 3 }}) </span>
                    </p>
                </div>
            </div>

            <div>
                <div class="itemTitle-Container">
                    <h2>Gear Items</h2>
                </div>

                <div class="grid-container gear-container">
                    <p v-for="(item, index) in sortedItemList.gear" @click="selectedItems.add(item)" role="button" class="selector" v-tooltip="index.toString()">
                        <img class="item-icon" width="24" :alt="index.toString()" :src="'map-images/item-images/' + index.toString().split(' ').join('_') + '.png'" />
                        <span class="item-name"> {{ rarityNamer(item) }} </span>
                    </p>

                    <p v-for="(item, index) in sortedItemList.catalyst" @click="selectedItems.add(item, settingData['catalystAmount'])" role="button" class="selector" v-tooltip="index.toString()">
                        <img class="item-icon" width="24" :alt="index.toString()" :src="'map-images/item-images/' + index.toString().split(' ').join('_') + '.png'" />
                        <span class="item-name"> {{ rarityNamer(item) }} ({{ settingData["catalystAmount"] }}) </span>
                    </p>
                </div>
            </div>

            <div>
                <div class="itemTitle-Container">
                    <h2>Recipe Items</h2>
                </div>

                <div class="grid-container">
                    <p v-for="(item, index) in sortedItemList.perkRecipes" @click="selectedItems.add(item, amount(item))" role="button" class="selector" v-tooltip="index.toString()">
                        <img class="item-icon" width="24" :alt="index.toString()" :src="'map-images/item-images/' + index.toString().split(' ').join('_') + '.png'" />
                        <span class="item-name"> {{ rarityNamer(item) }} ({{ amount(item) }}) </span>
                    </p>
                </div>
            </div>

            <div>
                <div class="itemTitle-Container">
                    <h2>Special Items</h2>
                </div>

                <div class="grid-container centered-grid">
                    <p class="hidden"></p>
                    <p v-for="(item, index) in sortedItemList.special" @click="selectedItems.add(item)" aria-role="button" class="selector" v-tooltip="index.toString()">
                        <img class="item-icon" width="24" :alt="index.toString()" :src="'map-images/item-images/' + index.toString().split(' ').join('_') + '.png'" />
                        <span class="item-name"> {{ rarityNamer(item) }} </span>
                    </p>
                </div>
            </div>
            <div>
                <div class="itemTitle-Container">
                    <h2>Matching Recipes</h2>
                </div>

                <RecipeList />
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {validItems} from "../ValidItems";
import {selectedItems} from "../store";
import {helmetData, shieldData, backpackData, itemData, settingData} from "../data";
import RecipeList from "./RecipeList.vue";
export default defineComponent({
    data() {
        return {
            validItems: validItems,
            settingData: settingData,
            helmetData: helmetData,
            shieldData: shieldData,
            backpackData: backpackData,
            itemData: itemData,
            unsortedItemList: {} as any,
            sortedItemList: {} as any,
            selectedItems,
        };
    },
    mounted() {
        for (let type in validItems) {
            this.unsortedItemList[type] = {};
            let currentType = validItems[type];
            for (let item in currentType) {
                let realName: string;
                if (currentType[item].includes("Shield_")) realName = shieldData[currentType[item]]["inGameName"];
                else if (currentType[item].includes("Helmet_")) realName = helmetData[currentType[item]]["inGameName"];
                else if (currentType[item].includes("Bag_")) realName = backpackData[currentType[item]]["inGameName"];
                else realName = itemData[currentType[item]]["inGameName"];
                if (realName) this.unsortedItemList[type][realName] = currentType[item];
            }
        }
        for (let type in this.unsortedItemList) {
            this.sortedItemList[type] = Object.keys(this.unsortedItemList[type])
                .sort()
                .reduce((obj, key) => {
                    // @ts-ignore
                    obj[key] = this.unsortedItemList[type][key];
                    return obj;
                }, {});
        }
    },
    methods: {
        rarityNamer(item: string) {
            return itemData[item]["rarity"];
        },
        amount(item: string): number {
            const itemRarity = itemData[item]["rarity"];
            const amount = settingData["rarityAmount"][itemRarity];

            if (amount) return amount;
            return amount;
        },
    },
    components: {RecipeList},
});
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    margin: 0 2rem;
    gap: var(--space-xl);
}

.selector {
    cursor: pointer;
}

details {
    width: 100%;
}
p {
    width: 100%;
    transition: background-color 0.2s ease-in-out;
    user-select: none;
}
p:hover {
    background-color: var(--color-surface-1);
}
.item-icon {
    display: inline-block;
    translate: 0 7px;
}

.itemTitle-Container {
    text-align: center;
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
        margin-top: 0.25rem;
    }
}

.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.2rem;
    height: fit-content;
}

.hidden {
    opacity: 0;
    pointer-events: none;
}

.grid-container p {
    display: grid;
    grid-template-rows: 1fr;
    gap: 0.5rem;
    border: 1px solid var(--border-color-base);
    text-align: center;
    padding: var(--space-xs);
}

.item-name {
    font-size: 0.9rem;
    opacity: 0.8;
}
.grid-container p img {
    margin: auto;
    display: block;
    translate: 0;
}
</style>
