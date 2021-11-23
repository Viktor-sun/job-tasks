const form = document.querySelector(".form");
const list = document.querySelector(".list");
const itemLeft = document.querySelector(".itemLeft");
const buttonAll = document.getElementById("buttonAll");
const butttonActive = document.getElementById("butttonActive");
const buttonCompleted = document.getElementById("buttonCompleted");
const buttonSelectAll = document.querySelector(".btnSelectAll");

form.addEventListener("submit", handleOnForm);
buttonAll.addEventListener("click", handleOnButtonAll);
butttonActive.addEventListener("click", handleOnButtonActive);
buttonCompleted.addEventListener("click", handleOnButtonCompleted);
buttonSelectAll.addEventListener("click", onSelectAll);

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
  buttonAll.classList.add("active");
  butttonActive.classList.remove("active");
  buttonCompleted.classList.remove("active");

  render();
}

function handleOnButtonActive() {
  buttonAll.classList.remove("active");
  butttonActive.classList.add("active");
  buttonCompleted.classList.remove("active");

  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const todosActive = todos.filter(({ completed }) => !completed);
  render(todosActive);
}

function handleOnButtonCompleted() {
  buttonAll.classList.remove("active");
  butttonActive.classList.remove("active");
  buttonCompleted.classList.add("active");

  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const todosCompleted = todos.filter(({ completed }) => completed);
  render(todosCompleted);
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

function render(filteredTodos) {
  const todos =
    filteredTodos || JSON.parse(localStorage.getItem("todos")) || [];

  list.innerHTML = "";
  const arrElements = todos.map(({ id, todo, completed }) =>
    createLiElement(id, todo, completed)
  );
  list.append(...arrElements);
  changeItemLeft();
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
