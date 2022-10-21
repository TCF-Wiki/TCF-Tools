<template>
    <div class="container">
        <button class="" type="button" @click.prevent="showTargetModal = true"> 
            <img :src=" 'calc-images/' + selectedTarget.selected + '.png'  " class="button-image"> 
        </button>
    </div>
    <section class="selection-list" v-show="showTargetModal">
        <button class="close" 
        @click.prevent="showTargetModal = false"> 
            &times; 
        </button>
        <h2> Target Selector </h2>
        <div class="target-container">
            <div 
            v-for="(target, key) in targetData" 
            class="target-selector" 
            :class="{active: (selectedTarget.selected == key)}" 
            @click="selectedTarget.changeSelected(key)"
            >
                <img :src=" 'calc-images/' + key + '.png' " class="target-image" >  
                <span> {{ creatureNames[key] }} </span> 
            </div>
        </div>
    </section>
    <Teleport to="body">
        <div class="background" 
            v-show="showTargetModal" 
            @click.prevent="showTargetModal = false"> 
        </div>
    </Teleport>



</template>

<script>
import { targetData } from '../data';
import { selectedTarget } from '../store';
import { creatureNames } from '../utils'
export default {
    name: "WeaponSelector",
    data() {
        return {
            targetData: targetData,
            selectedTarget,
            showTargetModal: false,
            creatureNames: creatureNames
        }
    },
    mounted() {

    },
};
</script>

<style scoped>
.target-image {
    width: 10rem;
    margin: auto;
}

.target-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr
}


.target-selector {
    margin: .2em;
    text-align: center;
    border: 2px solid var(--tertairy);
}

.target-selector:hover .weapon-image {
    transform: scale(1.05);
}

.container button {
    width: 100%;
    height: 100%;
}

@media screen  and (max-width: 900px){
    .target-image {
        display: none;
    }
    .target-name {
        font-size: .8rem;
    }
    .target-container {
        grid-template-columns: 1fr 1fr
    }
}


</style>