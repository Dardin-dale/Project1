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

function fillField(){
    callDD("classes", $("#class-input"), createDropdown);
    callDD("races", $("#race-input"), createDropdown);
}

//Fills dropdown fields (removes monk class because it behaves differently than the other classes)
function createDropdown(pageElement, response){
    var classArray = response.results;
    var noMonk = classArray.filter( el => el.name !== "Monk" ); 
    for(result of noMonk){
        var newClass = $("<option>").val(result.name);
        newClass.text(result.name);
        pageElement.append(newClass);
    }
}

//generates subclass based on class
function createSubclass(pageElement, response){
    response.subclasses.forEach(function(result){
        var subclassValue = $("#subclass-input").val(result.name);
        pageElement.append(subclassValue);
    });
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

//add skill generic function
function addSkill(ele, name) {
    var skillDiv = $("<div>").attr("class", "input-group input-group-prepend input-group-text");
    var skillRadio = $("<input>").attr("type", "checkbox");
    var skillText = $("<input type=\"text\" class=\"form-control\">").val(name);
    var newSkill = skillDiv.append(skillRadio, skillText);
    ele.append(newSkill);
}

//generates proficiencies based on class
function createProficiencies(pageElement, response){
    pageElement.empty();
    response.proficiencies.forEach(function(result){
        var newProficiency = result.name  + ", ";
        pageElement.append(newProficiency);
    });
}

//generates saving throws based on class
function createSavingThrows(pageElement, response){
    pageElement.empty();
    response.saving_throws.forEach(function(result){
        var savingThrowsDiv = $("<div>");
        var savingThrowsInputType = $("<input type=\"text\" class=\"form-control\">").val(result.name);
        var newSavingThrow = savingThrowsDiv.append(savingThrowsInputType);
        pageElement.append(newSavingThrow);
    });
}

//generates alignment based on race
function createAlignment(result, pageElement){
    pageElement.empty();
    for (result of response.results){
        pageElement.append(result.alignment.val());
        $("<option>").text(result.name).val(result.url)
    }
}


//EVENTS
//Populate fields related to class when class is chosen
$("#class-input").on('change', function() {
    var classChoice = $(this).val();
    callDD("classes/" + classChoice, $("#skills-input"), createSkills);
    callDD("classes/" + classChoice, $("#proficiencies-input"), createProficiencies);
    callDD("classes/" + classChoice, $("#saving-throws-input"), createSavingThrows); 
    callDD("classes/" + classChoice, $("subclass-input"), createSubclass);
});

// $("#race-input").on('change', function() {
//     var raceChoice = $(this).val();
//     createRaceSubcategories(raceChoice);
// });
fillField();




//#####################################
//ADD CHAR TO DB
//#####################################


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

//######################################
// Buttons
//######################################

//Asks for custom skill/opens skills modal
$('#add-skill-button').on('click', function(){
    $('#newSkill').modal('toggle');
})

$('#save-skill').on('click', function(event) {
    event.preventDefault();
    if($('#new-skill-input').val() != '') {
      addSkill($('#skills-input'), $('#new-skill-input').val());
      $('#newSkill').modal('toggle');
      $('#new-skill-input').val(''); 
    }  
})

//Adds Saving Throw Modifier indication
$('#add-saving-throw-button').on('click', function() {
    $('#newSave').modal('toggle');
})

$('#save-save').on('click', function(event) {
    event.preventDefault();
    var save = $('#new-save-input').val();
    if(save != '') {
      var savingThrowsDiv = $("<div>");
      var savingThrowsInputType = $("<input type=\"text\" class=\"form-control\">").val(save);
      var newSavingThrow = savingThrowsDiv.append(savingThrowsInputType);
      $('#saving-throws-input').append(newSavingThrow);
      $('#newSave').modal('toggle');
      $('#new-save-input').val(''); 
    }  
})
