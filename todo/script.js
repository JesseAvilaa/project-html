const form = document.getElementById("form");
const input = document.getElementById("input");
const buttonTodo = document.getElementById("todos");
const buttonClear = document.getElementById("clear");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach((todo) => {
        addTodo(todo);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    addTodo();
});

buttonClear.addEventListener("click", (e) => {
    e.preventDefault();

    clearTodo();
});

function clearTodo() {
    window.location.reload();
    localStorage.removeItem('todos');
}

function updateLS() {
    const todosList = document.querySelectorAll("li");

    const todos = [];

    todosList.forEach((todosList) => {
        todos.push({
            text: todosList.innerText,
            completed: todosList.classList.contains("completed"),
        });
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todosList = document.createElement("li");
        if (todo && todo.completed) {
            todosList.classList.add("completed");
        }

        todosList.innerText = todoText;

        todosList.addEventListener("click", () => {
            todosList.classList.toggle("completed");

            updateLS();
        });

        todosList.addEventListener("textmenu", (e) => {
            e.preventDefault();

            todosList.remove();

            updateLS();
        });

        buttonTodo.appendChild(todosList);

        input.value = "";

        updateLS();
    }
}
