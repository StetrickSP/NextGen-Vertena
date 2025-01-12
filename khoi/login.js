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

const emailInput = document.getElementById("login-email");
const passwordInput = document.getElementById("login-pw");
const loginBtn = document.getElementById("login_btn");

// Login
loginBtn.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Get user's role
            const dbRef = ref(db);
            get(child(dbRef, `users/${user.uid}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const role = snapshot.val().role;
                        if (role === "admin") {
                            window.location.href = "/admin-dashboard.html"; // Redirect to admin
                        } else {
                            window.location.href = "/index.html"; // Redirect to home
                        }
                    } else {
                        alert("No role assigned to this user.");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user role:", error);
                    alert(error.message);
                });
        })
        .catch((error) => {
            console.error("Error during login:", error);
            alert(error.message);
        });
});
