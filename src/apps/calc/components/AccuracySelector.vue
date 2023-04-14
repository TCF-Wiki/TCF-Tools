<template>
<div class="container-wrapper"> 
    <div class="container">
        <input type="range" min="1" max="100" 
            v-model="value" 
            @change="selectedAccuracy.changeValue(value)"
        > <span> {{ value }}%</span>
    </div>

</div>
</template>

<script>
import { selectedAccuracy } from '../store'
export default {
    data() {
        return {
            value: 100,
            selectedAccuracy
        }
    },
}

</script>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 8.9fr 1fr;
    gap: var(--space-md);
}

.container-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
}
</style>