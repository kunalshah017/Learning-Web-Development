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
  saveData();
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
  saveData();
};

const deleteTask = (e) => {
  const task = e.target.closest("li");
  task.remove();
  saveData();
};

function saveData() {
  localStorage.setItem("taskList", taskList.innerHTML);
}

function loadData() {
  taskList.innerHTML = localStorage.getItem("taskList");
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
  taskList.innerHTML = "";
  saveData();
}
