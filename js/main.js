window.onload = function () {
  ul = document.getElementById("list-ul");
  createHtml();
  addNewToDo();
  sortAfterImportance();
  sortAlphabetically();
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
    let exclamationFa = document.createElement("i");
    let toDoDoneButton = document.createElement("button");
    let checkFa = document.createElement("i");
    let deleteToDoButton = document.createElement("button");
    let trashCanFa = document.createElement("i");

    // Add classes

    importantButton.className = "button-style";
    toDoDoneButton.className = "button-style";
    deleteToDoButton.className = "button-style";
    exclamationFa.classList.add("fa", "fa-exclamation");
    checkFa.classList.add("fa", "fa-check");
    trashCanFa.classList.add("fa", "fa-trash-o");

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

    //toggle booleans

    if (toDoArray[i].done === true) {
      listParagraph.classList.toggle("to-do-done");
      toDoDoneButton.classList.toggle("to-do-done-button");
    }

    if (toDoArray[i].important === true) {
      importantButton.classList.toggle("important");
    }

    // Add inner Html

    listParagraph.innerHTML = "- " + toDoArray[i].toDo;

    // Print elements to dom

    ul.appendChild(listElement);
    listElement.appendChild(listParagraph);
    listElement.appendChild(importantButton);
    importantButton.appendChild(exclamationFa);
    listElement.appendChild(toDoDoneButton);
    toDoDoneButton.appendChild(checkFa);
    listElement.appendChild(deleteToDoButton);
    deleteToDoButton.appendChild(trashCanFa);
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
    event.preventDefault();
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
  sendToLocalStorage();
  createHtml();
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
  createHtml();
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

//sort Alphabetically

function sortAlphabetically() {
  let sortAlphabeticallyButton = document.getElementById("sort-a-ö");
  sortAlphabeticallyButton.addEventListener("click", () => {
    toDoArray.sort((a, b) => {
      if (a.toDo.toLowerCase() > b.toDo.toLowerCase()) {
        return 1;
      } else {
        return -1;
      }
    });
    sendToLocalStorage();
    createHtml();
  });
}

// Local Storage

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
