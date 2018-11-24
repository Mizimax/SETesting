var auth = {

    validateRegister : function(formData) {
        return new Promise(function(resolve, reject) {
            resolve( {
                asda: 0,
                sada: 1,
                sadaf: 1,
                dsgs: 1
            } );
        })
    },
    register : function(email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorCode + ' : ' + errorMessage)
        });
    }
}
