<template>
    <section>
        <div> 
            <h2> Options </h2>
            <div class="content">
                <WeaponSelector />
                <ArmorSelector />
                <TargetSelector />
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
    margin-bottom: 2rem;

    padding: .5rem 2rem 2rem 2rem;
}

div {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    flex-direction: column;
}

h2 {
    font-size: 2rem;
    line-height: 1.2;
}

@media screen and (max-width: 900px) {
  .content {
    flex-direction: row;
  }
}
</style>


