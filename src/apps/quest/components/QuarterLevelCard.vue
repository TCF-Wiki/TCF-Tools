<template>
<section class="card" :style="{'--x': x(), '--y': y()}">
    <div class="card__image">
    </div>
    <div class="card__level">
        {{ data['playerquarter_'+level]['level'] }}
    </div>

    <div class="card__costs">
        <div v-for="amount, item in data['playerquarter_'+level]['costs']" :key="item" class="item__row">
            <img :src="'/map-images/item-images/' + itemName(item.toString(), true) + '.png'" class="item__image"> 
            <span>
                {{ amount }}
                {{ itemName(item.toString()) }}
            </span> 
        </div>
    </div>

    <div class="card__button" role="button" @click.stop.prevent="handleProgress()">
            <div class="card__button-text">
                <svg  v-if="progress.get()['overall'] >= parseInt(level)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M211.8 339.8C200.9 350.7 183.1 350.7 172.2 339.8L108.2 275.8C97.27 264.9 97.27 247.1 108.2 236.2C119.1 225.3 136.9 225.3 147.8 236.2L192 280.4L300.2 172.2C311.1 161.3 328.9 161.3 339.8 172.2C350.7 183.1 350.7 200.9 339.8 211.8L211.8 339.8zM0 96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96zM48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80H64C55.16 80 48 87.16 48 96z"/></svg>          

                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM384 80H64C55.16 80 48 87.16 48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80z"/></svg>
            </div>
    </div>
</section>

</template>


<script lang="ts">
import { defineComponent } from 'vue';
import  { techLevelsData } from '../data'
import { itemData } from '../../forge/data';

import { quarterProgress } from '../trackProgress';
export default defineComponent({
    props: ['level','canComplete'],
    data() {
        return {
            data: techLevelsData,
            progress: quarterProgress
        }
    },
    methods: {
        itemName(item: string, urlFormat? : boolean) : string {
            // This function gets the name of the image when given an item name. Handles edge cases.
            if (item.includes('SoftCurrency'))    item = 'K-Marks'
            else if (item.includes('ShockGrenade_02')) item =  'Frag Grenade'
            else if (item.includes('Scrip'))      item = item
            else if (item.includes('HardDrive'))  item = 'Data Drive Tier 1'
            else if (item.includes('ICAScrip')) item = "ICA Scrip"
            else if (item.includes('OsirisScrip')) item = "Osiris Scrip"
            else if (item.includes('KorolevScrip')) item = "Korolev Scrip"
            else if (item.includes('KeyCard')) {
                if (item.includes('Map01'))       item = 'Bright_Sands_Key_Card'
                if (item.includes('Map02'))       item = 'Crescent_Falls_Key_Card'
                if (item.includes('Map03'))       item = 'Tharis_Island_Key_Card'
            } else {
                if (itemData[item]) {
                    item = itemData[item]['ingamename']
                }
            }
            if (item.includes('Fusion Cartridge')) item = 'Fusion_Cartridge_Batteries'
            if (item.includes('OrbitalCanonTarget')) item = 'Orbital_Cannon_Beacon'
            
            if (urlFormat)  return item.split(' ').join('_').replace('#', '%23')

            return item
        },
        currencyDisplay(r: any) : string {
            // Gets a string representing the item amount for a mission
            if (r['item'] !=='SoftCurrency' || !r['item'].includes('Reputation')) {
                // save some space by shortening the text
                if (r['amount'] > 999) return (r['amount'] / 1000) + 'k'
            }
            return r['amount']
        },
        handleProgress() {
            if (this.progress.get()['overall'] == this.level) {
                this.progress.setPart('',this.level-1, 'level')
            } else {
                this.progress.setPart('',this.level, 'level')
            }
        },
        x() {
            let l = this.level-1
            
            if (l == 1 || l == 4 || l == 7) {
                return 1
            }
            if (l == 2 || l == 5 || l == 8 ) {
                return 2
            }
            if (l == 3 || l == 6 || l == 9) {
                return 3
            }        
        },
        y() {
            let l = this.level-1
            
            if (l == 1 || l == 2 || l == 3) {
                return 1
            }
            if (l == 4 || l == 5 || l == 6 ) {
                return 2
            }
            if (l == 7 || l == 8 || l == 9) {
                return 3
            } 
        }
    },
    computed: {

    }
})
</script>

<style scoped>

.card {
    aspect-ratio: 1;
    width: 100%;

    position: relative;

    isolation: isolate;

    overflow: hidden;
    border-radius: var(--border-radius);


    background: rgba(0, 0, 0, 0.3);
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    cursor: pointer;

    --padding: 4%;
    --border-radius: .5rem;
    --duration: .3s;
    --timing: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --delay: .0s;

    transition: all var(--duration) var(--timing) var(--delay);
}

.card__level {
    position: absolute;
    top: var(--padding);
    right: var(--padding);

    font-size: 1.6rem;
}

.card__image {
    position: absolute;
    width: 200%;
    height: 100%;

    background-image: url('/quest-images/Quarters/background.png');
    overflow: hidden;

    opacity: .35;

    z-index: -2;

    transition: all var(--duration) var(--timing) var(--delay);

    transform: rotate(0);

    border-radius: var(--border-radius);

    background-position-x: calc(calc(var(--x)-1) * var(--horizontal-gap) + calc(25% + calc(var(--x) * 25%)));
    background-position-y: calc(calc(var(--y)-1) * calc( -1 * var(--vertical-gap)) + calc(10% + calc(var(--y) * 25%)));
}

.card:hover .card__image{
    transform: scale(1.1) !important;
}

.card__button {
    position: absolute;
    bottom: var(--padding);
    right: calc(var(--padding) / 1.6);
    opacity: 1;

    width: 20%;
    text-align: center;
    /* transition: all var(--duration) var(--timing) var(--delay); */

    display: flex;
    justify-content: end;

    z-index: 4;

    transition: scale var(--duration) var(--timing) var(--delay);
}

.card__button:hover {
    scale: 1.2
}

.card__button-text {
    width: 75%;
    aspect-ratio: 1;
    border-radius: 50%;

    text-align: center;

    display: flex;
    align-items: center;
    justify-content: center;

    color: red;
    z-index: 4;
}

.card__button-text svg {
    fill: var(--rarity-color-rare)
}

.card__costs {
    position: absolute;
    width: 80%;
    top: calc(2 * var(--padding));
    left: var(--padding);
}


.item__row {
    display: grid;
    grid-template-columns: 1fr 5fr;
    gap: 1rem;

    margin-bottom: .7rem;

    height: 1.6rem;
}

.item__row span {
    text-overflow: ellipsis;
    font-size: 80%;
}

.item__image {
    height: 100%;
    translate: 0 -5px

}

@media screen and (max-width: 900px) {
    .card__costs {
        display: none;
    }

    .card__level {
        top: 30%;
        left: 43%;
        right: unset;
        bottom: unset;
    }
}

</style>