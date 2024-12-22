function check(){
    var storedName = localStorage.getItem('name');
    var storedPw = localStorage.getItem('pw');

    var userName = document.getElementById('userName');
    var userPw = document.getElementById('userPw');
    var userRemember = document.getElementById("rememberMe");

    if(userName.value == storedName && userPw.value == storedPw){
        alert('Bạn đã được đăng nhập.');
        window.location.href = '/index.html';
    }else{
        alert('Lỗi đăng nhập.');
    }
}