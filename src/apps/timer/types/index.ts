type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type CreatureSetting = "Normal" | "Storm";

export type GameplayData = {
  storm: boolean;
  playerSpawning: boolean;
  evac: boolean;
  creatureLoot: CreatureSetting;
  creatureSpawns: CreatureSetting;
}

export type TimerButton = {
  name: string;
  skipToTime: number;
}

export type Phase = {
  name: string;
  duration: number;
  gameplay: GameplayData;
};

export type CaclulatedPhase = Phase & {
  startTime: number;
};

export type PhaseDisplayed = CaclulatedPhase & {
  left: number;
}

export type Warning = {
  name: string;
  time: number;
};

export type WarningDisplayed  = Omit<Warning, "time"> & {
  startTime: number;
  left: number;
}

export type MapDataTimer = {
  name: string;
  totalTime: number;
  phases: Phase[];
  warnings: Warning[];
};

export type SpecialTimingEvent = {
  name: string;
  toggleable: boolean;
  startTime: number;
}

export type SpecialTimer = {
  key: string;
  name: string;
  timings: SpecialTimingEvent[];
}

export type MapDataTimerList = {
  [key: string]: MapDataTimer;
}

export type SpecialTimerDataList = {
  [key: string]: SpecialTimer;
}

export type TimerData = {
  mapTimings: MapDataTimerList;
  specialTimings: SpecialTimerDataList;
};
