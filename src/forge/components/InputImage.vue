<template>
    <div class="itemImg">
        <div class="contents">
            <img v-if="Object.keys(selectedItems.get())[item]" :src='`map-images/item-images/${itemData[Object.keys(selectedItems.get())[item]]["ingamename"].replaceAll(" ","_")}.png`' />
            {{ selectedItems.get()[Object.keys(selectedItems.get())[item]]}}
        </div>
    </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import { selectedItems } from '../store';
import { itemData } from '../data';
export default defineComponent({
    props: ['item'],
    data() {
        return {
            selectedItems,
            itemData: itemData
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
    border: 2px solid transparent;
    transition: border-color .2s ease-in-out
}

.itemImg:hover {
    border-color: rgb(209, 98, 221);
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
