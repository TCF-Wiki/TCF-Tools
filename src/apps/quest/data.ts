import {githubURL} from "../constants.json";

async function get_mission_data() {
    const response = await fetch(githubURL + "missions.json", {});
    const json = await response.json();

    return json;
}

export const missionData = await get_mission_data();

async function get_item_data() {
    const response = await fetch(githubURL + "items.json", {});
    const json = await response.json();

    return json;
}

export const itemData = await get_item_data();

async function get_string_tables() {
    const response = await fetch(githubURL + "localization.json");
    const json = await response.json();

    return json;
}

export const stringTables = await get_string_tables();

async function get_locations() {
    const response = await fetch(githubURL + "locations.json");
    const json = await response.json();
    return json;
}

export const locationData = await get_locations();

async function get_tech_tree() {
    const json = await personalQuarters();
    return json.nodes;
}

export const techTreeData = await get_tech_tree();

async function get_tech_levels() {
    const json = await personalQuarters();
    return json.levels;
}

export const techLevelsData = await get_tech_levels();

async function personalQuarters() {
    const response = await fetch(githubURL + "personalQuarters.json");
    const json = await response.json();
    return json;
}
