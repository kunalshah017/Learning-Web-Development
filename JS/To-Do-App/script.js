const taskInput = document.getElementById("TaskInput");
const taskList = document.getElementById("task-list");

const themeChange = document.getElementById("theme-change");
let font = document.getElementById("font-change");

window.onload = function () {
  taskInput.focus();
};

const addTask = () => {
  const task = taskInput.value;
  if (task) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<p>${task}</p>
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
  const task = e.target.closest("li");
  task.remove();
  saveData();
  showUndo();
};

function saveData() {
  localStorage.setItem("taskList", taskList.innerHTML);
}

function saveUndoData() {
  localStorage.setItem("undoTask", taskList.innerHTML);
}

function loadData() {
  taskList.innerHTML = localStorage.getItem("taskList");
}

function loadUndoData() {
  taskList.innerHTML = localStorage.getItem("undoTask");
}

loadData();

function changeTheme() {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    themeChange.innerHTML = `<img src="assets/sun-icon.svg" />`;
    localStorage.setItem("theme", "dark");
  } else {
    themeChange.innerHTML = `<img src="assets/moon-icon.svg" />`;
    localStorage.setItem("theme", "light");
  }
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
  taskList.innerHTML = "";
  saveData();
  showUndo();
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
    localStorage.getItem("undoTask") === null ||
    localStorage.getItem("undoTask") === ""
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

  const timerInterval = setInterval(() => {
    secondsLeft--;
    undoTimeOut.textContent = secondsLeft + "sec";
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      undoDialog.style.animation = "slide-out 0.5s ease-in forwards";
    }
  }, 1000);

  undoButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    undoAction();
    undoDialog.style.animation = "slide-out 0.5s ease-in forwards";
  });
}
