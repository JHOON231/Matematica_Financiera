
let fechaSistema = new Date();

let creditos = [];

let encontrados = [];

function mostrarSeccion(idSeccion){


    document.getElementById("clientes")
        .classList.remove("activa");

    document.getElementById("credito")
        .classList.remove("activa");

    document.getElementById("historial")
        .classList.remove("activa");

    document.getElementById(idSeccion)
        .classList.add("activa");

    if(idSeccion == "historial"){
        pintarCreditos(creditos)
    }

}





function agregarCliente() {

    let cedula = document.getElementById("txtCedula").value;
    let nombre = document.getElementById("txtNombre").value;
    let apellido = document.getElementById("txtApellido").value;
    let ingresos = document.getElementById("ingresos").value;
    let egresos = document.getElementById("egresos").value;

    let tabla = document.getElementById("tablaClientes");

    tabla.innerHTML += `

        <tr>

            <td>${cedula}</td>
            <td>${nombre}</td>
            <td>${apellido}</td>
            <td>${ingresos}</td>
            <td>${egresos}</td>

            <td>
                <button class="button" onclick="actualizar(this)">
                    Actualizar
                </button>
                <button class="button" onclick="eliminarFila(this)">
                    Eliminar
                </button>
                
            </td>

        </tr>
    `;
    limpiarCredito();
    
}

function limpiarCredito(){

    document.getElementById("buscarCedulaCredito").value = "";

    document.getElementById("datosClienteCredito").innerHTML = "";

    document.getElementById("montoCredito").value = "";

    document.getElementById("plazoCredito").value = "";

    document.getElementById("tasaInteres").value = "";

    document.getElementById("capacidad").innerText =
        "Capacidad de pago:";

    document.getElementById("total").innerText =
        "Total a pagar:";

    document.getElementById("cuota").innerText =
        "Primera Cuota:";

    document.getElementById("resultado").innerText =
        "Resultado del crédito:";

    document.getElementById("resultado").className = "";

    document.getElementById("botonesAsignar").innerHTML = "";
}


function limpiar(){
    document.getElementById("txtCedula").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellido").value = "";
    document.getElementById("ingresos").value = "";
    document.getElementById("egresos").value = "";
}

function buscarCliente(){
  let clienteBuscado = document.getElementById("txtCedula").value
  let tabla = document.getElementById("tablaClientes");
  let filas = tabla.children;
  
  for(let i = 0; i < filas.length; i++){

        let cedulaTabla =
            filas[i].children[0].textContent;

  if(clienteBuscado == cedulaTabla){
    alert('Ya existe un cliente con esa cedula');
    return true
    }

  }
  return false

}


function guardarCliente(){

    let existe = buscarCliente();

    if(existe == false){

        agregarCliente();
    }
}

function actualizar(boton) {


    let fila = boton.parentNode.parentNode;

    dato1 = fila.children[0].textContent;
    dato2 = fila.children[1].textContent;
    dato3 = fila.children[2].textContent;
    dato4 = fila.children[3].textContent;
    dato5 = fila.children[4].textContent;




    document.getElementById("txtCedula").value = dato1;
    document.getElementById("txtNombre").value = dato2;
    document.getElementById("txtApellido").value = dato3;
    document.getElementById("ingresos").value = dato4;
    document.getElementById("egresos").value = dato5;

eliminarFila(boton)
}


function eliminarFila(boton) {

    let fila = boton.parentNode.parentNode;

    fila.remove();
}


function buscarClienteCredito(){
  let clienteBuscado = document.getElementById("buscarCedulaCredito").value
  let tabla = document.getElementById("tablaClientes");
  let buscado = document.getElementById("datosClienteCredito");
  let filas = tabla.children;
  
  
  for(let i = 0; i < filas.length; i++){

        let cedulaTabla =
            filas[i].children[0].textContent;

  if(clienteBuscado == cedulaTabla){
    

    dato1 = filas[i].children[0].textContent;
    dato2 = filas[i].children[1].textContent;
    dato3 = filas[i].children[2].textContent;
    dato4 = filas[i].children[3].textContent;
    dato5 = filas[i].children[4].textContent;

    
    buscado.innerHTML = `

        <table>
        <thead>
            <tr>
            <th id="cedulaH">Cédula</th>
            <th id="nombreH">Nombre</th>
            <th id="apellidoH">Apellido</th>
            <th>Ingresos</th>
            <th>Egresos</th>
            </tr>
        </thead>
        <tbody>
        <tr>

            <td>${dato1}</td>
            <td>${dato2}</td>
            <td>${dato3}</td>
            <td id="ingresosCredito">${dato4}</td>
            <td id="egresosCredito">${dato5}</td> 
        </tr>
        </tbody>
        </table>
        `
    document.getElementById("buscarCedulaCredito").value = "";

    return true
    }
  }
  alert("cliente no encontrado")

  return false
  

}


function calcularCredito() {

    let ingresos =
        parseFloat(document.getElementById("ingresosCredito").textContent);

    let egresos =
        parseFloat(document.getElementById("egresosCredito").textContent);

    let monto =
        parseFloat(document.getElementById("montoCredito").value);

    let plazo =
        parseFloat(document.getElementById("plazoCredito").value);

    let tasa =
        parseFloat(document.getElementById("tasaInteres").value);

    let tipo =
        document.getElementById("tipoAmortizacion").value;

    let disponible =
        calcularDisponible(ingresos, egresos);

    let capacidad =
        calcularCapacidadPago(disponible);

    document.getElementById("capacidad").innerText =
        "Capacidad de pago: " + capacidad;

    let interes =
        calcularInteresSimple(monto, tasa, plazo);

    let total =
        calcularTotalPagar(monto, interes);

    document.getElementById("total").innerText =
        "Total a pagar: " + total;

    let primeraCuota;

    if(tipo == "francesa"){

        let tasaMensual =
            (tasa / 100) / 12;

        let meses =
            plazo;

        primeraCuota =
            monto *
            (
                tasaMensual *
                Math.pow(1 + tasaMensual, meses)
            ) /
            (
                Math.pow(1 + tasaMensual, meses) - 1
            );

    }else{

        let meses =
            plazo;

        let amortizacionCapital =
            monto / meses;

        let interesPrimerMes =
            monto *
            ((tasa / 100) / 12);

        primeraCuota =
            amortizacionCapital +
            interesPrimerMes;
    }

    document.getElementById("cuota").innerText =
        "Primera Cuota: " +
        primeraCuota.toFixed(2);
}

function aprobar(){

    let ingresos =
        parseFloat(document.getElementById("ingresosCredito").textContent);

    let egresos =
        parseFloat(document.getElementById("egresosCredito").textContent);

    let monto =
        parseFloat(document.getElementById("montoCredito").value);

    let plazo =
        parseFloat(document.getElementById("plazoCredito").value);

    let tasa =
        parseFloat(document.getElementById("tasaInteres").value);

    let disponible =
        calcularDisponible(ingresos, egresos);

    let capacidad =
        calcularCapacidadPago(disponible);

    let interes =
        calcularInteresSimple(monto, tasa, plazo);

    let total =
        calcularTotalPagar(monto, interes);

    let cuota =
        calcularCuotaMensual(total, plazo);

    let aprobado =
        aprobarCredito(capacidad, cuota);

    if(aprobado){

        resultado.innerText =
            "Resultado del crédito: Crédito Aprobado";

        resultado.className = "aprobado";

        document.getElementById("botonesAsignar").innerHTML =
        `
        <button id="btnAsignarCredito"
                onclick="asignarCredito()">
            Asignar crédito
        </button>
        `;

    }else{

        resultado.innerText =
            "Resultado del crédito: Crédito No Aprobado";

        resultado.className = "rechazado";

        document.getElementById("botonesAsignar").innerHTML = "";
    }
}

function pintarCreditos(arreglo){

    let tabla =
        document.getElementById("tablaCreditos");

    tabla.innerHTML = "";

    for(let i = 0; i < arreglo.length; i++){

        let credito = arreglo[i];

        let cuotasPagadas =
            calcularCuotasVencidas(
                credito.fechaOtorgamiento
            );

        if(cuotasPagadas > credito.plazo){
            cuotasPagadas = credito.plazo;
        }

        let cuotasPendientes =
            credito.plazo - cuotasPagadas;

        tabla.innerHTML += `

    <tr>

        <td>${credito.cedula}</td>
        <td>${credito.nombre}</td>
        <td>${credito.apellido}</td>

        <td>${credito.monto}</td>

        <td>${credito.tasa} %</td>

        <td>${credito.tipoAmortizacion}</td>

        <td>${credito.plazo} meses</td>

        <td>${Number(credito.cuota).toFixed(2)}</td>

        <td>
            ${new Date(
                credito.fechaOtorgamiento
            ).toLocaleDateString()}
        </td>

        <td>${cuotasPagadas}</td>

        <td>${cuotasPendientes}</td>

        <td>
            <button onclick="verTablaAmortizacion(${i})">
                Ver Tabla
            </button>
            
            <button onclick="eliminarCredito(${i})">
                Eliminar
            </button>
        </td>

    </tr>
    `;
    }
}


function buscarCreditos(cedula){

    let encontrados = [];

    for(let i = 0; i < creditos.length; i++){

        if(creditos[i].cedula == cedula){

            encontrados.push(creditos[i]);
        }
    }

    return encontrados;
}

function buscarCreditosCliente(){

    let cedula =
        document.getElementById("buscarCedulaListado").value;

    let encontrados =
        buscarCreditos(cedula);

    pintarCreditos(encontrados);
}


function asignarCredito(){

    let monto =
        parseFloat(document.getElementById("montoCredito").value);

    let tasa =
        parseFloat(document.getElementById("tasaInteres").value);

    let plazo =
        parseFloat(document.getElementById("plazoCredito").value);

    let cuota = parseFloat(
        document.getElementById("cuota")
            .textContent
            .replace("Primera Cuota: ", "")
    );

    cuota = Number(cuota.toFixed(2));

    let tipoAmortizacion =
        document.getElementById("tipoAmortizacion").value;

    let tablaAmortizacion = [];

    // TABLA FRANCESA
    if(tipoAmortizacion == "francesa"){

        let saldo = monto;

        for(let i = 1; i <= plazo; i++){

            let interes =
                saldo * (tasa / 100) / 12;

            let capital =
                cuota - interes;

            saldo =
                saldo - capital;

            if(saldo < 0){
                saldo = 0;
            }

            tablaAmortizacion.push({

                numeroCuota: i,
                capital: capital.toFixed(2),
                interes: interes.toFixed(2),
                saldoPendiente: saldo.toFixed(2)

            });
        }

    }else{

        // TABLA ALEMANA

        let saldo = monto;

        let capitalFijo =
            monto / plazo;

        for(let i = 1; i <= plazo; i++){

            let interes =
                saldo * (tasa / 100) / 12;

            let cuotaAlemana =
                capitalFijo + interes;

            saldo =
                saldo - capitalFijo;

            if(saldo < 0){
                saldo = 0;
            }

            tablaAmortizacion.push({

                numeroCuota: i,
                capital: capitalFijo.toFixed(2),
                interes: interes.toFixed(2),
                saldoPendiente: saldo.toFixed(2)

            });
        }
    }

    let credito = {

        cedula: dato1,
        nombre: dato2,
        apellido: dato3,

        monto:
            parseFloat(document.getElementById("montoCredito").value),

        tasa:
            parseFloat(document.getElementById("tasaInteres").value),

        plazo:
            parseFloat(document.getElementById("plazoCredito").value),

        cuota: cuota,

        fechaOtorgamiento:
            fechaSistema.toISOString(),

        tipoAmortizacion:
            tipoAmortizacion,

        tablaAmortizacion:
            tablaAmortizacion
    };

    creditos.push(credito);

    pintarCreditos(creditos);

    alert("Crédito asignado correctamente");

    limpiarCredito();
}

function eliminarCredito(indice){

    creditos.splice(indice, 1);

    encontrados.splice(indice, 1);

    pintarCreditos(creditos);
}


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

function mostrarFechaSistema(){

    document.getElementById("fechaSistema")
        .innerText =
        "Fecha del sistema: "
        + fechaSistema.toLocaleDateString();
}

function cambiarFechaSistema(){

    let nuevaFecha =
        document.getElementById("nuevaFecha").value;


    if(nuevaFecha == ""){
        alert("Seleccione una fecha");
        return;
    }


    fechaSistema = new Date(nuevaFecha);


    mostrarFechaSistema();


    // Actualiza el historial con la nueva fecha
    pintarCreditos(creditos);


}

mostrarFechaSistema();

function calcularCuotasVencidas(fechaOtorgamiento){

    let inicio =
        new Date(fechaOtorgamiento);

    let diferencia =
        fechaSistema - inicio;

    let dias =
        diferencia / (1000 * 60 * 60 * 24);

    let meses =
        Math.floor(dias / 30.44);

    if(meses < 0){
        meses = 0;
    }

    return meses;
}

function verTablaAmortizacion(indice){

    let credito = creditos[indice];

    let monto = credito.monto;

    let tasaMensual =
        (credito.tasa / 100) / 12;

    let meses =
        credito.plazo;

    let contenido = `

    <h3>
        Tabla ${credito.tipoAmortizacion}
    </h3>

    <table>

        <thead>

            <tr>

                <th>Cuota</th>
                <th>Pago</th>
                <th>Capital</th>
                <th>Interés</th>
                <th>Saldo</th>

            </tr>

        </thead>

        <tbody>
    `;

    if(credito.tipoAmortizacion == "francesa"){

        let cuota =
            monto *
            (
                tasaMensual *
                Math.pow(1 + tasaMensual, meses)
            ) /
            (
                Math.pow(1 + tasaMensual, meses) - 1
            );

        let saldo = monto;

        for(let i = 1; i <= meses; i++){

            let interes =
                saldo * tasaMensual;

            let capital =
                cuota - interes;

            saldo =
                saldo - capital;

            if(saldo < 0){
                saldo = 0;
            }

            let fechaCuota = new Date(credito.fechaOtorgamiento);

            fechaCuota.setMonth(
                fechaCuota.getMonth() + i
            );

            let clase = "";

            if(fechaCuota <= fechaSistema){
                clase = "cuotaPagada";
            }


            contenido += `
            <tr class="${clase}">

                <td>${i}</td>
                <td>${cuota.toFixed(2)}</td>
                <td>${capital.toFixed(2)}</td>
                <td>${interes.toFixed(2)}</td>
                <td>${saldo.toFixed(2)}</td>

            </tr>
            `;
        }

    }else{

        let amortizacion =
            monto / meses;

        let saldo = monto;

        for(let i = 1; i <= meses; i++){

            let interes =
                saldo * tasaMensual;

            let cuota =
                amortizacion + interes;

            saldo =
                saldo - amortizacion;

            if(saldo < 0){
                saldo = 0;
            }

            let fechaCuota = new Date(credito.fechaOtorgamiento);

            fechaCuota.setMonth(
                fechaCuota.getMonth() + i
            );

            let clase = "";

            if(fechaCuota <= fechaSistema){
                clase = "cuotaPagada";
            }


            contenido += `
            <tr class="${clase}">

                <td>${i}</td>
                <td>${cuota.toFixed(2)}</td>
                <td>${amortizacion.toFixed(2)}</td>
                <td>${interes.toFixed(2)}</td>
                <td>${saldo.toFixed(2)}</td>

            </tr>
            `;
        }
    }

    contenido += `
        </tbody>
    </table>
    `;

    document.getElementById(
        "detalleAmortizacion"
    ).innerHTML = contenido;
}