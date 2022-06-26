const db = firebase.firestore();
const auth = firebase.auth();

function getParams(parameterName) {
    let parameters = new URLSearchParams(window.location.search);
    return parameters.get(parameterName);
}

let email = getParams("email");

auth.onAuthStateChanged((user) => {
    if (user) {
        db.collection("qr")
            .doc(`${email}`)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    if (doc.data().amtLeft == 0) {
                        window.location = "denyAccess.html";
                    } else {
                        db.collection("qr")
                            .doc(`${email}`)
                            .update({
                                amtLeft: firebase.firestore.FieldValue.increment(-1),
                            })
                            .then(function () {
                                window.location = "accessGranted.html";
                            });
                    }
                } else {
                    window.location = "fail.html";
                }
            });
    } else {
        window.location = "login.html";
    }
});
