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
  var playref = dataref.child('Characters');
  var enemyref = dataref.child('enemies');
  var npcref = dataref.child('NPC')
  //TODO add children
  playref.ref().on("child_added", function(snap) {
    console.log("Working?" + snap.val().charName);
    var charName = snap.val().charName;

    // Output character info
    $("#players").append($("<a>").text(charName));
  });

  //
  npcref.ref().on("child_added", function(snap) {
    console.log("Working?" + snap.val().charName);
    var charName = snap.val().charName;

    // Output character info
    $("#npc").append($("<a>").text(charName));
  });

  enemyref.ref().on("child_added", function(snap) {
    console.log("Working?" + snap.val().charName);
    var charName = snap.val().charName;
    var char = $("<a>").text(charName);
    char.addClass('char-info');
    // Output character info
    $("#enemies").append(char);
  });

  $('.char-info').on('click', )

    // var charName = snap.val().charName;
    // var playName = snap.val().playName;
    // var charClass = snap.val().charClass;
    // var level = snap.val().level;
    // var race = snap.val().race;
    // var subclass = snap.val().subclass;
    // var ep = snap.val().ep;
    // var background = snap.val().background;
    // var alignment = snap.val().alignment;
    // var strength = snap.val().strength;
    // var dexterity = snap.val().dexterity;
    // var constitution = snap.val().constitution;
    // var intelligence = snap.val().intelligence;
    // var wisdom = snap.val().wisdom;
    // var charisma = snap.val().charisma;
    // var skills = snap.val().skills;
    // var savingThrows = snap.val().savingThrows;
    // var traits = snap.val().traits;
    // var proficiencies = snap.val().proficiencies;
    // var ideals = snap.val().ideals;
    // var bonds = snap.val().bonds;
    // var flaws = snap.val().flaws;
})