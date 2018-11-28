const db = firebase.firestore();

function register(e) {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var nickname = document.getElementById("nickname").value;
  if (password === confirmPassword) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function(docRef) {
        db.collection("Settings")
          .doc("UserRole")
          .get()
          .then(function(doc) {
            var data = doc.data();
            db.collection("UserInfo")
              .doc(docRef.user.uid)
              .set({
                Nickname: nickname,
                Role: data["Default"]
              });
          });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
  } else {
    console.log("Password must be equal");
  }
}
<<<<<<< HEAD
function search(e){
  var name = document.getElementById("searchName").value;
  db.collection('UserInfo').where('Nickname', '==', 'Jardy').get().then(function(querySnapshot) {
    if (querySnapshot.size > 0) {
      // Contents of first document
      console.log(querySnapshot.docs[0].data());
    } else {
      console.log("No such document!");
    }
  })
  .catch(function(error) {
    console.log("Error getting document: ", error);
  });
}
function submitTeam(e){
  
}
=======
>>>>>>> d511d5645010f9dab0585d14cb7b76bc0df49b41
