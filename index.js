const addToDoButton = document.getElementById("addToDo");

const clearBtn = document.querySelector("#clearBtn");

const toDoList = document.getElementById("toDoContainer");   

const inputField = document.getElementById("inputField");  

function makeTodo(text) {

    return toDoList.innerHTML +=  `<li>${text}</li>`;

};

addToDoButton.addEventListener("click", () => {

    makeTodo(inputField.value)

})