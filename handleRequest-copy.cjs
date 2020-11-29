const fs = require('fs')
let id = 1
let tasks = [
    {
        id: newID(),
        text: 'Lorem ipsum dolor sit, amet consectetur',
        done: true,
    },
    {
        id: newID(),
        text: 'Lorem ipsum dolor sit, amet consectetur 2',
        done: false,
    }
]
module.exports = function handleRequest(request, response) {

    const {method, url} = request
    
    if (url.startsWith('/api/')) { //  обробка даних
        const endpoint = url.slice(5)

        if (endpoint == 'tasks') {
            if (method == 'GET') response.end(JSON.stringify(tasks))
            else if (method == 'POST') {
                // getBody(request, (err, data) => {
                //     try {
                //         if (err) throw err
                //         const newTasks = JSON.parse(data)
                //         addTasks(newTasks)
                //         response.setHeader('Content-type', 'application/json')
                //         response.end(JSON.stringify(newTasks))
                //     } catch (error) {
                //         response.end('"Bad request"')
                //     }
                // })
                const parts = []
                request.on('data', (part)=>{// обробка події коли приходить один пакет
                    parts.push(part)
                })
                request.on('end', ()=> {
                    // частинки - це буфери, тому їх необхідно склеїти і перетворити на рядок
                    // далі рядок буде у джейсон форматі, тому треба його розпарсити
                    try { // отримуэмо фетч з фронта з body в якому буде лежати таск у форматі джсон 
                        const newTasks = JSON.parse(Buffer.concat(parts).toString())
                        addTasks(newTasks)
                        response.setHeader('Content-type', 'application/json')
                        response.end(JSON.stringify(newTasks))
                    } catch (error) {
                        response.end('"Bad request"')
                    }
                })
            }
        } else {
            response.end(JSON.stringify(endpoint + ' API not found'))
        }
    } else {  //віддача файлу
        let path = './public' + (url == '/' ? '/index.html' : url)
            
        fs.readFile(path, 'utf-8', (err, data)=> {
            if (err) {
                console.error(err)
                response.end(`404 ${url} not found`)
            }
            else {
                if (path.endsWith('css')) response.setHeader('Content-type', 'text/css')
                response.end(data)
            }
        })

        
    }
}

function getBody(request, callback) {
    const parts = []
    request.on('data', (part) => {
        parts.push(part)
    })
    request.on('end', ()=> {
        callback(null, Buffer.concat(parts).toString())
    })
    request.on('error', (err) => callback(err, null))
}

function addTasks(more) { 
    if (Array.isArray(more)) {
        more.forEach(task => {
            task.id = newID()
        })
        tasks.push(...more)
    } else {
        more.id = newID()
        tasks.push(more)
    }
}

function newID() {
    return id++
}
// клєінт висилає дані на сервер
// кожен раз коли приходить черговий пакет на обєкті запиту реквест відбувається подія data
// і всі хто підписаний на подію дата будуть виконані
// після того як приходить останній пакет - відбувається подія end 
// коли відбувається подія енд, треба зібрати всі шматки даних(файлу наприклад) до кучі



