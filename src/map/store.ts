import {reactive} from 'vue';

export const selectedMap = reactive({
    map: 1 as number,
    changeSelected(map: number): void {
        // this function changes the active map.

        // here we can disable certain maps, if needed.
        if (map === 1 || map === 2) {
            this.map = map;
        }
    },
});

export const selectedLocations = reactive({
    list: ['HiddenStash', 'WeaponCrate','keyDoor','LaserDrill','Uplink'] as string[],
    locationSwitch: function (locationName: string) {
        if (this.list.includes(locationName)) this.list = this.list.filter( (a) => { return a !== locationName})
        else this.list.push(locationName);
    },
    add(loc : string) {
        if (!this.list.includes(loc)) this.list.push(loc)
    },
    clear() {
        // clears the current list
        this.list = [] as string[]
    }
});

export const selectedItems = reactive({
    list: [] as string[],
    addItem(item: string) {
        if (!this.list.includes(item)) {
            this.list.push(item)
        }
    },
    removeItem(item: string) {
        if (this.list.includes(item)) {
            this.list = this.list.filter( (a) => { return a !== item})
        } 
        console.log(this.list)
    },
    toggleItem: function(item : string) {
        if (this.list.includes(item)) this.list = this.list.filter( (a) => { return a !== item});
        else this.list.push(item);
    },
    clear() {
        // clears the current list
        this.list = [] as string[]
    }
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