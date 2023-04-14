// Charts are buggy with vue. Use default DOM instead.

import {selectedTarget, selectedWeapons, selectedArmor, selectedDistance, selectedAccuracy} from "./store";
import {targetData, weaponData, armorData} from "./data";
import {roundToThree} from "./utils";
import {calculate} from "./calculate";

Highcharts.theme =  {
    colors: ['var(--rarity-color-common)','var(--rarity-color-uncommon)', 'var(--rarity-color-rare)', '#b85fd2', 'var(--rarity-color-exotic)', 'var(--rarity-color-legendary)'],
    chart: {
        backgroundColor: "var(--color-surface-3)",
        borderColor: 'var(--border-color-base)',
        borderWidth: 1,
        className: 'dark-container',
        plotBackgroundColor: 'var(--color-surface-1)',
        plotBorderColor: 'var(--border-color-base)',
        plotBorderWidth: 1
    },
    title: {
        style: {
            color: 'var(--color-base--emphasized)',
            font: 'bold 20px "Atkinson Hyperlegible", system-ui,-apple-system,sans-serif'
        }
    },
    subtitle: {
        style: {
            color: 'var(--color-base)',
            font: ' 12px "Atkinson Hyperlegible", system-ui,-apple-system,sans-serif'
        }
    },
    xAxis: {
        gridLineColor: 'var(--border-color-base--darker)',
        gridLineWidth: 1,
        labels: {
            style: {
                color: 'var(--color-base)'
            }
        },
        lineColor: 'var(--border-color-base--darker)',
        tickColor: 'var(--border-color-base)',
        title: {
            style: {
                color: "var(--color-base)",
                font: '12px "Atkinson Hyperlegible", system-ui,-apple-system,sans-serif'
            }
        }
    },
    yAxis: {
        gridLineColor: 'var(--border-color-base--darker)',
        gridLineWidth: 1,
        labels: {
            style: {
                color: 'var(--color-base)'
            }
        },
        lineColor: 'var(--border-color-base--darker)',
        tickColor: 'var(--border-color-base)',
        title: {
            style: {
                color: "var(--color-base)",
                font: '12px "Atkinson Hyperlegible", system-ui,-apple-system,sans-serif'
            }
        }
    },
    tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        style: {
            color: 'var(--color-base)'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                color: 'red'
            },
            marker: {
                lineColor: '#333'
            }
        },
        spline: {
            marker: {
                lineColor: '#333'
            }
        },
        scatter: {
            marker: {
                lineColor: '#333'
            }
        },
        candlestick: {
            lineColor: 'white'
        }
    },
    legend: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        itemStyle: {
            font: '12px "Atkinson Hyperlegible", system-ui,-apple-system,sans-serif',
            color: '#A0A0A0'
        },
        itemHoverStyle: {
            color: '#FFF'
        },
        itemHiddenStyle: {
            color: '#444'
        },
        title: {
            style: {
                color: '#C0C0C0'
            }
        }
    },
    credits: {
        style: {
            color: '#666'
        }
    },
    labels: {
        style: {
            color: '#CCC'
        }
    },

    navigation: {
    buttonOptions: {
        symbolStroke: 'var(--color-warning)',
        theme: {
            fill: "var(--color-surface-2)",
            stroke: 'var(--border-color-base)'
        }
    }
    },



};
// Apply the theme
Highcharts.setOptions(Highcharts.theme);


export function penetrationChart() {
    let penData = [];
    let wepData = {}
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
        penData.push( roundToThree(ratio) );

        for (let wep in selectedWeapons.list) {
            let weapon = selectedWeapons.list[wep];
            if (!wepData[weapon]) wepData[weapon] = []
    
            let penDiff;
            if (selectedTarget.selected == "PlayerDefault" && selectedTarget.selected != "None") {
                penDiff = calculate.s(weapon, "penetration") - armorData[selectedArmor.selected]["armorAmount"];
            } else {
                penDiff = calculate.s(weapon, "penetration") - target.armorValue;
            }

            
            if (penDiff !== x) {
                wepData[weapon].push( null )
                continue
            };
            
            let weaponValue = roundToThree(calculate.penetrationMultiplier(weapon));
    
            wepData[weapon].push(weaponValue)
        }
    }

    let data = [
        {
            name: "DMG Multiplier",
            data: penData
        },
    ];

    for (let wep in wepData) {
        data.push({
            name: weaponData[wep]["inGameName"],
            data: wepData[wep]
        })
    }

    Highcharts.chart('penChart', {
        title: {
            text: 'Penetration',
            align: 'center'
        },
        yAxis: {
            title: {
                text: 'DMG Multiplier'
            }
        },
        xAxis: {
            title: {
                text: "penetration - armor"
            },
            tickInterval: 10,
            minorTickInterval: 5
        },
    
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top'
        },
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: -40,                
            }
        },
    
        series: data,
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        },

        exporting: {
            buttons: {
              contextButton: {
                menuItems: [
                    "downloadCSV",
                    "downloadXLS",
                ]
              }
            }
          }
    });
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
            name: weaponData[weapon]["inGameName"],
            data: weaponPoints,
        });
    }

    Highcharts.chart('falloffChart', {
        title: {
            text: 'Falloff',
            align: 'center'
        },
        yAxis: {
            title: {
                text: 'DMG Multiplier'
            }
        },
        xAxis: {
            title: {
                text: "Distance (m)"
            },
            tickInterval: 20,
        },
    
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top'
        },
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 0,                
            }
        },
    
        series: data,
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        },

        exporting: {
            buttons: {
              contextButton: {
                menuItems: [
                    "downloadCSV",
                    "downloadXLS",
                ]
              }
            }
          }
    });
}
export function ttkChart() {
    let data = [];
    for (let wep in selectedWeapons.list) {
        let weapon = selectedWeapons.list[wep];

        let weaponPoints = [];
        for (let x = 2; x <= 10; x++) {
            weaponPoints.push({x: x*10, y: roundToThree(calculate.timeToKill(weapon, (x*10)/100 ))})
        }
        //console.log(weaponPoints)
        data.push({
            name: weaponData[weapon]["inGameName"],
            data: weaponPoints,
        });
    }

    Highcharts.chart('ttkChart', {
        title: {
            text: 'Time to kill',
            align: 'center'
        },
        yAxis: {
            title: {
                text: 'Time (s)'
            }
        },
        xAxis: {
            title: {
                text: "Accuracy (%)"
            },
            tickInterval: 20,
        },
    
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top'
        },
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 15,                
            }
        },
    
        series: data,
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        },

        exporting: {
            buttons: {
              contextButton: {
                menuItems: [
                    "downloadCSV",
                    "downloadXLS",
                ]
              }
            }
          }
    });
}
export function stkChart() {
    let data = []
    for (let wep in selectedWeapons.list) {
        let weapon = selectedWeapons.list[wep];

        let weaponPoints = [
            calculate.shotsToKill(weapon, 0),
            calculate.shotsToKill(weapon, 10),
            calculate.shotsToKill(weapon, 15),
            calculate.shotsToKill(weapon, 20),
            calculate.shotsToKill(weapon, 25), 
            calculate.shotsToKill(weapon, 30),
            calculate.shotsToKill(weapon, 33)
        ];
        data.push({
            name: weaponData[weapon]["inGameName"],
            data: weaponPoints,
        });
    }

    Highcharts.chart('stkChart', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Shots to kill',
            align: 'center'
        },
        yAxis: {
            title: {
                text: 'Shots to Kill'
            }
        },
        xAxis: {
            title: {
                text: "Type of armor"
            },
            categories: [
                'None',
                'Common',
                'Uncommon',
                'Rare',
                'Epic',
                'Exotic',
                'Legendary',
              ],
              crosshair: true
        },
    
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top'
        },
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
            }
        },
    
        series: data,
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        },

        exporting: {
            buttons: {
              contextButton: {
                menuItems: [
                    "printChart",
                    "separator",
                    "downloadPNG",
                    "downloadJPEG",
                    "downloadPDF",
                    "downloadSVG",
                    "separator",
                    "downloadCSV",
                    "downloadXLS",
                ]
              }
            }
          }
    });
}




// export function stkChart() {
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

//     let stkChart = new CanvasJS.Chart("stkChart", {
//         title: {
//             text: "Shots to kill",
//         },
//         theme: "Pnoexz",
//         legend: {
//             horizontalAlign: "center",
//             fontSize: 15,
//             verticalAlign: "top",
//         },
//         axisY: {
//             title: "shots",
//             includeZero: true,
//             minimum: 0.0,
//             gridThickness: 1,
//             interval: 1
//         },
//         axisX: {
//             title: "armor",
//             gridThickness: 1,
//             minimum: 0,
//         },
//         data: data,
//     });
//     stkChart.render();
// }

