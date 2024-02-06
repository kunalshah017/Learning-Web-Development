const taskInput = document.getElementById("TaskInput");

const taskList = document.getElementById("task-list");

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
  console.log(localStorage.getItem("taskList"));
  taskList.innerHTML = localStorage.getItem("taskList");
}

loadData();
