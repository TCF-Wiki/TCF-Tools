import {roundToThree} from '@/apps/calc/utils';
import L, {LayerGroup, Marker, type Content, type LeafletEvent, type LeafletEventHandlerFn} from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet-responsive-popup';
import {getMapData} from './data';
import {alphabeticalCreatures, specialLocations} from './mapConstants';
import {createLootPopup, createSpecialPopup} from './popup';
import { clusterEnabled, minimumPercent, selectedItems, selectedMap } from './store';
let locationLayerGroups: any = {};

export function getLocationLayerGroups(): any {
    return locationLayerGroups;
}

export async function updateLocationLayerGroups() {
    const mapData = await getMapData();
    for (var map in mapData['locations']) {
        if (!locationLayerGroups[map]) locationLayerGroups[map] = {};
        for (var locationType in mapData['locations'][map]) {
            if (locationType == 'other') {
                for (let special in mapData['locations'][map][locationType]) {
                    createGroups(map, special, mapData['locations'][map][locationType][special]);
                }
                continue;
            }
            createGroups(map, locationType, mapData['locations'][map][locationType]);
        }
    }
    function createGroups(map: string, locationType: string, locationData: any) {
        // our layer group for our markers.
        let locationGroup = L.layerGroup();
        // the icon that will be used for this group
        let LocationMarker = L.icon({
            iconUrl: `map-images/marker-icons/${locationType}.png`,
            iconSize: [25, 25],
            className: 'marker',
        });
        // add each location to the group
        for (let location in locationData) {
            // create the marker for it at the location, and add it to the group
            let m = new Marker(locationData[location]['location'], {
                riseOnHover: true,
                icon: LocationMarker,
            });
            locationGroup.addLayer(m);
            //create a popup that only runs the code once the marker is clicked
            // @ts-expect-error the error from this line can be ignored - it runs as expected.
            let popup = L.responsivePopup().setContent('Placeholder');
            m.bindPopup(popup);
            m.on('click', createMarkerPopup);

            // set some data we use in the popup
            /* @ts-expect-error */
            m.data = locationData[location]['lootPool'];
            /* @ts-expect-error */
            m.type = locationType;
            /* @ts-expect-error */
            m.location = locationData[location]['location'];

            // some locations need to be able to be uniquely identified
            let rawName = locationData[location]['rawName'];
            if (rawName) {
                if (rawName.includes('KeyCard') || rawName.includes('DeadDrop')) {
                    /* @ts-expect-error */
                    m.rawName = rawName;
                }
            }
        }
        // add it to our main group object
        locationLayerGroups[map][locationType] = locationGroup;
    }
}

export function getCreatureLayerGroups(): any {
    return locationLayerGroups;
}

export async function updateCreatureLayerGroups() {
    const mapData = await getMapData();
    for (var map in mapData['creatureLocations']) {
        if (!locationLayerGroups[map]) locationLayerGroups[map] = {};
        for (var creature in mapData['creatureLocations'][map]) {
            createGroups(map, creature, mapData['creatureLocations'][map][creature]);
        }
    }
    function createGroups(map: string, creature: string, locationData: any) {
        // our layer group for our markers.
        let locationGroup = L.layerGroup();
        // the icon that will be used for this group
        let url : string = '';
        if (creature.includes('Beetle')) {
            if (creature.includes('Acid')) {
                url = `map-images/item-images/Acid_Tick.png`
            } else {
                url = `map-images/item-images/Blast_Tick.png`
            }
        } else {
            // @ts-ignore
            if(alphabeticalCreatures[creature] != null) {
                // @ts-ignore
                url = `map-images/item-images/${alphabeticalCreatures[creature].replaceAll(' ', '_')}_Head.png`;
            } else {
                url = `map-images/item-images/${creature.replaceAll(' ', '_')}_Head.png`;
            }
        }
        
        let LocationMarker = L.icon({
            iconUrl: url,
            iconSize: [25, 25],
            className: 'marker',
        });
        // add each location to the group
        for (let location in locationData) {
            // create the marker for it at the location, and add it to the group
            let m = new Marker(locationData[location]['location'], {
                riseOnHover: true,
                icon: LocationMarker,
            });
            locationGroup.addLayer(m);
        }
        // add it to our main group object
        locationLayerGroups[map][creature] = locationGroup;
    }
}



let itemLayerGroups: any = {};
let itemAmounts: any = {};
export function getItemLayerGroups(): any {
    return itemLayerGroups;
}
export function getItemAmounts() : any {
    return itemAmounts;
}

const mapData = await getMapData();

export async function updateItemLayerGroups() {
    if (clusterEnabled.get()) {
        itemLayerGroups = {}
    }

    if (!itemLayerGroups[selectedMap.get()]) itemLayerGroups[selectedMap.get()] = {};
    for (let item in mapData['itemSpawns'][selectedMap.get()]) {
        if (!selectedItems.get().includes(item)) continue
    
        let data : any;

        // optional feature: If a user wants to filter out spawns from below a certain percentage.
        // Performance heavy (it is a long list)
        if (minimumPercent.get()) {
            let tempData = []
            const spawns = mapData['itemSpawns'][selectedMap.get()][item]

            for (let spawn in spawns) {
                const pool = spawns[spawn]['lootPool']
                if (!pool) continue

                const loot = mapData['lootPools'][pool]['items']
                if (!loot) continue

                const itemPercent = loot[item]
                if (!itemPercent) continue

                if (itemPercent >= minimumPercent.get()) tempData.push(spawns[spawn])
            }

            data = tempData

        } else {
            data =  mapData['itemSpawns'][selectedMap.get()][item]
        }
        
        itemAmounts[item] = data.length

        createGroups(selectedMap.get().toString(), item, data);
    }
    function createGroups(map: string, item: string, locationData: any) {
        let locationGroup = L.markerClusterGroup({
            showCoverageOnHover: false,
            spiderfyOnMaxZoom: false,
            // disables clustering if the users wants that by setting zoom value to something impossible.
            disableClusteringAtZoom: clusterEnabled.get() ? -10 : 5,
            iconCreateFunction: function (cluster) {
                let childCount = cluster.getChildCount();

                let c = ' marker-cluster-';
                if (childCount < 5) {
                    c += 'uncommon';
                } else if (childCount < 15) {
                    c += 'rare';
                } else if (childCount < 45) {
                    c += 'epic';
                } else {
                    c += 'legendary';
                }

                return new L.DivIcon({html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(20, 20)});
            },
        });

        // get name of item, adjusting for possible items with wrong name
        let icon : string;
        if (item?.includes('Map01_KeyCard')) icon = 'Bright_Sands_Key_Card.png'
        else if (item?.includes('Map02_KeyCard')) icon = 'Crescent_Falls_Key_Card.png'
        else if (item?.includes('Map03_KeyCard')) icon = 'Tharis_Island_Key_Card.png'
        else icon = mapData['descriptions'][item]['icon'].replace(' - Mk.II', '').replace(' - Mk.I', '').replaceAll(' ', '_').replaceAll('#', '%23');

        let ItemMarker = L.icon({
            iconUrl: `map-images/item-images/${icon}`,
            iconSize: [25, 25],
            className: 'marker',
        });
        for (let location in locationData) {
            let m = new Marker(locationData[location]['location'], {
                riseOnHover: true,
                icon: ItemMarker,
            });
            m.bindPopup('Placeholder!');
            m.on('click', createMarkerPopup);

            /* @ts-expect-error */
            m.data = locationData[location]['lootPool'];
            m.options.title = locationData[location]['lootPool'];
            locationGroup.addLayer(m);
        }
        itemLayerGroups[map][item] = locationGroup;
    }
}

function createMarkerPopup(e: LeafletEvent): void | LeafletEventHandlerFn {
    let popup = e.target.getPopup();
    let type = e.target.type ?? null;
    let rawName = e.target.rawName ?? null;
    let data = e.target.data;
    let location = e.target.location;

    if (type) {
        if (specialLocations.includes(type)) {
            const content = createSpecialPopup(type, rawName, location);
            popup.setContent(content);
        } else {
            const content = createLootPopup(data);
            popup.setContent(content);
        }
    } else {
        const content = createLootPopup(data);
        popup.setContent(content);
    }
}
