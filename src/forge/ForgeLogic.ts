import type { roundToThree } from '@/calc/utils'
import { perkData, settingData, itemData, shieldData, helmetData, backpackData, ingotData } from './data'
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



export const chooseRecipeOutput = (): any => {
    const inputItems = Object.keys(selectedItems.get())

    inputItems.forEach(input => {

        validItems.special.forEach((item: string) => {
            if (input === item) resolveAbyssToken()
            return;
        })


        validItems.gear.forEach((item: string) => {
            if (input === item) {
                if (input.includes("Bag_")) resolveGearForge(item) 
                if (input.includes("Helmet_")) resolveGearForge(item)
                if (input.includes("Shield_")) resolveGearForge(item)
                return;
            }
        })

        validItems.ingots.forEach((item: string) => {
            if (input === item && item !== 'GlowingCrystalCoreShard') resolveIngotForge(item)
            return;
        })
   })
}

export const resolveIngotForge = (item: string) => {
    const data = ingotData
    const inputItems = Object.keys(selectedItems.get())
    const wantedIngredients: string[] = []

    for (let recipe in data) {
        
        for (let ingredient in data[recipe]['Ingredients']) {
            // check if passed item is one of the ingredients
            if (item === ingredient) {
                // push the appropriate ingredients based on what the item is
                if (item === 'ForgeIron') {
                    wantedIngredients.push('ForgeIron')
                    wantedIngredients.push('GlowingCrystalCoreShard')
                }
                if (item === 'PureForgeIron' || item === 'Letium') {
                    wantedIngredients.push('PureForgeIron')
                    wantedIngredients.push('Letium')
                    wantedIngredients.push('GlowingCrystalCoreShard')
                }
                
            }
        }
    }

    // check if all the ingredients are in the forge; no specific recipe yet
    const allIngredientsExist = wantedIngredients.every(ingredient => inputItems.includes(ingredient))
    let currentRecipe: any

    if (allIngredientsExist) {
        // check if all ingredients exist inside recipe and if it does setting that recipe as currentRecipe
        wantedIngredients.every(wantedIngredient => {
            for (let recipe in data) {
    
                for (let ingredient in data[recipe]['Ingredients']) {
                    
                    if (wantedIngredient === ingredient) currentRecipe = data[recipe]
                }
            }

        })
    }

    if (!currentRecipe) return;
    
    const rewardChances = currentRecipe['RewardChance']
    const rewardAmount = currentRecipe['RewardAmount']
    const ingredients = currentRecipe['Ingredients']

    // First lets check if we have the required items for this recipe
    for (let i in ingredients) {
        // if not, stop the recipe logic
        if (selectedItems.get()[i] < ingredients[i]) return;
    }    

    // otherwise, figure out the rewards for these items...
    let rewards = {} as any
    for (let i = 0; i <= rewardAmount-1; i++) {
        let randomChance = Math.round(Math.random() * 100) 
        
        let runningTotal = 0
        for (let r in rewardChances) {
            if (randomChance <= (runningTotal + rewardChances[r])) {
                if (rewards[r]) {
                    rewards[r] = rewards[r] + 1
                }  else {
                    rewards[r] = 1
                }
                break
            }
            runningTotal += rewardChances[r]
        }
    }  

    // and then remove the input items and add the output items
    for (let item in ingredients) {
        selectedItems.remove(item, ingredients[item])
    }

    for (let item in rewards) {
        outputItems.add(item, rewards[item])
    }
}

export function getPerkStrength(perk: string) : string {
    const data = perkData[perk]['AttributeOverrides']
    if (!data) return  '0'

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

    let randomStrength : number = possibleResults[Math.floor(Math.random()* possibleResults.length)]
    let type = perkData[perk]['Attributes'][0]['Type']

    if (type.includes('Multiplicitive_PreAdd')) {
        return Math.round((randomStrength-1)*100) + '%'
    } else if (type.includes('Additive')) {
        return randomStrength.toString()
        
    } else {
        return randomStrength.toString()
    }
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
    const possibleTypes = ["Shield","Helmet","Bag"]
    const foundType = possibleTypes[Math.floor(Math.random() * possibleTypes.length)]

    
    // generate a random perk (assumes equal distribution) 
    // @ts-ignore
    const foundPerk = perksByType[foundType][Math.floor(Math.random() * perksByType[foundType].length)];
    
    const perkStrength = getPerkStrength(foundPerk)

    const returnData = {
        "rarity": rarityMap[foundRarity],
        "type": foundType,
        "perkInfo":[{
            "perk": foundPerk,
            "strength": perkStrength
        }]
    }

    const outputString = `${returnData['type']}_Altered_0${returnData['rarity']}`

    selectedItems.remove('AF_Token', 1)
    outputItems.clear()
    outputItems.add(outputString, 1, returnData)
}

export function resolveGearForge(item: string) {
    // first get the data of this specific item
    let data;
    if (item.includes('Shield_')) data = shieldData[item]
    else if (item.includes('Helmet_')) data = helmetData[item]
    else if (item.includes('Bag_')) data = backpackData[item]
    else return;

    // then we figure out what catalyst to check for...
    let wantedCatalyst: string;
    if (data['rarity'] == 'Rare') wantedCatalyst = 'ForgeIronIngot'
    else if (data['rarity'] == 'Epic') wantedCatalyst = 'ChargedForgeIronIngot'
    else if (data['rarity'] == 'Exotic') wantedCatalyst = 'SuperChargedForgeIronIngot'
    else return;
    
    // check if we have the required ingot and amount...
    if (!(selectedItems.get()[wantedCatalyst] >= settingData['CatalystAmount'])) return;

    // now, check if there is the possibility of there being a perk added to it by checking if the input has any overlap with items used in perk recipes.
    const possiblePerkItems = Object.keys(selectedItems.get()).filter(x => validItems.perkRecipes.includes(x))
    
    let type : string;
    if (item.includes('Shield_')) type = 'Shield'
    else if (item.includes('Helmet_')) type = 'Helmet'
    else if (item.includes('Bag_')) type = 'Bag'
    else return;

    // if no perk item is found, simply upgrade the item and remove the catalyst
    if (possiblePerkItems.length == 0) {
        // remove the input items
        selectedItems.remove(item)
        selectedItems.remove(wantedCatalyst, settingData['CatalystAmount'])
        
        // construct the information for our output item
        const outputString = `${type}_Altered_0${rarityMap[itemData[wantedCatalyst]['rarity']]}`
        const outputData = {
            "rarity": rarityMap[itemData[wantedCatalyst]['rarity']],
            "type": type
        }

        // and then finally add it to our output items
        outputItems.clear()
        outputItems.add(outputString, 1, outputData)
    } else {
        // @ts-ignore
        const perks : any = perksByType[type]

        // create a list of matching perks with current input
        let result = getMatchingPerks(perks)
        let matchingPerks = result[0]
        let itemsInOrder  = result[1]


        // we can get up to two perks, so, first we pick up to two random perks from the list.
        let foundPerkIndexes : number[] = [];
        if (matchingPerks.length == 1) {
            // if there is only one possible perk...
            foundPerkIndexes = [0]
        } else if (Object.keys([...new Set(matchingPerks)]).length ==1) {
            // or only one unique perk...
            foundPerkIndexes = [Math.floor(Math.random() * matchingPerks.length)]
        } else {
            // there are multiple perks. This is going to complicate the matter.
            // pick a random first perk from the list
            const firstRandomIndex = Math.floor(Math.random() * matchingPerks.length)
            const firstRandomPerk = matchingPerks[firstRandomIndex]

            //  now, check if the item that we used still has enough amounts left to be used for a second recipe
            const itemAmountAvailable = selectedItems.get()[itemsInOrder[firstRandomIndex]]
            const itemAmountUsed = settingData["RarityAmount"][itemData[itemsInOrder[firstRandomIndex]]['rarity']] 

            if (itemAmountAvailable >= itemAmountUsed*2) {
                console.log('Multiple perks, but items used is not important')
                // if yes, simply pick a second perk from the list that is not the same perk. 
                let hasFoundPerk = false 
              
                let secondRandomIndex: number = -1;
                // there must always be a second perk to pick that is not the same as the first one, so using a while loop to trial and error it is okay. 
                while (!hasFoundPerk) {
                    secondRandomIndex = Math.floor(Math.random() * matchingPerks.length)
                    const secondRandomPerk = matchingPerks[secondRandomIndex]
    
                    if ( firstRandomPerk !== secondRandomPerk ) {
                        hasFoundPerk = true
                    }
                }
                foundPerkIndexes = [firstRandomIndex, secondRandomIndex]
            } else {
                // if no, we want to make sure we pick a perk that does not use the same item.
                //console.log('Multiple perks, we cannot use the same item as the first one')
                // first, create a list of perks that use different items.
                let indexesOfDifferentPerks : number[] = []

                for (let perk in matchingPerks) {
                    let newPerk = matchingPerks[perk]
                    // if the perk is the same as the first one, or uses the same item, we do not want to use it.
                    if ((newPerk !== firstRandomPerk) && (itemsInOrder[perk] !== itemsInOrder[firstRandomIndex])) {
                        indexesOfDifferentPerks.push(parseInt(perk))
                    }
                }

                // now, just pick a random perk from the list of valid perks...
                if (indexesOfDifferentPerks.length == 0) {
                    // fallback...
                    foundPerkIndexes = [firstRandomIndex]
                } else {
                    // we pick a random perk and save it to our output.
                    const secondRandomIndex = indexesOfDifferentPerks[Math.floor(Math.random() * indexesOfDifferentPerks.length)] 
                    foundPerkIndexes = [firstRandomIndex, secondRandomIndex]
                }
            }            
        }

        // now that we have all our perks, we turn them back into usable info
        let foundPerks : string[] = [];

        for (let perk in foundPerkIndexes) {
            foundPerks.push(matchingPerks[foundPerkIndexes[perk]])
        }

        

        // now we are going to create the perkInfo for this item.

        let perkInfo = []
        for (let perk in foundPerks) {
            perkInfo.push({
                perk: foundPerks[perk],
                strength: getPerkStrength(foundPerks[perk])
            })
        }
        // Pick a random perk + strength from the matching perk list

        // remove the input items
        // gear
        selectedItems.remove(item)
        // catalyst
        selectedItems.remove(wantedCatalyst, settingData['CatalystAmount'])
        // and the items that we ended up using...
        for (let perkItem in foundPerkIndexes) {
            const item = itemsInOrder[foundPerkIndexes[perkItem]]
            const amount = settingData['RarityAmount'][itemData[item]['rarity']]
            selectedItems.remove(item, amount)
        }

        
        // construct the information for our output item
        const outputString = `${type}_Altered_0${rarityMap[itemData[wantedCatalyst]['rarity']]}`
        const outputData = {
            "rarity": rarityMap[itemData[wantedCatalyst]['rarity']],
            "type": type,
            "perkInfo": perkInfo
        }

        // and then finally add it to our output items
        outputItems.clear()
        outputItems.add(outputString, 1, outputData)
    }
}

export function getMatchingPerks(perks: string[]) : [string[], string[]]{
    let matchingPerks : string[] = [];
    let itemsInOrder : string[] = []
    for (let perk in perks) {
        // go through each compatible perk and check if any of the items are found in input
        // and if the input has the required amount, add it to the possible matching perks
        let data = perkData[perks[perk]]['Items']
        for (let perkItem in data) {
            if ((selectedItems.get()[data[perkItem]] >= settingData['RarityAmount'][itemData[data[perkItem]]['rarity']] )) {
                matchingPerks.push(perks[perk])
                itemsInOrder.push(data[perkItem])
            }
        }
    }

    return [matchingPerks, itemsInOrder]
}