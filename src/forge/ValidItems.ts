export let validItems = {
    "gear": [
        ""
    ],
    "special": [
        "AF_Token"
    ],
    "ingots": [
        ""
    ],
    "perkRecipes": [
        ""
    ]
}


import { helmetData, ingotData, shieldData } from './data'
import { recipeData } from './data'

export function getIngotItems()  {
    const recipes = ingotData[0]["Rows"]

    let ingotItems : string[] = []
    for (let recipe in recipes) {
        let items = recipes[recipe]['m_requiredMaterials']
        for (let item in items) {
            ingotItems.push(items[item]['m_ingredient']["RowName"])
        }
    }
    validItems["ingots"] = [...new Set(ingotItems)]

    console.log(validItems)
}

export const getPerkRecipes = () => {
    const recipes = recipeData[0]["Rows"]

    let perkRecipes: string[] = []
    
    for (let recipe in recipes) {
        let items = recipes[recipe]['m_materialsHostingThisPerk']
        for (let item in items) {
            perkRecipes.push(items[item]["RowName"])
        }
    }
    validItems["perkRecipes"] = [...new Set(perkRecipes)]
}

export function getGearItems() {
    const helmets = helmetData
    const shields = shieldData

    let validHelmets: string[] = []
    let validShields: string[] = []

    for (let helmet in helmets){
        let items = helmets[helmet]
        
        if (items['rarity'] === 'Rare' || items['rarity'] === 'Epic' || items['rarity'] === 'Exotic') {
            validHelmets.push(helmet)
        }
    }

    for (let shield in shields) {
        let items = shields[shield]

        if (items['rarity'] === 'Rare' || items['rarity'] === 'Epic' || items['rarity'] === 'Exotic') {
            validShields.push(shield)
        }
    }

    validItems["gear"] = [...new Set(validHelmets), ...new Set(validShields)]
}

getIngotItems()
getPerkRecipes()
getGearItems()