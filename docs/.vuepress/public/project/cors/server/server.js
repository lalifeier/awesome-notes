const express = require('express')
const app = express()

// const cors = require('cors')
// app.use(cors())

// const whitList = ['http://127.0.0.1:5500'] //设置白名单
// app.use((req, res, next) => {
//   const origin = req.headers.origin
//   if (whitList.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header(
//       'Access-Control-Allow-Headers',
//       'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method'
//     )
//     res.header(
//       'Access-Control-Allow-Methods',
//       'GET, POST, OPTIONS, PATCH, PUT, DELETE'
//     )
//     res.setHeader('Access-Control-Allow-Credentials', true)
//     if (req.method === 'OPTIONS') {
//       res.end()
//     }
//   }
//   next()
// })

app.get('/', function(req, res) {
  res.send('Hello World')
})

app.get('/api', function(req, res) {
  let { callback = Function.prototype } = req.query
  const data = {
    code: 200,
    data: 'Hello World',
  }
  res.send(`${callback}(${JSON.stringify(data)})`)
})

app.listen(3000)
