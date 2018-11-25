const db = firebase.firestore();

var promises = [];

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
            var score = team.Score;
            promises.push(
              team.TeamID.get().then(teamRef => {
                var teamRefData = teamRef.data();
                console.log(teamRefData.TeamName);
                htmlText += `
                <li class="nav-item">
                    <a class="nav-link" id="updateScore" style="cursor: pointer">${
                      teamRefData.TeamName
                    }</a>
                </li>
                `;
              })
            );
          });
          Promise.all(promises).then(() => {
            htmlText += `</ul>`;
            $("#maxang").html(htmlText);
          });
        });
      });
    });
}
