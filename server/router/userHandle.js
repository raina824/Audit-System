
const {
  returnObjFormat,
  returnJsonFormat,
} = require("../utils/returnObjFormat.js");
const User = require("../model/User.js");

// 添加用户
const createUser = (userInfo) => {
return new Promise((resolve, reject) => {
  User.create(userInfo)
    .then((res) => {
      // console.log(res.toJSON());
      let successMessage = returnObjFormat(200, "注册成功!", res.toJSON());
      console.log(successMessage);
      resolve(successMessage);
    })
    .catch((err) => {
      let errorMessage = returnObjFormat(
        400,
        err,
        err
      );
      console.error(errorMessage);
      resolve(errorMessage);
    });
});
};

// 条件查询用户 登录判断
const findUserOne = (userInfo) => {
return new Promise((resolve, reject) => {
  User.findAll({
    where: userInfo,
  }).then((res) => {
    // console.log(res);
    if (res == [] || res.length == 0) {
      let errorMessage = returnObjFormat(
        400,
        "登录失败,账号或密码错误!",
        res
      );
      resolve(errorMessage);
    } else {
      let successMessage = returnObjFormat(200, "登录成功!", res);
      resolve(successMessage);
    }
  });
});
};

// 修改用户信息
const updateUser = (userId, updatedInfo) => {
  return new Promise((resolve, reject) => {
    User.update(updatedInfo, {
      where: { id: userId },
    })
      .then((result) => {
        if (result[0] === 0) {
          let errorMessage = returnObjFormat(400, "未找到该用户!");
          console.error(errorMessage);
          resolve(errorMessage);
        } else {
          let successMessage = returnObjFormat(200, "用户信息已更新!");
          console.log(successMessage);
          resolve(successMessage);
        }
      })
      .catch((err) => {
        let errorMessage = returnObjFormat(500, "更新用户信息时发生错误!", err);
        console.error(errorMessage);
        resolve(errorMessage);
      });
  });
};
module.exports = {
findUserOne,
createUser,
};
