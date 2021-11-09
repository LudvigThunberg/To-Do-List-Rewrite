window.onload = function () {
  ul = document.getElementById("list-ul");
  createHtml();
  addNewToDo();
};

let ul;

class ToDoListTask {
  constructor(toDo) {
    this.toDo = toDo;
    this.done = false;
  }
}

let toDo1 = new ToDoListTask("Äta", false);
let toDo2 = new ToDoListTask("sova", false);

toDoArray = [toDo1, toDo2];

function createHtml() {
  ul.innerHTML = "";

  for (let i = 0; i < toDoArray.length; i++) {
    toDoArray[i];
    // create html elements
    let listElement = document.createElement("li");
    let listParagraph = document.createElement("p");
    let toDoDoneButton = document.createElement("button");
    let deleteToDoButton = document.createElement("button");

    // add classes
    toDoDoneButton.className = "button-style";
    deleteToDoButton.className = "button-style";

    // add ids
    listParagraph.id = "list-paragraph";
    toDoDoneButton.id = "task-done-button";
    deleteToDoButton.id = "delete-task-button";

    // button functions
    toDoDoneButton.addEventListener("click", () => {
      taskDone(i);
    });

    deleteToDoButton.addEventListener("click", () => {
      handleDelete(i);
    });

    // add inner Html
    listParagraph.innerHTML = toDoArray[i].toDo;
    toDoDoneButton.innerHTML = "Done";
    deleteToDoButton.innerHTML = "Delete";

    // Print elements to dom
    ul.appendChild(listElement);
    listElement.appendChild(listParagraph);
    listElement.appendChild(toDoDoneButton);
    listElement.appendChild(deleteToDoButton);
  }
}

//create new to do
function addNewToDo() {
  let newToDoInput = document.getElementById("add-list-item-input");
  let newToDoButton = document.getElementById("add-list-item-input-button");

  newToDoButton.addEventListener("click", () => {
    let addValue = newToDoInput.value;
    let addToDo = new ToDoListTask(addValue);
    toDoArray.push(addToDo);
    createHtml();
  });
}

// Toggle to do done
function taskDone(i) {
  toDoArray[i].done = !toDoArray[i].done;
  let listParagraphDone = document.getElementById("list-paragraph");
  listParagraphDone.classList.toggle("to-do-done");
  createHtml();
}

//Delete to do
function handleDelete(i) {
  toDoArray.splice(i, 1);
  createHtml();
}
