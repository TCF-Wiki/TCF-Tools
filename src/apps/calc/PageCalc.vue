<script>
import Selector from "./components/Selector.vue";
import WeaponComparer from "./components/WeaponComparer.vue";
import {penetrationChart, falloffChart} from "./charts";
import AccuracySelector from "./components/WeakSpotAccuracySelector.vue";
import DistanceSelector from "./components/DistanceSelector.vue";
import DetailedStatsTable from "./components/DetailedStatsTable.vue";
import {doneLoading} from "../../all";

export default {
    components: {
        Selector,
        WeaponComparer,
        AccuracySelector,
        DistanceSelector,
        DetailedStatsTable
    },
    mounted() {
        // clear out the url bar
        window.history.pushState({}, document.title, location.pathname.replace(".html", ""));
        penetrationChart();
        falloffChart();
        //done loading
        doneLoading();
    },
};
</script>

<template>
    <section>
        <section>
            <div class="header">
                <h1>Weapon Calculator</h1>
                <p class="basic-info">
                    The weapon calculator calculates detailed stats for weapon, and makes it easy to compare them.
                    <br> Change the selectors below to change what the math uses to compare.
                    <br> Change attachments by clicking on the attachment icon in the options.
                    <br> <b> Click on any table header to sort the results ascending, descending, or not sorted. </b>
                </p>
            </div>
            <div class="main-container">

                <Selector />
                <DetailedStatsTable />
            </div>
        </section>
        <section>
            <div class="header">
                <header><h1>Charts</h1></header>
                <!-- <p>The following charts show the detailed stats above in a visual way. More charts will be added in the future.</p> -->
            </div>
            <div class="outer-chart-container">
                <div class="chart-container">
                    <h2>Penetration Chart</h2>
                    <div class="inner-chart-container">
                        <div id="penChart">CHART HERE!</div>
                    </div>
                </div>

                <div class="chart-container">
                    <h2>Falloff Chart</h2>
                    <div class="inner-chart-container">
                        <div id="falloffChart">Chart HERE!</div>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    gap: 2rem 0rem;
}


h1 {
    font-size: 3rem;
    padding-left: 0;
}
h2 {
    text-align: center;
}

.outer-chart-container {
    display: flex;
    flex-direction: row;
    gap: var(--space-md);
    flex-wrap: wrap;
    margin: auto;
}

.chart-container {
    position: relative;
    width: 30rem;
    height: 30rem;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    padding-left: var(--space-md);
}

.header {
    margin: auto;
    border-bottom: 1px solid var(--border-color-base);
    width: 70%;
    text-align: center;
}

.main-container {
    display: flex;
    max-width: 100vw;
    flex-direction: column;
}

.basic-info {
    margin: auto;
}
</style>
