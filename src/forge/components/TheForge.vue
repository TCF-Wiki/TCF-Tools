<template>
    <div class="container" id="forge-container" @contextmenu="false">
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
        <div id="bottom">
            <div class="item">
                <ClearButton />
            </div>
        </div>
    </div>
    <p> See all recipes you can use at the <a href="https://thecyclefrontier.wiki/wiki/The_Forge">Official Wiki</a>. Right click an item to remove it.</p>
    <p> Output items are cleared upon forging to prevent confusion on what a forge resulted in. </p>
    <p> Consume input items? <ConsumeInputToggle /> </p>
    <ItemSelector />

    <div class="container">
        <header> 
            <h2> Information </h2> 
        </header>
        <p> This site simulates The Forge as best as possible. It includes all gear recipes. It also has random chances for each perk. </p>
            
        <p> It assumes that the chances for each perk / output item is equally likely. </p>
        <p> The following edge case is not handled properly: </p>
        <p class="indent"> In the game, if you want to perks that use the same item, you have to put each set of item in different slots. The simulator does not require them to be in the same slot. </p>

    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import InputImage from './InputImage.vue';
import OutputImage from './OutputImage.vue';
import ItemSelector from './ItemSelector.vue'
import ForgeButton from './ForgeButton.vue';
import ClearButton from './ClearButton.vue';
import ConsumeInputToggle from './ConsumeInputToggle.vue'


export default defineComponent({
    components: {
        InputImage,
        OutputImage,
        ItemSelector,
        ForgeButton,
        ClearButton,
        ConsumeInputToggle
    },
    mounted() {
        const el = document.getElementById('forge-container')
        el!.oncontextmenu = function() { return false; }
    }
});
</script>

<style scoped>
.container {
    position: relative;
    width: 50%;
    height: 50%;
    user-select: none;
}

.container * {
    user-select: none;
}
#forge {
    width: 100%;
    user-select: none;
}

.input {
    position: absolute;
    top: 0;
    width: 100%;
    height: 50%;
}
#input-1 {
    left: 12%;
    top: 41.5%;
}
#input-2 {
    left: 28.25%;
    top: 38%;
}
#input-3 {
    left: 44.5%;
    top: 35.5%;
}
#input-4 {
    left: 61%;
    top: 38%;
}
#input-5 {
    left: 77.1%;
    top: 42%;
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

#bottom {
    position: absolute;
    width: 100%;
    height: 10%;
    bottom: 0;
    left: 0;
}

#bottom .item {
    left: 44.7%;
    top: -26%
}

.item {
    position: absolute;
    width: 10%;
    height: 22%;
}

p {
    margin: .15rem 0;
}


p:first-of-type {
    margin-top: .5rem
}
.indent {
    padding-left: 1rem
}


/* mobile styling starts here */

@media screen and (max-width: 1100px) {
    .container {
        height: 100%;
        width: 100%;
    }
}
</style>
