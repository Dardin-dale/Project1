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
  var npcref = dataref.ref().child('NPC');
  
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

  //##############################
  // Music Library
  //##############################
  var libref = dataref.ref().child('Playlists');

  //grabs the names of the playlists and adds buttons to the library.
  libref.on("child_added", function (snap) {
    var name = snap.key;
    var newDiv = $('<div>');
    var newBtn = $('<button class="btn btn-secondary playlist">');
    newBtn.text(name);
    newDiv.append(newBtn);
    $('#library').append(newDiv);
  })

  //plays songs from the playlist
  $(document).on('click', '.playlist', function() {
    //TODO: change existing player if already exists
    var listName = $(this).text();
    // console.log('clicked');
    var songs = findSongs(listName);
    //youtube plays only after the random son selected in the playlist
    //TODO: workaround random
    // var randSong = findRandSong(listName);
    
    //switches player if already playing
    if ($('#player').is('iframe')) {
      $('#play-shell').empty();
      $('#play-shell').append($('<div id="player">'));
    }
    player = new YT.Player('player', {
      height: '200',
      width: '320',
      videoId: songs[0],
      playerVars: {rel: 0, playlist: songs.slice(1)},
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
    console.log(songs.slice(1));

  })

  //Player API Calls
  function onPlayerReady(event) {
    event.target.playVideo();
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  var done = false;
  function onPlayerStateChange(event) {
    if (event.data === 0) {
      done = true;
    }
  }

  function stopVideo() {
    player.stopVideo();
  }

  //finds songs in names returns array of video tags
  function findSongs(name) {
    var songs = [];
    libref.child(name).once('value', function(snap) {
      snap.forEach(function (song) {
        // console.log(song.val());
        songs.push(song.val());
      })
    })
    return songs;
  }

  //finds random song from playlist name
  //not currently used due to yt api functionality
  function findRandSong(name) {
    var songs = findSongs(name);
    return songs[Math.floor(songs.length*Math.random())];
  }

})