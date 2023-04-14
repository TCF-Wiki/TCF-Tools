// Charts are buggy with vue. Use default DOM instead.

import {selectedTarget, selectedWeapons, selectedArmor, selectedDistance, selectedAccuracy} from "./store";
import {targetData, weaponData, armorData} from "./data";
import {roundToThree} from "./utils";
import {calculate} from "./calculate";

let theme = {
    Chart: {
        colorSet: "colorSet1",
    },
    Title: {
        fontFamily: "sans-ui",
        fontSize: 33,
        fontColor: "#3A3A3A",
        fontWeight: "bold",
        verticalAlign: "top",
        margin: 10,
    },
    Axis: {
        titleFontSize: 26,
        titleFontColor: "#666666",
        titleFontFamily: "Refinery, Helvetica",

        labelFontFamily: "Refinery, Helvetica",
        labelFontSize: 18,
        labelFontColor: "grey",
        tickColor: "#BBBBBB",
        tickThickness: 2,
        gridThickness: 2,
        gridColor: "#BBBBBB",
        lineThickness: 2,
        lineColor: "#BBBBBB",
    },
    Legend: {
        verticalAlign: "bottom",
        horizontalAlign: "center",
        fontFamily: "Refinery, Helvetica",
    },
    DataSeries: {
        //bevelEnabled: true,
        indexLabelFontColor: "red",
        //indexLabelFontFamily: "Trebuchet MS, monospace, Courier New, Courier",
        indexLabelFontFamily: "Refinery, Helvetica",
        indexLabelFontWeight: "bold",
        indexLabelFontSize: 18,
        //indexLabelLineColor: "lightgrey",
        indexLabelLineThickness: 1,
    },
};
CanvasJS.addTheme("Pnoexz", theme); // You can use any name

export function penetrationChart() {
    let penData = [];
    let target = targetData[selectedTarget.selected];

    let hp = target.health;
    let armorScale = target.armorConstant;
    let min = target.minDamageReduction;
    let max = target.maxDamageReduction;

    for (let x = -40; x <= 40; x++) {
        let eHP = hp + Math.abs(x) * armorScale * hp;
        let ratio = hp / eHP;

        if (x > 0) ratio = 2 - ratio;

        if (ratio > max) ratio = max;
        if (ratio < min) ratio = min;
        penData.push({x: x, y: roundToThree(ratio)});
    }

    let data = [
        {
            type: "spline",
            dataPoints: penData,
            showInLegend: true,
            legendText: "DMG Multiplier",
            lineThickness: 2,
        },
    ];

    for (let wep in selectedWeapons.list) {
        let weapon = selectedWeapons.list[wep];

        let penDiff;
        if (selectedTarget.selected == "PlayerDefault" && selectedTarget.selected != "None") {
            penDiff = calculate.s(weapon, "penetration") - armorData[selectedArmor.selected]["armorAmount"];
        } else {
            penDiff = calculate.s(weapon, "penetration") - target.armorValue;
        }

        let weaponValue = roundToThree(calculate.penetrationMultiplier(weapon));

        data.push({
            type: "spline",
            showInLegend: true,
            legendText: weaponData[selectedWeapons.list[wep]]["inGameName"],
            dataPoints: [
                {
                    x: penDiff,
                    y: weaponValue,
                    indexLabel: String(weaponValue),
                    markerSize: 10,
                    indexLabelPlacement: "auto",
                },
            ],
            indexLabelPlacement: "inside",
        });
    }

    let penChart = new CanvasJS.Chart("penChart", {
        title: {
            text: "Penetration",
        },
        theme: "Pnoexz",
        legend: {
            horizontalAlign: "center",
            fontSize: 15,
            verticalAlign: "top",
        },
        axisY: {
            title: "damage multiplier",
            includeZero: true,
            minimum: 0.0,
            maximum: 2.0,
            interval: 0.2,
            gridThickness: 1
        },
        axisX: {
            title: "penetration - armor",
            gridThickness: 1,
        },
        data: data,
    });
    penChart.render();
}

export function falloffChart() {
    let data = [];
    for (let wep in selectedWeapons.list) {
        let weapon = selectedWeapons.list[wep];

        let weaponPoints = [];
        for (let x = 0; x <= 200; x++) {
            let distance = x * 100;

            let start = calculate.s(weapon, "FalloffStart");
            let end = calculate.s(weapon, "FalloffEnd");
            let mult = calculate.s(weapon, "FalloffMultiplier");

            if (distance >= end) {
                weaponPoints.push({x: x, y: mult});
            } else if (distance <= start) {
                weaponPoints.push({x: x, y: 1.0});
            } else {
                let ratio = distance - start;
                let falloffDistance = end - start;
                weaponPoints.push({x: x, y: roundToThree(1 - (ratio / falloffDistance) * (1 - mult))});
            }
        }
        //console.log(weaponPoints)
        data.push({
            type: "spline",
            showInLegend: true,
            legendText: weaponData[weapon]["inGameName"],
            dataPoints: weaponPoints,
            lineThickness: 2,
        });
    }

    let falloffChart = new CanvasJS.Chart("falloffChart", {
        title: {
            text: "Falloff",
        },
        theme: "Pnoexz",
        legend: {
            horizontalAlign: "center",
            fontSize: 15,
            verticalAlign: "top",
        },
        axisY: {
            title: "falloff multiplier",
            includeZero: true,
            minimum: 0.0,
            maximum: 1.2,
            interval: 0.1,
            gridThickness: 1
        },
        axisX: {
            title: "distance (m)",
            gridThickness: 1,
            stripLines: [
                {
                    value: selectedDistance.distance,
                    showOnTop: true,
                },
            ],
        },
        data: data,
    });
    falloffChart.render();
}

export function ttkChart() {
    let data = [];
    for (let wep in selectedWeapons.list) {
        let weapon = selectedWeapons.list[wep];

        let weaponPoints = [];
        for (let x = 2; x <= 10; x++) {
            weaponPoints.push({x: x*10, y: calculate.timeToKill(weapon, (x*10)/100 )})
        }
        //console.log(weaponPoints)
        data.push({
            type: "line",
            showInLegend: true,
            legendText: weaponData[weapon]["inGameName"],
            dataPoints: weaponPoints,
            lineThickness: 2,
        });
    }

    let ttkChart = new CanvasJS.Chart("ttkChart", {
        title: {
            text: "Time to kill",
        },
        theme: "Pnoexz",
        legend: {
            horizontalAlign: "center",
            fontSize: 15,
            verticalAlign: "top",
        },
        axisY: {
            title: "ttk (s)",
            includeZero: true,
            minimum: 0.0,
            gridThickness: 1
        },
        axisX: {
            title: "accuracy",
            gridThickness: 1,
            interval: 10,
            minimum: 15,
            stripLines: [
                {
                    value: selectedAccuracy.value,
                    showOnTop: true
                }
            ]
        },
        data: data,
    });
    ttkChart.render();
}

export function stkChart() {
    let data = [];
    for (let wep in selectedWeapons.list) {
        let weapon = selectedWeapons.list[wep];

        let weaponPoints = [
            {label: "No Armor", y: calculate.shotsToKill(weapon, 0)},
            {label: "Common", y: calculate.shotsToKill(weapon, 10)},
            {label: "Uncommon", y: calculate.shotsToKill(weapon, 15)},
            {label: "Rare", y: calculate.shotsToKill(weapon, 20)},
            {label: "Epic", y: calculate.shotsToKill(weapon, 25)},
            {label: "Exotic", y: calculate.shotsToKill(weapon, 30)},
            {label: "Legendary", y: calculate.shotsToKill(weapon, 33)},

        ];
        data.push({
            type: "column",
            showInLegend: true,
            legendText: weaponData[weapon]["inGameName"],
            dataPoints: weaponPoints,
            lineThickness: 2,
        });
    }

    let stkChart = new CanvasJS.Chart("stkChart", {
        title: {
            text: "Shots to kill",
        },
        theme: "Pnoexz",
        legend: {
            horizontalAlign: "center",
            fontSize: 15,
            verticalAlign: "top",
        },
        axisY: {
            title: "shots",
            includeZero: true,
            minimum: 0.0,
            gridThickness: 1,
            interval: 1
        },
        axisX: {
            title: "armor",
            gridThickness: 1,
            minimum: 0,
        },
        data: data,
    });
    stkChart.render();
}