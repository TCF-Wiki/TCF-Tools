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
    list: [] as string[],
    locationSwitch: function (locationName: string) {
        if (this.list.includes(locationName)) delete this.list[this.list.indexOf(locationName)];
        else this.list.push(locationName);
    },
});
