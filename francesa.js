function calcularFrancesa(){
    let capital;
    let tasa;
    let periodos;
    let cuota;
    let interes;
    let amortizacion;
    let saldo;
    let contenidoTabla;
    let cmpTabla;

        // Recupera los valores ingresados por el usuario
    capital = parseFloat(document.getElementById("txtCapital").value);
    tasa = parseFloat(document.getElementById("txtTasa").value);
    periodos = parseInt(document.getElementById("txtPeriodos").value);

    // Convierte la tasa de porcentaje a decimal
    tasa = tasa / 100;

    // Calcula la cuota fija del sistema francés
    cuota =
        capital *
        (
            tasa *
            Math.pow(1 + tasa, periodos)
        )
        /
        (
            Math.pow(1 + tasa, periodos) - 1
        );

    // El saldo inicial es igual al capital prestado
    saldo = capital;

    // Inicia la construcción de la tabla
   contenidoTabla = "<table>";

    // Cabecera de la tabla
    contenidoTabla += "<tr>";
    contenidoTabla += "<th>Periodo</th>";
    contenidoTabla += "<th>Cuota</th>";
    contenidoTabla += "<th>Interés</th>";
    contenidoTabla += "<th>Capital</th>";
    contenidoTabla += "<th>Saldo</th>";
    contenidoTabla += "</tr>";

    // Genera una fila por cada periodo
    for(let i = 1; i <= periodos; i++){

        // Calcula el interés del periodo actual
        interes = saldo * tasa;

        // Calcula la amortización del capital
        amortizacion = cuota - interes;

        // Actualiza el saldo pendiente
        saldo = saldo - amortizacion;

        // Evita saldos negativos por redondeo
        if(saldo < 0){
            saldo = 0;
        }

        // Agrega una nueva fila a la tabla
        contenidoTabla += "<tr>";

        // Muestra el número de periodo
        contenidoTabla += "<td>" + i + "</td>";

        // Muestra la cuota fija
        contenidoTabla += "<td>" +
            cuota.toFixed(2) +
            "</td>";

        // Muestra el interés pagado
        contenidoTabla += "<td>" +
            interes.toFixed(2) +
            "</td>";

        // Muestra el capital amortizado
        contenidoTabla += "<td>" +
            amortizacion.toFixed(2) +
            "</td>";

        // Muestra el saldo pendiente
        contenidoTabla += "<td>" +
            saldo.toFixed(2) +
            "</td>";

        contenidoTabla += "</tr>";
    }

    // Cierra la tabla
    contenidoTabla += "</table>";

    // Obtiene el div donde se mostrará la tabla
    cmpTabla = document.getElementById("divTabla");

    // Inserta la tabla en la página
    cmpTabla.innerHTML = contenidoTabla;
}