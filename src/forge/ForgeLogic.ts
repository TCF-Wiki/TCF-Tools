import { settingData } from './data'
import { perksByType } from './ForgeConstants'
import { selectedItems } from './store'
import { validItems } from './ValidItems'

const rarityMap : any = {
    "Epic": 1,
    "Exotic": 2,
    "Legendary": 3
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

export const chooseRecipeOutput = (): any => {
    let inputItems = Object.keys(selectedItems.get())

   inputItems.forEach(input => {
        validItems.special.forEach((item: string) => {
            if (input === item) return resolveAbyssToken()
        })

        validItems.gear.forEach((item: string) => {
            if (input === item) {
                if (input.includes("Bag_")) return console.log(item)
                if (input.includes("Helmet_")) return console.log(item)
                if (input.includes("Shield_")) return console.log(item)
            }
        })

        validItems.ingots.forEach((item: string) => {
            if (input === item) {
                if (input !== 'Letium' && input === 'ForgeIron') return console.log(item)
                if (input === 'PureForgeIron') return console.log(item)
            }
        })
   })
}

chooseRecipeOutput()