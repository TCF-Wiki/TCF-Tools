import { roundToThree } from '@/calc/utils';
import L, {LayerGroup, Marker, type Content, type LeafletEvent, type LeafletEventHandlerFn} from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet-responsive-popup';
import {getMapData} from './data';
import { specialLocations } from './mapConstants';
import { createLootPopup, createSpecialPopup } from './popup'
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
            iconSize: [25,25],
            className: 'marker',
        })
        // add each location to the group
        for (let location in locationData) {
            // create the marker for it at the location, and add it to the group
            let m = new Marker(locationData[location]['location'], 
            {
                riseOnHover: true,
                icon: LocationMarker
            });
            locationGroup.addLayer(m);
            //create a popup that only runs the code once the marker is clicked
            // @ts-expect-error the error from this line can be ignored - it runs as expected.
            let popup = L.responsivePopup().setContent('Placeholder');
            m.bindPopup(popup);
            m.on('click',createMarkerPopup)

            // set some data we use in the popup
            /* @ts-expect-error */
            m.data = locationData[location]['lootPool']
            /* @ts-expect-error */
            m.type = locationType
            
            // some locations need to be able to be uniquely identified
            let rawName = locationData[location]['rawName']
            if (rawName) {
                if (rawName.includes('KeyCard')) {
                    /* @ts-expect-error */
                    m.rawName = rawName
                }
            }
        }
        // add it to our main group object
        locationLayerGroups[map][locationType] = locationGroup;
    }
}

let itemLayerGroups: any = {};

export function getItemLayerGroups(): any {
    return itemLayerGroups;
}
const mapData = await getMapData()

export async function updateItemLayerGroups() {
    for (let map in mapData['itemSpawns']) {
        if (!itemLayerGroups[map]) itemLayerGroups[map] = {};
        for (let item in mapData['itemSpawns'][map]) {
            createGroups(map, item, mapData['itemSpawns'][map][item]);
        }
    }
    function createGroups(map: string, item: string, locationData: any) {
        let locationGroup = L.markerClusterGroup({
            showCoverageOnHover: false,
            spiderfyOnMaxZoom: false,
            disableClusteringAtZoom: 5,
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
        let ItemMarker = L.icon({
            iconUrl: `map-images/item-images/${mapData['descriptions'][item]['name'].replaceAll(' ','_')}.png`,
            iconSize: [25,25],
            className: 'marker',
        })
        for (let location in locationData) {
            let m = new Marker(locationData[location]['location'],
            {
                riseOnHover: true,
                icon: ItemMarker
            });
            m.bindPopup('Placeholder!');
            m.on('click',createMarkerPopup)


            /* @ts-expect-error */
            m.data = locationData[location]['lootPool']
            m.options.title = locationData[location]['lootPool'];
            locationGroup.addLayer(m);
        }
        itemLayerGroups[map][item] = locationGroup;
    }
}

function createMarkerPopup(e: LeafletEvent) : void | LeafletEventHandlerFn {

    let popup = e.target.getPopup()
    let type = e.target.type ?? null
    let rawName = e.target.rawName ?? null
    let data = e.target.data;
    
    if (type) {
        if (specialLocations.includes(type)) {
            const content = createSpecialPopup(type, rawName)
            popup.setContent(content)
        } else {
            const content = createLootPopup(data)
            popup.setContent(content)
        }
    } else {
        const content = createLootPopup(data)
        popup.setContent(content)
    }
}



