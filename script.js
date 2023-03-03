const agua = document.getElementById("navbar-link-agua");
const alimentos = document.getElementById("navbar-link-alimentos");
const micotoxinas = document.getElementById("navbar-link-micotoxinas");
const navbar = document.getElementById("navbar");
const formulario = document.getElementById("formulario");
const informe = document.getElementById("informe");
const informeNumeracion = document.getElementById("informeNumeracion");
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
btnEnviar.onclick = enviarResultados;

function toggleOptions() {
  formulario.classList.toggle("hidden");
}

function enviarResultados() {
  nroLab = numeroLaboratorio.valueAsNumber;
  nroPropio = numeroPropio.valueAsNumber;
  nomRemitente = nombreRemitente.value;
  dirRemitente = direccionRemitente.value;
  recepcion = fechaRecepcion.value;
  inicio = fechaInicio.value;
  detalle = detalleMuestra.value;
  let recuentos = getRecuentosOption();
  let bacteriasColiformes = getBacteriasColiformesOption();
  let coliformesTermotolerantes = getColiformesTermotolerantesOption();
  let escherichiaColi = getEscherichiaOption();
  let pseudomonaOption = getPseudomonaOption();
  imprimirResultado(
    nroLab,
    nroPropio,
    nomRemitente,
    dirRemitente,
    recepcion,
    inicio,
    detalle
  );
  // console.log(`Recuentos es: ${recuentos}`);
  // console.log(`Bacterias Coliformes es: ${bacteriasColiformes}`);
  // console.log(`Coliformes Termotolerantes es: ${coliformesTermotolerantes}`);
  // console.log(`Escherichia Coli es: ${escherichiaColi}`);
  // console.log(`Pseudomona es: ${pseudomonaOption}`);
}

function imprimirResultado(
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
    <p class="column1">Remite la muestra<p>
    <p class="column2">${nombre}</p>
    <p class="column1">Direccion<p>
    <p class="column2">${direccion}</p>
    <p class="column1">Recepción muestra<p>
    <p class="column2">${recepcion}</p>
    <p class="column1">Fecha de inicio<p>
    <p class="column2">${inicio}</p>
    <p class="column1">Detalle de muestra<p>
    <p class="column2">${detalle}</p>
  `;
  // navbar.classList.toggle("hidden");
  // formulario.classList.toggle("hidden");
  // informe.classList.toggle("hidden");
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
