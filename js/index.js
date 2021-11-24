const form = document.querySelector(".form");
const list = document.querySelector(".list");
const itemLeft = document.querySelector(".itemLeft");
const buttonAll = document.getElementById("buttonAll");
const butttonActive = document.getElementById("butttonActive");
const buttonCompleted = document.getElementById("buttonCompleted");
const buttonSelectAll = document.querySelector(".btnSelectAll");
const buttonClear = document.querySelector(".btnClear");

form.addEventListener("submit", handleOnForm);
buttonAll.addEventListener("click", handleOnButtonAll);
butttonActive.addEventListener("click", handleOnButtonActive);
buttonCompleted.addEventListener("click", handleOnButtonCompleted);
buttonSelectAll.addEventListener("click", onSelectAll);
buttonClear.addEventListener("click", onClearCompleted);

render();

function handleOnForm(e) {
  e.preventDefault();

  const todo = e.target.input.value.trim();
  if (todo === "") return;

  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  const id = todos[todos.length - 1]?.id + 1 || 0;
  todos.push({ id, todo: todo, completed: false });
  localStorage.setItem("todos", JSON.stringify(todos));
  render();

  e.currentTarget.reset();
}

function handleOnDel(e) {
  const liIndex = e.target.dataset.index;

  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const filteredTodo = todos.filter((todo) => todo.id !== Number(liIndex));
  localStorage.setItem("todos", JSON.stringify(filteredTodo));
  render();
}

function handleOnCheckbox(e) {
  const checkboxIndex = e.target.dataset.index;

  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.forEach((todo) => {
    if (todo.id === Number(checkboxIndex)) {
      todo.completed = !todo.completed;
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));

  render();
}

function handleOnButtonAll() {
  localStorage.setItem("filtrationState", "all");
  render();
}

function handleOnButtonActive() {
  localStorage.setItem("filtrationState", "active");
  render();
}

function handleOnButtonCompleted() {
  localStorage.setItem("filtrationState", "completed");
  render();
}

function onSelectAll() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const stateButtonSelectAll = localStorage.getItem("stateButtonSelectAll");

  if (stateButtonSelectAll === "yes") {
    todos.map((todo) => {
      todo.completed = false;
    });

    localStorage.setItem("stateButtonSelectAll", "no");
  } else {
    todos.map((todo) => (todo.completed = true));

    localStorage.setItem("stateButtonSelectAll", "yes");
  }

  localStorage.setItem("todos", JSON.stringify(todos));
  render();
}

function onClearCompleted() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const activeTodo = todos.filter((todo) => !todo.completed);
  localStorage.setItem("todos", JSON.stringify(activeTodo));
  render();
}

function render() {
  const todos = getTodos();

  list.innerHTML = "";
  const arrElements = todos.map(({ id, todo, completed }) =>
    createLiElement(id, todo, completed)
  );
  list.append(...arrElements);
  changeItemLeft();

  const hasCompletedTodo = todos.some((todo) => todo.completed);
  if (hasCompletedTodo) {
    buttonClear.classList.remove("isHidden");
  } else {
    buttonClear.classList.add("isHidden");
  }
}

function getTodos() {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  const filtrationState = localStorage.getItem("filtrationState");

  switch (filtrationState) {
    case "all":
      buttonAll.classList.add("activeSortButton");
      butttonActive.classList.remove("activeSortButton");
      buttonCompleted.classList.remove("activeSortButton");
      return todos;

    case "active":
      buttonAll.classList.remove("activeSortButton");
      butttonActive.classList.add("activeSortButton");
      buttonCompleted.classList.remove("activeSortButton");

      const todosActive = todos.filter(({ completed }) => !completed);
      return todosActive;

    case "completed":
      buttonAll.classList.remove("activeSortButton");
      butttonActive.classList.remove("activeSortButton");
      buttonCompleted.classList.add("activeSortButton");

      const todosCompleted = todos.filter(({ completed }) => completed);
      return todosCompleted;

    default:
      buttonAll.classList.add("activeSortButton");
      butttonActive.classList.remove("activeSortButton");
      buttonCompleted.classList.remove("activeSortButton");
      return todos;
  }
}

function createLiElement(id, todo, completed) {
  const li = document.createElement("li");
  li.classList.add("item");
  li.textContent = todo;
  li.dataset.index = id;

  const button = document.createElement("button");
  button.textContent = "del";
  button.dataset.index = id;
  button.addEventListener("click", handleOnDel);

  const checkbox = document.createElement("input");
  checkbox.classList.add("checkbox");
  checkbox.setAttribute("type", "checkbox");
  checkbox.dataset.index = id;
  completed && checkbox.setAttribute("checked", true);
  checkbox.addEventListener("click", handleOnCheckbox);

  li.prepend(checkbox);
  li.appendChild(button);

  return li;
}

function changeItemLeft() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const activeElements = todos.filter(({ completed }) => !completed).length;

  itemLeft.textContent = `item left: ${activeElements}`;
}
