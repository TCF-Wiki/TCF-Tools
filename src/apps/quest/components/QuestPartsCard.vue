<template>
<section class="card" :style="{'--index': zIndex}" @click="isExpanded = true" :class="{expanded: isExpanded}" ref="card">
    <div class="card__image">
        <img 
            :src="'/quest-images/Parts/' + mission + '.png'" 
            :key="index"
            class="card__image-img"
        >
    </div>
    <div class="card__contents"> 
        <header class="card__header"> <h3 class="card__header-text"> {{}}</h3></header>
        <section class="card__desc">
            <div class="card__desc-text"> 
                {{ missionData[mission]['description'].replaceAll('"','') }}
            </div>
        </section>
        <section class="card__tasks">
            <header> <h3> <span> Objectives </span> </h3></header>
            <div v-for="t, i in missionData[mission]['objectives']" class="card__tasks-container">
                <img 
                    :src="'/map-images/item-images/' + taskImage(t) + '.png'"
                    class="card__tasks-image" 
                >
                <div> 
                    {{ taskText(t, mission, i) }}
                </div>
            </div>
        </section>
        <section class="card__rewards" :style="{'--length': orderedRewards(missionData[mission]['rewards']).length}">
            <div v-for="r in orderedRewards(missionData[mission]['rewards'])" class="card__rewards-container"
            v-tooltip="{ content: rewardImageNamer(r['item']), html: true }"> 
                <img  
                    :src="'/map-images/item-images/' + rewardImageNamer(r['item'], true) + '.png'" 
                    class="card__rewards-image"
                >
                <div> 
                    {{ currencyDisplay(r) }}
                </div>

                <div class="rewards__info">
                    Test
                </div>
            </div>
        </section>
        <div class="card__button" role="button" @click.stop.prevent="handleProgress()">
            <div class="card__button-text" :class="faction" >
                <svg  v-if="progressInfo.get()[faction][name] >= index+1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M211.8 339.8C200.9 350.7 183.1 350.7 172.2 339.8L108.2 275.8C97.27 264.9 97.27 247.1 108.2 236.2C119.1 225.3 136.9 225.3 147.8 236.2L192 280.4L300.2 172.2C311.1 161.3 328.9 161.3 339.8 172.2C350.7 183.1 350.7 200.9 339.8 211.8L211.8 339.8zM0 96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96zM48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80H64C55.16 80 48 87.16 48 96z"/></svg>          

                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM384 80H64C55.16 80 48 87.16 48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80z"/></svg>
            </div>
    </div>
        <!-- <div class="card__unlock"  :class="faction" v-if="missionData[m]['rewards'].length > 3">
            <img class="card__unlock-image" :src="'/map-images/item-images/' + rewardMaker(missionData[m]['rewards']) + '.png'">
        </div> -->
        <div class="card__parts" >  {{ index+1 }} </div>
    </div>
</section>
</template>
<script setup lang="ts">
import { ref } from 'vue'
/* @ts-ignore */
import { onClickOutside } from '@vueuse/core';

const isExpanded = ref(false)
const card = ref(null)
onClickOutside(card, () => (isExpanded.value = false))
</script>


<script lang="ts">
import  { defineComponent } from 'vue';
import { shieldData, backpackData, helmetData, itemData } from '../../forge/data'
import { stringTables, missionData } from '../data'
import { keyCardInfo } from '../../map/mapConstants'
import { locationNameManager, killCreatureOrPlayer } from '../utils'
import { factionProgress } from '../trackProgress';
import { missions } from '../QuestConstants';

export default defineComponent({
    props: ['zIndex','index','mission','faction','name'],
    data() {
        return {
            missions: missions,
            missionData: missionData,
            stringTable: stringTables['Objectives'],
            helmetData: helmetData,
            shieldData: shieldData,
            backpackData: backpackData,
            progressInfo: factionProgress
        }
    },
    methods: {
        handleProgress() : void {
            // This function handles the progress upon click of the part toggler.
            const currentProgress = this.progressInfo.get()[this.faction][this.name]

            // if the current progress is equal to the current part
            // progress starts at one, index at 0
            if (currentProgress == this.index + 1) {
                // then that means we click it and want to undo it, setting the current
                // progress to the card before it
                this.progressInfo.setPart(this.faction, this.name, this.index)
            } else {
                // otherwise, set it to the card we click
                this.progressInfo.setPart(this.faction, this.name, this.index+1)
            }
        },
        rewardImageNamer(reward: string, urlFormat = false) : string {
            // This function gets the name of the image when given an item name. Handles edge cases.
            let orig = reward
            if (reward.includes('SoftCurrency'))    reward = 'SoftCurrency'
            else if (reward.includes('Reputation')) reward =  `${this.faction}_Reputation`
            else if (reward.includes('Shield_'))    reward =  this.shieldData[reward]['ingamename']
            else if (reward.includes('Helmet_'))    reward = this.helmetData[reward]['ingamename']
            else if (reward.includes('Bag_'))       reward =  this.backpackData[reward]['ingamename']
            else if (reward.includes('ShockGrenade_02')) reward =  'Frag Grenade'
            else if (reward.includes('ICAScrip')) reward = "ICA Scrip"
            else if (reward.includes('OsirisScrip')) reward = "Osiris Scrip"
            else if (reward.includes('KorolevScrip')) reward = "Korolev Scrip"
            else if (reward.includes('HardDrive_common'))  reward = 'Data Drive Tier 1'
            else if (reward.includes('HardDrive_uncommon'))  reward = 'Data Drive Tier 2'
            else if (reward.includes('HardDrive_rare'))  reward = 'Data Drive Tier 3'
            else if (reward.includes('HardDrive_epic'))  reward = 'Data Drive Tier 4'
            else if (reward.includes('HardDrive_legendary'))  reward = 'Data Drive Tier 5'
            else if (reward.includes('KeyCard')) {
                if (reward.includes('Map01'))       reward = 'Bright_Sands_Key_Card'
                if (reward.includes('Map02'))       reward = 'Crescent_Falls_Key_Card'
                if (reward.includes('Map03'))       reward = 'Tharis_Island_Key_Card'
            } else {
                if (itemData[reward]) {
                    reward = itemData[reward]['ingamename']
                }
            }
            for (let key in keyCardInfo) {
                if (keyCardInfo[key]['name']==reward) {
                    if (key.includes('Map01')) reward = 'Bright_Sands_Key_Card'
                    if (key.includes('Map02')) reward = 'Crescent_Falls_Key_Card'
                    if (key.includes('Map03')) reward = 'Tharis_Island_Key_Card'
                }
            }
            if (reward.includes('Fusion Cartridge')) reward = 'Fusion_Cartridge_Batteries'
            if (reward.includes('OrbitalCanonTarget')) reward = 'Orbital_Cannon_Beacon'
            if (stringTables['Materials'][reward]) reward = stringTables['Materials'][reward]['name']

            if (urlFormat) return reward.split(' ').join('_').replace('#', '%23')
            
            if (reward.includes('Reputation')) reward =  'Reputation'
            if (reward.includes('SoftCurrency'))    reward = 'K-Marks'
            if (reward.includes('Key_Card')) reward = stringTables['Equipment']['Equip_Keys_' + orig.replace('KeyCard_','Key')]['name']

            return reward
        },
        currencyDisplay(r: any) : string {
            // Gets a string representing the reward amount for a mission
            if (r['item'] !=='SoftCurrency' || !r['item'].includes('Reputation')) {
                // save some space by shortening the text
                if (r['amount'] > 999) return (r['amount'] / 1000) + 'k'
            }
            return r['amount']
        },
        taskText(task : any, mission: string, index: number) : string {
            // This function returns the text for a task. Handles edge cases.
            const type = task['type']

            if (type=='OwnNumOfItem') {
                let item = task['itemToOwn']
                if (itemData[item]) {
                    return `Deliver ${task['maxProgress']} ${itemData[item]['ingamename']}`
                }

                if (stringTables['Materials'][item]) item = stringTables['Materials'][item]['name']
                item = item
                    .replace('HardDrive_uncommon','Data Drive Tier 2')
                    .replace('HardDrive_rare','Data Drive Tier 3')
                    .replace('HardDrive_epic','Data Drive Tier 4')
                    .replace('HardDrive_legendary','Data Drive Tier 5')
                    .replace('the Tharis Files','Gregor\'s Dossier')
                    .replace('Bag_Altered_01','Huge Forge Backpack')
                    
                    return `Deliver ${task['maxProgress']} ${item}`
            }

            if (type=='VisitArea') {

                let keys = Object.keys(this.stringTable)
                let newKeys : string[] = [];
                newKeys = keys.filter(a => a.toLowerCase().includes(mission.toLowerCase()))

                if (newKeys.length == 1) {
                    if (this.stringTable[newKeys[0]] !=='') {
                        let text =this.stringTable[newKeys[0]]
                        text.replace('the Tharis Files','Gregor\'s Dossier')

                        if (text) return this.stringTable[newKeys[0]]
                    }
                } else if (newKeys.length > 1) {
                    if (this.stringTable[newKeys[index]] !=='') {

                    return this.stringTable[newKeys[index]]
                        .replace('the Tharis Files','Gregor\'s Dossier')
                    }
                }

                let location = '';
                if (task['locationConditions']) location = locationNameManager(task['locationConditions'])
                return 'Visit ' + location
            }

            if (type=='Kills') {
                return killCreatureOrPlayer(task, this.faction)
            }
            if (type=='DeadDrop') {
                // find the corresponding stringtable for this task
                let keys = Object.keys(this.stringTable)

                let newKeys : string[] = [];
                newKeys = keys.filter(a => a.toLowerCase().includes(mission.toLowerCase()))

                if (newKeys.length == 1) {
                    let text = this.stringTable[newKeys[0]]
                    if (text.includes('Stash an')) return text
                    // add how many items you have to stash in the text
                    return text.replace('Stash ',`Stash ${task['maxProgress']} `)
                } else if (newKeys.length > 1) {
                    // Handle edge cases..
                    if (['Main-KOR-LetiumResearch-4','Main-KOR-Caverns-13','Main-ICA-GruntWork-5', 'Main-ICA-GruntWork-8'].includes(mission)) index = index-1

                    let text = this.stringTable[newKeys[index]]

                    // another edge case
                    if (mission == 'Main-ICA-MeteorReactor-5') text = this.stringTable[newKeys[newKeys.length-index-1]]
                    
                    if (text.includes('Stash an')) return text
                    
                    // Stringtable is incomplete T_T
                    if (mission == 'Main-ICA-OilPump-1') text += ' at Nutrion Office'

                    // Add how many items there are, plus handle another edge case
                    return text
                        .replace('Stash ',`Stash ${task['maxProgress']} `)
                        .replace('the Tharis Files','Gregor\'s Dossier')
                }
                return task['locationConditions']
            }

            return type
        },
        taskImage(task: any) {
            // This function gets the name of the image that shows in the tasks info
            const type = task['type']
            if (type=='OwnNumOfItem') {
                return this.rewardImageNamer(task['itemToOwn'], true).split('"').join('')
            }

            if (type=='VisitArea') {
                return 'VisitArea'
            }

            if (type=='Kills') {
                let killType = task['killConditions']['m_killTarget']

                if (killType.includes('Creatures')) return 'KillCreature'
                else return 'KillPlayer'
            }

            return type
        },
        orderedRewards(rewardList: any) : any {
            // this function orders the rewards for this card as they are in game.
            let newList : any = []

            for (let r in rewardList) {
                if (rewardList[r]['item'] === 'SoftCurrency') {
                    newList.splice(0, 0, rewardList[r])
                } else if (rewardList[r]['item'].includes('Reputation')) {
                    newList.splice(1, 0, rewardList[r])
                } else if (rewardList[r]['item'].includes('Scrip')) {
                    newList.splice(2, 0, rewardList[r])
                } else {
                    newList.push(rewardList[r])
                }
            }
            return newList
        },
    }
})
</script>

<style scoped>
.card {
    width: 100%;
    max-width: 100%;
    aspect-ratio: 1.6 / 1;
    height: 100%;
    /* overflow: hidden; */

    position: relative;
    
    isolation: isolate;

    border-radius: var(--border-radius);
    transform: rotate(0px);


    background: black;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    cursor: pointer;

    --padding: 4%;
    --border-radius: .5rem;
    --duration: .25s;
    --timing: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --delay: .1s;

    transition: all var(--duration) var(--timing) var(--delay);

    z-index: var(--index);
}

.card.expanded {
    height: calc(200% + 3rem + 3px);
    -padding: 3%;
    border: none;
}

.card:not(.expanded):hover .card__image-img{
    transform: scale(1.1) !important;
}

.card__image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;

    opacity: .4;
    z-index: -2;

    transition: all var(--duration) var(--timing) var(--delay);

    rotate: 0deg;

    border-radius: var(--border-radius);

}

.card__image-img {
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: cover;
    transition: all var(--duration) var(--timing)  var(--delay);
}

.card__contents {
    max-width: 100%;
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: visible;
}
.card__header {
    position: absolute;
    top: var(--padding);
    left: var(--padding);
}

.card__header-text {
    font-family: sans-serif;
    text-transform: none;
    transition: var(--duration) var(--timing)  var(--delay);
}

.card.expanded .card__header-text {
    letter-spacing: .005rem;
}

@media screen and (max-width: 900px) {
    .card__parts {
        font-size: 2rem;
    }
}
.card__header-text::before {
    content: '';
    width: 100%;
    height: 2%;
    bottom: 0;
    position: absolute;
    background-color: rgba(255, 255, 255, .8);

    transition: var(--duration) var(--timing) var(--delay);

}
.card.expanded .card__header-text::before {
    width: 0px;
}

.card__desc {
    position: absolute;
    max-width: 100%;
    top: 1rem;
    left: var(--padding);
}

.card__desc-text {
    max-width: 85%;
    opacity: .7;
    overflow:auto;

    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: all calc(1.5 * var(--duration)) var(--timing) var(--delay);

    height: 3em;
}



.card.expanded .card__desc-text {
    max-width: 85%;
    -webkit-line-clamp: 6;
    line-clamp: 6;
    height: 9em;
    text-overflow: ellipsis;

    overflow-y: auto;

    overscroll-behavior: contain;
}

.card__desc-text::-webkit-scrollbar {
    width: 5px;
    border-top: none;
    border-bottom: none;
    cursor: pointer;
    opacity: 0;
}

/* Track */
.card__desc-text::-webkit-scrollbar-track {
    background: rgba(0,0,0,0);
}

/* Handle */
.card__desc-text::-webkit-scrollbar-thumb {
    background-color: var(--text-color-body-white);
    border-radius: 2px;
    cursor: pointer;
}

/* Handle on hover */
.card__desc-text::-webkit-scrollbar-thumb:hover {
    filter: brightness(300%);
}
.card__button {
    position: absolute;
    bottom: calc(var(--padding) * 0.5);
    right: calc(var(--padding) / 1.6);

    width: 10%;
    text-align: center;
    transition: all var(--duration) var(--timing) var(--delay);

    display: flex;
    justify-content: center;
}

.card__button:hover {
    scale: 1.2
}
.card__button-text {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 50%;

    text-align: center;

    display: flex;
    align-items: center;
    justify-content: center;

    color: red;
}

.card.expanded .card__button {
    opacity: 1;
    pointer-events: all;
}
.card__parts {
    position: absolute;
    top: .4rem;
    right: var(--padding);
    font-size: 1.7rem;
    
}

.card.expanded .card__parts {
    animation: circle var(--duration) var(--timing) var(--delay);
}

@keyframes circle {
    0% {
        rotate: 0deg;
    }

    50% {
        rotate: 0deg;
    }

    100% {
        rotate: 0deg;
    }
}

.card__tasks {
    position: absolute;
    top: 40%;
    left: 5%;
    width: 90%;
    opacity: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: .5rem;

    /* border-top: 1px dashed var(--text-color-body-white);
    padding-top: 5%; */
    transition: opacity var(--duration) var(--timing) var(--delay);
}

.card__tasks-container {
    width: 100%;
    text-align: center;

    display: grid;
    grid-template-columns: 10% 90%;
}

.card__tasks-container div {
    text-align: left;
}
.card.expanded .card__tasks {
    color: rgba(255, 255, 255, 1);
    opacity: .7;
    pointer-events: all;
}

.card__tasks header {
    display: none;
    text-align: left;
    width: 100%;
    opacity: .8;
}

.card__tasks header h3 {
    font-family: sans-serif;
    text-transform: initial;
    letter-spacing: .2rem;
}

.card__tasks header h3 span {
    border-bottom: 2px solid var(--text-color-body-white);
}

.card__tasks-image {
    display: inline-block;
    width: 24px;
    filter: brightness(150%);
}
.card__rewards {
    position: absolute;

    bottom: 3%;
    left: 5%;
    opacity: 0;

    /* display: grid;
    grid-template-columns: repeat(var(--length), 1fr); */

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    width: 90%;
    gap: .5rem;
    justify-content: center;
    transition: opacity var(--duration) var(--timing) var(--delay);

    pointer-events: none;
}

.rewards__info {
    opacity: 0;
    position: absolute;
    pointer-events: none;
}

.card__rewards-container:hover .rewards__info {
    opacity: 0;
}

.card.expanded .card__rewards {
    opacity: .7;
    color: rgba(255, 255, 255, 1);
    pointer-events: all;
}

.card__rewards-container {
    width: calc(90% / 4);
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.card__rewards-container img {
    height: 100%;
}

.card__rewards-container div {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.card__rewards-container:not(:last-child) div::before {
    content: '';

    position: absolute;
    width: 2px;
    height: 80%;
    background-color: var(--text-color-body-white);
    opacity: .5;
    right: -12%;

    border-radius: 100px;
    background: rgb(224,219,219);
    background: linear-gradient(180deg, rgba(224,219,219,1) 0%, rgba(196,196,196,1) 38%, rgba(136,130,130,1) 100%);

}

.card__unlock {
    display: none !important;
    position: absolute;
    width: 20%;
    aspect-ratio: 1 /1 ;
    right:  calc(.75 *var(--padding));
    bottom: .5rem;

    outline: 5px solid red;
    padding: .4rem;

    backdrop-filter: blur(1px);
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity var(--duration) var(--timing) var(--delay);

    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

}

.card__unlock-image {
    width: 100%;
    z-index: 1;
}


.osi {
    outline-color: #3fa321;
    fill: #3fa321;
}

.ica {
    outline-color: #5ed1f4;
    fill: #5ed1f4;
}

.kor {
    outline-color: #d65c1f;
    fill: #d65c1f;
}



@media screen and (max-width: 900px) {
    .card__header-text {
        font-size: 1rem;
    }
}


</style>