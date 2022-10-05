<template>
    <div class="itemImg">
        {{ Object.keys(outputItems.get())[item]}}
    </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import { outputItems } from '../store';
export default defineComponent({
    props: ['item'],
    data() {
        return {
            outputItems
        }
    }
});
</script>
<style scoped>
.itemImg {
    width: 100%;
    height: 100%;
    border: 2px solid red;
    border-radius: 50%;
    text-align: center;
}


</style>
