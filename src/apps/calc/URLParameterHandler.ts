// to do: make URL parameters work (see ../map/URLParameterHandler.ts)
import { selectedWeapons } from "./store";
import { weaponData } from "./data";
export async function loadInitialStore() {
    // get all the search params
    const params = (new URL(document.location.toString())).searchParams

    // load our selected items from the URL
    let weps : string[] | string | null = params.getAll('weapon') 
    if (weps.length > 0) {
        // clear the default selected weapons
        selectedWeapons.set([])

        // find the item that match
        let wepList : string[] = [];
        for (let w in weps) {
            // find the matching item
            for (let i in weaponData) {
                // find a matching item
                if (weaponData[i]['inGameName'].toLowerCase() == weps[w].split('_').join(' ').toLowerCase()) {
                    //and add it to our store
                    wepList.push(i)
                    break;
                } 
            }

        }
        if (wepList) {
            selectedWeapons.set(wepList)
        }
    }

    
}

export async function getShareLink() {
    // this function generates the URL parameters for use with share link
    let resultString = '?a=b'

    // weapons
    for (let item in selectedWeapons.list) {
        resultString += `&weapon=${(weaponData[selectedWeapons.list[item]]['inGameName']).toString().split(' ').join('_')}`
    }
    return resultString
}