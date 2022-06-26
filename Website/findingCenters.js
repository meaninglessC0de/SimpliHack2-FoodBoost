const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
let latit, longit;
const checkBox = document.getElementById("checkBox");
let currentSort = "Food";
const distanceSort = document.getElementById("distanceSort");
const one = document.getElementById("1");
const two = document.getElementById("2");
const three = document.getElementById("3");
const four = document.getElementById("4");
const five = document.getElementById("5");
const six = document.getElementById("6");
const seven = document.getElementById("7");
const eight = document.getElementById("8");
const nine = document.getElementById("9");

auth.onAuthStateChanged((user) => {
    if (user) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                latit = position.coords.latitude;
                longit = position.coords.longitude;
            });
        }
        let num = 1;
        db.collection("donationInfo")
            .where("typeOfDonation", "==", `${currentSort}`)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    var distance = getDistance([latit, longit], [doc.data().latitutde, doc.data().longitude]) / 1000;
                    storage
                        .ref("/imageModel")
                        .child(`/${doc.id.split("-")[0]}/${doc.id.split("-")[1]}.png`)
                        .getDownloadURL()
                        .then((url) => {
                            distance = getDistance([latit, longit], [doc.data().latitutde, doc.data().longitude]) / 1000;
                            document.getElementById(`${num}`).style.backgroundImage = `url("${url}")`;
                            document.getElementById(`${num}`).innerHTML = `<p class="para">Latitude: ${
                                doc.data().latitutde
                            }.</p>\n<p class="para">Longitude: ${doc.data().longitude}.\n<h3>DISTANCE: ${distance}</h3>`;
                            num++;
                        });
                });
            });
        checkBox.onchange = (e) => {
            num = 1;
            document.getElementById("grid").innerHTML = `<div id="1" class="cell"></div>
            <div id="2" class="cell"></div>
            <div id="3" class="cell"></div>
            <div id="4" class="cell"></div>
            <div id="5" class="cell"></div>
            <div id="6" class="cell"></div>
            <div id="7" class="cell"></div>
            <div id="8" class="cell"></div>
            <div id="9" class="cell"></div>`;
            if (checkBox.checked) {
                document.getElementById("label").innerText = "Clothes";
                currentSort = "Clothes";
                db.collection("donationInfo")
                    .where("typeOfDonation", "==", `${currentSort}`)
                    .get()
                    .then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                            var distance = getDistance([latit, longit], [doc.data().latitutde, doc.data().longitude]) / 1000;
                            storage
                                .ref("/imageModel")
                                .child(`/${doc.id.split("-")[0]}/${doc.id.split("-")[1]}.png`)
                                .getDownloadURL()
                                .then((url) => {
                                    distance =
                                        getDistance([latit, longit], [doc.data().latitutde, doc.data().longitude]) / 1000;
                                    document.getElementById(`${num}`).style.backgroundImage = `url("${url}")`;
                                    document.getElementById(`${num}`).innerHTML = `<p class="para">Latitude: ${
                                        doc.data().latitutde
                                    }.</p>\n<p class="para">Longitude: ${
                                        doc.data().longitude
                                    }.\n<h3>DISTANCE: ${distance}</h3>`;
                                    num++;
                                });
                        });
                    });
            } else {
                document.getElementById("label").innerText = "Food";
                currentSort = "Food";
                db.collection("donationInfo")
                    .where("typeOfDonation", "==", `${currentSort}`)
                    .get()
                    .then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                            var distance = getDistance([latit, longit], [doc.data().latitutde, doc.data().longitude]) / 1000;
                            storage
                                .ref("/imageModel")
                                .child(`/${doc.id.split("-")[0]}/${doc.id.split("-")[1]}.png`)
                                .getDownloadURL()
                                .then((url) => {
                                    distance =
                                        getDistance([latit, longit], [doc.data().latitutde, doc.data().longitude]) / 1000;
                                    document.getElementById(`${num}`).style.backgroundImage = `url("${url}")`;
                                    document.getElementById(`${num}`).innerHTML = `<p class="para">Latitude: ${
                                        doc.data().latitutde
                                    }.</p>\n<p class="para">Longitude: ${
                                        doc.data().longitude
                                    }.\n<h3>DISTANCE: ${distance}</h3>`;
                                    num++;
                                });
                        });
                    });
            }
        };

        distanceSort.onchange = (e) => {
            num = 1;
            db.collection("donationInfo")
                .where("typeOfDonation", "==", `${currentSort}`)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        var distance = getDistance([latit, longit], [doc.data().latitutde, doc.data().longitude]) / 1000;
                        if (distance <= distanceSort.value || distanceSort.value == "") {
                            storage
                                .ref("/imageModel")
                                .child(`/${doc.id.split("-")[0]}/${doc.id.split("-")[1]}.png`)
                                .getDownloadURL()
                                .then((url) => {
                                    distance =
                                        getDistance([latit, longit], [doc.data().latitutde, doc.data().longitude]) / 1000;
                                    document.getElementById(`${num}`).style.backgroundImage = `url("${url}")`;
                                    document.getElementById(`${num}`).innerHTML = `<p class="para">Latitude: ${
                                        doc.data().latitutde
                                    }.</p>\n<p class="para">Longitude: ${
                                        doc.data().longitude
                                    }.\n<h3>DISTANCE: ${distance}</h3>`;
                                    num++;
                                });
                        } else {
                            document.getElementById("grid").innerHTML = `<div id="1" class="cell"></div>
                            <div id="2" class="cell"></div>
                            <div id="3" class="cell"></div>
                            <div id="4" class="cell"></div>
                            <div id="5" class="cell"></div>
                            <div id="6" class="cell"></div>
                            <div id="7" class="cell"></div>
                            <div id="8" class="cell"></div>
                            <div id="9" class="cell"></div>`;
                        }
                    });
                });
        };
        document.getElementById("1").onclick = (e) => {
            var latitude = parseFloat(one.innerHTML.match(/[\d\.]+/));
            var longitude = parseFloat(one.innerHTML.split("Longitude")[1].match(/[\d\.]+/));
            var distance = getDistance([latit, longit], [latitude, longitude]) / 1000;
            window.open(
                `https://simplihacks2hackathon.web.app/map.html?lat=${latitude}&long=${longitude}&dist=${distance}`,
                "_blank"
            );
        };
        document.getElementById("2").onclick = (e) => {
            var latitude = parseFloat(two.innerHTML.match(/[\d\.]+/));
            var longitude = parseFloat(two.innerHTML.split("Longitude")[1].match(/[\d\.]+/));
            var distance = getDistance([latit, longit], [latitude, longitude]) / 1000;
            window.open(
                `https://simplihacks2hackathon.web.app/map.html?lat=${latitude}&long=${longitude}&dist=${distance}`,
                "_blank"
            );
        };
        document.getElementById("3").onclick = (e) => {
            var latitude = parseFloat(three.innerHTML.match(/[\d\.]+/));
            var longitude = parseFloat(three.innerHTML.split("Longitude")[1].match(/[\d\.]+/));
            var distance = getDistance([latit, longit], [latitude, longitude]) / 1000;
            window.open(
                `https://simplihacks2hackathon.web.app/map.html?lat=${latitude}&long=${longitude}&dist=${distance}`,
                "_blank"
            );
        };
        document.getElementById("4").onclick = (e) => {
            var latitude = parseFloat(four.innerHTML.match(/[\d\.]+/));
            var longitude = parseFloat(four.innerHTML.split("Longitude")[1].match(/[\d\.]+/));
            var distance = getDistance([latit, longit], [latitude, longitude]) / 1000;
            window.open(
                `https://simplihacks2hackathon.web.app/map.html?lat=${latitude}&long=${longitude}&dist=${distance}`,
                "_blank"
            );
        };
        document.getElementById("5").onclick = (e) => {
            var latitude = parseFloat(five.innerHTML.match(/[\d\.]+/));
            var longitude = parseFloat(five.innerHTML.split("Longitude")[1].match(/[\d\.]+/));
            var distance = getDistance([latit, longit], [latitude, longitude]) / 1000;
            window.open(
                `https://simplihacks2hackathon.web.app/map.html?lat=${latitude}&long=${longitude}&dist=${distance}`,
                "_blank"
            );
        };
        document.getElementById("6").onclick = (e) => {
            var latitude = parseFloat(six.innerHTML.match(/[\d\.]+/));
            var longitude = parseFloat(six.innerHTML.split("Longitude")[1].match(/[\d\.]+/));
            var distance = getDistance([latit, longit], [latitude, longitude]) / 1000;
            window.open(
                `https://simplihacks2hackathon.web.app/map.html?lat=${latitude}&long=${longitude}&dist=${distance}`,
                "_blank"
            );
        };
        document.getElementById("7").onclick = (e) => {
            var latitude = parseFloat(seven.innerHTML.match(/[\d\.]+/));
            var longitude = parseFloat(seven.innerHTML.split("Longitude")[1].match(/[\d\.]+/));
            var distance = getDistance([latit, longit], [latitude, longitude]) / 1000;
            window.open(
                `https://simplihacks2hackathon.web.app/map.html?lat=${latitude}&long=${longitude}&dist=${distance}`,
                "_blank"
            );
        };
        document.getElementById("8").onclick = (e) => {
            var latitude = parseFloat(eight.innerHTML.match(/[\d\.]+/));
            var longitude = parseFloat(eight.innerHTML.split("Longitude")[1].match(/[\d\.]+/));
            var distance = getDistance([latit, longit], [latitude, longitude]) / 1000;
            window.open(
                `https://simplihacks2hackathon.web.app/map.html?lat=${latitude}&long=${longitude}&dist=${distance}`,
                "_blank"
            );
        };
        document.getElementById("9").onclick = (e) => {
            var latitude = parseFloat(nine.innerHTML.match(/[\d\.]+/));
            var longitude = parseFloat(nine.innerHTML.split("Longitude")[1].match(/[\d\.]+/));
            var distance = getDistance([latit, longit], [latitude, longitude]) / 1000;
            window.open(
                `https://simplihacks2hackathon.web.app/map.html?lat=${latitude}&long=${longitude}&dist=${distance}`,
                "_blank"
            );
        };
    } else {
        window.location = "login.html";
    }
});

function getDistance(origin, destination) {
    var lon1 = toRadian(origin[1]),
        lat1 = toRadian(origin[0]),
        lon2 = toRadian(destination[1]),
        lat2 = toRadian(destination[0]);

    var deltaLat = lat2 - lat1;
    var deltaLon = lon2 - lon1;

    var a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var EARTH_RADIUS = 6371;
    return c * EARTH_RADIUS * 1000;
}
function toRadian(degree) {
    return (degree * Math.PI) / 180;
}
