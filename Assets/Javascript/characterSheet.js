//FUNCTIONS
console.log('sanity')
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

function fillField(){
    callDD("classes", $("#class-input"), createDropdown);
    callDD("races", $("#race-input"), createDropdown);
}

//Fills dropdown fields
function createDropdown(pageElement, response){
    for(result of response.results){
        var newClass = $("<option>").val(result.name);
        newClass.text(result.name);
        pageElement.append(newClass);
    }
}

//generates skills based on class
function createSkills(pageElement, response){
    pageElement.empty();
    for(result of response.proficiency_choices[0].from){
        var skillDiv = $("<div>").attr("class", "input-group input-group-prepend input-group-text");
        var skillRadio = $("<input>").attr("type", "checkbox");
        var resultName = result.name.replace("Skill:", "").trim();
        var skillText = $("<input type=\"text\" class=\"form-control\">").val(resultName);
        var newSkill = skillDiv.append(skillRadio, skillText);
        pageElement.append(newSkill);
    }
}

//generates proficiencies based on class
function createProficiencies(pageElement, response){
    pageElement.empty();
    response.proficiencies.forEach(function(result){
        var newProficiency = result.name  + ", ";
        pageElement.append(newProficiency);
    });
}


//EVENTS
//Populate fields related to class when class is chosen
$("#class-input").on('change', function() {
    var classChoice = $(this).val();
    callDD("classes/" + classChoice, $("#skills-input"), createSkills);
    callDD("classes/" + classChoice, $("#proficiencies-input"), createProficiencies)
//    callDD("classes/" + classChoice, $("#saving-throw-input"), createSavingThrows) 
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
var playName = "";
var level = 0;

$("#submit-char-sheet").on("click", function(event) {
    event.preventDefault();
    // console.log('works');
    type = $('#player-type-input').val();
    // console.log({type});
    charName = $("#char-name-input").val().trim();
    
    playName = $("#player-name-input").val().trim();
    level = $("#level-input").val().trim();

    if(charName == '') {
        alert('Please add a character name');
    } else if (type == 'Player Character') {
        // Code for the push
        dataRef.ref().child("Characters").child(charName).set({
            charName: charName,
            playName: playName,
            level: level
        }); 
    } else if (type == 'Non-Player Character') {
        // Code for the push
        dataRef.ref().child("NPC").child(charName).set({
            charName: charName,
            playName: playName,
            level: level
        }); 
    } else if (type == 'Enemy') {
        // Code for the push
        dataRef.ref().child("Enemies").child(charName).set({
            charName: charName,
            playName: playName,
            level: level
        }); 
    }
    
});