<template>
    <div class="itemImg">
    </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
    props: ['item'],
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
