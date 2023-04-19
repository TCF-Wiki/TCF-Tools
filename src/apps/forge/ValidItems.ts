export let validItems: any = {
    gear: [""],
    catalyst: ["ForgeIronIngot", "ChargedForgeIronIngot", "SuperChargedForgeIronIngot"],
    special: ["AF_Token"],
    ingots: [""],
    perkRecipes: [""],
};

import {backpackData, helmetData, ingotData, shieldData, perkData} from "./data";

export function getIngotItems() {
    const recipes = ingotData;

    let ingotItems: string[] = [];
    for (let recipe in recipes) {
        let items = recipes[recipe]["ingredients"];
        for (let item in items) {
            ingotItems.push(item);
        }
    }
    validItems["ingots"] = [...new Set(ingotItems)];
}

export const getPerkRecipes = () => {
    const recipes = perkData;

    let perkRecipes: string[] = [];

    for (let recipe in recipes) {
        let items = recipes[recipe]["items"];
        for (let item in items) {
            perkRecipes.push(item);
        }
    }
    validItems["perkRecipes"] = [...new Set(perkRecipes)];
};

export function getGearItems() {
    const helmets = helmetData;
    const shields = shieldData;
    const bags = backpackData;

    let validHelmets: string[] = ["Helmet_04", "Helmet_05", "Helmet_Altered_03"];
    let validShields: string[] = ["Shield_04", "Shield_05", "Shield_Altered_03"];
    let validBags: string[] = ["Bag_04", "Bag_05", "Bag_Altered_03"];

    // for (let helmet in helmets) {
    //     let items = helmets[helmet];

    //     if (items["rarity"] === "Epic" || items["rarity"] === "Exotic" || items["rarity"] === "Legendary") {
    //         if (helmet.includes("Tactical") || helmet.includes("Restoration") || (items["inGameName"] != "Titan Forged Helmet" && helmet.includes("Altered"))) continue;
    //         validHelmets.push(helmet);
    //     }
    // }

    // for (let shield in shields) {
    //     let items = shields[shield];

    //     if (items["rarity"] === "Epic" || items["rarity"] === "Exotic" || items["rarity"] === "Legendary") {
    //         if (shield.includes("Tactical") || shield.includes("Restoration") || shield.includes("Altered")) continue;
    //         validShields.push(shield);
    //     }
    // }

    // for (let bag in bags) {
    //     let items = bags[bag];

    //     if (items["rarity"] === "Epic" || items["rarity"] === "Exotic" || items["rarity"] === "Legendary") {
    //         if (bag.includes("Altered")) continue;
    //         validBags.push(bag);
    //     }
    // }

    validItems["gear"] = [...new Set(validHelmets), ...new Set(validShields), ...new Set(validBags)];
}

getIngotItems();
getPerkRecipes();
getGearItems();
