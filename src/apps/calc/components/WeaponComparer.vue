<template>
    <section class="table-container">
        <div class="flex-item header-row">
            <h2>
                Stats
                <span> Expand stats </span>
                <span class="collapse-button" @click="collapsed = !collapsed" role="button" aria-label="Collapse this section" v-tooltip="{content: 'Collapse/Expand stats'}">
                    <span v-if="!collapsed">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                            <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                        </svg>
                    </span>
                    <span v-else>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                            <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                        </svg>
                    </span>
                </span>
            </h2>
            <div class="stats-wrapper" :class="{collapsed: collapsed}">
                <p v-for="(value, key) in filter(weaponData['WP_A_Pistol_Bullet_01'])">
                    <span> {{ keyNames[key] }} </span>
                </p>
            </div>
            <h2>Detailed Stats</h2>
            <p>
                <span> Penetration Multiplier </span>
            </p>
            <p>
                <span> Rounds per Minute </span>
            </p>
            <p>
                <span> Reload Adjust RPM </span>
            </p>
            <p>
                <span> Damage per Second (Approx)</span>
            </p>
            <p>
                <span> Reload Adjusted DPS (Approx)</span>
            </p>
            <p>
                <span> Damage per Mag </span>
            </p>
            <p>
                <span> Time to Empty Mag (s) </span>
            </p>
            <p>
                <span> Shots to Kill </span>
            </p>
            <p>
                <span> Time to Kill (s) </span>
            </p>
            <p>
                <span> Damage per Bullet</span>
            </p>
            <p>
                <span> Damage per Bullet (HS) </span>
            </p>
            <h2>Shots to Kill</h2>
            <p>
                <span> Shield </span>
            </p>
            <p>
                <span> Helmet </span>
            </p>
        </div>
        <div class="inner-container">
            <div v-for="weapon in selectedWeapons.list" class="flex-item">
                <h2>{{ weaponData[weapon]["inGameName"] }} <img class="weapon-image" :src="'calc-images/' + weaponData[weapon]['inGameName'] + '.png'" /></h2>
                <div class="stats-wrapper" :class="{collapsed: collapsed}">
                    <p v-for="(value, key) in filter(weaponData[weapon])">
                        <span :class="colourClassGiver(key, weapon)"> {{ value }} {{ attachmentStat(weapon, key) }}</span>
                    </p>
                </div>
                <h2>{{ weaponData[weapon]["inGameName"] }} <img class="weapon-image" :src="'calc-images/' + weaponData[weapon]['inGameName'] + '.png'" /></h2>
                <p v-for="(value, key) in getDetailedStats(weapon, undefined)">
                    <span :class="colourClassGiver(key, weapon)"> {{ value }} </span>
                </p>

                <h2>{{ weaponData[weapon]["inGameName"] }} <img class="weapon-image" :src="'calc-images/' + weaponData[weapon]['inGameName'] + '.png'" /></h2>
                <p class="small">
                    <span v-for="(value, key, index) in getDetailedStats(weapon, 'Shield')" :class="colourClassGiver(key, weapon)" :style="{'--clr': rarity(index)}"> {{ value }} </span>
                </p>
                <p class="small">
                    <span v-for="(value, key, index) in getDetailedStats(weapon, 'Helmet')" :class="colourClassGiver(key, weapon)" :style="{'--clr': rarity(index)}"> {{ value }} </span>
                </p>

                <div class="button-container">
                    <BodyChart :weapon="weapon" />
                    <AttachmentSelector :weapon="weapon" />
                </div>

                <div class="delete-button">
                    <button @click="selectedWeapons.toggleSelected(weapon)">Remove Weapon</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {selectedWeapons, selectedArmor, selectedTarget, selectedHSValue, selectedDistance, selectedAttachments, selectedWeakspotValue} from "../store";
import {armorData, weaponData as wepData} from "../data";
import {keyObject, detailedKeyObject, flippedKeys as flippedKeysData, roundToThree} from "../utils";
import {calculate} from "../calculate";
import {attachment} from "../attachment";
import {penetrationChart, falloffChart} from "../charts";
import AttachmentSelector from "./AttachmentSelector.vue";
import BodyChart from "./BodyChart.vue";
import {helmetData} from "@/apps/forge/data";

export default {
    components: {
        AttachmentSelector,
        BodyChart,
    },
    data() {
        return {
            selectedWeapons,
            selectedArmor,
            selectedTarget,
            selectedHSValue,
            selectedDistance,
            selectedAttachments,
            selectedWeakspotValue,
            weaponData: wepData,
            keyNames: keyObject,
            detailedKeyNames: detailedKeyObject,
            flippedKeys: flippedKeysData,
            compareData: [],
            colourList: {},
            detailedStats: {},
            collapsed: true,
        };
    },
    methods: {
        rarity(index) {
            let l = ["none", "common", "uncommon", "rare", "epic", "exotic", "legendary"];
            return "var(--rarity-color-" + l[index] + ")";
        },
        getDetailedStats(weapon, getShotsForType) {
            // This function filters the output based on if we want to have the shots to kill or not.
            // uses the $ in the key name to filter.

            const data = this.detailedStats[weapon];
            if (!data) {
                return {};
            }
            if (!getShotsForType) {
                return Object.fromEntries(Object.entries(data).filter(([key]) => !key.includes("%")));
            }
            if (getShotsForType == "Shield") {
                return Object.keys(data)
                    .filter((key) => key.includes("$"))
                    .reduce((cur, key) => {
                        return Object.assign(cur, {[key]: data[key]});
                    }, {});
            }
            if (getShotsForType == "Helmet") {
                return Object.keys(data)
                    .filter((key) => key.includes("&"))
                    .reduce((cur, key) => {
                        return Object.assign(cur, {[key]: data[key]});
                    }, {});
            }
            return data;
        },
        colourClassGiver(key, weapon) {
            let effects = attachment.getAttachmentEffects(weapon);
            let output = "";
            if (Object.keys(this.colourList).length == 1) return;
            if (effects[key]) {
                output += "modified ";
            }
            if (this.colourList[weapon]) {
                output += this.colourList[weapon][key];
            }
            return output;
        },
        filter(data) {
            let filteredData = {};
            for (let x in data) {
                if (typeof data[x] == "object") continue;
                if (x == "inGameName") continue;
                filteredData[x] = data[x];
            }
            return filteredData;
        },
        updateColourList() {
            // This function will figure out if a row should be colourable or not
            const selectedWeaponData = [];
            const colouredList = {};
            for (let wep in selectedWeapons.list) {
                selectedWeaponData.push(this.weaponData[selectedWeapons.list[wep]]);
                colouredList[selectedWeapons.list[wep]] = {};
            }
            // we need to find the highest value of each key in the data. We iterate over the first item in our guns to find which key to use
            // then create an object which holds if it is bigger or smaller...
            for (const key in selectedWeaponData[0]) {
                const value = calculate.s(selectedWeapons.list[0], key);
                if (typeof value != "number") continue;

                let colorData = [];
                for (const wep in selectedWeapons.list) {
                    const tempVal = calculate.s(selectedWeapons.list[wep], key);
                    if (typeof tempVal == "number") {
                        colorData.push(tempVal);
                    }
                }
                let compareValue;
                if (this.flippedKeys.includes(key)) {
                    compareValue = Math.min.apply(null, colorData);
                } else {
                    compareValue = Math.max.apply(null, colorData);
                }
                // Now we check if there are more elements with the same value, so they are all the highest...
                for (const wep in selectedWeapons.list) {
                    if (colorData[wep] == compareValue) {
                        colouredList[selectedWeapons.list[wep]][key] = "highest-value";
                    } else {
                        // otherwise, this is part of the lowest value group...
                        colouredList[selectedWeapons.list[wep]][key] = "lowest-value";
                    }
                }
                // otherwise, if each element is equal, we set its color to yellow
                if (colorData.every((val, i, arr) => val === arr[0])) {
                    for (const wep in selectedWeapons.list) {
                        let weapon = selectedWeapons.list[wep];
                        colouredList[weapon][key] = "equal-value";
                    }
                }
            }
            this.colourList = colouredList;
        },
        updateDetailedStats() {
            let selectedWeaponData = [];
            const detailedStats = {};
            for (let wep in selectedWeapons.list) {
                let wepName = selectedWeapons.list[wep];
                detailedStats[wepName] = {};
                detailedStats[wepName]["penetrationMultiplier"] = roundToThree(calculate.penetrationMultiplier(wepName));
                detailedStats[wepName]["roundsPerMinute"] = Math.round(calculate.roundsPerMinute(wepName));
                detailedStats[wepName]["adjustedRPM"] = Math.round(calculate.roundsPerMinuteReloadAdjusted(wepName));
                detailedStats[wepName]["damagePerSecond"] = Math.round(calculate.damagePerSecond(wepName));
                detailedStats[wepName]["adjustedDPS"] = Math.round(calculate.damagePerSecondReloadAdjusted(wepName));
                detailedStats[wepName]["damagePerMag"] = Math.round(calculate.damagePerMag(wepName));
                detailedStats[wepName]["timeToEmpty"] = roundToThree(calculate.totalTimeToEmptyMag(wepName));
                detailedStats[wepName]["shotsToKill"] = Math.round(calculate.shotsToKill(wepName));
                detailedStats[wepName]["timeToKill"] = roundToThree(calculate.timeToKill(wepName));
                detailedStats[wepName]["dmgPerBullet"] = roundToThree(calculate.damageOnBodyShot(wepName));
                detailedStats[wepName]["dmgPerBulletHS"] = roundToThree(calculate.damageOnWeakSpotShot(wepName));

                // shield shots to kill
                detailedStats[wepName]["noShield$%"] = Math.round(calculate.shotsToKill(wepName, 0, 0, "special"));
                detailedStats[wepName]["commonShield$%"] = Math.round(calculate.shotsToKill(wepName, armorData["Shield_01"]["armorAmount"], 0, "special"));
                detailedStats[wepName]["uncommonShield$%"] = Math.round(calculate.shotsToKill(wepName, armorData["Shield_02"]["armorAmount"], 0, "special"));
                detailedStats[wepName]["rareShield$%"] = Math.round(calculate.shotsToKill(wepName, armorData["Shield_03"]["armorAmount"], 0, "special"));
                detailedStats[wepName]["epicShield$%"] = Math.round(calculate.shotsToKill(wepName, armorData["Shield_04"]["armorAmount"], 0, "special"));
                detailedStats[wepName]["exoticShield$%"] = Math.round(calculate.shotsToKill(wepName, armorData["Shield_05"]["armorAmount"], 0, "special"));
                detailedStats[wepName]["legendaryShield$%"] = Math.round(calculate.shotsToKill(wepName, armorData["Shield_Altered_03"]["armorAmount"], 0, "special"));

                // Helmet shots to kill
                detailedStats[wepName]["noHelmet&%"] = Math.round(calculate.shotsToKill(wepName, 0, 100, "special"));
                detailedStats[wepName]["commonHelmet&%"] = Math.round(calculate.shotsToKill(wepName, helmetData["Helmet_01"]["armorAmount"], 100, "special"));
                detailedStats[wepName]["uncommonHelmet&%"] = Math.round(calculate.shotsToKill(wepName, helmetData["Helmet_02"]["armorAmount"], 100, "special"));
                detailedStats[wepName]["rareHelmet&%"] = Math.round(calculate.shotsToKill(wepName, helmetData["Helmet_03"]["armorAmount"], 100, "special"));
                detailedStats[wepName]["epicHelmet&%"] = Math.round(calculate.shotsToKill(wepName, helmetData["Helmet_04"]["armorAmount"], 100, "special"));
                detailedStats[wepName]["exoticHelmet&%"] = Math.round(calculate.shotsToKill(wepName, helmetData["Helmet_05"]["armorAmount"], 100, "special"));
                detailedStats[wepName]["legendaryHelmet&%"] = Math.round(calculate.shotsToKill(wepName, helmetData["Helmet_Altered_03"]["armorAmount"], 100, "special"));
                // a % indicates it is a special data set we want to filter out seperately later.
                // $ is armour, & is helmet
            }

            this.detailedStats = detailedStats;

            let colourListHolder = {};
            for (let key in detailedStats[selectedWeapons.list[0]]) {
                let detailedStatsData = [];
                for (let wep in selectedWeapons.list) {
                    detailedStatsData.push(detailedStats[selectedWeapons.list[wep]][key]);
                }
                let compareValue;
                if (this.flippedKeys.includes(key) || key.includes("%")) {
                    compareValue = Math.min.apply(null, detailedStatsData);
                } else {
                    compareValue = Math.max.apply(null, detailedStatsData);
                }
                // Now we check if there are more elements with the same value, so they are all the highest...
                for (let wep in selectedWeapons.list) {
                    if (detailedStatsData[wep] == compareValue) {
                        this.colourList[selectedWeapons.list[wep]][key] = "highest-value";
                    } else {
                        // otherwise, this is part of the lowest value group...
                        this.colourList[selectedWeapons.list[wep]][key] = "lowest-value";
                    }
                }
                // otherwise, if each element is equal, we set its color to yellow
                if (detailedStatsData.every((val, i, arr) => val === arr[0])) {
                    for (let wep in selectedWeapons.list) {
                        this.colourList[selectedWeapons.list[wep]][key] = "equal-value";
                    }
                }
            }
        },
        stat(weapon, stat) {
            return calculate.s(weapon, stat);
        },
        attachmentStat(weapon, stat) {
            // this function displays the stat change in the list
            let allEffects = attachment.getAttachmentEffects(weapon);
            let effect = allEffects[stat];
            if (!effect) return;
            if (effect["type"] == "Additive") {
                return "+ " + effect["value"] + " = " + this.stat(weapon, stat);
            }

            if (effect["type"] == "Multiplicitive_PreAdd") {
                let oldValue = this.weaponData[weapon][stat];
                let newValue = this.stat(weapon, stat);
                let change = roundToThree(newValue - oldValue);
                let modPercentage = Math.round((effect["value"] - 1) * 100);
                if (stat == "ammoInClip") {
                    return (change > 0 ? "+" + Math.round(change) : Math.round(change)) + " (" + (modPercentage > 0 ? "+" + modPercentage : modPercentage) + "%) = " + Math.round(this.stat(weapon, stat));
                }
                return (change > 0 ? "+" + change : change) + " (" + (modPercentage > 0 ? "+" + modPercentage : modPercentage) + "%) = " + this.stat(weapon, stat);
            }

            if (effect["type"] == "Override") {
                return "→ " + effect["value"] + " = " + this.stat(weapon, stat);
            }
        },
    },
    watch: {
        selectedWeapons: {
            deep: true,
            handler() {
                this.updateColourList();
                this.updateDetailedStats();
                penetrationChart();
                falloffChart();
            },
        },
        selectedAttachments: {
            deep: true,
            handler() {
                this.updateColourList();
                this.updateDetailedStats();
                penetrationChart();
                falloffChart();
            },
        },
        selectedTarget: {
            deep: true,
            handler() {
                this.updateDetailedStats();
                penetrationChart();
            },
        },
        selectedArmor: {
            deep: true,
            handler() {
                this.updateDetailedStats();
                penetrationChart();
            },
        },
        selectedHSValue: {
            deep: true,
            handler() {
                this.updateDetailedStats();
            },
        },
        selectedDistance: {
            deep: true,
            handler() {
                this.updateDetailedStats();
                falloffChart();
            },
        },
        selectedWeakspotValue: {
            deep: true,
            handler() {
                this.updateDetailedStats();
            },
        },
    },
    mounted() {
        this.updateColourList();
        this.updateDetailedStats();
    },
};
</script>

<style scoped>
.table-container {
    display: flex;
    flex-direction: row;
    flex: none;
    position: relative;
}

.inner-container {
    display: flex;
    flex-direction: row;
    flex: none;
    height: fit-content;
    max-width: 60vw;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    border-collapse: collapse;
}
.inner-container > div {
    scroll-snap-align: start;
}
.flex-item {
    border: 1px solid var(--border-color-base);
    border-bottom: none;
    border-right: none;
    padding: var(--space-md);
    width: fit-content;
    -webkit-flex: none;
    flex: none;
    max-width: 20rem;
}
.flex-item:last-of-type {
    border-right: 1px solid var(--border-color-base);
}
.flex-item p,
.flex-item h2 {
    white-space: nowrap;
}
.flex-item h2 {
    border-bottom: 1px solid var(--border-color-base);
    margin-bottom: var(--space-sm);
}
.flex-item span {
    color: var(--color-base);
}

.flex-item p:nth-child(even) {
    background-color: var(--color-surface-4);
}
.highest-value {
    color: var(--rarity-color-uncommon) !important;
}
.highest-value::before {
    color: var(--rarity-color-uncommon) !important;
    content: "▲ ";
    font-size: 0.8rem;
}
.lowest-value {
    color: var(--rarity-color-exotic) !important;
}
.lowest-value::before {
    content: "▼ ";
    font-size: 0.8rem;
    color: var(--rarity-color-exotic) !important;
}
.equal-value {
    color: var(--rarity-color-legendary) !important;
}
.equal-value::before {
    color: var(--rarity-color-legendary) !important;
    content: "◆ ";
    font-size: 0.8rem;
}
.modified {
    text-decoration: underline;
}
.weapon-image {
    height: 1.8rem;
    display: inline;
}
.button-container {
    width: 12rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: var(--space-md);
    margin: auto;
    margin-top: var(--space-md);
}

.delete-button {
    display: flex;
    justify-content: center;
    margin-top: var(--space-md);
}
.delete-button button {
    background-color: var(--rarity-color-exotic);
    border: none;
    padding: 0.2rem;
}
.stats-wrapper {
    transition: max-height 0.19s linear;
    max-height: 1500px;
}
.collapsed {
    max-height: 0px;
    overflow: hidden;
}
.collapse-button {
    float: right;
    cursor: pointer;
    width: 20px;
    height: 100%;
}
svg {
    fill: var(--rarity-color-uncommon);
}
.small {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
}

.small span {
    --rarity-color-epic: #9d78c0;
    color: var(--clr) !important;
}
h2 span {
    font-size: 16px;
    font-weight: bolder;
    font-family: Rajdhani, ui-sans, system-ui, Helvetica, Arial, sans-serif;
    color: var(--text-color-body-white);
}

</style>