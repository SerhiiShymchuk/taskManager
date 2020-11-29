const http = require('http')
require = require('up2require')(require)

const handleRequest = require.fresh('./handleRequest.cjs')

http.createServer(handleRequest).listen(3000, () => console.log('http://localhost:3000')) 




