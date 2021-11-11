window.onload = function () {
  ul = document.getElementById("list-ul");
  createHtml();
  addNewToDo();
  sortAfterImportance();
};

let ul;

class ToDoListTask {
  constructor(toDo) {
    this.toDo = toDo;
    this.done = false;
    this.important = false;
  }
}

toDoArray = [];

function createHtml() {
  getFromLocalStorage();
  ul.innerHTML = "";

  for (let i = 0; i < toDoArray.length; i++) {
    toDoArray[i];

    // Create html elements
    let listElement = document.createElement("li");
    let listParagraph = document.createElement("p");
    let importantButton = document.createElement("button");
    let toDoDoneButton = document.createElement("button");
    let deleteToDoButton = document.createElement("button");

    // Add classes
    importantButton.className = "button-style";
    toDoDoneButton.className = "button-style";
    deleteToDoButton.className = "button-style";

    // Add ids
    listParagraph.id = "list-paragraph";
    importantButton.id = "important-button";
    toDoDoneButton.id = "task-done-button";
    deleteToDoButton.id = "delete-task-button";

    // Button functions

    importantButton.addEventListener("click", () => {
      toDoImportant(i);
    });

    toDoDoneButton.addEventListener("click", () => {
      taskDone(i);
    });

    deleteToDoButton.addEventListener("click", () => {
      handleDelete(i);
    });

    // Add inner Html
    listParagraph.innerHTML = toDoArray[i].toDo;
    importantButton.innerHTML = "Important";
    toDoDoneButton.innerHTML = "Done";
    deleteToDoButton.innerHTML = "Delete";

    // Print elements to dom
    ul.appendChild(listElement);
    listElement.appendChild(listParagraph);
    listElement.appendChild(importantButton);
    listElement.appendChild(toDoDoneButton);
    listElement.appendChild(deleteToDoButton);
  }
}

// Create new to do
function addNewToDo() {
  let newToDoInput = document.getElementById("add-list-item-input");
  let newToDoButton = document.getElementById("add-list-item-input-button");
  newToDoInput.addEventListener("keyup", function (e) {
    if (e.code === "Enter") {
      newToDoButton.click();
    }
  });

  newToDoButton.addEventListener("click", () => {
    if (document.getElementById("add-list-item-input").value.length == 0) {
    } else {
      let addValue = newToDoInput.value;
      let addToDo = new ToDoListTask(addValue);
      toDoArray.push(addToDo);
      sendToLocalStorage();
      newToDoInput.value = "";
      createHtml();
    }
  });
}

// Toggle to do done
function taskDone(i) {
  toDoArray[i].done = !toDoArray[i].done;
  let listParagraphDone = document.getElementById("list-paragraph");
  listParagraphDone.classList.toggle("to-do-done");
  sendToLocalStorage();
}

// Delete to do
function handleDelete(i) {
  toDoArray.splice(i, 1);
  sendToLocalStorage();
  createHtml();
}

// Important to do with sort
function toDoImportant(i) {
  toDoArray[i].important = !toDoArray[i].important;
  sendToLocalStorage();
}

function sortAfterImportance() {
  let sortButton = document.getElementById("sort-button");
  sortButton.addEventListener("click", () => {
    toDoArray.sort(function (a, b) {
      return b.important - a.important;
    });
    sendToLocalStorage();
    createHtml();
  });
}

// Added local storage
function sendToLocalStorage() {
  let toDoArrayToLocalStorageJson = JSON.stringify(toDoArray);
  window.localStorage.setItem("toDoArray", toDoArrayToLocalStorageJson);
}

function getFromLocalStorage() {
  let toDoArrayFromLocalStorageJson = window.localStorage.getItem("toDoArray");
  if (!toDoArrayFromLocalStorageJson) {
    sendToLocalStorage();
  } else {
    toDoArray = JSON.parse(toDoArrayFromLocalStorageJson);
  }
}
