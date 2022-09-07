import {reactive} from 'vue';

export const selectedMap = reactive({
    map: 1 as number,
    changeSelected(map: number): void {
        // this function changes the active map.

        // here we can disable certain maps, if needed.
        if (map === 1 || map === 2 || map === 3) {
            this.map = map;
        }
    },
});

export const selectedLocations = reactive({
    list: [] as string[],
    addLocation: function (locationName: string) {
        this.list.push(locationName);
    },
    removeLocation: function (locationName: string) {
        this.list = this.list.filter((a) => a !== locationName);
    },
});
