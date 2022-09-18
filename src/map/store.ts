import {reactive} from 'vue';

export const selectedMap = reactive({
    map: 1 as number,
    set(map: number): void {
        // this function changes the active map.

        // here we can disable certain maps, if needed.
        if (map === 1 || map === 2) {
            this.map = map;
        }
    },
});

export const selectedLocations = reactive({
    list: ['HiddenStash', 'WeaponCrate','keyDoor','LaserDrill','Uplink'] as string[],
    toggle: function (locationName: string) {
        if (this.list.includes(locationName)) this.list = this.list.filter( (a) => { return a !== locationName})
        else this.list.push(locationName);
    },
    add(loc : string) {
        if (!this.list.includes(loc)) this.list.push(loc)
    },
    remove(loc: string) {
        if (this.list.includes(loc)) {
            this.list = this.list.filter( (a) => { return a !== loc})
        } 
    },
    set(locList: string[]) {
        // sets the list to a new list. Typically used to toggle multiple on at the same time
        // without triggering the watcher each time when adding them indivually 
        this.list = locList;
    },
    clear() {
        // clears the current list
        this.list = [] as string[]
    }
});

export const selectedItems = reactive({
    list: [] as string[],
    add(item: string) {
        if (!this.list.includes(item)) {
            this.list.push(item)
        }
    },
    remove(item: string) {
        if (this.list.includes(item)) {
            this.list = this.list.filter( (a) => { return a !== item})
        } 
    },
    toggle(item : string) {
        if (this.list.includes(item)) this.list = this.list.filter( (a) => { return a !== item});
        else this.list.push(item);
    },
    set(itemList: string[]) {
        // sets the list to a new list. Typically used to toggle multiple on at the same time
        // without triggering the watcher each time when adding them indivually 
        this.list = itemList
    },
    clear() {
        // clears the current list
        this.list = [] as string[]
    },
});

export const selectedTier = reactive({
    on: false as boolean,
    toggle() {
        this.on = !this.on
    },
    enable() {
        this.on = true
    },
    disable() {
        this.on = false
    }
})