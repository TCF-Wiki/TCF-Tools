<template>
    <h1 class="title">The Cycle: Frontier - Random Loadout Generator</h1>
    <div class="buttons">
        <button class="loadoutBtn" @click.prevent="RandomLoadout()">Generate new loadout</button>
        <button class="loadoutBtn" @click.prevent="ShareLoadout(true)">Share loadout</button>
        <span class="popup" id="sharePopup">Link copied to clipboard</span>
    </div>
    <div class="loadout">
        <img class="loadout-image" src="/loadout-images/Inventory.png" />
        <img class="weaponImg" id="Weapon1" src="/loadout-images/None.png" />
        <img class="weaponImg" id="Weapon2" src="/loadout-images/None.png" />
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
    margin: 10px;
}

.loadoutBtn {
    width: 15vw;
    height: 100%;
    background-color: #2faae7;
    border-radius: 0.3em;
    margin: 10px;
    text-transform: uppercase;
    font-size: 1vw;
    font-family: 'Noto Sans', sans-serif;
}

.loadoutBtn:hover {
    background-color: #1a7eb1;
    cursor: pointer;
}

.loadoutBtn:active {
    background-color: #0c6794;
    font-size: 1.01vw;
}

.loadout {
    max-width: 100%;
    margin-bottom: 5vh;
    position: relative;
}
.loadout-image {
    width: auto;
    height: 87.5vh;
}
.weaponImg {
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    object-fit: cover;
    left: 52.5%;
    width: 45%;
    height: 15%;
}
#Weapon1 {
    top: 8.5%;
}
#Weapon2 {
    top: 25.4%;
}

.gearImg {
    position: absolute;
    background-size: cover;
    background-repeat: no-repeat;
    top: 45.2%;
    width: 14.5%;
}
#backpack {
    left: 52.5%;
}
#shield {
    left: 67.75%;
}
#helmet {
    left: 83%;
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
    width: 31%;
    padding: 1%;
}

.itemImg {
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
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
