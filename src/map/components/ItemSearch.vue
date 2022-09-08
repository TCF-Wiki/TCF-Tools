<template>
<div>
    <form id="search" role="search" autocomplete="off">
        <label for="search-input">Search this site</label>
        <input @input="matchInputs" type="text" id="search-input" spellcheck="false" v-model="searchInput">
        <input value="Submit" type="submit" @click.prevent="addToSearchedList">
    </form>
    <div class="autocomplete"> 
        <p v-for="item in matchingItems" class="autocomplete-item" @click="setSearchItem(item)" v-if="autoCompleteShower()">
            {{ item }}
        </p> 
    </div> 
    <div> 
        <p> Selectected Items: </p>
        <p v-for="item in selectedItems.list" @click="selectedItems.removeItem(item)"> {{ items[item]['name'] }} </p>
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
        lowerCaseSearchTerms: [] as string[]
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
            return;
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
.autocomplete {
    position: absolute;
    width: 18rem;
    transform: translateY(3px);
    max-height: 40%;
    overflow-y: auto;
}

.autocomplete-item {
    border: 2px solid var(--button-accent-color);
    background-color: var(--button-body-color);
    cursor: pointer;
    color: var(--button-text-color);
}
</style>