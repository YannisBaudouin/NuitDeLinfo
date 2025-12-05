var friseBtnArray = document.getElementsByClassName("friseBtn");
var sceneArray = document.getElementsByClassName("scene");

var selectedDate = 0;

// Caches toutes les scenes
function HideAllScenes() {
    for (let index = 0; index < sceneArray.length; index++) {
        sceneArray[index].style.display = 'none';
    }
}

// Met à jour la scene
function UpdateScene() {
    HideAllScenes();

    sceneArray[selectedDate].style.display = 'block';
}

// Créer une fonction pour chaques boutons pour sélectionner la scène
for (let index = 0; index < friseBtnArray.length; index++) {
    let friseBtn = friseBtnArray[index];

    friseBtn.onclick = function() {
        selectedDate = index;
        UpdateScene();
    }
}

UpdateScene();