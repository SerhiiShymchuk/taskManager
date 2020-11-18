const ul = document.querySelector('#taskList')
fetch('/api/tasks')
    .then(response => response.json())
    .then(tasks => ul.innerHTML = tasks.map(buildTask).join(''))


function buildTask(task) {
    return `
        <li>
            <input type="checkbox" ${task.done ? 'checked': ''}>
            <span>${task.text}</span>
            <button>✏️</button>
            <button>❌</button>
        </li>
    `
}