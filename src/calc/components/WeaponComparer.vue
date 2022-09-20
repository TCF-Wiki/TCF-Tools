<template> 
<section class="table-container"> 
    <div class="flex-item header-row">
        <h2> Stats </h2>
        <p v-for="(value, key) in filter(weaponData['WP_A_Pistol_Bullet_01'])">
            <span> {{ keyNames[key] }} </span>
        </p>
        <h2> Detailed Stats </h2>
        <p>
            <span> Penetration Multiplier </span>
        </p>
        <p>
            <span> Rounds Per Minute </span>
        </p>
        <p>
            <span> Reload Adjust RPM </span>
        </p>
        <p>
            <span> Damage Per Second </span>
        </p>
        <p>
            <span> Reload Adjusted DPS </span>
        </p>
        <p>
            <span> Damage Per Mag </span>
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
    </div>
    <div class="inner-container">
        <div v-for="weapon in selectedWeapons.list" class="flex-item">
            <h2> {{ weaponData[weapon]['inGameName'] }} <img class="weapon-image" :src=" 'calc-images/' + weaponData[weapon]['inGameName'] + '.png'"> </h2>
            <p v-for="(value, key) in filter(weaponData[weapon])">
                <span :class="colourClassGiver(key, weapon)"> {{ value }} {{attachmentStat(weapon, key)}}</span>
            </p>
            <h2> {{ weaponData[weapon]['inGameName'] }} <img class="weapon-image" :src=" 'calc-images/' + weaponData[weapon]['inGameName'] + '.png'"> </h2>
            <p v-for="(value, key) in detailedStats[weapon]"> 
                <span :class="colourClassGiver(key, weapon)"> {{ value }} </span>
            </p>
            <AttachmentSelector 
            :weapon="weapon"
            />
            <BodyChart 
            :weapon="weapon"
            />
        </div>
    </div>
</section>
</template>

<script> 
import { selectedWeapons, selectedArmor, selectedTarget, selectedHSValue, selectedDistance, selectedAttachments } from '../store';
import { weaponData as wepData} from '../data';
import { keyObject, detailedKeyObject, flippedKeys as flippedKeysData, roundToThree } from '../utils';
import { calculate } from '../calculate';
import { attachment } from '../attachment';
import { penetrationChart, falloffChart } from '../charts';

import AttachmentSelector from './AttachmentSelector.vue'
import BodyChart from './BodyChart.vue';

export default {
    components : {
        AttachmentSelector,
        BodyChart
    },
    data() {
        return {
            selectedWeapons,
            selectedArmor,
            selectedTarget,
            selectedHSValue,
            selectedDistance,
            selectedAttachments,
            weaponData: wepData,
            keyNames: keyObject,
            detailedKeyNames: detailedKeyObject,
            flippedKeys: flippedKeysData,
            compareData: [],
            colourList: {},
            detailedStats: {}
        }
    },
    methods : {
        colourClassGiver(key, weapon) {
            let effects = attachment.getAttachmentEffects(weapon)
            let output = '';
            if (effects[key]) {
                output += 'modified '
            }
            if (this.colourList[weapon] ) {
                output += this.colourList[weapon][key]
            }
            return output
        },
        filter(data) {

            let filteredData = {};
            for (let x in data) {
                if (typeof(data[x]) == 'object') continue
                if (x == 'inGameName') continue
                filteredData[x] = data[x]
            }
            return filteredData;
        },
        updateColourList() {
            // This function will figure out if a row should be colourable or not
            const selectedWeaponData = [];
            const colouredList = {};

            for (let wep in selectedWeapons.list) {
                selectedWeaponData.push(this.weaponData[selectedWeapons.list[wep]])
                colouredList[selectedWeapons.list[wep]] = {}
            }

            // we need to find the highest value of each key in the data. We iterate over the first item in our guns to find which key to use
            // then create an object which holds if it is bigger or smaller...
            for (const key in selectedWeaponData[0]) {
                const value = calculate.s(selectedWeapons.list[0],key);
                if (typeof(value) != 'number') continue;

                let colorData = []; 
                for (const wep in selectedWeapons.list) {
                    const tempVal = calculate.s(selectedWeapons.list[wep], key)
                    if (typeof(tempVal) == 'number') {
                        colorData.push(tempVal)
                    }
                }

                let compareValue;
                if (this.flippedKeys.includes(key)) {
                    compareValue = Math.min.apply(null, colorData) 
                } else {
                    compareValue = Math.max.apply(null, colorData) 
                }

                // Now we check if there are more elements with the same value, so they are all the highest...
                for (const wep in selectedWeapons.list) {
                    if (colorData[wep] == compareValue) {
                        colouredList[selectedWeapons.list[wep]][key] = 'highest-value'
                    } else {
                        // otherwise, this is part of the lowest value group...
                        colouredList[selectedWeapons.list[wep]][key] = 'lowest-value'
                    }
                    
                }

                // otherwise, if each element is equal, we set its color to yellow
                if (colorData.every( (val, i, arr) => val === arr[0] )) {
                    for (const wep in selectedWeapons.list) {
                        let weapon = selectedWeapons.list[wep];
                        colouredList[weapon][key] = 'equal-value'

                    }
                }


            }
            

            this.colourList = colouredList;
        },
        updateDetailedStats() {
            let selectedWeaponData = [];
            const detailedStats = {};
            for (let wep in selectedWeapons.list) {
                let wepName = selectedWeapons.list[wep]
                detailedStats[wepName] = {};

                detailedStats[wepName]['penetrationMultiplier'] = roundToThree(calculate.penetrationMultiplier(wepName))
                detailedStats[wepName]['roundsPerMinute'] = Math.round(calculate.roundsPerMinute(wepName))
                detailedStats[wepName]['adjustedRPM'] = Math.round(calculate.adjustedRPM(wepName))
                detailedStats[wepName]['damagePerSecond'] = Math.round(calculate.damagePerSecond(wepName))
                detailedStats[wepName]['adjustedDPS'] = Math.round(calculate.adjustedDPS(wepName))
                detailedStats[wepName]['damagePerMag'] = Math.round(calculate.damagePerMag(wepName))
                detailedStats[wepName]['timeToEmpty'] = roundToThree(calculate.timeToEmpty(wepName))
                detailedStats[wepName]['shotsToKill'] = Math.round(calculate.shotsToKill(wepName))
                detailedStats[wepName]['timeToKill'] = roundToThree(calculate.timeToKill(wepName))

            }

            this.detailedStats = detailedStats

            let colourListHolder = {};
            for (let key in detailedStats[selectedWeapons.list[0]]) {
                let detailedStatsData = [];

                for (let wep in selectedWeapons.list) {
                    detailedStatsData.push(detailedStats[selectedWeapons.list[wep]][key])
                }

                let compareValue;
                if (this.flippedKeys.includes(key)) {
                    compareValue = Math.min.apply(null, detailedStatsData) 
                } else {
                    compareValue = Math.max.apply(null, detailedStatsData) 
                }

                // Now we check if there are more elements with the same value, so they are all the highest...
                for (let wep in selectedWeapons.list) {
                    if (detailedStatsData[wep] == compareValue) {
                        this.colourList[selectedWeapons.list[wep]][key] = 'highest-value'
                    } else {
                        // otherwise, this is part of the lowest value group...
                        this.colourList[selectedWeapons.list[wep]][key] = 'lowest-value'
                    }
                    
                }

                // otherwise, if each element is equal, we set its color to yellow
                if (detailedStatsData.every( (val, i, arr) => val === arr[0] )) {
                    for (let wep in selectedWeapons.list) {
                        this.colourList[selectedWeapons.list[wep]][key] = 'equal-value'
                    }
                }
            }
                
        },
        stat(weapon, stat) {
            return calculate.s(weapon, stat)
        },
        attachmentStat(weapon, stat) {
            // this function displays the stat change in the list
            let allEffects = attachment.getAttachmentEffects(weapon);
            let effect = allEffects[stat]
            if (!effect) return;
            if (effect['type'] == 'Additive') {
                return '+ ' + effect['value'] + ' = ' + this.stat(weapon, stat)
            } 

            if (effect['type'] == 'Multiplicitive_PreAdd') {
                let oldValue = this.weaponData[weapon][stat]
                let newValue = this.stat(weapon, stat);
                let change = roundToThree(newValue - oldValue)
                let modPercentage = Math.round((effect['value']-1)*100); 
                if (stat=='ammoInClip') {
                    return (change > 0 ? '+' + Math.round(change) : Math.round(change)) + ' (' +  (modPercentage > 0 ? '+' + modPercentage : modPercentage) + '%) = ' + Math.round(this.stat(weapon, stat))
                }
                return (change > 0 ? '+' + change : change) + ' (' +  (modPercentage > 0 ? '+' + modPercentage : modPercentage) + '%) = ' + this.stat(weapon, stat)
            }

            if (effect['type'] == 'Override') {
                return '→ ' + effect['value'] + ' = ' + this.stat(weapon, stat)
            }

            
        }
    },
    watch: {
        selectedWeapons: {
            deep: true,
            handler() {
                this.updateColourList();
                this.updateDetailedStats();
                penetrationChart()
                falloffChart()
            }
        },
        selectedAttachments: {
            deep: true,
            handler() {
                this.updateColourList();
                this.updateDetailedStats();
                penetrationChart()
                falloffChart()
            }
        },
        selectedTarget : {
            deep: true,
            handler() {
                this.updateDetailedStats();
                penetrationChart()
            }
        },
        selectedArmor : {
            deep: true,
            handler() {
                this.updateDetailedStats();
                penetrationChart()

            }
        },
        selectedHSValue : {
            deep: true,
            handler() {
                this.updateDetailedStats();
            }
        },
        selectedDistance : {
            deep: true,
            handler() {
                this.updateDetailedStats();
                falloffChart()
            }
        }
    },
    mounted() {
        this.updateColourList();
        this.updateDetailedStats();
    }
};

</script>

<style scoped>



.table-container {
    display: flex;
    flex-direction: row;
    flex: none;
    background-color: var(--background-body-color);
    position: relative;
}



.inner-container {
    display: flex;
    flex-direction: row;
    flex: none;
    height: fit-content;

    max-width: 50vw;
    overflow-x: auto;
}

.flex-item {
    border: 2px solid var(--primary-accent);
    padding: .5rem 2rem 2rem 2rem;
    width: fit-content;
    flex: none;
    -webkit-flex: none;
    line-height: 1.2;

}

.flex-item span {
    color: var(--text-color-body-white);
}

.flex-item p:nth-child(even) { 
    background-color: var(--background-stripe-color); 
}
.highest-value {
    color: green !important;
}

.highest-value::before {
    content: "▲ ";
    font-size: .8rem;
}
.lowest-value {
    color: red !important;
}

.lowest-value::before {
    content: "▼ ";
    font-size: .8rem;
}
.equal-value {
    color: yellow !important;
}
.equal-value::before {
    content: "◆ ";
    font-size: .8rem;

}
.modified {
    text-decoration: underline;
}

.weapon-image {
    height: 1.8rem;
    display: inline;
}
</style>

