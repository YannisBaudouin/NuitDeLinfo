var keyboardInputs = { 
     "z":false, 
     "q":false,
     "s":false, 
     "d":false, 
};

var player = {
    "x":10,
    "y":-25
}

const playerSpeed = 0.5;
var roadSpeed = 0.25;

var score = 0;
var gameStarted = false;

var scoreTxt = document.getElementById("scoreTxt");
var playerFrame = document.getElementById("joueur");
var menuFrame = document.getElementById("menu");
var scoreMenuTxt = document.getElementById("scoreMenu");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function CreateObject(objectType) {
    let object = document.createElement("div");
    
    object.setAttribute("x", 50);
    object.setAttribute("y", getRandomInt(6)*10);

    object.className = objectType;
    document.getElementById("jeuLivraison").appendChild(object);
}

function CheckIfOverlapping(obj1, obj2) {
    var rect1 = obj1.getBoundingClientRect();
    var rect2 = obj2.getBoundingClientRect();

    var overlap = !(rect1.right < rect2.left || 
                    rect1.left > rect2.right || 
                    rect1.bottom < rect2.top || 
                    rect1.top > rect2.bottom)
    
    return overlap;
}

function StopGame() {
    gameStarted = false;
    score = 0;

    let obstacleArray = document.getElementsByClassName("obstacle");
    for (let index = 0; index < obstacleArray.length; index++) {
        let obstacle = obstacleArray[index];
        obstacle.remove();
    }

    let livraisonArray = document.getElementsByClassName("livraison");
    for (let index = 0; index < livraisonArray.length; index++) {
        let livraison = livraisonArray[index];
        livraison.remove();
    }

    player['y'] = -25;
}

var time = Date.now();
var lastScorePassive = Date.now();
function Update() {
    // Le temps entre chaque frame
    var deltaTime = (Date.now()-time)/10;
    time = Date.now();

    if (gameStarted) {
        if (time-lastScorePassive > 2000) {
            score += 1;  
            lastScorePassive = Date.now();
        }

        roadSpeed = 0.25 + score/1000;
        menuFrame.style.display = 'none';
        scoreTxt.innerHTML = "Score: " + score;
        scoreMenuTxt.innerHTML = "Votre Score: " + score;

        // Met à jour la position des joueurs
        if (keyboardInputs['z']) {player['y']+=playerSpeed*deltaTime;}
        if (keyboardInputs['s']) {player['y']-=playerSpeed*deltaTime;}
        //if (keyboardInputs['d']) {player['x']+=playerSpeed*deltaTime;}
        //if (keyboardInputs['q']) {player['x']-=playerSpeed*deltaTime;}

        // Bloque les joueurs pour pas qu'il dépasse
        if (player['x'] < 0) {player['x']=0;}
        if (player['x'] > 50) {player['x']=50;}
        if (player['y'] < -50) {player['y']=-50;}
        if (player['y'] > 0) {player['y']=0;}

        /////////////////////////
        // Met à jour le visuel
        playerFrame.style.left = player['x']+'%';
        playerFrame.style.top = -player['y']+'%';

        // Mise à jour des obstacles
        let obstacleArray = document.getElementsByClassName("obstacle");
        for (let index = 0; index < obstacleArray.length; index++) {
            let obstacle = obstacleArray[index];
            obstacle.setAttribute("x", obstacle.getAttribute("x")-roadSpeed*deltaTime);

            /////////////////////////
            obstacle.style.left = obstacle.getAttribute("x") + '%';
            obstacle.style.top = obstacle.getAttribute("y") + '%';

            if (obstacle.getAttribute("x") < 0) { obstacle.remove(); }

            if (CheckIfOverlapping(playerFrame, obstacle)) {
                StopGame();
            }
        }

        if (obstacleArray.length < 2+score*0.15 && getRandomInt(50) == 1 ) {
            CreateObject("obstacle");
        }

        // Mise à jour des points de livraison
        // Mise à jour des obstacles
        let livraisonArray = document.getElementsByClassName("livraison");
        for (let index = 0; index < livraisonArray.length; index++) {
            let livraison = livraisonArray[index];
            livraison.setAttribute("x", livraison.getAttribute("x")-roadSpeed*deltaTime);

            /////////////////////////
            livraison.style.left = livraison.getAttribute("x") + '%';
            livraison.style.top = livraison.getAttribute("y") + '%';

            if (livraison.getAttribute("x") < 0) { livraison.remove(); }

            if (CheckIfOverlapping(playerFrame, livraison) && !livraison.getAttribute("used")) {
                score += 1;
                livraison.setAttribute("used", true);
            }
        }

        if (livraisonArray.length < 4 && getRandomInt(500) == 1 ) {
            CreateObject("livraison");
        }
    }
    else {
        menuFrame.style.display = 'block';
        StopGame();
    }
    
    setTimeout(Update, 0);
}

// Joueur appuie sur une touche
document.addEventListener('keydown', (event) => {
    let key = event.key.toLowerCase();
    //console.log(key)
    if (key in keyboardInputs && !keyboardInputs[key]) {
        keyboardInputs[key] = true;
    }
});

// Joueur relache une touche
document.addEventListener('keyup', (event) => {
    let key = event.key.toLowerCase();
    if (key in keyboardInputs && keyboardInputs[key]) {
        keyboardInputs[key] = false;
    }
});

document.getElementById("playBtn").onclick = function() {
    gameStarted = true;
}

Update();