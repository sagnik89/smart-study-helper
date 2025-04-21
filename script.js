
function showSection(id) {
  const sections = document.querySelectorAll(".page-component");
  sections.forEach((section) => {
    section.style.display = "none";
  });
  const pressedElement = document.querySelector(`#${id}`);
  pressedElement.style.display = "block";
}

// Button Elements
const toDoButton = document.querySelector("#todo-button");
const summarizerButton = document.querySelector("#summarizer-button");
const aiButton = document.querySelector("#ai-button");
const pomodoroButton = document.querySelector("#pomodoro-button");

// ------------------------------------------------ To Do List Logic ------------------------------------------------------------------
toDoButton.addEventListener("click", (e) => {
  showSection("todo");
});

summarizerButton.addEventListener("click", (e) => {
  showSection("summarizer");
});

aiButton.addEventListener("click", (e) => {
  showSection("ai");
});

pomodoroButton.addEventListener("click", (e) => {
  showSection("pomodoro");
});

showSection("todo");
// Render the added tasks to the List
const taskFormElement = document.querySelector("#taskForm");
const taskList = document.querySelector("#taskList");
// let tasks = [
//     {
//       taskName: "Task Demo 1",
//       priority: "Low",
//       time: "60",
//     },
//     {
//       taskName: "Task Demo 2",
//       priority: "Medium",
//       time: "120",
//     },
//     {
//       taskName: "Task Demo 3",
//       priority: "High",
//       time: "180",
//     },
// ];

let tasks = [];

let completedTasks = [];

function renderTasks() {
  if (tasks.length == 0) {
    taskList.innerHTML = `<div> No Tasks yet ..... </div>`;
    taskList.classList.add("no-tasks");
    return;
  }

  taskList.classList.remove("no-tasks");
  taskList.innerHTML = `<div class="header">
                <p></p>
                <p id="task-name-heading">Task Name</p>
                <p>Priority</p>
                <p>Time (in mins)</p>
            </div>`;
  tasks.forEach((task, index) => {
    const taskElement = document.createElement("div");

    // need to update this too
    taskElement.innerHTML = `
     <div class="task">
            <input
                type="checkbox"
                data-index="${index}"
                class="completion-status"
            />
            <p class="task-name"><strong>${task.taskName}</strong></p>
            <p class="priority-status">${task.priority}</p>
            <p class="time-of-completion">${task.time}</p>
            
          </div>
    `;
    taskList.appendChild(taskElement);
  });

  // remove the taskElement when checked the box
  const checkboxes = document.querySelectorAll(".completion-status");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const index = e.target.dataset.index;
      completedTasks.push(tasks[index]);
      tasks.splice(index, 1);
      renderTasks(); // re-render updated list
    });
  });
}

// render tasks if any in local storage -> Need to setup
renderTasks();

taskFormElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = {
    taskName: document.getElementById("taskName").value,
    priority: document.getElementById("priority").value,
    time: document.getElementById("timeEstimate").value,
  };

  tasks.push(task);
  renderTasks();
  taskFormElement.reset(); //clearing all the data in the form

  console.log(task);
  console.log(tasks);
});

// Summarizer Logic

async function getSummary(text) {
  const response = await fetch("http://localhost:5000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: text }),
  });

  return response.json();
}

document.querySelector("#summarizeBtn").addEventListener("click", async () => {
  const text = document.querySelector("#inputText").value;
  const summaryResult = document.querySelector("#summaryResult");

  summaryResult.textContent = "Summarizing...";

  console.log("Halu")

  if (!text.trim()) {
    summaryResult.textContent = "Please enter some text to summarize.";
    return;
  }

  try {
     const data = await getSummary(text);
     console.log(data);

    if (data.error) {
      summaryResult.textContent = "Error: " + data.error;
    } else {
      summaryResult.textContent =
        data[0]?.summary_text || "No summary returned.";
    }
  } catch (error) {
    console.error(error);
    summaryResult.textContent = "An error occurred while summarizing.";
  }
});

document.querySelector(
  "footer"
).innerHTML = `© ${new Date().getFullYear()} Sagnik Ghosh`;
