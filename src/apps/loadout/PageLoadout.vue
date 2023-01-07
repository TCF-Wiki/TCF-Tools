<template>
    <div class="loadoutPage">
        <div class="settings">
            <div class="sliders">
                <label>Minimum rarity: {{ minRarityString }}</label>
                <div class="slider">
                    <input id="minRaritySlider" type="range" min="0" max="4" v-model="minRarity" />
                    <input id="maxRaritySlider"  :class="minRarity == maxRarity ? 'small' : '' " type="range" min="0" max="4" v-model="maxRarity" />
                </div>
                <label>Maximum rarity: {{ maxRarityString }}</label>
            </div>
            <div class="checkboxes">
                <div class="checkbox">
                    <input type="checkbox" name="weapons" v-model="alwaysGetWeapons">
                    <p>Always get 2 weapons</p>
                </div>
                <div class="checkbox">
                    <input type="checkbox" name="armor" v-model="alwaysGetArmor">
                    <p>Always get armor</p>
                </div>
                <div class="slider">
                    <p>Amount of consumables: {{ consumableAmount }}</p>
                    <input id="consumableSlider" type="range" min="0" max="5" v-model="consumableAmount" />
                </div>
            </div>
            <div class="buttons">
                <button class="button" @click.prevent="RandomLoadout()">Generate</button>
                <button class="button" @click.prevent="ShareLoadout()">Share</button>
            </div>
        </div>
        <div class="loadout">
            <img id="inventory" src="/loadout-images/Inventory.png" />
            <div class="weapon" id="Weapon1" v-if="weapons[0]" :style="`background-image: url('/loadout-images/Rarity/${weapons[0].rarity}_Weapon.png');`">
                <img :src="`/loadout-images/Weapons/${weapons[0].img}.png`"/>
            </div>
            <div class="weapon" id="Weapon2" v-if="weapons[1]" :style="`background-image: url('/loadout-images/Rarity/${weapons[1].rarity}_Weapon.png');`">
                <img :src="`/loadout-images/Weapons/${weapons[1].img}.png`"/>
            </div>
            <div class="gear">
                <img id="backpack" :src="`/loadout-images/Backpacks/${backpack.img}.png`" :style="`background-image: url('/loadout-images/Rarity/${backpack.rarity}.png');`" />
                <img id="shield" :src="`/loadout-images/Armor/${shield.img}.png`" :style="`background-image: url('/loadout-images/Rarity/${shield.rarity}.png');`" />
                <img id="helmet" :src="`/loadout-images/Armor/${helmet.img}.png`" :style="`background-image: url('/loadout-images/Rarity/${helmet.rarity}.png');`" />
            </div>
            <div class="items">
                <div class="item" v-for="item in items" >
                    <img :src="`/loadout-images/${item.img}.png`" :style="`background-image: url('/loadout-images/Rarity/${item.rarity}.png');`"/>
                    <p>{{ item.amount }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useToast} from 'vue-toastification';
const toast = useToast();
import {GenerateRandomLoadout, GetRarity} from './loadout';
export default defineComponent({
    data() {
        return {
            //Loadout
            weapons: [] as {img: string, rarity: string}[],
            backpack: {} as {img: string, rarity: string},
            shield: {} as {img: string, rarity: string},
            helmet: {} as {img: string, rarity: string},
            items: [] as {img: string, amount: number, rarity: string}[],
            //Settings
            minRarity: 0,
            maxRarity: 4,
            minRarityString: "Common",
            maxRarityString: "Exotic/Legendary",
            consumableAmount: 2,
            alwaysGetWeapons: true,
            alwaysGetArmor: true,
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
            window.history.replaceState({}, document.title, '/loadout');
        },
        ResetLoadout: function () {
            this.weapons = [];
            this.backpack = {img: "None", rarity: "None"};
            this.shield = {img: "None", rarity: "None"};
            this.helmet = {img: "None", rarity: "None"};
            this.items = [];
        },
        ShareLoadout: function () {
            let shareString = '?';
            console.log(this.weapons);
            //Weapons
            shareString += 'weapon=' + this.weapons[0].img;
            if (this.weapons.length == 2) shareString += '&weapon=' + this.weapons[1].img;
            //Items
            this.items.forEach((item) => {
                shareString += '&item=' + item.img + '-' + item.amount;
            })
            //Gear
            if (this.helmet) shareString += '&helmet=' + this.helmet.img;
            if (this.shield) shareString += '&shield=' + this.shield.img;
            if (this.backpack) shareString += '&backpack=' + this.backpack.img;

            //Replace spaces
            shareString = shareString.replace(/ /g, '_');

            //Copy to clipboard
            navigator.clipboard.writeText(document.baseURI + shareString);
            window.history.replaceState({}, document.title, '/loadout' + shareString);
            toast.success('Link copied to clipboard', {timeout: 3000});
        },
        getLoadoutFromURL: function () {
            //Get loadout values from URL
            let params = new URLSearchParams(location.search);
            let weapons = params.getAll('weapon');
            let rawItems = params.getAll('item');
            let items = [];
            let itemNumbers = [];
            for (let i = 0; i < rawItems.length; i++) {
                items.push(rawItems[i].split('-')[0]);
                itemNumbers.push(rawItems[i].split('-')[1]);
            }
            let helmet = params.get('helmet');
            let shield = params.get('shield');
            let backpack = params.get('backpack');
            //window.history.replaceState({}, document.title, '/');
            //Set loadout values
            if (weapons.length == 0 && items.length == 0) {
                this.RandomLoadout();
            } else {
                for (let i = 0; i < weapons.length; i++) {
                    let weapon = weapons[i].split("_").join(" ");
                    this.weapons.push({img: weapon, rarity: GetRarity(weapon)});
                }
                for (let i = 0; i < items.length; i++) {
                    let item = items[i].split("_").join(" ");
                    this.items.push({img: item, amount: parseInt(itemNumbers[i]), rarity: GetRarity(item.split("/")[1])});
                }
                if (helmet) this.helmet = {img: helmet, rarity: GetRarity(helmet)};
                if (shield) this.shield = {img: shield, rarity: GetRarity(shield)};
                if (backpack) this.backpack = {img: backpack, rarity: GetRarity(backpack)};
            }
        },
    },
    watch: {
        minRarity: function (newVal) {
            if(newVal > this.maxRarity) this.minRarity = this.maxRarity;
            this.minRarityString = newVal == 4 ? "Exotic/Legendary" : newVal == 3 ? "Epic" : newVal == 2 ? "Rare" : newVal == 1 ? "Uncommon" : "Common";
        },
        maxRarity: function (newVal) {
            if(newVal < this.minRarity) this.maxRarity = this.minRarity;
            this.maxRarityString = newVal == 4 ? "Exotic/Legendary" : newVal == 3 ? "Epic" : newVal == 2 ? "Rare" : newVal == 1 ? "Uncommon" : "Common";
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
    margin: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
/* SETTINGS */
.settings {
    width: 75%;
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 2rem;
}
.buttons {
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 2rem;
}
.button {
    min-width: 25%;
    height: 40%;
    margin: 2rem;
}
.sliders {
    width: 75%;
    height: 20%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 2rem;
}
.sliders label {
    width: 25%;
    text-align: center;
}
.slider {
    width: 30%;
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
.small::-webkit-slider-thumb {
    width: 1.1rem;
    height: 1.1rem;
}
#maxRaritySlider {
    background: none;
}
.checkboxes {
    position: relative;
    width: 80%;
    height: 35%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    margin: 2rem;
}
.checkbox {
    width: 25%;
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
    width: 20%;
    text-align: center;
}
.checkboxes .slider input {
    position: relative;
}

@media screen and (max-width: 1100px) {
    .settings {
        width: 85%;
        height: 100%;
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
        height: 20%;
    }
    .sliders label {
        width: 100%;
    }
    .slider {
        width: 80%;
        height: 50%;
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
}


/* LOADOUT */
.loadout {
    max-width: 100%;
    margin-bottom: 5vh;
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
    font-family: 'Noto Sans', sans-serif;
    color: white;
    font-size: 1.5vh;
}

@media screen and (max-width: 1100px) {
    .item p {
        font-size: 1.5vw;
    }
}
</style>
