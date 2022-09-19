<template>
<div> 
    <label for="colorSelector">Select Marker Outline </label>
    <input 
    type="color" 
    id="colorSelector" 
    @input="updateMarkerCSS" 
    v-model="color">
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        return {
            color: '#ee3355',
            sheet: null as unknown as HTMLStyleElement
        }
    },
    mounted() {
        this.sheet = document.createElement('style')
    },
    methods: {
        updateMarkerCSS() {
            this.sheet.innerHTML =
            `  .marker {
			-webkit-filter: drop-shadow(2px 2px 0 ` +
            this.color +
            `) drop-shadow(-1px -1px 0 ` +
            this.color +
            `);
			filter:drop-shadow(2px 2px 0 ` +
            this.color +
            `) drop-shadow(-1px -1px 0 ` +
            this.color +
            `);
		  }`;
        document.body.appendChild(this.sheet);
        }
    }
})
</script>

<style scoped>
div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

input[type=color] {
    width: 20%;
    border-radius: 1px;
}

</style>