import L, {LayerGroup, Marker} from 'leaflet';
import {mapData} from './data';

var layerGroups: any = {};

for (var map in mapData['locations']) {
    if (!layerGroups[map]) layerGroups[map] = {};
    for (var locationType in mapData['locations'][map]) {
        var locationGroup = new LayerGroup();
        for (var location in mapData['locations'][map][locationType]) {
            let m = new Marker(mapData['locations'][map][locationType][location]['location']);
            m.options.title = mapData['locations'][map][locationType][location]['rawName'];
            locationGroup.addLayer(m);
        }
        layerGroups[map][locationType] = locationGroup;
    }
}

export default layerGroups;
