<template>
    <div class="outer-container">
        <form id="search" role="search" autocomplete="off">
            <div class="search-container">
                <input @input="matchInputs" type="text" id="search-input" spellcheck="false" v-model="searchInput" :class="{'apply-shake': shake}" placeholder="Search for item..." aria-label="Input item you want to search" ref="input" />

                <button type="submit" @click.prevent="addToSearchedList" aria-label="Submit item search">
                    <font-awesome-icon icon="fas fa-magnifying-glass" />
                </button>

                <button type="reset" @click="reset" aria-label="Clear item input"><font-awesome-icon icon="fas fa-circle-xmark" /></button>
            </div>
        </form>
        <div class="autocomplete" :class="{'has-items': matchingItems.length > 0}">
            <TransitionGroup name="list" tag="ul">
                <li v-for="(item, index) in matchingItems" class="autocomplete-item" @click="setSearchItem(item)" :key="index">
                    <span> {{ item }} </span>
                    <img :src="'map-images/item-images/' + itemImage(item) + '.png'" class="item-image" />
                </li>
            </TransitionGroup>
        </div>

        <div class="item-list">
            <div class="item-container">
                <p v-for="item in selectedItems.get()" @click="selectedItems.remove(item)" v-if="Object.keys(items).length > 0">
                    <span :class="colourClassGiver(item)">
                        {{ items[item]['name'] }}
                    </span>
                    <font-awesome-icon icon="fas fa-trash" />
                </p>
            </div>
            <div class="item-container-notice">
                <p v-if="selectedItems.get().length == 0">
                    <span> No items are selected </span>
                </p>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import {getMapData} from '../data';
import {selectedItems} from '../store';

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
            shake: false as boolean,
        };
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
            this.matchingItems = [];
            this.addToSearchedList();
        },
        addToSearchedList() {
            // if (this.matchingItems.length == 1) {
            //     this.setSearchItem(this.matchingItems[0]);
            // }
            const input = this.searchInput.toLowerCase();
            if (!this.lowerCaseSearchTerms.includes(input)) {
                this.shake = true;
                setTimeout(() => {
                    this.shake = false;
                }, 820);
            }
            for (let item in this.items) {
                if (this.items[item]['name'].toLowerCase() == input) {
                    selectedItems.add(item);
                    this.searchInput = '';
                    break;
                }
            }
            this.matchingItems = [];
        },
        submitEnter() {
            if (this.matchingItems.length == 1) {
                this.setSearchItem(this.matchingItems[0]);
                //this.addToSearchedList()
            }
        },
        autoCompleteShower(): boolean {
            if (document.querySelector('#search-input') === document.activeElement) return true;
            return false;
        },
        reset() {
            this.searchInput = '';
            this.matchingItems = [];
        },
        colourClassGiver(item: string) {
            const itemData = this.items[item];
            if (!itemData) return '';
            if (itemData['rarity']) {
                return itemData['rarity'].toLowerCase();
            }
        },
        itemImage(itemName: string): string {
            let foundItem = '';
            for (let item in this.items) {
                if (this.items[item]['name'].toLowerCase() == itemName.toLowerCase()) {
                    foundItem = item;
                    break;
                }
            }
            let item = this.items[foundItem]['name'];
            if (foundItem?.includes('Map01_KeyCard')) return 'Bright_Sands_Key_Card';
            if (foundItem?.includes('Map02_KeyCard')) return 'Crescent_Falls_Key_Card';
            if (foundItem?.includes('Map03_KeyCard')) return 'Tharis_Island_Key_Card';
            if (foundItem?.includes('Flechette Gun')) return 'ASP Flechette Gun';
            return item.replaceAll(' ', '_').replaceAll('#', '#');
        },
    },
    async mounted() {
        this.data = await getMapData();
        this.items = this.data['descriptions'];
        let tempData = [];
        let tempLowerData = [];
        for (let x in this.items) {
            let data = this.items[x] as any;
            tempData.push(data['name']);
            tempLowerData.push(data['name'].toLowerCase());
        }
        this.searchTerms = tempData;
        this.lowerCaseSearchTerms = tempLowerData;
    },
});
</script>

<style scoped>
.outer-container {
    background-color: var(--background-body-color);
    padding: 1rem;
    margin-bottom: 1rem;
}

/* h2 {
    text-align: center;
} */

h3 {
    border-bottom: 2px dotted var(--text-color-body-white-dark);
    width: 60%;

    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
}
form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.search-container {
    display: grid;
    grid-template-columns: 9fr 1fr 1fr;
    gap: 1rem;
    height: 2rem;
}

.autocomplete {
    isolation: isolate;
    overflow: unset;
    margin-top: 0.5rem;
    position: absolute;
    max-width: 100%;
    width: 70%;
    transform: translateY(3px);
    max-height: 40%;
    overflow-y: auto;
    overflow-x: hidden;
    background-image: linear-gradient(180deg, var(--rarity-color-common) 0%, var(--text-color-body-white-dark) 100%);

    overscroll-behavior: contain;

    opacity: 0;
}

.autocomplete.has-items {
    border-radius: 5px;

    border: 2px solid var(--background-dark-color);
    opacity: 1;
}

.autocomplete-item {
    background-color: transparent;
    cursor: pointer;
    color: var(--button-text-color);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    z-index: 1;
    padding: 0.3rem;

    transition: all 0.2s ease-in-out;
}

.autocomplete-item:hover {
    background-color: var(--rarity-color-legendary);
}

.autocomplete-item > span {
    height: 2rem;
    padding-top: 0.2rem;
    padding-left: 0.1rem;
}

.item-image {
    width: 2rem;
}

.item-list {
    margin-top: 1rem;
}

.item-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
}
.item-container,
.item-container-notice {
    margin-top: 0rem;
}
.item-container p {
    text-align: center;
    cursor: pointer;
}

.item-container-notice {
    text-align: center;
}
.search-container input[type='text'] {
    padding: 0.4rem 0.8rem;
}

input[type='text'] {
    border-radius: 50rem;
    border-color: var(--rarity-color-rare);
    border-style: solid;

    transition: all 0.2s ease-in-out;

    background-color: var(--background-button-color);
    color: var(--text-color-body-white);
}

input[type='text']::placeholder {
    color: var(--text-color-body-white);
    opacity: 0.6;
}

input[type='text']:focus {
    border-color: var(--rarity-color-legendary);
    outline: none !important;
    outline-style: none;
    border-style: solid;
    box-shadow: none;
}

button[type='reset'],
button[type='submit'] {
    font-size: 1.4rem;
}

button[type='reset'] > svg,
button[type='submit'] > svg {
    display: flex;
    justify-content: center;
    align-items: center;
}

button[type='reset'] {
    color: var(--rarity-color-exotic);
    appearance: none;
    background: none;
    border: none;
}

button[type='submit'] {
    color: var(--rarity-color-uncommon);

    appearance: none;
    background: none;
    border: none;
}

.item-container p > svg {
    color: var(--rarity-color-exotic);
    padding-left: 0.2rem;

    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;

    display: inline-flex;
}

.list-enter-active,
.list-leave-active {
    transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    translate: 0 -100%;
}
</style>
