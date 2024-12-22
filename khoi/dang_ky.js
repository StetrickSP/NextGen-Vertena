function store(){

    var name = document.getElementById('name');
    var pw = document.getElementById('pw');
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;

    ///Check Conditions
    if(name.value.length == 0){
        alert('Vui lòng nhập Email hoặc Tên');

    }else if(pw.value.length == 0){
        alert('Vui lòng nhập Mật khẩu');

    }else if(name.value.length == 0 && pw.value.length == 0){
        alert('Vui lòng nhập Email hoặc Tên và Password');

    // }else if(pw.value.length > 8){
    //     alert('Max of 8');

    }else if(!pw.value.match(numbers)){
        alert('Vui thêm 1 số vào mật khẩu');

    }else if(!pw.value.match(upperCaseLetters)){
        alert('Vui lòng thêm 1 chữ in hoa vào mật khẩu');

    }else if(!pw.value.match(lowerCaseLetters)){
        alert('Vui lòng thêm 1 chữ in thường vào mật khẩu');

    }else{  ///Dang ky Firebase Authenthication
        // localStorage.setItem('name', name.value);
        // localStorage.setItem('pw', pw.value);
        // alert('Tài khoản của bạn đã được tạo ra!');
        createUserWithEmailAndPassword(getAuth(), email, password)
         .then(function (userCredential)
        {
            var user = userCredential.user;
            alert('Dang ky thanh cong' + user.email);
            window.location.href = "dang_nhap.html";
        });
        
    }
}