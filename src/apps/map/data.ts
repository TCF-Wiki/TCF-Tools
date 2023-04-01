import {githubURL} from "../constants.json";

let mapData: any = null;
export async function getMapData() {
	if (mapData) return mapData;

	const loader = document.getElementById("loading");

	if (loader) {
		loader.style.display = "block";
	}

	const response = await fetch(githubURL + "mapData.json", {});
	const json = await response.json();

	if (loader) {
		loader.style.display = "none";
	}

	mapData = json;
	return json;
}

export async function getTierData() {
	const response = await fetch("./tiers.json");
	const json = await response.json();

	return json;
}

let itemData: any = null;
export async function getItemData() {
	if (itemData) return itemData;
	const response = await fetch(githubURL + "items.json");
	const json = await response.json();

	itemData = json;
	return json;
}
