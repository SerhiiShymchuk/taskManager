const fs = require('fs')
module.exports = function handleRequest(request, response) {

    const {method, url} = request
    
    if (url.startsWith('/api/')) {
        
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
        }
        
    }
}
