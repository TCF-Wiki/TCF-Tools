import {keyCardInfo, DeadDropInfo, specialDescriptions, specialLocations, locationNames} from './mapConstants';
import {getMapData} from './data';
import {roundToThree} from '@/calc/utils';
import type {TextNode} from '@vue/compiler-core';
const mapData = await getMapData();

export function createLootPopup(type: string) {
    let itemData = mapData['descriptions'];

    let data;
    if (mapData['lootPools'][type]) {
        data = mapData['lootPools'][type]['items'];
    } else {
        const section = document.createElement('section');
        const par = document.createElement('p');
        const parText = document.createTextNode('Uh oh! This location is missing its loot. Please let us know through Discord.');

        par.appendChild(parText);
        section.appendChild(par);
        return section;
    }
    // creates a <section> element, <table> element and a <tbody> element
    const section = document.createElement('section');
    const table = document.createElement('table');
    const tableBody = document.createElement('tbody');

    // create the header
    const header = document.createElement('h2');
    let text = '';
    if (mapData['lootPools'][type]['tier']) {
        text = 'Tier ' + mapData['lootPools'][type]['tier'] + ' Spawn';
    } else {
        text = 'Special Spawn';
    }
    const headerText = document.createTextNode(text);

    header.appendChild(headerText);

    // creating all cells
    for (let item in data) {
        let cellData = [item, data[item]];

        // creates a table row
        const row = document.createElement('tr');

        for (let x in cellData) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            const cell = document.createElement('td');
            let text;
            if (parseInt(x) === 0) {
                text = itemData[cellData[x]]['name'] ?? 'Something went wrong';
            } else {
                let percent: number | string = roundToThree(cellData[x]);
                if (percent === 0) {
                    percent = '<0.001';
                }
                text = percent + '%';
            }
            const cellText = document.createTextNode(text);
            if (parseInt(x) === 0) {
                cell.classList.add(itemData[cellData[x]]['rarity'].toLowerCase());
            }

            if (parseInt(x) === 0) {
                const img = document.createElement('img');
                if (cellData[x].includes('KeyCard')) {
                    if (cellData[x].includes('Map01')) {
                        img.src = `map-images/item-images/Bright_Sands_Key_Card.png`;
                    } else if (cellData[x].includes('Map02')) {
                        img.src = `map-images/item-images/Crescent_Falls_Key_Card.png`;
                    } else if (cellData[x].includes('Map03')) {
                        img.src = `map-images/item-images/Tharis_Island_Key_Card.png`;
                    } else {
                        img.src = `map-images/item-images/Bright_Sands_Key_Card.png`;
                    }
                } else {
                    img.src = `map-images/item-images/${itemData[cellData[x]]['name'].replaceAll(' ', '_')}.png`;
                }
                img.classList.add('item-image');
                cell.appendChild(img);
            }
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        tableBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    table.appendChild(tableBody);

    section.appendChild(header);
    section.appendChild(table);
    return section;
}

export function createSpecialPopup(type: string, rawName: string, location: any) {
    // create our popup section
    const section = document.createElement('section');

    // create the header of the popup
    const header = document.createElement('h2');
    const headerText = document.createTextNode(locationNames[type].toString());
    header.appendChild(headerText);
    section.appendChild(header);

    // The following do not have any additional information upon popup,
    // just the same text everywhere
    if (specialDescriptions[type]) {
        console.log(specialDescriptions[type]);
        // create our paragraph
        const par = document.createElement('p');
        const parText = document.createTextNode(specialDescriptions[type].toString());
        par.appendChild(parText);

        // and add it to our output
        section.appendChild(par);
    } else {
        // key doors, dead drops, mission items, etc
        if (type == 'keyDoor') {
            const keyData = keyCardInfo[rawName];
            if (keyData) {
                const sec = createKeyCardPopup(keyData);

                section.appendChild(sec);
            } else if (mapData['descriptions'][rawName] != null) {
                const sec = createKeyCardPopup(mapData['descriptions'][rawName]);
                section.appendChild(sec);
            } else {
                section.append('Something went wrong...');
            }
        }
        if (type == 'DeadDrop') {
            var DeadDropData = DeadDropInfo[rawName];
            if (DeadDropData == null) DeadDropData = {ingame: rawName};
            if (DeadDropData) {
                const sec = createDeadDropPopup(DeadDropData);
                section.appendChild(sec);
            } else {
                section.append('Something went wrong...');
            }
        }
    }

    return section;
}

function createKeyCardPopup(data: any): HTMLElement {
    const div = document.createElement('div');

    const header = document.createElement('h3');
    const headerText = document.createTextNode(data['name']);
    header.appendChild(headerText);
    div.appendChild(header);

    let par = document.createElement('p');
    let parText = document.createTextNode('Rarity: ' + data['rarity']);
    par.appendChild(parText);
    div.appendChild(par);

    par = document.createElement('p');
    parText = document.createTextNode('Description: ' + data['description']);
    par.appendChild(parText);
    div.appendChild(par);

    return div;
}

function createDeadDropPopup(data: any): HTMLElement {
    const div = document.createElement('div');

    const header = document.createElement('h3');
    const headerText = document.createTextNode(data['ingame']);
    header.appendChild(headerText);
    div.appendChild(header);

    let par = document.createElement('p');
    let parText = document.createTextNode('Description: ' + data['description']);
    par.appendChild(parText);
    div.appendChild(par);

    return div;
}
