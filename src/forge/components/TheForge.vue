<template>
<ItemSelector />

<div class="container">
    <img aria-label="The Forge"
        id="forge"
        src="/forge-images/The_Forge_UI.png"
    >
    <div class="input">
        <div id="item-1"> 
            <InputImage 
            item="First Image"
            />
        </div>
        <div id="item-2"> 
            <InputImage 
            item="Second"
            />
        </div>
        <div id="item-3"> 
            <InputImage 
            item="Third"
            />
        </div>
        <div id="item-4"> 
            <InputImage 
            item="Fourth"
            />
        </div>
        <div id="item-5"> 
            <InputImage 
            item="Fifth"
            />
        </div>
    </div>
    <div class="output">


    </div>


</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputImage from './InputImage.vue';
import ItemSelector from './ItemSelector.vue'

import { getIngotItems } from '../ValidItems';
getIngotItems()
export default defineComponent({
    components: {
        InputImage,
        ItemSelector
    }
})
</script>

<style scoped>
.container {
    position: relative;
    width: 50%;
    height: 50%;
}
#forge {
    width: 100%
}

#item-1 {
    position: absolute;
    left: 10.1%;
    top: 19.7%
}

#item-2 {
    position: absolute;
    left: 26.8%;
    top: 18.4%
}

#item-3 {
    position: absolute;
    left: 43%;
    top: 17%;
}

#item-4 {
    position: absolute;
    left: 59.6%;
    top: 18.3%
}

#item-5 {
    position: absolute;
    left: 75.6%;
    top: 20%
}

.input div {
    width: 6rem;
    height: 6rem;
    display: block;
}
</style>