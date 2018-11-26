const db = firebase.firestore();

var promises = [];
var promises2 = [];
var htmlText = "";

var teamName = [];
var score = [];

function showScoretoUpdate() {
  db.collection("Competition")
    .doc("A1qDn5cGZMsT3upqRazI")
    .get()
    .then(doc => {
      console.dir(doc.data());
      htmlText += `<form>`;
      doc.data().Matchs.forEach(match => {
        // console.dir(match);
        promises2.push(
          match.get().then(matchData => {
            var matchDataa = matchData.data();
            console.dir(matchDataa);
            htmlText += `<div>`;
            matchDataa.Teams.forEach(team => {
              var score = team.Score;
              promises.push(
                team.TeamID.get().then(teamRef => {
                  var teamRefData = teamRef.data();
                  console.log(teamRefData.TeamName);
                  htmlText += `
                ${teamRefData.TeamName}
                    <input type="text" id="${team.TeamID}" value="${score}">
                    
                `;
                })
              );
            });
            Promise.all(promises).then(() => {
              htmlText += `</div>`;
            });
          })
        );
      });
      Promise.all(promises2).then(() => {
        htmlText += `<button type="submit" class="btn btn-primary btn-xs"></form>`;
        $("#scoreBoard").html(htmlText);
      });
    });
}
