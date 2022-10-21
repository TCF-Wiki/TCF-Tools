<template>
    <div class="loadoutPage">
        <h1 class="title">The Cycle: Frontier - Random Loadout Generator</h1>
        <div class="buttons">
            <button class="button loadoutBtn" @click.prevent="RandomLoadout()">Generate</button>
            <button class="button loadoutBtn" @click.prevent="ShareLoadout(true)">Share</button>
            <span class="popup" id="sharePopup">Link copied to clipboard</span>
        </div>
        <div class="loadout">
            <img class="loadout-image" src="/loadout-images/Inventory.png" />
            <div class="weapon" id="Weapon1">
                <img class="weaponImg" src="/loadout-images/None.png" />
            </div>
            <div class="weapon" id="Weapon2">
                <img class="weaponImg" src="/loadout-images/None.png" />
            </div>
            <div class="gear">
                <img class="gearImg" id="Backpack" src="/loadout-images/None.png" />
                <img class="gearImg" id="Shield" src="/loadout-images/None.png" />
                <img class="gearImg" id="Helmet" src="/loadout-images/None.png" />
            </div>
            <div class="items">
                <div class="Item">
                    <img class="itemImg" id="Item1" src="/loadout-images/None.png" />
                    <p class="itemNumber" id="Item1Number"></p>
                </div>
                <div class="Item">
                    <img class="itemImg" id="Item2" src="/loadout-images/None.png" />
                    <p class="itemNumber" id="Item2Number"></p>
                </div>
                <div class="Item">
                    <img class="itemImg" id="Item3" src="/loadout-images/None.png" />
                    <p class="itemNumber" id="Item3Number"></p>
                </div>
                <div class="Item">
                    <img class="itemImg" id="Item4" src="/loadout-images/None.png" />
                    <p class="itemNumber" id="Item4Number"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
// @ts-ignore
import {onLoad, ShareLoadout, RandomLoadout} from './loadout.js';
export default defineComponent({
    data() {},
    methods: {
        RandomLoadout: function () {
            RandomLoadout();
        },
        ShareLoadout: function (copy: boolean) {
            ShareLoadout(copy);
        },
    },
    mounted() {
        onLoad();
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
.title {
    width: 100%;
    text-align: center;
    font-size: 2vw;
    font-weight: bold;
    color: #ffffff;
    font-family: 'Lato', sans-serif;
}
.buttons {
    width: 100%;
    height: 5%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 2rem;
}

.loadoutBtn {
    min-width: 15%;
    height: 100%;
    margin: 2rem;
}

.loadout {
    max-width: 100%;
    margin-bottom: 5vh;
    position: relative;
    display: block;
}
.loadout-image {
    width: auto;
    height: 87.5%;
    display: block;
}
.weapon {
    position: absolute;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    left: 52.5%;
    width: 45%;
    height: 15%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.weaponImg {
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
.gearImg {
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    width: 33.3%;
    height: 100%;
    padding: 2%;
    margin: 1%;
    margin-top: 0%;
}
#Backpack {
    margin-left: 0;
}

#Helmet {
    margin-right: 0;
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
    justify-content: space-between;
    align-items: flex-start;
    align-content: flex-start;
}

.Item {
    position: relative;
    width: 31.33%;
    margin: 1%;
}

.itemImg {
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    padding: 10%;
}

.itemNumber {
    position: absolute;
    bottom: 5%;
    right: 10%;
    text-align: right;
    font-family: 'Noto Sans', sans-serif;
    color: white;
    font-size: 1.5vh;
}

/*Copy popup*/
.popup {
    position: absolute;
    opacity: 0;
    visibility: hidden;
    width: 15vw;
    text-align: center;
    padding: 0.5em;
    top: 2%;
    left: 41.5vw;
    background-color: #176e99;
    border-radius: 0.3em;
    margin: 10px;
    text-transform: uppercase;
    font-size: 1vw;
    font-family: 'Noto Sans', sans-serif;
}
.show {
    visibility: visible;
    animation: fade 2s;
    -webkit-animation: fade 2s;
}
@-webkit-keyframes fade {
    0% {
        opacity: 0;
    }
    45% {
        opacity: 1;
    }
    55% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
@keyframes fade {
    0% {
        opacity: 0;
    }
    45% {
        opacity: 1;
    }
    55% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>
