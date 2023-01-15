<template>
<header> <h2> Outline </h2> </header>
<div> 
    <input 
    type="color" 
    id="colorSelector" 
    @input="setColor"
    label="Select marker outline colour" 
    v-model="color"
    
    v-tooltip="{ content: 'Click to set marker outline colour', html: true }">
    <button type="button" @click="saveColor" class="save btn"
    v-tooltip="{ content: 'Save current colour for future use', html: true }">
        <font-awesome-icon icon="fas fa-save" />
    </button>

    <button type="button" @click="resetColor" class="reset btn"
    v-tooltip="{ content: 'Reset to default', html: true }">
        <font-awesome-icon icon="fas fa-redo" />
    </button>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useToast } from 'vue-toastification';
const toast = useToast()
export default defineComponent({
    data() {
        return {
            color: '#ee3355' as string | null,
            sheet: null as unknown as HTMLStyleElement,
            comment: ''
        }
    },
    mounted() {
        this.sheet = document.createElement('style')
        if (localStorage.getItem('markerOutlineColor') != null) {
            this.color = localStorage.getItem('markerOutlineColor')
            this.setColor()
        }
    },
    methods: {
        setColor() {
            this.sheet.innerHTML =
            `.marker {
			    -webkit-filter: 
                    drop-shadow(2px 2px 0 ${this.color}) 
                    drop-shadow(-1px -1px 0  ${this.color});
			    filter:
                    drop-shadow(2px 2px 0 ${this.color})
                    drop-shadow(-1px -1px 0 ${this.color});
		    }`;

            document.body.appendChild(this.sheet);
        },
        resetColor() {
            this.color = '#ee3355'
            this.setColor()
        },
        saveColor() {
            if (typeof this.color == 'string') {
                localStorage.setItem('markerOutlineColor', this.color)
                toast.info('Saved outline colour!', { timeout: 2000 })
            }
        }
    }
})
</script>

<style scoped>
h2 {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
}

header {
    border-bottom: 1px solid var(--border-color-base);
    margin: auto;
    margin-bottom: var(--space-sm);
    width: 77%;
}

div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: var(--space-md);
    position: relative;
}

input[type=color] {
    /* width: 20%; */
    margin: auto;
    border: none;
    background: none;
    outline: none;
    box-shadow: none;

    cursor: pointer;
}

.save {
    color: var(--rarity-color-uncommon);
}

.reset {
    color: var(--rarity-color-exotic);
}

.btn {
    appearance: none;
    background: none;
    border: none;
}
</style>