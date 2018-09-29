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
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'M7lc1UVf-VE',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }

})

// <!--COMMENTING OUT SOUNDCLOUD
//   <!-- Optional JavaScript -->
//   <!-- JS for streaming from SoundCLoud -->
//   <!-- <script>
//     SC.initialize({
//       client_id: 'YOUR_CLIENT_ID'
//     });

//     // stream track id 293
//     SC.stream('/tracks/293').then(function (player) {
//       player.play().then(function () {
//         console.log('Playback started!');
//       }).catch(function (e) {
//         console.error('Playback rejected. Try calling play() from a user interaction.', e);
//       });
//     });