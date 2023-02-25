<script setup lang="ts">
import type { PhaseDisplayed, WarningDisplayed } from "../types";
import { formatTime } from "../utils";

interface Props {
  phase: PhaseDisplayed|WarningDisplayed;
  secondary?: boolean;
}
withDefaults(defineProps<Props>(), {
  secondary: false,
});
</script>

<template>
  <li
    class="cycle-tracker__timer-bubble"
    :key="phase.name"
    :class="{secondary: secondary}"
    :style="{ left: `${(phase.left * 100).toFixed(2)}%` }"
  >
    <div class="cycle-tracker__timer-bubble__marker"><div>&nbsp;</div></div>
    <div class="cycle-tracker__timer-bubble__event">
      {{ phase.name }}
    </div>
    <div class="cycle-tracker__timer-bubble__time">
      {{ formatTime(phase.startTime) }}
    </div>
  </li>
</template>

<style scoped>
.cycle-tracker__timer-bubble {
  display: flex;
  margin-left: 2rem;
  margin-right: 2rem;
  padding: 0.375rem;
  font-size: 0.75rem;
  line-height: var(--space-md);
  font-weight: 700;
  text-align: center;
  border-radius: var(--space-xs);
  background-color: var(--timer-bubble-bg-color);
}

.cycle-tracker__timer-bubble__marker {
  display: none;
}

* {
  --timer-bubble-bg-color: var(--color-surface-4);
  --timer-bubble-time-bg-color: var(--color-surface-1);
}

.cycle-tracker__timer-bubble__time {
  margin-top: -0.375rem;
  margin-bottom: -0.375rem;
  margin-left: -var(--space-sm);
  margin-right: -var(--space-sm);
  width: 4rem;
  background-color: var(--timer-bubble-time-bg-color);
  padding-top: var(--space-xs);
  padding-bottom: var(--space-xs);
  font-size: 0.75rem;
  line-height: var(--space-md);
  font-weight: 700;
}

.cycle-tracker__timer-bubble__event {
  font-size: 0.75rem;
  line-height: var(--space-md);
  font-weight: 700;
  flex-grow: 1;
}
.cycle-tracker__timer-bubble.secondary {
  display: none;
}

@media (min-width: 1024px) {
  .cycle-tracker__timer-bubble {
    position: absolute;
    flex-direction: column;
    width: 5rem;
    margin-left: -2.5rem;
    margin-right: 0;
  }
  .cycle-tracker__timer-bubble__time {
    width: auto;
    font-weight: 600;
  }
  .cycle-tracker__timer-bubble__marker > div {
    height: 1.25rem;
    width: 1.25rem;
    background-color: var(--timer-bubble-time-bg-color);
  }

  .cycle-tracker__timer-bubble:not(.secondary) {
    bottom: var(--space-sm);
  }

  .cycle-tracker__timer-bubble:not(.secondary) .cycle-tracker__timer-bubble__time {
    order: 9999;
    margin-left: -0.375rem;
    margin-right: -0.375rem;
    margin-top: var(--space-xs);
    margin-bottom: calc(var(--space-sm) * -1);
    border-bottom-right-radius: var(--space-xs);
    border-bottom-left-radius: var(--space-xs);
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
    padding-top: 0.125rem;
    padding-bottom: var(--space-xs);
  }
  .cycle-tracker__timer-bubble:not(.secondary) .cycle-tracker__timer-bubble__marker {
    bottom: -1.25rem;
  }
  .cycle-tracker__timer-bubble:not(.secondary) .cycle-tracker__timer-bubble__marker div {
    transform-origin: top left;
    transform: rotate(-45deg);
  }

  .cycle-tracker__timer-bubble.secondary {
    display: flex;
    top: 2.5rem;
  }
  .cycle-tracker__timer-bubble.secondary .cycle-tracker__timer-bubble__marker {
    top: -1.25rem;
  }

  .cycle-tracker__timer-bubble.secondary .cycle-tracker__timer-bubble__marker div {
    transform-origin: bottom left;
    transform: rotate(45deg);
  }

.cycle-tracker__timer-bubble.secondary .cycle-tracker__timer-bubble__time {
    order: -9999;
    margin-left: -0.375rem;
    margin-right: -0.375rem;
    margin-top: calc(var(--space-sm) * -1);
    margin-bottom: var(--space-xs);
    border-top-left-radius: var(--space-xs);
    border-top-right-radius: var(--space-xs);
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
    padding-top: var(--space-xs);
    padding-bottom: 0.125rem;
}

  .cycle-tracker__timer-bubble__marker {
    display: block;
    width: 2.5rem;
    overflow: hidden;
    position: absolute;
    left: 1.5rem;
  }
}
</style>
