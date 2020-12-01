const ul = document.querySelector('#taskList')
const addTaskBtn = document.querySelector('#addTaskBtn')
const taskInp = document.querySelector('#taskInp')
const newTaskDialog = document.querySelector('#newTaskDialog')

fetch('/api/tasks')
    .then(response => response.json())
    .then(tasks => ul.innerHTML = tasks.map(buildTask).join(''))

function buildTask(task) {
    console.log(task)
    return `
        <li>
            <input type="checkbox" ${task.done ? 'checked': ''}>
            <span>${task.text}</span>
            <button>✏️</button>
            <button>❌</button>
        </li>
    `
}
addTaskBtn.addEventListener('click', () => newTaskDialog.showModal())
taskInp.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        if (taskInp.value !== '') {
            newTaskDialog.close()
            addTask(taskInp.value)
            taskInp.value = ''
        } else {
            taskInp.classList.add('Invalid')
        }
    } else {
        taskInp.classList.remove('Invalid')
    }
})
newTaskDialog.addEventListener('click', (event) => {
    if (event.target == newTaskDialog) newTaskDialog.close()
})

function addTask(text) {
    fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({text, done: false})
    }).then(response => response.json())
    .then(task => buildTask(task))
    //.then(buildTask)
    .then(html => ul.innerHTML += html)
}

ul.addEventListener('click', (event) => {
    if (event.target.innerText == '✏️')  makeEditable(event.target.closest('li'))
})

function makeEditable(task) {
    const span = task.querySelector('span')
    span.contentEditable = true
    span.focus()
    span.addEventListener('keydown', (event) => {
        if (event.key == 'Enter') {
            span.contentEditable = false
            saveTask(task)
        }
    }, {once: true})
}

function saveTask(task) {
    
}