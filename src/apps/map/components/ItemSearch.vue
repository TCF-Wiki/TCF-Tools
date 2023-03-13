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

        <PercentButton />

        <div class="item-list">
            <div class="item-container">
                <p v-for="item in selectedItems.get()" @click="selectedItems.remove(item)" v-if="Object.keys(items).length > 0">
                    <font-awesome-icon icon="fas fa-trash" />
                    <span :class="colourClassGiver(item)">
                        <img :src="'map-images/item-images/' + itemImage(items[item]['name']) + '.png'" class="item-image-list" />
                        {{ items[item]['name'] }}
                        <span class="small">{{ amounts[item]+1 ? '(' + amounts[item] + ')' : '' }}</span>
                    </span>
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
import { getItemAmounts } from '../layerGroups';
import {selectedItems, selectedMap, minimumPercent} from '../store';
import PercentButton from './PercentButton.vue';
export default defineComponent({
    data() {
        return {
            selectedItems,
            minimumPercent,
            selectedMap,
            searchInput: '' as string,
            matchingItems: [] as string[],
            data: {} as any,
            items: {} as any,
            searchTerms: [] as string[],
            lowerCaseSearchTerms: [] as string[],
            shake: false as boolean,
            amounts: {} as any
        };
    },
    components: {
        PercentButton
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
        }
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

        this.$watch(
            "minimumPercent",
            () => {
                this.amounts = {...getItemAmounts()}
            },
            {deep: true}
        );
        this.$watch(
            "selectedItems",
            () => {
                this.amounts = {...getItemAmounts()}
            },
            {deep: true}
        );
        this.$watch(
            "selectedMap",
            () => {
                this.amounts = {...getItemAmounts()}
            },
            {deep: true}
        );
    },
});
</script>

<style scoped>
.outer-container {
    background-color: var(--background-body-color);
    padding: var(--space-md);
    padding-bottom: 0;
}

/* h2 {
    text-align: center;
} */

h3 {
    border-bottom: 1px solid var(--border-color-base);
    width: 60%;

    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
}
form {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    padding-bottom: 1.2rem;
    border-bottom: 1px solid var(--border-color-base);

}

.search-container {
    display: grid;
    grid-template-columns: 9fr 1fr 1fr;
    gap: var(--space-md);
    height: var(--space-xl);
}

.autocomplete {
    isolation: isolate;
    overflow: unset;
    margin-top: var(--space-sm);
    position: absolute;
    max-width: 100%;
    width: 70%;
    transform: translateY(3px);
    max-height: 40%;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: var(--color-surface-1);
    
    overscroll-behavior: contain;

    opacity: 0;
}

.autocomplete.has-items {
    border-radius: 5px;

    border: 1px solid var(--border-color-base--darker);
    opacity: 1;
    z-index: 1;
}

.autocomplete-item {
    background-color: transparent;
    cursor: pointer;
    color: var(--button-text-color);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    z-index: 1;
    padding: var(--space-xs);

    transition: all 0.15s ease-in-out;
}

.autocomplete-item:hover {
    background-color: var(--color-surface-2);
}

.autocomplete-item > span {
    height: var(--space-xl);
    padding-top: 0.2rem;
    padding-left: 0.1rem;
}

.item-image {
    width: var(--space-xl);
}

.item-image-list {
    width: 21px;

    display: inline;
    translate: 0 5px;
    z-index: -100;
    
}

.item-list {
    margin-top: var(--space-md);
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
    text-align: left;
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
.small {
    font-size: small;
    text-decoration-line: none !important;
}
</style>
