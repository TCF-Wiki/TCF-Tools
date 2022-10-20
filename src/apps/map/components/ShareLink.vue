<template>
    <button 
        aria-label="Get share link"
        @click="getShareLink"
        ref="shareButton"
    > Share Link 
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getShareLink } from '../URLParameterHandler'
export default defineComponent({
    methods: {
        async getShareLink() {
            navigator.clipboard.writeText(document.location + await getShareLink())

            let el = this.$refs.shareButton as HTMLButtonElement
            el.innerText = 'Copied Succesfully!'
            el.classList.add('apply-bounce')
            setTimeout(() => {
                el.innerText = "Get share link"
                el.classList.remove('apply-bounce')
            }, 3000)
        }
    }
})
</script>