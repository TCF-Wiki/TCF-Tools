let mapData: any = null;

export async function getMapData() {
    if (mapData) return mapData;
    const response = await fetch('https://raw.githubusercontent.com/Stevnbak/TCF-Information/main/mapData.json', {});
    const json = await response.json();

    console.log('fetched!')
    console.trace()
    
    mapData = json;
    return json;
}
