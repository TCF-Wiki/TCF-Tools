import { perkData } from "./data"

export const perksByType = {
    'Helmet': [] as string[],
    'Shield': [] as string[],
    'Bag':    [] as string[]
}



export function setupPerkLists() {
    for (let perk in perkData) {
        const compatible = perkData[perk]['Equipment']
        
        if (compatible.includes('Equipment.Helmet'))   perksByType["Helmet"].push(perk)
        if (compatible.includes('Equipment.Shield'))   perksByType["Shield"].push(perk)
        if (compatible.includes('Equipment.Back Item'))perksByType["Bag"].push(perk)
    }    
}


setupPerkLists()
