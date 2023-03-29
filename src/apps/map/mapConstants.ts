/// this file handles constants.
import L, {TileLayer, type LatLngBoundsLiteral, type TileLayerOptions} from 'leaflet';

export const bounds: LatLngBoundsLiteral = [
    [-256, 0],
    [0, 256],
];
//Map background colours
export const brightsandsColor: string = '#070d1b';
export const crescentfallsColor: string = '#020619';

// pixel size divided by map length in meters.
export const scaleFactor: number = 2048 / 1400;

const tileLayerOptions: TileLayerOptions = {
    minZoom: 0,
    minNativeZoom: 0,
    maxZoom: 7,
    maxNativeZoom: 5,
    tileSize: 256,
    noWrap: true,
};

export const map1TileLayer: TileLayer = L.tileLayer('map-images/1/{z}/{x}/{y}.png', tileLayerOptions);

export const map2TileLayer: TileLayer = L.tileLayer('map-images/2/{z}/{x}/{y}.png', tileLayerOptions);

export const map3TileLayer: TileLayer = L.tileLayer('map-images/3/{z}/{x}/{y}.png', tileLayerOptions);

export const locationNames: any = {
    HiddenStash: 'Hidden Stash',
    Locker: 'Locker',
    AmmoContainer: 'Ammo Box',
    AlienContainer: 'Alien Vent',
    AbilityBox: 'Consumable Box',
    WeaponCrate: 'Military Box',
    Luggage: 'Luggage',
    MedCase: 'Med Case',
    Safe: 'Safe',
    SuitCase: 'Suit Case',
    Jacket: 'Jacket',
    OrganicsBox: 'Cooler',
    GenericContainer: 'Generic Container',
    KorolevContainer: 'Industrial Container',
    FactoryContainer: 'Dumpster',
    FilingCabinet: 'Osiris Filing Cabinet',

    keyDoor: 'Key Door',
    DeadDrop: 'Dead Drop',
    NoiseTrap_Birds: 'Noise Birds',
    AIFriendly_SpawnLocation: 'Leafman',
    Meteor: 'Meteor Location',
    HealingPlant: 'Healing Plant',
    Evac: 'Evac Location',
    LaserDrill: 'Laser Drill',
    Uplink: 'Uplink',
    missionItem: 'Mission Item',
    OilPump: 'Oil Well',
};

export const specialLocations = ['HealingPlant', 'LaserDrill', 'missionItem', 'keyDoor', 'DeadDrop', 'AIFriendly_SpawnLocation', 'Evac', 'NoiseTrap_Birds', 'Meteor', 'OilPump', 'Uplink'];

// alphabetical list of real container names
export const alphabeticalContainers = {
    AmmoContainer: 'Ammo Box',
    AlienContainer: 'Alien Vent',
    AbilityBox: 'Consumable Box',
    OrganicsBox: 'Cooler',
    FactoryContainer: 'Dumpster',
    HiddenStash: 'Hidden Stash',
    KorolevContainer: 'Industrial Container',
    Jacket: 'Jacket',
    Locker: 'Locker',
    Luggage: 'Luggage',
    MedCase: 'Med Case',
    WeaponCrate: 'Military Crate',
    Safe: 'Safe',
    SuitCase: 'Suit Case',
    FilingCabinet: 'Osiris Filing Cabinet',
};
// alphabetical list of real special location names
export const alphabeticalSpecialLocations = {
    Evac: 'Evac Location',
    DeadDrop: 'Dead Drop',
    HealingPlant: 'Healing Plant',
    keyDoor: 'Key Door',
    LaserDrill: 'Laser Drill',
    Meteor: 'Meteor Location',
    NoiseTrap_Birds: 'Noise Birds',
    OilPump: 'Oil Well',
    Uplink: 'Uplink',
};

export const alphabeticalCreatures : any = {
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
    Strider: "Strider",
}

export const specialDescriptions: any = {
    HealingPlant: 'A large green plant that heals you gradually if you stand next to it.',
    LaserDrill: 'A Letium deposit where a laser drill can be deployed using a Laser Drill Beacon.',
    AIFriendlySpawnLocation: 'A harmless passive creature that simply wants to share its love with you. Come close enough and it will give you love hearts.',
    NoiseTrap_Birds: 'A collection of harmless Bluetail birds that fly off in distress if you get too close.',
    Meteor: 'A potential location for a meteor to crash into the ground. It appears that not every location is equally likely to happen.',
    OilPump: 'A Letium oil well where an oil pump can be placed using the Oil Pump item.',
    Evac: 'A potential location for an evacuation ship to land.',
    Uplink: 'An uplink station, used to upgrade Data Drives to higher rarities.',
};

export const DeadDropInfo: any = {
    DeadDrop_CommsBase_Tower_BP: {
        ingame: 'Comms Base Dead Drop',
        description: '',
    },
    DeadDrop_Satellite_Tower_BP: {
        ingame: 'Satellite Dish Dead Drop',
        description: '',
    },
    DeadDrop_SwampCampRoot_BP: {
        ingame: 'Swamp Camp Root Dead Drop',
        description: '',
    },
    DeadDrop_BP_2: {
        ingame: 'Base Camp Gate A Dead Drop',
        description: '',
    },
    DeadDrop_BaseCamp_Office_BP: {
        ingame: 'Base Camp Office Dead Drop',
        description: '',
    },
    DeadDrop_BaseCamp_GateC_BP: {
        ingame: 'Base Camp Gate C Dish Dead Drop',
        description: '',
    },
    DeadDrop_WaterfallLab_BP: {
        ingame: 'Waterfall Lab Dead Drop',
        description: '',
    },
    DeadDrop_UndergroundElevator_BP: {
        ingame: 'Underground Elevator Dead Drop',
        description: '',
    },
    DeadDrop_PinnacleLabs_BP: {
        ingame: 'Pinnacle Labs Dead Drop',
        description: '',
    },
    DeadDrop_StarportAdmin_Cafeteria_BP: {
        ingame: 'Cafeteria Dead Drop',
        description: '',
    },
    DeadDrop_StarportAdmin_ServerRoom_BP: {
        ingame: 'Server Room Dead Drop',
        description: '',
    },
    DeadDrop_GreensProspect_Stockpile_BP: {
        ingame: 'Stockpile Dead Drop',
        description: '',
    },
    DeadDrop_GreensProspect_Office_BP: {
        ingame: 'Garage Office Dead Drop',
        description: '',
    },
    DeadDrop_GreensProspect_Fullfillment_BP: {
        ingame: 'Fullfillment Center Dead Drop',
        description: '',
    },
    DeadDrop_NutronFarms_Courtyard_BP: {
        ingame: 'Nutrion Farms Storage Dead Drop',
        description: '',
    },
    DeadDrop_NutronFarms_Office: {
        ingame: 'Nutrion Farms Office Dead Drop',
        description: '',
    },
};
export const keyCardInfo: any = {
    Map01_KeyCard_03: {
        name: 'Tall House Key',
        rarity: 'Common',
        description: 'A generic keycard, someone drew a house on stilts on the back. ',
        icon: 'Tall House Key.png',
        videoid: 'aOl1RKGkqZc',
    },
    Map01_KeyCard_05: {
        name: 'Archaeologist\'s Office Key',
        rarity: 'Common',
        description: 'Decades of swampy grime have eaten away at the keycard\'s cover, but someone scratched \"\"SKELETON\"\" onto it with a knife. Hopefully still works.',
        icon: 'Skeleton Key.png',
        videoid: 'r13TP3-0yWA',
    },
    Map02_KeyCard_02: {
        name: 'Janitors Key',
        rarity: 'Common',
        description: 'A janitors key loop with a single simple key with a cute broom charm attached; it appears to longingly sweep at the floor as it dangles from your hand ',
        icon: 'Janitors Key.png',
        videoid: '4besguaUyu8',
    },
    Map02_KeyCard_05: {
        name: 'Loose House Key',
        rarity: 'Common',
        description: 'Looks like the key to someones house. The amount of rust and moss on it seems to imply its origin is somewhere deep in a jungle. ',
        icon: 'Loose House Key.png',
        videoid: '4besguaUyu8',
    },
    Map01_KeyCard_01: {
        name: 'Server Access Key',
        rarity: 'Uncommon',
        description: 'Labeled only as Servers - Bright Sands, with the Com-Base logo. ',
        icon: 'Server Access Key.png',
        videoid: '6yMBlF6XVAQ',
    },
    Map01_KeyCard_04: {
        name: 'Clean Room Key',
        rarity: 'Uncommon',
        description: 'Keycard carrying the Asclepius Vaccines logo. And several biohazard warnings... may want to wash your hands.',
        icon: 'Bright Sands Observation Room Key.png',
        videoid: '3NQoy8HMdPo',
    },
    Map01_KeyCard_02: {
        name: 'Mine Access Key',
        rarity: 'Uncommon',
        description: 'Appears to be for one of the mine entrances along the northern edge of Bright Sands.',
        icon: 'Mine Access Key.png',
        videoid: 'VpGya1l5XgQ',
    },
    Map02_KeyCard_04: {
        name: 'Overseers Office',
        rarity: 'Uncommon',
        description: 'Labeled with Nutrion Farms and is emblazoned the Nutrion Farms logo. Its still covered in a sickly stale pumpkin juice... ew.',
        icon: 'Overseers Office.png',
        videoid: 'F8p6hhuOpcM',
    },
    Map01_KeyCard_06: {
        name: 'Storage Room Key',
        rarity: 'Rare',
        description: 'The keycard is pretty scratched up, and might have been part of some creature\'s meal, but you can still see the words \"\"Jungle Outpost\"\" at the top',
        icon: 'Armory Key.png',
        videoid: 'Vc0pzKZu6bA',
    },
    Map01_KeyCard_07: {
        name: 'Base Camp Armory Key',
        rarity: 'Rare',
        description: 'The key looks The key is in almost prestine condition. Hopefully so are the contents of the armory it grants access to.',
        icon: 'Luggage Saferoom Key.png',
        videoid: '_Vnzm2WU-xQ',
    },
    Map02_KeyCard_03: {
        name: 'Garage Office',
        rarity: 'Rare',
        description: 'The keycard has an image of one of those rad looking 6-wheeler trucks printed on it with the text Garage Office alongside it.  ',
        icon: 'Garage Office.png',
        videoid: 'W5tWRzaEesk',
    },
    Map02_KeyCard_01: {
        name: 'Boss Office',
        rarity: 'Epic',
        description: 'The unmistakable STARPORT logo leaps out from the card. The smaller Top Floor Admin whispers for your attention in pitiful subscript underneath. ',
        icon: "Boss' Office.png",
        videoid: '72GUHEHKbjI',
    },
    Map02_KeyCard_06: {
        name: 'Lab Keycard',
        rarity: 'Epic',
        description: 'A bright white keycard with the telltale livery of Osiris. Pinnacle Labs is laser etched professionally onto it. ',
        icon: 'Lab Keycard.png',
        videoid: 'KjHRGY_OVjQ',
    },
    Map02_KeyCard_07: {
        name: 'Bar Storage Key',
        rarity: 'Epic',
        description: 'A key to The Tipsy Drone attached to a miniature trinket of the namesakes affable drone mascot. ',
        icon: 'Bar Storage Key.png',
    },
    Map02_KeyCard_08: {
        name: 'Community Room',
        rarity: 'Epic',
        description: 'A key to a public space ',
        icon: 'Community Room.png',
    },
    Map02_KeyCard_09: {
        name: "Overgrown Keycard",
        rarity: "Epic",
        description: "A round green logo is barely visible under the muck that's grown over this keycard."
    },
};
