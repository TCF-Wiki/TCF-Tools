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
        
        map1Labels() 
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
                map1Labels()
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

        function mapLabel(text: string, y : number, x : number) {
            let content = '<span class="map-label-text">' + text + '</span>';

            const locationIcon = L.divIcon({
            className: 'fa fa-circle',
            });

            let marker = L.marker([y, x], {icon: locationIcon, opacity: 0});

            marker.bindTooltip(content, {direction: 'center', permanent: true, className: 'map-label', offset: [0, 12]}).addTo(map);
        }

        function map1Labels() {
            mapLabel('Base Camp', -138.940337, 125.702529);
            mapLabel('Science Campus',  -191.954086, 193.220039);
            mapLabel('Waterfall Labs', -52.919844, 188.220558);
            mapLabel('Dig Site', -55.920623, 120.699287);
            mapLabel('Crashed Ship', -70.924514, 67.685538);
            mapLabel('Jungle Camp', -67.6188312285434,36.24883521333987);
            mapLabel('Water Facility', -202.12876256743502,125.38303089749877);
            mapLabel('Swamp Camp', -194.24505731976458,69.6269617459539);
            mapLabel('East Collection Point', -114.87716864884747,180.76109612555175);
            mapLabel('Comms Tower', -119.74426036047082,58.63039480137322);
            mapLabel('North Uplink', -105.8744099435998,135.7591956841589);
            mapLabel('South East Uplink', -166.3778008521334,167.25407675331044);
            mapLabel('Vaccine Labs', -135.49906510544383,200.78641490926924);
            mapLabel('Lagoon', -172.6331764958313,228.51771701814613);
            mapLabel('Woodcutter Camp', -76.99885820255027,202.76612309955863);
            mapLabel('Lake', -75.62465516184403,173.6375061304561);
            mapLabel('Power Plant', -145.88035648602255,82.00049043648848);
            mapLabel('Rock Pools', -164.25676649092694,49.12113781265326);
            mapLabel('Jungle', -52.47409115988229,63.502268268759195);
            mapLabel('Abandoned Mine', -29.362332945071117,160.88315350662089);
            mapLabel('Parking Lot', -58.37655560323688,146.75122609122118);
            mapLabel('Crashed Drill Site', -110.00161690779794,167.27023050514958);
            mapLabel('South West Collection Point', -164.8783334355076,96.0013487003433);
            mapLabel('Swamp', -196.49971646640512,49.24717999019127);
            mapLabel('Waterfalls', -35.62097688818048,199.14124570868074);
            mapLabel('East Caverns', -101.86987340608141,206.14192005885238);
        }

        map.on('click', function(e) {
				let coords = e.latlng,
						popup = L.popup()
							.setLatLng(coords)
							.setContent('<p>' + coords + '</p>')
							.openOn(map);
                            navigator.clipboard.writeText([coords.lat, coords.lng].toString())
			});

        function map2Labels() {
            mapLabel('Favela', 642, 278);
            mapLabel('Lagoon', 936, 365);
            mapLabel('Fallen Tree', 325, 1005);
            mapLabel('Greens Prospect', 1015, 1054);
            mapLabel('Hay Fields', 288, 1419);
            mapLabel('Nutrion Farms Processing', 574, 559);
            mapLabel('Jungle Thermal Ponds', 621, 1197);
            mapLabel('Nutrion Farms Warehouse', 517, 1757);
            mapLabel('Geothermal Plant', 1117, 474);
            mapLabel('Root Rock Tunnel', 1611, 660);
            mapLabel('Lakeside Building', 1311, 874);
            mapLabel('Skeleton', 1649, 1027);
            mapLabel('Skeleton Observation Site', 1810, 1132);
            mapLabel('Oasis', 1621, 1470);
            mapLabel('Pinnacle Labs', 1649, 1788);
            mapLabel('Osiris Wildlife Preserve', 1258, 1177);
            mapLabel('Starport Admin', 1142, 1325);
            mapLabel('Pumpkin Fields', 808, 1658);
            mapLabel('Startport Landing Pad', 982, 1478);
            mapLabel('Starport Warehouse', 1321, 1472);
            mapLabel('Lagoon Thermal Ponds', 938, 640);
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
