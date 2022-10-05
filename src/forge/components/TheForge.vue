<template>
    <div class="container">
        <img aria-label="The Forge" id="forge" src="/forge-images/The_Forge_UI.png" />
        <div class="input">
            <div class="item" id="input-1">
                <InputImage item="First" />
            </div>
            <div class="item" id="input-2">
                <InputImage item="Second" />
            </div>
            <div class="item" id="input-3">
                <InputImage item="Third" />
            </div>
            <div class="item" id="input-4">
                <InputImage item="Fourth" />
            </div>
            <div class="item" id="input-5">
                <InputImage item="Fifth" />
            </div>
        </div>
        <div id="center">
            <InputImage item="center" />
        </div>
        <div class="output">
            <div class="item" id="output-1">
                <InputImage item="First" />
            </div>
            <div class="item" id="output-2">
                <InputImage item="Second" />
            </div>
            <div class="item" id="output-3">
                <InputImage item="Third" />
            </div>
            <div class="item" id="output-4">
                <InputImage item="Fourth" />
            </div>
            <div class="item" id="output-5">
                <InputImage item="Fifth" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import InputImage from './InputImage.vue';
export default defineComponent({
    components: {
        InputImage,
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
