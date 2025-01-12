// Initialize Firebase
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
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// References
const productList = document.getElementById('productList');
const productForm = document.getElementById('productForm');
const productFormContent = document.getElementById('productFormContent');
const addProductBtn = document.getElementById('addProductBtn');
const cancelBtn = document.getElementById('cancelBtn');

// Event listeners
addProductBtn.addEventListener('click', () => {
    productForm.style.display = 'block';
});
cancelBtn.addEventListener('click', () => {
    productForm.style.display = 'none';
});

// Fetch products from Firebase
database.ref('products').on('value', (snapshot) => {
    productList.innerHTML = '';
    snapshot.forEach((childSnapshot) => {
        const product = childSnapshot.val();
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>${product.description}</p>
            <div class="product-images">
                ${(product.images && product.images.length > 0) ? product.images.map((img) => `<img src="${img}" alt="Product Image">`).join('') : '<p>No images available</p>'}
            </div>
            <button class="edit" onclick="editProduct('${childSnapshot.key}')">Edit</button>
            <button onclick="deleteProduct('${childSnapshot.key}')">Delete</button>
        `;
        productList.appendChild(productDiv);

        // Add slide show effect
        const productImages = productDiv.querySelector('.product-images');
        if (product.images && product.images.length > 0) {
            let imgIndex = 0;
            setInterval(() => {
                const images = productImages.querySelectorAll('img');
                images.forEach((img, index) => {
                    img.style.display = index === imgIndex ? 'block' : 'none';
                });
                imgIndex = (imgIndex + 1) % images.length;
            }, 3000);
        }
    });
});

// Add or Edit Product
let editProductId = null;
productFormContent.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const description = document.getElementById('productDescription').value;
    const images = Array.from(document.getElementById('productImages').files).map((file) => URL.createObjectURL(file));

    const newProduct = {
        name,
        price,
        description,
        images
    };

    if (editProductId) {
        database.ref('products/' + editProductId).update(newProduct);
        editProductId = null;
    } else {
        database.ref('products').push(newProduct);
    }

    productFormContent.reset();
    productForm.style.display = 'none';
});

// Delete Product
function deleteProduct(productId) {
    database.ref('products/' + productId).remove();
}

/// Edit Product
function editProduct(productId) {
    editProductId = productId;
    database.ref('products/' + productId).once('value', (snapshot) => {
        const product = snapshot.val();
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productDescription').value = product.description;
        // We do not fill the images field for security reasons
        productForm.style.display = 'block';
    });
}
