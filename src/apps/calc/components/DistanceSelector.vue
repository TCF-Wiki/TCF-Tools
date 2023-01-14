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
    .container {
     display: flex;
     flex-direction: column;
     gap: var(--space-sm)
    }
    
    .inner-container {
        display: flex;
        flex-direction: row;
        gap: var(--space-md)
    }
    
    
    </style>