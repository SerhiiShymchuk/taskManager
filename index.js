import http from 'http'

import module from 'module'
let require = module.createRequire(import.meta.url)
require = require('up2require')(require)

const handleRequest = require.fresh('./handleRequest.cjs')

http.createServer(handleRequest).listen(3000, () => console.log('http://localhost:3000')) 



