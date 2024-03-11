const errorTypes = require("../constants/error.types");

const errorhandler = function (error, ctx) {
  let status, message;

  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400; //400 用户输入错误
      message = "用户名或密码错误";
      break;
    case errorTypes.NAME_CONFLICT:
      status = 409; //409 发生冲突
      message = "用户名已存在";
      break;
    case errorTypes.PASSWORD_ERROR:
      status = 400; //400 发生冲突
      message = "用户名或者密码错误";
      break;
    case errorTypes.USERNAME_IS_NOT_EXISTS:
      status = 400; //400 发生冲突
      message = "用户名不存在";
      break;
    case errorTypes.UnAuthorization:
      status = 401; //400 发生冲突
      message = "用户未认证~";
      break;
    case errorTypes.No_Permission:
      status = 401; //401 没有权限
      message = "您没有修改权限~";
      break;
    default:
      status = 404; //路径错误
      message = "Not Found";
  }

  ctx.status = status;
  ctx.body = message;
};

module.exports = {
  errorhandler,
};
