<template>
    <button class="btn" @click="clusterEnabled.toggle()"
    v-tooltip="{ content: 'Toggles clustering item markers. <br> <warning> WARNING </warning>: Turning clustering off will have <br> significant performance impact', html: true }"> 
        <font-awesome-icon icon="fa-solid fa-circle-nodes" />
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { clusterEnabled } from '../store';
export default defineComponent({
    data() {
        return {
            clusterEnabled,
        }
    }
})
</script>

<style scoped> 
.btn {
    color: var(--rarity-color-uncommon);
    appearance: none;
    background: none;
    border: none;
}
</style>
