const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const URL = "https://teachablemachine.withgoogle.com/models/VNzfuLbCN/";
const fileInput = document.getElementById("name");
let model, labelContainer, maxPredictions;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const locLat = document.getElementById("email");
const locLong = document.getElementById("phone");
const submit = document.getElementById("submit");
var type;

var init = function () {
    auth.onAuthStateChanged(function (user) {
        if (user) {
            let random = Math.random();
            fileInput.onchange = (e) => {
                var fileToStore = e.target.files[0];
                storage
                    .ref()
                    .child(`imageModel/${user.email}/${random}.png`)
                    .put(fileToStore)
                    .then((snapshot) => {
                        console.log("Uploaded a file!");
                        storage
                            .ref("/imageModel")
                            .child(`/${user.email}/${random}.png`)
                            .getDownloadURL()
                            .then((url) => {
                                var file = new Image();
                                file.crossOrigin = "anonymous";
                                file.src = `${url}`;
                                file.onload = function () {
                                    start(file);
                                };
                            });
                    });
            };
            let map = null;
            locLat.onchange = (e) => {
                if (map != null) {
                    map.remove();
                }
                map = L.map("map").setView([locLat.value || 0, locLong.value || 0], 13);

                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                }).addTo(map);

                L.marker([locLat.value, locLong.value]).addTo(map);
            };

            locLong.onchange = (e) => {
                if (map != null) {
                    map.remove();
                }
                map = L.map("map").setView([locLat.value || 0, locLong.value || 0], 13);

                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                }).addTo(map);

                L.marker([locLat.value, locLong.value]).addTo(map);
            };

            document.getElementById("form").onsubmit = (e) => {
                e.preventDefault();
            };

            submit.onclick = (e) => {
                db.collection("donationInfo")
                    .doc(`${user.email}-${random}`)
                    .set({
                        email: user.email,
                        latitutde: locLat.value,
                        longitude: locLong.value,
                        typeOfDonation: type,
                    })
                    .then(() => {
                        console.log("Document successfully written!");
                        window.location = "success.html";
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                        window.location = "fail.html";
                    });
            };
        } else {
            window.location = "login.html";
        }
    });
};

async function start(file) {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    console.log(file);
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    ctx.drawImage(file, 0, 0, 250, 208);
    await predict(canvas);
}

async function predict(file) {
    const prediction = await model.predict(file);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        console.log(classPrediction);
        console.log(prediction);

        if (prediction[0].probability.toFixed(2) > 0.5) {
            document.getElementById("labelContainer").innerHTML = "Food";
            type = "Food";
        } else {
            document.getElementById("labelContainer").innerHTML = "Clothes";
            type = "Clothes";
        }
    }
}

init();
