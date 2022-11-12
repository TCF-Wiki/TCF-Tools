<template>
    <button 
        class="btn"
        aria-label="Get share link"
        @click="getShareLink"
        ref="shareButton"
    > 
    <font-awesome-icon icon="fa-solid fa-up-right-from-square" />
    </button>
    <div class="hover"> 
        Get a shareable link to <br>
        your current selections
    </div>
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

.hover {
    opacity: 0;
    pointer-events: none;
    position: absolute;
    z-index: 1;
    background-color: var(--background-stripe-color);
    top: -250%;
    right: -3%;
    padding: .5rem;
    border-radius: .5rem;

    transition: all .2s ease-in-out .2s;
}

.btn:hover + .hover {
    opacity: 1;
    pointer-events: all;
}
</style>

