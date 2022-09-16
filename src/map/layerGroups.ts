import { roundToThree } from '@/calc/utils';
import L, {LayerGroup, Marker, type Content, type LeafletEvent, type LeafletEventHandlerFn} from 'leaflet';
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
            locationGroup.addLayer(m);
            m.bindPopup('Placeholder!');
            m.on('click',createMarkerPopup)
            /* @ts-expect-error */
            m.data = locationData[location]['lootPool']
        }
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
        for (let location in locationData) {
            let m = new Marker(locationData[location]['location']);
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
    let data = mapData['lootPools'][e.target.data]['items']

    // creates a <section> element, <table> element and a <tbody> element
    const section = document.createElement('section')
    const table = document.createElement('table')
    const tableBody = document.createElement('tbody')

    // create the header 
    const header = document.createElement('h2')
    const headerText = document.createTextNode('Tier ' + mapData['lootPools'][e.target.data]['tier'] + ' Spawn')
    header.appendChild(headerText)

    // creating all cells
    for (let item in data) {
        let cellData = [item, data[item]]

        // creates a table row
        const row = document.createElement('tr')

        for (let x in cellData) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            const cell = document.createElement('td')
            let text;
            if (parseInt(x) === 0) {
                text = mapData['descriptions'][cellData[x]]['name'] ?? 'Something went wrong'
            } else {
                let percent : number | string = roundToThree(cellData[x]);
                if (percent === 0) {
                    percent = '< 0.001'
                }
                text = percent + '%'
            }
            const cellText = document.createTextNode(text)
            if (parseInt(x) === 0) {
                cell.classList.add(mapData['descriptions'][cellData[x]]['rarity'].toLowerCase())    
            }

            
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        tableBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    table.appendChild(tableBody);
    
    section.appendChild(header)
    section.appendChild(table)
    popup.setContent(section)
    
}