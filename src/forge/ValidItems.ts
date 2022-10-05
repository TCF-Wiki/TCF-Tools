let validItems = {
    "gear": [
        ""
    ],
    "special": [
        "AbyssAlloy"
    ],
    "ingots": [
        ""
    ],
    "perkRecipes": [
        ""
    ]
}


import { ingotData } from './data'

export function getIngotItems()  {
    const recipes = ingotData[0]["Rows"]

    let ingotItems : string[] = []
    for (let recipe in recipes) {
        let items = recipes[recipe]['m_requiredMaterials']
        for (let item in items) {
            ingotItems.push(items[item]['m_ingredient']["RowName"])
        }
    }
    validItems["ingots"] = ingotItems

    console.log(validItems)
}

export function getGearItems() {
    
}
