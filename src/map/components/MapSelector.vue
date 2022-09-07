<template>
<div>
    <h2> Map Selector </h2>
    <div class="map-selector"> 
        <div class="button-content" @click="selectedMap.changeSelected(1);">
            <p :class="selectedMap.map==1 ? 'selected-map' : 'not-selected-map' "> Bright Sands </p>
            <p> Map 1 </p>
        </div>
        <div class="button-content" @click="selectedMap.changeSelected(2)">
            <p :class="selectedMap.map==2 ? 'selected-map' : 'not-selected-map' "> Crescent Falls </p>
            <p> Map 2 </p>
        </div>
        <div class="button-content" @click="selectedMap.changeSelected(3)" >
            <p :class="selectedMap.map==3 ? 'selected-map' : 'not-selected-map' " class="disabled"> Tharis Island </p>
            <p> Map 3 </p>
        </div>
    </div>
</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { selectedMap } from '../store'
export default defineComponent({
    data() {
        return {
            selectedMap,
        }
    }
})
</script>
<style scoped>
.map-selector {
    background-color: var(--background-button-color);
    width: 18rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: .7rem;
}

.button-content {
    display: flex;
    justify-content: space-between;
    gap: auto;
    cursor: pointer;
    transition: all .2s ease-in-out;
}

.button-content:hover {
    color: var(--link-footer-color);
}

.selected-map::after {
    content: "✔";
    color: green;
}
.not-selected-map::after {
    content: "✖";
    color: red;
}

.disabled {
    text-decoration: line-through;
}
</style>