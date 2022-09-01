<template>
    <div class="container">
        <button class="button" type="button" @click.prevent="showWeaponModal = true"> Select Weapons </button>
        <p> Selected: <span v-for="weapon in selectedWeapons.list"> {{ weaponData[weapon]['inGameName'] }}<br></span> </p>
    </div>
    <section class="selection-list" v-show="showWeaponModal">
        <button class="close" @click.prevent="showWeaponModal = false"> &times; </button>
        <h2> Weapon Selector </h2>
        <div class="weapon-container">
            <div v-for="weapon in sortedData" class="weapon-selector" :class="{active: selectedWeapons.list.includes(weapon[1])}" @click="selectedWeapons.toggleSelected(weapon[1])">
                <img :src=" 'calc-images/' + weapon[0] + '.png' " class="weapon-image" > 
                <span> {{ weapon[0] }} </span> 
            </div>
        </div>
    </section>
    <div class="background" v-show="showWeaponModal" @click.prevent="showWeaponModal = false"> </div>


</template>

<script>
import { weaponData as wepData } from '../data';
import { selectedWeapons } from '../store';
export default {
    name: "WeaponSelector",
    data() {
        return {
            weaponData: wepData,
            sortedData: [],
            selectedWeapons,
            showWeaponModal: false,
        }
    },
    mounted() {
        // Filter out weapons from our data we not show
        let filtered = [];
        for (const [k, v] of Object.entries(this.weaponData)) {
            if (!v) continue
            if (!v['tags'] || v['tags'].length == 0 || v['tags'][0] === 'Tools' || k.includes('scrappy') ) continue
            if (v['inGameName'] == 'HAZE' || v['inGameName'] == 'KARLA' || v['inGameName'] == 'FF4 Detonator') continue
            filtered.push(k)
        }

        // sort our array of items alphabetically
        let sorted = [];
        for (const weapon in filtered) {
            const wData = this.weaponData[filtered[weapon]]  
            if (wData == undefined) continue
            let pushedData = [ wData['inGameName'], filtered[weapon] ]
            sorted.push(pushedData)
        }
        sorted.sort()
        // put our sorted names of items into our data
        this.sortedData = sorted
    },
};
</script>

<style scoped>

.weapon-image {
    width: 10em
}

.weapon-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr
}


.weapon-selector {
    margin: .2em;
    text-align: center;
    border: 2px solid var(--tertairy);
}

.weapon-selector:hover .weapon-image {
    transform: scale(1.05);
}

.container {
    display: flex;
    flex-direction: column;
    gap: 1rem
}
</style>