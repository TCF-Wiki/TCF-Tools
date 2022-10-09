<template>
    <div class="itemImg"  
    @click.right.prevent="outputItems.remove(Object.keys(outputItems.get())[item])"
    >
        <img class="bg-image" v-if="Object.keys(outputItems.get())[item]" src="forge-images/Item_BG.png"> 
        <img class="hover-image" src="forge-images/Button_Hover.png">
        <div class="contents" v-if="outputItems.get()[Object.keys(outputItems.get())[item]]">
            <img  :src="'map-images/item-images/' + imageNamer()" />
            <span class="amount">{{ outputItems.get()[Object.keys(outputItems.get())[item]]['amount']}} </span>
            <div class="hover-information">
                <ItemCard :data="outputItems.get()[Object.keys(outputItems.get())[item]]">
                </ItemCard>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import { outputItems } from '../store';
import ItemCard from './ItemCard.vue'
import { itemData, shieldData, helmetData, backpackData } from '../data';


export default defineComponent({
    props: ['item'],
    components: {
        ItemCard
    },
    data() {
        return {
            outputItems
        }
    },
    methods: {
        imageNamer(){
            let codeName = Object.keys(outputItems.get())[this.item]

            if (codeName.includes('Shield_')) return `${shieldData[codeName]['ingamename'].replaceAll(" ", "_")}.png`
            if (codeName.includes('Helmet_')) return `${helmetData[codeName]['ingamename'].replaceAll(" ", "_")}.png`
            if (codeName.includes('Bag_')) return `${backpackData[codeName]['ingamename'].replaceAll(" ", "_")}.png`
            else return `${itemData[codeName]['ingamename'].replaceAll(" ", "_")}.png`
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
    cursor: pointer;
}

.bg-image {
    position: absolute;
    transform: scale(1.05) translateY(-10%);
    transition: all .1s ease-out;
    animation: pulse 5s infinite;
}

.itemImg:hover .bg-image {
    filter:brightness(500%);
    transform: scale(1.07) translateY(-10%)
}

.itemImg:hover .hover-image {
    opacity: 1;
}
.hover-image {
    position: absolute;
    opacity: 0;
    transition: all .2s ease-in-out;
    transform: scale(1.85) translateY(-20%) translateX(.5%);
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
    translate: 0 3px;
    font-size: 1rem;
}
</style>
