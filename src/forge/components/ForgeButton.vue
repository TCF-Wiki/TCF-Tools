<template>
    <div class="forge-button">
    </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
    props: ['item'],
});
</script>
<style scoped>
.forge-button {
    width: 100%;
    height: 100%;
    border: 2px solid red;
    border-radius: 50%;
    text-align: center;
}
</style>
