// Charts are buggy with vue. Use default DOM instead.

import {
  selectedTarget,
  selectedWeapons,
  selectedArmor,
  selectedDistance,
  selectedAccuracy,
} from "./store";
import { targetData, weaponData, armorData } from "./data";
import { roundToThree } from "./utils";
import {
  calculate,
  setCurrentWeapon,
  setRunTimeSettings,
  setRunTimeSettingsAccuracy,
  setRunTimeSettingsArmor,
  setRunTimeSettingsCreatureDmgMult,
  setRunTimeSettingsPenBonus,
} from "./calculate";

Highcharts.theme = {
  colors: [
    "var(--rarity-color-common)",
    "var(--rarity-color-uncommon)",
    "var(--rarity-color-rare)",
    "#b85fd2",
    "var(--rarity-color-exotic)",
    "var(--rarity-color-legendary)",
  ],
  chart: {
    backgroundColor: "var(--color-surface-3)",
    borderColor: "var(--border-color-base)",
    borderWidth: 1,
    className: "dark-container",
    plotBackgroundColor: "var(--color-surface-1)",
    plotBorderColor: "var(--border-color-base)",
    plotBorderWidth: 1,
  },
  title: {
    style: {
      color: "var(--color-base--emphasized)",
      font: 'bold 20px "Atkinson Hyperlegible", system-ui,-apple-system,sans-serif',
    },
  },
  subtitle: {
    style: {
      color: "var(--color-base)",
      font: ' 12px "Atkinson Hyperlegible", system-ui,-apple-system,sans-serif',
    },
  },
  xAxis: {
    gridLineColor: "var(--border-color-base--darker)",
    gridLineWidth: 1,
    labels: {
      style: {
        color: "var(--color-base)",
      },
    },
    lineColor: "var(--border-color-base--darker)",
    tickColor: "var(--border-color-base)",
    title: {
      style: {
        color: "var(--color-base)",
        font: '12px "Atkinson Hyperlegible", system-ui,-apple-system,sans-serif',
      },
    },
  },
  yAxis: {
    gridLineColor: "var(--border-color-base--darker)",
    gridLineWidth: 1,
    labels: {
      style: {
        color: "var(--color-base)",
      },
    },
    lineColor: "var(--border-color-base--darker)",
    tickColor: "var(--border-color-base)",
    title: {
      style: {
        color: "var(--color-base)",
        font: '12px "Atkinson Hyperlegible", system-ui,-apple-system,sans-serif',
      },
    },
  },
  tooltip: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    style: {
      color: "var(--color-base)",
    },
  },
  plotOptions: {
    line: {
      dataLabels: {
        color: "red",
      },
      marker: {
        lineColor: "#333",
      },
    },
    spline: {
      marker: {
        lineColor: "#333",
      },
    },
    scatter: {
      marker: {
        lineColor: "#333",
      },
    },
    candlestick: {
      lineColor: "white",
    },
  },
  legend: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    itemStyle: {
      font: '12px "Atkinson Hyperlegible", system-ui,-apple-system,sans-serif',
      color: "#A0A0A0",
    },
    itemHoverStyle: {
      color: "#FFF",
    },
    itemHiddenStyle: {
      color: "#444",
    },
    title: {
      style: {
        color: "#C0C0C0",
      },
    },
  },
  credits: {
    style: {
      color: "#666",
    },
  },
  labels: {
    style: {
      color: "#CCC",
    },
  },

  navigation: {
    buttonOptions: {
      symbolStroke: "var(--color-warning)",
      theme: {
        fill: "var(--color-surface-2)",
        stroke: "var(--border-color-base)",
      },
    },
  },
};
Highcharts.setOptions({
  plotOptions: {
    series: {
      animation: false,
    },
  },
});
// Apply the theme
Highcharts.setOptions(Highcharts.theme);

export function penetrationChart() {
  let penData = [];
  let wepData = {};
  let target = targetData[selectedTarget.selected];

  let hp = target.health;
  let armorScale = target.armorConstant;
  let min = target.minDamageReduction;
  let max = target.maxDamageReduction;

  // we need to find the maximum armor / penetration value of all creatures/weapons/armor and find the biggest one.
  // This will be the lower and upper bound of our chart. We add a bit to compensate forattachments / room on the chart.
  let values = [];
  for (let a in armorData) values.push(armorData[a].armorAmount);
  for (let w in weaponData) values.push(weaponData[w].penetration);
  for (let t in targetData) values.push(targetData[t].armorValue);
  let bound = Math.max(...values) + 5;

  for (let x = -bound; x <= bound; x++) {
    let eHP = hp + Math.abs(x) * armorScale * hp;
    let ratio = hp / eHP;

    if (x > 0) ratio = 2 - ratio;

    if (ratio > max) ratio = max;
    if (ratio < min) ratio = min;
    penData.push(roundToThree(ratio));

    for (let wep in selectedWeapons.list) {
      let weapon = selectedWeapons.list[wep];
      setCurrentWeapon(weapon);
      setRunTimeSettings("default");
      if (!wepData[weapon]) wepData[weapon] = [];

      let penDiff;
      if (
        selectedTarget.selected == "PlayerDefault" &&
        selectedTarget.selected != "None"
      ) {
        penDiff =
          calculate.s("penetration") -
          armorData[selectedArmor.selected]["armorAmount"];
      } else {
        penDiff = calculate.s("penetration") - target.armorValue;
      }

      if (penDiff !== x) {
        wepData[weapon].push(null);
        continue;
      }

      let weaponValue = roundToThree(calculate.penetrationMultiplier());

      wepData[weapon].push(weaponValue);
    }
  }

  let data = [
    {
      name: "DMG Multiplier",
      data: penData,
    },
  ];

  for (let wep in wepData) {
    data.push({
      name: weaponData[wep]["inGameName"],
      data: wepData[wep],
    });
  }

  Highcharts.chart("penChart", {
    title: {
      text: "Penetration",
      align: "center",
    },
    chart: {
      animation: false,
    },
    yAxis: {
      title: {
        text: "DMG Multiplier",
      },
    },
    xAxis: {
      title: {
        text: "penetration - armor",
      },
      tickInterval: 10,
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: -bound,
      },
    },

    series: data,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },

    exporting: {
      buttons: {
        contextButton: {
          menuItems: ["downloadCSV", "downloadXLS"],
        },
      },
    },
  });
}

export function falloffChart() {
  let data = [];
  for (let wep in selectedWeapons.list) {
    let weapon = selectedWeapons.list[wep];
    setCurrentWeapon(weapon);
    setRunTimeSettings("default");
    let weaponPoints = [];
    for (let x = 0; x <= 200; x++) {
      let distance = x * 100;

      let start = calculate.s("FalloffStart");
      let end = calculate.s("FalloffEnd");
      let mult = calculate.s("FalloffMultiplier");

      if (distance >= end) {
        weaponPoints.push({ x: x, y: mult });
      } else if (distance <= start) {
        weaponPoints.push({ x: x, y: 1.0 });
      } else {
        let ratio = distance - start;
        let falloffDistance = end - start;
        weaponPoints.push({
          x: x,
          y: roundToThree(1 - (ratio / falloffDistance) * (1 - mult)),
        });
      }
    }
    //console.log(weaponPoints)
    data.push({
      name: weaponData[weapon]["inGameName"],
      data: weaponPoints,
    });
  }

  Highcharts.chart("falloffChart", {
    title: {
      text: "Falloff",
      align: "center",
    },
    chart: {
      animation: false,
    },
    yAxis: {
      title: {
        text: "DMG Multiplier",
      },
    },
    xAxis: {
      title: {
        text: "Distance (m)",
      },
      tickInterval: 20,
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 0,
      },
    },

    series: data,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },

    exporting: {
      buttons: {
        contextButton: {
          menuItems: ["downloadCSV", "downloadXLS"],
        },
      },
    },
  });
}
export function ttkChart() {
  let data = [];
  setRunTimeSettings("timeToKill");
  for (let wep in selectedWeapons.list) {
    let weapon = selectedWeapons.list[wep];
    setCurrentWeapon(weapon);

    let weaponPoints = [];
    for (let x = 10; x <= 20; x++) {
      setRunTimeSettingsAccuracy(x * 5);
      weaponPoints.push({ x: x * 5, y: roundToThree(calculate.timeToKill()) });
    }

    data.push({
      name: weaponData[weapon]["inGameName"],
      data: weaponPoints,
    });
  }

  Highcharts.chart("ttkChart", {
    title: {
      text: "Time to kill",
      align: "center",
    },
    chart: {
      animation: false,
    },
    yAxis: {
      title: {
        text: "Time (s)",
      },
    },
    xAxis: {
      title: {
        text: "Accuracy (%)",
      },
      tickInterval: 5,
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 45,
      },
    },

    series: data,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },

    exporting: {
      buttons: {
        contextButton: {
          menuItems: ["downloadCSV", "downloadXLS"],
        },
      },
    },
  });
}

export function stkChart() {
  let data = [];
  setRunTimeSettings("shotsToKillChart");

  let armorValues = [
    armorData["PlayerDefault"]["armorAmount"],
    armorData["Shield_01"]["armorAmount"],
    armorData["Shield_02"]["armorAmount"],
    armorData["Shield_03"]["armorAmount"],
    armorData["Shield_04"]["armorAmount"],
    armorData["Shield_05"]["armorAmount"],
    armorData["Shield_Altered_03"]["armorAmount"],
  ];

  for (let wep in selectedWeapons.list) {
    let weapon = selectedWeapons.list[wep];
    setCurrentWeapon(weapon);

    let weaponPoints = [];
    for (let shield in armorValues) {
      setRunTimeSettingsArmor(armorValues[shield]);
      setRunTimeSettingsPenBonus(0);

      let noMod = calculate.shotsToKill();
      weaponPoints.push(noMod);
      for (let x = 1; x <= 3; x++) {
        setRunTimeSettingsPenBonus(x);
        weaponPoints.push(calculate.shotsToKill());
      }
    }

    data.push({
      name: weaponData[weapon]["inGameName"],
      data: weaponPoints,
    });
  }

  Highcharts.chart("stkChart", {
    chart: {
      type: "column",
      animation: false,
      zooming: {
        type: "x",
      },
    },
    title: {
      text: "Shots to kill",
      align: "center",
    },
    subtitle: {
      text: "Shots to kill against all types of armor. Considers current accuracy and distance settings. The +1/+2/+3 stands for any potential penetration attachments used against that armor. This can be used to see if using that penetration mod changes anything.",
    },
    yAxis: {
      title: {
        text: "Shots to Kill",
      },
    },
    xAxis: {
      title: {
        text: "Type of armor",
      },
      categories: [
        "None",
        "+1",
        "+2",
        "+3",
        "Common",
        "+1",
        "+2",
        "+3",
        "Uncommon",
        "+1",
        "+2",
        "+3",
        "Rare",
        "+1",
        "+2",
        "+3",
        "Epic",
        "+1",
        "+2",
        "+3",
        "Exotic",
        "+1",
        "+2",
        "+3",
        "Legendary",
        "+1",
        "+2",
        "Pen +3",
      ],
      crosshair: true,
    },

    legend: {
      layout: "horizontal",
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        borderWidth: 0,
      },
    },

    series: data,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },

    exporting: {
      buttons: {
        contextButton: {
          menuItems: ["downloadCSV", "downloadXLS"],
          align: "left",
        },
      },
    },
  });
}

export function penModDifferenceChart() {
  let data = [];
  setRunTimeSettings("penDifference");

  for (let wep in selectedWeapons.list) {
    let weapon = selectedWeapons.list[wep];
    let weaponPoints = [];

    setCurrentWeapon(weapon);

    setRunTimeSettingsPenBonus(0);
    let noMod = calculate.shotsToKill();

    for (let x = 1; x <= 3; x++) {
      setRunTimeSettingsPenBonus(x);

      let value = Math.abs(calculate.shotsToKill() - noMod);

      weaponPoints.push(value);
    }
    setRunTimeSettingsPenBonus(null);

    if (selectedTarget.selected !== "PlayerDefault") {
      setRunTimeSettingsCreatureDmgMult(0);
      for (let x = 1; x <= 3; x++) {
        setRunTimeSettingsCreatureDmgMult(1 + x * 0.25);
        let value = Math.abs(calculate.shotsToKill() - noMod);

        weaponPoints.push(value);
      }
    }
    setRunTimeSettingsCreatureDmgMult(null);

    data.push({
      name: weaponData[weapon]["inGameName"],
      data: weaponPoints,
    });

    console.log(data);
  }

  let categories;
  if (selectedTarget.selected == "PlayerDefault") {
    categories = ["Pen +1", "Pen +2", "Pen +3"];
  } else {
    categories = [
      "Pen +1",
      "Pen +2",
      "Pen +3",
      "Creature DMG +25%",
      "Creature DMG +50%",
      "Creature DMG +75%",
    ];
  }

  Highcharts.chart("penDifference", {
    chart: {
      type: "column",
      animation: false,
    },
    title: {
      text: "Pen Mod Difference in Shots to Kill",
      align: "center",
    },
    subtitle: {
      text: `This chart shows shots to kill as different penetration mods are equipped (+1, +2, +3)${ selectedTarget.selected != 'PlayerDefault' ? ', as well as creature damage mods (+25%, +50%, +75%)' : ''}. This considers your current selected options`
    },
    yAxis: {
      title: {
        text: "Shots to Kill Difference",
      },
      tickInterval: 1,
      min: 0,
      startOnTick: true,
    },
    xAxis: {
      title: {
        text:
          selectedTarget.selected == "PlayerDefault"
            ? "Pen Mod"
            : "Pen Mod & Creature Damage Mod",
      },
      categories: categories,
      crosshair: true,
      tickInterval: 1,
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
      column: {
        minPointLength: 1,
      },
    },

    series: data,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },

    exporting: {
      buttons: {
        contextButton: {
          menuItems: ["downloadCSV", "downloadXLS"],
        },
      },
    },
  });
}
