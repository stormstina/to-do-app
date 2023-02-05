const addToDoButton = document.getElementById("addToDo");

const clearBtn = document.querySelector("#clearBtn");

const toDoList = document.getElementById("toDoContainer");   

const inputField = document.getElementById("inputField");  

const dateSpan = document.querySelector("#date");


// Om todoArray existerar i local - Hämta datan
// Om todoArray ej existerar i local - Skapa tom array
let todoArray = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [] ;

console.log(localStorage.getItem("todos"));
console.log(JSON.parse(localStorage.getItem("todos")));
console.log(todoArray);

todoArray.forEach(makeTodo);


function makeTodo(text) {

    return toDoList.innerHTML +=  `<li>${text}</li>`;

};

function storeTodo(text) {
    todoArray.push(text);
    localStorage.setItem("todos", JSON.stringify(todoArray));
};

function displayDate () {
    let date = new Date();
    console.log(date);

    date = date.toString().split(" ");
    console.log(date);

    dateSpan.innerHTML = date[1] + " " + date[2] + " " + date [3];
    console.log(dateSpan);

}

window.onload = displayDate();

addToDoButton.addEventListener("click", () => {

    makeTodo(inputField.value)
    storeTodo(inputField.value)

    inputField.value = "";

})

clearBtn.addEventListener("click", () => {
    toDoList.innerHTML = "";
    localStorage.clear();
})

