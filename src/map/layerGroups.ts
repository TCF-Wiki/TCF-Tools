import L, {LayerGroup, Marker} from 'leaflet';
import 'leaflet.markercluster';
import {getMapData} from './data';

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
        var locationGroup = L.markerClusterGroup({
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
        for (let location in locationData) {
            let m = new Marker(locationData[location]['location']);
            m.bindPopup(locationData[location]['rawName'] + ' - [' + locationData[location]['location'][0] + ', ' + locationData[location]['location'][1] + ']');
            m.options.title = locationData[location]['rawName'];
            locationGroup.addLayer(m);
        }
        locationLayerGroups[map][locationType] = locationGroup;
    }
}

let itemLayerGroups: any = {};

export function getItemLayerGroups(): any {
    return itemLayerGroups;
}

export async function updateItemLayerGroups() {
    const mapData = await getMapData();
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
        for (let location in locationData) {
            let m = new Marker(locationData[location]['location']);
            m.bindPopup(locationData[location]['lootPool'] + ' - [' + locationData[location]['location'][0] + ', ' + locationData[location]['location'][1] + ']');
            m.options.title = locationData[location]['lootPool'];
            locationGroup.addLayer(m);
        }
        itemLayerGroups[map][item] = locationGroup;
    }
}