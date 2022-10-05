<template>
    <div class="itemImg">
        <div class="contents">
            {{ Object.keys(selectedItems.get())[item]}}

            {{ selectedItems.get()[Object.keys(selectedItems.get())[item]]}}
        </div>
    </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import { selectedItems } from '../store';
export default defineComponent({
    props: ['item'],
    data() {
        return {
            selectedItems
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

.contents {
    display: flex;
    flex-direction: column;
    gap: 1em;
    height: 100%;
    width: 100%;
}
</style>
