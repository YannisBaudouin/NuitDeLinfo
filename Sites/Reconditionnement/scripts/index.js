var drabObjArray = document.getElementsByClassName("dragObj");
var montageJeu = document.getElementById("montageJeu");
var listeComposants = document.getElementById("listeComposants");

for (let index = 0; index < drabObjArray.length; index++) {
    DragInit(drabObjArray[index]);
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

function GetAbsolutePosition(obj) {
  const rect = obj.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

function DragInit(obj) {
    let conteneur = document.getElementById("conteneur_"+obj.getAttribute("compName"));
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    obj.onmousedown = DragMouseDown;

    function DragMouseDown(e) {
        if (conteneur.getAttribute("valid")) {return;}
        montageJeu.append(obj);
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = StopDrag;
        document.onmousemove = DragUpdate;

        obj.style.top = e.clientY - montageJeu.offsetHeight - obj.offsetHeight/2 + "px";
        obj.style.left = e.clientX - montageJeu.offsetLeft - obj.offsetWidth/2 + "px";
    }

    function DragUpdate(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        obj.style.top = e.clientY - montageJeu.offsetHeight - obj.offsetHeight/2 + "px";
        obj.style.left = e.clientX - montageJeu.offsetLeft - obj.offsetWidth/2 + "px";
    }

    function StopDrag() {
        document.onmouseup = null;
        document.onmousemove = null;
        
        if (CheckIfOverlapping(obj, conteneur)) {
            conteneur.setAttribute("valid", true);
            conteneur.appendChild(obj);
            obj.style.top = null;
            obj.style.left = null;
        }
        else {
            obj.style.top = null;
            obj.style.left = null;
            listeComposants.appendChild(obj);
        }
    }
}