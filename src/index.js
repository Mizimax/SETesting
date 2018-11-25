const db = firebase.firestore();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.getElementById("userNameShow").style.display = "block";
    document.getElementById("logoutShow").style.display = "block";
    document.getElementById("cTeamShow").style.display = "block";
    document.getElementById("registerLink").style.display = "none";
    document.getElementById("loginShow").style.display = "none";

    var currentUser = firebase.auth().currentUser;
    if (currentUser != null) {
      db.collection("UserInfo")
        .doc(currentUser.uid)
        .get()
        .then(function(doc) {
          document.getElementById(
            "userNameShow"
          ).innerHTML = doc.data().Nickname;
        });
    }
  } else {
    // No user is signed in.
    document.getElementById("userNameShow").style.display = "none";
    document.getElementById("logoutShow").style.display = "none";
    document.getElementById("cTeamShow").style.display = "none";
    document.getElementById("registerLink").style.display = "block";
    document.getElementById("loginShow").style.display = "block";
  }
});

function register(e) {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var nickname = document.getElementById("nickname").value;
  $("#registerModal").modal("hide");
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("confirmPassword").value = "";
  document.getElementById("nickname").value = "";
  if (password === confirmPassword) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function(docRef) {
        db.collection("UserInfo")
          .doc(docRef.user.uid)
          .set({
            Nickname: nickname,
            Role: "User"
          });
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
  } else {
    console.log("Password must be equal");
  }
}

function login() {
  var email = document.getElementById("login_email").value;
  var password = document.getElementById("login_password").value;
  $("#loginModal").modal("hide");
  document.getElementById("login_email").value = "";
  document.getElementById("login_password").value = "";
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function() {
      window.alert("Login success");
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        alert("Wrong password.");
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
}

function logout() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      // Sign-out successful.
      window.alert("Logout success");
    })
    .catch(function(error) {
      // An error happened.
    });
}
