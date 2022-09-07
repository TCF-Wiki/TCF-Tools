async function getMapData() {
    const response = await fetch('https://raw.githubusercontent.com/Stevnbak/TCF-Information/main/mapData.json', {});
    const json = await response.json();

    return json
}

export const mapData = await getMapData()
