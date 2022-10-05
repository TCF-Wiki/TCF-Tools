<template>
    <div class="container">
        <img aria-label="The Forge" id="forge" src="/forge-images/The_Forge_UI.png" />
        <div class="input">
            <div class="item" id="input-1">
                <InputImage item="0" />
            </div>
            <div class="item" id="input-2">
                <InputImage item="1" />
            </div>
            <div class="item" id="input-3">
                <InputImage item="2" />
            </div>
            <div class="item" id="input-4">
                <InputImage item="3" />
            </div>
            <div class="item" id="input-5">
                <InputImage item="4" />
            </div>
        </div>
        <div id="center">
            <ForgeButton item="center" />
        </div>
        <div class="output">
            <div class="item" id="output-1">
                <OutputImage item="0" />
            </div>
            <div class="item" id="output-2">
                <OutputImage item="1" />
            </div>
            <div class="item" id="output-3">
                <OutputImage item="2" />
            </div>
            <div class="item" id="output-4">
                <OutputImage item="3" />
            </div>
            <div class="item" id="output-5">
                <OutputImage item="4" />
            </div>
        </div>
    </div>
    <ItemSelector />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import InputImage from './InputImage.vue';
import OutputImage from './OutputImage.vue';
import ItemSelector from './ItemSelector.vue'
import ForgeButton from './ForgeButton.vue';

export default defineComponent({
    components: {
    InputImage,
    OutputImage,
    ItemSelector,
    ForgeButton
},
});
</script>

<style scoped>
.container {
    position: relative;
    width: 50%;
    height: 50%;
}
#forge {
    width: 100%;
}

.input {
    position: absolute;
    top: 0;
    width: 100%;
    height: 50%;
}
#input-1 {
    left: 12%;
    top: 44%;
}
#input-2 {
    left: 28.25%;
    top: 40%;
}
#input-3 {
    left: 44.5%;
    top: 37.5%;
}
#input-4 {
    left: 61%;
    top: 40%;
}
#input-5 {
    left: 77.1%;
    top: 44%;
}

#center {
    position: absolute;
    width: 16%;
    height: 17.5%;
    top: 40%;
    left: 41.75%;
}

.output {
    position: absolute;
    top: 50%;
    width: 100%;
    height: 50%;
}
#output-1 {
    left: 12%;
    top: 31.5%;
}
#output-2 {
    left: 28.25%;
    top: 35%;
}
#output-3 {
    left: 44.5%;
    top: 38%;
}
#output-4 {
    left: 61%;
    top: 35%;
}
#output-5 {
    left: 77.1%;
    top: 31.5%;
}

.item {
    position: absolute;
    width: 10%;
    height: 22%;
}
</style>
