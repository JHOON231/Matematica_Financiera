let notas = []

Eleagregarmentos = function(){
    notas.push(5);
    notas.push(10);
    console.log(notas.length);
}
  
function calcularPromedio(){
    let sumaNotas = 0;
    let promedio;
    let notaR;

    for(let indice = 0; indice < notas.length; indice++){
        notaR = notas[indice];
        sumaNotas += notaR;
    }

    promedio = sumaNotas / notas.length;

    return promedio;
}

function recuperarArreglo(){
    let notaR;
    for(let indice = 0; indice<notas.length; indice++){
        notaR = notas[indice];
        console.log(notaR);
    }
}

generarTabla = function(){
    let contenidoTabla = "";
    let cmpTabla = document.getElementById("divTabla");
    contenidoTabla += "<table><tr><td>UNO</td></tr>" +
                      "<tr><td>DOS</td></tr>" +
                      "</table>";
    cmpTabla.innerHTML = contenidoTabla;
}

mostrarNotas = function(){
    let cmpTabla = document.getElementById("divTabla");
    let contenidoTabla = "<table border='1'>";
    contenidoTabla += "<tr><th>NOTA</th></tr>";
    let miNota;
    for (let i = 0; i < notas.length; i++){
    miNota = notas[i];
     contenidoTabla += "<tr>";
     contenidoTabla += "<td>" + miNota + "</td>";
    contenidoTabla += "</tr>";
    }
    contenidoTabla += "</table>";
    cmpTabla.innerHTML = contenidoTabla;
}

function probarAgregados(){
   let  notaRecuperada;
   notaRecuperada=recuperarInt("txtNota");
   AgregarNotas(notaRecuperada);
}

AgregarNotas = function(nota){
    notas.push(nota);
    mostrarNotas();
}