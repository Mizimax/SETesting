var userRef;
var currentUser;
var promiseTeam = [];

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.getElementById("userNameShow").style.display = "block";
    document.getElementById("logoutShow").style.display = "block";
    document.getElementById("cTeamShow").style.display = "block";
    document.getElementById("registerLink").style.display = "none";
    document.getElementById("loginShow").style.display = "none";

    currentUser = firebase.auth().currentUser;
    if (currentUser != null) {
      loadUserForTeam("#userAllCreate");
      loadUserForTeam("#userAllCreate2");
      userRef = db.collection("UserInfo").doc(currentUser.uid);
      userRef.onSnapshot(function(doc) {
        console.log(doc.data());
        // snap.forEach(doc => {
        document.getElementById("userNameShow").innerHTML = doc.data().Nickname;

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
        db.collection("Team")
          .where("UserID", "array-contains", userRef)
          .onSnapshot(querySnapshot => {
            console.log(querySnapshot);
            querySnapshot.forEach(doc => {
              if (doc) {
                // already team
                $("#cTeamShow").hide();
                $("#eTeamShow").show();
                $("#joinComp").removeClass("disable");

                window.team = doc.data();
                window.team.TeamID = doc.id;
                $("#teamName2").val(window.team.TeamName);
                window.team.UserID.forEach((user, index) => {
                  promiseTeam.push(
                    user.get().then(userData => {
                      console.log(userData.data());
                      window.team.UserID[index][
                        "Nickname"
                      ] = userData.data().Nickname;
                      window.team.UserID[index]["UserID"] = userData.id;
                    })
                  );
                });
                Promise.all(promiseTeam).then(team => {
                  db.collection("Competition")
                    .where("Teams", "array-contains", window.team)
                    .onSnapshot(snap => {
                      if (doc) {
                        snap.forEach(doc => {
                          $("#joinComp").addClass("disable");
                          $("#joinComp").text("Applyed");
                        });
                      } else {
                        $("#joinComp").removeClass("disable");
                        $("#joinComp").text("Apply");
                      }
                    });
                  window.currentSearch = $("#userAllCreate2").children();
                  var result = [];
                  window.team.UserID.forEach((ele, index) => {
                    // result.concat(
                    result.push(
                      currentSearch.filter(child => {
                        // console.log(eles[child]);

                        var childd = $(currentSearch[child]).children(":first");
                        return (
                          childd
                            .last()
                            .text()
                            .trim()
                            .toLowerCase() ==
                          window.team.UserID[index].Nickname.toLowerCase()
                        );
                      })
                    );

                    // );
                  });
                  result.forEach((ele, index) => {
                    console.log(ele);
                    if (index != ele.length - 1)
                      addTeamMember(
                        $(ele)
                          .children()
                          .last(),
                        "#userAllCreate2"
                      );
                  });
                });
              } else {
                // no team
                $("#cTeamShow").show();
                $("#eTeamShow").hide();
                $("#joinComp").addClass("disable");
              }
            });
            // });
            // );
          });
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
      $("#cTeamShow").hide();
      $("#eTeamShow").hide();
      $("#joinComp").addClass("disable");
      $("#joinComp").text("Apply");
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

function loadUserForTeam(target) {
  db.collection("UserInfo")
    .get()
    .then(function(snap) {
      window.users = [];
      var i = 1;
      var htmlText = "";
      snap.forEach(doc => {
        var data = doc.data();
        if (doc.id !== currentUser.uid) {
          htmlText += `
          <div id="user-${doc.id}" style="display:flex">
            <div class="col-sm-10">${data.Nickname}</div>
            <div class="col-sm-2" style="text-decoration: underline; cursor:pointer" onclick="addTeamMember(this, '${target}')">add</div>
          </div>
        `;
          window.users.push(data);
          i++;
        }
      });
      $(target).html(htmlText);
      $(`.teamList${target[target.length - 1] == 2 ? 2 : ""}`).html(`
      <div id="myUserID" style="display:flex">
        <div class="col-sm-10">You</div>
      </div>
    `);
    });
}

var searchFirst = true;

function search(ele, target) {
  var text = $(ele).val();
  var eles = $(target).children();
  if (searchFirst) {
    window.currentSearch = eles;
    searchFirst = false;
  }
  console.log(currentSearch);
  var result = currentSearch.filter(child => {
    // console.log(eles[child]);
    var childd = $(currentSearch[child]).children(":first");
    if (childd.last().text().length === 0) return false;
    return ~childd
      .last()
      .text()
      .trim()
      .toLowerCase()
      .indexOf(text);
  });
  console.log(result);
  if (text.length != 0) {
    if (result.length != 0) {
      $(target).html("");
      result.each(ele => {
        $(target).append($(result[ele])[0].outerHTML);
      });
    } else $(target).html("");
  } else {
    $(target).html("");
    window.currentSearch.each(i => {
      $(target).append(currentSearch[i]);
    });
  }
}

function addTeamMember(ele, target) {
  var addEle = $(ele).parent();
  $(ele).text("remove");
  $(ele).attr("onclick", `removeTeamMember(this, '${target}')`);

  addEle.remove();
  $(`.teamList${target[target.length - 1] == 2 ? 2 : ""}`).append(addEle);

  searchFirst = true;
}

function removeTeamMember(ele, target) {
  var rmEle = $(ele).parent();
  console.log(rmEle);
  $(ele).text("add");
  $(ele).attr("onclick", `addTeamMember(this, '${target}')`);

  rmEle.remove();
  $(target).append(rmEle);
  searchFirst = true;
}

function createTeam(formData, target, action) {
  var myUser = [];
  teamChild = $(target).children();

  teamChild.each(i => {
    if (i != 0) {
      var id = $(teamChild[i]).attr("id");
      id = id.split("-")[1];
      myUser.push(db.collection("UserInfo").doc(id));
    }
  });
  myUser.push(userRef);
  var ref;
  if (action === "createTeam") ref = db.collection("Team").doc();
  else ref = db.collection("Team").doc(window.team.TeamID);
  ref
    .set({
      TeamName: formData[0].value,
      UserID: myUser
    })
    .then(doc => {
      if (action === "createTeam") {
        $("#createTeamModal").modal("hide");
      } else {
        $("#editTeamModal").modal("hide");
      }
    });
}

function joinComp() {
  db.collection("Competition")
    .doc("A1qDn5cGZMsT3upqRazI")
    .get()
    .then(comp => {
      var data = comp.data();
      var teams = data.Teams;
      teams.push(window.team);
      data.Teams = teams;
      db.collection("Competition")
        .doc("A1qDn5cGZMsT3upqRazI")
        .set(data);
    });
}
