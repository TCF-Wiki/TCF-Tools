<script setup lang="ts">
import TimerBubble from "./components/TimerBubble.vue";
import {
  mapNames,
  currentMap,
  setMap,
  offsets,
  secondaryTimeElements,
  currentOffset,
  setOffset,
  setTime,
  timeElements,
  active,
  currentPhase,
  totalCycleTime,
  formatTime,
  buttons,
} from "./utils";
import { doneLoading } from "../../all";

window.history.pushState(
  {},
  document.title,
  location.pathname.replace(".html", "")
);

doneLoading();
</script>

<template>
  <div class="cycle-tracker__navbars">
    <div class="cycle-tracker__buttons">
      <button
        v-for="(map, index) in mapNames"
        :key="index"
        :class="{ 'btn-active': map.key === currentMap }"
        type="button"
        @click="setMap(map.key)"
      >
        {{ map.name }}
      </button>
    </div>
    <div class="cycle-tracker__buttons">
      <button
        v-for="(offset, index) in offsets"
        :key="index"
        :class="{ 'btn-active': offset === currentOffset }"
        type="button"
        @click="setOffset(offset)"
      >
        +{{ offset }} seconds
      </button>
    </div>
    <div class="cycle-tracker__buttons">
      <button
        v-for="timing in buttons"
        :key="`start_${timing.name}`"
        type="button"
        @click="setTime(timing.skipToTime)"
      >
        {{ timing.name }}
      </button>
    </div>
  </div>
  <div class="cycle-tracker__timer">
    <template v-if="active">
      <div class="cycle-tracker__timeline">
        <ul class="cycle-tracker__timer-list">
          <template v-for="timing in timeElements" :key="timing.name">
            <TimerBubble :phase="timing" />
          </template>
          <template v-for="timing in secondaryTimeElements" :key="timing.name">
            <TimerBubble :phase="timing" :secondary="true" />
          </template>
        </ul>
        <div class="cycle-tracker__current-message" v-if="currentPhase">
          {{ currentPhase.name }}
          since
          {{ formatTime(currentPhase.startTime - totalCycleTime) }}
        </div>
      </div>
    </template>
    <div class="cycle-tracker__start-message" v-else>
      Click on a event button when a event occures ingame and the timer will
      start.
    </div>
  </div>
</template>

<style scoped>
.cycle-tracker__timer {
  flex-grow: 1;
  justify-content: center;
  align-content: center;
  display: flex;
}

.cycle-tracker__timer-list {
  list-style: none;
  order: 9999;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  margin: 0;
  padding: 0;
}

.cycle-tracker__buttons {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  justify-content: center;
}
.cycle-tracker__buttons button {
  border: 0;
  outline: 0;
  border-radius: var(--border-radius--small);
  font-weight: 400;
}

.cycle-tracker__buttons button:not(.btn-active):hover {
  background-color: var(--color-success);
}

.cycle-tracker__buttons button.btn-active {
  background-color: var(--color-success);
  font-weight: 700;
}

.cycle-tracker__start-message {
  margin-top: auto;
  margin-bottom: auto;
  color: var(--color-base);
}
.cycle-tracker__timeline {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.cycle-tracker__current-message {
  margin-left: var(--space-md) /* 16px */;
  margin-right: var(--space-md) /* 16px */;
  margin-top: var(--space-sm) /* 8px */;
  margin-bottom: var(--space-sm) /* 8px */;
  padding-top: var(--space-sm) /* 8px */;
  padding-bottom: var(--space-sm) /* 8px */;
  text-align: center;
  background-color: var(--color-base--subtle);
  color: var(--color-surface-4);
  font-weight: 700;
}
@media (min-width: 1024px) {
  .cycle-tracker__buttons button {
    padding-left: var(--space-md);
    padding-right: var(--space-md);
    padding-top: var(--space-sm);
    padding-bottom: var(--space-sm);
  }
  .cycle-tracker__buttons {
    margin-top: var(--space-sm);
    margin-bottom: var(--space-sm);
    gap: var(--space-md);
  }

  .cycle-tracker__timeline {
    display: block;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 4rem;
    margin-right: 4rem;
    height: var(--space-lg);
    background-color: var(--color-base--subtle);
  }

  .cycle-tracker__current-message {
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 0px;
    margin-bottom: 0px;
    padding-top: 0px;
    padding-bottom: 0px;
    font-size: 1.25rem;
    line-height: var(--space-lg);
  }

  .cycle-tracker__timer-list {
    gap: 0;
    position: relative;
  }
}
</style>
