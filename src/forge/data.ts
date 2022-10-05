async function get_ingot_data() {
    const response = await fetch('https://raw.githubusercontent.com/TCF-Wiki/TCF-Information/main/forgeRecipes.min.json', {});
    const json = await response.json();

    return json
}

export const ingotData = await get_ingot_data();

async function get_settings_data() {
    const response = await fetch('https://raw.githubusercontent.com/TCF-Wiki/TCF-Information/main/forgeSettings.min.json', {});
    const json = await response.json();

    return json
}

export const settingData = await get_settings_data();

async function get_perk_data() {
    const response = await fetch('https://raw.githubusercontent.com/TCF-Wiki/TCF-Information/main/allPerks.min.json', {});
    const json = await response.json();

    return json
}

export const perkData = await get_perk_data();

const get_helmet_data = async () => {
    const response = await fetch('https://raw.githubusercontent.com/TCF-Wiki/TCF-Information/main/helmets.json', {})
    const json = await response.json()

    return json
}

export const helmetData = await get_helmet_data()

const get_shield_data = async () => {
    const response = await fetch('https://raw.githubusercontent.com/TCF-Wiki/TCF-Information/main/shields.json', {})
    const json = await response.json()

    return json
}

export const shieldData = await get_shield_data()

const get_item_data = async () => {
    const response = await fetch('https://raw.githubusercontent.com/TCF-Wiki/TCF-Information/main/allMaterials.json', {})
    const json = await response.json()

    return json
}

export const itemData = await get_item_data()
