const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  options = {
    port: 8085,
    mockServerPort: 3076
  },
  port = options.mockServerPort,
  data = require('./mockdata')

  console.log(123)

/* 阻止窥探服务器构造 */
app.disable("x-powered-by")
// 处理 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// 处理 application/json
app.use(bodyParser.json())


/* 获取当前服务器状态 */
app.get("/api/server", require("./services/server.js"))
/* your api code here...*/

app.use("http://192.168.126.95:3076",(req,res)=>{
  console.log(req)
  setTimeout(()=>{
    res.json({
        code: "0",
    })
},8000)
})

app.listen(port, () => {
  console.log(`Server is now running in localhost: ${port}`)
})