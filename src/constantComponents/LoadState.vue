<template>
<div class="container" v-if="shouldShow()">
    <p> Loads a saved preset. Delete a preset by clicking the trashcan. </p>
    <div v-for="value, key, index in currentData" @click.prevent="loadStateToApp(key)"> 
        <span> {{ index+1 }}. {{  key  }} </span>
        <span role="button" @click.stop="deleteSaveObject(key)">     
            <font-awesome-icon icon="fa-solid fa-trash" />
        </span>
    </div>
</div>
<div v-else>
    <p><strong> Loading presets is not supported for this tool. </strong></p> 
    <p v-if="getCurrentPath().includes('progress')"> This is because this tool has persistent data already.</p>
</div>
</template>
    
<script lang="ts">
import { defineComponent } from 'vue';
    
import { selectedCreatures, selectedItems, selectedLocations, selectedMap, selectedTier, clusterEnabled, minimumPercent} from '../apps/map/store'
import { selectedArmor, selectedAttachments, selectedDistance, selectedHSValue, selectedTarget, selectedWeakspotValue, selectedWeapons } from '../apps/calc/store';
import { selectedItems as forgeItems, outputItems, consumeInput } from '../apps/forge/store';
import { useToast } from 'vue-toastification';
const toast = useToast()
export default defineComponent({
    data() {
        return {
            saveName: '',
            currentData: {}    
        }
    },
    methods: {
        deleteSaveObject(key: string): void {
            console.log('Hit!')
            // todo
            if (location.pathname.includes('map')) {
                let current  = localStorage.getItem('mapPresets')
                if (current === null) return;
                let parsed = JSON.parse(current)

                try {
                    delete parsed[key]
                } catch {}

                console.log(parsed)
                this.currentData = parsed;
                localStorage.setItem('mapPresets', JSON.stringify(parsed))

            }
            if (location.pathname.includes('calculator')) {
                let current  = localStorage.getItem('calcPresets')
                if (current === null) return;
                let parsed = JSON.parse(current)

                try {
                    delete parsed[key]
                } catch {}

                console.log(parsed)
                this.currentData = parsed;
                localStorage.setItem('calcPresets', JSON.stringify(parsed))

            }
            if (location.pathname.includes('progress')) {
                let current  = localStorage.getItem('forgePresets')
                if (current === null) return;
                let parsed = JSON.parse(current)

                try {
                    delete parsed[key]
                } catch {}

                console.log(parsed)
                this.currentData = parsed;
                localStorage.setItem('forgePresets', JSON.stringify(parsed))

            }         
        },
        loadStateToApp(name: any): void {
            console.log('Hit this too!')
            if (location.pathname.includes('map')) {
                let current  = localStorage.getItem('mapPresets')
                if (current === null) return;
                let parsed = JSON.parse(current)

                if (!Object.keys(parsed).includes(name)) return;

                try { selectedCreatures.set(parsed[name]['selectedCreatures']) } catch {}
                try { selectedItems.set(parsed[name]['selectedItems']) } catch {}
                try { selectedLocations.set(parsed[name]['selectedLocations']) } catch {}
                try { selectedMap.set(parsed[name]['selectedMap']) } catch {}
                try { selectedTier.set(parsed[name]['selectedTier']) } catch {}
                try { clusterEnabled.set(parsed[name]['clusterEnabled']) } catch {}
                try { minimumPercent.set(parsed[name]['minimumPercent']) } catch {}

                toast.success('Loaded state to tool!', { timeout: 2000})
            }
            if (location.pathname.includes('calculator')) {
                let current  = localStorage.getItem('calcPresets')
                if (current === null) return;
                let parsed = JSON.parse(current)

                if (!Object.keys(parsed).includes(name)) return;

                try { selectedArmor.changeSelected(parsed[name]['selectedArmor']) } catch {}
                try { selectedDistance.changeValue(parsed[name]['selectedDistance']) } catch {}
                try { selectedHSValue.changeValue(parsed[name]['selectedHSValue']) } catch {}
                try { selectedTarget.changeSelected(parsed[name]['selectedTarget']) } catch {}
                try { selectedWeakspotValue.changeValue(parsed[name]['selectedWeakspotValue']) } catch {}
                try { selectedWeapons.set(parsed[name]['selectedWeapons']) } catch {}

                toast.success('Loaded state to tool!', { timeout: 2000})
            }
            if (location.pathname.includes('forge')) {
                let current  = localStorage.getItem('forgePresets')
                if (current === null) return;
                let parsed = JSON.parse(current)

                if (!Object.keys(parsed).includes(name)) return;

                try { forgeItems.set(parsed[name]['forgeItems']) } catch {}
                try { outputItems.set(parsed[name]['outputItems']) } catch {}
                try { consumeInput.set(parsed[name]['consumeInput']) } catch {}

                toast.success('Loaded state to tool!', { timeout: 2000})
            }
        },
        getCurrentPath() {
            return location.pathname
        },
        shouldShow() {
            let path = location.pathname
            if (path.includes('progress') || path.includes('loadout')) return false
            return true
        }
    },
    mounted() {
        if (location.pathname.includes('map')) {
            if (localStorage.getItem('mapPresets') === null) {
                localStorage.setItem('mapPresets', '{}')
            } else {
                this.currentData = JSON.parse(localStorage.getItem('mapPresets') || '{}')
            }
        }
        if (location.pathname.includes('calculator')) {
            if (localStorage.getItem('calcPresets') === null) {
                localStorage.setItem('calcPresets', '{}')
            } else {
                this.currentData = JSON.parse(localStorage.getItem('calcPresets') || '{}')
            }
        }
        if (location.pathname.includes('forge')) {
            if (localStorage.getItem('forgePresets') === null) {
                localStorage.setItem('forgePresets', '{}')
            } else {
                this.currentData = JSON.parse(localStorage.getItem('forgePresets') || '{}')
            }
        }
        if (location.pathname.includes('loadout')) {
            if (localStorage.getItem('loadoutPresets') === null) {
                localStorage.setItem('loadoutPresets', '{}')
            } else {
                this.currentData = JSON.parse(localStorage.getItem('loadoutPresets') || '{}')
            }
        }
        if (location.pathname.includes('quest')) {
            if (localStorage.getItem('questPresets') === null) {
                localStorage.setItem('questPresets', '{}')
            } else {
                this.currentData = JSON.parse(localStorage.getItem('questPresets') || '{}')
            }
        }
    }
})
</script>

<style scoped lang="less">
.container {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
}

.container div {
    padding: var(--space-sm);
    border-bottom: 1px solid var(--border-color-base);
    transition: background-color 100ms ease;
    cursor: pointer;

    display: flex;
    justify-content: space-between;
    gap: var(--space-md)
}

.container div:hover {
    background-color: var(--color-surface-2);
}

.container div span {
    display: flex;
    align-items: center;
}
.container div span[role=button] {
    color: var(--color-destructive);
    scale: 1.5;
    border-radius: var(--space-md);
    padding: var(--space-xs) var(--space-sm);
    aspect-ratio: 1 / 1;

    &:hover {
        background-color: var(--color-surface-0);
    }
}
</style>