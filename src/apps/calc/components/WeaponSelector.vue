<template>
    <div class="container" @input="updateSelected">
        <v-select 
            multiple 
            v-model="selected" 
            :options="sortedData" 
            :reduce="sortedData => sortedData.codeName" 
            label="inGameName"
            placeholder="Select a weapon"
        />
    </div>
</template>

<script>
import {weaponData as wepData} from "../data";
import {selectedWeapons} from "../store";
export default {
    name: "WeaponSelector",
    data() {
        return {
            weaponData: wepData,
            sortedData: [],
            selectedWeapons,
            selected: ['WP_D_AR_Bullet_01','WP_G_Sniper_Energy_01']
        };
    },
    mounted() {
        // Filter out weapons from our data we not show
        let filtered = [];
        for (const [k, v] of Object.entries(this.weaponData)) {
            if (!v) continue;
            if (!v["tags"] || v["tags"].length == 0 || v["tags"][0] === "Tools") continue;
            if (v["inGameName"] == "HAZE" || v["inGameName"] == "KARLA" || v["inGameName"] == "FF4 Detonator") continue;
            filtered.push(k);
        }

        // sort our array of items alphabetically
        let sorted = [];
        for (const weapon in filtered) {
            const wData = this.weaponData[filtered[weapon]];
            if (wData == undefined) continue;
            let pushedData = {inGameName: wData["inGameName"], codeName: filtered[weapon]};
            sorted.push(pushedData);
        }
        // thanks to https://stackoverflow.com/a/1129270
        sorted.sort((a,b) => (a.inGameName > b.inGameName) ? 1 : ((b.inGameName > a.inGameName) ? -1 : 0));
        // put our sorted names of items into our data
        this.sortedData = sorted;
    },
    watch: {
        selected : {
            deep: true,
            handler() {
                selectedWeapons.set(this.selected)
            }
        }
    }
};
</script>
