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

export function GetRarity(IGN: string) {
    if (!IGN) return "";
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
    return "";
}

export function GenerateRandomLoadout() {
    let data = {
        weapons: [] as {img: string, rarity: string}[],
        backpack: {} as {img: string, rarity: string},
        shield: {} as {img: string, rarity: string},
        helmet: {} as {img: string, rarity: string},
        items: [] as {img: string, amount: number, rarity: string}[],
    };

    //Weapons
    let tempWeaponArr = [...allWeapons];
    for(let i = 0; i < 2; i++) {
        let weapon = tempWeaponArr[Math.floor(Math.random() * tempWeaponArr.length)];
        tempWeaponArr = tempWeaponArr.filter((w) => w != weapon);
        let Ammo = "Ammo_" + getAmmoType(weapon);
        let AmmoRarity = GetRarity(Ammo);
        let AmmoAmount = getAmmoAmount(Ammo.replace("Ammo_", ""));
        data.weapons.push({img: "Weapons/" + weapon, rarity: GetRarity(weapon)});
        AmmoAmount.forEach((amount) => {
            data.items.push({img: Ammo, amount: amount, rarity: AmmoRarity});
        });
    }

    //Backpack
    let backpack = "Backpack_" + Backpacks[Math.floor(Math.random() * Backpacks.length)];
    data.backpack = {img: backpack, rarity: GetRarity(backpack)};

    //Shield
    let shield = "Shield_" + Shields[Math.floor(Math.random() * Shields.length)];
    data.shield = {img: shield, rarity: GetRarity(shield)};

    //Helmet
    let helmet = "Helmet_" + Helmets[Math.floor(Math.random() * Helmets.length)];
    data.helmet = {img: helmet, rarity: GetRarity(helmet)};

    //Consumables:
    let C = [...Consumables];
    for (let i = 1; i <= 2; i++) {
        let Consumable;
        let r = Math.floor(Math.random() * C.length);
        Consumable = C[r];
        C.splice(r, 1);
        if (Consumable) {
            if (Consumable.includes('Medkit')) {
                addConsumable(Consumable, Math.floor(Math.random() * 1) + 1);
            }else if (Consumable.includes('Stim')) { 
                addConsumable(Consumable, Math.floor(Math.random() * 4) + 1); 
                addConsumable(Consumable, Math.floor(Math.random() * 4) + 1);
            }
            else if (Consumable.includes('Grenade')) {
                addConsumable(Consumable, Math.floor(Math.random() * 3) + 1);
            }
        }
    }
    function addConsumable(Consumable: string, amount: number) {
        data.items.push({img: Consumable, amount: amount, rarity: GetRarity(Consumable)});
    }

    return data;
}

function getAmmoType(weapon: string) : string {
    if (LightWeapons.includes(weapon)) return 'Light';
    if (MediumWeapons.includes(weapon)) return 'Medium';
    if (HeavyWeapons.includes(weapon)) return 'Heavy';
    if (ShotgunWeapons.includes(weapon)) return 'Shotgun';
    if (SpecialWeapons.includes(weapon)) return 'Special';
    return '';
}

function getAmmoAmount(type: string): number[] {
    let total, stackSize;
    if (type == 'Light' || type == 'Medium') {
        total = getRandomRange(150,600);
        stackSize = 250;
    } else
    if (type == 'Shotgun' || type == 'Special'){ 
        total = getRandomRange(40,150);
        stackSize = 50;
    } else
    if (type == 'Heavy') {
        total = getRandomRange(30,100);
        stackSize = 50;
    } else {
        return [];
    }
    let stacks = [];
    for(let i = 0; i < Math.ceil(total / stackSize); i++) {
        if(total - (i + 1) * stackSize > 0) {
            stacks.push(stackSize);
        } else {
            stacks.push(total - i * stackSize);
        }
    }
    return stacks;
}

function getRandomRange (min: number, max :number): number {
    return Math.ceil(Math.random() * (max - min) + min);
  }