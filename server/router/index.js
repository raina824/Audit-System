const express = require("express");
const router = express.Router();
const { findUserOne, createUser } = require("./userHandle.js");
// 模型
const Approval = require("../model/Approval.js");
const User = require("../model/User.js");
// 返回数据整洁
const { returnObjFormat } = require("../utils/returnObjFormat.js");
const { resSend } = require("../utils/resSend.js");

// 注册用户
router.post("/register", async (req, res) => {
  try {
    let userInfo = req.body;
    console.log(userInfo);
    const result = await createUser(userInfo);
    await resSend(res, result);
  } catch (_) {}
});
// 用户登录
router.post("/login", async (req, res) => {
  try {
    let userinfo = req.body;
    // console.log(req.body);
    const result = await findUserOne(userinfo);
    await resSend(res, result);
  } catch (_) {}
});

// 用户点击修改需要审批的接口
// router.post("/approvalInfo", async (req, res) => {
//   try {
//     const formUserInfo = req.body;
//     let { userId } = req.body;
//     console.log(req.body);
//     const user = await User.findByPk(userId);

//     if (!user) {
//       return res.status(404).json({ error: "用户不存在" });
//     }

//     // 修改用户状态为1（提交审批）
//     user.status = "1";
//     await user.save();

//     // 将个人信息保存到审批表
//     const submittedInfo = {
//       username: formUserInfo.username,
//       password: formUserInfo.password,
//       imgurl: formUserInfo.imgurl,
//       age: formUserInfo.age,
//       sex: formUserInfo.sex,
//     };
//     const result = await Approval.create({ userId, submittedInfo });
//     return res.send(returnObjFormat(200, "提交审批成功", result));
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "服务器错误" });
//   }
// });

router.post("/approvalInfo", async (req, res) => {
  try {
    const formUserInfo = req.body;
    let { userId } = req.body;
    console.log(req.body);
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "用户不存在" });
    }

    // 检查是否已存在待审批的记录
    const existingApproval = await Approval.findOne({ where: { userId, status: '1' } });
    if (existingApproval) {
      return res.send({
        code:200,
        message:'已存在待审批的记录'
      })
    }

    // 修改用户状态为1（提交审批）
    user.status = "1";
    await user.save();

    // 将个人信息保存到审批表
    const submittedInfo = {
      username: formUserInfo.username,
      password: formUserInfo.password,
      imgurl: formUserInfo.imgurl,
      age: formUserInfo.age,
      sex: formUserInfo.sex,
    };
    const result = await Approval.create({ userId, submittedInfo });
    return res.send(returnObjFormat(200, "提交审批成功", result));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "服务器错误" });
  }
});

// 审批通过的接口
router.post("/approvalPass", async (req, res) => {
  try {
    const approvalId = req.body.approvalId;
    console.log(approvalId);
    // const approval = await Approval.findByPk(approvalId, { include: User });
    const approval = await Approval.findOne({
      where: { id: approvalId },
      include: User,
    });
    console.log("approval", approval);
    if (!approval) {
      return res.status(404).json({ error: "审批记录不存在" });
    }
    // 修改审批状态为2（approvalId
    approval.status = "2";
    await approval.save();

    // 同步身份信息和用户个人信息
    const user = approval.User;
    console.log("user", user);
    user.username = approval.submittedInfo.username;
    user.password = approval.submittedInfo.password;
    user.imgurl = approval.submittedInfo.imgurl;
    user.age = approval.submittedInfo.age;
    user.sex = approval.submittedInfo.sex;
    user.status = "0"; // 将用户状态改为正常
    const res1 = await user.save();

    return res.send(returnObjFormat(200, "审批通过", res1));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "服务器错误" });
  }
});
router.get("/getApproverList", async (req, res) => {
  const res1 = await Approval.findAll({
    where: { status: "1" }, // 查询条件：status为1
  });
  console.log(res1);
  res.send({
    code: 200,
    data: res1,
    message: "查询审批表记录成功",
  });
});
module.exports = router;
