import { selectedCreatures, selectedItems, selectedLocations, selectedMap, selectedTier } from "./store";
import { getMapData } from "./data";
import { locationNames, alphabeticalCreatures } from "./mapConstants";
export async function loadInitialStore() {
    // get all the search params
    const params = (new URL(document.location.toString())).searchParams

    // clear out the url bar
    window.history.pushState({}, document.title, '/map');

    // update our selected map if it is present
    let map : string | number | null= params.get('map')
    if (map) {
        map = parseInt(map)
        if (map == 1 || map == 2 || map == 3) {
            selectedMap.set(map)
        }
    } 

    // toggle our tiers if it is present
    let tier : string | boolean | null = params.get('tier')
    if (tier === 'true') {
        selectedTier.enable()
    }

    // load our selected items from the URL
    let items : string[] | string | null = params.getAll('item') 
    if (items.length > 0) {
        // clear the default selected items
        selectedItems.clear()
        // to not clutter the map, we also clear the selected locations. 
        selectedLocations.clear()
        // find the item that matches
        let tempData = await getMapData()
        const itemData = tempData['descriptions']

        let itemList : string[] = [];
        for (let item in items) {
            // find the matching item
            for (let i in itemData) {
                // find a matching item
                if (itemData[i]['name'].toLowerCase() == items[item].split('_').join(' ').toLowerCase()) {
                    //and add it to our store
                    itemList.push(i)
                    break;
                } 
            }

        }
        if (itemList) {
            selectedItems.set(itemList)
        }
    }

    // load our selected locations 
    let locations : string[] | string | null = params.getAll('loc')
    if (locations.length > 0) {
        // first we clear any default locations
        selectedLocations.clear()

        // create an object with the real names of the locations as key and the code name as values
        let swappedLocationNames : any = {};
        for(let key in locationNames){
            swappedLocationNames[locationNames[key].toString()] = key;
        }

        let locationList : string[] = []
        for (let loc in locations) {
            // make our parameter the same as the real name
            let name = locations[loc].split('_').join(' ')

            // if it exists...
            if (swappedLocationNames[name]) {
                // add it
                locationList.push(swappedLocationNames[name])
            }

        }
        if (locationList) {
            // and set our selected locations
            selectedLocations.set(locationList)
        }
    } 

    let creatures : string[] | string | null = params.getAll('creature')
    console.log(creatures)
    if (creatures.length > 0) {
        // first we clear any default creatures
        selectedCreatures.clear()

        // create an object with the real names of the creatures as key and the code name as values
        let swappedCreatureNames : any = {};
        for(let key in alphabeticalCreatures){
            swappedCreatureNames[alphabeticalCreatures[key].toString()] = key;
        }

        let creatureList : string[] = []
        for (let loc in creatures) {
            // make our parameter the same as the real name
            let name = creatures[loc].split('_').join(' ')

            // if it exists...
            if (swappedCreatureNames[name]) {
                // add it
                creatureList.push(swappedCreatureNames[name])
            }

        }
        console.log(creatureList)
        if (creatureList) {
            // and set our selected creatures
            selectedCreatures.set(creatureList)
        }
    } 
}

export async function getShareLink() {
    // this function generates the URL parameters for use with share link
    let resultString = ''

    // map
    resultString += `?map=${selectedMap.get()}`

    // tier overlay
    if (selectedTier.get()) resultString += `&tier=${selectedTier.get()}`

    // items
    let itemData = await getMapData()
    itemData = itemData['descriptions']
    for (let item in selectedItems.get()) {
        resultString += `&item=${(itemData[selectedItems.get()[item]]['name']).toString().split(' ').join('_')}`
    }

    for (let loc in selectedLocations.get()) {
        let name = locationNames[selectedLocations.get()[loc]]
        name = name.toString().split(' ').join('_')
        resultString += `&loc=${name}`
    }

    for (let loc in selectedCreatures.get()) {
        let name = alphabeticalCreatures[selectedCreatures.get()[loc]]
        name = name.toString().split(' ').join('_')
        resultString += `&creature=${name}`
    }    
    return resultString
}