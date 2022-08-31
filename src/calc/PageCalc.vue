<script>
import AllSelector from './components/Selector.vue';
import WeaponComparer from './components/WeaponComparer.vue';
import { penetrationChart, falloffChart } from './charts'
export default {
  components: {
    AllSelector,
    WeaponComparer,
  },
  mounted() {
    console.log('this file is run!')
  penetrationChart()
  falloffChart()
  }
};
</script>

<template>
  <main>  
    <section> 
      <div class="header">
        <h1> Weapon Calculator </h1>
      </div>
      <AllSelector />
      <WeaponComparer />
    </section>
    <section>
      <div class="header">
        <h1> Charts </h1>
        <p> The following charts show the detailed stats above in a visual way. More charts will be added in the future.  </p>
      </div>
      <div class="outer-chart-container">
        <div class="chart-container">
          <h2> Penetration Chart </h2> 
          <div class="inner-chart-container">
            <div id="penChart"> CHART HERE!</div>
          </div>
        </div>

        <div class="chart-container">
          <h2> Falloff Chart </h2>
          <div class="inner-chart-container">
            <div id="falloffChart"> Chart HERE! </div>
          </div>
        </div>
      </div>

    </section>
    

    </main>

</template>

<style scoped>
main {
  margin-left: 10vw;
  display: flex;
  flex-direction: column;
  border: 1px solid #121C25;
  background-color: var(--background-body-color);
  gap: 2rem;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
}

h1 {
  font-size: 3rem;
}

.outer-chart-container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex-wrap: wrap;
}

.chart-container {
  position: relative;
  width: 30rem;
  height: 30rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: 2rem;
}

.header {
  position: relative;

  width: 40vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: 2rem;

}
</style>
