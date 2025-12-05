let compteur = 0;

function redirect(){
    window.location.href = "../../Snake/index.html";
}

function carte(num){
    var img1 = document.getElementById('foregroundImage'+num);
    var img = document.getElementById('toFindImage'+num);
    var lab = document.getElementById("cards")
    img1.style.visibility = 'hidden';
    img.style.visibility = 'hidden';
    compteur += 1;
    if(num == 5){redirect()}
    if(compteur == 4){lab.style.visibility = 'visible';}
};

