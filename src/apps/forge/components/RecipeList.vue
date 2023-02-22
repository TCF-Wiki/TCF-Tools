<template>
    <div>
        <div v-if="special.length > 0">
            <p>
                <img width="24" class="item-icon" :src="'map-images/item-images/' + itemData[special[0]]['inGameName'].replaceAll(' ', '_') + '.png'" />
                {{ special[1] }}
            </p>
        </div>

        <div v-if="ingots.length > 0">
            <p v-for="(item, index) in ingots">
                <img width="24" class="item-icon" :src="'map-images/item-images/' + itemData[item[0]]['inGameName'].replaceAll(' ', '_') + '.png'" />

                {{ item[1] }}
            </p>
        </div>

        <div v-if="perks[0].length > 0">
            <p v-for="(perk, index) in perks[0]">
                <img width="24" class="item-icon" :src="'map-images/item-images/' + itemData[perks[1][index]]['inGameName'].replaceAll(' ', '_') + '.png'" />
                {{ perkData[perk]["description"] }}
            </p>
        </div>

        <div v-if="catalyst.length > 0">
            <p v-for="(item, index) in catalyst">
                <img width="24" class="item-icon" :src="'map-images/item-images/' + itemData[item[0]]['inGameName'].replaceAll(' ', '_') + '.png'" />

                {{ item[1] }}
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {ingotData, itemData, perkData} from "../data";
import {perksByType} from "../ForgeConstants";
import {getMatchingPerks} from "../ForgeLogic";
import {selectedItems} from "../store";
import {validItems} from "../ValidItems";
export default defineComponent({
    data() {
        return {
            perks: [[]] as string[][],
            special: [] as string[],
            catalyst: [] as string[][],
            ingots: [] as string[][],
            selectedItems,
            validItems: validItems,
            perkData: perkData,
            itemData: itemData,
        };
    },
    watch: {
        selectedItems: {
            deep: true,
            handler() {
                const inputItems = Object.keys(selectedItems.get());

                this.ingots = [];
                this.catalyst = [];

                inputItems.forEach((input) => {
                    validItems.gear.forEach((item: string) => {
                        if (input === item) {
                            if (input.includes("Bag_")) this.perks = getMatchingPerks(perksByType["Bag"]);
                            else if (input.includes("Helmet_")) this.perks = getMatchingPerks(perksByType["Helmet"]);
                            else if (input.includes("Shield_")) this.perks = getMatchingPerks(perksByType["Shield"]);
                            else return;
                        }
                    });

                    validItems.special.forEach((item: string) => {
                        if (input === item) this.special = [item, "Abyss Alloy Lottery"];
                    });

                    validItems.ingots.forEach((item: string) => {
                        // if it isn't a core shard
                        if (input === item && item !== "GlowingCrystalCoreShard") {
                            // check if it is used in the first recipe
                            if (Object.keys(ingotData["Recipe01"]["ingredients"]).includes(item)) {
                                // then add it to the output
                                this.ingots.push([item, "Forge Iron"]);
                            } else {
                                // otherwise, it is a pure forge recipe so add that to the output instead
                                this.ingots.push([item, "Pure Forge Iron"]);
                            }
                        } else if (input === item && item === "GlowingCrystalCoreShard") {
                            // otherwise, if the item is a core shard, add that information to the list for both
                            this.ingots.push([item, "Forge Iron"], [item, "Pure Forge Iron"]);
                        }
                        return;
                    });

                    validItems.catalyst.forEach((item: string) => {
                        if (input === item) {
                            if (item === "ForgeIronIngot") {
                                this.catalyst.push([item, "Gear Upgrade, Rare to Epic"]);
                            } else if (item === "ChargedForgeIronIngot") {
                                this.catalyst.push([item, "Gear Upgrade, Epic to Exotic"]);
                            } else if (item === "SuperChargedForgeIronIngot") {
                                this.catalyst.push([item, "Gear Upgrade, Exotic to Leg."]);
                            }
                        }
                    });
                });
            },
        },
    },
});
</script>

<style scoped>
.item-icon {
    display: inline-block;
    translate: 0 7px;
}
</style>
