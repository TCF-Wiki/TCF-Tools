<template>
<div class="container"> 
    <input 
        type="range" 
        min="0" 
        max="100" 
        @input="minimumPercent.set(value)" 
        v-model="value" 
        :style="{'--color': colorValue()}"
    > 
    <span> {{ value }}% </span>
</div>
<p> Removes item spawns that are lower than the given percentage.</p>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { minimumPercent } from '../store';
// @ts-ignore
import chroma from "chroma-js"
export default defineComponent({
    data() {
        return {
            minimumPercent,
            toggleInputUpdate: false,
            value: 0
        }
    },
    methods: {
        colorValue() {
            // scales the color of the slider handle from uncommon green to exotic red, based on percentage value
            const f = chroma.scale(['#4cb31b', '#ee3355']).domain([0, 100]);
            return f(this.value);
        }
    }
})
</script>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 8.9fr 1fr;
    width: 100%;
    margin: 1rem auto 0;
    gap: var(--space-md);
}

span {
    text-align: center;
    font-size: 1.2rem;
}

p {
    font-size: .875rem;
    text-align: left;
    padding-bottom: .7rem;
    border-bottom: 1px solid var(--border-color-base);
    width: 100%;
    margin: auto;
}

input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: var(--space-md);
    background: #d6d6d6;
    outline: none;
    transition: all 0.2s ease;
    display: inline;
    border-radius: var(--space-xl);
}

input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: var(--space-xl);
    height: var(--space-xl);
    background: var(--color);
    cursor: pointer;

    border-radius: 50rem;
    border: none;
}

input[type='range']::-moz-range-thumb {
    width: 1.7rem;
    height: 1.7rem;
    background: var(--color);
    cursor: pointer;

    border-radius: 50rem;
    border: none;
}
</style>