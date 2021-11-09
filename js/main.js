class ToDoListTask {
  constructor(toDo) {
    this.toDo = toDo;
    this.done = false;
  }
}
let ul;

let toDo1 = new ToDoListTask("Äta", false);
let toDo2 = new ToDoListTask("sova", false);

toDoArray = [toDo1, toDo2];

window.onload = function () {
  ul = document.getElementById("list-ul");
  createHtml();
};

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
    listParagraph.className = "list-paragraph-class";
    toDoDoneButton.className = "button-style";
    deleteToDoButton.className = "button-style";

    // add ids
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

function taskDone(i) {}

function handleDelete(i) {}
