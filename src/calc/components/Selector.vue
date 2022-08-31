<template>
    <section>
        <div> 
            <WeaponSelector />
            <ArmorSelector />
            <TargetSelector />
        </div>
        <div>
            <AccuracySelector />
            <DistanceSelector />
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
    padding-left: 2rem;
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    flex-direction: column;
    margin-bottom: 2rem
}

div {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
}
</style>


