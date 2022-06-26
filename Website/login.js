const auth = firebase.auth();
const errorH5 = document.getElementById("errorH5");
const emailInput = document.getElementById("emailInput");
const pwInput = document.getElementById("pwInput");
const submit = document.getElementById("btnSubmit");
const form = document.getElementById("form");

form.onsubmit = (e) => {
    e.preventDefault();
};

submit.onclick = () => {
    auth.signInWithEmailAndPassword(emailInput.value, pwInput.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            window.location = "index.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            errorH5.innerText = `${errorMessage}`;
        });
};
