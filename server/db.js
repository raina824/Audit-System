const { Sequelize } = require("sequelize");
// 连接数据库
const sequelize = new Sequelize("tw", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
  port:'3308',
  logging: (msg) => {
    // console.log(msg);
  },
  dialectOptions: {
    charset: "utf8mb4",
  },
});

// 测试数据库链接
try {
  sequelize.authenticate();
  console.log("数据库连接成功");
} catch (error) {
  console.error(error);
}

module.exports = sequelize;
