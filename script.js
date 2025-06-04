const estudiantes = [];

const formularioEstudiantes = document.getElementById("formularioEstudiantes");
const promedio = document.getElementById("promedioCurso");


const tabla = document.querySelector("#tablaDeEstudiantes tbody");

const nombreEstSelec = document.getElementById("nombreEst");
const apellidoEstSelec = document.getElementById("apellidoEst");
const notaEstSelec = document.getElementById("notaEst");

const formularioEditarEst = document.getElementById(
  "formularioEditarEstudiante"
);

const botonGuardarModal = document.getElementById("guardarCambios");
const botonCancelarModal = document.getElementById("  ");

let estudianteSeleccionado = "";
let rowSeleccionada = "";

function errorNombreOApellido(sel, campo) {
  const valor = sel.value.trim();
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;

  if (valor === "") {
    sel.setCustomValidity(`Por favor, complete el campo '${campo}'`);
  } else if (!regex.test(valor)) {
    sel.setCustomValidity(`Por favor, ingrese solo letras.`);
  } else {
    sel.setCustomValidity("");
  }
  return sel.reportValidity(); 
}

function errorNota(num) {
  const nota = parseFloat(num.value);


  if (num.validity.valueMissing) {
    num.setCustomValidity("Por favor, ingrese una nota.");
  } else if (isNaN(nota)) {
    num.setCustomValidity("Por favor, ingrese solo números.");
 
  } else if (nota < 1 || nota > 7) {
    num.setCustomValidity("Por favor, ingrese una nota entre 1 y 7.");
  } else if (!Number.isInteger(nota * 10)) {
    num.setCustomValidity("Por favor, ingrese notas con máximo un decimal.");
  } else {

    num.setCustomValidity("");
  }
  return num.reportValidity();
}

function validarInputs(selNombre, selApellido, selNota) {
  [selNombre, selApellido, selNota].forEach((input) => {
    input.addEventListener("input", () => {
      input.setCustomValidity("");
    });
  });

  errorNota(selNota);
  errorNombreOApellido(selApellido, "Apellido");
  errorNombreOApellido(selNombre, "Nombre");

  return (
    !selNombre.checkValidity() ||
    !selApellido.checkValidity() ||
    !selNota.checkValidity()
  );
}

function crearBoton(tipo, accion) {
  const boton = document.createElement("button");

  boton.className = `btn btn-${tipo} ${accion} accion p-1 px-sm-2 px-md-3 fs-6 m-1 my-sm-0 mx-sm-1`;
  boton.textContent = accion;

  if (accion === "Editar") {
    boton.setAttribute("data-bs-toggle", "modal");
    boton.setAttribute("data-bs-target", "#Editar");
  }
  return boton;
}

const valorInicial = 0;
function calcular() {
  if (estudiantes.length === 0) {
    promedio.textContent = "Promedio de Calificaciones: No Disponible";
  } else {
    const totalDeNotas = estudiantes.reduce((acc, estudiante) => {
      return acc + estudiante.nota;
    }, valorInicial);
    const promedioGeneral = totalDeNotas / estudiantes.length;
    promedio.textContent = `Promedio General del Curso: ${promedioGeneral.toFixed(
      2
    )}`;
}};

formularioEstudiantes.addEventListener("submit", (e) => {
  e.preventDefault();
  const selNombre = document.getElementById("nombre");
  const selApellido = document.getElementById("apellido");
  const selNota = document.getElementById("nota");

  const nombre = selNombre.value.trim();
  const apellido = selApellido.value.trim();
  const nota = parseFloat(selNota.value);

  if (validarInputs(selNombre, selApellido, selNota)) {
    return;
  }

  const estudiante = { nombre, apellido, nota };
  estudiantes.push(estudiante);
  agregarEstudiante(estudiante);
  calcular();
  e.target.reset(); 
});

function agregarEstudiante(est) {
  const row = document.createElement("tr");
  [
    est.nombre,
    est.apellido,
    est.nota.toFixed(1),
  ].forEach((valor, i) => {
    const celdaValor = document.createElement("td");
    celdaValor.textContent = valor;
    row.appendChild(celdaValor);
  });
  const rowBotones = document.createElement("td");
  const botonEditar = crearBoton("success", "Editar");
  const botonBorrar = crearBoton("danger", "Borrar");
  botonEditar.addEventListener("click", () => {
    editarEstudiante(est, row);
  });
  botonBorrar.addEventListener("click", () => {
    borrarEstudiante(est, row);
  });
  rowBotones.appendChild(botonEditar);
  rowBotones.appendChild(botonBorrar);
  row.appendChild(rowBotones);
  tabla.appendChild(row);
}

function borrarEstudiante(est, row) {
  const index = estudiantes.indexOf(est);
  if (index >= 0) {
    estudiantes.splice(index, 1);
    row.remove();
    calcular();
  }
}
function editarEstudiante(est, row) {
  estudianteSeleccionado = est;
  rowSeleccionada = row;
  nombreEstSelec.value = est.nombre;
  apellidoEstSelec.value = est.apellido;
  notaEstSelec.value = est.nota;
}

botonCancelarModal.addEventListener("click", () => {
  nombreEstSelec.value = "";
  apellidoEstSelec.value = "";
  notaEstSelec.value = "";
  estudianteSeleccionado = "";
  rowSeleccionada = "";
});

botonGuardarModal.addEventListener("click", () => {
  if (validarInputs(nombreEstSelec, apellidoEstSelec, notaEstSelec)) return;
  estudianteSeleccionado.nombre = nombreEstSelec.value.trim();
  estudianteSeleccionado.apellido = apellidoEstSelec.value.trim();
  estudianteSeleccionado.nota = parseFloat(notaEstSelec.value);
  const celdasRow = rowSeleccionada.children;
  celdasRow[0].textContent = estudianteSeleccionado.nombre;
  celdasRow[1].textContent = estudianteSeleccionado.apellido;
  celdasRow[2].textContent = estudianteSeleccionado.nota.toFixed(1);
  calcular();
  botonCancelarModal.click();
});