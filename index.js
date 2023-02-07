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
        <div class="column edit-container">
            <textarea class="textarea" disabled>${input}</textarea>
            <div class="column edit-buttons">
                <button class="button save-btn"><i class="fa-solid fa-floppy-disk"></i></button>
                <button class="button" cancel-btn><i class="fa-solid fa-ban"></i></i></button>
            </div>
        </div>
        <div class="column ">
            <button class="button delete-btn"><i class="fa-solid fa-trash"></i></button>
            <button class="button edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>            
        </div>
    </div>
    `;
    deleteTodo();
    editTodo();
    saveEdits();

    
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

function editTodo() {

    let allEditBtns = document.querySelectorAll(".edit-btn");
    console.log(allEditBtns);

    let allEditInputs = document.querySelectorAll(".edit-container textarea");
    console.log(allEditInputs);

    let allEditControllers = document.querySelectorAll(".edit-buttons");
    console.log(allEditControllers);

    allEditBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => {

            allEditInputs[index].disabled = false;
            console.log(allEditInputs[index].value);

            allEditControllers[index].style.display = "block";

        })
    })

}

function saveEdits() {
    let allSaveBtns  = document.querySelectorAll(".save-btn");

    let allEditInputs = document.querySelectorAll(".edit-container textarea");

    let allEditControllers = document.querySelectorAll(".edit-buttons");

    allSaveBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            // console.log(allEditInputs[index].value);

            todoArray.splice(index, 1, allEditInputs[index].value);

            localStorage.setItem("todos", JSON.stringify(todoArray));

            allEditInputs[index].disabled = true;
            allEditControllers[index].style.display = "none";
            
        });
        
        
    });
    
};



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

console.log(todoArray);