const form = document.querySelector(".form");
const list = document.querySelector(".list");
const itemLeft = document.querySelector(".itemLeft");
const buttonAll = document.getElementById("buttonAll");
const butttonActive = document.getElementById("butttonActive");
const buttonCompleted = document.getElementById("buttonCompleted");
const buttonSelectAll = document.querySelector(".btnSelectAll");
const buttonClear = document.querySelector(".btnClear");
const containerBtnClear = document.querySelector(".containerBtn");

form.addEventListener("submit", handleOnForm);
buttonAll.addEventListener("click", handleOnButtonAll);
butttonActive.addEventListener("click", handleOnButtonActive);
buttonCompleted.addEventListener("click", handleOnButtonCompleted);
buttonSelectAll.addEventListener("click", onSelectAll);

let filtrationState = null;
render();

function handleOnForm(e) {
  e.preventDefault();

  const todo = e.target.input.value;
  if (todo === "" || todo === " ") return;

  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  const id = todos[todos.length - 1]?.id + 1 || 0;
  todos.push({ id, todo: todo.trim(), completed: false });
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
  buttonAll.classList.add("activeSortButton");
  butttonActive.classList.remove("activeSortButton");
  buttonCompleted.classList.remove("activeSortButton");

  filtrationState = "all";
  render();
}

function handleOnButtonActive() {
  buttonAll.classList.remove("activeSortButton");
  butttonActive.classList.add("activeSortButton");
  buttonCompleted.classList.remove("activeSortButton");

  filtrationState = "active";
  render();
}

function handleOnButtonCompleted() {
  buttonAll.classList.remove("activeSortButton");
  butttonActive.classList.remove("activeSortButton");
  buttonCompleted.classList.add("activeSortButton");

  filtrationState = "completed";
  render();
}

let stateButtonSelectAll = false;

function onSelectAll() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  if (stateButtonSelectAll) {
    todos.forEach((todo) => (todo.completed = false));
    stateButtonSelectAll = false;
  } else {
    todos.forEach((todo) => (todo.completed = true));
    stateButtonSelectAll = true;
  }

  localStorage.setItem("todos", JSON.stringify(todos));
  render();
}

function OnClearCompleted() {
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
  const btnClear = createButton();
  if (hasCompletedTodo) {
    const hasBtn = containerBtnClear.querySelector(".btnClear");
    if (hasBtn) return;

    containerBtnClear.insertAdjacentElement("beforeend", btnClear);
  } else {
    containerBtnClear.innerHTML = "";
  }
}

function getTodos() {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  switch (filtrationState) {
    case "all":
      return todos;

    case "active":
      const todosActive = todos.filter(({ completed }) => !completed);
      return todosActive;

    case "completed":
      const todosCompleted = todos.filter(({ completed }) => completed);
      return todosCompleted;
    default:
      return todos;
  }

  // if (filtrationState === "active") {
  //   const todosActive = todos.filter(({ completed }) => !completed);
  //   todos = todosActive;
  // } else if (filtrationState === "completed") {
  //   const todosCompleted = todos.filter(({ completed }) => completed);
  //   todos = todosCompleted;
  // } else {
  //   todos = JSON.parse(localStorage.getItem("todos")) || [];
  // }
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

function createButton() {
  const button = document.createElement("button");
  button.textContent = "Clear completed";
  button.classList.add("btnClear");
  button.addEventListener("click", OnClearCompleted);
  return button;
}

function changeItemLeft() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const activeElements = todos.filter(({ completed }) => !completed).length;

  itemLeft.textContent = `item left: ${activeElements}`;
}
