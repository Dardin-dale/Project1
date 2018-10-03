$(document).ready(function () {
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

  var dataref = firebase.database();
  var playref = dataref.ref().child('Characters');
  var enemyref = dataref.ref().child('Enemies');
  var npcref = dataref.ref().child('NPC')
  
  function retrieveCharacter(charInfo, dataType, element) {
    var charEl = $("<div>").append($("<a href='#'>").text(charInfo.charName));
    charEl.addClass("char-info");
    charEl.data("type", dataType);
    // Output character info
    element.append(charEl);

    charEl.click(function (event) {
      $("#char-info").empty();
      $("#char-info-card").show();
      $("#char-name").text(charInfo.charName + "'s ")
      $("#player-name").text(charInfo.playName + ")");

      var stats = [
        "Class: " + charInfo.charClass,
        "Level: " + charInfo.level,
        "Race: " + charInfo.race,
        "Subclass: " + charInfo.subclass,
        "Experience Points: " + charInfo.ep,
        "Health: " + charInfo.health,
        "Speed: " + charInfo.speed,
        "Armor Class: " + charInfo.armorClass,
        "Background: " + charInfo.background,
        "Alignment: " + charInfo.alignment,
        "Strength: " + charInfo.strength,
        "Dexterity: " + charInfo.dexterity,
        "Constitution: " + charInfo.constitution,
        "Intelligence: " + charInfo.intelligence,
        "Wisdom: " + charInfo.wisdom,
        "Charisma: " + charInfo.charisma,
        "Skills: " + charInfo.skills,
        "Saving Throws: " + charInfo.savingThrows,
        "Traits: " + charInfo.traits,
        "Proficiencies: " + charInfo.proficiencies,
        "Ideals: " + charInfo.ideals,
        "Bond: " + charInfo.bonds,
        "Flaws: " + charInfo.flaws
      ].forEach(stat => $("#char-info").append($("<p>").text(stat)));
    });
  }

  // Player Characters
  playref.on("child_added", function (snap) {
    retrieveCharacter(snap.val(), "player", $("#players"));
  });

  // Non-player Characters
  npcref.on("child_added", function (snap) {
    retrieveCharacter(snap.val(), "npc", $("#npcs"));
  });

  //Enemies
  enemyref.on("child_added", function (snap) {
    retrieveCharacter(snap.val(), "enemy", $("#enemies"));
  });

  $("#char-info-card").hide();
})