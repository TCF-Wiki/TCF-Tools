async function get_ingot_data() {
    const response = await fetch('https://raw.githubusercontent.com/TCF-Wiki/TCF-Information/main/AlienForgeIngotsRecipes.json', {});
    const json = await response.json();

    return json
}

export const ingotData = await get_ingot_data();

async function get_settings_data() {
    const response = await fetch('https://raw.githubusercontent.com/TCF-Wiki/TCF-Information/main/AlienForgeSettings.json', {});
    const json = await response.json();

    return json
}

export const settingData = await get_settings_data();

async function get_recipe_data() {
    const response = await fetch('https://raw.githubusercontent.com/TCF-Wiki/TCF-Information/main/RolledPerks.json', {});
    const json = await response.json();

    return json
}

export const recipeData = await get_recipe_data();