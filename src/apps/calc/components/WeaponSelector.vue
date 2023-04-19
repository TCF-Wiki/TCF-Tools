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
import { getWeaponList } from "../utils";
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
        this.sortedData = getWeaponList()
    },
    watch: {
        selected : {
            deep: true,
            handler() {
                selectedWeapons.set(this.selected)
            }
        },
        selectedWeapons: {
            deep: true,
            handler() {
                this.selected = selectedWeapons.list
            }
        },
        weaponData: {
            deep: true,
            handler() {
                this.sortedData = getWeaponList()
            }
        }
    }
};
</script>
