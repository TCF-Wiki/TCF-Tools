<template>
    <div class="page-content">
        <div class="left">
            <ItemSearch />
            <LocationSelector />
            <h2> Misc</h2> 
            <TierToggler />
            <ClearSearch />
            <ShareLink />
            <ColorSelector />
        </div>
        <div class="right">
            <MapSelector />
            <div id="map"></div>
        </div>
    </div>
</template>

<style src="./MarkerCluster.css" />
<style src="./MarkerCluster.Default.css" />

<script lang="ts">
import MapSelector from './components/MapSelector.vue';
import LocationSelector from './components/LocationSelector.vue';
import ItemSearch from './components/ItemSearch.vue';
import TierToggler from './components/TierToggler.vue'
import ClearSearch from './components/ClearSearch.vue';
import ShareLink from './components/ShareLink.vue'
import ColorSelector from './components/ColorSelector.vue';

import {defineComponent} from 'vue';
import L, {Map, type LeafletEvent, type TileLayer} from 'leaflet';
import 'leaflet-draw'

import {selectedMap, selectedLocations, selectedItems, selectedTier } from './store';
import {getMapData,getTierData} from './data';

import {map1TileLayer, map2TileLayer, map3TileLayer, bounds, brightsandsColor, crescentfallsColor} from './mapConstants';
import {addLeafletStyles, addResponsivePopupScript, addResponsivePopupStyles} from '../scriptLoader';
import { mapOneLabels, mapTwoLabels, mapThreeLabels } from './labels'

import { updateLocationLayerGroups, getLocationLayerGroups, updateItemLayerGroups, getItemLayerGroups } from './layerGroups';
import { loadInitialStore } from './URLParameterHandler';
let locationLayerGroups: any;
let itemLayerGroups: any;
export default defineComponent({
    components: {
        MapSelector,
        LocationSelector,
        ItemSearch,
        TierToggler,
        ClearSearch,
        ShareLink,
        ColorSelector
    },
    data() {
        return {
            selectedMap,
            selectedLocations,
            selectedItems,
            selectedTier,
            savedLocationMarkers: [] as any,
            savedItemMarkers: [] as any,
            mapData: null as null | any,
            tierData: null as null | any,
            isModalVisible: false as boolean
        };
    },
    async mounted() {
        addLeafletStyles();
        addResponsivePopupScript()
        addResponsivePopupStyles()
        // this is the main logic of the map.
        this.mapData = await getMapData();
        this.tierData = await getTierData()
        //Update layer groups
        await updateLocationLayerGroups();
        locationLayerGroups = getLocationLayerGroups();

        await updateItemLayerGroups();
        itemLayerGroups = getItemLayerGroups()

        loadInitialStore()
        // create our map, mounting it on the '#map' element
        let map = L.map('map', {
            crs: L.CRS.Simple,
            zoom: 1,
            minZoom: 1,
            maxZoom: 7,
            maxBounds: [[1024, -1024],[-1024, 1024]],
            zoomDelta: 0.5,
            zoomSnap: 0.5,
            wheelPxPerZoomLevel: 60,
            attributionControl: false,
        }).setView([-128, 128], 1);

        map.zoomControl.setPosition('topright');
        map.fitBounds(bounds);

        initiateMapToMapNumber(selectedMap.get()).addTo(map);

        // by adding it 5 seconds later it avoids a nasty bug where the coordinates are not loaded properly yet. 
        // so the labels are misplaced
        // have to find a better solution in the future
        setTimeout( () => {addMapLabels() }, 5 )

        // utility function used for development. Uncomment it when you need it.
        // map.on('click', function(e) {
		// 	let coords = e.latlng,
		// 	popup = L.popup()
		// 		.setLatLng(coords)
		// 		.setContent('<p>' + coords + '</p>')
		// 		.openOn(map);
        //     navigator.clipboard.writeText(coords.toString())                
		// });

        // we must keep our map variable to this file. We musn't mutate it in weird ways or set it to other variables, etc. That is why this is all kept to this file.
        this.$watch(
            'selectedMap',
            () => {
                removeItemTiers();
                if (selectedTier.get()) {
                    placeItemTiers();
                }
                removeAllMarkers();
                placeMarkersForSelectedLocations();
                placeMarkersForSelectedItems();
                initiateMapToMapNumber(selectedMap.get()).addTo(map);
                addMapLabels()
            },
            {deep: true}
        );

        this.$watch(
            'selectedLocations',
            () => {
                removeUnselectedLocationMarkers();
                placeMarkersForSelectedLocations();

            },
            {deep: true}
        );

        this.$watch(
            'selectedItems',
            () => {
                removeUnselectedItemMarkers();
                placeMarkersForSelectedItems();
            },
            {deep: true}
        )

        this.$watch(
            'selectedTier',
            () => {
                if (selectedTier.get()) {
                    placeItemTiers();
                } else {
                    removeItemTiers()
                }
            },
            {deep: true}
        )

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

        function addMapLabels() {
            toggleMapOneLabels()
            toggleMapTwoLabels()
            toggleMapThreeLabels()
        }

        let VM = this;
        function removeAllMarkers(): void {
            //console.log('Removing all markers');
            for (let oldMap in locationLayerGroups) {
                for (let group in locationLayerGroups[oldMap]) {
                    let layers = locationLayerGroups[oldMap][group];
                    if (layers) layers.removeFrom(map);
                }
            }
            for (let oldMap in itemLayerGroups) {
                for (let group in itemLayerGroups[oldMap]) {
                    let layers = itemLayerGroups[oldMap][group];
                    if (layers) layers.removeFrom(map);
                }
            }
        }
        function removeUnselectedLocationMarkers(): void {
            //console.log('Removing unselected markers');
            for (let locationType in VM.savedLocationMarkers) {
                if (selectedLocations.get().includes(VM.savedLocationMarkers[locationType])) continue;
                let layers = locationLayerGroups[VM.selectedMap.get()][VM.savedLocationMarkers[locationType]];
                if (layers) layers.removeFrom(map);
                delete VM.savedLocationMarkers[locationType];
            }
        }

        function removeUnselectedItemMarkers(): void {
            for (let item in VM.savedItemMarkers) {
                if (selectedItems.get().includes(VM.savedItemMarkers[item])) continue;
                let layers = itemLayerGroups[VM.selectedMap.get()][VM.savedItemMarkers[item]];
                if (layers) layers.removeFrom(map);
                delete VM.savedItemMarkers[item];
            }
        }

        function placeMarkersForSelectedLocations(): void {
            let mapMarkers = [] as any;
            // this function places the markers for each location. Hurray!
            for (let locationType in selectedLocations.get()) {
                let layers = locationLayerGroups[VM.selectedMap.get()][selectedLocations.get()[locationType]];
                if (layers) layers.addTo(map);
                mapMarkers.push(selectedLocations.get()[locationType]);
            }
            VM.savedLocationMarkers = mapMarkers;

        }

        function placeMarkersForSelectedItems() : void {
            let mapMarkers = [] as any;
            for (let item in selectedItems.get()) {
                let layers = itemLayerGroups[VM.selectedMap.get()][selectedItems.get()[item]];
                if (layers) layers.addTo(map);
                mapMarkers.push(selectedItems.get()[item]);
            }
            VM.savedItemMarkers = mapMarkers
        }

        const tierOneOptions = {color: '#dfe3e8', weight: 0, fillOpacity: 0.2};
        const tierTwoOptions = {color: '#4cb31b', weight: 0, fillOpacity: 0.3};
        const tierThreeOptions = {color: '#1da7ec', weight: 0, fillOpacity: 0.3};
        const tierFourOptions = {color: '#4f0e8b', weight: 0, fillOpacity: 0.3};
        const tierFiveOptions = {color: '#ff0984', weight: 0, fillOpacity: 0.3};

        const mapOneTierOne = L.polygon(this.tierData['1']['1'], tierOneOptions);
        const mapOneTierTwo = L.polygon(this.tierData['1']['2'], tierTwoOptions);
        const mapOneTierThree = L.polygon(this.tierData['1']['3'], tierThreeOptions);
        const mapOneTierFour = L.polygon(this.tierData['1']['4'], tierFourOptions);

        const mapTwoTierThree = L.polygon(this.tierData['2']['3'], tierThreeOptions);
        const mapTwoTierFour = L.polygon(this.tierData['2']['4'], tierFourOptions)
        const mapTwoTierFive = L.polygon(this.tierData['2']['5'], tierFiveOptions)

        function placeItemTiers() {
            if (selectedTier.get()) {
                if (selectedMap.get() == 1) {
                map.addLayer(mapOneTierOne)
                map.addLayer(mapOneTierTwo)
                map.addLayer(mapOneTierThree)
                map.addLayer(mapOneTierFour)
            }   
            if (selectedMap.get() == 2) {
                map.addLayer(mapTwoTierThree)
                map.addLayer(mapTwoTierFour)
                map.addLayer(mapTwoTierFive)
            }
            if (selectedMap.get() == 3) {
                // ...
            }
            }
        }

        function removeItemTiers() {
            // map one
            map.removeLayer(mapOneTierOne)
            map.removeLayer(mapOneTierTwo)
            map.removeLayer(mapOneTierThree)
            map.removeLayer(mapOneTierFour)
            // map two
            map.removeLayer(mapTwoTierThree)
            map.removeLayer(mapTwoTierFour)
            map.removeLayer(mapTwoTierFive)
            //map three ...
        }


        
        function toggleMapOneLabels() {
            if (selectedMap.get() == 1) {
                for (let label in mapOneLabels) {
                    mapOneLabels[label].addTo(map)
                }
            } else {
                for (let label in mapOneLabels) {
                    mapOneLabels[label].removeFrom(map)
                }
            }    
        }
        function toggleMapTwoLabels() {
            if (selectedMap.get() == 2) {
                for (let label in mapTwoLabels) {
                    mapTwoLabels[label].addTo(map)
                }
            } else {
                for (let label in mapTwoLabels) {
                    mapTwoLabels[label].removeFrom(map)
                }
            }    
        }
        function toggleMapThreeLabels() {
            // if (selectedMap.get() == 3) {
            //     for (let label in mapThreeLabels) {
            //         mapThreeLabels[label].addTo(map)
            //     }
            // } else {
            //     for (let label in mapThreeLabels) {
            //         mapThreeLabels[label].removeFrom(map)
            //     }
            // }    
        }


        placeMarkersForSelectedLocations()
        placeMarkersForSelectedItems()
        placeItemTiers()
    },
    methods: {
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        }
    }
});
</script>

<style scoped>
.page-content {
    display: flex;
    flex-direction: row;
    height: 100%;
    margin-right: 1.5vw;
    max-width: 100%;
    gap: 12rem
}

.left {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 30%;
}

.right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
}

#map {
    width: 80%;
    padding-bottom: 80%;
    z-index: 0;
}

.selectors {
    display: flex;
    gap: 2rem;
    flex-direction: column;
}
</style>
