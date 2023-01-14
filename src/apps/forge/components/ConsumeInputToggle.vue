<template>
<div role="button"
  aria-label="Click to toggle if input items are consumed or not."
  @click="consumeInput.toggle()" 
  :class="{'selected': consumeInput.get()}"> {{consumeInput.get() ? '✔' : '✖'}} 
</div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { consumeInput } from '../store'

export default defineComponent({
    data() {
        return {
            consumeInput: consumeInput
        }
    }
})
</script>

<style scoped>
div {
    display: inline-block;
    color: var(--rarity-color-exotic);
    border: 1px solid var(--border-color-base);
    text-align: center;
    padding: .2rem .4rem;
    transition: background-color .2s ease-in-out;
    cursor: pointer;

    width: 2rem
}

div:hover {
    background-color: var(--background-button-color);
}
.selected {
    content: '✔ ';
    color: var(--rarity-color-uncommon);
}

</style>