// Function for retrieving JSON content from the D&D API
function callDD(charDataField, pageElement) {
    var queryURL = "http://www.dnd5eapi.co/api/" + charDataField;
        
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        for(result of response.results){
        var newClass = $("<option>").val(result.name);
        newClass.text(result.name);
        pageElement.append(newClass);
        }
    }
    );
}

function fillClass(){
    callDD("classes", $("#class-input"));
    callDD("races", $("#race-input"));
}

fillClass();



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

// Initial Values
var charName = "";
var playName = "";
var level = 0;

$("#submit-char-sheet").on("click", function(event) {
    event.preventDefault();

    charName = $("#char-name-input").val().trim();
    playName = $("#player-name-input").val().trim();
    level = $("#level-input").val().trim();

    // Code for the push
    dataRef.ref().child("Characters").push({

    charName: charName,
    playName: playName,
    level: level
    });
});