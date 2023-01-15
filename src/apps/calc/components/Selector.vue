<template>
    <section>
        <div> 
            <div class="content">
                <h2> Options </h2>
                <div class="button-container">
                    <div> 
                        <WeaponSelector />
                    </div>
                    <div> 
                        <ArmorSelector />
                    </div>
                    <div>
                        <TargetSelector />
                    </div> 
                </div>
                <AccuracySelector />
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

export default {
    components : {
        ArmorSelector,
        WeaponSelector,
        TargetSelector,
        AccuracySelector,
        DistanceSelector
    }
}
</script>

<style scoped> 
section {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    flex-direction: row;
    margin-bottom: 1rem;
    width: 20rem;

    padding: var(--space-sm) var(--space-md) var(--space-md) var(--space-md);

}

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
}

</style>


