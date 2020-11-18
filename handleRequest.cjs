const fs = require('fs')
const tasks = [
    {
        id: 1,
        text: 'Lorem ipsum dolor sit, amet consectetur',
        done: true,
    },
    {
        id: 2,
        text: 'Lorem ipsum dolor sit, amet consectetur 2',
        done: false,
    }
]
module.exports = function handleRequest(request, response) {

    const {method, url} = request
    
    if (url.startsWith('/api/')) {
        const endpoint = url.slice(5)
        if (endpoint == 'tasks') {
            response.end(JSON.stringify(tasks))
        }
    } else {  // отримання файлу
        if (url == '/index.html' || url == '/') {
            fs.readFile('./public/index.html', 'utf-8', (err, data)=> {
                if (err) {
                    console.error(err)
                    // send 404
                }
                else {
                    // response.setHeader('Content-type', 'text/html')
                    response.end(data)
                }
            })
        } else if (url == '/style.css') {
            fs.readFile('./public/style.css', 'utf-8', (err, data)=> {
                if (err) console.log(err)
                else {
                    response.setHeader('Content-type', 'text/css')
                    response.end(data)
                }
            })
        } else if (url == '/script.js') {
            fs.readFile('./public/script.js', 'utf-8', (err, data) => {
                if (err) console.log(err)
                else {
                    response.setHeader('Content-type', 'application/javascript')
                    response.end(data)
                }
            })
        }
        
    }
}
