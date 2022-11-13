<template>
    <button 
        class="btn"
        aria-label="Get share link"
        @click="getShareLink"
        ref="shareButton"
        v-tooltip="{ content: 'Get a shareable link to <br> your current selections', html: true }"
    > 
    <font-awesome-icon icon="fa-solid fa-up-right-from-square" />
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getShareLink } from '../URLParameterHandler'

import { useToast } from 'vue-toastification';
const toast = useToast()
export default defineComponent({
    methods: {
        async getShareLink() {
            navigator.clipboard.writeText(document.location + await getShareLink())
            toast.info('Coplied share link to clipboard!', {timeout: 2000})
            
        }
    }
})
</script>

<style scoped> 
.btn {
    color: var(--rarity-color-legendary);
    appearance: none;
    background: none;
    border: none;
}
</style>

