<template>
    <div class="itemImg" @click.right.prevent="selectedItems.remove(Object.keys(selectedItems.get())[item])"
    aria-label="Input item. Right click to remove."
    role="button">
        <img class="bg-image" v-if="Object.keys(selectedItems.get())[item]" src="forge-images/Item_BG.png"> 
        <img class="hover-image" src="forge-images/Button_Hover.png">
        <div class="contents" v-if="Object.keys(selectedItems.get())[item]">
            <img :src="'map-images/item-images/' + imageNamer()" />
            <span class="amount">{{ selectedItems.get()[Object.keys(selectedItems.get())[item]]}} </span>
            <div class="hover-information">
                <ItemCard :name="Object.keys(selectedItems.get())[item]">
                </ItemCard>
            </div>
        </div>
        <div class="mobileItemRemove-Button" @click="selectedItems.remove(Object.keys(selectedItems.get())[item])"
        role="button">&times;</div>
    </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import { selectedItems } from '../store';
import { itemData, shieldData, helmetData, backpackData } from '../data';
import ItemCard from './ItemCard.vue'
export default defineComponent({
    props: ['item'],
    components: {
        ItemCard
    },
    methods: {
        imageNamer(){
           const codeName = Object.keys(selectedItems.get())[this.item]

            if (codeName.includes('Shield_')) return `${shieldData[codeName]['ingamename'].replaceAll(" ", "_")}.png`
            if (codeName.includes('Helmet_')) return `${helmetData[codeName]['ingamename'].replaceAll(" ", "_")}.png`
            if (codeName.includes('Bag_')) return `${backpackData[codeName]['ingamename'].replaceAll(" ", "_")}.png`
            else return `${itemData[codeName]['ingamename'].replaceAll(" ", "_")}.png`
        }
    },
    data() {
        return {
            selectedItems,
            itemData: itemData,
            shieldData: shieldData,
            helmetData: helmetData,
            backpackData: backpackData,
        }
    }
});
</script>
<style scoped>
.itemImg {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    text-align: center;
    transition: all .1s ease-out;
    cursor: pointer;
}

.contents {
    display: flex;
    flex-direction: column;
    gap: .1em;
    height: 100%;
    width: 100%;
}

.contents img {
    transform: scale(.8);
    translate: 0 4px;
}

.bg-image {
    position: absolute;
    transform: scale(1.1);
    transition: all .1s ease-out;
    animation: pulse 5s infinite;
}

.itemImg:hover .bg-image {
    filter:brightness(500%);
    transform: scale(1.11)
}

.itemImg:hover .hover-image {
    opacity: 1;
}
.hover-image {
    position: absolute;
    opacity: 0;
    transition: all .2s ease-in-out;
    transform: scale(1.85) translateY(-10%) translateX(.5%);
}

.hover-information {
    position: absolute;
    z-index: 1;
    opacity: 0;
    translate: -33% 60px;
    margin: auto;
    width: 300%;
    padding: 1em;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
    border-radius: 3px;


    transition: opacity .2s ease-in-out;
}

.itemImg:hover .hover-information {
    opacity: 1;
}

.amount {
    z-index: 1;
    translate: 0 8px;
    font-size: 1rem;
}

.mobileItemRemove-Button {
    display: none;
}

@media screen and (max-width: 900px) {
    .mobileItemRemove-Button {
        position: absolute;
        display: flex;
        top: -2rem;
        right: .7rem;
        color: lightcoral;
        font-size: 1.3rem;
    }
}
</style>
