import { reactive } from "vue";
import {githubURL} from "../constants.json";

async function get_weapon_data() {
    const response = await fetch(githubURL + "weapons.json", {});
    const json = await response.json();

    return json;
}

const tempWeaponData = await get_weapon_data();

for (let wep in tempWeaponData) {
    delete tempWeaponData[wep]['description']
    delete tempWeaponData[wep]["weakDamageMultiplierEnemy"];
    delete tempWeaponData[wep]["directDamagePlayerMultiplier"];
    delete tempWeaponData[wep]["directDamageEnemyMultiplier"];
    delete tempWeaponData[wep]["radialDamagePlayerMultiplier"];
    delete tempWeaponData[wep]["radialDamageEnemyMultiplier"];
    delete tempWeaponData[wep]["immediateFireIncreasesSpread"];
    delete tempWeaponData[wep]["animationEquipTime"];
}
delete tempWeaponData['WP_A_Sniper_Shard_01']

// we make it reactive so adding / changing it triggers watchers on this.
export let weaponData = reactive(tempWeaponData);
// make a deep copy
export let weaponDataCopy = JSON.parse(JSON.stringify(weaponData))

async function get_attachment_data() {
    const response = await fetch(githubURL + "attachments.json", {});
    const json = await response.json();

    return json;
}

const tempAttachmentData = await get_attachment_data();

export const attachmentData = tempAttachmentData;

async function get_armor_data() {
    const response = await fetch(githubURL + "shields.json");
    const json = await response.json();

    return json;
}

export const armorData = await get_armor_data();
// make a deep copy
export const armorDataCopy = JSON.parse(JSON.stringify(armorData));

async function get_target_data() {
    const response = await fetch(githubURL + "creatures.json");
    const json = await response.json();

    return json;
}

let temp = {}
temp["PlayerDefault"] = {
    health: 100,
    minDamageReduction: 0.35,
    maxDamageReduction: 2.0,
    armorConstant: 0.03,
    armorValue: 0,
    damageAreas: {
        legs: 0.8,
        hips: 1.1,
        head: -1,
    },
};
let tempTargetData = await get_target_data();
tempTargetData = Object.assign(temp, tempTargetData)

// delete tempTargetData['AI_GlowBeetle_Blast']
// delete tempTargetData['AI_GlowBeetle_Acid']
delete tempTargetData['AI_Howler_2']
export const targetData = tempTargetData;
// make a deep copy
export const targetDataCopy = JSON.parse(JSON.stringify(targetData))

async function get_item_data() {
    const response = await fetch(githubURL + "items.json");
    const json = await response.json();

    return json;
}

export const itemData = await get_item_data();