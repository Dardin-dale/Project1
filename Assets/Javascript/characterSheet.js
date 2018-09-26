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