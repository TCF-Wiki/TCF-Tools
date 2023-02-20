<template>
<div class="container"> 
    <input 
        type="range" 
        min="0" 
        max="100" 
        @change="toggleInputUpdate ? () => {} : minimumPercent.set(value)" 
        @input="toggleInputUpdate ? minimumPercent.set(value) : () => {}" 
        v-model="value" 
        :style="{'--color': colorValue()}"
    > 
    <span> {{ value }}% </span>

    <div 
        class="toggle-button" 
        role="button"
        aria-label="Click to toggle if input items are consumed or not."
        @click="toggleInputUpdate = !toggleInputUpdate" 
        :class="{'selected': toggleInputUpdate}"
        v-tooltip="{html: true, placement: 'bottom', content: 'Toggles whether it updates whenever it is changed,<br> or only when the slider is let go.<br> The former is more performance intensive.'}"
    >
     {{toggleInputUpdate ? '✔' : '✖'}} 
    </div>
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
    grid-template-columns: 8.9fr 1fr 1fr;
    width: 100%;
    margin: 1rem auto 0;
    gap: var(--space-md);
}

span {
    width: 20px;
    text-align: center;
    padding-left: 4px;
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

.container strong {
    width: var(--space-xl);
}

warning {
    color: var(--rarity-color-exotic);
}

.toggle-button {
    display: inline-block;
    color: var(--rarity-color-exotic);
    border: 1px solid var(--border-color-base);
    text-align: center;
    padding: .2rem .4rem;
    transition: background-color .2s ease-in-out;
    cursor: pointer;

    width: 2rem
}

.toggle-button:hover {
    background-color: var(--background-button-color);
}
.selected {
    content: '✔ ';
    color: var(--rarity-color-uncommon);
}
</style>