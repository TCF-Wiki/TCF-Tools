<template>
<p> Saving a preset will save it for next time you visit the site,<br> ready to be loaded back in. This means you can return where you left off. </p>
<p> Or you can save a preset for something you reference often. </p> 
<div v-if="shouldShow()">
    <form @submit.prevent="createSaveObject" >
        <input type="text" minlength="3" v-model="saveName" placeholder="Name of this preset">
        <button type="submit">
            Save preset
        </button>
    </form>
</div>
<div v-else>
    <p><strong> Saving presets is not supported for this tool. </strong></p> 
    <p v-if="getCurrentPath().includes('progress')"> This is because this tool has persistent data already.</p>
    <p v-if="getCurrentPath().includes('calculator')"> It is currently not possible to save attachments in the preset.</p>
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
            saveName: ''        
        }
    },
    methods: {
        createSaveObject(): void {
            if (this.saveName.length < 3) return;
            if (location.pathname.includes('map')) {
                this.saveStateToLocalStorage({
                    selectedCreatures: selectedCreatures.list,
                    selectedItems: selectedItems.list,
                    selectedLocations: selectedLocations.list, 
                    selectedMap: selectedMap.map,
                    selectedTier: selectedTier.on,
                    clusterEnabled: clusterEnabled.on,
                    minimumPercent: minimumPercent.value
                })

            }
            if (location.pathname.includes('calculator')) {
                this.saveStateToLocalStorage({
                    selectedArmor: selectedArmor.selected,
                    selectedDistance: selectedDistance.distance, 
                    selectedHSValue: selectedHSValue.HSValue,
                    selectedTarget: selectedTarget.selected,
                    selectedWeakspotValue: selectedWeakspotValue.value,
                    selectedWeapons: selectedWeapons.list
                })
            }   
            if (location.pathname.includes('forge')) {
                this.saveStateToLocalStorage({
                    forgeItems: forgeItems.list,
                    outputItems: outputItems.list,
                    consumeInput: consumeInput.consume
                })
            }  
        },
        saveStateToLocalStorage(data: any): void {
            if (location.pathname.includes('map')) {
                let current   = localStorage.getItem('mapPresets')
                if (current === null) return;
                let parsed = JSON.parse(current)

                if (Object.keys(parsed).includes(this.saveName)) toast.warning('You already have a preset with this name.', { timeout: 2000})
                parsed[this.saveName] = data;

                localStorage.setItem('mapPresets', JSON.stringify(parsed))
                
                toast.success('Succesfully saved preset!', { timeout: 2000 })
                this.saveName = ''
            }
            if (location.pathname.includes('calculator')) {
                let current   = localStorage.getItem('calcPresets')
                if (current === null) return;
                let parsed = JSON.parse(current)

                if (Object.keys(parsed).includes(this.saveName)) toast.warning('You already have a preset with this name.', { timeout: 2000})
                parsed[this.saveName] = data;

                localStorage.setItem('calcPresets', JSON.stringify(parsed))
                
                toast.success('Succesfully saved preset!', { timeout: 2000 })
                this.saveName = ''
            }
            if (location.pathname.includes('forge')) {
                let current   = localStorage.getItem('forgePresets')
                if (current === null) return;
                let parsed = JSON.parse(current)

                if (Object.keys(parsed).includes(this.saveName)) toast.warning('You already have a preset with this name.', { timeout: 2000})
                parsed[this.saveName] = data;

                localStorage.setItem('forgePresets', JSON.stringify(parsed))
                
                toast.success('Succesfully saved preset!', { timeout: 2000 })
                this.saveName = ''
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
        if (localStorage.getItem('mapPresets') === null) {
            localStorage.setItem('mapPresets', '{}')
        } 
        if (localStorage.getItem('calcPresets') === null) {
            localStorage.setItem('calcPresets', '{}')
        } 
        if (localStorage.getItem('forgePresets') === null) {
            localStorage.setItem('forgePresets', '{}')
        } 
        if (localStorage.getItem('loadoutPresets') === null) {
            localStorage.setItem('loadoutPresets', '{}')
        } 
        if (localStorage.getItem('questPresets') === null) {
            localStorage.setItem('questPresets', '{}')
        } 
    }
})
</script>

<style scoped>
form {
    padding-top: var(--space-md);
    border-top: 1px solid var(--border-color-base);
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: var(--space-md);
    justify-content: space-between;
}

form input,
form button {
    border-color: transparent;
    border-radius: var(--space-sm);
}
</style>