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
  recepcion = fechaRecepcion.value;
  inicio = fechaInicio.value;
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
  if (recuentos == ">500") {
    leyendaRecuentos = "Calidad Deficiente";
  } else if (recuentos == "<10") {
    leyendaRecuentos = "Calidad Aceptable";
  }

  let leyendaBacteriasColiformes = "Presencia";
  if (bacteriasColiformes == "<1.1") {
    leyendaBacteriasColiformes = "Ausencia / No se detecta";
  }

  let leyendaColiformesTermotolerantes = "Presencia";
  if (coliformesTermotolerantes == "<1.1") {
    leyendaColiformesTermotolerantes = "Ausencia / No se detecta";
  }

  let leyendaEscherichiaColi = "Presencia";
  if (escherichiaColi == "Ausencia") {
    leyendaEscherichiaColi = "Ausencia / No se detecta";
  }

  let leyendaPseudomona = "Presencia";
  if (pseudomona == "Ausencia") {
    leyendaPseudomona = "Ausencia / No se detecta";
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
      <p>Direccion</p>
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
      <p>Recuento de aerobias mesófilas</p>
      <p>${leyendaRecuentos}</p>
      <p>${recuentos} UFC/ml</p>
    </div>
    <div>
      <p>NPM Bacterias coliformes</p>
      <p>${leyendaBacteriasColiformes}</p>
      <p>${bacteriasColiformes} NMP/100ml</p>
    </div>
    <div>
      <p>NPM Coliformes termotolerantes</p>
      <p>${leyendaColiformesTermotolerantes}</p>
      <p>${coliformesTermotolerantes} NMP/100ml</p>
    </div>
    <div>
      <p class="cursiva">Escherichia Coli</p>
      <p>${leyendaEscherichiaColi}</p>
      <p>${escherichiaColi}/100ml</p>
    </div>
    <div>
      <p class="cursiva">Pseudomona aeruginosa</p>
      <p>${leyendaPseudomona}</p>
      <p>${pseudomona}/100ml</p>
    </div>
  `;
}

function getRecuentosOption() {
  if (recuentosOption.find((item) => item.checked) === undefined) {
    itemSelected = option11.value;
  } else {
    itemSelected = recuentosOption.find((item) => item.checked).value;
  }
  return itemSelected;
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

function todos() {
  enviarEncabezado();
  enviarResultados();
}
