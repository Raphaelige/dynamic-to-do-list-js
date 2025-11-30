document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Add Task function
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create li
        const li = document.createElement('li');

        // Create span to hold task text
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        // Create Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove task on click
        removeBtn.onclick = function() {
            taskList.removeChild(li);
        };

        // Append span and button to li
        li.appendChild(taskSpan);
        li.appendChild(removeBtn);

        // Append li to task list
        taskList.appendChild(li);

        // Clear input
        taskInput.value = '';
    }

    // Click event
    addButton.addEventListener('click', addTask);

    // Enter key event (use keydown instead of keypress)
    taskInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});