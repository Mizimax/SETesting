const db = firebase.firestore();

var promises = [];
var promises2 = [];
var htmlText = "";

var teamName = [];
var score = [];

jQuery.extend({
  getQueryParameters: function(str) {
    return (str || document.location.search)
      .replace(/(^\?)/, "")
      .split("&")
      .map(
        function(n) {
          return (n = n.split("=")), (this[n[0]] = n[1]), this;
        }.bind({})
      )[0];
  }
});

function showScoretoUpdate() {
  db.collection("Competition")
    .doc("A1qDn5cGZMsT3upqRazI")
    .get()
    .then(doc => {
      doc.data().Matchs.forEach(match => {
        promises2.push(
          match.get().then(matchData => {
            tempMatchID = matchData.id;
            return matchData.data();
          })
        );
      });
      Promise.all(promises2).then(matchD => {
        matchD.forEach((matchd, index) => {
          matchd.Teams.forEach(team => {
            var score = team.Score;
            if (!promises[index]) promises[index] = [];
            promises[index].push(
              team.TeamID.get().then(teamRef =>
                Object.assign(
                  {},
                  teamRef.data(),
                  { TeamID: team.TeamID },
                  { Score: score }
                )
              )
            );
          });
        });

        Promise.all(
          promises.map(function(promise) {
            return Promise.all(promise);
          })
        ).then(teams => {
          htmlText += `<form method="post" id="updateScoreForm">`;
          teams.forEach(team => {
            htmlText += `<div id="${tempMatchID}">`;
            team.forEach(teamData => {
              htmlText += `
                ${teamData.TeamName}
                    <input type="text" name="${teamData.TeamID.id}" id="${
                teamData.TeamID.id
              }" value="${teamData.Score}">
                    
                `;
            });
            htmlText += `</div>`;
          });
          htmlText += `<button type="submit" class="btn btn-primary btn-xs">Save</button></form>`;

          $("#scoreBoard").html(htmlText);

          $("#updateScoreForm").submit(function(e) {
            e.preventDefault();
            var formData = $(this).serializeArray();
            updateScore(formData);
            return false;
          });
        });
      });
    });
}

function updateScore(formData) {
  // console.log(formData);
  // db.collection("Match").doc(formData);
  // var data = $.getQueryParameters(formData);

  data.forEach(ele => {
    var id = ele.name;
    var match = $("#" + id)
      .parent()
      .attr("id");
    console.log(match);
    // db.collection("Team").doc(match).;
  });
  // Object.keys(data).forEach(id => {
  //   var match = $("#" + id)
  //     .parent()
  //     .attr("id");
  //   console.log(match);
  //   // db.collection("Team").doc(match).;

  //   // data[id];
  // });
  console.log(formData);
  // console.log(data);
}
