<template>
<div class="container">
        <h2> HS Percentage: {{ HSValue }}% </h2>
        <input type="range" min="0" max="100" 
            v-model="HSValue" 
            @input="selectedHSValue.changeValue(HSValue)"
        > 
    <p> This value is only used if the target is a player. If the target is a creature, it assumes you do not hit any weakpoints. </p> 
</div>
</template>

<script>
import { selectedHSValue } from '../store'
export default {
    data() {
        return {
            HSValue: 0,
            selectedHSValue,
        }
    }
}

</script>

<style scoped>
.container {
 display: flex;
 flex-direction: column;
 gap: var(--space-sm);
}
</style>