import {reactive} from 'vue';

export const selectedMap = reactive({
    map: 1 as number,
    get(): number {
        return this.map;
    },
    set(map: number): void {
        // this function changes the active map.
        // here we can disable certain maps, if needed.
        if (map === 1 || map === 2 || map === 3) {
            this.map = map;
        }
    },
});

export const selectedLocations = reactive({
    list: ['HiddenStash', 'WeaponCrate', 'keyDoor', 'LaserDrill', 'Uplink'] as string[],
    get(): string[] {
        return this.list;
    },
    set(locList: string[]) {
        // sets the list to a new list. Typically used to toggle multiple on at the same time
        // without triggering the watcher each time when adding them indivually
        this.list = locList;
    },
    toggle: function (locationName: string) {
        if (this.list.includes(locationName))
            this.list = this.list.filter((a) => {
                return a !== locationName;
            });
        else this.list.push(locationName);
    },
    add(loc: string) {
        if (!this.list.includes(loc)) this.list.push(loc);
    },
    remove(loc: string) {
        if (this.list.includes(loc)) {
            this.list = this.list.filter((a) => {
                return a !== loc;
            });
        }
    },
    clear() {
        // clears the current list
        this.list = [] as string[];
    },
});

export const selectedCreatures = reactive({
    list: [] as string[],
    get(): string[] {
        return this.list;
    },
    set(locList: string[]) {
        // sets the list to a new list. Typically used to toggle multiple on at the same time
        // without triggering the watcher each time when adding them indivually
        this.list = locList;
    },
    toggle: function (creatureName: string) {
        if (this.list.includes(creatureName))
            this.list = this.list.filter((a) => {
                return a !== creatureName;
            });
        else this.list.push(creatureName);
    },
    add(creatureName: string) {
        if (!this.list.includes(creatureName)) this.list.push(creatureName);
    },
    remove(creatureName: string) {
        if (this.list.includes(creatureName)) {
            this.list = this.list.filter((a) => {
                return a !== creatureName;
            });
        }
    },
    clear() {
        // clears the current list
        this.list = [] as string[];
    },
});

export const selectedItems = reactive({
    list: [] as string[],
    get(): string[] {
        return this.list;
    },
    set(itemList: string[]): void {
        // sets the list to a new list. Typically used to toggle multiple on at the same time
        // without triggering the watcher each time when adding them indivually
        this.list = itemList;
    },
    add(item: string) {
        if (!this.list.includes(item)) {
            this.list.push(item);
        }
    },
    remove(item: string) {
        if (this.list.includes(item)) {
            this.list = this.list.filter((a) => {
                return a !== item;
            });
        }
    },
    toggle(item: string) {
        if (this.list.includes(item))
            this.list = this.list.filter((a) => {
                return a !== item;
            });
        else this.list.push(item);
    },

    clear() {
        // clears the current list
        this.list = [] as string[];
    },
});

export const selectedTier = reactive({
    on: false as boolean,
    get(): boolean {
        return this.on;
    },
    set(New: boolean): void {
        this.on = New;
    },
    toggle() {
        this.on = !this.on;
    },
    enable() {
        this.on = true;
    },
    disable() {
        this.on = false;
    },
});


export const clusterEnabled = reactive({
    on: false as boolean,
    get(): boolean {
        return this.on;
    },
    set(New: boolean): void {
        this.on = New;
    },
    toggle() {
        this.on = !this.on;
    },
    enable() {
        this.on = true;
    },
    disable() {
        this.on = false;
    }, 
})

export const minimumPercent = reactive({
    value: 0,
    get() {
        return this.value
    },
    set(value: number) {
        this.value = value;
    }
})
