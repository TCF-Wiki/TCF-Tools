import type { roundToThree } from '@/calc/utils'
import type { log } from 'node:console'
import type { log } from 'node:console'
import type { randomBytes } from 'node:crypto'
import type { randomBytes } from 'node:crypto'
import type { faLongArrowRight } from '@fortawesome/free-solid-svg-icons'
import type { faLongArrowRight } from '@fortawesome/free-solid-svg-icons'
import type { faLongArrowRight } from '@fortawesome/free-solid-svg-icons'
import type { log } from 'node:console'
import type { pushScopeId } from 'vue'
import type { pushScopeId } from 'vue'
import type { log } from 'node:console'
import type { log } from 'node:console'
import { perkData, settingData } from './data'
import { perksByType } from './ForgeConstants'
import { outputItems, selectedItems } from './store'
import { validItems } from './ValidItems'

export const rarityMap : any = {
    "Epic": 1,
    "Exotic": 2,
    "Legendary": 3
}

export const reversedRarityMap : any = {
    "1": "Epic",
    "2": "Exotic",
    "3": "Legendary"
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
    let foundPerk = perksByType[foundType][Math.floor(Math.random() * perksByType[foundType].length)];
    
    let perkStrength = getPerkStrength(foundPerk)

    let returnData = {
        "rarity": rarityMap[foundRarity],
        "type": foundType,
        "perk": foundPerk,
        "strength": perkStrength
    }

    const outputString = `${returnData['type']}_Altered_0${returnData['rarity']}`

    outputItems.add(outputString, returnData)
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

export function getPerkStrength(perk) : string {
    const data = perkData[perk]['AttributeOverrides']
    if (!data) return 0

    let possibleResults : number[] = []
    for (let x = 0; x <= data['numSteps']; x++) {
        if (x == 0) {
            possibleResults.push(data['minValue'])
        } else {
            possibleResults.push(data['minValue'] + (
                data['stepGranularity'] * ( x -1 )
            ))
        }
    }

    let randomStrength : number = possibleResults[Math.floor(Math.random(possibleResults.length))]

    if (randomStrength.toString().includes('.')) {
        return Math.round((randomStrength-1)*100) + '%'
    } else {
        if (!randomStrength.toString().includes('-')) {
            return '+' + randomStrength
        } else {
            return randomStrength
        }
    }
}
chooseRecipeOutput()