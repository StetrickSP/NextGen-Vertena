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

// Khoi tao firebase
const app = firebase.initializeApp(firebaseConfig)
// Khoi tao noi chua du lieu web
const database = firebase.database()

let currentEditId = null; // Biến để lưu ID của tài khoản đang chỉnh sửa

function editAccountUser(id, currentRole) {
    // Lưu ID của tài khoản hiện tại
    currentEditId = id;

    // Hiển thị modal
    document.getElementById('editModal').style.display = 'flex';

    // Cập nhật giá trị role hiện tại vào form
    document.getElementById('role').value = currentRole;
}

function closeModal() {
    // Đóng modal
    document.getElementById('editModal').style.display = 'none';
}

function saveEdit() {
    const newRole = document.getElementById('role').value;

    if (confirm("Bạn có chắc chắn muốn đổi dữ liệu này?")) {
        // Thực hiện hành động khi người dùng bấm Yes
        if (currentEditId) {
            // Cập nhật role mới vào Firebase
            const accountRef = database.ref('users/' + currentEditId);
            accountRef.update({ role: newRole }).then(() => {
                alert('Cập nhật thành công!');
                closeModal(); // Đóng modal sau khi lưu
                displayAccountUser(); // Tải lại danh sách
            }).catch((error) => {
                alert('Có lỗi xảy ra: ' + error.message);
            });
        }
    } else {
        console.log("Đã hủy chỉnh sửa!");
    }
}


function displayAccountUser() {
    const tableBody = document.getElementById('accountTable');
    tableBody.innerHTML = ''; // Xóa nội dung cũ của bảng

    database.ref('users').once('value', (snapshot) => {

        snapshot.forEach((childSnapshot) => {
            // Chỉ xử lý các tài khoản từ thứ hai trở đi
           
                const account = childSnapshot.val();
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${account.email}</td>
                    <td>${account.role}</td>
                    <td class="actions">
                        <button class="edit" onclick="editAccountUser('${childSnapshot.key}', '${account.role}')">Edit</button>
                        <button class="delete" onclick="deleteAcountUser('${childSnapshot.key}')">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            
            
        });
    });
}



// Xoá sản phẩm
function deleteAcountUser(id) {
    if (confirm("Bạn có chắc chắn muốn xóa dữ liệu này?")) {
        const apartmentRef = database.ref('users/' + id)
        apartmentRef.remove().then(() => {
            alert("Đã xoá tài khoản này")
            displayAccountUser()
        })
    } else {
        alert("Hủy thao tác xóa!");
    }
}

displayAccountUser()