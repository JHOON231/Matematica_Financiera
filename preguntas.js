function correcta(boton){
    boton.style.background = "green";
    boton.innerHTML += " ✅";
}

function incorrecta(boton,idRespuesta){
    boton.style.background = "red";
    boton.innerHTML += " ❌";
}