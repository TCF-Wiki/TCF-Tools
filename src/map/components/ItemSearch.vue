<template>
    <div>
        <form id="search" role="search" autocomplete="off">
            <label for="search-input"><h2> Search for items </h2></label>
            <div 
                class="search-container"
            > 
                <input 
                    @input="matchInputs" 
                    type="text" 
                    id="search-input" 
                    spellcheck="false" 
                    v-model="searchInput"
                    :class=" shake ?  'apply-shake' : null " 
                    placeholder="Item..."
                    aria-label="Input item you want to search"
                >
                <button 
                    type="reset" 
                    @click="searchInput=''"
                    aria-label="Clear item input"
                > ✖ 
                </button> 
            </div>
            <button 
                type="submit" 
                @click.prevent="addToSearchedList"
                aria-label="Submit item search"
            > Search
            </button>
        </form>
        <div class="autocomplete">
            <p v-for="item in matchingItems" class="autocomplete-item" @click="setSearchItem(item)"
                v-if="autoCompleteShower()">
                <span> {{ item }} </span>
                <img :src="'map-images/item-images/' + itemImage(item) + '.png'" class="item-image">
            </p>
        </div>
        <div class="item-list">
            <p> Selected Items: </p>
            <div class="item-container">
                <p v-for="item in selectedItems.get()" @click="selectedItems.remove(item)">
                    <span :class="colourClassGiver(item)">
                        {{  items[item]['name'] }} <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" class="svg-inline--fa fa-trash " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"></path></svg> 
                    </span>
                </p>
                <p v-if="selectedItems.get().length == 0">
                    <span> None </span>
                </p>
            </div>
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
        matchInputs: function () {
            const input = this.searchInput.toLowerCase();

            if (input == '') {
                this.matchingItems = [];
                return;
            }

            this.matchingItems = this.searchTerms.filter(function (term: string) {
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
                this.shake = true;
                setTimeout(() => {
                    this.shake = false;
                }, 820)
            }

            for (let item in this.items) {
                if (this.items[item]['name'].toLowerCase() == input) {
                    selectedItems.add(item)
                    this.searchInput = '';
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
                return itemData['rarity'].toLowerCase()
            }
        },
        itemImage(itemName: string): string {
            let foundItem = '';
            for (let item in this.items) {
                if (this.items[item]['name'].toLowerCase() == itemName.toLowerCase()) {
                    foundItem = item
                    break;
                }
            }
            let item = this.items[foundItem]['name']

            if (foundItem?.includes('Map01_KeyCard')) return 'Bright_Sands_Key_Card'

            if (foundItem?.includes('Map02_KeyCard')) return 'Crescent_Falls_Key_Card'

            if (foundItem?.includes('Map03_KeyCard')) return 'Tharis_Island_Key_Card'

            return item.replaceAll(' ', '_');
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
    gap: 1rem
}

.search-container {
    display: grid;
    grid-template-columns: 9fr 1fr;
    gap: 1rem
}
.autocomplete {
    position: absolute;
    width: 21rem;
    transform: translateY(3px);
    max-height: 40%;
    overflow-y: auto;
    z-index: 0;
}

.autocomplete-item {
    background-color: var(--rarity-color-common);
    border: 1px solid var(--background-body-color);
    cursor: pointer;
    color: var(--button-text-color);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    z-index: 1;
}

.autocomplete-item span {
    height: 2rem;
    padding-top: .2rem;
    padding-left: .1rem;
}

.item-image {
    width: 2rem;
}


.item-list {
    margin-top: 2rem;
}

.item-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
}


button[type=reset] {
    color: var(--rarity-color-exotic);
    font-weight: bold;
}

svg {
    fill: var(--rarity-color-exotic) !important;
}
</style>
