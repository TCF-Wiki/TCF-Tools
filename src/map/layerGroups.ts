import L, {LayerGroup, Marker} from 'leaflet';
import 'leaflet.markercluster';
import {mapData} from './data';

var layerGroups: any = {};

for (var map in mapData['locations']) {
    if (!layerGroups[map]) layerGroups[map] = {};
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
        m.bindPopup(locationData[location]['rawName']);
        m.options.title = locationData[location]['rawName'];
        locationGroup.addLayer(m);
    }
    layerGroups[map][locationType] = locationGroup;
}

export default layerGroups;
