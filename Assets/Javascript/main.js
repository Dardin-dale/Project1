$(document).on('ready', function () {
      // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA7u4I8S7T1qOUo7iFhdSfW0qLx1xi3Mxg",
    authDomain: "ddproject-3a727.firebaseapp.com",
    databaseURL: "https://ddproject-3a727.firebaseio.com",
    projectId: "ddproject-3a727",
    storageBucket: "ddproject-3a727.appspot.com",
    messagingSenderId: "915757041211"
  };

  firebase.initializeApp(config);

  var dataRef = firebase.database();
  var playref = dataref.child('players');
  var enemyref = dataref.child('enemies');
  var npcref = dataref.child('NPC')
  //TODO: This doesn't work!
  playref.ref().on("child_added", function(snap) {
    console.log(snap.val());
    console.log("Working?" + snap.val().charName);

    var characterName = snap.val().charName;
    var playerName = snap.val().playName;
    var characterLevel = snap.val().level;

    console.log(characterName);
    console.log(playerName);
    console.log(characterLevel);

    // Output character info
    var character = $("#test-character").append(
      $("<p>").text(characterName),
      $("<p>").text(playerName),
      $("<p>").text(characterLevel),
    );

    // Append to main page - TODO: Not sure this line is necessary
    $("#test-character").append(character);
  });
})