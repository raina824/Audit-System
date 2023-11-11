const sequelize = require("../db.js");
const { DataTypes } = require("sequelize"); // 导入内置数据类型
// 定义模型
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: 'true'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imgurl: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    },
    age:{
        type: DataTypes.STRING,
        allowNull: true
    },
    sex:{
        type: DataTypes.STRING,
        allowNull: true
    },
    email:{
      type: DataTypes.STRING,
      allowNull: true
  },
    status: {
        type: DataTypes.STRING,
        defaultValue:'0',
        comment:'0 正常 1 提交审批 2 审批不通过 3 审批通过'
      },
    power: {
      // root超级管理员   admin 管理员  normal 普通用户
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:'normal',
      comment:'root超级管理员   admin 管理员  normal 普通用户'
    }
  },
  {
    tableName: "users", // 数据库中对应的表名
    timestamps: false, // 是否自动生成创建时间和更新时间字段
  }
);

module.exports = User;
