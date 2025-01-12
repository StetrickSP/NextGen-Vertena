// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js"
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js"

//------------------------------ FireBase Initialization ----------------------------------------//
const firebaseConfig = {
    apiKey: "AIzaSyADCfZre9b4Rh2Ma-QcH47ynTUmHGcyZmc",
    authDomain: "genmindx.firebaseapp.com",
    databaseURL: "https://genmindx-default-rtdb.firebaseio.com",
    projectId: "genmindx",
    storageBucket: "genmindx.firebasestorage.app",
    messagingSenderId: "776499388113",
    appId: "1:776499388113:web:3da811b17c53f7924baff0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Elements
const emailInput = document.getElementById("signup-email");
const passwordInput = document.getElementById("signup-pw");
const registerBtn = document.getElementById("rgstr_btn");


// Register
registerBtn.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Set default role as 'user'
            set(ref(db, "users/" + user.uid), {
                email: email,
                role: "user" // Default role
            })
                .then(() => {
                    alert("Registered successfully!");
                    window.location.href = "dang_nhap.html";
                })
                .catch((error) => {
                    console.error("Error saving to database:", error);
                    alert("Registration succeeded but failed to save user data. Please contact support.");
                });
        })
        .catch((error) => {
            console.error("Error during registration:", error);
            alert(error.message);
        });
});

