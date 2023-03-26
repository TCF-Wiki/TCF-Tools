import {weaponData} from "../calc/data";
import {locationData, itemData, missionListData} from "./data";
import {creatureNames} from "./QuestConstants";

export function locationNameManager(name: string): string {
    // Utility function to get the name of a location by its codename
    if (name == "") return "";
    name = name
        // edge cases
        .replace("Map", "MAP")
        .replace("StarportPad", "StarportLandingPad")
        .replace("VaccineLabs", "VaccineLab")
        .replace("JungleFallenTree", "FallenTree")
        .replace("JungleFavela", "Favela")
        .replace("SkeletonObservation", "SkeletonObservatory")
        .replace("AlienQuarry", "CrystalCave")
        .replace("LetiumLocations", "Letium Vent")
        .replace("PowerPlant", "Powerplant")
        .replace("OsirisWildlife", "Wildlife")
        .replace("KorolevOutpost2", "KorolevCoreOutpost")
        .replace("OsirisOutpost2", "OsirisOffices")
        .replace("GlowingWaterCave", "SparklingWaters")
        .replace("DesertPinnacleLabs", "PinnacleLabs")
        .replace("UniqueMissionLocation_", "")
        .replace("SlaughteredResearcher", "Osiris Offices")
        .replace("AbandonedOilField", "Abandoned Oil Field")
        .replace("AroundMissingEngineerBody", "the Missing Engineer")
        .replace("MAP01_EastKorolevStation_PowerUpLoot", "East Collection Point Loot Room")
        .replace("GlowWormCave", "CaveofStars");

    if (locationData[name]) return locationData[name]["name"];

    return name;
}

export function mapNameManager(name: string): string {
    // Utility function to get the name of a map by its codename
    if (name == "") return "";
    if (name == "MP_Map01_P") return "Bright Sands";
    if (name == "MP_Map02_P") return "Crescent Falls";
    if (name == "MP_AlienCaverns_P") return "Tharis Island";
    return name;
}

export function killCreatureOrPlayer(task: any, faction: string): string {
    let killInfo = task['killConditions']
    let amount = task['maxProgress']

    // target
    let targetString = ''
    let amountString = amount > 1 ? 's' : ''
    let target = killInfo['m_killTarget'].replace('EYKillTypeAction::', '') 

    if (target == 'Creatures') {
        let specificCreature = killInfo['m_specificAIEnemyTypeToKill'].replace('EYEnemyType::', '')
        let specificCreatureVariant = killInfo['m_specificVariationToKill']['RowName']

        if (specificCreature == 'None') targetString = 'Creatures'
        else if (specificCreature == 'Weremole') {
            if (specificCreatureVariant && specificCreatureVariant.includes('2')) targetString = 'Savage Marauder' + amountString
            if (!targetString) targetString = 'Marauder' + amountString
        } 
        else if (specificCreature == 'GlowBeetle_Blast')targetString = 'Blast Tick' + amountString
        else if (specificCreature == 'GlowBeetle_Acid') targetString = 'Acid Tick' + amountString
        else if (specificCreature == 'Rattler') {
            if (specificCreatureVariant && specificCreatureVariant.includes('2')) targetString = 'Mature Rattler' + amountString
            if (!targetString) targetString = 'Rattler' + amountString
        }
        else if (specificCreature == 'Strider') {
            if (specificCreatureVariant && specificCreatureVariant.includes('3')) targetString = 'Heavy Strider' + amountString
            if (!targetString) targetString = 'Strider' + amountString
        }
        else targetString = specificCreature 

    } else if (target == 'Players') targetString = 'Prospector' + amountString
    else if (target == 'All') targetString = 'Creatures or Prospectors'
    
    // weapon info 
    let weaponString = ''
    if (killInfo['m_allowedWeaponCategories'].length > 0) {
        let categoryString = killInfo['m_allowedWeaponCategories'][0].replace('EYDeviceCategory::', '');
        if (categoryString == 'AssaultRifle') categoryString = 'Assault Rifle'
        else if (categoryString == 'SniperRifle') categoryString = 'Sniper Rifle'
        weaponString = ' with a ' + categoryString
    } else if (killInfo['m_allowedSpecificWeapons'].length > 0) {
        let weapons = killInfo['m_allowedSpecificWeapons']
        if (weapons.length == 1) weaponString = itemName(weapons[0]['RowName'])
        else if (weapons[0]['RowName'] == 'WP_A_Pistol_Bullet_01') weaponString = ' with a Korolev weapon'
        else if (weapons[0]['RowName'] == 'WP_G_Pistol_Energy_01') weaponString = ' with an Osiris weapon'
        else if (weapons[0]['RowName'] == 'WP_D_Pistol_Bullet_01') weaponString = ' with an ICA weapon'
    }
            
    // location info
    let locationString = ''
    let stormString = ''
    if (killInfo['m_onlyDuringStorm']) stormString = ' during an active Storm'
    if (task['locationConditions'].lenght > 0) locationString = ' at ' + locationNameManager(task['locationConditions'[0]])
    else if (killInfo['m_mapName']) {
        locationString = ' on ' + mapNameManager(killInfo['m_mapName'])
    }

    // final string
    const killString = 'Kill ' + amount + ' ' + targetString + weaponString + locationString + stormString
    return killString;
}

export function getItemsOfMission(data: any): any {
    let returnInfo: any = {};
    for (let t in data) {
        const pData = data[t];
        const type = pData["type"];

        if (type == "OwnNumOfItem") {
            const item = pData["itemToOwn"];
            if (returnInfo[item]) {
                returnInfo[item] = returnInfo[item] + pData["maxProgress"];
            } else {
                returnInfo[item] = pData["maxProgress"];
            }
        }

        if (type == "DeadDrop") {
            const item = pData["deadDropItem"];
            if (returnInfo[item]) {
                returnInfo[item] = returnInfo[item] + pData["maxProgress"];
            } else {
                returnInfo[item] = pData["maxProgress"];
            }
        }
    }
    return returnInfo;
}

export function itemName(item: string, urlFormat?: boolean): string {
    // This function gets the name of the image when given an item name. Handles edge cases.
    if (item.includes("SoftCurrency")) item = "K-Marks";
    else if (item.includes("ShockGrenade_02")) item = "Frag Grenade";
    else if (item.includes("HardDrive_common")) item = "Data Drive Tier 1";
    else if (item.includes("HardDrive_uncommon")) item = "Data Drive Tier 2";
    else if (item.includes("HardDrive_rare")) item = "Data Drive Tier 3";
    else if (item.includes("HardDrive_epic")) item = "Data Drive Tier 4";
    else if (item.includes("HardDrive_legendary")) item = "Data Drive Tier 5";
    else if (item.includes("ICAScrip")) item = "ICA Scrip";
    else if (item.includes("OsirisScrip")) item = "Osiris Scrip";
    else if (item.includes("KorolevScrip")) item = "Korolev Scrip";
    else if (item.includes("Reputation")) item = "Reputation";
    else if (item.includes("Key")) {
        if (item.includes("Map01")) item = "Bright_Sands_Key_Card";
        if (item.includes("Map02")) item = "Crescent_Falls_Key_Card";
        if (item.includes("Map03")) item = "Tharis_Island_Key_Card";
    } else {
        if (itemData[item]) {
            item = itemData[item]["inGameName"];
        }
    }
    if (item.includes("Fusion Cartridge")) item = "Fusion_Cartridge_Batteries";
    if (item.includes("OrbitalCanonTarget")) item = "Orbital_Cannon_Beacon";

    if (urlFormat) return item.split(" ").join("_").replace("#", "%23");

    return item;
}


export function getFactionOfMission(mission: string) {
    return missionListData[mission]['faction'].substring(0, 3).toLowerCase()
}