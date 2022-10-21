<template>
    <div>
        <TheForge />
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import TheForge from './components/TheForge.vue';
export default defineComponent({
    components: {
        TheForge
    }
});
</script>

<style scoped>
div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
}

@media screen and (max-width: 1100px) {
    div {
        min-height: 100vh;
        justify-content: flex-start;
        gap: 4rem;
    }
}
</style>
