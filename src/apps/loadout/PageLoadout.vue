<template>
    <div class="loadoutPage">
        <div class="settings">
            <h2>Rarity Range</h2>
            <div class="sliders">
                <div class="label left">
                    <label>Min: {{ Object.keys(rarityInfo)[minRarity] }}</label>
                    <img :src="`/calc-images/${rarityInfo[Object.keys(rarityInfo)[minRarity]]}.png`" />
                </div>
                <div class="slider">
                    <input id="minRaritySlider" :class="minRarity == maxRarity ? 'smallMin' : ''" type="range" min="0" max="5" v-model="minRarity" />
                    <input id="maxRaritySlider" :class="minRarity == maxRarity ? 'smallMax' : ''" type="range" min="0" max="5" v-model="maxRarity" />
                </div>
                <div class="label">
                    <img :src="`/calc-images/${rarityInfo[Object.keys(rarityInfo)[maxRarity]]}.png`" />
                    <label>Max: {{ Object.keys(rarityInfo)[maxRarity] }}</label>
                </div>
            </div>
            <div class="checkboxes">
                <div class="checkbox">
                    <input type="checkbox" name="weapons" v-model="alwaysGetWeapons" />
                    <p>Always get 2 weapons</p>
                </div>
                <div class="checkbox">
                    <input type="checkbox" name="armor" v-model="alwaysGetArmor" />
                    <p>Always get armor</p>
                </div>
                <div class="slider">
                    <p>Amount of consumables: {{ consumableAmount }}</p>
                    <input id="consumableSlider" type="range" min="0" max="5" v-model="consumableAmount" />
                </div>
            </div>
            <div class="buttons">
                <button @click.prevent="RandomLoadout()">Generate</button>
                <button @click.prevent="ShareLoadout()">Share</button>
            </div>
        </div>
        <div class="loadout">
            <img id="inventory" src="/loadout-images/Inventory.png" />
            <div class="weapon" v-tooltip="{content: weapons[0].ign}" id="Weapon1" v-if="weapons[0]" :style="`background-image: url('/loadout-images/Rarity/${weapons[0].rarity}_Weapon.png');`">
                <img :src="`/loadout-images/Weapons/${weapons[0].img}.png`" />
            </div>
            <div class="weapon" v-tooltip="{content: weapons[1].ign}" id="Weapon2" v-if="weapons[1]" :style="`background-image: url('/loadout-images/Rarity/${weapons[1].rarity}_Weapon.png');`">
                <img :src="`/loadout-images/Weapons/${weapons[1].img}.png`" />
            </div>
            <div class="gear">
                <img id="backpack" v-if="backpack" v-tooltip="{content: backpack.ign}" :src="`/loadout-images/Backpacks/${backpack.img}.png`" :style="`background-image: url('/loadout-images/Rarity/${backpack.rarity}.png');`" />
                <img id="shield" v-if="shield" v-tooltip="{content: shield.ign}" :src="`/loadout-images/Armor/${shield.img}.png`" :style="`background-image: url('/loadout-images/Rarity/${shield.rarity}.png');`" />
                <img id="helmet" v-if="helmet" v-tooltip="{content: helmet.ign}" :src="`/loadout-images/Armor/${helmet.img}.png`" :style="`background-image: url('/loadout-images/Rarity/${helmet.rarity}.png');`" />
            </div>
            <div class="items">
                <div class="item" v-tooltip="{content: item.ign}" v-for="item in items">
                    <img :src="`/loadout-images/${item.img}.png`" :style="`background-image: url('/loadout-images/Rarity/${item.rarity}.png');`" />
                    <p>{{ item.amount }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useToast} from "vue-toastification";
const toast = useToast();
import {GenerateRandomLoadout, GetRarity} from "./loadout";
export default defineComponent({
    data() {
        return {
            //Loadout
            weapons: [] as {img: string; ign: string; rarity: string}[],
            backpack: {} as {img: string; ign: string; rarity: string} | null,
            shield: {} as {img: string; ign: string; rarity: string} | null,
            helmet: {} as {img: string; ign: string; rarity: string} | null,
            items: [] as {img: string; amount: number; ign: string; rarity: string}[],
            //Settings
            minRarity: 0,
            maxRarity: 4,
            consumableAmount: 2,
            alwaysGetWeapons: true,
            alwaysGetArmor: true,
            rarityInfo: {
                Common: "Helmet_Common",
                Uncommon: "Helmet_Uncommon",
                Rare: "Helmet_Rare",
                Epic: "Helmet_Epic",
                Exotic: "Helmet_Exotic",
                Legendary: "Helmet_Legendary",
            } as any,
        };
    },
    methods: {
        RandomLoadout: function () {
            this.ResetLoadout();
            let newData = GenerateRandomLoadout(this.minRarity, this.maxRarity, this.consumableAmount, this.alwaysGetWeapons, this.alwaysGetArmor);
            this.weapons = newData.weapons;
            this.backpack = newData.backpack;
            this.shield = newData.shield;
            this.helmet = newData.helmet;
            this.items = newData.items;
            window.history.replaceState({}, document.title, "/loadout");
        },
        ResetLoadout: function () {
            this.weapons = [];
            this.backpack = null;
            this.shield = null;
            this.helmet = null;
            this.items = [];
        },
        ShareLoadout: function () {
            let shareString = "?";
            console.log(this.weapons);
            //Weapons
            shareString += "weapon=" + this.weapons[0].img;
            if (this.weapons.length == 2) shareString += "&weapon=" + this.weapons[1].img;
            //Items
            this.items.forEach((item) => {
                shareString += "&item=" + item.img + "-" + item.amount;
            });
            //Gear
            if (this.helmet) shareString += "&helmet=" + this.helmet.img;
            if (this.shield) shareString += "&shield=" + this.shield.img;
            if (this.backpack) shareString += "&backpack=" + this.backpack.img;

            //Replace spaces
            shareString = shareString.replace(/ /g, "_");

            //Copy to clipboard
            navigator.clipboard.writeText(document.baseURI + shareString);
            window.history.replaceState({}, document.title, "/loadout" + shareString);
            toast.success("Link copied to clipboard", {timeout: 3000});
        },
        getLoadoutFromURL: function () {
            //Get loadout values from URL
            let params = new URLSearchParams(location.search);
            let weapons = params.getAll("weapon");
            let rawItems = params.getAll("item");
            let items = [];
            let itemNumbers = [];
            for (let i = 0; i < rawItems.length; i++) {
                items.push(rawItems[i].split("-")[0]);
                itemNumbers.push(rawItems[i].split("-")[1]);
            }
            let helmet = params.get("helmet");
            let shield = params.get("shield");
            let backpack = params.get("backpack");
            //window.history.replaceState({}, document.title, '/');
            //Set loadout values
            if (weapons.length == 0 && items.length == 0) {
                this.RandomLoadout();
            } else {
                for (let i = 0; i < weapons.length; i++) {
                    let weapon = weapons[i].split("_").join(" ");
                    this.weapons.push({img: weapon, ign: weapon, rarity: GetRarity(weapon)});
                }
                for (let i = 0; i < items.length; i++) {
                    let item = items[i].split("_").join(" ");
                    let ign = item.replace("Consumables/", "");
                    if (ign.includes("Ammo")) ign = ign.replace("Ammo/", "") + " Ammo";
                    if (ign.includes("Grenade")) ign = ign.replace("Grenade", "") + " Grenade";
                    if (ign.includes("Medkit")) ign = ign.replace("Medkit", "") + " Medkit";
                    if (ign.includes("Stim")) ign = ign.replace("Stim", "") + " Stim";
                    this.items.push({img: item, amount: parseInt(itemNumbers[i]), ign: ign, rarity: GetRarity(item.split("/")[1])});
                }
                if (helmet) this.helmet = {img: helmet, ign: helmet.replace("Helmet_", "").split("_").join(" ") + " Helmet", rarity: GetRarity(helmet)};
                if (shield) this.shield = {img: shield, ign: shield.replace("Shield_", "").split("_").join(" ") + " Shield", rarity: GetRarity(shield)};
                if (backpack) this.backpack = {img: backpack, ign: backpack.split("_").join(" ") + " Backpack", rarity: GetRarity(backpack)};
            }
        },
    },
    watch: {
        minRarity: function (newVal) {
            if (newVal > this.maxRarity) this.minRarity = this.maxRarity;
        },
        maxRarity: function (newVal) {
            if (newVal < this.minRarity) this.maxRarity = this.minRarity;
        },
    },
    mounted() {
        this.ResetLoadout();
        this.getLoadoutFromURL();
    },
});
</script>

<style scoped>
.loadoutPage {
    width: 100%;
    height: 100%;
    margin: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    padding: 1rem;
}
/* SETTINGS */
.settings {
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 1rem;
    padding: 1rem;
}
.buttons {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 1rem;
    gap: 1em;
    font-size: 2rem;
}
.button {
    min-width: 25%;
    height: 80%;
    margin: 2rem;
}
.sliders {
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 1rem;
}
.sliders .label {
    width: 30%;
    height: 30%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.sliders label {
    width: 25%;
    text-align: left;
}
.sliders label.left {
    text-align: right;
}
.sliders img {
    width: 4rem;
}
.slider {
    width: 40%;
    min-width: 10rem;
    height: 50%;
    position: relative;
}
.slider input {
    width: 100%;
    top: 25%;
    position: absolute;
    pointer-events: none;
}
.slider input::-webkit-slider-thumb {
    cursor: pointer;
    pointer-events: auto;
}
.smallMax::-webkit-slider-thumb {
    height: 0.8rem;
    margin-top: -0.5rem;
}
.smallMin::-webkit-slider-thumb {
    height: 0.8rem;
    margin-top: 0.7rem;
}
#maxRaritySlider {
    background: none;
}
.checkboxes {
    position: relative;
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    margin: 1rem;
}
.checkbox {
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0.5rem;
}
.checkbox p {
    text-align: left;
    width: 80%;
}
.checkboxes .slider {
    height: 25%;
    width: 75%;
    text-align: center;
}
.checkboxes .slider input {
    position: relative;
}

/* LOADOUT */
.loadout {
    max-width: 100%;
    height: 100%;
    position: relative;
    display: block;
}
#inventory {
    width: auto;
    height: 87.5%;
    display: block;
}
.weapon {
    position: absolute;
    left: 52.5%;
    width: 45%;
    height: 15%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.weapon img {
    position: relative;
    width: auto;
    height: 100%;
    padding: 1%;
}
#Weapon1 {
    top: 8.5%;
}
#Weapon2 {
    top: 25.4%;
}

.gear {
    position: absolute;
    left: 52.5%;
    top: 45.2%;
    width: 45%;
    height: 13.5%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
}
.gear img {
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    width: 33.3%;
    height: 100%;
    padding: 2%;
    margin: 1%;
    margin-top: 0%;
}
#backpack {
    margin-left: 0;
}

.items {
    position: absolute;
    width: 46%;
    height: 71%;
    left: 2.25%;
    bottom: 3%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
}

.item {
    position: relative;
    width: 31.33%;
    margin: 1%;
    margin-bottom: 1.5%;
}

.item img {
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    padding: 10%;
}

.item p {
    position: absolute;
    bottom: 5%;
    right: 10%;
    text-align: right;
    font-family: "Noto Sans", sans-serif;
    color: white;
    font-size: 1.5vh;
}

@media screen and (max-width: 1100px) {
    .loadoutPage {
        flex-direction: column;
        align-items: center;
    }
    .settings {
        width: 85%;
        min-height: 30vh;
        margin: 0;
    }
    .buttons {
        width: 100%;
        height: 20%;
    }
    .button {
        min-width: 50%;
        height: 20%;
    }
    .sliders {
        width: 100%;
        height: 12vh;
        flex-direction: column;
    }
    .sliders .label {
        width: 75%;
        justify-content: center;
        flex-direction: row-reverse;
    }
    .sliders .left {
        flex-direction: row;
    }
    .sliders label {
        text-align: center;
        width: 50%;
    }
    .sliders label.left {
        text-align: center;
    }
    .slider {
        width: 80%;
        height: 100%;
    }
    .checkboxes {
        width: 100%;
        height: 35%;
        flex-wrap: nowrap;
    }
    .checkboxes .slider {
        width: 80%;
    }
    .checkbox {
        width: 50%;
        height: 20%;
    }
    .item p {
        font-size: 1.5vw;
    }
}
</style>
