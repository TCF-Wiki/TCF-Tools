<template>
    <header>
        <h2> Outline </h2>
    </header>
    <div>
        <div class="input-container">
            <div class="input-wrapper">
                <span> Items </span>
                <input type="color" id="colorSelector1" @input="setColor" label="Select marker outline colour"
                    v-model="color.itemColor" v-tooltip="{ content: 'Click to set marker outline colour', html: true }">
            </div>
            <div class="input-wrapper">
                <span> Containers </span>
                <input type="color" id="colorSelector2" @input="setColor" label="Select marker outline colour"
                    v-model="color.containerColor"
                    v-tooltip="{ content: 'Click to set marker outline colour', html: true }">
            </div>
            <div class="input-wrapper">
                <span> Creatures </span>
                <input type="color" id="colorSelector3" @input="setColor" label="Select marker outline colour"
                    v-model="color.creatureColor" v-tooltip="{ content: 'Click to set marker outline colour', html: true }">
            </div>
            <div class="input-wrapper">
                <span> Special </span>
                <input type="color" id="colorSelector4" @input="setColor" label="Select marker outline colour"
                    v-model="color.specialColor" v-tooltip="{ content: 'Click to set marker outline colour', html: true }">
            </div>
        </div>
        <div class="input-container">
            <div class="input-wrapper">
                <span> Save </span>
                <button type="button" @click="saveColor" class="save btn"
                    v-tooltip="{ content: 'Save current colour for future use', html: true }">
                    <font-awesome-icon icon="fas fa-save" />
                </button>
            </div>
            <div class="input-wrapper">
                <span> Reset </span>
                <button type="button" @click="resetColor" class="reset btn"
                    v-tooltip="{ content: 'Reset to default', html: true }">
                    <font-awesome-icon icon="fas fa-redo" />
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useToast } from 'vue-toastification';
const toast = useToast()
export default defineComponent({
    data() {
        return {
            color: {
                creatureColor: '#ee3355' as string | null,
                itemColor: '#4cb31b' as string | null,
                containerColor: '#1da7ec' as string | null,
                specialColor: '#ff820d' as string | null,
            },
            sheet: null as unknown as HTMLStyleElement,
            comment: ''
        }
    },
    mounted() {
        this.sheet = document.createElement('style')
        const userSettings = localStorage.getItem('markerOutlineColorNew')
        if (userSettings && userSettings != '{}') {
            // @ts-ignore
            this.color = JSON.parse(userSettings)
            this.setColor()
        }
    },
    methods: {
        setColor() {
            this.sheet.innerHTML =
                `.marker-type-item {
			    -webkit-filter: 
                    drop-shadow(2px 2px 0 ${this.color.itemColor}) 
                    drop-shadow(-2px -2px 0  ${this.color.itemColor});
			    filter:
                    drop-shadow(2px 2px 0 ${this.color.itemColor})
                    drop-shadow(-2px -2px 0 ${this.color.itemColor});
		    }
            .marker-type-container {
			    -webkit-filter: 
                    drop-shadow(2px 2px 0 ${this.color.containerColor}) 
                    drop-shadow(-2px -2px 0  ${this.color.containerColor});
			    filter:
                    drop-shadow(2px 2px 0 ${this.color.containerColor})
                    drop-shadow(-2px -2px 0 ${this.color.containerColor});
		    }
            .marker-type-creature {
			    -webkit-filter: 
                    drop-shadow(2px 2px 0 ${this.color.creatureColor}) 
                    drop-shadow(-2px -2px 0  ${this.color.creatureColor});
			    filter:
                    drop-shadow(2px 2px 0 ${this.color.creatureColor})
                    drop-shadow(-2px -2px 0 ${this.color.creatureColor});
		    }
            .marker-type-special {
			    -webkit-filter: 
                    drop-shadow(2px 2px 0 ${this.color.specialColor}) 
                    drop-shadow(-2px -2px 0  ${this.color.specialColor});
			    filter:
                    drop-shadow(2px 2px 0 ${this.color.specialColor})
                    drop-shadow(-2px -2px 0 ${this.color.specialColor});
		    }`;

            document.body.appendChild(this.sheet);
        },
        resetColor() {
            this.color = {
                creatureColor: '#ee3355',
                itemColor: '#4cb31b',
                containerColor: '#1da7ec',
                specialColor: '#ff820d',
            },
            this.setColor()
            localStorage.setItem('markerOutlineColorNew', JSON.stringify(this.color))
            toast.info('Reset all colours!', { timeout: 2000 })

        },
        saveColor() {
            localStorage.setItem('markerOutlineColorNew', JSON.stringify(this.color))
            toast.info('Saved outline colour!', { timeout: 2000 })
            
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

.input-container {
    display: flex;
    flex-direction: row;
    margin: auto;
    justify-content: center;
    gap: var(--space-md);
    flex-wrap: wrap;

}

.input-wrapper {
    display: flex;
    flex-direction: column;
    margin: auto;
    text-align: center;
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
    width: 2rem;
}
</style>