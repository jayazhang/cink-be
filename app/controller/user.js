'use strict';

const BaseController = require('./BaseController');

class User extends BaseController {
  async register() {
    const { ctx, app, service } = this;
    const { username, password } = ctx.request.body;
    const hasUser = await service.user.findUser({ username });

    if (!username || !password) {
      this.error('username and passwor not empty');
      return;
    }

    if (hasUser) {
      this.error('This username is existed');
      return;
    }

    await app.mysql.insert('users', { username, password });
    const user = await service.user.findUser({ username });
    delete user.password;
    ctx.session.user = user;
    this.success(user);
  }

  async login() {
    const { ctx, service } = this;
    const { username, password } = ctx.request.body;
    const user = await service.user.findUser({ username, password });

    if (!user) {
      this.error('username or password is wrong');
      return;
    }
    delete user.password;
    ctx.session.user = user;
    this.success(user);
  }

  async isLogin() {
    const { ctx, service } = this;
    if (ctx.session.user && ctx.session.user.username) {
      const user = await service.user.findUser({ id: ctx.session.user.id });
      delete user.password;
      this.success({
        isLogin: true,
        userInfo: user,
      });
    } else {
      this.success({
        isLogin: false,
      });
    }
  }
}

module.exports = User;
