function abrirMenu(){

    document
        .getElementById("sidebar")
        .classList.add("activo");
}

function cerrarMenu(){

    document
        .getElementById("sidebar")
        .classList.remove("activo");
}

function calcularInteresSimple(){

    let capital;
    let tasa;
    let periodos;
    let interes;
    let monto;
    let contenido;
    let cmpTabla;

    capital = parseFloat(document.getElementById("txtCapital").value);
    tasa = parseFloat(document.getElementById("txtTasa").value);
    periodos = parseInt(document.getElementById("txtPeriodos").value);

    tasa = tasa / 100;

    interes = capital * tasa * periodos;
    monto = capital + interes;

    contenido = "<table>";

    contenido += "<tr><th>Concepto</th><th>Valor</th></tr>";

    contenido += "<tr><td>Capital</td><td>" + capital.toFixed(2) + "</td></tr>";
    contenido += "<tr><td>Interés</td><td>" + interes.toFixed(2) + "</td></tr>";
    contenido += "<tr><td>Monto Final</td><td>" + monto.toFixed(2) + "</td></tr>";

    contenido += "</table>";

    cmpTabla = document.getElementById("divTabla");
    cmpTabla.innerHTML = contenido;
}

function calcularInteresCompuesto(){

    let capital;
    let tasa;
    let periodos;
    let monto;
    let interes;
    let contenido;
    let cmpTabla;

    capital = parseFloat(document.getElementById("txtCapital").value);
    tasa = parseFloat(document.getElementById("txtTasa").value);
    periodos = parseInt(document.getElementById("txtPeriodos").value);

    tasa = tasa / 100;

    monto =
        capital *
        Math.pow(1 + tasa, periodos);

    interes = monto - capital;

    contenido = "<table>";

    contenido += "<tr><th>Concepto</th><th>Valor</th></tr>";

    contenido += "<tr><td>Capital</td><td>" + capital.toFixed(2) + "</td></tr>";
    contenido += "<tr><td>Interés Generado</td><td>" + interes.toFixed(2) + "</td></tr>";
    contenido += "<tr><td>Monto Final</td><td>" + monto.toFixed(2) + "</td></tr>";

    contenido += "</table>";

    cmpTabla = document.getElementById("divTabla");
    cmpTabla.innerHTML = contenido;
}

function calcularValorFuturo(){

    let capital;
    let tasa;
    let periodos;
    let valorFuturo;
    let contenido;
    let cmpTabla;
    let cmpMensaje;

    capital = parseFloat(document.getElementById("txtCapital").value);
    tasa = parseFloat(document.getElementById("txtTasa").value);
    periodos = parseInt(document.getElementById("txtPeriodos").value);

    cmpMensaje = document.getElementById("divMensaje");

    if(isNaN(capital)){
        cmpMensaje.innerHTML = "Ingrese el capital";
        return;
    }
    if(capital <= 0){
        cmpMensaje.innerHTML = "El capital debe ser mayor que 0";
        return;
    }
    if(isNaN(tasa)){
        cmpMensaje.innerHTML = "Ingrese la tasa";
        return;
    }
    if(tasa <= 0){
        cmpMensaje.innerHTML = "La tasa debe ser mayor que 0";
        return;
    }
    if(isNaN(periodos)){
        cmpMensaje.innerHTML = "Ingrese el número de períodos";
        return;
    }
    if(periodos <= 0){
        cmpMensaje.innerHTML = "El número de períodos debe ser mayor que 0";
        return;
    }
    cmpMensaje.innerHTML = "";

    tasa = tasa / 100;
    valorFuturo =
        capital *
        Math.pow(1 + tasa, periodos);

    contenido = "<table>";

    contenido += "<tr>";
    contenido += "<th>Concepto</th>";
    contenido += "<th>Valor</th>";
    contenido += "</tr>";

    contenido += "<tr>";
    contenido += "<td>Capital Inicial</td>";
    contenido += "<td>" + capital.toFixed(2) + "</td>";
    contenido += "</tr>";

    contenido += "<tr>";
    contenido += "<td>Valor Futuro</td>";
    contenido += "<td>" + valorFuturo.toFixed(2) + "</td>";
    contenido += "</tr>";

    contenido += "</table>";

    cmpTabla = document.getElementById("divTabla");
    cmpTabla.innerHTML = contenido;
}

function calcularValorPresente(){

    let valorFuturo;
    let tasa;
    let periodos;
    let valorPresente;
    let contenido;
    let cmpTabla;
    let cmpMensaje;

    valorFuturo = parseFloat(document.getElementById("txtFuturo").value);
    tasa = parseFloat(document.getElementById("txtTasa").value);
    periodos = parseInt(document.getElementById("txtPeriodos").value);

    cmpMensaje = document.getElementById("divMensaje");
    if(isNaN(valorFuturo)){
        cmpMensaje.innerHTML = "Ingrese el valor futuro";
        return;
    }
    if(valorFuturo <= 0){
        cmpMensaje.innerHTML = "El valor futuro debe ser mayor que 0";
        return;
    }
    if(isNaN(tasa)){
        cmpMensaje.innerHTML = "Ingrese la tasa";
        return;
    }
    if(tasa <= 0){
        cmpMensaje.innerHTML = "La tasa debe ser mayor que 0";
        return;
    }
    if(isNaN(periodos)){
        cmpMensaje.innerHTML = "Ingrese el número de períodos";
        return;
    }
    if(periodos <= 0){
        cmpMensaje.innerHTML = "El número de períodos debe ser mayor que 0";
        return;
    }
    cmpMensaje.innerHTML = "";


    tasa = tasa / 100;
    valorPresente =
        valorFuturo /
        Math.pow(1 + tasa, periodos);

    contenido = "<table>";

    contenido += "<tr><th>Concepto</th><th>Valor</th></tr>";

    contenido += "<tr>";
    contenido += "<td>Valor Futuro</td>";
    contenido += "<td>" + valorFuturo.toFixed(2) + "</td>";
    contenido += "</tr>";

    contenido += "<tr>";
    contenido += "<td>Valor Presente</td>";
    contenido += "<td>" + valorPresente.toFixed(2) + "</td>";
    contenido += "</tr>";

    contenido += "</table>";

    cmpTabla = document.getElementById("divTabla");
    cmpTabla.innerHTML = contenido;
}

function limpiar(){

    document.getElementById("txtCapital").value = "";
    document.getElementById("txtFuturo").value = "";
    document.getElementById("txtTasa").value = "";
    document.getElementById("txtPeriodos").value = "";
    document.getElementById("divMensaje").innerHTML = "";
    document.getElementById("divTabla").innerHTML = "";
}