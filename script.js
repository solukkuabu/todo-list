// DOM Elements
const taskInput = document.getElementById('taskInput');
const reminderInput = document.getElementById('reminderInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = ''; // Clear current task list
    const tasks = getTasksFromLocalStorage();

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.toggle('completed', task.completed);

        // Task text
        const span = document.createElement('span');
        span.textContent = task.text;
        li.appendChild(span);

        // Reminder
        if (task.reminder) {
            const reminderText = document.createElement('span');
            reminderText.classList.add('reminder');
            reminderText.textContent = `Reminder: ${new Date(task.reminder).toLocaleString()}`;
            li.appendChild(reminderText);
        }

        // Mark as Completed button
        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? 'Undo' : 'Complete';
        completeButton.onclick = () => toggleTaskCompletion(index);
        li.appendChild(completeButton);

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.onclick = () => deleteTask(index);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

// Function to get tasks from localStorage
function getTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    return tasks ? tasks : [];
}

// Function to save tasks to localStorage
function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();
    const reminderTime = reminderInput.value;
    
    if (taskText === '') return alert('Please enter a task.');

    const tasks = getTasksFromLocalStorage();
    const newTask = {
        text: taskText,
        completed: false,
        reminder: reminderTime ? new Date(reminderTime).toISOString() : null
    };

    tasks.push(newTask);
    saveTasksToLocalStorage(tasks);

    taskInput.value = ''; // Clear input field
    reminderInput.value = ''; // Clear reminder field
    renderTasks(); // Re-render tasks
}

// Function to toggle task completion
function toggleTaskCompletion(index) {
    const tasks = getTasksFromLocalStorage();
    tasks[index].completed = !tasks[index].completed;
    saveTasksToLocalStorage(tasks);
    renderTasks(); // Re-render tasks
}

// Function to delete a task
function deleteTask(index) {
    const tasks = getTasksFromLocalStorage();
    tasks.splice(index, 1); // Remove the task at the specified index
    saveTasksToLocalStorage(tasks);
    renderTasks(); // Re-render tasks
}

// Event listener for adding a task
addTaskButton.addEventListener('click', addTask);

// Allow pressing "Enter" to add a task
taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Initial render
renderTasks();
