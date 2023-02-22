<template>
    <div class="card">
        <div class="card-contents" v-if="data">
            <div v-if="data['perkInfo']">Altered {{ rarities[data["rarity"]] }} {{ data["type"] }}</div>
            <div v-if="data['perkInfo']">
                <p v-for="perk in data['perkInfo']">
                    {{ data['perkInfo']["strength"] }}
                    {{ perkData[perk["perk"]]["description"] }}
                </p>
            </div>

            <div v-if="!data['perkInfo']">
                {{ itemNamer() }}
            </div>
        </div>
        <div class="card-contents" v-if="!data">
            {{ itemNamer() }}
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {perkData, shieldData, helmetData, backpackData, itemData} from "../data";
import {reversedRarityMap} from "../ForgeLogic";

export default defineComponent({
    props: ["data", "name"],
    data() {
        return {
            rarities: reversedRarityMap,
            perkData: perkData,
            shieldData: shieldData,
            helmetData: helmetData,
            backpackData: backpackData,
            itemData: itemData,
        };
    },
    methods: {
        itemNamer() {
            let realName: any;

            if (this.name.includes("Shield_")) realName = this.shieldData[this.name]["inGameName"];
            else if (this.name.includes("Helmet_")) realName = this.helmetData[this.name]["inGameName"];
            else if (this.name.includes("Bag_")) realName = this.backpackData[this.name]["inGameName"];
            else realName = this.itemData[this.name]["inGameName"];

            return realName;
        },
    },
});
</script>

<style scoped>
.card {
    width: 100%;
    height: 100%;
}

.card-contents {
    display: grid;
    grid-template-rows: 1fr;
    gap: 0.3em;
}

.card-contents div {
    white-space: none;
}
</style>
