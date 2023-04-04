<template>
<div class="container">
    <input type="range" min="0" max="100" 
        v-model="distance" 
        @input="selectedDistance.changeValue(distance)"
    >  
    <span> 
        {{ distance }}m
    </span>
</div>
</template>
    
<script>
import { selectedDistance } from '../store'
export default {
    data() {
        return {
            distance: 0,
            selectedDistance,
        }
    }
}

</script>
    
<style scoped>
.container {
    display: grid;
    grid-template-columns: 8.9fr 1fr;
    gap: var(--space-md);
}
</style>