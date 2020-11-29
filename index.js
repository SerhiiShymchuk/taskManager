const http = require('http')
const fs = require('fs')

const utf = '; charset=utf-8'
const typeDict = {
    html: 'text/html'+utf,
    htm: 'text/html'+utf,
    svg: 'image/svg+xml'+utf,
    css: 'text/css'+utf,
    js: 'application/javascript'+utf,
    json: 'application/json'+utf,
    ico: 'image/x-icon',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    gif: 'image/gif',
    png: 'image/png',
    txt: 'text/plain'+utf,
    wav: 'audio/wav',
    mp3: 'audio/mpeg',
    mp4: 'video/mp4',
    ttf: 'application/font-ttf',
    eot: 'application/vnd.ms-fontobject',
    otf: 'application/font-otf',
    woff: 'application/font-woff',
    wasm: 'application/wasm',
  }
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

http.createServer((request, response) => {
    const {url, method, headers} = request
    const path = (url == '/') ? '/index.html' : url
    if (url.startsWith('/api')) {
        if (url == '/api/tasks') {
            response.setHeader('Content-type', 'application/json')
            response.end(JSON.stringify(tasks))
        }
        //план
        //прийняти запит з фронтенда 
    } else {
        giveFile(path, response)
    }

}).listen(3000, ()=> {console.log('server is running: http://localhost:3000')})

function giveFile(path, response) {
    fs.readFile('./public' + path, (err, data) => {
        if (err) {
            console.error(err)
            response.end('file not found')
        }    
        else {
            const ext = path.match(/\.([^\.\/]+)$/)
            if (ext) response.setHeader('Content-type', typeDict[ext[1]])
            else response.setHeader('Content-type', 'text/plain')
            response.end(data)
        }
    })
}

function newID() {
    return id += 1
}