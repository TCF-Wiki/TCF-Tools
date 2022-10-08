<template>
<div class="card">
    <div class="card-contents">
        <div> {{ rarities[data['rarity']] }} {{ data['type']}} </div>
        <div> {{ data['perk']}} </div>

    </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { reversedRarityMap } from '../ForgeLogic'
export default defineComponent ({
    props: ['data'],
    data() {
        return {
            rarities: reversedRarityMap
        }
    }
})
</script>

<style scoped>
.card {
    width: 100%;
    height: 100%;
}

.card-contents {
    display: grid;
    grid-template-rows: 1fr;
    gap: .3em;
}

.card-contents div {
    white-space:none;
}
</style>