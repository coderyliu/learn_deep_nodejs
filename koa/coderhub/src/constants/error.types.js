//400 用户名或者密码不存在
const NAME_OR_PASSWORD_IS_REQUIRED = 'name_or_password_is_required'

// 409用户名冲突
const NAME_CONFLICT = 'name_conflict'

// 400密码错误
const PASSWORD_ERROR = 'password_error'

// 400用户不存在
const USERNAME_IS_NOT_EXISTS = 'username_is_not_exists'

// 401未授权
const UnAuthorization = 'UnAuthorization'

// 401 没有某一项权限
const No_Permission = 'no_permission'

module.exports = {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_CONFLICT,
  PASSWORD_ERROR,
  USERNAME_IS_NOT_EXISTS,
  UnAuthorization,
  No_Permission
}