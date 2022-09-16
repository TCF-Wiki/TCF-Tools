<template>
    <div class="page-content">
        <div class="left">
            <button type="button" class="button" @click="showModal">Open Modal </button>
            <Modal
                v-show="isModalVisible"
                @close="closeModal"
                >
                <template v-slot:header>
                    <h2> Select Locations </h2>
                </template>

                <template v-slot:body>
                    <LocationSelector />
                </template>

                <template v-slot:footer2>
                    This is a new modal footer.
                </template>
            </Modal>
            <ItemSearch />
            <TierToggler />

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
import Modal from '../Modal.vue';

import {defineComponent, watch} from 'vue';
import L, {Map, type TileLayer} from 'leaflet';
import {selectedMap, selectedLocations, selectedItems, selectedTier } from './store';
import {getMapData,getTierData} from './data';

import {map1TileLayer, map2TileLayer, map3TileLayer, bounds, brightsandsColor, crescentfallsColor} from './mapConstants';
import {addLeafletScript, addLeafletStyles} from '../scriptLoader';

import { updateLocationLayerGroups, getLocationLayerGroups, updateItemLayerGroups, getItemLayerGroups } from './layerGroups';
let locationLayerGroups: any;
let itemLayerGroups: any;
export default defineComponent({
    components: {
        MapSelector,
        LocationSelector,
        ItemSearch,
        TierToggler,
        Modal
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
        //addLeafletScript()
        addLeafletStyles();
        // this is the main logic of the map.
        this.mapData = await getMapData();
        this.tierData = await getTierData()
        //Update layer groups
        await updateLocationLayerGroups();
        locationLayerGroups = getLocationLayerGroups();

        await updateItemLayerGroups();
        itemLayerGroups = getItemLayerGroups()
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
                removeItemTiers();
                if (selectedTier.on) {
                    placeItemTiers();
                }
                removeAllMarkers();
                placeMarkersForSelectedLocations();
                placeMarkersForSelectedItems();
                initiateMapToMapNumber(selectedMap.map).addTo(map);
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
                if (selectedTier.on) {
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
                if (selectedLocations.list.includes(VM.savedLocationMarkers[locationType])) continue;
                let layers = locationLayerGroups[VM.selectedMap.map][VM.savedLocationMarkers[locationType]];
                if (layers) layers.removeFrom(map);
                delete VM.savedLocationMarkers[locationType];
            }
        }

        function removeUnselectedItemMarkers(): void {
            for (let item in VM.savedItemMarkers) {
                if (selectedItems.list.includes(VM.savedItemMarkers[item])) continue;
                let layers = itemLayerGroups[VM.selectedMap.map][VM.savedItemMarkers[item]];
                if (layers) layers.removeFrom(map);
                delete VM.savedItemMarkers[item];
            }
        }

        function placeMarkersForSelectedLocations(): void {
            let mapMarkers = [] as any;
            // this function places the markers for each location. Hurray!
            for (let locationType in selectedLocations.list) {
                let layers = locationLayerGroups[VM.selectedMap.map][selectedLocations.list[locationType]];
                if (layers) layers.addTo(map);
                mapMarkers.push(selectedLocations.list[locationType]);
            }
            VM.savedLocationMarkers = mapMarkers;

        }

        function placeMarkersForSelectedItems() : void {
            let mapMarkers = [] as any;
            for (let item in selectedItems.list) {
                let layers = itemLayerGroups[VM.selectedMap.map][selectedItems.list[item]];
                if (layers) layers.addTo(map);
                mapMarkers.push(selectedItems.list[item]);
            }
            VM.savedItemMarkers = mapMarkers
        }

        const tierOneOptions = {color: '#dfe3e8', weight: 0, fillOpacity: 0.2};
        const tierTwoOptions = {color: '#4cb31b', weight: 0, fillOpacity: 0.4};
        const tierThreeOptions = {color: '#1da7ec', weight: 0, fillOpacity: 0.4};
        const tierFourOptions = {color: '#4f0e8b', weight: 0, fillOpacity: 0.4};
        const tierFiveOptions = {color: '#ff0984', weight: 0, fillOpacity: 0.4};

        const mapOneTierOne = L.polygon(this.tierData['1']['1'], tierOneOptions);
        const mapOneTierTwo = L.polygon(this.tierData['1']['2'], tierTwoOptions);
        const mapOneTierThree = L.polygon(this.tierData['1']['3'], tierThreeOptions);
        const mapOneTierFour = L.polygon(this.tierData['1']['4'], tierFourOptions);

        const mapTwoTierThree = L.polygon(this.tierData['2']['3'], tierThreeOptions);
        const mapTwoTierFour = L.polygon(this.tierData['2']['4'], tierFourOptions)
        const mapTwoTierFive = L.polygon(this.tierData['2']['5'], tierFiveOptions)

        function placeItemTiers() {
            if (selectedMap.map == 1) {
                map.addLayer(mapOneTierOne)
                map.addLayer(mapOneTierTwo)
                map.addLayer(mapOneTierThree)
                map.addLayer(mapOneTierFour)
            }   
            if (selectedMap.map == 2) {
                map.addLayer(mapTwoTierThree)
                map.addLayer(mapTwoTierFour)
                map.addLayer(mapTwoTierFive)
            }
            if (selectedMap.map == 3) {
                // ...
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
    justify-content: space-between;
    align-items: center;
    margin-right: 1.5vw;
    max-width: 100%;
}

.left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 20%;
}

.right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 60%;
}

#map {
    padding-bottom: 75%;
    width: 75%;
    z-index: 0;
}

.selectors {
    display: flex;
    gap: 2rem;
    flex-direction: column;
}
</style>
