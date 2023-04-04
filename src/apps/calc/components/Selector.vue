<template>
    <section>
        <div class="button-container">
            <div> 
                <span> Weapons </span>
                <WeaponSelector />
            </div>
            <div> 
                <span> Target </span>
                <TargetSelector />
            </div>
             <div>
                <span v-if="selectedTarget.selected == 'PlayerDefault'"> Armor </span>
                <span v-else> Weakspot </span>
                <ArmorSelector />
            </div> 
        </div>
        <div class="button-container">
            <div>
                <span> Accuracy </span>
                <AccuracySelector />
            </div>
            <div class="info-text">
                <span> Weakspot Accuracy </span>
                <WeakSpotAccuracySelector />
            </div>
            <div>
                <span> Distance </span>
                <DistanceSelector /> 
            </div>
        </div>
    </section>
</template>

<script>
import ArmorSelector from './ArmorSelector.vue';
import WeaponSelector from './WeaponSelector.vue';
import TargetSelector from './TargetSelector.vue';
import AccuracySelector from './AccuracySelector.vue';
import DistanceSelector from './DistanceSelector.vue';
import WeakSpotAccuracySelector from './WeakSpotAccuracySelector.vue';
import { selectedTarget } from '../store';
export default {
    components : {
        ArmorSelector,
        WeaponSelector,
        TargetSelector,
        AccuracySelector,
        DistanceSelector,
        WeakSpotAccuracySelector
    },
    data() {
        return {
            selectedTarget
        }
    }
}
</script>

<style scoped> 
section {
    display: flex;
    width: 70%;
    margin: auto;
    margin-bottom: 2rem;
}
.button-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
}

.button-container span {
    text-align: center;
    display: block;
    width: 100%;
    margin: auto;
    font-weight: bold;
    padding: 0;
    margin: var(--space-xs) 0;
    font-size: 1.2rem;

}

.info-text {
    text-align: center;
}

@media screen and (max-width: 900px) {
    .button-container {
        grid-template-columns: 1fr;
        max-width: 100%;
        margin: auto;
    }
}
/*
div {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: calc(1.5* var(--space-md));
}

h2 {
    line-height: 1;
    border-bottom: 1px solid var(--border-color-base);
}

@media screen and (max-width: 900px) {
  .content {
    flex-direction: row;
  }
}

.button-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);   
    grid-gap: .1rem;
}

.button-container div {
    width: 5rem;
} */

</style>


