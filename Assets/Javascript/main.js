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

  //TODO: This doesn't work!
  dataRef.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    console.log("Working?" + dataRef.charName);

    var characterName = childSnapshot.val().charName;
    var playerName = childSnapshot.val().playName;
    var characterLevel = childSnapshot.val().level;

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