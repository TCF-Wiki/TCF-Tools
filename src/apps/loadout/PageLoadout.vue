<template>
    <div class="loadoutPage">
        <div class="settings">
            <div class="buttons">
                <button class="button" @click.prevent="RandomLoadout()">Generate</button>
                <button class="button" @click.prevent="ShareLoadout(true)">Share</button>
            </div>
        </div>
        <div class="loadout">
            <img id="inventory" src="/loadout-images/Inventory.png" />
            <div class="weapon" id="Weapon1" v-if="weapons[0]" :style="`background-image: url('/loadout-images/${weapons[0].rarity}_Weapon.png');`">
                <img :src="`/loadout-images/${weapons[0].img}.png`"/>
            </div>
            <div class="weapon" id="Weapon2" v-if="weapons[1]" :style="`background-image: url('/loadout-images/${weapons[1].rarity}_Weapon.png');`">
                <img :src="`/loadout-images/${weapons[1].img}.png`"/>
            </div>
            <div class="gear">
                <img id="backpack" :src="`/loadout-images/${backpack.img}.png`" :style="`background-image: url('/loadout-images/${backpack.rarity}.png');`" />
                <img id="shield" :src="`/loadout-images/${shield.img}.png`" :style="`background-image: url('/loadout-images/${shield.rarity}.png');`" />
                <img id="helmet" :src="`/loadout-images/${helmet.img}.png`" :style="`background-image: url('/loadout-images/${helmet.rarity}.png');`" />
            </div>
            <div class="items">
                <div class="item" v-for="item in items" >
                    <img :src="`/loadout-images/${item.img}.png`" :style="`background-image: url('/loadout-images/${item.rarity}.png');`"/>
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
            weapons: [] as {img: string, rarity: string}[],
            backpack: {} as {img: string, rarity: string},
            shield: {} as {img: string, rarity: string},
            helmet: {} as {img: string, rarity: string},
            items: [] as {img: string, amount: number, rarity: string}[],
        };
    },
    methods: {
        RandomLoadout: function () {
            this.ResetLoadout();
            let newData = GenerateRandomLoadout();
            this.weapons = newData.weapons;
            this.backpack = newData.backpack;
            this.shield = newData.shield;
            this.helmet = newData.helmet;
            this.items = newData.items;
            this.ShareLoadout(false);
        },
        ResetLoadout: function () {
            this.weapons = [];
            this.backpack = {img: "None", rarity: "None"};
            this.shield = {img: "None", rarity: "None"};
            this.helmet = {img: "None", rarity: "None"};
            this.items = [];
        },
        ShareLoadout: function (copy: boolean) {
            let shareString = '?';
            shareString += 'weapon=' + this.weapons[0].img.replace(' ', '_');
            if (this.weapons[1]) shareString += '&weapon=' + + this.weapons[1].img.replace(' ', '_');
            this.items.forEach((item) => {
                shareString += '&item=' + item.img.replace(' ', '_') + '-' + item.amount;
            })
            if (this.helmet) shareString += '&helmet=' + this.helmet.img.replace(' ', '_');
            if (this.shield) shareString += '&shield=' + this.shield.img.replace(' ', '_');
            if (this.backpack) shareString += '&backpack=' + this.backpack.img.replace(' ', '_');

            if (copy) {
                navigator.clipboard.writeText(document.baseURI + shareString);
                window.history.replaceState({}, document.title, '/loadout' + shareString);
                toast.success('Link copied to clipboard', {timeout: 3000});
            } else {
                window.history.replaceState({}, document.title, '/loadout');
            }
        },
        getLoadoutFromURL: function () {
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
            if (weapons.length == 0 && items.length == 0) {
                this.RandomLoadout();
            } else {
                for (let i = 0; i < weapons.length; i++) {
                    this.weapons.push({img: weapons[i].replace('_', ' '), rarity: GetRarity(weapons[i].replace('_', ' '))});
                }
                for (let i = 0; i < items.length; i++) {
                    this.items.push({img: items[i].replace('_', ' '), amount: parseInt(itemNumbers[i]), rarity: GetRarity(items[i].replace('_', ' '))});
                }
                if (helmet) this.helmet = {img: helmet.replace('_', ' '), rarity: GetRarity(helmet.replace('_', ' '))};
                if (shield) this.shield = {img: shield.replace('_', ' '), rarity: GetRarity(shield.replace('_', ' '))};
                if (backpack) this.backpack = {img: backpack.replace('_', ' '), rarity: GetRarity(backpack.replace('_', ' '))};
            }
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
.buttons {
    width: 100%;
    height: 5%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 2rem;
}
.button {
    min-width: 15%;
    height: 100%;
    margin: 2rem;
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
</style>
