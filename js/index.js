const form = document.getElementById("form");
const list = document.getElementById("list");
const itemLeft = document.getElementById("itemLeft");

form.addEventListener("submit", handleOnForm);
list.addEventListener("click", handleOnClick);

const todos = [];

function handleOnForm(e) {
  e.preventDefault();

  const todo = e.target.input.value;
  todos.push(todo);
  appendMarkup();

  e.currentTarget.reset();
}

function handleOnClick(e) {
  if (e.target.nodeName !== "BUTTON") return;

  const index = e.target.dataset.index;
  todos.splice(index, 1);
  appendMarkup();
}

function appendMarkup() {
  const markup = todos
    .map(
      (todo, i) =>
        `<li class='item'>${todo} <button id="button" type="button" data-index=${i}>del</button></li>`
    )
    .join("");
  list.innerHTML = markup;

  itemLeft.textContent = `item left: ${todos.length}`;
}
