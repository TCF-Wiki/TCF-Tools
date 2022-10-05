<template>
<div>
    {{ item }}
</div>
    
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: ["item"]
})
</script>
<style scoped>
div {
    border: 2px solid red;
    position: absolute;
    border-radius: 50%;
    text-align: center;
}



</style>