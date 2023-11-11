const sequelize = require("../db.js");
const ApprovalModel = require("./Approval");
const UserModel = require("./User");

// 同步数据库
// 自动同步所有模型
const flushDataBase = () => {
  try {
    sequelize
      .sync({ alter: true })
      .then(() => {
        console.log("所有模型均已成功同步.");
        // 在此处可以继续编写相关逻辑
      })
      .catch((error) => {
        console.error("模型同步出错:", error);
      });
  } catch (err) {}
};
flushDataBase();
