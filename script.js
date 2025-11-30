// script.js
// To-Do List app with localStorage support
// Follows ALX requirements: DOMContentLoaded wrapper, exact element IDs, addTask function,
// addButton click listener, taskInput keypress listener (Enter), load/save tasks.

document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements (must be constants with these exact names)
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // In-memory tasks array (keeps in sync with localStorage)
  let tasks = [];

  // Save tasks array to localStorage
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Render tasks array into the DOM (rebuilds the <ul>)
  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((taskText, index) => {
      const li = document.createElement('li');
      li.textContent = taskText;

      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.className = 'remove-btn';

      // When clicked, remove the task from tasks array and update storage + UI
      removeBtn.addEventListener('click', () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      li.appendChild(removeBtn);
      taskList.appendChild(li);
    });
  }

  /**
   * addTask
   * - Primary function to add a task.
   * - If called by an event (click), the event object may be passed in as first arg.
   * - If called with a string (taskText), that text will be used (used when loading from storage).
   */
  function addTask(arg) {
    // Determine provided task text:
    // - If arg is a string -> use it (this is used when loading tasks)
    // - Otherwise (called from click or keypress) read from the input field
    let taskText = '';

    if (typeof arg === 'string') {
      taskText = arg.trim();
    } else {
      // arg may be an Event object (click or keypress), ignore it and read the input
      taskText = taskInput.value.trim();
    }

    // Validation: non-empty
    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    // Add to tasks array, save and re-render
    tasks.push(taskText);
    saveTasks();
    renderTasks();

    // Clear input (only if user typed in the input field)
    if (typeof arg !== 'string') {
      taskInput.value = '';
    }
  }

  // Load tasks from localStorage when page loads
  function loadTasks() {
    const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
    if (Array.isArray(stored)) {
      tasks = stored;
    } else {
      tasks = [];
    }
    renderTasks();
  }

  // ===== Attach event listeners exactly as required =====

  // 1) Add an event listener to addButton that calls addTask when the button is clicked.
  // Using the function reference is fine because addTask handles an Event arg.
  addButton.addEventListener('click', addTask);

  // 2) Add an event listener to taskInput for the 'keypress' event and call addTask only when Enter pressed.
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      // Prevent any default form submission behaviour
      event.preventDefault();
      addTask(); // call without arg so it reads from the input field
    }
  });

  // 3) Invoke the loadTasks function on DOMContentLoaded to populate the list from storage.
  // (The project text had a confusing line asking to invoke addTask on load for "data fetching logic".
  // For a To-Do app we must load saved tasks — loadTasks calls render which in turn uses addTask-like logic,
  // but we do not call addTask() without user input because that would create an empty task.)
  loadTasks();
});