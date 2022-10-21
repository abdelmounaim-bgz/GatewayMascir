var map = L.map('map').setView([33.9873125, -6.8198762], 13);
// load a tile layer
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: 'Google',
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
    maxZoom: 16,
    minZoom: 13
}).addTo(map);

map.setZoom(13);

var Icon = L.icon({
    iconUrl: '../assets/icon.png',
    iconSize: [40, 40],
});

L.marker([33.9873125, -6.8198762], { icon: Icon }).addTo(map).bindTooltip("Gateway MAScIR");