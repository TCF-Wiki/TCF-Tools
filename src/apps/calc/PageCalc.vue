<script>
import Selector from "./components/Selector.vue";
import WeaponComparer from "./components/WeaponComparer.vue";
import { penetrationChart, falloffChart, ttkChart, stkChart, penModDifferenceChart } from "./charts";
import AccuracySelector from "./components/WeakSpotAccuracySelector.vue";
import DistanceSelector from "./components/DistanceSelector.vue";
import DetailedStatsTable from "./components/DetailedStatsTable.vue";
import { doneLoading } from "../../all";
import StatCustomiser from "./components/StatCustomiser.vue";
import { loadInitialStore } from "./URLParameterHandler";
import { selectedTarget } from "./store";
export default {
    components: {
        Selector,
        WeaponComparer,
        AccuracySelector,
        DistanceSelector,
        DetailedStatsTable,
        StatCustomiser,
    },
    mounted() {
        // clear out the url bar
        loadInitialStore()
        window.history.pushState({}, document.title, location.pathname.replace(".html", ""));
        penetrationChart();
        falloffChart();
        ttkChart();
        stkChart()
        penModDifferenceChart()
        //done loading
        doneLoading();

    },
    data() {
        return {
            selectedTarget
        }
    }
};
</script>

<template>
    <section>
        <section class="container">
            <div class="header">
                <h1>Weapon Calculator</h1>
                <p class="basic-info">
                    The weapon calculator calculates detailed stats for weapon, and makes it easy to compare weapons.
                    <br> Change the options to change what it is comparing against.
                    <br> Change attachments by clicking on the attachment icon in the options.
                    <br> <b> Click on any table header to sort the results ascending, descending, or not sorted. </b>
                </p>
            </div>
            <div class="main-container">
                <Selector />
                <DetailedStatsTable />
            </div>
        </section>
        <section class="container">
            <div class="header">
                <header>
                    <h2>Charts</h2>
                </header>
                <!-- <p>The following charts show the detailed stats above in a visual way. More charts will be added in the future.</p> -->
            </div>
            <div class="outer-chart-container">
                <div class="chart-container">
                    <h3>Penetration Chart</h3>
                    <span> This chart shows the effect of penetration on the damage a weapon deals. <a
                            href="https://thecyclefrontier.wiki/wiki/Penetration"> See the wiki for more info</a>.</span>
                    <div class="inner-chart-container">
                        <div id="penChart">CHART HERE!</div>
                    </div>
                </div>

                <div class="chart-container">
                    <h3>Falloff Chart</h3>
                    <span> This chart shows the effect of distance on the damage a weapon deals.</span>
                    <div class="inner-chart-container">
                        <div id="falloffChart">Chart HERE!</div>
                    </div>
                </div>

                <div class="chart-container">
                    <h3>Time to Kill Chart</h3>
                    <span> This chart shows how the time to kill of a weapon changes as normal accuracy changes. Range: [50,
                        100], steps of 5%.</span>
                    <div class="inner-chart-container">
                        <div id="ttkChart">Chart HERE!</div>
                    </div>
                </div>

                <div class="chart-container wide">
                    <h3>Shots to Kill Chart</h3>
                    <span> This chart shows how the shots to kill of a weapon changes as the armor it is shooting
                        changes.</span>
                    <div class="inner-chart-container">
                        <div id="stkChart">Chart HERE!</div>
                    </div>
                </div>

                <div class="chart-container">
                    <h3>{{ selectedTarget.selected == 'PlayerDefault' ? 'Penetration Mod Chart' : 'Penetration & Creature DMG Mod Chart'}}</h3>
                    <span> This chart shows how the shots to kill change according to specific attachements.</span>
                    <div class="inner-chart-container">
                        <div id="penDifference">Chart HERE!</div>
                    </div>
                </div>
            </div>
        </section>
        <section class="container">
            <StatCustomiser />
        </section>
    </section>
</template>

<style scoped>
section.container {
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
    justify-content: space-evenly;
    text-align: center;
    align-content: space-evenly;
}

.chart-container {
    position: relative;
    width: 30rem;
    height: 34rem;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
}

.chart-container.wide {
    width: 50rem;
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

b {
    font-size: larger;
}</style>
