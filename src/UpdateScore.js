const db = firebase.firestore();

function showScoretoUpdate() {
    db.collection("Competition").doc("A1qDn5cGZMsT3upqRazI").get().then((doc) => {
        console.dir(doc.data());
        doc.data().Matchs.forEach((match) => {
            console.dir(match);
            match.get().then((matchData) => {
                console.dir(matchData.data());
            });

        })
    });
}