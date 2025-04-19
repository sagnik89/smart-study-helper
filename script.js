
function showSection(id) {
    const sections = document.querySelectorAll(".page-component")
    sections.forEach(section => {
        section.style.display = 'none'
    })
    const pressedElement = document.querySelector(`#${id}`)
    pressedElement.style.display = "block"
}


// Button Elements
const toDoButton = document.querySelector("#todo-button")
const summarizerButton = document.querySelector("#summarizer-button")
const aiButton = document.querySelector("#ai-button")
const pomodoroButton = document.querySelector("#pomodoro-button")



// ------------------------------------------------ To Do List Logic ------------------------------------------------------------------
toDoButton.addEventListener('click', (e) => {    
    showSection("todo")
})

summarizerButton.addEventListener("click", (e) => {
    showSection("summarizer");
})

aiButton.addEventListener("click", (e) => {
    showSection("ai");
})

pomodoroButton.addEventListener("click", (e) => {
    showSection("pomodoro");
})

showSection("todo")
// Render the added tasks to the List
const taskFormElement = document.querySelector("#taskForm")
const taskList = document.querySelector("#taskList")
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

let tasks = []

let completedTasks = []

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
        completedTasks.push(tasks[index])
      tasks.splice(index, 1); 
      renderTasks(); // re-render updated list
    });
  });
}
    
// render tasks if any in local storage -> Need to setup
renderTasks()

taskFormElement.addEventListener('submit', (e) => {
    e.preventDefault()
    const task = {
        taskName: document.getElementById("taskName").value,
        priority: document.getElementById("priority").value,
        time: document.getElementById("timeEstimate").value,
        
    };
    
    tasks.push(task)
    renderTasks()
    taskFormElement.reset() //clearing all the data in the form

    console.log(task)
    console.log(tasks)
})




// Summarizer Logic
const API_TOKEN = "<i_d_k>"; //need to be removed, cant work until specific backend is created

async function summarizeWithBART(text) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: text,
      }),
    }
  );
  
  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data[0].summary_text;
}

document.querySelector("#summarizeBtn").addEventListener('click', async () => {
    const text = document.querySelector("#inputText").value;

    document.querySelector("#summaryResult").innerHTML = text;
    summaryResult.textContent = "Summarizing...";
  resetBtn.style.display = "none";

  try {
    const summary = await summarizeWithBART(text);
    summaryResult.textContent = summary;
    resetBtn.style.display = "inline";
  } catch (error) {
    summaryResult.textContent = `Error: ${error.message}`;
  }
});

document.querySelector("footer").innerHTML = `© ${new Date().getFullYear()} Sagnik Ghosh`;



