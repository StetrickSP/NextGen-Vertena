const firebaseConfig = 
{
  apiKey: "AIzaSyA3IqTDaawY2ukrU9iCmpbp7JvGIIggMw4",
  authDomain: "verthena-c0a09.firebaseapp.com",
  projectId: "verthena-c0a09",
  storageBucket: "verthena-c0a09.appspot.com",
  messagingSenderId: "935519340983",
  appId: "1:935519340983:web:8354d553410ff6a6898032",
  measurementId: "G-SXBK6V54DC"
}; 
    ///Import cac cau hinh Firebase
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
    import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';
    ///Khoi Dong Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);