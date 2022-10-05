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


import { ingotData } from './data'
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
    
}

getIngotItems()
getPerkRecipes()
getGearItems()