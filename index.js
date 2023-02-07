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

// Renderar alla ev. Local Storage todos
todoArray.forEach(makeTodo);

function makeTodo(input) {
    toDoList.innerHTML += `
    <div class="columns todo-item">
        <div class="column">
            <input type="checkbox" name="to-do" />
        </div>
        <div class="column">
            <textarea class="textarea" disabled>${input}</textarea>
        </div>
        <div class="column">
            <button class="button delete-btn"><i class="fa-solid fa-trash"></i></button>
            <button class="button"><i class="fa-solid fa-pen-to-square"></i></button>            
        </div>
    </div>
    `;
    deleteTodo()
    
};

function deleteTodo() {
    let allDeleteBtns = document.querySelectorAll(".delete-btn");

    allDeleteBtns.forEach((btn, index) => {

        btn.addEventListener("click", () => {
            todoArray.splice(index, 1);

            localStorage.setItem("todos", JSON.stringify(todoArray));

            location.reload();
        })
    })
}

function storeTodo(input) {
    // Pusha in nya input-värdet i todoArr
    todoArray.push(input);
    // Lagrar todoArr i Local Storage --> sträng-format
    localStorage.setItem("todos", JSON.stringify(todoArray));

    console.log(todoArray);

    //Skickar todo-input till
    makeTodo(input);

};

function displayDate () {
    let date = new Date();
    // console.log(date);

    date = date.toString().split(" ");
    // console.log(date);

    dateSpan.innerHTML = date[1] + " " + date[2] + " " + date [3];
    // console.log(dateSpan);

}

window.onload = displayDate();



addToDoButton.addEventListener("click", () => {

    storeTodo(inputField.value)

    // Tömmer input-fält
    inputField.value = "";

})

clearBtn.addEventListener("click", () => {
    toDoList.innerHTML = "";
    localStorage.removeItem("todos");
    todoArray = [];
})

