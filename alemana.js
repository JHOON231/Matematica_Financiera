function calcularAlemana(){
    let capital;
    let tasa;
    let periodos;
    let amortizacion;
    let interes;
    let cuota;
    let saldo;
    let contenidoTabla;
    let cmpTabla;

    capital = parseFloat(document.getElementById("txtCapital").value);
    tasa = parseFloat(document.getElementById("txtTasa").value);
    periodos = parseInt(document.getElementById("txtPeriodos").value);

    // Convierte la tasa a decimal
    tasa = tasa / 100;

    // Calcula la amortización fija
    amortizacion = capital / periodos;

    // El saldo inicial es el capital prestado
    saldo = capital;
    contenidoTabla = "<table>";
    contenidoTabla += "<tr>";
    contenidoTabla += "<th>Periodo</th>";
    contenidoTabla += "<th>Cuota</th>";
    contenidoTabla += "<th>Interés</th>";
    contenidoTabla += "<th>Capital</th>";
    contenidoTabla += "<th>Saldo</th>";
    contenidoTabla += "</tr>";

    for(let i = 1; i <= periodos; i++){

        // Calcula el interés del periodo actual
        interes = saldo * tasa;

        // Calcula la cuota
        cuota = amortizacion + interes;

        // Actualiza el saldo
        saldo = saldo - amortizacion;

        if(saldo <= 0){
            saldo = 0;
        }

        contenidoTabla += "<tr>";
        contenidoTabla += "<td>" + i + "</td>";
        contenidoTabla += "<td>" +
            cuota.toFixed(2) +
            "</td>";
        contenidoTabla += "<td>" +
            interes.toFixed(2) +
            "</td>";
        contenidoTabla += "<td>" +
            amortizacion.toFixed(2) +
            "</td>";
        contenidoTabla += "<td>" +
            saldo.toFixed(2) +
            "</td>";
        contenidoTabla += "</tr>";
    }

    contenidoTabla += "</table>";
    cmpTabla = document.getElementById("divTabla");
    cmpTabla.innerHTML = contenidoTabla;
}