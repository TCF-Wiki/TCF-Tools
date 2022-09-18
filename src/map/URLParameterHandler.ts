import { selectedItems, selectedLocations, selectedMap, selectedTier } from "./store";
import { getMapData } from "./data";
import { locationNames } from "./mapConstants";

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
        // load our item data 
        let itemData = await getMapData()
        itemData = itemData['descriptions']

        // find the item that matches

        let itemList = [];
        for (let item in items) {
            for (let i in itemData) {
                if (itemData[i]['name'].toLowerCase() == items[item].split('_').join(' ').toLowerCase()) {
                    //and add it to our store
                    let toAdd = i.split('_').join(' ')
                    itemList.push(toAdd)
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

        let locationList = []
        for (let loc in locations) {
            // we make sure each location exists
            if (Object.keys(locationNames).includes(locations[loc])) {
                // then we add it to our list of locations
                locationList.push(locations[loc])
            }
        }
        if (locationList) {
            selectedLocations.set(locationList)
        }
    } 
}

export function getShareLink() : string {
    // this function generates the URL parameters for use with share link
    let resultString = ''

    // map
    resultString += `?map=${selectedMap.get()}`

    // tier overlay
    resultString += `&tier=${selectedTier.get()}`

    // items
    for (let item in selectedItems.get()) {
        resultString += `&item=${selectedItems.get()[item]}`
    }

    // locations
    for (let loc in selectedLocations.get()) {
        resultString += `&loc=${selectedLocations.get()[loc]}`
    }
    
    return resultString
}