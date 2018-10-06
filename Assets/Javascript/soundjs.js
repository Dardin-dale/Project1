$(document).on('ready', function () {
  var ajaxData;
  
  function buildQueryURL() {
    var queryURL = "https://www.googleapis.com/youtube/v3/search?";
    var queryParams = {
      "part": "snippet",
      "format": "5"
    };

    //  TODO: parseInt for maxResults
    queryParams.maxResults = "10";
    queryParams.q = $("#query").val().trim();
    queryParams.key = "AIzaSyCK1f80S0SXKMViZTaj13rj0BqS0ay3RC4"


    // Logging the URL so we have access to it for troubleshooting
    // console.log("---------------\nURL: " + queryURL + "\n---------------");
    // console.log(queryURL + $.param(queryParams));
    return queryURL + $.param(queryParams);
  }

  /**
   * takes API data (JSON/object) and turns it into elements on the page
   * @param {object} YouTubeData - object containing Youtube API data
   */

  // TODO: Show Object Results
  function getVideo(YouTubeData) {
    ajaxData = YouTubeData
    // Log the YouTubeData to console, where it will show up as an object
    // console.log(YouTubeData);
    // console.log("------------------------------------");
    var $videoList = $("<ul>");
    //var numvideos = YouTubeData.pageInfo.resultsPerPage;
    $.each(YouTubeData.items, function (i, item) {
      // console.log(item);
      var vid = item.id.videoId;




      //   // Increase the videoCount (track video # - starting at 1)
      // console.log("inside video to page")


      // Create the  list group to contain the videos and add the video content for each
      $videoList.addClass("list-group");
      var $playListbutton = $("<button>");
      $playListbutton.addClass("btn btn-primary float-left");
      $playListbutton.addClass('addSongtoPlaylistbtn');
      $playListbutton.attr('value', i);
      //Added a line to create a name for the button
      $playListbutton.text("+");

      // Add the newly created element to the DOM
      $("#video-section").append($videoList);


      // If the video has a headline, log and append to $videoList
      var headline = item.snippet.title;
      var $videoListItem = $(`<li class='list-group-item videoHeadline' id=${i + 1}>`);

      //         if (headline && item.snippet.channelTitle) {
      // console.log(item.snippet.channelTitle);
      $videoListItem.append($("<p>")
          .append($playListbutton)
          .append(
            $("<p>").text(headline)
          )
      );

      //Testing add playlist button after varivale is declared
      // $($videoListItem).append($playListbutton);


      // // If the video has a description, log and append to $videoList
      // var description = item.snippet.description;
      // console.log(description);
      // $videoListItem.append(description);


      //   // Append and log url
      //$videoListItem.append(`<a href='http://www.youtube.com/watch?v=${vid}'>http://www.youtube.com/watch?v=${vid}</a>`);
      $videoListItem.append(`<iframe class="ytplayer" type="text/html" width="200" height="100" src="https://www.youtube.com/embed/${vid}" frameborder='0' allowfullscreen>`)
      // $("iframe").hide();
      // console.log(vid);

      // Append the video
      // console.log("look at me" , $videoListItem)
      $videoList.append($videoListItem);
    })
    // $("iframe").hide();
  }

  // $(document).on("click", ".list-group-item", function (event) {
  //   $(this).children('iframe').show();
  //   console.log('card id', $(this).attr('id'));
  // })

  // Function to empty out the videos
  function clear() {
    $("#video-section").empty();
  }

  // CLICK HANDLERS
  // ==========================================================

  $("#search-button").on("click", function (event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();

    // Empty the region associated with the videos
    clear();

    // Build the query URL for the ajax request to the Youtube API
    var queryURL = buildQueryURL();

    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function (result) {
      // console.log(result);
      getVideo(result);
    }).fail(function (err) {
      throw err;
    })
    //.then(updatePage)
  })

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


$(document).on("click", ".list-group-item", function (event) {
  $(this).children('iframe').show();
  console.log('card id', $(this).attr('id'));
})
//Code for pushing to database 
var dataRef = firebase.database();
$(document).on("click", ".addSongtoPlaylistbtn", function (event) {
  event.preventDefault();
  var playlist = $('#search-modal').attr('data-name');
  var songs = findSongs(playlist);
  if(songs[0] == 'blank') {
    songs = [];
  }
  var newSong = ajaxData.items[event.target.value].id.videoId;
  songs.push(newSong);
  dataRef.ref("Playlists").child(playlist).set(songs);
  alert('Song Added');
});

//onclick for add to playlist button
$("#addToPlaylistbtn").on("click", function (event) {
  event.preventDefault();
  // console.log(event);
  var userInput = $('#user-text').val()
  // console.log(userInput)
  //Take user-text and add Playlist to database
  dataRef.ref().child("Playlists").child(userInput).set({0:'blank'});
});

var x = 1; //playlist increment

dataRef.ref().child("Playlists").on("child_added", function(childSnapshot) {
  // console.log("in dataref child");
  //console.log(childSnapshot.val().child());
  // console.log(childSnapshot.key);
  // console.log(childSnapshot.val());
var playListName = childSnapshot.key

   $('.accordion').append(`<div class="card">
      <div class="card-header" id="headingOne">
      <h5 class="mb-0">
      <button class="btn btn-link" id="playList1"
      type="button" data-toggle="collapse" 
      data-target="#collapse${x}" aria-expanded="true" 
      aria-controls="collapseOne">
         ${playListName}
        </button>
        </h5>
      </div>`)
//for each loop for songs in array
for (var z=0; z<childSnapshot.val().length;z++){
  var videoID = childSnapshot.val()[z];
  console.log(videoID);
      $('.accordion').append(`  
      <div id="collapse${x}" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body">
      <iframe class="ytplayer" type="text/html" width="200" height="100" 
      src="https://www.youtube.com/embed/${videoID}" frameborder='0' allowfullscreen>
      </div></div>`
   )
}
   $('.accordion').append(` <div class="row">
   <div class="col-md-12">
     <button id="modal-search-btn" class="btn btn-primary" data-target="#search-modal" data-toggle="modal" data-listName="`+ playListName + `">Add Music</button>
   </div>
 </div>
 </div>`
 )
    x= x+1;
  });


  $(document).on('click', '#modal-search-btn', function () {
    // $('#search-modal').modal('toggle');
    console.log($(this).attr('data-listName'));
    $('#search-modal').attr('data-name', $(this).attr('data-listName'));
   })

  //finds songs in names returns array of video tags
  
  function findSongs(name) {
    var libref = dataRef.ref().child('Playlists');
    var songs = [];
    libref.child(name).once('value', function(snap) {
      snap.forEach(function (song) {
        // console.log(song.val());
        songs.push(song.val());
      })
    })
    return songs;
  }

  $('#close-search').on('click', function (){
    window.location.reload();
  })

});
