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

//
function createSkills(pageElement, response){
    pageElement.empty();
    for(result of response.proficiency_choices[0].from){
        var skillDiv = $("<div>").attr("class", "input-group input-group-prepend input-group-text");
        var skillRadio = $("<input>").attr("type", "radio");
        var resultName = result.name.replace("Skill:", "").trim();
        var skillText = $("<input type=\"text\" class=\"form-control\">").val(resultName);
        var newSkill = skillDiv.append(skillRadio, skillText);
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
    callDD("classes/" + classChoice, $("#skills-input"), createSkills);
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