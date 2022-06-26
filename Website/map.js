let latit, longit;

function getParams(parameterName) {
    let parameters = new URLSearchParams(window.location.search);
    return parameters.get(parameterName);
}

let latitude = getParams("lat");
let longitude = getParams("long");
let distance = getParams("dist");

let map = L.map("map").setView([latitude || 0, longitude || 0], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([latitude, longitude]).addTo(map).bindPopup(`Location Center. It is ${distance} km away.`).openPopup();

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        latit = position.coords.latitude;
        longit = position.coords.longitude;
        L.marker([latit, longit]).addTo(map).bindPopup("Your current Location").openPopup();
    });
}
