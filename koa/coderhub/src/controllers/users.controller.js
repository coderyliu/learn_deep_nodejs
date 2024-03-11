const fs = require("fs");
const userService = require("../models/users.model");
const fileService = require("../models/file.model");
const md5password = require("../utils/md5password");
const { AVATAR_PATH } = require("../constants/file.path");

class UserController {
  async create(ctx, next) {
    // 获取用户传递的参数,并对密码进行加密
    const { password } = ctx.request.body;
    ctx.request.body.password = md5password(password);

    const user = ctx.request.body;

    // 查询参数
    const result = await userService.create(user);

    // 返回数据
    ctx.body = result;
  }

  async success(ctx, next) {
    ctx.body = "获取成功!";
  }

  async avatarInfo(ctx, next) {
    // 获取用户头像
    const id = ctx.params.id;

    // 操作数据库
    const avatarInfo = await fileService.getAvatarById(id);

    // 返回图像数据
    ctx.response.set("content-type", avatarInfo[0].mimetype);
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo[0].filename}`);
  }
}

module.exports = new UserController();
