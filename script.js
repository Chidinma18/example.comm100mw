document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');

    // Load saved tasks from localStorage
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(taskText => renderTask(taskText));

    // Handle adding a task
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        renderTask(taskText);
        
        // Save to localStorage
        savedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(savedTasks));

        taskInput.value = '';
    }

    function renderTask(text) {
        const li = document.createElement('li');
        li.textContent = text;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        
        // Handle removing a task
        deleteBtn.addEventListener('click', () => {
            li.remove();
            savedTasks = savedTasks.filter(t => t !== text);
            localStorage.setItem('tasks', JSON.stringify(savedTasks));
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }
});
