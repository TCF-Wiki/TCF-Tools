//Weapons
let allWeapons = [
    "S-576 PDW",
    "K-28",
    "AR-55 Autorifle",
    "C-32 Bolt Action",
    "B9 Trenchgun",
    "KM-9 Scrapper",
    "Scarab",
    "Manticore",
    "Bulldog",
    "ICA Guarantee",
    "Lacerator",
    "PKR Maelstrom",
    "Phasic Lancer",
    "Asp Flechette Gun",
    "Advocate",
    "Gorgon",
    "KBR Longshot",
    "Shattergun",
    "Voltaic Brute",
    "KOR-47",
    "Basilisk",
    "Kinetic Arbiter",
    "Hammer",
    "Zeus Beam",
    "KARMA-1",
    "Komrad",
];
//Based on ammo
let LightWeapons = ["Asp Flechette Gun", "KM-9 Scrapper", "S-576 PDW", "Voltaic Brute", "K-28", "Scarab"];
let MediumWeapons = ["Advocate", "Gorgon", "KOR-47", "Manticore", "AR-55 Autorifle", "Phasic Lancer", "ICA Guarantee", "Zeus Beam", "Hammer"];
let HeavyWeapons = ["Lacerator", "KBR Longshot", "Basilisk", "C-32 Bolt Action", "Kinetic Arbiter", "KARMA-1"];
let ShotgunWeapons = ["PKR Maelstrom", "Shattergun", "B9 Trenchgun", "Bulldog"];
let SpecialWeapons = ["Komrad"];

//Other Arrays
let Consumables = ["GrenadeLight", "GrenadeStandard", "GrenadeAssault", "GrenadeGas", "GrenadeSmoke", "GrenadeSound", "MedkitCombat", "MedkitStrong", "MedkitWeak", "StimCombat", "StimStrong", "StimWeak"];
let OtherItems = ["Mineral Scanner", "Heavy Mining Tool", "Data Drive"];
let Backpacks = ["Common", "Uncommon", "Rare", "Epic", "Epic_Forged", "Exotic_Forged", "Legendary_Forged"];
let Shields = ["Common", "Common_Tactical", "Common_Restoration", "Uncommon", "Uncommon_Tactical", "Uncommon_Restoration", "Rare", "Rare_Tactical", "Rare_Restoration", "Epic", "Exotic", "Epic_Forged", "Exotic_Forged", "Legendary_Forged"];
let Helmets = ["Common", "Common_Tactical", "Common_Restoration", "Uncommon", "Uncommon_Tactical", "Uncommon_Restoration", "Rare", "Rare_Tactical", "Rare_Restoration", "Epic", "Exotic", "Epic_Forged", "Exotic_Forged", "Legendary_Forged", "Nightvision"];

import itemList from "./itemList.json";

export function GetRarity(IGN: string) {
    if (!IGN) return "";

    //Medkit/Stim
    if (IGN.includes("Medkit") || IGN.includes("Stim")) {
        if (IGN.includes("Weak")) return "Common";
        if (IGN.includes("Strong")) return "Uncommon";
        if (IGN.includes("Combat")) return "Rare";
    }

    //Grenade
    if (IGN.includes("Grenade")) {
        if (IGN == "GrenadeSmoke") return "Common";
        if (IGN == "GrenadeSound" || IGN == "GrenadeGas" || IGN == "GrenadeLight") return "Uncommon";
        if (IGN == "GrenadeStandard") return "Rare";
        if (IGN == "GrenadeAssault") return "Exotic";
    }

    //Gear
    if (IGN.includes("Common")) return "Common";
    if (IGN.includes("Uncommon")) return "Uncommon";
    if (IGN.includes("Rare")) return "Rare";
    if (IGN.includes("Epic")) return "Epic";
    if (IGN.includes("Exotic")) return "Exotic";
    if (IGN.includes("Legendary")) return "Legendary";
    if (IGN.includes("Nightvision")) return "Legendary";

    //Item List
    for (var item in itemList) {
        if (itemList[item]["ingame"] == IGN) {
            return itemList[item]["rarity"];
        }
    }

    //Ammo
    if (IGN.includes("Light") || IGN.includes("Medium")) return "Common";
    if (IGN.includes("Heavy") || IGN.includes("Shotgun")) return "Uncommon";
    if (IGN.includes("Special")) return "Rare";

    //None found
    return "None";
}

export function GenerateRandomLoadout(minRarity: number, maxRarity: number, consumableAmount: number, alwaysGetWeapons: boolean, alwaysGetArmor: boolean) {
    let data = {
        weapons: [] as {img: string; ign: string; rarity: string}[],
        backpack: {} as {img: string; ign: string; rarity: string} | null,
        shield: {} as {img: string; ign: string; rarity: string} | null,
        helmet: {} as {img: string; ign: string; rarity: string} | null,
        items: [] as {img: string; amount: number; ign: string; rarity: string}[],
    };

    //Weapons
    let totalAmmo = [];
    let tempWeaponArr = [...allWeapons];
    for (let i = 0; i < 2; i++) {
        if (i == 1 && !alwaysGetWeapons) {
            if (getRandomRange(1, 100) <= 33) break;
        }
        let rarityNumber = -1;
        let weapon = "";
        //Find a weapon that is within the rarity range
        while (rarityNumber < minRarity || rarityNumber > maxRarity) {
            weapon = tempWeaponArr[Math.floor(Math.random() * tempWeaponArr.length)];
            rarityNumber = rarityToInt(GetRarity(weapon));
        }
        //Remove the weapon from the array so it can't be picked again
        tempWeaponArr = tempWeaponArr.filter((w) => w != weapon);
        //Ammo...
        let Ammo = getAmmoType(weapon);
        totalAmmo.push({type: Ammo, amount: getAmmoAmount(Ammo)});
        //Add the weapon to the data
        data.weapons.push({img: weapon, ign: weapon, rarity: GetRarity(weapon)});
    }

    //Ammo
    let ammo = splitAmmo(totalAmmo);
    ammo.forEach((a) => {
        data.items.push({img: "Ammo/" + a.type, ign: a.type + " Ammo", amount: a.amount, rarity: GetRarity(a.type)});
    });

    //Backpack
    let rarityNumber = -1;
    let backpack = "";
    //Find a backpack that is within the rarity range
    while (rarityNumber < minRarity || rarityNumber > maxRarity) {
        backpack = Backpacks[Math.floor(Math.random() * Backpacks.length)];
        rarityNumber = rarityToInt(GetRarity(backpack));
    }
    //Add the backpack to the data
    data.backpack = {img: backpack, ign: backpack.split("_").join(" ") + " Backpack", rarity: GetRarity(backpack)};

    //Shield
    if (getRandomRange(1, 100) > 33 || alwaysGetArmor) {
        let rarityNumber = -1;
        let shield = "";
        //Find a shield that is within the rarity range
        while (rarityNumber < minRarity || rarityNumber > maxRarity) {
            shield = "Shield_" + Shields[Math.floor(Math.random() * Shields.length)];
            rarityNumber = rarityToInt(GetRarity(shield));
        }
        //Add the shield to the data
        data.shield = {img: shield, ign: shield.replace("Shield_", "").split("_").join(" ") + " Shield", rarity: GetRarity(shield)};
    } else {
        //No shield
        data.shield = null;
    }

    //Helmet
    if (getRandomRange(1, 100) > 15 || alwaysGetArmor) {
        let rarityNumber = -1;
        let helmet = "";
        //Find a helmet that is within the rarity range
        while (rarityNumber < minRarity || rarityNumber > maxRarity) {
            helmet = "Helmet_" + Helmets[Math.floor(Math.random() * Helmets.length)];
            rarityNumber = rarityToInt(GetRarity(helmet));
        }
        //Add the helmet to the data
        data.helmet = {img: helmet, ign: helmet.replace("Helmet_", "").split("_").join(" ") + " Helmet", rarity: GetRarity(helmet)};
    } else {
        //No helmet
        data.helmet = null;
    }

    //Consumables:
    let C = [...Consumables];
    for (let i = 1; i <= consumableAmount; i++) {
        let Consumable;
        let rarityNumber = -1;
        //Find a consumable that is within the rarity range
        while (rarityNumber < (minRarity >= 3 ? 2 : minRarity) || rarityNumber > maxRarity) {
            let r = Math.floor(Math.random() * C.length);
            Consumable = C[r];
            rarityNumber = rarityToInt(GetRarity(Consumable));
            C.splice(r, 1);
        }
        if (Consumable) {
            if (Consumable.includes("Medkit")) {
                addConsumable(Consumable, Math.floor(Math.random() * 1) + 1);
            } else if (Consumable.includes("Stim")) {
                addConsumable(Consumable, Math.floor(Math.random() * 4) + 1);
                addConsumable(Consumable, Math.floor(Math.random() * 4) + 1);
            } else if (Consumable.includes("Grenade")) {
                addConsumable(Consumable, Math.floor(Math.random() * 3) + 1);
            }
        }
    }
    function addConsumable(Consumable: string, amount: number) {
        let ign = Consumable.split("_").join(" ");
        if (ign.includes("Medkit")) ign = ign.replace("Medkit", "") + " Medkit";
        if (ign.includes("Stim")) ign = ign.replace("Stim", "") + " Stim";
        if (ign.includes("Grenade")) ign = ign.replace("Grenade", "") + " Grenade";
        data.items.push({img: "Consumables/" + Consumable, ign: ign, amount: amount, rarity: GetRarity(Consumable)});
    }

    //Other items:
    if (getRandomRange(1, 100) > 60) {
        //Find an item
        let item = OtherItems[Math.floor(Math.random() * OtherItems.length)];
        //Add the item to the data
        data.items.push({img: item, ign: item, amount: 1, rarity: GetRarity(item)});
    }

    //Return the data
    return data;
}

function getAmmoType(weapon: string): string {
    if (LightWeapons.includes(weapon)) return "Light";
    if (MediumWeapons.includes(weapon)) return "Medium";
    if (HeavyWeapons.includes(weapon)) return "Heavy";
    if (ShotgunWeapons.includes(weapon)) return "Shotgun";
    if (SpecialWeapons.includes(weapon)) return "Special";
    return "";
}
function getAmmoAmount(type: string): number {
    let total;
    if (type == "Light" || type == "Medium") {
        total = getRandomRange(150, 600);
    } else if (type == "Shotgun" || type == "Special") {
        total = getRandomRange(40, 150);
    } else if (type == "Heavy") {
        total = getRandomRange(30, 100);
    } else {
        total = 0;
    }
    return total;
}
function splitAmmo(ammo: {type: string; amount: number}[]): {type: string; amount: number}[] {
    //Combine ammo types
    ammo.forEach((a) => {
        ammo.forEach((b) => {
            if (a.type == b.type && a != b) {
                a.amount += b.amount;
                ammo.splice(ammo.indexOf(b), 1);
            }
        });
    });

    //Split into stacks
    let stacks = [] as {type: string; amount: number}[];
    ammo.forEach((a) => {
        let stackSize;
        if (a.type == "Light" || a.type == "Medium") {
            stackSize = 250;
        } else if (a.type == "Shotgun" || a.type == "Special" || a.type == "Heavy") {
            stackSize = 50;
        } else {
            return [];
        }
        for (let i = 0; i < Math.ceil(a.amount / stackSize); i++) {
            if (a.amount - (i + 1) * stackSize > 0) {
                stacks.push({type: a.type, amount: stackSize});
            } else {
                stacks.push({type: a.type, amount: a.amount - i * stackSize});
            }
        }
    });
    return stacks;
}
function getRandomRange(min: number, max: number): number {
    return Math.ceil(Math.random() * (max - min) + min);
}
function rarityToInt(rarity: string): number {
    if (rarity == "Common") return 0;
    if (rarity == "Uncommon") return 1;
    if (rarity == "Rare") return 2;
    if (rarity == "Epic") return 3;
    if (rarity == "Exotic") return 4;
    if (rarity == "Legendary") return 5;
    return -1;
}
