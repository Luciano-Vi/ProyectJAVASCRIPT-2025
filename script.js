const students=[];
document.getElementById("studentform").addEventListener("submit",function(e){
    e.preventDefault()

const name=document.getElementById("name").value.trim();
const lastname=document.getElementById("lastname").value.trim();
const grade=parseFloat(document.getElementById("grade").value);

if(!name || !lastname || isNaN(grade) || grade <1 || grade>7){
    alert("error al ingresar los datos")
    return
}

const student={name,lastname,grade}
      students.push(student)
      console.log(students)
      addStudentToTable(student)
      calcularPromedio()
    
    this.reset();
});
const tablebody=document.querySelector("#studenttable tbody");
function addStudentToTable(student){
    const row=document.createElement("tr");
    row.innerHTML=`
    <td>${student.name}</td>
    <td>${student.lastname}</td>
    <td>${student.grade}</td>
    `,
tablebody.appendChild(row)
}

const promedio= document.getElementById("average")

function calcularPromedio(){
    if(students.length===0){
        promedio.texcontent="Promedio general del Curso : N/A"
    }
    const total=students.reduce((sum,student)=>sum+student.grade,0);
    const prom=total/students.length;
    promedio.texcontent="Promedio general del Curso : "+prom.toFixed(2);
}

