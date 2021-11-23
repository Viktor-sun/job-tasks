const form = document.querySelector(".form");
const list = document.querySelector(".list");
const itemLeft = document.querySelector(".itemLeft");

form.addEventListener("submit", handleOnForm);

const todos = [];
let id = 0;

(() => {
  const oldTodos = JSON.parse(localStorage.getItem("todos"));
  if (!oldTodos) return;

  oldTodos.forEach((todo) => todos.push(todo));
  const arrElements = todos.map(({ id, todo }) => getLiElement(id, todo));

  list.append(...arrElements);
  changeItemLeft();
})();

function handleOnForm(e) {
  e.preventDefault();

  const todo = e.target.input.value;
  id += 1;
  todos.push({ id, todo });
  localStorage.setItem("todos", JSON.stringify(todos));

  const li = getLiElement(id, todo);
  list.append(li);

  changeItemLeft();

  e.currentTarget.reset();
}

function handleOnClick(e) {
  const liIndex = e.target.dataset.index;

  const idx = todos.findIndex((todo) => todo.id === Number(liIndex));
  todos.splice(idx, 1);
  localStorage.setItem("todos", JSON.stringify(todos));

  const li = document.querySelector(`li[data-index="${liIndex}"]`);
  list.removeChild(li);

  changeItemLeft();
}

function getLiElement(id, todo) {
  const li = document.createElement("li");
  li.classList.add("item");
  li.textContent = todo;
  li.dataset.index = id;
  const button = document.createElement("button");
  button.textContent = "del";
  button.dataset.index = id;
  button.addEventListener("click", handleOnClick);

  li.appendChild(button);

  return li;
}

function changeItemLeft() {
  const allLiElements = document.querySelectorAll("li[data-index]");
  itemLeft.textContent = `item left: ${allLiElements.length}`;
}
