import {githubURL} from "../constants.json";
export const itemList = await fetch(githubURL + "items.json", {}).then((response) => response.json());
export const weaponData = await fetch(githubURL + "weapons.json", {}).then((response) => response.json());
export const shieldData = await fetch(githubURL + "shields.json", {}).then((response) => response.json());
export const helmetData = await fetch(githubURL + "helmets.json", {}).then((response) => response.json());
export const backpackData = await fetch(githubURL + "backpacks.json", {}).then((response) => response.json());
export const consumableData = await fetch(githubURL + "consumables.json", {}).then((response) => response.json());
