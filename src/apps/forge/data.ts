import {githubURL} from "../constants.json";

async function get_ingot_data() {
    const response = await fetch(githubURL + "forgeRecipes.json", {});
    const json = await response.json();

    return json;
}

export const ingotData = await get_ingot_data();

async function get_settings_data() {
    const response = await fetch(githubURL + "forgeSettings.json", {});
    const json = await response.json();

    return json;
}

export const settingData = await get_settings_data();

async function get_perk_data() {
    const response = await fetch(githubURL + "perks.json", {});
    const json = await response.json();

    return json;
}

export const perkData = await get_perk_data();

const get_helmet_data = async () => {
    const response = await fetch(githubURL + "helmets.json", {});
    const json = await response.json();

    return json;
};

export const helmetData = await get_helmet_data();

const get_shield_data = async () => {
    const response = await fetch(githubURL + "shields.json", {});
    const json = await response.json();

    return json;
};

export const shieldData = await get_shield_data();

const get_backpack_data = async () => {
    const response = await fetch(githubURL + "backpacks.json", {});
    const json = await response.json();

    return json;
};

export const backpackData = await get_backpack_data();

const get_item_data = async () => {
    const response = await fetch(githubURL + "items.json", {});
    const json = await response.json();

    return json;
};

export const itemData = await get_item_data();
