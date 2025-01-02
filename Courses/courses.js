// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3IqTDaawY2ukrU9iCmpbp7JvGIIggMw4",
  authDomain: "verthena-c0a09.firebaseapp.com",
  databaseURL: "https://verthena-c0a09-default-rtdb.firebaseio.com",
  projectId: "verthena-c0a09",
  storageBucket: "verthena-c0a09.firebasestorage.app",
  messagingSenderId: "935519340983",
  appId: "1:935519340983:web:8354d553410ff6a6898032",
  measurementId: "G-SXBK6V54DC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = firebase.database();

// Form Elements
const addCourse = document.getElementById('addCourse')
const courseName = document.getElementById('courseName')
const coursePrice = document.getElementById('coursePrice')
const courseDescription = document.getElementById('courseDescription')
const imageUpload = document.getElementById('imageUpload')
const updateForm = document.getElementById('updateForm')
const updateName = document.getElementById('updateName')
const updatePrice = document.getElementById('updatePrice')
const updateDescription = document.getElementById('updateDescription')
const updateImageUpload = document.getElementById('updateImageUpload')
const apartmentList = document.getElementById('apartmentList')


//Them san pham vào firebase (add data to firebase)
addForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = courseName.value
    const price = coursePrice.value
    const description = courseDescription.value
    const image = imageUpload.files[0]

    if (image) {
        const reader = new FileReader()
        reader.onloadend = () => {
            const imageData = reader.result
            const newCourseRef = database.ref('courses').push()
            newCourseRef.set({              // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                name: name,
                price: price,
                description: description,
                image: imageData
            }).then(() => {
                alert("Thêm sản phẩm thành công vào website")
                resetAddForm()
                displayApartment()
            })
        }
         reader.readAsDataURL(image) 
    }
})

//-----------Functions---------//

