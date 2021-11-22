const form = document.querySelector(".form");
const list = document.querySelector(".list");
const itemLeft = document.querySelector(".itemLeft");

form.addEventListener("submit", handleOnForm);

const todos = [];
let id = 0;

function handleOnForm(e) {
  e.preventDefault();

  const todo = e.target.input.value;
  id += 1;
  todos.push({ id, todo });

  const li = getLiElement(id, todo);

  list.append(li);

  changeItemLeft();

  e.currentTarget.reset();
}

function handleOnClick(e) {
  const index = e.target.dataset.index;

  const li = document.querySelector(`li[data-index="${index}"]`);

  list.removeChild(li);

  todos.splice(Number(index - 1), 1);
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
  itemLeft.textContent = `item left: ${todos.length}`;
}
