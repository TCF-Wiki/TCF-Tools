//Weapons
let allWeapons = [
    'S-576 PDW',
    'K-28',
    'AR-55 Autorifle',
    'C-32 Bolt Action',
    'B9 Trenchgun',
    'KM-9 Scrapper',
    'Scarab',
    'Manticore',
    'Bulldog',
    'ICA Guarantee',
    'Lacerator',
    'PKR Maelstrom',
    'Phasic Lancer',
    'Asp Flechette Gun',
    'Advocate',
    'Gorgon',
    'KBR Longshot',
    'Shattergun',
    'Voltaic Brute',
    'KOR-47',
    'Basilisk',
    'Kinetic Arbiter',
    'Hammer',
    'Zeus Beam',
    'KARMA-1',
    'Komrad',
];
//Based on ammo
let LightWeapons = ['Asp Flechette Gun', 'KM-9 Scrapper', 'S-576 PDW', 'Voltaic Brute', 'K-28', 'Scarab'];
let MediumWeapons = ['Advocate', 'Gorgon', 'KOR-47', 'Manticore', 'AR-55 Autorifle', 'Phasic Lancer', 'ICA Guarantee', 'Zeus Beam', 'Hammer'];
let HeavyWeapons = ['Lacerator', 'KBR Longshot', 'Basilisk', 'C-32 Bolt Action', 'Kinetic Arbiter', 'KARMA-1'];
let ShotgunWeapons = ['PKR Maelstrom', 'Shattergun', 'B9 Trenchgun', 'Bulldog'];
let SpecialWeapons = ['Komrad'];

//Other Arrays
let Consumables = ['GrenadeFrag', 'GrenadeGas', 'GrenadeSmoke', 'GrenadeSound', 'MedkitCombat', 'MedkitStrong', 'MedkitWeak', 'StimCombat', 'StimStrong', 'StimWeak'];
let Backpacks = ['Common', 'Uncommon', 'Rare', 'Epic'];
let Shields = ['Common', 'Common_Tactical', 'Common_Restoration', 'Uncommon', 'Uncommon_Tactical', 'Uncommon_Restoration', 'Rare', 'Rare_Tactical', 'Rare_Restoration', 'Epic', 'Exotic'];
let Helmets = ['Common', 'Common_Tactical', 'Common_Restoration', 'Uncommon', 'Uncommon_Tactical', 'Uncommon_Restoration', 'Rare', 'Rare_Tactical', 'Rare_Restoration', 'Epic', 'Exotic', 'Nightvision'];

import itemList from './itemList.json';
export function onLoad() {
    resetLoadout();
    getLoadoutFromURL();
}

function displayLoadout(weapon1, weapon2, helmet, backpack, shield, items, itemNumbers) {
    //console.log(weapon1, weapon2, helmet, backpack, shield, items, itemNumbers);
    resetLoadout();

    //Weapons
    document.getElementById('Weapon1').firstChild.src = '/loadout-images/Weapons/' + weapon1 + '.png';
    document.getElementById('Weapon1').style = `background-image: url('/loadout-images/${getRarity(weapon1)}_Weapon.png');`;
    if (weapon2) {
        document.getElementById('Weapon2').firstChild.src = '/loadout-images/Weapons/' + weapon2 + '.png';
        document.getElementById('Weapon2').style = `background-image: url('/loadout-images/${getRarity(weapon2)}_Weapon.png');`;
        //console.log(getRarity(weapon2));
    }
    //Items
    for (let i = 0; i < items.length; i++) {
        document.getElementById(`Item${i + 1}`).src = '/loadout-images/' + items[i] + '.png';
        document.getElementById(`Item${i + 1}Number`).innerText = itemNumbers[i];
        document.getElementById(`Item${i + 1}`).style = `background-image: url('/loadout-images/${getRarity(items[i])}.png');`;
        //console.log(getRarity(items[i]));
    }
    //Gear
    if (helmet != 'None' && helmet) {
        document.getElementById('Helmet').src = '/loadout-images/Helmet_' + helmet + '.png';
        document.getElementById('Helmet').style = `background-image: url('/loadout-images/${getRarity(helmet)}.png');`;
    }
    if (shield != 'None' && shield) {
        document.getElementById('Shield').src = '/loadout-images/Shield_' + shield + '.png';
        //console.log(getRarity(shield));
        document.getElementById('Shield').style = `background-image: url('/loadout-images/${getRarity(shield)}.png');`;
    }
    if (backpack != 'None' && backpack) {
        document.getElementById('Backpack').src = '/loadout-images/Backpack_' + backpack + '.png';
        document.getElementById('Backpack').style = `background-image: url('/loadout-images/${getRarity(backpack)}.png');`;
    }
}

function getRarity(IGN) {
    if (!IGN) return null;
    for (var item in itemList) {
        if (itemList[item]['ingame'] == IGN) {
            return itemList[item]['rarity'];
        }
    }
    if (IGN.includes('Medkit') || IGN.includes('Stim')) {
        if (IGN.includes('Weak')) return 'Common';
        if (IGN.includes('Strong')) return 'Uncommon';
        if (IGN.includes('Combat')) return 'Rare';
    }
    if (IGN.includes('Grenade')) {
        if (IGN == 'GrenadeSmoke') return 'Common';
        if (IGN == 'GrenadeSound' || IGN == 'GrenadeGas' || IGN == 'GrenadeFrag') return 'Uncommon';
    }
    if (IGN.includes('Ammo')) {
        if (IGN.includes('Light') || IGN.includes('Medium')) return 'Common';
        if (IGN.includes('Heavy') || IGN.includes('Shotgun')) return 'Uncommon';
        if (IGN.includes('Special')) return 'Rare';
    }
    if (IGN.includes('Common')) return 'Common';
    if (IGN.includes('Uncommon')) return 'Uncommon';
    if (IGN.includes('Rare')) return 'Rare';
    if (IGN.includes('Epic')) return 'Epic';
    if (IGN.includes('Exotic')) return 'Exotic';
    if (IGN.includes('Nightvision')) return 'Legendary';
    return null;
}

function getLoadoutFromURL() {
    //weapon=BoltAction&weapon=K28&item=ammo_light-244&item=ammo_heavy-38&item=medkitstrong-5&item=grenadesmoke-2&helmet=epic&backpack=rare&shield=exotic
    let params = new URLSearchParams(location.search);
    let weapons = params.getAll('weapon');
    let rawItems = params.getAll('item');
    let items = [];
    let itemNumbers = [];
    for (let i = 0; i < rawItems.length; i++) {
        items.push(rawItems[i].split('-')[0]);
        itemNumbers.push(rawItems[i].split('-')[1]);
    }
    let helmet = params.get('helmet');
    let shield = params.get('shield');
    let backpack = params.get('backpack');
    //window.history.replaceState({}, document.title, '/');
    if (weapons.length == 0 && items.length == 0) {
        RandomLoadout();
    } else {
        displayLoadout(weapons[0], weapons[1], helmet, backpack, shield, items, itemNumbers);
    }
}

export function ShareLoadout(clipboard = false) {
    let shareString = '?';
    let Weapon1 = document.getElementById('Weapon1').firstChild.getAttribute('src').replace('/loadout-images/Weapons/', '').replace('.png', '');
    let Weapon2 = document.getElementById('Weapon2').firstChild.getAttribute('src').replace('/loadout-images/', '').replace('Weapons/', '').replace('.png', '');
    shareString += 'weapon=' + Weapon1.replaceAll(' ','_');
    if (Weapon2 != 'None') shareString += '&weapon=' + Weapon2.replaceAll(' ','_');
    for (let i = 1; i <= 4; i++) {
        let item = document.getElementById(`Item${i}`).getAttribute('src').replace('/loadout-images/', '').replace('.png', '');
        let number = document.getElementById(`Item${i}Number`).innerText;
        if (item != 'None') shareString += '&item=' + item.replaceAll(' ','_') + '-' + number;
    }
    let helmet = document.getElementById('Helmet').getAttribute('src').replace('/loadout-images/', '').replace('Helmet_', '').replace('.png', '');
    if (helmet != 'None') shareString += '&helmet=' + helmet.replaceAll(' ','_');
    let shield = document.getElementById('Shield').getAttribute('src').replace('/loadout-images/', '').replace('Shield_', '').replace('.png', '');
    if (shield != 'None') shareString += '&shield=' + shield.replaceAll(' ','_');
    let backpack = document.getElementById('Backpack').getAttribute('src').replace('/loadout-images/', '').replace('Backpack_', '').replace('.png', '');
    if (backpack != 'None') shareString += '&backpack=' + backpack.replaceAll(' ','_');
    if (clipboard) {
        navigator.clipboard.writeText(document.baseURI + shareString);
        let popup = document.getElementById('sharePopup');
        window.history.replaceState({}, document.title, '/loadout' + shareString);
        popup.classList.add('show');
        delay(2000).then(() => popup.classList.remove('show'));
    } else {
        window.history.replaceState({}, document.title, '/loadout');
    }
}

function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

export function RandomLoadout() {
    resetLoadout();
    let weapon1, weapon2, backpack, shield, helmet;
    let items = [],
        itemNumbers = [];
    //Function:
    let itemNumber = 1;
    let r;

    //Weapons
    let Ammo1;
    let AmmoNumber1;
    let Ammo2;
    let AmmoNumber2;
    let tempWeaponArr = [...allWeapons];
    //Weapon 1
    weapon1 = tempWeaponArr[Math.floor(Math.random() * tempWeaponArr.length)];
    delete tempWeaponArr[tempWeaponArr.indexOf(weapon1)];
    if (LightWeapons.includes(weapon1)) Ammo1 = 'Light';
    else if (MediumWeapons.includes(weapon1)) Ammo1 = 'Medium';
    else if (HeavyWeapons.includes(weapon1)) Ammo1 = 'Heavy';
    else if (ShotgunWeapons.includes(weapon1)) Ammo1 = 'Shotgun';
    else if (SpecialWeapons.includes(weapon1)) Ammo1 = 'Special';
    if (Ammo1 == 'Light' || Ammo1 == 'Medium') AmmoNumber1 = Math.floor(Math.random() * 249) + 1;
    if (Ammo1 == 'Shotgun' || Ammo1 == 'Heavy' || Ammo1 == 'Special') AmmoNumber1 = Math.floor(Math.random() * 49) + 1;
    items.push('Ammo_' + Ammo1);
    itemNumbers.push(AmmoNumber1);
    //Weapon 2
    weapon2 = tempWeaponArr[Math.floor(Math.random() * tempWeaponArr.length)];
    delete tempWeaponArr[tempWeaponArr.indexOf(weapon2)];
    if (weapon2) {
        if (LightWeapons.includes(weapon2)) Ammo2 = 'Light';
        else if (MediumWeapons.includes(weapon2)) Ammo2 = 'Medium';
        else if (HeavyWeapons.includes(weapon2)) Ammo2 = 'Heavy';
        else if (ShotgunWeapons.includes(weapon2)) Ammo2 = 'Shotgun';
        else if (SpecialWeapons.includes(weapon2)) Ammo2 = 'Special';
        if (Ammo2 == 'Light' || Ammo2 == 'Medium') AmmoNumber2 = Math.floor(Math.random() * 249) + 1;
        if (Ammo2 == 'Shotgun' || Ammo2 == 'Heavy' || Ammo2 == 'Special') AmmoNumber2 = Math.floor(Math.random() * 49) + 1;
        items.push('Ammo_' + Ammo2);
        itemNumbers.push(AmmoNumber2);
    }

    //Backpack
    backpack = Backpacks[Math.floor(Math.random() * Backpacks.length)];

    //Shield
    if (Math.floor(Math.random() * 8) != 0) {
        shield = Shields[Math.floor(Math.random() * Shields.length)];
    }

    //Helmet
    if (Math.floor(Math.random() * 6) != 0) {
        helmet = Helmets[Math.floor(Math.random() * Helmets.length)];
    }

    //Consumables:
    let C = [...Consumables];
    for (let i = 1; i <= 2; i++) {
        let Consumable;
        let ConsumableNumber;
        if (Math.floor(Math.random() * 10) != 0) {
            r = Math.floor(Math.random() * C.length);
            Consumable = C[r];
            C.splice(r, 1);
        }
        if (Consumable) {
            if (Consumable.includes('Medkit')) ConsumableNumber = Math.floor(Math.random() * 1) + 1;
            if (Consumable.includes('Stim')) ConsumableNumber = Math.floor(Math.random() * 4) + 1;
            if (Consumable.includes('Grenade')) ConsumableNumber = Math.floor(Math.random() * 3) + 1;
            items.push(Consumable);
            itemNumbers.push(ConsumableNumber);
        }
    }
    displayLoadout(weapon1, weapon2, helmet, backpack, shield, items, itemNumbers);
    ShareLoadout();
}

function resetLoadout() {
    document.getElementById('Helmet').src = '/loadout-images/None.png';
    document.getElementById('Helmet').style = `background-image: url('/loadout-images/None.png');`;
    document.getElementById('Shield').src = '/loadout-images/None.png';
    document.getElementById('Shield').style = `background-image: url('/loadout-images/None.png');`;
    document.getElementById('Backpack').src = '/loadout-images/None.png';
    document.getElementById('Backpack').style = `background-image: url('/loadout-images/None.png');`;
    document.getElementById('Weapon1').firstChild.src = '/loadout-images/None.png';
    document.getElementById('Weapon1').style = `background-image: url('/loadout-images/None.png');`;
    document.getElementById('Weapon2').firstChild.src = '/loadout-images/None.png';
    document.getElementById('Weapon2').style = `background-image: url('/loadout-images/None.png');`;
    document.getElementById(`Item1`).src = '/loadout-images/None.png';
    document.getElementById('Item1').style = `background-image: url('/loadout-images/None.png');`;
    document.getElementById(`Item2`).src = '/loadout-images/None.png';
    document.getElementById('Item2').style = `background-image: url('/loadout-images/None.png');`;
    document.getElementById(`Item3`).src = '/loadout-images/None.png';
    document.getElementById('Item3').style = `background-image: url('/loadout-images/None.png');`;
    document.getElementById(`Item4`).src = '/loadout-images/None.png';
    document.getElementById('Item4').style = `background-image: url('/loadout-images/None.png');`;
    document.getElementById(`Item1Number`).innerText = '';
    document.getElementById(`Item2Number`).innerText = '';
    document.getElementById(`Item3Number`).innerText = '';
    document.getElementById(`Item4Number`).innerText = '';
}
