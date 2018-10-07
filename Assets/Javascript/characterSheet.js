// FUNCTIONS
// Retrieve JSON content from the D&D API
function callDD(charDataField, pageElement, formFunction) {
    var queryURL = "http://www.dnd5eapi.co/api/" + charDataField;

    $.ajax({
        url: queryURL.toLowerCase(),
        method: "GET"
    }).then(function (response) {
        formFunction(pageElement, response);
    });
}

// generates subclass based on class
function createSubclass(response) {
    response.subclasses.forEach(function (result) {
        var subclassValue = $("#subclass-input").val(result.name);
        $("#subclass-input").append(subclassValue);
    });
}

// add skill generic function
function addSkill(ele, name) {
    var skillDiv = $("<div>").attr("class", "input-group input-group-prepend input-group-text");
    var skillRadio = $("<input>").attr("type", "checkbox").val(name);
    var skillText = $("<span>").text(name);
    var newSkill = skillDiv.append(skillRadio, skillText);
    ele.append(newSkill);
}

// generates skills based on class
function createSkills(response) {
    $("#skills-input").empty();
    for (var result of response.proficiency_choices[0].from) {
        addSkill($("#skills-input"), result.name.replace("Skill:", "").trim());
    }
}

// generates proficiencies based on class
function createProficiencies(response) {
    var newProficiency = "";
    response.proficiencies.forEach(function (result) {
        newProficiency += result.name + ", ";
    });
    $("#proficiencies-input").text(newProficiency.slice(0, -2));
}

function fillSavingThrows(name) {
    var savingThrowsDiv = $("<div class=\"saving-throws-class\">").val(name).text(name);
    $("#saving-throws-input").append(savingThrowsDiv);
}

// generates saving throws based on class
function createSavingThrows(response) {
    $("#saving-throws-input").empty();
    response.saving_throws.forEach(function (result) {
        fillSavingThrows(result.name);
    });
}

// Fills class dropdown from API(removes monk class because it behaves differently than the other classes)
function createClassDropdown(pageElement, response) {
    var classArray = response.results;
    var noMonk = classArray.filter(function (el) { return el.name !== "Monk"; });
    for (var result of noMonk) {
        pageElement.append($("<option>").val(result.name).text(result.name));
    }

    // Updates character class dependant UI elements
    $("#class-input").on("change", function () {
        var classChoice = $(this).val();

        callDD(
            "classes/" + encodeURIComponent(classChoice),
            null,
            function (_, apiResponse) {
                createSkills(apiResponse);
                createProficiencies(apiResponse);
                createSavingThrows(apiResponse);
                createSubclass(apiResponse);
            }
        );
    });
}

// Fills race dropdown from API
function createRaceDropdown(pageElement, response) {
    for (var result of response.results) {
        pageElement.append($("<option>").val(result.url).data("name", result.name).text(result.name));
    }
}

function fillFields() {
    callDD("classes", $("#class-input"), createClassDropdown);
    callDD("races", $("#race-input"), createRaceDropdown);
}

// generates traits based on race
function createTraits(pageElement, response) {
    var newTrait = "";
    response.traits.forEach(function (result) {
        newTrait += result.name + ", ";
    });
    pageElement.text(newTrait.slice(0, -2));
}

// EVENTS
$("#race-input").on("change", function () {
    var raceURL = $(this).val();

    $.ajax({
        url: raceURL,
        method: "GET"
    }).then(function (response) {
        $("#alignment-input").text(response.alignment);
        createTraits($("#traits-input"), response);
    });
});

fillFields();


// #####################################
// ADD CHAR TO DB
// #####################################


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
var type = "";
var charName = "";
var playName = "";
var charClass = "";
var level = 0;
var race = "";
var subclass = "";
var ep = 0;
var health = 0;
var speed = 0;
var armorClass = 0;
var background = "";
var alignment = "";
var strength = "";
var dexterity = "";
var constitution = "";
var intelligence = "";
var wisdom = "";
var charisma = "";
var skills = [];
var savingThrows = [];
var traits = "";
var proficiencies = "";
var ideals = "";
var bonds = "";
var flaws = "";


$("#submit-char-sheet").on("click", function (event) {
    event.preventDefault();
    type = $("#player-type-input").val();
    charName = $("#char-name-input").val().trim();
    playName = $("#player-name-input").val().trim();
    charClass = $("#class-input").val().trim();
    level = $("#level-input").val().trim();
    race = $("#race-input :selected").data("name");
    subclass = $("#subclass-input").val().trim();
    ep = $("#ep-input").val().trim();
    health = $("#health-input").val().trim();
    speed = $("#speed-input").val().trim();
    armorClass = $("#armor-class-input").val().trim();
    background = $("#background-input").val().trim();
    alignment = $("#alignment-input").val().trim();
    strength = $("#strength-input").val().trim();
    dexterity = $("#dexterity-input").val().trim();
    constitution = $("#constitution-input").val().trim();
    intelligence = $("#intelligence-input").val().trim();
    wisdom = $("#wisdom-input").val().trim();
    charisma = $("#charisma-input").val().trim();

    skills = [];
    $("#skills-input :checkbox").each(function () {
        var skillsValue = $(this).val();
        if ($(this).is(":checked")) {
            skills.push(skillsValue);
        }
    });

    savingThrows = [];
    $(".saving-throws-class").each(function () {
        var savingThrowsVal = $(this).val();
        savingThrows.push(savingThrowsVal);
    });

    traits = $("#traits-input").val().trim();
    proficiencies = $("#proficiencies-input").val().trim();
    ideals = $("#ideals-input").val().trim();
    bonds = $("#bonds-input").val().trim();
    flaws = $("#flaws-input").val().trim();


    if (charName.trim() === ""
        || $("#race-input")[0].selectedIndex <= 0
        || $("#player-type-input")[0].selectedIndex <= 0
    ) {
        alert("Player Type, Character Name, and Race are required fields.");
    } else if (type === "Player Character") {
        // Code for the push
        dataRef.ref().child("Characters").child(charName).set({
            charName,
            playName,
            charClass,
            level,
            race,
            subclass,
            ep,
            health,
            speed,
            armorClass,
            background,
            alignment,
            strength,
            dexterity,
            constitution,
            intelligence,
            wisdom,
            charisma,
            skills,
            savingThrows,
            traits,
            proficiencies,
            ideals,
            bonds,
            flaws
        });
        $('#charAdded').modal("toggle");
    } else if (type === "Non-Player Character") {
        // Code for the push
        dataRef.ref().child("NPC").child(charName).set({
            charName,
            playName,
            charClass,
            level,
            race,
            subclass,
            ep,
            health,
            speed,
            armorClass,
            background,
            alignment,
            strength,
            dexterity,
            constitution,
            intelligence,
            wisdom,
            charisma,
            skills,
            savingThrows,
            traits,
            proficiencies,
            ideals,
            bonds,
            flaws
        });
        $('#charAdded').modal("toggle");
    } else if (type === "Enemy") {
        // Code for the push
        dataRef.ref().child("Enemies").child(charName).set({
            charName,
            playName,
            charClass,
            level,
            race,
            subclass,
            ep,
            health,
            speed,
            armorClass,
            background,
            alignment,
            strength,
            dexterity,
            constitution,
            intelligence,
            wisdom,
            charisma,
            skills,
            savingThrows,
            traits,
            proficiencies,
            ideals,
            bonds,
            flaws
        });
        $('#charAdded').modal("toggle");
    }
});

// ######################################
// Buttons
// ######################################

// Asks for custom skill/opens skills modal
$("#add-skill-button").on("click", function () {
    $("#newSkill").modal("toggle");
});

$("#save-skill").on("click", function (event) {
    event.preventDefault();
    if ($("#new-skill-input").val() !== "") {
        addSkill($("#skills-input"), $("#new-skill-input").val());
        $("#newSkill").modal("toggle");
        $("#new-skill-input").val("");
    }
});

// Adds Saving Throw Modifier indication
$("#add-saving-throw-button").on("click", function () {
    $("#newSave").modal("toggle");
});

$("#save-save").on("click", function (event) {
    event.preventDefault();
    var save = $("#new-save-input").val();
    if (save !== "") {
        $("#newSave").modal("toggle");
        fillSavingThrows(save);
    }
});

// Roll Button function
$('#roll-button').on('click', function () {
    // roll 4 6-sided die and record the cumulative total of the highest 3 dice 6 times
    var rolls = [];
    for (var i = 0; i <= 5; i++) {
      var stat = [];
      for (var j = 0; j <= 3; j++) {
        stat.push(Math.floor(6 * Math.random()) + 1);
      }
      var min = Math.min(stat);
      stat.splice(stat.indexOf(min), 1);
      var sum = 0;
      for(var k = 0; k < stat.length; k++) {
        sum += stat[k];
      }
      rolls.push(sum);
    }
    
    $('#rollys').empty();
    var newP = $('<p>').text('Rolled Values: ' + rolls);
    $('#rollys').append(newP);
    
})

$('#newChar').on('click', function() {
    window.location.href = 'characterSheet.html';
})

$('#home').on('click', function() {
    window.location.href = 'index.html';
});