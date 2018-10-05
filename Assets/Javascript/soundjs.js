

$(document).on('ready', function () {
  var ajaxData;
  //TODO: Add YouTube API configs
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
    console.log("---------------\nURL: " + queryURL + "\n---------------");
    console.log(queryURL + $.param(queryParams));
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
    console.log(YouTubeData);
    console.log("------------------------------------");
    var $videoList = $("<ul>");
    //var numvideos = YouTubeData.pageInfo.resultsPerPage;
    $.each(YouTubeData.items, function (i, item) {
      console.log(item);
      var vid = item.id.videoId;



      //   // Increase the videoCount (track video # - starting at 1)
      console.log("inside video to page")


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
      console.log(item.snippet.channelTitle);
      $videoListItem.append(
        $("<p>")
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
      console.log(vid);

      // Append the video
      console.log("look at me" , $videoListItem)
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
      console.log(result);
      getVideo(result);
    }).fail(function (err) {
      throw err;
    })
    //.then(updatePage)
  })
});
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
// ALDO HELPED HERE>>>>>>>>>>>>>
var dataRef = firebase.database();
$(document).on("click", ".addSongtoPlaylistbtn", function (event) {
  console.log(event.target.value, "attach a string to this thing")

  dataRef.ref().push(ajaxData.items[event.target.value])
  event.preventDefault();
  console.log("firebase push ", event);
  firebase.database().ref('playlist').push(event)
});

//onclick for add to playlist button
$("#addToPlaylistbtn").on("click", function (event) {
  event.preventDefault();
  console.log(event);
  var userInput = $('#user-text').val()
  console.log(userInput)

  var videoArray = [0];
  //TODO: Input starter youtube id for the user that they can delete later 
  //dataRef.ref().child("Playlists").child(userInput).set({songs: []}) //ARRON's
 // dataRef.ref().child("Playlists").child(userInput).push({songs:0});//ATTACK2
  dataRef.ref().child("Playlists").child(userInput).set({videoArray});
  //$("#playList1").text(userInput);

});

//TODO: create firebase event listener for user playlists
// reference the childsnapshot data
// dynamically create card that will live inside of the accordion
// 
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var empName = childSnapshot.val().name;
  var empRole = childSnapshot.val().role;
  var empStart = childSnapshot.val().start;
  var empRate = childSnapshot.val().rate;

  // Employee Info
  console.log(empName);
  console.log(empRole);
  console.log(empStart);
  console.log(empRate);

});
/*
function accordionPlaylist(){
  return (`<div class="card">
      <div class="card-header" id="headingOne">
      <h5 class="mb-0">'
      <button class="btn btn-link" id="playList1"
      type="button" data-toggle="collapse" 
      data-target="#collapseOne" aria-expanded="true" 
      aria-controls="collapseOne">
         ${Playlist1}
        </button>
        </h5>
      </div>
  
      <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body">
      ${VideoTitle} //Title/Name should be pulled from the database}
      </div></div></div>`
   )
}
*/

$('#modal-search-btn').on('click', function () {
  $('#search-modal').modal('toggle');
})