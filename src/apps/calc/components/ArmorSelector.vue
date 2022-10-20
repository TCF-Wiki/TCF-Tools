<template>
    <div class="container"> 
        <button class="" type="button" @click.prevent="showModal = true"> 
            <img :src=" 'calc-images/' + armorImage(selectedArmor.selected) + '.png'  " > 
        </button>
    </div>
    <section class="selection-list" v-show="showModal">
        <button class="close" @click.prevent="showModal = false"> &times; </button>
        <h2> Armor Selector </h2>
        <div class="armor-container">
            <div v-for="(armor, key) in armorFilter(armorData)" class="armor-selector" :class="classGiver(key)" @click="selectedArmor.changeSelected(key)">
                <img :src=" 'calc-images/' + armorImage(key) + '.png'  " class="armor-image" > 
                <span> {{  armorName(key)}} ({{armor['armorAmount']}}) </span> 
            </div>
        </div>
    </section>
    <div class="background" v-show="showModal" @click.prevent="showModal = false"> </div>

</template>

<script>
import { armorData } from '../data';
import { selectedArmor } from '../store';
export default {
    name: "ArmorSelector",
    data() {
        return {
            selectedArmor: selectedArmor,
            armorData: armorData,
            showModal: false,
        }
    },
    methods: {
        armorFilter(data) {
            let temp = {}
            temp['PlayerDefault'] = {'armorAmount': 0, 'rarity': 'None'}
            for (let key in data)  {
                if (key.includes('Test') || key.includes('Tactical') || key.includes('Restoration') || key.includes('Altered')) continue
                if (key.includes)
                temp[key] = data[key]
            }
            temp['Shield_Altered_03'] = data['Shield_Altered_03']
            return temp;
        },
        armorImage(key) {
            if (key.includes('PlayerDefault')) return 'No_Armor'
            if (key.includes('Altered_03')) return 'Shield_Forged'
            if (key.includes('01')) {
                if (key.includes('Restoration')) return 'Shield_Uncommon'
                return 'Shield_Common'
            }
            if (key.includes('02')) {
                if (key.includes('Restoration')) return 'Shield_Rare'
                return 'Shield_Uncommon'
            }
            if (key.includes('03')) return 'Shield_Rare'
            if (key.includes('04')) return 'Shield_Epic'
            // not a bug. There is no unique image.
            if (key.includes('05')) return 'Shield_Epic'
            return 'Shield_Common'
        },
        armorName(key) {
            if (key.includes('PlayerDefault')) return 'None'
            if (key.includes('Tactical')) {
                return this.armorData[key]['rarity'] + ' Tactical Armor' 
            }
            if (key.includes('Restoration')) {
                return this.armorData[key]['rarity'] + ' Restoration Armor' 
            }
            return this.armorData[key]['rarity'] + ' Armor'
        },
        classGiver(key) {
            let output = ''
            output += armorData[key]['rarity'].toLowerCase()

            if (selectedArmor.selected == key) output += ' active'
            return output
        }
    }
};
</script>

<style scoped>

.armor-image {
    width: 6em;
    margin: auto;
}

.armor-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 
}

.container button {
    width: 100%;
    height: 100%;
}


.armor-selector {
    margin: .2em;
    text-align: center;
    box-shadow: 0 0 2px 2px var(--background-menu-color) inet;
}

.armor-selector:hover .weapon-image {
    transform: scale(1.05);
}

@media screen  and (max-width: 900px){
    .armor-image {
        display: none;
    }
    .armor-name {
        font-size: .8rem;
    }
    .armor-container {
        grid-template-columns: 1fr 1fr
    }
}

</style>