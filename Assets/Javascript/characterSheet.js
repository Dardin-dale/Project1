//FUNCTIONS
// Retrieve JSON content from the D&D API
function callDD(charDataField, pageElement, formFunction) {
    var queryURL = "http://www.dnd5eapi.co/api/" + charDataField;

    $.ajax({
        url: queryURL.toLowerCase(),
        method: "GET"
    }).then(function(response){
        formFunction(pageElement, response);
    });
}

//Fills dropdown fields
function createDropdown(pageElement, response){
    for(result of response.results){
        var newClass = $("<option>").val(result.name);
        newClass.text(result.name);
        pageElement.append(newClass);
    }
}

//TODO: make these radio buttons instead of <p>
function createP(pageElement, response){
    pageElement.empty();
    console.log(response);
    for(result of response.proficiency_choices[0].from){
        var newSkill = $("<p>").val(result.name);
        newSkill.text(result.name);
        pageElement.append(newSkill);
    }
}

function fillField(){
    callDD("classes", $("#class-input"), createDropdown);
    callDD("races", $("#race-input"), createDropdown);
}


//EVENTS
//Populate fields related to class when class is chosen
$("#class-input").on('change', function() {
    var classChoice = $(this).val();
    callDD("classes/" + classChoice, $("#skills"), createP);
});

fillField();





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
var playerName = "";
var level = 0;

$("#submit-char-sheet").on("click", function(event) {
    event.preventDefault();

    charName = $("#char-name-input").val().trim();
    playerName = $("#player-name-input").val().trim();
    level = $("#level-input").val().trim();

    // Code for the push
    dataRef.ref().child("Characters").push({

    charName: charName,
    playerName: playerName,
    level: level
    });
});