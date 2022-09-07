<template>
    <div class="page-content">
        <div class="options">
            <MapSelector />
            <LocationSelector />
        </div>
        <div id="map"></div>
    </div>
</template>

<style src="./MarkerCluster.css" />
<style src="./MarkerCluster.Default.css" />

<script lang="ts">
import MapSelector from './components/MapSelector.vue';
import LocationSelector from './components/LocationSelector.vue';

import {defineComponent, watch} from 'vue';
import L, {Map, type TileLayer} from 'leaflet';
import {selectedMap, selectedLocations} from './store';
import {getMapData} from './data';

import {map1TileLayer, map2TileLayer, map3TileLayer, bounds, brightsandsColor, crescentfallsColor} from './mapConstants';
import { addLeafletScript, addLeafletStyles} from '../scriptLoader'


import layerGroups from './layerGroups';

export default defineComponent({
    components: {
        MapSelector,
        LocationSelector,
    },
    data() {
        return {
            selectedMap,
            selectedLocations,
            savedMarkers: [] as any,
            mapData: null as null | any
        };
    },
    async mounted() {
        //addLeafletScript()
        addLeafletStyles()
        // this is the main logic of the map.
        this.mapData = await getMapData()

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
                removeAllMarkers();
                placeMarkersForSelectedLocations();
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
            //console.log('Removing all markers');
            for (let oldMap in layerGroups) {
                for (let group in layerGroups[oldMap]) {
                    let layers = layerGroups[oldMap][group];
                    if (layers) layers.removeFrom(map);
                }
            }
        }
        function removeUnselectedMarkers(): void {
            //console.log('Removing unselected markers');
            for (let locationType in VM.savedMarkers) {
                if (selectedLocations.list.includes(VM.savedMarkers[locationType])) continue;
                let layers = layerGroups[VM.selectedMap.map][VM.savedMarkers[locationType]];
                if (layers) layers.removeFrom(map);
                delete VM.savedMarkers[locationType];
            }
        }

        function placeMarkersForSelectedLocations(): void {
            console.log('Placing markers for selected locations');
            let mapMarkers = [] as any;
            // this function places the markers for each location. Hurray!
            for (let locationType in selectedLocations.list) {
                let layers = layerGroups[VM.selectedMap.map][selectedLocations.list[locationType]];
                console.log(layers);
                if (layers) layers.addTo(map);
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
