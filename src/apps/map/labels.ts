import L from 'leaflet';

function mapLabel(text: string, y: number, x: number) {
    let content = '<span class="map-label-text">' + text + '</span>';

    const locationIcon = L.divIcon({
        className: 'fa fa-circle',
    });

    let marker = L.marker([y, x], {icon: locationIcon, opacity: 0});

    return marker.bindTooltip(content, {direction: 'center', permanent: true, className: 'map-label', offset: [0, 12]});
}
export const mapOneLabels = [
    mapLabel('Science Campus', -191.954, 193.22),
    mapLabel('Waterfall Labs', -52.919, 188.22),
    mapLabel('Dig Site', -55.92, 120.699),
    mapLabel('Crashed Ship', -70.924, 67.685),
    mapLabel('Jungle Camp', -67.611, 36.248),
    mapLabel('Water Facility', -202.128, 125.383),
    mapLabel('Swamp Camp', -194.245, 69.62),
    mapLabel('East Collection Point', -114.877, 180.761),
    mapLabel('Comms Tower', -119.742, 58.63),
    mapLabel('North Uplink', -105.874, 135.795),
    mapLabel('South East Uplink', -166.37, 167.254),
    mapLabel('Vaccine Labs', -135.499, 200.786),
    mapLabel('Lagoon', -172.631, 228.517),
    mapLabel('Woodcutter Camp', -76.998, 202.766),
    mapLabel('Lake', -75.624, 173.637),
    mapLabel('Power Plant', -145.88, 82.0),
    mapLabel('Rock Pools', -164.256, 49.121),
    mapLabel('Jungle', -52.474, 63.5022),
    mapLabel('Abandoned Mine', -29.3623, 160.883),
    mapLabel('Parking Lot', -58.376, 146.751),
    mapLabel('Crashed Drill Site', -110.001, 167.27),
    mapLabel('South West Collection Point', -166.878, 96.001),
    mapLabel('Swamp', -196.499, 49.247),
    mapLabel('Waterfalls', -35.62, 199.141),
    mapLabel('East Caverns', -101.869, 206.141),
    mapLabel('Base Camp', -135.812, 125.115),
];

export const mapTwoLabels = [
    mapLabel('Favela', -222.298, 80.122),
    mapLabel('Lagoon', -214.944, 121.488),
    mapLabel('Fallen Tree', -131.973, 42.121),
    mapLabel('Greens Prospect', -126.973, 127.495),
    mapLabel('Hay Fields', -74.947, 33.493),
    mapLabel('Nutrion Farms Processing', -184.697, 71.74),
    mapLabel('Jungle Thermal Ponds', -102.973, 78.121),
    mapLabel('Nutrion Farms Warehouse', -37.534, 69.624),
    mapLabel('Geothermal Plant', -192.61, 140.56),
    mapLabel('Root Rock Tunnel', -165.944, 197.986),
    mapLabel('Lakeside Building', -144.948, 165.99),
    mapLabel('Skeleton', -124.972, 205.867),
    mapLabel('Skeleton Observation Site', -115.598, 226.368),
    mapLabel('Oasis', -72.598, 202.243),
    mapLabel('Pinnacle Labs', -33.202, 206.09),
    mapLabel('Osiris Wildlife Preserve', -107.487, 160.935),
    mapLabel('Starport Admin', -89.972, 146.745),
    mapLabel('Pumpkin Fields', -42.84, 110.996),
    mapLabel('Starport Landing Pad', -68.598, 126.747),
    mapLabel('Starport Warehouse', -74.598, 164.994),
    mapLabel('Lagoon Thermal Ponds', -175.945, 118.74),
];

export const mapThreeLabels = [
    mapLabel('Storm Pillar', -113.623258, 143.004195),
    mapLabel('Korolev Quarry', -143.569834, 135.575359),
    mapLabel('Korolev Island HQ', -163.803499, 153.178869),
    mapLabel('Korolev Docks', -153.042406, 87.545987),
    mapLabel('Cave of Stars', -124.806981, 106.61464),
    mapLabel('Sparkling Waters', -110.573926, 177.166503),
    mapLabel('Osiris Research Center', -92.14412, 113.964648),
    mapLabel('Osiris Offices', -114.435211, 95.729036),
    mapLabel('Osiris Labs', -97.91466, 159.685399),
];
