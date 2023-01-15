<template>
    <div class="container">
        <h2> Distance: {{ distance }}m</h2>
            <input type="range" min="0" max="100" 
                v-model="distance" 
                @input="selectedDistance.changeValue(distance)"
            > 
            <p> This affects if damage falls off at range. See the chart below. </p>
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
h2 {
    line-height: 1;
    border-bottom: 1px solid var(--border-color-base);
}

.container {
 display: flex;
 flex-direction: column;
}
    
    .inner-container {
        display: flex;
        flex-direction: row;
        gap: var(--space-md)
    }
    
    
    </style>