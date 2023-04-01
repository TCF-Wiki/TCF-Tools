/// this file handles constants.
import L, {TileLayer, type LatLngBoundsLiteral, type TileLayerOptions} from "leaflet";

export const bounds: LatLngBoundsLiteral = [
	[-256, 0],
	[0, 256]
];
//Map background colours
export const brightsandsColor: string = "#070d1b";
export const crescentfallsColor: string = "#020619";

// pixel size divided by map length in meters.
export const scaleFactor: number = 2048 / 1400;

const tileLayerOptions: TileLayerOptions = {
	minZoom: 0,
	minNativeZoom: 0,
	maxZoom: 7,
	maxNativeZoom: 5,
	tileSize: 256,
	noWrap: true
};

export const map1TileLayer: TileLayer = L.tileLayer("map-images/1/{z}/{x}/{y}.png", tileLayerOptions);

export const map2TileLayer: TileLayer = L.tileLayer("map-images/2/{z}/{x}/{y}.png", tileLayerOptions);

export const map3TileLayer: TileLayer = L.tileLayer("map-images/3/{z}/{x}/{y}.png", tileLayerOptions);

// Alphabetical list of real container names
export const alphabeticalContainers = {
	AmmoContainer: "Ammo Box",
	AlienContainer: "Alien Vent",
	AbilityBox: "Consumable Box",
	OrganicsBox: "Cooler",
	FactoryContainer: "Dumpster",
	HiddenStash: "Hidden Stash",
	KorolevContainer: "Industrial Container",
	Jacket: "Jacket",
	Locker: "Locker",
	Luggage: "Luggage",
	MedCase: "Med Case",
	WeaponCrate: "Military Crate",
	Safe: "Safe",
	SuitCase: "Suit Case",
	FilingCabinet: "Osiris Filing Cabinet"
};
// Alphabetical list of real special location names
export const alphabeticalSpecialLocations = {
	Dungeon: "Crusher Caverns",
	DeadDrop: "Dead Drop",
	Evac: "Evac Location",
	HealingPlant: "Healing Plant",
	keyDoor: "Key Door",
	LaserDrill: "Laser Drill",
	Meteor: "Meteor Location",
	NoiseTrap_Birds: "Noise Birds",
	OilPump: "Oil Well",
	PlayerStart: "Player Spawn",
	Puzzle: "Puzzle",
	AlienForge: "The Forge",
	Uplink: "Uplink"
};
// Alphabetical list of real creature names
export const alphabeticalCreatures: any = {
	GlowBeetleAcid: "Acid Tick",
	Crusher_2: "Alpha Crusher",
	GlowBeetleBlast: "Blast Tick",
	Crusher: "Crusher",
	Strider_3: "Heavy Strider",
	Howler: "Howler",
	Leafman: "Leafman",
	Weremole: "Marauder",
	Rattler_2: "Mature Rattler",
	Rattler: "Rattler",
	Weremole_2: "Savage Marauder",
	Strider: "Strider"
};

// All location names
export const locationNames: any = {...alphabeticalContainers, ...alphabeticalSpecialLocations, ...alphabeticalCreatures};

// Special location descriptions
export const specialDescriptions: any = {
	HealingPlant: "A large green plant that heals you gradually if you stand next to it.",
	LaserDrill: "A Letium deposit where a laser drill can be deployed using a Laser Drill Beacon.",
	AIFriendlySpawnLocation: "A harmless passive creature that simply wants to share its love with you. Come close enough and it will give you love hearts.",
	NoiseTrap_Birds: "A collection of harmless Bluetail birds that fly off in distress if you get too close.",
	Meteor: "A potential location for a meteor to crash into the ground. It appears that not every location is equally likely to happen.",
	OilPump: "A Letium oil well where an oil pump can be placed using the Oil Pump item.",
	Evac: "A potential location for an evacuation ship to land.",
	Uplink: "An uplink station, used to upgrade Data Drives to higher rarities.",
	Puzzle: "A puzzle that can be solved by moving the batteries to the correct positions.",
	PlayerStart: "A potential spawn location for the player.",
	AlienForge: "The Forge is an ancient machine hidden deep in the caverns of Tharis Island. Its exact origins are still unknown and shrouded in secrecy. This strange structure lies dormant, but some claim that, under the right circumstances, it may come alive once more. The Forge holds great power for those cunning and brave enough to unlock its potential.",
	Dungeon: "The Crusher Caverns, also called the Dungeon, is an end-game dungeon that requires prospectors to open it, using an Orbital Cannon Beacon on the Forest Crystal Seal above it."
};

// Dead drop info
export const DeadDropInfo: any = {
	DeadDrop_CommsBase_Tower_BP: {
		ingame: "Comms Base Dead Drop",
		description: ""
	},
	DeadDrop_Satellite_Tower_BP: {
		ingame: "Satellite Dish Dead Drop",
		description: ""
	},
	DeadDrop_SwampCampRoot_BP: {
		ingame: "Swamp Camp Root Dead Drop",
		description: ""
	},
	DeadDrop_BP_2: {
		ingame: "Base Camp Gate A Dead Drop",
		description: ""
	},
	DeadDrop_BaseCamp_Office_BP: {
		ingame: "Base Camp Office Dead Drop",
		description: ""
	},
	DeadDrop_BaseCamp_GateC_BP: {
		ingame: "Base Camp Gate C Dish Dead Drop",
		description: ""
	},
	DeadDrop_WaterfallLab_BP: {
		ingame: "Waterfall Lab Dead Drop",
		description: ""
	},
	DeadDrop_UndergroundElevator_BP: {
		ingame: "Underground Elevator Dead Drop",
		description: ""
	},
	DeadDrop_PinnacleLabs_BP: {
		ingame: "Pinnacle Labs Dead Drop",
		description: ""
	},
	DeadDrop_StarportAdmin_Cafeteria_BP: {
		ingame: "Cafeteria Dead Drop",
		description: ""
	},
	DeadDrop_StarportAdmin_ServerRoom_BP: {
		ingame: "Server Room Dead Drop",
		description: ""
	},
	DeadDrop_GreensProspect_Stockpile_BP: {
		ingame: "Stockpile Dead Drop",
		description: ""
	},
	DeadDrop_GreensProspect_Office_BP: {
		ingame: "Garage Office Dead Drop",
		description: ""
	},
	DeadDrop_GreensProspect_Fullfillment_BP: {
		ingame: "Fullfillment Center Dead Drop",
		description: ""
	},
	DeadDrop_NutronFarms_Courtyard_BP: {
		ingame: "Nutrion Farms Storage Dead Drop",
		description: ""
	},
	DeadDrop_NutronFarms_Office: {
		ingame: "Nutrion Farms Office Dead Drop",
		description: ""
	}
};
