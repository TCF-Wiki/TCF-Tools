<template>
    <div class="itemImg" @click="selectedItems.remove(Object.keys(selectedItems.get())[item])"
    aria-label="Input item. Click to remove."
    role="button">
        <div class="contents">
            <img v-if="Object.keys(selectedItems.get())[item]" :src='`map-images/item-images/${itemData[Object.keys(selectedItems.get())[item]]["ingamename"].replaceAll(" ","_")}.png`' />
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
    box-shadow: 0px 0px 0px 2px rgb(211, 74, 226);
    transition: box-shadow .1s ease-out
}

.itemImg:hover {
    box-shadow: 0px 0px 0px 5px rgb(211, 74, 226);
}

.contents {
    display: flex;
    flex-direction: column;
    gap: .2em;
    height: 100%;
    width: 100%;
}

.contents img {
    transform: scale(.9);
}
</style>
