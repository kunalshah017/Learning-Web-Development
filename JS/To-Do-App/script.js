const taskInput = document.getElementById("TaskInput");
const taskList = document.getElementById("task-list");
const load = document.querySelector(".loading-circle");

const themeChange = document.getElementById("theme-change");
let font = document.getElementById("font-change");

var isEditing = false;
var isDeleting = false;

window.onload = function () {
  taskInput.focus();
  setTimeout(() => {
    load.style.animation = "none";
  }, 1000);
};

const addTask = () => {
  if (taskInput.value.trim() === "") {
    taskInput.value = "";
    return;
  }

  const task = taskInput.value;
  if (task) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    <div class="task-text">
    <p>${task}</p>
    <div class="edit-icon">
    <img src="assets/edit-icon.svg" onclick="editTask(event)"/>
    </div>
    </div>
    <div class="task-buttons">
        <button class="complete" onclick="completeTask(event)">
            <img src="assets/check-icon.svg" />
        </button>
        <button class="delete" onclick="deleteTask(event)">
            <img src="assets/delete-icon.svg" />
        </button>
    </div>`;
    listItem.classList.add("task");
    taskList.appendChild(listItem);
    taskInput.value = "";
  }
  rearrangeTasks();
  saveData();
  saveUndoData();
};

taskInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

const completeTask = (e) => {
  const task = e.target.closest("li");
  if (task.classList.contains("task-checked")) {
    task.classList.remove("task-checked");
  } else {
    task.classList.add("task-checked");
  }
  rearrangeTasks();
  saveData();
};

const deleteTask = (e) => {
  saveUndoData();
  showUndo();
  const task = e.target.closest("li");
  task.style.animation = "fadeout 1s ease-in-out forwards";
  setTimeout(() => {
    task.remove();
    saveData();
  }, 1000);
};

function saveData() {
  localStorage.setItem("taskList", taskList.innerHTML);
}

function saveUndoData() {
  if (isDeleting) {
    return;
  }
  sessionStorage.setItem("undoTask", taskList.innerHTML);
}

function loadData() {
  taskList.innerHTML = localStorage.getItem("taskList");
}

function loadUndoData() {
  taskList.innerHTML = sessionStorage.getItem("undoTask");
}

loadData();

function changeTheme() {
  load.style.animation = "shrinkCircle 1s ease-in-out forwards";

  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    themeChange.innerHTML = `<img src="assets/sun-icon.svg" />`;
    localStorage.setItem("theme", "dark");
  } else {
    themeChange.innerHTML = `<img src="assets/moon-icon.svg" />`;
    localStorage.setItem("theme", "light");
  }

  // after the animation is done, remove the animation class
  setTimeout(() => {
    load.style.animation = "none";
  }, 1500);
}

function loadTheme() {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeChange.innerHTML = `<img src="assets/sun-icon.svg" />`;
  }
}

loadTheme();

function changeFont() {
  const fontSelect = document.getElementById("font-change");

  console.log(font.value);
  fontSelect.style.fontFamily = font.value;
  taskInput.style.fontFamily = font.value;
  document.body.style.fontFamily = font.value;
  localStorage.setItem("font", font.value);
}

function loadFont() {
  if (localStorage.getItem("font")) {
    font.value = localStorage.getItem("font");
    changeFont();
  }
}

loadFont();

function clearAll() {
  saveUndoData();
  showUndo();
  taskList.innerHTML = "";
  saveData();
}

function rearrangeTasks() {
  const completedTasks = document.querySelectorAll(".task-checked");
  completedTasks.forEach((task) => {
    taskList.appendChild(task);
  });
}

function undoAction() {
  loadUndoData();
  saveData();
  saveUndoData();
}

function showUndo() {
  if (
    sessionStorage.getItem("undoTask") === null ||
    sessionStorage.getItem("undoTask") === "" ||
    isDeleting ||
    taskList.innerHTML === ""
  ) {
    return;
  }
  const undoDialog = document.querySelector(".undo-container");
  const undoTimeOut = document.getElementById("undo-timeout");
  const undoButton = document.getElementById("undo-button");

  let secondsLeft = 5;

  undoDialog.style.display = "flex";
  undoDialog.style.animation = "slide-in 0.5s ease-out forwards";
  undoTimeOut.textContent = secondsLeft + "sec";
  isDeleting = true;

  const timerInterval = setInterval(() => {
    secondsLeft--;
    undoTimeOut.textContent = secondsLeft + "sec";
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      undoDialog.style.animation = "slide-out 0.5s ease-in forwards";
      isDeleting = false;
    }
  }, 1000);

  undoButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    undoAction();
    undoDialog.style.animation = "slide-out 0.5s ease-in forwards";
    isDeleting = false;
  });
}

function editTask(e) {
  const task = e.target.closest("li");
  const taskText = task.querySelector(".task-text p");
  const taskButtons = task.querySelector(".task-buttons");
  const taskEdit = task.querySelector(".task-text img");

  if (isEditing) {
    isEditing = false;
    taskText.contentEditable = false;
    taskText.style.width = "";
    taskEdit.src = "assets/edit-icon.svg";
    taskButtons.style.display = "flex";
    saveData();
  } else {
    isEditing = true;
    taskText.contentEditable = true;
    taskText.style.width = "80%";
    taskText.focus();
    taskEdit.src = "assets/check-icon.svg";
    taskButtons.style.display = "none";

    var TempTaskText = taskText.textContent;
    console.log("Temp Task: ", TempTaskText);

    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(taskText);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);

    taskText.addEventListener("blur", () => {
      isEditing = false;
      taskText.contentEditable = false;
      taskText.style.width = "";
      taskEdit.src = "assets/edit-icon.svg";
      taskButtons.style.display = "flex";
      if (taskText.textContent.trim() === "") {
        taskText.innerHTML = TempTaskText;
      }
      saveData();
    });

    addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        isEditing = false;
        taskText.contentEditable = false;
        taskText.style.width = "";
        taskEdit.src = "assets/edit-icon.svg";
        taskButtons.style.display = "flex";
        if (taskText.textContent.trim() === "") {
          taskText.innerHTML = TempTaskText;
        }
        saveData();
      }
    });
  }
}
