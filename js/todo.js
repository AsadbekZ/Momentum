const toDoform = document.querySelector(".js-toDoForm"),
    toDoinput = toDoform.querySelector("input"),
    todoList = document.querySelector(".js-toDoList"),
    toDoBox = document.querySelector(".toDoBox"),
    toDoBtn = document.querySelector(".toDoBtn");

const TODOS_LS = "toDos";

let toDos = [];

function loadToDo() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            showToDOs(toDo.name);
        });
    }
}

function toDoBoxFunc() {
    if (toDoBox.style.display === "none") {
        toDoBox.style.display = "block";
        toDoBox.style.animation = "boxShow 0.5s linear";
    } else {
        toDoBox.style.animation = "boxHide 0.5s linear";
        setTimeout(() => {
            toDoBox.style.display = "none";
        }, 500);
    }
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function showToDOs(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDo)
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    todoList.appendChild(li);
    const ToDoObject = {
        name: text,
        id: newId
    }
    toDos.push(ToDoObject)
    saveToDos();
}

function submitHandler(event) {
    event.preventDefault();
    const currentVlaue = toDoinput.value;
    showToDOs(currentVlaue);
    toDoinput.value = "";
}


function init() {
    loadToDo();
    toDoform.addEventListener("submit", submitHandler);
    toDoBtn.addEventListener("click", toDoBoxFunc)
}

init();