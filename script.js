const students = [];

const spanAverage = document.getElementById("average-grade");
const tableBody = document.querySelector("#studentsTable tbody")
const form = document.getElementById("studentForm");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = document.getElementById("grade").value.trim();
    const date = document.getElementById("date").value.trim();

    const student = {name, lastName, grade, date};
    students.push(student);
    actualizarDisplayPromedio();

    addStudentToTable(student);
})

function deleteEstudiante(student,row){
    const index=students.indexOf(student);
    if(index > -1){
        students.splice(index,1)
        row.remove();
        calcularPromedio();
    }
};

function calcularPromedio() {
    if (students.length === 1) return spanAverage.textContent = `${students[0].grade}`;
    let average = 0
    
    for (let i = 0; i < students.length; i++) {
        average += Math.floor(students[i].grade * 100) * 0.01;
    }
    average = average / students.length;
    return average.toFixed(1);
}

function actualizarDisplayPromedio() {
    spanAverage.textContent = calcularPromedio();
}

function eliminarEstudiante(student, row) {
    const index = students.indexOf(student, row);
    if(index > -1) {
        students.splice(index, 1);
        row.remove();
        actualizarDisplayPromedio();
    }
}


function addStudentToTable(student) {
    const row = document.createElement("tr");
    row.innerHTML = 
    `
        <td>${student.name}</td>
        <td>${student.lastName}</td>
        <td>${student.grade}</td>
        <td>${student.date}</td>
        <td><button class="Delete">Eliminar</td>
    `;
    
row.querySelector(".Delete").addEventListener("click",function(){
    deleteEstudiante(student,row);
});

    tableBody.appendChild(row);
}