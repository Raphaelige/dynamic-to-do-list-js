document.addEventListener('DOMContentLoaded', () => {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create <li>
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";

        // Remove task on click
        removeBtn.onclick = () => {
            taskList.removeChild(li);
        };

        // Add remove button to <li>
        li.appendChild(removeBtn);

        // Add <li> to <ul>
        taskList.appendChild(li);

        // Clear input
        taskInput.value = "";
    }

    // Add task on button click
    addButton.addEventListener('click', addTask);

    // Add task when pressing Enter
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });

});