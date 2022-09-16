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
    maxZoom: 5,
    maxNativeZoom: 5,
    tileSize: 256,
    noWrap: true,
};

export const map1TileLayer: TileLayer = L.tileLayer('map-images/1/{z}/{x}/{y}.png', tileLayerOptions);

export const map2TileLayer: TileLayer = L.tileLayer('map-images/2/{z}/{x}/{y}.png', tileLayerOptions);

export const map3TileLayer: TileLayer = L.tileLayer('map-images/3/{z}/{x}/{y}.png', tileLayerOptions);

export const locationNames = {
    "HiddenStash": 'Hidden Stash',
    "Locker": 'Locker',
    "AmmoContainer": 'Ammo Container',
    "AbilityBox": 'Ability Box',
    "WeaponCrate": 'Military Crate',
    "Luggage": 'Luggage',
    "MedCase": 'Med Case',
    "Safe": 'Safe',
    "SuitCase": 'Suit Case',
    "Jacket": 'Jacket',
    "OrganicsBox": 'Cooler',
    "GenericContainer": 'Generic Container',
    "KorolevContainer": 'Dumpster',
    "FactoryContainer": 'Industrial Container',
    "FilingCabinet": "Osiris Filing Cabinet",

    "keyDoor": "Key Door",
    "NoiseTrap_Birds": "Noise Birds",
    "AIFriendly_SpawnLocation": "Leafman",
    "Meteor": "Meteor Location",
    "HealingPlant": "Healing Plant",
    "Evac": "Evac Location",
    "LaserDrill": "Laser Drill",
    "Uplink": "Uplink",
    "missionItem": "Mission Item",
    "OilPump": "Oil Well"
}




