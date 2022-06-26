const auth = firebase.auth();
const barcodeImg = document.getElementById("barcodeImg");

auth.onAuthStateChanged((user) => {
    if (user) {
        barcodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?data=https://simplihacks2hackathon.web.app/qrverification.html?email=${user.email}&amp;size=300x300`;
    } else {
        window.location = "login.html";
    }
});
