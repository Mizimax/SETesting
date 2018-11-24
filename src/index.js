function register () {
    var email = document.getElementById('reg_email').value;
    var password = document.getElementBytId('reg_password').value;
    var confirmPassword = document.getElementById('reg_confirmPassword').value;
    if (password === confirmPassword){
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        });
        console.log("succeed")
        //document.write('<li class="nav-item"><a class="nav-link" style="cursor: pointer" data-toggle="modal" data-target="#registerFailModal"></a></li>');
    }
    else{
        console.log("fail")
        //document.write("")
    }
    
}