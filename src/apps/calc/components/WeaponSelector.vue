<template>
    <div class="container">
        <button class="" type="button" @click.prevent="isModalOpen = true"> 
            <img src="/calc-images/Weapon_Icon.png"> 
        </button>
    </div>
    <Teleport to="#modal">
        <Transition name="modal"> 
            <div class="modal__bg" v-if="isModalOpen">
                <section class="modal__content" ref="modal">  
                    <button @click="isModalOpen = false" class="modal__close-button" aria-label="Close Modal" type="button">x</button>
                    <div class="weapon-container">
                        <div v-for="weapon in sortedData" class="weapon-selector" :class="{active: selectedWeapons.list.includes(weapon[1])}" @click="selectedWeapons.toggleSelected(weapon[1])">
                            <img :src=" 'calc-images/' + weapon[0] + '.png' " class="weapon-image" > 
                            <span class="weapon-name"> {{ weapon[0] }} </span> 
                        </div>
                    </div>
                </section>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { ref } from 'vue'
/* @ts-ignore */
import { onClickOutside } from '@vueuse/core';

const isModalOpen = ref(false)
const modal = ref(null)
onClickOutside(modal, () => (isModalOpen.value = false))
    
const openModal = () => {
    isModalOpen.value = true

    const body = document.body
    
    body.style.pointerEvents = 'none'

    setTimeout( () => { body.style.pointerEvents = 'all'},600)
}
</script>

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
    width: 10rem;
    margin: auto;
}

.weapon-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr
}


@media screen  and (max-width: 900px){
    .weapon-image {
        display: none;
    }
    .weapon-name {
        font-size: .8rem;
    }
    .weapon-container {
        grid-template-columns: 1fr 1fr
    }
}
.weapon-selector {
    margin: .2em;
    text-align: center;
    border: 2px solid var(--tertairy);
}

.weapon-selector:hover .weapon-image {
    transform: scale(1.05);
}

.container button {
    width: 100%;
    height: 100%;
}

.container button img {
    filter: invert(1);
    width: 100%;
    margin-top: 25%;
    margin-bottom: 25%;
}
</style>