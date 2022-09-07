import L, {LayerGroup, Marker} from 'leaflet';
import 'leaflet.markercluster';
import {mapData} from './data';

var layerGroups: any = {};

for (var map in mapData['locations']) {
    if (!layerGroups[map]) layerGroups[map] = {};
    for (var locationType in mapData['locations'][map]) {
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
        for (let location in mapData['locations'][map][locationType]) {
            let m = new Marker(mapData['locations'][map][locationType][location]['location']);
            m.bindPopup(mapData['locations'][map][locationType][location]['rawName']);
            m.options.title = mapData['locations'][map][locationType][location]['rawName'];
            locationGroup.addLayer(m);
        }
        layerGroups[map][locationType] = locationGroup;
    }
}

export default layerGroups;
