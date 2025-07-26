const form = document.getElementById("task-form");
const inputTitle = document.getElementById("task-Title");
const inputDescription = document.getElementById("task-description");
const inputDueDate = document.getElementById("due-date");

const template = document.getElementById("task-template");
const container = document.getElementById("task-container");
const filterSelect = document.getElementById("filter-select");


let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load saved tasks on page load
window.addEventListener("DOMContentLoaded", () => {
  savedTasks.forEach(task => {
    renderTask(task.title, task.description, task.dueDate);
  });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = inputTitle.value.trim();
  const description = inputDescription.value.trim();
  const dueDate = inputDueDate.value.trim();

  if (title !== "") {
    renderTask(title, description, dueDate);
    saveTask(title, description, dueDate);
    inputTitle.value = "";
    inputDescription.value = "";
    inputDueDate.value = "";
  } else {
    alert("Task title cannot be empty.");
  }
});



document.getElementById("filter-select").addEventListener("change", function () {
  filterTasks(this.value);
});

function renderTask(title, description, date) {
  const newTask = template.firstElementChild.cloneNode(true);

  newTask.querySelector(".task-title").textContent = title;
  newTask.querySelector(".task-desc").textContent = description;
  newTask.querySelector(".task-date span").textContent = date;

  const statusText = newTask.querySelector(".status-text");
  const completeBtn = newTask.querySelector(".complete-btn");
  const deleteBtn = newTask.querySelector(".deletebtn");
  const editBtn = newTask.querySelector(".edit-btn");

  const today = new Date().toISOString().split("T")[0];

  if (date === today) {
    alert(`⏰ Task "${title}" is due today!`);
  }

  if (date < today) {
    statusText.textContent = "Overdue";
    statusText.style.color = "red";
     newTask.setAttribute("status", "overdue");
  } else {
    statusText.textContent = "Pending";
    statusText.style.color = "orange";
    newTask.setAttribute("status", "pending");
  }

  completeBtn.addEventListener("click", function () {
    statusText.textContent = "Completed";
    statusText.style.color = "green";
    completeBtn.disabled = true;
    completeBtn.textContent = "Done";
    newTask.setAttribute("status", "completed");
  });

  deleteBtn.addEventListener("click", function () {
    if (confirm(`Delete task "${title}"?`)) {
      removeTaskFromStorage(title, date);
      container.removeChild(newTask);
    }
  });

  editBtn.addEventListener("click", function () {
    const newTitle = prompt("Edit Task Title", title);
    const newDesc = prompt("Edit Description", description);
    const newDueDate = prompt("Edit Due Date (YYYY-MM-DD)", date);

    if (newTitle && newDueDate) {
        newTask.querySelector(".task-title").textContent = newTitle;
        newTask.querySelector(".task-desc").textContent = newDesc;
        newTask.querySelector(".task-date span").textContent = newDueDate;

        // Update in localStorage
        removeTaskFromStorage(title, date); // remove old task
        saveTask(newTitle, newDesc, newDueDate); // save updated task

        // Update local status
        const today = new Date().toISOString().split("T")[0];
        if (newDueDate < today) {
        statusText.textContent = "Overdue";
        statusText.style.color = "red";
        newTask.setAttribute("status", "overdue");
        } else if (newDueDate === today) {
        statusText.textContent = "Pending";
        statusText.style.color = "orange";
        alert(`⏰ Task "${newTitle}" is due today!`);
        newTask.setAttribute("status", "pending");
        } else {
        statusText.textContent = "Pending";
        statusText.style.color = "orange";
        }
    }
  });

  container.appendChild(newTask);
}




function saveTask(title, description, dueDate) {
  const task = { title, description, dueDate };

  const exists = savedTasks.some(t => t.title === title && t.dueDate === dueDate);
  if (!exists) {
    savedTasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
  }
}

function removeTaskFromStorage(title, date) {
  savedTasks = savedTasks.filter(task => !(task.title === title && task.dueDate === date));
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
}



function filterTasks(type) {
  const taskCards = document.querySelectorAll('.task-card'); // each card must have class "task-card"

  taskCards.forEach(card => {
    const status = card.getAttribute('status'); // assume you set this dynamically

    if (type === 'all') {
      card.style.display = 'flex';
    } else if (type === 'completed') {
      card.style.display = (status === 'completed') ? 'flex' : 'none';
    } else if (type === 'not-completed') {
      card.style.display = (status === 'pending' || status === 'overdue') ? 'flex' : 'none';
    }
  });
}