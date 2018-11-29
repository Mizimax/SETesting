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

          // db.collection("Competition")
          //   .doc("A1qDn5cGZMsT3upqRazI")
          //   .get()
          //   .then(comp => {
          //     var compData = comp.data();
          //     var teamPromises = [];
          //     compData.Teams.forEach(team => {
          //       console.log(team);
          //       teamPromises.push(team.get().then(tm => tm));
          //     });
          //     Promise.all(teamPromises).then(team => {
          //       console.log(team.collection);

          // var userPromises = [];
          // team.forEach(tm => {
          //   console.log(tm);
          //   userPromises.push(
          //     tm
          //       .where("UserID", "array-contains", currentUser)
          //       .get()
          //       .then(userTeam => {
          //         console.log(userTeam.data());
          //       })
          //   );
          // });
          //   });
          // });
          // console.log(currentUser);
          // console.log(
          var userRef = db.collection("UserInfo").doc(currentUser.uid);
          db.collection("Team")
            .where("UserID", "array-contains", userRef)
            .onSnapshot(querySnapshot => {
              querySnapshot.forEach(doc => {
                if (doc) {
                  // already team
                  $("#cTeamShow").text("Edit Team");
                  $("#joinComp").removeClass("disable");

                  window.team = doc.data();
                  window.team.UserID.forEach((user, index) => {
                    user.get().then(userData => {
                      window.team.UserID[index][
                        "Nickname"
                      ] = userData.data().Nickname;
                      window.team.UserID[index]["UserID"] = userData.id;
                    });
                  });
                } else {
                  // no team
                  $("#cTeamShow").text("Create Team");
                  $("#joinComp").addClass("disable");
                }
              });
            });
          // );
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
        clearRegis();
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

function loadCompetition() {
  db.collection("Competition")
    .doc("A1qDn5cGZMsT3upqRazI")
    .get()
    .then(comp => {
      var compData = comp.data();
      $("#compName").text(compData.CompetitionName);
      $(".compDetail").text(compData.CompetitionDetail);
      $(".compType .content").text(compData.CompetitionType);
      $(".compGame .content").text(compData.GameName);
      $(".compOrganizer .content").text(compData.Organizer);
      $(".compFee .content").text(compData.Fee);
      $(".compPrize .content").text(compData.Prize);
      $(".compPic").attr("src", compData.Picture);
    });
}

function search(e) {
  var name = document.getElementById("searchName").value;
  db.collection("UserInfo")
    .where("Nickname", "==", "Jardy")
    .get()
    .then(function(querySnapshot) {
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
