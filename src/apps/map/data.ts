let mapData: any = null;

export async function getMapData() {
    if (mapData) return mapData;
    
    const loader = document.getElementById('loading');

    if (loader) {
        loader.style.display = 'block';
    }

    const response = await fetch('https://raw.githubusercontent.com/Stevnbak/TCF-Information/main/mapData.json', {});
    const json = await response.json();

    if (loader) {
        loader.style.display = 'none';
    }
    
    mapData = json;
    return json;
}

export async function getTierData() {
    const response = await fetch('./tiers.json')
    const json = await response.json();
    
    return json;
}
