$(document).on('ready', function () {
  //TODO: Add YouTube API configs
  function buildQueryURL() {
    var queryURL = "https://www.googleapis.com/youtube/v3/search?";
    var queryParams = {
      "part": "snippet"
    };

    //  TODO: parseInt for maxResults
    queryParams.maxResults = "10";
    queryParams.q = $("#query").val().trim();
    queryParams.key = "AIzaSyCK1f80S0SXKMViZTaj13rj0BqS0ay3RC4"

    //?part=snippet&maxResults=25&q=surfing&key=

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
      $playListbutton.addClass("btn btn-primary");
      $playListbutton.attr('id', 'addSongtoPlaylistbtn');

      // Add the newly created element to the DOM
      $("#video-section").append($videoList);
      $("#video-section").append($playListbutton);

      // If the video has a headline, log and append to $videoList
      var headline = item.snippet.title;
      var $videoListItem = $(`<li class='list-group-item videoHeadline' id=${i+1}>`);

      //         if (headline && item.snippet.channelTitle) {
      console.log(item.snippet.channelTitle);
      $videoListItem.append(
        "<h4><span class='label label-primary'>" +
        (i + 1) +
        "</span>" +
        "<strong> " +
        headline +
        "</strong><h4>"
      );

      //        }

      //   // If the video has a description, log and append to $videoList
      var description = item.snippet.description;
      console.log(description);
      //   if (description && description.original) {
      //     console.log(description.original);
      $videoListItem.append(description);
      //   }


      //   // Append and log url
      $videoListItem.append(`<a href='http://www.youtube.com/watch?v=${vid}'>http://www.youtube.com/watch?v=${vid}</a>`);
      $videoListItem.append(`<iframe class="ytplayer" type="text/html" width="200" height="100" src="https://www.youtube.com/embed/${vid}" frameborder='0' allowfullscreen>`)
      $("iframe").hide();
      console.log(vid);

      //   // Append the video
      $videoList.append($videoListItem);
    })
  }

  $(document).on("click", ".list-group-item", function (event) {
    $(this).children('iframe').show();
    console.log('card id', $(this).attr('id'));
  })



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

//Code for pushing to database
var dataRef = firebase.database();
$("#addSongtoPlaylistbtn").on("click", function (event) {
  event.preventDefault();
  console.log(event);
  dataRef.ref().child("playlist").child(playlist).set({
    playlist,
  });

});

//onclick for add to playlist button
$("#addToPlaylistbtn").on("click", function (event) {
  event.preventDefault();
  console.log(event);
  var userInput = $('#user-text').val()
  console.log(userInput)
  $("#playList1").text(userInput);
});

$('#modal-search-btn').on('click', function(){
  $('#search-modal').toggle();
})