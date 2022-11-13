<template>
<button class="btn" @click="openModal()" 
v-tooltip="{ content: 'Set minimum spawn percentage', html: true }">
    <font-awesome-icon icon="fa-solid fa-percent" />
</button>

<Teleport to="#modal">
    <Transition name="modal"> 
        <div class="modal__bg" v-if="isModalOpen">
            <section class="modal__content modal__small" ref="modal">  
                <button @click="isModalOpen = false" class="modal__close-button" aria-label="Close Modal" type="button"><font-awesome-icon icon="fa-solid fa-xmark" /></button>

                <header class="modal__header"> 
                    <h2>  
                        Minimum Spawn Percentage
                    </h2>
                </header>

                <p> You can filter out spawns below a certain percentage with this slider.  </p>

                <p> <span class="exotic"> WARNING: </span> Putting this value above 0 has impact on performance of the site. </p>

                <div class="container"> 
                    <input type="range" min="0" max="100" @change="minimumPercent.set(value)" v-model="value" :style="{'--color': colorValue()}"> <strong> {{ value }}% </strong>
                </div>
            </section>
        </div>
    </Transition>
</Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
/* @ts-ignore */
import { onClickOutside } from '@vueuse/core';

const isModalOpen = ref(false)
const modal = ref(null)
onClickOutside(modal, () => (isModalOpen.value = false))
    
const openModal = () => {
    isModalOpen.value = true

    const body = document.body
    
    body.style.pointerEvents = 'none'

    setTimeout( () => { body.style.pointerEvents = 'all'},600)
}
</script>

<script lang="ts">
import { defineComponent } from 'vue';
import { minimumPercent } from '../store';
// @ts-ignore
import chroma from "chroma-js"
export default defineComponent({
    data() {
        return {
            minimumPercent,
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
.btn {
    color: var(--rarity-color-rare);
    appearance: none;
    background: none;
    border: none;
}

.container {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    font-size: 1.6rem;
}


input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 1rem;
    background: #d6d6d6;
    outline: none;
    transition: all 0.2s ease;

    border-radius: 2rem;
}

input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 2rem;
    height: 2rem;
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
    width: 2rem;
}

warning {
    color: var(--rarity-color-exotic);
}
</style>