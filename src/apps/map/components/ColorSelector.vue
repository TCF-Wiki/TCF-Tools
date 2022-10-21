<template>
<div> 
    <label for="colorSelector">Select Marker Outline </label>
    <input 
    type="color" 
    id="colorSelector" 
    @input="setColor" 
    v-model="color">
    <button type="button" @click="saveColor">
        <font-awesome-icon icon="fas fa-save" />
    </button>
    <button type="button" @click="resetColor">
        <font-awesome-icon icon="fas fa-redo" />
    </button>
</div>
{{ comment }}

</template>

<script lang="ts">
import { defineComponent } from 'vue';
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
                this.comment = 'Saved. Reloading the page will not reset the color.'
                setTimeout( () => {this.comment = ''}, 9000)
            }
        }
    }
})
</script>

<style scoped>
div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

input[type=color] {
    width: 20%;
    border-radius: 1px;
}

</style>