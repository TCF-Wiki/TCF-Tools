import { mapDataJson } from "./data";
import type {
  CaclulatedPhase,
  PhaseDisplayed,
  TimerButton,
  TimerData,
  Warning,
  WarningDisplayed,
} from "./types";
import { computed, ref, type ComputedRef, type Ref } from "vue";

const timerData: TimerData = mapDataJson;
const active: Ref<boolean> = ref(false);
const currentMap: Ref<string> = ref("Map_02");
const timer: Ref<number | undefined> = ref();
const currentTime: Ref<number> = ref(0);
const offsets: Ref<Array<number>> = ref([0, 3, 5, 7, 10]);
const currentOffset: Ref<number> = ref(5);
const timeElements: Ref<Array<PhaseDisplayed>> = ref([]);
const secondaryTimeElements: Ref<Array<WarningDisplayed>> = ref([]);
const currentPhase: Ref<PhaseDisplayed | null> = ref(null);

const getDataForMap = (mapKey: string) => {
  return timerData.mapTimings[mapKey];
};

const formatTime = (seconds: number) => {
  seconds = seconds - currentTime.value;
  if (seconds < 0) {
    seconds = seconds * -1;
  }
  let minutes = 0;
  if (seconds >= 60) {
    minutes = Math.floor(seconds / 60);
    seconds = seconds - minutes * 60;
  }
  const r = [];
  if (minutes > 0) {
    r.push(minutes + "m");
  }
  r.push(seconds + "s");

  return r.join(" ");
};

const cycleCounter: ComputedRef<number> = computed(() => {
  return Math.floor(currentTime.value / totalCycleTime.value);
});

const calculatedPhases: ComputedRef<CaclulatedPhase[]> = computed(() => {
  const phases = getDataForMap(currentMap.value).phases;

  let timeStart = 0;
  const calculated: CaclulatedPhase[] = [];
  phases.forEach((phase) => {
    calculated.push({
      ...phase,
      startTime: timeStart,
    });
    timeStart += phase.duration;
  });
  calculated.sort((a, b) => a.startTime - b.startTime);
  console.log(calculated);
  return calculated;
});

const warnings: ComputedRef<Warning[]> = computed(() => {
  return getDataForMap(currentMap.value).warnings;
});

const buttons: ComputedRef<TimerButton[]> = computed(() => {
  const buttons: TimerButton[] = [];
  calculatedPhases.value.forEach((phase) => {
    buttons.push({
      name: phase.name,
      skipToTime: phase.startTime,
    });
  });
  warnings.value.forEach((warning) => {
    buttons.push({
      name: warning.name,
      skipToTime: warning.time,
    });
  });

  buttons.sort((a, b) => a.skipToTime - b.skipToTime);
  return buttons;
});

const totalCycleTime: ComputedRef<number> = computed(() => {
  return getDataForMap(currentMap.value).totalTime;
});

const mapNames: ComputedRef<Array<{ key: string; name: string }>> = computed(
  () => {
    const mapNameArray: Array<{ key: string; name: string }> = [];
    for (const [mapKey, mapData] of Object.entries(timerData.mapTimings)) {
      mapNameArray.push({
        key: mapKey,
        name: mapData.name,
      });
    }

    return mapNameArray;
  }
);

const calculateLeft = (startTime: number) => {
  return (startTime - currentTime.value) / totalCycleTime.value;
};

const updateTimings = function () {
  currentTime.value += 1;
  timeElements.value.forEach((element) => {
    if (element.startTime <= currentTime.value) {
      element.startTime += totalCycleTime.value;
      currentPhase.value = element;
    }
    element.left = calculateLeft(element.startTime);
  });
  secondaryTimeElements.value.forEach((element) => {
    if (element.startTime <= currentTime.value) {
      element.startTime += totalCycleTime.value;
    }
    element.left = calculateLeft(element.startTime);
  });
  timeElements.value.sort((a, b) => a.startTime - b.startTime);
  secondaryTimeElements.value.sort((a, b) => a.startTime - b.startTime);
};

const setMap = function (mapName: string) {
  currentMap.value = mapName;
  active.value = false;
  currentTime.value = 0;
};

const setOffset = function (offset: number) {
  currentOffset.value = offset;
};

const setTime = function (time: number) {
  if (timer.value !== undefined) {
    clearInterval(timer.value);
  }
  currentTime.value = time + currentOffset.value;
  timeElements.value = [];
  let startTimeOffset = 0;
  calculatedPhases.value.forEach((phase) => {
    let startTime = 0 + startTimeOffset;
    if (currentTime.value >= startTime) {
      startTime += totalCycleTime.value;
    }
    timeElements.value.push({
      name: phase.name,
      duration: phase.duration,
      startTime: startTime,
      left: calculateLeft(startTime),
      gameplay: phase.gameplay,
    });
    startTimeOffset += phase.duration;
  });

  secondaryTimeElements.value = [];
  warnings.value.forEach((warning) => {
    let startTime = warning.time;
    console.log(startTime);
    if (currentTime.value >= startTime) {
      startTime += totalCycleTime.value;
    }
    secondaryTimeElements.value.push({
      name: warning.name,
      startTime: startTime,
      left: calculateLeft(startTime),
    });
  });

  timeElements.value.sort((a, b) => a.startTime - b.startTime);
  secondaryTimeElements.value.sort((a, b) => a.startTime - b.startTime);
  currentPhase.value = timeElements.value[timeElements.value.length - 1];
  timer.value = setInterval(updateTimings, 1000);
  active.value = true;
};

export {
  active,
  buttons,
  currentMap,
  currentOffset,
  currentPhase,
  cycleCounter,
  calculatedPhases,
  secondaryTimeElements,
  formatTime,
  totalCycleTime,
  mapNames,
  offsets,
  setMap,
  setOffset,
  setTime,
  timeElements,
  updateTimings,
};
