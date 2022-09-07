<template>
    <div class="page-content">
        <div class="options">
            <MapSelector />
            <SelectedLocationList />
            <LocationSelector />
        </div>
        <div id="map"></div>
    </div>
</template>

<script lang="ts">
import MapSelector from './components/MapSelector.vue';
import SelectedLocationList from './components/SelectedLocationList.vue';
import LocationSelector from './components/LocationSelector.vue';

import {defineComponent, watch} from 'vue';
import L, {Map, type TileLayer} from 'leaflet';
import {selectedMap, selectedLocations} from './store';
import {mapData as mData} from './data';

import {map1TileLayer, map2TileLayer, map3TileLayer, bounds, brightsandsColor, crescentfallsColor} from './mapConstants';
import {faFeatherPointed} from '@fortawesome/free-solid-svg-icons';

import layerGroups from './layerGroups';

export default defineComponent({
    components: {
        MapSelector,
        LocationSelector,
        SelectedLocationList,
    },
    data() {
        return {
            selectedMap,
            selectedLocations,
            savedMarkers: [] as any,
        };
    },
    mounted() {
        console.log(layerGroups);
        // this is the main logic of the map.
        const mapData = mData;

        // create our map, mounting it on the '#map' element
        let map = L.map('map', {
            crs: L.CRS.Simple,
            minZoom: 1,
            maxZoom: 5,
        }).setView([-128, 128], 1);

        map.zoomControl.setPosition('topright');
        map.fitBounds(bounds);
        map.setMaxBounds(bounds);

        initiateMapToMapNumber(selectedMap.map).addTo(map);

        // we must keep our map variable to this file. We musn't mutate it in weird ways or set it to other variables, etc. That is why this is all kept to this file.
        this.$watch(
            'selectedMap',
            () => {
                initiateMapToMapNumber(selectedMap.map).addTo(map);
            },
            {deep: true}
        );

        this.$watch(
            'selectedLocations',
            () => {
                removeUnselectedMarkers();
                placeMarkersForSelectedLocations();
            },
            {deep: true}
        );

        function initiateMapToMapNumber(mapNumber: number): TileLayer {
            // this function initialises the map to a specified map number.
            if (mapNumber == 1) {
                document.getElementById('map')!.style.backgroundColor = brightsandsColor;
                if (map.hasLayer(map2TileLayer)) {
                    map.removeLayer(map2TileLayer);
                }
                if (map.hasLayer(map3TileLayer)) {
                    map.removeLayer(map3TileLayer);
                }
                return map1TileLayer;
            } else if (mapNumber == 2) {
                document.getElementById('map')!.style.backgroundColor = crescentfallsColor;
                if (map.hasLayer(map1TileLayer)) {
                    map.removeLayer(map1TileLayer);
                }
                if (map.hasLayer(map3TileLayer)) {
                    map.removeLayer(map3TileLayer);
                }
                return map2TileLayer;
            } else if (mapNumber == 3) {
                document.getElementById('map')!.style.backgroundColor = brightsandsColor;
                if (map.hasLayer(map1TileLayer)) {
                    map.removeLayer(map1TileLayer);
                }
                if (map.hasLayer(map2TileLayer)) {
                    map.removeLayer(map2TileLayer);
                }
                return map3TileLayer;
            } else {
                return map1TileLayer;
            }
        }

        let VM = this;
        function removeAllMarkers(): void {
            for (let group in layerGroups[VM.selectedMap.map]) {
                layerGroups[VM.selectedMap.map][group].removeFrom(map);
            }
        }
        function removeUnselectedMarkers(): void {
            console.log(VM.savedMarkers);
            for (let locationType in VM.savedMarkers) {
                if (selectedLocations.list.includes(VM.savedMarkers[locationType])) continue;
                layerGroups[VM.selectedMap.map][VM.savedMarkers[locationType]].removeFrom(map);
                delete VM.savedMarkers[locationType];
            }
        }

        function placeMarkersForSelectedLocations(): void {
            let mapMarkers = [] as any;
            // this function places the markers for each location. Hurray!
            for (let locationType in selectedLocations.list) {
                layerGroups[VM.selectedMap.map][selectedLocations.list[locationType]].addTo(map);
                mapMarkers.push(selectedLocations.list[locationType]);
            }
            VM.savedMarkers = mapMarkers;
        }
    },
});
</script>

<style scoped>
.page-content {
    padding-left: 1rem;
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: space-evenly;
    align-items: center;
}

.options {
    display: flex;
    gap: 1rem;
}

#map {
    height: 50rem;
    width: 50rem;
}
</style>
