const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const bodyParser = require("body-parser");


// 将 cors 注册为全局中间件
app.use(cors());

// 配置中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 测试数据库是否连接成功
require("./db.js");

//  关于模型的一键同步
require("./model/index.js");

// 关于模型api的操作
const router = require('./router/index.js')
app.use("/api/user", router);


// 启动服务器
const port = 3000;
http.listen(port, () => {
  console.log(`http://127.0.0.1:3000`);
});

