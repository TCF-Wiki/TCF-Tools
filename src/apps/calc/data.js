import {githubURL} from "../constants.json";

async function get_weapon_data() {
    const response = await fetch(githubURL + "weapons.json", {});
    const json = await response.json();

    return json;
}

const tempWeaponData = await get_weapon_data();

for (let wep in tempWeaponData) {
    delete tempWeaponData[wep]["weakDamageMultiplierEnemy"];
    delete tempWeaponData[wep]["directDamagePlayerMultiplier"];
    delete tempWeaponData[wep]["directDamageEnemyMultiplier"];
    delete tempWeaponData[wep]["radialDamagePlayerMultiplier"];
    delete tempWeaponData[wep]["radialDamageEnemyMultiplier"];
    delete tempWeaponData[wep]["immediateFireIncreasesSpread"];
    delete tempWeaponData[wep]["animationEquipTime"];
}

export const weaponData = tempWeaponData;

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

async function get_target_data() {
    const response = await fetch(githubURL + "creatures.json");
    const json = await response.json();

    return json;
}

const tempTargetData = await get_target_data();

tempTargetData["PlayerDefault"] = {
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

export const targetData = tempTargetData;
