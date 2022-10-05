import { settingData } from './data'
import { perksByType } from './ForgeConstants'

const rarityMap : any = {
    "Common": 1,
    "Uncommon": 2,
    "Rare": 3,
    "Epic": 4,
    "Exotic": 5,
    "Legendary": 6
}

export function resolveAbyssToken() : any {
    const chances = settingData["Probability_Lottery"]

    // generate a random rarity
    const randomRarity = Math.random() * 100
    let foundRarity = '';
    // assumes the object is ordered low to high
    let totalRarity = 0
    for (let rarity in chances) {
        totalRarity += chances[rarity]
        if ( randomRarity < totalRarity) {
            foundRarity = rarity;
            break;
        }
    }

    // generate a random item type (assumes equal distribution)
    let possibleTypes = ["Shield","Helmet","Bag"]
    const foundType = possibleTypes[Math.floor(Math.random() * possibleTypes.length)]

    
    // generate a random perk (assumes equal distribution) 
    // @ts-ignore
    let foundPerk = perksByType[foundType][Math.floor(Math.random() * perksByType[foundType].length)]
    return {
        "rarity": rarityMap[foundRarity],
        "type": foundType,
        "perk": foundPerk
    }
}