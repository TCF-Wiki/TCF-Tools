<template>
    <Suspense>
        <div class="page-content" id="page-content">
        <div class="left" id="left">
            <div id="left-content">
                <ItemSearch />
                <LocationSelector />
                <section>
                <h2>Options</h2>
                    <div class="setting-container"> 
                        <TierToggler />
                        <ClearSearch />
                        <ShareLink />
                    </div>
                </section>
                <section> 
                    <ColorSelector />
                </section>
            </div>
            <button id="sidebar-toggler" @click="toggleSidebar">
                ◀
            </button>
        </div>
        <div class="right" id="right">
            <MapSelector />
            <div id="map"></div>
        </div>
    </div>
    <template #fallback>
        <div class="fallback-content page-content">
            Loading...
        </div>
    </template>
    </Suspense>
    
</template>

<style src="./MarkerCluster.css" />
<style src="./MarkerCluster.Default.css" />

<script lang="ts">
import MapSelector from './components/MapSelector.vue';
import LocationSelector from './components/LocationSelector.vue';
import ItemSearch from './components/ItemSearch.vue';
import TierToggler from './components/TierToggler.vue';
import ClearSearch from './components/ClearSearch.vue';
import ShareLink from './components/ShareLink.vue';
import ColorSelector from './components/ColorSelector.vue';

import {defineComponent} from 'vue';
import L, {Map, type LeafletEvent, type TileLayer} from 'leaflet';
import 'leaflet-draw';

import {selectedMap, selectedLocations, selectedItems, selectedTier} from './store';
import {getMapData, getTierData} from './data';

import {map1TileLayer, map2TileLayer, map3TileLayer, bounds, brightsandsColor, crescentfallsColor} from './mapConstants';
import {addLeafletStyles, addResponsivePopupScript, addResponsivePopupStyles} from '../../scriptLoader';
import {mapOneLabels, mapTwoLabels, mapThreeLabels} from './labels';

import {updateLocationLayerGroups, getLocationLayerGroups, updateItemLayerGroups, getItemLayerGroups} from './layerGroups';
import {loadInitialStore} from './URLParameterHandler';
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
        ColorSelector,
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
            isModalVisible: false as boolean,
            isExpanded: true as boolean
        };
    },
    async mounted() {
        addLeafletStyles();
        addResponsivePopupScript();
        addResponsivePopupStyles();
        // this is the main logic of the map.
        this.mapData = await getMapData();
        this.tierData = await getTierData();
        //Update layer groups
        await updateLocationLayerGroups();
        locationLayerGroups = getLocationLayerGroups();

        await updateItemLayerGroups();
        itemLayerGroups = getItemLayerGroups();

        loadInitialStore();
        // create our map, mounting it on the '#map' element
        let map = L.map('map', {
            crs: L.CRS.Simple,
            zoom: 1,
            minZoom: 1,
            maxZoom: 7,
            maxBounds: [
                [1024, -1024],
                [-1024, 1024],
            ],
            zoomDelta: 0.7,
            zoomSnap: 0.05,
            wheelPxPerZoomLevel: 40,
            attributionControl: false,
        }).setView([-128, 128], 1);

        map.zoomControl.setPosition('topright');
        map.fitBounds(bounds);

        initiateMapToMapNumber(selectedMap.get()).addTo(map);

        // by adding it 5 miliseconds later it avoids a nasty bug where the coordinates are not loaded properly yet.
        // so the labels are misplaced
        // have to find a better solution in the future
        setTimeout(() => {
            addMapLabels();
        }, 5);

        // utility function used for development. Uncomment it when you need it.
        // map.on('click', function (e) {
        //     let coords = e.latlng,
        //         popup = L.popup()
        //             .setLatLng(coords)
        //             .setContent('<p>' + coords + '</p>')
        //             .openOn(map);
        //     navigator.clipboard.writeText(coords.toString());
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
                addMapLabels();
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
        );

        this.$watch(
            'selectedTier',
            () => {
                if (selectedTier.get()) {
                    placeItemTiers();
                } else {
                    removeItemTiers();
                }
            },
            {deep: true}
        );

        function initiateMapToMapNumber(mapNumber: number): TileLayer {
            // this function initialises the map to a specified map number.
            if (mapNumber == 1) {
                if (map.hasLayer(map2TileLayer)) {
                    map.removeLayer(map2TileLayer);
                }
                if (map.hasLayer(map3TileLayer)) {
                    map.removeLayer(map3TileLayer);
                }

                return map1TileLayer;
            } else if (mapNumber == 2) {
                if (map.hasLayer(map1TileLayer)) {
                    map.removeLayer(map1TileLayer);
                }
                if (map.hasLayer(map3TileLayer)) {
                    map.removeLayer(map3TileLayer);
                }
                return map2TileLayer;
            } else if (mapNumber == 3) {
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
            toggleMapOneLabels();
            toggleMapTwoLabels();
            toggleMapThreeLabels();
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

        function placeMarkersForSelectedItems(): void {
            let mapMarkers = [] as any;
            for (let item in selectedItems.get()) {
                let layers = itemLayerGroups[VM.selectedMap.get()][selectedItems.get()[item]];
                if (layers) layers.addTo(map);
                mapMarkers.push(selectedItems.get()[item]);
            }
            VM.savedItemMarkers = mapMarkers;
        }

        const tierOneOptions = {color: '#dfe3e8', weight: 0, fillOpacity: 0.2};
        const tierTwoOptions = {color: '#4cb31b', weight: 0, fillOpacity: 0.3};
        const tierThreeOptions = {color: '#1da7ec', weight: 0, fillOpacity: 0.3};
        const tierFourOptions = {color: '#4f0e8b', weight: 0, fillOpacity: 0.3};
        const tierFiveOptions = {color: '#ee3355', weight: 0, fillOpacity: 0.3};

        const mapOneTierOne = L.polygon(this.tierData['1']['1'], tierOneOptions);
        const mapOneTierTwo = L.polygon(this.tierData['1']['2'], tierTwoOptions);
        const mapOneTierThree = L.polygon(this.tierData['1']['3'], tierThreeOptions);
        const mapOneTierFour = L.polygon(this.tierData['1']['4'], tierFourOptions);

        const mapTwoTierThree = L.polygon(this.tierData['2']['3'], tierThreeOptions);
        const mapTwoTierFour = L.polygon(this.tierData['2']['4'], tierFourOptions);
        const mapTwoTierFive = L.polygon(this.tierData['2']['5'], tierFiveOptions);

        function placeItemTiers() {
            if (selectedTier.get()) {
                if (selectedMap.get() == 1) {
                    map.addLayer(mapOneTierOne);
                    map.addLayer(mapOneTierTwo);
                    map.addLayer(mapOneTierThree);
                    map.addLayer(mapOneTierFour);
                }
                if (selectedMap.get() == 2) {
                    map.addLayer(mapTwoTierThree);
                    map.addLayer(mapTwoTierFour);
                    map.addLayer(mapTwoTierFive);
                }
                if (selectedMap.get() == 3) {
                    // ...
                }
            }
        }

        function removeItemTiers() {
            // map one
            map.removeLayer(mapOneTierOne);
            map.removeLayer(mapOneTierTwo);
            map.removeLayer(mapOneTierThree);
            map.removeLayer(mapOneTierFour);
            // map two
            map.removeLayer(mapTwoTierThree);
            map.removeLayer(mapTwoTierFour);
            map.removeLayer(mapTwoTierFive);
            //map three ...
        }

        function toggleMapOneLabels() {
            if (selectedMap.get() == 1) {
                for (let label in mapOneLabels) {
                    mapOneLabels[label].addTo(map);
                }
            } else {
                for (let label in mapOneLabels) {
                    mapOneLabels[label].removeFrom(map);
                }
            }
        }
        function toggleMapTwoLabels() {
            if (selectedMap.get() == 2) {
                for (let label in mapTwoLabels) {
                    mapTwoLabels[label].addTo(map);
                }
            } else {
                for (let label in mapTwoLabels) {
                    mapTwoLabels[label].removeFrom(map);
                }
            }
        }
        function toggleMapThreeLabels() {
            if (selectedMap.get() == 3) {
                for (let label in mapThreeLabels) {
                    mapThreeLabels[label].addTo(map);
                }
            } else {
                for (let label in mapThreeLabels) {
                    mapThreeLabels[label].removeFrom(map);
                }
            }
        }

        placeMarkersForSelectedLocations();
        placeMarkersForSelectedItems();
        placeItemTiers();
    },
    methods: {
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        toggleSidebar() {
            let content = document.querySelector('#page-content')
            let left = document.querySelector('#left')
            let left_content = document.querySelector('#left-content')
            
            if (this.isExpanded) {
                if (left) {
                    left.classList.remove('expand-left')
                    left.classList.add('collapse-left')
                }

                if (left_content) {
                    left_content.classList.remove('expand-sidebar')
                    left_content.classList.add('collapse-sidebar')
                }

                if (content) {
                    content.classList.remove('expand-content')
                    content.classList.add('collapse-content')
                }

                this.isExpanded = false
            } else {
                if (left) {
                    left.classList.remove('collapse-left')
                    left.classList.add('expand-left')
                }

                if (left_content) {
                    left_content.classList.remove('collapse-sidebar')
                    left_content.classList.add('expand-sidebar')
                }

                if (content) {
                    content.classList.remove('collapse-content')
                    content.classList.add('expand-content')
                }

                this.isExpanded = true
            }
            console.log('Pressed!')
        }
    },
});
</script>

<style scoped>
.page-content {
    display: flex;
    flex-direction: row;
    height: 100%;
    margin-right: 1.5vw;
    max-width: 100%;
    gap: 12rem;
}

.left {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 40%;
    position: relative;
}

.right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content:start;
    width: 90%;
    gap: 0;
}

#map {
    width: 100%;
    padding-bottom: 100%;
    z-index: 0;
    background-color: #081021;
}

.selectors {
    display: flex;
    gap: 2rem;
    flex-direction: column;
}

h2 {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
}

@media screen and (max-width: 900px) {
    .page-content {
        margin: 0;
        flex-direction: column;
        gap: 2rem;
    }

    .left, 
    .right {
        width: 	100%;
    }

    #map {
        margin-top: 1rem;
        margin-right: 0;
        padding: 0;
        width: 100%;
        padding-bottom: 100%;
    }

    #sidebar-toggler {
        display: none;
    }

    
}

.collapse-sidebar {
    animation: collapse-sidebar .8s linear forwards;
    overflow: hidden;
    white-space: nowrap;
}

.expand-sidebar {
    overflow: hidden;
    white-space: nowrap;
    animation: expand-sidebar .8s linear forwards;
}

.collapse-left {
    animation: collapse-left .8s linear forwards;
}

.expand-left {
    animation: expand-left .8s linear forwards;
}

#sidebar-toggler {
    position: absolute;
    top: 0;
    right: 0;
    display: none;
}

@keyframes collapse-sidebar {
    0% {
        width: 100%;
    }
    100% {
        width: 0;
    }
}

@keyframes expand-sidebar {
    0% {
        width: 0%;
    }
    100% {
        width: 100%;
    }
}

@keyframes collapse-left {
    1% {
        width: 40%
    }
    100% {
        width: 0%
    }
}

@keyframes expand-left {
    1% {
        width: 0%;
    }
    100% {
        width: 40%;
    }
}

.collapse-content {
    animation: collapse-content .8s linear forwards;
}

.expand-content {
    animation: expand-content .8s linear forwards;
}

@keyframes collapse-content {
    0% {
        gap: 12em
    }
    100% {
        gap: 2em
    }
}

@keyframes expand-content {
    0% {
        gap: 2em
    }
    100% {
        gap: 12em
    }
}

.fallback-content {
    width: 100%;
    height: 40em;
    background-color: red;
}

section {
    background-color: var(--background-body-color);
    padding: 1rem;
    margin-bottom: 1rem;
}
.setting-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
}
</style>
