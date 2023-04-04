<template>
<div class="container-wrapper"> 
    <div class="container">
        <input type="range" min="0" max="100" 
            v-model="HSValue" 
            @input="selectedHSValue.changeValue(HSValue)"
        > <span> {{ HSValue }}%</span>
    </div>
</div>
</template>

<script>
import { selectedHSValue, selectedTarget, selectedWeakspotValue } from '../store'
export default {
    data() {
        return {
            HSValue: 0,
            selectedHSValue,
            selectedTarget,
            selectedWeakspotValue,
        }
    },
    watch: {
        value : {
            deep: true,
            handler() {
                selectedWeakspotValue.changeValue(this.value.value)
            }
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

.container-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
}
</style>