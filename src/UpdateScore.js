const db = firebase.firestore();

var promises = [];

var teamName = [];
var score = [];

function showScoretoUpdate() {
  db.collection("Competition")
    .doc("A1qDn5cGZMsT3upqRazI")
    .get()
    .then(doc => {
      console.dir(doc.data());
      doc.data().Matchs.forEach(match => {
        // console.dir(match);
        match.get().then(matchData => {
          var matchDataa = matchData.data();
          console.dir(matchDataa);

          var htmlText = `
          <ul class="navbar-nav ml-auto">
          `;
          matchDataa.Teams.forEach(team => {
            score.push(team.Score);
            promises.push(
              team.TeamID.get().then(teamRef => {
                var teamRefData = teamRef.data();
                teamName.push(teamRefData.TeamName);
              })
            );
          });
          Promise.all(promises).then(() => {
            console.log(teamName);
            console.log(score);
          });
        });
      });
    });
}

$("#score1").val(455);
