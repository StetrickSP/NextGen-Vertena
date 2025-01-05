// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

//------------------------------ FireBase Initialization ----------------------------------------//
const firebaseConfig = {
    apiKey: "AIzaSyD2YVKQ7PYpJpAbiBuY2MHbjbPseajnTHg",
    authDomain: "finalnextgen.firebaseapp.com",
    databaseURL: "https://finalnextgen-default-rtdb.firebaseio.com",
    projectId: "finalnextgen",
    storageBucket: "finalnextgen.firebasestorage.app",
    messagingSenderId: "922615992897",
    appId: "1:922615992897:web:cd3e306aeeca7a2483ecc0"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Elements
const emailInput = document.getElementById("signup-email");
const passwordInput = document.getElementById("signup-pw");
const registerBtn = document.getElementById("rgstr_btn");
const loginBtn = document.getElementById("login_btn");

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
            });
            alert("Registered successfully!");
            window.location.href = "dang_nhap.html";
        })
        .catch((error) => {
            alert(error.message);
        });
});

// // Login
// loginBtn.addEventListener("click", () => {
//     const email = emailInput.value;
//     const password = passwordInput.value;
//     signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             const user = userCredential.user;

//             // Get user's role
//             const dbRef = ref(db);
//             get(child(dbRef, `users/${user.uid}`))
//                 .then((snapshot) => {
//                     if (snapshot.exists()) {
//                         const role = snapshot.val().role;
//                         if (role === "admin") {
//                             window.location.href = "admin-dashboard.html"; // Redirect to admin
//                         } else {
//                             window.location.href = "index.html"; // Redirect to home
//                         }
//                     } else {
//                         alert("No role assigned to this user.");
//                     }
//                 })
//                 .catch((error) => {
//                     alert(error.message);
//                 });
//         })
//         .catch((error) => {
//             alert(error.message);
//         });
// });