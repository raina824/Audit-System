
const sequelize = require("../db.js");
const { DataTypes } = require("sequelize"); // 导入内置数据类型
const User = require('./User');
const Approval = sequelize.define(
    "Approval",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", // 关联的用户模型
          key: "id",
        },
      },
      submittedInfo: {
        type: DataTypes.JSON, // 存储用户提交的信息，可以使用JSON格式
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: '1',
        comment: '1 待审批 2 审批通过 3 审批不通过',
      },
      remarks: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '审批备注',
      },
    },
    {
      tableName: "approvals", // 数据库中对应的表名
      timestamps: false, // 是否自动生成创建时间和更新时间字段
    }
  );
  
  Approval.belongsTo(User, { foreignKey: 'userId' }); // 建立审批与用户的关联关系
  
  module.exports = Approval;
  