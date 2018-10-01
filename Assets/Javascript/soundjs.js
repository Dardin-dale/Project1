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

      //TODO: Add YouTube API configs
      function buildQueryURL() {
        var queryURL = "https://www.googleapis.com/youtube/v3/search?";
        var queryParams = {
          "part": "snippet" 
        };
        
      //  TODO: parseInt for maxResults
        queryParams.maxResults = "25";
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
      function updatePage(YouTubeData) {

        // Log the YouTubeData to console, where it will show up as an object
        console.log(YouTubeData);
        console.log("------------------------------------");

        // // Loop through and build elements for the defined number of videos
        // for (var i = 0; i < numvideos; i++) {
        //   // Get specific video info for current index
        //   var video = YouTubeData.response.docs[i];

        //   // Increase the videoCount (track video # - starting at 1)
        var videoCount = i + 1;

        //   // Create the  list group to contain the videos and add the video content for each
        //   var $videoList = $("<ul>");
        //   $videoList.addClass("list-group");

        //   // Add the newly created element to the DOM
        //   $("#video-section").append($videoList);

        //   // If the video has a headline, log and append to $videoList
        //   var headline = video.headline;
        //   var $videoListItem = $("<li class='list-group-item videoHeadline'>");

        //   if (headline && headline.main) {
        //     console.log(headline.main);
        //     $videoListItem.append(
        //       "<span class='label label-primary'>" +
        //       videoCount +
        //       "</span>" +
        //       "<strong> " +
        //       headline.main +
        //       "</strong>"
        //     );
        //   }

        //   // If the video has a byline, log and append to $videoList
        //   var byline = video.byline;

        //   if (byline && byline.original) {
        //     console.log(byline.original);
        //     $videoListItem.append("<h5>" + byline.original + "</h5>");
        //   }

        //   // Log section, and append to document if exists
        //   var section = video.section_name;
        //   console.log(video.section_name);
        //   if (section) {
        //     $videoListItem.append("<h5>Section: " + section + "</h5>");
        //   }

        //   // Log published date, and append to document if exists
        //   var pubDate = video.pub_date;
        //   console.log(video.pub_date);
        //   if (pubDate) {
        //     $videoListItem.append("<h5>" + video.pub_date + "</h5>");
        //   }

        //   // Append and log url
        //   $videoListItem.append("<a href='" + video.web_url + "'>" + video.web_url + "</a>");
        //   console.log(video.web_url);

        //   // Append the video
        //   $videoList.append($videoListItem);
        //}
      }

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
            
         }) .done(function (result) {
              console.log(result);
            }).fail(function (err) {
              throw err;
            })
           // .then(updatePage)
        })
      });
    