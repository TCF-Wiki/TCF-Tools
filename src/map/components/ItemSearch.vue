<template>
<div>
    <form id="search" role="search" autocomplete="off">
        <label for="search-input">Search this site</label>
        <input @input="matchInputs" type="text" id="search-input" spellcheck="false" v-model="searchInput" :class=" shake ?  'apply-shake' : null ">
        <input value="Submit" type="submit" @click.prevent="addToSearchedList">
    </form>
    <div class="autocomplete"> 
        <p v-for="item in matchingItems" class="autocomplete-item" @click="setSearchItem(item)" v-if="autoCompleteShower()">
            {{ item }}
        </p> 
    </div> 
    <div> 
        <p> Selectected Items: </p>
        <p v-for="item in selectedItems.list" @click="selectedItems.removeItem(item)"> 
            <span v-if="selectedItems.list.length > 0" :style="'color: ' + colourClassGiver(item)">
                {{ items[item] ? items[item]['name'] : null }}
            </span>  
        </p>
    </div>
</div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getMapData } from '../data';
import { selectedItems } from '../store'

export default defineComponent({
  data() {
    return {
        selectedItems,
        searchInput: '' as string,
        matchingItems: [] as string[],
        data: {} as any,
        items: {} as any,
        searchTerms: [] as string[],
        lowerCaseSearchTerms: [] as string[],
        shake: false as boolean

    }
  },
  methods: {
    matchInputs: function() {
        const input = this.searchInput.toLowerCase();

        if (input == '') {
            this.matchingItems = [];
            return;
        }
       
        this.matchingItems = this.searchTerms.filter(function(term : string) {
	        if (term.toLowerCase().includes(input)) {
  	            return term;
	        }
        });
    },
    setSearchItem(item: string) {
        this.searchInput = item;
        this.matchingItems = [item]
    },
    addToSearchedList() {
        const input = this.searchInput.toLowerCase();
        if (!this.lowerCaseSearchTerms.includes(input)) {
            console.log('Hit!')
            this.shake = true;
            setTimeout(() => {
                this.shake = false;
            }, 820)
        }

        for (let item in this.items) {
            if (this.items[item]['name'].toLowerCase() == input) {
                console.log('Yay, found our match: ' + this.items[item]['name'])
                selectedItems.addItem(item)
                break;
            }
        }

    },
    autoCompleteShower(): boolean {
        if (document.querySelector('#search-input') === document.activeElement) return true

        return false
    },
    colourClassGiver(item: string) {
        const itemData = this.items[item]
        if (!itemData) return '';
        if (itemData['rarity']) {
            console.log(`var(--rarity-color-${itemData['rarity'].toLowerCase()})`)
            return `var(--rarity-color-${itemData['rarity'].toLowerCase()})`
        }
    }
  },
  async mounted() {
    this.data = await getMapData()
    this.items = this.data['descriptions']
    
    let tempData = [];
    let tempLowerData = []
    for (let x in this.items) {
        let data = this.items[x] as any
        tempData.push(data['name'])
        tempLowerData.push(data['name'].toLowerCase())
    }

    this.searchTerms = tempData
    this.lowerCaseSearchTerms = tempLowerData
  }
})

</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    gap: .5rem
}
.autocomplete {
    position: absolute;
    width: 18rem;
    transform: translateY(3px);
    max-height: 40%;
    overflow-y: auto;
    z-index: 1;
}

.autocomplete-item {
    border: 2px solid var(--button-accent-color);
    background-color: var(--button-body-color);
    cursor: pointer;
    color: var(--button-text-color);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.apply-shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

</style>
