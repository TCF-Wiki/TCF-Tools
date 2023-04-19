<template>
    <header>
        <h2> Advanced mode </h2>
    </header>
    <section>
        <p> Enabling this mode allows the user to change fundamental things about the calculator. <br>Such as: adding a custom
            weapon, changing the health of a player, or changing how armor scales.</p>
            <p class="warning"> This feature is currently in beta. Issues? Let us know!</p>
        <label for="advanced-mode-toggle">Enable Advanced mode?</label>
        <input type="checkbox" id="advanced-mode-toggle" v-model="informationIsShown">
    </section>
    <Transition>
        <section v-if="informationIsShown">
            <section class="outer-container flex-section">
                <div>
                    <h3 class="header"> Basic player information </h3>
                    <table class="wikitable">
                        <thead>
                            <tr>
                                <th> Type </th>
                                <th> Value </th>
                                <th> Default </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> Maximum Health</td>
                                <td> <input type="number" min="0" v-model="targetData.PlayerDefault.health" step="1"></td>
                                <td> {{ targetDataCopy.PlayerDefault.health }}</td>
                            </tr>
                            <tr>
                                <td> Armor Scale Value</td>
                                <td> <input type="number" min="0" v-model="targetData.PlayerDefault.armorConstant"
                                        step="0.005"></td>
                                <td> {{ targetDataCopy.PlayerDefault.armorConstant }}</td>
                            </tr>
                            <tr>
                                <td> DMG Multiplier Minimum</td>
                                <td> <input type="number" min="0" v-model="targetData.PlayerDefault.minDamageReduction"
                                        step="0.05"></td>
                                <td> {{ targetDataCopy.PlayerDefault.minDamageReduction }}</td>
                            </tr>
                            <tr>
                                <td> DMG Multiplier Maximum</td>
                                <td> <input type="number" min="0" v-model="targetData.PlayerDefault.maxDamageReduction"
                                        step="0.05"></td>
                                <td> {{ targetDataCopy.PlayerDefault.maxDamageReduction }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <span> See <a href="https://thecyclefrontier.wiki/wiki/Penetration"> the wiki for more information.</a>
                    </span>

                </div>
                <div>
                    <h3 class="header"> Armor Values </h3>
                    <table class="wikitable">
                        <thead>
                            <tr>
                                <th> Type </th>
                                <th> Value </th>
                                <th> Default </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> No Armor </td>
                                <td> <input type="number" min="0" v-model="armorData.PlayerDefault.armorAmount"></td>
                                <td> {{ armorDataCopy.PlayerDefault.armorAmount }}</td>
                            </tr>
                            <tr>
                                <td> Common Armor </td>
                                <td> <input type="number" min="0" v-model="armorData.Shield_01.armorAmount"></td>
                                <td> {{ armorDataCopy.Shield_01.armorAmount }}</td>
                            </tr>
                            <tr>
                                <td> Uncommon Armor </td>
                                <td> <input type="number" min="0" v-model="armorData.Shield_02.armorAmount"></td>
                                <td> {{ armorDataCopy.Shield_02.armorAmount }}</td>
                            </tr>
                            <tr>
                                <td> Rare Armor </td>
                                <td> <input type="number" min="0" v-model="armorData.Shield_03.armorAmount"></td>
                                <td> {{ armorDataCopy.Shield_03.armorAmount }}</td>
                            </tr>
                            <tr>
                                <td> Epic Armor </td>
                                <td> <input type="number" min="0" v-model="armorData.Shield_04.armorAmount"></td>
                                <td> {{ armorDataCopy.Shield_04.armorAmount }}</td>
                            </tr>
                            <tr>
                                <td> Exotic Armor </td>
                                <td> <input type="number" min="0" v-model="armorData.Shield_05.armorAmount"></td>
                                <td> {{ armorDataCopy.Shield_05.armorAmount }}</td>
                            </tr>
                            <tr>
                                <td> Legendary Armor </td>
                                <td> <input type="number" min="0" v-model="armorData.Shield_Altered_03.armorAmount"></td>
                                <td> {{ armorDataCopy.Shield_Altered_03.armorAmount }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </section>
            <section class="outer-container">
                <div class="info-div">
                    <h3 class="header"> New Custom Weapon</h3>
                    <div>
                        <ul> Choose a weapon to base the custom weapon on. 
                            <li>The new weapon will have identical stats to the original weapon.</li> 
                            <li>You can change the stats of this new custom weapon to your liking.</li>
                            <li>The weapon will have the same attachments available as the original weapon.</li>
                            <li>For the sake of simplicity only stats which affect the calculations are shown.</li>
                            <li>It is recommended to base your custom weapon on a similar existing weapon.</li>
                        </ul>
                        <div class="container weapon-selector" @input="updateSelected">
                            <v-select v-model="selectedWeaponToCopy" :options="sortedData"
                                :reduce="sortedData => sortedData.codeName" label="inGameName"
                                placeholder="Select a weapon to base it on" />
                        </div>

                        <button @click="addNewWeapon"> Add custom weapon </button>
                    </div>
                </div>
            </section>
            <section class="outer-container">
                <div class="flex-section">
                    <div v-for="w in customWeapons">
                        <h3 class="header"> {{ weaponDataCustomCopy[w].inGameName }} </h3>
                            <button @click="updateData"> Update custom data </button>
                        <table class="wikitable">
                            <thead>
                                <tr>
                                    <th> Type </th>
                                    <th> Value </th>
                                    <th> Default </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="stat, key in weaponStatsCustom">
                                    <td> {{ stat }} </td>
                                    <td>
                                        <input v-if="textKeys.includes(key)" type="text"
                                            v-model="weaponDataCustomCopy[w][key]">
                                        <input v-else type="number" :step="getSteps(key)"
                                            v-model="weaponDataCustomCopy[w][key]">
                                    </td>
                                    <td> {{ weaponDataCopy[customAndOriginalWeapons[w]][key] }}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </section>
    </Transition>
</template>

<script>
import { defineComponent } from 'vue';
import { targetData, targetDataCopy, armorData, armorDataCopy, weaponData, weaponDataCopy } from '../data';
import { selectedWeapons, updateGlobalStateUtility } from '../store'
import { getWeaponList } from '../utils'
import { useToast } from 'vue-toastification';
const toast = useToast()
export default defineComponent({
    data() {
        return {
            informationIsShown: false,

            updateGlobalStateUtility,
            selectedWeapons,

            targetData,
            targetDataCopy,
            armorData,
            armorDataCopy,

            // our weapon data
            weaponData,
            // our original, not customised weapon data (deep copy)
            weaponDataCopy,
            // our original, not customised weapon data (deep copy)
            weaponDataCustomCopy: JSON.parse(JSON.stringify(weaponDataCopy)),

            sortedData: [],
            selectedWeaponToCopy: '',

            customWeapons: [],
            customWeaponIndex: 1,
            customAndOriginalWeapons: {},

            // these stats we allow to be changed on a weapon.
            weaponStatsCustom: {
                'inGameName': 'Name',
                'directDamage': 'Damage',
                'penetration': 'Penetration',
                'radialDamage': 'Radial Damage',
                'refireTime': 'Refire Time (s)',
                'spinupTime': 'Charge Up Time (s)',
                'reloadTime': 'Reload Time (s)',
                'ammoInClip': 'Magazine Size',
                'ammoPerBullet': 'Ammo Consumed Per Bullet',
                'amountOfBurst': 'Additional Burst Bullets',
                'burstInterval': 'Time between Burst Bullets (s)',
                'amountOfImmediateFires': 'Shotgun Pellet Amount',
                'weakDamageMultiplier': 'Player Headshot Multiplier',
                'FalloffMultiplier': 'Falloff Multiplier',
                'FalloffStart': 'Falloff Range Start (cm)',
                'FalloffEnd': 'Falloff Range End (cm)',
            },
            textKeys: [
                'inGameName',
                'faction'
            ]
        }
    },
    methods: {
        addNewWeapon() {
            if (!this.selectedWeaponToCopy) {
                toast.error("Please select a weapon to base this custom weapon on.", { timeout: 3000 })
                return;
            }

            // create a key name for this weapon
            let keyName = "CUSTOM_WPN_" + this.customWeaponIndex

            // make a copy of its data
            let data = { ...weaponData[this.selectedWeaponToCopy] }
            data.inGameName += " (Custom)"

            // set its data
            this.weaponDataCustomCopy[keyName] = data
            // increment our variable for the key name
            this.customWeaponIndex += 1

            this.customWeapons.push(keyName)
            this.customAndOriginalWeapons[keyName] = this.selectedWeaponToCopy
            this.updateData()
            selectedWeapons.toggleSelected(keyName)
        },
        getSteps(key) {
            // get the amount of steps our input type=number should have using the buttons
            if (['directDamage', 'radialDamage', 'penetration', 'ammoInClip', 'amountOfBurst', 'amountOfImmediateFires', 'buyValue', 'sellvalue', 'weight', 'factionRep'].includes(key)) return 1

            if (['refireTime', 'spinupTime', 'reloadTime', 'burstInterval', 'unequipTime', 'equipTime'].includes(key)) return 0.01

            if (['weakDamageMultiplier'].includes(key)) return 0.05

            if (['audibleRange', 'projectileSpeed'].includes(key)) return 50

            return 1
        },
        updateData() {
            for (let w in this.customWeapons) {
                weaponData[this.customWeapons[w]] = { ...this.weaponDataCustomCopy[this.customWeapons[w]] }
            }

            toast.info("Successfully updated the data.")
        }
    },
    mounted() {
        this.sortedData = getWeaponList()
    },
    watch: {
        armorData: {
            deep: true,
            handler() {
                updateGlobalStateUtility.update()
            }
        },
        targetData: {
            deep: true,
            handler() {
                updateGlobalStateUtility.update()
            }
        },
        weaponData: {
            deep: true,
            handler() {
                updateGlobalStateUtility.update()
            }
        }
    }
})

</script>

<style scoped>
button {
    background-color: var(--rarity-color-rare);
    padding: var(--space-sm) var(--space-md);
    margin: var(--space-sm);
    text-align: center;
}

button.delete {
    background-color: var(--color-destructive);
}

input[type=checkbox] {
    top: .4rem;
}

li {
    list-style-type: none;
}
header {
    margin: auto;
    border-bottom: 1px solid var(--border-color-base);
    width: 70%;
    text-align: center;
}

section {
    text-align: center;
}

.outer-container {
    display: block;
    
    padding-top: 1rem;
    margin-bottom: 1rem;
    
}

.flex-section {
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    margin: auto;
    justify-content: center;
    gap: 5rem;

}

.header {
    background-color: var(--color-surface-1);
    margin-bottom: var(--space-md);
    max-width: 50vw;
    margin: auto;
    margin-bottom: 1rem;
}

.weapon-selector {
    max-width: 30%;
    margin: 1rem auto;
}

.wikitable {
    border-collapse: collapse;
    margin: auto;
    width: 100%;
}

table.wikitable tr th,
table.wikitable th td,
table.wikitable tr td {
    font-size: unset;
}


table.wikitable {
    --color-base--subtle: #edeff0;
}

table.wikitable tr th,
table.wikitable tr td,
table.wikitable tbody tr th,
table.wikitable tbody tr td {
    padding: .2rem .4rem .2rem .4rem;
    margin: auto;
    vertical-align: middle;
    border: 1px solid var(--border-color-base)
}

table.wikitable tr td,
table.wikitable tbody tr td {
    text-align: left;
}

table.wikitable tr th,
table.wikitable tbody tr th {
    font-weight: bold;
    text-align: center;
    background-color: var(--color-surface-2);
}

:root.skin-citizen-light table.wikitable tr th,
:root.skin-citizen-light table.wikitable tbody tr th {
    color: var(--color-base)
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}</style>