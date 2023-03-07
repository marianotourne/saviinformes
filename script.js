const agua = document.getElementById("navbar-link-agua");
const alimentos = document.getElementById("navbar-link-alimentos");
const micotoxinas = document.getElementById("navbar-link-micotoxinas");
const navbar = document.getElementById("navbar");
const formulario = document.getElementById("formulario");
const informe = document.getElementById("informe");
const informeNumeracion = document.getElementById("informeNumeracion");
const informeResultados = document.getElementById("informeResultados");
const datosRemitente = document.getElementById("datosRemitente");
const numeroLaboratorio = document.getElementById("numeroLaboratorio");
const numeroPropio = document.getElementById("numeroPropio");
const nombreRemitente = document.getElementById("nombreRemitente");
const btnEnviar = document.getElementById("btnEnviar");
const option11 = document.getElementById("option-1-1");
const fechaImpresionInforme = document.getElementById("fechaImpresionInforme");
const impresionConclusion = document.getElementById("impresionConclusion");
const recuentosOption = Array.apply(
  null,
  document.getElementsByName("recuentosOption")
);

const bacteriasOption = Array.apply(
  null,
  document.getElementsByName("bacteriasOption")
);

const coliformesOption = Array.apply(
  null,
  document.getElementsByName("coliformesOption")
);

const escherichiaOption = Array.apply(
  null,
  document.getElementsByName("escherichiaOption")
);

const pseudomonaOption = Array.apply(
  null,
  document.getElementsByName("pseudomonaOption")
);

const resultadoOption = Array.apply(
  null,
  document.getElementsByName("resultadoOption")
);

agua.onclick = toggleOptions;
btnEnviar.onclick = todos;

function toggleOptions() {
  formulario.classList.toggle("hidden");
}

function enviarEncabezado() {
  nroLab = numeroLaboratorio.valueAsNumber;
  nroPropio = numeroPropio.valueAsNumber;
  nomRemitente = nombreRemitente.value;
  dirRemitente = direccionRemitente.value;
  recepcion = dayjs(fechaRecepcion.value).format("DD/MM/YYYY");
  inicio = dayjs(fechaInicio.value).format("DD/MM/YYYY");
  detalle = detalleMuestra.value;
  imprimirEncabezado(
    nroLab,
    nroPropio,
    nomRemitente,
    dirRemitente,
    recepcion,
    inicio,
    detalle
  );
}

function enviarResultados() {
  let recuentos = getRecuentosOption();
  let bacteriasColiformes = getBacteriasColiformesOption();
  let coliformesTermotolerantes = getColiformesTermotolerantesOption();
  let escherichiaColi = getEscherichiaOption();
  let pseudomona = getPseudomonaOption();

  let leyendaRecuentos = "";
  let subrayarRecuentos = false;
  if (recuentos == "> 500") {
    leyendaRecuentos = "Calidad deficiente";
    subrayarRecuentos = true;
  } else if (recuentos == "< 10") {
    leyendaRecuentos = "Calidad aceptable";
  }

  let leyendaBacteriasColiformes = "Presencia";
  let subrayarBacterias = true;
  if (bacteriasColiformes == "< 1,1") {
    leyendaBacteriasColiformes = "Ausencia / No se detecta";
    subrayarBacterias = false;
  }

  let leyendaColiformesTermotolerantes = "Presencia";
  let subrayarColiformes = true;
  if (coliformesTermotolerantes == "< 1,1") {
    leyendaColiformesTermotolerantes = "Ausencia / No se detecta";
    subrayarColiformes = false;
  }

  let leyendaEscherichiaColi = "Presencia";
  let subrayarEscherichia = true;
  if (escherichiaColi == "Ausencia") {
    leyendaEscherichiaColi = "Ausencia / No se detecta";
    subrayarEscherichia = false;
  }

  let leyendaPseudomona = "Presencia";
  let subrayarPseudomona = true;
  if (pseudomona == "Ausencia") {
    leyendaPseudomona = "Ausencia / No se detecta";
    subrayarPseudomona = false;
  }

  imprimirResultados(
    recuentos,
    bacteriasColiformes,
    coliformesTermotolerantes,
    escherichiaColi,
    pseudomona,
    leyendaRecuentos,
    leyendaBacteriasColiformes,
    leyendaColiformesTermotolerantes,
    leyendaEscherichiaColi,
    leyendaPseudomona
  );
  subrayarDeficientes(
    subrayarRecuentos,
    subrayarBacterias,
    subrayarColiformes,
    subrayarEscherichia,
    subrayarPseudomona
  );
}

function enviarConclusiones() {
  let informe = dayjs(fechaInforme.value).format("DD/MM/YYYY");
  imprimirFechaConclusiones(informe);
  let resultado = getResultadoOption();
  imprimirConclusiones(resultado);
}

function imprimirEncabezado(
  nroLab,
  nroPropio,
  nombre,
  direccion,
  recepcion,
  inicio,
  detalle
) {
  informeNumeracion.innerHTML = `
    <p>Nº ${nroLab}-${nroPropio}</p>
    `;
  datosRemitente.innerHTML = `
    <div>
      <p>Remite la muestra</p>
      <p>${nombre}</p>
    </div>
    <div>
      <p>Dirección</p>
      <p>${direccion}</p>
    </div>
    <div>
      <p>Recepción muestra</p>
      <p>${recepcion}</p>
    </div>
    <div>
      <p>Fecha de inicio</p>
      <p>${inicio}</p>
    </div>
    <div>
      <p>Detalle de muestra</p>
      <p>${detalle}</p>
    </div>
  `;
  navbar.classList.toggle("hidden");
  formulario.classList.toggle("hidden");
  informe.classList.toggle("hidden");
}

function imprimirResultados(
  recuentos,
  bacteriasColiformes,
  coliformesTermotolerantes,
  escherichiaColi,
  pseudomona,
  leyendaRecuentos,
  leyendaBacteriasColiformes,
  leyendaColiformesTermotolerantes,
  leyendaEscherichiaColi,
  leyendaPseudomona
) {
  informeResultados.innerHTML = `
    <div>
      <p id="tituloRecuentos">Recuento de aerobias mesófilas</p>
      <p>${leyendaRecuentos}</p>
      <p>${recuentos} UFC/ml</p>
    </div>
    <div>
      <p id="tituloBacteriasColiformes">NPM Bacterias coliformes</p>
      <p>${leyendaBacteriasColiformes}</p>
      <p>${bacteriasColiformes} NMP/100ml</p>
    </div>
    <div>
      <p id="tituloColiformesTermotolerantes">NPM Coliformes termotolerantes</p>
      <p>${leyendaColiformesTermotolerantes}</p>
      <p>${coliformesTermotolerantes} NMP/100ml</p>
    </div>
    <div>
      <p class="cursiva" id="tituloEscherichia">Escherichia coli</p>
      <p>${leyendaEscherichiaColi}</p>
      <p>${escherichiaColi}/100ml</p>
    </div>
    <div>
      <p class="cursiva" id="tituloPseudomona">Pseudomona aeruginosa</p>
      <p>${leyendaPseudomona}</p>
      <p>${pseudomona}/100ml</p>
    </div>
  `;
}

function subrayarDeficientes(
  recuentos,
  bacterias,
  coliformes,
  escherichia,
  pseudomona
) {
  if (recuentos) {
    document.getElementById("tituloRecuentos").style.textDecoration =
      "underline";
  }
  if (bacterias) {
    document.getElementById("tituloBacteriasColiformes").style.textDecoration =
      "underline";
  }
  if (coliformes) {
    document.getElementById(
      "tituloColiformesTermotolerantes"
    ).style.textDecoration = "underline";
  }
  if (escherichia) {
    document.getElementById("tituloEscherichia").style.textDecoration =
      "underline";
  }
  if (pseudomona) {
    document.getElementById("tituloPseudomona").style.textDecoration =
      "underline";
  }
}

function imprimirFechaConclusiones(fecha) {
  fechaImpresionInforme.innerHTML = `
  <p>Tandil, ${fecha}</p>
  `;
}

function imprimirConclusiones(dato) {
  if (dato == "Deficiente") {
    impresionConclusion.innerHTML = `
      <div class="r1c1 item itemr1">Conclusión</div>
      <div class="r1c2 item itemr1">Resultados parámetros</div>
      <div class="r1c3 item itemr1">Leyendas asociadas</div>
      <div class="r2c1 item">Deficiente</div>
      <div class="r2c2 item">Rec. de aerobias mesófilas > 500 UFC/ml. <br>El resto de los parámetros cumplen con el CAA (art. 982)</div>
      <div class="r2c3 item">Observación: se recomienda higienizar las instalaciones y realizar un nuevo recuento. CAA (art. 982)</div>
    `;
  } else if (dato == "Potable") {
    impresionConclusion.innerHTML = `
      <div class="r1c1 item itemr1">Conclusión</div>
      <div class="r1c2 item itemr1">Resultados parámetros</div>
      <div class="r1c3 item itemr1">Leyendas asociadas</div>
      <div class="r2c1 item">Potable</div>
      <div class="r2c2 item">Cumplen con CAA (art. 982)</div>
      <div class="r2c3 item">Observación: Los parámetros analizados cumplen con los límites especificados en el Código Alimentario Argentino (art. 982)</div>
    `;
  } else if (dato == "No potable") {
    impresionConclusion.innerHTML = `
      <div class="r1c1 item itemr1">Conclusión</div>
      <div class="r1c2 item itemr1">Resultados parámetros</div>
      <div class="r1c3 item itemr1">Leyendas asociadas</div>
      <div class="r2c1 item">No Potable</div>
      <div class="r2c2 item">
        <p>Bacterias Coliformes: < 1,1 NMP en 100 ml</p>
        <div class="cursiva">Escherichia coli: <span>ausencia en 100 ml<span></div>
        <div class="cursiva">Pseudomona aeruginosa: <span>ausencia en 100 ml<span></div>
      </div>
      <div class="r2c3 item">Observación: el/los parámetros subrayados no cumplen con los límites establecidos en el Código Alimentario Argentino (art. 982)</div>
    `;
  }
}

function getRecuentosOption() {
  if (recuentosOption.find((item) => item.checked) === undefined) {
    itemSelected = option11.value;
  } else {
    itemSelected = recuentosOption.find((item) => item.checked).value;
  }
  return itemSelected;
}

function getBacteriasColiformesOption() {
  let itemSelected = bacteriasOption.find((item) => item.checked);
  return itemSelected.value;
}

function getColiformesTermotolerantesOption() {
  let itemSelected = coliformesOption.find((item) => item.checked);
  return itemSelected.value;
}

function getEscherichiaOption() {
  let itemSelected = escherichiaOption.find((item) => item.checked);
  return itemSelected.value;
}

function getPseudomonaOption() {
  let itemSelected = pseudomonaOption.find((item) => item.checked);
  return itemSelected.value;
}

function getResultadoOption() {
  let itemSelected = resultadoOption.find((item) => item.checked);
  return itemSelected.value;
}

function todos() {
  enviarEncabezado();
  enviarResultados();
  enviarConclusiones();
}
