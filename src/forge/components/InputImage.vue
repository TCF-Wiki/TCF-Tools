<template>
    <div class="itemImg" @click="selectedItems.remove(Object.keys(selectedItems.get())[item])"
    aria-label="Input item. Click to remove."
    role="button">
        <img class="bg-image" v-if="Object.keys(selectedItems.get())[item]" src="forge-images/Item_BG.png"> 
        <img class="hover-image" src="forge-images/Button_Hover.png">
        <div class="contents">
            <img v-if="Object.keys(selectedItems.get())[item]" :src="'map-images/item-images/' + imageNamer()" />
            {{ selectedItems.get()[Object.keys(selectedItems.get())[item]]}}
        </div>
    </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import { selectedItems } from '../store';
import { itemData, shieldData, helmetData, backpackData } from '../data';
export default defineComponent({
    props: ['item'],
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
</style>
