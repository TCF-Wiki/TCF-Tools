import { weaponData } from "./data"
export const keyObject = {
    'inGameName': 'Weapon',
    'rarity': 'Rarity',
    'directDamage': 'Damage',
    'penetration': 'Penetration',
    'radialDamage': 'Radial Damage',
    'refireTime': 'Refire Time (s)',
    'spinupTime': 'Charge Up Time (s)',
    'reloadTime': 'Reload Time (s)',
    'ammoInClip': 'Magazine Size',
    'ammoType': 'Ammo Type',
    'ammoPerBullet': 'Ammo Consumed Per Bullet',
    'projectileSpeed': 'Projectile Speed (cm/s)',
    'amountOfBurst': 'Additional Burst Bullets',
    'burstInterval': 'Time between Burst Bullets (s)',
    'amountOfImmediateFires': 'Shotgun Pellet Amount',
    'movementSpeedMultiplier': 'Movement Speed Multiplier',
    'unequipTime': 'Unequip Time (s)',
    'equipTime': 'Equip Time (s)',
    'animationEquipTime': 'Animation Equip Time (s)',
    'm_immediateFireIncreasesSpread': 'Shotgun Pellet Spread',
    'directDamageEnemyMultiplier': 'Creature Damage Multiplier (any)',
    'directDamagePlayerMultiplier': 'Player Damage Multiplier (any)',
    'radialDamageEnemyMultiplier': 'Creature Radial Damage Multiplier (any)',
    'radialDamagePlayerMultiplier': 'Player Radial Damage Multiplier (any)',
    'weakDamageMultiplier': 'Player Headshot Multiplier',
    'weakDamageMultiplierEnemy': 'Creature Damage Multiplier (weakspot)',
    'FalloffEnd': 'Falloff Range End (cm)',
    'FalloffMultiplier': 'Falloff Multiplier',
    'FalloffStart': 'Falloff Range Start (cm)',
    'tags': 'Weapon Type',
    'buyValue': 'Price',
    'sellValue': 'Sell Price',
    'faction': 'Faction',
    'factionRep': 'Faction Reputation',
    'weight': 'Weight',
    'audibleRange': 'Audible Range (m)',

    //attachment stuff
    "Magazine": "Magazine",
    "Muzzle": "Muzzle",
    "AmmoConverter": "Converter",
    "ForeGrip": "Foregrip",
    "RearGrip": "Rear grip",
    "Stock": "Stock"
}

export const detailedKeyObject = {
    'penetrationMultiplier': 'Penetration Multiplier',
    'roundsPerMinute': 'Rounds Per Minute',
    'adjustedRPM': 'Reload Adjusted RPM',
    'damagePerSecond': 'Damage Per Second',
    'adjustedDPS': 'Reload Adjusted DPS',
    'damagePerMag': 'Damage Per Mag',
    'timeToEmpty': 'Time to Empty Mag (s)'
}

export const flippedKeys = [
    'unequipTime',
    'equipTime',
    'animationEquipTime',
    'refireTime',
    'spinupTime',
    'ammoPerBullet',
    'weight',
    'buyValue',
    'reloadTime',
    'timeToEmpty',
    'shotsToKill',
    'timeToKill'
]

export const creatureNames = {
    "PlayerDefault": "Player",
    "AIfriendly": "Leafman",
    "AI_Strider": "Strider",
    "AI_Strider_3": "Heavy Strider",
    "AI_Rattler": "Rattler",
    "AI_Rattler_2": "Mature Rattler",
    "AI_Weremole": "Marauder",
    "AI_Weremole_2": "Savage Marauder",
    "AI_Crusher": "Crusher",
    "AI_Crusher_2": "Alpha Crusher",
    "AI_Howler": "Howler",
    "AI_Howler_2": "Elite Howler",
    "AI_GlowBeetle_Blast": "Blast Tick",
    "AI_GlowBeetle_Acid": "Acid Tick",

}

export const unusableAttachments = [
    'Optics',
    'Tactical',
    'ScannerUpgrade1',
    'ScannerUpgrade2',
    'ScannerUpgrade3',
    'ScannerUpgrade4',
    'NoAttachment',
    'Barrel',
    'Muzzle'
]

export const ignoredEffects = [
    'None',
    'WeaponTargetingFOV',
    'WeaponIsSilenced',
    'WeaponRecoilVertical',
    'TargetingTime',
    'WeaponRecoilIncreaseRate',
    'WeaponTargetingSpreadMultiplier'
]

export function roundToThree(num) {
    return +(Math.round(num + 'e+3') + 'e-3');
}

export function roundToOne(num) {
    return +(Math.round(num + 'e+1') + 'e-1');
}

export function lowercaseFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

export function getWeaponList() {
    // Filter out weapons from our data we not show
    let filtered = [];
    for (const [k, v] of Object.entries(weaponData)) {
        if (!v) continue;
        if (!v["tags"] || v["tags"].length == 0 || v["tags"][0] === "Tools") continue;
        if (v["inGameName"] == "HAZE" || v["inGameName"] == "KARLA" || v["inGameName"] == "FF4 Detonator") continue;
        filtered.push(k);
    }

    // sort our array of items alphabetically
    let sorted = [];
    for (const weapon in filtered) {
        const wData = weaponData[filtered[weapon]];
        if (wData == undefined) continue;
        let pushedData = {inGameName: wData["inGameName"], codeName: filtered[weapon]};
        sorted.push(pushedData);
    }
    // thanks to https://stackoverflow.com/a/1129270
    sorted.sort((a,b) => (a.inGameName > b.inGameName) ? 1 : ((b.inGameName > a.inGameName) ? -1 : 0));
    // put our sorted names of items into our data
    return sorted;
}