import { weaponData } from "../calc/data"
import { locationData } from "./data"
import { creatureNames } from "./QuestConstants"

export function locationNameManager(name: string) : string {
    // Utility function to get the name of a location by its codename
    if (name=="") return ""
    name = name
        // edge cases
        .replace('Map',"MAP")
        .replace('StarportPad', 'StarportLandingPad')
        .replace("VaccineLabs",'VaccineLab')
        .replace('JungleFallenTree','FallenTree')
        .replace('JungleFavela','Favela')
        .replace('SkeletonObservation','SkeletonObservatory')
        .replace('AlienQuarry','CrystalCave')
        .replace('LetiumLocations','Letium Vent')
        .replace('PowerPlant','Powerplant')
        .replace('OsirisWildlife','Wildlife')
        .replace('KorolevOutpost2','KorolevCoreOutpost')
        .replace('OsirisOutpost2','OsirisOffices')
        .replace('GlowingWaterCave','SparklingWaters')
        .replace('DesertPinnacleLabs','PinnacleLabs')
        .replace('UniqueMissionLocation_','')
        .replace('SlaughteredResearcher','Osiris Offices')
        .replace('AbandonedOilField','Abandoned Oil Field')
        .replace('AroundMissingEngineerBody', 'the Missing Engineer')
        .replace('MAP01_EastKorolevStation_PowerUpLoot',"East Collection Point Loot Room")
        .replace('GlowWormCave','CaveofStars')

    if (locationData[name]) return locationData[name]['name']
    
    return name
}

export function mapNameManager(name: string) : string {
    // Utility function to get the name of a map by its codename
    if (name=="") return ""
    if (name == "MP_Map01_P") return "Bright Sands"
    if (name == "MP_Map02_P") return "Crescent Falls"
    if (name == "MP_AlienCaverns_P") return 'Tharis Island'
    return name
}

export function killCreatureOrPlayer(task: any, faction: string) : string {
    // utility function to get a string describing a type=kills task.

    // type of kill
    let killType = task['killConditions']['m_killTarget']
    let creature : string = task['killConditions']['m_specificAIEnemyTypeToKill'].replace('EYEnemyType::','') 

    // set up the name of the target
    if (killType.includes('Players')) {
        creature = 'Player'
    } else if(creature == 'None' || !creature) {
        creature = 'Creature'
    } else {
        creature = creatureNames[creature]
    }

    // Plural.
    if (task['maxProgress'] > 1) creature += 's'

    // set up our conditional locations
    let location = '';
    let map = ''
    if (task['locationConditions']) {
        location = locationNameManager(task['locationConditions'])
    } else if (task['killConditions']['m_mapName']){
        map = mapNameManager(task['killConditions']['m_mapName'])
    } 


    // set up our weapons you can kill with 
    let weapon = ''
    const category = task['killConditions']['m_allowedWeaponCategories']
    const weapons = task['killConditions']['m_allowedSpecificWeapons']
    if (category.length == 1) {
       // Never longer then 1 entry, so just

       const weaponString = category[0]
            .replace('EYDeviceCategory::','')
            .replace('SniperRifle','Sniper')
            .replace('AssaultRifle', 'AR')
        weapon += `with a ${weaponString}`
    } else if (weapons.length > 0) {
        if (weapons.length > 1 ) {
            let factionString = faction
                .replace('kor', 'Korolev Weapon')
                .replace('osi', 'Osiris Weapon')
                .replace('ica', 'ICA Weapon')

            weapon += ` with a ${factionString}`
        } else {
            weapon += ` with the  ${weaponData[weapons[0]['RowName']]['inGameName']}`
        }
    }

    // build our final string
    let returnInfo = 'Kill ' + task['maxProgress'] + ' ' + creature
    if (task['killConditions']['m_onlyDuringStorm']) returnInfo += ' during storm'
    if (location) returnInfo += ` at ${location}`
    if (map) returnInfo += ` on ${map}`
    if (weapon) returnInfo += weapon
    
    return returnInfo
}

export function getItemsOfMission(data: any) : any {
    let returnInfo : any = {}
    for (let t in data) {
        const pData = data[t]
        const type = pData['type']

        if (type == 'OwnNumOfItem') {
            const item = pData['itemToOwn']
            if (returnInfo[item]) {
                returnInfo[item] = returnInfo[item] + pData['maxProgress']
            } else {
                returnInfo[item] = pData['maxProgress']
            }
        } 

        if (type == 'DeadDrop') {
            const item = pData['deadDropItem']
            if (returnInfo[item]) {
                returnInfo[item] = returnInfo[item] + pData['maxProgress']
            } else {
                returnInfo[item] = pData['maxProgress']
            }
        }
    }            
    return returnInfo
}